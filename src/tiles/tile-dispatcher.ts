import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { CollectionDisplayMode } from '../collection-browser';
import { TileModel } from '../models';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './list/tile-list-detail';
import './list/tile-list-compact';

@customElement('tile-dispatcher')
export class TileDispatcher extends LitElement {
  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Boolean }) showDeleteButton = false;

  render() {
    return html`
      ${this.showDeleteButton
        ? html`<button id="delete-button">X</button>`
        : nothing}
      <a
        href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
        title=${ifDefined(this.model?.title)}
      >
        ${this.tile}
      </a>
    `;
  }

  private get tile() {
    const { model } = this;
    if (!model) return nothing;

    switch (this.displayMode) {
      case 'grid':
        switch (model.mediatype) {
          case 'collection':
            return html`<collection-tile .model=${model}></collection-tile>`;
          case 'item':
            return html`<item-tile .model=${model}></item-tile>`;
          case 'account':
            return html`<account-tile .model=${model}></account-tile>`;
          default:
            return nothing;
        }
      case 'list-compact':
        return html`<tile-list-compact .model=${model}></tile-list-compact>`;
      case 'list-detail':
        return html`<tile-list-detail .model=${model}></tile-list-detail>`;
      default:
        return nothing;
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }

      #delete-button {
        float: right;
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
      }

      a :first-child {
        display: block;
        height: 100%;
      }
    `;
  }
}
