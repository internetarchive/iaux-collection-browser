var ds=Object.defineProperty,cs=Object.defineProperties;var hs=Object.getOwnPropertyDescriptors;var Nr=Object.getOwnPropertySymbols;var us=Object.prototype.hasOwnProperty,ps=Object.prototype.propertyIsEnumerable;var Rr=(a,e,t)=>e in a?ds(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,fe=(a,e)=>{for(var t in e||(e={}))us.call(e,t)&&Rr(a,t,e[t]);if(Nr)for(var t of Nr(e))ps.call(e,t)&&Rr(a,t,e[t]);return a},Mt=(a,e)=>cs(a,hs(e));const vs=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}};vs();function n(a,e,t,i){var r=arguments.length,s=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(a,e,t,i);else for(var l=a.length-1;l>=0;l--)(o=a[l])&&(s=(r<3?o(s):r>3?o(e,t,s):o(e,t))||s);return r>3&&s&&Object.defineProperty(e,t,s),s}function w(a){let e,t,i;return typeof a=="object"?(e=a.hashFunction,t=a.expiring,i=a.tags):e=a,(r,s,o)=>{if(o.value!=null)o.value=Ir(o.value,e,t,i);else if(o.get!=null)o.get=Ir(o.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Ti=new Map;function Ir(a,e,t=0,i){const r=Symbol("__memoized_map__");return function(...s){let o;this.hasOwnProperty(r)||Object.defineProperty(this,r,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[r];if(Array.isArray(i))for(const d of i)Ti.has(d)?Ti.get(d).push(l):Ti.set(d,[l]);if(e||s.length>0||t>0){let d;e===!0?d=s.map(v=>v.toString()).join("!"):e?d=e.apply(this,s):d=s[0];const h=`${d}__timestamp`;let p=!1;if(t>0)if(!l.has(h))p=!0;else{let v=l.get(h);p=Date.now()-v>t}l.has(d)&&!p?o=l.get(d):(o=a.apply(this,s),l.set(d,o),t>0&&l.set(h,Date.now()))}else{const d=this;l.has(d)?o=l.get(d):(o=a.apply(this,s),l.set(d,o))}return o}}class Qi{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:Boolean(e)}}Qi.shared=new Qi;class Oe{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}Oe.shared=new Oe;class ai{parseValue(e){return Oe.shared.parseValue(e)}}ai.shared=new ai;class zt{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let r=new Date(t);return(t.indexOf("Z")>-1||t.indexOf("+")>-1||t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)||t.match(/^.*?-[0-9]{2}:[0-9]{2}$/)||t.match(/^.*?-[0-9]{4}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}}zt.shared=new zt;class si{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((r,s)=>{const o=parseFloat(r);if(Number.isNaN(o))return t=!0,0;const l=e.length-1-s,d=60**l;return o*Math.floor(d)}).reduce((r,s)=>r+s,0);return t?void 0:i}}si.shared=new si;class Gi{parseValue(e){if(typeof e=="string")return e}}Gi.shared=new Gi;class ms{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const r of this.separators)if(i=t.split(r),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(s=>s.trim()).map(s=>this.parser.parseValue(s)),r=[];return i.forEach(s=>{s!==void 0&&r.push(s)}),r}}class Yi{parseValue(e){if(typeof e=="string")return e}}Yi.shared=new Yi;class oi{parseValue(e){return String(e)}}oi.shared=new oi;class me{constructor(e,t){this.parser=e,this.rawValue=t}get values(){return this.parseRawValue()}get value(){return this.values[0]}parseRawValue(){if(this.rawValue===void 0)return[];const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const r=this.parser.parseValue(i);Array.isArray(r)?t.push(...r):r!==void 0&&t.push(r)}),t}}n([w()],me.prototype,"values",null);n([w()],me.prototype,"value",null);class gs extends me{constructor(e){super(Qi.shared,e)}}class $e extends me{constructor(e){super(zt.shared,e)}}class Di extends me{constructor(e){super(si.shared,e)}}class de extends me{constructor(e){super(Oe.shared,e)}}class P extends me{constructor(e){super(oi.shared,e)}}class fs extends me{constructor(e){super(Yi.shared,e)}}class zr extends me{constructor(e){super(ai.shared,e)}}class bs extends me{constructor(e){super(Gi.shared,e)}}class ys extends me{constructor(e,t){super(t,e)}}class ws extends ys{constructor(e){const t=new ms(oi.shared);super(e,t)}}class x{constructor(e){this.rawMetadata=e}get identifier(){var e;return(e=this.rawMetadata)===null||e===void 0?void 0:e.identifier}get addeddate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.addeddate?new $e(this.rawMetadata.addeddate):void 0}get audio_codec(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_codec?new P(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_sample_rate?new de(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.avg_rating?new de(this.rawMetadata.avg_rating):void 0}get collection(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection?new P(this.rawMetadata.collection):void 0}get collections_raw(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collections_raw?new P(this.rawMetadata.collections_raw):void 0}get collection_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection_size?new zr(this.rawMetadata.collection_size):void 0}get contributor(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.contributor?new P(this.rawMetadata.contributor):void 0}get coverage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.coverage?new P(this.rawMetadata.coverage):void 0}get creator(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.creator?new P(this.rawMetadata.creator):void 0}get date(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.date?new $e(this.rawMetadata.date):void 0}get description(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.description?new P(this.rawMetadata.description):void 0}get downloads(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.downloads?new de(this.rawMetadata.downloads):void 0}get duration(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.duration?new Di(this.rawMetadata.duration):void 0}get"external-identifier"(){var e,t;return!((e=this.rawMetadata)===null||e===void 0)&&e["external-identifier"]?new P((t=this.rawMetadata)===null||t===void 0?void 0:t["external-identifier"]):void 0}get files_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.files_count?new de(this.rawMetadata.files_count):void 0}get indexdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.indexdate?new $e(this.rawMetadata.indexdate):void 0}get isbn(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.isbn?new P(this.rawMetadata.isbn):void 0}get issue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.issue?new P(this.rawMetadata.issue):void 0}get item_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_count?new de(this.rawMetadata.item_count):void 0}get item_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_size?new zr(this.rawMetadata.item_size):void 0}get language(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.language?new P(this.rawMetadata.language):void 0}get length(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.length?new Di(this.rawMetadata.length):void 0}get lineage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.lineage?new P(this.rawMetadata.lineage):void 0}get month(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.month?new de(this.rawMetadata.month):void 0}get mediatype(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.mediatype?new bs(this.rawMetadata.mediatype):void 0}get noindex(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.noindex?new gs(this.rawMetadata.noindex):void 0}get notes(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.notes?new P(this.rawMetadata.notes):void 0}get num_favorites(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_favorites?new de(this.rawMetadata.num_favorites):void 0}get num_reviews(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_reviews?new de(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_edition?new P(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_work?new P(this.rawMetadata.openlibrary_work):void 0}get page_progression(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.page_progression?new fs(this.rawMetadata.page_progression):void 0}get partner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.partner?new P(this.rawMetadata.partner):void 0}get ppi(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.ppi?new de(this.rawMetadata.ppi):void 0}get publicdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publicdate?new $e(this.rawMetadata.publicdate):void 0}get publisher(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publisher?new P(this.rawMetadata.publisher):void 0}get reviewdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.reviewdate?new $e(this.rawMetadata.reviewdate):void 0}get runtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.runtime?new Di(this.rawMetadata.runtime):void 0}get scanner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.scanner?new P(this.rawMetadata.scanner):void 0}get source(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.source?new P(this.rawMetadata.source):void 0}get start_localtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_localtime?new $e(this.rawMetadata.start_localtime):void 0}get start_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_time?new $e(this.rawMetadata.start_time):void 0}get stop_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.stop_time?new $e(this.rawMetadata.stop_time):void 0}get subject(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.subject?new ws(this.rawMetadata.subject):void 0}get taper(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.taper?new P(this.rawMetadata.taper):void 0}get title(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.title?new P(this.rawMetadata.title):void 0}get transferer(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.transferer?new P(this.rawMetadata.transferer):void 0}get track(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.track?new de(this.rawMetadata.track):void 0}get type(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.type?new P(this.rawMetadata.type):void 0}get uploader(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.uploader?new P(this.rawMetadata.uploader):void 0}get utc_offset(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.utc_offset?new de(this.rawMetadata.utc_offset):void 0}get venue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.venue?new P(this.rawMetadata.venue):void 0}get volume(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.volume?new P(this.rawMetadata.volume):void 0}get week(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.week?new de(this.rawMetadata.week):void 0}get year(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.year?new $e(this.rawMetadata.year):void 0}}n([w()],x.prototype,"addeddate",null);n([w()],x.prototype,"audio_codec",null);n([w()],x.prototype,"audio_sample_rate",null);n([w()],x.prototype,"avg_rating",null);n([w()],x.prototype,"collection",null);n([w()],x.prototype,"collections_raw",null);n([w()],x.prototype,"collection_size",null);n([w()],x.prototype,"contributor",null);n([w()],x.prototype,"coverage",null);n([w()],x.prototype,"creator",null);n([w()],x.prototype,"date",null);n([w()],x.prototype,"description",null);n([w()],x.prototype,"downloads",null);n([w()],x.prototype,"duration",null);n([w()],x.prototype,"external-identifier",null);n([w()],x.prototype,"files_count",null);n([w()],x.prototype,"indexdate",null);n([w()],x.prototype,"isbn",null);n([w()],x.prototype,"issue",null);n([w()],x.prototype,"item_count",null);n([w()],x.prototype,"item_size",null);n([w()],x.prototype,"language",null);n([w()],x.prototype,"length",null);n([w()],x.prototype,"lineage",null);n([w()],x.prototype,"month",null);n([w()],x.prototype,"mediatype",null);n([w()],x.prototype,"noindex",null);n([w()],x.prototype,"notes",null);n([w()],x.prototype,"num_favorites",null);n([w()],x.prototype,"num_reviews",null);n([w()],x.prototype,"openlibrary_edition",null);n([w()],x.prototype,"openlibrary_work",null);n([w()],x.prototype,"page_progression",null);n([w()],x.prototype,"partner",null);n([w()],x.prototype,"ppi",null);n([w()],x.prototype,"publicdate",null);n([w()],x.prototype,"publisher",null);n([w()],x.prototype,"reviewdate",null);n([w()],x.prototype,"runtime",null);n([w()],x.prototype,"scanner",null);n([w()],x.prototype,"source",null);n([w()],x.prototype,"start_localtime",null);n([w()],x.prototype,"start_time",null);n([w()],x.prototype,"stop_time",null);n([w()],x.prototype,"subject",null);n([w()],x.prototype,"taper",null);n([w()],x.prototype,"title",null);n([w()],x.prototype,"transferer",null);n([w()],x.prototype,"track",null);n([w()],x.prototype,"type",null);n([w()],x.prototype,"uploader",null);n([w()],x.prototype,"utc_offset",null);n([w()],x.prototype,"venue",null);n([w()],x.prototype,"volume",null);n([w()],x.prototype,"week",null);n([w()],x.prototype,"year",null);class ft{constructor(e){this.rawValue=e}get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){return this.rawValue.mtime}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size?ai.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length?si.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height?Oe.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width?Oe.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track?Oe.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}}n([w()],ft.prototype,"size",null);n([w()],ft.prototype,"length",null);n([w()],ft.prototype,"height",null);n([w()],ft.prototype,"width",null);n([w()],ft.prototype,"track",null);class pi{constructor(e){this.rawValue=e}get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewdate(){return this.rawValue.reviewdate?zt.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate?zt.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars?Oe.shared.parseValue(this.rawValue.stars):void 0}}n([w()],pi.prototype,"reviewdate",null);n([w()],pi.prototype,"createdate",null);n([w()],pi.prototype,"stars",null);class Ss{constructor(e){var t,i;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(r=>new ft(r)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new x(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(i=e.reviews)===null||i===void 0?void 0:i.map(r=>new pi(r))}}class $s{constructor(e){this.numFound=e.numFound,this.start=e.start,this.docs=e.docs.map(t=>new x(t)),this.aggregations=e.aggregations}}class xs{constructor(e){this.rawResponse=e,this.responseHeader=e.responseHeader,this.response=new $s(e.response)}}var je;(function(a){a.networkError="SearchService.NetworkError",a.itemNotFound="SearchService.ItemNotFound",a.decodingError="SearchService.DecodingError",a.searchEngineError="SearchService.SearchEngineError"})(je||(je={}));class Ki extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}class Cs{static aggregateSearchParamsAsString(e){if(e.advancedParams){const t=e.advancedParams.map(r=>({terms:r}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field} ${e.direction}`}static generateURLSearchParams(e){const t=new URLSearchParams;if(t.append("q",e.query),t.append("output","json"),e.rows&&t.append("rows",String(e.rows)),e.page&&t.append("page",String(e.page)),e.fields&&t.append("fl",e.fields.join(",")),e.sort){const r=e.sort.map(s=>this.sortParamsAsString(s));t.append("sort",r.join(","))}const i=e.aggregations;if(i){const r=this.aggregateSearchParamsAsString(i);r&&t.append("user_aggs",r)}return t}}class _s{constructor(e){var t;if(this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,(e==null?void 0:e.scope)!==void 0)this.requestScope=e.scope;else{const r=new URL(window.location.href).searchParams.get("scope");r&&(this.requestScope=r)}}async performSearch(e){const i=Cs.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}/advancedsearch.php?${i}`;return this.fetchUrl(r)}async fetchMetadata(e,t){const i=t?`/${t}`:"",r=`https://${this.baseUrl}/metadata/${e}${i}`;return this.fetchUrl(r,{requestOptions:{credentials:"omit"}})}async fetchUrl(e,t){var i;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope);let s;try{const o=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};s=await fetch(r.href,o)}catch(o){const l=o instanceof Error?o.message:typeof o=="string"?o:"Unknown error";return this.getErrorResult(je.networkError,l)}try{const o=await s.json(),l=o.error;if(l){const d=o.forensics;return this.getErrorResult(je.searchEngineError,l,d)}else return{success:o}}catch(o){const l=o instanceof Error?o.message:typeof o=="string"?o:"Unknown error";return this.getErrorResult(je.decodingError,l)}}getErrorResult(e,t,i){return{error:new Ki(e,t,i)}}}class qi{constructor(e){this.searchBackend=e}async search(e){const t=await this.searchBackend.performSearch(e);return t.error?t:{success:new xs(t.success)}}async fetchMetadata(e){var t;const i=await this.searchBackend.fetchMetadata(e);return i.error?i:((t=i.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new Ki(je.itemNotFound)}:{success:new Ss(i.success)}}async fetchMetadataValue(e,t){var i;const r=await this.searchBackend.fetchMetadata(e,t);return r.error?r:((i=r.success)===null||i===void 0?void 0:i.result)===void 0?{error:new Ki(je.itemNotFound)}:{success:r.success.result}}}qi.default=new qi(new _s);function ks(){var a=!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent);if(!a||!indexedDB.databases)return Promise.resolve();var e;return new Promise(function(t){var i=function(){return indexedDB.databases().finally(t)};e=setInterval(i,100),i()}).finally(function(){return clearInterval(e)})}function bt(a){return new Promise((e,t)=>{a.oncomplete=a.onsuccess=()=>e(a.result),a.onabort=a.onerror=()=>t(a.error)})}function Ts(a,e){const t=ks().then(()=>{const i=indexedDB.open(a);return i.onupgradeneeded=()=>i.result.createObjectStore(e),bt(i)});return(i,r)=>t.then(s=>r(s.transaction(e,i).objectStore(e)))}let Mi;function vi(){return Mi||(Mi=Ts("keyval-store","keyval")),Mi}function Ds(a,e=vi()){return e("readonly",t=>bt(t.get(a)))}function Ms(a,e,t=vi()){return t("readwrite",i=>(i.put(e,a),bt(i.transaction)))}function As(a,e=vi()){return e("readwrite",t=>(t.delete(a),bt(t.transaction)))}function Es(a,e){return a.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},bt(a.transaction)}function Os(a=vi()){return a("readonly",e=>{if(e.getAllKeys)return bt(e.getAllKeys());const t=[];return Es(e,i=>t.push(i.key)).then(()=>t)})}function Ls(a,e){return a.setMilliseconds(a.getMilliseconds()+e*1e3),a}class Fs{constructor(e){var t,i,r,s;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((r=e==null?void 0:e.immediateClean)!==null&&r!==void 0)||r)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const o=(s=e==null?void 0:e.cleaningInterval)!==null&&s!==void 0?s:60;setInterval(()=>{this.cleanExpired()},o*1e3)}}async set(e){var t;const i={value:e.value},r=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,s=Ls(new Date,r);i.expires=s;const o=this.getNamespacedKey(e.key);try{await Ms(o,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await Ds(t)}catch{}if(!i)return;const r=new Date;if(i.expires&&i.expires<r){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await As(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Os()}catch{}const t=[];for(const s of e)typeof s=="string"&&t.push(s);return t.filter(s=>s.startsWith(this.namespace)).map(s=>this.removeNamespace(s))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nr=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,lr=Symbol(),Pr=new Map;class _a{constructor(e,t){if(this._$cssResult$=!0,t!==lr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=Pr.get(this.cssText);return nr&&e===void 0&&(Pr.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Ns=a=>new _a(typeof a=="string"?a:a+"",lr),b=(a,...e)=>{const t=a.length===1?a[0]:e.reduce((i,r,s)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+a[s+1],a[0]);return new _a(t,lr)},Rs=(a,e)=>{nr?a.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),r=window.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,a.appendChild(i)})},Br=nr?a=>a:a=>a instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ns(t)})(a):a;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ai;const Ur=window.trustedTypes,Is=Ur?Ur.emptyScript:"",Hr=window.reactiveElementPolyfillSupport,Xi={toAttribute(a,e){switch(e){case Boolean:a=a?Is:null;break;case Object:case Array:a=a==null?a:JSON.stringify(a)}return a},fromAttribute(a,e){let t=a;switch(e){case Boolean:t=a!==null;break;case Number:t=a===null?null:Number(a);break;case Object:case Array:try{t=JSON.parse(a)}catch{t=null}}return t}},ka=(a,e)=>e!==a&&(e==e||a==a),Ei={attribute:!0,type:String,converter:Xi,reflect:!1,hasChanged:ka};class nt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const r=this._$Eh(i,t);r!==void 0&&(this._$Eu.set(r,i),e.push(r))}),e}static createProperty(e,t=Ei){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ei}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of i)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(Br(r))}else e!==void 0&&t.push(Br(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Rs(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Ei){var r,s;const o=this.constructor._$Eh(e,i);if(o!==void 0&&i.reflect===!0){const l=((s=(r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&s!==void 0?s:Xi.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(o):this.setAttribute(o,l),this._$Ei=null}}_$AK(e,t){var i,r,s;const o=this.constructor,l=o._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const d=o.getPropertyOptions(l),h=d.converter,p=(s=(r=(i=h)===null||i===void 0?void 0:i.fromAttribute)!==null&&r!==void 0?r:typeof h=="function"?h:null)!==null&&s!==void 0?s:Xi.fromAttribute;this._$Ei=l,this[l]=p(t,d.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||ka)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((r,s)=>this[s]=r),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(r=>{var s;return(s=r.hostUpdate)===null||s===void 0?void 0:s.call(r)}),this.update(i)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}nt.finalized=!0,nt.elementProperties=new Map,nt.elementStyles=[],nt.shadowRootOptions={mode:"open"},Hr==null||Hr({ReactiveElement:nt}),((Ai=globalThis.reactiveElementVersions)!==null&&Ai!==void 0?Ai:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Oi;const pt=globalThis.trustedTypes,Vr=pt?pt.createPolicy("lit-html",{createHTML:a=>a}):void 0,xe=`lit$${(Math.random()+"").slice(9)}$`,dr="?"+xe,zs=`<${dr}>`,vt=document,Pt=(a="")=>vt.createComment(a),Bt=a=>a===null||typeof a!="object"&&typeof a!="function",Ta=Array.isArray,Da=a=>{var e;return Ta(a)||typeof((e=a)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},At=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wr=/-->/g,jr=/>/g,Be=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Qr=/'/g,Gr=/"/g,Ma=/^(?:script|style|textarea|title)$/i,Aa=a=>(e,...t)=>({_$litType$:a,strings:e,values:t}),m=Aa(1),F=Aa(2),ce=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),Yr=new WeakMap,ei=(a,e,t)=>{var i,r;const s=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let o=s._$litPart$;if(o===void 0){const l=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;s._$litPart$=o=new yt(e.insertBefore(Pt(),l),l,void 0,t!=null?t:{})}return o._$AI(a),o},ut=vt.createTreeWalker(vt,129,null,!1),Ea=(a,e)=>{const t=a.length-1,i=[];let r,s=e===2?"<svg>":"",o=At;for(let d=0;d<t;d++){const h=a[d];let p,v,f=-1,y=0;for(;y<h.length&&(o.lastIndex=y,v=o.exec(h),v!==null);)y=o.lastIndex,o===At?v[1]==="!--"?o=Wr:v[1]!==void 0?o=jr:v[2]!==void 0?(Ma.test(v[2])&&(r=RegExp("</"+v[2],"g")),o=Be):v[3]!==void 0&&(o=Be):o===Be?v[0]===">"?(o=r!=null?r:At,f=-1):v[1]===void 0?f=-2:(f=o.lastIndex-v[2].length,p=v[1],o=v[3]===void 0?Be:v[3]==='"'?Gr:Qr):o===Gr||o===Qr?o=Be:o===Wr||o===jr?o=At:(o=Be,r=void 0);const $=o===Be&&a[d+1].startsWith("/>")?" ":"";s+=o===At?h+zs:f>=0?(i.push(p),h.slice(0,f)+"$lit$"+h.slice(f)+xe+$):h+xe+(f===-2?(i.push(void 0),d):$)}const l=s+(a[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(a)||!a.hasOwnProperty("raw"))throw Error("invalid template strings array");return[Vr!==void 0?Vr.createHTML(l):l,i]};class Ut{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const l=e.length-1,d=this.parts,[h,p]=Ea(e,t);if(this.el=Ut.createElement(h,i),ut.currentNode=this.el.content,t===2){const v=this.el.content,f=v.firstChild;f.remove(),v.append(...f.childNodes)}for(;(r=ut.nextNode())!==null&&d.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const v=[];for(const f of r.getAttributeNames())if(f.endsWith("$lit$")||f.startsWith(xe)){const y=p[o++];if(v.push(f),y!==void 0){const $=r.getAttribute(y.toLowerCase()+"$lit$").split(xe),k=/([.?@])?(.*)/.exec(y);d.push({type:1,index:s,name:k[2],strings:$,ctor:k[1]==="."?La:k[1]==="?"?Fa:k[1]==="@"?Na:Wt})}else d.push({type:6,index:s})}for(const f of v)r.removeAttribute(f)}if(Ma.test(r.tagName)){const v=r.textContent.split(xe),f=v.length-1;if(f>0){r.textContent=pt?pt.emptyScript:"";for(let y=0;y<f;y++)r.append(v[y],Pt()),ut.nextNode(),d.push({type:2,index:++s});r.append(v[f],Pt())}}}else if(r.nodeType===8)if(r.data===dr)d.push({type:2,index:s});else{let v=-1;for(;(v=r.data.indexOf(xe,v+1))!==-1;)d.push({type:7,index:s}),v+=xe.length-1}s++}}static createElement(e,t){const i=vt.createElement("template");return i.innerHTML=e,i}}function Ye(a,e,t=a,i){var r,s,o,l;if(e===ce)return e;let d=i!==void 0?(r=t._$Cl)===null||r===void 0?void 0:r[i]:t._$Cu;const h=Bt(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==h&&((s=d==null?void 0:d._$AO)===null||s===void 0||s.call(d,!1),h===void 0?d=void 0:(d=new h(a),d._$AT(a,t,i)),i!==void 0?((o=(l=t)._$Cl)!==null&&o!==void 0?o:l._$Cl=[])[i]=d:t._$Cu=d),d!==void 0&&(e=Ye(a,d._$AS(a,e.values),d,i)),e}class Oa{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:vt).importNode(i,!0);ut.currentNode=s;let o=ut.nextNode(),l=0,d=0,h=r[0];for(;h!==void 0;){if(l===h.index){let p;h.type===2?p=new yt(o,o.nextSibling,this,e):h.type===1?p=new h.ctor(o,h.name,h.strings,this,e):h.type===6&&(p=new Ra(o,this,e)),this.v.push(p),h=r[++d]}l!==(h==null?void 0:h.index)&&(o=ut.nextNode(),l++)}return s}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class yt{constructor(e,t,i,r){var s;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=(s=r==null?void 0:r.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ye(this,e,t),Bt(e)?e===_||e==null||e===""?(this._$AH!==_&&this._$AR(),this._$AH=_):e!==this._$AH&&e!==ce&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Da(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==_&&Bt(this._$AH)?this._$AA.nextSibling.data=e:this.k(vt.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ut.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.m(i);else{const o=new Oa(s,this),l=o.p(this.options);o.m(i),this.k(l),this._$AH=o}}_$AC(e){let t=Yr.get(e.strings);return t===void 0&&Yr.set(e.strings,t=new Ut(e)),t}S(e){Ta(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new yt(this.M(Pt()),this.M(Pt()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Wt{constructor(e,t,i,r,s){this.type=1,this._$AH=_,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(s===void 0)e=Ye(this,e,t,0),o=!Bt(e)||e!==this._$AH&&e!==ce,o&&(this._$AH=e);else{const l=e;let d,h;for(e=s[0],d=0;d<s.length-1;d++)h=Ye(this,l[i+d],t,d),h===ce&&(h=this._$AH[d]),o||(o=!Bt(h)||h!==this._$AH[d]),h===_?e=_:e!==_&&(e+=(h!=null?h:"")+s[d+1]),this._$AH[d]=h}o&&!r&&this.C(e)}C(e){e===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class La extends Wt{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===_?void 0:e}}const Ps=pt?pt.emptyScript:"";class Fa extends Wt{constructor(){super(...arguments),this.type=4}C(e){e&&e!==_?this.element.setAttribute(this.name,Ps):this.element.removeAttribute(this.name)}}class Na extends Wt{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=(i=Ye(this,e,t,0))!==null&&i!==void 0?i:_)===ce)return;const r=this._$AH,s=e===_&&r!==_||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==_&&(r===_||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Ra{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ye(this,e)}}const Bs={L:"$lit$",P:xe,V:dr,I:1,N:Ea,R:Oa,j:Da,D:Ye,H:yt,F:Wt,O:Fa,W:Na,B:La,Z:Ra},Kr=window.litHtmlPolyfillSupport;Kr==null||Kr(Ut,yt),((Oi=globalThis.litHtmlVersions)!==null&&Oi!==void 0?Oi:globalThis.litHtmlVersions=[]).push("2.2.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Li,Fi;class B extends nt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=ei(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return ce}}B.finalized=!0,B._$litElement$=!0,(Li=globalThis.litElementHydrateSupport)===null||Li===void 0||Li.call(globalThis,{LitElement:B});const qr=globalThis.litElementPolyfillSupport;qr==null||qr({LitElement:B});((Fi=globalThis.litElementVersions)!==null&&Fi!==void 0?Fi:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=a=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(a,e):((t,i)=>{const{kind:r,elements:s}=i;return{kind:r,elements:s,finisher(o){window.customElements.define(t,o)}}})(a,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Us=(a,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?Mt(fe({},e),{finisher(t){t.createProperty(e.key,a)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,a)}};function u(a){return(e,t)=>t!==void 0?((i,r,s)=>{r.constructor.createProperty(s,i)})(a,e,t):Us(a,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function D(a){return u(Mt(fe({},a),{state:!0}))}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ia=({finisher:a,descriptor:e})=>(t,i)=>{var r;if(i===void 0){const s=(r=t.originalKey)!==null&&r!==void 0?r:t.key,o=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:Mt(fe({},t),{key:s});return a!=null&&(o.finisher=function(l){a(l,s)}),o}{const s=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),a==null||a(s,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le(a,e){return Ia({descriptor:t=>{const i={get(){var r,s;return(s=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(a))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0};if(e){const r=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var s,o;return this[r]===void 0&&(this[r]=(o=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(a))!==null&&o!==void 0?o:null),this[r]}}return i}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Hs(a){return Ia({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(a))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ni;((Ni=window.HTMLSlotElement)===null||Ni===void 0?void 0:Ni.prototype.assignedElements)!=null;class Vs{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(r=>{r.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class Ws{constructor(e){var t,i,r,s;this.cacheKeyName="collection-name-cache",this.cacheTtl=60*60*24*7,this.defaultLoadDelay=100,this.loadDelay=100,this.defaultPruningAge=1e3*60*60*24*7,this.defaultPruningInterval=1e3*30,this.fetchTimeout=null,this.pendingIdentifierQueue=new Set,this.pendingPromises={},this.collectionNameCache={},this.pruningAge=this.defaultPruningAge,this.maxCacheSize=2500,this.cacheLoaded=!1,this.searchService=e.searchService,this.localCache=e.localCache,this.loadDelay=(t=e.loadDelay)!==null&&t!==void 0?t:this.defaultLoadDelay,this.pruningAge=(i=e.pruningAge)!==null&&i!==void 0?i:this.pruningAge,this.maxCacheSize=(r=e.maxCacheSize)!==null&&r!==void 0?r:this.maxCacheSize,this.pruneCache(),setInterval(async()=>{await this.pruneCache()},(s=e.pruneInterval)!==null&&s!==void 0?s:this.defaultPruningInterval)}async collectionNameFor(e){this.cacheLoaded||await this.loadFromCache();const t=e.toLowerCase(),i=this.collectionNameCache[t];return i?(i.lastAccess=Date.now(),this.collectionNameCache[t]=i,i.name):(this.startPendingIdentifierTimer(),new Promise(r=>{var s;this.pendingIdentifierQueue.add(t);const o=(s=this.pendingPromises[t])!==null&&s!==void 0?s:[],l=async d=>{r(d)};o.push(l),this.pendingPromises[t]=o}))}async preloadIdentifiers(e){this.cacheLoaded||await this.loadFromCache();const t=e.filter(i=>i!==void 0).map(i=>i.toLowerCase());for(const i of t)this.collectionNameCache[i]||this.pendingIdentifierQueue.add(i);this.startPendingIdentifierTimer()}async startPendingIdentifierTimer(){this.fetchTimeout||(this.fetchTimeout=window.setTimeout(()=>{this.loadPendingIdentifiers(),this.fetchTimeout=null},this.loadDelay))}async loadFromCache(){if(!this.localCache||this.cacheLoaded)return;const e=await this.localCache.get(this.cacheKeyName);!e||(this.collectionNameCache=e,this.cacheLoaded=!0)}async loadPendingIdentifiers(){var e,t,i;await this.loadFromCache();const r=Array.from(this.pendingIdentifierQueue).splice(0,100);if(r.length===0)return;r.map(async d=>this.pendingIdentifierQueue.delete(d));const s={query:`identifier:(${r.join(" OR ")})`,fields:["title","identifier"],rows:r.length},l=(t=(e=(await this.searchService.search(s)).success)===null||e===void 0?void 0:e.response)===null||t===void 0?void 0:t.docs;if(l&&l.length>0)for(const d of l){const{identifier:h,title:p}=d;if(!h)continue;const v=h.toLowerCase();r.splice(r.indexOf(v),1);const f=(i=p==null?void 0:p.value)!==null&&i!==void 0?i:null;this.collectionNameCache[v]={name:f,lastAccess:Date.now()};const y=this.pendingPromises[v];if(y){for(const $ of y)$(f);delete this.pendingPromises[v]}}for(const d of r){this.collectionNameCache[d]={name:null,lastAccess:Date.now()};const h=this.pendingPromises[d];if(h){for(const p of h)p(null);delete this.pendingPromises[d]}}await this.persistCache()}async pruneCache(){await this.loadFromCache();const e=Date.now(),t=Object.entries(this.collectionNameCache).sort((r,s)=>{var o,l,d,h;const p=(l=(o=r[1])===null||o===void 0?void 0:o.lastAccess)!==null&&l!==void 0?l:0,v=(h=(d=s[1])===null||d===void 0?void 0:d.lastAccess)!==null&&h!==void 0?h:0;return p-v}),i=new Set;for(const[r,s]of t){if(!s)continue;const{lastAccess:o}=s;o<e-this.pruningAge&&i.add(r)}if(t.length>this.maxCacheSize)for(let r=0;r<t.length-this.maxCacheSize;r+=1){const[s]=t[r];i.add(s)}for(const r of i)delete this.collectionNameCache[r];await this.persistCache()}async persistCache(){var e;await((e=this.localCache)===null||e===void 0?void 0:e.set({key:this.cacheKeyName,value:this.collectionNameCache,ttl:this.cacheTtl}))}}let Ht=class extends B{render(){return m` ${this.name?this.name:this.identifier} `}createRenderRoot(){return this}updated(e){(e.has("identifier")||e.has("collectionNameCache"))&&this.fetchName()}async fetchName(){!this.identifier||!this.collectionNameCache||(this.name=await this.collectionNameCache.collectionNameFor(this.identifier))}};n([u({type:Object})],Ht.prototype,"collectionNameCache",void 0);n([u({type:String})],Ht.prototype,"identifier",void 0);n([D()],Ht.prototype,"name",void 0);Ht=n([Q("async-collection-name")],Ht);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qe=a=>a!=null?a:_;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},cr=a=>(...e)=>({_$litDirective$:a,values:e});class hr{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:js}=Bs,Qs=a=>a.strings===void 0,Xr=()=>document.createComment(""),Et=(a,e,t)=>{var i;const r=a._$AA.parentNode,s=e===void 0?a._$AB:e._$AA;if(t===void 0){const o=r.insertBefore(Xr(),s),l=r.insertBefore(Xr(),s);t=new js(o,l,a,a.options)}else{const o=t._$AB.nextSibling,l=t._$AM,d=l!==a;if(d){let h;(i=t._$AQ)===null||i===void 0||i.call(t,a),t._$AM=a,t._$AP!==void 0&&(h=a._$AU)!==l._$AU&&t._$AP(h)}if(o!==s||d){let h=t._$AA;for(;h!==o;){const p=h.nextSibling;r.insertBefore(h,s),h=p}}}return t},Ue=(a,e,t=a)=>(a._$AI(e,t),a),Gs={},za=(a,e=Gs)=>a._$AH=e,Ys=a=>a._$AH,Ri=a=>{var e;(e=a._$AP)===null||e===void 0||e.call(a,!1,!0);let t=a._$AA;const i=a._$AB.nextSibling;for(;t!==i;){const r=t.nextSibling;t.remove(),t=r}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zr=(a,e,t)=>{const i=new Map;for(let r=e;r<=t;r++)i.set(a[r],r);return i},Pa=cr(class extends hr{constructor(a){if(super(a),a.type!==Me.CHILD)throw Error("repeat() can only be used in text expressions")}dt(a,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const r=[],s=[];let o=0;for(const l of a)r[o]=i?i(l,o):o,s[o]=t(l,o),o++;return{values:s,keys:r}}render(a,e,t){return this.dt(a,e,t).values}update(a,[e,t,i]){var r;const s=Ys(a),{values:o,keys:l}=this.dt(e,t,i);if(!Array.isArray(s))return this.ut=l,o;const d=(r=this.ut)!==null&&r!==void 0?r:this.ut=[],h=[];let p,v,f=0,y=s.length-1,$=0,k=o.length-1;for(;f<=y&&$<=k;)if(s[f]===null)f++;else if(s[y]===null)y--;else if(d[f]===l[$])h[$]=Ue(s[f],o[$]),f++,$++;else if(d[y]===l[k])h[k]=Ue(s[y],o[k]),y--,k--;else if(d[f]===l[k])h[k]=Ue(s[f],o[k]),Et(a,h[k+1],s[f]),f++,k--;else if(d[y]===l[$])h[$]=Ue(s[y],o[$]),Et(a,s[f],s[y]),y--,$++;else if(p===void 0&&(p=Zr(l,$,k),v=Zr(d,f,y)),p.has(d[f]))if(p.has(d[y])){const E=v.get(l[$]),A=E!==void 0?s[E]:null;if(A===null){const N=Et(a,s[f]);Ue(N,o[$]),h[$]=N}else h[$]=Ue(A,o[$]),Et(a,s[f],A),s[E]=null;$++}else Ri(s[y]),y--;else Ri(s[f]),f++;for(;$<=k;){const E=Et(a,h[k+1]);Ue(E,o[$]),h[$++]=E}for(;f<=y;){const E=s[f++];E!==null&&Ri(E)}return this.ut=l,za(a,h),ce}});function qt(a,e,t){return Array.from({length:(e-a)/t+1},(i,r)=>a+r*t)}let Fe=class extends B{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const r=t.target.dataset.cellIndex;if(!r)return;const s=parseInt(r,10);t.isIntersecting?this.visibleCellIndices.add(s):this.visibleCellIndices.delete(s)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){qt(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const r=t?"smooth":"auto";return i.scrollIntoView({behavior:r}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(qt(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){const e=this.itemCount-1,t=qt(0,e,1);return m`
      <div id="container">
        <div id="sentinel"></div>
        ${Pa(t,i=>i,i=>m`
            <div
              class="cell-container"
              data-cell-index=${i}
              @click=${r=>this.cellSelected(r,i)}
              @keyup=${r=>{r.key==="Enter"&&this.cellSelected(r,i)}}
            ></div>
          `)}
      </div>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),t=Math.max(10,e.length),i=e.sort((h,p)=>h>p?1:-1),r=e.length===0,s=r?0:Math.max(i[0]-t,0),o=r?t:Math.min(i[i.length-1]+t,this.itemCount-1),l=qt(s,o,1);this.renderCellBuffer(l),this.removeCellsOutsideBufferRange(l);const d=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(d)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const r=this.cellContainerForIndex(t);if(!r)return;const s=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(r.style.height="auto",s)ei(s,r),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;ei(this.placeholderCellTemplate,r),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,ei(_,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=b`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=b`var(--infiniteScrollerRowGap, 1.7rem)`,i=b`var(--infiniteScrollerColGap, 1.7rem)`,r=b`var(--infiniteScrollerCellMinWidth, 16rem)`,s=b`var(--infiniteScrollerCellMaxWidth, 1fr)`,o=b`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=b`var(--infiniteScrollerCellMaxHeight, none)`,d=b`var(--infiniteScrollerCellOutline, 0)`;return b`
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
            minmax(${r}, ${s})
          );
        }
      }

      .cell-container {
        outline: ${d};
        min-height: ${o};
        max-height: ${l};
        min-width: ${r};
        max-width: ${s};
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
    `}};n([u({type:Number})],Fe.prototype,"itemCount",void 0);n([u({type:Object})],Fe.prototype,"cellProvider",void 0);n([u({type:Object})],Fe.prototype,"placeholderCellTemplate",void 0);n([u({type:Boolean})],Fe.prototype,"scrollOptimizationsDisabled",void 0);n([le("#sentinel")],Fe.prototype,"sentinel",void 0);n([Hs(".cell-container")],Fe.prototype,"cellContainers",void 0);Fe=n([Q("infinite-scroller")],Fe);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ks=(a,...e)=>({strTag:!0,strings:a,values:e}),ot=Ks,qs=a=>typeof a!="string"&&"strTag"in a,Xs=(a,e,t)=>{let i=a[0];for(let r=1;r<a.length;r++)i+=e[t?t[r-1]:r-1],i+=a[r];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zs=a=>qs(a)?Xs(a.strings,a.values):a;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Js{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let a=0;a<256;a++)(a>>4&15).toString(16)+(a&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let eo=new Js;eo.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ve=Zs;const Ba=F`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;let Zi=class extends B{render(){var e,t,i;return m`
      <div id="container">
        <div id="collection-image-title">
          <div id="collection-title">${(e=this.model)===null||e===void 0?void 0:e.title}</div>
          <div id="collection-image-container">
            <div
              id="collection-image"
              style="background-image:url('https://archive.org/services/img/${(t=this.model)===null||t===void 0?void 0:t.identifier}')"
            ></div>
          </div>
        </div>
        <div id="item-count-container">
          <div id="item-count-image-container">${Ba}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${(i=this.model)===null||i===void 0?void 0:i.itemCount.toLocaleString()}</div>
            <div id="items-text">${Ve("items")}</div>
          </div>
        </div>
      </div>
    `}static get styles(){const e=b`var(--collectionTileCornerRadius, 4px)`;return b`
      #collection-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      #collection-image {
        width: 16rem;
        height: 16rem;
        border-radius: 0.8rem;
        overflow: hidden;
        box-shadow: 1px 1px 2px 0px;
        object-fit: cover;
        background-position: center;
        background-size: cover;
      }

      #item-count-image-container svg {
        filter: invert(100%);
      }

      #collection-image-title {
        background-color: #666;
        border: 1px solid #2c2c2c;
        padding: 0.5rem;
        border-top-left-radius: ${e};
        border-top-right-radius: ${e};
        display: flex;
        flex-direction: column;
        flex: 1;
      }

      #collection-title {
        font-weight: bold;
        color: #fff;
        font-size: 1.6rem;
        text-align: center;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #container {
        box-shadow: 1px 1px 2px 0px;
        border-radius: ${e};
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      #container:hover > #collection-image-title > #collection-title {
        text-decoration: underline;
      }

      /* this is a workaround for Safari 15 where the hover effects are not working */
      #collection-image-title:hover > #collection-title {
        text-decoration: underline;
      }

      #container:hover > #collection-image-title {
        background-color: #757575;
      }

      #item-count-container {
        background-color: #444;
        border-bottom: 1px solid #2c2c2c;
        border-left: 1px solid #2c2c2c;
        border-right: 1px solid #2c2c2c;
        border-bottom-left-radius: ${e};
        border-bottom-right-radius: ${e};
        display: flex;
        padding: 0rem 0.5rem;
        height: 5.5rem;
        align-items: center;
      }

      #item-count-image-container {
        margin-right: 0.5rem;
      }

      #item-count-stacked-text {
        display: flex;
        align-items: baseline;
        color: #fff;
      }
      #item-count-image-container svg {
        height: 2.5rem;
        align-items: baseline;
      }

      #container:hover > #item-count-container {
        background-color: #575757;
      }

      #item-count {
        font-size: 1.4rem;
        font-weight: bold;
      }

      #item-count-image {
        width: 3rem;
        height: 3rem;
        margin-right: 1rem;
      }

      #items-text {
        font-size: 1.4rem;
        font-weight: bold;
        margin-left: 0.5rem;
      }
    `}};n([u({type:Object})],Zi.prototype,"model",void 0);Zi=n([Q("collection-tile")],Zi);const to=F`
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
`,io=F`
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
`,ro=F`
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
`,ao=F`
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
`,so=F`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Jr=F`
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
`,oo=F`
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
`,no=F`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,lo=F`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,co=F`
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
`,ho=F`
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
`,uo=F`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,po={account:{color:"#000000",icon:to,text:"Account"},audio:{color:"#00adef",icon:io,text:"Audio"},collection:{color:"#4666ff",icon:Ba,text:"Collection"},data:{color:"#333333",icon:ro,text:"Data"},etree:{color:"#00adef",icon:ao,text:"E-tree"},film:{color:"#bf1b2c",icon:Jr,text:"Film"},image:{color:"#aa99c9",icon:so,text:"Image"},movies:{color:"#f1644b",icon:Jr,text:"Movie"},radio:{color:"#8fdaef",icon:oo,text:"Radio"},software:{color:"#9ecc4f",icon:no,text:"Software"},texts:{color:"#faab3c",icon:lo,text:"Text"},tv:{color:"#f1644b",icon:co,text:"TV"},video:{color:"#f1644b",icon:ho,text:"Video"},web:{color:"#ffcd27",icon:uo,text:"Web"}};let Vt=class extends B{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;const i=["tvnews","tvarchive","television"],r=["radio","radioprogram"];return this.mediatype==="movies"&&((e=this.collections)===null||e===void 0?void 0:e.some(s=>i.indexOf(s)>=0))?"tv":this.mediatype==="audio"&&((t=this.collections)===null||t===void 0?void 0:t.some(s=>r.indexOf(s)>=0))?"radio":this.mediatype||""}render(){const e=po[this.displayMediatype];return e?m`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:m``}static get styles(){return b`
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
      }

      .fill-color {
        fill: var(--iconFillColor, '#000000');
      }
    `}};n([u({type:String})],Vt.prototype,"mediatype",void 0);n([u({type:Array})],Vt.prototype,"collections",void 0);n([u({type:Boolean})],Vt.prototype,"showText",void 0);Vt=n([Q("mediatype-icon")],Vt);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ea=cr(class extends hr{constructor(a){var e;if(super(a),a.type!==Me.ATTRIBUTE||a.name!=="class"||((e=a.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(a){return" "+Object.keys(a).filter(e=>a[e]).join(" ")+" "}update(a,[e]){var t,i;if(this.et===void 0){this.et=new Set,a.strings!==void 0&&(this.st=new Set(a.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!(!((t=this.st)===null||t===void 0)&&t.has(s))&&this.et.add(s);return this.render(e)}const r=a.element.classList;this.et.forEach(s=>{s in e||(r.remove(s),this.et.delete(s))});for(const s in e){const o=!!e[s];o===this.et.has(s)||((i=this.st)===null||i===void 0?void 0:i.has(s))||(o?(r.add(s),this.et.add(s)):(r.remove(s),this.et.delete(s)))}return ce}}),vo=b`
  .drop-shadow {
    filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
    overflow: hidden;
    height: 100%;
  }

  .list-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    position: relative;
  }

  .contain {
    object-fit: contain;
  }

  .cover {
    object-fit: cover;
  }

  .blur {
    filter: blur(15px);
    width: 100%;
    transform: scale(1.1);
  }
`,mo=b`
  .waveform {
    mix-blend-mode: screen;
    position: relative;
    height: 62.5%;
    top: 50%;
    transform: translateY(-50%);
  }

  .waveform-grad0 {
    background: linear-gradient(
      hsl(340, 80%, 55%),
      hsl(0, 80%, 33%) 35%,
      hsl(0, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad1 {
    background: linear-gradient(
      hsl(300, 80%, 55%),
      hsl(330, 80%, 33%) 35%,
      hsl(330, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad2 {
    background: linear-gradient(
      hsl(200, 80%, 55%),
      hsl(230, 80%, 33%) 35%,
      hsl(230, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad3 {
    background: linear-gradient(
      hsl(160, 80%, 55%),
      hsl(190, 80%, 33%) 35%,
      hsl(190, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad4 {
    background: linear-gradient(
      hsl(250, 80%, 55%),
      hsl(280, 80%, 33%) 35%,
      hsl(280, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }

  .waveform-grad5 {
    background: linear-gradient(
      hsl(280, 80%, 55%),
      hsl(310, 80%, 33%) 35%,
      hsl(310, 80%, 22%) 70%,
      hsl(0, 0%, 0%)
    );
  }
`;let Ce=class extends B{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.isWaveform=!1}render(){return m`
      <div class=${ea(this.itemBaseClass)}>
        <img
          class=${ea(this.itemImageClass)}
          src="${this.imageSrc}"
          alt=""
          @load=${this.onLoad}
        />
      </div>
    `}get imageSrc(){var e;return`${this.baseImageUrl}/services/img/${(e=this.model)===null||e===void 0?void 0:e.identifier}`}get hashBasedGradient(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(e){return e.split("").reduce((t,i)=>t+i.charCodeAt(0),0)}get itemBaseClass(){return{"drop-shadow":!0,"list-box":this.isListTile,[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var e;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:((e=this.model)===null||e===void 0?void 0:e.contentWarning)||!1,waveform:this.isWaveform}}onLoad(){var e,t;(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"||((t=this.model)===null||t===void 0?void 0:t.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}static get styles(){return[vo,mo,b`
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }
      `]}};n([u({type:Object})],Ce.prototype,"model",void 0);n([u({type:String})],Ce.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],Ce.prototype,"isListTile",void 0);n([u({type:Boolean})],Ce.prototype,"isCompactTile",void 0);n([u({type:Boolean})],Ce.prototype,"loggedIn",void 0);n([D()],Ce.prototype,"isWaveform",void 0);n([le("img")],Ce.prototype,"baseImage",void 0);Ce=n([Q("item-image")],Ce);const go=F`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
    <title>Icon of a star, filled in</title>
  </svg>
`,fo=F`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,bo=F`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,yo=F`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;function wo(a,e){let t=1;return a>=1e9?t=1e9:a>=1e6?t=1e6:a>=1e3&&e==="short"&&(t=1e3),t}function So(a=0,e){const t=a/e,i=t<10;let r=0;return i?r=Math.round((t+Number.EPSILON)*10)/10:r=Math.round(t),r}function $o(a,e,t,i){switch(e){case 1e9:return Ve(t==="short"?ot`${a}B`:ot`${a} billion`);case 1e6:return Ve(t==="short"?ot`${a}M`:ot`${a} million`);case 1e3:return Ve(t==="short"?ot`${a}K`:ot`${a} thousand`);default:return new Intl.NumberFormat(i).format(a)}}function Nt(a,e="long",t="short",i="en-US"){const r=a!=null?a:-1;if(r<0)return"";const s=wo(r,e),o=So(r,s);return $o(o,s,t,i)}let Ke=class extends B{render(){return console.log("tile-stats here"),m`
      <div class="stats-wrapper">
        <div id="stats-holder">
          <div class="col">
            <mediatype-icon
              .mediatype=${this.mediatype}
              style="--iconHeight:25px; --iconWidth:25px;"
            >
            </mediatype-icon>
          </div>
          <div class="col">
            ${this.mediatype==="account"?bo:yo}
            <p class="status-text">
              ${Nt(this.mediatype==="account"?this.itemCount:this.viewCount,"short","short")}
            </p>
          </div>
          <div class="col">
            ${go}
            <p class="status-text">
              ${Nt(this.favCount,"short","short")}
            </p>
          </div>
          <div class="col">
            ${fo}
            <p class="status-text">
              ${Nt(this.commentCount,"short","short")}
            </p>
          </div>
        </div>
      </div>
    `}static get styles(){return b`
      .stats-wrapper {
        height: 35px;
        flex-shrink: 0;
      }

      #stats-holder {
        border-top: 1px solid #bbb;
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
        padding-top: 5px;
        padding-bottom: 5px;
      }

      .col {
        width: 25%;
        height: 25px;
      }

      svg {
        height: 10px;
        width: 10px;
        display: block;
        margin: auto;
      }

      .status-text {
        font-size: 14px;
        height: 15px;
        color: #2c2c2c;
        line-height: 20px;
        margin: auto;
        display: block;
        text-align: center;
      }
    `}};n([u({type:String})],Ke.prototype,"mediatype",void 0);n([u({type:Number})],Ke.prototype,"itemCount",void 0);n([u({type:Number})],Ke.prototype,"viewCount",void 0);n([u({type:Number})],Ke.prototype,"favCount",void 0);n([u({type:Number})],Ke.prototype,"commentCount",void 0);Ke=n([Q("tile-stats")],Ke);let ni=class extends B{render(){var e,t,i,r,s,o;const l=(e=this.model)===null||e===void 0?void 0:e.title,d=(t=this.model)===null||t===void 0?void 0:t.creator;return m`
      <div id="container">
        <div id="inner-wrapper">
          <div class="title-wrapper">
            <h1 id="item-title" title=${Qe(l)}>${l}</h1>
          </div>

          <div class="image-wrapper">
            <div id="item-image-container">
              <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
              </item-image>
            </div>
            <div class="item-creator">
              <div class="truncated">
                ${d?m`<span>by&nbsp;${d}</span>`:_}
              </div>
            </div>
          </div>
        </div>

        <tile-stats 
          .mediatype=${(i=this.model)===null||i===void 0?void 0:i.mediatype}
          .viewCount=${(r=this.model)===null||r===void 0?void 0:r.viewCount}
          .favCount=${(s=this.model)===null||s===void 0?void 0:s.favCount}
          .commentCount=${(o=this.model)===null||o===void 0?void 0:o.commentCount}>
        </tile-stats>
        </div>
      </div>
    `}static get styles(){return b`
      #container {
        background-color: #ffffff;
        border-radius: var(--collectionTileCornerRadius, 4px);
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      #inner-wrapper {
        padding-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
      }

      .title-wrapper {
        flex-shrink: 0;
      }

      .image-wrapper {
        flex-grow: 1;
      }

      #item-title {
        flex: 1;
        color: #2c2c2c;
        min-width: 0; /* Important for long words! */
        font-size: 1.6rem;
        text-align: center;
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #item-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
        height: 16rem;
      }

      .hidden {
        display: none;
      }

      #container:hover > #title-image-container > .item-title {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title-image-container:hover > #item-title {
        text-decoration: underline;
      }

      #container:hover > #item-title {
        background-color: #fcfcfc;
      }

      .item-creator {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Important to start text from bottom */
        height: 3rem;
        padding-top: 1rem;
        margin-top: 5px;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
      }

      .truncated span {
        font-size: 1.4rem;
        color: #2c2c2c;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 2rem;
        text-align: center;
      }
    `}};n([u({type:Object})],ni.prototype,"model",void 0);n([u({type:String})],ni.prototype,"baseImageUrl",void 0);ni=n([Q("item-tile")],ni);let Ji=class extends B{render(){var e,t,i,r,s,o,l,d;return m`
      <div class="outer-holder">
        <div id="header-holder">
          <div id="title-holder">
            <h1 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.identifier}</h1>
          </div>
        </div>

        <div class="inner-holder">
          <div id="avatar-holder">
            <img
              id="avatar"
              alt="patron-avatar"
              src="https://archive.org/services/img/${(t=this.model)===null||t===void 0?void 0:t.identifier}"
            />
          </div>

          <div id="year-holder">
            <div id="archivist-since">
              <span>
                Archivist since ${(r=(i=this.model)===null||i===void 0?void 0:i.dateAdded)===null||r===void 0?void 0:r.getFullYear()}
              </span>
            </div>
          </div>
        </div>

        <tile-stats
          .mediatype=${(s=this.model)===null||s===void 0?void 0:s.mediatype}
          .itemCount=${(o=this.model)===null||o===void 0?void 0:o.itemCount}
          .favCount=${(l=this.model)===null||l===void 0?void 0:l.favCount}
          .commentCount=${(d=this.model)===null||d===void 0?void 0:d.commentCount}
        >
        </tile-stats>
      </div>
    `}static get styles(){return b`
      h1 {
        color: black;
        font-size: 16px;
        margin: 0;
      }

      span {
        font-size: 14px;
        color: #2c2c2c;
        margin: 0px;
      }

      .outer-holder {
        background-color: #fcf5e6;
        border: 1px #2c2c2c;
        border-radius: 4px;
        box-shadow: 1px 1px 2px 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
      }

      .inner-holder {
        flex-grow: 1;
      }

      #title-holder {
        flex-shrink: 0;
        height: 40px;
      }

      #avatar-holder {
        margin-top: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #avatar {
        background-position: 50% 50%;
        border-radius: 50%;
        width: 160px;
        height: 160px;
        box-shadow: 1px 1px 2px #888888;
      }

      #year-holder {
        margin-bottom: 5px;
        height: 40px;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 2rem;
        text-align: center;
      }
    `}};n([u({type:Object})],Ji.prototype,"model",void 0);Ji=n([Q("account-tile")],Ji);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Ii(a,e){const t=typeof e=="function";if(a!==void 0){let i=-1;for(const r of a)i>-1&&(yield t?e(i):e),i++,yield r}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*ta(a,e){if(a!==void 0){let t=0;for(const i of a)yield e(i,t++)}}/*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */function We(a){return We=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},We(a)}function er(a,e){return er=Object.setPrototypeOf||function(i,r){return i.__proto__=r,i},er(a,e)}function xo(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ti(a,e,t){return xo()?ti=Reflect.construct:ti=function(r,s,o){var l=[null];l.push.apply(l,s);var d=Function.bind.apply(r,l),h=new d;return o&&er(h,o.prototype),h},ti.apply(null,arguments)}function he(a){return Co(a)||_o(a)||ko(a)||To()}function Co(a){if(Array.isArray(a))return tr(a)}function _o(a){if(typeof Symbol!="undefined"&&a[Symbol.iterator]!=null||a["@@iterator"]!=null)return Array.from(a)}function ko(a,e){if(!!a){if(typeof a=="string")return tr(a,e);var t=Object.prototype.toString.call(a).slice(8,-1);if(t==="Object"&&a.constructor&&(t=a.constructor.name),t==="Map"||t==="Set")return Array.from(a);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return tr(a,e)}}function tr(a,e){(e==null||e>a.length)&&(e=a.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=a[t];return i}function To(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Do=Object.hasOwnProperty,ia=Object.setPrototypeOf,Mo=Object.isFrozen,Ao=Object.getPrototypeOf,Eo=Object.getOwnPropertyDescriptor,ee=Object.freeze,ye=Object.seal,Oo=Object.create,Ua=typeof Reflect!="undefined"&&Reflect,li=Ua.apply,ir=Ua.construct;li||(li=function(e,t,i){return e.apply(t,i)});ee||(ee=function(e){return e});ye||(ye=function(e){return e});ir||(ir=function(e,t){return ti(e,he(t))});var Lo=pe(Array.prototype.forEach),ra=pe(Array.prototype.pop),Ot=pe(Array.prototype.push),ii=pe(String.prototype.toLowerCase),Fo=pe(String.prototype.match),De=pe(String.prototype.replace),No=pe(String.prototype.indexOf),Ro=pe(String.prototype.trim),J=pe(RegExp.prototype.test),zi=Io(TypeError);function pe(a){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];return li(a,e,i)}}function Io(a){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return ir(a,t)}}function M(a,e){ia&&ia(a,null);for(var t=e.length;t--;){var i=e[t];if(typeof i=="string"){var r=ii(i);r!==i&&(Mo(e)||(e[t]=r),i=r)}a[i]=!0}return a}function He(a){var e=Oo(null),t;for(t in a)li(Do,a,[t])&&(e[t]=a[t]);return e}function Xt(a,e){for(;a!==null;){var t=Eo(a,e);if(t){if(t.get)return pe(t.get);if(typeof t.value=="function")return pe(t.value)}a=Ao(a)}function i(r){return console.warn("fallback value for",r),null}return i}var aa=ee(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),Pi=ee(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Bi=ee(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),zo=ee(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ui=ee(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Po=ee(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),sa=ee(["#text"]),oa=ee(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),Hi=ee(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),na=ee(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Zt=ee(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),Bo=ye(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Uo=ye(/<%[\w\W]*|[\w\W]*%>/gm),Ho=ye(/^data-[\-\w.\u00B7-\uFFFF]/),Vo=ye(/^aria-[\-\w]+$/),Wo=ye(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),jo=ye(/^(?:\w+script|data):/i),Qo=ye(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Go=ye(/^html$/i),Yo=function(){return typeof window=="undefined"?null:window},Ko=function(e,t){if(We(e)!=="object"||typeof e.createPolicy!="function")return null;var i=null,r="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(r)&&(i=t.currentScript.getAttribute(r));var s="dompurify"+(i?"#"+i:"");try{return e.createPolicy(s,{createHTML:function(l){return l}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}};function Ha(){var a=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Yo(),e=function(c){return Ha(c)};if(e.version="2.3.8",e.removed=[],!a||!a.document||a.document.nodeType!==9)return e.isSupported=!1,e;var t=a.document,i=a.document,r=a.DocumentFragment,s=a.HTMLTemplateElement,o=a.Node,l=a.Element,d=a.NodeFilter,h=a.NamedNodeMap,p=h===void 0?a.NamedNodeMap||a.MozNamedAttrMap:h,v=a.HTMLFormElement,f=a.DOMParser,y=a.trustedTypes,$=l.prototype,k=Xt($,"cloneNode"),E=Xt($,"nextSibling"),A=Xt($,"childNodes"),N=Xt($,"parentNode");if(typeof s=="function"){var L=i.createElement("template");L.content&&L.content.ownerDocument&&(i=L.content.ownerDocument)}var I=Ko(y,t),Y=I?I.createHTML(""):"",se=i,ge=se.implementation,wt=se.createNodeIterator,St=se.createDocumentFragment,$t=se.getElementsByTagName,xt=t.importNode,qe={};try{qe=He(i).documentMode?i.documentMode:{}}catch{}var te={};e.isSupported=typeof N=="function"&&ge&&typeof ge.createHTMLDocument!="undefined"&&qe!==9;var Ne=Bo,Re=Uo,Ct=Ho,_t=Vo,kt=jo,Xe=Qo,Ie=Wo,V=null,Ze=M({},[].concat(he(aa),he(Pi),he(Bi),he(Ui),he(sa))),W=null,Je=M({},[].concat(he(oa),he(Hi),he(na),he(Zt))),U=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),ke=null,gi=null,fr=!0,fi=!0,br=!1,et=!1,ze=!1,bi=!1,yi=!1,tt=!1,jt=!1,Qt=!1,yr=!0,wi=!0,Tt=!1,it={},rt=null,wr=M({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Sr=null,$r=M({},["audio","video","img","source","image","track"]),Si=null,xr=M({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),$i="http://www.w3.org/1998/Math/MathML",xi="http://www.w3.org/2000/svg",Te="http://www.w3.org/1999/xhtml",Gt=Te,Ci=!1,at,ts=["application/xhtml+xml","text/html"],is="text/html",Pe,st=null,rs=i.createElement("form"),Cr=function(c){return c instanceof RegExp||c instanceof Function},_i=function(c){st&&st===c||((!c||We(c)!=="object")&&(c={}),c=He(c),V="ALLOWED_TAGS"in c?M({},c.ALLOWED_TAGS):Ze,W="ALLOWED_ATTR"in c?M({},c.ALLOWED_ATTR):Je,Si="ADD_URI_SAFE_ATTR"in c?M(He(xr),c.ADD_URI_SAFE_ATTR):xr,Sr="ADD_DATA_URI_TAGS"in c?M(He($r),c.ADD_DATA_URI_TAGS):$r,rt="FORBID_CONTENTS"in c?M({},c.FORBID_CONTENTS):wr,ke="FORBID_TAGS"in c?M({},c.FORBID_TAGS):{},gi="FORBID_ATTR"in c?M({},c.FORBID_ATTR):{},it="USE_PROFILES"in c?c.USE_PROFILES:!1,fr=c.ALLOW_ARIA_ATTR!==!1,fi=c.ALLOW_DATA_ATTR!==!1,br=c.ALLOW_UNKNOWN_PROTOCOLS||!1,et=c.SAFE_FOR_TEMPLATES||!1,ze=c.WHOLE_DOCUMENT||!1,tt=c.RETURN_DOM||!1,jt=c.RETURN_DOM_FRAGMENT||!1,Qt=c.RETURN_TRUSTED_TYPE||!1,yi=c.FORCE_BODY||!1,yr=c.SANITIZE_DOM!==!1,wi=c.KEEP_CONTENT!==!1,Tt=c.IN_PLACE||!1,Ie=c.ALLOWED_URI_REGEXP||Ie,Gt=c.NAMESPACE||Te,c.CUSTOM_ELEMENT_HANDLING&&Cr(c.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(U.tagNameCheck=c.CUSTOM_ELEMENT_HANDLING.tagNameCheck),c.CUSTOM_ELEMENT_HANDLING&&Cr(c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(U.attributeNameCheck=c.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),c.CUSTOM_ELEMENT_HANDLING&&typeof c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(U.allowCustomizedBuiltInElements=c.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),at=ts.indexOf(c.PARSER_MEDIA_TYPE)===-1?at=is:at=c.PARSER_MEDIA_TYPE,Pe=at==="application/xhtml+xml"?function(g){return g}:ii,et&&(fi=!1),jt&&(tt=!0),it&&(V=M({},he(sa)),W=[],it.html===!0&&(M(V,aa),M(W,oa)),it.svg===!0&&(M(V,Pi),M(W,Hi),M(W,Zt)),it.svgFilters===!0&&(M(V,Bi),M(W,Hi),M(W,Zt)),it.mathMl===!0&&(M(V,Ui),M(W,na),M(W,Zt))),c.ADD_TAGS&&(V===Ze&&(V=He(V)),M(V,c.ADD_TAGS)),c.ADD_ATTR&&(W===Je&&(W=He(W)),M(W,c.ADD_ATTR)),c.ADD_URI_SAFE_ATTR&&M(Si,c.ADD_URI_SAFE_ATTR),c.FORBID_CONTENTS&&(rt===wr&&(rt=He(rt)),M(rt,c.FORBID_CONTENTS)),wi&&(V["#text"]=!0),ze&&M(V,["html","head","body"]),V.table&&(M(V,["tbody"]),delete ke.tbody),ee&&ee(c),st=c)},_r=M({},["mi","mo","mn","ms","mtext"]),kr=M({},["foreignobject","desc","title","annotation-xml"]),as=M({},["title","style","font","a","script"]),Yt=M({},Pi);M(Yt,Bi),M(Yt,zo);var ki=M({},Ui);M(ki,Po);var ss=function(c){var g=N(c);(!g||!g.tagName)&&(g={namespaceURI:Te,tagName:"template"});var S=ii(c.tagName),R=ii(g.tagName);return c.namespaceURI===xi?g.namespaceURI===Te?S==="svg":g.namespaceURI===$i?S==="svg"&&(R==="annotation-xml"||_r[R]):Boolean(Yt[S]):c.namespaceURI===$i?g.namespaceURI===Te?S==="math":g.namespaceURI===xi?S==="math"&&kr[R]:Boolean(ki[S]):c.namespaceURI===Te?g.namespaceURI===xi&&!kr[R]||g.namespaceURI===$i&&!_r[R]?!1:!ki[S]&&(as[S]||!Yt[S]):!1},we=function(c){Ot(e.removed,{element:c});try{c.parentNode.removeChild(c)}catch{try{c.outerHTML=Y}catch{c.remove()}}},Tr=function(c,g){try{Ot(e.removed,{attribute:g.getAttributeNode(c),from:g})}catch{Ot(e.removed,{attribute:null,from:g})}if(g.removeAttribute(c),c==="is"&&!W[c])if(tt||jt)try{we(g)}catch{}else try{g.setAttribute(c,"")}catch{}},Dr=function(c){var g,S;if(yi)c="<remove></remove>"+c;else{var R=Fo(c,/^[\r\n\t ]+/);S=R&&R[0]}at==="application/xhtml+xml"&&(c='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+c+"</body></html>");var ie=I?I.createHTML(c):c;if(Gt===Te)try{g=new f().parseFromString(ie,at)}catch{}if(!g||!g.documentElement){g=ge.createDocument(Gt,"template",null);try{g.documentElement.innerHTML=Ci?"":ie}catch{}}var X=g.body||g.documentElement;return c&&S&&X.insertBefore(i.createTextNode(S),X.childNodes[0]||null),Gt===Te?$t.call(g,ze?"html":"body")[0]:ze?g.documentElement:X},Mr=function(c){return wt.call(c.ownerDocument||c,c,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT,null,!1)},os=function(c){return c instanceof v&&(typeof c.nodeName!="string"||typeof c.textContent!="string"||typeof c.removeChild!="function"||!(c.attributes instanceof p)||typeof c.removeAttribute!="function"||typeof c.setAttribute!="function"||typeof c.namespaceURI!="string"||typeof c.insertBefore!="function")},Dt=function(c){return We(o)==="object"?c instanceof o:c&&We(c)==="object"&&typeof c.nodeType=="number"&&typeof c.nodeName=="string"},Se=function(c,g,S){!te[c]||Lo(te[c],function(R){R.call(e,g,S,st)})},Ar=function(c){var g;if(Se("beforeSanitizeElements",c,null),os(c)||J(/[\u0080-\uFFFF]/,c.nodeName))return we(c),!0;var S=Pe(c.nodeName);if(Se("uponSanitizeElement",c,{tagName:S,allowedTags:V}),c.hasChildNodes()&&!Dt(c.firstElementChild)&&(!Dt(c.content)||!Dt(c.content.firstElementChild))&&J(/<[/\w]/g,c.innerHTML)&&J(/<[/\w]/g,c.textContent)||S==="select"&&J(/<template/i,c.innerHTML))return we(c),!0;if(!V[S]||ke[S]){if(!ke[S]&&Or(S)&&(U.tagNameCheck instanceof RegExp&&J(U.tagNameCheck,S)||U.tagNameCheck instanceof Function&&U.tagNameCheck(S)))return!1;if(wi&&!rt[S]){var R=N(c)||c.parentNode,ie=A(c)||c.childNodes;if(ie&&R)for(var X=ie.length,K=X-1;K>=0;--K)R.insertBefore(k(ie[K],!0),E(c))}return we(c),!0}return c instanceof l&&!ss(c)||(S==="noscript"||S==="noembed")&&J(/<\/no(script|embed)/i,c.innerHTML)?(we(c),!0):(et&&c.nodeType===3&&(g=c.textContent,g=De(g,Ne," "),g=De(g,Re," "),c.textContent!==g&&(Ot(e.removed,{element:c.cloneNode()}),c.textContent=g)),Se("afterSanitizeElements",c,null),!1)},Er=function(c,g,S){if(yr&&(g==="id"||g==="name")&&(S in i||S in rs))return!1;if(!(fi&&!gi[g]&&J(Ct,g))){if(!(fr&&J(_t,g))){if(!W[g]||gi[g]){if(!(Or(c)&&(U.tagNameCheck instanceof RegExp&&J(U.tagNameCheck,c)||U.tagNameCheck instanceof Function&&U.tagNameCheck(c))&&(U.attributeNameCheck instanceof RegExp&&J(U.attributeNameCheck,g)||U.attributeNameCheck instanceof Function&&U.attributeNameCheck(g))||g==="is"&&U.allowCustomizedBuiltInElements&&(U.tagNameCheck instanceof RegExp&&J(U.tagNameCheck,S)||U.tagNameCheck instanceof Function&&U.tagNameCheck(S))))return!1}else if(!Si[g]){if(!J(Ie,De(S,Xe,""))){if(!((g==="src"||g==="xlink:href"||g==="href")&&c!=="script"&&No(S,"data:")===0&&Sr[c])){if(!(br&&!J(kt,De(S,Xe,"")))){if(S)return!1}}}}}}return!0},Or=function(c){return c.indexOf("-")>0},Lr=function(c){var g,S,R,ie;Se("beforeSanitizeAttributes",c,null);var X=c.attributes;if(!!X){var K={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:W};for(ie=X.length;ie--;){g=X[ie];var Kt=g,Z=Kt.name,Fr=Kt.namespaceURI;if(S=Z==="value"?g.value:Ro(g.value),R=Pe(Z),K.attrName=R,K.attrValue=S,K.keepAttr=!0,K.forceKeepAttr=void 0,Se("uponSanitizeAttribute",c,K),S=K.attrValue,!K.forceKeepAttr&&(Tr(Z,c),!!K.keepAttr)){if(J(/\/>/i,S)){Tr(Z,c);continue}et&&(S=De(S,Ne," "),S=De(S,Re," "));var ls=Pe(c.nodeName);if(!!Er(ls,R,S))try{Fr?c.setAttributeNS(Fr,Z,S):c.setAttribute(Z,S),ra(e.removed)}catch{}}}Se("afterSanitizeAttributes",c,null)}},ns=function C(c){var g,S=Mr(c);for(Se("beforeSanitizeShadowDOM",c,null);g=S.nextNode();)Se("uponSanitizeShadowNode",g,null),!Ar(g)&&(g.content instanceof r&&C(g.content),Lr(g));Se("afterSanitizeShadowDOM",c,null)};return e.sanitize=function(C,c){var g,S,R,ie,X;if(Ci=!C,Ci&&(C="<!-->"),typeof C!="string"&&!Dt(C)){if(typeof C.toString!="function")throw zi("toString is not a function");if(C=C.toString(),typeof C!="string")throw zi("dirty is not a string, aborting")}if(!e.isSupported){if(We(a.toStaticHTML)==="object"||typeof a.toStaticHTML=="function"){if(typeof C=="string")return a.toStaticHTML(C);if(Dt(C))return a.toStaticHTML(C.outerHTML)}return C}if(bi||_i(c),e.removed=[],typeof C=="string"&&(Tt=!1),Tt){if(C.nodeName){var K=Pe(C.nodeName);if(!V[K]||ke[K])throw zi("root node is forbidden and cannot be sanitized in-place")}}else if(C instanceof o)g=Dr("<!---->"),S=g.ownerDocument.importNode(C,!0),S.nodeType===1&&S.nodeName==="BODY"||S.nodeName==="HTML"?g=S:g.appendChild(S);else{if(!tt&&!et&&!ze&&C.indexOf("<")===-1)return I&&Qt?I.createHTML(C):C;if(g=Dr(C),!g)return tt?null:Qt?Y:""}g&&yi&&we(g.firstChild);for(var Kt=Mr(Tt?C:g);R=Kt.nextNode();)R.nodeType===3&&R===ie||Ar(R)||(R.content instanceof r&&ns(R.content),Lr(R),ie=R);if(ie=null,Tt)return C;if(tt){if(jt)for(X=St.call(g.ownerDocument);g.firstChild;)X.appendChild(g.firstChild);else X=g;return W.shadowroot&&(X=xt.call(t,X,!0)),X}var Z=ze?g.outerHTML:g.innerHTML;return ze&&V["!doctype"]&&g.ownerDocument&&g.ownerDocument.doctype&&g.ownerDocument.doctype.name&&J(Go,g.ownerDocument.doctype.name)&&(Z="<!DOCTYPE "+g.ownerDocument.doctype.name+`>
`+Z),et&&(Z=De(Z,Ne," "),Z=De(Z,Re," ")),I&&Qt?I.createHTML(Z):Z},e.setConfig=function(C){_i(C),bi=!0},e.clearConfig=function(){st=null,bi=!1},e.isValidAttribute=function(C,c,g){st||_i({});var S=Pe(C),R=Pe(c);return Er(S,R,g)},e.addHook=function(C,c){typeof c=="function"&&(te[C]=te[C]||[],Ot(te[C],c))},e.removeHook=function(C){if(te[C])return ra(te[C])},e.removeHooks=function(C){te[C]&&(te[C]=[])},e.removeAllHooks=function(){te={}},e}var Rt=Ha();function Va(a){switch(a){case"date":return"Published";case"reviewdate":return"Reviewed";case"addeddate":return"Added";default:return"Archived"}}function Wa(a){return a?`Archivist since ${a.getFullYear()}`:""}function rr(a,e="short",t="en-US"){if(!a)return"";const i={timeZone:"UTC"};switch(e){case"short":i.month="short",i.year="numeric";break;case"long":i.year="numeric",i.month="short",i.day="2-digit";break}return new Intl.DateTimeFormat(t,i).format(a)}let ve=class extends B{constructor(){super(...arguments),this.sortParam=null,this.collectionLinks=[]}updated(e){e.has("model")&&this.fetchCollectionNames()}async fetchCollectionNames(){var e,t;if(!(!((e=this.model)===null||e===void 0)&&e.collections)||this.model.collections.length===0||!this.collectionNameCache)return;this.collectionLinks=[];const i=[],r=[];for(const s of this.model.collections)r.push((t=this.collectionNameCache)===null||t===void 0?void 0:t.collectionNameFor(s).then(o=>{i.push(this.detailsLink(s,o!=null?o:s))}));await Promise.all(r),this.collectionLinks=i}render(){return m`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize==="mobile"?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){var e;return m`
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${Qe((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
            ${this.imgTemplate}
          </div>
        </div>
        <div id="list-line-right">
          <div id="title-line">
            <div id="title">${this.titleTemplate}</div>
            ${this.iconRightTemplate}
          </div>
        </div>
      </div>
      <div id="list-line-bottom">${this.detailsTemplate}</div>
    `}get desktopTemplate(){var e;return m`
      <div id="list-line-left">
        <div id="thumb" class="${Qe((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
          ${this.imgTemplate}
        </div>
      </div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `}get detailsTemplate(){return m`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate}
    `}get imgTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?m`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
        style="--imgHeight: 100%; --imgWidth: 100%"
      >
      </item-image>
    `:_}get iconRightTemplate(){var e,t;return m`
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${(e=this.model)===null||e===void 0?void 0:e.mediatype}
          .collections=${(t=this.model)===null||t===void 0?void 0:t.collections}
        >
        </mediatype-icon>
      </div>
    `}get titleTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.title?m` ${this.detailsLink(this.model.identifier,this.model.title)} `:_}get itemLineTemplate(){const e=this.sourceTemplate,t=this.volumeTemplate,i=this.issueTemplate;return!e&&!t&&!i?_:m` <div id="item-line">${e} ${t} ${i}</div> `}get sourceTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.source?m`
      <div id="source" class="metadata">
        ${this.labelTemplate("Source")}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:_}get volumeTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.volume,"Volume")}get issueTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.issue,"Issue")}get creatorTemplate(){var e,t,i;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"?m`
        <div id="creator" class="metadata">
          <span class="label"> ${Wa((t=this.model)===null||t===void 0?void 0:t.dateAdded)} </span>
        </div>
      `:!(!((i=this.model)===null||i===void 0)&&i.creators)||this.model.creators.length===0?_:m`
      <div id="creator" class="metadata">
        ${this.labelTemplate("By")}
        ${Ii(ta(this.model.creators,r=>this.searchLink("creator",r)),m`, `)}
      </div>
    `}get datePublishedTemplate(){var e;return this.metadataTemplate(rr((e=this.model)===null||e===void 0?void 0:e.datePublished,"long"),"Published")}get dateSortByTemplate(){return this.sortParam&&(this.sortParam.field==="addeddate"||this.sortParam.field==="reviewdate"||this.sortParam.field==="publicdate")?this.metadataTemplate(rr(this.date,"long"),Va(this.sortParam.field)):_}get viewsTemplate(){var e,t;return this.metadataTemplate(`${Nt((t=(e=this.model)===null||e===void 0?void 0:e.viewCount)!==null&&t!==void 0?t:0,this.formatSize)}`,"Views")}get ratingTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.averageRating,"Avg Rating")}get reviewsTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.commentCount,"Reviews")}get topicsTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.subjects)||this.model.subjects.length===0?_:m`
      <div id="topics" class="metadata">
        ${this.labelTemplate("Topics")}
        ${Ii(ta(this.model.subjects,t=>this.searchLink("subject",t)),m`, `)}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?_:m`
      <div id="collections" class="metadata">
        ${this.labelTemplate("Collections")}
        ${Ii(this.collectionLinks,m`, `)}
      </div>
    `}get descriptionTemplate(){var e,t;return this.metadataTemplate(Rt.sanitize((t=(e=this.model)===null||e===void 0?void 0:e.description)!==null&&t!==void 0?t:""),"","description")}metadataTemplate(e,t="",i){return e?m`
      <div id=${Qe(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:_}labelTemplate(e){return m` ${e?m`<span class="label">${e}: </span>`:_}`}searchLink(e,t){if(!e||!t)return _;const i=encodeURIComponent(`${e}:"${t}"`);return m`<a href="${this.baseNavigationUrl}/search.php?query=${i}">
      ${Rt.sanitize(t)}</a
    >`}detailsLink(e,t){const i=t!=null?t:e;return m`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(e)}"
      >${Rt.sanitize(i)}</a
    >`}get date(){var e,t,i,r,s;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(r=this.model)===null||r===void 0?void 0:r.dateAdded;default:return(s=this.model)===null||s===void 0?void 0:s.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return b`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      div a {
        text-decoration: none;
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

      #thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb {
        width: 90px;
        height: 90px;
      }

      .desktop #thumb {
        width: 100px;
        height: 100px;
      }

      #thumb.collection {
        --border-radius: 8px;
      }

      .mobile #thumb.account {
        --border-radius: 45px;
      }

      .desktop #thumb.account {
        --border-radius: 50px;
      }

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
        gap: 10px;
      }
    `}};n([u({type:Object})],ve.prototype,"model",void 0);n([u({type:String})],ve.prototype,"baseNavigationUrl",void 0);n([u({type:Object})],ve.prototype,"collectionNameCache",void 0);n([u({type:Number})],ve.prototype,"currentWidth",void 0);n([u({type:Number})],ve.prototype,"currentHeight",void 0);n([u({type:Object})],ve.prototype,"sortParam",void 0);n([u({type:Number})],ve.prototype,"mobileBreakpoint",void 0);n([D()],ve.prototype,"collectionLinks",void 0);n([u({type:String})],ve.prototype,"baseImageUrl",void 0);ve=n([Q("tile-list")],ve);let _e=class extends B{constructor(){super(...arguments),this.sortParam=null}render(){var e,t,i,r,s,o,l,d,h,p,v;return m`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${Qe((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
          ${this.imageTemplate}
        </div>
        <div id="title">${Rt.sanitize((i=(t=this.model)===null||t===void 0?void 0:t.title)!==null&&i!==void 0?i:"")}</div>
        <div id="creator">
          ${((r=this.model)===null||r===void 0?void 0:r.mediatype)==="account"?Wa((s=this.model)===null||s===void 0?void 0:s.dateAdded):Rt.sanitize((l=(o=this.model)===null||o===void 0?void 0:o.creator)!==null&&l!==void 0?l:"")}
        </div>
        <div id="date">${rr(this.date,this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(d=this.model)===null||d===void 0?void 0:d.mediatype}
            .collections=${(h=this.model)===null||h===void 0?void 0:h.collections}
          >
          </mediatype-icon>
        </div>
        <div id="views">
          ${Nt((v=(p=this.model)===null||p===void 0?void 0:p.viewCount)!==null&&v!==void 0?v:0,this.formatSize)}
        </div>
      </div>
    `}get imageTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?m`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
        .isCompactTile=${!0}
        style="--imgHeight: 100%; --imgWidth: 100%"
      >
      </item-image>
    `:_}get date(){var e,t,i,r,s;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(r=this.model)===null||r===void 0?void 0:r.dateAdded;default:return(s=this.model)===null||s===void 0?void 0:s.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return b`
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
      }

      #list-line.mobile {
        grid-template-columns: 36px 3fr 2fr 62px 19px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 2fr 100px 20px 60px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      /* fields */
      #thumb {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb {
        width: 30px;
        height: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 4px;
      }

      .desktop #thumb {
        width: 45px;
        height: 45px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 6px;
      }

      #thumb.collection {
        --border-radius: 8px;
      }

      .mobile #thumb.account {
        --border-radius: 15px;
      }

      .desktop #thumb.account {
        --border-radius: 22.5px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
      }

      #title,
      #creator {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
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
    `}};n([u({type:Object})],_e.prototype,"model",void 0);n([u({type:String})],_e.prototype,"baseNavigationUrl",void 0);n([u({type:Number})],_e.prototype,"currentWidth",void 0);n([u({type:Number})],_e.prototype,"currentHeight",void 0);n([u({type:Object})],_e.prototype,"sortParam",void 0);n([u({type:Number})],_e.prototype,"mobileBreakpoint",void 0);n([u({type:String})],_e.prototype,"baseImageUrl",void 0);_e=n([Q("tile-list-compact")],_e);let mt=class extends B{constructor(){super(...arguments),this.sortParam=null}render(){var e;return m`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${Va((e=this.sortParam)===null||e===void 0?void 0:e.field)}</div>
        <div id="icon"></div>
        <div id="views">Views</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return b`
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
      }

      #list-line-header {
        display: grid;
        column-gap: 10px;
        align-items: flex-end;
        padding-bottom: 2px;
      }

      #list-line-header.mobile {
        grid-template-columns: 36px 3fr 2fr 91px;
      }

      #list-line-header.desktop {
        grid-template-columns: 51px 3fr 2fr 100px 20px 60px;
      }
    `}};n([u({type:Object})],mt.prototype,"model",void 0);n([u({type:Number})],mt.prototype,"currentWidth",void 0);n([u({type:Object})],mt.prototype,"sortParam",void 0);n([u({type:Number})],mt.prototype,"mobileBreakpoint",void 0);mt=n([Q("tile-list-compact-header")],mt);let oe=class extends B{constructor(){super(...arguments),this.sortParam=null}render(){return m`
      <div id="container">
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
      </div>
    `}get headerTemplate(){const{currentWidth:e,sortParam:t,mobileBreakpoint:i}=this;return m`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t}
        .mobileBreakpoint=${i}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return m`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t;return m`
      <a
        href="${this.baseNavigationUrl}/details/${(e=this.model)===null||e===void 0?void 0:e.identifier}"
        title=${Qe((t=this.model)===null||t===void 0?void 0:t.title)}
      >
        ${this.tile}
      </a>
    `}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e==null||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),(e=this.resizeObserver)===null||e===void 0||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}get tile(){const{model:e,baseNavigationUrl:t,currentWidth:i,currentHeight:r,sortParam:s,mobileBreakpoint:o}=this;if(!e)return _;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return m`<collection-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            >
            </collection-tile>`;case"account":return m`<account-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            ></account-tile>`;default:return m`<item-tile
              .model=${e}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
            ></item-tile>`}case"list-compact":return m`<tile-list-compact
          .model=${e}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${s}
          .mobileBreakpoint=${o}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list-compact>`;case"list-detail":return m`<tile-list
          .model=${e}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${s}
          .mobileBreakpoint=${o}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list>`;default:return _}}static get styles(){return b`
      :host {
        display: block;
        height: 100%;
      }

      #container {
        height: 100%;
      }

      #delete-button {
        float: right;
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
      }

      a :first-child {
        display: block;
        height: 100%;
      }
    `}};n([u({type:String})],oe.prototype,"tileDisplayMode",void 0);n([u({type:Object})],oe.prototype,"model",void 0);n([u({type:String})],oe.prototype,"baseNavigationUrl",void 0);n([u({type:Number})],oe.prototype,"currentWidth",void 0);n([u({type:Number})],oe.prototype,"currentHeight",void 0);n([u({type:Object})],oe.prototype,"resizeObserver",void 0);n([u({type:Object})],oe.prototype,"collectionNameCache",void 0);n([u({type:Object})],oe.prototype,"sortParam",void 0);n([le("#container")],oe.prototype,"container",void 0);n([u({type:Number})],oe.prototype,"mobileBreakpoint",void 0);n([u({type:String})],oe.prototype,"baseImageUrl",void 0);oe=n([Q("tile-dispatcher")],oe);let la=class extends B{render(){return m` <div id="container"></div> `}static get styles(){return b`
      :host {
        display: block;
        height: 100%;
      }

      #container {
        background: linear-gradient(
          to right,
          rgba(25, 69, 154, 0.1),
          rgb(105, 161, 234, 0.2)
        );
        background-size: 100% 100%;
        display: block;
        height: 100%;
      }
    `}};la=n([Q("collection-browser-loading-tile")],la);var O;(function(a){a.relevance="relevance",a.views="views",a.title="title",a.datearchived="datearchived",a.date="date",a.datereviewed="datereviewed",a.dateadded="dateadded",a.creator="creator"})(O||(O={}));const Lt={relevance:"Relevance",views:"Views",title:"Title",datearchived:"Date Archived",date:"Date Published",datereviewed:"Date Reviewed",dateadded:"Date Added",creator:"Creator"},qo={relevance:null,views:"week",title:"titleSorter",datearchived:"publicdate",date:"date",datereviewed:"reviewdate",dateadded:"addeddate",creator:"creatorSorter"},da={titleSorter:O.title,date:O.date,publicdate:O.datearchived,reviewdate:O.datereviewed,addeddate:O.dateadded,creatorSorter:O.creator,week:O.views},di={subject:{},mediatype:{},language:{},creator:{},collection:{},year:{}};let ci=class extends B{constructor(){super(...arguments),this.selectedLetter=null,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return(e=this.selectedLetter)===null||e===void 0?void 0:e.toUpperCase()}render(){return m`
      <div id="container">
        <ul>
          ${this.alphabet.map(e=>m`
                <li
                  class=${e===this.selectedUppercaseLetter?"selected":""}
                >
                  <a
                    href="#"
                    @click=${t=>{t.preventDefault(),this.letterClicked(e)}}
                  >
                    ${e}
                  </a>
                </li>
              `)}
        </ul>
      </div>
    `}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}};ci.styles=b`
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
      flex: 1;
      text-align: center;
      max-width: 2.5rem;
    }

    a {
      color: #333;
      text-decoration: none;
      padding: 0.5rem 0;
      display: block;
    }

    .selected {
      background-color: darkgray;
    }

    .selected a {
      color: white;
    }
  `;n([u({type:String})],ci.prototype,"selectedLetter",void 0);ci=n([Q("alpha-bar")],ci);const ca=F`
<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg"><path d="m50 0 50 55h-100z"/></svg>
`,Xo=F`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,Zo=F`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,Jo=F`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let q=class extends B{constructor(){super(...arguments),this.sortDirection=null,this.selectedSort=O.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.showRelevance=!0,this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.desktopSelectorBarWidth=0,this.selectorBarContainerWidth=0,this.hoveringOverDateSortOptions=!1,this.boundDateSelectorEscapeListener=e=>{e.key==="Escape"&&(this.dateSortSelectorVisible=!1)}}render(){return m`
      <div id="container">
        <div id="sort-bar">
          <div id="sort-direction-container">
            ${this.sortDirectionSelectorTemplate}
          </div>

          <div id="sort-selector-container">
            ${this.mobileSortSelectorTemplate}
            ${this.desktopSortSelectorTemplate}
          </div>

          <div id="display-style-selector">${this.displayOptionTemplate}</div>
        </div>

        ${this.dateSortSelectorVisible&&!this.mobileSelectorVisible?this.dateSortSelector:_}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedSort")&&this.sortDirection===null&&(this.sortDirection="desc"),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dateSortSelectorVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dateSortSelectorVisible?document.addEventListener("keydown",this.boundDateSelectorEscapeListener):document.removeEventListener("keydown",this.boundDateSelectorEscapeListener)}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){e.removeObserver({target:this.sortSelectorContainer,handler:this}),e.removeObserver({target:this.desktopSortSelector,handler:this})}setupResizeObserver(){!this.resizeObserver||(this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.resizeObserver.addObserver({target:this.desktopSortSelector,handler:this}))}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSelectorBarWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return _;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return _}handleResize(e){e.target===this.desktopSortSelector?this.desktopSelectorBarWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get sortDirectionSelectorTemplate(){return m`
      <div id="sort-direction-selector">
        <button
          id="sort-ascending-btn"
          class="sort-button ${this.sortDirection==="asc"?"selected":""}"
          ?disabled=${this.selectedSort==="relevance"}
          @click=${()=>{this.setSortDirections("asc")}}
        >
          ${ca}
        </button>
        <button
          id="sort-descending-btn"
          class="sort-button ${this.sortDirection==="desc"?"selected":""}"
          ?disabled=${this.selectedSort==="relevance"}
          @click=${()=>{this.setSortDirections("desc")}}
        >
          ${ca}
        </button>
      </div>
    `}get desktopSortSelectorTemplate(){return m`
      <ul
        id="desktop-sort-selector"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <li id="sort-by-text">Sort By</li>
        <li>
          ${this.showRelevance?this.getSortDisplayOption(O.relevance):_}
        </li>
        <li>${this.getSortDisplayOption(O.views)}</li>
        <li>
          ${this.getSortDisplayOption(O.title,{clickEvent:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(O.title),this.emitCreatorLetterChangedEvent()}})}
        </li>
        <li>
          ${this.getSortDisplayOption(O.date,{clickEvent:()=>{this.dateOptionSelected||this.setSelectedSort(O.date),this.dateSortSelectorVisible=!this.dateSortSelectorVisible,this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()},displayName:m`${this.dateSortField}`,isSelected:()=>this.dateOptionSelected})}
        </li>
        <li>
          ${this.getSortDisplayOption(O.creator,{clickEvent:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(O.creator),this.emitTitleLetterChangedEvent()}})}
        </li>
      </ul>
    `}getSortDisplayOption(e,t){var i,r;const s=(i=t==null?void 0:t.isSelected)!==null&&i!==void 0?i:()=>this.selectedSort===e,o=(r=t==null?void 0:t.displayName)!==null&&r!==void 0?r:Lt[e];return m`
      <a
        href="#"
        @click=${l=>{l.preventDefault(),t!=null&&t.clickEvent?t.clickEvent(l):(this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.setSelectedSort(e),this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent())}}
        class=${s()?"selected":""}
      >
        ${o}
      </a>
    `}get mobileSortSelectorTemplate(){return m`
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${Object.keys(O).map(e=>m`
            <option value="${e}" ?selected=${this.selectedSort===e}>
              ${Lt[e]}
            </option>
          `)}
      </select>
    `}mobileSortChanged(e){const t=e.target;this.setSelectedSort(t.value)}get displayOptionTemplate(){return m`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
          >
            ${Xo}
          </button>
        </li>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="list-detail"}}
            class=${this.displayMode==="list-detail"?"active":""}
            title="Extended list view"
          >
            ${Zo}
          </button>
        </li>
        <li>
          <button
            id="list-button"
            @click=${()=>{this.displayMode="list-compact"}}
            class=${this.displayMode==="list-compact"?"active":""}
            title="Compact list view"
          >
            ${Jo}
          </button>
        </li>
      </ul>
    `}get dateSortSelector(){return m`
      <div
        id="date-sort-selector-backdrop"
        @keyup=${()=>{this.dateSortSelectorVisible=!1}}
        @click=${()=>{this.dateSortSelectorVisible=!1}}
      ></div>
      <div id="date-sort-selector">
        <ul>
          <li>${this.getDateSortButton(O.datearchived)}</li>
          <li>${this.getDateSortButton(O.date)}</li>
          <li>${this.getDateSortButton(O.datereviewed)}</li>
          <li>${this.getDateSortButton(O.dateadded)}</li>
        </ul>
      </div>
    `}getDateSortButton(e){return m`
      <button
        @click=${()=>{this.selectDateSort(e)}}
        class=${this.selectedSort===e?"selected":""}
      >
        ${Lt[e]}
      </button>
    `}selectDateSort(e){this.dateSortSelectorVisible=!1,this.setSelectedSort(e)}setSortDirections(e){this.sortDirection=e,this.emitSortChangedEvent()}setSelectedSort(e){this.selectedSort=e,this.emitSortChangedEvent()}get dateOptionSelected(){return[O.datearchived,O.date,O.datereviewed,O.dateadded].includes(this.selectedSort)}get dateSortField(){var e;const t=Lt[O.date];return this.dateOptionSelected&&(e=Lt[this.selectedSort])!==null&&e!==void 0?e:t}get titleSelectorBar(){return m` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){return m` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}};q.styles=b`
    #container {
      position: relative;
    }

    #sort-bar {
      display: flex;
      justify-content: space-between;
      border: 1px solid rgb(232, 232, 232);
      align-items: center;
      padding: 0.5rem 1.5rem;
    }

    #sort-direction-container {
      flex: 0;
    }

    #sort-by-text {
      text-transform: uppercase;
    }

    #bottom-shadow {
      height: 1px;
      width: 100%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
      background-color: #bbb;
    }

    ul {
      list-style: none;
      display: flex;
      margin: 0;
      padding: 0;
      align-items: center;
    }

    li {
      padding: 0;
    }

    .sort-button {
      background: none;
      color: inherit;
      border: none;
      padding: 0;
      cursor: pointer;
      outline: inherit;
      width: 12px;
      height: 12px;
      opacity: 0.5;
    }

    .sort-button.selected {
      opacity: 1;
    }

    .sort-button:disabled {
      opacity: 0.25;
      cursor: default;
    }

    #date-sort-selector {
      position: absolute;
      left: 150px;
      top: 45px;

      z-index: 1;
      padding: 1rem;
      background-color: white;
      border-radius: 2.5rem;
      border: 1px solid #404142;
    }

    #date-sort-selector button {
      background: none;
      border-radius: 15px;
      color: #404142;
      border: none;
      appearance: none;
      cursor: pointer;
      -webkit-appearance: none;
      font-size: 1.4rem;
      font-weight: 400;
      padding: 0.5rem 1.2rem;
    }

    #date-sort-selector button.selected {
      background-color: #404142;
      color: white;
    }

    #show-details {
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
    }

    #show-details input {
      margin-right: 0.5rem;
      flex: 0 0 12px;
    }

    #sort-descending-btn {
      transform: rotate(180deg);
    }

    #sort-direction-selector {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-right: 1rem;
    }

    #sort-selector-container {
      flex: 1;
    }

    /*
      we move the desktop sort selector offscreen instead of display: none
      because we need to observe the width of it vs its container to determine
      if it's wide enough to display the desktop version and if you displY: none,
      the width becomes 0
    */
    #desktop-sort-selector.hidden {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    #mobile-sort-selector.hidden {
      display: none;
    }

    #date-sort-selector-backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(255, 255, 255, 0.5);
    }

    #desktop-sort-selector {
      display: inline-flex;
    }

    #desktop-sort-selector li {
      display: flex;
      align-items: center;
    }

    #desktop-sort-selector li a {
      text-decoration: none;
      text-transform: uppercase;
      font-size: 1.4rem;
      color: #333;
      line-height: 2.5;
    }

    #desktop-sort-selector li a.selected {
      font-weight: bold;
    }

    #desktop-sort-selector li::after {
      content: '•';
      padding-left: 1rem;
      padding-right: 1rem;
    }

    #desktop-sort-selector li:first-child::after {
      content: '';
    }

    #desktop-sort-selector li:last-child::after {
      content: '';
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
      opacity: 0.5;
    }

    #display-style-selector button.active {
      opacity: 1;
    }

    #display-style-selector button svg {
      width: 24px;
      height: 24px;
    }
  `;n([u({type:String})],q.prototype,"displayMode",void 0);n([u({type:String})],q.prototype,"sortDirection",void 0);n([u({type:String})],q.prototype,"selectedSort",void 0);n([u({type:String})],q.prototype,"selectedTitleFilter",void 0);n([u({type:String})],q.prototype,"selectedCreatorFilter",void 0);n([u({type:Boolean})],q.prototype,"showRelevance",void 0);n([u({type:Object})],q.prototype,"resizeObserver",void 0);n([D()],q.prototype,"alphaSelectorVisible",void 0);n([D()],q.prototype,"dateSortSelectorVisible",void 0);n([D()],q.prototype,"desktopSelectorBarWidth",void 0);n([D()],q.prototype,"selectorBarContainerWidth",void 0);n([D()],q.prototype,"hoveringOverDateSortOptions",void 0);n([le("#desktop-sort-selector")],q.prototype,"desktopSortSelector",void 0);n([le("#sort-selector-container")],q.prototype,"sortSelectorContainer",void 0);q=n([Q("sort-filter-bar")],q);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ha=cr(class extends hr{constructor(a){if(super(a),a.type!==Me.PROPERTY&&a.type!==Me.ATTRIBUTE&&a.type!==Me.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Qs(a))throw Error("`live` bindings can only contain a single expression")}render(a){return a}update(a,[e]){if(e===ce||e===_)return e;const t=a.element,i=a.name;if(a.type===Me.PROPERTY){if(e===t[i])return ce}else if(a.type===Me.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return ce}else if(a.type===Me.ATTRIBUTE&&t.getAttribute(i)===e+"")return ce;return za(a),e}});var ja=60,Qa=ja*60,Ga=Qa*24,en=Ga*7,gt=1e3,Vi=ja*gt,ua=Qa*gt,tn=Ga*gt,rn=en*gt,ur="millisecond",lt="second",dt="minute",ct="hour",Ae="day",ri="week",ue="month",Ya="quarter",Ee="year",ht="date",an="YYYY-MM-DDTHH:mm:ssZ",pa="Invalid Date",sn=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,on=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,nn={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},ar=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},ln=function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+ar(r,2,"0")+":"+ar(s,2,"0")},dn=function a(e,t){if(e.date()<t.date())return-a(t,e);var i=(t.year()-e.year())*12+(t.month()-e.month()),r=e.clone().add(i,ue),s=t-r<0,o=e.clone().add(i+(s?-1:1),ue);return+(-(i+(t-r)/(s?r-o:o-r))||0)},cn=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},hn=function(e){var t={M:ue,y:Ee,w:ri,d:Ae,D:ht,h:ct,m:dt,s:lt,ms:ur,Q:Ya};return t[e]||String(e||"").toLowerCase().replace(/s$/,"")},un=function(e){return e===void 0},pn={s:ar,z:ln,m:dn,a:cn,p:hn,u:un},It="en",Ge={};Ge[It]=nn;var pr=function(e){return e instanceof mi},hi=function a(e,t,i){var r;if(!e)return It;if(typeof e=="string"){var s=e.toLowerCase();Ge[s]&&(r=s),t&&(Ge[s]=t,r=s);var o=e.split("-");if(!r&&o.length>1)return a(o[0])}else{var l=e.name;Ge[l]=e,r=l}return!i&&r&&(It=r),r||!i&&It},G=function(e,t){if(pr(e))return e.clone();var i=typeof t=="object"?t:{};return i.date=e,i.args=arguments,new mi(i)},vn=function(e,t){return G(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},z=pn;z.l=hi;z.i=pr;z.w=vn;var mn=function(e){var t=e.date,i=e.utc;if(t===null)return new Date(NaN);if(z.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var r=t.match(sn);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)},mi=function(){function a(t){this.$L=hi(t.locale,null,!0),this.parse(t)}var e=a.prototype;return e.parse=function(i){this.$d=mn(i),this.$x=i.x||{},this.init()},e.init=function(){var i=this.$d;this.$y=i.getFullYear(),this.$M=i.getMonth(),this.$D=i.getDate(),this.$W=i.getDay(),this.$H=i.getHours(),this.$m=i.getMinutes(),this.$s=i.getSeconds(),this.$ms=i.getMilliseconds()},e.$utils=function(){return z},e.isValid=function(){return this.$d.toString()!==pa},e.isSame=function(i,r){var s=G(i);return this.startOf(r)<=s&&s<=this.endOf(r)},e.isAfter=function(i,r){return G(i)<this.startOf(r)},e.isBefore=function(i,r){return this.endOf(r)<G(i)},e.$g=function(i,r,s){return z.u(i)?this[r]:this.set(s,i)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(i,r){var s=this,o=z.u(r)?!0:r,l=z.p(i),d=function(A,N){var L=z.w(s.$u?Date.UTC(s.$y,N,A):new Date(s.$y,N,A),s);return o?L:L.endOf(Ae)},h=function(A,N){var L=[0,0,0,0],I=[23,59,59,999];return z.w(s.toDate()[A].apply(s.toDate("s"),(o?L:I).slice(N)),s)},p=this.$W,v=this.$M,f=this.$D,y="set"+(this.$u?"UTC":"");switch(l){case Ee:return o?d(1,0):d(31,11);case ue:return o?d(1,v):d(0,v+1);case ri:{var $=this.$locale().weekStart||0,k=(p<$?p+7:p)-$;return d(o?f-k:f+(6-k),v)}case Ae:case ht:return h(y+"Hours",0);case ct:return h(y+"Minutes",1);case dt:return h(y+"Seconds",2);case lt:return h(y+"Milliseconds",3);default:return this.clone()}},e.endOf=function(i){return this.startOf(i,!1)},e.$set=function(i,r){var s,o=z.p(i),l="set"+(this.$u?"UTC":""),d=(s={},s[Ae]=l+"Date",s[ht]=l+"Date",s[ue]=l+"Month",s[Ee]=l+"FullYear",s[ct]=l+"Hours",s[dt]=l+"Minutes",s[lt]=l+"Seconds",s[ur]=l+"Milliseconds",s)[o],h=o===Ae?this.$D+(r-this.$W):r;if(o===ue||o===Ee){var p=this.clone().set(ht,1);p.$d[d](h),p.init(),this.$d=p.set(ht,Math.min(this.$D,p.daysInMonth())).$d}else d&&this.$d[d](h);return this.init(),this},e.set=function(i,r){return this.clone().$set(i,r)},e.get=function(i){return this[z.p(i)]()},e.add=function(i,r){var s=this,o;i=Number(i);var l=z.p(r),d=function(f){var y=G(s);return z.w(y.date(y.date()+Math.round(f*i)),s)};if(l===ue)return this.set(ue,this.$M+i);if(l===Ee)return this.set(Ee,this.$y+i);if(l===Ae)return d(1);if(l===ri)return d(7);var h=(o={},o[dt]=Vi,o[ct]=ua,o[lt]=gt,o)[l]||1,p=this.$d.getTime()+i*h;return z.w(p,this)},e.subtract=function(i,r){return this.add(i*-1,r)},e.format=function(i){var r=this,s=this.$locale();if(!this.isValid())return s.invalidDate||pa;var o=i||an,l=z.z(this),d=this.$H,h=this.$m,p=this.$M,v=s.weekdays,f=s.months,y=s.meridiem,$=function(L,I,Y,se){return L&&(L[I]||L(r,o))||Y[I].slice(0,se)},k=function(L){return z.s(d%12||12,L,"0")},E=y||function(N,L,I){var Y=N<12?"AM":"PM";return I?Y.toLowerCase():Y},A={YY:String(this.$y).slice(-2),YYYY:this.$y,M:p+1,MM:z.s(p+1,2,"0"),MMM:$(s.monthsShort,p,f,3),MMMM:$(f,p),D:this.$D,DD:z.s(this.$D,2,"0"),d:String(this.$W),dd:$(s.weekdaysMin,this.$W,v,2),ddd:$(s.weekdaysShort,this.$W,v,3),dddd:v[this.$W],H:String(d),HH:z.s(d,2,"0"),h:k(1),hh:k(2),a:E(d,h,!0),A:E(d,h,!1),m:String(h),mm:z.s(h,2,"0"),s:String(this.$s),ss:z.s(this.$s,2,"0"),SSS:z.s(this.$ms,3,"0"),Z:l};return o.replace(on,function(N,L){return L||A[N]||l.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(i,r,s){var o,l=z.p(r),d=G(i),h=(d.utcOffset()-this.utcOffset())*Vi,p=this-d,v=z.m(this,d);return v=(o={},o[Ee]=v/12,o[ue]=v,o[Ya]=v/3,o[ri]=(p-h)/rn,o[Ae]=(p-h)/tn,o[ct]=p/ua,o[dt]=p/Vi,o[lt]=p/gt,o)[l]||p,s?v:z.a(v)},e.daysInMonth=function(){return this.endOf(ue).$D},e.$locale=function(){return Ge[this.$L]},e.locale=function(i,r){if(!i)return this.$L;var s=this.clone(),o=hi(i,r,!0);return o&&(s.$L=o),s},e.clone=function(){return z.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},a}(),Ka=mi.prototype;G.prototype=Ka;[["$ms",ur],["$s",lt],["$m",dt],["$H",ct],["$W",Ae],["$M",ue],["$y",Ee],["$D",ht]].forEach(function(a){Ka[a[1]]=function(e){return this.$g(e,a[0],a[1])}});G.extend=function(a,e){return a.$i||(a(e,mi,G),a.$i=!0),G};G.locale=hi;G.isDayjs=pr;G.unix=function(a){return G(a*1e3)};G.en=Ge[It];G.Ls=Ge;G.p={};var gn=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,i,r){return i||r.slice(1)})},fn={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},bn=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(i,r,s){var o=s&&s.toUpperCase();return r||t[s]||fn[s]||gn(t[o])})},yn=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,wn=/\d/,Jt=/\d\d/,Sn=/\d{3}/,$n=/\d{4}/,be=/\d\d?/,xn=/[+-]?\d+/,Cn=/[+-]\d\d:?(\d\d)?|Z/,Ft=/\d*[^\s\d-_:/()]+/,Le={},qa=function(e){return e=+e,e+(e>68?1900:2e3)};function _n(a){if(!a||a==="Z")return 0;var e=a.match(/([+-]|\d\d)/g),t=+(e[1]*60)+(+e[2]||0);return t===0?0:e[0]==="+"?-t:t}var re=function(e){return function(t){this[e]=+t}},va=[Cn,function(a){var e=this.zone||(this.zone={});e.offset=_n(a)}],Wi=function(e){var t=Le[e];return t&&(t.indexOf?t:t.s.concat(t.f))},ma=function(e,t){var i,r=Le,s=r.meridiem;if(!s)i=e===(t?"pm":"PM");else for(var o=1;o<=24;o+=1)if(e.indexOf(s(o,0,t))>-1){i=o>12;break}return i},kn={A:[Ft,function(a){this.afternoon=ma(a,!1)}],a:[Ft,function(a){this.afternoon=ma(a,!0)}],S:[wn,function(a){this.milliseconds=+a*100}],SS:[Jt,function(a){this.milliseconds=+a*10}],SSS:[Sn,function(a){this.milliseconds=+a}],s:[be,re("seconds")],ss:[be,re("seconds")],m:[be,re("minutes")],mm:[be,re("minutes")],H:[be,re("hours")],h:[be,re("hours")],HH:[be,re("hours")],hh:[be,re("hours")],D:[be,re("day")],DD:[Jt,re("day")],Do:[Ft,function(a){var e=Le,t=e.ordinal,i=a.match(/\d+/);if(this.day=i[0],!!t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===a&&(this.day=r)}],M:[be,re("month")],MM:[Jt,re("month")],MMM:[Ft,function(a){var e=Wi("months"),t=Wi("monthsShort"),i=(t||e.map(function(r){return r.slice(0,3)})).indexOf(a)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[Ft,function(a){var e=Wi("months"),t=e.indexOf(a)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[xn,re("year")],YY:[Jt,function(a){this.year=qa(a)}],YYYY:[$n,re("year")],Z:va,ZZ:va};function Tn(a){var e=a.afternoon;if(e!==void 0){var t=a.hours;e?t<12&&(a.hours+=12):t===12&&(a.hours=0),delete a.afternoon}}function Dn(a){a=bn(a,Le&&Le.formats);for(var e=a.match(yn),t=e.length,i=0;i<t;i+=1){var r=e[i],s=kn[r],o=s&&s[0],l=s&&s[1];l?e[i]={regex:o,parser:l}:e[i]=r.replace(/^\[|\]$/g,"")}return function(d){for(var h={},p=0,v=0;p<t;p+=1){var f=e[p];if(typeof f=="string")v+=f.length;else{var y=f.regex,$=f.parser,k=d.slice(v),E=y.exec(k),A=E[0];$.call(h,A),d=d.replace(A,"")}}return Tn(h),h}}var Mn=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date((t==="X"?1e3:1)*e);var r=Dn(t),s=r(e),o=s.year,l=s.month,d=s.day,h=s.hours,p=s.minutes,v=s.seconds,f=s.milliseconds,y=s.zone,$=new Date,k=d||(!o&&!l?$.getDate():1),E=o||$.getFullYear(),A=0;o&&!l||(A=l>0?l-1:$.getMonth());var N=h||0,L=p||0,I=v||0,Y=f||0;return y?new Date(Date.UTC(E,A,k,N,L,I,Y+y.offset*60*1e3)):i?new Date(Date.UTC(E,A,k,N,L,I,Y)):new Date(E,A,k,N,L,I,Y)}catch{return new Date("")}},An=function(a,e,t){t.p.customParseFormat=!0,a&&a.parseTwoDigitYear&&(qa=a.parseTwoDigitYear);var i=e.prototype,r=i.parse;i.parse=function(s){var o=s.date,l=s.utc,d=s.args;this.$u=l;var h=d[1];if(typeof h=="string"){var p=d[2]===!0,v=d[3]===!0,f=p||v,y=d[2];v&&(y=d[2]),Le=this.$locale(),!p&&y&&(Le=t.Ls[y]),this.$d=Mn(o,h,l),this.init(),y&&y!==!0&&(this.$L=this.locale(y).$L),f&&o!=this.format(h)&&(this.$d=new Date("")),Le={}}else if(h instanceof Array)for(var $=h.length,k=1;k<=$;k+=1){d[1]=h[k-1];var E=t.apply(this,d);if(E.isValid()){this.$d=E.$d,this.$L=E.$L,this.init();break}k===$&&(this.$d=new Date(""))}else r.call(this,s)}};const En=Object.freeze({processing:"processing",complete:"complete"});class On extends B{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=En.processing}render(){return m`
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
    `}static get styles(){const e=b`var(--activityIndicatorCheckmarkColor, #31A481)`,t=b`var(--activityIndicatorCompletedRingColor, #31A481)`,i=b`var(--activityIndicatorLoadingRingColor, #333333)`,r=b`var(--activityIndicatorLoadingDotColor, #333333)`;return b`
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
        fill: ${r};
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
    `}}window.customElements.define("ia-activity-indicator",On);G.extend(An);const Ln=180,Fn=40,Nn=10,Rn=125,In=30,ga="YYYY",zn="no data",Pn=0,fa=4,Bn=b`var(--histogramDateRangeSliderColor, #4B65FE)`,Un=b`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,Hn=b`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,Vn=b`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,Wn=b`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,jn=b`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,Qn=b`var(--histogramDateRangeInputWidth, 35px)`,Gn=b`var(--histogramDateRangeInputFontSize, 1.2rem)`,Yn=b`var(--histogramDateRangeInputFontFamily, sans-serif)`,ba=b`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,ya=b`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,Kn=b`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,qn=b`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let H=class extends B{constructor(){super(...arguments),this.width=Ln,this.height=Fn,this.sliderWidth=Nn,this.tooltipWidth=Rn,this.tooltipHeight=In,this.updateDelay=Pn,this.dateFormat=ga,this.missingDataMessage=zn,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this._tooltipOffset=0,this._tooltipVisible=!1,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=e.offsetX-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(t)):this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(t))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}updated(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate"))&&this.handleDataUpdate()}handleDataUpdate(){!this.hasBinData||(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.getMSFromString(this.minDate),this._maxDateMS=this.getMSFromString(this.maxDate),this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate,this.requestUpdate())}calculateHistData(){const e=Math.min(...this.bins),t=Math.max(...this.bins),i=e===t?1:Math.log1p(t),r=this.height/i,s=this.dateRangeMS/this._numBins;return this.bins.map((o,l)=>({value:o,height:Math.floor(Math.log1p(o)*r),binStart:`${this.formatDate(l*s+this._minDateMS)}`,binEnd:`${this.formatDate((l+1)*s+this._minDateMS)}`}))}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),r=t<=this.getMSFromString(this.maxSelectedDate);i&&r&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),r=t>=this.getMSFromString(this.minSelectedDate);i&&r&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.translateDateToPosition(this.maxSelectedDate);return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){if(this._isDragging||this.disabled)return;const t=e.currentTarget,i=t.x.baseVal.value+this.sliderWidth/2,r=t.dataset,s=`item${r.numItems!=="1"?"s":""}`,o=Number(r.numItems).toLocaleString();this._tooltipOffset=i+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2,this._tooltipContent=m`
      ${o} ${s}<br />
      ${r.binStart} - ${r.binEnd}
    `,this._tooltipVisible=!0}hideTooltip(){this._tooltipContent=void 0,this._tooltipVisible=!1}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX;this._dragOffset=e.offsetX-t,(this._dragOffset>this.sliderWidth||this._dragOffset<-this.sliderWidth)&&(this._dragOffset=0)}translatePositionToDate(e){const t=Math.ceil((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleMinDateInput(e){const t=e.currentTarget;this.minSelectedDate=t.value,this.beginEmitUpdateProcess()}handleMaxDateInput(e){const t=e.currentTarget;this.maxSelectedDate=t.value,this.beginEmitUpdateProcess()}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const r=new Date(0,0);return r.setFullYear(Number(t)),r.getTime()}return G(t,[this.dateFormat,ga]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,r=Math.abs(i-this.getMSFromString(this.minSelectedDate)),s=Math.abs(i-this.getMSFromString(this.maxSelectedDate));r<s?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=fa,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=fa,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const r=t==="slider-min"?1:-1;return F`
    <svg
      id="${t}"
      class="
      ${this.disabled?"":"draggable"}
      ${this._isDragging?"dragging":""}"
      @pointerdown="${this.drag}"
    >
      <path d="${i} z" fill="${Bn}" />
      <rect
        x="${e-this.sliderWidth*r+this.sliderWidth*.4*r}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${e-this.sliderWidth*r+this.sliderWidth*.6*r}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
    </svg>
    `}get selectedRangeTemplate(){return F`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${Un}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(r=>{const s=F`
        <rect
          class="bar"
          style='stroke-dasharray: 0 ${t} ${r.height} ${t} 0 ${r.height};'
          x="${i}"
          y="${this.height-r.height}"
          width="${t}"
          height="${r.height}"
          @pointerenter="${this.showTooltip}"
          @pointerleave="${this.hideTooltip}"
          @click="${this.handleBarClick}"
          fill="${i+t>=this.minSliderX&&i<=this.maxSliderX?Hn:Wn}"
          data-num-items="${r.value}"
          data-bin-start="${r.binStart}"
          data-bin-end="${r.binEnd}"
        />`;return i+=e,s})}formatDate(e){if(Number.isNaN(e))return"";const t=G(e);return t.year()<1e3?String(t.year()):t.format(this.dateFormat)}get minInputTemplate(){return m`
      <input
        id="date-min"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMinDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${ha(this.minSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get maxInputTemplate(){return m`
      <input
        id="date-max"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMaxDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${ha(this.maxSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get tooltipTemplate(){return m`
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
    `}get noDataTemplate(){return m`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?m`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:_}render(){return this.hasBinData?m`
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
            ${this.minInputTemplate}
            <div class="dash">-</div>
            ${this.maxInputTemplate}
          </div>
        </div>
      </div>
    `:this.noDataTemplate}};H.styles=b`
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
      --activityIndicatorLoadingRingColor: ${Vn};
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
      background: ${ba};
      color: ${ya};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${Kn};
      font-family: ${qn};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      /* arrow */
      border: 5px solid ${ya};
      border-color: ${ba} transparent transparent
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
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
    }
    input {
      width: ${Qn};
      margin: 0 3px;
      border: ${jn};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Gn};
      font-family: ${Yn};
    }
  `;n([u({type:Number})],H.prototype,"width",void 0);n([u({type:Number})],H.prototype,"height",void 0);n([u({type:Number})],H.prototype,"sliderWidth",void 0);n([u({type:Number})],H.prototype,"tooltipWidth",void 0);n([u({type:Number})],H.prototype,"tooltipHeight",void 0);n([u({type:Number})],H.prototype,"updateDelay",void 0);n([u({type:String})],H.prototype,"dateFormat",void 0);n([u({type:String})],H.prototype,"missingDataMessage",void 0);n([u({type:String})],H.prototype,"minDate",void 0);n([u({type:String})],H.prototype,"maxDate",void 0);n([u({type:Boolean})],H.prototype,"disabled",void 0);n([u({type:Object})],H.prototype,"bins",void 0);n([D()],H.prototype,"_tooltipOffset",void 0);n([D()],H.prototype,"_tooltipContent",void 0);n([D()],H.prototype,"_tooltipVisible",void 0);n([D()],H.prototype,"_isDragging",void 0);n([D()],H.prototype,"_isLoading",void 0);n([u({type:Boolean})],H.prototype,"loading",null);n([u()],H.prototype,"minSelectedDate",null);n([u()],H.prototype,"maxSelectedDate",null);H=n([Q("histogram-date-range")],H);const wa=F`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,Sa=F`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let j=class extends B{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return m`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${wa}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${Sa}</span
        >
      </button>
      ${this.popupTemplate}
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){!this.isOpen||this.positionPopup()}handleScroll(){!this.isOpen||this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e!=null?e:this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){!this.recaptchaManager||(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted||(this.resetState(),this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.betaButton.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,r=window.innerHeight,s=i/2,o=r/2;e.left<s?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<o?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.closePopup()}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get popupTemplate(){return m`
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
                ${wa}
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
                ${Sa}
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
            ${this.error?m`<div id="error">${this.error}</div>`:_}
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
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.vote=this.vote==="up"?void 0:"up"}downvoteButtonSelected(){this.vote=this.vote==="down"?void 0:"down"}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.closePopup())}cancel(e){e.preventDefault(),this.vote=void 0,this.closePopup()}async submit(e){if(e.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=m`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");this.processing=!0;try{const t=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:t})).success?(this.voteSubmitted=!0,this.closePopup()):this.error=m`There was an error submitting your feedback.`}catch(t){this.error=m`There was an error submitting your feedback.<br />Error:
        ${t instanceof Error?t.message:t}`}this.processing=!1}static get styles(){const e=b`var(--featureFeedbackBlueColor, #194880)`,t=b`var(--featureFeedbackDarkGrayColor, #767676)`,i=b`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=b`var(--featureFeedbackBackdropZindex, 5)`,s=b`var(--featureFeedbackModalZindex, 6)`,o=b`var(--featureFeedbackPopupBorderColor, ${e})`,l=b`var(--featureFeedbackSubmitButtonColor, ${e})`,d=b`var(--featureFeedbackBetaButtonBorderColor, ${e})`,h=b`var(--featureFeedbackBetaButtonTextColor, ${e})`,p=b`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,v=b`var(--featureFeedbackCancelButtonColor, #515151)`,f=b`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,y=b`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,$=b`var(--featureFeedbackPromptFontWeight, bold)`,k=b`var(--featureFeedbackPromptFontSize, 14px)`,E=b`var(--defaultColor, ${t});`,A=b`var(--defaultColorSvgFilter, ${i});`,N=b`var(--upvoteColor, #23765D);`,L=b`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,I=b`var(--downvoteColor, #720D11);`,Y=b`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,se=b`var(--unselectedColor, #CCCCCC);`,ge=b`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return b`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${h};
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
        filter: ${ge};
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
        z-index: ${r};
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
        background-color: ${y};
        border: 1px ${o} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${s};
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
        font-size: ${k};
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
        border-color: ${E};
      }

      .vote-button.noselection svg {
        filter: ${A};
      }

      .vote-button.unselected {
        border-color: ${se};
      }

      .vote-button.unselected svg {
        filter: ${ge};
      }

      .upvote-button.selected {
        border-color: ${N};
      }

      .upvote-button.selected svg {
        filter: ${L};
      }

      .downvote-button.selected {
        border-color: ${I};
      }

      .downvote-button.selected svg {
        filter: ${Y};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `}};n([u({type:String})],j.prototype,"featureIdentifier",void 0);n([u({type:String})],j.prototype,"prompt",void 0);n([u({type:String})],j.prototype,"buttonText",void 0);n([u({type:Object})],j.prototype,"recaptchaManager",void 0);n([u({type:Object})],j.prototype,"resizeObserver",void 0);n([u({type:Boolean})],j.prototype,"disabled",void 0);n([u({type:Object})],j.prototype,"featureFeedbackService",void 0);n([le("#beta-button")],j.prototype,"betaButton",void 0);n([le("#popup")],j.prototype,"popup",void 0);n([D()],j.prototype,"isOpen",void 0);n([D()],j.prototype,"processing",void 0);n([D()],j.prototype,"popupTopX",void 0);n([D()],j.prototype,"popupTopY",void 0);n([D()],j.prototype,"vote",void 0);n([D()],j.prototype,"voteSubmitted",void 0);n([D()],j.prototype,"error",void 0);n([D()],j.prototype,"voteNeedsChoosing",void 0);n([D()],j.prototype,"recaptchaWidget",void 0);n([le("#comments")],j.prototype,"comments",void 0);j=n([Q("feature-feedback")],j);var Xn=F`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,Zn=F`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`,Xa=F`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`;const Jn=["mediatype","year","subject","collection","creator","language"],el={subjectSorter:"subject",mediatypeSorter:"mediatype",languageSorter:"language",creatorSorter:"creator",collection:"collection",year:"year"},$a={subject:"Subject",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year"};let ae=class extends B{constructor(){super(...arguments),this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.openFacets={subject:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1}}render(){return m`
      <div id="container" class="${this.facetsLoading?"loading":""}">
        ${this.showHistogramDatePicker&&this.fullYearsHistogramAggregation?m`
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            `:_}
        ${this.mergedFacets.map(e=>this.getFacetGroupTemplate(e))}
      </div>
    `}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get currentYearsHistogramAggregation(){var e;return(e=this.aggregations)===null||e===void 0?void 0:e.year_histogram}get histogramTemplate(){const{fullYearsHistogramAggregation:e}=this;return m`
      <histogram-date-range
        .minDate=${e==null?void 0:e.first_bucket_key}
        .maxDate=${e==null?void 0:e.last_bucket_key}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .updateDelay=${100}
        missingDataMessage="..."
        .width=${180}
        .bins=${e==null?void 0:e.buckets}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail,r=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(r)}get mergedFacets(){const e=[];return Jn.forEach(t=>{var i;const r=this.selectedFacetGroups.find(d=>d.key===t),s=this.aggregationFacetGroups.find(d=>d.key===t);if(r&&!s){e.push(r);return}if(!s)return;const o=r!=null?r:s,l=(i=r==null?void 0:r.buckets.map(d=>{const h=s.buckets.find(p=>p.key===d.key);return h?Mt(fe({},d),{count:h.count}):d}))!==null&&i!==void 0?i:[];s.buckets.forEach(d=>{l.find(p=>p.key===d.key)||l.push(d)}),o.buckets=l.splice(0,5),e.push(o)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const r=t,s=$a[r],o=Object.entries(i).map(([l,d])=>{var h,p;let v=l;return r==="language"&&(v=(p=(h=this.languageCodeHandler)===null||h===void 0?void 0:h.getLanguageNameFromCodeString(l))!==null&&p!==void 0?p:l),{displayText:v,key:l,count:0,state:d}});return{title:s,key:r,buckets:o}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,r])=>{if(i==="year_histogram")return;const s=this.getFacetOptionFromKey(i),o=$a[s],d=r.buckets.map(p=>{var v,f;let y=p.key;return s==="language"&&(y=(f=(v=this.languageCodeHandler)===null||v===void 0?void 0:v.getCodeStringFromLanguageName(`${p.key}`))!==null&&f!==void 0?f:p.key),{displayText:`${p.key}`,key:`${y}`,count:p.doc_count,state:"none"}}),h={title:o,key:s,buckets:d};t.push(h)}),t}getFacetGroupTemplate(e){if(e.buckets.length===0)return _;const{key:t}=e,i=this.openFacets[t],r=m`
      <span class="collapser ${i?"open":""}"> ${Xa} </span>
    `;return m`
      <div class="facet-group ${this.collapsableFacets?"mobile":""}">
        <h1
          @click=${()=>{const s=fe({},this.openFacets);s[t]=!i,this.openFacets=s}}
          @keyup=${()=>{const s=fe({},this.openFacets);s[t]=!i,this.openFacets=s}}
        >
          ${this.collapsableFacets?r:_} ${e.title}
        </h1>
        <div class="facet-group-content ${i?"open":""}">
          ${this.getFacetTemplate(e)}
        </div>
      </div>
    `}getFacetTemplate(e){const i=e.buckets.filter(r=>r.key.startsWith("fav-")===!1).slice(0,6);return m`
      <ul class="facet-list">
        ${Pa(i,r=>`${e.key}:${r.key}`,r=>{var s,o;const l=`${e.key}:${r.key}-show-only`,d=`${e.key}:${r.key}-negative`,h=e.key!=="collection"?m`${(s=r.displayText)!==null&&s!==void 0?s:r.key}`:m`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${r.key}
                      placeholder="-"
                    ></async-collection-name>
                  `,p=r.state==="hidden",v=r.state==="selected",f=`${e.key}: ${(o=r.displayText)!==null&&o!==void 0?o:r.key}`,y=v?`Show all ${e.key}s`:`Only show ${f}`,$=`Hide ${f}`,k=`Unhide ${f}`,E=p?k:$;return m`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${e.key}
                      .value=${r.key}
                      @click=${A=>{this.facetClicked(A,r,!1)}}
                      .checked=${v}
                      class="select-facet-checkbox"
                      title=${y}
                      id=${l}
                    />
                    <input
                      type="checkbox"
                      id=${d}
                      .name=${e.key}
                      .value=${r.key}
                      @click=${A=>{this.facetClicked(A,r,!0)}}
                      .checked=${p}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${d}
                      class="hide-facet-icon"
                      title=${E}
                    >
                      ${p?Zn:Xn}
                    </label>
                  </div>

                  <label
                    for=${l}
                    class="facet-info-display"
                    title=${y}
                  >
                    <div class="facet-title">${h}</div>
                    <div class="facet-count">${r.count}</div>
                  </label>
                </div>
              </li>
            `})}
      </ul>
    `}facetClicked(e,t,i){const r=e.target,{checked:s,name:o,value:l}=r;s?this.facetChecked(o,l,i):this.facetUnchecked(o,l)}facetChecked(e,t,i){const{selectedFacets:r}=this;let s;r?s=fe({},r):s=di,s[e][t]=i?"hidden":"selected",this.selectedFacets=s}facetUnchecked(e,t){const{selectedFacets:i}=this;let r;i?r=fe({},i):r=di,delete r[e][t],this.selectedFacets=r}getFacetOptionFromKey(e){const r=e.split("__")[2].split(":")[1],s=Object.entries(el).find(([l])=>r.includes(l)),o=s==null?void 0:s[1];if(!o)throw new Error(`Could not find facet option for key: ${e}`);return o}static get styles(){return b`
      #container.loading {
        opacity: 0.5;
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

      .facet-group {
        margin-bottom: 2rem;
      }

      .facet-group h1 {
        margin-bottom: 0.7rem;
      }

      .facet-group.mobile h1 {
        cursor: pointer;
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

      h1 {
        font-size: 1.4rem;
        font-weight: 200;
        border-bottom: 1px solid rgb(232, 232, 232);
        padding-bottom: 3px;
        margin: 0;
      }

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      ul.facet-list li {
        margin-bottom: 0.2rem;
      }

      .facet-checkbox {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
      }

      .facet-row {
        display: flex;
        align-items: start;
        font-weight: 500;
        font-size: 1.2rem;
      }

      .facet-info-display {
        display: flex;
        flex: 1;
        cursor: pointer;
      }

      .facet-title {
        flex: 1;
      }

      .facet-count {
        margin-left: 0.5rem;
      }

      .select-facet-checkbox {
        cursor: pointer;
        margin-right: 5px;
      }

      .hide-facet-checkbox {
        display: none;
      }

      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
      }
    `}};n([u({type:Object})],ae.prototype,"aggregations",void 0);n([u({type:Object})],ae.prototype,"fullYearsHistogramAggregation",void 0);n([u({type:String})],ae.prototype,"minSelectedDate",void 0);n([u({type:String})],ae.prototype,"maxSelectedDate",void 0);n([u({type:Boolean})],ae.prototype,"facetsLoading",void 0);n([u({type:Boolean})],ae.prototype,"fullYearAggregationLoading",void 0);n([u({type:Object})],ae.prototype,"selectedFacets",void 0);n([u({type:Boolean})],ae.prototype,"collapsableFacets",void 0);n([u({type:Boolean})],ae.prototype,"showHistogramDatePicker",void 0);n([u({type:Object})],ae.prototype,"languageCodeHandler",void 0);n([u({type:Object})],ae.prototype,"collectionNameCache",void 0);n([D()],ae.prototype,"openFacets",void 0);ae=n([Q("collection-facets")],ae);let xa=class extends B{render(){return m`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=b`var(--circularActivityIndicatorColor, dodgerblue)`,t=b`var(--circularActivityIndicatorThickness, 4px)`;return b`
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
    `}};xa=n([Q("circular-activity-indicator")],xa);/*! typescript-cookie v1.0.3 | MIT */const Za=a=>encodeURIComponent(a).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Ja=a=>encodeURIComponent(a).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),vr=decodeURIComponent,mr=a=>(a[0]==='"'&&(a=a.slice(1,-1)),a.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function tl(a){return a=Object.assign({},a),typeof a.expires=="number"&&(a.expires=new Date(Date.now()+a.expires*864e5)),a.expires!=null&&(a.expires=a.expires.toUTCString()),Object.entries(a).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function es(a,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,r={};let s;for(;(s=i.exec(document.cookie))!=null;)try{const o=t(s[1]);if(r[o]=e(s[2],o),a===o)break}catch{}return a!=null?r[a]:r}const Ca=Object.freeze({decodeName:vr,decodeValue:mr,encodeName:Za,encodeValue:Ja}),gr=Object.freeze({path:"/"});function ui(a,e,t=gr,{encodeValue:i=Ja,encodeName:r=Za}={}){return document.cookie=`${r(a)}=${i(e,a)}${tl(t)}`}function sr(a,{decodeValue:e=mr,decodeName:t=vr}={}){return es(a,e,t)}function il({decodeValue:a=mr,decodeName:e=vr}={}){return es(void 0,a,e)}function rl(a,e=gr){ui(a,"",Object.assign({},e,{expires:-1}))}function or(a,e){const t={set:function(r,s,o){return ui(r,s,Object.assign({},this.attributes,o),{encodeValue:this.converter.write})},get:function(r){if(arguments.length===0)return il(this.converter.read);if(r!=null)return sr(r,this.converter.read)},remove:function(r,s){rl(r,Object.assign({},this.attributes,s))},withAttributes:function(r){return or(this.converter,Object.assign({},this.attributes,r))},withConverter:function(r){return or(Object.assign({},this.converter,r),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(a)}};return Object.create(t,i)}or({read:Ca.decodeValue,write:Ca.encodeValue},gr);class al{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";ui(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";ui(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=sr(`view-${this.context}`),t=sr(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e){const t=new URL(window.location.href),{searchParams:i}=t;if(i.delete("sort"),i.delete("query"),i.delete("page"),i.delete("and[]"),i.delete("not[]"),e.sortParam){const r=e.sortParam.direction==="desc"?"-":"";i.set("sort",`${r}${e.sortParam.field}`)}if(e.baseQuery&&i.set("query",e.baseQuery),e.currentPage&&(e.currentPage>1?i.set("page",e.currentPage.toString()):i.delete("page")),e.selectedFacets)for(const[r,s]of Object.entries(e.selectedFacets)){const o=Object.entries(s);if(o.length!==0)for(const[l,d]of o){const h=d==="hidden",p=`${r}:"${l}"`;h?i.append("not[]",p):i.append("and[]",p)}}e.dateRangeQueryClause&&i.append("and[]",e.dateRangeQueryClause),e.titleQuery&&i.append("and[]",e.titleQuery),e.creatorQuery&&i.append("and[]",e.creatorQuery),window.history.pushState({sort:e.sortParam,query:e.baseQuery,page:e.currentPage,and:e.selectedFacets,not:e.selectedFacets,dateRange:e.dateRangeQueryClause},"",t)}loadQueryStateFromUrl(){const e=new URL(window.location.href),t=e.searchParams.get("page"),i=e.searchParams.get("query"),r=e.searchParams.get("sort"),s=e.searchParams.getAll("and[]"),o=e.searchParams.getAll("not[]"),l={selectedFacets:{subject:{},creator:{},mediatype:{},language:{},collection:{},year:{}}};if(t){const d=parseInt(t,10);l.currentPage=d}else l.currentPage=1;if(i&&(l.baseQuery=i),r)if(r.indexOf(" ")>-1){const[h,p]=r.split(" "),v=da[h];v&&(l.selectedSort=v),(p==="desc"||p==="asc")&&(l.sortDirection=p)}else{const h=r.startsWith("-")?"desc":"asc",p=r.startsWith("-")?r.slice(1):r,v=da[p];v&&(l.selectedSort=v),l.sortDirection=h}return s&&s.forEach(d=>{const[h,p]=d.split(":"),v=this.stripQuotes(p);switch(h){case"year":{const[f,y]=p.split(" TO ");f&&y?(l.minSelectedDate=f.substring(1,f.length),l.maxSelectedDate=y.substring(0,y.length-1),l.dateRangeQueryClause=`year:${p}`):l.selectedFacets[h][v]="selected";break}case"firstTitle":l.selectedTitleFilter=p;break;case"firstCreator":l.selectedCreatorFilter=p;break;default:l.selectedFacets[h][v]="selected"}}),o&&o.forEach(d=>{const[h,p]=d.split(":"),v=this.stripQuotes(p);l.selectedFacets[h][v]="hidden"}),l}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}}const ji={"ambient noise wall":"Music","american english":"English","arabic videos":"Arabic","arabic, english":"Arabic and English","de-formal":"German","en-ca":"English","en-gb":"English","en-us":"English","eng-fre":"English and French","eng;fre":"English and French","english handwritten":"Handwritten English","english-handwritten":"Handwritten English","english, polski":"English and Polish","english, spanish":"English and Spanish","english; finnish":"English and Finnish","english/french":"English and French","finnish, english":"English and Finnish","finnish; english":"English and Finnish","french-handwritten":"Handwritten French","german-handwritten":"Handwritten German","hebrew-handwritten":"Handwritten Hebrew","language not encoded":"Unknown","miscellaneous languages":"Multiple","n/a":"Unknown","no language":"skip","no linguistic content":"skip","no speech":"skip","polish-handwritten":"Handwritten Polish","pt-br":"Portuguese","spanish-handwritten":"Handwritten Spanish","us english":"English","www.back4allah.com":"Arabic","www.rabania.com":"Arabic","www.way2allah.com":"Arabic","yiddish-handwritten":"Handwritten Yiddish","zh-cn":"Chinese","zh-tw":"Chinese","\u0623\u0648\u0631\u062F\u0648 ::: Urdu":"Urdu","\u0628\u0634\u062A\u0648 ::: Pashto":"Pashto","\u0639\u0631\u0628\u064A\u0629 ::: arabic":"Arabic","\u0639\u0631\u0628\u064A\u0629 ::: Arabic":"Arabic","\u0639\u0631\u0628\u064A\u0629 \u0645\u0639 \u062A\u0631\u062C\u0645\u0629 \u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 ::: Arabic with English subtitles":"Arabic with English subtitles",aar:"Afar",abk:"Abkhaz",adl:"Galo",ady:"Adyghe",afr:"Afrikaans",aka:"Akan",akk:"Akkadian",alb:"Albanian",ale:"Aleut",alg:"Algonquian",american:"English",amh:"Amharic",ang:"Old English",anm:"Anal",anq:"Jarawa",apa:"Apache languages",apt:"Apatani",ar:"Arabic",ara:"Arabic",arab:"Arabic",arabe:"Arabic",arbc:"Arabic",arbic:"Arabic",arc:"Aramaic",arg:"Aragonese",arm:"Armenian",arp:"Arapaho",asm:"Assamese",ast:"Asturian",ath:"Athapascan (Other)",awa:"Awadhi",aym:"Aymara",aze:"Azerbaijani",bak:"Bashkir",bal:"Baluchi",ban:"Balinese",baq:"Basque",bel:"Belarusian",bem:"Bemba",ben:"Bengali",ber:"Berber",bft:"Balti",bfy:"Bagheli",bgw:"Bhatri",bhb:"Bhili",bho:"Bhojpuri",bih:"Bihari",bis:"Bislama",bkk:"Brokskat",bla:"Blackfoot",bns:"Bundeli",bnt:"Bantu",bos:"Bosnian",bra:"Braj",bre:"Breton",brx:"Bodo",bua:"Buryat",bul:"Bulgarian",bur:"Burmese",cai:"Central American Indian",caq:"Car",car:"Carib",cat:"Catalan",cau:"Caucasian",ceb:"Cebuano",ces:"Czech",cha:"Chamorro",che:"Chechen",chi:"Chinese",chm:"Mari",chn:"Chinook jargon",cho:"Choctaw",chp:"Chipewyan",chr:"Cherokee",chu:"Church Slavic",chv:"Chuvash",chy:"Cheyenne",clk:"Idu-Mishmi",cmn:"Mandarin Chinese",cop:"Coptic",cor:"Cornish",cos:"Corsican",cpe:"Creoles and Pidgins, English-based",cpf:"Creoles and Pidgins, French-based",cpp:"Creoles and Pidgins, Portuguese-based",cre:"Cree",crh:"Crimean Tatar",cro:"Croatian",crp:"Creoles and Pidgins",cs:"Czech",csb:"Kashubian",cym:"Welsh",cze:"Czech",da:"Danish",dak:"Dakota",dan:"Danish",dar:"Dargwa",de:"German",del:"Delaware",deu:"German",deutsch:"German",dgo:"Dogri",dih:"Dhivehi",doi:"Dogri (Generic)",dra:"Dravidian (Other)",dsb:"Lower Sorbian",dum:"Middle Dutch",dut:"Dutch",dzo:"Dzongkha",egy:"Egyptian",el:"Greek",ell:"Greek",emg:"English",en_us:"English",en:"English",eng:"English",engfre:"English and French",engilsh:"English",english:"English",enm:"Middle English",epo:"Esperanto",es:"Spanish",esk:"Eskimo",esp:"Esperanto",espanol:"Spanish",espa\u00F1ol:"Spanish",est:"Estonian",eth:"Ethiopic",eus:"Basque",fa:"Persian",fao:"Faroese",far:"Faroese",fas:"Persian",fi:"Finnish",fij:"Fijian",fil:"Filipino",fin:"Finnish",fle:"Dutch",fr:"French",fra:"French",francais:"French",fran\u00E7ais:"French",fre:"French",fri:"Frisian",frm:"Middle French",fro:"Old French",frr:"North Frisian",fry:"Frisian",fur:"Friulian",gaa:"G\xE3",gac:"Mixed Great Andamanese",gae:"Scottish Gaelic",gag:"Galician",gbl:"Gamit",gem:"Germanic",geo:"Georgian",ger:"German",gez:"Ethiopic",gil:"Gilbertese",gju:"Gujari",gla:"Scottish Gaelic",gle:"Irish",glg:"Galician",glv:"Manx",gmh:"Middle High German",goh:"Old German",gon:"Gondi",got:"Gothic",grb:"Grebo",grc:"Ancient Greek",gre:"Greek",grn:"Guarani",grt:"Garo",gsw:"Swiss German",gua:"Guarani",guj:"Gujarati",gwi:"Gwichin",hai:"Haida",hat:"Haitian French Creole",hau:"Hausa",haw:"Hawaiian",he:"Hebrew",heb:"Hebrew",hin:"Hindi",hlb:"Halbi",hmn:"Hmong",hmr:"Hmar",hne:"Chhattisgarhi",hoc:"Ho",hrv:"Croatian",hsb:"Upper Sorbian",hu:"Hungarian",hun:"Hungarian",ibo:"Igbo",ice:"Icelandic",ido:"Ido",iku:"Inuktitut",ile:"Interlingue",ilo:"Iloko",ina:"Interlingua",inc:"Indic (Other)",ind:"Indonesian",inh:"Ingush",int:"Interlingua",ipk:"Inupiaq",ira:"Iranian",iri:"Irish",iro:"Iroquoian",iru:"Irula",isl:"Icelandic",ita:"Italian",jam:"Music",jap:"Japanese",jav:"Javanese",jpn:"Japanese",jrb:"Judeo-Arabic",kaa:"Karakalpak",kab:"Kabyle",kal:"Kalatdlisut",kan:"Kannada",kar:"Karen",kas:"Kashmiri",kaz:"Kazakh",kbd:"Kabardian",kfa:"Kodava",kfb:"Northwestern Kolami",kfe:"Kota (India)",kff:"Koya",kfq:"Korku",kha:"Khasi",khm:"Khmer",kho:"Khotanese",khr:"Kharia",kik:"Kikuyu",kin:"Kinyarwanda",kir:"Kyrgyz",kix:"Khiamniungan Naga",kmj:"Kumarbhag Paharia",kmm:"Kom (India)",ko:"Korean",kok:"Konkani",kon:"Kongo",kor:"Korean",kpe:"Kpelle",krc:"Karachay-Balkar",kro:"Kru",kru:"Kurukh",ksh:"K\xF6lsch",kum:"Kumyk",kur:"Kurdish",kxu:"Kui (India)",kxv:"Kuvi",kyw:"Kudmali",lad:"Ladino",lah:"Lahnda",lao:"Lao",lap:"Sami",lat:"Latin",lav:"Latvian",lbj:"Ladakhi",lep:"Lepcha",lez:"Lezgin",lim:"Limburgish",lin:"Lingala",lit:"Lithuanian",lmn:"Lambadi",lol:"Mongo-Nkundu",ltz:"Luxembourgish",lua:"Luba-Lulua",lub:"Luba-Katanga",lug:"Ganda",lus:"Lushai",mac:"Macedonian",mah:"Marshallese",mai:"Maithili",mal:"Malayalam",man:"Mandarin Chinese",mao:"Maori",map:"Austronesian",mar:"Marathi",max:"Manx",may:"Malay",mga:"Middle Irish",mha:"Manda (India)",mic:"Micmac",min:"Minankabaw",mis:"Miscellaneous languages",mjw:"Karbi",mkh:"Mon-Khmer",mla:"Malagasy",mlg:"Malagasy",mlt:"Maltese",mni:"Manipuri",moh:"Mohawk",mol:"Moldavian",mon:"Mongolian",mrg:"Mising",mul:"Multiple",mus:"Creek",mwr:"Marwari",myn:"Maya",nag:"Naga Pigdin",nah:"Nahuatl",nai:"North American Indian",nap:"Neapolitan",nau:"Nauru",nav:"Navajo",nbc:"Chang Naga",nbe:"Konyak Naga",nbi:"Mao Naga",nbl:"Ndebele",nbu:"Rongmei Naga",nds:"Low German",nep:"Nepali",new:"Newari",ng:"English",nic:"Niger-Kordofanian",njh:"Lotha Naga",njm:"Angami Naga",njn:"Liangmai Naga",njo:"Ao Naga",nkf:"Inpui Naga",nkh:"Khezha Naga",nld:"Dutch",nll:"Nihali",nma:"Maram Naga",nmf:"Tangkhul Naga",nno:"Norwegian (Nynorsk)",no:"skip",nob:"Norwegian (Bokm\xE5l)",nog:"Nogay",non:"Old Norse",none:"skip",nor:"Norwegian",nri:"Chokri Naga",nsa:"Sangtam Naga",nsm:"Sumi Naga",nso:"Northern Sotho",nya:"Nyanja",nzm:"Zeme Naga",oci:"Occitan",oji:"Ojibwa",oon:"\xD6nge",ori:"Oriya",orm:"Oromo",ory:"Odia",oss:"Ossetic",ota:"Ottoman Turkish",oto:"Otomian",paa:"Papuan",pag:"Pangasinan",pal:"Pahlavi",pam:"Pampanga",pan:"Panjabi",panjabi:"Punjabi",pap:"Papiamento",pbv:"Pnar",pci:"Duruwa",pck:"Paite Chin",per:"Persian",phi:"Philippine",pli:"Pali",pol:"Polish",por:"Portuguese",port:"Portuguese",portugues:"Portuguese",portugu\u00EAs:"Portuguese",pra:"Prakrit",pro:"Provencal",prx:"Purik",pus:"Pashto",qaa:"skip",que:"Quechua",rah:"Rabha",raj:"Rajasthani",roa:"Romance",roh:"Romansh",rom:"Romani",ron:"Romanian",rum:"Romanian",run:"Rundi",rus:"Russian",sag:"Sango",sah:"Yakut",sai:"South American Indian",sam:"Samaritan Aramaic",san:"Sanskrit",sao:"Samoan",sat:"Santali",scc:"Serbian",scl:"Shina",sco:"Scots",scots:"Scottish",scr:"Croatian",sdr:"Oraon Sadri",sel:"Selkup",sem:"Semitic",sga:"Old Irish",sho:"Shona",sin:"Sinhalese",sio:"Siouan",sip:"Sikkimese",sit:"Sino-Tibetan",sk:"Slovak",sla:"Slavic",slk:"Slovak",slo:"Slovak",slv:"Slovenian",sme:"Saami",smi:"Sami",smo:"Samoan",sms:"Skolt Sami",sna:"Shona",snd:"Sindhi",snh:"Sinhalese",som:"Somali",sot:"Sotho",spa:"Spanish",spain:"Spanish",spv:"Sambalpuri",sq:"Albanian",sqi:"Albanian",srb:"Sora",srp:"Serbian",sso:"Sotho",ssw:"Swazi",sun:"Sundanese",sux:"Sumerian",sv:"Swedish",svenska:"Swedish",swa:"Swahili",swe:"Swedish",swz:"Swazi",syc:"Syriac",syr:"Modern Syriac",tag:"Tagalog",tah:"Tahitian",taj:"Tajik",tam:"Tamil",tar:"Tatar",tat:"Tatar",tcy:"Tulu",tcz:"Thado Chin",tel:"Telugu",tem:"Temne",tgk:"Tajik",tgl:"Tagalog",tha:"Thai",tib:"Tibetan",tig:"Tigre",tir:"Tigrinya",tlh:"Klingon",tog:"Tonga",ton:"Tongan",tpi:"Tok Pisin",tr:"Turkish",trp:"Kok Borok",tsi:"Tsimshian",tsn:"Tswana",tso:"Tsonga",tsw:"Tswana",tuk:"Turkmen",tur:"Turkish",t\u00FCrk\u00E7e:"Turkish",tut:"Altaic",tyv:"Tuvinian",udm:"Udmurt",uig:"Uighur",uk:"Ukranian",ukr:"Ukrainian",und:"undetermined",undetermined:"skip",unknown:"skip",unr:"Mundari",urd:"Urdu",uzb:"Uzbek",vah:"Varhadi-Nagpuri",vap:"Vaiphei",vav:"Varli",ven:"Venda",vie:"Vietnamese",vol:"Volapu\u0308k",war:"Waray",wbr:"Wagdi",wel:"Welsh",wen:"Sorbian",wol:"Wolof",xal:"Oirat",xho:"Xhosa",xis:"Kisan (Dravidian)",xnr:"Kangri",xsr:"Solu-Khumbu Sherpa",yea:"Ravula",yid:"Yiddish",yim:"Yimchungru Naga",yor:"Yoruba",ypk:"Yupik languages",zap:"Zapotec",zh:"Chinese",zha:"Zhuang",zho:"Chinese",zom:"Zou",zul:"Zulu",zun:"Zuni",zxx:"No linguistic content",\u0420\u0443\u0441\u0441\u043A\u0438\u0439:"Russian",\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0438\u0439:"Ukranian",\u0627\u0644\u0639\u0631\u0628\u064A\u0629:"Arabic",\u0639\u0631\u0628\u064A:"Arabic"};class sl{constructor(){this.delimeter="|"}getLanguageNameFromCodeString(e){const t=this.getCodeArrayFromCodeString(e);if(t.length===0)return"";const i=t[0],r=ji[i];return r!=null?r:e}getCodeStringFromLanguageName(e){const t=Object.keys(ji).filter(r=>ji[r]===e);return t==null?void 0:t.join(this.delimeter)}getCodeArrayFromCodeString(e){return e.split(this.delimeter)}}let T=class extends B{constructor(){super(...arguments),this.baseImageUrl="https://archive.org",this.sortParam=null,this.selectedSort=O.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.pageSize=50,this.showHistogramDatePicker=!1,this.pageContext="search",this.restorationStateHandler=new al({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.isManageView=!1,this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.mobileView=!1,this.mobileFacetsVisible=!1,this.languageCodeHandler=new sl,this.isScrollingToCell=!1,this.endOfDataReached=!1,this.isResizeToMobile=!1,this.placeholderCellTemplate=m`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.dataSource={},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.pageFetchesInProgress={}}tileModelAtCellIndex(e){var t;const i=Math.floor(e/this.pageSize)+1,r=e%this.pageSize,s=(t=this.dataSource[i])===null||t===void 0?void 0:t[r];return!s&&!this.isScrollingToCell&&this.fetchPage(i),s}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get estimatedTileCount(){return this.pagesToRender*this.pageSize}get actualTileCount(){return Object.keys(this.dataSource).reduce((e,t)=>e+this.dataSource[t].length,0)}goToPage(e){this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}clearFilters(){this.selectedFacets=di,this.sortParam=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.titleQuery=void 0,this.creatorQuery=void 0,this.selectedSort=O.relevance,this.sortDirection=null}render(){return m`
      <div id="content-container" class=${this.mobileView?"mobile":""}>
        <div
          id="left-column"
          class="column${this.isResizeToMobile?" preload":""}"
        >
          <div id="mobile-header-container">
            ${this.mobileView?this.mobileFacetsTemplate:_}
            <div id="results-total">
              <span id="big-results-count"
                >${this.totalResults!==void 0?this.totalResults.toLocaleString():"-"}</span
              >
              <span id="big-results-label">Results</span>
            </div>
          </div>
          <div
            id="facets-container"
            class=${!this.mobileView||this.mobileFacetsVisible?"expanded":""}
          >
            ${this.facetsTemplate}
          </div>
        </div>
        <div id="right-column" class="column">
          ${this.searchResultsLoading?this.loadingTemplate:_}
          <sort-filter-bar
            .selectedSort=${this.selectedSort}
            .sortDirection=${this.sortDirection}
            .displayMode=${this.displayMode}
            .selectedTitleFilter=${this.selectedTitleFilter}
            .selectedCreatorFilter=${this.selectedCreatorFilter}
            .resizeObserver=${this.resizeObserver}
            @sortChanged=${this.userChangedSort}
            @displayModeChanged=${this.displayModeChanged}
            @titleLetterChanged=${this.titleLetterSelected}
            @creatorLetterChanged=${this.creatorLetterSelected}
          ></sort-filter-bar>

          ${this.displayMode==="list-compact"?this.listHeaderTemplate:_}
          ${!this.searchResultsLoading&&this.totalResults===0?m`
                <h2>
                  Your search did not match any items in the Archive. Try
                  different keywords or a more general search.
                </h2>
              `:_}

          <infinite-scroller
            class="${Qe(this.displayMode)}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `}userChangedSort(e){var t;const{selectedSort:i,sortDirection:r}=e.detail;this.selectedSort=i,this.sortDirection=r,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.goToPage(1),this.currentPage=1}selectedSortChanged(){if(this.selectedSort==="relevance"||this.sortDirection===null){this.sortParam=null;return}const e=qo[this.selectedSort];!e||(this.sortParam={field:e,direction:this.sortDirection})}displayModeChanged(e){this.displayMode=e.detail.displayMode}selectedTitleLetterChanged(){this.titleQuery=this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}selectedCreatorLetterChanged(){this.creatorQuery=this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get facetDataLoading(){return this.facetsLoading||this.fullYearAggregationLoading}get mobileFacetsTemplate(){return m`
      <div id="mobile-filter-collapse">
        <h1
          @click=${()=>{this.isResizeToMobile=!1,this.mobileFacetsVisible=!this.mobileFacetsVisible}}
          @keyup=${()=>{this.isResizeToMobile=!1,this.mobileFacetsVisible=!this.mobileFacetsVisible}}
        >
          <span class="collapser ${this.mobileFacetsVisible?"open":""}">
            ${Xa}
          </span>
          Filters
        </h1>
      </div>
    `}get facetsTemplate(){return m`
      ${this.facetsLoading?this.loadingTemplate:_}
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .aggregations=${this.aggregations}
        .fullYearsHistogramAggregation=${this.fullYearsHistogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .collectionNameCache=${this.collectionNameCache}
        .languageCodeHandler=${this.languageCodeHandler}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetDataLoading}
        ?fullYearAggregationLoading=${this.fullYearAggregationLoading}
      ></collection-facets>
    `}get loadingTemplate(){return m`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `}get listHeaderTemplate(){return m`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
        >
        </tile-dispatcher>
      </div>
    `}get queryDebuggingTemplate(){var e,t;return m`
      <div>
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Sort Filter Query: ${this.sortFilterQueries}</li>
          <li>Date Range Query: ${this.dateRangeQueryClause}</li>
          <li>Sort: ${(e=this.sortParam)===null||e===void 0?void 0:e.field} ${(t=this.sortParam)===null||t===void 0?void 0:t.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>
    `}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail;this.dateRangeQueryClause=`year:[${t} TO ${i}]`}firstUpdated(){this.setupStateRestorationObserver(),this.restoreState()}updated(e){if((e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl"))&&this.infiniteScroller.reload(),e.has("baseQuery")&&this.emitBaseQueryChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("titleQuery")||e.has("creatorQuery")||e.has("dateRangeQueryClause")||e.has("sortParam")||e.has("selectedFacets")||e.has("searchService"))&&this.handleQueryChange(),(e.has("selectedSort")||e.has("sortDirection"))&&this.selectedSortChanged(),e.has("selectedTitleFilter")&&this.selectedTitleLetterChanged(),e.has("selectedCreatorFilter")&&this.selectedCreatorLetterChanged(),e.has("pagesToRender")&&(this.endOfDataReached||(this.infiniteScroller.itemCount=this.estimatedTileCount)),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler)}handleResize(e){const t=this.mobileView;e.target===this.contentContainer&&(this.mobileView=e.contentRect.width<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(t.length===0)return;const i=t[t.length-1],r=Math.floor(i/this.pageSize)+1;this.currentPage!==r&&(this.currentPage=r);const s=new CustomEvent("visiblePageChanged",{detail:{pageNumber:r}});this.dispatchEvent(s)}async handleQueryChange(){!this.searchService||this.pageFetchQueryKey===this.previousQueryKey||(this.previousQueryKey=this.pageFetchQueryKey,this.dataSource={},this.pageFetchesInProgress={},this.endOfDataReached=!1,this.pagesToRender=this.initialPageNumber,!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||(this.persistState(),this.historyPopOccurred=!1),await Promise.all([this.doInitialPageFetch(),this.fetchFacets(),this.fetchFullYearHistogram()]))}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this),window.addEventListener("popstate",this.boundNavigationHandler))}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,r,s,o;const l=this.restorationStateHandler.getRestorationState();this.displayMode=l.displayMode,this.selectedSort=(e=l.selectedSort)!==null&&e!==void 0?e:O.relevance,this.sortDirection=(t=l.sortDirection)!==null&&t!==void 0?t:null,this.selectedTitleFilter=(i=l.selectedTitleFilter)!==null&&i!==void 0?i:null,this.selectedCreatorFilter=(r=l.selectedCreatorFilter)!==null&&r!==void 0?r:null,this.selectedFacets=l.selectedFacets,this.baseQuery=l.baseQuery,this.titleQuery=l.titleQuery,this.creatorQuery=l.creatorQuery,this.dateRangeQueryClause=l.dateRangeQueryClause,this.sortParam=(s=l.sortParam)!==null&&s!==void 0?s:null,this.currentPage=(o=l.currentPage)!==null&&o!==void 0?o:1,this.minSelectedDate=l.minSelectedDate,this.maxSelectedDate=l.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,r,s;const o={displayMode:this.displayMode,sortParam:(e=this.sortParam)!==null&&e!==void 0?e:void 0,selectedSort:this.selectedSort,sortDirection:(t=this.sortDirection)!==null&&t!==void 0?t:void 0,selectedFacets:(i=this.selectedFacets)!==null&&i!==void 0?i:di,baseQuery:this.baseQuery,currentPage:this.currentPage,dateRangeQueryClause:this.dateRangeQueryClause,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:(r=this.selectedTitleFilter)!==null&&r!==void 0?r:void 0,selectedCreatorFilter:(s=this.selectedCreatorFilter)!==null&&s!==void 0?s:void 0};this.restorationStateHandler.persistState(o)}async doInitialPageFetch(){this.searchResultsLoading=!0,await this.fetchPage(this.initialPageNumber),this.searchResultsLoading=!1}get fullQuery(){let{fullQueryWithoutDate:e}=this;const{dateRangeQueryClause:t}=this;return t&&(e+=` AND ${t}`),e}get fullQueryWithoutDate(){if(!this.baseQuery)return;let e=this.baseQuery;const{facetQuery:t,sortFilterQueries:i}=this;return t&&(e+=` AND ${t}`),i&&(e+=` AND ${i}`),e}get facetQuery(){if(!this.selectedFacets)return;const e=[];for(const[t,i]of Object.entries(this.selectedFacets)){const r=Object.entries(i);if(r.length===0)continue;const s=[];for(const[l,d]of r){const h=d==="hidden"?"-":"";if(t==="language"){const p=this.languageCodeHandler.getCodeArrayFromCodeString(l);for(const v of p)s.push(`${h}"${v}"`)}else s.push(`${h}"${l}"`)}const o=s.join(" OR ");e.push(`${t}:(${o})`)}return e.length>0?`(${e.join(" AND ")})`:void 0}facetsChanged(e){this.selectedFacets=e.detail}async fetchFacets(){var e,t;if(!this.fullQuery)return;const i={advancedParams:[{field:"subjectSorter",size:6},{field:"mediatypeSorter",size:6},{field:"languageSorter",size:6},{field:"creatorSorter",size:6},{field:"collection",size:12},{field:"year",size:50}]},r={query:this.fullQuery,fields:["identifier"],aggregations:i,rows:1};this.facetsLoading=!0;const s=await((e=this.searchService)===null||e===void 0?void 0:e.search(r));this.facetsLoading=!1,this.aggregations=(t=s==null?void 0:s.success)===null||t===void 0?void 0:t.response.aggregations}get fullQueryNoDateKey(){var e,t;return`${this.fullQueryWithoutDate}-${(e=this.sortParam)===null||e===void 0?void 0:e.field}-${(t=this.sortParam)===null||t===void 0?void 0:t.direction}`}async fetchFullYearHistogram(){var e,t,i,r;const{fullQueryNoDateKey:s}=this;if(!this.fullQueryWithoutDate||s===this.previousFullQueryNoDate)return;this.previousFullQueryNoDate=s;const o={simpleParams:["year"]},l={query:this.fullQueryWithoutDate,fields:["identifier"],aggregations:o,rows:1};this.fullYearAggregationLoading=!0;const d=await((e=this.searchService)===null||e===void 0?void 0:e.search(l));this.fullYearAggregationLoading=!1,this.fullYearsHistogramAggregation=(r=(i=(t=d==null?void 0:d.success)===null||t===void 0?void 0:t.response)===null||i===void 0?void 0:i.aggregations)===null||r===void 0?void 0:r.year_histogram}scrollToPage(e){const t=this.pageSize*(e-1);setTimeout(()=>{this.isScrollingToCell=!0,this.infiniteScroller.scrollToCell(t,!0),setTimeout(()=>{this.isScrollingToCell=!1,this.infiniteScroller.reload()},500)},0)}get pageFetchQueryKey(){var e,t;return`${this.fullQuery}-${(e=this.sortParam)===null||e===void 0?void 0:e.field}-${(t=this.sortParam)===null||t===void 0?void 0:t.direction}`}async fetchPage(e){var t,i,r,s,o;if(!this.fullQuery||this.dataSource[e]||this.endOfDataReached)return;const{pageFetchQueryKey:l}=this,d=(t=this.pageFetchesInProgress[l])!==null&&t!==void 0?t:new Set;if(d.has(e))return;d.add(e),this.pageFetchesInProgress[l]=d;const h=this.sortParam?[this.sortParam]:[],p={query:this.fullQuery,fields:["addeddate","avg_rating","collections_raw","creator","date","description","downloads","identifier","issue","item_count","mediatype","num_favorites","num_reviews","publicdate","reviewdate","source","subject","title","volume"],page:e,rows:this.pageSize,sort:h},v=await((i=this.searchService)===null||i===void 0?void 0:i.search(p)),f=v==null?void 0:v.success;if(!f)return;this.totalResults=f.response.numFound;const y=f.responseHeader.params.qin,$=f.responseHeader.params.sort;let k=!1;if(!$)this.sortParam&&(k=!0);else if($.split(" ").length>1){const L=$.split(" ")[0],I=$.split(" ")[1];(L!==((r=this.sortParam)===null||r===void 0?void 0:r.field)||I!==((s=this.sortParam)===null||s===void 0?void 0:s.direction))&&(k=!0)}if(y!==this.fullQuery||k)return;const{docs:A}=f.response;A&&A.length>0&&(this.preloadCollectionNames(A),this.updateDataSource(e,A)),A.length<this.pageSize&&(this.endOfDataReached=!0,this.infiniteScroller.itemCount=this.actualTileCount),(o=this.pageFetchesInProgress[l])===null||o===void 0||o.delete(e),this.searchResultsLoading=!1}preloadCollectionNames(e){var t;const i=e.map(s=>{var o;return(o=s.collections_raw)===null||o===void 0?void 0:o.values}).flat(),r=Array.from(new Set(i));(t=this.collectionNameCache)===null||t===void 0||t.preloadIdentifiers(r)}get currentVisiblePageNumbers(){const e=this.infiniteScroller.getVisibleCellIndices(),t=new Set;return e.forEach(i=>{const r=Math.floor(i/this.pageSize)+1;t.add(r)}),Array.from(t)}updateDataSource(e,t){const i=fe({},this.dataSource),r=[];t==null||t.forEach(l=>{var d,h,p,v,f,y,$,k,E,A,N,L,I,Y,se,ge,wt,St,$t,xt,qe,te,Ne,Re,Ct,_t,kt,Xe,Ie,V,Ze,W;if(!l.identifier)return;let Je=!1,U=!1;if(((d=l.collections_raw)===null||d===void 0?void 0:d.values.length)&&((h=l.mediatype)===null||h===void 0?void 0:h.value)!=="collection"){for(const ke of(p=l.collections_raw)===null||p===void 0?void 0:p.values)if(ke==="loggedin"&&(Je=!0,U)||ke==="no-preview"&&(U=!0,Je))break}r.push({averageRating:(v=l.avg_rating)===null||v===void 0?void 0:v.value,collections:(y=(f=l.collections_raw)===null||f===void 0?void 0:f.values)!==null&&y!==void 0?y:[],commentCount:(k=($=l.num_reviews)===null||$===void 0?void 0:$.value)!==null&&k!==void 0?k:0,creator:(E=l.creator)===null||E===void 0?void 0:E.value,creators:(N=(A=l.creator)===null||A===void 0?void 0:A.values)!==null&&N!==void 0?N:[],dateAdded:(L=l.addeddate)===null||L===void 0?void 0:L.value,dateArchived:(I=l.publicdate)===null||I===void 0?void 0:I.value,datePublished:(Y=l.date)===null||Y===void 0?void 0:Y.value,dateReviewed:(se=l.reviewdate)===null||se===void 0?void 0:se.value,description:(ge=l.description)===null||ge===void 0?void 0:ge.value,favCount:(St=(wt=l.num_favorites)===null||wt===void 0?void 0:wt.value)!==null&&St!==void 0?St:0,identifier:l.identifier,issue:($t=l.issue)===null||$t===void 0?void 0:$t.value,itemCount:(qe=(xt=l.item_count)===null||xt===void 0?void 0:xt.value)!==null&&qe!==void 0?qe:0,mediatype:(Ne=(te=l.mediatype)===null||te===void 0?void 0:te.value)!==null&&Ne!==void 0?Ne:"data",source:(Re=l.source)===null||Re===void 0?void 0:Re.value,subjects:(_t=(Ct=l.subject)===null||Ct===void 0?void 0:Ct.values)!==null&&_t!==void 0?_t:[],title:this.etreeTitle((kt=l.title)===null||kt===void 0?void 0:kt.value,(Xe=l.mediatype)===null||Xe===void 0?void 0:Xe.value,(Ie=l.collection)===null||Ie===void 0?void 0:Ie.values),volume:(V=l.volume)===null||V===void 0?void 0:V.value,viewCount:(W=(Ze=l.downloads)===null||Ze===void 0?void 0:Ze.value)!==null&&W!==void 0?W:0,loginRequired:Je,contentWarning:U})}),i[e]=r,this.dataSource=i,this.currentVisiblePageNumbers.includes(e)&&this.infiniteScroller.reload()}etreeTitle(e,t,i){if(t==="etree"||(i==null?void 0:i.includes("etree"))){const r=/^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/,s=e==null?void 0:e.replace(r,"$3: $2");if(s)return`${s}`}return e!=null?e:""}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(!!t)return m` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .baseImageUrl=${this.baseImageUrl}
      .model=${t}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`}scrollThresholdReached(){this.pagesToRender+=1,this.fetchPage(this.pagesToRender)}};T.styles=b`
    :host {
      display: block;
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

    .collapser {
      display: inline-block;
    }

    .collapser svg {
      width: 10px;
      height: 10px;
      transition: transform 0.2s ease-out;
    }

    .collapser.open svg {
      transform: rotate(90deg);
    }

    #mobile-filter-collapse h1 {
      cursor: pointer;
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
      padding-left: 1rem;
    }

    .mobile #right-column {
      border-left: none;
      padding: 0;
    }

    #left-column {
      width: 18rem;
      padding-right: 12px;
      padding-right: 1rem;
    }

    .mobile #left-column {
      width: 100%;
      padding: 0;
    }

    #mobile-header-container {
      display: flex;
      justify-content: space-between;
    }

    #facets-container {
      position: relative;
      max-height: 0;
      transition: max-height 0.2s ease-in-out;
      z-index: 1;
    }

    .mobile #facets-container {
      overflow: hidden;
    }

    #facets-container.expanded {
      max-height: 2000px;
    }

    #results-total {
      display: flex;
      align-items: center;
      margin-bottom: 5rem;
    }

    .mobile #results-total {
      margin-bottom: 0;
    }

    #big-results-count {
      font-size: 2.4rem;
      font-weight: 500;
      margin-right: 5px;
    }

    #big-results-label {
      font-size: 1rem;
      font-weight: 200;
      text-transform: uppercase;
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
        18rem
      );
      --infiniteScrollerCellMaxWidth: var(--collectionBrowserCellMaxWidth, 1fr);
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        29rem
      );
      --infiniteScrollerCellMaxHeight: var(
        --collectionBrowserCellMaxHeight,
        29rem
      );
    }
  `;n([u({type:String})],T.prototype,"baseNavigationUrl",void 0);n([u({type:String})],T.prototype,"baseImageUrl",void 0);n([u({type:Object})],T.prototype,"searchService",void 0);n([u({type:String})],T.prototype,"baseQuery",void 0);n([u({type:String})],T.prototype,"displayMode",void 0);n([u({type:Object})],T.prototype,"sortParam",void 0);n([u({type:String})],T.prototype,"selectedSort",void 0);n([u({type:String})],T.prototype,"selectedTitleFilter",void 0);n([u({type:String})],T.prototype,"selectedCreatorFilter",void 0);n([u({type:String})],T.prototype,"sortDirection",void 0);n([u({type:String})],T.prototype,"dateRangeQueryClause",void 0);n([u({type:Number})],T.prototype,"pageSize",void 0);n([u({type:Object})],T.prototype,"resizeObserver",void 0);n([u({type:String})],T.prototype,"titleQuery",void 0);n([u({type:String})],T.prototype,"creatorQuery",void 0);n([u({type:Number})],T.prototype,"currentPage",void 0);n([u({type:String})],T.prototype,"minSelectedDate",void 0);n([u({type:String})],T.prototype,"maxSelectedDate",void 0);n([u({type:Object})],T.prototype,"selectedFacets",void 0);n([u({type:Boolean})],T.prototype,"showHistogramDatePicker",void 0);n([u({type:Object})],T.prototype,"collectionNameCache",void 0);n([u({type:String})],T.prototype,"pageContext",void 0);n([u({type:Object})],T.prototype,"restorationStateHandler",void 0);n([u({type:Number})],T.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],T.prototype,"loggedIn",void 0);n([u({type:Boolean})],T.prototype,"isManageView",void 0);n([D()],T.prototype,"pagesToRender",void 0);n([D()],T.prototype,"searchResultsLoading",void 0);n([D()],T.prototype,"facetsLoading",void 0);n([D()],T.prototype,"fullYearAggregationLoading",void 0);n([D()],T.prototype,"aggregations",void 0);n([D()],T.prototype,"fullYearsHistogramAggregation",void 0);n([D()],T.prototype,"totalResults",void 0);n([D()],T.prototype,"mobileView",void 0);n([D()],T.prototype,"mobileFacetsVisible",void 0);n([le("#content-container")],T.prototype,"contentContainer",void 0);n([le("infinite-scroller")],T.prototype,"infiniteScroller",void 0);T=n([Q("collection-browser")],T);let ne=class extends B{constructor(){super(...arguments),this.searchService=qi.default,this.resizeObserver=new Vs,this.localCache=new Fs,this.collectionNameCache=new Ws({searchService:this.searchService,localCache:this.localCache}),this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.loggedIn=!1}searchPressed(e){var t,i;e.preventDefault(),this.searchQuery=this.baseQueryField.value,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.collectionBrowser.goToPage((i=this.currentPage)!==null&&i!==void 0?i:1)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}render(){var e;return m`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input
            type="text"
            id="base-query-field"
            .value=${(e=this.searchQuery)!==null&&e!==void 0?e:""}
          />
          <input type="submit" value="Search" />
        </form>

        <form @submit=${this.changePagePressed}>
          Page: <input type="number" value="1" id="page-number-input" />
          <input type="submit" value="Go" />
        </form>

        <div id="cell-controls">
          <div id="cell-size-control">
            <div>
              <label for="cell-width-slider">Minimum cell width:</label>
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
              <label for="show-outline-check">Show outlines:</label>
              <input
                type="checkbox"
                id="show-outline-check"
                @click=${this.outlineChanged}
              />
            </div>
            <div>
              <label for="simulate-login">Simulate Login:</label>
              <input
                type="checkbox"
                id="simulate-login"
                @click=${this.loginChanged}
              />
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
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
        >
        </collection-browser>
      </div>
    `}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}};ne.styles=b`
    :host {
      display: block;
    }

    input,
    button {
      font-size: 1.6rem;
    }

    collection-browser {
      margin-top: 30rem;
    }

    #base-query-field {
      width: 300px;
    }

    #dev-tools {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 10;
      -webkit-backdrop-filter: blur(10px);
      backdrop-filter: blur(10px);
      padding: 0.5rem 1rem;
      border: 1px solid black;
    }

    #cell-controls {
      display: flex;
    }

    #cell-controls label {
      display: inline-block;
      width: 10rem;
    }

    #cell-gap-control {
      margin-left: 1rem;
    }
  `;n([D()],ne.prototype,"currentPage",void 0);n([D()],ne.prototype,"searchQuery",void 0);n([D()],ne.prototype,"cellWidth",void 0);n([D()],ne.prototype,"cellHeight",void 0);n([D()],ne.prototype,"rowGap",void 0);n([D()],ne.prototype,"colGap",void 0);n([D()],ne.prototype,"loggedIn",void 0);n([le("#base-query-field")],ne.prototype,"baseQueryField",void 0);n([le("#page-number-input")],ne.prototype,"pageNumberInput",void 0);n([le("collection-browser")],ne.prototype,"collectionBrowser",void 0);ne=n([Q("app-root")],ne);
