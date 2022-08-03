/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { IconOverlay } from '../src/tiles/overlay/icon-overlay';

import '../src/tiles/overlay/icon-overlay';

describe('Icon Overlay component', () => {
  it('should render component if loggedIn required', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay .loggedIn=${false} .loginRequired=${true}> </icon-overlay>
    `);

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;
    expect(svgTitle).to.equal('Log in to view this item');
  });

  it('should render component if content warning', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay .loggedIn=${false} .loginRequired=${false}> </icon-overlay>
    `);

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;
    expect(svgTitle).to.equal('Content may be inappropriate');
  });

  it('should render component if content warning', async () => {
    const el = await fixture<IconOverlay>(html`
      <icon-overlay .loggedIn=${true} .loginRequired=${true}> </icon-overlay>
    `);

    const svgTitle = el.shadowRoot
      ?.querySelector('svg')
      ?.querySelector('title')?.textContent;
    expect(svgTitle).to.equal('Content may be inappropriate');
  });
});
