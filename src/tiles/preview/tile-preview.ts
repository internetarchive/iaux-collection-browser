import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { msg } from '@lit/localize';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  PREVIEW_CLIP_SECONDS,
  resolvePreviewMedia,
  type TilePreviewMedia,
  type TilePreviewOptions,
} from './tile-preview-media';

const SLIDE_INTERVAL_MS = 700;
/** How long the first video frame may take before the frames take over. */
const FIRST_FRAME_TIMEOUT_MS = 2500;
const MAX_VOLUME = 0.5;
const FADE_IN_MS = 250;
const FADE_OUT_MS = 120;

/**
 * Fills a tile's image area with a live preview of the item while `active`:
 * a muted clip for movies, a few page images for texts, a waveform for audio,
 * cycling images for images, and a slow pan over the thumbnail for anything
 * else. It is absolutely positioned over the existing thumbnail, so showing
 * and hiding it never moves the layout.
 */
@customElement('tile-preview')
export class TilePreview extends LitElement {
  @property({ type: String }) identifier?: string;

  @property({ type: String }) mediatype?: string;

  @property({ type: String }) baseUrl = 'https://archive.org';

  /** The tile's thumbnail, panned slowly when there is nothing richer to show. */
  @property({ type: String }) thumbnailUrl?: string;

  @property({ type: Boolean, reflect: true }) active = false;

  @property({ type: Object }) options: TilePreviewOptions = {};

  @state() private media?: TilePreviewMedia;

  @state() private slideUrls: string[] = [];

  @state() private slide = 0;

  @state() private ready = false;

  /** Whether sound is audibly playing, as opposed to muted or refused. */
  @state() private audible = false;

  @query('video') private video?: HTMLVideoElement;

  @query('audio') private audio?: HTMLAudioElement;

  private slideTimer?: number;

  private frameTimer?: number;

  /** Pending fade animation frame per element, so one element's fade never cancels another's. */
  private fadeFrames = new WeakMap<HTMLMediaElement, number>();

  /** Bumped on every activation so a slow resolve can't show a stale preview. */
  private activation = 0;

  protected willUpdate(changed: PropertyValues<this>): void {
    // Release while the media elements are still in the DOM.
    if (changed.has('active') && !this.active) this.stop();
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('active') || changed.has('identifier')) {
      if (this.active) {
        this.stop();
        this.start();
      }
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stop();
  }

  private async start(): Promise<void> {
    if (!this.identifier || !this.mediatype) return;
    const activation = ++this.activation;
    const media = await resolvePreviewMedia(
      this.identifier,
      this.mediatype,
      this.baseUrl,
      this.options,
    );
    if (activation !== this.activation || !this.active) return;

    this.media = media;
    this.slideUrls = media.kind === 'slides' ? media.urls : [];
    this.slide = 0;
    this.ready = media.kind === 'zoom' || media.kind === 'audio';
    await this.updateComplete;
    if (activation !== this.activation) return;

    if (media.kind === 'slides') this.startSlides();
    if (media.kind === 'audio' && this.options.sound) this.playSnippet();
    if (media.kind === 'video') {
      this.frameTimer = window.setTimeout(
        () => this.useFallbackFrames(),
        FIRST_FRAME_TIMEOUT_MS,
      );
    }
  }

  private stop(): void {
    this.activation += 1;
    window.clearInterval(this.slideTimer);
    window.clearTimeout(this.frameTimer);
    this.releaseMedia(this.video);
    this.releaseMedia(this.audio);
    this.media = undefined;
    this.slideUrls = [];
    this.ready = false;
    this.audible = false;
  }

  /**
   * Stops a media element: a short fade-out when it is audible, then pause and
   * drop the source so the browser stops downloading it.
   */
  private releaseMedia(el?: HTMLMediaElement): void {
    if (!el) return;
    this.cancelFade(el);
    const finish = () => {
      el.pause();
      el.removeAttribute('src');
      el.load();
    };
    if (el.paused || el.muted || el.volume === 0) {
      finish();
      return;
    }
    this.fade(el, 0, FADE_OUT_MS, finish);
  }

  private cancelFade(el: HTMLMediaElement): void {
    const frame = this.fadeFrames.get(el);
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    this.fadeFrames.delete(el);
  }

  /** Ramps a media element's volume to `target` over `ms`. */
  private fade(
    el: HTMLMediaElement,
    target: number,
    ms: number,
    done?: () => void,
  ): void {
    this.cancelFade(el);
    const from = el.volume;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / ms);
      el.volume = from + (target - from) * t;
      if (t < 1) this.fadeFrames.set(el, window.requestAnimationFrame(step));
      else {
        this.fadeFrames.delete(el);
        done?.();
      }
    };
    this.fadeFrames.set(el, window.requestAnimationFrame(step));
  }

  /**
   * Starts a media element, with sound when the options ask for it. A browser
   * that refuses audible playback gets a muted one instead.
   */
  private async playMedia(
    el: HTMLMediaElement,
    activation: number,
  ): Promise<boolean> {
    if (this.options.sound) {
      try {
        el.muted = false;
        el.volume = 0;
        await el.play();
        if (activation !== this.activation) return true;
        this.audible = true;
        this.fade(el, MAX_VOLUME, FADE_IN_MS);
        return true;
      } catch {
        // Refused, so play it muted below.
      }
    }
    try {
      el.muted = true;
      await el.play();
      return true;
    } catch {
      // A stopped preview isn't a failure; only a current one needs the frames.
      return activation !== this.activation;
    }
  }

  /** Swaps a clip that is slow or unplayable for the item's frame thumbnails. */
  private useFallbackFrames(): void {
    window.clearTimeout(this.frameTimer);
    if (this.media?.kind !== 'video') return;
    const urls = this.media.fallbackUrls;
    this.releaseMedia(this.video);
    this.audible = false;
    if (urls.length > 1) {
      this.media = { kind: 'slides', fit: 'cover', urls };
      this.slideUrls = urls;
      this.slide = 0;
      this.ready = false;
      const { activation } = this;
      this.updateComplete.then(() => {
        if (activation === this.activation) this.startSlides();
      });
    } else {
      this.media = { kind: 'zoom' };
      this.ready = true;
    }
  }

  private startSlides(): void {
    window.clearInterval(this.slideTimer);
    this.slideTimer = window.setInterval(() => {
      const loaded = this.loadedSlides();
      if (loaded.length < 2) return;
      let next = this.slide;
      do {
        next = (next + 1) % this.slideUrls.length;
      } while (!loaded.includes(next));
      this.slide = next;
    }, SLIDE_INTERVAL_MS);
  }

  private loadedSlides(): number[] {
    const imgs = [...(this.shadowRoot?.querySelectorAll('.slides img') ?? [])];
    return imgs.flatMap((img, i) =>
      (img as HTMLImageElement).complete &&
      (img as HTMLImageElement).naturalWidth
        ? [i]
        : [],
    );
  }

  private onSlideError(url: string): void {
    this.slideUrls = this.slideUrls.filter(u => u !== url);
    this.slide = 0;
    if (this.slideUrls.length < 2) {
      window.clearInterval(this.slideTimer);
      this.media = { kind: 'zoom' };
      this.ready = true;
    }
  }

  private onSlideLoad(): void {
    this.ready = true;
  }

  private onVideoPlaying(): void {
    window.clearTimeout(this.frameTimer);
    this.ready = true;
  }

  /** Loops the clip within its start-to-start+clip-length window. */
  private onVideoTimeUpdate(): void {
    const video = this.video;
    if (
      this.media?.kind === 'video' &&
      video &&
      video.currentTime >= this.media.start + PREVIEW_CLIP_SECONDS
    ) {
      video.currentTime = this.media.start;
    }
  }

  private async onVideoLoaded(): Promise<void> {
    const { video, activation } = this;
    if (video && !(await this.playMedia(video, activation))) {
      this.useFallbackFrames();
    }
  }

  private async playSnippet(): Promise<void> {
    if (this.audio) await this.playMedia(this.audio, this.activation);
  }

  render() {
    if (!this.active || !this.media) return nothing;
    return html`<div
      class="layer ${this.media.kind} ${this.ready ? 'ready' : ''}"
      aria-hidden="true"
    >
      ${this.mediaTemplate(this.media)} ${this.soundBadgeTemplate}
    </div>`;
  }

  /** A muted-speaker hint, so people know a clip or snippet could have sound. */
  private get soundBadgeTemplate() {
    const kind = this.media?.kind;
    if ((kind !== 'video' && kind !== 'audio') || this.audible) return nothing;
    return html`<span class="badge" title=${msg('Sound is off')}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4-2.7-2.7z"
        />
      </svg>
    </span>`;
  }

  private mediaTemplate(media: TilePreviewMedia) {
    switch (media.kind) {
      case 'video':
        return html`<video
          muted
          loop
          playsinline
          preload="auto"
          src="${media.src}#t=${media.start}"
          @loadeddata=${this.onVideoLoaded}
          @error=${this.useFallbackFrames}
          @playing=${this.onVideoPlaying}
          @timeupdate=${this.onVideoTimeUpdate}
        ></video>`;
      case 'slides':
        return html`<div class="slides ${media.fit}">
          ${this.slideUrls.map(
            (url, i) =>
              html`<img
                src=${url}
                alt=""
                class=${i === this.slide ? 'on' : ''}
                @load=${this.onSlideLoad}
                @error=${() => this.onSlideError(url)}
              />`,
          )}
        </div>`;
      case 'audio':
        return html`
          ${media.waveform
            ? html`<img class="waveform" src=${media.waveform} alt="" />`
            : html`<div class="bars">
                ${Array.from(
                  { length: 12 },
                  (_, i) =>
                    html`<span style="animation-delay:${i * -97}ms"></span>`,
                )}
              </div>`}
          <div class="playhead"></div>
          ${this.options.sound
            ? html`<audio
                preload="auto"
                src="${media.src}#t=${media.start}"
              ></audio>`
            : nothing}
        `;
      default:
        return html`<img
          class="pan"
          src=${ifDefined(this.thumbnailUrl)}
          alt=""
        />`;
    }
  }

  static styles = css`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
      overflow: hidden;
      border-radius: inherit;
    }

    .layer {
      position: absolute;
      inset: 0;
      opacity: 0;
      transition: opacity 200ms ease-out;
    }

    .layer.ready {
      opacity: 1;
    }

    video,
    .slides img {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .slides {
      position: absolute;
      inset: 0;
      background: #fff;
    }

    .slides.contain img {
      object-fit: contain;
    }

    .slides img {
      opacity: 0;
    }

    .slides img.on {
      opacity: 1;
    }

    .audio {
      background: #10161b;
    }

    .waveform {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: fill;
      filter: invert(1) hue-rotate(180deg);
      opacity: 0.85;
    }

    .badge {
      position: absolute;
      left: 6px;
      bottom: 6px;
      display: flex;
      padding: 3px;
      border-radius: 4px;
      color: #fff;
      background: rgb(0 0 0 / 0.65);
    }

    .playhead {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #f0a500;
      box-shadow: 0 0 8px #f0a500;
      animation: scan 2.4s linear infinite;
    }

    .bars {
      position: absolute;
      inset: 20% 10%;
      display: flex;
      gap: 4px;
      align-items: end;
    }

    .bars span {
      flex: 1;
      height: 30%;
      background: #5bb8e0;
      animation: bounce 700ms ease-in-out infinite alternate;
    }

    .pan {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: contain;
      animation: pan 6s ease-in-out infinite alternate;
    }

    @keyframes pan {
      from {
        transform: scale(1) translate(0, 0);
      }
      to {
        transform: scale(1.3) translate(-5%, -4%);
      }
    }

    @keyframes scan {
      from {
        left: 0;
      }
      to {
        left: 100%;
      }
    }

    @keyframes bounce {
      to {
        height: 95%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .layer {
        transition: none;
      }

      .playhead,
      .pan,
      .bars span {
        animation: none;
      }
    }
  `;
}
