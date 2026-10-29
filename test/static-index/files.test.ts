import { expect } from '@open-wc/testing';
import { fileSetUrl, sidecarMatches } from '../../src/static-index/files';
import { MODEL_LIBRARIES, modelLibraryUrl } from '../../src/static-index/model';

const DATA = 'https://ia800000.us.archive.org/1/items/papers/';

describe('fileSetUrl', () => {
  it('reads a versioned build’s own copy of each file', () => {
    const files = { naming: 'versioned', version: '20261026-5e5902' } as const;
    expect(fileSetUrl(DATA, files, 'dict.bin')).to.equal(
      `${DATA}dict.bin.20261026-5e5902?v=20261026-5e5902`,
    );
  });

  it('reads a stamped build’s fixed name, keyed to its stamp', () => {
    const files = { naming: 'stamped', built: '2026-10-12 11:31' } as const;
    expect(fileSetUrl(DATA, files, 'cells.bin')).to.equal(
      `${DATA}cells.bin?v=2026-10-12%2011%3A31`,
    );
  });

  it('gives a new stamp a new url, so the browser doesn’t serve the old build', () => {
    const before = fileSetUrl(
      DATA,
      { naming: 'stamped', built: '2026-10-12 11:31' },
      'cells.bin',
    );
    const after = fileSetUrl(
      DATA,
      { naming: 'stamped', built: '2026-11-02 09:00' },
      'cells.bin',
    );
    expect(after).not.to.equal(before);
  });
});

describe('sidecarMatches', () => {
  const store = { n: 18176413, built: '2026-10-12 11:31', dim: 384 };

  it('uses a sidecar from the same build', () => {
    const codes = { ...store, bits: 4, rowbytes: 196 };
    expect(sidecarMatches(store, codes, ['n', 'built', 'dim'])).to.be.true;
  });

  it('ignores codes left over from another build, even with the same size', () => {
    expect(
      sidecarMatches(store, { ...store, built: '2026-09-30 08:00' }, [
        'n',
        'built',
        'dim',
      ]),
    ).to.be.false;
  });

  it('checks only what it’s told to: facet rows only need the row count', () => {
    const facets = { n: store.n };
    expect(sidecarMatches(store, facets, ['n'])).to.be.true;
    expect(sidecarMatches(store, { n: store.n - 1 }, ['n'])).to.be.false;
  });

  it('never uses a sidecar with no meta', () => {
    expect(sidecarMatches(store, undefined, [])).to.be.false;
  });
});

describe('modelLibraryUrl', () => {
  it('maps the pinned transformers.js build to its jsDelivr script', () => {
    expect(
      modelLibraryUrl({ name: '@huggingface/transformers', version: '3.0.2' }),
    ).to.equal(
      'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/transformers.min.js',
    );
  });

  it('has nothing for a build it doesn’t pin, or a library it doesn’t know', () => {
    expect(
      modelLibraryUrl({ name: '@huggingface/transformers', version: '3.0.3' }),
    ).to.be.undefined;
    expect(modelLibraryUrl({ name: 'transformers', version: '3.0.2' })).to.be
      .undefined;
  });

  it('can’t be pointed at an object’s own properties by a manifest', () => {
    expect(modelLibraryUrl({ name: 'constructor', version: 'name' })).to.be
      .undefined;
    expect(
      modelLibraryUrl({
        name: '@huggingface/transformers',
        version: '__proto__',
      }),
    ).to.be.undefined;
  });

  it('pins only exact versions on allowed CDNs', () => {
    for (const versions of Object.values(MODEL_LIBRARIES)) {
      for (const [version, url] of Object.entries(versions)) {
        expect(version).to.match(/^\d+\.\d+\.\d+$/);
        expect(url).to.match(/^https:\/\/cdn\.jsdelivr\.net\/npm\//);
        expect(url).to.include(`@${version}/`);
      }
    }
  });
});
