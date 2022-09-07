/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { Aggregation } from '@internetarchive/search-service';
import type { CollectionFacets } from '../src/collection-facets';
import '../src/collection-facets';

describe('Collection Facets', () => {
  it('renders aggregations as facets', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      'user_aggs__terms__field:subjectSorter__size:1': {
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      },
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const facetGroups = el.shadowRoot?.querySelectorAll('.facet-group');
    expect(facetGroups?.length).to.equal(1);

    const titleFacetGroup = facetGroups?.[0];
    const facetGroupHeader = titleFacetGroup?.querySelector('h1');
    expect(facetGroupHeader?.textContent?.trim()).to.equal('Subject');

    const titleFacetRow = titleFacetGroup?.querySelector('.facet-row');
    expect(titleFacetRow?.textContent?.trim()).to.satisfy((text: string) =>
      /^foo\s*5$/.test(text)
    );
  });

  it('renders multiple aggregation types', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      'user_aggs__terms__field:subjectSorter__size:1': {
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      },
      'user_aggs__terms__field:mediatypeSorter__size:1': {
        buckets: [
          {
            key: 'bar',
            doc_count: 10,
          },
        ],
      },
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
      'user_aggs__terms__field:collection__size:1': {
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      },
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const collectionName = el.shadowRoot?.querySelector(
      'async-collection-name'
    );
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
      'user_aggs__terms__field:subjectSorter__size:1': {
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      },
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const collectionName = el.shadowRoot?.querySelector(
      'async-collection-name'
    );
    expect(collectionName?.parentElement).to.not.be.instanceOf(
      HTMLAnchorElement
    );
  });

  it('toggles selected facets on click', async () => {
    const el = await fixture<CollectionFacets>(
      html`<collection-facets></collection-facets>`
    );

    const aggs: Record<string, Aggregation> = {
      'user_aggs__terms__field:subjectSorter__size:1': {
        buckets: [
          {
            key: 'foo',
            doc_count: 5,
          },
        ],
      },
    };

    el.aggregations = aggs;
    await el.updateComplete;

    const checkbox = el.shadowRoot?.querySelector(
      '.select-facet-checkbox'
    ) as HTMLInputElement;
    expect(checkbox.checked).to.be.false;

    // Select the facet
    checkbox?.click();
    await el.updateComplete;

    expect(el.selectedFacets?.subject.foo).to.equal('selected');

    // Unselect the facet
    checkbox?.click();
    await el.updateComplete;

    expect(el.selectedFacets?.subject.foo).to.be.undefined;
  });
});
