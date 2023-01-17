/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { IaDropdown } from '@internetarchive/ia-dropdown';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
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

  before(async () => {
    el.resizeObserver = new SharedResizeObserver();
    await el.updateComplete;
  });

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

  it('handles click event on view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('.dropdown-label') as HTMLElement;

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('weeklyview');
  });

  it('handles click event on title selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(2)
      ?.querySelector('a');

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('title');
  });

  it('handles click event on date-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('.dropdown-label') as HTMLElement;

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('date');
  });

  it('handles return/space key event on view-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('.dropdown-label') as HTMLElement;

    el.selectedSort = 'relevance' as SortField;
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    defaultSortSelector?.dispatchEvent(enterEvent);
    await el.updateComplete;

    expect(el.selectedSort).to.equal('weeklyview');

    el.selectedSort = 'relevance' as SortField;
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    defaultSortSelector?.dispatchEvent(spaceEvent);
    await el.updateComplete;

    expect(el.selectedSort).to.equal('weeklyview');
  });

  it('handles return/space key event on date-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('.dropdown-label') as HTMLElement;

    el.selectedSort = 'relevance' as SortField;
    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
    defaultSortSelector?.dispatchEvent(enterEvent);
    await el.updateComplete;

    expect(el.selectedSort).to.equal('date');

    el.selectedSort = 'relevance' as SortField;
    const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
    defaultSortSelector?.dispatchEvent(spaceEvent);
    await el.updateComplete;

    expect(el.selectedSort).to.equal('date');
  });

  it('handles click event on creator selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('a');

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('creator');
  });

  it('handles click event on view-sort dropdown option', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const firstOption = defaultSortSelector?.shadowRoot?.querySelector(
      'li > button'
    ) as HTMLButtonElement;
    expect(firstOption).to.exist;

    firstOption?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('weeklyview');
  });

  it('handles click event on date-sort dropdown option', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const firstOption = defaultSortSelector?.shadowRoot?.querySelector(
      'li > button'
    ) as HTMLButtonElement;
    expect(firstOption).to.exist;

    firstOption?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('date');
  });

  it('shows view sort selector backdrop when view sort open', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const caret = defaultSortSelector?.shadowRoot?.querySelector(
      '.caret'
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });

  it('shows date sort selector backdrop when date sort open', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const caret = defaultSortSelector?.shadowRoot?.querySelector(
      '.caret'
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
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

  it('should toggle sort direction when clicked', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.selectedSort = 'title' as SortField;
    el.sortDirection = 'asc';
    await el.updateComplete;

    const sortDirectionButton = el.shadowRoot?.querySelector(
      '.sort-direction-selector'
    ) as HTMLButtonElement;

    sortDirectionButton.click();
    await el.updateComplete;
    expect(el.sortDirection).to.equal('desc');

    sortDirectionButton.click();
    await el.updateComplete;
    expect(el.sortDirection).to.equal('asc');
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

  it('should change displayMode prop to the one clicked', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar> </sort-filter-bar>
    `);

    el.displayMode = 'grid';
    await el.updateComplete;

    const extendedListButton = el.shadowRoot?.querySelector(
      '#list-detail-button'
    ) as HTMLElement;
    extendedListButton.click();
    await el.updateComplete;
    expect(el.displayMode).to.equal('list-detail');

    const compactListButton = el.shadowRoot?.querySelector(
      '#list-compact-button'
    ) as HTMLElement;
    compactListButton.click();
    await el.updateComplete;
    expect(el.displayMode).to.equal('list-compact');

    const gridModeButton = el.shadowRoot?.querySelector(
      '#grid-button'
    ) as HTMLElement;
    gridModeButton.click();
    await el.updateComplete;
    expect(el.displayMode).to.equal('grid');
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

  it('shows sort selector backdrop when mobile sort open', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    const mobileSortSelector = el.shadowRoot?.querySelector(
      '#mobile-sort-selector'
    ) as IaDropdown;
    expect(mobileSortSelector).to.exist;

    const caret = mobileSortSelector?.shadowRoot?.querySelector(
      '.caret'
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop'
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });
});
