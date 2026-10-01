import { css, html, nothing, TemplateResult } from 'lit';
import eyeIcon from '../assets/img/icons/eye';
import eyeClosedIcon from '../assets/img/icons/eye-closed';
import { msg, str } from '@lit/localize';
import {
  facetPluralTitles,
  facetTitles,
  type FacetOption,
  type FacetBucket,
  type FacetState,
} from '../models';
import type { CollectionTitles } from '../data-source/models';

export type FacetRowTemplateOptions = {
  /** The name of the facet group to which this facet belongs (e.g., "mediatype") */
  facetType: FacetOption;

  /** The facet bucket containing details about the state, count, and key for this row */
  bucket: FacetBucket;

  /** The collection name cache for converting collection identifiers to titles */
  collectionTitles?: CollectionTitles;

  /**
   * Whether to omit the negative/hide button from this facet row if possible.
   * Has no effect if the facet bucket is itself hidden, in which case the hide
   * button *must* be shown to represent the state accurately.
   */
  omitHideButton?: boolean;

  /**
   * Called when either checkbox is clicked. Leave it out when an ancestor
   * handles the rows' clicks by delegation instead.
   */
  onCheckboxClick?: (e: Event, negative: boolean) => void;
};

/**
 * Returns the composed facet state corresponding to a positive or negative facet's checked state
 */
export function getFacetState(checked: boolean, negative: boolean): FacetState {
  if (!checked) return 'none';
  return negative ? 'hidden' : 'selected';
}

/**
 * Template for a full facet row, including the positive/negative checks,
 * the display name, and the count. The row is plain DOM so that long lists
 * (e.g. the More... dialog) can render many rows without creating an
 * element per row. Render it inside a shadow root that includes
 * `facetRowStyles`.
 */
export function facetRowTemplate({
  facetType,
  bucket,
  collectionTitles,
  omitHideButton = false,
  onCheckboxClick,
}: FacetRowTemplateOptions): TemplateResult {
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
          ${collectionTitles?.get(bucket.key) ?? bucket.key}
        </a> `;

  const bucketCountText = bucket.count > 0 ? bucket.count.toLocaleString() : '';

  const facetHidden = bucket.state === 'hidden';
  const facetSelected = bucket.state === 'selected';

  const groupTitle = facetTitles[facetType];
  const groupPluralTitle = facetPluralTitles[facetType];
  const titleText = `${groupTitle}: ${bucket.displayText ?? bucket.key}`;
  const onlyShowText = facetSelected
    ? msg(str`Show all ${groupPluralTitle}`)
    : msg(str`Only show ${titleText}`);
  const hideText = msg(str`Hide ${titleText}`);
  const unhideText = msg(str`Unhide ${titleText}`);
  const showHideText = facetHidden ? unhideText : hideText;
  const ariaLabel = msg(str`${titleText}, ${bucket.count} results`);

  const showOnlyClicked = onCheckboxClick
    ? (e: Event) => onCheckboxClick(e, false)
    : undefined;
  const hideClicked = onCheckboxClick
    ? (e: Event) => onCheckboxClick(e, true)
    : undefined;

  // Added data-testid for Playwright testing
  return html`
    <div class="facet-row-container">
      <div class="facet-checkboxes">
        <input
          type="checkbox"
          .name=${facetType}
          .value=${bucket.key}
          @click=${showOnlyClicked}
          .checked=${facetSelected}
          class="select-facet-checkbox"
          title=${onlyShowText}
          id=${showOnlyCheckboxId}
          data-testid=${showOnlyCheckboxId}
        />
        <div
          class="hide-facet-container"
          ?hidden=${omitHideButton && !facetHidden}
        >
          <input
            type="checkbox"
            id=${negativeCheckboxId}
            .name=${facetType}
            .value=${bucket.key}
            @click=${hideClicked}
            .checked=${facetHidden}
            class="hide-facet-checkbox"
          />
          <label
            for=${negativeCheckboxId}
            class="hide-facet-icon${facetHidden ? ' active' : ''}"
            title=${showHideText}
            data-testid=${negativeCheckboxId}
          >
            <span class="sr-only">${showHideText}</span>
            <span class="eye eye-open">${eyeIcon}</span>
            <span class="eye eye-closed">${eyeClosedIcon}</span>
          </label>
        </div>
      </div>
      <label
        for=${showOnlyCheckboxId}
        class="facet-info-display"
        title=${onlyShowText}
        aria-label=${ariaLabel}
      >
        <div class="facet-title">${bucketTextDisplay}</div>
        <div class="facet-count">${bucketCountText}</div>
      </label>
    </div>
  `;
}

const facetRowBorderTop = css`var(--facet-row-border-top, 1px solid transparent)`;
const facetRowBorderBottom = css`var(--facet-row-border-bottom, 1px solid transparent)`;
const checkboxHeight = css`15px`;

/**
 * Styles for `facetRowTemplate`. Include `srOnlyStyle` alongside these.
 */
export const facetRowStyles = css`
  .facet-checkboxes {
    margin: 0 5px 0 0;
    display: flex;
    height: ${checkboxHeight};
  }
  .facet-checkboxes input:first-child {
    margin-right: 5px;
  }
  .facet-checkboxes input {
    height: ${checkboxHeight};
    width: ${checkboxHeight};
    margin: 0;
  }
  .facet-row-container {
    display: flex;
    font-weight: 500;
    font-size: 1.2rem;
    margin: 0 auto;
    padding: 0.25rem 0;
    height: auto;
    border-top: ${facetRowBorderTop};
    border-bottom: ${facetRowBorderBottom};
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
    position: absolute;
    clip: rect(0, 0, 0, 0);
    pointer-events: none;
  }
  .hide-facet-checkbox:focus-visible + .hide-facet-icon {
    outline-style: auto;
    outline-offset: 2px;
  }
  .hide-facet-icon {
    width: ${checkboxHeight};
    height: ${checkboxHeight};
    cursor: pointer;
    display: flex;
  }
  .eye {
    width: ${checkboxHeight};
    height: ${checkboxHeight};
    opacity: 0.3;
  }
  .hide-facet-icon:hover .eye,
  .active .eye {
    opacity: 1;
  }
  .hide-facet-icon:hover .eye-open,
  .hide-facet-icon .eye-closed {
    display: none;
  }
  .hide-facet-icon:hover .eye-closed,
  .hide-facet-icon.active .eye-closed {
    display: inline;
  }
  .hide-facet-icon.active .eye-open {
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
