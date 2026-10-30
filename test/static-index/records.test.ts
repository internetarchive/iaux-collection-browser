import { expect } from '@open-wc/testing';
import { fileSetUrl } from '../../src/static-index/files';
import type { IdSpace, RecordLayout } from '../../src/static-index/manifest';
import { RangeFiles } from '../../src/static-index/range-files';
import {
  StaticRecords,
  decodeRecord,
  span,
} from '../../src/static-index/records';
import {
  concat,
  deflate,
  directory,
  rangeResponse,
} from '../etd/engine/fixture-index';

/**
 * A small item that isn't ETD: papers with 0-based ids, a 64-byte record
 * (title, year, and a doi cut to 20 bytes, held whole in doi.dir/doi.bin),
 * and an abstract as the snippet.
 */
const LAYOUT: RecordLayout = {
  file: 'papers.bin',
  bytes: 64,
  fields: [
    { key: 'title', start: 0, end: 40, role: 'title' },
    { key: 'year', start: 40, end: 44, role: 'date' },
    { key: 'doi', start: 44, end: 64, role: 'url' },
  ],
  overflow: [{ field: 'doi', dir: 'doi.dir', bin: 'doi.bin' }],
  snippet: { field: 'abstract', dir: 'abs.dir', bin: 'abs.bin' },
};

interface Paper {
  title: string;
  year: string;
  doi: string;
  abstract?: string;
}

const DATA = 'https://ia800000.us.archive.org/1/items/papers/';
const FILES = { naming: 'versioned', version: 'v1' } as const;

class PaperFiles extends RangeFiles {
  constructor(fetchFn: typeof fetch) {
    super(DATA, fetchFn);
  }

  fileUrl(name: string): string {
    return fileSetUrl(DATA, FILES, name);
  }
}

/**
 * The papers' files, in the formats the reader expects, served by a fake
 * fetch that honors Range headers. `overrides` replaces a file's bytes.
 */
async function buildPapers(
  papers: Paper[],
  overrides: Record<string, Uint8Array | undefined> = {},
) {
  const encoder = new TextEncoder();
  const records = new Uint8Array(papers.length * LAYOUT.bytes);
  papers.forEach((paper, i) => {
    for (const { key, start, end } of LAYOUT.fields) {
      const value = encoder
        .encode(paper[key as keyof Paper] ?? '')
        .slice(0, end - start);
      records.set(value, i * LAYOUT.bytes + start);
    }
  });
  // Only dois the record cuts short go in the overflow pair.
  const [doiDir, doiBin] = directory(
    papers.map(paper =>
      encoder.encode(paper.doi).length > 20
        ? encoder.encode(paper.doi)
        : new Uint8Array(0),
    ),
  );
  const [absDir, absBin] = directory(
    await Promise.all(
      papers.map(paper =>
        paper.abstract
          ? deflate(JSON.stringify({ a: paper.abstract, l: 'en' }))
          : Promise.resolve(new Uint8Array(0)),
      ),
    ),
  );
  const byName = new Map<string, Uint8Array | undefined>(
    Object.entries({
      'papers.bin': records,
      'doi.dir': doiDir,
      'doi.bin': doiBin,
      'abs.dir': absDir,
      'abs.bin': absBin,
      ...overrides,
    }),
  );

  const requests: { file: string; range?: string }[] = [];
  const fakeFetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = String(input);
    const file = url.slice(DATA.length).replace(/\.v1\?.*$/, '');
    const range = new Headers(init?.headers).get('Range') ?? undefined;
    requests.push({ file, range });
    const bytes = byName.get(file);
    if (!bytes) return new Response('', { status: 404 });
    return range
      ? rangeResponse(bytes, range)
      : new Response(new Uint8Array(bytes), { status: 200 });
  }) as typeof fetch;

  const space: Pick<IdSpace, 'count' | 'firstId' | 'records'> = {
    count: papers.length,
    firstId: 0,
    records: LAYOUT,
  };
  const files = new PaperFiles(fakeFetch);
  const reader = await StaticRecords.load(files, space);
  return { reader, files, requests };
}

const PAPERS: Paper[] = [
  {
    title: 'Sea ice drift in the Fram Strait',
    year: '2014',
    doi: '10.1000/fram',
    abstract: 'Drift of <i>sea ice</i> through the Fram&nbsp;Strait.',
  },
  {
    title: 'Hanseatic trade',
    year: '1998',
    // 34 bytes: the record holds the first 20, doi.bin the whole
    doi: '10.1000/hanseatic-trade-1998-ledger',
  },
  {
    title: 'Baroque opera',
    year: '2001',
    doi: '10.1000/opera',
    abstract: 'Opera in Venice.',
  },
];

describe('StaticRecords', () => {
  it('reads each record’s fields by the layout, with its snippet as plain text', async () => {
    const { reader } = await buildPapers(PAPERS);
    const [first] = await reader.read([0]);
    expect(first).to.deep.equal({
      id: 0,
      fields: {
        title: 'Sea ice drift in the Fram Strait',
        year: '2014',
        doi: '10.1000/fram',
      },
      snippet: 'Drift of sea ice through the Fram Strait.',
    });
  });

  it('shows a field the record cut short whole, from its overflow pair', async () => {
    const { reader } = await buildPapers(PAPERS);
    const [hanseatic] = await reader.read([1]);
    expect(hanseatic.fields.doi).to.equal(
      '10.1000/hanseatic-trade-1998-ledger',
    );
    expect(hanseatic.snippet).to.be.undefined;
  });

  it('keeps the asked order, from the first id, and skips ids it doesn’t have', async () => {
    const { reader } = await buildPapers(PAPERS);
    const records = await reader.read([2, 0, 3, -1, 1.5, 1]);
    expect(records.map(r => [r.id, r.fields.title])).to.deep.equal([
      [2, 'Baroque opera'],
      [0, 'Sea ice drift in the Fram Strait'],
      [1, 'Hanseatic trade'],
    ]);
  });

  it('reads a page in two waves: records and directories, then what they point at', async () => {
    const { reader, requests } = await buildPapers(PAPERS);
    const before = requests.length;
    await reader.read([0, 1, 2]);
    expect(requests.slice(before).map(r => r.file)).to.deep.equal([
      'papers.bin',
      'doi.dir',
      'abs.dir',
      'doi.bin',
      'abs.bin',
    ]);
  });

  it('drops a character cut in half by a field’s width', async () => {
    // 'ø' is two bytes; the title field ends after its first.
    const title = `${'a'.repeat(39)}ø`;
    const { reader } = await buildPapers([{ ...PAPERS[0], title }]);
    const [record] = await reader.read([0]);
    expect(record.fields.title).to.equal('a'.repeat(39));
  });

  it('ignores a snippet the directory places past the size its last entry gives', async () => {
    // A whole, readable abstract, but the directory's last entry (the
    // file's size) says the file is 1 byte: the entry is from another build.
    const abstract = await deflate(JSON.stringify({ a: 'Opera in Venice.' }));
    const dir = new BigUint64Array([0n, BigInt(abstract.length), 1n]);
    const { reader } = await buildPapers(PAPERS.slice(1, 3), {
      'abs.dir': new Uint8Array(dir.buffer),
      'abs.bin': abstract,
    });
    const records = await reader.read([0, 1]);
    expect(records.map(r => r.fields.title)).to.deep.equal([
      'Hanseatic trade',
      'Baroque opera',
    ]);
    expect(records.map(r => r.snippet)).to.deep.equal([undefined, undefined]);
  });

  it('ignores a snippet that reads short of its directory entry', async () => {
    const [dir] = directory([new Uint8Array(10)]);
    // The entry and the size say 10 bytes; the file has 4.
    const { reader } = await buildPapers([PAPERS[2]], {
      'abs.dir': dir,
      'abs.bin': new Uint8Array(4),
    });
    const [record] = await reader.read([0]);
    expect(record.fields.title).to.equal('Baroque opera');
    expect(record.snippet).to.be.undefined;
  });

  it('shows records without snippets when the snippet files are missing, and doesn’t look for them again', async () => {
    const { reader, requests } = await buildPapers(PAPERS, {
      'abs.dir': undefined,
      'abs.bin': undefined,
    });
    const before = requests.length;
    const records = await reader.read([0, 2]);
    expect(records.map(r => r.snippet)).to.deep.equal([undefined, undefined]);
    expect(records[1].fields.title).to.equal('Baroque opera');
    expect(
      requests.slice(before).filter(r => r.file.startsWith('abs.')),
    ).to.deep.equal([]);
  });

  it('reads a layout without overflow or snippets as records alone', async () => {
    const { files, requests } = await buildPapers(PAPERS);
    const plain = await StaticRecords.load(files, {
      count: 3,
      firstId: 0,
      records: { ...LAYOUT, overflow: undefined, snippet: undefined },
    });
    const before = requests.length;
    const [hanseatic] = await plain.read([1]);
    expect(hanseatic.fields.doi).to.equal('10.1000/hanseatic-tr');
    expect(requests.slice(before).map(r => r.file)).to.deep.equal([
      'papers.bin',
    ]);
  });
});

describe('decodeRecord', () => {
  it('gives every field empty for a record shorter than the layout', () => {
    expect(decodeRecord(new Uint8Array(10), LAYOUT)).to.deep.equal({
      title: '',
      year: '',
      doi: '',
    });
    expect(decodeRecord(undefined, LAYOUT).title).to.equal('');
  });
});

describe('span', () => {
  it('reads a directory entry’s two little-endian u64 offsets as [offset, length]', () => {
    const entry = new BigUint64Array([5_000_000_000n, 5_000_000_120n]);
    expect(span(new Uint8Array(entry.buffer))).to.deep.equal([
      5_000_000_000, 120,
    ]);
  });

  it('has nothing for an empty entry, or a short read', () => {
    const empty = new BigUint64Array([40n, 40n]);
    expect(span(new Uint8Array(empty.buffer))).to.be.undefined;
    expect(span(new Uint8Array(8))).to.be.undefined;
    expect(span(concat([]))).to.be.undefined;
  });
});
