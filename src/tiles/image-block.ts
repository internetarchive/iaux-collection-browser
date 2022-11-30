import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import type { TileModel } from '../models';

import './overlay/icon-overlay';
import './overlay/text-overlay';

@customElement('image-block')
export class ImageBlock extends LitElement {
  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) viewSize: string = 'desktop';

  render() {
    if (!this.model?.identifier) return nothing;

    return html`
      <div class=${classMap(this.baseClass)}>
        <item-image
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isListTile=${this.isListTile}
          .isCompactTile=${this.isCompactTile}
          .loggedIn=${this.loggedIn}
          style="--imgHeight: 100%; --imgWidth: 100%"
        >
        </item-image>
        ${this.textOverlayTemplate} ${this.iconOverlayTemplate}
      </div>
    `;
  }

  private get baseClass(): ClassInfo {
    return {
      list: this.isListTile && !this.isCompactTile,
      'list-compact': this.isListTile && this.isCompactTile,
      [this.viewSize]: true,
    };
  }

  private get iconOverlayTemplate() {
    if (!this.isListTile) return nothing;

    if (!this.model?.loginRequired && !this.model?.contentWarning)
      return nothing;

    return html`
      <icon-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${this.model?.loginRequired}
        .isCompactTile=${this.isCompactTile}
      >
      </icon-overlay>
    `;
  }

  private get textOverlayTemplate() {
    if (this.isListTile) return nothing;

    if (!this.model?.loginRequired && !this.model?.contentWarning)
      return nothing;

    return html`
      <text-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${this.model?.loginRequired}
        ?iconRequired=${true}
      >
      </text-overlay>
    `;
  }

  static get styles(): CSSResultGroup {
    const imageBlockBackgroundColor = css`var(--imageBlockBackgroundColor, #f1f1f4)`;
    const imageBlockBorderColor = css`var(--imageBlockBorderColor, #dddddd)`;

    return css`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${imageBlockBackgroundColor};
        border: 1px solid ${imageBlockBorderColor};
      }

      .grid {
        height: var(--imgBlockHeight, 16rem);
        flex: 1;
        position: initial;
        padding: 5px;
      }

      /** tile-list view */
      .list.desktop {
        width: 100px;
        height: 100px;
        display: inline-block;
        position: relative;
        text-align: center;
      }

      .list.mobile {
        width: 90px;
        height: 90px;
      }

      /** tile-list-compact view */
      .list-compact {
        display: block;
        text-align: center;
      }

      .list-compact.desktop {
        width: 45px;
        height: 45px;
      }

      .list-compact.mobile {
        width: 30px;
        height: 30px;
      }
    `;
  }
}
