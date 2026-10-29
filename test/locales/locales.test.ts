import { expect, fixture } from '@open-wc/testing';
import { configureLocalization } from '@lit/localize';
import { html } from 'lit';
import { SortField } from '../../src/models';
import { templates } from '../../src/locales/es';
import type { EmptyPlaceholder } from '../../src/empty-placeholder';
import type { ManageBar } from '../../src/manage/manage-bar';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import type { AccountTile } from '../../src/tiles/grid/account-tile';
import type { CollectionTile } from '../../src/tiles/grid/collection-tile';
import type { TileStats } from '../../src/tiles/grid/tile-stats';
import type { TextOverlay } from '../../src/tiles/overlay/text-overlay';

import '../../src/empty-placeholder';
import '../../src/manage/manage-bar';
import '../../src/sort-filter-bar/sort-filter-bar';
import '../../src/tiles/grid/account-tile';
import '../../src/tiles/grid/collection-tile';
import '../../src/tiles/grid/tile-stats';
import '../../src/tiles/overlay/text-overlay';

// This package never configures localization. The app that uses it does, once,
// and this file stands in for that app.
const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('../../src/locales/es'),
});

/** Ids of the units in `xliff` that have a non-blank target. */
function translatedIds(xliff: string): string[] {
  return [
    ...xliff.matchAll(
      /<trans-unit id="([^"]+)"[^>]*>([\s\S]*?)<\/trans-unit>/g,
    ),
  ]
    .filter(([, , unit]) => {
      const target = /<target>([\s\S]*?)<\/target>/.exec(unit);
      return target !== null && target[1].trim() !== '';
    })
    .map(([, id]) => id);
}

describe('published es locale', () => {
  afterEach(async () => {
    await setLocale('en');
  });

  it('has exactly the translated units in the XLIFF', async () => {
    // An untranslated message has to be missing, not English. The app merges
    // this module with others, and an English entry would override a real
    // translation of the same text.
    const response = await fetch('/xliff/es.xlf');
    expect(response.ok).to.be.true;
    const ids = translatedIds(await response.text());

    expect(ids).to.not.be.empty;
    expect(Object.keys(templates).sort()).to.deep.equal([...ids].sort());
  });

  it('re-renders elements already on the page when the locale changes', async () => {
    // Covers strings that live outside render(): a static getter, a
    // module-level map and a property's default. They have to be read at
    // render time to translate.
    const placeholder = await fixture<EmptyPlaceholder>(html`
      <empty-placeholder placeholderType="empty-collection"></empty-placeholder>
    `);
    const overlay = await fixture<TextOverlay>(html`
      <text-overlay type="login-required"></text-overlay>
    `);
    const manageBar = await fixture<ManageBar>(html`<manage-bar></manage-bar>`);
    const placeholderText = () =>
      placeholder.shadowRoot?.querySelector('.title')?.textContent?.trim();
    const overlayText = () =>
      overlay.shadowRoot?.querySelector('.text-overlay')?.textContent?.trim();
    const manageLabel = () =>
      manageBar.shadowRoot?.querySelector('.manage-label')?.textContent?.trim();
    expect(placeholderText()).to.equal(
      'This collection contains no viewable items.',
    );
    expect(overlayText()).to.equal('Log in to view this item');
    expect(manageLabel()).to.equal('Select items to remove');

    await setLocale('es');
    await placeholder.updateComplete;
    await overlay.updateComplete;
    await manageBar.updateComplete;

    expect(placeholderText()).to.equal(
      'Esta colección no contiene elementos que se puedan ver.',
    );
    expect(overlayText()).to.equal('Inicia sesión para ver este elemento');
    expect(manageLabel()).to.equal(
      'Selecciona los elementos que quieres quitar',
    );
  });

  it('re-renders sort names, stats labels and item counts when the locale changes', async () => {
    // The sort names live in the module-level SORT_OPTIONS map, so they have
    // to be read at render time to translate.
    const sortBar = await fixture<SortFilterBar>(html`
      <sort-filter-bar .selectedSort=${SortField.relevance}></sort-filter-bar>
    `);
    const tileStats = await fixture<TileStats>(html`
      <tile-stats mediatype="texts"></tile-stats>
    `);
    const collectionTile = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{ identifier: 'foo', mediatype: 'collection', itemCount: 2 }}
      ></collection-tile>
    `);
    const sortLabel = () =>
      sortBar.shadowRoot
        ?.querySelector('#sort-dropdown .dropdown-label')
        ?.textContent?.trim();
    const statsLabel = () =>
      tileStats.shadowRoot
        ?.querySelector('.item-stats > .sr-only')
        ?.textContent?.trim();
    const itemCount = () =>
      collectionTile.shadowRoot
        ?.querySelector('#item-count')
        ?.textContent?.trim();
    expect(sortLabel()).to.equal('Relevance');
    expect(statsLabel()).to.equal('Item Stats');
    expect(itemCount()).to.equal('2 items');

    await setLocale('es');
    await sortBar.updateComplete;
    await tileStats.updateComplete;
    await collectionTile.updateComplete;

    expect(sortLabel()).to.equal('Relevancia');
    expect(statsLabel()).to.equal('Estadísticas del elemento');
    expect(itemCount()).to.equal('2 elementos');
  });

  it('renders a tile in Spanish once the app sets the locale', async () => {
    await setLocale('es');
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          identifier: '@jack-sparrow',
          mediatype: 'account',
          dateAdded: new Date('2022-02-02'),
          itemCount: 999,
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const archivist = el.shadowRoot?.querySelector('.archivist-since');
    expect(archivist?.textContent?.trim()).to.equal('Archivista desde 2022');

    const tileStats = el.shadowRoot?.querySelector<TileStats>('tile-stats');
    await tileStats?.updateComplete;
    const uploads = tileStats?.shadowRoot
      ?.querySelectorAll('#stats-row .col')[1]
      ?.querySelector('.sr-only');
    expect(uploads?.textContent).to.equal('subidas:');
  });

  it('formats a count and a byte size for the active locale', async () => {
    const collectionTile = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{
          identifier: 'foo',
          mediatype: 'collection',
          itemCount: 76965,
          collectionSize: 1125833936144957.5,
        }}
      ></collection-tile>
    `);
    const itemCount = () =>
      collectionTile.shadowRoot
        ?.querySelector('#item-count')
        ?.textContent?.trim();
    const itemSize = () =>
      collectionTile.shadowRoot
        ?.querySelector('#item-size')
        ?.textContent?.trim();

    expect(itemCount()).to.equal('76,965 items');
    expect(itemSize()).to.equal('1,023.9 terabytes');

    await setLocale('es');
    await collectionTile.updateComplete;

    expect(itemCount()).to.equal('76.965 elementos');
    expect(itemSize()).to.equal('1023,9 terabytes');
  });
});
