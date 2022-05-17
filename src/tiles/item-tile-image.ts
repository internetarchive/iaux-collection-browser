import { html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { TileModel } from '../models';

import './image/item-image';
import './image/waveform-image';

@customElement('item-tile-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @state() private isDeemphasize = false;

  protected updated(changed: PropertyValues): void {
    if (changed.has('model')) {
      this.setDeemphasize();
    }
  }

  // Don't deemphasize if item is a collection
  private setDeemphasize() {
    this.isDeemphasize =
      (this.model?.mediatype !== 'collection' &&
        this.model?.collections.includes('deemphasize')) ??
      false;
  }

  render() {
    return html`
      ${this.isWithWaveformMediatype
        ? this.waveformImageTemplate
        : this.itemImageTemplate}
    `;
  }

  private get imageSrc() {
    return `${this.baseImageUrl}/services/img/${this.model?.identifier}`;
  }

  private get isWithWaveformMediatype() {
    return (
      this.model?.mediatype === 'audio' || this.model?.mediatype === 'etree'
    );
  }

  // Templates
  private get itemImageTemplate() {
    return html`
      <item-image
        .model=${this.model}
        .imageSrc=${this.imageSrc}
        .isDeemphasize=${this.isDeemphasize}
        .isCompactTile=${this.isCompactTile}
        .isListTile=${this.isListTile}
      >
      </item-image>
    `;
  }

  private get waveformImageTemplate() {
    return html`
      <waveform-image
        .imageSrc=${this.imageSrc}
        .identifier=${this.model?.identifier}
      >
      </waveform-image>
    `;
  }
}
