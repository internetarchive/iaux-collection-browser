import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import eyeIcon from '../../assets/img/icons/eye';
import { TileModel } from '../../models';

@customElement('tile-list-compact-header')
export class TileListCompactHeader extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    return html`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="date">Date Archived</div>
        <div id="creator">Creator</div>
        <div id="views">${eyeIcon}</div>
        <div id="icon"></div>
      </div>
    `;
  }

  private get classSize(): string {
    return (this.currentWidth ?? 531) < 530 ? 'mobile' : 'desktop';
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
        padding-right: 6px;
      }
      #views svg {
        height: 18px;
      }

      #list-line-header {
        display: grid;
        column-gap: 10px;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
      }

      #list-line-header.mobile {
        grid-template-columns: 30px 3fr 29px 2fr 19px;
      }

      #list-line-header.desktop {
        grid-template-columns: 51px 3fr 100px 2fr 60px 26px;
      }
    `;
  }
}
