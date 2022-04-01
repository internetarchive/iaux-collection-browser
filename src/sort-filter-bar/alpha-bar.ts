import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('alpha-bar')
export class AlphaBar extends LitElement {
  @property({ type: String }) headline?: string;

  @property({ type: String }) selectedLetter?: string;

  private get selectedUppercaseLetter(): string | undefined {
    return this.selectedLetter?.toUpperCase();
  }

  render() {
    return html`
      <h1>${this.headline}</h1>
      <div id="container">
        <ul>
          ${this.alphabet.map(
            letter =>
              html`
                <li
                  class=${letter === this.selectedUppercaseLetter
                    ? 'selected'
                    : nothing}
                >
                  <a
                    href="#"
                    @click=${(e: Event) => {
                      e.preventDefault();
                      this.letterClicked(letter);
                    }}
                  >
                    ${letter}
                  </a>
                </li>
              `
          )}
        </ul>
      </div>
    `;
  }

  private letterClicked(letter: string) {
    if (letter === this.selectedUppercaseLetter) {
      this.selectedLetter = undefined;
    } else {
      this.selectedLetter = letter;
    }
    this.dispatchEvent(
      new CustomEvent('letterChanged', {
        detail: { selectedLetter: this.selectedUppercaseLetter },
      })
    );
  }

  private readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  static styles = css`
    h1 {
      font-size: 1.2rem;
    }

    #container {
      background-color: #ddd;
      color: #333;
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0.5rem 1rem;
      justify-content: space-between;
    }

    a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 0.7rem;
      display: block;
    }

    .selected {
      background-color: darkgray;
    }

    .selected a {
      color: white;
    }
  `;
}
