import {
  css,
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import eyeIcon from '../assets/img/icons/eye';
import eyeClosedIcon from '../assets/img/icons/eye-closed';
import type {
  FacetOption,
  FacetBucket,
  FacetEventDetails,
  FacetState,
} from '../models';
import type { CollectionTitles } from '../data-source/models';

@customElement('facet-row')
export class FacetRow extends LitElement {
  //
  // UI STATE
  //

  /** The name of the facet group to which this facet belongs (e.g., "mediatype") */
  @property({ type: String }) facetType?: FacetOption;

  /** The facet bucket containing details about the state, count, and key for this row */
  @property({ type: Object }) bucket?: FacetBucket;

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

    const showOnlyCheckboxId = `${facetType}:${bucket.key}-show-only`;
    const negativeCheckboxId = `${facetType}:${bucket.key}-negative`;

    const extraNoteSpan = bucket.extraNote
      ? html`<span class="facet-note">${bucket.extraNote}</span>`
      : nothing;

    // For collections, we render the collection title as a link.
    // For other facet types, we just have a static value to use.
    const bucketTextDisplay =
      facetType !== 'collection'
        ? html`${bucket.displayText ?? bucket.key} ${extraNoteSpan}`
        : html`<a href="/details/${bucket.key}">
            ${this.collectionTitles?.get(bucket.key) ?? bucket.key}
          </a> `;

    const facetHidden = bucket.state === 'hidden';
    const facetSelected = bucket.state === 'selected';

    const titleText = `${facetType}: ${bucket.displayText ?? bucket.key}`;
    const onlyShowText = facetSelected
      ? `Show all ${facetType}s`
      : `Only show ${titleText}`;
    const hideText = `Hide ${titleText}`;
    const unhideText = `Unhide ${titleText}`;
    const showHideText = facetHidden ? unhideText : hideText;
    const ariaLabel = `${titleText}, ${bucket.count} results`;

    // Added data-testid for Playwright testing
    return html`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${facetType}
            .value=${bucket.key}
            @click=${(e: Event) => {
              this.facetClicked(e, false);
            }}
            .checked=${facetSelected}
            class="select-facet-checkbox"
            title=${onlyShowText}
            id=${showOnlyCheckboxId}
            data-testid=${showOnlyCheckboxId}
          />
          <input
            type="checkbox"
            id=${negativeCheckboxId}
            .name=${facetType}
            .value=${bucket.key}
            @click=${(e: Event) => {
              this.facetClicked(e, true);
            }}
            .checked=${facetHidden}
            class="hide-facet-checkbox"
          />
          <label
            for=${negativeCheckboxId}
            class="hide-facet-icon${facetHidden ? ' active' : ''}"
            title=${showHideText}
            data-testid=${negativeCheckboxId}
          >
            <span class="eye">${eyeIcon}</span>
            <span class="eye-closed">${eyeClosedIcon}</span>
          </label>
        </div>
        <label
          for=${showOnlyCheckboxId}
          class="facet-info-display"
          title=${onlyShowText}
          aria-label=${ariaLabel}
        >
          <div class="facet-title">${bucketTextDisplay}</div>
          <div class="facet-count">${bucket.count.toLocaleString()}</div>
        </label>
      </div>
    `;
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
    let state: FacetState;
    if (checked) {
      state = negative ? 'hidden' : 'selected';
    } else {
      state = 'none';
    }
    return state;
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    const facetRowBorderTop = css`var(--facet-row-border-top, 1px solid transparent)`;
    const facetRowBorderBottom = css`var(--facet-row-border-bottom, 1px solid transparent)`;

    return css`
      async-collection-name {
        display: contents;
      }
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: 15px;
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: 15px;
        width: 15px;
        margin: 0;
      }
      .facet-row-container {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 2.5px auto;
        height: auto;
        border-top: ${facetRowBorderTop};
        border-bottom: ${facetRowBorderBottom};
        overflow: hidden;
      }
      .facet-info-display {
        display: flex;
        flex: 1 1 0%;
        cursor: pointer;
        flex-wrap: wrap;
      }
      .facet-title {
        word-break: break-word;
        display: inline-block;
        flex: 1 1 0%;
      }
      .facet-note {
        color: #bbb;
      }
      .facet-count {
        text-align: right;
      }
      .select-facet-checkbox {
        cursor: pointer;
        display: inline-block;
      }
      .hide-facet-checkbox {
        display: none;
      }
      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
        opacity: 0.3;
        display: inline-block;
      }
      .hide-facet-icon:hover,
      .active {
        opacity: 1;
      }
      .hide-facet-icon:hover .eye,
      .hide-facet-icon .eye-closed {
        display: none;
      }
      .hide-facet-icon:hover .eye-closed,
      .hide-facet-icon.active .eye-closed {
        display: inline;
      }
      .hide-facet-icon.active .eye {
        display: none;
      }
      .sorting-icon {
        cursor: pointer;
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `;
  }
}
