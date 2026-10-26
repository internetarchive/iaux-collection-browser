/*
 * Replaces Petabox www/common/Util::number_format()
 * For positive numbers only.
 */
import { getLocale } from './get-locale';

export type NumberFormat =
  | 'short' // 1.2 [K | thousand]
  | 'long'; // 1,200 [No label for numbers < 1,000,000]
export type LabelFormat =
  | 'short' // [1.2]K
  | 'long'; // [1.2] thousand

/**
 * Whether a number should be abbreviated to a compact form (e.g. "77K")
 * rather than shown in full. Millions and up always abbreviate; thousands
 * only abbreviate when the caller asked for the short NumberFormat.
 */
function shouldAbbreviate(number: number, numberFormat: NumberFormat): boolean {
  if (number >= 1_000_000) return true;
  return numberFormat === 'short' && number >= 1_000;
}

/**
 * Format a "count" number into short "icon" or longer text string.
 * For positive numbers only. Uses `Intl.NumberFormat` so both the digit
 * grouping and the abbreviation word/letter (e.g. "K" vs "mil") follow the
 * given locale's conventions.
 */
export function formatCount(
  count: number | undefined,
  numberFormat: NumberFormat = 'long',
  labelFormat: LabelFormat = 'short',
  locale: string = getLocale(),
): string {
  // Return blank if undefined
  const number = count ?? -1;
  if (number < 0) {
    return '';
  }
  if (shouldAbbreviate(number, numberFormat)) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: labelFormat === 'short' ? 'short' : 'long',
    }).format(number);
  }
  return new Intl.NumberFormat(locale).format(number);
}
