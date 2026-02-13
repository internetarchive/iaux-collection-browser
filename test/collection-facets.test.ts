import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
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
import {
  FacetOption,
  // SelectedFacets, Used in lending tests (disabled)
  getDefaultSelectedFacets,
} from '../src/models';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';
import type { FacetRow } from '../src/collection-facets/facet-row';
// import type { FacetsTemplate } from '../src/collection-facets/facets-template'; Used in lending tests (disabled)

describe('Collection Facets', () => {
  it('has loader', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets ?facetsLoading=${true}></collection-facets>`,
    );

    expect(
      el.shadowRoot?.querySelector('#container')?.classList.contains('loading'),
    ).to.be.true;

    el.facetsLoading = false;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('#container')?.classList.contains('loading'),
    ).to.be.false;
  });

  it('renders a date picker loading placeholder when date picker enabled', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = true;
    el.showHistogramDatePicker = true;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const histogramLoader = el.shadowRoot?.querySelector(
      '.histogram-loading-indicator',
    );
    expect(histogramLoader).to.exist;
  });

  it('does not render a date picker loading placeholder when date picker disabled', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = true;
    el.showHistogramDatePicker = false;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const histogramLoader = el.shadowRoot?.querySelector(
      '.histogram-loading-indicator',
    );
    expect(histogramLoader).to.be.null;
  });

  it('renders the date picker when enabled with data present', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.histogramAggregation = new Aggregation({
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
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = false;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const histogram = el.shadowRoot?.querySelector('histogram-date-range');
    expect(histogram).to.be.null;
  });

  it('renders button to expand the date picker when allowed', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.allowExpandingDatePicker = true;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const expandBtn = el.shadowRoot?.querySelector('.expand-date-picker-btn');
    expect(expandBtn).to.exist;
  });

  it('does not render button to expand the date picker when disallowed', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.allowExpandingDatePicker = false;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const expandBtn = el.shadowRoot?.querySelector('.expand-date-picker-btn');
    expect(expandBtn).to.be.null;
  });

  it('opens modal when date picker expand button clicked', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );

    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .modalManager=${modalManager}
      ></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.allowExpandingDatePicker = true;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const expandBtn = el.shadowRoot?.querySelector(
      '.expand-date-picker-btn',
    ) as HTMLButtonElement;
    expect(expandBtn).to.exist;

    const showModalSpy = sinon.spy(
      el.modalManager as ModalManagerInterface,
      'showModal',
    );

    // Click the expand button to open the modal
    expandBtn?.click();
    await el.updateComplete;

    expect(showModalSpy.callCount).to.equal(1);
    expect(el.modalManager?.classList.contains('expanded-date-picker')).to.be
      .true;
  });

  it('renders aggregations as facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
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
    const facetGroupHeader = titleFacetGroup?.querySelector('h3');
    // Every facet group header has an invisible " filters" suffix for screen-readers
    expect(
      facetGroupHeader?.querySelector('span.sr-only')?.textContent?.trim(),
    ).to.equal('filters');
    // Ignoring the screen-reader suffix, we should be left with only the readable, capitalized title
    expect(
      facetGroupHeader?.textContent?.trim().replace(/\s*filters$/, ''),
    ).to.equal('Subject');

    const titleFacetRow = titleFacetGroup
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('facet-row') as FacetRow;
    await titleFacetRow.updateComplete;
  });

  it('renders multiple aggregation types', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
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

  it('does not render suppressed collection facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
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
      ?.shadowRoot?.querySelectorAll('facet-row') as ArrayLike<FacetRow>;
    expect(collectionFacets?.length).to.equal(1);

    // The first (and only) collection link should be for 'foo'
    expect(collectionFacets[0].bucket?.key).to.equal('foo');
  });

  // Lending tests disabled because lending facet disabled
  // it('renders lending facets with human-readable names', async () => {
  //   const el = await fixture<CollectionFacets>(
  //     html`<collection-facets></collection-facets>`
  //   );

  //   const aggs: Record<string, Aggregation> = {
  //     lending: new Aggregation({
  //       buckets: [
  //         {
  //           key: 'is_lendable',
  //           doc_count: 3,
  //         },
  //         {
  //           key: 'available_to_borrow',
  //           doc_count: 2,
  //         },
  //         {
  //           key: 'is_readable',
  //           doc_count: 1,
  //         },
  //       ],
  //     }),
  //   };

  //   el.aggregations = aggs;
  //   await el.updateComplete;

  //   const facetsTemplate = el.shadowRoot?.querySelector(
  //     'facets-template'
  //   ) as FacetsTemplate;
  //   await facetsTemplate?.updateComplete;

  //   const lendingFacets = facetsTemplate?.shadowRoot?.querySelectorAll(
  //     'facet-row'
  //   ) as ArrayLike<FacetRow>;
  //   expect(lendingFacets?.length).to.equal(3);

  //   expect(lendingFacets[0].shadowRoot?.textContent?.trim()).to.match(
  //     /^Lending Library\s*3$/
  //   );
  //   expect(lendingFacets[1].shadowRoot?.textContent?.trim()).to.match(
  //     /^Borrow 14 Days\s*2$/
  //   );
  //   expect(lendingFacets[2].shadowRoot?.textContent?.trim()).to.match(
  //     /^Always Available\s*1$/
  //   );
  // });

  // it('renders selected/negative lending facets with human-readable names', async () => {
  //   const el = await fixture<CollectionFacets>(
  //     html`<collection-facets></collection-facets>`
  //   );

  //   const selectedFacets: SelectedFacets = {
  //     subject: {},
  //     lending: {
  //       is_lendable: {
  //         key: 'is_lendable',
  //         count: 5,
  //         state: 'selected',
  //       },
  //       available_to_borrow: {
  //         key: 'available_to_borrow',
  //         count: 4,
  //         state: 'selected',
  //       },
  //       is_readable: {
  //         key: 'is_readable',
  //         count: 3,
  //         state: 'hidden',
  //       },
  //     },
  //     mediatype: {},
  //     language: {},
  //     creator: {},
  //     collection: {},
  //     year: {},
  //   };

  //   el.selectedFacets = selectedFacets;
  //   await el.updateComplete;

  //   const facetsTemplate = el.shadowRoot?.querySelector(
  //     'facets-template'
  //   ) as FacetsTemplate;
  //   await facetsTemplate?.updateComplete;

  //   const lendingFacets = facetsTemplate?.shadowRoot?.querySelectorAll(
  //     'facet-row'
  //   ) as ArrayLike<FacetRow>;
  //   expect(lendingFacets?.length).to.equal(3);

  //   expect(lendingFacets[0].shadowRoot?.textContent?.trim()).to.match(
  //     /^Lending Library\s*5$/
  //   );
  //   expect(lendingFacets[1].shadowRoot?.textContent?.trim()).to.match(
  //     /^Borrow 14 Days\s*4$/
  //   );
  //   expect(lendingFacets[2].shadowRoot?.textContent?.trim()).to.match(
  //     /^Always Available\s*3$/
  //   );
  // });

  // it('only renders lending facets for is_lendable, available_to_borrow, and is_readable', async () => {
  //   const el = await fixture<CollectionFacets>(
  //     html`<collection-facets></collection-facets>`
  //   );

  //   const aggs: Record<string, Aggregation> = {
  //     lending: new Aggregation({
  //       buckets: [
  //         {
  //           key: 'is_lendable',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_borrowable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_borrow',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_browsable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_browse',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_readable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_waitlist',
  //           doc_count: 5,
  //         },
  //       ],
  //     }),
  //   };

  //   el.aggregations = aggs;
  //   await el.updateComplete;

  //   const facetsTemplate = el.shadowRoot?.querySelector(
  //     'facets-template'
  //   ) as FacetsTemplate;
  //   await facetsTemplate?.updateComplete;
  //   await new Promise(res => {
  //     setTimeout(res, 100);
  //   });

  //   const lendingFacets = facetsTemplate?.shadowRoot?.querySelectorAll(
  //     'facet-row'
  //   ) as ArrayLike<FacetRow>;
  //   expect(lendingFacets?.length).to.equal(3);

  //   expect(lendingFacets[0].shadowRoot?.textContent?.trim()).to.match(
  //     /^Lending Library\s*5$/
  //   );
  //   expect(lendingFacets[1].shadowRoot?.textContent?.trim()).to.match(
  //     /^Borrow 14 Days\s*5$/
  //   );
  //   expect(lendingFacets[2].shadowRoot?.textContent?.trim()).to.match(
  //     /^Always Available\s*4$/
  //   );
  // });

  // it('does not render a More... link for lending facets', async () => {
  //   const el = await fixture<CollectionFacets>(
  //     html`<collection-facets></collection-facets>`
  //   );

  //   const aggs: Record<string, Aggregation> = {
  //     lending: new Aggregation({
  //       buckets: [
  //         {
  //           key: 'is_lendable',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_borrowable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_borrow',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_browsable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_browse',
  //           doc_count: 5,
  //         },
  //         {
  //           key: 'is_readable',
  //           doc_count: 4,
  //         },
  //         {
  //           key: 'available_to_waitlist',
  //           doc_count: 5,
  //         },
  //       ],
  //     }),
  //   };

  //   el.aggregations = aggs;
  //   await el.updateComplete;

  //   const moreLink = el.shadowRoot?.querySelector('.more-link');
  //   expect(moreLink).not.to.exist;
  // });

  it('always renders the mediatype:collection facet when present', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    const aggs: Record<string, Aggregation> = {
      mediatype: new Aggregation({
        buckets: [
          {
            key: 'texts',
            doc_count: 10000,
          },
          {
            key: 'image',
            doc_count: 9000,
          },
          {
            key: 'audio',
            doc_count: 8000,
          },
          {
            key: 'movies',
            doc_count: 7000,
          },
          {
            key: 'software',
            doc_count: 6000,
          },
          {
            key: 'data',
            doc_count: 5000,
          },
          {
            key: 'etree',
            doc_count: 4000,
          },
          {
            key: 'collection',
            doc_count: 1,
          },
        ],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetsTemplate = el.shadowRoot?.querySelector('facets-template');
    const facetRows = facetsTemplate?.shadowRoot?.querySelectorAll(
      'facet-row',
    ) as ArrayLike<FacetRow>;
    expect(facetRows?.length).to.equal(6);
    expect(facetRows?.[5]?.bucket?.key).to.equal('collection');
  });

  it('renders the mediatype:collection facet even when >=6 other mediatypes are selected', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`,
    );

    const aggs: Record<string, Aggregation> = {
      mediatype: new Aggregation({
        buckets: [
          {
            key: 'texts',
            doc_count: 10000,
          },
          {
            key: 'image',
            doc_count: 9000,
          },
          {
            key: 'audio',
            doc_count: 8000,
          },
          {
            key: 'movies',
            doc_count: 7000,
          },
          {
            key: 'software',
            doc_count: 6000,
          },
          {
            key: 'data',
            doc_count: 5000,
          },
          {
            key: 'etree',
            doc_count: 4000,
          },
          {
            key: 'collection',
            doc_count: 1,
          },
        ],
      }),
    };

    const selectedFacets = getDefaultSelectedFacets();
    selectedFacets.mediatype = {
      texts: { key: 'texts', count: 10000, state: 'selected' },
      image: { key: 'image', count: 9000, state: 'selected' },
      audio: { key: 'audio', count: 8000, state: 'selected' },
      movies: { key: 'movies', count: 7000, state: 'selected' },
      software: { key: 'software', count: 6000, state: 'selected' },
      data: { key: 'data', count: 5000, state: 'selected' },
      etree: { key: 'etree', count: 4000, state: 'selected' },
    };

    el.aggregations = aggs;
    el.selectedFacets = selectedFacets;
    await el.updateComplete;

    const facetsTemplate = el.shadowRoot?.querySelector('facets-template');
    const facetRows = facetsTemplate?.shadowRoot?.querySelectorAll(
      'facet-row',
    ) as ArrayLike<FacetRow>;
    expect(facetRows?.length).to.equal(8);
    expect(facetRows?.[7]?.bucket?.key).to.equal('collection');
  });

  it('uses specified facet display order', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .facetDisplayOrder=${['language', 'creator'] as FacetOption[]}
      ></collection-facets>`,
    );

    const aggs: Record<string, Aggregation> = {
      mediatype: new Aggregation({
        buckets: [{ key: 'texts', doc_count: 5 }],
      }),
      collection: new Aggregation({
        buckets: [{ key: 'foo', doc_count: 10 }],
      }),
      creator: new Aggregation({
        buckets: [{ key: 'bar', doc_count: 15 }],
      }),
      language: new Aggregation({
        buckets: [{ key: 'baz', doc_count: 20 }],
      }),
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetHeaders = el.shadowRoot?.querySelectorAll('.facet-group-header');

    // The only two facet groups should be Language and Creator (in that order)
    expect(facetHeaders?.length).to.equal(2);
    expect(facetHeaders?.[0].textContent).to.contain('Language');
    expect(facetHeaders?.[1].textContent).to.contain('Creator');
  });

  describe('More Facets', () => {
    it('Does not render < allowedFacetCount', async () => {
      const el = await fixture<CollectionFacets>(
        html`<collection-facets></collection-facets>`,
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
      const modalManager = await fixture<ModalManager>(
        html`<modal-manager></modal-manager>`,
      );

      const el = await fixture<CollectionFacets>(
        html`<collection-facets
          .modalManager=${modalManager}
        ></collection-facets>`,
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
        '.more-link',
      ) as HTMLButtonElement;
      expect(moreLink).to.exist; // has link

      const showModalSpy = sinon.spy(
        el.modalManager as ModalManagerInterface,
        'showModal',
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
      ></collection-facets>`,
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
      '.more-link',
    ) as HTMLButtonElement;

    expect(moreLink).to.exist; // has link

    moreLink?.click();
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('showMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('subject');
  });

  it('includes Part Of section for collections', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .baseNavigationUrl=${''}
        .withinCollection=${'foo'}
        .parentCollections=${['bar', 'baz']}
        .collectionTitles=${new Map([
          ['foo', 'foo-name'],
          ['bar', 'bar-name'],
          ['baz', 'baz-name'],
        ])}
      ></collection-facets>`,
    );

    const partOfSection = el.shadowRoot?.querySelector('.partof-collections');
    expect(partOfSection).to.exist;

    const partOfLinks = partOfSection?.querySelectorAll('a[href]');
    expect(partOfLinks?.length).to.equal(2);

    expect(partOfLinks?.[0]?.textContent?.trim()).to.equal('bar-name');
    expect(partOfLinks?.[0]?.getAttribute('href')).to.equal('/details/bar');
    expect(partOfLinks?.[1]?.textContent?.trim()).to.equal('baz-name');
    expect(partOfLinks?.[1]?.getAttribute('href')).to.equal('/details/baz');
  });

  it('does not include Part Of section without parent collections', async () => {
    // No parentCollections prop
    const el = await fixture<CollectionFacets>(
      html`<collection-facets .withinCollection=${'foo'}></collection-facets>`,
    );

    const partOfSection = el.shadowRoot?.querySelector('.partof-collections');
    expect(partOfSection).not.to.exist;
  });

  it('fires analytics on expanding date picker', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .analyticsHandler=${mockAnalyticsHandler}
      ></collection-facets>`,
    );

    el.histogramAggregationLoading = false;
    el.showHistogramDatePicker = true;
    el.allowExpandingDatePicker = true;
    el.histogramAggregation = new Aggregation({
      buckets: [1, 2, 3],
      first_bucket_key: 0,
      last_bucket_key: 2,
    });
    await el.updateComplete;

    const expandBtn = el.shadowRoot?.querySelector(
      '.expand-date-picker-btn',
    ) as HTMLButtonElement;
    expect(expandBtn).to.exist;

    // Click the expand button to open the modal
    expandBtn?.click();
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('histogramExpanded');
    expect(mockAnalyticsHandler.callLabel).to.equal(window.location.href);
  });

  it('fires analytics on clicking Part Of collection link', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<CollectionFacets>(
      html`<collection-facets
        .baseNavigationUrl=${''}
        .withinCollection=${'foo'}
        .parentCollections=${['bar']}
        .analyticsHandler=${mockAnalyticsHandler}
      ></collection-facets>`,
    );

    const partOfLinks = el.shadowRoot?.querySelectorAll(
      '.partof-collections a[href]',
    );
    expect(partOfLinks?.length).to.equal(1);

    // Click the expand button to open the modal
    const link = partOfLinks?.[0] as HTMLAnchorElement;
    link?.addEventListener('click', e => e.preventDefault());
    link?.click();
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('partOfCollectionClicked');
    expect(mockAnalyticsHandler.callLabel).to.equal('bar');
  });
});
