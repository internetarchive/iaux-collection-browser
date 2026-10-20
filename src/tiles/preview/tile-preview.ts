import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property, query, state } from 'lit/decorators.js';
import {
  PREVIEW_CLIP_SECONDS,
  resolvePreviewMedia,
  type TilePreviewMedia,
  type TilePreviewOptions,
} from './tile-preview-media';

const SLIDE_INTERVAL_MS = 700;

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

  @query('video') private video?: HTMLVideoElement;

  @query('audio') private audio?: HTMLAudioElement;

  private slideTimer?: number;

  /** Bumped on every activation so a slow resolve can't show a stale preview. */
  private activation = 0;

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('active') || changed.has('identifier')) {
      if (this.active) this.start();
      else this.stop();
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
  }

  private stop(): void {
    this.activation += 1;
    window.clearInterval(this.slideTimer);
    this.releaseMedia(this.video);
    this.releaseMedia(this.audio);
    this.media = undefined;
    this.slideUrls = [];
    this.ready = false;
  }

  /** Pauses and drops the source so the browser stops downloading it. */
  private releaseMedia(el?: HTMLMediaElement): void {
    if (!el) return;
    el.pause();
    el.removeAttribute('src');
    el.load();
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

  private onVideoLoaded(): void {
    this.video?.play().catch(() => {
      // Autoplay refused: leave the thumbnail showing.
      this.media = { kind: 'zoom' };
      this.ready = true;
    });
  }

  private playSnippet(): void {
    this.audio?.play().catch(() => {
      // Sound needs a user gesture on some browsers; the waveform still shows.
    });
  }

  render() {
    if (!this.active || !this.media) return nothing;
    return html`<div
      class="layer ${this.media.kind} ${this.ready ? 'ready' : ''}"
      aria-hidden="true"
    >
      ${this.mediaTemplate(this.media)}
    </div>`;
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
