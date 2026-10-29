import { expect } from '@open-wc/testing';
import { checkConfig } from '../../src/static-index/check-config';
import type {
  StaticItemConfig,
  StaticItemManifest,
  TextSearch,
  VectorSearch,
} from '../../src/static-index/manifest';

/**
 * A small item: papers with a title, authors and a url, searched by words
 * (two facets), and an abstracts store searched by meaning, built on its
 * own with its own ids (one facet, the open-access flag).
 */
function manifest(): StaticItemManifest {
  return {
    format: 'ia-static-index',
    formatVersion: 2,
    idSpaces: {
      papers: {
        count: 3,
        firstId: 1,
        files: { naming: 'versioned', version: 'v1' },
        records: {
          file: 'stubs.bin',
          bytes: 128,
          fields: [
            { key: 'title', start: 0, end: 80, role: 'title' },
            { key: 'url', start: 80, end: 128, role: 'url' },
          ],
        },
        facets: {
          file: 'facets.bin',
          stride: 2,
          gzip: false,
          columns: [
            { key: 'lang', kind: 'code', byte: 0, codes: ['en', 'fr'] },
            {
              key: 'flags',
              kind: 'flags',
              bytes: [1],
              bits: { open: 1, peer: 2 },
            },
          ],
        },
      },
      abstracts: {
        count: 2,
        firstId: 0,
        files: { naming: 'versioned', version: 'v1' },
        records: {
          file: 'docs.bin',
          bytes: 100,
          fields: [
            { key: 'name', start: 0, end: 60, role: 'title' },
            { key: 'link', start: 60, end: 100, role: 'url' },
          ],
        },
      },
    },
    searches: {
      words: {
        kind: 'text',
        ids: 'papers',
        files: { naming: 'versioned', version: 'v1' },
        text: {
          fields: [
            { key: 'title', prefix: 't', aliases: ['title'] },
            { key: 'authors', prefix: 'a', aliases: ['author', 'by'] },
          ],
          ranking: {
            fieldWeights: { title: 1, authors: 2 },
            sameFieldBoost: { title: 1.5 },
            proximity: 0.3,
          },
        },
      },
      meaning: {
        kind: 'vector',
        ids: 'abstracts',
        files: { naming: 'versioned', version: 'v1' },
        dim: 8,
        cells: {
          count: 4,
          centroids: 'centroids.f16',
          dir: 'cell.dir',
          rows: 'cells.bin',
          rowBytes: 20,
        },
        codes: {
          file: 'codes.bin',
          mustMatch: [],
          bits: 4,
          rowBytes: 8,
        },
        facets: {
          file: 'cell-facets.bin',
          mustMatch: [],
          stride: 1,
          gzip: false,
          columns: [
            { key: 'flags', kind: 'flags', bytes: [0], bits: { open: 1 } },
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
        settings: { nprobe: 2, rerank: 10 },
      },
    },
  };
}

function config(): StaticItemConfig {
  return {
    baseUrl: 'https://archive.org/download/papers/',
    searches: {
      words: {
        identifierPrefix: 'papers-',
        hit: { title: 'title', url: 'url' },
        facets: [
          {
            key: 'language',
            title: 'Language',
            pluralTitle: 'Languages',
            from: { column: 'lang' },
          },
          {
            key: 'access',
            title: 'Access',
            pluralTitle: 'Access',
            after: 'language',
            combine: 'all',
            from: {
              derived: { open: { flag: 'open' }, closed: { notFlag: 'open' } },
            },
          },
        ],
      },
      meaning: {
        identifierPrefix: 'papersv-',
        hit: { title: 'name', url: 'link' },
        facets: [
          {
            key: 'access',
            title: 'Access',
            pluralTitle: 'Access',
            from: { derived: { open: { flag: 'open' } } },
          },
        ],
      },
    },
  };
}

const words = (m: StaticItemManifest) => m.searches.words as TextSearch;
const meaning = (m: StaticItemManifest) => m.searches.meaning as VectorSearch;

/** checkConfig's error message, or '' when it passes. */
function problems(m: StaticItemManifest, c: StaticItemConfig): string {
  try {
    checkConfig(m, c);
    return '';
  } catch (err) {
    return String(err);
  }
}

describe('checkConfig', () => {
  it('passes a config that only names what the manifest has', () => {
    expect(problems(manifest(), config())).to.equal('');
  });

  it('catches a rebuild that renamed a flag a facet uses', () => {
    const m = manifest();
    const flags = m.idSpaces.papers.facets!.columns[1];
    if (flags.kind === 'flags') flags.bits = { isOpen: 1, peer: 2 };
    expect(problems(m, config())).to.include(
      'words: facet access: no flag "open"',
    );
  });

  it('catches a facet over a column the manifest doesn’t have', () => {
    const c = config();
    c.searches.words.facets[0].from = { column: 'language' };
    expect(problems(manifest(), c)).to.include(
      'words: facet language: no facet column "language"',
    );
  });

  it('catches a facet reading a flags column as one value', () => {
    const c = config();
    c.searches.words.facets[0].from = { column: 'flags' };
    expect(problems(manifest(), c)).to.include('column "flags" is flags');
  });

  it('catches a hit field the records don’t hold', () => {
    const c = config();
    c.searches.words.hit.date = 'date';
    expect(problems(manifest(), c)).to.include(
      'words: hit date: no record field "date"',
    );
  });

  it('accepts a hit field held only in an overflow file', () => {
    const m = manifest();
    m.idSpaces.papers.records.overflow = [
      { field: 'doi', dir: 'doi.dir', bin: 'doi.bin' },
    ];
    const c = config();
    c.searches.words.hit.url = 'doi';
    expect(problems(m, c)).to.equal('');
  });

  it('catches two record fields claiming one role', () => {
    const m = manifest();
    m.idSpaces.papers.records.fields[1].role = 'title';
    expect(problems(m, config())).to.include(
      'papers: record role "title" is used more than once',
    );
  });

  it('catches one query word searching two fields', () => {
    const m = manifest();
    words(m).text.fields[0].aliases = ['title', 'by'];
    expect(problems(m, config())).to.include(
      'words: alias "by" is used more than once',
    );
  });

  it('catches ranking for a field that doesn’t exist, in the manifest or the config', () => {
    const m = manifest();
    words(m).text.ranking!.sameFieldBoost.abstract = 1.2;
    const c = config();
    c.searches.words.ranking = { fieldWeights: { subject: 3 } };
    const message = problems(m, c);
    expect(message).to.include(
      'words: manifest ranking: no text field "abstract"',
    );
    expect(message).to.include(
      'words: config ranking: no text field "subject"',
    );
  });

  it('catches `after` naming no facet', () => {
    const c = config();
    c.searches.words.facets[1].after = 'langauge';
    expect(problems(manifest(), c)).to.include(
      'facet access: after "langauge", which isn\'t a facet',
    );
  });

  it('lets `after` name a column, e.g. a year shown by the host', () => {
    const c = config();
    c.searches.words.facets[1].after = 'lang';
    expect(problems(manifest(), c)).to.equal('');
  });

  describe('doc values', () => {
    /** The papers' publishers: too many for a byte, so in files of their own. */
    function withPublishers() {
      const m = manifest();
      m.idSpaces.papers.docValues = [
        {
          key: 'publisher',
          file: 'publisher.gz',
          gzip: true,
          bytes: 2,
          count: 900,
          labels: {
            file: 'publisher-labels.tsv',
            dir: 'publisher-labels.dir',
            columns: ['id', 'name', 'country'],
          },
          lookup: {
            dir: 'publisher-alias.json',
            bin: 'publisher-alias.bin',
            normalize:
              'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
            queryFields: ['by'],
          },
        },
      ];
      const c = config();
      c.searches.words.facets.push({
        key: 'publisher',
        title: 'Publisher',
        pluralTitle: 'Publishers',
        after: 'access',
        from: { column: 'publisher' },
        names: { from: 'labels', column: 'name', whenShared: 'country' },
      });
      return { m, c };
    }

    it('passes a facet over a doc value, named by its labels', () => {
      const { m, c } = withPublishers();
      expect(problems(m, c)).to.equal('');
    });

    it('catches a labels column the labels file doesn’t have', () => {
      const { m, c } = withPublishers();
      c.searches.words.facets[2].names = { from: 'labels', column: 'title' };
      expect(problems(m, c)).to.include(
        'facet publisher: no labels column "title"',
      );
    });

    it('catches labels names on a facet that isn’t a doc value', () => {
      const { m, c } = withPublishers();
      c.searches.words.facets[0].names = { from: 'labels', column: 'name' };
      expect(problems(m, c)).to.include(
        'facet language: labels names need a doc value column',
      );
    });

    it('catches a lookup for a query word that searches no field', () => {
      const { m, c } = withPublishers();
      m.idSpaces.papers.docValues![0].lookup!.queryFields = ['publisher'];
      expect(problems(m, c)).to.include(
        'words: doc value publisher: query field "publisher" searches no text field',
      );
    });

    it('catches a doc value named like a facet column', () => {
      const { m, c } = withPublishers();
      m.idSpaces.papers.docValues![0].key = 'lang';
      expect(problems(m, c)).to.include(
        'papers: facet column or doc value "lang" is used more than once',
      );
    });

    it('doesn’t let a vector search facet by a doc value of its id space', () => {
      const { m, c } = withPublishers();
      c.searches.meaning.facets.push({
        key: 'publisher',
        title: 'Publisher',
        pluralTitle: 'Publishers',
        from: { column: 'publisher' },
      });
      expect(problems(m, c)).to.include(
        'meaning: facet publisher: no facet column "publisher"',
      );
    });
  });

  it('catches facets configured for a text index with no facet rows', () => {
    const m = manifest();
    delete m.idSpaces.papers.facets;
    expect(problems(m, config())).to.include(
      'words: facets configured, but the manifest has no facet rows',
    );
  });

  describe('search by meaning', () => {
    it('catches a vector facet over a column only the text index has', () => {
      const c = config();
      c.searches.meaning.facets.push({
        key: 'language',
        title: 'Language',
        pluralTitle: 'Languages',
        from: { column: 'lang' },
      });
      expect(problems(manifest(), c)).to.include(
        'meaning: facet language: no facet column "lang"',
      );
    });

    it('catches a hit field from the other id space’s records', () => {
      const c = config();
      c.searches.meaning.hit.title = 'title';
      expect(problems(manifest(), c)).to.include(
        'meaning: hit title: no record field "title"',
      );
    });

    it('accepts a store whose facet rows were left out, as results show without them', () => {
      const m = manifest();
      delete meaning(m).facets;
      expect(problems(m, config())).to.equal('');
    });

    it('refuses a model library build it doesn’t pin, rather than load it', () => {
      const m = manifest();
      meaning(m).model.library.version = '3.1.0';
      expect(problems(m, config())).to.include(
        'meaning: model: no pinned build of @huggingface/transformers 3.1.0',
      );
    });

    it('catches rows that aren’t an id and a vector of the stated size', () => {
      const m = manifest();
      meaning(m).cells.rowBytes = 36;
      meaning(m).codes!.rowBytes = 12;
      const message = problems(m, config());
      expect(message).to.include(
        "meaning: cells: 36-byte rows aren't an id and 8 halfs",
      );
      expect(message).to.include(
        "meaning: codes: 12-byte rows aren't an id and 8 4-bit codes",
      );
    });

    it('catches more probes than cells, from the owner or the config', () => {
      const m = manifest();
      meaning(m).settings.nprobe = 5;
      const c = config();
      c.searches.meaning.settings = { nprobe: 0, rerank: 1.5 };
      const message = problems(m, c);
      expect(message).to.include(
        "meaning: manifest settings: nprobe 5 isn't 1 to 4 cells",
      );
      expect(message).to.include(
        "meaning: config settings: nprobe 0 isn't 1 to 4 cells",
      );
      expect(message).to.include(
        "meaning: config settings: rerank 1.5 isn't a count",
      );
    });

    it('catches settings and ranking given to the wrong kind of search', () => {
      const c = config();
      c.searches.words.settings = { nprobe: 2 };
      c.searches.meaning.ranking = { proximity: 0.5 };
      const message = problems(manifest(), c);
      expect(message).to.include('words: settings are for vector searches');
      expect(message).to.include('meaning: ranking is for text searches');
    });
  });

  describe('searches and id spaces', () => {
    it('catches a search over an id space the manifest doesn’t have', () => {
      const m = manifest();
      meaning(m).ids = 'abstract';
      expect(problems(m, config())).to.include(
        'meaning: no id space "abstract"',
      );
    });

    it('catches a config for a search the item doesn’t publish', () => {
      const m = manifest();
      delete m.searches.meaning;
      expect(problems(m, config())).to.include(
        'meaning: the manifest has no search "meaning"',
      );
    });

    it('catches one identifier prefix over two id spaces, which would name two docs alike', () => {
      const c = config();
      c.searches.meaning.identifierPrefix = 'papers-';
      expect(problems(manifest(), c)).to.include(
        'identifier prefix "papers-" names ids in both papers and abstracts',
      );
    });
  });

  it('refuses a format it doesn’t know, including the text-only v1', () => {
    const m = {
      ...manifest(),
      formatVersion: 1,
    } as unknown as StaticItemManifest;
    expect(problems(m, config())).to.include(
      'unknown format ia-static-index v1',
    );
  });

  it('lists every problem at once', () => {
    const c = config();
    c.searches.words.hit.creators = 'authors';
    c.searches.words.facets[0].from = { column: 'language' };
    c.searches.words.facets.push({ ...c.searches.words.facets[1] });
    const message = problems(manifest(), c);
    expect(message.split('\n- ').slice(1)).to.have.length(3);
    expect(message).to.include('facet "access" is configured more than once');
  });
});
