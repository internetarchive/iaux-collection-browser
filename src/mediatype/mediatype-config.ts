import { accountIcon } from '../assets/img/icons/mediatype/account';
import { audioIcon } from '../assets/img/icons/mediatype/audio';
import { collectionIcon } from '../assets/img/icons/mediatype/collection';
import { dataIcon } from '../assets/img/icons/mediatype/data';
import { etreeIcon } from '../assets/img/icons/mediatype/etree';
import { imagesIcon } from '../assets/img/icons/mediatype/images';
import { filmIcon } from '../assets/img/icons/mediatype/film';
import { radioIcon } from '../assets/img/icons/mediatype/radio';
import { softwareIcon } from '../assets/img/icons/mediatype/software';
import { textsIcon } from '../assets/img/icons/mediatype/texts';
import { tvIcon } from '../assets/img/icons/mediatype/tv';
import { tvCommercialIcon } from '../assets/img/icons/mediatype/tv-commercial';
import { tvFactCheckIcon } from '../assets/img/icons/mediatype/tv-fact-check';
import { tvQuoteIcon } from '../assets/img/icons/mediatype/tv-quote';
import { videoIcon } from '../assets/img/icons/mediatype/video';
import { webIcon } from '../assets/img/icons/mediatype/web';

export const mediatypeConfig: { [key: string]: any } = {
  account: {
    color: '#000000',
    icon: accountIcon,
    text: 'Account',
  },
  audio: {
    color: '#00adef',
    icon: audioIcon,
    text: 'Audio',
  },
  collection: {
    color: '#4666ff',
    icon: collectionIcon,
    text: 'Collection',
  },
  data: {
    color: '#333333',
    icon: dataIcon,
    text: 'Data',
  },
  etree: {
    color: '#00adef',
    icon: etreeIcon,
    text: 'E-tree',
  },
  film: {
    color: '#bf1b2c',
    icon: filmIcon,
    text: 'Film',
  },
  image: {
    color: '#aa99c9',
    icon: imagesIcon,
    text: 'Image',
  },
  movies: {
    color: '#f1644b',
    icon: filmIcon,
    text: 'Movie',
  },
  radio: {
    color: '#8fdaef',
    icon: radioIcon,
    text: 'Radio',
  },
  software: {
    color: '#9ecc4f',
    icon: softwareIcon,
    text: 'Software',
  },
  texts: {
    color: '#faab3c',
    icon: textsIcon,
    text: 'Text',
  },
  tv: {
    color: '#f1644b',
    icon: tvIcon,
    text: 'TV',
  },
  tvCaption: {
    color: '#f1644b',
    icon: tvIcon,
    text: 'TV Caption',
  },
  tvCommercial: {
    color: '#84B648',
    icon: tvCommercialIcon,
    text: 'TV Commercial',
  },
  tvFactCheck: {
    color: '#f1644b',
    icon: tvFactCheckIcon,
    text: 'TV Fact-check',
  },
  tvQuote: {
    color: '#fe7a5f',
    icon: tvQuoteIcon,
    text: 'TV Quote',
  },
  video: {
    color: '#f1644b',
    icon: videoIcon,
    text: 'Video',
  },
  web: {
    color: '#ffcd27',
    icon: webIcon,
    text: 'Web',
  },
};
