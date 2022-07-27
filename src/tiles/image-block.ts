import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { TileModel } from '../models';
/***
 * Isolate logic of restricted layer of the item-image
 * - view mode: grid, list, compact
 * - model.loginRequired (attrs)
 * - model.contentWarning (attrs)
 * - 
 * 
 * render: 
 * - display flex CSS parent container
 * - item-image
 * - overlay
 * 
 */

import './overlay/icon-overlay';
import './/overlay/text-overlay';

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
          .loggedIn=${this.loggedIn}
        >
        </item-image>
        ${this.textOverlayTemplate}
        ${this.iconOverlayTemplate}
      </div>
    `;
  }

  private get baseClass(): ClassInfo {
    console.log('this.viewSize!!: ', this.viewSize)
    return {
      view: true,
      'thumb': this.isListTile && !this.isCompactTile,
      'compact': this.isListTile && this.isCompactTile,
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
      .view {
        display: flex;
        justify-content: center;
        flex: 1;
        position: relative;
      }

      .grid {
        height: 16rem;
      }

      // list tile
      .view .thumb {
        width: 100px;
        height: 100px;
      }

      .thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile .thumb {
        width: 90px;
        height: 90px;
      }

      .desktop .thumb {
        width: 100px;
        height: 100px;
      }

      .thumb.collection {
        --border-radius: 8px;
      }

      .mobile .thumb.account {
        --border-radius: 45px;
      }

      .desktop .thumb.account {
        --border-radius: 50px;
      }


      // compact tile
      .compact {
        object-fit: cover;
        display: block;
        position: relative;
      }

      .mobile .compact {
        width: 30px;
        height: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 4px;
      }

      .desktop .compact {
        width: 45px;
        height: 45px;
        padding-top: 5px;
        padding-bottom: 5px;
        /* padding-left: 6px; */
      }

      .compact.collection {
        --border-radius: 8px;
      }

      .mobile .compact.account {
        --border-radius: 15px;
      }

      .desktop .compact.account {
        --border-radius: 22.5px;
      }

    `;
  }
}
