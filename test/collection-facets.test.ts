/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { Aggregation } from '@internetarchive/search-service';
import {
  ModalManager,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import type { CollectionFacets } from '../src/collection-facets';
import '@internetarchive/modal-manager';
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
    const titleFacetRow = titleFacetGroup
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('.facet-row');
    console.log(titleFacetGroup?.querySelector('facets-template'));
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

    const collectionName = el.shadowRoot
      ?.querySelector('facets-template')
      ?.shadowRoot?.querySelector('async-collection-name');
    expect(collectionName?.parentElement).to.not.be.instanceOf(
      HTMLAnchorElement
    );
  });

  describe('More Facets', () => {
    it('Does not render < allowedFacetCount', async () => {
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
        'user_aggs__terms__field:subjectSorter__size:1': {
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
        },
      };

      el.aggregations = aggs;
      await el.updateComplete;

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
    });
  });
});
