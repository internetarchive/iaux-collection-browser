import { LitElement, PropertyValues, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import type { EtdEngine, EtdQuery, EtdRecord } from '../etd-engine';
import { LiveEtdPage, LiveEtdSearch, LiveEtdSource } from './live-etd-page';
import { RankDiff, RankedDoc, diffRankings } from './rank-diff';
import { drawerStyles } from '../demo/drawer-styles';
import type { VectorQuery } from '../engine/vector/static-vector-engine';

/** Our engine's answer to one query, cut to the compared depth. */
interface OurSearch {
  total: number;
  approximate: boolean;
  records: EtdRecord[];
  /** The query itself, to look up where ours ranks a doc it didn't show. */
  query: EtdQuery;
}

/** The comparison the table lays out. */
interface TableComparison {
  diff: RankDiff;
  /** What ours is compared against, for the heading. */
  against: string;
  /** Where that live order ranks a doc. */
  liveRankOf: (docId: number) => number | undefined;
}

/** Where the comparison against the live page's displayed order stands. */
type ShownComparison =
  | { state: 'waiting' }
  | { state: 'not-reranked' }
  | { state: 'compared'; diff: RankDiff }
  | { state: 'failed'; error: string };

interface Comparison {
  /** Text rank, or vector rank (search by meaning). */
  rank: 'text' | 'vector';
  query: string;
  ours: OurSearch;
  theirs: LiveEtdSearch;
  /** Against the live page's ranking before its phrase boost. */
  diff: RankDiff;
  /** Against the order the live page displays. */
  shown: ShownComparison;
  /** What our phrase boost moved in and out of the top; absent if none ran. */
  hidden?: HiddenByBoost;
  titles: Map<number, string>;
}

/** Docs our phrase boost moved into or out of the compared top. */
interface HiddenByBoost {
  words: readonly string[];
  /** In the top before the boost, out of it after. */
  pushedOut: HiddenRow[];
  /** Out of the top before the boost, in it after. */
  pulledIn: HiddenRow[];
}

interface HiddenRow {
  docId: number;
  before?: number;
  after?: number;
  placement?: ReturnType<NonNullable<EtdQuery['boost']>['placement']>;
}

/**
 * Demo-only: runs each query through both the ported ETD engine and the live
 * etd-search page (in an iframe), and shows how their rankings differ.
 *
 * Ours is compared twice: against the order the live page displays, and
 * against its ranking before its phrase boost. The live page boosts an
 * unquoted 2-6 word query's head 1-4 s after its first results show, so the
 * displayed-order comparison lands later. Ours applies the same boost
 * before its first results, so it should match the displayed order.
 */
@customElement('etd-compare-panel')
export class EtdComparePanel extends LitElement {
  @property({ attribute: false }) engine?: EtdEngine;

  @property() query?: string;

  /**
   * Which ranking `engine` is: text (compared on every search) or vector
   * (compared on request, since the live page's own search by meaning reads
   * ~80 MB more and would skew this page's timings).
   */
  @property() rank: 'text' | 'vector' = 'text';

  /** The live page. Must be same-origin with the demo. */
  @property() pageUrl = '/etd-index/search.html';

  /** How many top results to compare. */
  @property({ type: Number }) depth = 50;

  /** Replaces the iframe-driven live page, for tests. */
  @property({ attribute: false }) liveSource?: LiveEtdSource;

  /** Checks the live page exists before loading it; replaceable for tests. */
  @property({ attribute: false }) fetchFn: typeof fetch = (...args) =>
    fetch(...args);

  /**
   * Whether the item has a live page: an item other than etd-search may
   * publish an index without one, and then there's nothing to compare with.
   */
  @state() private livePage: 'checking' | 'present' | 'missing' = 'checking';

  @state() private comparison?: Comparison;

  @state() private error?: string;

  @state() private busy = false;

  @query('iframe') private iframe?: HTMLIFrameElement;

  /** Bumped per comparison, so a superseded one doesn't paint. */
  private generation = 0;

  private abort?: AbortController;

  protected firstUpdated(): void {
    if (this.liveSource) {
      this.livePage = 'present';
      return;
    }
    this.checkLivePage();
  }

  protected updated(): void {
    if (!this.liveSource && this.iframe) {
      this.liveSource = new LiveEtdPage(this.iframe);
    }
  }

  /**
   * Only a 404 counts as missing: anything else still loads the page, which
   * then says what went wrong itself.
   */
  private async checkLivePage(): Promise<void> {
    try {
      const response = await this.fetchFn(this.pageUrl, { method: 'HEAD' });
      this.livePage = response.status === 404 ? 'missing' : 'present';
    } catch {
      this.livePage = 'present';
    }
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (
      !(
        changed.has('query') ||
        changed.has('engine') ||
        changed.has('liveSource') ||
        changed.has('rank')
      )
    ) {
      return;
    }
    if (this.rank === 'vector') {
      // Waits for the button; drop any comparison from another query.
      this.abort?.abort();
      this.generation += 1;
      this.comparison = undefined;
      this.error = undefined;
      this.busy = false;
    } else if (this.engine && this.liveSource) {
      this.compare();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.abort?.abort();
  }

  private async compare(): Promise<void> {
    if (this.rank === 'vector') {
      await this.compareVector();
      return;
    }
    this.abort?.abort();
    const query = this.query?.trim() ?? '';
    const generation = (this.generation += 1);
    if (!query || !this.engine || !this.liveSource) {
      this.comparison = undefined;
      this.error = undefined;
      this.busy = false;
      return;
    }

    const abort = new AbortController();
    this.abort = abort;
    this.busy = true;
    this.error = undefined;
    try {
      const [ours, theirs] = await Promise.all([
        this.searchOurs(this.engine, query, abort.signal),
        this.liveSource.search(query, this.depth),
      ]);
      const ourIds = ours.records.map(record => record.docId);
      const titles = new Map(
        ours.records.map(record => [record.docId, record.title]),
      );
      const diff = this.diff(ourIds, theirs.docIds);
      const hidden = this.hiddenByBoost(ours);
      await this.readTitles(
        [
          ...diff.onlyTheirs.map(doc => doc.docId),
          ...(hidden?.pushedOut.map(row => row.docId) ?? []),
        ],
        titles,
        abort.signal,
      );
      if (generation !== this.generation) return;
      const comparison: Comparison = {
        rank: 'text',
        query,
        ours,
        theirs,
        diff,
        shown: { state: 'waiting' },
        hidden,
        titles,
      };
      this.comparison = comparison;
      this.busy = false;

      const shown = await this.compareShown(
        ourIds,
        theirs,
        titles,
        abort.signal,
      );
      if (generation !== this.generation) return;
      this.comparison = { ...comparison, shown };
    } catch (err) {
      if (generation !== this.generation) return;
      this.comparison = undefined;
      this.error = err instanceof Error ? err.message : String(err);
    } finally {
      if (generation === this.generation) this.busy = false;
    }
  }

  /** Our vector rank's top against the live page's Vector rank. */
  private async compareVector(): Promise<void> {
    this.abort?.abort();
    const query = this.query?.trim() ?? '';
    const generation = (this.generation += 1);
    const live = this.liveSource;
    if (!query || !this.engine || !live) return;
    if (!live.searchByMeaning) {
      this.error = "the live page can't search by meaning";
      return;
    }
    const abort = new AbortController();
    this.abort = abort;
    this.busy = true;
    this.error = undefined;
    try {
      // One after the other: both read ~80 MB, and side by side each would
      // be timed on half the bandwidth.
      const ours = await this.searchOurs(this.engine, query, abort.signal);
      const theirs = await live.searchByMeaning(query, this.depth);
      const titles = new Map(
        ours.records.map(record => [record.docId, record.title]),
      );
      const diff = this.diff(
        ours.records.map(record => record.docId),
        theirs.docIds,
      );
      await this.readTitles(
        diff.onlyTheirs.map(doc => doc.docId),
        titles,
        abort.signal,
      );
      if (generation !== this.generation) return;
      this.comparison = {
        rank: 'vector',
        query,
        ours,
        theirs,
        diff,
        shown: { state: 'not-reranked' },
        titles,
      };
    } catch (err) {
      if (generation !== this.generation) return;
      this.comparison = undefined;
      this.error = err instanceof Error ? err.message : String(err);
    } finally {
      if (generation === this.generation) this.busy = false;
    }
  }

  private async compareShown(
    ourIds: number[],
    theirs: LiveEtdSearch,
    titles: Map<number, string>,
    signal: AbortSignal,
  ): Promise<ShownComparison> {
    try {
      const reranked = await theirs.reranked;
      if (!reranked) return { state: 'not-reranked' };
      const diff = this.diff(ourIds, reranked);
      await this.readTitles(
        diff.onlyTheirs.map(doc => doc.docId),
        titles,
        signal,
      );
      return { state: 'compared', diff };
    } catch (err) {
      return {
        state: 'failed',
        error: err instanceof Error ? err.message : String(err),
      };
    }
  }

  private diff(ours: number[], theirs: number[]): RankDiff {
    return diffRankings(ours, theirs, [
      ...[10, 20, 50].filter(depth => depth < this.depth),
      this.depth,
    ]);
  }

  /** Reads titles for docs only the live page ranks, which ours didn't return. */
  /**
   * The docs our phrase boost moved into or out of the top `depth`, with
   * their ranks before and after and where the words sit in each.
   */
  private hiddenByBoost(ours: OurSearch): HiddenByBoost | undefined {
    const { boost } = ours.query;
    if (!boost) return undefined;
    const after = ours.records.map(record => record.docId);
    const before = boost.topBefore(this.depth);
    const row = (docId: number): HiddenRow => ({
      docId,
      before: boost.rankBefore(docId),
      after: ours.query.rankOf?.(docId),
      placement: boost.placement(docId),
    });
    return {
      words: boost.words,
      pushedOut: before.filter(d => !after.includes(d)).map(row),
      pulledIn: after.filter(d => !before.includes(d)).map(row),
    };
  }

  /** Reads titles for docs ours didn't return a record for. */
  private async readTitles(
    docIds: readonly number[],
    titles: Map<number, string>,
    signal: AbortSignal,
  ): Promise<void> {
    const missing = await Promise.all(
      docIds
        .filter(docId => !titles.has(docId))
        .map(docId => this.engine!.record(docId, { signal })),
    );
    for (const record of missing) {
      if (record) titles.set(record.docId, record.title);
    }
  }

  private async searchOurs(
    engine: EtdEngine,
    text: string,
    signal: AbortSignal,
  ): Promise<OurSearch> {
    const results = await engine.query(text, {}, { signal });
    const records = await results.next(this.depth, { signal });
    return {
      total: results.result.total,
      approximate: results.result.approximate,
      records,
      query: results,
    };
  }

  render() {
    return html`
      <section aria-labelledby="compare-heading">
        <h2 id="compare-heading">Compare with the live etd-search page</h2>
        ${this.vectorButtonTemplate}
        <div role="status" aria-live="polite">${this.summaryTemplate}</div>
        ${this.rankingTemplate} ${this.hiddenTemplate}
        ${this.livePage === 'missing'
          ? nothing
          : html`<details>
              <summary>Live etd-search page</summary>
              ${this.liveSourceIsIframe && this.livePage === 'present'
                ? html`<iframe
                    src=${this.pageUrl}
                    title="Live etd-search page"
                  ></iframe>`
                : nothing}
            </details>`}
      </section>
    `;
  }

  /** Vector rank compares on request: the button that asks. */
  private get vectorButtonTemplate() {
    if (this.rank !== 'vector' || this.livePage === 'missing') return nothing;
    return html`<button
      type="button"
      ?disabled=${this.busy || !this.query?.trim()}
      @click=${() => this.compareVector()}
    >
      Compare vector rank with the live page
    </button>`;
  }

  /** Whether the live page is the iframe here, rather than a test double. */
  private get liveSourceIsIframe(): boolean {
    return !this.liveSource || this.liveSource instanceof LiveEtdPage;
  }

  private get summaryTemplate() {
    if (this.livePage === 'missing') {
      return html`<p>
        This item has no search.html, so there's no live page to compare with.
      </p>`;
    }
    if (this.error) {
      return html`<p class="error">⚠️ Couldn't compare: ${this.error}</p>`;
    }
    if (this.busy) return html`<p>Comparing…</p>`;
    if (!this.comparison) {
      return this.rank === 'vector'
        ? html`<p>
            Vector rank is compared when you ask: the live page's own search by
            meaning reads as much again.
          </p>`
        : html`<p>Search for something to compare the two rankings.</p>`;
    }
    if (this.comparison.rank === 'vector') return this.vectorSummary;

    const { ours, theirs, diff, shown } = this.comparison;
    const totalsMatch = ours.total === theirs.total;
    return html`
      <ul class="summary">
        <li class="detail">
          Index ${theirs.version || 'unversioned'}. Both re-rank an unquoted 2–6
          word query to put the words-side-by-side matches first, so for those,
          ours should differ from the live page's order before its re-ranking
          and match it after. The live page shows its plain order first and
          re-ranks a moment later.
        </li>
        <li>Before the live page's re-ranking: ${this.diffSummary(diff)}</li>
        <li>As the live page shows them: ${this.shownSummary(shown)}</li>
        <li>
          ${totalsMatch ? '✅ Totals match' : '⚠️ Totals differ'}: ours
          ${ours.approximate ? '~' : ''}${ours.total.toLocaleString()}, live
          ${theirs.total.toLocaleString()}
          <span class="detail">(live: “${theirs.status}”)</span>
        </li>
      </ul>
    `;
  }

  private get vectorSummary() {
    const { ours, theirs, diff } = this.comparison!;
    const scanned = (ours.query as VectorQuery).scan?.candidates;
    return html`
      <ul class="summary">
        <li class="detail">
          Vector rank (search by meaning): the live page's top
          ${theirs.docIds.length} against ours. Both scan the same cells and
          re-score the best 400 exactly, so they should match.
        </li>
        <li>${this.diffSummary(diff)}</li>
        <li>
          ${scanned === theirs.total ? '✅' : '⚠️'} Candidates scanned: ours
          ${scanned?.toLocaleString() ?? '?'}, live
          ${theirs.total.toLocaleString()}
          <span class="detail">(live: “${theirs.status}”)</span>
        </li>
      </ul>
    `;
  }

  private diffSummary(diff: RankDiff) {
    if (diff.identical) {
      return `✅ top ${diff.docs.length} identical, same order`;
    }
    return html`⚠️ top ${this.depth} differ:
    ${diff.overlap.map(
      o =>
        html`<span class="overlap"
          >${o.shared}/${o.depth} shared in top ${o.depth}</span
        >`,
    )}
    · ${diff.moved.length} moved · ${diff.onlyOurs.length} only ours ·
    ${diff.onlyTheirs.length} only live`;
  }

  private shownSummary(shown: ShownComparison) {
    switch (shown.state) {
      case 'waiting':
        return '⏳ waiting for its re-ranking…';
      case 'not-reranked':
        return '✅ no re-ranking for this query, so same as above';
      case 'failed':
        return html`<span class="error"
          >⚠️ couldn't read its order: ${shown.error}</span
        >`;
      default:
        return this.diffSummary(shown.diff);
    }
  }

  /** The comparison the table lays out: the displayed order once known. */
  private get tableDiff(): TableComparison | undefined {
    if (!this.comparison) return undefined;
    const { diff, shown, theirs } = this.comparison;
    if (shown.state === 'compared') {
      return {
        diff: shown.diff,
        against: 'as the live page shows them',
        liveRankOf: docId => theirs.shownRankOf(docId),
      };
    }
    return {
      diff,
      against:
        shown.state === 'not-reranked'
          ? 'the live page'
          : "before the live page's re-ranking",
      liveRankOf: docId => theirs.plainRankOf(docId),
    };
  }

  /**
   * While the live page is still re-ranking: its order can still change, so
   * a difference now isn't worth opening the table for.
   */
  private get awaitingRerank(): boolean {
    return this.comparison?.shown.state === 'waiting';
  }

  /**
   * The ranking side by side. Always there, so matching rows can be checked
   * too, but only open when the two differ.
   */
  private get rankingTemplate() {
    const table = this.tableDiff;
    if (!table || !table.diff.docs.length) return nothing;
    const { diff, against } = table;
    const heading = `Top ${this.depth}${
      diff.identical ? ', identical' : ''
    }: ours vs ${against}`;
    // Keyed by query, so a drawer someone opened or closed resets for the
    // next search, but not when the live page's re-ranking lands.
    return keyed(
      this.comparison!.query,
      html`
        <details .open=${!diff.identical && !this.awaitingRerank}>
          <summary>${heading}</summary>
          <div
            class="table-scroll"
            role="region"
            aria-label=${heading}
            tabindex="0"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">Ours</th>
                  <th scope="col">Live</th>
                  <th scope="col">Difference</th>
                  <th scope="col">Title</th>
                  <th scope="col">Why</th>
                </tr>
              </thead>
              <tbody>
                ${diff.docs.map(doc => this.rowTemplate(doc, table))}
              </tbody>
            </table>
          </div>
        </details>
      `,
    );
  }

  /**
   * What our phrase boost hid: the docs it pushed out of the top and the
   * ones it pulled in, each with where the query's words sit in it.
   */
  private get hiddenTemplate() {
    const hidden = this.comparison?.hidden;
    if (!hidden) return nothing;
    const moved = hidden.pushedOut.length + hidden.pulledIn.length;
    const heading = moved
      ? `Hidden by re-ranking: ${hidden.pushedOut.length} pushed out of the top ${this.depth}, ${hidden.pulledIn.length} pulled in`
      : `Hidden by re-ranking: none, the top ${this.depth} holds the same results`;
    return keyed(
      this.comparison!.query,
      html`
        <details class="hidden-by-boost" .open=${moved > 0}>
          <summary>${heading}</summary>
          ${moved
            ? html`<div
                class="table-scroll"
                role="region"
                aria-label=${heading}
                tabindex="0"
              >
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Before</th>
                      <th scope="col">After</th>
                      <th scope="col">Change</th>
                      <th scope="col">Title</th>
                      <th scope="col">Why</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${hidden.pushedOut.map(row =>
                      this.hiddenRowTemplate(row, 'pushed out', hidden.words),
                    )}
                    ${hidden.pulledIn.map(row =>
                      this.hiddenRowTemplate(row, 'pulled in', hidden.words),
                    )}
                  </tbody>
                </table>
              </div>`
            : nothing}
        </details>
      `,
    );
  }

  private hiddenRowTemplate(
    row: HiddenRow,
    change: 'pushed out' | 'pulled in',
    words: readonly string[],
  ) {
    const title = this.comparison?.titles.get(row.docId) ?? `doc ${row.docId}`;
    const rank = (n?: number) =>
      n ? `#${n.toLocaleString()}` : `past #${RANKED.toLocaleString()}`;
    return html`
      <tr class=${change === 'pushed out' ? 'only-live' : 'only-ours'}>
        <td>${rank(row.before)}</td>
        <td>${rank(row.after)}</td>
        <td><span class="badge">${change}</span></td>
        <td>${title}</td>
        <td class="why">${boostReason(row.placement, change, words)}</td>
      </tr>
    `;
  }

  private rowTemplate(doc: RankedDoc, table: TableComparison) {
    const [kind, label] = rowKind(doc);
    const title = this.comparison?.titles.get(doc.docId) ?? `doc ${doc.docId}`;
    return html`
      <tr class=${kind}>
        <td>${doc.ours ?? '–'}</td>
        <td>${doc.theirs ?? '–'}</td>
        <td>
          ${kind === 'only-ours' || kind === 'only-live'
            ? html`<span class="badge">${label}</span>`
            : label}
        </td>
        <td>${title}</td>
        <td class="why">${this.whyOmitted(doc, table) ?? nothing}</td>
      </tr>
    `;
  }

  /**
   * For a doc only one side's top ranks hold: where the other side has it,
   * and a known cause when the query uses something not ported yet.
   */
  private whyOmitted(
    doc: RankedDoc,
    table: TableComparison,
  ): string | undefined {
    if (!this.comparison) return undefined;
    const { ours, theirs, query } = this.comparison;
    if (this.comparison.rank === 'vector') {
      if (doc.theirs === undefined) {
        const rank = theirs.plainRankOf(doc.docId);
        return rank
          ? `live ranks it #${rank.toLocaleString()}`
          : "live didn't scan it";
      }
      if (doc.ours === undefined) {
        const rank = ours.query.rankOf?.(doc.docId);
        if (rank) return `ours ranks it #${rank.toLocaleString()}`;
        return ours.query.matches?.(doc.docId)
          ? 'ours scanned it, past its top 400'
          : "ours didn't scan it";
      }
      return undefined;
    }
    if (doc.theirs === undefined) {
      const rank = table.liveRankOf(doc.docId);
      if (rank) return `live ranks it #${rank.toLocaleString()}`;
      if (theirs.plainRankOf(doc.docId)) {
        return `live matches it, past its top ${RANKED.toLocaleString()}`;
      }
      return withCause("live doesn't match it", omissionCauses(query, 'live'));
    }
    if (doc.ours === undefined) {
      const rank = ours.query.rankOf?.(doc.docId);
      if (rank) return `ours ranks it #${rank.toLocaleString()}`;
      if (!ours.query.matches) return undefined;
      if (ours.query.matches(doc.docId)) {
        return `ours matches it, past its top ${RANKED.toLocaleString()}`;
      }
      return withCause("ours doesn't match it", omissionCauses(query, 'ours'));
    }
    return undefined;
  }

  static styles = [
    drawerStyles,
    css`
      :host {
        display: block;
        margin: 1rem 0;
        padding: 0.5rem 1rem;
        border: 1px solid #ccc;
        font-size: 1.4rem;
      }

      h2 {
        font-size: 1.6rem;
        margin: 0.5rem 0;
      }

      .summary {
        margin: 0;
        padding-left: 1.5rem;
      }

      .detail {
        color: #555;
      }

      .overlap + .overlap::before {
        content: ', ';
      }

      .error {
        color: #b00;
      }

      .table-scroll {
        max-height: 45vh;
        overflow-y: auto;
        border: 1px solid #c9d4e0;
        border-top: none;
      }

      table {
        border-collapse: collapse;
        width: 100%;
      }

      th,
      td {
        padding: 0.2rem 0.6rem;
        text-align: left;
        border-bottom: 1px solid #eee;
      }

      td.why {
        color: #444;
        font-size: 1.2rem;
      }

      td:nth-child(-n + 3) {
        white-space: nowrap;
      }

      th {
        position: sticky;
        top: 0;
        background: #f4f4f4;
      }

      /* Moved rows are most rows, so only the one-side rows get a highlight. */
      tr.moved td:nth-child(3) {
        color: #6b5600;
      }

      tr.only-ours,
      tr.only-live {
        font-weight: 600;
      }

      tr.only-ours {
        background: #dcebff;
        box-shadow: inset 4px 0 #2c6bc9;
      }

      tr.only-live {
        background: #ffe0e0;
        box-shadow: inset 4px 0 #c03a3a;
      }

      .badge {
        display: inline-block;
        padding: 0 0.6rem;
        border-radius: 1rem;
        color: white;
        font-size: 1.2rem;
        white-space: nowrap;
      }

      tr.only-ours .badge {
        background: #2c6bc9;
      }

      tr.only-live .badge {
        background: #c03a3a;
      }

      iframe {
        display: block;
        width: 100%;
        height: 70vh;
        border: 1px solid #c9d4e0;
        border-top: none;
        box-sizing: border-box;
      }
    `,
  ];
}

/** How many results each side ranks; past this, a match has no rank. */
const RANKED = 3000;

/**
 * Known reasons, from the query's syntax, that `side` would miss a doc the
 * other side matches: features of the live page not ported yet.
 */
export function omissionCauses(query: string, side: 'ours' | 'live'): string[] {
  const causes: string[] = [];
  if (/(^|\s)(inst|institution):/i.test(query)) {
    causes.push(
      'the live page matches institutions through its institution list, not yet ported',
    );
  }
  // Ours keeps a quoted phrase's words anywhere near each other; the live
  // page drops a doc where they aren't side by side.
  if (side === 'live' && query.includes('"')) {
    causes.push(
      'the live page only keeps it if the quoted words are side by side, not yet ported',
    );
  }
  return causes;
}

function withCause(reason: string, causes: string[]): string {
  return [reason, ...causes].join(' · ');
}

/**
 * Why the phrase boost moved a doc, from where the query's words sit in it.
 * Exported for tests.
 */
export function boostReason(
  placement: HiddenRow['placement'],
  change: 'pushed out' | 'pulled in',
  words: readonly string[],
): string {
  const together = `'${words.join(' ')}'`;
  if (placement === undefined) {
    return "its text wasn't read in time, so it counts as not side by side";
  }
  if (placement === 'apart') {
    return `${listWords(words)} aren't side by side in it`;
  }
  if (change === 'pulled in')
    return `${together} is side by side in its ${placement}`;
  // Pushed out though the words are together: other-field matches rank
  // below every title match.
  return placement === 'title'
    ? `${together} is in its title, but more title matches ranked above it`
    : `${together} is side by side only in its ${placement}, and title matches go first`;
}

function listWords(words: readonly string[]): string {
  const quoted = words.map(word => `'${word}'`);
  return quoted.length > 1
    ? `${quoted.slice(0, -1).join(', ')} and ${quoted[quoted.length - 1]}`
    : quoted.join('');
}

/** The row's class and its text label; the label carries the meaning, not the color. */
function rowKind(doc: RankedDoc): [string, string] {
  if (doc.theirs === undefined) return ['only-ours', 'only ours'];
  if (doc.ours === undefined) return ['only-live', 'only live'];
  if (doc.ours === doc.theirs) return ['same', 'same'];
  const shift = doc.theirs - doc.ours;
  return ['moved', shift > 0 ? `ours ${shift} higher` : `ours ${-shift} lower`];
}

declare global {
  interface HTMLElementTagNameMap {
    'etd-compare-panel': EtdComparePanel;
  }
}
