/*
 * Replaces Petabox www/common/Util::number_format()
 * For positive numbers only.
 */
import { msg, str } from '@lit/localize';

export type NumberFormat =
  | 'short' // 1.2 [K | thousand]
  | 'long'; // 1,200 [No label for numbers < 1,000,000]
export type LabelFormat =
  | 'short' // [1.2]K
  | 'long'; // [1.2] thousand
export type Divisor = 1_000_000_000 | 1_000_000 | 1_000 | 1_0 | 1;

/**
 * Return the magnitude of a number.
 */
function magnitude(number: number, numberFormat: NumberFormat): Divisor {
  let divisor: Divisor = 1;
  if (number >= 1_000_000_000) {
    divisor = 1_000_000_000;
  } else if (number >= 1_000_000) {
    divisor = 1_000_000;
  } else if (number >= 1_000 && numberFormat === 'short') {
    divisor = 1_000;
  }
  return divisor;
}

/**
 * Round a number given passed magnitude.
 * Significant digits of value less than 10 get a decimal.
 */
// eslint-disable-next-line default-param-last
function round(number: number = 0, divisor: Divisor): number {
  const result = number / divisor;
  const roundToOne = result < 10;
  let rounded: number = 0;
  if (roundToOne) {
    rounded = Math.round((result + Number.EPSILON) * 10) / 10;
  } else {
    rounded = Math.round(result);
  }
  return rounded;
}

/**
 * Return a label for a number and format.
 */
function labelize(
  rounded: number,
  divisor: Divisor,
  format: LabelFormat,
  locale: string
): string {
  switch (divisor) {
    case 1_000_000_000:
      if (format === 'short') {
        return msg(str`${rounded}B`);
      }
      return msg(str`${rounded} billion`);
    case 1_000_000:
      if (format === 'short') {
        return msg(str`${rounded}M`);
      }
      return msg(str`${rounded} million`);
    case 1_000:
      if (format === 'short') {
        return msg(str`${rounded}K`);
      }
      return msg(str`${rounded} thousand`);

    default:
      return new Intl.NumberFormat(locale).format(rounded);
  }
}

/**
 * Format a "count" number into short "icon" or longer text string.
 * For positive numbers only.
 */
export function formatCount(
  count: number | undefined,
  numberFormat: NumberFormat = 'long',
  labelFormat: LabelFormat = 'short',
  locale: string = 'en-US'
): string {
  // Return blank if undefined
  const number = count ?? -1;
  if (number < 0) {
    return '';
  }
  const divisor = magnitude(number, numberFormat);
  const rounded = round(number, divisor);
  return labelize(rounded, divisor, labelFormat, locale);
}
