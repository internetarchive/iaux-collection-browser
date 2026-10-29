import { expect, fixture, html } from '@open-wc/testing';
import { Aggregation } from '@internetarchive/search-service';
import '../../../src/etd/demo/etd-facet-summary';
import type { EtdFacetSummary } from '../../../src/etd/demo/etd-facet-summary';
import type { ObservedFacets } from '../../../src/etd/demo/observe-facets';
import type { ExtraFacetGroup } from '../../../src/models';

const GROUPS: ExtraFacetGroup[] = [
  { key: 'language', title: 'Language', pluralTitle: 'Languages' },
  { key: 'country', title: 'Country', pluralTitle: 'Countries' },
  {
    key: 'availability',
    title: 'Availability (all that apply)',
    pluralTitle: 'Availability',
  },
];

function terms(...buckets: [string, number][]) {
  return new Aggregation({
    buckets: buckets.map(([key, doc_count]) => ({ key, doc_count })),
  });
}

/** The results of a "sea ice" search, as collection-browser got them. */
const LOADED: ObservedFacets = {
  state: 'loaded',
  aggregations: {
    language: terms(
      ['English', 51203],
      ['Portuguese', 870],
      ['Spanish', 412],
      ['German', 300],
      ['French', 120],
    ),
    country: terms(),
    availability: terms(['Has live link', 70114], ['Has abstract', 60882]),
    // collection-browser's own facets: not summarized
    mediatype: terms(['texts', 77112]),
    year_histogram: new Aggregation({ buckets: [1, 2, 3] }),
  },
};

async function summary(facets?: ObservedFacets, groups = GROUPS) {
  return fixture<EtdFacetSummary>(
    html`<etd-facet-summary
      .groups=${groups}
      .facets=${facets}
    ></etd-facet-summary>`,
  );
}

/** Each group's title and its shown text, whitespace collapsed. */
function rows(el: EtdFacetSummary): string[] {
  return [...el.shadowRoot!.querySelectorAll('.group')].map(group =>
    group.textContent!.replace(/\s+/g, ' ').trim(),
  );
}

/** The drawer bar's text, whitespace collapsed. */
function bar(el: EtdFacetSummary): string {
  return el
    .shadowRoot!.querySelector('summary')!
    .textContent!.replace(/\s+/g, ' ')
    .trim();
}

describe('etd-facet-summary', () => {
  it('names each of the service’s facets with its top three values and counts', async () => {
    const el = await summary(LOADED);
    expect(rows(el)[0]).to.equal(
      'Language English 51,203 Portuguese 870 Spanish 412 +2 more of the top 5',
    );
  });

  it('lists only the service’s own groups, in their order', async () => {
    const el = await summary(LOADED);
    const keys = [...el.shadowRoot!.querySelectorAll('.group')].map(
      group => (group as HTMLElement).dataset.key,
    );
    expect(keys).to.deep.equal(['language', 'country', 'availability']);
  });

  it('says when a facet has no values in these results', async () => {
    const el = await summary(LOADED);
    expect(rows(el)[1]).to.equal('Country none in these results');
  });

  it('keeps an "all" facet’s marked title, with no "more" when all fit', async () => {
    const el = await summary(LOADED);
    expect(rows(el)[2]).to.equal(
      'Availability (all that apply) Has live link 70,114 Has abstract 60,882',
    );
  });

  it('says it’s loading, or that facets failed', async () => {
    const loading = await summary({ state: 'loading' });
    expect(loading.shadowRoot!.textContent).to.include('Loading facets…');
    const failed = await summary({ state: 'failed' });
    expect(failed.shadowRoot!.textContent).to.include("Facets didn't load.");
  });

  it('announces updates politely', async () => {
    const el = await summary(LOADED);
    expect(
      el.shadowRoot!.querySelector('[aria-live]')?.getAttribute('aria-live'),
    ).to.equal('polite');
  });

  it('shows nothing for a service with no facets of its own', async () => {
    const el = await summary(LOADED, []);
    expect(el.shadowRoot!.querySelector('details')).to.be.null;
  });

  it('is a drawer, closed until its bar is clicked', async () => {
    const el = await summary(LOADED);
    const details = el.shadowRoot!.querySelector('details')!;
    const bar = details.querySelector('summary')!;
    expect(bar.textContent!.trim()).to.match(/^Facets used in these results:/);
    expect(details.open).to.be.false;
    bar.click();
    expect(details.open).to.be.true;
  });

  it('names on its bar the facets these results use, leaving out empty ones', async () => {
    const el = await summary(LOADED);
    expect(bar(el)).to.equal(
      'Facets used in these results: Language, Availability (all that apply)',
    );
  });

  it('says on its bar when facets are loading, failed, or none are used', async () => {
    expect(bar(await summary({ state: 'loading' }))).to.equal(
      'Facets used in these results: loading…',
    );
    expect(bar(await summary({ state: 'failed' }))).to.equal(
      "Facets used in these results: didn't load",
    );
    const empty: ObservedFacets = {
      state: 'loaded',
      aggregations: { language: terms(), country: terms(['Brazil', 0]) },
    };
    expect(bar(await summary(empty))).to.equal(
      'Facets used in these results: none',
    );
  });

  it('stays open across searches once opened', async () => {
    const el = await summary(LOADED);
    el.shadowRoot!.querySelector('summary')!.click();
    el.facets = { state: 'loading' };
    await el.updateComplete;
    el.facets = LOADED;
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('details')!.open).to.be.true;
  });

  it('is accessible, closed and open', async () => {
    const el = await summary(LOADED);
    await expect(el).to.be.accessible();
    el.shadowRoot!.querySelector('summary')!.click();
    await expect(el).to.be.accessible();
  });
});
