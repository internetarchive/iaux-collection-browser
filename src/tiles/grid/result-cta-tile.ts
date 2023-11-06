import { css, CSSResultGroup, html, TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import { BaseTileComponent } from '../base-tile-component';
import '../image-block';
import { uploadIcon } from '../../assets/img/icons/upload';
import { saveIcon } from '../../assets/img/icons/save';

@customElement('result-cta-tile')
export class ResultCTATile extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   */

  render() {
    return html`
      <div class="container">
        ${this.getTitleTemplate} ${this.getIconTemplate}
      </div>
    `;
  }

  private get getTitleTemplate() {
    return html`<h3 id="title">${this.model?.title}</h3>`;
  }

  private get getIconTemplate(): TemplateResult {
    return html`
      <div class="icon">
        ${this.model?.identifier === 'uploads' ? uploadIcon : saveIcon}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const tileBorderColor = css`var(--tileBorderColor, #555555)`;
    const whiteColor = css`#fff`;

    return [
      baseTileStyles,
      css`
        .container {
          background-color: ${whiteColor};
          border: 3px dashed ${tileBorderColor};
          box-shadow: none;
          display: grid;
          align-content: center;
        }
        .item-info {
          flex-grow: initial;
        }
        #title {
          margin: 0px auto;
          font-size: 2.8rem;
          color: rgb(44, 44, 44);
          font-weight: 200;
          text-align: center;
        }
        .icon {
          height: 60px;
          width: 60px;
          text-align: center;
          margin: 3rem auto 0;
        }

        .container:hover {
          border: 3px dashed #4b64ff;
        }
        .container:hover #title {
          color: #4b64ff;
        }
        .container:hover svg {
          fill: #4b64ff;
        }
      `,
    ];
  }
}
