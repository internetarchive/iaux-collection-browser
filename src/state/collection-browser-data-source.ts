import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { TileModel } from '../models';

export interface CollectionBrowserDataSourceInterface
  extends ReactiveController {
  readonly size: number;

  addPage(pageNum: number, pageTiles: TileModel[]): void;

  getPage(pageNum: number): TileModel[];

  hasPage(pageNum: number): boolean;

  getTileModelAt(index: number): TileModel | undefined;

  setPageSize(pageSize: number): void;

  reset(): void;

  /**
   * Applies the given map function to all of the tile models in every page of the data
   * source. This method updates the data source object in immutable fashion.
   *
   * @param callback A callback function to apply on each tile model, as with Array.map
   */
  map(
    callback: (model: TileModel, index: number, array: TileModel[]) => TileModel
  ): void;

  /**
   * Checks every tile's management checkbox
   */
  checkAllTiles(): void;

  /**
   * Unchecks every tile's management checkbox
   */
  uncheckAllTiles(): void;

  /**
   * Removes all tile models that are currently checked & adjusts the paging
   * of the data source to account for any new gaps in the data.
   */
  removeCheckedTiles(): void;

  /**
   * An array of all the tile models whose management checkboxes are checked
   */
  readonly checkedTileModels: TileModel[];

  /**
   * An array of all the tile models whose management checkboxes are unchecked
   */
  readonly uncheckedTileModels: TileModel[];
}

export class CollectionBrowserDataSource
  implements CollectionBrowserDataSourceInterface
{
  private pages: Record<string, TileModel[]> = {};

  private offset = 0;

  private numTileModels = 0;

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost,
    /** Default size of result pages */
    private pageSize: number
  ) {
    this.host.addController(this);
  }

  hostConnected(): void {}

  hostUpdated(): void {}

  get size(): number {
    return this.numTileModels;
  }

  addPage(pageNum: number, pageTiles: TileModel[]): void {
    this.pages[pageNum] = pageTiles;
    this.numTileModels += pageTiles.length;
    this.host.requestUpdate();
  }

  getPage(pageNum: number): TileModel[] {
    return this.pages[pageNum];
  }

  hasPage(pageNum: number): boolean {
    return !!this.pages[pageNum];
  }

  getTileModelAt(index: number): TileModel | undefined {
    const pageNum = Math.floor(index / this.pageSize) + 1;
    const indexOnPage = index % this.pageSize;
    return this.pages[pageNum][indexOnPage];
  }

  setPageSize(pageSize: number): void {
    this.reset();
    this.pageSize = pageSize;
  }

  reset(): void {
    this.pages = {};
    this.numTileModels = 0;
    this.host.requestUpdate();
  }

  map(
    callback: (model: TileModel, index: number, array: TileModel[]) => TileModel
  ): void {
    this.pages = Object.fromEntries(
      Object.entries(this.pages).map(([page, tileModels]) => [
        page,
        tileModels.map((model, index, array) =>
          model ? callback(model, index, array) : model
        ),
      ])
    );
    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  checkAllTiles(): void {
    this.map(model => ({ ...model, checked: true }));
  }

  /**
   * @inheritdoc
   */
  uncheckAllTiles(): void {
    this.map(model => ({ ...model, checked: false }));
  }

  /**
   * @inheritdoc
   */
  removeCheckedTiles(): void {
    // To make sure our data source remains page-aligned, we will offset our data source by
    // the number of removed tiles, so that we can just add the offset when the infinite
    // scroller queries for cell contents.
    // This only matters while we're still viewing the same set of results. If the user changes
    // their query/filters/sort, then the data source is overwritten and the offset cleared.
    const { checkedTileModels, uncheckedTileModels } = this;
    const numChecked = checkedTileModels.length;
    if (numChecked === 0) return;
    this.offset += numChecked;
    const newPages: typeof this.pages = {};

    // Which page the remaining tile models start on, post-offset
    let offsetPageNumber = Math.floor(this.offset / this.pageSize) + 1;
    let indexOnPage = this.offset % this.pageSize;

    // Fill the pages up to that point with empty models
    for (let page = 1; page <= offsetPageNumber; page += 1) {
      const remainingHidden = this.offset - this.pageSize * (page - 1);
      const offsetCellsOnPage = Math.min(this.pageSize, remainingHidden);
      newPages[page] = Array(offsetCellsOnPage).fill(undefined);
    }

    // Shift all the remaining tiles into their new positions in the data source
    for (const model of uncheckedTileModels) {
      if (!newPages[offsetPageNumber]) newPages[offsetPageNumber] = [];
      newPages[offsetPageNumber].push(model);
      indexOnPage += 1;
      if (indexOnPage >= this.pageSize) {
        offsetPageNumber += 1;
        indexOnPage = 0;
      }
    }

    // Swap in the new pages
    this.pages = newPages;
    this.numTileModels -= numChecked;
    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  get checkedTileModels(): TileModel[] {
    return this.getFilteredTileModels(model => model.checked);
  }

  /**
   * @inheritdoc
   */
  get uncheckedTileModels(): TileModel[] {
    return this.getFilteredTileModels(model => !model.checked);
  }

  /**
   * Returns a flattened, filtered array of all the tile models in the data source
   * for which the given predicate returns a truthy value.
   *
   * @param predicate A callback function to apply on each tile model, as with Array.filter
   * @returns A filtered array of tile models satisfying the predicate
   */
  private getFilteredTileModels(
    predicate: (model: TileModel, index: number, array: TileModel[]) => unknown
  ): TileModel[] {
    return Object.values(this.pages)
      .flat()
      .filter((model, index, array) =>
        model ? predicate(model, index, array) : false
      );
  }
}
