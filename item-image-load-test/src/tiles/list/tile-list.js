import { __decorate } from "tslib";
import { css, html, LitElement, nothing, } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { join } from 'lit/directives/join.js';
import { map } from 'lit/directives/map.js';
import { customElement, property, state } from 'lit/decorators.js';
import DOMPurify from 'dompurify';
import { dateLabel } from './date-label';
import { accountLabel } from './account-label';
import { formatCount } from '../../utils/format-count';
import { formatDate } from '../../utils/format-date';
import '../mediatype-icon';
import '../item-tile-image';
let TileList = class TileList extends LitElement {
    constructor() {
        super(...arguments);
        this.sortParam = null;
        this.collectionLinks = [];
    }
    updated(changed) {
        if (changed.has('model')) {
            this.fetchCollectionNames();
        }
    }
    async fetchCollectionNames() {
        var _a, _b;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.collections) ||
            this.model.collections.length === 0 ||
            !this.collectionNameCache) {
            return;
        }
        // Note: quirk of Lit: need to replace collectionLinks array,
        // otherwise it will not re-render. Can't simply alter the array.
        this.collectionLinks = [];
        const newCollellectionLinks = [];
        const promises = [];
        for (const collection of this.model.collections) {
            promises.push((_b = this.collectionNameCache) === null || _b === void 0 ? void 0 : _b.collectionNameFor(collection).then(name => {
                newCollellectionLinks.push(this.detailsLink(collection, name !== null && name !== void 0 ? name : collection));
            }));
        }
        await Promise.all(promises);
        this.collectionLinks = newCollellectionLinks;
    }
    render() {
        return html `
      <div id="list-line" class="${this.classSize}">
        ${this.classSize === 'mobile'
            ? this.mobileTemplate
            : this.desktopTemplate}
      </div>
    `;
    }
    get mobileTemplate() {
        var _a;
        return html `
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${ifDefined((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
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
    get desktopTemplate() {
        var _a;
        return html `
      <div id="list-line-left">
        <div id="thumb" class="${ifDefined((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
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
    get detailsTemplate() {
        return html `
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
    get imgTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
            return nothing;
        }
        return html `
      <item-tile-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
      >
      </item-tile-image>
    `;
    }
    get iconRightTemplate() {
        var _a, _b;
        return html `
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${(_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype}
          .collections=${(_b = this.model) === null || _b === void 0 ? void 0 : _b.collections}
          style="--iconCustomFillColor: ${ifDefined(this.collectionColor)}"
        >
        </mediatype-icon>
      </div>
    `;
    }
    // Only in list, not tile
    get collectionColor() {
        var _a;
        if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) !== 'collection') {
            return undefined;
        }
        return '#4666FF';
    }
    get titleTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.title)) {
            return nothing;
        }
        return html ` ${this.detailsLink(this.model.identifier, this.model.title)} `;
    }
    get itemLineTemplate() {
        const source = this.sourceTemplate;
        const volume = this.volumeTemplate;
        const issue = this.issueTemplate;
        if (!source && !volume && !issue) {
            return nothing;
        }
        return html ` <div id="item-line">${source} ${volume} ${issue}</div> `;
    }
    get sourceTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.source)) {
            return nothing;
        }
        return html `
      <div id="source" class="metadata">
        ${this.labelTemplate('Source')}
        ${this.searchLink('source', this.model.source)}
      </div>
    `;
    }
    get volumeTemplate() {
        var _a;
        return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.volume, 'Volume');
    }
    get issueTemplate() {
        var _a;
        return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.issue, 'Issue');
    }
    get creatorTemplate() {
        var _a, _b, _c;
        // "Achivist since" if account
        if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) === 'account') {
            return html `
        <div id="creator" class="metadata">
          <span class="label"> ${accountLabel((_b = this.model) === null || _b === void 0 ? void 0 : _b.dateAdded)} </span>
        </div>
      `;
        }
        // "Creator" if not account tile
        if (!((_c = this.model) === null || _c === void 0 ? void 0 : _c.creators) || this.model.creators.length === 0) {
            return nothing;
        }
        return html `
      <div id="creator" class="metadata">
        ${this.labelTemplate('By')}
        ${join(map(this.model.creators, id => this.searchLink('creator', id)), html `, `)}
      </div>
    `;
    }
    get datePublishedTemplate() {
        var _a;
        return this.metadataTemplate(formatDate((_a = this.model) === null || _a === void 0 ? void 0 : _a.datePublished, 'long'), 'Published');
    }
    // Show date label/value when sorted by date type
    // Except datePublished which is always shown
    get dateSortByTemplate() {
        if (this.sortParam &&
            (this.sortParam.field === 'addeddate' ||
                this.sortParam.field === 'reviewdate' ||
                this.sortParam.field === 'publicdate')) {
            return this.metadataTemplate(formatDate(this.date, 'long'), dateLabel(this.sortParam.field));
        }
        return nothing;
    }
    get viewsTemplate() {
        var _a, _b;
        return this.metadataTemplate(`${formatCount((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.viewCount) !== null && _b !== void 0 ? _b : 0, this.formatSize)}`, 'Views');
    }
    get ratingTemplate() {
        var _a;
        return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.averageRating, 'Avg Rating');
    }
    get reviewsTemplate() {
        var _a;
        return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.commentCount, 'Reviews');
    }
    get topicsTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.subjects) || this.model.subjects.length === 0) {
            return nothing;
        }
        return html `
      <div id="topics" class="metadata">
        ${this.labelTemplate('Topics')}
        ${join(map(this.model.subjects, id => this.searchLink('subject', id)), html `, `)}
      </div>
    `;
    }
    get collectionsTemplate() {
        if (!this.collectionLinks || this.collectionLinks.length === 0) {
            return nothing;
        }
        return html `
      <div id="collections" class="metadata">
        ${this.labelTemplate('Collections')}
        ${join(this.collectionLinks, html `, `)}
      </div>
    `;
    }
    get descriptionTemplate() {
        var _a, _b;
        return this.metadataTemplate(DOMPurify.sanitize((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : ''), '', 'description');
    }
    // Utility functions
    metadataTemplate(text, label = '', id) {
        if (!text)
            return nothing;
        return html `
      <div id=${ifDefined(id)} class="metadata">
        ${this.labelTemplate(label)} ${text}
      </div>
    `;
    }
    labelTemplate(label) {
        return html ` ${label
            ? html `<span class="label">${label}: </span>`
            : nothing}`;
    }
    searchLink(field, searchTerm) {
        if (!field || !searchTerm) {
            return nothing;
        }
        const query = encodeURIComponent(`${field}:"${searchTerm}"`);
        // No whitespace after closing tag
        // Note: single ' for href='' to wrap " in query var gets changed back by yarn format
        // eslint-disable-next-line lit/no-invalid-html
        return html `<a href="${this.baseNavigationUrl}/search.php?query=${query}">
      ${DOMPurify.sanitize(searchTerm)}</a
    >`;
    }
    detailsLink(identifier, text) {
        const linkText = text !== null && text !== void 0 ? text : identifier;
        // No whitespace after closing tag
        // identifiers (all ASCII in their creation) should be safe to use in href, but sanitize anyway
        return html `<a
      href="${this.baseNavigationUrl}/details/${encodeURI(identifier)}"
      >${DOMPurify.sanitize(linkText)}</a
    >`;
    }
    /*
     * TODO: fix field names to match model in src/collection-browser.ts
     * private get dateSortSelector()
     * @see src/models.ts
     */
    get date() {
        var _a, _b, _c, _d, _e;
        switch ((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field) {
            case 'date':
                return (_b = this.model) === null || _b === void 0 ? void 0 : _b.datePublished;
            case 'reviewdate':
                return (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateReviewed;
            case 'addeddate':
                return (_d = this.model) === null || _d === void 0 ? void 0 : _d.dateAdded;
            default:
                return (_e = this.model) === null || _e === void 0 ? void 0 : _e.dateArchived; // publicdate
        }
    }
    get classSize() {
        if (this.mobileBreakpoint &&
            this.currentWidth &&
            this.currentWidth < this.mobileBreakpoint) {
            return 'mobile';
        }
        return 'desktop';
    }
    get formatSize() {
        if (this.mobileBreakpoint &&
            this.currentWidth &&
            this.currentWidth < this.mobileBreakpoint) {
            return 'short';
        }
        return 'long';
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: Object })
], TileList.prototype, "model", void 0);
__decorate([
    property({ type: String })
], TileList.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: Object })
], TileList.prototype, "collectionNameCache", void 0);
__decorate([
    property({ type: Number })
], TileList.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Number })
], TileList.prototype, "currentHeight", void 0);
__decorate([
    property({ type: Object })
], TileList.prototype, "sortParam", void 0);
__decorate([
    property({ type: Number })
], TileList.prototype, "mobileBreakpoint", void 0);
__decorate([
    state()
], TileList.prototype, "collectionLinks", void 0);
__decorate([
    property({ type: String })
], TileList.prototype, "baseImageUrl", void 0);
TileList = __decorate([
    customElement('tile-list')
], TileList);
export { TileList };
//# sourceMappingURL=tile-list.js.map