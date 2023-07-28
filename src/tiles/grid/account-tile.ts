import { css, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { BaseTileComponent } from '../base-tile-component';

import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import './tile-stats';

@customElement('account-tile')
export class AccountTile extends BaseTileComponent {
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
   */

  @property({ type: Boolean }) showInfoButton = false;

  @property({ type: Boolean }) isManageView = false;

  @property({ type: String }) manageCheckTitle = msg(
    'Remove this item from the list'
  );

  render() {
    return html`
      <div class="container">
        ${this.infoButtonTemplate} ${this.manageCheckTemplate}
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
      <h4 class="truncated">${this.model?.identifier}</h4>
    </div>`;
  }

  private get getArchivistTemplate() {
    return html`<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
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

  private get infoButtonTemplate(): TemplateResult | typeof nothing {
    if (!this.showInfoButton || this.isManageView) return nothing;

    // &#9432; is an information icon
    return html`
      <button class="info-button" @click=${this.infoButtonPressed}>
        &#9432;
        <span class="sr-only">${msg('More info')}</span>
      </button>
    `;
  }

  private get manageCheckTemplate(): TemplateResult | typeof nothing {
    if (!this.isManageView) return nothing;

    return html`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          .checked=${this.model?.checked}
          @change=${() => {
            if (this.model) this.model.checked = !this.model.checked;
          }}
        />
      </div>
    `;
  }

  private infoButtonPressed(e: PointerEvent) {
    e.preventDefault();
    const event = new CustomEvent<{ x: number; y: number }>(
      'infoButtonPressed',
      { detail: { x: e.clientX, y: e.clientY } }
    );
    this.dispatchEvent(event);
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
