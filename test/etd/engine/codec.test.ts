import { expect } from '@open-wc/testing';
import {
  fnv1a,
  readOffsetPair,
  readVarint,
  tokenize,
} from '../../../src/etd/engine/codec';
import { writeVarint } from './fixture-index';

describe('tokenize', () => {
  it('lowercases and splits on anything that is not a token character', () => {
    expect(tokenize('Sea-Ice, and the ARCTIC (2014)!')).to.deep.equal([
      'sea',
      'ice',
      'and',
      'the',
      'arctic',
      '2014',
    ]);
  });

  it('keeps accented Latin and Greek letters inside words', () => {
    expect(tokenize('Universität Zürich σύνολα')).to.deep.equal([
      'universität',
      'zürich',
      'σύνολα',
    ]);
  });

  it('normalizes to NFC, so composed and decomposed accents match', () => {
    expect(tokenize('Zürich')).to.deep.equal(tokenize('Zürich'));
  });

  it('splits CJK runs longer than two characters into overlapping bigrams', () => {
    expect(tokenize('東京大学')).to.deep.equal(['東京', '京大', '大学']);
    expect(tokenize('大学')).to.deep.equal(['大学']);
  });
});

describe('fnv1a', () => {
  it('matches the published 32-bit FNV-1a test vectors', () => {
    expect(fnv1a('')).to.equal(0x811c9dc5);
    expect(fnv1a('a')).to.equal(0xe40c292c);
    expect(fnv1a('foobar')).to.equal(0xbf9cf968);
  });

  it('hashes the UTF-8 bytes, not UTF-16 code units', () => {
    expect(fnv1a('é')).not.to.equal(fnv1a('é'.normalize('NFD')));
  });
});

describe('readVarint', () => {
  it('reads single and multi-byte values and returns the next offset', () => {
    const bytes: number[] = [];
    writeVarint(bytes, 5);
    writeVarint(bytes, 300);
    const u8 = Uint8Array.from(bytes);
    expect(readVarint(u8, 0)).to.deep.equal([5, 1]);
    expect(readVarint(u8, 1)).to.deep.equal([300, 3]);
  });

  it('stays exact past 2^32, where postings offsets live', () => {
    const bytes: number[] = [];
    writeVarint(bytes, 7_935_789_146);
    expect(readVarint(Uint8Array.from(bytes), 0)[0]).to.equal(7_935_789_146);
  });

  it('throws instead of reading past a truncated buffer', () => {
    expect(() => readVarint(Uint8Array.from([0x80, 0x80]), 0)).to.throw(
      RangeError,
    );
  });
});

describe('readOffsetPair', () => {
  it('reads two little-endian u64 offsets', () => {
    const pair = new BigUint64Array([5_000_000_000n, 5_000_000_120n]);
    expect(readOffsetPair(new Uint8Array(pair.buffer))).to.deep.equal([
      5_000_000_000, 5_000_000_120,
    ]);
  });
});
