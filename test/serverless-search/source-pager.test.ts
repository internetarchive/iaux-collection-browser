import { expect } from '@open-wc/testing';
import { SourcePager } from '../../src/serverless-search/source-pager';
import { MockSearchSource, mockBooks } from '../mocks/mock-search-source';
import type { MockBook } from '../mocks/mock-search-source';

const numbers = (books: MockBook[]) =>
  books.map(book => Number(book.id.slice('book-'.length)));

const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

async function pagerOver(
  source: MockSearchSource,
): Promise<SourcePager<MockBook>> {
  return new SourcePager(await source.query({ text: 'rivers' }));
}

describe('SourcePager', () => {
  it('serves pages in order', async () => {
    const pager = await pagerOver(new MockSearchSource(mockBooks(100)));
    expect(numbers(await pager.slice(0, 10))).to.deep.equal(range(1, 10));
    expect(numbers(await pager.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('serves a page jumped to out of order the same as reading in order', async () => {
    const inOrder = await pagerOver(new MockSearchSource(mockBooks(100)));
    for (let page = 0; page < 7; page += 1) {
      await inOrder.slice(page * 10, page * 10 + 10);
    }
    const expected = numbers(await inOrder.slice(60, 70));

    const jumped = await pagerOver(new MockSearchSource(mockBooks(100)));
    expect(numbers(await jumped.slice(60, 70))).to.deep.equal(expected);
    expect(numbers(await jumped.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('reads each record from the source only once', async () => {
    const source = new MockSearchSource(mockBooks(100));
    const pager = await pagerOver(source);

    await pager.slice(40, 50);
    await pager.slice(0, 10);
    await pager.slice(20, 30);

    expect(pager.loadedCount).to.equal(50);
    expect(source.nextCalls).to.deep.equal([50]);
  });

  it('keeps reading when the cursor returns short batches', async () => {
    // A cursor that filters as it reads (ETD verifies quoted phrases) can
    // come back with fewer records than asked for.
    const source = new MockSearchSource(mockBooks(100));
    source.maxPerRead = 7;
    const pager = await pagerOver(source);

    expect(numbers(await pager.slice(0, 25))).to.deep.equal(range(1, 25));
    expect(source.nextCalls).to.deep.equal([25, 18, 11, 4]);
  });

  it('stops at the reachable cap even when more records match', async () => {
    const source = new MockSearchSource(mockBooks(100));
    source.reachableCap = 30;
    const pager = await pagerOver(source);

    expect(numbers(await pager.slice(20, 40))).to.deep.equal(range(21, 30));
    expect(await pager.slice(30, 40)).to.deep.equal([]);
    expect(source.nextCalls).to.deep.equal([30]);
  });

  it('returns a short last page and then nothing', async () => {
    const pager = await pagerOver(new MockSearchSource(mockBooks(25)));
    expect(numbers(await pager.slice(20, 30))).to.deep.equal(range(21, 25));
    expect(await pager.slice(30, 40)).to.deep.equal([]);
  });

  it('resumes where it was after a failed read, with no gaps or repeats', async () => {
    const source = new MockSearchSource(mockBooks(100));
    const pager = await pagerOver(source);
    await pager.slice(0, 10);

    source.failNextRead = new Error('HTTP 503');
    let failure: unknown;
    try {
      await pager.slice(10, 20);
    } catch (err) {
      failure = err;
    }
    expect((failure as Error).message).to.equal('HTTP 503');
    expect(pager.loadedCount).to.equal(10);

    expect(numbers(await pager.slice(10, 20))).to.deep.equal(range(11, 20));
  });

  it('serializes concurrent page requests on the one cursor', async () => {
    const pager = await pagerOver(new MockSearchSource(mockBooks(100)));

    const [later, earlier] = await Promise.all([
      pager.slice(30, 40),
      pager.slice(0, 10),
    ]);

    expect(numbers(later)).to.deep.equal(range(31, 40));
    expect(numbers(earlier)).to.deep.equal(range(1, 10));
    expect(pager.loadedCount).to.equal(40);
  });
});
