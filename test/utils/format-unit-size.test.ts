import { expect } from '@open-wc/testing';
import { nothing } from 'lit';
import { formatUnitSize } from '../../src/utils/format-unit-size';

describe('formatUnitSize', () => {
  it('returns blank when undefined number', () => {
    expect(formatUnitSize(undefined, 1_0)).to.equal(nothing);
  });

  it('23 returns blank when undefined number', () => {
    expect(formatUnitSize(1025, 1_0)).to.equal('1 kilobytes');
  });

  it('return collection size data in kilobytes', () => {
    expect(formatUnitSize(15000, 1_0)).to.equal('14.6 kilobytes');
  });

  it('return huge collection size data', () => {
    expect(formatUnitSize(454154654134, 1_0)).to.equal('423 gigabytes');
  });
});
