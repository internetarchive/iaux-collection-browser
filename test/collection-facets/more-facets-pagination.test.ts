/* eslint-disable import/no-duplicates */
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
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

  describe('Clicking a page', () => {
    it('fires event', async () => {
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
    it('sets off side effects with `onChange`', async () => {
      const el = await fixture<MoreFacetsPagination>(
        html`<more-facets-pagination .size=${'10'}></more-facets-pagination>`
      );

      const fake1 = sinon.fake();
      const fake2 = sinon.fake();
      el.observePageCount = fake1;
      el.emitPageClick = fake2;

      el.currentPage = 2;
      await el.updateComplete;
      expect(el.currentPage).to.equal(2); // move current page up

      // select first page button
      const pageButton = el.shadowRoot?.querySelector(
        '.page-numbers > button'
      ) as HTMLButtonElement;
      // confirm button isn't selected
      expect(pageButton.classList.contains('current')).to.be.false;
      pageButton.click();

      await el.updateComplete;

      expect(fake1.callCount).to.equal(1);
      expect(fake2.callCount).to.equal(1);
      expect(el.currentPage).to.equal(1); // brings us back to currentPage
      // confirm button is selected
      expect(pageButton.classList.contains('current')).to.be.true;
    });
  });
});
