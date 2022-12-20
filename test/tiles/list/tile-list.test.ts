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

  it('should render the mobile template if below mobile breakpoint', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .mobileBreakpoint=${500} .currentWidth=${400}> </tile-list>
    `);

    const listContainer = el.shadowRoot?.getElementById('list-line');
    const topLine = el.shadowRoot?.getElementById('list-line-top');
    const bottomLine = el.shadowRoot?.getElementById('list-line-bottom');

    expect(listContainer).to.exist;
    expect(listContainer?.classList.contains('mobile')).to.be.true;
    expect(topLine).to.exist;
    expect(bottomLine).to.exist;
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

  it('should not render fav- collections', async () => {
    const collectionNameCache = new MockCollectionNameCache();
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{ collections: ['fav-foo', 'bar'] }}
        .collectionNameCache=${collectionNameCache}
      >
      </tile-list>
    `);

    const collectionsRow = el.shadowRoot?.getElementById('collections');
    expect(collectionsRow).to.exist;

    const collectionLinks = collectionsRow?.querySelectorAll('a[href]');
    expect(collectionLinks?.length).to.equal(1);
    expect(collectionLinks?.item(0).getAttribute('href')).to.equal(
      '/details/bar'
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

  it('should render multi-line descriptions with spaces b/w lines', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .model=${{ description: 'line1\nline2' }}> </tile-list>
    `);

    const descriptionBlock = el.shadowRoot?.getElementById('description');
    expect(descriptionBlock).to.exist;
    expect(descriptionBlock?.textContent?.trim()).to.equal('line1 line2'); // line break replaced by space
  });

  it('should render mediatype icon as link to corresponding mediatype collection details', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'texts',
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .baseNavigationUrl=${'https://archive.org'}
        .model=${model}
      ></tile-list>
    `);

    const mediatypeLink = el.shadowRoot?.querySelector('a#icon-right');
    expect(mediatypeLink).to.exist;
    expect(mediatypeLink?.getAttribute('href')).to.equal(
      `https://archive.org/details/texts`
    );
  });

  it('should render collection mediatype icon as link to search page', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'collection',
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .baseNavigationUrl=${'https://archive.org'}
        .model=${model}
      ></tile-list>
    `);

    const mediatypeLink = el.shadowRoot?.querySelector('a#icon-right');
    expect(mediatypeLink).to.exist;
    expect(mediatypeLink?.getAttribute('href')).to.equal(
      `https://archive.org/search?query=mediatype:collection&sort=-downloads`
    );
  });

  it('should not render account mediatype icon as link', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'account',
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .baseNavigationUrl=${'https://archive.org'}
        .model=${model}
      ></tile-list>
    `);

    const mediatypeLink = el.shadowRoot?.querySelector('a#icon-right');
    expect(mediatypeLink).to.exist;
    expect(mediatypeLink?.getAttribute('href')).not.to.exist;
  });

  it('should render date added for accounts', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{
          mediatype: 'account',
          dateAdded: new Date('2015-05-05T00:00:00'),
        }}
      >
      </tile-list>
    `);

    const creatorBlock = el.shadowRoot?.getElementById('creator');
    expect(creatorBlock).to.exist;
    expect(creatorBlock?.textContent?.trim()).to.equal('Archivist since 2015');
  });
});
