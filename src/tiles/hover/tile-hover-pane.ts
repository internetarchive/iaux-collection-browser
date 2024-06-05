import type { SortParam } from '@internetarchive/search-service';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { suppressedCollections, type TileModel } from '../../models';
import type { CollectionTitles } from '../../data-source/models';
import '../list/tile-list';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn: boolean = false;

  @property({ type: Boolean }) mobileBreakpoint?: boolean;

  @property({ type: Boolean }) currentWidth?: boolean;

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  protected render(): TemplateResult {
    return html`
      <div id="container">
        ${this.headerTemplate}
        <div id="hover-tile-list">
          <tile-list
            .model=${this.model}
            .baseNavigationUrl=${this.baseNavigationUrl}
            .baseImageUrl=${this.baseImageUrl}
            .loggedIn=${this.loggedIn}
            .sortParam=${this.sortParam}
            .collectionTitles=${this.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${this.currentWidth}
          ></tile-list>
        </div>
      </div>
    `;
  }

  private get headerTemplate(): TemplateResult {
    let collectionTitle = '';
    let collectionIdentifier = '';
    for (const collection of this.model?.collections || []) {
      if (
        !suppressedCollections[collection] &&
        !collection.startsWith('fav-')
      ) {
        collectionTitle = this.collectionTitles?.get(collection) ?? collection;
        collectionIdentifier = collection;
        break;
      }
    }

    return html`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/collection/${collectionIdentifier}">
          <img
            src="${this.baseImageUrl}/services/img/${collectionIdentifier}"
            alt=""
          /><span>${collectionTitle}</span>
        </a>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const hoverPaneHeaderBGColor = css`var(--hoverPaneHeaderBGColor, #edf0ff)`;
    const iaLinkColor = css`var(--ia-theme-link-color, #4b64ff)`;
    const iaFontFamily = css`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;

    return css`
      :host {
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.1s ease-in, transform 0.1s ease-in;
        --image-width: auto;
      }

      :host(.visible) {
        visibility: visible;
      }

      :host(.fade-in) {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          transition-duration: 0.001s !important; /* Imperceptibly fast */
        }
      }

      #container {
        width: max-content;
        max-width: min(45vw, 600px);
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.8);
        background: white;
      }

      @media screen and (max-width: 600px) {
        #container {
          max-width: 80vw;
        }
      }

      /* main tile-list container */
      #hover-tile-list {
        padding: 10px;
      }

      /* header on hover panel to show collection icon and title */
      #list-line-header {
        background: ${hoverPaneHeaderBGColor};
      }
      #list-line-header a {
        display: flex;
        align-items: center;
        column-gap: 5px;
        height: 3.4rem;
        padding: 0 10px;
        width: fit-content;
        font-size: 1.4rem;
        color: ${iaLinkColor};
        font-family: ${iaFontFamily};
        text-decoration: none;
      }
      #list-line-header a:hover {
        text-decoration: underline;
      }
      #list-line-header a img {
        width: 30px;
        max-height: 30px;
      }
    `;
  }
}
