import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../src/collection-browser';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html` <collection-browser> </collection-browser> `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}
