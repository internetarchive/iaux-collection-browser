import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('alpha-bar')
export class AlphaBar extends LitElement {
  render() {
    return html`
      <div id="container">
        <ul>
          ${this.alphabet.map(letter => html` <li>${letter}</li> `)}
        </ul>
      </div>
    `;
  }

  private alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  static styles = css`
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
  `;
}
