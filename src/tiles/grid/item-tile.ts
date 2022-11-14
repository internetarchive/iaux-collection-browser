/* eslint-disable import/no-duplicates */
import type { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { formatDate } from '../../utils/format-date';
import type { TileModel } from '../../models';

import '../image-block';
import '../text-snippet-block';
import '../item-image';
import '../mediatype-icon';
import './tile-stats';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: String }) baseImageUrl?: string;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) model?: TileModel;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    const itemTitle = this.model?.title;

    return html`
      <div class="container">
        <div class="item-info">
          <image-block 
            class=${this.hasSnippets ? 'has-snippets' : nothing}
            .model=${this.model}
            .baseImageUrl=${this.baseImageUrl}
            .loggedIn=${this.loggedIn}
            .isCompactTile=${false}
            .isListTile=${false}
            .viewSize=${'grid'}>
          </image-block>

          <div id="title">
            <h1 class="truncated" title=${ifDefined(itemTitle)}>
              ${itemTitle}
            </h1>
          </div>

          ${this.textSnippetsTemplate}

          ${
            this.doesSortedByDate
              ? this.sortedDateInfoTemplate
              : this.creatorTemplate
          }
        </div>

        <tile-stats 
          .mediatype=${this.model?.mediatype}
          .viewCount=${this.model?.viewCount}
          .favCount=${this.model?.favCount}
          .commentCount=${this.model?.commentCount}>
        </tile-stats>
        </div>
      </div>
    `;
  }

  /**
   * Templates
   */
  private get doesSortedByDate() {
    return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(
      this.sortParam?.field as string
    );
  }

  private get sortedDateInfoTemplate() {
    let sortedValue;

    switch (this.sortParam?.field) {
      case 'date':
        sortedValue = { field: 'published', value: this.model?.datePublished };
        break;
      case 'reviewdate':
        sortedValue = { field: 'reviewed', value: this.model?.dateReviewed };
        break;
      case 'addeddate':
        sortedValue = { field: 'added', value: this.model?.dateAdded };
        break;
      case 'publicdate':
        sortedValue = { field: 'archived', value: this.model?.dateArchived };
        break;
      default:
        break;
    }

    return html`
      <div class="date-sorted-by truncated">
        <span>
          ${sortedValue?.field} ${formatDate(sortedValue?.value, 'long')}
        </span>
      </div>
    `;
  }

  private get creatorTemplate() {
    return html`
      <div class="created-by truncated">
        ${this.model?.creator
          ? html`<span id="creator">by&nbsp;${this.model?.creator}</span>`
          : nothing}
      </div>
    `;
  }

  private get textSnippetsTemplate(): TemplateResult | typeof nothing {
    if (!this.hasSnippets) return nothing;

    return html` <text-snippet-block
      viewsize="grid"
      .snippets=${this.model?.snippets}
    >
    </text-snippet-block>`;
  }

  private get hasSnippets(): boolean {
    return !!this.model?.snippets?.length;
  }

  private get itemLineTemplate() {
    const source = this.sourceTemplate;
    const volume = this.volumeTemplate;
    const issue = this.issueTemplate;
    if (!source && !volume && !issue) {
      return nothing;
    }
    return html` <div id="item-line">+++${source} ${volume} ${issue}</div> `;
  }

  private get sourceTemplate() {
    if (!this.model?.source) {
      return nothing;
    }
    return html`
      <div id="source" class="metadata">
        ${this.labelTemplate('Source')}
        ${this.searchLink('source', this.model.source)}
      </div>
    `;
  }

  private get volumeTemplate() {
    return this.metadataTemplate(this.model?.volume, 'Volume');
  }

  private get issueTemplate() {
    return this.metadataTemplate(this.model?.issue, 'Issue');
  }

  // Utility functions
  // eslint-disable-next-line default-param-last
  private metadataTemplate(text: any, label = '', id?: string) {
    if (!text) return nothing;
    return html`
      <div id=${ifDefined(id)} class="metadata">
        ${this.labelTemplate(label)} ${text}
      </div>
    `;
  }

  private labelTemplate(label: string) {
    return html` ${label
      ? html`<span class="label">${label}: </span>`
      : nothing}`;
  }

  private searchLink(field: string, searchTerm: string) {
    if (!field || !searchTerm) {
      return nothing;
    }
    const query = encodeURIComponent(`${field}:"${searchTerm}"`);
    // No whitespace after closing tag
    // Note: single ' for href='' to wrap " in query var gets changed back by yarn format

    /* eslint-disable lit/no-invalid-html */
    return html`<a
      href="${this.baseNavigationUrl}/search?query=${query}"
      rel="nofollow"
    >
      ${DOMPurify.sanitize(searchTerm)}</a
    >`;
    /* eslint-enable lit/no-invalid-html */
  }

  // CSS
  static get styles(): CSSResultGroup {
    return css`
      .container {
        background-color: #ffffff;
        border-radius: var(--collectionTileCornerRadius, 4px);
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .flex-container {
        padding: 0;
        margin: 0;
        list-style: none;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-flex-flow: row wrap;
        justify-content: space-around;
      }

      .flex-item {
        background: tomato;
        padding: 5px;
        width: 200px;

        margin-top: 10px;

        color: white;
        font-weight: bold;
        font-size: 3em;
        text-align: center;
        word-break: break-all;
      }

      .item-info {
        flex-grow: 1;
      }

      #title {
        flex-shrink: 0;
      }

      .hidden {
        display: none;
      }

      .container:hover > .item-info > #title > .truncated {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title:hover > .truncated {
        text-decoration: underline;
      }

      image-block {
        display: block;
        margin-bottom: 5px;
      }

      image-block.has-snippets {
        /* If there is a text snippet block present, the image block needs to shrink */
        --imgBlockHeight: 11rem;
      }

      .created-by,
      .date-sorted-by {
        display: flex;
        justify-content: left;
        /* align-items: flex-end; Important to start text from bottom */
        height: 4rem;
        padding: 10px 5px 10px 5px;
      }

      .truncated {
        flex: 1;
        color: #2c2c2c;
        min-width: 0; /* Important for long words! */
        text-align: left;
        line-height: 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      .truncated span {
        font-size: 1.4rem;
        display: -webkit-box;
      }

      h1.truncated {
        margin: 0px;
        font-size: 14px;
        display: -webkit-box;
        padding: 0px 5px 0px 5px;
      }

      #creator {
        height: 45px;
        min-width: 0; /* Important for long words! */
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
        -webkit-line-clamp: 3;
      }
    `;
  }
}
