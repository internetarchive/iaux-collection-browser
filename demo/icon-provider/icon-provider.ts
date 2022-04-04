export type CollectionBrowserIcon = 'grid' | 'list' | 'list-A' | 'list-B';

export type AllIcons = CollectionBrowserIcon | 'boop';

export interface IconProviderInterface<T> {
  urlForIcon(iconName: T): Promise<string>;
}

export class IconProvider<T> implements IconProviderInterface<T> {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async urlForIcon(iconName: T): Promise<string> {
    return `${this.baseUrl}/${iconName}.svg`;
  }
}
