import { css } from 'lit';

/**
 * Shared styles for tile action buttons rendered in grid, list-detail, and
 * list-compact display modes. Layout positioning is handled by each tile
 * component; these styles cover only the button appearance and the row
 * container's default flex behavior.
 *
 * Customizable via CSS custom properties:
 *  - `--tileActionColor` (default: #d9534f)
 *  - `--tileActionBg` (default: #fff)
 *  - `--tileActionBorderColor` (default: #d9534f)
 *  - `--tileActionHoverBg` (default: rgba(217, 83, 79, 0.1))
 *  - `--tileActionHoverColor` (defaults to --tileActionColor)
 */
export const tileActionStyles = css`
  .tile-actions {
    flex-shrink: 0;
    display: flex;
    gap: var(--tileActionGap, 0);
  }

  .tile-action-btn {
    flex: 1;
    padding: 6px 5px;
    border: 2px solid var(--tileActionBorderColor, #d9534f);
    border-radius: var(--tileActionBorderRadius, 0);
    /* Inherit from the surrounding tile rather than the UA default for <button> */
    font-family: inherit;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    color: var(--tileActionColor, #d9534f);
    background: var(--tileActionBg, #fff);
    transition:
      background 0.15s,
      color 0.15s;
  }

  /*
   * When buttons are flush against each other (no gap), overlap their shared
   * edge by 1px so adjacent borders don't double up.
   */
  .tile-action-btn + .tile-action-btn {
    margin-left: -1px;
  }

  .tile-action-btn:hover {
    background: var(--tileActionHoverBg, rgba(217, 83, 79, 0.2));
    color: var(--tileActionHoverColor, var(--tileActionColor, #d9534f));
  }
`;
