import { expect } from '@open-wc/testing';
import {
  facetLabel,
  facetRowReader,
  facetValues,
  labelNames,
  yearFromByte,
} from '../../src/static-index/facet-row';
import type { FacetConfig, FacetRows } from '../../src/static-index/manifest';

/**
 * Rows of 3 bytes: [year, flags + level, flags (high)].
 * Byte 1 holds flag bits 0-3 and a packed level in bits 4-6, the way ETD
 * shares a byte between flags and degree level.
 */
const ROWS: FacetRows = {
  file: 'facets.bin',
  stride: 3,
  gzip: false,
  columns: [
    { key: 'year', kind: 'year', byte: 0, encoding: 2 },
    {
      key: 'flags',
      kind: 'flags',
      bytes: [1, 2],
      bits: { open: 1, peer: 2, print: 256 },
    },
    {
      key: 'level',
      kind: 'packed',
      byte: 1,
      shift: 4,
      mask: 7,
      codes: { phd: 1, masters: 2 },
    },
    { key: 'lang', kind: 'code', byte: 2, codes: ['en', 'fr'] },
  ],
};

const read = facetRowReader(ROWS);
const row = (...bytes: number[]) => read(Uint8Array.from(bytes));

function facet(from: FacetConfig['from']): FacetConfig {
  return { key: 'f', title: 'F', pluralTitle: 'Fs', from };
}

describe('facetRowReader', () => {
  it('reads a packed value without the flag bits sharing its byte', () => {
    // level 1 (phd) at bits 4-6, flags open + peer below it
    expect(row(0, (1 << 4) | 3, 0).value('level')).to.equal('phd');
    expect(row(0, 3, 0).value('level')).to.be.undefined;
  });

  it('reads flags across bytes, the second byte as bits 8-15', () => {
    const r = row(0, (2 << 4) | 1, 1);
    expect(r.hasFlag('open')).to.be.true;
    expect(r.hasFlag('peer')).to.be.false;
    expect(r.hasFlag('print')).to.be.true;
    expect(r.hasFlag('unknown')).to.be.false;
  });

  it('reads a code column, 0 as unknown', () => {
    expect(row(0, 0, 2).value('lang')).to.equal('fr');
    expect(row(0, 0, 0).value('lang')).to.be.undefined;
  });

  it('reads a two-byte code column little-endian, for lists over 255', () => {
    const hosts = Array.from({ length: 300 }, (_, i) => `host${i + 1}.edu`);
    const wide = facetRowReader({
      file: 'cell-facets.bin',
      stride: 4,
      gzip: false,
      columns: [
        { key: 'flags', kind: 'flags', bytes: [1], bits: { open: 1 } },
        { key: 'domain', kind: 'code', byte: 2, width: 2, codes: hosts },
      ],
    });
    // 300 = 0x012c: 0x2c, then 0x01
    expect(wide(Uint8Array.from([0, 1, 0x2c, 0x01])).value('domain')).to.equal(
      'host300.edu',
    );
    expect(wide(Uint8Array.from([0, 1, 7, 0])).value('domain')).to.equal(
      'host7.edu',
    );
    expect(wide(Uint8Array.from([0, 1, 0, 0])).value('domain')).to.be.undefined;
  });

  it('reads a year column in its encoding', () => {
    expect(row(115, 0, 0).value('year')).to.equal('1994');
    expect(row(18, 0, 0).value('year')).to.equal('1870');
    expect(row(0, 0, 0).value('year')).to.be.undefined;
  });
});

describe('facetRowReader, with doc values', () => {
  it('reads a doc’s id from its doc values, 0 as unknown', () => {
    const readIds = facetRowReader(ROWS, {
      publisher: Uint16Array.from([7, 0, 300]),
    });
    const values = (docId: number) =>
      readIds(Uint8Array.from([0, 0, 0]), docId).value('publisher');
    expect([1, 2, 3].map(values)).to.deep.equal(['7', undefined, '300']);
  });
});

describe('labelNames', () => {
  const labels = {
    file: 'publisher-labels.tsv',
    dir: 'publisher-labels.dir',
    columns: ['id', 'name', 'country'],
  };
  const text = 'P1\tSpringer\tDE\nP2\tOrbis\tUS\nP3\tOrbis\tPL\nP4\t\t\n';

  it('names each id from a column, in id order', () => {
    expect(
      labelNames({ from: 'labels', column: 'name' }, labels, text),
    ).to.deep.equal(['Springer', 'Orbis', 'Orbis', 'P4']);
  });

  it('adds `whenShared` only where ids share a name', () => {
    expect(
      labelNames(
        { from: 'labels', column: 'name', whenShared: 'country' },
        labels,
        text,
      ),
    ).to.deep.equal(['Springer', 'Orbis (US)', 'Orbis (PL)', 'P4']);
  });
});

describe('yearFromByte', () => {
  it('reads encoding 2: decades before 1900, years from 1900', () => {
    expect(yearFromByte(1, 2)).to.equal(1700);
    expect(yearFromByte(21, 2)).to.equal(1900);
    expect(yearFromByte(255, 2)).to.equal(2134);
  });

  it('reads encoding 1 as 1900 + byte', () => {
    expect(yearFromByte(94, 1)).to.equal(1994);
  });
});

describe('facetValues', () => {
  it('gives a column’s value, or the unknown value when it has none', () => {
    const level = facet({ column: 'level', unknownAs: 'unknown' });
    expect(facetValues(level, row(0, 2 << 4, 0))).to.deep.equal(['masters']);
    expect(facetValues(level, row(0, 0, 0))).to.deep.equal(['unknown']);
    expect(facetValues(facet({ column: 'level' }), row(0, 0, 0))).to.deep.equal(
      [],
    );
  });

  it('gives each listed flag the doc has, in the listed order', () => {
    const source = facet({ flags: ['print', 'open', 'peer'] });
    expect(facetValues(source, row(0, 1, 1))).to.deep.equal(['print', 'open']);
  });

  it('gives each derived value whose rule passes', () => {
    const access = facet({
      derived: {
        open: { flag: 'open' },
        reviewed: { anyFlag: ['peer', 'print'] },
        online: { notFlag: 'print' },
      },
    });
    expect(facetValues(access, row(0, 1, 0))).to.deep.equal(['open', 'online']);
    expect(facetValues(access, row(0, 0, 1))).to.deep.equal(['reviewed']);
  });
});

describe('facetLabel', () => {
  it('names a code from a table, else shows the code', () => {
    const names = { from: 'table' as const, labels: { phd: 'Doctoral' } };
    expect(facetLabel(names, 'phd')).to.equal('Doctoral');
    expect(facetLabel(names, 'masters')).to.equal('masters');
    expect(facetLabel(undefined, 'phd')).to.equal('phd');
  });

  it('names ISO codes through the browser, overrides first', () => {
    const languages = {
      from: 'intl' as const,
      type: 'language' as const,
      overrides: { ng: 'Ndonga' },
    };
    expect(facetLabel(languages, 'pt')).to.equal('Portuguese');
    expect(facetLabel(languages, 'ng')).to.equal('Ndonga');
    expect(facetLabel({ from: 'intl', type: 'region' }, 'BR')).to.equal(
      'Brazil',
    );
  });

  it('shows a code the browser can’t name as itself', () => {
    expect(facetLabel({ from: 'intl', type: 'region' }, 'not a code')).to.equal(
      'not a code',
    );
  });
});
