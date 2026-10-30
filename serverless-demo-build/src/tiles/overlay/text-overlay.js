var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { localized } from '@lit/localize';
import { customElement, property } from 'lit/decorators.js';
import { TILE_OVERLAY_ICONS, TILE_OVERLAY_TEXT, } from '../../models';
let TextOverlay = class TextOverlay extends LitElement {
    render() {
        return html `
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `;
    }
    get iconTemplate() {
        if (!this.type)
            return nothing;
        return html `${TILE_OVERLAY_ICONS[this.type] ?? nothing}`;
    }
    get textTemplate() {
        if (!this.type)
            return nothing;
        return html `${TILE_OVERLAY_TEXT[this.type] ?? nothing}`;
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: String })
], TextOverlay.prototype, "type", void 0);
TextOverlay = __decorate([
    customElement('text-overlay'),
    localized()
], TextOverlay);
export { TextOverlay };
