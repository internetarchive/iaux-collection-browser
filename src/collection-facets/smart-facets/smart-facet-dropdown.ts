import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { IaDropdown, optionInterface } from '@internetarchive/ia-dropdown';
import type { FacetRef, SmartFacet, SmartFacetEvent } from './models';
import { log } from '../../utils/log';

@customElement('smart-facet-dropdown')
export class SmartFacetDropdown extends LitElement {
  @property({ type: Array }) facetInfo?: SmartFacet[];

  @property({ type: String }) labelPrefix?: string;

  @property({ type: Object }) activeFacetRef?: FacetRef;

  @query('ia-dropdown') dropdown?: IaDropdown;

  //
  // COMPONENT LIFECYCLE METHODS
  //

  render() {
    if (!this.facetInfo || !this.activeFacetRef) return nothing;
    if (this.facetInfo.length === 0) return nothing;

    const displayText =
      this.activeFacetRef.displayText ?? this.activeFacetRef.bucketKey;
    if (!displayText) return nothing;

    return html`
      <div class="dropdown-container">
        <ia-dropdown
          class="dropdown"
          displayCaret
          closeOnSelect
          closeOnEscape
          closeOnBackdropClick
          includeSelectedOption
          .options=${this.dropdownOptions}
          .selectedOption=${this.activeDropdownOption}
          .openViaButton=${false}
          @optionSelected=${this.optionSelected}
          @click=${this.onDropdownClick}
        >
          <span
            class="dropdown-label"
            slot="dropdown-label"
            @click=${this.defaultOptionSelected}
            >${this.labelPrefix ?? nothing} ${displayText}</span
          >
        </ia-dropdown>
      </div>
    `;
  }

  //
  // OTHER METHODS
  //

  private get dropdownOptions(): optionInterface[] {
    return (
      this.facetInfo?.map(smartFacet => {
        const firstFacet = smartFacet.facets[0];
        return {
          id: firstFacet.bucketKey,
          label: html`<span>
            ${smartFacet.label ??
            firstFacet.displayText ??
            firstFacet.bucketKey}
          </span>`,
        };
      }) ?? []
    );
  }

  private get activeDropdownOption(): optionInterface | undefined {
    if (!this.activeFacetRef) return undefined;
    return this.dropdownOptions.find(
      opt => opt.id === this.activeFacetRef?.bucketKey,
    );
  }

  /**
   * Handler for when the default option on the dropdown button is clicked
   */
  private defaultOptionSelected(): void {
    this.handleSelection(this.activeFacetRef?.bucketKey);
  }

  /**
   * Handler for when an option in the dropdown menu is selected
   */
  private optionSelected(e: CustomEvent<{ option: optionInterface }>): void {
    this.handleSelection(e.detail.option.id);
  }

  /**
   * Responds to a dropdown selection by emitting a `facetClick` event with
   * the appropriate facet details.
   */
  private handleSelection(bucketKey?: string): void {
    if (!bucketKey || !this.facetInfo || !this.activeFacetRef) return;

    let selectedSmartFacet;
    for (const smartFacet of this.facetInfo) {
      const selectedRef = smartFacet.facets.find(
        b => b.bucketKey === bucketKey,
      );
      if (selectedRef) {
        this.activeFacetRef = selectedRef;
        selectedSmartFacet = smartFacet;
      }
    }

    if (!selectedSmartFacet) return;

    this.dispatchEvent(
      new CustomEvent<SmartFacetEvent>('facetClick', {
        detail: {
          smartFacet: selectedSmartFacet,
          details: [
            {
              facetType: this.activeFacetRef.facetType,
              bucket: {
                key: this.activeFacetRef.bucketKey,
                count: 0,
                state: 'selected',
              },
              negative: false,
            },
          ],
        },
      }),
    );
  }

  private onDropdownClick(): void {
    log('smart dropdown: onDropdownClick', this);
    this.dispatchEvent(
      new CustomEvent<SmartFacetDropdown>('dropdownClick', { detail: this }),
    );
  }

  close(): void {
    if (this.dropdown) {
      this.dropdown.open = false;
    }
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    return css`
      .dropdown-container {
        padding: 5px 5px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
      }

      .dropdown-label {
        font-size: 1.4rem;
        font-family: inherit;
      }

      .dropdown {
        --dropdownBorderColor: #194880;
        --dropdownBorderWidth: 1px;
        --dropdownBgColor: white;
        --dropdownHoverBgColor: #f8f8f8;
        --dropdownTextColor: #2c2c2c;
        --dropdownHoverTextColor: #2c2c2c;
        --dropdownCaretColor: #2c2c2c;
        --dropdownWhiteSpace: nowrap;
        --caretWidth: 14px;
        --caretHeight: 14px;
      }
    `;
  }
}
