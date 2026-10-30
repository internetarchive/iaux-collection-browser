import { expect } from '@open-wc/testing';
import { EtdFacets, type EtdFacetMeta } from '../../src/etd/engine/facets';
import { EtdIndexFiles } from '../../src/etd/engine/index-files';
import type { EtdInstitutionMeta } from '../../src/etd/engine/institutions';
import { ETD_FACETS } from '../../src/etd/etd-facets';
import { languageName } from '../../src/etd/etd-languages';
import { TRANSFORMERS_URL } from '../../src/etd/engine/vector/embedder';
import { StaticVectorEngine } from '../../src/etd/engine/vector/static-vector-engine';
import type {
  CellCodesMeta,
  CellFacetsMeta,
} from '../../src/etd/engine/vector/scan';
import { VectorStoreFiles } from '../../src/etd/engine/vector/vector-files';
import {
  ETD_ITEM_CONFIG,
  ETD_MEANING,
  ETD_THESES,
  ETD_VECTOR_DOCS,
  ETD_WORDS,
  etdItemManifest,
} from '../../src/etd/etd-static-index';
import type { EtdPublishedMetas } from '../../src/etd/etd-static-index';
import { ETD_VECTOR_FACETS } from '../../src/etd/etd-vector-facets';
import { EtdSearchService } from '../../src/etd/etd-search-service';
import { ETD_VECTOR_SEARCH } from '../../src/etd/etd-search-source';
import { checkConfig } from '../../src/static-index/check-config';
import { idFromIdentifier } from '../../src/static-index/identifiers';
import {
  facetLabel,
  facetRowReader,
  facetValues,
  labelNames,
} from '../../src/static-index/facet-row';
import type {
  StaticItemManifest,
  TextSearch,
  VectorSearch,
} from '../../src/static-index/manifest';
import { modelLibraryUrl } from '../../src/static-index/model';
import {
  ETD_CELL_FACETS_META,
  ETD_CODES_META,
  ETD_CURRENT_JSON,
  ETD_FACETS_META,
  ETD_INST_META,
  ETD_IVF_META,
} from '../static-index/etd-snapshots';
import {
  FIXTURE_BASE,
  buildFixtureIndex,
  type FixtureThesis,
} from './engine/fixture-index';
import {
  FIXTURE_BUILT,
  FIXTURE_VECTOR_BASE,
  buildFixtureVectorStore,
} from './engine/vector/fixture-vector-store';
import type { FixtureVectorDoc } from './engine/vector/fixture-vector-store';

/** Everything etd-search publishes today, as read 2026-10-29. */
const PUBLISHED: EtdPublishedMetas = {
  current: ETD_CURRENT_JSON,
  facetsMeta: ETD_FACETS_META,
  instMeta: ETD_INST_META,
  ivf: ETD_IVF_META,
  codesMeta: ETD_CODES_META,
  cellFacetsMeta: ETD_CELL_FACETS_META,
};

const words = (m: StaticItemManifest) => m.searches[ETD_WORDS] as TextSearch;
const meaning = (m: StaticItemManifest) =>
  m.searches[ETD_MEANING] as VectorSearch;
const wordsConfig = ETD_ITEM_CONFIG.searches[ETD_WORDS];
const meaningConfig = ETD_ITEM_CONFIG.searches[ETD_MEANING];

describe('etdItemManifest, from ETD’s published text index', () => {
  const manifest = etdItemManifest(PUBLISHED);
  const theses = manifest.idSpaces[ETD_THESES];

  it('passes checkConfig with the ETD config, for both searches', () => {
    expect(() => checkConfig(manifest, ETD_ITEM_CONFIG)).not.to.throw();
    expect(Object.keys(manifest.searches)).to.deep.equal([
      ETD_WORDS,
      ETD_MEANING,
    ]);
  });

  it('names the build and its size', () => {
    expect(words(manifest).files).to.deep.equal({
      naming: 'versioned',
      version: '20261026-5e5902',
    });
    expect(theses.files).to.deep.equal(words(manifest).files);
    expect(theses.count).to.equal(25860159);
    expect(theses.firstId).to.equal(1);
    expect(words(manifest).positions).to.be.true;
  });

  it('lists the five text fields, with their query words and build stats', () => {
    const fields = words(manifest).text.fields;
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
    expect(words(manifest).text.bm25).to.deep.equal({ k1: 1.2, b: 0.75 });
  });

  it('leaves orcid out of a build that doesn’t list it', () => {
    const older = { ...ETD_CURRENT_JSON };
    delete older.prefixed_fields;
    const keys = words(etdItemManifest({ current: older })).text.fields.map(
      f => f.key,
    );
    expect(keys).to.deep.equal([
      'title',
      'creators',
      'abstract',
      'institution',
    ]);
  });

  it('carries the live page’s search-time ranking, by field key', () => {
    const { ranking } = words(manifest).text;
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
    const { records } = theses;
    expect(records.file).to.equal('stubs.bin');
    expect(records.bytes).to.equal(320);
    expect(records.fields.at(-1)).to.deep.equal({
      key: 'url',
      start: 232,
      end: 320,
      role: 'url',
    });
    expect(records.fields.map(f => f.role)).to.deep.equal([
      'title',
      'creators',
      'date',
      undefined,
      'url',
    ]);
    expect(records.overflow).to.deep.equal([
      { field: 'url', dir: 'url.dir', bin: 'url.bin' },
    ]);
  });

  it('describes the facet columns from facets-meta', () => {
    const columns = theses.facets?.columns ?? [];
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

  it('describes the institution list as doc values, looked up by inst:', () => {
    expect(theses.docValues).to.deep.equal([
      {
        key: 'institution',
        file: 'inst.gz.json',
        gzip: true,
        bytes: 2,
        count: 7648,
        labels: {
          file: 'inst-labels.bin',
          dir: 'inst-labels.dir',
          columns: ['qid', 'label', 'country', 'n_docs'],
        },
        lookup: {
          dir: 'inst-alias.json',
          bin: 'inst-alias.bin',
          normalize:
            'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
          queryFields: ['inst', 'institution'],
        },
      },
    ]);
  });

  it('has no doc values for a build without the institution list', () => {
    const { idSpaces } = etdItemManifest({
      current: ETD_CURRENT_JSON,
      facetsMeta: ETD_FACETS_META,
    });
    expect(idSpaces[ETD_THESES].docValues).to.be.undefined;
  });

  it('reads the repository from bytes 2-3 when facets-meta lists the hosts', () => {
    const { idSpaces } = etdItemManifest({
      current: ETD_CURRENT_JSON,
      facetsMeta: { ...ETD_FACETS_META, domains: ['nusl.cz', 'theseus.fi'] },
    });
    expect(
      idSpaces[ETD_THESES].facets?.columns.find(c => c.key === 'domain'),
    ).to.deep.equal({
      key: 'domain',
      kind: 'code',
      byte: 2,
      width: 2,
      codes: ['nusl.cz', 'theseus.fi'],
    });
  });
});

describe('etdItemManifest, from ETD’s published vector store', () => {
  const manifest = etdItemManifest(PUBLISHED);
  const search = meaning(manifest);

  it('has no search by meaning without a vector store', () => {
    const textOnly = etdItemManifest({ current: ETD_CURRENT_JSON });
    expect(Object.keys(textOnly.searches)).to.deep.equal([ETD_WORDS]);
    expect(Object.keys(textOnly.idSpaces)).to.deep.equal([ETD_THESES]);
  });

  it('reads fixed file names keyed to the build stamp', () => {
    expect(search.files).to.deep.equal({
      naming: 'stamped',
      built: '2026-10-12 11:31',
    });
  });

  it('gives the store its own id space: 0-based docs.bin rows, with their own records', () => {
    expect(search.ids).to.equal(ETD_VECTOR_DOCS);
    const docs = manifest.idSpaces[ETD_VECTOR_DOCS];
    expect(docs.count).to.equal(18176413);
    expect(docs.firstId).to.equal(0);
    expect(docs.records).to.deep.equal({
      file: 'docs.bin',
      bytes: 308,
      fields: [
        { key: 'title', start: 0, end: 160, role: 'title' },
        { key: 'host', start: 160, end: 190 },
        { key: 'date', start: 190, end: 200, role: 'date' },
        { key: 'landing', start: 200, end: 300, role: 'url' },
        { key: 'lang', start: 300, end: 308 },
      ],
      snippet: { field: 'abstract', dir: 'vsnip.dir', bin: 'vsnip.bin' },
    });
  });

  it('describes the cells, the 4-bit codes and the owner’s settings', () => {
    expect(search.dim).to.equal(384);
    expect(search.cells).to.deep.equal({
      count: 16384,
      centroids: 'centroids.f16',
      dir: 'cell.dir',
      rows: 'cells.bin',
      rowBytes: 772,
    });
    expect(search.codes).to.deep.equal({
      file: 'cell-codes.bin',
      meta: 'cell-codes-meta.json',
      mustMatch: ['n', 'built', 'dim'],
      bits: 4,
      rowBytes: 196,
    });
    expect(search.settings).to.deep.equal({ nprobe: 32, rerank: 400 });
  });

  it('names the model, where it is, and how a query is embedded, with a library build we pin', () => {
    expect(search.model).to.deep.equal({
      id: 'intfloat/multilingual-e5-small',
      path: 'Xenova/multilingual-e5-small/',
      dtype: 'q8',
      queryPrefix: 'query: ',
      pooling: 'mean',
      normalize: true,
      library: { name: '@huggingface/transformers', version: '3.0.2' },
    });
    expect(modelLibraryUrl(search.model.library)).to.equal(TRANSFORMERS_URL);
  });

  it('reads its facet rows in row order: year (encoding 1, unlike the text rows), flags, and the repository in two bytes', () => {
    expect(search.facets).to.deep.equal({
      file: 'cell-facets.bin',
      meta: 'cell-facets-meta.json',
      mustMatch: ['n'],
      stride: 8,
      gzip: false,
      columns: [
        { key: 'year', kind: 'year', byte: 0, encoding: 1 },
        {
          key: 'flags',
          kind: 'flags',
          bytes: [1],
          bits: ETD_CELL_FACETS_META.flag_bits,
        },
        {
          key: 'domain',
          kind: 'code',
          byte: 2,
          width: 2,
          codes: ETD_CELL_FACETS_META.domains,
        },
      ],
    });
  });

  it('leaves out codes from another build, and still passes the config', () => {
    const stale = etdItemManifest({
      ...PUBLISHED,
      codesMeta: { ...ETD_CODES_META, built: '2026-09-30 08:00' },
    });
    expect(meaning(stale).codes).to.be.undefined;
    expect(meaning(stale).facets).to.exist;
    expect(() => checkConfig(stale, ETD_ITEM_CONFIG)).not.to.throw();
  });

  it('leaves out facet rows of another size; results then show without facets', () => {
    const stale = etdItemManifest({
      ...PUBLISHED,
      cellFacetsMeta: { ...ETD_CELL_FACETS_META, n: 18176412 },
    });
    expect(meaning(stale).facets).to.be.undefined;
    expect(meaning(stale).codes).to.exist;
    expect(() => checkConfig(stale, ETD_ITEM_CONFIG)).not.to.throw();
  });
});

describe('ETD_ITEM_CONFIG’s words, against today’s facet code', () => {
  // One thesis per case the facets distinguish.
  const theses: FixtureThesis[] = [
    {
      title: 'a',
      language: 'pt',
      country: 'BR',
      level: 'phd',
      flags: ['oai'],
      institutionId: 1,
    },
    {
      title: 'b',
      language: 'ng',
      level: 'masters',
      flags: ['ia', 'complete'],
      institutionId: 2,
    },
    {
      title: 'c',
      country: 'SU',
      flags: ['wbm', 'hasAbstract', 'libcat'],
      institutionId: 3,
    },
    { title: 'd', level: 'bachelors', flags: ['archived', 'printed'] },
    { title: 'e', language: 'en', level: 'other', flags: ['hasTitle'] },
    { title: 'f', institutionId: 4 },
  ];
  // Two share a label, as Heidelberg University (DE and US) do.
  const institutions = [
    { label: 'University of São Paulo', country: 'BR' },
    { label: 'Heidelberg University', country: 'DE' },
    { label: 'Heidelberg University', country: 'US' },
    { label: 'Moscow State University', country: 'RU' },
  ];

  async function rows() {
    const index = await buildFixtureIndex(theses, { institutions });
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const etdRows = await new EtdFacets(files, { cache: false }).rows();

    const meta = JSON.parse(
      new TextDecoder().decode(await files.arrayBuffer('facets-meta.json')),
    ) as EtdFacetMeta;
    const instMeta = JSON.parse(
      new TextDecoder().decode(await files.arrayBuffer('inst-meta.json')),
    ) as EtdInstitutionMeta;
    const manifest = etdItemManifest({
      current: files.meta,
      facetsMeta: meta,
      instMeta,
    });
    checkConfig(manifest, {
      ...ETD_ITEM_CONFIG,
      searches: { [ETD_WORDS]: wordsConfig },
    });
    const space = manifest.idSpaces[ETD_THESES];
    const unpack = async (name: string) =>
      new Uint8Array(
        await new Response(
          (await files.response(name)).body!.pipeThrough(
            new DecompressionStream('gzip'),
          ),
        ).arrayBuffer(),
      );
    const bytes = await unpack('facets.gz.json');
    // Read only as the manifest describes them.
    const [institution] = space.docValues!;
    const ids = new Uint16Array((await unpack(institution.file)).buffer);
    const labels = new TextDecoder().decode(
      await files.arrayBuffer(institution.labels.file),
    );
    const { stride } = space.facets!;
    const read = facetRowReader(space.facets!, { institution: ids });
    const genericRow = (docId: number) =>
      read(bytes.subarray((docId - 1) * stride, docId * stride), docId);
    return { etdRows, genericRow, institution, labels };
  }

  it('declares the same facets, in the same way', () => {
    const shape = (f: {
      key: string;
      title: string;
      pluralTitle: string;
      after?: string;
      combine?: string;
    }) => [f.key, f.title, f.pluralTitle, f.after, f.combine];
    expect(wordsConfig.facets.map(shape)).to.deep.equal(ETD_FACETS.map(shape));
  });

  it('gives every thesis the same values for every facet', async () => {
    const { etdRows, genericRow, institution, labels } = await rows();
    for (const facet of ETD_FACETS) {
      const config = wordsConfig.facets.find(f => f.key === facet.key)!;
      // A labels facet's values are ids; today's code reads their names.
      const names =
        config.names?.from === 'labels'
          ? labelNames(config.names, institution.labels, labels)
          : undefined;
      theses.forEach((thesis, i) => {
        const docId = i + 1;
        const expected: string[] = [];
        facet.read(etdRows, docId, code => expected.push(code));
        const values = facetValues(config, genericRow(docId));
        expect(
          names ? values.map(id => names[Number(id) - 1]) : values,
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
    const read = facetRowReader(
      etdItemManifest({ current: files.meta, facetsMeta: meta }).idSpaces[
        ETD_THESES
      ].facets!,
    );
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
      const { names } = wordsConfig.facets.find(f => f.key === facet.key)!;
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
    const { names } = wordsConfig.facets.find(f => f.key === 'country')!;
    for (const code of ETD_FACETS_META.countries ?? []) {
      expect(facetLabel(names, code), code).to.equal(country.label(code));
    }
  });

  it('names every language in the real index as today’s code does, but two known ways', () => {
    const { names } = wordsConfig.facets.find(f => f.key === 'language')!;
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

describe('ETD_ITEM_CONFIG’s meaning, against the vector engine', () => {
  // One doc per case the facets distinguish, in four cells.
  const docs: FixtureVectorDoc[] = [
    {
      title: 'Sea ice drift',
      vector: [0.95, 0.1, 0, 0],
      cell: 0,
      year: 2014,
      flags: ['oai', 'hasAbstract'],
      domain: 'oda.uit.no',
    },
    {
      title: 'Gelo marinho',
      vector: [0.9, 0, 0.12, 0],
      cell: 0,
      year: 2019,
      flags: ['oai', 'wbm', 'complete'],
      domain: 'repositorio.ufsc.br',
    },
    {
      title: 'Ice and shipping lanes',
      vector: [0.7, 0.6, 0, 0],
      cell: 1,
      year: 1901,
      flags: ['ia', 'archived'],
      domain: 'archive.org',
    },
    {
      title: 'Hanseatic trade',
      vector: [0.1, 0.95, 0, 0],
      cell: 1,
      year: 2019,
      flags: ['oai'],
      domain: 'oda.uit.no',
    },
    { title: 'Baroque opera', vector: [0, 0, 1, 0], cell: 2 },
    {
      title: 'Contract law',
      vector: [0, 0, 0, 1],
      cell: 3,
      flags: ['hasInstitution', 'hasTitle'],
    },
  ];
  const centroids = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1],
  ];

  /** The store's manifest, from its own metas, as the engine sees them. */
  async function storeManifest(fetchFn: typeof fetch) {
    const files = await VectorStoreFiles.open(FIXTURE_VECTOR_BASE, {
      fetch: fetchFn,
    });
    const manifest = etdItemManifest({
      current: ETD_CURRENT_JSON,
      ivf: files.meta,
      codesMeta: await files.optionalJson<CellCodesMeta>(
        'cell-codes-meta.json',
      ),
      cellFacetsMeta: await files.optionalJson<CellFacetsMeta>(
        'cell-facets-meta.json',
      ),
    });
    return { files, manifest };
  }

  it('is what the fixture store would publish in static-index.json', async () => {
    const store = await buildFixtureVectorStore(docs, { centroids });
    const { manifest } = await storeManifest(store.fetch);
    expect(meaning(manifest)).to.deep.equal({
      kind: 'vector',
      ids: ETD_VECTOR_DOCS,
      files: { naming: 'stamped', built: FIXTURE_BUILT },
      dim: 4,
      cells: {
        count: 4,
        centroids: 'centroids.f16',
        dir: 'cell.dir',
        rows: 'cells.bin',
        rowBytes: 12,
      },
      codes: {
        file: 'cell-codes.bin',
        meta: 'cell-codes-meta.json',
        mustMatch: ['n', 'built', 'dim'],
        bits: 4,
        rowBytes: 6,
      },
      facets: {
        file: 'cell-facets.bin',
        meta: 'cell-facets-meta.json',
        mustMatch: ['n'],
        stride: 8,
        gzip: false,
        columns: [
          { key: 'year', kind: 'year', byte: 0, encoding: 1 },
          {
            key: 'flags',
            kind: 'flags',
            bytes: [1],
            bits: {
              oai: 1,
              ia: 2,
              wbm: 4,
              hasInstitution: 8,
              archived: 16,
              complete: 32,
              hasTitle: 64,
              hasAbstract: 128,
            },
          },
          {
            key: 'domain',
            kind: 'code',
            byte: 2,
            width: 2,
            codes: ['oda.uit.no', 'repositorio.ufsc.br', 'archive.org'],
          },
        ],
      },
      model: {
        id: 'intfloat/multilingual-e5-small',
        path: 'Xenova/multilingual-e5-small/',
        dtype: 'q8',
        queryPrefix: 'query: ',
        pooling: 'mean',
        normalize: true,
        library: { name: '@huggingface/transformers', version: '3.0.2' },
      },
      settings: { nprobe: 32, rerank: 400 },
    });
    // The fixture's 4 cells are fewer than the owner's 32 probes.
    expect(() =>
      checkConfig(manifest, {
        ...ETD_ITEM_CONFIG,
        searches: { [ETD_MEANING]: meaningConfig },
      }),
    ).to.throw("nprobe 32 isn't 1 to 4 cells");
  });

  it('names hits by their position in the vector id space, as the config says', async () => {
    const store = await buildFixtureVectorStore(docs, { centroids });
    const engine = new StaticVectorEngine({
      baseUrl: FIXTURE_VECTOR_BASE,
      fetch: store.fetch,
      facets: ETD_VECTOR_FACETS,
      embed: async () => Float32Array.from([1, 0.05, 0, 0]),
      scan: { nprobe: 4 },
    });
    const service = new EtdSearchService({ engine, kind: ETD_VECTOR_SEARCH });
    const { results } = (await service.search({ query: 'sea ice', rows: 10 }))
      .success!.response;
    expect(ETD_VECTOR_SEARCH.identifierPrefix).to.equal(
      meaningConfig.identifierPrefix,
    );

    const { manifest } = await storeManifest(store.fetch);
    const space = manifest.idSpaces[ETD_VECTOR_DOCS];
    expect(results).to.have.length(docs.length);
    for (const hit of results) {
      // The docs.bin row the identifier names, by the manifest's rule...
      const id = idFromIdentifier(
        hit.identifier!,
        meaningConfig.identifierPrefix,
        space,
      )!;
      // ...is the doc the hit shows (fixture ids are input order).
      expect(hit.title?.value, hit.identifier).to.equal(docs[id].title);
    }
    // The first row, id 0, is etdv-1.
    expect(
      results.find(hit => hit.title?.value === docs[0].title)?.identifier,
    ).to.equal('etdv-1');
  });

  it('declares the same facets, in the same way', () => {
    const shape = (f: {
      key: string;
      title: string;
      pluralTitle: string;
      after?: string;
      combine?: string;
    }) => [f.key, f.title, f.pluralTitle, f.after, f.combine];
    expect(meaningConfig.facets.map(shape)).to.deep.equal(
      ETD_VECTOR_FACETS.map(shape),
    );
  });

  it('counts every facet, and the year, over the scanned rows as the engine does', async () => {
    const store = await buildFixtureVectorStore(docs, { centroids });
    const engine = new StaticVectorEngine({
      baseUrl: FIXTURE_VECTOR_BASE,
      fetch: store.fetch,
      facets: ETD_VECTOR_FACETS,
      embed: async () => Float32Array.from([1, 0.05, 0, 0]),
      // Every cell, so every row is scanned and counted.
      scan: { nprobe: 4 },
    });
    const counts = await (await engine.query('sea ice', {})).facets();

    // The same rows, read only as the manifest and config describe them.
    const { files, manifest } = await storeManifest(store.fetch);
    const rows = meaning(manifest).facets!;
    const bytes = new Uint8Array(await files.arrayBuffer(rows.file));
    const read = facetRowReader(rows);
    const year: Record<string, number> = {};
    const facets: Record<string, Record<string, number>> = {};
    for (let at = 0; at < bytes.length; at += rows.stride) {
      const row = read(bytes.subarray(at, at + rows.stride));
      const y = row.value('year');
      if (y) year[y] = (year[y] ?? 0) + 1;
      for (const facet of meaningConfig.facets) {
        facets[facet.key] ??= {};
        for (const value of facetValues(facet, row)) {
          facets[facet.key][value] = (facets[facet.key][value] ?? 0) + 1;
        }
      }
    }

    expect(year).to.deep.equal(counts.year);
    for (const facet of ETD_VECTOR_FACETS) {
      // The engine leaves a facet out when nothing has a value for it.
      const generic = Object.keys(facets[facet.key]).length
        ? facets[facet.key]
        : undefined;
      expect(generic, facet.key).to.deep.equal(counts.facets[facet.key]);
    }
    expect(facets.repository).to.deep.equal({
      'oda.uit.no': 2,
      'repositorio.ufsc.br': 1,
      'archive.org': 1,
    });
  });
});
