import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { CollectionDisplayMode } from '../models';
import './alpha-bar';

@customElement('sort-filter-bar')
export class SortFilterBar extends LitElement {
  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: String }) sortDirection: 'asc' | 'desc' = 'desc';

  @state() titleSelectorVisible: boolean = false;

  @state() creatorSelectorVisible: boolean = false;

  render() {
    return html`
      <div id="sort-bar">
        <div id="sort-selector">
          <ul>
            <li>
              <button @click=${this.sortDescSelected}>Desc</button>
              <button @click=${this.sortAscSelected}>Asc</button>Sort By
            </li>
            <li>Views</li>
            <li>
              <button
                @click=${() => {
                  this.titleSelectorVisible = !this.titleSelectorVisible;
                }}
              >
                Title
              </button>
            </li>
            <li>Date Archived</li>
            <li>
              <button
                @click=${() => {
                  this.creatorSelectorVisible = !this.creatorSelectorVisible;
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

      ${this.titleSelectorVisible ? this.titleSelectorBar : nothing}
      ${this.creatorSelectorVisible ? this.creatorSelectorBar : nothing}
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.displayModeChanged();
    }

    if (changed.has('sortDirection')) {
      this.sortChanged();
    }

    if (changed.has('titleSelectorVisible')) {
      this.titleSelectorVisibleChanged();
    }

    if (changed.has('creatorSelectorVisible')) {
      this.creatorSelectorVisibleChanged();
    }
  }

  private titleSelectorVisibleChanged() {
    const event = new CustomEvent('titleSelectorVisibilityChanged', {
      detail: { visible: this.titleSelectorVisible },
    });
    this.dispatchEvent(event);
  }

  private creatorSelectorVisibleChanged() {
    const event = new CustomEvent('creatorSelectorVisibilityChanged', {
      detail: { visible: this.creatorSelectorVisible },
    });
    this.dispatchEvent(event);
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

  private sortDescSelected() {
    this.sortDirection = 'desc';
  }

  private sortAscSelected() {
    this.sortDirection = 'asc';
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
    const event = new CustomEvent('sortDirectionChanged', {
      detail: { direction: this.sortDirection },
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
