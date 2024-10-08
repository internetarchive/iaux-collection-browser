import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import type { IaDropdown, optionInterface } from '@internetarchive/ia-dropdown';
import type { FacetBucket, FacetOption } from '../../models';

@customElement('smart-facet-dropdown')
export class SmartFacetDropdown extends LitElement {
  @property({ type: String }) facetType?: FacetOption;

  @property({ type: Array }) buckets?: FacetBucket[];

  @property({ type: Object }) activeBucket?: FacetBucket;

  @query('ia-dropdown') dropdown?: IaDropdown;

  //
  // COMPONENT LIFECYCLE METHODS
  //

  render() {
    if (!this.facetType || !this.buckets || !this.activeBucket) return nothing;
    if (this.buckets.length === 0) return nothing;

    const displayText = this.activeBucket.displayText ?? this.activeBucket.key;
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
            >${displayText}</span
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
      this.buckets?.map(bucket => ({
        id: bucket.key,
        label: bucket.displayText ?? bucket.key,
      })) ?? []
    );
  }

  private get activeDropdownOption(): optionInterface | undefined {
    if (!this.activeBucket) return undefined;
    return this.dropdownOptions.find(opt => opt.id === this.activeBucket?.key);
  }

  private optionSelected(e: CustomEvent<{ option: optionInterface }>): void {
    this.dispatchEvent(
      new CustomEvent('facetClick', {
        detail: {
          facetType: this.facetType,
          bucket: {
            ...this.buckets?.find(b => b.key === e.detail.option.id),
            state: 'selected',
          },
          negative: false,
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
