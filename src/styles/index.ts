import { css } from 'lit';

/**
 * Base item-image styles
 */
export const baseItemImageStyles = css`
  .grid-tile {
    width: 16rem;
    height: 16rem;
  }

  .list-tile {
    width: 100%;
    height: 100%;
  }

  .list-image-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    position: relative;
  }

  .item-image {
    object-fit: contain;
    background-repeat: no-repeat;
    background-position: center center;
    position: relative;
    -webkit-appearance: none;
    overflow: visible;
  }

  .default {
    background-size: contain;
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
  }
`;

/**
 * Waveform styles
 */
export const waveformGradientStyles = css`
  .waveform {
    mix-blend-mode: screen;
  }

  .grad0 {
    background: linear-gradient(
      hsl(340, 80%, 55%),
      hsl(0, 80%, 33%) 35%,
      hsl(0, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .grad1 {
    background: linear-gradient(
      hsl(300, 80%, 55%),
      hsl(330, 80%, 33%) 35%,
      hsl(330, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .grad2 {
    background: linear-gradient(
      hsl(200, 80%, 55%),
      hsl(230, 80%, 33%) 35%,
      hsl(230, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .grad3 {
    background: linear-gradient(
      hsl(160, 80%, 55%),
      hsl(190, 80%, 33%) 35%,
      hsl(190, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .grad4 {
    background: linear-gradient(
      hsl(250, 80%, 55%),
      hsl(280, 80%, 33%) 35%,
      hsl(280, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .grad5 {
    background: linear-gradient(
      hsl(280, 80%, 55%),
      hsl(310, 80%, 33%) 35%,
      hsl(310, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }
`;
