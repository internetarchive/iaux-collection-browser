/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { IaDropdown } from '@internetarchive/ia-dropdown';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import type { SortField } from '../../src/models';

import '../../src/sort-filter-bar/sort-filter-bar';

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
    const sortByLabel = sortSelectorContainer?.querySelector('.sort-by-text');
    expect(sortByLabel).to.exist;
    expect(sortByLabel?.textContent?.trim()).to.equal('Sort by:');
  });

  it('should render sort direction button', async () => {
    const sortDirections = sortSelectorContainer?.querySelector(
      '.sort-direction-container'
    );
    expect(sortDirections).to.exist;
    expect(sortDirections?.querySelector('.sort-direction-icon')).to.exist;
  });

  it('should render default relevance-sort selector', async () => {
    const defaultSortSelector =
      desktopSortSelector?.querySelector('a.selected');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Relevance');
  });

  it('should render default view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Weekly views');
  });

  it('should render active view-sort selectors', async () => {
    el.selectedSort = 'alltimeview' as SortField;
    await el.updateComplete;

    const defaultSortSelector = desktopSortSelector?.querySelector(
      'ia-dropdown.selected'
    );
    expect(defaultSortSelector?.textContent?.trim()).to.equal('All-time views');
  });

  it('should render default title-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(2)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Title');
  });

  it('should render default date-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Date published');
  });

  it('should render active date-sort selectors', async () => {
    el.selectedSort = 'datereviewed' as SortField;
    await el.updateComplete;

    const defaultSortSelector = desktopSortSelector?.querySelector(
      'ia-dropdown.selected'
    );
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Date reviewed');
  });

  it('should render default creator-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Creator');
  });

  it('click event on view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('.dropdown-label') as IaDropdown;

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
      ?.querySelector('.dropdown-label') as IaDropdown;

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

describe('Sort direction button behavior', () => {
  it('should disable sort direction button when sorting by relevance', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.selectedSort = 'relevance' as SortField;
    await el.updateComplete;

    const sortDirectionButton = el.shadowRoot?.querySelector(
      '.sort-direction-selector'
    ) as HTMLButtonElement;
    expect(sortDirectionButton).to.exist;
    expect(sortDirectionButton.disabled).to.be.true;
  });

  it('should enable sort direction button when not sorting by relevance', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.selectedSort = 'title' as SortField;
    await el.updateComplete;

    const sortDirectionButton = el.shadowRoot?.querySelector(
      '.sort-direction-selector'
    ) as HTMLButtonElement;
    expect(sortDirectionButton).to.exist;
    expect(sortDirectionButton.disabled).to.be.false;
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
    ) as IaDropdown;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.selectedOption = 'title';
    mobileSortSelector.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { id: 'title' } })
    );
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
    ) as IaDropdown;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.selectedOption = 'relevance';
    mobileSortSelector.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { id: 'relevance' } })
    );
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
    ) as IaDropdown;
    expect(mobileSortSelector).to.exist;

    mobileSortSelector.selectedOption = 'relevance';
    mobileSortSelector.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { id: 'relevance' } })
    );
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedCreatorFilter).to.be.null;
  });
});
