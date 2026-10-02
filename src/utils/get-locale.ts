import { msg } from '@lit/localize';

/**
 * Returns the locale code currently active in the host app.
 *
 * This package never sets up `@lit/localize` itself (the host app owns that,
 * once), so `@lit/localize`'s own `getLocale()` isn't available here — it's
 * only returned from the host's one setup call. `msg()` always reflects the
 * host app's current locale, read fresh on every call, with no dependency on
 * when this package happened to load relative to the host setting its
 * locale. This probes a string whose only translation is the ISO code of
 * the locale it was translated into, and reads the locale off whichever
 * string comes back: the untranslated source for the source locale, or the
 * code itself once a target locale's translation is in place.
 */
export function getLocale(): string {
  return msg('en', {
    desc: 'Not shown to users. Reports the active locale: translators should translate this to the ISO code of the locale they are translating into.',
  });
}
