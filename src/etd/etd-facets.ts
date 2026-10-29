import type { SourceFacet } from '../serverless-search/search-source';
import type { EtdFacetReader } from './engine/facets';
import { languageCodes, languageName } from './etd-languages';

/**
 * ETD's facets, in one table: how the engine reads each from a thesis's
 * facet row, how collection-browser shows it, and how its values are named.
 * Adding a facet is adding an entry here (plus any row byte it needs kept,
 * in engine/facets.ts). Year isn't here: it's the date picker.
 *
 * Values follow the live etd-search page (drawFacets, pass(); page build
 * p112).
 */
export interface EtdFacet
  extends EtdFacetReader,
    Pick<SourceFacet, 'title' | 'pluralTitle' | 'after'> {
  /** A value code's name, as shown and as the facet filters by. */
  label(code: string): string;
  /** The codes a shown name stands for (several codes can share a name). */
  codesFor(name: string): string[];
}

/** A code -> name table, and its reverse. */
function named(names: Record<string, string>) {
  return {
    label: (code: string) => names[code] ?? code,
    codesFor: (name: string) => {
      const codes = Object.keys(names).filter(code => names[code] === name);
      return codes.length ? codes : [name];
    },
  };
}

let regionNames: Intl.DisplayNames | undefined;
let countryCodesByName: Map<string, string[]> | undefined;

/** A country code's English name; the code when nothing names it (e.g. 'SU'). */
function countryName(code: string): string {
  try {
    regionNames ??= new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(code) ?? code;
  } catch {
    return code;
  }
}

function countryCodes(name: string): string[] {
  if (!countryCodesByName) {
    countryCodesByName = new Map();
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (const a of letters) {
      for (const b of letters) {
        const code = a + b;
        const label = countryName(code);
        if (label === code) continue;
        countryCodesByName.set(label, [
          ...(countryCodesByName.get(label) ?? []),
          code,
        ]);
      }
    }
  }
  return countryCodesByName.get(name) ?? [name];
}

export const DEGREE_NAMES: Record<string, string> = {
  phd: 'Doctoral',
  masters: "Master's",
  bachelors: "Bachelor's",
  other: 'Other',
  unknown: 'Unknown',
};
const DEGREES = named(DEGREE_NAMES);

/** Source flags, under the live page's brand-name labels. */
export const SOURCE_FLAGS = ['oai', 'ia', 'wbm', 'libcat', 'printed'];
export const SOURCE_NAMES: Record<string, string> = {
  oai: 'OAI',
  ia: 'Internet Archive',
  wbm: 'Wayback Machine',
  libcat: 'Library catalog',
  printed: 'Printed abstracts',
};
const SOURCES = named(SOURCE_NAMES);

export const AVAILABILITY_NAMES: Record<string, string> = {
  abstract: 'Has abstract',
  archived: 'Archived (whole thesis)',
  saved: 'Document saved',
  live: 'Has live link',
};
const AVAILABILITY = named(AVAILABILITY_NAMES);

export const ETD_FACETS: readonly EtdFacet[] = [
  {
    key: 'language',
    title: 'Language',
    pluralTitle: 'Languages',
    read: (rows, docId, add) => {
      const code = rows.language(docId);
      if (code) add(code);
    },
    label: languageName,
    codesFor: languageCodes,
  },
  {
    key: 'country',
    title: 'Country',
    pluralTitle: 'Countries',
    after: 'language',
    read: (rows, docId, add) => {
      const code = rows.country(docId);
      if (code) add(code);
    },
    label: countryName,
    codesFor: countryCodes,
  },
  {
    // Most records don't say: "unknown" is a value of its own, so ticking
    // "Doctoral" alone doesn't silently hide them.
    key: 'degree',
    title: 'Degree level',
    pluralTitle: 'Degree levels',
    after: 'year',
    read: (rows, docId, add) => add(rows.level(docId) ?? 'unknown'),
    ...DEGREES,
  },
  {
    // A thesis can come from several sources.
    key: 'source',
    title: 'Source',
    pluralTitle: 'Sources',
    after: 'country',
    read: (rows, docId, add) => {
      for (const flag of SOURCE_FLAGS) if (rows.hasFlag(docId, flag)) add(flag);
    },
    ...SOURCES,
  },
  {
    // Requirements, not categories: picking two means both.
    key: 'availability',
    title: 'Availability',
    pluralTitle: 'Availability',
    after: 'degree',
    combine: 'all',
    read: (rows, docId, add) => {
      if (rows.hasFlag(docId, 'hasAbstract')) add('abstract');
      // The whole thesis is retrievable.
      if (rows.hasFlag(docId, 'complete')) add('archived');
      // At least one part is in the archive.
      if (['ia', 'wbm', 'archived'].some(flag => rows.hasFlag(docId, flag))) {
        add('saved');
      }
      // An archive.org item has no separate live url; everything else does.
      if (!rows.hasFlag(docId, 'ia')) add('live');
    },
    ...AVAILABILITY,
  },
];

/** The table's facets as a serverless search source describes them. */
export const ETD_SOURCE_FACETS: readonly SourceFacet[] = ETD_FACETS.map(
  ({ key, title, pluralTitle, after, combine }) => ({
    key,
    title,
    pluralTitle,
    after,
    combine,
  }),
);

/** A facet in the table by key. */
export function etdFacet(key: string): EtdFacet | undefined {
  return ETD_FACETS.find(facet => facet.key === key);
}
