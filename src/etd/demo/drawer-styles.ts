import { css } from 'lit';

/**
 * The ETD demo's drawers: <details> whose <summary> is a full-width bar, so
 * the whole row toggles, not just the text.
 */
export const drawerStyles = css`
  details {
    margin: 0.6rem 0;
  }

  details > summary {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 0.8rem;
    background: #f1f4f8;
    border: 1px solid #c9d4e0;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    list-style: none;
    user-select: none;
  }

  details > summary::-webkit-details-marker {
    display: none;
  }

  details > summary::before {
    content: '▸';
    display: inline-block;
    transition: transform 0.15s;
  }

  details[open] > summary::before {
    transform: rotate(90deg);
  }

  details[open] > summary {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  details > summary:hover {
    background: #e3eaf3;
  }

  details > summary:focus-visible {
    outline: 2px solid #2c5f8f;
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    details > summary::before {
      transition: none;
    }
  }
`;
