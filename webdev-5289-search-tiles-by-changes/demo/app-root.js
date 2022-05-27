import { __decorate } from "tslib";
import { SearchService } from '@internetarchive/search-service';
import { LocalCache } from '@internetarchive/local-cache';
import { html, css, LitElement } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import { CollectionNameCache } from '@internetarchive/collection-name-cache';
import '../src/collection-browser';
let AppRoot = class AppRoot extends LitElement {
    constructor() {
        super(...arguments);
        this.searchService = SearchService.default;
        this.resizeObserver = new SharedResizeObserver();
        this.localCache = new LocalCache();
        this.collectionNameCache = new CollectionNameCache({
            searchService: this.searchService,
            localCache: this.localCache,
        });
        this.cellWidth = 18;
        this.cellHeight = 29;
        this.rowGap = 1.7;
        this.colGap = 1.7;
        this.loggedIn = false;
    }
    searchPressed(e) {
        var _a, _b;
        e.preventDefault();
        this.searchQuery = this.baseQueryField.value;
        if (((_a = this.currentPage) !== null && _a !== void 0 ? _a : 1) > 1) {
            this.collectionBrowser.goToPage((_b = this.currentPage) !== null && _b !== void 0 ? _b : 1);
        }
    }
    changePagePressed(e) {
        e.preventDefault();
        this.currentPage = this.pageNumberInput.valueAsNumber;
        this.collectionBrowser.goToPage(this.currentPage);
    }
    updated(changed) {
        if (changed.has('currentPage') && this.currentPage) {
            this.pageNumberInput.value = this.currentPage.toString();
        }
        if (changed.has('searchQuery')) {
            this.queryUpdated();
        }
    }
    queryUpdated() {
        this.collectionBrowser.baseQuery = this.searchQuery;
    }
    render() {
        var _a;
        return html `
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input
            type="text"
            id="base-query-field"
            .value=${(_a = this.searchQuery) !== null && _a !== void 0 ? _a : ''}
          />
          <input type="submit" value="Search" />
        </form>

        <form @submit=${this.changePagePressed}>
          Page: <input type="number" value="1" id="page-number-input" />
          <input type="submit" value="Go" />
        </form>

        <div id="cell-controls">
          <div id="cell-size-control">
            <div>
              <label for="cell-width-slider">Minimum cell width:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="18"
                step="0.1"
                id="cell-width-slider"
                @input=${this.widthChanged}
              />
              <span>${this.cellWidth}rem</span>
            </div>
            <div>
              <label for="cell-height-slider">Cell height:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="29"
                step="0.1"
                id="cell-height-slider"
                @input=${this.heightChanged}
              />
              <span>${this.cellHeight}rem</span>
            </div>
            <div>
              <label for="show-outline-check">Show outlines:</label>
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
            </div>
            <div>
              <label for="simulate-login">Simulate Login:</label>
              <input
                type="checkbox"
                id="simulate-login"
                @click=${this.loginChanged}
              />
            </div>
          </div>
          <div id="cell-gap-control">
            <div>
              <label for="cell-row-gap-slider">Row gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-row-gap-slider"
                @input=${this.rowGapChanged}
              />
              <span>${this.rowGap}rem</span>
            </div>
            <div>
              <label for="cell-col-gap-slider">Col gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-col-gap-slider"
                @input=${this.colGapChanged}
              />
              <span>${this.colGap}rem</span>
            </div>
          </div>
        </div>
      </div>

      <div id="collection-browser-container">
        <collection-browser
          .baseNavigationUrl=${'https://archive.org'}
          .baseImageUrl=${'https://archive.org'}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .collectionNameCache=${this.collectionNameCache}
          .showHistogramDatePicker=${true}
          .loggedIn=${this.loggedIn}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
        >
        </collection-browser>
      </div>
    `;
    }
    baseQueryChanged(e) {
        this.searchQuery = e.detail.baseQuery;
    }
    loginChanged(e) {
        const target = e.target;
        if (target.checked) {
            this.loggedIn = true;
        }
        else {
            this.loggedIn = false;
        }
    }
    outlineChanged(e) {
        const target = e.target;
        if (target.checked) {
            this.collectionBrowser.style.setProperty('--infiniteScrollerCellOutline', '1px solid #33D1FF');
        }
        else {
            this.collectionBrowser.style.removeProperty('--infiniteScrollerCellOutline');
        }
    }
    rowGapChanged(e) {
        const input = e.target;
        this.rowGap = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserRowGap', `${input.value}rem`);
    }
    colGapChanged(e) {
        const input = e.target;
        this.colGap = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserColGap', `${input.value}rem`);
    }
    widthChanged(e) {
        const input = e.target;
        this.cellWidth = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMinWidth', `${input.value}rem`);
    }
    heightChanged(e) {
        const input = e.target;
        this.cellHeight = parseFloat(input.value);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMinHeight', `${input.value}rem`);
        this.collectionBrowser.style.setProperty('--collectionBrowserCellMaxHeight', `${input.value}rem`);
    }
    visiblePageChanged(e) {
        const { pageNumber } = e.detail;
        if (pageNumber === this.currentPage)
            return;
        this.currentPage = pageNumber;
    }
};
AppRoot.styles = css `
    :host {
      display: block;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    collection-browser {
      margin-top: 30rem;
    }

    #base-query-field {
      width: 300px;
    }

    #dev-tools {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
    }

    #cell-controls {
      display: flex;
    }

    #cell-controls label {
      display: inline-block;
      width: 10rem;
    }

    #cell-gap-control {
      margin-left: 1rem;
    }
  `;
__decorate([
    state()
], AppRoot.prototype, "currentPage", void 0);
__decorate([
    state()
], AppRoot.prototype, "searchQuery", void 0);
__decorate([
    state()
], AppRoot.prototype, "cellWidth", void 0);
__decorate([
    state()
], AppRoot.prototype, "cellHeight", void 0);
__decorate([
    state()
], AppRoot.prototype, "rowGap", void 0);
__decorate([
    state()
], AppRoot.prototype, "colGap", void 0);
__decorate([
    state()
], AppRoot.prototype, "loggedIn", void 0);
__decorate([
    query('#base-query-field')
], AppRoot.prototype, "baseQueryField", void 0);
__decorate([
    query('#page-number-input')
], AppRoot.prototype, "pageNumberInput", void 0);
__decorate([
    query('collection-browser')
], AppRoot.prototype, "collectionBrowser", void 0);
AppRoot = __decorate([
    customElement('app-root')
], AppRoot);
export { AppRoot };
//# sourceMappingURL=app-root.js.map