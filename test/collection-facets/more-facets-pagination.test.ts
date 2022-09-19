/* eslint-disable import/no-duplicates */
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import '../../src/collection-facets/more-facets-pagination';
import type { MoreFacetsPagination } from '../../src/collection-facets/more-facets-pagination';

describe('More facets pagination', () => {
  describe('5 pages or less', () => {
    it('shows all pages', async () => {
      const el = await fixture<MoreFacetsPagination>(
        html`<more-facets-pagination .size=${5}></more-facets-pagination>`
      );

      await el.updateComplete;

      const pageButtons = el.shadowRoot?.querySelectorAll(
        'button[data-page]'
      ) as NodeList;
      expect(pageButtons.length).to.greaterThan(0);

      pageButtons.forEach((button, index) => {
        expect(button.textContent).to.contain(index + 1);
      });
    });
  });

  it('should render pagination template', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination .size=${10}></more-facets-pagination>`
    );

    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-pagination')).to.exist;
    expect(el.shadowRoot?.querySelector('.arrow-icon')).to.exist;
  });

  it('should render page numbers', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination .size=${3}></more-facets-pagination>`
    );

    await el.updateComplete;

    const pageNumberElement = el.shadowRoot?.querySelector('.page-numbers');
    expect(pageNumberElement).to.exist;
    expect(pageNumberElement?.querySelectorAll('button').length).to.equal(3);
  });

  it('check current page and total pages', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination
        .size=${4}
        .currentPage=${2}
      ></more-facets-pagination>`
    );

    await el.updateComplete;

    const pageNumberElement = el.shadowRoot?.querySelector('.page-numbers');
    expect(pageNumberElement).to.exist;
    expect(
      pageNumberElement
        ?.querySelectorAll('button')[1]
        .classList.contains('current')
    ).to.be.true;
    expect(el.pages?.length).to.equal(4);
  });

  it('get page numbers based of size and currentPage', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination
        .size=${4}
        .currentPage=${2}
      ></more-facets-pagination>`
    );

    await el.updateComplete;

    expect(el.pages?.length).to.equal(4);
  });

  it('page number clicked event', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    await el.updateComplete;

    setTimeout(() =>
      el.dispatchEvent(
        new CustomEvent('pageNumberClicked', { detail: { page: 15 } })
      )
    );
    const { detail } = await oneEvent(el, 'pageNumberClicked');
    expect(detail?.page).to.equal(15);
  });
});
