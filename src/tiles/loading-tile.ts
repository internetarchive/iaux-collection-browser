import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('loading-tile')
export class LoadingTile extends LitElement {
  render() {
    return html` <div id="container"></div> `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }

      #container {
        background: linear-gradient(
          to right,
          rgba(25, 69, 154, 0.1),
          rgb(105, 161, 234, 0.2)
        );
        background-size: 400% 400%;

        -webkit-animation: AnimationName 4s ease infinite;
        -moz-animation: AnimationName 4s ease infinite;
        animation: AnimationName 4s ease infinite;

        display: block;
        height: 100%;
      }

      @-webkit-keyframes AnimationName {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @-moz-keyframes AnimationName {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      @keyframes AnimationName {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
    `;
  }
}
