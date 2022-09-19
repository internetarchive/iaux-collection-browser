import { expect } from '@open-wc/testing';
import { getFacetOptionFromKey } from '../../src/collection-facets/facets-util';

describe('formatCount', () => {
  // for mediatype aggregate key
  it('Parse the aggregate key title into the human readable title', () => {
    expect(
      getFacetOptionFromKey('user_aggs__terms__field:mediatypeSorter__size:6')
    ).to.equal('mediatype');
  });

  // for collection aggregate key
  it('Parse the aggregate key title into the human readable title', () => {
    expect(
      getFacetOptionFromKey('ser_aggs__terms__field:collection__size:12')
    ).to.equal('collection');
  });
});
