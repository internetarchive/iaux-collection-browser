import { expect } from '@open-wc/testing';
import {
  MEANING_WORDS_MAP,
  etdItemId,
  textSizeRules,
  vectorSizeRules,
} from '../../../src/etd/engine/file-checks';
import type { EtdIndexMeta } from '../../../src/etd/engine/index-files';
import type { IvfMeta } from '../../../src/etd/engine/vector/vector-files';
import { ItemFileList } from '../../../src/static-index/file-list';
import { checkSizes } from '../../../src/static-index/size-rules';

/**
 * The etd-search item as published on 2026-10-29: current.json,
 * ivf-meta.json, and the sizes in archive.org's file list.
 */
const CURRENT: EtdIndexMeta = {
  v: '20261026-5e5902',
  n_docs: 25860159,
  stub_bytes: 320,
};
const IVF: IvfMeta = {
  n: 18176413,
  ncell: 16384,
  dim: 384,
  rowbytes: 772,
  docbytes: 308,
  fields: { title: 160, host: 30, date: 10, landing: 100, lang: 8 },
  vsnip: true,
  codes: true,
  code_bits: 4,
  built: '2026-10-12 11:31',
};
const SIZES: Record<string, number> = {
  'stubs.bin.20261026-5e5902': 8275250880,
  'stubs.bin.20261022-e83dcd': 8270303040,
  'centroids.f16': 12582912,
  'cell.dir': 65540,
  'cells.bin': 14032190836,
  'docs.bin': 5598335204,
  'cell-facets.bin': 145411304,
  'cell-codes.bin': 3562576948,
  'vsnip.dir': 145411312,
  'vrow2txt.bin': 72705652,
  // One entry per doc of the previous text build (20261022-e83dcd).
  'txt2vrow.bin': 103378788,
};
const LIST = new ItemFileList(
  'etd-search',
  Object.entries(SIZES).map(([name, size]) => ({ name, size, mtime: 1 })),
);

describe('ETD file checks', () => {
  it('finds the current word index’s records file whole', () => {
    const report = checkSizes(textSizeRules(CURRENT), LIST);
    expect(report.checks.map(c => [c.rule.file, c.status])).to.deep.equal([
      ['stubs.bin.20261026-5e5902', 'ok'],
    ]);
  });

  it('passes every vector store file, and catches the map left from the older text build', () => {
    const report = checkSizes(vectorSizeRules(IVF, CURRENT.n_docs), LIST);
    const status = Object.fromEntries(
      report.checks.map(c => [c.rule.file, c.status]),
    );
    expect(status).to.deep.equal({
      'centroids.f16': 'ok',
      'cell.dir': 'ok',
      'cells.bin': 'ok',
      'docs.bin': 'ok',
      'cell-facets.bin': 'ok',
      'cell-codes.bin': 'ok',
      'vsnip.dir': 'ok',
      'vrow2txt.bin': 'ok',
      'txt2vrow.bin': 'mismatch',
    });
    // Only the map fails, so search by meaning stays on.
    expect(report.failedLayers).to.deep.equal([MEANING_WORDS_MAP]);
    // It fits the previous build's docs exactly: 20261022-e83dcd's stubs.bin.
    const map = report.checks.find(c => c.rule.file === 'txt2vrow.bin');
    expect(map?.fitsRows).to.equal(SIZES['stubs.bin.20261022-e83dcd'] / 320);
  });

  it('leaves the map unchecked when the text doc count is unknown', () => {
    const files = vectorSizeRules(IVF).map(rule => rule.file);
    expect(files).not.to.include('txt2vrow.bin');
    expect(files).to.include('vrow2txt.bin');
  });

  it('skips the files a store says it lacks', () => {
    const files = vectorSizeRules({ ...IVF, codes: false, vsnip: false }).map(
      rule => rule.file,
    );
    expect(files).not.to.include('cell-codes.bin');
    expect(files).not.to.include('vsnip.dir');
  });

  it('knows the item behind the demo’s proxy paths', () => {
    expect(etdItemId('https://archive.org/download/etd-search/')).to.equal(
      'etd-search',
    );
    expect(etdItemId('/etd-index/')).to.equal('etd-search');
    expect(etdItemId('http://localhost:8085/etd-index/')).to.equal(
      'etd-search',
    );
    expect(etdItemId('/item-index/other-theses/')).to.equal('other-theses');
    expect(etdItemId('https://example.org/index/')).to.be.undefined;
  });
});
