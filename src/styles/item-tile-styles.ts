import { css } from 'lit';

export const itemTileStyles = css`
  #container {
    background-color: #ffffff;
    border-radius: var(--collectionTileCornerRadius, 4px);
    box-shadow: 1px 1px 2px 0px;
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .title-wrapper {
    flex-shrink: 0;
  }

  .image-wrapper {
    flex-grow: 1;
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
    height: 16rem;
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
    margin-top: 5px;
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
`;
