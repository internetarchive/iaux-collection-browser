import { css, CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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
   *  - suppressBlurring = false;
   */

  @property({ type: Boolean }) showInfoButton = false;

  render() {
    return html`
      <div class="container">
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
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `;
  }

  private get getTitleTemplate() {
    return html`<div id="title">
      <h4 class="truncated">${this.model?.title}</h4>
    </div>`;
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
          -webkit-line-clamp: 4;
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
