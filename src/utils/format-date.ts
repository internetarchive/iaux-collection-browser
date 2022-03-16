/*
 * Display date
 * Override browser timezone to always display same date as in data
 */
export type DateFormat =
  | 'short' // 12/20
  | 'long'; // Dec 20, 2020

export function formatDate(
  date: Date | undefined,
  format: DateFormat = 'short',
  locale: string = 'en-US'
): string {
  // Return blank if undefined
  if (!date) return '';

  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'UTC', // Override browser timezone
  };
  switch (format) {
    case 'short':
      options.month = '2-digit';
      options.year = '2-digit';
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
