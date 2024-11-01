import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { IaDropdown, optionInterface } from '@internetarchive/ia-dropdown';
import type { FacetRef, SmartFacet, SmartFacetEvent } from './models';

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
          openViaButton
          closeOnSelect
          includeSelectedOption
          .options=${this.dropdownOptions}
          .selectedOption=${this.activeDropdownOption}
          @optionSelected=${this.optionSelected}
        >
          <span class="dropdown-label" slot="dropdown-label"
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
          label:
            smartFacet.label ?? firstFacet.displayText ?? firstFacet.bucketKey,
        };
      }) ?? []
    );
  }

  private get activeDropdownOption(): optionInterface | undefined {
    if (!this.activeFacetRef) return undefined;
    return this.dropdownOptions.find(
      opt => opt.id === this.activeFacetRef?.bucketKey
    );
  }

  private optionSelected(e: CustomEvent<{ option: optionInterface }>): void {
    if (!this.facetInfo || !this.activeFacetRef) return;

    let selectedSmartFacet;
    for (const smartFacet of this.facetInfo) {
      const selectedRef = smartFacet.facets.find(
        b => b.bucketKey === e.detail.option.id
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
      })
    );
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    return css`
      .dropdown-container {
        padding: 5px 8px;
        border-radius: 5px;
        background: #194880;
        color: white;
        font-size: 1.6rem;
        font-family: inherit;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
      }

      .dropdown-label {
        font-size: 1.6rem;
        font-family: inherit;
      }

      .dropdown {
        --dropdownBorderWidth: 5px;
        --dropdownBorderColor: transparent;
        --caretWidth: 14px;
        --caretHeight: 14px;
      }
    `;
  }
}
