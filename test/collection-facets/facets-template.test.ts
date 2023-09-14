import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
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

    expect(el.shadowRoot?.querySelector('.facets-on-page')).to.exist;
  });

  it('facets render on modal', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        .renderOn=${'modal'}
      ></facets-template>`
    );

    expect(el.shadowRoot?.querySelector('.facets-on-modal')).to.exist;
  });

  it('applies correct bucket values to facet row', async () => {
    const el = await fixture<FacetsTemplate>(
      html`<facets-template .facetGroup=${facetGroup}></facets-template>`
    );

    const facetRows = el.shadowRoot?.querySelectorAll('facet-row');
    expect(facetRows?.length).to.equal(facetGroup.buckets.length);

    facetRows?.forEach((elmt, i) => {
      const facetRow = elmt as FacetRow;
      expect(facetRow).to.exist;
      expect(facetRow.bucket).to.equal(facetGroup.buckets[i]);
      expect(facetRow.facetType).to.equal(facetGroup.key);
    });
  });

  it('emits facet click and change events when a facet is selected/deselected', async () => {
    const facetClickSpy = sinon.spy();
    const facetsChangeSpy = sinon.spy();
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        @facetClick=${facetClickSpy}
        @selectedFacetsChanged=${facetsChangeSpy}
      ></facets-template>`
    );

    const facetRow = el.shadowRoot?.querySelector('facet-row') as FacetRow;
    expect(facetRow).to.exist;

    const facetSelectCheck = facetRow.shadowRoot?.querySelector(
      '.select-facet-checkbox'
    ) as HTMLInputElement;
    expect(facetSelectCheck).to.exist;

    facetSelectCheck.click();
    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetsChangeSpy.callCount).to.equal(1);
    expect(facetRow.bucket?.state).to.equal('selected');

    facetSelectCheck.click();
    expect(facetClickSpy.callCount).to.equal(2);
    expect(facetsChangeSpy.callCount).to.equal(2);
    expect(facetRow.bucket?.state).to.equal('none');
  });

  it('emits facet click and change events when a facet is negated/un-negated', async () => {
    const facetClickSpy = sinon.spy();
    const facetsChangeSpy = sinon.spy();
    const el = await fixture<FacetsTemplate>(
      html`<facets-template
        .facetGroup=${facetGroup}
        @facetClick=${facetClickSpy}
        @selectedFacetsChanged=${facetsChangeSpy}
      ></facets-template>`
    );

    const facetRow = el.shadowRoot?.querySelector('facet-row') as FacetRow;
    expect(facetRow).to.exist;

    const facetNegateCheck = facetRow.shadowRoot?.querySelector(
      '.hide-facet-checkbox'
    ) as HTMLInputElement;
    expect(facetNegateCheck).to.exist;

    facetNegateCheck.click();
    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetsChangeSpy.callCount).to.equal(1);
    expect(facetRow.bucket?.state).to.equal('hidden');

    facetNegateCheck.click();
    expect(facetClickSpy.callCount).to.equal(2);
    expect(facetsChangeSpy.callCount).to.equal(2);
    expect(facetRow.bucket?.state).to.equal('none');
  });
});
