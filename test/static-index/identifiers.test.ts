import { expect } from '@open-wc/testing';
import {
  idFromIdentifier,
  identifierFor,
} from '../../src/static-index/identifiers';

describe('identifierFor', () => {
  it('names a doc by its 1-based position, so ids from 1 are themselves', () => {
    expect(identifierFor('etd-', 1, 1)).to.equal('etd-1');
    expect(identifierFor('etd-', 25860159, 1)).to.equal('etd-25860159');
  });

  it('names ids from 0 one up: the first docs.bin row is etdv-1', () => {
    expect(identifierFor('etdv-', 0, 0)).to.equal('etdv-1');
    expect(identifierFor('etdv-', 18176412, 0)).to.equal('etdv-18176413');
  });
});

describe('idFromIdentifier', () => {
  const vectorDocs = { count: 18176413, firstId: 0 as const };

  it('gives back the id an identifier was made from', () => {
    for (const id of [0, 1, 18176412]) {
      expect(
        idFromIdentifier(identifierFor('etdv-', id, 0), 'etdv-', vectorDocs),
      ).to.equal(id);
    }
  });

  it('refuses identifiers naming no doc: 0, past the end, padded, or another prefix', () => {
    for (const identifier of [
      'etdv-0',
      'etdv-18176414',
      'etdv-01',
      'etdv-1.5',
      'etdv-',
      'etd-1',
    ]) {
      expect(idFromIdentifier(identifier, 'etdv-', vectorDocs), identifier).to
        .be.undefined;
    }
  });
});
