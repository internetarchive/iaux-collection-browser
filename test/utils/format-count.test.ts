import { describe, it, expect } from 'vitest';
import { formatCount } from '../../src/utils/format-count';

const testCount = 805342;

describe('formatCount', () => {
  it('returns blank when undefined number', () => {
    expect(formatCount(undefined)).to.equal('');
  });

  it('returns blank when negative number', () => {
    expect(formatCount(testCount * -1)).to.equal('');
  });

  it('returns long number when no NumberFormat', () => {
    expect(formatCount(testCount)).to.equal('805,342');
  });

  it('returns short number when short NumberFormat', () => {
    expect(formatCount(testCount, 'short')).to.equal('805K');
  });

  it('returns decimal when value of significant digits < 10', () => {
    expect(formatCount(testCount * 10, 'short', 'long')).to.equal(
      '8.1 million',
    );
  });

  it('returns locale formatted number', () => {
    expect(formatCount(testCount, 'long', 'long', 'de-DE')).to.equal('805.342');
  });
});
