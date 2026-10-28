import { LitElement, PropertyValues, css, html, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { EtdEngine, EtdRecord } from '../etd-engine';
import { LiveEtdPage, LiveEtdSearch, LiveEtdSource } from './live-etd-page';
import { RankDiff, RankedDoc, diffRankings } from './rank-diff';

/** Our engine's answer to one query, cut to the compared depth. */
interface OurSearch {
  total: number;
  approximate: boolean;
  records: EtdRecord[];
}

/** Where the comparison against the live page's displayed order stands. */
type ShownComparison =
  | { state: 'waiting' }
  | { state: 'not-reranked' }
  | { state: 'compared'; diff: RankDiff }
  | { state: 'failed'; error: string };

interface Comparison {
  query: string;
  ours: OurSearch;
  theirs: LiveEtdSearch;
  /** Against the live page's ranking before its phrase boost. */
  diff: RankDiff;
  /** Against the order the live page displays. */
  shown: ShownComparison;
  titles: Map<number, string>;
}

/**
 * Demo-only: runs each query through both the ported ETD engine and the live
 * etd-search page (in an iframe), and shows how their rankings differ.
 *
 * Ours is compared twice: against the live page's ranking before its phrase
 * boost (the part ported so far), and against the order it displays. The
 * boost re-orders an unquoted 2-6 word query's head 1-4 s after the first
 * results show, so the second comparison lands later.
 */
@customElement('etd-compare-panel')
export class EtdComparePanel extends LitElement {
  @property({ attribute: false }) engine?: EtdEngine;

  @property() query?: string;

  /** The live page. Must be same-origin with the demo. */
  @property() pageUrl = '/etd-index/search.html';

  /** How many top results to compare. */
  @property({ type: Number }) depth = 50;

  /** Replaces the iframe-driven live page, for tests. */
  @property({ attribute: false }) liveSource?: LiveEtdSource;

  @state() private comparison?: Comparison;

  @state() private error?: string;

  @state() private busy = false;

  @query('iframe') private iframe?: HTMLIFrameElement;

  /** Bumped per comparison, so a superseded one doesn't paint. */
  private generation = 0;

  private abort?: AbortController;

  protected firstUpdated(): void {
    if (!this.liveSource && this.iframe) {
      this.liveSource = new LiveEtdPage(this.iframe);
    }
  }

  protected willUpdate(changed: PropertyValues<this>): void {
    if (
      (changed.has('query') ||
        changed.has('engine') ||
        changed.has('liveSource')) &&
      this.engine &&
      this.liveSource
    ) {
      this.compare();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.abort?.abort();
  }

  private async compare(): Promise<void> {
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
      await this.readTitles(diff, titles, abort.signal);
      if (generation !== this.generation) return;
      const comparison: Comparison = {
        query,
        ours,
        theirs,
        diff,
        shown: { state: 'waiting' },
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
      await this.readTitles(diff, titles, signal);
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
  private async readTitles(
    diff: RankDiff,
    titles: Map<number, string>,
    signal: AbortSignal,
  ): Promise<void> {
    const missing = await Promise.all(
      diff.onlyTheirs
        .filter(doc => !titles.has(doc.docId))
        .map(doc => this.engine!.record(doc.docId, { signal })),
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
    };
  }

  render() {
    return html`
      <section aria-labelledby="compare-heading">
        <h2 id="compare-heading">Compare with the live etd-search page</h2>
        <div role="status" aria-live="polite">${this.summaryTemplate}</div>
        ${this.rankingTemplate}
        <details>
          <summary>Live etd-search page</summary>
          ${this.liveSourceIsIframe
            ? html`<iframe
                src=${this.pageUrl}
                title="Live etd-search page"
              ></iframe>`
            : nothing}
        </details>
      </section>
    `;
  }

  /** Whether the live page is the iframe here, rather than a test double. */
  private get liveSourceIsIframe(): boolean {
    return !this.liveSource || this.liveSource instanceof LiveEtdPage;
  }

  private get summaryTemplate() {
    if (this.error) {
      return html`<p class="error">⚠️ Couldn't compare: ${this.error}</p>`;
    }
    if (this.busy) return html`<p>Comparing…</p>`;
    if (!this.comparison) {
      return html`<p>Search for something to compare the two rankings.</p>`;
    }

    const { ours, theirs, diff, shown } = this.comparison;
    const totalsMatch = ours.total === theirs.total;
    return html`
      <ul class="summary">
        <li>
          ${totalsMatch ? '✅ Totals match' : '⚠️ Totals differ'}: ours
          ${ours.approximate ? '~' : ''}${ours.total.toLocaleString()}, live
          ${theirs.total.toLocaleString()}
          <span class="detail">(live: “${theirs.status}”)</span>
        </li>
        <li>Before the live page's re-ranking: ${this.diffSummary(diff)}</li>
        <li>As the live page shows them: ${this.shownSummary(shown)}</li>
        <li class="detail">
          Index ${theirs.version || 'unversioned'}. The live page re-ranks an
          unquoted 2–6 word query to put the words-side-by-side matches first;
          that phrase boost isn't ported yet.
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
  private get tableDiff(): [RankDiff, string] | undefined {
    if (!this.comparison) return undefined;
    const { diff, shown } = this.comparison;
    if (shown.state === 'compared') {
      return [shown.diff, 'as the live page shows them'];
    }
    return [diff, "before the live page's re-ranking"];
  }

  private get rankingTemplate() {
    const table = this.tableDiff;
    if (!table || table[0].identical) return nothing;
    const [diff, against] = table;
    return html`
      <details open>
        <summary>Top ${this.depth}, ours vs ${against}</summary>
        <div
          class="table-scroll"
          role="region"
          aria-label="Top ${this.depth}, ours vs ${against}"
          tabindex="0"
        >
          <table>
            <thead>
              <tr>
                <th scope="col">Ours</th>
                <th scope="col">Live</th>
                <th scope="col">Difference</th>
                <th scope="col">Title</th>
              </tr>
            </thead>
            <tbody>
              ${diff.docs.map(doc => this.rowTemplate(doc))}
            </tbody>
          </table>
        </div>
      </details>
    `;
  }

  private rowTemplate(doc: RankedDoc) {
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
      </tr>
    `;
  }

  static styles = css`
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

    details {
      margin: 0.6rem 0;
    }

    /* Drawers: a full-width bar, so the whole row toggles, not just the text. */
    details > summary {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.6rem 0.8rem;
      background: #f1f4f8;
      border: 1px solid #c9d4e0;
      border-radius: 4px;
      font-weight: 600;
      cursor: pointer;
      list-style: none;
      user-select: none;
    }

    details > summary::-webkit-details-marker {
      display: none;
    }

    details > summary::before {
      content: '▸';
      display: inline-block;
      transition: transform 0.15s;
    }

    details[open] > summary::before {
      transform: rotate(90deg);
    }

    details[open] > summary {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    details > summary:hover {
      background: #e3eaf3;
    }

    details > summary:focus-visible {
      outline: 2px solid #2c5f8f;
      outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
      details > summary::before {
        transition: none;
      }
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
  `;
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
