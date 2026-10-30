var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { defaultSortAvailability, SORT_OPTIONS, SortField, } from '../models';
import { sortUpIcon } from './img/sort-toggle-up';
import { sortDownIcon } from './img/sort-toggle-down';
import { sortDisabledIcon } from './img/sort-toggle-disabled';
import { tileIcon } from './img/tile';
import { listIcon } from './img/list';
import { compactIcon } from './img/compact';
import { srOnlyStyle } from '../styles/sr-only';
import '@internetarchive/elements/ia-dropdown/ia-dropdown';
import './alpha-bar';
let SortFilterBar = class SortFilterBar extends LitElement {
    constructor() {
        super(...arguments);
        /** The default sort direction to use if none is set */
        this.defaultSortDirection = null;
        /** The default sort field to use if none is set */
        this.defaultSortField = SortField.relevance;
        /** The current sort direction (asc/desc), or null if none is set */
        this.sortDirection = null;
        /** The field currently being sorted on (e.g., 'title'). Defaults to relevance. */
        this.selectedSort = SortField.default;
        /** The currently selected title letter filter, or null if none is set */
        this.selectedTitleFilter = null;
        /** The currently selected creator letter filter, or null if none is set */
        this.selectedCreatorFilter = null;
        /**
         * Map defining which sortable fields should be included on the sort bar.
         *
         * E.g.,
         * ```
         * {
         *   [SortField.relevance]: true,
         *   [SortField.date]: false,
         *   [SortField.title]: true,
         *   ...
         * }
         * ```
         */
        this.sortFieldAvailability = defaultSortAvailability;
        /** Whether to replace the default sort options with a slot for customization (default `false`) */
        this.enableSortOptionsSlot = false;
        /** Whether to suppress showing the three display mode options on the right of the bar (default `false`) */
        this.suppressDisplayModes = false;
        /**
         * Which of the alphabet bars (title/creator) should be shown, or null if one
         * should not currently be rendered.
         */
        this.alphaSelectorVisible = null;
        /**
         * Whether the transparent backdrop to catch clicks outside the dropdown menu
         * should be rendered.
         */
        this.dropdownBackdropVisible = false;
        this.boundSortBarSelectorEscapeListener = (e) => {
            if (e.key === 'Escape') {
                this.closeDropdown();
            }
        };
    }
    render() {
        return html `
      <div id="container">
        <div id="sort-bar-row">
          <section id="sort-bar" aria-label=${msg('Sorting options')}>
            <slot name="sort-options-left"></slot>
            <div id="sort-options">
              ${!this.enableSortOptionsSlot
            ? html `
                    <div class="sort-direction-container">
                      ${this.sortDirectionSelectorTemplate}
                    </div>
                    <span class="sort-by-text">${msg('Sort by:')}</span>
                    <div id="sort-selector-container">
                      ${this.sortSelectorTemplate}
                    </div>
                  `
            : html `<slot name="sort-options"></slot>`}
            </div>
            <slot name="sort-options-right"></slot>

            ${this.suppressDisplayModes
            ? nothing
            : html `<div id="display-style-selector">
                  ${this.displayOptionTemplate}
                </div>`}
          </section>
          <slot name="sort-bar-end"></slot>
        </div>

        ${this.dropdownBackdropVisible ? this.dropdownBackdrop : nothing}
        ${this.alphaBarTemplate}
      </div>
    `;
    }
    willUpdate(changed) {
        if (changed.has('selectedSort') || changed.has('defaultSortField')) {
            // If the sort is changed from its default without a direction set,
            // we adopt the default sort direction for that sort type.
            if (this.selectedSort &&
                this.selectedSort !== SortField.default &&
                this.sortDirection === null) {
                const sortOption = SORT_OPTIONS[this.finalizedSortField];
                this.sortDirection = sortOption.defaultSortDirection;
            }
        }
    }
    updated(changed) {
        if (changed.has('displayMode')) {
            this.displayModeChanged();
        }
        if (changed.has('selectedTitleFilter') && this.selectedTitleFilter) {
            this.alphaSelectorVisible = 'title';
        }
        if (changed.has('selectedCreatorFilter') && this.selectedCreatorFilter) {
            this.alphaSelectorVisible = 'creator';
        }
        if (changed.has('dropdownBackdropVisible')) {
            this.setupEscapeListeners();
        }
    }
    setupEscapeListeners() {
        if (this.dropdownBackdropVisible) {
            document.addEventListener('keydown', this.boundSortBarSelectorEscapeListener);
        }
        else {
            document.removeEventListener('keydown', this.boundSortBarSelectorEscapeListener);
        }
    }
    /**
     * Template to render the alphabet bar, or `nothing` if it should not be rendered
     * for the current sort
     */
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
    /** Template to render the sort direction toggle button */
    get sortDirectionSelectorTemplate() {
        const oppositeSortDirectionReadable = this.sortDirection === 'asc' ? msg('descending') : msg('ascending');
        const buttonLabel = this.canChangeSortDirection
            ? msg(str `Change to ${oppositeSortDirectionReadable} sort`)
            : msg('Directions are not available for the current sort option');
        return html `
      <button
        class="sort-direction-selector"
        title=${buttonLabel}
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${buttonLabel}</span>
        ${this.sortDirectionIcon}
      </button>
    `;
    }
    /** Template to render the sort direction button's icon in the correct current state */
    get sortDirectionIcon() {
        // Show a fully disabled icon for sort options without direction support
        if (!this.canChangeSortDirection) {
            return html `<div class="sort-direction-icon">${sortDisabledIcon}</div>`;
        }
        // For all other sorts, show the ascending/descending direction
        return html `
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection === 'asc' ? sortUpIcon : sortDownIcon}
      </div>
    `;
    }
    /** The template to render all the sort options in a single dropdown */
    get sortSelectorTemplate() {
        const displayedOptions = Object.values(SORT_OPTIONS).filter(opt => opt.shownInSortBar && this.sortFieldAvailability[opt.field]);
        return html `
      <div id="sort-dropdown-container">
        ${this.getSortDropdown({
            displayName: SORT_OPTIONS[this.finalizedSortField].displayName,
            id: 'sort-dropdown',
            selected: true,
            dropdownOptions: displayedOptions.map(opt => this.getDropdownOption(opt.field)),
            selectedOption: this.finalizedSortField,
            onOptionSelected: this.sortOptionSelected,
            onDropdownClick: () => {
                this.dropdownBackdropVisible = this.sortOptionsDropdown.open;
                this.sortOptionsDropdown.classList.toggle('open', this.sortOptionsDropdown.open);
            },
        })}
      </div>
    `;
    }
    /**
     * Generates a dropdown component containing multiple grouped sort options.
     *
     * @param options.displayName The name to use for the dropdown's visible label
     * @param options.id The id to apply to the dropdown element
     * @param options.dropdownOptions An array of option objects used to populate the dropdown
     * @param options.selectedOption The id of the option that should be initially selected
     * @param options.selected A boolean indicating whether this dropdown should use its
     *  selected appearance
     * @param options.onOptionSelected A handler for optionSelected events coming from the dropdown
     * @param options.onDropdownClick A handler for click events on the dropdown
     */
    getSortDropdown(options) {
        return html `
      <ia-dropdown
        id=${options.id}
        class=${options.selected ? 'selected' : ''}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${options.selected}
        .options=${options.dropdownOptions}
        .selectedOption=${options.selectedOption ?? ''}
        @optionSelected=${options.onOptionSelected ?? nothing}
        @click=${options.onDropdownClick ?? nothing}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title=${options.displayName}
        >
          ${options.displayName}
        </span>
      </ia-dropdown>
    `;
    }
    /** Generates a single dropdown option object for the given sort field */
    getDropdownOption(sortField) {
        return {
            id: sortField,
            label: html `
        <span class="dropdown-option-label">
          ${SORT_OPTIONS[sortField].displayName}
        </span>
      `,
        };
    }
    /** Handler for when a new sort dropdown option is selected */
    sortOptionSelected(e) {
        this.dropdownBackdropVisible = false;
        const sortField = e.detail.option.id;
        this.setSelectedSort(sortField);
        this.alphaSelectorVisible = null;
        if (sortField !== 'title' && this.selectedTitleFilter) {
            this.selectedTitleFilter = null;
            this.emitTitleLetterChangedEvent();
        }
        if (sortField !== 'creator' && this.selectedCreatorFilter) {
            this.selectedCreatorFilter = null;
            this.emitCreatorLetterChangedEvent();
        }
    }
    /** Template for rendering the three display mode options */
    /** Added data-testid for Playwright testing * */
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
            title=${msg('Tile view')}
            data-testid="grid-button"
          >
            ${tileIcon}
          </button>
        </li>
        <li>
          <button
            id="list-detail-button"
            @click=${() => {
            this.displayMode = 'list-detail';
        }}
            class=${this.displayMode === 'list-detail' ? 'active' : ''}
            title=${msg('List view')}
            data-testid="list-detail-button"
          >
            ${listIcon}
          </button>
        </li>
        <li>
          <button
            id="list-compact-button"
            @click=${() => {
            this.displayMode = 'list-compact';
        }}
            class=${this.displayMode === 'list-compact' ? 'active' : ''}
            title=${msg('Compact list view')}
            data-testid="list-compact-button"
          >
            ${compactIcon}
          </button>
        </li>
      </ul>
    `;
    }
    /**
     * Template for rendering the transparent backdrop to capture clicks outside the
     * dropdown menu while it is open.
     */
    get dropdownBackdrop() {
        return html `
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdown}
        @click=${this.closeDropdown}
      ></div>
    `;
    }
    /** Closes the sorting dropdown component's menus */
    closeDropdown() {
        this.dropdownBackdropVisible = false;
        if (!this.sortOptionsDropdown)
            return;
        this.sortOptionsDropdown.open = false;
        this.sortOptionsDropdown.classList.remove('open');
    }
    setSortDirection(sortDirection) {
        this.sortDirection = sortDirection;
        this.emitSortChangedEvent();
    }
    /** Toggles the current sort direction between 'asc' and 'desc' */
    toggleSortDirection() {
        this.setSortDirection(this.finalizedSortDirection === 'desc' ? 'asc' : 'desc');
    }
    handleSortDirectionClicked() {
        if (!this.sortDirection &&
            this.defaultSortField &&
            this.defaultSortDirection) {
            // When the sort direction is merely defaulted (not set by the user), clicking
            // the toggled button should "promote" the default sort to an explicitly-set one
            // and then toggle it as usual.
            this.selectedSort = this.defaultSortField;
            this.sortDirection = this.defaultSortDirection;
        }
        this.toggleSortDirection();
    }
    setSelectedSort(sort) {
        this.selectedSort = sort;
        // Apply this field's default sort direction
        const sortOption = SORT_OPTIONS[sort];
        this.sortDirection = sortOption.defaultSortDirection;
        this.emitSortChangedEvent();
    }
    /** The current sort field, or the default one if no explicit sort is set */
    get finalizedSortField() {
        const resolvedField = this.selectedSort === SortField.default
            ? this.defaultSortField
            : this.selectedSort;
        if (this.sortFieldAvailability[resolvedField])
            return resolvedField;
        // Fall back to the first available sort option shown in the sort bar, if
        // the requested one isn't available
        return this.firstAvailableOption?.field ?? resolvedField;
    }
    /** The current sort direction, or the default one if no explicit direction is set */
    get finalizedSortDirection() {
        return this.sortDirection === null
            ? this.defaultSortDirection
            : this.sortDirection;
    }
    /** The first option shown in the sort dropdown, or undefined if none are available */
    get firstAvailableOption() {
        return Object.values(SORT_OPTIONS).find(opt => opt.shownInSortBar && this.sortFieldAvailability[opt.field]);
    }
    /** Whether the sort direction button should be enabled for the current sort */
    get canChangeSortDirection() {
        return SORT_OPTIONS[this.finalizedSortField].canSetDirection;
    }
    get titleSelectorBar() {
        return html ` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${this.prefixFilterCountMap?.title}
      ariaLandmarkLabel=${msg('Filter by title letter')}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
    }
    get creatorSelectorBar() {
        return html ` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${this.prefixFilterCountMap?.creator}
      ariaLandmarkLabel=${msg('Filter by creator letter')}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`;
    }
    titleLetterChanged(e) {
        this.selectedTitleFilter = e.detail.selectedLetter ?? null;
        this.emitTitleLetterChangedEvent();
    }
    creatorLetterChanged(e) {
        this.selectedCreatorFilter = e.detail.selectedLetter ?? null;
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
    static get styles() {
        const disabledIconColor = css `#bbbbbb`;
        return [
            srOnlyStyle,
            css `
        #container {
          position: relative;
        }

        /*
         * The sort-bar-end slot shares this row with the sort bar but sits
         * outside its "Sorting options" landmark. When the slotted content
         * doesn't fit beside the sort controls, it wraps onto its own line at
         * the right rather than overflowing the row.
         */
        #sort-bar-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-end;
          align-items: center;
          padding-bottom: 1px;
          border-bottom: 1px solid #2c2c2c;
          font-size: 1.4rem;
        }

        #sort-bar {
          flex: auto;
          min-width: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        #sort-options {
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        ul {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        li {
          padding: 0;
        }

        .sort-by-text {
          margin-right: 5px;
          font-weight: bold;
          white-space: nowrap;
        }

        .sort-direction-container {
          display: flex;
          align-self: stretch;
          flex: 0;
          margin: 0 3px;
        }

        .sort-direction-selector {
          display: flex;
          justify-content: center;
          width: 30px;
          margin: 0 5px 0 0;
          padding: 7px 8px;
          max-height: fit-content;
          border-radius: 5px;
          background: white;
          border: 1px solid rgb(25, 72, 128);
          appearance: none;
          cursor: pointer;
        }

        .sort-direction-selector:disabled {
          cursor: not-allowed;
          border-color: ${disabledIconColor};
        }

        .sort-direction-icon {
          display: flex;
          align-items: center;
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          outline: inherit;
          width: 12px;
          height: 12px;
        }

        .sort-direction-icon > svg {
          flex: 1;
        }

        #sort-selector-container {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        #sort-dropdown-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        #sort-selector-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          background-color: transparent;
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
          fill: ${disabledIconColor};
        }

        #display-style-selector button.active {
          fill: var(--ia-theme-primary-text-color, #2c2c2c);
        }

        #display-style-selector button svg {
          width: 24px;
          height: 24px;
        }

        ia-dropdown {
          --dropdownTextColor: white;
          --dropdownOffsetTop: 0;
          --dropdownBorderTopWidth: 0;
          --dropdownBorderTopLeftRadius: 0;
          --dropdownBorderTopRightRadius: 0;
          --dropdownWhiteSpace: nowrap;
          --dropdownListZIndex: 2;
          --dropdownCaretColor: var(--ia-theme-primary-text-color, #2c2c2c);
          --dropdownSelectedTextColor: white;
          --dropdownSelectedBgColor: rgba(255, 255, 255, 0.3);
          --dropdownHoverBgColor: rgba(255, 255, 255, 0.3);
          --caretHeight: 9px;
          --caretWidth: 12px;
          --caretPadding: 0 5px 0 0;
        }
        ia-dropdown.selected .dropdown-label {
          font-weight: bold;
        }
        ia-dropdown.open {
          z-index: 2;
        }

        .dropdown-label {
          display: inline-block;
          height: 100%;
          padding-left: 5px;
          font-size: 1.4rem;
          font-family: var(--ia-theme-base-font-family);
          line-height: 2;
          color: var(--ia-theme-primary-text-color, #2c2c2c);
          white-space: nowrap;
          user-select: none;
        }
      `,
        ];
    }
};
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "displayMode", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "defaultSortDirection", void 0);
__decorate([
    property({ type: String })
], SortFilterBar.prototype, "defaultSortField", void 0);
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
    property({ type: Object })
], SortFilterBar.prototype, "sortFieldAvailability", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SortFilterBar.prototype, "enableSortOptionsSlot", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], SortFilterBar.prototype, "suppressDisplayModes", void 0);
__decorate([
    property({ type: Object })
], SortFilterBar.prototype, "prefixFilterCountMap", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "alphaSelectorVisible", void 0);
__decorate([
    state()
], SortFilterBar.prototype, "dropdownBackdropVisible", void 0);
__decorate([
    query('#sort-dropdown')
], SortFilterBar.prototype, "sortOptionsDropdown", void 0);
SortFilterBar = __decorate([
    customElement('sort-filter-bar'),
    localized()
], SortFilterBar);
export { SortFilterBar };
