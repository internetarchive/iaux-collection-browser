import { expect, fixture, html, waitUntil } from '@open-wc/testing';
import '../../../src/etd/demo/etd-file-check';
import type { EtdFileCheckReport } from '../../../src/etd/demo/etd-file-check';
import {
  textSizeRules,
  vectorSizeRules,
} from '../../../src/etd/engine/file-checks';
import type { EtdFileCheck } from '../../../src/etd/engine/file-checks';
import { ItemFileList } from '../../../src/static-index/file-list';
import { checkSizes } from '../../../src/static-index/size-rules';

const IVF = {
  n: 2,
  ncell: 2,
  dim: 2,
  rowbytes: 8,
  docbytes: 138,
  fields: { title: 40, host: 20, date: 10, landing: 60, lang: 8 },
};

function check(sizes: Record<string, number>, vector: boolean): EtdFileCheck {
  const list = new ItemFileList(
    'etd-search',
    Object.entries(sizes).map(([name, size]) => ({ name, size, mtime: 1 })),
  );
  const rules = vector
    ? vectorSizeRules(IVF, 5)
    : textSizeRules({ v: 'v1', n_docs: 5, stub_bytes: 320 });
  return { itemId: 'etd-search', sizes: checkSizes(rules, list) };
}

const TEXT_OK = check({ 'stubs.bin.v1': 1600 }, false);
/** Every store file fits; txt2vrow.bin is from a 4-doc text build. */
const VECTOR_STALE_MAP = check(
  {
    'centroids.f16': 8,
    'cell.dir': 12,
    'cells.bin': 16,
    'docs.bin': 276,
    'cell-facets.bin': 16,
    'vrow2txt.bin': 8,
    'txt2vrow.bin': 16,
  },
  true,
);

async function report(text?: EtdFileCheck, vector?: EtdFileCheck) {
  return fixture<EtdFileCheckReport>(
    html`<etd-file-check .text=${text} .vector=${vector}></etd-file-check>`,
  );
}

const summary = (el: EtdFileCheckReport) =>
  el.shadowRoot!.querySelector('summary')!.textContent!.replace(/\s+/g, ' ');

describe('etd-file-check', () => {
  it('shows nothing until a check arrives', async () => {
    const el = await report();
    expect(el.shadowRoot!.querySelector('details')).to.be.null;
  });

  it('says the word index fits, and that meaning search is checked later', async () => {
    const el = await report(TEXT_OK);
    expect(summary(el)).to.contain('Index files checked: 1 fit ✅');
    expect(el.shadowRoot!.textContent).to.contain(
      "Search by meaning's files are checked when it first loads.",
    );
  });

  it('counts a stale map and says nothing is off because of it', async () => {
    const el = await report(TEXT_OK, VECTOR_STALE_MAP);
    expect(summary(el)).to.contain("7 fit ✅ · 1 don't fit ⚠️");
    const row = el.shadowRoot!.querySelector('tr[data-status="mismatch"]')!;
    expect(row.textContent).to.contain('txt2vrow.bin');
    expect(row.textContent).to.contain('which fits 4 records');
    const failed = el.shadowRoot!.querySelector('.failed')!;
    expect(failed.getAttribute('data-layer')).to.equal('meaning-to-words map');
    expect(failed.textContent).to.contain('Nothing here uses this map yet');
  });

  it('says when the list could not be read', async () => {
    const el = await report({ itemId: 'etd-search' });
    expect(summary(el)).to.contain("file list didn't load");
    expect(el.shadowRoot!.textContent).to.contain(
      "The file list for etd-search didn't load",
    );
  });

  it('lists the index files it cannot read from archive.org, and why', async () => {
    // archive.org as it answers another origin: only .json names readable
    const fetchFn = (async (input: RequestInfo | URL) => {
      const url = String(input);
      if (url.includes('/metadata/')) {
        return new Response(
          JSON.stringify({
            result: [
              { name: 'current.json', size: '30', mtime: '1' },
              { name: 'stubs.bin.v1', size: '1600', mtime: '1' },
              { name: 'dict.dir.v1', size: '8', mtime: '1' },
            ],
          }),
        );
      }
      if (url.includes('current.json')) {
        return new Response(JSON.stringify({ v: 'v1' }));
      }
      throw new TypeError('Failed to fetch');
    }) as typeof fetch;
    const el = await fixture<EtdFileCheckReport>(
      html`<etd-file-check
        itemId="etd-search"
        .fetchFn=${fetchFn}
        .text=${TEXT_OK}
      ></etd-file-check>`,
    );
    // Not checked until the drawer opens
    expect(summary(el)).not.to.include('archive.org');

    const details = el.shadowRoot!.querySelector('details')!;
    details.open = true;
    await waitUntil(
      () => el.shadowRoot!.querySelector('table.blocked'),
      'blocked files never listed',
    );

    const rows = [
      ...el.shadowRoot!.querySelectorAll('table.blocked tbody tr'),
    ].map(row => [
      row.querySelector('th')!.textContent!.trim(),
      row.querySelector('td')!.textContent!.trim(),
    ]);
    expect(rows.map(([file]) => file)).to.deep.equal([
      'stubs.bin.v1',
      'dict.dir.v1',
    ]);
    rows.forEach(([, why]) => expect(why).to.include('no CORS header'));
    expect(summary(el)).to.include('2 blocked from archive.org ❌');
  });
});
