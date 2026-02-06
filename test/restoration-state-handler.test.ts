import { SearchType } from '@internetarchive/search-service';
import { describe, it, expect } from 'vitest';
import { SortField, getDefaultSelectedFacets } from '../src/models';
import { RestorationStateHandler } from '../src/restoration-state-handler';

describe('Restoration state handler', () => {
  it('should restore query from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?query=boop';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.baseQuery).to.equal('boop');
  });

  it('should restore default search type from URL without valid sin', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=foo';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.DEFAULT);
  });

  it('should restore default search type if sin explicitly empty in URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.DEFAULT);
  });

  it('should restore full text search type from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=TXT';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.FULLTEXT);
  });

  it('should restore radio search type from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=RADIO';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.RADIO);
  });

  it('should restore TV search type from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=TV';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.TV);
  });

  it('should restore metadata search type from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=MD';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.METADATA);
  });

  it('should restore page number from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?page=42';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.currentPage).to.equal(42);
  });

  it('should restore selected year facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=year:"2018"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.year?.['2018'].state).to.equal(
      'selected',
    );
  });

  it('should ignore unrecognized facet types in URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=foo:"bar"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets).to.deep.equal(
      getDefaultSelectedFacets(),
    );
  });

  it('should restore selected date range facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=year:"2018+TO+2021"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.minSelectedDate).to.equal('2018');
    expect(restorationState.maxSelectedDate).to.equal('2021');
  });

  it('should restore creator filter from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=firstCreator:F';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedCreatorFilter).to.equal('F');
  });

  it('should restore title filter from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=firstTitle:F';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedTitleFilter).to.equal('F');
  });

  it('should restore other selected facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=subject:"foo"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.subject?.foo.state).to.equal(
      'selected',
    );
  });

  it('should restore negative facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?not[]=year:2018';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.year?.['2018'].state).to.equal(
      'hidden',
    );
  });

  it('should restore multiple selected/negative facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search =
      '?and[]=collection:"foo"&and[]=collection:"bar"&not[]=collection:"baz"&not[]=collection:"boop"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();

    expect(restorationState.selectedFacets.collection?.foo.state).to.equal(
      'selected',
    );
    expect(restorationState.selectedFacets.collection?.bar.state).to.equal(
      'selected',
    );

    expect(restorationState.selectedFacets.collection?.baz.state).to.equal(
      'hidden',
    );
    expect(restorationState.selectedFacets.collection?.boop.state).to.equal(
      'hidden',
    );
  });

  it('negative facets take precedence if both present in URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=collection:"foo"&not[]=collection:"foo"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.collection?.foo.state).to.equal(
      'hidden',
    );
  });

  it('should restore selected facets with numbers in the square brackets', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[12]=subject:"foo"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.subject?.foo.state).to.equal(
      'selected',
    );
  });

  it('should restore negative facets with numbers in the square brackets', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?not[12]=year:2018';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.year?.['2018'].state).to.equal(
      'hidden',
    );
  });

  it('should restore any TV clip filters from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });
    const url = new URL(window.location.href);

    // Commercials
    url.search = '?only_commercials=1';
    window.history.replaceState({ path: url.href }, '', url.href);
    const commercialsRestorationState = handler.getRestorationState();
    expect(
      commercialsRestorationState.selectedFacets.clip_type?.commercial.state,
    ).to.equal('selected');

    // Fact checks
    url.search = '?only_factchecks=1';
    window.history.replaceState({ path: url.href }, '', url.href);
    const factchecksRestorationState = handler.getRestorationState();
    expect(
      factchecksRestorationState.selectedFacets.clip_type?.['fact check'].state,
    ).to.equal('selected');

    // Quotes
    url.search = '?only_quotes=1';
    window.history.replaceState({ path: url.href }, '', url.href);
    const quotesRestorationState = handler.getRestorationState();
    expect(
      quotesRestorationState.selectedFacets.clip_type?.quote.state,
    ).to.equal('selected');

    // No filter param
    url.search = '';
    window.history.replaceState({ path: url.href }, '', url.href);
    const unfilteredRestorationState = handler.getRestorationState();
    expect(unfilteredRestorationState.selectedFacets.clip_type).to.deep.equal(
      {},
    );
  });

  it('should restore sort from URL (space format)', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sort=date+desc';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedSort).to.equal('date');
    expect(restorationState.sortDirection).to.equal('desc');
  });

  it('should restore sort from URL (prefix format, desc)', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sort=-date';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedSort).to.equal('date');
    expect(restorationState.sortDirection).to.equal('desc');
  });

  it('should restore sort from URL (prefix format, asc)', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sort=date';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedSort).to.equal('date');
    expect(restorationState.sortDirection).to.equal('asc');
  });

  it('should restore sort from URL (space format)', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sort=foo+desc';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedSort).to.equal('unrecognized');
    expect(restorationState.sortDirection).to.equal('desc');
  });

  it('should restore unrecognized sort from URL (prefix format)', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sort=-foo';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedSort).to.equal('unrecognized');
    expect(restorationState.sortDirection).to.equal('desc');
  });

  it('should save direction to URL even for unrecognized sort fields', async () => {
    const url = new URL(window.location.href);
    url.search = '?sort=foo';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    handler.persistState({
      selectedSort: SortField.unrecognized,
      sortDirection: 'desc',
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(window.location.search).to.equal('?sort=-foo');
  });

  it('should keep existing direction for unrecognized sort fields when unspecified in state', async () => {
    const url = new URL(window.location.href);
    url.search = '?sort=foo+desc';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    handler.persistState({
      selectedSort: SortField.unrecognized,
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(window.location.search).to.equal('?sort=-foo');
  });

  it('should just ignore unrecognized sort fields w/ unknown formats', async () => {
    const url = new URL(window.location.href);
    url.search = '?sort=+foo';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    handler.persistState({
      selectedSort: SortField.unrecognized,
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(window.location.search).to.equal('?sort=+foo');
  });

  it('should not save current page state to the URL for page 1', async () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    handler.persistState({
      currentPage: 1,
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(window.location.search).to.be.empty;
  });

  it('should save current page state to the URL when page > 1', async () => {
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    handler.persistState({
      currentPage: 2,
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(window.location.search).to.equal('?page=2');
  });

  it('should upgrade legacy search params to new ones', async () => {
    const url = new URL(window.location.href);
    url.search = '?q=foo';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });
    const restorationState = handler.getRestorationState();
    expect(restorationState.baseQuery).to.equal('foo');

    handler.persistState(restorationState);
    expect(window.location.search).to.equal('?query=foo');
  });

  it('should remove empty sin param', async () => {
    const url = new URL(window.location.href);
    url.search = '?sin=';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });

    handler.persistState({ selectedFacets: getDefaultSelectedFacets() });
    expect(window.location.search).to.equal('');
  });

  it('should persist metadata search type only when option is true', async () => {
    const url = new URL(window.location.href);
    url.search = '?sin=';
    window.history.replaceState({ path: url.href }, '', url.href);

    const handler = new RestorationStateHandler({ context: 'search' });

    handler.persistState(
      {
        selectedFacets: getDefaultSelectedFacets(),
        searchType: SearchType.METADATA,
      },
      { persistMetadataSearchType: false },
    );
    expect(window.location.search).to.equal('');

    handler.persistState(
      {
        selectedFacets: getDefaultSelectedFacets(),
        searchType: SearchType.METADATA,
      },
      { persistMetadataSearchType: true },
    );
    expect(window.location.search).to.equal('?sin=MD');
  });

  it('round trip load/persist should erase numbers in square brackets', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[0]=subject:"foo"';
    window.history.replaceState({ path: url.href }, '', url.href);

    // Load state from the URL and immediately persist it back to the URL
    const restorationState = handler.getRestorationState();
    handler.persistState(restorationState);

    // Ensure the new URL includes the "normalized" facet parameter and not the numbered one
    expect(decodeURIComponent(window.location.search)).to.include(
      'and[]=subject:"foo"',
    );
    expect(new URL(window.location.href).searchParams.get('and[0]')).to.be.null;
  });
});
