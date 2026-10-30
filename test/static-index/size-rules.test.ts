import { expect } from '@open-wc/testing';
import { ItemFileList } from '../../src/static-index/file-list';
import {
  checkSizes,
  describeMismatch,
} from '../../src/static-index/size-rules';
import type { SizeRule } from '../../src/static-index/size-rules';

const list = (sizes: Record<string, number>) =>
  new ItemFileList(
    'item',
    Object.entries(sizes).map(([name, size]) => ({ name, size, mtime: 1 })),
  );

const RECORDS: SizeRule = {
  file: 'records.bin',
  layer: 'records',
  rows: 1000,
  rowsOf: 'records',
  rowBytes: 64,
};
const OFFSETS: SizeRule = {
  file: 'offsets.dir',
  layer: 'snippets',
  rows: 1000,
  rowsOf: 'records',
  rowBytes: 8,
  extraBytes: 8,
};

describe('checkSizes', () => {
  it('passes files whose size is rows × row bytes, plus any extra', () => {
    const report = checkSizes(
      [RECORDS, OFFSETS],
      list({ 'records.bin': 64000, 'offsets.dir': 8008 }),
    );
    expect(report.checks.map(c => c.status)).to.deep.equal(['ok', 'ok']);
    expect(report.failedLayers).to.deep.equal([]);
  });

  it('fails the layer of a file built for a different row count, and says which', () => {
    // records.bin from a build with 1,200 records, offsets from this one.
    const report = checkSizes(
      [RECORDS, OFFSETS],
      list({ 'records.bin': 76800, 'offsets.dir': 8008 }),
    );
    const [records] = report.checks;
    expect(records.status).to.equal('mismatch');
    expect(records.fitsRows).to.equal(1200);
    expect(report.failedLayers).to.deep.equal(['records']);
    expect(describeMismatch(records)).to.equal(
      'records.bin is 76,800 bytes, which fits 1,200 records; the manifest says 1,000 records',
    );
  });

  it("says when a size isn't whole rows at all", () => {
    const [check] = checkSizes(
      [RECORDS],
      list({ 'records.bin': 64001 }),
    ).checks;
    expect(check.fitsRows).to.be.undefined;
    expect(describeMismatch(check)).to.contain(
      "which isn't a whole number of rows",
    );
  });

  it("doesn't fail a layer for a file the list doesn't have", () => {
    const report = checkSizes([RECORDS], list({}));
    expect(report.checks[0].status).to.equal('unlisted');
    expect(report.failedLayers).to.deep.equal([]);
  });
});
