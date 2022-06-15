var Ao=Object.defineProperty,Mo=Object.defineProperties;var Lo=Object.getOwnPropertyDescriptors;var cr=Object.getOwnPropertySymbols;var Eo=Object.prototype.hasOwnProperty,Oo=Object.prototype.propertyIsEnumerable;var hr=(o,e,t)=>e in o?Ao(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,ae=(o,e)=>{for(var t in e||(e={}))Eo.call(e,t)&&hr(o,t,e[t]);if(cr)for(var t of cr(e))Oo.call(e,t)&&hr(o,t,e[t]);return o},mt=(o,e)=>Mo(o,Lo(e));const zo=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=t(r);fetch(r.href,a)}};zo();function n(o,e,t,i){var r=arguments.length,a=r<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,s;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")a=Reflect.decorate(o,e,t,i);else for(var l=o.length-1;l>=0;l--)(s=o[l])&&(a=(r<3?s(a):r>3?s(e,t,a):s(e,t))||a);return r>3&&a&&Object.defineProperty(e,t,a),a}function Fo(o,e,t,i){function r(a){return a instanceof t?a:new t(function(s){s(a)})}return new(t||(t=Promise))(function(a,s){function l(v){try{h(i.next(v))}catch(g){s(g)}}function c(v){try{h(i.throw(v))}catch(g){s(g)}}function h(v){v.done?a(v.value):r(v.value).then(l,c)}h((i=i.apply(o,e||[])).next())})}function y(o){let e,t,i;return typeof o=="object"?(e=o.hashFunction,t=o.expiring,i=o.tags):e=o,(r,a,s)=>{if(s.value!=null)s.value=ur(s.value,e,t,i);else if(s.get!=null)s.get=ur(s.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const ni=new Map;function ur(o,e,t=0,i){const r=Symbol("__memoized_map__");return function(...a){let s;this.hasOwnProperty(r)||Object.defineProperty(this,r,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[r];if(Array.isArray(i))for(const c of i)ni.has(c)?ni.get(c).push(l):ni.set(c,[l]);if(e||a.length>0||t>0){let c;e===!0?c=a.map(g=>g.toString()).join("!"):e?c=e.apply(this,a):c=a[0];const h=`${c}__timestamp`;let v=!1;if(t>0)if(!l.has(h))v=!0;else{let g=l.get(h);v=Date.now()-g>t}l.has(c)&&!v?s=l.get(c):(s=o.apply(this,a),l.set(c,s),t>0&&l.set(h,Date.now()))}else{const c=this;l.has(c)?s=l.get(c):(s=o.apply(this,a),l.set(c,s))}return s}}class $i{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:Boolean(e)}}$i.shared=new $i;class $e{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}$e.shared=new $e;class Ht{parseValue(e){return $e.shared.parseValue(e)}}Ht.shared=new Ht;class xt{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let r=new Date(t);return(t.indexOf("Z")>-1||t.indexOf("+")>-1||t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)||t.match(/^.*?-[0-9]{2}:[0-9]{2}$/)||t.match(/^.*?-[0-9]{4}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}}xt.shared=new xt;class Ut{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((r,a)=>{const s=parseFloat(r);if(Number.isNaN(s))return t=!0,0;const l=e.length-1-a,c=60**l;return s*Math.floor(c)}).reduce((r,a)=>r+a,0);return t?void 0:i}}Ut.shared=new Ut;class ki{parseValue(e){if(typeof e=="string")return e}}ki.shared=new ki;class Po{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const r of this.separators)if(i=t.split(r),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(a=>a.trim()).map(a=>this.parser.parseValue(a)),r=[];return i.forEach(a=>{a!==void 0&&r.push(a)}),r}}class _i{parseValue(e){if(typeof e=="string")return e}}_i.shared=new _i;class jt{parseValue(e){return String(e)}}jt.shared=new jt;class de{constructor(e,t){this.parser=e,this.rawValue=t}get values(){return this.parseRawValue()}get value(){return this.values[0]}parseRawValue(){if(this.rawValue===void 0)return[];const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const r=this.parser.parseValue(i);Array.isArray(r)?t.push(...r):r!==void 0&&t.push(r)}),t}}n([y()],de.prototype,"values",null);n([y()],de.prototype,"value",null);class No extends de{constructor(e){super($i.shared,e)}}class me extends de{constructor(e){super(xt.shared,e)}}class li extends de{constructor(e){super(Ut.shared,e)}}class re extends de{constructor(e){super($e.shared,e)}}class F extends de{constructor(e){super(jt.shared,e)}}class Ro extends de{constructor(e){super(_i.shared,e)}}class pr extends de{constructor(e){super(Ht.shared,e)}}class Io extends de{constructor(e){super(ki.shared,e)}}class Do extends de{constructor(e,t){super(t,e)}}class Bo extends Do{constructor(e){const t=new Po(jt.shared);super(e,t)}}class C{constructor(e){this.rawMetadata=e}get identifier(){var e;return(e=this.rawMetadata)===null||e===void 0?void 0:e.identifier}get addeddate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.addeddate?new me(this.rawMetadata.addeddate):void 0}get audio_codec(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_codec?new F(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.audio_sample_rate?new re(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.avg_rating?new re(this.rawMetadata.avg_rating):void 0}get collection(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection?new F(this.rawMetadata.collection):void 0}get collections_raw(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collections_raw?new F(this.rawMetadata.collections_raw):void 0}get collection_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.collection_size?new pr(this.rawMetadata.collection_size):void 0}get contributor(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.contributor?new F(this.rawMetadata.contributor):void 0}get coverage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.coverage?new F(this.rawMetadata.coverage):void 0}get creator(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.creator?new F(this.rawMetadata.creator):void 0}get date(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.date?new me(this.rawMetadata.date):void 0}get description(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.description?new F(this.rawMetadata.description):void 0}get downloads(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.downloads?new re(this.rawMetadata.downloads):void 0}get duration(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.duration?new li(this.rawMetadata.duration):void 0}get"external-identifier"(){var e,t;return!((e=this.rawMetadata)===null||e===void 0)&&e["external-identifier"]?new F((t=this.rawMetadata)===null||t===void 0?void 0:t["external-identifier"]):void 0}get files_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.files_count?new re(this.rawMetadata.files_count):void 0}get indexdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.indexdate?new me(this.rawMetadata.indexdate):void 0}get isbn(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.isbn?new F(this.rawMetadata.isbn):void 0}get issue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.issue?new F(this.rawMetadata.issue):void 0}get item_count(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_count?new re(this.rawMetadata.item_count):void 0}get item_size(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.item_size?new pr(this.rawMetadata.item_size):void 0}get language(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.language?new F(this.rawMetadata.language):void 0}get length(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.length?new li(this.rawMetadata.length):void 0}get lineage(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.lineage?new F(this.rawMetadata.lineage):void 0}get month(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.month?new re(this.rawMetadata.month):void 0}get mediatype(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.mediatype?new Io(this.rawMetadata.mediatype):void 0}get noindex(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.noindex?new No(this.rawMetadata.noindex):void 0}get notes(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.notes?new F(this.rawMetadata.notes):void 0}get num_favorites(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_favorites?new re(this.rawMetadata.num_favorites):void 0}get num_reviews(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.num_reviews?new re(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_edition?new F(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.openlibrary_work?new F(this.rawMetadata.openlibrary_work):void 0}get page_progression(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.page_progression?new Ro(this.rawMetadata.page_progression):void 0}get partner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.partner?new F(this.rawMetadata.partner):void 0}get ppi(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.ppi?new re(this.rawMetadata.ppi):void 0}get publicdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publicdate?new me(this.rawMetadata.publicdate):void 0}get publisher(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.publisher?new F(this.rawMetadata.publisher):void 0}get reviewdate(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.reviewdate?new me(this.rawMetadata.reviewdate):void 0}get runtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.runtime?new li(this.rawMetadata.runtime):void 0}get scanner(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.scanner?new F(this.rawMetadata.scanner):void 0}get source(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.source?new F(this.rawMetadata.source):void 0}get start_localtime(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_localtime?new me(this.rawMetadata.start_localtime):void 0}get start_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.start_time?new me(this.rawMetadata.start_time):void 0}get stop_time(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.stop_time?new me(this.rawMetadata.stop_time):void 0}get subject(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.subject?new Bo(this.rawMetadata.subject):void 0}get taper(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.taper?new F(this.rawMetadata.taper):void 0}get title(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.title?new F(this.rawMetadata.title):void 0}get transferer(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.transferer?new F(this.rawMetadata.transferer):void 0}get track(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.track?new re(this.rawMetadata.track):void 0}get type(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.type?new F(this.rawMetadata.type):void 0}get uploader(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.uploader?new F(this.rawMetadata.uploader):void 0}get utc_offset(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.utc_offset?new re(this.rawMetadata.utc_offset):void 0}get venue(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.venue?new F(this.rawMetadata.venue):void 0}get volume(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.volume?new F(this.rawMetadata.volume):void 0}get week(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.week?new re(this.rawMetadata.week):void 0}get year(){var e;return!((e=this.rawMetadata)===null||e===void 0)&&e.year?new me(this.rawMetadata.year):void 0}}n([y()],C.prototype,"addeddate",null);n([y()],C.prototype,"audio_codec",null);n([y()],C.prototype,"audio_sample_rate",null);n([y()],C.prototype,"avg_rating",null);n([y()],C.prototype,"collection",null);n([y()],C.prototype,"collections_raw",null);n([y()],C.prototype,"collection_size",null);n([y()],C.prototype,"contributor",null);n([y()],C.prototype,"coverage",null);n([y()],C.prototype,"creator",null);n([y()],C.prototype,"date",null);n([y()],C.prototype,"description",null);n([y()],C.prototype,"downloads",null);n([y()],C.prototype,"duration",null);n([y()],C.prototype,"external-identifier",null);n([y()],C.prototype,"files_count",null);n([y()],C.prototype,"indexdate",null);n([y()],C.prototype,"isbn",null);n([y()],C.prototype,"issue",null);n([y()],C.prototype,"item_count",null);n([y()],C.prototype,"item_size",null);n([y()],C.prototype,"language",null);n([y()],C.prototype,"length",null);n([y()],C.prototype,"lineage",null);n([y()],C.prototype,"month",null);n([y()],C.prototype,"mediatype",null);n([y()],C.prototype,"noindex",null);n([y()],C.prototype,"notes",null);n([y()],C.prototype,"num_favorites",null);n([y()],C.prototype,"num_reviews",null);n([y()],C.prototype,"openlibrary_edition",null);n([y()],C.prototype,"openlibrary_work",null);n([y()],C.prototype,"page_progression",null);n([y()],C.prototype,"partner",null);n([y()],C.prototype,"ppi",null);n([y()],C.prototype,"publicdate",null);n([y()],C.prototype,"publisher",null);n([y()],C.prototype,"reviewdate",null);n([y()],C.prototype,"runtime",null);n([y()],C.prototype,"scanner",null);n([y()],C.prototype,"source",null);n([y()],C.prototype,"start_localtime",null);n([y()],C.prototype,"start_time",null);n([y()],C.prototype,"stop_time",null);n([y()],C.prototype,"subject",null);n([y()],C.prototype,"taper",null);n([y()],C.prototype,"title",null);n([y()],C.prototype,"transferer",null);n([y()],C.prototype,"track",null);n([y()],C.prototype,"type",null);n([y()],C.prototype,"uploader",null);n([y()],C.prototype,"utc_offset",null);n([y()],C.prototype,"venue",null);n([y()],C.prototype,"volume",null);n([y()],C.prototype,"week",null);n([y()],C.prototype,"year",null);class rt{constructor(e){this.rawValue=e}get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){return this.rawValue.mtime}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size?Ht.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length?Ut.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height?$e.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width?$e.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track?$e.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}}n([y()],rt.prototype,"size",null);n([y()],rt.prototype,"length",null);n([y()],rt.prototype,"height",null);n([y()],rt.prototype,"width",null);n([y()],rt.prototype,"track",null);class Kt{constructor(e){this.rawValue=e}get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewdate(){return this.rawValue.reviewdate?xt.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate?xt.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars?$e.shared.parseValue(this.rawValue.stars):void 0}}n([y()],Kt.prototype,"reviewdate",null);n([y()],Kt.prototype,"createdate",null);n([y()],Kt.prototype,"stars",null);class Ho{constructor(e){var t,i;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=(t=e.files)===null||t===void 0?void 0:t.map(r=>new rt(r)),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new C(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=(i=e.reviews)===null||i===void 0?void 0:i.map(r=>new Kt(r))}}class Uo{constructor(e){this.numFound=e.numFound,this.start=e.start,this.docs=e.docs.map(t=>new C(t)),this.aggregations=e.aggregations}}class jo{constructor(e){this.rawResponse=e,this.responseHeader=e.responseHeader,this.response=new Uo(e.response)}}var Re;(function(o){o.networkError="SearchService.NetworkError",o.itemNotFound="SearchService.ItemNotFound",o.decodingError="SearchService.DecodingError",o.searchEngineError="SearchService.SearchEngineError"})(Re||(Re={}));class Ti extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}class Vo{static aggregateSearchParamsAsString(e){if(e.advancedParams){const t=e.advancedParams.map(r=>({terms:r}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field} ${e.direction}`}static generateURLSearchParams(e){const t=new URLSearchParams;if(t.append("q",e.query),t.append("output","json"),e.rows&&t.append("rows",String(e.rows)),e.page&&t.append("page",String(e.page)),e.fields&&t.append("fl",e.fields.join(",")),e.sort){const r=e.sort.map(a=>this.sortParamsAsString(a));t.append("sort",r.join(","))}const i=e.aggregations;if(i){const r=this.aggregateSearchParamsAsString(i);r&&t.append("user_aggs",r)}return t}}class Wo{constructor(e){var t;if(this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null,(e==null?void 0:e.scope)!==void 0)this.requestScope=e.scope;else{const r=new URL(window.location.href).searchParams.get("scope");r&&(this.requestScope=r)}}async performSearch(e){const i=Vo.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}/advancedsearch.php?${i}`;return this.fetchUrl(r)}async fetchMetadata(e,t){const i=t?`/${t}`:"",r=`https://${this.baseUrl}/metadata/${e}${i}`;return this.fetchUrl(r,{requestOptions:{credentials:"omit"}})}async fetchUrl(e,t){var i;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope);let a;try{const s=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(r.href,s)}catch(s){const l=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(Re.networkError,l)}try{const s=await a.json(),l=s.error;if(l){const c=s.forensics;return this.getErrorResult(Re.searchEngineError,l,c)}else return{success:s}}catch(s){const l=s instanceof Error?s.message:typeof s=="string"?s:"Unknown error";return this.getErrorResult(Re.decodingError,l)}}getErrorResult(e,t,i){return{error:new Ti(e,t,i)}}}class Ai{constructor(e){this.searchBackend=e}async search(e){const t=await this.searchBackend.performSearch(e);return t.error?t:{success:new jo(t.success)}}async fetchMetadata(e){var t;const i=await this.searchBackend.fetchMetadata(e);return i.error?i:((t=i.success)===null||t===void 0?void 0:t.metadata)===void 0?{error:new Ti(Re.itemNotFound)}:{success:new Ho(i.success)}}async fetchMetadataValue(e,t){var i;const r=await this.searchBackend.fetchMetadata(e,t);return r.error?r:((i=r.success)===null||i===void 0?void 0:i.result)===void 0?{error:new Ti(Re.itemNotFound)}:{success:r.success.result}}}Ai.default=new Ai(new Wo);function Qo(){var o=!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent);if(!o||!indexedDB.databases)return Promise.resolve();var e;return new Promise(function(t){var i=function(){return indexedDB.databases().finally(t)};e=setInterval(i,100),i()}).finally(function(){return clearInterval(e)})}function ot(o){return new Promise((e,t)=>{o.oncomplete=o.onsuccess=()=>e(o.result),o.onabort=o.onerror=()=>t(o.error)})}function Go(o,e){const t=Qo().then(()=>{const i=indexedDB.open(o);return i.onupgradeneeded=()=>i.result.createObjectStore(e),ot(i)});return(i,r)=>t.then(a=>r(a.transaction(e,i).objectStore(e)))}let di;function qt(){return di||(di=Go("keyval-store","keyval")),di}function Ko(o,e=qt()){return e("readonly",t=>ot(t.get(o)))}function qo(o,e,t=qt()){return t("readwrite",i=>(i.put(e,o),ot(i.transaction)))}function Yo(o,e=qt()){return e("readwrite",t=>(t.delete(o),ot(t.transaction)))}function Zo(o,e){return o.openCursor().onsuccess=function(){!this.result||(e(this.result),this.result.continue())},ot(o.transaction)}function Xo(o=qt()){return o("readonly",e=>{if(e.getAllKeys)return ot(e.getAllKeys());const t=[];return Zo(e,i=>t.push(i.key)).then(()=>t)})}function Jo(o,e){return o.setMilliseconds(o.getMilliseconds()+e*1e3),o}class ea{constructor(e){var t,i,r,a;if(this.namespace=(t=e==null?void 0:e.namespace)!==null&&t!==void 0?t:"LocalCache",this.defaultTTL=(i=e==null?void 0:e.defaultTTL)!==null&&i!==void 0?i:15*60,(!((r=e==null?void 0:e.immediateClean)!==null&&r!==void 0)||r)&&this.cleanExpired(),!(e!=null&&e.disableCleaning)){const s=(a=e==null?void 0:e.cleaningInterval)!==null&&a!==void 0?a:60;setInterval(()=>{this.cleanExpired()},s*1e3)}}async set(e){var t;const i={value:e.value},r=(t=e.ttl)!==null&&t!==void 0?t:this.defaultTTL,a=Jo(new Date,r);i.expires=a;const s=this.getNamespacedKey(e.key);try{await qo(s,i)}catch{}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await Ko(t)}catch{}if(!i)return;const r=new Date;if(i.expires&&i.expires<r){await this.delete(e);return}return i.value}async delete(e){const t=this.getNamespacedKey(e);try{await Yo(t)}catch{}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map(async t=>this.get(t)))}async getAllKeys(){let e=[];try{e=await Xo()}catch{}const t=[];for(const a of e)typeof a=="string"&&t.push(a);return t.filter(a=>a.startsWith(this.namespace)).map(a=>this.removeNamespace(a))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Di=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Bi=Symbol(),vr=new Map;class Wr{constructor(e,t){if(this._$cssResult$=!0,t!==Bi)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=vr.get(this.cssText);return Di&&e===void 0&&(vr.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const ta=o=>new Wr(typeof o=="string"?o:o+"",Bi),f=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,r,a)=>i+(s=>{if(s._$cssResult$===!0)return s.cssText;if(typeof s=="number")return s;throw Error("Value passed to 'css' function must be a 'css' function result: "+s+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+o[a+1],o[0]);return new Wr(t,Bi)},ia=(o,e)=>{Di?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),r=window.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=t.cssText,o.appendChild(i)})},mr=Di?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return ta(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ci;const gr=window.trustedTypes,ra=gr?gr.emptyScript:"",fr=window.reactiveElementPolyfillSupport,Mi={toAttribute(o,e){switch(e){case Boolean:o=o?ra:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},Qr=(o,e)=>e!==o&&(e==e||o==o),hi={attribute:!0,type:String,converter:Mi,reflect:!1,hasChanged:Qr};class Ze extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;(t=this.l)!==null&&t!==void 0||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const r=this._$Eh(i,t);r!==void 0&&(this._$Eu.set(r,i),e.push(r))}),e}static createProperty(e,t=hi){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const a=this[e];this[t]=r,this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||hi}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of i)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const r of i)t.unshift(mr(r))}else e!==void 0&&t.push(mr(e));return t}static _$Eh(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Em(),this.requestUpdate(),(e=this.constructor.l)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$Eg)!==null&&t!==void 0?t:this._$Eg=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$Eg)===null||t===void 0||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return ia(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$Eg)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=hi){var r,a;const s=this.constructor._$Eh(e,i);if(s!==void 0&&i.reflect===!0){const l=((a=(r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==null&&a!==void 0?a:Mi.toAttribute)(t,i.type);this._$Ei=e,l==null?this.removeAttribute(s):this.setAttribute(s,l),this._$Ei=null}}_$AK(e,t){var i,r,a;const s=this.constructor,l=s._$Eu.get(e);if(l!==void 0&&this._$Ei!==l){const c=s.getPropertyOptions(l),h=c.converter,v=(a=(r=(i=h)===null||i===void 0?void 0:i.fromAttribute)!==null&&r!==void 0?r:typeof h=="function"?h:null)!==null&&a!==void 0?a:Mi.fromAttribute;this._$Ei=l,this[l]=v(t,c.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Qr)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Ei!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((r,a)=>this[a]=r),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$Eg)===null||e===void 0||e.forEach(r=>{var a;return(a=r.hostUpdate)===null||a===void 0?void 0:a.call(r)}),this.update(i)):this._$EU()}catch(r){throw t=!1,this._$EU(),r}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$Eg)===null||t===void 0||t.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$ES(i,this[i],t)),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Ze.finalized=!0,Ze.elementProperties=new Map,Ze.elementStyles=[],Ze.shadowRootOptions={mode:"open"},fr==null||fr({ReactiveElement:Ze}),((ci=globalThis.reactiveElementVersions)!==null&&ci!==void 0?ci:globalThis.reactiveElementVersions=[]).push("1.3.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ui;const Je=globalThis.trustedTypes,br=Je?Je.createPolicy("lit-html",{createHTML:o=>o}):void 0,ge=`lit$${(Math.random()+"").slice(9)}$`,Hi="?"+ge,oa=`<${Hi}>`,et=document,St=(o="")=>et.createComment(o),$t=o=>o===null||typeof o!="object"&&typeof o!="function",Gr=Array.isArray,Kr=o=>{var e;return Gr(o)||typeof((e=o)===null||e===void 0?void 0:e[Symbol.iterator])=="function"},gt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,yr=/-->/g,wr=/>/g,Oe=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Cr=/'/g,xr=/"/g,qr=/^(?:script|style|textarea|title)$/i,Yr=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),p=Yr(1),z=Yr(2),ke=Symbol.for("lit-noChange"),k=Symbol.for("lit-nothing"),Sr=new WeakMap,It=(o,e,t)=>{var i,r;const a=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let s=a._$litPart$;if(s===void 0){const l=(r=t==null?void 0:t.renderBefore)!==null&&r!==void 0?r:null;a._$litPart$=s=new at(e.insertBefore(St(),l),l,void 0,t!=null?t:{})}return s._$AI(o),s},Xe=et.createTreeWalker(et,129,null,!1),Zr=(o,e)=>{const t=o.length-1,i=[];let r,a=e===2?"<svg>":"",s=gt;for(let c=0;c<t;c++){const h=o[c];let v,g,b=-1,S=0;for(;S<h.length&&(s.lastIndex=S,g=s.exec(h),g!==null);)S=s.lastIndex,s===gt?g[1]==="!--"?s=yr:g[1]!==void 0?s=wr:g[2]!==void 0?(qr.test(g[2])&&(r=RegExp("</"+g[2],"g")),s=Oe):g[3]!==void 0&&(s=Oe):s===Oe?g[0]===">"?(s=r!=null?r:gt,b=-1):g[1]===void 0?b=-2:(b=s.lastIndex-g[2].length,v=g[1],s=g[3]===void 0?Oe:g[3]==='"'?xr:Cr):s===xr||s===Cr?s=Oe:s===yr||s===wr?s=gt:(s=Oe,r=void 0);const $=s===Oe&&o[c+1].startsWith("/>")?" ":"";a+=s===gt?h+oa:b>=0?(i.push(v),h.slice(0,b)+"$lit$"+h.slice(b)+ge+$):h+ge+(b===-2?(i.push(void 0),c):$)}const l=a+(o[t]||"<?>")+(e===2?"</svg>":"");if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return[br!==void 0?br.createHTML(l):l,i]};class kt{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let a=0,s=0;const l=e.length-1,c=this.parts,[h,v]=Zr(e,t);if(this.el=kt.createElement(h,i),Xe.currentNode=this.el.content,t===2){const g=this.el.content,b=g.firstChild;b.remove(),g.append(...b.childNodes)}for(;(r=Xe.nextNode())!==null&&c.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const g=[];for(const b of r.getAttributeNames())if(b.endsWith("$lit$")||b.startsWith(ge)){const S=v[s++];if(g.push(b),S!==void 0){const $=r.getAttribute(S.toLowerCase()+"$lit$").split(ge),T=/([.?@])?(.*)/.exec(S);c.push({type:1,index:a,name:T[2],strings:$,ctor:T[1]==="."?Jr:T[1]==="?"?eo:T[1]==="@"?to:Mt})}else c.push({type:6,index:a})}for(const b of g)r.removeAttribute(b)}if(qr.test(r.tagName)){const g=r.textContent.split(ge),b=g.length-1;if(b>0){r.textContent=Je?Je.emptyScript:"";for(let S=0;S<b;S++)r.append(g[S],St()),Xe.nextNode(),c.push({type:2,index:++a});r.append(g[b],St())}}}else if(r.nodeType===8)if(r.data===Hi)c.push({type:2,index:a});else{let g=-1;for(;(g=r.data.indexOf(ge,g+1))!==-1;)c.push({type:7,index:a}),g+=ge.length-1}a++}}static createElement(e,t){const i=et.createElement("template");return i.innerHTML=e,i}}function De(o,e,t=o,i){var r,a,s,l;if(e===ke)return e;let c=i!==void 0?(r=t._$Cl)===null||r===void 0?void 0:r[i]:t._$Cu;const h=$t(e)?void 0:e._$litDirective$;return(c==null?void 0:c.constructor)!==h&&((a=c==null?void 0:c._$AO)===null||a===void 0||a.call(c,!1),h===void 0?c=void 0:(c=new h(o),c._$AT(o,t,i)),i!==void 0?((s=(l=t)._$Cl)!==null&&s!==void 0?s:l._$Cl=[])[i]=c:t._$Cu=c),c!==void 0&&(e=De(o,c._$AS(o,e.values),c,i)),e}class Xr{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,a=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:et).importNode(i,!0);Xe.currentNode=a;let s=Xe.nextNode(),l=0,c=0,h=r[0];for(;h!==void 0;){if(l===h.index){let v;h.type===2?v=new at(s,s.nextSibling,this,e):h.type===1?v=new h.ctor(s,h.name,h.strings,this,e):h.type===6&&(v=new io(s,this,e)),this.v.push(v),h=r[++c]}l!==(h==null?void 0:h.index)&&(s=Xe.nextNode(),l++)}return a}m(e){let t=0;for(const i of this.v)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class at{constructor(e,t,i,r){var a;this.type=2,this._$AH=k,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=(a=r==null?void 0:r.isConnected)===null||a===void 0||a}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=De(this,e,t),$t(e)?e===k||e==null||e===""?(this._$AH!==k&&this._$AR(),this._$AH=k):e!==this._$AH&&e!==ke&&this.$(e):e._$litType$!==void 0?this.T(e):e.nodeType!==void 0?this.k(e):Kr(e)?this.S(e):this.$(e)}M(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.M(e))}$(e){this._$AH!==k&&$t(this._$AH)?this._$AA.nextSibling.data=e:this.k(et.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=kt.createElement(r.h,this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===a)this._$AH.m(i);else{const s=new Xr(a,this),l=s.p(this.options);s.m(i),this.k(l),this._$AH=s}}_$AC(e){let t=Sr.get(e.strings);return t===void 0&&Sr.set(e.strings,t=new kt(e)),t}S(e){Gr(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const a of e)r===t.length?t.push(i=new at(this.M(St()),this.M(St()),this,this.options)):i=t[r],i._$AI(a),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cg=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Mt{constructor(e,t,i,r,a){this.type=1,this._$AH=k,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=a,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=k}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const a=this.strings;let s=!1;if(a===void 0)e=De(this,e,t,0),s=!$t(e)||e!==this._$AH&&e!==ke,s&&(this._$AH=e);else{const l=e;let c,h;for(e=a[0],c=0;c<a.length-1;c++)h=De(this,l[i+c],t,c),h===ke&&(h=this._$AH[c]),s||(s=!$t(h)||h!==this._$AH[c]),h===k?e=k:e!==k&&(e+=(h!=null?h:"")+a[c+1]),this._$AH[c]=h}s&&!r&&this.C(e)}C(e){e===k?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e!=null?e:"")}}class Jr extends Mt{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===k?void 0:e}}const aa=Je?Je.emptyScript:"";class eo extends Mt{constructor(){super(...arguments),this.type=4}C(e){e&&e!==k?this.element.setAttribute(this.name,aa):this.element.removeAttribute(this.name)}}class to extends Mt{constructor(e,t,i,r,a){super(e,t,i,r,a),this.type=5}_$AI(e,t=this){var i;if((e=(i=De(this,e,t,0))!==null&&i!==void 0?i:k)===ke)return;const r=this._$AH,a=e===k&&r!==k||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,s=e!==k&&(r===k||a);a&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class io{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){De(this,e)}}const sa={L:"$lit$",P:ge,V:Hi,I:1,N:Zr,R:Xr,j:Kr,D:De,H:at,F:Mt,O:eo,W:to,B:Jr,Z:io},$r=window.litHtmlPolyfillSupport;$r==null||$r(kt,at),((ui=globalThis.litHtmlVersions)!==null&&ui!==void 0?ui:globalThis.litHtmlVersions=[]).push("2.2.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pi,vi;class O extends Ze{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=It(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Dt)===null||e===void 0||e.setConnected(!1)}render(){return ke}}O.finalized=!0,O._$litElement$=!0,(pi=globalThis.litElementHydrateSupport)===null||pi===void 0||pi.call(globalThis,{LitElement:O});const kr=globalThis.litElementPolyfillSupport;kr==null||kr({LitElement:O});((vi=globalThis.litElementVersions)!==null&&vi!==void 0?vi:globalThis.litElementVersions=[]).push("3.2.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=o=>e=>typeof e=="function"?((t,i)=>(window.customElements.define(t,i),i))(o,e):((t,i)=>{const{kind:r,elements:a}=i;return{kind:r,elements:a,finisher(s){window.customElements.define(t,s)}}})(o,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const na=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?mt(ae({},e),{finisher(t){t.createProperty(e.key,o)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}};function u(o){return(e,t)=>t!==void 0?((i,r,a)=>{r.constructor.createProperty(a,i)})(o,e,t):na(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(o){return u(mt(ae({},o),{state:!0}))}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ro=({finisher:o,descriptor:e})=>(t,i)=>{var r;if(i===void 0){const a=(r=t.originalKey)!==null&&r!==void 0?r:t.key,s=e!=null?{kind:"method",placement:"prototype",key:a,descriptor:e(t.key)}:mt(ae({},t),{key:a});return o!=null&&(s.finisher=function(l){o(l,a)}),s}{const a=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),o==null||o(a,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function G(o,e){return ro({descriptor:t=>{const i={get(){var r,a;return(a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o))!==null&&a!==void 0?a:null},enumerable:!0,configurable:!0};if(e){const r=typeof t=="symbol"?Symbol():"__"+t;i.get=function(){var a,s;return this[r]===void 0&&(this[r]=(s=(a=this.renderRoot)===null||a===void 0?void 0:a.querySelector(o))!==null&&s!==void 0?s:null),this[r]}}return i}})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function la(o){return ro({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(o))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mi;((mi=window.HTMLSlotElement)===null||mi===void 0?void 0:mi.prototype.assignedElements)!=null;class da{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(r=>{r.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);!t||(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class ca{constructor(e){var t,i,r,a;this.cacheKeyName="collection-name-cache",this.cacheTtl=60*60*24*7,this.defaultLoadDelay=100,this.loadDelay=100,this.defaultPruningAge=1e3*60*60*24*7,this.defaultPruningInterval=1e3*30,this.fetchTimeout=null,this.pendingIdentifierQueue=new Set,this.pendingPromises={},this.collectionNameCache={},this.pruningAge=this.defaultPruningAge,this.maxCacheSize=2500,this.cacheLoaded=!1,this.searchService=e.searchService,this.localCache=e.localCache,this.loadDelay=(t=e.loadDelay)!==null&&t!==void 0?t:this.defaultLoadDelay,this.pruningAge=(i=e.pruningAge)!==null&&i!==void 0?i:this.pruningAge,this.maxCacheSize=(r=e.maxCacheSize)!==null&&r!==void 0?r:this.maxCacheSize,this.pruneCache(),setInterval(async()=>{await this.pruneCache()},(a=e.pruneInterval)!==null&&a!==void 0?a:this.defaultPruningInterval)}async collectionNameFor(e){this.cacheLoaded||await this.loadFromCache();const t=e.toLowerCase(),i=this.collectionNameCache[t];return i?(i.lastAccess=Date.now(),this.collectionNameCache[t]=i,i.name):(this.startPendingIdentifierTimer(),new Promise(r=>{var a;this.pendingIdentifierQueue.add(t);const s=(a=this.pendingPromises[t])!==null&&a!==void 0?a:[],l=async c=>{r(c)};s.push(l),this.pendingPromises[t]=s}))}async preloadIdentifiers(e){this.cacheLoaded||await this.loadFromCache();const t=e.filter(i=>i!==void 0).map(i=>i.toLowerCase());for(const i of t)this.collectionNameCache[i]||this.pendingIdentifierQueue.add(i);this.startPendingIdentifierTimer()}async startPendingIdentifierTimer(){this.fetchTimeout||(this.fetchTimeout=window.setTimeout(()=>{this.loadPendingIdentifiers(),this.fetchTimeout=null},this.loadDelay))}async loadFromCache(){if(!this.localCache||this.cacheLoaded)return;const e=await this.localCache.get(this.cacheKeyName);!e||(this.collectionNameCache=e,this.cacheLoaded=!0)}async loadPendingIdentifiers(){var e,t,i;await this.loadFromCache();const r=Array.from(this.pendingIdentifierQueue).splice(0,100);if(r.length===0)return;r.map(async c=>this.pendingIdentifierQueue.delete(c));const a={query:`identifier:(${r.join(" OR ")})`,fields:["title","identifier"],rows:r.length},l=(t=(e=(await this.searchService.search(a)).success)===null||e===void 0?void 0:e.response)===null||t===void 0?void 0:t.docs;if(l&&l.length>0)for(const c of l){const{identifier:h,title:v}=c;if(!h)continue;const g=h.toLowerCase();r.splice(r.indexOf(g),1);const b=(i=v==null?void 0:v.value)!==null&&i!==void 0?i:null;this.collectionNameCache[g]={name:b,lastAccess:Date.now()};const S=this.pendingPromises[g];if(S){for(const $ of S)$(b);delete this.pendingPromises[g]}}for(const c of r){this.collectionNameCache[c]={name:null,lastAccess:Date.now()};const h=this.pendingPromises[c];if(h){for(const v of h)v(null);delete this.pendingPromises[c]}}await this.persistCache()}async pruneCache(){await this.loadFromCache();const e=Date.now(),t=Object.entries(this.collectionNameCache).sort((r,a)=>{var s,l,c,h;const v=(l=(s=r[1])===null||s===void 0?void 0:s.lastAccess)!==null&&l!==void 0?l:0,g=(h=(c=a[1])===null||c===void 0?void 0:c.lastAccess)!==null&&h!==void 0?h:0;return v-g}),i=new Set;for(const[r,a]of t){if(!a)continue;const{lastAccess:s}=a;s<e-this.pruningAge&&i.add(r)}if(t.length>this.maxCacheSize)for(let r=0;r<t.length-this.maxCacheSize;r+=1){const[a]=t[r];i.add(a)}for(const r of i)delete this.collectionNameCache[r];await this.persistCache()}async persistCache(){var e;await((e=this.localCache)===null||e===void 0?void 0:e.set({key:this.cacheKeyName,value:this.collectionNameCache,ttl:this.cacheTtl}))}}let _t=class extends O{render(){return p` ${this.name?this.name:this.identifier} `}createRenderRoot(){return this}updated(e){(e.has("identifier")||e.has("collectionNameCache"))&&this.fetchName()}async fetchName(){!this.identifier||!this.collectionNameCache||(this.name=await this.collectionNameCache.collectionNameFor(this.identifier))}};n([u({type:Object})],_t.prototype,"collectionNameCache",void 0);n([u({type:String})],_t.prototype,"identifier",void 0);n([M()],_t.prototype,"name",void 0);_t=n([D("async-collection-name")],_t);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Se=o=>o!=null?o:k;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oo={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ao=o=>(...e)=>({_$litDirective$:o,values:e});class so{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:ha}=sa,_r=()=>document.createComment(""),ft=(o,e,t)=>{var i;const r=o._$AA.parentNode,a=e===void 0?o._$AB:e._$AA;if(t===void 0){const s=r.insertBefore(_r(),a),l=r.insertBefore(_r(),a);t=new ha(s,l,o,o.options)}else{const s=t._$AB.nextSibling,l=t._$AM,c=l!==o;if(c){let h;(i=t._$AQ)===null||i===void 0||i.call(t,o),t._$AM=o,t._$AP!==void 0&&(h=o._$AU)!==l._$AU&&t._$AP(h)}if(s!==a||c){let h=t._$AA;for(;h!==s;){const v=h.nextSibling;r.insertBefore(h,a),h=v}}}return t},ze=(o,e,t=o)=>(o._$AI(e,t),o),ua={},pa=(o,e=ua)=>o._$AH=e,va=o=>o._$AH,gi=o=>{var e;(e=o._$AP)===null||e===void 0||e.call(o,!1,!0);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const r=t.nextSibling;t.remove(),t=r}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Tr=(o,e,t)=>{const i=new Map;for(let r=e;r<=t;r++)i.set(o[r],r);return i},no=ao(class extends so{constructor(o){if(super(o),o.type!==oo.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const r=[],a=[];let s=0;for(const l of o)r[s]=i?i(l,s):s,a[s]=t(l,s),s++;return{values:a,keys:r}}render(o,e,t){return this.dt(o,e,t).values}update(o,[e,t,i]){var r;const a=va(o),{values:s,keys:l}=this.dt(e,t,i);if(!Array.isArray(a))return this.ut=l,s;const c=(r=this.ut)!==null&&r!==void 0?r:this.ut=[],h=[];let v,g,b=0,S=a.length-1,$=0,T=s.length-1;for(;b<=S&&$<=T;)if(a[b]===null)b++;else if(a[S]===null)S--;else if(c[b]===l[$])h[$]=ze(a[b],s[$]),b++,$++;else if(c[S]===l[T])h[T]=ze(a[S],s[T]),S--,T--;else if(c[b]===l[T])h[T]=ze(a[b],s[T]),ft(o,h[T+1],a[b]),b++,T--;else if(c[S]===l[$])h[$]=ze(a[S],s[$]),ft(o,a[b],a[S]),S--,$++;else if(v===void 0&&(v=Tr(l,$,T),g=Tr(c,b,S)),v.has(c[b]))if(v.has(c[S])){const P=g.get(l[$]),R=P!==void 0?a[P]:null;if(R===null){const ee=ft(o,a[b]);ze(ee,s[$]),h[$]=ee}else h[$]=ze(R,s[$]),ft(o,a[b],R),a[P]=null;$++}else gi(a[S]),S--;else gi(a[b]),b++;for(;$<=T;){const P=ft(o,h[T+1]);ze(P,s[$]),h[$++]=P}for(;b<=S;){const P=a[b++];P!==null&&gi(P)}return this.ut=l,pa(o,h),ke}});function Pt(o,e,t){return Array.from({length:(e-o)/t+1},(i,r)=>o+r*t)}let _e=class extends O{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const r=t.target.dataset.cellIndex;if(!r)return;const a=parseInt(r,10);t.isIntersecting?this.visibleCellIndices.add(a):this.visibleCellIndices.delete(a)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){Pt(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const r=t?"smooth":"auto";return i.scrollIntoView({behavior:r}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(Pt(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){const e=this.itemCount-1,t=Pt(0,e,1);return p`
      <div id="container">
        <div id="sentinel"></div>
        ${no(t,i=>i,i=>p`
            <div
              class="cell-container"
              data-cell-index=${i}
              @click=${r=>this.cellSelected(r,i)}
              @keyup=${r=>{r.key==="Enter"&&this.cellSelected(r,i)}}
            ></div>
          `)}
      </div>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),t=Math.max(10,e.length),i=e.sort((h,v)=>h>v?1:-1),r=e.length===0,a=r?0:Math.max(i[0]-t,0),s=r?t:Math.min(i[i.length-1]+t,this.itemCount-1),l=Pt(a,s,1);this.renderCellBuffer(l),this.removeCellsOutsideBufferRange(l);const c=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(c)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const r=this.cellContainerForIndex(t);if(!r)return;const a=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(r.style.height="auto",a)It(a,r),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;It(this.placeholderCellTemplate,r),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,It(k,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=f`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=f`var(--infiniteScrollerRowGap, 1.7rem)`,i=f`var(--infiniteScrollerColGap, 1.7rem)`,r=f`var(--infiniteScrollerCellMinWidth, 16rem)`,a=f`var(--infiniteScrollerCellMaxWidth, 1fr)`,s=f`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=f`var(--infiniteScrollerCellMaxHeight, none)`,c=f`var(--infiniteScrollerCellOutline, 0)`;return f`
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
            minmax(${r}, ${a})
          );
        }
      }

      .cell-container {
        outline: ${c};
        min-height: ${s};
        max-height: ${l};
        min-width: ${r};
        max-width: ${a};
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
    `}};n([u({type:Number})],_e.prototype,"itemCount",void 0);n([u({type:Object})],_e.prototype,"cellProvider",void 0);n([u({type:Object})],_e.prototype,"placeholderCellTemplate",void 0);n([u({type:Boolean})],_e.prototype,"scrollOptimizationsDisabled",void 0);n([G("#sentinel")],_e.prototype,"sentinel",void 0);n([la(".cell-container")],_e.prototype,"cellContainers",void 0);_e=n([D("infinite-scroller")],_e);class Ui{constructor(e){var t,i,r,a,s;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.showProcessingIndicator=(i=e==null?void 0:e.showProcessingIndicator)!==null&&i!==void 0?i:!1,this.processingImageMode=(r=e==null?void 0:e.processingImageMode)!==null&&r!==void 0?r:"complete",this.showCloseButton=(a=e==null?void 0:e.showCloseButton)!==null&&a!==void 0?a:!0,this.closeOnBackdropClick=(s=e==null?void 0:e.closeOnBackdropClick)!==null&&s!==void 0?s:!0}}const ma=Object.freeze({processing:"processing",complete:"complete"});class ga extends O{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=ma.processing}render(){return p`
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
    `}static get styles(){const e=f`var(--activityIndicatorCheckmarkColor, #31A481)`,t=f`var(--activityIndicatorCompletedRingColor, #31A481)`,i=f`var(--activityIndicatorLoadingRingColor, #333333)`,r=f`var(--activityIndicatorLoadingDotColor, #333333)`;return f`
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
    `}}window.customElements.define("ia-activity-indicator",ga);var fa=p`
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
`,ba=p`
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
`;let Li=class extends O{constructor(){super(...arguments),this.config=new Ui}render(){return p`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            <div class="logo-icon">
              ${ba}
            </div>
            ${this.config.title?p`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?p`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
          </header>
          <section class="modal-body">
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?"":"hidden"}"
              >
                <ia-activity-indicator
                  .mode=${this.config.processingImageMode}
                ></ia-activity-indicator>
              </div>

              ${this.config.headline?p` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?p` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(){const e=new Event("closeButtonPressed");this.dispatchEvent(e)}get closeButtonTemplate(){return p`
      <button
        type="button"
        class="close-button"
        tabindex="0"
        @click=${this.handleCloseButton}
      >
        ${fa}
      </button>
    `}static get styles(){const e=f`var(--modalLogoSize, 6.5rem)`,t=f`var(--processingImageSize, 7.5rem)`,i=f`var(--modalCornerRadius, 1rem)`,r=f`var(--modalBorder, 2px solid black)`,a=f`var(--modalBottomMargin, 2.5rem)`,s=f`var(--modalTopMargin, 5rem)`,l=f`var(--modalHeaderBottomPadding, 0.5em)`,c=f`var(--modalBottomPadding, 2rem)`,h=f`var(--modalScrollOffset, 5px)`,v=f`var(--modalTitleFontSize, 1.8rem)`,g=f`var(--modalSubtitleFontSize, 1.4rem)`,b=f`var(--modalHeadlineFontSize, 1.6rem)`,S=f`var(--modalMessageFontSize, 1.4rem)`,$=f`var(--modalTitleLineHeight, normal)`,T=f`var(--modalSubtitleLineHeight, normal)`,P=f`var(--modalHeadlineLineHeight, normal)`,R=f`var(--modalMessageLineHeight, normal)`;return f`
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
        border: ${r};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${l};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${v};
        font-weight: bold;
        line-height: ${$};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${g};
        line-height: ${T};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${r};
        border-top: 0;
        padding: 0 1rem calc(${c} - ${h}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${a}));
        min-height: 5rem;
        padding: 0 0 calc(${h}) 0;
      }

      .headline {
        font-size: ${b};
        font-weight: bold;
        text-align: center;
        line-height: ${P};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${S};
        line-height: ${R};
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
    `}};n([u({type:Object})],Li.prototype,"config",void 0);Li=n([D("modal-template")],Li);function ya(o,e,t,i){var r,a=!1,s=0;function l(){r&&clearTimeout(r)}function c(){l(),a=!0}typeof e!="boolean"&&(i=t,t=e,e=void 0);function h(){for(var v=arguments.length,g=new Array(v),b=0;b<v;b++)g[b]=arguments[b];var S=this,$=Date.now()-s;if(a)return;function T(){s=Date.now(),t.apply(S,g)}function P(){r=void 0}i&&!r&&T(),l(),i===void 0&&$>o?T():e!==!0&&(r=setTimeout(i?P:T,i===void 0?o-$:o))}return h.cancel=c,h}var Ie;(function(o){o.Open="open",o.Closed="closed"})(Ie||(Ie={}));class wa{constructor(e){this.windowResizeThrottler=ya(100,!1,this.updateModalContainerHeight).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case Ie.Open:this.startResizeListener(),this.stopDocumentScroll();break;case Ie.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let tt=class extends O{constructor(){super(...arguments),this.mode=Ie.Closed,this.hostBridge=new wa(this),this.closeOnBackdropClick=!0}render(){return p`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="0"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=Ie.Closed}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Fo(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=Ie.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=f`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=f`var(--modalBackdropZindex, 1000)`,i=f`var(--modalWidth, 32rem)`,r=f`var(--modalMaxWidth, 95%)`,a=f`var(--modalZindex, 2000)`;return f`
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
        z-index: ${a};
        width: ${i};
        max-width: ${r};
      }
    `}};n([u({type:String,reflect:!0})],tt.prototype,"mode",void 0);n([u({type:Object})],tt.prototype,"customModalContent",void 0);n([u({type:Object})],tt.prototype,"hostBridge",void 0);n([G("modal-template")],tt.prototype,"modalTemplate",void 0);tt=n([D("modal-manager")],tt);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ca=(o,...e)=>({strTag:!0,strings:o,values:e}),Ye=Ca,xa=o=>typeof o!="string"&&"strTag"in o,Sa=(o,e,t)=>{let i=o[0];for(let r=1;r<o.length;r++)i+=e[t?t[r-1]:r-1],i+=o[r];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $a=o=>xa(o)?Sa(o.strings,o.values):o;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ka{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let o=0;o<256;o++)(o>>4&15).toString(16)+(o&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let _a=new ka;_a.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Pe=$a;const lo=z`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;let Ei=class extends O{render(){var e,t,i;return p`
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
          <div id="item-count-image-container">${lo}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${(i=this.model)===null||i===void 0?void 0:i.itemCount.toLocaleString()}</div>
            <div id="items-text">${Pe("items")}</div>
          </div>
        </div>
      </div>
    `}static get styles(){const e=f`var(--collectionTileCornerRadius, 4px)`;return f`
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
    `}};n([u({type:Object})],Ei.prototype,"model",void 0);Ei=n([D("collection-tile")],Ei);function Ta(o,e){let t=1;return o>=1e9?t=1e9:o>=1e6?t=1e6:o>=1e3&&e==="short"&&(t=1e3),t}function Aa(o=0,e){const t=o/e,i=t<10;let r=0;return i?r=Math.round((t+Number.EPSILON)*10)/10:r=Math.round(t),r}function Ma(o,e,t,i){switch(e){case 1e9:return Pe(t==="short"?Ye`${o}B`:Ye`${o} billion`);case 1e6:return Pe(t==="short"?Ye`${o}M`:Ye`${o} million`);case 1e3:return Pe(t==="short"?Ye`${o}K`:Ye`${o} thousand`);default:return new Intl.NumberFormat(i).format(o)}}function wt(o,e="long",t="short",i="en-US"){const r=o!=null?o:-1;if(r<0)return"";const a=Ta(r,e),s=Aa(r,a);return Ma(s,a,t,i)}const co=z`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
    <title>Icon of a star, filled in</title>
  </svg>
`,ho=z`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`;var La=z`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;const Ea=z`
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
`,Oa=z`
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
`,za=z`
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
`,Fa=z`
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
`,Pa=z`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Ar=z`
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
`,Na=z`
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
`,Ra=z`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Ia=z`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Da=z`
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
`,Ba=z`
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
`,Ha=z`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,Ua={account:{color:"#000000",icon:Ea,text:"Account"},audio:{color:"#8fdaef",icon:Oa,text:"Audio"},collection:{color:"#000000",icon:lo,text:"Collection"},data:{color:"#333333",icon:za,text:"Data"},etree:{color:"#3871c1",icon:Fa,text:"E-tree"},film:{color:"#bf1b2c",icon:Ar,text:"Film"},image:{color:"#62c4a9",icon:Pa,text:"Image"},movies:{color:"#bf1b2c",icon:Ar,text:"Movie"},radio:{color:"#8fdaef",icon:Na,text:"Radio"},software:{color:"#80cc28",icon:Ra,text:"Software"},texts:{color:"#f9a72b",icon:Ia,text:"Text"},tv:{color:"#f25d54",icon:Da,text:"TV"},video:{color:"#bf1b2c",icon:Ba,text:"Video"},web:{color:"#fddd10",icon:Ha,text:"Web"}};let Tt=class extends O{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;const i=["tvnews","tvarchive","television"],r=["radio","radioprogram"];return this.mediatype==="movies"&&((e=this.collections)===null||e===void 0?void 0:e.some(a=>i.indexOf(a)>=0))?"tv":this.mediatype==="audio"&&((t=this.collections)===null||t===void 0?void 0:t.some(a=>r.indexOf(a)>=0))?"radio":this.mediatype||""}render(){const e=Ua[this.displayMediatype];return e?p`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:p``}static get styles(){return f`
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
        fill: var(--iconCustomFillColor, var(--iconFillColor, '#000000'));
      }
    `}};n([u({type:String})],Tt.prototype,"mediatype",void 0);n([u({type:Array})],Tt.prototype,"collections",void 0);n([u({type:Boolean})],Tt.prototype,"showText",void 0);Tt=n([D("mediatype-icon")],Tt);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mr=ao(class extends so{constructor(o){var e;if(super(o),o.type!==oo.ATTRIBUTE||o.name!=="class"||((e=o.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var t,i;if(this.et===void 0){this.et=new Set,o.strings!==void 0&&(this.st=new Set(o.strings.join(" ").split(/\s/).filter(a=>a!=="")));for(const a in e)e[a]&&!(!((t=this.st)===null||t===void 0)&&t.has(a))&&this.et.add(a);return this.render(e)}const r=o.element.classList;this.et.forEach(a=>{a in e||(r.remove(a),this.et.delete(a))});for(const a in e){const s=!!e[a];s===this.et.has(a)||((i=this.st)===null||i===void 0?void 0:i.has(a))||(s?(r.add(a),this.et.add(a)):(r.remove(a),this.et.delete(a)))}return ke}}),ja=f`
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
`,Va=f`
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
`;let fe=class extends O{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.isWaveform=!1}render(){return p`
      <div class=${Mr(this.itemBaseClass)}>
        <img
          class=${Mr(this.itemImageClass)}
          src="${this.imageSrc}"
          alt=""
          @load=${this.onLoad}
        />
      </div>
    `}get imageSrc(){var e;return`${this.baseImageUrl}/services/img/${(e=this.model)===null||e===void 0?void 0:e.identifier}`}get hashBasedGradient(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(e){return e.split("").reduce((t,i)=>t+i.charCodeAt(0),0)}get itemBaseClass(){return{"drop-shadow":!0,"list-box":this.isListTile,[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var e;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:((e=this.model)===null||e===void 0?void 0:e.contentWarning)||!1,waveform:this.isWaveform}}onLoad(){var e,t;(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"||((t=this.model)===null||t===void 0?void 0:t.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}static get styles(){return[ja,Va,f`
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }
      `]}};n([u({type:Object})],fe.prototype,"model",void 0);n([u({type:String})],fe.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],fe.prototype,"isListTile",void 0);n([u({type:Boolean})],fe.prototype,"isCompactTile",void 0);n([u({type:Boolean})],fe.prototype,"loggedIn",void 0);n([M()],fe.prototype,"isWaveform",void 0);n([G("img")],fe.prototype,"baseImage",void 0);fe=n([D("item-image")],fe);let Vt=class extends O{render(){var e,t,i,r,a,s,l;const c=((e=this.model)===null||e===void 0?void 0:e.title)||k,h=(t=this.model)===null||t===void 0?void 0:t.creator;return p`
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${c}>${c}</h1>
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              ${h?p`<span>by&nbsp;${h}</span>`:k}
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${(i=this.model)===null||i===void 0?void 0:i.mediatype}
                .collection=${(r=this.model)===null||r===void 0?void 0:r.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${La}
              <p class="status-text">
                ${wt((a=this.model)===null||a===void 0?void 0:a.viewCount,"short","short")}
              </p>
            </div>
            <div class="col">
              ${co}
              <p class="status-text">
                ${wt((s=this.model)===null||s===void 0?void 0:s.itemCount,"short","short")}
              </p>
            </div>
            <div class="col">
              ${ho}
              <p class="status-text">
                ${wt((l=this.model)===null||l===void 0?void 0:l.favCount,"short","short")}
              </p>
            </div>
          </div>
        </div>
      </div>
    `}static get styles(){const e=f`var(--collectionTileCornerRadius, 4px)`;return f`
      #container {
        background-color: #ffffff;
        border-radius: ${e};
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      }

      #title-image-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0.5rem 0.5rem 0 0.5rem;
      }

      #item-title {
        color: #2c2c2c;
        font-size: 1.6rem;
        text-align: center;
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #item-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
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

      .hr {
        border: 0.5px solid #ccc;
      }

      #item-stats-container {
        align-items: center;
        display: flex;
        height: 5.5rem;
        padding-left: 1rem;
        padding-right: 0.5rem;
      }

      #stats-holder {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
      }

      svg {
        height: 10px;
        width: 10px;
      }

      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: center;
      }

      .col {
        width: 25%;
      }
    `}};n([u({type:Object})],Vt.prototype,"model",void 0);n([u({type:String})],Vt.prototype,"baseImageUrl",void 0);Vt=n([D("item-tile")],Vt);const Wa=z`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m89.6854559 79.6500588c1.7300364 6.4823648 2.180423 13.3122689 3.3145441 20.3499412h-86c.5683151-15.8558542 2.98334063-30.7849367 15.1676149-41.6581341 22.9948067-20.518674 59.250299-9.0032844 67.517841 21.3081929zm-40.0998307-79.6500588c10.872402.0493248 19.9700408 9.25722341 19.917959 20.1421788-.0829413 11.042868-8.9616237 19.8492523-20.0602807 19.8578212-11.1181198 0-19.9397193-8.7904706-19.9397193-19.8908727-.0327543-11.11998815 9.0125781-20.17487063 20.082041-20.1091273z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of a person</title>
  </svg>
`,Qa=z`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`;let Oi=class extends O{render(){var e,t,i,r,a,s,l;return p`
      <div class="outer-holder">
        <div class="inner-holder">
          <div id="header-holder">
            <div id="title-holder">
              <h1 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.identifier}</h1>
            </div>
            <div id="avatar-holder">
              <div
                id="avatar"
                style="background-image: url('https://archive.org/services/img/${(t=this.model)===null||t===void 0?void 0:t.identifier}')"
              ></div>
            </div>
          </div>
          <div id="year-holder">
            <div id="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div id="year-holder">
              <h3>${(r=(i=this.model)===null||i===void 0?void 0:i.dateAdded)===null||r===void 0?void 0:r.getFullYear()}</h3>
            </div>
          </div>
          <div id="status-holder">
            <div id="patron-icon">${Wa}</div>
            <div class="stat-icon">
              ${Qa}
              <h3>${(a=this.model)===null||a===void 0?void 0:a.itemCount}</h3>
            </div>
            <div class="stat-icon">
              ${co}
              <h3>${(s=this.model)===null||s===void 0?void 0:s.favCount}</h3>
            </div>
            <div class="stat-icon">
              ${ho}
              <h3>${(l=this.model)===null||l===void 0?void 0:l.commentCount}</h3>
            </div>
          </div>
        </div>
      </div>
    `}static get styles(){return f`
      h1 {
        color: black;
        font-size: 16px;
        margin: 0;
      }

      h3 {
        font-size: 14px;
        font-weight: bold;
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
        text-align: center;
        width: 100%;
      }

      .inner-holder {
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      #header-holder {
        flex: 1;
      }

      #title-holder {
        height: 40px;
        margin-bottom: 5px;
      }

      #avatar-holder {
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

      #year-holder {
        margin: 0px;
      }

      #status-holder {
        height: 25px;
        display: flex;
        justify-content: space-evenly;
        line-height: initial;
      }

      #patron-icon {
        height: 25px;
        width: 25px;
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
        word-break: break-all;
        line-height: 2rem;
        text-align: center;
      }

      .stat-icon {
        height: 10px;
        width: 10px;
      }
    `}};n([u({type:Object})],Oi.prototype,"model",void 0);Oi=n([D("account-tile")],Oi);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*fi(o,e){const t=typeof e=="function";if(o!==void 0){let i=-1;for(const r of o)i>-1&&(yield t?e(i):e),i++,yield r}}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Lr(o,e){if(o!==void 0){let t=0;for(const i of o)yield e(i,t++)}}/*! @license DOMPurify 2.3.8 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.8/LICENSE */function Ne(o){return Ne=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ne(o)}function zi(o,e){return zi=Object.setPrototypeOf||function(i,r){return i.__proto__=r,i},zi(o,e)}function Ga(){if(typeof Reflect=="undefined"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Dt(o,e,t){return Ga()?Dt=Reflect.construct:Dt=function(r,a,s){var l=[null];l.push.apply(l,a);var c=Function.bind.apply(r,l),h=new c;return s&&zi(h,s.prototype),h},Dt.apply(null,arguments)}function se(o){return Ka(o)||qa(o)||Ya(o)||Za()}function Ka(o){if(Array.isArray(o))return Fi(o)}function qa(o){if(typeof Symbol!="undefined"&&o[Symbol.iterator]!=null||o["@@iterator"]!=null)return Array.from(o)}function Ya(o,e){if(!!o){if(typeof o=="string")return Fi(o,e);var t=Object.prototype.toString.call(o).slice(8,-1);if(t==="Object"&&o.constructor&&(t=o.constructor.name),t==="Map"||t==="Set")return Array.from(o);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return Fi(o,e)}}function Fi(o,e){(e==null||e>o.length)&&(e=o.length);for(var t=0,i=new Array(e);t<e;t++)i[t]=o[t];return i}function Za(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Xa=Object.hasOwnProperty,Er=Object.setPrototypeOf,Ja=Object.isFrozen,es=Object.getPrototypeOf,ts=Object.getOwnPropertyDescriptor,Y=Object.freeze,ue=Object.seal,is=Object.create,uo=typeof Reflect!="undefined"&&Reflect,Wt=uo.apply,Pi=uo.construct;Wt||(Wt=function(e,t,i){return e.apply(t,i)});Y||(Y=function(e){return e});ue||(ue=function(e){return e});Pi||(Pi=function(e,t){return Dt(e,se(t))});var rs=ne(Array.prototype.forEach),Or=ne(Array.prototype.pop),bt=ne(Array.prototype.push),Bt=ne(String.prototype.toLowerCase),os=ne(String.prototype.match),xe=ne(String.prototype.replace),as=ne(String.prototype.indexOf),ss=ne(String.prototype.trim),q=ne(RegExp.prototype.test),bi=ns(TypeError);function ne(o){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),r=1;r<t;r++)i[r-1]=arguments[r];return Wt(o,e,i)}}function ns(o){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return Pi(o,t)}}function A(o,e){Er&&Er(o,null);for(var t=e.length;t--;){var i=e[t];if(typeof i=="string"){var r=Bt(i);r!==i&&(Ja(e)||(e[t]=r),i=r)}o[i]=!0}return o}function Fe(o){var e=is(null),t;for(t in o)Wt(Xa,o,[t])&&(e[t]=o[t]);return e}function Nt(o,e){for(;o!==null;){var t=ts(o,e);if(t){if(t.get)return ne(t.get);if(typeof t.value=="function")return ne(t.value)}o=es(o)}function i(r){return console.warn("fallback value for",r),null}return i}var zr=Y(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),yi=Y(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),wi=Y(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),ls=Y(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ci=Y(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),ds=Y(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Fr=Y(["#text"]),Pr=Y(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),xi=Y(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Nr=Y(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Rt=Y(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),cs=ue(/\{\{[\w\W]*|[\w\W]*\}\}/gm),hs=ue(/<%[\w\W]*|[\w\W]*%>/gm),us=ue(/^data-[\-\w.\u00B7-\uFFFF]/),ps=ue(/^aria-[\-\w]+$/),vs=ue(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),ms=ue(/^(?:\w+script|data):/i),gs=ue(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),fs=ue(/^html$/i),bs=function(){return typeof window=="undefined"?null:window},ys=function(e,t){if(Ne(e)!=="object"||typeof e.createPolicy!="function")return null;var i=null,r="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(r)&&(i=t.currentScript.getAttribute(r));var a="dompurify"+(i?"#"+i:"");try{return e.createPolicy(a,{createHTML:function(l){return l}})}catch{return console.warn("TrustedTypes policy "+a+" could not be created."),null}};function po(){var o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:bs(),e=function(d){return po(d)};if(e.version="2.3.8",e.removed=[],!o||!o.document||o.document.nodeType!==9)return e.isSupported=!1,e;var t=o.document,i=o.document,r=o.DocumentFragment,a=o.HTMLTemplateElement,s=o.Node,l=o.Element,c=o.NodeFilter,h=o.NamedNodeMap,v=h===void 0?o.NamedNodeMap||o.MozNamedAttrMap:h,g=o.HTMLFormElement,b=o.DOMParser,S=o.trustedTypes,$=l.prototype,T=Nt($,"cloneNode"),P=Nt($,"nextSibling"),R=Nt($,"childNodes"),ee=Nt($,"parentNode");if(typeof a=="function"){var oe=i.createElement("template");oe.content&&oe.content.ownerDocument&&(i=oe.content.ownerDocument)}var W=ys(S,t),ye=W?W.createHTML(""):"",ce=i,he=ce.implementation,st=ce.createNodeIterator,nt=ce.createDocumentFragment,lt=ce.getElementsByTagName,dt=t.importNode,Be={};try{Be=Fe(i).documentMode?i.documentMode:{}}catch{}var Z={};e.isSupported=typeof ee=="function"&&he&&typeof he.createHTMLDocument!="undefined"&&Be!==9;var Te=cs,Ae=hs,ct=us,ht=ps,ut=ms,He=gs,Me=vs,I=null,Ue=A({},[].concat(se(zr),se(yi),se(wi),se(Ci),se(Fr))),B=null,je=A({},[].concat(se(Pr),se(xi),se(Nr),se(Rt))),N=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,Yt=null,Qi=!0,Zt=!0,Gi=!1,Ve=!1,Le=!1,Xt=!1,Jt=!1,We=!1,Lt=!1,Et=!1,Ki=!0,ei=!0,pt=!1,Qe={},Ge=null,qi=A({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Yi=null,Zi=A({},["audio","video","img","source","image","track"]),ti=null,Xi=A({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ii="http://www.w3.org/1998/Math/MathML",ri="http://www.w3.org/2000/svg",Ce="http://www.w3.org/1999/xhtml",Ot=Ce,oi=!1,Ke,wo=["application/xhtml+xml","text/html"],Co="text/html",Ee,qe=null,xo=i.createElement("form"),Ji=function(d){return d instanceof RegExp||d instanceof Function},ai=function(d){qe&&qe===d||((!d||Ne(d)!=="object")&&(d={}),d=Fe(d),I="ALLOWED_TAGS"in d?A({},d.ALLOWED_TAGS):Ue,B="ALLOWED_ATTR"in d?A({},d.ALLOWED_ATTR):je,ti="ADD_URI_SAFE_ATTR"in d?A(Fe(Xi),d.ADD_URI_SAFE_ATTR):Xi,Yi="ADD_DATA_URI_TAGS"in d?A(Fe(Zi),d.ADD_DATA_URI_TAGS):Zi,Ge="FORBID_CONTENTS"in d?A({},d.FORBID_CONTENTS):qi,we="FORBID_TAGS"in d?A({},d.FORBID_TAGS):{},Yt="FORBID_ATTR"in d?A({},d.FORBID_ATTR):{},Qe="USE_PROFILES"in d?d.USE_PROFILES:!1,Qi=d.ALLOW_ARIA_ATTR!==!1,Zt=d.ALLOW_DATA_ATTR!==!1,Gi=d.ALLOW_UNKNOWN_PROTOCOLS||!1,Ve=d.SAFE_FOR_TEMPLATES||!1,Le=d.WHOLE_DOCUMENT||!1,We=d.RETURN_DOM||!1,Lt=d.RETURN_DOM_FRAGMENT||!1,Et=d.RETURN_TRUSTED_TYPE||!1,Jt=d.FORCE_BODY||!1,Ki=d.SANITIZE_DOM!==!1,ei=d.KEEP_CONTENT!==!1,pt=d.IN_PLACE||!1,Me=d.ALLOWED_URI_REGEXP||Me,Ot=d.NAMESPACE||Ce,d.CUSTOM_ELEMENT_HANDLING&&Ji(d.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(N.tagNameCheck=d.CUSTOM_ELEMENT_HANDLING.tagNameCheck),d.CUSTOM_ELEMENT_HANDLING&&Ji(d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(N.attributeNameCheck=d.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),d.CUSTOM_ELEMENT_HANDLING&&typeof d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(N.allowCustomizedBuiltInElements=d.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Ke=wo.indexOf(d.PARSER_MEDIA_TYPE)===-1?Ke=Co:Ke=d.PARSER_MEDIA_TYPE,Ee=Ke==="application/xhtml+xml"?function(m){return m}:Bt,Ve&&(Zt=!1),Lt&&(We=!0),Qe&&(I=A({},se(Fr)),B=[],Qe.html===!0&&(A(I,zr),A(B,Pr)),Qe.svg===!0&&(A(I,yi),A(B,xi),A(B,Rt)),Qe.svgFilters===!0&&(A(I,wi),A(B,xi),A(B,Rt)),Qe.mathMl===!0&&(A(I,Ci),A(B,Nr),A(B,Rt))),d.ADD_TAGS&&(I===Ue&&(I=Fe(I)),A(I,d.ADD_TAGS)),d.ADD_ATTR&&(B===je&&(B=Fe(B)),A(B,d.ADD_ATTR)),d.ADD_URI_SAFE_ATTR&&A(ti,d.ADD_URI_SAFE_ATTR),d.FORBID_CONTENTS&&(Ge===qi&&(Ge=Fe(Ge)),A(Ge,d.FORBID_CONTENTS)),ei&&(I["#text"]=!0),Le&&A(I,["html","head","body"]),I.table&&(A(I,["tbody"]),delete we.tbody),Y&&Y(d),qe=d)},er=A({},["mi","mo","mn","ms","mtext"]),tr=A({},["foreignobject","desc","title","annotation-xml"]),So=A({},["title","style","font","a","script"]),zt=A({},yi);A(zt,wi),A(zt,ls);var si=A({},Ci);A(si,ds);var $o=function(d){var m=ee(d);(!m||!m.tagName)&&(m={namespaceURI:Ce,tagName:"template"});var w=Bt(d.tagName),E=Bt(m.tagName);return d.namespaceURI===ri?m.namespaceURI===Ce?w==="svg":m.namespaceURI===ii?w==="svg"&&(E==="annotation-xml"||er[E]):Boolean(zt[w]):d.namespaceURI===ii?m.namespaceURI===Ce?w==="math":m.namespaceURI===ri?w==="math"&&tr[E]:Boolean(si[w]):d.namespaceURI===Ce?m.namespaceURI===ri&&!tr[E]||m.namespaceURI===ii&&!er[E]?!1:!si[w]&&(So[w]||!zt[w]):!1},pe=function(d){bt(e.removed,{element:d});try{d.parentNode.removeChild(d)}catch{try{d.outerHTML=ye}catch{d.remove()}}},ir=function(d,m){try{bt(e.removed,{attribute:m.getAttributeNode(d),from:m})}catch{bt(e.removed,{attribute:null,from:m})}if(m.removeAttribute(d),d==="is"&&!B[d])if(We||Lt)try{pe(m)}catch{}else try{m.setAttribute(d,"")}catch{}},rr=function(d){var m,w;if(Jt)d="<remove></remove>"+d;else{var E=os(d,/^[\r\n\t ]+/);w=E&&E[0]}Ke==="application/xhtml+xml"&&(d='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+d+"</body></html>");var X=W?W.createHTML(d):d;if(Ot===Ce)try{m=new b().parseFromString(X,Ke)}catch{}if(!m||!m.documentElement){m=he.createDocument(Ot,"template",null);try{m.documentElement.innerHTML=oi?"":X}catch{}}var Q=m.body||m.documentElement;return d&&w&&Q.insertBefore(i.createTextNode(w),Q.childNodes[0]||null),Ot===Ce?lt.call(m,Le?"html":"body")[0]:Le?m.documentElement:Q},or=function(d){return st.call(d.ownerDocument||d,d,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT,null,!1)},ko=function(d){return d instanceof g&&(typeof d.nodeName!="string"||typeof d.textContent!="string"||typeof d.removeChild!="function"||!(d.attributes instanceof v)||typeof d.removeAttribute!="function"||typeof d.setAttribute!="function"||typeof d.namespaceURI!="string"||typeof d.insertBefore!="function")},vt=function(d){return Ne(s)==="object"?d instanceof s:d&&Ne(d)==="object"&&typeof d.nodeType=="number"&&typeof d.nodeName=="string"},ve=function(d,m,w){!Z[d]||rs(Z[d],function(E){E.call(e,m,w,qe)})},ar=function(d){var m;if(ve("beforeSanitizeElements",d,null),ko(d)||q(/[\u0080-\uFFFF]/,d.nodeName))return pe(d),!0;var w=Ee(d.nodeName);if(ve("uponSanitizeElement",d,{tagName:w,allowedTags:I}),d.hasChildNodes()&&!vt(d.firstElementChild)&&(!vt(d.content)||!vt(d.content.firstElementChild))&&q(/<[/\w]/g,d.innerHTML)&&q(/<[/\w]/g,d.textContent)||w==="select"&&q(/<template/i,d.innerHTML))return pe(d),!0;if(!I[w]||we[w]){if(!we[w]&&nr(w)&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,w)||N.tagNameCheck instanceof Function&&N.tagNameCheck(w)))return!1;if(ei&&!Ge[w]){var E=ee(d)||d.parentNode,X=R(d)||d.childNodes;if(X&&E)for(var Q=X.length,j=Q-1;j>=0;--j)E.insertBefore(T(X[j],!0),P(d))}return pe(d),!0}return d instanceof l&&!$o(d)||(w==="noscript"||w==="noembed")&&q(/<\/no(script|embed)/i,d.innerHTML)?(pe(d),!0):(Ve&&d.nodeType===3&&(m=d.textContent,m=xe(m,Te," "),m=xe(m,Ae," "),d.textContent!==m&&(bt(e.removed,{element:d.cloneNode()}),d.textContent=m)),ve("afterSanitizeElements",d,null),!1)},sr=function(d,m,w){if(Ki&&(m==="id"||m==="name")&&(w in i||w in xo))return!1;if(!(Zt&&!Yt[m]&&q(ct,m))){if(!(Qi&&q(ht,m))){if(!B[m]||Yt[m]){if(!(nr(d)&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,d)||N.tagNameCheck instanceof Function&&N.tagNameCheck(d))&&(N.attributeNameCheck instanceof RegExp&&q(N.attributeNameCheck,m)||N.attributeNameCheck instanceof Function&&N.attributeNameCheck(m))||m==="is"&&N.allowCustomizedBuiltInElements&&(N.tagNameCheck instanceof RegExp&&q(N.tagNameCheck,w)||N.tagNameCheck instanceof Function&&N.tagNameCheck(w))))return!1}else if(!ti[m]){if(!q(Me,xe(w,He,""))){if(!((m==="src"||m==="xlink:href"||m==="href")&&d!=="script"&&as(w,"data:")===0&&Yi[d])){if(!(Gi&&!q(ut,xe(w,He,"")))){if(w)return!1}}}}}}return!0},nr=function(d){return d.indexOf("-")>0},lr=function(d){var m,w,E,X;ve("beforeSanitizeAttributes",d,null);var Q=d.attributes;if(!!Q){var j={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:B};for(X=Q.length;X--;){m=Q[X];var Ft=m,K=Ft.name,dr=Ft.namespaceURI;if(w=K==="value"?m.value:ss(m.value),E=Ee(K),j.attrName=E,j.attrValue=w,j.keepAttr=!0,j.forceKeepAttr=void 0,ve("uponSanitizeAttribute",d,j),w=j.attrValue,!j.forceKeepAttr&&(ir(K,d),!!j.keepAttr)){if(q(/\/>/i,w)){ir(K,d);continue}Ve&&(w=xe(w,Te," "),w=xe(w,Ae," "));var To=Ee(d.nodeName);if(!!sr(To,E,w))try{dr?d.setAttributeNS(dr,K,w):d.setAttribute(K,w),Or(e.removed)}catch{}}}ve("afterSanitizeAttributes",d,null)}},_o=function x(d){var m,w=or(d);for(ve("beforeSanitizeShadowDOM",d,null);m=w.nextNode();)ve("uponSanitizeShadowNode",m,null),!ar(m)&&(m.content instanceof r&&x(m.content),lr(m));ve("afterSanitizeShadowDOM",d,null)};return e.sanitize=function(x,d){var m,w,E,X,Q;if(oi=!x,oi&&(x="<!-->"),typeof x!="string"&&!vt(x)){if(typeof x.toString!="function")throw bi("toString is not a function");if(x=x.toString(),typeof x!="string")throw bi("dirty is not a string, aborting")}if(!e.isSupported){if(Ne(o.toStaticHTML)==="object"||typeof o.toStaticHTML=="function"){if(typeof x=="string")return o.toStaticHTML(x);if(vt(x))return o.toStaticHTML(x.outerHTML)}return x}if(Xt||ai(d),e.removed=[],typeof x=="string"&&(pt=!1),pt){if(x.nodeName){var j=Ee(x.nodeName);if(!I[j]||we[j])throw bi("root node is forbidden and cannot be sanitized in-place")}}else if(x instanceof s)m=rr("<!---->"),w=m.ownerDocument.importNode(x,!0),w.nodeType===1&&w.nodeName==="BODY"||w.nodeName==="HTML"?m=w:m.appendChild(w);else{if(!We&&!Ve&&!Le&&x.indexOf("<")===-1)return W&&Et?W.createHTML(x):x;if(m=rr(x),!m)return We?null:Et?ye:""}m&&Jt&&pe(m.firstChild);for(var Ft=or(pt?x:m);E=Ft.nextNode();)E.nodeType===3&&E===X||ar(E)||(E.content instanceof r&&_o(E.content),lr(E),X=E);if(X=null,pt)return x;if(We){if(Lt)for(Q=nt.call(m.ownerDocument);m.firstChild;)Q.appendChild(m.firstChild);else Q=m;return B.shadowroot&&(Q=dt.call(t,Q,!0)),Q}var K=Le?m.outerHTML:m.innerHTML;return Le&&I["!doctype"]&&m.ownerDocument&&m.ownerDocument.doctype&&m.ownerDocument.doctype.name&&q(fs,m.ownerDocument.doctype.name)&&(K="<!DOCTYPE "+m.ownerDocument.doctype.name+`>
`+K),Ve&&(K=xe(K,Te," "),K=xe(K,Ae," ")),W&&Et?W.createHTML(K):K},e.setConfig=function(x){ai(x),Xt=!0},e.clearConfig=function(){qe=null,Xt=!1},e.isValidAttribute=function(x,d,m){qe||ai({});var w=Ee(x),E=Ee(d);return sr(w,E,m)},e.addHook=function(x,d){typeof d=="function"&&(Z[x]=Z[x]||[],bt(Z[x],d))},e.removeHook=function(x){if(Z[x])return Or(Z[x])},e.removeHooks=function(x){Z[x]&&(Z[x]=[])},e.removeAllHooks=function(){Z={}},e}var Ct=po();function vo(o){switch(o){case"date":return"Published";case"reviewdate":return"Reviewed";case"addeddate":return"Added";default:return"Archived"}}function mo(o){return o?`Archivist since ${o.getFullYear()}`:""}function Ni(o,e="short",t="en-US"){if(!o)return"";const i={timeZone:"UTC"};switch(e){case"short":i.month="short",i.year="numeric";break;case"long":i.year="numeric",i.month="short",i.day="2-digit";break}return new Intl.DateTimeFormat(t,i).format(o)}let le=class extends O{constructor(){super(...arguments),this.sortParam=null,this.collectionLinks=[]}updated(e){e.has("model")&&this.fetchCollectionNames()}async fetchCollectionNames(){var e,t;if(!(!((e=this.model)===null||e===void 0)&&e.collections)||this.model.collections.length===0||!this.collectionNameCache)return;this.collectionLinks=[];const i=[],r=[];for(const a of this.model.collections)r.push((t=this.collectionNameCache)===null||t===void 0?void 0:t.collectionNameFor(a).then(s=>{i.push(this.detailsLink(a,s!=null?s:a))}));await Promise.all(r),this.collectionLinks=i}render(){return p`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize==="mobile"?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){var e;return p`
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${Se((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
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
    `}get desktopTemplate(){var e;return p`
      <div id="list-line-left">
        <div id="thumb" class="${Se((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
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
    `}get detailsTemplate(){return p`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate}
    `}get imgTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?p`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
        style="--imgHeight: 100%; --imgWidth: 100%"
      >
      </item-image>
    `:k}get iconRightTemplate(){var e,t;return p`
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${(e=this.model)===null||e===void 0?void 0:e.mediatype}
          .collections=${(t=this.model)===null||t===void 0?void 0:t.collections}
          style="--iconCustomFillColor: ${Se(this.collectionColor)}"
        >
        </mediatype-icon>
      </div>
    `}get collectionColor(){var e;if(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="collection")return"#4666FF"}get titleTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.title?p` ${this.detailsLink(this.model.identifier,this.model.title)} `:k}get itemLineTemplate(){const e=this.sourceTemplate,t=this.volumeTemplate,i=this.issueTemplate;return!e&&!t&&!i?k:p` <div id="item-line">${e} ${t} ${i}</div> `}get sourceTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.source?p`
      <div id="source" class="metadata">
        ${this.labelTemplate("Source")}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:k}get volumeTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.volume,"Volume")}get issueTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.issue,"Issue")}get creatorTemplate(){var e,t,i;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"?p`
        <div id="creator" class="metadata">
          <span class="label"> ${mo((t=this.model)===null||t===void 0?void 0:t.dateAdded)} </span>
        </div>
      `:!(!((i=this.model)===null||i===void 0)&&i.creators)||this.model.creators.length===0?k:p`
      <div id="creator" class="metadata">
        ${this.labelTemplate("By")}
        ${fi(Lr(this.model.creators,r=>this.searchLink("creator",r)),p`, `)}
      </div>
    `}get datePublishedTemplate(){var e;return this.metadataTemplate(Ni((e=this.model)===null||e===void 0?void 0:e.datePublished,"long"),"Published")}get dateSortByTemplate(){return this.sortParam&&(this.sortParam.field==="addeddate"||this.sortParam.field==="reviewdate"||this.sortParam.field==="publicdate")?this.metadataTemplate(Ni(this.date,"long"),vo(this.sortParam.field)):k}get viewsTemplate(){var e,t;return this.metadataTemplate(`${wt((t=(e=this.model)===null||e===void 0?void 0:e.viewCount)!==null&&t!==void 0?t:0,this.formatSize)}`,"Views")}get ratingTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.averageRating,"Avg Rating")}get reviewsTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.commentCount,"Reviews")}get topicsTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.subjects)||this.model.subjects.length===0?k:p`
      <div id="topics" class="metadata">
        ${this.labelTemplate("Topics")}
        ${fi(Lr(this.model.subjects,t=>this.searchLink("subject",t)),p`, `)}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?k:p`
      <div id="collections" class="metadata">
        ${this.labelTemplate("Collections")}
        ${fi(this.collectionLinks,p`, `)}
      </div>
    `}get descriptionTemplate(){var e,t;return this.metadataTemplate(Ct.sanitize((t=(e=this.model)===null||e===void 0?void 0:e.description)!==null&&t!==void 0?t:""),"","description")}metadataTemplate(e,t="",i){return e?p`
      <div id=${Se(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:k}labelTemplate(e){return p` ${e?p`<span class="label">${e}: </span>`:k}`}searchLink(e,t){if(!e||!t)return k;const i=encodeURIComponent(`${e}:"${t}"`);return p`<a href="${this.baseNavigationUrl}/search.php?query=${i}">
      ${Ct.sanitize(t)}</a
    >`}detailsLink(e,t){const i=t!=null?t:e;return p`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(e)}"
      >${Ct.sanitize(i)}</a
    >`}get date(){var e,t,i,r,a;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(r=this.model)===null||r===void 0?void 0:r.dateAdded;default:return(a=this.model)===null||a===void 0?void 0:a.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return f`
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
    `}};n([u({type:Object})],le.prototype,"model",void 0);n([u({type:String})],le.prototype,"baseNavigationUrl",void 0);n([u({type:Object})],le.prototype,"collectionNameCache",void 0);n([u({type:Number})],le.prototype,"currentWidth",void 0);n([u({type:Number})],le.prototype,"currentHeight",void 0);n([u({type:Object})],le.prototype,"sortParam",void 0);n([u({type:Number})],le.prototype,"mobileBreakpoint",void 0);n([M()],le.prototype,"collectionLinks",void 0);n([u({type:String})],le.prototype,"baseImageUrl",void 0);le=n([D("tile-list")],le);let be=class extends O{constructor(){super(...arguments),this.sortParam=null}render(){var e,t,i,r,a,s,l,c,h,v,g;return p`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${Se((e=this.model)===null||e===void 0?void 0:e.mediatype)}">
          ${this.imageTemplate}
        </div>
        <div id="title">${Ct.sanitize((i=(t=this.model)===null||t===void 0?void 0:t.title)!==null&&i!==void 0?i:"")}</div>
        <div id="creator">
          ${((r=this.model)===null||r===void 0?void 0:r.mediatype)==="account"?mo((a=this.model)===null||a===void 0?void 0:a.dateAdded):Ct.sanitize((l=(s=this.model)===null||s===void 0?void 0:s.creator)!==null&&l!==void 0?l:"")}
        </div>
        <div id="date">${Ni(this.date,this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(c=this.model)===null||c===void 0?void 0:c.mediatype}
            .collections=${(h=this.model)===null||h===void 0?void 0:h.collections}
            style="--iconCustomFillColor: ${Se(this.collectionColor)}"
          >
          </mediatype-icon>
        </div>
        <div id="views">
          ${wt((g=(v=this.model)===null||v===void 0?void 0:v.viewCount)!==null&&g!==void 0?g:0,this.formatSize)}
        </div>
      </div>
    `}get collectionColor(){var e;if(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="collection")return"#4666FF"}get imageTemplate(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?p`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
        .isCompactTile=${!0}
        style="--imgHeight: 100%; --imgWidth: 100%"
      >
      </item-image>
    `:k}get date(){var e,t,i,r,a;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(r=this.model)===null||r===void 0?void 0:r.dateAdded;default:return(a=this.model)===null||a===void 0?void 0:a.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return f`
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
    `}};n([u({type:Object})],be.prototype,"model",void 0);n([u({type:String})],be.prototype,"baseNavigationUrl",void 0);n([u({type:Number})],be.prototype,"currentWidth",void 0);n([u({type:Number})],be.prototype,"currentHeight",void 0);n([u({type:Object})],be.prototype,"sortParam",void 0);n([u({type:Number})],be.prototype,"mobileBreakpoint",void 0);n([u({type:String})],be.prototype,"baseImageUrl",void 0);be=n([D("tile-list-compact")],be);let it=class extends O{constructor(){super(...arguments),this.sortParam=null}render(){var e;return p`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${vo((e=this.sortParam)===null||e===void 0?void 0:e.field)}</div>
        <div id="icon"></div>
        <div id="views">Views</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return f`
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
    `}};n([u({type:Object})],it.prototype,"model",void 0);n([u({type:Number})],it.prototype,"currentWidth",void 0);n([u({type:Object})],it.prototype,"sortParam",void 0);n([u({type:Number})],it.prototype,"mobileBreakpoint",void 0);it=n([D("tile-list-compact-header")],it);let te=class extends O{constructor(){super(...arguments),this.sortParam=null}render(){return p`
      <div id="container">
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
      </div>
    `}get headerTemplate(){const{currentWidth:e,sortParam:t,mobileBreakpoint:i}=this;return p`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t}
        .mobileBreakpoint=${i}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return p`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t;return p`
      <a
        href="${this.baseNavigationUrl}/details/${(e=this.model)===null||e===void 0?void 0:e.identifier}"
        title=${Se((t=this.model)===null||t===void 0?void 0:t.title)}
      >
        ${this.tile}
      </a>
    `}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e==null||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),(e=this.resizeObserver)===null||e===void 0||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}get tile(){const{model:e,baseNavigationUrl:t,currentWidth:i,currentHeight:r,sortParam:a,mobileBreakpoint:s}=this;if(!e)return k;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return p`<collection-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            >
            </collection-tile>`;case"account":return p`<account-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            ></account-tile>`;default:return p`<item-tile
              .model=${e}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
            ></item-tile>`}case"list-compact":return p`<tile-list-compact
          .model=${e}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${a}
          .mobileBreakpoint=${s}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list-compact>`;case"list-detail":return p`<tile-list
          .model=${e}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${a}
          .mobileBreakpoint=${s}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list>`;default:return k}}static get styles(){return f`
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
    `}};n([u({type:String})],te.prototype,"tileDisplayMode",void 0);n([u({type:Object})],te.prototype,"model",void 0);n([u({type:String})],te.prototype,"baseNavigationUrl",void 0);n([u({type:Number})],te.prototype,"currentWidth",void 0);n([u({type:Number})],te.prototype,"currentHeight",void 0);n([u({type:Object})],te.prototype,"resizeObserver",void 0);n([u({type:Object})],te.prototype,"collectionNameCache",void 0);n([u({type:Object})],te.prototype,"sortParam",void 0);n([G("#container")],te.prototype,"container",void 0);n([u({type:Number})],te.prototype,"mobileBreakpoint",void 0);n([u({type:String})],te.prototype,"baseImageUrl",void 0);te=n([D("tile-dispatcher")],te);let Rr=class extends O{render(){return p` <div id="container"></div> `}static get styles(){return f`
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
    `}};Rr=n([D("collection-browser-loading-tile")],Rr);var L;(function(o){o.relevance="relevance",o.views="views",o.title="title",o.datearchived="datearchived",o.date="date",o.datereviewed="datereviewed",o.dateadded="dateadded",o.creator="creator"})(L||(L={}));const yt={relevance:"Relevance",views:"Views",title:"Title",datearchived:"Date Archived",date:"Date Published",datereviewed:"Date Reviewed",dateadded:"Date Added",creator:"Creator"},ws={relevance:null,views:"week",title:"titleSorter",datearchived:"publicdate",date:"date",datereviewed:"reviewdate",dateadded:"addeddate",creator:"creatorSorter"},Ir={titleSorter:L.title,date:L.date,publicdate:L.datearchived,reviewdate:L.datereviewed,addeddate:L.dateadded,creatorSorter:L.creator,week:L.views},At={subject:{},mediatype:{},language:{},creator:{},collection:{},year:{}};let Qt=class extends O{constructor(){super(...arguments),this.selectedLetter=null,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return(e=this.selectedLetter)===null||e===void 0?void 0:e.toUpperCase()}render(){return p`
      <div id="container">
        <ul>
          ${this.alphabet.map(e=>p`
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
    `}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}};Qt.styles=f`
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
  `;n([u({type:String})],Qt.prototype,"selectedLetter",void 0);Qt=n([D("alpha-bar")],Qt);const Dr=z`
<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg"><path d="m50 0 50 55h-100z"/></svg>
`,Cs=z`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,xs=z`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,Ss=z`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let V=class extends O{constructor(){super(...arguments),this.sortDirection=null,this.selectedSort=L.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.showRelevance=!0,this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.desktopSelectorBarWidth=0,this.selectorBarContainerWidth=0,this.hoveringOverDateSortOptions=!1,this.boundDateSelectorEscapeListener=e=>{e.key==="Escape"&&(this.dateSortSelectorVisible=!1)}}render(){return p`
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

        ${this.dateSortSelectorVisible&&!this.mobileSelectorVisible?this.dateSortSelector:k}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedSort")&&this.sortDirection===null&&(this.sortDirection="desc"),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dateSortSelectorVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dateSortSelectorVisible?document.addEventListener("keydown",this.boundDateSelectorEscapeListener):document.removeEventListener("keydown",this.boundDateSelectorEscapeListener)}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){e.removeObserver({target:this.sortSelectorContainer,handler:this}),e.removeObserver({target:this.desktopSortSelector,handler:this})}setupResizeObserver(){!this.resizeObserver||(this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.resizeObserver.addObserver({target:this.desktopSortSelector,handler:this}))}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSelectorBarWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return k;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return k}handleResize(e){e.target===this.desktopSortSelector?this.desktopSelectorBarWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get sortDirectionSelectorTemplate(){return p`
      <div id="sort-direction-selector">
        <button
          id="sort-ascending-btn"
          class="sort-button ${this.sortDirection==="asc"?"selected":""}"
          ?disabled=${this.selectedSort==="relevance"}
          @click=${()=>{this.setSortDirections("asc")}}
        >
          ${Dr}
        </button>
        <button
          id="sort-descending-btn"
          class="sort-button ${this.sortDirection==="desc"?"selected":""}"
          ?disabled=${this.selectedSort==="relevance"}
          @click=${()=>{this.setSortDirections("desc")}}
        >
          ${Dr}
        </button>
      </div>
    `}get desktopSortSelectorTemplate(){return p`
      <ul
        id="desktop-sort-selector"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <li id="sort-by-text">Sort By</li>
        <li>
          ${this.showRelevance?this.getSortDisplayOption(L.relevance):k}
        </li>
        <li>${this.getSortDisplayOption(L.views)}</li>
        <li>
          ${this.getSortDisplayOption(L.title,{clickEvent:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(L.title),this.emitCreatorLetterChangedEvent()}})}
        </li>
        <li>
          ${this.getSortDisplayOption(L.date,{clickEvent:()=>{this.dateOptionSelected||this.setSelectedSort(L.date),this.dateSortSelectorVisible=!this.dateSortSelectorVisible,this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()},displayName:p`${this.dateSortField}`,isSelected:()=>this.dateOptionSelected})}
        </li>
        <li>
          ${this.getSortDisplayOption(L.creator,{clickEvent:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(L.creator),this.emitTitleLetterChangedEvent()}})}
        </li>
      </ul>
    `}getSortDisplayOption(e,t){var i,r;const a=(i=t==null?void 0:t.isSelected)!==null&&i!==void 0?i:()=>this.selectedSort===e,s=(r=t==null?void 0:t.displayName)!==null&&r!==void 0?r:yt[e];return p`
      <a
        href="#"
        @click=${l=>{l.preventDefault(),t!=null&&t.clickEvent?t.clickEvent(l):(this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.setSelectedSort(e),this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent())}}
        class=${a()?"selected":""}
      >
        ${s}
      </a>
    `}get mobileSortSelectorTemplate(){return p`
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${Object.keys(L).map(e=>p`
            <option value="${e}" ?selected=${this.selectedSort===e}>
              ${yt[e]}
            </option>
          `)}
      </select>
    `}mobileSortChanged(e){const t=e.target;this.setSelectedSort(t.value)}get displayOptionTemplate(){return p`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
          >
            ${Cs}
          </button>
        </li>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="list-detail"}}
            class=${this.displayMode==="list-detail"?"active":""}
          >
            ${xs}
          </button>
        </li>
        <li>
          <button
            id="list-button"
            @click=${()=>{this.displayMode="list-compact"}}
            class=${this.displayMode==="list-compact"?"active":""}
          >
            ${Ss}
          </button>
        </li>
      </ul>
    `}get dateSortSelector(){return p`
      <div
        id="date-sort-selector-backdrop"
        @keyup=${()=>{this.dateSortSelectorVisible=!1}}
        @click=${()=>{this.dateSortSelectorVisible=!1}}
      ></div>
      <div id="date-sort-selector">
        <ul>
          <li>${this.getDateSortButton(L.datearchived)}</li>
          <li>${this.getDateSortButton(L.date)}</li>
          <li>${this.getDateSortButton(L.datereviewed)}</li>
          <li>${this.getDateSortButton(L.dateadded)}</li>
        </ul>
      </div>
    `}getDateSortButton(e){return p`
      <button
        @click=${()=>{this.selectDateSort(e)}}
        class=${this.selectedSort===e?"selected":""}
      >
        ${yt[e]}
      </button>
    `}selectDateSort(e){this.dateSortSelectorVisible=!1,this.setSelectedSort(e)}setSortDirections(e){this.sortDirection=e,this.emitSortChangedEvent()}setSelectedSort(e){this.selectedSort=e,this.emitSortChangedEvent()}get dateOptionSelected(){return[L.datearchived,L.date,L.datereviewed,L.dateadded].includes(this.selectedSort)}get dateSortField(){var e;const t=yt[L.date];return this.dateOptionSelected&&(e=yt[this.selectedSort])!==null&&e!==void 0?e:t}get titleSelectorBar(){return p` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){return p` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}};V.styles=f`
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
  `;n([u({type:String})],V.prototype,"displayMode",void 0);n([u({type:String})],V.prototype,"sortDirection",void 0);n([u({type:String})],V.prototype,"selectedSort",void 0);n([u({type:String})],V.prototype,"selectedTitleFilter",void 0);n([u({type:String})],V.prototype,"selectedCreatorFilter",void 0);n([u({type:Boolean})],V.prototype,"showRelevance",void 0);n([u({type:Object})],V.prototype,"resizeObserver",void 0);n([M()],V.prototype,"alphaSelectorVisible",void 0);n([M()],V.prototype,"dateSortSelectorVisible",void 0);n([M()],V.prototype,"desktopSelectorBarWidth",void 0);n([M()],V.prototype,"selectorBarContainerWidth",void 0);n([M()],V.prototype,"hoveringOverDateSortOptions",void 0);n([G("#desktop-sort-selector")],V.prototype,"desktopSortSelector",void 0);n([G("#sort-selector-container")],V.prototype,"sortSelectorContainer",void 0);V=n([D("sort-filter-bar")],V);const Br=z`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,Hr=z`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let H=class extends O{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return p`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${Br}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${Hr}</span
        >
      </button>
      ${this.popupTemplate}
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){!this.isOpen||this.positionPopup()}handleScroll(){!this.isOpen||this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e!=null?e:this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){!this.recaptchaManager||(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted||(this.resetState(),this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.betaButton.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,r=window.innerHeight,a=i/2,s=r/2;e.left<a?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<s?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.closePopup()}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get popupTemplate(){return p`
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
                ${Br}
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
                ${Hr}
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
            ${this.error?p`<div id="error">${this.error}</div>`:k}
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
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.vote=this.vote==="up"?void 0:"up"}downvoteButtonSelected(){this.vote=this.vote==="down"?void 0:"down"}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.closePopup())}cancel(e){e.preventDefault(),this.vote=void 0,this.closePopup()}async submit(e){if(e.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=p`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");this.processing=!0;try{const t=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:t})).success?(this.voteSubmitted=!0,this.closePopup()):this.error=p`There was an error submitting your feedback.`}catch(t){this.error=p`There was an error submitting your feedback.<br />Error:
        ${t instanceof Error?t.message:t}`}this.processing=!1}static get styles(){const e=f`var(--featureFeedbackBlueColor, #194880)`,t=f`var(--featureFeedbackDarkGrayColor, #767676)`,i=f`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=f`var(--featureFeedbackBackdropZindex, 5)`,a=f`var(--featureFeedbackModalZindex, 6)`,s=f`var(--featureFeedbackPopupBorderColor, ${e})`,l=f`var(--featureFeedbackSubmitButtonColor, ${e})`,c=f`var(--featureFeedbackBetaButtonBorderColor, ${e})`,h=f`var(--featureFeedbackBetaButtonTextColor, ${e})`,v=f`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,g=f`var(--featureFeedbackCancelButtonColor, #515151)`,b=f`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,S=f`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,$=f`var(--featureFeedbackPromptFontWeight, bold)`,T=f`var(--featureFeedbackPromptFontSize, 14px)`,P=f`var(--defaultColor, ${t});`,R=f`var(--defaultColorSvgFilter, ${i});`,ee=f`var(--upvoteColor, #23765D);`,oe=f`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,W=f`var(--downvoteColor, #720D11);`,ye=f`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,ce=f`var(--unselectedColor, #CCCCCC);`,he=f`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return f`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${h};
        border: 1px solid ${c};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${v};
      }

      .beta-button-thumb.unselected svg {
        filter: ${he};
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
        background-color: ${b};
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
        background-color: ${S};
        border: 1px ${s} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${a};
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
        font-size: ${T};
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
        background-color: ${g};
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
        border-color: ${P};
      }

      .vote-button.noselection svg {
        filter: ${R};
      }

      .vote-button.unselected {
        border-color: ${ce};
      }

      .vote-button.unselected svg {
        filter: ${he};
      }

      .upvote-button.selected {
        border-color: ${ee};
      }

      .upvote-button.selected svg {
        filter: ${oe};
      }

      .downvote-button.selected {
        border-color: ${W};
      }

      .downvote-button.selected svg {
        filter: ${ye};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `}};n([u({type:String})],H.prototype,"featureIdentifier",void 0);n([u({type:String})],H.prototype,"prompt",void 0);n([u({type:String})],H.prototype,"buttonText",void 0);n([u({type:Object})],H.prototype,"recaptchaManager",void 0);n([u({type:Object})],H.prototype,"resizeObserver",void 0);n([u({type:Boolean})],H.prototype,"disabled",void 0);n([u({type:Object})],H.prototype,"featureFeedbackService",void 0);n([G("#beta-button")],H.prototype,"betaButton",void 0);n([G("#popup")],H.prototype,"popup",void 0);n([M()],H.prototype,"isOpen",void 0);n([M()],H.prototype,"processing",void 0);n([M()],H.prototype,"popupTopX",void 0);n([M()],H.prototype,"popupTopY",void 0);n([M()],H.prototype,"vote",void 0);n([M()],H.prototype,"voteSubmitted",void 0);n([M()],H.prototype,"error",void 0);n([M()],H.prototype,"voteNeedsChoosing",void 0);n([M()],H.prototype,"recaptchaWidget",void 0);n([G("#comments")],H.prototype,"comments",void 0);H=n([D("feature-feedback")],H);var $s=z`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,ks=z`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`,go=z`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`;let J=class extends O{constructor(){super(...arguments),this.showMoreContent=!1,this.aggr=[],this.castedBuckets=[],this.allFacetGroups=[],this.pageNumber=1,this.facetsPerPage=25}updated(e){(e.has("query")||e.has("aggr"))&&this.filterFacets()}async filterFacets(){var e;Object.entries((e=this.aggr)!==null&&e!==void 0?e:[]).forEach(([t,i])=>{if(t==="year_histogram")return;const a=t.split("__")[2];this.selectedFacet=a.split(":")[1],this.castedBuckets=i.buckets})}get renderPaginations(){const e=[],i=Object.keys(this.castedBuckets).length/this.facetsPerPage,r=s=>{this.pageClick(s)};let a=1;for(a=1;a<=i;a++)this.pageNumber===a?e.push(p`<a class="page-number current-page">${a}</a>`):e.push(p`<a class="page-number" href="#${a}" @click="${r}">${a}</a>`);return e}pageClick(e){e.stopPropagation(),e.preventDefault();const t=e.target,{textContent:i,dataset:r}=t;i&&(this.pageNumber=parseInt(i))}get renderMoreFacets(){var e;const t=(this.pageNumber-1)*this.facetsPerPage,i=t+this.facetsPerPage-1;return p`<ul class="facet-list">
      ${(e=this.castedBuckets)===null||e===void 0?void 0:e.map((r,a)=>{const s=a>=t&&a<=i?"farow":"farow hidden";return p`
          <li class=${s}>
            <div class="facet-row">
              <input
                type="checkbox"
                class="selected-facets"
                name="${r.key}"
                value="${r.key}"
                data-facet="${this.selectedFacet}"
                @click=${l=>{this.facetClicked(l)}}
              />
              <label
                class="facet-info-display"
                title=${r.key}
              >
                <div class="facet-title">${r.key}</div>
                <div class="facet-count">${r.doc_count}</div>
              </label>
            </div>
          </li>`})}`}facetClicked(e){const{selectedFacets:t}=this,i=e.target,{checked:r,value:a,dataset:s}=i,l=s.facet;let c;t?c=ae({},t):c=At,r?c[l][a]="selected":delete c[l][a],this.selectedFacets=c,console.log(c)}render(){return p`<div id="morf-page">
      <form>
        <div class="facets-content">
          ${this.renderMoreFacets}
        </div>
        <div class="facets-paging">
          ${this.renderPaginations}
        </div>
        <center>
          <input class="btn btn-archive}" type="button"
            value="Apply your filters" @click=${this.submitClick} />
        </center>
      </form>
    </div>`}submitClick(e){var t;const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(i),(t=this.modalManager)===null||t===void 0||t.closeModal()}static get styles(){return f`
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }

      .facets-content {
        -webkit-column-width: 250px;
        -moz-column-width: 250px;
        column-width: 250px;
        font-size: 12px;
        padding: 0 20px;
      }

      .facets-paging {
        margin: 15px;
        background-color: #efefef;
        text-align: right;
        padding: 10px;
      }
      .facets-paging .topinblock {
        background-color: #fafafa;
        margin-top:-7px;
        margin-bottom:-7px;
        display: inline-block;
      }

      .farow {
        width: 100%;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 500;
      }
      .farow.hidden {
        display: none;
      }

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul.facet-list li {
        margin-bottom: 0.2rem;
      }
      .facet-row {
        text-align: left;
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
      .page-number {
        padding: 5px;
        color: blue;
      }
      .current-page {
        background: white;
        padding: 5px;
        color: initial;
      }
      .loading {
        font-style: italic;
        text-align: center;
      }
      .loading img {
        width: 25px;
      }
    `}};n([u({type:String})],J.prototype,"content",void 0);n([u({type:String})],J.prototype,"query",void 0);n([u({type:Boolean})],J.prototype,"showMoreContent",void 0);n([u({type:Object})],J.prototype,"selectedFacets",void 0);n([u({type:Object})],J.prototype,"modalManager",void 0);n([u({type:Object})],J.prototype,"searchService",void 0);n([u({type:Object})],J.prototype,"aggr",void 0);n([u({type:Object})],J.prototype,"castedBuckets",void 0);n([u({type:Object})],J.prototype,"selectedFacet",void 0);n([u({type:Object})],J.prototype,"languageCodeHandler",void 0);n([u({type:Object})],J.prototype,"allFacetGroups",void 0);n([M()],J.prototype,"pageNumber",void 0);J=n([D("facets-more-content")],J);const _s=["mediatype","year","subject","collection","creator","language"],Ts={subjectSorter:"subject",mediatypeSorter:"mediatype",languageSorter:"language",creatorSorter:"creator",collection:"collection",year:"year"},Ur={subject:"Subject",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year"};let U=class extends O{constructor(){super(...arguments),this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.showMoreContent=!0,this.openFacets={subject:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1}}render(){return p`
      <div id="container" class="${this.facetsLoading?"loading":""}">
        ${this.showHistogramDatePicker&&this.fullYearsHistogramAggregation?p`
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            `:k}
        ${this.mergedFacets.map(e=>this.getFacetGroupTemplate(e))}
      </div>
    `}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get currentYearsHistogramAggregation(){var e;return(e=this.aggregations)===null||e===void 0?void 0:e.year_histogram}get histogramTemplate(){return p``}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail,r=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(r)}get mergedFacets(){const e=[];return _s.forEach(t=>{var i;const r=this.selectedFacetGroups.find(c=>c.key===t),a=this.aggregationFacetGroups.find(c=>c.key===t);if(r&&!a){e.push(r);return}if(!a)return;const s=r!=null?r:a,l=(i=r==null?void 0:r.buckets.map(c=>{const h=a.buckets.find(v=>v.key===c.key);return h?mt(ae({},c),{count:h.count}):c}))!==null&&i!==void 0?i:[];a.buckets.forEach(c=>{l.find(v=>v.key===c.key)||l.push(c)}),s.buckets=l.splice(0,5),e.push(s)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const r=t,a=Ur[r],s=Object.entries(i).map(([l,c])=>{var h,v;let g=l;return r==="language"&&(g=(v=(h=this.languageCodeHandler)===null||h===void 0?void 0:h.getLanguageNameFromCodeString(l))!==null&&v!==void 0?v:l),{displayText:g,key:l,count:0,state:c}});return{title:a,key:r,buckets:s}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,r])=>{if(i==="year_histogram")return;const a=this.getFacetOptionFromKey(i),s=Ur[a],c=r.buckets.map(v=>{var g,b;let S=v.key;return a==="language"&&(S=(b=(g=this.languageCodeHandler)===null||g===void 0?void 0:g.getCodeStringFromLanguageName(`${v.key}`))!==null&&b!==void 0?b:v.key),{displayText:`${v.key}`,key:`${S}`,count:v.doc_count,state:"none"}}),h={title:s,key:a,buckets:c};t.push(h)}),t}getFacetGroupTemplate(e){if(e.buckets.length===0)return k;const{key:t}=e,i=this.openFacets[t],r=p`
      <span class="collapser ${i?"open":""}"> ${go} </span>
    `;return p`
      <div class="facet-group ${this.collapsableFacets?"mobile":""}">
        <h1
          @click=${()=>{const a=ae({},this.openFacets);a[t]=!i,this.openFacets=a}}
          @keyup=${()=>{const a=ae({},this.openFacets);a[t]=!i,this.openFacets=a}}
        >
          ${this.collapsableFacets?r:k} ${e.title}
        </h1>
        <div class="facet-group-content ${i?"open":""}">
          ${this.getFacetTemplate(e)}
          <button
            @click=${a=>{this.emitMoreLinkClickedEvent(e)}}
          >
            More...
          </button>
        </div>
      </div>
    `}async fetchSpecificFacets(e){var t,i;const a={query:"title:hello",fields:["identifier"],aggregations:{advancedParams:[{field:e,size:250}]},rows:1},s=await((t=this.searchService)===null||t===void 0?void 0:t.search(a));this.aggr=(i=s==null?void 0:s.success)===null||i===void 0?void 0:i.response.aggregations}async emitMoreLinkClickedEvent(e){const t=new Ui;t.headline=p`${e.key}`,t.closeOnBackdropClick=!0,await this.fetchSpecificFacets(e.key),console.log("fetchSpecificFacets"),t.message=p`
      <facets-more-content
        .query=${e.key}
        .aggr=${this.aggr}
        .modalManager=${this.modalManager}
        .selectedFacets=${this.selectedFacets}
        ?showMoreContent=${this.showMoreContent}>
      </facets-more-content>
    `,this.modalManager.showModal({config:t})}getFacetTemplate(e){const i=e.buckets.filter(r=>r.key.startsWith("fav-")===!1).slice(0,6);return p`
      <modal-manager></modal-manager>
      <ul class="facet-list">
        ${no(i,r=>`${e.key}:${r.key}`,r=>{var a,s;const l=`${e.key}:${r.key}-show-only`,c=`${e.key}:${r.key}-negative`,h=e.key!=="collection"?p`${(a=r.displayText)!==null&&a!==void 0?a:r.key}`:p`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${r.key}
                      placeholder="-"
                    ></async-collection-name>
                  `,v=r.state==="hidden",g=r.state==="selected",b=`${e.key}: ${(s=r.displayText)!==null&&s!==void 0?s:r.key}`,S=g?`Show all ${e.key}s`:`Only show ${b}`,$=`Hide ${b}`,T=`Unhide ${b}`,P=v?T:$;return p`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${e.key}
                      .value=${r.key}
                      @click=${R=>{this.facetClicked(R,r,!1)}}
                      .checked=${g}
                      class="select-facet-checkbox"
                      title=${S}
                      id=${l}
                    />
                    <input
                      type="checkbox"
                      id=${c}
                      .name=${e.key}
                      .value=${r.key}
                      @click=${R=>{this.facetClicked(R,r,!0)}}
                      .checked=${v}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${c}
                      class="hide-facet-icon"
                      title=${P}
                    >
                      ${v?ks:$s}
                    </label>
                  </div>

                  <label
                    for=${l}
                    class="facet-info-display"
                    title=${S}
                  >
                    <div class="facet-title">${h}</div>
                    <div class="facet-count">${r.count}</div>
                  </label>
                </div>
              </li>
            `})}
      </ul>
    `}facetClicked(e,t,i){const r=e.target,{checked:a,name:s,value:l}=r;a?this.facetChecked(s,l,i):this.facetUnchecked(s,l)}facetChecked(e,t,i){const{selectedFacets:r}=this;let a;r?a=ae({},r):a=At,a[e][t]=i?"hidden":"selected",this.selectedFacets=a}facetUnchecked(e,t){const{selectedFacets:i}=this;let r;i?r=ae({},i):r=At,delete r[e][t],this.selectedFacets=r}getFacetOptionFromKey(e){const r=e.split("__")[2].split(":")[1],a=Object.entries(Ts).find(([l])=>r.includes(l)),s=a==null?void 0:a[1];if(!s)throw new Error(`Could not find facet option for key: ${e}`);return s}static get styles(){return f`
      #container.loading {
        opacity: 0.5;
      }

      /* add the following styles to ensure proper modal visibility */
      body.modal-manager-open {
        overflow: hidden;
      }
  
      modal-manager {
        display: none;
        --modalWidth: 85rem;
      }
  
      modal-manager[mode='open'] {
        display: block;
      }
  
      #content-container {
        display: flex;
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
    `}};n([u({type:Object})],U.prototype,"aggregations",void 0);n([u({type:Object})],U.prototype,"fullYearsHistogramAggregation",void 0);n([u({type:String})],U.prototype,"minSelectedDate",void 0);n([u({type:String})],U.prototype,"maxSelectedDate",void 0);n([u({type:Boolean})],U.prototype,"facetsLoading",void 0);n([u({type:Boolean})],U.prototype,"fullYearAggregationLoading",void 0);n([u({type:Object})],U.prototype,"selectedFacets",void 0);n([u({type:Boolean})],U.prototype,"collapsableFacets",void 0);n([u({type:Boolean})],U.prototype,"showHistogramDatePicker",void 0);n([u({type:Object})],U.prototype,"searchService",void 0);n([u({type:Object})],U.prototype,"languageCodeHandler",void 0);n([u({type:Object})],U.prototype,"collectionNameCache",void 0);n([u({type:Boolean})],U.prototype,"showMoreContent",void 0);n([M()],U.prototype,"openFacets",void 0);n([G("modal-manager")],U.prototype,"modalManager",void 0);n([M()],U.prototype,"aggr",void 0);U=n([D("collection-facets")],U);let jr=class extends O{render(){return p`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=f`var(--circularActivityIndicatorColor, dodgerblue)`,t=f`var(--circularActivityIndicatorThickness, 4px)`;return f`
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
    `}};jr=n([D("circular-activity-indicator")],jr);/*! typescript-cookie v1.0.3 | MIT */const fo=o=>encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),bo=o=>encodeURIComponent(o).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),ji=decodeURIComponent,Vi=o=>(o[0]==='"'&&(o=o.slice(1,-1)),o.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function As(o){return o=Object.assign({},o),typeof o.expires=="number"&&(o.expires=new Date(Date.now()+o.expires*864e5)),o.expires!=null&&(o.expires=o.expires.toUTCString()),Object.entries(o).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function yo(o,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,r={};let a;for(;(a=i.exec(document.cookie))!=null;)try{const s=t(a[1]);if(r[s]=e(a[2],s),o===s)break}catch{}return o!=null?r[o]:r}const Vr=Object.freeze({decodeName:ji,decodeValue:Vi,encodeName:fo,encodeValue:bo}),Wi=Object.freeze({path:"/"});function Gt(o,e,t=Wi,{encodeValue:i=bo,encodeName:r=fo}={}){return document.cookie=`${r(o)}=${i(e,o)}${As(t)}`}function Ri(o,{decodeValue:e=Vi,decodeName:t=ji}={}){return yo(o,e,t)}function Ms({decodeValue:o=Vi,decodeName:e=ji}={}){return yo(void 0,o,e)}function Ls(o,e=Wi){Gt(o,"",Object.assign({},e,{expires:-1}))}function Ii(o,e){const t={set:function(r,a,s){return Gt(r,a,Object.assign({},this.attributes,s),{encodeValue:this.converter.write})},get:function(r){if(arguments.length===0)return Ms(this.converter.read);if(r!=null)return Ri(r,this.converter.read)},remove:function(r,a){Ls(r,Object.assign({},this.attributes,a))},withAttributes:function(r){return Ii(this.converter,Object.assign({},this.attributes,r))},withConverter:function(r){return Ii(Object.assign({},this.converter,r),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(o)}};return Object.create(t,i)}Ii({read:Vr.decodeValue,write:Vr.encodeValue},Wi);class Es{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";Gt(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";Gt(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=Ri(`view-${this.context}`),t=Ri(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e){const t=new URL(window.location.href),{searchParams:i}=t;if(i.delete("sort"),i.delete("query"),i.delete("page"),i.delete("and[]"),i.delete("not[]"),e.sortParam){const r=e.sortParam.direction==="desc"?"-":"";i.set("sort",`${r}${e.sortParam.field}`)}if(e.baseQuery&&i.set("query",e.baseQuery),e.currentPage&&(e.currentPage>1?i.set("page",e.currentPage.toString()):i.delete("page")),e.selectedFacets)for(const[r,a]of Object.entries(e.selectedFacets)){const s=Object.entries(a);if(s.length!==0)for(const[l,c]of s){const h=c==="hidden",v=`${r}:"${l}"`;h?i.append("not[]",v):i.append("and[]",v)}}e.dateRangeQueryClause&&i.append("and[]",e.dateRangeQueryClause),e.titleQuery&&i.append("and[]",e.titleQuery),e.creatorQuery&&i.append("and[]",e.creatorQuery),window.history.pushState({sort:e.sortParam,query:e.baseQuery,page:e.currentPage,and:e.selectedFacets,not:e.selectedFacets,dateRange:e.dateRangeQueryClause},"",t)}loadQueryStateFromUrl(){const e=new URL(window.location.href),t=e.searchParams.get("page"),i=e.searchParams.get("query"),r=e.searchParams.get("sort"),a=e.searchParams.getAll("and[]"),s=e.searchParams.getAll("not[]"),l={selectedFacets:{subject:{},creator:{},mediatype:{},language:{},collection:{},year:{}}};if(t){const c=parseInt(t,10);l.currentPage=c}else l.currentPage=1;if(i&&(l.baseQuery=i),r)if(r.indexOf(" ")>-1){const[h,v]=r.split(" "),g=Ir[h];g&&(l.selectedSort=g),(v==="desc"||v==="asc")&&(l.sortDirection=v)}else{const h=r.startsWith("-")?"desc":"asc",v=r.startsWith("-")?r.slice(1):r,g=Ir[v];g&&(l.selectedSort=g),l.sortDirection=h}return a&&a.forEach(c=>{const[h,v]=c.split(":"),g=this.stripQuotes(v);switch(h){case"year":{const[b,S]=v.split(" TO ");b&&S?(l.minSelectedDate=b.substring(1,b.length),l.maxSelectedDate=S.substring(0,S.length-1),l.dateRangeQueryClause=`year:${v}`):l.selectedFacets[h][g]="selected";break}case"firstTitle":l.selectedTitleFilter=v;break;case"firstCreator":l.selectedCreatorFilter=v;break;default:l.selectedFacets[h][g]="selected"}}),s&&s.forEach(c=>{const[h,v]=c.split(":"),g=this.stripQuotes(v);l.selectedFacets[h][g]="hidden"}),l}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}}const Si={"ambient noise wall":"Music","american english":"English","arabic videos":"Arabic","arabic, english":"Arabic and English","de-formal":"German","en-ca":"English","en-gb":"English","en-us":"English","eng-fre":"English and French","eng;fre":"English and French","english handwritten":"Handwritten English","english-handwritten":"Handwritten English","english, polski":"English and Polish","english, spanish":"English and Spanish","english; finnish":"English and Finnish","english/french":"English and French","finnish, english":"English and Finnish","finnish; english":"English and Finnish","french-handwritten":"Handwritten French","german-handwritten":"Handwritten German","hebrew-handwritten":"Handwritten Hebrew","language not encoded":"Unknown","miscellaneous languages":"Multiple","n/a":"Unknown","no language":"skip","no linguistic content":"skip","no speech":"skip","polish-handwritten":"Handwritten Polish","pt-br":"Portuguese","spanish-handwritten":"Handwritten Spanish","us english":"English","www.back4allah.com":"Arabic","www.rabania.com":"Arabic","www.way2allah.com":"Arabic","yiddish-handwritten":"Handwritten Yiddish","zh-cn":"Chinese","zh-tw":"Chinese","\u0623\u0648\u0631\u062F\u0648 ::: Urdu":"Urdu","\u0628\u0634\u062A\u0648 ::: Pashto":"Pashto","\u0639\u0631\u0628\u064A\u0629 ::: arabic":"Arabic","\u0639\u0631\u0628\u064A\u0629 ::: Arabic":"Arabic","\u0639\u0631\u0628\u064A\u0629 \u0645\u0639 \u062A\u0631\u062C\u0645\u0629 \u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 ::: Arabic with English subtitles":"Arabic with English subtitles",aar:"Afar",abk:"Abkhaz",adl:"Galo",ady:"Adyghe",afr:"Afrikaans",aka:"Akan",akk:"Akkadian",alb:"Albanian",ale:"Aleut",alg:"Algonquian",american:"English",amh:"Amharic",ang:"Old English",anm:"Anal",anq:"Jarawa",apa:"Apache languages",apt:"Apatani",ar:"Arabic",ara:"Arabic",arab:"Arabic",arabe:"Arabic",arbc:"Arabic",arbic:"Arabic",arc:"Aramaic",arg:"Aragonese",arm:"Armenian",arp:"Arapaho",asm:"Assamese",ast:"Asturian",ath:"Athapascan (Other)",awa:"Awadhi",aym:"Aymara",aze:"Azerbaijani",bak:"Bashkir",bal:"Baluchi",ban:"Balinese",baq:"Basque",bel:"Belarusian",bem:"Bemba",ben:"Bengali",ber:"Berber",bft:"Balti",bfy:"Bagheli",bgw:"Bhatri",bhb:"Bhili",bho:"Bhojpuri",bih:"Bihari",bis:"Bislama",bkk:"Brokskat",bla:"Blackfoot",bns:"Bundeli",bnt:"Bantu",bos:"Bosnian",bra:"Braj",bre:"Breton",brx:"Bodo",bua:"Buryat",bul:"Bulgarian",bur:"Burmese",cai:"Central American Indian",caq:"Car",car:"Carib",cat:"Catalan",cau:"Caucasian",ceb:"Cebuano",ces:"Czech",cha:"Chamorro",che:"Chechen",chi:"Chinese",chm:"Mari",chn:"Chinook jargon",cho:"Choctaw",chp:"Chipewyan",chr:"Cherokee",chu:"Church Slavic",chv:"Chuvash",chy:"Cheyenne",clk:"Idu-Mishmi",cmn:"Mandarin Chinese",cop:"Coptic",cor:"Cornish",cos:"Corsican",cpe:"Creoles and Pidgins, English-based",cpf:"Creoles and Pidgins, French-based",cpp:"Creoles and Pidgins, Portuguese-based",cre:"Cree",crh:"Crimean Tatar",cro:"Croatian",crp:"Creoles and Pidgins",cs:"Czech",csb:"Kashubian",cym:"Welsh",cze:"Czech",da:"Danish",dak:"Dakota",dan:"Danish",dar:"Dargwa",de:"German",del:"Delaware",deu:"German",deutsch:"German",dgo:"Dogri",dih:"Dhivehi",doi:"Dogri (Generic)",dra:"Dravidian (Other)",dsb:"Lower Sorbian",dum:"Middle Dutch",dut:"Dutch",dzo:"Dzongkha",egy:"Egyptian",el:"Greek",ell:"Greek",emg:"English",en_us:"English",en:"English",eng:"English",engfre:"English and French",engilsh:"English",english:"English",enm:"Middle English",epo:"Esperanto",es:"Spanish",esk:"Eskimo",esp:"Esperanto",espanol:"Spanish",espa\u00F1ol:"Spanish",est:"Estonian",eth:"Ethiopic",eus:"Basque",fa:"Persian",fao:"Faroese",far:"Faroese",fas:"Persian",fi:"Finnish",fij:"Fijian",fil:"Filipino",fin:"Finnish",fle:"Dutch",fr:"French",fra:"French",francais:"French",fran\u00E7ais:"French",fre:"French",fri:"Frisian",frm:"Middle French",fro:"Old French",frr:"North Frisian",fry:"Frisian",fur:"Friulian",gaa:"G\xE3",gac:"Mixed Great Andamanese",gae:"Scottish Gaelic",gag:"Galician",gbl:"Gamit",gem:"Germanic",geo:"Georgian",ger:"German",gez:"Ethiopic",gil:"Gilbertese",gju:"Gujari",gla:"Scottish Gaelic",gle:"Irish",glg:"Galician",glv:"Manx",gmh:"Middle High German",goh:"Old German",gon:"Gondi",got:"Gothic",grb:"Grebo",grc:"Ancient Greek",gre:"Greek",grn:"Guarani",grt:"Garo",gsw:"Swiss German",gua:"Guarani",guj:"Gujarati",gwi:"Gwichin",hai:"Haida",hat:"Haitian French Creole",hau:"Hausa",haw:"Hawaiian",he:"Hebrew",heb:"Hebrew",hin:"Hindi",hlb:"Halbi",hmn:"Hmong",hmr:"Hmar",hne:"Chhattisgarhi",hoc:"Ho",hrv:"Croatian",hsb:"Upper Sorbian",hu:"Hungarian",hun:"Hungarian",ibo:"Igbo",ice:"Icelandic",ido:"Ido",iku:"Inuktitut",ile:"Interlingue",ilo:"Iloko",ina:"Interlingua",inc:"Indic (Other)",ind:"Indonesian",inh:"Ingush",int:"Interlingua",ipk:"Inupiaq",ira:"Iranian",iri:"Irish",iro:"Iroquoian",iru:"Irula",isl:"Icelandic",ita:"Italian",jam:"Music",jap:"Japanese",jav:"Javanese",jpn:"Japanese",jrb:"Judeo-Arabic",kaa:"Karakalpak",kab:"Kabyle",kal:"Kalatdlisut",kan:"Kannada",kar:"Karen",kas:"Kashmiri",kaz:"Kazakh",kbd:"Kabardian",kfa:"Kodava",kfb:"Northwestern Kolami",kfe:"Kota (India)",kff:"Koya",kfq:"Korku",kha:"Khasi",khm:"Khmer",kho:"Khotanese",khr:"Kharia",kik:"Kikuyu",kin:"Kinyarwanda",kir:"Kyrgyz",kix:"Khiamniungan Naga",kmj:"Kumarbhag Paharia",kmm:"Kom (India)",ko:"Korean",kok:"Konkani",kon:"Kongo",kor:"Korean",kpe:"Kpelle",krc:"Karachay-Balkar",kro:"Kru",kru:"Kurukh",ksh:"K\xF6lsch",kum:"Kumyk",kur:"Kurdish",kxu:"Kui (India)",kxv:"Kuvi",kyw:"Kudmali",lad:"Ladino",lah:"Lahnda",lao:"Lao",lap:"Sami",lat:"Latin",lav:"Latvian",lbj:"Ladakhi",lep:"Lepcha",lez:"Lezgin",lim:"Limburgish",lin:"Lingala",lit:"Lithuanian",lmn:"Lambadi",lol:"Mongo-Nkundu",ltz:"Luxembourgish",lua:"Luba-Lulua",lub:"Luba-Katanga",lug:"Ganda",lus:"Lushai",mac:"Macedonian",mah:"Marshallese",mai:"Maithili",mal:"Malayalam",man:"Mandarin Chinese",mao:"Maori",map:"Austronesian",mar:"Marathi",max:"Manx",may:"Malay",mga:"Middle Irish",mha:"Manda (India)",mic:"Micmac",min:"Minankabaw",mis:"Miscellaneous languages",mjw:"Karbi",mkh:"Mon-Khmer",mla:"Malagasy",mlg:"Malagasy",mlt:"Maltese",mni:"Manipuri",moh:"Mohawk",mol:"Moldavian",mon:"Mongolian",mrg:"Mising",mul:"Multiple",mus:"Creek",mwr:"Marwari",myn:"Maya",nag:"Naga Pigdin",nah:"Nahuatl",nai:"North American Indian",nap:"Neapolitan",nau:"Nauru",nav:"Navajo",nbc:"Chang Naga",nbe:"Konyak Naga",nbi:"Mao Naga",nbl:"Ndebele",nbu:"Rongmei Naga",nds:"Low German",nep:"Nepali",new:"Newari",ng:"English",nic:"Niger-Kordofanian",njh:"Lotha Naga",njm:"Angami Naga",njn:"Liangmai Naga",njo:"Ao Naga",nkf:"Inpui Naga",nkh:"Khezha Naga",nld:"Dutch",nll:"Nihali",nma:"Maram Naga",nmf:"Tangkhul Naga",nno:"Norwegian (Nynorsk)",no:"skip",nob:"Norwegian (Bokm\xE5l)",nog:"Nogay",non:"Old Norse",none:"skip",nor:"Norwegian",nri:"Chokri Naga",nsa:"Sangtam Naga",nsm:"Sumi Naga",nso:"Northern Sotho",nya:"Nyanja",nzm:"Zeme Naga",oci:"Occitan",oji:"Ojibwa",oon:"\xD6nge",ori:"Oriya",orm:"Oromo",ory:"Odia",oss:"Ossetic",ota:"Ottoman Turkish",oto:"Otomian",paa:"Papuan",pag:"Pangasinan",pal:"Pahlavi",pam:"Pampanga",pan:"Panjabi",panjabi:"Punjabi",pap:"Papiamento",pbv:"Pnar",pci:"Duruwa",pck:"Paite Chin",per:"Persian",phi:"Philippine",pli:"Pali",pol:"Polish",por:"Portuguese",port:"Portuguese",portugues:"Portuguese",portugu\u00EAs:"Portuguese",pra:"Prakrit",pro:"Provencal",prx:"Purik",pus:"Pashto",qaa:"skip",que:"Quechua",rah:"Rabha",raj:"Rajasthani",roa:"Romance",roh:"Romansh",rom:"Romani",ron:"Romanian",rum:"Romanian",run:"Rundi",rus:"Russian",sag:"Sango",sah:"Yakut",sai:"South American Indian",sam:"Samaritan Aramaic",san:"Sanskrit",sao:"Samoan",sat:"Santali",scc:"Serbian",scl:"Shina",sco:"Scots",scots:"Scottish",scr:"Croatian",sdr:"Oraon Sadri",sel:"Selkup",sem:"Semitic",sga:"Old Irish",sho:"Shona",sin:"Sinhalese",sio:"Siouan",sip:"Sikkimese",sit:"Sino-Tibetan",sk:"Slovak",sla:"Slavic",slk:"Slovak",slo:"Slovak",slv:"Slovenian",sme:"Saami",smi:"Sami",smo:"Samoan",sms:"Skolt Sami",sna:"Shona",snd:"Sindhi",snh:"Sinhalese",som:"Somali",sot:"Sotho",spa:"Spanish",spain:"Spanish",spv:"Sambalpuri",sq:"Albanian",sqi:"Albanian",srb:"Sora",srp:"Serbian",sso:"Sotho",ssw:"Swazi",sun:"Sundanese",sux:"Sumerian",sv:"Swedish",svenska:"Swedish",swa:"Swahili",swe:"Swedish",swz:"Swazi",syc:"Syriac",syr:"Modern Syriac",tag:"Tagalog",tah:"Tahitian",taj:"Tajik",tam:"Tamil",tar:"Tatar",tat:"Tatar",tcy:"Tulu",tcz:"Thado Chin",tel:"Telugu",tem:"Temne",tgk:"Tajik",tgl:"Tagalog",tha:"Thai",tib:"Tibetan",tig:"Tigre",tir:"Tigrinya",tlh:"Klingon",tog:"Tonga",ton:"Tongan",tpi:"Tok Pisin",tr:"Turkish",trp:"Kok Borok",tsi:"Tsimshian",tsn:"Tswana",tso:"Tsonga",tsw:"Tswana",tuk:"Turkmen",tur:"Turkish",t\u00FCrk\u00E7e:"Turkish",tut:"Altaic",tyv:"Tuvinian",udm:"Udmurt",uig:"Uighur",uk:"Ukranian",ukr:"Ukrainian",und:"undetermined",undetermined:"skip",unknown:"skip",unr:"Mundari",urd:"Urdu",uzb:"Uzbek",vah:"Varhadi-Nagpuri",vap:"Vaiphei",vav:"Varli",ven:"Venda",vie:"Vietnamese",vol:"Volapu\u0308k",war:"Waray",wbr:"Wagdi",wel:"Welsh",wen:"Sorbian",wol:"Wolof",xal:"Oirat",xho:"Xhosa",xis:"Kisan (Dravidian)",xnr:"Kangri",xsr:"Solu-Khumbu Sherpa",yea:"Ravula",yid:"Yiddish",yim:"Yimchungru Naga",yor:"Yoruba",ypk:"Yupik languages",zap:"Zapotec",zh:"Chinese",zha:"Zhuang",zho:"Chinese",zom:"Zou",zul:"Zulu",zun:"Zuni",zxx:"No linguistic content",\u0420\u0443\u0441\u0441\u043A\u0438\u0439:"Russian",\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0438\u0439:"Ukranian",\u0627\u0644\u0639\u0631\u0628\u064A\u0629:"Arabic",\u0639\u0631\u0628\u064A:"Arabic"};class Os{constructor(){this.delimeter="|"}getLanguageNameFromCodeString(e){const t=this.getCodeArrayFromCodeString(e);if(t.length===0)return"";const i=t[0],r=Si[i];return r!=null?r:e}getCodeStringFromLanguageName(e){const t=Object.keys(Si).filter(r=>Si[r]===e);return t==null?void 0:t.join(this.delimeter)}getCodeArrayFromCodeString(e){return e.split(this.delimeter)}}let _=class extends O{constructor(){super(...arguments),this.baseImageUrl="https://archive.org",this.sortParam=null,this.selectedSort=L.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.pageSize=50,this.showHistogramDatePicker=!1,this.pageContext="search",this.restorationStateHandler=new Es({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.isManageView=!1,this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.mobileView=!1,this.mobileFacetsVisible=!1,this.languageCodeHandler=new Os,this.isScrollingToCell=!1,this.endOfDataReached=!1,this.isResizeToMobile=!1,this.placeholderCellTemplate=p`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.dataSource={},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.pageFetchesInProgress={}}tileModelAtCellIndex(e){var t;const i=Math.floor(e/this.pageSize)+1,r=e%this.pageSize,a=(t=this.dataSource[i])===null||t===void 0?void 0:t[r];return!a&&!this.isScrollingToCell&&this.fetchPage(i),a}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get estimatedTileCount(){return this.pagesToRender*this.pageSize}get actualTileCount(){return Object.keys(this.dataSource).reduce((e,t)=>e+this.dataSource[t].length,0)}goToPage(e){this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}clearFilters(){this.selectedFacets=At,this.sortParam=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.titleQuery=void 0,this.creatorQuery=void 0,this.selectedSort=L.relevance,this.sortDirection=null}render(){return p`
      <div id="content-container" class=${this.mobileView?"mobile":""}>
        <div
          id="left-column"
          class="column${this.isResizeToMobile?" preload":""}"
        >
          <div id="mobile-header-container">
            ${this.mobileView?this.mobileFacetsTemplate:k}
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
          ${this.searchResultsLoading?this.loadingTemplate:k}
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

          ${this.displayMode==="list-compact"?this.listHeaderTemplate:k}
          ${!this.searchResultsLoading&&this.totalResults===0?p`
                <h2>
                  Your search did not match any items in the Archive. Try
                  different keywords or a more general search.
                </h2>
              `:k}

          <infinite-scroller
            class="${Se(this.displayMode)}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `}userChangedSort(e){var t;const{selectedSort:i,sortDirection:r}=e.detail;this.selectedSort=i,this.sortDirection=r,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.goToPage(1),this.currentPage=1}selectedSortChanged(){if(this.selectedSort==="relevance"||this.sortDirection===null){this.sortParam=null;return}const e=ws[this.selectedSort];!e||(this.sortParam={field:e,direction:this.sortDirection})}displayModeChanged(e){this.displayMode=e.detail.displayMode}selectedTitleLetterChanged(){this.titleQuery=this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}selectedCreatorLetterChanged(){this.creatorQuery=this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get facetDataLoading(){return this.facetsLoading||this.fullYearAggregationLoading}get mobileFacetsTemplate(){return p`
      <div id="mobile-filter-collapse">
        <h1
          @click=${()=>{this.isResizeToMobile=!1,this.mobileFacetsVisible=!this.mobileFacetsVisible}}
          @keyup=${()=>{this.isResizeToMobile=!1,this.mobileFacetsVisible=!this.mobileFacetsVisible}}
        >
          <span class="collapser ${this.mobileFacetsVisible?"open":""}">
            ${go}
          </span>
          Filters
        </h1>
      </div>
    `}get facetsTemplate(){return p`
      ${this.facetsLoading?this.loadingTemplate:k}
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        @moreLinkClicked=${this.moreLinkClicked}
        .searchService=${this.searchService}
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
    `}get loadingTemplate(){return p`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `}get listHeaderTemplate(){return p`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
        >
        </tile-dispatcher>
      </div>
    `}get queryDebuggingTemplate(){var e,t;return p`
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
    `}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail;this.dateRangeQueryClause=`year:[${t} TO ${i}]`}async moreLinkClicked(e){const t=e.detail.key,i=new Ui;i.headline=p`Hi, Everybody!`,i.message=p`Hi, Doctor Nick!`,i.closeOnBackdropClick=!0,await Promise.all([this.fetchSpecificFacets(t)]),i.message=p`
      <facets-more-content
        .query=${t}
        .aggr=${this.aggr}>
      </facets-more-content>
    `,this.modalManager.showModal({config:i})}firstUpdated(){this.setupStateRestorationObserver(),this.restoreState()}updated(e){if((e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl"))&&this.infiniteScroller.reload(),e.has("baseQuery")&&this.emitBaseQueryChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("titleQuery")||e.has("creatorQuery")||e.has("dateRangeQueryClause")||e.has("sortParam")||e.has("selectedFacets")||e.has("searchService"))&&this.handleQueryChange(),(e.has("selectedSort")||e.has("sortDirection"))&&this.selectedSortChanged(),e.has("selectedTitleFilter")&&this.selectedTitleLetterChanged(),e.has("selectedCreatorFilter")&&this.selectedCreatorLetterChanged(),e.has("pagesToRender")&&(this.endOfDataReached||(this.infiniteScroller.itemCount=this.estimatedTileCount)),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler)}handleResize(e){const t=this.mobileView;e.target===this.contentContainer&&(this.mobileView=e.contentRect.width<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(t.length===0)return;const i=t[t.length-1],r=Math.floor(i/this.pageSize)+1;this.currentPage!==r&&(this.currentPage=r);const a=new CustomEvent("visiblePageChanged",{detail:{pageNumber:r}});this.dispatchEvent(a)}async handleQueryChange(){!this.searchService||this.pageFetchQueryKey===this.previousQueryKey||(this.previousQueryKey=this.pageFetchQueryKey,this.dataSource={},this.pageFetchesInProgress={},this.endOfDataReached=!1,this.pagesToRender=this.initialPageNumber,!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||(this.persistState(),this.historyPopOccurred=!1),await Promise.all([this.doInitialPageFetch(),this.fetchFacets(),this.fetchFullYearHistogram()]))}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this),window.addEventListener("popstate",this.boundNavigationHandler))}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,r,a,s;const l=this.restorationStateHandler.getRestorationState();this.displayMode=l.displayMode,this.selectedSort=(e=l.selectedSort)!==null&&e!==void 0?e:L.relevance,this.sortDirection=(t=l.sortDirection)!==null&&t!==void 0?t:null,this.selectedTitleFilter=(i=l.selectedTitleFilter)!==null&&i!==void 0?i:null,this.selectedCreatorFilter=(r=l.selectedCreatorFilter)!==null&&r!==void 0?r:null,this.selectedFacets=l.selectedFacets,this.baseQuery=l.baseQuery,this.titleQuery=l.titleQuery,this.creatorQuery=l.creatorQuery,this.dateRangeQueryClause=l.dateRangeQueryClause,this.sortParam=(a=l.sortParam)!==null&&a!==void 0?a:null,this.currentPage=(s=l.currentPage)!==null&&s!==void 0?s:1,this.minSelectedDate=l.minSelectedDate,this.maxSelectedDate=l.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,r,a;const s={displayMode:this.displayMode,sortParam:(e=this.sortParam)!==null&&e!==void 0?e:void 0,selectedSort:this.selectedSort,sortDirection:(t=this.sortDirection)!==null&&t!==void 0?t:void 0,selectedFacets:(i=this.selectedFacets)!==null&&i!==void 0?i:At,baseQuery:this.baseQuery,currentPage:this.currentPage,dateRangeQueryClause:this.dateRangeQueryClause,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:(r=this.selectedTitleFilter)!==null&&r!==void 0?r:void 0,selectedCreatorFilter:(a=this.selectedCreatorFilter)!==null&&a!==void 0?a:void 0};this.restorationStateHandler.persistState(s)}async doInitialPageFetch(){this.searchResultsLoading=!0,await this.fetchPage(this.initialPageNumber),this.searchResultsLoading=!1}get fullQuery(){let{fullQueryWithoutDate:e}=this;const{dateRangeQueryClause:t}=this;return t&&(e+=` AND ${t}`),e}get fullQueryWithoutDate(){if(!this.baseQuery)return;let e=this.baseQuery;const{facetQuery:t,sortFilterQueries:i}=this;return t&&(e+=` AND ${t}`),i&&(e+=` AND ${i}`),e}get facetQuery(){if(!this.selectedFacets)return;const e=[];for(const[t,i]of Object.entries(this.selectedFacets)){const r=Object.entries(i);if(r.length===0)continue;const a=[];for(const[l,c]of r){const h=c==="hidden"?"-":"";if(t==="language"){const v=this.languageCodeHandler.getCodeArrayFromCodeString(l);for(const g of v)a.push(`${h}"${g}"`)}else a.push(`${h}"${l}"`)}const s=a.join(" OR ");e.push(`${t}:(${s})`)}return e.length>0?`(${e.join(" AND ")})`:void 0}facetsChanged(e){this.selectedFacets=e.detail}async fetchSpecificFacets(e){var t,i;if(console.log("this.fullQuery",this.fullQuery),console.log("specificFacet",e),!this.fullQuery||!e)return;const r={advancedParams:[{field:e,size:100}]},a={query:this.fullQuery,fields:["identifier"],aggregations:r,rows:1},s=await((t=this.searchService)===null||t===void 0?void 0:t.search(a));this.aggr=(i=s==null?void 0:s.success)===null||i===void 0?void 0:i.response.aggregations}async fetchFacets(){var e,t;if(!this.fullQuery)return;const i={advancedParams:[{field:"subjectSorter",size:6},{field:"mediatypeSorter",size:6},{field:"languageSorter",size:6},{field:"creatorSorter",size:6},{field:"collection",size:12},{field:"year",size:50}]},r={query:this.fullQuery,fields:["identifier"],aggregations:i,rows:1};this.facetsLoading=!0;const a=await((e=this.searchService)===null||e===void 0?void 0:e.search(r));this.facetsLoading=!1,this.aggregations=(t=a==null?void 0:a.success)===null||t===void 0?void 0:t.response.aggregations}get fullQueryNoDateKey(){var e,t;return`${this.fullQueryWithoutDate}-${(e=this.sortParam)===null||e===void 0?void 0:e.field}-${(t=this.sortParam)===null||t===void 0?void 0:t.direction}`}async fetchFullYearHistogram(){var e,t,i,r;const{fullQueryNoDateKey:a}=this;if(!this.fullQueryWithoutDate||a===this.previousFullQueryNoDate)return;this.previousFullQueryNoDate=a;const s={simpleParams:["year"]},l={query:this.fullQueryWithoutDate,fields:["identifier"],aggregations:s,rows:1};this.fullYearAggregationLoading=!0;const c=await((e=this.searchService)===null||e===void 0?void 0:e.search(l));this.fullYearAggregationLoading=!1,this.fullYearsHistogramAggregation=(r=(i=(t=c==null?void 0:c.success)===null||t===void 0?void 0:t.response)===null||i===void 0?void 0:i.aggregations)===null||r===void 0?void 0:r.year_histogram}scrollToPage(e){const t=this.pageSize*(e-1);setTimeout(()=>{this.isScrollingToCell=!0,this.infiniteScroller.scrollToCell(t,!0),setTimeout(()=>{this.isScrollingToCell=!1,this.infiniteScroller.reload()},500)},0)}get pageFetchQueryKey(){var e,t;return`${this.fullQuery}-${(e=this.sortParam)===null||e===void 0?void 0:e.field}-${(t=this.sortParam)===null||t===void 0?void 0:t.direction}`}async fetchPage(e){var t,i,r,a,s;if(!this.fullQuery||this.dataSource[e]||this.endOfDataReached)return;const{pageFetchQueryKey:l}=this,c=(t=this.pageFetchesInProgress[l])!==null&&t!==void 0?t:new Set;if(c.has(e))return;c.add(e),this.pageFetchesInProgress[l]=c;const h=this.sortParam?[this.sortParam]:[],v={query:this.fullQuery,fields:["addeddate","avg_rating","collections_raw","creator","date","description","downloads","identifier","issue","item_count","mediatype","num_favorites","num_reviews","publicdate","reviewdate","source","subject","title","volume"],page:e,rows:this.pageSize,sort:h},g=await((i=this.searchService)===null||i===void 0?void 0:i.search(v)),b=g==null?void 0:g.success;if(!b)return;this.totalResults=b.response.numFound;const S=b.responseHeader.params.qin,$=b.responseHeader.params.sort;let T=!1;if(!$)this.sortParam&&(T=!0);else if($.split(" ").length>1){const oe=$.split(" ")[0],W=$.split(" ")[1];(oe!==((r=this.sortParam)===null||r===void 0?void 0:r.field)||W!==((a=this.sortParam)===null||a===void 0?void 0:a.direction))&&(T=!0)}if(S!==this.fullQuery||T)return;const{docs:R}=b.response;R&&R.length>0&&(this.preloadCollectionNames(R),this.updateDataSource(e,R)),R.length<this.pageSize&&(this.endOfDataReached=!0,this.infiniteScroller.itemCount=this.actualTileCount),(s=this.pageFetchesInProgress[l])===null||s===void 0||s.delete(e),this.searchResultsLoading=!1}preloadCollectionNames(e){var t;const i=e.map(a=>{var s;return(s=a.collections_raw)===null||s===void 0?void 0:s.values}).flat(),r=Array.from(new Set(i));(t=this.collectionNameCache)===null||t===void 0||t.preloadIdentifiers(r)}get currentVisiblePageNumbers(){const e=this.infiniteScroller.getVisibleCellIndices(),t=new Set;return e.forEach(i=>{const r=Math.floor(i/this.pageSize)+1;t.add(r)}),Array.from(t)}updateDataSource(e,t){const i=ae({},this.dataSource),r=[];t==null||t.forEach(l=>{var c,h,v,g,b,S,$,T,P,R,ee,oe,W,ye,ce,he,st,nt,lt,dt,Be,Z,Te,Ae,ct,ht,ut,He,Me,I,Ue,B;if(!l.identifier)return;let je=!1,N=!1;if(((c=l.collections_raw)===null||c===void 0?void 0:c.values.length)&&((h=l.mediatype)===null||h===void 0?void 0:h.value)!=="collection"){for(const we of(v=l.collections_raw)===null||v===void 0?void 0:v.values)if(we==="loggedin"&&(je=!0,N)||we==="no-preview"&&(N=!0,je))break}r.push({averageRating:(g=l.avg_rating)===null||g===void 0?void 0:g.value,collections:(S=(b=l.collections_raw)===null||b===void 0?void 0:b.values)!==null&&S!==void 0?S:[],commentCount:(T=($=l.num_reviews)===null||$===void 0?void 0:$.value)!==null&&T!==void 0?T:0,creator:(P=l.creator)===null||P===void 0?void 0:P.value,creators:(ee=(R=l.creator)===null||R===void 0?void 0:R.values)!==null&&ee!==void 0?ee:[],dateAdded:(oe=l.addeddate)===null||oe===void 0?void 0:oe.value,dateArchived:(W=l.publicdate)===null||W===void 0?void 0:W.value,datePublished:(ye=l.date)===null||ye===void 0?void 0:ye.value,dateReviewed:(ce=l.reviewdate)===null||ce===void 0?void 0:ce.value,description:(he=l.description)===null||he===void 0?void 0:he.value,favCount:(nt=(st=l.num_favorites)===null||st===void 0?void 0:st.value)!==null&&nt!==void 0?nt:0,identifier:l.identifier,issue:(lt=l.issue)===null||lt===void 0?void 0:lt.value,itemCount:(Be=(dt=l.item_count)===null||dt===void 0?void 0:dt.value)!==null&&Be!==void 0?Be:0,mediatype:(Te=(Z=l.mediatype)===null||Z===void 0?void 0:Z.value)!==null&&Te!==void 0?Te:"data",source:(Ae=l.source)===null||Ae===void 0?void 0:Ae.value,subjects:(ht=(ct=l.subject)===null||ct===void 0?void 0:ct.values)!==null&&ht!==void 0?ht:[],title:this.etreeTitle((ut=l.title)===null||ut===void 0?void 0:ut.value,(He=l.mediatype)===null||He===void 0?void 0:He.value,(Me=l.collection)===null||Me===void 0?void 0:Me.values),volume:(I=l.volume)===null||I===void 0?void 0:I.value,viewCount:(B=(Ue=l.downloads)===null||Ue===void 0?void 0:Ue.value)!==null&&B!==void 0?B:0,loginRequired:je,contentWarning:N})}),i[e]=r,this.dataSource=i,this.currentVisiblePageNumbers.includes(e)&&this.infiniteScroller.reload()}etreeTitle(e,t,i){if(t==="etree"||(i==null?void 0:i.includes("etree"))){const r=/^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/,a=e==null?void 0:e.replace(r,"$3: $2");if(a)return`${a}`}return e!=null?e:""}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(!!t)return p` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .baseImageUrl=${this.baseImageUrl}
      .model=${t}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`}scrollThresholdReached(){this.pagesToRender+=1,this.fetchPage(this.pagesToRender)}};_.styles=f`
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
  `;n([u({type:String})],_.prototype,"baseNavigationUrl",void 0);n([u({type:String})],_.prototype,"baseImageUrl",void 0);n([u({type:Object})],_.prototype,"searchService",void 0);n([u({type:String})],_.prototype,"baseQuery",void 0);n([u({type:String})],_.prototype,"displayMode",void 0);n([u({type:Object})],_.prototype,"sortParam",void 0);n([u({type:String})],_.prototype,"selectedSort",void 0);n([u({type:String})],_.prototype,"selectedTitleFilter",void 0);n([u({type:String})],_.prototype,"selectedCreatorFilter",void 0);n([u({type:String})],_.prototype,"sortDirection",void 0);n([u({type:String})],_.prototype,"dateRangeQueryClause",void 0);n([u({type:Number})],_.prototype,"pageSize",void 0);n([u({type:Object})],_.prototype,"resizeObserver",void 0);n([u({type:String})],_.prototype,"titleQuery",void 0);n([u({type:String})],_.prototype,"creatorQuery",void 0);n([u({type:Number})],_.prototype,"currentPage",void 0);n([u({type:String})],_.prototype,"minSelectedDate",void 0);n([u({type:String})],_.prototype,"maxSelectedDate",void 0);n([u({type:Object})],_.prototype,"selectedFacets",void 0);n([u({type:Boolean})],_.prototype,"showHistogramDatePicker",void 0);n([u({type:Object})],_.prototype,"collectionNameCache",void 0);n([u({type:String})],_.prototype,"pageContext",void 0);n([u({type:Object})],_.prototype,"restorationStateHandler",void 0);n([u({type:Number})],_.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],_.prototype,"loggedIn",void 0);n([u({type:Boolean})],_.prototype,"isManageView",void 0);n([M()],_.prototype,"pagesToRender",void 0);n([M()],_.prototype,"searchResultsLoading",void 0);n([M()],_.prototype,"facetsLoading",void 0);n([M()],_.prototype,"fullYearAggregationLoading",void 0);n([M()],_.prototype,"aggregations",void 0);n([M()],_.prototype,"aggr",void 0);n([M()],_.prototype,"fullYearsHistogramAggregation",void 0);n([M()],_.prototype,"totalResults",void 0);n([M()],_.prototype,"mobileView",void 0);n([M()],_.prototype,"mobileFacetsVisible",void 0);n([G("#content-container")],_.prototype,"contentContainer",void 0);n([G("modal-manager")],_.prototype,"modalManager",void 0);n([G("infinite-scroller")],_.prototype,"infiniteScroller",void 0);_=n([D("collection-browser")],_);let ie=class extends O{constructor(){super(...arguments),this.searchService=Ai.default,this.resizeObserver=new da,this.localCache=new ea,this.collectionNameCache=new ca({searchService:this.searchService,localCache:this.localCache}),this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.loggedIn=!1}searchPressed(e){var t,i;e.preventDefault(),this.searchQuery=this.baseQueryField.value,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.collectionBrowser.goToPage((i=this.currentPage)!==null&&i!==void 0?i:1)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}render(){var e;return p`
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
    `}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}};ie.styles=f`
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
      z-index: 1;
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
  `;n([M()],ie.prototype,"currentPage",void 0);n([M()],ie.prototype,"searchQuery",void 0);n([M()],ie.prototype,"cellWidth",void 0);n([M()],ie.prototype,"cellHeight",void 0);n([M()],ie.prototype,"rowGap",void 0);n([M()],ie.prototype,"colGap",void 0);n([M()],ie.prototype,"loggedIn",void 0);n([G("#base-query-field")],ie.prototype,"baseQueryField",void 0);n([G("#page-number-input")],ie.prototype,"pageNumberInput",void 0);n([G("collection-browser")],ie.prototype,"collectionBrowser",void 0);ie=n([D("app-root")],ie);
