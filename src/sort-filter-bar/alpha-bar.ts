import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PrefixFilterCounts } from '../models';

@customElement('alpha-bar')
export class AlphaBar extends LitElement {
  @property({ type: String }) selectedLetter: string | null = null;

  @property({ type: Object }) letterCounts?: PrefixFilterCounts;

  private get selectedUppercaseLetter(): string | undefined {
    return this.selectedLetter?.toUpperCase();
  }

  render() {
    return html`
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
                  ${this.letterCounts?.[letter]
                    ? this.letterLinkTemplate(letter)
                    : html`<span>${letter}</span>`}
                </li>
              `
          )}
        </ul>
      </div>
    `;
  }

  private letterLinkTemplate(letter: string) {
    return html`
      <a
        href="#"
        @click=${(e: Event) => {
          e.preventDefault();
          this.letterClicked(letter);
        }}
      >
        ${letter}
      </a>
    `;
  }

  private letterClicked(letter: string) {
    if (letter === this.selectedUppercaseLetter) {
      this.selectedLetter = null;
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

    li:hover:not(.selected) {
      background-color: #ccc;
    }

    a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 0;
      display: block;
    }

    span {
      color: #aaa;
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
}
