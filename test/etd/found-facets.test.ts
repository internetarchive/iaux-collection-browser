import { expect } from '@open-wc/testing';
import type { EtdRecord } from '../../src/etd/etd-engine';
import { estimatedCount, findFacets } from '../../src/etd/found-facets';
import type { FoundFacets, FoundGroup } from '../../src/etd/found-facets';

let nextId = 1;

/** A thesis record as a sample reads it: stub fields only. */
function thesis(domain: string, date: string, creators: string): EtdRecord {
  const docId = nextId;
  nextId += 1;
  return { docId, title: `Thesis ${docId}`, creators, date, domain, url: '' };
}

/**
 * 40 "sea ice"-like results: a handful of repositories, each repeating, a
 * few decades, and every thesis by its own author, as theses are.
 */
function seaIce(): EtdRecord[] {
  const repositories = [
    ...Array(14).fill('ethos.bl.uk'),
    ...Array(10).fill('tel.archives-ouvertes.fr'),
    ...Array(8).fill('epic.awi.de'),
    ...Array(6).fill('dspace.mit.edu'),
    'oda.uit.no',
    'theseus.fi',
  ];
  return repositories.map((domain, i) =>
    thesis(domain, `${[2014, 2019, 2003, 1987][i % 4]}`, `Author ${i}, A.`),
  );
}

function group(found: FoundFacets, key: string): FoundGroup {
  return found.groups.find(candidate => candidate.key === key)!;
}

describe('findFacets', () => {
  it('shows repository and decade as groups, and not creators, for theses', () => {
    const found = findFacets({ records: seaIce(), of: 77112 });

    expect(found.sampled).to.equal(40);
    expect(found.of).to.equal(77112);
    expect(found.groups.filter(g => g.shown).map(g => g.key)).to.deep.equal([
      'repository',
      'decade',
    ]);
    expect(group(found, 'repository').values.slice(0, 2)).to.deep.equal([
      { value: 'ethos.bl.uk', count: 14 },
      { value: 'tel.archives-ouvertes.fr', count: 10 },
    ]);
    expect(group(found, 'decade').values).to.deep.equal([
      { value: '2010s', count: 20 },
      { value: '1980s', count: 10 },
      { value: '2000s', count: 10 },
    ]);
    expect(group(found, 'creator').why).to.equal(
      'mostly one-offs: 40 values in 40 results',
    );
  });

  it('shows creators where they repeat, e.g. a few authors’ papers', () => {
    const records = Array.from({ length: 30 }, (_, i) =>
      thesis(
        'repo.example.edu',
        '2020',
        ['Okafor, Ada', 'Lindqvist, Sven', 'Mbeki, Thandi'][i % 3],
      ),
    );
    const found = findFacets({ records, of: 30 });
    expect(group(found, 'creator').shown).to.be.true;
    expect(group(found, 'creator').values[0].count).to.equal(10);
  });

  it('counts each of a thesis’s creators, and a value once per thesis', () => {
    const found = findFacets({
      records: [thesis('a.edu', '2001', 'Ice, Mara; Okafor, Ada; Ice, Mara')],
      of: 1,
    });
    expect(group(found, 'creator').values).to.deep.equal([
      { value: 'Ice, Mara', count: 1 },
      { value: 'Okafor, Ada', count: 1 },
    ]);
  });

  it('leaves out a field few results have, saying how few', () => {
    const records = seaIce().map((record, i) =>
      i < 30 ? { ...record, date: '' } : record,
    );
    expect(group(findFacets({ records, of: 40 }), 'decade').why).to.equal(
      'only 25% of these have one',
    );
  });

  it('leaves out a field with no choice in it', () => {
    // An item from one repository: every result has the same domain.
    const records = seaIce().map(record => ({
      ...record,
      domain: 'oda.uit.no',
    }));
    expect(group(findFacets({ records, of: 40 }), 'repository').why).to.equal(
      'nearly all are oda.uit.no',
    );
  });

  it('judges nothing from a handful of results', () => {
    const found = findFacets({ records: seaIce().slice(0, 5), of: 5 });
    expect(found.groups.every(g => !g.shown)).to.be.true;
    expect(found.groups[0].why).to.equal('too few results to tell');
    // Still counted, for whoever wants to see them.
    expect(found.groups[0].values).to.have.length(1);
  });

  it('takes no year from a date that is missing, malformed or in the future', () => {
    const future = new Date().getFullYear() + 10;
    const found = findFacets({
      records: [
        thesis('a.edu', '2019-05-01', 'A'),
        thesis('a.edu', 'n.d.', 'B'),
        thesis('a.edu', '', 'C'),
        thesis('a.edu', `${future}`, 'D'),
        thesis('a.edu', '1755', 'E'),
      ],
      of: 5,
    });
    expect(group(found, 'decade').values).to.deep.equal([
      { value: '1750s', count: 1 },
      { value: '2010s', count: 1 },
    ]);
    expect(group(found, 'decade').withValue).to.equal(2);
  });

  it('has no groups for no results', () => {
    const found = findFacets({ records: [], of: 0 });
    expect(found.groups.every(g => !g.shown && !g.values.length)).to.be.true;
  });
});

describe('estimatedCount', () => {
  it('scales a sampled count up to every match', () => {
    const found = findFacets({ records: seaIce(), of: 77112 });
    // 14 of 40 sampled: about 35% of 77,112.
    expect(estimatedCount(14, found)).to.equal(26989);
  });

  it('leaves a count alone when every match was read', () => {
    const found = findFacets({ records: seaIce(), of: 40 });
    expect(estimatedCount(14, found)).to.equal(14);
  });
});
