/*
 * Replaces Petabox www/common/Util::number_format()
 * For positive numbers only.
 */
import { msg, str } from '@lit/localize';
/**
 * Return the magnitude of a number.
 */
function magnitude(number, numberFormat) {
    let divisor = 1;
    if (number >= 1000000000) {
        divisor = 1000000000;
    }
    else if (number >= 1000000) {
        divisor = 1000000;
    }
    else if (number >= 1000 && numberFormat === 'short') {
        divisor = 1000;
    }
    return divisor;
}
/**
 * Round a number given passed magnitude.
 * Significant digits of value less than 10 get a decimal.
 */
function round(number = 0, divisor) {
    const result = number / divisor;
    const roundToOne = result < 10;
    let rounded = 0;
    if (roundToOne) {
        rounded = Math.round((result + Number.EPSILON) * 10) / 10;
    }
    else {
        rounded = Math.round(result);
    }
    return rounded;
}
/**
 * Return a label for a number and format.
 */
function labelize(rounded, divisor, format, locale) {
    switch (divisor) {
        case 1000000000:
            if (format === 'short') {
                return msg(str `${rounded}B`);
            }
            return msg(str `${rounded} billion`);
        case 1000000:
            if (format === 'short') {
                return msg(str `${rounded}M`);
            }
            return msg(str `${rounded} million`);
        case 1000:
            if (format === 'short') {
                return msg(str `${rounded}K`);
            }
            return msg(str `${rounded} thousand`);
        default:
            return new Intl.NumberFormat(locale).format(rounded);
    }
}
/**
 * Format a "count" number into short "icon" or longer text string.
 * For positive numbers only.
 */
export function formatCount(count, numberFormat = 'long', labelFormat = 'short', locale = 'en-US') {
    // Return blank if undefined
    const number = count !== null && count !== void 0 ? count : -1;
    if (number < 0) {
        return '';
    }
    const divisor = magnitude(number, numberFormat);
    const rounded = round(number, divisor);
    return labelize(rounded, divisor, labelFormat, locale);
}
//# sourceMappingURL=format-count.js.map