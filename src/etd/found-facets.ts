import type { EtdRecord, EtdSample } from './etd-engine';

/**
 * Facets found in a query's matches, from the records themselves rather
 * than a precomputed facet file: each candidate field's values are counted
 * over a random sample of the matches (all of them when there are few), and
 * a field is shown as a group only when its values look like categories.
 *
 * The checks, with what "sea ice" gave on 3,000 random matches:
 * - enough records have a value;
 * - no one value covers nearly all of them, so there's a choice;
 * - values repeat, rather than being one-offs: repository had 789 values
 *   and decade 15, but creators 3,552 (theses have their own authors).
 */

/** A field that might be a facet: how to read its values from a record. */
export interface FoundCandidate {
  key: string;
  title: string;
  values(record: EtdRecord): string[];
}

export interface FoundValue {
  value: string;
  /** Records in the sample with it. */
  count: number;
}

export interface FoundGroup {
  key: string;
  title: string;
  /** Every value in the sample, most records first. */
  values: FoundValue[];
  /** Sampled records with any value for it. */
  withValue: number;
  /** Whether it passed the checks, so is shown as a group. */
  shown: boolean;
  /** Why it isn't shown, when it isn't. */
  why?: string;
}

export interface FoundFacets {
  /** Records the counts are from. */
  sampled: number;
  /** Matches they were picked from: the counts are exact when equal. */
  of: number;
  groups: FoundGroup[];
}

/**
 * Matches read to find facets: all of them up to this, else this many at
 * random. 3,000 found "sea ice"'s five biggest repositories (of 77,112
 * matches) with counts 9-15% off, in 47 requests, 7-9 s cold.
 */
export const FOUND_SAMPLE = 3000;

/** Fewer sampled records than this, and no field is judged. */
export const MIN_SAMPLED = 10;

/** At least this share of records needs a value. */
export const MIN_WITH_VALUE = 0.5;

/** A value on this share of the records or more leaves no choice. */
export const MAX_TOP_SHARE = 0.95;

/**
 * At least this share of the values needs to repeat in the sample (be on
 * two records or more). Sea ice's 3,000: repository 0.88, decade 1.00,
 * creators 0.01.
 */
export const MIN_REPEATED = 0.3;

/**
 * A year, from the first four digits standing alone in a date; undefined
 * if there are none. Stub dates are the source's own text cut to 10
 * bytes, so the year isn't always first: "Juni 2021", "01/01/2026".
 */
function yearOf(date: string): number | undefined {
  const match = /(?<!\d)(\d{4})(?!\d)/.exec(date);
  if (!match) return undefined;
  const year = Number(match[1]);
  // Bad dates in the source records run into the future, as in the engine.
  return year >= 1000 && year <= new Date().getFullYear() + 2
    ? year
    : undefined;
}

/** The fields an ETD record has that might be facets. */
export const ETD_FOUND_CANDIDATES: readonly FoundCandidate[] = [
  {
    key: 'repository',
    title: 'Repository',
    values: record => (record.domain ? [record.domain] : []),
  },
  {
    key: 'decade',
    title: 'Decade',
    values: record => {
      const year = yearOf(record.date);
      return year === undefined ? [] : [`${Math.floor(year / 10) * 10}s`];
    },
  },
  {
    key: 'creator',
    title: 'Creator',
    values: record =>
      record.creators
        .split(';')
        .map(name => name.trim())
        .filter(Boolean),
  },
];

/** Counts each candidate over the sample and judges which are groups. */
export function findFacets(
  sample: EtdSample,
  candidates: readonly FoundCandidate[] = ETD_FOUND_CANDIDATES,
): FoundFacets {
  const sampled = sample.records.length;
  return {
    sampled,
    of: sample.of,
    groups: candidates.map(candidate => {
      const counts = new Map<string, number>();
      let withValue = 0;
      for (const record of sample.records) {
        const values = new Set(candidate.values(record));
        if (values.size) withValue += 1;
        for (const value of values) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
      const values = [...counts]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
      const why = whyNotShown(values, withValue, sampled);
      return {
        key: candidate.key,
        title: candidate.title,
        values,
        withValue,
        shown: !why,
        ...(why ? { why } : {}),
      };
    }),
  };
}

/** Why a field isn't a group, in words; undefined when it is one. */
function whyNotShown(
  values: FoundValue[],
  withValue: number,
  sampled: number,
): string | undefined {
  if (sampled < MIN_SAMPLED) return 'too few results to tell';
  if (withValue < sampled * MIN_WITH_VALUE) {
    return `only ${percent(withValue / sampled)} of these have one`;
  }
  const top = values[0];
  if (top.count >= withValue * MAX_TOP_SHARE) {
    return `nearly all are ${top.value}`;
  }
  const occurrences = values.reduce((sum, { count }) => sum + count, 0);
  const repeated = values
    .filter(({ count }) => count > 1)
    .reduce((sum, { count }) => sum + count, 0);
  if (repeated < occurrences * MIN_REPEATED) {
    return `mostly one-offs: ${values.length.toLocaleString()} values in ${sampled.toLocaleString()} results`;
  }
  return undefined;
}

/** A sampled count scaled to all the matches: exact when nothing was left out. */
export function estimatedCount(count: number, found: FoundFacets): number {
  if (!found.sampled || found.sampled >= found.of) return count;
  return Math.round((count * found.of) / found.sampled);
}

function percent(share: number): string {
  return `${Math.round(share * 100)}%`;
}
