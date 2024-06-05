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
      collection: this.model?.mediatype === 'collection', // fill the image in container
      [this.viewSize]: true,
      'search-image': this.model?.mediatype === 'search',
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

    return css`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${imageBlockBackgroundColor};
        border-radius: 4px;
      }

      .grid {
        height: var(--imgBlockHeight, 16rem);
        flex: 1;
        position: initial;
        padding: 5px;
        border-radius: 4px 4px 0 0;
      }

      .collection.grid,
      .grid.search-image {
        display: block;
      }

      /** tile-list view */
      .list {
        border-radius: 0;
        background-color: var(--imageBlockListBackgroundColor, #ebebee);
        box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.2);
      }

      .list.desktop {
        width: 100px;
        max-width: 100%;
        height: 100px;
        max-width: 100%;
        display: inline-block;
        position: relative;
        text-align: center;
      }

      .list.mobile {
        width: var(--image-width, 90px);
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
