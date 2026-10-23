import { expect } from '@open-wc/testing';
import { FilterConstraint } from '@internetarchive/search-service';
import {
  includesAndExcludes,
  yearBounds,
} from '../../src/serverless-search/filter-map';

describe('yearBounds', () => {
  it('reads a date picker range as inclusive bounds', () => {
    expect(
      yearBounds(
        {
          '1995': FilterConstraint.GREATER_OR_EQUAL,
          '2005': FilterConstraint.LESS_OR_EQUAL,
        },
        false,
      ),
    ).to.deep.equal({ min: 1995, max: 2005 });
  });

  it('keeps an open-ended range open', () => {
    expect(
      yearBounds({ '2015': FilterConstraint.GREATER_OR_EQUAL }, false),
    ).to.deep.equal({ min: 2015 });
  });

  it('makes exclusive year bounds inclusive', () => {
    expect(
      yearBounds(
        {
          '1995': FilterConstraint.GREATER_THAN,
          '2005': FilterConstraint.LESS_THAN,
        },
        false,
      ),
    ).to.deep.equal({ min: 1996, max: 2004 });
  });

  it('widens a month-precision date range to the years it touches', () => {
    expect(
      yearBounds(
        {
          '1995-06': FilterConstraint.GREATER_THAN,
          '2005-02': FilterConstraint.LESS_THAN,
        },
        true,
      ),
    ).to.deep.equal({ min: 1995, max: 2005 });
  });

  it('reads a single selected year as a one-year range', () => {
    expect(
      yearBounds({ '2001': FilterConstraint.INCLUDE }, false),
    ).to.deep.equal({ min: 2001, max: 2001 });
  });

  it('is undefined when nothing in the filter is a year', () => {
    expect(yearBounds({ soon: FilterConstraint.GREATER_OR_EQUAL }, false)).to.be
      .undefined;
  });
});

describe('includesAndExcludes', () => {
  it('splits selected and hidden facet values', () => {
    expect(
      includesAndExcludes({
        eng: FilterConstraint.INCLUDE,
        ger: FilterConstraint.INCLUDE,
        fre: FilterConstraint.EXCLUDE,
      }),
    ).to.deep.equal({ include: ['eng', 'ger'], exclude: ['fre'] });
  });
});
