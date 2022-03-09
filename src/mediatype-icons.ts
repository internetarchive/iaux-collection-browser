import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { audioIcon } from './assets/img/icons/mediatype/audio';
import { etreeIcon } from './assets/img/icons/mediatype/etree';
import { imagesIcon } from './assets/img/icons/mediatype/images';
import { filmIcon } from './assets/img/icons/mediatype/film';
import { softwareIcon } from './assets/img/icons/mediatype/software';
import { textsIcon } from './assets/img/icons/mediatype/texts';
import { tvIcon } from './assets/img/icons/mediatype/tv';
import { videoIcon } from './assets/img/icons/mediatype/video';
import { webIcon } from './assets/img/icons/mediatype/web';

@customElement('mediatype-icons')
export class MediaTypeIcons extends LitElement {
  @property({ type: String }) mediatype = '';

  get mediaTypeIcon() {
    const mediaTypeIcons: { [key: string]: any } = {
      audio: audioIcon,
      data: etreeIcon,
      etree: etreeIcon,
      film: filmIcon,
      image: imagesIcon,
      movies: filmIcon,
      software: softwareIcon,
      texts: textsIcon,
      tv: tvIcon,
      video: videoIcon,
      web: webIcon,
    };

    return html`${mediaTypeIcons[this.mediatype]}`;
  }

  render() {
    return html`${this.mediaTypeIcon}`;
  }
}
