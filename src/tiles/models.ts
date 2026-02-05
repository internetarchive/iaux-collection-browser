/**
 * What type of simplified tile layout to use.
 *  - `none`: Do not apply any layout simplifications.
 *  - `stats-only`: Only show the tile stats row, but not text snippets.
 *  - `snippets-only`: Only show the text snippets row (if snippets exist), but not tile stats.
 *  - `minimal`: Show neither tile stats nor the text snippets.
 */
export type SimpleLayoutType =
  | 'none'
  | 'stats-only'
  | 'snippets-only'
  | 'minimal';
