import { expect } from '@open-wc/testing';
import {
  EtdIndexFiles,
  checkIndexFormat,
} from '../../../src/etd/engine/index-files';
import { parseByteRanges } from '../../../src/static-index/range-files';
import type { EtdIndexMeta } from '../../../src/etd/engine/index-files';
import { FIXTURE_BASE, FIXTURE_DATA, buildFixtureIndex } from './fixture-index';

/**
 * Wraps a fixture's fetch with archive.org's file list for etd-fixture,
 * and optionally a current.json changed by `manifest`.
 */
function withFileList(
  fetchFn: typeof fetch,
  files: Record<string, number>,
  manifest?: (meta: EtdIndexMeta) => EtdIndexMeta,
): typeof fetch {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    if (url === 'https://archive.org/metadata/etd-fixture/files') {
      const result = Object.entries(files).map(([name, size]) => ({
        name,
        size: String(size),
        mtime: '1793055159',
      }));
      return new Response(JSON.stringify({ result }), { status: 200 });
    }
    const response = await fetchFn(input, init);
    if (!manifest || !url.includes('current.json')) return response;
    const changed = new Response(
      JSON.stringify(manifest(await response.json())),
      { status: 200 },
    );
    Object.defineProperty(changed, 'url', { value: response.url });
    return changed;
  }) as typeof fetch;
}

const THESES = Array.from({ length: 40 }, (_, i) => ({
  title: `Thesis number ${i + 1}`,
  url: `https://repo.example.edu/${i + 1}`,
}));

describe('EtdIndexFiles', () => {
  it('follows the download redirect once and reads from the storage server', async () => {
    const index = await buildFixtureIndex(THESES);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });

    expect(files.dataUrl).to.equal(FIXTURE_DATA);
    expect(files.fileUrl('stubs.bin')).to.equal(
      `${FIXTURE_DATA}stubs.bin.test1?v=test1`,
    );
    expect(files.meta.n_docs).to.equal(40);
  });

  it('reads many ranges in one multipart request, in the order asked', async () => {
    const index = await buildFixtureIndex(THESES);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const before = index.requests.length;

    const [third, first, second] = await files.ranges('stubs.bin', [
      [2 * 320, 320],
      [0, 320],
      [320, 320],
    ]);

    expect(index.requests.length - before).to.equal(1);
    const title = (stub: Uint8Array) =>
      new TextDecoder().decode(stub.subarray(0, 16));
    expect(title(first)).to.equal('Thesis number 1\0');
    expect(title(second)).to.equal('Thesis number 2\0');
    expect(title(third)).to.equal('Thesis number 3\0');
  });

  it('splits a large batch into several multi-range requests', async () => {
    const index = await buildFixtureIndex(THESES);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const before = index.requests.length;

    const parts = THESES.map((_, i) => [i * 320, 320] as const);
    const stubs = await files.ranges('stubs.bin', parts, 16);

    expect(stubs).to.have.length(40);
    expect(index.requests.length - before).to.equal(3);
  });

  it('falls back to single reads when the multi-range request fails', async () => {
    const index = await buildFixtureIndex(THESES);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    index.failNext('&u=m');

    const stubs = await files.ranges('stubs.bin', [
      [0, 320],
      [320, 320],
    ]);

    expect(stubs.map(s => s.length)).to.deep.equal([320, 320]);
  });

  it('reports a missing index clearly', async () => {
    const index = await buildFixtureIndex(THESES);
    index.failNext('current.json');
    let error: unknown;
    try {
      await EtdIndexFiles.open(FIXTURE_BASE, { fetch: index.fetch });
    } catch (err) {
      error = err;
    }
    expect((error as Error).message).to.equal(
      'ETD index: current.json HTTP 500',
    );
  });
});

describe('checkIndexFormat', () => {
  const meta: EtdIndexMeta = { n_docs: 10, stub_bytes: 320 };

  it('accepts the format this port reads', () => {
    expect(() =>
      checkIndexFormat({ ...meta, prefixed_fields: { o: 'orcid' } }),
    ).not.to.throw();
  });

  it('rejects a different stub layout', () => {
    expect(() => checkIndexFormat({ ...meta, stub_bytes: 384 })).to.throw(
      /stub_bytes 384/,
    );
  });

  it('rejects a field prefix it does not know', () => {
    expect(() =>
      checkIndexFormat({ ...meta, prefixed_fields: { s: 'subject' } }),
    ).to.throw(/unknown field prefixes s/);
  });
});

describe('parseByteRanges', () => {
  it('keys each part by its Content-Range', () => {
    const body = new TextEncoder().encode(
      '\r\n--B\r\nContent-Range: bytes 10-12/100\r\n\r\nabc\r\n--B\r\nContent-Range: bytes 50-51/100\r\n\r\nxy\r\n--B--\r\n',
    );
    const parts = parseByteRanges(body, 'B');
    const text = (u8?: Uint8Array) => new TextDecoder().decode(u8);
    expect(text(parts.get('10_3'))).to.equal('abc');
    expect(text(parts.get('50_2'))).to.equal('xy');
  });

  describe("against the item's file list", () => {
    it('checks the records file against current.json', async () => {
      const index = await buildFixtureIndex(THESES);
      const files = await EtdIndexFiles.open(FIXTURE_BASE, {
        fetch: withFileList(index.fetch, { 'stubs.bin.test1': 40 * 320 }),
      });

      expect(files.fileCheck.itemId).to.equal('etd-fixture');
      expect(
        files.fileCheck.sizes?.checks.map(c => [c.rule.file, c.status]),
      ).to.deep.equal([['stubs.bin.test1', 'ok']]);
      // Versioned files keep their version as the cache key.
      expect(files.fileUrl('stubs.bin')).to.equal(
        `${FIXTURE_DATA}stubs.bin.test1?v=test1`,
      );
    });

    it('keys an unversioned index’s files by their size and change time', async () => {
      const index = await buildFixtureIndex(THESES);
      const files = await EtdIndexFiles.open(FIXTURE_BASE, {
        fetch: withFileList(index.fetch, { 'stubs.bin': 40 * 320 }, meta => ({
          ...meta,
          v: undefined,
        })),
      });

      expect(files.fileUrl('stubs.bin')).to.equal(
        `${FIXTURE_DATA}stubs.bin?v=1793055159-12800`,
      );
      // Not in the list: the old fixed key.
      expect(files.fileUrl('dict.bin')).to.equal(
        `${FIXTURE_DATA}dict.bin?v=unversioned`,
      );
    });

    it('opens as before when the list is missing', async () => {
      const index = await buildFixtureIndex(THESES);
      const files = await EtdIndexFiles.open(FIXTURE_BASE, {
        fetch: index.fetch,
      });
      expect(files.fileCheck.sizes).to.be.undefined;
    });
  });
});
