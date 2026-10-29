import { expect } from '@open-wc/testing';
import { retryingFetch } from '../../../src/etd/engine/retrying-fetch';
import { EtdIndexFiles } from '../../../src/etd/engine/index-files';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';

/** A server that answers with these, in turn, then 206s. */
function server(...answers: (number | 'reset')[]) {
  const calls: string[] = [];
  const fetchFn = (async (input: RequestInfo | URL, init?: RequestInit) => {
    calls.push(String(input));
    if (init?.signal?.aborted) {
      throw new DOMException('The operation was aborted.', 'AbortError');
    }
    const answer = answers.shift() ?? 206;
    if (answer === 'reset') throw new TypeError('Failed to fetch');
    return new Response(answer === 206 ? 'bytes' : 'error page', {
      status: answer,
    });
  }) as typeof fetch;
  return { fetchFn, calls };
}

const FAST = { delays: [10, 10] };

describe('retryingFetch', () => {
  it('asks again after a 502, and gives the answer that came', async () => {
    const { fetchFn, calls } = server(502);
    const reasons: string[] = [];
    const response = await retryingFetch(fetchFn, {
      ...FAST,
      onRetry: reason => reasons.push(reason),
    })('https://example.org/cells.bin');

    expect(response.status).to.equal(206);
    expect(await response.text()).to.equal('bytes');
    expect(calls).to.have.length(2);
    expect(reasons).to.deep.equal(['HTTP 502']);
  });

  it('asks again when no answer came at all', async () => {
    const { fetchFn, calls } = server('reset', 503);
    const response = await retryingFetch(fetchFn, FAST)('https://example.org/');
    expect(response.status).to.equal(206);
    expect(calls).to.have.length(3);
  });

  it('gives up after its retries, with the last answer', async () => {
    const { fetchFn, calls } = server(502, 504, 502);
    const response = await retryingFetch(fetchFn, FAST)('https://example.org/');
    expect(response.status).to.equal(502);
    expect(calls).to.have.length(3);
  });

  it('takes a 404 or a 500 as the answer', async () => {
    for (const status of [404, 500]) {
      const { fetchFn, calls } = server(status);

      const response = await retryingFetch(
        fetchFn,
        FAST,
      )('https://example.org/');
      expect(response.status).to.equal(status);
      expect(calls).to.have.length(1);
    }
  });

  it('stops waiting, and asks no more, once aborted', async () => {
    const { fetchFn, calls } = server(502);
    const abort = new AbortController();
    const pending = retryingFetch(fetchFn, { delays: [10_000] })(
      'https://example.org/',
      { signal: abort.signal },
    );
    setTimeout(() => abort.abort(), 20);

    let error: unknown;
    try {
      await pending;
    } catch (err) {
      error = err;
    }
    expect((error as Error).name).to.equal('AbortError');
    expect(calls).to.have.length(1);
  });
});

describe('index reads through archive.org errors', () => {
  it('reads a range through one 502, and counts the retry', async () => {
    const index = await buildFixtureIndex([{ title: 'Sea ice drift' }]);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    index.failNext('stubs.bin', 502);

    const [stub] = await files.ranges('stubs.bin', [[0, 320]]);

    expect(stub).to.have.length(320);
    expect(files.stats.retries).to.equal(1);
  });

  it('opens the index through a 502 on current.json', async () => {
    const index = await buildFixtureIndex([{ title: 'Sea ice drift' }]);
    index.failNext('current.json', 502);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    expect(files.meta.n_docs).to.equal(1);
  });
});
