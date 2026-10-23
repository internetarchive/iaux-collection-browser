import { expect } from '@open-wc/testing';
import { FilterConstraint } from '@internetarchive/search-service';
import {
  etdRequestFromParams,
  etdRequestIsEmpty,
  etdRequestKey,
} from '../../src/etd/etd-query';

describe('etdRequestFromParams', () => {
  it('passes the query text through in the engine syntax, trimmed', () => {
    const request = etdRequestFromParams({
      query: '  "climate change" year:[2000 TO 2010] ',
    });
    expect(request.text).to.equal('"climate change" year:[2000 TO 2010]');
    expect(request.filters).to.deep.equal({});
  });

  it('turns a date picker year range into inclusive year bounds', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: {
        year: {
          '1995': FilterConstraint.GREATER_OR_EQUAL,
          '2005': FilterConstraint.LESS_OR_EQUAL,
        },
      },
    });
    expect(request.filters.year).to.deep.equal({ min: 1995, max: 2005 });
  });

  it('keeps an open-ended year range open', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: { year: { '2015': FilterConstraint.GREATER_OR_EQUAL } },
    });
    expect(request.filters.year).to.deep.equal({ min: 2015 });
  });

  it('makes exclusive year bounds inclusive', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: {
        year: {
          '1995': FilterConstraint.GREATER_THAN,
          '2005': FilterConstraint.LESS_THAN,
        },
      },
    });
    expect(request.filters.year).to.deep.equal({ min: 1996, max: 2004 });
  });

  it('widens a month-precision date range to whole years', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: {
        date: {
          '1995-06': FilterConstraint.GREATER_OR_EQUAL,
          '2005-02': FilterConstraint.LESS_OR_EQUAL,
        },
      },
    });
    expect(request.filters.year).to.deep.equal({ min: 1995, max: 2005 });
  });

  it('maps selected and hidden language facets to include and exclude', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: {
        language: {
          eng: FilterConstraint.INCLUDE,
          ger: FilterConstraint.INCLUDE,
          fre: FilterConstraint.EXCLUDE,
        },
      },
    });
    expect(request.filters.includeLanguages).to.deep.equal(['eng', 'ger']);
    expect(request.filters.excludeLanguages).to.deep.equal(['fre']);
  });

  it('reports filters the engine cannot apply instead of failing', () => {
    const request = etdRequestFromParams({
      query: 'climate',
      filters: {
        subject: { physics: FilterConstraint.INCLUDE },
        firstTitle: { C: FilterConstraint.INCLUDE },
        language: { eng: FilterConstraint.INCLUDE },
      },
    });
    expect(request.ignoredFields).to.deep.equal(['subject', 'firstTitle']);
    expect(request.filters.includeLanguages).to.deep.equal(['eng']);
  });
});

describe('etdRequestKey', () => {
  it('is the same for the hits and aggregations requests of one search', () => {
    const filters = {
      year: { '2000': FilterConstraint.GREATER_OR_EQUAL },
      language: {
        eng: FilterConstraint.INCLUDE,
        fre: FilterConstraint.INCLUDE,
      },
    };
    const hits = etdRequestFromParams({
      query: 'climate',
      filters,
      page: 3,
      rows: 50,
      aggregations: { omit: true },
    });
    const aggs = etdRequestFromParams({
      query: 'climate ',
      filters: {
        language: {
          fre: FilterConstraint.INCLUDE,
          eng: FilterConstraint.INCLUDE,
        },
        year: { '2000': FilterConstraint.GREATER_OR_EQUAL },
      },
      rows: 0,
    });
    expect(etdRequestKey(hits)).to.equal(etdRequestKey(aggs));
  });

  it('differs when a filter changes', () => {
    const before = etdRequestFromParams({ query: 'climate' });
    const after = etdRequestFromParams({
      query: 'climate',
      filters: { language: { eng: FilterConstraint.INCLUDE } },
    });
    expect(etdRequestKey(before)).not.to.equal(etdRequestKey(after));
  });
});

describe('etdRequestIsEmpty', () => {
  it('is empty with no text and no filters', () => {
    expect(etdRequestIsEmpty(etdRequestFromParams({ query: '   ' }))).to.be
      .true;
  });

  it('is empty when only unsupported filters are set', () => {
    const request = etdRequestFromParams({
      filters: { subject: { physics: FilterConstraint.INCLUDE } },
    });
    expect(etdRequestIsEmpty(request)).to.be.true;
  });

  it('is not empty for a filter-only search', () => {
    const request = etdRequestFromParams({
      filters: { year: { '2020': FilterConstraint.GREATER_OR_EQUAL } },
    });
    expect(etdRequestIsEmpty(request)).to.be.false;
  });
});
