import { css, html, nothing, PropertyValues, TemplateResult } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import DOMPurify from 'dompurify';

import type { SortParam } from '@internetarchive/search-service';
import { suppressedCollections } from '../../models';
import type { CollectionTitles } from '../../data-source/models';
import { BaseTileComponent } from '../base-tile-component';

import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import { isFirstMillisecondOfUTCYear } from '../../utils/local-date-from-utc';

import '../image-block';
import '../review-block';
import '../text-snippet-block';
import '../tile-mediatype-icon';

@customElement('tile-list')
export class TileList extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - currentWidth?: number;
   *  - currentHeight?: number;
   *  - baseNavigationUrl?: string;
   *  - baseImageUrl?: string;
   *  - collectionPagePath?: string;
   *  - sortParam: SortParam | null = null;
   *  - defaultSortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   *  - suppressBlurring = false;
   */

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  @state() private collectionLinks: (TemplateResult | typeof nothing)[] = [];

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

    const isCollection = this.model.mediatype === 'collection';
    const href = this.displayValueProvider.itemPageUrl(
      this.model.identifier,
      isCollection,
    );

    return html`<a title=${msg('View ' + this.model?.title)} href=${href}>
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isCompactTile=${false}
        .isListTile=${true}
        .viewSize=${this.classSize}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    </a> `;
  }

  private get detailsTemplate() {
    return html`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
        ${this.webArchivesCaptureDatesTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate} ${this.textSnippetsTemplate}
      ${this.reviewBlockTemplate}
    `;
  }

  // Data templates
  private get iconRightTemplate() {
    return html`
      <a
        id="icon-right"
        href=${this.mediatypeURL}
        title=${msg('See more: ' + this.model?.mediatype)}
      >
        <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
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
      : this.detailsLink(
          this.model.identifier,
          this.model.title,
          this.model.mediatype === 'collection',
        );
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
        ${this.labelTemplate(msg('Source'))}
        ${this.searchLink('source', this.model.source)}
      </div>
    `;
  }

  private get volumeTemplate() {
    return this.metadataTemplate(this.model?.volume, msg('Volume'));
  }

  private get issueTemplate() {
    return this.metadataTemplate(this.model?.issue, msg('Issue'));
  }

  private get creatorTemplate() {
    // "Archivist since" if account
    if (this.model?.mediatype === 'account') {
      return html`
        <div id="creator" class="metadata">
          <span class="label"
            >${this.displayValueProvider.accountLabel ?? nothing}</span
          >
        </div>
      `;
    }
    // "Creator" if not account tile
    if (!this.model?.creators || this.model.creators.length === 0) {
      return nothing;
    }
    return html`
      <div id="creator" class="metadata">
        ${this.labelTemplate(msg('By'))}
        ${join(
          map(this.model.creators, id => this.searchLink('creator', id)),
          ', ',
        )}
      </div>
    `;
  }

  private get datePublishedTemplate() {
    // If we're showing a date published of Jan 1 at midnight, only show the year.
    // This is because items with only a year for their publication date are normalized to
    // Jan 1 at midnight timestamps in the search engine documents.
    const date: Date | undefined = this.model?.datePublished;
    let format: DateFormat = 'long';
    if (isFirstMillisecondOfUTCYear(date)) {
      format = 'year-only';
    }

    return this.metadataTemplate(formatDate(date, format), msg('Published'));
  }

  // Show date label/value when sorted by date type
  // Except datePublished which is always shown
  private get dateSortByTemplate() {
    if (
      this.effectiveSort &&
      (this.effectiveSort.field === 'addeddate' ||
        this.effectiveSort.field === 'reviewdate' ||
        this.effectiveSort.field === 'publicdate')
    ) {
      return this.metadataTemplate(
        formatDate(this.date, 'long'),
        this.displayValueProvider.dateLabel,
      );
    }
    return nothing;
  }

  private get viewsTemplate() {
    const viewCount =
      this.effectiveSort?.field === 'week'
        ? this.model?.weeklyViewCount // weekly views
        : this.model?.viewCount; // all-time views
    if (viewCount == null) return nothing;

    // when its a search-tile, we don't have any stats to show
    if (this.model?.mediatype === 'search') {
      return this.metadataTemplate('(Favorited search query)', '');
    }

    return this.metadataTemplate(
      `${formatCount(viewCount, this.formatSize)}`,
      msg('Views'),
    );
  }

  private get ratingTemplate() {
    return this.metadataTemplate(this.model?.averageRating, msg('Avg Rating'));
  }

  private get reviewsTemplate() {
    return this.metadataTemplate(this.model?.commentCount, msg('Reviews'));
  }

  private get topicsTemplate() {
    if (!this.model?.subjects || this.model.subjects.length === 0) {
      return nothing;
    }
    return html`
      <div id="topics" class="metadata">
        ${this.labelTemplate(msg('Topics'))}
        ${join(
          map(this.model.subjects, id => this.searchLink('subject', id)),
          ', ',
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
        ${this.labelTemplate(msg('Collections'))}
        ${join(this.collectionLinks, ', ')}
      </div>
    `;
  }

  private get descriptionTemplate() {
    return this.metadataTemplate(
      // Sanitize away any HTML tags and convert line breaks to spaces.
      unsafeHTML(
        DOMPurify.sanitize(this.model?.description?.replace(/\n/g, ' ') ?? ''),
      ),
      '',
      'description',
    );
  }

  private get reviewBlockTemplate(): TemplateResult | typeof nothing {
    if (!this.model?.review) return nothing;

    const { reviewtitle, reviewbody, stars } = this.model.review;
    return html`
      <review-block
        viewsize="list"
        title=${ifDefined(reviewtitle)}
        body=${ifDefined(reviewbody)}
        starRating=${ifDefined(stars)}
      >
      </review-block>
    `;
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

  private get webArchivesCaptureDatesTemplate():
    | TemplateResult
    | typeof nothing {
    if (!this.model?.captureDates || !this.model.title) return nothing;

    return html`
      <ul class="capture-dates">
        ${map(
          this.model.captureDates,
          date =>
            html`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(
                this.model!.title,
                date,
              )}
            </li>`,
        )}
      </ul>
    `;
  }

  // Utility functions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    return html`<a
      href="${this.baseNavigationUrl}/search?query=${query}"
      rel="nofollow"
    >
      ${DOMPurify.sanitize(searchTerm)}</a
    >`;
  }

  private detailsLink(
    identifier?: string,
    text?: string,
    isCollection = false,
  ): TemplateResult | typeof nothing {
    if (!identifier) return nothing;

    const linkText = text ?? identifier;
    const linkHref = this.displayValueProvider.itemPageUrl(
      identifier,
      isCollection,
    );

    return html`<a href=${linkHref}> ${DOMPurify.sanitize(linkText)} </a>`;
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
        return this.displayValueProvider.itemPageUrl(
          this.model.mediatype,
          true,
        );
    }
  }

  protected updated(changed: PropertyValues): void {
    if (changed.has('model') || changed.has('collectionTitles')) {
      this.buildCollectionLinks();
    }
  }

  private async buildCollectionLinks() {
    if (!this.model?.collections || this.model.collections.length === 0) {
      return;
    }

    // Note: quirk of Lit: need to replace collectionLinks array,
    // otherwise it will not re-render. Can't simply alter the array.
    this.collectionLinks = [];
    const newCollectionLinks: (TemplateResult | typeof nothing)[] = [];
    for (const collection of this.model.collections) {
      // Don't include favorites or collections that are meant to be suppressed
      if (
        !suppressedCollections[collection] &&
        !collection.startsWith('fav-')
      ) {
        newCollectionLinks.push(
          this.detailsLink(
            collection,
            this.collectionTitles?.get(collection) ?? collection,
            true,
          ),
        );
      }
    }
    this.collectionLinks = newCollectionLinks;
  }

  /*
   * TODO: fix field names to match model in src/collection-browser.ts
   * private get dateSortSelector()
   * @see src/models.ts
   */
  private get date(): Date | undefined {
    switch (this.effectiveSort?.field) {
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

  /**
   * Returns the active sort param if one is set, or the default sort param otherwise.
   */
  private get effectiveSort(): SortParam | null {
    return this.sortParam ?? this.defaultSortParam;
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

  private get formatSize(): NumberFormat {
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

        /*
         * Safari doesn't always respect the line-clamping rules above,
         * so we add this to ensure these fields still get truncated
         */
        max-height: 60px;
      }

      #collections {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        overflow-wrap: anywhere;
      }

      #collections > a {
        display: inline-block;
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

      .capture-dates {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }

      .capture-dates a:link {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      .capture-dates a:hover {
        text-decoration: underline;
      }
    `;
  }
}
