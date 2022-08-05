/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { SortFilterBar } from '../../src/sort-filter-bar/sort-filter-bar';
import type { SortField } from '../../src/models';

import '../../src/sort-filter-bar/sort-filter-bar';

describe('Sort direction buttons', () => {
  it('should render all display mode buttons', async () => {
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
    '#desktop-sort-selector'
  );

  it('should render sort-by label', async () => {
    expect(sortSelectorContainer?.children.item(0)?.textContent).to.equal(
      'Sort By'
    );
  });

  it('should render default sort selector', async () => {
    const defaultSortSelector = sortSelectorContainer?.children
      .item(1)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Relevance');
    expect(defaultSortSelector?.getAttribute('class')).to.equal('selected');
  });

  it('should render default view-sort selector', async () => {
    const defaultSortSelector = sortSelectorContainer?.children
      .item(2)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Weekly Views');
  });

  it('should render default title-sort selector', async () => {
    const defaultSortSelector = sortSelectorContainer?.children
      .item(3)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Title');
  });

  it('should render default date-sort selector', async () => {
    const defaultSortSelector = sortSelectorContainer?.children
      .item(4)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Date Published');
  });

  it('should render default creator sort selector', async () => {
    const defaultSortSelector = sortSelectorContainer?.children
      .item(5)
      ?.querySelector('a');
    expect(defaultSortSelector?.textContent).to.contain('Creator');
  });

  it('should render active view-sort selectors', async () => {
    el.selectedSort = 'alltimeview' as SortField;
    await el.updateComplete;

    const defaultSortSelector =
      sortSelectorContainer?.querySelector('a.selected');
    expect(defaultSortSelector?.textContent).to.contain('All-time Views');
  });

  it('should render active date-sort selectors', async () => {
    el.selectedSort = 'datereviewed' as SortField;
    await el.updateComplete;

    const defaultSortSelector =
      sortSelectorContainer?.querySelector('a.selected');
    expect(defaultSortSelector?.textContent).to.contain('Date Reviewed');
  });
});

describe('Display style buttons', () => {
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
