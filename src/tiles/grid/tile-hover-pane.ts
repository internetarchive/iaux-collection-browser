import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn?: boolean;

  protected render(): TemplateResult {
    return html`
      <div class="container">
        ${this.imageTemplate} ${this.itemDetailsTemplate}
      </div>
    `;
  }

  private get imageTemplate(): TemplateResult {
    return html`
      <div class="image-container">
        <image-block
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isCompactTile=${false}
          .isListTile=${true}
          .viewSize=${'desktop'}
          .loggedIn=${this.loggedIn}
        ></image-block>
      </div>
    `;
  }

  private get itemDetailsTemplate(): TemplateResult {
    return html` <div class="item-details"></div> `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .container {
        display: flex;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 black;
      }

      .image-container {
        flex-grow: 0;
      }

      .item-details {
        flex-grow: 1;
      }
    `;
  }
}
