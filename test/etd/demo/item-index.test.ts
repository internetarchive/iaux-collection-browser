import { expect } from '@open-wc/testing';
import {
  checkItemIndex,
  etdIndexUrls,
  parseItemIdentifier,
} from '../../../src/etd/demo/item-index';

/** A fetch that answers every request with one response, and records urls. */
function stubFetch(answer: () => Response | Promise<Response>) {
  const urls: string[] = [];
  const fetchFn = (async (input: RequestInfo | URL) => {
    urls.push(String(input));
    return answer();
  }) as typeof fetch;
  return { fetchFn, urls };
}

const jsonResponse = (body: unknown) => new Response(JSON.stringify(body));

const goodManifest = {
  v: '20261026-5e5902',
  n_docs: 1200,
  stub_bytes: 320,
  positional: true,
};

describe('parseItemIdentifier', () => {
  it('takes a bare identifier, trimmed', () => {
    expect(parseItemIdentifier('etd-search')).to.equal('etd-search');
    expect(parseItemIdentifier('  My_Item.2026 \n')).to.equal('My_Item.2026');
  });

  it('takes the identifier from a details page link', () => {
    expect(
      parseItemIdentifier('https://archive.org/details/etd-search'),
    ).to.equal('etd-search');
    expect(
      parseItemIdentifier(
        'http://www.archive.org/details/etd-search/page/n5?q=x#y',
      ),
    ).to.equal('etd-search');
  });

  it('takes the identifier from a download link to any of its files', () => {
    expect(
      parseItemIdentifier(
        'https://archive.org/download/etd-search/search.html',
      ),
    ).to.equal('etd-search');
    expect(
      parseItemIdentifier(
        'https://archive.org/download/etd-search/current.json',
      ),
    ).to.equal('etd-search');
    expect(
      parseItemIdentifier('https://archive.org/download/etd-search'),
    ).to.equal('etd-search');
  });

  it('turns down text that names no item', () => {
    for (const junk of [
      '',
      '   ',
      'etd search',
      '..',
      '.hidden',
      '../etc',
      'etd-search/search.html',
      'https://archive.org/',
      'https://archive.org/search?query=etd',
      'https://archive.org/details/',
      'https://archive.org/details/..',
      'https://example.com/details/etd-search',
      'https://archive.org.example.com/details/etd-search',
      'ftp://archive.org/download/etd-search',
      'javascript:alert(1)',
    ]) {
      expect(parseItemIdentifier(junk), junk).to.be.undefined;
    }
  });
});

describe('etdIndexUrls', () => {
  const urls = (search: string) => etdIndexUrls(new URLSearchParams(search));

  it('searches etd-search through /etd-index, as before, without etd_item', () => {
    expect(urls('search_service=etd')).to.deep.equal({
      baseUrl: '/etd-index/',
      pageUrl: '/etd-index/search.html',
      item: 'etd-search',
      rejectedItem: undefined,
    });
  });

  it('searches another item through /item-index', () => {
    expect(urls('search_service=etd&etd_item=other-index')).to.deep.equal({
      baseUrl: '/item-index/other-index/',
      pageUrl: '/item-index/other-index/search.html',
      item: 'other-index',
      rejectedItem: undefined,
    });
  });

  it('takes a details link in etd_item too', () => {
    const link = encodeURIComponent('https://archive.org/details/other-index');
    expect(urls(`etd_item=${link}`).item).to.equal('other-index');
  });

  it('keeps etd-search on its own proxy when named explicitly', () => {
    expect(urls('etd_item=etd-search').baseUrl).to.equal('/etd-index/');
  });

  it('ignores an etd_item that names no item, and says which', () => {
    const result = urls('etd_item=../secret');
    expect(result.item).to.equal('etd-search');
    expect(result.baseUrl).to.equal('/etd-index/');
    expect(result.rejectedItem).to.equal('../secret');
  });

  it('lets etd_base_url override the item', () => {
    expect(
      urls('etd_item=other-index&etd_base_url=https://example.org/idx'),
    ).to.deep.equal({
      baseUrl: 'https://example.org/idx',
      pageUrl: 'https://example.org/idx/search.html',
      item: undefined,
      rejectedItem: undefined,
    });
  });

  it('names the item when etd_base_url is its archive.org download folder', () => {
    const direct = urls('etd_base_url=https://archive.org/download/dl-search/');
    expect(direct.item).to.equal('dl-search');
    expect(direct.baseUrl).to.equal('https://archive.org/download/dl-search/');
    expect(direct.pageUrl).to.equal(
      'https://archive.org/download/dl-search/search.html',
    );
    expect(
      urls('etd_base_url=https://archive.org/download/dl-search').item,
    ).to.equal('dl-search');
  });

  it('names no item for any other etd_base_url', () => {
    for (const other of [
      'https://example.org/download/dl-search/',
      'https://archive.org/download/dl-search/older/',
      'https://archive.org/details/dl-search',
      'https://archive.org/download/..%2Fsecret/',
      '/etd-index/',
    ]) {
      expect(urls(`etd_base_url=${encodeURIComponent(other)}`).item, other).to
        .be.undefined;
    }
  });
});

describe('checkItemIndex', () => {
  it("reads the item's current.json through the proxy, fresh", async () => {
    const { fetchFn, urls } = stubFetch(() => jsonResponse(goodManifest));
    expect(await checkItemIndex('other-index', fetchFn)).to.deep.equal({
      ok: true,
    });
    expect(urls).to.have.length(1);
    expect(urls[0]).to.match(
      /^\/item-index\/other-index\/current\.json\?t=\d+$/,
    );
  });

  it('says an item without current.json is not an index', async () => {
    const { fetchFn } = stubFetch(() => new Response('', { status: 404 }));
    const check = await checkItemIndex('nasa', fetchFn);
    expect(check).to.deep.equal({
      ok: false,
      message:
        "nasa doesn't have a current.json, so it isn't a static search index this demo can read.",
    });
  });

  it('says so when current.json is not JSON', async () => {
    const { fetchFn } = stubFetch(() => new Response('<html>not json</html>'));
    const check = await checkItemIndex('odd-item', fetchFn);
    expect(check.ok).to.be.false;
    expect(check.ok || check.message).to.contain("current.json isn't JSON");
  });

  it('says so when current.json is JSON but no manifest', async () => {
    const { fetchFn } = stubFetch(() => jsonResponse(null));
    const check = await checkItemIndex('odd-item', fetchFn);
    expect(check.ok || check.message).to.contain("isn't an index manifest");
  });

  it('says why a manifest in another format is not read', async () => {
    const { fetchFn } = stubFetch(() =>
      jsonResponse({ ...goodManifest, stub_bytes: 256 }),
    );
    const check = await checkItemIndex('other-format', fetchFn);
    expect(check).to.deep.equal({
      ok: false,
      message:
        'other-format has a current.json, but not in a format this engine reads: stub_bytes 256 is not the 320-byte layout this engine reads.',
    });
  });

  it('reports other HTTP errors and network failures as such', async () => {
    const down = stubFetch(() => new Response('', { status: 503 }));
    expect(await checkItemIndex('x', down.fetchFn)).to.deep.equal({
      ok: false,
      message: "Couldn't read x's current.json (HTTP 503).",
    });

    const offline = stubFetch(() => {
      throw new TypeError('Failed to fetch');
    });
    expect(await checkItemIndex('x', offline.fetchFn)).to.deep.equal({
      ok: false,
      message: "Couldn't reach x: Failed to fetch.",
    });
  });
});
