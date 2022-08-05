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
import {
  CollectionDisplayMode,
  SortField,
  SortFieldDisplayName,
} from '../models';
import './alpha-bar';

import { sortIcon } from './img/sort-triangle';
import { tileIcon } from './img/tile';
import { listIcon } from './img/list';
import { compactIcon } from './img/compact';

type AlphaSelector = 'creator' | 'title';

@customElement('sort-filter-bar')
export class SortFilterBar
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: String }) sortDirection: 'asc' | 'desc' | null = null;

  @property({ type: String }) selectedSort: SortField = SortField.relevance;

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: Boolean }) showRelevance: boolean = true;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @state() alphaSelectorVisible: AlphaSelector | null = null;

  @state() dateSortSelectorVisible = false;

  @state() viewSortSelectorVisible = false;

  @state() desktopSelectorBarWidth = 0;

  @state() selectorBarContainerWidth = 0;

  @state() hoveringOverDateSortOptions = false;

  @query('#desktop-sort-selector')
  private desktopSortSelector!: HTMLUListElement;

  @query('#sort-selector-container')
  private sortSelectorContainer!: HTMLDivElement;

  render() {
    return html`
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

        ${this.viewSortSelectorVisible && !this.mobileSelectorVisible
          ? this.viewSortSelector
          : nothing}
        ${this.dateSortSelectorVisible && !this.mobileSelectorVisible
          ? this.dateSortSelector
          : nothing}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `;
  }

  updated(changed: PropertyValues) {
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

    if (
      changed.has('dateSortSelectorVisible') ||
      changed.has('viewSortSelectorVisible')
    ) {
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
    if (this.dateSortSelectorVisible || this.viewSortSelectorVisible) {
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
      this.viewSortSelectorVisible = false;
      this.dateSortSelectorVisible = false;
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
      target: this.desktopSortSelector,
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
      target: this.desktopSortSelector,
      handler: this,
    });
  }

  private get mobileSelectorVisible() {
    return this.selectorBarContainerWidth - 10 < this.desktopSelectorBarWidth;
  }

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

  handleResize(entry: ResizeObserverEntry): void {
    if (entry.target === this.desktopSortSelector) {
      this.desktopSelectorBarWidth = entry.contentRect.width;
    } else if (entry.target === this.sortSelectorContainer) {
      this.selectorBarContainerWidth = entry.contentRect.width;
    }
  }

  private get sortDirectionSelectorTemplate() {
    return html`
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

  private get desktopSortSelectorTemplate() {
    return html`
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
        <li>
          ${this.getSortDisplayOption(SortField.weeklyview, {
            clickEvent: () => {
              if (!this.viewOptionSelected)
                this.setSelectedSort(SortField.weeklyview);
              this.viewSortSelectorVisible = !this.viewSortSelectorVisible;
              this.dateSortSelectorVisible = false;
              this.alphaSelectorVisible = null;
              this.selectedTitleFilter = null;
              this.selectedCreatorFilter = null;
              this.emitTitleLetterChangedEvent();
              this.emitCreatorLetterChangedEvent();
            },
            displayName: html`${this.viewSortField}`,
            isSelected: () => this.viewOptionSelected,
          })}
        </li>
        <li>
          ${this.getSortDisplayOption(SortField.title, {
            clickEvent: () => {
              this.alphaSelectorVisible = 'title';
              this.selectedCreatorFilter = null;
              this.dateSortSelectorVisible = false;
              this.viewSortSelectorVisible = false;
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
              this.viewSortSelectorVisible = false;
              this.alphaSelectorVisible = null;
              this.selectedTitleFilter = null;
              this.selectedCreatorFilter = null;
              this.emitTitleLetterChangedEvent();
              this.emitCreatorLetterChangedEvent();
            },
            displayName: html`${this.dateSortField}`,
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
  private getSortDisplayOption(
    sortField: SortField,
    options?: {
      clickEvent?: (e: Event) => void;
      isSelected?: () => boolean;
      displayName?: TemplateResult;
    }
  ): TemplateResult {
    const isSelected =
      options?.isSelected ?? (() => this.selectedSort === sortField);
    const displayName = options?.displayName ?? SortFieldDisplayName[sortField];
    return html`
      <a
        href="#"
        @click=${(e: Event) => {
          e.preventDefault();
          if (options?.clickEvent) {
            options.clickEvent(e);
          } else {
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

  private get mobileSortSelectorTemplate() {
    return html`
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible ? 'visible' : 'hidden'}
      >
        ${Object.keys(SortField).map(
          field => html`
            <option value="${field}" ?selected=${this.selectedSort === field}>
              ${SortFieldDisplayName[field as SortField]}
            </option>
          `
        )}
      </select>
    `;
  }

  private mobileSortChanged(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.setSelectedSort(target.value as SortField);
  }

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

  private get dateSortSelector() {
    return html`
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

  private get viewSortSelector() {
    return html`
      <div
        id="view-sort-selector-backdrop"
        @keyup=${() => {
          this.viewSortSelectorVisible = false;
        }}
        @click=${() => {
          this.viewSortSelectorVisible = false;
        }}
      ></div>
      <div id="view-sort-selector">
        <ul>
          <li>${this.getDateSortButton(SortField.alltimeview)}</li>
          <li>${this.getDateSortButton(SortField.weeklyview)}</li>
        </ul>
      </div>
    `;
  }

  private getDateSortButton(sortField: SortField) {
    return html`
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

  private selectDateSort(sortField: SortField) {
    this.dateSortSelectorVisible = false;
    this.viewSortSelectorVisible = false;
    this.setSelectedSort(sortField);
  }

  private setSortDirections(sortDirection: 'asc' | 'desc') {
    this.sortDirection = sortDirection;
    this.emitSortChangedEvent();
  }

  private setSelectedSort(sort: SortField) {
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
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
  }

  private get creatorSelectorBar() {
    return html` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
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
    const event = new CustomEvent('displayModeChanged', {
      detail: { displayMode: this.displayMode },
    });
    this.dispatchEvent(event);
  }

  private emitSortChangedEvent() {
    const event = new CustomEvent<{
      selectedSort: SortField;
      sortDirection: 'asc' | 'desc' | null;
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

    #date-sort-selector button,
    #view-sort-selector button {
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

    #date-sort-selector button.selected,
    #view-sort-selector button.selected {
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

    #date-sort-selector-backdrop,
    #view-sort-selector-backdrop {
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
}
