import { SearchService } from '@internetarchive/search-service';
import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  private searchService = SearchService.default;

  @query('#base-query-field') private baseQueryField!: HTMLInputElement;

  @query('collection-browser') private collectionBrowser!: CollectionBrowser;

  private searchPressed(e: Event) {
    e.preventDefault();
    const baseQuery = this.baseQueryField.value;
    this.collectionBrowser.baseQuery = baseQuery;
  }

  render() {
    return html`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          <input type="text" id="base-query-field" value="collection:etree" />
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
  `;
}
