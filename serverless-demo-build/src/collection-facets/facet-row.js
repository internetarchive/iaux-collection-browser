var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FacetRow_1;
import { html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { srOnlyStyle } from '../styles/sr-only';
import { facetRowStyles, facetRowTemplate, getFacetState, } from './facet-row-template';
let FacetRow = FacetRow_1 = class FacetRow extends LitElement {
    constructor() {
        //
        // UI STATE
        //
        super(...arguments);
        /**
         * Whether to omit the negative/hide button from this facet row if possible.
         * Has no effect if the facet bucket is itself hidden, in which case the hide
         * button *must* be shown to represent the state accurately.
         */
        this.omitHideButton = false;
    }
    //
    // COMPONENT LIFECYCLE METHODS
    //
    render() {
        return html `${this.facetRowTemplate}`;
    }
    //
    // TEMPLATE GETTERS
    //
    /**
     * Template for the full facet row, including the positive/negative checks,
     * the display name, and the count.
     */
    get facetRowTemplate() {
        const { bucket, facetType } = this;
        if (!bucket || !facetType)
            return nothing;
        return facetRowTemplate({
            facetType,
            extraFacetGroups: this.extraFacetGroups,
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
    facetClicked(e, negative) {
        const { bucket, facetType } = this;
        if (!bucket || !facetType)
            return;
        const target = e.target;
        const { checked } = target;
        this.bucket = {
            ...bucket,
            state: FacetRow_1.getFacetState(checked, negative),
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
    dispatchFacetClickEvent(detail) {
        const event = new CustomEvent('facetClick', {
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
    static getFacetState(checked, negative) {
        return getFacetState(checked, negative);
    }
    //
    // STYLES
    //
    static get styles() {
        return [srOnlyStyle, facetRowStyles];
    }
};
__decorate([
    property({ type: String })
], FacetRow.prototype, "facetType", void 0);
__decorate([
    property({ type: Array, attribute: false })
], FacetRow.prototype, "extraFacetGroups", void 0);
__decorate([
    property({ type: Object })
], FacetRow.prototype, "bucket", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], FacetRow.prototype, "omitHideButton", void 0);
__decorate([
    property({ type: Object })
], FacetRow.prototype, "collectionTitles", void 0);
FacetRow = FacetRow_1 = __decorate([
    customElement('facet-row'),
    localized()
], FacetRow);
export { FacetRow };
