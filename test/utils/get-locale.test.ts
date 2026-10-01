import { expect } from '@open-wc/testing';
import { configureLocalization } from '@lit/localize';

const { setLocale } = configureLocalization({
  sourceLocale: 'en',
  targetLocales: ['es'],
  loadLocale: () => import('../../src/locales/es'),
});

describe('getLocale', () => {
  it('returns the active locale even when first called after the host already changed it', async () => {
    // Simulates a lazily-loaded chunk: the host app switches locale before
    // this module ever loads, so a listener registered only once this
    // module imports would never have seen that change.
    await setLocale('es');
    const { getLocale } = await import('../../src/utils/get-locale');
    expect(getLocale()).to.equal('es');
  });

  it('tracks a later locale change too', async () => {
    const { getLocale } = await import('../../src/utils/get-locale');

    await setLocale('en');
    expect(getLocale()).to.equal('en');

    await setLocale('es');
    expect(getLocale()).to.equal('es');
  });
});
