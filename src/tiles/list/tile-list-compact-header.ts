import { css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { BaseTileComponent } from '../base-tile-component';

@customElement('tile-list-compact-header')
export class TileListCompactHeader extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - currentWidth?: number;
   *  - currentHeight?: number;
   *  - baseNavigationUrl?: string;
   *  - baseImageUrl?: string;
   *  - collectionPagePath?: string;
   *  - sortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   *  - suppressBlurring = false;
   */

  render() {
    return html`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${msg('Title')}</div>
        <div id="creator">${msg('Creator')}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel || msg('Published')}
        </div>
        <div id="icon">${msg('Type')}</div>
        <div id="views">${msg('Views')}</div>
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
