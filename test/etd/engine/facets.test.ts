import { expect } from '@open-wc/testing';
import {
  EtdFacets,
  keepBytes,
  yearFromByte,
} from '../../../src/etd/engine/facets';
import { EtdIndexFiles } from '../../../src/etd/engine/index-files';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';

describe('yearFromByte', () => {
  it('reads encoding 2: decades before 1900, years from 1900', () => {
    expect(yearFromByte(0, 2)).to.equal(0); // unknown
    expect(yearFromByte(1, 2)).to.equal(1700);
    expect(yearFromByte(18, 2)).to.equal(1870); // the 1870s
    expect(yearFromByte(21, 2)).to.equal(1900);
    expect(yearFromByte(115, 2)).to.equal(1994);
  });

  it('reads encoding 1, from builds before 2026-10-19, as 1900 + byte', () => {
    expect(yearFromByte(94, 1)).to.equal(1994);
    expect(yearFromByte(0, 1)).to.equal(0);
  });
});

describe('keepBytes', () => {
  /** A stream of `bytes` in chunks of `size`, which split rows anywhere. */
  function chunked(bytes: number[], size: number): ReadableStream<Uint8Array> {
    let at = 0;
    return new ReadableStream({
      pull(controller) {
        if (at >= bytes.length) controller.close();
        else controller.enqueue(Uint8Array.from(bytes.slice(at, (at += size))));
      },
    });
  }

  // Three rows of 4 bytes: [year, x, x, language].
  const rows = [10, 0, 0, 1, 20, 0, 0, 2, 30, 0, 0, 3];

  it('keeps the bytes at the given offsets, however rows split across chunks', async () => {
    for (const size of [1, 3, 5, 12]) {
      const [years, languages] = await keepBytes(
        chunked(rows, size),
        3,
        4,
        [0, 3],
      );
      expect([...years], `chunks of ${size}`).to.deep.equal([10, 20, 30]);
      expect([...languages], `chunks of ${size}`).to.deep.equal([1, 2, 3]);
    }
  });

  it('fails on a file shorter than its row count', async () => {
    let error: unknown;
    try {
      await keepBytes(chunked(rows.slice(0, 10), 4), 3, 4, [0]);
    } catch (err) {
      error = err;
    }
    expect(String(error)).to.include('10 bytes for 3 rows of 4');
  });
});

describe('EtdFacets', () => {
  async function open(failFirst = false) {
    const index = await buildFixtureIndex([
      { title: 'A', date: '1994-05', language: 'pt' },
      { title: 'B', date: '1873' },
      { title: 'C', language: 'en' },
    ]);
    if (failFirst) index.failNext('facets.gz.json');
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    return { index, facets: new EtdFacets(files, { cache: false }) };
  }

  it('gives each doc its year and language', async () => {
    const { facets } = await open();
    const rows = await facets.rows();
    expect([1, 2, 3].map(d => rows.year(d))).to.deep.equal([1994, 1870, 0]);
    expect([1, 2, 3].map(d => rows.language(d))).to.deep.equal([
      'pt',
      undefined,
      'en',
    ]);
  });

  it('downloads the file once, however many ask', async () => {
    const { index, facets } = await open();
    await Promise.all([facets.rows(), facets.rows()]);
    await facets.rows();
    const reads = index.requests.filter(r => r.url.includes('facets.gz.json'));
    expect(reads).to.have.length(1);
  });

  it('tries again after a failed download', async () => {
    const { facets } = await open(true);
    let error: unknown;
    try {
      await facets.rows();
    } catch (err) {
      error = err;
    }
    expect(String(error)).to.include('HTTP 500');
    expect((await facets.rows()).year(1)).to.equal(1994);
  });

  it('lets one caller give up without cancelling the download for others', async () => {
    const { facets } = await open();
    const controller = new AbortController();
    const abandoned = facets.rows({ signal: controller.signal });
    const kept = facets.rows();
    controller.abort();

    let error: unknown;
    try {
      await abandoned;
    } catch (err) {
      error = err;
    }
    expect((error as Error).name).to.equal('AbortError');
    expect((await kept).language(1)).to.equal('pt');
  });
});
