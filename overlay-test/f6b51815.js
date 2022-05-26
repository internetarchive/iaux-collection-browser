function e(e,t,i,r){var s,o=arguments.length,n=o<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,i):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(e,t,i,r);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(n=(o<3?s(n):o>3?s(t,i,n):s(t,i))||n);return o>3&&n&&Object.defineProperty(t,i,n),n}function t(e){let t,i,s;return"object"==typeof e?(t=e.hashFunction,i=e.expiring,s=e.tags):t=e,(e,o,n)=>{if(null!=n.value)n.value=r(n.value,t,i,s);else{if(null==n.get)throw"Only put a Memoize() decorator on a method or get accessor.";n.get=r(n.get,t,i,s)}}}const i=new Map;function r(e,t,r=0,s){const o=Symbol("__memoized_map__");return function(...n){let a;this.hasOwnProperty(o)||Object.defineProperty(this,o,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[o];if(Array.isArray(s))for(const e of s)i.has(e)?i.get(e).push(l):i.set(e,[l]);if(t||n.length>0||r>0){let i;i=!0===t?n.map((e=>e.toString())).join("!"):t?t.apply(this,n):n[0];const s=`${i}__timestamp`;let o=!1;if(r>0)if(l.has(s)){let e=l.get(s);o=Date.now()-e>r}else o=!0;l.has(i)&&!o?a=l.get(i):(a=e.apply(this,n),l.set(i,a),r>0&&l.set(s,Date.now()))}else{const t=this;l.has(t)?a=l.get(t):(a=e.apply(this,n),l.set(t,a))}return a}}class s{parseValue(e){return("string"!=typeof e||"false"!==e&&"0"!==e)&&Boolean(e)}}s.shared=new s;class o{parseValue(e){if("number"==typeof e)return e;if("boolean"==typeof e)return;const t=parseFloat(e);return Number.isNaN(t)?void 0:t}}o.shared=new o;class n{parseValue(e){return o.shared.parseValue(e)}}n.shared=new n;class a{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if("string"!=typeof e)return;const t=e.match(/\[([0-9]{4})\]/);return!t||t.length<2?void 0:this.parseJSDate(t[1])}parseJSDate(e){if("string"!=typeof e)return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let r=new Date(t);return(t.indexOf("Z")>-1||t.indexOf("+")>-1||t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)||t.match(/^.*?-[0-9]{2}:[0-9]{2}$/)||t.match(/^.*?-[0-9]{4}$/))&&(r=new Date(r.getTime()+1e3*r.getTimezoneOffset()*60)),r}}a.shared=new a;class l{parseValue(e){if("number"==typeof e)return e;if("boolean"==typeof e)return;const t=e.split(":");let i;return i=1===t.length?this.parseNumberFormat(t[0]):this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map(((i,r)=>{const s=parseFloat(i);if(Number.isNaN(s))return t=!0,0;const o=60**(e.length-1-r);return s*Math.floor(o)})).reduce(((e,t)=>e+t),0);return t?void 0:i}}l.shared=new l;class d{parseValue(e){if("string"==typeof e)return e}}d.shared=new d;class c{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const e of this.separators)if(i=t.split(e),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const t=e.map((e=>e.trim())),i=t.map((e=>this.parser.parseValue(e))),r=[];return i.forEach((e=>{void 0!==e&&r.push(e)})),r}}class h{parseValue(e){if("string"==typeof e)return e}}h.shared=new h;class u{parseValue(e){return String(e)}}u.shared=new u;class p{constructor(e,t){this.parser=e,this.rawValue=t}get values(){return this.parseRawValue()}get value(){return this.values[0]}parseRawValue(){if(void 0===this.rawValue)return[];const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach((e=>{const i=this.parser.parseValue(e);Array.isArray(i)?t.push(...i):void 0!==i&&t.push(i)})),t}}e([t()],p.prototype,"values",null),e([t()],p.prototype,"value",null);class v extends p{constructor(e){super(s.shared,e)}}class g extends p{constructor(e){super(a.shared,e)}}class m extends p{constructor(e){super(l.shared,e)}}class f extends p{constructor(e){super(o.shared,e)}}class y extends p{constructor(e){super(u.shared,e)}}class b extends p{constructor(e){super(h.shared,e)}}class $ extends p{constructor(e){super(n.shared,e)}}class w extends p{constructor(e){super(d.shared,e)}}class S extends p{constructor(e,t){super(t,e)}}class _ extends S{constructor(e){super(e,new c(u.shared))}}class x{constructor(e){this.rawMetadata=e}get identifier(){var e;return null===(e=this.rawMetadata)||void 0===e?void 0:e.identifier}get addeddate(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.addeddate)?new g(this.rawMetadata.addeddate):void 0}get audio_codec(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.audio_codec)?new y(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.audio_sample_rate)?new f(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.avg_rating)?new f(this.rawMetadata.avg_rating):void 0}get collection(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.collection)?new y(this.rawMetadata.collection):void 0}get collections_raw(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.collections_raw)?new y(this.rawMetadata.collections_raw):void 0}get collection_size(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.collection_size)?new $(this.rawMetadata.collection_size):void 0}get contributor(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.contributor)?new y(this.rawMetadata.contributor):void 0}get coverage(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.coverage)?new y(this.rawMetadata.coverage):void 0}get creator(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.creator)?new y(this.rawMetadata.creator):void 0}get date(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.date)?new g(this.rawMetadata.date):void 0}get description(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.description)?new y(this.rawMetadata.description):void 0}get downloads(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.downloads)?new f(this.rawMetadata.downloads):void 0}get duration(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.duration)?new m(this.rawMetadata.duration):void 0}get"external-identifier"(){var e,t;return(null===(e=this.rawMetadata)||void 0===e?void 0:e["external-identifier"])?new y(null===(t=this.rawMetadata)||void 0===t?void 0:t["external-identifier"]):void 0}get files_count(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.files_count)?new f(this.rawMetadata.files_count):void 0}get indexdate(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.indexdate)?new g(this.rawMetadata.indexdate):void 0}get isbn(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.isbn)?new y(this.rawMetadata.isbn):void 0}get issue(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.issue)?new y(this.rawMetadata.issue):void 0}get item_count(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.item_count)?new f(this.rawMetadata.item_count):void 0}get item_size(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.item_size)?new $(this.rawMetadata.item_size):void 0}get language(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.language)?new y(this.rawMetadata.language):void 0}get length(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.length)?new m(this.rawMetadata.length):void 0}get lineage(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.lineage)?new y(this.rawMetadata.lineage):void 0}get month(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.month)?new f(this.rawMetadata.month):void 0}get mediatype(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.mediatype)?new w(this.rawMetadata.mediatype):void 0}get noindex(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.noindex)?new v(this.rawMetadata.noindex):void 0}get notes(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.notes)?new y(this.rawMetadata.notes):void 0}get num_favorites(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.num_favorites)?new f(this.rawMetadata.num_favorites):void 0}get num_reviews(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.num_reviews)?new f(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.openlibrary_edition)?new y(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.openlibrary_work)?new y(this.rawMetadata.openlibrary_work):void 0}get page_progression(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.page_progression)?new b(this.rawMetadata.page_progression):void 0}get partner(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.partner)?new y(this.rawMetadata.partner):void 0}get ppi(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.ppi)?new f(this.rawMetadata.ppi):void 0}get publicdate(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.publicdate)?new g(this.rawMetadata.publicdate):void 0}get publisher(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.publisher)?new y(this.rawMetadata.publisher):void 0}get reviewdate(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.reviewdate)?new g(this.rawMetadata.reviewdate):void 0}get runtime(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.runtime)?new m(this.rawMetadata.runtime):void 0}get scanner(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.scanner)?new y(this.rawMetadata.scanner):void 0}get source(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.source)?new y(this.rawMetadata.source):void 0}get start_localtime(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.start_localtime)?new g(this.rawMetadata.start_localtime):void 0}get start_time(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.start_time)?new g(this.rawMetadata.start_time):void 0}get stop_time(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.stop_time)?new g(this.rawMetadata.stop_time):void 0}get subject(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.subject)?new _(this.rawMetadata.subject):void 0}get taper(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.taper)?new y(this.rawMetadata.taper):void 0}get title(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.title)?new y(this.rawMetadata.title):void 0}get transferer(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.transferer)?new y(this.rawMetadata.transferer):void 0}get track(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.track)?new f(this.rawMetadata.track):void 0}get type(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.type)?new y(this.rawMetadata.type):void 0}get uploader(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.uploader)?new y(this.rawMetadata.uploader):void 0}get utc_offset(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.utc_offset)?new f(this.rawMetadata.utc_offset):void 0}get venue(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.venue)?new y(this.rawMetadata.venue):void 0}get volume(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.volume)?new y(this.rawMetadata.volume):void 0}get week(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.week)?new f(this.rawMetadata.week):void 0}get year(){var e;return(null===(e=this.rawMetadata)||void 0===e?void 0:e.year)?new g(this.rawMetadata.year):void 0}}e([t()],x.prototype,"addeddate",null),e([t()],x.prototype,"audio_codec",null),e([t()],x.prototype,"audio_sample_rate",null),e([t()],x.prototype,"avg_rating",null),e([t()],x.prototype,"collection",null),e([t()],x.prototype,"collections_raw",null),e([t()],x.prototype,"collection_size",null),e([t()],x.prototype,"contributor",null),e([t()],x.prototype,"coverage",null),e([t()],x.prototype,"creator",null),e([t()],x.prototype,"date",null),e([t()],x.prototype,"description",null),e([t()],x.prototype,"downloads",null),e([t()],x.prototype,"duration",null),e([t()],x.prototype,"external-identifier",null),e([t()],x.prototype,"files_count",null),e([t()],x.prototype,"indexdate",null),e([t()],x.prototype,"isbn",null),e([t()],x.prototype,"issue",null),e([t()],x.prototype,"item_count",null),e([t()],x.prototype,"item_size",null),e([t()],x.prototype,"language",null),e([t()],x.prototype,"length",null),e([t()],x.prototype,"lineage",null),e([t()],x.prototype,"month",null),e([t()],x.prototype,"mediatype",null),e([t()],x.prototype,"noindex",null),e([t()],x.prototype,"notes",null),e([t()],x.prototype,"num_favorites",null),e([t()],x.prototype,"num_reviews",null),e([t()],x.prototype,"openlibrary_edition",null),e([t()],x.prototype,"openlibrary_work",null),e([t()],x.prototype,"page_progression",null),e([t()],x.prototype,"partner",null),e([t()],x.prototype,"ppi",null),e([t()],x.prototype,"publicdate",null),e([t()],x.prototype,"publisher",null),e([t()],x.prototype,"reviewdate",null),e([t()],x.prototype,"runtime",null),e([t()],x.prototype,"scanner",null),e([t()],x.prototype,"source",null),e([t()],x.prototype,"start_localtime",null),e([t()],x.prototype,"start_time",null),e([t()],x.prototype,"stop_time",null),e([t()],x.prototype,"subject",null),e([t()],x.prototype,"taper",null),e([t()],x.prototype,"title",null),e([t()],x.prototype,"transferer",null),e([t()],x.prototype,"track",null),e([t()],x.prototype,"type",null),e([t()],x.prototype,"uploader",null),e([t()],x.prototype,"utc_offset",null),e([t()],x.prototype,"venue",null),e([t()],x.prototype,"volume",null),e([t()],x.prototype,"week",null),e([t()],x.prototype,"year",null);class C{constructor(e){this.rawValue=e}get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){return this.rawValue.mtime}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size?n.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length?l.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height?o.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width?o.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track?o.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}}e([t()],C.prototype,"size",null),e([t()],C.prototype,"length",null),e([t()],C.prototype,"height",null),e([t()],C.prototype,"width",null),e([t()],C.prototype,"track",null);class A{constructor(e){this.rawValue=e}get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewdate(){return this.rawValue.reviewdate?a.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate?a.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars?o.shared.parseValue(this.rawValue.stars):void 0}}e([t()],A.prototype,"reviewdate",null),e([t()],A.prototype,"createdate",null),e([t()],A.prototype,"stars",null);class k{constructor(e){var t,i;this.rawResponse=e,this.created=e.created,this.d1=e.d1,this.d2=e.d2,this.dir=e.dir,this.files=null===(t=e.files)||void 0===t?void 0:t.map((e=>new C(e))),this.files_count=e.files_count,this.item_last_updated=e.item_last_updated,this.item_size=e.item_size,this.metadata=new x(e.metadata),this.server=e.server,this.uniq=e.uniq,this.workable_servers=e.workable_servers,this.speech_vs_music_asr=e.speech_vs_music_asr,this.reviews=null===(i=e.reviews)||void 0===i?void 0:i.map((e=>new A(e)))}}class E{constructor(e){this.numFound=e.numFound,this.start=e.start,this.docs=e.docs.map((e=>new x(e))),this.aggregations=e.aggregations}}class T{constructor(e){this.rawResponse=e,this.responseHeader=e.responseHeader,this.response=new E(e.response)}}var M,D;!function(e){e.networkError="SearchService.NetworkError",e.itemNotFound="SearchService.ItemNotFound",e.decodingError="SearchService.DecodingError",e.searchEngineError="SearchService.SearchEngineError"}(M||(M={}));class N extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}class P{constructor(e){this.searchBackend=e}async search(e){const t=await this.searchBackend.performSearch(e);if(t.error)return t;return{success:new T(t.success)}}async fetchMetadata(e){var t;const i=await this.searchBackend.fetchMetadata(e);if(i.error)return i;if(void 0===(null===(t=i.success)||void 0===t?void 0:t.metadata))return{error:new N(M.itemNotFound)};return{success:new k(i.success)}}async fetchMetadataValue(e,t){var i;const r=await this.searchBackend.fetchMetadata(e,t);return r.error?r:void 0===(null===(i=r.success)||void 0===i?void 0:i.result)?{error:new N(M.itemNotFound)}:{success:r.success.result}}}function z(e){return new Promise((function(t,i){e.oncomplete=e.onsuccess=function(){return t(e.result)},e.onabort=e.onerror=function(){return i(e.error)}}))}function O(e,t){var i,r=(!navigator.userAgentData&&/Safari\//.test(navigator.userAgent)&&!/Chrom(e|ium)\//.test(navigator.userAgent)&&indexedDB.databases?new Promise((function(e){var t=function(){return indexedDB.databases().finally(e)};i=setInterval(t,100),t()})).finally((function(){return clearInterval(i)})):Promise.resolve()).then((function(){var i=indexedDB.open(e);return i.onupgradeneeded=function(){return i.result.createObjectStore(t)},z(i)}));return function(e,i){return r.then((function(r){return i(r.transaction(t,e).objectStore(t))}))}}function L(){return D||(D=O("keyval-store","keyval")),D}function R(e,t){return e.openCursor().onsuccess=function(){this.result&&(t(this.result),this.result.continue())},z(e.transaction)}P.default=new P(new class{constructor(e){var t;if(this.baseUrl=null!==(t=null==e?void 0:e.baseUrl)&&void 0!==t?t:"archive.org",void 0!==(null==e?void 0:e.includeCredentials)?this.includeCredentials=e.includeCredentials:this.includeCredentials=null!==window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/),void 0!==(null==e?void 0:e.scope))this.requestScope=e.scope;else{const e=new URL(window.location.href).searchParams.get("scope");e&&(this.requestScope=e)}}async performSearch(e){const t=class{static aggregateSearchParamsAsString(e){if(e.advancedParams){const t=e.advancedParams.map((e=>({terms:e})));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field} ${e.direction}`}static generateURLSearchParams(e){const t=new URLSearchParams;if(t.append("q",e.query),t.append("output","json"),e.rows&&t.append("rows",String(e.rows)),e.page&&t.append("page",String(e.page)),e.fields&&t.append("fl",e.fields.join(",")),e.sort){const i=e.sort.map((e=>this.sortParamsAsString(e)));t.append("sort",i.join(","))}const i=e.aggregations;if(i){const e=this.aggregateSearchParamsAsString(i);e&&t.append("user_aggs",e)}return t}}.generateURLSearchParams(e),i=t.toString(),r=`https://${this.baseUrl}/advancedsearch.php?${i}`;return this.fetchUrl(r)}async fetchMetadata(e,t){const i=t?`/${t}`:"",r=`https://${this.baseUrl}/metadata/${e}${i}`;return this.fetchUrl(r,{requestOptions:{credentials:"omit"}})}async fetchUrl(e,t){var i;const r=new URL(e);let s;this.requestScope&&r.searchParams.set("scope",this.requestScope);try{const e=null!==(i=null==t?void 0:t.requestOptions)&&void 0!==i?i:{credentials:this.includeCredentials?"include":"same-origin"};s=await fetch(r.href,e)}catch(e){const t=e instanceof Error?e.message:"string"==typeof e?e:"Unknown error";return this.getErrorResult(M.networkError,t)}try{const e=await s.json(),t=e.error;if(t){const i=e.forensics;return this.getErrorResult(M.searchEngineError,t,i)}return{success:e}}catch(e){const t=e instanceof Error?e.message:"string"==typeof e?e:"Unknown error";return this.getErrorResult(M.decodingError,t)}}getErrorResult(e,t,i){return{error:new N(e,t,i)}}});class H{constructor(e){var t,i,r,s;if(this.namespace=null!==(t=null==e?void 0:e.namespace)&&void 0!==t?t:"LocalCache",this.defaultTTL=null!==(i=null==e?void 0:e.defaultTTL)&&void 0!==i?i:900,(null===(r=null==e?void 0:e.immediateClean)||void 0===r||r)&&this.cleanExpired(),!(null==e?void 0:e.disableCleaning)){const t=null!==(s=null==e?void 0:e.cleaningInterval)&&void 0!==s?s:60;setInterval((()=>{this.cleanExpired()}),1e3*t)}}async set(e){var t;const i={value:e.value},r=null!==(t=e.ttl)&&void 0!==t?t:this.defaultTTL,s=(o=new Date,n=r,o.setMilliseconds(o.getMilliseconds()+1e3*n),o);var o,n;i.expires=s;const a=this.getNamespacedKey(e.key);try{await function(e,t){return(arguments.length>2&&void 0!==arguments[2]?arguments[2]:L())("readwrite",(function(i){return i.put(t,e),z(i.transaction)}))}(a,i)}catch(e){}}async get(e){const t=this.getNamespacedKey(e);let i;try{i=await function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:L())("readonly",(function(t){return z(t.get(e))}))}(t)}catch(e){}if(!i)return;const r=new Date;if(!(i.expires&&i.expires<r))return i.value;await this.delete(e)}async delete(e){const t=this.getNamespacedKey(e);try{await function(e){return(arguments.length>1&&void 0!==arguments[1]?arguments[1]:L())("readwrite",(function(t){return t.delete(e),z(t.transaction)}))}(t)}catch(e){}}async cleanExpired(){const e=await this.getAllKeys();await Promise.all(e.map((async e=>this.get(e))))}async getAllKeys(){let e=[];try{e=await function(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:L())("readonly",(function(e){if(e.getAllKeys)return z(e.getAllKeys());var t=[];return R(e,(function(e){return t.push(e.key)})).then((function(){return t}))}))}()}catch(e){}const t=[];for(const i of e)"string"==typeof i&&t.push(i);return t.filter((e=>e.startsWith(this.namespace))).map((e=>this.removeNamespace(e)))}getNamespacedKey(e){return`${this.namespace}-${e}`}removeNamespace(e){return e.replace(`${this.namespace}-`,"")}}const U=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),I=new Map;class B{constructor(e,t){if(this._$cssResult$=!0,t!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=I.get(this.cssText);return U&&void 0===e&&(I.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const j=U?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new B("string"==typeof e?e:e+"",F))(t)})(e):e;var V;const W=window.trustedTypes,Q=W?W.emptyScript:"",Y=window.reactiveElementPolyfillSupport,G={toAttribute(e,t){switch(t){case Boolean:e=e?Q:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},K=(e,t)=>t!==e&&(t==t||e==e),q={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:K};class X extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Eh(i,t);void 0!==r&&(this._$Eu.set(r,i),e.push(r))})),e}static createProperty(e,t=q){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(j(e))}else void 0!==e&&t.push(j(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{U?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=q){var r,s;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const n=(null!==(s=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==s?s:G.toAttribute)(t,i.type);this._$Ei=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(e,t){var i,r,s;const o=this.constructor,n=o._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=o.getPropertyOptions(n),a=e.converter,l=null!==(s=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==s?s:G.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||K)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var Z;X.finalized=!0,X.elementProperties=new Map,X.elementStyles=[],X.shadowRootOptions={mode:"open"},null==Y||Y({ReactiveElement:X}),(null!==(V=globalThis.reactiveElementVersions)&&void 0!==V?V:globalThis.reactiveElementVersions=[]).push("1.3.0");const J=globalThis.trustedTypes,ee=J?J.createPolicy("lit-html",{createHTML:e=>e}):void 0,te=`lit$${(Math.random()+"").slice(9)}$`,ie="?"+te,re=`<${ie}>`,se=document,oe=(e="")=>se.createComment(e),ne=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ae=Array.isArray,le=e=>{var t;return ae(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},de=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ce=/-->/g,he=/>/g,ue=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,pe=/'/g,ve=/"/g,ge=/^(?:script|style|textarea|title)$/i,me=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),fe=me(1),ye=me(2),be=Symbol.for("lit-noChange"),$e=Symbol.for("lit-nothing"),we=new WeakMap,Se=se.createTreeWalker(se,129,null,!1),_e=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=de;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===de?"!--"===l[1]?n=ce:void 0!==l[1]?n=he:void 0!==l[2]?(ge.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=ue):void 0!==l[3]&&(n=ue):n===ue?">"===l[0]?(n=null!=s?s:de,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?ue:'"'===l[3]?ve:pe):n===ve||n===pe?n=ue:n===ce||n===he?n=de:(n=ue,s=void 0);const h=n===ue&&e[t+1].startsWith("/>")?" ":"";o+=n===de?i+re:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+te+h):i+te+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==ee?ee.createHTML(a):a,r]};class xe{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=_e(e,t);if(this.el=xe.createElement(l,i),Se.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=Se.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(te)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(te),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Te:"?"===t[1]?De:"@"===t[1]?Ne:Ee})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(ge.test(r.tagName)){const e=r.textContent.split(te),t=e.length-1;if(t>0){r.textContent=J?J.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],oe()),Se.nextNode(),a.push({type:2,index:++s});r.append(e[t],oe())}}}else if(8===r.nodeType)if(r.data===ie)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(te,e+1));)a.push({type:7,index:s}),e+=te.length-1}s++}}static createElement(e,t){const i=se.createElement("template");return i.innerHTML=e,i}}function Ce(e,t,i=e,r){var s,o,n,a;if(t===be)return t;let l=void 0!==r?null===(s=i._$Cl)||void 0===s?void 0:s[r]:i._$Cu;const d=ne(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Ce(e,l._$AS(e,t.values),l,r)),t}class Ae{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:se).importNode(i,!0);Se.currentNode=s;let o=Se.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new ke(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Pe(o,this,e)),this.v.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=Se.nextNode(),n++)}return s}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class ke{constructor(e,t,i,r){var s;this.type=2,this._$AH=$e,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ce(this,e,t),ne(e)?e===$e||null==e||""===e?(this._$AH!==$e&&this._$AR(),this._$AH=$e):e!==this._$AH&&e!==be&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.k(e):le(e)?this.S(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}k(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==$e&&ne(this._$AH)?this._$AA.nextSibling.data=e:this.k(se.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=xe.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.m(i);else{const e=new Ae(s,this),t=e.p(this.options);e.m(i),this.k(t),this._$AH=e}}_$AC(e){let t=we.get(e.strings);return void 0===t&&we.set(e.strings,t=new xe(e)),t}S(e){ae(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new ke(this.A(oe()),this.A(oe()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Ee{constructor(e,t,i,r,s){this.type=1,this._$AH=$e,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=$e}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Ce(this,e,t,0),o=!ne(e)||e!==this._$AH&&e!==be,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Ce(this,r[i+n],t,n),a===be&&(a=this._$AH[n]),o||(o=!ne(a)||a!==this._$AH[n]),a===$e?e=$e:e!==$e&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.C(e)}C(e){e===$e?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Te extends Ee{constructor(){super(...arguments),this.type=3}C(e){this.element[this.name]=e===$e?void 0:e}}const Me=J?J.emptyScript:"";class De extends Ee{constructor(){super(...arguments),this.type=4}C(e){e&&e!==$e?this.element.setAttribute(this.name,Me):this.element.removeAttribute(this.name)}}class Ne extends Ee{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Ce(this,e,t,0))&&void 0!==i?i:$e)===be)return;const r=this._$AH,s=e===$e&&r!==$e||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==$e&&(r===$e||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Pe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ce(this,e)}}const ze={P:"$lit$",L:te,V:ie,I:1,N:_e,R:Ae,D:le,j:Ce,H:ke,O:Ee,F:De,B:Ne,W:Te,Z:Pe},Oe=window.litHtmlPolyfillSupport;null==Oe||Oe(xe,ke),(null!==(Z=globalThis.litHtmlVersions)&&void 0!==Z?Z:globalThis.litHtmlVersions=[]).push("2.2.0");const Le=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Re=Symbol(),He=new Map;class Ue{constructor(e,t){if(this._$cssResult$=!0,t!==Re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=He.get(this.cssText);return Le&&void 0===e&&(He.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Fe=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new Ue(i,Re)},Ie=Le?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new Ue("string"==typeof e?e:e+"",Re))(t)})(e):e;var Be;const je=window.trustedTypes,Ve=je?je.emptyScript:"",We=window.reactiveElementPolyfillSupport,Qe={toAttribute(e,t){switch(t){case Boolean:e=e?Ve:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},Ye=(e,t)=>t!==e&&(t==t||e==e),Ge={attribute:!0,type:String,converter:Qe,reflect:!1,hasChanged:Ye};class Ke extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Eh(i,t);void 0!==r&&(this._$Eu.set(r,i),e.push(r))})),e}static createProperty(e,t=Ge){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Ge}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(Ie(e))}else void 0!==e&&t.push(Ie(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{Le?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=Ge){var r,s;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const n=(null!==(s=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==s?s:Qe.toAttribute)(t,i.type);this._$Ei=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(e,t){var i,r,s;const o=this.constructor,n=o._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=o.getPropertyOptions(n),a=e.converter,l=null!==(s=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==s?s:Qe.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Ye)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var qe,Xe;Ke.finalized=!0,Ke.elementProperties=new Map,Ke.elementStyles=[],Ke.shadowRootOptions={mode:"open"},null==We||We({ReactiveElement:Ke}),(null!==(Be=globalThis.reactiveElementVersions)&&void 0!==Be?Be:globalThis.reactiveElementVersions=[]).push("1.3.0");class Ze extends Ke{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new ke(t.insertBefore(oe(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return be}}Ze.finalized=!0,Ze._$litElement$=!0,null===(qe=globalThis.litElementHydrateSupport)||void 0===qe||qe.call(globalThis,{LitElement:Ze});const Je=globalThis.litElementPolyfillSupport;null==Je||Je({LitElement:Ze}),(null!==(Xe=globalThis.litElementVersions)&&void 0!==Xe?Xe:globalThis.litElementVersions=[]).push("3.2.0");const et=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),tt=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function it(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):tt(e,t)}function rt(e){return it({...e,state:!0})}function st(e,t){return(({finisher:e,descriptor:t})=>(i,r)=>{var s;if(void 0===r){const r=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(o.finisher=function(t){e(t,r)}),o}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(s,r)}})({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}var ot;null===(ot=window.HTMLSlotElement)||void 0===ot||ot.prototype.assignedElements;class nt{constructor(){this.resizeObserver=new ResizeObserver((e=>{window.requestAnimationFrame((()=>{for(const t of e){const e=this.resizeHandlers.get(t.target);null==e||e.forEach((e=>{e.handleResize(t)}))}}))})),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach(((e,t)=>{this.resizeObserver.unobserve(t)})),this.resizeHandlers.clear()}addObserver(e){var t;const i=null!==(t=this.resizeHandlers.get(e.target))&&void 0!==t?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),0===t.size&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}class at{constructor(e){var t,i,r,s;this.cacheKeyName="collection-name-cache",this.cacheTtl=604800,this.defaultLoadDelay=100,this.loadDelay=100,this.defaultPruningAge=6048e5,this.defaultPruningInterval=3e4,this.fetchTimeout=null,this.pendingIdentifierQueue=new Set,this.pendingPromises={},this.collectionNameCache={},this.pruningAge=this.defaultPruningAge,this.maxCacheSize=2500,this.cacheLoaded=!1,this.searchService=e.searchService,this.localCache=e.localCache,this.loadDelay=null!==(t=e.loadDelay)&&void 0!==t?t:this.defaultLoadDelay,this.pruningAge=null!==(i=e.pruningAge)&&void 0!==i?i:this.pruningAge,this.maxCacheSize=null!==(r=e.maxCacheSize)&&void 0!==r?r:this.maxCacheSize,this.pruneCache(),setInterval((async()=>{await this.pruneCache()}),null!==(s=e.pruneInterval)&&void 0!==s?s:this.defaultPruningInterval)}async collectionNameFor(e){this.cacheLoaded||await this.loadFromCache();const t=e.toLowerCase(),i=this.collectionNameCache[t];return i?(i.lastAccess=Date.now(),this.collectionNameCache[t]=i,i.name):(this.startPendingIdentifierTimer(),new Promise((e=>{var i;this.pendingIdentifierQueue.add(t);const r=null!==(i=this.pendingPromises[t])&&void 0!==i?i:[];r.push((async t=>{e(t)})),this.pendingPromises[t]=r})))}async preloadIdentifiers(e){this.cacheLoaded||await this.loadFromCache();const t=e.filter((e=>void 0!==e)).map((e=>e.toLowerCase()));for(const e of t)this.collectionNameCache[e]||this.pendingIdentifierQueue.add(e);this.startPendingIdentifierTimer()}async startPendingIdentifierTimer(){this.fetchTimeout||(this.fetchTimeout=window.setTimeout((()=>{this.loadPendingIdentifiers(),this.fetchTimeout=null}),this.loadDelay))}async loadFromCache(){if(!this.localCache||this.cacheLoaded)return;const e=await this.localCache.get(this.cacheKeyName);e&&(this.collectionNameCache=e,this.cacheLoaded=!0)}async loadPendingIdentifiers(){var e,t,i;await this.loadFromCache();const r=Array.from(this.pendingIdentifierQueue).splice(0,100);if(0===r.length)return;r.map((async e=>this.pendingIdentifierQueue.delete(e)));const s={query:`identifier:(${r.join(" OR ")})`,fields:["title","identifier"],rows:r.length},o=null===(t=null===(e=(await this.searchService.search(s)).success)||void 0===e?void 0:e.response)||void 0===t?void 0:t.docs;if(o&&o.length>0)for(const e of o){const{identifier:t,title:s}=e;if(!t)continue;const o=t.toLowerCase();r.splice(r.indexOf(o),1);const n=null!==(i=null==s?void 0:s.value)&&void 0!==i?i:null;this.collectionNameCache[o]={name:n,lastAccess:Date.now()};const a=this.pendingPromises[o];if(a){for(const e of a)e(n);delete this.pendingPromises[o]}}for(const e of r){this.collectionNameCache[e]={name:null,lastAccess:Date.now()};const t=this.pendingPromises[e];if(t){for(const e of t)e(null);delete this.pendingPromises[e]}}await this.persistCache()}async pruneCache(){await this.loadFromCache();const e=Date.now(),t=Object.entries(this.collectionNameCache).sort(((e,t)=>{var i,r,s,o;return(null!==(r=null===(i=e[1])||void 0===i?void 0:i.lastAccess)&&void 0!==r?r:0)-(null!==(o=null===(s=t[1])||void 0===s?void 0:s.lastAccess)&&void 0!==o?o:0)})),i=new Set;for(const[r,s]of t){if(!s)continue;const{lastAccess:t}=s;t<e-this.pruningAge&&i.add(r)}if(t.length>this.maxCacheSize)for(let e=0;e<t.length-this.maxCacheSize;e+=1){const[r]=t[e];i.add(r)}for(const e of i)delete this.collectionNameCache[e];await this.persistCache()}async persistCache(){var e;await(null===(e=this.localCache)||void 0===e?void 0:e.set({key:this.cacheKeyName,value:this.collectionNameCache,ttl:this.cacheTtl}))}}const lt=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,dt=Symbol(),ct=new Map;class ht{constructor(e,t){if(this._$cssResult$=!0,t!==dt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=ct.get(this.cssText);return lt&&void 0===e&&(ct.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const ut=(e,...t)=>{const i=1===e.length?e[0]:t.reduce(((t,i,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[r+1]),e[0]);return new ht(i,dt)},pt=lt?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new ht("string"==typeof e?e:e+"",dt))(t)})(e):e;var vt;const gt=window.trustedTypes,mt=gt?gt.emptyScript:"",ft=window.reactiveElementPolyfillSupport,yt={toAttribute(e,t){switch(t){case Boolean:e=e?mt:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},bt=(e,t)=>t!==e&&(t==t||e==e),$t={attribute:!0,type:String,converter:yt,reflect:!1,hasChanged:bt};class wt extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Eh(i,t);void 0!==r&&(this._$Eu.set(r,i),e.push(r))})),e}static createProperty(e,t=$t){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||$t}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(pt(e))}else void 0!==e&&t.push(pt(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{lt?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=$t){var r,s;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const n=(null!==(s=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==s?s:yt.toAttribute)(t,i.type);this._$Ei=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(e,t){var i,r,s;const o=this.constructor,n=o._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=o.getPropertyOptions(n),a=e.converter,l=null!==(s=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==s?s:yt.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||bt)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$E_&&(this._$E_=new Map),this._$E_.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$E_&&(this._$E_.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$E_=void 0),this._$EU()}updated(e){}firstUpdated(e){}}var St;wt.finalized=!0,wt.elementProperties=new Map,wt.elementStyles=[],wt.shadowRootOptions={mode:"open"},null==ft||ft({ReactiveElement:wt}),(null!==(vt=globalThis.reactiveElementVersions)&&void 0!==vt?vt:globalThis.reactiveElementVersions=[]).push("1.0.2");const _t=globalThis.trustedTypes,xt=_t?_t.createPolicy("lit-html",{createHTML:e=>e}):void 0,Ct=`lit$${(Math.random()+"").slice(9)}$`,At="?"+Ct,kt=`<${At}>`,Et=document,Tt=(e="")=>Et.createComment(e),Mt=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Dt=Array.isArray,Nt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pt=/-->/g,zt=/>/g,Ot=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Lt=/'/g,Rt=/"/g,Ht=/^(?:script|style|textarea)$/i,Ut=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Ft=Symbol.for("lit-noChange"),It=Symbol.for("lit-nothing"),Bt=new WeakMap,jt=Et.createTreeWalker(Et,129,null,!1);class Vt{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=((e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=Nt;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===Nt?"!--"===l[1]?n=Pt:void 0!==l[1]?n=zt:void 0!==l[2]?(Ht.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=Ot):void 0!==l[3]&&(n=Ot):n===Ot?">"===l[0]?(n=null!=s?s:Nt,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?Ot:'"'===l[3]?Rt:Lt):n===Rt||n===Lt?n=Ot:n===Pt||n===zt?n=Nt:(n=Ot,s=void 0);const h=n===Ot&&e[t+1].startsWith("/>")?" ":"";o+=n===Nt?i+kt:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+Ct+h):i+Ct+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==xt?xt.createHTML(a):a,r]})(e,t);if(this.el=Vt.createElement(l,i),jt.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=jt.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(Ct)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(Ct),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Kt:"?"===t[1]?Xt:"@"===t[1]?Zt:Gt})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(Ht.test(r.tagName)){const e=r.textContent.split(Ct),t=e.length-1;if(t>0){r.textContent=_t?_t.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],Tt()),jt.nextNode(),a.push({type:2,index:++s});r.append(e[t],Tt())}}}else if(8===r.nodeType)if(r.data===At)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(Ct,e+1));)a.push({type:7,index:s}),e+=Ct.length-1}s++}}static createElement(e,t){const i=Et.createElement("template");return i.innerHTML=e,i}}function Wt(e,t,i=e,r){var s,o,n,a;if(t===Ft)return t;let l=void 0!==r?null===(s=i._$Cl)||void 0===s?void 0:s[r]:i._$Cu;const d=Mt(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Wt(e,l._$AS(e,t.values),l,r)),t}class Qt{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:Et).importNode(i,!0);jt.currentNode=s;let o=jt.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Yt(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Jt(o,this,e)),this.v.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=jt.nextNode(),n++)}return s}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Yt{constructor(e,t,i,r){var s;this.type=2,this._$AH=It,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Wt(this,e,t),Mt(e)?e===It||null==e||""===e?(this._$AH!==It&&this._$AR(),this._$AH=It):e!==this._$AH&&e!==Ft&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):(e=>{var t;return Dt(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==It&&Mt(this._$AH)?this._$AA.nextSibling.data=e:this.S(Et.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Vt.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.m(i);else{const e=new Qt(s,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=Bt.get(e.strings);return void 0===t&&Bt.set(e.strings,t=new Vt(e)),t}M(e){Dt(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Yt(this.A(Tt()),this.A(Tt()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Gt{constructor(e,t,i,r,s){this.type=1,this._$AH=It,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=It}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Wt(this,e,t,0),o=!Mt(e)||e!==this._$AH&&e!==Ft,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Wt(this,r[i+n],t,n),a===Ft&&(a=this._$AH[n]),o||(o=!Mt(a)||a!==this._$AH[n]),a===It?e=It:e!==It&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.k(e)}k(e){e===It?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Kt extends Gt{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===It?void 0:e}}const qt=_t?_t.emptyScript:"";class Xt extends Gt{constructor(){super(...arguments),this.type=4}k(e){e&&e!==It?this.element.setAttribute(this.name,qt):this.element.removeAttribute(this.name)}}class Zt extends Gt{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Wt(this,e,t,0))&&void 0!==i?i:It)===Ft)return;const r=this._$AH,s=e===It&&r!==It||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==It&&(r===It||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Jt{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Wt(this,e)}}const ei=window.litHtmlPolyfillSupport;var ti,ii;null==ei||ei(Vt,Yt),(null!==(St=globalThis.litHtmlVersions)&&void 0!==St?St:globalThis.litHtmlVersions=[]).push("2.0.2");class ri extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new Yt(t.insertBefore(Tt(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return Ft}}ri.finalized=!0,ri._$litElement$=!0,null===(ti=globalThis.litElementHydrateSupport)||void 0===ti||ti.call(globalThis,{LitElement:ri});const si=globalThis.litElementPolyfillSupport;null==si||si({LitElement:ri}),(null!==(ii=globalThis.litElementVersions)&&void 0!==ii?ii:globalThis.litElementVersions=[]).push("3.0.2");const oi=e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t),ni=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function ai(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ni(e,t)}function li(e){return ai({...e,state:!0})}const di=({finisher:e,descriptor:t})=>(i,r)=>{var s;if(void 0===r){const r=null!==(s=i.originalKey)&&void 0!==s?s:i.key,o=null!=t?{kind:"method",placement:"prototype",key:r,descriptor:t(i.key)}:{...i,key:r};return null!=e&&(o.finisher=function(t){e(t,r)}),o}{const s=i.constructor;void 0!==t&&Object.defineProperty(i,r,t(r)),null==e||e(s,r)}};function ci(e,t){return di({descriptor:i=>{const r={get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelector(e))&&void 0!==i?i:null},enumerable:!0,configurable:!0};if(t){const t="symbol"==typeof i?Symbol():"__"+i;r.get=function(){var i,r;return void 0===this[t]&&(this[t]=null!==(r=null===(i=this.renderRoot)||void 0===i?void 0:i.querySelector(e))&&void 0!==r?r:null),this[t]}}return r}})}let hi=class extends ri{render(){return Ut` ${this.name?this.name:this.identifier} `}createRenderRoot(){return this}updated(e){(e.has("identifier")||e.has("collectionNameCache"))&&this.fetchName()}async fetchName(){this.identifier&&this.collectionNameCache&&(this.name=await this.collectionNameCache.collectionNameFor(this.identifier))}};e([ai({type:Object})],hi.prototype,"collectionNameCache",void 0),e([ai({type:String})],hi.prototype,"identifier",void 0),e([li()],hi.prototype,"name",void 0),hi=e([oi("async-collection-name")],hi);const ui=e=>null!=e?e:$e;var pi;const vi=globalThis.trustedTypes,gi=vi?vi.createPolicy("lit-html",{createHTML:e=>e}):void 0,mi=`lit$${(Math.random()+"").slice(9)}$`,fi="?"+mi,yi=`<${fi}>`,bi=document,$i=(e="")=>bi.createComment(e),wi=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Si=Array.isArray,_i=e=>{var t;return Si(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])},xi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ci=/-->/g,Ai=/>/g,ki=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ei=/'/g,Ti=/"/g,Mi=/^(?:script|style|textarea)$/i,Di=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Ni=Symbol.for("lit-noChange"),Pi=Symbol.for("lit-nothing"),zi=new WeakMap,Oi=(e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new Ii(t.insertBefore($i(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n},Li=bi.createTreeWalker(bi,129,null,!1),Ri=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=xi;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===xi?"!--"===l[1]?n=Ci:void 0!==l[1]?n=Ai:void 0!==l[2]?(Mi.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=ki):void 0!==l[3]&&(n=ki):n===ki?">"===l[0]?(n=null!=s?s:xi,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?ki:'"'===l[3]?Ti:Ei):n===Ti||n===Ei?n=ki:n===Ci||n===Ai?n=xi:(n=ki,s=void 0);const h=n===ki&&e[t+1].startsWith("/>")?" ":"";o+=n===xi?i+yi:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+mi+h):i+mi+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==gi?gi.createHTML(a):a,r]};class Hi{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=Ri(e,t);if(this.el=Hi.createElement(l,i),Li.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=Li.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(mi)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(mi),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?ji:"?"===t[1]?Wi:"@"===t[1]?Qi:Bi})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(Mi.test(r.tagName)){const e=r.textContent.split(mi),t=e.length-1;if(t>0){r.textContent=vi?vi.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],$i()),Li.nextNode(),a.push({type:2,index:++s});r.append(e[t],$i())}}}else if(8===r.nodeType)if(r.data===fi)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(mi,e+1));)a.push({type:7,index:s}),e+=mi.length-1}s++}}static createElement(e,t){const i=bi.createElement("template");return i.innerHTML=e,i}}function Ui(e,t,i=e,r){var s,o,n,a;if(t===Ni)return t;let l=void 0!==r?null===(s=i._$Cl)||void 0===s?void 0:s[r]:i._$Cu;const d=wi(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Ui(e,l._$AS(e,t.values),l,r)),t}class Fi{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:bi).importNode(i,!0);Li.currentNode=s;let o=Li.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Ii(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Yi(o,this,e)),this.v.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=Li.nextNode(),n++)}return s}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ii{constructor(e,t,i,r){var s;this.type=2,this._$AH=Pi,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ui(this,e,t),wi(e)?e===Pi||null==e||""===e?(this._$AH!==Pi&&this._$AR(),this._$AH=Pi):e!==this._$AH&&e!==Ni&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):_i(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==Pi&&wi(this._$AH)?this._$AA.nextSibling.data=e:this.S(bi.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Hi.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.m(i);else{const e=new Fi(s,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=zi.get(e.strings);return void 0===t&&zi.set(e.strings,t=new Hi(e)),t}M(e){Si(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Ii(this.A($i()),this.A($i()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Bi{constructor(e,t,i,r,s){this.type=1,this._$AH=Pi,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Pi}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Ui(this,e,t,0),o=!wi(e)||e!==this._$AH&&e!==Ni,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Ui(this,r[i+n],t,n),a===Ni&&(a=this._$AH[n]),o||(o=!wi(a)||a!==this._$AH[n]),a===Pi?e=Pi:e!==Pi&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.k(e)}k(e){e===Pi?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class ji extends Bi{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===Pi?void 0:e}}const Vi=vi?vi.emptyScript:"";class Wi extends Bi{constructor(){super(...arguments),this.type=4}k(e){e&&e!==Pi?this.element.setAttribute(this.name,Vi):this.element.removeAttribute(this.name)}}class Qi extends Bi{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Ui(this,e,t,0))&&void 0!==i?i:Pi)===Ni)return;const r=this._$AH,s=e===Pi&&r!==Pi||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==Pi&&(r===Pi||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Yi{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ui(this,e)}}const Gi={P:"$lit$",V:mi,L:fi,I:1,N:Ri,R:Fi,D:_i,j:Ui,H:Ii,O:Bi,F:Wi,B:Qi,W:ji,Z:Yi},Ki=window.litHtmlPolyfillSupport;var qi,Xi;null==Ki||Ki(Hi,Ii),(null!==(pi=globalThis.litHtmlVersions)&&void 0!==pi?pi:globalThis.litHtmlVersions=[]).push("2.0.2");class Zi extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=Oi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return Ni}}Zi.finalized=!0,Zi._$litElement$=!0,null===(qi=globalThis.litElementHydrateSupport)||void 0===qi||qi.call(globalThis,{LitElement:Zi});const Ji=globalThis.litElementPolyfillSupport;null==Ji||Ji({LitElement:Zi}),(null!==(Xi=globalThis.litElementVersions)&&void 0!==Xi?Xi:globalThis.litElementVersions=[]).push("3.0.2");const er=2;const{H:tr}=Gi,ir=()=>document.createComment(""),rr=(e,t,i)=>{var r;const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(ir(),o),r=s.insertBefore(ir(),o);i=new tr(t,r,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},sr=(e,t,i=e)=>(e._$AI(t,i),e),or={},nr=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},ar=(e,t,i)=>{const r=new Map;for(let s=t;s<=i;s++)r.set(e[s],s);return r},lr=(e=>(...t)=>({_$litDirective$:e,values:t}))(class extends class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}{constructor(e){if(super(e),e.type!==er)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const s=[],o=[];let n=0;for(const t of e)s[n]=r?r(t,n):n,o[n]=i(t,n),n++;return{values:o,keys:s}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){var s;const o=(e=>e._$AH)(e),{values:n,keys:a}=this.dt(t,i,r);if(!Array.isArray(o))return this.ct=a,n;const l=null!==(s=this.ct)&&void 0!==s?s:this.ct=[],d=[];let c,h,u=0,p=o.length-1,v=0,g=n.length-1;for(;u<=p&&v<=g;)if(null===o[u])u++;else if(null===o[p])p--;else if(l[u]===a[v])d[v]=sr(o[u],n[v]),u++,v++;else if(l[p]===a[g])d[g]=sr(o[p],n[g]),p--,g--;else if(l[u]===a[g])d[g]=sr(o[u],n[g]),rr(e,d[g+1],o[u]),u++,g--;else if(l[p]===a[v])d[v]=sr(o[p],n[v]),rr(e,o[u],o[p]),p--,v++;else if(void 0===c&&(c=ar(a,v,g),h=ar(l,u,p)),c.has(l[u]))if(c.has(l[p])){const t=h.get(a[v]),i=void 0!==t?o[t]:null;if(null===i){const t=rr(e,o[u]);sr(t,n[v]),d[v]=t}else d[v]=sr(i,n[v]),rr(e,o[u],i),o[t]=null;v++}else nr(o[p]),p--;else nr(o[u]),u++;for(;v<=g;){const t=rr(e,d[g+1]);sr(t,n[v]),d[v++]=t}for(;u<=p;){const e=o[u++];null!==e&&nr(e)}return this.ct=a,((e,t=or)=>{e._$AH=t})(e,d),Ni}});function dr(e,t,i){return Array.from({length:(t-e)/i+1},((t,r)=>e+r*i))}let cr=class extends Zi{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver((e=>{e.forEach((e=>{if(e.target===this.sentinel)return void(e.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached")));const t=e.target.dataset.cellIndex;if(!t)return;const i=parseInt(t,10);e.isIntersecting?this.visibleCellIndices.add(i):this.visibleCellIndices.delete(i)})),this.scrollOptimizationsDisabled||this.processVisibleCells()})),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){dr(0,Math.max(0,this.itemCount-1),1).forEach((e=>this.removeCell(e))),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const r=t?"smooth":"auto";return i.scrollIntoView({behavior:r}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){if(this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled){dr(0,Math.max(0,this.itemCount-1),1).forEach((e=>this.visibleCellIndices.add(e))),this.processVisibleCells()}else this.cellContainers.forEach((e=>this.intersectionObserver.observe(e)))}render(){const e=dr(0,this.itemCount-1,1);return Di`
      <div id="container">
        <div id="sentinel"></div>
        ${lr(e,(e=>e),(e=>Di`
            <div
              class="cell-container"
              data-cell-index=${e}
              @click=${t=>this.cellSelected(t,e)}
              @keyup=${t=>{"Enter"===t.key&&this.cellSelected(t,e)}}
            ></div>
          `))}
      </div>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),t=Math.max(10,e.length),i=e.sort(((e,t)=>e>t?1:-1)),r=0===e.length,s=dr(r?0:Math.max(i[0]-t,0),r?t:Math.min(i[i.length-1]+t,this.itemCount-1),1);this.renderCellBuffer(s),this.removeCellsOutsideBufferRange(s);const o=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(o)}renderCellBuffer(e){e.forEach((e=>{var t;if(this.renderedCellIndices.has(e))return;const i=this.cellContainerForIndex(e);if(!i)return;const r=null===(t=this.cellProvider)||void 0===t?void 0:t.cellForIndex(e);if(i.style.height="auto",r)Oi(r,i),this.renderedCellIndices.add(e),this.placeholderCellIndices.delete(e);else{if(this.placeholderCellIndices.has(e))return;Oi(this.placeholderCellTemplate,i),this.placeholderCellIndices.add(e)}}))}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter((t=>!e.includes(t))).forEach((e=>{this.removeCell(e)}))}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,Oi(Pi,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=ut`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=ut`var(--infiniteScrollerRowGap, 1.7rem)`,i=ut`var(--infiniteScrollerColGap, 1.7rem)`,r=ut`var(--infiniteScrollerCellMinWidth, 10rem)`,s=ut`var(--infiniteScrollerCellMaxWidth, 1fr)`,o=ut`var(--infiniteScrollerCellMinHeight, 10rem)`,n=ut`var(--infiniteScrollerCellMaxHeight, none)`,a=ut`var(--infiniteScrollerCellOutline, 0)`;return ut`
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
        outline: ${a};
        min-height: ${o};
        max-height: ${n};
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
    `}};e([ai({type:Number})],cr.prototype,"itemCount",void 0),e([ai({type:Object})],cr.prototype,"cellProvider",void 0),e([ai({type:Object})],cr.prototype,"placeholderCellTemplate",void 0),e([ai({type:Boolean})],cr.prototype,"scrollOptimizationsDisabled",void 0),e([ci("#sentinel")],cr.prototype,"sentinel",void 0),e([function(e){return di({descriptor:t=>({get(){var t,i;return null!==(i=null===(t=this.renderRoot)||void 0===t?void 0:t.querySelectorAll(e))&&void 0!==i?i:[]},enumerable:!0,configurable:!0})})}(".cell-container")],cr.prototype,"cellContainers",void 0),cr=e([oi("infinite-scroller")],cr);const hr=(e,...t)=>({strTag:!0,strings:e,values:t});const ur=[];for(let e=0;e<256;e++)ur[e]=(e>>4&15).toString(16)+(15&e).toString(16);(new class{constructor(){this.settled=!1,this.promise=new Promise(((e,t)=>{this._resolve=e,this._reject=t}))}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}).resolve();let pr=e=>{return"string"!=typeof(t=e)&&"strTag"in t?((e,t,i)=>{let r=e[0];for(let s=1;s<e.length;s++)r+=t[i?i[s-1]:s-1],r+=e[s];return r})(e.strings,e.values):e;var t};const vr=ye`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;let gr=class extends Ze{render(){var e,t,i;return fe`
      <div id="container">
        <div id="collection-image-title">
          <div id="collection-title">${null===(e=this.model)||void 0===e?void 0:e.title}</div>
          <div id="collection-image-container">
            <div
              id="collection-image"
              style="background-image:url('https://archive.org/services/img/${null===(t=this.model)||void 0===t?void 0:t.identifier}')"
            ></div>
          </div>
        </div>
        <div id="item-count-container">
          <div id="item-count-image-container">${vr}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${null===(i=this.model)||void 0===i?void 0:i.itemCount.toLocaleString()}</div>
            <div id="items-text">${pr("items")}</div>
          </div>
        </div>
      </div>
    `}static get styles(){const e=Fe`var(--collectionTileCornerRadius, 4px)`;return Fe`
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
    `}};function mr(e,t="long",i="short",r="en-US"){const s=null!=e?e:-1;if(s<0)return"";const o=function(e,t){let i=1;return e>=1e9?i=1e9:e>=1e6?i=1e6:e>=1e3&&"short"===t&&(i=1e3),i}(s,t),n=function(e=0,t){const i=e/t;let r=0;return r=i<10?Math.round(10*(i+Number.EPSILON))/10:Math.round(i),r}(s,o);return function(e,t,i,r){switch(t){case 1e9:return pr("short"===i?hr`${e}B`:hr`${e} billion`);case 1e6:return pr("short"===i?hr`${e}M`:hr`${e} million`);case 1e3:return pr("short"===i?hr`${e}K`:hr`${e} thousand`);default:return new Intl.NumberFormat(r).format(e)}}(n,o,i,r)}e([it({type:Object})],gr.prototype,"model",void 0),gr=e([et("collection-tile")],gr);const fr=ye`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
    <title>Icon of a star, filled in</title>
  </svg>
`,yr=ye`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`;var br=ye`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;const $r=ye`
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
`,wr=ye`
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
`,Sr=ye`
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
`,_r=ye`
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
`,xr=ye`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Cr=ye`
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
`,Ar=ye`
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
`,kr=ye`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Er=ye`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Tr=ye`
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
`,Mr=ye`
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
`,Dr=ye`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,Nr={account:{color:"#000000",icon:$r,text:"Account"},audio:{color:"#8fdaef",icon:wr,text:"Audio"},collection:{color:"#000000",icon:vr,text:"Collection"},data:{color:"#333333",icon:Sr,text:"Data"},etree:{color:"#3871c1",icon:_r,text:"E-tree"},film:{color:"#bf1b2c",icon:Cr,text:"Film"},image:{color:"#62c4a9",icon:xr,text:"Image"},movies:{color:"#bf1b2c",icon:Cr,text:"Movie"},radio:{color:"#8fdaef",icon:Ar,text:"Radio"},software:{color:"#80cc28",icon:kr,text:"Software"},texts:{color:"#f9a72b",icon:Er,text:"Text"},tv:{color:"#f25d54",icon:Tr,text:"TV"},video:{color:"#bf1b2c",icon:Mr,text:"Video"},web:{color:"#fddd10",icon:Dr,text:"Web"}};let Pr=class extends Ze{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;const i=["tvnews","tvarchive","television"],r=["radio","radioprogram"];return"movies"===this.mediatype&&(null===(e=this.collections)||void 0===e?void 0:e.some((e=>i.indexOf(e)>=0)))?"tv":"audio"===this.mediatype&&(null===(t=this.collections)||void 0===t?void 0:t.some((e=>r.indexOf(e)>=0)))?"radio":this.mediatype||""}render(){const e=Nr[this.displayMediatype];return e?fe`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:fe``}static get styles(){return Fe`
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
    `}};e([it({type:String})],Pr.prototype,"mediatype",void 0),e([it({type:Array})],Pr.prototype,"collections",void 0),e([it({type:Boolean})],Pr.prototype,"showText",void 0),Pr=e([et("mediatype-icon")],Pr);const zr=ye`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g
      fill="none"
      fill-rule="evenodd"
    >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714z"
      fill="#000"
      fill-rule="nonzero"
    />
    <path
      d="m94.0140845 90-44.5547054-79-44.4593791 79z"
      fill="#f8e71c"
      fill-rule="nonzero"
    />
    <path
      d="m54 69v8h-8v-8zm0-30v10.2515641l-2.0923567 14.7484359h-3.8184713l-2.089172-14.7484359v-10.2515641z"
      fill="#000"
    />
    </g>
    <title>Content may be inappropriate</title>
  </svg>
`,Or=ye`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fill-rule="nonzero">
      <path
        d="m11 48h11c-.0377367 5.0230706-.0377367 17.6897373 0 38h28v-38h12c-14.7643578-21.746483-22.9310245-33.4131497-24.5-35z"
        fill="#fff"
        transform="matrix(0 1 -1 0 86 13)"
      />
      <path
        d="m17 44h9c-.0377367 5.0230706-.0377367 17.0230706 0 36h18v-36h10c-10.0976911-15.0798163-15.9310245-23.4131497-17.5-25z"
        fill="#000"
        transform="matrix(0 1 -1 0 85 14)"
      />
      <path
        d="m84.3595506 0h-55.7191012c-8.6379817 0-15.6404494 6.39593215-15.6404494 14.2857143v15.7142857h20v-11h47v62l-47-1v-11h-20v16.7142857c0 7.8897822 7.0024677 14.2857143 15.6404494 14.2857143h55.7191012c8.6379817 0 15.6404494-6.3959321 15.6404494-14.2857143v-71.4285714c0-7.88978215-7.0024677-14.2857143-15.6404494-14.2857143z"
        fill="#fff"
      />
      <path
        d="m84.2597403 5c5.3793969 0 9.7402597 4.02943725 9.7402597 9v72c0 4.9705627-4.3608628 9-9.7402597 9h-55.5194806c-5.3793969 0-9.7402597-4.0294373-9.7402597-9v-12h8v7.5c0 2.4198792 1.8593897 4.3936363 4.4510815 4.4958424l48.9709964.0041576c2.6189169 0 4.4673094-2.6052767 4.5779221-5v-62c0-2.4852814-2.3103015-5-5-5h-48.3376623c-2.618917 0-4.551725 1.6052767-4.6623377 4v7h-8v-11c0-4.97056275 4.3608628-9 9.7402597-9z"
        fill="#000"
      />
    </g>
    <title>Log in to view this item</title>
  </svg>
`;let Lr=class extends Ze{constructor(){super(...arguments),this.isListTile=!1,this.loggedIn=!1,this.loginRequired=!1,this.contentWarning=!1}render(){return this.loginRequired&&!this.loggedIn?fe` ${this.loginRequiredTemplate} `:fe` ${this.contentWarningTemplate} `}get loginRequiredTemplate(){return this.isListTile?fe` ${Or} `:fe`
      <div class="tile-action no-preview">Log in to view this item</div>
    `}get contentWarningTemplate(){return this.isListTile?fe` ${zr} `:fe`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `}static get styles(){return Fe`
      :host {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
      }

      svg {
        padding: 25%;
      }

      .tile-action {
        border: 1px solid currentColor;
        border-radius: 1px;
        padding: 5px;
        font-weight: 500;
        width: auto;
        position: absolute;
        z-index: 2;
        display: flex;
      }

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
      }
    `}};e([it({type:Boolean})],Lr.prototype,"isListTile",void 0),e([it({type:Boolean})],Lr.prototype,"loggedIn",void 0),e([it({type:Boolean})],Lr.prototype,"loginRequired",void 0),e([it({type:Boolean})],Lr.prototype,"contentWarning",void 0),Lr=e([et("item-image-overlay")],Lr);let Rr=class extends Ze{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.isWaveform=!1}render(){var e;return fe`
      <div class=${ui(this.imageBoxClass)}>
        ${"audio"===(null===(e=this.model)||void 0===e?void 0:e.mediatype)?this.waveformTemplate:this.itemImageTemplate}
        ${this.ItemImageOverlayTemplate}
      </div>
    `}get imageSrc(){var e;return`${this.baseImageUrl}/services/img/${null===(e=this.model)||void 0===e?void 0:e.identifier}`}get itemImageTemplate(){return fe`
      ${this.isListTile?this.listImageTemplate:this.tileImageTemplate}
    `}get tileImageTemplate(){return fe`
      <div
        class=${this.imageClass}
        style="background-image:url(${this.imageSrc})"
      ></div>
    `}get listImageTemplate(){return this.model?fe`
      <img src="${this.imageSrc}" alt="" class="${this.listImageClass}" />
    `:$e}get waveformTemplate(){var e;return fe`
      <div class=${this.boxWaveformClass}>
        <img
          class=${this.itemImageWaveformClass}
          src="${this.imageSrc}"
          alt="${ui(null===(e=this.model)||void 0===e?void 0:e.title)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `}get ItemImageOverlayTemplate(){var e,t,i,r;return(null===(e=this.model)||void 0===e?void 0:e.loginRequired)||(null===(t=this.model)||void 0===t?void 0:t.contentWarning)?fe`
      <item-image-overlay
        .isListTile=${this.isListTile}
        .loggedIn=${this.loggedIn}
        .loginRequired=${null===(i=this.model)||void 0===i?void 0:i.loginRequired}
        .contentWarning=${null===(r=this.model)||void 0===r?void 0:r.contentWarning}
      ></item-image-overlay>
    `:$e}get tileActionTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.contentWarning)?fe`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `:$e}onLoadItemImageCheck(){4===this.itemImageWaveform.naturalWidth/this.itemImageWaveform.naturalHeight&&(this.isWaveform=!0)}get imageClass(){var e;return"item-image "+((null===(e=this.model)||void 0===e?void 0:e.contentWarning)?"deemphasize":"default")}get listImageClass(){var e;return`list-image ${null===(e=this.model)||void 0===e?void 0:e.mediatype}${this.isCompactTile?" compact":""}`}get imageBoxClass(){var e,t;return this.isListTile?"list-image-box"+((null===(e=this.model)||void 0===e?void 0:e.contentWarning)?" deemphasize":""):(null===(t=this.model)||void 0===t?void 0:t.contentWarning)?"item-image-box":void 0}get boxWaveformClass(){return"item-audio"+(this.isWaveform?` ${this.hashBasedGradient}`:"")}get itemImageWaveformClass(){return"item-image"+(this.isWaveform?" waveform":"")}get hashBasedGradient(){var e;if(!(null===(e=this.model)||void 0===e?void 0:e.identifier))return"grad1";return`grad${this.hashStrToInt(this.model.identifier)%6}`}hashStrToInt(e){return e.split("").reduce(((e,t)=>e+t.charCodeAt(0)),0)}static get styles(){return Fe`
      .item-image-box {
        width: 16rem;
        height: 16rem;
        overflow: hidden;
        position: relative;
        box-shadow: 1px 1px 2px 0px;
        display: flex;
      }

      .item-image {
        width: 16rem;
        height: 16rem;
        object-fit: contain;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        -webkit-appearance: none;
        overflow: visible;
      }

      .list-image-box.deemphasize {
        border: 1px solid #767676;
      }

      .list-image-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        position: relative;
      }

      .list-image {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      img.list-image {
        overflow: hidden;
        object-fit: contain;
        border-radius: var(--border-radius, 0);
        -webkit-border-radius: var(--border-radius, 0);
        -moz-border-radius: var(--border-radius, 0);
      }

      img.list-image.compact {
        object-fit: cover;
      }

      .waveform {
        mix-blend-mode: screen;
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
      }

      .deemphasize .list-image,
      .deemphasize.item-image {
        background-size: contain;
        filter: blur(15px);
        z-index: 1;
      }

      .grad0 {
        background: linear-gradient(
          hsl(340, 80%, 55%),
          hsl(0, 80%, 33%) 35%,
          hsl(0, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad1 {
        background: linear-gradient(
          hsl(300, 80%, 55%),
          hsl(330, 80%, 33%) 35%,
          hsl(330, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad2 {
        background: linear-gradient(
          hsl(200, 80%, 55%),
          hsl(230, 80%, 33%) 35%,
          hsl(230, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad3 {
        background: linear-gradient(
          hsl(160, 80%, 55%),
          hsl(190, 80%, 33%) 35%,
          hsl(190, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad4 {
        background: linear-gradient(
          hsl(250, 80%, 55%),
          hsl(280, 80%, 33%) 35%,
          hsl(280, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad5 {
        background: linear-gradient(
          hsl(280, 80%, 55%),
          hsl(310, 80%, 33%) 35%,
          hsl(310, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }
    `}};e([it({type:Object})],Rr.prototype,"model",void 0),e([it({type:String})],Rr.prototype,"baseImageUrl",void 0),e([it({type:Boolean})],Rr.prototype,"isListTile",void 0),e([it({type:Boolean})],Rr.prototype,"isCompactTile",void 0),e([it({type:Boolean})],Rr.prototype,"loggedIn",void 0),e([rt()],Rr.prototype,"isWaveform",void 0),e([st(".item-image")],Rr.prototype,"itemImageWaveform",void 0),Rr=e([et("item-image")],Rr);let Hr=class extends Ze{render(){var e,t,i,r,s,o,n,a;const l=(null===(e=this.model)||void 0===e?void 0:e.title)||"",d=(null===(t=this.model)||void 0===t?void 0:t.creator)||"-";return fe`
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${l}>${null===(i=this.model)||void 0===i?void 0:i.title}</h1>
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              <span><strong>By:&nbsp;</strong>${d}</span>
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${null===(r=this.model)||void 0===r?void 0:r.mediatype}
                .collection=${null===(s=this.model)||void 0===s?void 0:s.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${br}
              <p class="status-text">
                ${mr(null===(o=this.model)||void 0===o?void 0:o.viewCount,"short","short")}
              </p>
            </div>
            <div class="col">
              ${fr}
              <p class="status-text">
                ${mr(null===(n=this.model)||void 0===n?void 0:n.itemCount,"short","short")}
              </p>
            </div>
            <div class="col">
              ${yr}
              <p class="status-text">
                ${mr(null===(a=this.model)||void 0===a?void 0:a.favCount,"short","short")}
              </p>
            </div>
          </div>
        </div>
      </div>
    `}static get styles(){const e=Fe`var(--collectionTileCornerRadius, 4px)`;return Fe`
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
    `}};e([it({type:Object})],Hr.prototype,"model",void 0),e([it({type:String})],Hr.prototype,"baseImageUrl",void 0),Hr=e([et("item-tile")],Hr);const Ur=ye`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m89.6854559 79.6500588c1.7300364 6.4823648 2.180423 13.3122689 3.3145441 20.3499412h-86c.5683151-15.8558542 2.98334063-30.7849367 15.1676149-41.6581341 22.9948067-20.518674 59.250299-9.0032844 67.517841 21.3081929zm-40.0998307-79.6500588c10.872402.0493248 19.9700408 9.25722341 19.917959 20.1421788-.0829413 11.042868-8.9616237 19.8492523-20.0602807 19.8578212-11.1181198 0-19.9397193-8.7904706-19.9397193-19.8908727-.0327543-11.11998815 9.0125781-20.17487063 20.082041-20.1091273z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of a person</title>
  </svg>
`,Fr=ye`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`;let Ir=class extends Ze{render(){var e,t,i,r,s,o,n;return fe`
      <div class="outer-holder">
        <div class="inner-holder">
          <div id="header-holder">
            <div id="title-holder">
              <h1>${null===(e=this.model)||void 0===e?void 0:e.identifier}</h1>
            </div>
            <div id="avatar-holder">
              <div
                id="avatar"
                style="background-image: url('https://archive.org/services/img/${null===(t=this.model)||void 0===t?void 0:t.identifier}')"
              ></div>
            </div>
          </div>
          <div id="year-holder">
            <div id="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div id="year-holder">
              <h3>${null===(r=null===(i=this.model)||void 0===i?void 0:i.dateAdded)||void 0===r?void 0:r.getFullYear()}</h3>
            </div>
          </div>
          <div id="status-holder">
            <div id="patron-icon">${Ur}</div>
            <div class="stat-icon">
              ${Fr}
              <h3>${null===(s=this.model)||void 0===s?void 0:s.itemCount}</h3>
            </div>
            <div class="stat-icon">
              ${fr}
              <h3>${null===(o=this.model)||void 0===o?void 0:o.favCount}</h3>
            </div>
            <div class="stat-icon">
              ${yr}
              <h3>${null===(n=this.model)||void 0===n?void 0:n.commentCount}</h3>
            </div>
          </div>
        </div>
      </div>
    `}static get styles(){return Fe`
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
      }

      #patron-icon {
        height: 25px;
        width: 25px;
      }

      .stat-icon {
        height: 10px;
        width: 10px;
      }
    `}};function*Br(e,t){const i="function"==typeof t;if(void 0!==e){let r=-1;for(const s of e)r>-1&&(yield i?t(r):t),r++,yield s}}function*jr(e,t){if(void 0!==e){let i=0;for(const r of e)yield t(r,i++)}}e([it({type:Object})],Ir.prototype,"model",void 0),Ir=e([et("account-tile")],Ir);var Vr=Object.hasOwnProperty,Wr=Object.setPrototypeOf,Qr=Object.isFrozen,Yr=Object.getPrototypeOf,Gr=Object.getOwnPropertyDescriptor,Kr=Object.freeze,qr=Object.seal,Xr=Object.create,Zr="undefined"!=typeof Reflect&&Reflect,Jr=Zr.apply,es=Zr.construct;Jr||(Jr=function(e,t,i){return e.apply(t,i)}),Kr||(Kr=function(e){return e}),qr||(qr=function(e){return e}),es||(es=function(e,t){return new(Function.prototype.bind.apply(e,[null].concat(function(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}(t))))});var ts,is=us(Array.prototype.forEach),rs=us(Array.prototype.pop),ss=us(Array.prototype.push),os=us(String.prototype.toLowerCase),ns=us(String.prototype.match),as=us(String.prototype.replace),ls=us(String.prototype.indexOf),ds=us(String.prototype.trim),cs=us(RegExp.prototype.test),hs=(ts=TypeError,function(){for(var e=arguments.length,t=Array(e),i=0;i<e;i++)t[i]=arguments[i];return es(ts,t)});function us(e){return function(t){for(var i=arguments.length,r=Array(i>1?i-1:0),s=1;s<i;s++)r[s-1]=arguments[s];return Jr(e,t,r)}}function ps(e,t){Wr&&Wr(e,null);for(var i=t.length;i--;){var r=t[i];if("string"==typeof r){var s=os(r);s!==r&&(Qr(t)||(t[i]=s),r=s)}e[r]=!0}return e}function vs(e){var t=Xr(null),i=void 0;for(i in e)Jr(Vr,e,[i])&&(t[i]=e[i]);return t}function gs(e,t){for(;null!==e;){var i=Gr(e,t);if(i){if(i.get)return us(i.get);if("function"==typeof i.value)return us(i.value)}e=Yr(e)}return function(e){return console.warn("fallback value for",e),null}}var ms=Kr(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),fs=Kr(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),ys=Kr(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),bs=Kr(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),$s=Kr(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),ws=Kr(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ss=Kr(["#text"]),_s=Kr(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),xs=Kr(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Cs=Kr(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),As=Kr(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),ks=qr(/\{\{[\s\S]*|[\s\S]*\}\}/gm),Es=qr(/<%[\s\S]*|[\s\S]*%>/gm),Ts=qr(/^data-[\-\w.\u00B7-\uFFFF]/),Ms=qr(/^aria-[\-\w]+$/),Ds=qr(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Ns=qr(/^(?:\w+script|data):/i),Ps=qr(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),zs=qr(/^html$/i),Os="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function Ls(e){if(Array.isArray(e)){for(var t=0,i=Array(e.length);t<e.length;t++)i[t]=e[t];return i}return Array.from(e)}var Rs=function(){return"undefined"==typeof window?null:window},Hs=function(e,t){if("object"!==(void 0===e?"undefined":Os(e))||"function"!=typeof e.createPolicy)return null;var i=null,r="data-tt-policy-suffix";t.currentScript&&t.currentScript.hasAttribute(r)&&(i=t.currentScript.getAttribute(r));var s="dompurify"+(i?"#"+i:"");try{return e.createPolicy(s,{createHTML:function(e){return e}})}catch(e){return console.warn("TrustedTypes policy "+s+" could not be created."),null}};var Us=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:Rs(),i=function(t){return e(t)};if(i.version="2.3.6",i.removed=[],!t||!t.document||9!==t.document.nodeType)return i.isSupported=!1,i;var r=t.document,s=t.document,o=t.DocumentFragment,n=t.HTMLTemplateElement,a=t.Node,l=t.Element,d=t.NodeFilter,c=t.NamedNodeMap,h=void 0===c?t.NamedNodeMap||t.MozNamedAttrMap:c,u=t.HTMLFormElement,p=t.DOMParser,v=t.trustedTypes,g=l.prototype,m=gs(g,"cloneNode"),f=gs(g,"nextSibling"),y=gs(g,"childNodes"),b=gs(g,"parentNode");if("function"==typeof n){var $=s.createElement("template");$.content&&$.content.ownerDocument&&(s=$.content.ownerDocument)}var w=Hs(v,r),S=w?w.createHTML(""):"",_=s,x=_.implementation,C=_.createNodeIterator,A=_.createDocumentFragment,k=_.getElementsByTagName,E=r.importNode,T={};try{T=vs(s).documentMode?s.documentMode:{}}catch(e){}var M={};i.isSupported="function"==typeof b&&x&&void 0!==x.createHTMLDocument&&9!==T;var D=ks,N=Es,P=Ts,z=Ms,O=Ns,L=Ps,R=Ds,H=null,U=ps({},[].concat(Ls(ms),Ls(fs),Ls(ys),Ls($s),Ls(Ss))),F=null,I=ps({},[].concat(Ls(_s),Ls(xs),Ls(Cs),Ls(As))),B=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),j=null,V=null,W=!0,Q=!0,Y=!1,G=!1,K=!1,q=!1,X=!1,Z=!1,J=!1,ee=!1,te=!0,ie=!0,re=!1,se={},oe=null,ne=ps({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),ae=null,le=ps({},["audio","video","img","source","image","track"]),de=null,ce=ps({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),he="http://www.w3.org/1998/Math/MathML",ue="http://www.w3.org/2000/svg",pe="http://www.w3.org/1999/xhtml",ve=pe,ge=!1,me=void 0,fe=["application/xhtml+xml","text/html"],ye="text/html",be=void 0,$e=null,we=s.createElement("form"),Se=function(e){return e instanceof RegExp||e instanceof Function},_e=function(e){$e&&$e===e||(e&&"object"===(void 0===e?"undefined":Os(e))||(e={}),e=vs(e),H="ALLOWED_TAGS"in e?ps({},e.ALLOWED_TAGS):U,F="ALLOWED_ATTR"in e?ps({},e.ALLOWED_ATTR):I,de="ADD_URI_SAFE_ATTR"in e?ps(vs(ce),e.ADD_URI_SAFE_ATTR):ce,ae="ADD_DATA_URI_TAGS"in e?ps(vs(le),e.ADD_DATA_URI_TAGS):le,oe="FORBID_CONTENTS"in e?ps({},e.FORBID_CONTENTS):ne,j="FORBID_TAGS"in e?ps({},e.FORBID_TAGS):{},V="FORBID_ATTR"in e?ps({},e.FORBID_ATTR):{},se="USE_PROFILES"in e&&e.USE_PROFILES,W=!1!==e.ALLOW_ARIA_ATTR,Q=!1!==e.ALLOW_DATA_ATTR,Y=e.ALLOW_UNKNOWN_PROTOCOLS||!1,G=e.SAFE_FOR_TEMPLATES||!1,K=e.WHOLE_DOCUMENT||!1,Z=e.RETURN_DOM||!1,J=e.RETURN_DOM_FRAGMENT||!1,ee=e.RETURN_TRUSTED_TYPE||!1,X=e.FORCE_BODY||!1,te=!1!==e.SANITIZE_DOM,ie=!1!==e.KEEP_CONTENT,re=e.IN_PLACE||!1,R=e.ALLOWED_URI_REGEXP||R,ve=e.NAMESPACE||pe,e.CUSTOM_ELEMENT_HANDLING&&Se(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(B.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Se(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(B.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&"boolean"==typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements&&(B.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),me=me=-1===fe.indexOf(e.PARSER_MEDIA_TYPE)?ye:e.PARSER_MEDIA_TYPE,be="application/xhtml+xml"===me?function(e){return e}:os,G&&(Q=!1),J&&(Z=!0),se&&(H=ps({},[].concat(Ls(Ss))),F=[],!0===se.html&&(ps(H,ms),ps(F,_s)),!0===se.svg&&(ps(H,fs),ps(F,xs),ps(F,As)),!0===se.svgFilters&&(ps(H,ys),ps(F,xs),ps(F,As)),!0===se.mathMl&&(ps(H,$s),ps(F,Cs),ps(F,As))),e.ADD_TAGS&&(H===U&&(H=vs(H)),ps(H,e.ADD_TAGS)),e.ADD_ATTR&&(F===I&&(F=vs(F)),ps(F,e.ADD_ATTR)),e.ADD_URI_SAFE_ATTR&&ps(de,e.ADD_URI_SAFE_ATTR),e.FORBID_CONTENTS&&(oe===ne&&(oe=vs(oe)),ps(oe,e.FORBID_CONTENTS)),ie&&(H["#text"]=!0),K&&ps(H,["html","head","body"]),H.table&&(ps(H,["tbody"]),delete j.tbody),Kr&&Kr(e),$e=e)},xe=ps({},["mi","mo","mn","ms","mtext"]),Ce=ps({},["foreignobject","desc","title","annotation-xml"]),Ae=ps({},fs);ps(Ae,ys),ps(Ae,bs);var ke=ps({},$s);ps(ke,ws);var Ee=function(e){var t=b(e);t&&t.tagName||(t={namespaceURI:pe,tagName:"template"});var i=os(e.tagName),r=os(t.tagName);if(e.namespaceURI===ue)return t.namespaceURI===pe?"svg"===i:t.namespaceURI===he?"svg"===i&&("annotation-xml"===r||xe[r]):Boolean(Ae[i]);if(e.namespaceURI===he)return t.namespaceURI===pe?"math"===i:t.namespaceURI===ue?"math"===i&&Ce[r]:Boolean(ke[i]);if(e.namespaceURI===pe){if(t.namespaceURI===ue&&!Ce[r])return!1;if(t.namespaceURI===he&&!xe[r])return!1;var s=ps({},["title","style","font","a","script"]);return!ke[i]&&(s[i]||!Ae[i])}return!1},Te=function(e){ss(i.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=S}catch(t){e.remove()}}},Me=function(e,t){try{ss(i.removed,{attribute:t.getAttributeNode(e),from:t})}catch(e){ss(i.removed,{attribute:null,from:t})}if(t.removeAttribute(e),"is"===e&&!F[e])if(Z||J)try{Te(t)}catch(e){}else try{t.setAttribute(e,"")}catch(e){}},De=function(e){var t=void 0,i=void 0;if(X)e="<remove></remove>"+e;else{var r=ns(e,/^[\r\n\t ]+/);i=r&&r[0]}"application/xhtml+xml"===me&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var o=w?w.createHTML(e):e;if(ve===pe)try{t=(new p).parseFromString(o,me)}catch(e){}if(!t||!t.documentElement){t=x.createDocument(ve,"template",null);try{t.documentElement.innerHTML=ge?"":o}catch(e){}}var n=t.body||t.documentElement;return e&&i&&n.insertBefore(s.createTextNode(i),n.childNodes[0]||null),ve===pe?k.call(t,K?"html":"body")[0]:K?t.documentElement:n},Ne=function(e){return C.call(e.ownerDocument||e,e,d.SHOW_ELEMENT|d.SHOW_COMMENT|d.SHOW_TEXT,null,!1)},Pe=function(e){return e instanceof u&&("string"!=typeof e.nodeName||"string"!=typeof e.textContent||"function"!=typeof e.removeChild||!(e.attributes instanceof h)||"function"!=typeof e.removeAttribute||"function"!=typeof e.setAttribute||"string"!=typeof e.namespaceURI||"function"!=typeof e.insertBefore)},ze=function(e){return"object"===(void 0===a?"undefined":Os(a))?e instanceof a:e&&"object"===(void 0===e?"undefined":Os(e))&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},Oe=function(e,t,r){M[e]&&is(M[e],(function(e){e.call(i,t,r,$e)}))},Le=function(e){var t=void 0;if(Oe("beforeSanitizeElements",e,null),Pe(e))return Te(e),!0;if(ns(e.nodeName,/[\u0080-\uFFFF]/))return Te(e),!0;var r=be(e.nodeName);if(Oe("uponSanitizeElement",e,{tagName:r,allowedTags:H}),!ze(e.firstElementChild)&&(!ze(e.content)||!ze(e.content.firstElementChild))&&cs(/<[/\w]/g,e.innerHTML)&&cs(/<[/\w]/g,e.textContent))return Te(e),!0;if("select"===r&&cs(/<template/i,e.innerHTML))return Te(e),!0;if(!H[r]||j[r]){if(!j[r]&&He(r)){if(B.tagNameCheck instanceof RegExp&&cs(B.tagNameCheck,r))return!1;if(B.tagNameCheck instanceof Function&&B.tagNameCheck(r))return!1}if(ie&&!oe[r]){var s=b(e)||e.parentNode,o=y(e)||e.childNodes;if(o&&s)for(var n=o.length-1;n>=0;--n)s.insertBefore(m(o[n],!0),f(e))}return Te(e),!0}return e instanceof l&&!Ee(e)?(Te(e),!0):"noscript"!==r&&"noembed"!==r||!cs(/<\/no(script|embed)/i,e.innerHTML)?(G&&3===e.nodeType&&(t=e.textContent,t=as(t,D," "),t=as(t,N," "),e.textContent!==t&&(ss(i.removed,{element:e.cloneNode()}),e.textContent=t)),Oe("afterSanitizeElements",e,null),!1):(Te(e),!0)},Re=function(e,t,i){if(te&&("id"===t||"name"===t)&&(i in s||i in we))return!1;if(Q&&!V[t]&&cs(P,t));else if(W&&cs(z,t));else if(!F[t]||V[t]){if(!(He(e)&&(B.tagNameCheck instanceof RegExp&&cs(B.tagNameCheck,e)||B.tagNameCheck instanceof Function&&B.tagNameCheck(e))&&(B.attributeNameCheck instanceof RegExp&&cs(B.attributeNameCheck,t)||B.attributeNameCheck instanceof Function&&B.attributeNameCheck(t))||"is"===t&&B.allowCustomizedBuiltInElements&&(B.tagNameCheck instanceof RegExp&&cs(B.tagNameCheck,i)||B.tagNameCheck instanceof Function&&B.tagNameCheck(i))))return!1}else if(de[t]);else if(cs(R,as(i,L,"")));else if("src"!==t&&"xlink:href"!==t&&"href"!==t||"script"===e||0!==ls(i,"data:")||!ae[e]){if(Y&&!cs(O,as(i,L,"")));else if(i)return!1}else;return!0},He=function(e){return e.indexOf("-")>0},Ue=function(e){var t=void 0,r=void 0,s=void 0,o=void 0;Oe("beforeSanitizeAttributes",e,null);var n=e.attributes;if(n){var a={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:F};for(o=n.length;o--;){var l=t=n[o],d=l.name,c=l.namespaceURI;if(r=ds(t.value),s=be(d),a.attrName=s,a.attrValue=r,a.keepAttr=!0,a.forceKeepAttr=void 0,Oe("uponSanitizeAttribute",e,a),r=a.attrValue,!a.forceKeepAttr&&(Me(d,e),a.keepAttr))if(cs(/\/>/i,r))Me(d,e);else{G&&(r=as(r,D," "),r=as(r,N," "));var h=be(e.nodeName);if(Re(h,s,r))try{c?e.setAttributeNS(c,d,r):e.setAttribute(d,r),rs(i.removed)}catch(e){}}}Oe("afterSanitizeAttributes",e,null)}},Fe=function e(t){var i=void 0,r=Ne(t);for(Oe("beforeSanitizeShadowDOM",t,null);i=r.nextNode();)Oe("uponSanitizeShadowNode",i,null),Le(i)||(i.content instanceof o&&e(i.content),Ue(i));Oe("afterSanitizeShadowDOM",t,null)};return i.sanitize=function(e,s){var n=void 0,l=void 0,d=void 0,c=void 0,h=void 0;if((ge=!e)&&(e="\x3c!--\x3e"),"string"!=typeof e&&!ze(e)){if("function"!=typeof e.toString)throw hs("toString is not a function");if("string"!=typeof(e=e.toString()))throw hs("dirty is not a string, aborting")}if(!i.isSupported){if("object"===Os(t.toStaticHTML)||"function"==typeof t.toStaticHTML){if("string"==typeof e)return t.toStaticHTML(e);if(ze(e))return t.toStaticHTML(e.outerHTML)}return e}if(q||_e(s),i.removed=[],"string"==typeof e&&(re=!1),re){if(e.nodeName){var u=be(e.nodeName);if(!H[u]||j[u])throw hs("root node is forbidden and cannot be sanitized in-place")}}else if(e instanceof a)1===(l=(n=De("\x3c!----\x3e")).ownerDocument.importNode(e,!0)).nodeType&&"BODY"===l.nodeName||"HTML"===l.nodeName?n=l:n.appendChild(l);else{if(!Z&&!G&&!K&&-1===e.indexOf("<"))return w&&ee?w.createHTML(e):e;if(!(n=De(e)))return Z?null:ee?S:""}n&&X&&Te(n.firstChild);for(var p=Ne(re?e:n);d=p.nextNode();)3===d.nodeType&&d===c||Le(d)||(d.content instanceof o&&Fe(d.content),Ue(d),c=d);if(c=null,re)return e;if(Z){if(J)for(h=A.call(n.ownerDocument);n.firstChild;)h.appendChild(n.firstChild);else h=n;return F.shadowroot&&(h=E.call(r,h,!0)),h}var v=K?n.outerHTML:n.innerHTML;return K&&H["!doctype"]&&n.ownerDocument&&n.ownerDocument.doctype&&n.ownerDocument.doctype.name&&cs(zs,n.ownerDocument.doctype.name)&&(v="<!DOCTYPE "+n.ownerDocument.doctype.name+">\n"+v),G&&(v=as(v,D," "),v=as(v,N," ")),w&&ee?w.createHTML(v):v},i.setConfig=function(e){_e(e),q=!0},i.clearConfig=function(){$e=null,q=!1},i.isValidAttribute=function(e,t,i){$e||_e({});var r=be(e),s=be(t);return Re(r,s,i)},i.addHook=function(e,t){"function"==typeof t&&(M[e]=M[e]||[],ss(M[e],t))},i.removeHook=function(e){M[e]&&rs(M[e])},i.removeHooks=function(e){M[e]&&(M[e]=[])},i.removeAllHooks=function(){M={}},i}();function Fs(e){switch(e){case"date":return"Published";case"reviewdate":return"Reviewed";case"addeddate":return"Added";default:return"Archived"}}function Is(e){return e?`Archivist since ${e.getFullYear()}`:""}function Bs(e,t="short",i="en-US"){if(!e)return"";const r={timeZone:"UTC"};switch(t){case"short":r.month="short",r.year="numeric";break;case"long":r.year="numeric",r.month="short",r.day="2-digit"}return new Intl.DateTimeFormat(i,r).format(e)}let js=class extends Ze{constructor(){super(...arguments),this.sortParam=null,this.collectionLinks=[]}updated(e){e.has("model")&&this.fetchCollectionNames()}async fetchCollectionNames(){var e,t;if(!(null===(e=this.model)||void 0===e?void 0:e.collections)||0===this.model.collections.length||!this.collectionNameCache)return;this.collectionLinks=[];const i=[],r=[];for(const e of this.model.collections)r.push(null===(t=this.collectionNameCache)||void 0===t?void 0:t.collectionNameFor(e).then((t=>{i.push(this.detailsLink(e,null!=t?t:e))})));await Promise.all(r),this.collectionLinks=i}render(){return fe`
      <div id="list-line" class="${this.classSize}">
        ${"mobile"===this.classSize?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){var e;return fe`
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${ui(null===(e=this.model)||void 0===e?void 0:e.mediatype)}">
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
    `}get desktopTemplate(){var e;return fe`
      <div id="list-line-left">
        <div id="thumb" class="${ui(null===(e=this.model)||void 0===e?void 0:e.mediatype)}">
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
    `}get detailsTemplate(){return fe`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate}
    `}get imgTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.identifier)?fe`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
      >
      </item-image>
    `:$e}get iconRightTemplate(){var e,t;return fe`
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${null===(e=this.model)||void 0===e?void 0:e.mediatype}
          .collections=${null===(t=this.model)||void 0===t?void 0:t.collections}
          style="--iconCustomFillColor: ${ui(this.collectionColor)}"
        >
        </mediatype-icon>
      </div>
    `}get collectionColor(){var e;if("collection"===(null===(e=this.model)||void 0===e?void 0:e.mediatype))return"#4666FF"}get titleTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.title)?fe` ${this.detailsLink(this.model.identifier,this.model.title)} `:$e}get itemLineTemplate(){const e=this.sourceTemplate,t=this.volumeTemplate,i=this.issueTemplate;return e||t||i?fe` <div id="item-line">${e} ${t} ${i}</div> `:$e}get sourceTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.source)?fe`
      <div id="source" class="metadata">
        ${this.labelTemplate("Source")}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:$e}get volumeTemplate(){var e;return this.metadataTemplate(null===(e=this.model)||void 0===e?void 0:e.volume,"Volume")}get issueTemplate(){var e;return this.metadataTemplate(null===(e=this.model)||void 0===e?void 0:e.issue,"Issue")}get creatorTemplate(){var e,t,i;return"account"===(null===(e=this.model)||void 0===e?void 0:e.mediatype)?fe`
        <div id="creator" class="metadata">
          <span class="label"> ${Is(null===(t=this.model)||void 0===t?void 0:t.dateAdded)} </span>
        </div>
      `:(null===(i=this.model)||void 0===i?void 0:i.creators)&&0!==this.model.creators.length?fe`
      <div id="creator" class="metadata">
        ${this.labelTemplate("By")}
        ${Br(jr(this.model.creators,(e=>this.searchLink("creator",e))),fe`, `)}
      </div>
    `:$e}get datePublishedTemplate(){var e;return this.metadataTemplate(Bs(null===(e=this.model)||void 0===e?void 0:e.datePublished,"long"),"Published")}get dateSortByTemplate(){return!this.sortParam||"addeddate"!==this.sortParam.field&&"reviewdate"!==this.sortParam.field&&"publicdate"!==this.sortParam.field?$e:this.metadataTemplate(Bs(this.date,"long"),Fs(this.sortParam.field))}get viewsTemplate(){var e,t;return this.metadataTemplate(`${mr(null!==(t=null===(e=this.model)||void 0===e?void 0:e.viewCount)&&void 0!==t?t:0,this.formatSize)}`,"Views")}get ratingTemplate(){var e;return this.metadataTemplate(null===(e=this.model)||void 0===e?void 0:e.averageRating,"Avg Rating")}get reviewsTemplate(){var e;return this.metadataTemplate(null===(e=this.model)||void 0===e?void 0:e.commentCount,"Reviews")}get topicsTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.subjects)&&0!==this.model.subjects.length?fe`
      <div id="topics" class="metadata">
        ${this.labelTemplate("Topics")}
        ${Br(jr(this.model.subjects,(e=>this.searchLink("subject",e))),fe`, `)}
      </div>
    `:$e}get collectionsTemplate(){return this.collectionLinks&&0!==this.collectionLinks.length?fe`
      <div id="collections" class="metadata">
        ${this.labelTemplate("Collections")}
        ${Br(this.collectionLinks,fe`, `)}
      </div>
    `:$e}get descriptionTemplate(){var e,t;return this.metadataTemplate(Us.sanitize(null!==(t=null===(e=this.model)||void 0===e?void 0:e.description)&&void 0!==t?t:""),"","description")}metadataTemplate(e,t="",i){return e?fe`
      <div id=${ui(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:$e}labelTemplate(e){return fe` ${e?fe`<span class="label">${e}: </span>`:$e}`}searchLink(e,t){if(!e||!t)return $e;const i=encodeURIComponent(`${e}:"${t}"`);return fe`<a href="${this.baseNavigationUrl}/search.php?query=${i}">
      ${Us.sanitize(t)}</a
    >`}detailsLink(e,t){const i=null!=t?t:e;return fe`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(e)}"
      >${Us.sanitize(i)}</a
    >`}get date(){var e,t,i,r,s;switch(null===(e=this.sortParam)||void 0===e?void 0:e.field){case"date":return null===(t=this.model)||void 0===t?void 0:t.datePublished;case"reviewdate":return null===(i=this.model)||void 0===i?void 0:i.dateReviewed;case"addeddate":return null===(r=this.model)||void 0===r?void 0:r.dateAdded;default:return null===(s=this.model)||void 0===s?void 0:s.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return Fe`
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
    `}};e([it({type:Object})],js.prototype,"model",void 0),e([it({type:String})],js.prototype,"baseNavigationUrl",void 0),e([it({type:Object})],js.prototype,"collectionNameCache",void 0),e([it({type:Number})],js.prototype,"currentWidth",void 0),e([it({type:Number})],js.prototype,"currentHeight",void 0),e([it({type:Object})],js.prototype,"sortParam",void 0),e([it({type:Number})],js.prototype,"mobileBreakpoint",void 0),e([rt()],js.prototype,"collectionLinks",void 0),e([it({type:String})],js.prototype,"baseImageUrl",void 0),js=e([et("tile-list")],js);let Vs=class extends Ze{constructor(){super(...arguments),this.sortParam=null}render(){var e,t,i,r,s,o,n,a,l,d,c;return fe`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${ui(null===(e=this.model)||void 0===e?void 0:e.mediatype)}">
          ${this.imageTemplate}
        </div>
        <div id="title">${Us.sanitize(null!==(i=null===(t=this.model)||void 0===t?void 0:t.title)&&void 0!==i?i:"")}</div>
        <div id="creator">
          ${"account"===(null===(r=this.model)||void 0===r?void 0:r.mediatype)?Is(null===(s=this.model)||void 0===s?void 0:s.dateAdded):Us.sanitize(null!==(n=null===(o=this.model)||void 0===o?void 0:o.creator)&&void 0!==n?n:"")}
        </div>
        <div id="date">${Bs(this.date,this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${null===(a=this.model)||void 0===a?void 0:a.mediatype}
            .collections=${null===(l=this.model)||void 0===l?void 0:l.collections}
            style="--iconCustomFillColor: ${ui(this.collectionColor)}"
          >
          </mediatype-icon>
        </div>
        <div id="views">
          ${mr(null!==(c=null===(d=this.model)||void 0===d?void 0:d.viewCount)&&void 0!==c?c:0,this.formatSize)}
        </div>
      </div>
    `}get collectionColor(){var e;if("collection"===(null===(e=this.model)||void 0===e?void 0:e.mediatype))return"#4666FF"}get imageTemplate(){var e;return(null===(e=this.model)||void 0===e?void 0:e.identifier)?fe`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${!0}
        .isCompactTile=${!0}
      >
      </item-image>
    `:$e}get date(){var e,t,i,r,s;switch(null===(e=this.sortParam)||void 0===e?void 0:e.field){case"date":return null===(t=this.model)||void 0===t?void 0:t.datePublished;case"reviewdate":return null===(i=this.model)||void 0===i?void 0:i.dateReviewed;case"addeddate":return null===(r=this.model)||void 0===r?void 0:r.dateAdded;default:return null===(s=this.model)||void 0===s?void 0:s.dateArchived}}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return Fe`
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
    `}};e([it({type:Object})],Vs.prototype,"model",void 0),e([it({type:String})],Vs.prototype,"baseNavigationUrl",void 0),e([it({type:Number})],Vs.prototype,"currentWidth",void 0),e([it({type:Number})],Vs.prototype,"currentHeight",void 0),e([it({type:Object})],Vs.prototype,"sortParam",void 0),e([it({type:Number})],Vs.prototype,"mobileBreakpoint",void 0),e([it({type:String})],Vs.prototype,"baseImageUrl",void 0),Vs=e([et("tile-list-compact")],Vs);let Ws=class extends Ze{constructor(){super(...arguments),this.sortParam=null}render(){var e;return fe`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${Fs(null===(e=this.sortParam)||void 0===e?void 0:e.field)}</div>
        <div id="icon"></div>
        <div id="views">Views</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return Fe`
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
    `}};e([it({type:Object})],Ws.prototype,"model",void 0),e([it({type:Number})],Ws.prototype,"currentWidth",void 0),e([it({type:Object})],Ws.prototype,"sortParam",void 0),e([it({type:Number})],Ws.prototype,"mobileBreakpoint",void 0),Ws=e([et("tile-list-compact-header")],Ws);let Qs=class extends Ze{constructor(){super(...arguments),this.sortParam=null}render(){return fe`
      <div id="container">
        ${"list-header"===this.tileDisplayMode?this.headerTemplate:this.tileTemplate}
      </div>
    `}get headerTemplate(){const{currentWidth:e,sortParam:t,mobileBreakpoint:i}=this;return fe`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t}
        .mobileBreakpoint=${i}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return fe`
      ${"list-detail"===this.tileDisplayMode?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t;return fe`
      <a
        href="${this.baseNavigationUrl}/details/${null===(e=this.model)||void 0===e?void 0:e.identifier}"
        title=${ui(null===(t=this.model)||void 0===t?void 0:t.title)}
      >
        ${this.tile}
      </a>
    `}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){null==e||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),null===(e=this.resizeObserver)||void 0===e||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}get tile(){const{model:e,baseNavigationUrl:t,currentWidth:i,currentHeight:r,sortParam:s,mobileBreakpoint:o}=this;if(!e)return $e;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return fe`<collection-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            >
            </collection-tile>`;case"account":return fe`<account-tile
              .model=${e}
              .currentWidth=${i}
              .currentHeight=${r}
            ></account-tile>`;default:return fe`<item-tile
              .model=${e}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
            ></item-tile>`}case"list-compact":return fe`<tile-list-compact
          .model=${e}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${s}
          .mobileBreakpoint=${o}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list-compact>`;case"list-detail":return fe`<tile-list
          .model=${e}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${i}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${s}
          .mobileBreakpoint=${o}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list>`;default:return $e}}static get styles(){return Fe`
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
    `}};e([it({type:String})],Qs.prototype,"tileDisplayMode",void 0),e([it({type:Object})],Qs.prototype,"model",void 0),e([it({type:String})],Qs.prototype,"baseNavigationUrl",void 0),e([it({type:Number})],Qs.prototype,"currentWidth",void 0),e([it({type:Number})],Qs.prototype,"currentHeight",void 0),e([it({type:Object})],Qs.prototype,"resizeObserver",void 0),e([it({type:Object})],Qs.prototype,"collectionNameCache",void 0),e([it({type:Object})],Qs.prototype,"sortParam",void 0),e([st("#container")],Qs.prototype,"container",void 0),e([it({type:Number})],Qs.prototype,"mobileBreakpoint",void 0),e([it({type:String})],Qs.prototype,"baseImageUrl",void 0),Qs=e([et("tile-dispatcher")],Qs);let Ys=class extends Ze{render(){return fe` <div id="container"></div> `}static get styles(){return Fe`
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
    `}};var Gs;Ys=e([et("collection-browser-loading-tile")],Ys),function(e){e.relevance="relevance",e.views="views",e.title="title",e.datearchived="datearchived",e.date="date",e.datereviewed="datereviewed",e.dateadded="dateadded",e.creator="creator"}(Gs||(Gs={}));const Ks={relevance:"Relevance",views:"Views",title:"Title",datearchived:"Date Archived",date:"Date Published",datereviewed:"Date Reviewed",dateadded:"Date Added",creator:"Creator"},qs={relevance:null,views:"week",title:"titleSorter",datearchived:"publicdate",date:"date",datereviewed:"reviewdate",dateadded:"addeddate",creator:"creatorSorter"},Xs={titleSorter:Gs.title,date:Gs.date,publicdate:Gs.datearchived,reviewdate:Gs.datereviewed,addeddate:Gs.dateadded,creatorSorter:Gs.creator,week:Gs.views},Zs={subject:{},mediatype:{},language:{},creator:{},collection:{},year:{}};let Js=class extends Ze{constructor(){super(...arguments),this.selectedLetter=null,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return null===(e=this.selectedLetter)||void 0===e?void 0:e.toUpperCase()}render(){return fe`
      <div id="container">
        <ul>
          ${this.alphabet.map((e=>fe`
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
              `))}
        </ul>
      </div>
    `}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}};Js.styles=Fe`
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
  `,e([it({type:String})],Js.prototype,"selectedLetter",void 0),Js=e([et("alpha-bar")],Js);const eo=ye`
<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg"><path d="m50 0 50 55h-100z"/></svg>
`,to=ye`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,io=ye`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,ro=ye`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let so=class extends Ze{constructor(){super(...arguments),this.sortDirection=null,this.selectedSort=Gs.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.showRelevance=!0,this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.desktopSelectorBarWidth=0,this.selectorBarContainerWidth=0,this.hoveringOverDateSortOptions=!1,this.boundDateSelectorEscapeListener=e=>{"Escape"===e.key&&(this.dateSortSelectorVisible=!1)}}render(){return fe`
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

        ${this.dateSortSelectorVisible&&!this.mobileSelectorVisible?this.dateSortSelector:$e}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedSort")&&null===this.sortDirection&&(this.sortDirection="desc"),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dateSortSelectorVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dateSortSelectorVisible?document.addEventListener("keydown",this.boundDateSelectorEscapeListener):document.removeEventListener("keydown",this.boundDateSelectorEscapeListener)}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){e.removeObserver({target:this.sortSelectorContainer,handler:this}),e.removeObserver({target:this.desktopSortSelector,handler:this})}setupResizeObserver(){this.resizeObserver&&(this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.resizeObserver.addObserver({target:this.desktopSortSelector,handler:this}))}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSelectorBarWidth}get alphaBarTemplate(){return["title","creator"].includes(this.selectedSort)?null!==this.alphaSelectorVisible?"creator"===this.alphaSelectorVisible?this.creatorSelectorBar:this.titleSelectorBar:"creator"===this.selectedSort?this.creatorSelectorBar:"title"===this.selectedSort?this.titleSelectorBar:$e:$e}handleResize(e){e.target===this.desktopSortSelector?this.desktopSelectorBarWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get sortDirectionSelectorTemplate(){return fe`
      <div id="sort-direction-selector">
        <button
          id="sort-ascending-btn"
          class="sort-button ${"asc"===this.sortDirection?"selected":""}"
          ?disabled=${"relevance"===this.selectedSort}
          @click=${()=>{this.setSortDirections("asc")}}
        >
          ${eo}
        </button>
        <button
          id="sort-descending-btn"
          class="sort-button ${"desc"===this.sortDirection?"selected":""}"
          ?disabled=${"relevance"===this.selectedSort}
          @click=${()=>{this.setSortDirections("desc")}}
        >
          ${eo}
        </button>
      </div>
    `}get desktopSortSelectorTemplate(){return fe`
      <ul
        id="desktop-sort-selector"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <li id="sort-by-text">Sort By</li>
        <li>
          ${this.showRelevance?this.getSortDisplayOption(Gs.relevance):$e}
        </li>
        <li>${this.getSortDisplayOption(Gs.views)}</li>
        <li>
          ${this.getSortDisplayOption(Gs.title,{clickEvent:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(Gs.title),this.emitCreatorLetterChangedEvent()}})}
        </li>
        <li>
          ${this.getSortDisplayOption(Gs.date,{clickEvent:()=>{this.dateOptionSelected||this.setSelectedSort(Gs.date),this.dateSortSelectorVisible=!this.dateSortSelectorVisible,this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()},displayName:fe`${this.dateSortField}`,isSelected:()=>this.dateOptionSelected})}
        </li>
        <li>
          ${this.getSortDisplayOption(Gs.creator,{clickEvent:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.dateSortSelectorVisible=!1,this.setSelectedSort(Gs.creator),this.emitTitleLetterChangedEvent()}})}
        </li>
      </ul>
    `}getSortDisplayOption(e,t){var i,r;const s=null!==(i=null==t?void 0:t.isSelected)&&void 0!==i?i:()=>this.selectedSort===e,o=null!==(r=null==t?void 0:t.displayName)&&void 0!==r?r:Ks[e];return fe`
      <a
        href="#"
        @click=${i=>{i.preventDefault(),(null==t?void 0:t.clickEvent)?t.clickEvent(i):(this.alphaSelectorVisible=null,this.dateSortSelectorVisible=!1,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.setSelectedSort(e),this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent())}}
        class=${s()?"selected":""}
      >
        ${o}
      </a>
    `}get mobileSortSelectorTemplate(){return fe`
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${Object.keys(Gs).map((e=>fe`
            <option value="${e}" ?selected=${this.selectedSort===e}>
              ${Ks[e]}
            </option>
          `))}
      </select>
    `}mobileSortChanged(e){const t=e.target;this.setSelectedSort(t.value)}get displayOptionTemplate(){return fe`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${"grid"===this.displayMode?"active":""}
          >
            ${to}
          </button>
        </li>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="list-detail"}}
            class=${"list-detail"===this.displayMode?"active":""}
          >
            ${io}
          </button>
        </li>
        <li>
          <button
            id="list-button"
            @click=${()=>{this.displayMode="list-compact"}}
            class=${"list-compact"===this.displayMode?"active":""}
          >
            ${ro}
          </button>
        </li>
      </ul>
    `}get dateSortSelector(){return fe`
      <div
        id="date-sort-selector-backdrop"
        @keyup=${()=>{this.dateSortSelectorVisible=!1}}
        @click=${()=>{this.dateSortSelectorVisible=!1}}
      ></div>
      <div id="date-sort-selector">
        <ul>
          <li>${this.getDateSortButton(Gs.datearchived)}</li>
          <li>${this.getDateSortButton(Gs.date)}</li>
          <li>${this.getDateSortButton(Gs.datereviewed)}</li>
          <li>${this.getDateSortButton(Gs.dateadded)}</li>
        </ul>
      </div>
    `}getDateSortButton(e){return fe`
      <button
        @click=${()=>{this.selectDateSort(e)}}
        class=${this.selectedSort===e?"selected":""}
      >
        ${Ks[e]}
      </button>
    `}selectDateSort(e){this.dateSortSelectorVisible=!1,this.setSelectedSort(e)}setSortDirections(e){this.sortDirection=e,this.emitSortChangedEvent()}setSelectedSort(e){this.selectedSort=e,this.emitSortChangedEvent()}get dateOptionSelected(){return[Gs.datearchived,Gs.date,Gs.datereviewed,Gs.dateadded].includes(this.selectedSort)}get dateSortField(){var e;const t=Ks[Gs.date];return this.dateOptionSelected&&null!==(e=Ks[this.selectedSort])&&void 0!==e?e:t}get titleSelectorBar(){return fe` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){return fe` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=null!==(t=e.detail.selectedLetter)&&void 0!==t?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=null!==(t=e.detail.selectedLetter)&&void 0!==t?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}};so.styles=Fe`
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
  `,e([it({type:String})],so.prototype,"displayMode",void 0),e([it({type:String})],so.prototype,"sortDirection",void 0),e([it({type:String})],so.prototype,"selectedSort",void 0),e([it({type:String})],so.prototype,"selectedTitleFilter",void 0),e([it({type:String})],so.prototype,"selectedCreatorFilter",void 0),e([it({type:Boolean})],so.prototype,"showRelevance",void 0),e([it({type:Object})],so.prototype,"resizeObserver",void 0),e([rt()],so.prototype,"alphaSelectorVisible",void 0),e([rt()],so.prototype,"dateSortSelectorVisible",void 0),e([rt()],so.prototype,"desktopSelectorBarWidth",void 0),e([rt()],so.prototype,"selectorBarContainerWidth",void 0),e([rt()],so.prototype,"hoveringOverDateSortOptions",void 0),e([st("#desktop-sort-selector")],so.prototype,"desktopSortSelector",void 0),e([st("#sort-selector-container")],so.prototype,"sortSelectorContainer",void 0),so=e([et("sort-filter-bar")],so);const oo=1,no=2,ao=3,lo=4,co=e=>(...t)=>({_$litDirective$:e,values:t});class ho{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{H:uo}=ze,po=()=>document.createComment(""),vo=(e,t,i)=>{var r;const s=e._$AA.parentNode,o=void 0===t?e._$AB:t._$AA;if(void 0===i){const t=s.insertBefore(po(),o),r=s.insertBefore(po(),o);i=new uo(t,r,e,e.options)}else{const t=i._$AB.nextSibling,n=i._$AM,a=n!==e;if(a){let t;null===(r=i._$AQ)||void 0===r||r.call(i,e),i._$AM=e,void 0!==i._$AP&&(t=e._$AU)!==n._$AU&&i._$AP(t)}if(t!==o||a){let e=i._$AA;for(;e!==t;){const t=e.nextSibling;s.insertBefore(e,o),e=t}}}return i},go=(e,t,i=e)=>(e._$AI(t,i),e),mo={},fo=(e,t=mo)=>e._$AH=t,yo=e=>{var t;null===(t=e._$AP)||void 0===t||t.call(e,!1,!0);let i=e._$AA;const r=e._$AB.nextSibling;for(;i!==r;){const e=i.nextSibling;i.remove(),i=e}},bo=(e,t,i)=>{const r=new Map;for(let s=t;s<=i;s++)r.set(e[s],s);return r},$o=co(class extends ho{constructor(e){if(super(e),e.type!==no)throw Error("repeat() can only be used in text expressions")}dt(e,t,i){let r;void 0===i?i=t:void 0!==t&&(r=t);const s=[],o=[];let n=0;for(const t of e)s[n]=r?r(t,n):n,o[n]=i(t,n),n++;return{values:o,keys:s}}render(e,t,i){return this.dt(e,t,i).values}update(e,[t,i,r]){var s;const o=(e=>e._$AH)(e),{values:n,keys:a}=this.dt(t,i,r);if(!Array.isArray(o))return this.ut=a,n;const l=null!==(s=this.ut)&&void 0!==s?s:this.ut=[],d=[];let c,h,u=0,p=o.length-1,v=0,g=n.length-1;for(;u<=p&&v<=g;)if(null===o[u])u++;else if(null===o[p])p--;else if(l[u]===a[v])d[v]=go(o[u],n[v]),u++,v++;else if(l[p]===a[g])d[g]=go(o[p],n[g]),p--,g--;else if(l[u]===a[g])d[g]=go(o[u],n[g]),vo(e,d[g+1],o[u]),u++,g--;else if(l[p]===a[v])d[v]=go(o[p],n[v]),vo(e,o[u],o[p]),p--,v++;else if(void 0===c&&(c=bo(a,v,g),h=bo(l,u,p)),c.has(l[u]))if(c.has(l[p])){const t=h.get(a[v]),i=void 0!==t?o[t]:null;if(null===i){const t=vo(e,o[u]);go(t,n[v]),d[v]=t}else d[v]=go(i,n[v]),vo(e,o[u],i),o[t]=null;v++}else yo(o[p]),p--;else yo(o[u]),u++;for(;v<=g;){const t=vo(e,d[g+1]);go(t,n[v]),d[v++]=t}for(;u<=p;){const e=o[u++];null!==e&&yo(e)}return this.ut=a,fo(e,d),be}}),wo=window.ShadowRoot&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,So=Symbol(),_o=new Map;class xo{constructor(e,t){if(this._$cssResult$=!0,t!==So)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e}get styleSheet(){let e=_o.get(this.cssText);return wo&&void 0===e&&(_o.set(this.cssText,e=new CSSStyleSheet),e.replaceSync(this.cssText)),e}toString(){return this.cssText}}const Co=wo?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new xo("string"==typeof e?e:e+"",So))(t)})(e):e;var Ao;const ko=window.trustedTypes,Eo=ko?ko.emptyScript:"",To=window.reactiveElementPolyfillSupport,Mo={toAttribute(e,t){switch(t){case Boolean:e=e?Eo:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},Do=(e,t)=>t!==e&&(t==t||e==e),No={attribute:!0,type:String,converter:Mo,reflect:!1,hasChanged:Do};class Po extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(e){var t;null!==(t=this.l)&&void 0!==t||(this.l=[]),this.l.push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,i)=>{const r=this._$Eh(i,t);void 0!==r&&(this._$Eu.set(r,i),e.push(r))})),e}static createProperty(e,t=No){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,r=this.getPropertyDescriptor(e,i,t);void 0!==r&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(r){const s=this[e];this[t]=r,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||No}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),this.elementProperties=new Map(e.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(Co(e))}else void 0!==e&&t.push(Co(e));return t}static _$Eh(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}o(){var e;this._$Ep=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Em(),this.requestUpdate(),null===(e=this.constructor.l)||void 0===e||e.forEach((e=>e(this)))}addController(e){var t,i;(null!==(t=this._$Eg)&&void 0!==t?t:this._$Eg=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$Eg)||void 0===t||t.splice(this._$Eg.indexOf(e)>>>0,1)}_$Em(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Et.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,t)=>{wo?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{const i=document.createElement("style"),r=window.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=t.cssText,e.appendChild(i)}))})(t,this.constructor.elementStyles),t}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)}))}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)}))}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ES(e,t,i=No){var r,s;const o=this.constructor._$Eh(e,i);if(void 0!==o&&!0===i.reflect){const n=(null!==(s=null===(r=i.converter)||void 0===r?void 0:r.toAttribute)&&void 0!==s?s:Mo.toAttribute)(t,i.type);this._$Ei=e,null==n?this.removeAttribute(o):this.setAttribute(o,n),this._$Ei=null}}_$AK(e,t){var i,r,s;const o=this.constructor,n=o._$Eu.get(e);if(void 0!==n&&this._$Ei!==n){const e=o.getPropertyOptions(n),a=e.converter,l=null!==(s=null!==(r=null===(i=a)||void 0===i?void 0:i.fromAttribute)&&void 0!==r?r:"function"==typeof a?a:null)&&void 0!==s?s:Mo.fromAttribute;this._$Ei=n,this[n]=l(t,e.type),this._$Ei=null}}requestUpdate(e,t,i){let r=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Do)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$Ei!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):r=!1),!this.isUpdatePending&&r&&(this._$Ep=this._$E_())}async _$E_(){this.isUpdatePending=!0;try{await this._$Ep}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach(((e,t)=>this[t]=e)),this._$Et=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$Eg)||void 0===e||e.forEach((e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)})),this.update(i)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$Eg)||void 0===t||t.forEach((e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ep}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach(((e,t)=>this._$ES(t,this[t],e))),this._$EC=void 0),this._$EU()}updated(e){}firstUpdated(e){}}Po.finalized=!0,Po.elementProperties=new Map,Po.elementStyles=[],Po.shadowRootOptions={mode:"open"},null==To||To({ReactiveElement:Po}),(null!==(Ao=globalThis.reactiveElementVersions)&&void 0!==Ao?Ao:globalThis.reactiveElementVersions=[]).push("1.3.0");const zo=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};function Oo(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):zo(e,t)}function Lo(e){return Oo({...e,state:!0})}var Ro;null===(Ro=window.HTMLSlotElement)||void 0===Ro||Ro.prototype.assignedElements;const Ho=co(class extends ho{constructor(e){if(super(e),e.type!==ao&&e.type!==oo&&e.type!==lo)throw Error("The `live` directive is not allowed on child or event bindings");if(!(e=>void 0===e.strings)(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===be||t===$e)return t;const i=e.element,r=e.name;if(e.type===ao){if(t===i[r])return be}else if(e.type===lo){if(!!t===i.hasAttribute(r))return be}else if(e.type===oo&&i.getAttribute(r)===t+"")return be;return fo(e),t}});var Uo="millisecond",Fo="second",Io="minute",Bo="hour",jo="day",Vo="week",Wo="month",Qo="quarter",Yo="year",Go="date",Ko=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,qo=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Xo={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},Zo=function(e,t,i){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(i)+e},Jo={s:Zo,z:function(e){var t=-e.utcOffset(),i=Math.abs(t),r=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+Zo(r,2,"0")+":"+Zo(s,2,"0")},m:function e(t,i){if(t.date()<i.date())return-e(i,t);var r=12*(i.year()-t.year())+(i.month()-t.month()),s=t.clone().add(r,Wo),o=i-s<0,n=t.clone().add(r+(o?-1:1),Wo);return+(-(r+(i-s)/(o?s-n:n-s))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:Wo,y:Yo,w:Vo,d:jo,D:Go,h:Bo,m:Io,s:Fo,ms:Uo,Q:Qo}[e]||String(e||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}},en="en",tn={};tn[en]=Xo;var rn=function(e){return e instanceof an},sn=function(e,t,i){var r;if(!e)return en;if("string"==typeof e)tn[e]&&(r=e),t&&(tn[e]=t,r=e);else{var s=e.name;tn[s]=e,r=s}return!i&&r&&(en=r),r||!i&&en},on=function(e,t){if(rn(e))return e.clone();var i="object"==typeof t?t:{};return i.date=e,i.args=arguments,new an(i)},nn=Jo;nn.l=sn,nn.i=rn,nn.w=function(e,t){return on(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var an=function(){function e(e){this.$L=sn(e.locale,null,!0),this.parse(e)}var t=e.prototype;return t.parse=function(e){this.$d=function(e){var t=e.date,i=e.utc;if(null===t)return new Date(NaN);if(nn.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var r=t.match(Ko);if(r){var s=r[2]-1||0,o=(r[7]||"0").substring(0,3);return i?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,o)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},t.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},t.$utils=function(){return nn},t.isValid=function(){return!("Invalid Date"===this.$d.toString())},t.isSame=function(e,t){var i=on(e);return this.startOf(t)<=i&&i<=this.endOf(t)},t.isAfter=function(e,t){return on(e)<this.startOf(t)},t.isBefore=function(e,t){return this.endOf(t)<on(e)},t.$g=function(e,t,i){return nn.u(e)?this[t]:this.set(i,e)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(e,t){var i=this,r=!!nn.u(t)||t,s=nn.p(e),o=function(e,t){var s=nn.w(i.$u?Date.UTC(i.$y,t,e):new Date(i.$y,t,e),i);return r?s:s.endOf(jo)},n=function(e,t){return nn.w(i.toDate()[e].apply(i.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),i)},a=this.$W,l=this.$M,d=this.$D,c="set"+(this.$u?"UTC":"");switch(s){case Yo:return r?o(1,0):o(31,11);case Wo:return r?o(1,l):o(0,l+1);case Vo:var h=this.$locale().weekStart||0,u=(a<h?a+7:a)-h;return o(r?d-u:d+(6-u),l);case jo:case Go:return n(c+"Hours",0);case Bo:return n(c+"Minutes",1);case Io:return n(c+"Seconds",2);case Fo:return n(c+"Milliseconds",3);default:return this.clone()}},t.endOf=function(e){return this.startOf(e,!1)},t.$set=function(e,t){var i,r=nn.p(e),s="set"+(this.$u?"UTC":""),o=(i={},i[jo]=s+"Date",i[Go]=s+"Date",i[Wo]=s+"Month",i[Yo]=s+"FullYear",i[Bo]=s+"Hours",i[Io]=s+"Minutes",i[Fo]=s+"Seconds",i[Uo]=s+"Milliseconds",i)[r],n=r===jo?this.$D+(t-this.$W):t;if(r===Wo||r===Yo){var a=this.clone().set(Go,1);a.$d[o](n),a.init(),this.$d=a.set(Go,Math.min(this.$D,a.daysInMonth())).$d}else o&&this.$d[o](n);return this.init(),this},t.set=function(e,t){return this.clone().$set(e,t)},t.get=function(e){return this[nn.p(e)]()},t.add=function(e,t){var i,r=this;e=Number(e);var s=nn.p(t),o=function(t){var i=on(r);return nn.w(i.date(i.date()+Math.round(t*e)),r)};if(s===Wo)return this.set(Wo,this.$M+e);if(s===Yo)return this.set(Yo,this.$y+e);if(s===jo)return o(1);if(s===Vo)return o(7);var n=(i={},i[Io]=6e4,i[Bo]=36e5,i[Fo]=1e3,i)[s]||1,a=this.$d.getTime()+e*n;return nn.w(a,this)},t.subtract=function(e,t){return this.add(-1*e,t)},t.format=function(e){var t=this,i=this.$locale();if(!this.isValid())return i.invalidDate||"Invalid Date";var r=e||"YYYY-MM-DDTHH:mm:ssZ",s=nn.z(this),o=this.$H,n=this.$m,a=this.$M,l=i.weekdays,d=i.months,c=function(e,i,s,o){return e&&(e[i]||e(t,r))||s[i].substr(0,o)},h=function(e){return nn.s(o%12||12,e,"0")},u=i.meridiem||function(e,t,i){var r=e<12?"AM":"PM";return i?r.toLowerCase():r},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:nn.s(a+1,2,"0"),MMM:c(i.monthsShort,a,d,3),MMMM:c(d,a),D:this.$D,DD:nn.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,l,2),ddd:c(i.weekdaysShort,this.$W,l,3),dddd:l[this.$W],H:String(o),HH:nn.s(o,2,"0"),h:h(1),hh:h(2),a:u(o,n,!0),A:u(o,n,!1),m:String(n),mm:nn.s(n,2,"0"),s:String(this.$s),ss:nn.s(this.$s,2,"0"),SSS:nn.s(this.$ms,3,"0"),Z:s};return r.replace(qo,(function(e,t){return t||p[e]||s.replace(":","")}))},t.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},t.diff=function(e,t,i){var r,s=nn.p(t),o=on(e),n=6e4*(o.utcOffset()-this.utcOffset()),a=this-o,l=nn.m(this,o);return l=(r={},r[Yo]=l/12,r[Wo]=l,r[Qo]=l/3,r[Vo]=(a-n)/6048e5,r[jo]=(a-n)/864e5,r[Bo]=a/36e5,r[Io]=a/6e4,r[Fo]=a/1e3,r)[s]||a,i?l:nn.a(l)},t.daysInMonth=function(){return this.endOf(Wo).$D},t.$locale=function(){return tn[this.$L]},t.locale=function(e,t){if(!e)return this.$L;var i=this.clone(),r=sn(e,t,!0);return r&&(i.$L=r),i},t.clone=function(){return nn.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},e}(),ln=an.prototype;on.prototype=ln,[["$ms",Uo],["$s",Fo],["$m",Io],["$H",Bo],["$W",jo],["$M",Wo],["$y",Yo],["$D",Go]].forEach((function(e){ln[e[1]]=function(t){return this.$g(t,e[0],e[1])}})),on.extend=function(e,t){return e.$i||(e(t,an,on),e.$i=!0),on},on.locale=sn,on.isDayjs=rn,on.unix=function(e){return on(1e3*e)},on.en=tn[en],on.Ls=tn,on.p={};var dn={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},cn=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,hn=/\d\d/,un=/\d\d?/,pn=/\d*[^\s\d-_:/()]+/,vn={},gn=function(e){return(e=+e)+(e>68?1900:2e3)};var mn=function(e){return function(t){this[e]=+t}},fn=[/[+-]\d\d:?(\d\d)?|Z/,function(e){(this.zone||(this.zone={})).offset=function(e){if(!e)return 0;if("Z"===e)return 0;var t=e.match(/([+-]|\d\d)/g),i=60*t[1]+(+t[2]||0);return 0===i?0:"+"===t[0]?-i:i}(e)}],yn=function(e){var t=vn[e];return t&&(t.indexOf?t:t.s.concat(t.f))},bn=function(e,t){var i,r=vn.meridiem;if(r){for(var s=1;s<=24;s+=1)if(e.indexOf(r(s,0,t))>-1){i=s>12;break}}else i=e===(t?"pm":"PM");return i},$n={A:[pn,function(e){this.afternoon=bn(e,!1)}],a:[pn,function(e){this.afternoon=bn(e,!0)}],S:[/\d/,function(e){this.milliseconds=100*+e}],SS:[hn,function(e){this.milliseconds=10*+e}],SSS:[/\d{3}/,function(e){this.milliseconds=+e}],s:[un,mn("seconds")],ss:[un,mn("seconds")],m:[un,mn("minutes")],mm:[un,mn("minutes")],H:[un,mn("hours")],h:[un,mn("hours")],HH:[un,mn("hours")],hh:[un,mn("hours")],D:[un,mn("day")],DD:[hn,mn("day")],Do:[pn,function(e){var t=vn.ordinal,i=e.match(/\d+/);if(this.day=i[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===e&&(this.day=r)}],M:[un,mn("month")],MM:[hn,mn("month")],MMM:[pn,function(e){var t=yn("months"),i=(yn("monthsShort")||t.map((function(e){return e.substr(0,3)}))).indexOf(e)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[pn,function(e){var t=yn("months").indexOf(e)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[/[+-]?\d+/,mn("year")],YY:[hn,function(e){this.year=gn(e)}],YYYY:[/\d{4}/,mn("year")],Z:fn,ZZ:fn};function wn(e){var t,i;t=e,i=vn&&vn.formats,e=t.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,t,r){var s=r&&r.toUpperCase();return t||i[r]||dn[r]||i[s].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(e,t,i){return t||i.slice(1)}))}));for(var r=e.match(cn),s=r.length,o=0;o<s;o+=1){var n=r[o],a=$n[n],l=a&&a[0],d=a&&a[1];r[o]=d?{regex:l,parser:d}:n.replace(/^\[|\]$/g,"")}return function(e){for(var t={},i=0,o=0;i<s;i+=1){var n=r[i];if("string"==typeof n)o+=n.length;else{var a=n.regex,l=n.parser,d=e.substr(o),c=a.exec(d)[0];l.call(t,c),e=e.replace(c,"")}}return function(e){var t=e.afternoon;if(void 0!==t){var i=e.hours;t?i<12&&(e.hours+=12):12===i&&(e.hours=0),delete e.afternoon}}(t),t}}var Sn;const _n=globalThis.trustedTypes,xn=_n?_n.createPolicy("lit-html",{createHTML:e=>e}):void 0,Cn=`lit$${(Math.random()+"").slice(9)}$`,An="?"+Cn,kn=`<${An}>`,En=document,Tn=(e="")=>En.createComment(e),Mn=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Dn=Array.isArray,Nn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Pn=/-->/g,zn=/>/g,On=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,Ln=/'/g,Rn=/"/g,Hn=/^(?:script|style|textarea)$/i,Un=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),Fn=Symbol.for("lit-noChange"),In=Symbol.for("lit-nothing"),Bn=new WeakMap,jn=En.createTreeWalker(En,129,null,!1);class Vn{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=((e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=Nn;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===Nn?"!--"===l[1]?n=Pn:void 0!==l[1]?n=zn:void 0!==l[2]?(Hn.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=On):void 0!==l[3]&&(n=On):n===On?">"===l[0]?(n=null!=s?s:Nn,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?On:'"'===l[3]?Rn:Ln):n===Rn||n===Ln?n=On:n===Pn||n===zn?n=Nn:(n=On,s=void 0);const h=n===On&&e[t+1].startsWith("/>")?" ":"";o+=n===Nn?i+kn:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+Cn+h):i+Cn+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==xn?xn.createHTML(a):a,r]})(e,t);if(this.el=Vn.createElement(l,i),jn.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=jn.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(Cn)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(Cn),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?Kn:"?"===t[1]?Xn:"@"===t[1]?Zn:Gn})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(Hn.test(r.tagName)){const e=r.textContent.split(Cn),t=e.length-1;if(t>0){r.textContent=_n?_n.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],Tn()),jn.nextNode(),a.push({type:2,index:++s});r.append(e[t],Tn())}}}else if(8===r.nodeType)if(r.data===An)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(Cn,e+1));)a.push({type:7,index:s}),e+=Cn.length-1}s++}}static createElement(e,t){const i=En.createElement("template");return i.innerHTML=e,i}}function Wn(e,t,i=e,r){var s,o,n,a;if(t===Fn)return t;let l=void 0!==r?null===(s=i._$Cl)||void 0===s?void 0:s[r]:i._$Cu;const d=Mn(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Wn(e,l._$AS(e,t.values),l,r)),t}class Qn{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:En).importNode(i,!0);jn.currentNode=s;let o=jn.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Yn(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new Jn(o,this,e)),this.v.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=jn.nextNode(),n++)}return s}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Yn{constructor(e,t,i,r){var s;this.type=2,this._$AH=In,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Wn(this,e,t),Mn(e)?e===In||null==e||""===e?(this._$AH!==In&&this._$AR(),this._$AH=In):e!==this._$AH&&e!==Fn&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):(e=>{var t;return Dn(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==In&&Mn(this._$AH)?this._$AA.nextSibling.data=e:this.S(En.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Vn.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.m(i);else{const e=new Qn(s,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=Bn.get(e.strings);return void 0===t&&Bn.set(e.strings,t=new Vn(e)),t}M(e){Dn(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Yn(this.A(Tn()),this.A(Tn()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Gn{constructor(e,t,i,r,s){this.type=1,this._$AH=In,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=In}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Wn(this,e,t,0),o=!Mn(e)||e!==this._$AH&&e!==Fn,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Wn(this,r[i+n],t,n),a===Fn&&(a=this._$AH[n]),o||(o=!Mn(a)||a!==this._$AH[n]),a===In?e=In:e!==In&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.k(e)}k(e){e===In?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Kn extends Gn{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===In?void 0:e}}const qn=_n?_n.emptyScript:"";class Xn extends Gn{constructor(){super(...arguments),this.type=4}k(e){e&&e!==In?this.element.setAttribute(this.name,qn):this.element.removeAttribute(this.name)}}class Zn extends Gn{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Wn(this,e,t,0))&&void 0!==i?i:In)===Fn)return;const r=this._$AH,s=e===In&&r!==In||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==In&&(r===In||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class Jn{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Wn(this,e)}}const ea=window.litHtmlPolyfillSupport;var ta,ia;null==ea||ea(Vn,Yn),(null!==(Sn=globalThis.litHtmlVersions)&&void 0!==Sn?Sn:globalThis.litHtmlVersions=[]).push("2.0.2");class ra extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new Yn(t.insertBefore(Tn(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return Fn}}ra.finalized=!0,ra._$litElement$=!0,null===(ta=globalThis.litElementHydrateSupport)||void 0===ta||ta.call(globalThis,{LitElement:ra});const sa=globalThis.litElementPolyfillSupport;null==sa||sa({LitElement:ra}),(null!==(ia=globalThis.litElementVersions)&&void 0!==ia?ia:globalThis.litElementVersions=[]).push("3.0.2");const oa=Object.freeze({processing:"processing",complete:"complete"});window.customElements.define("ia-activity-indicator",class extends ra{static get properties(){return{mode:{type:String}}}constructor(){super(),this.mode=oa.processing}render(){return Un`
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
    `}static get styles(){const e=ut`var(--activityIndicatorCheckmarkColor, #31A481)`,t=ut`var(--activityIndicatorCompletedRingColor, #31A481)`,i=ut`var(--activityIndicatorLoadingRingColor, #333333)`,r=ut`var(--activityIndicatorLoadingDotColor, #333333)`;return ut`
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
    `}}),on.extend((function(e,t,i){i.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(gn=e.parseTwoDigitYear);var r=t.prototype,s=r.parse;r.parse=function(e){var t=e.date,r=e.utc,o=e.args;this.$u=r;var n=o[1];if("string"==typeof n){var a=!0===o[2],l=!0===o[3],d=a||l,c=o[2];l&&(c=o[2]),vn=this.$locale(),!a&&c&&(vn=i.Ls[c]),this.$d=function(e,t,i){try{if(["x","X"].indexOf(t)>-1)return new Date(("X"===t?1e3:1)*e);var r=wn(t)(e),s=r.year,o=r.month,n=r.day,a=r.hours,l=r.minutes,d=r.seconds,c=r.milliseconds,h=r.zone,u=new Date,p=n||(s||o?1:u.getDate()),v=s||u.getFullYear(),g=0;s&&!o||(g=o>0?o-1:u.getMonth());var m=a||0,f=l||0,y=d||0,b=c||0;return h?new Date(Date.UTC(v,g,p,m,f,y,b+60*h.offset*1e3)):i?new Date(Date.UTC(v,g,p,m,f,y,b)):new Date(v,g,p,m,f,y,b)}catch(e){return new Date("")}}(t,n,r),this.init(),c&&!0!==c&&(this.$L=this.locale(c).$L),d&&t!=this.format(n)&&(this.$d=new Date("")),vn={}}else if(n instanceof Array)for(var h=n.length,u=1;u<=h;u+=1){o[1]=n[u-1];var p=i.apply(this,o);if(p.isValid()){this.$d=p.$d,this.$L=p.$L,this.init();break}u===h&&(this.$d=new Date(""))}else s.call(this,e)}}));const na=Fe`var(--histogramDateRangeSliderColor, #4B65FE)`,aa=Fe`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,la=Fe`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,da=Fe`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,ca=Fe`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,ha=Fe`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,ua=Fe`var(--histogramDateRangeInputWidth, 35px)`,pa=Fe`var(--histogramDateRangeInputFontSize, 1.2rem)`,va=Fe`var(--histogramDateRangeInputFontFamily, sans-serif)`,ga=Fe`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,ma=Fe`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,fa=Fe`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,ya=Fe`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let ba=class extends Ze{constructor(){super(...arguments),this.width=180,this.height=40,this.sliderWidth=10,this.tooltipWidth=125,this.tooltipHeight=30,this.updateDelay=0,this.dateFormat="YYYY",this.missingDataMessage="no data",this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this._tooltipOffset=0,this._tooltipVisible=!1,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),this.disabled||(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=e.offsetX-this._dragOffset;"slider-min"===this._currentSlider.id?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(t)):this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(t))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}updated(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-2*this.sliderWidth,this._minDateMS=this.getMSFromString(this.minDate),this._maxDateMS=this.getMSFromString(this.maxDate),this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate,this.requestUpdate())}calculateHistData(){const e=Math.min(...this.bins),t=Math.max(...this.bins),i=e===t?1:Math.log1p(t),r=this.height/i,s=this.dateRangeMS/this._numBins;return this.bins.map(((e,t)=>({value:e,height:Math.floor(Math.log1p(e)*r),binStart:`${this.formatDate(t*s+this._minDateMS)}`,binEnd:`${this.formatDate((t+1)*s+this._minDateMS)}`})))}get hasBinData(){return this._numBins>0}get _numBins(){return this.bins&&this.bins.length?this.bins.length:0}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate)return void(this._minSelectedDate=e);const t=this.getMSFromString(e),i=!Number.isNaN(t),r=t<=this.getMSFromString(this.maxSelectedDate);i&&r&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate)return void(this._maxSelectedDate=e);const t=this.getMSFromString(e),i=!Number.isNaN(t),r=t>=this.getMSFromString(this.minSelectedDate);i&&r&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.translateDateToPosition(this.maxSelectedDate);return this.validMaxSliderX(e)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){if(this._isDragging||this.disabled)return;const t=e.currentTarget,i=t.x.baseVal.value+this.sliderWidth/2,r=t.dataset,s="item"+("1"!==r.numItems?"s":""),o=Number(r.numItems).toLocaleString();this._tooltipOffset=i+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2,this._tooltipContent=fe`
      ${o} ${s}<br />
      ${r.binStart} - ${r.binEnd}
    `,this._tooltipVisible=!0}hideTooltip(){this._tooltipContent=void 0,this._tooltipVisible=!1}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);e=this.clamp(e,this.histogramLeftEdgeX,t);return Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));e=this.clamp(e,t,this.histogramRightEdgeX);return Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout((()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))}),this.updateDelay)}cancelPendingUpdateEvent(){void 0!==this._emitUpdatedEventTimer&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t="slider-min"===this._currentSlider.id?this.minSliderX:this.maxSliderX;this._dragOffset=e.offsetX-t,(this._dragOffset>this.sliderWidth||this._dragOffset<-this.sliderWidth)&&(this._dragOffset=0)}translatePositionToDate(e){const t=Math.ceil((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleMinDateInput(e){const t=e.currentTarget;this.minSelectedDate=t.value,this.beginEmitUpdateProcess()}handleMaxDateInput(e){const t=e.currentTarget;this.maxSelectedDate=t.value,this.beginEmitUpdateProcess()}handleKeyUp(e){if("Enter"===e.key){const t=e.currentTarget;t.blur(),"date-min"===t.id?this.handleMinDateInput(e):"date-max"===t.id&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t="string"==typeof e?e:String(e);if(1===(t.split(/(\d+)/).length-1)/2){const e=new Date(0,0);return e.setFullYear(Number(t)),e.getTime()}return on(t,[this.dateFormat,"YYYY"]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2;Math.abs(i-this.getMSFromString(this.minSelectedDate))<Math.abs(i-this.getMSFromString(this.maxSelectedDate))?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=`\n            M${this.minSliderX},0\n            h-${this.sliderWidth-4}\n            q-4,0 -4,4\n            v${this.height-8}\n            q0,4 4,4\n            h${this.sliderWidth-4}\n          `;return this.generateSliderSVG(this.minSliderX,"slider-min",e)}get maxSliderTemplate(){const e=`\n            M${this.maxSliderX},0\n            h${this.sliderWidth-4}\n            q4,0 4,4\n            v${this.height-8}\n            q0,4 -4,4\n            h-${this.sliderWidth-4}\n          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",e)}generateSliderSVG(e,t,i){const r="slider-min"===t?1:-1;return ye`
    <svg
      id="${t}"
      class="
      ${this.disabled?"":"draggable"}
      ${this._isDragging?"dragging":""}"
      @pointerdown="${this.drag}"
    >
      <path d="${i} z" fill="${na}" />
      <rect
        x="${e-this.sliderWidth*r+.4*this.sliderWidth*r}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${e-this.sliderWidth*r+.6*this.sliderWidth*r}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
    </svg>
    `}get selectedRangeTemplate(){return ye`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${aa}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map((r=>{const s=ye`
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
          fill="${i+t>=this.minSliderX&&i<=this.maxSliderX?la:ca}"
          data-num-items="${r.value}"
          data-bin-start="${r.binStart}"
          data-bin-end="${r.binEnd}"
        />`;return i+=e,s}))}formatDate(e){if(Number.isNaN(e))return"";const t=on(e);return t.year()<1e3?String(t.year()):t.format(this.dateFormat)}get minInputTemplate(){return fe`
      <input
        id="date-min"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMinDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Ho(this.minSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get maxInputTemplate(){return fe`
      <input
        id="date-max"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMaxDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${Ho(this.maxSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `}get tooltipTemplate(){return fe`
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
    `}get noDataTemplate(){return fe`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?fe`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:$e}render(){return this.hasBinData?fe`
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
    `:this.noDataTemplate}};var $a;ba.styles=Fe`
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
      --activityIndicatorLoadingRingColor: ${da};
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
      background: ${ga};
      color: ${ma};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${fa};
      font-family: ${ya};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      /* arrow */
      border: 5px solid ${ma};
      border-color: ${ga} transparent transparent
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
      width: ${ua};
      margin: 0 3px;
      border: ${ha};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${pa};
      font-family: ${va};
    }
  `,e([Oo({type:Number})],ba.prototype,"width",void 0),e([Oo({type:Number})],ba.prototype,"height",void 0),e([Oo({type:Number})],ba.prototype,"sliderWidth",void 0),e([Oo({type:Number})],ba.prototype,"tooltipWidth",void 0),e([Oo({type:Number})],ba.prototype,"tooltipHeight",void 0),e([Oo({type:Number})],ba.prototype,"updateDelay",void 0),e([Oo({type:String})],ba.prototype,"dateFormat",void 0),e([Oo({type:String})],ba.prototype,"missingDataMessage",void 0),e([Oo({type:String})],ba.prototype,"minDate",void 0),e([Oo({type:String})],ba.prototype,"maxDate",void 0),e([Oo({type:Boolean})],ba.prototype,"disabled",void 0),e([Oo({type:Object})],ba.prototype,"bins",void 0),e([Lo()],ba.prototype,"_tooltipOffset",void 0),e([Lo()],ba.prototype,"_tooltipContent",void 0),e([Lo()],ba.prototype,"_tooltipVisible",void 0),e([Lo()],ba.prototype,"_isDragging",void 0),e([Lo()],ba.prototype,"_isLoading",void 0),e([Oo({type:Boolean})],ba.prototype,"loading",null),e([Oo()],ba.prototype,"minSelectedDate",null),e([Oo()],ba.prototype,"maxSelectedDate",null),ba=e([(e=>t=>"function"==typeof t?((e,t)=>(window.customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:r}=t;return{kind:i,elements:r,finisher(t){window.customElements.define(e,t)}}})(e,t))("histogram-date-range")],ba);const wa=globalThis.trustedTypes,Sa=wa?wa.createPolicy("lit-html",{createHTML:e=>e}):void 0,_a=`lit$${(Math.random()+"").slice(9)}$`,xa="?"+_a,Ca=`<${xa}>`,Aa=document,ka=(e="")=>Aa.createComment(e),Ea=e=>null===e||"object"!=typeof e&&"function"!=typeof e,Ta=Array.isArray,Ma=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Da=/-->/g,Na=/>/g,Pa=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,za=/'/g,Oa=/"/g,La=/^(?:script|style|textarea)$/i,Ra=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),Ha=Ra(1),Ua=Ra(2),Fa=Symbol.for("lit-noChange"),Ia=Symbol.for("lit-nothing"),Ba=new WeakMap,ja=Aa.createTreeWalker(Aa,129,null,!1),Va=(e,t)=>{const i=e.length-1,r=[];let s,o=2===t?"<svg>":"",n=Ma;for(let t=0;t<i;t++){const i=e[t];let a,l,d=-1,c=0;for(;c<i.length&&(n.lastIndex=c,l=n.exec(i),null!==l);)c=n.lastIndex,n===Ma?"!--"===l[1]?n=Da:void 0!==l[1]?n=Na:void 0!==l[2]?(La.test(l[2])&&(s=RegExp("</"+l[2],"g")),n=Pa):void 0!==l[3]&&(n=Pa):n===Pa?">"===l[0]?(n=null!=s?s:Ma,d=-1):void 0===l[1]?d=-2:(d=n.lastIndex-l[2].length,a=l[1],n=void 0===l[3]?Pa:'"'===l[3]?Oa:za):n===Oa||n===za?n=Pa:n===Da||n===Na?n=Ma:(n=Pa,s=void 0);const h=n===Pa&&e[t+1].startsWith("/>")?" ":"";o+=n===Ma?i+Ca:d>=0?(r.push(a),i.slice(0,d)+"$lit$"+i.slice(d)+_a+h):i+_a+(-2===d?(r.push(void 0),t):h)}const a=o+(e[i]||"<?>")+(2===t?"</svg>":"");return[void 0!==Sa?Sa.createHTML(a):a,r]};class Wa{constructor({strings:e,_$litType$:t},i){let r;this.parts=[];let s=0,o=0;const n=e.length-1,a=this.parts,[l,d]=Va(e,t);if(this.el=Wa.createElement(l,i),ja.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(r=ja.nextNode())&&a.length<n;){if(1===r.nodeType){if(r.hasAttributes()){const e=[];for(const t of r.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(_a)){const i=d[o++];if(e.push(t),void 0!==i){const e=r.getAttribute(i.toLowerCase()+"$lit$").split(_a),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:s,name:t[2],strings:e,ctor:"."===t[1]?qa:"?"===t[1]?Za:"@"===t[1]?Ja:Ka})}else a.push({type:6,index:s})}for(const t of e)r.removeAttribute(t)}if(La.test(r.tagName)){const e=r.textContent.split(_a),t=e.length-1;if(t>0){r.textContent=wa?wa.emptyScript:"";for(let i=0;i<t;i++)r.append(e[i],ka()),ja.nextNode(),a.push({type:2,index:++s});r.append(e[t],ka())}}}else if(8===r.nodeType)if(r.data===xa)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=r.data.indexOf(_a,e+1));)a.push({type:7,index:s}),e+=_a.length-1}s++}}static createElement(e,t){const i=Aa.createElement("template");return i.innerHTML=e,i}}function Qa(e,t,i=e,r){var s,o,n,a;if(t===Fa)return t;let l=void 0!==r?null===(s=i._$Cl)||void 0===s?void 0:s[r]:i._$Cu;const d=Ea(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==d&&(null===(o=null==l?void 0:l._$AO)||void 0===o||o.call(l,!1),void 0===d?l=void 0:(l=new d(e),l._$AT(e,i,r)),void 0!==r?(null!==(n=(a=i)._$Cl)&&void 0!==n?n:a._$Cl=[])[r]=l:i._$Cu=l),void 0!==l&&(t=Qa(e,l._$AS(e,t.values),l,r)),t}class Ya{constructor(e,t){this.v=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(e){var t;const{el:{content:i},parts:r}=this._$AD,s=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:Aa).importNode(i,!0);ja.currentNode=s;let o=ja.nextNode(),n=0,a=0,l=r[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Ga(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new el(o,this,e)),this.v.push(t),l=r[++a]}n!==(null==l?void 0:l.index)&&(o=ja.nextNode(),n++)}return s}m(e){let t=0;for(const i of this.v)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Ga{constructor(e,t,i,r){var s;this.type=2,this._$AH=Ia,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=r,this._$Cg=null===(s=null==r?void 0:r.isConnected)||void 0===s||s}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cg}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Qa(this,e,t),Ea(e)?e===Ia||null==e||""===e?(this._$AH!==Ia&&this._$AR(),this._$AH=Ia):e!==this._$AH&&e!==Fa&&this.$(e):void 0!==e._$litType$?this.T(e):void 0!==e.nodeType?this.S(e):(e=>{var t;return Ta(e)||"function"==typeof(null===(t=e)||void 0===t?void 0:t[Symbol.iterator])})(e)?this.M(e):this.$(e)}A(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}S(e){this._$AH!==e&&(this._$AR(),this._$AH=this.A(e))}$(e){this._$AH!==Ia&&Ea(this._$AH)?this._$AA.nextSibling.data=e:this.S(Aa.createTextNode(e)),this._$AH=e}T(e){var t;const{values:i,_$litType$:r}=e,s="number"==typeof r?this._$AC(e):(void 0===r.el&&(r.el=Wa.createElement(r.h,this.options)),r);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===s)this._$AH.m(i);else{const e=new Ya(s,this),t=e.p(this.options);e.m(i),this.S(t),this._$AH=e}}_$AC(e){let t=Ba.get(e.strings);return void 0===t&&Ba.set(e.strings,t=new Wa(e)),t}M(e){Ta(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,r=0;for(const s of e)r===t.length?t.push(i=new Ga(this.A(ka()),this.A(ka()),this,this.options)):i=t[r],i._$AI(s),r++;r<t.length&&(this._$AR(i&&i._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cg=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class Ka{constructor(e,t,i,r,s){this.type=1,this._$AH=Ia,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Ia}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,r){const s=this.strings;let o=!1;if(void 0===s)e=Qa(this,e,t,0),o=!Ea(e)||e!==this._$AH&&e!==Fa,o&&(this._$AH=e);else{const r=e;let n,a;for(e=s[0],n=0;n<s.length-1;n++)a=Qa(this,r[i+n],t,n),a===Fa&&(a=this._$AH[n]),o||(o=!Ea(a)||a!==this._$AH[n]),a===Ia?e=Ia:e!==Ia&&(e+=(null!=a?a:"")+s[n+1]),this._$AH[n]=a}o&&!r&&this.k(e)}k(e){e===Ia?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class qa extends Ka{constructor(){super(...arguments),this.type=3}k(e){this.element[this.name]=e===Ia?void 0:e}}const Xa=wa?wa.emptyScript:"";class Za extends Ka{constructor(){super(...arguments),this.type=4}k(e){e&&e!==Ia?this.element.setAttribute(this.name,Xa):this.element.removeAttribute(this.name)}}class Ja extends Ka{constructor(e,t,i,r,s){super(e,t,i,r,s),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=Qa(this,e,t,0))&&void 0!==i?i:Ia)===Fa)return;const r=this._$AH,s=e===Ia&&r!==Ia||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,o=e!==Ia&&(r===Ia||s);s&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class el{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Qa(this,e)}}const tl=window.litHtmlPolyfillSupport;var il,rl;null==tl||tl(Wa,Ga),(null!==($a=globalThis.litHtmlVersions)&&void 0!==$a?$a:globalThis.litHtmlVersions=[]).push("2.0.2");class sl extends wt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Dt=((e,t,i)=>{var r,s;const o=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:t;let n=o._$litPart$;if(void 0===n){const e=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:null;o._$litPart$=n=new Ga(t.insertBefore(ka(),e),e,void 0,null!=i?i:{})}return n._$AI(e),n})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Dt)||void 0===e||e.setConnected(!1)}render(){return Fa}}sl.finalized=!0,sl._$litElement$=!0,null===(il=globalThis.litElementHydrateSupport)||void 0===il||il.call(globalThis,{LitElement:sl});const ol=globalThis.litElementPolyfillSupport;null==ol||ol({LitElement:sl}),(null!==(rl=globalThis.litElementVersions)&&void 0!==rl?rl:globalThis.litElementVersions=[]).push("3.0.2");const nl=Ua`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,al=Ua`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let ll=class extends sl{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return Ha`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${nl}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${al}</span
        >
      </button>
      ${this.popupTemplate}
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=null!=e?e:this.resizeObserver;null==t||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted||(this.resetState(),this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.betaButton.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,r=i/2,s=window.innerHeight/2;e.left<r?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<s?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){"Escape"===e.key&&this.closePopup()}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get popupTemplate(){return Ha`
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
                ${nl}
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
                ${al}
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
            ${this.error?Ha`<div id="error">${this.error}</div>`:Ia}
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
    `}get upvoteSelected(){return"up"===this.vote}get downvoteSelected(){return"down"===this.vote}upvoteKeypressed(e){"Enter"!==e.key&&" "!==e.key||this.upvoteButtonSelected()}downvoteKeypressed(e){"Enter"!==e.key&&" "!==e.key||this.downvoteButtonSelected()}upvoteButtonSelected(){this.vote="up"===this.vote?void 0:"up"}downvoteButtonSelected(){this.vote="down"===this.vote?void 0:"down"}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&((null===(t=this.popup)||void 0===t?void 0:t.contains(e.target))||this.closePopup())}cancel(e){e.preventDefault(),this.vote=void 0,this.closePopup()}async submit(e){if(e.preventDefault(),!this.vote)return this.voteNeedsChoosing=!0,void(this.error=Ha`Please select a vote.`);if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");this.processing=!0;try{const e=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:e})).success?(this.voteSubmitted=!0,this.closePopup()):this.error=Ha`There was an error submitting your feedback.`}catch(e){this.error=Ha`There was an error submitting your feedback.<br />Error:
        ${e instanceof Error?e.message:e}`}this.processing=!1}static get styles(){const e=ut`var(--featureFeedbackBlueColor, #194880)`,t=ut`var(--featureFeedbackDarkGrayColor, #767676)`,i=ut`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=ut`var(--featureFeedbackBackdropZindex, 5)`,s=ut`var(--featureFeedbackModalZindex, 6)`,o=ut`var(--featureFeedbackPopupBorderColor, ${e})`,n=ut`var(--featureFeedbackSubmitButtonColor, ${e})`,a=ut`var(--featureFeedbackBetaButtonBorderColor, ${e})`,l=ut`var(--featureFeedbackBetaButtonTextColor, ${e})`,d=ut`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,c=ut`var(--featureFeedbackCancelButtonColor, #515151)`,h=ut`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,u=ut`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,p=ut`var(--featureFeedbackPromptFontWeight, bold)`,v=ut`var(--featureFeedbackPromptFontSize, 14px)`,g=ut`var(--defaultColor, ${t});`,m=ut`var(--defaultColorSvgFilter, ${i});`,f=ut`var(--upvoteColor, #23765D);`,y=ut`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,b=ut`var(--downvoteColor, #720D11);`,$=ut`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,w=ut`var(--unselectedColor, #CCCCCC);`,S=ut`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return ut`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${l};
        border: 1px solid ${a};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${d};
      }

      .beta-button-thumb.unselected svg {
        filter: ${S};
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
        background-color: ${h};
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
        background-color: ${u};
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
        font-size: ${v};
        font-weight: ${p};
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
        background-color: ${c};
      }

      #submit-button {
        background-color: ${n};
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
        border-color: ${g};
      }

      .vote-button.noselection svg {
        filter: ${m};
      }

      .vote-button.unselected {
        border-color: ${w};
      }

      .vote-button.unselected svg {
        filter: ${S};
      }

      .upvote-button.selected {
        border-color: ${f};
      }

      .upvote-button.selected svg {
        filter: ${y};
      }

      .downvote-button.selected {
        border-color: ${b};
      }

      .downvote-button.selected svg {
        filter: ${$};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `}};e([ai({type:String})],ll.prototype,"featureIdentifier",void 0),e([ai({type:String})],ll.prototype,"prompt",void 0),e([ai({type:String})],ll.prototype,"buttonText",void 0),e([ai({type:Object})],ll.prototype,"recaptchaManager",void 0),e([ai({type:Object})],ll.prototype,"resizeObserver",void 0),e([ai({type:Boolean})],ll.prototype,"disabled",void 0),e([ai({type:Object})],ll.prototype,"featureFeedbackService",void 0),e([ci("#beta-button")],ll.prototype,"betaButton",void 0),e([ci("#popup")],ll.prototype,"popup",void 0),e([li()],ll.prototype,"isOpen",void 0),e([li()],ll.prototype,"processing",void 0),e([li()],ll.prototype,"popupTopX",void 0),e([li()],ll.prototype,"popupTopY",void 0),e([li()],ll.prototype,"vote",void 0),e([li()],ll.prototype,"voteSubmitted",void 0),e([li()],ll.prototype,"error",void 0),e([li()],ll.prototype,"voteNeedsChoosing",void 0),e([li()],ll.prototype,"recaptchaWidget",void 0),e([ci("#comments")],ll.prototype,"comments",void 0),ll=e([oi("feature-feedback")],ll);var dl=ye`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,cl=ye`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`,hl=ye`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`;const ul=["mediatype","year","subject","collection","creator","language"],pl={subjectSorter:"subject",mediatypeSorter:"mediatype",languageSorter:"language",creatorSorter:"creator",collection:"collection",year:"year"},vl={subject:"Subject",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year"};let gl=class extends Ze{constructor(){super(...arguments),this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.openFacets={subject:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1}}render(){return fe`
      <div id="container" class="${this.facetsLoading?"loading":""}">
        ${this.showHistogramDatePicker&&this.fullYearsHistogramAggregation?fe`
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            `:$e}
        ${this.mergedFacets.map((e=>this.getFacetGroupTemplate(e)))}
      </div>
    `}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get currentYearsHistogramAggregation(){var e;return null===(e=this.aggregations)||void 0===e?void 0:e.year_histogram}get histogramTemplate(){const{fullYearsHistogramAggregation:e}=this;return fe`
      <histogram-date-range
        .minDate=${null==e?void 0:e.first_bucket_key}
        .maxDate=${null==e?void 0:e.last_bucket_key}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .updateDelay=${100}
        missingDataMessage="..."
        .width=${180}
        .bins=${null==e?void 0:e.buckets}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail,r=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(r)}get mergedFacets(){const e=[];return ul.forEach((t=>{var i;const r=this.selectedFacetGroups.find((e=>e.key===t)),s=this.aggregationFacetGroups.find((e=>e.key===t));if(r&&!s)return void e.push(r);if(!s)return;const o=null!=r?r:s,n=null!==(i=null==r?void 0:r.buckets.map((e=>{const t=s.buckets.find((t=>t.key===e.key));return t?{...e,count:t.count}:e})))&&void 0!==i?i:[];s.buckets.forEach((e=>{const t=n.find((t=>t.key===e.key));t||n.push(e)})),o.buckets=n.splice(0,5),e.push(o)})),e}get selectedFacetGroups(){if(!this.selectedFacets)return[];return Object.entries(this.selectedFacets).map((([e,t])=>{const i=e,r=vl[i],s=Object.entries(t).map((([e,t])=>{var r,s;let o=e;return"language"===i&&(o=null!==(s=null===(r=this.languageCodeHandler)||void 0===r?void 0:r.getLanguageNameFromCodeString(e))&&void 0!==s?s:e),{displayText:o,key:e,count:0,state:t}}));return{title:r,key:i,buckets:s}}))}get aggregationFacetGroups(){var e;const t=[];return Object.entries(null!==(e=this.aggregations)&&void 0!==e?e:[]).forEach((([e,i])=>{if("year_histogram"===e)return;const r=this.getFacetOptionFromKey(e),s=vl[r],o=i.buckets.map((e=>{var t,i;let s=e.key;return"language"===r&&(s=null!==(i=null===(t=this.languageCodeHandler)||void 0===t?void 0:t.getCodeStringFromLanguageName(`${e.key}`))&&void 0!==i?i:e.key),{displayText:`${e.key}`,key:`${s}`,count:e.doc_count,state:"none"}})),n={title:s,key:r,buckets:o};t.push(n)})),t}getFacetGroupTemplate(e){if(0===e.buckets.length)return $e;const{key:t}=e,i=this.openFacets[t],r=fe`
      <span class="collapser ${i?"open":""}"> ${hl} </span>
    `;return fe`
      <div class="facet-group ${this.collapsableFacets?"mobile":""}">
        <h1
          @click=${()=>{const e={...this.openFacets};e[t]=!i,this.openFacets=e}}
          @keyup=${()=>{const e={...this.openFacets};e[t]=!i,this.openFacets=e}}
        >
          ${this.collapsableFacets?r:$e} ${e.title}
        </h1>
        <div class="facet-group-content ${i?"open":""}">
          ${this.getFacetTemplate(e)}
        </div>
      </div>
    `}getFacetTemplate(e){const t=e.buckets.filter((e=>!1===e.key.startsWith("fav-"))).slice(0,6);return fe`
      <ul class="facet-list">
        ${$o(t,(t=>`${e.key}:${t.key}`),(t=>{var i,r;const s=`${e.key}:${t.key}-show-only`,o=`${e.key}:${t.key}-negative`,n="collection"!==e.key?fe`${null!==(i=t.displayText)&&void 0!==i?i:t.key}`:fe`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${t.key}
                      placeholder="-"
                    ></async-collection-name>
                  `,a="hidden"===t.state,l="selected"===t.state,d=`${e.key}: ${null!==(r=t.displayText)&&void 0!==r?r:t.key}`,c=l?`Show all ${e.key}s`:`Only show ${d}`,h=a?`Unhide ${d}`:`Hide ${d}`;return fe`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${e.key}
                      .value=${t.key}
                      @click=${e=>{this.facetClicked(e,t,!1)}}
                      .checked=${l}
                      class="select-facet-checkbox"
                      title=${c}
                      id=${s}
                    />
                    <input
                      type="checkbox"
                      id=${o}
                      .name=${e.key}
                      .value=${t.key}
                      @click=${e=>{this.facetClicked(e,t,!0)}}
                      .checked=${a}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${o}
                      class="hide-facet-icon"
                      title=${h}
                    >
                      ${a?cl:dl}
                    </label>
                  </div>

                  <label
                    for=${s}
                    class="facet-info-display"
                    title=${c}
                  >
                    <div class="facet-title">${n}</div>
                    <div class="facet-count">${t.count}</div>
                  </label>
                </div>
              </li>
            `}))}
      </ul>
    `}facetClicked(e,t,i){const r=e.target,{checked:s,name:o,value:n}=r;s?this.facetChecked(o,n,i):this.facetUnchecked(o,n)}facetChecked(e,t,i){const{selectedFacets:r}=this;let s;s=r?{...r}:Zs,s[e][t]=i?"hidden":"selected",this.selectedFacets=s}facetUnchecked(e,t){const{selectedFacets:i}=this;let r;r=i?{...i}:Zs,delete r[e][t],this.selectedFacets=r}getFacetOptionFromKey(e){const t=e.split("__")[2].split(":")[1],i=Object.entries(pl).find((([e])=>t.includes(e))),r=null==i?void 0:i[1];if(!r)throw new Error(`Could not find facet option for key: ${e}`);return r}static get styles(){return Fe`
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
    `}};e([it({type:Object})],gl.prototype,"aggregations",void 0),e([it({type:Object})],gl.prototype,"fullYearsHistogramAggregation",void 0),e([it({type:String})],gl.prototype,"minSelectedDate",void 0),e([it({type:String})],gl.prototype,"maxSelectedDate",void 0),e([it({type:Boolean})],gl.prototype,"facetsLoading",void 0),e([it({type:Boolean})],gl.prototype,"fullYearAggregationLoading",void 0),e([it({type:Object})],gl.prototype,"selectedFacets",void 0),e([it({type:Boolean})],gl.prototype,"collapsableFacets",void 0),e([it({type:Boolean})],gl.prototype,"showHistogramDatePicker",void 0),e([it({type:Object})],gl.prototype,"languageCodeHandler",void 0),e([it({type:Object})],gl.prototype,"collectionNameCache",void 0),e([rt()],gl.prototype,"openFacets",void 0),gl=e([et("collection-facets")],gl);let ml=class extends Ze{render(){return fe`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=Fe`var(--circularActivityIndicatorColor, dodgerblue)`,t=Fe`var(--circularActivityIndicatorThickness, 4px)`;return Fe`
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
    `}};ml=e([et("circular-activity-indicator")],ml);const fl=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),yl=e=>encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),bl=decodeURIComponent,$l=e=>('"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function wl(e,t,i){const r=/(?:^|; )([^=]*)=([^;]*)/g,s={};let o;for(;null!=(o=r.exec(document.cookie));)try{const r=i(o[1]);if(s[r]=t(o[2],r),e===r)break}catch(e){}return null!=e?s[e]:s}const Sl=Object.freeze({decodeName:bl,decodeValue:$l,encodeName:fl,encodeValue:yl}),_l=Object.freeze({path:"/"});function xl(e,t,i=_l,{encodeValue:r=yl,encodeName:s=fl}={}){return document.cookie=`${s(e)}=${r(t,e)}${function(e){return"number"==typeof(e=Object.assign({},e)).expires&&(e.expires=new Date(Date.now()+864e5*e.expires)),null!=e.expires&&(e.expires=e.expires.toUTCString()),Object.entries(e).filter((([e,t])=>null!=t&&!1!==t)).map((([e,t])=>!0===t?`; ${e}`:`; ${e}=${t.split(";")[0]}`)).join("")}(i)}`}function Cl(e,{decodeValue:t=$l,decodeName:i=bl}={}){return wl(e,t,i)}function Al({decodeValue:e=$l,decodeName:t=bl}={}){return wl(void 0,e,t)}!function e(t,i){const r={set:function(e,t,i){return xl(e,t,Object.assign({},this.attributes,i),{encodeValue:this.converter.write})},get:function(e){return 0===arguments.length?Al(this.converter.read):null!=e?Cl(e,this.converter.read):void 0},remove:function(e,t){!function(e,t=_l){xl(e,"",Object.assign({},t,{expires:-1}))}(e,Object.assign({},this.attributes,t))},withAttributes:function(t){return e(this.converter,Object.assign({},this.attributes,t))},withConverter:function(t){return e(Object.assign({},this.converter,t),this.attributes)}},s={attributes:{value:Object.freeze(i)},converter:{value:Object.freeze(t)}};return Object.create(r,s)}({read:Sl.decodeValue,write:Sl.encodeValue},_l);class kl{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t="grid"===e?"tiles":"lists";xl(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i="list-detail"===e?"showdetails":"";xl(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=Cl(`view-${this.context}`),t=Cl(`showdetails-${this.context}`);return"tiles"===e||void 0===e?"grid":"showdetails"===t?"list-detail":"list-compact"}persistQueryStateToUrl(e){const t=new URL(window.location.href),{searchParams:i}=t;if(i.delete("sort"),i.delete("query"),i.delete("page"),i.delete("and[]"),i.delete("not[]"),e.sortParam){const t="desc"===e.sortParam.direction?"-":"";i.set("sort",`${t}${e.sortParam.field}`)}if(e.baseQuery&&i.set("query",e.baseQuery),e.currentPage&&(e.currentPage>1?i.set("page",e.currentPage.toString()):i.delete("page")),e.selectedFacets)for(const[t,r]of Object.entries(e.selectedFacets)){const e=Object.entries(r);if(0!==e.length)for(const[r,s]of e){const e=`${t}:"${r}"`;"hidden"===s?i.append("not[]",e):i.append("and[]",e)}}e.dateRangeQueryClause&&i.append("and[]",e.dateRangeQueryClause),e.titleQuery&&i.append("and[]",e.titleQuery),e.creatorQuery&&i.append("and[]",e.creatorQuery),window.history.pushState({sort:e.sortParam,query:e.baseQuery,page:e.currentPage,and:e.selectedFacets,not:e.selectedFacets,dateRange:e.dateRangeQueryClause},"",t)}loadQueryStateFromUrl(){const e=new URL(window.location.href),t=e.searchParams.get("page"),i=e.searchParams.get("query"),r=e.searchParams.get("sort"),s=e.searchParams.getAll("and[]"),o=e.searchParams.getAll("not[]"),n={selectedFacets:{subject:{},creator:{},mediatype:{},language:{},collection:{},year:{}}};if(t){const e=parseInt(t,10);n.currentPage=e}else n.currentPage=1;if(i&&(n.baseQuery=i),r){if(r.indexOf(" ")>-1){const[e,t]=r.split(" "),i=Xs[e];i&&(n.selectedSort=i),"desc"!==t&&"asc"!==t||(n.sortDirection=t)}else{const e=r.startsWith("-")?"desc":"asc",t=r.startsWith("-")?r.slice(1):r,i=Xs[t];i&&(n.selectedSort=i),n.sortDirection=e}}return s&&s.forEach((e=>{const[t,i]=e.split(":"),r=this.stripQuotes(i);switch(t){case"year":{const[e,s]=i.split(" TO ");e&&s?(n.minSelectedDate=e.substring(1,e.length),n.maxSelectedDate=s.substring(0,s.length-1),n.dateRangeQueryClause=`year:${i}`):n.selectedFacets[t][r]="selected";break}case"firstTitle":n.selectedTitleFilter=i;break;case"firstCreator":n.selectedCreatorFilter=i;break;default:n.selectedFacets[t][r]="selected"}})),o&&o.forEach((e=>{const[t,i]=e.split(":"),r=this.stripQuotes(i);n.selectedFacets[t][r]="hidden"})),n}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}}const El={"ambient noise wall":"Music","american english":"English","arabic videos":"Arabic","arabic, english":"Arabic and English","de-formal":"German","en-ca":"English","en-gb":"English","en-us":"English","eng-fre":"English and French","eng;fre":"English and French","english handwritten":"Handwritten English","english-handwritten":"Handwritten English","english, polski":"English and Polish","english, spanish":"English and Spanish","english; finnish":"English and Finnish","english/french":"English and French","finnish, english":"English and Finnish","finnish; english":"English and Finnish","french-handwritten":"Handwritten French","german-handwritten":"Handwritten German","hebrew-handwritten":"Handwritten Hebrew","language not encoded":"Unknown","miscellaneous languages":"Multiple","n/a":"Unknown","no language":"skip","no linguistic content":"skip","no speech":"skip","polish-handwritten":"Handwritten Polish","pt-br":"Portuguese","spanish-handwritten":"Handwritten Spanish","us english":"English","www.back4allah.com":"Arabic","www.rabania.com":"Arabic","www.way2allah.com":"Arabic","yiddish-handwritten":"Handwritten Yiddish","zh-cn":"Chinese","zh-tw":"Chinese","أوردو ::: Urdu":"Urdu","بشتو ::: Pashto":"Pashto","عربية ::: arabic":"Arabic","عربية ::: Arabic":"Arabic","عربية مع ترجمة إنجليزية ::: Arabic with English subtitles":"Arabic with English subtitles",aar:"Afar",abk:"Abkhaz",adl:"Galo",ady:"Adyghe",afr:"Afrikaans",aka:"Akan",akk:"Akkadian",alb:"Albanian",ale:"Aleut",alg:"Algonquian",american:"English",amh:"Amharic",ang:"Old English",anm:"Anal",anq:"Jarawa",apa:"Apache languages",apt:"Apatani",ar:"Arabic",ara:"Arabic",arab:"Arabic",arabe:"Arabic",arbc:"Arabic",arbic:"Arabic",arc:"Aramaic",arg:"Aragonese",arm:"Armenian",arp:"Arapaho",asm:"Assamese",ast:"Asturian",ath:"Athapascan (Other)",awa:"Awadhi",aym:"Aymara",aze:"Azerbaijani",bak:"Bashkir",bal:"Baluchi",ban:"Balinese",baq:"Basque",bel:"Belarusian",bem:"Bemba",ben:"Bengali",ber:"Berber",bft:"Balti",bfy:"Bagheli",bgw:"Bhatri",bhb:"Bhili",bho:"Bhojpuri",bih:"Bihari",bis:"Bislama",bkk:"Brokskat",bla:"Blackfoot",bns:"Bundeli",bnt:"Bantu",bos:"Bosnian",bra:"Braj",bre:"Breton",brx:"Bodo",bua:"Buryat",bul:"Bulgarian",bur:"Burmese",cai:"Central American Indian",caq:"Car",car:"Carib",cat:"Catalan",cau:"Caucasian",ceb:"Cebuano",ces:"Czech",cha:"Chamorro",che:"Chechen",chi:"Chinese",chm:"Mari",chn:"Chinook jargon",cho:"Choctaw",chp:"Chipewyan",chr:"Cherokee",chu:"Church Slavic",chv:"Chuvash",chy:"Cheyenne",clk:"Idu-Mishmi",cmn:"Mandarin Chinese",cop:"Coptic",cor:"Cornish",cos:"Corsican",cpe:"Creoles and Pidgins, English-based",cpf:"Creoles and Pidgins, French-based",cpp:"Creoles and Pidgins, Portuguese-based",cre:"Cree",crh:"Crimean Tatar",cro:"Croatian",crp:"Creoles and Pidgins",cs:"Czech",csb:"Kashubian",cym:"Welsh",cze:"Czech",da:"Danish",dak:"Dakota",dan:"Danish",dar:"Dargwa",de:"German",del:"Delaware",deu:"German",deutsch:"German",dgo:"Dogri",dih:"Dhivehi",doi:"Dogri (Generic)",dra:"Dravidian (Other)",dsb:"Lower Sorbian",dum:"Middle Dutch",dut:"Dutch",dzo:"Dzongkha",egy:"Egyptian",el:"Greek",ell:"Greek",emg:"English",en_us:"English",en:"English",eng:"English",engfre:"English and French",engilsh:"English",english:"English",enm:"Middle English",epo:"Esperanto",es:"Spanish",esk:"Eskimo",esp:"Esperanto",espanol:"Spanish","español":"Spanish",est:"Estonian",eth:"Ethiopic",eus:"Basque",fa:"Persian",fao:"Faroese",far:"Faroese",fas:"Persian",fi:"Finnish",fij:"Fijian",fil:"Filipino",fin:"Finnish",fle:"Dutch",fr:"French",fra:"French",francais:"French","français":"French",fre:"French",fri:"Frisian",frm:"Middle French",fro:"Old French",frr:"North Frisian",fry:"Frisian",fur:"Friulian",gaa:"Gã",gac:"Mixed Great Andamanese",gae:"Scottish Gaelic",gag:"Galician",gbl:"Gamit",gem:"Germanic",geo:"Georgian",ger:"German",gez:"Ethiopic",gil:"Gilbertese",gju:"Gujari",gla:"Scottish Gaelic",gle:"Irish",glg:"Galician",glv:"Manx",gmh:"Middle High German",goh:"Old German",gon:"Gondi",got:"Gothic",grb:"Grebo",grc:"Ancient Greek",gre:"Greek",grn:"Guarani",grt:"Garo",gsw:"Swiss German",gua:"Guarani",guj:"Gujarati",gwi:"Gwichin",hai:"Haida",hat:"Haitian French Creole",hau:"Hausa",haw:"Hawaiian",he:"Hebrew",heb:"Hebrew",hin:"Hindi",hlb:"Halbi",hmn:"Hmong",hmr:"Hmar",hne:"Chhattisgarhi",hoc:"Ho",hrv:"Croatian",hsb:"Upper Sorbian",hu:"Hungarian",hun:"Hungarian",ibo:"Igbo",ice:"Icelandic",ido:"Ido",iku:"Inuktitut",ile:"Interlingue",ilo:"Iloko",ina:"Interlingua",inc:"Indic (Other)",ind:"Indonesian",inh:"Ingush",int:"Interlingua",ipk:"Inupiaq",ira:"Iranian",iri:"Irish",iro:"Iroquoian",iru:"Irula",isl:"Icelandic",ita:"Italian",jam:"Music",jap:"Japanese",jav:"Javanese",jpn:"Japanese",jrb:"Judeo-Arabic",kaa:"Karakalpak",kab:"Kabyle",kal:"Kalatdlisut",kan:"Kannada",kar:"Karen",kas:"Kashmiri",kaz:"Kazakh",kbd:"Kabardian",kfa:"Kodava",kfb:"Northwestern Kolami",kfe:"Kota (India)",kff:"Koya",kfq:"Korku",kha:"Khasi",khm:"Khmer",kho:"Khotanese",khr:"Kharia",kik:"Kikuyu",kin:"Kinyarwanda",kir:"Kyrgyz",kix:"Khiamniungan Naga",kmj:"Kumarbhag Paharia",kmm:"Kom (India)",ko:"Korean",kok:"Konkani",kon:"Kongo",kor:"Korean",kpe:"Kpelle",krc:"Karachay-Balkar",kro:"Kru",kru:"Kurukh",ksh:"Kölsch",kum:"Kumyk",kur:"Kurdish",kxu:"Kui (India)",kxv:"Kuvi",kyw:"Kudmali",lad:"Ladino",lah:"Lahnda",lao:"Lao",lap:"Sami",lat:"Latin",lav:"Latvian",lbj:"Ladakhi",lep:"Lepcha",lez:"Lezgin",lim:"Limburgish",lin:"Lingala",lit:"Lithuanian",lmn:"Lambadi",lol:"Mongo-Nkundu",ltz:"Luxembourgish",lua:"Luba-Lulua",lub:"Luba-Katanga",lug:"Ganda",lus:"Lushai",mac:"Macedonian",mah:"Marshallese",mai:"Maithili",mal:"Malayalam",man:"Mandarin Chinese",mao:"Maori",map:"Austronesian",mar:"Marathi",max:"Manx",may:"Malay",mga:"Middle Irish",mha:"Manda (India)",mic:"Micmac",min:"Minankabaw",mis:"Miscellaneous languages",mjw:"Karbi",mkh:"Mon-Khmer",mla:"Malagasy",mlg:"Malagasy",mlt:"Maltese",mni:"Manipuri",moh:"Mohawk",mol:"Moldavian",mon:"Mongolian",mrg:"Mising",mul:"Multiple",mus:"Creek",mwr:"Marwari",myn:"Maya",nag:"Naga Pigdin",nah:"Nahuatl",nai:"North American Indian",nap:"Neapolitan",nau:"Nauru",nav:"Navajo",nbc:"Chang Naga",nbe:"Konyak Naga",nbi:"Mao Naga",nbl:"Ndebele",nbu:"Rongmei Naga",nds:"Low German",nep:"Nepali",new:"Newari",ng:"English",nic:"Niger-Kordofanian",njh:"Lotha Naga",njm:"Angami Naga",njn:"Liangmai Naga",njo:"Ao Naga",nkf:"Inpui Naga",nkh:"Khezha Naga",nld:"Dutch",nll:"Nihali",nma:"Maram Naga",nmf:"Tangkhul Naga",nno:"Norwegian (Nynorsk)",no:"skip",nob:"Norwegian (Bokmål)",nog:"Nogay",non:"Old Norse",none:"skip",nor:"Norwegian",nri:"Chokri Naga",nsa:"Sangtam Naga",nsm:"Sumi Naga",nso:"Northern Sotho",nya:"Nyanja",nzm:"Zeme Naga",oci:"Occitan",oji:"Ojibwa",oon:"Önge",ori:"Oriya",orm:"Oromo",ory:"Odia",oss:"Ossetic",ota:"Ottoman Turkish",oto:"Otomian",paa:"Papuan",pag:"Pangasinan",pal:"Pahlavi",pam:"Pampanga",pan:"Panjabi",panjabi:"Punjabi",pap:"Papiamento",pbv:"Pnar",pci:"Duruwa",pck:"Paite Chin",per:"Persian",phi:"Philippine",pli:"Pali",pol:"Polish",por:"Portuguese",port:"Portuguese",portugues:"Portuguese","português":"Portuguese",pra:"Prakrit",pro:"Provencal",prx:"Purik",pus:"Pashto",qaa:"skip",que:"Quechua",rah:"Rabha",raj:"Rajasthani",roa:"Romance",roh:"Romansh",rom:"Romani",ron:"Romanian",rum:"Romanian",run:"Rundi",rus:"Russian",sag:"Sango",sah:"Yakut",sai:"South American Indian",sam:"Samaritan Aramaic",san:"Sanskrit",sao:"Samoan",sat:"Santali",scc:"Serbian",scl:"Shina",sco:"Scots",scots:"Scottish",scr:"Croatian",sdr:"Oraon Sadri",sel:"Selkup",sem:"Semitic",sga:"Old Irish",sho:"Shona",sin:"Sinhalese",sio:"Siouan",sip:"Sikkimese",sit:"Sino-Tibetan",sk:"Slovak",sla:"Slavic",slk:"Slovak",slo:"Slovak",slv:"Slovenian",sme:"Saami",smi:"Sami",smo:"Samoan",sms:"Skolt Sami",sna:"Shona",snd:"Sindhi",snh:"Sinhalese",som:"Somali",sot:"Sotho",spa:"Spanish",spain:"Spanish",spv:"Sambalpuri",sq:"Albanian",sqi:"Albanian",srb:"Sora",srp:"Serbian",sso:"Sotho",ssw:"Swazi",sun:"Sundanese",sux:"Sumerian",sv:"Swedish",svenska:"Swedish",swa:"Swahili",swe:"Swedish",swz:"Swazi",syc:"Syriac",syr:"Modern Syriac",tag:"Tagalog",tah:"Tahitian",taj:"Tajik",tam:"Tamil",tar:"Tatar",tat:"Tatar",tcy:"Tulu",tcz:"Thado Chin",tel:"Telugu",tem:"Temne",tgk:"Tajik",tgl:"Tagalog",tha:"Thai",tib:"Tibetan",tig:"Tigre",tir:"Tigrinya",tlh:"Klingon",tog:"Tonga",ton:"Tongan",tpi:"Tok Pisin",tr:"Turkish",trp:"Kok Borok",tsi:"Tsimshian",tsn:"Tswana",tso:"Tsonga",tsw:"Tswana",tuk:"Turkmen",tur:"Turkish","türkçe":"Turkish",tut:"Altaic",tyv:"Tuvinian",udm:"Udmurt",uig:"Uighur",uk:"Ukranian",ukr:"Ukrainian",und:"undetermined",undetermined:"skip",unknown:"skip",unr:"Mundari",urd:"Urdu",uzb:"Uzbek",vah:"Varhadi-Nagpuri",vap:"Vaiphei",vav:"Varli",ven:"Venda",vie:"Vietnamese",vol:"Volapük",war:"Waray",wbr:"Wagdi",wel:"Welsh",wen:"Sorbian",wol:"Wolof",xal:"Oirat",xho:"Xhosa",xis:"Kisan (Dravidian)",xnr:"Kangri",xsr:"Solu-Khumbu Sherpa",yea:"Ravula",yid:"Yiddish",yim:"Yimchungru Naga",yor:"Yoruba",ypk:"Yupik languages",zap:"Zapotec",zh:"Chinese",zha:"Zhuang",zho:"Chinese",zom:"Zou",zul:"Zulu",zun:"Zuni",zxx:"No linguistic content","Русский":"Russian","Український":"Ukranian","العربية":"Arabic","عربي":"Arabic"};class Tl{constructor(){this.delimeter="|"}getLanguageNameFromCodeString(e){const t=this.getCodeArrayFromCodeString(e);if(0===t.length)return"";const i=t[0],r=El[i];return null!=r?r:e}getCodeStringFromLanguageName(e){const t=Object.keys(El).filter((t=>El[t]===e));return null==t?void 0:t.join(this.delimeter)}getCodeArrayFromCodeString(e){return e.split(this.delimeter)}}let Ml=class extends Ze{constructor(){super(...arguments),this.baseImageUrl="https://archive.org",this.sortParam=null,this.selectedSort=Gs.relevance,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.pageSize=50,this.showHistogramDatePicker=!1,this.pageContext="search",this.restorationStateHandler=new kl({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.isManageView=!1,this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.fullYearAggregationLoading=!1,this.mobileView=!1,this.mobileFacetsVisible=!1,this.languageCodeHandler=new Tl,this.isScrollingToCell=!1,this.endOfDataReached=!1,this.placeholderCellTemplate=fe`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.dataSource={},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.pageFetchesInProgress={}}tileModelAtCellIndex(e){var t;const i=Math.floor(e/this.pageSize)+1,r=e%this.pageSize,s=null===(t=this.dataSource[i])||void 0===t?void 0:t[r];return s||this.isScrollingToCell||this.fetchPage(i),s}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter((e=>e)).join(" AND ")}get estimatedTileCount(){return this.pagesToRender*this.pageSize}get actualTileCount(){return Object.keys(this.dataSource).reduce(((e,t)=>e+this.dataSource[t].length),0)}goToPage(e){this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}clearFilters(){this.selectedFacets=Zs,this.sortParam=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.titleQuery=void 0,this.creatorQuery=void 0,this.selectedSort=Gs.relevance,this.sortDirection=null}render(){return fe`
      <div id="content-container" class=${this.mobileView?"mobile":""}>
        <div id="left-column" class="column">
          <div id="mobile-header-container">
            ${this.mobileView?fe`
                  <div id="mobile-filter-collapse">
                    <h1
                      @click=${()=>{this.mobileFacetsVisible=!this.mobileFacetsVisible}}
                      @keyup=${()=>{this.mobileFacetsVisible=!this.mobileFacetsVisible}}
                    >
                      <span
                        class="collapser ${this.mobileFacetsVisible?"open":""}"
                      >
                        ${hl}
                      </span>
                      Filters
                    </h1>
                  </div>
                `:$e}
            <div id="results-total">
              <span id="big-results-count"
                >${void 0!==this.totalResults?this.totalResults.toLocaleString():"-"}</span
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
          ${this.searchResultsLoading?this.loadingTemplate:$e}
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

          ${"list-compact"===this.displayMode?this.listHeaderTemplate:$e}
          ${this.searchResultsLoading||0!==this.totalResults?$e:fe`
                <h2>
                  Your search did not match any items in the Archive. Try
                  different keywords or a more general search.
                </h2>
              `}

          <infinite-scroller
            class="${ui(this.displayMode)}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `}userChangedSort(e){var t;const{selectedSort:i,sortDirection:r}=e.detail;this.selectedSort=i,this.sortDirection=r,(null!==(t=this.currentPage)&&void 0!==t?t:1)>1&&this.goToPage(1),this.currentPage=1}selectedSortChanged(){if("relevance"===this.selectedSort||null===this.sortDirection)return void(this.sortParam=null);const e=qs[this.selectedSort];e&&(this.sortParam={field:e,direction:this.sortDirection})}displayModeChanged(e){this.displayMode=e.detail.displayMode}selectedTitleLetterChanged(){this.titleQuery=this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}selectedCreatorLetterChanged(){this.creatorQuery=this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get facetDataLoading(){return this.facetsLoading||this.fullYearAggregationLoading}get facetsTemplate(){return fe`
      ${this.facetsLoading?this.loadingTemplate:$e}
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
    `}get loadingTemplate(){return fe`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `}get listHeaderTemplate(){return fe`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
        >
        </tile-dispatcher>
      </div>
    `}get queryDebuggingTemplate(){var e,t;return fe`
      <div>
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Sort Filter Query: ${this.sortFilterQueries}</li>
          <li>Date Range Query: ${this.dateRangeQueryClause}</li>
          <li>Sort: ${null===(e=this.sortParam)||void 0===e?void 0:e.field} ${null===(t=this.sortParam)||void 0===t?void 0:t.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>
    `}histogramDateRangeUpdated(e){const{minDate:t,maxDate:i}=e.detail;this.dateRangeQueryClause=`year:[${t} TO ${i}]`}firstUpdated(){this.setupStateRestorationObserver(),this.restoreState()}updated(e){if((e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl"))&&this.infiniteScroller.reload(),e.has("baseQuery")&&this.emitBaseQueryChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("titleQuery")||e.has("creatorQuery")||e.has("dateRangeQueryClause")||e.has("sortParam")||e.has("selectedFacets")||e.has("searchService"))&&this.handleQueryChange(),(e.has("selectedSort")||e.has("sortDirection"))&&this.selectedSortChanged(),e.has("selectedTitleFilter")&&this.selectedTitleLetterChanged(),e.has("selectedCreatorFilter")&&this.selectedCreatorLetterChanged(),e.has("pagesToRender")&&(this.endOfDataReached||(this.infiniteScroller.itemCount=this.estimatedTileCount)),e.has("resizeObserver")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler)}handleResize(e){e.target===this.contentContainer&&(this.mobileView=e.contentRect.width<600)}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(0===t.length)return;const i=t[t.length-1],r=Math.floor(i/this.pageSize)+1;this.currentPage!==r&&(this.currentPage=r);const s=new CustomEvent("visiblePageChanged",{detail:{pageNumber:r}});this.dispatchEvent(s)}async handleQueryChange(){this.searchService&&this.pageFetchQueryKey!==this.previousQueryKey&&(this.previousQueryKey=this.pageFetchQueryKey,this.dataSource={},this.pageFetchesInProgress={},this.endOfDataReached=!1,this.pagesToRender=this.initialPageNumber,!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||(this.persistState(),this.historyPopOccurred=!1),await Promise.all([this.doInitialPageFetch(),this.fetchFacets(),this.fetchFullYearHistogram()]))}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this),window.addEventListener("popstate",this.boundNavigationHandler))}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,r,s,o;const n=this.restorationStateHandler.getRestorationState();this.displayMode=n.displayMode,this.selectedSort=null!==(e=n.selectedSort)&&void 0!==e?e:Gs.relevance,this.sortDirection=null!==(t=n.sortDirection)&&void 0!==t?t:null,this.selectedTitleFilter=null!==(i=n.selectedTitleFilter)&&void 0!==i?i:null,this.selectedCreatorFilter=null!==(r=n.selectedCreatorFilter)&&void 0!==r?r:null,this.selectedFacets=n.selectedFacets,this.baseQuery=n.baseQuery,this.titleQuery=n.titleQuery,this.creatorQuery=n.creatorQuery,this.dateRangeQueryClause=n.dateRangeQueryClause,this.sortParam=null!==(s=n.sortParam)&&void 0!==s?s:null,this.currentPage=null!==(o=n.currentPage)&&void 0!==o?o:1,this.minSelectedDate=n.minSelectedDate,this.maxSelectedDate=n.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,r,s;const o={displayMode:this.displayMode,sortParam:null!==(e=this.sortParam)&&void 0!==e?e:void 0,selectedSort:this.selectedSort,sortDirection:null!==(t=this.sortDirection)&&void 0!==t?t:void 0,selectedFacets:null!==(i=this.selectedFacets)&&void 0!==i?i:Zs,baseQuery:this.baseQuery,currentPage:this.currentPage,dateRangeQueryClause:this.dateRangeQueryClause,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:null!==(r=this.selectedTitleFilter)&&void 0!==r?r:void 0,selectedCreatorFilter:null!==(s=this.selectedCreatorFilter)&&void 0!==s?s:void 0};this.restorationStateHandler.persistState(o)}async doInitialPageFetch(){this.searchResultsLoading=!0,await this.fetchPage(this.initialPageNumber),this.searchResultsLoading=!1}get fullQuery(){let{fullQueryWithoutDate:e}=this;const{dateRangeQueryClause:t}=this;return t&&(e+=` AND ${t}`),e}get fullQueryWithoutDate(){if(!this.baseQuery)return;let e=this.baseQuery;const{facetQuery:t,sortFilterQueries:i}=this;return t&&(e+=` AND ${t}`),i&&(e+=` AND ${i}`),e}get facetQuery(){if(!this.selectedFacets)return;const e=[];for(const[t,i]of Object.entries(this.selectedFacets)){const r=Object.entries(i);if(0===r.length)continue;const s=[];for(const[e,i]of r){const r="hidden"===i?"-":"";if("language"===t){const t=this.languageCodeHandler.getCodeArrayFromCodeString(e);for(const e of t)s.push(`${r}"${e}"`)}else s.push(`${r}"${e}"`)}const o=s.join(" OR ");e.push(`${t}:(${o})`)}return e.length>0?`(${e.join(" AND ")})`:void 0}facetsChanged(e){this.selectedFacets=e.detail}async fetchFacets(){var e,t;if(!this.fullQuery)return;const i={query:this.fullQuery,fields:["identifier"],aggregations:{advancedParams:[{field:"subjectSorter",size:6},{field:"mediatypeSorter",size:6},{field:"languageSorter",size:6},{field:"creatorSorter",size:6},{field:"collection",size:12},{field:"year",size:50}]},rows:1};this.facetsLoading=!0;const r=await(null===(e=this.searchService)||void 0===e?void 0:e.search(i));this.facetsLoading=!1,this.aggregations=null===(t=null==r?void 0:r.success)||void 0===t?void 0:t.response.aggregations}get fullQueryNoDateKey(){var e,t;return`${this.fullQueryWithoutDate}-${null===(e=this.sortParam)||void 0===e?void 0:e.field}-${null===(t=this.sortParam)||void 0===t?void 0:t.direction}`}async fetchFullYearHistogram(){var e,t,i,r;const{fullQueryNoDateKey:s}=this;if(!this.fullQueryWithoutDate||s===this.previousFullQueryNoDate)return;this.previousFullQueryNoDate=s;const o={query:this.fullQueryWithoutDate,fields:["identifier"],aggregations:{simpleParams:["year"]},rows:1};this.fullYearAggregationLoading=!0;const n=await(null===(e=this.searchService)||void 0===e?void 0:e.search(o));this.fullYearAggregationLoading=!1,this.fullYearsHistogramAggregation=null===(r=null===(i=null===(t=null==n?void 0:n.success)||void 0===t?void 0:t.response)||void 0===i?void 0:i.aggregations)||void 0===r?void 0:r.year_histogram}scrollToPage(e){const t=this.pageSize*(e-1);setTimeout((()=>{this.isScrollingToCell=!0,this.infiniteScroller.scrollToCell(t,!0),setTimeout((()=>{this.isScrollingToCell=!1,this.infiniteScroller.reload()}),500)}),0)}get pageFetchQueryKey(){var e,t;return`${this.fullQuery}-${null===(e=this.sortParam)||void 0===e?void 0:e.field}-${null===(t=this.sortParam)||void 0===t?void 0:t.direction}`}async fetchPage(e){var t,i,r,s,o;if(!this.fullQuery)return;if(this.dataSource[e])return;if(this.endOfDataReached)return;const{pageFetchQueryKey:n}=this,a=null!==(t=this.pageFetchesInProgress[n])&&void 0!==t?t:new Set;if(a.has(e))return;a.add(e),this.pageFetchesInProgress[n]=a;const l=this.sortParam?[this.sortParam]:[],d={query:this.fullQuery,fields:["addeddate","avg_rating","collections_raw","creator","date","description","downloads","identifier","issue","item_count","mediatype","num_favorites","num_reviews","publicdate","reviewdate","source","subject","title","volume"],page:e,rows:this.pageSize,sort:l},c=await(null===(i=this.searchService)||void 0===i?void 0:i.search(d)),h=null==c?void 0:c.success;if(!h)return;this.totalResults=h.response.numFound;const u=h.responseHeader.params.qin,p=h.responseHeader.params.sort;let v=!1;if(p){if(p.split(" ").length>1){const e=p.split(" ")[0],t=p.split(" ")[1];e===(null===(r=this.sortParam)||void 0===r?void 0:r.field)&&t===(null===(s=this.sortParam)||void 0===s?void 0:s.direction)||(v=!0)}}else this.sortParam&&(v=!0);if(u!==this.fullQuery||v)return;const{docs:g}=h.response;g&&g.length>0&&(this.preloadCollectionNames(g),this.updateDataSource(e,g)),g.length<this.pageSize&&(this.endOfDataReached=!0,this.infiniteScroller.itemCount=this.actualTileCount),null===(o=this.pageFetchesInProgress[n])||void 0===o||o.delete(e),this.searchResultsLoading=!1}preloadCollectionNames(e){var t;const i=e.map((e=>{var t;return null===(t=e.collections_raw)||void 0===t?void 0:t.values})).flat(),r=Array.from(new Set(i));null===(t=this.collectionNameCache)||void 0===t||t.preloadIdentifiers(r)}get currentVisiblePageNumbers(){const e=this.infiniteScroller.getVisibleCellIndices(),t=new Set;return e.forEach((e=>{const i=Math.floor(e/this.pageSize)+1;t.add(i)})),Array.from(t)}updateDataSource(e,t){const i={...this.dataSource},r=[];null==t||t.forEach((e=>{var t,i,s,o,n,a,l,d,c,h,u,p,v,g,m,f,y,b,$,w,S,_,x,C,A,k,E,T,M,D,N,P;if(!e.identifier)return;let z=!1,O=!1;if((null===(t=e.collections_raw)||void 0===t?void 0:t.values.length)&&"collection"!==(null===(i=e.mediatype)||void 0===i?void 0:i.value))for(const t of null===(s=e.collections_raw)||void 0===s?void 0:s.values){if("loggedin"===t&&(z=!0,O))break;if("no-preview"===t&&(O=!0,z))break}r.push({averageRating:null===(o=e.avg_rating)||void 0===o?void 0:o.value,collections:null!==(a=null===(n=e.collections_raw)||void 0===n?void 0:n.values)&&void 0!==a?a:[],commentCount:null!==(d=null===(l=e.num_reviews)||void 0===l?void 0:l.value)&&void 0!==d?d:0,creator:null===(c=e.creator)||void 0===c?void 0:c.value,creators:null!==(u=null===(h=e.creator)||void 0===h?void 0:h.values)&&void 0!==u?u:[],dateAdded:null===(p=e.addeddate)||void 0===p?void 0:p.value,dateArchived:null===(v=e.publicdate)||void 0===v?void 0:v.value,datePublished:null===(g=e.date)||void 0===g?void 0:g.value,dateReviewed:null===(m=e.reviewdate)||void 0===m?void 0:m.value,description:null===(f=e.description)||void 0===f?void 0:f.value,favCount:null!==(b=null===(y=e.num_favorites)||void 0===y?void 0:y.value)&&void 0!==b?b:0,identifier:e.identifier,issue:null===($=e.issue)||void 0===$?void 0:$.value,itemCount:null!==(S=null===(w=e.item_count)||void 0===w?void 0:w.value)&&void 0!==S?S:0,mediatype:null!==(x=null===(_=e.mediatype)||void 0===_?void 0:_.value)&&void 0!==x?x:"data",source:null===(C=e.source)||void 0===C?void 0:C.value,subjects:null!==(k=null===(A=e.subject)||void 0===A?void 0:A.values)&&void 0!==k?k:[],title:this.etreeTitle(null===(E=e.title)||void 0===E?void 0:E.value,null===(T=e.mediatype)||void 0===T?void 0:T.value,null===(M=e.collection)||void 0===M?void 0:M.values),volume:null===(D=e.volume)||void 0===D?void 0:D.value,viewCount:null!==(P=null===(N=e.downloads)||void 0===N?void 0:N.value)&&void 0!==P?P:0,loginRequired:z,contentWarning:O})})),i[e]=r,this.dataSource=i;this.currentVisiblePageNumbers.includes(e)&&this.infiniteScroller.reload()}etreeTitle(e,t,i){if("etree"===t||(null==i?void 0:i.includes("etree"))){const t=/^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/,i=null==e?void 0:e.replace(t,"$3: $2");if(i)return`${i}`}return null!=e?e:""}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(t)return fe` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .baseImageUrl=${this.baseImageUrl}
      .model=${t}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`}scrollThresholdReached(){this.pagesToRender+=1,this.fetchPage(this.pagesToRender)}};Ml.styles=Fe`
    :host {
      display: block;
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
  `,e([it({type:String})],Ml.prototype,"baseNavigationUrl",void 0),e([it({type:String})],Ml.prototype,"baseImageUrl",void 0),e([it({type:Object})],Ml.prototype,"searchService",void 0),e([it({type:String})],Ml.prototype,"baseQuery",void 0),e([it({type:String})],Ml.prototype,"displayMode",void 0),e([it({type:Object})],Ml.prototype,"sortParam",void 0),e([it({type:String})],Ml.prototype,"selectedSort",void 0),e([it({type:String})],Ml.prototype,"selectedTitleFilter",void 0),e([it({type:String})],Ml.prototype,"selectedCreatorFilter",void 0),e([it({type:String})],Ml.prototype,"sortDirection",void 0),e([it({type:String})],Ml.prototype,"dateRangeQueryClause",void 0),e([it({type:Number})],Ml.prototype,"pageSize",void 0),e([it({type:Object})],Ml.prototype,"resizeObserver",void 0),e([it({type:String})],Ml.prototype,"titleQuery",void 0),e([it({type:String})],Ml.prototype,"creatorQuery",void 0),e([it({type:Number})],Ml.prototype,"currentPage",void 0),e([it({type:String})],Ml.prototype,"minSelectedDate",void 0),e([it({type:String})],Ml.prototype,"maxSelectedDate",void 0),e([it({type:Object})],Ml.prototype,"selectedFacets",void 0),e([it({type:Boolean})],Ml.prototype,"showHistogramDatePicker",void 0),e([it({type:Object})],Ml.prototype,"collectionNameCache",void 0),e([it({type:String})],Ml.prototype,"pageContext",void 0),e([it({type:Object})],Ml.prototype,"restorationStateHandler",void 0),e([it({type:Number})],Ml.prototype,"mobileBreakpoint",void 0),e([it({type:Boolean})],Ml.prototype,"loggedIn",void 0),e([it({type:Boolean})],Ml.prototype,"isManageView",void 0),e([rt()],Ml.prototype,"pagesToRender",void 0),e([rt()],Ml.prototype,"searchResultsLoading",void 0),e([rt()],Ml.prototype,"facetsLoading",void 0),e([rt()],Ml.prototype,"fullYearAggregationLoading",void 0),e([rt()],Ml.prototype,"aggregations",void 0),e([rt()],Ml.prototype,"fullYearsHistogramAggregation",void 0),e([rt()],Ml.prototype,"totalResults",void 0),e([rt()],Ml.prototype,"mobileView",void 0),e([rt()],Ml.prototype,"mobileFacetsVisible",void 0),e([st("#content-container")],Ml.prototype,"contentContainer",void 0),e([st("infinite-scroller")],Ml.prototype,"infiniteScroller",void 0),Ml=e([et("collection-browser")],Ml);let Dl=class extends Ze{constructor(){super(...arguments),this.searchService=P.default,this.resizeObserver=new nt,this.localCache=new H,this.collectionNameCache=new at({searchService:this.searchService,localCache:this.localCache}),this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.loggedIn=!1}searchPressed(e){var t,i;e.preventDefault(),this.searchQuery=this.baseQueryField.value,(null!==(t=this.currentPage)&&void 0!==t?t:1)>1&&this.collectionBrowser.goToPage(null!==(i=this.currentPage)&&void 0!==i?i:1)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}render(){var e;return fe`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input
            type="text"
            id="base-query-field"
            .value=${null!==(e=this.searchQuery)&&void 0!==e?e:""}
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
    `}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}};Dl.styles=Fe`
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
  `,e([rt()],Dl.prototype,"currentPage",void 0),e([rt()],Dl.prototype,"searchQuery",void 0),e([rt()],Dl.prototype,"cellWidth",void 0),e([rt()],Dl.prototype,"cellHeight",void 0),e([rt()],Dl.prototype,"rowGap",void 0),e([rt()],Dl.prototype,"colGap",void 0),e([rt()],Dl.prototype,"loggedIn",void 0),e([st("#base-query-field")],Dl.prototype,"baseQueryField",void 0),e([st("#page-number-input")],Dl.prototype,"pageNumberInput",void 0),e([st("collection-browser")],Dl.prototype,"collectionBrowser",void 0),Dl=e([et("app-root")],Dl);
