import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';
import { collectionIcon } from '../../assets/img/icons/mediatype/collection';
import { formatUnitSize } from '../../utils/format-unit-size';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import { BaseTileComponent } from '../base-tile-component';
import { SimpleLayoutType } from '../models';
import '../image-block';

@customElement('collection-tile')
export class CollectionTile extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - currentWidth?: number;
   *  - currentHeight?: number;
   *  - baseNavigationUrl?: string;
   *  - baseImageUrl?: string;
   *  - collectionPagePath?: string;
   *  - sortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   *  - suppressBlurring = false;
   *  - useLocalTime = false;
   */

  @property({ type: Boolean }) showInfoButton = false;

  @property({ type: String }) simpleLayoutType: SimpleLayoutType = 'none';

  render() {
    const containerClasses = classMap({
      container: true,
      minimal: this.simpleLayoutType === 'minimal',
    });

    return html`
      <div class=${containerClasses}>
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
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `;
  }

  private get getTitleTemplate() {
    return html`<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
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
    const collectionItems = this.model?.itemCount?.toLocaleString();

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
          &#9432;
          <span class="sr-only">${msg('More info')}</span>
        </button>`
      : nothing;
  }

  private infoButtonPressed(e: PointerEvent) {
    e.preventDefault();
    const event = new CustomEvent<{ x: number; y: number }>(
      'infoButtonPressed',
      { detail: { x: e.clientX, y: e.clientY } },
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

        h4.truncated,
        h3.truncated {
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

        .minimal #item-stats {
          display: none;
        }

        .minimal .truncated {
          -webkit-line-clamp: initial;
        }

        .minimal .item-info {
          padding-bottom: 5px;
        }
      `,
    ];
  }
}
