import { expect } from '@open-wc/testing';
import { decodeHalfs, encodeHalf } from '../../../../src/etd/engine/vector/f16';
import {
  VectorStoreFiles,
  checkIvfMeta,
} from '../../../../src/etd/engine/vector/vector-files';
import type { IvfMeta } from '../../../../src/etd/engine/vector/vector-files';
import {
  FIXTURE_VECTOR_BASE,
  FIXTURE_VECTOR_DATA,
  buildFixtureVectorStore,
} from './fixture-vector-store';

// The real store's manifest, 2026-10-12.
const LIVE_META: IvfMeta = {
  n: 18176413,
  ncell: 16384,
  dim: 384,
  model: 'intfloat/multilingual-e5-small',
  rowbytes: 772,
  docbytes: 308,
  fields: { title: 160, host: 30, date: 10, landing: 100, lang: 8 },
  vsnip: true,
  codes: true,
  built: '2026-10-12 11:31',
};

describe('VectorStoreFiles', () => {
  it('reads the manifest fresh, then the files from the storage server, keyed to the build', async () => {
    const store = await buildFixtureVectorStore(
      [{ title: 'Sea ice', vector: [1, 0], cell: 0 }],
      { centroids: [[1, 0]] },
    );
    const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
      fetch: store.fetch,
    });

    expect(store.requests[0].url).to.match(/ivf-meta\.json\?t=\d+$/);
    expect(files.fileUrl('cells.bin')).to.equal(
      `${FIXTURE_VECTOR_DATA}cells.bin?v=2026-10-12%2011%3A31`,
    );
  });

  it('says so when the item has no vector store', async () => {
    const notFound = (async () =>
      new Response('', { status: 404 })) as typeof fetch;
    let error: Error | undefined;
    try {
      await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, { fetch: notFound });
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.contain('no ivf-meta.json');
  });

  it('opens through a 502 on the manifest, and counts the retry', async () => {
    const store = await buildFixtureVectorStore(
      [{ title: 'Sea ice', vector: [1, 0], cell: 0 }],
      { centroids: [[1, 0]] },
    );
    let failed = false;
    const flaky = (async (input: RequestInfo | URL, init?: RequestInit) => {
      if (!failed && String(input).includes('ivf-meta.json')) {
        failed = true;
        return new Response('', { status: 502 });
      }
      return store.fetch(input, init);
    }) as typeof fetch;

    const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
      fetch: flaky,
    });
    expect(files.meta.n).to.equal(1);
    expect(files.stats.retries).to.equal(1);
  });

  it('says the service failed, not that the store is missing, when it never answers', async function () {
    // Two real retry waits, ~0.5 s then ~1.5 s, with jitter.
    this.timeout(5000);
    const down = (async () => {
      throw new TypeError('Failed to fetch');
    }) as typeof fetch;
    let error: unknown;
    try {
      await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, { fetch: down });
    } catch (err) {
      error = err;
    }
    // After the retries, the fetch's own error.
    expect(error).to.be.instanceOf(TypeError);
  });

  it("accepts the real store's manifest", () => {
    expect(() => checkIvfMeta(LIVE_META)).not.to.throw();
  });

  it('refuses a row layout it does not know', () => {
    expect(() => checkIvfMeta({ ...LIVE_META, rowbytes: 1540 })).to.throw(
      'rowbytes 1540',
    );
    expect(() =>
      checkIvfMeta({
        ...LIVE_META,
        fields: { ...LIVE_META.fields, title: 200 },
      }),
    ).to.throw("don't add up");
  });
});

describe('f16', () => {
  it('decodes halfs as the live page does, including the edge cases', () => {
    const halfs = [0x3c00, 0xc000, 0x3555, 0x0001, 0x7bff, 0x7c00, 0x8000];
    const bytes = new Uint8Array(halfs.length * 2);
    halfs.forEach((h, i) => {
      bytes[i * 2] = h & 0xff;
      bytes[i * 2 + 1] = h >> 8;
    });
    const values = Array.from(decodeHalfs(bytes, 0, halfs.length));
    expect(values.slice(0, 2)).to.deep.equal([1, -2]);
    expect(values[2]).to.be.closeTo(1 / 3, 1e-3);
    expect(values[3]).to.equal(2 ** -24); // smallest subnormal
    expect(values[4]).to.equal(65504); // largest finite
    expect(values[5]).to.equal(Infinity);
    expect(Object.is(values[6], -0)).to.be.true;
  });

  it('encodes to the nearest half, for the fixtures', () => {
    expect(encodeHalf(1)).to.equal(0x3c00);
    expect(encodeHalf(-2)).to.equal(0xc000);
    expect(encodeHalf(1 / 3)).to.equal(0x3555);
    expect(encodeHalf(2 ** -24)).to.equal(0x0001);
  });
});
