import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { join } from 'lit/directives/join.js';

@customElement('text-snippet-block')
export class TextSnippetBlock extends LitElement {
  @property({ type: Array }) snippets?: string[] = [];

  @property({ type: String }) viewSize: string = 'desktop';

  render() {
    if (!this.snippets?.length) return html`${nothing}`;

    return html`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `;
  }

  /**
   * An array of HTML templates derived from the snippets, with ellipses inserted
   * at the beginning, end, and between each pair of snippets.
   */
  private get ellipsisJoinedSnippets(): TemplateResult {
    return html`
      &hellip; ${join(this.snippetTemplates, html` &hellip; `)} &hellip;
    `;
  }

  /**
   * Returns an array of HTML span templates containing this item's snippets with all of
   * their `{{{triple-brace-delimited}}}` matches replaced by `<mark>HTML mark tags</mark>`.
   *
   * This approach safely avoids the use of `unsafeHTML` and leaves any existing HTML tags
   * in the snippets intact (as inert text), rather than stripping them away with DOMPurify.
   *
   * Note on `<em>` vs. `<mark>`:
   * The old search page snippets had search keywords demarcated with `<em>` tags.
   * The `<mark>` tag is semantically more accurate for this use case than `<em>`,
   * but screen-reader behavior may be different. `<em>` will likely be read in a
   * different tone, while `<mark>` is often read no differently than ordinary text
   * in many screen-readers (though there are ways to work around this if needed).
   */
  private get snippetTemplates(): TemplateResult[] | undefined {
    return this.snippets?.map(s => {
      const matches = s.matchAll(/{{{(.+?)}}}/gs);
      const templates: TemplateResult[] = [];

      // Convert each match into an HTML template that includes:
      //  - Everything from the end of the previous match (or the beginning of the
      //      string) up to the current match, as raw text.
      //  - The current match (excluding the curly braces) wrapped in a `<mark>` tag.
      let index = 0;
      for (const match of matches) {
        if (match.index != null) {
          templates.push(html`
            ${s.slice(index, match.index)}
            <mark>${match[1]}</mark>
          `);
          index = match.index + match[0].length;
        }
      }

      // Include any text from the last match to the end
      templates.push(html`${s.slice(index)}`);

      // Squash everything into a single span template
      return html`<span>${templates}</span>`;
    });
  }

  static get styles(): CSSResultGroup {
    return css`
      .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 100%;
        border-left: 5px solid #194880;
        margin-top: var(--containerTopMargin, 10px);
        margin-left: var(--containerLeftMargin, 0px);
        border-radius: 3px;
      }

      .snippet-view {
        display: -webkit-box;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        overflow: hidden;
        overflow-wrap: break-word;
        -webkit-line-clamp: var(--maxLines, 3);
        -webkit-box-orient: vertical;
        margin-left: 5px;
        margin-right: 10px;
      }

      .grid {
        margin: 0px 15px 0px 5px;
        font-size: 1.2rem;
        line-height: 1.5rem;
      }

      .list {
        padding-left: 20px;
        font-size: 1.4rem;
        line-height: 2rem;
      }

      mark {
        /* blue, 20% transparency */
        background-color: #0000ff33;
        color: inherit;
      }
    `;
  }
}
