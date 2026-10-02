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

  it('drives Intl.NumberFormat-based formatting (formatCount) once switched to es', async () => {
    await setLocale('es');
    const { getLocale } = await import('../../src/utils/get-locale');
    const { formatCount } = await import('../../src/utils/format-count');

    expect(getLocale()).to.equal('es');
    // Spanish groups thousands with a period, not English's comma, so this
    // only renders correctly when formatCount's default locale comes from
    // the active probe translation rather than the untranslated source.
    expect(formatCount(77312)).to.equal('77.312');
  });
});
