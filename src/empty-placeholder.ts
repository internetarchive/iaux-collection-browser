import { css, html, LitElement, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import noSearchTermIcon from './assets/img/icons/no-search-term';
import noSearchResultIcon from './assets/img/icons/no-search-result';

@customElement('empty-placeholder')
export class EmptyPlaceholder extends LitElement {
  @property({ type: String }) placeholderType?: string;

  @property({ type: Boolean }) mobileView?: false;

  render() {
    return html`
      ${this.placeholderType === 'no-search-term'
        ? this.noSearchTermTemplate
        : this.noSearchResultTemplate}
    `;
  }

  private get noSearchResultTemplate() {
    return html`<div
      class="placeholder no-result ${this.mobileView ? 'mobile' : 'desktop'}"
    >
      <h2 class="title">
        Your search did not match any items in the Archive. Try different
        keywords or a more general search.
      </h2>
      <div>${noSearchResultIcon}</div>
    </div>`;
  }

  private get noSearchTermTemplate() {
    return html`<div
      class="placeholder no-term ${this.mobileView ? 'mobile' : 'desktop'}"
    >
      <h2 class="title">
        To being searching, enter a search term in the box above and hit "Go".
      </h2>
      <div>${noSearchTermIcon}</div>
    </div>`;
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
