import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { collectionIcon } from '../../assets/img/icons/mediatype/collection';
import type { TileModel } from '../../models';
import { formatUnitSize } from '../../utils/format-unit-size';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';

@customElement('collection-tile')
export class CollectionTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) showInfoButton = false;

  render() {
    return html`
      <div class="container">
        ${this.infoButtonTemplate}
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
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `;
  }

  private get getItemsTemplate() {
    const collectionItems = this.model?.itemCount.toLocaleString();

    return html`<span id="item-count"
      >${collectionItems} item${Number(collectionItems) !== 1 ? 's' : ''}</span
    >`;
  }

  private get getSizeTemplate() {
    const collectionSize = this.model?.collectionSize ?? 0;

    return collectionSize
      ? html`<span id="item-size">${formatUnitSize(collectionSize, 1)}</span>`
      : ``;
  }

  private get infoButtonTemplate(): TemplateResult | typeof nothing {
    // &#9432; is an information icon
    return this.showInfoButton
      ? html`<button class="info-button" @click=${this.infoButtonPressed}>
          &#128712;
        </button>`
      : nothing;
  }

  private infoButtonPressed(e: PointerEvent) {
    e.preventDefault();
    const event = new CustomEvent<{ x: number; y: number }>(
      'infoButtonPressed',
      { detail: { x: e.clientX, y: e.clientY } }
    );
    this.dispatchEvent(event);
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
