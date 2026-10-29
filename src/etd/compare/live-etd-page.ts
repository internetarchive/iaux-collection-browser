/**
 * Drives the live etd-search page (search.html) in an iframe and reads its
 * ranking, for comparing against the ported engine in the demo.
 *
 * The page must be same-origin with the demo, which it is when served
 * through the dev server's /etd-index proxy. This reads the page's own
 * globals (`run`, `lastAll`, `V`, ...), so a page rebuild that renames them
 * breaks it; every read checks what it got and says so instead.
 */

/** The live page's answer to one query. */
export interface LiveEtdSearch {
  /** Index version the page searched, e.g. '20261026-5e5902'. */
  version: string;

  /** Every match the page ranked. */
  total: number;

  /** The page's own status line, e.g. '4,511 matches in 812 ms'. */
  status: string;

  /** Top docIds in the page's ranking, before its phrase boost re-orders them. */
  docIds: number[];

  /**
   * Top docIds as the page displays them, once its phrase boost has re-ordered
   * them (1-4 s later). Undefined when the page doesn't re-rank this query:
   * only unquoted 2-6 word queries are boosted.
   */
  reranked: Promise<number[] | undefined>;

  /**
   * A doc's 1-based place in the page's plain ranking, which holds every
   * match; undefined when the page didn't match it.
   */
  plainRankOf(docId: number): number | undefined;

  /**
   * A doc's 1-based place in the order the page displays (its top 3000,
   * re-ranked once `reranked` settles); undefined when it isn't there.
   */
  shownRankOf(docId: number): number | undefined;
}

/** Something that answers queries the way the live page does. */
export interface LiveEtdSource {
  /** Resolves with the index version once the page can search. */
  readonly ready: Promise<string>;

  search(query: string, depth: number): Promise<LiveEtdSearch>;

  /**
   * The page's Vector rank (search by meaning) for a query. Its docIds are
   * the vector store's ids + 1, as StaticVectorEngine numbers them, and it
   * isn't re-ranked. Optional: a page without vector rank has none.
   */
  searchByMeaning?(query: string, depth: number): Promise<LiveEtdSearch>;
}

/** The page globals this reads. Declared with `let`, so not on `window`. */
interface LivePageState {
  booted: boolean;
  bootError: string | null;
  version: string;
  lastAll: unknown;
  lastRanked: unknown;
}

type PhraseBoost = (...args: unknown[]) => Promise<unknown>;

const BOOT_TIMEOUT_MS = 90_000;
const BOOT_CHECK_MS = 250;

export class LiveEtdPage implements LiveEtdSource {
  readonly ready: Promise<string>;

  /** The page's phrase boost started by the latest run(), if any. */
  private boost?: Promise<unknown>;

  private boostWatched = false;

  constructor(private readonly iframe: HTMLIFrameElement) {
    this.ready = this.waitForBoot();
  }

  async search(query: string, depth: number): Promise<LiveEtdSearch> {
    await this.ready;
    const win = this.window();
    const doc = win.document;

    // Show the query in the page too, so the drawer reads like the live site.
    const box = doc.querySelector<HTMLInputElement>('#q');
    if (box) {
      box.value = query;
      box.placeholder = query;
    }

    // Back to text rank, if a search by meaning left the page in vector mode.
    this.pageFunctions().setMode?.('text');
    const run = (win as unknown as { run?: (q: string) => Promise<void> }).run;
    if (typeof run !== 'function') {
      throw new Error('live page has no run(): its script has changed');
    }
    this.watchBoost(win);
    this.boost = undefined;
    await run(query);
    const { boost } = this;

    const statusEl = doc.querySelector('#stat');
    const failure = statusEl?.querySelector('.err');
    if (failure) throw new Error(`live page: ${failure.textContent}`);

    const state = this.readState();
    if (!Array.isArray(state.lastAll)) {
      throw new Error(
        'live page has no lastAll ranking: its script has changed',
      );
    }
    const ranked = state.lastAll as unknown[];
    const plainRanks = lazyRanks(() => docIdsOf(ranked));
    let shownRanks = lazyRanks(() => docIdsOf(asArray(state.lastRanked)));
    const reranked = boost
      ? this.rerankedOrder(boost).then(order => {
          shownRanks = lazyRanks(() => order);
          return order.slice(0, depth);
        })
      : Promise.resolve(undefined);
    return {
      version: state.version,
      total: ranked.length,
      status: statusEl?.textContent?.trim() ?? '',
      docIds: docIdsOf(ranked, depth),
      reranked,
      plainRankOf: docId => plainRanks().get(docId),
      shownRankOf: docId => shownRanks().get(docId),
    };
  }

  async searchByMeaning(query: string, depth: number): Promise<LiveEtdSearch> {
    await this.ready;
    const doc = this.window().document;
    const box = doc.querySelector<HTMLInputElement>('#q');
    if (box) box.value = query;
    const { setMode, vecRun } = this.pageFunctions();
    if (typeof setMode !== 'function' || typeof vecRun !== 'function') {
      throw new Error(
        'live page has no setMode()/vecRun(): its script has changed',
      );
    }
    // As its Vector rank button does, short of rewriting the page's url.
    setMode('vec');
    await vecRun(query);
    const failure = doc.querySelector('#stat .err');
    if (failure) throw new Error(`live page: ${failure.textContent}`);

    const { lastVec, lastVecCand } = this.readVectorState();
    if (!Array.isArray(lastVec) || !Array.isArray(lastVecCand)) {
      throw new Error(
        'live page has no lastVec/lastVecCand: its script has changed',
      );
    }
    // Its candidates are [did, score, ...]; ours number a did as did + 1.
    const shown = (lastVec as { did?: unknown }[]).map(
      entry => Number(entry?.did) + 1,
    );
    const all = (lastVecCand as unknown[]).map(entry =>
      Array.isArray(entry) ? Number(entry[0]) + 1 : NaN,
    );
    const allRanks = lazyRanks(() => all);
    const shownRanks = lazyRanks(() => shown);
    return {
      version: this.readState().version,
      total: all.length,
      status: doc.querySelector('#stat')?.textContent?.trim() ?? '',
      docIds: shown.slice(0, depth),
      reranked: Promise.resolve(undefined),
      plainRankOf: docId => allRanks().get(docId),
      shownRankOf: docId => shownRanks().get(docId),
    };
  }

  /** The page's top-level functions this drives, from its own realm. */
  private pageFunctions(): {
    setMode?: (mode: 'text' | 'vec') => void;
    vecRun?: (query: string) => Promise<void>;
  } {
    const win = this.window() as unknown as { Function: FunctionConstructor };
    return new win.Function(
      `return {
        setMode: typeof setMode === 'function' ? setMode : undefined,
        vecRun: typeof vecRun === 'function' ? vecRun : undefined,
      };`,
    )();
  }

  private readVectorState(): { lastVec: unknown; lastVecCand: unknown } {
    const win = this.window() as unknown as { Function: FunctionConstructor };
    return new win.Function(
      `return {
        lastVec: typeof lastVec !== 'undefined' ? lastVec : undefined,
        lastVecCand: typeof lastVecCand !== 'undefined' ? lastVecCand : undefined,
      };`,
    )();
  }

  /**
   * Wraps the page's phraseBoost() so a run() that boosts hands over its
   * promise. run() calls it through the global binding, which a top-level
   * function declaration shares with `window`.
   */
  private watchBoost(win: Window): void {
    if (this.boostWatched) return;
    const target = win as unknown as { phraseBoost?: PhraseBoost };
    const original = target.phraseBoost;
    if (typeof original !== 'function') {
      throw new Error('live page has no phraseBoost(): its script has changed');
    }
    target.phraseBoost = (...args) => {
      const boost = original.apply(win, args);
      this.boost = boost;
      return boost;
    };
    this.boostWatched = true;
  }

  /** The page's whole displayed order, once its boost has applied. */
  private async rerankedOrder(boost: Promise<unknown>): Promise<number[]> {
    // run() applies the boosted order in its own then(), attached before ours.
    await boost;
    const { lastRanked } = this.readState();
    if (!Array.isArray(lastRanked)) {
      throw new Error(
        'live page has no lastRanked ranking: its script has changed',
      );
    }
    return docIdsOf(lastRanked);
  }

  private window(): Window {
    const win = this.iframe.contentWindow;
    if (!win) throw new Error('live page iframe is not attached');
    return win;
  }

  private readState(): LivePageState {
    const win = this.window() as unknown as { Function: FunctionConstructor };
    // A function made in the page's own realm sees its top-level `let`s.
    const read = new win.Function(
      `return {
        booted: !!(typeof META !== 'undefined' && META && DIR),
        bootError: typeof BOOTERR !== 'undefined' ? BOOTERR : null,
        version: typeof V !== 'undefined' ? V : '',
        lastAll: typeof lastAll !== 'undefined' ? lastAll : undefined,
        lastRanked: typeof lastRanked !== 'undefined' ? lastRanked : undefined,
      };`,
    );
    return read() as LivePageState;
  }

  private async waitForBoot(): Promise<string> {
    const deadline = Date.now() + BOOT_TIMEOUT_MS;
    for (;;) {
      let state: LivePageState | undefined;
      try {
        state = this.readState();
      } catch {
        // Not loaded yet, or still about:blank.
      }
      if (state?.bootError) {
        throw new Error(`live page failed to boot: ${state.bootError}`);
      }
      if (state?.booted) return state.version;
      if (Date.now() > deadline) {
        throw new Error(
          'live page did not finish booting (is it served same-origin, through /etd-index?)',
        );
      }
      await new Promise(resolve => {
        setTimeout(resolve, BOOT_CHECK_MS);
      });
    }
  }
}

/** The first `depth` docIds of a page ranking: [docId, score] pairs. */
function docIdsOf(ranked: unknown[], depth = ranked.length): number[] {
  return ranked
    .slice(0, depth)
    .map(entry => (Array.isArray(entry) ? Number(entry[0]) : NaN));
}

function asArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

/** docId -> 1-based rank, built on first use: rankings run to 100,000s. */
function lazyRanks(order: () => number[]): () => Map<number, number> {
  let ranks: Map<number, number> | undefined;
  return () => {
    ranks ??= new Map(order().map((docId, i) => [docId, i + 1]));
    return ranks;
  };
}
