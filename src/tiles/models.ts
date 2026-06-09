/**
 * What type of simplified tile layout to use.
 *  - `default`: Do not apply any layout simplifications.
 *  - `stats-only`: Only show the tile stats row, but not text snippets.
 *  - `snippets-only`: Only show the text snippets row (if snippets exist), but not tile stats.
 *  - `minimal`: Show neither tile stats nor the text snippets.
 */
export type LayoutType = 'default' | 'stats-only' | 'snippets-only' | 'minimal';

/**
 * Describes an action button to render on a tile.
 * Styling is controlled via the CSS custom properties documented in
 * `src/styles/tile-action-styles.ts`.
 */
export interface TileAction {
  /** Unique identifier for this action, included in the `tileActionClicked` event */
  id: string;

  /** Visible label text displayed on the button */
  label: string;
}
