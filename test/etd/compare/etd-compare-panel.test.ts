import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import type { EtdComparePanel } from '../../../src/etd/compare/etd-compare-panel';
import '../../../src/etd/compare/etd-compare-panel';
import type {
  LiveEtdSearch,
  LiveEtdSource,
} from '../../../src/etd/compare/live-etd-page';
import { MockEtdEngine, mockEtdTheses } from '../../mocks/mock-etd-engine';

interface StubAnswer {
  total: number;
  status: string;
  docIds: number[];
  /** The displayed order after the phrase boost; omitted when not boosted. */
  reranked?: number[];
}

/** A live page that answers every query with the same ranking. */
class StubLivePage implements LiveEtdSource {
  readonly ready = Promise.resolve('20261026-5e5902');

  readonly queries: string[] = [];

  failNext?: Error;

  /** Holds the re-ranked order back until called, like the boost's 1-4 s. */
  releaseRerank?: () => void;

  constructor(
    private answer: StubAnswer,
    private holdRerank = false,
  ) {}

  async search(query: string, depth: number): Promise<LiveEtdSearch> {
    this.queries.push(query);
    if (this.failNext) {
      const err = this.failNext;
      this.failNext = undefined;
      throw err;
    }
    const { reranked } = this.answer;
    const released = this.holdRerank
      ? new Promise<void>(resolve => {
          this.releaseRerank = resolve;
        })
      : Promise.resolve();
    return {
      version: '20261026-5e5902',
      total: this.answer.total,
      status: this.answer.status,
      docIds: this.answer.docIds.slice(0, depth),
      reranked: released.then(() => reranked?.slice(0, depth)),
    };
  }
}

async function comparePanel(
  live: LiveEtdSource,
  query: string,
  depth = 5,
): Promise<EtdComparePanel> {
  // The mock engine ranks every 'climate' thesis in docId order.
  const engine = new MockEtdEngine(mockEtdTheses(12));
  const el = await fixture<EtdComparePanel>(html`
    <etd-compare-panel
      .engine=${engine}
      .liveSource=${live}
      .depth=${depth}
      .query=${query}
    ></etd-compare-panel>
  `);
  await waitUntil(() => !el.shadowRoot!.textContent!.includes('Comparing'));
  return el;
}

function summary(el: EtdComparePanel): string {
  return el
    .shadowRoot!.querySelector('[role="status"]')!
    .textContent!.replace(/\s+/g, ' ');
}

function rows(el: EtdComparePanel): string[][] {
  return [...el.shadowRoot!.querySelectorAll('tbody tr')].map(tr =>
    [...tr.querySelectorAll('td')].map(td => td.textContent!.trim()),
  );
}

describe('etd-compare-panel', () => {
  it('reports a faithful port as matching, with no ranking table', async () => {
    const live = new StubLivePage({
      total: 12,
      status: '12 matches in 40 ms',
      docIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    });
    const el = await comparePanel(live, 'climate');

    expect(live.queries).to.deep.equal(['climate']);
    expect(summary(el)).to.include('✅ Totals match: ours 12, live 12');
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(summary(el)).to.include(
      "Before the live page's re-ranking: ✅ top 5 identical, same order",
    );
    expect(summary(el)).to.include(
      'As the live page shows them: ✅ no re-ranking for this query',
    );
    expect(el.shadowRoot!.querySelector('table')).to.be.null;
  });

  it('shows a match before re-ranking that differs once the live page re-ranks', async () => {
    // Like sea ice: our ranking is the live page's, until its phrase boost drops
    // doc 1 (an author named Ice) and pulls in doc 6.
    const live = new StubLivePage(
      {
        total: 12,
        status: '12 matches in 40 ms',
        docIds: [1, 2, 3, 4, 5],
        reranked: [2, 3, 4, 5, 6],
      },
      true,
    );
    const el = await comparePanel(live, 'on climate');

    expect(summary(el)).to.include(
      "Before the live page's re-ranking: ✅ top 5 identical",
    );
    expect(summary(el)).to.include('⏳ waiting for its re-ranking');
    expect(el.shadowRoot!.querySelector('table')).to.be.null;

    live.releaseRerank!();
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(summary(el)).to.include(
      'As the live page shows them: ⚠️ top 5 differ: 4/5 shared in top 5 · 4 moved · 1 only ours · 1 only live',
    );
    expect(
      el.shadowRoot!.querySelector('details[open] summary')!.textContent,
    ).to.include('ours vs as the live page shows them');
    expect(rows(el)[0]).to.deep.equal([
      '1',
      '–',
      'only ours',
      'Thesis 1 on climate',
    ]);
    expect(rows(el)[5]).to.deep.equal([
      '–',
      '5',
      'only live',
      'Thesis 6 on climate',
    ]);
  });

  it('flags a different total and lays out where each doc ranks', async () => {
    // The live page ranks 3 first and ranks doc 9 in its top 5, which ours doesn't.
    const live = new StubLivePage({
      total: 13,
      status: '13 matches in 40 ms',
      docIds: [3, 1, 2, 9, 4],
    });
    const el = await comparePanel(live, 'climate');
    await waitUntil(() => !summary(el).includes('waiting'));

    expect(summary(el)).to.include('⚠️ Totals differ: ours 12, live 13');
    expect(
      el.shadowRoot!.querySelector('details[open] summary')!.textContent,
    ).to.include("ours vs before the live page's re-ranking");
    expect(summary(el)).to.include(
      "Before the live page's re-ranking: ⚠️ top 5 differ",
    );
    expect(summary(el)).to.include('4/5 shared in top 5');
    expect(summary(el)).to.include('4 moved · 1 only ours · 1 only live');
    expect(rows(el)).to.deep.equal([
      ['1', '2', 'ours 1 higher', 'Thesis 1 on climate'],
      ['2', '3', 'ours 1 higher', 'Thesis 2 on climate'],
      ['3', '1', 'ours 2 lower', 'Thesis 3 on climate'],
      ['4', '5', 'ours 1 higher', 'Thesis 4 on climate'],
      ['5', '–', 'only ours', 'Thesis 5 on climate'],
      // Not in our top 5, so its title is read from the engine by docId.
      ['–', '4', 'only live', 'Thesis 9 on climate'],
    ]);
  });

  it('says why when the live page cannot answer, then recovers', async () => {
    const live = new StubLivePage({
      total: 12,
      status: '12 matches',
      docIds: [1, 2, 3, 4, 5],
    });
    live.failNext = new Error('live page has no run(): its script has changed');
    const el = await comparePanel(live, 'climate');

    expect(summary(el)).to.include(
      "⚠️ Couldn't compare: live page has no run(): its script has changed",
    );

    el.query = 'on climate';
    await waitUntil(() => summary(el).includes('Totals'));
    expect(summary(el)).to.include('✅ Totals match');
  });

  it('prompts for a query rather than comparing an empty one', async () => {
    const live = new StubLivePage({ total: 0, status: '', docIds: [] });
    const el = await comparePanel(live, '');

    expect(live.queries).to.be.empty;
    expect(summary(el)).to.include('Search for something');
  });
});
