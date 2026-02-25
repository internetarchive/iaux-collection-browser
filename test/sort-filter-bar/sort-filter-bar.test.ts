import { expect, fixture } from '@open-wc/testing';
import sinon from 'sinon';
import { html } from 'lit';
import type { IaDropdown } from '@internetarchive/ia-dropdown';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import { SortField, defaultSortAvailability } from '../../src/models';

import '../../src/sort-filter-bar/sort-filter-bar';

describe('Sort dropdown behavior', () => {
  let el: SortFilterBar;
  let sortDropdown: IaDropdown;

  beforeEach(async () => {
    el = await fixture<SortFilterBar>(html`
      <sort-filter-bar></sort-filter-bar>
    `);
    sortDropdown = el.shadowRoot?.querySelector('#sort-dropdown') as IaDropdown;
    await el.updateComplete;
  });

  it('should render basic component', async () => {
    const sortSelectorContainer = el.shadowRoot?.querySelector(
      '#sort-selector-container',
    );
    expect(sortSelectorContainer).to.exist;
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

  it('renders default set of sort options in dropdown', async () => {
    expect(sortDropdown).to.exist;
    expect(sortDropdown.options.map(o => o.id)).to.deep.equal([
      SortField.relevance,
      SortField.alltimeview,
      SortField.weeklyview,
      SortField.title,
      SortField.date,
      SortField.datearchived,
      SortField.datereviewed,
      SortField.dateadded,
      SortField.creator,
    ]);
  });

  it('respects overridden sort field availability', async () => {
    const customSortAvailability: Record<SortField, boolean> = {
      ...defaultSortAvailability,
      [SortField.title]: false,
      [SortField.datearchived]: false,
      [SortField.datereviewed]: false,
      [SortField.creator]: false,
    };

    el.sortFieldAvailability = customSortAvailability;
    await el.updateComplete;

    const dropdown = el.shadowRoot?.querySelector(
      '#sort-dropdown',
    ) as IaDropdown;
    expect(dropdown.options.length).to.equal(5);
    expect(dropdown.options.map(o => o.id)).to.deep.equal([
      SortField.relevance,
      SortField.alltimeview,
      SortField.weeklyview,
      SortField.date,
      SortField.dateadded,
    ]);
  });

  it('shows the display name of the selected sort', async () => {
    el.selectedSort = SortField.alltimeview;
    await el.updateComplete;

    const label = sortDropdown?.querySelector('.dropdown-label');
    expect(label?.textContent?.trim()).to.equal('All-time views');
  });

  it('changes selected sort when dropdown option selected', async () => {
    expect(sortDropdown).to.exist;

    sortDropdown.selectedOption = 'title';
    const option = { id: 'title' };
    sortDropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
    );
    await el.updateComplete;

    expect(el.selectedSort).to.equal('title');
  });

  it('selects a sort option by clicking it in the dropdown', async () => {
    el.selectedSort = SortField.title;
    await el.updateComplete;

    const dropdown = el.shadowRoot?.querySelector(
      '#sort-dropdown',
    ) as IaDropdown;
    expect(dropdown).to.exist;

    const firstOption = dropdown?.shadowRoot?.querySelector(
      'li > button',
    ) as HTMLButtonElement;
    expect(firstOption).to.exist;

    firstOption?.click();
    await el.updateComplete;

    // The first option is relevance by default
    expect(el.selectedSort).to.equal(SortField.relevance);
  });

  it('emits sortChanged event when sort option selected', async () => {
    const sortChangedHandler = sinon.spy();
    el.addEventListener('sortChanged', sortChangedHandler);

    const option = { id: SortField.title };
    sortDropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
    );
    await el.updateComplete;

    expect(sortChangedHandler.calledOnce).to.be.true;
    const eventDetail = sortChangedHandler.firstCall.args[0].detail;
    expect(eventDetail.selectedSort).to.equal(SortField.title);
    expect(eventDetail.sortDirection).to.equal('asc');
  });

  it('renders sort selector backdrop when dropdown is open', async () => {
    expect(sortDropdown).to.exist;

    const caret = sortDropdown?.shadowRoot?.querySelector(
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret!.click();
    await el.updateComplete;

    let backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).to.exist;

    // Clicking the backdrop should close the dropdown
    backdrop!.click();
    await el.updateComplete;

    backdrop = el.shadowRoot?.querySelector(
      '#sort-selector-backdrop',
    ) as HTMLElement;
    expect(backdrop).not.to.exist;
  });

  it('pressing Escape key closes the dropdown', async () => {
    expect(sortDropdown).to.exist;

    const caret = sortDropdown?.shadowRoot?.querySelector(
      '.caret',
    ) as HTMLElement;
    expect(caret).to.exist;

    caret!.click();
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

  it('clears title filter when sort changed from title', async () => {
    el.selectedSort = 'title' as SortField;
    el.selectedTitleFilter = 'A';
    await el.updateComplete;

    const dropdown = el.shadowRoot?.querySelector(
      '#sort-dropdown',
    ) as IaDropdown;
    expect(dropdown).to.exist;

    dropdown.selectedOption = 'relevance';
    const option = { id: 'relevance' };
    dropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
    );
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedTitleFilter).to.be.null;
  });

  it('clears creator filter when sort changed from creator', async () => {
    el.selectedSort = 'creator' as SortField;
    el.selectedCreatorFilter = 'A';
    await el.updateComplete;

    const dropdown = el.shadowRoot?.querySelector(
      '#sort-dropdown',
    ) as IaDropdown;
    expect(dropdown).to.exist;

    dropdown.selectedOption = 'relevance';
    const option = { id: 'relevance' };
    dropdown.dispatchEvent(
      new CustomEvent('optionSelected', { detail: { option } }),
    );
    await el.updateComplete;

    expect(el.selectedSort).to.equal('relevance');
    expect(el.selectedCreatorFilter).to.be.null;
  });

  it('contains sort-options slot when enabled', async () => {
    const slotEl = await fixture<SortFilterBar>(html`
      <sort-filter-bar .enableSortOptionsSlot=${true}></sort-filter-bar>
    `);
    await slotEl.updateComplete;

    const sortOptionsSlot = slotEl?.shadowRoot?.querySelector(
      'slot[name="sort-options"]',
    );
    expect(sortOptionsSlot).to.exist;

    expect(slotEl?.shadowRoot?.querySelector('#sort-selector-container')).to.not
      .exist;
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
