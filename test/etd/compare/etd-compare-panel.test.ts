import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import {
  EtdComparePanel,
  boostReason,
  omissionCauses,
} from '../../../src/etd/compare/etd-compare-panel';
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
  /** The page's whole plain ranking, every match; defaults to `docIds`. */
  plain?: number[];
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
    const plain = this.answer.plain ?? this.answer.docIds;
    let shown = plain;
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
      reranked: released.then(() => {
        if (reranked) shown = reranked;
        return reranked?.slice(0, depth);
      }),
      plainRankOf: docId => rankIn(plain, docId),
      shownRankOf: docId => rankIn(shown, docId),
    };
  }
}

function rankIn(order: number[], docId: number): number | undefined {
  const rank = order.indexOf(docId) + 1;
  return rank || undefined;
}

async function comparePanel(
  live: LiveEtdSource,
  query: string,
  depth = 5,
  // The mock engine ranks every 'climate' thesis in docId order.
  engine = new MockEtdEngine(mockEtdTheses(12)),
): Promise<EtdComparePanel> {
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

/** The side-by-side ranking's drawer. */
function rankingDrawer(el: EtdComparePanel): HTMLDetailsElement {
  return el.shadowRoot!.querySelector('.table-scroll')!.closest('details')!;
}

function drawerHeading(el: EtdComparePanel): string {
  return rankingDrawer(el).querySelector('summary')!.textContent!.trim();
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
    // The index first; the verdicts, ending with the totals, last.
    const lines = [
      ...el.shadowRoot!.querySelectorAll('[role="status"] .summary > li'),
    ].map(li => li.textContent!.trim().split(/[\s:.]/)[0]);
    expect(lines).to.deep.equal(['Index', 'Before', 'As', '✅']);
    expect(summary(el).trim()).to.match(/Totals match: ours 12, live 12 .*\)$/);
    // The ranking is still there to check, but closed: nothing to look at.
    expect(rankingDrawer(el).open).to.be.false;
    expect(drawerHeading(el)).to.equal(
      'Top 5, identical: ours vs the live page',
    );
    expect(rows(el).map(row => row[2])).to.deep.equal([
      'same',
      'same',
      'same',
      'same',
      'same',
    ]);
  });

  it('shows a match before re-ranking that differs once the live page re-ranks', async () => {
    // Like sea ice: our ranking is the live page's, until its phrase boost drops
    // doc 1 (an author named Ice) and pulls in doc 6.
    const live = new StubLivePage(
      {
        total: 12,
        status: '12 matches in 40 ms',
        docIds: [1, 2, 3, 4, 5],
        reranked: [2, 3, 4, 5, 6, 1],
      },
      true,
    );
    const el = await comparePanel(live, 'on climate');

    expect(summary(el)).to.include(
      "Before the live page's re-ranking: ✅ top 5 identical",
    );
    expect(summary(el)).to.include('⏳ waiting for its re-ranking');
    expect(rankingDrawer(el).open).to.be.false;
    expect(drawerHeading(el)).to.equal(
      "Top 5, identical: ours vs before the live page's re-ranking",
    );

    live.releaseRerank!();
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(summary(el)).to.include(
      'As the live page shows them: ⚠️ top 5 differ: 4/5 shared in top 5 · 4 moved · 1 only ours · 1 only live',
    );
    // Opens once the re-ranked order differs.
    expect(rankingDrawer(el).open).to.be.true;
    expect(drawerHeading(el)).to.equal(
      'Top 5: ours vs as the live page shows them',
    );
    // Where each side put the doc the other's top 5 left out.
    expect(rows(el)[0]).to.deep.equal([
      '1',
      '–',
      'only ours',
      'Thesis 1 on climate',
      'live ranks it #6',
    ]);
    expect(rows(el)[5]).to.deep.equal([
      '–',
      '5',
      'only live',
      'Thesis 6 on climate',
      'ours ranks it #6',
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
    expect(rankingDrawer(el).open).to.be.true;
    expect(drawerHeading(el)).to.equal('Top 5: ours vs the live page');
    expect(summary(el)).to.include(
      "Before the live page's re-ranking: ⚠️ top 5 differ",
    );
    expect(summary(el)).to.include('4/5 shared in top 5');
    expect(summary(el)).to.include('4 moved · 1 only ours · 1 only live');
    // Only one-sided rows get a reason; moved rows' is the Difference.
    expect(rows(el)).to.deep.equal([
      ['1', '2', 'ours 1 higher', 'Thesis 1 on climate', ''],
      ['2', '3', 'ours 1 higher', 'Thesis 2 on climate', ''],
      ['3', '1', 'ours 2 lower', 'Thesis 3 on climate', ''],
      ['4', '5', 'ours 1 higher', 'Thesis 4 on climate', ''],
      ['5', '–', 'only ours', 'Thesis 5 on climate', "live doesn't match it"],
      // Not in our top 5, so its title is read from the engine by docId.
      ['–', '4', 'only live', 'Thesis 9 on climate', 'ours ranks it #9'],
    ]);
  });

  it('says when the live page matches a doc but ranks it past its top 3,000', async () => {
    const live = new StubLivePage({
      total: 6,
      status: '6 matches',
      docIds: [1, 2, 3, 4, 5],
      plain: [1, 2, 3, 4, 5, 6],
      // Re-ranked, doc 1 falls out of the order the page displays.
      reranked: [2, 3, 4, 5, 6],
    });
    const el = await comparePanel(live, 'on climate');
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(rows(el)[0][4]).to.equal('live matches it, past its top 3,000');
  });

  it('says when ours matches a doc but ranks it past its cap', async () => {
    const engine = new MockEtdEngine(mockEtdTheses(12));
    engine.reachableCap = 5; // stands in for the 3,000 cap
    const live = new StubLivePage({
      total: 12,
      status: '12 matches',
      docIds: [1, 2, 3, 4, 9],
    });
    const el = await comparePanel(live, 'climate', 5, engine);
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(rows(el)[5]).to.deep.equal([
      '–',
      '5',
      'only live',
      'Thesis 9 on climate',
      'ours matches it, past its top 3,000',
    ]);
  });

  it('says when ours does not match a doc at all', async () => {
    const live = new StubLivePage({
      total: 13,
      status: '13 matches',
      docIds: [1, 2, 3, 4, 99],
    });
    const el = await comparePanel(live, 'climate');
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(rows(el)[5]).to.deep.equal([
      '–',
      '5',
      'only live',
      'doc 99',
      "ours doesn't match it",
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

  it('keeps the table closed until the live page has re-ranked', async () => {
    // Like sea ice since the boost was ported: ours differs from the live
    // page's plain order, then matches once it re-ranks.
    const live = new StubLivePage(
      {
        total: 12,
        status: '12 matches',
        docIds: [5, 4, 3, 2, 1],
        reranked: [1, 2, 3, 4, 5],
      },
      true,
    );
    const el = await comparePanel(live, 'on climate');
    expect(summary(el)).to.include("Before the live page's re-ranking: ⚠️");
    expect(rankingDrawer(el).open).to.be.false;

    live.releaseRerank!();
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(rankingDrawer(el).open).to.be.false;
    expect(drawerHeading(el)).to.equal(
      'Top 5, identical: ours vs as the live page shows them',
    );
  });

  it('starts each search with the drawer as its result calls for', async () => {
    // Someone closes a differing table; the next differing search opens it.
    const live = new StubLivePage({
      total: 12,
      status: '12 matches',
      docIds: [2, 1, 3, 4, 5],
    });
    const el = await comparePanel(live, 'climate');
    await waitUntil(() => !summary(el).includes('waiting'));
    rankingDrawer(el).open = false;

    const closed = rankingDrawer(el);
    el.query = 'on climate';
    await el.updateComplete; // the new search has started
    await waitUntil(() => !summary(el).includes('Comparing'));
    await waitUntil(() => !summary(el).includes('waiting'));
    expect(rankingDrawer(el)).to.not.equal(closed);
    expect(rankingDrawer(el).open).to.be.true;
  });

  describe('hidden by re-ranking', () => {
    const live = () =>
      new StubLivePage({
        total: 12,
        status: '12 matches',
        docIds: [1, 2, 3, 4, 5],
      });

    function hiddenDrawer(el: EtdComparePanel) {
      return el.shadowRoot!.querySelector<HTMLDetailsElement>(
        'details.hidden-by-boost',
      );
    }

    function hiddenRows(el: EtdComparePanel): string[][] {
      return [...hiddenDrawer(el)!.querySelectorAll('tbody tr')].map(tr =>
        [...tr.querySelectorAll('td')].map(td => td.textContent!.trim()),
      );
    }

    it('lists what our boost pushed out of the top and pulled in, and why', async () => {
      // Ours ranks theses in docId order after the boost (1-5 on top). Before
      // it, thesis 9 was first: the boost pushed it to #9, and pulled thesis
      // 5 up from #60.
      const engine = new MockEtdEngine(mockEtdTheses(12));
      const before = [9, 1, 2, 3, 4];
      engine.boost = {
        words: ['on', 'climate'],
        topBefore: count => before.slice(0, count),
        rankBefore: docId =>
          docId === 5 ? 60 : before.indexOf(docId) + 1 || undefined,
        placement: docId => (docId === 9 ? 'apart' : 'title'),
      };
      const el = await comparePanel(live(), 'on climate', 5, engine);
      await waitUntil(() => !summary(el).includes('waiting'));

      expect(hiddenDrawer(el)!.open).to.be.true;
      expect(
        hiddenDrawer(el)!.querySelector('summary')!.textContent!.trim(),
      ).to.equal(
        'Hidden by re-ranking: 1 pushed out of the top 5, 1 pulled in',
      );
      expect(hiddenRows(el)).to.deep.equal([
        [
          '#1',
          '#9',
          'pushed out',
          // Not among ours' records, so its title is read by docId.
          'Thesis 9 on climate',
          "'on' and 'climate' aren't side by side in it",
        ],
        [
          '#60',
          '#5',
          'pulled in',
          'Thesis 5 on climate',
          "'on climate' is side by side in its title",
        ],
      ]);
    });

    it('says so, closed, when the boost changed nothing in the top', async () => {
      const engine = new MockEtdEngine(mockEtdTheses(12));
      engine.boost = {
        words: ['on', 'climate'],
        topBefore: count => [1, 2, 3, 4, 5].slice(0, count),
        rankBefore: docId => docId,
        placement: () => 'title',
      };
      const el = await comparePanel(live(), 'on climate', 5, engine);
      await waitUntil(() => !summary(el).includes('waiting'));

      expect(hiddenDrawer(el)!.open).to.be.false;
      expect(
        hiddenDrawer(el)!.querySelector('summary')!.textContent!.trim(),
      ).to.equal(
        'Hidden by re-ranking: none, the top 5 holds the same results',
      );
    });

    it('has no section for a query that was not re-ranked', async () => {
      const el = await comparePanel(live(), 'climate');
      await waitUntil(() => !summary(el).includes('waiting'));
      expect(hiddenDrawer(el)).to.be.null;
    });
  });

  it('prompts for a query rather than comparing an empty one', async () => {
    const live = new StubLivePage({ total: 0, status: '', docIds: [] });
    const el = await comparePanel(live, '');

    expect(live.queries).to.be.empty;
    expect(summary(el)).to.include('Search for something');
  });
});

describe('omissionCauses', () => {
  it('names the institution list for inst: queries, on either side', () => {
    const cause =
      'the live page matches institutions through its institution list, not yet ported';
    expect(omissionCauses('inst:mit robotics', 'live')).to.deep.equal([cause]);
    expect(omissionCauses('robotics institution:mit', 'ours')).to.deep.equal([
      cause,
    ]);
  });

  it('names phrase checking for quoted queries, only for the live page', () => {
    // Ours doesn't check yet, so it keeps more: only live drops a doc for it.
    expect(omissionCauses('"sea ice" drift', 'live')).to.deep.equal([
      'the live page only keeps it if the quoted words are side by side, not yet ported',
    ]);
    expect(omissionCauses('"sea ice" drift', 'ours')).to.deep.equal([]);
  });

  it('names nothing for a plain query', () => {
    expect(omissionCauses('sea ice', 'live')).to.deep.equal([]);
    expect(omissionCauses('constitution law', 'ours')).to.deep.equal([]);
  });
});

describe('boostReason', () => {
  const words = ['sea', 'ice'];

  it('explains a pushed-out doc by its words being apart', () => {
    expect(boostReason('apart', 'pushed out', words)).to.equal(
      "'sea' and 'ice' aren't side by side in it",
    );
    expect(boostReason('apart', 'pushed out', ['a', 'b', 'c'])).to.equal(
      "'a', 'b' and 'c' aren't side by side in it",
    );
  });

  it('explains a pulled-in doc by the field holding the words', () => {
    expect(boostReason('abstract', 'pulled in', words)).to.equal(
      "'sea ice' is side by side in its abstract",
    );
  });

  it('explains a doc pushed out though its words are together', () => {
    // Other-field matches rank below every title match.
    expect(boostReason('abstract', 'pushed out', words)).to.equal(
      "'sea ice' is side by side only in its abstract, and title matches go first",
    );
  });

  it('says when the doc’s text was not read in time', () => {
    expect(boostReason(undefined, 'pushed out', words)).to.equal(
      "its text wasn't read in time, so it counts as not side by side",
    );
  });
});
