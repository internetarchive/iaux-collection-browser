import { expect, fixture, nextFrame, waitUntil } from '@open-wc/testing';
import sinon from 'sinon';
import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ref } from 'lit/directives/ref.js';
import { repeat } from 'lit/directives/repeat.js';
import { PageWindow } from '../../src/collection-facets/page-window';

const COL_WIDTH = 100;

/**
 * Minimal host for the controller: a 300px-wide scroller (three columns per
 * page) over 49 columns, so the last of its 17 pages holds a single column.
 * No snapping, so tests can park the scroller anywhere.
 */
@customElement('page-window-test-host')
class PageWindowTestHost extends LitElement {
  rests: number[] = [];

  renders = 0;

  win = new PageWindow(this, {
    colWidth: COL_WIDTH,
    total: 49,
    onRest: page => this.rests.push(page),
  });

  get scroller(): HTMLElement {
    return this.shadowRoot?.querySelector('.scroller') as HTMLElement;
  }

  render() {
    this.renders += 1;
    const w = this.win;
    const live: number[] = [];
    for (let i = w.first; i <= w.last; i++) live.push(i);
    return html`
      <div class="scroller" ${ref(w.attach)}>
        <div class="sizer" style="width:${w.totalWidth}px">
          ${repeat(
            live,
            i => i,
            i =>
              html`<div
                class="page"
                data-page=${i}
                style="left:${i * w.pageWidth}px;width:${w.pageSpan(i)}px"
              ></div>`,
          )}
        </div>
      </div>
    `;
  }

  static styles = css`
    .scroller {
      width: var(--scrollerWidth, 300px);
      height: 50px;
      overflow-x: auto;
      overflow-y: hidden;
    }
    .sizer {
      position: relative;
      height: 100%;
    }
    .page {
      position: absolute;
      top: 0;
      height: 100%;
    }
  `;
}

async function createHost(): Promise<PageWindowTestHost> {
  const el = await fixture<PageWindowTestHost>(
    html`<page-window-test-host></page-window-test-host>`,
  );
  await waitUntil(() => el.win.colsPerPage === 3, 'viewport never measured');
  await el.updateComplete;
  return el;
}

/** Scrolls the host and waits for the controller to catch up */
async function scrollHostTo(el: PageWindowTestHost, left: number) {
  el.scroller.scrollLeft = left;
  await nextFrame();
  await nextFrame();
  await el.updateComplete;
}

describe('PageWindow', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('derives the page size from the measured scroller width', async () => {
    const el = await createHost();
    const { win } = el;

    expect(win.colsPerPage).to.equal(3);
    expect(win.pageWidth).to.equal(300);
    expect(win.pageCount).to.equal(17);
    expect(win.totalWidth).to.equal(4900);
  });

  it('trims the partial last page so nothing extends past the total width', async () => {
    const el = await createHost();
    const { win } = el;

    expect(win.pageSpan(0)).to.equal(300);
    expect(win.pageSpan(16)).to.equal(100);
    expect(el.scroller.scrollWidth).to.equal(4900);
  });

  it('mounts the visible pages plus one buffer page on each side', async () => {
    const el = await createHost();
    expect([el.win.first, el.win.last]).to.deep.equal([0, 2]);

    await scrollHostTo(el, 1500); // Page 5
    expect([el.win.first, el.win.last]).to.deep.equal([4, 7]);
    const pages = el.shadowRoot?.querySelectorAll<HTMLElement>('.page') ?? [];
    const mounted = [...pages].map(p => Number(p.dataset.page));
    expect(mounted).to.deep.equal([4, 5, 6, 7]);
  });

  it('only re-renders when a scroll crosses a page boundary', async () => {
    const el = await createHost();
    await scrollHostTo(el, 1510);
    const rendersBefore = el.renders;

    // Several scrolls within the same page leave the window alone (and all
    // rest nearest to the same page)
    await scrollHostTo(el, 1560);
    await scrollHostTo(el, 1600);
    await scrollHostTo(el, 1640);
    expect(el.renders).to.equal(rendersBefore);

    // Crossing into the next page shifts it
    await scrollHostTo(el, 1810);
    expect(el.renders).to.be.greaterThan(rendersBefore);
    expect(el.win.first).to.equal(5);
  });

  it('reports the page the scroller comes to rest on', async () => {
    const el = await createHost();

    el.win.scrollToPage(4);
    await waitUntil(() => el.win.currentPage === 4, 'never rested on page 4');
    expect(el.scroller.scrollLeft).to.equal(1200);
    expect(el.rests).to.include(4);
  });

  it('counts resting at the far end as the last page, even when it is partial', async () => {
    const el = await createHost();

    // The last page starts at 4800, but the scroller can only reach 4600
    el.win.scrollToPage(16);
    await waitUntil(() => el.win.currentPage === 16, 'never reached the end');
    expect(el.scroller.scrollLeft).to.equal(4600);
  });

  it('clamps the window when the number of columns shrinks', async () => {
    const el = await createHost();

    el.win.setTotal(4);
    el.requestUpdate();
    await el.updateComplete;

    expect(el.win.pageCount).to.equal(2);
    expect([el.win.first, el.win.last]).to.deep.equal([0, 1]);
    expect(el.shadowRoot?.querySelectorAll('.page')).to.have.length(2);
  });

  it('keeps the leftmost column on screen when a resize changes the page size', async () => {
    const el = await createHost();
    await scrollHostTo(el, 900); // Page 3, whose first column is 9

    el.style.setProperty('--scrollerWidth', '200px');
    await waitUntil(() => el.win.colsPerPage === 2, 'resize never observed');
    await el.updateComplete;

    // Column 9 is on page 4 when pages are two columns wide
    expect(el.scroller.scrollLeft).to.equal(800);
    await waitUntil(() => el.win.currentPage === 4, 'did not land on page 4');
    expect(el.win.pageCount).to.equal(25);
  });

  it('stops listening once the host is disconnected', async () => {
    const el = await createHost();
    const { scroller } = el;
    const removeSpy = sinon.spy(scroller, 'removeEventListener');

    el.remove();

    expect(removeSpy.calledWith('scroll')).to.be.true;
  });

  it('listens again when the host is reconnected', async () => {
    const el = await createHost();
    const parent = el.parentElement as HTMLElement;
    el.remove();
    parent.appendChild(el);
    await el.updateComplete;

    await scrollHostTo(el, 1500);
    expect(el.win.first).to.equal(4);
  });
});
