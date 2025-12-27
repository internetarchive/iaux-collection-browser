import { TemplateResult, html, nothing } from 'lit';
import { msg, str } from '@lit/localize';
import type { SortParam } from '@internetarchive/search-service';
import type { TileModel } from '../models';
import { formatDate } from '../utils/format-date';

/**
 * A class encapsulating shared logic for converting model values into display values
 * across different types of tiles.
 */
export class TileDisplayValueProvider {
  private model?: TileModel;

  private baseNavigationUrl?: string;

  private collectionPagePath?: string;

  private sortParam?: SortParam;

  private creatorFilter?: string;

  constructor(
    options: {
      model?: TileModel;
      baseNavigationUrl?: string;
      collectionPagePath?: string;
      sortParam?: SortParam;
      creatorFilter?: string;
    } = {},
  ) {
    this.model = options.model;
    this.baseNavigationUrl = options.baseNavigationUrl;
    this.collectionPagePath = options.collectionPagePath ?? '/details/';
    this.sortParam = options.sortParam;
    this.creatorFilter = options.creatorFilter;
  }

  /**
   * Examines the creator(s) for the given tile model, returning
   * the first creator whose name matches the provided filter
   * (or simply the first creator overall if no filter is provided).
   */
  get firstCreatorMatchingFilter(): string | undefined {
    let matchingCreator;

    // If we're filtering by creator initial and have multiple creators, we want
    // to surface the first creator who matches the filter.
    if (this.creatorFilter && this.model?.creators.length) {
      const firstLetter = this.creatorFilter; // This is just to satisfy tsc
      matchingCreator = this.model.creators.find(creator =>
        // Decompose combining characters first, so that e.g., filtering on E matches É too.
        // Then remove anything that isn't strictly alphabetic, since our filters currently
        // only handle A-Z. The first such letter (if one exists) is what needs to match.
        creator
          .normalize('NFD')
          .replace(/[^A-Z]+/gi, '')
          .toUpperCase()
          .startsWith(firstLetter),
      );
    }

    return matchingCreator ?? this.model?.creator;
  }

  /**
   * The label indicating what year an account item was created.
   * E.g., "Archivist since 2015"
   */
  get accountLabel(): string {
    return this.model?.dateAdded
      ? msg(str`Archivist since ${this.model.dateAdded.getFullYear()}`)
      : '';
  }

  /**
   * The readable label for the current sort if it is a type of date sort,
   * or the empty string otherwise.
   */
  get dateLabel(): string {
    switch (this.sortParam?.field) {
      case 'publicdate':
        return msg('Archived');
      case 'reviewdate':
        return msg('Reviewed');
      case 'addeddate':
        return msg('Added');
      case 'date':
        return msg('Published');
      default:
        return '';
    }
  }

  /**
   * Produces a URL pointing at the item page for the given identifier,
   * using the current base URL and the correct path based on whether the
   * item is specified to be a collection (default false).
   */
  itemPageUrl(identifier?: string, isCollection = false): string | undefined {
    if (!identifier || this.baseNavigationUrl == null) return;
    const basePath = isCollection ? this.collectionPagePath : '/details/';
    return `${this.baseNavigationUrl}${basePath}${identifier}`;
  }

  /**
   * Produces a template for a link to a single web capture of the given URL and date
   */
  webArchivesCaptureLink(url: string, date: Date): TemplateResult {
    // Convert the date into the format used to identify wayback captures (e.g., '20150102124550')
    const captureDateStr = date
      .toISOString()
      .replace(/[TZ:-]/g, '')
      .replace(/\..*/, '');
    const captureHref = `https://web.archive.org/web/${captureDateStr}/${encodeURIComponent(
      url,
    )}`;
    const captureText = formatDate(date, 'long');

    return html` <a href=${captureHref}> ${captureText} </a> `;
  }
}
