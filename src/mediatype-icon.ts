import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { accountIcon } from './assets/img/icons/mediatype/account';
import { audioIcon } from './assets/img/icons/mediatype/audio';
import { etreeIcon } from './assets/img/icons/mediatype/etree';
import { imagesIcon } from './assets/img/icons/mediatype/images';
import { filmIcon } from './assets/img/icons/mediatype/film';
import { softwareIcon } from './assets/img/icons/mediatype/software';
import { textsIcon } from './assets/img/icons/mediatype/texts';
import { tvIcon } from './assets/img/icons/mediatype/tv';
import { videoIcon } from './assets/img/icons/mediatype/video';
import { webIcon } from './assets/img/icons/mediatype/web';

@customElement('mediatype-icon')
export class MediatypeIcon extends LitElement {
  @property({ type: String }) mediatype: string | undefined;

  @property({ type: Boolean }) showText = false;

  private readonly mediatypeIcons: { [key: string]: any } = {
    account: accountIcon,
    audio: audioIcon,
    data: etreeIcon,
    etree: etreeIcon,
    film: filmIcon,
    image: imagesIcon,
    movies: filmIcon,
    software: softwareIcon,
    texts: textsIcon,
    tv: tvIcon,
    video: videoIcon,
    web: webIcon,
  };

  private readonly mediatypeText: { [key: string]: any } = {
    account: 'Account',
    audio: 'Audio',
    data: 'Data',
    etree: 'E-tree',
    film: 'Film',
    image: 'Image',
    movies: 'Movie',
    software: 'Software',
    texts: 'Text',
    tv: 'TV',
    video: 'Video',
    web: 'Web',
  };

  render() {
    if (!this.mediatype) {
      return html``;
    }
    return html`
      <div id="icon" class="${this.showText ? 'show-text' : 'hide-text'}">
        ${this.mediatypeIcons[this.mediatype]}
        <p class="status-text">${this.mediatypeText[this.mediatype]}</p>
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

      .fill-color {
        fill: var(--iconFillColor);
      }
    `;
  }
}
