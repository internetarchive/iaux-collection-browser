import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect, beforeEach } from 'vitest';
import { html } from 'lit';
import type { TileMediatypeIcon } from '../../src/tiles/tile-mediatype-icon';

import '../../src/tiles/tile-mediatype-icon';
import { TileModel } from '../../src/models';
import { MediaType } from '@internetarchive/field-parsers';

describe('Mediatype Icon', () => {
  let model: TileModel;
  beforeEach(() => {
    model = new TileModel({});
  });

  it('renders component', async () => {
    model.mediatype = 'texts';
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon');
    expect(iconDiv).to.exist;
  });

  it('renders basic mediatype correctly', async () => {
    model.mediatype = 'movies';
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('Movie');
    expect(iconDiv.getAttribute('style')).to.include('#f1644b');
    expect(iconDiv.children[0]).to.be.instanceOf(SVGElement);
  });

  it('renders TV mediatype', async () => {
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('renders TV Commercial mediatype for TV items with ad ids', async () => {
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    model.adIds = ['foo'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Commercial');
  });

  it('renders TV Commercial mediatype for TV items in tv_ads collection', async () => {
    model.mediatype = 'movies';
    model.collections = ['tvnews', 'tv_ads'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Commercial');
  });

  it('renders TV Fact Check mediatype for TV search results with fact check URLs', async () => {
    model.hitType = 'tv_clip';
    model.hitRequestSource = 'search_query';
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    model.factChecks = ['https://example.com'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Fact Check');
  });

  it('renders TV Fact Check mediatype for TV search results in factchecked collection', async () => {
    model.hitType = 'tv_clip';
    model.hitRequestSource = 'search_query';
    model.mediatype = 'movies';
    model.collections = ['tvnews', 'factchecked'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Fact Check');
  });

  it('does not use TV Fact Check mediatype for non-search results', async () => {
    model.hitType = 'tv_clip';
    model.hitRequestSource = 'collection_members';
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    model.factChecks = ['https://example.com'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('renders TV Quote mediatype for TV search results that are clips', async () => {
    model.hitType = 'tv_clip';
    model.hitRequestSource = 'search_query';
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    model.isClip = true;
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Quote');
  });

  it('does not use TV Quote mediatype for non-search results', async () => {
    model.hitType = 'tv_clip';
    model.hitRequestSource = 'collection_members';
    model.mediatype = 'movies';
    model.collections = ['tvnews'];
    model.isClip = true;
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('renders radio mediatype', async () => {
    model.mediatype = 'audio';
    model.collections = ['radio'];
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('Radio');
  });

  it('renders no icon if mediatype is unrecognized', async () => {
    model.mediatype = 'foobar' as MediaType;
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon .model=${model}></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon');
    expect(iconDiv).not.to.exist;
  });
});
