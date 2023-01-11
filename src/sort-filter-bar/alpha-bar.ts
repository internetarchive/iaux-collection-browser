import { LitElement, html, css, nothing, TemplateResult } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import type { PrefixFilterCounts } from '../models';

import './alpha-bar-tooltip';
import type { AlphaBarTooltip } from './alpha-bar-tooltip';

@customElement('alpha-bar')
export class AlphaBar extends LitElement {
  @property({ type: String }) selectedLetter: string | null = null;

  @property({ type: Object }) letterCounts?: PrefixFilterCounts;

  @state()
  private tooltipShown: boolean = false;

  @state()
  private hoveredLetter?: string;

  @query('alpha-bar-tooltip')
  private tooltip?: AlphaBarTooltip;

  private readonly alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
                  @mousemove=${this.handleMouseMove}
                  @mouseleave=${this.handleMouseLeave}
                >
                  ${this.letterCounts?.[letter]
                    ? this.letterLinkTemplate(letter)
                    : html`<span>${letter}</span>`}
                  ${this.tooltipTemplate(letter)}
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

  private tooltipTemplate(letter: string): TemplateResult | typeof nothing {
    if (this.hoveredLetter !== letter) return nothing;

    return this.tooltipShown
      ? html`<alpha-bar-tooltip
          data-letter=${letter}
          .numResults=${this.letterCounts?.[this.hoveredLetter] ?? 0}
        ></alpha-bar-tooltip>`
      : nothing;
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

  private async handleMouseMove(e: MouseEvent) {
    const target = e.target as HTMLLIElement;
    if (target && !this.tooltipShown) {
      const targetLetter = target.textContent?.trim() ?? undefined;
      this.tooltipShown = true;
      this.hoveredLetter = targetLetter;

      await this.updateComplete;
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      if (this.tooltip && this.tooltip.dataset.letter === targetLetter) {
        this.positionTooltip(target);
      }
    }
  }

  private handleMouseLeave() {
    this.tooltipShown = false;
    this.hoveredLetter = undefined;
  }

  private positionTooltip(targetElmt: HTMLElement) {
    if (!this.tooltip) return;

    // Basic positioning is just to center the whole tooltip on the letter box.
    const tooltipWidth = this.tooltip.clientWidth;
    const letterWidth = targetElmt.clientWidth;
    let left = letterWidth / 2 - tooltipWidth / 2;

    // But we also need to ensure the tooltip doesn't flow outside the viewport.
    // First, calculate the full width of the document body, including margins
    // (but not including any scrollbar).
    const bodyStyle = getComputedStyle(document.body);
    const bodyMarginLeft = parseFloat(
      bodyStyle.getPropertyValue('margin-left')
    );
    const bodyMarginRight = parseFloat(
      bodyStyle.getPropertyValue('margin-right')
    );
    const bodyWidthWithMargin =
      document.body.clientWidth + bodyMarginLeft + bodyMarginRight;

    // Calculate the positions of the tooltip's left/right edges, and determine
    // how much they overflow the viewport by (if at all).
    const targetRect = targetElmt.getBoundingClientRect();
    const tooltipLeft = targetRect.left + left;
    const tooltipRight = tooltipLeft + tooltipWidth;
    const offset = 1; // How many pixels the tooltip must be offset from the left/right edges
    let overflowAmt;
    if (tooltipLeft < offset) {
      // Tooltip overflows left edge of viewport
      overflowAmt = tooltipLeft - offset;
    } else if (tooltipRight > bodyWidthWithMargin - offset) {
      // Tooltip overflows right edge of viewport
      overflowAmt = tooltipRight - bodyWidthWithMargin + offset;
    }

    // Apply any needed adjustment to the tooltip and its arrow to keep it in the viewport
    if (overflowAmt) {
      left -= overflowAmt;
      this.tooltip.style.setProperty(
        '--tooltipArrowOffset',
        `${overflowAmt}px`
      );
    }

    this.tooltip.style.left = `${left}px`;
    this.tooltip.classList.add('fade-in');
  }

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
      position: relative;
      flex: 1;
      text-align: center;
      max-width: 2.5rem;
      border-radius: 4px;
    }

    li:hover:not(.selected) a {
      background-color: #c0c0c0;
    }

    a,
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
    }

    a {
      color: #333;
      text-decoration: none;
      border-radius: 4px;
    }

    span {
      color: #aaa;
      cursor: default;
    }

    .selected {
      background-color: #2c2c2c;
    }

    .selected a {
      color: white;
    }

    alpha-bar-tooltip {
      position: absolute;
      top: 100%;
      left: -9999px;
      margin-top: 3px;

      opacity: 0;
      transition: opacity 0.2s ease;
    }

    alpha-bar-tooltip.fade-in {
      opacity: 1;
    }

    /* Make alphabet bar a 2-row container in small screen widths */
    @media screen and (max-width: 768px) {
      ul {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
      }
    }
  `;
}
