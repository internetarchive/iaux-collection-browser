// short (marc) and long versions of language names
// if a 'language' metadata element matches either version,
// the long form will be displayed on the details
// page, linked to a search engine query on an OR of both forms
// (if no match is found, the metadata value itself is displayed,
// linked to a query on just that value)

export const codeToLanguageMap: Record<string, string> = {
  aar: 'Afar',
  abk: 'Abkhaz',
  adl: 'Galo', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  ady: 'Adyghe',
  afr: 'Afrikaans',
  aka: 'Akan',
  akk: 'Akkadian',
  alb: 'Albanian',
  ale: 'Aleut',
  alg: 'Algonquian',
  amh: 'Amharic',
  ang: 'Old English',
  anm: 'Anal', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  anq: 'Jarawa', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  apa: 'Apache languages',
  apt: 'Apatani', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  ara: 'Arabic',
  arc: 'Aramaic',
  arg: 'Aragonese',
  arm: 'Armenian',
  arp: 'Arapaho',
  asm: 'Assamese',
  ath: 'Athapascan (Other)',
  awa: 'Awadhi',
  aym: 'Aymara',
  aze: 'Azerbaijani',
  bak: 'Bashkir',
  bal: 'Baluchi',
  ban: 'Balinese',
  baq: 'Basque',
  bel: 'Belarusian',
  bem: 'Bemba',
  ben: 'Bengali',
  ber: 'Berber',
  bft: 'Balti', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bfy: 'Bagheli', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bgw: 'Bhatri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bhb: 'Bhili', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bho: 'Bhojpuri',
  bih: 'Bihari',
  bis: 'Bislama',
  bkk: 'Brokskat', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bla: 'Blackfoot',
  bns: 'Bundeli', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bnt: 'Bantu',
  bos: 'Bosnian',
  bre: 'Breton',
  brx: 'Bodo', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  bua: 'Buryat',
  bul: 'Bulgarian',
  bur: 'Burmese',
  cai: 'Central American Indian',
  caq: 'Car', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  car: 'Carib',
  cat: 'Catalan',
  cau: 'Caucasian',
  ceb: 'Cebuano',
  cha: 'Chamorro',
  che: 'Chechen',
  chi: 'Chinese',
  chm: 'Mari',
  chn: 'Chinook jargon',
  cho: 'Choctaw',
  chp: 'Chipewyan',
  chr: 'Cherokee',
  chu: 'Church Slavic',
  chv: 'Chuvash',
  chy: 'Cheyenne',
  clk: 'Idu-Mishmi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  cop: 'Coptic',
  cor: 'Cornish',
  cos: 'Corsican',
  cpe: 'Creoles and Pidgins, English-based',
  cpf: 'Creoles and Pidgins, French-based',
  cpp: 'Creoles and Pidgins, Portuguese-based',
  cre: 'Cree',
  crh: 'Crimean Tatar',
  crp: 'Creoles and Pidgins',
  csb: 'Kashubian',
  cze: 'Czech',
  dak: 'Dakota',
  dan: 'Danish',
  dar: 'Dargwa',
  del: 'Delaware',
  dgo: 'Dogri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  dih: 'Dhivehi',
  doi: 'Dogri (Generic)',
  dra: 'Dravidian (Other)',
  dsb: 'Lower Sorbian',
  dum: 'Middle Dutch',
  dut: 'Dutch',
  dzo: 'Dzongkha',
  eng: 'English',
  enm: 'Middle English',
  epo: 'Esperanto',
  esk: 'Eskimo',
  esp: 'Esperanto',
  est: 'Estonian',
  eth: 'Ethiopic',
  fao: 'Faroese',
  far: 'Faroese',
  fij: 'Fijian',
  fil: 'Filipino',
  fin: 'Finnish',
  fre: 'French',
  fri: 'Frisian',
  frm: 'Middle French',
  fro: 'Old French',
  frr: 'North Frisian',
  fry: 'Frisian',
  fur: 'Friulian',
  gaa: 'Gã',
  gac: 'Mixed Great Andamanese', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  gae: 'Scottish Gaelic',
  gag: 'Galician',
  gbl: 'Gamit', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  gem: 'Germanic',
  geo: 'Georgian',
  ger: 'German',
  gez: 'Ethiopic',
  gil: 'Gilbertese',
  gju: 'Gujari', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  gla: 'Scottish Gaelic',
  gle: 'Irish',
  glg: 'Galician',
  glv: 'Manx',
  gmh: 'Middle High German',
  goh: 'Old German',
  gon: 'Gondi',
  got: 'Gothic',
  grb: 'Grebo',
  grc: 'Ancient Greek',
  gre: 'Greek',
  grn: 'Guarani',
  grt: 'Garo', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  gsw: 'Swiss German',
  gua: 'Guarani',
  guj: 'Gujarati',
  gwi: 'Gwichin',
  hai: 'Haida',
  hat: 'Haitian French Creole',
  hau: 'Hausa',
  haw: 'Hawaiian',
  heb: 'Hebrew',
  hin: 'Hindi',
  hlb: 'Halbi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  hmn: 'Hmong',
  hmr: 'Hmar', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  hne: 'Chhattisgarhi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  hoc: 'Ho', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  hsb: 'Upper Sorbian',
  hun: 'Hungarian',
  ibo: 'Igbo',
  ice: 'Icelandic',
  ido: 'Ido',
  iku: 'Inuktitut',
  ile: 'Interlingue',
  ilo: 'Iloko',
  ina: 'Interlingua',
  inc: 'Indic (Other)',
  ind: 'Indonesian',
  inh: 'Ingush',
  int: 'Interlingua',
  ipk: 'Inupiaq',
  ira: 'Iranian',
  iri: 'Irish',
  iro: 'Iroquoian',
  iru: 'Irula', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  ita: 'Italian',
  jav: 'Javanese',
  jpn: 'Japanese',
  jrb: 'Judeo-Arabic',
  kaa: 'Karakalpak',
  kal: 'Kalatdlisut',
  kan: 'Kannada',
  kar: 'Karen',
  kas: 'Kashmiri',
  kaz: 'Kazakh',
  kbd: 'Kabardian',
  kfa: 'Kodava', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kfb: 'Northwestern Kolami', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kfe: 'Kota (India)', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kff: 'Koya', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kfq: 'Korku', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kha: 'Khasi',
  khm: 'Khmer',
  kho: 'Khotanese',
  khr: 'Kharia', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kik: 'Kikuyu',
  kin: 'Kinyarwanda',
  kir: 'Kyrgyz',
  kix: 'Khiamniungan Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kmj: 'Kumarbhag Paharia', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kmm: 'Kom (India)', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kok: 'Konkani',
  kon: 'Kongo',
  kor: 'Korean',
  kpe: 'Kpelle',
  krc: 'Karachay-Balkar',
  kro: 'Kru',
  kru: 'Kurukh',
  kum: 'Kumyk',
  kur: 'Kurdish',
  kxu: 'Kui (India)', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kxv: 'Kuvi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  kyw: 'Kudmali', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  lad: 'Ladino',
  lah: 'Lahnda',
  lao: 'Lao',
  lap: 'Sami',
  lat: 'Latin',
  lav: 'Latvian',
  lbj: 'Ladakhi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  lep: 'Lepcha', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  lez: 'Lezgin',
  lim: 'Limburgish',
  lin: 'Lingala',
  lit: 'Lithuanian',
  lmn: 'Lambadi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  lol: 'Mongo-Nkundu',
  ltz: 'Luxembourgish',
  lua: 'Luba-Lulua',
  lub: 'Luba-Katanga',
  lug: 'Ganda',
  lus: 'Lushai',
  mac: 'Macedonian',
  mah: 'Marshallese',
  mai: 'Maithili',
  mal: 'Malayalam',
  mao: 'Maori',
  map: 'Austronesian',
  mar: 'Marathi',
  max: 'Manx',
  may: 'Malay',
  mga: 'Middle Irish',
  mha: 'Manda (India)', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  mic: 'Micmac',
  min: 'Minankabaw',
  mis: 'Miscellaneous languages',
  mjw: 'Karbi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  mkh: 'Mon-Khmer',
  mla: 'Malagasy',
  mlg: 'Malagasy',
  mlt: 'Maltese',
  mni: 'Manipuri',
  moh: 'Mohawk',
  mol: 'Moldavian',
  mon: 'Mongolian',
  mrg: 'Mising', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  mul: 'Multiple',
  mus: 'Creek',
  myn: 'Maya',
  nag: 'Naga Pigdin', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nah: 'Nahuatl',
  nai: 'North American Indian',
  nap: 'Neapolitan',
  nau: 'Nauru',
  nav: 'Navajo',
  nbc: 'Chang Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nbe: 'Konyak Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nbi: 'Mao Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nbl: 'Ndebele',
  nbu: 'Rongmei Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nds: 'Low German',
  nep: 'Nepali',
  new: 'Newari',
  nic: 'Niger-Kordofanian',
  njh: 'Lotha Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  njm: 'Angami Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  njn: 'Liangmai Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  njo: 'Ao Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nkf: 'Inpui Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nkh: 'Khezha Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nll: 'Nihali', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nma: 'Maram Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nmf: 'Tangkhul Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nno: 'Norwegian (Nynorsk)',
  nob: 'Norwegian (Bokmål)',
  nog: 'Nogay',
  non: 'Old Norse',
  nor: 'Norwegian',
  nri: 'Chokri Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nsa: 'Sangtam Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nsm: 'Sumi Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  nso: 'Northern Sotho',
  nya: 'Nyanja',
  nzm: 'Zeme Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  oci: 'Occitan',
  oji: 'Ojibwa',
  oon: 'Önge', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  ori: 'Oriya',
  orm: 'Oromo',
  ory: 'Odia', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  oss: 'Ossetic',
  ota: 'Ottoman Turkish',
  oto: 'Otomian',
  paa: 'Papuan',
  pag: 'Pangasinan',
  pal: 'Pahlavi',
  pam: 'Pampanga',
  pan: 'Panjabi',
  pap: 'Papiamento',
  pbv: 'Pnar', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  pci: 'Duruwa', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  pck: 'Paite Chin', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  per: 'Persian',
  phi: 'Philippine',
  pli: 'Pali',
  pol: 'Polish',
  por: 'Portuguese',
  pra: 'Prakrit',
  pro: 'Provencal',
  prx: 'Purik', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  pus: 'Pashto',
  que: 'Quechua',
  rah: 'Rabha', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  raj: 'Rajasthani',
  roa: 'Romance',
  roh: 'Romansh',
  rom: 'Romani',
  rum: 'Romanian',
  run: 'Rundi',
  rus: 'Russian',
  sag: 'Sango',
  sah: 'Yakut',
  sai: 'South American Indian',
  sam: 'Samaritan Aramaic',
  san: 'Sanskrit',
  sao: 'Samoan',
  sat: 'Santali',
  scc: 'Serbian',
  scl: 'Shina', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  sco: 'Scots',
  scr: 'Croatian',
  sdr: 'Oraon Sadri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  sel: 'Selkup',
  sem: 'Semitic',
  sga: 'Old Irish',
  sho: 'Shona',
  sin: 'Sinhalese',
  sio: 'Siouan',
  sip: 'Sikkimese', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  sit: 'Sino-Tibetan',
  sla: 'Slavic',
  slo: 'Slovak',
  slv: 'Slovenian',
  smi: 'Sami',
  smo: 'Samoan',
  sms: 'Skolt Sami',
  sna: 'Shona',
  snd: 'Sindhi',
  snh: 'Sinhalese',
  som: 'Somali',
  sot: 'Sotho',
  spa: 'Spanish',
  spv: 'Sambalpuri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  srb: 'Sora', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  sso: 'Sotho',
  ssw: 'Swazi',
  sun: 'Sundanese',
  sux: 'Sumerian',
  swa: 'Swahili',
  swe: 'Swedish',
  swz: 'Swazi',
  syc: 'Syriac',
  syr: 'Modern Syriac',
  tag: 'Tagalog',
  tah: 'Tahitian',
  taj: 'Tajik',
  tam: 'Tamil',
  tar: 'Tatar',
  tat: 'Tatar',
  tcy: 'Tulu', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  tcz: 'Thado Chin', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  tgk: 'Tajik',
  tel: 'Telugu',
  tem: 'Temne',
  tgl: 'Tagalog',
  tha: 'Thai',
  tib: 'Tibetan',
  tig: 'Tigre',
  tir: 'Tigrinya',
  tlh: 'Klingon',
  tog: 'Tonga',
  ton: 'Tongan',
  tpi: 'Tok Pisin',
  trp: 'Kok Borok', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  tsi: 'Tsimshian',
  tsn: 'Tswana',
  tso: 'Tsonga',
  tsw: 'Tswana',
  tuk: 'Turkmen',
  tur: 'Turkish',
  tut: 'Altaic',
  tyv: 'Tuvinian',
  udm: 'Udmurt',
  uig: 'Uighur',
  ukr: 'Ukrainian',
  unr: 'Mundari', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  urd: 'Urdu',
  uzb: 'Uzbek',
  vah: 'Varhadi-Nagpuri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  vap: 'Vaiphei', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  vav: 'Varli', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  ven: 'Venda',
  vie: 'Vietnamese',
  vol: 'Volapük',
  war: 'Waray',
  wbr: 'Wagdi', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  wel: 'Welsh',
  wen: 'Sorbian',
  wol: 'Wolof',
  xal: 'Oirat',
  xho: 'Xhosa',
  xis: 'Kisan (Dravidian)', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  xnr: 'Kangri', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  xsr: 'Solu-Khumbu Sherpa', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  yea: 'Ravula', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  yid: 'Yiddish',
  yim: 'Yimchungru Naga', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  yor: 'Yoruba',
  ypk: 'Yupik languages',
  zap: 'Zapotec',
  zha: 'Zhuang',
  zom: 'Zou', // *not* in MARC or ISO 639-2 lists, but in our corpus and ISO 639-3
  zul: 'Zulu',
  zun: 'Zuni',
  zxx: 'No linguistic content',
};

const swapKeyValues = <S extends string, T extends Record<string, S>>(
  obj: T
) => {
  const res = {} as any; // I'm not worried about impl safety
  Object.entries(obj).forEach(([key, value]) => {
    res[value] = key;
  });
  return res as { [K in keyof T as T[K]]: K };
};

export const languageToCodeMap: Record<string, string> =
  swapKeyValues(codeToLanguageMap);
