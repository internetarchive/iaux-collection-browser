import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { IconProviderInterface } from './icon-provider';

@customElement('icon-provider-icon')
export class IconProviderIcon<T> extends LitElement {
  @property({ type: Object }) iconName?: T;

  @property({ type: Object }) iconProvider?: IconProviderInterface<T>;

  @state() private iconUrl?: string;

  render() {
    return html`
      ${this.iconUrl ? html`<img src=${this.iconUrl} alt="icon" />` : nothing}
    `;
  }

  updated(): void {
    this.setIcon();
  }

  private async setIcon() {
    if (!this.iconProvider || !this.iconName) return;
    this.iconUrl = await this.iconProvider.urlForIcon(this.iconName);
  }
}
