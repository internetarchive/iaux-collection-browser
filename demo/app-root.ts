import { SearchService } from '@internetarchive/search-service';
import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('#page-number-input') private pageNumberInput!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  private searchPressed(e: Event) {
    e.preventDefault();
    const baseQuery = this.baseQueryField.value;
    this.collectionBrowser.initialPageNumber =
      this.pageNumberInput.valueAsNumber;
    if (baseQuery !== this.collectionBrowser.baseQuery) {
      this.collectionBrowser.baseQuery = baseQuery;
    }
  }

  firstUpdated(): void {
    const url = new URL(window.location.href);
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    if (pageNumber) {
      this.pageNumberInput.value = pageNumber;
      this.collectionBrowser.initialPageNumber = parseInt(pageNumber, 10);
    }
    if (searchQuery) {
      this.baseQueryField.value = searchQuery;
      this.collectionBrowser.baseQuery = searchQuery;
    }
  }

  render() {
    return html`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input type="text" id="base-query-field" value="collection:etree" />
          Page: <input type="number" value="1" id="page-number-input" />
          <input type="submit" value="Search" />
        </form>

        <button
          @click=${() => {
            this.collectionBrowser.showDeleteButtons =
              !this.collectionBrowser.showDeleteButtons;
          }}
        >
          Toggle Delete Mode
        </button>
      </div>

      <collection-browser
        .baseNavigationUrl=${'https://archive.org'}
        .searchService=${this.searchService}
        .baseQuery=${'collection:etree'}
      >
      </collection-browser>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    #base-query-field {
      width: 300px;
    }

    #dev-tools {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      background-color: rgba(0, 0, 0, 0.9);
      padding: 0.5rem 1rem;
    }
  `;
}
