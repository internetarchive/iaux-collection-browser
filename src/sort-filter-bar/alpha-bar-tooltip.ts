import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('alpha-bar-tooltip')
export class AlphaBarTooltip extends LitElement {
  @property({ type: Number }) numResults: number = 0;

  render() {
    return html`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">${this.numResults} results</div>
      </div>
    `;
  }

  static styles = css`
    #tooltip-container {
      width: max-content;
      max-width: 200px;
      padding-top: var(--tooltipArrowSize, 5px);
      pointer-events: none;
    }

    #arrow {
      position: absolute;
      left: calc(50% + var(--tooltipArrowOffset, 0px));
      top: 0;
      width: 0;
      height: 0;
      margin-top: calc(-1 * var(--tooltipArrowSize, 5px));
      margin-left: calc(-1 * var(--tooltipArrowSize, 5px));
      border: var(--tooltipArrowSize, 5px) solid transparent;
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
