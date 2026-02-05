import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { MoreFacetsContent } from '../../src/collection-facets/more-facets-content';
import '../../src/collection-facets/more-facets-content';
import { MockSearchService } from '../mocks/mock-search-service';
import { MockAnalyticsHandler } from '../mocks/mock-analytics-handler';
import type { FacetsTemplate } from '../../src/collection-facets/facets-template';
import type { SelectedFacets } from '../../src/models';
import { Aggregation, type Bucket } from '@internetarchive/search-service';

const selectedFacetsGroup = {
  title: 'Media Type',
  key: 'mediatype',
  buckets: [
    { displayText: 'audio', key: 'audio', count: 1001, state: 'none' },
    { displayText: 'movies', key: 'movies', count: 901, state: 'none' },
    { displayText: 'texts', key: 'texts', count: 2101, state: 'none' },
    { displayText: 'data', key: 'data', count: 230, state: 'none' },
    { displayText: 'web', key: 'web', count: 453, state: 'none' },
  ],
};

const yearSelectedFacets: SelectedFacets = {
  mediatype: {},
  lending: {},
  year: {
    '2000': { key: '2000', count: 5, state: 'selected' },
  },
  subject: {},
  collection: {},
  creator: {},
  language: {},
};

describe('More facets content', () => {
  it('should render more facets template', async () => {
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content></more-facets-content>`,
    );

    el.facetsLoading = false;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-content')).to.exist;
  });

  it('should render more facets loader template', async () => {
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content></more-facets-content>`,
    );

    el.facetsLoading = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-loader')).to.exist;
  });

  it('should NOT render pagination when facet count < 1000', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`,
    );

    el.facetKey = 'year';
    el.query = 'more-facets'; // Produces a response with 45 aggregations (< 1000)
    await el.updateComplete;
    await aTimeout(50); // Give it a moment to perform the (mock) search query after the initial update

    // Verify pagination component is NOT present (horizontal scroll mode)
    expect(el.shadowRoot?.querySelector('more-facets-pagination')).to.not.exist;

    // Verify horizontal scroll mode CSS class is applied
    expect(
      el.shadowRoot?.querySelector('.facets-content.horizontal-scroll-mode'),
    ).to.exist;

    // Verify footer still exists with buttons
    expect(el.shadowRoot?.querySelector('.footer')).to.exist;
    expect(el.shadowRoot?.querySelector('.btn-cancel')).to.exist;
    expect(el.shadowRoot?.querySelector('.btn-submit')).to.exist;
  });

  it('query for more facets content using search service', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`,
    );

    el.facetKey = 'collection';
    el.query = 'collection-aggregations';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal(
      'collection-aggregations',
    );
  });

  it('queries for more facets using search service within a collection (no query)', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .pageSpecifierParams=${{
          pageType: 'collection_details',
          pageTarget: 'foobar',
        }}
      ></more-facets-content>`,
    );

    el.facetKey = 'subject';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.be.empty;
    expect(searchService.searchParams?.pageTarget).to.equal('foobar');
  });

  it('queries for more facets using search service within a collection (with query)', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .pageSpecifierParams=${{
          pageType: 'collection_details',
          pageTarget: 'foobar',
        }}
      ></more-facets-content>`,
    );

    el.facetKey = 'subject';
    el.query = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
    expect(searchService.searchParams?.pageTarget).to.equal('foobar');
  });

  it('filter raw selectedFacets object', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .selectedFacets=${selectedFacetsGroup}
      ></more-facets-content>`,
    );

    el.facetKey = 'collection';
    el.query = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
  });

  it('combines selectedFacets and aggregationFacets and renders on modal', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .facetKey=${'year'}
        .query=${'more-facets'}
        .searchService=${searchService}
        .selectedFacets=${yearSelectedFacets}
      ></more-facets-content>`,
    );

    const facetsTemplate = el.shadowRoot?.querySelector(
      'facets-template',
    ) as FacetsTemplate;
    expect(facetsTemplate).to.exist;

    const { facetGroup } = facetsTemplate;
    expect(facetGroup?.key).to.equal('year');
    expect(facetGroup?.title).to.equal('Year');

    // First bucket is the one that was included in the selected facets
    const firstBucket = facetGroup?.buckets[0];
    expect(firstBucket?.key).to.equal('2000');
    expect(firstBucket?.count).to.equal(5);

    // Second bucket is the most recent year, since year facets default to descending order of year
    const secondBucket = facetGroup?.buckets[1];
    expect(secondBucket?.key).to.equal('2024');
    expect(secondBucket?.count).to.equal(5);
  });

  it('cancel button clicked event', async () => {
    const searchService = new MockSearchService();
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .facetKey=${'collection'}
        .query=${'collection-aggregations'}
        .searchService=${searchService}
        .analyticsHandler=${mockAnalyticsHandler}
      ></more-facets-content>`,
    );

    // select cancel button
    const cancelButton = el.shadowRoot?.querySelector(
      '.footer > .btn-cancel',
    ) as HTMLButtonElement;
    expect(cancelButton).to.exist;
    cancelButton?.click();

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('closeMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('collection');
  });

  it('facet apply button clicked event', async () => {
    const searchService = new MockSearchService();
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .facetKey=${'collection'}
        .query=${'collection-aggregations'}
        .searchService=${searchService}
        .analyticsHandler=${mockAnalyticsHandler}
      ></more-facets-content>`,
    );

    // select submit button
    const submitButton = el.shadowRoot?.querySelector(
      '.footer > .btn-submit',
    ) as HTMLButtonElement;
    expect(submitButton).to.exist;
    submitButton?.click();

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('applyMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('collection');
  });

  it('should have horizontal scrolling enabled', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`,
    );

    el.facetKey = 'year';
    el.query = 'more-facets';
    await el.updateComplete;
    await aTimeout(50);

    const facetsContent = el.shadowRoot?.querySelector(
      '.facets-content',
    ) as HTMLElement;
    const styles = window.getComputedStyle(facetsContent);

    expect(styles.overflowX).to.equal('auto');
    expect(styles.overflowY).to.equal('hidden');
  });

  it('should have horizontal container wrapper', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`,
    );

    el.facetKey = 'year';
    el.query = 'more-facets';
    await el.updateComplete;
    await aTimeout(50);

    const container = el.shadowRoot?.querySelector(
      '.facets-horizontal-container',
    );
    expect(container).to.exist;

    const facetsTemplate = container?.querySelector('facets-template');
    expect(facetsTemplate).to.exist;
  });

  it('should render pagination when facet count >= 1000', async () => {
    // Manually create aggregations with 1000+ facets
    const buckets: Bucket[] = [];
    for (let i = 0; i < 1000; i++) {
      buckets.push({ key: `value-${i}`, doc_count: i + 1 });
    }

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .facetKey=${'subject'}
        .selectedFacets=${{
          mediatype: {},
          lending: {},
          year: {},
          subject: {},
          collection: {},
          creator: {},
          language: {},
        }}
      ></more-facets-content>`,
    );

    // @ts-expect-error - accessing private property for testing
    el.aggregations = {
      subject: new Aggregation({ buckets }),
    };
    el.facetsLoading = false;
    await el.updateComplete;

    // Verify pagination component IS present
    expect(el.shadowRoot?.querySelector('more-facets-pagination')).to.exist;

    // Verify pagination mode CSS class is applied
    expect(el.shadowRoot?.querySelector('.facets-content.pagination-mode')).to
      .exist;

    // Verify horizontal container wrapper does NOT exist in pagination mode
    expect(el.shadowRoot?.querySelector('.facets-horizontal-container')).to.not
      .exist;
  });
});
