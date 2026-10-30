var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EmptyPlaceholder_1;
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { choose } from 'lit/directives/choose.js';
import { localized, msg } from '@lit/localize';
import emptyQueryIcon from './assets/img/icons/empty-query';
import nullResultIcon from './assets/img/icons/null-result';
let EmptyPlaceholder = EmptyPlaceholder_1 = class EmptyPlaceholder extends LitElement {
    constructor() {
        super(...arguments);
        this.placeholderType = null;
        this.detailMessage = '';
    }
    static get MESSAGE_EMPTY_QUERY() {
        return msg('To begin searching, enter a search term in the box above and hit "Go".');
    }
    static get MESSAGE_NO_SEARCH_RESULTS() {
        return msg('Your search did not match any items in the Archive. Try different keywords or a more general search.');
    }
    static get MESSAGE_NO_COLLECTION_RESULTS() {
        return msg('Your search did not match any items in this collection. Try different keywords or a more general search.');
    }
    static get MESSAGE_NO_VIEWABLE_MEMBERS() {
        return msg('This collection contains no viewable items.');
    }
    static get MESSAGE_QUERY_ERROR() {
        // prettier-ignore
        return msg(html `The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `);
    }
    static get MESSAGE_COLLECTION_ERROR() {
        // prettier-ignore
        return msg(html `The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`);
    }
    static get MESSAGE_SERVICE_ERROR() {
        return msg("The search service didn't answer. Please try again in a moment.");
    }
    static get QUERY_ERROR_DETAILS_MESSAGE() {
        return msg('Error details:');
    }
    render() {
        return this.placeholderType ? html `${this.placeholderTemplate}` : nothing;
    }
    get placeholderTemplate() {
        return html `
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
            ['service-error', () => this.serviceErrorTemplate],
        ])}
      </div>
    `;
    }
    get emptyQueryTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="empty-query-text-msg">
        ${EmptyPlaceholder_1.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${emptyQueryIcon}</div>
    `;
    }
    get emptyCollectionTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${EmptyPlaceholder_1.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${nullResultIcon}</div>
    `;
    }
    get noResultsTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection
            ? EmptyPlaceholder_1.MESSAGE_NO_COLLECTION_RESULTS
            : EmptyPlaceholder_1.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${nullResultIcon}</div>
    `;
    }
    /** The search service failed or didn't answer: not the query's fault. */
    get serviceErrorTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="error-service-text-msg">
        ${EmptyPlaceholder_1.MESSAGE_SERVICE_ERROR}
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">
        ${EmptyPlaceholder_1.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `;
    }
    get queryErrorTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="error-query-text-msg">
        ${EmptyPlaceholder_1.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">
        ${EmptyPlaceholder_1.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `;
    }
    get collectionErrorTemplate() {
        // Added data-testid for Playwright testing
        return html `
      <h2 class="title" data-testid="error-collection-text-msg">
        ${EmptyPlaceholder_1.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${nullResultIcon}</div>
      <p class="error-details">
        ${EmptyPlaceholder_1.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `;
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: String })
], EmptyPlaceholder.prototype, "placeholderType", void 0);
__decorate([
    property({ type: Boolean })
], EmptyPlaceholder.prototype, "isMobileView", void 0);
__decorate([
    property({ type: Boolean })
], EmptyPlaceholder.prototype, "isCollection", void 0);
__decorate([
    property({ type: String })
], EmptyPlaceholder.prototype, "detailMessage", void 0);
EmptyPlaceholder = EmptyPlaceholder_1 = __decorate([
    customElement('empty-placeholder'),
    localized()
], EmptyPlaceholder);
export { EmptyPlaceholder };
