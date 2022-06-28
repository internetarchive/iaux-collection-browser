/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { TextOverlay } from '../src/tiles/overlay/text-overlay';

import '../src/tiles/overlay/text-overlay';

describe('Text Overlay component', () => {
  it('should render initial component', async () => {
    const el = await fixture<TextOverlay>(html`<text-overlay></text-overlay>`);

    const overlay = el.shadowRoot?.querySelector('.overlay');
    const noPreview = el.shadowRoot?.querySelector('.no-preview');

    expect(overlay).to.exist;
    expect(noPreview).to.exist;
  });

  it('should render component if loggedIn required', async () => {
    const el = await fixture<TextOverlay>(html`
      <text-overlay .loggedIn=${false} .loginRequired=${true}> </text-overlay>
    `);

    const overlay = el.shadowRoot?.querySelector('.overlay');
    const noPreview = el.shadowRoot?.querySelector('.no-preview');

    expect(overlay).to.exist;
    expect(noPreview).to.exist;
    expect(noPreview?.textContent).to.equal('Log in\nto view this item');
  });

  it('should render component if content warning', async () => {
    const el = await fixture<TextOverlay>(html`
      <text-overlay .loggedIn=${false} .loginRequired=${false}> </text-overlay>
    `);

    const overlay = el.shadowRoot?.querySelector('.overlay');
    const noPreview = el.shadowRoot?.querySelector('.no-preview');

    expect(overlay).to.exist;
    expect(noPreview).to.exist;
    expect(noPreview?.textContent).to.equal('Content may be inappropriate');
  });
});
