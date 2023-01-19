import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { FacetsTemplate } from '../../src/collection-facets/facets-template';
import '../../src/collection-facets/facets-template';
import { defaultSelectedFacets, FacetEventDetails } from '../../src/models';

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

  it('emits facetClick events for normal facets', async () => {
    const facetClickSpy = sinon.spy();
    const mediatypeGroup = {
      title: 'Media Type',
      key: 'mediatype',
      buckets: [
        { displayText: 'audio', key: 'audio', count: 42, state: 'none' },
      ],
    };
    const selectedFacets = { ...defaultSelectedFacets };
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${mediatypeGroup}
        .selectedFacets=${selectedFacets}
        @facetClick=${facetClickSpy}
      ></facets-template>`
    );

    const checkbox = el.shadowRoot?.querySelector(
      '.select-facet-checkbox'
    ) as HTMLInputElement;
    expect(checkbox).to.exist;

    // Select it
    checkbox.click();
    await el.updateComplete;
    expect(facetClickSpy.callCount).to.equal(1);

    const selectEvent = facetClickSpy
      .args[0][0] as CustomEvent<FacetEventDetails>;
    expect(selectEvent).to.exist;
    expect(selectEvent?.detail?.key).to.equal('mediatype');
    expect(selectEvent?.detail?.state).to.equal('selected');
    expect(selectEvent?.detail?.negative).to.be.false;

    // Unselect it
    checkbox.click();
    await el.updateComplete;
    expect(facetClickSpy.callCount).to.equal(2);

    const unselectEvent = facetClickSpy
      .args[1][0] as CustomEvent<FacetEventDetails>;
    expect(unselectEvent).to.exist;
    expect(unselectEvent?.detail?.key).to.equal('mediatype');
    expect(unselectEvent?.detail?.state).to.equal('none');
    expect(unselectEvent?.detail?.negative).to.be.false;
  });

  it('emits facetClick events for negative facets', async () => {
    const facetClickSpy = sinon.spy();
    const mediatypeGroup = {
      title: 'Media Type',
      key: 'mediatype',
      buckets: [
        { displayText: 'audio', key: 'audio', count: 42, state: 'none' },
      ],
    };
    const selectedFacets = { ...defaultSelectedFacets };
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${mediatypeGroup}
        .selectedFacets=${selectedFacets}
        @facetClick=${facetClickSpy}
      ></facets-template>`
    );

    const checkbox = el.shadowRoot?.querySelector(
      '.hide-facet-checkbox'
    ) as HTMLInputElement;
    expect(checkbox).to.exist;

    // Select it
    checkbox.click();
    await el.updateComplete;
    expect(facetClickSpy.callCount).to.equal(1);

    const selectEvent = facetClickSpy
      .args[0][0] as CustomEvent<FacetEventDetails>;
    expect(selectEvent).to.exist;
    expect(selectEvent?.detail?.key).to.equal('mediatype');
    expect(selectEvent?.detail?.state).to.equal('hidden');
    expect(selectEvent?.detail?.negative).to.be.true;

    // Unselect it
    checkbox.click();
    await el.updateComplete;
    expect(facetClickSpy.callCount).to.equal(2);

    const unselectEvent = facetClickSpy
      .args[1][0] as CustomEvent<FacetEventDetails>;
    expect(unselectEvent).to.exist;
    expect(unselectEvent?.detail?.key).to.equal('mediatype');
    expect(unselectEvent?.detail?.state).to.equal('none');
    expect(unselectEvent?.detail?.negative).to.be.true;
  });
});
