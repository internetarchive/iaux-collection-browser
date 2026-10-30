import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { EtdVectorStatus } from '../../../src/etd/demo/etd-vector-status';
import '../../../src/etd/demo/etd-vector-status';
import type { VectorSearchStatus } from '../../../src/etd/engine/vector/static-vector-engine';
import type { ModelState } from '../../../src/etd/engine/vector/vector-searcher';

async function status(model: ModelState, search?: VectorSearchStatus) {
  return fixture<EtdVectorStatus>(html`
    <etd-vector-status .model=${model} .search=${search}></etd-vector-status>
  `);
}

function text(el: EtdVectorStatus): string {
  return el.shadowRoot!.textContent!.replace(/\s+/g, ' ').trim();
}

describe('etd-vector-status', () => {
  it('says the model loads on demand, before anyone asks for it', async () => {
    const el = await status({ state: 'idle' });
    expect(text(el)).to.contain('loads when you point at Meaning');
  });

  it('shows the model download as a labelled progress bar', async () => {
    const el = await status({
      state: 'loading',
      loaded: 45_000_000,
      total: 135_400_000,
      retries: 0,
    });
    const bar = el.shadowRoot!.querySelector('progress')!;
    expect(bar.value).to.equal(45_000_000);
    expect(bar.closest('label')).to.exist;
    expect(text(el)).to.contain('45.0 MB of 135.4 MB');
  });

  it('says when a model download had to be asked again', async () => {
    const el = await status({
      state: 'loading',
      loaded: 45_000_000,
      total: 135_400_000,
      retries: 1,
    });
    expect(text(el)).to.contain(
      '45.0 MB of 135.4 MB, 1 retried after an error',
    );
  });

  it('shows cells arriving while a search scans', async () => {
    const el = await status(
      { state: 'ready' },
      {
        text: 'sea ice',
        phase: 'scanning',
        elapsed: 4200,
        progress: {
          cellsDone: 12,
          cells: 32,
          bytes: 30_100_000,
          requests: 20,
          retries: 0,
        },
      },
    );
    expect(text(el)).to.contain(
      'Searching “sea ice” by meaning: 12 of 32 cells, 30.1 MB, 4.2 s',
    );
  });

  it('says when the first results came, while the rest arrive', async () => {
    const el = await status(
      { state: 'ready' },
      {
        text: 'sea ice',
        phase: 'scanning',
        elapsed: 8200,
        first: { cellsDone: 4, cells: 32, elapsed: 3210 },
        progress: {
          cellsDone: 12,
          cells: 32,
          bytes: 30_100_000,
          requests: 20,
          retries: 0,
        },
      },
    );
    expect(text(el)).to.contain(
      'First results from 4 of 32 cells after 3.2 s; refining as the rest arrive.',
    );
    expect(text(el)).to.contain('12 of 32 cells');
  });

  it('sums up a finished search: the total, then where the time went', async () => {
    const el = await status(
      { state: 'ready' },
      {
        text: 'sea ice',
        phase: 'done',
        elapsed: 14900,
        scan: {
          candidates: 407212,
          exact: 400,
          cells: 32,
          bytes: 83_433_542,
          requests: 61,
          retries: 0,
          timings: {
            load: 2161,
            embed: 42.7,
            scan: 10809,
            rerank: 1884,
            total: 14900,
          },
        },
      },
    );
    expect(text(el)).to.contain(
      'Searched “sea ice” by meaning in 14.9 s: 407,212 candidates in 32 cells, 83.4 MB in 61 requests.',
    );
    expect(text(el)).to.contain('embedding 43 ms, cells 10.8 s');
  });

  it('says when archive.org had to be asked again', async () => {
    const el = await status(
      { state: 'ready' },
      {
        text: 'sea ice',
        phase: 'scanning',
        elapsed: 4200,
        progress: {
          cellsDone: 12,
          cells: 32,
          bytes: 30_100_000,
          requests: 22,
          retries: 2,
        },
      },
    );
    expect(text(el)).to.contain('4.2 s, 2 retried after an error');
  });

  it('says why a search failed', async () => {
    const el = await status(
      { state: 'failed', message: 'HTTP 503' },
      { text: 'sea ice', phase: 'failed', elapsed: 10, message: 'HTTP 503' },
    );
    expect(text(el)).to.contain("The model didn't load: HTTP 503");
    expect(text(el)).to.contain('Searching “sea ice” by meaning failed');
  });
});
