import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { BaseTileComponent } from '../base-tile-component';

@customElement('tile-list-compact-header')
export class TileListCompactHeader extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - tileActions: TileAction[] = [];
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
    const hasActions = this.tileActions.length > 0;
    const headerClasses = `${this.classSize}${hasActions ? ' has-actions' : ''}`;
    return html`
      <div id="list-line-header" class="${headerClasses}">
        <div id="thumb"></div>
        ${hasActions ? html`<div id="actions-header"></div>` : nothing}
        <div id="title">${msg('Title')}</div>
        <div id="creator">${msg('Creator')}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel || msg('Published')}
        </div>
        <div id="icon">${msg('Type')}</div>
        <div id="views">${this.displayValueProvider.viewsLabel}</div>
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
        grid-template-columns: 51px 3fr 2fr 95px 30px 115px;
      }

      /*
       * When tile actions are present in the rows below, reserve a matching
       * column here so the columns stay aligned with each row.
       */
      #list-line-header.mobile.has-actions {
        grid-template-columns:
          36px var(--tileActionColumnWidth, 90px) 3fr 2fr
          68px 35px;
      }

      #list-line-header.desktop.has-actions {
        grid-template-columns:
          51px var(--tileActionColumnWidth, 100px) 3fr 2fr
          95px 30px 115px;
      }
    `;
  }
}
