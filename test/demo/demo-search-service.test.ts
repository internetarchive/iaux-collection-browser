import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import {
  FilterConstraint,
  SearchType,
  type SearchParams,
} from '@internetarchive/search-service';
import type { CollectionBrowser } from '../../src/collection-browser';
import '../../src/collection-browser';
import type { CollectionFacets } from '../../src/collection-facets';
import type { ExtraFacetGroup } from '../../src/models';
import {
  DEMO_ITEMS,
  DemoSearchService,
} from '../../src/demo/demo-search-service';

const { INCLUDE, EXCLUDE, GREATER_OR_EQUAL, LESS_OR_EQUAL } = FilterConstraint;

async function search(params: Partial<SearchParams> = {}) {
  const result = await new DemoSearchService().search({
    query: '',
    ...params,
  } as SearchParams);
  return result.success!.response;
}

function titles(response: Awaited<ReturnType<typeof search>>): string[] {
  return response.results.map(hit => hit.title?.value ?? '');
}

/** An aggregation's buckets as `{ key: count }`. */
function counts(
  response: Awaited<ReturnType<typeof search>>,
  field: string,
): Record<string, number> {
  return Object.fromEntries(
    (
      response.aggregations?.[field]?.buckets as {
        key: string;
        doc_count: number;
      }[]
    ).map(b => [b.key, b.doc_count]),
  );
}

describe('DemoSearchService', () => {
  it('lists every item for no query and no filters', async () => {
    const response = await search();
    expect(response.totalResults).to.equal(DEMO_ITEMS.length);
  });

  it('matches every word of the query in the title', async () => {
    const response = await search({ query: 'Harbour  SONGS' });
    expect(titles(response)).to.deep.equal(['Harbour songs']);
  });

  it('filters by country, a field with no built-in facet group', async () => {
    const response = await search({
      filters: { country: { Canada: INCLUDE } },
    });
    expect(response.totalResults).to.equal(4);
    // Facet counts are over the matches, so the other filters narrow too.
    expect(counts(response, 'country')).to.deep.equal({ Canada: 4 });
    expect(counts(response, 'language')).to.deep.equal({
      English: 3,
      French: 1,
    });
  });

  it('takes any of several included values, and none of an excluded one', async () => {
    const response = await search({
      filters: {
        country: { Canada: INCLUDE, Kenya: INCLUDE },
        mediatype: { audio: EXCLUDE },
      },
    });
    expect(response.totalResults).to.equal(4);
    expect(counts(response, 'country')).to.deep.equal({ Canada: 3, Kenya: 1 });
  });

  it('filters by a year range, as the date picker sends it', async () => {
    const response = await search({
      filters: { year: { '2010': GREATER_OR_EQUAL, '2015': LESS_OR_EQUAL } },
    });
    expect(titles(response)).to.have.members([
      'Prairie weather notes',
      'City trams of the south',
      'Market day radio',
    ]);
  });

  it('filters by a title’s first letter', async () => {
    const response = await search({ filters: { firstTitle: { V: INCLUDE } } });
    expect(titles(response)).to.deep.equal(['Vienna street sounds']);
  });

  it('pages through the matches', async () => {
    const response = await search({ rows: 5, page: 3 });
    expect(response.totalResults).to.equal(12);
    expect(response.results.map(hit => hit.identifier)).to.deep.equal([
      'demo-item-11',
      'demo-item-12',
    ]);
  });

  it('keeps the year histogram’s range as filters narrow its counts', async () => {
    const response = await search({
      filters: { country: { Kenya: INCLUDE } },
    });
    const histogram = response.aggregations!.year_histogram;
    expect(histogram.first_bucket_key).to.equal(1995);
    expect(histogram.last_bucket_key).to.equal(2019);
    const buckets = histogram.buckets as number[];
    expect(buckets.reduce((sum, n) => sum + n, 0)).to.equal(2);
    expect(buckets[2002 - 1995]).to.equal(1);
  });
});

describe('the demo, on demo data', () => {
  const country: ExtraFacetGroup = {
    key: 'country',
    title: 'Country',
    pluralTitle: 'Countries',
    after: 'language',
  };

  afterEach(() => {
    window.history.replaceState({}, '', window.location.pathname);
  });

  it('lists a country’s items from the URL alone, with its group in the sidebar', async () => {
    const url = new URL(window.location.href);
    url.search = '';
    url.searchParams.append('and[]', 'country:"Brazil"');
    window.history.replaceState({}, '', url);

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${new DemoSearchService()}
        .searchType=${SearchType.METADATA}
        .extraFacetGroups=${[country]}
        allowFilterOnlySearch
      ></collection-browser>`,
    );
    await waitUntil(
      () => el.dataSource.totalResults === 3,
      'never listed the 3 items from Brazil',
    );

    const facets = el.shadowRoot?.querySelector(
      'collection-facets',
    ) as CollectionFacets;
    await waitUntil(
      () => facets?.shadowRoot?.textContent?.includes('Country'),
      'the Country group never showed',
    );
  });
});
