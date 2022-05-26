/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/collection-browser';
import { MockSearchService } from './mocks/mock-search-service';
import { MockCollectionNameCache } from './mocks/mock-collection-name-cache';
describe('Collection Browser', () => {
    it('should render with a sort bar, facets, and infinite scroller', async () => {
        var _a, _b, _c;
        const el = await fixture(html `<collection-browser></collection-browser>`);
        const facets = (_a = el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('collection-facets');
        const sortBar = (_b = el.shadowRoot) === null || _b === void 0 ? void 0 : _b.querySelector('sort-filter-bar');
        const infiniteScroller = (_c = el.shadowRoot) === null || _c === void 0 ? void 0 : _c.querySelector('infinite-scroller');
        expect(facets).to.exist;
        expect(sortBar).to.exist;
        expect(infiniteScroller).to.exist;
    });
    it('queries the search service when given a base query', async () => {
        var _a;
        const searchService = new MockSearchService();
        const el = await fixture(html `<collection-browser
        .searchService=${searchService}
      ></collection-browser>`);
        el.baseQuery = 'collection:foo';
        await el.updateComplete;
        expect((_a = searchService.searchParams) === null || _a === void 0 ? void 0 : _a.query).to.equal('collection:foo');
    });
    it('queries for collection names after a fetch', async () => {
        const searchService = new MockSearchService();
        const collectionNameCache = new MockCollectionNameCache();
        const el = await fixture(html `<collection-browser
        .searchService=${searchService}
        .collectionNameCache=${collectionNameCache}
      ></collection-browser>`);
        el.baseQuery = 'blahblah';
        await el.updateComplete;
        expect(collectionNameCache.preloadIdentifiersRequested).to.deep.equal([
            'foo',
            'bar',
            'baz',
            'boop',
        ]);
    });
});
//# sourceMappingURL=collection-browser.test.js.map