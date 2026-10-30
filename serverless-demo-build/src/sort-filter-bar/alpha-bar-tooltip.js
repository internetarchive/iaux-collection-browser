var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { getLocale } from '../utils/get-locale';
let AlphaBarTooltip = class AlphaBarTooltip extends LitElement {
    constructor() {
        super(...arguments);
        this.numResults = 0;
    }
    render() {
        const formattedCount = new Intl.NumberFormat(getLocale()).format(this.numResults);
        return html `
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults === 1
            ? msg(str `${formattedCount} result`)
            : msg(str `${formattedCount} results`)}
        </div>
      </div>
    `;
    }
    static get styles() {
        const arrowSize = css `var(--tooltipArrowSize, 5px)`;
        const arrowOffset = css `var(--tooltipArrowOffset, 0px)`;
        return css `
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${arrowOffset});
        top: 0;
        width: 0;
        height: 0;
        margin-top: calc(-1 * ${arrowSize});
        margin-left: calc(-1 * ${arrowSize});
        border: ${arrowSize} solid transparent;
        border-bottom-color: black;
      }

      #tooltip-text {
        padding: 3px 8px;
        border-radius: 4px;
        background-color: #000;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        text-decoration: none;
      }
    `;
    }
};
__decorate([
    property({ type: Number })
], AlphaBarTooltip.prototype, "numResults", void 0);
AlphaBarTooltip = __decorate([
    customElement('alpha-bar-tooltip'),
    localized()
], AlphaBarTooltip);
export { AlphaBarTooltip };
