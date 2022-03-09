import { msg, str } from '@lit/localize';

export type NumberFormat = 'short' | 'long';
type LabelFormat = 'short' | 'long';
type Divisor = 1_000_000_000 | 1_000_000 | 1_000 | 1;

/**
 * Return the magnitude of a number.
 * @param {number} number
 * @param {NumberFormat} numberFormat
 * @returns {Divisor}
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
 * Round a number to the nearest magnitude.
 * @param {number} number
 * @param {Divisor} divisor
 * @returns {number}
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
 * @param {number} rounded
 * @param {Divisor} divisor
 * @param {LabelFormat} format
 * @returns {string}
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
 * Format a media count number into short icon or longer text string.
 * @param {number} number
 * @param {NumberFormat} numberFormat
 * @param {LabelFormat} labelFormat
 * @returns {string}
 */
export function formatCount(
  number: number,
  numberFormat: NumberFormat = 'long',
  labelFormat: LabelFormat = 'short',
  locale: string = 'en-US'
): string {
  const divisor = magnitude(number, numberFormat);
  const rounded = round(number, divisor);
  return labelize(rounded, divisor, labelFormat, locale);
}
