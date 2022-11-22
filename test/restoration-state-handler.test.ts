import { SearchType } from '@internetarchive/search-service';
import { expect } from '@open-wc/testing';
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

  it('should restore full text search type from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?sin=TXT';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.searchType).to.equal(SearchType.FULLTEXT);
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
    expect(restorationState.selectedFacets.year['2018'].state).to.equal(
      'selected'
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
    expect(restorationState.selectedFacets.subject.foo.state).to.equal(
      'selected'
    );
  });

  it('should restore negative facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?not[]=year:2018';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.year['2018'].state).to.equal(
      'hidden'
    );
  });

  it('should restore multiple selected/negative facets from URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search =
      '?and[]=collection:"foo"&and[]=collection:"bar"&not[]=collection:"baz"&not[]=collection:"boop"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();

    expect(restorationState.selectedFacets.collection.foo.state).to.equal(
      'selected'
    );
    expect(restorationState.selectedFacets.collection.bar.state).to.equal(
      'selected'
    );

    expect(restorationState.selectedFacets.collection.baz.state).to.equal(
      'hidden'
    );
    expect(restorationState.selectedFacets.collection.boop.state).to.equal(
      'hidden'
    );
  });

  it('negative facets take precedence if both present in URL', async () => {
    const handler = new RestorationStateHandler({ context: 'search' });

    const url = new URL(window.location.href);
    url.search = '?and[]=collection:"foo"&not[]=collection:"foo"';
    window.history.replaceState({ path: url.href }, '', url.href);

    const restorationState = handler.getRestorationState();
    expect(restorationState.selectedFacets.collection.foo.state).to.equal(
      'hidden'
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
});
