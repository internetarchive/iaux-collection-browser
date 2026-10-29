import { LitElement, css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type {
  VectorScanSummary,
  VectorSearchStatus,
} from '../engine/vector/static-vector-engine';
import type { ModelState } from '../engine/vector/vector-searcher';

/**
 * Demo-only: how a search by meaning is going. The model's download (135 MB
 * the first time, then cached), the cells as they arrive, and once done,
 * what the search cost: time per step, bytes and requests.
 */
@customElement('etd-vector-status')
export class EtdVectorStatus extends LitElement {
  @property({ attribute: false }) model: ModelState = { state: 'idle' };

  @property({ attribute: false }) search?: VectorSearchStatus;

  render() {
    return html`
      <p class="model">${this.modelTemplate}</p>
      ${this.searchTemplate}
    `;
  }

  private get modelTemplate() {
    const { model } = this;
    switch (model.state) {
      case 'idle':
        return 'Model: not loaded yet. It loads when you point at Meaning, or search by it.';
      case 'loading':
        return html`<label
          >Downloading the model (one time, then cached):
          ${model.total
            ? html`<progress
                  max=${model.total}
                  .value=${model.loaded}
                ></progress>
                ${mb(model.loaded)} of ${mb(model.total)}`
            : html`<progress></progress>`}</label
        >`;
      case 'ready':
        return '✅ Model ready';
      default:
        return html`<span class="error"
          >⚠️ The model didn't load: ${model.message}</span
        >`;
    }
  }

  private get searchTemplate() {
    const { search } = this;
    if (!search) return nothing;
    const query = `“${search.text}”`;
    switch (search.phase) {
      case 'loading':
        return html`<p role="status">
          Searching ${query} by meaning: waiting for the model and the
          centroids…
        </p>`;
      case 'scanning': {
        const progress = search.progress!;
        return html`<p>
          <label
            >Searching ${query} by meaning:
            <progress
              max=${progress.cells}
              .value=${progress.cellsDone}
            ></progress>
            ${progress.cellsDone} of ${progress.cells} cells,
            ${mb(progress.bytes)}, ${seconds(search.elapsed)}</label
          >
        </p>`;
      }
      case 'done':
        return html`<p role="status">${summaryText(query, search.scan!)}</p>`;
      default:
        return html`<p role="status" class="error">
          ⚠️ Searching ${query} by meaning failed: ${search.message}
        </p>`;
    }
  }

  static styles = css`
    :host {
      display: block;
      font-size: 1.4rem;
    }

    p {
      margin: 0.3rem 0;
    }

    progress {
      vertical-align: middle;
    }

    .error {
      color: #a3261a;
    }
  `;
}

/** A finished search, in one line: the total first, then the breakdown. */
export function summaryText(query: string, scan: VectorScanSummary): string {
  const t = scan.timings;
  return (
    `Searched ${query} by meaning in ${seconds(t.total)}: ` +
    `${scan.candidates.toLocaleString()} candidates in ${scan.cells} cells, ` +
    `${mb(scan.bytes)} in ${scan.requests} requests. ` +
    `Waiting for the model and centroids ${seconds(t.load)}, ` +
    `embedding ${Math.round(t.embed)} ms, cells ${seconds(t.scan)}, ` +
    `exact re-score of ${scan.exact} and facets ${seconds(t.rerank)}.`
  );
}

function mb(bytes: number): string {
  return `${(bytes / 1e6).toFixed(1)} MB`;
}

function seconds(ms: number): string {
  return `${(ms / 1000).toFixed(1)} s`;
}
