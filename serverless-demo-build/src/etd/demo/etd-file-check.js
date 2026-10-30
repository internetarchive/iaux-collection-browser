var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { describeMismatch } from '../../static-index/size-rules';
import { MEANING_SEARCH, MEANING_WORDS_MAP, WORD_SEARCH, } from '../engine/file-checks';
import { drawerStyles } from './drawer-styles';
/** What a failed layer means for the demo, by layer. */
const FAILED_LAYER_NOTE = {
    [MEANING_SEARCH]: 'Search by meaning is off.',
    [MEANING_WORDS_MAP]: 'Nothing here uses this map yet, so nothing is off.',
    [WORD_SEARCH]: "Word search still runs, but its results can't be trusted.",
};
const STATUS_LABEL = {
    ok: '✅ fits',
    mismatch: "⚠️ doesn't fit",
    unlisted: '⬜ not in the list',
};
/**
 * The demo's report of the index files' check against the item's file
 * list: whether each fixed-width file's size fits its manifest, so files
 * republished at different times show up. A drawer, closed until opened.
 */
let EtdFileCheckReport = class EtdFileCheckReport extends LitElement {
    render() {
        if (!this.text && !this.vector)
            return nothing;
        return html `
      <details>
        <summary>Index files checked: ${this.summaryText}</summary>
        <div class="body">${this.bodyTemplate}</div>
      </details>
    `;
    }
    get checks() {
        return [this.text, this.vector].flatMap(check => check?.sizes?.checks ?? []);
    }
    get summaryText() {
        const checks = this.checks;
        if (!checks.length)
            return "file list didn't load";
        const count = (status) => checks.filter(check => check.status === status).length;
        const parts = [`${count('ok')} fit ✅`];
        if (count('mismatch'))
            parts.push(`${count('mismatch')} don't fit ⚠️`);
        if (count('unlisted'))
            parts.push(`${count('unlisted')} not listed ⬜`);
        return parts.join(' · ');
    }
    get bodyTemplate() {
        return html `
      ${this.sectionTemplate('Word search', this.text)}
      ${this.vector
            ? this.sectionTemplate('Search by meaning', this.vector)
            : html `<p class="note">
            Search by meaning's files are checked when it first loads.
          </p>`}
    `;
    }
    sectionTemplate(title, check) {
        if (!check)
            return nothing;
        if (!check.sizes) {
            return html `<h3>${title}</h3>
        <p class="note">
          ${check.itemId
                ? `The file list for ${check.itemId} didn't load, so nothing was checked.`
                : "This index isn't read from an archive.org item, so there's no file list to check against."}
        </p>`;
        }
        const { checks, failedLayers } = check.sizes;
        return html `
      <h3>${title}</h3>
      <table>
        <thead>
          <tr>
            <th scope="col">File</th>
            <th scope="col">Size</th>
            <th scope="col">Check</th>
          </tr>
        </thead>
        <tbody>
          ${checks.map(row => html `
              <tr data-status=${row.status}>
                <th scope="row">${row.rule.file}</th>
                <td>${row.size?.toLocaleString('en-US') ?? '—'}</td>
                <td>
                  ${STATUS_LABEL[row.status]}
                  ${row.status === 'mismatch'
            ? html `<div class="why">${describeMismatch(row)}</div>`
            : nothing}
                </td>
              </tr>
            `)}
        </tbody>
      </table>
      ${failedLayers.map(layer => html `<p class="failed" data-layer=${layer}>
            The ${layer} files don't fit together.
            ${FAILED_LAYER_NOTE[layer] ?? ''}
          </p>`)}
    `;
    }
    static { this.styles = [
        drawerStyles,
        css `
      :host {
        display: block;
      }
      .body {
        padding: 0.6rem 0.8rem;
        border: 1px solid #c9d4e0;
        border-top: none;
      }
      h3 {
        margin: 0.4rem 0;
        font-size: 1rem;
      }
      table {
        border-collapse: collapse;
        width: 100%;
      }
      th,
      td {
        text-align: left;
        padding: 0.2rem 0.6rem 0.2rem 0;
        vertical-align: top;
      }
      tbody th {
        font-family: monospace;
        font-weight: normal;
      }
      td:nth-child(2) {
        font-variant-numeric: tabular-nums;
      }
      .why,
      .note {
        color: #555;
      }
      .note {
        margin: 0;
      }
      .failed {
        margin: 0.5rem 0 0;
        font-weight: 600;
      }
    `,
    ]; }
};
__decorate([
    property({ attribute: false })
], EtdFileCheckReport.prototype, "text", void 0);
__decorate([
    property({ attribute: false })
], EtdFileCheckReport.prototype, "vector", void 0);
EtdFileCheckReport = __decorate([
    customElement('etd-file-check')
], EtdFileCheckReport);
export { EtdFileCheckReport };
