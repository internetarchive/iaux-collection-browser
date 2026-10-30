import { expect } from '@open-wc/testing';
import {
  ItemFileList,
  itemIdFromUrl,
  loadItemFileList,
} from '../../src/static-index/file-list';

/** A fetch answering only archive.org's file list for `item`. */
function listFetch(item: string, body: unknown, status = 200) {
  const urls: string[] = [];
  const fetchFn = (async (input: RequestInfo | URL) => {
    urls.push(String(input));
    return String(input) === `https://archive.org/metadata/${item}/files`
      ? new Response(JSON.stringify(body), { status })
      : new Response('', { status: 404 });
  }) as typeof fetch;
  return { fetchFn, urls };
}

describe('itemIdFromUrl', () => {
  it('finds the item in a download, details or local proxy url', () => {
    expect(itemIdFromUrl('https://archive.org/download/etd-search/')).to.equal(
      'etd-search',
    );
    expect(
      itemIdFromUrl('https://archive.org/download/etd-search/current.json'),
    ).to.equal('etd-search');
    expect(itemIdFromUrl('https://archive.org/details/my_item.2')).to.equal(
      'my_item.2',
    );
    expect(itemIdFromUrl('/item-index/other-item/')).to.equal('other-item');
  });

  it("has no item for a url it can't place", () => {
    expect(itemIdFromUrl('/etd-index/')).to.be.undefined;
    expect(itemIdFromUrl('https://example.org/index/')).to.be.undefined;
    expect(itemIdFromUrl('https://archive.org/download/..%2Fx/')).to.be
      .undefined;
  });
});

describe('loadItemFileList', () => {
  it('reads each file’s size and change time, skipping entries without them', async () => {
    const { fetchFn } = listFetch('etd-search', {
      result: [
        { name: 'cells.bin', size: '14032190836', mtime: '1791831785' },
        { name: 'etd-search_meta.xml', mtime: '1793061381' },
      ],
    });
    const list = await loadItemFileList('etd-search', { fetch: fetchFn });

    expect(list?.get('cells.bin')).to.deep.equal({
      name: 'cells.bin',
      size: 14032190836,
      mtime: 1791831785,
    });
    expect(list?.cacheKey('cells.bin')).to.equal('1791831785-14032190836');
    expect(list?.get('etd-search_meta.xml')).to.be.undefined;
    expect(list?.cacheKey('missing.bin')).to.be.undefined;
  });

  it('gives no list, rather than failing, when archive.org has none to give', async () => {
    const down = listFetch('etd-search', {}, 503).fetchFn;
    const odd = listFetch('etd-search', { result: 'nope' }).fetchFn;
    const throws = (async () => {
      throw new TypeError('Failed to fetch');
    }) as typeof fetch;

    expect(await loadItemFileList('etd-search', { fetch: down })).to.be
      .undefined;
    expect(await loadItemFileList('etd-search', { fetch: odd })).to.be
      .undefined;
    expect(await loadItemFileList('etd-search', { fetch: throws })).to.be
      .undefined;
  });

  it('still stops on an abort', async () => {
    const controller = new AbortController();
    controller.abort();
    const aborting = (async () => {
      throw new DOMException('aborted', 'AbortError');
    }) as typeof fetch;
    let error: unknown;
    try {
      await loadItemFileList('etd-search', {
        fetch: aborting,
        signal: controller.signal,
      });
    } catch (err) {
      error = err;
    }
    expect((error as DOMException)?.name).to.equal('AbortError');
  });

  it('is an ItemFileList for its item', async () => {
    const { fetchFn } = listFetch('x', { result: [] });
    const list = await loadItemFileList('x', { fetch: fetchFn });
    expect(list).to.be.instanceOf(ItemFileList);
    expect(list?.itemId).to.equal('x');
  });
});
