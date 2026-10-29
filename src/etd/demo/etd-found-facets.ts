import { css, html, LitElement, nothing } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { EtdEngine } from '../etd-engine';
import type { EtdRequest } from '../etd-query';
import { etdRequestIsEmpty, etdRequestKey } from '../etd-query';
import { FOUND_SAMPLE, estimatedCount, findFacets } from '../found-facets';
import type { FoundFacets, FoundGroup } from '../found-facets';
import { srOnlyStyle } from '../../styles/sr-only';
import { drawerStyles } from './drawer-styles';

/** Values named per group; the rest are counted as "+N more". */
const SHOWN_VALUES = 5;

type Found =
  | { state: 'loading' }
  | { state: 'loaded'; found: FoundFacets; ms: number }
  | { state: 'failed'; message: string }
  | { state: 'unsupported' };

/**
 * The demo's facets found in the results themselves: the current search's
 * matches are sampled and their records' fields counted (found-facets.ts),
 * with no facet file. Read-only, beside the service's own facets, to see
 * what an index without a facet file could offer.
 *
 * A drawer, closed until opened. It reads only while open: up to 3,000
 * records a search, so not on every search for nothing.
 */
@customElement('etd-found-facets')
export class EtdFoundFacets extends LitElement {
  /** The engine the current search ran on. */
  @property({ attribute: false }) engine?: EtdEngine;

  /** The current search: its words and filters. */
  @property({ attribute: false }) request?: EtdRequest;

  @state() private open = false;

  @state() private found?: Found;

  /** What `found` is for, so the same search isn't read twice. */
  private foundFor?: { engine: EtdEngine; key: string };

  private controller?: AbortController;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.controller?.abort();
  }

  protected updated(changed: PropertyValues): void {
    if (
      changed.has('engine') ||
      changed.has('request') ||
      changed.has('open')
    ) {
      this.findIfNeeded();
    }
  }

  render() {
    return html`
      <details @toggle=${this.toggled}>
        <summary>Facets found in the results: ${this.barText}</summary>
        <div class="body" aria-live="polite">${this.bodyTemplate}</div>
      </details>
    `;
  }

  private toggled(e: Event) {
    this.open = (e.target as HTMLDetailsElement).open;
  }

  /** Reads the current search's sample, unless it's read or nothing's asked. */
  private async findIfNeeded() {
    const { engine, request } = this;
    if (!this.open || !engine || !request || etdRequestIsEmpty(request)) {
      return;
    }
    const key = etdRequestKey(request);
    if (this.foundFor?.engine === engine && this.foundFor.key === key) return;
    this.foundFor = { engine, key };

    this.controller?.abort();
    const controller = new AbortController();
    this.controller = controller;
    const { signal } = controller;
    this.found = { state: 'loading' };
    const started = performance.now();
    try {
      const query = await engine.query(request.text, request.filters, {
        signal,
      });
      if (!query.sample) {
        if (!signal.aborted) this.found = { state: 'unsupported' };
        return;
      }
      const sample = await query.sample(FOUND_SAMPLE, { signal });
      if (signal.aborted) return;
      this.found = {
        state: 'loaded',
        found: findFacets(sample),
        ms: performance.now() - started,
      };
    } catch (err) {
      if (signal.aborted) return;
      // Read again next time it's asked, rather than keep the failure.
      this.foundFor = undefined;
      this.found = {
        state: 'failed',
        message: err instanceof Error ? err.message : String(err),
      };
    }
  }

  /** The drawer bar's words after its title. */
  private get barText(): string {
    const { found } = this;
    if (!this.open && !found) return 'open to count them';
    if (!found || found.state === 'loading') return 'counting…';
    if (found.state === 'failed') return "couldn't count them";
    if (found.state === 'unsupported') return "this search can't sample";
    const shown = found.found.groups.filter(group => group.shown);
    const names = shown.length
      ? shown.map(group => group.title).join(', ')
      : 'none';
    return `${names} (${fromText(found.found)})`;
  }

  private get bodyTemplate() {
    const { found } = this;
    if (!found || found.state === 'loading') {
      return html`<p class="note">
        Reading up to ${FOUND_SAMPLE.toLocaleString()} results…
      </p>`;
    }
    if (found.state === 'failed') {
      return html`<p class="note">Couldn't count them: ${found.message}</p>`;
    }
    if (found.state === 'unsupported') {
      return html`<p class="note">
        This search can't read a sample of its matches.
      </p>`;
    }
    const { found: facets, ms } = found;
    if (!facets.of) return html`<p class="note">No results to count.</p>`;
    const shown = facets.groups.filter(group => group.shown);
    const hidden = facets.groups.filter(group => !group.shown);
    return html`
      <p class="note">${this.howText(facets, ms)}</p>
      ${shown.length
        ? html`<dl>
            ${shown.map(
              group => html`
                <div class="group" data-key=${group.key}>
                  <dt>${group.title}</dt>
                  <dd>${this.valuesTemplate(group, facets)}</dd>
                </div>
              `,
            )}
          </dl>`
        : nothing}
      ${hidden.length
        ? html`<p class="not-groups">
            Not groups:
            ${hidden.map(
              (group, i) =>
                html`${i ? '; ' : ''}<span data-key=${group.key}
                    >${group.title}, ${group.why}</span
                  >`,
            )}
          </p>`
        : nothing}
    `;
  }

  private howText(facets: FoundFacets, ms: number): string {
    const seconds = `${(ms / 1000).toFixed(1)} s`;
    if (facets.sampled >= facets.of) {
      return `Counted from all ${facets.of.toLocaleString()} results, in ${seconds}. Counts are exact.`;
    }
    return (
      `Counted from ${facets.sampled.toLocaleString()} results picked at random, ` +
      `of ${facets.of.toLocaleString()}, in ${seconds}. ` +
      `Counts are estimates for all ${facets.of.toLocaleString()}.`
    );
  }

  private valuesTemplate(group: FoundGroup, facets: FoundFacets) {
    const estimated = facets.sampled < facets.of;
    const more = group.values.length - SHOWN_VALUES;
    return html`
      <ul>
        ${group.values.slice(0, SHOWN_VALUES).map(
          ({ value, count }) =>
            html`<li>
              ${value}
              <span class="count"
                >${estimated
                  ? html`<span aria-hidden="true">~</span
                      ><span class="sr-only">about </span>`
                  : nothing}${estimatedCount(
                  count,
                  facets,
                ).toLocaleString()}</span
              >
            </li>`,
        )}
      </ul>
      ${more > 0
        ? html`<span class="more"
            >+${more.toLocaleString()} more
            ${estimated ? 'in the sample' : ''}</span
          >`
        : nothing}
    `;
  }

  static styles = [
    drawerStyles,
    srOnlyStyle,
    css`
      :host {
        display: block;
      }
      .body {
        padding: 0.6rem 0.8rem;
        border: 1px solid #c9d4e0;
        border-top: none;
      }
      dl {
        display: grid;
        grid-template-columns: max-content 1fr;
        gap: 0.25rem 1rem;
        margin: 0.5rem 0 0;
      }
      .group {
        display: contents;
      }
      dt {
        font-weight: bold;
      }
      dd {
        margin: 0;
      }
      ul {
        display: inline;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: inline;
      }
      li + li::before {
        content: ' · ';
      }
      .count,
      .more,
      .note,
      .not-groups {
        color: #555;
      }
      .more {
        margin-left: 0.5rem;
      }
      .note,
      .not-groups {
        margin: 0;
      }
      .not-groups {
        margin-top: 0.5rem;
      }
    `,
  ];
}

/** Where the counts came from, for the drawer bar. */
function fromText(facets: FoundFacets): string {
  if (!facets.of) return 'no results';
  return facets.sampled >= facets.of
    ? `all ${facets.of.toLocaleString()} counted`
    : `estimated from ${facets.sampled.toLocaleString()} of ${facets.of.toLocaleString()}`;
}
