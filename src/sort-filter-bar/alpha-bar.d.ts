import { LitElement } from 'lit';
export declare class AlphaBar extends LitElement {
    selectedLetter: string | null;
    private get selectedUppercaseLetter();
    render(): import("lit-html").TemplateResult<1>;
    private letterClicked;
    private readonly alphabet;
    static styles: import("lit").CSSResult;
}
