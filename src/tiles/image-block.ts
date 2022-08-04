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
    if (!this.model?.identifier) {
      return nothing;
    }
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

    if (!this.model?.loginRequired && !this.model?.contentWarning) {
      return nothing;
    }
    return html`
      <icon-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${this.model?.loginRequired}
      >
      </icon-overlay>
    `;
  }

  private get textOverlayTemplate() {
    if (this.isListTile) {
      return nothing;
    }

    if (!this.model?.loginRequired && !this.model?.contentWarning) {
      return nothing;
    }
    return html`
      <text-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${this.model?.loginRequired}
      >
      </text-overlay>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      div {
        display: flex;
        justify-content: center;
        position: relative;
      }

      .grid {
        height: 16rem;
        flex: 1;
      }

      /** tile-list view */
      .list.desktop {
        width: 100px;
        height: 100px;
      }

      .list.mobile {
        width: 90px;
        height: 90px;
      }

      /** tile-list-compact view */
      .list-compact {
        display: block;
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
