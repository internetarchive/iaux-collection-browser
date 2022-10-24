/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileList } from '../../../src/tiles/list/tile-list';

import '../../../src/tiles/list/tile-list';
import { MockCollectionNameCache } from '../../mocks/mock-collection-name-cache';
import type { TileModel } from '../../../src/models';

describe('List Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileList>(html`<tile-list></tile-list>`);

    const listContainer = el.shadowRoot?.querySelector('#list-line');
    const itemTitle = el.shadowRoot?.querySelector('#title');
    const imageBlock = el.shadowRoot?.querySelector('image-block');

    expect(listContainer).to.exist;
    expect(itemTitle).to.exist;
    expect(imageBlock).to.exist;
  });

  it('should render with creator element but not dates', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .model=${{ creators: ['someone'] }}></tile-list>
    `);

    const creator = el.shadowRoot?.querySelector('#creator');
    const datesLine = el.shadowRoot?.querySelector('#dates-line');

    expect(creator).to.exist;
    expect(datesLine?.children.length).to.equal(0);
  });

  it('should render with snippet block when it has snippets', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .model=${{ snippets: ['some {{{snippet}}} text'] }}>
      </tile-list>
    `);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.exist;
  });

  it('should not render snippet block when no snippets are present', async () => {
    const el = await fixture<TileList>(html`<tile-list></tile-list>`);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.not.exist;
  });

  it('should not render suppressed collections', async () => {
    const collectionNameCache = new MockCollectionNameCache();
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{ collections: ['deemphasize', 'community', 'foo'] }}
        .collectionNameCache=${collectionNameCache}
      >
      </tile-list>
    `);

    const collectionsRow = el.shadowRoot?.getElementById('collections');
    expect(collectionsRow).to.exist;

    const collectionLinks = collectionsRow?.querySelectorAll('a[href]');
    expect(collectionLinks?.length).to.equal(1);
    expect(collectionLinks?.item(0).getAttribute('href')).to.equal(
      '/details/foo'
    );
  });

  it('should render weekly views when sorting by week', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{ viewCount: 50, weeklyViewCount: 10 }}
        .sortParam=${{ field: 'week', direction: 'desc' }}
      >
      </tile-list>
    `);

    const viewsRow = el.shadowRoot?.getElementById('views-line');
    expect(viewsRow).to.exist;
    expect(viewsRow?.textContent?.trim()).to.equal('Views:  10');
  });

  it('should render added date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date('2010-01-01'),
      dateArchived: new Date('2011-01-01'),
      datePublished: new Date('2012-01-01'),
      dateReviewed: new Date('2013-01-01'),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Added:  Jan 01, 2010');
  });

  it('should render links to /search pages (not search.php) for subject, creator, and source', async () => {
    const model: Partial<TileModel> = {
      subjects: ['foo'],
      creators: ['bar'],
      source: 'baz',
    };

    const el = await fixture<TileList>(html`
      <tile-list .model=${model}></tile-list>
    `);

    const subjectLink = el.shadowRoot?.querySelector('#topics a[href]');
    expect(subjectLink).to.exist;
    expect(subjectLink?.getAttribute('href')).to.equal(
      `/search?query=${encodeURIComponent('subject:"foo"')}`
    );

    const creatorLink = el.shadowRoot?.querySelector('#creator a[href]');
    expect(creatorLink).to.exist;
    expect(creatorLink?.getAttribute('href')).to.equal(
      `/search?query=${encodeURIComponent('creator:"bar"')}`
    );

    const sourceLink = el.shadowRoot?.querySelector('#source a[href]');
    expect(sourceLink).to.exist;
    expect(sourceLink?.getAttribute('href')).to.equal(
      `/search?query=${encodeURIComponent('source:"baz"')}`
    );
  });
});
