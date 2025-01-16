/*
 * Display date
 * Override browser timezone to always display same date as in data
 */
export type DateFormat =
  | 'year-only' // 2020
  | 'short' // Dec 2020
  | 'long'; // Dec 20, 2020

export function formatDate(
  date: Date | undefined,
  format: DateFormat = 'short',
  locale: string = 'en-US'
): string {
  // Return blank if undefined
  if (!date) return '';

  // the date is already in UTC timezone so we should not add timeZone here again.
  const options: Intl.DateTimeFormatOptions = {};

  switch (format) {
    case 'year-only':
      // If we're only using the year, ensure we output the correct UTC year and not
      // the local year. If the local timezone is used, we can get strange off-by-one
      // errors due to quirks of timezone handling for older years.
      return `${date.getUTCFullYear()}`;
    case 'short':
      options.month = 'short';
      options.year = 'numeric';
      break;
    case 'long':
      options.year = 'numeric';
      options.month = 'short';
      options.day = '2-digit';
      break;
    default:
      break;
  }

  const dateFormatter = new Intl.DateTimeFormat(locale, options);
  return dateFormatter.format(date);
}
