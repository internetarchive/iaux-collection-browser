import { expect } from '@open-wc/testing';
import { checkConfig } from '../../src/static-index/check-config';
import type {
  StaticIndexManifest,
  StaticSearchConfig,
} from '../../src/static-index/manifest';

/** A small item: papers with a title, authors and a url, two facets. */
function manifest(): StaticIndexManifest {
  return {
    format: 'ia-static-index',
    formatVersion: 1,
    version: 'v1',
    docCount: 3,
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
    records: {
      bytes: 128,
      fields: [
        { key: 'title', start: 0, end: 80 },
        { key: 'url', start: 80, end: 128 },
      ],
    },
    facets: {
      file: 'facets.bin',
      stride: 2,
      gzip: false,
      columns: [
        { key: 'lang', kind: 'code', byte: 0, codes: ['en', 'fr'] },
        { key: 'flags', kind: 'flags', bytes: [1], bits: { open: 1, peer: 2 } },
      ],
    },
  };
}

function config(): StaticSearchConfig {
  return {
    baseUrl: 'https://archive.org/download/papers/',
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
  };
}

/** checkConfig's error message, or '' when it passes. */
function problems(m: StaticIndexManifest, c: StaticSearchConfig): string {
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
    const flags = m.facets!.columns[1];
    if (flags.kind === 'flags') flags.bits = { isOpen: 1, peer: 2 };
    expect(problems(m, config())).to.include('facet access: no flag "open"');
  });

  it('catches a facet over a column the manifest doesn’t have', () => {
    const c = config();
    c.facets[0].from = { column: 'language' };
    expect(problems(manifest(), c)).to.include(
      'facet language: no facet column "language"',
    );
  });

  it('catches a facet reading a flags column as one value', () => {
    const c = config();
    c.facets[0].from = { column: 'flags' };
    expect(problems(manifest(), c)).to.include('column "flags" is flags');
  });

  it('catches a hit field the records don’t hold', () => {
    const c = config();
    c.hit.date = 'date';
    expect(problems(manifest(), c)).to.include(
      'hit date: no record field "date"',
    );
  });

  it('accepts a hit field held only in an overflow file', () => {
    const m = manifest();
    m.records.overflow = [{ field: 'doi', dir: 'doi.dir', bin: 'doi.bin' }];
    const c = config();
    c.hit.url = 'doi';
    expect(problems(m, c)).to.equal('');
  });

  it('catches one query word searching two fields', () => {
    const m = manifest();
    m.text.fields[0].aliases = ['title', 'by'];
    expect(problems(m, config())).to.include(
      'alias "by" is used more than once',
    );
  });

  it('catches ranking for a field that doesn’t exist, in the manifest or the config', () => {
    const m = manifest();
    m.text.ranking!.sameFieldBoost.abstract = 1.2;
    const c = config();
    c.ranking = { fieldWeights: { subject: 3 } };
    const message = problems(m, c);
    expect(message).to.include('manifest ranking: no text field "abstract"');
    expect(message).to.include('config ranking: no text field "subject"');
  });

  it('catches `after` naming no facet', () => {
    const c = config();
    c.facets[1].after = 'langauge';
    expect(problems(manifest(), c)).to.include(
      'facet access: after "langauge", which isn\'t a facet',
    );
  });

  it('lets `after` name a column, e.g. a year shown by the host', () => {
    const c = config();
    c.facets[1].after = 'lang';
    expect(problems(manifest(), c)).to.equal('');
  });

  describe('doc values', () => {
    /** The papers' publishers: too many for a byte, so in files of their own. */
    function withPublishers() {
      const m = manifest();
      m.docValues = [
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
      c.facets.push({
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
      c.facets[2].names = { from: 'labels', column: 'title' };
      expect(problems(m, c)).to.include(
        'facet publisher: no labels column "title"',
      );
    });

    it('catches labels names on a facet that isn’t a doc value', () => {
      const { m, c } = withPublishers();
      c.facets[0].names = { from: 'labels', column: 'name' };
      expect(problems(m, c)).to.include(
        'facet language: labels names need a doc value column',
      );
    });

    it('catches a lookup for a query word that searches no field', () => {
      const { m, c } = withPublishers();
      m.docValues![0].lookup!.queryFields = ['publisher'];
      expect(problems(m, c)).to.include(
        'doc value publisher: query field "publisher" searches no text field',
      );
    });

    it('catches a doc value named like a facet column', () => {
      const { m, c } = withPublishers();
      m.docValues![0].key = 'lang';
      expect(problems(m, c)).to.include(
        'facet column or doc value "lang" is used more than once',
      );
    });
  });

  it('catches facets configured for an index with no facet rows', () => {
    const m = manifest();
    delete m.facets;
    expect(problems(m, config())).to.include('the manifest has no facet rows');
  });

  it('refuses a format it doesn’t know', () => {
    const m = {
      ...manifest(),
      formatVersion: 2,
    } as unknown as StaticIndexManifest;
    expect(problems(m, config())).to.include(
      'unknown format ia-static-index v2',
    );
  });

  it('lists every problem at once', () => {
    const c = config();
    c.hit.creators = 'authors';
    c.facets[0].from = { column: 'language' };
    c.facets.push({ ...c.facets[1] });
    const message = problems(manifest(), c);
    expect(message.split('\n- ').slice(1)).to.have.length(3);
    expect(message).to.include('facet "access" is configured more than once');
  });
});
