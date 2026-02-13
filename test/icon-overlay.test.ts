import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { IconOverlay } from '../src/tiles/overlay/icon-overlay';

import '../src/tiles/overlay/icon-overlay';

describe('Icon Overlay component', () => {
  it('should render basic component', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay></icon-overlay>
    `);

    const overlayDiv = el.shadowRoot?.querySelector('.icon-overlay');
    expect(overlayDiv).to.exist;
  });

  it('should render component with login-required type', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay .type=${'login-required'}></icon-overlay>
    `);

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;
    expect(svgTitle).to.equal('Log in to view this item');
  });

  it('should render component with content-warning type', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay .type=${'content-warning'}></icon-overlay>
    `);

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;
    expect(svgTitle).to.equal('Content may be inappropriate');
  });
});
