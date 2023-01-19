import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { FacetsTemplate } from '../../src/collection-facets/facets-template';
import '../../src/collection-facets/facets-template';

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

    expect(el.shadowRoot?.querySelector('.facet-row')).to.exist;
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

  it('find facet-title and facet-count for particular facet group', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template .facetGroup=${facetGroup}></facets-template>`
    );
    await el.updateComplete;

    const facetInfo = el.shadowRoot?.querySelector('.facet-info-display');
    expect(facetInfo?.querySelector('.facet-title')?.textContent).to.equal(
      'audio'
    );
    expect(
      facetInfo?.querySelector('.facet-count')?.textContent?.trim()
    ).to.equal('1,001');
  });

  it('find the hidden facet item', async () => {
    const selectedFacets = { ...facetGroup };
    selectedFacets.buckets[2].state = 'hidden'; // hide 'texts' mediatype

    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        .selectedFacets=${selectedFacets}
      ></facets-template>`
    );
    await el.updateComplete;

    const hiddenFacet = el.shadowRoot?.querySelectorAll('.hide-facet-icon')[0];

    // check title attribute for 'texts' mediatype
    expect(hiddenFacet?.getAttribute('title')).equal('Unhide mediatype: texts');
  });

  it('find the selected facet item', async () => {
    const selectedFacets = { ...facetGroup };
    selectedFacets.buckets[1].state = 'selected'; // select 'movies' mediatype

    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        .selectedFacets=${selectedFacets}
      ></facets-template>`
    );
    await el.updateComplete;

    const selectedFacet =
      el.shadowRoot?.querySelectorAll('.hide-facet-icon')[0];

    // check title attribute for 'movies' mediatype
    expect(selectedFacet?.getAttribute('title')).equal(
      'Hide mediatype: movies'
    );
  });
});
