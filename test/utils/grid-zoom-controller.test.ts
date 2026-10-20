import { expect, fixture, html, aTimeout } from '@open-wc/testing';
import sinon from 'sinon';
import {
  GridZoomController,
  GridZoomHost,
} from '../../src/utils/grid-zoom-controller';
import { GRID_ZOOM_COLUMNS } from '../../src/utils/grid-zoom';

describe('Grid zoom controller', () => {
  let surface: HTMLElement;
  let level: number;
  let host: GridZoomHost;
  let controller: GridZoomController;
  let commit: sinon.SinonStub;

  beforeEach(async () => {
    surface = await fixture<HTMLElement>(
      html`<div style="width: 400px; height: 400px"></div>`,
    );
    level = GRID_ZOOM_COLUMNS.indexOf(4);
    commit = sinon.stub().callsFake(async (newLevel: number) => {
      level = newLevel;
    });
    host = {
      getSurface: () => surface,
      getColumns: () => GRID_ZOOM_COLUMNS[level],
      getLevel: () => level,
      captureAnchor: () => undefined,
      commitLevel: commit,
    };
    controller = new GridZoomController(host);
    controller.connect();
  });

  afterEach(() => controller.disconnect());

  const touch = (type: string, id: number, x: number, y: number) =>
    surface.dispatchEvent(
      new PointerEvent(type, {
        pointerType: 'touch',
        pointerId: id,
        clientX: x,
        clientY: y,
        bubbles: true,
      }),
    );

  it('lets the browser keep touch panning but not pinch-zooming the grid', () => {
    expect(surface.style.touchAction).to.equal('pan-x pan-y');
    controller.disconnect();
    expect(surface.style.touchAction).to.equal('');
  });

  it('zooms to fewer columns when two touches spread apart', async () => {
    touch('pointerdown', 1, 150, 200);
    touch('pointerdown', 2, 250, 200);
    touch('pointermove', 1, 100, 200);
    touch('pointermove', 2, 300, 200);
    expect(surface.style.transform).to.equal('scale(2)');
    touch('pointerup', 1, 100, 200);
    touch('pointerup', 2, 300, 200);
    await aTimeout(400);
    expect(commit.calledOnce).to.be.true;
    expect(GRID_ZOOM_COLUMNS[commit.firstCall.args[0]]).to.equal(2);
    expect(commit.firstCall.args[1]).to.deep.equal({ x: 200, y: 200 });
    expect(surface.style.transform).to.equal('');
  });

  it('ignores a pinch that stays near its starting size', async () => {
    touch('pointerdown', 1, 150, 200);
    touch('pointerdown', 2, 250, 200);
    touch('pointermove', 2, 260, 200);
    touch('pointerup', 1, 150, 200);
    touch('pointerup', 2, 260, 200);
    await aTimeout(400);
    expect(commit.called).to.be.false;
  });

  it('ignores a single touch and mouse pointers', async () => {
    touch('pointerdown', 1, 150, 200);
    touch('pointermove', 1, 100, 200);
    touch('pointerup', 1, 100, 200);
    surface.dispatchEvent(
      new PointerEvent('pointerdown', { pointerType: 'mouse', pointerId: 5 }),
    );
    expect(surface.style.transform).to.equal('');
    expect(commit.called).to.be.false;
  });

  it('treats ctrl+wheel as a trackpad pinch and leaves plain scrolling alone', async () => {
    const plain = new WheelEvent('wheel', {
      deltaY: -10,
      bubbles: true,
      cancelable: true,
    });
    surface.dispatchEvent(plain);
    expect(plain.defaultPrevented).to.be.false;

    let last!: WheelEvent;
    for (let i = 0; i < 12; i += 1) {
      last = new WheelEvent('wheel', {
        deltaY: -10,
        ctrlKey: true,
        bubbles: true,
        cancelable: true,
      });
      surface.dispatchEvent(last);
    }
    expect(last.defaultPrevented).to.be.true;
    await aTimeout(500);
    expect(commit.calledOnce).to.be.true;
    expect(GRID_ZOOM_COLUMNS[commit.firstCall.args[0]]).to.be.below(4);
  });

  it('steps one level with ctrl/cmd + and - while the pointer is over the grid', async () => {
    surface.dispatchEvent(new PointerEvent('pointermove', { clientX: 10 }));
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: '-', ctrlKey: true }),
    );
    await aTimeout(400);
    expect(GRID_ZOOM_COLUMNS[commit.firstCall.args[0]]).to.equal(6);

    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: '=', metaKey: true }),
    );
    await aTimeout(400);
    expect(GRID_ZOOM_COLUMNS[commit.secondCall.args[0]]).to.equal(4);
  });

  it('leaves browser zoom shortcuts alone when the grid is not in use', async () => {
    const event = new KeyboardEvent('keydown', {
      key: '=',
      ctrlKey: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
    expect(event.defaultPrevented).to.be.false;
    await aTimeout(50);
    expect(commit.called).to.be.false;
  });

  it('zooms to a requested level', async () => {
    await controller.zoomToLevel(GRID_ZOOM_COLUMNS.indexOf(8));
    expect(GRID_ZOOM_COLUMNS[commit.firstCall.args[0]]).to.equal(8);
  });
});
