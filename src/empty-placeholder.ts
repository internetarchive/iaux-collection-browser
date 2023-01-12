import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';

import emptyQueryIcon from './assets/img/icons/empty-query';
import nullResultIcon from './assets/img/icons/null-result';

export type PlaceholderType =
  | 'empty-query'
  | 'null-result'
  | 'query-error'
  | null;
@customElement('empty-placeholder')
export class EmptyPlaceholder extends LitElement {
  @property({ type: String }) placeholderType: PlaceholderType = null;

  @property({ type: Boolean }) isMobileView?: false;

  @property({ type: String }) detailMessage?: string = '';

  render() {
    return this.placeholderType ? html`${this.placeholderTemplate}` : nothing;
  }

  private get placeholderTemplate() {
    return html`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView
          ? 'mobile'
          : 'desktop'}"
      >
        ${choose(this.placeholderType, [
          ['empty-query', () => this.emptyQueryTemplate],
          ['null-result', () => this.nullResultTemplate],
          ['query-error', () => this.queryErrorTemplate],
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

  private get queryErrorTemplate(): TemplateResult {
    return html`
      <h2 class="title">
        The search engine encountered an error, which might be related to your
        search query.
        <a
          href="https://help.archive.org/help/search-building-powerful-complex-queries/"
        >
          Tips for constructing search queries.
        </a>
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">Error details: ${this.detailMessage}</p>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        text-align: center;
        width: 100%;
      }

      a {
        text-decoration: none;
      }
      a:link {
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }

      .placeholder {
        display: block;
      }

      .desktop svg {
        max-height: 40rem;
      }
      .desktop .title,
      .desktop .error-details {
        margin: 4rem 0;
      }

      .mobile svg {
        max-height: 20rem;
      }
      .mobile .title,
      .mobile .error-details {
        margin: 2rem 0.5;
      }

      .error-details {
        font-size: 1.2rem;
      }
    `;
  }
}
