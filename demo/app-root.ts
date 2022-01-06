import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <collection-browser .baseNavigationUrl=${'https://archive.org'}>
      </collection-browser>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
