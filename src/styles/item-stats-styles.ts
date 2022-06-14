import { css } from 'lit';

export const statusWrapperStyles = css`
  .stats-wrapper {
    flex-shrink: 0;
  }

  .hr {
    border: 0.5px solid #bbb;
  }

  #stats-holder {
    align-items: center;
    display: flex;
    flex: 1;
    justify-content: space-evenly;
    text-align: center;
    width: 100%;
    height: 35px;
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
    height: 25px;
  }
`;
