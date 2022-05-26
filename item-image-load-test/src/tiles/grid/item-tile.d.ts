import { CSSResultGroup, LitElement } from 'lit';
import { TileModel } from '../../models';
import '../mediatype-icon';
import '../item-tile-image';
export declare class ItemTile extends LitElement {
    model?: TileModel;
    baseImageUrl?: string;
    render(): import("lit-html").TemplateResult<1>;
    static get styles(): CSSResultGroup;
}
