export type DateFormat = 'short' | 'long';

export function formatDate(
  date: Date | undefined,
  format: DateFormat = 'short',
  locale: string = 'en-US'
): string {
  if (!date) return '';
  const options: any = {
    short: {
      month: '2-digit',
      year: '2-digit',
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    },
  };
  const dateFormatter = new Intl.DateTimeFormat(locale, options[format]);
  return dateFormatter.format(date);
}
