import { LitElement, html, css, nothing, PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { CollectionDisplayMode } from '../models';
import './alpha-bar';

@customElement('sort-filter-bar')
export class SortFilterBar extends LitElement {
  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: String }) sortDirection: 'asc' | 'desc' = 'desc';

  render() {
    return html`
      <alpha-bar></alpha-bar>

      <div id="sort-bar">
        <div id="sort-selector">
          <ul>
            <li>
              <button @click=${this.sortDescSelected}>Desc</button>
              <button @click=${this.sortAscSelected}>Asc</button>Sort By
            </li>
            <li>Views</li>
            <li>Title</li>
            <li>Date Archived</li>
            <li>Creator</li>
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
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.displayModeChanged();
    }

    if (changed.has('sortDirection')) {
      this.sortChanged();
    }
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
    :host {
      color: white;
    }

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
