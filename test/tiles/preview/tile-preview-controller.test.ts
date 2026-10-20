import { expect, fixture } from '@open-wc/testing';
import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import sinon from 'sinon';
import {
  HOVER_INTENT_MS,
  TilePreviewController,
} from '../../../src/tiles/preview/tile-preview-controller';

@customElement('preview-controller-host')
class Host extends LitElement {
  enabled = true;

  controller = new TilePreviewController(this, { enabled: () => this.enabled });

  render() {
    return html`<a href="#x">tile</a>`;
  }
}

describe('TilePreviewController', () => {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  const hover = (el: Element, type: string) =>
    el.dispatchEvent(
      new PointerEvent(type, { pointerType: 'mouse', bubbles: false }),
    );

  it('waits for hover intent and cancels on leave', async () => {
    const el = await fixture<Host>(html`<preview-controller-host />`);
    hover(el, 'pointerenter');
    clock.tick(HOVER_INTENT_MS - 1);
    expect(el.controller.active).to.be.false;
    hover(el, 'pointerleave');
    clock.tick(HOVER_INTENT_MS);
    expect(el.controller.active).to.be.false;

    hover(el, 'pointerenter');
    clock.tick(HOVER_INTENT_MS);
    expect(el.controller.active).to.be.true;
    hover(el, 'pointerleave');
    expect(el.controller.active).to.be.false;
  });

  it('keeps one preview active at a time', async () => {
    const a = await fixture<Host>(html`<preview-controller-host />`);
    const b = await fixture<Host>(html`<preview-controller-host />`);
    hover(a, 'pointerenter');
    clock.tick(HOVER_INTENT_MS);
    hover(b, 'pointerenter');
    clock.tick(HOVER_INTENT_MS);
    expect(a.controller.active).to.be.false;
    expect(b.controller.active).to.be.true;
  });

  it('does nothing when disabled', async () => {
    const el = await fixture<Host>(html`<preview-controller-host />`);
    el.enabled = false;
    hover(el, 'pointerenter');
    clock.tick(HOVER_INTENT_MS);
    expect(el.controller.active).to.be.false;
  });

  it('starts on long-press for touch and swallows the click', async () => {
    const el = await fixture<Host>(html`<preview-controller-host />`);
    const touch = (type: string) =>
      el.dispatchEvent(new PointerEvent(type, { pointerType: 'touch' }));
    touch('pointerdown');
    clock.tick(600);
    expect(el.controller.active).to.be.true;
    touch('pointerup');
    const click = new MouseEvent('click', { cancelable: true });
    el.dispatchEvent(click);
    expect(click.defaultPrevented).to.be.true;
  });
});
