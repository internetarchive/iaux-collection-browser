import { LitElement } from 'lit';
import { SortParam } from '@internetarchive/search-service';
import { TileModel } from '../../models';
import '../mediatype-icon';
import '../item-tile-image';
export declare class TileListCompact extends LitElement {
    model?: TileModel;
    baseNavigationUrl?: string;
    currentWidth?: number;
    currentHeight?: number;
    sortParam: SortParam | null;
    mobileBreakpoint?: number;
    baseImageUrl?: string;
    render(): import("lit-html").TemplateResult<1>;
    private get collectionColor();
    private get imageTemplate();
    private get date();
    private get classSize();
    private get formatSize();
    static get styles(): import("lit").CSSResult;
}
