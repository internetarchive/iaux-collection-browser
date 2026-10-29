import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { Bucket } from '@internetarchive/search-service';
import type { ExtraFacetGroup } from '../../models';
import type { ObservedFacets } from './observe-facets';

/** Values named per facet; the rest are counted as "+N more". */
const SHOWN_VALUES = 3;

/**
 * The demo's summary of the search service's own facets in the current
 * results: each group's top values with their counts, from the same
 * response the sidebar shows. Read-only: the sidebar filters.
 */
@customElement('etd-facet-summary')
export class EtdFacetSummary extends LitElement {
  /** The groups to summarize: the service's own, not collection-browser's. */
  @property({ attribute: false }) groups: readonly ExtraFacetGroup[] = [];

  @property({ attribute: false }) facets?: ObservedFacets;

  render() {
    if (!this.groups.length) return nothing;
    return html`
      <section aria-labelledby="heading">
        <h3 id="heading">Facets in these results</h3>
        <div aria-live="polite">${this.bodyTemplate}</div>
      </section>
    `;
  }

  private get bodyTemplate() {
    const { facets } = this;
    if (!facets || facets.state === 'loading') {
      return html`<p class="note">Loading facets…</p>`;
    }
    if (facets.state === 'failed') {
      return html`<p class="note">Facets didn't load.</p>`;
    }
    return html`
      <dl>
        ${this.groups.map(group => {
          const buckets = (facets.aggregations[group.key]?.buckets ??
            []) as Bucket[];
          return html`
            <div class="group" data-key=${group.key}>
              <dt>${group.title}</dt>
              <dd>${this.valuesTemplate(buckets)}</dd>
            </div>
          `;
        })}
      </dl>
    `;
  }

  private valuesTemplate(buckets: Bucket[]) {
    const values = buckets.filter(bucket => bucket.doc_count > 0);
    if (!values.length) {
      return html`<span class="note">none in these results</span>`;
    }
    const more = values.length - SHOWN_VALUES;
    return html`
      <ul>
        ${values.slice(0, SHOWN_VALUES).map(
          bucket =>
            html`<li>
              ${bucket.key}
              <span class="count">${bucket.doc_count.toLocaleString()}</span>
            </li>`,
        )}
      </ul>
      ${more > 0
        ? html`<span class="more"
            >+${more} more of the top ${values.length}</span
          >`
        : nothing}
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    h3 {
      margin: 0 0 0.4rem;
      font-size: 1rem;
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
  `;
}
