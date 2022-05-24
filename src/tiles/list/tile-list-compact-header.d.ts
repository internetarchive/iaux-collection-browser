import { LitElement } from 'lit';
import { SortParam } from '@internetarchive/search-service';
import { TileModel } from '../../models';
export declare class TileListCompactHeader extends LitElement {
    model?: TileModel;
    currentWidth?: number;
    sortParam: SortParam | null;
    mobileBreakpoint?: number;
    render(): import("lit-html").TemplateResult<1>;
    private get classSize();
    static get styles(): import("lit").CSSResult;
}
