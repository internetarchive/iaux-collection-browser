var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TILE_OVERLAY_ICONS } from '../../models';
let IconOverlay = class IconOverlay extends LitElement {
    render() {
        return html `<div class="icon-overlay">${this.iconTemplate}</div>`;
    }
    get iconTemplate() {
        if (!this.type)
            return nothing;
        return html `${TILE_OVERLAY_ICONS[this.type] ?? nothing}`;
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: String })
], IconOverlay.prototype, "type", void 0);
IconOverlay = __decorate([
    customElement('icon-overlay')
], IconOverlay);
export { IconOverlay };
