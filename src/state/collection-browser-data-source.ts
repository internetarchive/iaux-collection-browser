import type { ReactiveController } from 'lit';
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
}

export class CollectionBrowserDataSource
  implements CollectionBrowserDataSourceInterface
{
  private pages: Record<string, TileModel[]> = {};

  // eslint-disable-next-line no-useless-constructor
  constructor(private pageSize: number) {
    // No behavior, just setting properties
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
}
