import { expect } from '@open-wc/testing';
import { decodeHalfs, encodeHalf } from '../../../../src/etd/engine/vector/f16';
import {
  FileCheckError,
  VectorStoreFiles,
  checkIvfMeta,
} from '../../../../src/etd/engine/vector/vector-files';
import { MEANING_WORDS_MAP } from '../../../../src/etd/engine/file-checks';
import type { IvfMeta } from '../../../../src/etd/engine/vector/vector-files';
import {
  FIXTURE_VECTOR_BASE,
  FIXTURE_VECTOR_DATA,
  buildFixtureVectorStore,
} from './fixture-vector-store';
import type { FixtureVectorOptions } from './fixture-vector-store';

/** A two-doc store, served with options such as a file list. */
function twoDocStore(options: Partial<FixtureVectorOptions> = {}) {
  return buildFixtureVectorStore(
    [
      { title: 'Sea ice', vector: [1, 0], cell: 0, abstract: 'Ice.' },
      { title: 'Tundra', vector: [0, 1], cell: 1, abstract: 'Moss.' },
    ],
    {
      centroids: [
        [1, 0],
        [0, 1],
      ],
      ...options,
    },
  );
}

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

    const manifest = store.requests.find(r => r.url.includes('ivf-meta.json'));
    expect(manifest?.url).to.match(/ivf-meta\.json\?t=\d+$/);
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

  describe("against the item's file list", () => {
    it('keys each file to its own size and change time, not the build', async () => {
      const store = await twoDocStore({ fileList: { mtime: 1791831785 } });
      const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: store.fetch,
      });

      const size = files.fileCheck.sizes?.checks.find(
        c => c.rule.file === 'cells.bin',
      )?.size;
      expect(files.fileUrl('cells.bin')).to.equal(
        `${FIXTURE_VECTOR_DATA}cells.bin?v=1791831785-${size}`,
      );
      expect(files.fileCheck.itemId).to.equal('vec-fixture');
      expect(files.fileCheck.sizes?.failedLayers).to.deep.equal([]);
    });

    it('gives a file replaced under the same build stamp a new cache key', async () => {
      // The owner republishes cell-codes.bin; ivf-meta.json's `built` stays.
      const before = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: (await twoDocStore({ fileList: { mtime: 1791831785 } })).fetch,
      });
      const after = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: (await twoDocStore({ fileList: { mtime: 1792747207 } })).fetch,
      });

      expect(before.meta.built).to.equal(after.meta.built);
      expect(after.fileUrl('cell-codes.bin')).not.to.equal(
        before.fileUrl('cell-codes.bin'),
      );
    });

    it("won't open a store whose docs.bin was built for another set of vectors", async () => {
      // docs.bin from a rebuild with 3 vectors; ivf-meta.json still says 2.
      const store = await twoDocStore({
        fileList: { sizes: { 'docs.bin': 3 * 138 } },
      });
      let error: unknown;
      try {
        await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
          fetch: store.fetch,
        });
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(FileCheckError);
      const { message, fileCheck } = error as FileCheckError;
      expect(message).to.contain('docs.bin is 414 bytes');
      expect(message).to.contain('which fits 3 vectors');
      expect(message).to.contain('the manifest says 2 vectors');
      expect(fileCheck.sizes?.failedLayers).to.deep.equal([
        'search by meaning',
      ]);
      // Nothing past the manifests was read with the wrong row count.
      expect(store.requestsTo('docs.bin')).to.have.length(0);
    });

    it('opens, but reports a meaning-to-words map built for an older text index', async () => {
      // As on etd-search 2026-10-29: txt2vrow.bin has an entry per doc of
      // the previous text build, which had fewer docs than current.json.
      const store = await twoDocStore({
        textDocs: 5,
        fileList: { extra: { 'vrow2txt.bin': 2 * 4, 'txt2vrow.bin': 4 * 4 } },
      });
      const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: store.fetch,
      });

      const map = files.fileCheck.sizes?.checks.find(
        c => c.rule.file === 'txt2vrow.bin',
      );
      expect(map?.status).to.equal('mismatch');
      expect(map?.fitsRows).to.equal(4);
      expect(map?.rule.rows).to.equal(5);
      expect(files.fileCheck.sizes?.failedLayers).to.deep.equal([
        MEANING_WORDS_MAP,
      ]);
    });

    it("doesn't count a file the list doesn't have yet as a failure", async () => {
      // The list lags a fresh upload by a few minutes.
      const store = await twoDocStore({ fileList: {} });
      const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: store.fetch,
      });

      const vrow2txt = files.fileCheck.sizes?.checks.find(
        c => c.rule.file === 'vrow2txt.bin',
      );
      expect(vrow2txt?.status).to.equal('unlisted');
      expect(files.fileCheck.sizes?.failedLayers).to.deep.equal([]);
      // Unlisted files fall back to the build stamp.
      expect(files.fileUrl('vrow2txt.bin')).to.equal(
        `${FIXTURE_VECTOR_DATA}vrow2txt.bin?v=2026-10-12%2011%3A31`,
      );
    });

    it('searches as before when the file list does not load', async () => {
      const store = await twoDocStore();
      const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
        fetch: store.fetch,
      });

      expect(files.fileCheck).to.deep.equal({
        itemId: 'vec-fixture',
        sizes: undefined,
      });
      expect(files.fileUrl('cells.bin')).to.equal(
        `${FIXTURE_VECTOR_DATA}cells.bin?v=2026-10-12%2011%3A31`,
      );
    });
  });
});
