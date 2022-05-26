import { CSSResultGroup, LitElement } from 'lit';
export declare class ItemImageOverlay extends LitElement {
    isListTile: boolean;
    loggedIn: boolean;
    loginRequired: boolean;
    contentWarning: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private get loginRequiredTemplate();
    private get contentWarningTemplate();
    static get styles(): CSSResultGroup;
}
