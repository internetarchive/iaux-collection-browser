import {
  LitElement,
  html,
  css,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import '@internetarchive/ia-dropdown';
import type { IaDropdown, optionInterface } from '@internetarchive/ia-dropdown';
import type { SortDirection } from '@internetarchive/search-service';
import {
  CollectionDisplayMode,
  DefaultSortDirection,
  PrefixFilterCounts,
  PrefixFilterType,
  SortField,
  SortFieldDisplayName,
} from '../models';
import './alpha-bar';

import { sortUpIcon } from './img/sort-toggle-up';
import { sortDownIcon } from './img/sort-toggle-down';
import { sortDisabledIcon } from './img/sort-toggle-disabled';
import { tileIcon } from './img/tile';
import { listIcon } from './img/list';
import { compactIcon } from './img/compact';

type AlphaSelector = 'creator' | 'title';

@customElement('sort-filter-bar')
export class SortFilterBar
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  /** Which display mode the tiles are being rendered with (grid/list-detail/list-compact) */
  @property({ type: String }) displayMode?: CollectionDisplayMode;

  /** The current sort direction (asc/desc), or null if none is set */
  @property({ type: String }) sortDirection: SortDirection | null = null;

  /** The field currently being sorted on (e.g., 'title'). Defaults to relevance. */
  @property({ type: String }) selectedSort: SortField = SortField.relevance;

  /** The currently selected title letter filter, or null if none is set */
  @property({ type: String }) selectedTitleFilter: string | null = null;

  /** The currently selected creator letter filter, or null if none is set */
  @property({ type: String }) selectedCreatorFilter: string | null = null;

  /** Whether to show the Relevance sort option (default `true`) */
  @property({ type: Boolean }) showRelevance: boolean = true;

  /** Maps of result counts for letters on the alphabet bar, for each letter filter type */
  @property({ type: Object }) prefixFilterCountMap?: Record<
    PrefixFilterType,
    PrefixFilterCounts
  >;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

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

  /**
   * The width of the desktop view sort option container, updated upon each resize.
   * Used for dynamically determining whether to use desktop or mobile view.
   */
  @state() desktopSortContainerWidth = 0;

  /**
   * The width of the full sort bar, updated upon each resize.
   * Used for dynamically determining whether to use desktop or mobile view.
   */
  @state() selectorBarContainerWidth = 0;

  /**
   * The container for all the desktop view's sort options.
   * Used for dynamically determining whether to use desktop or mobile view.
   */
  @query('#desktop-sort-container')
  private desktopSortContainer!: HTMLUListElement;

  /**
   * The container for the full sort bar.
   * Used for dynamically determining whether to use desktop or mobile view.
   */
  @query('#sort-selector-container')
  private sortSelectorContainer!: HTMLDivElement;

  /** The dropdown component containing options for weekly and all-time views */
  @query('#views-dropdown')
  private viewsDropdown!: IaDropdown;

  /** The dropdown component containing the four date options */
  @query('#date-dropdown')
  private dateDropdown!: IaDropdown;

  /** The single, consolidated dropdown component shown in mobile view */
  @query('#mobile-dropdown')
  private mobileDropdown!: IaDropdown;

  render() {
    return html`
      <div id="container">
        <div id="sort-bar">
          <div class="sort-direction-container">
            ${this.sortDirectionSelectorTemplate}
          </div>
          <span class="sort-by-text">Sort by:</span>

          <div id="sort-selector-container">
            ${this.mobileSortSelectorTemplate}
            ${this.desktopSortSelectorTemplate}
          </div>

          <div id="display-style-selector">${this.displayOptionTemplate}</div>
        </div>

        ${this.dropdownBackdropVisible ? this.dropdownBackdrop : nothing}
        ${this.alphaBarTemplate}
      </div>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.displayModeChanged();
    }

    if (changed.has('selectedSort') && this.sortDirection === null) {
      this.sortDirection = DefaultSortDirection[this.selectedSort];
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

    if (changed.has('resizeObserver')) {
      const oldObserver = changed.get(
        'resizeObserver'
      ) as SharedResizeObserverInterface;
      if (oldObserver) this.disconnectResizeObserver(oldObserver);
      this.setupResizeObserver();
    }
  }

  private setupEscapeListeners() {
    if (this.dropdownBackdropVisible) {
      document.addEventListener(
        'keydown',
        this.boundSortBarSelectorEscapeListener
      );
    } else {
      document.removeEventListener(
        'keydown',
        this.boundSortBarSelectorEscapeListener
      );
    }
  }

  private boundSortBarSelectorEscapeListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closeDropdowns();
    }
  };

  disconnectedCallback(): void {
    if (this.resizeObserver) {
      this.disconnectResizeObserver(this.resizeObserver);
    }
  }

  private disconnectResizeObserver(
    resizeObserver: SharedResizeObserverInterface
  ) {
    resizeObserver.removeObserver({
      target: this.sortSelectorContainer,
      handler: this,
    });

    resizeObserver.removeObserver({
      target: this.desktopSortContainer,
      handler: this,
    });
  }

  private setupResizeObserver() {
    if (!this.resizeObserver) return;
    this.resizeObserver.addObserver({
      target: this.sortSelectorContainer,
      handler: this,
    });

    this.resizeObserver.addObserver({
      target: this.desktopSortContainer,
      handler: this,
    });
  }

  handleResize(entry: ResizeObserverEntry): void {
    if (entry.target === this.desktopSortContainer) {
      this.desktopSortContainerWidth = entry.contentRect.width;
    } else if (entry.target === this.sortSelectorContainer) {
      this.selectorBarContainerWidth = entry.contentRect.width;
    }
  }

  /**
   * Whether to show the mobile sort bar because there is not enough space
   * for the desktop sort bar.
   */
  private get mobileSelectorVisible() {
    return this.selectorBarContainerWidth - 10 < this.desktopSortContainerWidth;
  }

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
    return html`
      <button
        class="sort-direction-selector"
        ?disabled=${this.selectedSort === 'relevance'}
        @click=${this.toggleSortDirection}
      >
        ${this.sortDirectionIcon}
      </button>
    `;
  }

  /** Template to render the sort direction button's icon in the correct current state */
  private get sortDirectionIcon(): TemplateResult {
    // For relevance sort, show a fully disabled icon
    if (this.selectedSort === 'relevance') {
      return html`<div class="sort-direction-icon">${sortDisabledIcon}</div>`;
    }

    // For all other sorts, show the ascending/descending direction
    return html`
      <div class="sort-direction-icon">
        ${this.sortDirection === 'asc' ? sortUpIcon : sortDownIcon}
      </div>
    `;
  }

  /** The template to render all the sort options in desktop view */
  private get desktopSortSelectorTemplate() {
    return html`
      <div
        id="desktop-sort-container"
        class=${this.mobileSelectorVisible ? 'hidden' : 'visible'}
      >
        <ul id="desktop-sort-selector">
          <li>
            ${this.showRelevance
              ? this.getSortDisplayOption(SortField.relevance, {
                  onClick: () => {
                    this.dropdownBackdropVisible = false;
                    if (this.selectedSort !== SortField.relevance) {
                      this.clearAlphaBarFilters();
                      this.setSelectedSort(SortField.relevance);
                    }
                  },
                })
              : nothing}
          </li>
          <li>${this.viewsDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption(SortField.title, {
              onClick: () => {
                this.dropdownBackdropVisible = false;
                if (this.selectedSort !== SortField.title) {
                  this.alphaSelectorVisible = 'title';
                  this.selectedCreatorFilter = null;
                  this.setSelectedSort(SortField.title);
                  this.emitCreatorLetterChangedEvent();
                }
              },
            })}
          </li>
          <li>${this.dateDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption(SortField.creator, {
              onClick: () => {
                this.dropdownBackdropVisible = false;
                if (this.selectedSort !== SortField.creator) {
                  this.alphaSelectorVisible = 'creator';
                  this.selectedTitleFilter = null;
                  this.setSelectedSort(SortField.creator);
                  this.emitTitleLetterChangedEvent();
                }
              },
            })}
          </li>
        </ul>
      </div>
    `;
  }

  /** The template to render all the sort options in mobile view */
  private get mobileSortSelectorTemplate() {
    return html`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible ? 'visible' : 'hidden'}
      >
        ${this.getSortDropdown({
          displayName: html`${SortFieldDisplayName[this.selectedSort] ?? ''}`,
          id: 'mobile-dropdown',
          selected: true,
          dropdownOptions: Object.keys(SortField).map(field =>
            this.getDropdownOption(field as SortField)
          ),
          selectedOption: this.selectedSort ?? SortField.relevance,
          onOptionSelected: this.mobileSortChanged,
          onDropdownClick: () => {
            this.dropdownBackdropVisible = this.mobileDropdown.open;
            this.mobileDropdown.classList.toggle(
              'open',
              this.mobileDropdown.open
            );
          },
        })}
      </div>
    `;
  }

  /**
   * This generates each of the non-dropdown sort option links.
   *
   * It manages the display value and the selected state of the option.
   *
   * @param sortField
   * @param options {
   *    onClick?: (e: Event) => void; If this is provided, it will also be called when the option is clicked.
   *    displayName?: TemplateResult; The name to display for the option. Defaults to the sortField display name.
   *    selected?: boolean; true if the option is selected. Defaults to the selectedSort === sortField.
   * }
   * @returns
   */
  private getSortDisplayOption(
    sortField: SortField,
    options?: {
      displayName?: TemplateResult;
      selected?: boolean;
      onClick?: (e: Event) => void;
    }
  ): TemplateResult {
    const isSelected = options?.selected ?? this.selectedSort === sortField;
    const displayName = options?.displayName ?? SortFieldDisplayName[sortField];
    return html`
      <button
        class=${isSelected ? 'selected' : nothing}
        @click=${(e: Event) => {
          e.preventDefault();
          options?.onClick?.(e);
        }}
      >
        ${displayName}
      </button>
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
    displayName: TemplateResult;
    id?: string;
    dropdownOptions: optionInterface[];
    selectedOption?: string;
    selected: boolean;
    onOptionSelected?: (e: CustomEvent<{ option: optionInterface }>) => void;
    onDropdownClick?: (e: PointerEvent) => void;
    onLabelInteraction?: (e: Event) => void;
  }): TemplateResult {
    return html`
      <ia-dropdown
        id=${options.id ?? nothing}
        class=${options.selected ? 'selected' : nothing}
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
          ${SortFieldDisplayName[sortField]}
        </span>
      `,
    };
  }

  /** Handler for when any sort dropdown option is selected */
  private dropdownOptionSelected(e: CustomEvent<{ option: optionInterface }>) {
    this.dropdownBackdropVisible = false;
    this.clearAlphaBarFilters();
    this.setSelectedSort(e.detail.option.id as SortField);
  }

  /** The template to render for the views dropdown */
  private get viewsDropdownTemplate(): TemplateResult {
    return this.getSortDropdown({
      displayName: html`${this.viewSortField}`,
      id: 'views-dropdown',
      selected: this.viewOptionSelected,
      dropdownOptions: [
        this.getDropdownOption(SortField.weeklyview),
        this.getDropdownOption(SortField.alltimeview),
      ],
      selectedOption: this.viewOptionSelected ? this.selectedSort : '',
      onOptionSelected: this.dropdownOptionSelected,
      onDropdownClick: () => {
        this.dateDropdown.open = false;
        this.dropdownBackdropVisible = this.viewsDropdown.open;
        this.viewsDropdown.classList.toggle('open', this.viewsDropdown.open);
      },
      onLabelInteraction: (e: Event) => {
        if (!this.viewsDropdown.open && !this.viewOptionSelected) {
          e.stopPropagation();
          this.clearAlphaBarFilters();
          this.setSelectedSort(SortField.weeklyview);
        }
      },
    });
  }

  /** The template to render for the date dropdown */
  private get dateDropdownTemplate(): TemplateResult {
    return this.getSortDropdown({
      displayName: html`${this.dateSortField}`,
      id: 'date-dropdown',
      selected: this.dateOptionSelected,
      dropdownOptions: [
        this.getDropdownOption(SortField.date),
        this.getDropdownOption(SortField.datearchived),
        this.getDropdownOption(SortField.datereviewed),
        this.getDropdownOption(SortField.dateadded),
      ],
      selectedOption: this.dateOptionSelected ? this.selectedSort : '',
      onOptionSelected: this.dropdownOptionSelected,
      onDropdownClick: () => {
        this.viewsDropdown.open = false;
        this.dropdownBackdropVisible = this.dateDropdown.open;
        this.dateDropdown.classList.toggle('open', this.dateDropdown.open);
      },
      onLabelInteraction: (e: Event) => {
        if (!this.dateDropdown.open && !this.dateOptionSelected) {
          e.stopPropagation();
          this.clearAlphaBarFilters();
          this.setSelectedSort(SortField.date);
        }
      },
    });
  }

  /** Handler for when a new mobile sort dropdown option is selected */
  private mobileSortChanged(e: CustomEvent<{ option: optionInterface }>) {
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
    const allDropdowns = [
      this.viewsDropdown,
      this.dateDropdown,
      this.mobileDropdown,
    ];
    for (const dropdown of allDropdowns) {
      dropdown.open = false;
      dropdown.classList.remove('open');
    }
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
    this.setSortDirection(this.sortDirection === 'desc' ? 'asc' : 'desc');
  }

  private setSelectedSort(sort: SortField) {
    this.selectedSort = sort;
    // Apply this field's default sort direction
    this.sortDirection = DefaultSortDirection[this.selectedSort];
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
  private get dateOptionSelected(): boolean {
    const dateSortFields: SortField[] = [
      SortField.datearchived,
      SortField.date,
      SortField.datereviewed,
      SortField.dateadded,
    ];
    return dateSortFields.includes(this.selectedSort);
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
    return viewSortFields.includes(this.selectedSort);
  }

  /**
   * The display name of the current date field
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof SortFilterBar
   */
  private get dateSortField(): string {
    const defaultSort = SortFieldDisplayName[SortField.date];
    const name = this.dateOptionSelected
      ? SortFieldDisplayName[this.selectedSort] ?? defaultSort
      : defaultSort;
    return name;
  }

  /**
   * The display name of the current view field
   *
   * @readonly
   * @private
   * @type {string}
   * @memberof SortFilterBar
   */
  private get viewSortField(): string {
    const defaultSort = SortFieldDisplayName[SortField.weeklyview];
    const name = this.viewOptionSelected
      ? SortFieldDisplayName[this.selectedSort] ?? defaultSort
      : defaultSort;
    return name;
  }

  private get titleSelectorBar() {
    return html` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${this.prefixFilterCountMap?.title}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
  }

  private get creatorSelectorBar() {
    return html` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${this.prefixFilterCountMap?.creator}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`;
  }

  private titleLetterChanged(
    e: CustomEvent<{ selectedLetter: string | undefined }>
  ) {
    this.selectedTitleFilter = e.detail.selectedLetter ?? null;
    this.emitTitleLetterChangedEvent();
  }

  private creatorLetterChanged(
    e: CustomEvent<{ selectedLetter: string | undefined }>
  ) {
    this.selectedCreatorFilter = e.detail.selectedLetter ?? null;
    this.emitCreatorLetterChangedEvent();
  }

  private emitTitleLetterChangedEvent() {
    const event = new CustomEvent<{ selectedLetter: string | null }>(
      'titleLetterChanged',
      {
        detail: { selectedLetter: this.selectedTitleFilter },
      }
    );
    this.dispatchEvent(event);
  }

  private emitCreatorLetterChangedEvent() {
    const event = new CustomEvent<{ selectedLetter: string | null }>(
      'creatorLetterChanged',
      {
        detail: { selectedLetter: this.selectedCreatorFilter },
      }
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

  static styles = css`
    #container {
      position: relative;
    }

    #sort-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #2c2c2c;
      font-size: 1.4rem;
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

    #date-sort-selector,
    #view-sort-selector {
      position: absolute;
      left: 150px;
      top: 45px;

      z-index: 1;
      padding: 1rem;
      background-color: white;
      border-radius: 2.5rem;
      border: 1px solid #404142;
    }

    #sort-selector-container {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    #desktop-sort-container,
    #mobile-sort-container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }

    /*
      we move the desktop sort selector offscreen instead of display: none
      because we need to observe the width of it vs its container to determine
      if it's wide enough to display the desktop version and if you display: none,
      the width becomes 0
    */
    #desktop-sort-container.hidden {
      position: absolute;
      top: -9999px;
      left: -9999px;
      visibility: hidden;
    }

    #mobile-sort-container.hidden {
      display: none;
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

    #desktop-sort-selector {
      display: inline-flex;
    }

    #desktop-sort-selector li {
      display: flex;
      align-items: center;
      padding-left: 5px;
      padding-right: 5px;
    }

    #desktop-sort-selector li a {
      padding: 0 5px;
      text-decoration: none;
      color: #333;
      line-height: 2;
    }

    #desktop-sort-selector li button {
      padding: 0px 5px;
      border: none;
      background: none;
      font-size: inherit;
      color: #333;
      line-height: 2;
      cursor: pointer;
      appearance: none;
    }

    #desktop-sort-selector li button.selected {
      font-weight: bold;
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
      line-height: 2;
      color: var(--ia-theme-primary-text-color, #2c2c2c);
      white-space: nowrap;
      user-select: none;
    }
  `;
}
