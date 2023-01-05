/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import { Aggregation } from '@internetarchive/search-service';
import {
  ModalManager,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import type { CollectionFacets } from '../src/collection-facets';
import '@internetarchive/modal-manager';
import '../src/collection-facets';
import type { FacetOption, SelectedFacets } from '../src/models';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';

describe('Collection Facets', () => {
  it('has loader', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets ?facetsLoading=${true}></collection-facets>`
    );

    expect(
      el.shadowRoot?.querySelector('#container')?.classList.contains('loading')
    ).to.be.true;

    el.facetsLoading = false;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('#container')?.classList.contains('loading')
    ).to.be.false;
  });

  it('renders a date picker loading placeholder when date picker enabled', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    el.fullYearAggregationLoading = true;
    el.showHistogramDatePicker = true;
    await el.updateComplete;

    const histogramLoader = el.shadowRoot?.querySelector(
      '.histogram-loading-indicator'
    );
    expect(histogramLoader).to.exist;
  });

  it('does not render a date picker loading placeholder when date picker disabled', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    el.fullYearAggregationLoading = true;
    el.showHistogramDatePicker = false;
    await el.updateComplete;

    const histogramLoader = el.shadowRoot?.querySelector(
      '.histogram-loading-indicator'
    );
    expect(histogramLoader).to.be.null;
  });

  it('renders the date picker when enabled with data present', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    el.fullYearAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.fullYearsHistogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const histogram = el.shadowRoot?.querySelector('histogram-date-range');
    expect(histogram).to.exist;
  });

  it('does not render the date picker when disabled', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    el.fullYearAggregationLoading = false;
    el.showHistogramDatePicker = false;
    el.fullYearsHistogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const histogram = el.shadowRoot?.querySelector('histogram-date-range');
    expect(histogram).to.be.null;
  });

  it('renders aggregations as facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      subject: new Aggregation({
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;
    const facetGroups = el.shadowRoot?.querySelectorAll('.facet-group');
    expect(facetGroups?.length).to.equal(1);

    const titleFacetGroup = facetGroups?.[0];
    const facetGroupHeader = titleFacetGroup?.querySelector('h1');
    expect(facetGroupHeader?.textContent?.trim()).to.equal('Subject');
    const titleFacetRow = titleFacetGroup
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('.facet-row');

    expect(titleFacetRow?.textContent?.trim()).to.satisfy((text: string) =>
      /^foo\s*5$/.test(text)
    );
  });

  it('renders multiple aggregation types', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      subject: new Aggregation({
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      }),
      mediatype: new Aggregation({
        buckets: [
          {
            key: 'bar',
            doc_count: 10,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetGroups = el.shadowRoot?.querySelectorAll('.facet-group');
    expect(facetGroups?.length).to.equal(2);
  });

  it('renders collection facets as links', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      collection: new Aggregation({
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const collectionName = el.shadowRoot
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('async-collection-name');
    expect(collectionName?.parentElement).to.be.instanceOf(HTMLAnchorElement);
    expect(collectionName?.parentElement?.getAttribute('href')).to.equal(
      '/details/foo'
    );
  });

  it('renders non-collection facets without links', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      subject: new Aggregation({
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const collectionName = el.shadowRoot
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('async-collection-name');
    expect(collectionName?.parentElement).to.not.be.instanceOf(
      HTMLAnchorElement
    );
  });

  it('does not render suppressed collection facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      collection: new Aggregation({
        buckets: [
          {
            key: 'deemphasize',
            doc_count: 5,
          },
          {
            key: 'community',
            doc_count: 5,
          },
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const collectionFacets = el.shadowRoot
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelectorAll('.facet-row');
    expect(collectionFacets?.length).to.equal(1);

    // The first (and only) collection link should be for 'foo'
    const collectionLink = collectionFacets
      ?.item(0)
      .querySelector(`a[href='/details/foo']`);
    expect(collectionLink).to.exist;
  });

  it('renders lending facets with human-readable names', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      lending: new Aggregation({
        buckets: [
          {
            key: 'is_lendable',
            doc_count: 3,
          },
          {
            key: 'available_to_borrow',
            doc_count: 2,
          },
          {
            key: 'is_readable',
            doc_count: 1,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetsTemplate = el.shadowRoot?.querySelector('facets-template');
    const lendingTitles =
      facetsTemplate?.shadowRoot?.querySelectorAll('.facet-title');
    expect(lendingTitles?.length).to.equal(3);
    expect(lendingTitles?.item(0).textContent?.trim()).to.equal(
      'Lending Library'
    );
    expect(lendingTitles?.item(1).textContent?.trim()).to.equal(
      'Borrow 14 Days'
    );
    expect(lendingTitles?.item(2).textContent?.trim()).to.equal(
      'Always Available'
    );
  });

  it('renders selected/negative lending facets with human-readable names', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const selectedFacets: SelectedFacets = {
      subject: {},
      lending: {
        is_lendable: {
          key: 'is_lendable',
          count: 5,
          state: 'selected',
        },
        available_to_borrow: {
          key: 'available_to_borrow',
          count: 4,
          state: 'selected',
        },
        is_readable: {
          key: 'is_readable',
          count: 3,
          state: 'hidden',
        },
      },
      mediatype: {},
      language: {},
      creator: {},
      collection: {},
      year: {},
    };

    el.selectedFacets = selectedFacets;
    await el.updateComplete;

    const facetsTemplate = el.shadowRoot?.querySelector('facets-template');
    const lendingTitles =
      facetsTemplate?.shadowRoot?.querySelectorAll('.facet-title');
    expect(lendingTitles?.length).to.equal(3);
    expect(lendingTitles?.item(0).textContent?.trim()).to.equal(
      'Lending Library'
    );
    expect(lendingTitles?.item(1).textContent?.trim()).to.equal(
      'Borrow 14 Days'
    );
    expect(lendingTitles?.item(2).textContent?.trim()).to.equal(
      'Always Available'
    );
  });

  it('only renders lending facets for is_lendable, available_to_borrow, and is_readable', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      lending: new Aggregation({
        buckets: [
          {
            key: 'is_lendable',
            doc_count: 5,
          },
          {
            key: 'is_borrowable',
            doc_count: 4,
          },
          {
            key: 'available_to_borrow',
            doc_count: 5,
          },
          {
            key: 'is_browsable',
            doc_count: 4,
          },
          {
            key: 'available_to_browse',
            doc_count: 5,
          },
          {
            key: 'is_readable',
            doc_count: 4,
          },
          {
            key: 'available_to_waitlist',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetsTemplate = el.shadowRoot?.querySelector('facets-template');
    const lendingTitles =
      facetsTemplate?.shadowRoot?.querySelectorAll('.facet-title');
    expect(lendingTitles?.length).to.equal(3);
    expect(lendingTitles?.item(0).textContent?.trim()).to.equal(
      'Lending Library'
    );
    expect(lendingTitles?.item(1).textContent?.trim()).to.equal(
      'Borrow 14 Days'
    );
    expect(lendingTitles?.item(2).textContent?.trim()).to.equal(
      'Always Available'
    );
  });

  it('does not render a More... link for lending facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      lending: new Aggregation({
        buckets: [
          {
            key: 'is_lendable',
            doc_count: 5,
          },
          {
            key: 'is_borrowable',
            doc_count: 4,
          },
          {
            key: 'available_to_borrow',
            doc_count: 5,
          },
          {
            key: 'is_browsable',
            doc_count: 4,
          },
          {
            key: 'available_to_browse',
            doc_count: 5,
          },
          {
            key: 'is_readable',
            doc_count: 4,
          },
          {
            key: 'available_to_waitlist',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const moreLink = el.shadowRoot?.querySelector('.more-link');
    expect(moreLink).not.to.exist;
  });

  describe('More Facets', () => {
    it('Does not render < allowedFacetCount', async () => {
      const el = await fixture<CollectionFacets>(
        html`<collection-facets></collection-facets>`
      );

      const aggs: Record<string, Aggregation> = {
        subject: new Aggregation({
          buckets: [
            {
              key: 'foo',
              doc_count: 5,
            },
          ],
        }),
      };

      el.aggregations = aggs;
      await el.updateComplete;

      const moreLink = el.shadowRoot?.querySelector('.more-link');
      expect(moreLink).to.be.null;
    });

    it('Render More Facets', async () => {
      const el = await fixture<CollectionFacets>(
        html`<collection-facets
          .modalManager=${new ModalManager()}
        ></collection-facets>`
      );

      const aggs: Record<string, Aggregation> = {
        subject: new Aggregation({
          buckets: [
            {
              key: 'foo',
              doc_count: 5,
            },
            {
              key: 'fi',
              doc_count: 5,
            },
            {
              key: 'fum',
              doc_count: 5,
            },
            {
              key: 'flee',
              doc_count: 5,
            },
            {
              key: 'wheee',
              doc_count: 5,
            },
            {
              key: 'whooo',
              doc_count: 5,
            },
            {
              key: 'boop',
              doc_count: 5,
            },
          ],
        }),
      };

      el.aggregations = aggs;
      await el.updateComplete;

      let eventCaught = false;
      let eventFacet = '';
      el.addEventListener('showMoreFacets', e => {
        eventFacet = (e as CustomEvent).detail;
        eventCaught = true;
      });

      const moreLink = el.shadowRoot?.querySelector(
        '.more-link'
      ) as HTMLButtonElement;
      expect(moreLink).to.exist; // has link

      const showModalSpy = sinon.spy(
        el.modalManager as ModalManagerInterface,
        'showModal'
      );
      // let's pop up modal
      moreLink?.click();
      await el.updateComplete;

      expect(showModalSpy.callCount).to.equal(1);
      expect(el.modalManager?.classList.contains('more-search-facets')).to.be
        .true;
      expect(eventCaught).to.be.true;
      expect(eventFacet).to.equal('subject' as FacetOption);
    });
  });

  it('fire analytics on more link', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .analyticsHandler=${mockAnalyticsHandler}
      ></collection-facets>`
    );
    const aggs: Record<string, Aggregation> = {
      subject: new Aggregation({
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
          {
            key: 'fi',
            doc_count: 5,
          },
          {
            key: 'fum',
            doc_count: 5,
          },
          {
            key: 'flee',
            doc_count: 5,
          },
          {
            key: 'wheee',
            doc_count: 5,
          },
          {
            key: 'whooo',
            doc_count: 5,
          },
          {
            key: 'boop',
            doc_count: 5,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const moreLink = el.shadowRoot?.querySelector(
      '.more-link'
    ) as HTMLButtonElement;

    expect(moreLink).to.exist; // has link

    moreLink?.click();
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('showMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('subject');
  });
});
