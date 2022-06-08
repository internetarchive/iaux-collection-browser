import { css } from 'lit';

/**
 * Base item-tile styles
 */
export const baseItemTileStyles = css`
  #container {
    background-color: #ffffff;
    border-radius: var(--collectionTileCornerRadius, 4px);
    box-shadow: 1px 1px 2px 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  #title-image-container {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding: 0.5rem 0.5rem 0 0.5rem;
  }

  #item-title {
    color: #2c2c2c;
    font-size: 1.6rem;
    text-align: center;
    margin-top: 0rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 2rem;
    height: 4rem;
  }

  #item-image-container {
    display: flex;
    justify-content: center;
    flex: 1;
  }

  .hidden {
    display: none;
  }

  #container:hover > #title-image-container > .item-title {
    text-decoration: underline;
  }

  /** this is a workaround for Safari 15 where the hover effects are not working */
  #title-image-container:hover > #item-title {
    text-decoration: underline;
  }

  #container:hover > #item-title {
    background-color: #fcfcfc;
  }

  .item-creator {
    display: flex;
    justify-content: center;
    align-items: flex-end; /* Important to start text from bottom */
    height: 3rem;
    padding-top: 1rem;
  }

  .truncated {
    flex: 1;
    min-width: 0; /* Important for long words! */
  }

  .truncated span {
    font-size: 1.4rem;
    color: #2c2c2c;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: 2rem;
    text-align: center;
  }

  .hr {
    border: 0.5px solid #ccc;
  }

  #item-stats-container {
    align-items: center;
    display: flex;
    height: 4rem;
    padding-left: 1rem;
    padding-right: 0.5rem;
  }

  #stats-holder {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    text-align: center;
    width: 100%;
  }

  svg {
    height: 10px;
    width: 10px;
  }

  .status-text {
    font-size: 14px;
    color: #2c2c2c;
    line-height: 15px;
    margin: auto;
    display: block;
    text-align: center;
  }

  .col {
    width: 25%;
  }
`;
