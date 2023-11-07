import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { TileModel } from '../models';

export interface CollectionBrowserDataSourceInterface
  extends ReactiveController {
  hostConnected(): void;

  addPage(pageNumber: number, pageTiles: TileModel[]): void;

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

  // eslint-disable-next-line no-useless-constructor
  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost,
    /** Default size of result pages */
    private pageSize: number
  ) {
    this.host.addController(this);
  }

  hostConnected(): void {}

  addPage(pageNumber: number, pageTiles: TileModel[]): void {
    this.pages[pageNumber] = pageTiles;
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
  }

  mapDataSource(
    mapFn: (model: TileModel, index: number, array: TileModel[]) => TileModel
  ): void {
    this.pages = Object.fromEntries(
      Object.entries(this.pages).map(([page, tileModels]) => [
        page,
        tileModels.map((model, index, array) =>
          model ? mapFn(model, index, array) : model
        ),
      ])
    );
  }
}
