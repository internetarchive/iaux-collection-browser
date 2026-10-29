import { expect } from '@open-wc/testing';
import { HttpError } from '../../../../src/etd/engine/http-error';
import {
  WorkerVectorSearcher,
  workerError,
} from '../../../../src/etd/engine/vector/vector-searcher';
import type {
  FromWorker,
  ToWorker,
} from '../../../../src/etd/engine/vector/vector-searcher';

/** A worker that answers each search with whatever the test says. */
class FakeWorker extends EventTarget {
  readonly received: ToWorker[] = [];

  answer?: (message: Extract<ToWorker, { type: 'search' }>) => FromWorker;

  postMessage(message: ToWorker): void {
    this.received.push(message);
    if (message.type === 'search' && this.answer) {
      const reply = this.answer(message);
      setTimeout(() =>
        this.dispatchEvent(new MessageEvent('message', { data: reply })),
      );
    }
  }
}

function searcher(worker: FakeWorker) {
  return new WorkerVectorSearcher(worker as unknown as Worker, {
    type: 'init',
    baseUrl: 'https://archive.org/download/etd-search/',
    model: { modelBase: 'https://archive.org/download/etd-search/' },
  });
}

async function rejection(promise: Promise<unknown>): Promise<Error> {
  try {
    await promise;
  } catch (err) {
    return err as Error;
  }
  throw new Error('expected a rejection');
}

describe('WorkerVectorSearcher', () => {
  it('starts the worker with the store and model to use', () => {
    const worker = new FakeWorker();
    searcher(worker);
    expect(worker.received[0]).to.include({ type: 'init' });
  });

  it("keeps a server failure's status across the worker boundary", async () => {
    const worker = new FakeWorker();
    worker.answer = ({ id }) => ({
      type: 'error',
      id,
      message: 'cell-codes.bin: HTTP 502',
      aborted: false,
      status: 502,
    });
    const error = await rejection(searcher(worker).search('sea ice'));

    // So the search service can say the server failed, not the query.
    expect(error).to.be.instanceOf(HttpError);
    expect((error as HttpError).status).to.equal(502);
    expect(error.message).to.equal('cell-codes.bin: HTTP 502');
  });

  it('tells the worker to stop when a search is aborted', async () => {
    const worker = new FakeWorker();
    const abort = new AbortController();
    const pending = searcher(worker).search('sea ice', {
      signal: abort.signal,
    });
    abort.abort();
    const { id } = worker.received.find(m => m.type === 'search') as {
      id: number;
    };
    expect(worker.received.at(-1)).to.deep.equal({ type: 'cancel', id });
    // The worker answers a cancelled search with an abort.
    worker.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'error', id, message: 'aborted', aborted: true },
      }),
    );
    expect((await rejection(pending)).name).to.equal('AbortError');
  });
});

describe('workerError', () => {
  const base = { type: 'error' as const, id: 1, message: 'm', aborted: false };

  it('rebuilds each kind of error the worker reports', () => {
    expect(workerError({ ...base, aborted: true }).name).to.equal('AbortError');
    expect(workerError({ ...base, status: 503 })).to.be.instanceOf(HttpError);
    expect(workerError({ ...base, network: true })).to.be.instanceOf(TypeError);
    const plain = workerError(base);
    expect(plain).not.to.be.instanceOf(HttpError);
    expect(plain).not.to.be.instanceOf(TypeError);
  });
});
