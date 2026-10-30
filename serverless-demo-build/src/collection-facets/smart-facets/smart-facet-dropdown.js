var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { log } from '../../utils/log';
let SmartFacetDropdown = class SmartFacetDropdown extends LitElement {
    //
    // COMPONENT LIFECYCLE METHODS
    //
    render() {
        if (!this.facetInfo || !this.activeFacetRef)
            return nothing;
        if (this.facetInfo.length === 0)
            return nothing;
        const displayText = this.activeFacetRef.displayText ?? this.activeFacetRef.bucketKey;
        if (!displayText)
            return nothing;
        return html `
      <div class="dropdown-container">
        <ia-dropdown
          class="dropdown"
          displayCaret
          closeOnSelect
          closeOnEscape
          closeOnBackdropClick
          includeSelectedOption
          usePopover
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
    get dropdownOptions() {
        return (this.facetInfo?.map(smartFacet => {
            const firstFacet = smartFacet.facets[0];
            return {
                id: firstFacet.bucketKey,
                label: html `<span>
            ${smartFacet.label ??
                    firstFacet.displayText ??
                    firstFacet.bucketKey}
          </span>`,
            };
        }) ?? []);
    }
    get activeDropdownOption() {
        if (!this.activeFacetRef)
            return undefined;
        return this.dropdownOptions.find(opt => opt.id === this.activeFacetRef?.bucketKey);
    }
    /**
     * Handler for when the default option on the dropdown button is clicked
     */
    defaultOptionSelected() {
        this.handleSelection(this.activeFacetRef?.bucketKey);
    }
    /**
     * Handler for when an option in the dropdown menu is selected
     */
    optionSelected(e) {
        this.handleSelection(e.detail.option.id);
    }
    /**
     * Responds to a dropdown selection by emitting a `facetClick` event with
     * the appropriate facet details.
     */
    handleSelection(bucketKey) {
        if (!bucketKey || !this.facetInfo || !this.activeFacetRef)
            return;
        let selectedSmartFacet;
        for (const smartFacet of this.facetInfo) {
            const selectedRef = smartFacet.facets.find(b => b.bucketKey === bucketKey);
            if (selectedRef) {
                this.activeFacetRef = selectedRef;
                selectedSmartFacet = smartFacet;
            }
        }
        if (!selectedSmartFacet)
            return;
        this.dispatchEvent(new CustomEvent('facetClick', {
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
        }));
    }
    onDropdownClick() {
        log('smart dropdown: onDropdownClick', this);
        this.dispatchEvent(new CustomEvent('dropdownClick', { detail: this }));
    }
    close() {
        if (this.dropdown) {
            this.dropdown.open = false;
        }
    }
    //
    // STYLES
    //
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: Array })
], SmartFacetDropdown.prototype, "facetInfo", void 0);
__decorate([
    property({ type: String })
], SmartFacetDropdown.prototype, "labelPrefix", void 0);
__decorate([
    property({ type: Object })
], SmartFacetDropdown.prototype, "activeFacetRef", void 0);
__decorate([
    query('ia-dropdown')
], SmartFacetDropdown.prototype, "dropdown", void 0);
SmartFacetDropdown = __decorate([
    customElement('smart-facet-dropdown')
], SmartFacetDropdown);
export { SmartFacetDropdown };
