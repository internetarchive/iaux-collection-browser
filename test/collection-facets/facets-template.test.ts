import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { FacetsTemplate } from '../../src/collection-facets/facets-template';
import '../../src/collection-facets/facets-template';
import type { FacetRow } from '../../src/collection-facets/facet-row';

const facetGroup = {
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

describe('Render facets', () => {
  it('should render more facets template', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template .facetGroup=${facetGroup}></facets-template>`
    );
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('facet-row')).to.exist;
  });

  it('facets render on page', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        .renderOn=${'page'}
      ></facets-template>`
    );
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-on-page')).to.exist;
  });

  it('facets render on modal', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        .renderOn=${'modal'}
      ></facets-template>`
    );
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-on-modal')).to.exist;
  });

  it('applies correct bucket values to facet row', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template .facetGroup=${facetGroup}></facets-template>`
    );
    await el.updateComplete;

    const facetRows = el.shadowRoot?.querySelectorAll('facet-row');
    expect(facetRows?.length).to.equal(facetGroup.buckets.length);

    facetRows?.forEach((elmt, i) => {
      const facetRow = elmt as FacetRow;
      expect(facetRow).to.exist;
      expect(facetRow.bucket).to.equal(facetGroup.buckets[i]);
      expect(facetRow.facetType).to.equal(facetGroup.key);
    });
  });
});
