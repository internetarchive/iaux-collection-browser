import { expect } from '@open-wc/testing';
import {
  fetchInParallel,
  modelCacheKey,
  modelFileCache,
} from '../../../../src/etd/engine/vector/embedder';
import { HttpError } from '../../../../src/etd/engine/http-error';
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

describe('modelFileCache', () => {
  /** A model file nobody has cached: a fresh url each time. */
  const freshUrl = () =>
    `https://example.org/Xenova/e5/${Math.random().toString(36).slice(2)}.json`;

  function answering(status: number) {
    const fetchFn = (async () =>
      new Response(status < 300 ? '{}' : 'error page', {
        status,
      })) as typeof fetch;
    return modelFileCache({ parallel: 4, fetchFn, onBytes: () => {} });
  }

  it('fails the model load when the server keeps failing', async () => {
    let error: unknown;
    try {
      await answering(502).match(freshUrl());
    } catch (err) {
      error = err;
    }
    // Rather than handing the file back to transformers.js to try once more.
    expect(error).to.be.instanceOf(HttpError);
    expect((error as HttpError).status).to.equal(502);
  });

  it('leaves a missing file to transformers.js, which knows the optional ones', async () => {
    expect(await answering(404).match(freshUrl())).to.be.undefined;
  });

  it('keeps a file it fetched, so the next load reads it from the cache', async () => {
    const url = freshUrl();
    const first = await answering(200).match(url);
    expect(await first!.text()).to.equal('{}');
    // The server is down now; the cached copy still answers.
    const second = await answering(502).match(url);
    expect(await second!.text()).to.equal('{}');
  });
});
