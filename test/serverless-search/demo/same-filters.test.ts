import { expect } from '@open-wc/testing';
import { FilterConstraint } from '@internetarchive/search-service';
import { sameFilters } from '../../../src/serverless-search/demo/same-filters';

const { INCLUDE, EXCLUDE, GREATER_OR_EQUAL, LESS_OR_EQUAL } = FilterConstraint;

describe('sameFilters', () => {
  it('ignores the empty fields collection-browser sends for every facet', () => {
    expect(
      sameFilters(
        { subject: {}, language: { Portuguese: INCLUDE }, year: {} },
        { language: { Portuguese: INCLUDE } },
      ),
    ).to.be.true;
    expect(sameFilters({ subject: {}, year: {} }, undefined)).to.be.true;
  });

  it('matches a date range whichever order its ends come in', () => {
    expect(
      sameFilters(
        { year: { '2009': LESS_OR_EQUAL, '2000': GREATER_OR_EQUAL } },
        { year: { '2000': GREATER_OR_EQUAL, '2009': LESS_OR_EQUAL } },
      ),
    ).to.be.true;
  });

  it('tells apart a different range, an exclusion, or an extra filter', () => {
    const portuguese = { language: { Portuguese: INCLUDE } };
    expect(sameFilters({ language: { Portuguese: EXCLUDE } }, portuguese)).to.be
      .false;
    expect(
      sameFilters(
        { year: { '2000': GREATER_OR_EQUAL, '2010': LESS_OR_EQUAL } },
        { year: { '2000': GREATER_OR_EQUAL, '2009': LESS_OR_EQUAL } },
      ),
    ).to.be.false;
    expect(
      sameFilters(
        { ...portuguese, year: { '2000': GREATER_OR_EQUAL } },
        portuguese,
      ),
    ).to.be.false;
    expect(sameFilters({}, portuguese)).to.be.false;
  });
});
