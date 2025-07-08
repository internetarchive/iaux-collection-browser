import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  mediatypeConfig,
  MediatypeConfigKey,
} from '../mediatype/mediatype-config';

const TV_COMMERCIAL_COLLECTION = 'tv_ads';
const TV_FACT_CHECK_COLLECTION = 'factchecked';
const TV_TOP_LEVEL_COLLECTIONS = new Set(['tvnews', 'tvarchive']);
const RADIO_TOP_LEVEL_COLLECTIONS = new Set(['radio', 'radioprogram']);

@customElement('mediatype-icon')
export class MediatypeIcon extends LitElement {
  @property({ type: String }) mediatype?: MediatypeConfigKey;

  @property({ type: Array }) collections?: string[];

  @property({ type: Boolean }) showText = false;

  /**
   * Returns the appropriate mediatype config key for the current mediatype/collections.
   */
  private get displayMediatype(): MediatypeConfigKey {
    if (this.isTvItem) return this.tvDisplayMediatype;
    if (this.isRadioItem) return 'radio';
    return this.mediatype ?? 'none';
  }

  /**
   * Returns the appropriate TV mediatype, depending on the current collections.
   */
  private get tvDisplayMediatype(): MediatypeConfigKey {
    if (this.collections?.includes(TV_COMMERCIAL_COLLECTION)) {
      return 'tvCommercial';
    } else if (this.collections?.includes(TV_FACT_CHECK_COLLECTION)) {
      return 'tvFactCheck';
    }

    return 'tv';
  }

  /**
   * Whether this represents a TV item
   */
  private get isTvItem(): boolean {
    return (
      this.mediatype === 'movies' &&
      !!this.collections?.some(id => TV_TOP_LEVEL_COLLECTIONS.has(id))
    );
  }

  /**
   * Whether this represents a radio item
   */
  private get isRadioItem(): boolean {
    return (
      this.mediatype === 'audio' &&
      !!this.collections?.some(id => RADIO_TOP_LEVEL_COLLECTIONS.has(id))
    );
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
        title="${config.text}"
        style="--iconFillColor: ${config.color}"
      >
        ${config.icon}
        <p class="status-text">${config.text}</p>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      #icon {
        height: var(--iconHeight, 25px);
      }

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
        pointer-events: none;
      }

      .fill-color {
        fill: var(--iconFillColor, '#000000');
      }
    `;
  }
}
