import { expect } from '@open-wc/testing';
import { DemoRestorationStateHandler } from '../../../src/serverless-search/demo/demo-restoration-state-handler';
import { getDefaultSelectedFacets } from '../../../src/models';

const startUrl = window.location.href;

function cookie(name: string): string | undefined {
  return document.cookie
    .split('; ')
    .find(pair => pair.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}

describe('DemoRestorationStateHandler', () => {
  afterEach(() => {
    window.history.replaceState(null, '', startUrl);
    document.cookie = 'view-search=; path=/; max-age=0';
    document.cookie = 'showdetails-search=; path=/; max-age=0';
  });

  it('starts in the view it is given, not the cookie one', () => {
    document.cookie = 'view-search=tiles; path=/';
    const handler = new DemoRestorationStateHandler('list-detail');

    expect(handler.getRestorationState().displayMode).to.equal('list-detail');
  });

  it('remembers a switch for the visit without touching the cookies', () => {
    const handler = new DemoRestorationStateHandler('list-detail');

    handler.persistState({
      displayMode: 'grid',
      baseQuery: 'sea ice',
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(handler.getRestorationState().displayMode).to.equal('grid');
    expect(cookie('view-search')).to.be.undefined;
    expect(cookie('showdetails-search')).to.be.undefined;
  });

  it('still keeps the search itself in the url', () => {
    const handler = new DemoRestorationStateHandler('list-detail');

    handler.persistState({
      displayMode: 'list-detail',
      baseQuery: 'sea ice',
      selectedFacets: getDefaultSelectedFacets(),
    });

    expect(new URL(window.location.href).searchParams.get('query')).to.equal(
      'sea ice',
    );
    expect(handler.getRestorationState().baseQuery).to.equal('sea ice');
  });
});
