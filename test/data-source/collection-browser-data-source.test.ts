import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { ItemHit } from '@internetarchive/search-service';
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

  before(async () => {
    host = await fixture<CollectionBrowser>(html`
      <collection-browser></collection-browser>
    `);
  });

  it('can add and retrieve data pages', async () => {
    const dataSource = new CollectionBrowserDataSource(host, 50);
    dataSource.addPage(1, dataPage);

    expect(Object.keys(dataSource.getAllPages()).length).to.equal(1);
    expect(dataSource.getPage(1).length).to.equal(2);
    expect(dataSource.getPage(1)[0].identifier).to.equal('foo');
    expect(dataSource.getPage(1)[1].identifier).to.equal('bar');
  });

  it('resets data when changing page size', async () => {
    const dataSource = new CollectionBrowserDataSource(host, 50);
    dataSource.addPage(1, dataPage);

    dataSource.setPageSize(100);
    expect(Object.keys(dataSource.getAllPages()).length).to.equal(0);
  });
});
