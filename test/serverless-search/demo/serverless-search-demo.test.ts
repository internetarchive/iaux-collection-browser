import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../../../src/serverless-search/demo/serverless-search-demo';
import {
  ETD_PRESET_QUERIES,
  type ServerlessSearchDemo,
} from '../../../src/serverless-search/demo/serverless-search-demo';

const startUrl = window.location.href;

/** Renders the demo as a page would, after the url says `search`. */
async function demoAt(search: string, docsUrl?: string) {
  const url = new URL(startUrl);
  url.search = search;
  window.history.replaceState(null, '', url.href);
  const el = await fixture<ServerlessSearchDemo>(
    docsUrl === undefined
      ? html`<serverless-search-demo></serverless-search-demo>`
      : html`<serverless-search-demo
          .docsUrl=${docsUrl}
        ></serverless-search-demo>`,
  );
  const root = el.shadowRoot as ShadowRoot;
  const toggle = root.querySelector(
    '#toggle-etd-controls-btn',
  ) as HTMLButtonElement;
  const panel = root.querySelector('#etd-controls') as HTMLElement;
  return { el, root, toggle, panel };
}

describe('serverless-search-demo', () => {
  afterEach(() => {
    window.history.replaceState(null, '', startUrl);
  });

  it('shows the controls panel over its own collection-browser', async () => {
    const { el, root, toggle, panel } = await demoAt('');

    expect(panel.hidden).to.be.false;
    expect(toggle.getAttribute('aria-controls')).to.equal('etd-controls');
    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(toggle.textContent?.trim()).to.equal('Hide ETD controls');

    // Everything the demo's panel had: item picker, its own search box,
    // the facet summary and the comparison with the live page
    expect(panel.querySelector('form#etd-item')).to.exist;
    expect(panel.querySelector('form#etd-search[role="search"]')).to.exist;
    expect(panel.querySelector('etd-facet-summary')).to.exist;
    expect(panel.querySelector('etd-compare-panel')).to.exist;

    // Ranking by words or meaning sits in collection-browser's facets column
    const rank = root.querySelector('collection-browser > #etd-rank');
    expect(rank?.getAttribute('slot')).to.equal('facets-header-slot');
    expect(el.collectionBrowser).to.equal(
      root.querySelector('collection-browser'),
    );
  });

  it('hides and shows the panel, keeping the choice in the url', async () => {
    const { el, toggle, panel } = await demoAt('?search_service=etd');

    toggle.click();
    await el.updateComplete;
    expect(panel.hidden).to.be.true;
    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
    expect(toggle.textContent?.trim()).to.equal('Show ETD controls');
    const hiddenUrl = new URL(window.location.href);
    expect(hiddenUrl.searchParams.get('hide-etd-controls')).to.equal('true');
    expect(hiddenUrl.searchParams.get('search_service')).to.equal('etd');

    toggle.click();
    await el.updateComplete;
    expect(panel.hidden).to.be.false;
    expect(toggle.getAttribute('aria-expanded')).to.equal('true');
    expect(new URL(window.location.href).searchParams.has('hide-etd-controls'))
      .to.be.false;
  });

  it('starts with the panel hidden when the url says so', async () => {
    const { toggle, panel } = await demoAt('?hide-etd-controls=true');

    expect(panel.hidden).to.be.true;
    expect(toggle.getAttribute('aria-expanded')).to.equal('false');
  });

  it('leaves out the comparison for etd_compare=0', async () => {
    const { panel } = await demoAt('?etd_compare=0');

    expect(panel.querySelector('etd-compare-panel')).to.be.null;
    expect(panel.querySelector('form#etd-item')).to.exist;
  });

  it('runs a preset search, as if typed into the search box', async () => {
    const { el, root, panel } = await demoAt('?etd_compare=0');
    const group = panel.querySelector('#etd-presets[role="group"]');
    const label = panel.querySelector('#etd-presets-label');
    expect(group?.getAttribute('aria-labelledby')).to.equal(
      'etd-presets-label',
    );
    expect(label?.textContent?.trim()).to.equal('Try a search:');

    const buttons = [
      ...(group?.querySelectorAll('button') ?? []),
    ] as HTMLButtonElement[];
    expect(buttons.map(b => b.textContent?.trim())).to.deep.equal(
      ETD_PRESET_QUERIES,
    );
    // Buttons, not submits, so they never post the search form
    buttons.forEach(b => expect(b.type).to.equal('button'));

    const phrase = buttons[1];
    phrase.click();
    await el.updateComplete;

    expect(el.collectionBrowser?.baseQuery).to.equal('"sea ice" AND antarctic');
    const field = root.querySelector('#etd-query-field') as HTMLInputElement;
    expect(field.value).to.equal('"sea ice" AND antarctic');
  });

  it("starts a host's worker when the url opens on vector rank", async () => {
    // A host on another origin passes workerFactory, since the worker module
    // next to this file isn't same-origin there. It's set after the element
    // is constructed, so the vector engine has to wait for it.
    window.history.replaceState(null, '', '?etd_rank=vec&etd_compare=0');
    const workers: Worker[] = [];
    const workerFactory = () => {
      const blob = new Blob([''], { type: 'text/javascript' });
      const worker = new Worker(URL.createObjectURL(blob), { type: 'module' });
      workers.push(worker);
      return worker;
    };

    await fixture<ServerlessSearchDemo>(
      html`<serverless-search-demo
        .workerFactory=${workerFactory}
      ></serverless-search-demo>`,
    );

    expect(workers).to.have.length(1);
    workers.forEach(worker => worker.terminate());
  });

  it('links the docs it is given, and none when given none', async () => {
    const linked = await demoAt('', 'https://example.org/how.html');
    const link = linked.panel.querySelector('#etd-docs a');
    expect(link?.getAttribute('href')).to.equal('https://example.org/how.html');

    const unlinked = await demoAt('', '');
    expect(unlinked.panel.querySelector('#etd-docs')).to.be.null;
  });

  it('searches collection-browser from its own search box', async () => {
    const { el, panel } = await demoAt('?etd_compare=0');
    const form = panel.querySelector('#etd-search') as HTMLFormElement;
    const field = form.querySelector('#etd-query-field') as HTMLInputElement;

    field.value = 'sea ice';
    form.requestSubmit();
    await el.updateComplete;

    expect(el.collectionBrowser?.baseQuery).to.equal('sea ice');
  });
});
