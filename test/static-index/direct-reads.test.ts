import { expect } from '@open-wc/testing';
import {
  NO_CORS_REASON,
  checkDirectReads,
  checkItemDirectReads,
  indexFiles,
} from '../../src/static-index/direct-reads';

/**
 * Answers like archive.org: names ending in .json are readable from any
 * origin, missing.bin isn't there, and anything else has no CORS header,
 * which a browser's fetch reports as a TypeError.
 */
function archiveFetch(requests: Array<{ url: string; range?: string }> = []) {
  return (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const range = new Headers(init?.headers).get('Range') ?? undefined;
    requests.push({ url, range });
    if (url.includes('/metadata/')) {
      return new Response(
        JSON.stringify({
          result: [
            { name: 'current.json', size: '30', mtime: '1' },
            { name: 'dict.dir.20261029-aaaaaa', size: '8', mtime: '1' },
            { name: 'dict.dir.20261026-bbbbbb', size: '8', mtime: '1' },
            {
              name: 'facets-meta.json.20261029-aaaaaa.json',
              size: '8',
              mtime: '1',
            },
            { name: 'cells.bin', size: '8', mtime: '1' },
            { name: 'search.html', size: '8', mtime: '1' },
          ],
        }),
      );
    }
    if (url.includes('current.json')) {
      return new Response(JSON.stringify({ v: '20261029-aaaaaa' }));
    }
    if (url.endsWith('missing.bin')) return new Response('', { status: 404 });
    if (url.endsWith('.json')) return new Response('x', { status: 206 });
    throw new TypeError('Failed to fetch');
  }) as typeof fetch;
}

describe('indexFiles', () => {
  it('keeps the current version and the unversioned index files', () => {
    const names = [
      '__ia_spool/abc_00001_ias3_part.bin',
      'history/files/current.json.~1~',
      'etd-search_meta.xml',
      'etd-search_files.xml',
      'etd-search_archive.torrent',
      'search.html',
      'compare-net.js',
      'dict.dir.20261026-5e5902',
      'dict.dir.20261029-69300a',
      'facets-meta.json.20261029-69300a',
      'cells.bin',
      'ivf-meta.json',
      'Xenova/multilingual-e5-small/onnx/model_quantized.onnx',
    ];

    expect(indexFiles(names, '20261029-69300a')).to.deep.equal([
      'dict.dir.20261029-69300a',
      'facets-meta.json.20261029-69300a',
      'cells.bin',
      'ivf-meta.json',
      'Xenova/multilingual-e5-small/onnx/model_quantized.onnx',
    ]);
  });
});

describe('checkDirectReads', () => {
  it('says why each file it cannot read is blocked', async () => {
    const requests: Array<{ url: string; range?: string }> = [];
    const reads = await checkDirectReads(
      'some-item',
      [
        'dict.dir.20261029-aaaaaa',
        'facets-meta.json.20261029-aaaaaa.json',
        'missing.bin',
      ],
      { fetch: archiveFetch(requests) },
    );

    expect(reads).to.deep.equal([
      { file: 'dict.dir.20261029-aaaaaa', blocked: NO_CORS_REASON },
      { file: 'facets-meta.json.20261029-aaaaaa.json', blocked: undefined },
      { file: 'missing.bin', blocked: 'HTTP 404' },
    ]);
    // One byte of each, from the item's download path, as the engine reads
    expect(requests.map(r => r.url)).to.have.members([
      'https://archive.org/download/some-item/dict.dir.20261029-aaaaaa',
      'https://archive.org/download/some-item/facets-meta.json.20261029-aaaaaa.json',
      'https://archive.org/download/some-item/missing.bin',
    ]);
    requests.forEach(r => expect(r.range).to.equal('bytes=0-0'));
  });
});

describe('checkItemDirectReads', () => {
  it("checks only the current version's index files", async () => {
    const reads = await checkItemDirectReads('some-item', {
      fetch: archiveFetch(),
    });

    expect(reads?.map(read => [read.file, !!read.blocked])).to.deep.equal([
      ['current.json', false],
      ['dict.dir.20261029-aaaaaa', true],
      ['facets-meta.json.20261029-aaaaaa.json', false],
      ['cells.bin', true],
    ]);
  });

  it('gives up when current.json does not load', async () => {
    const reads = await checkItemDirectReads('some-item', {
      fetch: (async (input: RequestInfo | URL) =>
        String(input).includes('current.json')
          ? new Response('', { status: 404 })
          : archiveFetch()(input)) as typeof fetch,
    });

    expect(reads).to.be.undefined;
  });
});
