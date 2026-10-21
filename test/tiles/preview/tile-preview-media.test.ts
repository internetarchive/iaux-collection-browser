import { expect } from '@open-wc/testing';
import sinon from 'sinon';
import {
  clearPreviewMediaCache,
  estimateClipBytes,
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

  it('plays the smallest playable derivative only when clips are asked for', async () => {
    const list = [
      { name: 'm.mp4', format: 'h.264', length: '600', size: '68000000' },
      {
        name: 'm_512kb.mp4',
        format: '512Kb MPEG4',
        length: '600',
        size: '45000000',
      },
      { name: 'm.ogv', format: 'Ogg Video', length: '600', size: '9000000' },
      { name: 'm.thumbs/m_000001.jpg', format: 'Thumbnail', size: '1000' },
      { name: 'm.thumbs/m_000002.jpg', format: 'Thumbnail', size: '1000' },
      { name: 'm.thumbs/m_000003.jpg', format: 'Thumbnail', size: '1000' },
    ];
    fetchStub.callsFake(() => Promise.resolve(files(list)));
    expect((await resolvePreviewMedia('m', 'movies')).kind).to.equal('slides');
    const clip = await resolvePreviewMedia('m', 'movies', undefined, {
      clips: true,
    });
    if (clip.kind !== 'video') throw new Error('expected video');
    expect(clip.src).to.contain('m_512kb.mp4');
    expect(clip.start).to.equal(60);
    expect(clip.fallbackUrls.length).to.equal(2);
  });

  it('falls back to frames when a movie has no playable derivative', async () => {
    fetchStub.resolves(
      files([
        { name: 'm.ogv', format: 'Ogg Video', size: '100' },
        { name: 'm.thumbs/m_000001.jpg', format: 'Thumbnail', size: '10' },
        { name: 'm.thumbs/m_000002.jpg', format: 'Thumbnail', size: '10' },
        { name: 'm.thumbs/m_000003.jpg', format: 'Thumbnail', size: '10' },
      ]),
    );
    const media = await resolvePreviewMedia('m', 'movies', undefined, {
      clips: true,
    });
    expect(media.kind).to.equal('slides');
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

  it('uses frames when even the cheapest derivative is too expensive', async () => {
    fetchStub.callsFake(() =>
      Promise.resolve(
        files([
          // 4.8 Mbps for 4704s: about 27 MB of read-ahead plus the index.
          {
            name: 'big.mp4',
            format: 'h.264 IA',
            length: '4704',
            size: '2800000000',
          },
          { name: 'm.thumbs/m_000001.jpg', format: 'Thumbnail', size: '10' },
          { name: 'm.thumbs/m_000002.jpg', format: 'Thumbnail', size: '10' },
          { name: 'm.thumbs/m_000003.jpg', format: 'Thumbnail', size: '10' },
        ]),
      ),
    );
    const media = await resolvePreviewMedia('big', 'movies', undefined, {
      clips: true,
    });
    expect(media.kind).to.equal('slides');
    clearPreviewMediaCache();
    const raised = await resolvePreviewMedia('big', 'movies', undefined, {
      clips: true,
      clipBudgetBytes: 100_000_000,
    });
    expect(raised.kind).to.equal('video');
  });

  it('prefers the lowest bitrate over the smallest file', () => {
    const lowBitrateLong = { name: 'a.mp4', length: '1000', size: '60000000' };
    const highBitrateShort = { name: 'b.mp4', length: '20', size: '40000000' };
    expect(estimateClipBytes(lowBitrateLong)).to.be.lessThan(
      estimateClipBytes(highBitrateShort),
    );
  });
});
