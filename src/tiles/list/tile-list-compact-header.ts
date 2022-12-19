import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { SortParam } from '@internetarchive/search-service';
import { dateLabel } from './date-label';
import type { TileModel } from '../../models';

@customElement('tile-list-compact-header')
export class TileListCompactHeader extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Number }) mobileBreakpoint?: number;

  render() {
    return html`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${dateLabel(this.sortParam?.field)}</div>
        <div id="icon">Type</div>
        <div id="views">Views</div>
      </div>
    `;
  }

  private get classSize(): string {
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'mobile';
    }
    return 'desktop';
  }

  static get styles() {
    return css`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
      }

      .mobile #views {
        display: none;
      }

      #views {
        text-align: right;
        padding-right: 8px;
      }

      #list-line-header {
        display: grid;
        column-gap: 10px;
        align-items: flex-end;
        padding-bottom: 2px;
      }

      #list-line-header.mobile {
        grid-template-columns: 36px 3fr 2fr 68px 35px;
      }

      #list-line-header.desktop {
        grid-template-columns: 51px 3fr 2fr 95px 30px 60px;
      }
    `;
  }
}
