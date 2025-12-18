import { LitElement, PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';
import type { SortParam } from '@internetarchive/search-service';
import { TileDisplayValueProvider } from './tile-display-value-provider';
import type { TileModel } from '../models';
import { DateFormat, formatDate } from '../utils/format-date';

export abstract class BaseTileComponent extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: String }) collectionPagePath?: string;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Object }) defaultSortParam: SortParam | null = null;

  @property({ type: String }) creatorFilter?: string;

  @property({ type: Number }) mobileBreakpoint?: number;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) suppressBlurring = false;

  @property({ type: Boolean }) useLocalTime = false;

  protected displayValueProvider = new TileDisplayValueProvider();

  protected willUpdate(changed: PropertyValues<this>) {
    // Ensure the TileDisplayValueProvider stays up-to-date as properties change
    if (
      changed.has('model') ||
      changed.has('baseNavigationUrl') ||
      changed.has('collectionPagePath') ||
      changed.has('sortParam') ||
      changed.has('defaultSortParam') ||
      changed.has('creatorFilter')
    ) {
      this.displayValueProvider = new TileDisplayValueProvider({
        model: this.model,
        baseNavigationUrl: this.baseNavigationUrl,
        collectionPagePath: this.collectionPagePath,
        sortParam: this.sortParam ?? this.defaultSortParam ?? undefined,
        creatorFilter: this.creatorFilter,
      });
    }
  }

  /**
   * The formatted date string for given date and format type, taking into
   * account whether this tile component should be using local time or UTC.
   */
  protected getFormattedDate(date?: Date, format?: DateFormat): string {
    const { useLocalTime } = this;
    return formatDate(date, format, { useLocalTime });
  }
}
