import { describe, it, expect } from 'vitest';
import { nothing } from 'lit';
import { TileDisplayValueProvider } from '../../src/tiles/tile-display-value-provider';
import type { TileModel } from '../../src/models';

describe('Tile Display Value Provider', () => {
  describe('basic construction', () => {
    it('constructs w/ no options', () => {
      const provider = new TileDisplayValueProvider();
      expect(provider).to.exist;
    });

    it('constructs w/ options', () => {
      const provider = new TileDisplayValueProvider({
        model: {} as TileModel,
        baseNavigationUrl: 'foo',
        collectionPagePath: 'bar',
        sortParam: { field: 'baz', direction: 'asc' },
        creatorFilter: 'X',
      });
      expect(provider).to.exist;
    });
  });

  describe('firstCreatorMatchingFilter', () => {
    it('provides undefined creator when no model set', () => {
      const provider = new TileDisplayValueProvider();
      expect(provider.firstCreatorMatchingFilter).to.be.undefined;
    });

    it('provides creator from model with no filter', () => {
      const provider = new TileDisplayValueProvider({
        model: { creator: 'foo', creators: ['foo', 'bar', 'baz'] } as TileModel,
      });

      expect(provider.firstCreatorMatchingFilter).to.equal('foo');
    });

    it('provides first creator matching filter when present', () => {
      const provider = new TileDisplayValueProvider({
        model: { creator: 'foo', creators: ['foo', 'bar', 'baz'] } as TileModel,
        creatorFilter: 'B',
      });

      expect(provider.firstCreatorMatchingFilter).to.equal('bar');
    });

    it('matches letters with diacritics', () => {
      const provider = new TileDisplayValueProvider({
        model: {
          creator: 'foo',
          creators: ['foo', 'émile', 'ernest'],
        } as TileModel,
        creatorFilter: 'E',
      });

      expect(provider.firstCreatorMatchingFilter).to.equal('émile');
    });

    it('ignores non-alphabetical characters when matching', () => {
      const provider = new TileDisplayValueProvider({
        model: {
          creator: 'foo',
          creators: ['foo', '"(bar)"', 'baz'],
        } as TileModel,
        creatorFilter: 'B',
      });

      expect(provider.firstCreatorMatchingFilter).to.equal('"(bar)"');
    });
  });

  describe('accountLabel', () => {
    it('provides empty account label when no model', () => {
      const provider = new TileDisplayValueProvider();
      expect(provider.accountLabel).to.equal('');
    });

    it('provides empty account label when no date added', () => {
      const provider = new TileDisplayValueProvider({ model: {} as TileModel });
      expect(provider.accountLabel).to.equal('');
    });

    it('provides Archivist label from date added', () => {
      const provider = new TileDisplayValueProvider({
        model: { dateAdded: new Date(2010, 1, 2) } as TileModel,
      });

      expect(provider.accountLabel).to.equal('Archivist since 2010');
    });
  });

  describe('dateLabel', () => {
    it('provides empty date label when no sort param', () => {
      const provider = new TileDisplayValueProvider();
      expect(provider.dateLabel).to.equal('');
    });

    it('provides empty date label when sorting by non-date', () => {
      const provider = new TileDisplayValueProvider({
        sortParam: { field: 'downloads', direction: 'desc' },
      });
      expect(provider.dateLabel).to.equal('');
    });

    it('provides correct date label for publicdate', () => {
      const provider = new TileDisplayValueProvider({
        sortParam: { field: 'publicdate', direction: 'asc' },
      });

      expect(provider.dateLabel).to.equal('Archived');
    });

    it('provides correct date label for reviewdate', () => {
      const provider = new TileDisplayValueProvider({
        sortParam: { field: 'reviewdate', direction: 'asc' },
      });

      expect(provider.dateLabel).to.equal('Reviewed');
    });

    it('provides correct date label for addeddate', () => {
      const provider = new TileDisplayValueProvider({
        sortParam: { field: 'addeddate', direction: 'asc' },
      });

      expect(provider.dateLabel).to.equal('Added');
    });

    it('provides correct date label for published date', () => {
      const provider = new TileDisplayValueProvider({
        sortParam: { field: 'date', direction: 'asc' },
      });

      expect(provider.dateLabel).to.equal('Published');
    });
  });

  describe('itemPageUrl', () => {
    it('provides nothing when no base url set', () => {
      const provider = new TileDisplayValueProvider();
      expect(provider.itemPageUrl('foo')).to.equal(nothing);
    });

    it('provides nothing when identifier is empty', () => {
      const provider = new TileDisplayValueProvider({
        baseNavigationUrl: 'foo',
      });
      expect(provider.itemPageUrl('')).to.equal(nothing);
    });

    it('builds correct url from base and identifier', () => {
      const provider = new TileDisplayValueProvider({
        baseNavigationUrl: 'base',
      });
      expect(provider.itemPageUrl('foo')).to.equal('base/details/foo');
    });

    it('allows base url to be empty', () => {
      const provider = new TileDisplayValueProvider({ baseNavigationUrl: '' });
      expect(provider.itemPageUrl('foo')).to.equal('/details/foo');
    });

    it('uses provided collection base path for collections', () => {
      const provider = new TileDisplayValueProvider({
        baseNavigationUrl: 'base',
        collectionPagePath: '/collection/',
      });
      expect(provider.itemPageUrl('foo', true)).to.equal('base/collection/foo');
    });
  });
});
