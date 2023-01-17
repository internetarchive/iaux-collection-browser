import { css, html, LitElement, CSSResultGroup } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';

export type Side = 'left' | 'right';

@customElement('toggle-switch')
export class ToggleSwitch extends LitElement {
  /**
   * The value this switch should have when toggled to the left.
   */
  @property({ type: String }) leftValue: string = '';

  /**
   * The human-readable label to display on the left side of this switch.
   * If none is provided, `leftValue` is used.
   */
  @property({ type: String }) leftLabel?: string;

  /**
   * The value this switch should have when toggled to the right.
   */
  @property({ type: String }) rightValue: string = '';

  /**
   * The human-readable label to display on the right side of this switch.
   * If none is provided, `rightValue` is used.
   */
  @property({ type: String }) rightLabel?: string;

  /**
   * Which side of the switch is selected (`'left'` or `'right'`).
   */
  @property({ type: String }) side: Side = 'left';

  @query('#switch-left')
  private leftRadio!: HTMLInputElement;

  render() {
    return html`
      <div id="container">
        <label for="switch-left">${this.leftLabel ?? this.leftValue}</label>
        <input
          type="radio"
          id="switch-left"
          class="sr-only"
          name="switch"
          .value=${this.leftValue}
          .checked=${this.side === 'left'}
          @change=${this.handleRadioChange}
        />
        <input
          type="radio"
          id="switch-right"
          class="sr-only"
          name="switch"
          .value=${this.rightValue}
          .checked=${this.side === 'right'}
          @change=${this.handleRadioChange}
        />
        <button
          id="switch-button"
          class=${this.side}
          aria-hidden="true"
          @click=${this.handleClick}
        >
          <div id="knob"></div>
        </button>
        <label for="switch-right">${this.rightLabel ?? this.rightValue}</label>
      </div>
    `;
  }

  /**
   * The currently selected value of this switch.
   */
  get value(): string {
    return this.side === 'left' ? this.leftValue : this.rightValue;
  }

  /**
   * The label for the currently selected value of this switch.
   * Falls back to the current value if its label is not defined.
   */
  get selectedLabel(): string {
    return this.side === 'left'
      ? this.leftLabel ?? this.leftValue
      : this.rightLabel ?? this.rightValue;
  }

  private handleClick(): void {
    this.side = this.side === 'left' ? 'right' : 'left';
    this.emitChangeEvent();
  }

  private handleRadioChange(): void {
    this.side = this.leftRadio.checked ? 'left' : 'right';
    this.emitChangeEvent();
  }

  private emitChangeEvent(): void {
    const event = new CustomEvent<string>('change', {
      detail: this.value,
    });
    this.dispatchEvent(event);
  }

  static get styles(): CSSResultGroup {
    const switchWidth = css`var(--switchWidth, 30px)`;
    const switchHeight = css`var(--switchHeight, 14px)`;
    const switchMarginLeft = css`var(--switchMarginLeft, 5px)`;
    const switchMarginRight = css`var(--switchMarginRight, 5px)`;
    const switchBorderWidth = css`var(--switchBorderWidth, 3px)`;
    const switchBgColor = css`var(--switchBgColor, #194880)`;
    const switchBorderColor = css`var(--switchBorderColor, #194880)`;
    const labelFontSize = css`var(--labelFontSize, 1.3rem)`;
    const knobColor = css`var(--knobColor, white)`;
    const knobTransitionDuration = css`var(--knobTransitionDuration, 0.25s)`;
    const knobTransitionFn = css`var(--knobTransitionFn, ease)`;

    return css`
      #container {
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: ${labelFontSize};
      }

      #switch-button {
        width: ${switchWidth};
        height: ${switchHeight};
        margin: 0 ${switchMarginRight} 0 ${switchMarginLeft};
        padding: 0;
        border: ${switchBorderWidth} solid ${switchBorderColor};
        border-radius: ${switchHeight};
        box-sizing: content-box;
        background: ${switchBgColor};
        appearance: none;
        cursor: pointer;
      }

      #switch-button.left #knob {
        transform: translateX(0);
      }

      #switch-button.right #knob {
        transform: translateX(calc(${switchWidth} - ${switchHeight}));
      }

      #switch-button:focus-visible {
        outline: 2px solid black;
        outline-offset: 2px;
      }

      #knob {
        display: block;
        width: ${switchHeight};
        height: ${switchHeight};
        border-radius: 50%;
        background: ${knobColor};
        transition: transform ${knobTransitionDuration} ${knobTransitionFn};
      }

      .sr-only {
        position: absolute !important;
        width: 1px !important;
        height: 1px !important;
        margin: -1px !important;
        padding: 0 !important;
        border: 0 !important;
        overflow: hidden !important;
        white-space: nowrap !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
      }

      @media (prefers-reduced-motion: reduce) {
        #knob {
          transition-duration: 0.001s !important; /* Imperceptibly fast */
        }
      }
    `;
  }
}
