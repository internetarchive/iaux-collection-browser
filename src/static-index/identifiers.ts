import type { IdSpace } from './manifest';

/**
 * A hit's identifier: the search's prefix, then the id's 1-based position
 * in its id space, id - firstId + 1. With ids from 1 (ETD's text docIds)
 * that's the id itself; with ids from 0 (ETD's vector ids, docs.bin rows)
 * the first doc is `etdv-1`, never `etdv-0`.
 */
export function identifierFor(
  prefix: string,
  id: number,
  firstId: IdSpace['firstId'],
): string {
  return `${prefix}${id - firstId + 1}`;
}

/**
 * The id behind an identifier, or undefined when it isn't one of this
 * prefix's, or names no doc in the id space.
 */
export function idFromIdentifier(
  identifier: string,
  prefix: string,
  space: Pick<IdSpace, 'count' | 'firstId'>,
): number | undefined {
  if (!identifier.startsWith(prefix)) return undefined;
  const match = identifier.slice(prefix.length).match(/^[1-9]\d*$/);
  const position = match ? Number(match[0]) : 0;
  return position >= 1 && position <= space.count
    ? position - 1 + space.firstId
    : undefined;
}
