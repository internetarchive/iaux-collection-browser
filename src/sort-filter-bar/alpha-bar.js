import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let AlphaBar = class AlphaBar extends LitElement {
    constructor() {
        super(...arguments);
        this.selectedLetter = null;
        this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    }
    get selectedUppercaseLetter() {
        var _a;
        return (_a = this.selectedLetter) === null || _a === void 0 ? void 0 : _a.toUpperCase();
    }
    render() {
        return html `
      <div id="container">
        <ul>
          ${this.alphabet.map(letter => html `
                <li
                  class=${letter === this.selectedUppercaseLetter
            ? 'selected'
            : ''}
                >
                  <a
                    href="#"
                    @click=${(e) => {
            e.preventDefault();
            this.letterClicked(letter);
        }}
                  >
                    ${letter}
                  </a>
                </li>
              `)}
        </ul>
      </div>
    `;
    }
    letterClicked(letter) {
        if (letter === this.selectedUppercaseLetter) {
            this.selectedLetter = null;
        }
        else {
            this.selectedLetter = letter;
        }
        this.dispatchEvent(new CustomEvent('letterChanged', {
            detail: { selectedLetter: this.selectedUppercaseLetter },
        }));
    }
};
AlphaBar.styles = css `
    h1 {
      font-size: 1.2rem;
    }

    #container {
      background-color: #ddd;
      color: #333;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0.5rem 1rem;
      justify-content: space-between;
    }

    ul li {
      flex: 1;
      text-align: center;
      max-width: 2.5rem;
    }

    a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 0;
      display: block;
    }

    .selected {
      background-color: darkgray;
    }

    .selected a {
      color: white;
    }
  `;
__decorate([
    property({ type: String })
], AlphaBar.prototype, "selectedLetter", void 0);
AlphaBar = __decorate([
    customElement('alpha-bar')
], AlphaBar);
export { AlphaBar };
//# sourceMappingURL=alpha-bar.js.map