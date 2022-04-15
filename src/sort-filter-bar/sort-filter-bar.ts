import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CollectionDisplayMode, SortField } from '../models';
import './alpha-bar';

import { sortIcon } from './img/sort-triangle';
import { gridIcon } from './img/grid';
import { listIcon } from './img/list';

enum SortFieldName {
  datearchived = 'Date Archived',
  datepublished = 'Date Published',
  datereviewed = 'Date Reviewed',
  dateadded = 'Date Added',
}

@customElement('sort-filter-bar')
export class SortFilterBar extends LitElement {
  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: String }) sortDirection: 'asc' | 'desc' | null = null;

  @property({ type: String }) selectedSort: SortField = 'relevance';

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: Boolean }) showRelevance: boolean = true;

  @state() titleSelectorVisible: boolean = false;

  @state() creatorSelectorVisible: boolean = false;

  @state() dateSortSelectorVisible = false;

  render() {
    return html`
      <div id="container">
        ${this.titleSelectorVisible || this.selectedSort === 'title'
          ? this.titleSelectorBar
          : nothing}
        ${this.creatorSelectorVisible || this.selectedSort === 'creator'
          ? this.creatorSelectorBar
          : nothing}

        <div id="sort-bar">
          <div id="sort-selector">
            <ul>
              <li>
                <div id="sort-direction-container">
                  <button
                    id="sort-ascending-btn"
                    class="sort-button ${this.sortDirection === 'asc'
                      ? 'selected'
                      : ''}"
                    @click=${() => {
                      this.sortDirection = 'asc';
                    }}
                  >
                    ${sortIcon}
                  </button>
                  <button
                    id="sort-descending-btn"
                    class="sort-button ${this.sortDirection === 'desc'
                      ? 'selected'
                      : ''}"
                    @click=${() => {
                      this.sortDirection = 'desc';
                    }}
                  >
                    ${sortIcon}
                  </button>
                </div>
              </li>
              <li id="sort-by-text">Sort By</li>
              ${this.showRelevance
                ? html`
                    <li>
                      <a
                        href="#"
                        @click=${(e: Event) => {
                          e.preventDefault();
                          this.selectedSort = 'relevance';
                        }}
                        class=${this.selectedSort === 'relevance'
                          ? 'selected'
                          : ''}
                      >
                        Relevance
                      </a>
                    </li>
                  `
                : nothing}
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.selectedSort = 'views';
                  }}
                  class=${this.selectedSort === 'views' ? 'selected' : ''}
                >
                  Views
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.titleSelectorVisible = !this.titleSelectorVisible;
                    this.selectedSort = 'title';
                  }}
                  class=${this.selectedSort === 'title' ? 'selected' : ''}
                >
                  Title
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.dateSortSelectorVisible =
                      !this.dateSortSelectorVisible;
                    this.selectedSort = 'datearchived';
                  }}
                  class=${this.dateOptionSelected ? 'selected' : ''}
                >
                  ${this.dateSortField}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.creatorSelectorVisible = !this.creatorSelectorVisible;
                    this.selectedSort = 'creator';
                  }}
                  class=${this.selectedSort === 'creator' ? 'selected' : ''}
                >
                  Creator
                </a>
              </li>
            </ul>
          </div>

          <div id="display-style">
            <ul>
              ${this.displayMode !== 'grid'
                ? html`<li>
                    <label id="show-details">
                      <input type="checkbox" @click=${this.detailSelected} />
                      Show Details
                    </label>
                  </li>`
                : nothing}

              <li>
                <button
                  id="grid-button"
                  @click=${this.gridSelected}
                  class=${this.displayMode === 'grid' ? 'active' : ''}
                >
                  ${gridIcon}
                </button>
              </li>
              <li>
                <button
                  id="list-button"
                  @click=${this.listSelected}
                  class=${this.displayMode !== 'grid' ? 'active' : ''}
                >
                  ${listIcon}
                </button>
              </li>
            </ul>
          </div>
        </div>

        ${this.dateSortSelectorVisible ? this.dateSortSelector : nothing}

        <div id="bottom-shadow"></div>
      </div>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.displayModeChanged();
    }

    if (
      (changed.has('sortDirection') || changed.has('selectedSort')) &&
      this.sortDirection !== null
    ) {
      this.sortChanged();
    }

    if (changed.has('selectedSort') && this.sortDirection === null) {
      this.sortDirection = 'desc';
    }

    if (changed.has('selectedTitleFilter') && this.selectedTitleFilter) {
      this.titleSelectorVisible = true;
    }

    if (changed.has('selectedCreatorFilter') && this.selectedCreatorFilter) {
      this.creatorSelectorVisible = true;
    }
  }

  private get dateSortSelector() {
    return html`
      <div id="date-sort-selector">
        <ul>
          <li>
            <button
              @click=${() => {
                this.selectedSort = 'datepublished';
                this.dateSortSelectorVisible = false;
              }}
            >
              Date Archived
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.selectedSort = 'datepublished';
                this.dateSortSelectorVisible = false;
              }}
            >
              Date Published
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.selectedSort = 'datereviewed';
                this.dateSortSelectorVisible = false;
              }}
            >
              Date Reviewed
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.selectedSort = 'dateadded';
                this.dateSortSelectorVisible = false;
              }}
            >
              Date Added
            </button>
          </li>
        </ul>
      </div>
    `;
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
    return [
      'datearchived',
      'datepublished',
      'datereviewed',
      'dateadded',
    ].includes(this.selectedSort);
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
    return (
      SortFieldName[this.selectedSort as keyof typeof SortFieldName] ??
      'Date Archived'
    );
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
    const event = new CustomEvent('titleLetterChanged', {
      detail: { selectedLetter: e.detail.selectedLetter },
    });
    this.dispatchEvent(event);
  }

  private creatorLetterChanged(
    e: CustomEvent<{ selectedLetter: string | undefined }>
  ) {
    const event = new CustomEvent('creatorLetterChanged', {
      detail: { selectedLetter: e.detail.selectedLetter },
    });
    this.dispatchEvent(event);
  }

  private gridSelected() {
    this.displayMode = 'grid';
  }

  private listSelected() {
    this.displayMode = 'list-compact';
  }

  private detailSelected(e: Event) {
    this.displayMode = (e.target as HTMLInputElement).checked
      ? 'list-detail'
      : 'list-compact';
  }

  private displayModeChanged() {
    const event = new CustomEvent('displayModeChanged', {
      detail: { displayMode: this.displayMode },
    });
    this.dispatchEvent(event);
  }

  private sortChanged() {
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
    #sort-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgb(232, 232, 232);
      align-items: center;
      padding: 0.5rem 1.5rem;
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

    #show-details {
      text-transform: uppercase;
      cursor: pointer;
    }

    #sort-descending-btn {
      transform: rotate(180deg);
    }

    #sort-direction-container {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    #sort-selector li {
      display: flex;
      align-items: center;
    }

    #sort-selector li a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 1.4rem;
      color: #333;
    }

    #sort-selector li a.selected {
      font-weight: bold;
    }

    #sort-selector li::after {
      content: '•';
      padding-left: 1rem;
      padding-right: 1rem;
    }

    #sort-selector li:first-child::after {
      content: '';
    }

    #sort-selector li:last-child::after {
      content: '';
    }

    #display-style button {
      background: none;
      color: inherit;
      border: none;
      appearance: none;
      cursor: pointer;
      -webkit-appearance: none;
      opacity: 0.5;
    }

    #display-style button.active {
      opacity: 1;
    }

    #display-style button svg {
      width: 24px;
      height: 24px;
    }
  `;
}
