import { localized, msg } from '@lit/localize';
import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { collectionIcon } from '../../assets/img/icons/mediatype/collection';
import { TileModel } from '../../models';

@localized()
@customElement('collection-tile')
export class CollectionTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div id="container">
        <div id="collection-image-title">
          <div id="collection-title">${this.model?.title}</div>
          <div id="collection-image-container">
            <div
              id="collection-image"
              style="background-image:url('https://archive.org/services/img/${this
                .model?.identifier}')"
            ></div>
          </div>
        </div>
        <div id="item-count-container">
          <div id="item-count-image-container">${collectionIcon}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${this.model?.itemCount.toLocaleString()}</div>
            <div id="items-text">${msg('items')}</div>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const cornerRadiusCss = css`var(--collectionTileCornerRadius, 4px)`;

    return css`
      #collection-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      #collection-image {
        width: 16rem;
        height: 16rem;
        border-radius: 0.8rem;
        overflow: hidden;
        box-shadow: 1px 1px 2px 0px;
        object-fit: cover;
        background-position: center;
        background-size: cover;
      }

      #item-count-image-container svg {
        filter: invert(100%);
      }

      #collection-image-title {
        background-color: #666;
        border: 1px solid #2c2c2c;
        padding: 0.5rem;
        border-top-left-radius: ${cornerRadiusCss};
        border-top-right-radius: ${cornerRadiusCss};
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      #collection-title {
        font-weight: bold;
        color: #fff;
        font-size: 1.6rem;
        text-align: center;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #container {
        box-shadow: 1px 1px 2px 0px;
        border-radius: ${cornerRadiusCss};
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      #container:hover #collection-title {
        text-decoration: underline;
      }

      #container:hover #collection-image-title {
        background-color: #757575;
      }

      #item-count-container {
        background-color: #444;
        border-bottom: 1px solid #2c2c2c;
        border-left: 1px solid #2c2c2c;
        border-right: 1px solid #2c2c2c;
        border-bottom-left-radius: ${cornerRadiusCss};
        border-bottom-right-radius: ${cornerRadiusCss};
        display: flex;
        padding: 0rem 0.5rem;
        height: 5.5rem;
        align-items: center;
      }

      #item-count-image-container {
        margin-right: 0.5rem;
      }

      #item-count-stacked-text {
        display: flex;
        align-items: baseline;
        color: #fff;
      }
      #item-count-image-container svg {
        height: 2.5rem;
        align-items: baseline;
      }

      #container:hover #item-count-container {
        background-color: #575757;
      }

      #item-count {
        font-size: 1.4rem;
        font-weight: bold;
      }

      #item-count-image {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
      }

      #items-text {
        font-size: 1.4rem;
        font-weight: bold;
        margin-left: 0.5rem;
      }
    `;
  }
}
