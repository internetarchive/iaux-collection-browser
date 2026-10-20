import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import {
  clearPreviewMediaCache,
  resolvePreviewMedia,
} from '../../../src/tiles/preview/tile-preview-media';

const files = (list: object[]) =>
  new Response(JSON.stringify({ result: list }), { status: 200 });

describe('resolvePreviewMedia', () => {
  let fetchStub: sinon.SinonStub;

  beforeEach(() => {
    clearPreviewMediaCache();
    fetchStub = sinon.stub(window, 'fetch');
  });

  afterEach(() => {
    fetchStub.restore();
  });

  it('builds page image urls for texts without any request', async () => {
    const media = await resolvePreviewMedia('book', 'texts');
    expect(media.kind).to.equal('slides');
    expect(fetchStub.called).to.be.false;
  });

  it('cycles evenly spaced frames for movies, skipping the cover', async () => {
    const thumbs = Array.from({ length: 20 }, (_, i) => ({
      name: `m.thumbs/m_${String(i).padStart(6, '0')}.jpg`,
      format: 'Thumbnail',
    }));
    fetchStub.resolves(files(thumbs));
    const media = await resolvePreviewMedia('m', 'movies');
    if (media.kind !== 'slides') throw new Error('expected slides');
    expect(media.urls.length).to.equal(6);
    expect(media.urls[0]).to.not.contain('m_000000');
  });

  it('only plays a clip when asked and a 512Kb derivative exists', async () => {
    const list = [
      { name: 'm.mp4', format: 'h.264', length: '600' },
      { name: 'm_512kb.mp4', format: '512Kb MPEG4', length: '600' },
    ];
    fetchStub.callsFake(() => Promise.resolve(files(list)));
    expect((await resolvePreviewMedia('m', 'movies')).kind).to.equal('zoom');
    const clip = await resolvePreviewMedia('m', 'movies', undefined, {
      clips: true,
    });
    if (clip.kind !== 'video') throw new Error('expected video');
    expect(clip.src).to.contain('m_512kb.mp4');
    expect(clip.start).to.equal(60);
  });

  it('uses the waveform png beside the first mp3 for audio', async () => {
    fetchStub.resolves(
      files([
        { name: 'b.mp3', length: '03:00' },
        { name: 'a.mp3', length: '03:00' },
        { name: 'a.png' },
      ]),
    );
    const media = await resolvePreviewMedia('a', 'etree');
    if (media.kind !== 'audio') throw new Error('expected audio');
    expect(media.src).to.contain('a.mp3');
    expect(media.waveform).to.contain('a.png');
    expect(media.start).to.equal(60);
  });

  it('falls back to the thumbnail pan when the request fails, and caches it', async () => {
    fetchStub.rejects(new Error('offline'));
    expect((await resolvePreviewMedia('x', 'image')).kind).to.equal('zoom');
    await resolvePreviewMedia('x', 'image');
    expect(fetchStub.callCount).to.equal(1);
  });
});
