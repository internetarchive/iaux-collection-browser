import { describe, it, expect } from 'vitest';
import {
  localDateFromUTC,
  isFirstMillisecondOfUTCYear,
} from '../../src/utils/local-date-from-utc';

describe('localDateFromUTC', () => {
  it('converts dates from UTC to local timezone', async () => {
    const date = new Date(1990, 1, 2, 3, 4, 5, 6);
    const dateFromUTC = new Date(Date.UTC(1990, 1, 2, 3, 4, 5, 6));
    expect(localDateFromUTC(date).toISOString()).to.equal(
      dateFromUTC.toISOString(),
    );
  });
});

describe('isFirstMillisecondOfUTCYear', () => {
  it('returns true when date is exactly Jan 1 at midnight in UTC', async () => {
    const midnightOnNewYearsDay = new Date('2010-01-01T00:00:00Z');
    expect(isFirstMillisecondOfUTCYear(midnightOnNewYearsDay)).to.be.true;
  });

  it('returns false when date is not exactly Jan 1 at midnight in UTC', async () => {
    const oneMillisecondTooEarly = new Date('2009-12-31T23:59:59.999Z');
    expect(isFirstMillisecondOfUTCYear(oneMillisecondTooEarly)).to.be.false;

    const oneMillisecondTooLate = new Date('2010-01-01T00:00:00.001Z');
    expect(isFirstMillisecondOfUTCYear(oneMillisecondTooLate)).to.be.false;

    const middleOfTheYear = new Date('2010-06-01T00:00:00Z');
    expect(isFirstMillisecondOfUTCYear(middleOfTheYear)).to.be.false;
  });

  it('returns false when no date provided', async () => {
    expect(isFirstMillisecondOfUTCYear(undefined)).to.be.false;
  });
});
