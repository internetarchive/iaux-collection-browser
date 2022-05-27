import { __decorate } from "tslib";
import { LitElement, html, css, nothing, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { SortField, SortFieldDisplayName, } from '../models';
import './alpha-bar';
import { sortIcon } from './img/sort-triangle';
import { tileIcon } from './img/tile';
import { listIcon } from './img/list';
import { compactIcon } from './img/compact';
let SortFilterBar = class SortFilterBar extends LitElement {
    constructor() {
        super(...arguments);
        this.sortDirection = null;
        this.selectedSort = SortField.relevance;
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = null;
        this.showRelevance = true;
        this.alphaSelectorVisible = null;
        this.dateSortSelectorVisible = false;
        this.desktopSelectorBarWidth = 0;
        this.selectorBarContainerWidth = 0;
        this.hoveringOverDateSortOptions = false;
        this.boundDateSelectorEscapeListener = (e) => {
            if (e.key === 'Escape') {
                this.dateSortSelectorVisible = false;
            }
        };
    }
    render() {
        return html `
      <div id="container">
        <div id="sort-bar">
          <div id="sort-direction-container">
            ${this.sortDirectionSelectorTemplate}
          </div>

          <div id="sort-selector-container">
            ${this.mobileSortSelectorTemplate}
            ${this.desktopSortSelectorTemplate}
          </div>

          <div id="display-style-selector">${this.displayOptionTemplate}</div>
        </div>

        ${this.dateSortSelectorVisible && !this.mobileSelectorVisible
            ? this.dateSortSelector
            : nothing}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `;
    }
    updated(changed) {
        if (changed.has('displayMode')) {
            this.displayModeChanged();
        }
        if (changed.has('selectedSort') && this.sortDirection === null) {
            this.sortDirection = 'desc';
        }
        if (changed.has('selectedTitleFilter') && this.selectedTitleFilter) {
            this.alphaSelectorVisible = 'title';
        }
        if (changed.has('selectedCreatorFilter') && this.selectedCreatorFilter) {
            this.alphaSelectorVisible = 'creator';
        }
        if (changed.has('dateSortSelectorVisible')) {
            this.setupEscapeListeners();
        }
        if (changed.has('resizeObserver')) {
            const oldObserver = changed.get('resizeObserver');
            if (oldObserver)
                this.disconnectResizeObserver(oldObserver);
            this.setupResizeObserver();
        }
    }
    setupEscapeListeners() {
        if (this.dateSortSelectorVisible) {
            document.addEventListener('keydown', this.boundDateSelectorEscapeListener);
        }
        else {
            document.removeEventListener('keydown', this.boundDateSelectorEscapeListener);
        }
    }
    disconnectedCallback() {
        if (this.resizeObserver) {
            this.disconnectResizeObserver(this.resizeObserver);
        }
    }
    disconnectResizeObserver(resizeObserver) {
        resizeObserver.removeObserver({
            target: this.sortSelectorContainer,
            handler: this,
        });
        resizeObserver.removeObserver({
            target: this.desktopSortSelector,
            handler: this,
        });
    }
    setupResizeObserver() {
        if (!this.resizeObserver)
            return;
        this.resizeObserver.addObserver({
            target: this.sortSelectorContainer,
            handler: this,
        });
        this.resizeObserver.addObserver({
            target: this.desktopSortSelector,
            handler: this,
        });
    }
    get mobileSelectorVisible() {
        return this.selectorBarContainerWidth - 10 < this.desktopSelectorBarWidth;
    }
    get alphaBarTemplate() {
        if (!['title', 'creator'].includes(this.selectedSort))
            return nothing;
        if (this.alphaSelectorVisible === null) {
            if (this.selectedSort === 'creator')
                return this.creatorSelectorBar;
            if (this.selectedSort === 'title')
                return this.titleSelectorBar;
        }
        else {
            return this.alphaSelectorVisible === 'creator'
                ? this.creatorSelectorBar
                : this.titleSelectorBar;
        }
        return nothing;
    }
    handleResize(entry) {
        if (entry.target === this.desktopSortSelector) {
            this.desktopSelectorBarWidth = entry.contentRect.width;
        }
        else if (entry.target === this.sortSelectorContainer) {
            this.selectorBarContainerWidth = entry.contentRect.width;
        }
    }
    get sortDirectionSelectorTemplate() {
        return html `
      <div id="sort-direction-selector">
        <button
          id="sort-ascending-btn"
          class="sort-button ${this.sortDirection === 'asc' ? 'selected' : ''}"
          ?disabled=${this.selectedSort === 'relevance'}
          @click=${() => {
            this.setSortDirections('asc');
        }}
        >
          ${sortIcon}
        </button>
        <button
          id="sort-descending-btn"
          class="sort-button ${this.sortDirection === 'desc' ? 'selected' : ''}"
          ?disabled=${this.selectedSort === 'relevance'}
          @click=${() => {
            this.setSortDirections('desc');
        }}
        >
          ${sortIcon}
        </button>
      </div>
    `;
    }
    get desktopSortSelectorTemplate() {
        return html `
      <ul
        id="desktop-sort-selector"
        class=${this.mobileSelectorVisible ? 'hidden' : 'visible'}
      >
        <li id="sort-by-text">Sort By</li>
        <li>
          ${this.showRelevance
            ? this.getSortDisplayOption(SortField.relevance)
            : nothing}
        </li>
        <li>${this.getSortDisplayOption(SortField.views)}</li>
        <li>
          ${this.getSortDisplayOption(SortField.title, {
            clickEvent: () => {
                this.alphaSelectorVisible = 'title';
                this.selectedCreatorFilter = null;
                this.dateSortSelectorVisible = false;
                this.setSelectedSort(SortField.title);
                this.emitCreatorLetterChangedEvent();
            },
        })}
        </li>
        <li>
          ${this.getSortDisplayOption(SortField.date, {
            clickEvent: () => {
                if (!this.dateOptionSelected)
                    this.setSelectedSort(SortField.date);
                this.dateSortSelectorVisible = !this.dateSortSelectorVisible;
                this.alphaSelectorVisible = null;
                this.selectedTitleFilter = null;
                this.selectedCreatorFilter = null;
                this.emitTitleLetterChangedEvent();
                this.emitCreatorLetterChangedEvent();
            },
            displayName: html `${this.dateSortField}`,
            isSelected: () => this.dateOptionSelected,
        })}
        </li>
        <li>
          ${this.getSortDisplayOption(SortField.creator, {
            clickEvent: () => {
                this.alphaSelectorVisible = 'creator';
                this.selectedTitleFilter = null;
                this.dateSortSelectorVisible = false;
                this.setSelectedSort(SortField.creator);
                this.emitTitleLetterChangedEvent();
            },
        })}
        </li>
      </ul>
    `;
    }
    /**
     * This generates each of the sort option links.
     *
     * It manages the display value and the selected state of the option.
     *
     * @param sortField
     * @param options {
     *    additionalClickEvent?: () => void; If this is provided, it will also be called when the option is clicked.
     *    displayName?: TemplateResult; The name to display for the option. Defaults to the sortField display name.
     *    isSelected?: () => boolean; A function that returns true if the option is selected. Defaults to the selectedSort === sortField.
     * }
     * @returns
     */
    getSortDisplayOption(sortField, options) {
        var _a, _b;
        const isSelected = (_a = options === null || options === void 0 ? void 0 : options.isSelected) !== null && _a !== void 0 ? _a : (() => this.selectedSort === sortField);
        const displayName = (_b = options === null || options === void 0 ? void 0 : options.displayName) !== null && _b !== void 0 ? _b : SortFieldDisplayName[sortField];
        return html `
      <a
        href="#"
        @click=${(e) => {
            e.preventDefault();
            if (options === null || options === void 0 ? void 0 : options.clickEvent) {
                options.clickEvent(e);
            }
            else {
                this.alphaSelectorVisible = null;
                this.dateSortSelectorVisible = false;
                this.selectedTitleFilter = null;
                this.selectedCreatorFilter = null;
                this.setSelectedSort(sortField);
                this.emitTitleLetterChangedEvent();
                this.emitCreatorLetterChangedEvent();
            }
        }}
        class=${isSelected() ? 'selected' : ''}
      >
        ${displayName}
      </a>
    `;
    }
    get mobileSortSelectorTemplate() {
        return html `
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible ? 'visible' : 'hidden'}
      >
        ${Object.keys(SortField).map(field => html `
            <option value="${field}" ?selected=${this.selectedSort === field}>
              ${SortFieldDisplayName[field]}
            </option>
          `)}
      </select>
    `;
    }
    mobileSortChanged(e) {
        const target = e.target;
        this.setSelectedSort(target.value);
    }
    get displayOptionTemplate() {
        return html `
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${() => {
            this.displayMode = 'grid';
        }}
            class=${this.displayMode === 'grid' ? 'active' : ''}
          >
            ${tileIcon}
          </button>
        </li>
        <li>
          <button
            id="grid-button"
            @click=${() => {
            this.displayMode = 'list-detail';
        }}
            class=${this.displayMode === 'list-detail' ? 'active' : ''}
          >
            ${listIcon}
          </button>
        </li>
        <li>
          <button
            id="list-button"
            @click=${() => {
            this.displayMode = 'list-compact';
        }}
            class=${this.displayMode === 'list-compact' ? 'active' : ''}
          >
            ${compactIcon}
          </button>
        </li>
      </ul>
    `;
    }
    get dateSortSelector() {
        return html `
      <div
        id="date-sort-selector-backdrop"
        @keyup=${() => {
            this.dateSortSelectorVisible = false;
        }}
        @click=${() => {
            this.dateSortSelectorVisible = false;
        }}
      ></div>
      <div id="date-sort-selector">
        <ul>
          <li>${this.getDateSortButton(SortField.datearchived)}</li>
          <li>${this.getDateSortButton(SortField.date)}</li>
          <li>${this.getDateSortButton(SortField.datereviewed)}</li>
          <li>${this.getDateSortButton(SortField.dateadded)}</li>
        </ul>
      </div>
    `;
    }
    getDateSortButton(sortField) {
        return html `
      <button
        @click=${() => {
            this.selectDateSort(sortField);
        }}
        class=${this.selectedSort === sortField ? 'selected' : ''}
      >
        ${SortFieldDisplayName[sortField]}
      </button>
    `;
    }
    selectDateSort(sortField) {
        this.dateSortSelectorVisible = false;
        this.setSelectedSort(sortField);
    }
    setSortDirections(sortDirection) {
        this.sortDirection = sortDirection;
        this.emitSortChangedEvent();
    }
    setSelectedSort(sort) {
        this.selectedSort = sort;
        this.emitSortChangedEvent();
    }
    /**
     * There are four date sort options.
     *
     * This checks to see if the current sort is one of them.
     *
     * @readonly
     * @private
     * @type {boolean}
     * @memberof SortFilterBar
     */
    get dateOptionSelected() {
        const dateSortFields = [
            SortField.datearchived,
            SortField.date,
            SortField.datereviewed,
            SortField.dateadded,
        ];
        return dateSortFields.includes(this.selectedSort);
    }
    /**
     * The display name of the current date field
     *
     * @readonly
     * @private
     * @type {string}
     * @memberof SortFilterBar
     */
    get dateSortField() {
        var _a;
        const defaultSort = SortFieldDisplayName[SortField.date];
        const name = this.dateOptionSelected
            ? (_a = SortFieldDisplayName[this.selectedSort]) !== null && _a !== void 0 ? _a : defaultSort
            : defaultSort;
        return name;
    }
    get titleSelectorBar() {
        return html ` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
    }
    get creatorSelectorBar() {
        return html ` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`;
    }
    titleLetterChanged(e) {
        var _a;
        this.selectedTitleFilter = (_a = e.detail.selectedLetter) !== null && _a !== void 0 ? _a : null;
        this.emitTitleLetterChangedEvent();
    }
    creatorLetterChanged(e) {
        var _a;
        this.selectedCreatorFilter = (_a = e.detail.selectedLetter) !== null && _a !== void 0 ? _a : null;
        this.emitCreatorLetterChangedEvent();
    }
    emitTitleLetterChangedEvent() {
        const event = new CustomEvent('titleLetterChanged', {
            detail: { selectedLetter: this.selectedTitleFilter },
        });
        this.dispatchEvent(event);
    }
    emitCreatorLetterChangedEvent() {
        const event = new CustomEvent('creatorLetterChanged', {
            detail: { selectedLetter: this.selectedCreatorFilter },
        });
        this.dispatchEvent(event);
    }
    displayModeChanged() {
        const event = new CustomEvent('displayModeChanged', {
            detail: { displayMode: this.displayMode },
        });
        this.dispatchEvent(event);
    }
    emitSortChangedEvent() {
        const event = new CustomEvent('sortChanged', {
            detail: {
                selectedSort: this.selectedSort,
                sortDirection: this.sortDirection,
            },
        });
        this.dispatchEvent(event);
    }
};
SortFilterBar.styles = css `
    #container {
      position: relative;
    }

    #sort-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgb(232, 232, 232);
      align-items: center;
      padding: 0.5rem 1.5rem;
    }

    #sort-direction-container {
      flex: 0;
    }

    #sort-by-text {
      text-transform: uppercase;
    }

    #bottom-shadow {
      height: 1px;
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      background-color: #bbb;
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
    }

    li {
      padding: 0;
    }

    .sort-button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      cursor: pointer;
      outline: inherit;
      width: 12px;
      height: 12px;
      opacity: 0.5;
    }

    .sort-button.selected {
      opacity: 1;
    }

    .sort-button:disabled {
      opacity: 0.25;
      cursor: default;
    }

    #date-sort-selector {
      position: absolute;
      left: 150px;
      top: 45px;

      z-index: 1;
      padding: 1rem;
      background-color: white;
      border-radius: 2.5rem;
      border: 1px solid #404142;
    }

    #date-sort-selector button {
      background: none;
      border-radius: 15px;
      color: #404142;
      border: none;
      appearance: none;
      cursor: pointer;
      -webkit-appearance: none;
      font-size: 1.4rem;
      font-weight: 400;
      padding: 0.5rem 1.2rem;
    }

    #date-sort-selector button.selected {
      background-color: #404142;
      color: white;
    }

    #show-details {
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
    }

    #show-details input {
      margin-right: 0.5rem;
      flex: 0 0 12px;
    }

    #sort-descending-btn {
      transform: rotate(180deg);
    }

    #sort-direction-selector {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-right: 1rem;
    }

    #sort-selector-container {
      flex: 1;
    }

    /*
      we move the desktop sort selector offscreen instead of display: none
      because we need to observe the width of it vs its container to determine
      if it's wide enough to display the desktop version and if you displY: none,
      the width becomes 0
    */
    #desktop-sort-selector.hidden {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    #mobile-sort-selector.hidden {
      display: none;
    }

    #date-sort-selector-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.5);
    }

    #desktop-sort-selector {
      display: inline-flex;
    }

    #desktop-sort-selector li {
      display: flex;
      align-items: center;
    }

    #desktop-sort-selector li a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 1.4rem;
      color: #333;
      line-height: 2.5;
    }

    #desktop-sort-selector li a.selected {
      font-weight: bold;
    }

    #desktop-sort-selector li::after {
      content: '•';
      padding-left: 1rem;
      padding-right: 1rem;
    }

    #desktop-sort-selector li:first-child::after {
      content: '';
    }

    #desktop-sort-selector li:last-child::after {
      content: '';
    }

    #display-style-selector {
      flex: 0;
    }

    #display-style-selector button {
      background: none;
      color: inherit;
      border: none;
      appearance: none;
      cursor: pointer;
      -webkit-appearance: none;
      opacity: 0.5;
    }

    #display-style-selector button.active {
      opacity: 1;
    }

    #display-style-selector button svg {
      width: 24px;
      height: 24px;
    }
  `;
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "displayMode", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "sortDirection", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "selectedSort", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "selectedTitleFilter", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "selectedCreatorFilter", void 0);
__decorate([
    property({ type: Boolean })
], SortFilterBar.prototype, "showRelevance", void 0);
__decorate([
    property({ type: Object })
], SortFilterBar.prototype, "resizeObserver", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "alphaSelectorVisible", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "dateSortSelectorVisible", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "desktopSelectorBarWidth", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "selectorBarContainerWidth", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "hoveringOverDateSortOptions", void 0);
__decorate([
    query('#desktop-sort-selector')
], SortFilterBar.prototype, "desktopSortSelector", void 0);
__decorate([
    query('#sort-selector-container')
], SortFilterBar.prototype, "sortSelectorContainer", void 0);
SortFilterBar = __decorate([
    customElement('sort-filter-bar')
], SortFilterBar);
export { SortFilterBar };
//# sourceMappingURL=sort-filter-bar.js.map