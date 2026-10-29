import { expect } from '@open-wc/testing';
import { EtdFacets, type EtdFacetMeta } from '../../src/etd/engine/facets';
import { EtdIndexFiles } from '../../src/etd/engine/index-files';
import { ETD_FACETS } from '../../src/etd/etd-facets';
import { languageName } from '../../src/etd/etd-languages';
import { ETD_SEARCH_CONFIG, etdManifest } from '../../src/etd/etd-static-index';
import { checkConfig } from '../../src/static-index/check-config';
import {
  facetLabel,
  facetRowReader,
  facetValues,
} from '../../src/static-index/facet-row';
import {
  ETD_CURRENT_JSON,
  ETD_FACETS_META,
} from '../static-index/etd-snapshots';
import {
  FIXTURE_BASE,
  buildFixtureIndex,
  type FixtureThesis,
} from './engine/fixture-index';

describe('etdManifest, from ETD’s published files', () => {
  const manifest = etdManifest(ETD_CURRENT_JSON, ETD_FACETS_META);

  it('passes checkConfig with the ETD config', () => {
    expect(() => checkConfig(manifest, ETD_SEARCH_CONFIG)).not.to.throw();
  });

  it('names the build and its size', () => {
    expect(manifest.version).to.equal('20261026-5e5902');
    expect(manifest.docCount).to.equal(25860159);
    expect(manifest.positions).to.be.true;
  });

  it('lists the five text fields, with their query words and build stats', () => {
    const fields = manifest.text.fields;
    expect(fields.map(f => `${f.prefix}:${f.key}`)).to.deep.equal([
      't:title',
      'c:creators',
      'a:abstract',
      'i:institution',
      'o:orcid',
    ]);
    const creators = fields[1];
    expect(creators.aliases).to.deep.equal(['creator', 'author']);
    expect(creators.indexWeight).to.equal(7);
    // current.json names the orcid field's stats 'orcids'
    expect(fields[4].indexWeight).to.equal(7);
    expect(fields[4].avgLength).to.equal(1);
    expect(manifest.text.bm25).to.deep.equal({ k1: 1.2, b: 0.75 });
  });

  it('leaves orcid out of a build that doesn’t list it', () => {
    const older = { ...ETD_CURRENT_JSON };
    delete older.prefixed_fields;
    const keys = etdManifest(older).text.fields.map(f => f.key);
    expect(keys).to.deep.equal([
      'title',
      'creators',
      'abstract',
      'institution',
    ]);
  });

  it('carries the live page’s search-time ranking, by field key', () => {
    const { ranking } = manifest.text;
    expect(ranking?.fieldWeights).to.deep.equal({
      title: 1,
      creators: 2.2,
      abstract: 1,
      institution: 1,
      orcid: 2.2,
    });
    expect(ranking?.sameFieldBoost.creators).to.equal(2.6);
    expect(ranking?.proximity).to.equal(0.35);
  });

  it('lays out the 320-byte record, with the url held whole elsewhere', () => {
    const { records } = manifest;
    expect(records.bytes).to.equal(320);
    expect(records.fields.at(-1)).to.deep.equal({
      key: 'url',
      start: 232,
      end: 320,
    });
    expect(records.overflow).to.deep.equal([
      { field: 'url', dir: 'url.dir', bin: 'url.bin' },
    ]);
  });

  it('describes the facet columns from facets-meta', () => {
    const columns = manifest.facets?.columns ?? [];
    expect(columns.map(c => `${c.key}:${c.kind}`)).to.deep.equal([
      'year:year',
      'flags:flags',
      'language:code',
      'country:code',
      'level:packed',
    ]);
    const level = columns[4];
    expect(level).to.include({ byte: 6, shift: 2, mask: 7 });
    const flags = columns[1];
    expect(flags.kind === 'flags' && flags.bits.printed).to.equal(512);
  });
});

describe('ETD_SEARCH_CONFIG, against today’s facet code', () => {
  // One thesis per case the facets distinguish.
  const theses: FixtureThesis[] = [
    { title: 'a', language: 'pt', country: 'BR', level: 'phd', flags: ['oai'] },
    { title: 'b', language: 'ng', level: 'masters', flags: ['ia', 'complete'] },
    { title: 'c', country: 'SU', flags: ['wbm', 'hasAbstract', 'libcat'] },
    { title: 'd', level: 'bachelors', flags: ['archived', 'printed'] },
    { title: 'e', language: 'en', level: 'other', flags: ['hasTitle'] },
    { title: 'f' },
  ];

  async function rows() {
    const index = await buildFixtureIndex(theses);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const etdRows = await new EtdFacets(files, { cache: false }).rows();

    const meta = JSON.parse(
      new TextDecoder().decode(await files.arrayBuffer('facets-meta.json')),
    ) as EtdFacetMeta;
    const manifest = etdManifest(files.meta, meta);
    checkConfig(manifest, ETD_SEARCH_CONFIG);
    const response = await files.response('facets.gz.json');
    const bytes = new Uint8Array(
      await new Response(
        response.body!.pipeThrough(new DecompressionStream('gzip')),
      ).arrayBuffer(),
    );
    const { stride } = manifest.facets!;
    const read = facetRowReader(manifest.facets!);
    const genericRow = (docId: number) =>
      read(bytes.subarray((docId - 1) * stride, docId * stride));
    return { etdRows, genericRow };
  }

  it('declares the same facets, in the same way', () => {
    const shape = (f: {
      key: string;
      title: string;
      pluralTitle: string;
      after?: string;
      combine?: string;
    }) => [f.key, f.title, f.pluralTitle, f.after, f.combine];
    expect(ETD_SEARCH_CONFIG.facets.map(shape)).to.deep.equal(
      ETD_FACETS.map(shape),
    );
  });

  it('gives every thesis the same values for every facet', async () => {
    const { etdRows, genericRow } = await rows();
    for (const facet of ETD_FACETS) {
      const config = ETD_SEARCH_CONFIG.facets.find(f => f.key === facet.key)!;
      theses.forEach((thesis, i) => {
        const docId = i + 1;
        const expected: string[] = [];
        facet.read(etdRows, docId, code => expected.push(code));
        expect(
          facetValues(config, genericRow(docId)),
          `${facet.key} of thesis ${thesis.title}`,
        ).to.deep.equal(expected);
      });
    }
  });

  it('reads the year column as the engine does', async () => {
    const dated: FixtureThesis[] = [
      { title: 'x', date: '1994-05' },
      { title: 'y', date: '1873' },
      { title: 'z' },
    ];
    const index = await buildFixtureIndex(dated);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const meta = JSON.parse(
      new TextDecoder().decode(await files.arrayBuffer('facets-meta.json')),
    ) as EtdFacetMeta;
    const read = facetRowReader(etdManifest(files.meta, meta).facets!);
    const bytes = new Uint8Array(
      await new Response(
        (await files.response('facets.gz.json')).body!.pipeThrough(
          new DecompressionStream('gzip'),
        ),
      ).arrayBuffer(),
    );
    const years = [0, 1, 2].map(i =>
      read(bytes.subarray(i * 8, i * 8 + 8)).value('year'),
    );
    expect(years).to.deep.equal(['1994', '1870', undefined]);
  });

  it('names table facets’ values as today’s code does', () => {
    for (const facet of ETD_FACETS) {
      const { names } = ETD_SEARCH_CONFIG.facets.find(
        f => f.key === facet.key,
      )!;
      if (names?.from !== 'table') continue;
      for (const code of Object.keys(names.labels)) {
        expect(facetLabel(names, code), `${facet.key} ${code}`).to.equal(
          facet.label(code),
        );
      }
    }
  });

  it('names every country in the real index as today’s code does', () => {
    const country = ETD_FACETS.find(f => f.key === 'country')!;
    const { names } = ETD_SEARCH_CONFIG.facets.find(f => f.key === 'country')!;
    for (const code of ETD_FACETS_META.countries ?? []) {
      expect(facetLabel(names, code), code).to.equal(country.label(code));
    }
  });

  it('names every language in the real index as today’s code does, but two known ways', () => {
    const { names } = ETD_SEARCH_CONFIG.facets.find(f => f.key === 'language')!;
    const unexplained = ETD_FACETS_META.langs.filter(code => {
      const label = facetLabel(names, code);
      if (label === languageName(code)) return false;
      // The shared mapping misspells it 'Ukranian'; Intl doesn't.
      if (code === 'uk') return false;
      // This browser's Intl has no name for it (e.g. 'sms' in headless
      // Chrome); today's code falls back to the shared mapping.
      if (label === code) return false;
      return true;
    });
    expect(unexplained).to.deep.equal([]);
  });
});
