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
function yearOf(date) {
    const match = /(?<!\d)(\d{4})(?!\d)/.exec(date);
    if (!match)
        return undefined;
    const year = Number(match[1]);
    // Bad dates in the source records run into the future, as in the engine.
    return year >= 1000 && year <= new Date().getFullYear() + 2
        ? year
        : undefined;
}
/** The fields an ETD record has that might be facets. */
export const ETD_FOUND_CANDIDATES = [
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
        values: record => record.creators
            .split(';')
            .map(name => name.trim())
            .filter(Boolean),
    },
];
/** Counts each candidate over the sample and judges which are groups. */
export function findFacets(sample, candidates = ETD_FOUND_CANDIDATES) {
    const sampled = sample.records.length;
    return {
        sampled,
        of: sample.of,
        groups: candidates.map(candidate => {
            const counts = new Map();
            let withValue = 0;
            for (const record of sample.records) {
                const values = new Set(candidate.values(record));
                if (values.size)
                    withValue += 1;
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
function whyNotShown(values, withValue, sampled) {
    if (sampled < MIN_SAMPLED)
        return 'too few results to tell';
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
export function estimatedCount(count, found) {
    if (!found.sampled || found.sampled >= found.of)
        return count;
    return Math.round((count * found.of) / found.sampled);
}
function percent(share) {
    return `${Math.round(share * 100)}%`;
}
