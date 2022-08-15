import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-snippet-block')
export class TextSnippetBlock extends LitElement {
  @property({ type: String }) viewSize: string = 'desktop';

  render() {
    const viewSizeClass = this.viewSize === 'grid' ? 'grid' : 'list';
    return html`
      <div id="container" class=${viewSizeClass}></div>

      ${this.viewSize === 'grid' ? html`<div id="separator"></div>` : nothing}
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        display: -webkit-box;
        font-family: 'Times New Roman', serif;
        color: #2c2c2c;

        text-overflow: ellipsis;
        overflow: hidden;
        overflow-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      #separator {
        margin: 0 -0.5rem; /* Border line should extend to the edges of the tile */
        border-bottom: 1px solid #bbb;
      }

      .grid {
        margin: 0.5rem 0 0.4rem; /* Bottom margin reduced by 1px to account for the separator */
        font-size: 1.2rem;
        line-height: 1.5rem;
      }

      .list {
        margin: 1rem 0 0;
        padding: 0 0 0 1.5rem;
        border-left: 0.5rem solid #194880;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `;
  }
}
