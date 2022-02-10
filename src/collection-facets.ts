import { Aggregation } from '@internetarchive/search-service';
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('collection-facets')
export class CollectionFacets extends LitElement {
  @property({ type: Object })
  aggregations?: Record<string, Aggregation>;

  render() {
    return html`
      <h1>Facets</h1>

      ${Object.keys(this.aggregations ?? {}).map(key => {
        const aggregation = this.aggregations?.[key];
        if (!aggregation) return nothing;
        return this.getFacetTemplate(key, aggregation);
      })}
    `;
  }

  getFacetTemplate(key: string, aggregation: Aggregation) {
    const buckets = aggregation?.buckets ?? [];
    const title = this.getTitleFromKey(key);
    return html`
      <h2>${title}</h2>
      ${buckets.slice(0, 5).map(
        bucket => html`
          <label class="facet-row">
            <div class="facet-checkbox">
              <input
                type="checkbox"
                .name=${title}
                .value=${bucket.key}
                @click=${this.facetToggled}
              />
            </div>
            <div class="facet-title">${bucket.key}</div>
            <div class="facet-count">${bucket.doc_count}</div>
          </label>
        `
      )}
    `;
  }

  private facetToggled(e: Event) {
    const target = e.target as HTMLInputElement;
    const { name, value, checked } = target;
    const eventName = checked ? 'facetChecked' : 'facetUnchecked';
    const event = new CustomEvent<{ name: string; value: string }>(eventName, {
      detail: {
        name,
        value,
      },
    });
    this.dispatchEvent(event);
  }

  /**
   * Parse the aggregate key title into the human readable title
   *
   * Example: user_aggs__terms__field:mediatypeSorter__size:6 => Media Type
   *
   * @param key
   * @returns
   */
  private getTitleFromKey(key: string): string {
    const parts = key.split('__');
    const fieldNamePart = parts[2];
    const fieldName = fieldNamePart.split(':')[1];
    const sorterRemoved = fieldName.replace('Sorter', '');
    return sorterRemoved;
  }

  static get styles() {
    return css`
      .facet-row {
        display: flex;
      }

      .facet-title {
        flex: 1;
      }

      .facet-count {
        margin-left: 0.5rem;
      }
    `;
  }
}
