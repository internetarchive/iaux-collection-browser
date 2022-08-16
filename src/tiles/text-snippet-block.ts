import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { map } from 'lit/directives/map.js';
import { join } from 'lit/directives/join.js';
import DOMPurify from 'dompurify';

@customElement('text-snippet-block')
export class TextSnippetBlock extends LitElement {
  // The default snippets value here is just for testing's sake; will be removed.
  @property({ type: Array }) snippets?: string[] = [
    'this is a text {{{snippet}}} block with potentially',
    'multiple {{{snippets}}} and such',
    'but the {{{snippet}}} block may be quite long perhaps',
    'depending on how many {{{snippet}}} matches there are',
    'there may be multiple lines of {{{snippets}}} to show',
    'but each {{{snippet}}} should be relatively short',
  ];

  @property({ type: String }) viewSize: string = 'desktop';

  render() {
    const viewSizeClass = this.viewSize === 'grid' ? 'grid' : 'list';

    return html`
      <div id="container" class=${viewSizeClass}>
        &hellip; ${this.ellipsisJoinedSnippets ?? nothing} &hellip;
      </div>

      ${this.viewSize === 'grid' ? html`<div id="separator"></div>` : nothing}
    `;
  }

  /**
   * An array of HTML templates derived from the snippets, with ellipses inserted
   * between each pair of snippets.
   */
  private get ellipsisJoinedSnippets() {
    const sanitizeOptions = { ALLOWED_TAGS: ['mark'] };

    return join(
      map(
        this.snippets,
        s => html`
          <span>
            ${unsafeHTML(
              DOMPurify.sanitize(
                TextSnippetBlock.markMatches(s),
                sanitizeOptions
              )
            )}
          </span>
        `
      ),
      html` &hellip; `
    );
  }

  /**
   * Replaces {{{triple-brace-delimited}}} matches with \<mark>HTML mark tags\</mark>.
   *
   * Note on <em> vs. <mark>:
   * The old search page snippets had search keywords demarcated with <em> tags.
   * The <mark> tag is semantically more accurate for this use case than <em>,
   * but screen-reader behavior may be different. <em> will likely be read in a
   * different tone, while <mark> is often read no differently than ordinary text
   * in many screen-readers (though there are ways to work around this if needed).
   */
  private static markMatches(snippet: string) {
    return snippet.replace(/{{{(.+?)}}}/g, '<mark>$1</mark>');
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        display: -webkit-box;
        font-family: 'Times New Roman', serif;
        color: #2c2c2c;

        text-overflow: ellipsis;
        overflow: hidden;
        overflow-wrap: break-word;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }

      #separator {
        margin: 0 -0.5rem; /* Border line should extend to the edges of the tile */
        border-bottom: 1px solid #bbb;
      }

      .grid {
        margin: 0.5rem 0 0.4rem; /* Bottom margin reduced by 1px to account for the separator */
        font-size: 1.2rem;
        line-height: 1.5rem;
      }

      .list {
        margin: 1rem 0 0;
        padding: 0 0 0 1.5rem;
        border-left: 0.5rem solid #194880;
        font-size: 1.4rem;
        line-height: 2rem;
      }

      mark {
        background-color: #0000ff33; /* blue, 20% transparency */
        color: inherit;
      }
    `;
  }
}
