import { localized, msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { collectionIcon } from '../../assets/img/icons/collection';
import { TileModel } from '../../models';

@localized()
@customElement('collection-tile')
export class CollectionTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  render() {
    return html`
      <a
        href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
        title=${ifDefined(this.model?.title)}
      >
        <div id="collection-image-title">
          <div
            id="collection-image"
            style="background-image:url('https://archive.org/services/img/${this
              .model?.identifier}')"
          ></div>
          <div id="collection-title">${this.model?.title}</div>
        </div>
        <div id="item-count-container">
          <div id="item-count-image-container">${collectionIcon}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${this.model?.itemCount.toLocaleString()}</div>
            <div id="items-text">${msg('ITEMS')}</div>
          </div>
        </div>
      </a>
    `;
  }

  static get styles(): CSSResultGroup {
    const cornerRadiusCss = css`var(--collectionTileCornerRadius, 4px)`;

    return css`
      :host {
        display: block;
        height: 100%;
        outline: 1px solid red;
      }

      a {
        display: block;
        color: #fff;
        text-decoration: none;
      }

      #collection-image {
        width: 9rem;
        height: 9rem;
        border-radius: 4.5rem;
        overflow: hidden;
        margin-bottom: 1.5rem;
        background-position: center;
        background-size: cover;
      }

      #collection-image-title {
        background-color: #666;
        padding: 1.5rem;
        border-top-left-radius: ${cornerRadiusCss};
        border-top-right-radius: ${cornerRadiusCss};
      }

      #collection-title {
        font-weight: 200;
        font-size: 1.8rem;
        letter-spacing: 1px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      a:hover #collection-title {
        text-decoration: underline;
      }

      a:hover #collection-image-title {
        background-color: #8eb8ea;
      }

      #item-count-container {
        background-color: #444;
        border-bottom-left-radius: ${cornerRadiusCss};
        border-bottom-right-radius: ${cornerRadiusCss};
        display: flex;
        padding: 1rem;
        align-items: center;
      }

      #item-count-image-container {
        margin-right: 0.5rem;
      }

      #item-count-image-container svg {
        height: 3rem;
      }

      a:hover #item-count-container {
        background-color: #4a90e2;
      }

      #item-count {
        font-size: 1.4rem;
      }

      #item-count-image {
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(6deg)
          brightness(102%) contrast(101%);
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
      }

      #items-text {
        font-size: 1rem;
      }
    `;
  }
}
