import { LitElement, html, css, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('alpha-bar-tooltip')
export class AlphaBarTooltip extends LitElement {
  @property({ type: Number }) numResults: number = 0;

  render() {
    return html`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults === 1 ? 'result' : 'results'}
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const arrowSize = css`var(--tooltipArrowSize, 5px)`;
    const arrowOffset = css`var(--tooltipArrowOffset, 0px)`;

    return css`
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${arrowOffset});
        top: 0;
        width: 0;
        height: 0;
        margin-top: calc(-1 * ${arrowSize});
        margin-left: calc(-1 * ${arrowSize});
        border: ${arrowSize} solid transparent;
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
}
