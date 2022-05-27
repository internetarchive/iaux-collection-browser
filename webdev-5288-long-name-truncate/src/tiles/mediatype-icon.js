import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mediatypeConfig } from '../mediatype/mediatype-config';
let MediatypeIcon = class MediatypeIcon extends LitElement {
    constructor() {
        super(...arguments);
        this.showText = false;
    }
    get displayMediatype() {
        var _a, _b;
        const tvIdentifier = ['tvnews', 'tvarchive', 'television'];
        const radioIdentifier = ['radio', 'radioprogram'];
        if (this.mediatype === 'movies' &&
            ((_a = this.collections) === null || _a === void 0 ? void 0 : _a.some(id => tvIdentifier.indexOf(id) >= 0))) {
            return 'tv';
        }
        if (this.mediatype === 'audio' &&
            ((_b = this.collections) === null || _b === void 0 ? void 0 : _b.some(id => radioIdentifier.indexOf(id) >= 0))) {
            return 'radio';
        }
        return this.mediatype || '';
    }
    render() {
        const config = mediatypeConfig[this.displayMediatype];
        if (!config) {
            return html ``;
        }
        return html `
      <div
        id="icon"
        class="${this.showText ? 'show-text' : 'hide-text'}"
        style="--iconFillColor: ${config.color}"
      >
        ${config.icon}
        <p class="status-text">${config.text}</p>
      </div>
    `;
    }
    static get styles() {
        return css `
      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: var(--iconTextAlign, center);
      }

      #icon.hide-text p {
        display: none;
      }

      svg {
        height: var(--iconHeight, 10px);
        width: var(--iconWidth, 10px);
      }

      .fill-color {
        fill: var(--iconCustomFillColor, var(--iconFillColor, '#000000'));
      }
    `;
    }
};
__decorate([
    property({ type: String })
], MediatypeIcon.prototype, "mediatype", void 0);
__decorate([
    property({ type: Array })
], MediatypeIcon.prototype, "collections", void 0);
__decorate([
    property({ type: Boolean })
], MediatypeIcon.prototype, "showText", void 0);
MediatypeIcon = __decorate([
    customElement('mediatype-icon')
], MediatypeIcon);
export { MediatypeIcon };
//# sourceMappingURL=mediatype-icon.js.map