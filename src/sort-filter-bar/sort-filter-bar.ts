import { SortParam } from '@internetarchive/search-service';
import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CollectionDisplayMode } from '../models';
import './alpha-bar';

@customElement('sort-filter-bar')
export class SortFilterBar extends LitElement {
  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: String }) sortDirection: 'asc' | 'desc' = 'desc';

  @property({ type: String }) sortField = 'week';

  @state() titleSelectorVisible: boolean = false;

  @state() creatorSelectorVisible: boolean = false;

  @state() dateSortSelectorVisible = false;

  render() {
    return html`
      <div id="sort-bar">
        <div id="sort-selector">
          <ul>
            <li>
              <button
                @click=${() => {
                  this.sortDirection = 'desc';
                }}
              >
                Desc
              </button>
              <button
                @click=${() => {
                  this.sortDirection = 'asc';
                }}
              >
                Asc</button
              >Sort By
            </li>
            <li>
              <button
                @click=${() => {
                  this.sortField = 'week';
                }}
              >
                Views
              </button>
            </li>
            <li>
              <button
                @click=${() => {
                  this.titleSelectorVisible = !this.titleSelectorVisible;
                  this.sortField = 'titleSorter';
                }}
              >
                Title
              </button>
            </li>
            <li>
              <button
                @click=${() => {
                  this.dateSortSelectorVisible = !this.dateSortSelectorVisible;
                }}
              >
                Date Archived
              </button>
            </li>
            <li>
              <button
                @click=${() => {
                  this.creatorSelectorVisible = !this.creatorSelectorVisible;
                  this.sortField = 'creatorSorter';
                }}
              >
                Creator
              </button>
            </li>
          </ul>
        </div>

        <div id="display-style">
          <ul>
            ${this.displayMode !== 'grid'
              ? html`<li>
                  <input type="checkbox" @click=${this.detailSelected} />
                  Details
                </li>`
              : nothing}

            <li>
              <button id="grid-button" @click=${this.gridSelected}>Grid</button>
            </li>
            <li>
              <button id="list-button" @click=${this.listSelected}>List</button>
            </li>
          </ul>
        </div>
      </div>

      ${this.dateSortSelectorVisible ? this.dateSortSelector : nothing}
      ${this.titleSelectorVisible ? this.titleSelectorBar : nothing}
      ${this.creatorSelectorVisible ? this.creatorSelectorBar : nothing}
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.displayModeChanged();
    }

    if (changed.has('sortDirection') || changed.has('sortField')) {
      this.sortChanged();
    }
  }

  private get dateSortSelector() {
    return html`
      <div id="date-sort-selector">
        <ul>
          <li>
            <button
              @click=${() => {
                this.sortField = 'publicdate';
              }}
            >
              Date Archived
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.sortField = 'date';
              }}
            >
              Date Published
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.sortField = 'reviewdate';
              }}
            >
              Date Reviewed
            </button>
          </li>
          <li>
            <button
              @click=${() => {
                this.sortField = 'addeddate';
              }}
            >
              Date Added
            </button>
          </li>
        </ul>
      </div>
    `;
  }

  private get titleSelectorBar() {
    return html` <alpha-bar
      headline="Title Starts With"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
  }

  private get creatorSelectorBar() {
    return html` <alpha-bar
      headline="Creator Starts With"
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
    const sort = new SortParam(this.sortField, this.sortDirection);
    const event = new CustomEvent('sortChanged', {
      detail: { sort },
    });
    this.dispatchEvent(event);
  }

  static styles = css`
    #sort-bar {
      display: flex;
      justify-content: space-between;
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
    }

    li {
      padding: 0.5rem 0 0.5rem 0;
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
  `;
}
