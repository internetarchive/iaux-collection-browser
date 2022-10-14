import { css, html, LitElement, CSSResultGroup } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('facet-tombstone-row')
export class FacetTombstoneRow extends LitElement {
  render() {
    return html`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      #row {
        display: grid;
        grid-template-columns: 15px 1fr 36px;
        grid-gap: 9px 6px;
        align-items: center;
        margin: 2.5px auto;
        border: 1px solid transparent;
      }

      .tombstone-line {
        background: #ddd;
        height: 6px;
        border-radius: 50px;
      }

      input[type='checkbox'] {
        width: 15px;
        height: 15px;
        margin: 0;
      }
    `;
  }
}
