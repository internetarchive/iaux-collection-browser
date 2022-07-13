import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import noSearchTermIcon from './assets/img/icons/no-search-term';
import noSearchResultIcon from './assets/img/icons/no-search-result';

export type emptyPlaceholderType = null | 'no-search-term' | 'no-search-result';

@customElement('empty-placeholder')
export class EmptyPlaceholder extends LitElement {
  @property({ type: String }) placeholderType: emptyPlaceholderType = null;

  @property({ type: Boolean }) mobileView?: false;

  /**
   * Error message to show when user have entered search term
   */
  private noSearchTermMessage =
    'To begin searching, enter a search term in the box above and hit "Go".';

  /**
   * Error message to show when user search did not match any items
   */
  private noSearchResultMessage =
    'Your search did not match any items in the Archive. Try different keywords or a more general search.';

  private get emptyPlaceholderTemplate() {
    return html`
      <div
        class="placeholder ${this.placeholderType} ${this.mobileView
          ? 'mobile'
          : 'desktop'}"
      >
        <h2 class="title">
          ${this.placeholderType === 'no-search-term'
            ? this.noSearchTermMessage
            : this.noSearchResultMessage}
        </h2>
        <div>
          ${this.placeholderType === 'no-search-term'
            ? noSearchTermIcon
            : noSearchResultIcon}
        </div>
      </div>
    `;
  }

  render() {
    return html`
      ${this.placeholderType === null ? nothing : this.emptyPlaceholderTemplate}
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
