import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect, beforeEach } from 'vitest';
import { html } from 'lit';
import sinon from 'sinon';
import { ItemHit, SearchType } from '@internetarchive/search-service';
import { CollectionBrowserDataSource } from '../../src/data-source/collection-browser-data-source';
import { TileModel } from '../../src/models';
import type { CollectionBrowser } from '../../src/collection-browser';
import '../../src/collection-browser';
import { MockSearchService } from '../mocks/mock-search-service';

const dataPage: TileModel[] = [
  new TileModel(
    new ItemHit({
      fields: {
        identifier: 'foo',
      },
    }),
  ),
  new TileModel(
    new ItemHit({
      fields: {
        identifier: 'bar',
      },
    }),
  ),
];

describe('Collection Browser Data Source', () => {
  let host: CollectionBrowser;

  beforeEach(async () => {
    host = await fixture<CollectionBrowser>(html`
      <collection-browser></collection-browser>
    `);
  });

  it('can add and retrieve data pages', () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    expect(Object.keys(dataSource.getAllPages()).length).to.equal(1);
    expect(dataSource.getPage(1).length).to.equal(2);
    expect(dataSource.getPage(1)[0].identifier).to.equal('foo');
    expect(dataSource.getPage(1)[1].identifier).to.equal('bar');
  });

  it('can add data split across multiple pages', () => {
    const dataSource = new CollectionBrowserDataSource(host, 3);
    const doubledDataPage = [...dataPage, ...dataPage];
    dataSource.addMultiplePages(1, doubledDataPage);

    expect(Object.keys(dataSource.getAllPages()).length).to.equal(2);
    expect(dataSource.getPage(1).length).to.equal(3);
    expect(dataSource.getPage(2).length).to.equal(1);
    expect(dataSource.getPage(1)[0].identifier).to.equal('foo');
    expect(dataSource.getPage(1)[1].identifier).to.equal('bar');
    expect(dataSource.getPage(1)[2].identifier).to.equal('foo');
    expect(dataSource.getPage(2)[0].identifier).to.equal('bar');
  });

  it('resets data when changing page size', () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    dataSource.setPageSize(100);
    expect(Object.keys(dataSource.getAllPages()).length).to.equal(0);
    expect(dataSource.getPageSize()).to.equal(100);
  });

  it('can be installed on the host', async () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    host.installDataSourceAndQueryState(dataSource, {
      searchType: SearchType.METADATA,
      sortDirection: null,
      selectedTitleFilter: null,
      selectedCreatorFilter: null,
      baseQuery: 'foobar',
    });

    await host.updateComplete;

    expect(host.dataSource).to.equal(dataSource);
    expect(host.baseQuery).to.equal('foobar');

    host.removeController(dataSource);
  });

  it('can suppress further fetches', async () => {
    host.searchService = new MockSearchService();

    const pageFetchSpy = sinon.spy();
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.fetchPage = pageFetchSpy;

    dataSource.addPage(1, dataPage);
    dataSource.setFetchesSuppressed(true);
    dataSource.handleQueryChange();

    expect(pageFetchSpy.callCount).to.equal(0);
  });

  it('can set its initial page batch size', async () => {
    host.searchService = new MockSearchService();

    const pageFetchSpy = sinon.spy();
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.setNumInitialPages(10);
    dataSource.fetchPage = pageFetchSpy;

    dataSource.handleQueryChange();

    // Uses specified number of initial pages
    expect(pageFetchSpy.args[0][1]).to.equal(10);
  });

  it('refreshes prefix filter counts', () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    dataSource.prefixFilterCountMap = {
      title: {
        X: 10,
      },
    };

    dataSource.refreshLetterCounts();
    expect(dataSource.prefixFilterCountMap).to.deep.equal({});
  });
});
