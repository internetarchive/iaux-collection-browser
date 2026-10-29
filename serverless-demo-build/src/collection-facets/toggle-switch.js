var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { srOnlyStyle } from '../styles/sr-only';
let ToggleSwitch = class ToggleSwitch extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * The value this switch should have when toggled to the left.
         */
        this.leftValue = '';
        /**
         * The value this switch should have when toggled to the right.
         */
        this.rightValue = '';
        /**
         * Which side of the switch is selected (`'left'` or `'right'`).
         */
        this.side = 'left';
    }
    render() {
        return html `
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
          tabindex="-1"
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
    get value() {
        return this.side === 'left' ? this.leftValue : this.rightValue;
    }
    /**
     * The label for the currently selected value of this switch.
     * Falls back to the current value if its label is not defined.
     */
    get selectedLabel() {
        return this.side === 'left'
            ? (this.leftLabel ?? this.leftValue)
            : (this.rightLabel ?? this.rightValue);
    }
    handleClick() {
        this.side = this.side === 'left' ? 'right' : 'left';
        this.emitChangeEvent();
    }
    handleRadioChange() {
        this.side = this.leftRadio.checked ? 'left' : 'right';
        this.emitChangeEvent();
    }
    emitChangeEvent() {
        const event = new CustomEvent('change', {
            detail: this.value,
        });
        this.dispatchEvent(event);
    }
    static get styles() {
        const switchWidth = css `var(--switchWidth, 30px)`;
        const switchHeight = css `var(--switchHeight, 14px)`;
        const switchMarginLeft = css `var(--switchMarginLeft, 5px)`;
        const switchMarginRight = css `var(--switchMarginRight, 5px)`;
        const switchBorderWidth = css `var(--switchBorderWidth, 3px)`;
        const switchBgColor = css `var(--switchBgColor, #194880)`;
        const switchBorderColor = css `var(--switchBorderColor, #194880)`;
        const labelFontSize = css `var(--labelFontSize, 1.3rem)`;
        const knobColor = css `var(--knobColor, white)`;
        const knobTransitionDuration = css `var(--knobTransitionDuration, 0.25s)`;
        const knobTransitionFn = css `var(--knobTransitionFn, ease)`;
        return [
            srOnlyStyle,
            css `
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

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `,
        ];
    }
};
__decorate([
    property({ type: String, attribute: true })
], ToggleSwitch.prototype, "leftValue", void 0);
__decorate([
    property({ type: String, attribute: true })
], ToggleSwitch.prototype, "leftLabel", void 0);
__decorate([
    property({ type: String, attribute: true })
], ToggleSwitch.prototype, "rightValue", void 0);
__decorate([
    property({ type: String, attribute: true })
], ToggleSwitch.prototype, "rightLabel", void 0);
__decorate([
    property({ type: String, attribute: true })
], ToggleSwitch.prototype, "side", void 0);
__decorate([
    query('#switch-left')
], ToggleSwitch.prototype, "leftRadio", void 0);
ToggleSwitch = __decorate([
    customElement('toggle-switch')
], ToggleSwitch);
export { ToggleSwitch };
