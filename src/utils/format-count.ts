<<<<<<< HEAD
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
=======
import { msg, str } from '@lit/localize';

type LabelFormat = 'short' | 'long';
type NumberFormat = 'short' | 'long';
>>>>>>> a1d23f7 (add count, date formatting)
type Divisor = 1_000_000_000 | 1_000_000 | 1_000 | 1;

/**
 * Return the magnitude of a number.
<<<<<<< HEAD
=======
 * @param {number} number
 * @param {NumberFormat} numberFormat
 * @returns {Divisor}
>>>>>>> a1d23f7 (add count, date formatting)
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
<<<<<<< HEAD
 * Round a number given passed magnitude.
 * Significant digits of value less than 10 get a decimal.
=======
 * Round a number to the nearest magnitude.
 * @param {number} number
 * @param {Divisor} divisor
 * @returns {number}
>>>>>>> a1d23f7 (add count, date formatting)
 */
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
<<<<<<< HEAD
=======
 * @param {number} rounded
 * @param {Divisor} divisor
 * @param {LabelFormat} format
 * @returns {string}
>>>>>>> a1d23f7 (add count, date formatting)
 */
function labelize(
  rounded: number,
  divisor: Divisor,
<<<<<<< HEAD
  format: LabelFormat,
  locale: string
=======
  format: LabelFormat
>>>>>>> a1d23f7 (add count, date formatting)
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
<<<<<<< HEAD
      return new Intl.NumberFormat(locale).format(rounded);
=======
      return msg(str`${rounded}`);
>>>>>>> a1d23f7 (add count, date formatting)
  }
}

/**
<<<<<<< HEAD
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
=======
 * Format a media count number into short icon or longer text string.
 * @param {number} number
 * @param {NumberFormat} numberFormat
 * @param {LabelFormat} labelFormat
 * @returns {string}
 */
export function formatCount(
  number: number,
  numberFormat: NumberFormat = 'long',
  labelFormat: LabelFormat = 'short'
): string {
  const divisor = magnitude(number, numberFormat);
  const rounded = round(number, divisor);
  return labelize(rounded, divisor, labelFormat);
>>>>>>> a1d23f7 (add count, date formatting)
}
