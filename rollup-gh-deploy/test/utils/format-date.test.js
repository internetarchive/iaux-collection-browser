import { expect } from '@open-wc/testing';
import { formatDate } from '../../src/utils/format-date';
const testDate = new Date(Date.UTC(2020, 11, 9));
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
    it('returns locale formatted date', () => {
        expect(formatDate(testDate, 'long', 'de-DE')).to.equal('09. Dez. 2020');
    });
});
//# sourceMappingURL=format-date.test.js.map