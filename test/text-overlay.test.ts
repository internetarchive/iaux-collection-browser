import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { TextOverlay } from '../src/tiles/overlay/text-overlay';

import '../src/tiles/overlay/text-overlay';

describe('Text Overlay component', () => {
  it('should render initial component', async () => {
    const el = await fixture<TextOverlay>(html`<text-overlay></text-overlay>`);

    const overlay = el.shadowRoot?.querySelector('.overlay');
    const noPreview = el.shadowRoot?.querySelector('.no-preview');
    const iconOverlay = el.shadowRoot?.querySelector('.icon-overlay');
    const textOverlay = el.shadowRoot?.querySelector('.text-overlay');

    expect(overlay).to.exist;
    expect(noPreview).to.exist;
    expect(iconOverlay).to.exist;
    expect(textOverlay).to.exist;
  });

  it('should render component with login-required type', async () => {
    const el = await fixture<TextOverlay>(html`
      <text-overlay .type=${'login-required'}></text-overlay>
    `);

    const iconOverlay = el.shadowRoot?.querySelector('.icon-overlay');
    const textOverlay = el.shadowRoot?.querySelector('.text-overlay');

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;

    expect(iconOverlay).to.exist;
    expect(svgTitle).to.equal('Log in to view this item');
    expect(textOverlay?.textContent).to.equal('Log in to view this item');
  });

  it('should render component with content-warning type', async () => {
    const el = await fixture<TextOverlay>(html`
      <text-overlay .type=${'content-warning'}></text-overlay>
    `);

    const iconOverlay = el.shadowRoot?.querySelector('.icon-overlay');
    const textOverlay = el.shadowRoot?.querySelector('.text-overlay');

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;

    expect(iconOverlay).to.exist;
    expect(svgTitle).to.equal('Content may be inappropriate');
    expect(textOverlay?.textContent).to.equal('Content may be inappropriate');
  });
});
