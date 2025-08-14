import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
  mediatypeConfig,
  MediatypeConfigKey,
} from '../mediatype/mediatype-config';
import { TileModel } from '../models';

const TV_COLLECTIONS = new Set(['tvnews', 'tvarchive', 'television']);
const RADIO_COLLECTIONS = new Set(['radio', 'radioprogram']);

@customElement('tile-mediatype-icon')
export class TileMediatypeIcon extends LitElement {
  @property({ type: String }) mediatype?: MediatypeConfigKey;

  @property({ type: Object }) model?: TileModel;

  @property({ type: Array }) collections?: string[];

  @property({ type: Boolean }) isTvSearchResult = false;

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
    if (this.isTvCommercial) {
      return 'tvCommercial';
    } else if (this.isTvSearchResult && this.isTvFactCheck) {
      return 'tvFactCheck';
    } else if (this.isTvSearchResult && this.isTvQuote) {
      return 'tvQuote';
    }

    return 'tv';
  }

  /**
   * Whether this represents a TV item
   */
  private get isTvItem(): boolean {
    return (
      this.mediatype === 'movies' &&
      !!this.collections?.some(id => TV_COLLECTIONS.has(id))
    );
  }

  private get isTvCommercial(): boolean {
    // Contains one or more TV ad identifiers
    return !!this.model?.adIds?.length;
  }

  private get isTvFactCheck(): boolean {
    // Contains one or more fact-check URLs
    return !!this.model?.factChecks?.length;
  }

  private get isTvQuote(): boolean {
    return !!this.model?.isClip;
  }

  /**
   * Whether this represents a radio item
   */
  private get isRadioItem(): boolean {
    return (
      this.mediatype === 'audio' &&
      !!this.collections?.some(id => RADIO_COLLECTIONS.has(id))
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
