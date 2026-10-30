import { expect } from '@open-wc/testing';
import type { EtdQuery } from '../../../src/etd/etd-engine';
import { ETD_FACETS } from '../../../src/etd/etd-facets';
import {
  MeaningRerankEngine,
  meaningOrder,
  rerankUnavailable,
} from '../../../src/etd/engine/meaning-rerank';
import type {
  MeaningRerankEngineOptions,
  MeaningRerankStatus,
} from '../../../src/etd/engine/meaning-rerank';
import { StaticEtdEngine } from '../../../src/etd/engine/static-etd-engine';
import { StaticVectorEngine } from '../../../src/etd/engine/vector/static-vector-engine';
import type { IvfMeta } from '../../../src/etd/engine/vector/vector-files';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';
import type { FixtureThesis } from './fixture-index';
import {
  FIXTURE_VECTOR_BASE,
  buildFixtureVectorStore,
} from './vector/fixture-vector-store';
import type { FixtureVectorOptions } from './vector/fixture-vector-store';

/**
 * Four theses, the word index and a vector store over the same docs in the
 * same order (vector id = docId - 1), as Democracy's Library is built.
 * Searching "sea ice" by words ranks the two about sea ice first; by
 * meaning, the query's vector is (1, 0, 0, 0), so the medieval sea crossing
 * is closest, then the carbon budget, then the glaciers.
 */
const THESES: (FixtureThesis & { vector: number[] })[] = [
  {
    title: 'Glacier dynamics in Greenland',
    abstract: 'We model sea ice retreat along the coast.',
    date: '2014',
    vector: [0, 1, 0, 0],
  },
  {
    title: 'Sea ice and the Arctic carbon budget',
    abstract: 'Carbon flux under seasonal sea ice and leads.',
    date: '2019',
    vector: [0.6, 0.8, 0, 0],
  },
  {
    title: 'Medieval trade routes',
    creators: 'Ice, Mara',
    abstract: 'Merchants crossed the sea in winter.',
    date: '2001',
    vector: [1, 0, 0, 0],
  },
  {
    title: 'Coastal erosion',
    date: '1998',
    vector: [0, 0, 1, 0],
  },
];

const QUERY_VECTOR = Float32Array.from([1, 0, 0, 0]);

const WORD_VERSION = 'test1';

async function setUp(
  options: {
    store?: Partial<FixtureVectorOptions>;
    rerank?: MeaningRerankEngineOptions;
  } = {},
) {
  const index = await buildFixtureIndex(THESES, { version: WORD_VERSION });
  const store = await buildFixtureVectorStore(
    THESES.map(thesis => ({
      title: thesis.title,
      vector: thesis.vector,
      cell: 0,
    })),
    {
      centroids: [[0, 0, 0, 0]],
      docVectors: {},
      textV: WORD_VERSION,
      ...options.store,
    },
  );
  const embedded: string[] = [];
  const words = new StaticEtdEngine({
    baseUrl: FIXTURE_BASE,
    fetch: index.fetch,
    cacheFacets: false,
    facets: ETD_FACETS,
  });
  let meaningBuilt = 0;
  const statuses: MeaningRerankStatus[] = [];
  const engine = new MeaningRerankEngine(
    words,
    () => {
      meaningBuilt += 1;
      return new StaticVectorEngine({
        baseUrl: FIXTURE_VECTOR_BASE,
        fetch: store.fetch,
        embed: async text => {
          embedded.push(text);
          return QUERY_VECTOR;
        },
      });
    },
    {
      ...options.rerank,
      onStatus: status => statuses.push(status),
    },
  );
  return {
    engine,
    words,
    store,
    embedded,
    statuses,
    meaningBuilt: () => meaningBuilt,
  };
}

async function titles(query: EtdQuery | undefined): Promise<string[]> {
  if (!query) throw new Error('no query');
  return (await query.next(10)).map(record => record.title);
}

describe('MeaningRerankEngine', () => {
  it('shows the word ranking first, then the same results ordered by meaning', async () => {
    const { engine, embedded, statuses } = await setUp();

    const first = await engine.query('sea ice', {});

    expect(await titles(first)).to.deep.equal([
      'Sea ice and the Arctic carbon budget',
      'Glacier dynamics in Greenland',
      'Medieval trade routes',
    ]);
    const refined = await first.refined;
    expect(await titles(refined)).to.deep.equal([
      'Medieval trade routes',
      'Sea ice and the Arctic carbon budget',
      'Glacier dynamics in Greenland',
    ]);
    // The query as typed is what gets embedded.
    expect(embedded).to.deep.equal(['sea ice']);
    // Same matches, same totals and facets: only the order changed.
    expect(refined!.result).to.deep.equal(first.result);
    expect(await refined!.facets()).to.deep.equal(await first.facets());
    expect(refined!.rankOf!(3)).to.equal(1);
    expect(refined!.refined).to.equal(undefined);
    const done = statuses.at(-1)!;
    expect(done.phase).to.equal('done');
    expect(done.head).to.equal(3);
    expect(done.scored).to.equal(3);
  });

  it('reads the head’s vectors in one request, only those rows', async () => {
    const { engine, store } = await setUp();

    await (
      await engine.query('sea ice', {})
    ).refined;

    const reads = store.requestsTo('doc-vectors.bin');
    expect(reads).to.have.length(1);
    // Docs 1-3 are vector ids 0-2; Coastal erosion (id 3) didn't match.
    expect(reads[0].range).to.equal('bytes=0-11, 12-23, 24-35');
    // No scan: search by meaning's cells are never read.
    expect(store.requestsTo('cells.bin')).to.have.length(0);
    expect(store.requestsTo('cell-codes.bin')).to.have.length(0);
  });

  it('keeps results past the head in their word order', async () => {
    const { engine } = await setUp({ rerank: { head: 2 } });

    const refined = await (await engine.query('sea ice', {})).refined;

    // Medieval trade routes means the most, but it's third by words, past
    // a head of two, so it stays third.
    expect(await titles(refined)).to.deep.equal([
      'Sea ice and the Arctic carbon budget',
      'Glacier dynamics in Greenland',
      'Medieval trade routes',
    ]);
  });

  it('re-orders only what passes the filters', async () => {
    const { engine } = await setUp();

    const refined = await (
      await engine.query('sea ice', { year: { min: 2010 } })
    ).refined;

    expect(await titles(refined)).to.deep.equal([
      'Sea ice and the Arctic carbon budget',
      'Glacier dynamics in Greenland',
    ]);
    expect(refined!.result.total).to.equal(2);
  });

  it('stays in word order when the store lines up with another word build', async () => {
    const { engine, statuses, store } = await setUp({
      store: { textV: 'test0' },
    });

    const first = await engine.query('sea ice', {});

    expect(await first.refined).to.equal(undefined);
    expect(statuses.at(-1)).to.include({ phase: 'off' });
    expect(statuses.at(-1)!.message).to.contain('test0').and.contain('test1');
    expect(store.requestsTo('doc-vectors.bin')).to.have.length(0);
  });

  it('stays in word order when the store has no doc-vectors.bin', async () => {
    const { engine, statuses } = await setUp({
      store: { docVectors: undefined },
    });

    expect(await (await engine.query('sea ice', {})).refined).to.equal(
      undefined,
    );
    expect(statuses.at(-1)!.message).to.contain('doc-vectors.bin');
  });

  it("puts a doc whose row holds another id last, rather than score it by another doc's vector", async () => {
    // A stale doc-vectors.bin: the carbon budget's row (vector id 1) holds id 7.
    const { engine, statuses } = await setUp({
      store: { docVectors: { ids: [0, 7, 2, 3] } },
    });

    const refined = await (await engine.query('sea ice', {})).refined;

    expect(await titles(refined)).to.deep.equal([
      'Medieval trade routes',
      'Glacier dynamics in Greenland',
      'Sea ice and the Arctic carbon budget',
    ]);
    expect(statuses.at(-1)).to.include({ phase: 'done', scored: 2 });
  });

  it('leaves a filters-only listing alone, without touching the vector store', async () => {
    const { engine, meaningBuilt } = await setUp();

    const listed = await engine.query('', { year: { min: 2010 } });

    expect(listed.refined).to.equal(undefined);
    expect(listed.result.total).to.equal(2);
    expect(meaningBuilt()).to.equal(0);
  });

  it('keeps the word results when re-ranking fails', async () => {
    const { words, statuses } = await setUp();
    const failing = new MeaningRerankEngine(
      // The same word search, but no vector store answers.
      words,
      () => ({
        storeMeta: async () => {
          throw new Error('ETD vector store: no ivf-meta.json on this item');
        },
        scoreIds: async () => {
          throw new Error('not reached');
        },
      }),
      { onStatus: status => statuses.push(status) },
    );

    const first = await failing.query('sea ice', {});

    expect(await first.refined).to.equal(undefined);
    expect(await titles(first)).to.have.length(3);
    expect(statuses.at(-1)).to.include({ phase: 'failed' });
    expect(statuses.at(-1)!.message).to.contain('no ivf-meta.json');
  });
});

describe('meaningOrder', () => {
  it('sorts best first, unscored last, and ties in word order', () => {
    expect(
      meaningOrder([10, 20, 30, 40, 50], [0.2, NaN, 0.9, 0.2, 0.5]),
    ).to.deep.equal([30, 50, 10, 40, 20]);
  });
});

describe('rerankUnavailable', () => {
  const ivf = {
    n: 4,
    doc_vectors: true,
    text_v: 'dl2',
  } as IvfMeta;

  it('allows a store built for this word build, with as many docs', () => {
    expect(rerankUnavailable(ivf, { v: 'dl2', n_docs: 4 } as never)).to.equal(
      undefined,
    );
  });

  it('refuses one that says nothing about lining up, as on ETD', () => {
    expect(
      rerankUnavailable({ ...ivf, text_v: undefined }, {
        v: 'dl2',
        n_docs: 4,
      } as never),
    ).to.contain('no text_v');
  });

  it('refuses one whose count differs, even for the same build', () => {
    expect(rerankUnavailable(ivf, { v: 'dl2', n_docs: 5 } as never)).to.contain(
      '4 docs',
    );
  });
});
