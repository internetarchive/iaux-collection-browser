/*
 * Display date
 * Override browser timezone to always display same date as in data
 */
export type DateFormat =
  | 'year-only' // 2020
  | 'short' // Dec 2020
  | 'long'; // Dec 20, 2020

/**
 * Extra options accepted by the `formatDate` function
 */
export type FormatDateOptions = {
  /**
   * Which locale to format the date string for (default `'en-US'`)
   */
  locale?: string;
  /**
   * Whether to display the date in the browser's local time zone.
   * Default is `false`, displaying the dates in UTC.
   */
  useLocalTime?: boolean;
};

export function formatDate(
  date: Date | undefined,
  format: DateFormat = 'short',
  { locale = 'en-US', useLocalTime = false }: FormatDateOptions = {},
): string {
  // Return blank if undefined
  if (!date) return '';

  // The dates provided by the backend are assumed to already be with respect to UTC,
  // and by default we specify that they should be rendered as such. If the
  // `useLocalTime` option was set, we omit the UTC time zone from our format options
  // so that the browser's local time zone is used instead.
  const options: Intl.DateTimeFormatOptions = useLocalTime
    ? {}
    : { timeZone: 'UTC' };

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
