import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { ItemTile } from '../../../src/tiles/grid/item-tile';

import '../../../src/tiles/grid/item-tile';
import type { TileModel } from '../../../src/models';

describe('Item Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const container = el.shadowRoot?.querySelector('.container');
    const tileDetails = el.shadowRoot?.querySelector('.tile-details');
    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemTitle = el.shadowRoot?.querySelector('#title');
    const imageBlock = el.shadowRoot?.querySelector('image-block');

    expect(container).to.exist;
    expect(tileDetails).to.exist;
    expect(itemInfo).to.exist;
    expect(imageBlock).to.exist;
    expect(itemTitle).to.exist;
  });

  it('should render with created-by element', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ creator: 'someone' }}></item-tile>`,
    );

    const container = el.shadowRoot?.querySelector('.container');
    const tileDetails = el.shadowRoot?.querySelector('.tile-details');
    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const truncatedCreatorText = createdBy?.querySelector('.truncated');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(container).to.exist;
    expect(tileDetails).to.exist;
    expect(itemInfo).to.exist;
    expect(createdBy).to.exist;
    expect(truncatedCreatorText).to.exist;
    expect(dateSortedBy).to.not.exist;
  });

  it('should not render with created-by but date element', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ datePublished: new Date() }}></item-tile>`,
    );

    el.sortParam = {
      field: 'date',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should not render with created-by but reviewdate element', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ dateReviewed: new Date() }}></item-tile>`,
    );

    el.sortParam = {
      field: 'reviewdate',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should not render with created-by but publicdate element', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ dateArchived: new Date() }}></item-tile>`,
    );

    el.sortParam = {
      field: 'publicdate',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should not render date-sorted-by element if date is not provided', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ dateArchived: undefined }}></item-tile>`,
    );

    el.sortParam = {
      field: 'publicdate',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.not.exist;
  });

  it('should render without created-by when sorting by a date field', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ dateAdded: new Date() }}></item-tile>`,
    );

    el.sortParam = {
      field: 'addeddate',
      direction: 'asc',
    };
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should render with created-by when sort field is not a date', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ creator: 'someone' }}></item-tile>`,
    );

    el.sortParam = {
      field: 'week',
      direction: 'asc',
    };
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(dateSortedBy).to.not.exist; // it should not exist because this is not a date sort
    expect(createdBy).to.exist;
  });

  it('should render published date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.contain(
      'published Jan 02, 2012',
    );
  });

  it('should render added date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.contain('added Jan 02, 2010');
  });

  it('should render archived date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'publicdate', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.contain(
      'archived Jan 02, 2011',
    );
  });

  it('should render reviewed date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 2),
      dateArchived: new Date(2011, 0, 2),
      datePublished: new Date(2012, 0, 2),
      dateReviewed: new Date(2013, 0, 2),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'reviewdate', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.contain(
      'reviewed Jan 02, 2013',
    );
  });

  it('should only show the year for a date published of Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      datePublished: new Date('2012-01-01T00:00:00Z'),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal('published 2012');
  });

  it('should show full date added/archived/reviewed, even on Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 1, 0, 0, 0, 0),
      dateArchived: new Date(2011, 0, 1, 0, 0, 0, 0),
      datePublished: new Date(2012, 0, 1, 0, 0, 0, 0),
      dateReviewed: new Date(2013, 0, 1, 0, 0, 0, 0),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </item-tile>
    `);

    let dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal('added Jan 01, 2010');

    el.sortParam = { field: 'publicdate', direction: 'desc' };
    await el.updateComplete;
    dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal('archived Jan 01, 2011');

    el.sortParam = { field: 'reviewdate', direction: 'desc' };
    await el.updateComplete;
    dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal('reviewed Jan 01, 2013');
  });

  it('should display dates in UTC time zone by default', async () => {
    const model: Partial<TileModel> = {
      datePublished: new Date('2012-02-15T00:00:00Z'),
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal(
      'published Feb 15, 2012',
    );
  });

  it('should display dates in local time when useLocalTime option is true', async () => {
    // Expected behavior depends on the time zone offset where the testing occurs
    const offset = new Date().getTimezoneOffset();
    let datePublished, expected;
    if (offset > 0) {
      // Positive local time zone offsets have earlier local dates than UTC
      datePublished = new Date('2012-02-15T00:00:00Z');
      expected = 'published Feb 14, 2012';
    } else if (offset < 0) {
      // Negative local time zone offsets have later local dates than UTC
      datePublished = new Date('2012-02-15T23:59:59Z');
      expected = 'published Feb 16, 2012';
    } else {
      // Local time may just be UTC itself
      datePublished = new Date('2012-02-15T00:00:00Z');
      expected = 'published Feb 15, 2012';
    }

    const model: Partial<TileModel> = {
      datePublished,
    };

    const el = await fixture<ItemTile>(html`
      <item-tile
        useLocalTime
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </item-tile>
    `);

    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');
    expect(dateSortedBy).to.exist;
    expect(dateSortedBy?.textContent?.trim()).to.equal(expected);
  });

  it('should show the first creator matching the letter filter, if defined', async () => {
    const model: Partial<TileModel> = {
      creator: 'foo',
      creators: ['foo', 'bar', 'baz'],
    };

    const el = await fixture<ItemTile>(html`
      <item-tile .model=${model} .creatorFilter=${'B'}> </item-tile>
    `);

    const creator = el.shadowRoot?.querySelector('.created-by');
    expect(creator).to.exist;
    expect(creator?.textContent?.trim()).to.match(/by\s+bar/);
  });

  it('should render with snippet block when it has snippets', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile .model=${{ snippets: ['some {{{snippet}}} text'] }}>
      </item-tile>
    `);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.exist;
  });

  it('should not render snippet block when no snippets are present', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.not.exist;
  });

  it('should render info button when showInfoButton flag is set', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile ?showInfoButton=${true}> </item-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector('.info-button');

    expect(infoButton).to.exist;
  });

  it('should dispatch event when info button tapped', async () => {
    const infoButtonSpy = sinon.spy();
    const el = await fixture<ItemTile>(html`
      <item-tile ?showInfoButton=${true} @infoButtonPressed=${infoButtonSpy}>
      </item-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector(
      '.info-button',
    ) as HTMLButtonElement;
    infoButton.click();
    await el.updateComplete;

    expect(infoButtonSpy.callCount).to.equal(1);
  });

  it('should render with volume/issue view', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile .model=${{ volume: '1', issue: 'Index' }}></item-tile>
    `);

    const volumeIssueBlock = el.shadowRoot?.querySelector('.volume-issue');

    expect(volumeIssueBlock).to.exist;
  });

  it('should render with volume/issue view to not render', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const volumeIssueBlock = el.shadowRoot?.querySelector('.volume-issue');

    expect(volumeIssueBlock).to.not.exist;
  });

  it('should render web capture date links if present', async () => {
    const captureDates = [
      new Date('2010-01-02T12:34:56Z'),
      new Date('2011-02-03T12:43:21Z'),
    ];

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${{
          identifier: 'foo',
          title: 'https://example.com/',
          captureDates,
        }}
      ></item-tile>
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

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${{
          identifier: 'foo',
          captureDates,
        }}
      ></item-tile>
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

    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${{
          identifier: 'foo',
          review,
        }}
      ></item-tile>
    `);

    const reviewBlock = el.shadowRoot?.querySelector('review-block');
    expect(reviewBlock).to.exist;
  });

  it('should not render review snippet block when no review is present', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile
        .model=${{
          identifier: 'foo',
        }}
      ></item-tile>
    `);

    const reviewBlock = el.shadowRoot?.querySelector('review-block');
    expect(reviewBlock).not.to.exist;
  });
});
