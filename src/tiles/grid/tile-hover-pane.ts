import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { SortParam } from '@internetarchive/search-service';
import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';
import '../list/tile-list';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn: boolean = false;

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  protected render(): TemplateResult {
    return html`
      <div id="spacer"></div>
      <div id="container">
        <tile-list
          .model=${this.model}
          .baseNavigationUrl=${this.baseNavigationUrl}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .sortParam=${this.sortParam}
          .collectionNameCache=${this.collectionNameCache}
        ></tile-list>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        width: max-content;
        max-width: min(45vw, 600px);
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.8);
        background: white;
      }

      #spacer {
        height: 20px;
      }
    `;
  }
}
