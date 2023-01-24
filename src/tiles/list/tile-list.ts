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
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import DOMPurify from 'dompurify';

import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { SortParam } from '@internetarchive/search-service';
import { suppressedCollections, TileModel } from '../../models';

import { dateLabel } from './date-label';
import { accountLabel } from './account-label';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';

import '../image-block';
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

  @property({ type: Boolean }) loggedIn = false;

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize === 'mobile'
          ? this.mobileTemplate
          : this.desktopTemplate}
      </div>
    `;
  }

  /**
   * Templates
   */
  private get mobileTemplate() {
    return html`
      <div id="list-line-top">
        <div id="list-line-left">${this.imageBlockTemplate}</div>
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
      <div id="list-line-left">${this.imageBlockTemplate}</div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `;
  }

  private get imageBlockTemplate() {
    if (!this.model) return nothing;

    return html`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(
        this.model.identifier
      )}"
    >
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isCompactTile=${false}
        .isListTile=${true}
        .viewSize=${this.classSize}
        .loggedIn=${this.loggedIn}
      >
      </image-block>
    </a> `;
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
      ${this.descriptionTemplate} ${this.textSnippetsTemplate}
    `;
  }

  // Data templates
  private get iconRightTemplate() {
    return html`
      <a id="icon-right" href=${this.mediatypeURL} target="_blank">
        <mediatype-icon
          .mediatype=${this.model?.mediatype}
          .collections=${this.model?.collections}
        >
        </mediatype-icon>
      </a>
    `;
  }

  private get titleTemplate() {
    if (!this.model?.title) {
      return nothing;
    }

    // If the model has a server-specified href, use it
    // Otherwise construct a details link using the identifier
    return this.model?.href
      ? html`<a href="${this.baseNavigationUrl}${this.model.href}"
          >${this.model.title ?? this.model.identifier}</a
        >`
      : this.detailsLink(this.model.identifier, this.model.title);
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
    // "Archivist since" if account
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
    const viewCount =
      this.sortParam?.field === 'week'
        ? this.model?.weeklyViewCount // weekly views
        : this.model?.viewCount; // all-time views

    return this.metadataTemplate(
      `${formatCount(viewCount ?? 0, this.formatSize)}`,
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
      // Sanitize away any HTML tags and convert line breaks to spaces.
      unsafeHTML(
        DOMPurify.sanitize(this.model?.description?.replace(/\n/g, ' ') ?? '')
      ),
      '',
      'description'
    );
  }

  private get textSnippetsTemplate(): TemplateResult | typeof nothing {
    if (!this.hasSnippets) return nothing;

    return html`<text-snippet-block
      viewsize="list"
      .snippets=${this.model?.snippets}
    ></text-snippet-block>`;
  }

  private get hasSnippets(): boolean {
    return !!this.model?.snippets?.length;
  }

  // Utility functions
  // eslint-disable-next-line default-param-last
  private metadataTemplate(text: any, label = '', id?: string) {
    if (!text) return nothing;
    return html`
      <div id=${ifDefined(id)} class="metadata">
        <p class="inline-wrap">${this.labelTemplate(label)} ${text}</p>
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

  private detailsLink(identifier: string, text?: string): TemplateResult {
    const linkText = text ?? identifier;
    // No whitespace after closing tag
    // identifiers (all ASCII in their creation) should be safe to use in href, but sanitize anyway
    return html`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(identifier)}"
      >${DOMPurify.sanitize(linkText)}</a
    >`;
  }

  /** The URL of this item's mediatype collection, if defined. */
  private get mediatypeURL(): string | typeof nothing {
    // NB: baseNavigationUrl can be an empty string
    if (this.baseNavigationUrl === undefined || !this.model?.mediatype)
      return nothing;

    // Need special handling for certain mediatypes that don't have a top-level collection page
    switch (this.model.mediatype) {
      case 'collection':
        return `${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;
      case 'account':
        return nothing;
      default:
        return `${this.baseNavigationUrl}/details/${encodeURI(
          this.model.mediatype
        )}`;
    }
  }

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
    const newCollectionLinks: TemplateResult[] = [];
    const promises: Promise<void>[] = [];
    for (const collection of this.model.collections) {
      // Don't include favorites or collections that are meant to be suppressed
      if (
        !suppressedCollections[collection] &&
        !collection.startsWith('fav-')
      ) {
        promises.push(
          this.collectionNameCache?.collectionNameFor(collection).then(name => {
            newCollectionLinks.push(
              this.detailsLink(collection, name ?? collection)
            );
          })
        );
      }
    }
    await Promise.all(promises);
    this.collectionLinks = newCollectionLinks;
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

      div a:link {
        color: var(--ia-theme-link-color, #4b64ff);
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

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        overflow-wrap: anywhere;
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

      #collections {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        overflow-wrap: anywhere;
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

      /*
       * If the container becomes very tiny, don't let the thumbnail side take
       * up too much space. Shouldn't make a difference on ordinary viewport sizes.
       */
      #list-line-left {
        max-width: 25%;

        display: flex;
        flex-direction: column;
        row-gap: 5px;
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
        column-gap: 10px;
      }

      /*
       * With the exception of the title line, allow these to wrap if
       * the space becomes too small to accommodate them together.
       * 
       * The title line is excluded because it contains the mediatype icon
       * which we don't want to wrap.
       */
      #item-line,
      #dates-line,
      #views-line {
        flex-wrap: wrap;
      }

      .inline-wrap {
        display: inline;
      }
    `;
  }
}
