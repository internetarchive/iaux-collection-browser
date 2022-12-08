import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';

import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import './tile-stats';

@customElement('account-tile')
export class AccountTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  render() {
    return html`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getAvatarTemplate} ${this.getTitleTemplate}
            ${this.getArchivistTemplate}
          </div>
          ${this.getTileStatsTemplate}
        </div>
      </div>
    `;
  }

  private get getAvatarTemplate(): TemplateResult {
    return html`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${'grid'}
      >
      </image-block>
    `;
  }

  private get getTitleTemplate() {
    return html`<div id="title">
      <h1 class="truncated">${this.model?.identifier}</h1>
    </div>`;
  }

  private get getArchivistTemplate() {
    return html`<div class="archivist-since">
      <span>Archivist since ${this.model?.dateAdded?.getFullYear()}</span>
    </div>`;
  }

  private get getTileStatsTemplate() {
    return html`<tile-stats
      .mediatype=${this.model?.mediatype}
      .itemCount=${this.model?.itemCount}
      .favCount=${this.model?.favCount}
      .commentCount=${this.model?.commentCount}
    >
    </tile-stats>`;
  }

  /**
   * CSS
   */
  static get styles() {
    const tileBorderColor = css`var(--tileBorderColor, #dddddd)`;

    return [
      baseTileStyles,
      css`
        .container {
          border: 1px solid ${tileBorderColor};
        }
      `,
    ];
  }
}
