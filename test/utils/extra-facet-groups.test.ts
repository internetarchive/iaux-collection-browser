import { expect } from '@open-wc/testing';
import { AggregationSortType } from '@internetarchive/search-service';
import {
  defaultFacetDisplayOrder,
  facetTitles,
  getDefaultSelectedFacets,
} from '../../src/models';
import type { ExtraFacetGroup } from '../../src/models';
import {
  facetGroupInfo,
  validExtraFacetGroups,
  withExtraFacetOrder,
} from '../../src/utils/extra-facet-groups';

// As a thesis index's search service might declare them.
const country: ExtraFacetGroup = {
  key: 'country',
  title: 'Country',
  pluralTitle: 'Countries',
  after: 'language',
};
const degree: ExtraFacetGroup = {
  key: 'degree',
  title: 'Degree level',
  pluralTitle: 'Degree levels',
};

describe('validExtraFacetGroups', () => {
  it('keeps usable groups, in the order given', () => {
    expect(validExtraFacetGroups([country, degree])).to.deep.equal([
      country,
      degree,
    ]);
  });

  it('leaves out keys that could reach the prototype chain or the date picker', () => {
    const unsafe = [
      '__proto__',
      'constructor',
      'prototype',
      'year_histogram',
      'date_histogram',
    ].map(key => ({ ...degree, key }));
    expect(validExtraFacetGroups([...unsafe, country])).to.deep.equal([
      country,
    ]);
  });

  it('leaves out built-in, empty and repeated keys', () => {
    const groups = [
      { ...degree, key: 'language' },
      { ...degree, key: '' },
      country,
      { ...country, title: 'Land' },
    ];
    expect(validExtraFacetGroups(groups)).to.deep.equal([country]);
  });

  it('takes no groups as none', () => {
    expect(validExtraFacetGroups(undefined)).to.deep.equal([]);
  });
});

describe('facetGroupInfo', () => {
  it('describes built-in groups from collection-browser’s own tables', () => {
    expect(facetGroupInfo('year', [country])).to.deep.equal({
      title: facetTitles.year,
      pluralTitle: 'Years',
      sort: AggregationSortType.NUMERIC,
      valueSort: AggregationSortType.NUMERIC,
    });
  });

  it('describes an extra group, sorted by count unless it says otherwise', () => {
    expect(facetGroupInfo('country', [country])).to.deep.equal({
      title: 'Country',
      pluralTitle: 'Countries',
      sort: AggregationSortType.COUNT,
      valueSort: AggregationSortType.ALPHABETICAL,
    });
    const numeric = { ...degree, sort: AggregationSortType.NUMERIC };
    expect(facetGroupInfo('degree', [numeric])?.valueSort).to.equal(
      AggregationSortType.NUMERIC,
    );
  });

  it('knows nothing of a key that is neither built in nor extra', () => {
    expect(facetGroupInfo('country')).to.be.undefined;
    expect(facetGroupInfo('constructor', [country])).to.be.undefined;
  });
});

describe('withExtraFacetOrder', () => {
  it('places a group after the one it names, others at the end', () => {
    expect(
      withExtraFacetOrder(
        ['mediatype', 'language', 'creator'],
        [degree, country],
      ),
    ).to.deep.equal(['mediatype', 'language', 'country', 'creator', 'degree']);
  });

  it('puts a group at the end when the group it follows is not shown', () => {
    expect(withExtraFacetOrder(['mediatype'], [country])).to.deep.equal([
      'mediatype',
      'country',
    ]);
  });

  it('hands back the very same order with no extra groups', () => {
    // The same array, so passing it on doesn't re-render the facets.
    expect(withExtraFacetOrder(defaultFacetDisplayOrder)).to.equal(
      defaultFacetDisplayOrder,
    );
  });
});

describe('getDefaultSelectedFacets', () => {
  it('starts each extra group empty, alongside the built-in ones', () => {
    const selected = getDefaultSelectedFacets([country]);
    expect(selected.country).to.deep.equal({});
    expect(selected.language).to.deep.equal({});
  });

  it('never seeds a reserved key, even when handed one directly', () => {
    // The restoration handler is public: a page could hand it groups that
    // skipped collection-browser's checks.
    const reserved = [
      '__proto__',
      'constructor',
      'prototype',
      'year_histogram',
      'date_histogram',
    ];
    const selected = getDefaultSelectedFacets(
      reserved.map(key => ({ ...country, key })),
    );
    expect(Object.getPrototypeOf(selected)).to.equal(Object.prototype);
    for (const key of reserved) {
      expect(Object.prototype.hasOwnProperty.call(selected, key), key).to.be
        .false;
    }
  });
});
