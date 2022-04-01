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
      <div id="container">
        <div id="sort-bar">
          <div id="sort-selector">
            <ul>
              <li>
                <div id="sort-direction-container">
                  <button
                    class="sort-button"
                    @click=${() => {
                      this.sortDirection = 'asc';
                    }}
                  >
                    ▲
                  </button>
                  <button
                    class="sort-button"
                    @click=${() => {
                      this.sortDirection = 'desc';
                    }}
                  >
                    ▼
                  </button>
                </div>
              </li>
              <li>Sort By</li>
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.sortField = 'week';
                  }}
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
                    this.sortField = 'titleSorter';
                  }}
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
                  }}
                >
                  Date Archived
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click=${(e: Event) => {
                    e.preventDefault();
                    this.creatorSelectorVisible = !this.creatorSelectorVisible;
                    this.sortField = 'creatorSorter';
                  }}
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
                    <input type="checkbox" @click=${this.detailSelected} />
                    Details
                  </li>`
                : nothing}

              <li>
                <button id="grid-button" @click=${this.gridSelected}>
                  Grid
                </button>
              </li>
              <li>
                <button id="list-button" @click=${this.listSelected}>
                  List
                </button>
              </li>
            </ul>
          </div>
        </div>

        ${this.dateSortSelectorVisible ? this.dateSortSelector : nothing}
        ${this.titleSelectorVisible ? this.titleSelectorBar : nothing}
        ${this.creatorSelectorVisible ? this.creatorSelectorBar : nothing}

        <div id="bottom-shadow"></div>
      </div>
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
    #container {
      margin: 0 1rem 2.5rem 1rem;
    }

    #sort-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgb(232, 232, 232);
      align-items: center;
      padding: 0.1rem 0.5rem;
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
      padding: 0.5rem 0 0.5rem 0;
    }

    .sort-button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      font: inherit;
      cursor: pointer;
      outline: inherit;
    }

    #sort-direction-container {
      display: flex;
      flex-direction: column;
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
