import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { html } from 'lit';
import type { FacetRow } from '../../src/collection-facets/facet-row';
import '../../src/collection-facets/facet-row';
import type { FacetState } from '../../src/models';

describe('Facet row', () => {
  it('renders nothing if no bucket provided', async () => {
    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'}></facet-row>`,
    );

    expect(el.shadowRoot?.querySelector('.facet-row-container')).not.to.exist;
  });

  it('renders nothing if no facet type provided', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .bucket=${bucket}></facet-row>`,
    );

    expect(el.shadowRoot?.querySelector('.facet-row-container')).not.to.exist;
  });

  it('renders provided bucket as facet row', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    expect(el.shadowRoot?.querySelector('.facet-row-container')).to.exist;
    expect(
      el.shadowRoot?.querySelectorAll('input[type="checkbox"]'),
    ).to.have.length(2);
    expect(el.shadowRoot?.querySelectorAll('label')).to.have.length(2);

    const labelText = el.shadowRoot?.querySelector('.facet-info-display');
    expect(labelText?.textContent?.trim()).to.match(/^foo\s*5$/);
  });

  it('renders locale-appropriate facet count', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 54321,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    const facetCount = el.shadowRoot?.querySelector('.facet-count');
    expect(facetCount?.textContent).to.equal('54,321');
  });

  it('renders selected facets with checked checkbox', async () => {
    const bucket = {
      key: 'foo',
      state: 'selected' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    // "Positive" checkbox is checked; "Negative" checkbox is not checked
    const selectCheckbox = el.shadowRoot?.querySelector(
      '.select-facet-checkbox',
    ) as HTMLInputElement;
    const hideCheckbox = el.shadowRoot?.querySelector(
      '.hide-facet-checkbox',
    ) as HTMLInputElement;
    expect(selectCheckbox?.checked).to.be.true;
    expect(hideCheckbox?.checked).to.be.false;

    // Eye icon is not in its active state
    expect(
      el.shadowRoot?.querySelector('.hide-facet-icon'),
    ).to.exist.and.satisfy(
      (icon: HTMLElement) => !icon.classList.contains('active'),
    );
  });

  it('renders hidden facets with closed eye icon', async () => {
    const bucket = {
      key: 'foo',
      state: 'hidden' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    // "Positive" checkbox is not checked; "Negative" checkbox is checked
    const selectCheckbox = el.shadowRoot?.querySelector(
      '.select-facet-checkbox',
    ) as HTMLInputElement;
    const hideCheckbox = el.shadowRoot?.querySelector(
      '.hide-facet-checkbox',
    ) as HTMLInputElement;
    expect(selectCheckbox?.checked).to.be.false;
    expect(hideCheckbox?.checked).to.be.true;

    // Eye icon is in its "active" state
    expect(
      el.shadowRoot?.querySelector('.hide-facet-icon'),
    ).to.exist.and.satisfy((icon: HTMLElement) =>
      icon.classList.contains('active'),
    );
  });

  it('renders correct accessible label for unchecked negative facets', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    const hideFacetLabel = el.shadowRoot?.querySelector('.hide-facet-icon');
    expect(hideFacetLabel?.textContent?.trim()).to.match(/^Hide subject: foo$/);
  });

  it('renders correct accessible label for checked negative facets', async () => {
    const bucket = {
      key: 'foo',
      state: 'hidden' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    const hideFacetLabel = el.shadowRoot?.querySelector('.hide-facet-icon');
    expect(hideFacetLabel?.textContent?.trim()).to.match(
      /^Unhide subject: foo$/,
    );
  });

  it('renders collection facets as links', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'collection'}
        .bucket=${bucket}
      ></facet-row>`,
    );

    const collectionName = el.shadowRoot?.querySelector(
      '.facet-title > a:link',
    );
    expect(collectionName).to.exist;
    expect(collectionName?.getAttribute('href')).to.equal('/details/foo');
  });

  it('does not render non-collection facets as links', async () => {
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row .facetType=${'subject'} .bucket=${bucket}></facet-row>`,
    );

    expect(el.shadowRoot?.querySelector('a:link')).not.to.exist;
  });

  it('emits event when facet checkbox is clicked', async () => {
    const facetClickSpy = sinon.spy();
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'subject'}
        .bucket=${bucket}
        @facetClick=${facetClickSpy}
      ></facet-row>`,
    );

    const positiveFacetCheck = el.shadowRoot?.querySelector(
      '.select-facet-checkbox',
    ) as HTMLInputElement;
    expect(positiveFacetCheck).to.exist;
    positiveFacetCheck.click();

    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'selected',
        count: 5,
      },
      negative: false,
    });
  });

  it('emits event when facet checkbox is unchecked', async () => {
    const facetClickSpy = sinon.spy();
    const bucket = {
      key: 'foo',
      state: 'selected' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'subject'}
        .bucket=${bucket}
        @facetClick=${facetClickSpy}
      ></facet-row>`,
    );

    const positiveFacetCheck = el.shadowRoot?.querySelector(
      '.select-facet-checkbox',
    ) as HTMLInputElement;
    expect(positiveFacetCheck).to.exist;
    positiveFacetCheck.click();

    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'none',
        count: 5,
      },
      negative: false,
    });
  });

  it('emits event when facet negative icon is clicked', async () => {
    const facetClickSpy = sinon.spy();
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'subject'}
        .bucket=${bucket}
        @facetClick=${facetClickSpy}
      ></facet-row>`,
    );

    const negativeFacetIcon = el.shadowRoot?.querySelector(
      '.hide-facet-icon',
    ) as HTMLLabelElement;
    expect(negativeFacetIcon).to.exist;
    negativeFacetIcon.click();

    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'hidden',
        count: 5,
      },
      negative: true,
    });
  });

  it('emits event when facet negative icon is unchecked', async () => {
    const facetClickSpy = sinon.spy();
    const bucket = {
      key: 'foo',
      state: 'hidden' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'subject'}
        .bucket=${bucket}
        @facetClick=${facetClickSpy}
      ></facet-row>`,
    );

    const negativeFacetIcon = el.shadowRoot?.querySelector(
      '.hide-facet-icon',
    ) as HTMLLabelElement;
    expect(negativeFacetIcon).to.exist;
    negativeFacetIcon.click();

    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'none',
        count: 5,
      },
      negative: true,
    });
  });

  it('selects/deselects facet when label is clicked', async () => {
    const facetClickSpy = sinon.spy();
    const bucket = {
      key: 'foo',
      state: 'none' as FacetState,
      count: 5,
    };

    const el = await fixture<FacetRow>(
      html`<facet-row
        .facetType=${'subject'}
        .bucket=${bucket}
        @facetClick=${facetClickSpy}
      ></facet-row>`,
    );

    const facetLabel = el.shadowRoot?.querySelector(
      '.facet-info-display',
    ) as HTMLLabelElement;
    expect(facetLabel).to.exist;

    // Select facet by clicking label
    facetLabel.click();
    expect(facetClickSpy.callCount).to.equal(1);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'selected',
        count: 5,
      },
      negative: false,
    });

    // Deselect facet by clicking label
    facetLabel.click();
    expect(facetClickSpy.callCount).to.equal(2);
    expect(facetClickSpy.lastCall.args[0]?.detail).to.deep.equal({
      facetType: 'subject',
      bucket: {
        key: 'foo',
        state: 'none',
        count: 5,
      },
      negative: false,
    });
  });
});
