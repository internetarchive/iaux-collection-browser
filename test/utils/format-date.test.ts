import { describe, it, expect } from 'vitest';
import { formatDate } from '../../src/utils/format-date';

const testDate = new Date(2020, 11, 9);

describe('formatDate', () => {
  it('returns blank when undefined date', () => {
    expect(formatDate(undefined)).to.equal('');
  });

  it('returns short date when no DateFormat', () => {
    expect(formatDate(testDate)).to.equal('Dec 2020');
  });

  it('returns long date when long DateFormat', () => {
    expect(formatDate(testDate, 'long')).to.equal('Dec 09, 2020');
  });

  it('returns year-only date when year-only DateFormat', () => {
    expect(formatDate(testDate, 'year-only')).to.equal('2020');
  });

  it('returns correct year for old "Jan 1 at midnight" dates and year-only DateFormat', () => {
    // Many standard timezones have a discontinuity in date parsing at some point during
    // the 19th or 20th century, corresponding to the creation of the timezone.
    // Dates prior to the discontinuity generally have a non-hour-aligned timezone offset
    // which can throw off the calculated year for dates which are close to a year boundary.
    // This is particularly problematic for "Jan 1 at midnight" dates, which are what we
    // receive from the search engine for date metadata that only specifies the year.
    // So we must ensure these older dates still output the correct year, not the prior one.
    expect(formatDate(new Date('1234-01-01T00:00:00Z'), 'year-only')).to.equal(
      '1234',
    );
  });

  it('uses UTC time zone by default or when useLocalTime is explicitly false', () => {
    // Default options
    expect(formatDate(new Date('2025-02-15T00:00:00Z'), 'long')).to.equal(
      'Feb 15, 2025',
    );
    expect(formatDate(new Date('2025-02-15T23:59:59Z'), 'long')).to.equal(
      'Feb 15, 2025',
    );

    // Explicit `useLocalTime: false` option
    const options = { useLocalTime: false };
    expect(
      formatDate(new Date('2025-02-15T00:00:00Z'), 'long', options),
    ).to.equal('Feb 15, 2025');
    expect(
      formatDate(new Date('2025-02-15T23:59:59Z'), 'long', options),
    ).to.equal('Feb 15, 2025');
  });

  it('uses local time zone when specified', () => {
    // N.B.:
    // - Positive offset corresponds to UTC-x zones
    // - Negative offset corresponds to UTC+x zones
    const offset = new Date().getTimezoneOffset();
    const options = { useLocalTime: true };

    // The expected behavior depends on the local time where the tests are run:
    if (offset > 0) {
      // If we're testing under a positive offset, the first second of the UTC day should locally fall on the previous day
      expect(
        formatDate(new Date('2025-02-15T00:00:00Z'), 'long', options),
      ).to.equal('Feb 14, 2025');
    } else if (offset < 0) {
      // If we're testing under a negative offset, the last second of the UTC day should locally fall on the next day
      expect(
        formatDate(new Date('2025-02-15T23:59:59Z'), 'long', options),
      ).to.equal('Feb 16, 2025');
    } else {
      // If we're testing *in* UTC, then both seconds should locally fall on the same day
      expect(
        formatDate(new Date('2025-02-15T00:00:00Z'), 'long', options),
      ).to.equal('Feb 15, 2025');
      expect(
        formatDate(new Date('2025-02-15T23:59:59Z'), 'long', options),
      ).to.equal('Feb 15, 2025');
    }
  });

  it('returns locale formatted date', () => {
    expect(formatDate(testDate, 'long', { locale: 'de-DE' })).to.equal(
      '09. Dez. 2020',
    );
  });
});
