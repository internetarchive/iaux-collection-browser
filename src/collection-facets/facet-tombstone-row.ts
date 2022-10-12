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
        grid-template-columns: 13px 1fr 38px;
        grid-gap: 9px 6px;
        align-items: center;
      }

      .tombstone-line {
        background: #ddd;
        height: 6px;
        border-radius: 50px;
      }

      input[type='checkbox'] {
        width: 100%;
      }
    `;
  }
}
