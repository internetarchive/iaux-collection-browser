import { CSSResultGroup, LitElement } from 'lit';
import { TileModel } from '../../models';
export declare class ItemImage extends LitElement {
    model?: TileModel;
    imageSrc?: string;
    isCompactTile: boolean;
    isDeemphasize: boolean;
    isListTile: boolean;
    render(): import("lit-html").TemplateResult<1>;
    private get tileActionTemplate();
    private get itemTileImageTemplate();
    private get tileImageTemplate();
    private get listImageTemplate();
    private get restrictedIconTemplate();
    private get imageClass();
    private get listImageClass();
    private get imageBoxClass();
    static get styles(): CSSResultGroup;
}
