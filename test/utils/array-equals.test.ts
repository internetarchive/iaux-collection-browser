import { describe, it, expect } from 'vitest';
import { arrayEquals } from '../../src/utils/array-equals';

describe('arrayEquals', () => {
  it('returns true for empty args', () => {
    expect(arrayEquals([], [])).to.be.true;
  });

  it('returns true for identical array objects', () => {
    const arr = ['foo', 'bar'];
    expect(arrayEquals(arr, arr)).to.be.true;
  });

  it('returns true for arrays with identical contents', () => {
    const arr1 = ['foo', 'bar'];
    const arr2 = ['foo', 'bar'];
    expect(arrayEquals(arr1, arr2)).to.be.true;
  });

  it('returns false for arrays of unequal length', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3, 4];
    expect(arrayEquals(arr1, arr2)).to.be.false;
  });

  it('returns false for unequal arrays of same length', () => {
    const arr1 = ['foo', 'bar'];
    const arr2 = ['foo', 'qux'];
    expect(arrayEquals(arr1, arr2)).to.be.false;
  });
});
