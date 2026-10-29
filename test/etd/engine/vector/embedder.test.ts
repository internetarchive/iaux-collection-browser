import { expect } from '@open-wc/testing';
import {
  fetchInParallel,
  modelCacheKey,
} from '../../../../src/etd/engine/vector/embedder';
import { rangeResponse } from '../fixture-index';

describe('modelCacheKey', () => {
  const key = 'https://etd-model.cache/etd-search/Xenova/e5/onnx/model.onnx';

  it('keys a model file by its path in the item, whichever host served it', () => {
    // A storage server (which can change), the canonical download url, and
    // the dev proxy all give the live page's key.
    expect(
      modelCacheKey(
        'https://ia801402.us.archive.org/31/items/etd-search/Xenova/e5/onnx/model.onnx',
      ),
    ).to.equal(key);
    expect(
      modelCacheKey(
        'https://archive.org/download/etd-search/Xenova/e5/onnx/model.onnx?cb=1',
      ),
    ).to.equal(key);
    expect(
      modelCacheKey(
        new Request(
          'http://localhost:8093/etd-index/Xenova/e5/onnx/model.onnx',
        ),
      ),
    ).to.equal('https://etd-model.cache/etd-index/Xenova/e5/onnx/model.onnx');
  });
});

describe('fetchInParallel', () => {
  const file = Uint8Array.from({ length: 3 << 20 }, (_, i) => (i * 7) % 251);
  const url = 'https://example.org/model.onnx';

  function server(honorsRange = true) {
    const ranges: string[] = [];
    const fetchFn = (async (_: RequestInfo | URL, init?: RequestInit) => {
      const range = new Headers(init?.headers).get('Range')!;
      ranges.push(range);
      return honorsRange
        ? rangeResponse(file, range)
        : new Response(file, { status: 200 });
    }) as typeof fetch;
    return { fetchFn, ranges };
  }

  it('reads a big file as several ranges at once, into the same bytes', async () => {
    const { fetchFn, ranges } = server();
    let loaded = 0;
    let total = 0;
    const response = await fetchInParallel(url, 4, fetchFn, (bytes, size) => {
      loaded += bytes;
      total += size;
    });

    expect(new Uint8Array(await response.arrayBuffer())).to.deep.equal(file);
    // The first MB tells the size; the other 2 MB come in 4 parts.
    expect(ranges).to.have.length(5);
    expect(ranges[0]).to.equal(`bytes=0-${(1 << 20) - 1}`);
    expect(response.headers.get('content-length')).to.equal(
      String(file.length),
    );
    expect([loaded, total]).to.deep.equal([file.length, file.length]);
  });

  it('takes the whole file from a server that ignores Range', async () => {
    const { fetchFn, ranges } = server(false);
    const response = await fetchInParallel(url, 4, fetchFn, () => {});
    expect(new Uint8Array(await response.arrayBuffer())).to.deep.equal(file);
    expect(ranges).to.have.length(1);
  });

  it('fails rather than return a file with a part missing', async () => {
    const { fetchFn } = server();
    let calls = 0;
    const failing = (async (input: RequestInfo | URL, init?: RequestInit) => {
      calls += 1;
      return calls === 3
        ? new Response('', { status: 503 })
        : fetchFn(input, init);
    }) as typeof fetch;
    let error: Error | undefined;
    try {
      await fetchInParallel(url, 4, failing, () => {});
    } catch (err) {
      error = err as Error;
    }
    expect(error?.message).to.contain('HTTP 503');
  });
});
