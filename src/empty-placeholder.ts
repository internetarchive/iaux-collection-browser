import {
  css,
  html,
  LitElement,
  CSSResultGroup,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { msg } from '@lit/localize';

import emptyQueryIcon from './assets/img/icons/empty-query';
import nullResultIcon from './assets/img/icons/null-result';

export type PlaceholderType =
  | 'empty-query'
  | 'empty-collection'
  | 'no-results'
  | 'query-error'
  | 'collection-error'
  | null;
@customElement('empty-placeholder')
export class EmptyPlaceholder extends LitElement {
  private static readonly MESSAGE_EMPTY_QUERY = msg(
    'To begin searching, enter a search term in the box above and hit "Go".',
  );

  private static readonly MESSAGE_NO_SEARCH_RESULTS = msg(
    'Your search did not match any items in the Archive. ' +
      'Try different keywords or a more general search.',
  );

  private static readonly MESSAGE_NO_COLLECTION_RESULTS = msg(
    'Your search did not match any items in this collection. ' +
      'Try different keywords or a more general search.',
  );

  private static readonly MESSAGE_NO_VIEWABLE_MEMBERS = msg(
    'This collection contains no viewable items.',
  );

  private static readonly MESSAGE_QUERY_ERROR = msg(
    html`The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `,
  );

  private static readonly MESSAGE_COLLECTION_ERROR = msg(
    html`The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`,
  );

  private static readonly QUERY_ERROR_DETAILS_MESSAGE = msg('Error details:');

  @property({ type: String }) placeholderType: PlaceholderType = null;

  @property({ type: Boolean }) isMobileView?: false;

  @property({ type: Boolean }) isCollection?: false;

  @property({ type: String }) detailMessage?: string = '';

  render() {
    return this.placeholderType ? html`${this.placeholderTemplate}` : nothing;
  }

  private get placeholderTemplate(): TemplateResult {
    return html`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView
          ? 'mobile'
          : 'desktop'}"
      >
        ${choose(this.placeholderType, [
          ['empty-query', () => this.emptyQueryTemplate],
          ['empty-collection', () => this.emptyCollectionTemplate],
          ['no-results', () => this.noResultsTemplate],
          ['query-error', () => this.queryErrorTemplate],
          ['collection-error', () => this.collectionErrorTemplate],
        ])}
      </div>
    `;
  }

  private get emptyQueryTemplate(): TemplateResult {
    // Added data-testid for Playwright testing
    return html`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${EmptyPlaceholder.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${emptyQueryIcon}</div>
    `;
  }

  private get emptyCollectionTemplate(): TemplateResult {
    // Added data-testid for Playwright testing
    return html`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${EmptyPlaceholder.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${nullResultIcon}</div>
    `;
  }

  private get noResultsTemplate(): TemplateResult {
    // Added data-testid for Playwright testing
    return html`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection
          ? EmptyPlaceholder.MESSAGE_NO_COLLECTION_RESULTS
          : EmptyPlaceholder.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${nullResultIcon}</div>
    `;
  }

  private get queryErrorTemplate(): TemplateResult {
    // Added data-testid for Playwright testing
    return html`
      <h2 class="title" data-testid="error-query-text-msg">
        ${EmptyPlaceholder.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">
        ${EmptyPlaceholder.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `;
  }

  private get collectionErrorTemplate(): TemplateResult {
    // Added data-testid for Playwright testing
    return html`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${EmptyPlaceholder.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">
        ${EmptyPlaceholder.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
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
        word-break: break-word;
      }
    `;
  }
}
