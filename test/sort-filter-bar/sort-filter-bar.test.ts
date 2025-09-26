import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { IaDropdown } from '@internetarchive/ia-dropdown';
import { SharedResizeObserver } from '@internetarchive/shared-resize-observer';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import { SortField, defaultSortAvailability } from '../../src/models';

import '../../src/sort-filter-bar/sort-filter-bar';

describe('Sort selector default buttons', async () => {
  let el: SortFilterBar;
  let sortSelectorContainer: HTMLElement | null | undefined;
  let desktopSortSelector: HTMLElement | null | undefined;

  beforeEach(async () => {
    el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);
    sortSelectorContainer = el.shadowRoot?.querySelector(
      '#sort-selector-container',
    );
    desktopSortSelector = sortSelectorContainer?.querySelector(
      '#desktop-sort-selector',
    );

    el.resizeObserver = new SharedResizeObserver();
    await el.updateComplete;
  });

  it('should render basic component', async () => {
    expect(sortSelectorContainer).to.exist;
    expect(desktopSortSelector).to.exist;
  });

  it('should render sort-by label', async () => {
    const sortByLabel = el.shadowRoot?.querySelector('.sort-by-text');
    expect(sortByLabel).to.exist;
    expect(sortByLabel?.textContent?.trim()).to.equal('Sort by:');
  });

  it('should render sort direction button', async () => {
    const sortDirections = el.shadowRoot?.querySelector(
      '.sort-direction-container',
    );
    expect(sortDirections).to.exist;
    expect(sortDirections?.querySelector('.sort-direction-icon')).to.exist;
  });

  it('renders default set of sort options if not overridden', async () => {
    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(3);
    expect(allSortSelectors[0]?.textContent?.trim()).to.equal('Relevance');
    expect(allSortSelectors[1]?.textContent?.trim()).to.equal('Title');
    expect(allSortSelectors[2]?.textContent?.trim()).to.equal('Creator');

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(2);

    expect(allSortDropdowns[0]?.options.length).to.equal(2);
    expect(allSortDropdowns[0]?.options.map(o => o.id)).to.deep.equal([
      SortField.weeklyview,
      SortField.alltimeview,
    ]);
    expect(allSortDropdowns[0]?.textContent?.trim()).to.equal('Weekly views');

    expect(allSortDropdowns[1]?.options.length).to.equal(4);
    expect(allSortDropdowns[1]?.options.map(o => o.id)).to.deep.equal([
      SortField.date,
      SortField.datearchived,
      SortField.datereviewed,
      SortField.dateadded,
    ]);
    expect(allSortDropdowns[1]?.textContent?.trim()).to.equal('Date published');

    // Relevance selected by default
    const defaultSortSelector =
      desktopSortSelector?.querySelector('button.selected');
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Relevance');
  });

  it('renders an overridden set of sort options if specified', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      [SortField.title]: false,
      [SortField.datefavorited]: true,
      [SortField.datearchived]: false,
      [SortField.datereviewed]: false,
      [SortField.creator]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(1);
    expect(allSortSelectors[0]?.textContent?.trim()).to.equal('Relevance');

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(2);

    expect(allSortDropdowns[0]?.options.length).to.equal(2);
    expect(allSortDropdowns[0]?.options.map(o => o.id)).to.deep.equal([
      SortField.weeklyview,
      SortField.alltimeview,
    ]);

    expect(allSortDropdowns[1]?.options.length).to.equal(3);
    expect(allSortDropdowns[1]?.options.map(o => o.id)).to.deep.equal([
      SortField.datefavorited,
      SortField.date,
      SortField.dateadded,
    ]);
  });

  it('renders a views button instead of a dropdown if it would only have one option', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      // Disable weekly views (but keep All-time Views)
      [SortField.weeklyview]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(4);
    expect(allSortSelectors[0]?.textContent?.trim()).to.equal('Relevance');
    expect(allSortSelectors[1]?.textContent?.trim()).to.equal('All-time views');
    expect(allSortSelectors[2]?.textContent?.trim()).to.equal('Title');
    expect(allSortSelectors[3]?.textContent?.trim()).to.equal('Creator');

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(1);
  });

  it('renders a date button instead of a dropdown if it would only have one option', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      // Disable all default dates except Date Added
      [SortField.date]: false,
      [SortField.datearchived]: false,
      [SortField.datereviewed]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(4);
    expect(allSortSelectors[0]?.textContent?.trim()).to.equal('Relevance');
    expect(allSortSelectors[1]?.textContent?.trim()).to.equal('Title');
    expect(allSortSelectors[2]?.textContent?.trim()).to.equal('Date added');
    expect(allSortSelectors[3]?.textContent?.trim()).to.equal('Creator');

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(1);
  });

  it('does not render a views dropdown that would have zero available options', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      // Disable all view sorts
      [SortField.weeklyview]: false,
      [SortField.alltimeview]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(3);

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(1);
    expect(allSortDropdowns[0].options?.[0]?.id).to.equal(SortField.date);
  });

  it('does not render a date dropdown that would have zero available options', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      // Disable all date sorts
      [SortField.date]: false,
      [SortField.dateadded]: false,
      [SortField.datearchived]: false,
      [SortField.datereviewed]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const allSortSelectors = desktopSortSelector?.querySelectorAll(
      'button',
    ) as NodeListOf<HTMLButtonElement>;
    expect(allSortSelectors).to.exist;
    expect(allSortSelectors.length).to.equal(3);

    const allSortDropdowns = desktopSortSelector?.querySelectorAll(
      'ia-dropdown',
    ) as NodeListOf<IaDropdown>;
    expect(allSortDropdowns).to.exist;
    expect(allSortDropdowns.length).to.equal(1);
    expect(allSortDropdowns[0].options?.[0]?.id).to.equal(SortField.weeklyview);
  });

  it('allows changing the default views sort shown', async () => {
    el.defaultViewSort = SortField.alltimeview;
    await el.updateComplete;

    const viewsDropdown = el.shadowRoot?.querySelector(
      '#views-dropdown',
    ) as IaDropdown;
    expect(viewsDropdown).to.exist;
    expect(viewsDropdown.textContent?.trim()).to.equal('All-time views');
  });

  it('allows changing the default date sort shown', async () => {
    el.defaultDateSort = SortField.datereviewed;
    await el.updateComplete;

    const dateDropdown = el.shadowRoot?.querySelector(
      '#date-dropdown',
    ) as IaDropdown;
    expect(dateDropdown).to.exist;
    expect(dateDropdown.textContent?.trim()).to.equal('Date reviewed');
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
      'ia-dropdown.selected',
    );
    expect(defaultSortSelector?.textContent?.trim()).to.equal('All-time views');
  });

  it('should render default title-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(2)
      ?.querySelector('button');
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
      'ia-dropdown.selected',
    );
    expect(defaultSortSelector?.textContent?.trim()).to.equal('Date reviewed');
  });

  it('should render default creator-sort selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('button');
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
      ?.querySelector('button');

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

  it('handles click event on creator selector', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(4)
      ?.querySelector('button');

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('creator');
  });

  it('handles click event on relevance selector', async () => {
    el.sortFieldAvailability = {
      ...el.sortFieldAvailability,
      [SortField.relevance]: true,
    };
    el.selectedSort = 'title' as SortField;
    await el.updateComplete;

    const defaultSortSelector = desktopSortSelector?.children
      .item(0)
      ?.querySelector('button');

    defaultSortSelector?.click();
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
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

  it('handles click event on view-sort dropdown option', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(1)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const firstOption = defaultSortSelector?.shadowRoot?.querySelector(
      'li > button',
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
      'li > button',
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
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });

  it('shows date sort selector backdrop when date sort open', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const caret = defaultSortSelector?.shadowRoot?.querySelector(
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });

  it('closes dropdown by hitting escape key', async () => {
    const defaultSortSelector = desktopSortSelector?.children
      .item(3)
      ?.querySelector('ia-dropdown') as IaDropdown;

    const caret = defaultSortSelector?.shadowRoot?.querySelector(
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).to.exist;

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
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
      '.sort-direction-selector',
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
      '.sort-direction-selector',
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
      '.sort-direction-selector',
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

  it('should not render display mode buttons when suppressed', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar suppressDisplayModes></sort-filter-bar>
    `);

    const displayModeButtonList = el.shadowRoot?.querySelector(
      '#display-style-selector',
    );
    expect(displayModeButtonList).not.to.exist;
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
      '#list-detail-button',
    ) as HTMLElement;
    extendedListButton.click();
    await el.updateComplete;
    expect(el.displayMode).to.equal('list-detail');

    const compactListButton = el.shadowRoot?.querySelector(
      '#list-compact-button',
    ) as HTMLElement;
    compactListButton.click();
    await el.updateComplete;
    expect(el.displayMode).to.equal('list-compact');

    const gridModeButton = el.shadowRoot?.querySelector(
      '#grid-button',
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
      'li > button:not(:disabled)',
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
      'li > button:not(:disabled)',
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
      '#mobile-sort-container',
    );
    const desktopSortContainer = el.shadowRoot?.querySelector(
      '#desktop-sort-container',
    );

    expect(mobileSortContainer?.classList?.contains('visible')).to.be.true;
    expect(desktopSortContainer?.classList?.contains('hidden')).to.be.true;
  });

  it('changes selected sort in mobile view', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    const mobileDropdown = el.shadowRoot?.querySelector(
      '#mobile-dropdown',
    ) as IaDropdown;
    expect(mobileDropdown).to.exist;

    mobileDropdown.selectedOption = 'title';
    const option = { id: 'title' };
    mobileDropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
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

    const mobileDropdown = el.shadowRoot?.querySelector(
      '#mobile-dropdown',
    ) as IaDropdown;
    expect(mobileDropdown).to.exist;

    mobileDropdown.selectedOption = 'relevance';
    const option = { id: 'relevance' };
    mobileDropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
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

    const mobileDropdown = el.shadowRoot?.querySelector(
      '#mobile-dropdown',
    ) as IaDropdown;
    expect(mobileDropdown).to.exist;

    mobileDropdown.selectedOption = 'relevance';
    const option = { id: 'relevance' };
    mobileDropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
    );
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedCreatorFilter).to.be.null;
  });

  it('shows sort selector backdrop when mobile sort open', async () => {
    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);

    const mobileDropdown = el.shadowRoot?.querySelector(
      '#mobile-dropdown',
    ) as IaDropdown;
    expect(mobileDropdown).to.exist;

    const caret = mobileDropdown?.shadowRoot?.querySelector(
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret?.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).to.exist;

    backdrop?.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });

  it('shows loansTab top-bar slot Default View', async () => {
    const resizeStub = new SharedResizeObserver();
    const addSpy = sinon.spy(resizeStub, 'addObserver');
    const removeSpy = sinon.spy(resizeStub, 'removeObserver');

    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar .resizeObserver=${resizeStub}></sort-filter-bar>
    `);

    // this element exists
    expect(el?.shadowRoot?.querySelector('#sort-selector-container')).to.exist;

    // loads & unloads twice when [re]setting ResizeObserver
    expect(addSpy.callCount).to.equal(2);

    const resizeStub2 = new SharedResizeObserver();
    el.resizeObserver = resizeStub2;
    await el.updateComplete;
    expect(removeSpy.callCount).to.equal(2);
  });

  it('contains sort-options slot when enabled', async () => {
    const resizeStub = new SharedResizeObserver();
    const addSpy = sinon.spy(resizeStub, 'addObserver');
    const removeSpy = sinon.spy(resizeStub, 'removeObserver');

    const el = await fixture<SortFilterBar>(html`
      <sort-filter-bar
        .resizeObserver=${resizeStub}
        .enableSortOptionsSlot=${true}
      ></sort-filter-bar>
    `);

    await el.updateComplete;

    // slot exists
    const sortOptionsSlot = el?.shadowRoot?.querySelector(
      'slot[name="sort-options"]',
    );
    expect(sortOptionsSlot).to.exist;

    // sort bar does not exist
    expect(el?.shadowRoot?.querySelector('#sort-selector-container')).to.not
      .exist;

    const resizeStub2 = new SharedResizeObserver();
    el.resizeObserver = resizeStub2;
    await el.updateComplete;

    // there's no need for resize observer
    expect(addSpy.callCount).to.equal(0);
    expect(removeSpy.callCount).to.equal(0);
  });
});
