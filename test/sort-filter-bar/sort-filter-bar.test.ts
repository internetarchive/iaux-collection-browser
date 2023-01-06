/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { IaDropdown } from '@internetarchive/ia-dropdown';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import type { SortField } from '../../src/models';

import '../../src/sort-filter-bar/sort-filter-bar';

describe('Sort direction buttons', () => {
  it('should render sort direction button', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.sortDirection = 'asc'; // selected sort
    await el.updateComplete;

    const sortDirectionButtonList = el.shadowRoot?.querySelector(
      '#sort-direction-selector'
    );

    const sortByAscButton = sortDirectionButtonList?.querySelector(
      '#sort-ascending-btn'
    );
    expect(sortByAscButton).to.exist;
    // ascending order button is selected
    expect(sortByAscButton?.getAttribute('class')).to.equal(
      'sort-button selected'
    );

    const sortByDescButton = sortDirectionButtonList?.querySelector(
      '#sort-descending-btn'
    );
    expect(sortByDescButton).to.exist;
    // descending order button is not selected
    expect(sortByDescButton?.getAttribute('class')).to.not.equal(
      'sort-button selected'
    );
  });
});

describe('Sort selector default buttons', async () => {
  const el = await fixture<SortFilterBar>(html`
    <sort-filter-bar> </sort-filter-bar>
  `);
  const sortSelectorContainer = el.shadowRoot?.querySelector(
    '#sort-selector-container'
  );
  const desktopSortSelector = sortSelectorContainer?.querySelector(
    '#desktop-sort-selector'
  );

  it('should render basic component', async () => {
    expect(sortSelectorContainer).to.exist;
    expect(desktopSortSelector).to.exist;
  });

  it('should render sort-by label', async () => {
    const sortByLabel = sortSelectorContainer?.querySelector('#sort-by-text');
    expect(sortByLabel).to.exist;
    expect(sortByLabel?.textContent?.trim()).to.equal('Sort by:');
  });

  it('should render sort direction buttons', async () => {
    const sortDirections = sortSelectorContainer?.querySelector(
      '#sort-direction-container'
    );
    expect(sortDirections).to.exist;
    expect(sortDirections?.querySelectorAll('.sort-button').length).to.equal(2);
  });

  it('should render default relevance-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Relevance');
    expect(defaultSortSelector?.getAttribute('class')).to.equal('selected');
  });

  it('should render default view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown');
    expect(defaultSortSelector?.textContent).to.contain('Weekly views');
  });

  it('should render active view-sort selectors', async () => {
    el.selectedSort = 'alltimeview' as SortField;
    await el.updateComplete;

    const defaultSortSelector = desktopSortSelector?.querySelector(
      'ia-dropdown.selected'
    );
    expect(defaultSortSelector?.textContent).to.contain('All-time views');
  });

  it('should render default title-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(2)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Title');
  });

  it('should render default date-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown');
    expect(defaultSortSelector?.textContent).to.contain('Date published');
  });

  it('should render active date-sort selectors', async () => {
    el.selectedSort = 'datereviewed' as SortField;
    await el.updateComplete;

    const defaultSortSelector = desktopSortSelector?.querySelector(
      'ia-dropdown.selected'
    );
    expect(defaultSortSelector?.textContent).to.contain('Date reviewed');
  });

  it('should render default creator-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Creator');
  });

  it('click event on view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown') as IaDropdown;

    await defaultSortSelector?.click();
    expect(el.selectedSort).to.equal('weeklyview');
  });

  it('click event on title selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(2)
      ?.querySelector('a');

    await defaultSortSelector?.click();
    expect(el.selectedSort).to.equal('title');
  });

  it('click event on date-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown') as IaDropdown;

    await defaultSortSelector?.click();
    expect(el.selectedSort).to.equal('date');
  });

  it('click event on creator selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('a');

    await defaultSortSelector?.click();
    expect(el.selectedSort).to.equal('creator');
  });
});

describe('Display mode/style buttons', () => {
  it('should render all display mode buttons', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    const displayModeButtonList = el.shadowRoot
      ?.querySelector('#display-style-selector')
      ?.querySelector('ul');

    const gridButton = displayModeButtonList?.children
      .item(0)
      ?.querySelector('#grid-button');
    expect(gridButton).to.exist;

    const detailListButton = displayModeButtonList?.children
      .item(1)
      ?.querySelector('#list-detail-button');
    expect(detailListButton).to.exist;

    const compactListButton = displayModeButtonList?.children
      .item(2)
      ?.querySelector('#list-compact-button');
    expect(compactListButton).to.exist;
  });

  it('should active current display mode', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.displayMode = 'grid';
    await el.updateComplete;

    const displayModeTitle = el.shadowRoot
      ?.querySelector('#display-style-selector')
      ?.querySelector('button.active')
      ?.getAttribute('title');
    expect(displayModeTitle).to.equal('Tile view');
  });
});

describe('Sort/filter bar letter behavior', () => {
  it('sets the selected title letter when clicked', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    el.selectedSort = 'title' as SortField;
    el.prefixFilterCountMap = { title: { T: 1 }, creator: {} };
    await el.updateComplete;

    const alphaBar = el.shadowRoot?.querySelector('alpha-bar');
    const letterLink = alphaBar?.shadowRoot?.querySelector(
      'li > a[href]'
    ) as HTMLAnchorElement;
    expect(letterLink?.textContent?.trim()).to.equal('T');

    letterLink?.click();
    await el.updateComplete;

    expect(el.selectedTitleFilter).to.equal('T');
  });

  it('sets the selected creator letter when clicked', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    el.selectedSort = 'creator' as SortField;
    el.prefixFilterCountMap = { title: {}, creator: { C: 1 } };
    await el.updateComplete;

    const alphaBar = el.shadowRoot?.querySelector('alpha-bar');
    const letterLink = alphaBar?.shadowRoot?.querySelector(
      'li > a[href]'
    ) as HTMLAnchorElement;
    expect(letterLink?.textContent?.trim()).to.equal('C');

    letterLink?.click();
    await el.updateComplete;

    expect(el.selectedCreatorFilter).to.equal('C');
  });
});

describe('Sort/filter bar mobile view', () => {
  let origWindowSize: { width: number; height: number };
  before(() => {
    origWindowSize = { width: window.innerWidth, height: window.innerHeight };
    window.resizeTo(500, 600);
  });

  after(() => {
    window.resizeTo(origWindowSize.width, origWindowSize.height);
  });

  it('renders in mobile view', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    const mobileSortContainer = el.shadowRoot?.querySelector(
      '#mobile-sort-container'
    );
    const desktopSortContainer = el.shadowRoot?.querySelector(
      '#desktop-sort-container'
    );

    expect(mobileSortContainer?.classList?.contains('visible')).to.be.true;
    expect(desktopSortContainer?.classList?.contains('hidden')).to.be.true;
  });

  it('changes selected sort in mobile view', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    const mobileSortSelector = el.shadowRoot?.querySelector(
      '#mobile-sort-selector'
    ) as HTMLSelectElement;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.value = 'title';
    mobileSortSelector.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(el.selectedSort).to.equal('title');
  });

  it('clears title filter when sort changed from title in mobile view', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    el.selectedSort = 'title' as SortField;
    el.selectedTitleFilter = 'A';
    await el.updateComplete;

    const mobileSortSelector = el.shadowRoot?.querySelector(
      '#mobile-sort-selector'
    ) as HTMLSelectElement;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.value = 'relevance';
    mobileSortSelector.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedTitleFilter).to.be.null;
  });

  it('clears creator filter when sort changed from creator in mobile view', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    el.selectedSort = 'creator' as SortField;
    el.selectedCreatorFilter = 'A';
    await el.updateComplete;

    const mobileSortSelector = el.shadowRoot?.querySelector(
      '#mobile-sort-selector'
    ) as HTMLSelectElement;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.value = 'relevance';
    mobileSortSelector.dispatchEvent(new Event('change'));
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedCreatorFilter).to.be.null;
  });
});
