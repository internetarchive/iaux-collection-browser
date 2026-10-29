var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { drawerStyles } from './drawer-styles';
/** Values named per facet; the rest are counted as "+N more". */
const SHOWN_VALUES = 3;
/** A facet's values with at least one result. */
function valuesOf(buckets = []) {
    return buckets.filter(bucket => bucket.doc_count > 0);
}
/**
 * The demo's summary of the search service's own facets in the current
 * results: each group's top values with their counts, from the same
 * response the sidebar shows. Read-only: the sidebar filters. A drawer,
 * closed until opened; it stays as it was left across searches.
 */
let EtdFacetSummary = class EtdFacetSummary extends LitElement {
    constructor() {
        super(...arguments);
        /** The groups to summarize: the service's own, not collection-browser's. */
        this.groups = [];
    }
    render() {
        if (!this.groups.length)
            return nothing;
        return html `
      <details>
        <summary>Facets used in these results: ${this.usedText}</summary>
        <div class="body" aria-live="polite">${this.bodyTemplate}</div>
      </details>
    `;
    }
    /** The groups with a value in these results, named, for the drawer's bar. */
    get usedText() {
        const { facets } = this;
        if (!facets || facets.state === 'loading')
            return 'loading…';
        if (facets.state === 'failed')
            return "didn't load";
        const used = this.groups.filter(group => valuesOf(facets.aggregations[group.key]?.buckets).length);
        return used.length ? used.map(group => group.title).join(', ') : 'none';
    }
    get bodyTemplate() {
        const { facets } = this;
        if (!facets || facets.state === 'loading') {
            return html `<p class="note">Loading facets…</p>`;
        }
        if (facets.state === 'failed') {
            return html `<p class="note">Facets didn't load.</p>`;
        }
        return html `
      <dl>
        ${this.groups.map(group => {
            const values = valuesOf(facets.aggregations[group.key]?.buckets);
            return html `
            <div class="group" data-key=${group.key}>
              <dt>${group.title}</dt>
              <dd>${this.valuesTemplate(values)}</dd>
            </div>
          `;
        })}
      </dl>
    `;
    }
    valuesTemplate(values) {
        if (!values.length) {
            return html `<span class="note">none in these results</span>`;
        }
        const more = values.length - SHOWN_VALUES;
        return html `
      <ul>
        ${values.slice(0, SHOWN_VALUES).map(bucket => html `<li>
              ${bucket.key}
              <span class="count">${bucket.doc_count.toLocaleString()}</span>
            </li>`)}
      </ul>
      ${more > 0
            ? html `<span class="more"
            >+${more} more of the top ${values.length}</span
          >`
            : nothing}
    `;
    }
    static { this.styles = [
        drawerStyles,
        css `
      :host {
        display: block;
      }
      .body {
        padding: 0.6rem 0.8rem;
        border: 1px solid #c9d4e0;
        border-top: none;
      }
      dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
        margin: 0;
      }
      .group {
        display: contents;
      }
      dt {
        font-weight: bold;
      }
      dd {
        margin: 0;
      }
      ul {
        display: inline;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: inline;
      }
      li + li::before {
        content: ' · ';
      }
      .count,
      .more,
      .note {
        color: #555;
      }
      .more {
        margin-left: 0.5rem;
      }
      .note {
        margin: 0;
      }
    `,
    ]; }
};
__decorate([
    property({ attribute: false })
], EtdFacetSummary.prototype, "groups", void 0);
__decorate([
    property({ attribute: false })
], EtdFacetSummary.prototype, "facets", void 0);
EtdFacetSummary = __decorate([
    customElement('etd-facet-summary')
], EtdFacetSummary);
export { EtdFacetSummary };
