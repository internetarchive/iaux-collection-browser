import { expect } from '@open-wc/testing';
import {
  clampGestureScale,
  GRID_ZOOM_COLUMNS,
  nearestZoomLevel,
  zoomLayoutType,
  zoomLevelForScale,
  zoomLevelStyles,
} from '../../src/utils/grid-zoom';

describe('Grid zoom levels', () => {
  it('finds the level closest to a column count', () => {
    expect(GRID_ZOOM_COLUMNS[nearestZoomLevel(5)]).to.equal(6);
    expect(GRID_ZOOM_COLUMNS[nearestZoomLevel(2)]).to.equal(2);
    expect(GRID_ZOOM_COLUMNS[nearestZoomLevel(40)]).to.equal(12);
  });

  it('snaps a pinch scale to a level (above 1 gives fewer columns)', () => {
    expect(GRID_ZOOM_COLUMNS[zoomLevelForScale(6, 1)]).to.equal(6);
    expect(GRID_ZOOM_COLUMNS[zoomLevelForScale(6, 2)]).to.equal(3);
    expect(GRID_ZOOM_COLUMNS[zoomLevelForScale(4, 0.5)]).to.equal(8);
  });

  it('limits how far a gesture can stretch the grid', () => {
    expect(clampGestureScale(4, 100)).to.be.at.most(4 * 1.15);
    expect(clampGestureScale(4, 0.001)).to.be.above(0.2);
    expect(clampGestureScale(4, 1)).to.equal(1);
  });

  it('sizes the grid tracks for the level', () => {
    const styles = zoomLevelStyles(GRID_ZOOM_COLUMNS.indexOf(4), 1000);
    expect(styles['--infiniteScrollerCellMinWidth']).to.contain('/ 4');
    expect(styles['--imgBlockHeight']).to.be.undefined;
  });

  it('sizes thumbnails to the tile width at the densest levels', () => {
    const level = GRID_ZOOM_COLUMNS.indexOf(12);
    const styles = zoomLevelStyles(level, 1000);
    expect(styles['--imgBlockHeight']).to.equal('81px');
    expect(zoomLayoutType(level)).to.equal('thumbnail-only');
  });

  it('keeps the default tile layout at the biggest levels', () => {
    expect(zoomLayoutType(GRID_ZOOM_COLUMNS.indexOf(3))).to.be.undefined;
    expect(zoomLayoutType(GRID_ZOOM_COLUMNS.indexOf(6))).to.equal('minimal');
  });
});
