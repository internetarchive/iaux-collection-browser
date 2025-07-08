import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileMediatypeIcon } from '../../src/tiles/tile-mediatype-icon';

import '../../src/tiles/tile-mediatype-icon';

describe('Mediatype Icon', () => {
  it('renders component', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon mediatype="texts"></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon');
    expect(iconDiv).to.exist;
  });

  it('renders basic mediatype correctly', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon mediatype="movies"></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('Movie');
    expect(iconDiv.getAttribute('style')).to.include('#f1644b');
    expect(iconDiv.children[0]).to.be.instanceOf(SVGElement);
  });

  it('renders TV mediatype', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon
        mediatype="movies"
        .collections=${['tvnews']}
      ></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('renders TV Commercial mediatype', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon
        mediatype="movies"
        .collections=${['tvnews', 'tv_ads']}
      ></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV Commercial');
  });

  it('renders TV Fact Check mediatype for search results', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon
        isTvSearchResult
        mediatype="movies"
        .collections=${['tvnews', 'factchecked']}
      ></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('does not use TV Fact Check mediatype for non-search results', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon
        mediatype="movies"
        .collections=${['tvnews', 'factchecked']}
      ></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('TV');
  });

  it('renders radio mediatype', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon
        mediatype="audio"
        .collections=${['radio']}
      ></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon') as HTMLDivElement;
    expect(iconDiv.title).to.equal('Radio');
  });

  it('renders no icon if mediatype is unrecognized', async () => {
    const el = await fixture<TileMediatypeIcon>(html`
      <tile-mediatype-icon mediatype="foobar"></tile-mediatype-icon>
    `);

    const iconDiv = el.shadowRoot?.querySelector('#icon');
    expect(iconDiv).not.to.exist;
  });
});
