import { expect } from '@open-wc/testing';
import {
  loadVectorIndex,
  probeCells,
  scanVectors,
} from '../../../../src/etd/engine/vector/scan';
import type {
  EarlyScan,
  ScanProgress,
} from '../../../../src/etd/engine/vector/scan';
import { VectorStoreFiles } from '../../../../src/etd/engine/vector/vector-files';
import {
  FIXTURE_VECTOR_BASE,
  buildFixtureVectorStore,
  halfValue,
} from './fixture-vector-store';
import type {
  FixtureVectorDoc,
  FixtureVectorOptions,
} from './fixture-vector-store';

// Four topics, one cell each: ice, trade, music, law.
const CENTROIDS = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];

const DOCS: FixtureVectorDoc[] = [
  { title: 'Sea ice drift', vector: [0.95, 0.1, 0, 0], cell: 0, year: 2014 },
  { title: 'Arctic leads', vector: [0.9, 0, 0.12, 0], cell: 0, year: 2019 },
  { title: 'Ice and shipping', vector: [0.7, 0.6, 0, 0], cell: 0, year: 2001 },
  { title: 'Hanseatic trade', vector: [0.1, 0.95, 0, 0], cell: 1, year: 1998 },
  { title: 'Silk road ledgers', vector: [0, 0.9, 0, 0.1], cell: 1 },
  { title: 'Baroque opera', vector: [0, 0, 1, 0], cell: 2 },
  { title: 'Contract law', vector: [0, 0, 0, 1], cell: 3 },
];

/** "sea ice", as the fake embedder would give it. */
const ICE = Float32Array.from([1, 0.05, 0, 0]);

async function open(docs = DOCS, options: Partial<FixtureVectorOptions> = {}) {
  const store = await buildFixtureVectorStore(docs, {
    centroids: CENTROIDS,
    ...options,
  });
  const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
    fetch: store.fetch,
  });
  return { store, index: await loadVectorIndex(files) };
}

/** The exact score the store's f16 vector gives a query, as the live page computes it. */
function exactScore(doc: FixtureVectorDoc, query: Float32Array): number {
  return doc.vector.reduce((s, v, j) => s + halfValue(v) * query[j], 0);
}

describe('vector scan', () => {
  it('probes the cells whose centroids are closest to the query', async () => {
    const { index } = await open();
    expect(probeCells(index, ICE, 2).cells).to.deep.equal([0, 1]);
  });

  it('reads only the probed cells, from the 4-bit codes', async () => {
    const { store, index } = await open();
    const scan = await scanVectors(index, ICE, { nprobe: 2 });

    // Cells 0 and 1 hold rows 0-2 and 3-4; a code row is 4 + 4/2 bytes.
    expect(
      store.requestsTo('cell-codes.bin').map(r => r.range),
    ).to.have.members(['bytes=0-17', 'bytes=18-29']);
    expect(scan.cells).to.deep.equal([0, 1]);
    expect(scan.order.length).to.equal(5);
    const titles = Array.from(scan.order, c => DOCS[scan.dids[c]].title);
    expect(titles.slice(0, 3)).to.deep.equal([
      'Sea ice drift',
      'Arctic leads',
      'Ice and shipping',
    ]);
  });

  it('re-scores the best candidates exactly from cells.bin', async () => {
    const { store, index } = await open();
    const scan = await scanVectors(index, ICE, { nprobe: 2, rerank: 3 });

    expect(scan.exact).to.equal(3);
    // One multi-range request for the three rows.
    expect(store.requestsTo('cells.bin')).to.have.length(1);
    for (const candidate of scan.order.subarray(0, 3)) {
      expect(scan.scores[candidate]).to.be.closeTo(
        exactScore(DOCS[scan.dids[candidate]], ICE),
        1e-6,
      );
    }
  });

  it('puts first the doc the 4-bit codes can only tie', async () => {
    // Both residuals round to the same code at a step of 0.02, so the codes
    // score them the same; their exact vectors don't.
    const docs: FixtureVectorDoc[] = [
      { title: 'Nearly', vector: [1.002, 0, 0, 0], cell: 0 },
      { title: 'Closest', vector: [1.008, 0, 0, 0], cell: 0 },
    ];
    const { index } = await open(docs);
    const query = Float32Array.from([1, 0, 0, 0]);
    const titlesOf = (scan: Awaited<ReturnType<typeof scanVectors>>) =>
      Array.from(scan.order, c => docs[scan.dids[c]].title);

    const coded = await scanVectors(index, query, { nprobe: 1, rerank: 0 });
    expect(coded.scores[0]).to.equal(coded.scores[1]);
    expect(titlesOf(coded)).to.deep.equal(['Nearly', 'Closest']);

    const exact = await scanVectors(index, query, { nprobe: 1 });
    expect(titlesOf(exact)).to.deep.equal(['Closest', 'Nearly']);
  });

  it('reads a big cell as several ranges and ranks it the same', async () => {
    const { store, index } = await open();
    const whole = await scanVectors(index, ICE, { nprobe: 1 });
    const before = store.requestsTo('cell-codes.bin').length;

    // Two code rows (12 bytes) a range: cell 0's three rows take two.
    const split = await scanVectors(index, ICE, { nprobe: 1, chunkBytes: 12 });

    expect(store.requestsTo('cell-codes.bin').length - before).to.equal(2);
    expect(Array.from(split.order, c => split.dids[c])).to.deep.equal(
      Array.from(whole.order, c => whole.dids[c]),
    );
  });

  it('reports each cell as it arrives', async () => {
    const { index } = await open();
    const progress: ScanProgress[] = [];
    await scanVectors(index, ICE, {
      nprobe: 3,
      parallel: 1,
      onProgress: p => progress.push(p),
    });
    expect(progress.map(p => p.cellsDone)).to.deep.equal([1, 2, 3]);
    expect(progress.every(p => p.cells === 3)).to.be.true;
    expect(progress[2].bytes).to.be.greaterThan(progress[0].bytes);
  });

  it('gives one first answer, from the cells read so far', async () => {
    const { index } = await open();
    const answers: EarlyScan[] = [];
    await scanVectors(index, ICE, {
      nprobe: 3,
      parallel: 1,
      earlyCells: 1,
      onEarly: early => answers.push(early),
    });

    expect(answers).to.have.length(1);
    const [first] = answers;
    // Only the best cell had arrived: its three rows, best first.
    expect(first.progress).to.include({ cellsDone: 1, cells: 3 });
    expect(first.candidates).to.equal(3);
    expect(Array.from(first.dids, did => DOCS[did].title)).to.deep.equal([
      'Sea ice drift',
      'Arctic leads',
      'Ice and shipping',
    ]);
  });

  it('gives no first answer when the scan is done before it would', async () => {
    const { index } = await open();
    const answers: EarlyScan[] = [];
    // Two cells, and the first answer waits for four.
    await scanVectors(index, ICE, {
      nprobe: 2,
      onEarly: early => answers.push(early),
    });
    expect(answers).to.be.empty;
  });

  it('places each facet row beside its candidate', async () => {
    const docs = DOCS.map((doc, i) =>
      i === 1
        ? { ...doc, flags: ['oai', 'hasAbstract'], domain: 'oda.uit.no' }
        : doc,
    );
    const { index } = await open(docs);
    const scan = await scanVectors(index, ICE, { nprobe: 2 });

    const leads = Array.from(scan.dids).indexOf(1);
    expect(scan.facets!.years[leads]).to.equal(2019 - 1900);
    expect(scan.facets!.flags[leads]).to.equal(1 | 128);
    expect(scan.facetMeta!.domains![scan.facets!.domains[leads] - 1]).to.equal(
      'oda.uit.no',
    );
  });

  it('scans the exact rows when the codes are from another build', async () => {
    const { store, index } = await open(DOCS, {
      codesMeta: { built: '2026-09-04 08:00' },
    });
    expect(index.codes).to.be.undefined;

    const scan = await scanVectors(index, ICE, { nprobe: 2 });
    expect(store.requestsTo('cell-codes.bin')).to.be.empty;
    expect(scan.exact).to.equal(0);
    expect(scan.scores[scan.order[0]]).to.be.closeTo(
      exactScore(DOCS[0], ICE),
      1e-6,
    );
  });

  it('has no facets when the facet rows are from another build', async () => {
    const { index } = await open(DOCS, { facetsMeta: { n: 999 } });
    const scan = await scanVectors(index, ICE, { nprobe: 2 });
    expect(index.facets).to.be.undefined;
    expect(scan.facets).to.be.undefined;
  });

  it('refuses a cell directory that does not match the manifest', async () => {
    const store = await buildFixtureVectorStore(DOCS, { centroids: CENTROIDS });
    // A cell.dir from a build with one doc fewer than ivf-meta.json says.
    const fetchFn = (async (input: RequestInfo | URL, init?: RequestInit) => {
      const response = await store.fetch(input, init);
      if (!String(input).includes('/cell.dir?')) return response;
      const dir = new Uint32Array(await response.arrayBuffer());
      dir[dir.length - 1] -= 1;
      return new Response(dir.buffer, { status: 200 });
    }) as typeof fetch;
    const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
      fetch: fetchFn,
    });
    let error: Error | undefined;
    try {
      await loadVectorIndex(files);
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.contain("cell.dir doesn't match");
  });
});
