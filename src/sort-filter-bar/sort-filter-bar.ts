import {
  LitElement,
  html,
  css,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import type { IaDropdown, optionInterface } from '@internetarchive/ia-dropdown';
import type { SortDirection } from '@internetarchive/search-service';
import {
  ALL_DATE_SORT_FIELDS,
  ALL_VIEWS_SORT_FIELDS,
  CollectionDisplayMode,
  defaultSortAvailability,
  PrefixFilterCounts,
  PrefixFilterType,
  SORT_OPTIONS,
  SortField,
} from '../models';

import { sortUpIcon } from './img/sort-toggle-up';
import { sortDownIcon } from './img/sort-toggle-down';
import { sortDisabledIcon } from './img/sort-toggle-disabled';
import { tileIcon } from './img/tile';
import { listIcon } from './img/list';
import { compactIcon } from './img/compact';
import { srOnlyStyle } from '../styles/sr-only';

import '@internetarchive/ia-dropdown';
import './alpha-bar';

type AlphaSelector = 'creator' | 'title';

@customElement('sort-filter-bar')
export class SortFilterBar extends LitElement {
  /** Which display mode the tiles are being rendered with (grid/list-detail/list-compact) */
  @property({ type: String }) displayMode?: CollectionDisplayMode;

  /** The default sort direction to use if none is set */
  @property({ type: String }) defaultSortDirection: SortDirection | null = null;

  /** The default sort field to use if none is set */
  @property({ type: String }) defaultSortField: Exclude<
    SortField,
    SortField.default
  > = SortField.relevance;

  /** The current sort direction (asc/desc), or null if none is set */
  @property({ type: String }) sortDirection: SortDirection | null = null;

  /** The field currently being sorted on (e.g., 'title'). Defaults to relevance. */
  @property({ type: String }) selectedSort: SortField = SortField.default;

  /** The currently selected title letter filter, or null if none is set */
  @property({ type: String }) selectedTitleFilter: string | null = null;

  /** The currently selected creator letter filter, or null if none is set */
  @property({ type: String }) selectedCreatorFilter: string | null = null;

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
  @property({ type: Object }) sortFieldAvailability = defaultSortAvailability;

  /** Whether to replace the default sort options with a slot for customization (default `false`) */
  @property({ type: Boolean, reflect: true }) enableSortOptionsSlot: boolean =
    false;

  /** Whether to suppress showing the three display mode options on the right of the bar (default `false`) */
  @property({ type: Boolean, reflect: true })
  suppressDisplayModes: boolean = false;

  /** Maps of result counts for letters on the alphabet bar, for each letter filter type */
  @property({ type: Object }) prefixFilterCountMap?: Record<
    PrefixFilterType,
    PrefixFilterCounts
  >;

  /**
   * Which of the alphabet bars (title/creator) should be shown, or null if one
   * should not currently be rendered.
   */
  @state() alphaSelectorVisible: AlphaSelector | null = null;

  /**
   * Whether the transparent backdrop to catch clicks outside the dropdown menu
   * should be rendered.
   */
  @state() dropdownBackdropVisible = false;

  /** The single, consolidated dropdown component containing all available options */
  @query('#sort-dropdown')
  private sortOptionsDropdown!: IaDropdown;

  render() {
    return html`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <slot name="sort-options-left"></slot>
          <div id="sort-options">
            ${!this.enableSortOptionsSlot
              ? html`
                  <div class="sort-direction-container">
                    ${this.sortDirectionSelectorTemplate}
                  </div>
                  <span class="sort-by-text">${msg('Sort by:')}</span>
                  <div id="sort-selector-container">
                    ${this.sortSelectorTemplate}
                  </div>
                `
              : html`<slot name="sort-options"></slot>`}
          </div>
          <slot name="sort-options-right"></slot>

          ${this.suppressDisplayModes
            ? nothing
            : html`<div id="display-style-selector">
                ${this.displayOptionTemplate}
              </div>`}
        </section>

        ${this.dropdownBackdropVisible ? this.dropdownBackdrop : nothing}
        ${this.alphaBarTemplate}
      </div>
    `;
  }

  willUpdate(changed: PropertyValues) {
    if (changed.has('selectedSort') || changed.has('defaultSortField')) {
      // If the sort is changed from its default without a direction set,
      // we adopt the default sort direction for that sort type.
      if (
        this.selectedSort &&
        this.selectedSort !== SortField.default &&
        this.sortDirection === null
      ) {
        const sortOption = SORT_OPTIONS[this.finalizedSortField];
        this.sortDirection = sortOption.defaultSortDirection;
      }
    }
  }

  updated(changed: PropertyValues) {
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

  private setupEscapeListeners() {
    if (this.dropdownBackdropVisible) {
      document.addEventListener(
        'keydown',
        this.boundSortBarSelectorEscapeListener,
      );
    } else {
      document.removeEventListener(
        'keydown',
        this.boundSortBarSelectorEscapeListener,
      );
    }
  }

  private boundSortBarSelectorEscapeListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closeDropdowns();
    }
  };

  /**
   * Template to render the alphabet bar, or `nothing` if it should not be rendered
   * for the current sort
   */
  private get alphaBarTemplate(): TemplateResult | typeof nothing {
    if (!['title', 'creator'].includes(this.selectedSort)) return nothing;

    if (this.alphaSelectorVisible === null) {
      if (this.selectedSort === 'creator') return this.creatorSelectorBar;
      if (this.selectedSort === 'title') return this.titleSelectorBar;
    } else {
      return this.alphaSelectorVisible === 'creator'
        ? this.creatorSelectorBar
        : this.titleSelectorBar;
    }

    return nothing;
  }

  /** Template to render the sort direction toggle button */
  private get sortDirectionSelectorTemplate(): TemplateResult {
    const oppositeSortDirectionReadable =
      this.sortDirection === 'asc' ? 'descending' : 'ascending';
    const srLabel = `Change to ${oppositeSortDirectionReadable} sort`;

    return html`
      <button
        class="sort-direction-selector"
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${srLabel}</span>
        ${this.sortDirectionIcon}
      </button>
    `;
  }

  /** Template to render the sort direction button's icon in the correct current state */
  private get sortDirectionIcon(): TemplateResult {
    // Show a fully disabled icon for sort options without direction support
    if (!this.canChangeSortDirection) {
      return html`<div class="sort-direction-icon">${sortDisabledIcon}</div>`;
    }

    // For all other sorts, show the ascending/descending direction
    return html`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection === 'asc' ? sortUpIcon : sortDownIcon}
      </div>
    `;
  }

  /** The template to render all the sort options in a single dropdown */
  private get sortSelectorTemplate() {
    const displayedOptions = Object.values(SORT_OPTIONS).filter(
      opt => opt.shownInSortBar && this.sortFieldAvailability[opt.field],
    );

    return html`
      <div id="sort-dropdown-container">
        ${this.getSortDropdown({
          displayName: SORT_OPTIONS[this.finalizedSortField].displayName,
          id: 'sort-dropdown',
          selected: true,
          dropdownOptions: displayedOptions.map(opt =>
            this.getDropdownOption(opt.field),
          ),
          selectedOption: this.finalizedSortField,
          onOptionSelected: this.sortOptionSelected,
          onDropdownClick: () => {
            this.dropdownBackdropVisible = this.sortOptionsDropdown.open;
            this.sortOptionsDropdown.classList.toggle(
              'open',
              this.sortOptionsDropdown.open,
            );
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
   * @param options.onLabelInteraction A handler for click events and Enter/Space keydown events
   *  on the dropdown's label
   */
  private getSortDropdown(options: {
    displayName: string;
    id: string;
    dropdownOptions: optionInterface[];
    selectedOption?: string;
    selected: boolean;
    onOptionSelected?: (e: CustomEvent<{ option: optionInterface }>) => void;
    onDropdownClick?: (e: PointerEvent) => void;
    onLabelInteraction?: (e: Event) => void;
  }): TemplateResult {
    return html`
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
          @click=${options.onLabelInteraction ?? nothing}
          @keydown=${options.onLabelInteraction
            ? (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  options.onLabelInteraction?.(e);
                }
              }
            : nothing}
        >
          ${options.displayName}
        </span>
      </ia-dropdown>
    `;
  }

  /** Generates a single dropdown option object for the given sort field */
  private getDropdownOption(sortField: SortField): optionInterface {
    return {
      id: sortField,
      selectedHandler: () => {
        this.selectDropdownSortField(sortField);
      },
      label: html`
        <span class="dropdown-option-label">
          ${SORT_OPTIONS[sortField].displayName}
        </span>
      `,
    };
  }

  /** Handler for when a new sort dropdown option is selected */
  private sortOptionSelected(e: CustomEvent<{ option: optionInterface }>) {
    this.dropdownBackdropVisible = false;

    const sortField = e.detail.option.id as SortField;
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
  private get displayOptionTemplate() {
    return html`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${() => {
              this.displayMode = 'grid';
            }}
            class=${this.displayMode === 'grid' ? 'active' : ''}
            title="Tile view"
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
            title="List view"
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
            title="Compact list view"
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
  private get dropdownBackdrop() {
    return html`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `;
  }

  /** Closes all of the sorting dropdown components' menus */
  private closeDropdowns() {
    this.dropdownBackdropVisible = false;

    if (!this.sortOptionsDropdown) return;
    this.sortOptionsDropdown.open = false;
    this.sortOptionsDropdown.classList.remove('open');
  }

  private selectDropdownSortField(sortField: SortField) {
    // When a dropdown sort option is selected, we additionally need to clear the backdrop
    this.dropdownBackdropVisible = false;
    this.setSelectedSort(sortField);
  }

  private clearAlphaBarFilters() {
    this.alphaSelectorVisible = null;
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = null;
    this.emitTitleLetterChangedEvent();
    this.emitCreatorLetterChangedEvent();
  }

  private setSortDirection(sortDirection: SortDirection) {
    this.sortDirection = sortDirection;
    this.emitSortChangedEvent();
  }

  /** Toggles the current sort direction between 'asc' and 'desc' */
  private toggleSortDirection() {
    this.setSortDirection(
      this.finalizedSortDirection === 'desc' ? 'asc' : 'desc',
    );
  }

  private handleSortDirectionClicked(): void {
    if (
      !this.sortDirection &&
      this.defaultSortField &&
      this.defaultSortDirection
    ) {
      // When the sort direction is merely defaulted (not set by the user), clicking
      // the toggled button should "promote" the default sort to an explicitly-set one
      // and then toggle it as usual.
      this.selectedSort = this.defaultSortField;
      this.sortDirection = this.defaultSortDirection;
    }

    this.toggleSortDirection();
  }

  private setSelectedSort(sort: SortField) {
    this.selectedSort = sort;
    // Apply this field's default sort direction
    const sortOption = SORT_OPTIONS[sort];
    this.sortDirection = sortOption.defaultSortDirection;
    this.emitSortChangedEvent();
  }

  /** The current sort field, or the default one if no explicit sort is set */
  private get finalizedSortField(): SortField {
    return this.selectedSort === SortField.default
      ? this.defaultSortField
      : this.selectedSort;
  }

  /** The current sort direction, or the default one if no explicit direction is set */
  private get finalizedSortDirection(): SortDirection | null {
    return this.sortDirection === null
      ? this.defaultSortDirection
      : this.sortDirection;
  }

  /** Whether the sort direction button should be enabled for the current sort */
  private get canChangeSortDirection(): boolean {
    return SORT_OPTIONS[this.finalizedSortField].canSetDirection;
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
  private get dateOptionSelected(): boolean {
    const dateSortFields: SortField[] = [
      SortField.datefavorited,
      SortField.datearchived,
      SortField.date,
      SortField.datereviewed,
      SortField.dateadded,
    ];
    return dateSortFields.includes(this.finalizedSortField);
  }

  /**
   * There are two view sort options.
   *
   * This checks to see if the current sort is one of them.
   *
   * @readonly
   * @private
   * @type {boolean}
   * @memberof SortFilterBar
   */
  private get viewOptionSelected(): boolean {
    const viewSortFields: SortField[] = [
      SortField.alltimeview,
      SortField.weeklyview,
    ];
    return viewSortFields.includes(this.finalizedSortField);
  }

  /**
   * Array of all the views sorts that should be shown
   */
  private get availableViewsFields(): SortField[] {
    return ALL_VIEWS_SORT_FIELDS.filter(
      field => this.sortFieldAvailability[field],
    );
  }

  /**
   * Array of all the date sorts that should be shown
   */
  private get availableDateFields(): SortField[] {
    return ALL_DATE_SORT_FIELDS.filter(
      field => this.sortFieldAvailability[field],
    );
  }

  private get titleSelectorBar() {
    return html` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${this.prefixFilterCountMap?.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
  }

  private get creatorSelectorBar() {
    return html` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${this.prefixFilterCountMap?.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`;
  }

  private titleLetterChanged(
    e: CustomEvent<{ selectedLetter: string | undefined }>,
  ) {
    this.selectedTitleFilter = e.detail.selectedLetter ?? null;
    this.emitTitleLetterChangedEvent();
  }

  private creatorLetterChanged(
    e: CustomEvent<{ selectedLetter: string | undefined }>,
  ) {
    this.selectedCreatorFilter = e.detail.selectedLetter ?? null;
    this.emitCreatorLetterChangedEvent();
  }

  private emitTitleLetterChangedEvent() {
    const event = new CustomEvent<{ selectedLetter: string | null }>(
      'titleLetterChanged',
      {
        detail: { selectedLetter: this.selectedTitleFilter },
      },
    );
    this.dispatchEvent(event);
  }

  private emitCreatorLetterChangedEvent() {
    const event = new CustomEvent<{ selectedLetter: string | null }>(
      'creatorLetterChanged',
      {
        detail: { selectedLetter: this.selectedCreatorFilter },
      },
    );
    this.dispatchEvent(event);
  }

  private displayModeChanged() {
    const event = new CustomEvent<{
      displayMode?: CollectionDisplayMode;
    }>('displayModeChanged', {
      detail: { displayMode: this.displayMode },
    });
    this.dispatchEvent(event);
  }

  private emitSortChangedEvent() {
    const event = new CustomEvent<{
      selectedSort: SortField;
      sortDirection: SortDirection | null;
    }>('sortChanged', {
      detail: {
        selectedSort: this.selectedSort,
        sortDirection: this.sortDirection,
      },
    });
    this.dispatchEvent(event);
  }

  static get styles() {
    return [
      srOnlyStyle,
      css`
        #container {
          position: relative;
        }

        #sort-bar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          font-size: 1.4rem;
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
          margin: 0 5px;
        }

        .sort-direction-selector {
          padding: 0;
          border: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .sort-direction-selector:disabled {
          cursor: default;
        }

        .sort-direction-icon {
          display: flex;
          align-items: center;
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          outline: inherit;
          width: 14px;
          height: 14px;
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
          fill: #bbbbbb;
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
}
