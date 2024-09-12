import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  TILE_OVERLAY_ICONS,
  TILE_OVERLAY_TEXT,
  TileOverlayType,
} from '../../models';

@customElement('text-overlay')
export class TextOverlay extends LitElement {
  @property({ type: String }) type?: TileOverlayType;

  render() {
    return html`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `;
  }

  private get iconTemplate(): TemplateResult | typeof nothing {
    if (!this.type) return nothing;
    return html`${TILE_OVERLAY_ICONS[this.type] ?? nothing}`;
  }

  private get textTemplate(): TemplateResult | typeof nothing {
    if (!this.type) return nothing;
    return html`${TILE_OVERLAY_TEXT[this.type] ?? nothing}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        align-items: center;
        display: flex;
      }

      .overlay {
        border: 1px solid #2c2c2c;
        border-radius: 1px;
        position: absolute;
        right: 0;
        left: 0;
        top: 50%;
        transform: translate(0px, -50%);
        width: auto;
        height: auto;
        padding: 5px;
        background-color: #fffecb;
        display: flex;
        align-items: center;
        border-radius: 1px;
      }

      .icon-overlay {
        width: 40px;
        height: 40px;
        display: inherit;
      }
      .text-overlay {
        margin: 0;
        vertical-align: bottom;
        padding-left: 5px;
        text-align: center;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `;
  }
}
