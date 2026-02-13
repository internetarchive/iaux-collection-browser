import { describe, it, expect } from 'vitest';
import { nothing } from 'lit';
import { formatUnitSize } from '../../src/utils/format-unit-size';

describe('formatUnitSize', () => {
  it('returns blank when undefined number', () => {
    expect(formatUnitSize(undefined, 1)).to.equal(nothing);
  });

  it('returns collection data is in singular form', () => {
    expect(formatUnitSize(1025, 1)).to.equal('1 kilobyte');
  });

  it('return collection size data in kilobytes and plural form', () => {
    expect(formatUnitSize(15000, 1)).to.equal('14.6 kilobytes');
  });

  it('return huge collection size data', () => {
    expect(formatUnitSize(454154654134, 1)).to.equal('423 gigabytes');
  });
});
