import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { MoreFacetsContent } from '../../src/collection-facets/more-facets-content';
import '../../src/collection-facets/more-facets-content';
import type { MoreFacetsScroller } from '../../src/collection-facets/more-facets-scroller';
import { MockSearchService } from '../mocks/mock-search-service';
import { MockAnalyticsHandler } from '../mocks/mock-analytics-handler';
import {
  getDefaultSelectedFacets,
  type SelectedFacets,
} from '../../src/models';

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

/** Renders the dialog for a facet key & mock query, and waits for its values */
async function createDialog(
  facetKey: string,
  query: string,
  analyticsHandler?: MockAnalyticsHandler,
): Promise<MoreFacetsContent> {
  const el = await fixture<MoreFacetsContent>(
    html`<more-facets-content
      style="display: block; width: 900px"
      .facetKey=${facetKey}
      .query=${query}
      .searchService=${new MockSearchService()}
      .selectedFacets=${getDefaultSelectedFacets()}
      .analyticsHandler=${analyticsHandler}
    ></more-facets-content>`,
  );
  await waitUntil(() => scrollerIn(el)?.buckets.length, 'values never loaded');
  const scroller = scrollerIn(el) as MoreFacetsScroller;
  await waitUntil(
    () => scroller.shadowRoot?.querySelector('.page'),
    'pages never rendered',
  );
  return el;
}

function scrollerIn(el: MoreFacetsContent): MoreFacetsScroller | undefined {
  return el.shadowRoot?.querySelector('more-facets-scroller') ?? undefined;
}

/** Types into the dialog's filter field */
async function typeFilter(el: MoreFacetsContent, text: string) {
  const input = el.shadowRoot?.querySelector('ia-clearable-text-input') as
    | (HTMLElement & { value: string })
    | null;
  if (!input) throw new Error('no filter field');
  input.value = text;
  input.dispatchEvent(new Event('input'));
  await el.updateComplete;
  await scrollerIn(el)?.updateComplete;
}

function bucketKeys(el: MoreFacetsContent): string[] {
  return scrollerIn(el)?.buckets.map(b => b.key) ?? [];
}

describe('More facets content', () => {
  afterEach(() => {
    sinon.restore();
  });

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

  it('renders every value in a single scroller, with no pagination', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .selectedFacets=${getDefaultSelectedFacets()}
      ></more-facets-content>`,
    );

    el.facetKey = 'year';
    el.query = 'more-facets'; // Produces a response with 40+ aggregations
    await el.updateComplete;
    await aTimeout(50); // Give it a moment to perform the (mock) search query after the initial update

    expect(scrollerIn(el)?.buckets).to.have.length(45);
    expect(el.shadowRoot?.querySelector('more-facets-pagination')).not.to.exist;
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

    const scroller = scrollerIn(el);
    expect(scroller).to.exist;
    expect(scroller?.facetType).to.equal('year');
    expect(
      el.shadowRoot?.querySelector('.title')?.textContent?.trim(),
    ).to.equal('Year');

    // First bucket is the one that was included in the selected facets
    const firstBucket = scroller?.buckets[0];
    expect(firstBucket?.key).to.equal('2000');
    expect(firstBucket?.count).to.equal(5);

    // Second bucket is the most recent year, since year facets default to descending order of year
    const secondBucket = scroller?.buckets[1];
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

  it('keeps the DOM small when there are thousands of values', async () => {
    const el = await createDialog('subject', 'large-facets');
    const scroller = scrollerIn(el) as MoreFacetsScroller;
    const rows = scroller.shadowRoot?.querySelectorAll('.facet-row-container');

    expect(scroller.buckets).to.have.length(5003);
    expect(scroller.pageCount).to.be.greaterThan(100);
    expect(rows?.length).to.be.at.most(4 * 3 * 12);
  });

  it('uses the plural facet title in the filter placeholder', async () => {
    const el = await createDialog('year', 'more-facets');
    const input = el.shadowRoot?.querySelector('ia-clearable-text-input') as
      | (HTMLElement & { placeholder: string })
      | null;

    expect(input?.placeholder).to.equal('Search Years…');
  });

  it('filters values by the text in the filter field, ignoring case', async () => {
    const el = await createDialog('subject', 'large-facets');

    await typeFilter(el, 'SUBJECT-499');

    expect(bucketKeys(el)).to.deep.equal([
      'subject-499',
      'subject-4990',
      'subject-4991',
      'subject-4992',
      'subject-4993',
      'subject-4994',
      'subject-4995',
      'subject-4996',
      'subject-4997',
      'subject-4998',
      'subject-4999',
    ]);
  });

  it('ignores punctuation and accents when filtering', async () => {
    const el = await createDialog('subject', 'large-facets');

    await typeFilter(el, 'aor');
    expect(bucketKeys(el)).to.deep.equal(['A.O.R.']);

    await typeFilter(el, 'dr drew');
    expect(bucketKeys(el)).to.deep.equal(['Dr. Drew']);

    await typeFilter(el, 'cafe');
    expect(bucketKeys(el)).to.deep.equal(['Café society']);
  });

  it('shows a message when no values match the filter, and hides it once cleared', async () => {
    const el = await createDialog('subject', 'large-facets');

    await typeFilter(el, 'xxxxxxx');
    expect(el.shadowRoot?.querySelector('.no-matches')).to.exist;
    expect(bucketKeys(el)).to.be.empty;

    await typeFilter(el, '');
    expect(el.shadowRoot?.querySelector('.no-matches')).not.to.exist;
    expect(bucketKeys(el)).to.have.length(5003);
  });

  it('returns to the first page when the filter changes', async () => {
    const el = await createDialog('subject', 'large-facets');
    const scroller = scrollerIn(el) as MoreFacetsScroller;
    scroller.scrollToPage(20);
    await waitUntil(() => scroller.currentPage === 20, 'never scrolled');

    await typeFilter(el, 'subject-1');
    await waitUntil(() => scroller.currentPage === 0, 'did not reset');

    await typeFilter(el, '');
    await waitUntil(() => scroller.currentPage === 0, 'did not reset');
  });

  it('keeps unapplied selections while filtering', async () => {
    const el = await createDialog('subject', 'large-facets');
    const scroller = scrollerIn(el) as MoreFacetsScroller;
    const firstCheckbox = scroller.shadowRoot?.querySelector(
      '.select-facet-checkbox',
    ) as HTMLInputElement;
    expect(firstCheckbox.value).to.equal('subject-0');

    firstCheckbox.click();
    await el.updateComplete;
    await typeFilter(el, 'drew');
    await typeFilter(el, '');

    const bucket = scroller.buckets.find(b => b.key === 'subject-0');
    expect(bucket?.state).to.equal('selected');
  });

  it('applies selections made in the scroller', async () => {
    const el = await createDialog('subject', 'large-facets');
    const scroller = scrollerIn(el) as MoreFacetsScroller;
    const changed = sinon.spy();
    el.addEventListener('facetsChanged', changed);

    (
      scroller.shadowRoot?.querySelector(
        '.select-facet-checkbox',
      ) as HTMLInputElement
    ).click();
    await el.updateComplete;
    (el.shadowRoot?.querySelector('.btn-submit') as HTMLButtonElement).click();

    expect(changed.calledOnce).to.be.true;
    const selections = changed.firstCall.args[0].detail as SelectedFacets;
    expect(selections.subject?.['subject-0']?.state).to.equal('selected');
  });

  it('records page changes in analytics', async () => {
    const analyticsHandler = new MockAnalyticsHandler();
    const el = await createDialog('subject', 'large-facets', analyticsHandler);
    const scroller = scrollerIn(el) as MoreFacetsScroller;

    scroller.scrollToPage(3);
    await waitUntil(
      () => analyticsHandler.callAction === 'moreFacetsPageChange',
      'no page change recorded',
    );
    expect(analyticsHandler.callLabel).to.equal('4');
  });

  it('stops listening for Escape once removed', async () => {
    const removeSpy = sinon.spy(document, 'removeEventListener');
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content .modalManager=${{}}></more-facets-content>`,
    );

    el.remove();

    expect(removeSpy.calledWith('keydown')).to.be.true;
  });
});
