import { CSSResultGroup, LitElement } from 'lit';
export declare class WaveformImage extends LitElement {
    imageSrc?: string;
    identifier?: string;
    isCompactTile: boolean;
    isListTile: boolean;
    private isWaveform;
    private itemImageWaveform;
    render(): import("lit-html").TemplateResult<1>;
    private hashStrToInt;
    private get hashBasedGradient();
    private get boxWaveformClass();
    private get itemImageWaveformClass();
    private onLoadItemImageCheck;
    static get styles(): CSSResultGroup;
}
