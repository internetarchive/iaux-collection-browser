import { CSSResultGroup, LitElement } from 'lit';
export declare class MediatypeIcon extends LitElement {
    mediatype: string | undefined;
    collections: string[] | undefined;
    showText: boolean;
    private get displayMediatype();
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): CSSResultGroup;
}
