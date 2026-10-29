import { expect } from '@open-wc/testing';
import { FilterConstraint } from '@internetarchive/search-service';
import { StaticVectorEngine } from '../../../../src/etd/engine/vector/static-vector-engine';
import type {
  StaticVectorEngineOptions,
  VectorQuery,
  VectorSearchStatus,
} from '../../../../src/etd/engine/vector/static-vector-engine';
import { ETD_VECTOR_FACETS } from '../../../../src/etd/etd-vector-facets';
import { EtdSearchService } from '../../../../src/etd/etd-search-service';
import { ETD_VECTOR_SEARCH } from '../../../../src/etd/etd-search-source';
import {
  FIXTURE_VECTOR_BASE,
  buildFixtureVectorStore,
} from './fixture-vector-store';
import type {
  FixtureVectorDoc,
  FixtureVectorOptions,
} from './fixture-vector-store';

const CENTROIDS = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const DOCS: FixtureVectorDoc[] = [
  {
    title: 'Sea ice drift in the Fram Strait',
    vector: [0.95, 0.1, 0, 0],
    cell: 0,
    host: 'oda.uit.no',
    date: '2014',
    landing: 'https://oda.uit.no/handle/1',
    abstract: 'Drift of sea ice through the Fram Strait.',
    year: 2014,
    flags: ['oai', 'hasAbstract'],
    domain: 'oda.uit.no',
  },
  {
    // Another language, the same meaning: what vector rank is for.
    title: 'Modelagem da cobertura de gelo marinho',
    vector: [0.9, 0, 0.12, 0],
    cell: 0,
    host: 'repositorio.ufsc.br',
    date: '2019',
    landing: 'https://repositorio.ufsc.br/handle/2',
    lang: 'pt',
    year: 2019,
    flags: ['oai', 'wbm'],
    domain: 'repositorio.ufsc.br',
  },
  {
    title: 'Ice and shipping lanes',
    vector: [0.7, 0.6, 0, 0],
    cell: 0,
    host: 'archive.org',
    landing: 'https://archive.org/details/iceshipping',
    year: 2001,
    flags: ['ia'],
    domain: 'archive.org',
  },
  {
    title: 'Hanseatic trade',
    vector: [0.1, 0.95, 0, 0],
    cell: 1,
    year: 1998,
    flags: ['oai'],
    domain: 'oda.uit.no',
  },
  { title: 'Silk road ledgers', vector: [0, 0.9, 0, 0.1], cell: 1 },
  { title: 'Baroque opera', vector: [0, 0, 1, 0], cell: 2 },
  { title: 'Contract law', vector: [0, 0, 0, 1], cell: 3 },
];

/** A fake model: each query's vector, by its text. */
const QUERIES: Record<string, number[]> = {
  'sea ice': [1, 0.05, 0, 0],
};

async function engineFor(
  options: Partial<StaticVectorEngineOptions> = {},
  store: Partial<FixtureVectorOptions> = {},
) {
  const fixture = await buildFixtureVectorStore(DOCS, {
    centroids: CENTROIDS,
    ...store,
  });
  const embedded: string[] = [];
  const engine = new StaticVectorEngine({
    baseUrl: FIXTURE_VECTOR_BASE,
    fetch: fixture.fetch,
    facets: ETD_VECTOR_FACETS,
    embed: async text => {
      embedded.push(text);
      return Float32Array.from(QUERIES[text] ?? [0, 0, 0, 0]);
    },
    scan: { nprobe: 2 },
    ...options,
  });
  return { engine, fixture, embedded };
}

describe('StaticVectorEngine', () => {
  it('ranks by meaning, across languages, with each thesis as shown', async () => {
    const { engine } = await engineFor();
    const query = await engine.query('sea ice', {});
    const records = await query.next(3);

    expect(records.map(r => r.title)).to.deep.equal([
      'Sea ice drift in the Fram Strait',
      'Modelagem da cobertura de gelo marinho',
      'Ice and shipping lanes',
    ]);
    // Vector ids are 0-based rows of docs.bin; a record's docId is id + 1.
    expect(records[0]).to.include({
      docId: 1,
      domain: 'oda.uit.no',
      date: '2014',
      url: 'https://oda.uit.no/handle/1',
      snippet: 'Drift of sea ice through the Fram Strait.',
    });
    // Two probed cells hold five docs: every one is ranked.
    expect(query.result).to.deep.equal({
      total: 5,
      approximate: false,
      reachable: 5,
    });
    expect(query.scan).to.include({ candidates: 5, cells: 2, exact: 5 });
  });

  it('links an archived copy only when the flags say there is one', async () => {
    const { engine } = await engineFor();
    const records = await (await engine.query('sea ice', {})).next(3);

    expect(records[0].archivedUrl).to.be.undefined; // oai only
    expect(records[1].archivedUrl).to.equal(
      'https://web.archive.org/web/2/https://repositorio.ufsc.br/handle/2',
    );
    // Already on archive.org: its own link is the archived copy.
    expect(records[2].archivedUrl).to.be.undefined;
    expect(records[2].url).to.equal('https://archive.org/details/iceshipping');
  });

  it('filters the scanned candidates by year, repository and source', async () => {
    const { engine } = await engineFor();

    const recent = await engine.query('sea ice', { year: { min: 2010 } });
    expect((await recent.next(10)).map(r => r.docId)).to.deep.equal([1, 2]);

    const uit = await engine.query('sea ice', {
      facets: { repository: { include: ['oda.uit.no'] } },
    });
    expect((await uit.next(10)).map(r => r.title)).to.deep.equal([
      'Sea ice drift in the Fram Strait',
      'Hanseatic trade',
    ]);

    const notIa = await engine.query('sea ice', {
      facets: { source: { exclude: ['ia'] } },
    });
    expect((await notIa.next(10)).map(r => r.docId)).to.not.include(3);
  });

  it('counts facets over every scanned candidate passing the filters', async () => {
    const { engine } = await engineFor();
    const counts = await (await engine.query('sea ice', {})).facets();

    expect(counts.facets.repository).to.deep.equal({
      'oda.uit.no': 2,
      'repositorio.ufsc.br': 1,
      'archive.org': 1,
    });
    expect(counts.facets.source).to.deep.equal({ oai: 3, wbm: 1, ia: 1 });
    expect(counts.year).to.deep.equal({
      1998: 1,
      2001: 1,
      2014: 1,
      2019: 1,
    });
  });

  it('pages only as far as the exactly re-scored best', async () => {
    const { engine } = await engineFor({ scan: { nprobe: 2, rerank: 2 } });
    const query = await engine.query('sea ice', {});
    expect(query.result.reachable).to.equal(2);
    expect(query.scan?.candidates).to.equal(5);
    expect(await query.next(10)).to.have.length(2);
    expect(query.rankOf?.(2)).to.equal(2);
    expect(query.rankOf?.(4)).to.be.undefined;
    // Scanned, just past the cap.
    expect(query.matches?.(4)).to.be.true;
    expect(query.matches?.(6)).to.be.false;
  });

  it('scans once for a query, whatever its filters', async () => {
    const { engine, fixture, embedded } = await engineFor();
    await engine.query('sea ice', {});
    const reads = fixture.requestsTo('cell-codes.bin').length;

    await engine.query('sea ice', { year: { min: 2010 } });

    expect(fixture.requestsTo('cell-codes.bin')).to.have.length(reads);
    expect(embedded).to.deep.equal(['sea ice']);
  });

  it('has nothing to rank without words, and reads no cells', async () => {
    const { engine, fixture } = await engineFor();
    const query = await engine.query('  ', { year: { min: 2000 } });
    expect(query.result.total).to.equal(0);
    expect(fixture.requestsTo('cell-codes.bin')).to.be.empty;
  });

  it("says it can't filter a store without facet rows, but still ranks", async () => {
    const { engine } = await engineFor({}, { withFacets: false });
    expect((await engine.query('sea ice', {})).result.total).to.equal(5);

    let error: Error | undefined;
    try {
      await engine.query('sea ice', { year: { min: 2010 } });
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.contain('no facet rows');
  });

  it('reports a search from waiting for the model to done', async () => {
    const statuses: VectorSearchStatus[] = [];
    const { engine } = await engineFor({
      onSearch: status => statuses.push(status),
      scan: { nprobe: 2, parallel: 1 },
    });
    await engine.query('sea ice', {});

    expect(statuses.map(s => s.phase)).to.deep.equal([
      'loading',
      'scanning',
      'scanning',
      'done',
    ]);
    expect(statuses[2].progress).to.include({ cellsDone: 2, cells: 2 });
    expect(statuses[3].scan).to.include({ candidates: 5, exact: 5 });
  });

  it("counts the store's retries in the first search's summary", async () => {
    const statuses: VectorSearchStatus[] = [];
    const fixture = await buildFixtureVectorStore(DOCS, {
      centroids: CENTROIDS,
    });
    let failed = false;
    const flaky = (async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!failed && String(input).includes('centroids.f16')) {
        failed = true;
        return new Response('', { status: 503 });
      }
      return fixture.fetch(input, init);
    }) as typeof fetch;
    const engine = new StaticVectorEngine({
      baseUrl: FIXTURE_VECTOR_BASE,
      fetch: flaky,
      facets: ETD_VECTOR_FACETS,
      embed: async () => Float32Array.from(QUERIES['sea ice']),
      scan: { nprobe: 2 },
      onSearch: status => statuses.push(status),
    });

    const first = await engine.query('sea ice', {});
    expect(first.scan?.retries).to.equal(1);
    expect(statuses.at(-1)?.scan?.retries).to.equal(1);
    // Counted once: the next search reports only its own.
    expect((await engine.query('sea ice drift', {})).scan?.retries).to.equal(0);
  });

  describe('first results before the scan ends', () => {
    // Three cells, read one at a time; a first answer after the first.
    const progressive = { scan: { nprobe: 3, parallel: 1, earlyCells: 1 } };

    it('answers from the first cell, then refines with every cell', async () => {
      const statuses: VectorSearchStatus[] = [];
      const { engine } = await engineFor({
        ...progressive,
        onSearch: status => statuses.push(status),
      });
      const first = await engine.query('sea ice', {});

      // The best cell's three theses, before the other cells are in.
      expect(first.refined).to.exist;
      expect(first.result.reachable).to.equal(3);
      expect((await first.next(3)).map(r => r.title)).to.deep.equal([
        'Sea ice drift in the Fram Strait',
        'Modelagem da cobertura de gelo marinho',
        'Ice and shipping lanes',
      ]);

      const final = (await first.refined) as VectorQuery;
      expect(final.refined).to.be.undefined;
      expect(final.scan).to.include({ cells: 3, candidates: 6, exact: 6 });
      expect(final.scan!.timings.first).to.be.a('number');
      expect(statuses.at(-1)?.first).to.include({ cellsDone: 1, cells: 3 });
    });

    it("counts a first answer's facets over the final one", async () => {
      const { engine } = await engineFor(progressive);
      const first = await engine.query('sea ice', {});
      const final = (await first.refined)!;
      expect(await first.facets()).to.deep.equal(await final.facets());
    });

    it('waits for the whole scan when there are filters', async () => {
      const { engine } = await engineFor(progressive);
      const query = await engine.query('sea ice', { year: { min: 2010 } });
      expect(query.refined).to.be.undefined;
      expect(query.scan?.cells).to.equal(3);
    });

    it('waits for the whole scan when told not to answer early', async () => {
      const { engine } = await engineFor({
        ...progressive,
        progressive: false,
      });
      const query = await engine.query('sea ice', {});
      expect(query.refined).to.be.undefined;
      expect(query.scan?.candidates).to.equal(6);
    });
  });

  it('reads one record by docId', async () => {
    const { engine } = await engineFor();
    expect((await engine.record(6))?.title).to.equal('Baroque opera');
    expect(await engine.record(99)).to.be.undefined;
  });
});

describe('EtdSearchService for vector rank', () => {
  it('gives hits their own identifiers, and only the vector facets', async () => {
    const { engine } = await engineFor();
    const service = new EtdSearchService({ engine, kind: ETD_VECTOR_SEARCH });

    const result = await service.search({
      query: 'sea ice',
      rows: 2,
      filters: { repository: { 'oda.uit.no': FilterConstraint.INCLUDE } },
    });
    const { results, aggregations } = result.success!.response;

    expect(results.map(hit => hit.identifier)).to.deep.equal([
      'etdv-1',
      'etdv-4',
    ]);
    expect(Object.keys(aggregations!).sort()).to.deep.equal([
      'availability',
      'repository',
      'source',
      'year_histogram',
    ]);
    expect(service.allowFilterOnlySearch).to.be.false;
  });
});
