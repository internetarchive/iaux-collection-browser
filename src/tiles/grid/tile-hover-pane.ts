import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn: boolean = false;

  protected render(): TemplateResult {
    return html`
      <div class="container">
        <tile-list
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        ></tile-list>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .container {
        max-width: 50vw;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 black;
      }
    `;
  }
}
