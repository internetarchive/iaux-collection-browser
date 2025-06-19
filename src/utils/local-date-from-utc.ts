/**
 * Converts a given UTC date into the equivalent local-timestamp one.
 */
export function localDateFromUTC(date: Date): Date {
  return new Date(date.getTime() - date.getTimezoneOffset() * 1000 * 60);
}

/**
 * Returns whether a given UTC date corresponds to the first
 * millisecond of the year (e.g., Jan 1 at exactly midnight).
 */
export function isFirstMillisecondOfUTCYear(date?: Date): boolean {
  if (!date) return false;
  return date.toISOString().endsWith('-01-01T00:00:00.000Z');
}
