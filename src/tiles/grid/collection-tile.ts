import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { collectionIcon } from '../../assets/img/icons/mediatype/collection';
import type { TileModel } from '../../models';

import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';

@customElement('collection-tile')
export class CollectionTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  render() {
    return html`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `;
  }

  private get getImageBlockTemplate(): TemplateResult {
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
      <h1 class="truncated">${this.model?.title}</h1>
    </div>`;
  }

  private get getTileStatsTemplate() {
    return html`
      <div id="item-stats">
        <div id="item-mediatype">${collectionIcon}</div>

        <div id="stats-row">
          <span id="item-count">234,234 items</span>
          <span id="item-size">234234 Gigabytes</span>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const tileBorderColor = css`var(--tileBorderColor, #555555)`;
    const tileBackgroundColor = css`var(--tileBackgroundColor, #666666)`;
    const whiteColor = css`#fff`;

    return [
      baseTileStyles,
      css`
        .container {
          background-color: ${tileBackgroundColor};
          border: 1px solid ${tileBorderColor};
        }

        .item-info {
          flex-grow: initial;
        }

        h1.truncated {
          color: ${whiteColor};
        }

        #item-mediatype svg {
          filter: invert(100%);
          height: 2.5rem;
          align-items: baseline;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }

        #item-stats {
          display: flex;
          padding: 0 5px 5px;
          align-items: center;
        }

        #stats-row {
          display: flex;
          align-items: baseline;
          color: ${whiteColor};
          flex-direction: column;
          margin-left: 10px;
        }
      `,
    ];
  }
}
