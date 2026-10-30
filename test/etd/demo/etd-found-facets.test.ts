import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import '../../../src/etd/demo/etd-found-facets';
import type { EtdFoundFacets } from '../../../src/etd/demo/etd-found-facets';
import type {
  EtdEngine,
  EtdQuery,
  EtdRecord,
} from '../../../src/etd/etd-engine';
import type { EtdRequest } from '../../../src/etd/etd-query';

/** 40 results: four repositories that repeat, and an author each. */
const RECORDS: EtdRecord[] = [
  ...Array(16).fill('ethos.bl.uk'),
  ...Array(12).fill('tel.archives-ouvertes.fr'),
  ...Array(8).fill('epic.awi.de'),
  ...Array(4).fill('dspace.mit.edu'),
].map((domain, i) => ({
  docId: i + 1,
  title: `Thesis ${i + 1}`,
  creators: `Author ${i}, A.`,
  date: i % 2 ? '2014' : '2003',
  domain,
  url: '',
}));

const SEA_ICE: EtdRequest = { text: 'sea ice', filters: {}, ignoredFields: [] };

/**
 * An engine whose queries sample from RECORDS, as if from `of` matches;
 * `queries` lists each query's text, `fail` makes them fail.
 */
function fakeEngine(
  of: number,
  options: { sample?: boolean; fail?: string } = {},
) {
  const queries: string[] = [];
  const engine: EtdEngine = {
    ready: Promise.resolve(),
    record: async () => undefined,
    async query(text) {
      queries.push(text);
      if (options.fail) throw new Error(options.fail);
      const query: EtdQuery = {
        result: { total: of, approximate: false, reachable: of },
        next: async () => [],
        facets: async () => ({ year: {}, facets: {} }),
      };
      if (options.sample !== false) {
        query.sample = async count => ({
          records: RECORDS.slice(0, count),
          of,
        });
      }
      return query;
    },
  };
  return { engine, queries };
}

async function drawer(engine: EtdEngine, request: EtdRequest = SEA_ICE) {
  return fixture<EtdFoundFacets>(
    html`<etd-found-facets
      .engine=${engine}
      .request=${request}
    ></etd-found-facets>`,
  );
}

const text = (node: Element | null | undefined) =>
  node?.textContent?.replace(/\s+/g, ' ').trim() ?? '';

const bar = (el: EtdFoundFacets) =>
  text(el.shadowRoot!.querySelector('summary'));

const rows = (el: EtdFoundFacets) =>
  [...el.shadowRoot!.querySelectorAll('.group')].map(text);

/** Opens the drawer and waits for it to finish counting. */
async function open(el: EtdFoundFacets) {
  el.shadowRoot!.querySelector('details')!.open = true;
  await waitUntil(
    () => !/open to count|counting/.test(bar(el)),
    'the drawer never finished counting',
  );
}

describe('etd-found-facets', () => {
  it('reads nothing until it’s opened', async () => {
    const { engine, queries } = fakeEngine(77112);
    const el = await drawer(engine);
    expect(bar(el)).to.equal('Facets found in the results: open to count them');
    expect(queries).to.be.empty;
  });

  it('names the groups found, with estimates for every match', async () => {
    const { engine } = fakeEngine(77112);
    const el = await drawer(engine);
    await open(el);

    expect(bar(el)).to.equal(
      'Facets found in the results: Repository, Decade (estimated from 40 of 77,112)',
    );
    expect(text(el.shadowRoot!.querySelector('.note'))).to.match(
      /^Counted from 40 results picked at random, of 77,112, in [\d.]+ s\. Counts are estimates for all 77,112\.$/,
    );
    // 16 of 40 sampled: about 40% of 77,112. Screen readers hear "about".
    expect(rows(el)[0]).to.equal(
      'Repository ethos.bl.uk ~about 30,845 tel.archives-ouvertes.fr ~about 23,134 epic.awi.de ~about 15,422 dspace.mit.edu ~about 7,711',
    );
    expect(text(el.shadowRoot!.querySelector('.not-groups'))).to.equal(
      'Not groups: Creator, mostly one-offs: 40 values in 40 results',
    );
  });

  it('gives exact counts when it read every match', async () => {
    const { engine } = fakeEngine(40);
    const el = await drawer(engine);
    await open(el);

    expect(bar(el)).to.equal(
      'Facets found in the results: Repository, Decade (all 40 counted)',
    );
    expect(rows(el)[1]).to.equal('Decade 2000s 20 2010s 20');
  });

  it('reads a search once, and again only when the search changes', async () => {
    const { engine, queries } = fakeEngine(77112);
    const el = await drawer(engine);
    await open(el);
    expect(queries).to.deep.equal(['sea ice']);

    el.request = { ...SEA_ICE }; // the same search, a new object
    await el.updateComplete;
    expect(queries).to.deep.equal(['sea ice']);

    el.request = { ...SEA_ICE, text: 'permafrost' };
    await waitUntil(() => queries.length === 2);
    expect(queries).to.deep.equal(['sea ice', 'permafrost']);
  });

  it('says so when the engine can’t sample', async () => {
    const { engine } = fakeEngine(77112, { sample: false });
    const el = await drawer(engine);
    await open(el);
    expect(bar(el)).to.equal(
      "Facets found in the results: this search can't sample",
    );
  });

  it('says why when reading fails, and tries again next time', async () => {
    const failing = fakeEngine(77112, { fail: 'archive.org returned 503' });
    const el = await drawer(failing.engine);
    await open(el);
    expect(text(el.shadowRoot!.querySelector('.note'))).to.equal(
      "Couldn't count them: archive.org returned 503",
    );

    const working = fakeEngine(77112);
    el.engine = working.engine;
    await waitUntil(() => /Repository/.test(bar(el)));
    expect(working.queries).to.deep.equal(['sea ice']);
  });
});
