var $d=Object.defineProperty,_d=Object.defineProperties;var Sd=Object.getOwnPropertyDescriptors;var Ms=Object.getOwnPropertySymbols;var xd=Object.prototype.hasOwnProperty,Cd=Object.prototype.propertyIsEnumerable;var As=(a,e,t)=>e in a?$d(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,j=(a,e)=>{for(var t in e||(e={}))xd.call(e,t)&&As(a,t,e[t]);if(Ms)for(var t of Ms(e))Cd.call(e,t)&&As(a,t,e[t]);return a},ae=(a,e)=>_d(a,Sd(e));const kd=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};kd();function n(a,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(s=a[l])&&(r=(o<3?s(r):o>3?s(e,t,r):s(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}function Td(a,e,t,i){function o(r){return r instanceof t?r:new t(function(s){s(r)})}return new(t||(t=Promise))(function(r,s){function l(p){try{c(i.next(p))}catch(v){s(v)}}function d(p){try{c(i.throw(p))}catch(v){s(v)}}function c(p){p.done?r(p.value):o(p.value).then(l,d)}c((i=i.apply(a,e||[])).next())})}class Ed{constructor(e){var t,i,o,r;this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://analytics.archive.org/0.gif",this.defaultService=(t=e==null?void 0:e.defaultService)!==null&&t!==void 0?t:this.DEFAULT_SERVICE,this.imageUrl=(i=e==null?void 0:e.imageUrl)!==null&&i!==void 0?i:this.DEFAULT_IMAGE_URL,this.imageContainer=(o=e==null?void 0:e.imageContainer)!==null&&o!==void 0?o:document.body,this.requireImagePing=(r=e==null?void 0:e.requireImagePing)!==null&&r!==void 0?r:!1}sendPing(e){const t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}const i=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{i(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){const t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,i=j({kind:"event",ec:e.category,ea:e.action,el:t,cache_bust:Math.random()},e.eventConfiguration);this.sendPing(i)}sendEventNoSampling(e){const t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;const i=e;i.eventConfiguration=t,this.sendEvent(i)}sendPingViaImage(e){const t=new Image(1,1);t.src=e,t.alt="",this.imageContainer.appendChild(t)}generateTrackingUrl(e){var t;const i=e!=null?e:{};i.service=(t=i.service)!==null&&t!==void 0?t:this.defaultService;const o=new URL(this.imageUrl),r=Object.keys(i);return r.forEach(s=>{const l=i[s];o.searchParams.append(s,l)}),o.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),o.searchParams.append("count",`${r.length+2}`),o}}function y(a){let e,t,i;return typeof a=="object"?(e=a.hashFunction,t=a.expiring,i=a.tags):e=a,(o,r,s)=>{if(s.value!=null)s.value=zs(s.value,e,t,i);else if(s.get!=null)s.get=zs(s.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const va=new Map;function zs(a,e,t=0,i){const o=Symbol("__memoized_map__");return function(...r){let s;this.hasOwnProperty(o)||Object.defineProperty(this,o,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[o];if(Array.isArray(i))for(const d of i)va.has(d)?va.get(d).push(l):va.set(d,[l]);if(e||r.length>0||t>0){let d;e===!0?d=r.map(v=>v.toString()).join("!"):e?d=e.apply(this,r):d=r[0];const c=`${d}__timestamp`;let p=!1;if(t>0)if(!l.has(c))p=!0;else{let v=l.get(c);p=Date.now()-v>t}l.has(d)&&!p?s=l.get(d):(s=a.apply(this,r),l.set(d,s),t>0&&l.set(c,Date.now()))}else{const d=this;l.has(d)?s=l.get(d):(s=a.apply(this,r),l.set(d,s))}return s}}class tr{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:Boolean(e)}}tr.shared=new tr;class ko{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ko.shared=new ko;class ir{parseValue(e){return ko.shared.parseValue(e)}}ir.shared=new ir;class or{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let o=new Date(t);return(t.indexOf("Z")>-1||t.indexOf("+")>-1||t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)||t.match(/^.*?-[0-9]{2}:[0-9]{2}$/)||t.match(/^.*?-[0-9]{4}$/))&&(o=new Date(o.getTime()+o.getTimezoneOffset()*1e3*60)),o}}or.shared=new or;class ar{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((o,r)=>{const s=parseFloat(o);if(Number.isNaN(s))return t=!0,0;const l=e.length-1-r,d=60**l;return s*Math.floor(d)}).reduce((o,r)=>o+r,0);return t?void 0:i}}ar.shared=new ar;class rr{parseValue(e){if(typeof e=="string")return e}}rr.shared=new rr;class Md{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const o of this.separators)if(i=t.split(o),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(r=>r.trim()).map(r=>this.parser.parseValue(r)),o=[];return i.forEach(r=>{r!==void 0&&o.push(r)}),o}}class sr{parseValue(e){if(typeof e=="string")return e}}sr.shared=new sr;class To{parseValue(e){return String(e)}}To.shared=new To;class je{constructor(e,t){this.parser=e,this.rawValue=t}get values(){return this.parseRawValue()}get value(){return this.values[0]}parseRawValue(){if(this.rawValue===void 0)return[];const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const o=this.parser.parseValue(i);Array.isArray(o)?t.push(...o):o!==void 0&&t.push(o)}),t}}n([y()],je.prototype,"values",null);n([y()],je.prototype,"value",null);class At extends je{constructor(e){super(tr.shared,e)}}class Q extends je{constructor(e){super(or.shared,e)}}class fa extends je{constructor(e){super(ar.shared,e)}}class N extends je{constructor(e){super(ko.shared,e)}}class C extends je{constructor(e){super(To.shared,e)}}class Ad extends je{constructor(e){super(sr.shared,e)}}class Eo extends je{constructor(e){super(ir.shared,e)}}class oo extends je{constructor(e){super(rr.shared,e)}}class zd extends je{constructor(e,t){super(t,e)}}class Pd extends zd{constructor(e){const t=new Md(To.shared);super(e,t)}}class M{constructor(e){this.rawMetadata=e}get identifier(){var e;return(e=this.rawMetadata)===null||e===void 0?void 0:e.identifier}get addeddate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.addeddate?new Q(this.rawMetadata.addeddate):void 0}get audio_codec(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_codec?new C(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_sample_rate?new N(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.avg_rating?new N(this.rawMetadata.avg_rating):void 0}get collection(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection?new C(this.rawMetadata.collection):void 0}get collections_raw(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collections_raw?new C(this.rawMetadata.collections_raw):void 0}get collection_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection_size?new Eo(this.rawMetadata.collection_size):void 0}get contributor(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.contributor?new C(this.rawMetadata.contributor):void 0}get coverage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.coverage?new C(this.rawMetadata.coverage):void 0}get creator(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.creator?new C(this.rawMetadata.creator):void 0}get date(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.date?new Q(this.rawMetadata.date):void 0}get description(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.description?new C(this.rawMetadata.description):void 0}get downloads(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.downloads?new N(this.rawMetadata.downloads):void 0}get duration(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.duration?new fa(this.rawMetadata.duration):void 0}get"external-identifier"(){var e,t;return!((e=this.rawMetadata)===null||e===void 0)&&e["external-identifier"]?new C((t=this.rawMetadata)===null||t===void 0?void 0:t["external-identifier"]):void 0}get files_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.files_count?new N(this.rawMetadata.files_count):void 0}get indexdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.indexdate?new Q(this.rawMetadata.indexdate):void 0}get isbn(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.isbn?new C(this.rawMetadata.isbn):void 0}get issue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.issue?new C(this.rawMetadata.issue):void 0}get item_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_count?new N(this.rawMetadata.item_count):void 0}get item_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_size?new Eo(this.rawMetadata.item_size):void 0}get language(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.language?new C(this.rawMetadata.language):void 0}get length(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.length?new fa(this.rawMetadata.length):void 0}get lineage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.lineage?new C(this.rawMetadata.lineage):void 0}get month(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.month?new N(this.rawMetadata.month):void 0}get mediatype(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.mediatype?new oo(this.rawMetadata.mediatype):void 0}get noindex(){var e;return((e=this.rawMetadata)===null||e===void 0?void 0:e.noindex)!=null?new At(this.rawMetadata.noindex):void 0}get notes(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.notes?new C(this.rawMetadata.notes):void 0}get num_favorites(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_favorites?new N(this.rawMetadata.num_favorites):void 0}get num_reviews(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_reviews?new N(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_edition?new C(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_work?new C(this.rawMetadata.openlibrary_work):void 0}get page_progression(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.page_progression?new Ad(this.rawMetadata.page_progression):void 0}get partner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.partner?new C(this.rawMetadata.partner):void 0}get ppi(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.ppi?new N(this.rawMetadata.ppi):void 0}get publicdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publicdate?new Q(this.rawMetadata.publicdate):void 0}get publisher(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publisher?new C(this.rawMetadata.publisher):void 0}get reviewdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.reviewdate?new Q(this.rawMetadata.reviewdate):void 0}get runtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.runtime?new fa(this.rawMetadata.runtime):void 0}get scanner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.scanner?new C(this.rawMetadata.scanner):void 0}get source(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.source?new C(this.rawMetadata.source):void 0}get start_localtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_localtime?new Q(this.rawMetadata.start_localtime):void 0}get start_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_time?new Q(this.rawMetadata.start_time):void 0}get stop_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.stop_time?new Q(this.rawMetadata.stop_time):void 0}get subject(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.subject?new Pd(this.rawMetadata.subject):void 0}get taper(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.taper?new C(this.rawMetadata.taper):void 0}get title(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.title?new C(this.rawMetadata.title):void 0}get transferer(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.transferer?new C(this.rawMetadata.transferer):void 0}get track(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.track?new N(this.rawMetadata.track):void 0}get type(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.type?new C(this.rawMetadata.type):void 0}get uploader(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.uploader?new C(this.rawMetadata.uploader):void 0}get utc_offset(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.utc_offset?new N(this.rawMetadata.utc_offset):void 0}get venue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.venue?new C(this.rawMetadata.venue):void 0}get volume(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.volume?new C(this.rawMetadata.volume):void 0}get week(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.week?new N(this.rawMetadata.week):void 0}get year(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.year?new Q(this.rawMetadata.year):void 0}get query(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.query?new C(this.rawMetadata.fields.query):void 0}get date_favorited(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date_favorited?new Q(this.rawMetadata.fields.date_favorited):void 0}get __href__(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new C(this.rawMetadata.fields.__href__):void 0}}n([y()],M.prototype,"addeddate",null);n([y()],M.prototype,"audio_codec",null);n([y()],M.prototype,"audio_sample_rate",null);n([y()],M.prototype,"avg_rating",null);n([y()],M.prototype,"collection",null);n([y()],M.prototype,"collections_raw",null);n([y()],M.prototype,"collection_size",null);n([y()],M.prototype,"contributor",null);n([y()],M.prototype,"coverage",null);n([y()],M.prototype,"creator",null);n([y()],M.prototype,"date",null);n([y()],M.prototype,"description",null);n([y()],M.prototype,"downloads",null);n([y()],M.prototype,"duration",null);n([y()],M.prototype,"external-identifier",null);n([y()],M.prototype,"files_count",null);n([y()],M.prototype,"indexdate",null);n([y()],M.prototype,"isbn",null);n([y()],M.prototype,"issue",null);n([y()],M.prototype,"item_count",null);n([y()],M.prototype,"item_size",null);n([y()],M.prototype,"language",null);n([y()],M.prototype,"length",null);n([y()],M.prototype,"lineage",null);n([y()],M.prototype,"month",null);n([y()],M.prototype,"mediatype",null);n([y()],M.prototype,"noindex",null);n([y()],M.prototype,"notes",null);n([y()],M.prototype,"num_favorites",null);n([y()],M.prototype,"num_reviews",null);n([y()],M.prototype,"openlibrary_edition",null);n([y()],M.prototype,"openlibrary_work",null);n([y()],M.prototype,"page_progression",null);n([y()],M.prototype,"partner",null);n([y()],M.prototype,"ppi",null);n([y()],M.prototype,"publicdate",null);n([y()],M.prototype,"publisher",null);n([y()],M.prototype,"reviewdate",null);n([y()],M.prototype,"runtime",null);n([y()],M.prototype,"scanner",null);n([y()],M.prototype,"source",null);n([y()],M.prototype,"start_localtime",null);n([y()],M.prototype,"start_time",null);n([y()],M.prototype,"stop_time",null);n([y()],M.prototype,"subject",null);n([y()],M.prototype,"taper",null);n([y()],M.prototype,"title",null);n([y()],M.prototype,"transferer",null);n([y()],M.prototype,"track",null);n([y()],M.prototype,"type",null);n([y()],M.prototype,"uploader",null);n([y()],M.prototype,"utc_offset",null);n([y()],M.prototype,"venue",null);n([y()],M.prototype,"volume",null);n([y()],M.prototype,"week",null);n([y()],M.prototype,"year",null);n([y()],M.prototype,"query",null);n([y()],M.prototype,"date_favorited",null);n([y()],M.prototype,"__href__",null);class I{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.identifier}get addeddate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.addeddate?new Q(this.rawMetadata.fields.addeddate):void 0}get avg_rating(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.avg_rating)!=null?new N(this.rawMetadata.fields.avg_rating):void 0}get collection(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.collection?new C(this.rawMetadata.fields.collection):void 0}get collection_files_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.collection_files_count)!=null?new N(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.collection_size)!=null?new Eo(this.rawMetadata.fields.collection_size):void 0}get creator(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.creator?new C(this.rawMetadata.fields.creator):void 0}get date(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date?new Q(this.rawMetadata.fields.date):void 0}get description(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.description?new C(this.rawMetadata.fields.description):void 0}get downloads(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.downloads)!=null?new N(this.rawMetadata.fields.downloads):void 0}get files_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.files_count)!=null?new N(this.rawMetadata.fields.files_count):void 0}get genre(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.genre?new C(this.rawMetadata.fields.genre):void 0}get indexflag(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.indexflag?new C(this.rawMetadata.fields.indexflag):void 0}get issue(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.issue?new C(this.rawMetadata.fields.issue):void 0}get item_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.item_count)!=null?new N(this.rawMetadata.fields.item_count):void 0}get item_size(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.item_size)!=null?new Eo(this.rawMetadata.fields.item_size):void 0}get language(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.language?new C(this.rawMetadata.fields.language):void 0}get lending___available_to_borrow(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_borrow)!=null?new At(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_browse)!=null?new At(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_waitlist)!=null?new At(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.lending___status?new C(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.licenseurl?new C(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.mediatype?new oo(this.rawMetadata.fields.mediatype):void 0}get month(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.month)!=null?new N(this.rawMetadata.fields.month):void 0}get noindex(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.noindex)!=null?new At(this.rawMetadata.fields.noindex):void 0}get num_favorites(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.num_favorites)!=null?new N(this.rawMetadata.fields.num_favorites):void 0}get num_reviews(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.num_reviews)!=null?new N(this.rawMetadata.fields.num_reviews):void 0}get publicdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.publicdate?new Q(this.rawMetadata.fields.publicdate):void 0}get reviewdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.reviewdate?new Q(this.rawMetadata.fields.reviewdate):void 0}get review(){var e;const t=(e=this.rawMetadata)===null||e===void 0?void 0:e.review;return t?{body:t.reviewbody,title:t.reviewtitle,author:t.reviewer,authorItem:t.reviewer_itemname,updatedate:new Date(t.reviewdate),createdate:new Date(t.createdate),stars:Number(t.stars)||0,__href__:t.__href__}:void 0}get source(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.source?new C(this.rawMetadata.fields.source):void 0}get subject(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.subject?new C(this.rawMetadata.fields.subject):void 0}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new C(this.rawMetadata.fields.title):void 0}get type(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.type?new C(this.rawMetadata.fields.type):void 0}get volume(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.volume?new C(this.rawMetadata.fields.volume):void 0}get week(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.week)!=null?new N(this.rawMetadata.fields.week):void 0}get year(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.year)!=null?new N(this.rawMetadata.fields.year):void 0}}n([y()],I.prototype,"addeddate",null);n([y()],I.prototype,"avg_rating",null);n([y()],I.prototype,"collection",null);n([y()],I.prototype,"collection_files_count",null);n([y()],I.prototype,"collection_size",null);n([y()],I.prototype,"creator",null);n([y()],I.prototype,"date",null);n([y()],I.prototype,"description",null);n([y()],I.prototype,"downloads",null);n([y()],I.prototype,"files_count",null);n([y()],I.prototype,"genre",null);n([y()],I.prototype,"indexflag",null);n([y()],I.prototype,"issue",null);n([y()],I.prototype,"item_count",null);n([y()],I.prototype,"item_size",null);n([y()],I.prototype,"language",null);n([y()],I.prototype,"lending___available_to_borrow",null);n([y()],I.prototype,"lending___available_to_browse",null);n([y()],I.prototype,"lending___available_to_waitlist",null);n([y()],I.prototype,"lending___status",null);n([y()],I.prototype,"licenseurl",null);n([y()],I.prototype,"mediatype",null);n([y()],I.prototype,"month",null);n([y()],I.prototype,"noindex",null);n([y()],I.prototype,"num_favorites",null);n([y()],I.prototype,"num_reviews",null);n([y()],I.prototype,"publicdate",null);n([y()],I.prototype,"reviewdate",null);n([y()],I.prototype,"review",null);n([y()],I.prototype,"source",null);n([y()],I.prototype,"subject",null);n([y()],I.prototype,"title",null);n([y()],I.prototype,"type",null);n([y()],I.prototype,"volume",null);n([y()],I.prototype,"week",null);n([y()],I.prototype,"year",null);class J{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.identifier}get highlight(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.highlight)===null||t===void 0)&&t.text?new C(this.rawMetadata.highlight.text):void 0}get addeddate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.addeddate?new Q(this.rawMetadata.fields.addeddate):void 0}get avg_rating(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.avg_rating)!=null?new N(this.rawMetadata.fields.avg_rating):void 0}get collection(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.collection?new C(this.rawMetadata.fields.collection):void 0}get created_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.created_on?new Q(this.rawMetadata.fields.created_on):void 0}get creator(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.creator?new C(this.rawMetadata.fields.creator):void 0}get date(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date?new Q(this.rawMetadata.fields.date):void 0}get description(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.description?new C(this.rawMetadata.fields.description):void 0}get downloads(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.downloads)!=null?new N(this.rawMetadata.fields.downloads):void 0}get filename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.filename?new C(this.rawMetadata.fields.filename):void 0}get file_basename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.file_basename?new C(this.rawMetadata.fields.file_basename):void 0}get file_creation_mtime(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.file_creation_mtime)!=null?new N(this.rawMetadata.fields.file_creation_mtime):void 0}get issue(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.issue?new C(this.rawMetadata.fields.issue):void 0}get mediatype(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.mediatype?new oo(this.rawMetadata.fields.mediatype):void 0}get page_num(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.page_num)!=null?new N(this.rawMetadata.fields.page_num):void 0}get publicdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.publicdate?new Q(this.rawMetadata.fields.publicdate):void 0}get result_in_subfile(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.result_in_subfile)!=null?new At(this.rawMetadata.fields.result_in_subfile):void 0}get reviewdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.reviewdate?new Q(this.rawMetadata.fields.reviewdate):void 0}get source(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.source?new C(this.rawMetadata.fields.source):void 0}get subject(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.subject?new C(this.rawMetadata.fields.subject):void 0}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new C(this.rawMetadata.fields.title):void 0}get updated_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.updated_on?new Q(this.rawMetadata.fields.updated_on):void 0}get year(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.year)!=null?new N(this.rawMetadata.fields.year):void 0}get __href__(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new C(this.rawMetadata.fields.__href__):void 0}}n([y()],J.prototype,"highlight",null);n([y()],J.prototype,"addeddate",null);n([y()],J.prototype,"avg_rating",null);n([y()],J.prototype,"collection",null);n([y()],J.prototype,"created_on",null);n([y()],J.prototype,"creator",null);n([y()],J.prototype,"date",null);n([y()],J.prototype,"description",null);n([y()],J.prototype,"downloads",null);n([y()],J.prototype,"filename",null);n([y()],J.prototype,"file_basename",null);n([y()],J.prototype,"file_creation_mtime",null);n([y()],J.prototype,"issue",null);n([y()],J.prototype,"mediatype",null);n([y()],J.prototype,"page_num",null);n([y()],J.prototype,"publicdate",null);n([y()],J.prototype,"result_in_subfile",null);n([y()],J.prototype,"reviewdate",null);n([y()],J.prototype,"source",null);n([y()],J.prototype,"subject",null);n([y()],J.prototype,"title",null);n([y()],J.prototype,"updated_on",null);n([y()],J.prototype,"year",null);n([y()],J.prototype,"__href__",null);var Z;(function(a){a[a.COUNT=0]="COUNT",a[a.ALPHABETICAL=1]="ALPHABETICAL",a[a.NUMERIC=2]="NUMERIC"})(Z||(Z={}));class nl{constructor(e){this.buckets=e.buckets,this.doc_count_error_upper_bound=e.doc_count_error_upper_bound,this.sum_other_doc_count=e.sum_other_doc_count,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const i=new Intl.Collator;switch(e){case Z.ALPHABETICAL:return t.sort((o,r)=>i.compare(o.key.toString(),r.key.toString()));case Z.NUMERIC:return t.sort((o,r)=>Number(r.key)-Number(o.key));case Z.COUNT:default:return t}}isRawNumberBuckets(e){return typeof this.buckets[0]=="number"}}n([y()],nl.prototype,"getSortedBuckets",null);class ao{constructor(e){this.rawMetadata=e}get identifier(){var e;return(e=this.rawMetadata)===null||e===void 0?void 0:e.fields.query}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new C(this.rawMetadata.fields.title):void 0}get query(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.query?new C(this.rawMetadata.fields.query):void 0}get date_favorited(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date_favorited?new Q(this.rawMetadata.fields.date_favorited):void 0}get __href__(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new C(this.rawMetadata.fields.__href__):void 0}}n([y()],ao.prototype,"title",null);n([y()],ao.prototype,"query",null);n([y()],ao.prototype,"date_favorited",null);n([y()],ao.prototype,"__href__",null);class Wo{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.url}get mediatype(){return new oo("web")}get title(){var e,t,i;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.url?new C((i=this.rawMetadata.fields)===null||i===void 0?void 0:i.url):void 0}get capture_dates(){var e,t,i;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.capture_dates?new Q((i=this.rawMetadata.fields)===null||i===void 0?void 0:i.capture_dates):void 0}get __href__(){var e,t,i;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new C((i=this.rawMetadata.fields)===null||i===void 0?void 0:i.__href__):void 0}}n([y()],Wo.prototype,"title",null);n([y()],Wo.prototype,"capture_dates",null);n([y()],Wo.prototype,"__href__",null);class ee{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.identifier}get highlight(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.highlight)===null||t===void 0)&&t.text?new C(this.rawMetadata.highlight.text):void 0}get addeddate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.addeddate?new Q(this.rawMetadata.fields.addeddate):void 0}get avg_rating(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.avg_rating;return o||o===0?new N((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.avg_rating):void 0}get collection(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.collection?new C(this.rawMetadata.fields.collection):void 0}get created_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.created_on?new Q(this.rawMetadata.fields.created_on):void 0}get creator(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.creator?new C(this.rawMetadata.fields.creator):void 0}get date(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date?new Q(this.rawMetadata.fields.date):void 0}get description(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.description?new C(this.rawMetadata.fields.description):void 0}get downloads(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.downloads;return o||o===0?new N((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.downloads):void 0}get filename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.filename?new C(this.rawMetadata.fields.filename):void 0}get file_basename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.file_basename?new C(this.rawMetadata.fields.file_basename):void 0}get file_creation_mtime(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.file_creation_mtime;return o||o===0?new N((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.file_creation_mtime):void 0}get issue(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.issue?new C(this.rawMetadata.fields.issue):void 0}get mediatype(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.mediatype?new oo(this.rawMetadata.fields.mediatype):void 0}get publicdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.publicdate?new Q(this.rawMetadata.fields.publicdate):void 0}get result_in_subfile(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.result_in_subfile;return o||o===!1?new At((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.result_in_subfile):void 0}get reviewdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.reviewdate?new Q(this.rawMetadata.fields.reviewdate):void 0}get source(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.source?new C(this.rawMetadata.fields.source):void 0}get subject(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.subject?new C(this.rawMetadata.fields.subject):void 0}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new C(this.rawMetadata.fields.title):void 0}get updated_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.updated_on?new Q(this.rawMetadata.fields.updated_on):void 0}get year(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.year;return o||o===0?new N((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.year):void 0}get start(){var e,t,i;const o=(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.start;return o||o===0?new C((i=this.rawMetadata)===null||i===void 0?void 0:i.fields.start):void 0}get __href__(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new C(this.rawMetadata.fields.__href__):void 0}}n([y()],ee.prototype,"highlight",null);n([y()],ee.prototype,"addeddate",null);n([y()],ee.prototype,"avg_rating",null);n([y()],ee.prototype,"collection",null);n([y()],ee.prototype,"created_on",null);n([y()],ee.prototype,"creator",null);n([y()],ee.prototype,"date",null);n([y()],ee.prototype,"description",null);n([y()],ee.prototype,"downloads",null);n([y()],ee.prototype,"filename",null);n([y()],ee.prototype,"file_basename",null);n([y()],ee.prototype,"file_creation_mtime",null);n([y()],ee.prototype,"issue",null);n([y()],ee.prototype,"mediatype",null);n([y()],ee.prototype,"publicdate",null);n([y()],ee.prototype,"result_in_subfile",null);n([y()],ee.prototype,"reviewdate",null);n([y()],ee.prototype,"source",null);n([y()],ee.prototype,"subject",null);n([y()],ee.prototype,"title",null);n([y()],ee.prototype,"updated_on",null);n([y()],ee.prototype,"year",null);n([y()],ee.prototype,"start",null);n([y()],ee.prototype,"__href__",null);const Dd=["loans","waitlist","loan_history"];function Ld(a){const e=a.slice(0,4),t=a.slice(4,6),i=a.slice(6,8),o=a.slice(8,10),r=a.slice(10,12),s=a.slice(12,14);return`${e}-${t}-${i}T${o}:${r}:${s}Z`}function Rd(a){var e;const t=[];for(const i of a){if(!(!((e=i.captures)===null||e===void 0)&&e.length))continue;const o=encodeURIComponent(i.url),r=`https://web.archive.org/web/${i.captures[0]}/${o}`;t.push({hit_type:"web_archive",fields:{url:i.url,capture_dates:i.captures.map(s=>Ld(s)),__href__:r}})}return t}class Ir{constructor(e,t){var i,o,r,s,l,d,c,p,v,f,w,$,_,z;this.schema=t,this.schemaHitType=t==null?void 0:t.hit_type;let D;e!=null&&e.page_elements&&(this.pageElements=e.page_elements,D=Object.values(this.pageElements)[0]);let A=(i=e==null?void 0:e.hits)===null||i===void 0?void 0:i.hits;this.totalResults=(r=(o=e==null?void 0:e.hits)===null||o===void 0?void 0:o.total)!==null&&r!==void 0?r:0,this.returnedCount=(l=(s=e==null?void 0:e.hits)===null||s===void 0?void 0:s.returned)!==null&&l!==void 0?l:0,!(A!=null&&A.length)&&((d=this.pageElements)===null||d===void 0?void 0:d.service___fts)?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!(A!=null&&A.length)&&((c=D==null?void 0:D.hits)===null||c===void 0?void 0:c.hits)?(A=D.hits.hits,this.totalResults=(p=D.hits.total)!==null&&p!==void 0?p:0,this.returnedCount=(v=D.hits.returned)!==null&&v!==void 0?v:0):!((f=this.pageElements)===null||f===void 0)&&f.lending?A=this.handleLendingPageElement():!((w=this.pageElements)===null||w===void 0)&&w.web_archives&&(A=this.handleWebArchivesPageElement()),this.results=this.formatHits(A);let R=e==null?void 0:e.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&(D==null?void 0:D.aggregations)&&(R=D.aggregations),R&&this.buildAggregations(R),e!=null&&e.collection_titles&&(this.collectionTitles=($=e.collection_titles)!==null&&$!==void 0?$:{}),e!=null&&e.collection_extra_info&&(this.collectionExtraInfo=(_=e.collection_extra_info)!==null&&_!==void 0?_:null),e!=null&&e.account_extra_info&&(this.accountExtraInfo=(z=e.account_extra_info)!==null&&z!==void 0?z:null)}formatHits(e){var t;return(t=e==null?void 0:e.map(i=>{var o;return Ir.createResult((o=i.hit_type)!==null&&o!==void 0?o:this.schemaHitType,i)}))!==null&&t!==void 0?t:[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((t,[i,o])=>(t[i]=new nl(o),t),{})}handleLendingPageElement(){var e,t;const i=(e=this.pageElements)===null||e===void 0?void 0:e.lending,o=(t=i.loans)!==null&&t!==void 0?t:[];this.totalResults=o.length,this.returnedCount=this.totalResults;for(const r of Dd)i[r]=this.formatHits(i[r]);return o}handleWebArchivesPageElement(){var e;const t=Rd((e=this.pageElements)===null||e===void 0?void 0:e.web_archives);return this.totalResults=t.length,this.returnedCount=this.totalResults,t}handleFederatedPageElements(){var e,t,i,o;const r=["service___fts","service___tvs","service___rcs","service___whisper"];for(const s of r){const l=this.removeServicePrefix(s);this.federatedResults?this.federatedResults[s]=[]:this.federatedResults={[l]:[]};const d=(t=(e=this.pageElements)===null||e===void 0?void 0:e[s])===null||t===void 0?void 0:t.hits;d!=null&&d.hits&&(this.federatedResults[l]=this.formatHits(d==null?void 0:d.hits)),this.totalResults+=(i=d==null?void 0:d.total)!==null&&i!==void 0?i:0,this.returnedCount+=(o=d==null?void 0:d.returned)!==null&&o!==void 0?o:0}}removeServicePrefix(e){return e.split("___")[1]}static createResult(e,t){switch(e){case"item":return new I(t);case"text":case"asr_text":return new J(t);case"favorited_search":return new ao(t);case"web_archive":return new Wo(t);case"tv_clip":return new ee(t);default:return new I(t)}}}class Od{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class Fd{constructor(e){var t,i,o;this.rawResponse=e,this.request=new Od(e.request),this.responseHeader=(t=e.response)===null||t===void 0?void 0:t.header,this.sessionContext=e.session_context,this.response=new Ir((i=e.response)===null||i===void 0?void 0:i.body,(o=e.response)===null||o===void 0?void 0:o.hit_schema)}}class jo{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(o=>({terms:o}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){const r=`[${e.pageElements.map(s=>`"${s}"`).join(",")}]`;t.append("page_elements",r)}if(e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const o=this.filterParamsAsString(e.filters);o&&o!=="{}"&&t.append("filter_map",o)}if(e.sort&&e.sort.length>0){const o=e.sort.map(r=>this.sortParamsAsString(r));t.append("sort",o.join(","))}const i=e.aggregations;if(i){const o=this.aggregateSearchParamsAsString(i);o&&t.append("aggregations",o)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const o=window.location.href.slice(0,400);e.query.length<=1e3&&t.append("client_url",o)}return t}}var Ui;(function(a){a.networkError="SearchService.NetworkError",a.itemNotFound="SearchService.ItemNotFound",a.decodingError="SearchService.DecodingError",a.searchEngineError="SearchService.SearchEngineError"})(Ui||(Ui={}));class Bd extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}const Ps={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})};class qo{constructor(e){var t,i;this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const o=new URL(window.location.href).searchParams,r=o.get("scope"),s=o.get("verbose"),l=o.get("debugging"),d=o.get("cacheDebug");let c="";for(const p of Object.keys(Ps))if(o.get(p)){c=Ps[p];break}c=(i=o.get("caching"))!==null&&i!==void 0?i:c,(e==null?void 0:e.caching)!==void 0?this.cachingFlags=e.caching:c&&(this.cachingFlags=c),(e==null?void 0:e.debuggingEnabled)!==void 0?this.debuggingEnabled=e.debuggingEnabled:(l||d)&&(this.debuggingEnabled=!0),(e==null?void 0:e.scope)!==void 0?this.requestScope=e.scope:r&&(this.requestScope=r),(e==null?void 0:e.verbose)!==void 0?this.verbose=e.verbose:s&&(this.verbose=!!s)}async fetchUrl(e,t){var i,o;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope),this.cachingFlags&&r.searchParams.set("caching",this.cachingFlags);let s;try{const l=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};s=await fetch(r.href,l)}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Ui.networkError,d)}try{const l=await s.json();this.verbose&&this.printResponse(l),l.debugging&&this.printDebuggingInfo(l);const d=(o=l.response)===null||o===void 0?void 0:o.error;return d?this.getErrorResult(Ui.searchEngineError,d.message,d.forensics):{success:l}}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Ui.decodingError,d)}}getErrorResult(e,t,i){return{error:new Bd(e,t,i)}}printResponse(e){var t,i,o,r,s;try{const l=JSON.parse(JSON.stringify(e)),d=(o=(i=(t=l==null?void 0:l.response)===null||t===void 0?void 0:t.body)===null||i===void 0?void 0:i.hits)===null||o===void 0?void 0:o.hits;if(Array.isArray(d)&&d.length>1){const p=[];p.push(d[0]),p.push(`*** ${d.length-1} hits omitted ***`),l.response.body.hits.hits=p}const c=(s=(r=l==null?void 0:l.response)===null||r===void 0?void 0:r.body)===null||s===void 0?void 0:s.aggregations;c&&Object.entries(c).forEach(([p,v])=>{var f,w,$,_;if(((w=(f=v)===null||f===void 0?void 0:f.buckets)===null||w===void 0?void 0:w.length)>0){const z=JSON.parse(JSON.stringify(v));z.buckets=`*** ${(_=($=z.buckets)===null||$===void 0?void 0:$.length)!==null&&_!==void 0?_:0} buckets omitted ***`,l.response.body.aggregations[p]=z}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(l,null,2)),console.groupEnd()}catch(l){console.error("Error printing search response:",l)}}printDebuggingInfo(e){var t,i;const o=e.debugging,r=(t=o.messages)!==null&&t!==void 0?t:[],s=(i=o.data)!==null&&i!==void 0?i:{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const l of r)console.log(l);console.groupEnd(),console.group("Debug data");for(const[l,d]of Object.entries(s))console.log(l,d);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class Id extends qo{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=jo.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?${i}`;return this.fetchUrl(o)}}class Ud extends qo{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=jo.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${i}`;return this.fetchUrl(o)}}class Nd extends qo{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=jo.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${i}`;return this.fetchUrl(o)}}var he;(function(a){a[a.METADATA=0]="METADATA",a[a.FULLTEXT=1]="FULLTEXT",a[a.RADIO=3]="RADIO",a[a.FEDERATED=4]="FEDERATED"})(he||(he={}));class Hd extends qo{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=jo.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${i}`;return this.fetchUrl(o)}}class Ye{constructor(e={}){this.backendOptions=e}async search(e,t=he.METADATA){const o=await Ye.getBackendForSearchType(t,this.backendOptions).performSearch(e);return o.error?o:{success:new Fd(o.success)}}static getBackendForSearchType(e,t={}){switch(e){case he.FULLTEXT:return new Ud(t);case he.RADIO:return new Nd(t);case he.FEDERATED:return new Hd(t);case he.METADATA:default:return new Id(t)}}}Ye.default=new Ye;n([y((a,e={})=>{const{includeCredentials:t=!1,verbose:i=!1,scope:o="",baseUrl:r=""}=e;return`${a};${t};${i};${o};${r}`})],Ye,"getBackendForSearchType",null);var ut;(function(a){a.INCLUDE="inc",a.EXCLUDE="exc",a.GREATER_THAN="gt",a.GREATER_OR_EQUAL="gte",a.LESS_THAN="lt",a.LESS_OR_EQUAL="lte"})(ut||(ut={}));class Vd{constructor(){this.filterMap={}}addFilter(e,t,i){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){const o=[].concat(this.filterMap[e][t],i);this.filterMap[e][t]=Array.from(new Set(o))}else this.filterMap[e][t]=i;return this}removeSingleFilter(e,t,i){var o;if(!(!((o=this.filterMap[e])===null||o===void 0)&&o[t]))return this;const r=[].concat(this.filterMap[e][t]),s=r.indexOf(i);return s>=0&&r.splice(s,1),this.filterMap[e][t]=r.length===1?r[0]:r,r.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){const t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap=j({},e),this}mergeFilterMap(e){for(const[t,i]of Object.entries(e))for(const[o,r]of Object.entries(i))if(Array.isArray(r))for(const s of r)this.addFilter(t,o,s);else this.addFilter(t,o,r);return this}build(){return this.filterMap}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ur=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Nr=Symbol(),Ds=new Map;class ll{constructor(e,t){if(this._$cssResult$=!0,t!==Nr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Ds.get(this.cssText);return Ur&&e===void 0&&(Ds.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Wd=a=>new ll(typeof a=="string"?a:a+"",Nr),g=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[r+1],a[0]);return new ll(t,Nr)},jd=(a,e)=>{Ur?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=window.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},Ls=Ur?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Wd(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ma;const Rs=window.trustedTypes,qd=Rs?Rs.emptyScript:"",Os=window.reactiveElementPolyfillSupport,nr={toAttribute(a,e){switch(e){case Boolean:a=a?qd:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},dl=(a,e)=>e!==a&&(e==e||a==a),ga={attribute:!0,type:String,converter:nr,reflect:!1,hasChanged:dl};class Kt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Eh(i,t);o!==void 0&&(this._$Eu.set(o,i),e.push(o))}),e}static createProperty(e,t=ga){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||ga}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Ls(o))}else e!==void 0&&t.push(Ls(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return jd(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=ga){var o,r;const s=this.constructor._$Eh(e,i);if(s!==void 0&&i.reflect===!0){const l=((r=(o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==null&&r!==void 0?r:nr.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Ei=null}}_$AK(e,t){var i,o,r;const s=this.constructor,l=s._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const d=s.getPropertyOptions(l),c=d.converter,p=(r=(o=(i=c)===null||i===void 0?void 0:i.fromAttribute)!==null&&o!==void 0?o:typeof c=="function"?c:null)!==null&&r!==void 0?r:nr.fromAttribute;this._$Ei=l,this[l]=p(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||dl)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((o,r)=>this[r]=o),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Kt.finalized=!0,Kt.elementProperties=new Map,Kt.elementStyles=[],Kt.shadowRootOptions={mode:"open"},Os==null||Os({ReactiveElement:Kt}),((ma=globalThis.reactiveElementVersions)!==null&&ma!==void 0?ma:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ya;const ri=globalThis.trustedTypes,Fs=ri?ri.createPolicy("lit-html",{createHTML:a=>a}):void 0,nt=`lit$${(Math.random()+"").slice(9)}$`,Hr="?"+nt,Qd=`<${Hr}>`,si=document,Wi=(a="")=>si.createComment(a),ji=a=>a===null||typeof a!="object"&&typeof a!="function",cl=Array.isArray,hl=a=>{var e;return cl(a)||typeof((e=a)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Ti=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Bs=/-->/g,Is=/>/g,xt=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Us=/'/g,Ns=/"/g,pl=/^(?:script|style|textarea|title)$/i,ul=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),h=ul(1),H=ul(2),dt=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Hs=new WeakMap,bo=(a,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=r._$litPart$;if(s===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=s=new yi(e.insertBefore(Wi(),l),l,void 0,t!=null?t:{})}return s._$AI(a),s},ti=si.createTreeWalker(si,129,null,!1),vl=(a,e)=>{const t=a.length-1,i=[];let o,r=e===2?"<svg>":"",s=Ti;for(let d=0;d<t;d++){const c=a[d];let p,v,f=-1,w=0;for(;w<c.length&&(s.lastIndex=w,v=s.exec(c),v!==null);)w=s.lastIndex,s===Ti?v[1]==="!--"?s=Bs:v[1]!==void 0?s=Is:v[2]!==void 0?(pl.test(v[2])&&(o=RegExp("</"+v[2],"g")),s=xt):v[3]!==void 0&&(s=xt):s===xt?v[0]===">"?(s=o!=null?o:Ti,f=-1):v[1]===void 0?f=-2:(f=s.lastIndex-v[2].length,p=v[1],s=v[3]===void 0?xt:v[3]==='"'?Ns:Us):s===Ns||s===Us?s=xt:s===Bs||s===Is?s=Ti:(s=xt,o=void 0);const $=s===xt&&a[d+1].startsWith("/>")?" ":"";r+=s===Ti?c+Qd:f>=0?(i.push(p),c.slice(0,f)+"$lit$"+c.slice(f)+nt+$):c+nt+(f===-2?(i.push(void 0),d):$)}const l=r+(a[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Fs!==void 0?Fs.createHTML(l):l,i]};class qi{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const l=e.length-1,d=this.parts,[c,p]=vl(e,t);if(this.el=qi.createElement(c,i),ti.currentNode=this.el.content,t===2){const v=this.el.content,f=v.firstChild;f.remove(),v.append(...f.childNodes)}for(;(o=ti.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const v=[];for(const f of o.getAttributeNames())if(f.endsWith("$lit$")||f.startsWith(nt)){const w=p[s++];if(v.push(f),w!==void 0){const $=o.getAttribute(w.toLowerCase()+"$lit$").split(nt),_=/([.?@])?(.*)/.exec(w);d.push({type:1,index:r,name:_[2],strings:$,ctor:_[1]==="."?ml:_[1]==="?"?gl:_[1]==="@"?yl:ro})}else d.push({type:6,index:r})}for(const f of v)o.removeAttribute(f)}if(pl.test(o.tagName)){const v=o.textContent.split(nt),f=v.length-1;if(f>0){o.textContent=ri?ri.emptyScript:"";for(let w=0;w<f;w++)o.append(v[w],Wi()),ti.nextNode(),d.push({type:2,index:++r});o.append(v[f],Wi())}}}else if(o.nodeType===8)if(o.data===Hr)d.push({type:2,index:r});else{let v=-1;for(;(v=o.data.indexOf(nt,v+1))!==-1;)d.push({type:7,index:r}),v+=nt.length-1}r++}}static createElement(e,t){const i=si.createElement("template");return i.innerHTML=e,i}}function Ot(a,e,t=a,i){var o,r,s,l;if(e===dt)return e;let d=i!==void 0?(o=t._$Cl)===null||o===void 0?void 0:o[i]:t._$Cu;const c=ji(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==c&&((r=d==null?void 0:d._$AO)===null||r===void 0||r.call(d,!1),c===void 0?d=void 0:(d=new c(a),d._$AT(a,t,i)),i!==void 0?((s=(l=t)._$Cl)!==null&&s!==void 0?s:l._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=Ot(a,d._$AS(a,e.values),d,i)),e}class fl{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:si).importNode(i,!0);ti.currentNode=r;let s=ti.nextNode(),l=0,d=0,c=o[0];for(;c!==void 0;){if(l===c.index){let p;c.type===2?p=new yi(s,s.nextSibling,this,e):c.type===1?p=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(p=new bl(s,this,e)),this.v.push(p),c=o[++d]}l!==(c==null?void 0:c.index)&&(s=ti.nextNode(),l++)}return r}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class yi{constructor(e,t,i,o){var r;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cg=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ot(this,e,t),ji(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==dt&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):hl(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==b&&ji(this._$AH)?this._$AA.nextSibling.data=e:this.k(si.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=qi.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{const s=new fl(r,this),l=s.p(this.options);s.m(i),this.k(l),this._$AH=s}}_$AC(e){let t=Hs.get(e.strings);return t===void 0&&Hs.set(e.strings,t=new qi(e)),t}S(e){cl(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new yi(this.M(Wi()),this.M(Wi()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ro{constructor(e,t,i,o,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(r===void 0)e=Ot(this,e,t,0),s=!ji(e)||e!==this._$AH&&e!==dt,s&&(this._$AH=e);else{const l=e;let d,c;for(e=r[0],d=0;d<r.length-1;d++)c=Ot(this,l[i+d],t,d),c===dt&&(c=this._$AH[d]),s||(s=!ji(c)||c!==this._$AH[d]),c===b?e=b:e!==b&&(e+=(c!=null?c:"")+r[d+1]),this._$AH[d]=c}s&&!o&&this.C(e)}C(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class ml extends ro{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===b?void 0:e}}const Kd=ri?ri.emptyScript:"";class gl extends ro{constructor(){super(...arguments),this.type=4}C(e){e&&e!==b?this.element.setAttribute(this.name,Kd):this.element.removeAttribute(this.name)}}class yl extends ro{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=Ot(this,e,t,0))!==null&&i!==void 0?i:b)===dt)return;const o=this._$AH,r=e===b&&o!==b||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==b&&(o===b||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class bl{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ot(this,e)}}const Gd={L:"$lit$",P:nt,V:Hr,I:1,N:vl,R:fl,j:hl,D:Ot,H:yi,F:ro,O:gl,W:yl,B:ml,Z:bl},Vs=window.litHtmlPolyfillSupport;Vs==null||Vs(qi,yi),((ya=globalThis.litHtmlVersions)!==null&&ya!==void 0?ya:globalThis.litHtmlVersions=[]).push("2.2.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ba,wa;class B extends Kt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=bo(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return dt}}B.finalized=!0,B._$litElement$=!0,(ba=globalThis.litElementHydrateSupport)===null||ba===void 0||ba.call(globalThis,{LitElement:B});const Ws=globalThis.litElementPolyfillSupport;Ws==null||Ws({LitElement:B});((wa=globalThis.litElementVersions)!==null&&wa!==void 0?wa:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=a=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(a,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(s){window.customElements.define(t,s)}}})(a,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yd=(a,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?ae(j({},e),{finisher(t){t.createProperty(e.key,a)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,a)}};function u(a){return(e,t)=>t!==void 0?((i,o,r)=>{o.constructor.createProperty(r,i)})(a,e,t):Yd(a,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function L(a){return u(ae(j({},a),{state:!0}))}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wl=({finisher:a,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const r=(o=t.originalKey)!==null&&o!==void 0?o:t.key,s=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:ae(j({},t),{key:r});return a!=null&&(s.finisher=function(l){a(l,r)}),s}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),a==null||a(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Y(a,e){return wl({descriptor:t=>{const i={get(){var o,r;return(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(a))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,s;return this[o]===void 0&&(this[o]=(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(a))!==null&&s!==void 0?s:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xd(a){return wl({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(a))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $a;(($a=window.HTMLSlotElement)===null||$a===void 0?void 0:$a.prototype.assignedElements)!=null;class Zd{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(o=>{o.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ko=a=>(...e)=>({_$litDirective$:a,values:e});class Go{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ni=Ko(class extends Go{constructor(a){var e;if(super(a),a.type!==Qo.ATTRIBUTE||a.name!=="class"||((e=a.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(e=>a[e]).join(" ")+" "}update(a,[e]){var t,i;if(this.et===void 0){this.et=new Set,a.strings!==void 0&&(this.st=new Set(a.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((t=this.st)===null||t===void 0)&&t.has(r))&&this.et.add(r);return this.render(e)}const o=a.element.classList;this.et.forEach(r=>{r in e||(o.remove(r),this.et.delete(r))});for(const r in e){const s=!!e[r];s===this.et.has(r)||((i=this.st)===null||i===void 0?void 0:i.has(r))||(s?(o.add(r),this.et.add(r)):(o.remove(r),this.et.delete(r)))}return dt}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jd=(a,...e)=>({strTag:!0,strings:a,values:e}),Et=Jd,ec=a=>typeof a!="string"&&"strTag"in a,tc=(a,e,t)=>{let i=a[0];for(let o=1;o<a.length;o++)i+=e[t?t[o-1]:o-1],i+=a[o];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ic=a=>ec(a)?tc(a.strings,a.values):a;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class oc{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let a=0;a<256;a++)(a>>4&15).toString(16)+(a&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ac=new oc;ac.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let k=ic;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:rc}=Gd,sc=a=>a.strings===void 0,js=()=>document.createComment(""),Ei=(a,e,t)=>{var i;const o=a._$AA.parentNode,r=e===void 0?a._$AB:e._$AA;if(t===void 0){const s=o.insertBefore(js(),r),l=o.insertBefore(js(),r);t=new rc(s,l,a,a.options)}else{const s=t._$AB.nextSibling,l=t._$AM,d=l!==a;if(d){let c;(i=t._$AQ)===null||i===void 0||i.call(t,a),t._$AM=a,t._$AP!==void 0&&(c=a._$AU)!==l._$AU&&t._$AP(c)}if(s!==r||d){let c=t._$AA;for(;c!==s;){const p=c.nextSibling;o.insertBefore(c,r),c=p}}}return t},Ct=(a,e,t=a)=>(a._$AI(e,t),a),nc={},lc=(a,e=nc)=>a._$AH=e,dc=a=>a._$AH,_a=a=>{var e;(e=a._$AP)===null||e===void 0||e.call(a,!1,!0);let t=a._$AA;const i=a._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const qs=(a,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(a[o],o);return i},Vr=Ko(class extends Go{constructor(a){if(super(a),a.type!==Qo.CHILD)throw Error("repeat() can only be used in text expressions")}dt(a,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],r=[];let s=0;for(const l of a)o[s]=i?i(l,s):s,r[s]=t(l,s),s++;return{values:r,keys:o}}render(a,e,t){return this.dt(a,e,t).values}update(a,[e,t,i]){var o;const r=dc(a),{values:s,keys:l}=this.dt(e,t,i);if(!Array.isArray(r))return this.ut=l,s;const d=(o=this.ut)!==null&&o!==void 0?o:this.ut=[],c=[];let p,v,f=0,w=r.length-1,$=0,_=s.length-1;for(;f<=w&&$<=_;)if(r[f]===null)f++;else if(r[w]===null)w--;else if(d[f]===l[$])c[$]=Ct(r[f],s[$]),f++,$++;else if(d[w]===l[_])c[_]=Ct(r[w],s[_]),w--,_--;else if(d[f]===l[_])c[_]=Ct(r[f],s[_]),Ei(a,c[_+1],r[f]),f++,_--;else if(d[w]===l[$])c[$]=Ct(r[w],s[$]),Ei(a,r[f],r[w]),w--,$++;else if(p===void 0&&(p=qs(l,$,_),v=qs(d,f,w)),p.has(d[f]))if(p.has(d[w])){const z=v.get(l[$]),D=z!==void 0?r[z]:null;if(D===null){const A=Ei(a,r[f]);Ct(A,s[$]),c[$]=A}else c[$]=Ct(D,s[$]),Ei(a,r[f],D),r[z]=null;$++}else _a(r[w]),w--;else _a(r[f]),f++;for(;$<=_;){const z=Ei(a,c[_+1]);Ct(z,s[$]),c[$++]=z}for(;f<=w;){const z=r[f++];z!==null&&_a(z)}return this.ut=l,lc(a,c),dt}});function fo(a,e,t){return Array.from({length:(e-a)/t+1},(i,o)=>a+o*t)}let ct=class extends B{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const o=t.target.dataset.cellIndex;if(!o)return;const r=parseInt(o,10);t.isIntersecting?this.visibleCellIndices.add(r):this.visibleCellIndices.delete(r)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){fo(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}refreshCell(e){this.removeCell(e),this.bufferRange.includes(e)&&this.renderCellBuffer([e])}refreshAllVisibleCells(){this.bufferRange.forEach(e=>this.removeCell(e)),this.renderCellBuffer(this.bufferRange)}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const o=t?"smooth":"auto";return i.scrollIntoView({behavior:o}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(fo(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){var e;const t=this.itemCount-1,i=fo(0,t,1),o=(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:b;return h`
      <section id="container" role="feed" aria-label=${o}>
        <div id="sentinel" aria-hidden="true"></div>
        ${Vr(i,r=>r,r=>h`
            <article
              class="cell-container"
              aria-posinset=${r+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${r}
              @click=${s=>this.cellSelected(s,r)}
              @keyup=${s=>{s.key==="Enter"&&this.cellSelected(s,r)}}
            ></article>
          `)}
        <slot name="result-last-tile"></slot>
      </section>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}get bufferRange(){const e=Math.max(10,this.visibleCellIndices.size),t=this.visibleCellIndices.size===0,i=Math.min(...this.visibleCellIndices),o=Math.max(...this.visibleCellIndices),r=t?0:Math.max(i-e,0),s=t?e:Math.min(o+e,this.itemCount-1);return fo(r,s,1)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),{bufferRange:t}=this;this.renderCellBuffer(t),this.removeCellsOutsideBufferRange(t);const i=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(i)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const o=this.cellContainerForIndex(t);if(!o)return;const r=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(o.style.height="auto",r)bo(r,o),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;bo(this.placeholderCellTemplate,o),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,bo(b,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=g`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=g`var(--infiniteScrollerRowGap, 1.7rem)`,i=g`var(--infiniteScrollerColGap, 1.7rem)`,o=g`var(--infiniteScrollerCellMinWidth, 16rem)`,r=g`var(--infiniteScrollerCellMaxWidth, 1fr)`,s=g`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=g`var(--infiniteScrollerCellMaxHeight, none)`,d=g`var(--infiniteScrollerCellOutline, 0)`;return g`
      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${t};
        row-gap: ${t};
        grid-column-gap: ${i};
        column-gap: ${i};
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${o}, ${r})
          );
        }
      }

      .cell-container {
        outline: ${d};
        min-height: ${s};
        max-height: ${l};
        min-width: ${o};
        max-width: ${r};
      }

      @supports (display: grid) {
        /* the grid takes care of the width */
        .cell-container {
          min-width: auto;
          max-width: none;
        }
      }

      #sentinel {
        position: absolute;
        height: ${e};
        bottom: 0;
        left: 0;
        right: 0;
        z-index: -1;
        /**
        Chrome and Firefox try to maintain scroll position when the page increases and
        decreases in size, but the scroll position is being focused on the sentinel
        so it's causing the "load more" event to keep firing because it thinks the
        user has scrolled to the sentinel. "overflow-anchor: none" prevents that anchoring
        */
        overflow-anchor: none;
      }
    `}};n([u({type:Number})],ct.prototype,"itemCount",void 0);n([u({type:Object})],ct.prototype,"cellProvider",void 0);n([u({type:Object})],ct.prototype,"placeholderCellTemplate",void 0);n([u({type:Boolean})],ct.prototype,"scrollOptimizationsDisabled",void 0);n([u({type:String})],ct.prototype,"ariaLandmarkLabel",void 0);n([Y("#sentinel")],ct.prototype,"sentinel",void 0);n([Xd(".cell-container")],ct.prototype,"cellContainers",void 0);ct=n([F("infinite-scroller")],ct);function cc(a){return a==null?void 0:a.replace(/%22%22(?!%22%22)(.+?)%22%22/g,"%22$1%22")}function hc(a){var e,t,i;return((e=a==null?void 0:a.rawMetadata)===null||e===void 0?void 0:e.hit_type)==="favorited_search"?"search":(i=(t=a.mediatype)===null||t===void 0?void 0:t.value)!==null&&i!==void 0?i:"data"}const pc=H`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="#000" fill-rule="evenodd">
      <path
        d="m86 0c5.5228475 0 10 4.4771525 10 10v80c0 5.5228475-4.4771525 10-10 10h-57c-5.5228475 0-10-4.4771525-10-10v-13h7.999l.001 8c0 2.6887547 2.1223067 4.8818181 4.7831104 4.9953805l.2168896.0046195h50.06c2.6887547 0 4.8818181-2.1223067 4.9953805-4.7831104l.0046195-.2168896v-70c0-2.7614237-2.2385763-5-5-5h-50.06c-2.6887547 0-4.8818181 2.1223067-4.9953805 4.7831104l-.0046195.2168896-.001 7h-7.999v-12c0-5.5228475 4.4771525-10 10-10z"
      />
      <path
        d="m4 52h14c-.0377367 5.0230706-.0377367 15.3564039 0 31h35v-31h16c-20.0693886-21.0798163-30.8885707-32.4131497-32.4575462-34z" fill-rule="nonzero" transform="matrix(0 1 -1 0 87 14)"
      />
    </g>
    <title>Log in to view this item</title>
  </svg>
`,uc=H`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,vc={"login-required":k("Log in to view this item"),"content-warning":k("Content may be inappropriate")},$l={"login-required":pc,"content-warning":uc};class Mo{constructor(e){var t,i,o,r,s,l,d,c,p,v,f,w,$,_,z,D,A,R,O,W,ve,xe,de,Pe,Ie,$e,X,fe,Oe,_t,bi,wi,It,$i,Ut,oe;const _i=this.getFlags(e);this.averageRating=(t=e.avg_rating)===null||t===void 0?void 0:t.value,this.captureDates=(i=e.capture_dates)===null||i===void 0?void 0:i.values,this.checked=!1,this.collections=(r=(o=e.collection)===null||o===void 0?void 0:o.values)!==null&&r!==void 0?r:[],this.collectionFilesCount=(l=(s=e.collection_files_count)===null||s===void 0?void 0:s.value)!==null&&l!==void 0?l:0,this.collectionSize=(c=(d=e.collection_size)===null||d===void 0?void 0:d.value)!==null&&c!==void 0?c:0,this.commentCount=(v=(p=e.num_reviews)===null||p===void 0?void 0:p.value)!==null&&v!==void 0?v:0,this.creator=(f=e.creator)===null||f===void 0?void 0:f.value,this.creators=($=(w=e.creator)===null||w===void 0?void 0:w.values)!==null&&$!==void 0?$:[],this.dateAdded=(_=e.addeddate)===null||_===void 0?void 0:_.value,this.dateArchived=(z=e.publicdate)===null||z===void 0?void 0:z.value,this.datePublished=(D=e.date)===null||D===void 0?void 0:D.value,this.dateReviewed=(A=e.reviewdate)===null||A===void 0?void 0:A.value,this.description=(R=e.description)===null||R===void 0?void 0:R.values.join(`
`),this.favCount=(W=(O=e.num_favorites)===null||O===void 0?void 0:O.value)!==null&&W!==void 0?W:0,this.href=cc((xe=(ve=e.review)===null||ve===void 0?void 0:ve.__href__)!==null&&xe!==void 0?xe:(de=e.__href__)===null||de===void 0?void 0:de.value),this.identifier=Mo.cleanIdentifier(e.identifier),this.issue=(Pe=e.issue)===null||Pe===void 0?void 0:Pe.value,this.itemCount=($e=(Ie=e.item_count)===null||Ie===void 0?void 0:Ie.value)!==null&&$e!==void 0?$e:0,this.mediatype=hc(e),this.review=e.review,this.snippets=(fe=(X=e.highlight)===null||X===void 0?void 0:X.values)!==null&&fe!==void 0?fe:[],this.source=(Oe=e.source)===null||Oe===void 0?void 0:Oe.value,this.subjects=(bi=(_t=e.subject)===null||_t===void 0?void 0:_t.values)!==null&&bi!==void 0?bi:[],this.title=(It=(wi=e.title)===null||wi===void 0?void 0:wi.value)!==null&&It!==void 0?It:"",this.volume=($i=e.volume)===null||$i===void 0?void 0:$i.value,this.viewCount=(Ut=e.downloads)===null||Ut===void 0?void 0:Ut.value,this.weeklyViewCount=(oe=e.week)===null||oe===void 0?void 0:oe.value,this.loginRequired=_i.loginRequired,this.contentWarning=_i.contentWarning}clone(){const e=new Mo({});return e.averageRating=this.averageRating,e.captureDates=this.captureDates,e.checked=this.checked,e.collections=this.collections,e.collectionFilesCount=this.collectionFilesCount,e.collectionSize=this.collectionSize,e.commentCount=this.commentCount,e.creator=this.creator,e.creators=this.creators,e.dateStr=this.dateStr,e.dateAdded=this.dateAdded,e.dateArchived=this.dateArchived,e.datePublished=this.datePublished,e.dateReviewed=this.dateReviewed,e.description=this.description,e.favCount=this.favCount,e.href=this.href,e.identifier=this.identifier,e.issue=this.issue,e.itemCount=this.itemCount,e.mediatype=this.mediatype,e.snippets=this.snippets,e.source=this.source,e.subjects=this.subjects,e.title=this.title,e.volume=this.volume,e.viewCount=this.viewCount,e.weeklyViewCount=this.weeklyViewCount,e.loginRequired=this.loginRequired,e.contentWarning=this.contentWarning,e}getFlags(e){var t,i,o,r;const s={loginRequired:!1,contentWarning:!1};if(((t=e.collection)===null||t===void 0?void 0:t.values.length)&&((i=e.mediatype)===null||i===void 0?void 0:i.value)!=="collection"){for(const l of(r=(o=e.collection)===null||o===void 0?void 0:o.values)!==null&&r!==void 0?r:[])if(l==="loggedin"&&(s.loginRequired=!0,s.contentWarning)||l==="no-preview"&&(s.contentWarning=!0,s.loginRequired))break}return s}static cleanIdentifier(e){var t;const i=(t=e==null?void 0:e.indexOf("|"))!==null&&t!==void 0?t:-1;return i>0?e==null?void 0:e.slice(0,i):e}}var x;(function(a){a.default="default",a.unrecognized="unrecognized",a.relevance="relevance",a.alltimeview="alltimeview",a.weeklyview="weeklyview",a.title="title",a.date="date",a.datearchived="datearchived",a.datereviewed="datereviewed",a.dateadded="dateadded",a.datefavorited="datefavorited",a.creator="creator"})(x||(x={}));const Me={[x.default]:{field:x.default,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!1,displayName:"",urlNames:["",null,void 0]},[x.unrecognized]:{field:x.unrecognized,defaultSortDirection:null,canSetDirection:!0,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!0,displayName:"",urlNames:[]},[x.relevance]:{field:x.relevance,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,displayName:"Relevance",urlNames:["_score"]},[x.alltimeview]:{field:x.alltimeview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"downloads",displayName:"All-time views",urlNames:["downloads"]},[x.weeklyview]:{field:x.weeklyview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"week",displayName:"Weekly views",urlNames:["week"]},[x.title]:{field:x.title,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"titleSorter",displayName:"Title",urlNames:["title","titleSorter"]},[x.date]:{field:x.date,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"date",displayName:"Date published",urlNames:["date"]},[x.datearchived]:{field:x.datearchived,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"publicdate",displayName:"Date archived",urlNames:["publicdate"]},[x.datereviewed]:{field:x.datereviewed,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"reviewdate",displayName:"Date reviewed",urlNames:["reviewdate"]},[x.dateadded]:{field:x.dateadded,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"addeddate",displayName:"Date added",urlNames:["addeddate"]},[x.datefavorited]:{field:x.datefavorited,defaultSortDirection:"desc",canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,searchServiceKey:"favoritedate",displayName:"Date favorited",urlNames:["favoritedate"]},[x.creator]:{field:x.creator,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"creatorSorter",displayName:"Creator",urlNames:["creator","creatorSorter"]}};function _l(a){var e;return(e=Object.values(Me).find(t=>t.urlNames.some(i=>a===i)))!==null&&e!==void 0?e:Me[x.unrecognized]}const fc={uploads:x.datearchived,reviews:x.datereviewed,collections:x.datearchived,web_archives:x.datearchived},mc={title:"firstTitle",creator:"firstCreator"},lt=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{}}),gc=["mediatype","year","subject","collection","creator","language"],Ao={subject:"Subject",lending:"Availability",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year"},zo={subject:Z.COUNT,lending:Z.COUNT,mediatype:Z.COUNT,language:Z.COUNT,creator:Z.COUNT,collection:Z.COUNT,year:Z.NUMERIC},yc={subject:Z.ALPHABETICAL,lending:Z.ALPHABETICAL,mediatype:Z.ALPHABETICAL,language:Z.ALPHABETICAL,creator:Z.ALPHABETICAL,collection:Z.ALPHABETICAL,year:Z.NUMERIC},bc={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},Qs={is_lendable:"Lending Library",available_to_borrow:"Borrow 14 Days",is_readable:"Always Available"},Yo={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0};/*! typescript-cookie v1.0.3 | MIT */const Sl=a=>encodeURIComponent(a).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),xl=a=>encodeURIComponent(a).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),Wr=decodeURIComponent,jr=a=>(a[0]==='"'&&(a=a.slice(1,-1)),a.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function wc(a){return a=Object.assign({},a),typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires!=null&&(a.expires=a.expires.toUTCString()),Object.entries(a).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function Cl(a,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,o={};let r;for(;(r=i.exec(document.cookie))!=null;)try{const s=t(r[1]);if(o[s]=e(r[2],s),a===s)break}catch{}return a!=null?o[a]:o}const Ks=Object.freeze({decodeName:Wr,decodeValue:jr,encodeName:Sl,encodeValue:xl}),qr=Object.freeze({path:"/"});function Po(a,e,t=qr,{encodeValue:i=xl,encodeName:o=Sl}={}){return document.cookie=`${o(a)}=${i(e,a)}${wc(t)}`}function lr(a,{decodeValue:e=jr,decodeName:t=Wr}={}){return Cl(a,e,t)}function $c({decodeValue:a=jr,decodeName:e=Wr}={}){return Cl(void 0,a,e)}function _c(a,e=qr){Po(a,"",Object.assign({},e,{expires:-1}))}function dr(a,e){const t={set:function(o,r,s){return Po(o,r,Object.assign({},this.attributes,s),{encodeValue:this.converter.write})},get:function(o){if(arguments.length===0)return $c(this.converter.read);if(o!=null)return lr(o,this.converter.read)},remove:function(o,r){_c(o,Object.assign({},this.attributes,r))},withAttributes:function(o){return dr(this.converter,Object.assign({},this.attributes,o))},withConverter:function(o){return dr(Object.assign({},this.converter,o),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(a)}};return Object.create(t,i)}dr({read:Ks.decodeValue,write:Ks.encodeValue},qr);function Sc(a,e){return a===e?!0:a.length!==e.length?!1:a.every((t,i)=>t===e[i])}class xc{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e,t=!1){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e,t)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";Po(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";Po(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=lr(`view-${this.context}`),t=lr(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e,t=!1){var i,o,r;const s=new URL(window.location.href),l=new URLSearchParams(s.searchParams),d=this.removeRecognizedParams(s.searchParams);let c=!1;if(e.baseQuery&&d.set("query",e.baseQuery),e.searchType===he.FULLTEXT?d.set("sin","TXT"):e.searchType===he.RADIO&&d.set("sin","RADIO"),l.get("sin")===""&&(l.delete("sin"),c=!0),e.currentPage&&(e.currentPage>1?d.set("page",e.currentPage.toString()):d.delete("page")),e.selectedSort){const f=Me[e.selectedSort];let w=this.sortDirectionPrefix(e.sortDirection);if(f.field===x.unrecognized){const $=(i=l.get("sort"))!==null&&i!==void 0?i:"",{field:_,direction:z}=this.getSortFieldAndDirection($);e.sortDirection||(w=this.sortDirectionPrefix(z)),_?d.set("sort",`${w}${_}`):d.set("sort",$)}else if(f.shownInURL){const $=f.urlNames[0];d.set("sort",`${w}${$}`)}}if(e.selectedFacets)for(const[f,w]of Object.entries(e.selectedFacets)){const $=Object.entries(w);if($.length!==0)for(const[_,z]of $){const D=z.state==="hidden",A=`${f}:"${_}"`;D?d.append("not[]",A):d.append("and[]",A)}}e.minSelectedDate&&e.maxSelectedDate&&d.append("and[]",`year:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&d.append("and[]",e.titleQuery),e.creatorQuery&&d.append("and[]",e.creatorQuery);let p=t?"replaceState":"pushState";const v=this.paramsMatch(l,d,["sin","sort","and[]","not[]"]);if(v&&this.paramsMatch(l,d,["query"])){if(c)d.delete("sin");else if(this.paramsMatch(l,d,["page"]))return;p="replaceState"}else v&&this.hasLegacyParam(l)&&(p="replaceState");(r=(o=window.history)[p])===null||r===void 0||r.call(o,{query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:{field:e.selectedSort,direction:e.sortDirection},minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},"",s)}loadQueryStateFromUrl(){var e;const t=new URL(window.location.href),i=t.searchParams.get("sin"),o=t.searchParams.get("page"),r=t.searchParams.get("query"),s=t.searchParams.get("sort"),l=t.searchParams.getAll("and[]"),d=t.searchParams.getAll("not[]");for(const[v,f]of t.searchParams.entries())/and\[\d+\]/.test(v)?l.push(f):/not\[\d+\]/.test(v)&&d.push(f);const c=(e=t.searchParams.get("q"))!==null&&e!==void 0?e:t.searchParams.get("search"),p={selectedFacets:lt()};switch(r?p.baseQuery=r:c&&(p.baseQuery=c),i){case"TXT":p.searchType=he.FULLTEXT;break;case"RADIO":p.searchType=he.RADIO;break;default:p.searchType=he.METADATA;break}if(o){const v=parseInt(o,10);p.currentPage=v}else p.currentPage=1;if(s){const{field:v,direction:f}=this.getSortFieldAndDirection(s),w=_l(v);p.selectedSort=w.field,["asc","desc"].includes(f)&&(p.sortDirection=f)}return l&&l.forEach(v=>{let[f,w]=v.split(":");if(f=f.replace(/Sorter$/,""),f.startsWith("-")){d.push(v.slice(1));return}switch(f){case"year":{const[$,_]=w.split(" TO ");$&&_?(p.minSelectedDate=$.substring(1,$.length),p.maxSelectedDate=_.substring(0,_.length-1)):this.setSelectedFacetState(p.selectedFacets,f,w,"selected");break}case"firstTitle":p.selectedTitleFilter=w;break;case"firstCreator":p.selectedCreatorFilter=w;break;default:this.setSelectedFacetState(p.selectedFacets,f,w,"selected")}}),d&&d.forEach(v=>{const[f,w]=v.split(":");this.setSelectedFacetState(p.selectedFacets,f,w,"hidden")}),p}getSortFieldAndDirection(e){const t=e.indexOf(" ")>-1;let i,o;return t?[i,o]=e.split(" "):(i=e.startsWith("-")?e.slice(1):e,o=e.startsWith("-")?"desc":"asc"),{field:i,direction:o}}sortDirectionPrefix(e){return e==="desc"?"-":""}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}paramsMatch(e,t,i){return i.every(o=>Sc(e.getAll(o).sort(),t.getAll(o).sort()))}removeRecognizedParams(e){e.delete("query"),e.delete("sin"),e.delete("page"),e.delete("sort"),e.delete("and[]"),e.delete("not[]");for(const t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete("q"),e.delete("search"),e}hasLegacyParam(e){return e.has("q")||e.has("search")}setSelectedFacetState(e,t,i,o){var r;const s=e[t];if(!s)return;const l=this.stripQuotes(i);(r=s[l])!==null&&r!==void 0||(s[l]=this.getDefaultBucket(i)),s[l].state=o}getDefaultBucket(e){return{key:e,count:0,state:"none"}}}const cr=["forum_posts","lending","web_archives"],Cc=new TextEncoder;async function kl(a){const e=await crypto.subtle.digest("SHA-1",Cc.encode(a));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const He=window.location&&(window.location.hostname==="localhost"||window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||window.location.host.match(/\.code\.archive\.org$/)||window.location.host.match(/\.dev\.archive\.org$/)||window.location.host.match(/^ia-petabox-/)||window.location.host.match(/^local\.archive\.org/)||window.location.host.match(/^internetarchive\.github\.io$/))?console.log.bind(console):()=>{};class kc{constructor(e,t=50){this.host=e,this.pageSize=t,this.pages={},this.offset=0,this.numTileModels=0,this.fetchesInProgress=new Set,this.previousQueryKey="",this.searchResultsLoading=!1,this.facetsLoading=!1,this.facetsReadyToLoad=!1,this.suppressFetches=!1,this.totalResults=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.collectionTitles=new Map,this.parentCollections=[],this.prefixFilterCountMap={},this._initialSearchCompletePromise=Promise.resolve(!0),this.checkAllTiles=()=>{this.map(i=>{const o=i.clone();return o.checked=!0,o})},this.uncheckAllTiles=()=>{this.map(i=>{const o=i.clone();return o.checked=!1,o})},this.removeCheckedTiles=()=>{const{checkedTileModels:i,uncheckedTileModels:o}=this,r=i.length;if(r===0)return;this.offset+=r;const s={};let l=Math.floor(this.offset/this.pageSize)+1,d=this.offset%this.pageSize;for(let c=1;c<=l;c+=1){const p=this.offset-this.pageSize*(c-1),v=Math.min(this.pageSize,p);s[c]=Array(v).fill(void 0)}for(const c of o)s[l]||(s[l]=[]),s[l].push(c),d+=1,d>=this.pageSize&&(l+=1,d=0);this.pages=s,this.numTileModels-=r,this.totalResults-=r,this.host.setTileCount(this.size),this.host.setTotalResultCount(this.totalResults),this.requestHostUpdate(),this.refreshVisibleResults()}}get initialSearchComplete(){return this._initialSearchCompletePromise}hostConnected(){this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading)}hostUpdate(){if(!this.activeOnHost||(this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading),!this.host.searchService)||!(this.pageFetchQueryKey!==this.previousQueryKey))return;const t=!this.host.baseQuery;!(this.canPerformSearch||t)||(this.activeOnHost&&this.host.emitQueryStateChanged(),this.handleQueryChange())}get activeOnHost(){return this.host.dataSource===this}get size(){return this.numTileModels}reset(){He("Resetting CB data source"),this.pages={},this.aggregations={},this.yearHistogramAggregation=void 0,this.pageElements=void 0,this.parentCollections=[],this.previousQueryKey="",this.queryErrorMessage=void 0,this.offset=0,this.numTileModels=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.facetsLoading=!1,this.fetchesInProgress.clear(),this.setTotalResultCount(0),this.requestHostUpdate()}resetPages(){Object.keys(this.pages).length<this.host.maxPagesToManage&&(this.pages={},this.fetchesInProgress.clear(),this.requestHostUpdate())}addPage(e,t){this.pages[e]=t,this.numTileModels+=t.length,this.requestHostUpdate()}addMultiplePages(e,t){const i=Math.ceil(t.length/this.pageSize);for(let s=0;s<i;s+=1){const l=this.pageSize*s;this.addPage(e+s,t.slice(l,l+this.pageSize))}this.host.currentVisiblePageNumbers.some(s=>s>=e&&s<=e+i)&&this.refreshVisibleResults()}getPage(e){return this.pages[e]}getAllPages(){return this.pages}hasPage(e){return!!this.pages[e]}getTileModelAt(e){var t,i;const o=e+this.offset,r=Math.floor(o/this.pageSize)+1,s=o%this.pageSize;let l=1,d=0;for(;d<=o;){if(!this.pages[l])return(t=this.pages[r])===null||t===void 0?void 0:t[s];if(d+this.pages[l].length>o)return this.pages[l][o-d];d+=this.pages[l].length,l+=1}return(i=this.pages[r])===null||i===void 0?void 0:i[s]}indexOf(e){return Object.values(this.pages).flat().indexOf(e)-this.offset}getPageSize(){return this.pageSize}setPageSize(e){this.reset(),this.pageSize=e}setTotalResultCount(e){this.totalResults=e,this.activeOnHost&&this.host.setTotalResultCount(e)}setFetchesSuppressed(e){this.suppressFetches=e}async handleQueryChange(){if(this.suppressFetches)return;this.reset();let e;this._initialSearchCompletePromise=new Promise(t=>{e=t}),this.queryInitialized=!0,await Promise.all([this.doInitialPageFetch(),this.canFetchFacets?this.fetchFacets():null]),e(!0)}async handleFacetReadinessChange(e){const t=!this.facetsReadyToLoad&&e;this.facetsReadyToLoad=e,t&&this.canFetchFacets&&this.fetchFacets()}get canFetchFacets(){var e;if(this.host.facetLoadStrategy==="off"||cr.includes(this.host.profileElement)||this.host.facetLoadStrategy!=="eager"&&!this.facetsReadyToLoad)return!1;const t=Object.keys((e=this.aggregations)!==null&&e!==void 0?e:{}).length>0;return!(this.facetsLoading||t)}map(e){!Object.keys(this.pages).length||(this.pages=Object.fromEntries(Object.entries(this.pages).map(([t,i])=>[t,i.map((o,r,s)=>o&&e(o,r,s))])),this.requestHostUpdate(),this.refreshVisibleResults())}get checkedTileModels(){return this.getFilteredTileModels(e=>e.checked)}get uncheckedTileModels(){return this.getFilteredTileModels(e=>!e.checked)}getFilteredTileModels(e){return Object.values(this.pages).flat().filter((t,i,o)=>t?e(t,i,o):!1)}get canPerformSearch(){var e;if(!this.host.searchService)return!1;const i=!!((e=this.host.baseQuery)===null||e===void 0?void 0:e.trim()),o=!!this.host.withinCollection,r=!!this.host.withinProfile,s=!!this.host.profileElement,l=this.host.searchType===he.METADATA;return i||o&&l||r&&s&&l}setSearchResultsLoading(e){this.searchResultsLoading=e,this.activeOnHost&&this.host.setSearchResultsLoading(e)}setFacetsLoading(e){this.facetsLoading=e,this.activeOnHost&&this.host.setFacetsLoading(e)}requestHostUpdate(){this.activeOnHost&&this.host.requestUpdate()}refreshVisibleResults(){this.activeOnHost&&this.host.refreshVisibleResults()}get pageFetchQueryKey(){var e,t,i;const o=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,r=(e=this.host.withinCollection)!==null&&e!==void 0?e:o,s=(t=this.host.selectedSort)!==null&&t!==void 0?t:"none",l=(i=this.host.sortDirection)!==null&&i!==void 0?i:"none";return`fq:${this.fullQuery}-pt:${r}-st:${this.host.searchType}-sf:${s}-sd:${l}`}get facetFetchQueryKey(){var e;const t=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,i=(e=this.host.withinCollection)!==null&&e!==void 0?e:t;return`fq:${this.fullQuery}-pt:${i}-st:${this.host.searchType}`}get filterMap(){const e=new Vd;if(this.host.minSelectedDate&&e.addFilter("year",this.host.minSelectedDate,ut.GREATER_OR_EQUAL),this.host.maxSelectedDate&&e.addFilter("year",this.host.maxSelectedDate,ut.LESS_OR_EQUAL),this.host.selectedFacets)for(const[i,o]of Object.entries(this.host.selectedFacets)){const{name:r,values:s}=this.prepareFacetForFetch(i,o);for(const[l,d]of Object.entries(s)){let c;d.state==="selected"?c=ut.INCLUDE:d.state==="hidden"&&(c=ut.EXCLUDE),c&&e.addFilter(r,l,c)}}return this.host.selectedTitleFilter&&e.addFilter("firstTitle",this.host.selectedTitleFilter,ut.INCLUDE),this.host.selectedCreatorFilter&&e.addFilter("firstCreator",this.host.selectedCreatorFilter,ut.INCLUDE),e.build()}async requestUID(e,t){var i;const o=JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.host.searchType}),r=(await kl(o)).slice(0,20),s=(await this.host.getSessionId()).slice(0,20),l=(i=e.page)!==null&&i!==void 0?i:0,d=t.charAt(0),c=Date.now();return`R:${r}-S:${s}-P:${l}-K:${d}-T:${c}`}get pageSpecifierParams(){return this.host.withinCollection?{pageType:"collection_details",pageTarget:this.host.withinCollection}:this.host.withinProfile?{pageType:"account_details",pageTarget:this.host.withinProfile,pageElements:this.host.profileElement?[this.host.profileElement]:[]}:null}get fullQuery(){var e,t;let i=(t=(e=this.host.baseQuery)===null||e===void 0?void 0:e.trim())!==null&&t!==void 0?t:"";const{facetQuery:o,dateRangeQueryClause:r,sortFilterQueries:s}=this;return o&&(i+=` AND ${o}`),r&&(i+=` AND ${r}`),s&&(i+=` AND ${s}`),i.trim()}get facetQuery(){var e;if(!this.host.selectedFacets)return;const t=[];for(const[i,o]of Object.entries(this.host.selectedFacets))t.push(this.buildFacetClause(i,o));return(e=this.joinFacetClauses(t))===null||e===void 0?void 0:e.trim()}get dateRangeQueryClause(){if(!(!this.host.minSelectedDate||!this.host.maxSelectedDate))return`year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get titleQuery(){return this.host.selectedTitleFilter?`firstTitle:${this.host.selectedTitleFilter}`:void 0}get creatorQuery(){return this.host.selectedCreatorFilter?`firstCreator:${this.host.selectedCreatorFilter}`:void 0}buildFacetClause(e,t){const{name:i,values:o}=this.prepareFacetForFetch(e,t),r=Object.entries(o);if(r.length===0)return"";const s=[];for(const[d,c]of r){const p=c.state==="hidden"?"-":"";s.push(`${p}"${d}"`)}const l=s.join(" OR ");return`${i}:(${l})`}prepareFacetForFetch(e,t){let[i,o]=[e,t];return e==="lending"&&(i="lending___status"),{name:i,values:o}}joinFacetClauses(e){const t=e.filter(i=>i.length>0);return t.length>0?`(${t.join(" AND ")})`:void 0}async fetchFacets(){var e,t,i,o,r,s,l,d,c;const p=(e=this.host.baseQuery)===null||e===void 0?void 0:e.trim();if(!this.canPerformSearch)return;const{facetFetchQueryKey:v}=this;if(this.fetchesInProgress.has(v))return;this.fetchesInProgress.add(v),this.setFacetsLoading(!0);const f=this.host.sortParam?[this.host.sortParam]:[],w=ae(j({},this.pageSpecifierParams),{query:p||"",rows:0,filters:this.filterMap,aggregationsSize:10});w.uid=await this.requestUID(ae(j({},w),{sort:f}),"aggregations");const $=await((t=this.host.searchService)===null||t===void 0?void 0:t.search(w,this.host.searchType)),_=$==null?void 0:$.success,z=!this.fetchesInProgress.has(v);if(this.fetchesInProgress.delete(v),z)return;if(!_){const R=(i=$==null?void 0:$.error)===null||i===void 0?void 0:i.message,O=(r=(o=$==null?void 0:$.error)===null||o===void 0?void 0:o.details)===null||r===void 0?void 0:r.message;!R&&!O&&((l=(s=window==null?void 0:window.Sentry)===null||s===void 0?void 0:s.captureMessage)===null||l===void 0||l.call(s,"Missing or malformed facet response from backend","error")),this.setFacetsLoading(!1);return}const{aggregations:D,collectionTitles:A}=_.response;if(this.aggregations=D,A)for(const[R,O]of Object.entries(A))this.collectionTitles.set(R,O);this.yearHistogramAggregation=(c=(d=_==null?void 0:_.response)===null||d===void 0?void 0:d.aggregations)===null||c===void 0?void 0:c.year_histogram,this.setFacetsLoading(!1),this.requestHostUpdate()}async doInitialPageFetch(){this.setSearchResultsLoading(!0),await this.fetchPage(this.host.initialPageNumber,2)}async fetchPage(e,t=1){var i,o,r,s,l,d,c,p,v,f,w;const $=(i=this.host.baseQuery)===null||i===void 0?void 0:i.trim();if(!this.canPerformSearch||this.hasPage(e)||this.endOfDataReached)return;let _=e===1?t:1;const z=this.pageSize*_,{pageFetchQueryKey:D}=this,A=`${D}-p:${e}`;if(this.fetchesInProgress.has(A))return;for(let X=0;X<_;X+=1)this.fetchesInProgress.add(`${D}-p:${e+X}`);this.previousQueryKey=D;const{withinCollection:R,withinProfile:O}=this.host;let W=this.host.sortParam?[this.host.sortParam]:[];if(O&&this.host.selectedSort===x.default&&this.host.defaultSortField){const X=Me[this.host.defaultSortField];X.searchServiceKey&&(W=[{field:X.searchServiceKey,direction:"desc"}])}const xe=ae(j({},this.pageSpecifierParams),{query:$||"",page:e,rows:z,sort:W,filters:this.filterMap,aggregations:{omit:!0}});xe.uid=await this.requestUID(xe,"hits");const de=await((o=this.host.searchService)===null||o===void 0?void 0:o.search(xe,this.host.searchType)),Pe=de==null?void 0:de.success;if(!this.fetchesInProgress.has(A))return;for(let X=0;X<_;X+=1)this.fetchesInProgress.delete(`${D}-p:${e+X}`);if(!Pe){const X=(r=de==null?void 0:de.error)===null||r===void 0?void 0:r.message,fe=(l=(s=de==null?void 0:de.error)===null||s===void 0?void 0:s.details)===null||l===void 0?void 0:l.message;this.queryErrorMessage=`${X!=null?X:""}${fe?`; ${fe}`:""}`,this.queryErrorMessage||(this.queryErrorMessage="Missing or malformed response from backend",(c=(d=window==null?void 0:window.Sentry)===null||d===void 0?void 0:d.captureMessage)===null||c===void 0||c.call(d,this.queryErrorMessage,"error")),this.setSearchResultsLoading(!1),this.requestHostUpdate();return}this.setTotalResultCount(Pe.response.totalResults-this.offset),this.activeOnHost&&this.totalResults===0&&this.host.emitEmptyResults(),this.sessionContext=Pe.sessionContext,R?(this.collectionExtraInfo=Pe.response.collectionExtraInfo,this.activeOnHost&&this.host.applyDefaultCollectionSort(this.collectionExtraInfo),this.collectionExtraInfo&&(this.parentCollections=[].concat((v=(p=this.collectionExtraInfo.public_metadata)===null||p===void 0?void 0:p.collection)!==null&&v!==void 0?v:[]))):O&&(this.accountExtraInfo=Pe.response.accountExtraInfo,this.pageElements=Pe.response.pageElements);const{results:Ie,collectionTitles:$e}=Pe.response;if(Ie&&Ie.length>0){if($e){for(const[Oe,_t]of Object.entries($e))this.collectionTitles.set(Oe,_t);const fe=(w=(f=this.collectionExtraInfo)===null||f===void 0?void 0:f.public_metadata)===null||w===void 0?void 0:w.title;R&&fe&&this.collectionTitles.set(R,fe)}const X=["lending","web_archives"].includes(this.host.profileElement);X&&(_=Math.ceil(Ie.length/this.pageSize),this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.totalResults));for(let fe=0;fe<_;fe+=1){const Oe=this.pageSize*fe;this.addFetchedResultsToDataSource(e+fe,Ie.slice(Oe,Oe+this.pageSize),!X||fe===_-1)}}(this.size>=this.totalResults||Ie.length===0)&&(this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.size)),this.setSearchResultsLoading(!1),this.requestHostUpdate()}addFetchedResultsToDataSource(e,t,i=!0){const o=[];t==null||t.forEach(r=>{!r.identifier||o.push(new Mo(r))}),this.addPage(e,o),i&&this.refreshVisibleResults()}async fetchPrefixFilterBuckets(e){var t,i,o,r,s,l,d;const c=(t=this.host.baseQuery)===null||t===void 0?void 0:t.trim();if(!this.canPerformSearch)return[];const p=mc[e],v=this.host.sortParam?[this.host.sortParam]:[],f=ae(j({},this.pageSpecifierParams),{query:c||"",rows:0,filters:this.filterMap,aggregations:{simpleParams:[p]},aggregationsSize:26});f.uid=await this.requestUID(ae(j({},f),{sort:v}),"aggregations");const w=await((i=this.host.searchService)===null||i===void 0?void 0:i.search(f,this.host.searchType));return(d=(l=(s=(r=(o=w==null?void 0:w.success)===null||o===void 0?void 0:o.response)===null||r===void 0?void 0:r.aggregations)===null||s===void 0?void 0:s[p])===null||l===void 0?void 0:l.buckets)!==null&&d!==void 0?d:[]}async updatePrefixFilterCounts(e){const{facetFetchQueryKey:t}=this,i=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap=j({},this.prefixFilterCountMap),this.prefixFilterCountMap[e]=i.reduce((r,s)=>(r[s.key.toUpperCase()]=s.doc_count,r),{}),this.requestHostUpdate())}async updatePrefixFiltersForCurrentSort(){if(["title","creator"].includes(this.host.selectedSort)){const e=this.host.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort(),this.requestHostUpdate()}}var Ze;(function(a){a.default="collection-browser"})(Ze||(Ze={}));var ie;(function(a){a.sortBy="sortBy",a.filterByCreator="filterByCreator",a.filterByTitle="filterByTitle",a.displayMode="displayMode",a.loadDesktopView="loadDesktopView",a.loadMobileView="loadMobileView",a.facetSelected="facetSelected",a.facetDeselected="facetDeselected",a.facetNegativeSelected="facetNegativeSelected",a.facetNegativeDeselected="facetNegativeDeselected",a.mobileFacetsToggled="mobileFacetsToggled",a.partOfCollectionClicked="partOfCollectionClicked",a.histogramChanged="histogramChanged",a.histogramChangedFromModal="histogramChangedFromModal",a.histogramExpanded="histogramExpanded",a.resultSelected="resultSelected",a.moreFacetsPageChange="moreFacetsPageChange",a.showMoreFacetsModal="showMoreFacetsModal",a.closeMoreFacetsModal="closeMoreFacetsModal",a.applyMoreFacetsModal="applyMoreFacetsModal"})(ie||(ie={}));var hr=H`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`;const pt=g`
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    margin: -1px !important;
    padding: 0 !important;
    border: 0 !important;
    overflow: hidden !important;
    white-space: nowrap !important;
    clip: rect(1px, 1px, 1px, 1px) !important;
    -webkit-clip-path: inset(50%) !important;
    clip-path: inset(50%) !important;
    user-select: none !important;
  }
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tc=(a,e,t)=>{for(const i of e)if(i[0]===a)return(0,i[1])();return t==null?void 0:t()};var Ec=H`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,mo=H`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`,Ke;let Le=Ke=class extends B{constructor(){super(...arguments),this.placeholderType=null,this.detailMessage=""}render(){return this.placeholderType?h`${this.placeholderTemplate}`:b}get placeholderTemplate(){return h`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?"mobile":"desktop"}"
      >
        ${Tc(this.placeholderType,[["empty-query",()=>this.emptyQueryTemplate],["empty-collection",()=>this.emptyCollectionTemplate],["no-results",()=>this.noResultsTemplate],["query-error",()=>this.queryErrorTemplate],["collection-error",()=>this.collectionErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return h`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${Ke.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${Ec}</div>
    `}get emptyCollectionTemplate(){return h`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${Ke.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${mo}</div>
    `}get noResultsTemplate(){return h`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection?Ke.MESSAGE_NO_COLLECTION_RESULTS:Ke.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${mo}</div>
    `}get queryErrorTemplate(){return h`
      <h2 class="title" data-testid="error-query-text-msg">
        ${Ke.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${mo}</div>
      <p class="error-details">
        ${Ke.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}get collectionErrorTemplate(){return h`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${Ke.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${mo}</div>
      <p class="error-details">
        ${Ke.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return g`
      :host {
        text-align: center;
        width: 100%;
      }

      a {
        text-decoration: none;
      }
      a:link {
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }

      .placeholder {
        display: block;
      }

      .desktop svg {
        max-height: 40rem;
      }
      .desktop .title,
      .desktop .error-details {
        margin: 4rem 0;
      }

      .mobile svg {
        max-height: 20rem;
      }
      .mobile .title,
      .mobile .error-details {
        margin: 2rem 0.5;
      }

      .error-details {
        font-size: 1.2rem;
        word-break: break-word;
      }
    `}};Le.MESSAGE_EMPTY_QUERY=k('To begin searching, enter a search term in the box above and hit "Go".');Le.MESSAGE_NO_SEARCH_RESULTS=k("Your search did not match any items in the Archive. Try different keywords or a more general search.");Le.MESSAGE_NO_COLLECTION_RESULTS=k("Your search did not match any items in this collection. Try different keywords or a more general search.");Le.MESSAGE_NO_VIEWABLE_MEMBERS=k("This collection contains no viewable items.");Le.MESSAGE_QUERY_ERROR=k(h`The search engine
    encountered an error, which might be related to your search query.
    <a
      href="https://help.archive.org/help/search-building-powerful-complex-queries/"
    >
      Tips for constructing search queries.
    </a> `);Le.MESSAGE_COLLECTION_ERROR=k(h`The search engine
    encountered an error while loading this collection. If the problem persists,
    please let us know at
    <a href="mailto:info@archive.org">info@archive.org</a>.`);Le.QUERY_ERROR_DETAILS_MESSAGE=k("Error details:");n([u({type:String})],Le.prototype,"placeholderType",void 0);n([u({type:Boolean})],Le.prototype,"isMobileView",void 0);n([u({type:Boolean})],Le.prototype,"isCollection",void 0);n([u({type:String})],Le.prototype,"detailMessage",void 0);Le=Ke=n([F("empty-placeholder")],Le);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qr=a=>a!=null?a:b,Tl=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;var pr;(function(a){a[a.bytes=0]="bytes",a[a.kilobytes=1]="kilobytes",a[a.megabytes=2]="megabytes",a[a.gigabytes=3]="gigabytes",a[a.terabytes=4]="terabytes",a[a.petabytes=5]="petabytes",a[a.exabytes=6]="exabytes",a[a.zettabytes=7]="zettabytes",a[a.yottabytes=8]="yottabytes"})(pr||(pr={}));function Mc(a,e,t=" "){let i=a;if(i===void 0)return b;let o=0;for(;i>1024;)i/=1024,o+=1;const r=10**e;i=Math.round(i*r)/r;let s=pr[o];return s=i===1?s.slice(0,-1):s,`${i.toLocaleString()+t+s}`}const Ac=g`var(--tileBackgroundColor, #ffffff)`,zc=g`var(--tileCornerRadius, 4px)`,Xo=g`
  /* Include .sr-only styles for all tiles */
  ${pt}

  .container {
    background-color: ${Ac};
    border: 1px #2c2c2c;
    border-radius: ${zc};
    box-shadow: 1px 1px 2px 0;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  image-block {
    display: block;
    position: relative;
    text-align: center;
  }

  .tile-details {
    display: flex;
    flex-direction: column;
    height: 100%;
    row-gap: 10px;
    font-family: 'Helvetica Neue', ui-sans-serif, system-ui, sans-serif;
  }

  .item-info {
    display: flex;
    flex-direction: column;
    row-gap: 5px;
    flex-grow: 1;
  }

  #title {
    padding: 0 5px;
  }

  .created-by,
  .date-sorted-by,
  .volume-issue,
  .archivist-since {
    display: flex;
    justify-content: left;
    align-items: flex-start;
    padding: 0 5px;
  }

  .truncated {
    flex: 1;
    color: #2c2c2c;
    min-width: 0; /* Important for long words! */
    text-align: left;
    line-height: 15px;
    text-overflow: ellipsis;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  h4.truncated {
    display: -webkit-box;
    margin: 0px;
    line-height: 15px;
    font-size: 14px;
    font-weight: 500;
    padding-bottom: 1px;
  }

  span {
    display: -webkit-box;
    font-size: 1.4rem;
    line-height: 15px;
    overflow: hidden;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-bottom: 1px;
  }

  .container:hover > .tile-details > .item-info > #title > .truncated {
    text-decoration: underline;
  }

  /** this is a workaround for Safari 15 where the hover effects are not working */
  #title:hover > .truncated {
    text-decoration: underline;
  }

  .info-button {
    position: absolute;
    right: 10px;
    top: 10px;
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(220, 220, 220, 0.5);
    color: white;
    font-size: 2rem;
    font-weight: bold;
    line-height: 1;
    text-shadow: black 1px 1px 3px;
    overflow: visible;
    aspect-ratio: 1 / 1;
    z-index: 1;
  }

  .hidden {
    display: none;
  }
`;function Qi(a,e="short",t="en-US"){if(!a)return"";const i={};switch(e){case"year-only":return`${a.getUTCFullYear()}`;case"short":i.month="short",i.year="numeric";break;case"long":i.year="numeric",i.month="short",i.day="2-digit";break}return new Intl.DateTimeFormat(t,i).format(a)}class Gs{constructor(e={}){var t;this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=(t=e.collectionPagePath)!==null&&t!==void 0?t:"/details/",this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){var e,t;let i;if(this.creatorFilter&&((e=this.model)===null||e===void 0?void 0:e.creators.length)){const o=this.creatorFilter;i=this.model.creators.find(r=>r.normalize("NFD").replace(/[^A-Z]+/gi,"").toUpperCase().startsWith(o))}return i!=null?i:(t=this.model)===null||t===void 0?void 0:t.creator}get accountLabel(){var e;return!((e=this.model)===null||e===void 0)&&e.dateAdded?k(Et`Archivist since ${this.model.dateAdded.getFullYear()}`):""}get dateLabel(){var e;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"publicdate":return k("Archived");case"reviewdate":return k("Reviewed");case"addeddate":return k("Added");case"date":return k("Published");default:return""}}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return b;const i=t?this.collectionPagePath:"/details/";return`${this.baseNavigationUrl}${i}${e}`}webArchivesCaptureLink(e,t){const o=`https://web.archive.org/web/${t.toISOString().replace(/[TZ:-]/g,"").replace(/\..*/,"")}/${encodeURIComponent(e)}`,r=Qi(t,"long");return h` <a href=${o}> ${r} </a> `}}class ge extends B{constructor(){super(...arguments),this.sortParam=null,this.defaultSortParam=null,this.loggedIn=!1,this.displayValueProvider=new Gs}willUpdate(e){var t,i;(e.has("model")||e.has("baseNavigationUrl")||e.has("collectionPagePath")||e.has("sortParam")||e.has("defaultSortParam")||e.has("creatorFilter"))&&(this.displayValueProvider=new Gs({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:(i=(t=this.sortParam)!==null&&t!==void 0?t:this.defaultSortParam)!==null&&i!==void 0?i:void 0,creatorFilter:this.creatorFilter}))}}n([u({type:Object})],ge.prototype,"model",void 0);n([u({type:Number})],ge.prototype,"currentWidth",void 0);n([u({type:Number})],ge.prototype,"currentHeight",void 0);n([u({type:String})],ge.prototype,"baseNavigationUrl",void 0);n([u({type:String})],ge.prototype,"baseImageUrl",void 0);n([u({type:String})],ge.prototype,"collectionPagePath",void 0);n([u({type:Object})],ge.prototype,"sortParam",void 0);n([u({type:Object})],ge.prototype,"defaultSortParam",void 0);n([u({type:String})],ge.prototype,"creatorFilter",void 0);n([u({type:Number})],ge.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],ge.prototype,"loggedIn",void 0);let ur=class extends B{render(){return h`<div class="icon-overlay">${this.iconTemplate}</div>`}get iconTemplate(){var e;return this.type?h`${(e=$l[this.type])!==null&&e!==void 0?e:b}`:b}static get styles(){return g`
      :host {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        z-index: 2;
        background-color: rgb(255, 254, 203);
        display: flex;
        justify-content: center;
        border: 1px solid #2c2c2c;
      }

      .icon-overlay {
        height: 20px;
        width: 20px;
        padding: 2px;
        padding: 2px;
      }

      :host(.list-detail) .icon-overlay {
        height: 20px;
        width: 20px;
      }
      :host(.list-compact) .icon-overlay {
        height: 15px;
        width: 15px;
      }
    `}};n([u({type:String})],ur.prototype,"type",void 0);ur=n([F("icon-overlay")],ur);let vr=class extends B{render(){return h`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `}get iconTemplate(){var e;return this.type?h`${(e=$l[this.type])!==null&&e!==void 0?e:b}`:b}get textTemplate(){var e;return this.type?h`${(e=vc[this.type])!==null&&e!==void 0?e:b}`:b}static get styles(){return g`
      :host {
        align-items: center;
        display: flex;
      }

      .overlay {
        border: 1px solid #2c2c2c;
        border-radius: 1px;
        position: absolute;
        right: 0;
        left: 0;
        top: 50%;
        transform: translate(0px, -50%);
        width: auto;
        height: auto;
        padding: 5px;
        background-color: #fffecb;
        display: flex;
        align-items: center;
        border-radius: 1px;
      }

      .icon-overlay {
        width: 40px;
        height: 40px;
        display: inherit;
      }
      .text-overlay {
        margin: 0;
        vertical-align: bottom;
        padding-left: 5px;
        text-align: center;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `}};n([u({type:String})],vr.prototype,"type",void 0);vr=n([F("text-overlay")],vr);let bt=class extends B{constructor(){super(...arguments),this.isCompactTile=!1,this.isListTile=!1,this.loggedIn=!1,this.viewSize="desktop"}render(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?h`
      <div class=${ni(this.baseClass)}>
        <item-image
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isListTile=${this.isListTile}
          .isCompactTile=${this.isCompactTile}
          .loggedIn=${this.loggedIn}
          style="--imgHeight: 100%; --imgWidth: 100%"
        >
        </item-image>
        ${this.textOverlayTemplate} ${this.iconOverlayTemplate}
      </div>
    `:b}get baseClass(){var e,t;return{container:!0,list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:((e=this.model)===null||e===void 0?void 0:e.mediatype)==="collection",[this.viewSize]:!0,"search-image":((t=this.model)===null||t===void 0?void 0:t.mediatype)==="search"}}get iconOverlayTemplate(){if(!this.isListTile)return b;const{overlayType:e}=this;return e?h`
      <icon-overlay
        class=${this.isCompactTile?"list-compact":"list-detail"}
        .type=${this.overlayType}
      >
      </icon-overlay>
    `:b}get textOverlayTemplate(){if(this.isListTile)return b;const{overlayType:e}=this;return e?h` <text-overlay .type=${this.overlayType}></text-overlay> `:b}get overlayType(){var e,t;if(((e=this.model)===null||e===void 0?void 0:e.loginRequired)&&!this.loggedIn)return"login-required";if(!((t=this.model)===null||t===void 0)&&t.contentWarning)return"content-warning"}static get styles(){const e=g`var(--imageBlockBackgroundColor, #f1f1f4)`;return g`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${e};
        border-radius: 4px;
      }

      .grid {
        height: var(--imgBlockHeight, 16rem);
        flex: 1;
        position: initial;
        padding: 5px;
        border-radius: 4px 4px 0 0;
      }

      .collection.grid,
      .grid.search-image {
        display: block;
      }

      /** tile-list view */
      .list {
        border-radius: 0;
        background-color: var(--imageBlockListBackgroundColor, #ebebee);
        box-shadow: 1px 1px 2px rgb(0, 0, 0, 0.2);
      }

      .list.desktop {
        width: 100px;
        max-width: 100%;
        height: 100px;
        max-width: 100%;
        display: inline-block;
        position: relative;
        text-align: center;
      }

      .list.mobile {
        width: var(--image-width, 90px);
        height: 90px;
      }

      /** tile-list-compact view */
      .container.list-compact {
        display: block;
        text-align: center;
      }

      .list-compact.desktop {
        width: 45px;
        height: 45px;
      }

      .list-compact.mobile {
        width: 30px;
        height: 30px;
      }
    `}};n([u({type:String})],bt.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],bt.prototype,"isCompactTile",void 0);n([u({type:Boolean})],bt.prototype,"isListTile",void 0);n([u({type:Boolean})],bt.prototype,"loggedIn",void 0);n([u({type:Object})],bt.prototype,"model",void 0);n([u({type:String})],bt.prototype,"viewSize",void 0);bt=n([F("image-block")],bt);let fr=class extends ge{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `}get getImageBlockTemplate(){return h`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get getTitleTemplate(){var e;return h`<div id="title">
      <h4 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.title}</h4>
    </div>`}get getTileStatsTemplate(){return h`
      <div id="item-stats">
        <div id="item-mediatype">${Tl}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.itemCount)===null||t===void 0?void 0:t.toLocaleString();return h`<span id="item-count"
      >${i} item${Number(i)!==1?"s":""}</span
    >`}get getSizeTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.collectionSize)!==null&&t!==void 0?t:0;return i?h`<span id="item-size">${Mc(i,1)}</span>`:""}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${k("More info")}</span>
        </button>`:b}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=g`var(--tileBorderColor, #555555)`,t=g`var(--tileBackgroundColor, #666666)`,i=g`#fff`;return[Xo,g`
        .container {
          background-color: ${t};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated {
          color: ${i};
        }

        #item-mediatype svg {
          filter: invert(100%);
          height: 2.5rem;
          align-items: baseline;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }

        #item-stats {
          display: flex;
          padding: 0 5px 5px;
          align-items: center;
        }

        #stats-row {
          display: flex;
          align-items: baseline;
          color: ${i};
          flex-direction: column;
          margin-left: 10px;
        }
      `]}};n([u({type:Boolean})],fr.prototype,"showInfoButton",void 0);fr=n([F("collection-tile")],fr);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Dt(a,e){if(a!==void 0){let t=0;for(const i of a)yield e(i,t++)}}function Pc(a){return new Date(a.getTime()-a.getTimezoneOffset()*1e3*60)}function Kr(a){return a?Pc(a).toISOString().endsWith("-01-01T00:00:00.000Z"):!1}const El=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
  </svg>
`,Dc=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m69.0481858 61.4006179 13.2757509 38.38311-32.1794134-24.4730516-32.2508245 24.6893237 13.2757507-38.4552008-31.1694495-21.9945074 38.1677832-.5115002 11.8339172-39.0387916 11.6162817 38.8946104 38.3820179.6556814zm-2.8122554 15.58874-6.7092871-19.2276004 18.0365221-11.7267421-21.6445066.5115-5.9169584-19.5914862-5.9169587 19.5914862-21.6445064-.5115 18.036522 11.7267421-6.5664638 19.3752146 16.0880061-12.3824233z"
    />
  </svg>
`;let li=class extends B{constructor(){super(...arguments),this.title="",this.body="",this.starRating=0,this.viewSize="desktop"}render(){return!this.title&&!this.body&&!this.starRating?b:h`
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.title}</p>
          <p class="review-body">${this.body}</p>
        </div>
      </div>
    `}get starsTemplate(){if(this.starRating<=0)return b;const e=Math.min(5,this.starRating),t=Math.min(5,5-this.starRating);return h`
      <div class="star-rating">
        <span class="sr-only">${this.starRating} ${k("out of 5 stars")}</span>
        ${Array(e).fill(this.filledStarTemplate)}
        ${Array(t).fill(this.unfilledStarTemplate)}
      </div>
    `}get filledStarTemplate(){return h`<span aria-hidden="true">${El}</span>`}get unfilledStarTemplate(){return h`
      <span class="unfilled-star" aria-hidden="true">
        ${Dc}
      </span>
    `}static get styles(){return[pt,g`
        .review-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: calc(100% - 10px);
          border: 1px solid #ccc;
          margin-top: var(--containerTopMargin, 10px);
          margin-left: var(--containerLeftMargin, 0px);
          padding: 5px;
          box-sizing: border-box;
        }

        .review-title,
        .review-body {
          display: -webkit-box;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          overflow: hidden;
          overflow-wrap: break-word;
          word-break: break-word;
          -webkit-line-clamp: var(--maxLines, 3);
          -webkit-box-orient: vertical;
          margin: 0;
        }

        .review-title {
          font-size: 1.4rem;
          line-height: 2rem;
          max-height: 6rem;
        }

        .review-title > a[href] {
          color: inherit;
          text-decoration: none;
        }

        .review-title > a[href]:hover {
          text-decoration: underline;
        }

        .review-body {
          font-size: 1rem;
          line-height: 1.4rem;
          max-height: 4.2rem;
        }

        .star-rating svg {
          width: 10px;
          height: 10px;
        }

        .unfilled-star {
          fill: #ccc;
        }

        .list {
          margin: 0;
          padding-left: 5px;
        }
      `]}};n([u({type:String})],li.prototype,"title",void 0);n([u({type:String})],li.prototype,"body",void 0);n([u({type:Number})],li.prototype,"starRating",void 0);n([u({type:String})],li.prototype,"viewSize",void 0);li=n([F("review-block")],li);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*wo(a,e){const t=typeof e=="function";if(a!==void 0){let i=-1;for(const o of a)i>-1&&(yield t?e(i):e),i++,yield o}}let Do=class extends B{constructor(){super(...arguments),this.snippets=[],this.viewSize="desktop"}render(){var e;return!((e=this.snippets)===null||e===void 0)&&e.length?h`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:h`${b}`}get ellipsisJoinedSnippets(){return h`
      &hellip; ${wo(this.snippetTemplates,h` &hellip; `)} &hellip;
    `}get snippetTemplates(){var e;return(e=this.snippets)===null||e===void 0?void 0:e.map(t=>{const i=t.matchAll(/{{{(.+?)}}}/gs),o=[];let r=0;for(const s of i)s.index!=null&&(o.push(h`
            ${t.slice(r,s.index)}
            <mark>${s[1]}</mark>
          `),r=s.index+s[0].length);return o.push(h`${t.slice(r)}`),h`<span>${o}</span>`})}static get styles(){return g`
      .container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: calc(100% - 10px);
        border-left: 5px solid #194880;
        margin-top: var(--containerTopMargin, 10px);
        margin-left: var(--containerLeftMargin, 0px);
        border-radius: 3px;
        box-sizing: border-box;
      }

      .snippet-view {
        display: -webkit-box;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        overflow: hidden;
        overflow-wrap: break-word;
        -webkit-line-clamp: var(--maxLines, 3);
        -webkit-box-orient: vertical;
        margin-left: 5px;
      }

      .grid {
        font-size: 1.2rem;
        line-height: 1.5rem;
      }

      .list {
        margin: 0;
        padding-left: 15px;
        font-size: 1.4rem;
        line-height: 2rem;

        /*
         * Safari doesn't always respect the line-clamping rules,
         * so we add this to ensure these fields still get truncated.
         */
        max-height: 6rem;
      }

      mark {
        /* blue, 20% transparency */
        background-color: #0000ff33;
        color: inherit;
      }
    `}};n([u({type:Array})],Do.prototype,"snippets",void 0);n([u({type:String})],Do.prototype,"viewSize",void 0);Do=n([F("text-snippet-block")],Do);const Lc=g`
  .drop-shadow {
    overflow: hidden;
    height: 100%;
  }

  .list-box {
    overflow: hidden;
    box-sizing: border-box;
    display: inline-block;
    position: relative;
  }

  .list-box img {
    border-radius: 0;
  }

  .contain {
    object-fit: contain;
    object-position: center;
    height: 100%;
    width: 100%;
  }

  .cover {
    object-fit: cover;
  }

  .blur {
    filter: blur(15px);
    box-shadow: 1px 1px 2px 0;
  }

  .account-image {
    object-fit: cover;
    background-position: 50% 50%;
    border-radius: 50%;
    width: 160px;
    height: 160px;
  }

  :not(.list-box) > .collection-image {
    object-fit: cover;
    border-radius: 8px;
    width: 100%;
    height: 160px;
  }

  .list-box.search-image svg {
    margin: 10px;
  }
`,Rc=g`
  .waveform {
    mix-blend-mode: screen;
    position: relative;
    height: 62.5%;
    top: 50%;
    transform: translateY(-50%);
  }

  .waveform-grad0 {
    background: linear-gradient(
      hsl(300, 80%, 55%),
      hsl(330, 80%, 33%) 35%,
      hsl(330, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad1 {
    background: linear-gradient(
      hsl(200, 80%, 55%),
      hsl(230, 80%, 33%) 35%,
      hsl(230, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad2 {
    background: linear-gradient(
      hsl(160, 80%, 55%),
      hsl(190, 80%, 33%) 35%,
      hsl(190, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad3 {
    background: linear-gradient(
      hsl(250, 80%, 55%),
      hsl(280, 80%, 33%) 35%,
      hsl(280, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad4 {
    background: linear-gradient(
      hsl(280, 80%, 55%),
      hsl(310, 80%, 33%) 35%,
      hsl(310, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad5 {
    background: linear-gradient(
      hsl(340, 80%, 55%),
      hsl(0, 80%, 33%) 35%,
      hsl(0, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }
`,Ml=H`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m17.0555551 41.3194459c0-12.7430552 10.3541664-23.1027772 23.0847216-23.1027772 12.7166664 0 23.0777773 10.359722 23.0777773 23.1027772 0 12.7361108-10.3611109 23.0986106-23.0777773 23.0986106-12.7305552 0-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512 0c0 22.2916661 18.04583292 40.3472213 40.32777672 40.3472213 8.9208332 0 17.145833-2.9319449 23.8194439-7.8527776l24.1513883 24.0777771c1.2125 1.1402778 2.8430555 1.8430556 4.6374999 1.8430556 3.7444443 0 6.7805554-3.0361111 6.7805554-6.7791665 0-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665 7.0152776-14.3055552 7.0152776-22.7402772 0-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438 0-40.32777672 18.06944396-40.32777672 40.34861006z"
      fill="#2c2c2c"
      fill-rule="evenodd"
    />
  </svg>
`;let Je=class extends B{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.isWaveform=!1,this.isNotFound=!1}render(){return h`
      <div class=${ni(this.itemBaseClass)}>${this.imageTemplate}</div>
    `}get imageTemplate(){var e;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="search"?h`${Ml}`:h`
      <img
        class=${ni(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `}get imageSrc(){var e,t;if(this.isNotFound)return this.notFoundSrc;if(((e=this.model)===null||e===void 0?void 0:e.captureDates)&&this.model.identifier)try{const i=new URL(this.model.identifier),o=encodeURIComponent(i.hostname);return this.baseImageUrl?`https://web.archive.org/thumb/${o}?generate=1`:b}catch{return`${this.baseImageUrl}/images/notfound.png`}return this.baseImageUrl&&((t=this.model)===null||t===void 0?void 0:t.identifier)?`${this.baseImageUrl}/services/img/${this.model.identifier}`:b}get notFoundSrc(){return this.baseImageUrl?`${this.baseImageUrl}/images/notfound.png`:b}get hashBasedGradient(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(e){return e.split("").reduce((t,i)=>t+i.charCodeAt(0),0)}get itemBaseClass(){var e;return{"drop-shadow":!0,"list-box":this.isListTile,"search-image":((e=this.model)===null||e===void 0?void 0:e.mediatype)==="search",[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var e,t,i;const o=((e=this.model)===null||e===void 0?void 0:e.contentWarning)||((t=this.model)===null||t===void 0?void 0:t.loginRequired);return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:o||!1,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":((i=this.model)===null||i===void 0?void 0:i.mediatype)==="collection"}}get isAccountImage(){var e;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"&&!this.isCompactTile&&!this.isListTile}onLoad(){var e,t;(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"||((t=this.model)===null||t===void 0?void 0:t.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}onError(){this.isNotFound=!0}static get styles(){return[Lc,Rc,g`
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }

        .search-image {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(245, 245, 247);
          border-radius: 4px;
        }

        svg {
          height: 10rem;
          width: 10rem;
        }
      `]}};n([u({type:Object})],Je.prototype,"model",void 0);n([u({type:String})],Je.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],Je.prototype,"isListTile",void 0);n([u({type:Boolean})],Je.prototype,"isCompactTile",void 0);n([u({type:Boolean})],Je.prototype,"loggedIn",void 0);n([L()],Je.prototype,"isWaveform",void 0);n([L()],Je.prototype,"isNotFound",void 0);n([Y("img")],Je.prototype,"baseImage",void 0);Je=n([F("item-image")],Je);const Oc=H`
  <svg viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="m89.6854559 79.6500588c1.7300364 6.4823648 2.180423 13.3122689 3.3145441 20.3499412h-86c.5683151-15.8558542 2.98334063-30.7849367 15.1676149-41.6581341 22.9948067-20.518674 59.250299-9.0032844 67.517841 21.3081929zm-40.0998307-79.6500588c10.872402.0493248 19.9700408 9.25722341 19.917959 20.1421788-.0829413 11.042868-8.9616237 19.8492523-20.0602807 19.8578212-11.1181198 0-19.9397193-8.7904706-19.9397193-19.8908727-.0327543-11.11998815 9.0125781-20.17487063 20.082041-20.1091273z"
      fill="black"
      class="fill-color"
      fill-rule="evenodd"
    />
    <title>Icon of a person</title>
  </svg>
`,Fc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m225.568345 20c20.949641 0 28.431655 8.5714286 28.431655 28.5714286-.928802 21.2807881-.704608 42.5615763-.400898 63.8423644l.153512 10.640394c.13351 9.458128.247386 18.916256.247386 28.374384v100c0 18.571429-5.985612 28.571429-28.431655 28.571429-50.877698-1.428571-100.258992-1.428571-151.1366903 0-20.9496403 0-28.4316547-8.571429-28.4316547-28.571429v-202.8571424c0-18.5714286 5.9856115-28.5714286 28.4316547-28.5714286 50.8776983 1.4285714 100.2589923 1.4285714 151.1366903 0zm-74.268345 127.4c-30.251351 0-53.3 24.489189-53.3 53.3 0 30.251351 24.489189 53.3 53.3 53.3 30.251351 0 53.3-24.489189 53.3-53.3s-24.489189-53.3-53.3-53.3zm0 39c7.897672 0 14.3 6.402328 14.3 14.3s-6.402328 14.3-14.3 14.3-14.3-6.402328-14.3-14.3 6.402328-14.3 14.3-14.3zm-1.3-137.8c-20.384 0-36.4 16.016-36.4 36.4s16.016 36.4 36.4 36.4 36.4-16.016 36.4-36.4-17.472-36.4-36.4-36.4z"
      fill="black"
      fill-rule="evenodd"
    />
    <title>Icon of a speaker</title>
  </svg>
`,Bc=H`
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>icon/data(folder)</title>
    <g id="icon/data(folder)" stroke="none" stroke-fill="none" fill-rule="evenodd">
      <path
        class="fill-color"
        d="M100,41.0384365 L77.7420275,86 L0,86 L22.2588638,41.0384365 L100,41.0384365 Z M28.0641366,15 L28.1546605,15.0596181 L28.2341398,15.1242873 L28.3328904,15.2177465 L28.4472762,15.3436376 C28.6690939,15.606393 28.9514073,16.0510217 29.1933903,16.7785146 L29.1933903,16.7785146 L29.1933903,22.0756281 L78.7495321,22.0756281 L78.7495321,35.9042492 L17.4213444,35.9042492 L0.000356512594,72.0402693 L0.000356512594,23.7334897 L6.77320451,15 L28.0641366,15 Z"
        id="Combined-Shape"
        fill="#000000">
      </path>
    </g>
  </svg>
`,Ic=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="m136.125893 117.288073c14.41013-4.850562 27.83316-2.109766 39.480173 7.796632 10.335962 8.792594 14.330094 20.428621 14.288498 33.809481-.091795 25.476855-.015572 50.965113-.049872 76.441968-.003811 2.805419-.034301 5.648851-.457344 8.401051-3.376719 21.854139-21.133078 36.299386-43.127486 35.204588-20.210769-1.003564-37.307792-18.132586-37.799436-38.393946-.346818-14.513672-.060979-29.057755-.301084-43.586633 0-12.597776-.06479-25.191751.034301-37.789527.0343-3.656928.16007-7.401288.903253-10.963182 3.18997-15.36138 12.272049-25.963431 27.028997-30.920432zm69.082871-95.288073v20.8201628h-42.6892v27.2482979s2.61448.5740085 3.574902.8363038c23.797103 6.5155667 41.073252 15.8669636 55.262332 37.0824705 8.594246 12.852468 11.643202 31.380398 11.643202 46.760785v15.304359h-20.889162c0-5.538611.099091-10.750305-.038112-15.961998-.099091-3.896415-.167692-7.857454-.842274-11.689246-5.328051-30.262793-30.775402-49.8170956-57.026916-51.5315184-29.311903-1.9120945-57.1907972 18.1858064-64.1500399 46.8520184-1.6657464 6.843753-1.7799637 13.736569-1.7780383 20.63947l.0023262 1.88283c.0030489 1.883022.0050308 3.76653-.0231721 5.649734-.0228671 1.364696 0 2.72559 0 4.052272h-20.5918884c-5.5529117-51.542923 24.3078039-93.7420516 70.1221835-99.8660762v-27.3889489h-42.6205979v-20.6909159z"
      class="fill-color"
      fill="black"
      fill-rule="evenodd"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Uc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Ys=H`
  <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m272 280h-9.268431c.276116-.74734.440961-1.53597.440961-2.365889v-6.775607c0-3.831666-3.082608-6.920121-6.882294-6.920121h-12.701336c-3.795565 0-6.882294 3.100842-6.882294 6.920121v6.775607c0 .829919.164845 1.626807.432719 2.365889h-172.3623223c.2678738-.74734.4368403-1.53597.4368403-2.365889v-6.775607c0-3.831666-3.0826085-6.920121-6.8864155-6.920121h-12.6930937c-3.803807 0-6.8905366 3.100842-6.8905366 6.920121v6.775607c0 .829919.1689665 1.626807.4368402 2.365889h-11.1806374v-260h11.1806374c-.2678737.74734-.4368402 1.5359695-.4368402 2.3700175v6.7673495c0 3.8399238 3.0826085 6.9242496 6.8905366 6.9242496h12.6930937c3.7955647 0 6.8864155-3.0967127 6.8864155-6.9242496v-6.7673495c0-.8381769-.1689665-1.6309354-.4368403-2.3700175h172.3664433c-.271995.74734-.43684 1.5359695-.43684 2.3700175v6.7673495c0 3.8399238 3.078487 6.9242496 6.882294 6.9242496h12.701336c3.795565 0 6.882294-3.0967127 6.882294-6.9242496v-6.7673495c0-.8381769-.164845-1.6309354-.43684-2.3700175h9.26431zm-206.786157-222.1333969c0-3.8357948-3.0826085-6.9242496-6.8864155-6.9242496h-12.6930937c-3.803807 0-6.8905366 3.1008417-6.8905366 6.9242496v6.7714785c0 3.8399238 3.0826085 6.9283786 6.8905366 6.9283786h12.6930937c3.7955647 0 6.8864155-3.1008417 6.8864155-6.9283786zm0 35.5007147c0-3.8357949-3.0826085-6.9242497-6.8864155-6.9242497h-12.6930937c-3.803807 0-6.8905366 3.1008417-6.8905366 6.9242497v6.7714782c0 3.835795 3.0826085 6.920121 6.8905366 6.920121h12.6930937c3.7955647 0 6.8864155-3.096713 6.8864155-6.920121zm0 35.4965852c0-3.839923-3.0826085-6.924249-6.8864155-6.924249h-12.6930937c-3.803807 0-6.8905366 3.100841-6.8905366 6.924249v6.771479c0 3.839924 3.0826085 6.92425 6.8905366 6.92425h12.6930937c3.7955647 0 6.8864155-3.100842 6.8864155-6.92425zm0 35.500715c0-3.839924-3.0826085-6.92425-6.8864155-6.92425h-12.6930937c-3.803807 0-6.8905366 3.096713-6.8905366 6.92425v6.771479c0 3.839923 3.0826085 6.928378 6.8905366 6.928378h12.6930937c3.7955647 0 6.8864155-3.10497 6.8864155-6.928378zm0 35.496586c0-3.827537-3.0826085-6.92425-6.8864155-6.92425h-12.6930937c-3.803807 0-6.8905366 3.104971-6.8905366 6.92425v6.771478c0 3.839924 3.0826085 6.928379 6.8905366 6.928379h12.6930937c3.7955647 0 6.8864155-3.104971 6.8864155-6.928379zm0 35.500714c0-3.835794-3.0826085-6.924249-6.8864155-6.924249h-12.6930937c-3.803807 0-6.8905366 3.10497-6.8905366 6.924249v6.771479c0 3.835795 3.0826085 6.928378 6.8905366 6.928378h12.6930937c3.7955647 0 6.8864155-3.10497 6.8864155-6.928378zm155.247251-186.2734632c0-5.8672383-4.805242-10.6692075-10.673738-10.6692075h-119.5788334c-5.8684952 0-10.6737379 4.8019692-10.6737379 10.6692075v74.7009692c0 5.867238 4.8052427 10.665078 10.6737379 10.665078h119.5788334c5.868496 0 10.673738-4.79784 10.673738-10.665078zm.366781 121.3663652c0-5.90027-4.83409-10.727013-10.731434-10.727013h-120.1970034c-5.8973433 0-10.7273127 4.826743-10.7273127 10.727013v75.084961c0 5.896141 4.8299694 10.718755 10.7273127 10.718755h120.1970034c5.897344 0 10.731434-4.822614 10.731434-10.718755zm42.344655-112.5882169c0-3.8357948-3.082608-6.9242496-6.882294-6.9242496h-12.701336c-3.795565 0-6.882294 3.1008417-6.882294 6.9242496v6.7714785c0 3.8399238 3.078487 6.9283786 6.882294 6.9283786h12.701336c3.795565 0 6.882294-3.1008417 6.882294-6.9283786zm0 35.5007147c0-3.8357949-3.082608-6.9242497-6.882294-6.9242497h-12.701336c-3.795565 0-6.882294 3.1008417-6.882294 6.9242497v6.7714782c0 3.835795 3.078487 6.920121 6.882294 6.920121h12.701336c3.795565 0 6.882294-3.096713 6.882294-6.920121zm0 35.4965852c0-3.839923-3.082608-6.924249-6.882294-6.924249h-12.701336c-3.795565 0-6.882294 3.100841-6.882294 6.924249v6.771479c0 3.839924 3.078487 6.92425 6.882294 6.92425h12.701336c3.795565 0 6.882294-3.100842 6.882294-6.92425zm0 35.500715c0-3.839924-3.082608-6.92425-6.882294-6.92425h-12.701336c-3.795565 0-6.882294 3.096713-6.882294 6.92425v6.771479c0 3.839923 3.078487 6.928378 6.882294 6.928378h12.701336c3.795565 0 6.882294-3.10497 6.882294-6.928378zm0 35.496586c0-3.827537-3.082608-6.92425-6.882294-6.92425h-12.701336c-3.795565 0-6.882294 3.104971-6.882294 6.92425v6.771478c0 3.839924 3.078487 6.928379 6.882294 6.928379h12.701336c3.795565 0 6.882294-3.104971 6.882294-6.928379zm0 35.500714c0-3.835794-3.082608-6.924249-6.882294-6.924249h-12.701336c-3.795565 0-6.882294 3.10497-6.882294 6.924249v6.771479c0 3.835795 3.078487 6.928378 6.882294 6.928378h12.701336c3.795565 0 6.882294-3.10497 6.882294-6.928378z"
      fill="black"
      fill-rule="evenodd"
      transform="matrix(1 0 0 -1 0 300)"
    />
    <title>Icon of a film</title>
  </svg>
`,Nc=H`
  <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>icon/radio</title>
    <g id="icon/radio" stroke="none" stroke-fill="none" fill-rule="evenodd">
      <path
        class="fill-color"
        d="M64.1512549,2.64739434 C66.1587977,1.39734524 68.798514,2.01257316 70.0484935,4.01892156 C71.2997791,6.02526996 70.6858916,8.66513331 68.6770426,9.9151824 C68.4249569,10.0719284 68.1637282,10.1999376 67.8959687,10.2979038 L67.8959687,10.2979038 L34.8074317,31.1764668 L35.0020471,31.1647109 C52.2287757,30.3692251 69.4411367,30.9217546 86.5973335,32.7295581 C88.6492852,32.94639 90.6947061,33.2494322 92.7335963,33.5903547 C96.8727656,34.2826494 99.9748567,37.8982564 99.9839997,42.1290913 C100.006204,58.2399645 100.003592,74.3443065 99.986612,90.4486486 C99.9800813,95.0478365 97.0242782,97.9084504 92.2411802,97.9175939 C87.5303554,97.9267375 82.8202563,97.9308012 78.1104474,97.9321558 L78.1104474,97.9321558 L49.8515942,97.9267375 C48.1320561,97.9267375 46.4123956,97.9245128 44.6926508,97.9210381 L44.6926508,97.9210381 L34.3734782,97.892985 C25.7738361,97.8701007 17.1740026,97.8646922 8.5787611,97.9985794 C3.01458916,98.0834834 -0.0731344263,94.3529294 0.00131576168,89.4284935 C0.129027585,80.8118193 0.140637751,72.1935325 0.126178794,63.5736331 L0.126178794,63.5736331 L0.0914450485,48.0560725 L0.0875212425,42.8827782 C0.0875212425,37.6931804 2.77164644,34.1128413 7.8695251,33.5328812 C10.8227159,33.1945711 13.7772128,32.8784668 16.7356282,32.578037 L16.7356282,32.578037 L64.1055399,2.57424622 Z M12.7505839,77.7247946 C11.0094944,77.7247946 9.46432649,78.2276879 9.5544504,80.4169066 C9.62881352,82.3029089 10.9422367,82.7552081 12.4614494,82.7996984 L12.4614494,82.7996984 L12.7897682,82.8033639 C15.5594458,82.7772396 18.3314092,82.7720147 21.1041889,82.773321 L21.1041889,82.773321 L29.4235076,82.7824645 L37.7418467,82.7723413 C40.5139733,82.7700554 43.2856101,82.773321 46.0572469,82.7955266 L46.0572469,82.7955266 L46.3771692,82.7934404 L46.6910226,82.7816532 C48.1384034,82.7002545 49.3222811,82.2230773 49.3291612,80.2457922 C49.333384,78.3566767 48.2339358,77.8765708 46.9366545,77.7629453 L46.9366545,77.7629453 L46.6341823,77.742755 C46.5833225,77.7403161 46.532273,77.7383006 46.4810855,77.7366494 L46.4810855,77.7366494 L46.1727164,77.7306375 L23.8394532,77.7342767 Z M72.5758814,48.314026 C63.8625972,48.2434903 56.222963,55.7385601 56.1119407,64.4732291 C55.9917755,73.5122467 63.4080592,81.0843832 72.4439609,81.1549188 C81.6522736,81.228067 88.9418613,74.0412643 89.0123931,64.8324387 C89.0816187,55.7268041 81.7802757,48.3950114 72.5758814,48.314026 Z M43.2828538,67.741865 L43.1158114,67.7413826 L38.8529055,67.7642822 C37.43176,67.7683233 36.0104716,67.769303 34.5891424,67.7688131 L34.5891424,67.7688131 L26.0614938,67.7609758 L14.6889495,67.7652331 L8.84172485,67.7569866 C7.40173575,67.7858956 6.34240993,68.3050616 6.30084658,70.1226151 C6.25251926,72.1341884 7.4175994,72.693249 9.04244209,72.693249 C20.4137287,72.681493 31.7863214,72.6736557 43.157608,72.6958614 L43.157608,72.6958614 L43.325337,72.6944626 C44.8758145,72.661732 45.9981125,72.069328 45.9881554,70.1800886 C45.976266,68.2181516 44.7445726,67.7283204 43.1158114,67.7413826 Z M72.582393,57.9750172 C76.6548848,58.0954055 79.8665352,61.5077032 79.7215514,65.56725 C79.5843346,69.4235606 75.9752732,72.8358582 72.2367619,72.645567 C68.1008397,72.4280913 65.0406456,69.125826 65.140322,64.9911982 C65.2425874,61.0455673 68.6251116,57.8507453 72.582393,57.9750172 Z M43.1249544,57.4692968 C41.2314815,57.4740863 39.3375733,57.475973 37.4433747,57.47636 L37.4433747,57.47636 L26.0758614,57.4719092 C20.3862997,57.4719092 14.7032687,57.4692968 9.02023765,57.4771341 C7.51033559,57.4771341 6.39227663,58.074075 6.30084658,59.902778 C6.20811038,61.7745861 7.29743418,62.4982299 8.81256081,62.5034548 C20.3301355,62.5230481 31.8450979,62.516517 43.3613664,62.5099859 C44.7693893,62.5034548 45.903122,61.9156574 45.9841029,60.2254134 C46.0820637,58.1393858 44.8490641,57.4692968 43.1249544,57.4692968 Z M46.2168861,47.4009001 L40.5790386,47.4140429 L29.6377151,47.4088181 L18.2454335,47.4123013 L12.5520501,47.4009808 C10.9546364,47.3931435 9.74384123,47.9548165 9.52571524,49.829237 C9.32848755,51.5364619 10.6202636,52.5618418 12.9582608,52.5657604 C23.9742763,52.5840474 34.9942102,52.5762101 46.0154503,52.5683728 L46.0154503,52.5683728 L46.1775177,52.5672124 L46.4993249,52.5570056 C47.9909315,52.4819668 49.3130496,51.9964186 49.3214617,49.9742271 C49.3331052,47.9543951 48.0608789,47.4733378 46.5450549,47.4087712 L46.5450549,47.4087712 L46.2168861,47.4009001 Z"
        id="Combined-Shape"
        fill="#000000">
      </path>
    </g>
  </svg>
`,Hc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Vc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Wc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m237.917039 64.413845c0-9.2252653-7.280839-16.7597371-16.145202-16.7597371h-143.5076619c-8.8913162 0-16.1755245 7.5344718-16.1755245 16.7597371v90.110532c0 9.218529 7.2842083 16.756369 16.1755245 16.756369h143.5076619c8.864363 0 16.145202-7.53784 16.145202-16.756369zm26.070862 112.508493c.347027 17.780275-6.761982 22.667409-22.50288 21.923056-19.861428-.943072-39.773394-.2324-59.668515-.2324h-3.584827c0 .121252.067384.222296.067384.343548 0 5.530444-3.416368 10.161601-8.163569 11.970278l34.729703 56.607899c2.368547 3.859859 1.165743 8.905294-2.712205 11.246134-3.867841 2.37452-8.894686 1.175471-11.243017-2.684388l-39.436475-64.283831h-7.280839l-37.556461 61.255897c-2.378655 3.856491-7.3987611 5.055539-11.2666016 2.687755-3.8577329-2.35768-5.0639061-7.403116-2.708836-11.259607l34.0558636-55.503156c-2.951418-2.344208-5.003261-5.884096-5.003261-10.036981 0-.134725.064015-.242504.064015-.370493-26.0169545-.07073-45.1472665-.740985-64.1124877.296394-16.711227.879078-21.9402239-6.069342-21.653842-22.839183.8153462-44.310913.7917618-88.6218257.033692-132.9327384-.2931203-16.5138648 4.4945115-23.3275602 21.3775677-23.1052646 61.993262.7544576 124.003369.6332055 186.023585.0505217 15.302902-.1481971 20.723943 5.6011742 20.477991 21.3572132-.636778 45.1563095-.808608 90.3564041.064015 135.5093461z"
      fill="black"
      fill-rule="evenodd"
      transform="matrix(1 0 0 -1 0 300)"
    />
  </svg>
`,jc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m272 280h-9.268431c.276116-.74734.440961-1.53597.440961-2.365889v-6.775607c0-3.831666-3.082608-6.920121-6.882294-6.920121h-12.701336c-3.795565 0-6.882294 3.100842-6.882294 6.920121v6.775607c0 .829919.164845 1.626807.432719 2.365889h-172.3623223c.2678738-.74734.4368403-1.53597.4368403-2.365889v-6.775607c0-3.831666-3.0826085-6.920121-6.8864155-6.920121h-12.6930937c-3.803807 0-6.8905366 3.100842-6.8905366 6.920121v6.775607c0 .829919.1689665 1.626807.4368402 2.365889h-11.1806374v-260h11.1806374c-.2678737.74734-.4368402 1.5359695-.4368402 2.3700175v6.7673495c0 3.8399238 3.0826085 6.9242496 6.8905366 6.9242496h12.6930937c3.7955647 0 6.8864155-3.0967127 6.8864155-6.9242496v-6.7673495c0-.8381769-.1689665-1.6309354-.4368403-2.3700175h172.3664433c-.271995.74734-.43684 1.5359695-.43684 2.3700175v6.7673495c0 3.8399238 3.078487 6.9242496 6.882294 6.9242496h12.701336c3.795565 0 6.882294-3.0967127 6.882294-6.9242496v-6.7673495c0-.8381769-.164845-1.6309354-.43684-2.3700175h9.26431zm-206.786157-222.1333969c0-3.8357948-3.0826085-6.9242496-6.8864155-6.9242496h-12.6930937c-3.803807 0-6.8905366 3.1008417-6.8905366 6.9242496v6.7714785c0 3.8399238 3.0826085 6.9283786 6.8905366 6.9283786h12.6930937c3.7955647 0 6.8864155-3.1008417 6.8864155-6.9283786zm0 35.5007147c0-3.8357949-3.0826085-6.9242497-6.8864155-6.9242497h-12.6930937c-3.803807 0-6.8905366 3.1008417-6.8905366 6.9242497v6.7714782c0 3.835795 3.0826085 6.920121 6.8905366 6.920121h12.6930937c3.7955647 0 6.8864155-3.096713 6.8864155-6.920121zm0 35.4965852c0-3.839923-3.0826085-6.924249-6.8864155-6.924249h-12.6930937c-3.803807 0-6.8905366 3.100841-6.8905366 6.924249v6.771479c0 3.839924 3.0826085 6.92425 6.8905366 6.92425h12.6930937c3.7955647 0 6.8864155-3.100842 6.8864155-6.92425zm0 35.500715c0-3.839924-3.0826085-6.92425-6.8864155-6.92425h-12.6930937c-3.803807 0-6.8905366 3.096713-6.8905366 6.92425v6.771479c0 3.839923 3.0826085 6.928378 6.8905366 6.928378h12.6930937c3.7955647 0 6.8864155-3.10497 6.8864155-6.928378zm0 35.496586c0-3.827537-3.0826085-6.92425-6.8864155-6.92425h-12.6930937c-3.803807 0-6.8905366 3.104971-6.8905366 6.92425v6.771478c0 3.839924 3.0826085 6.928379 6.8905366 6.928379h12.6930937c3.7955647 0 6.8864155-3.104971 6.8864155-6.928379zm0 35.500714c0-3.835794-3.0826085-6.924249-6.8864155-6.924249h-12.6930937c-3.803807 0-6.8905366 3.10497-6.8905366 6.924249v6.771479c0 3.835795 3.0826085 6.928378 6.8905366 6.928378h12.6930937c3.7955647 0 6.8864155-3.10497 6.8864155-6.928378zm155.247251-186.2734632c0-5.8672383-4.805242-10.6692075-10.673738-10.6692075h-119.5788334c-5.8684952 0-10.6737379 4.8019692-10.6737379 10.6692075v74.7009692c0 5.867238 4.8052427 10.665078 10.6737379 10.665078h119.5788334c5.868496 0 10.673738-4.79784 10.673738-10.665078zm.366781 121.3663652c0-5.90027-4.83409-10.727013-10.731434-10.727013h-120.1970034c-5.8973433 0-10.7273127 4.826743-10.7273127 10.727013v75.084961c0 5.896141 4.8299694 10.718755 10.7273127 10.718755h120.1970034c5.897344 0 10.731434-4.822614 10.731434-10.718755zm42.344655-112.5882169c0-3.8357948-3.082608-6.9242496-6.882294-6.9242496h-12.701336c-3.795565 0-6.882294 3.1008417-6.882294 6.9242496v6.7714785c0 3.8399238 3.078487 6.9283786 6.882294 6.9283786h12.701336c3.795565 0 6.882294-3.1008417 6.882294-6.9283786zm0 35.5007147c0-3.8357949-3.082608-6.9242497-6.882294-6.9242497h-12.701336c-3.795565 0-6.882294 3.1008417-6.882294 6.9242497v6.7714782c0 3.835795 3.078487 6.920121 6.882294 6.920121h12.701336c3.795565 0 6.882294-3.096713 6.882294-6.920121zm0 35.4965852c0-3.839923-3.082608-6.924249-6.882294-6.924249h-12.701336c-3.795565 0-6.882294 3.100841-6.882294 6.924249v6.771479c0 3.839924 3.078487 6.92425 6.882294 6.92425h12.701336c3.795565 0 6.882294-3.100842 6.882294-6.92425zm0 35.500715c0-3.839924-3.082608-6.92425-6.882294-6.92425h-12.701336c-3.795565 0-6.882294 3.096713-6.882294 6.92425v6.771479c0 3.839923 3.078487 6.928378 6.882294 6.928378h12.701336c3.795565 0 6.882294-3.10497 6.882294-6.928378zm0 35.496586c0-3.827537-3.082608-6.92425-6.882294-6.92425h-12.701336c-3.795565 0-6.882294 3.104971-6.882294 6.92425v6.771478c0 3.839924 3.078487 6.928379 6.882294 6.928379h12.701336c3.795565 0 6.882294-3.104971 6.882294-6.928379zm0 35.500714c0-3.835794-3.082608-6.924249-6.882294-6.924249h-12.701336c-3.795565 0-6.882294 3.10497-6.882294 6.924249v6.771479c0 3.835795 3.078487 6.928378 6.882294 6.928378h12.701336c3.795565 0 6.882294-3.10497 6.882294-6.928378z"
      fill="black"
      fill-rule="evenodd"
      transform="matrix(1 0 0 -1 0 300)"
    />
  </svg>
`,qc=H`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,Al={account:{color:"#000000",icon:Oc,text:"Account"},audio:{color:"#00adef",icon:Fc,text:"Audio"},collection:{color:"#4666ff",icon:Tl,text:"Collection"},data:{color:"#333333",icon:Bc,text:"Data"},etree:{color:"#00adef",icon:Ic,text:"E-tree"},film:{color:"#bf1b2c",icon:Ys,text:"Film"},image:{color:"#aa99c9",icon:Uc,text:"Image"},movies:{color:"#f1644b",icon:Ys,text:"Movie"},radio:{color:"#8fdaef",icon:Nc,text:"Radio"},software:{color:"#9ecc4f",icon:Hc,text:"Software"},texts:{color:"#faab3c",icon:Vc,text:"Text"},tv:{color:"#f1644b",icon:Wc,text:"TV"},video:{color:"#f1644b",icon:jc,text:"Video"},web:{color:"#ffcd27",icon:qc,text:"Web"},search:{color:"#000000",icon:Ml,text:"Search"}};let Ki=class extends B{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;const i=["tvnews","tvarchive","television"],o=["radio","radioprogram"];return this.mediatype==="movies"&&((e=this.collections)===null||e===void 0?void 0:e.some(r=>i.indexOf(r)>=0))?"tv":this.mediatype==="audio"&&((t=this.collections)===null||t===void 0?void 0:t.some(r=>o.indexOf(r)>=0))?"radio":this.mediatype||""}render(){const e=Al[this.displayMediatype];return e?h`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        title="${e.text}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:h``}static get styles(){return g`
      #icon {
        height: var(--iconHeight, 25px);
      }

      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: var(--iconTextAlign, center);
      }

      #icon.hide-text p {
        display: none;
      }

      svg {
        height: var(--iconHeight, 10px);
        width: var(--iconWidth, 10px);
        pointer-events: none;
      }

      .fill-color {
        fill: var(--iconFillColor, '#000000');
      }
    `}};n([u({type:String})],Ki.prototype,"mediatype",void 0);n([u({type:Array})],Ki.prototype,"collections",void 0);n([u({type:Boolean})],Ki.prototype,"showText",void 0);Ki=n([F("mediatype-icon")],Ki);const Qc=H`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,Kc=H`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,Gc=H`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;function Yc(a,e){let t=1;return a>=1e9?t=1e9:a>=1e6?t=1e6:a>=1e3&&e==="short"&&(t=1e3),t}function Xc(a=0,e){const t=a/e,i=t<10;let o=0;return i?o=Math.round((t+Number.EPSILON)*10)/10:o=Math.round(t),o}function Zc(a,e,t,i){switch(e){case 1e9:return k(t==="short"?Et`${a}B`:Et`${a} billion`);case 1e6:return k(t==="short"?Et`${a}M`:Et`${a} million`);case 1e3:return k(t==="short"?Et`${a}K`:Et`${a} thousand`);default:return new Intl.NumberFormat(i).format(a)}}function Ni(a,e="long",t="short",i="en-US"){const o=a!=null?a:-1;if(o<0)return"";const r=Yc(o,e),s=Xc(o,r);return Zc(s,r,t,i)}let wt=class extends B{render(){var e,t,i,o,r;const s=Ni(this.favCount,"short","short"),l=Ni(this.commentCount,"short","short"),d=this.mediatype==="account"?`${(e=this.itemCount)!==null&&e!==void 0?e:0} uploads`:`${(t=this.viewCount)!==null&&t!==void 0?t:0} ${(i=this.viewLabel)!==null&&i!==void 0?i:"all-time views"}`;return h`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype==="account"?"Account Stats":"Item Stats"}
        </p>
        <ul id="stats-row">
          <li class="col">
            <p class="sr-only">${k("Mediatype:")}</p>
            <mediatype-icon .mediatype=${this.mediatype}></mediatype-icon>
          </li>
          <li class="col" title="${d}">
            ${this.mediatype==="account"?Kc:Gc}
            <p class="status-text">
              <span class="sr-only">
                ${this.mediatype==="account"?k("Uploads:"):k("Views:")}
              </span>
              ${Ni(this.mediatype==="account"?(o=this.itemCount)!==null&&o!==void 0?o:0:(r=this.viewCount)!==null&&r!==void 0?r:0,"short","short")}
            </p>
          </li>
          <li class="col" title="${s} favorites">
            ${El}
            <p class="status-text">
              <span class="sr-only">${k("Favorites:")}</span>
              ${s}
            </p>
          </li>
          <li class="col reviews" title="${l} reviews">
            ${Qc}
            <p class="status-text">
              <span class="sr-only">${k("Reviews:")}</span>
              ${l}
            </p>
          </li>
        </ul>
      </div>
    `}static get styles(){return[pt,g`
        mediatype-icon {
          --iconHeight: 25px;
          --iconWidth: 25px;
        }

        ul {
          all: unset; // unset all property values
          list-style-type: none; // remove default list-style
        }

        li {
          list-style-type: none; // remove default list-style
        }

        svg {
          height: 13px;
          width: 13px;
          display: block;
          margin: auto;
          pointer-events: none;
        }

        /* Make the reviews icon slightly smaller/lower, for even visual weight */
        .reviews svg {
          height: 11px;
          width: 11px;
          margin-top: 2px;
        }

        .item-stats {
          height: 30px;
          padding-left: 5px;
          padding-right: 5px;
          font-family: 'Helvetica Neue', ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }

        #stats-row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          padding-bottom: 5px;
        }

        .col {
          min-width: 15px;
          max-width: 25%;
          height: 25px;
        }

        .status-text {
          font-size: 14px;
          height: 15px;
          color: #2c2c2c;
          line-height: 17px;
          margin: auto;
          display: block;
          text-align: center;
        }
      `]}};n([u({type:String})],wt.prototype,"mediatype",void 0);n([u({type:Number})],wt.prototype,"itemCount",void 0);n([u({type:Number})],wt.prototype,"viewCount",void 0);n([u({type:String})],wt.prototype,"viewLabel",void 0);n([u({type:Number})],wt.prototype,"favCount",void 0);n([u({type:Number})],wt.prototype,"commentCount",void 0);wt=n([F("tile-stats")],wt);let mr=class extends ge{constructor(){super(...arguments),this.showInfoButton=!1}render(){var e,t,i,o,r,s,l;const d=(e=this.model)===null||e===void 0?void 0:e.title,c=(t=this.sortParam)!==null&&t!==void 0?t:this.defaultSortParam,[p,v]=(c==null?void 0:c.field)==="week"?[(i=this.model)===null||i===void 0?void 0:i.weeklyViewCount,"weekly views"]:[(o=this.model)===null||o===void 0?void 0:o.viewCount,"all-time views"];return h`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h4 class="truncated" title=${Qr(d)}>
                ${d}
              </h4>
            </div>

            ${this.volumeIssueTemplate}
            ${this.isSortedByDate?this.sortedDateInfoTemplate:this.creatorTemplate}
            ${this.webArchivesCaptureDatesTemplate} ${this.textSnippetsTemplate}
            ${this.reviewBlockTemplate}
          </div>

          <tile-stats
            .mediatype=${(r=this.model)===null||r===void 0?void 0:r.mediatype}
            .viewCount=${p}
            .viewLabel=${v}
            .favCount=${(s=this.model)===null||s===void 0?void 0:s.favCount}
            .commentCount=${(l=this.model)===null||l===void 0?void 0:l.commentCount}
          >
          </tile-stats>
        </div>
      </div>
    `}get creatorTemplate(){const e=this.displayValueProvider.firstCreatorMatchingFilter;return e?h`
      <div class="created-by">
        <span class="truncated" title=${e}>
          by&nbsp;${e}
        </span>
      </div>
    `:b}get imageBlockTemplate(){return h`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .isCompactTile=${!1}
        .isListTile=${!1}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get sortedDateInfoTemplate(){var e,t,i,o,r;let s,l="long";switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"date":{const d=(t=this.model)===null||t===void 0?void 0:t.datePublished;s={field:"published",value:d},Kr(d)&&(l="year-only");break}case"reviewdate":s={field:"reviewed",value:(i=this.model)===null||i===void 0?void 0:i.dateReviewed};break;case"addeddate":s={field:"added",value:(o=this.model)===null||o===void 0?void 0:o.dateAdded};break;case"publicdate":s={field:"archived",value:(r=this.model)===null||r===void 0?void 0:r.dateArchived};break}return s!=null&&s.value?h`
      <div class="date-sorted-by truncated">
        <span>
          ${s==null?void 0:s.field} ${Qi(s==null?void 0:s.value,l)}
        </span>
      </div>
    `:b}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${k("More info")}</span>
        </button>`:b}get reviewBlockTemplate(){var e;if(!(!((e=this.model)===null||e===void 0)&&e.review))return b;const{title:t,body:i,stars:o}=this.model.review;return h`
      <review-block
        viewsize="grid"
        .title=${t}
        .body=${i}
        .starRating=${o}
      >
      </review-block>
    `}get textSnippetsTemplate(){var e;return this.hasSnippets?h`
      <text-snippet-block viewsize="grid" .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}>
      </text-snippet-block>
    `:b}get volumeIssueTemplate(){var e,t,i,o;return!(!((e=this.model)===null||e===void 0)&&e.volume)||!(!((t=this.model)===null||t===void 0)&&t.issue)?b:h`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${(i=this.model)===null||i===void 0?void 0:i.volume}, Issue&nbsp;${(o=this.model)===null||o===void 0?void 0:o.issue}
        </span>
      </div>
    `}get webArchivesCaptureDatesTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.captureDates)||!this.model.title?b:h`
      <ul class="capture-dates">
        ${Dt(this.model.captureDates,t=>h`<li>
            ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,t)}
          </li>`)}
      </ul>
    `}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.effectiveSort)===null||e===void 0?void 0:e.field)}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=g`var(--tileBorderColor, #dddddd)`;return[Xo,g`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:hover {
          text-decoration: underline;
        }

        .container {
          border: 1px solid ${e};
        }

        .capture-dates {
          margin: 0;
          padding: 0 5px;
          list-style-type: none;
        }

        review-block,
        text-snippet-block {
          --containerLeftMargin: 5px;
          --containerTopMargin: 5px;
        }

        /**
         * iOS Safari long-press on tiles (to bring up hover pane)
         * gets messy without this
         */
        @media screen and (pointer: coarse) and (hover: none) {
          .container {
            -webkit-touch-callout: none;
          }

          .truncated {
            -webkit-touch-callout: default;
          }
        }
      `]}};n([u({type:Boolean})],mr.prototype,"showInfoButton",void 0);mr=n([F("item-tile")],mr);let gr=class extends ge{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getAvatarTemplate} ${this.getTitleTemplate}
            ${this.getArchivistTemplate}
          </div>
          ${this.getTileStatsTemplate}
        </div>
      </div>
    `}get getAvatarTemplate(){return h`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get getTitleTemplate(){var e;return h`<div id="title">
      <h4 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.identifier}</h4>
    </div>`}get getArchivistTemplate(){return h`<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
    </div>`}get getTileStatsTemplate(){var e,t,i,o;return h`<tile-stats
      .mediatype=${(e=this.model)===null||e===void 0?void 0:e.mediatype}
      .itemCount=${(t=this.model)===null||t===void 0?void 0:t.itemCount}
      .favCount=${(i=this.model)===null||i===void 0?void 0:i.favCount}
      .commentCount=${(o=this.model)===null||o===void 0?void 0:o.commentCount}
    >
    </tile-stats>`}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${k("More info")}</span>
        </button>`:b}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=g`var(--tileBorderColor, #dddddd)`;return[Xo,g`
        .container {
          border: 1px solid ${e};
        }
      `]}};n([u({type:Boolean})],gr.prototype,"showInfoButton",void 0);gr=n([F("account-tile")],gr);let yr=class extends ge{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
      </div>
    `}get getImageBlockTemplate(){return h`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get getTitleTemplate(){var e;return h`<div id="title">
      <h4 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.title}</h4>
    </div>`}static get styles(){const e=g`var(--tileBorderColor, #555555)`,t=g`var(--tileBackgroundColor, #666666)`,i=g`#fff`;return[Xo,g`
        .container {
          background-color: ${t};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated {
          color: ${i};
          -webkit-line-clamp: 4;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `]}};n([u({type:Boolean})],yr.prototype,"showInfoButton",void 0);yr=n([F("search-tile")],yr);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class br extends Go{constructor(e){if(super(e),this.it=b,e.type!==Qo.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===b||e==null)return this.ft=void 0,this.it=e;if(e===dt)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}br.directiveName="unsafeHTML",br.resultType=1;const Jc=Ko(br);/*! @license DOMPurify 3.1.7 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.1.7/LICENSE */const{entries:zl,setPrototypeOf:Xs,isFrozen:e0,getPrototypeOf:t0,getOwnPropertyDescriptor:i0}=Object;let{freeze:Ae,seal:Be,create:Pl}=Object,{apply:wr,construct:$r}=typeof Reflect!="undefined"&&Reflect;Ae||(Ae=function(e){return e});Be||(Be=function(e){return e});wr||(wr=function(e,t,i){return e.apply(t,i)});$r||($r=function(e,t){return new e(...t)});const go=Re(Array.prototype.forEach),Zs=Re(Array.prototype.pop),Mi=Re(Array.prototype.push),$o=Re(String.prototype.toLowerCase),Sa=Re(String.prototype.toString),Js=Re(String.prototype.match),Ai=Re(String.prototype.replace),o0=Re(String.prototype.indexOf),a0=Re(String.prototype.trim),Ne=Re(Object.prototype.hasOwnProperty),Ee=Re(RegExp.prototype.test),zi=r0(TypeError);function Re(a){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return wr(a,e,i)}}function r0(a){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return $r(a,t)}}function U(a,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:$o;Xs&&Xs(a,null);let i=e.length;for(;i--;){let o=e[i];if(typeof o=="string"){const r=t(o);r!==o&&(e0(e)||(e[i]=r),o=r)}a[o]=!0}return a}function s0(a){for(let e=0;e<a.length;e++)Ne(a,e)||(a[e]=null);return a}function Mt(a){const e=Pl(null);for(const[t,i]of zl(a))Ne(a,t)&&(Array.isArray(i)?e[t]=s0(i):i&&typeof i=="object"&&i.constructor===Object?e[t]=Mt(i):e[t]=i);return e}function Pi(a,e){for(;a!==null;){const i=i0(a,e);if(i){if(i.get)return Re(i.get);if(typeof i.value=="function")return Re(i.value)}a=t0(a)}function t(){return null}return t}const en=Ae(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),xa=Ae(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ca=Ae(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),n0=Ae(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),ka=Ae(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),l0=Ae(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),tn=Ae(["#text"]),on=Ae(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),Ta=Ae(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),an=Ae(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),yo=Ae(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),d0=Be(/\{\{[\w\W]*|[\w\W]*\}\}/gm),c0=Be(/<%[\w\W]*|[\w\W]*%>/gm),h0=Be(/\${[\w\W]*}/gm),p0=Be(/^data-[\-\w.\u00B7-\uFFFF]/),u0=Be(/^aria-[\-\w]+$/),Dl=Be(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),v0=Be(/^(?:\w+script|data):/i),f0=Be(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Ll=Be(/^html$/i),m0=Be(/^[a-z][.\w]*(-[.\w]+)+$/i);var rn=Object.freeze({__proto__:null,MUSTACHE_EXPR:d0,ERB_EXPR:c0,TMPLIT_EXPR:h0,DATA_ATTR:p0,ARIA_ATTR:u0,IS_ALLOWED_URI:Dl,IS_SCRIPT_OR_DATA:v0,ATTR_WHITESPACE:f0,DOCTYPE_NAME:Ll,CUSTOM_ELEMENT:m0});const Di={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},g0=function(){return typeof window=="undefined"?null:window},y0=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(i=t.getAttribute(o));const r="dompurify"+(i?"#"+i:"");try{return e.createPolicy(r,{createHTML(s){return s},createScriptURL(s){return s}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}};function Rl(){let a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:g0();const e=P=>Rl(P);if(e.version="3.1.7",e.removed=[],!a||!a.document||a.document.nodeType!==Di.document)return e.isSupported=!1,e;let{document:t}=a;const i=t,o=i.currentScript,{DocumentFragment:r,HTMLTemplateElement:s,Node:l,Element:d,NodeFilter:c,NamedNodeMap:p=a.NamedNodeMap||a.MozNamedAttrMap,HTMLFormElement:v,DOMParser:f,trustedTypes:w}=a,$=d.prototype,_=Pi($,"cloneNode"),z=Pi($,"remove"),D=Pi($,"nextSibling"),A=Pi($,"childNodes"),R=Pi($,"parentNode");if(typeof s=="function"){const P=t.createElement("template");P.content&&P.content.ownerDocument&&(t=P.content.ownerDocument)}let O,W="";const{implementation:ve,createNodeIterator:xe,createDocumentFragment:de,getElementsByTagName:Pe}=t,{importNode:Ie}=i;let $e={};e.isSupported=typeof zl=="function"&&typeof R=="function"&&ve&&ve.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:X,ERB_EXPR:fe,TMPLIT_EXPR:Oe,DATA_ATTR:_t,ARIA_ATTR:bi,IS_SCRIPT_OR_DATA:wi,ATTR_WHITESPACE:It,CUSTOM_ELEMENT:$i}=rn;let{IS_ALLOWED_URI:Ut}=rn,oe=null;const _i=U({},[...en,...xa,...Ca,...ka,...tn]);let ye=null;const as=U({},[...on,...Ta,...an,...yo]);let se=Object.seal(Pl(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Si=null,aa=null,rs=!0,ra=!0,ss=!1,ns=!0,Nt=!1,sa=!0,St=!1,na=!1,la=!1,Ht=!1,co=!1,ho=!1,ls=!0,ds=!1;const ud="user-content-";let da=!0,xi=!1,Vt={},Wt=null;const cs=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let hs=null;const ps=U({},["audio","video","img","source","image","track"]);let ca=null;const us=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),po="http://www.w3.org/1998/Math/MathML",uo="http://www.w3.org/2000/svg",at="http://www.w3.org/1999/xhtml";let jt=at,ha=!1,pa=null;const vd=U({},[po,uo,at],Sa);let Ci=null;const fd=["application/xhtml+xml","text/html"],md="text/html";let be=null,qt=null;const gd=t.createElement("form"),vs=function(m){return m instanceof RegExp||m instanceof Function},ua=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(qt&&qt===m)){if((!m||typeof m!="object")&&(m={}),m=Mt(m),Ci=fd.indexOf(m.PARSER_MEDIA_TYPE)===-1?md:m.PARSER_MEDIA_TYPE,be=Ci==="application/xhtml+xml"?Sa:$o,oe=Ne(m,"ALLOWED_TAGS")?U({},m.ALLOWED_TAGS,be):_i,ye=Ne(m,"ALLOWED_ATTR")?U({},m.ALLOWED_ATTR,be):as,pa=Ne(m,"ALLOWED_NAMESPACES")?U({},m.ALLOWED_NAMESPACES,Sa):vd,ca=Ne(m,"ADD_URI_SAFE_ATTR")?U(Mt(us),m.ADD_URI_SAFE_ATTR,be):us,hs=Ne(m,"ADD_DATA_URI_TAGS")?U(Mt(ps),m.ADD_DATA_URI_TAGS,be):ps,Wt=Ne(m,"FORBID_CONTENTS")?U({},m.FORBID_CONTENTS,be):cs,Si=Ne(m,"FORBID_TAGS")?U({},m.FORBID_TAGS,be):{},aa=Ne(m,"FORBID_ATTR")?U({},m.FORBID_ATTR,be):{},Vt=Ne(m,"USE_PROFILES")?m.USE_PROFILES:!1,rs=m.ALLOW_ARIA_ATTR!==!1,ra=m.ALLOW_DATA_ATTR!==!1,ss=m.ALLOW_UNKNOWN_PROTOCOLS||!1,ns=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Nt=m.SAFE_FOR_TEMPLATES||!1,sa=m.SAFE_FOR_XML!==!1,St=m.WHOLE_DOCUMENT||!1,Ht=m.RETURN_DOM||!1,co=m.RETURN_DOM_FRAGMENT||!1,ho=m.RETURN_TRUSTED_TYPE||!1,la=m.FORCE_BODY||!1,ls=m.SANITIZE_DOM!==!1,ds=m.SANITIZE_NAMED_PROPS||!1,da=m.KEEP_CONTENT!==!1,xi=m.IN_PLACE||!1,Ut=m.ALLOWED_URI_REGEXP||Dl,jt=m.NAMESPACE||at,se=m.CUSTOM_ELEMENT_HANDLING||{},m.CUSTOM_ELEMENT_HANDLING&&vs(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(se.tagNameCheck=m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),m.CUSTOM_ELEMENT_HANDLING&&vs(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(se.attributeNameCheck=m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(se.allowCustomizedBuiltInElements=m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Nt&&(ra=!1),co&&(Ht=!0),Vt&&(oe=U({},tn),ye=[],Vt.html===!0&&(U(oe,en),U(ye,on)),Vt.svg===!0&&(U(oe,xa),U(ye,Ta),U(ye,yo)),Vt.svgFilters===!0&&(U(oe,Ca),U(ye,Ta),U(ye,yo)),Vt.mathMl===!0&&(U(oe,ka),U(ye,an),U(ye,yo))),m.ADD_TAGS&&(oe===_i&&(oe=Mt(oe)),U(oe,m.ADD_TAGS,be)),m.ADD_ATTR&&(ye===as&&(ye=Mt(ye)),U(ye,m.ADD_ATTR,be)),m.ADD_URI_SAFE_ATTR&&U(ca,m.ADD_URI_SAFE_ATTR,be),m.FORBID_CONTENTS&&(Wt===cs&&(Wt=Mt(Wt)),U(Wt,m.FORBID_CONTENTS,be)),da&&(oe["#text"]=!0),St&&U(oe,["html","head","body"]),oe.table&&(U(oe,["tbody"]),delete Si.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw zi('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw zi('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=m.TRUSTED_TYPES_POLICY,W=O.createHTML("")}else O===void 0&&(O=y0(w,o)),O!==null&&typeof W=="string"&&(W=O.createHTML(""));Ae&&Ae(m),qt=m}},fs=U({},["mi","mo","mn","ms","mtext"]),ms=U({},["annotation-xml"]),yd=U({},["title","style","font","a","script"]),gs=U({},[...xa,...Ca,...n0]),ys=U({},[...ka,...l0]),bd=function(m){let S=R(m);(!S||!S.tagName)&&(S={namespaceURI:jt,tagName:"template"});const E=$o(m.tagName),K=$o(S.tagName);return pa[m.namespaceURI]?m.namespaceURI===uo?S.namespaceURI===at?E==="svg":S.namespaceURI===po?E==="svg"&&(K==="annotation-xml"||fs[K]):Boolean(gs[E]):m.namespaceURI===po?S.namespaceURI===at?E==="math":S.namespaceURI===uo?E==="math"&&ms[K]:Boolean(ys[E]):m.namespaceURI===at?S.namespaceURI===uo&&!ms[K]||S.namespaceURI===po&&!fs[K]?!1:!ys[E]&&(yd[E]||!gs[E]):!!(Ci==="application/xhtml+xml"&&pa[m.namespaceURI]):!1},qe=function(m){Mi(e.removed,{element:m});try{R(m).removeChild(m)}catch{z(m)}},vo=function(m,S){try{Mi(e.removed,{attribute:S.getAttributeNode(m),from:S})}catch{Mi(e.removed,{attribute:null,from:S})}if(S.removeAttribute(m),m==="is"&&!ye[m])if(Ht||co)try{qe(S)}catch{}else try{S.setAttribute(m,"")}catch{}},bs=function(m){let S=null,E=null;if(la)m="<remove></remove>"+m;else{const _e=Js(m,/^[\r\n\t ]+/);E=_e&&_e[0]}Ci==="application/xhtml+xml"&&jt===at&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");const K=O?O.createHTML(m):m;if(jt===at)try{S=new f().parseFromString(K,Ci)}catch{}if(!S||!S.documentElement){S=ve.createDocument(jt,"template",null);try{S.documentElement.innerHTML=ha?W:K}catch{}}const Ce=S.body||S.documentElement;return m&&E&&Ce.insertBefore(t.createTextNode(E),Ce.childNodes[0]||null),jt===at?Pe.call(S,St?"html":"body")[0]:St?S.documentElement:Ce},ws=function(m){return xe.call(m.ownerDocument||m,m,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},$s=function(m){return m instanceof v&&(typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||!(m.attributes instanceof p)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function")},_s=function(m){return typeof l=="function"&&m instanceof l},rt=function(m,S,E){!$e[m]||go($e[m],K=>{K.call(e,S,E,qt)})},Ss=function(m){let S=null;if(rt("beforeSanitizeElements",m,null),$s(m))return qe(m),!0;const E=be(m.nodeName);if(rt("uponSanitizeElement",m,{tagName:E,allowedTags:oe}),m.hasChildNodes()&&!_s(m.firstElementChild)&&Ee(/<[/\w]/g,m.innerHTML)&&Ee(/<[/\w]/g,m.textContent)||m.nodeType===Di.progressingInstruction||sa&&m.nodeType===Di.comment&&Ee(/<[/\w]/g,m.data))return qe(m),!0;if(!oe[E]||Si[E]){if(!Si[E]&&Cs(E)&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,E)||se.tagNameCheck instanceof Function&&se.tagNameCheck(E)))return!1;if(da&&!Wt[E]){const K=R(m)||m.parentNode,Ce=A(m)||m.childNodes;if(Ce&&K){const _e=Ce.length;for(let De=_e-1;De>=0;--De){const Qe=_(Ce[De],!0);Qe.__removalCount=(m.__removalCount||0)+1,K.insertBefore(Qe,D(m))}}}return qe(m),!0}return m instanceof d&&!bd(m)||(E==="noscript"||E==="noembed"||E==="noframes")&&Ee(/<\/no(script|embed|frames)/i,m.innerHTML)?(qe(m),!0):(Nt&&m.nodeType===Di.text&&(S=m.textContent,go([X,fe,Oe],K=>{S=Ai(S,K," ")}),m.textContent!==S&&(Mi(e.removed,{element:m.cloneNode()}),m.textContent=S)),rt("afterSanitizeElements",m,null),!1)},xs=function(m,S,E){if(ls&&(S==="id"||S==="name")&&(E in t||E in gd))return!1;if(!(ra&&!aa[S]&&Ee(_t,S))){if(!(rs&&Ee(bi,S))){if(!ye[S]||aa[S]){if(!(Cs(m)&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,m)||se.tagNameCheck instanceof Function&&se.tagNameCheck(m))&&(se.attributeNameCheck instanceof RegExp&&Ee(se.attributeNameCheck,S)||se.attributeNameCheck instanceof Function&&se.attributeNameCheck(S))||S==="is"&&se.allowCustomizedBuiltInElements&&(se.tagNameCheck instanceof RegExp&&Ee(se.tagNameCheck,E)||se.tagNameCheck instanceof Function&&se.tagNameCheck(E))))return!1}else if(!ca[S]){if(!Ee(Ut,Ai(E,It,""))){if(!((S==="src"||S==="xlink:href"||S==="href")&&m!=="script"&&o0(E,"data:")===0&&hs[m])){if(!(ss&&!Ee(wi,Ai(E,It,"")))){if(E)return!1}}}}}}return!0},Cs=function(m){return m!=="annotation-xml"&&Js(m,$i)},ks=function(m){rt("beforeSanitizeAttributes",m,null);const{attributes:S}=m;if(!S)return;const E={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ye};let K=S.length;for(;K--;){const Ce=S[K],{name:_e,namespaceURI:De,value:Qe}=Ce,ki=be(_e);let Te=_e==="value"?Qe:a0(Qe);if(E.attrName=ki,E.attrValue=Te,E.keepAttr=!0,E.forceKeepAttr=void 0,rt("uponSanitizeAttribute",m,E),Te=E.attrValue,E.forceKeepAttr||(vo(_e,m),!E.keepAttr))continue;if(!ns&&Ee(/\/>/i,Te)){vo(_e,m);continue}Nt&&go([X,fe,Oe],Es=>{Te=Ai(Te,Es," ")});const Ts=be(m.nodeName);if(!!xs(Ts,ki,Te)){if(ds&&(ki==="id"||ki==="name")&&(vo(_e,m),Te=ud+Te),sa&&Ee(/((--!?|])>)|<\/(style|title)/i,Te)){vo(_e,m);continue}if(O&&typeof w=="object"&&typeof w.getAttributeType=="function"&&!De)switch(w.getAttributeType(Ts,ki)){case"TrustedHTML":{Te=O.createHTML(Te);break}case"TrustedScriptURL":{Te=O.createScriptURL(Te);break}}try{De?m.setAttributeNS(De,_e,Te):m.setAttribute(_e,Te),$s(m)?qe(m):Zs(e.removed)}catch{}}}rt("afterSanitizeAttributes",m,null)},wd=function P(m){let S=null;const E=ws(m);for(rt("beforeSanitizeShadowDOM",m,null);S=E.nextNode();)rt("uponSanitizeShadowNode",S,null),!Ss(S)&&(S.content instanceof r&&P(S.content),ks(S));rt("afterSanitizeShadowDOM",m,null)};return e.sanitize=function(P){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},S=null,E=null,K=null,Ce=null;if(ha=!P,ha&&(P="<!-->"),typeof P!="string"&&!_s(P))if(typeof P.toString=="function"){if(P=P.toString(),typeof P!="string")throw zi("dirty is not a string, aborting")}else throw zi("toString is not a function");if(!e.isSupported)return P;if(na||ua(m),e.removed=[],typeof P=="string"&&(xi=!1),xi){if(P.nodeName){const Qe=be(P.nodeName);if(!oe[Qe]||Si[Qe])throw zi("root node is forbidden and cannot be sanitized in-place")}}else if(P instanceof l)S=bs("<!---->"),E=S.ownerDocument.importNode(P,!0),E.nodeType===Di.element&&E.nodeName==="BODY"||E.nodeName==="HTML"?S=E:S.appendChild(E);else{if(!Ht&&!Nt&&!St&&P.indexOf("<")===-1)return O&&ho?O.createHTML(P):P;if(S=bs(P),!S)return Ht?null:ho?W:""}S&&la&&qe(S.firstChild);const _e=ws(xi?P:S);for(;K=_e.nextNode();)Ss(K)||(K.content instanceof r&&wd(K.content),ks(K));if(xi)return P;if(Ht){if(co)for(Ce=de.call(S.ownerDocument);S.firstChild;)Ce.appendChild(S.firstChild);else Ce=S;return(ye.shadowroot||ye.shadowrootmode)&&(Ce=Ie.call(i,Ce,!0)),Ce}let De=St?S.outerHTML:S.innerHTML;return St&&oe["!doctype"]&&S.ownerDocument&&S.ownerDocument.doctype&&S.ownerDocument.doctype.name&&Ee(Ll,S.ownerDocument.doctype.name)&&(De="<!DOCTYPE "+S.ownerDocument.doctype.name+`>
`+De),Nt&&go([X,fe,Oe],Qe=>{De=Ai(De,Qe," ")}),O&&ho?O.createHTML(De):De},e.setConfig=function(){let P=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ua(P),na=!0},e.clearConfig=function(){qt=null,na=!1},e.isValidAttribute=function(P,m,S){qt||ua({});const E=be(P),K=be(m);return xs(E,K,S)},e.addHook=function(P,m){typeof m=="function"&&($e[P]=$e[P]||[],Mi($e[P],m))},e.removeHook=function(P){if($e[P])return Zs($e[P])},e.removeHooks=function(P){$e[P]&&($e[P]=[])},e.removeAllHooks=function(){$e={}},e}var _o=Rl();let Lo=class extends ge{constructor(){super(...arguments),this.collectionLinks=[]}render(){return h`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize==="mobile"?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){return h`
      <div id="list-line-top">
        <div id="list-line-left">${this.imageBlockTemplate}</div>
        <div id="list-line-right">
          <div id="title-line">
            <div id="title">${this.titleTemplate}</div>
            ${this.iconRightTemplate}
          </div>
        </div>
      </div>
      <div id="list-line-bottom">${this.detailsTemplate}</div>
    `}get desktopTemplate(){return h`
      <div id="list-line-left">${this.imageBlockTemplate}</div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `}get imageBlockTemplate(){if(!this.model)return b;const e=this.model.mediatype==="collection",t=this.displayValueProvider.itemPageUrl(this.model.identifier,e);return h`<a href=${t}>
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isCompactTile=${!1}
        .isListTile=${!0}
        .viewSize=${this.classSize}
        .loggedIn=${this.loggedIn}
      >
      </image-block>
    </a> `}get detailsTemplate(){return h`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
        ${this.webArchivesCaptureDatesTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate} ${this.textSnippetsTemplate}
      ${this.reviewBlockTemplate}
    `}get iconRightTemplate(){var e,t;return h`
      <a id="icon-right" href=${this.mediatypeURL}>
        <mediatype-icon
          .mediatype=${(e=this.model)===null||e===void 0?void 0:e.mediatype}
          .collections=${(t=this.model)===null||t===void 0?void 0:t.collections}
        >
        </mediatype-icon>
      </a>
    `}get titleTemplate(){var e,t,i;return!((e=this.model)===null||e===void 0)&&e.title?!((t=this.model)===null||t===void 0)&&t.href?h`<a href="${this.baseNavigationUrl}${this.model.href}"
          >${(i=this.model.title)!==null&&i!==void 0?i:this.model.identifier}</a
        >`:this.detailsLink(this.model.identifier,this.model.title,this.model.mediatype==="collection"):b}get itemLineTemplate(){const e=this.sourceTemplate,t=this.volumeTemplate,i=this.issueTemplate;return!e&&!t&&!i?b:h` <div id="item-line">${e} ${t} ${i}</div> `}get sourceTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.source?h`
      <div id="source" class="metadata">
        ${this.labelTemplate(k("Source"))}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:b}get volumeTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.volume,k("Volume"))}get issueTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.issue,k("Issue"))}get creatorTemplate(){var e,t,i;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"?h`
        <div id="creator" class="metadata">
          <span class="label"
            >${(t=this.displayValueProvider.accountLabel)!==null&&t!==void 0?t:b}</span
          >
        </div>
      `:!(!((i=this.model)===null||i===void 0)&&i.creators)||this.model.creators.length===0?b:h`
      <div id="creator" class="metadata">
        ${this.labelTemplate(k("By"))}
        ${wo(Dt(this.model.creators,o=>this.searchLink("creator",o)),", ")}
      </div>
    `}get datePublishedTemplate(){var e;const t=(e=this.model)===null||e===void 0?void 0:e.datePublished;let i="long";return Kr(t)&&(i="year-only"),this.metadataTemplate(Qi(t,i),k("Published"))}get dateSortByTemplate(){return this.effectiveSort&&(this.effectiveSort.field==="addeddate"||this.effectiveSort.field==="reviewdate"||this.effectiveSort.field==="publicdate")?this.metadataTemplate(Qi(this.date,"long"),this.displayValueProvider.dateLabel):b}get viewsTemplate(){var e,t,i,o;const r=((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount;return r==null?b:((o=this.model)===null||o===void 0?void 0:o.mediatype)==="search"?this.metadataTemplate("(Favorited search query)",""):this.metadataTemplate(`${Ni(r,this.formatSize)}`,k("Views"))}get ratingTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.averageRating,k("Avg Rating"))}get reviewsTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.commentCount,k("Reviews"))}get topicsTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.subjects)||this.model.subjects.length===0?b:h`
      <div id="topics" class="metadata">
        ${this.labelTemplate(k("Topics"))}
        ${wo(Dt(this.model.subjects,t=>this.searchLink("subject",t)),", ")}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?b:h`
      <div id="collections" class="metadata">
        ${this.labelTemplate(k("Collections"))}
        ${wo(this.collectionLinks,", ")}
      </div>
    `}get descriptionTemplate(){var e,t,i;return this.metadataTemplate(Jc(_o.sanitize((i=(t=(e=this.model)===null||e===void 0?void 0:e.description)===null||t===void 0?void 0:t.replace(/\n/g," "))!==null&&i!==void 0?i:"")),"","description")}get reviewBlockTemplate(){var e;if(!(!((e=this.model)===null||e===void 0)&&e.review))return b;const{title:t,body:i,stars:o}=this.model.review;return h`
      <review-block
        viewsize="list"
        .title=${t}
        .body=${i}
        .starRating=${o}
      >
      </review-block>
    `}get textSnippetsTemplate(){var e;return this.hasSnippets?h`<text-snippet-block
      viewsize="list"
      .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}
    ></text-snippet-block>`:b}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}get webArchivesCaptureDatesTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.captureDates)||!this.model.title?b:h`
      <ul class="capture-dates">
        ${Dt(this.model.captureDates,t=>h`<li>
            ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,t)}
          </li>`)}
      </ul>
    `}metadataTemplate(e,t="",i){return e?h`
      <div id=${Qr(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:b}labelTemplate(e){return h` ${e?h`<span class="label">${e}: </span>`:b}`}searchLink(e,t){if(!e||!t)return b;const i=encodeURIComponent(`${e}:"${t}"`);return h`<a
      href="${this.baseNavigationUrl}/search?query=${i}"
      rel="nofollow"
    >
      ${_o.sanitize(t)}</a
    >`}detailsLink(e,t,i=!1){if(!e)return b;const o=t!=null?t:e,r=this.displayValueProvider.itemPageUrl(e,i);return h`<a href=${r}> ${_o.sanitize(o)} </a>`}get mediatypeURL(){var e;if(this.baseNavigationUrl===void 0||!(!((e=this.model)===null||e===void 0)&&e.mediatype))return b;switch(this.model.mediatype){case"collection":return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case"account":return b;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(e){(e.has("model")||e.has("collectionTitles"))&&this.buildCollectionLinks()}async buildCollectionLinks(){var e,t,i;if(!(!((e=this.model)===null||e===void 0)&&e.collections)||this.model.collections.length===0)return;this.collectionLinks=[];const o=[];for(const r of this.model.collections)!Yo[r]&&!r.startsWith("fav-")&&o.push(this.detailsLink(r,(i=(t=this.collectionTitles)===null||t===void 0?void 0:t.get(r))!==null&&i!==void 0?i:r,!0));this.collectionLinks=o}get date(){var e,t,i,o,r;switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(r=this.model)===null||r===void 0?void 0:r.dateArchived}}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return g`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      div a {
        text-decoration: none;
      }

      div a:link {
        color: var(--ia-theme-link-color, #4b64ff);
      }

      .label {
        font-weight: bold;
      }

      #list-line.mobile {
        --infiniteScrollerRowGap: 20px;
        --infiniteScrollerRowHeight: auto;
      }

      #list-line.desktop {
        --infiniteScrollerRowGap: 30px;
        --infiniteScrollerRowHeight: auto;
      }

      /* fields */
      #icon-right {
        width: 20px;
        padding-top: 5px;
        --iconHeight: 20px;
        --iconWidth: 20px;
        --iconTextAlign: right;
        margin-top: -8px;
        text-align: right;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
        font-size: 22px;
        font-weight: bold;
        /* align top of text with image */
        line-height: 25px;
        margin-top: -4px;
        padding-bottom: 2px;
        flex-grow: 1;

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        overflow-wrap: anywhere;
      }

      .metadata {
        line-height: 20px;
      }

      #description,
      #creator,
      #topics,
      #source {
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        word-break: break-word;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;

        /*
         * Safari doesn't always respect the line-clamping rules above,
         * so we add this to ensure these fields still get truncated
         */
        max-height: 60px;
      }

      #collections {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        overflow-wrap: anywhere;
      }

      #collections > a {
        display: inline-block;
      }

      #icon {
        padding-top: 5px;
      }

      #description {
        padding-top: 10px;
      }

      /* Top level container */
      #list-line {
        display: flex;
      }

      #list-line.mobile {
        flex-direction: column;
      }

      #list-line.desktop {
        column-gap: 10px;
      }

      #list-line-top {
        display: flex;
        column-gap: 7px;
      }

      #list-line-bottom {
        padding-top: 4px;
      }

      #list-line-right,
      #list-line-top,
      #list-line-bottom {
        width: 100%;
      }

      /*
       * If the container becomes very tiny, don't let the thumbnail side take
       * up too much space. Shouldn't make a difference on ordinary viewport sizes.
       */
      #list-line-left {
        max-width: 25%;

        display: flex;
        flex-direction: column;
        row-gap: 5px;
      }

      div a:hover {
        text-decoration: underline;
      }

      /* Lines containing multiple div as row */
      #item-line,
      #dates-line,
      #views-line,
      #title-line {
        display: flex;
        flex-direction: row;
        column-gap: 10px;
      }

      /*
       * With the exception of the title line, allow these to wrap if
       * the space becomes too small to accommodate them together.
       * 
       * The title line is excluded because it contains the mediatype icon
       * which we don't want to wrap.
       */
      #item-line,
      #dates-line,
      #views-line {
        flex-wrap: wrap;
      }

      .capture-dates {
        margin: 0;
        padding: 0;
        list-style-type: none;
      }

      .capture-dates a:link {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      .capture-dates a:hover {
        text-decoration: underline;
      }
    `}};n([u({type:Object})],Lo.prototype,"collectionTitles",void 0);n([L()],Lo.prototype,"collectionLinks",void 0);Lo=n([F("tile-list")],Lo);let et=class extends B{constructor(){super(...arguments),this.loggedIn=!1}render(){return h`
      <div id="container">
        ${this.headerTemplate}
        <div id="hover-tile-list">
          <tile-list
            .model=${this.model}
            .baseNavigationUrl=${this.baseNavigationUrl}
            .baseImageUrl=${this.baseImageUrl}
            .loggedIn=${this.loggedIn}
            .sortParam=${this.sortParam}
            .collectionTitles=${this.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${this.currentWidth}
          ></tile-list>
        </div>
      </div>
    `}get headerTemplate(){var e,t,i,o;if(((e=this.model)===null||e===void 0?void 0:e.collections.length)===0)return b;let r="",s="";for(const l of((t=this.model)===null||t===void 0?void 0:t.collections)||[])if(!Yo[l]&&!l.startsWith("fav-")){r=(o=(i=this.collectionTitles)===null||i===void 0?void 0:i.get(l))!==null&&o!==void 0?o:l,s=l;break}return s?h`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${s}">
          <img
            src="${this.baseImageUrl}/services/img/${s}"
            alt=""
          /><span>${r}</span>
        </a>
      </div>
    `:b}static get styles(){const e=g`var(--hoverPaneHeaderBGColor, #edf0ff)`,t=g`var(--ia-theme-link-color, #4b64ff)`,i=g`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;return g`
      :host {
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.1s ease-in, transform 0.1s ease-in;
        --image-width: auto;
      }

      :host(.visible) {
        visibility: visible;
      }

      :host(.fade-in) {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          transition-duration: 0.001s !important; /* Imperceptibly fast */
        }
      }

      #container {
        width: max-content;
        max-width: min(45vw, 600px);
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.8);
        background: white;
      }

      @media screen and (max-width: 600px) {
        #container {
          max-width: 80vw;
        }
      }

      /* main tile-list container */
      #hover-tile-list {
        padding: 10px;
      }

      /* header on hover panel to show collection icon and title */
      #list-line-header {
        background: ${e};
      }
      #list-line-header a {
        display: flex;
        align-items: center;
        column-gap: 5px;
        height: 3.4rem;
        padding: 0 10px;
        width: fit-content;
        font-size: 1.4rem;
        color: ${t};
        font-family: ${i};
        text-decoration: none;
        width: auto;
      }
      #list-line-header a span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #list-line-header a:hover {
        text-decoration: underline;
      }
      #list-line-header a img {
        width: 30px;
        max-height: 30px;
      }
    `}};n([u({type:Object})],et.prototype,"model",void 0);n([u({type:String})],et.prototype,"baseNavigationUrl",void 0);n([u({type:String})],et.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],et.prototype,"loggedIn",void 0);n([u({type:Object})],et.prototype,"sortParam",void 0);n([u({type:Number})],et.prototype,"mobileBreakpoint",void 0);n([u({type:Number})],et.prototype,"currentWidth",void 0);n([u({type:Object})],et.prototype,"collectionTitles",void 0);et=n([F("tile-hover-pane")],et);let sn=class extends ge{render(){var e,t,i,o,r,s;return h`
      <div id="list-line" class="${this.classSize}">
        <image-block
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isCompactTile=${!0}
          .isListTile=${!0}
          .viewSize=${this.classSize}
          .loggedIn=${this.loggedIn}
        >
        </image-block>
        <a href=${this.href} id="title"
          >${_o.sanitize((t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"")}</a
        >
        <div id="creator">
          ${((i=this.model)===null||i===void 0?void 0:i.mediatype)==="account"?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">${Qi(this.date,this.dateFormatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(o=this.model)===null||o===void 0?void 0:o.mediatype}
            .collections=${(r=this.model)===null||r===void 0?void 0:r.collections}
          >
          </mediatype-icon>
        </div>
        <div id="views">${Ni((s=this.views)!==null&&s!==void 0?s:0,this.formatSize)}</div>
      </div>
    `}get href(){var e;return!(!((e=this.model)===null||e===void 0)&&e.identifier)||this.baseNavigationUrl==null?b:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get creator(){var e;return(e=this.displayValueProvider.firstCreatorMatchingFilter)!==null&&e!==void 0?e:b}get date(){var e,t,i,o,r;switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"publicdate":return(t=this.model)===null||t===void 0?void 0:t.dateArchived;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(r=this.model)===null||r===void 0?void 0:r.datePublished}}get views(){var e,t,i;return((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get dateFormatSize(){var e,t;return(!this.isSortedByDate||((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="date")&&Kr((t=this.model)===null||t===void 0?void 0:t.datePublished)?"year-only":this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.effectiveSort)===null||e===void 0?void 0:e.field)}static get styles(){return g`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      #list-line {
        display: grid;
        column-gap: 10px;
        border-top: 1px solid #ddd;
        align-items: center;
        line-height: 20px;
        padding-top: 5px;
        margin-bottom: -5px;
      }

      #list-line.mobile {
        grid-template-columns: 36px 3fr 2fr 68px 35px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 2fr 95px 30px 60px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      #title {
        text-decoration: none;
      }

      #title:link {
        color: var(--ia-theme-link-color, #4b64ff);
      }

      #title,
      #creator {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #icon {
        margin-left: 2px;
      }

      #views {
        text-align: right;
        padding-right: 8px;
      }

      .mobile #views {
        display: none;
      }

      .mobile mediatype-icon {
        --iconHeight: 14px;
        --iconWidth: 14px;
      }

      .desktop #icon {
        --iconHeight: 20px;
        --iconWidth: 20px;
      }

      item-image {
        --imgHeight: 100%;
        --imgWidth: 100%;
      }
    `}};sn=n([F("tile-list-compact")],sn);let nn=class extends ge{render(){return h`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${k("Title")}</div>
        <div id="creator">${k("Creator")}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel||k("Published")}
        </div>
        <div id="icon">${k("Type")}</div>
        <div id="views">${k("Views")}</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return g`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
      }

      .mobile #views {
        display: none;
      }

      #views {
        text-align: right;
        padding-right: 8px;
      }

      #list-line-header {
        display: grid;
        column-gap: 10px;
        align-items: flex-end;
        padding-bottom: 2px;
      }

      #list-line-header.mobile {
        grid-template-columns: 36px 3fr 2fr 68px 35px;
      }

      #list-line-header.desktop {
        grid-template-columns: 51px 3fr 2fr 95px 30px 60px;
      }
    `}};nn=n([F("tile-list-compact-header")],nn);const ln=(a,e=-1/0,t=1/0)=>Math.max(e,Math.min(a,t));class b0{constructor(e,t={}){var i,o,r,s,l,d,c;this.host=e,this.mobileBreakpoint=600,this.offsetX=-10,this.offsetY=15,this.showDelay=300,this.hideDelay=100,this.longPressDelay=600,this.enableLongPress=!1,this.hoverPaneState="hidden",this.forceTouchBackdrop=!1,this.lastPointerClientPos={x:0,y:0},this.handleMouseEnter=p=>{this.handleMouseMove(p)},this.handleMouseMove=p=>{var v;clearTimeout(this.hideTimer),this.hoverPaneState==="fading-out"&&(this.hoverPaneState="shown",(v=this.hoverPane)===null||v===void 0||v.classList.add("fade-in")),this.hoverPaneState==="hidden"&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:p.clientX,y:p.clientY})},this.handleMouseLeave=()=>{clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.hoverPaneState!=="hidden"&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))},this.handleTouchStart=p=>{clearTimeout(this.longPressTimer),p.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState==="hidden"&&this.showHoverPane()},this.longPressDelay),this.lastPointerClientPos={x:p.touches[0].clientX,y:p.touches[0].clientY})},this.handleLongPressCancel=()=>{clearTimeout(this.longPressTimer)},this.handleContextMenu=p=>{p.preventDefault()},this.handleBackdropInteraction=p=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane(),p.stopPropagation()},this.mobileBreakpoint=(i=t.mobileBreakpoint)!==null&&i!==void 0?i:this.mobileBreakpoint,this.offsetX=(o=t.offsetX)!==null&&o!==void 0?o:this.offsetX,this.offsetY=(r=t.offsetY)!==null&&r!==void 0?r:this.offsetY,this.showDelay=(s=t.showDelay)!==null&&s!==void 0?s:this.showDelay,this.hideDelay=(l=t.hideDelay)!==null&&l!==void 0?l:this.hideDelay,this.longPressDelay=(d=t.longPressDelay)!==null&&d!==void 0?d:this.longPressDelay,this.enableLongPress=(c=t.enableLongPress)!==null&&c!==void 0?c:this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){var e,t,i,o,r,s;return this.shouldRenderHoverPane?h` ${this.touchBackdropTemplate}
          <tile-hover-pane
            .model=${(e=this.hoverPaneProps)===null||e===void 0?void 0:e.model}
            .baseNavigationUrl=${(t=this.hoverPaneProps)===null||t===void 0?void 0:t.baseNavigationUrl}
            .baseImageUrl=${(i=this.hoverPaneProps)===null||i===void 0?void 0:i.baseImageUrl}
            .loggedIn=${(o=this.hoverPaneProps)===null||o===void 0?void 0:o.loggedIn}
            .sortParam=${(r=this.hoverPaneProps)===null||r===void 0?void 0:r.sortParam}
            .collectionTitles=${(s=this.hoverPaneProps)===null||s===void 0?void 0:s.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${window.innerWidth}
          ></tile-hover-pane>`:b}toggleHoverPane(e){var t;this.hoverPaneState==="shown"?(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1):(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=(t=e.enableTouchBackdrop)!==null&&t!==void 0?t:!1,this.showHoverPane())}get touchBackdropTemplate(){return this.showTouchBackdrop?h`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:b}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}get isTouchEnabled(){return"ontouchstart"in window&&window.matchMedia("(any-pointer: coarse)").matches}get shouldRenderHoverPane(){return this.hoverPaneState!=="hidden"}get hoverPaneDesiredOffsets(){var e;let[t,i]=[this.lastPointerClientPos.x,this.lastPointerClientPos.y];const o=this.lastPointerClientPos.x>window.innerWidth/2,r=this.lastPointerClientPos.y>window.innerHeight/2,s=(e=this.hoverPane)===null||e===void 0?void 0:e.getBoundingClientRect();s&&(o&&(t-=s.width),r&&(i-=s.height),t+=(o?-1:1)*this.offsetX,i+=(r?-1:1)*this.offsetY,this.isMobileView&&(t=ln(t,20,window.innerWidth-s.width-20),i=ln(i,20,window.innerHeight-s.height-20)));const l=this.host.getBoundingClientRect();return t-=l.left,i-=l.top,{left:t,top:i}}attachListeners(){this.isHoverEnabled&&(this.host.addEventListener("mouseenter",this.handleMouseEnter),this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseleave",this.handleMouseLeave)),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener("touchstart",this.handleTouchStart),this.host.addEventListener("touchmove",this.handleLongPressCancel),this.host.addEventListener("touchend",this.handleLongPressCancel),this.host.addEventListener("touchcancel",this.handleLongPressCancel),this.host.addEventListener("contextmenu",this.handleContextMenu))}detachListeners(){this.host.removeEventListener("mouseenter",this.handleMouseEnter),this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseleave",this.handleMouseLeave),this.host.removeEventListener("touchstart",this.handleTouchStart),this.host.removeEventListener("touchmove",this.handleLongPressCancel),this.host.removeEventListener("touchend",this.handleLongPressCancel),this.host.removeEventListener("touchcancel",this.handleLongPressCancel),this.host.removeEventListener("contextmenu",this.handleContextMenu)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.showHoverPane()},this.showDelay)}async showHoverPane(){var e;this.hoverPaneState="shown",this.host.requestUpdate(),await this.host.updateComplete,await new Promise(t=>{requestAnimationFrame(t)}),this.repositionHoverPane(),(e=this.hoverPane)===null||e===void 0||e.classList.add("visible","fade-in")}fadeOutHoverPane(){var e;this.hoverPaneState="fading-out",(e=this.hoverPane)===null||e===void 0||e.classList.remove("fade-in"),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState="hidden",this.host.requestUpdate()},100)}repositionHoverPane(){if(!this.hoverPane)return;const{top:e,left:t}=this.hoverPaneDesiredOffsets;this.hoverPane.style.top=`${e}px`,this.hoverPane.style.left=`${t}px`}}var _r;let We=_r=class extends ge{constructor(){super(...arguments),this.isManageView=!1,this.enableHoverPane=!1,this.manageCheckTitle=k("Remove this item from the list")}render(){var e,t;const i=this.tileDisplayMode==="grid",o=(t=(e=this.hoverPaneController)===null||e===void 0?void 0:e.getTemplate())!==null&&t!==void 0?t:b;return h`
      <div id="container" class=${i?"hoverable":b}>
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
        ${this.manageCheckTemplate} ${o}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new b0(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){const{currentWidth:e,sortParam:t,defaultSortParam:i,mobileBreakpoint:o}=this;return h`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t!=null?t:i}
        .mobileBreakpoint=${o}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return h`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t,i;return h`
      <a
        href=${this.linkTileHref}
        aria-label=${(t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"Untitled item"}
        title=${this.shouldPrepareHoverPane?b:Qr((i=this.model)===null||i===void 0?void 0:i.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
      >
        ${this.tile}
      </a>
    `}get linkTileHref(){var e;return!(!((e=this.model)===null||e===void 0)&&e.identifier)||this.baseNavigationUrl==null?b:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get manageCheckTemplate(){var e;return!this.isManageView||this.tileDisplayMode!=="grid"?b:h`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          .checked=${(e=this.model)===null||e===void 0?void 0:e.checked}
          @change=${this.handleLinkClicked}
        />
      </div>
    `}get shouldPrepareHoverPane(){var e,t;return this.enableHoverPane&&!!this.tileDisplayMode&&_r.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]&&((e=this.model)===null||e===void 0?void 0:e.mediatype)!=="search"&&!(!((t=this.model)===null||t===void 0)&&t.captureDates)}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e==null||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),(e=this.resizeObserver)===null||e===void 0||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}handleLinkClicked(e){this.isManageView&&(e.preventDefault(),this.model&&(this.model.checked=!this.model.checked)),this.dispatchEvent(new CustomEvent("resultSelected",{detail:this.model}))}handleLinkContextMenu(e){this.isManageView&&this.linkTileHref!==b&&(e.preventDefault(),window.open(this.linkTileHref,"_blank"))}tileInfoButtonPressed(e){var t;(t=this.hoverPaneController)===null||t===void 0||t.toggleHoverPane({coords:e.detail,enableTouchBackdrop:!0})}get tile(){const{model:e,collectionPagePath:t,baseNavigationUrl:i,currentWidth:o,currentHeight:r,sortParam:s,creatorFilter:l,mobileBreakpoint:d,defaultSortParam:c}=this;if(!e)return b;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return h`<collection-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${r}
              .creatorFilter=${l}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;case"account":return h`<account-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${r}
              .creatorFilter=${l}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;case"search":return h`<search-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${r}
              .creatorFilter=${l}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!1}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </search-tile>`;default:return h`<item-tile
              .model=${e}
              .collectionPagePath=${t}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${s}
              .defaultSortParam=${c}
              .creatorFilter=${l}
              .loggedIn=${this.loggedIn}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case"list-compact":return h`<tile-list-compact
          .model=${e}
          .collectionPagePath=${t}
          .currentWidth=${o}
          .currentHeight=${r}
          .baseNavigationUrl=${i}
          .sortParam=${s}
          .defaultSortParam=${c}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list-compact>`;case"list-detail":return h`<tile-list
          .model=${e}
          .collectionPagePath=${t}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${o}
          .currentHeight=${r}
          .baseNavigationUrl=${i}
          .sortParam=${s}
          .defaultSortParam=${c}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list>`;default:return b}}static get styles(){return g`
      :host {
        display: block;
        height: 100%;
      }

      collection-tile {
        --tileBorderColor: #555555;
        --tileBackgroundColor: #666666;
        --imageBlockBackgroundColor: #666666;
      }

      account-tile {
        --tileBorderColor: #dddddd;
        --imageBlockBackgroundColor: #fcf5e6;
      }

      item-tile {
        --tileBorderColor: #dddddd;
        --imageBlockBackgroundColor: #f1f1f4;
      }

      search-tile {
        --tileBorderColor: #555555;
        --tileBackgroundColor: #666666;
        --imageBlockBackgroundColor: #666666;
        --iconFillColor: #2c2c2c;
      }

      #container {
        position: relative;
        height: 100%;
        border-radius: 4px;
      }

      #container.hoverable:hover {
        box-shadow: 0 0 6px 2px rgba(8, 8, 32, 0.8);
        transition: box-shadow 0.1s ease;
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
        transition: transform 0.05s ease;
      }

      a :first-child {
        display: block;
        height: 100%;
      }

      .manage-check {
        position: absolute;
        right: 0;
        top: 0;
        border: 5px solid #2c2c2c;
        border-radius: 3px;
        background-color: #2c2c2c;
        z-index: 1;
      }

      .manage-check > input[type='checkbox'] {
        display: block;
        margin: 0;
      }

      #touch-backdrop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 2;
        background: transparent;
      }

      tile-hover-pane {
        position: absolute;
        top: 0;
        left: -9999px;
        z-index: 2;
      }
    `}};We.HOVER_PANE_DISPLAY_MODES={grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1};n([u({type:String})],We.prototype,"tileDisplayMode",void 0);n([u({type:Boolean})],We.prototype,"isManageView",void 0);n([u({type:Object})],We.prototype,"resizeObserver",void 0);n([u({type:Object})],We.prototype,"collectionTitles",void 0);n([u({type:Boolean})],We.prototype,"enableHoverPane",void 0);n([u({type:String})],We.prototype,"manageCheckTitle",void 0);n([Y("#container")],We.prototype,"container",void 0);n([Y("tile-hover-pane")],We.prototype,"hoverPane",void 0);We=_r=n([F("tile-dispatcher")],We);let dn=class extends B{render(){return h` <div id="container"></div> `}static get styles(){return g`
      :host {
        display: block;
        height: 100%;
      }

      #container {
        background: linear-gradient(to right bottom, #dddddd, #d8d8d8);
        border-radius: var(--tileCornerRadius, 4px);
        background-size: 100% 100%;
        display: block;
        height: 100%;
      }
    `}};dn=n([F("collection-browser-loading-tile")],dn);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const So=window,Gr=So.ShadowRoot&&(So.ShadyCSS===void 0||So.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ol=Symbol(),cn=new WeakMap;class w0{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ol)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Gr&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=cn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&cn.set(t,e))}return e}toString(){return this.cssText}}const $0=a=>new w0(typeof a=="string"?a:a+"",void 0,Ol),_0=(a,e)=>{Gr?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=So.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},hn=Gr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return $0(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ea;const Ro=window,pn=Ro.trustedTypes,S0=pn?pn.emptyScript:"",un=Ro.reactiveElementPolyfillSupport,Sr={toAttribute(a,e){switch(e){case Boolean:a=a?S0:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Fl=(a,e)=>e!==a&&(e==e||a==a),Ma={attribute:!0,type:String,converter:Sr,reflect:!1,hasChanged:Fl},xr="finalized";class Li extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=Ma){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ma}static finalize(){if(this.hasOwnProperty(xr))return!1;this[xr]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(hn(o))}else e!==void 0&&t.push(hn(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return _0(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Ma){var o;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const s=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:Sr).toAttribute(t,i.type);this._$El=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){const s=o.getPropertyOptions(r),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:Sr;this._$El=r,this[r]=l.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Fl)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,r)=>this[r]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}Li[xr]=!0,Li.elementProperties=new Map,Li.elementStyles=[],Li.shadowRootOptions={mode:"open"},un==null||un({ReactiveElement:Li}),((Ea=Ro.reactiveElementVersions)!==null&&Ea!==void 0?Ea:Ro.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Aa;const Oo=window,di=Oo.trustedTypes,vn=di?di.createPolicy("lit-html",{createHTML:a=>a}):void 0,Cr="$lit$",mt=`lit$${(Math.random()+"").slice(9)}$`,Bl="?"+mt,x0=`<${Bl}>`,Ft=document,Gi=()=>Ft.createComment(""),Yi=a=>a===null||typeof a!="object"&&typeof a!="function",Il=Array.isArray,C0=a=>Il(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",za=`[ 	
\f\r]`,Ri=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,fn=/-->/g,mn=/>/g,kt=RegExp(`>|${za}(?:([^\\s"'>=/]+)(${za}*=${za}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gn=/'/g,yn=/"/g,Ul=/^(?:script|style|textarea|title)$/i,Nl=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),Fe=Nl(1),Hl=Nl(2),ci=Symbol.for("lit-noChange"),re=Symbol.for("lit-nothing"),bn=new WeakMap,zt=Ft.createTreeWalker(Ft,129,null,!1);function Vl(a,e){if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return vn!==void 0?vn.createHTML(e):e}const k0=(a,e)=>{const t=a.length-1,i=[];let o,r=e===2?"<svg>":"",s=Ri;for(let l=0;l<t;l++){const d=a[l];let c,p,v=-1,f=0;for(;f<d.length&&(s.lastIndex=f,p=s.exec(d),p!==null);)f=s.lastIndex,s===Ri?p[1]==="!--"?s=fn:p[1]!==void 0?s=mn:p[2]!==void 0?(Ul.test(p[2])&&(o=RegExp("</"+p[2],"g")),s=kt):p[3]!==void 0&&(s=kt):s===kt?p[0]===">"?(s=o!=null?o:Ri,v=-1):p[1]===void 0?v=-2:(v=s.lastIndex-p[2].length,c=p[1],s=p[3]===void 0?kt:p[3]==='"'?yn:gn):s===yn||s===gn?s=kt:s===fn||s===mn?s=Ri:(s=kt,o=void 0);const w=s===kt&&a[l+1].startsWith("/>")?" ":"";r+=s===Ri?d+x0:v>=0?(i.push(c),d.slice(0,v)+Cr+d.slice(v)+mt+w):d+mt+(v===-2?(i.push(void 0),l):w)}return[Vl(a,r+(a[t]||"<?>")+(e===2?"</svg>":"")),i]};class Xi{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const l=e.length-1,d=this.parts,[c,p]=k0(e,t);if(this.el=Xi.createElement(c,i),zt.currentNode=this.el.content,t===2){const v=this.el.content,f=v.firstChild;f.remove(),v.append(...f.childNodes)}for(;(o=zt.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const v=[];for(const f of o.getAttributeNames())if(f.endsWith(Cr)||f.startsWith(mt)){const w=p[s++];if(v.push(f),w!==void 0){const $=o.getAttribute(w.toLowerCase()+Cr).split(mt),_=/([.?@])?(.*)/.exec(w);d.push({type:1,index:r,name:_[2],strings:$,ctor:_[1]==="."?E0:_[1]==="?"?A0:_[1]==="@"?z0:Zo})}else d.push({type:6,index:r})}for(const f of v)o.removeAttribute(f)}if(Ul.test(o.tagName)){const v=o.textContent.split(mt),f=v.length-1;if(f>0){o.textContent=di?di.emptyScript:"";for(let w=0;w<f;w++)o.append(v[w],Gi()),zt.nextNode(),d.push({type:2,index:++r});o.append(v[f],Gi())}}}else if(o.nodeType===8)if(o.data===Bl)d.push({type:2,index:r});else{let v=-1;for(;(v=o.data.indexOf(mt,v+1))!==-1;)d.push({type:7,index:r}),v+=mt.length-1}r++}}static createElement(e,t){const i=Ft.createElement("template");return i.innerHTML=e,i}}function hi(a,e,t=a,i){var o,r,s,l;if(e===ci)return e;let d=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const c=Yi(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==c&&((r=d==null?void 0:d._$AO)===null||r===void 0||r.call(d,!1),c===void 0?d=void 0:(d=new c(a),d._$AT(a,t,i)),i!==void 0?((s=(l=t)._$Co)!==null&&s!==void 0?s:l._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=hi(a,d._$AS(a,e.values),d,i)),e}class T0{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Ft).importNode(i,!0);zt.currentNode=r;let s=zt.nextNode(),l=0,d=0,c=o[0];for(;c!==void 0;){if(l===c.index){let p;c.type===2?p=new so(s,s.nextSibling,this,e):c.type===1?p=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(p=new P0(s,this,e)),this._$AV.push(p),c=o[++d]}l!==(c==null?void 0:c.index)&&(s=zt.nextNode(),l++)}return zt.currentNode=Ft,r}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class so{constructor(e,t,i,o){var r;this.type=2,this._$AH=re,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=hi(this,e,t),Yi(e)?e===re||e==null||e===""?(this._$AH!==re&&this._$AR(),this._$AH=re):e!==this._$AH&&e!==ci&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):C0(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==re&&Yi(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ft.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Xi.createElement(Vl(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{const s=new T0(r,this),l=s.u(this.options);s.v(i),this.$(l),this._$AH=s}}_$AC(e){let t=bn.get(e.strings);return t===void 0&&bn.set(e.strings,t=new Xi(e)),t}T(e){Il(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new so(this.k(Gi()),this.k(Gi()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Zo{constructor(e,t,i,o,r){this.type=1,this._$AH=re,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=re}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(r===void 0)e=hi(this,e,t,0),s=!Yi(e)||e!==this._$AH&&e!==ci,s&&(this._$AH=e);else{const l=e;let d,c;for(e=r[0],d=0;d<r.length-1;d++)c=hi(this,l[i+d],t,d),c===ci&&(c=this._$AH[d]),s||(s=!Yi(c)||c!==this._$AH[d]),c===re?e=re:e!==re&&(e+=(c!=null?c:"")+r[d+1]),this._$AH[d]=c}s&&!o&&this.j(e)}j(e){e===re?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class E0 extends Zo{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===re?void 0:e}}const M0=di?di.emptyScript:"";class A0 extends Zo{constructor(){super(...arguments),this.type=4}j(e){e&&e!==re?this.element.setAttribute(this.name,M0):this.element.removeAttribute(this.name)}}class z0 extends Zo{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=hi(this,e,t,0))!==null&&i!==void 0?i:re)===ci)return;const o=this._$AH,r=e===re&&o!==re||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==re&&(o===re||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class P0{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){hi(this,e)}}const wn=Oo.litHtmlPolyfillSupport;wn==null||wn(Xi,so),((Aa=Oo.litHtmlVersions)!==null&&Aa!==void 0?Aa:Oo.litHtmlVersions=[]).push("2.8.0");const D0=(a,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=r._$litPart$;if(s===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=s=new so(e.insertBefore(Gi(),l),l,void 0,t!=null?t:{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yr=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Xr=Symbol(),$n=new Map;class Wl{constructor(e,t){if(this._$cssResult$=!0,t!==Xr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=$n.get(this.cssText);return Yr&&e===void 0&&($n.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const L0=a=>new Wl(typeof a=="string"?a:a+"",Xr),st=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[r+1],a[0]);return new Wl(t,Xr)},R0=(a,e)=>{Yr?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=window.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},_n=Yr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return L0(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Pa;const Sn=window.trustedTypes,O0=Sn?Sn.emptyScript:"",xn=window.reactiveElementPolyfillSupport,kr={toAttribute(a,e){switch(e){case Boolean:a=a?O0:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},jl=(a,e)=>e!==a&&(e==e||a==a),Da={attribute:!0,type:String,converter:kr,reflect:!1,hasChanged:jl};class Gt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Eh(i,t);o!==void 0&&(this._$Eu.set(o,i),e.push(o))}),e}static createProperty(e,t=Da){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Da}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(_n(o))}else e!==void 0&&t.push(_n(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return R0(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Da){var o,r;const s=this.constructor._$Eh(e,i);if(s!==void 0&&i.reflect===!0){const l=((r=(o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==null&&r!==void 0?r:kr.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Ei=null}}_$AK(e,t){var i,o,r;const s=this.constructor,l=s._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const d=s.getPropertyOptions(l),c=d.converter,p=(r=(o=(i=c)===null||i===void 0?void 0:i.fromAttribute)!==null&&o!==void 0?o:typeof c=="function"?c:null)!==null&&r!==void 0?r:kr.fromAttribute;this._$Ei=l,this[l]=p(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||jl)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((o,r)=>this[r]=o),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Gt.finalized=!0,Gt.elementProperties=new Map,Gt.elementStyles=[],Gt.shadowRootOptions={mode:"open"},xn==null||xn({ReactiveElement:Gt}),((Pa=globalThis.reactiveElementVersions)!==null&&Pa!==void 0?Pa:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var La,Ra;class ii extends Gt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=D0(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ci}}ii.finalized=!0,ii._$litElement$=!0,(La=globalThis.litElementHydrateSupport)===null||La===void 0||La.call(globalThis,{LitElement:ii});const Cn=globalThis.litElementPolyfillSupport;Cn==null||Cn({LitElement:ii});((Ra=globalThis.litElementVersions)!==null&&Ra!==void 0?Ra:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ql=a=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(a,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(s){customElements.define(t,s)}}})(a,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F0=(a,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?ae(j({},e),{finisher(t){t.createProperty(e.key,a)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,a)}},B0=(a,e,t)=>{e.constructor.createProperty(t,a)};function ze(a){return(e,t)=>t!==void 0?B0(a,e,t):F0(a,e)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Oa;((Oa=window.HTMLSlotElement)===null||Oa===void 0?void 0:Oa.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const kn=a=>a!=null?a:re;var I0=Hl`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,U0=Hl`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let Se=class extends ii{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.openViaCaret=!0,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1},this.handlingCaretClick=!1}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.addEventListener("closeDropdown",this.closeOptions)}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open}mainButtonClicked(){if(this.handlingCaretClick){this.handlingCaretClick=!1;return}this.openViaButton&&this.toggleOptions()}caretInteracted(){this.openViaCaret&&this.toggleOptions()}caretClicked(){this.handlingCaretClick=!0,this.caretInteracted()}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.caretInteracted())}renderOption(e){const{label:t,url:i=void 0,id:o}=e;let r;const s=this.selectedOption===o?"selected":"";return i?r=Fe`<a
        href=${i}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:r=Fe`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,Fe`<li class=${s}>${r}</li>`}optionClicked(e,t){var i;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(i=t.selectedHandler)===null||i===void 0||i.call(t,t)),this.closeOnSelect&&this.closeOptions()}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretTemplate(){if(!this.displayCaret)return Fe``;const e=this.openViaCaret&&!this.openViaButton?"0":void 0,t=this.openViaCaret?"button":void 0;return Fe`
      <span
        class="caret"
        tabindex=${kn(e)}
        role=${kn(t)}
        @click=${this.isDisabled||this.hasCustomClickHandler?re:this.caretClicked}
        @keydown=${this.isDisabled||this.hasCustomClickHandler?re:this.caretKeyDown}
      >
        <span ?hidden=${!this.open} class="caret-up">
          <slot name="caret-up">${I0}</slot>
        </span>
        <span ?hidden=${this.open} class="caret-down">
          <slot name="caret-down">${U0}</slot>
        </span>
      </span>
    `}get dropdownTemplate(){return this.isCustomList?Fe`<slot name="list"></slot>`:Fe`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?Fe`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:Fe``:Fe``}render(){return Fe`
      <div class="ia-dropdown-group">
        <button
          class="click-main"
          @click=${this.isDisabled||this.hasCustomClickHandler?re:this.mainButtonClicked}
          ?disabled=${this.isDisabled}
        >
          <span class="sr-only">Toggle ${this.optionGroup}</span>
          <slot name="dropdown-label"></slot>
          ${this.caretTemplate}
        </button>

        <ul class="dropdown-main ${this.dropdownState}">
          ${this.dropdownTemplate}
        </ul>

        ${this.backdropTemplate}
      </div>
    `}static get styles(){const e=st`var(--dropdownBorderWidth, 1px)`,t=st`var(--dropdownBorderRadius, 4px)`,i=st`var(--dropdownBorderColor, #fff)`,o=st`var(--dropdownBgColor, #333)`,r=st`var(--dropdownTextColor, #fff)`,s=st`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=st`var(--dropdownSelectedBgColor, #fff)`;return st`
      :host {
        display: inline;
        color: ${r};
      }

      svg.caret-up-svg,
      svg.caret-down-svg,
      ::slotted(svg.caret-up-svg),
      ::slotted(svg.caret-down-svg) {
        fill: var(--dropdownCaretColor, #fff);
        vertical-align: middle;
      }

      button.click-main {
        background: transparent;
        color: inherit;
        padding: var(--dropdownMainButtonPadding, 0px);
        border: var(--dropdownMainButtonBorder, none);
        border-radius: var(--dropdownMainButtonBorderRadius, none);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-wrap: nowrap;
        flex-direction: var(--dropdownMainButtonFlexDirection, row);
        z-index: var(--dropdownListZIndex, 2);
      }

      button.click-main:disabled {
        pointer-events: none;
        cursor: not-allowed;
        opacity: 0.5;
        /* Disable text selection on disabled button */
        -webkit-user-select: none; /* Safari */
        -ms-user-select: none; /* IE 10 and IE 11 */
        user-select: none; /* Standard syntax */
      }

      button.click-main:hover {
        background-color: var(--dropdownMainButtonHoverBgColor, inherit);
      }

      button.click-main:focus,
      button.click-main:focus-visible {
        background-color: var(--dropdownMainButtonFocusBgColor, inherit);
      }

      button.click-main:active {
        background-color: var(--dropdownMainButtonActiveBgColor, inherit);
      }

      button slot[name='dropdown-label'] {
        /* Set var to 0px for column layout */
        padding-right: var(--buttonSlotPaddingRight, 5px);
        display: inline-block;
      }

      .ia-dropdown-group {
        width: inherit;
        height: inherit;
        position: relative;
      }

      .sr-only {
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        height: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        width: 1px !important;
        white-space: nowrap !important;
      }

      .caret {
        /* Maintain centered caret position but with a full-height clickable region */
        display: flex;
        align-self: stretch;
        align-items: center;
        padding: var(--caretPadding, 0px);
      }

      .caret svg {
        height: var(--caretHeight, 10px);
        width: var(--caretWidth, 20px);
      }

      #dropdown-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: transparent;
        z-index: 1;
      }

      ul {
        z-index: var(--dropdownListZIndex, 2);
      }

      ul.dropdown-main.closed {
        visibility: hidden;
        height: 1px;
        width: 1px;
      }

      ul.dropdown-main {
        position: var(--dropdownListPosition, absolute);
        list-style: none;
        margin: var(--dropdownOffsetTop, 5px) 0 0 0;
        padding: 0;
        color: ${r};
        background: ${o};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e});
        border-right: var(--dropdownBorderRightWidth, ${e});
        border-bottom: var(--dropdownBorderBottomWidth, ${e});
        border-left: var(--dropdownBorderLeftWidth, ${e});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${i};

        border-radius: var(
            --dropdownBorderTopLeftRadius,
            ${t}
          )
          var(--dropdownBorderTopRightRadius, ${t})
          var(--dropdownBorderBottomRightRadius, ${t})
          var(--dropdownBorderBottomLeftRadius, ${t});

        white-space: var(--dropdownWhiteSpace, normal);

        /* Prevent top/bottom inner li from overlapping inner border */
        overflow: hidden;
      }

      ul.dropdown-main li:hover {
        background-color: ${s};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      ul.dropdown-main li:hover:first-child {
        border-top-color: ${s};
      }

      ul.dropdown-main li:hover:last-child {
        border-bottom-color: ${s};
      }

      ul.dropdown-main li:hover:not(:first-child) {
        border-top: 0.5px solid var(--dropdownHoverTopBottomBorderColor, #333);
      }
      ul.dropdown-main li:hover:not(:last-child) {
        border-bottom: 0.5px solid
          var(--dropdownHoverTopBottomBorderColor, #333);
      }

      ul.dropdown-main li.selected:last-child {
        border-bottom-color: ${l};
      }

      ul.dropdown-main li.selected:first-child {
        border-top-color: ${l};
      }

      ul.dropdown-main li:hover > *,
      ul.dropdown-main li:focus-within > * {
        background-color: ${s};
        color: var(--dropdownHoverTextColor, #fff);
      }

      ul.dropdown-main li.selected > * {
        background-color: ${l};
        color: var(--dropdownSelectedTextColor, #2c2c2c);
      }

      ul.dropdown-main li {
        background: ${o};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${o};
        border-top: 0.5px solid ${o};
      }

      ul.dropdown-main li button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }

      ul.dropdown-main li a {
        text-decoration: none;
        display: block;
        box-sizing: border-box;
      }

      ul.dropdown-main li:first-child {
        border-top-left-radius: var(--dropdownBorderTopLeftRadius, 4px);
        border-top-right-radius: var(--dropdownBorderTopRightRadius, 4px);
      }

      ul.dropdown-main li:last-child {
        border-bottom-right-radius: var(--dropdownBorderBottomRightRadius, 4px);
        border-bottom-left-radius: var(--dropdownBorderBottomLeftRadius, 4px);
      }

      /* cover the list with the label */
      ul.dropdown-main li > * > :first-child {
        margin: 0;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        align-content: center;
        flex-wrap: nowrap;
        height: 100%;
        padding: var(--dropdownItemPaddingTop, 5px)
          var(--dropdownItemPaddingRight, 10px)
          var(--dropdownItemPaddingBottom, 5px)
          var(--dropdownItemPaddingLeft, 10px);
        box-sizing: border-box;
      }

      ul.dropdown-main li > * {
        width: 100%;
        height: inherit;
        color: ${r};
        background: transparent;
        padding: 0;
      }
    `}};n([ze({type:Boolean,reflect:!0})],Se.prototype,"open",void 0);n([ze({type:Boolean,reflect:!0})],Se.prototype,"isDisabled",void 0);n([ze({type:Boolean})],Se.prototype,"displayCaret",void 0);n([ze({type:Boolean})],Se.prototype,"closeOnSelect",void 0);n([ze({type:Boolean})],Se.prototype,"openViaButton",void 0);n([ze({type:Boolean})],Se.prototype,"openViaCaret",void 0);n([ze({type:Boolean})],Se.prototype,"includeSelectedOption",void 0);n([ze({type:String})],Se.prototype,"selectedOption",void 0);n([ze({attribute:!1})],Se.prototype,"options",void 0);n([ze({type:String})],Se.prototype,"optionGroup",void 0);n([ze({attribute:!1})],Se.prototype,"optionSelected",void 0);n([ze({type:Boolean,reflect:!0})],Se.prototype,"isCustomList",void 0);n([ze({type:Boolean,reflect:!0})],Se.prototype,"hasCustomClickHandler",void 0);n([ze({type:Boolean,reflect:!0})],Se.prototype,"closeOnEscape",void 0);n([ze({type:Boolean,reflect:!0})],Se.prototype,"closeOnBackdropClick",void 0);Se=n([ql("ia-dropdown")],Se);let Tr=class extends ii{render(){return Fe`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};Tr.styles=st`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
    }

    :host(.invert-icon-at-hover:hover) slot[name='icon'] {
      filter: invert(1);
    }

    :host(.selected) {
      background-color: var(--selectedBgColor, #fff);
      color: var(--selectedTextColor, #2c2c2c);
    }

    :host(.invert-icon-at-selected.selected) slot[name='icon'] {
      filter: invert(1);
    }

    div.icon-label-container {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: nowrap;
      flex-direction: var(--iconLabelFlexDirection, row);
      height: 100%;
    }

    slot[name='icon'] {
      width: var(--iconWidth, 20px);
      margin-right: var(--iconLabelGutterWidth, 10px);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      align-content: center;
      flex-wrap: nowrap;
      white-space: nowrap;
      height: 100%;
    }

    /* https://css-tricks.com/flexbox-truncated-text/ */
    ::slotted(div.truncate) {
      display: flex;
      width: var(--labelWidth, 100%);
      text-align: left;
      word-wrap: break-word; /* Important for long words! */
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }

    @supports not (-webkit-line-clamp: 2) {
      ::slotted(div.truncate) {
        min-width: 0;
      }
    }
    @supports (-webkit-line-clamp: 2) {
      ::slotted(div.truncate) {
        min-width: 0;
        display: -webkit-box;
        overflow-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        /* Fixed line-height needed to fit unicode and emojis
          https://stackoverflow.com/a/67807146
        */
        line-height: 1.2em;
        /* max-height needed for Safari browser */
        max-height: var(--labelTruncateHeight, 30px);
        max-width: var(--labelWidth, 100%);
      }
    }
  `;Tr=n([ql("ia-icon-label")],Tr);let Er=class extends B{constructor(){super(...arguments),this.numResults=0}render(){return h`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?"result":"results"}
        </div>
      </div>
    `}static get styles(){const e=g`var(--tooltipArrowSize, 5px)`,t=g`var(--tooltipArrowOffset, 0px)`;return g`
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${t});
        top: 0;
        width: 0;
        height: 0;
        margin-top: calc(-1 * ${e});
        margin-left: calc(-1 * ${e});
        border: ${e} solid transparent;
        border-bottom-color: black;
      }

      #tooltip-text {
        padding: 3px 8px;
        border-radius: 4px;
        background-color: #000;
        color: white;
        font-size: 1.2rem;
        text-align: center;
        text-decoration: none;
      }
    `}};n([u({type:Number})],Er.prototype,"numResults",void 0);Er=n([F("alpha-bar-tooltip")],Er);let ht=class extends B{constructor(){super(...arguments),this.selectedLetter=null,this.tooltipShown=!1,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return(e=this.selectedLetter)===null||e===void 0?void 0:e.toUpperCase()}render(){var e;return h`
      <section id="container" aria-label=${(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:b}>
        <ul>
          ${this.alphabet.map(t=>h`
                <li
                  class=${t===this.selectedUppercaseLetter?"selected":b}
                  @mousemove=${this.handleMouseMove}
                  @mouseleave=${this.handleMouseLeave}
                >
                  ${this.letterButtonTemplate(t)}
                  ${this.tooltipTemplate(t)}
                </li>
              `)}
        </ul>
      </section>
    `}letterButtonTemplate(e){var t,i,o;const r=`${e}: ${(i=(t=this.letterCounts)===null||t===void 0?void 0:t[e])!==null&&i!==void 0?i:0} results`;return h`
      <button
        aria-label=${r}
        ?disabled=${!(!((o=this.letterCounts)===null||o===void 0)&&o[e])}
        @click=${()=>{this.letterClicked(e)}}
      >
        ${e}
      </button>
    `}tooltipTemplate(e){var t,i;return this.hoveredLetter!==e?b:this.tooltipShown?h`<alpha-bar-tooltip
          data-letter=${e}
          .numResults=${(i=(t=this.letterCounts)===null||t===void 0?void 0:t[this.hoveredLetter])!==null&&i!==void 0?i:0}
        ></alpha-bar-tooltip>`:b}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(e){var t,i;const o=e.target;if(o&&!this.tooltipShown){const r=(i=(t=o.textContent)===null||t===void 0?void 0:t.trim())!==null&&i!==void 0?i:void 0;this.tooltipShown=!0,this.hoveredLetter=r,await this.updateComplete,await new Promise(s=>{setTimeout(s,0)}),this.tooltip&&this.tooltip.dataset.letter===r&&this.positionTooltip(o)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(e){if(!this.tooltip)return;const t=this.tooltip.clientWidth;let o=e.clientWidth/2-t/2;const r=getComputedStyle(document.body),s=parseFloat(r.getPropertyValue("margin-left")),l=parseFloat(r.getPropertyValue("margin-right")),d=document.body.clientWidth+s+l,p=e.getBoundingClientRect().left+o,v=p+t,f=1;let w;p<f?w=p-f:v>d-f&&(w=v-d+f),w&&(o-=w,this.tooltip.style.setProperty("--tooltipArrowOffset",`${w}px`)),this.tooltip.style.left=`${o}px`,this.tooltip.classList.add("fade-in")}};ht.styles=g`
    h1 {
      font-size: 1.2rem;
    }

    #container {
      background-color: #ddd;
      color: #333;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0.5rem 1rem;
      justify-content: space-between;
    }

    ul li {
      position: relative;
      flex: 1;
      text-align: center;
      max-width: 2.5rem;
      border-radius: 4px;
    }

    li:hover:not(.selected) button:not(:disabled) {
      background-color: #c0c0c0;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1 / 1;
    }

    button {
      width: 100%;
      height: 100%;
      color: #333;
      appearance: none;
      background: none;
      border: none;
      border-radius: 4px;
      font-family: inherit;
      font-size: 1.2rem;
      cursor: pointer;
    }

    button:disabled {
      color: #aaa;
      cursor: default;
    }

    .selected {
      background-color: #2c2c2c;
    }

    .selected button {
      color: white;
    }

    alpha-bar-tooltip {
      position: absolute;
      top: 100%;
      left: -9999px;
      margin-top: 3px;
      z-index: 1;

      opacity: 0;
      transition: opacity 0.2s ease;
    }

    alpha-bar-tooltip.fade-in {
      opacity: 1;
    }

    /* Make alphabet bar a 2-row container in small screen widths */
    @media screen and (max-width: 768px) {
      ul {
        display: grid;
        grid-template-columns: repeat(13, 1fr);
      }
    }
  `;n([u({type:String})],ht.prototype,"selectedLetter",void 0);n([u({type:Object})],ht.prototype,"letterCounts",void 0);n([u({type:String})],ht.prototype,"ariaLandmarkLabel",void 0);n([L()],ht.prototype,"tooltipShown",void 0);n([L()],ht.prototype,"hoveredLetter",void 0);n([Y("alpha-bar-tooltip")],ht.prototype,"tooltip",void 0);ht=n([F("alpha-bar")],ht);const N0=h`
  <svg viewBox="0 0 64 100" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="evenodd">
      <path
        d="m0 35.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
        fill="#2c2c2c"
      />
      <path
        d="m21 78.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
        fill="#bbb"
        transform="matrix(1 0 0 -1 0 143)"
      />
    </g>
  </svg>
`,H0=h`
  <svg viewBox="0 0 64 100" xmlns="http://www.w3.org/2000/svg">
    <g fill-rule="evenodd">
      <path
        d="m0 35.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
        fill="#bbb"
      />
      <path
        d="m21 78.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
        fill="#2c2c2c"
        transform="matrix(1 0 0 -1 0 143)"
      />
    </g>
  </svg>
`,V0=h`
  <svg viewBox="0 0 64 100" xmlns="http://www.w3.org/2000/svg">
    <g fill="#bbb" fill-rule="evenodd">
      <path
        d="m0 35.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
      />
      <path
        d="m21 78.625 21.5-35.625 21.5 35.625h-14.3333333v21.375h-14.3333334v-21.375z"
        transform="matrix(1 0 0 -1 0 143)"
      />
    </g>
  </svg>
`,W0=H`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,j0=H`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,q0=H`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let G=class extends B{constructor(){super(...arguments),this.defaultSortDirection=null,this.defaultSortField=x.relevance,this.sortDirection=null,this.selectedSort=x.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.showRelevance=!0,this.showDateFavorited=!1,this.enableSortOptionsSlot=!1,this.suppressDisplayModes=!1,this.lastSelectedViewSort=x.weeklyview,this.lastSelectedDateSort=this.defaultDateSortField,this.alphaSelectorVisible=null,this.dropdownBackdropVisible=!1,this.desktopSortContainerWidth=0,this.selectorBarContainerWidth=0,this.boundSortBarSelectorEscapeListener=e=>{e.key==="Escape"&&this.closeDropdowns()}}render(){return h`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <slot name="sort-options-left"></slot>
          <div id="sort-options">
            ${this.enableSortOptionsSlot?h`<slot name="sort-options"></slot>`:h`
                  <div class="sort-direction-container">
                    ${this.sortDirectionSelectorTemplate}
                  </div>
                  <span class="sort-by-text">${k("Sort by:")}</span>
                  <div id="sort-selector-container">
                    ${this.mobileSortSelectorTemplate}
                    ${this.desktopSortSelectorTemplate}
                  </div>
                `}
          </div>
          <slot name="sort-options-right"></slot>

          ${this.suppressDisplayModes?b:h`<div id="display-style-selector">
                ${this.displayOptionTemplate}
              </div>`}
        </section>

        ${this.dropdownBackdropVisible?this.dropdownBackdrop:b}
        ${this.alphaBarTemplate}
      </div>
    `}willUpdate(e){if(e.has("selectedSort")||e.has("defaultSortField")){if(this.selectedSort&&this.selectedSort!==x.default&&this.sortDirection===null){const t=Me[this.finalizedSortField];this.sortDirection=t.defaultSortDirection}this.viewOptionSelected?this.lastSelectedViewSort=this.finalizedSortField:this.dateOptionSelected&&(this.lastSelectedDateSort=this.finalizedSortField)}e.has("showDateFavorited")&&e.get("showDateFavorited")!==this.showDateFavorited&&(this.lastSelectedDateSort=this.defaultDateSortField)}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dropdownBackdropVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")||e.has("enableSortOptionsSlot")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener("keydown",this.boundSortBarSelectorEscapeListener):document.removeEventListener("keydown",this.boundSortBarSelectorEscapeListener)}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){this.sortSelectorContainer&&e.removeObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&e.removeObserver({target:this.desktopSortContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||(this.sortSelectorContainer&&this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&this.resizeObserver.addObserver({target:this.desktopSortContainer,handler:this}))}handleResize(e){e.target===this.desktopSortContainer?this.desktopSortContainerWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSortContainerWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return b;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return b}get sortDirectionSelectorTemplate(){const t=`Change to ${this.sortDirection==="asc"?"descending":"ascending"} sort`;return h`
      <button
        class="sort-direction-selector"
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${t}</span>
        ${this.sortDirectionIcon}
      </button>
    `}get sortDirectionIcon(){return this.canChangeSortDirection?h`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection==="asc"?N0:H0}
      </div>
    `:h`<div class="sort-direction-icon">${V0}</div>`}get desktopSortSelectorTemplate(){return h`
      <div
        id="desktop-sort-container"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <ul id="desktop-sort-selector">
          ${this.showRelevance?h`<li>
                ${this.getSortDisplayOption(x.relevance,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==x.relevance&&(this.clearAlphaBarFilters(),this.setSelectedSort(x.relevance))}})}
              </li>`:b}
          <li>${this.viewsDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption(x.title,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==x.title&&(this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.setSelectedSort(x.title),this.emitCreatorLetterChangedEvent())}})}
          </li>
          <li>${this.dateDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption(x.creator,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==x.creator&&(this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.setSelectedSort(x.creator),this.emitTitleLetterChangedEvent())}})}
          </li>
        </ul>
      </div>
    `}get mobileSortSelectorTemplate(){const e=Object.values(Me).filter(t=>t.shownInSortBar).filter(t=>this.showRelevance||t.field!==x.relevance).filter(t=>this.showDateFavorited||t.field!==x.datefavorited);return h`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${this.getSortDropdown({displayName:h`${Me[this.finalizedSortField].displayName}`,id:"mobile-dropdown",selected:!0,dropdownOptions:e.map(t=>this.getDropdownOption(t.field)),selectedOption:this.finalizedSortField,onOptionSelected:this.mobileSortChanged,onDropdownClick:()=>{this.dropdownBackdropVisible=this.mobileDropdown.open,this.mobileDropdown.classList.toggle("open",this.mobileDropdown.open)}})}
      </div>
    `}getSortDisplayOption(e,t){var i,o;const r=(i=t==null?void 0:t.selected)!==null&&i!==void 0?i:this.finalizedSortField===e,s=(o=t==null?void 0:t.displayName)!==null&&o!==void 0?o:Me[e].displayName;return h`
      <button
        class=${r?"selected":b}
        data-title="${s}"
        @click=${l=>{var d;l.preventDefault(),(d=t==null?void 0:t.onClick)===null||d===void 0||d.call(t,l)}}
      >
        ${s}
      </button>
    `}getSortDropdown(e){var t,i,o,r,s;return h`
      <ia-dropdown
        id=${(t=e.id)!==null&&t!==void 0?t:b}
        class=${e.selected?"selected":b}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${e.selected}
        .options=${e.dropdownOptions}
        .selectedOption=${(i=e.selectedOption)!==null&&i!==void 0?i:""}
        @optionSelected=${(o=e.onOptionSelected)!==null&&o!==void 0?o:b}
        @click=${(r=e.onDropdownClick)!==null&&r!==void 0?r:b}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title="${e.displayName.values}"
          @click=${(s=e.onLabelInteraction)!==null&&s!==void 0?s:b}
          @keydown=${e.onLabelInteraction?l=>{var d;(l.key==="Enter"||l.key===" ")&&((d=e.onLabelInteraction)===null||d===void 0||d.call(e,l))}:b}
        >
          ${e.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(e){return{id:e,selectedHandler:()=>{this.selectDropdownSortField(e)},label:h`
        <span class="dropdown-option-label">
          ${Me[e].displayName}
        </span>
      `}}dropdownOptionSelected(e){this.dropdownBackdropVisible=!1,this.clearAlphaBarFilters();const t=e.detail.option.id;this.setSelectedSort(t),this.viewOptionSelected?this.lastSelectedViewSort=t:this.dateOptionSelected&&(this.lastSelectedDateSort=t)}get viewsDropdownTemplate(){return this.getSortDropdown({displayName:h`${this.viewSortDisplayName}`,id:"views-dropdown",selected:this.viewOptionSelected,dropdownOptions:[this.getDropdownOption(x.weeklyview),this.getDropdownOption(x.alltimeview)],selectedOption:this.viewOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.dateDropdown.open=!1,this.dropdownBackdropVisible=this.viewsDropdown.open,this.viewsDropdown.classList.toggle("open",this.viewsDropdown.open)},onLabelInteraction:e=>{!this.viewsDropdown.open&&!this.viewOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedViewSort))}})}get dateDropdownTemplate(){return this.getSortDropdown({displayName:h`${this.dateSortDisplayName}`,id:"date-dropdown",selected:this.dateOptionSelected,dropdownOptions:[...this.showDateFavorited?[this.getDropdownOption(x.datefavorited)]:[],this.getDropdownOption(x.date),this.getDropdownOption(x.datearchived),this.getDropdownOption(x.datereviewed),this.getDropdownOption(x.dateadded)],selectedOption:this.dateOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.viewsDropdown.open=!1,this.dropdownBackdropVisible=this.dateDropdown.open,this.dateDropdown.classList.toggle("open",this.dateDropdown.open)},onLabelInteraction:e=>{!this.dateDropdown.open&&!this.dateOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedDateSort))}})}mobileSortChanged(e){this.dropdownBackdropVisible=!1;const t=e.detail.option.id;this.setSelectedSort(t),this.alphaSelectorVisible=null,t!=="title"&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),t!=="creator"&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return h`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
            data-testid="grid-button"
          >
            ${W0}
          </button>
        </li>
        <li>
          <button
            id="list-detail-button"
            @click=${()=>{this.displayMode="list-detail"}}
            class=${this.displayMode==="list-detail"?"active":""}
            title="List view"
            data-testid="list-detail-button"
          >
            ${j0}
          </button>
        </li>
        <li>
          <button
            id="list-compact-button"
            @click=${()=>{this.displayMode="list-compact"}}
            class=${this.displayMode==="list-compact"?"active":""}
            title="Compact list view"
            data-testid="list-compact-button"
          >
            ${q0}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return h`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `}closeDropdowns(){this.dropdownBackdropVisible=!1;const e=[this.viewsDropdown,this.dateDropdown,this.mobileDropdown];for(const t of e)t.open=!1,t.classList.remove("open")}selectDropdownSortField(e){this.dropdownBackdropVisible=!1,this.setSelectedSort(e)}clearAlphaBarFilters(){this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()}setSortDirection(e){this.sortDirection=e,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection==="desc"?"asc":"desc")}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(e){this.selectedSort=e;const t=Me[e];this.sortDirection=t.defaultSortDirection,this.emitSortChangedEvent()}get finalizedSortField(){return this.selectedSort===x.default?this.defaultSortField:this.selectedSort}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get canChangeSortDirection(){return Me[this.finalizedSortField].canSetDirection}get dateOptionSelected(){return[x.datefavorited,x.datearchived,x.date,x.datereviewed,x.dateadded].includes(this.finalizedSortField)}get viewOptionSelected(){return[x.alltimeview,x.weeklyview].includes(this.finalizedSortField)}get defaultDateSortField(){return this.showDateFavorited?x.datefavorited:x.date}get dateSortDisplayName(){return Me[this.lastSelectedDateSort].displayName}get viewSortDisplayName(){return Me[this.lastSelectedViewSort].displayName}get titleSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}static get styles(){return[pt,g`
        #container {
          position: relative;
        }

        #sort-bar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          font-size: 1.4rem;
        }

        #sort-options {
          display: flex;
          align-items: center;
          flex-grow: 1;
        }

        ul {
          list-style: none;
          display: flex;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        li {
          padding: 0;
        }

        .sort-by-text {
          margin-right: 5px;
          font-weight: bold;
          white-space: nowrap;
        }

        .sort-direction-container {
          display: flex;
          align-self: stretch;
          flex: 0;
          margin: 0 5px;
        }

        .sort-direction-selector {
          padding: 0;
          border: none;
          appearance: none;
          background: transparent;
          cursor: pointer;
        }

        .sort-direction-selector:disabled {
          cursor: default;
        }

        .sort-direction-icon {
          display: flex;
          align-items: center;
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          outline: inherit;
          width: 14px;
          height: 14px;
        }

        .sort-direction-icon > svg {
          flex: 1;
        }

        #date-sort-selector,
        #view-sort-selector {
          position: absolute;
          left: 150px;
          top: 45px;

          z-index: 1;
          padding: 1rem;
          background-color: white;
          border-radius: 2.5rem;
          border: 1px solid #404142;
        }

        #sort-selector-container {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        #desktop-sort-container,
        #mobile-sort-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        /*
          we move the desktop sort selector offscreen instead of display: none
          because we need to observe the width of it vs its container to determine
          if it's wide enough to display the desktop version and if you display: none,
          the width becomes 0
        */
        #desktop-sort-container.hidden {
          position: absolute;
          top: -9999px;
          left: -9999px;
          visibility: hidden;
        }

        #mobile-sort-container.hidden {
          display: none;
        }

        #sort-selector-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 1;
          background-color: transparent;
        }

        #desktop-sort-selector {
          display: inline-flex;
        }

        #desktop-sort-selector li {
          display: flex;
          align-items: center;
          padding-left: 5px;
          padding-right: 5px;
        }

        #desktop-sort-selector li a {
          padding: 0 5px;
          text-decoration: none;
          color: #333;
          line-height: 2;
        }

        #desktop-sort-selector li button {
          padding: 0px 5px;
          border: none;
          background: none;
          font-family: inherit;
          font-size: inherit;
          color: #333;
          line-height: 2;
          cursor: pointer;
          appearance: none;
        }

        #desktop-sort-selector li button.selected {
          font-weight: bold;
        }

        /**
         * Fix to not shift the sort-bar options when get selected
         */
        #desktop-sort-selector li button::before,
        #desktop-sort-selector .dropdown-label::before {
          display: block;
          content: attr(data-title);
          font-weight: bold;
          height: 0;
          overflow: hidden;
          visibility: hidden;
        }

        #display-style-selector {
          flex: 0;
        }

        #display-style-selector button {
          background: none;
          color: inherit;
          border: none;
          appearance: none;
          cursor: pointer;
          -webkit-appearance: none;
          fill: #bbbbbb;
        }

        #display-style-selector button.active {
          fill: var(--ia-theme-primary-text-color, #2c2c2c);
        }

        #display-style-selector button svg {
          width: 24px;
          height: 24px;
        }

        ia-dropdown {
          --dropdownTextColor: white;
          --dropdownOffsetTop: 0;
          --dropdownBorderTopWidth: 0;
          --dropdownBorderTopLeftRadius: 0;
          --dropdownBorderTopRightRadius: 0;
          --dropdownWhiteSpace: nowrap;
          --dropdownListZIndex: 2;
          --dropdownCaretColor: var(--ia-theme-primary-text-color, #2c2c2c);
          --dropdownSelectedTextColor: white;
          --dropdownSelectedBgColor: rgba(255, 255, 255, 0.3);
          --dropdownHoverBgColor: rgba(255, 255, 255, 0.3);
          --caretHeight: 9px;
          --caretWidth: 12px;
          --caretPadding: 0 5px 0 0;
        }
        ia-dropdown.selected .dropdown-label {
          font-weight: bold;
        }
        ia-dropdown.open {
          z-index: 2;
        }

        .dropdown-label {
          display: inline-block;
          height: 100%;
          padding-left: 5px;
          font-size: 1.4rem;
          font-family: var(--ia-theme-base-font-family);
          line-height: 2;
          color: var(--ia-theme-primary-text-color, #2c2c2c);
          white-space: nowrap;
          user-select: none;
        }
      `]}};n([u({type:String})],G.prototype,"displayMode",void 0);n([u({type:String})],G.prototype,"defaultSortDirection",void 0);n([u({type:String})],G.prototype,"defaultSortField",void 0);n([u({type:String})],G.prototype,"sortDirection",void 0);n([u({type:String})],G.prototype,"selectedSort",void 0);n([u({type:String})],G.prototype,"selectedTitleFilter",void 0);n([u({type:String})],G.prototype,"selectedCreatorFilter",void 0);n([u({type:Boolean})],G.prototype,"showRelevance",void 0);n([u({type:Boolean})],G.prototype,"showDateFavorited",void 0);n([u({type:Boolean,reflect:!0})],G.prototype,"enableSortOptionsSlot",void 0);n([u({type:Boolean,reflect:!0})],G.prototype,"suppressDisplayModes",void 0);n([u({type:Object})],G.prototype,"prefixFilterCountMap",void 0);n([u({type:Object})],G.prototype,"resizeObserver",void 0);n([L()],G.prototype,"lastSelectedViewSort",void 0);n([L()],G.prototype,"lastSelectedDateSort",void 0);n([L()],G.prototype,"alphaSelectorVisible",void 0);n([L()],G.prototype,"dropdownBackdropVisible",void 0);n([L()],G.prototype,"desktopSortContainerWidth",void 0);n([L()],G.prototype,"selectorBarContainerWidth",void 0);n([Y("#desktop-sort-container")],G.prototype,"desktopSortContainer",void 0);n([Y("#sort-selector-container")],G.prototype,"sortSelectorContainer",void 0);n([Y("#views-dropdown")],G.prototype,"viewsDropdown",void 0);n([Y("#date-dropdown")],G.prototype,"dateDropdown",void 0);n([Y("#mobile-dropdown")],G.prototype,"mobileDropdown",void 0);G=n([F("sort-filter-bar")],G);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Fa(a,e,t){return a?e():t==null?void 0:t()}class oi{constructor(e){var t,i,o,r,s,l,d;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(o=e==null?void 0:e.showProcessingIndicator)!==null&&o!==void 0?o:!1,this.processingImageMode=(r=e==null?void 0:e.processingImageMode)!==null&&r!==void 0?r:"complete",this.showCloseButton=(s=e==null?void 0:e.showCloseButton)!==null&&s!==void 0?s:!0,this.showHeaderLogo=(l=e==null?void 0:e.showHeaderLogo)!==null&&l!==void 0?l:!0,this.closeOnBackdropClick=(d=e==null?void 0:e.closeOnBackdropClick)!==null&&d!==void 0?d:!0}}const Q0=Object.freeze({processing:"processing",complete:"complete"});class K0 extends B{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=Q0.processing}render(){return h`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const e=g`var(--activityIndicatorCheckmarkColor, #31A481)`,t=g`var(--activityIndicatorCompletedRingColor, #31A481)`,i=g`var(--activityIndicatorLoadingRingColor, #333333)`,o=g`var(--activityIndicatorLoadingDotColor, #333333)`;return g`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${i};
      }

      #activity-dots {
        fill: ${o};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}}window.customElements.define("ia-activity-indicator",K0);var G0=h`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  aria-labelledby="closeTitleID closeDescID"
>
  <title id="closeTitleID">Close icon</title>
  <desc id="closeDescID">A line drawing of an X</desc>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`,Y0=h`
<svg
  class="ia-logo"
  viewBox="0 0 27 30"
  xmlns="http://www.w3.org/2000/svg"
  aria-labelledby="logoTitleID logoDescID"
>
  <title id="logoTitleID">Internet Archive logo</title>
  <desc id="logoDescID">A line drawing of the Internet Archive headquarters building façade.</desc>
  <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <mask id="mask-2" class="fill-color">
      <path d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z" id="path-1"></path>
    </mask>
    <use class="fill-color" xlink:href="#path-1"></use>
    <g mask="url(#mask-2)" class="fill-color">
      <path d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z" id="swatch"></path>
    </g>
  </g>
</svg>
`;let Mr=class extends B{constructor(){super(...arguments),this.config=new oi}render(){return h`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?h`<div class="logo-icon">${Y0}</div>`:b}
            ${this.config.title?h`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?h`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?"":"hidden"}"
              >
                <ia-activity-indicator
                  .mode=${this.config.processingImageMode}
                ></ia-activity-indicator>
              </div>
              ${this.config.headline?h` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?h` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(){const e=new Event("closeButtonPressed");this.dispatchEvent(e)}get closeButtonTemplate(){return h`
      <button
        type="button"
        class="close-button"
        tabindex="0"
        @click=${this.handleCloseButton}
      >
        ${G0}
      </button>
    `}static get styles(){const e=g`var(--modalLogoSize, 6.5rem)`,t=g`var(--processingImageSize, 7.5rem)`,i=g`var(--modalCornerRadius, 1rem)`,o=g`var(--modalBorder, 2px solid black)`,r=g`var(--modalBottomMargin, 2.5rem)`,s=g`var(--modalTopMargin, 5rem)`,l=g`var(--modalHeaderBottomPadding, 0.5em)`,d=g`var(--modalBottomPadding, 2rem)`,c=g`var(--modalScrollOffset, 5px)`,p=g`var(--modalTitleFontSize, 1.8rem)`,v=g`var(--modalSubtitleFontSize, 1.4rem)`,f=g`var(--modalHeadlineFontSize, 1.6rem)`,w=g`var(--modalMessageFontSize, 1.4rem)`,$=g`var(--modalTitleLineHeight, normal)`,_=g`var(--modalSubtitleLineHeight, normal)`,z=g`var(--modalHeadlineLineHeight, normal)`,D=g`var(--modalMessageLineHeight, normal)`;return g`
      .processing-logo {
        margin: auto;
        width: ${t};
        height: ${t};
      }

      .processing-logo.hidden {
        height: 1rem;
      }

      .processing-logo.hidden ia-activity-indicator {
        display: none;
      }

      .modal-wrapper {
        outline: none;
      }

      .modal-container {
        border-radius: ${i};
        width: 100%;
        margin-top: ${s};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${i}) calc(${i}) 0 0;
        border: ${o};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${l};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${p};
        font-weight: bold;
        line-height: ${$};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${v};
        line-height: ${_};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${o};
        border-top: 0;
        padding: 0 1rem calc(${d} - ${c}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${r}));
        min-height: 5rem;
        padding: 0 0 calc(${c}) 0;
      }

      .headline {
        font-size: ${f};
        font-weight: bold;
        text-align: center;
        line-height: ${z};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${w};
        line-height: ${D};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18),
          0 2px 2px 0 rgba(0, 0, 0, 0.08);
        width: ${e};
        height: ${e};
        margin: -2.9rem auto 0.5rem auto;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo-icon svg {
        width: calc(${e} * 0.65);
        height: calc(${e} * 0.65);
      }

      .logo-icon svg .fill-color {
        fill: white;
      }

      .logo-icon svg .stroke-color {
        stroke: red;
      }

      .close-button {
        position: absolute;
        right: 1.2rem;
        top: 1.2rem;
        width: 2rem;
        height: 2rem;
        border-radius: 100%;
        border: 0;
        padding: 0;
        cursor: pointer;
        background-color: white;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      slot::slotted(.sr-only) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    `}};n([u({type:Object})],Mr.prototype,"config",void 0);Mr=n([F("modal-template")],Mr);function X0(a,e,t){var i=t||{},o=i.noTrailing,r=o===void 0?!1:o,s=i.noLeading,l=s===void 0?!1:s,d=i.debounceMode,c=d===void 0?void 0:d,p,v=!1,f=0;function w(){p&&clearTimeout(p)}function $(z){var D=z||{},A=D.upcomingOnly,R=A===void 0?!1:A;w(),v=!R}function _(){for(var z=arguments.length,D=new Array(z),A=0;A<z;A++)D[A]=arguments[A];var R=this,O=Date.now()-f;if(v)return;function W(){f=Date.now(),e.apply(R,D)}function ve(){p=void 0}!l&&c&&!p&&W(),w(),c===void 0&&O>a?l?(f=Date.now(),r||(p=setTimeout(c?ve:W,a))):W():r!==!0&&(p=setTimeout(c?ve:W,c===void 0?a-O:a))}return _.cancel=$,_}var Lt;(function(a){a.Open="open",a.Closed="closed"})(Lt||(Lt={}));class Z0{constructor(e){this.windowResizeThrottler=X0(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case Lt.Open:this.startResizeListener(),this.stopDocumentScroll();break;case Lt.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let pi=class extends B{constructor(){super(...arguments),this.mode=Lt.Closed,this.hostBridge=new Z0(this),this.closeOnBackdropClick=!0}render(){return h`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="0"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=Lt.Closed}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Td(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=Lt.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=g`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=g`var(--modalBackdropZindex, 1000)`,i=g`var(--modalWidth, 32rem)`,o=g`var(--modalMaxWidth, 95%)`,r=g`var(--modalZindex, 2000)`;return g`
      .container {
        width: 100%;
        height: 100%;
      }

      .backdrop {
        position: fixed;
        top: 0;
        left: 0;
        background-color: ${e};
        width: 100%;
        height: 100%;
        z-index: ${t};
      }

      modal-template {
        outline: 0;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        z-index: ${r};
        width: ${i};
        max-width: ${o};
      }
    `}};n([u({type:String,reflect:!0})],pi.prototype,"mode",void 0);n([u({type:Object})],pi.prototype,"customModalContent",void 0);n([u({type:Object})],pi.prototype,"hostBridge",void 0);n([Y("modal-template")],pi.prototype,"modalTemplate",void 0);pi=n([F("modal-manager")],pi);const Tn=g`var(--white, #fff)`,J0=g`var(--primaryDisableCTAFill, #767676)`,eh=g`var(--secondaryCTABorder, #999)`,th=g`var(--primaryCTAFill, #194880)`,Ba=g`var(--primaryCTAFillRGB, 25, 72, 128)`,ih=g`var(--primaryCTABorder, #c5d1df)`,oh=g`var(--primaryErrorCTAFill, #d9534f)`,Ia=g`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,ah=g`var(--primaryErrorCTABorder, #d43f3a)`,rh=g`var(--secondaryCTAFill, #333)`,Ua=g`var(--secondaryCTAFillRGB, 51, 51, 51)`,sh=g`var(--primaryCTABorder, #979797)`,nh=g`var(---primaryWarningFill, #ee8950)`,Na=g`var(--primaryWarningFillRGB, 238, 137, 80)`,lh=g`var(--primaryWarningBorder, #ec7939)`;var dh=g`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Tn};
    line-height: normal;
    border-radius: 0.4rem;
    font-size: 1.4rem;
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    border: 1px solid transparent;
    white-space: nowrap;
    appearance: auto;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    transition: all 0.1s ease 0s;
    vertical-align: middle;
    padding: 0 3rem;
    outline-color: ${Tn};
    outline-offset: -4px;
    user-select: none;
    text-decoration: none;
    width: fit-content;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
  }
  .ia-button:focus-visible {
    outline-style: double;
  }
  .ia-button:disabled {
    cursor: not-allowed;
    background-color: ${J0};
    border: 1px solid ${eh};
  }
  .ia-button.transparent {
    background-color: transparent;
  }

  .ia-button.primary:disabled,
  .ia-button.danger:disabled,
  .ia-button.warning:disabled,
  .ia-button.dark:disabled {
    opacity: 0.5;
  }

  .ia-button.primary {
    background-color: ${th};
    border-color: ${ih};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Ba}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Ba}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Ba}, 0.7);
  }

  .ia-button.danger {
    background-color: ${oh};
    border-color: ${ah};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Ia}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Ia}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Ia}, 0.7);
  }

  .ia-button.warning {
    background-color: ${nh};
    border-color: ${lh};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Na}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Na}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Na}, 0.7);
  }

  .ia-button.dark {
    background-color: ${rh};
    border-color: ${sh};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Ua}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Ua}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Ua}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: var(--ia-theme-link-color, #4b64ff);
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;let Fo=class extends B{constructor(){super(...arguments),this.items=[]}render(){return h`
      <ul>
        ${Dt(this.items,({title:e,date:t})=>h`
            <li>
              <span class="item-title">${e!=null?e:"[untitled]"}</span>
              <span class="item-date">${t!=null?t:""}</span>
            </li>
          `)}
      </ul>
      ${this.message?h`<p class="message">${this.message}</p>`:b}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${k("Remove items")}
        </button>
      </div>
    `}removeItemsBtnClicked(){this.dispatchEvent(new CustomEvent("confirm",{detail:{items:this.items}}))}static get styles(){return g`
      ul {
        margin: 0;
        padding: 0 10px;
        font-size: 1.4rem;
        list-style-type: none;
        max-height: min(400px, 40vh);
        overflow-y: auto;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
      }
      li:not(:last-of-type) {
        border-bottom: 1px solid rgb(232, 232, 232);
      }

      .item-title {
        word-break: break-word;
      }

      .item-date {
        white-space: nowrap;
      }

      .message {
        font-size: 1.4rem;
        padding: 5px 10px;
      }

      .button-bar {
        display: flex;
        justify-content: center;
        margin: 10px 5px;
      }

      .remove-items-btn {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid var(--primaryErrorCTABorder, #d43f3a);
        border-radius: 4px;
        color: white;
        background: var(--primaryErrorCTAFill, #d9534f);
        appearance: none;
        cursor: pointer;
      }
      .remove-items-btn:hover {
        background: rgba(var(--primaryErrorCTAFillRGB, 229, 28, 38), 0.9);
      }
      .remove-items-btn:active {
        background: rgba(var(--primaryErrorCTAFillRGB, 229, 28, 38), 0.7);
      }
    `}};n([u({type:Object})],Fo.prototype,"items",void 0);n([u({type:String})],Fo.prototype,"message",void 0);Fo=n([F("remove-items-modal-content")],Fo);let tt=class extends B{constructor(){super(...arguments),this.label=k("Select items to remove"),this.selectedItems=[],this.showSelectAll=!1,this.showUnselectAll=!1,this.showItemManageButton=!1,this.removeAllowed=!1}render(){return h`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <div class="manage-buttons">
          <button class="ia-button dark" @click=${this.cancelClicked}>
            ${k("Cancel")}
          </button>
          <button
            class="ia-button danger"
            ?disabled=${!this.removeAllowed}
            @click=${this.showRemoveItemsModal}
          >
            ${k("Remove selected items")} (${this.selectedItems.length})
          </button>
          ${Fa(this.showItemManageButton,()=>h` <button
              class="ia-button warning"
              ?disabled=${!this.removeAllowed}
              @click=${this.manageItemsClicked}
            >
              ${k("Item Manager the items")} (${this.selectedItems.length})
            </button>`)}
          <div class="selection-buttons">
            ${Fa(this.showSelectAll,()=>h` <button
                class="ia-button link select-all-btn"
                @click=${this.selectAllClicked}
              >
                ${k("Select all")}
              </button>`)}
            ${Fa(this.showUnselectAll,()=>h` <button
                class="ia-button link unselect-all-btn"
                @click=${this.unselectAllClicked}
              >
                ${k("Unselect all")}
              </button>`)}
          </div>
        </div>
      </div>
    `}cancelClicked(){this.dispatchEvent(new CustomEvent("cancel"))}removeItemsClicked(){this.dispatchEvent(new CustomEvent("removeItems"))}manageItemsClicked(){this.dispatchEvent(new CustomEvent("manageItems"))}selectAllClicked(){this.dispatchEvent(new CustomEvent("selectAll"))}unselectAllClicked(){this.dispatchEvent(new CustomEvent("unselectAll"))}showRemoveItemsModal(){var e,t;const i=h`
      <remove-items-modal-content
        .items=${this.selectedItems}
        .message=${this.manageViewModalMsg}
        @confirm=${()=>this.removeItemsClicked()}
      ></remove-items-modal-content>
    `,o=new oi({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Are you sure you want to remove these items?")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:o,customModalContent:i,userClosedModalCallback:()=>{var r;(r=this.modalManager)===null||r===void 0||r.classList.remove("remove-items")}})}showRemoveItemsProcessingModal(){var e,t;const i=new oi({showProcessingIndicator:!0,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Removing selected items...")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:i,userClosedModalCallback:()=>{var o;(o=this.modalManager)===null||o===void 0||o.classList.remove("remove-items")}})}showRemoveItemsErrorModal(){var e,t;const i=new oi({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#691916",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Error: unable to remove items")}`,message:h`${k("An error occurred while removing items. Please try again in a few minutes.")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:i,userClosedModalCallback:()=>{var o;(o=this.modalManager)===null||o===void 0||o.classList.remove("remove-items")}})}static get styles(){return g`
      ${dh}
      .manage-container {
        display: flex;
        align-items: center;
        column-gap: 5px;
        padding: 20px 0 20px;
        flex-wrap: wrap;
      }

      .manage-label {
        display: inline-block;
        font-weight: bold;
        font-size: 1.8rem;
        padding-right: 10px;
      }

      .manage-buttons {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        column-gap: 5px;
      }

      .selection-buttons {
        display: inherit;
      }

      .ia-button,
      button {
        padding: 6px 12px;
        font-size: 1.4rem;
        margin: 3px 0;
      }
    `}};n([u({type:String})],tt.prototype,"label",void 0);n([u({type:Object})],tt.prototype,"modalManager",void 0);n([u({type:Object})],tt.prototype,"selectedItems",void 0);n([u({type:String})],tt.prototype,"manageViewModalMsg",void 0);n([u({type:Boolean})],tt.prototype,"showSelectAll",void 0);n([u({type:Boolean})],tt.prototype,"showUnselectAll",void 0);n([u({type:Boolean})],tt.prototype,"showItemManageButton",void 0);n([u({type:Boolean})],tt.prototype,"removeAllowed",void 0);tt=n([F("manage-bar")],tt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi=(a,e)=>{var t,i;const o=a._$AN;if(o===void 0)return!1;for(const r of o)(i=(t=r)._$AO)===null||i===void 0||i.call(t,e,!1),Hi(r,e);return!0},Bo=a=>{let e,t;do{if((e=a._$AM)===void 0)break;t=e._$AN,t.delete(a),a=e}while((t==null?void 0:t.size)===0)},Ql=a=>{for(let e;e=a._$AM;a=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(a))break;t.add(a),ph(e)}};function ch(a){this._$AN!==void 0?(Bo(this),this._$AM=a,Ql(this)):this._$AM=a}function hh(a,e=!1,t=0){const i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(i))for(let r=t;r<i.length;r++)Hi(i[r],!1),Bo(i[r]);else i!=null&&(Hi(i,!1),Bo(i));else Hi(this,a)}const ph=a=>{var e,t,i,o;a.type==Qo.CHILD&&((e=(i=a)._$AP)!==null&&e!==void 0||(i._$AP=hh),(t=(o=a)._$AQ)!==null&&t!==void 0||(o._$AQ=ch))};class uh extends Go{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),Ql(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,o;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)===null||i===void 0||i.call(this):(o=this.disconnected)===null||o===void 0||o.call(this)),t&&(Hi(this,e),Bo(this))}setValue(e){if(sc(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const Ha=new WeakMap,vh=Ko(class extends uh{render(a){return b}update(a,[e]){var t;const i=e!==this.U;return i&&this.U!==void 0&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.U=e,this.ht=(t=a.options)===null||t===void 0?void 0:t.host,this.ot(this.lt=a.element)),b}ot(a){var e;if(typeof this.U=="function"){const t=(e=this.ht)!==null&&e!==void 0?e:globalThis;let i=Ha.get(t);i===void 0&&(i=new WeakMap,Ha.set(t,i)),i.get(this.U)!==void 0&&this.U.call(this.ht,void 0),i.set(this.U,a),a!==void 0&&this.U.call(this.ht,a)}else this.U.value=a}get rt(){var a,e,t;return typeof this.U=="function"?(e=Ha.get((a=this.ht)!==null&&a!==void 0?a:globalThis))===null||e===void 0?void 0:e.get(this.U):(t=this.U)===null||t===void 0?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xo=window,Zr=xo.ShadowRoot&&(xo.ShadyCSS===void 0||xo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Kl=Symbol(),En=new WeakMap;class fh{constructor(e,t,i){if(this._$cssResult$=!0,i!==Kl)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Zr&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=En.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&En.set(t,e))}return e}toString(){return this.cssText}}const mh=a=>new fh(typeof a=="string"?a:a+"",void 0,Kl),gh=(a,e)=>{Zr?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=xo.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},Mn=Zr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return mh(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Va;const Io=window,An=Io.trustedTypes,yh=An?An.emptyScript:"",zn=Io.reactiveElementPolyfillSupport,Ar={toAttribute(a,e){switch(e){case Boolean:a=a?yh:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},Gl=(a,e)=>e!==a&&(e==e||a==a),Wa={attribute:!0,type:String,converter:Ar,reflect:!1,hasChanged:Gl},zr="finalized";class Oi extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=Wa){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Wa}static finalize(){if(this.hasOwnProperty(zr))return!1;this[zr]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Mn(o))}else e!==void 0&&t.push(Mn(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return gh(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=Wa){var o;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const s=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:Ar).toAttribute(t,i.type);this._$El=e,s==null?this.removeAttribute(r):this.setAttribute(r,s),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,r=o._$Ev.get(e);if(r!==void 0&&this._$El!==r){const s=o.getPropertyOptions(r),l=typeof s.converter=="function"?{fromAttribute:s.converter}:((i=s.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?s.converter:Ar;this._$El=r,this[r]=l.fromAttribute(t,s.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Gl)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,r)=>this[r]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}}Oi[zr]=!0,Oi.elementProperties=new Map,Oi.elementStyles=[],Oi.shadowRootOptions={mode:"open"},zn==null||zn({ReactiveElement:Oi}),((Va=Io.reactiveElementVersions)!==null&&Va!==void 0?Va:Io.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ja;const Uo=window,ui=Uo.trustedTypes,Pn=ui?ui.createPolicy("lit-html",{createHTML:a=>a}):void 0,Pr="$lit$",gt=`lit$${(Math.random()+"").slice(9)}$`,Yl="?"+gt,bh=`<${Yl}>`,Bt=document,Zi=()=>Bt.createComment(""),Ji=a=>a===null||typeof a!="object"&&typeof a!="function",Xl=Array.isArray,wh=a=>Xl(a)||typeof(a==null?void 0:a[Symbol.iterator])=="function",qa=`[ 	
\f\r]`,Fi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dn=/-->/g,Ln=/>/g,Tt=RegExp(`>|${qa}(?:([^\\s"'>=/]+)(${qa}*=${qa}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Rn=/'/g,On=/"/g,Zl=/^(?:script|style|textarea|title)$/i,Jl=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),Ge=Jl(1),Qa=Jl(2),Xe=Symbol.for("lit-noChange"),ce=Symbol.for("lit-nothing"),Fn=new WeakMap,Pt=Bt.createTreeWalker(Bt,129,null,!1);function ed(a,e){if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pn!==void 0?Pn.createHTML(e):e}const $h=(a,e)=>{const t=a.length-1,i=[];let o,r=e===2?"<svg>":"",s=Fi;for(let l=0;l<t;l++){const d=a[l];let c,p,v=-1,f=0;for(;f<d.length&&(s.lastIndex=f,p=s.exec(d),p!==null);)f=s.lastIndex,s===Fi?p[1]==="!--"?s=Dn:p[1]!==void 0?s=Ln:p[2]!==void 0?(Zl.test(p[2])&&(o=RegExp("</"+p[2],"g")),s=Tt):p[3]!==void 0&&(s=Tt):s===Tt?p[0]===">"?(s=o!=null?o:Fi,v=-1):p[1]===void 0?v=-2:(v=s.lastIndex-p[2].length,c=p[1],s=p[3]===void 0?Tt:p[3]==='"'?On:Rn):s===On||s===Rn?s=Tt:s===Dn||s===Ln?s=Fi:(s=Tt,o=void 0);const w=s===Tt&&a[l+1].startsWith("/>")?" ":"";r+=s===Fi?d+bh:v>=0?(i.push(c),d.slice(0,v)+Pr+d.slice(v)+gt+w):d+gt+(v===-2?(i.push(void 0),l):w)}return[ed(a,r+(a[t]||"<?>")+(e===2?"</svg>":"")),i]};class eo{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,s=0;const l=e.length-1,d=this.parts,[c,p]=$h(e,t);if(this.el=eo.createElement(c,i),Pt.currentNode=this.el.content,t===2){const v=this.el.content,f=v.firstChild;f.remove(),v.append(...f.childNodes)}for(;(o=Pt.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const v=[];for(const f of o.getAttributeNames())if(f.endsWith(Pr)||f.startsWith(gt)){const w=p[s++];if(v.push(f),w!==void 0){const $=o.getAttribute(w.toLowerCase()+Pr).split(gt),_=/([.?@])?(.*)/.exec(w);d.push({type:1,index:r,name:_[2],strings:$,ctor:_[1]==="."?Sh:_[1]==="?"?Ch:_[1]==="@"?kh:Jo})}else d.push({type:6,index:r})}for(const f of v)o.removeAttribute(f)}if(Zl.test(o.tagName)){const v=o.textContent.split(gt),f=v.length-1;if(f>0){o.textContent=ui?ui.emptyScript:"";for(let w=0;w<f;w++)o.append(v[w],Zi()),Pt.nextNode(),d.push({type:2,index:++r});o.append(v[f],Zi())}}}else if(o.nodeType===8)if(o.data===Yl)d.push({type:2,index:r});else{let v=-1;for(;(v=o.data.indexOf(gt,v+1))!==-1;)d.push({type:7,index:r}),v+=gt.length-1}r++}}static createElement(e,t){const i=Bt.createElement("template");return i.innerHTML=e,i}}function vi(a,e,t=a,i){var o,r,s,l;if(e===Xe)return e;let d=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const c=Ji(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==c&&((r=d==null?void 0:d._$AO)===null||r===void 0||r.call(d,!1),c===void 0?d=void 0:(d=new c(a),d._$AT(a,t,i)),i!==void 0?((s=(l=t)._$Co)!==null&&s!==void 0?s:l._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=vi(a,d._$AS(a,e.values),d,i)),e}class _h{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Bt).importNode(i,!0);Pt.currentNode=r;let s=Pt.nextNode(),l=0,d=0,c=o[0];for(;c!==void 0;){if(l===c.index){let p;c.type===2?p=new no(s,s.nextSibling,this,e):c.type===1?p=new c.ctor(s,c.name,c.strings,this,e):c.type===6&&(p=new Th(s,this,e)),this._$AV.push(p),c=o[++d]}l!==(c==null?void 0:c.index)&&(s=Pt.nextNode(),l++)}return Pt.currentNode=Bt,r}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class no{constructor(e,t,i,o){var r;this.type=2,this._$AH=ce,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=vi(this,e,t),Ji(e)?e===ce||e==null||e===""?(this._$AH!==ce&&this._$AR(),this._$AH=ce):e!==this._$AH&&e!==Xe&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):wh(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==ce&&Ji(this._$AH)?this._$AA.nextSibling.data=e:this.$(Bt.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=eo.createElement(ed(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{const s=new _h(r,this),l=s.u(this.options);s.v(i),this.$(l),this._$AH=s}}_$AC(e){let t=Fn.get(e.strings);return t===void 0&&Fn.set(e.strings,t=new eo(e)),t}T(e){Xl(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new no(this.k(Zi()),this.k(Zi()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Jo{constructor(e,t,i,o,r){this.type=1,this._$AH=ce,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ce}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let s=!1;if(r===void 0)e=vi(this,e,t,0),s=!Ji(e)||e!==this._$AH&&e!==Xe,s&&(this._$AH=e);else{const l=e;let d,c;for(e=r[0],d=0;d<r.length-1;d++)c=vi(this,l[i+d],t,d),c===Xe&&(c=this._$AH[d]),s||(s=!Ji(c)||c!==this._$AH[d]),c===ce?e=ce:e!==ce&&(e+=(c!=null?c:"")+r[d+1]),this._$AH[d]=c}s&&!o&&this.j(e)}j(e){e===ce?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Sh extends Jo{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ce?void 0:e}}const xh=ui?ui.emptyScript:"";class Ch extends Jo{constructor(){super(...arguments),this.type=4}j(e){e&&e!==ce?this.element.setAttribute(this.name,xh):this.element.removeAttribute(this.name)}}class kh extends Jo{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=vi(this,e,t,0))!==null&&i!==void 0?i:ce)===Xe)return;const o=this._$AH,r=e===ce&&o!==ce||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,s=e!==ce&&(o===ce||r);r&&this.element.removeEventListener(this.name,this,o),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Th{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){vi(this,e)}}const Bn=Uo.litHtmlPolyfillSupport;Bn==null||Bn(eo,no),((ja=Uo.litHtmlVersions)!==null&&ja!==void 0?ja:Uo.litHtmlVersions=[]).push("2.8.0");const Eh=(a,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=r._$litPart$;if(s===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=s=new no(e.insertBefore(Zi(),l),l,void 0,t!=null?t:{})}return s._$AI(a),s};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jr=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,es=Symbol(),In=new Map;class td{constructor(e,t){if(this._$cssResult$=!0,t!==es)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=In.get(this.cssText);return Jr&&e===void 0&&(In.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Mh=a=>new td(typeof a=="string"?a:a+"",es),pe=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,o,r)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[r+1],a[0]);return new td(t,es)},Ah=(a,e)=>{Jr?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=window.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},Un=Jr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Mh(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ka;const Nn=window.trustedTypes,zh=Nn?Nn.emptyScript:"",Hn=window.reactiveElementPolyfillSupport,Dr={toAttribute(a,e){switch(e){case Boolean:a=a?zh:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},id=(a,e)=>e!==a&&(e==e||a==a),Ga={attribute:!0,type:String,converter:Dr,reflect:!1,hasChanged:id};class Yt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Eh(i,t);o!==void 0&&(this._$Eu.set(o,i),e.push(o))}),e}static createProperty(e,t=Ga){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ga}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(Un(o))}else e!==void 0&&t.push(Un(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Ah(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Ga){var o,r;const s=this.constructor._$Eh(e,i);if(s!==void 0&&i.reflect===!0){const l=((r=(o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==null&&r!==void 0?r:Dr.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Ei=null}}_$AK(e,t){var i,o,r;const s=this.constructor,l=s._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const d=s.getPropertyOptions(l),c=d.converter,p=(r=(o=(i=c)===null||i===void 0?void 0:i.fromAttribute)!==null&&o!==void 0?o:typeof c=="function"?c:null)!==null&&r!==void 0?r:Dr.fromAttribute;this._$Ei=l,this[l]=p(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||id)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((o,r)=>this[r]=o),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Yt.finalized=!0,Yt.elementProperties=new Map,Yt.elementStyles=[],Yt.shadowRootOptions={mode:"open"},Hn==null||Hn({ReactiveElement:Yt}),((Ka=globalThis.reactiveElementVersions)!==null&&Ka!==void 0?Ka:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ya,Xa;class ai extends Yt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Eh(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return Xe}}ai.finalized=!0,ai._$litElement$=!0,(Ya=globalThis.litElementHydrateSupport)===null||Ya===void 0||Ya.call(globalThis,{LitElement:ai});const Vn=globalThis.litElementPolyfillSupport;Vn==null||Vn({LitElement:ai});((Xa=globalThis.litElementVersions)!==null&&Xa!==void 0?Xa:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const od=a=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(a,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(s){customElements.define(t,s)}}})(a,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ph=(a,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?ae(j({},e),{finisher(t){t.createProperty(e.key,a)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,a)}},Dh=(a,e,t)=>{e.constructor.createProperty(t,a)};function we(a){return(e,t)=>t!==void 0?Dh(a,e,t):Ph(a,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function lo(a){return we(ae(j({},a),{state:!0}))}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Za;((Za=window.HTMLSlotElement)===null||Za===void 0?void 0:Za.prototype.assignedElements)!=null;var Wn;(function(a){a.processing="processing",a.complete="complete"})(Wn||(Wn={}));let Lr=class extends ai{constructor(){super(...arguments),this.mode="processing"}render(){return Ge`
      <div class="${this.mode}">
        <svg
          viewBox="0 0 120 120"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          aria-labelledby="indicatorTitle indicatorDescription"
        >
          <title id="indicatorTitle">Activity Indicator</title>
          <desc id="indicatorDescription">
            A rotating activity indicator with three dots in the middle.
          </desc>
          <g
            id="icons/check-ring---squared"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <path
              id="completed-ring"
              class="loaded-indicator"
              d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <polygon
              id="check"
              class="loaded-indicator"
              transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
              points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
            ></polygon>
            <path
              id="activity-ring"
              class="activity-indicator"
              d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
            ></path>
            <g
              id="activity-dots"
              class="activity-indicator"
              transform="translate(40.000000, 55.000000)"
            >
              <circle id="left-dot" cx="5" cy="5" r="5"></circle>
              <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
              <circle id="right-dot" cx="35" cy="5" r="5"></circle>
            </g>
          </g>
        </svg>
      </div>
    `}static get styles(){const e=pe`var(--activityIndicatorCheckmarkColor, #31A481)`,t=pe`var(--activityIndicatorCompletedRingColor, #31A481)`,i=pe`var(--activityIndicatorLoadingRingColor, #333333)`,o=pe`var(--activityIndicatorLoadingDotColor, #333333)`;return pe`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${i};
      }

      #activity-dots {
        fill: ${o};
      }

      .activity-indicator {
        opacity: 0;
        transition: opacity 0.25s ease-out;
      }

      .processing .activity-indicator {
        opacity: 1;
      }

      .loaded-indicator {
        opacity: 1;
        transition: opacity 0.25s ease-out;
      }

      .processing .loaded-indicator {
        opacity: 0;
      }

      .image {
        border: 1px solid red;
        display: inline-block;
      }

      .processing #activity-ring {
        animation: rotate 1.3s infinite linear;
        transform-origin: 50px 50px;
        transform-box: fill-box;
      }

      .processing #left-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.2s;
      }

      .processing #middle-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.4s;
      }

      .processing #right-dot {
        opacity: 0;
        animation: dot 1.3s infinite;
        animation-delay: 0.6s;
      }

      @keyframes rotate {
        0% {
          transform: rotate(-360deg);
        }
        100% {
          /* This frame is supposed to be inferred, but Safari doesn't rotate it unless we're explicit */
          transform: rotate(0deg);
        }
      }

      @keyframes dot {
        0% {
          opacity: 0;
        }
        25% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `}};n([we({type:String})],Lr.prototype,"mode",void 0);Lr=n([od("ia-activity-indicator")],Lr);var ad=60,rd=ad*60,sd=rd*24,Lh=sd*7,fi=1e3,Ja=ad*fi,jn=rd*fi,Rh=sd*fi,Oh=Lh*fi,ts="millisecond",Xt="second",Zt="minute",Jt="hour",vt="day",Co="week",Ve="month",nd="quarter",ft="year",ei="date",Fh="YYYY-MM-DDTHH:mm:ssZ",qn="Invalid Date",Bh=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Ih=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Uh={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}},Rr=function(e,t,i){var o=String(e);return!o||o.length>=t?e:""+Array(t+1-o.length).join(i)+e},Nh=function(e){var t=-e.utcOffset(),i=Math.abs(t),o=Math.floor(i/60),r=i%60;return(t<=0?"+":"-")+Rr(o,2,"0")+":"+Rr(r,2,"0")},Hh=function a(e,t){if(e.date()<t.date())return-a(t,e);var i=(t.year()-e.year())*12+(t.month()-e.month()),o=e.clone().add(i,Ve),r=t-o<0,s=e.clone().add(i+(r?-1:1),Ve);return+(-(i+(t-o)/(r?o-s:s-o))||0)},Vh=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},Wh=function(e){var t={M:Ve,y:ft,w:Co,d:vt,D:ei,h:Jt,m:Zt,s:Xt,ms:ts,Q:nd};return t[e]||String(e||"").toLowerCase().replace(/s$/,"")},jh=function(e){return e===void 0},qh={s:Rr,z:Nh,m:Hh,a:Vh,p:Wh,u:jh},Vi="en",Rt={};Rt[Vi]=Uh;var ld="$isDayjsObject",is=function(e){return e instanceof ea||!!(e&&e[ld])},No=function a(e,t,i){var o;if(!e)return Vi;if(typeof e=="string"){var r=e.toLowerCase();Rt[r]&&(o=r),t&&(Rt[r]=t,o=r);var s=e.split("-");if(!o&&s.length>1)return a(s[0])}else{var l=e.name;Rt[l]=e,o=l}return!i&&o&&(Vi=o),o||!i&&Vi},ue=function(e,t){if(is(e))return e.clone();var i=typeof t=="object"?t:{};return i.date=e,i.args=arguments,new ea(i)},Qh=function(e,t){return ue(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},q=qh;q.l=No;q.i=is;q.w=Qh;var Kh=function(e){var t=e.date,i=e.utc;if(t===null)return new Date(NaN);if(q.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var o=t.match(Bh);if(o){var r=o[2]-1||0,s=(o[7]||"0").substring(0,3);return i?new Date(Date.UTC(o[1],r,o[3]||1,o[4]||0,o[5]||0,o[6]||0,s)):new Date(o[1],r,o[3]||1,o[4]||0,o[5]||0,o[6]||0,s)}}return new Date(t)},ea=function(){function a(t){this.$L=No(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[ld]=!0}var e=a.prototype;return e.parse=function(i){this.$d=Kh(i),this.init()},e.init=function(){var i=this.$d;this.$y=i.getFullYear(),this.$M=i.getMonth(),this.$D=i.getDate(),this.$W=i.getDay(),this.$H=i.getHours(),this.$m=i.getMinutes(),this.$s=i.getSeconds(),this.$ms=i.getMilliseconds()},e.$utils=function(){return q},e.isValid=function(){return this.$d.toString()!==qn},e.isSame=function(i,o){var r=ue(i);return this.startOf(o)<=r&&r<=this.endOf(o)},e.isAfter=function(i,o){return ue(i)<this.startOf(o)},e.isBefore=function(i,o){return this.endOf(o)<ue(i)},e.$g=function(i,o,r){return q.u(i)?this[o]:this.set(r,i)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(i,o){var r=this,s=q.u(o)?!0:o,l=q.p(i),d=function(D,A){var R=q.w(r.$u?Date.UTC(r.$y,A,D):new Date(r.$y,A,D),r);return s?R:R.endOf(vt)},c=function(D,A){var R=[0,0,0,0],O=[23,59,59,999];return q.w(r.toDate()[D].apply(r.toDate("s"),(s?R:O).slice(A)),r)},p=this.$W,v=this.$M,f=this.$D,w="set"+(this.$u?"UTC":"");switch(l){case ft:return s?d(1,0):d(31,11);case Ve:return s?d(1,v):d(0,v+1);case Co:{var $=this.$locale().weekStart||0,_=(p<$?p+7:p)-$;return d(s?f-_:f+(6-_),v)}case vt:case ei:return c(w+"Hours",0);case Jt:return c(w+"Minutes",1);case Zt:return c(w+"Seconds",2);case Xt:return c(w+"Milliseconds",3);default:return this.clone()}},e.endOf=function(i){return this.startOf(i,!1)},e.$set=function(i,o){var r,s=q.p(i),l="set"+(this.$u?"UTC":""),d=(r={},r[vt]=l+"Date",r[ei]=l+"Date",r[Ve]=l+"Month",r[ft]=l+"FullYear",r[Jt]=l+"Hours",r[Zt]=l+"Minutes",r[Xt]=l+"Seconds",r[ts]=l+"Milliseconds",r)[s],c=s===vt?this.$D+(o-this.$W):o;if(s===Ve||s===ft){var p=this.clone().set(ei,1);p.$d[d](c),p.init(),this.$d=p.set(ei,Math.min(this.$D,p.daysInMonth())).$d}else d&&this.$d[d](c);return this.init(),this},e.set=function(i,o){return this.clone().$set(i,o)},e.get=function(i){return this[q.p(i)]()},e.add=function(i,o){var r=this,s;i=Number(i);var l=q.p(o),d=function(f){var w=ue(r);return q.w(w.date(w.date()+Math.round(f*i)),r)};if(l===Ve)return this.set(Ve,this.$M+i);if(l===ft)return this.set(ft,this.$y+i);if(l===vt)return d(1);if(l===Co)return d(7);var c=(s={},s[Zt]=Ja,s[Jt]=jn,s[Xt]=fi,s)[l]||1,p=this.$d.getTime()+i*c;return q.w(p,this)},e.subtract=function(i,o){return this.add(i*-1,o)},e.format=function(i){var o=this,r=this.$locale();if(!this.isValid())return r.invalidDate||qn;var s=i||Fh,l=q.z(this),d=this.$H,c=this.$m,p=this.$M,v=r.weekdays,f=r.months,w=r.meridiem,$=function(R,O,W,ve){return R&&(R[O]||R(o,s))||W[O].slice(0,ve)},_=function(R){return q.s(d%12||12,R,"0")},z=w||function(A,R,O){var W=A<12?"AM":"PM";return O?W.toLowerCase():W},D=function(R){switch(R){case"YY":return String(o.$y).slice(-2);case"YYYY":return q.s(o.$y,4,"0");case"M":return p+1;case"MM":return q.s(p+1,2,"0");case"MMM":return $(r.monthsShort,p,f,3);case"MMMM":return $(f,p);case"D":return o.$D;case"DD":return q.s(o.$D,2,"0");case"d":return String(o.$W);case"dd":return $(r.weekdaysMin,o.$W,v,2);case"ddd":return $(r.weekdaysShort,o.$W,v,3);case"dddd":return v[o.$W];case"H":return String(d);case"HH":return q.s(d,2,"0");case"h":return _(1);case"hh":return _(2);case"a":return z(d,c,!0);case"A":return z(d,c,!1);case"m":return String(c);case"mm":return q.s(c,2,"0");case"s":return String(o.$s);case"ss":return q.s(o.$s,2,"0");case"SSS":return q.s(o.$ms,3,"0");case"Z":return l}return null};return s.replace(Ih,function(A,R){return R||D(A)||l.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(i,o,r){var s=this,l=q.p(o),d=ue(i),c=(d.utcOffset()-this.utcOffset())*Ja,p=this-d,v=function(){return q.m(s,d)},f;switch(l){case ft:f=v()/12;break;case Ve:f=v();break;case nd:f=v()/3;break;case Co:f=(p-c)/Oh;break;case vt:f=(p-c)/Rh;break;case Jt:f=p/jn;break;case Zt:f=p/Ja;break;case Xt:f=p/fi;break;default:f=p;break}return r?f:q.a(f)},e.daysInMonth=function(){return this.endOf(Ve).$D},e.$locale=function(){return Rt[this.$L]},e.locale=function(i,o){if(!i)return this.$L;var r=this.clone(),s=No(i,o,!0);return s&&(r.$L=s),r},e.clone=function(){return q.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},a}(),dd=ea.prototype;ue.prototype=dd;[["$ms",ts],["$s",Xt],["$m",Zt],["$H",Jt],["$W",vt],["$M",Ve],["$y",ft],["$D",ei]].forEach(function(a){dd[a[1]]=function(e){return this.$g(e,a[0],a[1])}});ue.extend=function(a,e){return a.$i||(a(e,ea,ue),a.$i=!0),ue};ue.locale=No;ue.isDayjs=is;ue.unix=function(a){return ue(a*1e3)};ue.en=Rt[Vi];ue.Ls=Rt;ue.p={};var Gh=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,i,o){return i||o.slice(1)})},Yh={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Xh=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(i,o,r){var s=r&&r.toUpperCase();return o||t[r]||Yh[r]||Gh(t[s])})},Zh=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,Qn=/\d/,Bi=/\d\d/,Jh=/\d{3}/,e1=/\d{4}/,Ue=/\d\d?/,t1=/[+-]?\d+/,i1=/[+-]\d\d:?(\d\d)?|Z/,Ii=/\d*[^-_:/,()\s\d]+/,yt={},cd=function(e){return e=+e,e+(e>68?1900:2e3)};function o1(a){if(!a||a==="Z")return 0;var e=a.match(/([+-]|\d\d)/g),t=+(e[1]*60)+(+e[2]||0);return t===0?0:e[0]==="+"?-t:t}var ke=function(e){return function(t){this[e]=+t}},Kn=[i1,function(a){var e=this.zone||(this.zone={});e.offset=o1(a)}],er=function(e){var t=yt[e];return t&&(t.indexOf?t:t.s.concat(t.f))},Gn=function(e,t){var i,o=yt,r=o.meridiem;if(!r)i=e===(t?"pm":"PM");else for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}return i},a1={A:[Ii,function(a){this.afternoon=Gn(a,!1)}],a:[Ii,function(a){this.afternoon=Gn(a,!0)}],Q:[Qn,function(a){this.month=(a-1)*3+1}],S:[Qn,function(a){this.milliseconds=+a*100}],SS:[Bi,function(a){this.milliseconds=+a*10}],SSS:[Jh,function(a){this.milliseconds=+a}],s:[Ue,ke("seconds")],ss:[Ue,ke("seconds")],m:[Ue,ke("minutes")],mm:[Ue,ke("minutes")],H:[Ue,ke("hours")],h:[Ue,ke("hours")],HH:[Ue,ke("hours")],hh:[Ue,ke("hours")],D:[Ue,ke("day")],DD:[Bi,ke("day")],Do:[Ii,function(a){var e=yt,t=e.ordinal,i=a.match(/\d+/);if(this.day=i[0],!!t)for(var o=1;o<=31;o+=1)t(o).replace(/\[|\]/g,"")===a&&(this.day=o)}],w:[Ue,ke("week")],ww:[Bi,ke("week")],M:[Ue,ke("month")],MM:[Bi,ke("month")],MMM:[Ii,function(a){var e=er("months"),t=er("monthsShort"),i=(t||e.map(function(o){return o.slice(0,3)})).indexOf(a)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[Ii,function(a){var e=er("months"),t=e.indexOf(a)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[t1,ke("year")],YY:[Bi,function(a){this.year=cd(a)}],YYYY:[e1,ke("year")],Z:Kn,ZZ:Kn};function r1(a){var e=a.afternoon;if(e!==void 0){var t=a.hours;e?t<12&&(a.hours+=12):t===12&&(a.hours=0),delete a.afternoon}}function s1(a){a=Xh(a,yt&&yt.formats);for(var e=a.match(Zh),t=e.length,i=0;i<t;i+=1){var o=e[i],r=a1[o],s=r&&r[0],l=r&&r[1];l?e[i]={regex:s,parser:l}:e[i]=o.replace(/^\[|\]$/g,"")}return function(d){for(var c={},p=0,v=0;p<t;p+=1){var f=e[p];if(typeof f=="string")v+=f.length;else{var w=f.regex,$=f.parser,_=d.slice(v),z=w.exec(_),D=z[0];$.call(c,D),d=d.replace(D,"")}}return r1(c),c}}var n1=function(e,t,i,o){try{if(["x","X"].indexOf(t)>-1)return new Date((t==="X"?1e3:1)*e);var r=s1(t),s=r(e),l=s.year,d=s.month,c=s.day,p=s.hours,v=s.minutes,f=s.seconds,w=s.milliseconds,$=s.zone,_=s.week,z=new Date,D=c||(!l&&!d?z.getDate():1),A=l||z.getFullYear(),R=0;l&&!d||(R=d>0?d-1:z.getMonth());var O=p||0,W=v||0,ve=f||0,xe=w||0;if($)return new Date(Date.UTC(A,R,D,O,W,ve,xe+$.offset*60*1e3));if(i)return new Date(Date.UTC(A,R,D,O,W,ve,xe));var de;return de=new Date(A,R,D,O,W,ve,xe),_&&(de=o(de).week(_).toDate()),de}catch{return new Date("")}},l1=function(a,e,t){t.p.customParseFormat=!0,a&&a.parseTwoDigitYear&&(cd=a.parseTwoDigitYear);var i=e.prototype,o=i.parse;i.parse=function(r){var s=r.date,l=r.utc,d=r.args;this.$u=l;var c=d[1];if(typeof c=="string"){var p=d[2]===!0,v=d[3]===!0,f=p||v,w=d[2];v&&(w=d[2]),yt=this.$locale(),!p&&w&&(yt=t.Ls[w]),this.$d=n1(s,c,l,t),this.init(),w&&w!==!0&&(this.$L=this.locale(w).$L),f&&s!=this.format(c)&&(this.$d=new Date("")),yt={}}else if(c instanceof Array)for(var $=c.length,_=1;_<=$;_+=1){d[1]=c[_-1];var z=t.apply(this,d);if(z.isValid()){this.$d=z.$d,this.$L=z.$L,this.init();break}_===$&&(this.$d=new Date(""))}else o.call(this,r)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},d1=a=>(...e)=>({_$litDirective$:a,values:e});class c1{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const h1=a=>a.strings===void 0,p1={},u1=(a,e=p1)=>a._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yn=d1(class extends c1{constructor(a){if(super(a),a.type!==Qt.PROPERTY&&a.type!==Qt.ATTRIBUTE&&a.type!==Qt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!h1(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[e]){if(e===Xe||e===ce)return e;const t=a.element,i=a.name;if(a.type===Qt.PROPERTY){if(e===t[i])return Xe}else if(a.type===Qt.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return Xe}else if(a.type===Qt.ATTRIBUTE&&t.getAttribute(i)===e+"")return Xe;return u1(a),e}});ue.extend(l1);const v1=180,f1=40,m1=10,g1=125,y1=30,Xn="YYYY",b1="no data",w1=0,Zn=4,$1=pe`var(--histogramDateRangeSliderColor, #4B65FE)`,_1=pe`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,S1=pe`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,x1=pe`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,C1=pe`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,k1=pe`var(--histogramDateRangeInputRowMargin, 0)`,T1=pe`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,E1=pe`var(--histogramDateRangeInputWidth, 35px)`,M1=pe`var(--histogramDateRangeInputFontSize, 1.2rem)`,A1=pe`var(--histogramDateRangeInputFontFamily, sans-serif)`,Jn=pe`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,el=pe`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,z1=pe`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,P1=pe`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let te=class extends ai{constructor(){super(...arguments),this.width=v1,this.height=f1,this.sliderWidth=m1,this.tooltipWidth=g1,this.tooltipHeight=y1,this.updateDelay=w1,this.dateFormat=Xn,this.missingDataMessage=b1,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this._tooltipOffset=0,this._tooltipVisible=!1,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,i=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}updated(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("width")||e.has("height"))&&this.handleDataUpdate()}handleDataUpdate(){!this.hasBinData||(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.getMSFromString(this.minDate),this._maxDateMS=this.getMSFromString(this.maxDate),this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate,this.requestUpdate())}calculateHistData(){const e=Math.min(...this.bins),t=Math.max(...this.bins),i=e===t?1:Math.log1p(t),o=this.height/i,r=this.dateRangeMS/this._numBins;return this.bins.map((s,l)=>({value:s,height:Math.floor(Math.log1p(s)*o),binStart:`${this.formatDate(l*r+this._minDateMS)}`,binEnd:`${this.formatDate((l+1)*r+this._minDateMS)}`}))}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t<=this.getMSFromString(this.maxSelectedDate);i&&o&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t>=this.getMSFromString(this.minSelectedDate);i&&o&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.translateDateToPosition(this.maxSelectedDate);return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){if(this._isDragging||this.disabled)return;const t=e.currentTarget,i=t.x.baseVal.value+this.sliderWidth/2,o=t.dataset,r=`item${o.numItems!=="1"?"s":""}`,s=Number(o.numItems).toLocaleString();this._tooltipOffset=i+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2,this._tooltipContent=Ge`
      ${s} ${r}<br />
      ${o.binStart} - ${o.binEnd}
    `,this._tooltipVisible=!0}hideTooltip(){this._tooltipContent=void 0,this._tooltipVisible=!1}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=e.clientX-i-t}translatePositionToDate(e){const t=Math.ceil((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const o=new Date(0,0);return o.setFullYear(Number(t)),o.getTime()}return ue(t,[this.dateFormat,Xn]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,o=Math.abs(i-this.getMSFromString(this.minSelectedDate)),r=Math.abs(i-this.getMSFromString(this.maxSelectedDate));o<r?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=Zn,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=Zn,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const o=t==="slider-min"?1:-1;return Qa`
    <svg
      id="${t}"
      class="
      ${this.disabled?"":"draggable"}
      ${this._isDragging?"dragging":""}"
      @pointerdown="${this.drag}"
    >
      <path d="${i} z" fill="${$1}" />
      <rect
        x="${e-this.sliderWidth*o+this.sliderWidth*.4*o}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${e-this.sliderWidth*o+this.sliderWidth*.6*o}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
    </svg>
    `}get selectedRangeTemplate(){return Qa`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${_1}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(o=>{const r=Qa`
        <rect
          class="bar"
          style='stroke-dasharray: 0 ${t} ${o.height} ${t} 0 ${o.height};'
          x="${i}"
          y="${this.height-o.height}"
          width="${t}"
          height="${o.height}"
          @pointerenter="${this.showTooltip}"
          @pointerleave="${this.hideTooltip}"
          @click="${this.handleBarClick}"
          fill="${i+t>=this.minSliderX&&i<=this.maxSliderX?S1:C1}"
          data-num-items="${o.value}"
          data-bin-start="${o.binStart}"
          data-bin-end="${o.binEnd}"
        />`;return i+=e,r})}formatDate(e){if(Number.isNaN(e))return"";const t=ue(e);return t.year()<1e3?String(t.year()):t.format(this.dateFormat)}get minInputTemplate(){return Ge`
      <input
        id="date-min"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.handleInputFocus}"
        @blur="${this.handleMinDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Yn(this.minSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get maxInputTemplate(){return Ge`
      <input
        id="date-max"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.handleInputFocus}"
        @blur="${this.handleMaxDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Yn(this.maxSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get minLabelTemplate(){return Ge`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return Ge`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){return Ge`
      <style>
        #tooltip {
          width: ${this.tooltipWidth}px;
          height: ${this.tooltipHeight}px;
          top: ${-9-this.tooltipHeight}px;
          left: ${this._tooltipOffset}px;
          display: ${this._tooltipVisible?"block":"none"};
        }
        #tooltip:after {
          left: ${this.tooltipWidth/2}px;
        }
      </style>
      <div id="tooltip">${this._tooltipContent}</div>
    `}get noDataTemplate(){return Ge`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?Ge`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:ce}render(){return this.hasBinData?Ge`
      <div
        id="container"
        class="
          noselect
          ${this._isDragging?"dragging":""}
        "
        style="width: ${this.width}px"
      >
        ${this.activityIndicatorTemplate} ${this.tooltipTemplate}
        <div
          class="inner-container
          ${this.disabled?"disabled":""}"
        >
          <svg
            width="${this.width}"
            height="${this.height}"
            @pointerleave="${this.drop}"
          >
            ${this.selectedRangeTemplate}
            <svg id="histogram">${this.histogramTemplate}</svg>
            ${this.minSliderTemplate} ${this.maxSliderTemplate}
          </svg>
          <div id="inputs">
            ${this.minLabelTemplate} ${this.minInputTemplate}
            <div class="dash">-</div>
            ${this.maxLabelTemplate} ${this.maxInputTemplate}
            <slot name="inputs-right-side"></slot>
          </div>
        </div>
      </div>
    `:this.noDataTemplate}};te.styles=pe`
    .missing-data-message {
      text-align: center;
    }
    #container {
      margin: 0;
      touch-action: none;
      position: relative;
    }
    .disabled {
      opacity: 0.3;
    }
    ia-activity-indicator {
      position: absolute;
      left: calc(50% - 10px);
      top: 10px;
      width: 20px;
      height: 20px;
      --activityIndicatorLoadingDotColor: rgba(0, 0, 0, 0);
      --activityIndicatorLoadingRingColor: ${x1};
    }

    /* prevent selection from interfering with tooltip, especially on mobile */
    /* https://stackoverflow.com/a/4407335/1163042 */
    .noselect {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* current Chrome, Edge, Opera and Firefox */
    }
    .bar {
      /* create a transparent border around the hist bars to prevent "gaps" and
      flickering when moving around between bars. this also helps with handling
      clicks on the bars, preventing users from being able to click in between
      bars */
      stroke: rgba(0, 0, 0, 0);
      /* ensure transparent stroke wide enough to cover gap between bars */
      stroke-width: 2px;
    }
    .bar:hover {
      /* highlight currently hovered bar */
      fill-opacity: 0.7;
    }
    .disabled .bar:hover {
      /* ensure no visual hover interaction when disabled */
      fill-opacity: 1;
    }
    /****** histogram ********/
    #tooltip {
      position: absolute;
      background: ${Jn};
      color: ${el};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${z1};
      font-family: ${P1};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      /* arrow */
      border: 5px solid ${el};
      border-color: ${Jn} transparent transparent
        transparent;
    }
    /****** slider ********/
    .draggable:hover {
      cursor: grab;
    }
    .dragging {
      cursor: grabbing !important;
    }
    /****** inputs ********/
    #inputs {
      display: flex;
      justify-content: center;
      margin: ${k1};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${E1};
      margin: 0 3px;
      border: ${T1};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${M1};
      font-family: ${A1};
    }
    .sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      margin: 0 !important;
      padding: 0 !important;
      border: 0 !important;
      overflow: hidden !important;
      white-space: nowrap !important;
      clip: rect(1px, 1px, 1px, 1px) !important;
      -webkit-clip-path: inset(50%) !important;
      clip-path: inset(50%) !important;
    }
  `;n([we({type:Number})],te.prototype,"width",void 0);n([we({type:Number})],te.prototype,"height",void 0);n([we({type:Number})],te.prototype,"sliderWidth",void 0);n([we({type:Number})],te.prototype,"tooltipWidth",void 0);n([we({type:Number})],te.prototype,"tooltipHeight",void 0);n([we({type:Number})],te.prototype,"updateDelay",void 0);n([we({type:String})],te.prototype,"dateFormat",void 0);n([we({type:String})],te.prototype,"missingDataMessage",void 0);n([we({type:String})],te.prototype,"minDate",void 0);n([we({type:String})],te.prototype,"maxDate",void 0);n([we({type:Boolean})],te.prototype,"disabled",void 0);n([we({type:Object})],te.prototype,"bins",void 0);n([we({type:Boolean})],te.prototype,"updateWhileFocused",void 0);n([lo()],te.prototype,"_tooltipOffset",void 0);n([lo()],te.prototype,"_tooltipContent",void 0);n([lo()],te.prototype,"_tooltipVisible",void 0);n([lo()],te.prototype,"_isDragging",void 0);n([lo()],te.prototype,"_isLoading",void 0);n([we({type:Boolean})],te.prototype,"loading",null);n([we()],te.prototype,"minSelectedDate",null);n([we()],te.prototype,"maxSelectedDate",null);te=n([od("histogram-date-range")],te);const tl=H`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,il=H`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let ne=class extends B{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return h`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${tl}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${il}</span
        >
      </button>
      ${this.popupTemplate}
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){!this.isOpen||this.positionPopup()}handleScroll(){!this.isOpen||this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e!=null?e:this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){!this.recaptchaManager||(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted||(this.resetState(),this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.betaButton.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,o=window.innerHeight,r=i/2,s=o/2;e.left<r?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<s?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.closePopup()}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get popupTemplate(){return h`
      <div
        id="popup-background"
        class=${this.isOpen?"open":"closed"}
        @click=${this.backgroundClicked}
        @keyup=${this.backgroundClicked}
      >
        <div
          id="popup"
          style="left: ${this.popupTopX}px; top: ${this.popupTopY}px"
        >
          <form @submit=${this.submit} id="form" ?disabled=${this.processing}>
            <div id="prompt">
              <div id="prompt-text">${this.prompt}</div>
              <label
                tabindex="0"
                role="button"
                ?aria-pressed=${this.upvoteSelected}
                @click=${this.upvoteButtonSelected}
                @keyup=${this.upvoteKeypressed}
                class="vote-button upvote-button ${this.upvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="up"
                  @click=${this.upvoteButtonSelected}
                  ?checked=${this.upvoteSelected}
                />
                ${tl}
              </label>

              <label
                tabindex="0"
                role="button"
                ?aria-pressed=${this.downvoteSelected}
                @click=${this.downvoteButtonSelected}
                @keyup=${this.downvoteKeypressed}
                class="vote-button downvote-button ${this.downvoteButtonClass} ${this.chooseVoteErrorClass}"
              >
                <input
                  type="radio"
                  name="vote"
                  value="down"
                  @click=${this.downvoteButtonSelected}
                  ?checked=${this.downvoteSelected}
                />
                ${il}
              </label>
            </div>
            <div>
              <textarea
                placeholder="Comments (optional)"
                id="comments"
                tabindex="0"
                ?disabled=${this.processing}
              ></textarea>
            </div>
            ${this.error?h`<div id="error">${this.error}</div>`:b}
            <div id="actions">
              <button
                @click=${this.cancel}
                id="cancel-button"
                class="cta-button"
                tabindex="0"
                ?disabled=${this.processing}
              >
                Cancel
              </button>
              <input
                type="submit"
                id="submit-button"
                class="cta-button"
                .value=${this.processing?"Submitting...":"Submit feedback"}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.vote=this.vote==="up"?void 0:"up"}downvoteButtonSelected(){this.vote=this.vote==="down"?void 0:"down"}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.closePopup())}cancel(e){e.preventDefault(),this.vote=void 0,this.closePopup()}async submit(e){if(e.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=h`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");this.processing=!0;try{const t=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:t})).success?(this.voteSubmitted=!0,this.closePopup()):this.error=h`There was an error submitting your feedback.`}catch(t){this.error=h`There was an error submitting your feedback.<br />Error:
        ${t instanceof Error?t.message:t}`}this.processing=!1}static get styles(){const e=g`var(--featureFeedbackBlueColor, #194880)`,t=g`var(--featureFeedbackDarkGrayColor, #767676)`,i=g`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,o=g`var(--featureFeedbackBackdropZindex, 5)`,r=g`var(--featureFeedbackModalZindex, 6)`,s=g`var(--featureFeedbackPopupBorderColor, ${e})`,l=g`var(--featureFeedbackSubmitButtonColor, ${e})`,d=g`var(--featureFeedbackBetaButtonBorderColor, ${e})`,c=g`var(--featureFeedbackBetaButtonTextColor, ${e})`,p=g`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,v=g`var(--featureFeedbackCancelButtonColor, #515151)`,f=g`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,w=g`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,$=g`var(--featureFeedbackPromptFontWeight, bold)`,_=g`var(--featureFeedbackPromptFontSize, 14px)`,z=g`var(--defaultColor, ${t});`,D=g`var(--defaultColorSvgFilter, ${i});`,A=g`var(--upvoteColor, #23765D);`,R=g`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,O=g`var(--downvoteColor, #720D11);`,W=g`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,ve=g`var(--unselectedColor, #CCCCCC);`,xe=g`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return g`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${c};
        border: 1px solid ${d};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${p};
      }

      .beta-button-thumb.unselected svg {
        filter: ${xe};
      }

      #error {
        color: red;
        font-size: 14px;
        text-align: center;
        font-weight: bold;
      }

      #popup-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${o};
        background-color: ${f};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        padding: 10px;
        background-color: ${w};
        border: 1px ${s} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${r};
        max-width: 300px;
        margin-left: 10px;
        margin-right: 10px;
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      button,
      input[type='submit'] {
        background: none;
        cursor: pointer;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: none;
      }

      button:disabled,
      input[type='submit']:disabled {
        cursor: default;
        opacity: 0.5;
      }

      #form > div {
        margin-bottom: 10px;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      #prompt {
        display: flex;
        align-items: center;
        font-size: ${_};
        font-weight: ${$};
      }

      #prompt > label {
        flex: none;
        cursor: pointer;
      }

      #prompt-text {
        text-align: left;
      }

      #comments {
        width: 100%;
        height: 50px;
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        resize: none;
      }

      #comments::placeholder {
        color: #767676;
      }

      #actions {
        display: flex;
        justify-content: center;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
        margin: 0;
      }

      #cancel-button {
        background-color: ${v};
      }

      #submit-button {
        background-color: ${l};
        margin-left: 10px;
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
      }

      .vote-button svg {
        width: 15px;
        height: 15px;
      }

      .vote-button input {
        margin: 0;
        padding: 0;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }

      .vote-button.noselection {
        border-color: ${z};
      }

      .vote-button.noselection svg {
        filter: ${D};
      }

      .vote-button.unselected {
        border-color: ${ve};
      }

      .vote-button.unselected svg {
        filter: ${xe};
      }

      .upvote-button.selected {
        border-color: ${A};
      }

      .upvote-button.selected svg {
        filter: ${R};
      }

      .downvote-button.selected {
        border-color: ${O};
      }

      .downvote-button.selected svg {
        filter: ${W};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `}};n([u({type:String})],ne.prototype,"featureIdentifier",void 0);n([u({type:String})],ne.prototype,"prompt",void 0);n([u({type:String})],ne.prototype,"buttonText",void 0);n([u({type:Object})],ne.prototype,"recaptchaManager",void 0);n([u({type:Object})],ne.prototype,"resizeObserver",void 0);n([u({type:Boolean})],ne.prototype,"disabled",void 0);n([u({type:Object})],ne.prototype,"featureFeedbackService",void 0);n([Y("#beta-button")],ne.prototype,"betaButton",void 0);n([Y("#popup")],ne.prototype,"popup",void 0);n([L()],ne.prototype,"isOpen",void 0);n([L()],ne.prototype,"processing",void 0);n([L()],ne.prototype,"popupTopX",void 0);n([L()],ne.prototype,"popupTopY",void 0);n([L()],ne.prototype,"vote",void 0);n([L()],ne.prototype,"voteSubmitted",void 0);n([L()],ne.prototype,"error",void 0);n([L()],ne.prototype,"voteNeedsChoosing",void 0);n([L()],ne.prototype,"recaptchaWidget",void 0);n([Y("#comments")],ne.prototype,"comments",void 0);ne=n([F("feature-feedback")],ne);var D1=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`,L1=H`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,R1=H`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`;let mi=class extends B{constructor(){super(...arguments),this.step=2,this.currentPage=1,this.pages=[]}firstUpdated(){this.observePageCount()}updated(e){e.has("size")&&this.observePageCount(),e.has("currentPage")&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];const e=7,t=this.size<=e;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}if(this.size===e){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(t&&this.currentPage>1&&this.currentPage<e){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}let i=this.currentPage-this.step,o=this.currentPage+this.step;i<=0&&(o+=-i+1,i=1),o>=this.size&&(i=Math.max(i-(o-this.size),1),o=this.size),i===2&&(o-=1),o===this.size-1&&(i+=1),this.createFirstNode(i),this.createMiddelNode(i,o),this.createLastNode(o)}createFirstNode(e){var t,i;e>1&&((t=this.pages)===null||t===void 0||t.push(1)),e>2&&((i=this.pages)===null||i===void 0||i.push(0))}createMiddelNode(e,t){var i;for(let o=e;o<=t;o+=1)(i=this.pages)===null||i===void 0||i.push(o)}createLastNode(e){var t,i;e<this.size-1&&((t=this.pages)===null||t===void 0||t.push(0)),e<this.size&&((i=this.pages)===null||i===void 0||i.push(this.size))}get getEllipsisTemplate(){return h`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent("pageNumberClicked",{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){this.currentPage-=1,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(e){this.currentPage=e}getPageTemplate(e){return h`
      <button
        @click=${()=>this.onChange(e)}
        class=${this.currentPage===e?"current":""}
        data-page=${e}
      >
        ${e}
      </button>
    `}get getPagesTemplate(){var e;return!this.pages||!this.pages.length?b:h`
      ${(e=this.pages)===null||e===void 0?void 0:e.map(t=>h`${t!==0?this.getPageTemplate(t):this.getEllipsisTemplate}`)}
    `}render(){return h`
      <div class="facets-pagination">
        <button class="arrow-icon rewind" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${L1}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${R1}
        </button>
      </div>
    `}static get styles(){return[pt,g`
        .facets-pagination {
          user-select: none;
          margin-top: 10px;
          background-color: #eee;
          text-align: center;
        }
        .facets-pagination button {
          border: none;
          background: none;
        }
        .facets-pagination .arrow-icon {
          width: 2.5rem;
          vertical-align: middle;
        }
        .facets-pagination .arrow-icon svg {
          height: 14px;
          fill: #2c2c2c;
        }
        .facets-pagination button,
        .facets-pagination i {
          background: none;
          border: 0;
          cursor: pointer;
          border-radius: 4px;
          margin: 10px 5px;
          padding: 5px;
          font-size: 1.4rem;
          color: inherit;
          vertical-align: baseline;
          display: inline-block;
          min-width: 2.5rem;
        }
        .facets-pagination i {
          cursor: auto;
          display: inline;
        }
        .facets-pagination button.current {
          background: #2c2c2c;
          color: white;
        }
        .page-numbers {
          display: inline-block;
        }
      `]}};n([u({type:Number})],mi.prototype,"size",void 0);n([u({type:Number})],mi.prototype,"step",void 0);n([u({type:Number})],mi.prototype,"currentPage",void 0);n([L()],mi.prototype,"pages",void 0);mi=n([F("more-facets-pagination")],mi);var O1=H`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,F1=H`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`,Or;let to=Or=class extends B{render(){return h`${this.facetRowTemplate}`}get facetRowTemplate(){var e,t,i,o;const{bucket:r,facetType:s}=this;if(!r||!s)return b;const l=`${s}:${r.key}-show-only`,d=`${s}:${r.key}-negative`,c=s!=="collection"?h`${(e=r.displayText)!==null&&e!==void 0?e:r.key}`:h`<a href="/details/${r.key}">
            ${(i=(t=this.collectionTitles)===null||t===void 0?void 0:t.get(r.key))!==null&&i!==void 0?i:r.key}
          </a> `,p=r.state==="hidden",v=r.state==="selected",f=`${s}: ${(o=r.displayText)!==null&&o!==void 0?o:r.key}`,w=v?`Show all ${s}s`:`Only show ${f}`,$=`Hide ${f}`,_=`Unhide ${f}`,z=p?_:$,D=`${f}, ${r.count} results`;return h`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${s}
            .value=${r.key}
            @click=${A=>{this.facetClicked(A,!1)}}
            .checked=${v}
            class="select-facet-checkbox"
            title=${w}
            id=${l}
            data-testid=${l}
          />
          <input
            type="checkbox"
            id=${d}
            .name=${s}
            .value=${r.key}
            @click=${A=>{this.facetClicked(A,!0)}}
            .checked=${p}
            class="hide-facet-checkbox"
          />
          <label
            for=${d}
            class="hide-facet-icon${p?" active":""}"
            title=${z}
            data-testid=${d}
          >
            <span class="eye">${O1}</span>
            <span class="eye-closed">${F1}</span>
          </label>
        </div>
        <label
          for=${l}
          class="facet-info-display"
          title=${w}
          aria-label=${D}
        >
          <div class="facet-title">${c}</div>
          <div class="facet-count">${r.count.toLocaleString()}</div>
        </label>
      </div>
    `}facetClicked(e,t){const{bucket:i,facetType:o}=this;if(!i||!o)return;const r=e.target,{checked:s}=r;this.bucket=ae(j({},i),{state:Or.getFacetState(s,t)}),this.dispatchFacetClickEvent({facetType:o,bucket:this.bucket,negative:t})}dispatchFacetClickEvent(e){const t=new CustomEvent("facetClick",{detail:e});this.dispatchEvent(t)}static getFacetState(e,t){let i;return e?i=t?"hidden":"selected":i="none",i}static get styles(){const e=g`var(--facet-row-border-top, 1px solid transparent)`,t=g`var(--facet-row-border-bottom, 1px solid transparent)`;return g`
      async-collection-name {
        display: contents;
      }
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: 15px;
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: 15px;
        width: 15px;
        margin: 0;
      }
      .facet-row-container {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 2.5px auto;
        height: auto;
        border-top: ${e};
        border-bottom: ${t};
        overflow: hidden;
      }
      .facet-info-display {
        display: flex;
        flex: 1 1 0%;
        cursor: pointer;
        flex-wrap: wrap;
      }
      .facet-title {
        word-break: break-word;
        display: inline-block;
        flex: 1 1 0%;
      }
      .facet-count {
        text-align: right;
      }
      .select-facet-checkbox {
        cursor: pointer;
        display: inline-block;
      }
      .hide-facet-checkbox {
        display: none;
      }
      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
        opacity: 0.3;
        display: inline-block;
      }
      .hide-facet-icon:hover,
      .active {
        opacity: 1;
      }
      .hide-facet-icon:hover .eye,
      .hide-facet-icon .eye-closed {
        display: none;
      }
      .hide-facet-icon:hover .eye-closed,
      .hide-facet-icon.active .eye-closed {
        display: inline;
      }
      .hide-facet-icon.active .eye {
        display: none;
      }
      .sorting-icon {
        cursor: pointer;
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `}};n([u({type:String})],to.prototype,"facetType",void 0);n([u({type:Object})],to.prototype,"bucket",void 0);n([u({type:Object})],to.prototype,"collectionTitles",void 0);to=Or=n([F("facet-row")],to);let Ho=class extends B{facetClicked(e){this.dispatchFacetClickEvent(e.detail)}dispatchFacetClickEvent(e){const t=new CustomEvent("facetClick",{detail:e,composed:!0});this.dispatchEvent(t)}get facetsTemplate(){const{facetGroup:e}=this;if(!e)return b;const t=e.buckets;return h`
      <div class="facet-rows" data-testid="facets-on-${e.key}">
        ${Vr(t,i=>`${e.key}:${i.key}`,i=>h`<facet-row
            .facetType=${e.key}
            .bucket=${i}
            .collectionTitles=${this.collectionTitles}
            @facetClick=${this.facetClicked}
          ></facet-row>`)}
      </div>
    `}render(){return h`${this.facetsTemplate}`}static get styles(){const e=g`var(--facetsColumnCount, 1)`,t=g`var(--facetsColumnGap, 15px)`;return g`
      .facet-rows {
        column-count: ${e};
        column-gap: ${t};
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `}};n([u({type:Object})],Ho.prototype,"facetGroup",void 0);n([u({type:Object})],Ho.prototype,"collectionTitles",void 0);Ho=n([F("facets-template")],Ho);let $t=class extends B{constructor(){super(...arguments),this.leftValue="",this.rightValue="",this.side="left"}render(){var e,t;return h`
      <div id="container">
        <label for="switch-left">${(e=this.leftLabel)!==null&&e!==void 0?e:this.leftValue}</label>
        <input
          type="radio"
          id="switch-left"
          class="sr-only"
          name="switch"
          .value=${this.leftValue}
          .checked=${this.side==="left"}
          @change=${this.handleRadioChange}
        />
        <input
          type="radio"
          id="switch-right"
          class="sr-only"
          name="switch"
          .value=${this.rightValue}
          .checked=${this.side==="right"}
          @change=${this.handleRadioChange}
        />
        <button
          id="switch-button"
          class=${this.side}
          aria-hidden="true"
          @click=${this.handleClick}
        >
          <div id="knob"></div>
        </button>
        <label for="switch-right">${(t=this.rightLabel)!==null&&t!==void 0?t:this.rightValue}</label>
      </div>
    `}get value(){return this.side==="left"?this.leftValue:this.rightValue}get selectedLabel(){var e,t;return this.side==="left"?(e=this.leftLabel)!==null&&e!==void 0?e:this.leftValue:(t=this.rightLabel)!==null&&t!==void 0?t:this.rightValue}handleClick(){this.side=this.side==="left"?"right":"left",this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?"left":"right",this.emitChangeEvent()}emitChangeEvent(){const e=new CustomEvent("change",{detail:this.value});this.dispatchEvent(e)}static get styles(){const e=g`var(--switchWidth, 30px)`,t=g`var(--switchHeight, 14px)`,i=g`var(--switchMarginLeft, 5px)`,o=g`var(--switchMarginRight, 5px)`,r=g`var(--switchBorderWidth, 3px)`,s=g`var(--switchBgColor, #194880)`,l=g`var(--switchBorderColor, #194880)`,d=g`var(--labelFontSize, 1.3rem)`,c=g`var(--knobColor, white)`,p=g`var(--knobTransitionDuration, 0.25s)`,v=g`var(--knobTransitionFn, ease)`;return[pt,g`
        #container {
          display: inline-flex;
          align-items: center;
          flex-wrap: nowrap;
          font-size: ${d};
        }

        #switch-button {
          width: ${e};
          height: ${t};
          margin: 0 ${o} 0 ${i};
          padding: 0;
          border: ${r} solid ${l};
          border-radius: ${t};
          box-sizing: content-box;
          background: ${s};
          appearance: none;
          cursor: pointer;
        }

        #switch-button.left #knob {
          transform: translateX(0);
        }

        #switch-button.right #knob {
          transform: translateX(calc(${e} - ${t}));
        }

        #switch-button:focus-visible {
          outline: 2px solid black;
          outline-offset: 2px;
        }

        #knob {
          display: block;
          width: ${t};
          height: ${t};
          border-radius: 50%;
          background: ${c};
          transition: transform ${p} ${v};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};n([u({type:String,attribute:!0})],$t.prototype,"leftValue",void 0);n([u({type:String,attribute:!0})],$t.prototype,"leftLabel",void 0);n([u({type:String,attribute:!0})],$t.prototype,"rightValue",void 0);n([u({type:String,attribute:!0})],$t.prototype,"rightLabel",void 0);n([u({type:String,attribute:!0})],$t.prototype,"side",void 0);n([Y("#switch-left")],$t.prototype,"leftRadio",void 0);$t=n([F("toggle-switch")],$t);function Fr(a,e){if(!!a)for(const[t,i]of Object.entries(a))for(const[o,r]of Object.entries(i))e(t,o,r,a)}function Vo(a,e,t,i=!1){const o=a!=null?a:lt(),r=ae(j({},o),{[e]:ae(j({},o[e]),{[t.key]:t})});return i&&t.state==="none"&&delete r[e][t.key],r}function B1(a){const e=lt();return Fr(a,(t,i,o)=>{e[t][i]=o}),e}function I1(a,e){const t=B1(a);return Fr(e,(i,o,r)=>{t[i][o]=r}),Fr(t,(i,o,r)=>{r.state==="none"&&delete t[i][o]}),t}const ol=["selected","hidden","none"];function hd(a,e=Z.COUNT){return a.sort((t,i)=>{const o=ol.indexOf(t.state),r=ol.indexOf(i.state),s=o-r;let l;return e===Z.ALPHABETICAL?l=t.key.localeCompare(i.key):e===Z.NUMERIC?l=Number(i.key)-Number(t.key):l=i.count-t.count,s||l})}let me=class extends B{constructor(){super(...arguments),this.facetsPerPage=35,this.facetsLoading=!0,this.sortedBy=Z.COUNT,this.unappliedFacetChanges=lt(),this.pageNumber=1}willUpdate(e){(e.has("aggregations")||e.has("facetsPerPage")||e.has("sortedBy")||e.has("selectedFacets")||e.has("unappliedFacetChanges"))&&(this.facetGroup=this.mergedFacets)}updated(e){(e.has("facetKey")||e.has("query")||e.has("searchType")||e.has("filterMap"))&&(this.facetsLoading=!0,this.pageNumber=1,this.sortedBy=zo[this.facetKey],this.updateSpecificFacets())}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener("keydown",e=>{var t;e.key==="Escape"&&((t=this.modalManager)===null||t===void 0||t.closeModal())}):document.removeEventListener("keydown",()=>{})}get isSearchResultsPage(){var e;const t=(e=this.pageSpecifierParams)===null||e===void 0?void 0:e.pageType;return t===void 0||t==="search_results"}async updateSpecificFacets(){var e,t,i,o,r,s;if(!this.facetKey)return;const l=(e=this.query)===null||e===void 0?void 0:e.trim();if(!l&&this.isSearchResultsPage)return;const d={simpleParams:[this.facetKey]},c=65535,p=ae(j({},this.pageSpecifierParams),{query:l||"",filters:this.filterMap,aggregations:d,aggregationsSize:c,rows:0}),v=await((t=this.searchService)===null||t===void 0?void 0:t.search(p,this.searchType));this.aggregations=(i=v==null?void 0:v.success)===null||i===void 0?void 0:i.response.aggregations,this.facetsLoading=!1;const f=(r=(o=v==null?void 0:v.success)===null||o===void 0?void 0:o.response)===null||r===void 0?void 0:r.collectionTitles;if(f)for(const[w,$]of Object.entries(f))(s=this.collectionTitles)===null||s===void 0||s.set(w,$)}pageNumberClicked(e){var t,i;const o=(t=e==null?void 0:e.detail)===null||t===void 0?void 0:t.page;o&&(this.pageNumber=Number(o)),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ze.default,action:ie.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){var e;if(!this.facetKey||!this.selectedFacets)return;const{selectedFacetGroup:t,aggregationFacetGroup:i}=this;if(!i)return;const o=j({},t!=null?t:i),r=(e=t==null?void 0:t.buckets.map(l=>{const d=i.buckets.find(c=>c.key===l.key);return d?ae(j({},l),{count:d.count}):l}))!==null&&e!==void 0?e:[];hd(r,this.sortedBy),i.buckets.forEach(l=>{t!=null&&t.buckets.find(c=>c.key===l.key)||r.push(l)});const s=this.unappliedFacetChanges[this.facetKey];for(const[l,d]of r.entries()){const c=s[d.key];c&&(r[l]=j({},c))}return o.buckets=r,o}get selectedFacetGroup(){if(!this.selectedFacets||!this.facetKey)return;const e=this.selectedFacets[this.facetKey];if(!e)return;const t=Ao[this.facetKey],i=Object.entries(e).map(([o,r])=>({displayText:o,key:o,count:r==null?void 0:r.count,state:r==null?void 0:r.state}));return{title:t,key:this.facetKey,buckets:i}}get aggregationFacetGroup(){if(!this.aggregations||!this.facetKey)return;const e=this.aggregations[this.facetKey];if(!e)return;const t=Ao[this.facetKey];let i=e.getSortedBuckets(this.sortedBy);this.facetKey==="collection"&&(i=i==null?void 0:i.filter(r=>{var s;const l=(s=r==null?void 0:r.key)===null||s===void 0?void 0:s.toString();return!Yo[l]&&!(l!=null&&l.startsWith("fav-"))}));const o=i.map(r=>{const s=`${r.key}`;return{displayText:`${s}`,key:`${s}`,count:r.doc_count,state:"none"}});return{title:t,key:this.facetKey,buckets:o}}get facetGroupForCurrentPage(){const{facetGroup:e}=this;if(!e)return;const t=(this.pageNumber-1)*this.facetsPerPage,i=e.buckets.slice(t,t+this.facetsPerPage);return ae(j({},e),{buckets:i})}get moreFacetsTemplate(){return h`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${e=>{this.facetKey&&(this.unappliedFacetChanges=Vo(this.unappliedFacetChanges,this.facetKey,e.detail.bucket))}}
      ></facets-template>
    `}get loaderTemplate(){return h`<div class="facets-loader">
      <ia-activity-indicator .mode=${"processing"}></ia-activity-indicator>
    </div> `}get paginationSize(){var e;if(!this.aggregations||!this.facetKey)return 0;const t=(e=this.aggregations[this.facetKey])===null||e===void 0?void 0:e.buckets.length;return Math.ceil(t/this.facetsPerPage)}get facetsPaginationTemplate(){return this.paginationSize>1?h`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`:b}get footerTemplate(){return this.paginationSize>0?h`${this.facetsPaginationTemplate}
        <div class="footer">
          <button
            class="btn btn-cancel"
            type="button"
            @click=${this.cancelClick}
          >
            Cancel
          </button>
          <button
            class="btn btn-submit"
            type="button"
            @click=${this.applySearchFacetsClicked}
          >
            Apply filters
          </button>
        </div> `:b}sortFacetAggregation(e){this.sortedBy=e,this.dispatchEvent(new CustomEvent("sortedFacets",{detail:this.sortedBy}))}get modalHeaderTemplate(){var e,t,i;const r=((e=this.sortedBy)!==null&&e!==void 0?e:zo[this.facetKey])===Z.COUNT?"left":"right";return h`<span class="sr-only">${k("More facets for:")}</span>
      <span class="title">
        ${(t=this.facetGroup)===null||t===void 0?void 0:t.title}

        <label class="sort-label">${k("Sort by:")}</label>
        ${this.facetKey?h`<toggle-switch
              class="sort-toggle"
              leftValue=${Z.COUNT}
              leftLabel="Count"
              rightValue=${yc[this.facetKey]}
              rightLabel=${(i=this.facetGroup)===null||i===void 0?void 0:i.title}
              side=${r}
              @change=${s=>{this.sortFacetAggregation(Number(s.detail))}}
            ></toggle-switch>`:b}
      </span>`}render(){return h`
      ${this.facetsLoading?this.loaderTemplate:h`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){var e,t;const i=I1(this.selectedFacets,this.unappliedFacetChanges),o=new CustomEvent("facetsChanged",{detail:i,bubbles:!0,composed:!0});this.dispatchEvent(o),this.unappliedFacetChanges=lt(),(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:Ze.default,action:`${ie.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){var e,t;this.unappliedFacetChanges=lt(),(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:Ze.default,action:ie.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){const e=g`var(--primaryButtonBGColor, #194880)`;return[pt,g`
        section#more-facets {
          overflow: auto;
          padding: 10px; /* leaves room for scroll bar to appear without overlaying on content */
          --facetsColumnCount: 3;
        }
        .header-content .title {
          display: block;
          text-align: left;
          font-size: 1.8rem;
          padding: 0 10px;
          font-weight: bold;
        }

        .sort-label {
          margin-left: 20px;
          font-size: 1.3rem;
        }

        .sort-toggle {
          font-weight: normal;
        }

        .facets-content {
          font-size: 1.2rem;
          max-height: 300px;
          overflow: auto;
          padding: 10px;
        }
        .facets-loader {
          margin-bottom: 20px;
          width: 70px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .btn {
          border: none;
          padding: 10px;
          margin-bottom: 10px;
          width: auto;
          border-radius: 4px;
          cursor: pointer;
        }
        .btn-cancel {
          background-color: #2c2c2c;
          color: white;
        }
        .btn-submit {
          background-color: ${e};
          color: white;
        }
        .footer {
          text-align: center;
          margin-top: 10px;
        }

        @media (max-width: 560px) {
          section#more-facets {
            max-height: 450px;
            --facetsColumnCount: 1;
          }
          .facets-content {
            overflow-y: auto;
            height: 300px;
          }
        }
      `]}};n([u({type:String})],me.prototype,"facetKey",void 0);n([u({type:String})],me.prototype,"query",void 0);n([u({type:Object})],me.prototype,"filterMap",void 0);n([u({type:String})],me.prototype,"searchType",void 0);n([u({type:Object})],me.prototype,"pageSpecifierParams",void 0);n([u({type:Object})],me.prototype,"collectionTitles",void 0);n([u({type:Number})],me.prototype,"facetsPerPage",void 0);n([u({type:Boolean})],me.prototype,"facetsLoading",void 0);n([u({type:Object})],me.prototype,"selectedFacets",void 0);n([u({type:String})],me.prototype,"sortedBy",void 0);n([u({type:Object})],me.prototype,"modalManager",void 0);n([u({type:Object})],me.prototype,"searchService",void 0);n([u({type:Object,attribute:!1})],me.prototype,"analyticsHandler",void 0);n([L()],me.prototype,"aggregations",void 0);n([L()],me.prototype,"facetGroup",void 0);n([L()],me.prototype,"unappliedFacetChanges",void 0);n([L()],me.prototype,"pageNumber",void 0);me=n([F("more-facets-content")],me);let al=class extends B{render(){return h`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return g`
      #row {
        display: grid;
        grid-template-columns: 15px 1fr 36px;
        grid-gap: 9px 6px;
        align-items: center;
        margin: 2.5px auto;
        border: 1px solid transparent;
      }

      .tombstone-line {
        background: #ddd;
        height: 6px;
        border-radius: 50px;
      }

      input[type='checkbox'] {
        width: 15px;
        height: 15px;
        margin: 0;
      }
    `}};al=n([F("facet-tombstone-row")],al);let it=class extends B{constructor(){super(...arguments),this.boundEscapeListener=e=>{e.key==="Escape"&&this.closeModal()}}render(){var e,t;return h`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${(e=this.minSelectedDate)!==null&&e!==void 0?e:this.minDate}
          .maxSelectedDate=${(t=this.maxSelectedDate)!==null&&t!==void 0?t:this.maxDate}
          .updateDelay=${0}
          updateWhileFocused
          missingDataMessage="..."
          .width=${560}
          .height=${120}
          .bins=${this.buckets}
          @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        >
          <button
            id="apply-btn"
            slot="inputs-right-side"
            @click=${this.applyBtnClicked}
          >
            Apply date range
          </button>
        </histogram-date-range>
      </div>
    `}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupEscapeListener()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener("keydown",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keydown",this.boundEscapeListener)}histogramDateRangeUpdated(e){this.minSelectedDate=e.detail.minDate,this.maxSelectedDate=e.detail.maxDate}applyBtnClicked(){var e;const t=new CustomEvent("histogramDateRangeApplied",{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(t),this.closeModal(),(e=this.analyticsHandler)===null||e===void 0||e.sendEvent({category:Ze.default,action:ie.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent("modalClosed")))}static get styles(){return g`
      #container {
        display: flex;
        justify-content: center;
        padding: 40px 10px 10px;
        overflow: hidden;
      }

      #date-picker {
        --histogramDateRangeInputWidth: 50px;
        --histogramDateRangeInputRowMargin: 5px 0 0 0;
      }

      #apply-btn {
        margin: 0 0 0 5px;
        padding: 8px 10px;
        border: 0;
        border-radius: 4px;
        background: var(--primaryButtonBGColor, #194880);
        color: white;
        cursor: pointer;
      }
    `}};n([u({type:String})],it.prototype,"minDate",void 0);n([u({type:String})],it.prototype,"maxDate",void 0);n([u({type:String})],it.prototype,"minSelectedDate",void 0);n([u({type:String})],it.prototype,"maxSelectedDate",void 0);n([u({type:Array})],it.prototype,"buckets",void 0);n([u({type:Object,attribute:!1})],it.prototype,"modalManager",void 0);n([u({type:Object,attribute:!1})],it.prototype,"analyticsHandler",void 0);it=n([F("expanded-date-picker")],it);let V=class extends B{constructor(){super(...arguments),this.moreLinksVisible=!0,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.allowExpandingDatePicker=!1,this.parentCollections=[],this.collectionPagePath="/details/",this.isManageView=!1,this.openFacets={subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1},this.allowedFacetCount=6,this.handleExpandedDatePickerClosed=()=>{var e;(e=this.modalManager)===null||e===void 0||e.classList.remove("expanded-date-picker")},this.histogramDateRangeUpdated=e=>{const{minDate:t,maxDate:i}=e.detail,o=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(o)}}render(){const e=ni({loading:this.facetsLoading,managing:this.isManageView}),t="date-picker-label";return h`
      <div id="container" class=${e}>
        ${this.showHistogramDatePicker&&(this.fullYearsHistogramAggregation||this.fullYearAggregationLoading)?h`
              <section
                class="facet-group"
                aria-labelledby=${t}
                data-testid="facet-group-header-label-date-picker"
              >
                <h3 id=${t}>
                  Year Published <span class="sr-only">range filter</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `:b}
        ${this.collectionPartOfTemplate}
        ${this.mergedFacets.map(i=>this.getFacetGroupTemplate(i))}
      </div>
    `}get collectionPartOfTemplate(){var e;if(!(!((e=this.parentCollections)===null||e===void 0)&&e.length))return b;const t="partof-heading";return h`
      <section
        class="facet-group partof-collections"
        aria-labelledby=${t}
        data-testid="facet-group-partof-collections"
      >
        <div class="facet-group-header">
          <h3 id=${t}>${k("Part Of")}</h3>
        </div>
        <ul>
          ${Dt(this.parentCollections,i=>{var o,r;const s=`${this.baseNavigationUrl}${this.collectionPagePath}${i}`;return h` <li>
              <a
                href=${s}
                data-id=${i}
                @click=${this.partOfCollectionClicked}
              >
                ${(r=(o=this.collectionTitles)===null||o===void 0?void 0:o.get(i))!==null&&r!==void 0?r:i}
              </a>
            </li>`})}
        </ul>
      </section>
    `}partOfCollectionClicked(e){var t;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:Ze.default,action:ie.partOfCollectionClicked,label:e.target.dataset.id})}showDatePickerModal(){var e,t,i;const{fullYearsHistogramAggregation:o}=this,r=o==null?void 0:o.first_bucket_key,s=o==null?void 0:o.last_bucket_key,l=o==null?void 0:o.buckets,c=h`
      <expanded-date-picker
        ${vh(v=>{if(v&&v instanceof it){const f=v;f.minSelectedDate=this.minSelectedDate,f.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${r}
        .maxDate=${s}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .buckets=${l}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,p=new oi({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`Select a date range`});(e=this.modalManager)===null||e===void 0||e.classList.add("expanded-date-picker"),(t=this.modalManager)===null||t===void 0||t.showModal({config:p,customModalContent:c,userClosedModalCallback:this.handleExpandedDatePickerClosed}),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ze.default,action:ie.histogramExpanded,label:window.location.href})}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?h`<button
          class="expand-date-picker-btn"
          aria-hidden="true"
          @click=${this.showDatePickerModal}
        >
          ${D1}
        </button>`:b}get histogramTemplate(){var e,t;const{fullYearsHistogramAggregation:i}=this,o=i==null?void 0:i.first_bucket_key,r=i==null?void 0:i.last_bucket_key;return this.fullYearAggregationLoading?h`<div class="histogram-loading-indicator">&hellip;</div>`:h`
          <histogram-date-range
            .minDate=${o}
            .maxDate=${r}
            .minSelectedDate=${(e=this.minSelectedDate)!==null&&e!==void 0?e:o}
            .maxSelectedDate=${(t=this.maxSelectedDate)!==null&&t!==void 0?t:r}
            .updateDelay=${100}
            missingDataMessage="..."
            .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
            .bins=${i==null?void 0:i.buckets}
            @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
          ></histogram-date-range>
        `}get mergedFacets(){const e=[];return gc.forEach(t=>{var i,o;const r=this.selectedFacetGroups.find(p=>p.key===t),s=this.aggregationFacetGroups.find(p=>p.key===t);if(r&&!s){e.push(r);return}if(!s)return;const l=r!=null?r:s;let d=(i=r==null?void 0:r.buckets.map(p=>{const v=s.buckets.find(f=>f.key===p.key);return v?ae(j({},p),{count:v.count}):p}))!==null&&i!==void 0?i:[];s.buckets.forEach(p=>{d.find(f=>f.key===p.key)||d.push(p)});let c=(o=Object.keys((r==null?void 0:r.buckets)||[]))===null||o===void 0?void 0:o.length;if(c<this.allowedFacetCount&&(c=this.allowedFacetCount),t==="lending"&&(d=d.filter(p=>bc[p.key])),hd(d),t==="mediatype"){const p=d.findIndex(v=>v.key==="collection");if(p>=c){const[v]=d.splice(p,1);c>this.allowedFacetCount&&(c+=1),d.splice(c-1,0,v)}}l.buckets=d.slice(0,c),e.push(l)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const o=t,r=Ao[o],s=Object.entries(i).map(([l,d])=>{var c;let p=l;return o==="lending"&&(p=(c=Qs[l])!==null&&c!==void 0?c:l),{displayText:p,key:l,count:d.count,state:d.state}});return{title:r,key:o,buckets:s}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,o])=>{if(i==="year_histogram")return;const r=i,s=Ao[r];if(!s)return;let l=o.getSortedBuckets(zo[r]);r==="collection"&&(l=l==null?void 0:l.filter(p=>{var v;const f=(v=p==null?void 0:p.key)===null||v===void 0?void 0:v.toString();return!Yo[f]&&!(f!=null&&f.startsWith("fav-"))}));const d=l.map(p=>{var v;const f=p.key;let w=`${p.key}`;return r==="lending"&&(w=(v=Qs[p.key])!==null&&v!==void 0?v:`${p.key}`),{displayText:w,key:`${f}`,count:p.doc_count,state:"none"}}),c={title:s,key:r,buckets:d};t.push(c)}),t}getFacetGroupTemplate(e){if(!this.facetsLoading&&e.buckets.length===0)return b;const{key:t}=e,i=this.openFacets[t],o=h`
      <span class="collapser ${i?"open":""}"> ${hr} </span>
    `,r=()=>{const l=j({},this.openFacets);l[t]=!i,this.openFacets=l},s=`facet-group-header-label-${e.key}`;return h`
      <section
        class="facet-group ${this.collapsableFacets?"mobile":""}"
        aria-labelledby=${s}
        data-testid=${s}
      >
        <div class="facet-group-header">
          <h3
            id=${s}
            @click=${r}
            @keyup=${r}
          >
            ${this.collapsableFacets?o:b} ${e.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div
          class="facet-group-content ${i?"open":""}"
          data-testid="facet-group-content-${e.key}"
        >
          ${this.facetsLoading?this.getTombstoneFacetGroupTemplate():h`
                ${this.getFacetTemplate(e)}
                ${this.searchMoreFacetsLink(e)}
              `}
        </div>
      </section>
    `}getTombstoneFacetGroupTemplate(){return h`
      ${Dt(Array(5).fill(null),()=>h`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(e){if(!this.moreLinksVisible||e.key==="lending"||Object.keys(e.buckets).length<this.allowedFacetCount)return b;const t=zo[e.key];return h`<button
      class="more-link"
      @click=${()=>{var i;this.showMoreFacetsModal(e,t),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ze.default,action:ie.showMoreFacetsModal,label:e.key}),this.dispatchEvent(new CustomEvent("showMoreFacets",{detail:e.key}))}}
      data-testid="more-link-btn"
    >
      More...
    </button>`}async showMoreFacetsModal(e,t){var i,o;const r=h`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${e.key}
        .query=${this.query}
        .filterMap=${this.filterMap}
        .pageSpecifierParams=${this.pageSpecifierParams}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .searchType=${this.searchType}
        .collectionTitles=${this.collectionTitles}
        .selectedFacets=${this.selectedFacets}
        .sortedBy=${t}
        @facetsChanged=${l=>{const d=new CustomEvent("facetsChanged",{detail:l.detail,bubbles:!0,composed:!0});this.dispatchEvent(d)}}
      >
      </more-facets-content>
    `,s=new oi({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`Select filters`});(i=this.modalManager)===null||i===void 0||i.classList.add("more-search-facets"),(o=this.modalManager)===null||o===void 0||o.showModal({config:s,customModalContent:r,userClosedModalCallback:()=>{var l;(l=this.modalManager)===null||l===void 0||l.classList.remove("more-search-facets")}})}getFacetTemplate(e){return h`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${e}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${t=>{this.selectedFacets=Vo(this.selectedFacets,e.key,t.detail.bucket,!0);const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(i)}}
      ></facets-template>
    `}static get styles(){return[pt,g`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:link:hover {
          text-decoration: underline;
        }

        #container.loading {
          opacity: 0.5;
        }

        #container.managing {
          opacity: 0.3;
        }

        .histogram-loading-indicator {
          width: 100%;
          height: 2.25rem;
          margin-top: 1.75rem;
          font-size: 1.4rem;
          text-align: center;
        }

        .collapser {
          display: inline-block;
          cursor: pointer;
          width: 10px;
          height: 10px;
        }

        .collapser svg {
          transition: transform 0.2s ease-in-out;
        }

        .collapser.open svg {
          transform: rotate(90deg);
        }

        .facet-group:not(:last-child) {
          margin-bottom: 2rem;
        }

        .facet-group h3 {
          margin-bottom: 0.7rem;
        }

        .facet-group.mobile h3 {
          cursor: pointer;
        }

        .facet-group-header {
          display: flex;
          margin-bottom: 0.7rem;
          justify-content: space-between;
          border-bottom: 1px solid rgb(232, 232, 232);
        }

        .facet-group-content {
          transition: max-height 0.2s ease-in-out;
        }

        .facet-group.mobile .facet-group-content {
          max-height: 0;
          overflow: hidden;
        }

        .facet-group.mobile .facet-group-content.open {
          max-height: 2000px;
        }

        .partof-collections ul {
          list-style-type: none;
          padding: 0;
          font-size: 1.2rem;
        }

        h3 {
          font-size: 1.4rem;
          font-weight: 200
          padding-bottom: 3px;
          margin: 0;
        }

        .more-link {
          font-size: 1.2rem;
          text-decoration: none;
          padding: 0;
          background: inherit;
          border: 0;
          color: var(--ia-theme-link-color, #4b64ff);
          cursor: pointer;
        }

        #date-picker-label {
          display: flex;
          justify-content: space-between;
        }

        .expand-date-picker-btn {
          margin: 0;
          padding: 0;
          border: 0;
          appearance: none;
          background: none;
          cursor: pointer;
        }

        .expand-date-picker-btn > svg {
          width: 14px;
          height: 14px;
        }

        .sorting-icon {
          height: 15px;
          cursor: pointer;
        }
      `]}};n([u({type:Object})],V.prototype,"searchService",void 0);n([u({type:String})],V.prototype,"searchType",void 0);n([u({type:Object})],V.prototype,"aggregations",void 0);n([u({type:Object})],V.prototype,"fullYearsHistogramAggregation",void 0);n([u({type:String})],V.prototype,"minSelectedDate",void 0);n([u({type:String})],V.prototype,"maxSelectedDate",void 0);n([u({type:Boolean})],V.prototype,"moreLinksVisible",void 0);n([u({type:Boolean})],V.prototype,"facetsLoading",void 0);n([u({type:Boolean})],V.prototype,"fullYearAggregationLoading",void 0);n([u({type:Object})],V.prototype,"selectedFacets",void 0);n([u({type:Boolean})],V.prototype,"collapsableFacets",void 0);n([u({type:Number})],V.prototype,"contentWidth",void 0);n([u({type:Boolean})],V.prototype,"showHistogramDatePicker",void 0);n([u({type:Boolean})],V.prototype,"allowExpandingDatePicker",void 0);n([u({type:String})],V.prototype,"query",void 0);n([u({type:Object})],V.prototype,"pageSpecifierParams",void 0);n([u({type:Array})],V.prototype,"parentCollections",void 0);n([u({type:Object})],V.prototype,"filterMap",void 0);n([u({type:String})],V.prototype,"baseNavigationUrl",void 0);n([u({type:String})],V.prototype,"collectionPagePath",void 0);n([u({type:Boolean})],V.prototype,"isManageView",void 0);n([u({type:Object,attribute:!1})],V.prototype,"modalManager",void 0);n([u({type:Object,attribute:!1})],V.prototype,"resizeObserver",void 0);n([u({type:Object,attribute:!1})],V.prototype,"featureFeedbackService",void 0);n([u({type:Object,attribute:!1})],V.prototype,"recaptchaManager",void 0);n([u({type:Object,attribute:!1})],V.prototype,"analyticsHandler",void 0);n([u({type:Object,attribute:!1})],V.prototype,"collectionTitles",void 0);n([L()],V.prototype,"openFacets",void 0);V=n([F("collection-facets")],V);let rl=class extends B{render(){return h`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=g`var(--circularActivityIndicatorColor, dodgerblue)`,t=g`var(--circularActivityIndicatorThickness, 4px)`;return g`
      :host {
        display: block;
      }

      .lds-ring {
        display: inline-block;
        position: relative;
        width: 100%;
        height: 100%;
      }
      .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 80%;
        height: 80%;
        margin: ${t};
        border-width: ${t};
        border-style: solid;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${e} transparent transparent transparent;
      }
      .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
      }
      .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
      }
      .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
      }
      @keyframes lds-ring {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}};rl=n([F("circular-activity-indicator")],rl);function U1(a,e){return a===void 0?e!==void 0:e===void 0?a!==void 0:a.facetType===e.facetType&&a.bucketKey===e.bucketKey}function Br(a,e){return a.label===e.label&&a.facets.length===e.facets.length&&a.facets.every((t,i)=>U1(t,e.facets[i]))}function pd(a){if(!Array.isArray(a[0])){const i=a;let o=[...i];for(const r of i)o=o.filter(s=>r===s||!Br(r,s));return o}const e=a,t=[];for(const i of e){const o=[];for(const r of i)t.find(l=>l.find(d=>Br(r,d)))||o.push(r);o.length>0&&t.push(o)}return t}class os{async getRecommendedFacets(){const e=navigator.language,t=os.getLanguageDisplayName(e);return t?[{facets:[{facetType:"language",bucketKey:t}]}]:[]}static getLanguageDisplayName(e){const t=e.split("-")[0];return new Intl.DisplayNames(["en"],{type:"language"}).of(t)}}class ta{async getRecommendedFacets(e){const t=[];for(const[i,o]of Object.entries(ta.KEYWORDS))e.includes(i)&&t.push(...o);return t}}ta.KEYWORDS={text:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],book:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],pdf:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],epub:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],audio:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],song:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],music:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],listen:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],podcast:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],radio:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]}],stream:[{facets:[{facetType:"mediatype",bucketKey:"audio"}]},{facets:[{facetType:"mediatype",bucketKey:"movies"}]}],video:[{facets:[{facetType:"mediatype",bucketKey:"movies"}]}],movie:[{facets:[{facetType:"mediatype",bucketKey:"movies"}]}],film:[{facets:[{facetType:"mediatype",bucketKey:"movies"}]}],image:[{facets:[{facetType:"mediatype",bucketKey:"image"}]}],photo:[{facets:[{facetType:"mediatype",bucketKey:"image"}]}],picture:[{facets:[{facetType:"mediatype",bucketKey:"image"}]}],software:[{facets:[{facetType:"mediatype",bucketKey:"software"}]}],app:[{facets:[{facetType:"mediatype",bucketKey:"software"}]}],program:[{facets:[{facetType:"mediatype",bucketKey:"software"}]}],game:[{facets:[{facetType:"mediatype",bucketKey:"software"}]}],etree:[{facets:[{facetType:"mediatype",bucketKey:"etree"}]}],concert:[{facets:[{facetType:"mediatype",bucketKey:"etree"}]}],"live music":[{facets:[{facetType:"mediatype",bucketKey:"etree"}]}],dataset:[{facets:[{facetType:"mediatype",bucketKey:"data"}]}]};class ia{async getRecommendedFacets(e){var t;const i=[];try{const o=encodeURIComponent(e),s=await(await fetch(`https://www.wikidata.org/w/api.php?action=wbsearchentities&search=${o}&format=json&language=en&uselang=en&origin=*&type=item&limit=5`)).json();for(const[l,d]of Object.entries(ia.ENTITIES))if(new RegExp(`\\b${l}\\b`).test((t=s.search[0])===null||t===void 0?void 0:t.description)){const p=s.search[0].label;i.push(...d.map(v=>{var f;return{label:(f=v.label)===null||f===void 0?void 0:f.replace("__QUERY",p),facets:v.facets.map(w=>{var $;const _=ae(j({},w),{bucketKey:w.bucketKey.replace("__QUERY",e)});return w.displayText&&(_.displayText=($=_.displayText)===null||$===void 0?void 0:$.replace("__QUERY",p)),_})}}))}return i}catch{return[]}}}ia.ENTITIES={"written work":[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],literature:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],book:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],novel:[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],filmmaker:[{label:"Films by __QUERY",facets:[{facetType:"mediatype",bucketKey:"movies"},{facetType:"creator",bucketKey:"__QUERY"}]}],author:[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],writer:[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],poet:[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],photographer:[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],painter:[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],"visual artist":[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],"graphic artist":[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],singer:[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],songwriter:[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],musician:[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],composer:[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],pianist:[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}]};class oa{async getRecommendedFacets(e){const t=oa.HEURISTICS.map(i=>new i().getRecommendedFacets(e));return pd((await Promise.all(t)).flat())}}oa.HEURISTICS=[ta,ia,os];var N1=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m 91.666668,8.3333328 v 0.9708343 l -35.3625,39.2916669 -2.137502,2.375 v 3.195832 32.350001 L 45.833334,82.35 V 54.166666 50.970834 l -2.1375,-2.375 L 8.3333328,9.3041671 V 8.3333328 H 91.666668 M 100,0 H 0 V 12.5 L 37.500001,54.166666 V 87.5 l 25,12.5 V 54.166666 L 100,12.5 Z"
      fill="#000"
    />
  </svg>
`;function H1(a){return a&&a.charAt(0).toLocaleUpperCase()+a.slice(1)}let io=class extends B{constructor(){super(...arguments),this.selected=!1}render(){var e,t;if(!this.facetInfo)return b;const i=this.facetInfo.facets.length===1,o=this.facetInfo.facets[0],r=H1((this.labelPrefix?`${this.labelPrefix} `:"")+((t=(e=this.facetInfo.label)!==null&&e!==void 0?e:o.displayText)!==null&&t!==void 0?t:o.bucketKey));if(!r)return b;const s=i&&o.facetType==="mediatype"?Al[o.bucketKey].icon:b;return h`
      <a
        class="smart-facet-button ${this.selected?"selected":""}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${s} ${r}
        ${this.selected?h`<span style="margin-left: 5px;">×</span>`:b}
      </a>
    `}get href(){const e=new URL(window.location.href);if(this.facetInfo)for(const t of this.facetInfo.facets)e.searchParams.append("and[]",encodeURIComponent(`${t.facetType}:"${t.bucketKey}"`));return e.toString()}facetClicked(e){e.preventDefault(),this.facetInfo&&(this.selected=!this.selected,this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:this.facetInfo,details:this.facetInfo.facets.map(t=>({facetType:t.facetType,bucket:{key:t.bucketKey,count:0,state:this.selected?"selected":"none"},negative:!1}))}})))}static get styles(){return g`
      .smart-facet-button {
        padding: 5px 10px;
        border-radius: 15px;
        background: #194880;
        color: white;
        font-size: 1.6rem;
        font-family: inherit;
        text-decoration: none;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
      }

      .smart-facet-button.selected {
        background: #4c76aa;
      }

      .smart-facet-button > svg {
        width: 15px;
        filter: invert(1);
        vertical-align: text-top;
      }
    `}};n([u({type:Object})],io.prototype,"facetInfo",void 0);n([u({type:String})],io.prototype,"labelPrefix",void 0);n([u({type:Boolean})],io.prototype,"selected",void 0);io=n([F("smart-facet-button")],io);let gi=class extends B{render(){var e,t;if(!this.facetInfo||!this.activeFacetRef||this.facetInfo.length===0)return b;const i=(e=this.activeFacetRef.displayText)!==null&&e!==void 0?e:this.activeFacetRef.bucketKey;return i?h`
      <div class="dropdown-container">
        <ia-dropdown
          class="dropdown"
          displayCaret
          openViaButton
          closeOnSelect
          includeSelectedOption
          .options=${this.dropdownOptions}
          .selectedOption=${this.activeDropdownOption}
          @optionSelected=${this.optionSelected}
          @click=${this.onDropdownClick}
        >
          <span class="dropdown-label" slot="dropdown-label"
            >${(t=this.labelPrefix)!==null&&t!==void 0?t:b} ${i}</span
          >
        </ia-dropdown>
      </div>
    `:b}get dropdownOptions(){var e,t;return(t=(e=this.facetInfo)===null||e===void 0?void 0:e.map(i=>{var o,r;const s=i.facets[0];return{id:s.bucketKey,label:(r=(o=i.label)!==null&&o!==void 0?o:s.displayText)!==null&&r!==void 0?r:s.bucketKey}}))!==null&&t!==void 0?t:[]}get activeDropdownOption(){if(!!this.activeFacetRef)return this.dropdownOptions.find(e=>{var t;return e.id===((t=this.activeFacetRef)===null||t===void 0?void 0:t.bucketKey)})}optionSelected(e){if(!this.facetInfo||!this.activeFacetRef)return;let t;for(const i of this.facetInfo){const o=i.facets.find(r=>r.bucketKey===e.detail.option.id);o&&(this.activeFacetRef=o,t=i)}!t||this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:t,details:[{facetType:this.activeFacetRef.facetType,bucket:{key:this.activeFacetRef.bucketKey,count:0,state:"selected"},negative:!1}]}}))}onDropdownClick(){He("smart dropdown: onDropdownClick",this),this.dispatchEvent(new CustomEvent("dropdownClick",{detail:this}))}close(){this.dropdown&&(this.dropdown.open=!1)}static get styles(){return g`
      .dropdown-container {
        padding: 5px 8px;
        border-radius: 5px;
        background: #194880;
        color: white;
        font-size: 1.6rem;
        font-family: inherit;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
      }

      .dropdown-label {
        font-size: 1.6rem;
        font-family: inherit;
      }

      .dropdown {
        --dropdownBorderWidth: 5px;
        --dropdownBorderColor: transparent;
        --caretWidth: 14px;
        --caretHeight: 14px;
      }
    `}};n([u({type:Array})],gi.prototype,"facetInfo",void 0);n([u({type:String})],gi.prototype,"labelPrefix",void 0);n([u({type:Object})],gi.prototype,"activeFacetRef",void 0);n([Y("ia-dropdown")],gi.prototype,"dropdown",void 0);gi=n([F("smart-facet-dropdown")],gi);const sl={collection:"Collection: ",creator:"By: ",subject:"About: "};function V1(a){return a.charAt(0).toUpperCase()+a.slice(1)}let ot=class extends B{constructor(){super(...arguments),this.filterToggleActive=!1,this.heuristicRecs=[],this.smartFacets=[]}render(){return h`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${Vr(this.smartFacets,e=>`${e[0].label}|${e[0].facets[0].facetType}|${e[0].facets[0].bucketKey}`,e=>this.makeSmartFacet(e))}
      </div>
    `}willUpdate(e){let t=!1;e.has("query")&&(He("query change",e.get("query"),this.query),this.lastAggregations=void 0,t=!0),e.has("aggregations")&&!this.lastAggregations&&this.aggregations&&Object.keys(this.aggregations).length>0&&(He("aggs change",e.get("aggregations"),this.aggregations),this.lastAggregations=this.aggregations,t=!0),t&&(He("should update smart facets, doing so..."),this.updateSmartFacets())}async updateSmartFacets(){He("updating smart facets"),this.query&&(this.heuristicRecs=await new oa().getRecommendedFacets(this.query),He("heuristic recs are",this.heuristicRecs),this.smartFacets=pd(this.facetsToDisplay),He("smart facets are",this.smartFacets))}makeSmartFacet(e){return e.length===0?b:e.length===1?this.smartFacetButton(e[0]):this.smartFacetDropdown(e)}smartFacetButton(e){var t;return h`
      <smart-facet-button
        .facetInfo=${e}
        .labelPrefix=${sl[e.facets[0].facetType]}
        .selected=${(t=e.selected)!==null&&t!==void 0?t:!1}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `}smartFacetDropdown(e){return h`
      <smart-facet-dropdown
        .facetInfo=${e}
        .labelPrefix=${sl[e[0].facets[0].facetType]}
        .activeFacetRef=${e[0].facets[0]}
        @facetClick=${this.facetDropdownClicked}
        @dropdownClick=${this.onDropdownClick}
      ></smart-facet-dropdown>
    `}get filtersToggleTemplate(){return h`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive?"active":""}
        title="${this.filterToggleActive?"Hide":"Show"} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${N1}
      </button>
    `}get facetsToDisplay(){const e=[];if(this.heuristicRecs.length>0)for(const t of this.heuristicRecs)e.push([t]);if(this.lastAggregations){const t=["mediatype","year","language","creator","subject","collection"];for(const i of t){const o=this.lastAggregations[i];if(!o||o.buckets.length===0||["lending","year_histogram"].includes(i)||typeof o.buckets[0]=="number"||i==="mediatype"&&this.selectedFacets&&Object.values(this.selectedFacets.mediatype).some(d=>d.state!=="none"))continue;const r=i,l=o.buckets.filter(d=>{var c;const p=(c=this.selectedFacets)===null||c===void 0?void 0:c[r][d.key];return!(p&&p.state!=="none")});if(r==="mediatype")e.push([this.toSmartFacet(r,[l[0]])],[this.toSmartFacet(r,[l[1]])]);else if(r==="collection"||r==="subject"){const d=l.slice(0,5);e.push(d.map(c=>this.toSmartFacet(r,[c])))}else e.push([this.toSmartFacet(r,[l[0]])])}}return e}toSmartFacet(e,t){return{facets:t.map(i=>{var o;let r=V1(i.key.toString());if(e==="collection"){const s=(o=this.collectionTitles)===null||o===void 0?void 0:o.get(i.key.toString());s&&(r=s)}return{facetType:e,bucketKey:i.key.toString(),displayText:r}})}}facetClicked(e){e.detail.smartFacet.selected||(this.smartFacets=[[ae(j({},e.detail.smartFacet),{selected:!0})],...this.smartFacets.filter(i=>i[0]!==e.detail.smartFacet)]);for(const i of e.detail.details)this.selectedFacets=Vo(this.selectedFacets,i.facetType,i.bucket,!0);const t=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(t)}facetDropdownClicked(e){if(this.smartFacets.find(i=>Br(i[0],e.detail.smartFacet)))return;this.smartFacets=[[ae(j({},e.detail.smartFacet),{selected:!0})],...this.smartFacets];for(const i of e.detail.details)this.selectedFacets=Vo(this.selectedFacets,i.facetType,i.bucket,!0);const t=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(t)}onDropdownClick(e){var t;He("smart bar: onDropdownClick",e.detail),(t=this.shadowRoot)===null||t===void 0||t.querySelectorAll("smart-facet-dropdown").forEach(i=>{i!==e.detail&&(He("closing",i),i.close())})}filterToggleClicked(){this.dispatchEvent(new CustomEvent("filtersToggled"))}static get styles(){return g`
      #smart-facets-container {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 5px;
        padding: 10px 0;
      }

      #filters-toggle {
        margin: 0;
        border: 0;
        padding: 5px 10px;
        border-radius: 15px;
        background: #194880;
        color: white;
        font-size: 1.6rem;
        font-family: inherit;
        text-decoration: none;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
        cursor: pointer;
      }

      #filters-toggle.active {
        background: #09294d;
        box-shadow: -1px -1px rgba(0, 0, 0, 0.1);
      }

      #filters-toggle > svg {
        width: 15px;
        filter: invert(1);
        vertical-align: text-bottom;
      }
    `}};n([u({type:String})],ot.prototype,"query",void 0);n([u({type:Object})],ot.prototype,"aggregations",void 0);n([u({type:Object})],ot.prototype,"selectedFacets",void 0);n([u({type:Object})],ot.prototype,"collectionTitles",void 0);n([u({type:Boolean})],ot.prototype,"filterToggleActive",void 0);n([L()],ot.prototype,"heuristicRecs",void 0);n([L()],ot.prototype,"smartFacets",void 0);n([L()],ot.prototype,"lastAggregations",void 0);ot=n([F("smart-facet-bar")],ot);let T=class extends B{constructor(){super(),this.baseImageUrl="https://archive.org",this.searchType=he.METADATA,this.selectedSort=x.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.defaultSortField=x.relevance,this.defaultSortDirection=null,this.pageSize=50,this.showSmartFacetBar=!1,this.showHistogramDatePicker=!1,this.suppressPlaceholders=!1,this.suppressResultCount=!1,this.suppressResultTiles=!1,this.suppressURLQuery=!1,this.suppressSortBar=!1,this.suppressDisplayModes=!1,this.facetLoadStrategy="eager",this.facetPaneVisible=!1,this.clearResultsOnEmptyQuery=!1,this.collectionPagePath="/details/",this.searchContext=Ze.default,this.pageContext="search",this.restorationStateHandler=new xc({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.modalManager=void 0,this.isManageView=!1,this.manageViewLabel="Select items to remove",this.enableSortOptionsSlot=!1,this.showSmartResults=!1,this.maxPagesToManage=15,this.dataSource=new kc(this,this.pageSize),this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.mobileView=!1,this.collapsibleFacetsVisible=!1,this.placeholderType=null,this.layoutSizeAnalyticsSent=!1,this.isScrollingToCell=!1,this.isResizeToMobile=!1,this.dataSourceInstallInProgress=!1,this.placeholderCellTemplate=h`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.updateLeftColumnHeight=()=>{var e,t,i,o,r;if(this.mobileView)(t=(e=this.leftColumn)===null||e===void 0?void 0:e.style)===null||t===void 0||t.removeProperty("height");else{const s=(i=this.leftColumn)===null||i===void 0?void 0:i.getBoundingClientRect().top,l=window.innerHeight-(s!=null?s:0),d=s===0?null:`calc(${l}px - var(--leftColumnPaddingTop, 2rem))`;(r=(o=this.leftColumn)===null||o===void 0?void 0:o.style)===null||r===void 0||r.setProperty("height",d)}},this.updateFacetFadeOut=e=>{var t,i;const o=(t=this.shadowRoot)===null||t===void 0?void 0:t.getElementById("facets-bottom-fade");o==null||o.classList.toggle("hidden",(i=e==null?void 0:e[0])===null||i===void 0?void 0:i.isIntersecting)},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.addController(this.dataSource)}tileModelAtCellIndex(e){const t=this.dataSource.getTileModelAt(e);if(!t&&!this.isScrollingToCell&&this.dataSource.queryInitialized){const i=Math.floor(e/this.pageSize)+1;this.dataSource.fetchPage(i)}return t}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{const e=sessionStorage==null?void 0:sessionStorage.getItem("cb-session");if(e)return e;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=kl(Math.random().toString());const t=await this.sessionIdGenPromise;return sessionStorage==null||sessionStorage.setItem("cb-session",t),t}catch{return""}}goToPage(e){return this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}setSearchResultsLoading(e){this.searchResultsLoading=e}setFacetsLoading(e){this.facetsLoading=e}setTotalResultCount(e){this.totalResults=e}clearFilters({facets:e=!0,dateRange:t=!0,letterFilters:i=!0,sort:o=!1}={}){e&&this.hasCheckedFacets&&(this.selectedFacets=lt()),t&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),i&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),o&&(this.sortDirection=null,this.selectedSort=x.default)}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(const e of Object.values(this.selectedFacets))for(const t of Object.values(e))if(t.state!=="none")return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}willUpdate(){this.setPlaceholderType()}render(){return h`
      ${this.showSmartFacetBar?h` <smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleActive=${this.facetPaneVisible}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${()=>{this.facetPaneVisible=!this.facetPaneVisible}}
          ></smart-facet-bar>`:b}

      <div
        id="content-container"
        class=${this.mobileView?"mobile":"desktop"}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){var e;const t=!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim()),i=!!this.withinCollection,o=!!this.withinProfile,r=!this.searchResultsLoading&&(this.dataSource.size===0||!this.searchService);this.placeholderType=null,!this.suppressPlaceholders&&(!t&&!i&&!o?this.placeholderType="empty-query":r&&(this.placeholderType=!t&&i?"empty-collection":"no-results"),this.dataSource.queryErrorMessage&&(this.placeholderType=!t&&i?"collection-error":"query-error"))}get emptyPlaceholderTemplate(){var e;return h`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${(e=this.dataSource.queryErrorMessage)!==null&&e!==void 0?e:""}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
    `}get collectionBrowserTemplate(){return h`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `}get leftColumnTemplate(){return this.mobileView?this.mobileLeftColumnTemplate:this.desktopLeftColumnTemplate}get mobileLeftColumnTemplate(){return h`
      <div
        id="left-column"
        class="column${this.isResizeToMobile?" preload":""}"
      >
        ${this.facetTopViewSlot} ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `}get desktopLeftColumnTemplate(){return h`
      <div
        id="left-column"
        class="column"
        ?hidden=${this.showSmartFacetBar&&!this.facetPaneVisible}
      >
        ${this.facetTopViewSlot}
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">Filters</h2>
          ${this.resultsCountTemplate} ${this.clearFiltersBtnTemplate(!1)}
        </div>
        <div id="facets-container" aria-labelledby="facets-header">
          ${this.facetsTemplate}
          <div id="facets-scroll-sentinel"></div>
        </div>
        <div id="facets-bottom-fade"></div>
      </div>
    `}get facetTopViewSlot(){return h`<div id="facet-top-view">
      <slot name="facet-top-slot"></slot>
    </div>`}get resultsCountTemplate(){var e;if(this.suppressResultCount)return b;const t=this.searchResultsLoading||this.totalResults===void 0,i=(e=this.totalResults)===null||e===void 0?void 0:e.toLocaleString(),o=this.totalResults===1?"Result":"Results";return h`
      <div id="results-total" data-testid="results-total">
        <span id="big-results-count">
          ${t?h`Searching&hellip;`:i}
        </span>
        <span id="big-results-label">
          ${t?b:o}
        </span>
      </div>
    `}get rightColumnTemplate(){return h`
      <div
        id="right-column"
        class="column ${this.showSmartResults?"smart-results-spacing":""}"
      >
        ${this.showSmartResults?h`<slot name="smart-results"></slot>`:b}
        <section id="results">
          ${this.showSmartResults?h`<h2 class="results-section-heading">
                ${k("All results")}
              </h2>`:b}
          <div id="cb-top-view">
            <slot name="cb-top-slot"></slot>
          </div>
          ${this.isManageView?this.manageBarTemplate:this.sortFilterBarTemplate}
          <slot name="cb-results"></slot>
          ${this.displayMode==="list-compact"&&this.totalResults?this.listHeaderTemplate:b}
          ${this.suppressResultTiles?b:this.infiniteScrollerTemplate}
        </section>
      </div>
    `}get infiniteScrollerTemplate(){return h`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType?0:b}
      ariaLandmarkLabel="Search results"
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
      >${this.displayMode==="grid"?h`<slot name="result-last-tile" slot="result-last-tile"></slot>`:b}
    </infinite-scroller>`}get infiniteScrollerClasses(){var e;return ni({[(e=this.displayMode)!==null&&e!==void 0?e:""]:!!this.displayMode,hidden:!!this.placeholderType})}get sortFilterBarTemplate(){var e;return this.suppressSortBar?b:h`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .showRelevance=${this.isRelevanceSortAvailable}
        .showDateFavorited=${(e=this.withinCollection)===null||e===void 0?void 0:e.startsWith("fav-")}
        .displayMode=${this.displayMode}
        .selectedTitleFilter=${this.selectedTitleFilter}
        .selectedCreatorFilter=${this.selectedCreatorFilter}
        .prefixFilterCountMap=${this.dataSource.prefixFilterCountMap}
        .resizeObserver=${this.resizeObserver}
        .enableSortOptionsSlot=${this.enableSortOptionsSlot}
        .suppressDisplayModes=${this.suppressDisplayModes}
        @sortChanged=${this.userChangedSort}
        @displayModeChanged=${this.displayModeChanged}
        @titleLetterChanged=${this.titleLetterSelected}
        @creatorLetterChanged=${this.creatorLetterSelected}
      >
        <slot name="sort-options-left" slot="sort-options-left"></slot>
        <slot name="sort-options" slot="sort-options"></slot>
        <slot name="sort-options-right" slot="sort-options-right"></slot>
      </sort-filter-bar>
    `}get manageBarTemplate(){const e=this.profileElement==="uploads"?"Note: it may take a few minutes for these items to stop appearing in your uploads list.":b;return h`
      <manage-bar
        .label=${this.manageViewLabel}
        .modalManager=${this.modalManager}
        .selectedItems=${this.dataSource.checkedTileModels}
        .manageViewModalMsg=${e}
        showSelectAll
        showUnselectAll
        ?showItemManageButton=${this.pageContext==="search"}
        ?removeAllowed=${this.dataSource.checkedTileModels.length!==0}
        @removeItems=${this.handleRemoveItems}
        @manageItems=${this.handleManageItems}
        @selectAll=${()=>this.dataSource.checkAllTiles()}
        @unselectAll=${()=>this.dataSource.uncheckAllTiles()}
        @cancel=${()=>{this.isManageView=!1,this.dataSource.uncheckAllTiles(),this.searchResultsLoading&&this.dataSource.resetPages()}}
      ></manage-bar>
    `}handleRemoveItems(){this.dispatchEvent(new CustomEvent("itemRemovalRequested",{detail:{items:this.dataSource.checkedTileModels.map(e=>e!=null&&e.identifier?e.identifier:"")}}))}handleManageItems(){this.dispatchEvent(new CustomEvent("itemManagerRequested",{detail:{items:this.dataSource.checkedTileModels.map(e=>e!=null&&e.identifier?e.identifier:"")}}))}showRemoveItemsProcessingModal(){var e;(e=this.manageBar)===null||e===void 0||e.showRemoveItemsProcessingModal()}showRemoveItemsErrorModal(){var e;(e=this.manageBar)===null||e===void 0||e.showRemoveItemsErrorModal()}removeCheckedTiles(){this.dataSource.removeCheckedTiles()}userChangedSort(e){var t;const{selectedSort:i,sortDirection:o}=e.detail;this.selectedSort=i,this.sortDirection=o,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.goToPage(1),this.currentPage=1}sendSortByAnalytics(e){var t;const i=e&&!this.sortDirection;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ie.sortBy,label:`${this.selectedSort}${this.sortDirection||i?`-${this.sortDirection}`:""}`})}selectedSortChanged(){this.dataSource.updatePrefixFiltersForCurrentSort()}get sortParam(){var e;const t=Me[this.selectedSort];if(!(t!=null&&t.handledBySearchService))return null;const i=new URL(window.location.href).searchParams.get("sort"),o=(e=t.searchServiceKey)!==null&&e!==void 0?e:i==null?void 0:i.replace(/^-/,"");return this.sortDirection||(this.sortDirection="asc"),o?{field:o,direction:this.sortDirection}:null}get defaultSortParam(){var e;const t=(e=this.defaultSortDirection)!==null&&e!==void 0?e:"asc",i=Me[this.defaultSortField].searchServiceKey;return i?{field:i,direction:t}:null}displayModeChanged(e){var t;this.displayMode=e.detail.displayMode,this.displayMode&&((t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ie.displayMode,label:this.displayMode}))}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(e){var t;if(!e&&!this.selectedTitleFilter)return;const i=e&&!this.selectedTitleFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ie.filterByTitle,label:i?`clear-${e}`:`${e||"start"}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(e){var t;if(!e&&!this.selectedCreatorFilter)return;const i=e&&!this.selectedCreatorFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ie.filterByCreator,label:i?`clear-${e}`:`${e||"start"}-${this.selectedCreatorFilter}`})}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get mobileFacetsTemplate(){return cr.includes(this.profileElement)?b:h`
      <details id="mobile-filter-collapse" @toggle=${t=>{var i;const o=t.target;this.isResizeToMobile=!1,this.collapsibleFacetsVisible=o.open,(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.searchContext,action:ie.mobileFacetsToggled,label:o.open?"open":"closed"})}}>
        <summary>
          <span class="collapser-icon">${hr}</span>
          <h2>${k("Filters")}</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}get facetsTemplate(){if(cr.includes(this.profileElement))return b;if(this.facetLoadStrategy==="off")return h`
        <p class="facets-message">
          ${k("Facets are temporarily unavailable.")}
        </p>
      `;const e=h`
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .collectionPagePath=${this.collectionPagePath}
        .parentCollections=${this.dataSource.parentCollections}
        .pageSpecifierParams=${this.dataSource.pageSpecifierParams}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.dataSource.aggregations}
        .fullYearsHistogramAggregation=${this.dataSource.yearHistogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .collectionTitles=${this.dataSource.collectionTitles}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .allowExpandingDatePicker=${!this.mobileView}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .filterMap=${this.dataSource.filterMap}
        .isManageView=${this.isManageView}
        .modalManager=${this.modalManager}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?fullYearAggregationLoading=${this.facetsLoading}
        @facetClick=${this.facetClickHandler}
        .analyticsHandler=${this.analyticsHandler}
      >
      </collection-facets>
    `;return(this.facetLoadStrategy==="opt-in"||this.facetLoadStrategy==="opt-in-or-login"&&!this.loggedIn)&&!this.mobileView?h`
        <details
          class="desktop-facets-dropdown"
          @toggle=${i=>{const o=i.target;this.collapsibleFacetsVisible=o.open}}
        >
          <summary>
            <span class="collapser-icon">${hr}</span>
            <h2>${k("Filters")}</h2>
          </summary>
          ${e}
        </button>
      `:e}clearFiltersBtnTemplate(e){if(!this.hasActiveFilters)return b;const t=ni({"clear-filters-btn":!0,mobile:e}),i=e?"Clear all":"Clear all filters";return h`
      <div class="clear-filters-btn-row">
        ${e?h`<span class="clear-filters-btn-separator">&nbsp;</span>`:b}
        <button class=${t} @click=${this.clearFilters}>
          ${i}
        </button>
      </div>
    `}get listHeaderTemplate(){return h`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .defaultSortParam=${this.defaultSortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
          .loggedIn=${this.loggedIn}
        >
        </tile-dispatcher>
      </div>
    `}histogramDateRangeUpdated(e){var t;const{minDate:i,maxDate:o}=e.detail;[this.minSelectedDate,this.maxSelectedDate]=[i,o],(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ie.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}emitManageModeChangedEvent(){this.dispatchEvent(new CustomEvent("manageModeChanged",{detail:this.isManageView}))}async installDataSourceAndQueryState(e,t){var i,o;He("Installing data source & query state in CB:",e,t),this.dataSource&&this.removeController(this.dataSource),this.dataSource=e,this.addController(this.dataSource),this.baseQuery=t.baseQuery,this.profileElement=t.profileElement,this.searchType=t.searchType,this.selectedFacets=(i=t.selectedFacets)!==null&&i!==void 0?i:lt(),this.minSelectedDate=t.minSelectedDate,this.maxSelectedDate=t.maxSelectedDate,this.selectedSort=(o=t.selectedSort)!==null&&o!==void 0?o:x.default,this.sortDirection=t.sortDirection,this.selectedTitleFilter=t.selectedTitleFilter,this.selectedCreatorFilter=t.selectedCreatorFilter,this.dataSourceInstallInProgress=!0,this.requestUpdate(),await this.updateComplete,this.dataSourceInstallInProgress=!1,this.searchResultsLoading||(this.setTotalResultCount(this.dataSource.totalResults),this.setTileCount(this.dataSource.size)),this.refreshVisibleResults()}firstUpdated(){this.restoreState(),this.setInitialSize()}setInitialSize(){this.contentWidth=this.contentContainer.getBoundingClientRect().width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.sendLayoutSizeAnalytics()}sendLayoutSizeAnalytics(){this.analyticsHandler&&(this.layoutSizeAnalyticsSent=!0,this.analyticsHandler.sendEvent({category:this.searchContext,action:this.mobileView?ie.loadMobileView:ie.loadDesktopView}))}updated(e){var t,i,o;if(e.has("placeholderType")&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),e.has("analyticsHandler")&&!this.layoutSizeAnalyticsSent&&this.sendLayoutSizeAnalytics(),(e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl")||e.has("loggedIn"))&&((t=this.infiniteScroller)===null||t===void 0||t.reload()),(e.has("baseQuery")||e.has("searchType")||e.has("withinCollection"))&&!this.historyPopOccurred&&this.initialQueryChangeHappened){const r=e.has("withinCollection")&&!e.has("selectedSort")&&!e.has("sortDirection");this.clearFilters({sort:r,facets:!e.has("selectedFacets"),dateRange:!(e.has("minSelectedDate")||e.has("maxSelectedDate")),letterFilters:!(e.has("selectedTitleFilter")||e.has("selectedCreatorFilter"))})}if(e.has("profileElement")&&this.applyDefaultProfileSort(),e.has("baseQuery")&&this.emitBaseQueryChanged(),e.has("searchType")&&this.emitSearchTypeChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection")||e.has("withinProfile")||e.has("profileElement"))&&this.dataSource.refreshLetterCounts(),e.has("selectedSort")||e.has("sortDirection")){const r=e.get("sortDirection");this.sendSortByAnalytics(r),this.selectedSortChanged()}if(e.has("selectedTitleFilter")&&this.sendFilterByTitleAnalytics(e.get("selectedTitleFilter")),e.has("selectedCreatorFilter")&&this.sendFilterByCreatorAnalytics(e.get("selectedCreatorFilter")),this.updateFacetReadiness(),(e.has("baseQuery")||e.has("searchType")||e.has("selectedTitleFilter")||e.has("selectedCreatorFilter")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("selectedSort")||e.has("sortDirection")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection")||e.has("withinProfile")||e.has("profileElement"))&&this.handleQueryChange(),e.has("searchResultsLoading")&&this.emitSearchResultsLoadingChanged(),e.has("facetsLoading")&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==he.FULLTEXT),e.has("pagesToRender")&&!this.dataSource.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),e.has("isManageView")&&(this.isManageView?(this.displayMode="grid",this.fetchManagableSearchResults()):this.pageContext==="search"&&((i=this.infiniteScroller)===null||i===void 0||i.reload()),(o=this.infiniteScroller)===null||o===void 0||o.refreshAllVisibleCells(),this.emitManageModeChangedEvent()),e.has("resizeObserver")){const r=e.get("resizeObserver");r&&this.disconnectResizeObserver(r),this.setupResizeObserver()}this.ensureAvailableTilesDisplayed()}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupStateRestorationObserver(),this.setupResizeObserver()}disconnectedCallback(){var e,t;this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler),(e=this.leftColIntersectionObserver)===null||e===void 0||e.disconnect(),(t=this.facetsIntersectionObserver)===null||t===void 0||t.disconnect(),window.removeEventListener("resize",this.updateLeftColumnHeight)}handleResize(e){const t=this.mobileView;e.target===this.contentContainer&&(this.contentWidth=e.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}ensureAvailableTilesDisplayed(){this.infiniteScroller&&this.infiniteScroller.itemCount<this.dataSource.size&&this.setTileCount(this.dataSource.endOfDataReached?this.dataSource.size:this.estimatedTileCount)}updateFacetReadiness(){const e=this.collapsibleFacetsVisible||this.facetLoadStrategy==="opt-in-or-login"&&this.loggedIn,t=["opt-in","opt-in-or-login"].includes(this.facetLoadStrategy),i=!this.mobileView&&(!t||e),o=this.mobileView&&e;this.dataSource.handleFacetReadinessChange(i||o)}setupLeftColumnScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#left-column-scroll-sentinel");t&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(201).keys()].map(i=>i/200)}),this.leftColIntersectionObserver.observe(t)),window.addEventListener("resize",this.updateLeftColumnHeight)}setupFacetsScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#facets-scroll-sentinel");t&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(t))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent("searchTypeChanged",{detail:this.searchType}))}emitQueryStateChanged(){this.dispatchEvent(new CustomEvent("queryStateChanged",{detail:{baseQuery:this.baseQuery,withinCollection:this.withinCollection,withinProfile:this.withinProfile,profileElement:this.profileElement,searchType:this.searchType,selectedFacets:this.selectedFacets,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedSort:this.selectedSort,sortDirection:this.sortDirection,selectedTitleFilter:this.selectedTitleFilter,selectedCreatorFilter:this.selectedCreatorFilter}}))}emitEmptyResults(){this.dispatchEvent(new Event("emptyResults"))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||!this.contentContainer||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(t.length===0)return;const i=Math.min(this.pageSize,t.length)-1,o=t[i],r=Math.floor(o/this.pageSize)+1;this.currentPage!==r&&(this.currentPage=r);const s=new CustomEvent("visiblePageChanged",{detail:{pageNumber:r}});this.dispatchEvent(s)}get initialSearchComplete(){return this.dataSource.initialSearchComplete}async handleQueryChange(){var e;!this.searchService||this.dataSource.pageFetchQueryKey===this.previousQueryKey||this.baseQuery&&!this.dataSource.canPerformSearch||(this.previousQueryKey=this.dataSource.pageFetchQueryKey,this.totalResults=void 0,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&((e=this.baseQuery)===null||e===void 0?void 0:e.trim())&&(this.defaultSortField=x.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1)}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this)),window.addEventListener("popstate",this.boundNavigationHandler)}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,o,r;const s=this.restorationStateHandler.getRestorationState();this.displayMode=s.displayMode,s.searchType!=null&&(this.searchType=s.searchType),this.selectedSort=(e=s.selectedSort)!==null&&e!==void 0?e:x.default,this.sortDirection=(t=s.sortDirection)!==null&&t!==void 0?t:null,this.selectedTitleFilter=(i=s.selectedTitleFilter)!==null&&i!==void 0?i:null,this.selectedCreatorFilter=(o=s.selectedCreatorFilter)!==null&&o!==void 0?o:null,this.selectedFacets=s.selectedFacets,this.suppressURLQuery||(this.baseQuery=s.baseQuery),this.currentPage=(r=s.currentPage)!==null&&r!==void 0?r:1,this.minSelectedDate=s.minSelectedDate,this.maxSelectedDate=s.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,o;const r={displayMode:this.displayMode,searchType:this.searchType,selectedSort:this.selectedSort,sortDirection:(e=this.sortDirection)!==null&&e!==void 0?e:void 0,selectedFacets:(t=this.selectedFacets)!==null&&t!==void 0?t:lt(),baseQuery:this.suppressURLQuery?void 0:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:(i=this.selectedTitleFilter)!==null&&i!==void 0?i:void 0,selectedCreatorFilter:(o=this.selectedCreatorFilter)!==null&&o!==void 0?o:void 0};this.restorationStateHandler.persistState(r,this.dataSourceInstallInProgress)}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent("searchResultsLoadingChanged",{detail:{loading:this.searchResultsLoading}}))}facetsChanged(e){this.selectedFacets=e.detail}facetClickHandler({detail:{facetType:e,bucket:t,negative:i}}){var o;let r;i?r=t.state!=="none"?ie.facetNegativeSelected:ie.facetNegativeDeselected:r=t.state!=="none"?ie.facetSelected:ie.facetDeselected,(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.searchContext,action:r,label:e})}scrollToPage(e){return new Promise(t=>{const i=this.pageSize*(e-1);setTimeout(()=>{var o;this.isScrollingToCell=!0,(o=this.infiniteScroller)===null||o===void 0||o.scrollToCell(i,!0),setTimeout(()=>{var r;this.isScrollingToCell=!1,(r=this.infiniteScroller)===null||r===void 0||r.refreshAllVisibleCells(),t()},500)},0)})}get isRelevanceSortAvailable(){var e;return!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim())}setTileCount(e){this.infiniteScroller&&(this.infiniteScroller.itemCount=e)}applyDefaultCollectionSort(e){var t,i,o;if(this.baseQuery){this.defaultSortField=x.relevance,this.defaultSortDirection=null;return}const r=!((i=(t=e==null?void 0:e.public_metadata)===null||t===void 0?void 0:t.identifier)===null||i===void 0)&&i.startsWith("fav-")?"-favoritedate":"-week",s=(o=e==null?void 0:e.public_metadata)===null||o===void 0?void 0:o["sort-by"],l=s!=null?s:r;let[d,c]=l.split(":");d.startsWith("-")?(d=d.slice(1),c="desc"):["asc","desc"].includes(c)||(c="asc");const v=_l(d).field;v&&v!==x.default&&(this.defaultSortField=v,this.defaultSortDirection=c)}applyDefaultProfileSort(){if(this.profileElement){const e=fc[this.profileElement];this.defaultSortField=e!=null?e:x.weeklyview}else this.defaultSortField=x.weeklyview;this.defaultSortDirection="desc"}get currentVisiblePageNumbers(){var e,t;const i=(t=(e=this.infiniteScroller)===null||e===void 0?void 0:e.getVisibleCellIndices())!==null&&t!==void 0?t:[],o=new Set;return i.forEach(r=>{const s=Math.floor(r/this.pageSize)+1;o.add(s)}),Array.from(o)}refreshVisibleResults(){var e;(e=this.infiniteScroller)===null||e===void 0||e.refreshAllVisibleCells()}resultSelected(e){var t,i,o;if(this.isManageView){const r=this.dataSource.indexOf(e.detail);r>=0&&((t=this.infiniteScroller)===null||t===void 0||t.refreshCell(r)),this.requestUpdate()}(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.searchContext,action:ie.resultSelected,label:e.detail.mediatype}),(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.searchContext,action:ie.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(!!t)return h`
      <tile-dispatcher
        .collectionPagePath=${this.collectionPagePath}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${t}
        .tileDisplayMode=${this.displayMode}
        .resizeObserver=${this.resizeObserver}
        .collectionTitles=${this.dataSource.collectionTitles}
        .sortParam=${this.sortParam}
        .defaultSortParam=${this.defaultSortParam}
        .creatorFilter=${this.selectedCreatorFilter}
        .mobileBreakpoint=${this.mobileBreakpoint}
        .loggedIn=${this.loggedIn}
        .isManageView=${this.isManageView}
        ?enableHoverPane=${!0}
        @resultSelected=${i=>this.resultSelected(i)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){!this.dataSource.endOfDataReached&&this.dataSource.queryInitialized&&(this.pagesToRender+=1,this.dataSource.fetchPage(this.pagesToRender))}fetchManagableSearchResults(){var e;this.pageContext==="search"&&this.dataSource.totalResults>100&&!this.searchResultsLoading&&(this.dataSource.resetPages(),this.dataSource.fetchPage(1,this.maxPagesToManage),(e=this.infiniteScroller)===null||e===void 0||e.reload())}static get styles(){return[pt,g`
        :host {
          display: block;
          --leftColumnWidth: 18rem;
          --leftColumnPaddingTop: 2rem;
          --leftColumnPaddingRight: 2.5rem;
        }

        #facet-top-view {
          display: flex;
        }

        /**
        * When page width resizes from desktop to mobile, use this class to
        * disable expand/collapse transition when loading.
        */
        .preload * {
          transition: none !important;
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -ms-transition: none !important;
          -o-transition: none !important;
        }

        #content-container {
          display: flex;
        }

        empty-placeholder {
          margin-top: var(--placeholderMarginTop, 0);
        }

        .collapser-icon {
          display: inline-block;
        }

        .collapser-icon svg {
          display: inline-block;
          width: 12px;
          height: 12px;
          transition: transform 0.2s ease-out;
        }

        #mobile-filter-collapse {
          width: 100%;
        }

        #mobile-filter-collapse > summary {
          cursor: pointer;
          list-style: none;
        }

        #mobile-filter-collapse[open] > summary {
          margin-bottom: 10px;
        }

        #mobile-filter-collapse h2 {
          display: inline-block;
          margin: 0;
          font-size: 2rem;
        }

        #mobile-filter-collapse[open] svg {
          transform: rotate(90deg);
        }

        #content-container.mobile {
          display: block;
        }

        #right-column {
          flex: 1;
          position: relative;
          min-height: 90vh;
          border-left: 1px solid rgb(232, 232, 232);
          border-right: 1px solid rgb(232, 232, 232);
          margin-top: var(--rightColumnMarginTop, 0);
          padding-top: 2rem;
          background: #fff;
        }

        #right-column.smart-results-spacing {
          padding-top: 0.5rem;
          border-right: none;
          background: transparent;
          min-width: 0;
        }

        #results {
          background: #fff;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        #right-column.smart-results-spacing #results {
          border-radius: 10px 10px 0px 0px;
          padding-top: 0.5rem;
          margin-top: 1rem;
        }

        .mobile #right-column {
          border-left: none;
        }

        .mobile #results {
          padding: 5px 5px 0;
        }

        #left-column {
          width: var(--leftColumnWidth, 18rem);
          /* Prevents Safari from shrinking col at first draw */
          min-width: var(--leftColumnWidth, 18rem);
          padding-top: var(--leftColumnPaddingTop, 2rem);
          /* Reduced padding by 0.2rem to add the invisible border in the rule below */
          padding-right: calc(var(--leftColumnPaddingRight, 2.5rem) - 0.2rem);
          border-right: 0.2rem solid transparent; /* Pads to the right of the scrollbar a bit */
          z-index: 1;
        }

        .desktop #left-column {
          top: 0;
          position: sticky;
          height: calc(100vh - 2rem);
          max-height: calc(100vh - 2rem);
          overflow-x: hidden;
          overflow-y: scroll;

          /*
          * Firefox doesn't support any of the -webkit-scrollbar stuff below, but
          * does at least give us a tiny bit of control over width & color.
          */
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .desktop #left-column:hover {
          scrollbar-color: auto;
        }
        .desktop #left-column::-webkit-scrollbar {
          appearance: none;
          width: 6px;
        }
        .desktop #left-column::-webkit-scrollbar-button {
          height: 3px;
          background: transparent;
        }
        .desktop #left-column::-webkit-scrollbar-corner {
          background: transparent;
        }
        .desktop #left-column::-webkit-scrollbar-thumb {
          border-radius: 4px;
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb:active {
          background: rgba(0, 0, 0, 0.3);
        }

        #facets-bottom-fade {
          background: linear-gradient(
            to bottom,
            #f5f5f700 0%,
            #f5f5f7c0 50%,
            #f5f5f7 80%,
            #f5f5f7 100%
          );
          position: fixed;
          bottom: 0;
          height: 50px;
          /* Wide enough to cover the content, but leave the scrollbar uncovered */
          width: calc(
            var(--leftColumnWidth) + var(--leftColumnPaddingRight) - 10px
          );
          z-index: 2;
          pointer-events: none;
          transition: height 0.1s ease;
        }
        #facets-bottom-fade.hidden {
          height: 0;
        }

        .facets-message {
          font-size: 1.4rem;
        }

        .desktop-facets-dropdown > summary {
          cursor: pointer;
          list-style: none;
        }

        .desktop-facets-dropdown h2 {
          display: inline-block;
          margin: 0;
          font-size: 1.6rem;
        }

        .desktop-facets-dropdown[open] > summary {
          margin-bottom: 10px;
        }

        .desktop-facets-dropdown[open] svg {
          transform: rotate(90deg);
        }

        .desktop #left-column-scroll-sentinel {
          width: 1px;
          height: 100vh;
          background: transparent;
        }

        .desktop #facets-scroll-sentinel {
          width: 1px;
          height: 1px;
          background: transparent;
        }

        #facets-header-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          clear: both;
        }

        .desktop #facets-header-container {
          flex-wrap: wrap;
        }

        .mobile #left-column {
          width: 100%;
          min-width: 0;
          padding: 0;
          border: 0;
        }

        .clear-filters-btn-row {
          display: inline-block;
        }

        .desktop .clear-filters-btn-row {
          width: 100%;
        }

        .clear-filters-btn {
          display: inline-block;
          appearance: none;
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          color: var(--ia-theme-link-color);
          font-size: 1.4rem;
          font-family: inherit;
          cursor: pointer;
        }

        .clear-filters-btn:hover {
          text-decoration: underline;
        }

        .clear-filters-btn-separator {
          display: inline-block;
          margin-left: 5px;
          border-left: 1px solid #2c2c2c;
          font-size: 1.4rem;
          line-height: 1.3rem;
        }

        #facets-container {
          position: relative;
          max-height: 0;
          transition: max-height 0.2s ease-in-out;
          z-index: 1;
          margin-top: 5rem;
          padding-bottom: 2rem;
        }

        .desktop #facets-container {
          width: 18rem;
        }

        .mobile #facets-container {
          overflow: hidden;
          padding-bottom: 0;
          padding-left: 10px;
          padding-right: 10px;
        }

        #facets-container.expanded {
          max-height: 2000px;
        }

        .results-section-heading {
          margin: 0.5rem 0.3rem;
          font-size: 2rem;
          line-height: 25px;
        }

        #results-total {
          display: flex;
          align-items: baseline;
        }

        .mobile #results-total {
          float: right;
          margin-bottom: 0;
          margin-right: 5px;
        }

        #big-results-count {
          font-size: 2.4rem;
          font-weight: 500;
          margin-right: 5px;
        }

        .mobile #big-results-count {
          font-size: 2rem;
        }

        #big-results-label {
          font-size: 1.4rem;
          font-weight: 200;
        }

        #list-header {
          max-height: 4.2rem;
        }

        .loading-cover {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          z-index: 1;
          padding-top: 50px;
        }

        circular-activity-indicator {
          width: 30px;
          height: 30px;
        }

        sort-filter-bar {
          display: block;
          margin-bottom: 4rem;
        }

        infinite-scroller {
          display: block;
          --infiniteScrollerRowGap: var(--collectionBrowserRowGap, 1.7rem);
          --infiniteScrollerColGap: var(--collectionBrowserColGap, 1.7rem);
        }

        infinite-scroller.list-compact {
          --infiniteScrollerCellMinWidth: var(
            --collectionBrowserCellMinWidth,
            100%
          );
          --infiniteScrollerCellMinHeight: 45px; /* override infinite scroller component */
          --infiniteScrollerCellMaxHeight: 56px;
          --infiniteScrollerRowGap: 10px;
        }

        infinite-scroller.list-detail {
          --infiniteScrollerCellMinWidth: var(
            --collectionBrowserCellMinWidth,
            100%
          );
          --infiniteScrollerCellMinHeight: var(
            --collectionBrowserCellMinHeight,
            5rem
          );
          /*
            30px in spec, compensating for a -4px margin
            to align title with top of item image
            src/tiles/list/tile-list.ts
          */
          --infiniteScrollerRowGap: 34px;
        }

        .mobile infinite-scroller.list-detail {
          --infiniteScrollerRowGap: 24px;
        }

        infinite-scroller.grid {
          --infiniteScrollerCellMinWidth: var(
            --collectionBrowserCellMinWidth,
            17rem
          );
          --infiniteScrollerCellMaxWidth: var(
            --collectionBrowserCellMaxWidth,
            1fr
          );
        }

        /* Allow tiles to shrink a bit further at smaller viewport widths */
        @media screen and (max-width: 880px) {
          infinite-scroller.grid {
            --infiniteScrollerCellMinWidth: var(
              --collectionBrowserCellMinWidth,
              15rem
            );
          }
        }
        /* At very small widths, maintain a 2-tile layout as far as it can reasonably go */
        @media screen and (max-width: 360px) {
          infinite-scroller.grid {
            --infiniteScrollerCellMinWidth: var(
              --collectionBrowserCellMinWidth,
              12rem
            );
          }
        }

        infinite-scroller.hidden {
          display: none;
        }
      `]}};n([u({type:String})],T.prototype,"baseNavigationUrl",void 0);n([u({type:String})],T.prototype,"baseImageUrl",void 0);n([u({type:Object})],T.prototype,"searchService",void 0);n([u({type:Number})],T.prototype,"searchType",void 0);n([u({type:String})],T.prototype,"withinCollection",void 0);n([u({type:String})],T.prototype,"withinProfile",void 0);n([u({type:String})],T.prototype,"profileElement",void 0);n([u({type:String})],T.prototype,"baseQuery",void 0);n([u({type:String})],T.prototype,"displayMode",void 0);n([u({type:String})],T.prototype,"selectedSort",void 0);n([u({type:String})],T.prototype,"selectedTitleFilter",void 0);n([u({type:String})],T.prototype,"selectedCreatorFilter",void 0);n([u({type:String})],T.prototype,"sortDirection",void 0);n([u({type:String})],T.prototype,"defaultSortField",void 0);n([u({type:String})],T.prototype,"defaultSortDirection",void 0);n([u({type:Number})],T.prototype,"pageSize",void 0);n([u({type:Number})],T.prototype,"currentPage",void 0);n([u({type:String})],T.prototype,"minSelectedDate",void 0);n([u({type:String})],T.prototype,"maxSelectedDate",void 0);n([u({type:Object})],T.prototype,"selectedFacets",void 0);n([u({type:Boolean})],T.prototype,"showSmartFacetBar",void 0);n([u({type:Boolean})],T.prototype,"showHistogramDatePicker",void 0);n([u({type:Boolean})],T.prototype,"suppressPlaceholders",void 0);n([u({type:Boolean})],T.prototype,"suppressResultCount",void 0);n([u({type:Boolean})],T.prototype,"suppressResultTiles",void 0);n([u({type:Boolean})],T.prototype,"suppressURLQuery",void 0);n([u({type:Boolean})],T.prototype,"suppressSortBar",void 0);n([u({type:Boolean})],T.prototype,"suppressDisplayModes",void 0);n([u({type:String})],T.prototype,"facetLoadStrategy",void 0);n([u({type:Boolean})],T.prototype,"facetPaneVisible",void 0);n([u({type:Boolean})],T.prototype,"clearResultsOnEmptyQuery",void 0);n([u({type:String})],T.prototype,"collectionPagePath",void 0);n([u({type:String,reflect:!0})],T.prototype,"searchContext",void 0);n([u({type:String})],T.prototype,"pageContext",void 0);n([u({type:Object})],T.prototype,"restorationStateHandler",void 0);n([u({type:Number})],T.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],T.prototype,"loggedIn",void 0);n([u({type:Object})],T.prototype,"resizeObserver",void 0);n([u({type:Object})],T.prototype,"modalManager",void 0);n([u({type:Object})],T.prototype,"featureFeedbackService",void 0);n([u({type:Object})],T.prototype,"recaptchaManager",void 0);n([u({type:Boolean})],T.prototype,"isManageView",void 0);n([u({type:String})],T.prototype,"manageViewLabel",void 0);n([u({type:Boolean})],T.prototype,"enableSortOptionsSlot",void 0);n([u({type:Boolean,reflect:!0})],T.prototype,"showSmartResults",void 0);n([u({type:Number})],T.prototype,"maxPagesToManage",void 0);n([u({type:Object})],T.prototype,"dataSource",void 0);n([L()],T.prototype,"pagesToRender",void 0);n([L()],T.prototype,"searchResultsLoading",void 0);n([L()],T.prototype,"facetsLoading",void 0);n([L()],T.prototype,"totalResults",void 0);n([L()],T.prototype,"mobileView",void 0);n([L()],T.prototype,"collapsibleFacetsVisible",void 0);n([L()],T.prototype,"contentWidth",void 0);n([L()],T.prototype,"placeholderType",void 0);n([Y("#content-container")],T.prototype,"contentContainer",void 0);n([Y("#left-column")],T.prototype,"leftColumn",void 0);n([Y("collection-facets")],T.prototype,"collectionFacets",void 0);n([Y("manage-bar")],T.prototype,"manageBar",void 0);n([u({type:Object,attribute:!1})],T.prototype,"analyticsHandler",void 0);n([Y("infinite-scroller")],T.prototype,"infiniteScroller",void 0);T=n([F("collection-browser")],T);let le=class extends B{constructor(){super(...arguments),this.searchService=this.initSearchServiceFromUrlParams(),this.resizeObserver=new Zd,this.toggleSlots=!1,this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.suppressFacets=!1,this.lazyLoadFacets=!1,this.loggedIn=!1,this.searchType=he.METADATA,this.analyticsManager=new Ed,this.analyticsHandler={sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)}}sendAnalytics(e){var t;console.log("Analytics Received ----",e),this.latestAction=e,(t=this.analyticsManager)===null||t===void 0||t.sendEvent(e)}initSearchServiceFromUrlParams(){var e,t,i;const o=new URL(window.location.href).searchParams;return new Ye({includeCredentials:!1,baseUrl:(e=o.get("search_base_url"))!==null&&e!==void 0?e:void 0,servicePath:(t=o.get("search_service_path"))!==null&&t!==void 0?t:void 0,debuggingEnabled:(i=!!o.get("debugging"))!==null&&i!==void 0?i:void 0})}searchPressed(e){e.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(e){e.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){var e;const t=(e=this.currentPage)!==null&&e!==void 0?e:1;t>1&&this.collectionBrowser.goToPage(t)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get("hide-dev-tools")?"hidden":""}render(){var e,t;return h`
      <div class="dev-tool-container">
        <div id="dev-tools" class=${this.getClass}>
          <div id="search-and-page-inputs">
            <form @submit=${this.searchPressed}>
              <label for="base-query-field"> Query: </label>
              <input
                type="text"
                id="base-query-field"
                .value=${(e=this.searchQuery)!==null&&e!==void 0?e:""}
              />
              <input type="submit" value="Search" />
            </form>
            <form @submit=${this.changePagePressed}>
              <label for="page-number-input"> Page: </label>
              <input type="number" value="1" id="page-number-input" />
              <input type="submit" value="Go" />
            </form>
          </div>
          <div>
            <form @submit=${this.collectionChanged}>
              <label for="base-collection-field"> Within collection: </label>
              <input
                type="text"
                id="base-collection-field"
                .value=${(t=this.withinCollection)!==null&&t!==void 0?t:""}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          <div id="search-types">
            Search type:
            <span class="search-type">
              <input
                type="radio"
                id="metadata-search"
                name="search-type"
                value="metadata"
                .checked=${this.searchType===he.METADATA}
                @click=${this.searchTypeSelected}
              />
              <label for="metadata-search">Metadata</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="fulltext-search"
                name="search-type"
                value="fulltext"
                .checked=${this.searchType===he.FULLTEXT}
                @click=${this.searchTypeSelected}
              />
              <label for="fulltext-search">Full text</label>
            </span>
          </div>

          <div id="toggle-controls">
            <button
              @click=${()=>{var i,o;const r=(i=this.shadowRoot)===null||i===void 0?void 0:i.getElementById("cell-size-control");r==null||r.classList.toggle("hidden");const s=(o=this.shadowRoot)===null||o===void 0?void 0:o.getElementById("cell-gap-control");s==null||s.classList.toggle("hidden")}}
            >
              Toggle Cell Controls
            </button>
            <button
              @click=${()=>{var i;const o=(i=this.shadowRoot)===null||i===void 0?void 0:i.getElementById("latest-event-details");o==null||o.classList.toggle("hidden")}}
            >
              Last Event Captured
            </button>
          </div>

          <div id="last-event">
            <pre id="latest-event-details" class="hidden">
              ${JSON.stringify(this.latestAction,null,2)}
            </pre
            >
          </div>

          <fieldset class="cell-controls">
            <legend>Cell Controls</legend>
            <div>
              <label for="cell-width-slider">Cell width:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="18"
                step="0.1"
                id="cell-width-slider"
                @input=${this.widthChanged}
              />
              <span>${this.cellWidth}rem</span>
            </div>
            <div>
              <label for="cell-height-slider">Cell height:</label>
              <input
                type="range"
                min="10"
                max="100"
                value="29"
                step="0.1"
                id="cell-height-slider"
                @input=${this.heightChanged}
              />
              <span>${this.cellHeight}rem</span>
            </div>
            <div>
              <label for="cell-row-gap-slider">Row gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-row-gap-slider"
                @input=${this.rowGapChanged}
              />
              <span>${this.rowGap}rem</span>
            </div>
            <div>
              <label for="cell-col-gap-slider">Col gap:</label>
              <input
                type="range"
                min="0"
                max="5"
                value="1.7"
                step="0.1"
                id="cell-col-gap-slider"
                @input=${this.colGapChanged}
              />
              <span>${this.colGap}rem</span>
            </div>
          </fieldset>

          <fieldset class="other-controls">
            <legend>Other Controls</legend>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="simulate-login"
                @click=${this.loginChanged}
              />
              <label for="simulate-login">Simulate login</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-date-picker"
                checked
                @click=${this.datePickerChanged}
              />
              <label for="enable-date-picker">Enable date picker</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-facets"
                checked
                @click=${this.facetsChanged}
              />
              <label for="enable-facets">Enable facets</label>
            </div>
            <div class="checkbox-control indent">
              <input
                type="checkbox"
                id="lazy-load-facets"
                ?disabled=${this.suppressFacets}
                @click=${this.lazyLoadFacetsChanged}
              />
              <label for="lazy-load-facets">Lazy load facets</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-management"
                @click=${this.manageModeCheckboxChanged}
              />
              <label for="enable-management">Enable manage mode</label>
            </div>
            <div class="checkbox-control indent">
              <input
                type="checkbox"
                id="enable-search-management"
                @click=${this.SearchManageModeCheckboxChanged}
              />
              <label for="enable-search-management">Search</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-smart-facet-bar"
                @click=${this.smartFacetBarCheckboxChanged}
              />
              <label for="enable-smart-facet-bar">Enable smart facet bar</label>
            </div>
          </fieldset>

          <fieldset class="cb-visual-appearance">
            <legend>CB Visual Appearance</legend>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-dummy-snippets"
                @click=${this.snippetsChanged}
              />
              <label for="show-dummy-snippets">Show dummy snippets</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-dummy-reviews"
                @click=${this.reviewsChanged}
              />
              <label for="show-dummy-reviews">Show dummy reviews</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-facet-group-outline-check"
                @click=${this.toggleFacetGroupOutline}
              />
              <label for="show-facet-group-outline-check">
                Show facet group outlines
              </label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
              <label for="show-outline-check">Show cell outlines</label>
            </div>
          </fieldset>

          <fieldset class="user-profile-controls">
            <legend>User Profile Controls</legend>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-facet-top-slot"
                @click=${this.facetTopSlotCheckboxChanged}
              />
              <label for="enable-facet-top-slot">Show facet top slot</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-cb-top-slot"
                @click=${this.cbTopSlotCheckboxChanged}
              />
              <label for="enable-cb-top-slot">Show CB top slot</label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-sortbar-left-slot"
                @click=${this.sortBarLeftSlotCheckboxChanged}
              />
              <label for="enable-sortbar-left-slot"
                >Show sortbar left slot</label
              >
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-sortbar-right-slot"
                @click=${this.sortBarRightSlotCheckboxChanged}
              />
              <label for="enable-sortbar-right-slot"
                >Show sortbar right slot</label
              >
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-result-last-tile-slot"
                @click=${this.resultLastTileSlotCheckboxChanged}
              />
              <label for="enable-result-last-tile-slot">
                Show result last tile slot
              </label>
            </div>
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="enable-replaced-sort-options"
                @click=${this.replaceSortOptionsChanged}
              />
              <label for="enable-replaced-sort-options">
                Show replaced sort options
              </label>
            </div>
          </fieldset>

          <fieldset class="user-profile-controls">
            <legend>Set Placeholder Types</legend>
            <div class="checkbox-control">
              <input
                id="enable-loading-placeholder"
                type="radio"
                @click=${()=>this.setPlaceholderType("loading-placeholder")}
                name="placeholder-radio"
              />
              <label for="enable-loading-placeholder"
                >Loading Placeholder</label
              >
            </div>
            <div class="checkbox-control">
              <input
                id="enable-empty-placeholder"
                type="radio"
                @click=${()=>this.setPlaceholderType("error-placeholder")}
                value="empty-placeholder"
                name="placeholder-radio"
              />
              <label for="enable-empty-placeholder">Empty Placeholder</label>
            </div>
          </fieldset>
        </div>
        <button id="toggle-dev-tools-btn" @click=${this.toggleDevTools}>
          Toggle Search Controls
        </button>
      </div>
      <div id="collection-browser-container">
        <collection-browser
          .baseNavigationUrl=${"https://archive.org"}
          .baseImageUrl=${"https://archive.org"}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .showHistogramDatePicker=${!0}
          .suppressFacets=${this.suppressFacets}
          .lazyLoadFacets=${this.lazyLoadFacets}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          .pageContext=${"search"}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
          @manageModeChanged=${this.manageModeChanged}
          @itemRemovalRequested=${this.handleItemRemovalRequest}
          @itemManagerRequested=${this.handleItemManagerRequest}
        >
          ${this.toggleSlots?h`<div slot="sortbar-left-slot">Sort Slot</div>`:b}
          ${this.toggleSlots?h`<div slot="facet-top-slot">Facet Slot</div>`:b}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}async setPlaceholderType(e){switch(e){case"loading-placeholder":this.collectionBrowser.baseQuery="",this.collectionBrowser.suppressPlaceholders=!0,this.collectionBrowser.clearResultsOnEmptyQuery=!0,this.requestUpdate(),await this.collectionBrowser.updateComplete;break}}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}searchTypeChanged(e){this.searchType=e.detail}searchTypeSelected(e){const t=e.target;this.searchType=t.value==="fulltext"?he.FULLTEXT:he.METADATA}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}toggleDevTools(){var e,t;const i=new URL(window.location.href),{searchParams:o}=i;o.get("hide-dev-tools")?o.delete("hide-dev-tools"):o.set("hide-dev-tools","true"),(t=(e=this.shadowRoot)===null||e===void 0?void 0:e.getElementById("dev-tools"))===null||t===void 0||t.classList.toggle("hidden"),window.history.replaceState&&window.history.replaceState({path:i.toString()},"",i.toString())}toggleFacetGroupOutline(e){e.target.checked?(this.collectionBrowser.classList.add("showFacetGroupOutlines"),this.modalManager.classList.add("showFacetGroupOutlines")):(this.collectionBrowser.classList.remove("showFacetGroupOutlines"),this.modalManager.classList.remove("showFacetGroupOutlines"))}async snippetsChanged(e){e.target.checked?this.searchService={async search(i,o){var r;const s=await Ye.default.search(i,o);return(r=s.success)===null||r===void 0||r.response.results.forEach(l=>{Object.defineProperty(l,"highlight",{value:new C(["this is a text {{{snippet}}} block with potentially","multiple {{{snippets}}} and such","but the {{{snippet}}} block may be quite long perhaps","depending on how many {{{snippet}}} matches there are","there may be multiple lines of {{{snippets}}} to show","but each {{{snippet}}} should be relatively short","and {{{snippets}}} are each a {{{snippet}}} of text","but every {{{snippet}}} might have multiple matches","the {{{snippets}}} should be separated and surrounded by ellipses"])})}),s}}:this.searchService=Ye.default,this.reperformCurrentSearch()}async reviewsChanged(e){e.target.checked?this.searchService={async search(i,o){var r;const s=await Ye.default.search(i,o);return(r=s.success)===null||r===void 0||r.response.results.forEach((l,d)=>{Object.defineProperty(l,"review",{value:{title:"My Great Review",body:"This item is really great and that's why I'm leaving this review on it and giving it so many star...",stars:(d+3)%6}})}),s}}:this.searchService=Ye.default,this.reperformCurrentSearch()}async reperformCurrentSearch(){const e=this.searchQuery;this.searchQuery="-",await this.updateComplete,await new Promise(t=>{setTimeout(t,0)}),this.searchQuery=e}datePickerChanged(e){const t=e.target;this.collectionBrowser.showHistogramDatePicker=t.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}facetsChanged(e){const t=e.target;this.suppressFacets=!t.checked}lazyLoadFacetsChanged(e){const t=e.target;this.lazyLoadFacets=t.checked}manageModeChanged(e){var t;const i=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector("#enable-management");i&&(i.checked=e.detail)}handleItemRemovalRequest(e){this.collectionBrowser.showRemoveItemsProcessingModal(),console.log("itemRemovalRequested: ",e.detail.items),setTimeout(()=>{this.collectionBrowser.showRemoveItemsErrorModal()},2e3)}handleItemManagerRequest(e){console.log("itemManagerRequested: ",e.detail.items)}manageModeCheckboxChanged(e){const t=e.target;this.collectionBrowser.isManageView=t.checked,this.collectionBrowser.manageViewLabel="Select items to remove (customizable texts)"}SearchManageModeCheckboxChanged(e){const t=e.target;this.collectionBrowser.pageContext=t.checked?"search":"collection"}smartFacetBarCheckboxChanged(e){const t=e.target;this.collectionBrowser.showSmartFacetBar=t.checked}facetTopSlotCheckboxChanged(e){const t=e.target,i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="New stuff as a child.",i.style.setProperty("height","20rem"),i.style.backgroundColor="#00000",i.setAttribute("slot","facet-top-slot"),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}toggleSlotOptions(){this.toggleSlots=!this.toggleSlots}resultLastTileSlotCheckboxChanged(e){const t=e.target,i=document.createElement("div"),o=document.createElement("h3");o.textContent="Upload",i.setAttribute("slot","result-last-tile"),i.setAttribute("class","result-last-tile"),i.appendChild(o),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}cbTopSlotCheckboxChanged(e){const t=e.target,i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="My Favorite list header.",i.style.setProperty("height","10rem"),i.style.backgroundColor="#00000",i.setAttribute("slot","cb-top-slot"),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}sortBarLeftSlotCheckboxChanged(e){if(e.target.checked){const i=document.createElement("div");i.style.setProperty("border","1px solid #000"),i.textContent="Btn",i.style.setProperty("height","3rem"),i.style.setProperty("width","3rem"),i.setAttribute("slot","sort-options-left"),this.collectionBrowser.appendChild(i)}else{const i=this.collectionBrowser.querySelector('[slot="sort-options-left"]');i&&this.collectionBrowser.removeChild(i)}}sortBarRightSlotCheckboxChanged(e){if(e.target.checked){const i=document.createElement("div");i.style.setProperty("border","1px solid #000"),i.textContent="Search bar",i.style.setProperty("height","3rem"),i.style.setProperty("width","15rem"),i.setAttribute("slot","sort-options-right"),this.collectionBrowser.appendChild(i)}else{const i=this.collectionBrowser.querySelector('[slot="sort-options-right"]');i&&this.collectionBrowser.removeChild(i)}}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}replaceSortOptionsChanged(e){if(e.target.checked){const i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="New stuff as a child.",i.style.setProperty("height","20px"),i.setAttribute("slot","sort-options"),this.collectionBrowser.appendChild(i),this.collectionBrowser.enableSortOptionsSlot=!0}else{const i=this.collectionBrowser.querySelector('[slot="sort-options"]');i&&this.collectionBrowser.removeChild(i),this.collectionBrowser.enableSortOptionsSlot=!1}}};le.styles=g`
    :host {
      display: block;
      --primaryButtonBGColor: #194880;
      --ia-theme-link-color: #4b64ff;
    }

    /* add the following styles to ensure proper modal visibility */
    body.modal-manager-open {
      overflow: hidden;
    }
    modal-manager {
      display: none;
    }
    modal-manager[mode='open'] {
      display: block;
    }
    modal-manager.remove-items {
      --modalWidth: 58rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
    }
    modal-manager.more-search-facets {
      --modalWidth: 85rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
      --modalCornerRadius: 0;
      --modalBottomPadding: 0;
      --modalBottomMargin: 0;
      --modalScrollOffset: 0;
      --modalCornerRadius: 0.5rem;
    }
    modal-manager.expanded-date-picker {
      --modalWidth: 58rem;
      --modalBorder: 2px solid var(--primaryButtonBGColor, #194880);
      --modalTitleLineHeight: 4rem;
      --modalTitleFontSize: 1.8rem;
      --modalCornerRadius: 0;
      --modalBottomPadding: 0;
      --modalBottomMargin: 0;
      --modalScrollOffset: 0;
      --modalCornerRadius: 0.5rem;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    modal-manager.showFacetGroupOutlines,
    collection-browser.showFacetGroupOutlines {
      --facet-row-border-top: 1px solid red;
      --facet-row-border-bottom: 1px solid blue;
    }

    collection-browser {
      /* Same as production */
      max-width: 135rem;
      margin: auto;
    }

    #collection-browser-container {
      /* Same as production */
      padding-left: 0.5rem;
      margin-bottom: 2rem;
    }

    #base-query-field {
      width: 300px;
    }

    .dev-tool-container {
      position: relative;
    }
    #dev-tools {
      position: relative;
      top: 0;
      left: 0;
      z-index: 1;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
      font-size: 1.4rem;
      background: #ffffffb3;
    }

    #dev-tools > * {
      display: flex;
    }

    #toggle-dev-tools-btn {
      position: fixed;
      left: 77.4%;
      top: 0;
      background: red;
      padding: 5px;
      color: white;
      font-size: 1.4rem;
      margin: 0;
      z-index: 1;
      cursor: pointer;
    }

    #search-and-page-inputs {
      flex-wrap: wrap;
      row-gap: 2px;
    }

    #search-and-page-inputs > form {
      margin-right: 1rem;
    }

    #search-and-page-inputs label {
      display: inline-block;
      min-width: 50px;
    }

    #page-number-input {
      width: 75px;
    }

    .search-type {
      margin-right: 1rem;
    }

    .cell-controls {
      display: flex;
      flex-wrap: wrap;
    }
    .cell-controls div {
      display: flex;
      align-items: center;
    }
    .cell-controls input[type='range'] {
      width: 120px;
    }
    #cell-controls label {
      display: inline-block;
      width: 10rem;
    }

    #cell-size-control,
    #cell-gap-control {
      flex-basis: calc(50% - 1rem);
      flex-grow: 1;
    }

    #cell-gap-control {
      margin-left: 1rem;
    }

    #checkbox-controls {
      padding-top: 0.5rem;
      flex-wrap: wrap;
    }

    .checkbox-control {
      flex-basis: 50%;
    }
    .checkbox-control.indent {
      margin-left: 10px;
    }
    .checkbox-control label {
      user-select: none;
    }

    #last-event {
      background-color: aliceblue;
      padding: 5px;
      margin: 5px auto;
    }

    .hidden {
      display: none;
    }

    #toggle-controls {
      background-color: lightskyblue;
      padding: 5px;
      margin: 5px auto;
    }

    #search-types {
      margin: 5px auto;
      background-color: aliceblue;
      font-size: 1.6rem;
    }

    // slots
    div[slot='cb-top-slot'] {
      height: 50px;
      border: 1px solid red;
      background: bisque;
    }
    div[slot='facet-top-slot'] {
      border: 1px solid red;
      width: 100%;
      height: 150px;
      background-color: darkseagreen;
    }
    div[slot='sort-slot-left'] {
      height: 50px;
      border: 1px solid red;
      background: bisque;
    }

    /* user profile controls */
    .user-profile-controls {
      width: fit-content;
    }

    fieldset {
      display: inline-block !important;
    }

    .result-last-tile {
      border-radius: 4px;
      background-color: white;
      border: 3px dashed #555;
      box-shadow: none;
      display: grid;
      align-content: center;
    }
    .result-last-tile:hover {
      box-shadow: rgba(8, 8, 32, 0.8) 0 0 6px 2px;
      transition: box-shadow 0.1s ease 0s;
      cursor: pointer;
      border: 3px dashed #4b64ff;
    }
    .result-last-tile h3 {
      margin-bottom: 4rem;
      margin: 0px auto;
      font-size: 2.8rem;
      color: rgb(44, 44, 44);
      font-weight: 200;
      text-align: center;
    }
  `;n([L()],le.prototype,"toggleSlots",void 0);n([L()],le.prototype,"currentPage",void 0);n([L()],le.prototype,"searchQuery",void 0);n([L()],le.prototype,"withinCollection",void 0);n([L()],le.prototype,"cellWidth",void 0);n([L()],le.prototype,"cellHeight",void 0);n([L()],le.prototype,"rowGap",void 0);n([L()],le.prototype,"colGap",void 0);n([L()],le.prototype,"suppressFacets",void 0);n([L()],le.prototype,"lazyLoadFacets",void 0);n([L()],le.prototype,"loggedIn",void 0);n([L()],le.prototype,"searchType",void 0);n([u({type:Object,reflect:!1})],le.prototype,"latestAction",void 0);n([Y("#base-query-field")],le.prototype,"baseQueryField",void 0);n([Y("#base-collection-field")],le.prototype,"baseCollectionField",void 0);n([Y("#page-number-input")],le.prototype,"pageNumberInput",void 0);n([Y("collection-browser")],le.prototype,"collectionBrowser",void 0);n([Y("modal-manager")],le.prototype,"modalManager",void 0);le=n([F("app-root")],le);
