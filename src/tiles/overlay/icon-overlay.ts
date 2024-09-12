import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TILE_OVERLAY_ICONS, TileOverlayType } from '../../models';

@customElement('icon-overlay')
export class IconOverlay extends LitElement {
  @property({ type: String }) type?: TileOverlayType;

  render() {
    return html`<div class="icon-overlay">${this.iconTemplate}</div>`;
  }

  private get iconTemplate(): TemplateResult | typeof nothing {
    if (!this.type) return nothing;
    return html`${TILE_OVERLAY_ICONS[this.type] ?? nothing}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        z-index: 2;
        background-color: rgb(255, 254, 203);
        display: flex;
        justify-content: center;
        border: 1px solid #2c2c2c;
      }

      .icon-overlay {
        height: 20px;
        width: 20px;
        padding: 2px;
        padding: 2px;
      }

      :host(.list-detail) .icon-overlay {
        height: 20px;
        width: 20px;
      }
      :host(.list-compact) .icon-overlay {
        height: 15px;
        width: 15px;
      }
    `;
  }
}
