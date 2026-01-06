import type { SortParam } from '@internetarchive/search-service';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@a11y/focus-trap';

import { suppressedCollections, type TileModel } from '../../models';
import type { CollectionTitles } from '../../data-source/models';
import '../list/tile-list';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn: boolean = false;

  @property({ type: Boolean }) suppressBlurring: boolean = false;

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: Number }) mobileBreakpoint?: number;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  protected render(): TemplateResult {
    return html`
      <div id="container">
        <focus-trap>
          ${this.headerTemplate}
          <div id="hover-tile-list">
            <tile-list
              .model=${this.model}
              .baseNavigationUrl=${this.baseNavigationUrl}
              .baseImageUrl=${this.baseImageUrl}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .sortParam=${this.sortParam}
              .collectionTitles=${this.collectionTitles}
              .mobileBreakpoint=${this.mobileBreakpoint}
              .currentWidth=${this.currentWidth}
            ></tile-list>
          </div>
        </focus-trap>
      </div>
    `;
  }

  private get headerTemplate(): TemplateResult | typeof nothing {
    // early return if item does't have parent collection
    if (this.model?.collections?.length === 0) return nothing;

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

    // sometimes item does have collections but they are in suppressed or favorite list,
    // let's not render that
    if (!collectionIdentifier) return nothing;

    return html`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${collectionIdentifier}">
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
        margin: 0;
        border: 0;
        padding: 0;
        overflow: visible;
        color: inherit;
        background: none;
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity 0.1s ease-in,
          transform 0.1s ease-in;
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
        border-radius: 4px 4px 0 0;
        width: fit-content;
        font-size: 1.4rem;
        color: ${iaLinkColor};
        font-family: ${iaFontFamily};
        text-decoration: none;
        width: auto;
      }
      #list-line-header a span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
