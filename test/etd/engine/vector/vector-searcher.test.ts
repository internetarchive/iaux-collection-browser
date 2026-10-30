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

  answerEmbed?: (message: Extract<ToWorker, { type: 'embed' }>) => FromWorker;

  postMessage(message: ToWorker): void {
    this.received.push(message);
    const reply =
      message.type === 'search'
        ? this.answer?.(message)
        : message.type === 'embed'
          ? this.answerEmbed?.(message)
          : undefined;
    if (reply) {
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

  it("passes the worker's first answer on, before the result", async () => {
    const worker = new FakeWorker();
    const firsts: unknown[] = [];
    const pending = searcher(worker).search('sea ice', {
      onEarly: early => firsts.push(early),
    });
    const sent = worker.received.find(m => m.type === 'search') as Extract<
      ToWorker,
      { type: 'search' }
    >;
    // The worker only sends one if asked.
    expect(sent.early).to.be.true;
    const early = {
      dids: Uint32Array.from([7, 3]),
      scores: Float64Array.from([0.9, 0.8]),
      candidates: 40,
      progress: { cellsDone: 4, cells: 32, bytes: 1, requests: 4, retries: 0 },
    };
    worker.dispatchEvent(
      new MessageEvent('message', {
        data: { type: 'early', id: sent.id, early },
      }),
    );
    expect(firsts).to.deep.equal([early]);
    worker.dispatchEvent(
      new MessageEvent('message', {
        data: {
          type: 'error',
          id: sent.id,
          message: 'aborted',
          aborted: true,
        },
      }),
    );
    await rejection(pending);
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

describe('WorkerVectorSearcher.embed', () => {
  it("returns the worker's vector for the query, with no scan", async () => {
    const worker = new FakeWorker();
    worker.answerEmbed = ({ id }) => ({
      type: 'embedded',
      id,
      vector: Float32Array.from([0.5, -0.5]),
    });

    const vector = await searcher(worker).embed('sea ice');

    expect(Array.from(vector)).to.deep.equal([0.5, -0.5]);
    expect(worker.received.at(-1)).to.include({
      type: 'embed',
      text: 'sea ice',
    });
    expect(worker.received.some(m => m.type === 'search')).to.equal(false);
  });

  it("rejects with the worker's error, as a search would", async () => {
    const worker = new FakeWorker();
    worker.answerEmbed = ({ id }) => ({
      type: 'error',
      id,
      message: 'model_quantized.onnx: HTTP 503',
      aborted: false,
      status: 503,
    });

    const error = await rejection(searcher(worker).embed('sea ice'));

    expect(error).to.be.instanceOf(HttpError);
    expect((error as HttpError).status).to.equal(503);
  });

  it('stops waiting when aborted', async () => {
    const worker = new FakeWorker();
    const controller = new AbortController();
    const pending = searcher(worker).embed('sea ice', {
      signal: controller.signal,
    });
    controller.abort();

    const error = await rejection(pending);

    expect(error.name).to.equal('AbortError');
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
