import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { TileList } from '../../../src/tiles/list/tile-list';

import '../../../src/tiles/list/tile-list';
import type { TileModel } from '../../../src/models';

describe('List Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileList>(
      html`<tile-list .model=${{}}></tile-list>`,
    );

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

  it('should render title link with model href if provided', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .baseNavigationUrl=${''}
        .model=${{ title: 'foo', href: '/foo/bar' }}
      ></tile-list>
    `);

    const title = el.shadowRoot?.querySelector('#title > a');

    expect(title).to.exist;
    expect(title?.getAttribute('href')).to.equal('/foo/bar');
  });

  it('should add title to image link if provided', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .baseNavigationUrl=${''}
        .model=${{ title: 'foo', href: '/foo/bar' }}
      ></tile-list>
    `);

    const imageLink = el.shadowRoot?.querySelector('#image-link');

    expect(imageLink).to.exist;
    expect(imageLink?.getAttribute('title')).to.equal('View foo');
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
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{ collections: ['deemphasize', 'community', 'foo'] }}
        .baseNavigationUrl=${'base'}
      >
      </tile-list>
    `);

    const collectionsRow = el.shadowRoot?.getElementById('collections');
    expect(collectionsRow).to.exist;

    const collectionLinks = collectionsRow?.querySelectorAll('a[href]');
    expect(collectionLinks?.length).to.equal(1);
    expect(collectionLinks?.item(0).getAttribute('href')).to.equal(
      'base/details/foo',
    );
  });

  it('should not render fav- collections', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{ collections: ['fav-foo', 'bar'] }}
        .baseNavigationUrl=${'base'}
      >
      </tile-list>
    `);

    const collectionsRow = el.shadowRoot?.getElementById('collections');
    expect(collectionsRow).to.exist;

    const collectionLinks = collectionsRow?.querySelectorAll('a[href]');
    expect(collectionLinks?.length).to.equal(1);
    expect(collectionLinks?.item(0).getAttribute('href')).to.equal(
      'base/details/bar',
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

  it('should render published date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Published:  Jan 02, 2012');
  });

  it('should render added date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
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
    expect(dateRow?.textContent?.trim()).to.contain('Added:  Jan 02, 2010');
  });

  it('should render archived date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'publicdate', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Archived:  Jan 02, 2011');
  });

  it('should render reviewed date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'reviewdate', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Reviewed:  Jan 02, 2013');
  });

  it('should only show the year for a date published of Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      datePublished: new Date('2012-01-01T00:00:00Z'),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Published:  2012');
  });

  it('should show full date added/archived/reviewed, even on Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 1, 0, 0, 0, 0),
      dateArchived: new Date(2011, 0, 1, 0, 0, 0, 0),
      datePublished: new Date(2012, 0, 1, 0, 0, 0, 0),
      dateReviewed: new Date(2013, 0, 1, 0, 0, 0, 0),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </tile-list>
    `);

    let dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Added:  Jan 01, 2010');

    el.sortParam = { field: 'publicdate', direction: 'desc' };
    await el.updateComplete;
    dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Archived:  Jan 01, 2011');

    el.sortParam = { field: 'reviewdate', direction: 'desc' };
    await el.updateComplete;
    dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Reviewed:  Jan 01, 2013');
  });

  it('should display dates in UTC time zone by default', async () => {
    const model: Partial<TileModel> = {
      datePublished: new Date('2012-02-15T00:00:00Z'),
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;
    expect(dateRow?.textContent?.trim()).to.contain('Published:  Feb 15, 2012');
  });

  it('should display dates in local time when useLocalTime option is true', async () => {
    // Expected behavior depends on the time zone offset where the testing occurs
    const offset = new Date().getTimezoneOffset();
    let datePublished, expected;
    if (offset > 0) {
      // Positive local time zone offsets have earlier local dates than UTC
      datePublished = new Date('2012-02-15T00:00:00Z');
      expected = 'Published:  Feb 14, 2012';
    } else if (offset < 0) {
      // Negative local time zone offsets have later local dates than UTC
      datePublished = new Date('2012-02-15T23:59:59Z');
      expected = 'Published:  Feb 16, 2012';
    } else {
      // Local time may just be UTC itself
      datePublished = new Date('2012-02-15T00:00:00Z');
      expected = 'Published:  Feb 15, 2012';
    }

    const model: Partial<TileModel> = {
      datePublished,
    };

    const el = await fixture<TileList>(html`
      <tile-list
        useLocalTime
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list>
    `);

    const dateRow = el.shadowRoot?.getElementById('dates-line');
    expect(dateRow).to.exist;

    expect(dateRow?.textContent?.trim()).to.contain(expected);
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
      `/search?query=${encodeURIComponent('subject:"foo"')}`,
    );

    const creatorLink = el.shadowRoot?.querySelector('#creator a[href]');
    expect(creatorLink).to.exist;
    expect(creatorLink?.getAttribute('href')).to.equal(
      `/search?query=${encodeURIComponent('creator:"bar"')}`,
    );

    const sourceLink = el.shadowRoot?.querySelector('#source a[href]');
    expect(sourceLink).to.exist;
    expect(sourceLink?.getAttribute('href')).to.equal(
      `/search?query=${encodeURIComponent('source:"baz"')}`,
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
      `https://archive.org/details/texts`,
    );
    expect(mediatypeLink?.getAttribute('title')).to.equal('See more: texts');
  });

  it('should render mediatype icon as link even with empty baseNavigationUrl', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'texts',
    };

    const el = await fixture<TileList>(html`
      <tile-list .baseNavigationUrl=${''} .model=${model}></tile-list>
    `);

    const mediatypeLink = el.shadowRoot?.querySelector('a#icon-right');
    expect(mediatypeLink).to.exist;
    expect(mediatypeLink?.getAttribute('href')).to.equal(`/details/texts`);
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
      `https://archive.org/search?query=mediatype:collection&sort=-downloads`,
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

  it('should render web capture date links if present', async () => {
    const captureDates = [
      new Date('2010-01-02T12:34:56Z'),
      new Date('2011-02-03T12:43:21Z'),
    ];

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{
          identifier: 'foo',
          title: 'https://example.com/',
          captureDates,
        }}
      ></tile-list>
    `);

    const captureDatesUl = el.shadowRoot?.querySelector('.capture-dates');
    expect(captureDatesUl, 'capture dates container').to.exist;
    expect(captureDatesUl?.children.length).to.equal(2);

    const firstDateLink = captureDatesUl?.children[0]?.querySelector('a[href]');
    expect(firstDateLink, 'first date link').to.exist;
    expect(firstDateLink?.getAttribute('href')).to.equal(
      'https://web.archive.org/web/20100102123456/https%3A%2F%2Fexample.com%2F',
    );
    expect(firstDateLink?.textContent?.trim()).to.equal('Jan 02, 2010');

    const secondDateLink =
      captureDatesUl?.children[1]?.querySelector('a[href]');
    expect(secondDateLink, 'second date link').to.exist;
    expect(secondDateLink?.getAttribute('href')).to.equal(
      'https://web.archive.org/web/20110203124321/https%3A%2F%2Fexample.com%2F',
    );
    expect(secondDateLink?.textContent?.trim()).to.equal('Feb 03, 2011');
  });

  it('should not render web captures if no title is present', async () => {
    const captureDates = [
      new Date('2010-01-02T12:34:56Z'),
      new Date('2011-02-03T12:43:21Z'),
    ];

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{
          identifier: 'foo',
          captureDates,
        }}
      ></tile-list>
    `);

    const captureDatesUl = el.shadowRoot?.querySelector('.capture-dates');
    expect(captureDatesUl).not.to.exist;
  });

  it('should render review snippet if present', async () => {
    const review = {
      title: 'Foo',
      body: 'foo bar baz',
      stars: 3,
    };

    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{
          identifier: 'foo',
          review,
        }}
      ></tile-list>
    `);

    const reviewBlock = el.shadowRoot?.querySelector('review-block');
    expect(reviewBlock).to.exist;
  });

  it('should not render review snippet block when no review is present', async () => {
    const el = await fixture<TileList>(html`
      <tile-list
        .model=${{
          identifier: 'foo',
        }}
      ></tile-list>
    `);

    const reviewBlock = el.shadowRoot?.querySelector('review-block');
    expect(reviewBlock).not.to.exist;
  });
});
