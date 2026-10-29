import { expect } from '@open-wc/testing';
import {
  Aggregation,
  type SearchParams,
  type SearchResponse,
  type SearchServiceInterface,
} from '@internetarchive/search-service';
import type { Result } from '@internetarchive/result-type';
import {
  observeFacets,
  type ObservedFacets,
} from '../../../src/etd/demo/observe-facets';
import type { ExtraFacetGroup } from '../../../src/models';

/** A search response carrying `aggregations`. */
function response(aggregations?: Record<string, Aggregation>) {
  return {
    success: { response: { aggregations } },
  } as unknown as Result<SearchResponse, never>;
}

const languages = (count: number) => ({
  language: new Aggregation({
    buckets: [{ key: 'English', doc_count: count }],
  }),
});

/** A service whose searches resolve when the test says. */
function controlledService() {
  const calls: { params: SearchParams; resolve: (r: unknown) => void }[] = [];
  const groups: ExtraFacetGroup[] = [
    { key: 'language', title: 'Language', pluralTitle: 'Languages' },
  ];
  const service = {
    extraFacetGroups: groups,
    allowFilterOnlySearch: true,
    search: (params: SearchParams) =>
      new Promise(resolve => calls.push({ params, resolve })),
    itemDetails: async () => response(),
  } as unknown as SearchServiceInterface & {
    extraFacetGroups: ExtraFacetGroup[];
    allowFilterOnlySearch: boolean;
  };
  return { service, calls, groups };
}

describe('observeFacets', () => {
  it('passes searches through and still declares the service’s facets', async () => {
    const { service, calls, groups } = controlledService();
    const observed = observeFacets(service, () => {});
    expect(observed.extraFacetGroups).to.equal(groups);
    expect(observed.allowFilterOnlySearch).to.be.true;

    const hits = observed.search({ query: 'sea ice', rows: 50 });
    calls[0].resolve(response());
    expect(calls[0].params).to.deep.equal({ query: 'sea ice', rows: 50 });
    expect(await hits).to.deep.equal(response());
  });

  it('reports a facets request loading, then what it got', async () => {
    const { service, calls } = controlledService();
    const seen: ObservedFacets[] = [];
    const observed = observeFacets(service, facets => seen.push(facets));

    const facets = observed.search({ query: 'sea ice', rows: 0 });
    expect(seen).to.deep.equal([{ state: 'loading' }]);
    calls[0].resolve(response(languages(51)));
    await facets;
    expect(seen[1]).to.deep.equal({
      state: 'loaded',
      aggregations: languages(51),
    });
  });

  it('ignores hits requests', async () => {
    const { service, calls } = controlledService();
    const seen: ObservedFacets[] = [];
    const observed = observeFacets(service, facets => seen.push(facets));
    const hits = observed.search({ query: 'sea ice', rows: 50 });
    calls[0].resolve(response(languages(51)));
    await hits;
    expect(seen).to.deep.equal([]);
  });

  it('drops a facets response a newer request replaced, as collection-browser does', async () => {
    const { service, calls } = controlledService();
    const seen: ObservedFacets[] = [];
    const observed = observeFacets(service, facets => seen.push(facets));

    const old = observed.search({ query: 'sea', rows: 0 });
    const latest = observed.search({ query: 'sea ice', rows: 0 });
    calls[1].resolve(response(languages(51)));
    await latest;
    calls[0].resolve(response(languages(9000)));
    await old;
    expect(seen.at(-1)).to.deep.equal({
      state: 'loaded',
      aggregations: languages(51),
    });
  });

  it('reports a failed facets request, and still returns its result', async () => {
    const { service, calls } = controlledService();
    const seen: ObservedFacets[] = [];
    const observed = observeFacets(service, facets => seen.push(facets));
    const failed = { error: new Error('no index') } as unknown as Result<
      SearchResponse,
      never
    >;
    const facets = observed.search({ query: 'sea ice', rows: 0 });
    calls[0].resolve(failed);
    expect(await facets).to.equal(failed);
    expect(seen.at(-1)).to.deep.equal({ state: 'failed' });
  });
});
