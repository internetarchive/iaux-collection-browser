import { CSSResultGroup, PropertyValues, LitElement } from 'lit';
import { TileModel } from '../models';
export declare class ItemImage extends LitElement {
    model?: TileModel;
    baseImageUrl?: string;
    isListTile: boolean;
    isCompactTile: boolean;
    private isDeemphasize;
    private isWaveform;
    private itemImageWaveform;
    protected updated(changed: PropertyValues): void;
    private setDeemphasize;
    render(): import("lit-html").TemplateResult<1>;
    private get imageSrc();
    private get itemImageTemplate();
    private get tileImageTemplate();
    private get listImageTemplate();
    private get waveformTemplate();
    private get restrictedIconTemplate();
    private get tileActionTemplate();
    private onLoadItemImageCheck;
    private get imageClass();
    private get listImageClass();
    private get imageBoxClass();
    private get boxWaveformClass();
    private get itemImageWaveformClass();
    private get hashBasedGradient();
    private hashStrToInt;
    static get styles(): CSSResultGroup;
}
