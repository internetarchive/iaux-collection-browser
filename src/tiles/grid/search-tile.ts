import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import { BaseTileComponent } from '../base-tile-component';
import '../image-block';

@customElement('search-tile')
export class SearchTile extends BaseTileComponent {
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

  render() {
    return html`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
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
      <h4 class="truncated">${this.model?.title}</h4>
    </div>`;
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

        h4.truncated {
          color: ${whiteColor};
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `,
    ];
  }
}
