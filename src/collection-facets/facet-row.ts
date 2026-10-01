import { html, LitElement, TemplateResult, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import type {
  FacetOption,
  FacetBucket,
  FacetEventDetails,
  FacetState,
} from '../models';
import type { CollectionTitles } from '../data-source/models';
import { srOnlyStyle } from '../styles/sr-only';
import {
  facetRowStyles,
  facetRowTemplate,
  getFacetState,
} from './facet-row-template';

@customElement('facet-row')
@localized()
export class FacetRow extends LitElement {
  //
  // UI STATE
  //

  /** The name of the facet group to which this facet belongs (e.g., "mediatype") */
  @property({ type: String }) facetType?: FacetOption;

  /** The facet bucket containing details about the state, count, and key for this row */
  @property({ type: Object }) bucket?: FacetBucket;

  /**
   * Whether to omit the negative/hide button from this facet row if possible.
   * Has no effect if the facet bucket is itself hidden, in which case the hide
   * button *must* be shown to represent the state accurately.
   */
  @property({ type: Boolean, reflect: true }) omitHideButton = false;

  /** The collection name cache for converting collection identifiers to titles */
  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  //
  // COMPONENT LIFECYCLE METHODS
  //

  render() {
    return html`${this.facetRowTemplate}`;
  }

  //
  // TEMPLATE GETTERS
  //

  /**
   * Template for the full facet row, including the positive/negative checks,
   * the display name, and the count.
   */
  private get facetRowTemplate(): TemplateResult | typeof nothing {
    const { bucket, facetType } = this;
    if (!bucket || !facetType) return nothing;

    return facetRowTemplate({
      facetType,
      bucket,
      collectionTitles: this.collectionTitles,
      omitHideButton: this.omitHideButton,
      onCheckboxClick: (e, negative) => this.facetClicked(e, negative),
    });
  }

  //
  // EVENT HANDLERS & DISPATCHERS
  //

  /**
   * Handler for whenever this facet is clicked & its state changes
   */
  private facetClicked(e: Event, negative: boolean) {
    const { bucket, facetType } = this;
    if (!bucket || !facetType) return;

    const target = e.target as HTMLInputElement;
    const { checked } = target;
    this.bucket = {
      ...bucket,
      state: FacetRow.getFacetState(checked, negative),
    };

    this.dispatchFacetClickEvent({
      facetType,
      bucket: this.bucket,
      negative,
    });
  }

  /**
   * Emits a `facetClick` event with details about this facet & its current state
   */
  private dispatchFacetClickEvent(detail: FacetEventDetails) {
    const event = new CustomEvent<FacetEventDetails>('facetClick', {
      detail,
    });
    this.dispatchEvent(event);
  }

  //
  // OTHER METHODS
  //

  /**
   * Returns the composed facet state corresponding to a positive or negative facet's checked state
   */
  static getFacetState(checked: boolean, negative: boolean): FacetState {
    return getFacetState(checked, negative);
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    return [srOnlyStyle, facetRowStyles];
  }
}
