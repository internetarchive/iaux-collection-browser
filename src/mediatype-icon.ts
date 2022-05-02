import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { mediatypeConfig } from './mediatype/mediatype-config';

@customElement('mediatype-icon')
export class MediatypeIcon extends LitElement {
  @property({ type: String }) mediatype: string | undefined;

  @property({ type: Array }) collections: string[] | undefined;

  @property({ type: Boolean }) showText = false;

  private get displayMediatype(): string {
    const tvIdentifier = ['tvnews', 'tvarchive', 'television'];
    const radioIdentifier = ['radio', 'radioprogram'];

    if (
      this.mediatype === 'movies' &&
      this.collections?.some(id => tvIdentifier.indexOf(id) >= 0)
    ) {
      return 'tv';
    }
    if (
      this.mediatype === 'audio' &&
      this.collections?.some(id => radioIdentifier.indexOf(id) >= 0)
    ) {
      return 'radio';
    }
    return this.mediatype || '';
  }

  render() {
    const config = mediatypeConfig[this.displayMediatype];
    if (!config) {
      return html``;
    }

    return html`
      <div
        id="icon"
        class="${this.showText ? 'show-text' : 'hide-text'}"
        style="--iconFillColor: ${config.color}"
      >
        ${config.icon}
        <p class="status-text">${config.text}</p>
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
        text-align: var(--iconTextAlign, center);
      }

      #icon.hide-text p {
        display: none;
      }

      svg {
        height: var(--iconHeight, 10px);
        width: var(--iconWidth, 10px);
      }

      .fill-color {
        fill: var(--iconCustomFillColor, var(--iconFillColor, '#000000'));
      }
    `;
  }
}
