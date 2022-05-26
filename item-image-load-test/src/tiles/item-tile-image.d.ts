import { LitElement, PropertyValues } from 'lit';
import { TileModel } from '../models';
import './image/item-image';
import './image/waveform-image';
export declare class ItemImage extends LitElement {
    model?: TileModel;
    baseImageUrl?: string;
    isListTile: boolean;
    isCompactTile: boolean;
    private isDeemphasize;
    protected updated(changed: PropertyValues): void;
    private setDeemphasize;
    render(): import("lit-html").TemplateResult<1>;
    private get imageSrc();
    private get isWithWaveformMediatype();
    private get itemImageTemplate();
    private get waveformImageTemplate();
}
