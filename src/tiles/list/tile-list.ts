/* eslint-disable lit/no-invalid-html */
import { css, html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

@customElement('tile-list')
export class TileList extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        <div id="list-line-left">
          <div id="thumb">${this.imgTemplate}</div>
          ${this.iconLeftTemplate}
        </div>
        <div id="list-line-right">
          <div id="title">${this.titleTemplate}</div>
          ${this.itemLineTemplate} ${this.creatorTemplate}
          <div id="date" class="metadata">
            <span class="label">Published:</span> ${formatDate(
              this.date,
              this.formatSize
            )}
          </div>
          <div id="views-line">
            ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
          </div>
          ${this.topicsTemplate} ${this.collectionsTemplate}
          ${this.descriptionTemplate}
        </div>
      </div>
    `;
  }

  // Display templates
  private get imgTemplate() {
    if (!this.model?.identifier) {
      return nothing;
    }
    return html` <img
      src="${this.baseNavigationUrl}/services/img/${this.model.identifier}"
      alt="${this.model.identifier}"
      class=${this.model?.mediatype}
    />`;
  }

  private get iconLeftTemplate() {
    if (this.classSize !== 'desktop') {
      return nothing;
    }
    return html`
      <div id="icon-left">
        <mediatype-icon
          .mediatype=${this.model?.mediatype}
          .showText=${true}
          style="--iconHeight: 20px; --iconWidth: 20px;text-align: center;"
        >
        </mediatype-icon>
      </div>
    `;
  }

  private get titleTemplate() {
    if (!this.model?.title) {
      return nothing;
    }
    return html` ${this.detailsLink(this.model.identifier, this.model.title)} `;
  }

  private get itemLineTemplate() {
    const source = this.sourceTemplate;
    const volume = this.volumeTemplate;
    const issue = this.issueTemplate;
    if (!source && !volume && !issue) {
      return nothing;
    }
    return html` <div id="item-line">${source} ${volume} ${issue}</div> `;
  }

  private get volumeTemplate() {
    return this.metadataTemplate(this.model?.volume, 'Volume');
  }

  private get issueTemplate() {
    return this.metadataTemplate(this.model?.issue, 'Issue');
  }

  private get sourceTemplate() {
    if (!this.model?.source) {
      return nothing;
    }
    return html`
      <div id="source">
        ${this.labelTemplate('Source')}
        ${this.searchLink('source', this.model.source)}
      </div>
    `;
  }

  private get creatorTemplate() {
    if (!this.model?.creators || this.model.creators.length === 0) {
      return nothing;
    }
    return html`
      <div id="creator" class="metadata">
        ${this.labelTemplate('By')}
        ${join(
          map(this.model.creators, id => this.searchLink('creator', id)),
          html`, `
        )}
      </div>
    `;
  }

  private get viewsTemplate() {
    return this.metadataTemplate(
      `${formatCount(this.model?.viewCount ?? 0, this.formatSize)}`,
      'Views'
    );
  }

  private get ratingTemplate() {
    return this.metadataTemplate(this.model?.averageRating, 'Avg Rating');
  }

  private get reviewsTemplate() {
    return this.metadataTemplate(this.model?.commentCount, 'Reviews');
  }

  private get topicsTemplate() {
    if (!this.model?.subjects || this.model.subjects.length === 0) {
      return nothing;
    }
    return html`
      <div id="topics" class="metadata">
        ${this.labelTemplate('Topics')}
        ${join(
          map(this.model.subjects, id => this.searchLink('subject', id)),
          html`, `
        )}
      </div>
    `;
  }

  private get collectionsTemplate() {
    if (!this.model?.collections) {
      return nothing;
    }
    return html`
      <div id="collections" class="metadata">
        ${this.labelTemplate('Collections')}
        ${join(
          map(this.model.collections, id => this.detailsLink(id)),
          html`, `
        )}
      </div>
    `;
  }

  private get descriptionTemplate() {
    return this.metadataTemplate(
      DOMPurify.sanitize(this.model?.description ?? ''),
      '',
      'description'
    );
  }

  // Utility functions
  private metadataTemplate(text: any, label = '', id?: string) {
    if (!text) return nothing;
    return html`
      <div id=${ifDefined(id)} class="metadata">
        ${this.labelTemplate(label)} ${text}
      </div>
    `;
  }

  private labelTemplate(label: string) {
    return html`${label
      ? html`<span class="label">${label}: </span>`
      : nothing}`;
  }

  private searchLink(field: string, searchTerm: string) {
    if (!field || !searchTerm) {
      return nothing;
    }
    const query = encodeURIComponent(`${field}:"${searchTerm}"`);
    // No whitespace after closing tag
    return html` <a href="${this.baseNavigationUrl}/search.php?query=${query}">
      ${DOMPurify.sanitize(searchTerm)}</a
    >`;
  }

  private detailsLink(identifier: string, text?: string) {
    if (!identifier) {
      return nothing;
    }
    const linkText = text ?? identifier;
    // No whitespace after closing tag
    return html` <a href="${this.baseNavigationUrl}/details/${identifier}"
      >${DOMPurify.sanitize(linkText)}</a
    >`;
  }

  /*
   * TODO: fix field names to match model in src/collection-browser.ts
   * private get dateSortSelector()
   * @see src/models.ts
   */
  private get date(): Date | undefined {
    switch (this.sortParam?.field) {
      case 'date':
        return this.model?.datePublished;
      case 'reviewdate':
        return this.model?.dateReviewed;
      case 'addeddate':
        return this.model?.dateAdded;
      default:
        return this.model?.dateArchived; // publicdate
    }
  }

  private get classSize(): string {
    return (this.currentWidth ?? 531) < 530 ? 'mobile' : 'desktop';
  }

  private get formatSize(): DateFormat | NumberFormat {
    return (this.currentWidth ?? 531) < 530 ? 'short' : 'long';
  }

  static get styles() {
    return css`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      div a {
        text-decoration: none;
      }

      .label {
        font-weight: bold;
      }

      .mobile {
        --infiniteScrollerRowGap: 20px;
        --infiniteScrollerRowHeight: auto;
      }

      .desktop {
        --infiniteScrollerRowGap: 30px;
        --infiniteScrollerRowHeight: auto;
      }
      /* fields */

      #thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb img {
        width: 90px;
        height: 90px;
      }

      .desktop #thumb img {
        width: 100px;
        height: 100px;
      }

      #thumb img.collection {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
      }

      .mobile #thumb img.account {
        border-radius: 45px;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
      }

      .desktop #thumb img.account {
        border-radius: 50px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
      }

      #icon-left {
        padding-top: 5px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
        font-size: 22px;
        font-weight: bold;
        /* align top of text with image */
        line-height: 25px;
        margin-top: -4px;
        padding-bottom: 2px;
      }

      .metadata {
        line-height: 20px;
      }

      #creator,
      #topic,
      #source {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      #icon {
        padding-top: 5px;
      }

      mediatype-icon {
        --iconHeight: 20px;
      }

      #description {
        padding-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        word-break: break-word;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
        text-align: left;
      }

      /* list-line */

      #list-line {
        display: flex;
        column-gap: 5px;
      }

      div a:hover {
        text-decoration: underline;
      }

      #item-line,
      #views-line {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
    `;
  }
}
