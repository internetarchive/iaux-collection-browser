import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { ReviewBlock } from '../src/tiles/review-block';
import '../src/tiles/review-block';

describe('ReviewBlock component', () => {
  it('renders basic component', async () => {
    const el = await fixture<ReviewBlock>(
      html`<review-block
        title="Foo"
        body="foo bar baz"
        starRating="3"
      ></review-block>`,
    );

    el.title = 'Foo';
    await el.updateComplete;

    const container = el.shadowRoot?.querySelector('.review-container');
    expect(container).to.exist;

    const title = el.shadowRoot?.querySelector('.review-title');
    expect(title?.textContent?.trim()).to.equal('Foo');

    const body = el.shadowRoot?.querySelector('.review-body');
    expect(body?.textContent?.trim()).to.equal('foo bar baz');

    const stars = el.shadowRoot?.querySelector('.star-rating');
    expect(stars).to.exist;
    expect(stars?.querySelectorAll('svg').length).to.equal(5);
    expect(stars?.querySelectorAll('.unfilled-star').length).to.equal(2);
  });

  it('renders with any of title/body/stars', async () => {
    const el = await fixture<ReviewBlock>(html`<review-block></review-block>`);

    // No content if no title/body/stars
    expect(el.shadowRoot?.children.length).to.equal(0);

    el.title = 'Foo';
    await el.updateComplete;

    const title = el.shadowRoot?.querySelector('.review-title');
    expect(title?.textContent?.trim()).to.equal('Foo');

    el.title = '';
    el.body = 'foo bar baz';
    await el.updateComplete;

    const body = el.shadowRoot?.querySelector('.review-body');
    expect(body?.textContent?.trim()).to.equal('foo bar baz');

    el.body = '';
    el.starRating = 4;
    await el.updateComplete;

    const stars = el.shadowRoot?.querySelector('.star-rating');
    expect(stars).to.exist;
    expect(stars?.querySelectorAll('svg').length).to.equal(5);
    expect(stars?.querySelectorAll('.unfilled-star').length).to.equal(1);
  });
});
