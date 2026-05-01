/**
 * What type of simplified tile layout to use.
 *  - `default`: Do not apply any layout simplifications.
 *  - `stats-only`: Only show the tile stats row, but not text snippets.
 *  - `snippets-only`: Only show the text snippets row (if snippets exist), but not tile stats.
 *  - `minimal`: Show neither tile stats nor the text snippets.
 */
export type LayoutType = 'default' | 'stats-only' | 'snippets-only' | 'minimal';

/**
 * Describes an action button to render at the bottom of a tile.
 * Styling is controlled via CSS custom properties on the host:
 *  - `--tileActionColor` (default: #333)
 *  - `--tileActionBg` (default: #fff)
 *  - `--tileActionHoverBg` (default: #f0f0f0)
 *  - `--tileActionSeparatorColor` (default: #ddd)
 */
export interface TileAction {
  /** Unique identifier for this action */
  id: string;

  /** Label text displayed on the button */
  label: string;
}
