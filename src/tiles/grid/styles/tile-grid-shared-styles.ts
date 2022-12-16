import { css } from 'lit';

/**
 * Base tile styles
 */

const tileBackgroundColor = css`var(--tileBackgroundColor, #ffffff)`;
const tileCornerRadius = css`var(--tileCornerRadius, 4px)`;

export const baseTileStyles = css`
  .container {
    background-color: ${tileBackgroundColor};
    border: 1px #2c2c2c;
    border-radius: ${tileCornerRadius};
    box-shadow: 1px 1px 2px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  image-block {
    display: block;
    margin-bottom: 5px;
    position: relative;
    text-align: center;
  }

  .tile-details {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 5px;
    font-family: 'Helvetica Neue', ui-sans-serif, system-ui, sans-serif;
  }

  .item-info {
    flex-grow: 1;
  }

  #title {
    flex-shrink: 0;
    padding-left: 5px;
    padding-right: 5px;
    margin-bottom: 5px;
  }

  .created-by,
  .date-sorted-by,
  .volume-issue,
  .archivist-since {
    display: flex;
    justify-content: left;
    align-items: flex-end; /* Important to start text from bottom */
    padding: 0 5px 5px 5px;
  }

  .truncated {
    flex: 1;
    color: #2c2c2c;
    min-width: 0; /* Important for long words! */
    text-align: left;
    line-height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  h1.truncated {
    display: -webkit-box;
    margin: 0px;
    line-height: 15px;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 1px;
  }

  span {
    display: -webkit-box;
    font-size: 1.4rem;
    line-height: 15px;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-bottom: 1px;
  }

  .container:hover > .tile-details > .item-info > #title > .truncated {
    text-decoration: underline;
  }

  /** this is a workaround for Safari 15 where the hover effects are not working */
  #title:hover > .truncated {
    text-decoration: underline;
  }

  .hidden {
    display: none;
  }
`;
