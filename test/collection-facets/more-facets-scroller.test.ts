import { expect, fixture, oneEvent, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import type { MoreFacetsScroller } from '../../src/collection-facets/more-facets-scroller';
import '../../src/collection-facets/more-facets-scroller';
import type { FacetBucket, FacetEventDetails } from '../../src/models';

const COL_WIDTH = 250;

function makeBuckets(n: number): FacetBucket[] {
  return Array.from({ length: n }, (_, i) => ({
    key: `value-${i}`,
    count: n - i,
    state: 'none',
  }));
}

/**
 * Renders a scroller wide enough for three columns per page. With 1000
 * buckets in columns of 12, that's 84 columns over 28 pages.
 */
async function createScroller({
  buckets = makeBuckets(1000),
  rowsPerColumn = 12,
} = {}): Promise<MoreFacetsScroller> {
  const wrapper = await fixture<HTMLDivElement>(
    html`<div style="width: 900px">
      <more-facets-scroller
        .facetType=${'subject'}
        .buckets=${buckets}
        .rowsPerColumn=${rowsPerColumn}
      ></more-facets-scroller>
    </div>`,
  );
  const el = wrapper.querySelector(
    'more-facets-scroller',
  ) as MoreFacetsScroller;
  await waitUntil(
    () => buckets.length === 0 || el.shadowRoot?.querySelector('.page'),
    'pages never rendered',
  );
  await el.updateComplete;
  return el;
}

function scrollerOf(el: MoreFacetsScroller): HTMLElement {
  return el.shadowRoot?.querySelector('.scroller') as HTMLElement;
}

function mountedPages(el: MoreFacetsScroller): number[] {
  const pages = el.shadowRoot?.querySelectorAll<HTMLElement>('.page') ?? [];
  return [...pages].map(p => Number(p.dataset.page));
}

function checkbox(
  el: MoreFacetsScroller,
  key: string,
  kind: 'select' | 'hide' = 'select',
): HTMLInputElement {
  const inputs = el.shadowRoot?.querySelectorAll<HTMLInputElement>(
    `.${kind}-facet-checkbox`,
  );
  return [...(inputs ?? [])].find(i => i.value === key) as HTMLInputElement;
}

async function restOnPage(el: MoreFacetsScroller, page: number) {
  el.scrollToPage(page);
  await waitUntil(() => el.currentPage === page, `never rested on ${page}`);
  await el.updateComplete;
}

describe('More facets scroller', () => {
  it('fits a whole number of columns in the viewport', async () => {
    const el = await createScroller();

    expect(scrollerOf(el).clientWidth).to.equal(3 * COL_WIDTH);
    expect(el.pageCount).to.equal(28);
  });

  it('renders a snap stub for every page, but rows only near the viewport', async () => {
    const el = await createScroller();
    const root = el.shadowRoot as ShadowRoot;

    expect(root.querySelectorAll('.snap-stub')).to.have.length(28);
    expect(mountedPages(el)).to.deep.equal([0, 1, 2]);
    expect(root.querySelectorAll('.facet-row-container')).to.have.length(
      3 * 3 * 12,
    );
  });

  it('renders rows as plain DOM rather than an element per row', async () => {
    const el = await createScroller();

    expect(el.shadowRoot?.querySelectorAll('facet-row')).to.have.length(0);
    expect(
      el.shadowRoot?.querySelectorAll('.facet-row-container').length,
    ).to.be.greaterThan(0);
  });

  it('stacks buckets top to bottom in columns of rowsPerColumn', async () => {
    const el = await createScroller({ rowsPerColumn: 5 });
    const columns = el.shadowRoot?.querySelectorAll(
      '.page[data-page="0"] .column',
    );
    const keysIn = (col?: Element) =>
      [
        ...(col?.querySelectorAll<HTMLInputElement>('.select-facet-checkbox') ??
          []),
      ].map(i => i.value);

    expect(columns).to.have.length(3);
    expect(keysIn(columns?.[0])).to.deep.equal([
      'value-0',
      'value-1',
      'value-2',
      'value-3',
      'value-4',
    ]);
    expect(keysIn(columns?.[1])[0]).to.equal('value-5');
    expect(el.pageCount).to.equal(Math.ceil(200 / 3));
  });

  it('keeps the number of mounted pages flat while scrolling end to end', async () => {
    const el = await createScroller();
    const root = el.shadowRoot as ShadowRoot;
    const nodeCounts: number[] = [];

    for (const page of [5, 10, 15, 20]) {
      await restOnPage(el, page);
      expect(mountedPages(el)).to.deep.equal([
        page - 1,
        page,
        page + 1,
        page + 2,
      ]);
      nodeCounts.push(root.querySelectorAll('*').length);
    }
    expect(new Set(nodeCounts).size).to.equal(1);

    await restOnPage(el, 27);
    expect(mountedPages(el)).to.deep.equal([26, 27]);
  });

  it('keeps the same element for a page that stays mounted', async () => {
    const el = await createScroller();
    const page1 = el.shadowRoot?.querySelector('.page[data-page="1"]');

    await restOnPage(el, 1);

    expect(el.shadowRoot?.querySelector('.page[data-page="1"]')).to.equal(
      page1,
    );
  });

  it('eases a release partway through a page to the nearest page boundary', async () => {
    const el = await createScroller();
    const scroller = scrollerOf(el);
    const pageWidth = 3 * COL_WIDTH;

    scroller.scrollLeft = 3 * pageWidth + 500; // Two-thirds into page 3
    await waitUntil(() => el.currentPage === 4, 'did not ease forward');
    expect(scroller.scrollLeft).to.equal(4 * pageWidth);

    scroller.scrollLeft = 4 * pageWidth + 200; // A quarter into page 4
    await waitUntil(
      () => scroller.scrollLeft === 4 * pageWidth,
      'did not ease back',
    );
    expect(el.currentPage).to.equal(4);
  });

  it('emits facetClick with the new state when a row is checked', async () => {
    const el = await createScroller();

    setTimeout(() => checkbox(el, 'value-0').click());
    const selected = await oneEvent(el, 'facetClick');
    expect((selected as CustomEvent<FacetEventDetails>).detail).to.deep.equal({
      facetType: 'subject',
      bucket: { key: 'value-0', count: 1000, state: 'selected' },
      negative: false,
    });

    setTimeout(() => checkbox(el, 'value-1', 'hide').click());
    const hidden = await oneEvent(el, 'facetClick');
    expect((hidden as CustomEvent<FacetEventDetails>).detail).to.deep.include({
      negative: true,
    });
    expect(
      (hidden as CustomEvent<FacetEventDetails>).detail.bucket.state,
    ).to.equal('hidden');
  });

  it('reflects bucket states in the checkboxes', async () => {
    const buckets = makeBuckets(50);
    buckets[0] = { ...buckets[0], state: 'selected' };
    buckets[1] = { ...buckets[1], state: 'hidden' };
    const el = await createScroller({ buckets });

    expect(checkbox(el, 'value-0').checked).to.be.true;
    expect(checkbox(el, 'value-1', 'hide').checked).to.be.true;
    expect(checkbox(el, 'value-2').checked).to.be.false;
  });

  it('emits pageChanged only when resting on a different page', async () => {
    const el = await createScroller();
    const landed: number[] = [];
    el.addEventListener('pageChanged', e =>
      landed.push((e as CustomEvent<number>).detail),
    );

    await restOnPage(el, 2);
    el.scrollToPage(2);
    await restOnPage(el, 3);

    expect(landed).to.deep.equal([2, 3]);
  });

  it('pages with the arrow buttons', async () => {
    const el = await createScroller();
    const prev = el.shadowRoot?.querySelector(
      '.scroll-arrow.prev',
    ) as HTMLButtonElement;
    const next = el.shadowRoot?.querySelector(
      '.scroll-arrow.next',
    ) as HTMLButtonElement;
    expect(prev.disabled).to.be.true;
    expect(next.disabled).to.be.false;

    next.click();
    await waitUntil(() => el.currentPage === 1, 'next did not move');
    await el.updateComplete;
    expect(prev.disabled).to.be.false;

    await restOnPage(el, 27);
    expect(next.disabled).to.be.true;

    prev.click();
    await waitUntil(() => el.currentPage === 26, 'prev did not move');
  });

  it('hides the arrow buttons when every value fits on one page', async () => {
    const el = await createScroller({ buckets: makeBuckets(10) });
    const arrows = el.shadowRoot?.querySelectorAll('.scroll-arrow');

    expect(el.pageCount).to.equal(1);
    expect(arrows).to.have.length(2);
    arrows?.forEach(a => expect(a.classList.contains('unneeded')).to.be.true);
  });

  it('moves focus to the scroller when the focused row is about to be removed', async () => {
    const el = await createScroller();
    checkbox(el, 'value-0').focus();

    await restOnPage(el, 10);

    expect(el.shadowRoot?.activeElement).to.equal(scrollerOf(el));
  });

  it('renders no pages for an empty list', async () => {
    const el = await createScroller({ buckets: [] });

    expect(el.pageCount).to.equal(0);
    expect(el.shadowRoot?.querySelectorAll('.page')).to.have.length(0);
    expect(el.shadowRoot?.querySelectorAll('.snap-stub')).to.have.length(0);
  });
});
