import { expect } from '@open-wc/testing';
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
      '1234'
    );
  });

  it('returns locale formatted date', () => {
    expect(formatDate(testDate, 'long', 'de-DE')).to.equal('09. Dez. 2020');
  });
});
