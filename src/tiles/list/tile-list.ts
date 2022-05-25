import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { customElement, property, state } from 'lit/decorators.js';

import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';

import { dateLabel } from './date-label';
import { accountLabel } from './account-label';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';

import '../item-tile-image';
import '../mediatype-icon';

@customElement('tile-list')
export class TileList extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Number }) mobileBreakpoint?: number;

  @state() private collectionLinks: TemplateResult[] = [];

  @property({ type: String }) baseImageUrl?: string;

  protected updated(changed: PropertyValues): void {
    if (changed.has('model')) {
      this.fetchCollectionNames();
    }
  }

  private async fetchCollectionNames() {
    if (
      !this.model?.collections ||
      this.model.collections.length === 0 ||
      !this.collectionNameCache
    ) {
      return;
    }
    // Note: quirk of Lit: need to replace collectionLinks array,
    // otherwise it will not re-render. Can't simply alter the array.
    this.collectionLinks = [];
    const newCollellectionLinks: TemplateResult[] = [];
    const promises: Promise<void>[] = [];
    for (const collection of this.model.collections) {
      promises.push(
        this.collectionNameCache?.collectionNameFor(collection).then(name => {
          newCollellectionLinks.push(
            this.detailsLink(collection, name ?? collection)
          );
        })
      );
    }
    await Promise.all(promises);
    this.collectionLinks = newCollellectionLinks;
  }

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize === 'mobile'
          ? this.mobileTemplate
          : this.desktopTemplate}
      </div>
    `;
  }

  private get mobileTemplate() {
    return html`
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${ifDefined(this.model?.mediatype)}">
            ${this.imgTemplate}
          </div>
        </div>
        <div id="list-line-right">
          <div id="title-line">
            <div id="title">${this.titleTemplate}</div>
            ${this.iconRightTemplate}
          </div>
        </div>
      </div>
      <div id="list-line-bottom">${this.detailsTemplate}</div>
    `;
  }

  private get desktopTemplate() {
    return html`
      <div id="list-line-left">
        <div id="thumb" class="${ifDefined(this.model?.mediatype)}">
          ${this.imgTemplate}
        </div>
      </div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `;
  }

  private get detailsTemplate() {
    return html`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate}
    `;
  }

  // Data templates
  private get imgTemplate() {
    if (!this.model?.identifier) {
      return nothing;
    }
    return html`
      <item-tile-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
      >
      </item-tile-image>
    `;
  }

  private get iconRightTemplate() {
    return html`
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${this.model?.mediatype}
          .collections=${this.model?.collections}
          style="--iconCustomFillColor: ${ifDefined(this.collectionColor)}"
        >
        </mediatype-icon>
      </div>
    `;
  }

  // Only in list, not tile
  private get collectionColor() {
    if (this.model?.mediatype !== 'collection') {
      return undefined;
    }
    return '#4666FF';
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

  private get creatorTemplate() {
    // "Achivist since" if account
    if (this.model?.mediatype === 'account') {
      return html`
        <div id="creator" class="metadata">
          <span class="label"> ${accountLabel(this.model?.dateAdded)} </span>
        </div>
      `;
    }
    // "Creator" if not account tile
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

  private get datePublishedTemplate() {
    return this.metadataTemplate(
      formatDate(this.model?.datePublished, 'long'),
      'Published'
    );
  }

  // Show date label/value when sorted by date type
  // Except datePublished which is always shown
  private get dateSortByTemplate() {
    if (
      this.sortParam &&
      (this.sortParam.field === 'addeddate' ||
        this.sortParam.field === 'reviewdate' ||
        this.sortParam.field === 'publicdate')
    ) {
      return this.metadataTemplate(
        formatDate(this.date, 'long'),
        dateLabel(this.sortParam.field)
      );
    }
    return nothing;
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
    if (!this.collectionLinks || this.collectionLinks.length === 0) {
      return nothing;
    }
    return html`
      <div id="collections" class="metadata">
        ${this.labelTemplate('Collections')}
        ${join(this.collectionLinks, html`, `)}
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

    // eslint-disable-next-line lit/no-invalid-html
    return html`<a href="${this.baseNavigationUrl}/search.php?query=${query}">
      ${DOMPurify.sanitize(searchTerm)}</a
    >`;
  }

  private detailsLink(identifier: string, text?: string): TemplateResult {
    const linkText = text ?? identifier;
    // No whitespace after closing tag
    // identifiers (all ASCII in their creation) should be safe to use in href, but sanitize anyway
    return html`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(identifier)}"
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
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'mobile';
    }
    return 'desktop';
  }

  private get formatSize(): DateFormat | NumberFormat {
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'short';
    }
    return 'long';
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

      #list-line.mobile {
        --infiniteScrollerRowGap: 20px;
        --infiniteScrollerRowHeight: auto;
      }

      #list-line.desktop {
        --infiniteScrollerRowGap: 30px;
        --infiniteScrollerRowHeight: auto;
      }

      /* fields */

      #thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb {
        width: 90px;
        height: 90px;
      }

      .desktop #thumb {
        width: 100px;
        height: 100px;
      }

      #thumb.collection {
        --border-radius: 8px;
      }

      .mobile #thumb.account {
        --border-radius: 45px;
      }

      .desktop #thumb.account {
        --border-radius: 50px;
      }

      #icon-right {
        width: 20px;
        padding-top: 5px;
        --iconHeight: 20px;
        --iconWidth: 20px;
        --iconTextAlign: right;
        margin-top: -8px;
        text-align: right;
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
        flex-grow: 1;
      }

      .metadata {
        line-height: 20px;
      }

      #description,
      #creator,
      #topics,
      #source {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        word-break: break-word;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
      }

      #icon {
        padding-top: 5px;
      }

      #description {
        padding-top: 10px;
      }

      /* Top level container */
      #list-line {
        display: flex;
      }

      #list-line.mobile {
        flex-direction: column;
      }

      #list-line.desktop {
        column-gap: 10px;
      }

      #list-line-top {
        display: flex;
        column-gap: 7px;
      }

      #list-line-bottom {
        padding-top: 4px;
      }

      #list-line-right,
      #list-line-top,
      #list-line-bottom {
        width: 100%;
      }

      div a:hover {
        text-decoration: underline;
      }

      /* Lines containing multiple div as row */
      #item-line,
      #dates-line,
      #views-line,
      #title-line {
        display: flex;
        flex-direction: row;
        gap: 10px;
      }
    `;
  }
}
