import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import type { CollectionBrowser } from '../../../src/collection-browser';
import '../../../src/collection-browser';
import { StaticEtdEngine } from '../../../src/etd/engine/static-etd-engine';
import { EtdSearchService } from '../../../src/etd/etd-search-service';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';
import type { FixtureOptions, FixtureThesis } from './fixture-index';

const THESES: FixtureThesis[] = [
  {
    title: 'Glacier dynamics in Greenland',
    creators: 'Okafor, Ada',
    abstract: 'We model sea ice retreat along the coast.',
    institution: 'University of Toronto',
    date: '2014',
    language: 'en',
    domain: 'tspace.library.utoronto.ca',
    url: 'https://tspace.library.utoronto.ca/handle/1807/1',
  },
  {
    title: 'Sea ice and the Arctic carbon budget',
    creators: 'Lindqvist, Sven',
    abstract: 'Carbon flux under seasonal <i>sea ice</i> &amp; leads.',
    date: '2019-05',
    language: 'en',
    domain: 'dspace.mit.edu',
    url: 'https://dspace.mit.edu/handle/1721.1/2',
  },
  {
    title: 'Medieval trade routes',
    creators: 'Ice, Mara',
    abstract: 'Merchants crossed the sea in winter.',
    date: '2001',
    language: 'fr',
    domain: 'repository.example.edu',
    // longer than the stub's 88-byte url field: only url.bin has it whole
    url: `https://repository.example.edu/bitstream/handle/${'x'.repeat(80)}/thesis.pdf`,
  },
  {
    title: 'Coastal erosion',
    creators: 'Mbeki, Thandi',
    date: '1998',
    url: 'https://repo.example.org/4',
  },
];

async function engineOver(theses = THESES, options?: FixtureOptions) {
  const index = await buildFixtureIndex(theses, options);
  const engine = new StaticEtdEngine({
    baseUrl: FIXTURE_BASE,
    fetch: index.fetch,
    cacheFacets: false,
  });
  await engine.ready;
  return { engine, index };
}

const titles = (records: { title: string }[]) => records.map(r => r.title);

describe('StaticEtdEngine', () => {
  it('ranks a title match above the same words in an abstract', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('sea ice', {});

    const records = await query.next(10);
    expect(titles(records)[0]).to.equal('Sea ice and the Arctic carbon budget');
    expect(titles(records)).to.include('Glacier dynamics in Greenland');
    // "Coastal erosion" has neither word
    expect(query.result).to.deep.equal({
      total: 3,
      approximate: false,
      reachable: 3,
    });
  });

  it('finds authors, and ranks an author match above a title word', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('ice', {});
    const [first] = await query.next(1);
    expect(first.creators).to.equal('Ice, Mara');
  });

  it('searches one field with field syntax', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('title:ice', {});
    expect(titles(await query.next(10))).to.deep.equal([
      'Sea ice and the Arctic carbon budget',
    ]);
  });

  it('applies AND and NOT', async () => {
    const { engine } = await engineOver();
    const and = await engine.query('sea AND carbon', {});
    expect(titles(await and.next(10))).to.deep.equal([
      'Sea ice and the Arctic carbon budget',
    ]);
    const not = await engine.query('sea NOT carbon', {});
    expect(titles(await not.next(10))).not.to.include(
      'Sea ice and the Arctic carbon budget',
    );
  });

  it('builds full records: whole url, plain-text abstract, stub fields', async () => {
    const { engine } = await engineOver();
    const [record] = await (await engine.query('title:medieval', {})).next(1);
    expect(record).to.deep.equal({
      docId: 3,
      title: 'Medieval trade routes',
      creators: 'Ice, Mara',
      date: '2001',
      domain: 'repository.example.edu',
      url: THESES[2].url,
      snippet: 'Merchants crossed the sea in winter.',
      // Searched by title, so nothing in the abstract is marked.
      highlight: 'Merchants crossed the sea in winter.',
    });

    const [html] = await (await engine.query('title:arctic', {})).next(1);
    expect(html.snippet).to.equal(
      'Carbon flux under seasonal sea ice & leads.',
    );
  });

  it('marks the query terms in each abstract, from every field searched', async () => {
    const { engine } = await engineOver();
    const records = await (await engine.query('sea ice', {})).next(3);
    expect(records.map(r => r.highlight)).to.deep.equal([
      // 'sea' inside 'seasonal' too: the live page marks within words.
      'Carbon flux under {{{sea}}}sonal {{{sea}}} {{{ice}}} & leads.',
      'We model {{{sea}}} {{{ice}}} retreat along the coast.',
      // Matched by its author, Mara Ice; only 'sea' is in the abstract.
      'Merchants crossed the {{{sea}}} in winter.',
    ]);
  });

  it('leaves out the snippet when a thesis has no abstract', async () => {
    const { engine } = await engineOver();
    const [record] = await (await engine.query('title:coastal', {})).next(1);
    expect(record.snippet).to.be.undefined;
    expect(record.highlight).to.be.undefined;
  });

  it('pages through the ranking with its cursor', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('sea ice', {});
    const first = await query.next(2);
    const rest = await query.next(10);
    expect(first).to.have.length(2);
    expect(rest).to.have.length(1);
    expect(await query.next(10)).to.deep.equal([]);
    const all = [...first, ...rest].map(r => r.docId);
    expect(new Set(all).size).to.equal(3);
  });

  it('does not advance the cursor when a page read fails', async () => {
    const { engine, index } = await engineOver();
    const query = await engine.query('sea ice', {});
    await query.next(1);

    // One record is one plain Range read, with no multi-range fallback.
    index.failNext('stubs.bin');
    let failed = false;
    try {
      await query.next(1);
    } catch {
      failed = true;
    }
    expect(failed).to.be.true;

    // The retry starts at the record that failed: both remaining records.
    const retried = await query.next(10);
    expect(retried).to.have.length(2);
  });

  it('runs a query in three rounds of requests', async () => {
    const { engine, index } = await engineOver();
    const before = index.requests.length;
    const query = await engine.query('"sea ice" carbon', {});
    // dict.bin buckets in one request, all posting lists in one request
    expect(index.requests.length - before).to.equal(2);

    const beforePage = index.requests.length;
    await query.next(10);
    // stubs, url.dir, snip.dir, then url.bin and snippets.bin
    expect(index.requests.length - beforePage).to.equal(5);
  });

  it('adds one round, two requests, to re-rank a plain multi-word query', async () => {
    const { engine, index } = await engineOver();
    const before = index.requests.length;
    await engine.query('sea ice carbon', {});
    const urls = index.requests.slice(before).map(r => r.url.split('?')[0]);
    expect(urls.map(url => url.replace(/^.*\//, ''))).to.deep.equal([
      'dict.bin.test1',
      'postings.bin.test1',
      'posfwd.dir.test1',
      'posfwd.bin.test1',
    ]);
  });

  it('moves theses with the words side by side ahead of ones with both apart', async () => {
    const { engine } = await engineOver([
      // Both words in the title, apart: ranks first on title weight alone.
      { title: 'Sea level and ice', url: 'https://repo.example.org/1' },
      {
        title: 'Carbon budgets',
        abstract: 'Under seasonal sea ice.',
        url: 'https://repo.example.org/2',
      },
    ]);
    const plain = await (await engine.query('"sea" ice', {})).next(2);
    expect(titles(plain)).to.deep.equal([
      'Sea level and ice',
      'Carbon budgets',
    ]);

    const query = await engine.query('sea ice', {});
    const boosted = await query.next(2);
    expect(titles(boosted)).to.deep.equal([
      'Carbon budgets',
      'Sea level and ice',
    ]);

    // And it says what it did: the order before, and why each moved.
    expect(query.boost!.words).to.deep.equal(['sea', 'ice']);
    expect(query.boost!.topBefore(2)).to.deep.equal([1, 2]);
    expect(query.boost!.rankBefore(2)).to.equal(2);
    expect(query.boost!.placement(1)).to.equal('apart');
    expect(query.boost!.placement(2)).to.equal('abstract');
    expect((await engine.query('"sea" ice', {})).boost).to.be.undefined;
  });

  it('says where it ranks any doc, and whether it matched at all', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('sea ice', {});
    const order = (await query.next(10)).map(r => r.docId);
    expect(order.map(d => query.rankOf!(d))).to.deep.equal([1, 2, 3]);
    expect(order.every(d => query.matches!(d))).to.be.true;
    // Coastal erosion (doc 4) mentions neither word.
    expect(query.rankOf!(4)).to.be.undefined;
    expect(query.matches!(4)).to.be.false;
  });

  it('returns nothing for words not in the index', async () => {
    const { engine } = await engineOver();
    const query = await engine.query('zeppelin', {});
    expect(query.result.total).to.equal(0);
    expect(await query.next(10)).to.deep.equal([]);
  });

  it('marks results approximate when a truncated list is ANDed', async () => {
    // keep 1 posting per term: "sea" occurs in three theses
    const { engine } = await engineOver(THESES, { keep: 1 });
    const query = await engine.query('sea AND ice', {});
    expect(query.result.approximate).to.be.true;
  });

  describe('year and language', () => {
    // 'sea ice' matches three: 2014 en, 2019 en, and Mara Ice's 2001 fr.
    async function seaIce(filters = {}) {
      const { engine, index } = await engineOver();
      const query = await engine.query('sea ice', filters);
      return { query, index };
    }

    it('filters every match by year before ranking, so the total follows', async () => {
      expect(
        (await seaIce({ year: { min: 2010 } })).query.result.total,
      ).to.equal(2);
      expect(
        (await seaIce({ year: { max: 2010 } })).query.result.total,
      ).to.equal(1);
      const { query } = await seaIce({ year: { min: 2015, max: 2020 } });
      expect(titles(await query.next(5))).to.deep.equal([
        'Sea ice and the Arctic carbon budget',
      ]);
    });

    it('filters by languages to include or exclude', async () => {
      expect(
        (await seaIce({ includeLanguages: ['fr'] })).query.result.total,
      ).to.equal(1);
      expect(
        (await seaIce({ excludeLanguages: ['fr'] })).query.result.total,
      ).to.equal(2);
    });

    it('leaves a thesis with no known year out of any year range', async () => {
      const { engine } = await engineOver([
        { title: 'Sea ice drift', date: '2005' },
        { title: 'Sea ice melt' }, // no date
      ]);
      const query = await engine.query('sea ice', { year: { min: 1900 } });
      expect(query.result.total).to.equal(1);
    });

    it('counts years and languages over every match, not just a page', async () => {
      const { query } = await seaIce();
      await query.next(1);
      expect(await query.facets()).to.deep.equal({
        year: { 2001: 1, 2014: 1, 2019: 1 },
        language: { en: 2, fr: 1 },
        country: {},
        domain: {},
        institution: {},
      });
    });

    it('counts within the filter', async () => {
      const { query } = await seaIce({ excludeLanguages: ['fr'] });
      expect((await query.facets()).language).to.deep.equal({ en: 2 });
    });

    it('reads the facets file only when facets or filters need it', async () => {
      const { query, index } = await seaIce();
      const facetReads = () =>
        index.requests.filter(r => r.url.includes('facets.gz.json')).length;
      await query.next(3);
      expect(facetReads()).to.equal(0);
      await query.facets();
      await query.facets();
      expect(facetReads()).to.equal(1);
    });

    it('says so when filtering an index that has no facet files', async () => {
      const { engine } = await engineOver(THESES, { withFacets: false });
      let error: unknown;
      try {
        await engine.query('sea ice', { year: { min: 2000 } });
      } catch (err) {
        error = err;
      }
      expect(String(error)).to.include('facets-meta.json');
    });
  });

  it('refuses field syntax it has not been ported for yet, clearly', async () => {
    const { engine } = await engineOver();
    let inQuery: unknown;
    try {
      await engine.query('ice country:CA', {});
    } catch (err) {
      inQuery = err;
    }
    expect((inQuery as Error).message).to.equal(
      'ETD engine: country: filters are not ported yet',
    );
  });

  it('reads a single record, and nothing for an id outside the index', async () => {
    const { engine } = await engineOver();
    expect((await engine.record(4))?.title).to.equal('Coastal erosion');
    expect(await engine.record(99)).to.be.undefined;
  });

  it('works without a snippets file', async () => {
    const { engine } = await engineOver(THESES, { withSnippets: false });
    const [record] = await (await engine.query('title:medieval', {})).next(1);
    expect(record.title).to.equal('Medieval trade routes');
    expect(record.snippet).to.be.undefined;
  });

  it('serves collection-browser through EtdSearchService', async () => {
    const index = await buildFixtureIndex(THESES);
    const service = new EtdSearchService({
      engine: new StaticEtdEngine({
        baseUrl: FIXTURE_BASE,
        fetch: index.fetch,
        cacheFacets: false,
      }),
    });

    const result = await service.search({ query: 'sea ice', page: 1, rows: 2 });
    const response = result.success!.response;
    expect(response.totalResults).to.equal(3);
    expect(response.results.map(hit => hit.identifier)).to.deep.equal([
      'etd-2',
      'etd-1',
    ]);
  });

  it('marks the query in result snippets on collection-browser tiles', async () => {
    const index = await buildFixtureIndex(THESES);
    const service = new EtdSearchService({
      engine: new StaticEtdEngine({
        baseUrl: FIXTURE_BASE,
        fetch: index.fetch,
        cacheFacets: false,
      }),
    });
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${service}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );
    el.baseQuery = 'sea ice';
    await el.initialSearchComplete;
    el.displayMode = 'list-detail';
    await el.updateComplete;

    // Tiles render inside nested shadow roots; collect every <mark> in them.
    const marks = (): string[] => {
      const found: string[] = [];
      const walk = (root: ParentNode) => {
        for (const node of root.querySelectorAll('*')) {
          if (node.tagName === 'MARK') found.push(node.textContent!);
          if (node.shadowRoot) walk(node.shadowRoot);
        }
      };
      walk(el.shadowRoot!);
      return found;
    };
    await waitUntil(() => marks().length > 0, 'no marked snippet rendered');
    await aTimeout(0);

    // Top tile: 'Carbon flux under {{{sea}}}sonal {{{sea}}} {{{ice}}} & leads.'
    expect(marks().slice(0, 3)).to.deep.equal(['sea', 'sea', 'ice']);
  });
});
