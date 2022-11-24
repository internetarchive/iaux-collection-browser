import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';

@customElement('tile-hover-pane')
export class TileHoverPane extends LitElement {
  @property({ type: Object }) model?: TileModel;

  protected render(): TemplateResult {
    return html``;
  }

  static get styles(): CSSResultGroup {
    return css``;
  }
}
