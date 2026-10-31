import { expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import '../../../src/serverless-search/demo/serverless-search-demo';
import sinon from 'sinon';
import {
  DL_PRESET_QUERIES,
  ETD_PRESET_QUERIES,
  type SearchChangedDetail,
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
    expect(toggle.textContent?.trim()).to.equal('Hide demo controls');

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
    expect(toggle.textContent?.trim()).to.equal('Show demo controls');
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

  it('opens on the detailed list, whatever archive.org-wide cookies say', async () => {
    // What archive.org's own search leaves after someone picks tiles
    document.cookie = 'view-search=tiles; path=/';
    const { el } = await demoAt('?etd_compare=0');
    await el.collectionBrowser?.updateComplete;

    expect(el.collectionBrowser?.displayMode).to.equal('list-detail');
    document.cookie = 'view-search=; path=/; max-age=0';
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

  it('marks the preset the url searches, and follows a new search', async () => {
    const { el, root, panel } = await demoAt('?etd_compare=0&query=sea+ice');
    const pressed = () =>
      [
        ...panel.querySelectorAll('#etd-presets button[aria-pressed="true"]'),
      ].map(b => b.textContent?.trim());
    await waitUntil(() => pressed().length > 0, 'no preset marked');
    expect(pressed()).to.deep.equal(['sea ice']);
    panel
      .querySelectorAll('#etd-presets button[aria-pressed="false"]')
      .forEach(b => expect(b.textContent?.trim()).to.not.equal('sea ice'));

    (
      panel.querySelectorAll('#etd-presets button')[3] as HTMLButtonElement
    ).click();
    await el.updateComplete;
    expect(pressed()).to.deep.equal(['machine learning']);

    const form = root.querySelector('#etd-search') as HTMLFormElement;
    (form.querySelector('#etd-query-field') as HTMLInputElement).value =
      'not a preset';
    form.requestSubmit();
    await el.updateComplete;
    expect(pressed()).to.deep.equal([]);
  });

  it('marks the browse link the url opens on', async () => {
    const current = (panel: HTMLElement) =>
      [...panel.querySelectorAll('#etd-browse a[aria-current="true"]')].map(a =>
        a.textContent?.trim(),
      );

    const decade = await demoAt(
      `?etd_compare=0&and[]=${encodeURIComponent('year:[2000 TO 2009]')}`,
    );
    await waitUntil(
      () => current(decade.panel).length > 0,
      'no browse link marked',
    );
    expect(current(decade.panel)).to.deep.equal(['From the 2000s']);

    const portuguese = await demoAt(
      `?etd_compare=0&and[]=${encodeURIComponent('language:"Portuguese"')}`,
    );
    await waitUntil(
      () => current(portuguese.panel).length > 0,
      'no browse link marked',
    );
    expect(current(portuguese.panel)).to.deep.equal(['In Portuguese']);
  });

  it('marks no browse link when there is also a query', async () => {
    const { el, panel } = await demoAt(
      `?etd_compare=0&query=sea+ice&and[]=${encodeURIComponent('year:[2000 TO 2009]')}`,
    );
    // Wait for the search itself, so the check isn't before it arrives.
    await waitUntil(
      () =>
        (el as unknown as { searchParams?: { query?: string } }).searchParams
          ?.query === 'sea ice',
      'search not sent',
    );
    await el.updateComplete;
    expect(
      panel.querySelectorAll('#etd-browse a[aria-current]'),
    ).to.have.length(0);
  });

  it('shows no presets for another item, since they are about etd-search', async () => {
    const { panel } = await demoAt('?etd_item=some-other-item&etd_compare=0');

    expect(panel.querySelector('#etd-presets')).to.be.null;
    // The rest of the panel is still there
    expect(panel.querySelector('form#etd-search')).to.exist;
  });

  it('fills in the panel for an item read straight from archive.org', async () => {
    const { panel } = await demoAt(
      `?etd_compare=0&etd_base_url=${encodeURIComponent('https://archive.org/download/dl-search/')}`,
    );
    const field = panel.querySelector('#etd-item-field') as HTMLInputElement;
    expect(field.value).to.equal('dl-search');
    const pressed = panel.querySelector(
      '#known-items button[aria-pressed="true"]',
    ) as HTMLButtonElement;
    expect(pressed?.value).to.equal('dl-search');
    const presets = [...panel.querySelectorAll('#etd-presets button')].map(b =>
      b.textContent?.trim(),
    );
    expect(presets).to.deep.equal(DL_PRESET_QUERIES);
    expect(
      panel.querySelector('etd-file-check')?.getAttribute('itemid'),
    ).to.equal('dl-search');
  });

  it('shows no presets for an index given by etd_base_url', async () => {
    const { panel } = await demoAt(
      '?etd_base_url=https://example.org/index/&etd_compare=0',
    );

    expect(panel.querySelector('#etd-presets')).to.be.null;
  });

  it("shows dl-search's own presets when searching dl-search", async () => {
    const { panel } = await demoAt('?etd_item=dl-search&etd_compare=0');

    const labels = [...panel.querySelectorAll('#etd-presets button')].map(b =>
      b.textContent?.trim(),
    );
    expect(labels).to.deep.equal(DL_PRESET_QUERIES);
  });

  it('marks which known item is being searched', async () => {
    const { panel } = await demoAt('?etd_item=dl-search&etd_compare=0');
    const group = panel.querySelector('#known-items[role="group"]');
    expect(group?.getAttribute('aria-labelledby')).to.equal(
      'known-items-label',
    );

    const pressed = [...(group?.querySelectorAll('button') ?? [])].map(b => [
      b.value,
      b.getAttribute('aria-pressed'),
    ]);
    expect(pressed).to.deep.equal([
      ['etd-search', 'false'],
      ['dl-search', 'true'],
    ]);
  });

  it('checks a known item when it is picked, as if typed in', async () => {
    // The check fails, so the demo says why and stays on this page
    const fetchStub = sinon
      .stub(window, 'fetch')
      .resolves(new Response('', { status: 404 }));
    try {
      const { el, panel } = await demoAt('?etd_compare=0');
      const dl = panel.querySelector(
        '#known-items button[value="dl-search"]',
      ) as HTMLButtonElement;

      dl.click();
      await el.updateComplete;

      const field = panel.querySelector('#etd-item-field') as HTMLInputElement;
      expect(field.value).to.equal('dl-search');
      // Its current.json is checked; the demo's own index loads alongside
      const checked = fetchStub
        .getCalls()
        .map(call => String(call.args[0]))
        .filter(url => url.includes('dl-search'));
      expect(checked).to.have.length(1);
      expect(checked[0]).to.include('/item-index/dl-search/current.json');
    } finally {
      fetchStub.restore();
    }
  });

  describe('for an item with no vector index', () => {
    let fetchStub: sinon.SinonStub;

    beforeEach(() => {
      const realFetch = window.fetch.bind(window);
      fetchStub = sinon
        .stub(window, 'fetch')
        .callsFake((input, init) =>
          String(input).includes('ivf-meta.json')
            ? Promise.resolve(new Response('', { status: 404 }))
            : realFetch(input, init),
        );
    });

    afterEach(() => {
      fetchStub.restore();
    });

    it('disables ranking by meaning, and says why', async () => {
      const { el, root } = await demoAt('?etd_compare=0');
      const meaning = root.querySelector(
        '#etd-rank input[value="vector"]',
      ) as HTMLInputElement;
      await waitUntil(() => meaning.disabled, 'meaning never disabled');
      await el.updateComplete;

      const note = root.querySelector('#etd-rank-no-vector');
      expect(meaning.getAttribute('aria-describedby')).to.equal(
        'etd-rank-no-vector',
      );
      expect(note?.textContent?.trim()).to.equal(
        'This item has no vector index.',
      );
      const words = root.querySelector(
        '#etd-rank input[value="text"]',
      ) as HTMLInputElement;
      expect(words.disabled).to.be.false;
      expect(words.checked).to.be.true;
    });

    it('ranks by words when the url asks for meaning', async () => {
      const { el, root } = await demoAt('?etd_rank=vec&etd_compare=0');
      await waitUntil(
        () =>
          (
            root.querySelector(
              '#etd-rank input[value="text"]',
            ) as HTMLInputElement
          ).checked,
        'never fell back to words',
      );
      await el.updateComplete;

      expect(new URL(window.location.href).searchParams.has('etd_rank')).to.be
        .false;
      expect(el.collectionBrowser?.searchService).to.exist;
    });
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

    // This item has a vector index
    const realFetch = window.fetch.bind(window);
    const fetchStub = sinon
      .stub(window, 'fetch')
      .callsFake((input, init) =>
        String(input).includes('ivf-meta.json')
          ? Promise.resolve(new Response('{}'))
          : realFetch(input, init),
      );
    try {
      await fixture<ServerlessSearchDemo>(
        html`<serverless-search-demo
          .workerFactory=${workerFactory}
        ></serverless-search-demo>`,
      );

      await waitUntil(() => workers.length > 0, 'no worker started');
      expect(workers).to.have.length(1);
    } finally {
      fetchStub.restore();
      workers.forEach(worker => worker.terminate());
    }
  });

  it('links the docs it is given, and none when given none', async () => {
    const linked = await demoAt('', 'https://example.org/how.html');
    const link = linked.panel.querySelector('#etd-docs a');
    expect(link?.getAttribute('href')).to.equal('https://example.org/how.html');

    const unlinked = await demoAt('', '');
    expect(unlinked.panel.querySelector('#etd-docs')).to.be.null;
  });

  describe('for a host with its own search bar', () => {
    it('leaves out the search box and the words/meaning switch, keeping the rest', async () => {
      window.history.replaceState(null, '', '?etd_compare=0');
      const el = await fixture<ServerlessSearchDemo>(
        html`<serverless-search-demo hide-search-box></serverless-search-demo>`,
      );
      const root = el.shadowRoot as ShadowRoot;
      expect(root.querySelector('#etd-search')).to.be.null;
      expect(root.querySelector('#etd-rank')).to.be.null;
      expect(root.querySelector('#etd-item')).to.exist;
      expect(root.querySelector('#etd-presets')).to.exist;
    });

    it("shows a host's search bar on top of the results", async () => {
      window.history.replaceState(null, '', '?etd_compare=0');
      const el = await fixture<ServerlessSearchDemo>(
        html`<serverless-search-demo hide-search-box>
          <form slot="search-bar" id="host-bar"></form>
        </serverless-search-demo>`,
      );
      const root = el.shadowRoot as ShadowRoot;
      const slot = root.querySelector(
        'slot[name="search-bar"]',
      ) as HTMLSlotElement;
      expect(slot.assignedElements().map(e => e.id)).to.deep.equal([
        'host-bar',
      ]);
      // Between the panel and the results
      const container = root.querySelector('#collection-browser-container');
      expect(slot.parentElement).to.equal(container);
      expect(slot.nextElementSibling?.localName).to.equal('collection-browser');
    });

    it('searches when told to, and says so', async () => {
      const { el } = await demoAt('?etd_compare=0');
      const heard: SearchChangedDetail[] = [];
      el.addEventListener('searchChanged', e =>
        heard.push((e as CustomEvent<SearchChangedDetail>).detail),
      );

      el.search('sea ice');
      await el.updateComplete;

      expect(el.query).to.equal('sea ice');
      expect(el.collectionBrowser?.baseQuery).to.equal('sea ice');
      expect(heard.at(-1)).to.include({
        item: 'etd-search',
        query: 'sea ice',
        rank: 'text',
      });
      expect(el.item).to.equal('etd-search');
    });

    it('tells the host when a preset changes the search', async () => {
      const { el, panel } = await demoAt('?etd_compare=0');
      const heard: SearchChangedDetail[] = [];
      el.addEventListener('searchChanged', e =>
        heard.push((e as CustomEvent<SearchChangedDetail>).detail),
      );

      (panel.querySelector('#etd-presets button') as HTMLButtonElement).click();
      await el.updateComplete;

      expect(heard.at(-1)?.query).to.equal(ETD_PRESET_QUERIES[0]);
    });

    it('ranks by meaning when told to, keeping the query and the url in step', async () => {
      const workers: Worker[] = [];
      const workerFactory = () => {
        const blob = new Blob([''], { type: 'text/javascript' });
        const worker = new Worker(URL.createObjectURL(blob), {
          type: 'module',
        });
        workers.push(worker);
        return worker;
      };
      const realFetch = window.fetch.bind(window);
      const fetchStub = sinon
        .stub(window, 'fetch')
        .callsFake((input, init) =>
          String(input).includes('ivf-meta.json')
            ? Promise.resolve(new Response('{}'))
            : realFetch(input, init),
        );
      try {
        window.history.replaceState(null, '', '?etd_compare=0&query=sea+ice');
        const el = await fixture<ServerlessSearchDemo>(
          html`<serverless-search-demo
            hide-search-box
            .workerFactory=${workerFactory}
          ></serverless-search-demo>`,
        );
        await waitUntil(() => el.hasVectorIndex === true, 'never checked');
        const heard: SearchChangedDetail[] = [];
        el.addEventListener('searchChanged', e =>
          heard.push((e as CustomEvent<SearchChangedDetail>).detail),
        );

        el.rankBy('vector');
        await el.updateComplete;

        expect(el.rank).to.equal('vector');
        expect(
          new URL(window.location.href).searchParams.get('etd_rank'),
        ).to.equal('vec');
        expect(heard.at(-1)).to.include({
          rank: 'vector',
          hasVectorIndex: true,
        });
      } finally {
        fetchStub.restore();
        workers.forEach(worker => worker.terminate());
      }
    });

    it('says which item it searches, and none for an index elsewhere', async () => {
      const dl = await demoAt('?etd_compare=0&etd_item=dl-search');
      expect(dl.el.item).to.equal('dl-search');

      const elsewhere = await demoAt(
        '?etd_compare=0&etd_base_url=https://example.org/index/',
      );
      expect(elsewhere.el.item).to.be.undefined;
    });

    describe('for an item with no vector index', () => {
      let fetchStub: sinon.SinonStub;

      beforeEach(() => {
        const realFetch = window.fetch.bind(window);
        fetchStub = sinon
          .stub(window, 'fetch')
          .callsFake((input, init) =>
            String(input).includes('ivf-meta.json')
              ? Promise.resolve(new Response('', { status: 404 }))
              : realFetch(input, init),
          );
      });

      afterEach(() => {
        fetchStub.restore();
      });

      it('stays ranked by words when told to rank by meaning', async () => {
        const { el } = await demoAt('?etd_compare=0');
        await waitUntil(() => el.hasVectorIndex === false, 'never checked');

        el.rankBy('vector');
        await el.updateComplete;

        expect(el.rank).to.equal('text');
        expect(new URL(window.location.href).searchParams.has('etd_rank')).to.be
          .false;
      });
    });
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
