import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { accountIcon } from './assets/img/icons/mediatype/account';
import { audioIcon } from './assets/img/icons/mediatype/audio';
import { dataIcon } from './assets/img/icons/mediatype/data';
import { etreeIcon } from './assets/img/icons/mediatype/etree';
import { imagesIcon } from './assets/img/icons/mediatype/images';
import { filmIcon } from './assets/img/icons/mediatype/film';
import { radioIcon } from './assets/img/icons/mediatype/radio';
import { softwareIcon } from './assets/img/icons/mediatype/software';
import { textsIcon } from './assets/img/icons/mediatype/texts';
import { tvIcon } from './assets/img/icons/mediatype/tv';
import { videoIcon } from './assets/img/icons/mediatype/video';
import { webIcon } from './assets/img/icons/mediatype/web';
import { collectionIcon } from './assets/img/icons/mediatype/collection';

@customElement('mediatype-icon')
export class MediatypeIcon extends LitElement {
  @property({ type: String }) mediatype: string | undefined;

  @property({ type: Array }) collection: string[] | undefined;

  @property({ type: Boolean }) showText = false;

  private readonly mediatypeIcons: { [key: string]: any } = {
    account: accountIcon,
    audio: audioIcon,
    data: dataIcon,
    etree: etreeIcon,
    film: filmIcon,
    image: imagesIcon,
    movies: filmIcon,
    radio: radioIcon,
    software: softwareIcon,
    texts: textsIcon,
    tv: tvIcon,
    video: videoIcon,
    web: webIcon,
  };

  private readonly mediatypeText: { [key: string]: any } = {
    account: 'Account',
    audio: 'Audio',
    collection: 'Collection',
    data: 'Data',
    etree: 'E-tree',
    film: 'Film',
    image: 'Image',
    movies: 'Movie',
    radio: 'Radio',
    software: 'Software',
    texts: 'Text',
    tv: 'TV',
    video: 'Video',
    web: 'Web',
  };

  private getDisplayMediaType = () => {
    const tvIdentifier = ['tvnews', 'tvarchive', 'television'];
    const radioIdentifier = ['radio', 'radioprogram'];

    if (
      this.mediatype === 'movies' &&
      this.collection?.some(id => tvIdentifier.indexOf(id) >= 0)
    ) {
      return 'tv';
    }
    if (
      this.mediatype === 'audio' &&
      this.collection?.some(id => radioIdentifier.indexOf(id) >= 0)
    ) {
      return 'radio';
    }
    return this.mediatype;
  };

  render() {
    if (!this.mediatype) {
      return html``;
    }

    const displayMediatype = this.getDisplayMediaType() || '';

    return html`
      <div id="icon" class="${this.showText ? 'show-text' : 'hide-text'}">
        ${this.mediatypeIcons[displayMediatype]}
        <p class="status-text">${this.mediatypeText[displayMediatype]}</p>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: center;
      }

      #icon.hide-text p {
        display: none;
      }

      svg {
        height: var(--iconHeight, 10px);
        width: var(--iconWidth, 10px);
      }

      .fill-color {
        fill: var(--iconFillColor, '#000000');
      }
    `;
  }
}
