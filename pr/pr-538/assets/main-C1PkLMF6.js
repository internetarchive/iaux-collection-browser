var Td=Object.defineProperty;var kd=(o,e,t)=>e in o?Td(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var c=(o,e,t)=>kd(o,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();function n(o,e,t,i){var s=arguments.length,r=s<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(o,e,t,i);else for(var l=o.length-1;l>=0;l--)(a=o[l])&&(r=(s<3?a(r):s>3?a(e,t,r):a(e,t))||r);return s>3&&r&&Object.defineProperty(e,t,r),r}function Cn(o,e,t,i){function s(r){return r instanceof t?r:new t(function(a){a(r)})}return new(t||(t=Promise))(function(r,a){function l(p){try{h(i.next(p))}catch(m){a(m)}}function d(p){try{h(i.throw(p))}catch(m){a(m)}}function h(p){p.done?r(p.value):s(p.value).then(l,d)}h((i=i.apply(o,e||[])).next())})}class _d{constructor(e){var t,i,s,r;this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://athena.archive.org/0.gif",this.defaultService=(t=e==null?void 0:e.defaultService)!==null&&t!==void 0?t:this.DEFAULT_SERVICE,this.imageUrl=(i=e==null?void 0:e.imageUrl)!==null&&i!==void 0?i:this.DEFAULT_IMAGE_URL,this.imageContainer=(s=e==null?void 0:e.imageContainer)!==null&&s!==void 0?s:document.body,this.requireImagePing=(r=e==null?void 0:e.requireImagePing)!==null&&r!==void 0?r:!1}sendPing(e){const t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}const i=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{i(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){const t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,i={kind:"event",ec:e.category,ea:e.action,el:t,cache_bust:Math.random(),...e.eventConfiguration};this.sendPing(i)}sendEventNoSampling(e){const t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;const i=e;i.eventConfiguration=t,this.sendEvent(i)}sendPingViaImage(e){const t=new Image(1,1);t.src=e,t.alt="",this.imageContainer.appendChild(t)}generateTrackingUrl(e){var t;const i=e??{};i.service=(t=i.service)!==null&&t!==void 0?t:this.defaultService;const s=new URL(this.imageUrl),r=Object.keys(i);return r.forEach(a=>{const l=i[a];s.searchParams.append(a,l)}),s.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),s.searchParams.append("count",`${r.length+2}`),s}}function S(o){let e,t,i;return typeof o=="object"?(e=o.hashFunction,t=o.expiring,i=o.tags):e=o,(s,r,a)=>{if(a.value!=null)a.value=Tn(a.value,e,t,i);else if(a.get!=null)a.get=Tn(a.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const Qo=new Map;function Tn(o,e,t=0,i){const s=Symbol("__memoized_map__");return function(...r){let a;this.hasOwnProperty(s)||Object.defineProperty(this,s,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[s];if(Array.isArray(i))for(const d of i)Qo.has(d)?Qo.get(d).push(l):Qo.set(d,[l]);if(e||r.length>0||t>0){let d;e===!0?d=r.map(m=>m.toString()).join("!"):e?d=e.apply(this,r):d=r[0];const h=`${d}__timestamp`;let p=!1;if(t>0)if(!l.has(h))p=!0;else{let m=l.get(h);p=Date.now()-m>t}l.has(d)&&!p?a=l.get(d):(a=o.apply(this,r),l.set(d,a),t>0&&l.set(h,Date.now()))}else{const d=this;l.has(d)?a=l.get(d):(a=o.apply(this,r),l.set(d,a))}return a}}class Yr{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:!!e}}Yr.shared=new Yr;class wt{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}wt.shared=new wt;class ao{parseValue(e){return wt.shared.parseValue(e)}}ao.shared=new ao;class Ss{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let s=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(s=new Date(s.getTime()+s.getTimezoneOffset()*1e3*60)),s}}Ss.shared=new Ss;class no{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((s,r)=>{const a=parseFloat(s);if(Number.isNaN(a))return t=!0,0;const d=60**(e.length-1-r);return a*Math.floor(d)}).reduce((s,r)=>s+r,0);return t?void 0:i}}no.shared=new no;class Qr{parseValue(e){if(typeof e=="string")return e}}Qr.shared=new Qr;class Ed{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const s of this.separators)if(i=t.split(s),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(r=>r.trim()).map(r=>this.parser.parseValue(r)),s=[];return i.forEach(r=>{r!==void 0&&s.push(r)}),s}}class Kr{parseValue(e){if(typeof e=="string")return e}}Kr.shared=new Kr;class lo{parseValue(e){return String(e)}}lo.shared=new lo;class Bi{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=wt.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?ao.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?no.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?wt.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?wt.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?wt.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}}n([S()],Bi.prototype,"mtime",null);n([S()],Bi.prototype,"size",null);n([S()],Bi.prototype,"length",null);n([S()],Bi.prototype,"height",null);n([S()],Bi.prototype,"width",null);n([S()],Bi.prototype,"track",null);class nt{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const s=this.parser.parseValue(i);Array.isArray(s)?t.push(...s):s!==void 0&&t.push(s)}),t}}n([S()],nt.prototype,"values",null);n([S()],nt.prototype,"value",null);class Zt extends nt{constructor(e){super(Yr.shared,e)}}class He extends nt{constructor(e){super(Ss.shared,e)}}class Ko extends nt{constructor(e){super(no.shared,e)}}class xe extends nt{constructor(e){super(wt.shared,e)}}class z extends nt{constructor(e){super(lo.shared,e)}}class Ad extends nt{constructor(e){super(Kr.shared,e)}}class kn extends nt{constructor(e){super(ao.shared,e)}}class nc extends nt{constructor(e){super(Qr.shared,e)}}class Md extends nt{constructor(e,t){super(t,e)}}class Dd extends Md{constructor(e){const t=new Ed(lo.shared);super(e,t)}}class D{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new He(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new z(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new xe(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new xe(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new z(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new z(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new kn(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new z(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new z(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new z(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new z(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new z(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new z(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new z(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new He(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new z(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new xe(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new Ko(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new z(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new z(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new xe(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new He(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new z(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new z(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new xe(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new kn(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new z(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new Ko(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new z(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new z(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new xe(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new nc(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new Zt(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new z(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new xe(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new xe(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new z(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new z(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new Ad(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new Zt(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new z(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new z(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new xe(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new He(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new z(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new He(this.rawMetadata.reviewdate):void 0}get rights(){return this.rawMetadata.rights!=null?new z(this.rawMetadata.rights):void 0}get rights_holder(){var e;const t=(e=this.rawMetadata["rights-holder"])!==null&&e!==void 0?e:this.rawMetadata.rights_holder;return t!=null?new z(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new Ko(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new z(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new z(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new z(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new z(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new z(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new He(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new He(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new He(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new Dd(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new z(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new z(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new z(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new z(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new xe(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new z(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new z(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new xe(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new z(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new z(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new xe(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new xe(this.rawMetadata.year):void 0}constructor(e={}){this.rawMetadata=e}}n([S()],D.prototype,"addeddate",null);n([S()],D.prototype,"audio_codec",null);n([S()],D.prototype,"audio_sample_rate",null);n([S()],D.prototype,"avg_rating",null);n([S()],D.prototype,"collection",null);n([S()],D.prototype,"collections_raw",null);n([S()],D.prototype,"collection_size",null);n([S()],D.prototype,"contact",null);n([S()],D.prototype,"contributor",null);n([S()],D.prototype,"coverage",null);n([S()],D.prototype,"creator",null);n([S()],D.prototype,"creator_alt_script",null);n([S()],D.prototype,"credits",null);n([S()],D.prototype,"collection_layout",null);n([S()],D.prototype,"date",null);n([S()],D.prototype,"description",null);n([S()],D.prototype,"downloads",null);n([S()],D.prototype,"duration",null);n([S()],D.prototype,"external_identifier",null);n([S()],D.prototype,"external_link",null);n([S()],D.prototype,"files_count",null);n([S()],D.prototype,"indexdate",null);n([S()],D.prototype,"isbn",null);n([S()],D.prototype,"issue",null);n([S()],D.prototype,"item_count",null);n([S()],D.prototype,"item_size",null);n([S()],D.prototype,"language",null);n([S()],D.prototype,"length",null);n([S()],D.prototype,"licenseurl",null);n([S()],D.prototype,"lineage",null);n([S()],D.prototype,"month",null);n([S()],D.prototype,"mediatype",null);n([S()],D.prototype,"noindex",null);n([S()],D.prototype,"notes",null);n([S()],D.prototype,"num_favorites",null);n([S()],D.prototype,"num_reviews",null);n([S()],D.prototype,"openlibrary_edition",null);n([S()],D.prototype,"openlibrary_work",null);n([S()],D.prototype,"page_progression",null);n([S()],D.prototype,"paginated",null);n([S()],D.prototype,"partner",null);n([S()],D.prototype,"post_text",null);n([S()],D.prototype,"ppi",null);n([S()],D.prototype,"publicdate",null);n([S()],D.prototype,"publisher",null);n([S()],D.prototype,"reviewdate",null);n([S()],D.prototype,"rights",null);n([S()],D.prototype,"rights_holder",null);n([S()],D.prototype,"runtime",null);n([S()],D.prototype,"scanner",null);n([S()],D.prototype,"segments",null);n([S()],D.prototype,"shotlist",null);n([S()],D.prototype,"source",null);n([S()],D.prototype,"sponsor",null);n([S()],D.prototype,"start_localtime",null);n([S()],D.prototype,"start_time",null);n([S()],D.prototype,"stop_time",null);n([S()],D.prototype,"subject",null);n([S()],D.prototype,"taper",null);n([S()],D.prototype,"title",null);n([S()],D.prototype,"title_alt_script",null);n([S()],D.prototype,"transferer",null);n([S()],D.prototype,"track",null);n([S()],D.prototype,"type",null);n([S()],D.prototype,"uploader",null);n([S()],D.prototype,"utc_offset",null);n([S()],D.prototype,"venue",null);n([S()],D.prototype,"volume",null);n([S()],D.prototype,"week",null);n([S()],D.prototype,"year",null);class Eo{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?Ss.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?Ss.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?wt.shared.parseValue(this.rawValue.stars):void 0}constructor(e={}){this.rawValue=e}}n([S()],Eo.prototype,"reviewdate",null);n([S()],Eo.prototype,"createdate",null);n([S()],Eo.prototype,"stars",null);class _a extends Eo{get reviewer_account_status(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.status}get reviewer_account_status_reason(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.reason}get __href__(){return this.rawValue.__href__}get account_status(){const e=this.rawValue.reviewer_account_status;if(!e)return;let t="unknown",i;e.startsWith("ok")&&(t="ok"),e.startsWith("locked")&&(t="locked");const s=e.split("__");return s.length>1&&(i=s.slice(1).join("__")),{status:t,reason:i}}}n([S()],_a.prototype,"account_status",null);const Fd=["loans","waitlist","loan_history"];function Pd(o){const e=o.slice(0,4),t=o.slice(4,6),i=o.slice(6,8),s=o.slice(8,10),r=o.slice(10,12),a=o.slice(12,14);return`${e}-${t}-${i}T${s}:${r}:${a}Z`}function Ld(o){var e;const t=[];for(const i of o){if(!(!((e=i.captures)===null||e===void 0)&&e.length))continue;const s=encodeURIComponent(i.url),r=`https://web.archive.org/web/${i.captures[0]}/${s}`;t.push({hit_type:"web_archive",fields:{url:i.url,capture_dates:i.captures.map(a=>Pd(a)),__href__:r}})}return t}class be extends D{get created_on(){return this.rawMetadata.created_on!=null?new He(this.rawMetadata.created_on):void 0}get file_creation_mtime(){return this.rawMetadata.file_creation_mtime!=null?new xe(this.rawMetadata.file_creation_mtime):void 0}get filename(){return this.rawMetadata.filename!=null?new z(this.rawMetadata.filename):void 0}get file_basename(){return this.rawMetadata.file_basename!=null?new z(this.rawMetadata.file_basename):void 0}get result_in_subfile(){return this.rawMetadata.result_in_subfile!=null?new Zt(this.rawMetadata.result_in_subfile):void 0}get query(){return this.rawMetadata.query!=null?new z(this.rawMetadata.query):void 0}get date_favorited(){return this.rawMetadata.date_favorited!=null?new He(this.rawMetadata.date_favorited):void 0}get updated_on(){return this.rawMetadata.updated_on!=null?new He(this.rawMetadata.updated_on):void 0}get ad_id(){return this.rawMetadata.ad_id!=null?new z(this.rawMetadata.ad_id):void 0}get factcheck(){return this.rawMetadata.factcheck!=null?new z(this.rawMetadata.factcheck):void 0}get is_clip(){return this.rawMetadata.clip!=null?new Zt(this.rawMetadata.clip):void 0}get num_clips(){return this.rawMetadata.nclips!=null?new xe(this.rawMetadata.nclips):void 0}get __href__(){return this.rawMetadata.__href__!=null?new z(this.rawMetadata.__href__):void 0}get __img__(){return this.rawMetadata.__img__!=null?new z(this.rawMetadata.__img__):void 0}}n([S()],be.prototype,"created_on",null);n([S()],be.prototype,"file_creation_mtime",null);n([S()],be.prototype,"filename",null);n([S()],be.prototype,"file_basename",null);n([S()],be.prototype,"result_in_subfile",null);n([S()],be.prototype,"query",null);n([S()],be.prototype,"date_favorited",null);n([S()],be.prototype,"updated_on",null);n([S()],be.prototype,"ad_id",null);n([S()],be.prototype,"factcheck",null);n([S()],be.prototype,"is_clip",null);n([S()],be.prototype,"num_clips",null);n([S()],be.prototype,"__href__",null);n([S()],be.prototype,"__img__",null);class st{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get collection_files_count(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.collection_files_count)!=null?new xe(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){return this.fields.collection_size}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get files_count(){return this.fields.files_count}get genre(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.genre)!=null?new z(this.rawMetadata.fields.genre):void 0}get indexflag(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.indexflag)!=null?new z(this.rawMetadata.fields.indexflag):void 0}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get lending___available_to_borrow(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_borrow)!=null?new Zt(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_browse)!=null?new Zt(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_waitlist)!=null?new Zt(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___status)!=null?new z(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.licenseurl)!=null?new z(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){return this.fields.mediatype}get month(){return this.fields.month}get noindex(){return this.fields.noindex}get num_favorites(){return this.fields.num_favorites}get num_reviews(){return this.fields.num_reviews}get publicdate(){return this.fields.publicdate}get reviewdate(){return this.fields.reviewdate}get review(){const e=this.rawMetadata.review;return e?new _a(e):void 0}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get type(){return this.fields.type}get volume(){return this.fields.volume}get week(){return this.fields.week}get year(){return this.fields.year}}n([S()],st.prototype,"collection_files_count",null);n([S()],st.prototype,"genre",null);n([S()],st.prototype,"indexflag",null);n([S()],st.prototype,"lending___available_to_borrow",null);n([S()],st.prototype,"lending___available_to_browse",null);n([S()],st.prototype,"lending___available_to_waitlist",null);n([S()],st.prototype,"lending___status",null);n([S()],st.prototype,"licenseurl",null);n([S()],st.prototype,"review",null);class Ea{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new z(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get issue(){return this.fields.issue}get mediatype(){return this.fields.mediatype}get page_num(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.page_num)!=null?new xe(this.rawMetadata.fields.page_num):void 0}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get year(){return this.fields.year}get __href__(){return this.fields.__href__}}n([S()],Ea.prototype,"highlight",null);n([S()],Ea.prototype,"page_num",null);var q;(function(o){o[o.COUNT=0]="COUNT",o[o.ALPHABETICAL=1]="ALPHABETICAL",o[o.NUMERIC=2]="NUMERIC"})(q||(q={}));class lc{constructor(e){this.buckets=e.buckets,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval,this.first_bucket_year=e.first_bucket_year,this.first_bucket_month=e.first_bucket_month,this.last_bucket_year=e.last_bucket_year,this.last_bucket_month=e.last_bucket_month,this.interval_in_months=e.interval_in_months}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const i=new Intl.Collator;switch(e){case q.ALPHABETICAL:return t.sort((s,r)=>i.compare(s.key.toString(),r.key.toString()));case q.NUMERIC:return t.sort((s,r)=>Number(r.key)-Number(s.key));case q.COUNT:default:return t}}isRawNumberBuckets(e){return typeof e[0]=="number"}}n([S()],lc.prototype,"getSortedBuckets",null);class Od{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.fields.query)===null||e===void 0?void 0:e.value}get title(){return this.fields.title}get query(){return this.fields.query}get date_favorited(){return this.fields.date_favorited}get __href__(){return this.fields.__href__}}class Aa{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.rawMetadata.fields)===null||e===void 0?void 0:e.url}get mediatype(){return new nc("web")}get title(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.url?new z((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.url):void 0}get capture_dates(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.capture_dates?new He((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.capture_dates):void 0}get __href__(){return this.fields.__href__}}n([S()],Aa.prototype,"title",null);n([S()],Aa.prototype,"capture_dates",null);class Ma{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new z(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get ad_id(){return this.fields.ad_id}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get factcheck(){return this.fields.factcheck}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get files_count(){return this.fields.files_count}get is_clip(){return this.fields.is_clip}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get mediatype(){return this.fields.mediatype}get num_clips(){return this.fields.num_clips}get num_favorites(){return this.fields.num_favorites}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get week(){return this.fields.week}get year(){return this.fields.year}get start(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.start)!=null?new z(this.rawMetadata.fields.start):void 0}get __href__(){return this.fields.__href__}get __img__(){return this.fields.__img__}}n([S()],Ma.prototype,"highlight",null);n([S()],Ma.prototype,"start",null);class Da{constructor(e){this.rawResponse=e}get item_size(){return this.rawResponse.item_size}get files_count(){return this.rawResponse.files_count}get month(){return this.rawResponse.month}get week(){return this.rawResponse.week}get downloads(){return this.rawResponse.downloads}get num_favorites(){return this.rawResponse.num_favorites}get title_message(){return this.rawResponse.title_message}get primary_collection(){return this.rawResponse.primary_collection}get thumbnail_url(){return this.rawResponse.thumbnail_url}get num_reviews(){return this.rawResponse.num_reviews}get uploader_details(){return this.rawResponse.uploader_details}get public_metadata(){if(this.rawResponse.public_metadata)return new D(this.rawResponse.public_metadata)}get part_of(){return this.rawResponse.part_of}get speech_vs_music_asr_metadata(){return this.rawResponse.speech_vs_music_asr_metadata}get reviews_metadata(){var e;return((e=this.rawResponse.reviews_metadata)!==null&&e!==void 0?e:[]).map(i=>new _a(i))}}n([S()],Da.prototype,"public_metadata",null);n([S()],Da.prototype,"reviews_metadata",null);class Fa{constructor(e,t){var i,s,r,a,l,d,h,p,m,g,b,$,C,M,P;this.extraInfo=null,this.schema=t,this.schemaHitType=t==null?void 0:t.hit_type;let F;e!=null&&e.page_elements&&(this.pageElements=e.page_elements,F=Object.values(this.pageElements)[0]);let O=(i=e==null?void 0:e.hits)===null||i===void 0?void 0:i.hits;this.totalResults=(r=(s=e==null?void 0:e.hits)===null||s===void 0?void 0:s.total)!==null&&r!==void 0?r:0,this.returnedCount=(l=(a=e==null?void 0:e.hits)===null||a===void 0?void 0:a.returned)!==null&&l!==void 0?l:0,!(O!=null&&O.length)&&(!((d=this.pageElements)===null||d===void 0)&&d.service___fts)?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!(O!=null&&O.length)&&(!((h=F==null?void 0:F.hits)===null||h===void 0)&&h.hits)?(O=F.hits.hits,this.totalResults=(p=F.hits.total)!==null&&p!==void 0?p:0,this.returnedCount=(m=F.hits.returned)!==null&&m!==void 0?m:0):!((g=this.pageElements)===null||g===void 0)&&g.lending?O=this.handleLendingPageElement():!((b=this.pageElements)===null||b===void 0)&&b.web_archives&&(O=this.handleWebArchivesPageElement()),this.results=this.formatHits(O);let N=e==null?void 0:e.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&(F!=null&&F.aggregations)&&(N=F.aggregations),N&&this.buildAggregations(N),e!=null&&e.collection_titles&&(this.collectionTitles=($=e.collection_titles)!==null&&$!==void 0?$:{}),e!=null&&e.tv_channel_aliases&&(this.tvChannelAliases=(C=e.tv_channel_aliases)!==null&&C!==void 0?C:{}),e!=null&&e.collection_extra_info&&(this.collectionExtraInfo=(M=e.collection_extra_info)!==null&&M!==void 0?M:null),e!=null&&e.account_extra_info&&(this.accountExtraInfo=(P=e.account_extra_info)!==null&&P!==void 0?P:null),e!=null&&e.extra_info&&(this.extraInfo=new Da(e.extra_info))}formatHits(e){var t;return(t=e==null?void 0:e.map(i=>{var s;return Fa.createResult((s=i.hit_type)!==null&&s!==void 0?s:this.schemaHitType,i)}))!==null&&t!==void 0?t:[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((t,[i,s])=>(t[i]=new lc(s),t),{})}handleLendingPageElement(){var e,t;const i=(e=this.pageElements)===null||e===void 0?void 0:e.lending,s=(t=i.loans)!==null&&t!==void 0?t:[];this.totalResults=s.length,this.returnedCount=this.totalResults;for(const r of Fd)i[r]=this.formatHits(i[r]);return s}handleWebArchivesPageElement(){var e;const t=Ld((e=this.pageElements)===null||e===void 0?void 0:e.web_archives);return this.totalResults=t.length,this.returnedCount=this.totalResults,t}handleFederatedPageElements(){var e,t,i,s;const r=["service___fts","service___tvs","service___rcs","service___whisper","metadata___mediatype___texts","metadata___mediatype___movies","metadata___mediatype___audio","metadata___mediatype___software","metadata___mediatype___image","metadata___mediatype___etree"];for(const a of r){const l=this.removePageElementPrefix(a);this.federatedResults?this.federatedResults[a]=[]:this.federatedResults={[l]:[]};const d=(t=(e=this.pageElements)===null||e===void 0?void 0:e[a])===null||t===void 0?void 0:t.hits;d!=null&&d.hits&&(this.federatedResults[l]=this.formatHits(d==null?void 0:d.hits)),this.totalResults+=(i=d==null?void 0:d.total)!==null&&i!==void 0?i:0,this.returnedCount+=(s=d==null?void 0:d.returned)!==null&&s!==void 0?s:0}}removePageElementPrefix(e){return e.split("___").pop()}static createResult(e,t){switch(e){case"item":return new st(t);case"text":case"asr_text":return new Ea(t);case"favorited_search":return new Od(t);case"web_archive":return new Aa(t);case"tv_clip":return new Ma(t);default:return new st(t)}}}class Bd{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class Rd{constructor(e){var t,i,s;this.rawResponse=e,this.request=new Bd(e.request),this.responseHeader=(t=e.response)===null||t===void 0?void 0:t.header,this.sessionContext=e.session_context,this.response=new Fa((i=e.response)===null||i===void 0?void 0:i.body,(s=e.response)===null||s===void 0?void 0:s.hit_schema)}}class Ri{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(s=>({terms:s}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(e.query&&t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){const r=`[${e.pageElements.map(a=>`"${a}"`).join(",")}]`;t.append("page_elements",r)}if(e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const s=this.filterParamsAsString(e.filters);s&&s!=="{}"&&t.append("filter_map",s)}if(e.sort&&e.sort.length>0){const s=e.sort.map(r=>this.sortParamsAsString(r));t.append("sort",s.join(","))}const i=e.aggregations;if(i){const s=this.aggregateSearchParamsAsString(i);s&&t.append("aggregations",s)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const s=e.query==null,r=e.query&&e.query.length<=1e3;if(s||r){const l=window.location.href.slice(0,400);t.append("client_url",l)}}return t}}var ls;(function(o){o.networkError="SearchService.NetworkError",o.itemNotFound="SearchService.ItemNotFound",o.decodingError="SearchService.DecodingError",o.searchEngineError="SearchService.SearchEngineError"})(ls||(ls={}));class zd extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}const _n={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})};class zi{constructor(e){var t,i;this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const s=new URL(window.location.href).searchParams,r=s.get("scope"),a=s.get("verbose"),l=s.get("debugging"),d=s.get("cacheDebug");let h="";for(const p of Object.keys(_n))if(s.get(p)){h=_n[p];break}h=(i=s.get("caching"))!==null&&i!==void 0?i:h,(e==null?void 0:e.caching)!==void 0?this.cachingFlags=e.caching:h&&(this.cachingFlags=h),(e==null?void 0:e.debuggingEnabled)!==void 0?this.debuggingEnabled=e.debuggingEnabled:(l||d)&&(this.debuggingEnabled=!0),(e==null?void 0:e.scope)!==void 0?this.requestScope=e.scope:r&&(this.requestScope=r),(e==null?void 0:e.verbose)!==void 0?this.verbose=e.verbose:a&&(this.verbose=!!a)}async fetchUrl(e,t){var i,s;const r=new URL(e);this.requestScope&&r.searchParams.set("scope",this.requestScope),this.cachingFlags&&r.searchParams.set("caching",this.cachingFlags);let a;try{const l=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(r.href,l)}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(ls.networkError,d)}try{const l=await a.json();this.verbose&&this.printResponse(l),l.debugging&&this.printDebuggingInfo(l);const d=(s=l.response)===null||s===void 0?void 0:s.error;return d?this.getErrorResult(ls.searchEngineError,d.message,d.forensics):{success:l}}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(ls.decodingError,d)}}getErrorResult(e,t,i){return{error:new zd(e,t,i)}}printResponse(e){var t,i,s,r,a;try{const l=JSON.parse(JSON.stringify(e)),d=(s=(i=(t=l==null?void 0:l.response)===null||t===void 0?void 0:t.body)===null||i===void 0?void 0:i.hits)===null||s===void 0?void 0:s.hits;if(Array.isArray(d)&&d.length>1){const p=[];p.push(d[0]),p.push(`*** ${d.length-1} hits omitted ***`),l.response.body.hits.hits=p}const h=(a=(r=l==null?void 0:l.response)===null||r===void 0?void 0:r.body)===null||a===void 0?void 0:a.aggregations;h&&Object.entries(h).forEach(([p,m])=>{var g,b,$,C;if(((b=(g=m)===null||g===void 0?void 0:g.buckets)===null||b===void 0?void 0:b.length)>0){const M=JSON.parse(JSON.stringify(m));M.buckets=`*** ${(C=($=M.buckets)===null||$===void 0?void 0:$.length)!==null&&C!==void 0?C:0} buckets omitted ***`,l.response.body.aggregations[p]=M}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(l,null,2)),console.groupEnd()}catch(l){console.error("Error printing search response:",l)}}printDebuggingInfo(e){var t,i;const s=e.debugging,r=(t=s.messages)!==null&&t!==void 0?t:[],a=(i=s.data)!==null&&i!==void 0?i:{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const l of r)console.log(l);console.groupEnd(),console.group("Debug data");for(const[l,d]of Object.entries(a))console.log(l,d);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class Id extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${i}`;return this.fetchUrl(s)}}class Nd extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${i}`;return this.fetchUrl(s)}}class Ud extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${i}`;return this.fetchUrl(s)}}var U;(function(o){o[o.DEFAULT=0]="DEFAULT",o[o.METADATA=1]="METADATA",o[o.FULLTEXT=2]="FULLTEXT",o[o.TV=3]="TV",o[o.RADIO=4]="RADIO",o[o.FEDERATED=5]="FEDERATED"})(U||(U={}));class Hd extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?service_backend=tvs&${i}`;return this.fetchUrl(s)}}class Vd extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${i}`;return this.fetchUrl(s)}}class Wd extends zi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=Ri.generateURLSearchParams(e).toString(),s=`https://${this.baseUrl}${this.servicePath}/?${i}`,{pageType:r,identifiers:a}=e,d=r==="client_document_fetch"&&!!(a!=null&&a.length)?{requestOptions:{method:"POST",body:JSON.stringify({doc_ids:a}),credentials:"include"}}:void 0;return this.fetchUrl(s,d)}}class Ci{constructor(e={}){this.backendOptions=e}async search(e,t=U.METADATA){const s=await Ci.getBackendForSearchType(t,this.backendOptions).performSearch(e);return s.error?s:{success:new Rd(s.success)}}itemDetails(e){const t={pageType:"item_details",pageTarget:e};return this.search(t,U.DEFAULT)}static getBackendForSearchType(e,t={}){switch(e){case U.METADATA:return new Id(t);case U.FULLTEXT:return new Nd(t);case U.RADIO:return new Ud(t);case U.TV:return new Hd(t);case U.FEDERATED:return new Vd(t);default:return new Wd(t)}}}Ci.default=new Ci;n([S((o,e={})=>{const{includeCredentials:t=!1,verbose:i=!1,scope:s="",baseUrl:r=""}=e;return`${o};${t};${i};${s};${r}`})],Ci,"getBackendForSearchType",null);var Tt;(function(o){o.INCLUDE="inc",o.EXCLUDE="exc",o.GREATER_THAN="gt",o.GREATER_OR_EQUAL="gte",o.LESS_THAN="lt",o.LESS_OR_EQUAL="lte"})(Tt||(Tt={}));class jd{constructor(){this.filterMap={}}addFilter(e,t,i){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){const s=[].concat(this.filterMap[e][t],i);this.filterMap[e][t]=Array.from(new Set(s))}else this.filterMap[e][t]=i;return this}removeSingleFilter(e,t,i){var s;if(!(!((s=this.filterMap[e])===null||s===void 0)&&s[t]))return this;const r=[].concat(this.filterMap[e][t]),a=r.indexOf(i);return a>=0&&r.splice(a,1),this.filterMap[e][t]=r.length===1?r[0]:r,r.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){const t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap={...e},this}mergeFilterMap(e){for(const[t,i]of Object.entries(e))for(const[s,r]of Object.entries(i))if(Array.isArray(r))for(const a of r)this.addFilter(t,s,a);else this.addFilter(t,s,r);return this}build(){return this.filterMap}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ys=globalThis,Pa=Ys.ShadowRoot&&(Ys.ShadyCSS===void 0||Ys.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,cc=Symbol(),En=new WeakMap;let qd=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==cc)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Pa&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=En.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&En.set(t,e))}return e}toString(){return this.cssText}};const Gd=o=>new qd(typeof o=="string"?o:o+"",void 0,cc),Yd=(o,e)=>{if(Pa)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=Ys.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},An=Pa?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Gd(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Qd,defineProperty:Kd,getOwnPropertyDescriptor:Xd,getOwnPropertyNames:Zd,getOwnPropertySymbols:Jd,getPrototypeOf:eh}=Object,Dt=globalThis,Mn=Dt.trustedTypes,th=Mn?Mn.emptyScript:"",Xo=Dt.reactiveElementPolyfillSupport,cs=(o,e)=>o,co={toAttribute(o,e){switch(e){case Boolean:o=o?th:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},La=(o,e)=>!Qd(o,e),Dn={attribute:!0,type:String,converter:co,reflect:!1,useDefault:!1,hasChanged:La};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Dt.litPropertyMetadata??(Dt.litPropertyMetadata=new WeakMap);let ji=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Dn){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Kd(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=Xd(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){const l=s==null?void 0:s.call(this);r==null||r.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Dn}static _$Ei(){if(this.hasOwnProperty(cs("elementProperties")))return;const e=eh(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(cs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(cs("properties"))){const t=this.properties,i=[...Zd(t),...Jd(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(An(s))}else e!==void 0&&t.push(An(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Yd(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var r;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const a=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:co).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){var r,a;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:co;this._$Em=s;const h=d.fromAttribute(t,l.type);this[s]=h??((a=this._$Ej)==null?void 0:a.get(s))??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){var a;if(e!==void 0){const l=this.constructor;if(s===!1&&(r=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??La)(r,t)||i.useDefault&&i.reflect&&r===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,a]of s){const{wrapped:l}=a,d=this[r];l!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,a,d)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};ji.elementStyles=[],ji.shadowRootOptions={mode:"open"},ji[cs("elementProperties")]=new Map,ji[cs("finalized")]=new Map,Xo==null||Xo({ReactiveElement:ji}),(Dt.reactiveElementVersions??(Dt.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ds=globalThis,Fn=o=>o,ho=ds.trustedTypes,Pn=ho?ho.createPolicy("lit-html",{createHTML:o=>o}):void 0,dc="$lit$",Et=`lit$${Math.random().toFixed(9).slice(2)}$`,hc="?"+Et,ih=`<${hc}>`,ri=document,po=()=>ri.createComment(""),xs=o=>o===null||typeof o!="object"&&typeof o!="function",Oa=Array.isArray,sh=o=>Oa(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",Zo=`[ 	
\f\r]`,qi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ln=/-->/g,On=/>/g,zt=RegExp(`>|${Zo}(?:([^\\s"'>=/]+)(${Zo}*=${Zo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Bn=/'/g,Rn=/"/g,pc=/^(?:script|style|textarea|title)$/i,Ve=Symbol.for("lit-noChange"),se=Symbol.for("lit-nothing"),zn=new WeakMap,Gt=ri.createTreeWalker(ri,129);function uc(o,e){if(!Oa(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Pn!==void 0?Pn.createHTML(e):e}const oh=(o,e)=>{const t=o.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",a=qi;for(let l=0;l<t;l++){const d=o[l];let h,p,m=-1,g=0;for(;g<d.length&&(a.lastIndex=g,p=a.exec(d),p!==null);)g=a.lastIndex,a===qi?p[1]==="!--"?a=Ln:p[1]!==void 0?a=On:p[2]!==void 0?(pc.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=zt):p[3]!==void 0&&(a=zt):a===zt?p[0]===">"?(a=s??qi,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,h=p[1],a=p[3]===void 0?zt:p[3]==='"'?Rn:Bn):a===Rn||a===Bn?a=zt:a===Ln||a===On?a=qi:(a=zt,s=void 0);const b=a===zt&&o[l+1].startsWith("/>")?" ":"";r+=a===qi?d+ih:m>=0?(i.push(h),d.slice(0,m)+dc+d.slice(m)+Et+b):d+Et+(m===-2?l:b)}return[uc(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let Xr=class fc{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,a=0;const l=e.length-1,d=this.parts,[h,p]=oh(e,t);if(this.el=fc.createElement(h,i),Gt.currentNode=this.el.content,t===2||t===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Gt.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const m of s.getAttributeNames())if(m.endsWith(dc)){const g=p[a++],b=s.getAttribute(m).split(Et),$=/([.?@])?(.*)/.exec(g);d.push({type:1,index:r,name:$[2],strings:b,ctor:$[1]==="."?ah:$[1]==="?"?nh:$[1]==="@"?lh:Ao}),s.removeAttribute(m)}else m.startsWith(Et)&&(d.push({type:6,index:r}),s.removeAttribute(m));if(pc.test(s.tagName)){const m=s.textContent.split(Et),g=m.length-1;if(g>0){s.textContent=ho?ho.emptyScript:"";for(let b=0;b<g;b++)s.append(m[b],po()),Gt.nextNode(),d.push({type:2,index:++r});s.append(m[g],po())}}}else if(s.nodeType===8)if(s.data===hc)d.push({type:2,index:r});else{let m=-1;for(;(m=s.data.indexOf(Et,m+1))!==-1;)d.push({type:7,index:r}),m+=Et.length-1}r++}}static createElement(e,t){const i=ri.createElement("template");return i.innerHTML=e,i}};function Ti(o,e,t=o,i){var a,l;if(e===Ve)return e;let s=i!==void 0?(a=t._$Co)==null?void 0:a[i]:t._$Cl;const r=xs(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=Ti(o,s._$AS(o,e.values),s,i)),e}let rh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??ri).importNode(t,!0);Gt.currentNode=s;let r=Gt.nextNode(),a=0,l=0,d=i[0];for(;d!==void 0;){if(a===d.index){let h;d.type===2?h=new Ba(r,r.nextSibling,this,e):d.type===1?h=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(h=new ch(r,this,e)),this._$AV.push(h),d=i[++l]}a!==(d==null?void 0:d.index)&&(r=Gt.nextNode(),a++)}return Gt.currentNode=ri,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Ba=class mc{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=se,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ti(this,e,t),xs(e)?e===se||e==null||e===""?(this._$AH!==se&&this._$AR(),this._$AH=se):e!==this._$AH&&e!==Ve&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):sh(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==se&&xs(this._$AH)?this._$AA.nextSibling.data=e:this.T(ri.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Xr.createElement(uc(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const a=new rh(s,this),l=a.u(this.options);a.p(t),this.T(l),this._$AH=a}}_$AC(e){let t=zn.get(e.strings);return t===void 0&&zn.set(e.strings,t=new Xr(e)),t}k(e){Oa(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new mc(this.O(po()),this.O(po()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=Fn(e).nextSibling;Fn(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},Ao=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=se,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=se}_$AI(e,t=this,i,s){const r=this.strings;let a=!1;if(r===void 0)e=Ti(this,e,t,0),a=!xs(e)||e!==this._$AH&&e!==Ve,a&&(this._$AH=e);else{const l=e;let d,h;for(e=r[0],d=0;d<r.length-1;d++)h=Ti(this,l[i+d],t,d),h===Ve&&(h=this._$AH[d]),a||(a=!xs(h)||h!==this._$AH[d]),h===se?e=se:e!==se&&(e+=(h??"")+r[d+1]),this._$AH[d]=h}a&&!s&&this.j(e)}j(e){e===se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},ah=class extends Ao{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===se?void 0:e}},nh=class extends Ao{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==se)}},lh=class extends Ao{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=Ti(this,e,t,0)??se)===Ve)return;const i=this._$AH,s=e===se&&i!==se||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==se&&(i===se||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},ch=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ti(this,e)}};const dh={I:Ba},Jo=ds.litHtmlPolyfillSupport;Jo==null||Jo(Xr,Ba),(ds.litHtmlVersions??(ds.litHtmlVersions=[])).push("3.3.2");/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qs=globalThis,Ra=Qs.ShadowRoot&&(Qs.ShadyCSS===void 0||Qs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,za=Symbol(),In=new WeakMap;let gc=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==za)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ra&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=In.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&In.set(t,e))}return e}toString(){return this.cssText}};const hh=o=>new gc(typeof o=="string"?o:o+"",void 0,za),x=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new gc(t,o,za)},ph=(o,e)=>{if(Ra)o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=Qs.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)}},Nn=Ra?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return hh(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:uh,defineProperty:fh,getOwnPropertyDescriptor:mh,getOwnPropertyNames:gh,getOwnPropertySymbols:vh,getPrototypeOf:bh}=Object,Ft=globalThis,Un=Ft.trustedTypes,yh=Un?Un.emptyScript:"",er=Ft.reactiveElementPolyfillSupport,hs=(o,e)=>o,Zr={toAttribute(o,e){switch(e){case Boolean:o=o?yh:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},vc=(o,e)=>!uh(o,e),Hn={attribute:!0,type:String,converter:Zr,reflect:!1,useDefault:!1,hasChanged:vc};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ft.litPropertyMetadata??(Ft.litPropertyMetadata=new WeakMap);let vi=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Hn){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&fh(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:r}=mh(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:s,set(a){const l=s==null?void 0:s.call(this);r==null||r.call(this,a),this.requestUpdate(e,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Hn}static _$Ei(){if(this.hasOwnProperty(hs("elementProperties")))return;const e=bh(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(hs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(hs("properties"))){const t=this.properties,i=[...gh(t),...vh(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Nn(s))}else e!==void 0&&t.push(Nn(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return ph(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){var r;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const a=(((r=i.converter)==null?void 0:r.toAttribute)!==void 0?i.converter:Zr).toAttribute(t,i.type);this._$Em=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$Em=null}}_$AK(e,t){var r,a;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const l=i.getPropertyOptions(s),d=typeof l.converter=="function"?{fromAttribute:l.converter}:((r=l.converter)==null?void 0:r.fromAttribute)!==void 0?l.converter:Zr;this._$Em=s;const h=d.fromAttribute(t,l.type);this[s]=h??((a=this._$Ej)==null?void 0:a.get(s))??h,this._$Em=null}}requestUpdate(e,t,i,s=!1,r){var a;if(e!==void 0){const l=this.constructor;if(s===!1&&(r=this[e]),i??(i=l.getPropertyOptions(e)),!((i.hasChanged??vc)(r,t)||i.useDefault&&i.reflect&&r===((a=this._$Ej)==null?void 0:a.get(e))&&!this.hasAttribute(l._$Eu(e,i))))return;this.C(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:r},a){i&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,a??t??this[e]),r!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,a]of s){const{wrapped:l}=a,d=this[r];l!==!0||this._$AL.has(r)||d===void 0||this.C(r,void 0,a,d)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var r;return(r=s.hostUpdate)==null?void 0:r.call(s)}),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(t=>this._$ET(t,this[t]))),this._$EM()}updated(e){}firstUpdated(e){}};vi.elementStyles=[],vi.shadowRootOptions={mode:"open"},vi[hs("elementProperties")]=new Map,vi[hs("finalized")]=new Map,er==null||er({ReactiveElement:vi}),(Ft.reactiveElementVersions??(Ft.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ps=globalThis,Vn=o=>o,uo=ps.trustedTypes,Wn=uo?uo.createPolicy("lit-html",{createHTML:o=>o}):void 0,bc="$lit$",At=`lit$${Math.random().toFixed(9).slice(2)}$`,yc="?"+At,wh=`<${yc}>`,ai=document,Cs=()=>ai.createComment(""),Ts=o=>o===null||typeof o!="object"&&typeof o!="function",Ia=Array.isArray,$h=o=>Ia(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",tr=`[ 	
\f\r]`,Gi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,jn=/-->/g,qn=/>/g,It=RegExp(`>|${tr}(?:([^\\s"'>=/]+)(${tr}*=${tr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gn=/'/g,Yn=/"/g,wc=/^(?:script|style|textarea|title)$/i,$c=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),f=$c(1),Y=$c(2),ki=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Qn=new WeakMap,Yt=ai.createTreeWalker(ai,129);function Sc(o,e){if(!Ia(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wn!==void 0?Wn.createHTML(e):e}const Sh=(o,e)=>{const t=o.length-1,i=[];let s,r=e===2?"<svg>":e===3?"<math>":"",a=Gi;for(let l=0;l<t;l++){const d=o[l];let h,p,m=-1,g=0;for(;g<d.length&&(a.lastIndex=g,p=a.exec(d),p!==null);)g=a.lastIndex,a===Gi?p[1]==="!--"?a=jn:p[1]!==void 0?a=qn:p[2]!==void 0?(wc.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=It):p[3]!==void 0&&(a=It):a===It?p[0]===">"?(a=s??Gi,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,h=p[1],a=p[3]===void 0?It:p[3]==='"'?Yn:Gn):a===Yn||a===Gn?a=It:a===jn||a===qn?a=Gi:(a=It,s=void 0);const b=a===It&&o[l+1].startsWith("/>")?" ":"";r+=a===Gi?d+wh:m>=0?(i.push(h),d.slice(0,m)+bc+d.slice(m)+At+b):d+At+(m===-2?l:b)}return[Sc(o,r+(o[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]};let Jr=class xc{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,a=0;const l=e.length-1,d=this.parts,[h,p]=Sh(e,t);if(this.el=xc.createElement(h,i),Yt.currentNode=this.el.content,t===2||t===3){const m=this.el.content.firstChild;m.replaceWith(...m.childNodes)}for(;(s=Yt.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const m of s.getAttributeNames())if(m.endsWith(bc)){const g=p[a++],b=s.getAttribute(m).split(At),$=/([.?@])?(.*)/.exec(g);d.push({type:1,index:r,name:$[2],strings:b,ctor:$[1]==="."?Ch:$[1]==="?"?Th:$[1]==="@"?kh:Mo}),s.removeAttribute(m)}else m.startsWith(At)&&(d.push({type:6,index:r}),s.removeAttribute(m));if(wc.test(s.tagName)){const m=s.textContent.split(At),g=m.length-1;if(g>0){s.textContent=uo?uo.emptyScript:"";for(let b=0;b<g;b++)s.append(m[b],Cs()),Yt.nextNode(),d.push({type:2,index:++r});s.append(m[g],Cs())}}}else if(s.nodeType===8)if(s.data===yc)d.push({type:2,index:r});else{let m=-1;for(;(m=s.data.indexOf(At,m+1))!==-1;)d.push({type:7,index:r}),m+=At.length-1}r++}}static createElement(e,t){const i=ai.createElement("template");return i.innerHTML=e,i}};function _i(o,e,t=o,i){var a,l;if(e===ki)return e;let s=i!==void 0?(a=t._$Co)==null?void 0:a[i]:t._$Cl;const r=Ts(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==r&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),r===void 0?s=void 0:(s=new r(o),s._$AT(o,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=_i(o,s._$AS(o,e.values),s,i)),e}let xh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??ai).importNode(t,!0);Yt.currentNode=s;let r=Yt.nextNode(),a=0,l=0,d=i[0];for(;d!==void 0;){if(a===d.index){let h;d.type===2?h=new Na(r,r.nextSibling,this,e):d.type===1?h=new d.ctor(r,d.name,d.strings,this,e):d.type===6&&(h=new _h(r,this,e)),this._$AV.push(h),d=i[++l]}a!==(d==null?void 0:d.index)&&(r=Yt.nextNode(),a++)}return Yt.currentNode=ai,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},Na=class Cc{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=_i(this,e,t),Ts(e)?e===y||e==null||e===""?(this._$AH!==y&&this._$AR(),this._$AH=y):e!==this._$AH&&e!==ki&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):$h(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==y&&Ts(this._$AH)?this._$AA.nextSibling.data=e:this.T(ai.createTextNode(e)),this._$AH=e}$(e){var r;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=Jr.createElement(Sc(i.h,i.h[0]),this.options)),i);if(((r=this._$AH)==null?void 0:r._$AD)===s)this._$AH.p(t);else{const a=new xh(s,this),l=a.u(this.options);a.p(t),this.T(l),this._$AH=a}}_$AC(e){let t=Qn.get(e.strings);return t===void 0&&Qn.set(e.strings,t=new Jr(e)),t}k(e){Ia(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new Cc(this.O(Cs()),this.O(Cs()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e!==this._$AB;){const s=Vn(e).nextSibling;Vn(e).remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}},Mo=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,r){this.type=1,this._$AH=y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(e,t=this,i,s){const r=this.strings;let a=!1;if(r===void 0)e=_i(this,e,t,0),a=!Ts(e)||e!==this._$AH&&e!==ki,a&&(this._$AH=e);else{const l=e;let d,h;for(e=r[0],d=0;d<r.length-1;d++)h=_i(this,l[i+d],t,d),h===ki&&(h=this._$AH[d]),a||(a=!Ts(h)||h!==this._$AH[d]),h===y?e=y:e!==y&&(e+=(h??"")+r[d+1]),this._$AH[d]=h}a&&!s&&this.j(e)}j(e){e===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Ch=class extends Mo{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===y?void 0:e}},Th=class extends Mo{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==y)}},kh=class extends Mo{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){if((e=_i(this,e,t,0)??y)===ki)return;const i=this._$AH,s=e===y&&i!==y||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==y&&(i===y||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}},_h=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){_i(this,e)}};const ir=ps.litHtmlPolyfillSupport;ir==null||ir(Jr,Na),(ps.litHtmlVersions??(ps.litHtmlVersions=[])).push("3.3.2");const Eh=(o,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const r=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new Na(e.insertBefore(Cs(),r),r,void 0,t??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Jt=globalThis;let W=class extends vi{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Eh(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return ki}};var ac;W._$litElement$=!0,W.finalized=!0,(ac=Jt.litElementHydrateSupport)==null||ac.call(Jt,{LitElement:W});const sr=Jt.litElementPolyfillSupport;sr==null||sr({LitElement:W});(Jt.litElementVersions??(Jt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ah={attribute:!0,type:String,converter:co,reflect:!1,hasChanged:La},Mh=(o=Ah,e,t)=>{const{kind:i,metadata:s}=t;let r=globalThis.litPropertyMetadata.get(s);if(r===void 0&&globalThis.litPropertyMetadata.set(s,r=new Map),i==="setter"&&((o=Object.create(o)).wrapped=!0),r.set(t.name,o),i==="accessor"){const{name:a}=t;return{set(l){const d=e.get.call(this);e.set.call(this,l),this.requestUpdate(a,d,o,!0,l)},init(l){return l!==void 0&&this.C(a,void 0,o,l),l}}}if(i==="setter"){const{name:a}=t;return function(l){const d=this[a];e.call(this,l),this.requestUpdate(a,d,o,!0,l)}}throw Error("Unsupported decorator location: "+i)};function u(o){return(e,t)=>typeof t=="object"?Mh(o,e,t):((i,s,r)=>{const a=s.hasOwnProperty(r);return s.constructor.createProperty(r,i),a?Object.getOwnPropertyDescriptor(s,r):void 0})(o,e,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function I(o){return u({...o,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dh=(o,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(o,e,t),t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Z(o,e){return(t,i,s)=>{const r=a=>{var l;return((l=a.renderRoot)==null?void 0:l.querySelector(o))??null};return Dh(t,i,{get(){return r(this)}})}}class Fh{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(s=>{s.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Fs=o=>(...e)=>({_$litDirective$:o,values:e});let Ps=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const We=Fs(class extends Ps{constructor(o){var e;if(super(o),o.type!==pt.ATTRIBUTE||o.name!=="class"||((e=o.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var i,s;if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!((i=this.nt)!=null&&i.has(r))&&this.st.add(r);return this.render(e)}const t=o.element.classList;for(const r of this.st)r in e||(t.remove(r),this.st.delete(r));for(const r in e){const a=!!e[r];a===this.st.has(r)||(s=this.nt)!=null&&s.has(r)||(a?(t.add(r),this.st.add(r)):(t.remove(r),this.st.delete(r)))}return Ve}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ph=(o,...e)=>({strTag:!0,strings:o,values:e}),ut=Ph,Lh=o=>typeof o!="string"&&"strTag"in o,Oh=(o,e,t)=>{let i=o[0];for(let s=1;s<o.length;s++)i+=e[s-1],i+=o[s];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bh=o=>Lh(o)?Oh(o.strings,o.values):o;let _=Bh;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Rh=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}};/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let o=0;o<256;o++)(o>>4&15).toString(16)+(o&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let zh=new Rh;zh.resolve();/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ks=window,Ua=Ks.ShadowRoot&&(Ks.ShadyCSS===void 0||Ks.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ha=Symbol(),Kn=new WeakMap;let Tc=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Ha)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Ua&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=Kn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Kn.set(t,e))}return e}toString(){return this.cssText}};const Ih=o=>new Tc(typeof o=="string"?o:o+"",void 0,Ha),w=(o,...e)=>{const t=o.length===1?o[0]:e.reduce((i,s,r)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[r+1],o[0]);return new Tc(t,o,Ha)},Nh=(o,e)=>{Ua?o.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),s=Ks.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,o.appendChild(i)})},Xn=Ua?o=>o:o=>o instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ih(t)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var or;const fo=window,Zn=fo.trustedTypes,Uh=Zn?Zn.emptyScript:"",Jn=fo.reactiveElementPolyfillSupport,ea={toAttribute(o,e){switch(e){case Boolean:o=o?Uh:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,e){let t=o;switch(e){case Boolean:t=o!==null;break;case Number:t=o===null?null:Number(o);break;case Object:case Array:try{t=JSON.parse(o)}catch{t=null}}return t}},kc=(o,e)=>e!==o&&(e==e||o==o),rr={attribute:!0,type:String,converter:ea,reflect:!1,hasChanged:kc},ta="finalized";let Ie=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);s!==void 0&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=rr){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||rr}static finalize(){if(this.hasOwnProperty(ta))return!1;this[ta]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of i)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(Xn(s))}else e!==void 0&&t.push(Xn(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Nh(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=rr){var s;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const a=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:ea).toAttribute(t,i.type);this._$El=e,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,r=s._$Ev.get(e);if(r!==void 0&&this._$El!==r){const a=s.getPropertyOptions(r),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:ea;this._$El=r,this[r]=l.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||kc)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,r)=>this[r]=s),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(s=>{var r;return(r=s.hostUpdate)===null||r===void 0?void 0:r.call(s)}),this.update(i)):this._$Ek()}catch(s){throw t=!1,this._$Ek(),s}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Ie[ta]=!0,Ie.elementProperties=new Map,Ie.elementStyles=[],Ie.shadowRootOptions={mode:"open"},Jn==null||Jn({ReactiveElement:Ie}),((or=fo.reactiveElementVersions)!==null&&or!==void 0?or:fo.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ar;const mo=window,Ei=mo.trustedTypes,el=Ei?Ei.createPolicy("lit-html",{createHTML:o=>o}):void 0,ia="$lit$",Mt=`lit$${(Math.random()+"").slice(9)}$`,_c="?"+Mt,Hh=`<${_c}>`,ni=document,ks=()=>ni.createComment(""),_s=o=>o===null||typeof o!="object"&&typeof o!="function",Ec=Array.isArray,Vh=o=>Ec(o)||typeof(o==null?void 0:o[Symbol.iterator])=="function",nr=`[ 	
\f\r]`,Yi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,tl=/-->/g,il=/>/g,Nt=RegExp(`>|${nr}(?:([^\\s"'>=/]+)(${nr}*=${nr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),sl=/'/g,ol=/"/g,Ac=/^(?:script|style|textarea|title)$/i,Mc=o=>(e,...t)=>({_$litType$:o,strings:e,values:t}),L=Mc(1),ei=Mc(2),me=Symbol.for("lit-noChange"),G=Symbol.for("lit-nothing"),rl=new WeakMap,Qt=ni.createTreeWalker(ni,129,null,!1);function Dc(o,e){if(!Array.isArray(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return el!==void 0?el.createHTML(e):e}const Wh=(o,e)=>{const t=o.length-1,i=[];let s,r=e===2?"<svg>":"",a=Yi;for(let l=0;l<t;l++){const d=o[l];let h,p,m=-1,g=0;for(;g<d.length&&(a.lastIndex=g,p=a.exec(d),p!==null);)g=a.lastIndex,a===Yi?p[1]==="!--"?a=tl:p[1]!==void 0?a=il:p[2]!==void 0?(Ac.test(p[2])&&(s=RegExp("</"+p[2],"g")),a=Nt):p[3]!==void 0&&(a=Nt):a===Nt?p[0]===">"?(a=s??Yi,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,h=p[1],a=p[3]===void 0?Nt:p[3]==='"'?ol:sl):a===ol||a===sl?a=Nt:a===tl||a===il?a=Yi:(a=Nt,s=void 0);const b=a===Nt&&o[l+1].startsWith("/>")?" ":"";r+=a===Yi?d+Hh:m>=0?(i.push(h),d.slice(0,m)+ia+d.slice(m)+Mt+b):d+Mt+(m===-2?(i.push(void 0),l):b)}return[Dc(o,r+(o[t]||"<?>")+(e===2?"</svg>":"")),i]};class Es{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,a=0;const l=e.length-1,d=this.parts,[h,p]=Wh(e,t);if(this.el=Es.createElement(h,i),Qt.currentNode=this.el.content,t===2){const m=this.el.content,g=m.firstChild;g.remove(),m.append(...g.childNodes)}for(;(s=Qt.nextNode())!==null&&d.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const m=[];for(const g of s.getAttributeNames())if(g.endsWith(ia)||g.startsWith(Mt)){const b=p[a++];if(m.push(g),b!==void 0){const $=s.getAttribute(b.toLowerCase()+ia).split(Mt),C=/([.?@])?(.*)/.exec(b);d.push({type:1,index:r,name:C[2],strings:$,ctor:C[1]==="."?qh:C[1]==="?"?Yh:C[1]==="@"?Qh:Do})}else d.push({type:6,index:r})}for(const g of m)s.removeAttribute(g)}if(Ac.test(s.tagName)){const m=s.textContent.split(Mt),g=m.length-1;if(g>0){s.textContent=Ei?Ei.emptyScript:"";for(let b=0;b<g;b++)s.append(m[b],ks()),Qt.nextNode(),d.push({type:2,index:++r});s.append(m[g],ks())}}}else if(s.nodeType===8)if(s.data===_c)d.push({type:2,index:r});else{let m=-1;for(;(m=s.data.indexOf(Mt,m+1))!==-1;)d.push({type:7,index:r}),m+=Mt.length-1}r++}}static createElement(e,t){const i=ni.createElement("template");return i.innerHTML=e,i}}function Ai(o,e,t=o,i){var s,r,a,l;if(e===me)return e;let d=i!==void 0?(s=t._$Co)===null||s===void 0?void 0:s[i]:t._$Cl;const h=_s(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==h&&((r=d==null?void 0:d._$AO)===null||r===void 0||r.call(d,!1),h===void 0?d=void 0:(d=new h(o),d._$AT(o,t,i)),i!==void 0?((a=(l=t)._$Co)!==null&&a!==void 0?a:l._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=Ai(o,d._$AS(o,e.values),d,i)),e}let jh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,r=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:ni).importNode(i,!0);Qt.currentNode=r;let a=Qt.nextNode(),l=0,d=0,h=s[0];for(;h!==void 0;){if(l===h.index){let p;h.type===2?p=new Ii(a,a.nextSibling,this,e):h.type===1?p=new h.ctor(a,h.name,h.strings,this,e):h.type===6&&(p=new Kh(a,this,e)),this._$AV.push(p),h=s[++d]}l!==(h==null?void 0:h.index)&&(a=Qt.nextNode(),l++)}return Qt.currentNode=ni,r}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class Ii{constructor(e,t,i,s){var r;this.type=2,this._$AH=G,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=(r=s==null?void 0:s.isConnected)===null||r===void 0||r}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ai(this,e,t),_s(e)?e===G||e==null||e===""?(this._$AH!==G&&this._$AR(),this._$AH=G):e!==this._$AH&&e!==me&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Vh(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==G&&_s(this._$AH)?this._$AA.nextSibling.data=e:this.$(ni.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=Es.createElement(Dc(s.h,s.h[0]),this.options)),s);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===r)this._$AH.v(i);else{const a=new jh(r,this),l=a.u(this.options);a.v(i),this.$(l),this._$AH=a}}_$AC(e){let t=rl.get(e.strings);return t===void 0&&rl.set(e.strings,t=new Es(e)),t}T(e){Ec(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new Ii(this.k(ks()),this.k(ks()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Do{constructor(e,t,i,s,r){this.type=1,this._$AH=G,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=G}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const r=this.strings;let a=!1;if(r===void 0)e=Ai(this,e,t,0),a=!_s(e)||e!==this._$AH&&e!==me,a&&(this._$AH=e);else{const l=e;let d,h;for(e=r[0],d=0;d<r.length-1;d++)h=Ai(this,l[i+d],t,d),h===me&&(h=this._$AH[d]),a||(a=!_s(h)||h!==this._$AH[d]),h===G?e=G:e!==G&&(e+=(h??"")+r[d+1]),this._$AH[d]=h}a&&!s&&this.j(e)}j(e){e===G?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let qh=class extends Do{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===G?void 0:e}};const Gh=Ei?Ei.emptyScript:"";let Yh=class extends Do{constructor(){super(...arguments),this.type=4}j(e){e&&e!==G?this.element.setAttribute(this.name,Gh):this.element.removeAttribute(this.name)}};class Qh extends Do{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=(i=Ai(this,e,t,0))!==null&&i!==void 0?i:G)===me)return;const s=this._$AH,r=e===G&&s!==G||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,a=e!==G&&(s===G||r);r&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Kh{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Ai(this,e)}}const Xh={I:Ii},al=mo.litHtmlPolyfillSupport;al==null||al(Es,Ii),((ar=mo.litHtmlVersions)!==null&&ar!==void 0?ar:mo.litHtmlVersions=[]).push("2.8.0");const et=(o,e,t)=>{var i,s;const r=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let a=r._$litPart$;if(a===void 0){const l=(s=t==null?void 0:t.renderBefore)!==null&&s!==void 0?s:null;r._$litPart$=a=new Ii(e.insertBefore(ks(),l),l,void 0,t??{})}return a._$AI(o),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lr,cr;let us=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};us.finalized=!0,us._$litElement$=!0,(lr=globalThis.litElementHydrateSupport)===null||lr===void 0||lr.call(globalThis,{LitElement:us});const nl=globalThis.litElementPolyfillSupport;nl==null||nl({LitElement:us});((cr=globalThis.litElementVersions)!==null&&cr!==void 0?cr:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ge=o=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(o,e):((t,i)=>{const{kind:s,elements:r}=i;return{kind:s,elements:r,finisher(a){customElements.define(t,a)}}})(o,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zh=(o,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,o)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,o)}},Jh=(o,e,t)=>{e.constructor.createProperty(t,o)};function E(o){return(e,t)=>t!==void 0?Jh(o,e,t):Zh(o,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ve(o){return E({...o,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Va=({finisher:o,descriptor:e})=>(t,i)=>{var s;if(i===void 0){const r=(s=t.originalKey)!==null&&s!==void 0?s:t.key,a=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(t.key)}:{...t,key:r};return o!=null&&(a.finisher=function(l){o(l,r)}),a}{const r=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),o==null||o(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Le(o,e){return Va({descriptor:t=>({get(){var s,r;return(r=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(o))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function e1(o){return Va({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(o))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var dr;const t1=((dr=window.HTMLSlotElement)===null||dr===void 0?void 0:dr.prototype.assignedElements)!=null?(o,e)=>o.assignedElements(e):(o,e)=>o.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE);function Fc(o){const{slot:e,selector:t}=o??{};return Va({descriptor:i=>({get(){var s;const r="slot"+(e?`[name=${e}]`:":not([name])"),a=(s=this.renderRoot)===null||s===void 0?void 0:s.querySelector(r),l=a!=null?t1(a,o):[];return t?l.filter(d=>d.matches(t)):l},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Fo=o=>(...e)=>({_$litDirective$:o,values:e});let Po=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:i1}=Xh,s1=o=>o.strings===void 0,ll=()=>document.createComment(""),Qi=(o,e,t)=>{var i;const s=o._$AA.parentNode,r=e===void 0?o._$AB:e._$AA;if(t===void 0){const a=s.insertBefore(ll(),r),l=s.insertBefore(ll(),r);t=new i1(a,l,o,o.options)}else{const a=t._$AB.nextSibling,l=t._$AM,d=l!==o;if(d){let h;(i=t._$AQ)===null||i===void 0||i.call(t,o),t._$AM=o,t._$AP!==void 0&&(h=o._$AU)!==l._$AU&&t._$AP(h)}if(a!==r||d){let h=t._$AA;for(;h!==a;){const p=h.nextSibling;s.insertBefore(h,r),h=p}}}return t},Ut=(o,e,t=o)=>(o._$AI(e,t),o),o1={},Pc=(o,e=o1)=>o._$AH=e,r1=o=>o._$AH,hr=o=>{var e;(e=o._$AP)===null||e===void 0||e.call(o,!1,!0);let t=o._$AA;const i=o._$AB.nextSibling;for(;t!==i;){const s=t.nextSibling;t.remove(),t=s}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cl=(o,e,t)=>{const i=new Map;for(let s=e;s<=t;s++)i.set(o[s],s);return i},a1=Fo(class extends Po{constructor(o){if(super(o),o.type!==yt.CHILD)throw Error("repeat() can only be used in text expressions")}ct(o,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const s=[],r=[];let a=0;for(const l of o)s[a]=i?i(l,a):a,r[a]=t(l,a),a++;return{values:r,keys:s}}render(o,e,t){return this.ct(o,e,t).values}update(o,[e,t,i]){var s;const r=r1(o),{values:a,keys:l}=this.ct(e,t,i);if(!Array.isArray(r))return this.ut=l,a;const d=(s=this.ut)!==null&&s!==void 0?s:this.ut=[],h=[];let p,m,g=0,b=r.length-1,$=0,C=a.length-1;for(;g<=b&&$<=C;)if(r[g]===null)g++;else if(r[b]===null)b--;else if(d[g]===l[$])h[$]=Ut(r[g],a[$]),g++,$++;else if(d[b]===l[C])h[C]=Ut(r[b],a[C]),b--,C--;else if(d[g]===l[C])h[C]=Ut(r[g],a[C]),Qi(o,h[C+1],r[g]),g++,C--;else if(d[b]===l[$])h[$]=Ut(r[b],a[$]),Qi(o,r[g],r[b]),b--,$++;else if(p===void 0&&(p=cl(l,$,C),m=cl(d,g,b)),p.has(d[g]))if(p.has(d[b])){const M=m.get(l[$]),P=M!==void 0?r[M]:null;if(P===null){const F=Qi(o,r[g]);Ut(F,a[$]),h[$]=F}else h[$]=Ut(P,a[$]),Qi(o,r[g],P),r[M]=null;$++}else hr(r[b]),b--;else hr(r[g]),g++;for(;$<=C;){const M=Qi(o,h[C+1]);Ut(M,a[$]),h[$++]=M}for(;g<=b;){const M=r[g++];M!==null&&hr(M)}return this.ut=l,Pc(o,h),me}});function Hs(o,e,t){return Array.from({length:(e-o)/t+1},(i,s)=>o+s*t)}let St=class extends us{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const s=t.target.dataset.cellIndex;if(!s)return;const r=parseInt(s,10);t.isIntersecting?this.visibleCellIndices.add(r):this.visibleCellIndices.delete(r)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){Hs(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}refreshCell(e){this.removeCell(e),this.bufferRange.includes(e)&&this.renderCellBuffer([e])}refreshAllVisibleCells(){this.bufferRange.forEach(e=>this.removeCell(e)),this.renderCellBuffer(this.bufferRange)}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const s=t?"smooth":"auto";return i.scrollIntoView({behavior:s}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(Hs(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){var e;const t=this.itemCount-1,i=Hs(0,t,1),s=(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:G;return L`
      <section id="container" role="feed" aria-label=${s}>
        <div id="sentinel" aria-hidden="true"></div>
        ${a1(i,r=>r,r=>L`
            <article
              class="cell-container"
              aria-posinset=${r+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${r}
              @click=${a=>this.cellSelected(a,r)}
              @keyup=${a=>{a.key==="Enter"&&this.cellSelected(a,r)}}
            ></article>
          `)}
        <slot name="result-last-tile"></slot>
      </section>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}get bufferRange(){const e=Math.max(10,this.visibleCellIndices.size),t=this.visibleCellIndices.size===0,i=Math.min(...this.visibleCellIndices),s=Math.max(...this.visibleCellIndices),r=t?0:Math.max(i-e,0),a=t?e:Math.min(s+e,this.itemCount-1);return Hs(r,a,1)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),{bufferRange:t}=this;this.renderCellBuffer(t),this.removeCellsOutsideBufferRange(t);const i=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(i)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const s=this.cellContainerForIndex(t);if(!s)return;const r=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(s.style.height="auto",r)et(r,s),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;et(this.placeholderCellTemplate,s),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,et(G,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=w`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=w`var(--infiniteScrollerRowGap, 1.7rem)`,i=w`var(--infiniteScrollerColGap, 1.7rem)`,s=w`var(--infiniteScrollerCellMinWidth, 16rem)`,r=w`var(--infiniteScrollerCellMaxWidth, 1fr)`,a=w`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=w`var(--infiniteScrollerCellMaxHeight, none)`,d=w`var(--infiniteScrollerCellOutline, 0)`;return w`
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
            minmax(${s}, ${r})
          );
        }
      }

      .cell-container {
        outline: ${d};
        min-height: ${a};
        max-height: ${l};
        min-width: ${s};
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
    `}};n([E({type:Number})],St.prototype,"itemCount",void 0);n([E({type:Object})],St.prototype,"cellProvider",void 0);n([E({type:Object})],St.prototype,"placeholderCellTemplate",void 0);n([E({type:Boolean})],St.prototype,"scrollOptimizationsDisabled",void 0);n([E({type:String})],St.prototype,"ariaLandmarkLabel",void 0);n([Le("#sentinel")],St.prototype,"sentinel",void 0);n([e1(".cell-container")],St.prototype,"cellContainers",void 0);St=n([Ge("infinite-scroller")],St);function n1(o){return o==null?void 0:o.replace(/%22%22(?!%22%22)(.+?)%22%22/g,"%22$1%22")}function l1(o){var e,t;return((e=o==null?void 0:o.rawMetadata)==null?void 0:e.hit_type)==="favorited_search"?"search":((t=o.mediatype)==null?void 0:t.value)??"data"}const c1=Y`
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
`,d1=Y`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,h1={"login-required":_("Log in to view this item"),"content-warning":_("Content may be inappropriate")},Lc={"login-required":c1,"content-warning":d1};class go{constructor(e,t="unknown"){c(this,"adIds");c(this,"averageRating");c(this,"captureDates");c(this,"checked");c(this,"collectionIdentifier");c(this,"collectionName");c(this,"collectionFilesCount");c(this,"collections");c(this,"collectionSize");c(this,"commentCount");c(this,"creator");c(this,"creators");c(this,"dateStr");c(this,"dateAdded");c(this,"dateArchived");c(this,"datePublished");c(this,"dateReviewed");c(this,"description");c(this,"factChecks");c(this,"favCount");c(this,"hitRequestSource");c(this,"hitType");c(this,"href");c(this,"identifier");c(this,"isClip");c(this,"issue");c(this,"itemCount");c(this,"mediatype");c(this,"review");c(this,"source");c(this,"snippets");c(this,"subjects");c(this,"thumbnailUrl");c(this,"title");c(this,"tvClipCount");c(this,"viewCount");c(this,"volume");c(this,"weeklyViewCount");c(this,"loginRequired");c(this,"contentWarning");var s,r,a,l,d,h,p,m,g,b,$,C,M,P,F,O,N,K,ue,ke,Oe,Ye,Bt,ce,gt,ae,fe,Qe,li,Ls,Ni;const i=this.getFlags(e);this.adIds=(s=e.ad_id)==null?void 0:s.values,this.averageRating=(r=e.avg_rating)==null?void 0:r.value,this.captureDates=(a=e.capture_dates)==null?void 0:a.values,this.checked=!1,this.collections=((l=e.collection)==null?void 0:l.values)??[],this.collectionFilesCount=((d=e.collection_files_count)==null?void 0:d.value)??0,this.collectionSize=((h=e.collection_size)==null?void 0:h.value)??0,this.commentCount=((p=e.num_reviews)==null?void 0:p.value)??0,this.creator=(m=e.creator)==null?void 0:m.value,this.creators=((g=e.creator)==null?void 0:g.values)??[],this.dateAdded=(b=e.addeddate)==null?void 0:b.value,this.dateArchived=($=e.publicdate)==null?void 0:$.value,this.datePublished=(C=e.date)==null?void 0:C.value,this.dateReviewed=(M=e.reviewdate)==null?void 0:M.value,this.description=(P=e.description)==null?void 0:P.values.join(`
`),this.factChecks=(F=e.factcheck)==null?void 0:F.values,this.favCount=((O=e.num_favorites)==null?void 0:O.value)??0,this.hitRequestSource=t,this.hitType=(N=e.rawMetadata)==null?void 0:N.hit_type,this.href=n1(((K=e.review)==null?void 0:K.__href__)??((ue=e.__href__)==null?void 0:ue.value)),this.identifier=go.cleanIdentifier(e.identifier),this.isClip=(ke=e.is_clip)==null?void 0:ke.value,this.issue=(Oe=e.issue)==null?void 0:Oe.value,this.itemCount=((Ye=e.item_count)==null?void 0:Ye.value)??0,this.mediatype=l1(e),this.review=e.review,this.snippets=((Bt=e.highlight)==null?void 0:Bt.values)??[],this.source=(ce=e.source)==null?void 0:ce.value,this.subjects=((gt=e.subject)==null?void 0:gt.values)??[],this.thumbnailUrl=(ae=e.__img__)==null?void 0:ae.value,this.title=((fe=e.title)==null?void 0:fe.value)??"",this.tvClipCount=((Qe=e.num_clips)==null?void 0:Qe.value)??0,this.volume=(li=e.volume)==null?void 0:li.value,this.viewCount=(Ls=e.downloads)==null?void 0:Ls.value,this.weeklyViewCount=(Ni=e.week)==null?void 0:Ni.value,this.loginRequired=i.loginRequired,this.contentWarning=i.contentWarning}clone(){const e=new go({});return e.adIds=this.adIds,e.averageRating=this.averageRating,e.captureDates=this.captureDates,e.checked=this.checked,e.collections=this.collections,e.collectionFilesCount=this.collectionFilesCount,e.collectionSize=this.collectionSize,e.commentCount=this.commentCount,e.creator=this.creator,e.creators=this.creators,e.dateStr=this.dateStr,e.dateAdded=this.dateAdded,e.dateArchived=this.dateArchived,e.datePublished=this.datePublished,e.dateReviewed=this.dateReviewed,e.description=this.description,e.factChecks=this.factChecks,e.favCount=this.favCount,e.hitRequestSource=this.hitRequestSource,e.hitType=this.hitType,e.href=this.href,e.identifier=this.identifier,e.isClip=this.isClip,e.issue=this.issue,e.itemCount=this.itemCount,e.mediatype=this.mediatype,e.snippets=this.snippets,e.source=this.source,e.subjects=this.subjects,e.thumbnailUrl=this.thumbnailUrl,e.title=this.title,e.tvClipCount=this.tvClipCount,e.volume=this.volume,e.viewCount=this.viewCount,e.weeklyViewCount=this.weeklyViewCount,e.loginRequired=this.loginRequired,e.contentWarning=this.contentWarning,e}get isTvSearchResult(){return this.hitType==="tv_clip"&&this.hitRequestSource==="search_query"}getFlags(e){var i,s,r;const t={loginRequired:!1,contentWarning:!1};if((i=e.collection)!=null&&i.values.length&&((s=e.mediatype)==null?void 0:s.value)!=="collection"){for(const a of((r=e.collection)==null?void 0:r.values)??[])if(a==="loggedin"&&(t.loginRequired=!0,t.contentWarning)||a==="no-preview"&&(t.contentWarning=!0,t.loginRequired))break}return t}static cleanIdentifier(e){const t=(e==null?void 0:e.indexOf("|"))??-1;return t>0?e==null?void 0:e.slice(0,t):e}}var T;(function(o){o.default="default",o.unrecognized="unrecognized",o.relevance="relevance",o.alltimeview="alltimeview",o.weeklyview="weeklyview",o.title="title",o.date="date",o.datearchived="datearchived",o.datereviewed="datereviewed",o.dateadded="dateadded",o.datefavorited="datefavorited",o.creator="creator"})(T||(T={}));const dl=[T.weeklyview,T.alltimeview],hl=[T.datefavorited,T.date,T.datearchived,T.datereviewed,T.dateadded],Ae={[T.default]:{field:T.default,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!1,displayName:"",urlNames:["",null,void 0]},[T.unrecognized]:{field:T.unrecognized,defaultSortDirection:null,canSetDirection:!0,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!0,displayName:"",urlNames:[]},[T.relevance]:{field:T.relevance,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,displayName:"Relevance",urlNames:["_score"]},[T.alltimeview]:{field:T.alltimeview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"downloads",displayName:"All-time views",urlNames:["downloads"]},[T.weeklyview]:{field:T.weeklyview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"week",displayName:"Weekly views",urlNames:["week"]},[T.title]:{field:T.title,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"titleSorter",displayName:"Title",urlNames:["title","titleSorter"]},[T.date]:{field:T.date,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"date",displayName:"Date published",urlNames:["date"]},[T.datearchived]:{field:T.datearchived,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"publicdate",displayName:"Date archived",urlNames:["publicdate"]},[T.datereviewed]:{field:T.datereviewed,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"reviewdate",displayName:"Date reviewed",urlNames:["reviewdate"]},[T.dateadded]:{field:T.dateadded,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"addeddate",displayName:"Date added",urlNames:["addeddate"]},[T.datefavorited]:{field:T.datefavorited,defaultSortDirection:"desc",canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,searchServiceKey:"favoritedate",displayName:"Date favorited",urlNames:["favoritedate"]},[T.creator]:{field:T.creator,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"creatorSorter",displayName:"Creator",urlNames:["creator","creatorSorter"]}};function Oc(o){return Object.values(Ae).find(e=>e.urlNames.some(t=>o===t))??Ae[T.unrecognized]}const Lo={[T.relevance]:!0,[T.weeklyview]:!0,[T.alltimeview]:!0,[T.title]:!0,[T.datefavorited]:!1,[T.date]:!0,[T.datearchived]:!0,[T.datereviewed]:!0,[T.dateadded]:!0,[T.creator]:!0,[T.default]:!1,[T.unrecognized]:!1},p1={...Lo,[T.datefavorited]:!0},u1={...Lo,[T.date]:!1,[T.datereviewed]:!1,[T.dateadded]:!1},f1={uploads:T.datearchived,reviews:T.datereviewed,collections:T.datearchived,web_archives:T.datearchived},m1={title:"firstTitle",creator:"firstCreator"},$t=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{},clip_type:{},program:{},person:{},sponsor:{}}),g1={only_commercials:"commercial",only_factchecks:"fact check",only_quotes:"quote"},Bc=["mediatype","year","subject","collection","creator","language"],v1=["program","creator","year","subject","person","language","clip_type"],vo={subject:"Subject",lending:"Availability",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year",clip_type:"Clip Type",program:"Program",person:"Person",sponsor:"Sponsor"},fs={subject:q.COUNT,lending:q.COUNT,mediatype:q.COUNT,language:q.COUNT,creator:q.COUNT,collection:q.COUNT,year:q.NUMERIC,clip_type:q.COUNT,program:q.COUNT,person:q.COUNT,sponsor:q.COUNT},b1={subject:q.ALPHABETICAL,lending:q.ALPHABETICAL,mediatype:q.ALPHABETICAL,language:q.ALPHABETICAL,creator:q.ALPHABETICAL,collection:q.ALPHABETICAL,year:q.NUMERIC,clip_type:q.ALPHABETICAL,program:q.ALPHABETICAL,person:q.ALPHABETICAL,sponsor:q.ALPHABETICAL},y1={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},pl={is_lendable:"Lending Library",available_to_borrow:"Borrow 14 Days",is_readable:"Always Available"},Oo={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0};/*! typescript-cookie v1.0.6 | MIT */const Rc=o=>encodeURIComponent(o).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),zc=o=>encodeURIComponent(o).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),Wa=decodeURIComponent,ja=o=>(o[0]==='"'&&(o=o.slice(1,-1)),o.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function w1(o){return o=Object.assign({},o),typeof o.expires=="number"&&(o.expires=new Date(Date.now()+o.expires*864e5)),o.expires!=null&&(o.expires=o.expires.toUTCString()),Object.entries(o).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function Ic(o,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,s={};let r;for(;(r=i.exec(document.cookie))!=null;)try{const a=t(r[1]);if(s[a]=e(r[2],a),o===a)break}catch{}return o!=null?s[o]:s}const ul=Object.freeze({decodeName:Wa,decodeValue:ja,encodeName:Rc,encodeValue:zc}),qa=Object.freeze({path:"/"});function bo(o,e,t=qa,{encodeValue:i=zc,encodeName:s=Rc}={}){return document.cookie=`${s(o)}=${i(e,o)}${w1(t)}`}function sa(o,{decodeValue:e=ja,decodeName:t=Wa}={}){return Ic(o,e,t)}function $1({decodeValue:o=ja,decodeName:e=Wa}={}){return Ic(void 0,o,e)}function S1(o,e=qa){bo(o,"",Object.assign({},e,{expires:-1}))}function oa(o,e){const t={set:function(s,r,a){return bo(s,r,Object.assign({},this.attributes,a),{encodeValue:this.converter.write})},get:function(s){if(arguments.length===0)return $1(this.converter.read);if(s!=null)return sa(s,this.converter.read)},remove:function(s,r){S1(s,Object.assign({},this.attributes,r))},withAttributes:function(s){return oa(this.converter,Object.assign({},this.attributes,s))},withConverter:function(s){return oa(Object.assign({},this.converter,s),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(o)}};return Object.create(t,i)}oa({read:ul.decodeValue,write:ul.encodeValue},qa);function x1(o,e){return o===e?!0:o.length!==e.length?!1:o.every((t,i)=>t===e[i])}class C1{constructor(e){c(this,"context");c(this,"cookieDomain",".archive.org");c(this,"cookieExpiration",30);c(this,"cookiePath","/");this.context=e.context}persistState(e,t={}){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e,t)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";bo(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";bo(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=sa(`view-${this.context}`),t=sa(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e,t={}){var p,m,g,b;const i=new URL(window.location.href),s=new URLSearchParams(i.searchParams),r=this.removeRecognizedParams(i.searchParams);let a=!1;switch(e.baseQuery&&r.set("query",e.baseQuery),e.searchType){case U.FULLTEXT:r.set("sin","TXT");break;case U.RADIO:r.set("sin","RADIO");break;case U.TV:r.set("sin","TV");break;case U.METADATA:(t.persistMetadataSearchType||s.get("sin")==="MD")&&r.set("sin","MD");break}if(s.get("sin")===""&&(s.delete("sin"),a=!0),e.currentPage&&(e.currentPage>1?r.set("page",e.currentPage.toString()):r.delete("page")),e.selectedSort){const $=Ae[e.selectedSort];let C=this.sortDirectionPrefix(e.sortDirection);const M=e.searchType===U.TV&&e.selectedSort===T.relevance;if($.field===T.unrecognized){const P=s.get("sort")??"",{field:F,direction:O}=this.getSortFieldAndDirection(P);e.sortDirection||(C=this.sortDirectionPrefix(O)),F?r.set("sort",`${C}${F}`):r.set("sort",P)}else if($.shownInURL||M){const P=$.urlNames[0];r.set("sort",`${C}${P}`)}}if(e.selectedFacets)for(const[$,C]of Object.entries(e.selectedFacets)){const M=Object.entries(C);if(M.length!==0)for(const[P,F]of M){const O=F.state==="hidden",N=`${$}:"${P}"`;O?r.append("not[]",N):r.append("and[]",N)}}const l=(p=e.minSelectedDate)!=null&&p.includes("-")||(m=e.maxSelectedDate)!=null&&m.includes("-")?"date":"year";e.minSelectedDate&&e.maxSelectedDate&&r.append("and[]",`${l}:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&r.append("and[]",e.titleQuery),e.creatorQuery&&r.append("and[]",e.creatorQuery);let d=t.forceReplace?"replaceState":"pushState";const h=this.paramsMatch(s,r,["sin","sort","and[]","not[]","only_commercials","only_factchecks","only_quotes"]);if(h&&this.paramsMatch(s,r,["query"])){if(a)r.delete("sin");else if(this.paramsMatch(s,r,["page"]))return;d="replaceState"}else h&&this.hasLegacyParam(s)&&(d="replaceState");(b=(g=window.history)[d])==null||b.call(g,{query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:{field:e.selectedSort,direction:e.sortDirection},minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},"",i)}loadQueryStateFromUrl(){const e=new URL(window.location.href),t=e.searchParams.get("sin"),i=e.searchParams.get("page"),s=e.searchParams.get("query"),r=e.searchParams.get("sort"),a=e.searchParams.getAll("and[]"),l=e.searchParams.getAll("not[]");for(const[p,m]of e.searchParams.entries())/and\[\d+\]/.test(p)?a.push(m):/not\[\d+\]/.test(p)&&l.push(m);const d=e.searchParams.get("q")??e.searchParams.get("search"),h={selectedFacets:$t()};switch(s?h.baseQuery=s:d&&(h.baseQuery=d),t){case"TXT":h.searchType=U.FULLTEXT;break;case"RADIO":h.searchType=U.RADIO;break;case"TV":h.searchType=U.TV;break;case"MD":h.searchType=U.METADATA;break;default:h.searchType=U.DEFAULT;break}if(i){const p=parseInt(i,10);h.currentPage=p}else h.currentPage=1;if(r){const{field:p,direction:m}=this.getSortFieldAndDirection(r),g=Oc(p);h.selectedSort=g.field,["asc","desc"].includes(m)&&(h.sortDirection=m)}a&&a.forEach(p=>{let[m,g]=p.split(":");if(m=m.replace(/Sorter$/,""),m.startsWith("-")){l.push(p.slice(1));return}switch(m){case"date":case"year":{const[b,$]=g.split(" TO ");b&&$?(h.minSelectedDate=b.substring(1,b.length),h.maxSelectedDate=$.substring(0,$.length-1)):this.setSelectedFacetState(h.selectedFacets,m,g,"selected");break}case"firstTitle":h.selectedTitleFilter=g;break;case"firstCreator":h.selectedCreatorFilter=g;break;default:this.setSelectedFacetState(h.selectedFacets,m,g,"selected")}}),l&&l.forEach(p=>{const[m,g]=p.split(":");this.setSelectedFacetState(h.selectedFacets,m,g,"hidden")});for(const[p,m]of Object.entries(g1))if(e.searchParams.get(p)){this.setSelectedFacetState(h.selectedFacets,"clip_type",m,"selected");break}return h}getSortFieldAndDirection(e){const t=e.indexOf(" ")>-1;let i,s;return t?[i,s]=e.split(" "):(i=e.startsWith("-")?e.slice(1):e,s=e.startsWith("-")?"desc":"asc"),{field:i,direction:s}}sortDirectionPrefix(e){return e==="desc"?"-":""}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}paramsMatch(e,t,i){return i.every(s=>x1(e.getAll(s).sort(),t.getAll(s).sort()))}removeRecognizedParams(e){e.delete("query"),e.delete("sin"),e.delete("page"),e.delete("sort"),e.delete("and[]"),e.delete("not[]");for(const t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete("q"),e.delete("search"),e.delete("only_commercials"),e.delete("only_factchecks"),e.delete("only_quotes"),e}hasLegacyParam(e){return e.has("q")||e.has("search")}setSelectedFacetState(e,t,i,s){const r=e[t];if(!r)return;const a=this.stripQuotes(i);r[a]??(r[a]=this.getDefaultBucket(i)),r[a].state=s}getDefaultBucket(e){return{key:e,count:0,state:"none"}}}const ra=["forum_posts","lending","web_archives"],T1=new TextEncoder;async function Nc(o){const e=await crypto.subtle.digest("SHA-1",T1.encode(o));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const Ze=window.location&&(window.location.hostname==="localhost"||window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||window.location.host.match(/\.code\.archive\.org$/)||window.location.host.match(/\.dev\.archive\.org$/)||window.location.host.match(/^ia-petabox-/)||window.location.host.match(/^local\.archive\.org/)||window.location.host.match(/^internetarchive\.github\.io$/))?console.log.bind(console):()=>{};function aa(o,e){if(o)for(const[t,i]of Object.entries(o))for(const[s,r]of Object.entries(i))e(t,s,r,o)}function Kt(o,e,t,i=!1){var a;const s=o??$t(),r={...s,[e]:{...s[e],[t.key]:t}};return i&&t.state==="none"&&((a=r[e])==null||delete a[t.key]),r}function k1(o){const e=$t();return aa(o,(t,i,s)=>{e[t]||(e[t]={}),e[t][i]=s}),e}function Uc(o,e){const t=k1(o);return aa(e,(i,s,r)=>{t[i]||(t[i]={}),t[i][s]=r}),aa(t,(i,s,r)=>{var a;r.state==="none"&&((a=t[i])==null||delete a[s])}),t}const fl=["selected","hidden","none"];function Hc(o,e=q.COUNT){return o.sort((t,i)=>{const s=fl.indexOf(t.state),r=fl.indexOf(i.state),a=s-r;let l;return e===q.ALPHABETICAL?l=t.key.localeCompare(i.key):e===q.NUMERIC?l=Number(i.key)-Number(t.key):l=i.count-t.count,a||l})}class _1{constructor(e,t=50){c(this,"host");c(this,"pageSize");c(this,"pages",{});c(this,"offset",0);c(this,"numTileModels",0);c(this,"numInitialPages",2);c(this,"fetchesInProgress",new Set);c(this,"previousQueryKey","");c(this,"searchResultsLoading",!1);c(this,"facetsLoading",!1);c(this,"facetsReadyToLoad",!1);c(this,"suppressFetches",!1);c(this,"totalResults",0);c(this,"endOfDataReached",!1);c(this,"queryInitialized",!1);c(this,"aggregations");c(this,"histogramAggregation");c(this,"collectionTitles",new Map);c(this,"tvChannelMaps",{});c(this,"tvChannelAliases",new Map);c(this,"collectionExtraInfo");c(this,"accountExtraInfo");c(this,"sessionContext");c(this,"pageElements");c(this,"parentCollections",[]);c(this,"prefixFilterCountMap",{});c(this,"queryErrorMessage");c(this,"_tvMapsPromise");c(this,"_initialSearchCompletePromise",Promise.resolve(!0));c(this,"checkAllTiles",()=>{this.map(e=>{const t=e.clone();return t.checked=!0,t})});c(this,"uncheckAllTiles",()=>{this.map(e=>{const t=e.clone();return t.checked=!1,t})});c(this,"removeCheckedTiles",()=>{const{checkedTileModels:e,uncheckedTileModels:t}=this,i=e.length;if(i===0)return;this.offset+=i;const s={};let r=Math.floor(this.offset/this.pageSize)+1,a=this.offset%this.pageSize;for(let l=1;l<=r;l+=1){const d=this.offset-this.pageSize*(l-1),h=Math.min(this.pageSize,d);s[l]=Array(h).fill(void 0)}for(const l of t)s[r]||(s[r]=[]),s[r].push(l),a+=1,a>=this.pageSize&&(r+=1,a=0);this.pages=s,this.numTileModels-=i,this.totalResults-=i,this.host.setTileCount(this.size),this.host.setTotalResultCount(this.totalResults),this.requestHostUpdate(),this.refreshVisibleResults()});this.host=e,this.pageSize=t}get initialSearchComplete(){return this._initialSearchCompletePromise}hostConnected(){this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading)}hostUpdate(){if(!this.activeOnHost||(this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading),!this.host.searchService)||!(this.pageFetchQueryKey!==this.previousQueryKey))return;const t=!this.host.baseQuery;(this.canPerformSearch||t)&&(this.activeOnHost&&this.host.emitQueryStateChanged(),this.handleQueryChange())}get activeOnHost(){return this.host.dataSource===this}get size(){return this.numTileModels}reset(){Ze("Resetting CB data source"),this.pages={},this.aggregations={},this.histogramAggregation=void 0,this.pageElements=void 0,this.parentCollections=[],this.previousQueryKey="",this.queryErrorMessage=void 0,this.offset=0,this.numTileModels=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.facetsLoading=!1,this.fetchesInProgress.clear(),this.setTotalResultCount(0),this.requestHostUpdate()}resetPages(){Object.keys(this.pages).length<this.host.maxPagesToManage&&(this.pages={},this.fetchesInProgress.forEach(e=>{e.startsWith("facets-")||this.fetchesInProgress.delete(e)}),this.requestHostUpdate())}addPage(e,t){this.pages[e]=t,this.numTileModels+=t.length,this.requestHostUpdate()}addMultiplePages(e,t){const i=Math.ceil(t.length/this.pageSize);for(let a=0;a<i;a+=1){const l=this.pageSize*a;this.addPage(e+a,t.slice(l,l+this.pageSize))}this.host.currentVisiblePageNumbers.some(a=>a>=e&&a<=e+i)&&this.refreshVisibleResults()}getPage(e){return this.pages[e]}getAllPages(){return this.pages}hasPage(e){return!!this.pages[e]}getTileModelAt(e){var l,d;const t=e+this.offset,i=Math.floor(t/this.pageSize)+1,s=t%this.pageSize;let r=1,a=0;for(;a<=t;){if(!this.pages[r])return(l=this.pages[i])==null?void 0:l[s];if(a+this.pages[r].length>t)return this.pages[r][t-a];a+=this.pages[r].length,r+=1}return(d=this.pages[i])==null?void 0:d[s]}indexOf(e){return Object.values(this.pages).flat().indexOf(e)-this.offset}getPageSize(){return this.pageSize}setPageSize(e){this.reset(),this.pageSize=e}setNumInitialPages(e){this.numInitialPages=e}setTotalResultCount(e){this.totalResults=e,this.activeOnHost&&this.host.setTotalResultCount(e)}setFetchesSuppressed(e){this.suppressFetches=e}setEndOfDataReached(e){this.endOfDataReached=e}async handleQueryChange(){if(this.suppressFetches)return;this.reset();let e;this._initialSearchCompletePromise=new Promise(t=>{e=t}),this.queryInitialized=!0,await Promise.all([this.doInitialPageFetch(),this.canFetchFacets?this.fetchFacets():null]),e(!0)}async handleFacetReadinessChange(e){const t=!this.facetsReadyToLoad&&e;this.facetsReadyToLoad=e,t&&this.canFetchFacets&&this.fetchFacets()}get canFetchFacets(){if(this.host.facetLoadStrategy==="off"||ra.includes(this.host.profileElement)||this.host.facetLoadStrategy!=="eager"&&!this.facetsReadyToLoad)return!1;const e=Object.keys(this.aggregations??{}).length>0;return!(this.facetsLoading||e)}map(e){Object.keys(this.pages).length&&(this.pages=Object.fromEntries(Object.entries(this.pages).map(([t,i])=>[t,i.map((s,r,a)=>s&&e(s,r,a))])),this.requestHostUpdate(),this.refreshVisibleResults())}get checkedTileModels(){return this.getFilteredTileModels(e=>e.checked)}get uncheckedTileModels(){return this.getFilteredTileModels(e=>!e.checked)}getFilteredTileModels(e){return Object.values(this.pages).flat().filter((t,i,s)=>t?e(t,i,s):!1)}get canPerformSearch(){var g,b;if(!this.host.searchService)return!1;const t=!!((g=this.host.baseQuery)==null?void 0:g.trim()),i=!!((b=this.host.identifiers)!=null&&b.length),s=!!this.host.withinCollection,r=!!this.host.withinProfile,a=!!this.host.profileElement,l=this.host.searchType===U.DEFAULT,d=this.host.searchType===U.METADATA,h=this.host.searchType===U.TV;return t||i||s&&(l||d||h)||r&&(a&&(l||d))}setSearchResultsLoading(e){this.searchResultsLoading=e,this.activeOnHost&&this.host.setSearchResultsLoading(e)}setFacetsLoading(e){this.facetsLoading=e,this.activeOnHost&&this.host.setFacetsLoading(e)}requestHostUpdate(){this.activeOnHost&&this.host.requestUpdate()}refreshVisibleResults(){this.activeOnHost&&this.host.refreshVisibleResults()}get pageFetchQueryKey(){const e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e,i=this.host.selectedSort??"none",s=this.host.sortDirection??"none";return`fq:${this.fullQuery}-pt:${t}-st:${this.host.searchType}-sf:${i}-sd:${s}`}get facetFetchQueryKey(){const e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e;return`facets-fq:${this.fullQuery}-pt:${t}-st:${this.host.searchType}`}get filterMap(){const e=new jd,{minSelectedDate:t,maxSelectedDate:i,selectedFacets:s,internalFilters:r,selectedTitleFilter:a,selectedCreatorFilter:l}=this.host,d=this.host.searchType===U.TV?"date":"year";t&&e.addFilter(d,t,Tt.GREATER_OR_EQUAL),i&&e.addFilter(d,i,Tt.LESS_OR_EQUAL);const h=Uc(r,s);if(h)for(const[m,g]of Object.entries(h)){const{name:b,values:$}=this.prepareFacetForFetch(m,g);for(const[C,M]of Object.entries($)){let P;M.state==="selected"?P=Tt.INCLUDE:M.state==="hidden"&&(P=Tt.EXCLUDE),P&&e.addFilter(b,C,P)}}return a&&e.addFilter("firstTitle",a,Tt.INCLUDE),l&&e.addFilter("firstCreator",l,Tt.INCLUDE),e.build()}async requestUID(e,t){const i=JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.host.searchType}),s=(await Nc(i)).slice(0,20),r=(await this.host.getSessionId()).slice(0,20),a=e.page??0,l=t.charAt(0),d=Date.now();return`R:${s}-S:${r}-P:${a}-K:${l}-T:${d}`}get pageSpecifierParams(){var e;return(e=this.host.identifiers)!=null&&e.length?{pageType:"client_document_fetch"}:this.host.withinCollection?{pageType:"collection_details",pageTarget:this.host.withinCollection}:this.host.withinProfile?{pageType:"account_details",pageTarget:this.host.withinProfile,pageElements:this.host.profileElement?[this.host.profileElement]:[]}:null}get fullQuery(){var a;const e=[],t=(a=this.host.baseQuery)==null?void 0:a.trim();t&&e.push(t),this.host.identifiers&&e.push(`identifier:(${this.host.identifiers.join(" OR ")})`);const{facetQuery:i,dateRangeQueryClause:s,sortFilterQueries:r}=this;return i&&e.push(i),s&&e.push(s),r&&e.push(r),e.join(" AND ").trim()}get facetQuery(){var t;if(!this.host.selectedFacets)return;const e=[];for(const[i,s]of Object.entries(this.host.selectedFacets))e.push(this.buildFacetClause(i,s));return(t=this.joinFacetClauses(e))==null?void 0:t.trim()}get dateRangeQueryClause(){if(!(!this.host.minSelectedDate||!this.host.maxSelectedDate))return`year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get titleQuery(){return this.host.selectedTitleFilter?`firstTitle:${this.host.selectedTitleFilter}`:void 0}get creatorQuery(){return this.host.selectedCreatorFilter?`firstCreator:${this.host.selectedCreatorFilter}`:void 0}buildFacetClause(e,t){const{name:i,values:s}=this.prepareFacetForFetch(e,t),r=Object.entries(s);if(r.length===0)return"";const a=[];for(const[d,h]of r){const p=h.state==="hidden"?"-":"";a.push(`${p}"${d}"`)}const l=a.join(" OR ");return`${i}:(${l})`}prepareFacetForFetch(e,t){let[i,s]=[e,t];return e==="lending"&&(i="lending___status"),{name:i,values:s}}joinFacetClauses(e){const t=e.filter(i=>i.length>0);return t.length>0?`(${t.join(" AND ")})`:void 0}async fetchFacets(){var m,g,b,$,C,M,P;const e=(m=this.host.baseQuery)==null?void 0:m.trim();if(!this.canPerformSearch)return;const{facetFetchQueryKey:t}=this;if(this.fetchesInProgress.has(t))return;this.fetchesInProgress.add(t),this.setFacetsLoading(!0);const i=this.host.sortParam?[this.host.sortParam]:[],s={...this.pageSpecifierParams,query:e||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregationsSize:10};s.uid=await this.requestUID({...s,sort:i},"aggregations");const r=await((g=this.host.searchService)==null?void 0:g.search(s,this.host.searchType)),a=r==null?void 0:r.success,l=!this.fetchesInProgress.has(t);if(this.fetchesInProgress.delete(t),l)return;if(!a){const F=(b=r==null?void 0:r.error)==null?void 0:b.message,O=(C=($=r==null?void 0:r.error)==null?void 0:$.details)==null?void 0:C.message;!F&&!O&&((P=(M=window==null?void 0:window.Sentry)==null?void 0:M.captureMessage)==null||P.call(M,"Missing or malformed facet response from backend","error")),this.setFacetsLoading(!1);return}const{aggregations:d,collectionTitles:h,tvChannelAliases:p}=a.response;if(this.aggregations=d,this.histogramAggregation=this.host.searchType===U.TV?d==null?void 0:d.date_histogram:d==null?void 0:d.year_histogram,h)for(const[F,O]of Object.entries(h))this.collectionTitles.set(F,O);if(p)for(const[F,O]of Object.entries(p))this.tvChannelAliases.set(F,O);this.setFacetsLoading(!1),this.requestHostUpdate()}async doInitialPageFetch(){this.setSearchResultsLoading(!0),await this.fetchPage(this.host.initialPageNumber,this.numInitialPages)}async fetchPage(e,t=1){var F,O,N,K,ue,ke,Oe,Ye,Bt,ce,gt;const i=(F=this.host.baseQuery)==null?void 0:F.trim();if(!this.canPerformSearch){this.setSearchResultsLoading(!1);return}if(this.hasPage(e)||this.endOfDataReached)return;let s=e===1?t:1;const r=this.pageSize*s,{pageFetchQueryKey:a}=this,l=`${a}-p:${e}`;if(this.fetchesInProgress.has(l))return;for(let ae=0;ae<s;ae+=1)this.fetchesInProgress.add(`${a}-p:${e+ae}`);this.previousQueryKey=a;const{withinCollection:d,withinProfile:h}=this.host;let p=this.host.sortParam?[this.host.sortParam]:[];if(h&&this.host.selectedSort===T.default&&this.host.defaultSortField){const ae=Ae[this.host.defaultSortField];ae.searchServiceKey&&(p=[{field:ae.searchServiceKey,direction:"desc"}])}const g={...this.pageSpecifierParams,query:i||"",identifiers:this.host.identifiers,page:e,rows:r,sort:p,filters:this.filterMap,aggregations:{omit:!0}};g.uid=await this.requestUID(g,"hits");const b=await((O=this.host.searchService)==null?void 0:O.search(g,this.host.searchType)),$=b==null?void 0:b.success;if(!this.fetchesInProgress.has(l))return;for(let ae=0;ae<s;ae+=1)this.fetchesInProgress.delete(`${a}-p:${e+ae}`);if(!$){const ae=(N=b==null?void 0:b.error)==null?void 0:N.message,fe=(ue=(K=b==null?void 0:b.error)==null?void 0:K.details)==null?void 0:ue.message;this.queryErrorMessage=`${ae??""}${fe?`; ${fe}`:""}`,this.queryErrorMessage||(this.queryErrorMessage="Missing or malformed response from backend",(Oe=(ke=window==null?void 0:window.Sentry)==null?void 0:ke.captureMessage)==null||Oe.call(ke,this.queryErrorMessage,"error")),this.setSearchResultsLoading(!1),this.requestHostUpdate(),this.host.emitSearchError();return}this.setTotalResultCount($.response.totalResults-this.offset),this.activeOnHost&&this.totalResults===0&&this.host.emitEmptyResults(),this.sessionContext=$.sessionContext,d?(this.collectionExtraInfo=$.response.collectionExtraInfo,this.activeOnHost&&this.host.applyDefaultCollectionSort(this.collectionExtraInfo),this.collectionExtraInfo&&(this.parentCollections=[].concat(((Ye=this.collectionExtraInfo.public_metadata)==null?void 0:Ye.collection)??[]),this.host.isTVCollection=((Bt=this.host.withinCollection)==null?void 0:Bt.startsWith("TV-"))||this.host.withinCollection==="tvnews"||this.host.withinCollection==="tvarchive"||this.parentCollections.includes("tvnews")||this.parentCollections.includes("tvarchive"))):h&&(this.accountExtraInfo=$.response.accountExtraInfo,this.pageElements=$.response.pageElements);const{results:C,collectionTitles:M,tvChannelAliases:P}=$.response;if(C&&C.length>0){if(M){for(const[Qe,li]of Object.entries(M))this.collectionTitles.set(Qe,li);const fe=(gt=(ce=this.collectionExtraInfo)==null?void 0:ce.public_metadata)==null?void 0:gt.title;d&&fe&&this.collectionTitles.set(d,fe)}if(P)for(const[fe,Qe]of Object.entries(P))this.tvChannelAliases.set(fe,Qe);const ae=["lending","web_archives"].includes(this.host.profileElement);ae&&(s=Math.ceil(C.length/this.pageSize),this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.totalResults));for(let fe=0;fe<s;fe+=1){const Qe=this.pageSize*fe;this.addFetchedResultsToDataSource(e+fe,C.slice(Qe,Qe+this.pageSize),!ae||fe===s-1)}}(this.size>=this.totalResults||C.length===0)&&(this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.size)),this.setSearchResultsLoading(!1),this.requestHostUpdate()}get hitRequestSource(){const{host:e}=this;return e.baseQuery?"search_query":e.withinProfile?"profile_tab":e.withinCollection?"collection_members":"unknown"}addFetchedResultsToDataSource(e,t,i=!0){const s=[],r=this.hitRequestSource;t==null||t.forEach(a=>{a.identifier&&s.push(new go(a,r))}),this.addPage(e,s),i&&this.refreshVisibleResults()}async fetchPrefixFilterBuckets(e){var l,d,h,p,m,g;const t=(l=this.host.baseQuery)==null?void 0:l.trim();if(!this.canPerformSearch)return[];const i=m1[e],s=this.host.sortParam?[this.host.sortParam]:[],r={...this.pageSpecifierParams,query:t||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregations:{simpleParams:[i]},aggregationsSize:26};r.uid=await this.requestUID({...r,sort:s},"aggregations");const a=await((d=this.host.searchService)==null?void 0:d.search(r,this.host.searchType));return((g=(m=(p=(h=a==null?void 0:a.success)==null?void 0:h.response)==null?void 0:p.aggregations)==null?void 0:m[i])==null?void 0:g.buckets)??[]}async updatePrefixFilterCounts(e){const{facetFetchQueryKey:t}=this,i=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap={...this.prefixFilterCountMap},this.prefixFilterCountMap[e]=i.reduce((r,a)=>(r[a.key.toUpperCase()]=a.doc_count,r),{}),this.requestHostUpdate())}async updatePrefixFiltersForCurrentSort(){if(["title","creator"].includes(this.host.selectedSort)){const e=this.host.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort(),this.requestHostUpdate()}populateTVChannelMaps(){return this._tvMapsPromise||(this._tvMapsPromise=this._fetchTVChannelMaps()),this._tvMapsPromise}async _fetchTVChannelMaps(){const e="https://av.archive.org/etc",t=new Date().toISOString().slice(0,10),i=fetch(`${e}/chan2network.json?date=${t}`),s=fetch(`${e}/program2chans.json?date=${t}`),[r,a]=await Promise.all([i,s]);return this.tvChannelMaps.channelToNetwork=new Map(Object.entries(await r.json())),this.tvChannelMaps.programToChannels=new Map(Object.entries(await a.json())),this.requestHostUpdate(),this.tvChannelMaps}}var ft;(function(o){o.default="collection-browser"})(ft||(ft={}));var oe;(function(o){o.sortBy="sortBy",o.filterByCreator="filterByCreator",o.filterByTitle="filterByTitle",o.displayMode="displayMode",o.loadDesktopView="loadDesktopView",o.loadMobileView="loadMobileView",o.facetSelected="facetSelected",o.facetDeselected="facetDeselected",o.facetNegativeSelected="facetNegativeSelected",o.facetNegativeDeselected="facetNegativeDeselected",o.mobileFacetsToggled="mobileFacetsToggled",o.partOfCollectionClicked="partOfCollectionClicked",o.histogramChanged="histogramChanged",o.histogramChangedFromModal="histogramChangedFromModal",o.histogramExpanded="histogramExpanded",o.resultSelected="resultSelected",o.moreFacetsPageChange="moreFacetsPageChange",o.showMoreFacetsModal="showMoreFacetsModal",o.closeMoreFacetsModal="closeMoreFacetsModal",o.applyMoreFacetsModal="applyMoreFacetsModal"})(oe||(oe={}));const na=Y`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`,lt=x`
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
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re=o=>o??se;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:E1}=dh,ml=o=>o,Vc=o=>o.strings===void 0,gl=()=>document.createComment(""),Ki=(o,e,t)=>{var r;const i=o._$AA.parentNode,s=e===void 0?o._$AB:e._$AA;if(t===void 0){const a=i.insertBefore(gl(),s),l=i.insertBefore(gl(),s);t=new E1(a,l,o,o.options)}else{const a=t._$AB.nextSibling,l=t._$AM,d=l!==o;if(d){let h;(r=t._$AQ)==null||r.call(t,o),t._$AM=o,t._$AP!==void 0&&(h=o._$AU)!==l._$AU&&t._$AP(h)}if(a!==s||d){let h=t._$AA;for(;h!==a;){const p=ml(h).nextSibling;ml(i).insertBefore(h,s),h=p}}}return t},Ht=(o,e,t=o)=>(o._$AI(e,t),o),A1={},Wc=(o,e=A1)=>o._$AH=e,M1=o=>o._$AH,pr=o=>{o._$AR(),o._$AA.remove()};/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D1=Fs(class extends Ps{constructor(o){if(super(o),o.type!==pt.PROPERTY&&o.type!==pt.ATTRIBUTE&&o.type!==pt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Vc(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===Ve||e===se)return e;const t=o.element,i=o.name;if(o.type===pt.PROPERTY){if(e===t[i])return Ve}else if(o.type===pt.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return Ve}else if(o.type===pt.ATTRIBUTE&&t.getAttribute(i)===e+"")return Ve;return Wc(o),e}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Xs(o,e,t){return o?e(o):t==null?void 0:t(o)}function F1(o,e){return e.some(t=>o.has(t))}function P1(o,e){const t=[...o],i=[...e],s=t.length,r=i.length;if(s===0)return!0;let a=0,l=0;for(;l<r;){if(i[l]===t[a]&&(a+=1),a>=s)return!0;l+=1}return!1}const L1=x`
  :host {
    /*
    BASE STYLES
    Default fallback values for theme styles. Assumes 16px root font size.
    To adjust values, use theme styles below.
    */

    /* Typography */
    --default-font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;

    /* Sizing */
    --default-icon-width: 1.25rem;
    --default-padding-sm: 5px;
    --default-combo-box-width: auto;

    /* Colors */
    --true-white: #fff;
    --off-white: #fbfbfd;
    --dark-gray: #2c2c2c;
    --light-gray: #666;
    --classic-red: #e51c23;
    --mint-green: #31a481;
    --navy-blue: #194880;
    --bright-blue: #4b64ff;

    /*
    ADJUSTABLE STYLES
    To be adjusted by setting i.e. --ia-theme-link-color at the :root or component level.
    */

    /* Text */
    --base-font-family: var(
      --ia-theme-base-font-family,
      var(--default-font-family)
    );
    --primary-text-color: var(--ia-theme-primary-text-color, var(--dark-gray));
    --secondary-text-color: var(
      --ia-theme-secondary-text-color,
      var(--light-gray)
    );
    --link-color: var(--ia-theme-link-color, var(--bright-blue));

    /* Sizing */
    --icon-width: var(--ia-theme-icon-width, var(--default-icon-width));
    --padding-sm: var(--ia-theme-padding-sm, var(--default-padding-sm));
    --combo-box-width: var(--ia-theme-combo-box-width, var(--default-combo-box-width));

    /* Backgrounds and fills */
    --primary-background-color: var(
      --ia-theme-primary-background-color,
      var(--off-white)
    );
    --secondary-background-color: var(
      --ia-theme-secondary-background-color,
      var(--true-white)
    );

    /* State colors */
    --primary-cta-fill: var(--ia-theme-primary-cta-fill, var(--navy-blue));
    --primary-cta-text-color: var(
      --ia-theme-primary-cta-text-color,
      var(--true-white)
    );
    --color-success: var(--ia-theme-color-success, var(--mint-green));
    --color-danger: var(--ia-theme-color-danger, var(--classic-red));
  }
`,O1="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",B1="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",R1="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e",z1={all:()=>!0,prefix:(o,e)=>e.startsWith(o),suffix:(o,e)=>e.endsWith(o),substring:(o,e)=>e.includes(o),subsequence:P1},I1="list",N1="substring",U1=o=>o,H1=o=>o.toLocaleLowerCase();let ee=class extends W{constructor(){super(),this.options=[],this.behavior=I1,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=N1,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=We({disabled:this.disabled,focused:this.hasFocus});return f`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:y}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),F1(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){var t,i,s,r;e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),(i=(t=this.optionsList).showPopover)==null||i.call(t),this.optionsList.classList.add("visible")):((r=(s=this.optionsList).hidePopover)==null||r.call(s),this.optionsList.classList.remove("visible")))}get labelTemplate(){return f`
      <label id="label" for="text-input">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){var t;const e=We({"clear-padding":this.clearable&&!this.shouldShowClearButton});return f`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${D1(this.enteredText)}
        placeholder=${Re(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${Re((t=this.highlightedOption)==null?void 0:t.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return f`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${_("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${R1}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return f`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${O1}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${B1}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return f`
      <button
        type="button"
        id="caret-button"
        part="caret-button"
        tabindex="-1"
        aria-controls="options-list"
        aria-expanded=${this.open}
        ?disabled=${this.disabled}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <span class="sr-only">${_("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return f`
      <ul
        id="options-list"
        part="options-list"
        role="listbox"
        tabindex="-1"
        popover
        ?hidden=${!this.open}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      >
        <slot name="options-list-top"></slot>
        ${Xs(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,i=We({option:!0,highlight:t});return f`
        <li
          id=${e.id}
          class=${i}
          part="option ${t?"highlight":""}"
          role="option"
          tabindex="-1"
          @pointerenter=${this.handleOptionPointerEnter}
          @pointermove=${this.handleOptionPointerMove}
          @click=${this.handleOptionClick}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        >
          ${e.content??e.text}
        </li>
      `})}get emptyOptionsTemplate(){return f`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${_("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&this.setHighlightedOption(i)}handleOptionClick(e){const t=e.currentTarget,i=this.getOptionFor(t.id);i&&(this.setSelectedOption(i.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){this.enteredText=this.textInput.value,this.setFilterText(this.textInput.value),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{var e,t;this.losingFocus&&!((e=this.shadowRoot)!=null&&e.activeElement)&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(((t=this.selectedOption)==null?void 0:t.text)??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=(e==null?void 0:e.text)??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===0?t:Math.max(i-1,0);this.setHighlightedOption(e[s])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:i}=this,s=this.wrapArrowKeys&&i===t?0:Math.min(i+1,t);this.setHighlightedOption(e[s])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:i}=this;if(!i)return;const s=i.getBoundingClientRect(),r=t.getBoundingClientRect();(s.top<r.top||s.bottom>r.bottom)&&i.scrollIntoView({block:"nearest"})}setSelectedOption(e){var s;const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const i=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==i&&this.emitChangeEvent(),(s=t.onSelected)==null||s.call(t,t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput.value=e,this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},_("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this,i=e.getBoundingClientRect(),{innerHeight:s,scrollX:r,scrollY:a}=window,l=i.top,d=s-i.bottom,h={top:`${i.bottom+a}px`,left:`${i.left+r}px`,width:`var(--combo-box-list-width--, ${i.width}px)`,maxHeight:`${d}px`};Object.assign(t.style,h),setTimeout(()=>{const m=t.getBoundingClientRect().bottom>=s,g=l>d;m&&g&&(t.style.top="auto",t.style.bottom=`${s-i.top-a}px`,t.style.maxHeight=`${l}px`)},0)}get caseTransform(){return this.caseSensitive?U1:H1}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const i=this.optionFilteringValues.get(e),s=this.optionFilteringValues.get(t);return i.localeCompare(s)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const i=e(t.text);this.optionFilteringValues.set(t,i)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?z1[e]:e,i=this.optionsRespectingSortFlag.filter(s=>{const r=this.optionFilteringValues.get(s);return r?t(this.filterText,r,s):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=i}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=x`
      :host {
        --combo-box-width--: var(--combo-box-width);
        --combo-box-padding--: var(--padding-sm);
        --combo-box-list-width--: var(--combo-box-list-width, unset);
        --combo-box-list-height--: var(--combo-box-list-height, 250px);
      }

      #container {
        display: inline-block;
        width: var(--combo-box-width--);
      }

      #label {
        display: block;
        width: fit-content;
      }

      #main-widget-row {
        display: inline-flex;
        align-items: stretch;
        flex-wrap: nowrap;
        background: white;
        border: 1px solid black;
        width: 100%;
      }

      #main-widget-row:not(.focused, .disabled):hover,
      #main-widget-row:not(.focused, .disabled):active {
        background: #fafafa;
      }

      #main-widget-row.focused {
        outline: black auto 1px;
        outline-offset: 3px;
      }

      #main-widget-row.disabled {
        background: #f4f4f4;
        border-color: #a0a0a0;
        color: #404040;
      }

      #text-input {
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding--);
        padding-right: 0;
        width: 100%;
        font-size: inherit;
        color: inherit;
        outline: none;
        text-overflow: ellipsis;
      }

      #text-input.clear-padding {
        padding-right: 30px;
      }

      #text-input:read-only {
        cursor: pointer;
      }

      #clear-button,
      #caret-button {
        display: inline-flex;
        align-items: center;
        appearance: none;
        background: transparent;
        border: none;
        padding: var(--combo-box-padding--) 5px;
        outline: none;
        cursor: pointer;
      }

      #clear-button {
        flex: 0 0 30px;
      }

      #clear-button[hidden] {
        display: none;
      }

      #caret-button {
        padding-right: var(--combo-box-padding--);
      }

      #options-list {
        position: absolute;
        list-style-type: none;
        margin: 1px 0 0;
        border: none;
        padding: 0;
        background: white;
        width: var(--combo-box-list-width--);
        height: var(--combo-box-list-height--);
        max-height: 400px;
        box-shadow: 0 0 1px 1px #ddd;
        opacity: 0;
        transition: opacity 0.125s ease;
      }

      #options-list.visible {
        opacity: 1;
      }

      #empty-options {
        padding: 5px;
        color: #606060;
        font-style: italic;
        text-align: center;
      }

      .caret-icon {
        width: 0.875rem;
        height: 0.875rem;
      }

      .clear-icon {
        width: 1rem;
        height: 1rem;
      }

      .option {
        padding: 7px 5px;
        width: 100%;
        box-sizing: border-box;
        line-height: 1.1;
        text-overflow: ellipsis;
        overflow: hidden;
        cursor: pointer;
      }

      .highlight {
        background-color: #dbe0ff;
      }

      .disabled,
      .disabled * {
        cursor: not-allowed !important;
      }

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
    `;return[L1,e]}};ee.formAssociated=!0;ee.shadowRootOptions={...W.shadowRootOptions,delegatesFocus:!0};n([u({type:Array})],ee.prototype,"options",void 0);n([u({type:String})],ee.prototype,"placeholder",void 0);n([u({type:String})],ee.prototype,"behavior",void 0);n([u({type:Number,attribute:"max-autocomplete-entries"})],ee.prototype,"maxAutocompleteEntries",void 0);n([u({type:String})],ee.prototype,"filter",void 0);n([u({type:Boolean,reflect:!0,attribute:"case-sensitive"})],ee.prototype,"caseSensitive",void 0);n([u({type:Boolean,reflect:!0})],ee.prototype,"sort",void 0);n([u({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],ee.prototype,"wrapArrowKeys",void 0);n([u({type:Boolean,reflect:!0,attribute:"stay-open"})],ee.prototype,"stayOpen",void 0);n([u({type:Boolean,reflect:!0})],ee.prototype,"clearable",void 0);n([u({type:Boolean,reflect:!0})],ee.prototype,"open",void 0);n([u({type:Boolean,reflect:!0})],ee.prototype,"disabled",void 0);n([u({type:Boolean,reflect:!0})],ee.prototype,"required",void 0);n([u({type:String})],ee.prototype,"value",void 0);n([I()],ee.prototype,"hasFocus",void 0);n([I()],ee.prototype,"highlightedOption",void 0);n([I()],ee.prototype,"enteredText",void 0);n([I()],ee.prototype,"filterText",void 0);n([Z("#main-widget-row")],ee.prototype,"mainWidgetRow",void 0);n([Z("#text-input")],ee.prototype,"textInput",void 0);n([Z("#options-list")],ee.prototype,"optionsList",void 0);ee=n([H("ia-combo-box")],ee);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const V1=(o,e,t)=>{for(const i of e)if(i[0]===o)return(0,i[1])();return t==null?void 0:t()},W1=Y`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,Vs=Y`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`;var ht,ze;let Mi=(ze=class extends W{constructor(){super(...arguments);c(this,"placeholderType",null);c(this,"isMobileView");c(this,"isCollection");c(this,"detailMessage","")}render(){return this.placeholderType?f`${this.placeholderTemplate}`:y}get placeholderTemplate(){return f`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?"mobile":"desktop"}"
      >
        ${V1(this.placeholderType,[["empty-query",()=>this.emptyQueryTemplate],["empty-collection",()=>this.emptyCollectionTemplate],["no-results",()=>this.noResultsTemplate],["query-error",()=>this.queryErrorTemplate],["collection-error",()=>this.collectionErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return f`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${ht.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${W1}</div>
    `}get emptyCollectionTemplate(){return f`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${ht.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${Vs}</div>
    `}get noResultsTemplate(){return f`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection?ht.MESSAGE_NO_COLLECTION_RESULTS:ht.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${Vs}</div>
    `}get queryErrorTemplate(){return f`
      <h2 class="title" data-testid="error-query-text-msg">
        ${ht.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${Vs}</div>
      <p class="error-details">
        ${ht.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}get collectionErrorTemplate(){return f`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${ht.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${Vs}</div>
      <p class="error-details">
        ${ht.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return x`
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
    `}},ht=ze,c(ze,"MESSAGE_EMPTY_QUERY",_('To begin searching, enter a search term in the box above and hit "Go".')),c(ze,"MESSAGE_NO_SEARCH_RESULTS",_("Your search did not match any items in the Archive. Try different keywords or a more general search.")),c(ze,"MESSAGE_NO_COLLECTION_RESULTS",_("Your search did not match any items in this collection. Try different keywords or a more general search.")),c(ze,"MESSAGE_NO_VIEWABLE_MEMBERS",_("This collection contains no viewable items.")),c(ze,"MESSAGE_QUERY_ERROR",_(f`The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `)),c(ze,"MESSAGE_COLLECTION_ERROR",_(f`The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`)),c(ze,"QUERY_ERROR_DETAILS_MESSAGE",_("Error details:")),ze);n([u({type:String})],Mi.prototype,"placeholderType",void 0);n([u({type:Boolean})],Mi.prototype,"isMobileView",void 0);n([u({type:Boolean})],Mi.prototype,"isCollection",void 0);n([u({type:String})],Mi.prototype,"detailMessage",void 0);Mi=ht=n([H("empty-placeholder")],Mi);const jc=Y`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;var la;(function(o){o[o.bytes=0]="bytes",o[o.kilobytes=1]="kilobytes",o[o.megabytes=2]="megabytes",o[o.gigabytes=3]="gigabytes",o[o.terabytes=4]="terabytes",o[o.petabytes=5]="petabytes",o[o.exabytes=6]="exabytes",o[o.zettabytes=7]="zettabytes",o[o.yottabytes=8]="yottabytes"})(la||(la={}));function j1(o,e,t=" "){let i=o;if(i===void 0)return y;let s=0;for(;i>1024;)i/=1024,s+=1;const r=10**e;i=Math.round(i*r)/r;let a=la[s];return a=i===1?a.slice(0,-1):a,`${i.toLocaleString()+t+a}`}const q1=x`var(--tileBackgroundColor, #ffffff)`,G1=x`var(--tileCornerRadius, 4px)`,Bo=x`
  /* Include .sr-only styles for all tiles */
  ${lt}

  .container {
    background-color: ${q1};
    border: 1px #2c2c2c;
    border-radius: ${G1};
    box-shadow: var(--tileBoxShadow, 1px 1px 2px 0);
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

  h4.truncated,
  h3.truncated {
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
    font-size: 2.4rem;
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
`;function qc(o,e="short",{locale:t="en-US",useLocalTime:i=!1}={}){if(!o)return"";const s=i?{}:{timeZone:"UTC"};switch(e){case"year-only":return`${o.getUTCFullYear()}`;case"short":s.month="short",s.year="numeric";break;case"long":s.year="numeric",s.month="short",s.day="2-digit";break}return new Intl.DateTimeFormat(t,s).format(o)}class vl{constructor(e={}){c(this,"model");c(this,"baseNavigationUrl");c(this,"collectionPagePath");c(this,"sortParam");c(this,"creatorFilter");this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=e.collectionPagePath??"/details/",this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){var t,i;let e;if(this.creatorFilter&&((t=this.model)!=null&&t.creators.length)){const s=this.creatorFilter;e=this.model.creators.find(r=>r.normalize("NFD").replace(/[^A-Z]+/gi,"").toUpperCase().startsWith(s))}return e??((i=this.model)==null?void 0:i.creator)}get accountLabel(){var e;return(e=this.model)!=null&&e.dateAdded?_(ut`Archivist since ${this.model.dateAdded.getFullYear()}`):""}get dateLabel(){var e;switch((e=this.sortParam)==null?void 0:e.field){case"publicdate":return _("Archived");case"reviewdate":return _("Reviewed");case"addeddate":return _("Added");case"date":return _("Published");default:return""}}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return y;const i=t?this.collectionPagePath:"/details/";return`${this.baseNavigationUrl}${i}${e}`}webArchivesCaptureLink(e,t){const s=`https://web.archive.org/web/${t.toISOString().replace(/[TZ:-]/g,"").replace(/\..*/,"")}/${encodeURIComponent(e)}`,r=qc(t,"long");return f` <a href=${s}> ${r} </a> `}}class pe extends W{constructor(){super(...arguments);c(this,"model");c(this,"currentWidth");c(this,"currentHeight");c(this,"baseNavigationUrl");c(this,"baseImageUrl");c(this,"collectionPagePath");c(this,"sortParam",null);c(this,"defaultSortParam",null);c(this,"creatorFilter");c(this,"mobileBreakpoint");c(this,"loggedIn",!1);c(this,"suppressBlurring",!1);c(this,"useLocalTime",!1);c(this,"displayValueProvider",new vl)}willUpdate(t){(t.has("model")||t.has("baseNavigationUrl")||t.has("collectionPagePath")||t.has("sortParam")||t.has("defaultSortParam")||t.has("creatorFilter"))&&(this.displayValueProvider=new vl({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:this.sortParam??this.defaultSortParam??void 0,creatorFilter:this.creatorFilter}))}getFormattedDate(t,i){const{useLocalTime:s}=this;return qc(t,i,{useLocalTime:s})}}n([u({type:Object})],pe.prototype,"model",void 0);n([u({type:Number})],pe.prototype,"currentWidth",void 0);n([u({type:Number})],pe.prototype,"currentHeight",void 0);n([u({type:String})],pe.prototype,"baseNavigationUrl",void 0);n([u({type:String})],pe.prototype,"baseImageUrl",void 0);n([u({type:String})],pe.prototype,"collectionPagePath",void 0);n([u({type:Object})],pe.prototype,"sortParam",void 0);n([u({type:Object})],pe.prototype,"defaultSortParam",void 0);n([u({type:String})],pe.prototype,"creatorFilter",void 0);n([u({type:Number})],pe.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],pe.prototype,"loggedIn",void 0);n([u({type:Boolean})],pe.prototype,"suppressBlurring",void 0);n([u({type:Boolean})],pe.prototype,"useLocalTime",void 0);let ca=class extends W{constructor(){super(...arguments);c(this,"type")}render(){return f`<div class="icon-overlay">${this.iconTemplate}</div>`}get iconTemplate(){return this.type?f`${Lc[this.type]??y}`:y}static get styles(){return x`
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
    `}};n([u({type:String})],ca.prototype,"type",void 0);ca=n([H("icon-overlay")],ca);let da=class extends W{constructor(){super(...arguments);c(this,"type")}render(){return f`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `}get iconTemplate(){return this.type?f`${Lc[this.type]??y}`:y}get textTemplate(){return this.type?f`${h1[this.type]??y}`:y}static get styles(){return x`
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
    `}};n([u({type:String})],da.prototype,"type",void 0);da=n([H("text-overlay")],da);let xt=class extends W{constructor(){super(...arguments);c(this,"baseImageUrl");c(this,"isCompactTile",!1);c(this,"isListTile",!1);c(this,"loggedIn",!1);c(this,"suppressBlurring",!1);c(this,"model");c(this,"viewSize","desktop")}render(){var t;return(t=this.model)!=null&&t.identifier?f`
      <div class=${We(this.baseClass)}>
        <item-image
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isListTile=${this.isListTile}
          .isCompactTile=${this.isCompactTile}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          style="--imgHeight: 100%; --imgWidth: 100%"
        >
        </item-image>
        ${this.textOverlayTemplate} ${this.iconOverlayTemplate}
      </div>
    `:y}get baseClass(){var t,i;return{container:!0,list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:((t=this.model)==null?void 0:t.mediatype)==="collection",[this.viewSize]:!0,"search-image":((i=this.model)==null?void 0:i.mediatype)==="search"}}get iconOverlayTemplate(){if(!this.isListTile)return y;const{overlayType:t}=this;return t?f`
      <icon-overlay
        class=${this.isCompactTile?"list-compact":"list-detail"}
        .type=${this.overlayType}
      >
      </icon-overlay>
    `:y}get textOverlayTemplate(){if(this.isListTile)return y;const{overlayType:t}=this;return t?f` <text-overlay .type=${this.overlayType}></text-overlay> `:y}get overlayType(){var t,i;if(!this.suppressBlurring){if((t=this.model)!=null&&t.loginRequired&&!this.loggedIn)return"login-required";if((i=this.model)!=null&&i.contentWarning)return"content-warning"}}static get styles(){const t=x`var(--imageBlockBackgroundColor, #f1f1f4)`;return x`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${t};
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
    `}};n([u({type:String})],xt.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],xt.prototype,"isCompactTile",void 0);n([u({type:Boolean})],xt.prototype,"isListTile",void 0);n([u({type:Boolean})],xt.prototype,"loggedIn",void 0);n([u({type:Boolean})],xt.prototype,"suppressBlurring",void 0);n([u({type:Object})],xt.prototype,"model",void 0);n([u({type:String})],xt.prototype,"viewSize",void 0);xt=n([H("image-block")],xt);let ha=class extends pe{constructor(){super(...arguments);c(this,"showInfoButton",!1)}render(){return f`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `}get getImageBlockTemplate(){return f`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){var t;return f`<div id="title">
      <h3 class="truncated">${(t=this.model)==null?void 0:t.title}</h3>
    </div>`}get getTileStatsTemplate(){return f`
      <div id="item-stats">
        <div id="item-mediatype">${jc}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){var i,s;const t=(s=(i=this.model)==null?void 0:i.itemCount)==null?void 0:s.toLocaleString();return f`<span id="item-count"
      >${t} item${Number(t)!==1?"s":""}</span
    >`}get getSizeTemplate(){var i;const t=((i=this.model)==null?void 0:i.collectionSize)??0;return t?f`<span id="item-size">${j1(t,1)}</span>`:""}get infoButtonTemplate(){return this.showInfoButton?f`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${_("More info")}</span>
        </button>`:y}infoButtonPressed(t){t.preventDefault();const i=new CustomEvent("infoButtonPressed",{detail:{x:t.clientX,y:t.clientY}});this.dispatchEvent(i)}static get styles(){const t=x`var(--tileBorderColor, #555555)`,i=x`var(--tileBackgroundColor, #666666)`,s=x`#fff`;return[Bo,x`
        .container {
          background-color: ${i};
          border: 1px solid ${t};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${s};
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
          color: ${s};
          flex-direction: column;
          margin-left: 10px;
        }
      `]}};n([u({type:Boolean})],ha.prototype,"showInfoButton",void 0);ha=n([H("collection-tile")],ha);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*ti(o,e){if(o!==void 0){let t=0;for(const i of o)yield e(i,t++)}}function Ga(o){return o?o.toISOString().endsWith("-01-01T00:00:00.000Z"):!1}const Gc=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
  </svg>
`,Y1=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m69.0481858 61.4006179 13.2757509 38.38311-32.1794134-24.4730516-32.2508245 24.6893237 13.2757507-38.4552008-31.1694495-21.9945074 38.1677832-.5115002 11.8339172-39.0387916 11.6162817 38.8946104 38.3820179.6556814zm-2.8122554 15.58874-6.7092871-19.2276004 18.0365221-11.7267421-21.6445066.5115-5.9169584-19.5914862-5.9169587 19.5914862-21.6445064-.5115 18.036522 11.7267421-6.5664638 19.3752146 16.0880061-12.3824233z"
    />
  </svg>
`;let Di=class extends W{constructor(){super(...arguments);c(this,"title","");c(this,"body","");c(this,"starRating",0);c(this,"viewSize","desktop")}render(){return!this.title&&!this.body&&!this.starRating?y:f`
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.title}</p>
          <p class="review-body">${this.body}</p>
        </div>
      </div>
    `}get starsTemplate(){if(this.starRating<=0)return y;const t=Math.min(5,this.starRating),i=Math.min(5,5-this.starRating);return f`
      <div class="star-rating">
        <span class="sr-only">${this.starRating} ${_("out of 5 stars")}</span>
        ${Array(t).fill(this.filledStarTemplate)}
        ${Array(i).fill(this.unfilledStarTemplate)}
      </div>
    `}get filledStarTemplate(){return f`<span aria-hidden="true">${Gc}</span>`}get unfilledStarTemplate(){return f`
      <span class="unfilled-star" aria-hidden="true">
        ${Y1}
      </span>
    `}static get styles(){return[lt,x`
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
      `]}};n([u({type:String})],Di.prototype,"title",void 0);n([u({type:String})],Di.prototype,"body",void 0);n([u({type:Number})],Di.prototype,"starRating",void 0);n([u({type:String})],Di.prototype,"viewSize",void 0);Di=n([H("review-block")],Di);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Zs(o,e){const t=typeof e=="function";if(o!==void 0){let i=-1;for(const s of o)i>-1&&(yield t?e(i):e),i++,yield s}}let yo=class extends W{constructor(){super(...arguments);c(this,"snippets",[]);c(this,"viewSize","desktop")}render(){var t;return(t=this.snippets)!=null&&t.length?f`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:f`${y}`}get ellipsisJoinedSnippets(){return f`
      &hellip; ${Zs(this.snippetTemplates,f` &hellip; `)} &hellip;
    `}get snippetTemplates(){var t;return(t=this.snippets)==null?void 0:t.map(i=>{const s=i.matchAll(/{{{(.+?)}}}/gs),r=[];let a=0;for(const l of s)l.index!=null&&(r.push(f`
            ${i.slice(a,l.index)}
            <mark>${l[1]}</mark>
          `),a=l.index+l[0].length);return r.push(f`${i.slice(a)}`),f`<span>${r}</span>`})}static get styles(){return x`
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
    `}};n([u({type:Array})],yo.prototype,"snippets",void 0);n([u({type:String})],yo.prototype,"viewSize",void 0);yo=n([H("text-snippet-block")],yo);const Q1=x`
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
`,K1=x`
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
`,Yc=Y`
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
`;let ot=class extends W{constructor(){super(...arguments);c(this,"model");c(this,"baseImageUrl");c(this,"isListTile",!1);c(this,"isCompactTile",!1);c(this,"loggedIn",!1);c(this,"suppressBlurring",!1);c(this,"isWaveform",!1);c(this,"isNotFound",!1);c(this,"baseImage")}render(){return f`
      <div class=${We(this.itemBaseClass)}>${this.imageTemplate}</div>
    `}get imageTemplate(){var t;return((t=this.model)==null?void 0:t.mediatype)==="search"?f`${Yc}`:f`
      <img
        class=${We(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `}get imageSrc(){var t,i,s;if(this.isNotFound)return this.notFoundSrc;if((t=this.model)!=null&&t.captureDates&&this.model.identifier)try{const r=new URL(this.model.identifier),a=encodeURIComponent(r.hostname);return this.baseImageUrl?`https://web.archive.org/thumb/${a}?generate=1`:y}catch{return`${this.baseImageUrl}/images/notfound.png`}return(i=this.model)!=null&&i.thumbnailUrl?this.model.thumbnailUrl:this.baseImageUrl&&((s=this.model)!=null&&s.identifier)?`${this.baseImageUrl}/services/img/${this.model.identifier}`:y}get notFoundSrc(){return this.baseImageUrl?`${this.baseImageUrl}/images/notfound.png`:y}get hashBasedGradient(){var i;return(i=this.model)!=null&&i.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(t){return t.split("").reduce((i,s)=>i+s.charCodeAt(0),0)}get itemBaseClass(){var t;return{"drop-shadow":!0,"list-box":this.isListTile,"search-image":((t=this.model)==null?void 0:t.mediatype)==="search",[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var s,r,a;const i=!!((s=this.model)!=null&&s.contentWarning||(r=this.model)!=null&&r.loginRequired)&&!this.suppressBlurring;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:i,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":((a=this.model)==null?void 0:a.mediatype)==="collection"}}get isAccountImage(){var t;return((t=this.model)==null?void 0:t.mediatype)==="account"&&!this.isCompactTile&&!this.isListTile}onLoad(){var t,i;(((t=this.model)==null?void 0:t.mediatype)==="audio"||((i=this.model)==null?void 0:i.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}onError(){this.isNotFound=!0}static get styles(){return[Q1,K1,x`
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
      `]}};n([u({type:Object})],ot.prototype,"model",void 0);n([u({type:String})],ot.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],ot.prototype,"isListTile",void 0);n([u({type:Boolean})],ot.prototype,"isCompactTile",void 0);n([u({type:Boolean})],ot.prototype,"loggedIn",void 0);n([u({type:Boolean})],ot.prototype,"suppressBlurring",void 0);n([I()],ot.prototype,"isWaveform",void 0);n([I()],ot.prototype,"isNotFound",void 0);n([Z("img")],ot.prototype,"baseImage",void 0);ot=n([H("item-image")],ot);const X1=Y`
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
`,Z1=Y`
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
`,J1=Y`
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
`,e0=Y`
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
`,t0=Y`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,bl=Y`
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
`,i0=Y`
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
`,s0=Y`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,o0=Y`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,r0=Y`
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
`,a0=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m38.4615385 55.5197275-4.8171501 7.0895871c4.1025641 2.9421734 8.9186633 4.7253407 14.4482976 5.3495018v13.0411836h5.6179067v-12.9749847c3.8356452-.357264 6.8905002-1.5278287 9.1645649-3.5116942 2.2740648-1.9838655 3.4110971-4.5582672 3.4110971-7.7232052v-.0661989c0-3.2553047-1.025641-5.7635075-3.076923-7.5246085-2.0512821-1.7611009-5.3068517-3.1544302-9.7667087-4.1799878v-6.2195444c2.6754939.6682937 5.083018 1.7379839 7.2225725 3.2090706l4.4136191-7.1557861c-3.2114333-2.2738797-6.9798234-3.6787675-11.3051702-4.2146634v-11.6383974h-5.5517024v11.5028473c-4.0584279.3131313-7.2026061 1.4721374-9.4325347 3.4770185-2.2299285 2.004881-3.3448928 4.5908413-3.3448928 7.7578808v.1323978c0 3.2111721 1.0372005 5.6857501 3.1116015 7.423734 2.074401 1.7379838 5.3625473 3.1197546 9.8644389 4.1453122v6.4212934c-3.1651955-.4896617-6.4869694-1.9386821-9.9653216-4.3470612zm-24.4136192-32.7716087c-4.32534679 3.7008338-7.74800337 8.0142702-10.26796974 12.9403091s-3.77994956 10.1536506-3.77994956 15.6828351c0 4.9050234 1.02564103 9.6093485 3.07692308 14.1129754 2.05128205 4.5036268 4.88335435 8.5606738 8.49621692 12.1711409.357293.3572639 1.1149642.6252118 2.2730138.8038438s2.2057588-.0220663 3.1431274-.6020948c.5800757-.4896617.8701135-1.1138228.8701135-1.8724832s-.1229508-1.3828215-.3688525-1.8724832c-.2459016-.4896617-.5023119-.8689919-.7692307-1.1379907-6.5111392-6.3761101-9.76670873-13.5770795-9.76670873-21.6029082 0-4.6822589 1.1034048-9.0850112 3.31021443-13.2082571 2.2068095-4.1232459 5.2059688-7.6570063 8.9974779-10.6012813.0882724-.0882652.1775956-.1880889.2679697-.2994712s.2574611-.3562131.5012611-.7344926c.2437999-.3782794.4224464-.7460511.5359394-1.103315.1134931-.3572639.1250526-.770219.0346785-1.2388652s-.3131568-.8816012-.6683481-1.2388651c-.668348-.6682937-1.4932745-1.0245068-2.4747793-1.0686394s-1.8064313.0893159-2.4747793.4003457zm71.9041614 0c4.3253468 3.7008338 7.7480034 8.0142702 10.2679697 12.9403091 2.5199664 4.9260389 3.7799496 10.1536506 3.7799496 15.6828351 0 4.8608908-1.025641 9.5536573-3.0769231 14.0782997-2.051282 4.5246424-4.8602354 8.593248-8.42686 12.2058166-.4014292.3572639-1.1822194.6252118-2.3423707.8038438-1.1601514.178632-2.1857924-.0220663-3.0769231-.6020948-.5800757-.4896617-.8806221-1.1138228-.9016394-1.8724832-.0210172-.7586604.0903741-1.3828215.3341741-1.8724832.2437999-.4896617.5002101-.8689919.7692307-1.1379907 6.4649012-6.3319775 9.6973519-13.5329469 9.6973519-21.6029082 0-4.6822589-1.1034048-9.0850112-3.3102144-13.2082571s-5.18285-7.6570063-8.9281211-10.6012813c-.0882724-.0882652-.1775956-.1880889-.2679697-.2994712s-.2574611-.3562131-.5012611-.7344926c-.2437999-.3782794-.4224464-.7460511-.5359394-1.103315-.1134931-.3572639-.1250526-.770219-.0346785-1.2388652s.3131568-.8816012.6683481-1.2388651c.668348-.6682937 1.4932745-1.0245068 2.4747793-1.0686394s1.7843632.0893159 2.408575.4003457zm-62.2730139 8.0920276c-3.1210592 2.4525117-5.6179066 5.4840011-7.4905422 9.0944682s-2.8089534 7.4447495-2.8089534 11.5028473c0 6.2878449 2.2068096 11.9725442 6.6204288 17.054098.1786465.3131313.858554.469697 2.0397226.469697 1.1811685 0 2.1290458-.2900143 2.8436318-.8700427.5359394-.4896618.8259773-1.1253814.8701134-1.9071589.0441362-.7817775-.045187-1.2167988-.2679697-1.305064-1.6939891-1.7842181-3.1094998-3.9582741-4.2465321-6.522168-1.1370324-2.563894-1.7055486-5.0720968-1.7055486-7.5246085 0-3.34357.7471627-6.3424853 2.241488-8.996746 1.4943254-2.6542607 3.5571669-4.7390008 6.1885246-6.2542201.0441362-.0441326.1113914-.12189.2017655-.2332723s.2238335-.3341468.4003783-.6682937c.1765447-.3341468.2994956-.6577859.3688524-.9709172.0693569-.3131313.0472888-.7029693-.0662043-1.1695139-.113493-.4665447-.3478352-.901566-.7030264-1.3050641-.4897016-.5358959-1.102354-.8364179-1.8379572-.901566s-1.3482555-.009457-1.8379571.1670734zm52.5063052 0c3.1651955 2.4966443 5.6956705 5.5396923 7.591425 9.1291438 1.8957545 3.5894516 2.8436318 7.4132262 2.8436318 11.471324 0 6.2416107-2.2519967 11.9263101-6.75599 17.054098-.1345103.3131313-.7923497.469697-1.9735182.469697-1.1811686 0-2.1290459-.2900142-2.8436318-.8700427-.5359395-.4896617-.8259773-1.1253813-.8701135-1.9071589-.0441362-.7817775.045187-1.2167988.2679697-1.305064 1.6498529-1.8283506 3.0432955-4.0244729 4.1803279-6.5883669s1.7055485-5.0500305 1.7055485-7.4584096c0-3.3435699-.7356032-6.3309267-2.2068095-8.9620704-1.4712064-2.6311436-3.5004204-4.7263914-6.0876419-6.2857433l-.2332913-.2332723s-.1450189-.2227646-.4350568-.6682937c-.2900378-.4455291-.4129886-.7691682-.3688524-.9709172.0441362-.2017491.0662043-.591587.0662043-1.169514 0-.5779269.2343421-1.0129482.7030265-1.305064.4897015-.5358959 1.1023539-.8364179 1.8379571-.901566.7356032-.0651482 1.3482555-.009457 1.8379571.1670734zm-31.3682219 10.2324588v-.0661989c0-1.605586 1.2263556-2.497695 3.6790668-2.676327v5.7529998c-1.4270702-.4013965-2.3970156-.8248593-2.9098361-1.2703884-.5128205-.4455292-.7692307-1.0255576-.7692307-1.7400855zm12.1721311 16.3196055v.0661989c0 1.5614535-1.2042875 2.4756288-3.6128625 2.7425259v-5.8853976c1.382934.4013965 2.3308112.8248594 2.8436317 1.2703885.5128206.4455291.7692308 1.0476239.7692308 1.8062843z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,n0=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m53.8329111 72.530691-28.3707393-20.2314977c-1.2950216-.9306676-2.0122823-2.1279084-2.1517819-3.5917222-.1394997-1.4638139.1499621-2.9054133.8683852-4.3247984.7184232-1.419385 1.5275211-2.780311 2.4272938-4.0827779.8997726-1.302467 1.7204955-2.3488835 2.4621686-3.1392494l1.178772-1.1855489 20.6040968 16.1873027 36.4861309-43.88284817 3.885065-3.27955103c2.311044 1.53396469 4.1722017 3.06909856 5.5834731 4.60540161 1.4112713 1.53630309 2.2901191 2.86215359 2.6365432 3.97755169.3464241 1.1153982.5312611 2.1150474.5545111 2.9989478.0232494.8839004-.0813748 1.5351339-.3138742 1.9537004l-.4150115.6980007zm15.0520112 11.0943528v-5.022799c-.0464999-.1403016-.0813748-.2911259-.1046247-.4524728-.02325-.1613469-.0464999-.486379-.0697498-.9750964-.02325-.4887175.0116249-.8020578.1046247-.9400211.0464999-.1870689.2197119-.4898866.5196361-.9084532.2999243-.4185666.589386-.7903659.8683853-1.1153981l.4150114-.4875482 9.5731628-11.1645037v32.4412487h-80.1913681v-80.6524027h68.1874241l-7.1458691 8.5829534c-1.0183473 1.5807319-1.8041953 2.5113995-2.3575439 2.7920028h-47.3775653v57.9059979h57.574989z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,l0=Y`
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
`,c0=Y`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,d0=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Qc={account:{color:"#000000",icon:X1,text:"Account"},audio:{color:"#00adef",icon:Z1,text:"Audio"},collection:{color:"#4666ff",icon:jc,text:"Collection"},data:{color:"#333333",icon:J1,text:"Data"},etree:{color:"#00adef",icon:e0,text:"E-tree"},film:{color:"#bf1b2c",icon:bl,text:"Film"},image:{color:"#aa99c9",icon:t0,text:"Image"},movies:{color:"#f1644b",icon:bl,text:"Movie"},none:{color:"#00000000",icon:f``,text:""},radio:{color:"#8fdaef",icon:i0,text:"Radio"},software:{color:"#9ecc4f",icon:s0,text:"Software"},texts:{color:"#faab3c",icon:o0,text:"Text"},tv:{color:"#f1644b",icon:r0,text:"TV"},tvCommercial:{color:"#84b648",icon:a0,text:"TV Commercial"},tvFactCheck:{color:"#f1644b",icon:n0,text:"TV Fact Check"},tvQuote:{color:"#fe7a5f",icon:d0,text:"TV Quote"},video:{color:"#f1644b",icon:l0,text:"Video"},web:{color:"#ffcd27",icon:c0,text:"Web"},search:{color:"#000000",icon:Yc,text:"Search"}},h0="tv_ads",p0="factchecked",u0=new Set(["tvnews","tvarchive","television"]),f0=new Set(["radio","radioprogram"]);let wo=class extends W{constructor(){super(...arguments);c(this,"model");c(this,"showText",!1)}get displayMediatype(){var t;return this.isTvItem?this.tvDisplayMediatype:this.isRadioItem?"radio":((t=this.model)==null?void 0:t.mediatype)??"none"}get tvDisplayMediatype(){var t,i;return this.isTvCommercial?"tvCommercial":(t=this.model)!=null&&t.isTvSearchResult&&this.isTvFactCheck?"tvFactCheck":(i=this.model)!=null&&i.isTvSearchResult&&this.isTvQuote?"tvQuote":"tv"}get isTvItem(){var t,i;return!!(((t=this.model)==null?void 0:t.mediatype)==="movies"&&((i=this.model)!=null&&i.collections.some(s=>u0.has(s))))}get isTvCommercial(){var t,i,s;return!!((i=(t=this.model)==null?void 0:t.adIds)!=null&&i.length||(s=this.model)!=null&&s.collections.includes(h0))}get isTvFactCheck(){var t,i,s;return!!((i=(t=this.model)==null?void 0:t.factChecks)!=null&&i.length||(s=this.model)!=null&&s.collections.includes(p0))}get isTvQuote(){var t;return!!((t=this.model)!=null&&t.isClip)}get isRadioItem(){var t,i;return!!(((t=this.model)==null?void 0:t.mediatype)==="audio"&&((i=this.model)!=null&&i.collections.some(s=>f0.has(s))))}render(){const t=Qc[this.displayMediatype];return t?f`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        title="${t.text}"
        style="--iconFillColor: ${t.color}"
      >
        ${t.icon}
        <p class="status-text">${t.text}</p>
      </div>
    `:f``}static get styles(){return x`
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
    `}};n([u({type:Object})],wo.prototype,"model",void 0);n([u({type:Boolean})],wo.prototype,"showText",void 0);wo=n([H("tile-mediatype-icon")],wo);const m0=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,g0=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,v0=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`,b0=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"/>
  </svg>
`;function y0(o,e){let t=1;return o>=1e9?t=1e9:o>=1e6?t=1e6:o>=1e3&&e==="short"&&(t=1e3),t}function w0(o=0,e){const t=o/e,i=t<10;let s=0;return i?s=Math.round((t+Number.EPSILON)*10)/10:s=Math.round(t),s}function $0(o,e,t,i){switch(e){case 1e9:return _(t==="short"?ut`${o}B`:ut`${o} billion`);case 1e6:return _(t==="short"?ut`${o}M`:ut`${o} million`);case 1e3:return _(t==="short"?ut`${o}K`:ut`${o} thousand`);default:return new Intl.NumberFormat(i).format(o)}}function Ya(o,e="long",t="short",i="en-US"){const s=o??-1;if(s<0)return"";const r=y0(s,e),a=w0(s,r);return $0(a,r,t,i)}let rt=class extends W{constructor(){super(...arguments);c(this,"model");c(this,"mediatype");c(this,"itemCount");c(this,"viewCount");c(this,"viewLabel");c(this,"favCount");c(this,"commentCount");c(this,"showTvClips",!1);c(this,"tvClipCount")}render(){return f`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype==="account"?"Account Stats":"Item Stats"}
        </p>
        <ul id="stats-row">
          ${this.mediatypeIconColumnTemplate}
          ${this.mediatype==="account"?this.uploadsColumnTemplate:this.viewsColumnTemplate}
          ${this.favoritesColumnTemplate}
          ${this.showTvClips?this.tvClipsColumnTemplate:this.reviewsColumnTemplate}
        </ul>
      </div>
    `}get mediatypeIconColumnTemplate(){return f`
      <li class="col">
        <p class="sr-only">${_("Mediatype:")}</p>
        <tile-mediatype-icon .model=${this.model}></tile-mediatype-icon>
      </li>
    `}columnTemplate(t,i,s,r=[]){const a=Ya(t??0,"short","short"),l=_(ut`${a} ${i}`),d=i+":";return f`
      <li class="col ${r.join(" ")}" title=${l}>
        ${s}
        <p class="status-text">
          <span class="sr-only">${d}</span>
          ${a}
        </p>
      </li>
    `}get viewsColumnTemplate(){const t=this.viewLabel??_("all-time views");return this.columnTemplate(this.viewCount,t,v0)}get uploadsColumnTemplate(){return this.columnTemplate(this.itemCount,_("uploads"),g0)}get favoritesColumnTemplate(){return this.columnTemplate(this.favCount,_("favorites"),Gc)}get reviewsColumnTemplate(){return this.columnTemplate(this.commentCount,_("reviews"),m0,["reviews"])}get tvClipsColumnTemplate(){return this.columnTemplate(this.tvClipCount,_("clips"),b0)}static get styles(){return[lt,x`
        tile-mediatype-icon {
          --iconHeight: 25px;
          --iconWidth: 25px;
        }

        ul {
          all: unset;
          list-style-type: none;
        }

        li {
          list-style-type: none;
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
      `]}};n([u({type:Object})],rt.prototype,"model",void 0);n([u({type:String})],rt.prototype,"mediatype",void 0);n([u({type:Number})],rt.prototype,"itemCount",void 0);n([u({type:Number})],rt.prototype,"viewCount",void 0);n([u({type:String})],rt.prototype,"viewLabel",void 0);n([u({type:Number})],rt.prototype,"favCount",void 0);n([u({type:Number})],rt.prototype,"commentCount",void 0);n([u({type:Boolean})],rt.prototype,"showTvClips",void 0);n([u({type:Number})],rt.prototype,"tvClipCount",void 0);rt=n([H("tile-stats")],rt);let As=class extends pe{constructor(){super(...arguments);c(this,"showInfoButton",!1);c(this,"showTvClips",!1);c(this,"simpleLayoutType","none")}render(){var s;const t=(s=this.model)==null?void 0:s.title,i=We({container:!0,simple:this.simpleLayoutType!=="none","stats-only":this.simpleLayoutType==="stats-only","snippets-only":this.simpleLayoutType==="snippets-only"});return f`
      <div class=${i}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h3 class="truncated" title=${Re(t)}>
                ${t}
              </h3>
            </div>

            ${this.volumeIssueTemplate}
            ${this.isSortedByDate?this.sortedDateInfoTemplate:this.creatorTemplate}
            ${this.webArchivesCaptureDatesTemplate} ${this.textSnippetsTemplate}
            ${this.reviewBlockTemplate}
          </div>

          ${this.tileStatsTemplate}
        </div>
      </div>
    `}get creatorTemplate(){const t=this.displayValueProvider.firstCreatorMatchingFilter;return t?f`
      <div class="created-by">
        <span class="truncated" title=${t}>
          by&nbsp;${t}
        </span>
      </div>
    `:y}get imageBlockTemplate(){return f`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.suppressBlurring}
        .isCompactTile=${!1}
        .isListTile=${!1}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get sortedDateInfoTemplate(){var r,a,l,d,h;let t,i="long";switch((r=this.effectiveSort)==null?void 0:r.field){case"date":{const p=(a=this.model)==null?void 0:a.datePublished;t={field:"published",value:p},Ga(p)&&(i="year-only");break}case"reviewdate":t={field:"reviewed",value:(l=this.model)==null?void 0:l.dateReviewed};break;case"addeddate":t={field:"added",value:(d=this.model)==null?void 0:d.dateAdded};break;case"publicdate":t={field:"archived",value:(h=this.model)==null?void 0:h.dateArchived};break}if(!(t!=null&&t.value))return y;const s=this.getFormattedDate(t.value,i);return f`
      <div class="date-sorted-by truncated">
        <span>${t.field} ${s}</span>
      </div>
    `}get infoButtonTemplate(){return this.showInfoButton?f`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${_("More info")}</span>
        </button>`:y}get reviewBlockTemplate(){var r;if(!((r=this.model)!=null&&r.review))return y;const{reviewtitle:t,reviewbody:i,stars:s}=this.model.review;return f`
      <review-block
        viewsize="grid"
        title=${Re(t)}
        body=${Re(i)}
        starRating=${Re(s)}
      >
      </review-block>
    `}get textSnippetsTemplate(){var t;return!this.hasSnippets||this.simpleLayoutType==="stats-only"?y:f`
      <text-snippet-block viewsize="grid" .snippets=${(t=this.model)==null?void 0:t.snippets}>
      </text-snippet-block>
    `}get volumeIssueTemplate(){var t,i,s,r;return!((t=this.model)!=null&&t.volume)||!((i=this.model)!=null&&i.issue)?y:f`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${(s=this.model)==null?void 0:s.volume}, Issue&nbsp;${(r=this.model)==null?void 0:r.issue}
        </span>
      </div>
    `}get webArchivesCaptureDatesTemplate(){var t;return!((t=this.model)!=null&&t.captureDates)||!this.model.title?y:f`
      <ul class="capture-dates">
        ${ti(this.model.captureDates,i=>f`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,i)}
            </li>`)}
      </ul>
    `}get tileStatsTemplate(){var r,a,l,d,h,p;if(this.simpleLayoutType==="snippets-only")return y;const t=this.sortParam??this.defaultSortParam,[i,s]=(t==null?void 0:t.field)==="week"?[(r=this.model)==null?void 0:r.weeklyViewCount,"weekly views"]:[(a=this.model)==null?void 0:a.viewCount,"all-time views"];return f`
      <tile-stats
        .model=${this.model}
        .mediatype=${(l=this.model)==null?void 0:l.mediatype}
        .viewCount=${i}
        .viewLabel=${s}
        .favCount=${(d=this.model)==null?void 0:d.favCount}
        .commentCount=${(h=this.model)==null?void 0:h.commentCount}
        .tvClipCount=${(p=this.model)==null?void 0:p.tvClipCount}
        .showTvClips=${this.showTvClips}
      >
      </tile-stats>
    `}get isSortedByDate(){var t;return["date","reviewdate","addeddate","publicdate"].includes((t=this.effectiveSort)==null?void 0:t.field)}get effectiveSort(){return this.sortParam??this.defaultSortParam}get hasSnippets(){var t,i;return!!((i=(t=this.model)==null?void 0:t.snippets)!=null&&i.length)}infoButtonPressed(t){t.preventDefault();const i=new CustomEvent("infoButtonPressed",{detail:{x:t.clientX,y:t.clientY}});this.dispatchEvent(i)}static get styles(){const t=x`var(--tileBorderColor, #dddddd)`;return[Bo,x`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:hover {
          text-decoration: underline;
        }

        .container {
          border: 1px solid ${t};
        }

        .simple #title > .truncated {
          -webkit-line-clamp: 2;
        }

        .simple .created-by > .truncated,
        .simple .date-sorted-by > .truncated,
        .simple .volume-issue > .truncated {
          -webkit-line-clamp: 1;
        }

        .simple.snippets-only .item-info {
          padding-bottom: 5px;
        }

        .simple.snippets-only text-snippet-block {
          margin-top: auto; /* Force the snippets to the bottom of the tile */
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
      `]}};n([u({type:Boolean})],As.prototype,"showInfoButton",void 0);n([u({type:Boolean})],As.prototype,"showTvClips",void 0);n([u({type:String})],As.prototype,"simpleLayoutType",void 0);As=n([H("item-tile")],As);let pa=class extends pe{constructor(){super(...arguments);c(this,"showInfoButton",!1)}render(){return f`
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
    `}get getAvatarTemplate(){return f`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){var t;return f`<div id="title">
      <h4 class="truncated">${(t=this.model)==null?void 0:t.identifier}</h4>
    </div>`}get getArchivistTemplate(){return f`<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
    </div>`}get getTileStatsTemplate(){var t,i,s,r;return f`<tile-stats
      .mediatype=${(t=this.model)==null?void 0:t.mediatype}
      .itemCount=${(i=this.model)==null?void 0:i.itemCount}
      .favCount=${(s=this.model)==null?void 0:s.favCount}
      .commentCount=${(r=this.model)==null?void 0:r.commentCount}
    >
    </tile-stats>`}get infoButtonTemplate(){return this.showInfoButton?f`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${_("More info")}</span>
        </button>`:y}infoButtonPressed(t){t.preventDefault();const i=new CustomEvent("infoButtonPressed",{detail:{x:t.clientX,y:t.clientY}});this.dispatchEvent(i)}static get styles(){const t=x`var(--tileBorderColor, #dddddd)`;return[Bo,x`
        .container {
          border: 1px solid ${t};
        }
      `]}};n([u({type:Boolean})],pa.prototype,"showInfoButton",void 0);pa=n([H("account-tile")],pa);let ua=class extends pe{constructor(){super(...arguments);c(this,"showInfoButton",!1)}render(){return f`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
      </div>
    `}get getImageBlockTemplate(){return f`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){var t;return f`<div id="title">
      <h3 class="truncated">${(t=this.model)==null?void 0:t.title}</h3>
    </div>`}static get styles(){const t=x`var(--tileBorderColor, #555555)`,i=x`var(--tileBackgroundColor, #666666)`,s=x`#fff`;return[Bo,x`
        .container {
          background-color: ${i};
          border: 1px solid ${t};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${s};
          -webkit-line-clamp: 4;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `]}};n([u({type:Boolean})],ua.prototype,"showInfoButton",void 0);ua=n([H("search-tile")],ua);function Js(o,e,t,i=20,s=0){let r=[];if(s>=i)return r;const a=d=>{const h=d.assignedNodes().filter(p=>p.nodeType===1);return h.length>0?Js(h[0].parentElement,e,t,i,s+1):[]},l=Array.from(o.children||[]);for(const d of l)e(d)||(t(d)&&r.push(d),d.shadowRoot!=null?r.push(...Js(d.shadowRoot,e,t,i,s+1)):d.tagName==="SLOT"?r.push(...a(d)):r.push(...Js(d,e,t,i,s+1)));return r}function Kc(o){return o.hasAttribute("hidden")||o.hasAttribute("aria-hidden")&&o.getAttribute("aria-hidden")!=="false"||o.style.display==="none"||o.style.opacity==="0"||o.style.visibility==="hidden"||o.style.visibility==="collapse"}function S0(o){return o.hasAttribute("disabled")||o.hasAttribute("aria-disabled")&&o.getAttribute("aria-disabled")!=="false"}function x0(o){return o.getAttribute("tabindex")==="-1"||Kc(o)||S0(o)?!1:o.hasAttribute("tabindex")||(o instanceof HTMLAnchorElement||o instanceof HTMLAreaElement)&&o.hasAttribute("href")||o instanceof HTMLButtonElement||o instanceof HTMLInputElement||o instanceof HTMLTextAreaElement||o instanceof HTMLSelectElement||o instanceof HTMLIFrameElement}const ur=new Map;function C0(o,e,t){const i=ur.get(t);i!=null&&window.clearTimeout(i),ur.set(t,window.setTimeout(()=>{o(),ur.delete(t)},e))}const Xc=document.createElement("template");Xc.innerHTML=`
	<div id="start"></div>
	<div id="backup"></div>
	<slot></slot>
	<div id="end"></div>
`;class T0 extends HTMLElement{constructor(){super(),this.debounceId=Math.random().toString(),this._focused=!1;const e=this.attachShadow({mode:"open"});e.appendChild(Xc.content.cloneNode(!0)),this.$backup=e.querySelector("#backup"),this.$start=e.querySelector("#start"),this.$end=e.querySelector("#end"),this.focusLastElement=this.focusLastElement.bind(this),this.focusFirstElement=this.focusFirstElement.bind(this),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}static get observedAttributes(){return["inactive"]}get inactive(){return this.hasAttribute("inactive")}set inactive(e){e?this.setAttribute("inactive",""):this.removeAttribute("inactive")}get focused(){return this._focused}connectedCallback(){this.$start.addEventListener("focus",this.focusLastElement),this.$end.addEventListener("focus",this.focusFirstElement),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut),this.render()}disconnectedCallback(){this.$start.removeEventListener("focus",this.focusLastElement),this.$end.removeEventListener("focus",this.focusFirstElement),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut)}attributeChangedCallback(){this.render()}focusFirstElement(){this.trapFocus()}focusLastElement(){this.trapFocus(!0)}getFocusableElements(){return Js(this,Kc,x0)}trapFocus(e){if(this.inactive)return;let t=this.getFocusableElements();t.length>0?(e?t[t.length-1].focus():t[0].focus(),this.$backup.setAttribute("tabindex","-1")):(this.$backup.setAttribute("tabindex","0"),this.$backup.focus())}onFocusIn(){this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}updateFocused(e){C0(()=>{this.focused!==e&&(this._focused=e,this.render())},0,this.debounceId)}render(){this.$start.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.$end.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.focused?this.setAttribute("focused",""):this.removeAttribute("focused")}}window.customElements.define("focus-trap",T0);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class fa extends Ps{constructor(e){if(super(e),this.it=se,e.type!==pt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===se||e==null)return this._t=void 0,this.it=e;if(e===Ve)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}fa.directiveName="unsafeHTML",fa.resultType=1;const k0=Fs(fa);/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */const{entries:Zc,setPrototypeOf:yl,isFrozen:_0,getPrototypeOf:E0,getOwnPropertyDescriptor:A0}=Object;let{freeze:Me,seal:je,create:Jc}=Object,{apply:ma,construct:ga}=typeof Reflect<"u"&&Reflect;Me||(Me=function(e){return e});je||(je=function(e){return e});ma||(ma=function(e,t,i){return e.apply(t,i)});ga||(ga=function(e,t){return new e(...t)});const Ws=De(Array.prototype.forEach),M0=De(Array.prototype.lastIndexOf),wl=De(Array.prototype.pop),Xi=De(Array.prototype.push),D0=De(Array.prototype.splice),eo=De(String.prototype.toLowerCase),fr=De(String.prototype.toString),$l=De(String.prototype.match),Zi=De(String.prototype.replace),F0=De(String.prototype.indexOf),P0=De(String.prototype.trim),Xe=De(Object.prototype.hasOwnProperty),Ee=De(RegExp.prototype.test),Ji=L0(TypeError);function De(o){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),s=1;s<t;s++)i[s-1]=arguments[s];return ma(o,e,i)}}function L0(o){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return ga(o,t)}}function V(o,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:eo;yl&&yl(o,null);let i=e.length;for(;i--;){let s=e[i];if(typeof s=="string"){const r=t(s);r!==s&&(_0(e)||(e[i]=r),s=r)}o[s]=!0}return o}function O0(o){for(let e=0;e<o.length;e++)Xe(o,e)||(o[e]=null);return o}function jt(o){const e=Jc(null);for(const[t,i]of Zc(o))Xe(o,t)&&(Array.isArray(i)?e[t]=O0(i):i&&typeof i=="object"&&i.constructor===Object?e[t]=jt(i):e[t]=i);return e}function es(o,e){for(;o!==null;){const i=A0(o,e);if(i){if(i.get)return De(i.get);if(typeof i.value=="function")return De(i.value)}o=E0(o)}function t(){return null}return t}const Sl=Me(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),mr=Me(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),gr=Me(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),B0=Me(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),vr=Me(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),R0=Me(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),xl=Me(["#text"]),Cl=Me(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),br=Me(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Tl=Me(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),js=Me(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),z0=je(/\{\{[\w\W]*|[\w\W]*\}\}/gm),I0=je(/<%[\w\W]*|[\w\W]*%>/gm),N0=je(/\$\{[\w\W]*/gm),U0=je(/^data-[\-\w.\u00B7-\uFFFF]+$/),H0=je(/^aria-[\-\w]+$/),ed=je(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),V0=je(/^(?:\w+script|data):/i),W0=je(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),td=je(/^html$/i),j0=je(/^[a-z][.\w]*(-[.\w]+)+$/i);var kl=Object.freeze({__proto__:null,ARIA_ATTR:H0,ATTR_WHITESPACE:W0,CUSTOM_ELEMENT:j0,DATA_ATTR:U0,DOCTYPE_NAME:td,ERB_EXPR:I0,IS_ALLOWED_URI:ed,IS_SCRIPT_OR_DATA:V0,MUSTACHE_EXPR:z0,TMPLIT_EXPR:N0});const ts={element:1,text:3,progressingInstruction:7,comment:8,document:9},q0=function(){return typeof window>"u"?null:window},G0=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null;const s="data-tt-policy-suffix";t&&t.hasAttribute(s)&&(i=t.getAttribute(s));const r="dompurify"+(i?"#"+i:"");try{return e.createPolicy(r,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+r+" could not be created."),null}},_l=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function id(){let o=arguments.length>0&&arguments[0]!==void 0?arguments[0]:q0();const e=R=>id(R);if(e.version="3.2.4",e.removed=[],!o||!o.document||o.document.nodeType!==ts.document||!o.Element)return e.isSupported=!1,e;let{document:t}=o;const i=t,s=i.currentScript,{DocumentFragment:r,HTMLTemplateElement:a,Node:l,Element:d,NodeFilter:h,NamedNodeMap:p=o.NamedNodeMap||o.MozNamedAttrMap,HTMLFormElement:m,DOMParser:g,trustedTypes:b}=o,$=d.prototype,C=es($,"cloneNode"),M=es($,"remove"),P=es($,"nextSibling"),F=es($,"childNodes"),O=es($,"parentNode");if(typeof a=="function"){const R=t.createElement("template");R.content&&R.content.ownerDocument&&(t=R.content.ownerDocument)}let N,K="";const{implementation:ue,createNodeIterator:ke,createDocumentFragment:Oe,getElementsByTagName:Ye}=t,{importNode:Bt}=i;let ce=_l();e.isSupported=typeof Zc=="function"&&typeof O=="function"&&ue&&ue.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:gt,ERB_EXPR:ae,TMPLIT_EXPR:fe,DATA_ATTR:Qe,ARIA_ATTR:li,IS_SCRIPT_OR_DATA:Ls,ATTR_WHITESPACE:Ni,CUSTOM_ELEMENT:gd}=kl;let{IS_ALLOWED_URI:Ja}=kl,ye=null;const en=V({},[...Sl,...mr,...gr,...vr,...xl]);let $e=null;const tn=V({},[...Cl,...br,...Tl,...js]);let de=Object.seal(Jc(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ui=null,zo=null,sn=!0,Io=!0,on=!1,rn=!0,ci=!1,No=!0,Rt=!1,Uo=!1,Ho=!1,di=!1,Os=!1,Bs=!1,an=!0,nn=!1;const vd="user-content-";let Vo=!0,Hi=!1,hi={},pi=null;const ln=V({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let cn=null;const dn=V({},["audio","video","img","source","image","track"]);let Wo=null;const hn=V({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Rs="http://www.w3.org/1998/Math/MathML",zs="http://www.w3.org/2000/svg",vt="http://www.w3.org/1999/xhtml";let ui=vt,jo=!1,qo=null;const bd=V({},[Rs,zs,vt],fr);let Is=V({},["mi","mo","mn","ms","mtext"]),Ns=V({},["annotation-xml"]);const yd=V({},["title","style","font","a","script"]);let Vi=null;const wd=["application/xhtml+xml","text/html"],$d="text/html";let we=null,fi=null;const Sd=t.createElement("form"),pn=function(v){return v instanceof RegExp||v instanceof Function},Go=function(){let v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(fi&&fi===v)){if((!v||typeof v!="object")&&(v={}),v=jt(v),Vi=wd.indexOf(v.PARSER_MEDIA_TYPE)===-1?$d:v.PARSER_MEDIA_TYPE,we=Vi==="application/xhtml+xml"?fr:eo,ye=Xe(v,"ALLOWED_TAGS")?V({},v.ALLOWED_TAGS,we):en,$e=Xe(v,"ALLOWED_ATTR")?V({},v.ALLOWED_ATTR,we):tn,qo=Xe(v,"ALLOWED_NAMESPACES")?V({},v.ALLOWED_NAMESPACES,fr):bd,Wo=Xe(v,"ADD_URI_SAFE_ATTR")?V(jt(hn),v.ADD_URI_SAFE_ATTR,we):hn,cn=Xe(v,"ADD_DATA_URI_TAGS")?V(jt(dn),v.ADD_DATA_URI_TAGS,we):dn,pi=Xe(v,"FORBID_CONTENTS")?V({},v.FORBID_CONTENTS,we):ln,Ui=Xe(v,"FORBID_TAGS")?V({},v.FORBID_TAGS,we):{},zo=Xe(v,"FORBID_ATTR")?V({},v.FORBID_ATTR,we):{},hi=Xe(v,"USE_PROFILES")?v.USE_PROFILES:!1,sn=v.ALLOW_ARIA_ATTR!==!1,Io=v.ALLOW_DATA_ATTR!==!1,on=v.ALLOW_UNKNOWN_PROTOCOLS||!1,rn=v.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ci=v.SAFE_FOR_TEMPLATES||!1,No=v.SAFE_FOR_XML!==!1,Rt=v.WHOLE_DOCUMENT||!1,di=v.RETURN_DOM||!1,Os=v.RETURN_DOM_FRAGMENT||!1,Bs=v.RETURN_TRUSTED_TYPE||!1,Ho=v.FORCE_BODY||!1,an=v.SANITIZE_DOM!==!1,nn=v.SANITIZE_NAMED_PROPS||!1,Vo=v.KEEP_CONTENT!==!1,Hi=v.IN_PLACE||!1,Ja=v.ALLOWED_URI_REGEXP||ed,ui=v.NAMESPACE||vt,Is=v.MATHML_TEXT_INTEGRATION_POINTS||Is,Ns=v.HTML_INTEGRATION_POINTS||Ns,de=v.CUSTOM_ELEMENT_HANDLING||{},v.CUSTOM_ELEMENT_HANDLING&&pn(v.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=v.CUSTOM_ELEMENT_HANDLING.tagNameCheck),v.CUSTOM_ELEMENT_HANDLING&&pn(v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=v.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),v.CUSTOM_ELEMENT_HANDLING&&typeof v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=v.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ci&&(Io=!1),Os&&(di=!0),hi&&(ye=V({},xl),$e=[],hi.html===!0&&(V(ye,Sl),V($e,Cl)),hi.svg===!0&&(V(ye,mr),V($e,br),V($e,js)),hi.svgFilters===!0&&(V(ye,gr),V($e,br),V($e,js)),hi.mathMl===!0&&(V(ye,vr),V($e,Tl),V($e,js))),v.ADD_TAGS&&(ye===en&&(ye=jt(ye)),V(ye,v.ADD_TAGS,we)),v.ADD_ATTR&&($e===tn&&($e=jt($e)),V($e,v.ADD_ATTR,we)),v.ADD_URI_SAFE_ATTR&&V(Wo,v.ADD_URI_SAFE_ATTR,we),v.FORBID_CONTENTS&&(pi===ln&&(pi=jt(pi)),V(pi,v.FORBID_CONTENTS,we)),Vo&&(ye["#text"]=!0),Rt&&V(ye,["html","head","body"]),ye.table&&(V(ye,["tbody"]),delete Ui.tbody),v.TRUSTED_TYPES_POLICY){if(typeof v.TRUSTED_TYPES_POLICY.createHTML!="function")throw Ji('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof v.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Ji('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=v.TRUSTED_TYPES_POLICY,K=N.createHTML("")}else N===void 0&&(N=G0(b,s)),N!==null&&typeof K=="string"&&(K=N.createHTML(""));Me&&Me(v),fi=v}},un=V({},[...mr,...gr,...B0]),fn=V({},[...vr,...R0]),xd=function(v){let k=O(v);(!k||!k.tagName)&&(k={namespaceURI:ui,tagName:"template"});const B=eo(v.tagName),ie=eo(k.tagName);return qo[v.namespaceURI]?v.namespaceURI===zs?k.namespaceURI===vt?B==="svg":k.namespaceURI===Rs?B==="svg"&&(ie==="annotation-xml"||Is[ie]):!!un[B]:v.namespaceURI===Rs?k.namespaceURI===vt?B==="math":k.namespaceURI===zs?B==="math"&&Ns[ie]:!!fn[B]:v.namespaceURI===vt?k.namespaceURI===zs&&!Ns[ie]||k.namespaceURI===Rs&&!Is[ie]?!1:!fn[B]&&(yd[B]||!un[B]):!!(Vi==="application/xhtml+xml"&&qo[v.namespaceURI]):!1},ct=function(v){Xi(e.removed,{element:v});try{O(v).removeChild(v)}catch{M(v)}},Us=function(v,k){try{Xi(e.removed,{attribute:k.getAttributeNode(v),from:k})}catch{Xi(e.removed,{attribute:null,from:k})}if(k.removeAttribute(v),v==="is")if(di||Os)try{ct(k)}catch{}else try{k.setAttribute(v,"")}catch{}},mn=function(v){let k=null,B=null;if(Ho)v="<remove></remove>"+v;else{const Se=$l(v,/^[\r\n\t ]+/);B=Se&&Se[0]}Vi==="application/xhtml+xml"&&ui===vt&&(v='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+v+"</body></html>");const ie=N?N.createHTML(v):v;if(ui===vt)try{k=new g().parseFromString(ie,Vi)}catch{}if(!k||!k.documentElement){k=ue.createDocument(ui,"template",null);try{k.documentElement.innerHTML=jo?K:ie}catch{}}const Ce=k.body||k.documentElement;return v&&B&&Ce.insertBefore(t.createTextNode(B),Ce.childNodes[0]||null),ui===vt?Ye.call(k,Rt?"html":"body")[0]:Rt?k.documentElement:Ce},gn=function(v){return ke.call(v.ownerDocument||v,v,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},Yo=function(v){return v instanceof m&&(typeof v.nodeName!="string"||typeof v.textContent!="string"||typeof v.removeChild!="function"||!(v.attributes instanceof p)||typeof v.removeAttribute!="function"||typeof v.setAttribute!="function"||typeof v.namespaceURI!="string"||typeof v.insertBefore!="function"||typeof v.hasChildNodes!="function")},vn=function(v){return typeof l=="function"&&v instanceof l};function bt(R,v,k){Ws(R,B=>{B.call(e,v,k,fi)})}const bn=function(v){let k=null;if(bt(ce.beforeSanitizeElements,v,null),Yo(v))return ct(v),!0;const B=we(v.nodeName);if(bt(ce.uponSanitizeElement,v,{tagName:B,allowedTags:ye}),v.hasChildNodes()&&!vn(v.firstElementChild)&&Ee(/<[/\w]/g,v.innerHTML)&&Ee(/<[/\w]/g,v.textContent)||v.nodeType===ts.progressingInstruction||No&&v.nodeType===ts.comment&&Ee(/<[/\w]/g,v.data))return ct(v),!0;if(!ye[B]||Ui[B]){if(!Ui[B]&&wn(B)&&(de.tagNameCheck instanceof RegExp&&Ee(de.tagNameCheck,B)||de.tagNameCheck instanceof Function&&de.tagNameCheck(B)))return!1;if(Vo&&!pi[B]){const ie=O(v)||v.parentNode,Ce=F(v)||v.childNodes;if(Ce&&ie){const Se=Ce.length;for(let Be=Se-1;Be>=0;--Be){const dt=C(Ce[Be],!0);dt.__removalCount=(v.__removalCount||0)+1,ie.insertBefore(dt,P(v))}}}return ct(v),!0}return v instanceof d&&!xd(v)||(B==="noscript"||B==="noembed"||B==="noframes")&&Ee(/<\/no(script|embed|frames)/i,v.innerHTML)?(ct(v),!0):(ci&&v.nodeType===ts.text&&(k=v.textContent,Ws([gt,ae,fe],ie=>{k=Zi(k,ie," ")}),v.textContent!==k&&(Xi(e.removed,{element:v.cloneNode()}),v.textContent=k)),bt(ce.afterSanitizeElements,v,null),!1)},yn=function(v,k,B){if(an&&(k==="id"||k==="name")&&(B in t||B in Sd))return!1;if(!(Io&&!zo[k]&&Ee(Qe,k))){if(!(sn&&Ee(li,k))){if(!$e[k]||zo[k]){if(!(wn(v)&&(de.tagNameCheck instanceof RegExp&&Ee(de.tagNameCheck,v)||de.tagNameCheck instanceof Function&&de.tagNameCheck(v))&&(de.attributeNameCheck instanceof RegExp&&Ee(de.attributeNameCheck,k)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(k))||k==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&Ee(de.tagNameCheck,B)||de.tagNameCheck instanceof Function&&de.tagNameCheck(B))))return!1}else if(!Wo[k]){if(!Ee(Ja,Zi(B,Ni,""))){if(!((k==="src"||k==="xlink:href"||k==="href")&&v!=="script"&&F0(B,"data:")===0&&cn[v])){if(!(on&&!Ee(Ls,Zi(B,Ni,"")))){if(B)return!1}}}}}}return!0},wn=function(v){return v!=="annotation-xml"&&$l(v,gd)},$n=function(v){bt(ce.beforeSanitizeAttributes,v,null);const{attributes:k}=v;if(!k||Yo(v))return;const B={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:$e,forceKeepAttr:void 0};let ie=k.length;for(;ie--;){const Ce=k[ie],{name:Se,namespaceURI:Be,value:dt}=Ce,Wi=we(Se);let _e=Se==="value"?dt:P0(dt);if(B.attrName=Wi,B.attrValue=_e,B.keepAttr=!0,B.forceKeepAttr=void 0,bt(ce.uponSanitizeAttribute,v,B),_e=B.attrValue,nn&&(Wi==="id"||Wi==="name")&&(Us(Se,v),_e=vd+_e),No&&Ee(/((--!?|])>)|<\/(style|title)/i,_e)){Us(Se,v);continue}if(B.forceKeepAttr||(Us(Se,v),!B.keepAttr))continue;if(!rn&&Ee(/\/>/i,_e)){Us(Se,v);continue}ci&&Ws([gt,ae,fe],xn=>{_e=Zi(_e,xn," ")});const Sn=we(v.nodeName);if(yn(Sn,Wi,_e)){if(N&&typeof b=="object"&&typeof b.getAttributeType=="function"&&!Be)switch(b.getAttributeType(Sn,Wi)){case"TrustedHTML":{_e=N.createHTML(_e);break}case"TrustedScriptURL":{_e=N.createScriptURL(_e);break}}try{Be?v.setAttributeNS(Be,Se,_e):v.setAttribute(Se,_e),Yo(v)?ct(v):wl(e.removed)}catch{}}}bt(ce.afterSanitizeAttributes,v,null)},Cd=function R(v){let k=null;const B=gn(v);for(bt(ce.beforeSanitizeShadowDOM,v,null);k=B.nextNode();)bt(ce.uponSanitizeShadowNode,k,null),bn(k),$n(k),k.content instanceof r&&R(k.content);bt(ce.afterSanitizeShadowDOM,v,null)};return e.sanitize=function(R){let v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},k=null,B=null,ie=null,Ce=null;if(jo=!R,jo&&(R="<!-->"),typeof R!="string"&&!vn(R))if(typeof R.toString=="function"){if(R=R.toString(),typeof R!="string")throw Ji("dirty is not a string, aborting")}else throw Ji("toString is not a function");if(!e.isSupported)return R;if(Uo||Go(v),e.removed=[],typeof R=="string"&&(Hi=!1),Hi){if(R.nodeName){const dt=we(R.nodeName);if(!ye[dt]||Ui[dt])throw Ji("root node is forbidden and cannot be sanitized in-place")}}else if(R instanceof l)k=mn("<!---->"),B=k.ownerDocument.importNode(R,!0),B.nodeType===ts.element&&B.nodeName==="BODY"||B.nodeName==="HTML"?k=B:k.appendChild(B);else{if(!di&&!ci&&!Rt&&R.indexOf("<")===-1)return N&&Bs?N.createHTML(R):R;if(k=mn(R),!k)return di?null:Bs?K:""}k&&Ho&&ct(k.firstChild);const Se=gn(Hi?R:k);for(;ie=Se.nextNode();)bn(ie),$n(ie),ie.content instanceof r&&Cd(ie.content);if(Hi)return R;if(di){if(Os)for(Ce=Oe.call(k.ownerDocument);k.firstChild;)Ce.appendChild(k.firstChild);else Ce=k;return($e.shadowroot||$e.shadowrootmode)&&(Ce=Bt.call(i,Ce,!0)),Ce}let Be=Rt?k.outerHTML:k.innerHTML;return Rt&&ye["!doctype"]&&k.ownerDocument&&k.ownerDocument.doctype&&k.ownerDocument.doctype.name&&Ee(td,k.ownerDocument.doctype.name)&&(Be="<!DOCTYPE "+k.ownerDocument.doctype.name+`>
`+Be),ci&&Ws([gt,ae,fe],dt=>{Be=Zi(Be,dt," ")}),N&&Bs?N.createHTML(Be):Be},e.setConfig=function(){let R=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};Go(R),Uo=!0},e.clearConfig=function(){fi=null,Uo=!1},e.isValidAttribute=function(R,v,k){fi||Go({});const B=we(R),ie=we(v);return yn(B,ie,k)},e.addHook=function(R,v){typeof v=="function"&&Xi(ce[R],v)},e.removeHook=function(R,v){if(v!==void 0){const k=M0(ce[R],v);return k===-1?void 0:D0(ce[R],k,1)[0]}return wl(ce[R])},e.removeHooks=function(R){ce[R]=[]},e.removeAllHooks=function(){ce=_l()},e}var to=id();let $o=class extends pe{constructor(){super(...arguments);c(this,"collectionTitles");c(this,"collectionLinks",[])}render(){return f`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize==="mobile"?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){return f`
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
    `}get desktopTemplate(){return f`
      <div id="list-line-left">${this.imageBlockTemplate}</div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `}get imageBlockTemplate(){var s;if(!this.model)return y;const t=this.model.mediatype==="collection",i=this.displayValueProvider.itemPageUrl(this.model.identifier,t);return f`<a
      id="image-link"
      title=${_(ut`View ${(s=this.model)==null?void 0:s.title}`)}
      href=${i}
    >
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isCompactTile=${!1}
        .isListTile=${!0}
        .viewSize=${this.classSize}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    </a> `}get detailsTemplate(){return f`
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
    `}get iconRightTemplate(){var t;return f`
      <a
        id="icon-right"
        href=${this.mediatypeURL}
        title=${_(ut`See more: ${(t=this.model)==null?void 0:t.mediatype}`)}
      >
        <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
      </a>
    `}get titleTemplate(){var t,i;return(t=this.model)!=null&&t.title?(i=this.model)!=null&&i.href?f`<a href="${this.baseNavigationUrl}${this.model.href}"
          >${this.model.title??this.model.identifier}</a
        >`:this.detailsLink(this.model.identifier,this.model.title,this.model.mediatype==="collection"):y}get itemLineTemplate(){const t=this.sourceTemplate,i=this.volumeTemplate,s=this.issueTemplate;return!t&&!i&&!s?y:f` <div id="item-line">${t} ${i} ${s}</div> `}get sourceTemplate(){var t;return(t=this.model)!=null&&t.source?f`
      <div id="source" class="metadata">
        ${this.labelTemplate(_("Source"))}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:y}get volumeTemplate(){var t;return this.metadataTemplate((t=this.model)==null?void 0:t.volume,_("Volume"))}get issueTemplate(){var t;return this.metadataTemplate((t=this.model)==null?void 0:t.issue,_("Issue"))}get creatorTemplate(){var t,i;return((t=this.model)==null?void 0:t.mediatype)==="account"?f`
        <div id="creator" class="metadata">
          <span class="label"
            >${this.displayValueProvider.accountLabel??y}</span
          >
        </div>
      `:!((i=this.model)!=null&&i.creators)||this.model.creators.length===0?y:f`
      <div id="creator" class="metadata">
        ${this.labelTemplate(_("By"))}
        ${Zs(ti(this.model.creators,s=>this.searchLink("creator",s)),", ")}
      </div>
    `}get datePublishedTemplate(){var s;const t=(s=this.model)==null?void 0:s.datePublished;let i="long";return Ga(t)&&(i="year-only"),this.metadataTemplate(this.getFormattedDate(t,i),_("Published"))}get dateSortByTemplate(){return this.effectiveSort&&(this.effectiveSort.field==="addeddate"||this.effectiveSort.field==="reviewdate"||this.effectiveSort.field==="publicdate")?this.metadataTemplate(this.getFormattedDate(this.date,"long"),this.displayValueProvider.dateLabel):y}get viewsTemplate(){var i,s,r,a;const t=((i=this.effectiveSort)==null?void 0:i.field)==="week"?(s=this.model)==null?void 0:s.weeklyViewCount:(r=this.model)==null?void 0:r.viewCount;return t==null?y:((a=this.model)==null?void 0:a.mediatype)==="search"?this.metadataTemplate("(Favorited search query)",""):this.metadataTemplate(`${Ya(t,this.formatSize)}`,_("Views"))}get ratingTemplate(){var t;return this.metadataTemplate((t=this.model)==null?void 0:t.averageRating,_("Avg Rating"))}get reviewsTemplate(){var t;return this.metadataTemplate((t=this.model)==null?void 0:t.commentCount,_("Reviews"))}get topicsTemplate(){var t;return!((t=this.model)!=null&&t.subjects)||this.model.subjects.length===0?y:f`
      <div id="topics" class="metadata">
        ${this.labelTemplate(_("Topics"))}
        ${Zs(ti(this.model.subjects,i=>this.searchLink("subject",i)),", ")}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?y:f`
      <div id="collections" class="metadata">
        ${this.labelTemplate(_("Collections"))}
        ${Zs(this.collectionLinks,", ")}
      </div>
    `}get descriptionTemplate(){var t,i;return this.metadataTemplate(k0(to.sanitize(((i=(t=this.model)==null?void 0:t.description)==null?void 0:i.replace(/\n/g," "))??"")),"","description")}get reviewBlockTemplate(){var r;if(!((r=this.model)!=null&&r.review))return y;const{reviewtitle:t,reviewbody:i,stars:s}=this.model.review;return f`
      <review-block
        viewsize="list"
        title=${Re(t)}
        body=${Re(i)}
        starRating=${Re(s)}
      >
      </review-block>
    `}get textSnippetsTemplate(){var t;return this.hasSnippets?f`<text-snippet-block
      viewsize="list"
      .snippets=${(t=this.model)==null?void 0:t.snippets}
    ></text-snippet-block>`:y}get hasSnippets(){var t,i;return!!((i=(t=this.model)==null?void 0:t.snippets)!=null&&i.length)}get webArchivesCaptureDatesTemplate(){var t;return!((t=this.model)!=null&&t.captureDates)||!this.model.title?y:f`
      <ul class="capture-dates">
        ${ti(this.model.captureDates,i=>f`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,i)}
            </li>`)}
      </ul>
    `}metadataTemplate(t,i="",s){return t?f`
      <div id=${Re(s)} class="metadata">
        ${this.labelTemplate(i)} ${t}
      </div>
    `:y}labelTemplate(t){return f` ${t?f`<span class="label">${t}: </span>`:y}`}searchLink(t,i){if(!t||!i)return y;const s=encodeURIComponent(`${t}:"${i}"`);return f`<a
      href="${this.baseNavigationUrl}/search?query=${s}"
      rel="nofollow"
    >
      ${to.sanitize(i)}</a
    >`}detailsLink(t,i,s=!1){if(!t)return y;const r=i??t,a=this.displayValueProvider.itemPageUrl(t,s);return f`<a href=${a}> ${to.sanitize(r)} </a>`}get mediatypeURL(){var t;if(this.baseNavigationUrl===void 0||!((t=this.model)!=null&&t.mediatype))return y;switch(this.model.mediatype){case"collection":return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case"account":return y;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(t){(t.has("model")||t.has("collectionTitles"))&&this.buildCollectionLinks()}async buildCollectionLinks(){var i,s;if(!((i=this.model)!=null&&i.collections)||this.model.collections.length===0)return;this.collectionLinks=[];const t=[];for(const r of this.model.collections)!Oo[r]&&!r.startsWith("fav-")&&t.push(this.detailsLink(r,((s=this.collectionTitles)==null?void 0:s.get(r))??r,!0));this.collectionLinks=t}get date(){var t,i,s,r,a;switch((t=this.effectiveSort)==null?void 0:t.field){case"date":return(i=this.model)==null?void 0:i.datePublished;case"reviewdate":return(s=this.model)==null?void 0:s.dateReviewed;case"addeddate":return(r=this.model)==null?void 0:r.dateAdded;default:return(a=this.model)==null?void 0:a.dateArchived}}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return x`
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
    `}};n([u({type:Object})],$o.prototype,"collectionTitles",void 0);n([I()],$o.prototype,"collectionLinks",void 0);$o=n([H("tile-list")],$o);let at=class extends W{constructor(){super(...arguments);c(this,"model");c(this,"baseNavigationUrl");c(this,"baseImageUrl");c(this,"loggedIn",!1);c(this,"suppressBlurring",!1);c(this,"sortParam");c(this,"mobileBreakpoint");c(this,"currentWidth");c(this,"collectionTitles")}render(){return f`
      <div id="container">
        <focus-trap>
          ${this.headerTemplate}
          <div id="hover-tile-list">
            <tile-list
              .model=${this.model}
              .baseNavigationUrl=${this.baseNavigationUrl}
              .baseImageUrl=${this.baseImageUrl}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .sortParam=${this.sortParam}
              .collectionTitles=${this.collectionTitles}
              .mobileBreakpoint=${this.mobileBreakpoint}
              .currentWidth=${this.currentWidth}
            ></tile-list>
          </div>
        </focus-trap>
      </div>
    `}get headerTemplate(){var s,r,a,l;if(((r=(s=this.model)==null?void 0:s.collections)==null?void 0:r.length)===0)return y;let t="",i="";for(const d of((a=this.model)==null?void 0:a.collections)||[])if(!Oo[d]&&!d.startsWith("fav-")){t=((l=this.collectionTitles)==null?void 0:l.get(d))??d,i=d;break}return i?f`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${i}">
          <img
            src="${this.baseImageUrl}/services/img/${i}"
            alt=""
          /><span>${t}</span>
        </a>
      </div>
    `:y}static get styles(){const t=x`var(--hoverPaneHeaderBGColor, #edf0ff)`,i=x`var(--ia-theme-link-color, #4b64ff)`,s=x`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;return x`
      :host {
        margin: 0;
        border: 0;
        padding: 0;
        overflow: visible;
        color: inherit;
        background: none;
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity 0.1s ease-in,
          transform 0.1s ease-in;
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
        background: ${t};
      }
      #list-line-header a {
        display: flex;
        align-items: center;
        column-gap: 5px;
        height: 3.4rem;
        padding: 0 10px;
        border-radius: 4px 4px 0 0;
        width: fit-content;
        font-size: 1.4rem;
        color: ${i};
        font-family: ${s};
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
    `}};n([u({type:Object})],at.prototype,"model",void 0);n([u({type:String})],at.prototype,"baseNavigationUrl",void 0);n([u({type:String})],at.prototype,"baseImageUrl",void 0);n([u({type:Boolean})],at.prototype,"loggedIn",void 0);n([u({type:Boolean})],at.prototype,"suppressBlurring",void 0);n([u({type:Object})],at.prototype,"sortParam",void 0);n([u({type:Number})],at.prototype,"mobileBreakpoint",void 0);n([u({type:Number})],at.prototype,"currentWidth",void 0);n([u({type:Object})],at.prototype,"collectionTitles",void 0);at=n([H("tile-hover-pane")],at);let El=class extends pe{render(){var e,t;return f`
      <div id="list-line" class="${this.classSize}">
        <image-block
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isCompactTile=${!0}
          .isListTile=${!0}
          .viewSize=${this.classSize}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
        >
        </image-block>
        <a href=${this.href} id="title"
          >${to.sanitize(((e=this.model)==null?void 0:e.title)??"")}</a
        >
        <div id="creator">
          ${((t=this.model)==null?void 0:t.mediatype)==="account"?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">
          ${this.getFormattedDate(this.date,this.dateFormatSize)}
        </div>
        <div id="icon">
          <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
        </div>
        <div id="views">${Ya(this.views??0,this.formatSize)}</div>
      </div>
    `}get href(){var e;return!((e=this.model)!=null&&e.identifier)||this.baseNavigationUrl==null?y:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get creator(){return this.displayValueProvider.firstCreatorMatchingFilter??y}get date(){var e,t,i,s,r;switch((e=this.effectiveSort)==null?void 0:e.field){case"publicdate":return(t=this.model)==null?void 0:t.dateArchived;case"reviewdate":return(i=this.model)==null?void 0:i.dateReviewed;case"addeddate":return(s=this.model)==null?void 0:s.dateAdded;default:return(r=this.model)==null?void 0:r.datePublished}}get views(){var e,t,i;return((e=this.effectiveSort)==null?void 0:e.field)==="week"?(t=this.model)==null?void 0:t.weeklyViewCount:(i=this.model)==null?void 0:i.viewCount}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get dateFormatSize(){var e,t;return(!this.isSortedByDate||((e=this.effectiveSort)==null?void 0:e.field)==="date")&&Ga((t=this.model)==null?void 0:t.datePublished)?"year-only":this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.effectiveSort)==null?void 0:e.field)}static get styles(){return x`
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

      .mobile tile-mediatype-icon {
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
    `}};El=n([H("tile-list-compact")],El);let Al=class extends pe{render(){return f`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${_("Title")}</div>
        <div id="creator">${_("Creator")}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel||_("Published")}
        </div>
        <div id="icon">${_("Type")}</div>
        <div id="views">${_("Views")}</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return x`
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
    `}};Al=n([H("tile-list-compact-header")],Al);const Ml=(o,e=-1/0,t=1/0)=>Math.max(e,Math.min(o,t));class Y0{constructor(e,t={}){c(this,"host");c(this,"hoverPane");c(this,"hoverPaneProps");c(this,"mobileBreakpoint",600);c(this,"offsetX",-10);c(this,"offsetY",15);c(this,"showDelay",300);c(this,"hideDelay",100);c(this,"longPressDelay",600);c(this,"enableLongPress",!1);c(this,"hoverPaneState","hidden");c(this,"showTimer");c(this,"hideTimer");c(this,"longPressTimer");c(this,"forceTouchBackdrop",!1);c(this,"lastPointerClientPos",{x:0,y:0});c(this,"handleFocus",()=>{this.hoverPaneState==="hidden"&&this.showHoverPane({anchor:"host"})});c(this,"handleBlur",()=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane()});c(this,"handleKeyDown",e=>{(e.key==="ArrowDown"||e.key==="ArrowUp")&&this.hoverPaneState!=="hidden"&&e.preventDefault()});c(this,"handleKeyUp",e=>{if(this.hoverPaneState==="hidden"||!this.hoverPane)return;e.key==="ArrowDown"&&(this.hoverPane.tabIndex=1,this.hoverPane.focus());const t=e.key==="ArrowUp",i=e.key==="Escape"||e.key==="Esc";i&&this.fadeOutHoverPane(),(t||i)&&(this.hoverPane.tabIndex=-1,this.host.acquireFocus())});c(this,"handleMouseEnter",e=>{this.handleMouseMove(e)});c(this,"handleMouseMove",e=>{var t;clearTimeout(this.hideTimer),this.hoverPaneState==="fading-out"&&(this.hoverPaneState="shown",(t=this.hoverPane)==null||t.classList.add("fade-in")),this.hoverPaneState==="hidden"&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:e.clientX,y:e.clientY})});c(this,"handleMouseLeave",()=>{this.host.releaseFocus(),clearTimeout(this.showTimer),this.hoverPaneState!=="hidden"&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))});c(this,"handleTouchStart",e=>{clearTimeout(this.longPressTimer),e.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState==="hidden"&&this.showHoverPane()},this.longPressDelay),this.lastPointerClientPos={x:e.touches[0].clientX,y:e.touches[0].clientY})});c(this,"handleLongPressCancel",()=>{clearTimeout(this.longPressTimer)});c(this,"handleContextMenu",e=>{e.preventDefault()});c(this,"handleBackdropInteraction",e=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane(),e.stopPropagation()});this.host=e,this.mobileBreakpoint=t.mobileBreakpoint??this.mobileBreakpoint,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.showDelay=t.showDelay??this.showDelay,this.hideDelay=t.hideDelay??this.hideDelay,this.longPressDelay=t.longPressDelay??this.longPressDelay,this.enableLongPress=t.enableLongPress??this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){var e,t,i,s,r,a,l;return this.hoverPaneProps=this.host.getHoverPaneProps(),this.shouldRenderHoverPane?f`
          ${this.touchBackdropTemplate}
          <tile-hover-pane
            popover
            tabindex="-1"
            aria-describedby="tile-hover-pane-aria-description"
            .model=${(e=this.hoverPaneProps)==null?void 0:e.model}
            .baseNavigationUrl=${(t=this.hoverPaneProps)==null?void 0:t.baseNavigationUrl}
            .baseImageUrl=${(i=this.hoverPaneProps)==null?void 0:i.baseImageUrl}
            .loggedIn=${(s=this.hoverPaneProps)==null?void 0:s.loggedIn}
            .suppressBlurring=${(r=this.hoverPaneProps)==null?void 0:r.suppressBlurring}
            .sortParam=${(a=this.hoverPaneProps)==null?void 0:a.sortParam}
            .collectionTitles=${(l=this.hoverPaneProps)==null?void 0:l.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${window.innerWidth}
          ></tile-hover-pane>
          <div id="tile-hover-pane-aria-description" class="sr-only">
            ${_("Press Up Arrow to exit item detail preview")}
          </div>
        `:y}toggleHoverPane(e){this.hoverPaneState==="shown"?(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1):(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=e.enableTouchBackdrop??!1,this.showHoverPane())}get touchBackdropTemplate(){return this.showTouchBackdrop?f`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:y}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}get isTouchEnabled(){return"ontouchstart"in window&&window.matchMedia("(any-pointer: coarse)").matches}get shouldRenderHoverPane(){return this.hoverPaneState!=="hidden"}makePaneDesiredOffsets(e){var l;let[t,i]=[0,0];switch(e){case"host":const d=this.host.getBoundingClientRect();t=d.left+20,i=d.top+30;break;case"cursor":t=this.lastPointerClientPos.x,i=this.lastPointerClientPos.y;break}const s=t>window.innerWidth/2,r=i>window.innerHeight/2,a=(l=this.hoverPane)==null?void 0:l.getBoundingClientRect();return a&&(s&&(t-=a.width),r&&(i-=a.height),t+=(s?-1:1)*this.offsetX,i+=(r?-1:1)*this.offsetY,this.isMobileView&&(t=Ml(t,20,window.innerWidth-a.width-20),i=Ml(i,20,window.innerHeight-a.height-20))),t+=window.scrollX,i+=window.scrollY,{left:t,top:i}}attachListeners(){this.host.addEventListener("focus",this.handleFocus),this.host.addEventListener("blur",this.handleBlur),this.host.addEventListener("keyup",this.handleKeyUp),this.host.addEventListener("keydown",this.handleKeyDown),this.isHoverEnabled&&(this.host.addEventListener("mouseenter",this.handleMouseEnter),this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseleave",this.handleMouseLeave)),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener("touchstart",this.handleTouchStart),this.host.addEventListener("touchmove",this.handleLongPressCancel),this.host.addEventListener("touchend",this.handleLongPressCancel),this.host.addEventListener("touchcancel",this.handleLongPressCancel),this.host.addEventListener("contextmenu",this.handleContextMenu))}detachListeners(){this.host.removeEventListener("mouseenter",this.handleMouseEnter),this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseleave",this.handleMouseLeave),this.host.removeEventListener("touchstart",this.handleTouchStart),this.host.removeEventListener("touchmove",this.handleLongPressCancel),this.host.removeEventListener("touchend",this.handleLongPressCancel),this.host.removeEventListener("touchcancel",this.handleLongPressCancel),this.host.removeEventListener("contextmenu",this.handleContextMenu),this.host.removeEventListener("focus",this.handleFocus),this.host.removeEventListener("blur",this.handleBlur),this.host.removeEventListener("keyup",this.handleKeyUp),this.host.removeEventListener("keydown",this.handleKeyDown)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.host.acquireFocus(),this.showHoverPane()},this.showDelay)}async showHoverPane(e={anchor:"cursor"}){var t,i,s,r;this.hoverPaneState="shown",this.host.requestUpdate(),await this.host.updateComplete,(t=this.hoverPane)!=null&&t.isConnected&&((s=(i=this.hoverPane)==null?void 0:i.showPopover)==null||s.call(i),await new Promise(a=>{requestAnimationFrame(a)}),this.repositionHoverPane(e.anchor),(r=this.hoverPane)==null||r.classList.add("visible","fade-in"))}fadeOutHoverPane(){var e;this.hoverPaneState="fading-out",(e=this.hoverPane)==null||e.classList.remove("fade-in"),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState="hidden",this.hoverPane&&(this.hoverPane.tabIndex=-1),this.host.requestUpdate()},100)}repositionHoverPane(e){if(!this.hoverPane)return;const{top:t,left:i}=this.makePaneDesiredOffsets(e);this.hoverPane.style.top=`${t}px`,this.hoverPane.style.left=`${i}px`}}var va,Xt;let Ne=(Xt=class extends pe{constructor(){super(...arguments);c(this,"tileDisplayMode");c(this,"isManageView",!1);c(this,"resizeObserver");c(this,"collectionTitles");c(this,"showTvClips",!1);c(this,"simpleLayoutType","none");c(this,"enableHoverPane",!1);c(this,"manageCheckTitle",_("Remove this item from the list"));c(this,"hoverPaneController");c(this,"container");c(this,"hoverPane");c(this,"tileLinkElement")}acquireFocus(){var t;(t=this.tileLinkElement)==null||t.focus()}releaseFocus(){var t;(t=this.tileLinkElement)==null||t.blur()}render(){var s;const t=this.tileDisplayMode==="grid",i=((s=this.hoverPaneController)==null?void 0:s.getTemplate())??y;return f`
      <div id="container" class=${t?"hoverable":""}>
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
        ${this.manageCheckTemplate} ${i}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new Y0(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){const{currentWidth:t,sortParam:i,defaultSortParam:s,mobileBreakpoint:r}=this;return f`
      <tile-list-compact-header
        class="header"
        .currentWidth=${t}
        .sortParam=${i??s}
        .mobileBreakpoint=${r}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return f`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var t,i;return f`
      <a
        href=${this.linkTileHref}
        aria-label=${((t=this.model)==null?void 0:t.title)??"Untitled item"}
        aria-describedby="link-aria-description"
        aria-haspopup=${this.shouldPrepareHoverPane?"dialog":"false"}
        title=${this.shouldPrepareHoverPane?y:Re((i=this.model)==null?void 0:i.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
        class="tile-link"
      >
        ${this.tile}
      </a>
      <div id="link-aria-description" class="sr-only">
        ${_("Press Down Arrow to preview item details")}
      </div>
    `}get linkTileHref(){var t;return!((t=this.model)!=null&&t.identifier)||this.baseNavigationUrl==null?y:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get manageCheckTemplate(){var t;return!this.isManageView||this.tileDisplayMode!=="grid"?y:f`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          ?checked=${(t=this.model)==null?void 0:t.checked}
          @change=${this.handleLinkClicked}
        />
      </div>
    `}get shouldPrepareHoverPane(){var t,i;return this.enableHoverPane&&!!this.tileDisplayMode&&va.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]&&((t=this.model)==null?void 0:t.mediatype)!=="search"&&!((i=this.model)!=null&&i.captureDates)}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(t){this.currentWidth=t.contentRect.width,this.currentHeight=t.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(t){t==null||t.removeObserver({handler:this,target:this.container})}startResizeObservation(){var t;this.stopResizeObservation(this.resizeObserver),(t=this.resizeObserver)==null||t.addObserver({handler:this,target:this.container})}updated(t){if(t.has("resizeObserver")){const i=t.get("resizeObserver");this.stopResizeObservation(i),this.startResizeObservation()}}handleLinkClicked(t){this.isManageView&&(t.preventDefault(),this.model&&(this.model.checked=!this.model.checked)),this.dispatchEvent(new CustomEvent("resultSelected",{detail:this.model}))}handleLinkContextMenu(t){this.isManageView&&this.linkTileHref!==y&&(t.preventDefault(),window.open(this.linkTileHref,"_blank"))}tileInfoButtonPressed(t){var i;(i=this.hoverPaneController)==null||i.toggleHoverPane({coords:t.detail,enableTouchBackdrop:!0})}get tile(){const{model:t,collectionPagePath:i,baseNavigationUrl:s,currentWidth:r,currentHeight:a,sortParam:l,creatorFilter:d,mobileBreakpoint:h,defaultSortParam:p}=this;if(!t)return y;switch(this.tileDisplayMode){case"grid":switch(t.mediatype){case"collection":return f`<collection-tile
              .model=${t}
              .collectionPagePath=${i}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${a}
              .creatorFilter=${d}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;case"account":return f`<account-tile
              .model=${t}
              .collectionPagePath=${i}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${a}
              .creatorFilter=${d}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;case"search":return f`<search-tile
              .model=${t}
              .collectionPagePath=${i}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${a}
              .creatorFilter=${d}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!1}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </search-tile>`;default:return f`<item-tile
              .model=${t}
              .collectionPagePath=${i}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${l}
              .defaultSortParam=${p}
              .creatorFilter=${d}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .simpleLayoutType=${this.simpleLayoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${!this.isHoverEnabled}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case"list-compact":return f`<tile-list-compact
          .model=${t}
          .collectionPagePath=${i}
          .currentWidth=${r}
          .currentHeight=${a}
          .baseNavigationUrl=${s}
          .sortParam=${l}
          .defaultSortParam=${p}
          .creatorFilter=${d}
          .mobileBreakpoint=${h}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;case"list-detail":return f`<tile-list
          .model=${t}
          .collectionPagePath=${i}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${r}
          .currentHeight=${a}
          .baseNavigationUrl=${s}
          .sortParam=${l}
          .defaultSortParam=${p}
          .creatorFilter=${d}
          .mobileBreakpoint=${h}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list>`;default:return y}}static get styles(){return[lt,x`
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

        #container.hoverable a:focus,
        #container.hoverable a:hover {
          box-shadow: var(
            --tileHoverBoxShadow,
            0 0 6px 2px rgba(8, 8, 32, 0.8)
          );
          transition: box-shadow 0.1s ease;
        }

        a {
          display: block;
          height: 100%;
          color: unset;
          text-decoration: none;
          transition: transform 0.05s ease;
          border-radius: 4px;
          outline: none;
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
      `]}},va=Xt,c(Xt,"HOVER_PANE_DISPLAY_MODES",{grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1}),Xt);n([u({type:String})],Ne.prototype,"tileDisplayMode",void 0);n([u({type:Boolean})],Ne.prototype,"isManageView",void 0);n([u({type:Object})],Ne.prototype,"resizeObserver",void 0);n([u({type:Object})],Ne.prototype,"collectionTitles",void 0);n([u({type:Boolean})],Ne.prototype,"showTvClips",void 0);n([u({type:String})],Ne.prototype,"simpleLayoutType",void 0);n([u({type:Boolean})],Ne.prototype,"enableHoverPane",void 0);n([u({type:String})],Ne.prototype,"manageCheckTitle",void 0);n([Z("#container")],Ne.prototype,"container",void 0);n([Z("tile-hover-pane")],Ne.prototype,"hoverPane",void 0);n([Z(".tile-link")],Ne.prototype,"tileLinkElement",void 0);Ne=va=n([H("tile-dispatcher")],Ne);let Dl=class extends W{render(){return f` <div id="container"></div> `}static get styles(){return x`
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
    `}};Dl=n([H("collection-browser-loading-tile")],Dl);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var yr,wr;let Si=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};Si.finalized=!0,Si._$litElement$=!0,(yr=globalThis.litElementHydrateSupport)===null||yr===void 0||yr.call(globalThis,{LitElement:Si});const Fl=globalThis.litElementPolyfillSupport;Fl==null||Fl({LitElement:Si});((wr=globalThis.litElementVersions)!==null&&wr!==void 0?wr:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function mi(o,e,t){return o?e():t==null?void 0:t()}const Q0=ei`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,K0=ei`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let he=class extends Si{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])===null||e===void 0||e.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:i=void 0,id:s}=e;let r;const a=this.selectedOption===s?"selected":"";return i?r=L`<a
        href=${i}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:r=L`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,L`<li role="menuitem" class=${a}>${r}</li>`}optionClicked(e,t){var i;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(i=t.selectedHandler)===null||i===void 0||i.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return L`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${Q0}</slot>
      </span>
    `}get caretDownTemplate(){return L`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${K0}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?L`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:L`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${mi(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${mi(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:L``}get dropdownTemplate(){return this.isCustomList?L`<slot name="list"></slot>`:L`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?L`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:L``:L``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return L`
      <div class="ia-dropdown-group">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${mi(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${mi(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${mi(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${mi(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
        </div>

        <ul
          id="dropdown-main"
          class=${this.dropdownState}
          role="menu"
          ?popover=${this.usePopover}
        >
          ${this.dropdownTemplate}
        </ul>

        ${this.backdropTemplate}
      </div>
    `}static get styles(){const e=w`var(--dropdownBorderWidth, 1px)`,t=w`var(--dropdownBorderRadius, 4px)`,i=w`var(--dropdownBorderColor, #fff)`,s=w`var(--dropdownBgColor, #333)`,r=w`var(--dropdownTextColor, #fff)`,a=w`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=w`var(--dropdownSelectedBgColor, #fff)`;return w`
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

      .button-row {
        display: flex;
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
        -webkit-user-select: none !important;
        user-select: none !important;
      }

      .caret {
        /* Maintain centered caret position but with a full-height clickable region */
        display: flex;
        align-self: stretch;
        align-items: center;
        padding: var(--caretPadding, 0px);
      }

      button.caret {
        appearance: none;
        background: none;
        border: none;
        cursor: pointer;
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

      #dropdown-main.closed {
        visibility: hidden;
        height: 1px;
        width: 1px;
      }

      #dropdown-main {
        position: var(--dropdownListPosition, absolute);
        list-style: none;
        margin: var(--dropdownOffsetTop, 5px) 0 0 0;
        padding: 0;
        color: ${r};
        background: ${s};

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

      #dropdown-main li:hover {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
        list-style: none;
        cursor: pointer;
      }

      #dropdown-main li:hover:first-child {
        border-top-color: ${a};
      }

      ul#dropdown-main li:hover:last-child {
        border-bottom-color: ${a};
      }

      #dropdown-main li:hover:not(:first-child) {
        border-top: 0.5px solid var(--dropdownHoverTopBottomBorderColor, #333);
      }
      #dropdown-main li:hover:not(:last-child) {
        border-bottom: 0.5px solid
          var(--dropdownHoverTopBottomBorderColor, #333);
      }

      #dropdown-main li.selected:last-child {
        border-bottom-color: ${l};
      }

      #dropdown-main li.selected:first-child {
        border-top-color: ${l};
      }

      #dropdown-main li:hover > *,
      #dropdown-main li:focus-within > * {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
      }

      #dropdown-main li.selected > * {
        background-color: ${l};
        color: var(--dropdownSelectedTextColor, #2c2c2c);
      }

      #dropdown-main li {
        background: ${s};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${s};
        border-top: 0.5px solid ${s};
      }

      #dropdown-main li button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
        outline: inherit;
      }

      #dropdown-main li a {
        text-decoration: none;
        display: block;
        box-sizing: border-box;
      }

      #dropdown-main li:first-child {
        border-top-left-radius: var(--dropdownBorderTopLeftRadius, 4px);
        border-top-right-radius: var(--dropdownBorderTopRightRadius, 4px);
      }

      #dropdown-main li:last-child {
        border-bottom-right-radius: var(--dropdownBorderBottomRightRadius, 4px);
        border-bottom-left-radius: var(--dropdownBorderBottomLeftRadius, 4px);
      }

      /* cover the list with the label */
      #dropdown-main li > * > :first-child {
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

      #dropdown-main li > * {
        width: 100%;
        height: inherit;
        color: ${r};
        background: transparent;
        padding: 0;
      }
    `}};n([E({type:Boolean,reflect:!0})],he.prototype,"open",void 0);n([E({type:Boolean,reflect:!0})],he.prototype,"isDisabled",void 0);n([E({type:Boolean})],he.prototype,"displayCaret",void 0);n([E({type:Boolean})],he.prototype,"closeOnSelect",void 0);n([E({type:Boolean})],he.prototype,"openViaButton",void 0);n([E({type:Boolean})],he.prototype,"usePopover",void 0);n([E({type:Boolean})],he.prototype,"includeSelectedOption",void 0);n([E({type:String})],he.prototype,"selectedOption",void 0);n([E({attribute:!1})],he.prototype,"options",void 0);n([E({type:String})],he.prototype,"optionGroup",void 0);n([E({attribute:!1})],he.prototype,"optionSelected",void 0);n([E({type:Boolean,reflect:!0})],he.prototype,"isCustomList",void 0);n([E({type:Boolean,reflect:!0})],he.prototype,"hasCustomClickHandler",void 0);n([E({type:Boolean,reflect:!0})],he.prototype,"closeOnEscape",void 0);n([E({type:Boolean,reflect:!0})],he.prototype,"closeOnBackdropClick",void 0);n([Le(".ia-dropdown-group")],he.prototype,"container",void 0);n([Le("#dropdown-main")],he.prototype,"dropdownMenu",void 0);n([Le(".click-main")],he.prototype,"mainButton",void 0);n([Fc({slot:"dropdown-label"})],he.prototype,"mainButtonLabelSlotted",void 0);he=n([Ge("ia-dropdown")],he);let ba=class extends Si{render(){return L`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};ba.styles=w`
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
  `;ba=n([Ge("ia-icon-label")],ba);let ya=class extends W{constructor(){super(...arguments);c(this,"numResults",0)}render(){return f`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?"result":"results"}
        </div>
      </div>
    `}static get styles(){const t=x`var(--tooltipArrowSize, 5px)`,i=x`var(--tooltipArrowOffset, 0px)`;return x`
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${i});
        top: 0;
        width: 0;
        height: 0;
        margin-top: calc(-1 * ${t});
        margin-left: calc(-1 * ${t});
        border: ${t} solid transparent;
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
    `}};n([u({type:Number})],ya.prototype,"numResults",void 0);ya=n([H("alpha-bar-tooltip")],ya);var qr;let Lt=(qr=class extends W{constructor(){super(...arguments);c(this,"selectedLetter",null);c(this,"letterCounts");c(this,"ariaLandmarkLabel");c(this,"tooltipShown",!1);c(this,"hoveredLetter");c(this,"tooltip");c(this,"alphabet","ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""))}get selectedUppercaseLetter(){var t;return(t=this.selectedLetter)==null?void 0:t.toUpperCase()}render(){return f`
      <section id="container" aria-label=${this.ariaLandmarkLabel??y}>
        <ul>
          ${this.alphabet.map(t=>f`
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
    `}letterButtonTemplate(t){var s,r;const i=`${t}: ${((s=this.letterCounts)==null?void 0:s[t])??0} results`;return f`
      <button
        aria-label=${i}
        ?disabled=${!((r=this.letterCounts)!=null&&r[t])}
        @click=${()=>{this.letterClicked(t)}}
      >
        ${t}
      </button>
    `}tooltipTemplate(t){var i;return this.hoveredLetter!==t?y:this.tooltipShown?f`<alpha-bar-tooltip
          data-letter=${t}
          .numResults=${((i=this.letterCounts)==null?void 0:i[this.hoveredLetter])??0}
        ></alpha-bar-tooltip>`:y}letterClicked(t){t===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=t,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(t){var s;const i=t.target;if(i&&!this.tooltipShown){const r=((s=i.textContent)==null?void 0:s.trim())??void 0;this.tooltipShown=!0,this.hoveredLetter=r,await this.updateComplete,await new Promise(a=>{setTimeout(a,0)}),this.tooltip&&this.tooltip.dataset.letter===r&&this.positionTooltip(i)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(t){if(!this.tooltip)return;const i=this.tooltip.clientWidth;let r=t.clientWidth/2-i/2;const a=getComputedStyle(document.body),l=parseFloat(a.getPropertyValue("margin-left")),d=parseFloat(a.getPropertyValue("margin-right")),h=document.body.clientWidth+l+d,m=t.getBoundingClientRect().left+r,g=m+i,b=1;let $;m<b?$=m-b:g>h-b&&($=g-h+b),$&&(r-=$,this.tooltip.style.setProperty("--tooltipArrowOffset",`${$}px`)),this.tooltip.style.left=`${r}px`,this.tooltip.classList.add("fade-in")}},c(qr,"styles",x`
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
  `),qr);n([u({type:String})],Lt.prototype,"selectedLetter",void 0);n([u({type:Object})],Lt.prototype,"letterCounts",void 0);n([u({type:String})],Lt.prototype,"ariaLandmarkLabel",void 0);n([I()],Lt.prototype,"tooltipShown",void 0);n([I()],Lt.prototype,"hoveredLetter",void 0);n([Z("alpha-bar-tooltip")],Lt.prototype,"tooltip",void 0);Lt=n([H("alpha-bar")],Lt);const X0=f`
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
`,Z0=f`
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
`,J0=f`
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
`,ep=Y`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,tp=Y`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,ip=Y`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let J=class extends W{constructor(){super(...arguments);c(this,"displayMode");c(this,"defaultSortDirection",null);c(this,"defaultSortField",T.relevance);c(this,"defaultViewSort",T.weeklyview);c(this,"defaultDateSort",T.date);c(this,"sortDirection",null);c(this,"selectedSort",T.default);c(this,"selectedTitleFilter",null);c(this,"selectedCreatorFilter",null);c(this,"sortFieldAvailability",Lo);c(this,"enableSortOptionsSlot",!1);c(this,"suppressDisplayModes",!1);c(this,"prefixFilterCountMap");c(this,"resizeObserver");c(this,"lastSelectedViewSort",this.defaultViewSort);c(this,"lastSelectedDateSort",this.defaultDateSort);c(this,"alphaSelectorVisible",null);c(this,"dropdownBackdropVisible",!1);c(this,"desktopSortContainerWidth",0);c(this,"selectorBarContainerWidth",0);c(this,"desktopSortContainer");c(this,"sortSelectorContainer");c(this,"viewsDropdown");c(this,"dateDropdown");c(this,"mobileDropdown");c(this,"boundSortBarSelectorEscapeListener",t=>{t.key==="Escape"&&this.closeDropdowns()})}render(){return f`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <slot name="sort-options-left"></slot>
          <div id="sort-options">
            ${this.enableSortOptionsSlot?f`<slot name="sort-options"></slot>`:f`
                  <div class="sort-direction-container">
                    ${this.sortDirectionSelectorTemplate}
                  </div>
                  <span class="sort-by-text">${_("Sort by:")}</span>
                  <div id="sort-selector-container">
                    ${this.mobileSortSelectorTemplate}
                    ${this.desktopSortSelectorTemplate}
                  </div>
                `}
          </div>
          <slot name="sort-options-right"></slot>

          ${this.suppressDisplayModes?y:f`<div id="display-style-selector">
                ${this.displayOptionTemplate}
              </div>`}
        </section>

        ${this.dropdownBackdropVisible?this.dropdownBackdrop:y}
        ${this.alphaBarTemplate}
      </div>
    `}willUpdate(t){if(t.has("selectedSort")||t.has("defaultSortField")){if(this.selectedSort&&this.selectedSort!==T.default&&this.sortDirection===null){const i=Ae[this.finalizedSortField];this.sortDirection=i.defaultSortDirection}this.viewOptionSelected?this.lastSelectedViewSort=this.finalizedSortField:this.dateOptionSelected&&(this.lastSelectedDateSort=this.finalizedSortField)}t.has("defaultViewSort")&&(this.lastSelectedViewSort=this.defaultViewSort),t.has("defaultDateSort")&&(this.lastSelectedDateSort=this.defaultDateSort)}updated(t){if(t.has("displayMode")&&this.displayModeChanged(),t.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),t.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),t.has("dropdownBackdropVisible")&&this.setupEscapeListeners(),t.has("resizeObserver")||t.has("enableSortOptionsSlot")){const i=t.get("resizeObserver");i&&this.disconnectResizeObserver(i),this.setupResizeObserver()}}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener("keydown",this.boundSortBarSelectorEscapeListener):document.removeEventListener("keydown",this.boundSortBarSelectorEscapeListener)}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(t){this.sortSelectorContainer&&t.removeObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&t.removeObserver({target:this.desktopSortContainer,handler:this})}setupResizeObserver(){this.resizeObserver&&(this.sortSelectorContainer&&this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&this.resizeObserver.addObserver({target:this.desktopSortContainer,handler:this}))}handleResize(t){t.target===this.desktopSortContainer?this.desktopSortContainerWidth=t.contentRect.width:t.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=t.contentRect.width)}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSortContainerWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return y;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return y}get sortDirectionSelectorTemplate(){const i=`Change to ${this.sortDirection==="asc"?"descending":"ascending"} sort`;return f`
      <button
        class="sort-direction-selector"
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${i}</span>
        ${this.sortDirectionIcon}
      </button>
    `}get sortDirectionIcon(){return this.canChangeSortDirection?f`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection==="asc"?X0:Z0}
      </div>
    `:f`<div class="sort-direction-icon">${J0}</div>`}get desktopSortSelectorTemplate(){return f`
      <div
        id="desktop-sort-container"
        class=${this.mobileSelectorVisible?"hidden":"visible"}
      >
        <ul id="desktop-sort-selector">
          <li>${this.relevanceSortSelectorTemplate}</li>
          <li>${this.allViewsSortOptionsTemplate}</li>
          <li>${this.titleSortSelectorTemplate}</li>
          <li>${this.allDateSortOptionsTemplate}</li>
          <li>${this.creatorSortSelectorTemplate}</li>
        </ul>
      </div>
    `}get mobileSortSelectorTemplate(){const t=Object.values(Ae).filter(i=>i.shownInSortBar&&this.sortFieldAvailability[i.field]);return f`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${this.getSortDropdown({displayName:Ae[this.finalizedSortField].displayName,id:"mobile-dropdown",selected:!0,dropdownOptions:t.map(i=>this.getDropdownOption(i.field)),selectedOption:this.finalizedSortField,onOptionSelected:this.mobileSortChanged,onDropdownClick:()=>{this.dropdownBackdropVisible=this.mobileDropdown.open,this.mobileDropdown.classList.toggle("open",this.mobileDropdown.open)}})}
      </div>
    `}getSortSelectorButton(t,i){const s=this.finalizedSortField===t,r=Ae[t].displayName,a=(i==null?void 0:i.onSelected)??(()=>this.clearAlphaBarFilters());return f`
      <button
        class=${s?"selected":""}
        data-title=${r}
        @click=${l=>{l.preventDefault(),this.dropdownBackdropVisible=!1,this.finalizedSortField!==t&&(a==null||a(l),this.setSelectedSort(t))}}
      >
        ${r}
      </button>
    `}getSortDropdown(t){return f`
      <ia-dropdown
        id=${t.id}
        class=${t.selected?"selected":""}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${t.selected}
        .options=${t.dropdownOptions}
        .selectedOption=${t.selectedOption??""}
        @optionSelected=${t.onOptionSelected??y}
        @click=${t.onDropdownClick??y}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title=${t.displayName}
          @click=${t.onLabelInteraction??y}
          @keydown=${t.onLabelInteraction?i=>{var s;(i.key==="Enter"||i.key===" ")&&((s=t.onLabelInteraction)==null||s.call(t,i))}:y}
        >
          ${t.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(t){return{id:t,selectedHandler:()=>{this.selectDropdownSortField(t)},label:f`
        <span class="dropdown-option-label">
          ${Ae[t].displayName}
        </span>
      `}}dropdownOptionSelected(t){this.dropdownBackdropVisible=!1,this.clearAlphaBarFilters();const i=t.detail.option.id;this.setSelectedSort(i),this.viewOptionSelected?this.lastSelectedViewSort=i:this.dateOptionSelected&&(this.lastSelectedDateSort=i)}get relevanceSortSelectorTemplate(){return this.sortFieldAvailability.relevance?this.getSortSelectorButton(T.relevance):y}get viewsSortSelectorTemplate(){const{availableViewsFields:t}=this;return t.length<1?y:this.getSortSelectorButton(t[0])}get titleSortSelectorTemplate(){return this.sortFieldAvailability.title?this.getSortSelectorButton(T.title,{onSelected:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent()}}):y}get dateSortSelectorTemplate(){const{availableDateFields:t}=this;return t.length<1?y:this.getSortSelectorButton(t[0])}get creatorSortSelectorTemplate(){return this.sortFieldAvailability.creator?this.getSortSelectorButton(T.creator,{onSelected:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()}}):y}get viewsDropdownTemplate(){const t=dl.filter(i=>this.sortFieldAvailability[i]).map(i=>this.getDropdownOption(i));return this.getSortDropdown({displayName:this.viewSortDisplayName,id:"views-dropdown",selected:this.viewOptionSelected,dropdownOptions:t,selectedOption:this.viewOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.dateDropdown&&(this.dateDropdown.open=!1);const i=this.viewsDropdown;this.dropdownBackdropVisible=i.open,i.classList.toggle("open",i.open)},onLabelInteraction:i=>{var s;!((s=this.viewsDropdown)!=null&&s.open)&&!this.viewOptionSelected&&(i.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedViewSort))}})}get dateDropdownTemplate(){const t=hl.filter(i=>this.sortFieldAvailability[i]).map(i=>this.getDropdownOption(i));return this.getSortDropdown({displayName:this.dateSortDisplayName,id:"date-dropdown",selected:this.dateOptionSelected,dropdownOptions:t,selectedOption:this.dateOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.viewsDropdown&&(this.viewsDropdown.open=!1);const i=this.dateDropdown;this.dropdownBackdropVisible=i.open,i.classList.toggle("open",i.open)},onLabelInteraction:i=>{var s;!((s=this.dateDropdown)!=null&&s.open)&&!this.dateOptionSelected&&(i.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedDateSort))}})}get allViewsSortOptionsTemplate(){switch(this.availableViewsFields.length){case 0:return y;case 1:return this.viewsSortSelectorTemplate;default:return this.viewsDropdownTemplate}}get allDateSortOptionsTemplate(){switch(this.availableDateFields.length){case 0:return y;case 1:return this.dateSortSelectorTemplate;default:return this.dateDropdownTemplate}}mobileSortChanged(t){this.dropdownBackdropVisible=!1;const i=t.detail.option.id;this.setSelectedSort(i),this.alphaSelectorVisible=null,i!=="title"&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),i!=="creator"&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return f`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
            data-testid="grid-button"
          >
            ${ep}
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
            ${tp}
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
            ${ip}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return f`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `}closeDropdowns(){this.dropdownBackdropVisible=!1;const t=[this.viewsDropdown,this.dateDropdown,this.mobileDropdown];for(const i of t)i&&(i.open=!1,i.classList.remove("open"))}selectDropdownSortField(t){this.dropdownBackdropVisible=!1,this.setSelectedSort(t)}clearAlphaBarFilters(){this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()}setSortDirection(t){this.sortDirection=t,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection==="desc"?"asc":"desc")}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(t){this.selectedSort=t;const i=Ae[t];this.sortDirection=i.defaultSortDirection,this.emitSortChangedEvent()}get finalizedSortField(){return this.selectedSort===T.default?this.defaultSortField:this.selectedSort}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get canChangeSortDirection(){return Ae[this.finalizedSortField].canSetDirection}get dateOptionSelected(){return[T.datefavorited,T.datearchived,T.date,T.datereviewed,T.dateadded].includes(this.finalizedSortField)}get viewOptionSelected(){return[T.alltimeview,T.weeklyview].includes(this.finalizedSortField)}get dateSortDisplayName(){return Ae[this.lastSelectedDateSort].displayName}get viewSortDisplayName(){return Ae[this.lastSelectedViewSort].displayName}get availableViewsFields(){return dl.filter(t=>this.sortFieldAvailability[t])}get availableDateFields(){return hl.filter(t=>this.sortFieldAvailability[t])}get titleSelectorBar(){var t;return f` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${(t=this.prefixFilterCountMap)==null?void 0:t.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){var t;return f` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${(t=this.prefixFilterCountMap)==null?void 0:t.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(t){this.selectedTitleFilter=t.detail.selectedLetter??null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(t){this.selectedCreatorFilter=t.detail.selectedLetter??null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const t=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(t)}emitCreatorLetterChangedEvent(){const t=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(t)}displayModeChanged(){const t=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(t)}emitSortChangedEvent(){const t=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(t)}static get styles(){return[lt,x`
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
      `]}};n([u({type:String})],J.prototype,"displayMode",void 0);n([u({type:String})],J.prototype,"defaultSortDirection",void 0);n([u({type:String})],J.prototype,"defaultSortField",void 0);n([u({type:String})],J.prototype,"defaultViewSort",void 0);n([u({type:String})],J.prototype,"defaultDateSort",void 0);n([u({type:String})],J.prototype,"sortDirection",void 0);n([u({type:String})],J.prototype,"selectedSort",void 0);n([u({type:String})],J.prototype,"selectedTitleFilter",void 0);n([u({type:String})],J.prototype,"selectedCreatorFilter",void 0);n([u({type:Object})],J.prototype,"sortFieldAvailability",void 0);n([u({type:Boolean,reflect:!0})],J.prototype,"enableSortOptionsSlot",void 0);n([u({type:Boolean,reflect:!0})],J.prototype,"suppressDisplayModes",void 0);n([u({type:Object})],J.prototype,"prefixFilterCountMap",void 0);n([u({type:Object})],J.prototype,"resizeObserver",void 0);n([I()],J.prototype,"lastSelectedViewSort",void 0);n([I()],J.prototype,"lastSelectedDateSort",void 0);n([I()],J.prototype,"alphaSelectorVisible",void 0);n([I()],J.prototype,"dropdownBackdropVisible",void 0);n([I()],J.prototype,"desktopSortContainerWidth",void 0);n([I()],J.prototype,"selectorBarContainerWidth",void 0);n([Z("#desktop-sort-container")],J.prototype,"desktopSortContainer",void 0);n([Z("#sort-selector-container")],J.prototype,"sortSelectorContainer",void 0);n([Z("#views-dropdown")],J.prototype,"viewsDropdown",void 0);n([Z("#date-dropdown")],J.prototype,"dateDropdown",void 0);n([Z("#mobile-dropdown")],J.prototype,"mobileDropdown",void 0);J=n([H("sort-filter-bar")],J);class ii{constructor(e){var t,i,s,r,a,l,d;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(s=e==null?void 0:e.showProcessingIndicator)!==null&&s!==void 0?s:!1,this.processingImageMode=(r=e==null?void 0:e.processingImageMode)!==null&&r!==void 0?r:"complete",this.showCloseButton=(a=e==null?void 0:e.showCloseButton)!==null&&a!==void 0?a:!0,this.showHeaderLogo=(l=e==null?void 0:e.showHeaderLogo)!==null&&l!==void 0?l:!0,this.closeOnBackdropClick=(d=e==null?void 0:e.closeOnBackdropClick)!==null&&d!==void 0?d:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $r,Sr;let xi=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};xi.finalized=!0,xi._$litElement$=!0,($r=globalThis.litElementHydrateSupport)===null||$r===void 0||$r.call(globalThis,{LitElement:xi});const Pl=globalThis.litElementPolyfillSupport;Pl==null||Pl({LitElement:xi});((Sr=globalThis.litElementVersions)!==null&&Sr!==void 0?Sr:globalThis.litElementVersions=[]).push("3.3.3");function*Qa(o=document.activeElement){o!=null&&(yield o,"shadowRoot"in o&&o.shadowRoot&&o.shadowRoot.mode!=="closed"&&(yield*Qa(o.shadowRoot.activeElement)))}function sp(){return[...Qa()].pop()}const Ll=new WeakMap;function sd(o){let e=Ll.get(o);return e||(e=window.getComputedStyle(o,null),Ll.set(o,e)),e}function op(o){if("checkVisibility"in o&&typeof o.checkVisibility=="function")return o.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=sd(o);return e.visibility!=="hidden"&&e.display!=="none"}function rp(o){const e=sd(o),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:o.scrollHeight>o.clientHeight&&t==="auto"||o.scrollWidth>o.clientWidth&&i==="auto"}function ap(o){const e=o.tagName.toLowerCase(),t=Number(o.getAttribute("tabindex"));return o.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||o.hasAttribute("disabled")||o.closest("[inert]")||e==="input"&&o.getAttribute("type")==="radio"&&!o.hasAttribute("checked")||!op(o)?!1:(e==="audio"||e==="video")&&o.hasAttribute("controls")||o.hasAttribute("tabindex")||o.hasAttribute("contenteditable")&&o.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:rp(o)}function np(o,e){var t;return((t=o.getRootNode({composed:!0}))===null||t===void 0?void 0:t.host)!==e}function Ol(o){const e=new WeakMap,t=[];function i(s){if(s instanceof Element){if(s.hasAttribute("inert")||s.closest("[inert]")||e.has(s))return;e.set(s,!0),!t.includes(s)&&ap(s)&&t.push(s),s instanceof HTMLSlotElement&&np(s,o)&&s.assignedElements({flatten:!0}).forEach(r=>{i(r)}),s.shadowRoot!==null&&s.shadowRoot.mode==="open"&&i(s.shadowRoot)}for(const r of Array.from(s.children))i(r)}return i(o),t.sort((s,r)=>{const a=Number(s.getAttribute("tabindex"))||0;return(Number(r.getAttribute("tabindex"))||0)-a})}let is=[];class lp{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const s=sp();if(this.previousFocus=s,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const r=Ol(this.element);let a=r.findIndex(d=>d===s);this.previousFocus=this.currentFocus;const l=this.tabDirection==="forward"?1:-1;for(;;){a+l>=r.length?a=0:a+l<0?a=r.length-1:a+=l,this.previousFocus=this.currentFocus;const d=r[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||d&&this.possiblyHasTabbableChildren(d))return;t.preventDefault(),this.currentFocus=d,(i=this.currentFocus)===null||i===void 0||i.focus({preventScroll:!1});const h=[...Qa()];if(h.includes(this.currentFocus)||!h.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){is.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){is=is.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return is[is.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=Ol(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],s=this.tabDirection==="forward"?t:i;typeof(s==null?void 0:s.focus)=="function"&&(this.currentFocus=s,s.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var xr,Cr;let ms=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};ms.finalized=!0,ms._$litElement$=!0,(xr=globalThis.litElementHydrateSupport)===null||xr===void 0||xr.call(globalThis,{LitElement:ms});const Bl=globalThis.litElementPolyfillSupport;Bl==null||Bl({LitElement:ms});((Cr=globalThis.litElementVersions)!==null&&Cr!==void 0?Cr:globalThis.litElementVersions=[]).push("3.3.3");var Rl;(function(o){o.processing="processing",o.complete="complete"})(Rl||(Rl={}));let wa=class extends ms{constructor(){super(...arguments),this.mode="processing"}render(){return L`
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
    `}static get styles(){const e=w`var(--activityIndicatorCheckmarkColor, #31A481)`,t=w`var(--activityIndicatorCompletedRingColor, #31A481)`,i=w`var(--activityIndicatorLoadingRingColor, #333333)`,s=w`var(--activityIndicatorLoadingDotColor, #333333)`;return w`
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
        fill: ${s};
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
    `}};n([E({type:String})],wa.prototype,"mode",void 0);wa=n([Ge("ia-activity-indicator")],wa);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Tr,kr;let gs=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};gs.finalized=!0,gs._$litElement$=!0,(Tr=globalThis.litElementHydrateSupport)===null||Tr===void 0||Tr.call(globalThis,{LitElement:gs});const zl=globalThis.litElementPolyfillSupport;zl==null||zl({LitElement:gs});((kr=globalThis.litElementVersions)!==null&&kr!==void 0?kr:globalThis.litElementVersions=[]).push("3.3.3");const cp=L`
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
`;class dp extends gs{static get styles(){return w`
      :host {
        width: var(--iconWidth, 'auto');
        height: var(--iconHeight, 'auto');
      }

      .fill-color {
        fill: var(--iconFillColor);
      }

      .stroke-color {
        stroke: var(--iconStrokeColor);
      }
    `}render(){return cp}}customElements.define("ia-icon-close",dp);const hp=L`
  <svg
    class="ia-logo"
    viewBox="0 0 27 30"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="logoTitleID logoDescID"
  >
    <title id="logoTitleID">Internet Archive logo</title>
    <desc id="logoDescID">
      A line drawing of the Internet Archive headquarters building façade.
    </desc>
    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <mask id="mask-2" class="fill-color">
        <path
          d="M26.6666667,28.6046512 L26.6666667,30 L0,30 L0.000283687943,28.6046512 L26.6666667,28.6046512 Z M25.6140351,26.5116279 L25.6140351,28.255814 L1.05263158,28.255814 L1.05263158,26.5116279 L25.6140351,26.5116279 Z M3.62469203,7.6744186 L3.91746909,7.82153285 L4.0639977,10.1739544 L4.21052632,13.9963932 L4.21052632,17.6725617 L4.0639977,22.255044 L4.03962296,25.3421929 L3.62469203,25.4651163 L2.16024641,25.4651163 L1.72094074,25.3421929 L1.55031755,22.255044 L1.40350877,17.6970339 L1.40350877,14.0211467 L1.55031755,10.1739544 L1.68423854,7.80887484 L1.98962322,7.6744186 L3.62469203,7.6744186 Z M24.6774869,7.6744186 L24.9706026,7.82153285 L25.1168803,10.1739544 L25.2631579,13.9963932 L25.2631579,17.6725617 L25.1168803,22.255044 L25.0927809,25.3421929 L24.6774869,25.4651163 L23.2130291,25.4651163 L22.7736357,25.3421929 L22.602418,22.255044 L22.4561404,17.6970339 L22.4561404,14.0211467 L22.602418,10.1739544 L22.7369262,7.80887484 L23.0420916,7.6744186 L24.6774869,7.6744186 Z M9.94042303,7.6744186 L10.2332293,7.82153285 L10.3797725,10.1739544 L10.5263158,13.9963932 L10.5263158,17.6725617 L10.3797725,22.255044 L10.3556756,25.3421929 L9.94042303,25.4651163 L8.47583122,25.4651163 L8.0362015,25.3421929 L7.86556129,22.255044 L7.71929825,17.6970339 L7.71929825,14.0211467 L7.86556129,10.1739544 L8.00005604,7.80887484 L8.30491081,7.6744186 L9.94042303,7.6744186 Z M18.0105985,7.6744186 L18.3034047,7.82153285 L18.449948,10.1739544 L18.5964912,13.9963932 L18.5964912,17.6725617 L18.449948,22.255044 L18.425851,25.3421929 L18.0105985,25.4651163 L16.5460067,25.4651163 L16.1066571,25.3421929 L15.9357367,22.255044 L15.7894737,17.6970339 L15.7894737,14.0211467 L15.9357367,10.1739544 L16.0702315,7.80887484 L16.3753664,7.6744186 L18.0105985,7.6744186 Z M25.6140351,4.53488372 L25.6140351,6.97674419 L1.05263158,6.97674419 L1.05263158,4.53488372 L25.6140351,4.53488372 Z M13.0806755,0 L25.9649123,2.93331338 L25.4484139,3.8372093 L0.771925248,3.8372093 L0,3.1041615 L13.0806755,0 Z"
          id="path-1"
        ></path>
      </mask>
      <use class="fill-color" xlink:href="#path-1"></use>
      <g mask="url(#mask-2)" class="fill-color">
        <path
          d="M0,0 L26.6666667,0 L26.6666667,30 L0,30 L0,0 Z"
          id="swatch"
        ></path>
      </g>
    </g>
  </svg>
`;let $a=class extends xi{constructor(){super(...arguments),this.config=new ii}render(){return L`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?L`<div class="logo-icon">${hp}</div>`:G}
            ${this.config.title?L`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?L`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?L` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?L` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return L`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}static get styles(){const e=w`var(--modalLogoSize, 6.5rem)`,t=w`var(--processingImageSize, 7.5rem)`,i=w`var(--modalCornerRadius, 1rem)`,s=w`var(--modalBorder, 2px solid black)`,r=w`var(--modalBottomMargin, 2.5rem)`,a=w`var(--modalTopMargin, 5rem)`,l=w`var(--modalHeaderBottomPadding, 0.5em)`,d=w`var(--modalBottomPadding, 2rem)`,h=w`var(--modalScrollOffset, 5px)`,p=w`var(--modalTitleFontSize, 1.8rem)`,m=w`var(--modalSubtitleFontSize, 1.4rem)`,g=w`var(--modalHeadlineFontSize, 1.6rem)`,b=w`var(--modalMessageFontSize, 1.4rem)`,$=w`var(--modalTitleLineHeight, normal)`,C=w`var(--modalSubtitleLineHeight, normal)`,M=w`var(--modalHeadlineLineHeight, normal)`,P=w`var(--modalMessageLineHeight, normal)`;return w`
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
        margin-top: ${a};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${i}) calc(${i}) 0 0;
        border: ${s};
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
        font-size: ${m};
        line-height: ${C};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${i}) calc(${i});
        border: ${s};
        border-top: 0;
        padding: 0 1rem calc(${d} - ${h}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${r}));
        min-height: 5rem;
        padding: 0 0 calc(${h}) 0;
      }

      .headline {
        font-size: ${g};
        font-weight: bold;
        text-align: center;
        line-height: ${M};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${b};
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
    `}};n([E({type:Object})],$a.prototype,"config",void 0);$a=n([Ge("modal-template")],$a);function pp(o,e,t){var i=t||{},s=i.noTrailing,r=s===void 0?!1:s,a=i.noLeading,l=a===void 0?!1:a,d=i.debounceMode,h=d===void 0?void 0:d,p,m=!1,g=0;function b(){p&&clearTimeout(p)}function $(M){var P=M||{},F=P.upcomingOnly,O=F===void 0?!1:F;b(),m=!O}function C(){for(var M=arguments.length,P=new Array(M),F=0;F<M;F++)P[F]=arguments[F];var O=this,N=Date.now()-g;if(m)return;function K(){g=Date.now(),e.apply(O,P)}function ue(){p=void 0}!l&&h&&!p&&K(),b(),h===void 0&&N>o?l?(g=Date.now(),r||(p=setTimeout(h?ue:K,o))):K():r!==!0&&(p=setTimeout(h?ue:K,h===void 0?o-N:o))}return C.cancel=$,C}var si;(function(o){o.Open="open",o.Closed="closed"})(si||(si={}));class up{constructor(e){this.windowResizeThrottler=pp(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case si.Open:this.startResizeListener(),this.stopDocumentScroll();break;case si.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let Fi=class extends xi{constructor(){super(...arguments),this.mode=si.Closed,this.hostBridge=new up(this),this.modal=new lp(this),this.closeOnBackdropClick=!0}firstUpdated(){return Cn(this,void 0,void 0,function*(){yield new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return L`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=si.Closed,this.customModalContent=void 0,this.modalTemplate.config=new ii,this.modal.deactivate()}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Cn(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=si.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus(),this.modal.activate()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=w`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=w`var(--modalBackdropZindex, 1000)`,i=w`var(--modalWidth, 32rem)`,s=w`var(--modalMaxWidth, 95%)`,r=w`var(--modalZindex, 2000)`;return w`
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
        max-width: ${s};
      }
    `}};n([E({type:String,reflect:!0})],Fi.prototype,"mode",void 0);n([E({type:Object})],Fi.prototype,"customModalContent",void 0);n([E({type:Object})],Fi.prototype,"hostBridge",void 0);n([Le("modal-template")],Fi.prototype,"modalTemplate",void 0);Fi=n([Ge("modal-manager")],Fi);const Il=x`var(--white, #fff)`,fp=x`var(--primaryDisableCTAFill, #767676)`,mp=x`var(--secondaryCTABorder, #999)`,gp=x`var(--primaryCTAFill, #194880)`,_r=x`var(--primaryCTAFillRGB, 25, 72, 128)`,vp=x`var(--primaryCTABorder, #c5d1df)`,bp=x`var(--primaryErrorCTAFill, #d9534f)`,Er=x`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,yp=x`var(--primaryErrorCTABorder, #d43f3a)`,wp=x`var(--secondaryCTAFill, #333)`,Ar=x`var(--secondaryCTAFillRGB, 51, 51, 51)`,$p=x`var(--primaryCTABorder, #979797)`,Sp=x`var(---primaryWarningFill, #ee8950)`,Mr=x`var(--primaryWarningFillRGB, 238, 137, 80)`,xp=x`var(--primaryWarningBorder, #ec7939)`,Cp=x`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Il};
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
    outline-color: ${Il};
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
    background-color: ${fp};
    border: 1px solid ${mp};
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
    background-color: ${gp};
    border-color: ${vp};
  }
  .ia-button.primary:hover {
    background-color: rgba(${_r}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${_r}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${_r}, 0.7);
  }

  .ia-button.danger {
    background-color: ${bp};
    border-color: ${yp};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Er}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Er}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Er}, 0.7);
  }

  .ia-button.warning {
    background-color: ${Sp};
    border-color: ${xp};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Mr}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Mr}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Mr}, 0.7);
  }

  .ia-button.dark {
    background-color: ${wp};
    border-color: ${$p};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Ar}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Ar}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Ar}, 0.7);
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
`;let So=class extends W{constructor(){super(...arguments);c(this,"items",[]);c(this,"message")}render(){return f`
      <ul>
        ${ti(this.items,({title:t,date:i})=>f`
            <li>
              <span class="item-title">${t??"[untitled]"}</span>
              <span class="item-date">${i??""}</span>
            </li>
          `)}
      </ul>
      ${this.message?f`<p class="message">${this.message}</p>`:y}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${_("Remove items")}
        </button>
      </div>
    `}removeItemsBtnClicked(){this.dispatchEvent(new CustomEvent("confirm",{detail:{items:this.items}}))}static get styles(){return x`
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
    `}};n([u({type:Object})],So.prototype,"items",void 0);n([u({type:String})],So.prototype,"message",void 0);So=n([H("remove-items-modal-content")],So);let mt=class extends W{constructor(){super(...arguments);c(this,"label",_("Select items to remove"));c(this,"modalManager");c(this,"selectedItems",[]);c(this,"manageViewModalMsg");c(this,"showSelectAll",!1);c(this,"showUnselectAll",!1);c(this,"showItemManageButton",!1);c(this,"removeAllowed",!1)}render(){return f`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <div class="manage-buttons">
          <button class="ia-button dark" @click=${this.cancelClicked}>
            ${_("Cancel")}
          </button>
          <button
            class="ia-button danger"
            ?disabled=${!this.removeAllowed}
            @click=${this.showRemoveItemsModal}
          >
            ${_("Remove selected items")} (${this.selectedItems.length})...
          </button>
          ${Xs(this.showItemManageButton,()=>f` <button
                class="ia-button warning"
                ?disabled=${!this.removeAllowed}
                @click=${this.manageItemsClicked}
              >
                ${_("Item Manager the items")} (${this.selectedItems.length})
              </button>`)}
          <div class="selection-buttons">
            ${Xs(this.showSelectAll,()=>f` <button
                  class="ia-button link select-all-btn"
                  @click=${this.selectAllClicked}
                >
                  ${_("Select all")}
                </button>`)}
            ${Xs(this.showUnselectAll,()=>f` <button
                  class="ia-button link unselect-all-btn"
                  @click=${this.unselectAllClicked}
                >
                  ${_("Unselect all")}
                </button>`)}
          </div>
        </div>
      </div>
    `}cancelClicked(){this.dispatchEvent(new CustomEvent("cancel"))}removeItemsClicked(){this.dispatchEvent(new CustomEvent("removeItems"))}manageItemsClicked(){this.dispatchEvent(new CustomEvent("manageItems"))}selectAllClicked(){this.dispatchEvent(new CustomEvent("selectAll"))}unselectAllClicked(){this.dispatchEvent(new CustomEvent("unselectAll"))}showRemoveItemsModal(){var s,r;const t=f`
      <remove-items-modal-content
        .items=${this.selectedItems}
        .message=${this.manageViewModalMsg}
        @confirm=${()=>this.removeItemsClicked()}
      ></remove-items-modal-content>
    `,i=new ii({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:f`${_("Are you sure you want to remove these items?")}`});(s=this.modalManager)==null||s.classList.add("remove-items"),(r=this.modalManager)==null||r.showModal({config:i,customModalContent:t,userClosedModalCallback:()=>{var a;(a=this.modalManager)==null||a.classList.remove("remove-items")}})}showRemoveItemsProcessingModal(){var i,s;const t=new ii({showProcessingIndicator:!0,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:f`${_("Removing selected items...")}`});(i=this.modalManager)==null||i.classList.add("remove-items"),(s=this.modalManager)==null||s.showModal({config:t,userClosedModalCallback:()=>{var r;(r=this.modalManager)==null||r.classList.remove("remove-items")}})}showRemoveItemsErrorModal(){var i,s;const t=new ii({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#691916",showHeaderLogo:!1,closeOnBackdropClick:!0,title:f`${_("Error: unable to remove items")}`,message:f`${_("An error occurred while removing items. Please try again in a few minutes.")}`});(i=this.modalManager)==null||i.classList.add("remove-items"),(s=this.modalManager)==null||s.showModal({config:t,userClosedModalCallback:()=>{var r;(r=this.modalManager)==null||r.classList.remove("remove-items")}})}static get styles(){return x`
      ${Cp}
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
    `}};n([u({type:String})],mt.prototype,"label",void 0);n([u({type:Object})],mt.prototype,"modalManager",void 0);n([u({type:Object})],mt.prototype,"selectedItems",void 0);n([u({type:String})],mt.prototype,"manageViewModalMsg",void 0);n([u({type:Boolean})],mt.prototype,"showSelectAll",void 0);n([u({type:Boolean})],mt.prototype,"showUnselectAll",void 0);n([u({type:Boolean})],mt.prototype,"showItemManageButton",void 0);n([u({type:Boolean})],mt.prototype,"removeAllowed",void 0);mt=n([H("manage-bar")],mt);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const vs=(o,e)=>{var i;const t=o._$AN;if(t===void 0)return!1;for(const s of t)(i=s._$AO)==null||i.call(s,e,!1),vs(s,e);return!0},xo=o=>{let e,t;do{if((e=o._$AM)===void 0)break;t=e._$AN,t.delete(o),o=e}while((t==null?void 0:t.size)===0)},od=o=>{for(let e;e=o._$AM;o=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(o))break;t.add(o),_p(e)}};function Tp(o){this._$AN!==void 0?(xo(this),this._$AM=o,od(this)):this._$AM=o}function kp(o,e=!1,t=0){const i=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(i))for(let r=t;r<i.length;r++)vs(i[r],!1),xo(i[r]);else i!=null&&(vs(i,!1),xo(i));else vs(this,o)}const _p=o=>{o.type==pt.CHILD&&(o._$AP??(o._$AP=kp),o._$AQ??(o._$AQ=Tp))};class Ep extends Ps{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),od(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,s;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)==null||i.call(this):(s=this.disconnected)==null||s.call(this)),t&&(vs(this,e),xo(this))}setValue(e){if(Vc(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const Dr=new WeakMap,Ap=Fs(class extends Ep{render(o){return se}update(o,[e]){var i;const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=(i=o.options)==null?void 0:i.host,this.rt(this.ct=o.element)),se}rt(o){if(this.isConnected||(o=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=Dr.get(e);t===void 0&&(t=new WeakMap,Dr.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,o),o!==void 0&&this.G.call(this.ht,o)}else this.G.value=o}get lt(){var o,e;return typeof this.G=="function"?(o=Dr.get(this.ht??globalThis))==null?void 0:o.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var rd=60,ad=rd*60,nd=ad*24,Mp=nd*7,Pi=1e3,Fr=rd*Pi,Nl=ad*Pi,Dp=nd*Pi,Fp=Mp*Pi,Ka="millisecond",bi="second",yi="minute",wi="hour",kt="day",io="week",Je="month",ld="quarter",_t="year",$i="date",Pp="YYYY-MM-DDTHH:mm:ssZ",Ul="Invalid Date",Lp=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Op=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const Bp={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}};var Sa=function(e,t,i){var s=String(e);return!s||s.length>=t?e:""+Array(t+1-s.length).join(i)+e},Rp=function(e){var t=-e.utcOffset(),i=Math.abs(t),s=Math.floor(i/60),r=i%60;return(t<=0?"+":"-")+Sa(s,2,"0")+":"+Sa(r,2,"0")},zp=function o(e,t){if(e.date()<t.date())return-o(t,e);var i=(t.year()-e.year())*12+(t.month()-e.month()),s=e.clone().add(i,Je),r=t-s<0,a=e.clone().add(i+(r?-1:1),Je);return+(-(i+(t-s)/(r?s-a:a-s))||0)},Ip=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},Np=function(e){var t={M:Je,y:_t,w:io,d:kt,D:$i,h:wi,m:yi,s:bi,ms:Ka,Q:ld};return t[e]||String(e||"").toLowerCase().replace(/s$/,"")},Up=function(e){return e===void 0};const Hp={s:Sa,z:Rp,m:zp,a:Ip,p:Np,u:Up};var bs="en",oi={};oi[bs]=Bp;var cd="$isDayjsObject",Xa=function(e){return e instanceof Ro||!!(e&&e[cd])},Co=function o(e,t,i){var s;if(!e)return bs;if(typeof e=="string"){var r=e.toLowerCase();oi[r]&&(s=r),t&&(oi[r]=t,s=r);var a=e.split("-");if(!s&&a.length>1)return o(a[0])}else{var l=e.name;oi[l]=e,s=l}return!i&&s&&(bs=s),s||!i&&bs},re=function(e,t){if(Xa(e))return e.clone();var i=typeof t=="object"?t:{};return i.date=e,i.args=arguments,new Ro(i)},Vp=function(e,t){return re(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},X=Hp;X.l=Co;X.i=Xa;X.w=Vp;var Wp=function(e){var t=e.date,i=e.utc;if(t===null)return new Date(NaN);if(X.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var s=t.match(Lp);if(s){var r=s[2]-1||0,a=(s[7]||"0").substring(0,3);return i?new Date(Date.UTC(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,a)):new Date(s[1],r,s[3]||1,s[4]||0,s[5]||0,s[6]||0,a)}}return new Date(t)},Ro=function(){function o(t){this.$L=Co(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[cd]=!0}var e=o.prototype;return e.parse=function(i){this.$d=Wp(i),this.init()},e.init=function(){var i=this.$d;this.$y=i.getFullYear(),this.$M=i.getMonth(),this.$D=i.getDate(),this.$W=i.getDay(),this.$H=i.getHours(),this.$m=i.getMinutes(),this.$s=i.getSeconds(),this.$ms=i.getMilliseconds()},e.$utils=function(){return X},e.isValid=function(){return this.$d.toString()!==Ul},e.isSame=function(i,s){var r=re(i);return this.startOf(s)<=r&&r<=this.endOf(s)},e.isAfter=function(i,s){return re(i)<this.startOf(s)},e.isBefore=function(i,s){return this.endOf(s)<re(i)},e.$g=function(i,s,r){return X.u(i)?this[s]:this.set(r,i)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(i,s){var r=this,a=X.u(s)?!0:s,l=X.p(i),d=function(P,F){var O=X.w(r.$u?Date.UTC(r.$y,F,P):new Date(r.$y,F,P),r);return a?O:O.endOf(kt)},h=function(P,F){var O=[0,0,0,0],N=[23,59,59,999];return X.w(r.toDate()[P].apply(r.toDate("s"),(a?O:N).slice(F)),r)},p=this.$W,m=this.$M,g=this.$D,b="set"+(this.$u?"UTC":"");switch(l){case _t:return a?d(1,0):d(31,11);case Je:return a?d(1,m):d(0,m+1);case io:{var $=this.$locale().weekStart||0,C=(p<$?p+7:p)-$;return d(a?g-C:g+(6-C),m)}case kt:case $i:return h(b+"Hours",0);case wi:return h(b+"Minutes",1);case yi:return h(b+"Seconds",2);case bi:return h(b+"Milliseconds",3);default:return this.clone()}},e.endOf=function(i){return this.startOf(i,!1)},e.$set=function(i,s){var r,a=X.p(i),l="set"+(this.$u?"UTC":""),d=(r={},r[kt]=l+"Date",r[$i]=l+"Date",r[Je]=l+"Month",r[_t]=l+"FullYear",r[wi]=l+"Hours",r[yi]=l+"Minutes",r[bi]=l+"Seconds",r[Ka]=l+"Milliseconds",r)[a],h=a===kt?this.$D+(s-this.$W):s;if(a===Je||a===_t){var p=this.clone().set($i,1);p.$d[d](h),p.init(),this.$d=p.set($i,Math.min(this.$D,p.daysInMonth())).$d}else d&&this.$d[d](h);return this.init(),this},e.set=function(i,s){return this.clone().$set(i,s)},e.get=function(i){return this[X.p(i)]()},e.add=function(i,s){var r=this,a;i=Number(i);var l=X.p(s),d=function(g){var b=re(r);return X.w(b.date(b.date()+Math.round(g*i)),r)};if(l===Je)return this.set(Je,this.$M+i);if(l===_t)return this.set(_t,this.$y+i);if(l===kt)return d(1);if(l===io)return d(7);var h=(a={},a[yi]=Fr,a[wi]=Nl,a[bi]=Pi,a)[l]||1,p=this.$d.getTime()+i*h;return X.w(p,this)},e.subtract=function(i,s){return this.add(i*-1,s)},e.format=function(i){var s=this,r=this.$locale();if(!this.isValid())return r.invalidDate||Ul;var a=i||Pp,l=X.z(this),d=this.$H,h=this.$m,p=this.$M,m=r.weekdays,g=r.months,b=r.meridiem,$=function(O,N,K,ue){return O&&(O[N]||O(s,a))||K[N].slice(0,ue)},C=function(O){return X.s(d%12||12,O,"0")},M=b||function(F,O,N){var K=F<12?"AM":"PM";return N?K.toLowerCase():K},P=function(O){switch(O){case"YY":return String(s.$y).slice(-2);case"YYYY":return X.s(s.$y,4,"0");case"M":return p+1;case"MM":return X.s(p+1,2,"0");case"MMM":return $(r.monthsShort,p,g,3);case"MMMM":return $(g,p);case"D":return s.$D;case"DD":return X.s(s.$D,2,"0");case"d":return String(s.$W);case"dd":return $(r.weekdaysMin,s.$W,m,2);case"ddd":return $(r.weekdaysShort,s.$W,m,3);case"dddd":return m[s.$W];case"H":return String(d);case"HH":return X.s(d,2,"0");case"h":return C(1);case"hh":return C(2);case"a":return M(d,h,!0);case"A":return M(d,h,!1);case"m":return String(h);case"mm":return X.s(h,2,"0");case"s":return String(s.$s);case"ss":return X.s(s.$s,2,"0");case"SSS":return X.s(s.$ms,3,"0");case"Z":return l}return null};return a.replace(Op,function(F,O){return O||P(F)||l.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(i,s,r){var a=this,l=X.p(s),d=re(i),h=(d.utcOffset()-this.utcOffset())*Fr,p=this-d,m=function(){return X.m(a,d)},g;switch(l){case _t:g=m()/12;break;case Je:g=m();break;case ld:g=m()/3;break;case io:g=(p-h)/Fp;break;case kt:g=(p-h)/Dp;break;case wi:g=p/Nl;break;case yi:g=p/Fr;break;case bi:g=p/Pi;break;default:g=p;break}return r?g:X.a(g)},e.daysInMonth=function(){return this.endOf(Je).$D},e.$locale=function(){return oi[this.$L]},e.locale=function(i,s){if(!i)return this.$L;var r=this.clone(),a=Co(i,s,!0);return a&&(r.$L=a),r},e.clone=function(){return X.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},o}(),dd=Ro.prototype;re.prototype=dd;[["$ms",Ka],["$s",bi],["$m",yi],["$H",wi],["$W",kt],["$M",Je],["$y",_t],["$D",$i]].forEach(function(o){dd[o[1]]=function(e){return this.$g(e,o[0],o[1])}});re.extend=function(o,e){return o.$i||(o(e,Ro,re),o.$i=!0),re};re.locale=Co;re.isDayjs=Xa;re.unix=function(o){return re(o*1e3)};re.en=oi[bs];re.Ls=oi;re.p={};var jp=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,i,s){return i||s.slice(1)})},qp={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Gp=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(i,s,r){var a=r&&r.toUpperCase();return s||t[r]||qp[r]||jp(t[a])})},Yp=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,Hl=/\d/,ss=/\d\d/,Qp=/\d{3}/,Kp=/\d{4}/,Ke=/\d\d?/,Xp=/[+-]?\d+/,Zp=/[+-]\d\d:?(\d\d)?|Z/,os=/\d*[^-_:/,()\s\d]+/,Pt={},hd=function(e){return e=+e,e+(e>68?1900:2e3)};function Jp(o){if(!o||o==="Z")return 0;var e=o.match(/([+-]|\d\d)/g),t=+(e[1]*60)+(+e[2]||0);return t===0?0:e[0]==="+"?-t:t}var Te=function(e){return function(t){this[e]=+t}},Vl=[Zp,function(o){var e=this.zone||(this.zone={});e.offset=Jp(o)}],Pr=function(e){var t=Pt[e];return t&&(t.indexOf?t:t.s.concat(t.f))},Wl=function(e,t){var i,s=Pt,r=s.meridiem;if(!r)i=e===(t?"pm":"PM");else for(var a=1;a<=24;a+=1)if(e.indexOf(r(a,0,t))>-1){i=a>12;break}return i},eu={A:[os,function(o){this.afternoon=Wl(o,!1)}],a:[os,function(o){this.afternoon=Wl(o,!0)}],Q:[Hl,function(o){this.month=(o-1)*3+1}],S:[Hl,function(o){this.milliseconds=+o*100}],SS:[ss,function(o){this.milliseconds=+o*10}],SSS:[Qp,function(o){this.milliseconds=+o}],s:[Ke,Te("seconds")],ss:[Ke,Te("seconds")],m:[Ke,Te("minutes")],mm:[Ke,Te("minutes")],H:[Ke,Te("hours")],h:[Ke,Te("hours")],HH:[Ke,Te("hours")],hh:[Ke,Te("hours")],D:[Ke,Te("day")],DD:[ss,Te("day")],Do:[os,function(o){var e=Pt,t=e.ordinal,i=o.match(/\d+/);if(this.day=i[0],!!t)for(var s=1;s<=31;s+=1)t(s).replace(/\[|\]/g,"")===o&&(this.day=s)}],w:[Ke,Te("week")],ww:[ss,Te("week")],M:[Ke,Te("month")],MM:[ss,Te("month")],MMM:[os,function(o){var e=Pr("months"),t=Pr("monthsShort"),i=(t||e.map(function(s){return s.slice(0,3)})).indexOf(o)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[os,function(o){var e=Pr("months"),t=e.indexOf(o)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[Xp,Te("year")],YY:[ss,function(o){this.year=hd(o)}],YYYY:[Kp,Te("year")],Z:Vl,ZZ:Vl};function tu(o){var e=o.afternoon;if(e!==void 0){var t=o.hours;e?t<12&&(o.hours+=12):t===12&&(o.hours=0),delete o.afternoon}}function iu(o){o=Gp(o,Pt&&Pt.formats);for(var e=o.match(Yp),t=e.length,i=0;i<t;i+=1){var s=e[i],r=eu[s],a=r&&r[0],l=r&&r[1];l?e[i]={regex:a,parser:l}:e[i]=s.replace(/^\[|\]$/g,"")}return function(d){for(var h={},p=0,m=0;p<t;p+=1){var g=e[p];if(typeof g=="string")m+=g.length;else{var b=g.regex,$=g.parser,C=d.slice(m),M=b.exec(C),P=M[0];$.call(h,P),d=d.replace(P,"")}}return tu(h),h}}var su=function(e,t,i,s){try{if(["x","X"].indexOf(t)>-1)return new Date((t==="X"?1e3:1)*e);var r=iu(t),a=r(e),l=a.year,d=a.month,h=a.day,p=a.hours,m=a.minutes,g=a.seconds,b=a.milliseconds,$=a.zone,C=a.week,M=new Date,P=h||(!l&&!d?M.getDate():1),F=l||M.getFullYear(),O=0;l&&!d||(O=d>0?d-1:M.getMonth());var N=p||0,K=m||0,ue=g||0,ke=b||0;if($)return new Date(Date.UTC(F,O,P,N,K,ue,ke+$.offset*60*1e3));if(i)return new Date(Date.UTC(F,O,P,N,K,ue,ke));var Oe;return Oe=new Date(F,O,P,N,K,ue,ke),C&&(Oe=s(Oe).week(C).toDate()),Oe}catch{return new Date("")}};const ou=function(o,e,t){t.p.customParseFormat=!0,o&&o.parseTwoDigitYear&&(hd=o.parseTwoDigitYear);var i=e.prototype,s=i.parse;i.parse=function(r){var a=r.date,l=r.utc,d=r.args;this.$u=l;var h=d[1];if(typeof h=="string"){var p=d[2]===!0,m=d[3]===!0,g=p||m,b=d[2];m&&(b=d[2]),Pt=this.$locale(),!p&&b&&(Pt=t.Ls[b]),this.$d=su(a,h,l,t),this.init(),b&&b!==!0&&(this.$L=this.locale(b).$L),g&&a!=this.format(h)&&(this.$d=new Date("")),Pt={}}else if(h instanceof Array)for(var $=h.length,C=1;C<=$;C+=1){d[1]=h[C-1];var M=t.apply(this,d);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}C===$&&(this.$d=new Date(""))}else s.call(this,r)}};function ru(o,e){const t=e.prototype,i=t.parse;t.parse=function(s){const r=s.date,a=s.args[1];i.call(this,s);const l=this.year(),d=l>=1900&&l<2e3,h=typeof a=="string"&&a.includes("YYYY"),p=Array.isArray(a)&&typeof a[0]=="string"&&a[0].includes("YYYY"),m=h||p,g=typeof r=="string"&&!r.includes(`${l}`);d&&m&&g&&(this.$d.setFullYear(l-1900),this.init())}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lr,Or;let ys=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};ys.finalized=!0,ys._$litElement$=!0,(Lr=globalThis.litElementHydrateSupport)===null||Lr===void 0||Lr.call(globalThis,{LitElement:ys});const jl=globalThis.litElementPolyfillSupport;jl==null||jl({LitElement:ys});((Or=globalThis.litElementVersions)!==null&&Or!==void 0?Or:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ql=Fo(class extends Po{constructor(o){if(super(o),o.type!==yt.PROPERTY&&o.type!==yt.ATTRIBUTE&&o.type!==yt.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!s1(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===me||e===G)return e;const t=o.element,i=o.name;if(o.type===yt.PROPERTY){if(e===t[i])return me}else if(o.type===yt.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return me}else if(o.type===yt.ATTRIBUTE&&t.getAttribute(i)===e+"")return me;return Pc(o),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xa=Fo(class extends Po{constructor(o){var e;if(super(o),o.type!==yt.ATTRIBUTE||o.name!=="class"||((e=o.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(e=>o[e]).join(" ")+" "}update(o,[e]){var t,i;if(this.it===void 0){this.it=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((t=this.nt)===null||t===void 0)&&t.has(r))&&this.it.add(r);return this.render(e)}const s=o.element.classList;this.it.forEach(r=>{r in e||(s.remove(r),this.it.delete(r))});for(const r in e){const a=!!e[r];a===this.it.has(r)||!((i=this.nt)===null||i===void 0)&&i.has(r)||(a?(s.add(r),this.it.add(r)):(s.remove(r),this.it.delete(r)))}return me}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pd="important",au=" !"+pd,ud=Fo(class extends Po{constructor(o){var e;if(super(o),o.type!==yt.ATTRIBUTE||o.name!=="style"||((e=o.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((e,t)=>{const i=o[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[e]){const{style:t}=o.element;if(this.ht===void 0){this.ht=new Set;for(const i in e)this.ht.add(i);return this.render(e)}this.ht.forEach(i=>{e[i]==null&&(this.ht.delete(i),i.includes("-")?t.removeProperty(i):t[i]="")});for(const i in e){const s=e[i];if(s!=null){this.ht.add(i);const r=typeof s=="string"&&s.endsWith(au);i.includes("-")||r?t.setProperty(i,r?s.slice(0,-11):s,r?pd:""):t[i]=s}}return me}});re.extend(ou);re.extend(ru);const nu=180,lu=40,cu=10,du=125,hu=30,Gl="YYYY",pu="no data",uu=0,fu="item",Yl=4,mu={linear:o=>o,logarithmic:o=>Math.log1p(o)},gu=w`var(--histogramDateRangeSliderColor, #4B65FE)`,vu=w`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,bu=w`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,yu=w`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,wu=w`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,$u=w`var(--histogramDateRangeInputRowMargin, 0)`,Su=w`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,xu=w`var(--histogramDateRangeInputWidth, 35px)`,Cu=w`var(--histogramDateRangeInputFontSize, 1.2rem)`,Tu=w`var(--histogramDateRangeInputFontFamily, sans-serif)`,Ql=w`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,Kl=w`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,ku=w`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,_u=w`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let Q=class extends ys{constructor(){super(...arguments),this.width=nu,this.height=lu,this.sliderWidth=cu,this.tooltipWidth=du,this.tooltipHeight=hu,this.updateDelay=uu,this.dateFormat=Gl,this.missingDataMessage=pu,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this.tooltipLabel=fu,this.barScaling="logarithmic",this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,i=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("width")||e.has("height")||e.has("binSnapping")||e.has("barScaling"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(e){return Math.ceil(e/1e3)*1e3}snapToMonth(e){const t=re(e),i=t.date()<16?0:1;return t.add(i,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(e){const t=re(e),i=t.month()<6?0:1;return t.add(i,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(e){switch(this.binSnapping){case"year":return this.snapToYear(e);case"month":return this.snapToMonth(e);case"none":default:return this.snapToNextSecond(e)}}get barScalingFunction(){return typeof this.barScaling=="string"?mu[this.barScaling]:this.barScaling}calculateHistData(){const{bins:e,height:t,dateRangeMS:i,_numBins:s,_minDateMS:r}=this,a=Math.min(...this.bins),l=Math.max(...this.bins),d=a===l?1:this.barScalingFunction(l),h=t/d,p=i/s;return e.map((m,g)=>{const b=this.snapTimestamp(g*p+r),$=this.formatDate(b),C=this.snapTimestamp((g+1)*p+r)+this.snapEndOffset,M=this.formatDate(C),P=this.formatDate(b,this.tooltipDateFormat),F=this.formatDate(C,this.tooltipDateFormat),O=P===F?P:`${P} - ${F}`;return{value:m,height:Math.floor(this.barScalingFunction(m)*h),binStart:$,binEnd:M,tooltip:O}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;case"none":default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){var e;return(e=this._tooltipDateFormat)!==null&&e!==void 0?e:this.dateFormat}set tooltipDateFormat(e){this._tooltipDateFormat=e}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),s=t<=this.getMSFromString(this.maxSelectedDate);i&&s&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),s=t>=this.getMSFromString(this.minSelectedDate);i&&s&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),t=this.translateDateToPosition(this.formatDate(e));return this.validMaxSliderX(t)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){var t,i;if(this._isDragging||this.disabled)return;const s=e.currentTarget,r=s.x.baseVal.value+this.sliderWidth/2,a=s.dataset,l=`${this.tooltipLabel}${a.numItems!=="1"?"s":""}`,d=Number(a.numItems).toLocaleString(),h=2,m=9+this.tooltipHeight,g=this.getBoundingClientRect(),b=g.x+r,$=g.y;this._tooltipOffsetX=b-h+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=$-m+window.scrollY,this._tooltipContent=L`
      ${d} ${l}<br />
      ${a.tooltip}
    `,(i=(t=this._tooltip).showPopover)===null||i===void 0||i.call(t)}hideTooltip(){var e,t;this._tooltipContent=void 0,(t=(e=this._tooltip).hidePopover)===null||t===void 0||t.call(e)}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=e.clientX-i-t}translatePositionToDate(e){const t=this.snapToNextSecond((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const s=new Date(0,0);return s.setFullYear(Number(t)),s.getTime()}return re(t,[this.dateFormat,Gl]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,s=Math.abs(i-this.getMSFromString(this.minSelectedDate)),r=Math.abs(i-this.getMSFromString(this.maxSelectedDate));s<r?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=Yl,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=Yl,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const s=t==="slider-min"?1:-1,r=xa({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return ei`
    <svg
      id=${t}
      class=${r}
      @pointerdown=${this.drag}
    >
      <path d="${i} z" fill="${gu}" />
      <rect
        x="${e-this.sliderWidth*s+this.sliderWidth*.4*s}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
      <rect
        x="${e-this.sliderWidth*s+this.sliderWidth*.6*s}"
        y="${this.height/3}"
        width="1"
        height="${this.height/3}"
        fill="white"
      />
    </svg>
    `}get selectedRangeTemplate(){return ei`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${vu}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(s=>{const{minSelectedDate:r,maxSelectedDate:a}=this,l=s.height,d=this.isBefore(s.binEnd,r),h=this.isAfter(s.binStart,a),p=d||h?wu:bu,m=`stroke-dasharray: 0 ${t} ${l} ${t} 0 ${l}`,g=ei`
        <rect
          class="bar-pointer-target"
          x=${i}
          y="0"
          width=${t}
          height=${this.height}
          @pointerenter=${this.showTooltip}
          @pointerleave=${this.hideTooltip}
          @click=${this.handleBarClick}
          fill="transparent"
          data-num-items=${s.value}
          data-bin-start=${s.binStart}
          data-bin-end=${s.binEnd}
          data-tooltip=${s.tooltip}
        />
        <rect
          class="bar"
          style=${m}
          x=${i}
          y=${this.height-l}
          width=${t}
          height=${l}
          fill=${p}
        />`;return i+=e,g})}isBefore(e,t){const i=this.getMSFromString(e),s=this.getMSFromString(t);return i<s}isAfter(e,t){const i=this.getMSFromString(e),s=this.getMSFromString(t);return i>s}formatDate(e,t=this.dateFormat){if(Number.isNaN(e))return"";const i=re(e);return i.year()<1e3?i.year(199999).format(t).replace(/199999/g,i.year().toString()):i.format(t)}get minInputTemplate(){return L`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${ql(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return L`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${ql(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return L`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return L`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){const e=ud({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`});return L`
      <div id="tooltip" style=${e} popover>${this._tooltipContent}</div>
    `}get histogramAccessibilityTemplate(){let e="";this.minSelectedDate&&this.maxSelectedDate?e=` from ${this.minSelectedDate} to ${this.maxSelectedDate}`:this.minSelectedDate?e=` from ${this.minSelectedDate}`:this.maxSelectedDate&&(e=` up to ${this.maxSelectedDate}`);const t=`Filter results for dates${e}`,i=`This histogram shows the distribution of dates${e}`;return L`<title id="histogram-title">${t}</title
      ><desc id="histogram-desc">${i}</desc>`}get noDataTemplate(){return L`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?L`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:G}render(){return this.hasBinData?L`
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
            aria-labelledby="histogram-title histogram-desc"
            @pointerleave="${this.drop}"
          >
            ${this.histogramAccessibilityTemplate} ${this.selectedRangeTemplate}
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
    `:this.noDataTemplate}};Q.styles=w`
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
      --activityIndicatorLoadingRingColor: ${yu};
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
    .bar,
    .bar-pointer-target {
      /* create a transparent border around the hist bars to prevent "gaps" and
      flickering when moving around between bars. this also helps with handling
      clicks on the bars, preventing users from being able to click in between
      bars */
      stroke: rgba(0, 0, 0, 0);
      /* ensure transparent stroke wide enough to cover gap between bars */
      stroke-width: 2px;
    }
    .bar {
      /* ensure the bar's pointer target receives events, not the bar itself */
      pointer-events: none;
    }
    .bar-pointer-target:hover + .bar {
      /* highlight currently hovered bar */
      fill-opacity: 0.7;
    }
    .disabled .bar-pointer-target:hover + .bar {
      /* ensure no visual hover interaction when disabled */
      fill-opacity: 1;
    }
    /****** histogram ********/
    #tooltip {
      position: absolute;
      background: ${Ql};
      margin: 0;
      border: 0;
      color: ${Kl};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${ku};
      font-family: ${_u};
      touch-action: none;
      pointer-events: none;
      overflow: visible;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      left: 50%;
      /* arrow */
      border: 5px solid ${Kl};
      border-color: ${Ql} transparent transparent
        transparent;
    }
    /****** slider ********/
    .slider {
      shape-rendering: crispEdges; /* So the slider doesn't get blurry if dragged between pixels */
    }
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
      margin: ${$u};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${xu};
      margin: 0 3px;
      border: ${Su};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${Cu};
      font-family: ${Tu};
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
  `;n([E({type:Number})],Q.prototype,"width",void 0);n([E({type:Number})],Q.prototype,"height",void 0);n([E({type:Number})],Q.prototype,"sliderWidth",void 0);n([E({type:Number})],Q.prototype,"tooltipWidth",void 0);n([E({type:Number})],Q.prototype,"tooltipHeight",void 0);n([E({type:Number})],Q.prototype,"updateDelay",void 0);n([E({type:String})],Q.prototype,"dateFormat",void 0);n([E({type:String})],Q.prototype,"missingDataMessage",void 0);n([E({type:String})],Q.prototype,"minDate",void 0);n([E({type:String})],Q.prototype,"maxDate",void 0);n([E({type:Boolean})],Q.prototype,"disabled",void 0);n([E({type:Array})],Q.prototype,"bins",void 0);n([E({type:Boolean})],Q.prototype,"updateWhileFocused",void 0);n([E({type:String})],Q.prototype,"binSnapping",void 0);n([E({type:String})],Q.prototype,"tooltipLabel",void 0);n([E({type:String})],Q.prototype,"barScaling",void 0);n([ve()],Q.prototype,"_tooltipOffsetX",void 0);n([ve()],Q.prototype,"_tooltipOffsetY",void 0);n([ve()],Q.prototype,"_tooltipContent",void 0);n([ve()],Q.prototype,"_tooltipDateFormat",void 0);n([ve()],Q.prototype,"_isDragging",void 0);n([ve()],Q.prototype,"_isLoading",void 0);n([Le("#tooltip")],Q.prototype,"_tooltip",void 0);n([E({type:String})],Q.prototype,"tooltipDateFormat",null);n([E({type:Boolean})],Q.prototype,"loading",null);n([E()],Q.prototype,"minSelectedDate",null);n([E()],Q.prototype,"maxSelectedDate",null);Q=n([Ge("histogram-date-range")],Q);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Br,Rr;let tt=class extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}};tt.finalized=!0,tt._$litElement$=!0,(Br=globalThis.litElementHydrateSupport)===null||Br===void 0||Br.call(globalThis,{LitElement:tt});const Xl=globalThis.litElementPolyfillSupport;Xl==null||Xl({LitElement:tt});((Rr=globalThis.litElementVersions)!==null&&Rr!==void 0?Rr:globalThis.litElementVersions=[]).push("3.3.3");const ws=ei`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,$s=ei`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let ne=class extends tt{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.displayMode="button",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return L`
      <div id="container">
        ${this.displayMode==="vote-prompt"?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e??this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted&&this.displayMode==="button"||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,s=window.innerHeight,r=i/2,a=s/2;e.left<r?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.cancel(e)}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get singleButtonDisplay(){return L`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${ws}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${$s}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return L`
      <form
        @submit=${this.submit}
        ?disabled=${this.processing||this.voteSubmitted}
      >
        <div class="prompt">
          <span class="prompt-text">${this.prompt}</span>
          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.upvoteSelected}
            @keyup=${this.upvoteKeypressed}
            class="vote-button upvote-button ${this.upvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="up"
              @click=${this.upvoteButtonSelected}
              ?checked=${this.upvoteSelected}
            />
            ${ws}
          </label>

          <label
            tabindex="0"
            role="button"
            aria-pressed=${this.downvoteSelected}
            @keyup=${this.downvoteKeypressed}
            class="vote-button downvote-button ${this.downvoteButtonClass}"
          >
            <input
              type="radio"
              name="vote"
              value="down"
              @click=${this.downvoteButtonSelected}
              ?checked=${this.downvoteSelected}
            />
            ${$s}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            Leave a comment
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return L`
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
          <form
            @submit=${this.submit}
            id="form"
            ?disabled=${this.processing||this.voteSubmitted}
          >
            <div class="prompt">
              <div class="prompt-text">${this.prompt}</div>
              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.upvoteSelected}
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
                ${ws}
              </label>

              <label
                tabindex="0"
                role="button"
                aria-pressed=${this.downvoteSelected}
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
                ${$s}
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
            ${this.error?L`<div id="error">${this.error}</div>`:G}
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
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="up"?void 0:"up",this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="down"?void 0:"down",this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e==null||e.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=L`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");const t=this.isOpen;this.processing=!0;try{const i=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:i})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error=L`There was an error submitting your feedback.`}catch(i){this.error=L`There was an error submitting your feedback.<br />Error:
        ${i instanceof Error?i.message:i}`}this.processing=!1}static get styles(){const e=w`var(--featureFeedbackBlueColor, #194880)`,t=w`var(--featureFeedbackDarkGrayColor, #767676)`,i=w`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,s=w`var(--featureFeedbackBackdropZindex, 5)`,r=w`var(--featureFeedbackModalZindex, 6)`,a=w`var(--featureFeedbackPopupBorderColor, ${e})`,l=w`var(--featureFeedbackSubmitButtonColor, ${e})`,d=w`var(--featureFeedbackBetaButtonBorderColor, ${e})`,h=w`var(--featureFeedbackBetaButtonTextColor, ${e})`,p=w`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,m=w`var(--featureFeedbackCancelButtonColor, #515151)`,g=w`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,b=w`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,$=w`var(--featureFeedbackPromptFontWeight, bold)`,C=w`var(--featureFeedbackPromptFontSize, 1.4rem)`,M=w`var(--featureFeedbackCommentButtonFontWeight, normal)`,P=w`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`,F=w`var(--defaultColor, ${t});`,O=w`var(--defaultColorSvgFilter, ${i});`,N=w`var(--upvoteColor, #23765D);`,K=w`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,ue=w`var(--downvoteColor, #720D11);`,ke=w`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,Oe=w`var(--unselectedColor, #CCCCCC);`,Ye=w`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return w`
      #container {
        display: inline-block;
      }

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
        filter: ${Ye};
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
        z-index: ${s};
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
        background-color: ${b};
        border: 1px ${a} solid;
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

      .prompt {
        display: flex;
        align-items: center;
        font-size: ${C};
        font-weight: ${$};
      }

      .prompt > label {
        flex: none;
        cursor: pointer;
      }

      .prompt-text {
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
        background-color: ${m};
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
        border-color: ${F};
      }

      .vote-button.noselection svg {
        filter: ${O};
      }

      .vote-button.unselected {
        border-color: ${Oe};
      }

      .vote-button.unselected svg {
        filter: ${Ye};
      }

      .upvote-button.selected {
        border-color: ${N};
      }

      .upvote-button.selected svg {
        filter: ${K};
      }

      .downvote-button.selected {
        border-color: ${ue};
      }

      .downvote-button.selected svg {
        filter: ${ke};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${M};
        font-size: ${P};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};n([E({type:String})],ne.prototype,"featureIdentifier",void 0);n([E({type:String})],ne.prototype,"prompt",void 0);n([E({type:String})],ne.prototype,"buttonText",void 0);n([E({type:String})],ne.prototype,"displayMode",void 0);n([E({type:Object})],ne.prototype,"recaptchaManager",void 0);n([E({type:Object})],ne.prototype,"resizeObserver",void 0);n([E({type:Boolean})],ne.prototype,"disabled",void 0);n([E({type:Object})],ne.prototype,"featureFeedbackService",void 0);n([ve()],ne.prototype,"isOpen",void 0);n([ve()],ne.prototype,"processing",void 0);n([ve()],ne.prototype,"popupTopX",void 0);n([ve()],ne.prototype,"popupTopY",void 0);n([ve()],ne.prototype,"vote",void 0);n([ve()],ne.prototype,"voteSubmitted",void 0);n([ve()],ne.prototype,"error",void 0);n([ve()],ne.prototype,"voteNeedsChoosing",void 0);n([ve()],ne.prototype,"recaptchaWidget",void 0);n([Le("#container")],ne.prototype,"container",void 0);n([Le("#popup")],ne.prototype,"popup",void 0);n([Le("#comments")],ne.prototype,"comments",void 0);ne=n([Ge("feature-feedback")],ne);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Eu=o=>typeof o!="string"&&"strTag"in o,Au=(o,e,t)=>{let i=o[0];for(let s=1;s<o.length;s++)i+=e[s-1],i+=o[s];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mu=o=>Eu(o)?Au(o.strings,o.values):o;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Du{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let o=0;o<256;o++)(o>>4&15).toString(16)+(o&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Fu=new Du;Fu.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let it=Mu;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var zr,Ir;class so extends Ie{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=et(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return me}}so.finalized=!0,so._$litElement$=!0,(zr=globalThis.litElementHydrateSupport)===null||zr===void 0||zr.call(globalThis,{LitElement:so});const Zl=globalThis.litElementPolyfillSupport;Zl==null||Zl({LitElement:so});((Ir=globalThis.litElementVersions)!==null&&Ir!==void 0?Ir:globalThis.litElementVersions=[]).push("3.3.3");const Jl=w`var(--white, #fff)`,Pu=w`var(--ia-theme-link-color, #4b64ff)`,Lu=w`var(--primaryDisableCTAFill, #767676)`,Ou=w`var(--secondaryCTABorder, #999)`,Bu=w`var(--primaryCTAFill, #194880)`,Nr=w`var(--primaryCTAFillRGB, 25, 72, 128)`,Ru=w`var(--primaryCTABorder, #c5d1df)`,zu=w`var(--primaryErrorCTAFill, #d9534f)`,Ur=w`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Iu=w`var(--primaryErrorCTABorder, #d43f3a)`,Nu=w`var(--secondaryCTAFill, #333)`,Hr=w`var(--secondaryCTAFillRGB, 51, 51, 51)`,Uu=w`var(--primaryCTABorder, #979797)`,Hu=w`var(---primaryWarningFill, #ee8950)`,Vr=w`var(--primaryWarningFillRGB, 238, 137, 80)`,Vu=w`var(--primaryWarningBorder, #ec7939)`,Wu=w`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Jl};
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
    outline-color: ${Jl};
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
    background-color: ${Lu};
    border: 1px solid ${Ou};
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
    background-color: ${Bu};
    border-color: ${Ru};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Nr}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Nr}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Nr}, 0.7);
  }

  .ia-button.danger {
    background-color: ${zu};
    border-color: ${Iu};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Ur}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Ur}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Ur}, 0.7);
  }

  .ia-button.warning {
    background-color: ${Hu};
    border-color: ${Vu};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Vr}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Vr}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Vr}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Nu};
    border-color: ${Uu};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Hr}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Hr}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Hr}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: ${Pu};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;w`
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
`;function ec(o){return"disabled"in o&&typeof o.disabled=="boolean"}function ju(o){return"numbered"in o&&typeof o.numbered=="boolean"}function qu(o){return"validate"in o&&typeof o.validate=="function"}function Gu(o){return"response"in o&&typeof o.response=="object"&&o.response!==null&&"name"in o.response&&typeof o.response.name=="string"}class Yu extends Error{}async function Wr(o,e,t="Operation timed out"){const i=new Promise((s,r)=>setTimeout(r,e,new Yu(t)));return Promise.race([o,i])}var qt;let te=qt=class extends tt{constructor(){super(...arguments),this.buttonText="Feedback",this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState="idle",this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key==="Escape"&&this.cancel(e)}}render(){return L`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has("submissionState")&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}updated(e){(e.has("showQuestionNumbers")||e.has("assignedElements"))&&this.applyQuestionNumbers();const t=e.get("submissionState");t&&(this.submissionState==="error"||t==="error")&&this.positionPopup(),e.has("isOpen")&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(ec).forEach(e=>{e.dataset.originallyDisabled=e.disabled?"true":"false",e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(ec).forEach(e=>{const{originallyDisabled:t}=e.dataset;if(t===void 0)return;const i=t==="true";delete e.dataset.originallyDisabled,e.disabled=i})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener("keyup",this.handleEscape)}removeEscapeListener(){document.removeEventListener("keyup",this.handleEscape)}setupScrollObserver(){document.addEventListener("scroll",this.handleScroll)}stopScrollObserver(){document.removeEventListener("scroll",this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){const t=e??this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState("idle"),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent("submissionStateChanged",{detail:this.submissionState}))}get isProcessing(){return this.submissionState==="processing"}get isSubmitted(){return this.submissionState==="submitted"}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,s=window.innerHeight,r=i/2,a=s/2,l=5,d=5;e.left<r?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>i&&(this.popupTopX=i-t.width-l),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>s&&(this.popupTopY=s-t.height-d),this.popupTopX=Math.max(l,this.popupTopX),this.popupTopY=Math.max(d,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?L`
      <span class="beta-button-icon">${ws}</span>
      <span class="beta-button-icon">${$s}</span>
    `:G}get feedbackButtonCheckTemplate(){return L`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return L`
      <button
        id="beta-button"
        tabindex="0"
        aria-haspopup="dialog"
        ?disabled=${this.disabled}
        @click=${this.showPopup}
      >
        <span id="button-text">${this.buttonText}</span>
        ${this.isSubmitted?this.feedbackButtonCheckTemplate:this.feedbackButtonThumbsTemplate}
      </button>
      ${this.popupTemplate}
    `}get popupTemplate(){const e=this.isProcessing||this.isSubmitted,t=this.isProcessing?qt.SUBMIT_BUTTON_PROCESSING_TEXT:qt.SUBMIT_BUTTON_NORMAL_TEXT,i=this.error?L`<div id="error">${this.error}</div>`:G,s=ud({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),r=a=>a.stopPropagation();return L`
      <div
        id="popup-background"
        class=${this.isOpen?"open":"closed"}
        @click=${this.backgroundClicked}
        @keydown=${this.backgroundClicked}
      >
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusSubmitButton}
        ></div>
        <div
          id="popup"
          role="dialog"
          aria-modal="true"
          aria-labelledby="survey-heading"
          style=${s}
        >
          <h2 id="survey-heading" class="sr-only">${it("Feedback Survey")}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${r}
            @keydown=${r}
            @submit=${this.submit}
          >
            <slot id="questions-slot"></slot>
            ${i}
            <div id="actions">
              <button
                type="button"
                id="cancel-button"
                class="cta-button ia-button dark"
                tabindex="0"
                ?disabled=${e}
                @click=${this.cancel}
              >
                ${it("Cancel")}
              </button>
              <button
                type="submit"
                id="submit-button"
                class="cta-button ia-button primary"
                tabindex="0"
                ?disabled=${e}
              >
                ${t}
              </button>
            </div>
          </form>
        </div>
        <div
          class="focus-trap"
          tabindex="0"
          @focus=${this.focusFirstFormElement}
        ></div>
      </div>
    `}focusFirstFormElement(){const e=this.getRootNode();for(const t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(t=>{var i;(i=t.querySelector("[slot=question-number]"))===null||i===void 0||i.remove()});return}let e=1;this.assignedElements.filter(t=>ju(t)&&t.numbered).forEach(t=>{let i=t.querySelector("[slot=question-number]");i||(i=document.createElement("span"),i.setAttribute("slot","question-number")),i.textContent=`${e}. `,t.append(i),e+=1})}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(qu).map(e=>e.validate()).every(e=>e)}async submit(e){if(e==null||e.preventDefault(),!this.validate()){this.error=L`${qt.ERROR_MESSAGE_MISSING_REQUIRED_INPUT}`,this.setSubmissionState("error");return}const{surveyIdentifier:t,submitTimeout:i,featureFeedbackService:s}=this;if(this.error=void 0,!t)throw new Error("surveyIdentifier is required");if(!s)throw new Error("featureFeedbackService is required");const r=this.getRecaptchaWidget();let a;try{a=await Wr(r,i)}catch(d){throw new Error(`recaptchaWidget load failed: ${d}`)}if(!a)throw new Error("recaptchaWidget is required");const l=this.isOpen;this.setSubmissionState("processing");try{const d=await Wr(a.execute(),i);(await Wr(s.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(Gu).map(p=>p.response),recaptchaToken:d}),i)).success?(this.setSubmissionState("submitted"),l&&this.closePopup()):(this.error=L`${qt.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}`,this.setSubmissionState("error"))}catch(d){this.error=L`${qt.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}
        <br />
        ${it("Error: ")}${d instanceof Error?d.message:d}`,this.setSubmissionState("error")}}static get styles(){const e=w`var(--featureFeedbackBlueColor, #194880)`,t=w`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,i=w`var(--featureFeedbackBackdropZindex, 5)`,s=w`var(--featureFeedbackModalZindex, 6)`,r=w`var(--featureFeedbackPopupMaxWidth, 300px)`,a=w`var(--featureFeedbackPopupVerticalPadding, 10px)`,l=w`var(--featureFeedbackPopupHorizontalPadding, 10px)`,d=w`
      ${a} ${l}
    `,h=w`var(--featureFeedbackPopupBorderColor, ${e})`,p=w`var(--featureFeedbackBetaButtonBorderColor, ${e})`,m=w`var(--featureFeedbackBetaButtonTextColor, ${e})`,g=w`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,b=w`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,$=w`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`,C=w`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,M=w`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${m};
        border: 1px solid ${p};
        border-radius: 4px;
        padding: 1px 5px;
        background: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        cursor: pointer;
      }

      .beta-button-icon {
        line-height: 100%;
      }

      .beta-button-icon svg {
        height: 10px;
        width: 10px;
        filter: ${g};
      }

      .beta-button-icon.success {
        filter: ${C};
      }

      #error {
        margin-bottom: 10px;
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
        z-index: ${i};
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
        max-width: ${r};
        max-height: calc(100vh - 2 * ${a} - 10px);
        padding: ${d};
        border: 1px ${h} solid;
        border-radius: 5px;
        background-color: ${$};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${s};
        margin-left: 10px;
        margin-right: 10px;
        overflow-y: auto;
        scrollbar-width: thin;
      }

      button,
      input,
      a,
      textarea {
        font-family: inherit;
      }

      #form > div:last-child {
        margin-bottom: 0;
      }

      #actions {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 10px;
      }

      .cta-button {
        color: white;
        font-size: 14px;
        border-radius: 4px;
        height: 30px;
        margin: 0;
      }

      .sr-only,
      .focus-trap {
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
    `;return[Wu,M]}};te.SUBMIT_BUTTON_NORMAL_TEXT=it("Submit feedback");te.SUBMIT_BUTTON_PROCESSING_TEXT=it("Submitting...");te.ERROR_MESSAGE_MISSING_REQUIRED_INPUT=it("Please respond to the indicated questions.");te.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED=it("There was an error submitting your feedback.");n([E({type:String})],te.prototype,"surveyIdentifier",void 0);n([E({type:String})],te.prototype,"buttonText",void 0);n([E({type:Boolean})],te.prototype,"showButtonThumbs",void 0);n([E({type:Boolean})],te.prototype,"showQuestionNumbers",void 0);n([E({type:Boolean})],te.prototype,"disabled",void 0);n([E({type:Number})],te.prototype,"submitTimeout",void 0);n([E({type:Object})],te.prototype,"featureFeedbackService",void 0);n([E({type:Object})],te.prototype,"recaptchaManager",void 0);n([E({type:Object})],te.prototype,"resizeObserver",void 0);n([ve()],te.prototype,"isOpen",void 0);n([ve()],te.prototype,"submissionState",void 0);n([ve()],te.prototype,"popupTopX",void 0);n([ve()],te.prototype,"popupTopY",void 0);n([ve()],te.prototype,"error",void 0);n([Le("#container")],te.prototype,"container",void 0);n([Le("#popup")],te.prototype,"popup",void 0);n([Le("#cancel-button")],te.prototype,"cancelButton",void 0);n([Le("#submit-button")],te.prototype,"submitButton",void 0);n([Fc()],te.prototype,"assignedElements",void 0);te=qt=n([Ge("ia-feedback-survey")],te);var oo;let Ue=oo=class extends tt{constructor(){super(),this.prompt="",this.value="",this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return L`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||!!this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A comment is required."),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){if(!this.prompt)return G;const e=this.numbered?L`<slot name="question-number"></slot>`:G;return L`<div id="prompt-text">${e}${this.prompt}</div>`}get commentBoxTemplate(){var e;const t=this.required?oo.DEFAULT_PLACEHOLDER_REQUIRED:oo.DEFAULT_PLACEHOLDER_OPTIONAL,i=(e=this.placeholder)!==null&&e!==void 0?e:t;return L`
      <textarea
        id="comments"
        tabindex="0"
        placeholder=${i}
        aria-labelledby="prompt-text"
        aria-required=${this.required}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.commentChanged}
      ></textarea>
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=w`var(--commentHeight, 50px)`,t=w`var(--commentResize, none)`,i=w`var(--surveyQuestionMargin, 0 0 15px 0)`,s=w`var(--featureFeedbackPromptFontWeight, bold)`,r=w`var(--featureFeedbackPromptFontSize, 1.4rem)`;return w`
      #container {
        margin: ${i};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${r};
        font-weight: ${s};
      }

      #comments {
        width: 100%;
        height: ${e};
        background-color: #ffffff;
        border: 1px #2c2c2c solid;
        border-radius: 4px;
        padding: 7px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        font-family: inherit;
        resize: ${t};
      }

      #comments::placeholder {
        color: #767676;
      }

      :host(:invalid) #comments {
        box-shadow: 0 0 4px red;
      }
    `}};Ue.DEFAULT_PLACEHOLDER_REQUIRED=it("Comments");Ue.DEFAULT_PLACEHOLDER_OPTIONAL=it("Comments (optional)");Ue.formAssociated=!0;Ue.shadowRootOptions={...tt.shadowRootOptions,delegatesFocus:!0};n([E({type:String})],Ue.prototype,"prompt",void 0);n([E({type:String})],Ue.prototype,"value",void 0);n([E({type:Boolean,reflect:!0})],Ue.prototype,"required",void 0);n([E({type:Boolean,reflect:!0})],Ue.prototype,"disabled",void 0);n([E({type:Boolean,reflect:!0})],Ue.prototype,"skipNumber",void 0);n([E({type:String})],Ue.prototype,"placeholder",void 0);n([Le("#comments")],Ue.prototype,"commentBox",void 0);Ue=oo=n([Ge("ia-survey-comment")],Ue);var ro;let Fe=ro=class extends tt{constructor(){super(),this.prompt="",this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return L`
      <div id="container">
        <div
          id="prompt-row"
          role="radiogroup"
          aria-labelledby="prompt-text"
          aria-required=${this.required}
          aria-disabled=${this.disabled}
        >
          ${this.promptTextTemplate}${this.voteButtonsTemplate}
        </div>
        ${this.commentFieldTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A vote is required."),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){var e;return{...(e=this.commentBox)===null||e===void 0?void 0:e.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){if(!this.prompt)return G;const e=this.numbered?L`<slot name="question-number"></slot>`:G;return L`<div id="prompt-text">${e}${this.prompt}</div>`}get voteButtonsTemplate(){const e=this.vote==="up",t=this.vote==="down",s={"vote-button":!0,noselection:this.vote===void 0},r=xa({...s,selected:e,unselected:t}),a=xa({...s,selected:t,unselected:e});return L`
      <label
        id="upvote"
        class=${r}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="up"
          ?checked=${e}
          ?disabled=${this.disabled}
          @click=${this.upvoteButtonSelected}
          @keydown=${this.upvoteKeyPressed}
        />
        ${ws}
        <span class="sr-only">${ro.UPVOTE_SR_LABEL}</span>
      </label>

      <label
        id="downvote"
        class=${a}
        ?disabled=${this.disabled}
      >
        <input
          type="radio"
          name="vote"
          value="down"
          ?checked=${t}
          ?disabled=${this.disabled}
          @click=${this.downvoteButtonSelected}
          @keydown=${this.downvoteKeyPressed}
        />
        ${$s}
        <span class="sr-only">${ro.DOWNVOTE_SR_LABEL}</span>
      </label>
    `}get commentFieldTemplate(){var e;return this.showComments?L`
      <ia-survey-comment
        id="comments"
        skipNumber
        .value=${(e=this.comment)!==null&&e!==void 0?e:""}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-survey-comment>
    `:G}upvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection("up")}downvoteButtonSelected(){this.handleVoteButtonSelection("down")}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){var t;e.stopPropagation(),!this.disabled&&(this.comment=(t=this.commentBox)===null||t===void 0?void 0:t.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=w`var(--surveyQuestionMargin, 0 0 15px 0)`,t=w`var(--featureFeedbackDarkGrayColor, #767676)`,i=w`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,s=w`var(--defaultColor, ${t})`,r=w`var(--defaultColorSvgFilter, ${i})`,a=w`var(--upvoteColor, #23765D)`,l=w`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,d=w`var(--downvoteColor, #720D11)`,h=w`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`,p=w`var(--unselectedColor, #CCCCCC)`,m=w`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,g=w`var(--featureFeedbackPromptFontWeight, bold)`,b=w`var(--featureFeedbackPromptFontSize, 1.4rem)`;return w`
      #container {
        margin: ${e};
      }

      #prompt-row {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
      }

      #prompt-text {
        text-align: left;
        flex-grow: 1;
        font-size: ${b};
        font-weight: ${g};
      }

      .vote-button {
        background-color: #ffffff;
        border: 1px solid #767676;
        border-radius: 2px;
        margin-left: 10px;
        padding: 0;
        width: 25px;
        height: 25px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: none;
        cursor: pointer;
      }

      .vote-button:focus-within {
        outline: 2px solid black;
        outline-offset: 1px;
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
        border-color: ${s};
      }

      .vote-button.noselection svg {
        filter: ${r};
      }

      .vote-button.unselected {
        border-color: ${p};
      }

      .vote-button.unselected svg {
        filter: ${m};
      }

      #upvote.selected {
        border-color: ${a};
      }

      #upvote.selected svg {
        filter: ${l};
      }

      #downvote.selected {
        border-color: ${d};
      }

      #downvote.selected svg {
        filter: ${h};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${p};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${m};
      }

      :host(:invalid) #upvote,
      :host(:invalid) #downvote {
        box-shadow: 0 0 4px red;
      }

      #comments {
        --surveyQuestionMargin: 0;
      }

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
    `}};Fe.UPVOTE_SR_LABEL=it("Vote up");Fe.DOWNVOTE_SR_LABEL=it("Vote down");Fe.formAssociated=!0;Fe.shadowRootOptions={...tt.shadowRootOptions,delegatesFocus:!0};n([E({type:String})],Fe.prototype,"prompt",void 0);n([E({type:String})],Fe.prototype,"vote",void 0);n([E({type:String})],Fe.prototype,"comment",void 0);n([E({type:String})],Fe.prototype,"commentPlaceholder",void 0);n([E({type:Boolean,reflect:!0})],Fe.prototype,"required",void 0);n([E({type:Boolean,reflect:!0})],Fe.prototype,"disabled",void 0);n([E({type:Boolean,reflect:!0})],Fe.prototype,"skipNumber",void 0);n([E({type:Boolean,reflect:!0})],Fe.prototype,"showComments",void 0);n([Le("#comments")],Fe.prototype,"commentBox",void 0);Fe=ro=n([Ge("ia-survey-vote")],Fe);let To=class extends tt{constructor(){super(...arguments),this.name="",this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return G}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};n([E({type:String,reflect:!0})],To.prototype,"name",void 0);n([E({type:String,reflect:!0})],To.prototype,"value",void 0);To=n([Ge("ia-survey-extra")],To);const Qu=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`;let Pe=class extends W{constructor(){super(...arguments);c(this,"minDate");c(this,"maxDate");c(this,"minSelectedDate");c(this,"maxSelectedDate");c(this,"buckets");c(this,"customDateFormat");c(this,"customTooltipDateFormat");c(this,"customTooltipLabel");c(this,"binSnapping","none");c(this,"barScaling","logarithmic");c(this,"modalManager");c(this,"analyticsHandler");c(this,"boundEscapeListener",t=>{t.key==="Escape"&&this.closeModal()})}render(){return f`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${this.minSelectedDate??this.minDate}
          .maxSelectedDate=${this.maxSelectedDate??this.maxDate}
          dateFormat=${Re(this.customDateFormat)}
          tooltipDateFormat=${Re(this.customTooltipDateFormat)}
          tooltipLabel=${Re(this.customTooltipLabel)}
          .binSnapping=${this.binSnapping}
          .barScaling=${this.barScaling??y}
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
            ${_("Apply date range")}
          </button>
        </histogram-date-range>
      </div>
    `}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.setupEscapeListener()}disconnectedCallback(){var t;(t=super.disconnectedCallback)==null||t.call(this),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener("keydown",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keydown",this.boundEscapeListener)}histogramDateRangeUpdated(t){this.minSelectedDate=t.detail.minDate,this.maxSelectedDate=t.detail.maxDate}applyBtnClicked(){var i;const t=new CustomEvent("histogramDateRangeApplied",{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(t),this.closeModal(),(i=this.analyticsHandler)==null||i.sendEvent({category:ft.default,action:oe.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent("modalClosed")))}static get styles(){return x`
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
    `}};n([u({type:String})],Pe.prototype,"minDate",void 0);n([u({type:String})],Pe.prototype,"maxDate",void 0);n([u({type:String})],Pe.prototype,"minSelectedDate",void 0);n([u({type:String})],Pe.prototype,"maxSelectedDate",void 0);n([u({type:Array})],Pe.prototype,"buckets",void 0);n([u({type:String})],Pe.prototype,"customDateFormat",void 0);n([u({type:String})],Pe.prototype,"customTooltipDateFormat",void 0);n([u({type:String})],Pe.prototype,"customTooltipLabel",void 0);n([u({type:String})],Pe.prototype,"binSnapping",void 0);n([u({type:String})],Pe.prototype,"barScaling",void 0);n([u({type:Object,attribute:!1})],Pe.prototype,"modalManager",void 0);n([u({type:Object,attribute:!1})],Pe.prototype,"analyticsHandler",void 0);Pe=n([H("expanded-date-picker")],Pe);const Ku=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,Xu=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`;let Li=class extends W{constructor(){super(...arguments);c(this,"size");c(this,"step",2);c(this,"currentPage",1);c(this,"pages",[])}firstUpdated(){this.observePageCount()}updated(t){t.has("size")&&this.observePageCount(),t.has("currentPage")&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];const t=7,i=this.size<=t;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(a=>a+1);return}if(this.size===t){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(i&&this.currentPage>1&&this.currentPage<t){this.pages=[...Array(this.size).keys()].map(a=>a+1);return}let s=this.currentPage-this.step,r=this.currentPage+this.step;s<=0&&(r+=-s+1,s=1),r>=this.size&&(s=Math.max(s-(r-this.size),1),r=this.size),s===2&&(r-=1),r===this.size-1&&(s+=1),this.createFirstNode(s),this.createMiddelNode(s,r),this.createLastNode(r)}createFirstNode(t){var i,s;t>1&&((i=this.pages)==null||i.push(1)),t>2&&((s=this.pages)==null||s.push(0))}createMiddelNode(t,i){var s;for(let r=t;r<=i;r+=1)(s=this.pages)==null||s.push(r)}createLastNode(t){var i,s;t<this.size-1&&((i=this.pages)==null||i.push(0)),t<this.size&&((s=this.pages)==null||s.push(this.size))}get getEllipsisTemplate(){return f`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent("pageNumberClicked",{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){this.currentPage-=1,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(t){this.currentPage=t}getPageTemplate(t){return f`
      <button
        @click=${()=>this.onChange(t)}
        class=${this.currentPage===t?"current":""}
        data-page=${t}
      >
        ${t}
      </button>
    `}get getPagesTemplate(){var t;return!this.pages||!this.pages.length?y:f`
      ${(t=this.pages)==null?void 0:t.map(i=>f`${i!==0?this.getPageTemplate(i):this.getEllipsisTemplate}`)}
    `}render(){return f`
      <div class="facets-pagination">
        <button class="arrow-icon rewind" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${Ku}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${Xu}
        </button>
      </div>
    `}static get styles(){return[lt,x`
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
      `]}};n([u({type:Number})],Li.prototype,"size",void 0);n([u({type:Number})],Li.prototype,"step",void 0);n([u({type:Number})],Li.prototype,"currentPage",void 0);n([I()],Li.prototype,"pages",void 0);Li=n([H("more-facets-pagination")],Li);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tc=(o,e,t)=>{const i=new Map;for(let s=e;s<=t;s++)i.set(o[s],s);return i},fd=Fs(class extends Ps{constructor(o){if(super(o),o.type!==pt.CHILD)throw Error("repeat() can only be used in text expressions")}dt(o,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const s=[],r=[];let a=0;for(const l of o)s[a]=i?i(l,a):a,r[a]=t(l,a),a++;return{values:r,keys:s}}render(o,e,t){return this.dt(o,e,t).values}update(o,[e,t,i]){const s=M1(o),{values:r,keys:a}=this.dt(e,t,i);if(!Array.isArray(s))return this.ut=a,r;const l=this.ut??(this.ut=[]),d=[];let h,p,m=0,g=s.length-1,b=0,$=r.length-1;for(;m<=g&&b<=$;)if(s[m]===null)m++;else if(s[g]===null)g--;else if(l[m]===a[b])d[b]=Ht(s[m],r[b]),m++,b++;else if(l[g]===a[$])d[$]=Ht(s[g],r[$]),g--,$--;else if(l[m]===a[$])d[$]=Ht(s[m],r[$]),Ki(o,d[$+1],s[m]),m++,$--;else if(l[g]===a[b])d[b]=Ht(s[g],r[b]),Ki(o,s[m],s[g]),g--,b++;else if(h===void 0&&(h=tc(a,b,$),p=tc(l,m,g)),h.has(l[m]))if(h.has(l[g])){const C=p.get(a[b]),M=C!==void 0?s[C]:null;if(M===null){const P=Ki(o,s[m]);Ht(P,r[b]),d[b]=P}else d[b]=Ht(M,r[b]),Ki(o,s[m],M),s[C]=null;b++}else pr(s[g]),g--;else pr(s[m]),m++;for(;b<=$;){const C=Ki(o,d[$+1]);Ht(C,r[b]),d[b++]=C}for(;m<=g;){const C=s[m++];C!==null&&pr(C)}return this.ut=a,Wc(o,d),Ve}}),Zu=Y`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,Ju=Y`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`;var Ca;let Ms=Ca=class extends W{constructor(){super(...arguments);c(this,"facetType");c(this,"bucket");c(this,"collectionTitles")}render(){return f`${this.facetRowTemplate}`}get facetRowTemplate(){var P;const{bucket:t,facetType:i}=this;if(!t||!i)return y;const s=`${i}:${t.key}-show-only`,r=`${i}:${t.key}-negative`,a=t.extraNote?f`<span class="facet-note">${t.extraNote}</span>`:y,l=i!=="collection"?f`${t.displayText??t.key} ${a}`:f`<a href="/details/${t.key}">
            ${((P=this.collectionTitles)==null?void 0:P.get(t.key))??t.key}
          </a> `,d=t.count>0?t.count.toLocaleString():"",h=t.state==="hidden",p=t.state==="selected",m=`${i}: ${t.displayText??t.key}`,g=p?`Show all ${i}s`:`Only show ${m}`,b=`Hide ${m}`,$=`Unhide ${m}`,C=h?$:b,M=`${m}, ${t.count} results`;return f`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${i}
            .value=${t.key}
            @click=${F=>{this.facetClicked(F,!1)}}
            .checked=${p}
            class="select-facet-checkbox"
            title=${g}
            id=${s}
            data-testid=${s}
          />
          <div class="hide-facet-container">
            <input
              type="checkbox"
              id=${r}
              .name=${i}
              .value=${t.key}
              @click=${F=>{this.facetClicked(F,!0)}}
              .checked=${h}
              class="hide-facet-checkbox"
            />
            <label
              for=${r}
              class="hide-facet-icon${h?" active":""}"
              title=${C}
              data-testid=${r}
            >
              <span class="sr-only">${C}</span>
              <span class="eye eye-open">${Zu}</span>
              <span class="eye eye-closed">${Ju}</span>
            </label>
          </div>
        </div>
        <label
          for=${s}
          class="facet-info-display"
          title=${g}
          aria-label=${M}
        >
          <div class="facet-title">${l}</div>
          <div class="facet-count">${d}</div>
        </label>
      </div>
    `}facetClicked(t,i){const{bucket:s,facetType:r}=this;if(!s||!r)return;const a=t.target,{checked:l}=a;this.bucket={...s,state:Ca.getFacetState(l,i)},this.dispatchFacetClickEvent({facetType:r,bucket:this.bucket,negative:i})}dispatchFacetClickEvent(t){const i=new CustomEvent("facetClick",{detail:t});this.dispatchEvent(i)}static getFacetState(t,i){let s;return t?s=i?"hidden":"selected":s="none",s}static get styles(){const t=x`var(--facet-row-border-top, 1px solid transparent)`,i=x`var(--facet-row-border-bottom, 1px solid transparent)`,s=x`15px`,r=x`
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: ${s};
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: ${s};
        width: ${s};
        margin: 0;
      }
      .facet-row-container {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 0 auto;
        padding: 0.25rem 0;
        height: auto;
        border-top: ${t};
        border-bottom: ${i};
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
      .facet-note {
        color: #bbb;
      }
      .facet-count {
        text-align: right;
      }
      .select-facet-checkbox {
        cursor: pointer;
        display: inline-block;
      }
      .hide-facet-checkbox {
        position: absolute;
        clip: rect(0, 0, 0, 0);
        pointer-events: none;
      }
      .hide-facet-checkbox:focus-visible + .hide-facet-icon {
        outline-style: auto;
        outline-offset: 2px;
      }
      .hide-facet-icon {
        width: ${s};
        height: ${s};
        cursor: pointer;
        display: flex;
      }
      .eye {
        width: ${s};
        height: ${s};
        opacity: 0.3;
      }
      .hide-facet-icon:hover .eye,
      .active .eye {
        opacity: 1;
      }
      .hide-facet-icon:hover .eye-open,
      .hide-facet-icon .eye-closed {
        display: none;
      }
      .hide-facet-icon:hover .eye-closed,
      .hide-facet-icon.active .eye-closed {
        display: inline;
      }
      .hide-facet-icon.active .eye-open {
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
    `;return[lt,r]}};n([u({type:String})],Ms.prototype,"facetType",void 0);n([u({type:Object})],Ms.prototype,"bucket",void 0);n([u({type:Object})],Ms.prototype,"collectionTitles",void 0);Ms=Ca=n([H("facet-row")],Ms);let ko=class extends W{constructor(){super(...arguments);c(this,"facetGroup");c(this,"collectionTitles")}facetClicked(t){this.dispatchFacetClickEvent(t.detail)}dispatchFacetClickEvent(t){const i=new CustomEvent("facetClick",{detail:t,composed:!0});this.dispatchEvent(i)}get facetsTemplate(){const{facetGroup:t}=this;if(!t)return y;const i=t.buckets;return f`
      <div class="facet-rows" data-testid="facets-on-${t.key}">
        ${fd(i,s=>`${t.key}:${s.key}`,s=>f`<facet-row
              .facetType=${t.key}
              .bucket=${s}
              .collectionTitles=${this.collectionTitles}
              @facetClick=${this.facetClicked}
            ></facet-row>`)}
      </div>
    `}render(){return f`${this.facetsTemplate}`}static get styles(){const t=x`var(--facetsColumnCount, 1)`,i=x`var(--facetsColumnGap, 15px)`;return x`
      .facet-rows {
        column-count: ${t};
        column-gap: ${i};
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `}};n([u({type:Object})],ko.prototype,"facetGroup",void 0);n([u({type:Object})],ko.prototype,"collectionTitles",void 0);ko=n([H("facets-template")],ko);let Ot=class extends W{constructor(){super(...arguments);c(this,"leftValue","");c(this,"leftLabel");c(this,"rightValue","");c(this,"rightLabel");c(this,"side","left");c(this,"leftRadio")}render(){return f`
      <div id="container">
        <label for="switch-left">${this.leftLabel??this.leftValue}</label>
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
        <label for="switch-right">${this.rightLabel??this.rightValue}</label>
      </div>
    `}get value(){return this.side==="left"?this.leftValue:this.rightValue}get selectedLabel(){return this.side==="left"?this.leftLabel??this.leftValue:this.rightLabel??this.rightValue}handleClick(){this.side=this.side==="left"?"right":"left",this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?"left":"right",this.emitChangeEvent()}emitChangeEvent(){const t=new CustomEvent("change",{detail:this.value});this.dispatchEvent(t)}static get styles(){const t=x`var(--switchWidth, 30px)`,i=x`var(--switchHeight, 14px)`,s=x`var(--switchMarginLeft, 5px)`,r=x`var(--switchMarginRight, 5px)`,a=x`var(--switchBorderWidth, 3px)`,l=x`var(--switchBgColor, #194880)`,d=x`var(--switchBorderColor, #194880)`,h=x`var(--labelFontSize, 1.3rem)`,p=x`var(--knobColor, white)`,m=x`var(--knobTransitionDuration, 0.25s)`,g=x`var(--knobTransitionFn, ease)`;return[lt,x`
        #container {
          display: inline-flex;
          align-items: center;
          flex-wrap: nowrap;
          font-size: ${h};
        }

        #switch-button {
          width: ${t};
          height: ${i};
          margin: 0 ${r} 0 ${s};
          padding: 0;
          border: ${a} solid ${d};
          border-radius: ${i};
          box-sizing: content-box;
          background: ${l};
          appearance: none;
          cursor: pointer;
        }

        #switch-button.left #knob {
          transform: translateX(0);
        }

        #switch-button.right #knob {
          transform: translateX(calc(${t} - ${i}));
        }

        #switch-button:focus-visible {
          outline: 2px solid black;
          outline-offset: 2px;
        }

        #knob {
          display: block;
          width: ${i};
          height: ${i};
          border-radius: 50%;
          background: ${p};
          transition: transform ${m} ${g};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};n([u({type:String,attribute:!0})],Ot.prototype,"leftValue",void 0);n([u({type:String,attribute:!0})],Ot.prototype,"leftLabel",void 0);n([u({type:String,attribute:!0})],Ot.prototype,"rightValue",void 0);n([u({type:String,attribute:!0})],Ot.prototype,"rightLabel",void 0);n([u({type:String,attribute:!0})],Ot.prototype,"side",void 0);n([Z("#switch-left")],Ot.prototype,"leftRadio",void 0);Ot=n([H("toggle-switch")],Ot);const e2=1e4,t2=35;let le=class extends W{constructor(){super(...arguments);c(this,"facetKey");c(this,"query");c(this,"identifiers");c(this,"filterMap");c(this,"searchType");c(this,"pageSpecifierParams");c(this,"collectionTitles");c(this,"tvChannelAliases");c(this,"facetsPerPage",t2);c(this,"facetsLoading",!0);c(this,"selectedFacets");c(this,"sortedBy",q.COUNT);c(this,"isTvSearch",!1);c(this,"modalManager");c(this,"searchService");c(this,"analyticsHandler");c(this,"aggregations");c(this,"facetGroup");c(this,"unappliedFacetChanges",$t());c(this,"pageNumber",1)}willUpdate(t){(t.has("aggregations")||t.has("facetsPerPage")||t.has("sortedBy")||t.has("selectedFacets")||t.has("unappliedFacetChanges"))&&(this.facetGroup=this.mergedFacets)}updated(t){(t.has("facetKey")||t.has("query")||t.has("searchType")||t.has("filterMap"))&&(this.facetsLoading=!0,this.pageNumber=1,this.sortedBy=fs[this.facetKey],this.updateSpecificFacets())}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener("keydown",t=>{var i;t.key==="Escape"&&((i=this.modalManager)==null||i.closeModal())}):document.removeEventListener("keydown",()=>{})}get isSearchResultsPage(){var i;const t=(i=this.pageSpecifierParams)==null?void 0:i.pageType;return t===void 0||t==="search_results"}async updateSpecificFacets(){var d,h,p,m,g,b;if(!this.facetKey)return;const t=(d=this.query)==null?void 0:d.trim();if(!t&&this.isSearchResultsPage)return;const i={simpleParams:[this.facetKey]},s=e2,r={...this.pageSpecifierParams,query:t||"",identifiers:this.identifiers,filters:this.filterMap,aggregations:i,aggregationsSize:s,rows:0},a=await((h=this.searchService)==null?void 0:h.search(r,this.searchType));this.aggregations=(p=a==null?void 0:a.success)==null?void 0:p.response.aggregations,this.facetsLoading=!1;const l=(g=(m=a==null?void 0:a.success)==null?void 0:m.response)==null?void 0:g.collectionTitles;if(l)for(const[$,C]of Object.entries(l))(b=this.collectionTitles)==null||b.set($,C)}pageNumberClicked(t){var s,r;const i=(s=t==null?void 0:t.detail)==null?void 0:s.page;i&&(this.pageNumber=Number(i)),(r=this.analyticsHandler)==null||r.sendEvent({category:ft.default,action:oe.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){if(!this.facetKey||!this.selectedFacets)return;const{selectedFacetGroup:t,aggregationFacetGroup:i}=this;if(!i)return;const s={...t??i},r=(t==null?void 0:t.buckets.map(l=>{const d=i.buckets.find(h=>h.key===l.key);return d?{...l,count:d.count}:l}))??[];Hc(r,this.sortedBy),i.buckets.forEach(l=>{t!=null&&t.buckets.find(h=>h.key===l.key)||r.push(l)});const a=this.unappliedFacetChanges[this.facetKey];for(const[l,d]of r.entries()){const h=a==null?void 0:a[d.key];h&&(r[l]={...h})}return this.facetKey==="creator"&&this.isTvSearch&&r.forEach(l=>{var h,p;l.displayText=(h=l.displayText??l.key)==null?void 0:h.toLocaleUpperCase();const d=(p=this.tvChannelAliases)==null?void 0:p.get(l.displayText);d&&d!==l.displayText&&(l.extraNote=`(${d})`)}),s.buckets=r,s}get selectedFacetGroup(){if(!this.selectedFacets||!this.facetKey)return;const t=this.selectedFacets[this.facetKey];if(!t)return;const i=vo[this.facetKey],s=Object.entries(t).map(([r,a])=>({displayText:r,key:r,count:a==null?void 0:a.count,state:a==null?void 0:a.state}));return{title:i,key:this.facetKey,buckets:s}}get aggregationFacetGroup(){if(!this.aggregations||!this.facetKey)return;const t=this.aggregations[this.facetKey];if(!t)return;const i=vo[this.facetKey];let s=t.getSortedBuckets(this.sortedBy);this.facetKey==="collection"&&(s=s==null?void 0:s.filter(a=>{var d;const l=(d=a==null?void 0:a.key)==null?void 0:d.toString();return!Oo[l]&&!(l!=null&&l.startsWith("fav-"))}));const r=s.map(a=>{const l=`${a.key}`;return{displayText:`${l}`,key:`${l}`,count:a.doc_count,state:"none"}});return{title:i,key:this.facetKey,buckets:r}}get facetGroupForCurrentPage(){const{facetGroup:t}=this;if(!t)return;const i=(this.pageNumber-1)*this.facetsPerPage,s=t.buckets.slice(i,i+this.facetsPerPage);return{...t,buckets:s}}get moreFacetsTemplate(){return f`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${t=>{this.facetKey&&(this.unappliedFacetChanges=Kt(this.unappliedFacetChanges,this.facetKey,t.detail.bucket))}}
      ></facets-template>
    `}get loaderTemplate(){return f`<div class="facets-loader">
      <ia-activity-indicator .mode=${"processing"}></ia-activity-indicator>
    </div> `}get paginationSize(){var i;if(!this.aggregations||!this.facetKey)return 0;const t=(i=this.aggregations[this.facetKey])==null?void 0:i.buckets.length;return Math.ceil(t/this.facetsPerPage)}get facetsPaginationTemplate(){return this.paginationSize>1?f`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`:y}get footerTemplate(){return this.paginationSize>0?f`${this.facetsPaginationTemplate}
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
        </div> `:y}sortFacetAggregation(t){this.sortedBy=t,this.dispatchEvent(new CustomEvent("sortedFacets",{detail:this.sortedBy}))}get modalHeaderTemplate(){var s,r;const i=(this.sortedBy??fs[this.facetKey])===q.COUNT?"left":"right";return f`<span class="sr-only">${_("More facets for:")}</span>
      <span class="title">
        ${(s=this.facetGroup)==null?void 0:s.title}

        <label class="sort-label">${_("Sort by:")}</label>
        ${this.facetKey?f`<toggle-switch
              class="sort-toggle"
              leftValue=${q.COUNT}
              leftLabel="Count"
              rightValue=${b1[this.facetKey]}
              .rightLabel=${(r=this.facetGroup)==null?void 0:r.title}
              side=${i}
              @change=${a=>{this.sortFacetAggregation(Number(a.detail))}}
            ></toggle-switch>`:y}
      </span>`}render(){return f`
      ${this.facetsLoading?this.loaderTemplate:f`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){var s,r;const t=Uc(this.selectedFacets,this.unappliedFacetChanges),i=new CustomEvent("facetsChanged",{detail:t,bubbles:!0,composed:!0});this.dispatchEvent(i),this.unappliedFacetChanges=$t(),(s=this.modalManager)==null||s.closeModal(),(r=this.analyticsHandler)==null||r.sendEvent({category:ft.default,action:`${oe.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){var t,i;this.unappliedFacetChanges=$t(),(t=this.modalManager)==null||t.closeModal(),(i=this.analyticsHandler)==null||i.sendEvent({category:ft.default,action:oe.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){const t=x`var(--primaryButtonBGColor, #194880)`;return[lt,x`
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
          background-color: ${t};
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
      `]}};n([u({type:String})],le.prototype,"facetKey",void 0);n([u({type:String})],le.prototype,"query",void 0);n([u({type:Array})],le.prototype,"identifiers",void 0);n([u({type:Object})],le.prototype,"filterMap",void 0);n([u({type:Number})],le.prototype,"searchType",void 0);n([u({type:Object})],le.prototype,"pageSpecifierParams",void 0);n([u({type:Object})],le.prototype,"collectionTitles",void 0);n([u({type:Object})],le.prototype,"tvChannelAliases",void 0);n([u({type:Number})],le.prototype,"facetsPerPage",void 0);n([u({type:Boolean})],le.prototype,"facetsLoading",void 0);n([u({type:Object})],le.prototype,"selectedFacets",void 0);n([u({type:Number})],le.prototype,"sortedBy",void 0);n([u({type:Boolean})],le.prototype,"isTvSearch",void 0);n([u({type:Object})],le.prototype,"modalManager",void 0);n([u({type:Object})],le.prototype,"searchService",void 0);n([u({type:Object,attribute:!1})],le.prototype,"analyticsHandler",void 0);n([I()],le.prototype,"aggregations",void 0);n([I()],le.prototype,"facetGroup",void 0);n([I()],le.prototype,"unappliedFacetChanges",void 0);n([I()],le.prototype,"pageNumber",void 0);le=n([H("more-facets-content")],le);let ic=class extends W{render(){return f`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return x`
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
    `}};ic=n([H("facet-tombstone-row")],ic);let j=class extends W{constructor(){super(...arguments);c(this,"searchService");c(this,"searchType");c(this,"aggregations");c(this,"histogramAggregation");c(this,"minSelectedDate");c(this,"maxSelectedDate");c(this,"moreLinksVisible",!0);c(this,"facetsLoading",!1);c(this,"histogramAggregationLoading",!1);c(this,"selectedFacets");c(this,"collapsableFacets",!1);c(this,"contentWidth");c(this,"showHistogramDatePicker",!1);c(this,"allowExpandingDatePicker",!1);c(this,"suppressMediatypeFacets",!1);c(this,"query");c(this,"identifiers");c(this,"pageSpecifierParams");c(this,"parentCollections",[]);c(this,"filterMap");c(this,"baseNavigationUrl");c(this,"collectionPagePath","/details/");c(this,"isManageView",!1);c(this,"isTvSearch",!1);c(this,"facetDisplayOrder",Bc);c(this,"modalManager");c(this,"resizeObserver");c(this,"featureFeedbackService");c(this,"recaptchaManager");c(this,"analyticsHandler");c(this,"collectionTitles");c(this,"tvChannelAliases");c(this,"openFacets",{subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1,clip_type:!1,program:!1,person:!1,sponsor:!1});c(this,"allowedFacetCount",6);c(this,"handleExpandedDatePickerClosed",()=>{var t;(t=this.modalManager)==null||t.classList.remove("expanded-date-picker")});c(this,"histogramDateRangeUpdated",t=>{const{minDate:i,maxDate:s}=t.detail,r=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:i,maxDate:s}});this.dispatchEvent(r)})}render(){const t=We({loading:this.facetsLoading,managing:this.isManageView}),i=this.isTvSearch?_("Date Published"):_("Year Published"),s="date-picker-label";return f`
      <div id="container" class=${t}>
        ${this.showHistogramDatePicker&&(this.histogramAggregation||this.histogramAggregationLoading)?f`
              <section
                class="facet-group"
                aria-labelledby=${s}
                data-testid="facet-group-header-label-date-picker"
              >
                <h3 id=${s}>
                  ${i} <span class="sr-only">${_("range filter")}</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `:y}
        ${this.collectionPartOfTemplate}
        <slot name="facets-top"></slot>
        ${this.mergedFacets.map(r=>this.getFacetGroupTemplate(r))}
      </div>
    `}get collectionPartOfTemplate(){var i;if(!((i=this.parentCollections)!=null&&i.length))return y;const t="partof-heading";return f`
      <section
        class="facet-group partof-collections"
        aria-labelledby=${t}
        data-testid="facet-group-partof-collections"
      >
        <div class="facet-group-header">
          <h3 id=${t}>${_("Part Of")}</h3>
        </div>
        <ul>
          ${ti(this.parentCollections,s=>{var a;const r=`${this.baseNavigationUrl}${this.collectionPagePath}${s}`;return f` <li>
              <a
                href=${r}
                data-id=${s}
                @click=${this.partOfCollectionClicked}
              >
                ${((a=this.collectionTitles)==null?void 0:a.get(s))??s}
              </a>
            </li>`})}
        </ul>
      </section>
    `}partOfCollectionClicked(t){var i;(i=this.analyticsHandler)==null||i.sendEvent({category:ft.default,action:oe.partOfCollectionClicked,label:t.target.dataset.id})}get histogramProps(){const{histogramAggregation:t}=this;if(!t)return;const i=t.first_bucket_year??t.first_bucket_key,s=t.last_bucket_year??t.last_bucket_key;if(i==null||s==null)return;const r=t.first_bucket_month??1,a=t.last_bucket_month??12,l=t.interval??1,d=t.interval_in_months??12,h=p=>p.toString().padStart(2,"0");if(this.isTvSearch){const p=d<12;return{buckets:t.buckets,dateFormat:"YYYY-MM",tooltipDateFormat:p?"MMM YYYY":"YYYY",tooltipLabel:"broadcast",binSnapping:p?"month":"year",barScaling:"linear",minDate:`${i}-${h(r)}`,maxDate:`${s}-${h(a+d-1)}`}}return{buckets:t.buckets,dateFormat:"YYYY",tooltipDateFormat:"YYYY",tooltipLabel:"item",binSnapping:"year",barScaling:"logarithmic",minDate:`${i}`,maxDate:`${s+l-1}`}}showDatePickerModal(){var $,C,M;const{histogramProps:t}=this;if(!t)return;const{buckets:i,dateFormat:s,tooltipDateFormat:r,tooltipLabel:a,binSnapping:l,barScaling:d,minDate:h,maxDate:p}=t,g=f`
      <expanded-date-picker
        ${Ap(P=>{if(P&&P instanceof Pe){const F=P;F.minSelectedDate=this.minSelectedDate,F.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${h}
        .maxDate=${p}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .customDateFormat=${s}
        .customTooltipDateFormat=${r}
        .customTooltipLabel=${a}
        .binSnapping=${l}
        .barScaling=${d}
        .buckets=${i}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,b=new ii({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:f`${_("Select a date range")}`});($=this.modalManager)==null||$.classList.add("expanded-date-picker"),(C=this.modalManager)==null||C.showModal({config:b,customModalContent:g,userClosedModalCallback:this.handleExpandedDatePickerClosed}),(M=this.analyticsHandler)==null||M.sendEvent({category:ft.default,action:oe.histogramExpanded,label:window.location.href})}updated(t){t.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const t=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(t)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?f`<button
          class="expand-date-picker-btn"
          aria-haspopup="dialog"
          @click=${this.showDatePickerModal}
        >
          <span class="sr-only">${_("Expand date histogram")}</span>
          <span aria-hidden="true">${Qu}</span>
        </button>`:y}get histogramTemplate(){if(this.histogramAggregationLoading)return f` <div class="histogram-loading-indicator">&hellip;</div> `;const{histogramProps:t}=this;if(!t)return y;const{buckets:i,dateFormat:s,tooltipDateFormat:r,tooltipLabel:a,binSnapping:l,barScaling:d,minDate:h,maxDate:p}=t;return f`
      <histogram-date-range
        class=${this.isTvSearch?"wide-inputs":""}
        .minDate=${h}
        .maxDate=${p}
        .minSelectedDate=${this.minSelectedDate??h}
        .maxSelectedDate=${this.maxSelectedDate??p}
        .updateDelay=${100}
        .dateFormat=${s}
        .tooltipDateFormat=${r}
        .tooltipLabel=${a}
        .binSnapping=${l}
        .barScaling=${d}
        .bins=${i}
        missingDataMessage="..."
        .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}get mergedFacets(){const t=[];return this.facetDisplayOrder.forEach(i=>{var h;if(i==="mediatype"&&this.suppressMediatypeFacets)return;const s=this.selectedFacetGroups.find(p=>p.key===i),r=this.aggregationFacetGroups.find(p=>p.key===i);if(s&&!r){t.push(s);return}if(!r)return;const a=s??r;let l=(s==null?void 0:s.buckets.map(p=>{const m=r.buckets.find(g=>g.key===p.key);return m?{...p,count:m.count}:p}))??[];r.buckets.forEach(p=>{l.find(g=>g.key===p.key)||l.push(p)});let d=(h=Object.keys((s==null?void 0:s.buckets)||[]))==null?void 0:h.length;if(d<this.allowedFacetCount&&(d=this.allowedFacetCount),i==="lending"&&(l=l.filter(p=>y1[p.key])),Hc(l,fs[i]),i==="mediatype"){const p=l.findIndex(m=>m.key==="collection");if(p>=d){const[m]=l.splice(p,1);d>this.allowedFacetCount&&(d+=1),l.splice(d-1,0,m)}}i==="creator"&&this.isTvSearch&&l.forEach(p=>{var g,b;p.displayText=(g=p.displayText??p.key)==null?void 0:g.toLocaleUpperCase();const m=(b=this.tvChannelAliases)==null?void 0:b.get(p.displayText);m&&m!==p.displayText&&(p.extraNote=`(${m})`)}),i==="clip_type"&&l.forEach(p=>{p.displayText??(p.displayText=p.key),p.displayText=p.displayText.charAt(0).toLocaleUpperCase()+p.displayText.slice(1)}),a.buckets=l.slice(0,d),t.push(a)}),t}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([i,s])=>{const r=i,a=vo[r],l=Object.entries(s).map(([d,h])=>{let p=d;return r==="lending"&&(p=pl[d]??d),{displayText:p,key:d,count:h.count,state:h.state}});return{title:a,key:r,buckets:l}}):[]}get aggregationFacetGroups(){const t=[];return Object.entries(this.aggregations??[]).forEach(([i,s])=>{if(["year_histogram","date_histogram"].includes(i))return;const r=i,a=vo[r];if(!a)return;let l=s.getSortedBuckets(fs[r]);r==="collection"&&(l=l==null?void 0:l.filter(p=>{var g;const m=(g=p==null?void 0:p.key)==null?void 0:g.toString();return!Oo[m]&&!(m!=null&&m.startsWith("fav-"))}));const d=l.map(p=>{const m=p.key;let g=`${p.key}`;return r==="lending"&&(g=pl[p.key]??`${p.key}`),{displayText:g,key:`${m}`,count:p.doc_count,state:"none"}}),h={title:a,key:r,buckets:d};t.push(h)}),t}getFacetGroupTemplate(t){if(!this.facetsLoading&&t.buckets.length===0)return y;const{key:i}=t,s=this.openFacets[i],r=f`
      <span class="collapser ${s?"open":""}"> ${na} </span>
    `,a=()=>{const d={...this.openFacets};d[i]=!s,this.openFacets=d},l=`facet-group-header-label-${t.key}`;return f`
      <section
        class="facet-group ${this.collapsableFacets?"mobile":""}"
        aria-labelledby=${l}
        data-testid=${l}
      >
        <div class="facet-group-header">
          <h3
            id=${l}
            @click=${a}
            @keyup=${a}
          >
            ${this.collapsableFacets?r:y} ${t.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div
          class="facet-group-content ${s?"open":""}"
          data-testid="facet-group-content-${t.key}"
        >
          ${this.facetsLoading?this.getTombstoneFacetGroupTemplate():f`
                ${this.getFacetTemplate(t)}
                ${this.searchMoreFacetsLink(t)}
              `}
        </div>
      </section>
    `}getTombstoneFacetGroupTemplate(){return f`
      ${ti(Array(5).fill(null),()=>f`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(t){if(!this.moreLinksVisible||t.key==="lending"||Object.keys(t.buckets).length<this.allowedFacetCount)return y;const i=fs[t.key];return f`<button
      class="more-link"
      @click=${()=>{var s;this.showMoreFacetsModal(t,i),(s=this.analyticsHandler)==null||s.sendEvent({category:ft.default,action:oe.showMoreFacetsModal,label:t.key}),this.dispatchEvent(new CustomEvent("showMoreFacets",{detail:t.key}))}}
      data-testid="more-link-btn"
    >
      More...
    </button>`}async showMoreFacetsModal(t,i){var a,l;const s=f`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${t.key}
        .query=${this.query}
        .identifiers=${this.identifiers}
        .filterMap=${this.filterMap}
        .pageSpecifierParams=${this.pageSpecifierParams}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .searchType=${this.searchType}
        .collectionTitles=${this.collectionTitles}
        .tvChannelAliases=${this.tvChannelAliases}
        .selectedFacets=${this.selectedFacets}
        .sortedBy=${i}
        .isTvSearch=${this.isTvSearch}
        @facetsChanged=${d=>{const h=new CustomEvent("facetsChanged",{detail:d.detail,bubbles:!0,composed:!0});this.dispatchEvent(h)}}
      >
      </more-facets-content>
    `,r=new ii({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:f`Select filters`});(a=this.modalManager)==null||a.classList.add("more-search-facets"),(l=this.modalManager)==null||l.showModal({config:r,customModalContent:s,userClosedModalCallback:()=>{var d;(d=this.modalManager)==null||d.classList.remove("more-search-facets")}})}getFacetTemplate(t){return f`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${t}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${i=>{this.selectedFacets=Kt(this.selectedFacets,t.key,i.detail.bucket,!0);const s=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(s)}}
      ></facets-template>
    `}static get styles(){return[lt,x`
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
          height: 5.25rem;
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

        .facet-group {
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
          margin: 0;
        }

        .more-link {
          font-size: 1.2rem;
          text-decoration: none;
          padding: 0;
          margin-top: 0.25rem;
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

        .expand-date-picker-btn svg {
          width: 14px;
          height: 14px;
        }

        .sorting-icon {
          height: 15px;
          cursor: pointer;
        }

        histogram-date-range.wide-inputs {
          --histogramDateRangeInputWidth: 4.8rem;
        }
      `]}};n([u({type:Object})],j.prototype,"searchService",void 0);n([u({type:Number})],j.prototype,"searchType",void 0);n([u({type:Object})],j.prototype,"aggregations",void 0);n([u({type:Object})],j.prototype,"histogramAggregation",void 0);n([u({type:String})],j.prototype,"minSelectedDate",void 0);n([u({type:String})],j.prototype,"maxSelectedDate",void 0);n([u({type:Boolean})],j.prototype,"moreLinksVisible",void 0);n([u({type:Boolean})],j.prototype,"facetsLoading",void 0);n([u({type:Boolean})],j.prototype,"histogramAggregationLoading",void 0);n([u({type:Object})],j.prototype,"selectedFacets",void 0);n([u({type:Boolean})],j.prototype,"collapsableFacets",void 0);n([u({type:Number})],j.prototype,"contentWidth",void 0);n([u({type:Boolean})],j.prototype,"showHistogramDatePicker",void 0);n([u({type:Boolean})],j.prototype,"allowExpandingDatePicker",void 0);n([u({type:Boolean})],j.prototype,"suppressMediatypeFacets",void 0);n([u({type:String})],j.prototype,"query",void 0);n([u({type:Array})],j.prototype,"identifiers",void 0);n([u({type:Object})],j.prototype,"pageSpecifierParams",void 0);n([u({type:Array})],j.prototype,"parentCollections",void 0);n([u({type:Object})],j.prototype,"filterMap",void 0);n([u({type:String})],j.prototype,"baseNavigationUrl",void 0);n([u({type:String})],j.prototype,"collectionPagePath",void 0);n([u({type:Boolean})],j.prototype,"isManageView",void 0);n([u({type:Boolean})],j.prototype,"isTvSearch",void 0);n([u({type:Array})],j.prototype,"facetDisplayOrder",void 0);n([u({type:Object,attribute:!1})],j.prototype,"modalManager",void 0);n([u({type:Object,attribute:!1})],j.prototype,"resizeObserver",void 0);n([u({type:Object,attribute:!1})],j.prototype,"featureFeedbackService",void 0);n([u({type:Object,attribute:!1})],j.prototype,"recaptchaManager",void 0);n([u({type:Object,attribute:!1})],j.prototype,"analyticsHandler",void 0);n([u({type:Object,attribute:!1})],j.prototype,"collectionTitles",void 0);n([u({type:Object,attribute:!1})],j.prototype,"tvChannelAliases",void 0);n([I()],j.prototype,"openFacets",void 0);j=n([H("collection-facets")],j);let sc=class extends W{render(){return f`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const e=x`var(--circularActivityIndicatorColor, dodgerblue)`,t=x`var(--circularActivityIndicatorThickness, 4px)`;return x`
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
    `}};sc=n([H("circular-activity-indicator")],sc);function i2(o,e){return o===void 0?e!==void 0:e===void 0?o!==void 0:o.facetType===e.facetType&&o.bucketKey===e.bucketKey}function Ta(o,e){return o.label===e.label&&o.facets.length===e.facets.length&&o.facets.every((t,i)=>i2(t,e.facets[i]))}function md(o){if(!Array.isArray(o[0])){let s=[...o];for(let r=0;r<s.length;r++){const a=s[r];s=s.filter(l=>a===l||!Ta(a,l))}return s}const e=o,t=[];for(const i of e){const s=[];for(const r of i)t.find(l=>l.find(d=>Ta(r,d)))||s.push(r);s.length>0&&t.push(s)}return t}class Za{async getRecommendedFacets(){const e=navigator.language,t=Za.getLanguageDisplayName(e);return t?[{facets:[{facetType:"language",bucketKey:t}]}]:[]}static getLanguageDisplayName(e){const t=e.split("-")[0];return new Intl.DisplayNames(["en"],{type:"language"}).of(t)}}const Vt={facets:[{facetType:"mediatype",bucketKey:"texts"}]},Wt={facets:[{facetType:"mediatype",bucketKey:"audio"}]},gi={facets:[{facetType:"mediatype",bucketKey:"movies"}]},Ct={facets:[{facetType:"mediatype",bucketKey:"image"}]},rs={facets:[{facetType:"mediatype",bucketKey:"software"}]},jr={facets:[{facetType:"mediatype",bucketKey:"etree"}]},s2={facets:[{facetType:"mediatype",bucketKey:"web"}]},o2={facets:[{facetType:"mediatype",bucketKey:"data"}]},r2={text:[Vt],book:[Vt],novel:[Vt],magazine:[Vt],newspaper:[Vt],pdf:[Vt],epub:[Vt],audio:[Wt],song:[Wt],music:[Wt],listen:[Wt],podcast:[Wt],radio:[Wt],stream:[Wt,gi],video:[gi],movie:[gi],film:[gi],animation:[gi],youtube:[gi],image:[Ct],photo:[Ct],picture:[Ct],painting:[Ct],jpg:[Ct],jpeg:[Ct],png:[Ct],gif:[Ct],software:[rs],app:[rs],program:[rs],game:[rs],arcade:[rs],etree:[jr],concert:[jr],"live music":[jr],"web crawl":[s2],dataset:[o2]};class a2{async getRecommendedFacets(e){const t=[];for(const[i,s]of Object.entries(r2))e.includes(i)&&t.push(...s);return t}}const qs=[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],oc=[{label:"Films by __QUERY",facets:[{facetType:"mediatype",bucketKey:"movies"},{facetType:"creator",bucketKey:"__QUERY"}]}],as=[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],Gs=[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],ns=[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],n2={"written work":qs,literature:qs,book:qs,novel:qs,filmmaker:oc,director:oc,author:as,writer:as,novelist:as,essayist:as,poet:as,"visual artist":Gs,"graphic artist":Gs,photographer:Gs,painter:Gs,singer:ns,songwriter:ns,musician:ns,composer:ns,pianist:ns};class l2{constructor(){c(this,"WIKIDATA_BASE_URL","https://www.wikidata.org/w/api.php");c(this,"WIKIDATA_DEFAULT_ARGS","?action=wbsearchentities&format=json&language=en&uselang=en&origin=*&type=item&limit=5")}getWikidataURL(e){const t=encodeURIComponent(e);return`${this.WIKIDATA_BASE_URL}${this.WIKIDATA_DEFAULT_ARGS}&search=${t}`}replaceQueryPlaceholders(e,t){return e.map(i=>{var s;return{label:(s=i.label)==null?void 0:s.replace("__QUERY",t),facets:i.facets.map(r=>{var l;const a={...r,bucketKey:r.bucketKey.replace("__QUERY",t.toLowerCase())};return r.displayText&&(a.displayText=(l=a.displayText)==null?void 0:l.replace("__QUERY",t)),a})}})}async getRecommendedFacets(e){var i;const t=[];try{const s=this.getWikidataURL(e),a=await(await fetch(s)).json();for(const[l,d]of Object.entries(n2))if(new RegExp(`\\b${l}\\b`).test((i=a.search[0])==null?void 0:i.description)){const p=a.search[0].label;t.push(...this.replaceQueryPlaceholders(d,p))}return t}catch(s){return console.warn(s),[]}}}const _o=class _o{async getRecommendedFacets(e,t=_o.DEFAULT_HEURISTICS){const i=t.map(s=>new s().getRecommendedFacets(e));return md((await Promise.all(i)).flat())}};c(_o,"DEFAULT_HEURISTICS",[a2,l2,Za]);let ka=_o;const c2=f`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m 91.666668,8.3333328 v 0.9708343 l -35.3625,39.2916669 -2.137502,2.375 v 3.195832 32.350001 L 45.833334,82.35 V 54.166666 50.970834 l -2.1375,-2.375 L 8.3333328,9.3041671 V 8.3333328 H 91.666668 M 100,0 H 0 V 12.5 L 37.500001,54.166666 V 87.5 l 25,12.5 V 54.166666 L 100,12.5 Z"
      fill="#000"
    />
  </svg>
`,d2=Y`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m50 0c27.6142375 0 50 22.3857625 50 50s-22.3857625 50-50 50-50-22.3857625-50-50 22.3857625-50 50-50zm23.8159475 26.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362 18.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113l18.0989475 18.0988362-18.0989475 18.0988362c-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113 1.4033215 1.4033215 3.5816761 1.5592461 5.1572272.4677738l.5598841-.4677738 18.0988362-18.0989475 18.0988362 18.0989475.5598841.4677738c1.5755511 1.0914723 3.7539057.9355477 5.1572272-.4677738 1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113l-18.0989475-18.0988362 18.0989475-18.0988362c1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113z" fill-rule="evenodd"/></svg>
`;function h2(o){return o&&o.charAt(0).toLocaleUpperCase()+o.slice(1)}let Ds=class extends W{constructor(){super(...arguments);c(this,"facetInfo");c(this,"labelPrefix");c(this,"selected",!1)}render(){if(!this.facetInfo)return y;const t=this.facetInfo.facets.length===1,i=this.facetInfo.facets[0],s=h2((this.labelPrefix?`${this.labelPrefix} `:"")+(this.facetInfo.label??i.displayText??i.bucketKey));if(!s)return y;const r=t&&i.facetType==="mediatype"?Qc[i.bucketKey].icon:y;return f`
      <a
        class="smart-facet-button ${this.selected?"selected":""}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${r} ${s}
        ${this.selected?f`<span class="unselect-button">${d2}</span>`:y}
      </a>
    `}get href(){const t=new URL(window.location.href);if(this.facetInfo)for(const i of this.facetInfo.facets)t.searchParams.append("and[]",encodeURIComponent(`${i.facetType}:"${i.bucketKey}"`));return t.toString()}facetClicked(t){t.preventDefault(),this.facetInfo&&(this.selected=!this.selected,this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:this.facetInfo,details:this.facetInfo.facets.map(i=>({facetType:i.facetType,bucket:{key:i.bucketKey,count:0,state:this.selected?"selected":"none"},negative:!1}))}})))}static get styles(){return x`
      .smart-facet-button {
        display: inline-flex;
        align-items: center;
        column-gap: 5px;
        padding: 5px 5px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
        line-height: normal;
        text-decoration: none;
      }

      .smart-facet-button.selected {
        background: #194880;
        color: white;
      }

      .unselect-button > svg {
        width: 10px;
        height: 10px;
        filter: invert(1);
      }

      .smart-facet-button > svg {
        width: 12px;
        height: 12px;
        filter: invert(0.16667);
      }

      .smart-facet-button.selected > svg {
        filter: invert(1);
      }
    `}};n([u({type:Object})],Ds.prototype,"facetInfo",void 0);n([u({type:String})],Ds.prototype,"labelPrefix",void 0);n([u({type:Boolean})],Ds.prototype,"selected",void 0);Ds=n([H("smart-facet-button")],Ds);let Oi=class extends W{constructor(){super(...arguments);c(this,"facetInfo");c(this,"labelPrefix");c(this,"activeFacetRef");c(this,"dropdown")}render(){if(!this.facetInfo||!this.activeFacetRef||this.facetInfo.length===0)return y;const t=this.activeFacetRef.displayText??this.activeFacetRef.bucketKey;return t?f`
      <div class="dropdown-container">
        <ia-dropdown
          class="dropdown"
          displayCaret
          closeOnSelect
          closeOnEscape
          closeOnBackdropClick
          includeSelectedOption
          usePopover
          .options=${this.dropdownOptions}
          .selectedOption=${this.activeDropdownOption}
          .openViaButton=${!1}
          @optionSelected=${this.optionSelected}
          @click=${this.onDropdownClick}
        >
          <span
            class="dropdown-label"
            slot="dropdown-label"
            @click=${this.defaultOptionSelected}
            >${this.labelPrefix??y} ${t}</span
          >
        </ia-dropdown>
      </div>
    `:y}get dropdownOptions(){var t;return((t=this.facetInfo)==null?void 0:t.map(i=>{const s=i.facets[0];return{id:s.bucketKey,label:f`<span>
            ${i.label??s.displayText??s.bucketKey}
          </span>`}}))??[]}get activeDropdownOption(){if(this.activeFacetRef)return this.dropdownOptions.find(t=>{var i;return t.id===((i=this.activeFacetRef)==null?void 0:i.bucketKey)})}defaultOptionSelected(){var t;this.handleSelection((t=this.activeFacetRef)==null?void 0:t.bucketKey)}optionSelected(t){this.handleSelection(t.detail.option.id)}handleSelection(t){if(!t||!this.facetInfo||!this.activeFacetRef)return;let i;for(const s of this.facetInfo){const r=s.facets.find(a=>a.bucketKey===t);r&&(this.activeFacetRef=r,i=s)}i&&this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:i,details:[{facetType:this.activeFacetRef.facetType,bucket:{key:this.activeFacetRef.bucketKey,count:0,state:"selected"},negative:!1}]}}))}onDropdownClick(){Ze("smart dropdown: onDropdownClick",this),this.dispatchEvent(new CustomEvent("dropdownClick",{detail:this}))}close(){this.dropdown&&(this.dropdown.open=!1)}static get styles(){return x`
      .dropdown-container {
        padding: 5px 5px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
      }

      .dropdown-label {
        font-size: 1.4rem;
        font-family: inherit;
      }

      .dropdown {
        --dropdownBorderColor: #194880;
        --dropdownBorderWidth: 1px;
        --dropdownBgColor: white;
        --dropdownHoverBgColor: #f8f8f8;
        --dropdownTextColor: #2c2c2c;
        --dropdownHoverTextColor: #2c2c2c;
        --dropdownCaretColor: #2c2c2c;
        --dropdownWhiteSpace: nowrap;
        --caretWidth: 14px;
        --caretHeight: 14px;
      }
    `}};n([u({type:Array})],Oi.prototype,"facetInfo",void 0);n([u({type:String})],Oi.prototype,"labelPrefix",void 0);n([u({type:Object})],Oi.prototype,"activeFacetRef",void 0);n([Z("ia-dropdown")],Oi.prototype,"dropdown",void 0);Oi=n([H("smart-facet-dropdown")],Oi);const rc={collection:"Collection: ",creator:"By: ",subject:"About: "};function p2(o){return o.charAt(0).toUpperCase()+o.slice(1)}let qe=class extends W{constructor(){super(...arguments);c(this,"query");c(this,"aggregations");c(this,"selectedFacets");c(this,"collectionTitles");c(this,"filterToggleShown",!1);c(this,"filterToggleActive",!1);c(this,"label");c(this,"heuristicRecs",[]);c(this,"smartFacets",[]);c(this,"lastAggregations")}render(){if(!this.query)return y;const t=!!this.label&&this.smartFacets.length>0;return f`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${t?f`<p id="filters-label">${this.label}</p>`:y}
        ${fd(this.smartFacets,i=>`${i[0].label}|${i[0].facets[0].facetType}|${i[0].facets[0].bucketKey}`,i=>this.makeSmartFacet(i))}
      </div>
    `}willUpdate(t){let i=!1;t.has("query")&&(Ze("query change",t.get("query"),this.query),this.lastAggregations=void 0,i=!0),t.has("aggregations")&&!this.lastAggregations&&this.aggregations&&Object.keys(this.aggregations).length>0&&(Ze("aggs change",t.get("aggregations"),this.aggregations),this.lastAggregations=this.aggregations,i=!0),i&&(Ze("should update smart facets, doing so..."),this.updateSmartFacets())}refresh(){this.lastAggregations=this.aggregations,this.updateSmartFacets()}deselectAll(){for(const t of this.smartFacets)for(const i of t)i.selected=!1;this.requestUpdate()}async updateSmartFacets(){Ze("updating smart facets"),this.query&&(this.heuristicRecs=await new ka().getRecommendedFacets(this.query),Ze("heuristic recs are",this.heuristicRecs),this.smartFacets=md(this.facetsToDisplay),Ze("smart facets are",this.smartFacets))}makeSmartFacet(t){return t.length===0?y:t.length===1?this.smartFacetButton(t[0]):this.smartFacetDropdown(t)}smartFacetButton(t){return f`
      <smart-facet-button
        .facetInfo=${t}
        .labelPrefix=${rc[t.facets[0].facetType]}
        .selected=${t.selected??!1}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `}smartFacetDropdown(t){return f`
      <smart-facet-dropdown
        .facetInfo=${t}
        .labelPrefix=${rc[t[0].facets[0].facetType]}
        .activeFacetRef=${t[0].facets[0]}
        @facetClick=${this.dropdownOptionClicked}
        @dropdownClick=${this.dropdownClicked}
      ></smart-facet-dropdown>
    `}get filtersToggleTemplate(){return this.filterToggleShown?f`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive?"active":""}
        title="${this.filterToggleActive?"Hide":"Show"} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${c2}
      </button>
    `:y}get facetsToDisplay(){const t=[];if(this.heuristicRecs.length>0)for(const i of this.heuristicRecs)i.facets.length===1&&i.facets[0].facetType==="mediatype"||t.push([i]);if(this.lastAggregations){const i=["mediatype","year","language","creator","subject","collection"];for(const s of i){const r=this.lastAggregations[s];if(!r||r.buckets.length===0||["lending","year_histogram","date_histogram"].includes(s)||typeof r.buckets[0]=="number"||s==="mediatype"&&this.selectedFacets&&Object.values(this.selectedFacets.mediatype??{}).some(h=>h.state!=="none"))continue;const a=s,d=r.buckets.filter(h=>{var m,g;const p=(g=(m=this.selectedFacets)==null?void 0:m[a])==null?void 0:g[h.key];return!(p&&p.state!=="none")});if(a!=="mediatype")if(a==="collection"||a==="subject"){const h=d.slice(0,5);t.push(h.map(p=>this.toSmartFacet(a,[p])))}else t.push([this.toSmartFacet(a,[d[0]])])}}return t}toSmartFacet(t,i){return{facets:i.map(s=>{var a;let r=p2(s.key.toString());if(t==="collection"){const l=(a=this.collectionTitles)==null?void 0:a.get(s.key.toString());l&&(r=l)}return{facetType:t,bucketKey:s.key.toString(),displayText:r}})}}toggleSmartFacet(t,i){let s;t.selected?(s="none",this.smartFacets=this.smartFacets.map(r=>r[0]===t?[{...t,selected:!1}]:r)):(s="selected",this.smartFacets=[[{...t,selected:!0}],...this.smartFacets.filter(r=>r[0]!==t)]),this.updateSelectedFacets(i.map(r=>({...r,bucket:{...r.bucket,state:s}})))}updateSelectedFacets(t){for(const s of t)this.selectedFacets=Kt(this.selectedFacets,s.facetType,s.bucket,!0);const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(i)}facetClicked(t){this.toggleSmartFacet(t.detail.smartFacet,t.detail.details)}dropdownOptionClicked(t){const i=this.smartFacets.find(s=>s.length===1&&Ta(s[0],t.detail.smartFacet));if(i){this.toggleSmartFacet(i[0],t.detail.details);return}this.smartFacets=[[{...t.detail.smartFacet,selected:!0}],...this.smartFacets],this.updateSelectedFacets(t.detail.details)}dropdownClicked(t){var i;Ze("smart bar: onDropdownClick",t.detail),(i=this.shadowRoot)==null||i.querySelectorAll("smart-facet-dropdown").forEach(s=>{s!==t.detail&&(Ze("closing",s),s.close())})}filterToggleClicked(){this.dispatchEvent(new CustomEvent("filtersToggled"))}static get styles(){return x`
      #smart-facets-container {
        display: flex;
        align-items: center;
        gap: 5px 10px;
        padding: 10px 0;
        white-space: nowrap;
        overflow: scroll hidden;
        scrollbar-width: none;
      }

      #filters-toggle {
        margin: 0;
        border: 0;
        padding: 5px 8px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
        text-decoration: none;
        cursor: pointer;
      }

      #filters-toggle.active {
        background: #194880;
        color: white;
      }

      #filters-toggle > svg {
        width: 12px;
        filter: invert(0.16667);
        vertical-align: -1px;
      }

      #filters-toggle.active > svg {
        filter: invert(1);
      }

      #filters-label {
        font-size: 1.4rem;
        font-weight: var(--smartFacetLabelFontWeight, normal);
        margin: 0 -5px 0 0;
      }
    `}};n([u({type:String})],qe.prototype,"query",void 0);n([u({type:Object})],qe.prototype,"aggregations",void 0);n([u({type:Object})],qe.prototype,"selectedFacets",void 0);n([u({type:Object})],qe.prototype,"collectionTitles",void 0);n([u({type:Boolean})],qe.prototype,"filterToggleShown",void 0);n([u({type:Boolean})],qe.prototype,"filterToggleActive",void 0);n([u({type:String})],qe.prototype,"label",void 0);n([I()],qe.prototype,"heuristicRecs",void 0);n([I()],qe.prototype,"smartFacets",void 0);n([I()],qe.prototype,"lastAggregations",void 0);qe=n([H("smart-facet-bar")],qe);let A=class extends W{constructor(){super();c(this,"baseNavigationUrl");c(this,"baseImageUrl","https://archive.org");c(this,"searchService");c(this,"searchType",U.DEFAULT);c(this,"withinCollection");c(this,"withinProfile");c(this,"profileElement");c(this,"baseQuery");c(this,"identifiers");c(this,"displayMode");c(this,"selectedSort",T.default);c(this,"selectedTitleFilter",null);c(this,"selectedCreatorFilter",null);c(this,"sortDirection",null);c(this,"defaultSortField",T.relevance);c(this,"defaultSortDirection",null);c(this,"pageSize",50);c(this,"currentPage");c(this,"minSelectedDate");c(this,"maxSelectedDate");c(this,"selectedFacets");c(this,"internalFilters");c(this,"showSmartFacetBar",!1);c(this,"smartFacetBarLabel");c(this,"showHistogramDatePicker",!1);c(this,"suppressPlaceholders",!1);c(this,"suppressResultCount",!1);c(this,"suppressResultTiles",!1);c(this,"suppressURLQuery",!1);c(this,"suppressURLSinParam",!1);c(this,"suppressSortBar",!1);c(this,"suppressDisplayModes",!1);c(this,"suppressMediatypeFacets",!1);c(this,"facetLoadStrategy","eager");c(this,"facetPaneVisible",!1);c(this,"clearResultsOnEmptyQuery",!1);c(this,"collectionPagePath","/details/");c(this,"searchContext",ft.default);c(this,"pageContext","search");c(this,"restorationStateHandler",new C1({context:this.pageContext}));c(this,"mobileBreakpoint",600);c(this,"loggedIn",!1);c(this,"resizeObserver");c(this,"modalManager");c(this,"featureFeedbackService");c(this,"recaptchaManager");c(this,"isTVCollection",!1);c(this,"isManageView",!1);c(this,"manageViewLabel","Select items to remove");c(this,"enableSortOptionsSlot",!1);c(this,"showSmartResults",!1);c(this,"maxPagesToManage",15);c(this,"dataSource",new _1(this,this.pageSize));c(this,"initialPageNumber",1);c(this,"pagesToRender",this.initialPageNumber);c(this,"searchResultsLoading",!1);c(this,"facetsLoading",!1);c(this,"totalResults");c(this,"mobileView",!1);c(this,"tileBlurOverrideState","no-override");c(this,"collapsibleFacetsVisible",!1);c(this,"contentWidth");c(this,"placeholderType",null);c(this,"selectedTVNetwork");c(this,"selectedTVShow");c(this,"tvMapsPopulated",!1);c(this,"loadingNetworks",!1);c(this,"loadingShows",!1);c(this,"contentContainer");c(this,"leftColumn");c(this,"collectionFacets");c(this,"manageBar");c(this,"smartFacetBar");c(this,"tvNetworksDropdown");c(this,"tvShowsDropdown");c(this,"analyticsHandler");c(this,"layoutSizeAnalyticsSent",!1);c(this,"isScrollingToCell",!1);c(this,"isResizeToMobile",!1);c(this,"dataSourceInstallInProgress",!1);c(this,"leftColIntersectionObserver");c(this,"facetsIntersectionObserver");c(this,"placeholderCellTemplate",f`<collection-browser-loading-tile></collection-browser-loading-tile>`);c(this,"infiniteScroller");c(this,"sessionIdGenPromise");c(this,"updateLeftColumnHeight",()=>{var t,i,s,r,a;if(this.mobileView)(i=(t=this.leftColumn)==null?void 0:t.style)==null||i.removeProperty("height");else{const l=(s=this.leftColumn)==null?void 0:s.getBoundingClientRect().top,d=window.innerHeight-(l??0),h=l===0?null:`calc(${d}px - var(--leftColumnPaddingTop, 2rem))`;(a=(r=this.leftColumn)==null?void 0:r.style)==null||a.setProperty("height",h)}});c(this,"updateFacetFadeOut",t=>{var s,r;const i=(s=this.shadowRoot)==null?void 0:s.getElementById("facets-bottom-fade");i==null||i.classList.toggle("hidden",(r=t==null?void 0:t[0])==null?void 0:r.isIntersecting)});c(this,"initialQueryChangeHappened",!1);c(this,"historyPopOccurred",!1);c(this,"previousQueryKey");c(this,"boundNavigationHandler");this.addController(this.dataSource)}tileModelAtCellIndex(t){const i=this.dataSource.getTileModelAt(t);if(!i&&!this.isScrollingToCell&&this.dataSource.queryInitialized){const s=Math.floor(t/this.pageSize)+1;this.dataSource.fetchPage(s)}return i}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{const t=sessionStorage==null?void 0:sessionStorage.getItem("cb-session");if(t)return t;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=Nc(Math.random().toString());const i=await this.sessionIdGenPromise;return sessionStorage==null||sessionStorage.setItem("cb-session",i),i}catch{return""}}goToPage(t){return this.initialPageNumber=t,this.pagesToRender=t,this.scrollToPage(t)}setSearchResultsLoading(t){this.searchResultsLoading=t}setFacetsLoading(t){this.facetsLoading=t}setTotalResultCount(t){this.totalResults=t}clearFilters({facets:t=!0,dateRange:i=!0,letterFilters:s=!0,sort:r=!1}={}){t&&this.hasCheckedFacets&&(this.selectedFacets=$t()),i&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),s&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),r&&(this.sortDirection=null,this.selectedSort=T.default),this.clearTVDropdowns(),this.smartFacetBar&&this.smartFacetBar.deselectAll()}clearTVDropdowns(){this.selectedTVNetwork=void 0,this.selectedTVShow=void 0,this.tvNetworksDropdown&&this.tvNetworksDropdown.clearSelectedOption(),this.tvShowsDropdown&&this.tvShowsDropdown.clearSelectedOption()}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(const t of Object.values(this.selectedFacets))for(const i of Object.values(t))if(i.state!=="none")return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}willUpdate(){this.setPlaceholderType()}render(){return f`
      ${this.showSmartFacetBar&&this.placeholderType===null?f`<smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleShown=${!this.mobileView}
            .filterToggleActive=${this.facetPaneVisible}
            .label=${this.smartFacetBarLabel}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${()=>{this.facetPaneVisible=!this.facetPaneVisible,this.emitFacetPaneVisibilityChanged()}}
          ></smart-facet-bar>`:y}

      <div
        id="content-container"
        class=${this.mobileView?"mobile":"desktop"}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){var h,p;const t=this.dataSource.queryInitialized,i=!!((h=this.baseQuery)!=null&&h.trim()),s=!!((p=this.identifiers)!=null&&p.length),r=!!this.withinCollection,a=!!this.withinProfile,l=!r&&!a,d=!this.searchResultsLoading&&(this.dataSource.size===0||!this.searchService);this.placeholderType=null,!this.suppressPlaceholders&&(t?l&&!i&&!s?this.placeholderType="empty-query":d&&(this.placeholderType=!i&&r?"empty-collection":"no-results"):this.placeholderType="empty-query",this.dataSource.queryErrorMessage&&(this.placeholderType=!i&&r?"collection-error":"query-error"))}get emptyPlaceholderTemplate(){return f`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${this.dataSource.queryErrorMessage??""}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
    `}get collectionBrowserTemplate(){return f`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `}get leftColumnTemplate(){return this.mobileView?this.mobileLeftColumnTemplate:this.desktopLeftColumnTemplate}get mobileLeftColumnTemplate(){return f`
      <div
        id="left-column"
        class="column${this.isResizeToMobile?" preload":""}"
      >
        ${this.facetTopViewSlot} ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `}get desktopLeftColumnTemplate(){return f`
      <div id="left-column" class="column" ?hidden=${!this.facetPaneVisible}>
        ${this.facetTopViewSlot}
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">${_("Filters")}</h2>
          ${this.resultsCountTemplate} ${this.clearFiltersBtnTemplate(!1)}
        </div>
        <div id="facets-container" aria-labelledby="facets-header">
          ${this.facetsTemplate}
          <div id="facets-scroll-sentinel"></div>
        </div>
        <div id="facets-bottom-fade"></div>
      </div>
    `}get facetTopViewSlot(){return f`<div id="facet-top-view">
      <slot name="facet-top-slot"></slot>
    </div>`}get resultsCountTemplate(){var a;if(this.suppressResultCount)return y;const t=this.searchResultsLoading||this.totalResults===void 0,i=We({filtered:this.hasActiveFilters}),s=(a=this.totalResults)==null?void 0:a.toLocaleString(),r=this.totalResults===1?"Result":"Results";return f`
      <div id="results-total" class=${i} data-testid="results-total">
        <span id="big-results-count">
          ${t?f`Searching&hellip;`:s}
        </span>
        <span id="big-results-label">
          ${t?y:r}
        </span>
      </div>
    `}get rightColumnTemplate(){const t=We({column:!0,"full-width":!this.facetPaneVisible,"smart-results-spacing":!!this.showSmartResults});return f`
      <div id="right-column" class=${t}>
        ${this.showSmartResults?f`<slot name="smart-results"></slot>`:y}
        <section id="results">
          <h2 class="results-section-heading">
            <slot name="results-heading"></slot>
          </h2>
          <div id="cb-top-view">
            <slot name="cb-top-slot"></slot>
          </div>
          ${this.isManageView?this.manageBarTemplate:this.sortFilterBarTemplate}
          <slot name="cb-results"></slot>
          ${this.displayMode==="list-compact"&&this.totalResults?this.listHeaderTemplate:y}
          ${this.suppressResultTiles?y:this.infiniteScrollerTemplate}
        </section>
      </div>
    `}get infiniteScrollerTemplate(){return f`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType?0:y}
      ariaLandmarkLabel="Search results"
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
      >${this.displayMode==="grid"?f`<slot name="result-last-tile" slot="result-last-tile"></slot>`:y}
    </infinite-scroller>`}get infiniteScrollerClasses(){return We({[this.displayMode??""]:!!this.displayMode,hidden:!!this.placeholderType})}get sortFilterBarTemplate(){var r;if(this.suppressSortBar)return y;let t=T.weeklyview,i=T.date,s=Lo;return(r=this.withinCollection)!=null&&r.startsWith("fav-")?(i=T.datefavorited,s=p1):!this.withinCollection&&this.searchType===U.TV&&(t=T.alltimeview,i=T.datearchived,s=u1),s.relevance=this.isRelevanceSortAvailable,f`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .defaultViewSort=${t}
        .defaultDateSort=${i}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .sortFieldAvailability=${s}
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
        ${this.tileBlurCheckboxTemplate}
        <slot name="sort-options-left" slot="sort-options-left"></slot>
        <slot name="sort-options" slot="sort-options"></slot>
        <slot name="sort-options-right" slot="sort-options-right"></slot>
      </sort-filter-bar>
    `}get tileBlurCheckboxTemplate(){var t;return(t=this.dataSource.sessionContext)!=null&&t.is_archive_user?f`
      <label
        id="tile-blur-label"
        for="tile-blur-check"
        slot="sort-options-right"
      >
        ${_("Blurring")}
        <input
          id="tile-blur-check"
          type="checkbox"
          ?checked=${!this.shouldSuppressTileBlurring}
          @change=${this.tileBlurCheckboxChanged}
        />
      </label>
    `:y}get manageViewModalMsg(){const t=this.dataSource.checkedTileModels.length>1;switch(this.profileElement){case"uploads":return _(t?"Note: It may take a few minutes for these items to stop appearing in your uploads list.":"Note: It may take a few minutes for this item to stop appearing in your uploads list.");case"web_archives":return _(t?"Note: It may take a few minutes for these items to stop appearing in your web archives list.":"Note: It may take a few minutes for this item to stop appearing in your web archives list.");default:return""}}get manageBarTemplate(){return f`
      <manage-bar
        .label=${this.manageViewLabel}
        .modalManager=${this.modalManager}
        .selectedItems=${this.dataSource.checkedTileModels}
        .manageViewModalMsg=${this.manageViewModalMsg}
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
    `}handleRemoveItems(){this.dispatchEvent(new CustomEvent("itemRemovalRequested",{detail:{items:this.dataSource.checkedTileModels.map(t=>{const i=(t==null?void 0:t.mediatype)==="search"?"search:":"",s=(t==null?void 0:t.identifier)??"";return`${i}${s}`})}}))}handleManageItems(){this.dispatchEvent(new CustomEvent("itemManagerRequested",{detail:{items:this.dataSource.checkedTileModels.map(t=>t!=null&&t.identifier?t.identifier:"")}}))}refreshSmartFacets(){var t;(t=this.smartFacetBar)==null||t.refresh()}showRemoveItemsProcessingModal(){var t;(t=this.manageBar)==null||t.showRemoveItemsProcessingModal()}showRemoveItemsErrorModal(){var t;(t=this.manageBar)==null||t.showRemoveItemsErrorModal()}removeCheckedTiles(){this.dataSource.removeCheckedTiles()}tileBlurCheckboxChanged(t){var s;const{checked:i}=t.target;this.tileBlurOverrideState=i?"on":"off",(s=this.infiniteScroller)==null||s.refreshAllVisibleCells()}get shouldSuppressTileBlurring(){if(this.tileBlurOverrideState!=="no-override")return this.tileBlurOverrideState==="off";const{sessionContext:t}=this.dataSource,i=t==null?void 0:t.pps_relevant_user_preferences;return(i==null?void 0:i.display__blur_moderated_content)==="off"}userChangedSort(t){const{selectedSort:i,sortDirection:s}=t.detail;this.selectedSort=i,this.sortDirection=s,(this.currentPage??1)>1&&this.goToPage(1),this.currentPage=1}sendSortByAnalytics(t){var s;const i=t&&!this.sortDirection;(s=this.analyticsHandler)==null||s.sendEvent({category:this.searchContext,action:oe.sortBy,label:`${this.selectedSort}${this.sortDirection||i?`-${this.sortDirection}`:""}`})}selectedSortChanged(){this.dataSource.updatePrefixFiltersForCurrentSort()}get sortParam(){const t=Ae[this.selectedSort];if(!(t!=null&&t.handledBySearchService))return null;const i=new URL(window.location.href).searchParams.get("sort"),s=t.searchServiceKey??(i==null?void 0:i.replace(/^-/,""));return this.sortDirection||(this.sortDirection="asc"),s?{field:s,direction:this.sortDirection}:null}get defaultSortParam(){const t=this.defaultSortDirection??"asc",i=Ae[this.defaultSortField].searchServiceKey;return i?{field:i,direction:t}:null}displayModeChanged(t){var i;this.displayMode=t.detail.displayMode,this.displayMode&&((i=this.analyticsHandler)==null||i.sendEvent({category:this.searchContext,action:oe.displayMode,label:this.displayMode}))}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(t){var s;if(!t&&!this.selectedTitleFilter)return;const i=t&&!this.selectedTitleFilter;(s=this.analyticsHandler)==null||s.sendEvent({category:this.searchContext,action:oe.filterByTitle,label:i?`clear-${t}`:`${t||"start"}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(t){var s;if(!t&&!this.selectedCreatorFilter)return;const i=t&&!this.selectedCreatorFilter;(s=this.analyticsHandler)==null||s.sendEvent({category:this.searchContext,action:oe.filterByCreator,label:i?`clear-${t}`:`${t||"start"}-${this.selectedCreatorFilter}`})}titleLetterSelected(t){this.selectedCreatorFilter=null,this.selectedTitleFilter=t.detail.selectedLetter}creatorLetterSelected(t){this.selectedTitleFilter=null,this.selectedCreatorFilter=t.detail.selectedLetter}get mobileFacetsTemplate(){return ra.includes(this.profileElement)?y:f`
      <details id="mobile-filter-collapse" @toggle=${i=>{var r;const s=i.target;this.isResizeToMobile=!1,this.collapsibleFacetsVisible=s.open,(r=this.analyticsHandler)==null||r.sendEvent({category:this.searchContext,action:oe.mobileFacetsToggled,label:s.open?"open":"closed"})}}>
        <summary>
          <span class="collapser-icon">${na}</span>
          <h2>${_("Filters")}</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}async networksDropdownToggled(){this.tvMapsPopulated||(this.loadingNetworks=!0,await this.dataSource.populateTVChannelMaps(),this.loadingNetworks=!1,this.tvMapsPopulated=!0)}async showsDropdownToggled(){this.tvMapsPopulated||(this.loadingShows=!0,await this.dataSource.populateTVChannelMaps(),this.loadingShows=!1,this.tvMapsPopulated=!0)}async networksDropdownChanged(){var r;const t=this.selectedTVNetwork,i=(r=this.tvNetworksDropdown.selectedOption)==null?void 0:r.text;this.selectedTVNetwork=i??void 0;const s=this.dataSource.tvChannelMaps.channelToNetwork.entries();for(const[a,l]of s)if(l===t){const d={key:a.toLowerCase(),count:0,state:"none"};this.selectedFacets=Kt(this.selectedFacets,"creator",d,!0)}else if(l===this.selectedTVNetwork){const d={key:a.toLowerCase(),count:0,state:"selected"};this.selectedFacets=Kt(this.selectedFacets,"creator",d)}}async showsDropdownChanged(){var s;const t=this.selectedTVShow,i=(s=this.tvShowsDropdown.selectedOption)==null?void 0:s.text;if(this.selectedTVShow=i??void 0,t!==void 0){const r={key:t,count:0,state:"none"};this.selectedFacets=Kt(this.selectedFacets,"program",r,!0)}if(this.selectedTVShow){const r={key:this.selectedTVShow,count:0,state:"selected"};this.selectedFacets=Kt(this.selectedFacets,"program",r)}}get tvDropdownFiltersTemplate(){if(this.searchType!==U.TV)return y;const{channelToNetwork:t,programToChannels:i}=this.dataSource.tvChannelMaps,s=t?[...new Set(t.values())]:[];let r=i?[...i.entries()]:[];t&&this.selectedTVNetwork&&(r=r.filter(([,d])=>Object.keys(d).some(h=>t.get(h)===this.selectedTVNetwork)));const a=r.map(([d])=>d),l=f`
      <img src="https://archive.org/images/loading.gif" />
    `;return f`
      <div id="tv-filters" slot="facets-top">
        <ia-combo-box
          id="tv-networks"
          class="tv-filter-dropdown"
          placeholder="Filter by Network"
          clearable
          wrap-arrow-keys
          sort
          .options=${s.map((d,h)=>({id:`network-${h}`,text:d}))}
          @toggle=${this.networksDropdownToggled}
          @change=${this.networksDropdownChanged}
        >
          <span class="sr-only">${_("Filter by Network")}</span>
          ${this.loadingNetworks?f`<span slot="empty-options">${l}</span>`:y}
        </ia-combo-box>
        <ia-combo-box
          id="tv-shows"
          class="tv-filter-dropdown"
          placeholder="Filter by Show"
          max-autocomplete-entries="500"
          clearable
          wrap-arrow-keys
          sort
          .options=${a.map((d,h)=>({id:`show-${h}`,text:d}))}
          @toggle=${this.showsDropdownToggled}
          @change=${this.showsDropdownChanged}
        >
          <span class="sr-only">${_("Filter by Show")}</span>
          ${this.loadingShows?f`<span slot="empty-options">${l}</span>`:y}
        </ia-combo-box>
      </div>
    `}get facetsTemplate(){if(ra.includes(this.profileElement))return y;if(this.facetLoadStrategy==="off")return f`
        <p class="facets-message">
          ${_("Facets are temporarily unavailable.")}
        </p>
      `;const t=this.isTVCollection||!this.withinCollection&&this.searchType===U.TV,i=t?v1:Bc,s=f`
      <collection-facets
        .collectionPagePath=${this.collectionPagePath}
        .parentCollections=${this.dataSource.parentCollections}
        .pageSpecifierParams=${this.dataSource.pageSpecifierParams}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.dataSource.aggregations}
        .histogramAggregation=${this.dataSource.histogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .collectionTitles=${this.dataSource.collectionTitles}
        .tvChannelAliases=${this.dataSource.tvChannelAliases}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .allowExpandingDatePicker=${!this.mobileView}
        .allowDatePickerMonths=${t}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .identifiers=${this.identifiers}
        .filterMap=${this.dataSource.filterMap}
        .isManageView=${this.isManageView}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        .facetDisplayOrder=${i}
        .isTvSearch=${t}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?histogramAggregationLoading=${this.facetsLoading}
        ?suppressMediatypeFacets=${this.suppressMediatypeFacets}
        @facetClick=${this.facetClickHandler}
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      >
        ${this.tvDropdownFiltersTemplate}
      </collection-facets>
    `;return(this.facetLoadStrategy==="opt-in"||this.facetLoadStrategy==="opt-in-or-login"&&!this.loggedIn)&&!this.mobileView?f`
        <details
          class="desktop-facets-dropdown"
          @toggle=${a=>{const l=a.target;this.collapsibleFacetsVisible=l.open}}
        >
          <summary>
            <span class="collapser-icon">${na}</span>
            <h2>${_("Filters")}</h2>
          </summary>
          ${s}
        </details>
      `:s}clearFiltersBtnTemplate(t){if(!this.hasActiveFilters)return y;const i=We({"clear-filters-btn":!0,mobile:t}),s=t?"Clear all":"Clear all filters";return f`
      <div class="clear-filters-btn-row">
        ${t?f`<span class="clear-filters-btn-separator">&nbsp;</span>`:y}
        <button class=${i} @click=${this.clearFilters}>
          ${s}
        </button>
      </div>
    `}get listHeaderTemplate(){return f`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .defaultSortParam=${this.defaultSortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.shouldSuppressTileBlurring}
        >
        </tile-dispatcher>
      </div>
    `}histogramDateRangeUpdated(t){var r;const{minDate:i,maxDate:s}=t.detail;[this.minSelectedDate,this.maxSelectedDate]=[i,s],(r=this.analyticsHandler)==null||r.sendEvent({category:this.searchContext,action:oe.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}emitManageModeChangedEvent(){this.dispatchEvent(new CustomEvent("manageModeChanged",{detail:this.isManageView}))}async installDataSourceAndQueryState(t,i){Ze("Installing data source & query state in CB:",t,i),this.dataSource&&this.removeController(this.dataSource),this.dataSource=t,this.addController(this.dataSource),this.baseQuery=i.baseQuery,this.profileElement=i.profileElement,this.searchType=i.searchType,this.selectedFacets=i.selectedFacets??$t(),this.internalFilters=i.internalFilters,this.minSelectedDate=i.minSelectedDate,this.maxSelectedDate=i.maxSelectedDate,this.selectedSort=i.selectedSort??T.default,this.sortDirection=i.sortDirection,this.selectedTitleFilter=i.selectedTitleFilter,this.selectedCreatorFilter=i.selectedCreatorFilter,this.pagesToRender=this.initialPageNumber,this.dataSourceInstallInProgress=!0,this.requestUpdate(),await this.updateComplete,this.dataSourceInstallInProgress=!1,this.searchResultsLoading||(this.setTotalResultCount(this.dataSource.totalResults),this.setTileCount(this.dataSource.size)),this.refreshVisibleResults()}firstUpdated(){this.restoreState(),this.setInitialSize()}setInitialSize(){this.contentWidth=this.contentContainer.getBoundingClientRect().width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.sendLayoutSizeAnalytics()}sendLayoutSizeAnalytics(){this.analyticsHandler&&(this.layoutSizeAnalyticsSent=!0,this.analyticsHandler.sendEvent({category:this.searchContext,action:this.mobileView?oe.loadMobileView:oe.loadDesktopView}))}updated(t){var i,s,r;if(t.has("placeholderType")&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),t.has("analyticsHandler")&&!this.layoutSizeAnalyticsSent&&this.sendLayoutSizeAnalytics(),(t.has("displayMode")||t.has("baseNavigationUrl")||t.has("baseImageUrl")||t.has("loggedIn"))&&((i=this.infiniteScroller)==null||i.reload()),(t.has("baseQuery")||t.has("identifiers")||t.has("searchType")||t.has("withinCollection"))&&!this.historyPopOccurred&&this.initialQueryChangeHappened){const a=t.has("withinCollection")&&!t.has("selectedSort")&&!t.has("sortDirection");this.clearFilters({sort:a,facets:!t.has("selectedFacets"),dateRange:!(t.has("minSelectedDate")||t.has("maxSelectedDate")),letterFilters:!(t.has("selectedTitleFilter")||t.has("selectedCreatorFilter"))})}if(t.has("searchType")&&this.searchType===U.TV&&this.applyDefaultTVSearchSort(),t.has("profileElement")&&this.applyDefaultProfileSort(),t.has("baseQuery")&&this.emitBaseQueryChanged(),t.has("searchType")&&this.emitSearchTypeChanged(),(t.has("currentPage")||t.has("displayMode"))&&this.persistState(),(t.has("baseQuery")||t.has("identifiers")||t.has("minSelectedDate")||t.has("maxSelectedDate")||t.has("selectedFacets")||t.has("searchService")||t.has("withinCollection")||t.has("withinProfile")||t.has("profileElement"))&&this.dataSource.refreshLetterCounts(),t.has("selectedSort")||t.has("sortDirection")){const a=t.get("sortDirection");this.sendSortByAnalytics(a),this.selectedSortChanged()}if(t.has("selectedTitleFilter")&&this.sendFilterByTitleAnalytics(t.get("selectedTitleFilter")),t.has("selectedCreatorFilter")&&this.sendFilterByCreatorAnalytics(t.get("selectedCreatorFilter")),this.updateFacetReadiness(),(t.has("baseQuery")||t.has("identifiers")||t.has("searchType")||t.has("selectedTitleFilter")||t.has("selectedCreatorFilter")||t.has("minSelectedDate")||t.has("maxSelectedDate")||t.has("selectedSort")||t.has("sortDirection")||t.has("selectedFacets")||t.has("searchService")||t.has("withinCollection")||t.has("withinProfile")||t.has("profileElement"))&&this.handleQueryChange(),t.has("searchResultsLoading")&&this.emitSearchResultsLoadingChanged(),t.has("facetsLoading")&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==U.FULLTEXT),t.has("pagesToRender")&&!this.dataSource.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),t.has("isManageView")&&(this.isManageView?(this.displayMode="grid",this.fetchManageableSearchResults()):this.pageContext==="search"&&((s=this.infiniteScroller)==null||s.reload()),(r=this.infiniteScroller)==null||r.refreshAllVisibleCells(),t.get("isManageView")!==void 0&&this.emitManageModeChangedEvent()),t.has("resizeObserver")){const a=t.get("resizeObserver");a&&this.disconnectResizeObserver(a),this.setupResizeObserver()}this.ensureAvailableTilesDisplayed()}connectedCallback(){var t;(t=super.connectedCallback)==null||t.call(this),this.setupStateRestorationObserver(),this.setupResizeObserver()}disconnectedCallback(){var t,i;this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler),(t=this.leftColIntersectionObserver)==null||t.disconnect(),(i=this.facetsIntersectionObserver)==null||i.disconnect(),window.removeEventListener("resize",this.updateLeftColumnHeight)}handleResize(t){const i=this.mobileView;t.target===this.contentContainer&&(this.contentWidth=t.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!i&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}ensureAvailableTilesDisplayed(){this.infiniteScroller&&this.infiniteScroller.itemCount<this.dataSource.size&&this.setTileCount(this.dataSource.endOfDataReached?this.dataSource.size:this.estimatedTileCount)}updateFacetReadiness(){const t=this.collapsibleFacetsVisible||this.facetLoadStrategy==="opt-in-or-login"&&this.loggedIn,i=["opt-in","opt-in-or-login"].includes(this.facetLoadStrategy),s=!this.mobileView&&(!i||t),r=this.mobileView&&t;this.dataSource.handleFacetReadinessChange(s||r)}setupLeftColumnScrollListeners(){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("#left-column-scroll-sentinel");t&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(201).keys()].map(s=>s/200)}),this.leftColIntersectionObserver.observe(t)),window.addEventListener("resize",this.updateLeftColumnHeight)}setupFacetsScrollListeners(){var i;const t=(i=this.shadowRoot)==null?void 0:i.querySelector("#facets-scroll-sentinel");t&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(t))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent("searchTypeChanged",{detail:this.searchType}))}emitFacetPaneVisibilityChanged(){this.dispatchEvent(new CustomEvent("facetPaneVisibilityChanged",{detail:this.facetPaneVisible}))}emitSearchError(){this.dispatchEvent(new CustomEvent("searchError",{detail:this.dataSource.queryErrorMessage}))}emitQueryStateChanged(){this.dispatchEvent(new CustomEvent("queryStateChanged",{detail:{baseQuery:this.baseQuery,withinCollection:this.withinCollection,withinProfile:this.withinProfile,profileElement:this.profileElement,searchType:this.searchType,selectedFacets:this.selectedFacets,internalFilters:this.internalFilters,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedSort:this.selectedSort,sortDirection:this.sortDirection,selectedTitleFilter:this.selectedTitleFilter,selectedCreatorFilter:this.selectedCreatorFilter}}))}emitEmptyResults(){this.dispatchEvent(new Event("emptyResults"))}disconnectResizeObserver(t){t.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||!this.contentContainer||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(t){if(this.isScrollingToCell)return;const{visibleCellIndices:i}=t.detail;if(i.length===0)return;const s=Math.min(this.pageSize,i.length)-1,r=i[s],a=Math.floor(r/this.pageSize)+1;this.currentPage!==a&&(this.currentPage=a);const l=new CustomEvent("visiblePageChanged",{detail:{pageNumber:a}});this.dispatchEvent(l)}get initialSearchComplete(){return this.dataSource.initialSearchComplete}async handleQueryChange(){var t;!this.searchService||this.dataSource.pageFetchQueryKey===this.previousQueryKey||this.baseQuery&&!this.dataSource.canPerformSearch||(this.previousQueryKey=this.dataSource.pageFetchQueryKey,this.totalResults=void 0,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&((t=this.baseQuery)!=null&&t.trim())&&(this.defaultSortField=T.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1)}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this)),window.addEventListener("popstate",this.boundNavigationHandler)}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){const t=this.restorationStateHandler.getRestorationState();this.displayMode=t.displayMode,!this.suppressURLSinParam&&t.searchType!=null&&(this.searchType=t.searchType),this.selectedSort=t.selectedSort??T.default,this.sortDirection=t.sortDirection??null,this.selectedTitleFilter=t.selectedTitleFilter??null,this.selectedCreatorFilter=t.selectedCreatorFilter??null,this.selectedFacets=t.selectedFacets,this.suppressURLQuery||(this.baseQuery=t.baseQuery),this.currentPage=t.currentPage??1,this.minSelectedDate=t.minSelectedDate,this.maxSelectedDate=t.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){const t=this.selectedSort===this.defaultSortField,i={displayMode:this.displayMode,searchType:this.suppressURLSinParam?void 0:this.searchType,selectedSort:t?T.default:this.selectedSort,sortDirection:this.sortDirection??void 0,selectedFacets:this.selectedFacets??$t(),baseQuery:this.suppressURLQuery?void 0:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:this.selectedTitleFilter??void 0,selectedCreatorFilter:this.selectedCreatorFilter??void 0},s={forceReplace:this.dataSourceInstallInProgress,persistMetadataSearchType:this.isTVCollection};this.restorationStateHandler.persistState(i,s)}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent("searchResultsLoadingChanged",{detail:{loading:this.searchResultsLoading}}))}facetsChanged(t){this.selectedFacets=t.detail}facetClickHandler({detail:{facetType:t,bucket:i,negative:s}}){var a;let r;s?r=i.state!=="none"?oe.facetNegativeSelected:oe.facetNegativeDeselected:r=i.state!=="none"?oe.facetSelected:oe.facetDeselected,(a=this.analyticsHandler)==null||a.sendEvent({category:this.searchContext,action:r,label:t})}scrollToPage(t){return new Promise(i=>{const s=this.pageSize*(t-1);setTimeout(()=>{var r;this.isScrollingToCell=!0,(r=this.infiniteScroller)==null||r.scrollToCell(s,!0),setTimeout(()=>{var a;this.isScrollingToCell=!1,(a=this.infiniteScroller)==null||a.refreshAllVisibleCells(),i()},500)},0)})}get isRelevanceSortAvailable(){var t;return!!((t=this.baseQuery)!=null&&t.trim())}setTileCount(t){this.infiniteScroller&&(this.infiniteScroller.itemCount=t)}applyDefaultTVSearchSort(){this.defaultSortField=T.datearchived,this.defaultSortDirection="desc"}applyDefaultCollectionSort(t){var p,m,g;if(this.baseQuery){this.defaultSortField=T.relevance,this.defaultSortDirection=null;return}const i=(m=(p=t==null?void 0:t.public_metadata)==null?void 0:p.identifier)!=null&&m.startsWith("fav-")?"-favoritedate":"-week",r=((g=t==null?void 0:t.public_metadata)==null?void 0:g["sort-by"])??i;let[a,l]=r.split(":");a.startsWith("-")?(a=a.slice(1),l="desc"):["asc","desc"].includes(l)||(l="asc");const h=Oc(a).field;h&&h!==T.default&&(this.defaultSortField=h,this.defaultSortDirection=l)}applyDefaultProfileSort(){if(this.profileElement){const t=f1[this.profileElement];this.defaultSortField=t??T.weeklyview}else this.defaultSortField=T.weeklyview;this.defaultSortDirection="desc"}get currentVisiblePageNumbers(){var s;const t=((s=this.infiniteScroller)==null?void 0:s.getVisibleCellIndices())??[],i=new Set;return t.forEach(r=>{const a=Math.floor(r/this.pageSize)+1;i.add(a)}),Array.from(i)}get isRadioCollection(){const{withinCollection:t}=this,i=["radio"],s=i.includes(t),r=i.some(a=>{var l;return(l=this.dataSource.parentCollections)==null?void 0:l.includes(a)});return s||r}refreshVisibleResults(){var t;(t=this.infiniteScroller)==null||t.refreshAllVisibleCells()}resultSelected(t){var i,s,r;if(this.isManageView){const a=this.dataSource.indexOf(t.detail);a>=0&&((i=this.infiniteScroller)==null||i.refreshCell(a)),this.requestUpdate()}(s=this.analyticsHandler)==null||s.sendEvent({category:this.searchContext,action:oe.resultSelected,label:t.detail.mediatype}),(r=this.analyticsHandler)==null||r.sendEvent({category:this.searchContext,action:oe.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(t){const i=this.tileModelAtCellIndex(t);if(!i)return;const s=this.searchType===U.TV,r=this.searchType===U.RADIO,{isTVCollection:a,isRadioCollection:l}=this,d=s||r||a||l;return f`
      <tile-dispatcher
        .collectionPagePath=${this.collectionPagePath}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${i}
        .tileDisplayMode=${this.displayMode}
        .resizeObserver=${this.resizeObserver}
        .collectionTitles=${this.dataSource.collectionTitles}
        .sortParam=${this.sortParam}
        .defaultSortParam=${this.defaultSortParam}
        .creatorFilter=${this.selectedCreatorFilter}
        .mobileBreakpoint=${this.mobileBreakpoint}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.shouldSuppressTileBlurring}
        .isManageView=${this.isManageView}
        ?showTvClips=${s||a}
        ?enableHoverPane=${!0}
        ?useLocalTime=${d}
        @resultSelected=${h=>this.resultSelected(h)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){!this.dataSource.endOfDataReached&&this.dataSource.queryInitialized&&(this.pagesToRender+=1,this.dataSource.fetchPage(this.pagesToRender))}fetchManageableSearchResults(){var s;const t=!this.dataSource.totalResults,i=!this.searchResultsLoading&&this.dataSource.totalResults>100;this.pageContext==="search"&&(t||i)&&(this.dataSource.resetPages(),this.dataSource.fetchPage(1,this.maxPagesToManage),(s=this.infiniteScroller)==null||s.reload())}static get styles(){return[lt,x`
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
          border-right: 1px solid rgb(232, 232, 232);
          margin-top: var(--rightColumnMarginTop, 0);
          padding-top: var(--rightColumnPaddingTop, 2rem);
          background: #fff;
        }

        #left-column:not([hidden]) + #right-column {
          border-left: 1px solid rgb(232, 232, 232);
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
            #fbfbfd00 0%,
            #fbfbfdc0 50%,
            #fbfbfd 80%,
            #fbfbfd 100%
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
          padding: 5px 0;
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

        #tv-filters {
          margin-bottom: 15px;
        }

        #tv-shows {
          --comboBoxListWidth: 300px;
        }

        .tv-filter-dropdown {
          display: block;
          font-size: 14px;
          margin-left: 1px;
          margin-bottom: 5px;
        }

        .tv-filter-dropdown::part(combo-box) {
          outline-offset: 1px;
        }

        .tv-filter-dropdown::part(option) {
          line-height: 1.1;
          padding: 7px;
        }

        .tv-filter-dropdown::part(clear-button) {
          flex: 0 0 26px;
          --combo-box-clear-icon-size: 14px;
        }

        #facets-container {
          position: relative;
          max-height: 0;
          transition: max-height 0.2s ease-in-out;
          z-index: 1;
          margin-top: var(--facetsContainerMarginTop, 3rem);
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

        #results-total:not(.filtered) {
          padding-bottom: 2rem;
        }

        .mobile #results-total {
          position: absolute;
          right: 10px;
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

        #tile-blur-label {
          display: flex;
          align-items: center;
          column-gap: 5px;
        }

        #tile-blur-check {
          margin: 0 5px 0 0;
          width: 15px;
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
      `]}};n([u({type:String})],A.prototype,"baseNavigationUrl",void 0);n([u({type:String})],A.prototype,"baseImageUrl",void 0);n([u({type:Object})],A.prototype,"searchService",void 0);n([u({type:Number})],A.prototype,"searchType",void 0);n([u({type:String})],A.prototype,"withinCollection",void 0);n([u({type:String})],A.prototype,"withinProfile",void 0);n([u({type:String})],A.prototype,"profileElement",void 0);n([u({type:String})],A.prototype,"baseQuery",void 0);n([u({type:Array})],A.prototype,"identifiers",void 0);n([u({type:String})],A.prototype,"displayMode",void 0);n([u({type:String})],A.prototype,"selectedSort",void 0);n([u({type:String})],A.prototype,"selectedTitleFilter",void 0);n([u({type:String})],A.prototype,"selectedCreatorFilter",void 0);n([u({type:String})],A.prototype,"sortDirection",void 0);n([u({type:String})],A.prototype,"defaultSortField",void 0);n([u({type:String})],A.prototype,"defaultSortDirection",void 0);n([u({type:Number})],A.prototype,"pageSize",void 0);n([u({type:Number})],A.prototype,"currentPage",void 0);n([u({type:String})],A.prototype,"minSelectedDate",void 0);n([u({type:String})],A.prototype,"maxSelectedDate",void 0);n([u({type:Object})],A.prototype,"selectedFacets",void 0);n([u({type:Object})],A.prototype,"internalFilters",void 0);n([u({type:Boolean})],A.prototype,"showSmartFacetBar",void 0);n([u({type:String})],A.prototype,"smartFacetBarLabel",void 0);n([u({type:Boolean})],A.prototype,"showHistogramDatePicker",void 0);n([u({type:Boolean})],A.prototype,"suppressPlaceholders",void 0);n([u({type:Boolean})],A.prototype,"suppressResultCount",void 0);n([u({type:Boolean})],A.prototype,"suppressResultTiles",void 0);n([u({type:Boolean})],A.prototype,"suppressURLQuery",void 0);n([u({type:Boolean})],A.prototype,"suppressURLSinParam",void 0);n([u({type:Boolean})],A.prototype,"suppressSortBar",void 0);n([u({type:Boolean})],A.prototype,"suppressDisplayModes",void 0);n([u({type:Boolean})],A.prototype,"suppressMediatypeFacets",void 0);n([u({type:String})],A.prototype,"facetLoadStrategy",void 0);n([u({type:Boolean,reflect:!0})],A.prototype,"facetPaneVisible",void 0);n([u({type:Boolean})],A.prototype,"clearResultsOnEmptyQuery",void 0);n([u({type:String})],A.prototype,"collectionPagePath",void 0);n([u({type:String,reflect:!0})],A.prototype,"searchContext",void 0);n([u({type:String})],A.prototype,"pageContext",void 0);n([u({type:Object})],A.prototype,"restorationStateHandler",void 0);n([u({type:Number})],A.prototype,"mobileBreakpoint",void 0);n([u({type:Boolean})],A.prototype,"loggedIn",void 0);n([u({type:Object})],A.prototype,"resizeObserver",void 0);n([u({type:Object})],A.prototype,"modalManager",void 0);n([u({type:Object})],A.prototype,"featureFeedbackService",void 0);n([u({type:Object})],A.prototype,"recaptchaManager",void 0);n([u({type:Boolean})],A.prototype,"isTVCollection",void 0);n([u({type:Boolean})],A.prototype,"isManageView",void 0);n([u({type:String})],A.prototype,"manageViewLabel",void 0);n([u({type:Boolean})],A.prototype,"enableSortOptionsSlot",void 0);n([u({type:Boolean,reflect:!0})],A.prototype,"showSmartResults",void 0);n([u({type:Number})],A.prototype,"maxPagesToManage",void 0);n([u({type:Object})],A.prototype,"dataSource",void 0);n([I()],A.prototype,"pagesToRender",void 0);n([I()],A.prototype,"searchResultsLoading",void 0);n([I()],A.prototype,"facetsLoading",void 0);n([I()],A.prototype,"totalResults",void 0);n([I()],A.prototype,"mobileView",void 0);n([I()],A.prototype,"tileBlurOverrideState",void 0);n([I()],A.prototype,"collapsibleFacetsVisible",void 0);n([I()],A.prototype,"contentWidth",void 0);n([I()],A.prototype,"placeholderType",void 0);n([I()],A.prototype,"selectedTVNetwork",void 0);n([I()],A.prototype,"selectedTVShow",void 0);n([I()],A.prototype,"tvMapsPopulated",void 0);n([I()],A.prototype,"loadingNetworks",void 0);n([I()],A.prototype,"loadingShows",void 0);n([Z("#content-container")],A.prototype,"contentContainer",void 0);n([Z("#left-column")],A.prototype,"leftColumn",void 0);n([Z("collection-facets")],A.prototype,"collectionFacets",void 0);n([Z("manage-bar")],A.prototype,"manageBar",void 0);n([Z("smart-facet-bar")],A.prototype,"smartFacetBar",void 0);n([Z("#tv-networks")],A.prototype,"tvNetworksDropdown",void 0);n([Z("#tv-shows")],A.prototype,"tvShowsDropdown",void 0);n([u({type:Object,attribute:!1})],A.prototype,"analyticsHandler",void 0);n([Z("infinite-scroller")],A.prototype,"infiniteScroller",void 0);A=n([H("collection-browser")],A);var Gr;let ge=(Gr=class extends W{constructor(){super(...arguments);c(this,"searchService",this.initSearchServiceFromUrlParams());c(this,"resizeObserver",new Fh);c(this,"toggleSlots",!1);c(this,"currentPage");c(this,"searchQuery");c(this,"withinCollection");c(this,"cellWidth",18);c(this,"cellHeight",29);c(this,"rowGap",1.7);c(this,"colGap",1.7);c(this,"suppressFacets",!1);c(this,"lazyLoadFacets",!1);c(this,"loggedIn",!1);c(this,"searchType",U.METADATA);c(this,"latestAction");c(this,"baseQueryField");c(this,"baseCollectionField");c(this,"pageNumberInput");c(this,"collectionBrowser");c(this,"modalManager");c(this,"analyticsManager",new _d);c(this,"analyticsHandler",{sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)})}sendAnalytics(t){var i;console.log("Analytics Received ----",t),this.latestAction=t,(i=this.analyticsManager)==null||i.sendEvent(t)}initSearchServiceFromUrlParams(){const t=new URL(window.location.href).searchParams;return new Ci({includeCredentials:!1,baseUrl:t.get("search_base_url")??void 0,servicePath:t.get("search_service_path")??void 0,debuggingEnabled:!!t.get("debugging")})}searchPressed(t){t.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(t){t.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){const t=this.currentPage??1;t>1&&this.collectionBrowser.goToPage(t)}changePagePressed(t){t.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(t){t.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),t.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get("hide-dev-tools")?"hidden":""}render(){return f`
      <div class="dev-tool-container">
        <div id="dev-tools" class=${this.getClass}>
          <div id="search-and-page-inputs">
            <form @submit=${this.searchPressed}>
              <label for="base-query-field"> Query: </label>
              <input
                type="text"
                id="base-query-field"
                .value=${this.searchQuery??""}
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
                .value=${this.withinCollection??""}
              />
              <input type="submit" value="Search" />
            </form>
          </div>

          <div id="search-types">
            Search type:
            <span class="search-type">
              <input
                type="radio"
                id="default-search"
                name="search-type"
                value="default"
                .checked=${this.searchType===U.DEFAULT}
                @click=${this.searchTypeSelected}
              />
              <label for="default-search">Default</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="metadata-search"
                name="search-type"
                value="metadata"
                .checked=${this.searchType===U.METADATA}
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
                .checked=${this.searchType===U.FULLTEXT}
                @click=${this.searchTypeSelected}
              />
              <label for="fulltext-search">Full text</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="tv-search"
                name="search-type"
                value="tv"
                .checked=${this.searchType===U.TV}
                @click=${this.searchTypeSelected}
              />
              <label for="tv-search">TV</label>
            </span>
            <span class="search-type">
              <input
                type="radio"
                id="radio-search"
                name="search-type"
                value="radio"
                .checked=${this.searchType===U.RADIO}
                @click=${this.searchTypeSelected}
              />
              <label for="radio-search">Radio</label>
            </span>
          </div>

          <div id="toggle-controls">
            <button
              @click=${()=>{var s,r;const t=(s=this.shadowRoot)==null?void 0:s.getElementById("cell-size-control");t==null||t.classList.toggle("hidden");const i=(r=this.shadowRoot)==null?void 0:r.getElementById("cell-gap-control");i==null||i.classList.toggle("hidden")}}
            >
              Toggle Cell Controls
            </button>
            <button
              @click=${()=>{var i;const t=(i=this.shadowRoot)==null?void 0:i.getElementById("latest-event-details");t==null||t.classList.toggle("hidden")}}
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
          facetPaneVisible
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
          ${this.toggleSlots?f`<div slot="sortbar-left-slot">Sort Slot</div>`:y}
          ${this.toggleSlots?f`<div slot="facet-top-slot">Facet Slot</div>`:y}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}async setPlaceholderType(t){switch(t){case"loading-placeholder":this.collectionBrowser.baseQuery="",this.collectionBrowser.suppressPlaceholders=!0,this.collectionBrowser.clearResultsOnEmptyQuery=!0,this.requestUpdate(),await this.collectionBrowser.updateComplete;break}}baseQueryChanged(t){this.searchQuery=t.detail.baseQuery}searchTypeChanged(t){this.searchType=t.detail}searchTypeSelected(t){const i=t.target;this.searchType=this.searchTypeFromSelectedOption(i.value)}searchTypeFromSelectedOption(t){switch(t){case"metadata":return U.METADATA;case"fulltext":return U.FULLTEXT;case"tv":return U.TV;case"radio":return U.RADIO;default:return U.DEFAULT}}loginChanged(t){t.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(t){t.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}toggleDevTools(){var s,r;const t=new URL(window.location.href),{searchParams:i}=t;i.get("hide-dev-tools")?i.delete("hide-dev-tools"):i.set("hide-dev-tools","true"),(r=(s=this.shadowRoot)==null?void 0:s.getElementById("dev-tools"))==null||r.classList.toggle("hidden"),window.history.replaceState&&window.history.replaceState({path:t.toString()},"",t.toString())}toggleFacetGroupOutline(t){t.target.checked?(this.collectionBrowser.classList.add("showFacetGroupOutlines"),this.modalManager.classList.add("showFacetGroupOutlines")):(this.collectionBrowser.classList.remove("showFacetGroupOutlines"),this.modalManager.classList.remove("showFacetGroupOutlines"))}datePickerChanged(t){const i=t.target;this.collectionBrowser.showHistogramDatePicker=i.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}facetsChanged(t){const i=t.target;this.suppressFacets=!i.checked}lazyLoadFacetsChanged(t){const i=t.target;this.lazyLoadFacets=i.checked}manageModeChanged(t){var s;const i=(s=this.shadowRoot)==null?void 0:s.querySelector("#enable-management");i&&(i.checked=t.detail)}handleItemRemovalRequest(t){this.collectionBrowser.showRemoveItemsProcessingModal(),console.log("itemRemovalRequested: ",t.detail.items),setTimeout(()=>{this.collectionBrowser.showRemoveItemsErrorModal()},2e3)}handleItemManagerRequest(t){console.log("itemManagerRequested: ",t.detail.items)}manageModeCheckboxChanged(t){const i=t.target;this.collectionBrowser.isManageView=i.checked,this.collectionBrowser.manageViewLabel="Select items to remove (customizable texts)"}SearchManageModeCheckboxChanged(t){const i=t.target;this.collectionBrowser.pageContext=i.checked?"search":"collection"}smartFacetBarCheckboxChanged(t){const i=t.target;this.collectionBrowser.showSmartFacetBar=i.checked}facetTopSlotCheckboxChanged(t){const i=t.target,s=document.createElement("p");s.style.setProperty("border","1px solid #000"),s.textContent="New stuff as a child.",s.style.setProperty("height","20rem"),s.style.backgroundColor="#00000",s.setAttribute("slot","facet-top-slot"),i.checked?this.collectionBrowser.appendChild(s):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}toggleSlotOptions(){this.toggleSlots=!this.toggleSlots}resultLastTileSlotCheckboxChanged(t){const i=t.target,s=document.createElement("div"),r=document.createElement("h3");r.textContent="Upload",s.setAttribute("slot","result-last-tile"),s.setAttribute("class","result-last-tile"),s.appendChild(r),i.checked?this.collectionBrowser.appendChild(s):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}cbTopSlotCheckboxChanged(t){const i=t.target,s=document.createElement("p");s.style.setProperty("border","1px solid #000"),s.textContent="My Favorite list header.",s.style.setProperty("height","10rem"),s.style.backgroundColor="#00000",s.setAttribute("slot","cb-top-slot"),i.checked?this.collectionBrowser.appendChild(s):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}sortBarLeftSlotCheckboxChanged(t){if(t.target.checked){const s=document.createElement("div");s.style.setProperty("border","1px solid #000"),s.textContent="Btn",s.style.setProperty("height","3rem"),s.style.setProperty("width","3rem"),s.setAttribute("slot","sort-options-left"),this.collectionBrowser.appendChild(s)}else{const s=this.collectionBrowser.querySelector('[slot="sort-options-left"]');s&&this.collectionBrowser.removeChild(s)}}sortBarRightSlotCheckboxChanged(t){if(t.target.checked){const s=document.createElement("div");s.style.setProperty("border","1px solid #000"),s.textContent="Search bar",s.style.setProperty("height","3rem"),s.style.setProperty("width","15rem"),s.setAttribute("slot","sort-options-right"),this.collectionBrowser.appendChild(s)}else{const s=this.collectionBrowser.querySelector('[slot="sort-options-right"]');s&&this.collectionBrowser.removeChild(s)}}rowGapChanged(t){const i=t.target;this.rowGap=parseFloat(i.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${i.value}rem`)}colGapChanged(t){const i=t.target;this.colGap=parseFloat(i.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${i.value}rem`)}widthChanged(t){const i=t.target;this.cellWidth=parseFloat(i.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${i.value}rem`)}heightChanged(t){const i=t.target;this.cellHeight=parseFloat(i.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${i.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${i.value}rem`)}visiblePageChanged(t){const{pageNumber:i}=t.detail;i!==this.currentPage&&(this.currentPage=i)}replaceSortOptionsChanged(t){if(t.target.checked){const s=document.createElement("p");s.style.setProperty("border","1px solid #000"),s.textContent="New stuff as a child.",s.style.setProperty("height","20px"),s.setAttribute("slot","sort-options"),this.collectionBrowser.appendChild(s),this.collectionBrowser.enableSortOptionsSlot=!0}else{const s=this.collectionBrowser.querySelector('[slot="sort-options"]');s&&this.collectionBrowser.removeChild(s),this.collectionBrowser.enableSortOptionsSlot=!1}}},c(Gr,"styles",x`
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
  `),Gr);n([I()],ge.prototype,"toggleSlots",void 0);n([I()],ge.prototype,"currentPage",void 0);n([I()],ge.prototype,"searchQuery",void 0);n([I()],ge.prototype,"withinCollection",void 0);n([I()],ge.prototype,"cellWidth",void 0);n([I()],ge.prototype,"cellHeight",void 0);n([I()],ge.prototype,"rowGap",void 0);n([I()],ge.prototype,"colGap",void 0);n([I()],ge.prototype,"suppressFacets",void 0);n([I()],ge.prototype,"lazyLoadFacets",void 0);n([I()],ge.prototype,"loggedIn",void 0);n([I()],ge.prototype,"searchType",void 0);n([u({type:Object,reflect:!1})],ge.prototype,"latestAction",void 0);n([Z("#base-query-field")],ge.prototype,"baseQueryField",void 0);n([Z("#base-collection-field")],ge.prototype,"baseCollectionField",void 0);n([Z("#page-number-input")],ge.prototype,"pageNumberInput",void 0);n([Z("collection-browser")],ge.prototype,"collectionBrowser",void 0);n([Z("modal-manager")],ge.prototype,"modalManager",void 0);ge=n([H("app-root")],ge);
