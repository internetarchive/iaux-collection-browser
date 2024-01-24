import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { ItemHit, SearchType } from '@internetarchive/search-service';
import { CollectionBrowserDataSource } from '../../src/data-source/collection-browser-data-source';
import { TileModel } from '../../src/models';
import type { CollectionBrowser } from '../../src/collection-browser';
import '../../src/collection-browser';

const dataPage: TileModel[] = [
  new TileModel(
    new ItemHit({
      fields: {
        identifier: 'foo',
      },
    })
  ),
  new TileModel(
    new ItemHit({
      fields: {
        identifier: 'bar',
      },
    })
  ),
];

describe('Collection Browser Data Source', () => {
  let host: CollectionBrowser;

  beforeEach(async () => {
    host = await fixture<CollectionBrowser>(html`
      <collection-browser></collection-browser>
    `);
  });

  it('can add and retrieve data pages', async () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    expect(Object.keys(dataSource.getAllPages()).length).to.equal(1);
    expect(dataSource.getPage(1).length).to.equal(2);
    expect(dataSource.getPage(1)[0].identifier).to.equal('foo');
    expect(dataSource.getPage(1)[1].identifier).to.equal('bar');
  });

  it('resets data when changing page size', async () => {
    const dataSource = new CollectionBrowserDataSource(host);
    dataSource.addPage(1, dataPage);

    dataSource.setPageSize(100);
    expect(Object.keys(dataSource.getAllPages()).length).to.equal(0);
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

  it('refreshes prefix filter counts', async () => {
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
