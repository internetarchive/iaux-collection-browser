/**
 * Determines the appropriate search filter field name based on date format.
 * Dates in YYYY-MM format (containing a hyphen) use the `date` field;
 * dates in YYYY format use the `year` field.
 */
export function dateFilterField(
  minDate?: string,
  maxDate?: string,
): 'date' | 'year' {
  return minDate?.includes('-') || maxDate?.includes('-') ? 'date' : 'year';
}
