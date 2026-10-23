import { expect } from '@open-wc/testing';
import { EtdPager } from '../../src/etd/etd-pager';
import { MockEtdEngine, mockEtdTheses } from '../mocks/mock-etd-engine';

const docIds = (records: { docId: number }[]) => records.map(r => r.docId);

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

async function pagerOver(engine: MockEtdEngine): Promise<EtdPager> {
  return new EtdPager(await engine.query('climate', {}));
}

describe('EtdPager', () => {
  it('serves pages in rank order', async () => {
    const pager = await pagerOver(new MockEtdEngine(mockEtdTheses(100)));
    expect(docIds(await pager.slice(0, 10))).to.deep.equal(range(1, 10));
    expect(docIds(await pager.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('serves a page jumped to out of order the same as reading in order', async () => {
    const inOrder = await pagerOver(new MockEtdEngine(mockEtdTheses(100)));
    for (let page = 0; page < 7; page += 1) {
      await inOrder.slice(page * 10, page * 10 + 10);
    }
    const expected = docIds(await inOrder.slice(60, 70));

    const jumped = await pagerOver(new MockEtdEngine(mockEtdTheses(100)));
    expect(docIds(await jumped.slice(60, 70))).to.deep.equal(expected);
    expect(docIds(await jumped.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('reads each record from the engine only once', async () => {
    const engine = new MockEtdEngine(mockEtdTheses(100));
    const pager = await pagerOver(engine);

    await pager.slice(40, 50);
    await pager.slice(0, 10);
    await pager.slice(20, 30);

    expect(pager.loadedCount).to.equal(50);
    expect(engine.nextCalls).to.deep.equal([50]);
  });

  it('keeps reading when the engine returns short batches', async () => {
    // The real engine verifies quoted phrases as it reads, so a call can
    // come back with fewer records than asked for.
    const engine = new MockEtdEngine(mockEtdTheses(100));
    engine.maxPerRead = 7;
    const pager = await pagerOver(engine);

    expect(docIds(await pager.slice(0, 25))).to.deep.equal(range(1, 25));
    expect(engine.nextCalls).to.deep.equal([25, 18, 11, 4]);
  });

  it('stops at the reachable cap even when more records match', async () => {
    const engine = new MockEtdEngine(mockEtdTheses(100));
    engine.reachableCap = 30;
    const pager = await pagerOver(engine);

    expect(docIds(await pager.slice(20, 40))).to.deep.equal(range(21, 30));
    expect(await pager.slice(30, 40)).to.deep.equal([]);
    expect(engine.nextCalls).to.deep.equal([30]);
  });

  it('returns a short last page and then nothing', async () => {
    const pager = await pagerOver(new MockEtdEngine(mockEtdTheses(25)));
    expect(docIds(await pager.slice(20, 30))).to.deep.equal(range(21, 25));
    expect(await pager.slice(30, 40)).to.deep.equal([]);
  });

  it('resumes where it was after a failed read, with no gaps or repeats', async () => {
    const engine = new MockEtdEngine(mockEtdTheses(100));
    const pager = await pagerOver(engine);
    await pager.slice(0, 10);

    engine.failNextRead = new Error('HTTP 503');
    let failure: unknown;
    try {
      await pager.slice(10, 20);
    } catch (err) {
      failure = err;
    }
    expect((failure as Error).message).to.equal('HTTP 503');
    expect(pager.loadedCount).to.equal(10);

    expect(docIds(await pager.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('serializes concurrent page requests on the one cursor', async () => {
    const engine = new MockEtdEngine(mockEtdTheses(100));
    const pager = await pagerOver(engine);

    const [later, earlier] = await Promise.all([
      pager.slice(30, 40),
      pager.slice(0, 10),
    ]);

    expect(docIds(later)).to.deep.equal(range(31, 40));
    expect(docIds(earlier)).to.deep.equal(range(1, 10));
    expect(pager.loadedCount).to.equal(40);
  });
});
