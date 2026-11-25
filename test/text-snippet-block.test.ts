import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TextSnippetBlock } from '../src/tiles/text-snippet-block';
import '../src/tiles/text-snippet-block';

describe('TextSnippetBlock component', () => {
  it('should render initial component', async () => {
    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block></text-snippet-block>`,
    );

    // No content if no snippets
    expect(el.shadowRoot?.children.length).to.equal(0);

    // Content appears if there are snippets
    el.snippets = ['text'];
    await el.updateComplete;
    const container = el.shadowRoot?.querySelector('.container');
    expect(container).to.exist;
  });

  it('should render marked snippets', async () => {
    const snippets = [
      'some {{{snippet}}} text',
      'some {{{other}}} {{{snippet}}} text',
    ];

    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block .snippets=${snippets}></text-snippet-block>`,
    );

    const container = el.shadowRoot?.querySelector('.snippet-view');

    // Has the correct number of snippets and highlights
    expect(container?.children.length).to.equal(snippets.length);
    expect(container?.querySelectorAll('mark').length).to.equal(3);
  });

  it('should render marked snippets containing newlines', async () => {
    const snippets = [
      'some {{{snippet}}} text',
      'some {{{other}}} {{{snippet\n text}}}',
    ];

    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block .snippets=${snippets}></text-snippet-block>`,
    );

    const container = el.shadowRoot?.querySelector('.snippet-view');

    // Has the correct number of snippets and highlights
    expect(container?.children.length).to.equal(snippets.length);
    expect(container?.querySelectorAll('mark').length).to.equal(3);
  });

  it('should drop font tags from caption snippets and keep other angle-bracket text', async () => {
    const snippets = [
      'music <font color="#ffff00">{{{hello}}} and welcome</font> <font color="#00ffff">to the show</font> <applause>',
    ];

    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block .snippets=${snippets}></text-snippet-block>`,
    );

    const view = el.shadowRoot?.querySelector('.snippet-view');
    const text = view?.textContent?.replace(/\s+/g, ' ') ?? '';

    expect(text).to.not.contain('font');
    expect(text).to.contain('hello and welcome to the show <applause>');
    expect(view?.querySelectorAll('mark').length).to.equal(1);
  });

  it('should render correctly in grid mode', async () => {
    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block
        viewsize="grid"
        .snippets=${['text']}
      ></text-snippet-block>`,
    );

    const container = el.shadowRoot?.querySelector('.snippet-view');

    // Applies the right container classes
    expect(container?.classList.contains('grid')).to.be.true;
    expect(container?.classList.contains('list')).to.be.false;
  });

  it('should render correctly in list mode', async () => {
    const el = await fixture<TextSnippetBlock>(
      html`<text-snippet-block
        viewsize="list"
        .snippets=${['text']}
      ></text-snippet-block>`,
    );

    const container = el.shadowRoot?.querySelector('.snippet-view');

    // Applies the right container classes
    expect(container?.classList.contains('list')).to.be.true;
    expect(container?.classList.contains('grid')).to.be.false;
  });
});
