import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import emptyQueryIcon from './assets/img/icons/empty-query';
import nullResultIcon from './assets/img/icons/null-result';

export type placeholderType = 'empty-query' | 'null-result' | null;
@customElement('empty-placeholder')
export class EmptyPlaceholder extends LitElement {
  @property({ type: String }) placeholderType: placeholderType = null;

  @property({ type: Boolean }) isMobileView?: false;

  render() {
    return this.placeholderType
      ? html`${this.getPlaceholderTemplate}`
      : nothing;
  }

  private get getPlaceholderTemplate() {
    return html`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView
          ? 'mobile'
          : 'desktop'}"
      >
        ${choose(this.placeholderType, [
          ['empty-query', () => this.emptyQueryTemplate],
          ['null-result', () => this.nullResultTemplate],
        ])}
      </div>
    `;
  }

  private get emptyQueryTemplate() {
    return html`
      <h2 class="title">
        To begin searching, enter a search term in the box above and hit "Go".
      </h2>
      <div>${emptyQueryIcon}</div>
    `;
  }

  private get nullResultTemplate() {
    return html`
      <h2 class="title">
        Your search did not match any items in the Archive. Try different
        keywords or a more general search.
      </h2>
      <div>${nullResultIcon}</div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        text-align: center;
        width: 100%;
      }

      .placeholder {
        display: block;
      }

      .desktop svg {
        max-height: 40rem;
      }
      .desktop .title {
        margin: 4rem 0;
      }

      .mobile svg {
        max-height: 20rem;
      }
      .mobile .title {
        margin: 2rem 0.5;
      }
    `;
  }
}
