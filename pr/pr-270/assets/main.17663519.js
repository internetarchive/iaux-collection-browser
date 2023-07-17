var $r=Object.defineProperty,Sr=Object.defineProperties;var kr=Object.getOwnPropertyDescriptors;var Zo=Object.getOwnPropertySymbols;var Tr=Object.prototype.hasOwnProperty,zr=Object.prototype.propertyIsEnumerable;var Jo=(a,e,t)=>e in a?$r(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,oe=(a,e)=>{for(var t in e||(e={}))Tr.call(e,t)&&Jo(a,t,e[t]);if(Zo)for(var t of Zo(e))zr.call(e,t)&&Jo(a,t,e[t]);return a},we=(a,e)=>Sr(a,kr(e));import Zi from"https://esm.archive.org/dayjs@^1.10.7";import Mr from"https://esm.archive.org/dayjs@1.9.4/esm/plugin/customParseFormat";const Er=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};Er();function s(a,e,t,i){var o=arguments.length,r=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,n;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(n=a[l])&&(r=(o<3?n(r):o>3?n(e,t,r):n(e,t))||r);return o>3&&r&&Object.defineProperty(e,t,r),r}function Lr(a,e,t,i){function o(r){return r instanceof t?r:new t(function(n){n(r)})}return new(t||(t=Promise))(function(r,n){function l(v){try{u(i.next(v))}catch(f){n(f)}}function d(v){try{u(i.throw(v))}catch(f){n(f)}}function u(v){v.done?r(v.value):o(v.value).then(l,d)}u((i=i.apply(a,e||[])).next())})}class Pr{constructor(e){var t,i,o,r;this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://analytics.archive.org/0.gif",this.defaultService=(t=e==null?void 0:e.defaultService)!==null&&t!==void 0?t:this.DEFAULT_SERVICE,this.imageUrl=(i=e==null?void 0:e.imageUrl)!==null&&i!==void 0?i:this.DEFAULT_IMAGE_URL,this.imageContainer=(o=e==null?void 0:e.imageContainer)!==null&&o!==void 0?o:document.body,this.requireImagePing=(r=e==null?void 0:e.requireImagePing)!==null&&r!==void 0?r:!1}sendPing(e){const t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}const i=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{i(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){const t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,i=oe({kind:"event",ec:e.category,ea:e.action,el:t,cache_bust:Math.random()},e.eventConfiguration);this.sendPing(i)}sendEventNoSampling(e){const t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;const i=e;i.eventConfiguration=t,this.sendEvent(i)}sendPingViaImage(e){const t=new Image(1,1);t.src=e,t.alt="",this.imageContainer.appendChild(t)}generateTrackingUrl(e){var t;const i=e!=null?e:{};i.service=(t=i.service)!==null&&t!==void 0?t:this.defaultService;const o=new URL(this.imageUrl),r=Object.keys(i);return r.forEach(n=>{const l=i[n];o.searchParams.append(n,l)}),o.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),o.searchParams.append("count",`${r.length+2}`),o}}function b(a){let e,t,i;return typeof a=="object"?(e=a.hashFunction,t=a.expiring,i=a.tags):e=a,(o,r,n)=>{if(n.value!=null)n.value=ea(n.value,e,t,i);else if(n.get!=null)n.get=ea(n.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ai=new Map;function ea(a,e,t=0,i){const o=Symbol("__memoized_map__");return function(...r){let n;this.hasOwnProperty(o)||Object.defineProperty(this,o,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[o];if(Array.isArray(i))for(const d of i)Ai.has(d)?Ai.get(d).push(l):Ai.set(d,[l]);if(e||r.length>0||t>0){let d;e===!0?d=r.map(f=>f.toString()).join("!"):e?d=e.apply(this,r):d=r[0];const u=`${d}__timestamp`;let v=!1;if(t>0)if(!l.has(u))v=!0;else{let f=l.get(u);v=Date.now()-f>t}l.has(d)&&!v?n=l.get(d):(n=a.apply(this,r),l.set(d,n),t>0&&l.set(u,Date.now()))}else{const d=this;l.has(d)?n=l.get(d):(n=a.apply(this,r),l.set(d,n))}return n}}class Ji{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:Boolean(e)}}Ji.shared=new Ji;class gi{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}gi.shared=new gi;class eo{parseValue(e){return gi.shared.parseValue(e)}}eo.shared=new eo;class to{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let o=new Date(t);return(t.indexOf("Z")>-1||t.indexOf("+")>-1||t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)||t.match(/^.*?-[0-9]{2}:[0-9]{2}$/)||t.match(/^.*?-[0-9]{4}$/))&&(o=new Date(o.getTime()+o.getTimezoneOffset()*1e3*60)),o}}to.shared=new to;class io{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((o,r)=>{const n=parseFloat(o);if(Number.isNaN(n))return t=!0,0;const l=e.length-1-r,d=60**l;return n*Math.floor(d)}).reduce((o,r)=>o+r,0);return t?void 0:i}}io.shared=new io;class oo{parseValue(e){if(typeof e=="string")return e}}oo.shared=new oo;class Dr{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const o of this.separators)if(i=t.split(o),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(r=>r.trim()).map(r=>this.parser.parseValue(r)),o=[];return i.forEach(r=>{r!==void 0&&o.push(r)}),o}}class ao{parseValue(e){if(typeof e=="string")return e}}ao.shared=new ao;class bi{parseValue(e){return String(e)}}bi.shared=new bi;class Te{constructor(e,t){this.parser=e,this.rawValue=t}get values(){return this.parseRawValue()}get value(){return this.values[0]}parseRawValue(){if(this.rawValue===void 0)return[];const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const o=this.parser.parseValue(i);Array.isArray(o)?t.push(...o):o!==void 0&&t.push(o)}),t}}s([b()],Te.prototype,"values",null);s([b()],Te.prototype,"value",null);class Tt extends Te{constructor(e){super(Ji.shared,e)}}class re extends Te{constructor(e){super(to.shared,e)}}class Bi extends Te{constructor(e){super(io.shared,e)}}class U extends Te{constructor(e){super(gi.shared,e)}}class M extends Te{constructor(e){super(bi.shared,e)}}class Fr extends Te{constructor(e){super(ao.shared,e)}}class yi extends Te{constructor(e){super(eo.shared,e)}}class $o extends Te{constructor(e){super(oo.shared,e)}}class Ar extends Te{constructor(e,t){super(t,e)}}class Br extends Ar{constructor(e){const t=new Dr(bi.shared);super(e,t)}}class k{constructor(e){this.rawMetadata=e}get identifier(){var e;return(e=this.rawMetadata)===null||e===void 0?void 0:e.identifier}get addeddate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.addeddate?new re(this.rawMetadata.addeddate):void 0}get audio_codec(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_codec?new M(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_sample_rate?new U(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.avg_rating?new U(this.rawMetadata.avg_rating):void 0}get collection(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection?new M(this.rawMetadata.collection):void 0}get collections_raw(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collections_raw?new M(this.rawMetadata.collections_raw):void 0}get collection_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection_size?new yi(this.rawMetadata.collection_size):void 0}get contributor(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.contributor?new M(this.rawMetadata.contributor):void 0}get coverage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.coverage?new M(this.rawMetadata.coverage):void 0}get creator(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.creator?new M(this.rawMetadata.creator):void 0}get date(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.date?new re(this.rawMetadata.date):void 0}get description(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.description?new M(this.rawMetadata.description):void 0}get downloads(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.downloads?new U(this.rawMetadata.downloads):void 0}get duration(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.duration?new Bi(this.rawMetadata.duration):void 0}get"external-identifier"(){var e,t;return!((e=this.rawMetadata)===null||e===void 0)&&e["external-identifier"]?new M((t=this.rawMetadata)===null||t===void 0?void 0:t["external-identifier"]):void 0}get files_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.files_count?new U(this.rawMetadata.files_count):void 0}get indexdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.indexdate?new re(this.rawMetadata.indexdate):void 0}get isbn(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.isbn?new M(this.rawMetadata.isbn):void 0}get issue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.issue?new M(this.rawMetadata.issue):void 0}get item_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_count?new U(this.rawMetadata.item_count):void 0}get item_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_size?new yi(this.rawMetadata.item_size):void 0}get language(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.language?new M(this.rawMetadata.language):void 0}get length(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.length?new Bi(this.rawMetadata.length):void 0}get lineage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.lineage?new M(this.rawMetadata.lineage):void 0}get month(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.month?new U(this.rawMetadata.month):void 0}get mediatype(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.mediatype?new $o(this.rawMetadata.mediatype):void 0}get noindex(){var e;return((e=this.rawMetadata)===null||e===void 0?void 0:e.noindex)!=null?new Tt(this.rawMetadata.noindex):void 0}get notes(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.notes?new M(this.rawMetadata.notes):void 0}get num_favorites(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_favorites?new U(this.rawMetadata.num_favorites):void 0}get num_reviews(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_reviews?new U(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_edition?new M(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_work?new M(this.rawMetadata.openlibrary_work):void 0}get page_progression(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.page_progression?new Fr(this.rawMetadata.page_progression):void 0}get partner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.partner?new M(this.rawMetadata.partner):void 0}get ppi(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.ppi?new U(this.rawMetadata.ppi):void 0}get publicdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publicdate?new re(this.rawMetadata.publicdate):void 0}get publisher(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publisher?new M(this.rawMetadata.publisher):void 0}get reviewdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.reviewdate?new re(this.rawMetadata.reviewdate):void 0}get runtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.runtime?new Bi(this.rawMetadata.runtime):void 0}get scanner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.scanner?new M(this.rawMetadata.scanner):void 0}get source(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.source?new M(this.rawMetadata.source):void 0}get start_localtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_localtime?new re(this.rawMetadata.start_localtime):void 0}get start_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_time?new re(this.rawMetadata.start_time):void 0}get stop_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.stop_time?new re(this.rawMetadata.stop_time):void 0}get subject(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.subject?new Br(this.rawMetadata.subject):void 0}get taper(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.taper?new M(this.rawMetadata.taper):void 0}get title(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.title?new M(this.rawMetadata.title):void 0}get transferer(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.transferer?new M(this.rawMetadata.transferer):void 0}get track(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.track?new U(this.rawMetadata.track):void 0}get type(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.type?new M(this.rawMetadata.type):void 0}get uploader(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.uploader?new M(this.rawMetadata.uploader):void 0}get utc_offset(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.utc_offset?new U(this.rawMetadata.utc_offset):void 0}get venue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.venue?new M(this.rawMetadata.venue):void 0}get volume(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.volume?new M(this.rawMetadata.volume):void 0}get week(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.week?new U(this.rawMetadata.week):void 0}get year(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.year?new re(this.rawMetadata.year):void 0}}s([b()],k.prototype,"addeddate",null);s([b()],k.prototype,"audio_codec",null);s([b()],k.prototype,"audio_sample_rate",null);s([b()],k.prototype,"avg_rating",null);s([b()],k.prototype,"collection",null);s([b()],k.prototype,"collections_raw",null);s([b()],k.prototype,"collection_size",null);s([b()],k.prototype,"contributor",null);s([b()],k.prototype,"coverage",null);s([b()],k.prototype,"creator",null);s([b()],k.prototype,"date",null);s([b()],k.prototype,"description",null);s([b()],k.prototype,"downloads",null);s([b()],k.prototype,"duration",null);s([b()],k.prototype,"external-identifier",null);s([b()],k.prototype,"files_count",null);s([b()],k.prototype,"indexdate",null);s([b()],k.prototype,"isbn",null);s([b()],k.prototype,"issue",null);s([b()],k.prototype,"item_count",null);s([b()],k.prototype,"item_size",null);s([b()],k.prototype,"language",null);s([b()],k.prototype,"length",null);s([b()],k.prototype,"lineage",null);s([b()],k.prototype,"month",null);s([b()],k.prototype,"mediatype",null);s([b()],k.prototype,"noindex",null);s([b()],k.prototype,"notes",null);s([b()],k.prototype,"num_favorites",null);s([b()],k.prototype,"num_reviews",null);s([b()],k.prototype,"openlibrary_edition",null);s([b()],k.prototype,"openlibrary_work",null);s([b()],k.prototype,"page_progression",null);s([b()],k.prototype,"partner",null);s([b()],k.prototype,"ppi",null);s([b()],k.prototype,"publicdate",null);s([b()],k.prototype,"publisher",null);s([b()],k.prototype,"reviewdate",null);s([b()],k.prototype,"runtime",null);s([b()],k.prototype,"scanner",null);s([b()],k.prototype,"source",null);s([b()],k.prototype,"start_localtime",null);s([b()],k.prototype,"start_time",null);s([b()],k.prototype,"stop_time",null);s([b()],k.prototype,"subject",null);s([b()],k.prototype,"taper",null);s([b()],k.prototype,"title",null);s([b()],k.prototype,"transferer",null);s([b()],k.prototype,"track",null);s([b()],k.prototype,"type",null);s([b()],k.prototype,"uploader",null);s([b()],k.prototype,"utc_offset",null);s([b()],k.prototype,"venue",null);s([b()],k.prototype,"volume",null);s([b()],k.prototype,"week",null);s([b()],k.prototype,"year",null);class B{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.identifier}get addeddate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.addeddate?new re(this.rawMetadata.fields.addeddate):void 0}get avg_rating(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.avg_rating)!=null?new U(this.rawMetadata.fields.avg_rating):void 0}get collection(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.collection?new M(this.rawMetadata.fields.collection):void 0}get collection_files_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.collection_files_count)!=null?new U(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.collection_size)!=null?new yi(this.rawMetadata.fields.collection_size):void 0}get creator(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.creator?new M(this.rawMetadata.fields.creator):void 0}get date(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date?new re(this.rawMetadata.fields.date):void 0}get description(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.description?new M(this.rawMetadata.fields.description):void 0}get downloads(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.downloads)!=null?new U(this.rawMetadata.fields.downloads):void 0}get files_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.files_count)!=null?new U(this.rawMetadata.fields.files_count):void 0}get genre(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.genre?new M(this.rawMetadata.fields.genre):void 0}get indexflag(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.indexflag?new M(this.rawMetadata.fields.indexflag):void 0}get issue(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.issue?new M(this.rawMetadata.fields.issue):void 0}get item_count(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.item_count)!=null?new U(this.rawMetadata.fields.item_count):void 0}get item_size(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.item_size)!=null?new yi(this.rawMetadata.fields.item_size):void 0}get language(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.language?new M(this.rawMetadata.fields.language):void 0}get lending___available_to_borrow(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_borrow)!=null?new Tt(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_browse)!=null?new Tt(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.lending___available_to_waitlist)!=null?new Tt(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.lending___status?new M(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.licenseurl?new M(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.mediatype?new $o(this.rawMetadata.fields.mediatype):void 0}get month(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.month)!=null?new U(this.rawMetadata.fields.month):void 0}get noindex(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.noindex)!=null?new Tt(this.rawMetadata.fields.noindex):void 0}get num_favorites(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.num_favorites)!=null?new U(this.rawMetadata.fields.num_favorites):void 0}get num_reviews(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.num_reviews)!=null?new U(this.rawMetadata.fields.num_reviews):void 0}get publicdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.publicdate?new re(this.rawMetadata.fields.publicdate):void 0}get reviewdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.reviewdate?new re(this.rawMetadata.fields.reviewdate):void 0}get source(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.source?new M(this.rawMetadata.fields.source):void 0}get subject(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.subject?new M(this.rawMetadata.fields.subject):void 0}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new M(this.rawMetadata.fields.title):void 0}get type(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.type?new M(this.rawMetadata.fields.type):void 0}get volume(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.volume?new M(this.rawMetadata.fields.volume):void 0}get week(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.week)!=null?new U(this.rawMetadata.fields.week):void 0}get year(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.year)!=null?new U(this.rawMetadata.fields.year):void 0}}s([b()],B.prototype,"addeddate",null);s([b()],B.prototype,"avg_rating",null);s([b()],B.prototype,"collection",null);s([b()],B.prototype,"collection_files_count",null);s([b()],B.prototype,"collection_size",null);s([b()],B.prototype,"creator",null);s([b()],B.prototype,"date",null);s([b()],B.prototype,"description",null);s([b()],B.prototype,"downloads",null);s([b()],B.prototype,"files_count",null);s([b()],B.prototype,"genre",null);s([b()],B.prototype,"indexflag",null);s([b()],B.prototype,"issue",null);s([b()],B.prototype,"item_count",null);s([b()],B.prototype,"item_size",null);s([b()],B.prototype,"language",null);s([b()],B.prototype,"lending___available_to_borrow",null);s([b()],B.prototype,"lending___available_to_browse",null);s([b()],B.prototype,"lending___available_to_waitlist",null);s([b()],B.prototype,"lending___status",null);s([b()],B.prototype,"licenseurl",null);s([b()],B.prototype,"mediatype",null);s([b()],B.prototype,"month",null);s([b()],B.prototype,"noindex",null);s([b()],B.prototype,"num_favorites",null);s([b()],B.prototype,"num_reviews",null);s([b()],B.prototype,"publicdate",null);s([b()],B.prototype,"reviewdate",null);s([b()],B.prototype,"source",null);s([b()],B.prototype,"subject",null);s([b()],B.prototype,"title",null);s([b()],B.prototype,"type",null);s([b()],B.prototype,"volume",null);s([b()],B.prototype,"week",null);s([b()],B.prototype,"year",null);class V{constructor(e){this.rawMetadata=e}get identifier(){var e,t;return(t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.identifier}get highlight(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.highlight)===null||t===void 0)&&t.text?new M(this.rawMetadata.highlight.text):void 0}get addeddate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.addeddate?new re(this.rawMetadata.fields.addeddate):void 0}get avg_rating(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.avg_rating)!=null?new U(this.rawMetadata.fields.avg_rating):void 0}get collection(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.collection?new M(this.rawMetadata.fields.collection):void 0}get created_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.created_on?new re(this.rawMetadata.fields.created_on):void 0}get creator(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.creator?new M(this.rawMetadata.fields.creator):void 0}get date(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.date?new re(this.rawMetadata.fields.date):void 0}get description(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.description?new M(this.rawMetadata.fields.description):void 0}get downloads(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.downloads)!=null?new U(this.rawMetadata.fields.downloads):void 0}get filename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.filename?new M(this.rawMetadata.fields.filename):void 0}get file_basename(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.file_basename?new M(this.rawMetadata.fields.file_basename):void 0}get file_creation_mtime(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.file_creation_mtime)!=null?new U(this.rawMetadata.fields.file_creation_mtime):void 0}get issue(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.issue?new M(this.rawMetadata.fields.issue):void 0}get mediatype(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.mediatype?new $o(this.rawMetadata.fields.mediatype):void 0}get page_num(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.page_num)!=null?new U(this.rawMetadata.fields.page_num):void 0}get publicdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.publicdate?new re(this.rawMetadata.fields.publicdate):void 0}get result_in_subfile(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.result_in_subfile)!=null?new Tt(this.rawMetadata.fields.result_in_subfile):void 0}get reviewdate(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.reviewdate?new re(this.rawMetadata.fields.reviewdate):void 0}get source(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.source?new M(this.rawMetadata.fields.source):void 0}get subject(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.subject?new M(this.rawMetadata.fields.subject):void 0}get title(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.title?new M(this.rawMetadata.fields.title):void 0}get updated_on(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.updated_on?new re(this.rawMetadata.fields.updated_on):void 0}get year(){var e,t;return((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0?void 0:t.year)!=null?new U(this.rawMetadata.fields.year):void 0}get __href__(){var e,t;return!((t=(e=this.rawMetadata)===null||e===void 0?void 0:e.fields)===null||t===void 0)&&t.__href__?new M(this.rawMetadata.fields.__href__):void 0}}s([b()],V.prototype,"highlight",null);s([b()],V.prototype,"addeddate",null);s([b()],V.prototype,"avg_rating",null);s([b()],V.prototype,"collection",null);s([b()],V.prototype,"created_on",null);s([b()],V.prototype,"creator",null);s([b()],V.prototype,"date",null);s([b()],V.prototype,"description",null);s([b()],V.prototype,"downloads",null);s([b()],V.prototype,"filename",null);s([b()],V.prototype,"file_basename",null);s([b()],V.prototype,"file_creation_mtime",null);s([b()],V.prototype,"issue",null);s([b()],V.prototype,"mediatype",null);s([b()],V.prototype,"page_num",null);s([b()],V.prototype,"publicdate",null);s([b()],V.prototype,"result_in_subfile",null);s([b()],V.prototype,"reviewdate",null);s([b()],V.prototype,"source",null);s([b()],V.prototype,"subject",null);s([b()],V.prototype,"title",null);s([b()],V.prototype,"updated_on",null);s([b()],V.prototype,"year",null);s([b()],V.prototype,"__href__",null);var Z;(function(a){a[a.COUNT=0]="COUNT",a[a.ALPHABETICAL=1]="ALPHABETICAL",a[a.NUMERIC=2]="NUMERIC"})(Z||(Z={}));class Ua{constructor(e){this.buckets=e.buckets,this.doc_count_error_upper_bound=e.doc_count_error_upper_bound,this.sum_other_doc_count=e.sum_other_doc_count,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const i=new Intl.Collator;switch(e){case Z.ALPHABETICAL:return t.sort((o,r)=>i.compare(o.key.toString(),r.key.toString()));case Z.NUMERIC:return t.sort((o,r)=>Number(r.key)-Number(o.key));case Z.COUNT:default:return t}}isRawNumberBuckets(e){return typeof this.buckets[0]=="number"}}s([b()],Ua.prototype,"getSortedBuckets",null);class So{constructor(e,t){var i,o,r,n,l,d,u;this.schema=t;const v=t==null?void 0:t.hit_type;this.totalResults=(o=(i=e==null?void 0:e.hits)===null||i===void 0?void 0:i.total)!==null&&o!==void 0?o:0,this.returnedCount=(n=(r=e==null?void 0:e.hits)===null||r===void 0?void 0:r.returned)!==null&&n!==void 0?n:0,this.results=(u=(d=(l=e==null?void 0:e.hits)===null||l===void 0?void 0:l.hits)===null||d===void 0?void 0:d.map(f=>{var g;return So.createResult((g=f.hit_type)!==null&&g!==void 0?g:v,f)}))!==null&&u!==void 0?u:[],e!=null&&e.aggregations&&(this.aggregations=Object.entries(e.aggregations).reduce((f,[g,w])=>(f[g]=new Ua(w),f),{})),e!=null&&e.collection_titles&&(this.collectionTitles=e.collection_titles),e!=null&&e.collection_extra_info&&(this.collectionExtraInfo=e.collection_extra_info)}static createResult(e,t){switch(e){case"item":return new B(t);case"text":return new V(t);default:return new B(t)}}}class Ir{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class Or{constructor(e){var t,i,o;this.rawResponse=e,this.request=new Ir(e.request),this.responseHeader=(t=e.response)===null||t===void 0?void 0:t.header,this.response=new So((i=e.response)===null||i===void 0?void 0:i.body,(o=e.response)===null||o===void 0?void 0:o.hit_schema)}}class Ha{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(o=>({terms:o}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const o=this.filterParamsAsString(e.filters);o&&o!=="{}"&&t.append("filter_map",o)}if(e.sort&&e.sort.length>0){const o=e.sort.map(r=>this.sortParamsAsString(r));t.append("sort",o.join(","))}const i=e.aggregations;if(i){const o=this.aggregateSearchParamsAsString(i);o&&t.append("aggregations",o)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const o=window.location.href.slice(0,400);e.query.length<=1e3&&t.append("client_url",o)}return t}}var Wt;(function(a){a.networkError="SearchService.NetworkError",a.itemNotFound="SearchService.ItemNotFound",a.decodingError="SearchService.DecodingError",a.searchEngineError="SearchService.SearchEngineError"})(Wt||(Wt={}));class Rr extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}class Wa{constructor(e){var t,i;this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",this.debuggingEnabled=(i=e==null?void 0:e.debuggingEnabled)!==null&&i!==void 0?i:!1,(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const o=new URL(window.location.href),r=o.searchParams.get("scope"),n=o.searchParams.get("caching"),l=o.searchParams.get("verbose");(e==null?void 0:e.scope)!==void 0?this.requestScope=e.scope:r&&(this.requestScope=r),(e==null?void 0:e.caching)!==void 0?this.cachingFlags=e.caching:n&&(this.cachingFlags=n),(e==null?void 0:e.verbose)!==void 0?this.verbose=e.verbose:l&&(this.verbose=!!l)}async fetchUrl(e,t){var i,o;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope),this.cachingFlags&&r.searchParams.set("caching",this.cachingFlags);let n;try{const l=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};n=await fetch(r.href,l)}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Wt.networkError,d)}try{const l=await n.json();this.verbose&&this.printResponse(l),l.debugging&&this.printDebuggingInfo(l);const d=(o=l.response)===null||o===void 0?void 0:o.error;return d?this.getErrorResult(Wt.searchEngineError,d.message,d.forensics):{success:l}}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Wt.decodingError,d)}}getErrorResult(e,t,i){return{error:new Rr(e,t,i)}}printResponse(e){var t,i,o,r,n;try{const l=JSON.parse(JSON.stringify(e)),d=(o=(i=(t=l==null?void 0:l.response)===null||t===void 0?void 0:t.body)===null||i===void 0?void 0:i.hits)===null||o===void 0?void 0:o.hits;if(Array.isArray(d)&&d.length>1){const v=[];v.push(d[0]),v.push(`*** ${d.length-1} hits omitted ***`),l.response.body.hits.hits=v}const u=(n=(r=l==null?void 0:l.response)===null||r===void 0?void 0:r.body)===null||n===void 0?void 0:n.aggregations;u&&Object.entries(u).forEach(([v,f])=>{var g,w,C,E;if(((w=(g=f)===null||g===void 0?void 0:g.buckets)===null||w===void 0?void 0:w.length)>0){const L=JSON.parse(JSON.stringify(f));L.buckets=`*** ${(E=(C=L.buckets)===null||C===void 0?void 0:C.length)!==null&&E!==void 0?E:0} buckets omitted ***`,l.response.body.aggregations[v]=L}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(l,null,2)),console.groupEnd()}catch(l){console.error("Error printing search response:",l)}}printDebuggingInfo(e){var t,i;const o=e.debugging,r=(t=o.messages)!==null&&t!==void 0?t:[],n=(i=o.data)!==null&&i!==void 0?i:{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const l of r)console.log(l);console.groupEnd(),console.group("Debug data");for(const[l,d]of Object.entries(n))console.log(l,d);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class Nr extends Wa{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ha.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${i}`;return this.fetchUrl(o)}}class Ur extends Wa{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ha.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${i}`;return this.fetchUrl(o)}}var ue;(function(a){a[a.METADATA=0]="METADATA",a[a.FULLTEXT=1]="FULLTEXT"})(ue||(ue={}));class qe{constructor(e={}){this.backendOptions=e}async search(e,t=ue.METADATA){const o=await qe.getBackendForSearchType(t,this.backendOptions).performSearch(e);return o.error?o:{success:new Or(o.success)}}static getBackendForSearchType(e,t={}){switch(e){case ue.FULLTEXT:return new Ur(t);case ue.METADATA:default:return new Nr(t)}}}qe.default=new qe;s([b((a,e={})=>{const{includeCredentials:t=!1,verbose:i=!1,scope:o="",baseUrl:r=""}=e;return`${a};${t};${i};${o};${r}`})],qe,"getBackendForSearchType",null);var Qe;(function(a){a.INCLUDE="inc",a.EXCLUDE="exc",a.GREATER_THAN="gt",a.GREATER_OR_EQUAL="gte",a.LESS_THAN="lt",a.LESS_OR_EQUAL="lte"})(Qe||(Qe={}));class Hr{constructor(){this.filterMap={}}addFilter(e,t,i){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){const o=[].concat(this.filterMap[e][t],i);this.filterMap[e][t]=Array.from(new Set(o))}else this.filterMap[e][t]=i;return this}removeSingleFilter(e,t,i){var o;if(!(!((o=this.filterMap[e])===null||o===void 0)&&o[t]))return this;const r=[].concat(this.filterMap[e][t]),n=r.indexOf(i);return n>=0&&r.splice(n,1),this.filterMap[e][t]=r.length===1?r[0]:r,r.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){const t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap=oe({},e),this}mergeFilterMap(e){for(const[t,i]of Object.entries(e))for(const[o,r]of Object.entries(i))if(Array.isArray(r))for(const n of r)this.addFilter(t,o,n);else this.addFilter(t,o,r);return this}build(){return this.filterMap}}function Wr(){var a=!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent);if(!a||!indexedDB.databases)return Promise.resolve();var e;return new Promise(function(t){var i=function(){return indexedDB.databases().finally(t)};e=setInterval(i,100),i()}).finally(function(){return clearInterval(e)})}function Dt(a){return new Promise((e,t)=>{a.oncomplete=a.onsuccess=()=>e(a.result),a.onabort=a.onerror=()=>t(a.error)})}function Vr(a,e){const t=Wr().then(()=>{const i=indexedDB.open(a);return i.onupgradeneeded=()=>i.result.createObjectStore(e),Dt(i)});return(i,o)=>t.then(r=>o(r.transaction(e,i).objectStore(e)))}let Ii;function Ti(){return Ii||(Ii=Vr("keyval-store","keyval")),Ii}function jr(a,e=Ti()){return e("readonly",t=>Dt(t.get(a)))}function Gr(a,e,t=Ti()){return t("readwrite",i=>(i.put(e,a),Dt(i.transaction)))}function Qr(a,e=Ti()){return e("readwrite",t=>(t.delete(a),Dt(t.transaction)))}function qr(a,e){return a.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},Dt(a.transaction)}function Kr(a=Ti()){return a("readonly",e=>{if(e.getAllKeys)return Dt(e.getAllKeys());const t=[];return qr(e,i=>t.push(i.key)).then(()=>t)})}function Yr(a,e){return a.setMilliseconds(a.getMilliseconds()+e*1e3),a}class Xr{constructor(e){var t,i,o,r;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((o=e==null?void 0:e.immediateClean)!==null&&o!==void 0)||o)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const n=(r=e==null?void 0:e.cleaningInterval)!==null&&r!==void 0?r:60;setInterval(()=>{this.cleanExpired()},n*1e3)}}async set(e){var t;const i={value:e.value},o=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,r=Yr(new Date,o);i.expires=r;const n=this.getNamespacedKey(e.key);try{await Gr(n,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await jr(t)}catch{}if(!i)return;const o=new Date;if(i.expires&&i.expires<o){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await Qr(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Kr()}catch{}const t=[];for(const r of e)typeof r=="string"&&t.push(r);return t.filter(r=>r.startsWith(this.namespace)).map(r=>this.removeNamespace(r))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ko=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,To=Symbol(),ta=new Map;class Va{constructor(e,t){if(this._$cssResult$=!0,t!==To)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=ta.get(this.cssText);return ko&&e===void 0&&(ta.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Zr=a=>new Va(typeof a=="string"?a:a+"",To),m=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,o,r)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+a[r+1],a[0]);return new Va(t,To)},Jr=(a,e)=>{ko?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=window.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,a.appendChild(i)})},ia=ko?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Zr(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Oi;const oa=window.trustedTypes,es=oa?oa.emptyScript:"",aa=window.reactiveElementPolyfillSupport,ro={toAttribute(a,e){switch(e){case Boolean:a=a?es:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ja=(a,e)=>e!==a&&(e==e||a==a),Ri={attribute:!0,type:String,converter:ro,reflect:!1,hasChanged:ja};class kt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Eh(i,t);o!==void 0&&(this._$Eu.set(o,i),e.push(o))}),e}static createProperty(e,t=Ri){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const r=this[e];this[t]=o,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ri}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(ia(o))}else e!==void 0&&t.push(ia(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Jr(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Ri){var o,r;const n=this.constructor._$Eh(e,i);if(n!==void 0&&i.reflect===!0){const l=((r=(o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==null&&r!==void 0?r:ro.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(n):this.setAttribute(n,l),this._$Ei=null}}_$AK(e,t){var i,o,r;const n=this.constructor,l=n._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const d=n.getPropertyOptions(l),u=d.converter,v=(r=(o=(i=u)===null||i===void 0?void 0:i.fromAttribute)!==null&&o!==void 0?o:typeof u=="function"?u:null)!==null&&r!==void 0?r:ro.fromAttribute;this._$Ei=l,this[l]=v(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ja)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((o,r)=>this[r]=o),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(o=>{var r;return(r=o.hostUpdate)===null||r===void 0?void 0:r.call(o)}),this.update(i)):this._$EU()}catch(o){throw t=!1,this._$EU(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}kt.finalized=!0,kt.elementProperties=new Map,kt.elementStyles=[],kt.shadowRootOptions={mode:"open"},aa==null||aa({ReactiveElement:kt}),((Oi=globalThis.reactiveElementVersions)!==null&&Oi!==void 0?Oi:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ni;const Mt=globalThis.trustedTypes,ra=Mt?Mt.createPolicy("lit-html",{createHTML:a=>a}):void 0,Be=`lit$${(Math.random()+"").slice(9)}$`,zo="?"+Be,ts=`<${zo}>`,Et=document,Gt=(a="")=>Et.createComment(a),Qt=a=>a===null||typeof a!="object"&&typeof a!="function",Ga=Array.isArray,Qa=a=>{var e;return Ga(a)||typeof((e=a)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,sa=/-->/g,na=/>/g,lt=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,la=/'/g,da=/"/g,qa=/^(?:script|style|textarea|title)$/i,Ka=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),h=Ka(1),I=Ka(2),be=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),ca=new WeakMap,pi=(a,e,t)=>{var i,o;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let n=r._$litPart$;if(n===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;r._$litPart$=n=new Ft(e.insertBefore(Gt(),l),l,void 0,t!=null?t:{})}return n._$AI(a),n},zt=Et.createTreeWalker(Et,129,null,!1),Ya=(a,e)=>{const t=a.length-1,i=[];let o,r=e===2?"<svg>":"",n=Nt;for(let d=0;d<t;d++){const u=a[d];let v,f,g=-1,w=0;for(;w<u.length&&(n.lastIndex=w,f=n.exec(u),f!==null);)w=n.lastIndex,n===Nt?f[1]==="!--"?n=sa:f[1]!==void 0?n=na:f[2]!==void 0?(qa.test(f[2])&&(o=RegExp("</"+f[2],"g")),n=lt):f[3]!==void 0&&(n=lt):n===lt?f[0]===">"?(n=o!=null?o:Nt,g=-1):f[1]===void 0?g=-2:(g=n.lastIndex-f[2].length,v=f[1],n=f[3]===void 0?lt:f[3]==='"'?da:la):n===da||n===la?n=lt:n===sa||n===na?n=Nt:(n=lt,o=void 0);const C=n===lt&&a[d+1].startsWith("/>")?" ":"";r+=n===Nt?u+ts:g>=0?(i.push(v),u.slice(0,g)+"$lit$"+u.slice(g)+Be+C):u+Be+(g===-2?(i.push(void 0),d):C)}const l=r+(a[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return[ra!==void 0?ra.createHTML(l):l,i]};class qt{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let r=0,n=0;const l=e.length-1,d=this.parts,[u,v]=Ya(e,t);if(this.el=qt.createElement(u,i),zt.currentNode=this.el.content,t===2){const f=this.el.content,g=f.firstChild;g.remove(),f.append(...g.childNodes)}for(;(o=zt.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const f=[];for(const g of o.getAttributeNames())if(g.endsWith("$lit$")||g.startsWith(Be)){const w=v[n++];if(f.push(g),w!==void 0){const C=o.getAttribute(w.toLowerCase()+"$lit$").split(Be),E=/([.?@])?(.*)/.exec(w);d.push({type:1,index:r,name:E[2],strings:C,ctor:E[1]==="."?Za:E[1]==="?"?Ja:E[1]==="@"?er:ti})}else d.push({type:6,index:r})}for(const g of f)o.removeAttribute(g)}if(qa.test(o.tagName)){const f=o.textContent.split(Be),g=f.length-1;if(g>0){o.textContent=Mt?Mt.emptyScript:"";for(let w=0;w<g;w++)o.append(f[w],Gt()),zt.nextNode(),d.push({type:2,index:++r});o.append(f[g],Gt())}}}else if(o.nodeType===8)if(o.data===zo)d.push({type:2,index:r});else{let f=-1;for(;(f=o.data.indexOf(Be,f+1))!==-1;)d.push({type:7,index:r}),f+=Be.length-1}r++}}static createElement(e,t){const i=Et.createElement("template");return i.innerHTML=e,i}}function mt(a,e,t=a,i){var o,r,n,l;if(e===be)return e;let d=i!==void 0?(o=t._$Cl)===null||o===void 0?void 0:o[i]:t._$Cu;const u=Qt(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==u&&((r=d==null?void 0:d._$AO)===null||r===void 0||r.call(d,!1),u===void 0?d=void 0:(d=new u(a),d._$AT(a,t,i)),i!==void 0?((n=(l=t)._$Cl)!==null&&n!==void 0?n:l._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=mt(a,d._$AS(a,e.values),d,i)),e}class Xa{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:o}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Et).importNode(i,!0);zt.currentNode=r;let n=zt.nextNode(),l=0,d=0,u=o[0];for(;u!==void 0;){if(l===u.index){let v;u.type===2?v=new Ft(n,n.nextSibling,this,e):u.type===1?v=new u.ctor(n,u.name,u.strings,this,e):u.type===6&&(v=new tr(n,this,e)),this.v.push(v),u=o[++d]}l!==(u==null?void 0:u.index)&&(n=zt.nextNode(),l++)}return r}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ft{constructor(e,t,i,o){var r;this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cg=(r=o==null?void 0:o.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=mt(this,e,t),Qt(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==be&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Qa(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==y&&Qt(this._$AH)?this._$AA.nextSibling.data=e:this.k(Et.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:o}=e,r=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=qt.createElement(o.h,this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.m(i);else{const n=new Xa(r,this),l=n.p(this.options);n.m(i),this.k(l),this._$AH=n}}_$AC(e){let t=ca.get(e.strings);return t===void 0&&ca.set(e.strings,t=new qt(e)),t}S(e){Ga(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const r of e)o===t.length?t.push(i=new Ft(this.M(Gt()),this.M(Gt()),this,this.options)):i=t[o],i._$AI(r),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class ti{constructor(e,t,i,o,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const r=this.strings;let n=!1;if(r===void 0)e=mt(this,e,t,0),n=!Qt(e)||e!==this._$AH&&e!==be,n&&(this._$AH=e);else{const l=e;let d,u;for(e=r[0],d=0;d<r.length-1;d++)u=mt(this,l[i+d],t,d),u===be&&(u=this._$AH[d]),n||(n=!Qt(u)||u!==this._$AH[d]),u===y?e=y:e!==y&&(e+=(u!=null?u:"")+r[d+1]),this._$AH[d]=u}n&&!o&&this.C(e)}C(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Za extends ti{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===y?void 0:e}}const is=Mt?Mt.emptyScript:"";class Ja extends ti{constructor(){super(...arguments),this.type=4}C(e){e&&e!==y?this.element.setAttribute(this.name,is):this.element.removeAttribute(this.name)}}class er extends ti{constructor(e,t,i,o,r){super(e,t,i,o,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=mt(this,e,t,0))!==null&&i!==void 0?i:y)===be)return;const o=this._$AH,r=e===y&&o!==y||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,n=e!==y&&(o===y||r);r&&this.element.removeEventListener(this.name,this,o),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class tr{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){mt(this,e)}}const os={L:"$lit$",P:Be,V:zo,I:1,N:Ya,R:Xa,j:Qa,D:mt,H:Ft,F:ti,O:Ja,W:er,B:Za,Z:tr},ha=window.litHtmlPolyfillSupport;ha==null||ha(qt,Ft),((Ni=globalThis.litHtmlVersions)!==null&&Ni!==void 0?Ni:globalThis.litHtmlVersions=[]).push("2.2.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ui,Hi;class A extends kt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=pi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return be}}A.finalized=!0,A._$litElement$=!0,(Ui=globalThis.litElementHydrateSupport)===null||Ui===void 0||Ui.call(globalThis,{LitElement:A});const pa=globalThis.litElementPolyfillSupport;pa==null||pa({LitElement:A});((Hi=globalThis.litElementVersions)!==null&&Hi!==void 0?Hi:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const F=a=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(a,e):((t,i)=>{const{kind:o,elements:r}=i;return{kind:o,elements:r,finisher(n){window.customElements.define(t,n)}}})(a,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const as=(a,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?we(oe({},e),{finisher(t){t.createProperty(e.key,a)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,a)}};function c(a){return(e,t)=>t!==void 0?((i,o,r)=>{o.constructor.createProperty(r,i)})(a,e,t):as(a,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function T(a){return c(we(oe({},a),{state:!0}))}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ir=({finisher:a,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const r=(o=t.originalKey)!==null&&o!==void 0?o:t.key,n=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:we(oe({},t),{key:r});return a!=null&&(n.finisher=function(l){a(l,r)}),n}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),a==null||a(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Q(a,e){return ir({descriptor:t=>{const i={get(){var o,r;return(r=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(a))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const o=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var r,n;return this[o]===void 0&&(this[o]=(n=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(a))!==null&&n!==void 0?n:null),this[o]}}return i}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function rs(a){return ir({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(a))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Wi;((Wi=window.HTMLSlotElement)===null||Wi===void 0?void 0:Wi.prototype.assignedElements)!=null;class ss{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(o=>{o.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class ns{constructor(e){var t,i,o,r;this.cacheKeyName="collection-name-cache",this.cacheTtl=60*60*24*7,this.defaultLoadDelay=100,this.loadDelay=100,this.defaultPruningAge=1e3*60*60*24*7,this.defaultPruningInterval=1e3*30,this.fetchTimeout=null,this.addKnownTitlesComplete=Promise.resolve(),this.pendingIdentifierQueue=new Set,this.pendingPromises={},this.collectionNameCache={},this.pruningAge=this.defaultPruningAge,this.maxCacheSize=2500,this.cacheLoaded=!1,this.searchService=e.searchService,this.localCache=e.localCache,this.loadDelay=(t=e.loadDelay)!==null&&t!==void 0?t:this.defaultLoadDelay,this.pruningAge=(i=e.pruningAge)!==null&&i!==void 0?i:this.pruningAge,this.maxCacheSize=(o=e.maxCacheSize)!==null&&o!==void 0?o:this.maxCacheSize,this.pruneCache(),setInterval(async()=>{await this.pruneCache()},(r=e.pruneInterval)!==null&&r!==void 0?r:this.defaultPruningInterval)}async collectionNameFor(e){await this.addKnownTitlesComplete,this.cacheLoaded||await this.loadFromCache();const t=e.toLowerCase(),i=this.collectionNameCache[t];return i?(i.lastAccess=Date.now(),this.collectionNameCache[t]=i,i.name):(this.startPendingIdentifierTimer(),new Promise(o=>{var r;this.pendingIdentifierQueue.add(t);const n=(r=this.pendingPromises[t])!==null&&r!==void 0?r:[],l=async d=>{o(d)};n.push(l),this.pendingPromises[t]=n}))}async preloadIdentifiers(e){await this.addKnownTitlesComplete,this.cacheLoaded||await this.loadFromCache();const t=e.filter(i=>i!==void 0).map(i=>i.toLowerCase());for(const i of t)this.collectionNameCache[i]||this.pendingIdentifierQueue.add(i);this.startPendingIdentifierTimer()}async addKnownTitles(e){let t;this.addKnownTitlesComplete=new Promise(i=>{t=i}),this.cacheLoaded||await this.loadFromCache(),Object.entries(e).forEach(([i,o])=>{const r=i.toLowerCase();this.collectionNameCache[r]={name:o,lastAccess:Date.now()}}),await this.persistCache(),t()}async startPendingIdentifierTimer(){this.fetchTimeout||(this.fetchTimeout=window.setTimeout(()=>{this.loadPendingIdentifiers(),this.fetchTimeout=null},this.loadDelay))}async loadFromCache(){if(!this.localCache||this.cacheLoaded)return;const e=await this.localCache.get(this.cacheKeyName);!e||(this.collectionNameCache=e,this.cacheLoaded=!0)}async loadPendingIdentifiers(){var e,t,i;await this.loadFromCache();const o=Array.from(this.pendingIdentifierQueue).splice(0,100);if(o.length===0)return;o.map(async d=>this.pendingIdentifierQueue.delete(d));const r={query:`identifier:(${o.join(" OR ")})`,fields:["title","identifier"],rows:o.length,aggregations:{omit:!0}},l=(t=(e=(await this.searchService.search(r)).success)===null||e===void 0?void 0:e.response)===null||t===void 0?void 0:t.results;if(l&&l.length>0)for(const d of l){const{identifier:u,title:v}=d;if(!u)continue;const f=u.toLowerCase();o.splice(o.indexOf(f),1);const g=(i=v==null?void 0:v.value)!==null&&i!==void 0?i:null;this.collectionNameCache[f]={name:g,lastAccess:Date.now()};const w=this.pendingPromises[f];if(w){for(const C of w)C(g);delete this.pendingPromises[f]}}for(const d of o){this.collectionNameCache[d]={name:null,lastAccess:Date.now()};const u=this.pendingPromises[d];if(u){for(const v of u)v(null);delete this.pendingPromises[d]}}await this.persistCache()}async pruneCache(){await this.loadFromCache();const e=Date.now(),t=Object.entries(this.collectionNameCache).sort((o,r)=>{var n,l,d,u;const v=(l=(n=o[1])===null||n===void 0?void 0:n.lastAccess)!==null&&l!==void 0?l:0,f=(u=(d=r[1])===null||d===void 0?void 0:d.lastAccess)!==null&&u!==void 0?u:0;return v-f}),i=new Set;for(const[o,r]of t){if(!r)continue;const{lastAccess:n}=r;n<e-this.pruningAge&&i.add(o)}if(t.length>this.maxCacheSize)for(let o=0;o<t.length-this.maxCacheSize;o+=1){const[r]=t[o];i.add(r)}for(const o of i)delete this.collectionNameCache[o];await this.persistCache()}async persistCache(){var e;await((e=this.localCache)===null||e===void 0?void 0:e.set({key:this.cacheKeyName,value:this.collectionNameCache,ttl:this.cacheTtl}))}}let Kt=class extends A{render(){return h` ${this.name?this.name:this.identifier} `}createRenderRoot(){return this}updated(e){(e.has("identifier")||e.has("collectionNameCache"))&&this.fetchName()}async fetchName(){!this.identifier||!this.collectionNameCache||(this.name=await this.collectionNameCache.collectionNameFor(this.identifier))}};s([c({type:Object})],Kt.prototype,"collectionNameCache",void 0);s([c({type:String})],Kt.prototype,"identifier",void 0);s([T()],Kt.prototype,"name",void 0);Kt=s([F("async-collection-name")],Kt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ii=a=>(...e)=>({_$litDirective$:a,values:e});class oi{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Yt=ii(class extends oi{constructor(a){var e;if(super(a),a.type!==Me.ATTRIBUTE||a.name!=="class"||((e=a.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(e=>a[e]).join(" ")+" "}update(a,[e]){var t,i;if(this.et===void 0){this.et=new Set,a.strings!==void 0&&(this.st=new Set(a.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((t=this.st)===null||t===void 0)&&t.has(r))&&this.et.add(r);return this.render(e)}const o=a.element.classList;this.et.forEach(r=>{r in e||(o.remove(r),this.et.delete(r))});for(const r in e){const n=!!e[r];n===this.et.has(r)||((i=this.st)===null||i===void 0?void 0:i.has(r))||(n?(o.add(r),this.et.add(r)):(o.remove(r),this.et.delete(r)))}return be}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:ls}=os,or=a=>a.strings===void 0,ua=()=>document.createComment(""),Ut=(a,e,t)=>{var i;const o=a._$AA.parentNode,r=e===void 0?a._$AB:e._$AA;if(t===void 0){const n=o.insertBefore(ua(),r),l=o.insertBefore(ua(),r);t=new ls(n,l,a,a.options)}else{const n=t._$AB.nextSibling,l=t._$AM,d=l!==a;if(d){let u;(i=t._$AQ)===null||i===void 0||i.call(t,a),t._$AM=a,t._$AP!==void 0&&(u=a._$AU)!==l._$AU&&t._$AP(u)}if(n!==r||d){let u=t._$AA;for(;u!==n;){const v=u.nextSibling;o.insertBefore(u,r),u=v}}}return t},dt=(a,e,t=a)=>(a._$AI(e,t),a),ds={},ar=(a,e=ds)=>a._$AH=e,cs=a=>a._$AH,Vi=a=>{var e;(e=a._$AP)===null||e===void 0||e.call(a,!1,!0);let t=a._$AA;const i=a._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const va=(a,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(a[o],o);return i},rr=ii(class extends oi{constructor(a){if(super(a),a.type!==Me.CHILD)throw Error("repeat() can only be used in text expressions")}dt(a,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],r=[];let n=0;for(const l of a)o[n]=i?i(l,n):n,r[n]=t(l,n),n++;return{values:r,keys:o}}render(a,e,t){return this.dt(a,e,t).values}update(a,[e,t,i]){var o;const r=cs(a),{values:n,keys:l}=this.dt(e,t,i);if(!Array.isArray(r))return this.ut=l,n;const d=(o=this.ut)!==null&&o!==void 0?o:this.ut=[],u=[];let v,f,g=0,w=r.length-1,C=0,E=n.length-1;for(;g<=w&&C<=E;)if(r[g]===null)g++;else if(r[w]===null)w--;else if(d[g]===l[C])u[C]=dt(r[g],n[C]),g++,C++;else if(d[w]===l[E])u[E]=dt(r[w],n[E]),w--,E--;else if(d[g]===l[E])u[E]=dt(r[g],n[E]),Ut(a,u[E+1],r[g]),g++,E--;else if(d[w]===l[C])u[C]=dt(r[w],n[C]),Ut(a,r[g],r[w]),w--,C++;else if(v===void 0&&(v=va(l,C,E),f=va(d,g,w)),v.has(d[g]))if(v.has(d[w])){const L=f.get(l[C]),P=L!==void 0?r[L]:null;if(P===null){const R=Ut(a,r[g]);dt(R,n[C]),u[C]=R}else u[C]=dt(P,n[C]),Ut(a,r[g],P),r[L]=null;C++}else Vi(r[w]),w--;else Vi(r[g]),g++;for(;C<=E;){const L=Ut(a,u[E+1]);dt(L,n[C]),u[C++]=L}for(;g<=w;){const L=r[g++];L!==null&&Vi(L)}return this.ut=l,ar(a,u),be}});function di(a,e,t){return Array.from({length:(e-a)/t+1},(i,o)=>a+o*t)}let Oe=class extends A{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const o=t.target.dataset.cellIndex;if(!o)return;const r=parseInt(o,10);t.isIntersecting?this.visibleCellIndices.add(r):this.visibleCellIndices.delete(r)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){di(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const o=t?"smooth":"auto";return i.scrollIntoView({behavior:o}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(di(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){var e;const t=this.itemCount-1,i=di(0,t,1),o=(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:y;return h`
      <section id="container" role="feed" aria-label=${o}>
        <div id="sentinel" aria-hidden="true"></div>
        ${rr(i,r=>r,r=>h`
            <article
              class="cell-container"
              aria-posinset=${r+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${r}
              @click=${n=>this.cellSelected(n,r)}
              @keyup=${n=>{n.key==="Enter"&&this.cellSelected(n,r)}}
            ></article>
          `)}
      </section>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),t=Math.max(10,e.length),i=e.sort((u,v)=>u>v?1:-1),o=e.length===0,r=o?0:Math.max(i[0]-t,0),n=o?t:Math.min(i[i.length-1]+t,this.itemCount-1),l=di(r,n,1);this.renderCellBuffer(l),this.removeCellsOutsideBufferRange(l);const d=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(d)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const o=this.cellContainerForIndex(t);if(!o)return;const r=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(o.style.height="auto",r)pi(r,o),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;pi(this.placeholderCellTemplate,o),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,pi(y,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=m`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=m`var(--infiniteScrollerRowGap, 1.7rem)`,i=m`var(--infiniteScrollerColGap, 1.7rem)`,o=m`var(--infiniteScrollerCellMinWidth, 16rem)`,r=m`var(--infiniteScrollerCellMaxWidth, 1fr)`,n=m`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=m`var(--infiniteScrollerCellMaxHeight, none)`,d=m`var(--infiniteScrollerCellOutline, 0)`;return m`
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
        min-height: ${n};
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
    `}};s([c({type:Number})],Oe.prototype,"itemCount",void 0);s([c({type:Object})],Oe.prototype,"cellProvider",void 0);s([c({type:Object})],Oe.prototype,"placeholderCellTemplate",void 0);s([c({type:Boolean})],Oe.prototype,"scrollOptimizationsDisabled",void 0);s([c({type:String})],Oe.prototype,"ariaLandmarkLabel",void 0);s([Q("#sentinel")],Oe.prototype,"sentinel",void 0);s([rs(".cell-container")],Oe.prototype,"cellContainers",void 0);Oe=s([F("infinite-scroller")],Oe);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mo=a=>a!=null?a:y;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const hs=(a,...e)=>({strTag:!0,strings:a,values:e}),pt=hs,ps=a=>typeof a!="string"&&"strTag"in a,us=(a,e,t)=>{let i=a[0];for(let o=1;o<a.length;o++)i+=e[t?t[o-1]:o-1],i+=a[o];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vs=a=>ps(a)?us(a.strings,a.values):a;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ms{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let a=0;a<256;a++)(a>>4&15).toString(16)+(a&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let fs=new ms;fs.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let O=vs;const sr=I`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;var so;(function(a){a[a.bytes=0]="bytes",a[a.kilobytes=1]="kilobytes",a[a.megabytes=2]="megabytes",a[a.gigabytes=3]="gigabytes",a[a.terabytes=4]="terabytes",a[a.petabytes=5]="petabytes",a[a.exabytes=6]="exabytes",a[a.zettabytes=7]="zettabytes",a[a.yottabytes=8]="yottabytes"})(so||(so={}));function gs(a,e,t=" "){let i=a;if(i===void 0)return y;let o=0;for(;i>1024;)i/=1024,o+=1;const r=10**e;i=Math.round(i*r)/r;let n=so[o];return n=i===1?n.slice(0,-1):n,`${i.toLocaleString()+t+n}`}const Je=m`
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
`,bs=m`var(--tileBackgroundColor, #ffffff)`,ys=m`var(--tileCornerRadius, 4px)`,Eo=m`
  /* Include .sr-only styles for all tiles */
  ${Je}

  .container {
    background-color: ${bs};
    border: 1px #2c2c2c;
    border-radius: ${ys};
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
`;class ma{constructor(e={}){var t;this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=(t=e.collectionPagePath)!==null&&t!==void 0?t:"/details/",this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){var e,t;let i;if(this.creatorFilter&&((e=this.model)===null||e===void 0?void 0:e.creators.length)){const o=this.creatorFilter;i=this.model.creators.find(r=>r.normalize("NFD").replace(/[^A-Z]+/gi,"").toUpperCase().startsWith(o))}return i!=null?i:(t=this.model)===null||t===void 0?void 0:t.creator}get accountLabel(){var e;return!((e=this.model)===null||e===void 0)&&e.dateAdded?O(pt`Archivist since ${this.model.dateAdded.getFullYear()}`):""}get dateLabel(){var e;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"publicdate":return O("Archived");case"reviewdate":return O("Reviewed");case"addeddate":return O("Added");case"date":return O("Published");default:return""}}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return y;const i=t?this.collectionPagePath:"/details/";return`${this.baseNavigationUrl}${i}${e}`}}class ce extends A{constructor(){super(...arguments),this.sortParam=null,this.loggedIn=!1,this.displayValueProvider=new ma}willUpdate(e){var t;(e.has("model")||e.has("baseNavigationUrl")||e.has("collectionPagePath")||e.has("sortParam")||e.has("creatorFilter"))&&(this.displayValueProvider=new ma({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:(t=this.sortParam)!==null&&t!==void 0?t:void 0,creatorFilter:this.creatorFilter}))}}s([c({type:Object})],ce.prototype,"model",void 0);s([c({type:Number})],ce.prototype,"currentWidth",void 0);s([c({type:Number})],ce.prototype,"currentHeight",void 0);s([c({type:String})],ce.prototype,"baseNavigationUrl",void 0);s([c({type:String})],ce.prototype,"baseImageUrl",void 0);s([c({type:String})],ce.prototype,"collectionPagePath",void 0);s([c({type:Object})],ce.prototype,"sortParam",void 0);s([c({type:String})],ce.prototype,"creatorFilter",void 0);s([c({type:Number})],ce.prototype,"mobileBreakpoint",void 0);s([c({type:Boolean})],ce.prototype,"loggedIn",void 0);const nr=I`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,lr=I`
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
`;let Xt=class extends A{constructor(){super(...arguments),this.loggedIn=!1,this.loginRequired=!1,this.isCompactTile=!1}render(){return h`<div class="icon-overlay ${this.getClass}">
      ${this.iconDisplay}
    </div>`}get getClass(){return this.isCompactTile?"list-compact":"list-detail"}get iconDisplay(){return this.loginRequired&&!this.loggedIn?h`${lr}`:h`${nr}`}static get styles(){return m`
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

      .list-detail {
        height: 20px;
        width: 20px;
      }
      .list-compact {
        height: 15px;
        width: 15px;
      }
    `}};s([c({type:Boolean})],Xt.prototype,"loggedIn",void 0);s([c({type:Boolean})],Xt.prototype,"loginRequired",void 0);s([c({type:Boolean})],Xt.prototype,"isCompactTile",void 0);Xt=s([F("icon-overlay")],Xt);let Zt=class extends A{constructor(){super(...arguments),this.loggedIn=!1,this.loginRequired=!1,this.iconRequired=!1}render(){return h`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconDisplay}</div>
        <p class="text-overlay">${this.textDisplay}</p>
      </div>
    `}get iconDisplay(){return this.loginRequired&&!this.loggedIn?h`${lr}`:h`${nr}`}get textDisplay(){return this.loginRequired&&!this.loggedIn?h`Log in to view this item`:h`Content may be inappropriate`}static get styles(){return m`
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
    `}};s([c({type:Boolean})],Zt.prototype,"loggedIn",void 0);s([c({type:Boolean})],Zt.prototype,"loginRequired",void 0);s([c({type:Boolean})],Zt.prototype,"iconRequired",void 0);Zt=s([F("text-overlay")],Zt);let Ke=class extends A{constructor(){super(...arguments),this.isCompactTile=!1,this.isListTile=!1,this.loggedIn=!1,this.viewSize="desktop"}render(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?h`
      <div class=${Yt(this.baseClass)}>
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
    `:y}get baseClass(){var e;return{list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:((e=this.model)===null||e===void 0?void 0:e.mediatype)==="collection",[this.viewSize]:!0}}get iconOverlayTemplate(){var e,t,i;return!this.isListTile||!(!((e=this.model)===null||e===void 0)&&e.loginRequired)&&!(!((t=this.model)===null||t===void 0)&&t.contentWarning)?y:h`
      <icon-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${(i=this.model)===null||i===void 0?void 0:i.loginRequired}
        .isCompactTile=${this.isCompactTile}
      >
      </icon-overlay>
    `}get textOverlayTemplate(){var e,t,i;return this.isListTile||!(!((e=this.model)===null||e===void 0)&&e.loginRequired)&&!(!((t=this.model)===null||t===void 0)&&t.contentWarning)?y:h`
      <text-overlay
        .loggedIn=${this.loggedIn}
        .loginRequired=${(i=this.model)===null||i===void 0?void 0:i.loginRequired}
        ?iconRequired=${!0}
      >
      </text-overlay>
    `}static get styles(){const e=m`var(--imageBlockBackgroundColor, #f1f1f4)`;return m`
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

      .collection.grid {
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
        width: 90px;
        height: 90px;
      }

      /** tile-list-compact view */
      .list-compact {
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
    `}};s([c({type:String})],Ke.prototype,"baseImageUrl",void 0);s([c({type:Boolean})],Ke.prototype,"isCompactTile",void 0);s([c({type:Boolean})],Ke.prototype,"isListTile",void 0);s([c({type:Boolean})],Ke.prototype,"loggedIn",void 0);s([c({type:Object})],Ke.prototype,"model",void 0);s([c({type:String})],Ke.prototype,"viewSize",void 0);Ke=s([F("image-block")],Ke);let no=class extends ce{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
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
        <div id="item-mediatype">${sr}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.itemCount)===null||t===void 0?void 0:t.toLocaleString();return h`<span id="item-count"
      >${i} item${Number(i)!==1?"s":""}</span
    >`}get getSizeTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.collectionSize)!==null&&t!==void 0?t:0;return i?h`<span id="item-size">${gs(i,1)}</span>`:""}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${O("More info")}</span>
        </button>`:y}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=m`var(--tileBorderColor, #555555)`,t=m`var(--tileBackgroundColor, #666666)`,i=m`#fff`;return[Eo,m`
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
      `]}};s([c({type:Boolean})],no.prototype,"showInfoButton",void 0);no=s([F("collection-tile")],no);function wi(a,e="short",t="en-US"){if(!a)return"";const i={};switch(e){case"year-only":i.year="numeric";break;case"short":i.month="short",i.year="numeric";break;case"long":i.year="numeric",i.month="short",i.day="2-digit";break}return new Intl.DateTimeFormat(t,i).format(a)}function ws(a){return new Date(a.getTime()-a.getTimezoneOffset()*1e3*60)}function Lo(a){return a?ws(a).toISOString().endsWith("-01-01T00:00:00.000Z"):!1}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*ui(a,e){const t=typeof e=="function";if(a!==void 0){let i=-1;for(const o of a)i>-1&&(yield t?e(i):e),i++,yield o}}let xi=class extends A{constructor(){super(...arguments),this.snippets=[],this.viewSize="desktop"}render(){var e;return!((e=this.snippets)===null||e===void 0)&&e.length?h`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:h`${y}`}get ellipsisJoinedSnippets(){return h`
      &hellip; ${ui(this.snippetTemplates,h` &hellip; `)} &hellip;
    `}get snippetTemplates(){var e;return(e=this.snippets)===null||e===void 0?void 0:e.map(t=>{const i=t.matchAll(/{{{(.+?)}}}/gs),o=[];let r=0;for(const n of i)n.index!=null&&(o.push(h`
            ${t.slice(r,n.index)}
            <mark>${n[1]}</mark>
          `),r=n.index+n[0].length);return o.push(h`${t.slice(r)}`),h`<span>${o}</span>`})}static get styles(){return m`
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
    `}};s([c({type:Array})],xi.prototype,"snippets",void 0);s([c({type:String})],xi.prototype,"viewSize",void 0);xi=s([F("text-snippet-block")],xi);const xs=m`
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
`,_s=m`
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
`;let Re=class extends A{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.isWaveform=!1}render(){return h`
      <div class=${Yt(this.itemBaseClass)}>
        <img
          class=${Yt(this.itemImageClass)}
          src="${this.imageSrc}"
          alt=""
          @load=${this.onLoad}
        />
      </div>
    `}get imageSrc(){var e;return this.baseImageUrl&&((e=this.model)===null||e===void 0?void 0:e.identifier)?`${this.baseImageUrl}/services/img/${this.model.identifier}`:y}get hashBasedGradient(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(e){return e.split("").reduce((t,i)=>t+i.charCodeAt(0),0)}get itemBaseClass(){return{"drop-shadow":!0,"list-box":this.isListTile,[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var e,t,i;const o=((e=this.model)===null||e===void 0?void 0:e.contentWarning)||((t=this.model)===null||t===void 0?void 0:t.loginRequired);return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:o||!1,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":((i=this.model)===null||i===void 0?void 0:i.mediatype)==="collection"}}get isAccountImage(){var e;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"&&!this.isCompactTile&&!this.isListTile}onLoad(){var e,t;(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"||((t=this.model)===null||t===void 0?void 0:t.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}static get styles(){return[xs,_s,m`
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }
      `]}};s([c({type:Object})],Re.prototype,"model",void 0);s([c({type:String})],Re.prototype,"baseImageUrl",void 0);s([c({type:Boolean})],Re.prototype,"isListTile",void 0);s([c({type:Boolean})],Re.prototype,"isCompactTile",void 0);s([c({type:Boolean})],Re.prototype,"loggedIn",void 0);s([T()],Re.prototype,"isWaveform",void 0);s([Q("img")],Re.prototype,"baseImage",void 0);Re=s([F("item-image")],Re);const Cs=I`
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
`,$s=I`
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
`,Ss=I`
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
`,ks=I`
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
`,Ts=I`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,fa=I`
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
`,zs=I`
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
`,Ms=I`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Es=I`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Ls=I`
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
`,Ps=I`
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
`,Ds=I`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,Fs={account:{color:"#000000",icon:Cs,text:"Account"},audio:{color:"#00adef",icon:$s,text:"Audio"},collection:{color:"#4666ff",icon:sr,text:"Collection"},data:{color:"#333333",icon:Ss,text:"Data"},etree:{color:"#00adef",icon:ks,text:"E-tree"},film:{color:"#bf1b2c",icon:fa,text:"Film"},image:{color:"#aa99c9",icon:Ts,text:"Image"},movies:{color:"#f1644b",icon:fa,text:"Movie"},radio:{color:"#8fdaef",icon:zs,text:"Radio"},software:{color:"#9ecc4f",icon:Ms,text:"Software"},texts:{color:"#faab3c",icon:Es,text:"Text"},tv:{color:"#f1644b",icon:Ls,text:"TV"},video:{color:"#f1644b",icon:Ps,text:"Video"},web:{color:"#ffcd27",icon:Ds,text:"Web"}};let Jt=class extends A{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;const i=["tvnews","tvarchive","television"],o=["radio","radioprogram"];return this.mediatype==="movies"&&((e=this.collections)===null||e===void 0?void 0:e.some(r=>i.indexOf(r)>=0))?"tv":this.mediatype==="audio"&&((t=this.collections)===null||t===void 0?void 0:t.some(r=>o.indexOf(r)>=0))?"radio":this.mediatype||""}render(){const e=Fs[this.displayMediatype];return e?h`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        title="${e.text}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:h``}static get styles(){return m`
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
    `}};s([c({type:String})],Jt.prototype,"mediatype",void 0);s([c({type:Array})],Jt.prototype,"collections",void 0);s([c({type:Boolean})],Jt.prototype,"showText",void 0);Jt=s([F("mediatype-icon")],Jt);const As=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
    <title>Icon of a star, filled in</title>
  </svg>
`,Bs=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,Is=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,Os=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;function Rs(a,e){let t=1;return a>=1e9?t=1e9:a>=1e6?t=1e6:a>=1e3&&e==="short"&&(t=1e3),t}function Ns(a=0,e){const t=a/e,i=t<10;let o=0;return i?o=Math.round((t+Number.EPSILON)*10)/10:o=Math.round(t),o}function Us(a,e,t,i){switch(e){case 1e9:return O(t==="short"?pt`${a}B`:pt`${a} billion`);case 1e6:return O(t==="short"?pt`${a}M`:pt`${a} million`);case 1e3:return O(t==="short"?pt`${a}K`:pt`${a} thousand`);default:return new Intl.NumberFormat(i).format(a)}}function Vt(a,e="long",t="short",i="en-US"){const o=a!=null?a:-1;if(o<0)return"";const r=Rs(o,e),n=Ns(o,r);return Us(n,r,t,i)}let Ye=class extends A{render(){var e;const t=Vt(this.favCount,"short","short"),i=Vt(this.commentCount,"short","short"),o=this.mediatype==="account"?`${this.itemCount} uploads`:`${this.viewCount} ${(e=this.viewLabel)!==null&&e!==void 0?e:"all-time views"}`;return h`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype==="account"?"Account Stats":"Item Stats"}
        </p>
        <ul id="stats-row">
          <li class="col">
            <p class="sr-only">Mediatype:</p>
            <mediatype-icon .mediatype=${this.mediatype}></mediatype-icon>
          </li>
          <li class="col" title="${o}">
            ${this.mediatype==="account"?Is:Os}
            <p class="status-text">
              <span class="sr-only">
                ${this.mediatype==="account"?"Uploads:":"Views:"}
              </span>
              ${Vt(this.mediatype==="account"?this.itemCount:this.viewCount,"short","short")}
            </p>
          </li>
          <li class="col" title="${t} favorites">
            ${As}
            <p class="status-text">
              <span class="sr-only">Favorites:</span>
              ${t}
            </p>
          </li>
          <li class="col reviews" title="${i} reviews">
            ${Bs}
            <p class="status-text">
              <span class="sr-only">Reviews:</span>
              ${i}
            </p>
          </li>
        </ul>
      </div>
    `}static get styles(){return[Je,m`
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
      `]}};s([c({type:String})],Ye.prototype,"mediatype",void 0);s([c({type:Number})],Ye.prototype,"itemCount",void 0);s([c({type:Number})],Ye.prototype,"viewCount",void 0);s([c({type:String})],Ye.prototype,"viewLabel",void 0);s([c({type:Number})],Ye.prototype,"favCount",void 0);s([c({type:Number})],Ye.prototype,"commentCount",void 0);Ye=s([F("tile-stats")],Ye);let lo=class extends ce{constructor(){super(...arguments),this.showInfoButton=!1}render(){var e,t,i,o,r,n,l;const d=(e=this.model)===null||e===void 0?void 0:e.title,[u,v]=((t=this.sortParam)===null||t===void 0?void 0:t.field)==="week"?[(i=this.model)===null||i===void 0?void 0:i.weeklyViewCount,"weekly views"]:[(o=this.model)===null||o===void 0?void 0:o.viewCount,"all-time views"];return h`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h4 class="truncated" title=${Mo(d)}>
                ${d}
              </h4>
            </div>

            ${this.volumeIssueTemplate}
            ${this.isSortedByDate?this.sortedDateInfoTemplate:this.creatorTemplate}
            ${this.textSnippetsTemplate}
          </div>

          <tile-stats
            .mediatype=${(r=this.model)===null||r===void 0?void 0:r.mediatype}
            .viewCount=${u}
            .viewLabel=${v}
            .favCount=${(n=this.model)===null||n===void 0?void 0:n.favCount}
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
    `:y}get imageBlockTemplate(){return h`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .isCompactTile=${!1}
        .isListTile=${!1}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get sortedDateInfoTemplate(){var e,t,i,o,r;let n,l="long";switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":{const d=(t=this.model)===null||t===void 0?void 0:t.datePublished;n={field:"published",value:d},Lo(d)&&(l="year-only");break}case"reviewdate":n={field:"reviewed",value:(i=this.model)===null||i===void 0?void 0:i.dateReviewed};break;case"addeddate":n={field:"added",value:(o=this.model)===null||o===void 0?void 0:o.dateAdded};break;case"publicdate":n={field:"archived",value:(r=this.model)===null||r===void 0?void 0:r.dateArchived};break}return n!=null&&n.value?h`
      <div class="date-sorted-by truncated">
        <span>
          ${n==null?void 0:n.field} ${wi(n==null?void 0:n.value,l)}
        </span>
      </div>
    `:y}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${O("More info")}</span>
        </button>`:y}get textSnippetsTemplate(){var e;return this.hasSnippets?h`
      <text-snippet-block viewsize="grid" .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}>
      </text-snippet-block>
    `:y}get volumeIssueTemplate(){var e,t,i,o;return!(!((e=this.model)===null||e===void 0)&&e.volume)||!(!((t=this.model)===null||t===void 0)&&t.issue)?y:h`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${(i=this.model)===null||i===void 0?void 0:i.volume}, Issue&nbsp;${(o=this.model)===null||o===void 0?void 0:o.issue}
        </span>
      </div>
    `}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.sortParam)===null||e===void 0?void 0:e.field)}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=m`var(--tileBorderColor, #dddddd)`;return[Eo,m`
        .container {
          border: 1px solid ${e};
        }

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
      `]}};s([c({type:Boolean})],lo.prototype,"showInfoButton",void 0);lo=s([F("item-tile")],lo);let co=class extends ce{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
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
          <span class="sr-only">${O("More info")}</span>
        </button>`:y}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=m`var(--tileBorderColor, #dddddd)`;return[Eo,m`
        .container {
          border: 1px solid ${e};
        }
      `]}};s([c({type:Boolean})],co.prototype,"showInfoButton",void 0);co=s([F("account-tile")],co);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*ho(a,e){if(a!==void 0){let t=0;for(const i of a)yield e(i,t++)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class po extends oi{constructor(e){if(super(e),this.it=y,e.type!==Me.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===y||e==null)return this.ft=void 0,this.it=e;if(e===be)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this.ft;this.it=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}po.directiveName="unsafeHTML",po.resultType=1;const Hs=ii(po);/*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */function ut(a){return ut=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ut(a)}function uo(a,e){return uo=Object.setPrototypeOf||function(i,o){return i.__proto__=o,i},uo(a,e)}function Ws(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function vi(a,e,t){return Ws()?vi=Reflect.construct:vi=function(o,r,n){var l=[null];l.push.apply(l,r);var d=Function.bind.apply(o,l),u=new d;return n&&uo(u,n.prototype),u},vi.apply(null,arguments)}function Se(a){return Vs(a)||js(a)||Gs(a)||Qs()}function Vs(a){if(Array.isArray(a))return vo(a)}function js(a){if(typeof Symbol!="undefined"&&a[Symbol.iterator]!=null||a["@@iterator"]!=null)return Array.from(a)}function Gs(a,e){if(!!a){if(typeof a=="string")return vo(a,e);var t=Object.prototype.toString.call(a).slice(8,-1);if(t==="Object"&&a.constructor&&(t=a.constructor.name),t==="Map"||t==="Set")return Array.from(a);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return vo(a,e)}}function vo(a,e){(e==null||e>a.length)&&(e=a.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=a[t];return i}function Qs(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var qs=Object.hasOwnProperty,ga=Object.setPrototypeOf,Ks=Object.isFrozen,Ys=Object.getPrototypeOf,Xs=Object.getOwnPropertyDescriptor,fe=Object.freeze,Ee=Object.seal,Zs=Object.create,dr=typeof Reflect!="undefined"&&Reflect,_i=dr.apply,mo=dr.construct;_i||(_i=function(e,t,i){return e.apply(t,i)});fe||(fe=function(e){return e});Ee||(Ee=function(e){return e});mo||(mo=function(e,t){return vi(e,Se(t))});var Js=ke(Array.prototype.forEach),ba=ke(Array.prototype.pop),Ht=ke(Array.prototype.push),mi=ke(String.prototype.toLowerCase),en=ke(String.prototype.match),je=ke(String.prototype.replace),tn=ke(String.prototype.indexOf),on=ke(String.prototype.trim),me=ke(RegExp.prototype.test),ji=an(TypeError);function ke(a){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return _i(a,e,i)}}function an(a){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return mo(a,t)}}function D(a,e){ga&&ga(a,null);for(var t=e.length;t--;){var i=e[t];if(typeof i=="string"){var o=mi(i);o!==i&&(Ks(e)||(e[t]=o),i=o)}a[i]=!0}return a}function ct(a){var e=Zs(null),t;for(t in a)_i(qs,a,[t])&&(e[t]=a[t]);return e}function ci(a,e){for(;a!==null;){var t=Xs(a,e);if(t){if(t.get)return ke(t.get);if(typeof t.value=="function")return ke(t.value)}a=Ys(a)}function i(o){return console.warn("fallback value for",o),null}return i}var ya=fe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Gi=fe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Qi=fe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),rn=fe(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),qi=fe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),sn=fe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),wa=fe(["#text"]),xa=fe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Ki=fe(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),_a=fe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),hi=fe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),nn=Ee(/\{\{[\w\W]*|[\w\W]*\}\}/gm),ln=Ee(/<%[\w\W]*|[\w\W]*%>/gm),dn=Ee(/^data-[\-\w.\u00B7-\uFFFF]/),cn=Ee(/^aria-[\-\w]+$/),hn=Ee(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),pn=Ee(/^(?:\w+script|data):/i),un=Ee(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),vn=Ee(/^html$/i),mn=function(){return typeof window=="undefined"?null:window},fn=function(e,t){if(ut(e)!=="object"||typeof e.createPolicy!="function")return null;var i=null,o="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(o)&&(i=t.currentScript.getAttribute(o));var r="dompurify"+(i?"#"+i:"");try{return e.createPolicy(r,{createHTML:function(l){return l}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}};function cr(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:mn(),e=function(p){return cr(p)};if(e.version="2.3.8",e.removed=[],!a||!a.document||a.document.nodeType!==9)return e.isSupported=!1,e;var t=a.document,i=a.document,o=a.DocumentFragment,r=a.HTMLTemplateElement,n=a.Node,l=a.Element,d=a.NodeFilter,u=a.NamedNodeMap,v=u===void 0?a.NamedNodeMap||a.MozNamedAttrMap:u,f=a.HTMLFormElement,g=a.DOMParser,w=a.trustedTypes,C=l.prototype,E=ci(C,"cloneNode"),L=ci(C,"nextSibling"),P=ci(C,"childNodes"),R=ci(C,"parentNode");if(typeof r=="function"){var he=i.createElement("template");he.content&&he.content.ownerDocument&&(i=he.content.ownerDocument)}var q=fn(w,t),W=q?q.createHTML(""):"",K=i,le=K.implementation,Ce=K.createNodeIterator,He=K.createDocumentFragment,We=K.getElementsByTagName,Y=t.importNode,ye={};try{ye=ct(i).documentMode?i.documentMode:{}}catch{}var se={};e.isSupported=typeof R=="function"&&le&&typeof le.createHTMLDocument!="undefined"&&ye!==9;var et=nn,tt=ln,At=dn,Bt=cn,It=pn,gt=un,it=hn,X=null,bt=D({},[].concat(Se(ya),Se(Gi),Se(Qi),Se(qi),Se(wa))),J=null,yt=D({},[].concat(Se(xa),Se(Ki),Se(_a),Se(hi))),j=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Pe=null,ot=null,wt=!0,at=!0,xt=!1,ze=!1,$e=!1,rt=!1,st=!1,De=!1,ai=!1,ri=!1,Bo=!0,zi=!0,Ot=!1,_t={},Ct=null,Io=D({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Oo=null,Ro=D({},["audio","video","img","source","image","track"]),Mi=null,No=D({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Ei="http://www.w3.org/1998/Math/MathML",Li="http://www.w3.org/2000/svg",Ve="http://www.w3.org/1999/xhtml",si=Ve,Pi=!1,$t,fr=["application/xhtml+xml","text/html"],gr="text/html",nt,St=null,br=i.createElement("form"),Uo=function(p){return p instanceof RegExp||p instanceof Function},Di=function(p){St&&St===p||((!p||ut(p)!=="object")&&(p={}),p=ct(p),X="ALLOWED_TAGS"in p?D({},p.ALLOWED_TAGS):bt,J="ALLOWED_ATTR"in p?D({},p.ALLOWED_ATTR):yt,Mi="ADD_URI_SAFE_ATTR"in p?D(ct(No),p.ADD_URI_SAFE_ATTR):No,Oo="ADD_DATA_URI_TAGS"in p?D(ct(Ro),p.ADD_DATA_URI_TAGS):Ro,Ct="FORBID_CONTENTS"in p?D({},p.FORBID_CONTENTS):Io,Pe="FORBID_TAGS"in p?D({},p.FORBID_TAGS):{},ot="FORBID_ATTR"in p?D({},p.FORBID_ATTR):{},_t="USE_PROFILES"in p?p.USE_PROFILES:!1,wt=p.ALLOW_ARIA_ATTR!==!1,at=p.ALLOW_DATA_ATTR!==!1,xt=p.ALLOW_UNKNOWN_PROTOCOLS||!1,ze=p.SAFE_FOR_TEMPLATES||!1,$e=p.WHOLE_DOCUMENT||!1,De=p.RETURN_DOM||!1,ai=p.RETURN_DOM_FRAGMENT||!1,ri=p.RETURN_TRUSTED_TYPE||!1,st=p.FORCE_BODY||!1,Bo=p.SANITIZE_DOM!==!1,zi=p.KEEP_CONTENT!==!1,Ot=p.IN_PLACE||!1,it=p.ALLOWED_URI_REGEXP||it,si=p.NAMESPACE||Ve,p.CUSTOM_ELEMENT_HANDLING&&Uo(p.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(j.tagNameCheck=p.CUSTOM_ELEMENT_HANDLING.tagNameCheck),p.CUSTOM_ELEMENT_HANDLING&&Uo(p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(j.attributeNameCheck=p.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),p.CUSTOM_ELEMENT_HANDLING&&typeof p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(j.allowCustomizedBuiltInElements=p.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),$t=fr.indexOf(p.PARSER_MEDIA_TYPE)===-1?$t=gr:$t=p.PARSER_MEDIA_TYPE,nt=$t==="application/xhtml+xml"?function(x){return x}:mi,ze&&(at=!1),ai&&(De=!0),_t&&(X=D({},Se(wa)),J=[],_t.html===!0&&(D(X,ya),D(J,xa)),_t.svg===!0&&(D(X,Gi),D(J,Ki),D(J,hi)),_t.svgFilters===!0&&(D(X,Qi),D(J,Ki),D(J,hi)),_t.mathMl===!0&&(D(X,qi),D(J,_a),D(J,hi))),p.ADD_TAGS&&(X===bt&&(X=ct(X)),D(X,p.ADD_TAGS)),p.ADD_ATTR&&(J===yt&&(J=ct(J)),D(J,p.ADD_ATTR)),p.ADD_URI_SAFE_ATTR&&D(Mi,p.ADD_URI_SAFE_ATTR),p.FORBID_CONTENTS&&(Ct===Io&&(Ct=ct(Ct)),D(Ct,p.FORBID_CONTENTS)),zi&&(X["#text"]=!0),$e&&D(X,["html","head","body"]),X.table&&(D(X,["tbody"]),delete Pe.tbody),fe&&fe(p),St=p)},Ho=D({},["mi","mo","mn","ms","mtext"]),Wo=D({},["foreignobject","desc","title","annotation-xml"]),yr=D({},["title","style","font","a","script"]),ni=D({},Gi);D(ni,Qi),D(ni,rn);var Fi=D({},qi);D(Fi,sn);var wr=function(p){var x=R(p);(!x||!x.tagName)&&(x={namespaceURI:Ve,tagName:"template"});var _=mi(p.tagName),N=mi(x.tagName);return p.namespaceURI===Li?x.namespaceURI===Ve?_==="svg":x.namespaceURI===Ei?_==="svg"&&(N==="annotation-xml"||Ho[N]):Boolean(ni[_]):p.namespaceURI===Ei?x.namespaceURI===Ve?_==="math":x.namespaceURI===Li?_==="math"&&Wo[N]:Boolean(Fi[_]):p.namespaceURI===Ve?x.namespaceURI===Li&&!Wo[N]||x.namespaceURI===Ei&&!Ho[N]?!1:!Fi[_]&&(yr[_]||!ni[_]):!1},Fe=function(p){Ht(e.removed,{element:p});try{p.parentNode.removeChild(p)}catch{try{p.outerHTML=W}catch{p.remove()}}},Vo=function(p,x){try{Ht(e.removed,{attribute:x.getAttributeNode(p),from:x})}catch{Ht(e.removed,{attribute:null,from:x})}if(x.removeAttribute(p),p==="is"&&!J[p])if(De||ai)try{Fe(x)}catch{}else try{x.setAttribute(p,"")}catch{}},jo=function(p){var x,_;if(st)p="<remove></remove>"+p;else{var N=en(p,/^[\r\n\t ]+/);_=N&&N[0]}$t==="application/xhtml+xml"&&(p='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+p+"</body></html>");var ge=q?q.createHTML(p):p;if(si===Ve)try{x=new g().parseFromString(ge,$t)}catch{}if(!x||!x.documentElement){x=le.createDocument(si,"template",null);try{x.documentElement.innerHTML=Pi?"":ge}catch{}}var pe=x.body||x.documentElement;return p&&_&&pe.insertBefore(i.createTextNode(_),pe.childNodes[0]||null),si===Ve?We.call(x,$e?"html":"body")[0]:$e?x.documentElement:pe},Go=function(p){return Ce.call(p.ownerDocument||p,p,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT,null,!1)},xr=function(p){return p instanceof f&&(typeof p.nodeName!="string"||typeof p.textContent!="string"||typeof p.removeChild!="function"||!(p.attributes instanceof v)||typeof p.removeAttribute!="function"||typeof p.setAttribute!="function"||typeof p.namespaceURI!="string"||typeof p.insertBefore!="function")},Rt=function(p){return ut(n)==="object"?p instanceof n:p&&ut(p)==="object"&&typeof p.nodeType=="number"&&typeof p.nodeName=="string"},Ae=function(p,x,_){!se[p]||Js(se[p],function(N){N.call(e,x,_,St)})},Qo=function(p){var x;if(Ae("beforeSanitizeElements",p,null),xr(p)||me(/[\u0080-\uFFFF]/,p.nodeName))return Fe(p),!0;var _=nt(p.nodeName);if(Ae("uponSanitizeElement",p,{tagName:_,allowedTags:X}),p.hasChildNodes()&&!Rt(p.firstElementChild)&&(!Rt(p.content)||!Rt(p.content.firstElementChild))&&me(/<[/\w]/g,p.innerHTML)&&me(/<[/\w]/g,p.textContent)||_==="select"&&me(/<template/i,p.innerHTML))return Fe(p),!0;if(!X[_]||Pe[_]){if(!Pe[_]&&Ko(_)&&(j.tagNameCheck instanceof RegExp&&me(j.tagNameCheck,_)||j.tagNameCheck instanceof Function&&j.tagNameCheck(_)))return!1;if(zi&&!Ct[_]){var N=R(p)||p.parentNode,ge=P(p)||p.childNodes;if(ge&&N)for(var pe=ge.length,de=pe-1;de>=0;--de)N.insertBefore(E(ge[de],!0),L(p))}return Fe(p),!0}return p instanceof l&&!wr(p)||(_==="noscript"||_==="noembed")&&me(/<\/no(script|embed)/i,p.innerHTML)?(Fe(p),!0):(ze&&p.nodeType===3&&(x=p.textContent,x=je(x,et," "),x=je(x,tt," "),p.textContent!==x&&(Ht(e.removed,{element:p.cloneNode()}),p.textContent=x)),Ae("afterSanitizeElements",p,null),!1)},qo=function(p,x,_){if(Bo&&(x==="id"||x==="name")&&(_ in i||_ in br))return!1;if(!(at&&!ot[x]&&me(At,x))){if(!(wt&&me(Bt,x))){if(!J[x]||ot[x]){if(!(Ko(p)&&(j.tagNameCheck instanceof RegExp&&me(j.tagNameCheck,p)||j.tagNameCheck instanceof Function&&j.tagNameCheck(p))&&(j.attributeNameCheck instanceof RegExp&&me(j.attributeNameCheck,x)||j.attributeNameCheck instanceof Function&&j.attributeNameCheck(x))||x==="is"&&j.allowCustomizedBuiltInElements&&(j.tagNameCheck instanceof RegExp&&me(j.tagNameCheck,_)||j.tagNameCheck instanceof Function&&j.tagNameCheck(_))))return!1}else if(!Mi[x]){if(!me(it,je(_,gt,""))){if(!((x==="src"||x==="xlink:href"||x==="href")&&p!=="script"&&tn(_,"data:")===0&&Oo[p])){if(!(xt&&!me(It,je(_,gt,"")))){if(_)return!1}}}}}}return!0},Ko=function(p){return p.indexOf("-")>0},Yo=function(p){var x,_,N,ge;Ae("beforeSanitizeAttributes",p,null);var pe=p.attributes;if(!!pe){var de={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:J};for(ge=pe.length;ge--;){x=pe[ge];var li=x,ve=li.name,Xo=li.namespaceURI;if(_=ve==="value"?x.value:on(x.value),N=nt(ve),de.attrName=N,de.attrValue=_,de.keepAttr=!0,de.forceKeepAttr=void 0,Ae("uponSanitizeAttribute",p,de),_=de.attrValue,!de.forceKeepAttr&&(Vo(ve,p),!!de.keepAttr)){if(me(/\/>/i,_)){Vo(ve,p);continue}ze&&(_=je(_,et," "),_=je(_,tt," "));var Cr=nt(p.nodeName);if(!!qo(Cr,N,_))try{Xo?p.setAttributeNS(Xo,ve,_):p.setAttribute(ve,_),ba(e.removed)}catch{}}}Ae("afterSanitizeAttributes",p,null)}},_r=function S(p){var x,_=Go(p);for(Ae("beforeSanitizeShadowDOM",p,null);x=_.nextNode();)Ae("uponSanitizeShadowNode",x,null),!Qo(x)&&(x.content instanceof o&&S(x.content),Yo(x));Ae("afterSanitizeShadowDOM",p,null)};return e.sanitize=function(S,p){var x,_,N,ge,pe;if(Pi=!S,Pi&&(S="<!-->"),typeof S!="string"&&!Rt(S)){if(typeof S.toString!="function")throw ji("toString is not a function");if(S=S.toString(),typeof S!="string")throw ji("dirty is not a string, aborting")}if(!e.isSupported){if(ut(a.toStaticHTML)==="object"||typeof a.toStaticHTML=="function"){if(typeof S=="string")return a.toStaticHTML(S);if(Rt(S))return a.toStaticHTML(S.outerHTML)}return S}if(rt||Di(p),e.removed=[],typeof S=="string"&&(Ot=!1),Ot){if(S.nodeName){var de=nt(S.nodeName);if(!X[de]||Pe[de])throw ji("root node is forbidden and cannot be sanitized in-place")}}else if(S instanceof n)x=jo("<!---->"),_=x.ownerDocument.importNode(S,!0),_.nodeType===1&&_.nodeName==="BODY"||_.nodeName==="HTML"?x=_:x.appendChild(_);else{if(!De&&!ze&&!$e&&S.indexOf("<")===-1)return q&&ri?q.createHTML(S):S;if(x=jo(S),!x)return De?null:ri?W:""}x&&st&&Fe(x.firstChild);for(var li=Go(Ot?S:x);N=li.nextNode();)N.nodeType===3&&N===ge||Qo(N)||(N.content instanceof o&&_r(N.content),Yo(N),ge=N);if(ge=null,Ot)return S;if(De){if(ai)for(pe=He.call(x.ownerDocument);x.firstChild;)pe.appendChild(x.firstChild);else pe=x;return J.shadowroot&&(pe=Y.call(t,pe,!0)),pe}var ve=$e?x.outerHTML:x.innerHTML;return $e&&X["!doctype"]&&x.ownerDocument&&x.ownerDocument.doctype&&x.ownerDocument.doctype.name&&me(vn,x.ownerDocument.doctype.name)&&(ve="<!DOCTYPE "+x.ownerDocument.doctype.name+`>
`+ve),ze&&(ve=je(ve,et," "),ve=je(ve,tt," ")),q&&ri?q.createHTML(ve):ve},e.setConfig=function(S){Di(S),rt=!0},e.clearConfig=function(){St=null,rt=!1},e.isValidAttribute=function(S,p,x){St||Di({});var _=nt(S),N=nt(p);return qo(_,N,x)},e.addHook=function(S,p){typeof p=="function"&&(se[S]=se[S]||[],Ht(se[S],p))},e.removeHook=function(S){if(se[S])return ba(se[S])},e.removeHooks=function(S){se[S]&&(se[S]=[])},e.removeAllHooks=function(){se={}},e}var fi=cr(),$;(function(a){a.default="default",a.relevance="relevance",a.alltimeview="alltimeview",a.weeklyview="weeklyview",a.title="title",a.date="date",a.datearchived="datearchived",a.datereviewed="datereviewed",a.dateadded="dateadded",a.creator="creator"})($||($={}));const ht={default:"",relevance:"Relevance",alltimeview:"All-time views",weeklyview:"Weekly views",title:"Title",date:"Date published",datearchived:"Date archived",datereviewed:"Date reviewed",dateadded:"Date added",creator:"Creator"},Ca={default:null,relevance:null,alltimeview:"desc",weeklyview:"desc",title:"asc",date:"desc",datearchived:"desc",datereviewed:"desc",dateadded:"desc",creator:"asc"},gn={default:null,relevance:null,alltimeview:"downloads",weeklyview:"week",title:"titleSorter",date:"date",datearchived:"publicdate",datereviewed:"reviewdate",dateadded:"addeddate",creator:"creatorSorter"},bn={week:$.weeklyview,downloads:$.alltimeview,titleSorter:$.title,date:$.date,publicdate:$.datearchived,reviewdate:$.datereviewed,addeddate:$.dateadded,creatorSorter:$.creator},yn={week:"week",downloads:"downloads",titleSorter:"title",date:"date",publicdate:"publicdate",reviewdate:"reviewdate",addeddate:"addeddate",creatorSorter:"creator"},$a={week:$.weeklyview,downloads:$.alltimeview,title:$.title,titleSorter:$.title,date:$.date,publicdate:$.datearchived,reviewdate:$.datereviewed,addeddate:$.dateadded,creator:$.creator,creatorSorter:$.creator},wn={title:"firstTitle",creator:"firstCreator"},ei=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{}}),xn=["mediatype","lending","year","subject","collection","creator","language"],Ci={subject:"Subject",lending:"Availability",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year"},fo={subject:Z.COUNT,lending:Z.COUNT,mediatype:Z.COUNT,language:Z.COUNT,creator:Z.COUNT,collection:Z.COUNT,year:Z.NUMERIC},_n={subject:Z.ALPHABETICAL,lending:Z.ALPHABETICAL,mediatype:Z.ALPHABETICAL,language:Z.ALPHABETICAL,creator:Z.ALPHABETICAL,collection:Z.ALPHABETICAL,year:Z.NUMERIC},Cn={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},Sa={is_lendable:"Lending Library",available_to_borrow:"Borrow 14 Days",is_readable:"Always Available"},Po={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0};let $i=class extends ce{constructor(){super(...arguments),this.collectionLinks=[]}render(){return h`
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
    `}get imageBlockTemplate(){if(!this.model)return y;const e=this.model.mediatype==="collection",t=this.displayValueProvider.itemPageUrl(this.model.identifier,e);return h`<a href=${t}>
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
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate} ${this.textSnippetsTemplate}
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
        >`:this.detailsLink(this.model.identifier,this.model.title,this.model.mediatype==="collection"):y}get itemLineTemplate(){const e=this.sourceTemplate,t=this.volumeTemplate,i=this.issueTemplate;return!e&&!t&&!i?y:h` <div id="item-line">${e} ${t} ${i}</div> `}get sourceTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.source?h`
      <div id="source" class="metadata">
        ${this.labelTemplate(O("Source"))}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:y}get volumeTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.volume,O("Volume"))}get issueTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.issue,O("Issue"))}get creatorTemplate(){var e,t,i;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"?h`
        <div id="creator" class="metadata">
          <span class="label"
            >${(t=this.displayValueProvider.accountLabel)!==null&&t!==void 0?t:y}</span
          >
        </div>
      `:!(!((i=this.model)===null||i===void 0)&&i.creators)||this.model.creators.length===0?y:h`
      <div id="creator" class="metadata">
        ${this.labelTemplate(O("By"))}
        ${ui(ho(this.model.creators,o=>this.searchLink("creator",o)),", ")}
      </div>
    `}get datePublishedTemplate(){var e;const t=(e=this.model)===null||e===void 0?void 0:e.datePublished;let i="long";return Lo(t)&&(i="year-only"),this.metadataTemplate(wi(t,i),O("Published"))}get dateSortByTemplate(){return this.sortParam&&(this.sortParam.field==="addeddate"||this.sortParam.field==="reviewdate"||this.sortParam.field==="publicdate")?this.metadataTemplate(wi(this.date,"long"),this.displayValueProvider.dateLabel):y}get viewsTemplate(){var e,t,i;const o=((e=this.sortParam)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount;return this.metadataTemplate(`${Vt(o!=null?o:0,this.formatSize)}`,O("Views"))}get ratingTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.averageRating,O("Avg Rating"))}get reviewsTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.commentCount,O("Reviews"))}get topicsTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.subjects)||this.model.subjects.length===0?y:h`
      <div id="topics" class="metadata">
        ${this.labelTemplate(O("Topics"))}
        ${ui(ho(this.model.subjects,t=>this.searchLink("subject",t)),", ")}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?y:h`
      <div id="collections" class="metadata">
        ${this.labelTemplate(O("Collections"))}
        ${ui(this.collectionLinks,", ")}
      </div>
    `}get descriptionTemplate(){var e,t,i;return this.metadataTemplate(Hs(fi.sanitize((i=(t=(e=this.model)===null||e===void 0?void 0:e.description)===null||t===void 0?void 0:t.replace(/\n/g," "))!==null&&i!==void 0?i:"")),"","description")}get textSnippetsTemplate(){var e;return this.hasSnippets?h`<text-snippet-block
      viewsize="list"
      .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}
    ></text-snippet-block>`:y}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}metadataTemplate(e,t="",i){return e?h`
      <div id=${Mo(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:y}labelTemplate(e){return h` ${e?h`<span class="label">${e}: </span>`:y}`}searchLink(e,t){if(!e||!t)return y;const i=encodeURIComponent(`${e}:"${t}"`);return h`<a
      href="${this.baseNavigationUrl}/search?query=${i}"
      rel="nofollow"
    >
      ${fi.sanitize(t)}</a
    >`}detailsLink(e,t,i=!1){const o=t!=null?t:e,r=this.displayValueProvider.itemPageUrl(e,i);return h`<a href=${r}> ${fi.sanitize(o)} </a>`}get mediatypeURL(){var e;if(this.baseNavigationUrl===void 0||!(!((e=this.model)===null||e===void 0)&&e.mediatype))return y;switch(this.model.mediatype){case"collection":return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case"account":return y;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(e){e.has("model")&&this.fetchCollectionNames()}async fetchCollectionNames(){var e,t;if(!(!((e=this.model)===null||e===void 0)&&e.collections)||this.model.collections.length===0||!this.collectionNameCache)return;this.collectionLinks=[];const i=[],o=[];for(const r of this.model.collections)!Po[r]&&!r.startsWith("fav-")&&o.push((t=this.collectionNameCache)===null||t===void 0?void 0:t.collectionNameFor(r).then(n=>{i.push(this.detailsLink(r,n!=null?n:r,!0))}));await Promise.all(o),this.collectionLinks=i}get date(){var e,t,i,o,r;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(r=this.model)===null||r===void 0?void 0:r.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return m`
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
    `}};s([c({type:Object})],$i.prototype,"collectionNameCache",void 0);s([T()],$i.prototype,"collectionLinks",void 0);$i=s([F("tile-list")],$i);let Xe=class extends A{constructor(){super(...arguments),this.loggedIn=!1}render(){return h`
      <div id="container">
        <tile-list
          .model=${this.model}
          .baseNavigationUrl=${this.baseNavigationUrl}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .sortParam=${this.sortParam}
          .collectionNameCache=${this.collectionNameCache}
        ></tile-list>
      </div>
    `}static get styles(){return m`
      :host {
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition: opacity 0.1s ease-in, transform 0.1s ease-in;
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
        padding: 10px;
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
    `}};s([c({type:Object})],Xe.prototype,"model",void 0);s([c({type:String})],Xe.prototype,"baseNavigationUrl",void 0);s([c({type:String})],Xe.prototype,"baseImageUrl",void 0);s([c({type:Boolean})],Xe.prototype,"loggedIn",void 0);s([c({type:Object})],Xe.prototype,"sortParam",void 0);s([c({type:Object})],Xe.prototype,"collectionNameCache",void 0);Xe=s([F("tile-hover-pane")],Xe);let ka=class extends ce{render(){var e,t,i,o,r,n;return h`
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
          >${fi.sanitize((t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"")}</a
        >
        <div id="creator">
          ${((i=this.model)===null||i===void 0?void 0:i.mediatype)==="account"?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">${wi(this.date,this.dateFormatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(o=this.model)===null||o===void 0?void 0:o.mediatype}
            .collections=${(r=this.model)===null||r===void 0?void 0:r.collections}
          >
          </mediatype-icon>
        </div>
        <div id="views">${Vt((n=this.views)!==null&&n!==void 0?n:0,this.formatSize)}</div>
      </div>
    `}get href(){var e;return!(!((e=this.model)===null||e===void 0)&&e.identifier)||this.baseNavigationUrl==null?y:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get creator(){var e;return(e=this.displayValueProvider.firstCreatorMatchingFilter)!==null&&e!==void 0?e:y}get date(){var e,t,i,o,r;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"publicdate":return(t=this.model)===null||t===void 0?void 0:t.dateArchived;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(r=this.model)===null||r===void 0?void 0:r.datePublished}}get views(){var e,t,i;return((e=this.sortParam)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get dateFormatSize(){var e,t;return(!this.isSortedByDate||((e=this.sortParam)===null||e===void 0?void 0:e.field)==="date")&&Lo((t=this.model)===null||t===void 0?void 0:t.datePublished)?"year-only":this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.sortParam)===null||e===void 0?void 0:e.field)}static get styles(){return m`
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
        padding-bottom: 5px;
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
    `}};ka=s([F("tile-list-compact")],ka);let Ta=class extends ce{render(){return h`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${O("Title")}</div>
        <div id="creator">${O("Creator")}</div>
        <div id="date">${this.displayValueProvider.dateLabel}</div>
        <div id="icon">${O("Type")}</div>
        <div id="views">${O("Views")}</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return m`
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
    `}};Ta=s([F("tile-list-compact-header")],Ta);const za=(a,e=-1/0,t=1/0)=>Math.max(e,Math.min(a,t));class $n{constructor(e,t={}){var i,o,r,n,l,d,u;this.host=e,this.mobileBreakpoint=600,this.offsetX=-10,this.offsetY=15,this.showDelay=300,this.hideDelay=100,this.longPressDelay=600,this.enableLongPress=!1,this.hoverPaneState="hidden",this.forceTouchBackdrop=!1,this.lastPointerClientPos={x:0,y:0},this.handleMouseEnter=v=>{this.handleMouseMove(v)},this.handleMouseMove=v=>{var f;clearTimeout(this.hideTimer),this.hoverPaneState==="fading-out"&&(this.hoverPaneState="shown",(f=this.hoverPane)===null||f===void 0||f.classList.add("fade-in")),this.hoverPaneState==="hidden"&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:v.clientX,y:v.clientY})},this.handleMouseLeave=()=>{clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.hoverPaneState!=="hidden"&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))},this.handleTouchStart=v=>{clearTimeout(this.longPressTimer),v.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState==="hidden"&&this.showHoverPane()},this.longPressDelay),this.lastPointerClientPos={x:v.touches[0].clientX,y:v.touches[0].clientY})},this.handleLongPressCancel=()=>{clearTimeout(this.longPressTimer)},this.handleContextMenu=v=>{v.preventDefault()},this.handleBackdropInteraction=v=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane(),v.stopPropagation()},this.mobileBreakpoint=(i=t.mobileBreakpoint)!==null&&i!==void 0?i:this.mobileBreakpoint,this.offsetX=(o=t.offsetX)!==null&&o!==void 0?o:this.offsetX,this.offsetY=(r=t.offsetY)!==null&&r!==void 0?r:this.offsetY,this.showDelay=(n=t.showDelay)!==null&&n!==void 0?n:this.showDelay,this.hideDelay=(l=t.hideDelay)!==null&&l!==void 0?l:this.hideDelay,this.longPressDelay=(d=t.longPressDelay)!==null&&d!==void 0?d:this.longPressDelay,this.enableLongPress=(u=t.enableLongPress)!==null&&u!==void 0?u:this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){var e,t,i,o,r,n;return this.shouldRenderHoverPane?h` ${this.touchBackdropTemplate}
          <tile-hover-pane
            .model=${(e=this.hoverPaneProps)===null||e===void 0?void 0:e.model}
            .baseNavigationUrl=${(t=this.hoverPaneProps)===null||t===void 0?void 0:t.baseNavigationUrl}
            .baseImageUrl=${(i=this.hoverPaneProps)===null||i===void 0?void 0:i.baseImageUrl}
            .loggedIn=${(o=this.hoverPaneProps)===null||o===void 0?void 0:o.loggedIn}
            .sortParam=${(r=this.hoverPaneProps)===null||r===void 0?void 0:r.sortParam}
            .collectionNameCache=${(n=this.hoverPaneProps)===null||n===void 0?void 0:n.collectionNameCache}
          ></tile-hover-pane>`:y}toggleHoverPane(e){var t;this.hoverPaneState==="shown"?(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1):(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=(t=e.enableTouchBackdrop)!==null&&t!==void 0?t:!1,this.showHoverPane())}get touchBackdropTemplate(){return this.showTouchBackdrop?h`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:y}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}get isTouchEnabled(){return"ontouchstart"in window&&window.matchMedia("(any-pointer: coarse)").matches}get shouldRenderHoverPane(){return this.hoverPaneState!=="hidden"}get hoverPaneDesiredOffsets(){var e;let[t,i]=[this.lastPointerClientPos.x,this.lastPointerClientPos.y];const o=this.lastPointerClientPos.x>window.innerWidth/2,r=this.lastPointerClientPos.y>window.innerHeight/2,n=(e=this.hoverPane)===null||e===void 0?void 0:e.getBoundingClientRect();n&&(o&&(t-=n.width),r&&(i-=n.height),t+=(o?-1:1)*this.offsetX,i+=(r?-1:1)*this.offsetY,this.isMobileView&&(t=za(t,20,window.innerWidth-n.width-20),i=za(i,20,window.innerHeight-n.height-20)));const l=this.host.getBoundingClientRect();return t-=l.left,i-=l.top,{left:t,top:i}}attachListeners(){this.isHoverEnabled&&(this.host.addEventListener("mouseenter",this.handleMouseEnter),this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseleave",this.handleMouseLeave)),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener("touchstart",this.handleTouchStart),this.host.addEventListener("touchmove",this.handleLongPressCancel),this.host.addEventListener("touchend",this.handleLongPressCancel),this.host.addEventListener("touchcancel",this.handleLongPressCancel),this.host.addEventListener("contextmenu",this.handleContextMenu))}detachListeners(){this.host.removeEventListener("mouseenter",this.handleMouseEnter),this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseleave",this.handleMouseLeave),this.host.removeEventListener("touchstart",this.handleTouchStart),this.host.removeEventListener("touchmove",this.handleLongPressCancel),this.host.removeEventListener("touchend",this.handleLongPressCancel),this.host.removeEventListener("touchcancel",this.handleLongPressCancel),this.host.removeEventListener("contextmenu",this.handleContextMenu)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.showHoverPane()},this.showDelay)}async showHoverPane(){var e;this.hoverPaneState="shown",this.host.requestUpdate(),await this.host.updateComplete,await new Promise(t=>{requestAnimationFrame(t)}),this.repositionHoverPane(),(e=this.hoverPane)===null||e===void 0||e.classList.add("visible","fade-in")}fadeOutHoverPane(){var e;this.hoverPaneState="fading-out",(e=this.hoverPane)===null||e===void 0||e.classList.remove("fade-in"),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState="hidden",this.host.requestUpdate()},100)}repositionHoverPane(){if(!this.hoverPane)return;const{top:e,left:t}=this.hoverPaneDesiredOffsets;this.hoverPane.style.top=`${e}px`,this.hoverPane.style.left=`${t}px`}}var go;let Ne=go=class extends ce{constructor(){super(...arguments),this.enableHoverPane=!1}render(){var e,t;const i=this.tileDisplayMode==="grid",o=(t=(e=this.hoverPaneController)===null||e===void 0?void 0:e.getTemplate())!==null&&t!==void 0?t:y;return h`
      <div id="container" class=${i?"hoverable":y}>
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
        ${o}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new $n(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){const{currentWidth:e,sortParam:t,mobileBreakpoint:i}=this;return h`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t}
        .mobileBreakpoint=${i}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return h`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t,i;return h`
      <a
        href=${this.linkTileHref}
        aria-label=${(t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"Untitled item"}
        title=${this.shouldPrepareHoverPane?y:Mo((i=this.model)===null||i===void 0?void 0:i.title)}
        @click=${()=>this.dispatchEvent(new CustomEvent("resultSelected",{detail:this.model}))}
      >
        ${this.tile}
      </a>
    `}get linkTileHref(){var e;return!(!((e=this.model)===null||e===void 0)&&e.identifier)||this.baseNavigationUrl==null?y:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get shouldPrepareHoverPane(){return this.enableHoverPane&&!!this.tileDisplayMode&&go.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e==null||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),(e=this.resizeObserver)===null||e===void 0||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}tileInfoButtonPressed(e){var t;(t=this.hoverPaneController)===null||t===void 0||t.toggleHoverPane({coords:e.detail,enableTouchBackdrop:!0})}get tile(){const{model:e,collectionPagePath:t,baseNavigationUrl:i,currentWidth:o,currentHeight:r,sortParam:n,creatorFilter:l,mobileBreakpoint:d}=this;if(!e)return y;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return h`<collection-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${r}
              .creatorFilter=${l}
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
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;default:return h`<item-tile
              .model=${e}
              .collectionPagePath=${t}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${n}
              .creatorFilter=${l}
              .loggedIn=${this.loggedIn}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case"list-compact":return h`<tile-list-compact
          .model=${e}
          .collectionPagePath=${t}
          .currentWidth=${o}
          .currentHeight=${r}
          .baseNavigationUrl=${i}
          .sortParam=${n}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list-compact>`;case"list-detail":return h`<tile-list
          .model=${e}
          .collectionPagePath=${t}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${o}
          .currentHeight=${r}
          .baseNavigationUrl=${i}
          .sortParam=${n}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list>`;default:return y}}static get styles(){return m`
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
    `}};Ne.HOVER_PANE_DISPLAY_MODES={grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1};s([c({type:String})],Ne.prototype,"tileDisplayMode",void 0);s([c({type:Object})],Ne.prototype,"resizeObserver",void 0);s([c({type:Object})],Ne.prototype,"collectionNameCache",void 0);s([c({type:Boolean})],Ne.prototype,"enableHoverPane",void 0);s([Q("#container")],Ne.prototype,"container",void 0);s([Q("tile-hover-pane")],Ne.prototype,"hoverPane",void 0);Ne=go=s([F("tile-dispatcher")],Ne);let Ma=class extends A{render(){return h` <div id="container"></div> `}static get styles(){return m`
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
    `}};Ma=s([F("collection-browser-loading-tile")],Ma);let xe=class extends A{constructor(){super(...arguments),this.open=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.openViaCaret=!0,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.handlingCaretClick=!1}renderOption(e){const{label:t,url:i=void 0,id:o}=e;let r;const n=this.selectedOption===o?"selected":"";return i?r=h`<a
        href=${i}
        @click=${()=>this.optionClicked(e)}
        >${t}</a
      >`:r=h`<button
        @click=${()=>this.optionClicked(e)}
      >
        ${t}
      </button>`,h`<li class=${n}>${r}</li>`}optionClicked(e){var t;this.selectedOption!==e.id&&(this.selectedOption=e.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:e}})),(t=e.selectedHandler)===null||t===void 0||t.call(e,e)),this.closeOnSelect&&(this.open=!1)}toggleOptions(){this.open=!this.open}mainButtonClicked(){if(this.handlingCaretClick){this.handlingCaretClick=!1;return}this.openViaButton&&this.toggleOptions()}caretInteracted(){this.openViaCaret&&this.toggleOptions()}caretClicked(){this.handlingCaretClick=!0,this.caretInteracted()}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.caretInteracted())}get caret(){return this.open?this.caretUp:this.caretDown}get dropdownState(){return this.open?"open":"closed"}get caretUp(){return I`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
    <path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
      fill=""></path>
  </svg>`}get caretDown(){return I`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
    <path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
    fill=""></path>
  </svg>`}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}render(){return h`
      <div class="ia-dropdown-group">
        <button @click=${this.mainButtonClicked} class="click-main">
          <span class="cta sr-only">Toggle ${this.optionGroup}</span>
          <slot name="dropdown-label"></slot>
          ${this.displayCaret?h`
                <span
                  class="caret"
                  tabindex=${this.openViaCaret&&!this.openViaButton?"0":y}
                  role=${this.openViaCaret?"button":y}
                  @click=${this.caretClicked}
                  @keydown=${this.caretKeyDown}
                >
                  ${this.caret}
                </span>
              `:y}
        </button>

        <ul class="dropdown-main ${this.dropdownState}">
          ${this.availableOptions.map(e=>this.renderOption(e))}
        </ul>
      </div>
    `}static get styles(){const e=m`var(--dropdownBorderWidth, 1px)`,t=m`var(--dropdownBorderRadius, 4px)`,i=m`var(--dropdownBorderColor, #fff)`,o=m`var(--dropdownBgColor, #333)`,r=m`var(--dropdownTextColor, #fff)`,n=m`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=m`var(--dropdownSelectedBgColor, #fff)`;return m`
      :host {
        display: inline;
        color: ${r};
      }

      svg.caret-up-svg,
      svg.caret-down-svg {
        fill: var(--dropdownCaretColor, #fff);
        vertical-align: middle;
      }

      button.click-main {
        background: transparent;
        color: inherit;
        padding: var(--dropdownMainButtonPadding, 0px);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: center;
        flex-wrap: nowrap;
        flex-direction: row;
      }

      button slot {
        padding-right: 5px;
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

      ul {
        z-index: var(--dropdownListZIndex, 1);
      }

      ul.dropdown-main.closed {
        visibility: hidden;
        height: 1px;
        width: 1px;
      }

      ul.dropdown-main {
        position: absolute;
        list-style: none;
        margin: var(--dropdownOffsetTop, 5px) 0 0 0;
        padding: 0;
        color: ${r};
        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e}) solid
          ${i};
        border-right: var(--dropdownBorderRightWidth, ${e})
          solid ${i};
        border-bottom: var(--dropdownBorderBottomWidth, ${e})
          solid ${i};
        border-left: var(--dropdownBorderLeftWidth, ${e})
          solid ${i};

        border-radius: var(
            --dropdownBorderTopLeftRadius,
            ${t}
          )
          var(--dropdownBorderTopRightRadius, ${t})
          var(--dropdownBorderBottomRightRadius, ${t})
          var(--dropdownBorderBottomLeftRadius, ${t});

        white-space: var(--dropdownWhiteSpace, normal);
      }

      ul.dropdown-main {
        background: ${o};
      }

      ul.dropdown-main li:hover {
        background-color: ${n};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      ul.dropdown-main li:hover:first-child {
        border-top-color: ${n};
      }

      ul.dropdown-main li:hover:last-child {
        border-bottom-color: ${n};
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
        background-color: ${n};
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
    `}};s([c({type:Boolean,attribute:!0})],xe.prototype,"open",void 0);s([c({type:Boolean,attribute:!0})],xe.prototype,"displayCaret",void 0);s([c({type:Boolean,attribute:!0})],xe.prototype,"closeOnSelect",void 0);s([c({type:Boolean,attribute:!0})],xe.prototype,"openViaButton",void 0);s([c({type:Boolean,attribute:!0})],xe.prototype,"openViaCaret",void 0);s([c({type:Boolean,attribute:!0})],xe.prototype,"includeSelectedOption",void 0);s([c({type:String,attribute:!0})],xe.prototype,"selectedOption",void 0);s([c({type:Array})],xe.prototype,"options",void 0);s([c({type:String})],xe.prototype,"optionGroup",void 0);s([c({type:Function})],xe.prototype,"optionSelected",void 0);xe=s([F("ia-dropdown")],xe);let bo=class extends A{render(){return h`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};bo.styles=m`
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
      height: 100%;
    }
  `;bo=s([F("ia-icon-label")],bo);let yo=class extends A{constructor(){super(...arguments),this.numResults=0}render(){return h`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?"result":"results"}
        </div>
      </div>
    `}static get styles(){const e=m`var(--tooltipArrowSize, 5px)`,t=m`var(--tooltipArrowOffset, 0px)`;return m`
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
    `}};s([c({type:Number})],yo.prototype,"numResults",void 0);yo=s([F("alpha-bar-tooltip")],yo);let Ue=class extends A{constructor(){super(...arguments),this.selectedLetter=null,this.tooltipShown=!1,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return(e=this.selectedLetter)===null||e===void 0?void 0:e.toUpperCase()}render(){var e;return h`
      <section id="container" aria-label=${(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:y}>
        <ul>
          ${this.alphabet.map(t=>h`
                <li
                  class=${t===this.selectedUppercaseLetter?"selected":y}
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
    `}tooltipTemplate(e){var t,i;return this.hoveredLetter!==e?y:this.tooltipShown?h`<alpha-bar-tooltip
          data-letter=${e}
          .numResults=${(i=(t=this.letterCounts)===null||t===void 0?void 0:t[this.hoveredLetter])!==null&&i!==void 0?i:0}
        ></alpha-bar-tooltip>`:y}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(e){var t,i;const o=e.target;if(o&&!this.tooltipShown){const r=(i=(t=o.textContent)===null||t===void 0?void 0:t.trim())!==null&&i!==void 0?i:void 0;this.tooltipShown=!0,this.hoveredLetter=r,await this.updateComplete,await new Promise(n=>{setTimeout(n,0)}),this.tooltip&&this.tooltip.dataset.letter===r&&this.positionTooltip(o)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(e){if(!this.tooltip)return;const t=this.tooltip.clientWidth;let o=e.clientWidth/2-t/2;const r=getComputedStyle(document.body),n=parseFloat(r.getPropertyValue("margin-left")),l=parseFloat(r.getPropertyValue("margin-right")),d=document.body.clientWidth+n+l,v=e.getBoundingClientRect().left+o,f=v+t,g=1;let w;v<g?w=v-g:f>d-g&&(w=f-d+g),w&&(o-=w,this.tooltip.style.setProperty("--tooltipArrowOffset",`${w}px`)),this.tooltip.style.left=`${o}px`,this.tooltip.classList.add("fade-in")}};Ue.styles=m`
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
  `;s([c({type:String})],Ue.prototype,"selectedLetter",void 0);s([c({type:Object})],Ue.prototype,"letterCounts",void 0);s([c({type:String})],Ue.prototype,"ariaLandmarkLabel",void 0);s([T()],Ue.prototype,"tooltipShown",void 0);s([T()],Ue.prototype,"hoveredLetter",void 0);s([Q("alpha-bar-tooltip")],Ue.prototype,"tooltip",void 0);Ue=s([F("alpha-bar")],Ue);const Sn=h`
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
`,kn=h`
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
`,Tn=h`
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
`,zn=I`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,Mn=I`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,En=I`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let ee=class extends A{constructor(){super(...arguments),this.defaultSortDirection=null,this.defaultSortField=$.relevance,this.sortDirection=null,this.selectedSort=$.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.showRelevance=!0,this.alphaSelectorVisible=null,this.dropdownBackdropVisible=!1,this.desktopSortContainerWidth=0,this.selectorBarContainerWidth=0,this.boundSortBarSelectorEscapeListener=e=>{e.key==="Escape"&&this.closeDropdowns()}}render(){return h`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <div class="sort-direction-container">
            ${this.sortDirectionSelectorTemplate}
          </div>
          <span class="sort-by-text">Sort by:</span>

          <div id="sort-selector-container">
            ${this.mobileSortSelectorTemplate}
            ${this.desktopSortSelectorTemplate}
          </div>

          <div id="display-style-selector">${this.displayOptionTemplate}</div>
        </section>

        ${this.dropdownBackdropVisible?this.dropdownBackdrop:y}
        ${this.alphaBarTemplate}
      </div>
    `}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedSort")&&this.sortDirection===null&&(this.sortDirection=Ca[this.finalizedSortField]),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dropdownBackdropVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener("keydown",this.boundSortBarSelectorEscapeListener):document.removeEventListener("keydown",this.boundSortBarSelectorEscapeListener)}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){e.removeObserver({target:this.sortSelectorContainer,handler:this}),e.removeObserver({target:this.desktopSortContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||(this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.resizeObserver.addObserver({target:this.desktopSortContainer,handler:this}))}handleResize(e){e.target===this.desktopSortContainer?this.desktopSortContainerWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSortContainerWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return y;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return y}get sortDirectionSelectorTemplate(){const t=`Change to ${this.sortDirection==="asc"?"descending":"ascending"} sort`;return h`
      <button
        class="sort-direction-selector"
        ?disabled=${this.finalizedSortField===$.relevance}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${t}</span>
        ${this.sortDirectionIcon}
      </button>
    `}get sortDirectionIcon(){return this.finalizedSortField===$.relevance?h`<div class="sort-direction-icon">${Tn}</div>`:h`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection==="asc"?Sn:kn}
      </div>
    `}get desktopSortSelectorTemplate(){return h`
      <div
        id="desktop-sort-container"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <ul id="desktop-sort-selector">
          ${this.showRelevance?h`<li>
                ${this.getSortDisplayOption($.relevance,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==$.relevance&&(this.clearAlphaBarFilters(),this.setSelectedSort($.relevance))}})}
              </li>`:y}
          <li>${this.viewsDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption($.title,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==$.title&&(this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.setSelectedSort($.title),this.emitCreatorLetterChangedEvent())}})}
          </li>
          <li>${this.dateDropdownTemplate}</li>
          <li>
            ${this.getSortDisplayOption($.creator,{onClick:()=>{this.dropdownBackdropVisible=!1,this.finalizedSortField!==$.creator&&(this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.setSelectedSort($.creator),this.emitTitleLetterChangedEvent())}})}
          </li>
        </ul>
      </div>
    `}get mobileSortSelectorTemplate(){var e;const t=i=>i!==$.default&&(i!==$.relevance||this.showRelevance);return h`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${this.getSortDropdown({displayName:h`${(e=ht[this.finalizedSortField])!==null&&e!==void 0?e:"Relevance"}`,id:"mobile-dropdown",selected:!0,dropdownOptions:Object.keys($).filter(i=>t(i)).map(i=>this.getDropdownOption(i)),selectedOption:this.finalizedSortField,onOptionSelected:this.mobileSortChanged,onDropdownClick:()=>{this.dropdownBackdropVisible=this.mobileDropdown.open,this.mobileDropdown.classList.toggle("open",this.mobileDropdown.open)}})}
      </div>
    `}getSortDisplayOption(e,t){var i,o;const r=(i=t==null?void 0:t.selected)!==null&&i!==void 0?i:this.finalizedSortField===e,n=(o=t==null?void 0:t.displayName)!==null&&o!==void 0?o:ht[e];return h`
      <button
        class=${r?"selected":y}
        data-title="${n}"
        @click=${l=>{var d;l.preventDefault(),(d=t==null?void 0:t.onClick)===null||d===void 0||d.call(t,l)}}
      >
        ${n}
      </button>
    `}getSortDropdown(e){var t,i,o,r,n;return h`
      <ia-dropdown
        id=${(t=e.id)!==null&&t!==void 0?t:y}
        class=${e.selected?"selected":y}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${e.selected}
        .options=${e.dropdownOptions}
        .selectedOption=${(i=e.selectedOption)!==null&&i!==void 0?i:""}
        @optionSelected=${(o=e.onOptionSelected)!==null&&o!==void 0?o:y}
        @click=${(r=e.onDropdownClick)!==null&&r!==void 0?r:y}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title="${e.displayName.values}"
          @click=${(n=e.onLabelInteraction)!==null&&n!==void 0?n:y}
          @keydown=${e.onLabelInteraction?l=>{var d;(l.key==="Enter"||l.key===" ")&&((d=e.onLabelInteraction)===null||d===void 0||d.call(e,l))}:y}
        >
          ${e.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(e){return{id:e,selectedHandler:()=>{this.selectDropdownSortField(e)},label:h`
        <span class="dropdown-option-label">
          ${ht[e]}
        </span>
      `}}dropdownOptionSelected(e){this.dropdownBackdropVisible=!1,this.clearAlphaBarFilters(),this.setSelectedSort(e.detail.option.id)}get viewsDropdownTemplate(){return this.getSortDropdown({displayName:h`${this.viewSortField}`,id:"views-dropdown",selected:this.viewOptionSelected,dropdownOptions:[this.getDropdownOption($.weeklyview),this.getDropdownOption($.alltimeview)],selectedOption:this.viewOptionSelected?this.selectedSort:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.dateDropdown.open=!1,this.dropdownBackdropVisible=this.viewsDropdown.open,this.viewsDropdown.classList.toggle("open",this.viewsDropdown.open)},onLabelInteraction:e=>{!this.viewsDropdown.open&&!this.viewOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort($.weeklyview))}})}get dateDropdownTemplate(){return this.getSortDropdown({displayName:h`${this.dateSortField}`,id:"date-dropdown",selected:this.dateOptionSelected,dropdownOptions:[this.getDropdownOption($.date),this.getDropdownOption($.datearchived),this.getDropdownOption($.datereviewed),this.getDropdownOption($.dateadded)],selectedOption:this.dateOptionSelected?this.selectedSort:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.viewsDropdown.open=!1,this.dropdownBackdropVisible=this.dateDropdown.open,this.dateDropdown.classList.toggle("open",this.dateDropdown.open)},onLabelInteraction:e=>{!this.dateDropdown.open&&!this.dateOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort($.date))}})}mobileSortChanged(e){this.dropdownBackdropVisible=!1;const t=e.detail.option.id;this.setSelectedSort(t),this.alphaSelectorVisible=null,t!=="title"&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),t!=="creator"&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return h`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
          >
            ${zn}
          </button>
        </li>
        <li>
          <button
            id="list-detail-button"
            @click=${()=>{this.displayMode="list-detail"}}
            class=${this.displayMode==="list-detail"?"active":""}
            title="List view"
          >
            ${Mn}
          </button>
        </li>
        <li>
          <button
            id="list-compact-button"
            @click=${()=>{this.displayMode="list-compact"}}
            class=${this.displayMode==="list-compact"?"active":""}
            title="Compact list view"
          >
            ${En}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return h`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `}closeDropdowns(){this.dropdownBackdropVisible=!1;const e=[this.viewsDropdown,this.dateDropdown,this.mobileDropdown];for(const t of e)t.open=!1,t.classList.remove("open")}selectDropdownSortField(e){this.dropdownBackdropVisible=!1,this.setSelectedSort(e)}clearAlphaBarFilters(){this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()}setSortDirection(e){this.sortDirection=e,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection==="desc"?"asc":"desc")}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(e){this.selectedSort=e,this.sortDirection=Ca[this.selectedSort],this.emitSortChangedEvent()}get finalizedSortField(){return this.selectedSort===$.default?this.defaultSortField:this.selectedSort}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get dateOptionSelected(){return[$.datearchived,$.date,$.datereviewed,$.dateadded].includes(this.finalizedSortField)}get viewOptionSelected(){return[$.alltimeview,$.weeklyview].includes(this.finalizedSortField)}get dateSortField(){var e;const t=ht[$.date];return this.dateOptionSelected&&(e=ht[this.finalizedSortField])!==null&&e!==void 0?e:t}get viewSortField(){var e;const t=ht[$.weeklyview];return this.viewOptionSelected&&(e=ht[this.finalizedSortField])!==null&&e!==void 0?e:t}get titleSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}static get styles(){return[Je,m`
        #container {
          position: relative;
        }

        #sort-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #2c2c2c;
          font-size: 1.4rem;
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
          line-height: 2;
          color: var(--ia-theme-primary-text-color, #2c2c2c);
          white-space: nowrap;
          user-select: none;
        }
      `]}};s([c({type:String})],ee.prototype,"displayMode",void 0);s([c({type:String})],ee.prototype,"defaultSortDirection",void 0);s([c({type:String})],ee.prototype,"defaultSortField",void 0);s([c({type:String})],ee.prototype,"sortDirection",void 0);s([c({type:String})],ee.prototype,"selectedSort",void 0);s([c({type:String})],ee.prototype,"selectedTitleFilter",void 0);s([c({type:String})],ee.prototype,"selectedCreatorFilter",void 0);s([c({type:Boolean})],ee.prototype,"showRelevance",void 0);s([c({type:Object})],ee.prototype,"prefixFilterCountMap",void 0);s([c({type:Object})],ee.prototype,"resizeObserver",void 0);s([T()],ee.prototype,"alphaSelectorVisible",void 0);s([T()],ee.prototype,"dropdownBackdropVisible",void 0);s([T()],ee.prototype,"desktopSortContainerWidth",void 0);s([T()],ee.prototype,"selectorBarContainerWidth",void 0);s([Q("#desktop-sort-container")],ee.prototype,"desktopSortContainer",void 0);s([Q("#sort-selector-container")],ee.prototype,"sortSelectorContainer",void 0);s([Q("#views-dropdown")],ee.prototype,"viewsDropdown",void 0);s([Q("#date-dropdown")],ee.prototype,"dateDropdown",void 0);s([Q("#mobile-dropdown")],ee.prototype,"mobileDropdown",void 0);ee=s([F("sort-filter-bar")],ee);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=(a,e)=>{var t,i;const o=a._$AN;if(o===void 0)return!1;for(const r of o)(i=(t=r)._$AO)===null||i===void 0||i.call(t,e,!1),jt(r,e);return!0},Si=a=>{let e,t;do{if((e=a._$AM)===void 0)break;t=e._$AN,t.delete(a),a=e}while((t==null?void 0:t.size)===0)},hr=a=>{for(let e;e=a._$AM;a=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(a))break;t.add(a),Dn(e)}};function Ln(a){this._$AN!==void 0?(Si(this),this._$AM=a,hr(this)):this._$AM=a}function Pn(a,e=!1,t=0){const i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(i))for(let r=t;r<i.length;r++)jt(i[r],!1),Si(i[r]);else i!=null&&(jt(i,!1),Si(i));else jt(this,a)}const Dn=a=>{var e,t,i,o;a.type==Me.CHILD&&((e=(i=a)._$AP)!==null&&e!==void 0||(i._$AP=Pn),(t=(o=a)._$AQ)!==null&&t!==void 0||(o._$AQ=Ln))};class Fn extends oi{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),hr(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,o;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)===null||i===void 0||i.call(this):(o=this.disconnected)===null||o===void 0||o.call(this)),t&&(jt(this,e),Si(this))}setValue(e){if(or(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const Yi=new WeakMap,An=ii(class extends Fn{render(a){return y}update(a,[e]){var t;const i=e!==this.U;return i&&this.U!==void 0&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.U=e,this.ht=(t=a.options)===null||t===void 0?void 0:t.host,this.ot(this.lt=a.element)),y}ot(a){var e;if(typeof this.U=="function"){const t=(e=this.ht)!==null&&e!==void 0?e:globalThis;let i=Yi.get(t);i===void 0&&(i=new WeakMap,Yi.set(t,i)),i.get(this.U)!==void 0&&this.U.call(this.ht,void 0),i.set(this.U,a),a!==void 0&&this.U.call(this.ht,a)}else this.U.value=a}get rt(){var a,e,t;return typeof this.U=="function"?(e=Yi.get((a=this.ht)!==null&&a!==void 0?a:globalThis))===null||e===void 0?void 0:e.get(this.U):(t=this.U)===null||t===void 0?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ea=ii(class extends oi{constructor(a){if(super(a),a.type!==Me.PROPERTY&&a.type!==Me.ATTRIBUTE&&a.type!==Me.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!or(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[e]){if(e===be||e===y)return e;const t=a.element,i=a.name;if(a.type===Me.PROPERTY){if(e===t[i])return be}else if(a.type===Me.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return be}else if(a.type===Me.ATTRIBUTE&&t.getAttribute(i)===e+"")return be;return ar(a),e}}),Bn=Object.freeze({processing:"processing",complete:"complete"});class In extends A{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=Bn.processing}render(){return h`
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
    `}static get styles(){const e=m`var(--activityIndicatorCheckmarkColor, #31A481)`,t=m`var(--activityIndicatorCompletedRingColor, #31A481)`,i=m`var(--activityIndicatorLoadingRingColor, #333333)`,o=m`var(--activityIndicatorLoadingDotColor, #333333)`;return m`
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
    `}}window.customElements.define("ia-activity-indicator",In);Zi.extend(Mr);const On=180,Rn=40,Nn=10,Un=125,Hn=30,La="YYYY",Wn="no data",Vn=0,Pa=4,jn=m`var(--histogramDateRangeSliderColor, #4B65FE)`,Gn=m`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,Qn=m`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,qn=m`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,Kn=m`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,Yn=m`var(--histogramDateRangeInputRowMargin, 0)`,Xn=m`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,Zn=m`var(--histogramDateRangeInputWidth, 35px)`,Jn=m`var(--histogramDateRangeInputFontSize, 1.2rem)`,el=m`var(--histogramDateRangeInputFontFamily, sans-serif)`,Da=m`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,Fa=m`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,tl=m`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,il=m`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let G=class extends A{constructor(){super(...arguments),this.width=On,this.height=Rn,this.sliderWidth=Nn,this.tooltipWidth=Un,this.tooltipHeight=Hn,this.updateDelay=Vn,this.dateFormat=La,this.missingDataMessage=Wn,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this._tooltipOffset=0,this._tooltipVisible=!1,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,i=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}updated(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("width")||e.has("height"))&&this.handleDataUpdate()}handleDataUpdate(){!this.hasBinData||(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.getMSFromString(this.minDate),this._maxDateMS=this.getMSFromString(this.maxDate),this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate,this.requestUpdate())}calculateHistData(){const e=Math.min(...this.bins),t=Math.max(...this.bins),i=e===t?1:Math.log1p(t),o=this.height/i,r=this.dateRangeMS/this._numBins;return this.bins.map((n,l)=>({value:n,height:Math.floor(Math.log1p(n)*o),binStart:`${this.formatDate(l*r+this._minDateMS)}`,binEnd:`${this.formatDate((l+1)*r+this._minDateMS)}`}))}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t<=this.getMSFromString(this.maxSelectedDate);i&&o&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t>=this.getMSFromString(this.minSelectedDate);i&&o&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.translateDateToPosition(this.maxSelectedDate);return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){if(this._isDragging||this.disabled)return;const t=e.currentTarget,i=t.x.baseVal.value+this.sliderWidth/2,o=t.dataset,r=`item${o.numItems!=="1"?"s":""}`,n=Number(o.numItems).toLocaleString();this._tooltipOffset=i+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2,this._tooltipContent=h`
      ${n} ${r}<br />
      ${o.binStart} - ${o.binEnd}
    `,this._tooltipVisible=!0}hideTooltip(){this._tooltipContent=void 0,this._tooltipVisible=!1}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=e.clientX-i-t}translatePositionToDate(e){const t=Math.ceil((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const o=new Date(0,0);return o.setFullYear(Number(t)),o.getTime()}return Zi(t,[this.dateFormat,La]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,o=Math.abs(i-this.getMSFromString(this.minSelectedDate)),r=Math.abs(i-this.getMSFromString(this.maxSelectedDate));o<r?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=Pa,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=Pa,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const o=t==="slider-min"?1:-1;return I`
    <svg
      id="${t}"
      class="
      ${this.disabled?"":"draggable"}
      ${this._isDragging?"dragging":""}"
      @pointerdown="${this.drag}"
    >
      <path d="${i} z" fill="${jn}" />
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
    `}get selectedRangeTemplate(){return I`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${Gn}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(o=>{const r=I`
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
          fill="${i+t>=this.minSliderX&&i<=this.maxSliderX?Qn:Kn}"
          data-num-items="${o.value}"
          data-bin-start="${o.binStart}"
          data-bin-end="${o.binEnd}"
        />`;return i+=e,r})}formatDate(e){if(Number.isNaN(e))return"";const t=Zi(e);return t.year()<1e3?String(t.year()):t.format(this.dateFormat)}get minInputTemplate(){return h`
      <input
        id="date-min"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.handleInputFocus}"
        @blur="${this.handleMinDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Ea(this.minSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get maxInputTemplate(){return h`
      <input
        id="date-max"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.handleInputFocus}"
        @blur="${this.handleMaxDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Ea(this.maxSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get minLabelTemplate(){return h`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return h`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){return h`
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
    `}get noDataTemplate(){return h`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?h`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:y}render(){return this.hasBinData?h`
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
    `:this.noDataTemplate}};G.styles=m`
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
      --activityIndicatorLoadingRingColor: ${qn};
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
      background: ${Da};
      color: ${Fa};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${tl};
      font-family: ${il};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      /* arrow */
      border: 5px solid ${Fa};
      border-color: ${Da} transparent transparent
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
      margin: ${Yn};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${Zn};
      margin: 0 3px;
      border: ${Xn};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Jn};
      font-family: ${el};
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
  `;s([c({type:Number})],G.prototype,"width",void 0);s([c({type:Number})],G.prototype,"height",void 0);s([c({type:Number})],G.prototype,"sliderWidth",void 0);s([c({type:Number})],G.prototype,"tooltipWidth",void 0);s([c({type:Number})],G.prototype,"tooltipHeight",void 0);s([c({type:Number})],G.prototype,"updateDelay",void 0);s([c({type:String})],G.prototype,"dateFormat",void 0);s([c({type:String})],G.prototype,"missingDataMessage",void 0);s([c({type:String})],G.prototype,"minDate",void 0);s([c({type:String})],G.prototype,"maxDate",void 0);s([c({type:Boolean})],G.prototype,"disabled",void 0);s([c({type:Object})],G.prototype,"bins",void 0);s([c({type:Boolean})],G.prototype,"updateWhileFocused",void 0);s([T()],G.prototype,"_tooltipOffset",void 0);s([T()],G.prototype,"_tooltipContent",void 0);s([T()],G.prototype,"_tooltipVisible",void 0);s([T()],G.prototype,"_isDragging",void 0);s([T()],G.prototype,"_isLoading",void 0);s([c({type:Boolean})],G.prototype,"loading",null);s([c()],G.prototype,"minSelectedDate",null);s([c()],G.prototype,"maxSelectedDate",null);G=s([F("histogram-date-range")],G);const Aa=I`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,Ba=I`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let te=class extends A{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return h`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${Aa}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${Ba}</span
        >
      </button>
      ${this.popupTemplate}
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){!this.isOpen||this.positionPopup()}handleScroll(){!this.isOpen||this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e!=null?e:this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){!this.recaptchaManager||(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted||(this.resetState(),this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.betaButton.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,o=window.innerHeight,r=i/2,n=o/2;e.left<r?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<n?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.closePopup()}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get popupTemplate(){return h`
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
                ${Aa}
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
                ${Ba}
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
            ${this.error?h`<div id="error">${this.error}</div>`:y}
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
        ${t instanceof Error?t.message:t}`}this.processing=!1}static get styles(){const e=m`var(--featureFeedbackBlueColor, #194880)`,t=m`var(--featureFeedbackDarkGrayColor, #767676)`,i=m`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,o=m`var(--featureFeedbackBackdropZindex, 5)`,r=m`var(--featureFeedbackModalZindex, 6)`,n=m`var(--featureFeedbackPopupBorderColor, ${e})`,l=m`var(--featureFeedbackSubmitButtonColor, ${e})`,d=m`var(--featureFeedbackBetaButtonBorderColor, ${e})`,u=m`var(--featureFeedbackBetaButtonTextColor, ${e})`,v=m`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,f=m`var(--featureFeedbackCancelButtonColor, #515151)`,g=m`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,w=m`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,C=m`var(--featureFeedbackPromptFontWeight, bold)`,E=m`var(--featureFeedbackPromptFontSize, 14px)`,L=m`var(--defaultColor, ${t});`,P=m`var(--defaultColorSvgFilter, ${i});`,R=m`var(--upvoteColor, #23765D);`,he=m`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,q=m`var(--downvoteColor, #720D11);`,W=m`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,K=m`var(--unselectedColor, #CCCCCC);`,le=m`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return m`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${u};
        border: 1px solid ${d};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${v};
      }

      .beta-button-thumb.unselected svg {
        filter: ${le};
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
        background-color: ${g};
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
        border: 1px ${n} solid;
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
        font-size: ${E};
        font-weight: ${C};
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
        background-color: ${f};
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
        border-color: ${L};
      }

      .vote-button.noselection svg {
        filter: ${P};
      }

      .vote-button.unselected {
        border-color: ${K};
      }

      .vote-button.unselected svg {
        filter: ${le};
      }

      .upvote-button.selected {
        border-color: ${R};
      }

      .upvote-button.selected svg {
        filter: ${he};
      }

      .downvote-button.selected {
        border-color: ${q};
      }

      .downvote-button.selected svg {
        filter: ${W};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `}};s([c({type:String})],te.prototype,"featureIdentifier",void 0);s([c({type:String})],te.prototype,"prompt",void 0);s([c({type:String})],te.prototype,"buttonText",void 0);s([c({type:Object})],te.prototype,"recaptchaManager",void 0);s([c({type:Object})],te.prototype,"resizeObserver",void 0);s([c({type:Boolean})],te.prototype,"disabled",void 0);s([c({type:Object})],te.prototype,"featureFeedbackService",void 0);s([Q("#beta-button")],te.prototype,"betaButton",void 0);s([Q("#popup")],te.prototype,"popup",void 0);s([T()],te.prototype,"isOpen",void 0);s([T()],te.prototype,"processing",void 0);s([T()],te.prototype,"popupTopX",void 0);s([T()],te.prototype,"popupTopY",void 0);s([T()],te.prototype,"vote",void 0);s([T()],te.prototype,"voteSubmitted",void 0);s([T()],te.prototype,"error",void 0);s([T()],te.prototype,"voteNeedsChoosing",void 0);s([T()],te.prototype,"recaptchaWidget",void 0);s([Q("#comments")],te.prototype,"comments",void 0);te=s([F("feature-feedback")],te);class wo{constructor(e){var t,i,o,r,n,l,d;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(o=e==null?void 0:e.showProcessingIndicator)!==null&&o!==void 0?o:!1,this.processingImageMode=(r=e==null?void 0:e.processingImageMode)!==null&&r!==void 0?r:"complete",this.showCloseButton=(n=e==null?void 0:e.showCloseButton)!==null&&n!==void 0?n:!0,this.showHeaderLogo=(l=e==null?void 0:e.showHeaderLogo)!==null&&l!==void 0?l:!0,this.closeOnBackdropClick=(d=e==null?void 0:e.closeOnBackdropClick)!==null&&d!==void 0?d:!0}}var ol=h`
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
`,al=h`
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
`;let xo=class extends A{constructor(){super(...arguments),this.config=new wo}render(){return h`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?h`<div class="logo-icon">${al}</div>`:y}
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
        ${ol}
      </button>
    `}static get styles(){const e=m`var(--modalLogoSize, 6.5rem)`,t=m`var(--processingImageSize, 7.5rem)`,i=m`var(--modalCornerRadius, 1rem)`,o=m`var(--modalBorder, 2px solid black)`,r=m`var(--modalBottomMargin, 2.5rem)`,n=m`var(--modalTopMargin, 5rem)`,l=m`var(--modalHeaderBottomPadding, 0.5em)`,d=m`var(--modalBottomPadding, 2rem)`,u=m`var(--modalScrollOffset, 5px)`,v=m`var(--modalTitleFontSize, 1.8rem)`,f=m`var(--modalSubtitleFontSize, 1.4rem)`,g=m`var(--modalHeadlineFontSize, 1.6rem)`,w=m`var(--modalMessageFontSize, 1.4rem)`,C=m`var(--modalTitleLineHeight, normal)`,E=m`var(--modalSubtitleLineHeight, normal)`,L=m`var(--modalHeadlineLineHeight, normal)`,P=m`var(--modalMessageLineHeight, normal)`;return m`
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
        margin-top: ${n};
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
        font-size: ${v};
        font-weight: bold;
        line-height: ${C};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${f};
        line-height: ${E};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${o};
        border-top: 0;
        padding: 0 1rem calc(${d} - ${u}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${r}));
        min-height: 5rem;
        padding: 0 0 calc(${u}) 0;
      }

      .headline {
        font-size: ${g};
        font-weight: bold;
        text-align: center;
        line-height: ${L};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${w};
        line-height: ${P};
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
    `}};s([c({type:Object})],xo.prototype,"config",void 0);xo=s([F("modal-template")],xo);function rl(a,e,t){var i=t||{},o=i.noTrailing,r=o===void 0?!1:o,n=i.noLeading,l=n===void 0?!1:n,d=i.debounceMode,u=d===void 0?void 0:d,v,f=!1,g=0;function w(){v&&clearTimeout(v)}function C(L){var P=L||{},R=P.upcomingOnly,he=R===void 0?!1:R;w(),f=!he}function E(){for(var L=arguments.length,P=new Array(L),R=0;R<L;R++)P[R]=arguments[R];var he=this,q=Date.now()-g;if(f)return;function W(){g=Date.now(),e.apply(he,P)}function K(){v=void 0}!l&&u&&!v&&W(),w(),u===void 0&&q>a?l?(g=Date.now(),r||(v=setTimeout(u?K:W,a))):W():r!==!0&&(v=setTimeout(u?K:W,u===void 0?a-q:a))}return E.cancel=C,E}var vt;(function(a){a.Open="open",a.Closed="closed"})(vt||(vt={}));class sl{constructor(e){this.windowResizeThrottler=rl(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case vt.Open:this.startResizeListener(),this.stopDocumentScroll();break;case vt.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let Lt=class extends A{constructor(){super(...arguments),this.mode=vt.Closed,this.hostBridge=new sl(this),this.closeOnBackdropClick=!0}render(){return h`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="0"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=vt.Closed}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Lr(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=vt.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=m`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=m`var(--modalBackdropZindex, 1000)`,i=m`var(--modalWidth, 32rem)`,o=m`var(--modalMaxWidth, 95%)`,r=m`var(--modalZindex, 2000)`;return m`
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
    `}};s([c({type:String,reflect:!0})],Lt.prototype,"mode",void 0);s([c({type:Object})],Lt.prototype,"customModalContent",void 0);s([c({type:Object})],Lt.prototype,"hostBridge",void 0);s([Q("modal-template")],Lt.prototype,"modalTemplate",void 0);Lt=s([F("modal-manager")],Lt);var pr=I`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`,nl=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`,ll=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,dl=I`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`;let Pt=class extends A{constructor(){super(...arguments),this.step=2,this.currentPage=1,this.pages=[]}firstUpdated(){this.observePageCount()}updated(e){e.has("size")&&this.observePageCount(),e.has("currentPage")&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];const e=7,t=this.size<=e;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}if(this.size===e){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(t&&this.currentPage>1&&this.currentPage<e){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}let i=this.currentPage-this.step,o=this.currentPage+this.step;i<=0&&(o+=-i+1,i=1),o>=this.size&&(i=Math.max(i-(o-this.size),1),o=this.size),i===2&&(o-=1),o===this.size-1&&(i+=1),this.createFirstNode(i),this.createMiddelNode(i,o),this.createLastNode(o)}createFirstNode(e){var t,i;e>1&&((t=this.pages)===null||t===void 0||t.push(1)),e>2&&((i=this.pages)===null||i===void 0||i.push(0))}createMiddelNode(e,t){var i;for(let o=e;o<=t;o+=1)(i=this.pages)===null||i===void 0||i.push(o)}createLastNode(e){var t,i;e<this.size-1&&((t=this.pages)===null||t===void 0||t.push(0)),e<this.size&&((i=this.pages)===null||i===void 0||i.push(this.size))}get getEllipsisTemplate(){return h`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent("pageNumberClicked",{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){this.currentPage-=1,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(e){this.currentPage=e}getPageTemplate(e){return h`
      <button
        @click=${()=>this.onChange(e)}
        class=${this.currentPage===e?"current":""}
        data-page=${e}
      >
        ${e}
      </button>
    `}get getPagesTemplate(){var e;return!this.pages||!this.pages.length?y:h`
      ${(e=this.pages)===null||e===void 0?void 0:e.map(t=>h`${t!==0?this.getPageTemplate(t):this.getEllipsisTemplate}`)}
    `}render(){return h`
      <div class="facets-pagination">
        <button class="arrow-icon rewind" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${ll}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${dl}
        </button>
      </div>
    `}static get styles(){return[Je,m`
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
      `]}};s([c({type:Number})],Pt.prototype,"size",void 0);s([c({type:Number})],Pt.prototype,"step",void 0);s([c({type:Number})],Pt.prototype,"currentPage",void 0);s([T()],Pt.prototype,"pages",void 0);Pt=s([F("more-facets-pagination")],Pt);var cl=I`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,hl=I`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`;let ft=class extends A{constructor(){super(...arguments),this.collectionPagePath="/details/"}facetClicked(e,t,i){const o=e.target,{checked:r,name:n,value:l}=o;r?this.facetChecked(n,l,t,i):this.facetUnchecked(n,l),this.dispatchFacetClickEvent(n,this.getFacetState(r,i),i)}facetChecked(e,t,i,o){const{selectedFacets:r}=this;let n;r?n=oe({},r):n=ei(),n[e][t]={state:this.getFacetState(!0,o),count:i},this.selectedFacets=n,this.dispatchSelectedFacetsChanged()}facetUnchecked(e,t){const{selectedFacets:i}=this;let o;i?o=oe({},i):o=ei(),delete o[e][t],this.selectedFacets=o,this.dispatchSelectedFacetsChanged()}getFacetState(e,t){let i;return e?i=t?"hidden":"selected":i="none",i}dispatchFacetClickEvent(e,t,i){const o=new CustomEvent("facetClick",{detail:{key:e,state:t,negative:i},composed:!0});this.dispatchEvent(o)}dispatchSelectedFacetsChanged(){const e=new CustomEvent("selectedFacetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(e)}getFacetsTemplate(e){let t=e==null?void 0:e.buckets;return t=[...t.filter(i=>i.state==="selected").sort((i,o)=>i.count<o.count?1:-1),...t.filter(i=>i.state==="hidden").sort((i,o)=>i.count<o.count?1:-1),...t.filter(i=>i.state==="none")],h`
      <div class="facets-on-${this.renderOn}">
        ${rr(t,i=>`${e.key}:${i.key}`,i=>{var o,r;const n=`${e.key}:${i.key}-show-only`,l=`${e.key}:${i.key}-negative`,d=e.key!=="collection"?h`${(o=i.displayText)!==null&&o!==void 0?o:i.key}`:h`<a href="${this.collectionPagePath}${i.key}">
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${i.key}
                      placeholder="-"
                    ></async-collection-name>
                  </a> `,u=i.state==="hidden",v=i.state==="selected",f=`${e.key}: ${(r=i.displayText)!==null&&r!==void 0?r:i.key}`,g=v?`Show all ${e.key}s`:`Only show ${f}`,w=`Hide ${f}`,C=`Unhide ${f}`,E=u?C:w,L=`${f}, ${i.count} results`;return h`
              <div class="facet-row">
                <div class="facet-checkbox">
                  <input
                    type="checkbox"
                    .name=${e.key}
                    .value=${i.key}
                    @click=${P=>{this.facetClicked(P,i.count,!1)}}
                    .checked=${v}
                    class="select-facet-checkbox"
                    title=${g}
                    id=${n}
                  />
                  <input
                    type="checkbox"
                    id=${l}
                    .name=${e.key}
                    .value=${i.key}
                    @click=${P=>{this.facetClicked(P,i.count,!0)}}
                    .checked=${u}
                    class="hide-facet-checkbox"
                  />
                  <label
                    for=${l}
                    class="hide-facet-icon${u?" active":""}"
                    title=${E}
                  >
                    <span class="eye">${cl}</span>
                    <span class="eye-closed">${hl}</span>
                  </label>
                </div>
                <label
                  for=${n}
                  class="facet-info-display"
                  title=${g}
                  aria-label=${L}
                >
                  <div class="facet-title">${d}</div>
                  <div class="facet-count">
                    ${i.count.toLocaleString()}
                  </div>
                </label>
              </div>
            `})}
      </div>
    `}render(){return h`${this.getFacetsTemplate(this.facetGroup)}`}static get styles(){return m`
      @media (max-width: 560px) {
        .facets-on-modal {
          column-count: 1 !important;
        }
      }
      .facets-on-modal {
        column-gap: 15px;
        column-count: 3;
      }
      async-collection-name {
        display: contents;
      }
      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul.facet-list li {
        margin-bottom: 0.2rem;
        display: grid;
      }
      .facet-checkbox {
        margin: 0 5px 0 0;
        display: flex;
        height: 15px;
      }
      .facet-checkbox input:first-child {
        margin-right: 5px;
      }
      .facet-checkbox input {
        height: 15px;
        width: 15px;
        margin: 0;
      }
      .facet-row {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 2.5px auto;
        height: auto;
        border-top: var(--facet-row-border-top, 1px solid transparent);
        border-bottom: var(--facet-row-border-bottom, 1px solid transparent);
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
    `}};s([c({type:Object})],ft.prototype,"facetGroup",void 0);s([c({type:Object})],ft.prototype,"selectedFacets",void 0);s([c({type:String})],ft.prototype,"renderOn",void 0);s([c({type:String})],ft.prototype,"collectionPagePath",void 0);s([c({type:Object})],ft.prototype,"collectionNameCache",void 0);ft=s([F("facets-template")],ft);var Ie;(function(a){a.default="collection-browser"})(Ie||(Ie={}));var ae;(function(a){a.sortBy="sortBy",a.filterByCreator="filterByCreator",a.filterByTitle="filterByTitle",a.displayMode="displayMode",a.facetSelected="facetSelected",a.facetDeselected="facetDeselected",a.facetNegativeSelected="facetNegativeSelected",a.facetNegativeDeselected="facetNegativeDeselected",a.histogramChanged="histogramChanged",a.histogramChangedFromModal="histogramChangedFromModal",a.histogramExpanded="histogramExpanded",a.resultSelected="resultSelected",a.moreFacetsPageChange="moreFacetsPageChange",a.showMoreFacetsModal="showMoreFacetsModal",a.closeMoreFacetsModal="closeMoreFacetsModal",a.applyMoreFacetsModal="applyMoreFacetsModal"})(ae||(ae={}));let Ze=class extends A{constructor(){super(...arguments),this.leftValue="",this.rightValue="",this.side="left"}render(){var e,t;return h`
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
    `}get value(){return this.side==="left"?this.leftValue:this.rightValue}get selectedLabel(){var e,t;return this.side==="left"?(e=this.leftLabel)!==null&&e!==void 0?e:this.leftValue:(t=this.rightLabel)!==null&&t!==void 0?t:this.rightValue}handleClick(){this.side=this.side==="left"?"right":"left",this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?"left":"right",this.emitChangeEvent()}emitChangeEvent(){const e=new CustomEvent("change",{detail:this.value});this.dispatchEvent(e)}static get styles(){const e=m`var(--switchWidth, 30px)`,t=m`var(--switchHeight, 14px)`,i=m`var(--switchMarginLeft, 5px)`,o=m`var(--switchMarginRight, 5px)`,r=m`var(--switchBorderWidth, 3px)`,n=m`var(--switchBgColor, #194880)`,l=m`var(--switchBorderColor, #194880)`,d=m`var(--labelFontSize, 1.3rem)`,u=m`var(--knobColor, white)`,v=m`var(--knobTransitionDuration, 0.25s)`,f=m`var(--knobTransitionFn, ease)`;return[Je,m`
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
          background: ${n};
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
          background: ${u};
          transition: transform ${v} ${f};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};s([c({type:String,attribute:!0})],Ze.prototype,"leftValue",void 0);s([c({type:String,attribute:!0})],Ze.prototype,"leftLabel",void 0);s([c({type:String,attribute:!0})],Ze.prototype,"rightValue",void 0);s([c({type:String,attribute:!0})],Ze.prototype,"rightLabel",void 0);s([c({type:String,attribute:!0})],Ze.prototype,"side",void 0);s([Q("#switch-left")],Ze.prototype,"leftRadio",void 0);Ze=s([F("toggle-switch")],Ze);let ie=class extends A{constructor(){super(...arguments),this.sortedBy=Z.COUNT,this.facetGroup=[],this.facetGroupTitle="",this.pageNumber=1,this.facetsLoading=!0,this.paginationSize=0,this.facetsType="modal",this.facetsPerPage=35}updated(e){(e.has("facetKey")||e.has("facetAggregationKey")||e.has("query")||e.has("searchType")||e.has("filterMap"))&&(this.facetsLoading=!0,this.pageNumber=1,this.updateSpecificFacets()),e.has("pageNumber")&&(this.facetGroup=this.aggregationFacetGroups)}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener("keydown",e=>{var t;e.key==="Escape"&&((t=this.modalManager)===null||t===void 0||t.closeModal())}):document.removeEventListener("keydown",()=>{})}async updateSpecificFacets(){var e,t,i;const o=(e=this.query)===null||e===void 0?void 0:e.trim();if(!o&&!this.withinCollection)return;const r={simpleParams:[this.facetAggregationKey]},n=65535,l=this.withinCollection?{pageType:"collection_details",pageTarget:this.withinCollection}:null,d=we(oe({},l),{query:o||"",filters:this.filterMap,aggregations:r,aggregationsSize:n,rows:0}),u=await((t=this.searchService)===null||t===void 0?void 0:t.search(d,this.searchType));this.aggregations=(i=u==null?void 0:u.success)===null||i===void 0?void 0:i.response.aggregations,this.facetGroup=this.aggregationFacetGroups,this.facetsLoading=!1}pageNumberClicked(e){var t,i;const o=(t=e==null?void 0:e.detail)===null||t===void 0?void 0:t.page;o&&(this.pageNumber=Number(o)),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ie.default,action:ae.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){var e;const t=[],i=this.selectedFacetGroups.find(l=>l.key===this.facetKey),o=this.aggregationFacetGroups.find(l=>l.key===this.facetKey);if(i&&!o)return t.push(i),t;if(!o)return t;const r=i!=null?i:o,n=(e=i==null?void 0:i.buckets.map(l=>{const d=o.buckets.find(u=>u.key===l.key);return d?we(oe({},l),{count:d.count}):l}))!==null&&e!==void 0?e:[];return o.buckets.forEach(l=>{n.find(u=>u.key===l.key)||n.push(l)}),r.buckets=n,t.push(r),t}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const o=t,r=Ci[o],n=Object.entries(i).map(([l,d])=>({displayText:l,key:l,count:d==null?void 0:d.count,state:d==null?void 0:d.state}));return{title:r,key:o,buckets:n}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,o])=>{if(i==="year_histogram")return;const r=i;this.facetGroupTitle=Ci[r];let n=o.getSortedBuckets(this.sortedBy);r==="collection"&&(n=n==null?void 0:n.filter(f=>{var g;const w=(g=f==null?void 0:f.key)===null||g===void 0?void 0:g.toString();return!Po[w]&&!(w!=null&&w.startsWith("fav-"))}),this.preloadCollectionNames(n));const{length:l}=Object.keys(n);this.paginationSize=Math.ceil(l/this.facetsPerPage);const u=(n==null?void 0:n.slice((this.pageNumber-1)*this.facetsPerPage,this.pageNumber*this.facetsPerPage)).map(f=>{const g=f.key;return{displayText:`${f.key}`,key:`${g}`,count:f.doc_count,state:"none"}}),v={title:this.facetGroupTitle,key:r,buckets:u};t.push(v)}),t}preloadCollectionNames(e){var t;const i=e==null?void 0:e.map(r=>r.key),o=Array.from(new Set(i));(t=this.collectionNameCache)===null||t===void 0||t.preloadIdentifiers(o)}get getMoreFacetsTemplate(){var e;return h`
      <facets-template
        .facetGroup=${(e=this.mergedFacets)===null||e===void 0?void 0:e.shift()}
        .selectedFacets=${this.selectedFacets}
        .renderOn=${"modal"}
        .collectionNameCache=${this.collectionNameCache}
        @selectedFacetsChanged=${t=>{this.selectedFacets=t.detail}}
      ></facets-template>
    `}get loaderTemplate(){return h`<div class="facets-loader">
      <ia-activity-indicator .mode=${"processing"}></ia-activity-indicator>
    </div> `}get facetsPaginationTemplate(){return this.paginationSize>1?h`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`:y}get footerTemplate(){return this.paginationSize>0?h`${this.facetsPaginationTemplate}
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
        </div> `:y}sortFacetAggregation(e){this.sortedBy=e,this.dispatchEvent(new CustomEvent("sortedFacets",{detail:this.sortedBy}))}get getModalHeaderTemplate(){const t=fo[this.facetKey]===Z.COUNT?"left":"right";return h`<span class="sr-only">More facets for:</span>
      <span class="title">
        ${this.facetGroupTitle}

        <label class="sort-label">Sort by:</label>
        ${this.facetKey?h`<toggle-switch
              class="sort-toggle"
              leftValue=${Z.COUNT}
              leftLabel="Count"
              rightValue=${_n[this.facetKey]}
              rightLabel=${this.facetGroupTitle}
              side=${t}
              @change=${i=>{this.sortFacetAggregation(Number(i.detail))}}
            ></toggle-switch>`:y}
      </span>`}render(){return h`
      ${this.facetsLoading?this.loaderTemplate:h`
            <section id="more-facets">
              <div class="header-content">${this.getModalHeaderTemplate}</div>
              <div class="facets-content">${this.getMoreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){var e,t;const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(i),(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:Ie.default,action:`${ae.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){var e,t;(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:Ie.default,action:ae.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){const e=m`var(--primaryButtonBGColor, #194880)`;return[Je,m`
        @media (max-width: 560px) {
          section#more-facets {
            max-height: 450px;
          }
          .facets-content {
            overflow-y: auto;
            height: 300px;
          }
        }
        section#more-facets {
          overflow: auto;
          padding: 10px; /* leaves room for scroll bar to appear without overlaying on content */
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
      `]}};s([c({type:String})],ie.prototype,"facetKey",void 0);s([c({type:String})],ie.prototype,"facetAggregationKey",void 0);s([c({type:String})],ie.prototype,"query",void 0);s([c({type:Object})],ie.prototype,"filterMap",void 0);s([c({type:Object})],ie.prototype,"modalManager",void 0);s([c({type:Object})],ie.prototype,"searchService",void 0);s([c({type:String})],ie.prototype,"searchType",void 0);s([c({type:String})],ie.prototype,"withinCollection",void 0);s([c({type:Object})],ie.prototype,"collectionNameCache",void 0);s([c({type:Object})],ie.prototype,"selectedFacets",void 0);s([c({type:String})],ie.prototype,"sortedBy",void 0);s([c({type:Object,attribute:!1})],ie.prototype,"analyticsHandler",void 0);s([T()],ie.prototype,"aggregations",void 0);s([T()],ie.prototype,"facetGroup",void 0);s([T()],ie.prototype,"facetGroupTitle",void 0);s([T()],ie.prototype,"pageNumber",void 0);s([T()],ie.prototype,"facetsLoading",void 0);s([T()],ie.prototype,"paginationSize",void 0);s([T()],ie.prototype,"facetsType",void 0);ie=s([F("more-facets-content")],ie);let Ia=class extends A{render(){return h`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return m`
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
    `}};Ia=s([F("facet-tombstone-row")],Ia);let Le=class extends A{constructor(){super(...arguments),this.boundEscapeListener=e=>{e.key==="Escape"&&this.closeModal()}}render(){var e,t;return h`
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
    `}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupEscapeListener()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener("keydown",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keydown",this.boundEscapeListener)}histogramDateRangeUpdated(e){this.minSelectedDate=e.detail.minDate,this.maxSelectedDate=e.detail.maxDate}applyBtnClicked(){var e;const t=new CustomEvent("histogramDateRangeApplied",{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(t),this.closeModal(),(e=this.analyticsHandler)===null||e===void 0||e.sendEvent({category:Ie.default,action:ae.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent("modalClosed")))}static get styles(){return m`
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
    `}};s([c({type:String})],Le.prototype,"minDate",void 0);s([c({type:String})],Le.prototype,"maxDate",void 0);s([c({type:String})],Le.prototype,"minSelectedDate",void 0);s([c({type:String})],Le.prototype,"maxSelectedDate",void 0);s([c({type:Array})],Le.prototype,"buckets",void 0);s([c({type:Object,attribute:!1})],Le.prototype,"modalManager",void 0);s([c({type:Object,attribute:!1})],Le.prototype,"analyticsHandler",void 0);Le=s([F("expanded-date-picker")],Le);let H=class extends A{constructor(){super(...arguments),this.moreLinksVisible=!0,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.allowExpandingDatePicker=!1,this.collectionPagePath="/details/",this.openFacets={subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1},this.allowedFacetCount=6,this.handleExpandedDatePickerClosed=()=>{var e;(e=this.modalManager)===null||e===void 0||e.classList.remove("expanded-date-picker")},this.histogramDateRangeUpdated=e=>{const{minDate:t,maxDate:i}=e.detail,o=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(o)}}render(){const e="date-picker-label";return h`
      <div id="container" class="${this.facetsLoading?"loading":""}">
        ${this.showHistogramDatePicker&&(this.fullYearsHistogramAggregation||this.fullYearAggregationLoading)?h`
              <section class="facet-group" aria-labelledby=${e}>
                <h3 id=${e}>
                  Year Published <span class="sr-only">range filter</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `:y}
        ${this.mergedFacets.map(t=>this.getFacetGroupTemplate(t))}
      </div>
    `}showDatePickerModal(){var e,t,i;const{fullYearsHistogramAggregation:o}=this,r=o==null?void 0:o.first_bucket_key,n=o==null?void 0:o.last_bucket_key,l=o==null?void 0:o.buckets,u=h`
      <expanded-date-picker
        ${An(f=>{if(f&&f instanceof Le){const g=f;g.minSelectedDate=this.minSelectedDate,g.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${r}
        .maxDate=${n}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .buckets=${l}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,v=new wo({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`Select a date range`});(e=this.modalManager)===null||e===void 0||e.classList.add("expanded-date-picker"),(t=this.modalManager)===null||t===void 0||t.showModal({config:v,customModalContent:u,userClosedModalCallback:this.handleExpandedDatePickerClosed}),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ie.default,action:ae.histogramExpanded,label:window.location.href})}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?h`<button
          class="expand-date-picker-btn"
          aria-hidden="true"
          @click=${this.showDatePickerModal}
        >
          ${nl}
        </button>`:y}get histogramTemplate(){const{fullYearsHistogramAggregation:e}=this;return this.fullYearAggregationLoading?h`<div class="histogram-loading-indicator">&hellip;</div>`:h`
          <histogram-date-range
            .minDate=${e==null?void 0:e.first_bucket_key}
            .maxDate=${e==null?void 0:e.last_bucket_key}
            .minSelectedDate=${this.minSelectedDate}
            .maxSelectedDate=${this.maxSelectedDate}
            .updateDelay=${100}
            missingDataMessage="..."
            .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
            .bins=${e==null?void 0:e.buckets}
            @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
          ></histogram-date-range>
        `}get mergedFacets(){const e=[];return xn.forEach(t=>{var i,o;const r=this.selectedFacetGroups.find(v=>v.key===t),n=this.aggregationFacetGroups.find(v=>v.key===t);if(r&&!n){e.push(r);return}if(!n)return;const l=r!=null?r:n;let d=(i=r==null?void 0:r.buckets.map(v=>{const f=n.buckets.find(g=>g.key===v.key);return f?we(oe({},v),{count:f.count}):v}))!==null&&i!==void 0?i:[];n.buckets.forEach(v=>{d.find(g=>g.key===v.key)||d.push(v)});let u=(o=Object.keys((r==null?void 0:r.buckets)||[]))===null||o===void 0?void 0:o.length;if(u<this.allowedFacetCount&&(u=this.allowedFacetCount),t==="lending"&&(d=d.filter(v=>Cn[v.key])),t==="mediatype"){const v=d.findIndex(f=>f.key==="collection");if(v>=u){const[f]=d.splice(v,1);d.splice(u-1,0,f),u>this.allowedFacetCount&&(u+=1)}}l.buckets=d.splice(0,u),e.push(l)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const o=t,r=Ci[o],n=Object.entries(i).map(([l,d])=>{var u;let v=l;return o==="lending"&&(v=(u=Sa[l])!==null&&u!==void 0?u:l),{displayText:v,key:l,count:d.count,state:d.state}});return{title:r,key:o,buckets:n}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,o])=>{if(i==="year_histogram")return;const r=i,n=Ci[r];if(!n)return;let l=o.getSortedBuckets(fo[r]);r==="collection"&&(l=l==null?void 0:l.filter(v=>{var f;const g=(f=v==null?void 0:v.key)===null||f===void 0?void 0:f.toString();return!Po[g]&&!(g!=null&&g.startsWith("fav-"))}));const d=l.map(v=>{var f;const g=v.key;let w=`${v.key}`;return r==="lending"&&(w=(f=Sa[v.key])!==null&&f!==void 0?f:`${v.key}`),{displayText:w,key:`${g}`,count:v.doc_count,state:"none"}}),u={title:n,key:r,buckets:d};t.push(u)}),t}getFacetGroupTemplate(e){if(!this.facetsLoading&&e.buckets.length===0)return y;const{key:t}=e,i=this.openFacets[t],o=h`
      <span class="collapser ${i?"open":""}"> ${pr} </span>
    `,r=()=>{const l=oe({},this.openFacets);l[t]=!i,this.openFacets=l},n=`facet-group-header-label-${e.key}`;return h`
      <section
        class="facet-group ${this.collapsableFacets?"mobile":""}"
        aria-labelledby=${n}
      >
        <div class="facet-group-header">
          <h3
            id=${n}
            @click=${r}
            @keyup=${r}
          >
            ${this.collapsableFacets?o:y} ${e.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div class="facet-group-content ${i?"open":""}">
          ${this.facetsLoading?this.getTombstoneFacetGroupTemplate():h`
                ${this.getFacetTemplate(e)}
                ${this.searchMoreFacetsLink(e)}
              `}
        </div>
      </section>
    `}getTombstoneFacetGroupTemplate(){return h`
      ${ho(Array(5).fill(null),()=>h`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(e){if(!this.moreLinksVisible||e.key==="lending"||Object.keys(e.buckets).length<this.allowedFacetCount)return y;const t=fo[e.key];return h`<button
      class="more-link"
      @click=${()=>{var i;this.showMoreFacetsModal(e,t),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:Ie.default,action:ae.showMoreFacetsModal,label:e.key}),this.dispatchEvent(new CustomEvent("showMoreFacets",{detail:e.key}))}}
    >
      More...
    </button>`}async showMoreFacetsModal(e,t){var i,o;const r=e.key,n=h`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${e.key}
        .facetAggregationKey=${r}
        .query=${this.query}
        .filterMap=${this.filterMap}
        .withinCollection=${this.withinCollection}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .searchType=${this.searchType}
        .collectionNameCache=${this.collectionNameCache}
        .selectedFacets=${this.selectedFacets}
        .sortedBy=${t}
        @facetsChanged=${d=>{const u=new CustomEvent("facetsChanged",{detail:d.detail,bubbles:!0,composed:!0});this.dispatchEvent(u)}}
      >
      </more-facets-content>
    `,l=new wo({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`Select filters`});(i=this.modalManager)===null||i===void 0||i.classList.add("more-search-facets"),(o=this.modalManager)===null||o===void 0||o.showModal({config:l,customModalContent:n,userClosedModalCallback:()=>{var d;(d=this.modalManager)===null||d===void 0||d.classList.remove("more-search-facets")}})}getFacetTemplate(e){return h`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${e}
        .selectedFacets=${this.selectedFacets}
        .renderOn=${"page"}
        .collectionNameCache=${this.collectionNameCache}
        @selectedFacetsChanged=${t=>{const i=new CustomEvent("facetsChanged",{detail:t.detail,bubbles:!0,composed:!0});this.dispatchEvent(i)}}
      ></facets-template>
    `}static get styles(){return[Je,m`
        #container.loading {
          opacity: 0.5;
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
      `]}};s([c({type:Object})],H.prototype,"searchService",void 0);s([c({type:String})],H.prototype,"searchType",void 0);s([c({type:Object})],H.prototype,"aggregations",void 0);s([c({type:Object})],H.prototype,"fullYearsHistogramAggregation",void 0);s([c({type:String})],H.prototype,"minSelectedDate",void 0);s([c({type:String})],H.prototype,"maxSelectedDate",void 0);s([c({type:Boolean})],H.prototype,"moreLinksVisible",void 0);s([c({type:Boolean})],H.prototype,"facetsLoading",void 0);s([c({type:Boolean})],H.prototype,"fullYearAggregationLoading",void 0);s([c({type:Object})],H.prototype,"selectedFacets",void 0);s([c({type:Boolean})],H.prototype,"collapsableFacets",void 0);s([c({type:Number})],H.prototype,"contentWidth",void 0);s([c({type:Boolean})],H.prototype,"showHistogramDatePicker",void 0);s([c({type:Boolean})],H.prototype,"allowExpandingDatePicker",void 0);s([c({type:String})],H.prototype,"query",void 0);s([c({type:Object})],H.prototype,"filterMap",void 0);s([c({type:String})],H.prototype,"withinCollection",void 0);s([c({type:String})],H.prototype,"collectionPagePath",void 0);s([c({type:Object,attribute:!1})],H.prototype,"modalManager",void 0);s([c({type:Object,attribute:!1})],H.prototype,"resizeObserver",void 0);s([c({type:Object,attribute:!1})],H.prototype,"featureFeedbackService",void 0);s([c({type:Object,attribute:!1})],H.prototype,"recaptchaManager",void 0);s([c({type:Object,attribute:!1})],H.prototype,"analyticsHandler",void 0);s([c({type:Object,attribute:!1})],H.prototype,"collectionNameCache",void 0);s([T()],H.prototype,"openFacets",void 0);H=s([F("collection-facets")],H);let Oa=class extends A{render(){return h`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=m`var(--circularActivityIndicatorColor, dodgerblue)`,t=m`var(--circularActivityIndicatorThickness, 4px)`;return m`
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
    `}};Oa=s([F("circular-activity-indicator")],Oa);/*! typescript-cookie v1.0.3 | MIT */const ur=a=>encodeURIComponent(a).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),vr=a=>encodeURIComponent(a).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),Do=decodeURIComponent,Fo=a=>(a[0]==='"'&&(a=a.slice(1,-1)),a.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function pl(a){return a=Object.assign({},a),typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires!=null&&(a.expires=a.expires.toUTCString()),Object.entries(a).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function mr(a,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,o={};let r;for(;(r=i.exec(document.cookie))!=null;)try{const n=t(r[1]);if(o[n]=e(r[2],n),a===n)break}catch{}return a!=null?o[a]:o}const Ra=Object.freeze({decodeName:Do,decodeValue:Fo,encodeName:ur,encodeValue:vr}),Ao=Object.freeze({path:"/"});function ki(a,e,t=Ao,{encodeValue:i=vr,encodeName:o=ur}={}){return document.cookie=`${o(a)}=${i(e,a)}${pl(t)}`}function _o(a,{decodeValue:e=Fo,decodeName:t=Do}={}){return mr(a,e,t)}function ul({decodeValue:a=Fo,decodeName:e=Do}={}){return mr(void 0,a,e)}function vl(a,e=Ao){ki(a,"",Object.assign({},e,{expires:-1}))}function Co(a,e){const t={set:function(o,r,n){return ki(o,r,Object.assign({},this.attributes,n),{encodeValue:this.converter.write})},get:function(o){if(arguments.length===0)return ul(this.converter.read);if(o!=null)return _o(o,this.converter.read)},remove:function(o,r){vl(o,Object.assign({},this.attributes,r))},withAttributes:function(o){return Co(this.converter,Object.assign({},this.attributes,o))},withConverter:function(o){return Co(Object.assign({},this.converter,o),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(a)}};return Object.create(t,i)}Co({read:Ra.decodeValue,write:Ra.encodeValue},Ao);function ml(a,e){return a===e?!0:a.length!==e.length?!1:a.every((t,i)=>t===e[i])}class fl{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";ki(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";ki(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=_o(`view-${this.context}`),t=_o(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e){var t,i;const o=new URL(window.location.href),r=new URLSearchParams(o.searchParams),n=this.removeRecognizedParams(o.searchParams);let l=!1;if(e.baseQuery&&n.set("query",e.baseQuery),e.searchType===ue.FULLTEXT&&n.set("sin","TXT"),r.get("sin")===""&&(r.delete("sin"),l=!0),e.currentPage&&(e.currentPage>1?n.set("page",e.currentPage.toString()):n.delete("page")),e.sortParam){const v=e.sortParam.direction==="desc"?"-":"",f=yn[e.sortParam.field];n.set("sort",`${v}${f}`)}if(e.selectedFacets)for(const[v,f]of Object.entries(e.selectedFacets)){const g=Object.entries(f);if(g.length!==0)for(const[w,C]of g){const E=C.state==="hidden",L=`${v}:"${w}"`;E?n.append("not[]",L):n.append("and[]",L)}}e.minSelectedDate&&e.maxSelectedDate&&n.append("and[]",`year:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&n.append("and[]",e.titleQuery),e.creatorQuery&&n.append("and[]",e.creatorQuery);let d="pushState";const u=this.paramsMatch(r,n,["sin","sort","and[]","not[]"]);if(u&&this.paramsMatch(r,n,["query"])){if(l)n.delete("sin");else if(this.paramsMatch(r,n,["page"]))return;d="replaceState"}else u&&this.hasLegacyParam(r)&&(d="replaceState");(i=(t=window.history)[d])===null||i===void 0||i.call(t,{query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:e.sortParam,minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},"",o)}loadQueryStateFromUrl(){var e;const t=new URL(window.location.href),i=t.searchParams.get("sin"),o=t.searchParams.get("page"),r=t.searchParams.get("query"),n=t.searchParams.get("sort"),l=t.searchParams.getAll("and[]"),d=t.searchParams.getAll("not[]");for(const[f,g]of t.searchParams.entries())/and\[\d+\]/.test(f)?l.push(g):/not\[\d+\]/.test(f)&&d.push(g);const u=(e=t.searchParams.get("q"))!==null&&e!==void 0?e:t.searchParams.get("search"),v={selectedFacets:ei()};switch(r?v.baseQuery=r:u&&(v.baseQuery=u),i){case"TXT":v.searchType=ue.FULLTEXT;break;default:v.searchType=ue.METADATA;break}if(o){const f=parseInt(o,10);v.currentPage=f}else v.currentPage=1;if(n)if(n.indexOf(" ")>-1){const[g,w]=n.split(" "),C=$a[g];C&&(v.selectedSort=C),(w==="desc"||w==="asc")&&(v.sortDirection=w)}else{const g=n.startsWith("-")?"desc":"asc",w=n.startsWith("-")?n.slice(1):n,C=$a[w];C&&(v.selectedSort=C,v.sortDirection=g)}return l&&l.forEach(f=>{let[g,w]=f.split(":");switch(g=g.replace(/Sorter$/,""),g){case"year":{const[C,E]=w.split(" TO ");C&&E?(v.minSelectedDate=C.substring(1,C.length),v.maxSelectedDate=E.substring(0,E.length-1)):this.setSelectedFacetState(v.selectedFacets,g,w,"selected");break}case"firstTitle":v.selectedTitleFilter=w;break;case"firstCreator":v.selectedCreatorFilter=w;break;default:this.setSelectedFacetState(v.selectedFacets,g,w,"selected")}}),d&&d.forEach(f=>{const[g,w]=f.split(":");this.setSelectedFacetState(v.selectedFacets,g,w,"hidden")}),v}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}paramsMatch(e,t,i){return i.every(o=>ml(e.getAll(o).sort(),t.getAll(o).sort()))}removeRecognizedParams(e){e.delete("query"),e.delete("sin"),e.delete("page"),e.delete("sort"),e.delete("and[]"),e.delete("not[]");for(const t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete("q"),e.delete("search"),e}hasLegacyParam(e){return e.has("q")||e.has("search")}setSelectedFacetState(e,t,i,o){var r;const n=e[t];if(!n)return;const l=this.stripQuotes(i);(r=n[l])!==null&&r!==void 0||(n[l]=this.getDefaultBucket(i)),n[l].state=o}getDefaultBucket(e){return{key:e,count:0,state:"none"}}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const gl=(a,e,t)=>{for(const i of e)if(i[0]===a)return(0,i[1])();return t==null?void 0:t()};var bl=I`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,Xi=I`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`,Ge;let _e=Ge=class extends A{constructor(){super(...arguments),this.placeholderType=null,this.detailMessage=""}render(){return this.placeholderType?h`${this.placeholderTemplate}`:y}get placeholderTemplate(){return h`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?"mobile":"desktop"}"
      >
        ${gl(this.placeholderType,[["empty-query",()=>this.emptyQueryTemplate],["empty-collection",()=>this.emptyCollectionTemplate],["no-results",()=>this.noResultsTemplate],["query-error",()=>this.queryErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return h`
      <h2 class="title">${Ge.MESSAGE_EMPTY_QUERY}</h2>
      <div>${bl}</div>
    `}get emptyCollectionTemplate(){return h`
      <h2 class="title">${Ge.MESSAGE_NO_VIEWABLE_MEMBERS}</h2>
      <div>${Xi}</div>
    `}get noResultsTemplate(){return h`
      <h2 class="title">
        ${this.isCollection?Ge.MESSAGE_NO_COLLECTION_RESULTS:Ge.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${Xi}</div>
    `}get queryErrorTemplate(){return h`
      <h2 class="title">${Ge.MESSAGE_QUERY_ERROR}</h2>
      <div>${Xi}</div>
      <p class="error-details">
        ${Ge.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return m`
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
    `}};_e.MESSAGE_EMPTY_QUERY=O('To begin searching, enter a search term in the box above and hit "Go".');_e.MESSAGE_NO_SEARCH_RESULTS=O("Your search did not match any items in the Archive. Try different keywords or a more general search.");_e.MESSAGE_NO_COLLECTION_RESULTS=O("Your search did not match any items in this collection. Try different keywords or a more general search.");_e.MESSAGE_NO_VIEWABLE_MEMBERS=O("This collection contains no viewable items.");_e.MESSAGE_QUERY_ERROR=O(h`The search engine
    encountered an error, which might be related to your search query.
    <a
      href="https://help.archive.org/help/search-building-powerful-complex-queries/"
    >
      Tips for constructing search queries.
    </a> `);_e.QUERY_ERROR_DETAILS_MESSAGE=O("Error details:");s([c({type:String})],_e.prototype,"placeholderType",void 0);s([c({type:Boolean})],_e.prototype,"isMobileView",void 0);s([c({type:Boolean})],_e.prototype,"isCollection",void 0);s([c({type:String})],_e.prototype,"detailMessage",void 0);_e=Ge=s([F("empty-placeholder")],_e);const yl=new TextEncoder;async function Na(a){const e=await crypto.subtle.digest("SHA-1",yl.encode(a));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}let z=class extends A{constructor(){super(...arguments),this.baseImageUrl="https://archive.org",this.searchType=ue.METADATA,this.sortParam=null,this.selectedSort=$.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.pageSize=50,this.showHistogramDatePicker=!1,this.collectionPagePath="/details/",this.searchContext=Ie.default,this.pageContext="search",this.restorationStateHandler=new fl({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.modalManager=void 0,this.isManageView=!1,this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.mobileView=!1,this.mobileFacetsVisible=!1,this.defaultSortField=$.relevance,this.defaultSortDirection=null,this.placeholderType=null,this.prefixFilterCountMap={},this.isScrollingToCell=!1,this.endOfDataReached=!1,this.isResizeToMobile=!1,this.placeholderCellTemplate=h`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.dataSource={},this.updateLeftColumnHeight=()=>{var e,t,i,o,r;if(this.mobileView)(t=(e=this.leftColumn)===null||e===void 0?void 0:e.style)===null||t===void 0||t.removeProperty("height");else{const n=(i=this.leftColumn)===null||i===void 0?void 0:i.getBoundingClientRect().top;(r=(o=this.leftColumn)===null||o===void 0?void 0:o.style)===null||r===void 0||r.setProperty("height",`${window.innerHeight-(n!=null?n:0)-3}px`)}},this.updateFacetFadeOut=e=>{var t,i;const o=(t=this.shadowRoot)===null||t===void 0?void 0:t.getElementById("facets-bottom-fade");o==null||o.classList.toggle("hidden",(i=e==null?void 0:e[0])===null||i===void 0?void 0:i.isIntersecting)},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this._initialSearchCompletePromise=new Promise(e=>{this._initialSearchCompleteResolver=e}),this.pageFetchesInProgress={}}tileModelAtCellIndex(e){var t;const i=Math.floor(e/this.pageSize)+1,o=e%this.pageSize,r=(t=this.dataSource[i])===null||t===void 0?void 0:t[o];return!r&&!this.isScrollingToCell&&this.fetchPage(i),r}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{const e=sessionStorage==null?void 0:sessionStorage.getItem("cb-session");if(e)return e;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=Na(Math.random().toString());const t=await this.sessionIdGenPromise;return sessionStorage==null||sessionStorage.setItem("cb-session",t),t}catch{return""}}goToPage(e){return this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}clearFilters({facets:e=!0,dateRange:t=!0,letterFilters:i=!0,sort:o=!1}={}){e&&this.hasCheckedFacets&&(this.selectedFacets=ei()),t&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),i&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),o&&(this.sortParam=null,this.sortDirection=null,this.selectedSort=$.default)}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(const e of Object.values(this.selectedFacets))for(const t of Object.values(e))if(t.state!=="none")return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}render(){return this.setPlaceholderType(),h`
      <div
        id="content-container"
        class=${this.mobileView?"mobile":"desktop"}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){var e;const t=!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim()),i=!!this.withinCollection,o=!this.searchResultsLoading&&(this.totalResults===0||!this.searchService);this.placeholderType=null,!t&&!i?this.placeholderType="empty-query":o&&(this.placeholderType=!t&&i?"empty-collection":"no-results"),this.queryErrorMessage&&(this.placeholderType="query-error")}get emptyPlaceholderTemplate(){var e;return h`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${(e=this.queryErrorMessage)!==null&&e!==void 0?e:""}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
      ${this.infiniteScrollerTemplate}
    `}get collectionBrowserTemplate(){return h`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `}get leftColumnTemplate(){return this.mobileView?this.mobileLeftColumnTemplate:this.desktopLeftColumnTemplate}get mobileLeftColumnTemplate(){return h`
      <div
        id="left-column"
        class="column${this.isResizeToMobile?" preload":""}"
      >
        ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `}get desktopLeftColumnTemplate(){return h`
      <div id="left-column" class="column">
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
    `}get resultsCountTemplate(){var e;const t=this.searchResultsLoading||this.totalResults===void 0,i=(e=this.totalResults)===null||e===void 0?void 0:e.toLocaleString(),o=this.totalResults===1?"Result":"Results";return h`
      <div id="results-total">
        <span id="big-results-count">
          ${t?h`Searching&hellip;`:i}
        </span>
        <span id="big-results-label">
          ${t?y:o}
        </span>
      </div>
    `}get rightColumnTemplate(){return h`
      <div id="right-column" class="column">
        ${this.sortFilterBarTemplate}
        ${this.displayMode==="list-compact"?this.listHeaderTemplate:y}
        ${this.infiniteScrollerTemplate}
      </div>
    `}get infiniteScrollerTemplate(){return h`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType?0:y}
      ariaLandmarkLabel="Search results"
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
    ></infinite-scroller>`}get infiniteScrollerClasses(){var e;return Yt({[(e=this.displayMode)!==null&&e!==void 0?e:""]:!!this.displayMode,hidden:!!this.placeholderType})}get sortFilterBarTemplate(){return h`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .showRelevance=${this.isRelevanceSortAvailable}
        .displayMode=${this.displayMode}
        .selectedTitleFilter=${this.selectedTitleFilter}
        .selectedCreatorFilter=${this.selectedCreatorFilter}
        .prefixFilterCountMap=${this.prefixFilterCountMap}
        .resizeObserver=${this.resizeObserver}
        @sortChanged=${this.userChangedSort}
        @displayModeChanged=${this.displayModeChanged}
        @titleLetterChanged=${this.titleLetterSelected}
        @creatorLetterChanged=${this.creatorLetterSelected}
      >
      </sort-filter-bar>
    `}userChangedSort(e){var t;const{selectedSort:i,sortDirection:o}=e.detail;this.selectedSort=i,this.sortDirection=o,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.goToPage(1),this.currentPage=1}sendSortByAnalytics(e){var t;const i=e&&!this.sortDirection;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.sortBy,label:`${this.selectedSort}${this.sortDirection||i?`-${this.sortDirection}`:""}`})}selectedSortChanged(){if([$.default,$.relevance].includes(this.selectedSort)){this.sortParam=null;return}const e=gn[this.selectedSort];this.sortDirection||(this.sortDirection="desc"),e&&(this.sortParam={field:e,direction:this.sortDirection},this.updatePrefixFiltersForCurrentSort())}displayModeChanged(e){var t;this.displayMode=e.detail.displayMode,this.displayMode&&((t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.displayMode,label:this.displayMode}))}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(e){var t;if(!e&&!this.selectedTitleFilter)return;const i=e&&!this.selectedTitleFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.filterByTitle,label:i?`clear-${e}`:`${e||"start"}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(e){var t;if(!e&&!this.selectedCreatorFilter)return;const i=e&&!this.selectedCreatorFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.filterByCreator,label:i?`clear-${e}`:`${e||"start"}-${this.selectedCreatorFilter}`})}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get mobileFacetsTemplate(){const e=()=>{this.isResizeToMobile=!1,this.mobileFacetsVisible=!this.mobileFacetsVisible};return h`
      <details
        id="mobile-filter-collapse"
        @click=${e}
        @keyup=${e}
      >
        <summary>
          <span class="collapser-icon">${pr}</span>
          <h2>Filters</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}get facetsTemplate(){return h`
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .collectionPagePath=${this.collectionPagePath}
        .withinCollection=${this.withinCollection}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.aggregations}
        .fullYearsHistogramAggregation=${this.fullYearsHistogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .collectionNameCache=${this.collectionNameCache}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .allowExpandingDatePicker=${!this.mobileView}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .filterMap=${this.filterMap}
        .modalManager=${this.modalManager}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?fullYearAggregationLoading=${this.facetsLoading}
        @facetClick=${this.facetClickHandler}
        .analyticsHandler=${this.analyticsHandler}
      >
      </collection-facets>
    `}clearFiltersBtnTemplate(e){if(!this.hasActiveFilters)return y;const t=Yt({"clear-filters-btn":!0,mobile:e}),i=e?"Clear all":"Clear all filters";return h`
      <div class="clear-filters-btn-row">
        ${e?h`<span class="clear-filters-btn-separator">&nbsp;</span>`:y}
        <button class=${t} @click=${this.clearFilters}>
          ${i}
        </button>
      </div>
    `}get loadingTemplate(){return h`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `}get listHeaderTemplate(){return h`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
          .loggedIn=${this.loggedIn}
        >
        </tile-dispatcher>
      </div>
    `}histogramDateRangeUpdated(e){var t;const{minDate:i,maxDate:o}=e.detail;[this.minSelectedDate,this.maxSelectedDate]=[i,o],(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}firstUpdated(){this.setupStateRestorationObserver(),this.restoreState()}updated(e){var t;if(e.has("placeholderType")&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),(e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl")||e.has("loggedIn"))&&((t=this.infiniteScroller)===null||t===void 0||t.reload()),(e.has("baseQuery")||e.has("searchType"))&&!this.historyPopOccurred&&this.initialQueryChangeHappened&&this.clearFilters({facets:!e.has("selectedFacets"),dateRange:!(e.has("minSelectedDate")||e.has("maxSelectedDate")),letterFilters:!(e.has("selectedTitleFilter")||e.has("selectedCreatorFilter"))}),e.has("baseQuery")&&this.emitBaseQueryChanged(),e.has("searchType")&&this.emitSearchTypeChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection"))&&this.refreshLetterCounts(),e.has("selectedSort")||e.has("sortDirection")){const i=e.get("sortDirection");this.sendSortByAnalytics(i),this.selectedSortChanged()}if(e.has("selectedTitleFilter")&&this.sendFilterByTitleAnalytics(e.get("selectedTitleFilter")),e.has("selectedCreatorFilter")&&this.sendFilterByCreatorAnalytics(e.get("selectedCreatorFilter")),(e.has("baseQuery")||e.has("searchType")||e.has("selectedTitleFilter")||e.has("selectedCreatorFilter")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("sortParam")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection"))&&this.handleQueryChange(),e.has("searchResultsLoading")&&this.emitSearchResultsLoadingChanged(),e.has("facetsLoading")&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==ue.FULLTEXT),e.has("pagesToRender")&&!this.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),e.has("resizeObserver")){const i=e.get("resizeObserver");i&&this.disconnectResizeObserver(i),this.setupResizeObserver()}}disconnectedCallback(){var e,t;this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler),(e=this.leftColIntersectionObserver)===null||e===void 0||e.disconnect(),(t=this.facetsIntersectionObserver)===null||t===void 0||t.disconnect(),window.removeEventListener("resize",this.updateLeftColumnHeight)}handleResize(e){const t=this.mobileView;e.target===this.contentContainer&&(this.contentWidth=e.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}setupLeftColumnScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#left-column-scroll-sentinel");t&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(101).keys()].map(i=>i/100)}),this.leftColIntersectionObserver.observe(t)),window.addEventListener("resize",this.updateLeftColumnHeight)}setupFacetsScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#facets-scroll-sentinel");t&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(t))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent("searchTypeChanged",{detail:this.searchType}))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(t.length===0)return;const i=t[t.length-1],o=Math.floor(i/this.pageSize)+1;this.currentPage!==o&&(this.currentPage=o);const r=new CustomEvent("visiblePageChanged",{detail:{pageNumber:o}});this.dispatchEvent(r)}get initialSearchComplete(){return this._initialSearchCompletePromise}async handleQueryChange(){var e;!this.searchService||this.pageFetchQueryKey===this.previousQueryKey||!this.canPerformSearch||(this.previousQueryKey=this.pageFetchQueryKey,this.dataSource={},this.totalResults=void 0,this.aggregations=void 0,this.fullYearsHistogramAggregation=void 0,this.pageFetchesInProgress={},this.endOfDataReached=!1,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.queryErrorMessage=void 0,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&((e=this.baseQuery)===null||e===void 0?void 0:e.trim())&&(this.defaultSortField=$.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1,this._initialSearchCompletePromise=new Promise(t=>{this._initialSearchCompleteResolver=t}),await Promise.all([this.doInitialPageFetch(),this.fetchFacets()]),this._initialSearchCompleteResolver(!0))}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this),window.addEventListener("popstate",this.boundNavigationHandler))}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,o,r;const n=this.restorationStateHandler.getRestorationState();this.displayMode=n.displayMode,n.searchType!=null&&(this.searchType=n.searchType),this.selectedSort=(e=n.selectedSort)!==null&&e!==void 0?e:$.default,this.sortDirection=(t=n.sortDirection)!==null&&t!==void 0?t:null,this.selectedTitleFilter=(i=n.selectedTitleFilter)!==null&&i!==void 0?i:null,this.selectedCreatorFilter=(o=n.selectedCreatorFilter)!==null&&o!==void 0?o:null,this.selectedFacets=n.selectedFacets,this.baseQuery=n.baseQuery,this.currentPage=(r=n.currentPage)!==null&&r!==void 0?r:1,this.minSelectedDate=n.minSelectedDate,this.maxSelectedDate=n.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,o,r;const n={displayMode:this.displayMode,searchType:this.searchType,sortParam:(e=this.sortParam)!==null&&e!==void 0?e:void 0,selectedSort:this.selectedSort,sortDirection:(t=this.sortDirection)!==null&&t!==void 0?t:void 0,selectedFacets:(i=this.selectedFacets)!==null&&i!==void 0?i:ei(),baseQuery:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:(o=this.selectedTitleFilter)!==null&&o!==void 0?o:void 0,selectedCreatorFilter:(r=this.selectedCreatorFilter)!==null&&r!==void 0?r:void 0};this.restorationStateHandler.persistState(n)}async doInitialPageFetch(){this.searchResultsLoading=!0,await this.fetchPage(this.initialPageNumber,2),this.searchResultsLoading=!1}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent("searchResultsLoadingChanged",{detail:{loading:this.searchResultsLoading}}))}async requestUID(e,t){var i;const o=JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.searchType}),r=(await Na(o)).slice(0,20),n=(await this.getSessionId()).slice(0,20),l=(i=e.page)!==null&&i!==void 0?i:0,d=t.charAt(0),u=Date.now();return`R:${r}-S:${n}-P:${l}-K:${d}-T:${u}`}get filterMap(){const e=new Hr;if(this.minSelectedDate&&e.addFilter("year",this.minSelectedDate,Qe.GREATER_OR_EQUAL),this.maxSelectedDate&&e.addFilter("year",this.maxSelectedDate,Qe.LESS_OR_EQUAL),this.selectedFacets)for(const[i,o]of Object.entries(this.selectedFacets)){const{name:r,values:n}=this.prepareFacetForFetch(i,o);for(const[l,d]of Object.entries(n)){let u;d.state==="selected"?u=Qe.INCLUDE:d.state==="hidden"&&(u=Qe.EXCLUDE),u&&e.addFilter(r,l,u)}}return this.selectedTitleFilter&&e.addFilter("firstTitle",this.selectedTitleFilter,Qe.INCLUDE),this.selectedCreatorFilter&&e.addFilter("firstCreator",this.selectedCreatorFilter,Qe.INCLUDE),e.build()}get fullQuery(){var e,t;let i=(t=(e=this.baseQuery)===null||e===void 0?void 0:e.trim())!==null&&t!==void 0?t:"";const{facetQuery:o,dateRangeQueryClause:r,sortFilterQueries:n}=this;return o&&(i+=` AND ${o}`),r&&(i+=` AND ${r}`),n&&(i+=` AND ${n}`),i.trim()}get facetQuery(){var e;if(!this.selectedFacets)return;const t=[];for(const[i,o]of Object.entries(this.selectedFacets))t.push(this.buildFacetClause(i,o));return(e=this.joinFacetClauses(t))===null||e===void 0?void 0:e.trim()}buildFacetClause(e,t){const{name:i,values:o}=this.prepareFacetForFetch(e,t),r=Object.entries(o);if(r.length===0)return"";const n=[];for(const[d,u]of r){const v=u.state==="hidden"?"-":"";n.push(`${v}"${d}"`)}const l=n.join(" OR ");return`${i}:(${l})`}prepareFacetForFetch(e,t){let[i,o]=[e,t];return e==="lending"&&(i="lending___status"),{name:i,values:o}}joinFacetClauses(e){const t=e.filter(i=>i.length>0);return t.length>0?`(${t.join(" AND ")})`:void 0}facetsChanged(e){this.selectedFacets=e.detail}facetClickHandler({detail:{key:e,state:t,negative:i}}){var o,r;i?(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.searchContext,action:t!=="none"?ae.facetNegativeSelected:ae.facetNegativeDeselected,label:e}):(r=this.analyticsHandler)===null||r===void 0||r.sendEvent({category:this.searchContext,action:t!=="none"?ae.facetSelected:ae.facetDeselected,label:e})}async fetchFacets(){var e,t,i,o,r,n,l,d,u,v,f,g;const w=(e=this.baseQuery)===null||e===void 0?void 0:e.trim();if(!this.canPerformSearch)return;const{facetFetchQueryKey:C}=this,E=this.sortParam?[this.sortParam]:[],L=we(oe({},this.collectionParams),{query:w||"",rows:0,filters:this.filterMap,aggregationsSize:10});L.uid=await this.requestUID(we(oe({},L),{sort:E}),"aggregations"),this.facetsLoading=!0;const P=await((t=this.searchService)===null||t===void 0?void 0:t.search(L,this.searchType)),R=P==null?void 0:P.success;if(C!==this.facetFetchQueryKey)return;if(!R){const K=(i=P==null?void 0:P.error)===null||i===void 0?void 0:i.message,le=(r=(o=P==null?void 0:P.error)===null||o===void 0?void 0:o.details)===null||r===void 0?void 0:r.message;!K&&!le&&((l=(n=window==null?void 0:window.Sentry)===null||n===void 0?void 0:n.captureMessage)===null||l===void 0||l.call(n,"Missing or malformed facet response from backend","error"));return}const{aggregations:q,collectionTitles:W}=R.response;this.aggregations=q,W?(d=this.collectionNameCache)===null||d===void 0||d.addKnownTitles(W):!((u=this.aggregations)===null||u===void 0)&&u.collection&&((v=this.collectionNameCache)===null||v===void 0||v.preloadIdentifiers(this.aggregations.collection.buckets.map(K=>{var le;return(le=K.key)===null||le===void 0?void 0:le.toString()}))),this.fullYearsHistogramAggregation=(g=(f=R==null?void 0:R.response)===null||f===void 0?void 0:f.aggregations)===null||g===void 0?void 0:g.year_histogram,this.facetsLoading=!1}scrollToPage(e){return new Promise(t=>{const i=this.pageSize*(e-1);setTimeout(()=>{var o;this.isScrollingToCell=!0,(o=this.infiniteScroller)===null||o===void 0||o.scrollToCell(i,!0),setTimeout(()=>{var r;this.isScrollingToCell=!1,(r=this.infiniteScroller)===null||r===void 0||r.reload(),t()},500)},0)})}get isRelevanceSortAvailable(){var e;return!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim())}get canPerformSearch(){var e;if(!this.searchService)return!1;const i=!!((e=this.baseQuery)===null||e===void 0?void 0:e.trim()),o=!!this.withinCollection,r=this.searchType===ue.METADATA;return i||o&&r}get collectionParams(){return this.withinCollection?{pageType:"collection_details",pageTarget:this.withinCollection}:null}get pageFetchQueryKey(){var e,t,i,o;const r=(t=(e=this.sortParam)===null||e===void 0?void 0:e.field)!==null&&t!==void 0?t:"none",n=(o=(i=this.sortParam)===null||i===void 0?void 0:i.direction)!==null&&o!==void 0?o:"none";return`${this.fullQuery}-${this.withinCollection}-${this.searchType}-${r}-${n}`}get facetFetchQueryKey(){return`${this.fullQuery}-${this.withinCollection}-${this.searchType}`}async fetchPage(e,t=1){var i,o,r,n,l,d,u,v,f,g,w;const C=(i=this.baseQuery)===null||i===void 0?void 0:i.trim();if(!this.canPerformSearch||this.dataSource[e]||this.endOfDataReached)return;const E=e===1?t:1,L=this.pageSize*E,{pageFetchQueryKey:P}=this,R=(o=this.pageFetchesInProgress[P])!==null&&o!==void 0?o:new Set;if(R.has(e))return;for(let Y=0;Y<E;Y+=1)R.add(e+Y);this.pageFetchesInProgress[P]=R;const he=this.sortParam?[this.sortParam]:[],q=we(oe({},this.collectionParams),{query:C||"",page:e,rows:L,sort:he,filters:this.filterMap,aggregations:{omit:!0}});q.uid=await this.requestUID(q,"hits");const W=await((r=this.searchService)===null||r===void 0?void 0:r.search(q,this.searchType)),K=W==null?void 0:W.success;if(P!==this.pageFetchQueryKey)return;if(!K){const Y=(n=W==null?void 0:W.error)===null||n===void 0?void 0:n.message,ye=(d=(l=W==null?void 0:W.error)===null||l===void 0?void 0:l.details)===null||d===void 0?void 0:d.message;this.queryErrorMessage=`${Y!=null?Y:""}${ye?`; ${ye}`:""}`,this.queryErrorMessage||(this.queryErrorMessage="Missing or malformed response from backend",(v=(u=window==null?void 0:window.Sentry)===null||u===void 0?void 0:u.captureMessage)===null||v===void 0||v.call(u,this.queryErrorMessage,"error"));for(let se=0;se<E;se+=1)(f=this.pageFetchesInProgress[P])===null||f===void 0||f.delete(e+se);this.searchResultsLoading=!1;return}this.totalResults=K.response.totalResults,this.withinCollection&&(this.collectionInfo=K.response.collectionExtraInfo,this.applyDefaultCollectionSort(K.response.collectionExtraInfo));const{results:Ce,collectionTitles:He}=K.response;if(Ce&&Ce.length>0){He?(g=this.collectionNameCache)===null||g===void 0||g.addKnownTitles(He):this.preloadCollectionNames(Ce);for(let Y=0;Y<E;Y+=1){const ye=this.pageSize*Y;this.updateDataSource(e+Y,Ce.slice(ye,ye+this.pageSize))}}const We=L-Ce.length;We>0&&(this.endOfDataReached=!0,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount-We));for(let Y=0;Y<E;Y+=1)(w=this.pageFetchesInProgress[P])===null||w===void 0||w.delete(e+Y)}preloadCollectionNames(e){var t;const i=e.map(r=>{var n;return(n=r.collection)===null||n===void 0?void 0:n.values}).flat(),o=Array.from(new Set(i));(t=this.collectionNameCache)===null||t===void 0||t.preloadIdentifiers(o)}applyDefaultCollectionSort(e){var t,i;if(this.baseQuery){this.defaultSortField=$.relevance,this.defaultSortDirection=null;return}const o=(i=(t=e==null?void 0:e.public_metadata)===null||t===void 0?void 0:t["sort-by"])!==null&&i!==void 0?i:"-week";let[r,n]=o.split(":");r.startsWith("-")?(r=r.slice(1),n="desc"):["asc","desc"].includes(n)||(n="asc");const l=bn[r];l&&l!==$.default&&(this.defaultSortField=l,this.defaultSortDirection=n)}get currentVisiblePageNumbers(){var e,t;const i=(t=(e=this.infiniteScroller)===null||e===void 0?void 0:e.getVisibleCellIndices())!==null&&t!==void 0?t:[],o=new Set;return i.forEach(r=>{const n=Math.floor(r/this.pageSize)+1;o.add(n)}),Array.from(o)}updateDataSource(e,t){var i;const o=oe({},this.dataSource),r=[];t==null||t.forEach(d=>{var u,v,f,g,w,C,E,L,P,R,he,q,W,K,le,Ce,He,We,Y,ye,se,et,tt,At,Bt,It,gt,it,X,bt,J,yt,j,Pe,ot,wt,at,xt,ze,$e;if(!d.identifier)return;let rt=!1,st=!1;if(((u=d.collection)===null||u===void 0?void 0:u.values.length)&&((v=d.mediatype)===null||v===void 0?void 0:v.value)!=="collection"){for(const De of(g=(f=d.collection)===null||f===void 0?void 0:f.values)!==null&&g!==void 0?g:[])if(De==="loggedin"&&(rt=!0,st)||De==="no-preview"&&(st=!0,rt))break}r.push({averageRating:(w=d.avg_rating)===null||w===void 0?void 0:w.value,collections:(E=(C=d.collection)===null||C===void 0?void 0:C.values)!==null&&E!==void 0?E:[],collectionFilesCount:(P=(L=d.collection_files_count)===null||L===void 0?void 0:L.value)!==null&&P!==void 0?P:0,collectionSize:(he=(R=d.collection_size)===null||R===void 0?void 0:R.value)!==null&&he!==void 0?he:0,commentCount:(W=(q=d.num_reviews)===null||q===void 0?void 0:q.value)!==null&&W!==void 0?W:0,creator:(K=d.creator)===null||K===void 0?void 0:K.value,creators:(Ce=(le=d.creator)===null||le===void 0?void 0:le.values)!==null&&Ce!==void 0?Ce:[],dateAdded:(He=d.addeddate)===null||He===void 0?void 0:He.value,dateArchived:(We=d.publicdate)===null||We===void 0?void 0:We.value,datePublished:(Y=d.date)===null||Y===void 0?void 0:Y.value,dateReviewed:(ye=d.reviewdate)===null||ye===void 0?void 0:ye.value,description:(se=d.description)===null||se===void 0?void 0:se.values.join(`
`),favCount:(tt=(et=d.num_favorites)===null||et===void 0?void 0:et.value)!==null&&tt!==void 0?tt:0,href:this.collapseRepeatedQuotes((At=d.__href__)===null||At===void 0?void 0:At.value),identifier:d.identifier,issue:(Bt=d.issue)===null||Bt===void 0?void 0:Bt.value,itemCount:(gt=(It=d.item_count)===null||It===void 0?void 0:It.value)!==null&&gt!==void 0?gt:0,mediatype:(X=(it=d.mediatype)===null||it===void 0?void 0:it.value)!==null&&X!==void 0?X:"data",snippets:(J=(bt=d.highlight)===null||bt===void 0?void 0:bt.values)!==null&&J!==void 0?J:[],source:(yt=d.source)===null||yt===void 0?void 0:yt.value,subjects:(Pe=(j=d.subject)===null||j===void 0?void 0:j.values)!==null&&Pe!==void 0?Pe:[],title:(wt=(ot=d.title)===null||ot===void 0?void 0:ot.value)!==null&&wt!==void 0?wt:"",volume:(at=d.volume)===null||at===void 0?void 0:at.value,viewCount:(ze=(xt=d.downloads)===null||xt===void 0?void 0:xt.value)!==null&&ze!==void 0?ze:0,weeklyViewCount:($e=d.week)===null||$e===void 0?void 0:$e.value,loginRequired:rt,contentWarning:st})}),o[e]=r,this.dataSource=o,this.currentVisiblePageNumbers.includes(e)&&((i=this.infiniteScroller)===null||i===void 0||i.reload())}collapseRepeatedQuotes(e){return e==null?void 0:e.replace(/%22%22(?!%22%22)(.+?)%22%22/g,"%22$1%22")}async fetchPrefixFilterBuckets(e){var t,i,o,r,n,l,d;const u=(t=this.baseQuery)===null||t===void 0?void 0:t.trim();if(!this.canPerformSearch)return[];const v=wn[e],f=this.sortParam?[this.sortParam]:[],g=we(oe({},this.collectionParams),{query:u||"",rows:0,filters:this.filterMap,aggregations:{simpleParams:[v]},aggregationsSize:26});g.uid=await this.requestUID(we(oe({},g),{sort:f}),"aggregations");const w=await((i=this.searchService)===null||i===void 0?void 0:i.search(g,this.searchType));return(d=(l=(n=(r=(o=w==null?void 0:w.success)===null||o===void 0?void 0:o.response)===null||r===void 0?void 0:r.aggregations)===null||n===void 0?void 0:n[v])===null||l===void 0?void 0:l.buckets)!==null&&d!==void 0?d:[]}async updatePrefixFilterCounts(e){const{facetFetchQueryKey:t}=this,i=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap=oe({},this.prefixFilterCountMap),this.prefixFilterCountMap[e]=i.reduce((r,n)=>(r[n.key.toUpperCase()]=n.doc_count,r),{}))}async updatePrefixFiltersForCurrentSort(){if(["title","creator"].includes(this.selectedSort)){const e=this.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort()}resultSelected(e){var t,i;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:ae.resultSelected,label:e.detail.mediatype}),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.searchContext,action:ae.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(!!t)return h`
      <tile-dispatcher
        .collectionPagePath=${this.collectionPagePath}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${t}
        .tileDisplayMode=${this.displayMode}
        .resizeObserver=${this.resizeObserver}
        .collectionNameCache=${this.collectionNameCache}
        .sortParam=${this.sortParam}
        .creatorFilter=${this.selectedCreatorFilter}
        .mobileBreakpoint=${this.mobileBreakpoint}
        .loggedIn=${this.loggedIn}
        ?enableHoverPane=${!0}
        @resultSelected=${i=>this.resultSelected(i)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){this.endOfDataReached||(this.pagesToRender+=1,this.fetchPage(this.pagesToRender))}static get styles(){return[Je,m`
        :host {
          display: block;

          --leftColumnWidth: 18rem;
          --leftColumnPaddingRight: 2.5rem;
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

        .column {
          padding-top: 2rem;
        }

        #right-column {
          flex: 1;
          position: relative;
          border-left: 1px solid rgb(232, 232, 232);
          border-right: 1px solid rgb(232, 232, 232);
          padding-left: 1rem;
          padding-right: 1rem;
          margin-top: var(--rightColumnMarginTop, 0);
          background: #fff;
        }

        .mobile #right-column {
          border-left: none;
          padding: 5px 5px 0;
        }

        #left-column {
          width: var(--leftColumnWidth, 18rem);
          /* Prevents Safari from shrinking col at first draw */
          min-width: var(--leftColumnWidth, 18rem);
          padding-top: 0;
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
          margin: 10px 0;
        }

        .desktop #facets-header-container {
          padding-top: 2rem;
          flex-wrap: wrap;
        }

        .mobile #left-column {
          width: 100%;
          padding: 0;
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
          --infiniteScrollerCellMinHeight: 34px; /* override infinite scroller component */
          --infiniteScrollerCellMaxHeight: 56px;
          --infiniteScrollerRowGap: 0px;
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
      `]}};s([c({type:String})],z.prototype,"baseNavigationUrl",void 0);s([c({type:String})],z.prototype,"baseImageUrl",void 0);s([c({type:Object})],z.prototype,"searchService",void 0);s([c({type:String})],z.prototype,"searchType",void 0);s([c({type:String})],z.prototype,"withinCollection",void 0);s([c({type:String})],z.prototype,"baseQuery",void 0);s([c({type:String})],z.prototype,"displayMode",void 0);s([c({type:Object})],z.prototype,"sortParam",void 0);s([c({type:String})],z.prototype,"selectedSort",void 0);s([c({type:String})],z.prototype,"selectedTitleFilter",void 0);s([c({type:String})],z.prototype,"selectedCreatorFilter",void 0);s([c({type:String})],z.prototype,"sortDirection",void 0);s([c({type:Number})],z.prototype,"pageSize",void 0);s([c({type:Object})],z.prototype,"resizeObserver",void 0);s([c({type:Number})],z.prototype,"currentPage",void 0);s([c({type:String})],z.prototype,"minSelectedDate",void 0);s([c({type:String})],z.prototype,"maxSelectedDate",void 0);s([c({type:Object})],z.prototype,"selectedFacets",void 0);s([c({type:Boolean})],z.prototype,"showHistogramDatePicker",void 0);s([c({type:String})],z.prototype,"collectionPagePath",void 0);s([c({type:Object})],z.prototype,"collectionInfo",void 0);s([c({type:String,reflect:!0})],z.prototype,"searchContext",void 0);s([c({type:Object})],z.prototype,"collectionNameCache",void 0);s([c({type:String})],z.prototype,"pageContext",void 0);s([c({type:Object})],z.prototype,"restorationStateHandler",void 0);s([c({type:Number})],z.prototype,"mobileBreakpoint",void 0);s([c({type:Boolean})],z.prototype,"loggedIn",void 0);s([c({type:Object})],z.prototype,"modalManager",void 0);s([c({type:Object})],z.prototype,"featureFeedbackService",void 0);s([c({type:Object})],z.prototype,"recaptchaManager",void 0);s([c({type:Boolean})],z.prototype,"isManageView",void 0);s([T()],z.prototype,"pagesToRender",void 0);s([T()],z.prototype,"searchResultsLoading",void 0);s([T()],z.prototype,"facetsLoading",void 0);s([T()],z.prototype,"fullYearAggregationLoading",void 0);s([T()],z.prototype,"aggregations",void 0);s([T()],z.prototype,"fullYearsHistogramAggregation",void 0);s([T()],z.prototype,"totalResults",void 0);s([T()],z.prototype,"queryErrorMessage",void 0);s([T()],z.prototype,"mobileView",void 0);s([T()],z.prototype,"mobileFacetsVisible",void 0);s([T()],z.prototype,"contentWidth",void 0);s([T()],z.prototype,"defaultSortField",void 0);s([T()],z.prototype,"defaultSortDirection",void 0);s([T()],z.prototype,"placeholderType",void 0);s([T()],z.prototype,"prefixFilterCountMap",void 0);s([Q("#content-container")],z.prototype,"contentContainer",void 0);s([Q("#left-column")],z.prototype,"leftColumn",void 0);s([Q("collection-facets")],z.prototype,"collectionFacets",void 0);s([c({type:Object,attribute:!1})],z.prototype,"analyticsHandler",void 0);s([Q("infinite-scroller")],z.prototype,"infiniteScroller",void 0);z=s([F("collection-browser")],z);let ne=class extends A{constructor(){super(...arguments),this.searchService=this.initSearchServiceFromUrlParams(),this.resizeObserver=new ss,this.localCache=new Xr,this.collectionNameCache=new ns({searchService:this.searchService,localCache:this.localCache}),this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.loggedIn=!1,this.searchType=ue.METADATA,this.analyticsManager=new Pr,this.analyticsHandler={sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)}}sendAnalytics(e){var t;console.log("Analytics Received ----",e),this.latestAction=e,(t=this.analyticsManager)===null||t===void 0||t.sendEvent(e)}initSearchServiceFromUrlParams(){var e,t,i;const o=new URL(window.location.href).searchParams;return new qe({includeCredentials:!1,baseUrl:(e=o.get("search_base_url"))!==null&&e!==void 0?e:void 0,servicePath:(t=o.get("search_service_path"))!==null&&t!==void 0?t:void 0,debuggingEnabled:(i=!!o.get("debugging"))!==null&&i!==void 0?i:void 0})}searchPressed(e){e.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(e){e.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){var e;const t=(e=this.currentPage)!==null&&e!==void 0?e:1;t>1&&this.collectionBrowser.goToPage(t)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get("hide-dev-tools")?"hidden":""}render(){var e,t;return h`
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
                .checked=${this.searchType===ue.METADATA}
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
                .checked=${this.searchType===ue.FULLTEXT}
                @click=${this.searchTypeSelected}
              />
              <label for="fulltext-search">Full text</label>
            </span>
          </div>

          <div id="toggle-controls">
            <button
              @click=${()=>{var i,o;const r=(i=this.shadowRoot)===null||i===void 0?void 0:i.getElementById("cell-size-control");r==null||r.classList.toggle("hidden");const n=(o=this.shadowRoot)===null||o===void 0?void 0:o.getElementById("cell-gap-control");n==null||n.classList.toggle("hidden")}}
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

          <div id="cell-controls" class="hidden">
            <div id="cell-size-control">
              <div>
                <label for="cell-width-slider">Min cell width:</label>
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
            </div>
            <div id="cell-gap-control">
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
            </div>
          </div>
          <div id="checkbox-controls">
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
              <label for="show-outline-check">Show cell outlines</label>
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
                id="simulate-login"
                @click=${this.loginChanged}
              />
              <label for="simulate-login">Simulate login</label>
            </div>
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
                id="enable-date-picker"
                checked
                @click=${this.datePickerChanged}
              />
              <label for="enable-date-picker">Enable date picker</label>
            </div>
          </div>
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
          .collectionNameCache=${this.collectionNameCache}
          .showHistogramDatePicker=${!0}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
        >
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}searchTypeChanged(e){this.searchType=e.detail}searchTypeSelected(e){const t=e.target;this.searchType=t.value==="fulltext"?ue.FULLTEXT:ue.METADATA}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}toggleDevTools(){var e,t;const i=new URL(window.location.href),{searchParams:o}=i;o.get("hide-dev-tools")?o.delete("hide-dev-tools"):o.set("hide-dev-tools","true"),(t=(e=this.shadowRoot)===null||e===void 0?void 0:e.getElementById("dev-tools"))===null||t===void 0||t.classList.toggle("hidden"),window.history.replaceState&&window.history.replaceState({path:i.toString()},"",i.toString())}toggleFacetGroupOutline(e){e.target.checked?(this.collectionBrowser.classList.add("showFacetGroupOutlines"),this.modalManager.classList.add("showFacetGroupOutlines")):(this.collectionBrowser.classList.remove("showFacetGroupOutlines"),this.modalManager.classList.remove("showFacetGroupOutlines"))}async snippetsChanged(e){e.target.checked?this.searchService={async search(i,o){var r;const n=await qe.default.search(i,o);return(r=n.success)===null||r===void 0||r.response.results.forEach(l=>{Object.defineProperty(l,"highlight",{value:new M(["this is a text {{{snippet}}} block with potentially","multiple {{{snippets}}} and such","but the {{{snippet}}} block may be quite long perhaps","depending on how many {{{snippet}}} matches there are","there may be multiple lines of {{{snippets}}} to show","but each {{{snippet}}} should be relatively short","and {{{snippets}}} are each a {{{snippet}}} of text","but every {{{snippet}}} might have multiple matches","the {{{snippets}}} should be separated and surrounded by ellipses"])})}),n}}:this.searchService=qe.default,this.reperformCurrentSearch()}async reperformCurrentSearch(){const e=this.searchQuery;this.searchQuery="",await this.updateComplete,await new Promise(t=>{setTimeout(t,0)}),this.searchQuery=e}datePickerChanged(e){const t=e.target;this.collectionBrowser.showHistogramDatePicker=t.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}};ne.styles=m`
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
      width: 75%;
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

    #cell-controls {
      display: flex;
      flex-wrap: wrap;
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
  `;s([T()],ne.prototype,"currentPage",void 0);s([T()],ne.prototype,"searchQuery",void 0);s([T()],ne.prototype,"withinCollection",void 0);s([T()],ne.prototype,"cellWidth",void 0);s([T()],ne.prototype,"cellHeight",void 0);s([T()],ne.prototype,"rowGap",void 0);s([T()],ne.prototype,"colGap",void 0);s([T()],ne.prototype,"loggedIn",void 0);s([T()],ne.prototype,"searchType",void 0);s([c({type:Object,reflect:!1})],ne.prototype,"latestAction",void 0);s([Q("#base-query-field")],ne.prototype,"baseQueryField",void 0);s([Q("#base-collection-field")],ne.prototype,"baseCollectionField",void 0);s([Q("#page-number-input")],ne.prototype,"pageNumberInput",void 0);s([Q("collection-browser")],ne.prototype,"collectionBrowser",void 0);s([Q("modal-manager")],ne.prototype,"modalManager",void 0);ne=s([F("app-root")],ne);
