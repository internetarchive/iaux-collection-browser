import { expect } from '@open-wc/testing';
import { EtdFacets } from '../../../src/etd/engine/facets';
import { EtdIndexFiles } from '../../../src/etd/engine/index-files';
import {
  institutionKey,
  institutionNames,
  parseInstitutionLabels,
} from '../../../src/etd/engine/institutions';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';
import type { FixtureInstitution, FixtureThesis } from './fixture-index';

describe('institutionKey', () => {
  it('keys names as the alias index does', () => {
    // Expected keys are lines from the real inst-alias.bin.
    expect(institutionKey('MIT')).to.equal('mit');
    expect(institutionKey('Massachusetts Institute of Technology')).to.equal(
      'massachusetts institute of technology',
    );
  });

  it('strips accents, punctuation and a leading "the"', () => {
    expect(institutionKey('Université de Montréal')).to.equal(
      'universite de montreal',
    );
    expect(institutionKey('The University of St. Andrews')).to.equal(
      'university of st andrews',
    );
    expect(institutionKey("King's College  London")).to.equal(
      'king s college london',
    );
    // Only a leading one.
    expect(institutionKey('Theological Seminary')).to.equal(
      'theological seminary',
    );
  });

  it('keeps letters in any script', () => {
    expect(institutionKey('東京大学')).to.equal('東京大学');
    expect(institutionKey('  ')).to.equal('');
  });
});

describe('institutionNames', () => {
  const labels = parseInstitutionLabels(
    [
      'Q31519\tCharles University\tCZ\t152959',
      'Q151510\tHeidelberg University\tDE\t37093',
      'Q5698693\tHeidelberg University\tUS\t3',
      'Q301450\tAarhus School of Business\tDK\t13',
      'Q122927085\tAarhus School of Business\tDK\t2',
      'Q99\t\t\t1',
      '',
    ].join('\n'),
  );

  it('reads one label per id, in id order', () => {
    expect(labels).to.have.length(6);
    expect(labels[0]).to.deep.equal({
      qid: 'Q31519',
      label: 'Charles University',
      country: 'CZ',
    });
  });

  it('adds the country only where institutions share a label', () => {
    expect(institutionNames(labels)).to.deep.equal([
      'Charles University',
      'Heidelberg University (DE)',
      'Heidelberg University (US)',
      // Same label and country: still one name.
      'Aarhus School of Business (DK)',
      'Aarhus School of Business (DK)',
      // No label: its Wikidata id.
      'Q99',
    ]);
  });
});

describe('EtdInstitutions', () => {
  const institutions: FixtureInstitution[] = [
    {
      label: 'Massachusetts Institute of Technology',
      country: 'US',
      aliases: ['MIT'],
    },
    { label: 'Heidelberg University', country: 'DE' },
    { label: 'Heidelberg University', country: 'US' },
    { label: 'Université de Montréal', country: 'CA' },
  ];
  const theses: FixtureThesis[] = [
    { title: 'a', institutionId: 1 },
    { title: 'b', institutionId: 3 },
    { title: 'c' },
    { title: 'd', institutionId: 4 },
  ];

  async function open(withList = true) {
    const index = await buildFixtureIndex(theses, {
      institutions: withList ? institutions : undefined,
    });
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    const facets = new EtdFacets(files, { cache: false });
    return { index, facets, list: facets.institutions };
  }

  it('looks a name up by any spelling the index knows', async () => {
    const { list } = await open();
    expect([...(await list.idsFor('mit'))]).to.deep.equal([1]);
    expect([
      ...(await list.idsFor('Massachusetts Institute of Technology')),
    ]).to.deep.equal([1]);
    expect([...(await list.idsFor('universite de montreal'))]).to.deep.equal([
      4,
    ]);
  });

  it('gives every institution a name stands for', async () => {
    const { list } = await open();
    expect([...(await list.idsFor('heidelberg university'))]).to.deep.equal([
      2, 3,
    ]);
  });

  it('knows nothing of other names, or of an index without a list', async () => {
    expect((await (await open()).list.idsFor('harvard')).size).to.equal(0);
    expect((await (await open()).list.idsFor('...')).size).to.equal(0);
    const without = await open(false);
    expect(await without.list.meta()).to.be.undefined;
    expect((await without.list.idsFor('mit')).size).to.equal(0);
  });

  it('reads one bucket of the alias file per name', async () => {
    const { index, list } = await open();
    await list.idsFor('mit');
    await list.idsFor('heidelberg university');
    const urls = index.requests.map(r => r.url.split('.test1')[0]);
    expect(urls.filter(u => u.endsWith('inst-alias.json'))).to.have.length(1);
    const ranges = index.requests.filter(r => r.url.includes('inst-alias.bin'));
    expect(ranges).to.have.length(2);
    expect(ranges.every(r => r.range)).to.be.true;
  });

  it('gives each doc its institution, by id and by name', async () => {
    const { facets } = await open();
    const rows = await facets.rows();
    expect(rows.hasInstitutions).to.be.true;
    expect([1, 2, 3, 4].map(d => rows.institution(d))).to.deep.equal([
      1, 3, 0, 4,
    ]);
    expect([1, 2, 3, 4].map(d => rows.institutionName(d))).to.deep.equal([
      'Massachusetts Institute of Technology',
      'Heidelberg University (US)',
      undefined,
      'Université de Montréal',
    ]);
  });

  it('leaves facet rows without institutions when the index has no list', async () => {
    const { facets } = await open(false);
    const rows = await facets.rows();
    expect(rows.hasInstitutions).to.be.false;
    expect(rows.institutionName(1)).to.be.undefined;
    expect(rows.year(1)).to.equal(0);
  });

  it('fails the facets load, to be tried again, when the ids fail to download', async () => {
    const { index, facets } = await open();
    index.failNext('inst.gz.json');
    let error: unknown;
    try {
      await facets.rows();
    } catch (err) {
      error = err;
    }
    expect(String(error)).to.include('HTTP 500');
    expect((await facets.rows()).institution(1)).to.equal(1);
  });
});
