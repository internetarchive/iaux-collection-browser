import { expect } from '@open-wc/testing';
import {
  localDateFromUTC,
  isFirstMillisecondOfUTCYear,
} from '../../src/utils/local-date-from-utc';

describe('localDateFromUTC', () => {
  it('converts dates from UTC to local timezone', async () => {
    const date = new Date(1990, 1, 2, 3, 4, 5, 6);
    const dateFromUTC = new Date(Date.UTC(1990, 1, 2, 3, 4, 5, 6));
    expect(localDateFromUTC(date).toISOString()).to.equal(
      dateFromUTC.toISOString()
    );
  });
});

describe('isFirstMillisecondOfUTCYear', () => {
  it('returns true when date is exactly Jan 1 at midnight in UTC', async () => {
    const midnightOnNewYearsDay = new Date(2010, 0, 1, 0, 0, 0, 0);
    expect(isFirstMillisecondOfUTCYear(midnightOnNewYearsDay)).to.be.true;
  });

  it('returns false when date is not exactly Jan 1 at midnight in UTC', async () => {
    const oneMillisecondTooEarly = new Date(2009, 11, 31, 23, 59, 59, 999);
    expect(isFirstMillisecondOfUTCYear(oneMillisecondTooEarly)).to.be.false;

    const oneMillisecondTooLate = new Date(2010, 0, 1, 0, 0, 0, 1);
    expect(isFirstMillisecondOfUTCYear(oneMillisecondTooLate)).to.be.false;

    const middleOfTheYear = new Date(2010, 6, 1, 0, 0, 0, 0);
    expect(isFirstMillisecondOfUTCYear(middleOfTheYear)).to.be.false;
  });

  it('returns false when no date provided', async () => {
    expect(isFirstMillisecondOfUTCYear(undefined)).to.be.false;
  });
});
