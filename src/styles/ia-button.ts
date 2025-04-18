import { css } from 'lit';

const whiteColor = css`var(--white, #fff)`;
const disabledButtonFillColor = css`var(--primaryDisableCTAFill, #767676)`;
const disabledButtonBorderColor = css`var(--secondaryCTABorder, #999)`;

const primaryButtonFillColor = css`var(--primaryCTAFill, #194880)`;
const primaryButtonFillColorRGB = css`var(--primaryCTAFillRGB, 25, 72, 128)`; // RBG format of --primaryCTAFill
const primaryButtonBorderColor = css`var(--primaryCTABorder, #c5d1df)`;

const dangerButtonFillColor = css`var(--primaryErrorCTAFill, #d9534f)`;
const dangerButtonFillColorRGB = css`var(--primaryErrorCTAFillRGB, 229, 28, 38)`; // RBG format of --primaryErrorCTAFill
const dangerButtonBorderColor = css`var(--primaryErrorCTABorder, #d43f3a)`;

const darkButtonFillColor = css`var(--secondaryCTAFill, #333)`;
const darkButtonFillColorRGB = css`var(--secondaryCTAFillRGB, 51, 51, 51)`; // RBG format of --secondaryCTAFill
const darkButtonBorderColor = css`var(--primaryCTABorder, #979797)`;

const warningButtonFillColor = css`var(---primaryWarningFill, #ee8950)`;
const warningButtonFillColorRGB = css`var(--primaryWarningFillRGB, 238, 137, 80)`; // RBG format of --primaryWarningFill
const warningButtonBorderColor = css`var(--primaryWarningBorder, #ec7939)`;

export default css`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${whiteColor};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 3rem;
    outline-color: ${whiteColor};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${disabledButtonFillColor};
    border: 1px solid ${disabledButtonBorderColor};
  }
  .ia-button.transparent {
    background-color: transparent;
  }

  .ia-button.primary:disabled,
  .ia-button.danger:disabled,
  .ia-button.warning:disabled,
  .ia-button.dark:disabled {
    opacity: 0.5;
  }

  .ia-button.primary {
    background-color: ${primaryButtonFillColor};
    border-color: ${primaryButtonBorderColor};
  }
  .ia-button.primary:hover {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${primaryButtonFillColorRGB}, 0.7);
  }

  .ia-button.danger {
    background-color: ${dangerButtonFillColor};
    border-color: ${dangerButtonBorderColor};
  }
  .ia-button.danger:hover {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${dangerButtonFillColorRGB}, 0.7);
  }

  .ia-button.warning {
    background-color: ${warningButtonFillColor};
    border-color: ${warningButtonBorderColor};
  }
  .ia-button.warning:hover {
    background-color: rgba(${warningButtonFillColorRGB}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${warningButtonFillColorRGB}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${warningButtonFillColorRGB}, 0.7);
  }

  .ia-button.dark {
    background-color: ${darkButtonFillColor};
    border-color: ${darkButtonBorderColor};
  }
  .ia-button.dark:hover {
    background-color: rgba(${darkButtonFillColorRGB}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${darkButtonFillColorRGB}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${darkButtonFillColorRGB}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: var(--ia-theme-link-color, #4b64ff);
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;
