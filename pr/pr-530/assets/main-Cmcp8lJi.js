(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=t(o);fetch(o.href,s)}})();function n(r,e,t,i){var o=arguments.length,s=o<3?e:i===null?i=Object.getOwnPropertyDescriptor(e,t):i,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")s=Reflect.decorate(r,e,t,i);else for(var l=r.length-1;l>=0;l--)(a=r[l])&&(s=(o<3?a(s):o>3?a(e,t,s):a(e,t))||s);return o>3&&s&&Object.defineProperty(e,t,s),s}function Xs(r,e,t,i){function o(s){return s instanceof t?s:new t(function(a){a(s)})}return new(t||(t=Promise))(function(s,a){function l(p){try{u(i.next(p))}catch(m){a(m)}}function d(p){try{u(i.throw(p))}catch(m){a(m)}}function u(p){p.done?s(p.value):o(p.value).then(l,d)}u((i=i.apply(r,e||[])).next())})}class hl{constructor(e){var t,i,o,s;this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://athena.archive.org/0.gif",this.defaultService=(t=e==null?void 0:e.defaultService)!==null&&t!==void 0?t:this.DEFAULT_SERVICE,this.imageUrl=(i=e==null?void 0:e.imageUrl)!==null&&i!==void 0?i:this.DEFAULT_IMAGE_URL,this.imageContainer=(o=e==null?void 0:e.imageContainer)!==null&&o!==void 0?o:document.body,this.requireImagePing=(s=e==null?void 0:e.requireImagePing)!==null&&s!==void 0?s:!1}sendPing(e){const t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}const i=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{i(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){const t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,i={kind:"event",ec:e.category,ea:e.action,el:t,cache_bust:Math.random(),...e.eventConfiguration};this.sendPing(i)}sendEventNoSampling(e){const t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;const i=e;i.eventConfiguration=t,this.sendEvent(i)}sendPingViaImage(e){const t=new Image(1,1);t.src=e,t.alt="",this.imageContainer.appendChild(t)}generateTrackingUrl(e){var t;const i=e??{};i.service=(t=i.service)!==null&&t!==void 0?t:this.defaultService;const o=new URL(this.imageUrl),s=Object.keys(i);return s.forEach(a=>{const l=i[a];o.searchParams.append(a,l)}),o.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),o.searchParams.append("count",`${s.length+2}`),o}}function w(r){let e,t,i;return typeof r=="object"?(e=r.hashFunction,t=r.expiring,i=r.tags):e=r,(o,s,a)=>{if(a.value!=null)a.value=Zs(a.value,e,t,i);else if(a.get!=null)a.get=Zs(a.get,e,t,i);else throw"Only put a Memoize() decorator on a method or get accessor."}}const rr=new Map;function Zs(r,e,t=0,i){const o=Symbol("__memoized_map__");return function(...s){let a;this.hasOwnProperty(o)||Object.defineProperty(this,o,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let l=this[o];if(Array.isArray(i))for(const d of i)rr.has(d)?rr.get(d).push(l):rr.set(d,[l]);if(e||s.length>0||t>0){let d;e===!0?d=s.map(m=>m.toString()).join("!"):e?d=e.apply(this,s):d=s[0];const u=`${d}__timestamp`;let p=!1;if(t>0)if(!l.has(u))p=!0;else{let m=l.get(u);p=Date.now()-m>t}l.has(d)&&!p?a=l.get(d):(a=r.apply(this,s),l.set(d,a),t>0&&l.set(u,Date.now()))}else{const d=this;l.has(d)?a=l.get(d):(a=r.apply(this,s),l.set(d,a))}return a}}class Br{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:!!e}}Br.shared=new Br;class ct{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}ct.shared=new ct;class $o{parseValue(e){return ct.shared.parseValue(e)}}$o.shared=new $o;class qi{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const i=Date.parse(t);if(Number.isNaN(i))return;let o=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(o=new Date(o.getTime()+o.getTimezoneOffset()*1e3*60)),o}}qi.shared=new qi;class _o{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let i;return t.length===1?i=this.parseNumberFormat(t[0]):i=this.parseColonSeparatedFormat(t),i}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const i=e.map((o,s)=>{const a=parseFloat(o);if(Number.isNaN(a))return t=!0,0;const d=60**(e.length-1-s);return a*Math.floor(d)}).reduce((o,s)=>o+s,0);return t?void 0:i}}_o.shared=new _o;class Pr{parseValue(e){if(typeof e=="string")return e}}Pr.shared=new Pr;class pl{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let i=[];for(const o of this.separators)if(i=t.split(o),i.length>1)break;return this.parseListValues(i)}parseListValues(e){const i=e.map(s=>s.trim()).map(s=>this.parser.parseValue(s)),o=[];return i.forEach(s=>{s!==void 0&&o.push(s)}),o}}class Rr{parseValue(e){if(typeof e=="string")return e}}Rr.shared=new Rr;class Co{parseValue(e){return String(e)}}Co.shared=new Co;class vi{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=ct.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?$o.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?_o.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?ct.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?ct.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?ct.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}}n([w()],vi.prototype,"mtime",null);n([w()],vi.prototype,"size",null);n([w()],vi.prototype,"length",null);n([w()],vi.prototype,"height",null);n([w()],vi.prototype,"width",null);n([w()],vi.prototype,"track",null);class Xe{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(i=>{const o=this.parser.parseValue(i);Array.isArray(o)?t.push(...o):o!==void 0&&t.push(o)}),t}}n([w()],Xe.prototype,"values",null);n([w()],Xe.prototype,"value",null);class Bt extends Xe{constructor(e){super(Br.shared,e)}}class Pe extends Xe{constructor(e){super(qi.shared,e)}}class sr extends Xe{constructor(e){super(_o.shared,e)}}class ve extends Xe{constructor(e){super(ct.shared,e)}}class B extends Xe{constructor(e){super(Co.shared,e)}}class ul extends Xe{constructor(e){super(Rr.shared,e)}}class Js extends Xe{constructor(e){super($o.shared,e)}}class dn extends Xe{constructor(e){super(Pr.shared,e)}}class fl extends Xe{constructor(e,t){super(t,e)}}class ml extends fl{constructor(e){const t=new pl(Co.shared);super(e,t)}}class E{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new Pe(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new B(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new ve(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new ve(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new B(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new B(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new Js(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new B(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new B(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new B(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new B(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new B(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new B(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new B(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new Pe(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new B(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new ve(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new sr(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new B(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new B(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new ve(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new Pe(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new B(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new B(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new ve(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new Js(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new B(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new sr(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new B(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new B(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new ve(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new dn(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new Bt(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new B(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new ve(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new ve(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new B(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new B(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new ul(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new Bt(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new B(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new B(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new ve(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new Pe(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new B(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new Pe(this.rawMetadata.reviewdate):void 0}get rights(){return this.rawMetadata.rights!=null?new B(this.rawMetadata.rights):void 0}get rights_holder(){var e;const t=(e=this.rawMetadata["rights-holder"])!==null&&e!==void 0?e:this.rawMetadata.rights_holder;return t!=null?new B(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new sr(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new B(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new B(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new B(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new B(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new B(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new Pe(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new Pe(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new Pe(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new ml(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new B(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new B(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new B(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new B(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new ve(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new B(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new B(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new ve(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new B(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new B(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new ve(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new ve(this.rawMetadata.year):void 0}constructor(e={}){this.rawMetadata=e}}n([w()],E.prototype,"addeddate",null);n([w()],E.prototype,"audio_codec",null);n([w()],E.prototype,"audio_sample_rate",null);n([w()],E.prototype,"avg_rating",null);n([w()],E.prototype,"collection",null);n([w()],E.prototype,"collections_raw",null);n([w()],E.prototype,"collection_size",null);n([w()],E.prototype,"contact",null);n([w()],E.prototype,"contributor",null);n([w()],E.prototype,"coverage",null);n([w()],E.prototype,"creator",null);n([w()],E.prototype,"creator_alt_script",null);n([w()],E.prototype,"credits",null);n([w()],E.prototype,"collection_layout",null);n([w()],E.prototype,"date",null);n([w()],E.prototype,"description",null);n([w()],E.prototype,"downloads",null);n([w()],E.prototype,"duration",null);n([w()],E.prototype,"external_identifier",null);n([w()],E.prototype,"external_link",null);n([w()],E.prototype,"files_count",null);n([w()],E.prototype,"indexdate",null);n([w()],E.prototype,"isbn",null);n([w()],E.prototype,"issue",null);n([w()],E.prototype,"item_count",null);n([w()],E.prototype,"item_size",null);n([w()],E.prototype,"language",null);n([w()],E.prototype,"length",null);n([w()],E.prototype,"licenseurl",null);n([w()],E.prototype,"lineage",null);n([w()],E.prototype,"month",null);n([w()],E.prototype,"mediatype",null);n([w()],E.prototype,"noindex",null);n([w()],E.prototype,"notes",null);n([w()],E.prototype,"num_favorites",null);n([w()],E.prototype,"num_reviews",null);n([w()],E.prototype,"openlibrary_edition",null);n([w()],E.prototype,"openlibrary_work",null);n([w()],E.prototype,"page_progression",null);n([w()],E.prototype,"paginated",null);n([w()],E.prototype,"partner",null);n([w()],E.prototype,"post_text",null);n([w()],E.prototype,"ppi",null);n([w()],E.prototype,"publicdate",null);n([w()],E.prototype,"publisher",null);n([w()],E.prototype,"reviewdate",null);n([w()],E.prototype,"rights",null);n([w()],E.prototype,"rights_holder",null);n([w()],E.prototype,"runtime",null);n([w()],E.prototype,"scanner",null);n([w()],E.prototype,"segments",null);n([w()],E.prototype,"shotlist",null);n([w()],E.prototype,"source",null);n([w()],E.prototype,"sponsor",null);n([w()],E.prototype,"start_localtime",null);n([w()],E.prototype,"start_time",null);n([w()],E.prototype,"stop_time",null);n([w()],E.prototype,"subject",null);n([w()],E.prototype,"taper",null);n([w()],E.prototype,"title",null);n([w()],E.prototype,"title_alt_script",null);n([w()],E.prototype,"transferer",null);n([w()],E.prototype,"track",null);n([w()],E.prototype,"type",null);n([w()],E.prototype,"uploader",null);n([w()],E.prototype,"utc_offset",null);n([w()],E.prototype,"venue",null);n([w()],E.prototype,"volume",null);n([w()],E.prototype,"week",null);n([w()],E.prototype,"year",null);class Uo{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?qi.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?qi.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?ct.shared.parseValue(this.rawValue.stars):void 0}constructor(e={}){this.rawValue=e}}n([w()],Uo.prototype,"reviewdate",null);n([w()],Uo.prototype,"createdate",null);n([w()],Uo.prototype,"stars",null);class hs extends Uo{get reviewer_account_status(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.status}get reviewer_account_status_reason(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.reason}get __href__(){return this.rawValue.__href__}get account_status(){const e=this.rawValue.reviewer_account_status;if(!e)return;let t="unknown",i;e.startsWith("ok")&&(t="ok"),e.startsWith("locked")&&(t="locked");const o=e.split("__");return o.length>1&&(i=o.slice(1).join("__")),{status:t,reason:i}}}n([w()],hs.prototype,"account_status",null);const vl=["loans","waitlist","loan_history"];function gl(r){const e=r.slice(0,4),t=r.slice(4,6),i=r.slice(6,8),o=r.slice(8,10),s=r.slice(10,12),a=r.slice(12,14);return`${e}-${t}-${i}T${o}:${s}:${a}Z`}function bl(r){var e;const t=[];for(const i of r){if(!(!((e=i.captures)===null||e===void 0)&&e.length))continue;const o=encodeURIComponent(i.url),s=`https://web.archive.org/web/${i.captures[0]}/${o}`;t.push({hit_type:"web_archive",fields:{url:i.url,capture_dates:i.captures.map(a=>gl(a)),__href__:s}})}return t}class ue extends E{get created_on(){return this.rawMetadata.created_on!=null?new Pe(this.rawMetadata.created_on):void 0}get file_creation_mtime(){return this.rawMetadata.file_creation_mtime!=null?new ve(this.rawMetadata.file_creation_mtime):void 0}get filename(){return this.rawMetadata.filename!=null?new B(this.rawMetadata.filename):void 0}get file_basename(){return this.rawMetadata.file_basename!=null?new B(this.rawMetadata.file_basename):void 0}get result_in_subfile(){return this.rawMetadata.result_in_subfile!=null?new Bt(this.rawMetadata.result_in_subfile):void 0}get query(){return this.rawMetadata.query!=null?new B(this.rawMetadata.query):void 0}get date_favorited(){return this.rawMetadata.date_favorited!=null?new Pe(this.rawMetadata.date_favorited):void 0}get updated_on(){return this.rawMetadata.updated_on!=null?new Pe(this.rawMetadata.updated_on):void 0}get ad_id(){return this.rawMetadata.ad_id!=null?new B(this.rawMetadata.ad_id):void 0}get factcheck(){return this.rawMetadata.factcheck!=null?new B(this.rawMetadata.factcheck):void 0}get is_clip(){return this.rawMetadata.clip!=null?new Bt(this.rawMetadata.clip):void 0}get num_clips(){return this.rawMetadata.nclips!=null?new ve(this.rawMetadata.nclips):void 0}get __href__(){return this.rawMetadata.__href__!=null?new B(this.rawMetadata.__href__):void 0}get __img__(){return this.rawMetadata.__img__!=null?new B(this.rawMetadata.__img__):void 0}}n([w()],ue.prototype,"created_on",null);n([w()],ue.prototype,"file_creation_mtime",null);n([w()],ue.prototype,"filename",null);n([w()],ue.prototype,"file_basename",null);n([w()],ue.prototype,"result_in_subfile",null);n([w()],ue.prototype,"query",null);n([w()],ue.prototype,"date_favorited",null);n([w()],ue.prototype,"updated_on",null);n([w()],ue.prototype,"ad_id",null);n([w()],ue.prototype,"factcheck",null);n([w()],ue.prototype,"is_clip",null);n([w()],ue.prototype,"num_clips",null);n([w()],ue.prototype,"__href__",null);n([w()],ue.prototype,"__img__",null);class Ge{constructor(e){var t;this.rawMetadata=e,this.fields=new ue((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get collection_files_count(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.collection_files_count)!=null?new ve(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){return this.fields.collection_size}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get files_count(){return this.fields.files_count}get genre(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.genre)!=null?new B(this.rawMetadata.fields.genre):void 0}get indexflag(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.indexflag)!=null?new B(this.rawMetadata.fields.indexflag):void 0}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get lending___available_to_borrow(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_borrow)!=null?new Bt(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_browse)!=null?new Bt(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_waitlist)!=null?new Bt(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___status)!=null?new B(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.licenseurl)!=null?new B(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){return this.fields.mediatype}get month(){return this.fields.month}get noindex(){return this.fields.noindex}get num_favorites(){return this.fields.num_favorites}get num_reviews(){return this.fields.num_reviews}get publicdate(){return this.fields.publicdate}get reviewdate(){return this.fields.reviewdate}get review(){const e=this.rawMetadata.review;return e?new hs(e):void 0}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get type(){return this.fields.type}get volume(){return this.fields.volume}get week(){return this.fields.week}get year(){return this.fields.year}}n([w()],Ge.prototype,"collection_files_count",null);n([w()],Ge.prototype,"genre",null);n([w()],Ge.prototype,"indexflag",null);n([w()],Ge.prototype,"lending___available_to_borrow",null);n([w()],Ge.prototype,"lending___available_to_browse",null);n([w()],Ge.prototype,"lending___available_to_waitlist",null);n([w()],Ge.prototype,"lending___status",null);n([w()],Ge.prototype,"licenseurl",null);n([w()],Ge.prototype,"review",null);class ps{constructor(e){var t;this.rawMetadata=e,this.fields=new ue((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new B(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get issue(){return this.fields.issue}get mediatype(){return this.fields.mediatype}get page_num(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.page_num)!=null?new ve(this.rawMetadata.fields.page_num):void 0}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get year(){return this.fields.year}get __href__(){return this.fields.__href__}}n([w()],ps.prototype,"highlight",null);n([w()],ps.prototype,"page_num",null);var j;(function(r){r[r.COUNT=0]="COUNT",r[r.ALPHABETICAL=1]="ALPHABETICAL",r[r.NUMERIC=2]="NUMERIC"})(j||(j={}));class cn{constructor(e){this.buckets=e.buckets,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval,this.first_bucket_year=e.first_bucket_year,this.first_bucket_month=e.first_bucket_month,this.last_bucket_year=e.last_bucket_year,this.last_bucket_month=e.last_bucket_month,this.interval_in_months=e.interval_in_months}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const i=new Intl.Collator;switch(e){case j.ALPHABETICAL:return t.sort((o,s)=>i.compare(o.key.toString(),s.key.toString()));case j.NUMERIC:return t.sort((o,s)=>Number(s.key)-Number(o.key));case j.COUNT:default:return t}}isRawNumberBuckets(e){return typeof e[0]=="number"}}n([w()],cn.prototype,"getSortedBuckets",null);class yl{constructor(e){var t;this.rawMetadata=e,this.fields=new ue((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.fields.query)===null||e===void 0?void 0:e.value}get title(){return this.fields.title}get query(){return this.fields.query}get date_favorited(){return this.fields.date_favorited}get __href__(){return this.fields.__href__}}class us{constructor(e){var t;this.rawMetadata=e,this.fields=new ue((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.rawMetadata.fields)===null||e===void 0?void 0:e.url}get mediatype(){return new dn("web")}get title(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.url?new B((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.url):void 0}get capture_dates(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.capture_dates?new Pe((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.capture_dates):void 0}get __href__(){return this.fields.__href__}}n([w()],us.prototype,"title",null);n([w()],us.prototype,"capture_dates",null);class fs{constructor(e){var t;this.rawMetadata=e,this.fields=new ue((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new B(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get ad_id(){return this.fields.ad_id}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get factcheck(){return this.fields.factcheck}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get files_count(){return this.fields.files_count}get is_clip(){return this.fields.is_clip}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get mediatype(){return this.fields.mediatype}get num_clips(){return this.fields.num_clips}get num_favorites(){return this.fields.num_favorites}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get week(){return this.fields.week}get year(){return this.fields.year}get start(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.start)!=null?new B(this.rawMetadata.fields.start):void 0}get __href__(){return this.fields.__href__}get __img__(){return this.fields.__img__}}n([w()],fs.prototype,"highlight",null);n([w()],fs.prototype,"start",null);class ms{constructor(e){this.rawResponse=e}get item_size(){return this.rawResponse.item_size}get files_count(){return this.rawResponse.files_count}get month(){return this.rawResponse.month}get week(){return this.rawResponse.week}get downloads(){return this.rawResponse.downloads}get num_favorites(){return this.rawResponse.num_favorites}get title_message(){return this.rawResponse.title_message}get primary_collection(){return this.rawResponse.primary_collection}get thumbnail_url(){return this.rawResponse.thumbnail_url}get num_reviews(){return this.rawResponse.num_reviews}get uploader_details(){return this.rawResponse.uploader_details}get public_metadata(){if(this.rawResponse.public_metadata)return new E(this.rawResponse.public_metadata)}get part_of(){return this.rawResponse.part_of}get speech_vs_music_asr_metadata(){return this.rawResponse.speech_vs_music_asr_metadata}get reviews_metadata(){var e;return((e=this.rawResponse.reviews_metadata)!==null&&e!==void 0?e:[]).map(i=>new hs(i))}}n([w()],ms.prototype,"public_metadata",null);n([w()],ms.prototype,"reviews_metadata",null);class vs{constructor(e,t){var i,o,s,a,l,d,u,p,m,v,y,x,S,C,D;this.extraInfo=null,this.schema=t,this.schemaHitType=t==null?void 0:t.hit_type;let M;e!=null&&e.page_elements&&(this.pageElements=e.page_elements,M=Object.values(this.pageElements)[0]);let A=(i=e==null?void 0:e.hits)===null||i===void 0?void 0:i.hits;this.totalResults=(s=(o=e==null?void 0:e.hits)===null||o===void 0?void 0:o.total)!==null&&s!==void 0?s:0,this.returnedCount=(l=(a=e==null?void 0:e.hits)===null||a===void 0?void 0:a.returned)!==null&&l!==void 0?l:0,!(A!=null&&A.length)&&(!((d=this.pageElements)===null||d===void 0)&&d.service___fts)?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!(A!=null&&A.length)&&(!((u=M==null?void 0:M.hits)===null||u===void 0)&&u.hits)?(A=M.hits.hits,this.totalResults=(p=M.hits.total)!==null&&p!==void 0?p:0,this.returnedCount=(m=M.hits.returned)!==null&&m!==void 0?m:0):!((v=this.pageElements)===null||v===void 0)&&v.lending?A=this.handleLendingPageElement():!((y=this.pageElements)===null||y===void 0)&&y.web_archives&&(A=this.handleWebArchivesPageElement()),this.results=this.formatHits(A);let O=e==null?void 0:e.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&(M!=null&&M.aggregations)&&(O=M.aggregations),O&&this.buildAggregations(O),e!=null&&e.collection_titles&&(this.collectionTitles=(x=e.collection_titles)!==null&&x!==void 0?x:{}),e!=null&&e.tv_channel_aliases&&(this.tvChannelAliases=(S=e.tv_channel_aliases)!==null&&S!==void 0?S:{}),e!=null&&e.collection_extra_info&&(this.collectionExtraInfo=(C=e.collection_extra_info)!==null&&C!==void 0?C:null),e!=null&&e.account_extra_info&&(this.accountExtraInfo=(D=e.account_extra_info)!==null&&D!==void 0?D:null),e!=null&&e.extra_info&&(this.extraInfo=new ms(e.extra_info))}formatHits(e){var t;return(t=e==null?void 0:e.map(i=>{var o;return vs.createResult((o=i.hit_type)!==null&&o!==void 0?o:this.schemaHitType,i)}))!==null&&t!==void 0?t:[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((t,[i,o])=>(t[i]=new cn(o),t),{})}handleLendingPageElement(){var e,t;const i=(e=this.pageElements)===null||e===void 0?void 0:e.lending,o=(t=i.loans)!==null&&t!==void 0?t:[];this.totalResults=o.length,this.returnedCount=this.totalResults;for(const s of vl)i[s]=this.formatHits(i[s]);return o}handleWebArchivesPageElement(){var e;const t=bl((e=this.pageElements)===null||e===void 0?void 0:e.web_archives);return this.totalResults=t.length,this.returnedCount=this.totalResults,t}handleFederatedPageElements(){var e,t,i,o;const s=["service___fts","service___tvs","service___rcs","service___whisper","metadata___mediatype___texts","metadata___mediatype___movies","metadata___mediatype___audio","metadata___mediatype___software","metadata___mediatype___image","metadata___mediatype___etree"];for(const a of s){const l=this.removePageElementPrefix(a);this.federatedResults?this.federatedResults[a]=[]:this.federatedResults={[l]:[]};const d=(t=(e=this.pageElements)===null||e===void 0?void 0:e[a])===null||t===void 0?void 0:t.hits;d!=null&&d.hits&&(this.federatedResults[l]=this.formatHits(d==null?void 0:d.hits)),this.totalResults+=(i=d==null?void 0:d.total)!==null&&i!==void 0?i:0,this.returnedCount+=(o=d==null?void 0:d.returned)!==null&&o!==void 0?o:0}}removePageElementPrefix(e){return e.split("___").pop()}static createResult(e,t){switch(e){case"item":return new Ge(t);case"text":case"asr_text":return new ps(t);case"favorited_search":return new yl(t);case"web_archive":return new us(t);case"tv_clip":return new fs(t);default:return new Ge(t)}}}class wl{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class Sl{constructor(e){var t,i,o;this.rawResponse=e,this.request=new wl(e.request),this.responseHeader=(t=e.response)===null||t===void 0?void 0:t.header,this.sessionContext=e.session_context,this.response=new vs((i=e.response)===null||i===void 0?void 0:i.body,(o=e.response)===null||o===void 0?void 0:o.hit_schema)}}class gi{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(o=>({terms:o}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(e.query&&t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){const s=`[${e.pageElements.map(a=>`"${a}"`).join(",")}]`;t.append("page_elements",s)}if(e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const o=this.filterParamsAsString(e.filters);o&&o!=="{}"&&t.append("filter_map",o)}if(e.sort&&e.sort.length>0){const o=e.sort.map(s=>this.sortParamsAsString(s));t.append("sort",o.join(","))}const i=e.aggregations;if(i){const o=this.aggregateSearchParamsAsString(i);o&&t.append("aggregations",o)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const o=e.query==null,s=e.query&&e.query.length<=1e3;if(o||s){const l=window.location.href.slice(0,400);t.append("client_url",l)}}return t}}var Ni;(function(r){r.networkError="SearchService.NetworkError",r.itemNotFound="SearchService.ItemNotFound",r.decodingError="SearchService.DecodingError",r.searchEngineError="SearchService.SearchEngineError"})(Ni||(Ni={}));class xl extends Error{constructor(e,t,i){super(t),this.name=e,this.type=e,this.details=i}}const ea={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})};class bi{constructor(e){var t,i;this.baseUrl=(t=e==null?void 0:e.baseUrl)!==null&&t!==void 0?t:"archive.org",(e==null?void 0:e.includeCredentials)!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const o=new URL(window.location.href).searchParams,s=o.get("scope"),a=o.get("verbose"),l=o.get("debugging"),d=o.get("cacheDebug");let u="";for(const p of Object.keys(ea))if(o.get(p)){u=ea[p];break}u=(i=o.get("caching"))!==null&&i!==void 0?i:u,(e==null?void 0:e.caching)!==void 0?this.cachingFlags=e.caching:u&&(this.cachingFlags=u),(e==null?void 0:e.debuggingEnabled)!==void 0?this.debuggingEnabled=e.debuggingEnabled:(l||d)&&(this.debuggingEnabled=!0),(e==null?void 0:e.scope)!==void 0?this.requestScope=e.scope:s&&(this.requestScope=s),(e==null?void 0:e.verbose)!==void 0?this.verbose=e.verbose:a&&(this.verbose=!!a)}async fetchUrl(e,t){var i,o;const s=new URL(e);this.requestScope&&s.searchParams.set("scope",this.requestScope),this.cachingFlags&&s.searchParams.set("caching",this.cachingFlags);let a;try{const l=(i=t==null?void 0:t.requestOptions)!==null&&i!==void 0?i:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(s.href,l)}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Ni.networkError,d)}try{const l=await a.json();this.verbose&&this.printResponse(l),l.debugging&&this.printDebuggingInfo(l);const d=(o=l.response)===null||o===void 0?void 0:o.error;return d?this.getErrorResult(Ni.searchEngineError,d.message,d.forensics):{success:l}}catch(l){const d=l instanceof Error?l.message:typeof l=="string"?l:"Unknown error";return this.getErrorResult(Ni.decodingError,d)}}getErrorResult(e,t,i){return{error:new xl(e,t,i)}}printResponse(e){var t,i,o,s,a;try{const l=JSON.parse(JSON.stringify(e)),d=(o=(i=(t=l==null?void 0:l.response)===null||t===void 0?void 0:t.body)===null||i===void 0?void 0:i.hits)===null||o===void 0?void 0:o.hits;if(Array.isArray(d)&&d.length>1){const p=[];p.push(d[0]),p.push(`*** ${d.length-1} hits omitted ***`),l.response.body.hits.hits=p}const u=(a=(s=l==null?void 0:l.response)===null||s===void 0?void 0:s.body)===null||a===void 0?void 0:a.aggregations;u&&Object.entries(u).forEach(([p,m])=>{var v,y,x,S;if(((y=(v=m)===null||v===void 0?void 0:v.buckets)===null||y===void 0?void 0:y.length)>0){const C=JSON.parse(JSON.stringify(m));C.buckets=`*** ${(S=(x=C.buckets)===null||x===void 0?void 0:x.length)!==null&&S!==void 0?S:0} buckets omitted ***`,l.response.body.aggregations[p]=C}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(l,null,2)),console.groupEnd()}catch(l){console.error("Error printing search response:",l)}}printDebuggingInfo(e){var t,i;const o=e.debugging,s=(t=o.messages)!==null&&t!==void 0?t:[],a=(i=o.data)!==null&&i!==void 0?i:{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const l of s)console.log(l);console.groupEnd(),console.group("Debug data");for(const[l,d]of Object.entries(a))console.log(l,d);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class $l extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${i}`;return this.fetchUrl(o)}}class _l extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${i}`;return this.fetchUrl(o)}}class Cl extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${i}`;return this.fetchUrl(o)}}var I;(function(r){r[r.DEFAULT=0]="DEFAULT",r[r.METADATA=1]="METADATA",r[r.FULLTEXT=2]="FULLTEXT",r[r.TV=3]="TV",r[r.RADIO=4]="RADIO",r[r.FEDERATED=5]="FEDERATED"})(I||(I={}));class kl extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?service_backend=tvs&${i}`;return this.fetchUrl(o)}}class Tl extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${i}`;return this.fetchUrl(o)}}class El extends bi{constructor(e){var t;super(e),this.servicePath=(t=e==null?void 0:e.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const i=gi.generateURLSearchParams(e).toString(),o=`https://${this.baseUrl}${this.servicePath}/?${i}`,{pageType:s,identifiers:a}=e,d=s==="client_document_fetch"&&!!(a!=null&&a.length)?{requestOptions:{method:"POST",body:JSON.stringify({doc_ids:a}),credentials:"include"}}:void 0;return this.fetchUrl(o,d)}}class si{constructor(e={}){this.backendOptions=e}async search(e,t=I.METADATA){const o=await si.getBackendForSearchType(t,this.backendOptions).performSearch(e);return o.error?o:{success:new Sl(o.success)}}itemDetails(e){const t={pageType:"item_details",pageTarget:e};return this.search(t,I.DEFAULT)}static getBackendForSearchType(e,t={}){switch(e){case I.METADATA:return new $l(t);case I.FULLTEXT:return new _l(t);case I.RADIO:return new Cl(t);case I.TV:return new kl(t);case I.FEDERATED:return new Tl(t);default:return new El(t)}}}si.default=new si;n([w((r,e={})=>{const{includeCredentials:t=!1,verbose:i=!1,scope:o="",baseUrl:s=""}=e;return`${r};${t};${i};${o};${s}`})],si,"getBackendForSearchType",null);var Ne;(function(r){r.INCLUDE="inc",r.EXCLUDE="exc",r.GREATER_THAN="gt",r.GREATER_OR_EQUAL="gte",r.LESS_THAN="lt",r.LESS_OR_EQUAL="lte"})(Ne||(Ne={}));class Ml{constructor(){this.filterMap={}}addFilter(e,t,i){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){const o=[].concat(this.filterMap[e][t],i);this.filterMap[e][t]=Array.from(new Set(o))}else this.filterMap[e][t]=i;return this}removeSingleFilter(e,t,i){var o;if(!(!((o=this.filterMap[e])===null||o===void 0)&&o[t]))return this;const s=[].concat(this.filterMap[e][t]),a=s.indexOf(i);return a>=0&&s.splice(a,1),this.filterMap[e][t]=s.length===1?s[0]:s,s.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){const t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap={...e},this}mergeFilterMap(e){for(const[t,i]of Object.entries(e))for(const[o,s]of Object.entries(i))if(Array.isArray(s))for(const a of s)this.addFilter(t,o,a);else this.addFilter(t,o,s);return this}build(){return this.filterMap}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const mo=window,gs=mo.ShadowRoot&&(mo.ShadyCSS===void 0||mo.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,bs=Symbol(),ta=new WeakMap;let hn=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==bs)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(gs&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=ta.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&ta.set(t,e))}return e}toString(){return this.cssText}};const Al=r=>new hn(typeof r=="string"?r:r+"",void 0,bs),f=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,o,s)=>i+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+r[s+1],r[0]);return new hn(t,r,bs)},Dl=(r,e)=>{gs?r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet):e.forEach(t=>{const i=document.createElement("style"),o=mo.litNonce;o!==void 0&&i.setAttribute("nonce",o),i.textContent=t.cssText,r.appendChild(i)})},ia=gs?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Al(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ar;const ko=window,oa=ko.trustedTypes,Fl=oa?oa.emptyScript:"",ra=ko.reactiveElementPolyfillSupport,Or={toAttribute(r,e){switch(e){case Boolean:r=r?Fl:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},pn=(r,e)=>e!==r&&(e==e||r==r),nr={attribute:!0,type:String,converter:Or,reflect:!1,hasChanged:pn},Ir="finalized";let ei=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const o=this._$Ep(i,t);o!==void 0&&(this._$Ev.set(o,i),e.push(o))}),e}static createProperty(e,t=nr){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,o=this.getPropertyDescriptor(e,i,t);o!==void 0&&Object.defineProperty(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(o){const s=this[e];this[t]=o,this.requestUpdate(e,s,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||nr}static finalize(){if(this.hasOwnProperty(Ir))return!1;this[Ir]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,i=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const o of i)this.createProperty(o,t[o])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const o of i)t.unshift(ia(o))}else e!==void 0&&t.push(ia(e));return t}static _$Ep(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(t=>t(this))}addController(e){var t,i;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return Dl(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostConnected)===null||i===void 0?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(t=>{var i;return(i=t.hostDisconnected)===null||i===void 0?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=nr){var o;const s=this.constructor._$Ep(e,i);if(s!==void 0&&i.reflect===!0){const a=(((o=i.converter)===null||o===void 0?void 0:o.toAttribute)!==void 0?i.converter:Or).toAttribute(t,i.type);this._$El=e,a==null?this.removeAttribute(s):this.setAttribute(s,a),this._$El=null}}_$AK(e,t){var i;const o=this.constructor,s=o._$Ev.get(e);if(s!==void 0&&this._$El!==s){const a=o.getPropertyOptions(s),l=typeof a.converter=="function"?{fromAttribute:a.converter}:((i=a.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?a.converter:Or;this._$El=s,this[s]=l.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,i){let o=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||pn)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):o=!1),!this.isUpdatePending&&o&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((o,s)=>this[s]=o),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(o=>{var s;return(s=o.hostUpdate)===null||s===void 0?void 0:s.call(o)}),this.update(i)):this._$Ek()}catch(o){throw t=!1,this._$Ek(),o}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdated)===null||o===void 0?void 0:o.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((t,i)=>this._$EO(i,this[i],t)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};ei[Ir]=!0,ei.elementProperties=new Map,ei.elementStyles=[],ei.shadowRootOptions={mode:"open"},ra==null||ra({ReactiveElement:ei}),((ar=ko.reactiveElementVersions)!==null&&ar!==void 0?ar:ko.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var lr;const To=window,ai=To.trustedTypes,sa=ai?ai.createPolicy("lit-html",{createHTML:r=>r}):void 0,Nr="$lit$",bt=`lit$${(Math.random()+"").slice(9)}$`,un="?"+bt,Ll=`<${un}>`,Nt=document,Eo=()=>Nt.createComment(""),Gi=r=>r===null||typeof r!="object"&&typeof r!="function",fn=Array.isArray,zl=r=>fn(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",dr=`[ 	
\f\r]`,ki=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,aa=/-->/g,na=/>/g,kt=RegExp(`>|${dr}(?:([^\\s"'>=/]+)(${dr}*=${dr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),la=/'/g,da=/"/g,mn=/^(?:script|style|textarea|title)$/i,De=Symbol.for("lit-noChange"),ee=Symbol.for("lit-nothing"),ca=new WeakMap,Lt=Nt.createTreeWalker(Nt,129,null,!1);function vn(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return sa!==void 0?sa.createHTML(e):e}const Bl=(r,e)=>{const t=r.length-1,i=[];let o,s=e===2?"<svg>":"",a=ki;for(let l=0;l<t;l++){const d=r[l];let u,p,m=-1,v=0;for(;v<d.length&&(a.lastIndex=v,p=a.exec(d),p!==null);)v=a.lastIndex,a===ki?p[1]==="!--"?a=aa:p[1]!==void 0?a=na:p[2]!==void 0?(mn.test(p[2])&&(o=RegExp("</"+p[2],"g")),a=kt):p[3]!==void 0&&(a=kt):a===kt?p[0]===">"?(a=o??ki,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?kt:p[3]==='"'?da:la):a===da||a===la?a=kt:a===aa||a===na?a=ki:(a=kt,o=void 0);const y=a===kt&&r[l+1].startsWith("/>")?" ":"";s+=a===ki?d+Ll:m>=0?(i.push(u),d.slice(0,m)+Nr+d.slice(m)+bt+y):d+bt+(m===-2?(i.push(void 0),l):y)}return[vn(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),i]};let Ur=class gn{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,a=0;const l=e.length-1,d=this.parts,[u,p]=Bl(e,t);if(this.el=gn.createElement(u,i),Lt.currentNode=this.el.content,t===2){const m=this.el.content,v=m.firstChild;v.remove(),m.append(...v.childNodes)}for(;(o=Lt.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const m=[];for(const v of o.getAttributeNames())if(v.endsWith(Nr)||v.startsWith(bt)){const y=p[a++];if(m.push(v),y!==void 0){const x=o.getAttribute(y.toLowerCase()+Nr).split(bt),S=/([.?@])?(.*)/.exec(y);d.push({type:1,index:s,name:S[2],strings:x,ctor:S[1]==="."?Rl:S[1]==="?"?Il:S[1]==="@"?Nl:Ho})}else d.push({type:6,index:s})}for(const v of m)o.removeAttribute(v)}if(mn.test(o.tagName)){const m=o.textContent.split(bt),v=m.length-1;if(v>0){o.textContent=ai?ai.emptyScript:"";for(let y=0;y<v;y++)o.append(m[y],Eo()),Lt.nextNode(),d.push({type:2,index:++s});o.append(m[v],Eo())}}}else if(o.nodeType===8)if(o.data===un)d.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(bt,m+1))!==-1;)d.push({type:7,index:s}),m+=bt.length-1}s++}}static createElement(e,t){const i=Nt.createElement("template");return i.innerHTML=e,i}};function ni(r,e,t=r,i){var o,s,a,l;if(e===De)return e;let d=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const u=Gi(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==u&&((s=d==null?void 0:d._$AO)===null||s===void 0||s.call(d,!1),u===void 0?d=void 0:(d=new u(r),d._$AT(r,t,i)),i!==void 0?((a=(l=t)._$Co)!==null&&a!==void 0?a:l._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=ni(r,d._$AS(r,e.values),d,i)),e}let Pl=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Nt).importNode(i,!0);Lt.currentNode=s;let a=Lt.nextNode(),l=0,d=0,u=o[0];for(;u!==void 0;){if(l===u.index){let p;u.type===2?p=new ys(a,a.nextSibling,this,e):u.type===1?p=new u.ctor(a,u.name,u.strings,this,e):u.type===6&&(p=new Ul(a,this,e)),this._$AV.push(p),u=o[++d]}l!==(u==null?void 0:u.index)&&(a=Lt.nextNode(),l++)}return Lt.currentNode=Nt,s}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},ys=class bn{constructor(e,t,i,o){var s;this.type=2,this._$AH=ee,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ni(this,e,t),Gi(e)?e===ee||e==null||e===""?(this._$AH!==ee&&this._$AR(),this._$AH=ee):e!==this._$AH&&e!==De&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):zl(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==ee&&Gi(this._$AH)?this._$AA.nextSibling.data=e:this.$(Nt.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Ur.createElement(vn(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(i);else{const a=new Pl(s,this),l=a.u(this.options);a.v(i),this.$(l),this._$AH=a}}_$AC(e){let t=ca.get(e.strings);return t===void 0&&ca.set(e.strings,t=new Ur(e)),t}T(e){fn(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new bn(this.k(Eo()),this.k(Eo()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}},Ho=class{constructor(e,t,i,o,s){this.type=1,this._$AH=ee,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=ee}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let a=!1;if(s===void 0)e=ni(this,e,t,0),a=!Gi(e)||e!==this._$AH&&e!==De,a&&(this._$AH=e);else{const l=e;let d,u;for(e=s[0],d=0;d<s.length-1;d++)u=ni(this,l[i+d],t,d),u===De&&(u=this._$AH[d]),a||(a=!Gi(u)||u!==this._$AH[d]),u===ee?e=ee:e!==ee&&(e+=(u??"")+s[d+1]),this._$AH[d]=u}a&&!o&&this.j(e)}j(e){e===ee?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Rl=class extends Ho{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===ee?void 0:e}};const Ol=ai?ai.emptyScript:"";let Il=class extends Ho{constructor(){super(...arguments),this.type=4}j(e){e&&e!==ee?this.element.setAttribute(this.name,Ol):this.element.removeAttribute(this.name)}},Nl=class extends Ho{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=(i=ni(this,e,t,0))!==null&&i!==void 0?i:ee)===De)return;const o=this._$AH,s=e===ee&&o!==ee||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==ee&&(o===ee||s);s&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}},Ul=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ni(this,e)}};const Hl={I:ys},ha=To.litHtmlPolyfillSupport;ha==null||ha(Ur,ys),((lr=To.litHtmlVersions)!==null&&lr!==void 0?lr:To.litHtmlVersions=[]).push("2.8.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var cr;const Mo=window,li=Mo.trustedTypes,pa=li?li.createPolicy("lit-html",{createHTML:r=>r}):void 0,Hr="$lit$",yt=`lit$${(Math.random()+"").slice(9)}$`,yn="?"+yt,Vl=`<${yn}>`,Ut=document,Yi=()=>Ut.createComment(""),Qi=r=>r===null||typeof r!="object"&&typeof r!="function",wn=Array.isArray,Wl=r=>wn(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",hr=`[ 	
\f\r]`,Ti=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ua=/-->/g,fa=/>/g,Tt=RegExp(`>|${hr}(?:([^\\s"'>=/]+)(${hr}*=${hr}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ma=/'/g,va=/"/g,Sn=/^(?:script|style|textarea|title)$/i,xn=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),h=xn(1),N=xn(2),di=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),ga=new WeakMap,zt=Ut.createTreeWalker(Ut,129,null,!1);function $n(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return pa!==void 0?pa.createHTML(e):e}const jl=(r,e)=>{const t=r.length-1,i=[];let o,s=e===2?"<svg>":"",a=Ti;for(let l=0;l<t;l++){const d=r[l];let u,p,m=-1,v=0;for(;v<d.length&&(a.lastIndex=v,p=a.exec(d),p!==null);)v=a.lastIndex,a===Ti?p[1]==="!--"?a=ua:p[1]!==void 0?a=fa:p[2]!==void 0?(Sn.test(p[2])&&(o=RegExp("</"+p[2],"g")),a=Tt):p[3]!==void 0&&(a=Tt):a===Tt?p[0]===">"?(a=o??Ti,m=-1):p[1]===void 0?m=-2:(m=a.lastIndex-p[2].length,u=p[1],a=p[3]===void 0?Tt:p[3]==='"'?va:ma):a===va||a===ma?a=Tt:a===ua||a===fa?a=Ti:(a=Tt,o=void 0);const y=a===Tt&&r[l+1].startsWith("/>")?" ":"";s+=a===Ti?d+Vl:m>=0?(i.push(u),d.slice(0,m)+Hr+d.slice(m)+yt+y):d+yt+(m===-2?(i.push(void 0),l):y)}return[$n(r,s+(r[t]||"<?>")+(e===2?"</svg>":"")),i]};class Ki{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,a=0;const l=e.length-1,d=this.parts,[u,p]=jl(e,t);if(this.el=Ki.createElement(u,i),zt.currentNode=this.el.content,t===2){const m=this.el.content,v=m.firstChild;v.remove(),m.append(...v.childNodes)}for(;(o=zt.nextNode())!==null&&d.length<l;){if(o.nodeType===1){if(o.hasAttributes()){const m=[];for(const v of o.getAttributeNames())if(v.endsWith(Hr)||v.startsWith(yt)){const y=p[a++];if(m.push(v),y!==void 0){const x=o.getAttribute(y.toLowerCase()+Hr).split(yt),S=/([.?@])?(.*)/.exec(y);d.push({type:1,index:s,name:S[2],strings:x,ctor:S[1]==="."?Gl:S[1]==="?"?Ql:S[1]==="@"?Kl:Vo})}else d.push({type:6,index:s})}for(const v of m)o.removeAttribute(v)}if(Sn.test(o.tagName)){const m=o.textContent.split(yt),v=m.length-1;if(v>0){o.textContent=li?li.emptyScript:"";for(let y=0;y<v;y++)o.append(m[y],Yi()),zt.nextNode(),d.push({type:2,index:++s});o.append(m[v],Yi())}}}else if(o.nodeType===8)if(o.data===yn)d.push({type:2,index:s});else{let m=-1;for(;(m=o.data.indexOf(yt,m+1))!==-1;)d.push({type:7,index:s}),m+=yt.length-1}s++}}static createElement(e,t){const i=Ut.createElement("template");return i.innerHTML=e,i}}function ci(r,e,t=r,i){var o,s,a,l;if(e===di)return e;let d=i!==void 0?(o=t._$Co)===null||o===void 0?void 0:o[i]:t._$Cl;const u=Qi(e)?void 0:e._$litDirective$;return(d==null?void 0:d.constructor)!==u&&((s=d==null?void 0:d._$AO)===null||s===void 0||s.call(d,!1),u===void 0?d=void 0:(d=new u(r),d._$AT(r,t,i)),i!==void 0?((a=(l=t)._$Co)!==null&&a!==void 0?a:l._$Co=[])[i]=d:t._$Cl=d),d!==void 0&&(e=ci(r,d._$AS(r,e.values),d,i)),e}let ql=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:o}=this._$AD,s=((t=e==null?void 0:e.creationScope)!==null&&t!==void 0?t:Ut).importNode(i,!0);zt.currentNode=s;let a=zt.nextNode(),l=0,d=0,u=o[0];for(;u!==void 0;){if(l===u.index){let p;u.type===2?p=new eo(a,a.nextSibling,this,e):u.type===1?p=new u.ctor(a,u.name,u.strings,this,e):u.type===6&&(p=new Xl(a,this,e)),this._$AV.push(p),u=o[++d]}l!==(u==null?void 0:u.index)&&(a=zt.nextNode(),l++)}return zt.currentNode=Ut,s}v(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}};class eo{constructor(e,t,i,o){var s;this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cp=(s=o==null?void 0:o.isConnected)===null||s===void 0||s}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ci(this,e,t),Qi(e)?e===b||e==null||e===""?(this._$AH!==b&&this._$AR(),this._$AH=b):e!==this._$AH&&e!==di&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):Wl(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==b&&Qi(this._$AH)?this._$AA.nextSibling.data=e:this.$(Ut.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:o}=e,s=typeof o=="number"?this._$AC(e):(o.el===void 0&&(o.el=Ki.createElement($n(o.h,o.h[0]),this.options)),o);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===s)this._$AH.v(i);else{const a=new ql(s,this),l=a.u(this.options);a.v(i),this.$(l),this._$AH=a}}_$AC(e){let t=ga.get(e.strings);return t===void 0&&ga.set(e.strings,t=new Ki(e)),t}T(e){wn(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new eo(this.k(Yi()),this.k(Yi()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,t);e&&e!==this._$AB;){const o=e.nextSibling;e.remove(),e=o}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Vo{constructor(e,t,i,o,s){this.type=1,this._$AH=b,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,o){const s=this.strings;let a=!1;if(s===void 0)e=ci(this,e,t,0),a=!Qi(e)||e!==this._$AH&&e!==di,a&&(this._$AH=e);else{const l=e;let d,u;for(e=s[0],d=0;d<s.length-1;d++)u=ci(this,l[i+d],t,d),u===di&&(u=this._$AH[d]),a||(a=!Qi(u)||u!==this._$AH[d]),u===b?e=b:e!==b&&(e+=(u??"")+s[d+1]),this._$AH[d]=u}a&&!o&&this.j(e)}j(e){e===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let Gl=class extends Vo{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===b?void 0:e}};const Yl=li?li.emptyScript:"";let Ql=class extends Vo{constructor(){super(...arguments),this.type=4}j(e){e&&e!==b?this.element.setAttribute(this.name,Yl):this.element.removeAttribute(this.name)}};class Kl extends Vo{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){var i;if((e=(i=ci(this,e,t,0))!==null&&i!==void 0?i:b)===di)return;const o=this._$AH,s=e===b&&o!==b||e.capture!==o.capture||e.once!==o.once||e.passive!==o.passive,a=e!==b&&(o===b||s);s&&this.element.removeEventListener(this.name,this,o),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;typeof this._$AH=="function"?this._$AH.call((i=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class Xl{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){ci(this,e)}}const ba=Mo.litHtmlPolyfillSupport;ba==null||ba(Ki,eo),((cr=Mo.litHtmlVersions)!==null&&cr!==void 0?cr:Mo.litHtmlVersions=[]).push("2.8.0");const vo=(r,e,t)=>{var i,o;const s=(i=t==null?void 0:t.renderBefore)!==null&&i!==void 0?i:e;let a=s._$litPart$;if(a===void 0){const l=(o=t==null?void 0:t.renderBefore)!==null&&o!==void 0?o:null;s._$litPart$=a=new eo(e.insertBefore(Yi(),l),l,void 0,t??{})}return a._$AI(r),a};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var pr,ur;let P=class extends ei{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=vo(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return di}};P.finalized=!0,P._$litElement$=!0,(pr=globalThis.litElementHydrateSupport)===null||pr===void 0||pr.call(globalThis,{LitElement:P});const ya=globalThis.litElementPolyfillSupport;ya==null||ya({LitElement:P});((ur=globalThis.litElementVersions)!==null&&ur!==void 0?ur:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=r=>e=>typeof e=="function"?((t,i)=>(customElements.define(t,i),i))(r,e):((t,i)=>{const{kind:o,elements:s}=i;return{kind:o,elements:s,finisher(a){customElements.define(t,a)}}})(r,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Zl=(r,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,r)}},Jl=(r,e,t)=>{e.constructor.createProperty(t,r)};function c(r){return(e,t)=>t!==void 0?Jl(r,e,t):Zl(r,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function F(r){return c({...r,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ws=({finisher:r,descriptor:e})=>(t,i)=>{var o;if(i===void 0){const s=(o=t.originalKey)!==null&&o!==void 0?o:t.key,a=e!=null?{kind:"method",placement:"prototype",key:s,descriptor:e(t.key)}:{...t,key:s};return r!=null&&(a.finisher=function(l){r(l,s)}),a}{const s=t.constructor;e!==void 0&&Object.defineProperty(t,i,e(i)),r==null||r(s,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function H(r,e){return ws({descriptor:t=>({get(){var o,s;return(s=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(r))!==null&&s!==void 0?s:null},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ed(r){return ws({descriptor:e=>({get(){var t,i;return(i=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(r))!==null&&i!==void 0?i:[]},enumerable:!0,configurable:!0})})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var fr;const td=((fr=window.HTMLSlotElement)===null||fr===void 0?void 0:fr.prototype.assignedElements)!=null?(r,e)=>r.assignedElements(e):(r,e)=>r.assignedNodes(e).filter(t=>t.nodeType===Node.ELEMENT_NODE);function id(r){const{slot:e,selector:t}={};return ws({descriptor:i=>({get(){var o;const s="slot"+(e?`[name=${e}]`:":not([name])"),a=(o=this.renderRoot)===null||o===void 0?void 0:o.querySelector(s),l=a!=null?td(a,r):[];return t?l.filter(d=>d.matches(t)):l},enumerable:!0,configurable:!0})})}class od{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const i=this.resizeHandlers.get(t.target);i==null||i.forEach(o=>{o.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const i=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;i.add(e.handler),this.resizeHandlers.set(e.target,i),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const We={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},yi=r=>(...e)=>({_$litDirective$:r,values:e});let wi=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const je=yi(class extends wi{constructor(r){var e;if(super(r),r.type!==We.ATTRIBUTE||r.name!=="class"||((e=r.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(e=>r[e]).join(" ")+" "}update(r,[e]){var t,i;if(this.it===void 0){this.it=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!(!((t=this.nt)===null||t===void 0)&&t.has(s))&&this.it.add(s);return this.render(e)}const o=r.element.classList;this.it.forEach(s=>{s in e||(o.remove(s),this.it.delete(s))});for(const s in e){const a=!!e[s];a===this.it.has(s)||!((i=this.nt)===null||i===void 0)&&i.has(s)||(a?(o.add(s),this.it.add(s)):(o.remove(s),this.it.delete(s)))}return De}});/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const rd=(r,...e)=>({strTag:!0,strings:r,values:e}),ot=rd,sd=r=>typeof r!="string"&&"strTag"in r,ad=(r,e,t)=>{let i=r[0];for(let o=1;o<r.length;o++)i+=e[o-1],i+=r[o];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nd=r=>sd(r)?ad(r.strings,r.values):r;let k=nd;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ld=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}};/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let r=0;r<256;r++)(r>>4&15).toString(16)+(r&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let dd=new ld;dd.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{I:cd}=Hl,_n=r=>r.strings===void 0,wa=()=>document.createComment(""),Ei=(r,e,t)=>{var i;const o=r._$AA.parentNode,s=e===void 0?r._$AB:e._$AA;if(t===void 0){const a=o.insertBefore(wa(),s),l=o.insertBefore(wa(),s);t=new cd(a,l,r,r.options)}else{const a=t._$AB.nextSibling,l=t._$AM,d=l!==r;if(d){let u;(i=t._$AQ)===null||i===void 0||i.call(t,r),t._$AM=r,t._$AP!==void 0&&(u=r._$AU)!==l._$AU&&t._$AP(u)}if(a!==s||d){let u=t._$AA;for(;u!==a;){const p=u.nextSibling;o.insertBefore(u,s),u=p}}}return t},Et=(r,e,t=r)=>(r._$AI(e,t),r),hd={},Cn=(r,e=hd)=>r._$AH=e,pd=r=>r._$AH,mr=r=>{var e;(e=r._$AP)===null||e===void 0||e.call(r,!1,!0);let t=r._$AA;const i=r._$AB.nextSibling;for(;t!==i;){const o=t.nextSibling;t.remove(),t=o}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Sa=(r,e,t)=>{const i=new Map;for(let o=e;o<=t;o++)i.set(r[o],o);return i},Ss=yi(class extends wi{constructor(r){if(super(r),r.type!==We.CHILD)throw Error("repeat() can only be used in text expressions")}ct(r,e,t){let i;t===void 0?t=e:e!==void 0&&(i=e);const o=[],s=[];let a=0;for(const l of r)o[a]=i?i(l,a):a,s[a]=t(l,a),a++;return{values:s,keys:o}}render(r,e,t){return this.ct(r,e,t).values}update(r,[e,t,i]){var o;const s=pd(r),{values:a,keys:l}=this.ct(e,t,i);if(!Array.isArray(s))return this.ut=l,a;const d=(o=this.ut)!==null&&o!==void 0?o:this.ut=[],u=[];let p,m,v=0,y=s.length-1,x=0,S=a.length-1;for(;v<=y&&x<=S;)if(s[v]===null)v++;else if(s[y]===null)y--;else if(d[v]===l[x])u[x]=Et(s[v],a[x]),v++,x++;else if(d[y]===l[S])u[S]=Et(s[y],a[S]),y--,S--;else if(d[v]===l[S])u[S]=Et(s[v],a[S]),Ei(r,u[S+1],s[v]),v++,S--;else if(d[y]===l[x])u[x]=Et(s[y],a[x]),Ei(r,s[v],s[y]),y--,x++;else if(p===void 0&&(p=Sa(l,x,S),m=Sa(d,v,y)),p.has(d[v]))if(p.has(d[y])){const C=m.get(l[x]),D=C!==void 0?s[C]:null;if(D===null){const M=Ei(r,s[v]);Et(M,a[x]),u[x]=M}else u[x]=Et(D,a[x]),Ei(r,s[v],D),s[C]=null;x++}else mr(s[y]),y--;else mr(s[v]),v++;for(;x<=S;){const C=Ei(r,u[S+1]);Et(C,a[x]),u[x++]=C}for(;v<=y;){const C=s[v++];C!==null&&mr(C)}return this.ut=l,Cn(r,u),De}});function lo(r,e,t){return Array.from({length:(e-r)/t+1},(i,o)=>r+o*t)}let pt=class extends P{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const o=t.target.dataset.cellIndex;if(!o)return;const s=parseInt(o,10);t.isIntersecting?this.visibleCellIndices.add(s):this.visibleCellIndices.delete(s)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){lo(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}refreshCell(e){this.removeCell(e),this.bufferRange.includes(e)&&this.renderCellBuffer([e])}refreshAllVisibleCells(){this.bufferRange.forEach(e=>this.removeCell(e)),this.renderCellBuffer(this.bufferRange)}scrollToCell(e,t){const i=this.cellContainers[e];if(!i)return!1;const o=t?"smooth":"auto";return i.scrollIntoView({behavior:o}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(lo(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){var e;const t=this.itemCount-1,i=lo(0,t,1),o=(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:b;return h`
      <section id="container" role="feed" aria-label=${o}>
        <div id="sentinel" aria-hidden="true"></div>
        ${Ss(i,s=>s,s=>h`
            <article
              class="cell-container"
              aria-posinset=${s+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${s}
              @click=${a=>this.cellSelected(a,s)}
              @keyup=${a=>{a.key==="Enter"&&this.cellSelected(a,s)}}
            ></article>
          `)}
        <slot name="result-last-tile"></slot>
      </section>
    `}cellSelected(e,t){const i=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(i)}get bufferRange(){const e=Math.max(10,this.visibleCellIndices.size),t=this.visibleCellIndices.size===0,i=Math.min(...this.visibleCellIndices),o=Math.max(...this.visibleCellIndices),s=t?0:Math.max(i-e,0),a=t?e:Math.min(o+e,this.itemCount-1);return lo(s,a,1)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),{bufferRange:t}=this;this.renderCellBuffer(t),this.removeCellsOutsideBufferRange(t);const i=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(i)}renderCellBuffer(e){e.forEach(t=>{var i;if(this.renderedCellIndices.has(t))return;const o=this.cellContainerForIndex(t);if(!o)return;const s=(i=this.cellProvider)===null||i===void 0?void 0:i.cellForIndex(t);if(o.style.height="auto",s)vo(s,o),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;vo(this.placeholderCellTemplate,o),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(i=>!e.includes(i)).forEach(i=>{this.removeCell(i)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const i=t.offsetHeight;t.style.height=`${i}px`,vo(b,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=f`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=f`var(--infiniteScrollerRowGap, 1.7rem)`,i=f`var(--infiniteScrollerColGap, 1.7rem)`,o=f`var(--infiniteScrollerCellMinWidth, 16rem)`,s=f`var(--infiniteScrollerCellMaxWidth, 1fr)`,a=f`var(--infiniteScrollerCellMinHeight, 22.5rem)`,l=f`var(--infiniteScrollerCellMaxHeight, none)`,d=f`var(--infiniteScrollerCellOutline, 0)`;return f`
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
            minmax(${o}, ${s})
          );
        }
      }

      .cell-container {
        outline: ${d};
        min-height: ${a};
        max-height: ${l};
        min-width: ${o};
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
    `}};n([c({type:Number})],pt.prototype,"itemCount",void 0);n([c({type:Object})],pt.prototype,"cellProvider",void 0);n([c({type:Object})],pt.prototype,"placeholderCellTemplate",void 0);n([c({type:Boolean})],pt.prototype,"scrollOptimizationsDisabled",void 0);n([c({type:String})],pt.prototype,"ariaLandmarkLabel",void 0);n([H("#sentinel")],pt.prototype,"sentinel",void 0);n([ed(".cell-container")],pt.prototype,"cellContainers",void 0);pt=n([R("infinite-scroller")],pt);function ud(r){return r==null?void 0:r.replace(/%22%22(?!%22%22)(.+?)%22%22/g,"%22$1%22")}function fd(r){var e,t,i;return((e=r==null?void 0:r.rawMetadata)===null||e===void 0?void 0:e.hit_type)==="favorited_search"?"search":(i=(t=r.mediatype)===null||t===void 0?void 0:t.value)!==null&&i!==void 0?i:"data"}const md=N`
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
`,vd=N`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,gd={"login-required":k("Log in to view this item"),"content-warning":k("Content may be inappropriate")},kn={"login-required":md,"content-warning":vd};class Ao{constructor(e,t="unknown"){var i,o,s,a,l,d,u,p,m,v,y,x,S,C,D,M,A,O,W,ae,ze,ge,he,Ae,Q,Ze,Je,K,pe,Be,xt,Ht,Si,Vt,oe,Wt,ne,jt,X,nt,$t,qt,_t;const xi=this.getFlags(e);this.adIds=(i=e.ad_id)===null||i===void 0?void 0:i.values,this.averageRating=(o=e.avg_rating)===null||o===void 0?void 0:o.value,this.captureDates=(s=e.capture_dates)===null||s===void 0?void 0:s.values,this.checked=!1,this.collections=(l=(a=e.collection)===null||a===void 0?void 0:a.values)!==null&&l!==void 0?l:[],this.collectionFilesCount=(u=(d=e.collection_files_count)===null||d===void 0?void 0:d.value)!==null&&u!==void 0?u:0,this.collectionSize=(m=(p=e.collection_size)===null||p===void 0?void 0:p.value)!==null&&m!==void 0?m:0,this.commentCount=(y=(v=e.num_reviews)===null||v===void 0?void 0:v.value)!==null&&y!==void 0?y:0,this.creator=(x=e.creator)===null||x===void 0?void 0:x.value,this.creators=(C=(S=e.creator)===null||S===void 0?void 0:S.values)!==null&&C!==void 0?C:[],this.dateAdded=(D=e.addeddate)===null||D===void 0?void 0:D.value,this.dateArchived=(M=e.publicdate)===null||M===void 0?void 0:M.value,this.datePublished=(A=e.date)===null||A===void 0?void 0:A.value,this.dateReviewed=(O=e.reviewdate)===null||O===void 0?void 0:O.value,this.description=(W=e.description)===null||W===void 0?void 0:W.values.join(`
`),this.factChecks=(ae=e.factcheck)===null||ae===void 0?void 0:ae.values,this.favCount=(ge=(ze=e.num_favorites)===null||ze===void 0?void 0:ze.value)!==null&&ge!==void 0?ge:0,this.hitRequestSource=t,this.hitType=(he=e.rawMetadata)===null||he===void 0?void 0:he.hit_type,this.href=ud((Q=(Ae=e.review)===null||Ae===void 0?void 0:Ae.__href__)!==null&&Q!==void 0?Q:(Ze=e.__href__)===null||Ze===void 0?void 0:Ze.value),this.identifier=Ao.cleanIdentifier(e.identifier),this.isClip=(Je=e.is_clip)===null||Je===void 0?void 0:Je.value,this.issue=(K=e.issue)===null||K===void 0?void 0:K.value,this.itemCount=(Be=(pe=e.item_count)===null||pe===void 0?void 0:pe.value)!==null&&Be!==void 0?Be:0,this.mediatype=fd(e),this.review=e.review,this.snippets=(Ht=(xt=e.highlight)===null||xt===void 0?void 0:xt.values)!==null&&Ht!==void 0?Ht:[],this.source=(Si=e.source)===null||Si===void 0?void 0:Si.value,this.subjects=(oe=(Vt=e.subject)===null||Vt===void 0?void 0:Vt.values)!==null&&oe!==void 0?oe:[],this.thumbnailUrl=(Wt=e.__img__)===null||Wt===void 0?void 0:Wt.value,this.title=(jt=(ne=e.title)===null||ne===void 0?void 0:ne.value)!==null&&jt!==void 0?jt:"",this.tvClipCount=(nt=(X=e.num_clips)===null||X===void 0?void 0:X.value)!==null&&nt!==void 0?nt:0,this.volume=($t=e.volume)===null||$t===void 0?void 0:$t.value,this.viewCount=(qt=e.downloads)===null||qt===void 0?void 0:qt.value,this.weeklyViewCount=(_t=e.week)===null||_t===void 0?void 0:_t.value,this.loginRequired=xi.loginRequired,this.contentWarning=xi.contentWarning}clone(){const e=new Ao({});return e.adIds=this.adIds,e.averageRating=this.averageRating,e.captureDates=this.captureDates,e.checked=this.checked,e.collections=this.collections,e.collectionFilesCount=this.collectionFilesCount,e.collectionSize=this.collectionSize,e.commentCount=this.commentCount,e.creator=this.creator,e.creators=this.creators,e.dateStr=this.dateStr,e.dateAdded=this.dateAdded,e.dateArchived=this.dateArchived,e.datePublished=this.datePublished,e.dateReviewed=this.dateReviewed,e.description=this.description,e.factChecks=this.factChecks,e.favCount=this.favCount,e.hitRequestSource=this.hitRequestSource,e.hitType=this.hitType,e.href=this.href,e.identifier=this.identifier,e.isClip=this.isClip,e.issue=this.issue,e.itemCount=this.itemCount,e.mediatype=this.mediatype,e.snippets=this.snippets,e.source=this.source,e.subjects=this.subjects,e.thumbnailUrl=this.thumbnailUrl,e.title=this.title,e.tvClipCount=this.tvClipCount,e.volume=this.volume,e.viewCount=this.viewCount,e.weeklyViewCount=this.weeklyViewCount,e.loginRequired=this.loginRequired,e.contentWarning=this.contentWarning,e}get isTvSearchResult(){return this.hitType==="tv_clip"&&this.hitRequestSource==="search_query"}getFlags(e){var t,i,o,s;const a={loginRequired:!1,contentWarning:!1};if(!((t=e.collection)===null||t===void 0)&&t.values.length&&((i=e.mediatype)===null||i===void 0?void 0:i.value)!=="collection"){for(const l of(s=(o=e.collection)===null||o===void 0?void 0:o.values)!==null&&s!==void 0?s:[])if(l==="loggedin"&&(a.loginRequired=!0,a.contentWarning)||l==="no-preview"&&(a.contentWarning=!0,a.loginRequired))break}return a}static cleanIdentifier(e){var t;const i=(t=e==null?void 0:e.indexOf("|"))!==null&&t!==void 0?t:-1;return i>0?e==null?void 0:e.slice(0,i):e}}var _;(function(r){r.default="default",r.unrecognized="unrecognized",r.relevance="relevance",r.alltimeview="alltimeview",r.weeklyview="weeklyview",r.title="title",r.date="date",r.datearchived="datearchived",r.datereviewed="datereviewed",r.dateadded="dateadded",r.datefavorited="datefavorited",r.creator="creator"})(_||(_={}));const xa=[_.weeklyview,_.alltimeview],$a=[_.datefavorited,_.date,_.datearchived,_.datereviewed,_.dateadded],xe={[_.default]:{field:_.default,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!1,displayName:"",urlNames:["",null,void 0]},[_.unrecognized]:{field:_.unrecognized,defaultSortDirection:null,canSetDirection:!0,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!0,displayName:"",urlNames:[]},[_.relevance]:{field:_.relevance,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,displayName:"Relevance",urlNames:["_score"]},[_.alltimeview]:{field:_.alltimeview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"downloads",displayName:"All-time views",urlNames:["downloads"]},[_.weeklyview]:{field:_.weeklyview,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"week",displayName:"Weekly views",urlNames:["week"]},[_.title]:{field:_.title,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"titleSorter",displayName:"Title",urlNames:["title","titleSorter"]},[_.date]:{field:_.date,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"date",displayName:"Date published",urlNames:["date"]},[_.datearchived]:{field:_.datearchived,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"publicdate",displayName:"Date archived",urlNames:["publicdate"]},[_.datereviewed]:{field:_.datereviewed,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"reviewdate",displayName:"Date reviewed",urlNames:["reviewdate"]},[_.dateadded]:{field:_.dateadded,defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"addeddate",displayName:"Date added",urlNames:["addeddate"]},[_.datefavorited]:{field:_.datefavorited,defaultSortDirection:"desc",canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,searchServiceKey:"favoritedate",displayName:"Date favorited",urlNames:["favoritedate"]},[_.creator]:{field:_.creator,defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"creatorSorter",displayName:"Creator",urlNames:["creator","creatorSorter"]}};function Tn(r){var e;return(e=Object.values(xe).find(t=>t.urlNames.some(i=>r===i)))!==null&&e!==void 0?e:xe[_.unrecognized]}const Wo={[_.relevance]:!0,[_.weeklyview]:!0,[_.alltimeview]:!0,[_.title]:!0,[_.datefavorited]:!1,[_.date]:!0,[_.datearchived]:!0,[_.datereviewed]:!0,[_.dateadded]:!0,[_.creator]:!0,[_.default]:!1,[_.unrecognized]:!1},bd={...Wo,[_.datefavorited]:!0},yd={...Wo,[_.date]:!1,[_.datereviewed]:!1,[_.dateadded]:!1},wd={uploads:_.datearchived,reviews:_.datereviewed,collections:_.datearchived,web_archives:_.datearchived},Sd={title:"firstTitle",creator:"firstCreator"},ht=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{},program:{},person:{},sponsor:{}}),xd={all:"",commercials:"only_commercials",factchecks:"only_factchecks",quotes:"only_quotes"},$d={only_commercials:"commercials",only_factchecks:"factchecks",only_quotes:"quotes"},En=["mediatype","year","subject","collection","creator","language"],_d=["program","creator","year","subject","collection","person","sponsor","language"],Do={subject:"Subject",lending:"Availability",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year",program:"Program",person:"Person",sponsor:"Sponsor"},Ui={subject:j.COUNT,lending:j.COUNT,mediatype:j.COUNT,language:j.COUNT,creator:j.COUNT,collection:j.COUNT,year:j.NUMERIC,program:j.COUNT,person:j.COUNT,sponsor:j.COUNT},Cd={subject:j.ALPHABETICAL,lending:j.ALPHABETICAL,mediatype:j.ALPHABETICAL,language:j.ALPHABETICAL,creator:j.ALPHABETICAL,collection:j.ALPHABETICAL,year:j.NUMERIC,program:j.ALPHABETICAL,person:j.ALPHABETICAL,sponsor:j.ALPHABETICAL},kd={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},_a={is_lendable:"Lending Library",available_to_borrow:"Borrow 14 Days",is_readable:"Always Available"},jo={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0};/*! typescript-cookie v1.0.6 | MIT */const Mn=r=>encodeURIComponent(r).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),An=r=>encodeURIComponent(r).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),xs=decodeURIComponent,$s=r=>(r[0]==='"'&&(r=r.slice(1,-1)),r.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function Td(r){return r=Object.assign({},r),typeof r.expires=="number"&&(r.expires=new Date(Date.now()+r.expires*864e5)),r.expires!=null&&(r.expires=r.expires.toUTCString()),Object.entries(r).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function Dn(r,e,t){const i=/(?:^|; )([^=]*)=([^;]*)/g,o={};let s;for(;(s=i.exec(document.cookie))!=null;)try{const a=t(s[1]);if(o[a]=e(s[2],a),r===a)break}catch{}return r!=null?o[r]:o}const Ca=Object.freeze({decodeName:xs,decodeValue:$s,encodeName:Mn,encodeValue:An}),_s=Object.freeze({path:"/"});function Fo(r,e,t=_s,{encodeValue:i=An,encodeName:o=Mn}={}){return document.cookie=`${o(r)}=${i(e,r)}${Td(t)}`}function Vr(r,{decodeValue:e=$s,decodeName:t=xs}={}){return Dn(r,e,t)}function Ed({decodeValue:r=$s,decodeName:e=xs}={}){return Dn(void 0,r,e)}function Md(r,e=_s){Fo(r,"",Object.assign({},e,{expires:-1}))}function Wr(r,e){const t={set:function(o,s,a){return Fo(o,s,Object.assign({},this.attributes,a),{encodeValue:this.converter.write})},get:function(o){if(arguments.length===0)return Ed(this.converter.read);if(o!=null)return Vr(o,this.converter.read)},remove:function(o,s){Md(o,Object.assign({},this.attributes,s))},withAttributes:function(o){return Wr(this.converter,Object.assign({},this.attributes,o))},withConverter:function(o){return Wr(Object.assign({},this.converter,o),this.attributes)}},i={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(r)}};return Object.create(t,i)}Wr({read:Ca.decodeValue,write:Ca.encodeValue},_s);function Ad(r,e){return r===e?!0:r.length!==e.length?!1:r.every((t,i)=>t===e[i])}class Dd{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e,t={}){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e,t)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";Fo(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const i=e==="list-detail"?"showdetails":"";Fo(`showdetails-${this.context}`,i,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=Vr(`view-${this.context}`),t=Vr(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e,t={}){var i,o,s,a,l;const d=new URL(window.location.href),u=new URLSearchParams(d.searchParams),p=this.removeRecognizedParams(d.searchParams);let m=!1;switch(e.baseQuery&&p.set("query",e.baseQuery),e.searchType){case I.FULLTEXT:p.set("sin","TXT");break;case I.RADIO:p.set("sin","RADIO");break;case I.TV:p.set("sin","TV");break;case I.METADATA:(t.persistMetadataSearchType||u.get("sin")==="MD")&&p.set("sin","MD");break}if(u.get("sin")===""&&(u.delete("sin"),m=!0),e.currentPage&&(e.currentPage>1?p.set("page",e.currentPage.toString()):p.delete("page")),e.selectedSort){const S=xe[e.selectedSort];let C=this.sortDirectionPrefix(e.sortDirection);if(S.field===_.unrecognized){const D=(i=u.get("sort"))!==null&&i!==void 0?i:"",{field:M,direction:A}=this.getSortFieldAndDirection(D);e.sortDirection||(C=this.sortDirectionPrefix(A)),M?p.set("sort",`${C}${M}`):p.set("sort",D)}else if(S.shownInURL){const D=S.urlNames[0];p.set("sort",`${C}${D}`)}}if(e.selectedFacets)for(const[S,C]of Object.entries(e.selectedFacets)){const D=Object.entries(C);if(D.length!==0)for(const[M,A]of D){const O=A.state==="hidden",W=`${S}:"${M}"`;O?p.append("not[]",W):p.append("and[]",W)}}const v=!((o=e.minSelectedDate)===null||o===void 0)&&o.includes("-")||!((s=e.maxSelectedDate)===null||s===void 0)&&s.includes("-")?"date":"year";if(e.minSelectedDate&&e.maxSelectedDate&&p.append("and[]",`${v}:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&p.append("and[]",e.titleQuery),e.creatorQuery&&p.append("and[]",e.creatorQuery),e.tvClipFilter){const S=xd[e.tvClipFilter];S&&p.append(S,"1")}let y=t.forceReplace?"replaceState":"pushState";const x=this.paramsMatch(u,p,["sin","sort","and[]","not[]","only_commercials","only_factchecks","only_quotes"]);if(x&&this.paramsMatch(u,p,["query"])){if(m)p.delete("sin");else if(this.paramsMatch(u,p,["page"]))return;y="replaceState"}else x&&this.hasLegacyParam(u)&&(y="replaceState");(l=(a=window.history)[y])===null||l===void 0||l.call(a,{query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:{field:e.selectedSort,direction:e.sortDirection},minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},"",d)}loadQueryStateFromUrl(){var e;const t=new URL(window.location.href),i=t.searchParams.get("sin"),o=t.searchParams.get("page"),s=t.searchParams.get("query"),a=t.searchParams.get("sort"),l=t.searchParams.getAll("and[]"),d=t.searchParams.getAll("not[]");for(const[m,v]of t.searchParams.entries())/and\[\d+\]/.test(m)?l.push(v):/not\[\d+\]/.test(m)&&d.push(v);const u=(e=t.searchParams.get("q"))!==null&&e!==void 0?e:t.searchParams.get("search"),p={selectedFacets:ht()};switch(s?p.baseQuery=s:u&&(p.baseQuery=u),i){case"TXT":p.searchType=I.FULLTEXT;break;case"RADIO":p.searchType=I.RADIO;break;case"TV":p.searchType=I.TV;break;case"MD":p.searchType=I.METADATA;break;default:p.searchType=I.DEFAULT;break}if(o){const m=parseInt(o,10);p.currentPage=m}else p.currentPage=1;if(a){const{field:m,direction:v}=this.getSortFieldAndDirection(a),y=Tn(m);p.selectedSort=y.field,["asc","desc"].includes(v)&&(p.sortDirection=v)}l&&l.forEach(m=>{let[v,y]=m.split(":");if(v=v.replace(/Sorter$/,""),v.startsWith("-")){d.push(m.slice(1));return}switch(v){case"date":case"year":{const[x,S]=y.split(" TO ");x&&S?(p.minSelectedDate=x.substring(1,x.length),p.maxSelectedDate=S.substring(0,S.length-1)):this.setSelectedFacetState(p.selectedFacets,v,y,"selected");break}case"firstTitle":p.selectedTitleFilter=y;break;case"firstCreator":p.selectedCreatorFilter=y;break;default:this.setSelectedFacetState(p.selectedFacets,v,y,"selected")}}),d&&d.forEach(m=>{const[v,y]=m.split(":");this.setSelectedFacetState(p.selectedFacets,v,y,"hidden")});for(const[m,v]of Object.entries($d))if(t.searchParams.get(m)){p.tvClipFilter=v;break}return p}getSortFieldAndDirection(e){const t=e.indexOf(" ")>-1;let i,o;return t?[i,o]=e.split(" "):(i=e.startsWith("-")?e.slice(1):e,o=e.startsWith("-")?"desc":"asc"),{field:i,direction:o}}sortDirectionPrefix(e){return e==="desc"?"-":""}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}paramsMatch(e,t,i){return i.every(o=>Ad(e.getAll(o).sort(),t.getAll(o).sort()))}removeRecognizedParams(e){e.delete("query"),e.delete("sin"),e.delete("page"),e.delete("sort"),e.delete("and[]"),e.delete("not[]");for(const t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete("q"),e.delete("search"),e.delete("only_commercials"),e.delete("only_factchecks"),e.delete("only_quotes"),e}hasLegacyParam(e){return e.has("q")||e.has("search")}setSelectedFacetState(e,t,i,o){var s;const a=e[t];if(!a)return;const l=this.stripQuotes(i);(s=a[l])!==null&&s!==void 0||(a[l]=this.getDefaultBucket(i)),a[l].state=o}getDefaultBucket(e){return{key:e,count:0,state:"none"}}}const jr=["forum_posts","lending","web_archives"],Fd=new TextEncoder;async function Fn(r){const e=await crypto.subtle.digest("SHA-1",Fd.encode(r));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const He=window.location&&(window.location.hostname==="localhost"||window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||window.location.host.match(/\.code\.archive\.org$/)||window.location.host.match(/\.dev\.archive\.org$/)||window.location.host.match(/^ia-petabox-/)||window.location.host.match(/^local\.archive\.org/)||window.location.host.match(/^internetarchive\.github\.io$/))?console.log.bind(console):()=>{};function qr(r,e){if(r)for(const[t,i]of Object.entries(r))for(const[o,s]of Object.entries(i))e(t,o,s,r)}function Cs(r,e,t,i=!1){var o;const s=r??ht(),a={...s,[e]:{...s[e],[t.key]:t}};return i&&t.state==="none"&&((o=a[e])===null||o===void 0||delete o[t.key]),a}function Ld(r){const e=ht();return qr(r,(t,i,o)=>{e[t]||(e[t]={}),e[t][i]=o}),e}function Ln(r,e){const t=Ld(r);return qr(e,(i,o,s)=>{t[i]||(t[i]={}),t[i][o]=s}),qr(t,(i,o,s)=>{var a;s.state==="none"&&((a=t[i])===null||a===void 0||delete a[o])}),t}const ka=["selected","hidden","none"];function zn(r,e=j.COUNT){return r.sort((t,i)=>{const o=ka.indexOf(t.state),s=ka.indexOf(i.state),a=o-s;let l;return e===j.ALPHABETICAL?l=t.key.localeCompare(i.key):e===j.NUMERIC?l=Number(i.key)-Number(t.key):l=i.count-t.count,a||l})}class zd{get initialSearchComplete(){return this._initialSearchCompletePromise}constructor(e,t=50){this.host=e,this.pageSize=t,this.pages={},this.offset=0,this.numTileModels=0,this.numInitialPages=2,this.fetchesInProgress=new Set,this.previousQueryKey="",this.searchResultsLoading=!1,this.facetsLoading=!1,this.facetsReadyToLoad=!1,this.suppressFetches=!1,this.totalResults=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.collectionTitles=new Map,this.tvChannelAliases=new Map,this.parentCollections=[],this.prefixFilterCountMap={},this._initialSearchCompletePromise=Promise.resolve(!0),this.checkAllTiles=()=>{this.map(i=>{const o=i.clone();return o.checked=!0,o})},this.uncheckAllTiles=()=>{this.map(i=>{const o=i.clone();return o.checked=!1,o})},this.removeCheckedTiles=()=>{const{checkedTileModels:i,uncheckedTileModels:o}=this,s=i.length;if(s===0)return;this.offset+=s;const a={};let l=Math.floor(this.offset/this.pageSize)+1,d=this.offset%this.pageSize;for(let u=1;u<=l;u+=1){const p=this.offset-this.pageSize*(u-1),m=Math.min(this.pageSize,p);a[u]=Array(m).fill(void 0)}for(const u of o)a[l]||(a[l]=[]),a[l].push(u),d+=1,d>=this.pageSize&&(l+=1,d=0);this.pages=a,this.numTileModels-=s,this.totalResults-=s,this.host.setTileCount(this.size),this.host.setTotalResultCount(this.totalResults),this.requestHostUpdate(),this.refreshVisibleResults()}}hostConnected(){this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading)}hostUpdate(){if(!this.activeOnHost||(this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading),!this.host.searchService)||!(this.pageFetchQueryKey!==this.previousQueryKey))return;const t=!this.host.baseQuery;(this.canPerformSearch||t)&&(this.activeOnHost&&this.host.emitQueryStateChanged(),this.handleQueryChange())}get activeOnHost(){return this.host.dataSource===this}get size(){return this.numTileModels}reset(){He("Resetting CB data source"),this.pages={},this.aggregations={},this.histogramAggregation=void 0,this.pageElements=void 0,this.parentCollections=[],this.previousQueryKey="",this.queryErrorMessage=void 0,this.offset=0,this.numTileModels=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.facetsLoading=!1,this.fetchesInProgress.clear(),this.setTotalResultCount(0),this.requestHostUpdate()}resetPages(){Object.keys(this.pages).length<this.host.maxPagesToManage&&(this.pages={},this.fetchesInProgress.forEach(e=>{e.startsWith("facets-")||this.fetchesInProgress.delete(e)}),this.requestHostUpdate())}addPage(e,t){this.pages[e]=t,this.numTileModels+=t.length,this.requestHostUpdate()}addMultiplePages(e,t){const i=Math.ceil(t.length/this.pageSize);for(let a=0;a<i;a+=1){const l=this.pageSize*a;this.addPage(e+a,t.slice(l,l+this.pageSize))}this.host.currentVisiblePageNumbers.some(a=>a>=e&&a<=e+i)&&this.refreshVisibleResults()}getPage(e){return this.pages[e]}getAllPages(){return this.pages}hasPage(e){return!!this.pages[e]}getTileModelAt(e){var t,i;const o=e+this.offset,s=Math.floor(o/this.pageSize)+1,a=o%this.pageSize;let l=1,d=0;for(;d<=o;){if(!this.pages[l])return(t=this.pages[s])===null||t===void 0?void 0:t[a];if(d+this.pages[l].length>o)return this.pages[l][o-d];d+=this.pages[l].length,l+=1}return(i=this.pages[s])===null||i===void 0?void 0:i[a]}indexOf(e){return Object.values(this.pages).flat().indexOf(e)-this.offset}getPageSize(){return this.pageSize}setPageSize(e){this.reset(),this.pageSize=e}setNumInitialPages(e){this.numInitialPages=e}setTotalResultCount(e){this.totalResults=e,this.activeOnHost&&this.host.setTotalResultCount(e)}setFetchesSuppressed(e){this.suppressFetches=e}setEndOfDataReached(e){this.endOfDataReached=e}async handleQueryChange(){if(this.suppressFetches)return;this.reset();let e;this._initialSearchCompletePromise=new Promise(t=>{e=t}),this.queryInitialized=!0,await Promise.all([this.doInitialPageFetch(),this.canFetchFacets?this.fetchFacets():null]),e(!0)}async handleFacetReadinessChange(e){const t=!this.facetsReadyToLoad&&e;this.facetsReadyToLoad=e,t&&this.canFetchFacets&&this.fetchFacets()}get canFetchFacets(){var e;if(this.host.facetLoadStrategy==="off"||jr.includes(this.host.profileElement)||this.host.facetLoadStrategy!=="eager"&&!this.facetsReadyToLoad)return!1;const t=Object.keys((e=this.aggregations)!==null&&e!==void 0?e:{}).length>0;return!(this.facetsLoading||t)}map(e){Object.keys(this.pages).length&&(this.pages=Object.fromEntries(Object.entries(this.pages).map(([t,i])=>[t,i.map((o,s,a)=>o&&e(o,s,a))])),this.requestHostUpdate(),this.refreshVisibleResults())}get checkedTileModels(){return this.getFilteredTileModels(e=>e.checked)}get uncheckedTileModels(){return this.getFilteredTileModels(e=>!e.checked)}getFilteredTileModels(e){return Object.values(this.pages).flat().filter((t,i,o)=>t?e(t,i,o):!1)}get canPerformSearch(){var e,t;if(!this.host.searchService)return!1;const o=!!((e=this.host.baseQuery)===null||e===void 0?void 0:e.trim()),s=!!(!((t=this.host.identifiers)===null||t===void 0)&&t.length),a=!!this.host.withinCollection,l=!!this.host.withinProfile,d=!!this.host.profileElement,u=this.host.searchType===I.DEFAULT,p=this.host.searchType===I.METADATA,m=this.host.searchType===I.TV;return o||s||a&&(u||p||m)||l&&(d&&(u||p))}setSearchResultsLoading(e){this.searchResultsLoading=e,this.activeOnHost&&this.host.setSearchResultsLoading(e)}setFacetsLoading(e){this.facetsLoading=e,this.activeOnHost&&this.host.setFacetsLoading(e)}requestHostUpdate(){this.activeOnHost&&this.host.requestUpdate()}refreshVisibleResults(){this.activeOnHost&&this.host.refreshVisibleResults()}get pageFetchQueryKey(){var e,t,i;const o=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,s=(e=this.host.withinCollection)!==null&&e!==void 0?e:o,a=(t=this.host.selectedSort)!==null&&t!==void 0?t:"none",l=(i=this.host.sortDirection)!==null&&i!==void 0?i:"none";return`fq:${this.fullQuery}-pt:${s}-st:${this.host.searchType}-sf:${a}-sd:${l}`}get facetFetchQueryKey(){var e;const t=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,i=(e=this.host.withinCollection)!==null&&e!==void 0?e:t;return`facets-fq:${this.fullQuery}-pt:${i}-st:${this.host.searchType}`}get filterMap(){const e=new Ml,{minSelectedDate:t,maxSelectedDate:i,selectedFacets:o,internalFilters:s,selectedTitleFilter:a,selectedCreatorFilter:l}=this.host,d=this.host.searchType===I.TV?"date":"year";t&&e.addFilter(d,t,Ne.GREATER_OR_EQUAL),i&&e.addFilter(d,i,Ne.LESS_OR_EQUAL);const u=Ln(s,o);if(u)for(const[m,v]of Object.entries(u)){const{name:y,values:x}=this.prepareFacetForFetch(m,v);for(const[S,C]of Object.entries(x)){let D;C.state==="selected"?D=Ne.INCLUDE:C.state==="hidden"&&(D=Ne.EXCLUDE),D&&e.addFilter(y,S,D)}}if(a&&e.addFilter("firstTitle",a,Ne.INCLUDE),l&&e.addFilter("firstCreator",l,Ne.INCLUDE),this.host.searchType===I.TV)switch(this.host.tvClipFilter){case"commercials":e.addFilter("ad_id","*",Ne.INCLUDE);break;case"factchecks":e.addFilter("factcheck","*",Ne.INCLUDE);break;case"quotes":e.addFilter("clip","1",Ne.INCLUDE);break}return e.build()}async requestUID(e,t){var i;const o=JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.host.searchType}),s=(await Fn(o)).slice(0,20),a=(await this.host.getSessionId()).slice(0,20),l=(i=e.page)!==null&&i!==void 0?i:0,d=t.charAt(0),u=Date.now();return`R:${s}-S:${a}-P:${l}-K:${d}-T:${u}`}get pageSpecifierParams(){var e;return!((e=this.host.identifiers)===null||e===void 0)&&e.length?{pageType:"client_document_fetch"}:this.host.withinCollection?{pageType:"collection_details",pageTarget:this.host.withinCollection}:this.host.withinProfile?{pageType:"account_details",pageTarget:this.host.withinProfile,pageElements:this.host.profileElement?[this.host.profileElement]:[]}:null}get fullQuery(){var e;const t=[],i=(e=this.host.baseQuery)===null||e===void 0?void 0:e.trim();i&&t.push(i),this.host.identifiers&&t.push(`identifier:(${this.host.identifiers.join(" OR ")})`);const{facetQuery:o,dateRangeQueryClause:s,sortFilterQueries:a}=this;return o&&t.push(o),s&&t.push(s),a&&t.push(a),t.join(" AND ").trim()}get facetQuery(){var e;if(!this.host.selectedFacets)return;const t=[];for(const[i,o]of Object.entries(this.host.selectedFacets))t.push(this.buildFacetClause(i,o));return(e=this.joinFacetClauses(t))===null||e===void 0?void 0:e.trim()}get dateRangeQueryClause(){if(!(!this.host.minSelectedDate||!this.host.maxSelectedDate))return`year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get titleQuery(){return this.host.selectedTitleFilter?`firstTitle:${this.host.selectedTitleFilter}`:void 0}get creatorQuery(){return this.host.selectedCreatorFilter?`firstCreator:${this.host.selectedCreatorFilter}`:void 0}buildFacetClause(e,t){const{name:i,values:o}=this.prepareFacetForFetch(e,t),s=Object.entries(o);if(s.length===0)return"";const a=[];for(const[d,u]of s){const p=u.state==="hidden"?"-":"";a.push(`${p}"${d}"`)}const l=a.join(" OR ");return`${i}:(${l})`}prepareFacetForFetch(e,t){let[i,o]=[e,t];return e==="lending"&&(i="lending___status"),{name:i,values:o}}joinFacetClauses(e){const t=e.filter(i=>i.length>0);return t.length>0?`(${t.join(" AND ")})`:void 0}async fetchFacets(){var e,t,i,o,s,a,l;const d=(e=this.host.baseQuery)===null||e===void 0?void 0:e.trim();if(!this.canPerformSearch)return;const{facetFetchQueryKey:u}=this;if(this.fetchesInProgress.has(u))return;this.fetchesInProgress.add(u),this.setFacetsLoading(!0);const p=this.host.sortParam?[this.host.sortParam]:[],m={...this.pageSpecifierParams,query:d||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregationsSize:10};m.uid=await this.requestUID({...m,sort:p},"aggregations");const v=await((t=this.host.searchService)===null||t===void 0?void 0:t.search(m,this.host.searchType)),y=v==null?void 0:v.success,x=!this.fetchesInProgress.has(u);if(this.fetchesInProgress.delete(u),x)return;if(!y){const M=(i=v==null?void 0:v.error)===null||i===void 0?void 0:i.message,A=(s=(o=v==null?void 0:v.error)===null||o===void 0?void 0:o.details)===null||s===void 0?void 0:s.message;!M&&!A&&((l=(a=window==null?void 0:window.Sentry)===null||a===void 0?void 0:a.captureMessage)===null||l===void 0||l.call(a,"Missing or malformed facet response from backend","error")),this.setFacetsLoading(!1);return}const{aggregations:S,collectionTitles:C,tvChannelAliases:D}=y.response;if(this.aggregations=S,this.histogramAggregation=this.host.searchType===I.TV?S==null?void 0:S.date_histogram:S==null?void 0:S.year_histogram,C)for(const[M,A]of Object.entries(C))this.collectionTitles.set(M,A);if(D)for(const[M,A]of Object.entries(D))this.tvChannelAliases.set(M,A);this.setFacetsLoading(!1),this.requestHostUpdate()}async doInitialPageFetch(){this.setSearchResultsLoading(!0),await this.fetchPage(this.host.initialPageNumber,this.numInitialPages)}async fetchPage(e,t=1){var i,o,s,a,l,d,u,p,m,v,y,x;const S=(i=this.host.baseQuery)===null||i===void 0?void 0:i.trim();if(!this.canPerformSearch){this.setSearchResultsLoading(!1);return}if(this.hasPage(e)||this.endOfDataReached)return;let C=e===1?t:1;const D=this.pageSize*C,{pageFetchQueryKey:M}=this,A=`${M}-p:${e}`;if(this.fetchesInProgress.has(A))return;for(let K=0;K<C;K+=1)this.fetchesInProgress.add(`${M}-p:${e+K}`);this.previousQueryKey=M;const{withinCollection:O,withinProfile:W}=this.host;let ae=this.host.sortParam?[this.host.sortParam]:[];if(W&&this.host.selectedSort===_.default&&this.host.defaultSortField){const K=xe[this.host.defaultSortField];K.searchServiceKey&&(ae=[{field:K.searchServiceKey,direction:"desc"}])}const ge={...this.pageSpecifierParams,query:S||"",identifiers:this.host.identifiers,page:e,rows:D,sort:ae,filters:this.filterMap,aggregations:{omit:!0}};ge.uid=await this.requestUID(ge,"hits");const he=await((o=this.host.searchService)===null||o===void 0?void 0:o.search(ge,this.host.searchType)),Ae=he==null?void 0:he.success;if(!this.fetchesInProgress.has(A))return;for(let K=0;K<C;K+=1)this.fetchesInProgress.delete(`${M}-p:${e+K}`);if(!Ae){const K=(s=he==null?void 0:he.error)===null||s===void 0?void 0:s.message,pe=(l=(a=he==null?void 0:he.error)===null||a===void 0?void 0:a.details)===null||l===void 0?void 0:l.message;this.queryErrorMessage=`${K??""}${pe?`; ${pe}`:""}`,this.queryErrorMessage||(this.queryErrorMessage="Missing or malformed response from backend",(u=(d=window==null?void 0:window.Sentry)===null||d===void 0?void 0:d.captureMessage)===null||u===void 0||u.call(d,this.queryErrorMessage,"error")),this.setSearchResultsLoading(!1),this.requestHostUpdate(),this.host.emitSearchError();return}this.setTotalResultCount(Ae.response.totalResults-this.offset),this.activeOnHost&&this.totalResults===0&&this.host.emitEmptyResults(),this.sessionContext=Ae.sessionContext,O?(this.collectionExtraInfo=Ae.response.collectionExtraInfo,this.activeOnHost&&this.host.applyDefaultCollectionSort(this.collectionExtraInfo),this.collectionExtraInfo&&(this.parentCollections=[].concat((m=(p=this.collectionExtraInfo.public_metadata)===null||p===void 0?void 0:p.collection)!==null&&m!==void 0?m:[]),this.host.isTVCollection=((v=this.host.withinCollection)===null||v===void 0?void 0:v.startsWith("TV-"))||this.host.withinCollection==="tvnews"||this.host.withinCollection==="tvarchive"||this.parentCollections.includes("tvnews")||this.parentCollections.includes("tvarchive"))):W&&(this.accountExtraInfo=Ae.response.accountExtraInfo,this.pageElements=Ae.response.pageElements);const{results:Q,collectionTitles:Ze,tvChannelAliases:Je}=Ae.response;if(Q&&Q.length>0){if(Ze){for(const[Be,xt]of Object.entries(Ze))this.collectionTitles.set(Be,xt);const pe=(x=(y=this.collectionExtraInfo)===null||y===void 0?void 0:y.public_metadata)===null||x===void 0?void 0:x.title;O&&pe&&this.collectionTitles.set(O,pe)}if(Je)for(const[pe,Be]of Object.entries(Je))this.tvChannelAliases.set(pe,Be);const K=["lending","web_archives"].includes(this.host.profileElement);K&&(C=Math.ceil(Q.length/this.pageSize),this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.totalResults));for(let pe=0;pe<C;pe+=1){const Be=this.pageSize*pe;this.addFetchedResultsToDataSource(e+pe,Q.slice(Be,Be+this.pageSize),!K||pe===C-1)}}(this.size>=this.totalResults||Q.length===0)&&(this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.size)),this.setSearchResultsLoading(!1),this.requestHostUpdate()}get hitRequestSource(){const{host:e}=this;return e.baseQuery?"search_query":e.withinProfile?"profile_tab":e.withinCollection?"collection_members":"unknown"}addFetchedResultsToDataSource(e,t,i=!0){const o=[],s=this.hitRequestSource;t==null||t.forEach(a=>{a.identifier&&o.push(new Ao(a,s))}),this.addPage(e,o),i&&this.refreshVisibleResults()}async fetchPrefixFilterBuckets(e){var t,i,o,s,a,l,d;const u=(t=this.host.baseQuery)===null||t===void 0?void 0:t.trim();if(!this.canPerformSearch)return[];const p=Sd[e],m=this.host.sortParam?[this.host.sortParam]:[],v={...this.pageSpecifierParams,query:u||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregations:{simpleParams:[p]},aggregationsSize:26};v.uid=await this.requestUID({...v,sort:m},"aggregations");const y=await((i=this.host.searchService)===null||i===void 0?void 0:i.search(v,this.host.searchType));return(d=(l=(a=(s=(o=y==null?void 0:y.success)===null||o===void 0?void 0:o.response)===null||s===void 0?void 0:s.aggregations)===null||a===void 0?void 0:a[p])===null||l===void 0?void 0:l.buckets)!==null&&d!==void 0?d:[]}async updatePrefixFilterCounts(e){const{facetFetchQueryKey:t}=this,i=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap={...this.prefixFilterCountMap},this.prefixFilterCountMap[e]=i.reduce((s,a)=>(s[a.key.toUpperCase()]=a.doc_count,s),{}),this.requestHostUpdate())}async updatePrefixFiltersForCurrentSort(){if(["title","creator"].includes(this.host.selectedSort)){const e=this.host.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort(),this.requestHostUpdate()}}var rt;(function(r){r.default="collection-browser"})(rt||(rt={}));var te;(function(r){r.sortBy="sortBy",r.filterByCreator="filterByCreator",r.filterByTitle="filterByTitle",r.displayMode="displayMode",r.loadDesktopView="loadDesktopView",r.loadMobileView="loadMobileView",r.facetSelected="facetSelected",r.facetDeselected="facetDeselected",r.facetNegativeSelected="facetNegativeSelected",r.facetNegativeDeselected="facetNegativeDeselected",r.mobileFacetsToggled="mobileFacetsToggled",r.partOfCollectionClicked="partOfCollectionClicked",r.histogramChanged="histogramChanged",r.histogramChangedFromModal="histogramChangedFromModal",r.histogramExpanded="histogramExpanded",r.resultSelected="resultSelected",r.moreFacetsPageChange="moreFacetsPageChange",r.showMoreFacetsModal="showMoreFacetsModal",r.closeMoreFacetsModal="closeMoreFacetsModal",r.applyMoreFacetsModal="applyMoreFacetsModal"})(te||(te={}));const Gr=N`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`,at=f`
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
 */const Bd=(r,e,t)=>{for(const i of e)if(i[0]===r)return(0,i[1])();return t==null?void 0:t()},Pd=N`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,co=N`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`;var it;let Fe=it=class extends P{constructor(){super(...arguments),this.placeholderType=null,this.detailMessage=""}render(){return this.placeholderType?h`${this.placeholderTemplate}`:b}get placeholderTemplate(){return h`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?"mobile":"desktop"}"
      >
        ${Bd(this.placeholderType,[["empty-query",()=>this.emptyQueryTemplate],["empty-collection",()=>this.emptyCollectionTemplate],["no-results",()=>this.noResultsTemplate],["query-error",()=>this.queryErrorTemplate],["collection-error",()=>this.collectionErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return h`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${it.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${Pd}</div>
    `}get emptyCollectionTemplate(){return h`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${it.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${co}</div>
    `}get noResultsTemplate(){return h`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection?it.MESSAGE_NO_COLLECTION_RESULTS:it.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${co}</div>
    `}get queryErrorTemplate(){return h`
      <h2 class="title" data-testid="error-query-text-msg">
        ${it.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${co}</div>
      <p class="error-details">
        ${it.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}get collectionErrorTemplate(){return h`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${it.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${co}</div>
      <p class="error-details">
        ${it.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return f`
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
    `}};Fe.MESSAGE_EMPTY_QUERY=k('To begin searching, enter a search term in the box above and hit "Go".');Fe.MESSAGE_NO_SEARCH_RESULTS=k("Your search did not match any items in the Archive. Try different keywords or a more general search.");Fe.MESSAGE_NO_COLLECTION_RESULTS=k("Your search did not match any items in this collection. Try different keywords or a more general search.");Fe.MESSAGE_NO_VIEWABLE_MEMBERS=k("This collection contains no viewable items.");Fe.MESSAGE_QUERY_ERROR=k(h`The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `);Fe.MESSAGE_COLLECTION_ERROR=k(h`The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`);Fe.QUERY_ERROR_DETAILS_MESSAGE=k("Error details:");n([c({type:String})],Fe.prototype,"placeholderType",void 0);n([c({type:Boolean})],Fe.prototype,"isMobileView",void 0);n([c({type:Boolean})],Fe.prototype,"isCollection",void 0);n([c({type:String})],Fe.prototype,"detailMessage",void 0);Fe=it=n([R("empty-placeholder")],Fe);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=r=>r??ee,Bn=N`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;var Yr;(function(r){r[r.bytes=0]="bytes",r[r.kilobytes=1]="kilobytes",r[r.megabytes=2]="megabytes",r[r.gigabytes=3]="gigabytes",r[r.terabytes=4]="terabytes",r[r.petabytes=5]="petabytes",r[r.exabytes=6]="exabytes",r[r.zettabytes=7]="zettabytes",r[r.yottabytes=8]="yottabytes"})(Yr||(Yr={}));function Rd(r,e,t=" "){let i=r;if(i===void 0)return b;let o=0;for(;i>1024;)i/=1024,o+=1;const s=10**e;i=Math.round(i*s)/s;let a=Yr[o];return a=i===1?a.slice(0,-1):a,`${i.toLocaleString()+t+a}`}const Od=f`var(--tileBackgroundColor, #ffffff)`,Id=f`var(--tileCornerRadius, 4px)`,qo=f`
  /* Include .sr-only styles for all tiles */
  ${at}

  .container {
    background-color: ${Od};
    border: 1px #2c2c2c;
    border-radius: ${Id};
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
`;function Pn(r,e="short",{locale:t="en-US",useLocalTime:i=!1}={}){if(!r)return"";const o=i?{}:{timeZone:"UTC"};switch(e){case"year-only":return`${r.getUTCFullYear()}`;case"short":o.month="short",o.year="numeric";break;case"long":o.year="numeric",o.month="short",o.day="2-digit";break}return new Intl.DateTimeFormat(t,o).format(r)}class Ta{constructor(e={}){var t;this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=(t=e.collectionPagePath)!==null&&t!==void 0?t:"/details/",this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){var e,t;let i;if(this.creatorFilter&&(!((e=this.model)===null||e===void 0)&&e.creators.length)){const o=this.creatorFilter;i=this.model.creators.find(s=>s.normalize("NFD").replace(/[^A-Z]+/gi,"").toUpperCase().startsWith(o))}return i??((t=this.model)===null||t===void 0?void 0:t.creator)}get accountLabel(){var e;return!((e=this.model)===null||e===void 0)&&e.dateAdded?k(ot`Archivist since ${this.model.dateAdded.getFullYear()}`):""}get dateLabel(){var e;switch((e=this.sortParam)===null||e===void 0?void 0:e.field){case"publicdate":return k("Archived");case"reviewdate":return k("Reviewed");case"addeddate":return k("Added");case"date":return k("Published");default:return""}}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return b;const i=t?this.collectionPagePath:"/details/";return`${this.baseNavigationUrl}${i}${e}`}webArchivesCaptureLink(e,t){const o=`https://web.archive.org/web/${t.toISOString().replace(/[TZ:-]/g,"").replace(/\..*/,"")}/${encodeURIComponent(e)}`,s=Pn(t,"long");return h` <a href=${o}> ${s} </a> `}}class de extends P{constructor(){super(...arguments),this.sortParam=null,this.defaultSortParam=null,this.loggedIn=!1,this.suppressBlurring=!1,this.useLocalTime=!1,this.displayValueProvider=new Ta}willUpdate(e){var t,i;(e.has("model")||e.has("baseNavigationUrl")||e.has("collectionPagePath")||e.has("sortParam")||e.has("defaultSortParam")||e.has("creatorFilter"))&&(this.displayValueProvider=new Ta({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:(i=(t=this.sortParam)!==null&&t!==void 0?t:this.defaultSortParam)!==null&&i!==void 0?i:void 0,creatorFilter:this.creatorFilter}))}getFormattedDate(e,t){const{useLocalTime:i}=this;return Pn(e,t,{useLocalTime:i})}}n([c({type:Object})],de.prototype,"model",void 0);n([c({type:Number})],de.prototype,"currentWidth",void 0);n([c({type:Number})],de.prototype,"currentHeight",void 0);n([c({type:String})],de.prototype,"baseNavigationUrl",void 0);n([c({type:String})],de.prototype,"baseImageUrl",void 0);n([c({type:String})],de.prototype,"collectionPagePath",void 0);n([c({type:Object})],de.prototype,"sortParam",void 0);n([c({type:Object})],de.prototype,"defaultSortParam",void 0);n([c({type:String})],de.prototype,"creatorFilter",void 0);n([c({type:Number})],de.prototype,"mobileBreakpoint",void 0);n([c({type:Boolean})],de.prototype,"loggedIn",void 0);n([c({type:Boolean})],de.prototype,"suppressBlurring",void 0);n([c({type:Boolean})],de.prototype,"useLocalTime",void 0);let Qr=class extends P{render(){return h`<div class="icon-overlay">${this.iconTemplate}</div>`}get iconTemplate(){var e;return this.type?h`${(e=kn[this.type])!==null&&e!==void 0?e:b}`:b}static get styles(){return f`
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
    `}};n([c({type:String})],Qr.prototype,"type",void 0);Qr=n([R("icon-overlay")],Qr);let Kr=class extends P{render(){return h`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `}get iconTemplate(){var e;return this.type?h`${(e=kn[this.type])!==null&&e!==void 0?e:b}`:b}get textTemplate(){var e;return this.type?h`${(e=gd[this.type])!==null&&e!==void 0?e:b}`:b}static get styles(){return f`
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
    `}};n([c({type:String})],Kr.prototype,"type",void 0);Kr=n([R("text-overlay")],Kr);let ut=class extends P{constructor(){super(...arguments),this.isCompactTile=!1,this.isListTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.viewSize="desktop"}render(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?h`
      <div class=${je(this.baseClass)}>
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
    `:b}get baseClass(){var e,t;return{container:!0,list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:((e=this.model)===null||e===void 0?void 0:e.mediatype)==="collection",[this.viewSize]:!0,"search-image":((t=this.model)===null||t===void 0?void 0:t.mediatype)==="search"}}get iconOverlayTemplate(){if(!this.isListTile)return b;const{overlayType:e}=this;return e?h`
      <icon-overlay
        class=${this.isCompactTile?"list-compact":"list-detail"}
        .type=${this.overlayType}
      >
      </icon-overlay>
    `:b}get textOverlayTemplate(){if(this.isListTile)return b;const{overlayType:e}=this;return e?h` <text-overlay .type=${this.overlayType}></text-overlay> `:b}get overlayType(){var e,t;if(!this.suppressBlurring){if(!((e=this.model)===null||e===void 0)&&e.loginRequired&&!this.loggedIn)return"login-required";if(!((t=this.model)===null||t===void 0)&&t.contentWarning)return"content-warning"}}static get styles(){const e=f`var(--imageBlockBackgroundColor, #f1f1f4)`;return f`
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
    `}};n([c({type:String})],ut.prototype,"baseImageUrl",void 0);n([c({type:Boolean})],ut.prototype,"isCompactTile",void 0);n([c({type:Boolean})],ut.prototype,"isListTile",void 0);n([c({type:Boolean})],ut.prototype,"loggedIn",void 0);n([c({type:Boolean})],ut.prototype,"suppressBlurring",void 0);n([c({type:Object})],ut.prototype,"model",void 0);n([c({type:String})],ut.prototype,"viewSize",void 0);ut=n([R("image-block")],ut);let Xr=class extends de{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
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
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){var e;return h`<div id="title">
      <h3 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.title}</h3>
    </div>`}get getTileStatsTemplate(){return h`
      <div id="item-stats">
        <div id="item-mediatype">${Bn}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.itemCount)===null||t===void 0?void 0:t.toLocaleString();return h`<span id="item-count"
      >${i} item${Number(i)!==1?"s":""}</span
    >`}get getSizeTemplate(){var e,t;const i=(t=(e=this.model)===null||e===void 0?void 0:e.collectionSize)!==null&&t!==void 0?t:0;return i?h`<span id="item-size">${Rd(i,1)}</span>`:""}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${k("More info")}</span>
        </button>`:b}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=f`var(--tileBorderColor, #555555)`,t=f`var(--tileBackgroundColor, #666666)`,i=f`#fff`;return[qo,f`
        .container {
          background-color: ${t};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
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
      `]}};n([c({type:Boolean})],Xr.prototype,"showInfoButton",void 0);Xr=n([R("collection-tile")],Xr);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*Pt(r,e){if(r!==void 0){let t=0;for(const i of r)yield e(i,t++)}}function ks(r){return r?r.toISOString().endsWith("-01-01T00:00:00.000Z"):!1}const Rn=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
  </svg>
`,Nd=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m69.0481858 61.4006179 13.2757509 38.38311-32.1794134-24.4730516-32.2508245 24.6893237 13.2757507-38.4552008-31.1694495-21.9945074 38.1677832-.5115002 11.8339172-39.0387916 11.6162817 38.8946104 38.3820179.6556814zm-2.8122554 15.58874-6.7092871-19.2276004 18.0365221-11.7267421-21.6445066.5115-5.9169584-19.5914862-5.9169587 19.5914862-21.6445064-.5115 18.036522 11.7267421-6.5664638 19.3752146 16.0880061-12.3824233z"
    />
  </svg>
`;let hi=class extends P{constructor(){super(...arguments),this.title="",this.body="",this.starRating=0,this.viewSize="desktop"}render(){return!this.title&&!this.body&&!this.starRating?b:h`
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
    `}get filledStarTemplate(){return h`<span aria-hidden="true">${Rn}</span>`}get unfilledStarTemplate(){return h`
      <span class="unfilled-star" aria-hidden="true">
        ${Nd}
      </span>
    `}static get styles(){return[at,f`
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
      `]}};n([c({type:String})],hi.prototype,"title",void 0);n([c({type:String})],hi.prototype,"body",void 0);n([c({type:Number})],hi.prototype,"starRating",void 0);n([c({type:String})],hi.prototype,"viewSize",void 0);hi=n([R("review-block")],hi);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function*go(r,e){const t=typeof e=="function";if(r!==void 0){let i=-1;for(const o of r)i>-1&&(yield t?e(i):e),i++,yield o}}let Lo=class extends P{constructor(){super(...arguments),this.snippets=[],this.viewSize="desktop"}render(){var e;return!((e=this.snippets)===null||e===void 0)&&e.length?h`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:h`${b}`}get ellipsisJoinedSnippets(){return h`
      &hellip; ${go(this.snippetTemplates,h` &hellip; `)} &hellip;
    `}get snippetTemplates(){var e;return(e=this.snippets)===null||e===void 0?void 0:e.map(t=>{const i=t.matchAll(/{{{(.+?)}}}/gs),o=[];let s=0;for(const a of i)a.index!=null&&(o.push(h`
            ${t.slice(s,a.index)}
            <mark>${a[1]}</mark>
          `),s=a.index+a[0].length);return o.push(h`${t.slice(s)}`),h`<span>${o}</span>`})}static get styles(){return f`
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
    `}};n([c({type:Array})],Lo.prototype,"snippets",void 0);n([c({type:String})],Lo.prototype,"viewSize",void 0);Lo=n([R("text-snippet-block")],Lo);const Ud=f`
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
`,Hd=f`
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
`,On=N`
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
`;let Ye=class extends P{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.isWaveform=!1,this.isNotFound=!1}render(){return h`
      <div class=${je(this.itemBaseClass)}>${this.imageTemplate}</div>
    `}get imageTemplate(){var e;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="search"?h`${On}`:h`
      <img
        class=${je(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `}get imageSrc(){var e,t,i;if(this.isNotFound)return this.notFoundSrc;if(!((e=this.model)===null||e===void 0)&&e.captureDates&&this.model.identifier)try{const o=new URL(this.model.identifier),s=encodeURIComponent(o.hostname);return this.baseImageUrl?`https://web.archive.org/thumb/${s}?generate=1`:b}catch{return`${this.baseImageUrl}/images/notfound.png`}return!((t=this.model)===null||t===void 0)&&t.thumbnailUrl?this.model.thumbnailUrl:this.baseImageUrl&&(!((i=this.model)===null||i===void 0)&&i.identifier)?`${this.baseImageUrl}/services/img/${this.model.identifier}`:b}get notFoundSrc(){return this.baseImageUrl?`${this.baseImageUrl}/images/notfound.png`:b}get hashBasedGradient(){var e;return!((e=this.model)===null||e===void 0)&&e.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(e){return e.split("").reduce((t,i)=>t+i.charCodeAt(0),0)}get itemBaseClass(){var e;return{"drop-shadow":!0,"list-box":this.isListTile,"search-image":((e=this.model)===null||e===void 0?void 0:e.mediatype)==="search",[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){var e,t,i;const s=!!(!((e=this.model)===null||e===void 0)&&e.contentWarning||!((t=this.model)===null||t===void 0)&&t.loginRequired)&&!this.suppressBlurring;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:s,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":((i=this.model)===null||i===void 0?void 0:i.mediatype)==="collection"}}get isAccountImage(){var e;return((e=this.model)===null||e===void 0?void 0:e.mediatype)==="account"&&!this.isCompactTile&&!this.isListTile}onLoad(){var e,t;(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"||((t=this.model)===null||t===void 0?void 0:t.mediatype)==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}onError(){this.isNotFound=!0}static get styles(){return[Ud,Hd,f`
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
      `]}};n([c({type:Object})],Ye.prototype,"model",void 0);n([c({type:String})],Ye.prototype,"baseImageUrl",void 0);n([c({type:Boolean})],Ye.prototype,"isListTile",void 0);n([c({type:Boolean})],Ye.prototype,"isCompactTile",void 0);n([c({type:Boolean})],Ye.prototype,"loggedIn",void 0);n([c({type:Boolean})],Ye.prototype,"suppressBlurring",void 0);n([F()],Ye.prototype,"isWaveform",void 0);n([F()],Ye.prototype,"isNotFound",void 0);n([H("img")],Ye.prototype,"baseImage",void 0);Ye=n([R("item-image")],Ye);const Vd=N`
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
`,Wd=N`
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
`,jd=N`
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
`,qd=N`
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
`,Gd=N`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Ea=N`
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
`,Yd=N`
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
`,Qd=N`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Kd=N`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Xd=N`
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
`,Zd=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m38.4615385 55.5197275-4.8171501 7.0895871c4.1025641 2.9421734 8.9186633 4.7253407 14.4482976 5.3495018v13.0411836h5.6179067v-12.9749847c3.8356452-.357264 6.8905002-1.5278287 9.1645649-3.5116942 2.2740648-1.9838655 3.4110971-4.5582672 3.4110971-7.7232052v-.0661989c0-3.2553047-1.025641-5.7635075-3.076923-7.5246085-2.0512821-1.7611009-5.3068517-3.1544302-9.7667087-4.1799878v-6.2195444c2.6754939.6682937 5.083018 1.7379839 7.2225725 3.2090706l4.4136191-7.1557861c-3.2114333-2.2738797-6.9798234-3.6787675-11.3051702-4.2146634v-11.6383974h-5.5517024v11.5028473c-4.0584279.3131313-7.2026061 1.4721374-9.4325347 3.4770185-2.2299285 2.004881-3.3448928 4.5908413-3.3448928 7.7578808v.1323978c0 3.2111721 1.0372005 5.6857501 3.1116015 7.423734 2.074401 1.7379838 5.3625473 3.1197546 9.8644389 4.1453122v6.4212934c-3.1651955-.4896617-6.4869694-1.9386821-9.9653216-4.3470612zm-24.4136192-32.7716087c-4.32534679 3.7008338-7.74800337 8.0142702-10.26796974 12.9403091s-3.77994956 10.1536506-3.77994956 15.6828351c0 4.9050234 1.02564103 9.6093485 3.07692308 14.1129754 2.05128205 4.5036268 4.88335435 8.5606738 8.49621692 12.1711409.357293.3572639 1.1149642.6252118 2.2730138.8038438s2.2057588-.0220663 3.1431274-.6020948c.5800757-.4896617.8701135-1.1138228.8701135-1.8724832s-.1229508-1.3828215-.3688525-1.8724832c-.2459016-.4896617-.5023119-.8689919-.7692307-1.1379907-6.5111392-6.3761101-9.76670873-13.5770795-9.76670873-21.6029082 0-4.6822589 1.1034048-9.0850112 3.31021443-13.2082571 2.2068095-4.1232459 5.2059688-7.6570063 8.9974779-10.6012813.0882724-.0882652.1775956-.1880889.2679697-.2994712s.2574611-.3562131.5012611-.7344926c.2437999-.3782794.4224464-.7460511.5359394-1.103315.1134931-.3572639.1250526-.770219.0346785-1.2388652s-.3131568-.8816012-.6683481-1.2388651c-.668348-.6682937-1.4932745-1.0245068-2.4747793-1.0686394s-1.8064313.0893159-2.4747793.4003457zm71.9041614 0c4.3253468 3.7008338 7.7480034 8.0142702 10.2679697 12.9403091 2.5199664 4.9260389 3.7799496 10.1536506 3.7799496 15.6828351 0 4.8608908-1.025641 9.5536573-3.0769231 14.0782997-2.051282 4.5246424-4.8602354 8.593248-8.42686 12.2058166-.4014292.3572639-1.1822194.6252118-2.3423707.8038438-1.1601514.178632-2.1857924-.0220663-3.0769231-.6020948-.5800757-.4896617-.8806221-1.1138228-.9016394-1.8724832-.0210172-.7586604.0903741-1.3828215.3341741-1.8724832.2437999-.4896617.5002101-.8689919.7692307-1.1379907 6.4649012-6.3319775 9.6973519-13.5329469 9.6973519-21.6029082 0-4.6822589-1.1034048-9.0850112-3.3102144-13.2082571s-5.18285-7.6570063-8.9281211-10.6012813c-.0882724-.0882652-.1775956-.1880889-.2679697-.2994712s-.2574611-.3562131-.5012611-.7344926c-.2437999-.3782794-.4224464-.7460511-.5359394-1.103315-.1134931-.3572639-.1250526-.770219-.0346785-1.2388652s.3131568-.8816012.6683481-1.2388651c.668348-.6682937 1.4932745-1.0245068 2.4747793-1.0686394s1.7843632.0893159 2.408575.4003457zm-62.2730139 8.0920276c-3.1210592 2.4525117-5.6179066 5.4840011-7.4905422 9.0944682s-2.8089534 7.4447495-2.8089534 11.5028473c0 6.2878449 2.2068096 11.9725442 6.6204288 17.054098.1786465.3131313.858554.469697 2.0397226.469697 1.1811685 0 2.1290458-.2900143 2.8436318-.8700427.5359394-.4896618.8259773-1.1253814.8701134-1.9071589.0441362-.7817775-.045187-1.2167988-.2679697-1.305064-1.6939891-1.7842181-3.1094998-3.9582741-4.2465321-6.522168-1.1370324-2.563894-1.7055486-5.0720968-1.7055486-7.5246085 0-3.34357.7471627-6.3424853 2.241488-8.996746 1.4943254-2.6542607 3.5571669-4.7390008 6.1885246-6.2542201.0441362-.0441326.1113914-.12189.2017655-.2332723s.2238335-.3341468.4003783-.6682937c.1765447-.3341468.2994956-.6577859.3688524-.9709172.0693569-.3131313.0472888-.7029693-.0662043-1.1695139-.113493-.4665447-.3478352-.901566-.7030264-1.3050641-.4897016-.5358959-1.102354-.8364179-1.8379572-.901566s-1.3482555-.009457-1.8379571.1670734zm52.5063052 0c3.1651955 2.4966443 5.6956705 5.5396923 7.591425 9.1291438 1.8957545 3.5894516 2.8436318 7.4132262 2.8436318 11.471324 0 6.2416107-2.2519967 11.9263101-6.75599 17.054098-.1345103.3131313-.7923497.469697-1.9735182.469697-1.1811686 0-2.1290459-.2900142-2.8436318-.8700427-.5359395-.4896617-.8259773-1.1253813-.8701135-1.9071589-.0441362-.7817775.045187-1.2167988.2679697-1.305064 1.6498529-1.8283506 3.0432955-4.0244729 4.1803279-6.5883669s1.7055485-5.0500305 1.7055485-7.4584096c0-3.3435699-.7356032-6.3309267-2.2068095-8.9620704-1.4712064-2.6311436-3.5004204-4.7263914-6.0876419-6.2857433l-.2332913-.2332723s-.1450189-.2227646-.4350568-.6682937c-.2900378-.4455291-.4129886-.7691682-.3688524-.9709172.0441362-.2017491.0662043-.591587.0662043-1.169514 0-.5779269.2343421-1.0129482.7030265-1.305064.4897015-.5358959 1.1023539-.8364179 1.8379571-.901566.7356032-.0651482 1.3482555-.009457 1.8379571.1670734zm-31.3682219 10.2324588v-.0661989c0-1.605586 1.2263556-2.497695 3.6790668-2.676327v5.7529998c-1.4270702-.4013965-2.3970156-.8248593-2.9098361-1.2703884-.5128205-.4455292-.7692307-1.0255576-.7692307-1.7400855zm12.1721311 16.3196055v.0661989c0 1.5614535-1.2042875 2.4756288-3.6128625 2.7425259v-5.8853976c1.382934.4013965 2.3308112.8248594 2.8436317 1.2703885.5128206.4455291.7692308 1.0476239.7692308 1.8062843z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Jd=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m53.8329111 72.530691-28.3707393-20.2314977c-1.2950216-.9306676-2.0122823-2.1279084-2.1517819-3.5917222-.1394997-1.4638139.1499621-2.9054133.8683852-4.3247984.7184232-1.419385 1.5275211-2.780311 2.4272938-4.0827779.8997726-1.302467 1.7204955-2.3488835 2.4621686-3.1392494l1.178772-1.1855489 20.6040968 16.1873027 36.4861309-43.88284817 3.885065-3.27955103c2.311044 1.53396469 4.1722017 3.06909856 5.5834731 4.60540161 1.4112713 1.53630309 2.2901191 2.86215359 2.6365432 3.97755169.3464241 1.1153982.5312611 2.1150474.5545111 2.9989478.0232494.8839004-.0813748 1.5351339-.3138742 1.9537004l-.4150115.6980007zm15.0520112 11.0943528v-5.022799c-.0464999-.1403016-.0813748-.2911259-.1046247-.4524728-.02325-.1613469-.0464999-.486379-.0697498-.9750964-.02325-.4887175.0116249-.8020578.1046247-.9400211.0464999-.1870689.2197119-.4898866.5196361-.9084532.2999243-.4185666.589386-.7903659.8683853-1.1153981l.4150114-.4875482 9.5731628-11.1645037v32.4412487h-80.1913681v-80.6524027h68.1874241l-7.1458691 8.5829534c-1.0183473 1.5807319-1.8041953 2.5113995-2.3575439 2.7920028h-47.3775653v57.9059979h57.574989z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,ec=N`
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
`,tc=N`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,ic=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,In={account:{color:"#000000",icon:Vd,text:"Account"},audio:{color:"#00adef",icon:Wd,text:"Audio"},collection:{color:"#4666ff",icon:Bn,text:"Collection"},data:{color:"#333333",icon:jd,text:"Data"},etree:{color:"#00adef",icon:qd,text:"E-tree"},film:{color:"#bf1b2c",icon:Ea,text:"Film"},image:{color:"#aa99c9",icon:Gd,text:"Image"},movies:{color:"#f1644b",icon:Ea,text:"Movie"},none:{color:"#00000000",icon:h``,text:""},radio:{color:"#8fdaef",icon:Yd,text:"Radio"},software:{color:"#9ecc4f",icon:Qd,text:"Software"},texts:{color:"#faab3c",icon:Kd,text:"Text"},tv:{color:"#f1644b",icon:Xd,text:"TV"},tvCommercial:{color:"#84b648",icon:Zd,text:"TV Commercial"},tvFactCheck:{color:"#f1644b",icon:Jd,text:"TV Fact Check"},tvQuote:{color:"#fe7a5f",icon:ic,text:"TV Quote"},video:{color:"#f1644b",icon:ec,text:"Video"},web:{color:"#ffcd27",icon:tc,text:"Web"},search:{color:"#000000",icon:On,text:"Search"}},oc="tv_ads",rc="factchecked",sc=new Set(["tvnews","tvarchive","television"]),ac=new Set(["radio","radioprogram"]);let zo=class extends P{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){var e,t;return this.isTvItem?this.tvDisplayMediatype:this.isRadioItem?"radio":(t=(e=this.model)===null||e===void 0?void 0:e.mediatype)!==null&&t!==void 0?t:"none"}get tvDisplayMediatype(){var e,t;return this.isTvCommercial?"tvCommercial":!((e=this.model)===null||e===void 0)&&e.isTvSearchResult&&this.isTvFactCheck?"tvFactCheck":!((t=this.model)===null||t===void 0)&&t.isTvSearchResult&&this.isTvQuote?"tvQuote":"tv"}get isTvItem(){var e,t;return!!(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="movies"&&(!((t=this.model)===null||t===void 0)&&t.collections.some(i=>sc.has(i))))}get isTvCommercial(){var e,t,i;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.adIds)===null||t===void 0)&&t.length||!((i=this.model)===null||i===void 0)&&i.collections.includes(oc))}get isTvFactCheck(){var e,t,i;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.factChecks)===null||t===void 0)&&t.length||!((i=this.model)===null||i===void 0)&&i.collections.includes(rc))}get isTvQuote(){var e;return!!(!((e=this.model)===null||e===void 0)&&e.isClip)}get isRadioItem(){var e,t;return!!(((e=this.model)===null||e===void 0?void 0:e.mediatype)==="audio"&&(!((t=this.model)===null||t===void 0)&&t.collections.some(i=>ac.has(i))))}render(){const e=In[this.displayMediatype];return e?h`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        title="${e.text}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:h``}static get styles(){return f`
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
    `}};n([c({type:Object})],zo.prototype,"model",void 0);n([c({type:Boolean})],zo.prototype,"showText",void 0);zo=n([R("tile-mediatype-icon")],zo);const nc=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,lc=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,dc=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`,cc=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"/>
  </svg>
`;function hc(r,e){let t=1;return r>=1e9?t=1e9:r>=1e6?t=1e6:r>=1e3&&e==="short"&&(t=1e3),t}function pc(r=0,e){const t=r/e,i=t<10;let o=0;return i?o=Math.round((t+Number.EPSILON)*10)/10:o=Math.round(t),o}function uc(r,e,t,i){switch(e){case 1e9:return k(t==="short"?ot`${r}B`:ot`${r} billion`);case 1e6:return k(t==="short"?ot`${r}M`:ot`${r} million`);case 1e3:return k(t==="short"?ot`${r}K`:ot`${r} thousand`);default:return new Intl.NumberFormat(i).format(r)}}function Ts(r,e="long",t="short",i="en-US"){const o=r??-1;if(o<0)return"";const s=hc(o,e),a=pc(o,s);return uc(a,s,t,i)}let Qe=class extends P{constructor(){super(...arguments),this.showTvClips=!1}render(){return h`
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
    `}get mediatypeIconColumnTemplate(){return h`
      <li class="col">
        <p class="sr-only">${k("Mediatype:")}</p>
        <tile-mediatype-icon .model=${this.model}></tile-mediatype-icon>
      </li>
    `}columnTemplate(e,t,i,o=[]){const s=Ts(e??0,"short","short"),a=k(ot`${s} ${t}`),l=t+":";return h`
      <li class="col ${o.join(" ")}" title=${a}>
        ${i}
        <p class="status-text">
          <span class="sr-only">${l}</span>
          ${s}
        </p>
      </li>
    `}get viewsColumnTemplate(){var e;const t=(e=this.viewLabel)!==null&&e!==void 0?e:k("all-time views");return this.columnTemplate(this.viewCount,t,dc)}get uploadsColumnTemplate(){return this.columnTemplate(this.itemCount,k("uploads"),lc)}get favoritesColumnTemplate(){return this.columnTemplate(this.favCount,k("favorites"),Rn)}get reviewsColumnTemplate(){return this.columnTemplate(this.commentCount,k("reviews"),nc,["reviews"])}get tvClipsColumnTemplate(){return this.columnTemplate(this.tvClipCount,k("clips"),cc)}static get styles(){return[at,f`
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
      `]}};n([c({type:Object})],Qe.prototype,"model",void 0);n([c({type:String})],Qe.prototype,"mediatype",void 0);n([c({type:Number})],Qe.prototype,"itemCount",void 0);n([c({type:Number})],Qe.prototype,"viewCount",void 0);n([c({type:String})],Qe.prototype,"viewLabel",void 0);n([c({type:Number})],Qe.prototype,"favCount",void 0);n([c({type:Number})],Qe.prototype,"commentCount",void 0);n([c({type:Boolean})],Qe.prototype,"showTvClips",void 0);n([c({type:Number})],Qe.prototype,"tvClipCount",void 0);Qe=n([R("tile-stats")],Qe);let Xi=class extends de{constructor(){super(...arguments),this.showInfoButton=!1,this.showTvClips=!1,this.simpleLayoutType="none"}render(){var e;const t=(e=this.model)===null||e===void 0?void 0:e.title,i=je({container:!0,simple:this.simpleLayoutType!=="none","stats-only":this.simpleLayoutType==="stats-only","snippets-only":this.simpleLayoutType==="snippets-only"});return h`
      <div class=${i}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h3 class="truncated" title=${Ee(t)}>
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
        .suppressBlurring=${this.suppressBlurring}
        .isCompactTile=${!1}
        .isListTile=${!1}
        .viewSize=${"grid"}
      >
      </image-block>
    `}get sortedDateInfoTemplate(){var e,t,i,o,s;let a,l="long";switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"date":{const u=(t=this.model)===null||t===void 0?void 0:t.datePublished;a={field:"published",value:u},ks(u)&&(l="year-only");break}case"reviewdate":a={field:"reviewed",value:(i=this.model)===null||i===void 0?void 0:i.dateReviewed};break;case"addeddate":a={field:"added",value:(o=this.model)===null||o===void 0?void 0:o.dateAdded};break;case"publicdate":a={field:"archived",value:(s=this.model)===null||s===void 0?void 0:s.dateArchived};break}if(!(a!=null&&a.value))return b;const d=this.getFormattedDate(a.value,l);return h`
      <div class="date-sorted-by truncated">
        <span>${a.field} ${d}</span>
      </div>
    `}get infoButtonTemplate(){return this.showInfoButton?h`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${k("More info")}</span>
        </button>`:b}get reviewBlockTemplate(){var e;if(!(!((e=this.model)===null||e===void 0)&&e.review))return b;const{reviewtitle:t,reviewbody:i,stars:o}=this.model.review;return h`
      <review-block
        viewsize="grid"
        title=${Ee(t)}
        body=${Ee(i)}
        starRating=${Ee(o)}
      >
      </review-block>
    `}get textSnippetsTemplate(){var e;return!this.hasSnippets||this.simpleLayoutType==="stats-only"?b:h`
      <text-snippet-block viewsize="grid" .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}>
      </text-snippet-block>
    `}get volumeIssueTemplate(){var e,t,i,o;return!(!((e=this.model)===null||e===void 0)&&e.volume)||!(!((t=this.model)===null||t===void 0)&&t.issue)?b:h`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${(i=this.model)===null||i===void 0?void 0:i.volume}, Issue&nbsp;${(o=this.model)===null||o===void 0?void 0:o.issue}
        </span>
      </div>
    `}get webArchivesCaptureDatesTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.captureDates)||!this.model.title?b:h`
      <ul class="capture-dates">
        ${Pt(this.model.captureDates,t=>h`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,t)}
            </li>`)}
      </ul>
    `}get tileStatsTemplate(){var e,t,i,o,s,a,l;if(this.simpleLayoutType==="snippets-only")return b;const d=(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam,[u,p]=(d==null?void 0:d.field)==="week"?[(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount,"weekly views"]:[(i=this.model)===null||i===void 0?void 0:i.viewCount,"all-time views"];return h`
      <tile-stats
        .model=${this.model}
        .mediatype=${(o=this.model)===null||o===void 0?void 0:o.mediatype}
        .viewCount=${u}
        .viewLabel=${p}
        .favCount=${(s=this.model)===null||s===void 0?void 0:s.favCount}
        .commentCount=${(a=this.model)===null||a===void 0?void 0:a.commentCount}
        .tvClipCount=${(l=this.model)===null||l===void 0?void 0:l.tvClipCount}
        .showTvClips=${this.showTvClips}
      >
      </tile-stats>
    `}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.effectiveSort)===null||e===void 0?void 0:e.field)}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=f`var(--tileBorderColor, #dddddd)`;return[qo,f`
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
      `]}};n([c({type:Boolean})],Xi.prototype,"showInfoButton",void 0);n([c({type:Boolean})],Xi.prototype,"showTvClips",void 0);n([c({type:String})],Xi.prototype,"simpleLayoutType",void 0);Xi=n([R("item-tile")],Xi);let Zr=class extends de{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
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
        .suppressBlurring=${this.suppressBlurring}
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
        </button>`:b}infoButtonPressed(e){e.preventDefault();const t=new CustomEvent("infoButtonPressed",{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){const e=f`var(--tileBorderColor, #dddddd)`;return[qo,f`
        .container {
          border: 1px solid ${e};
        }
      `]}};n([c({type:Boolean})],Zr.prototype,"showInfoButton",void 0);Zr=n([R("account-tile")],Zr);let Jr=class extends de{constructor(){super(...arguments),this.showInfoButton=!1}render(){return h`
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
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){var e;return h`<div id="title">
      <h3 class="truncated">${(e=this.model)===null||e===void 0?void 0:e.title}</h3>
    </div>`}static get styles(){const e=f`var(--tileBorderColor, #555555)`,t=f`var(--tileBackgroundColor, #666666)`,i=f`#fff`;return[qo,f`
        .container {
          background-color: ${t};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
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
      `]}};n([c({type:Boolean})],Jr.prototype,"showInfoButton",void 0);Jr=n([R("search-tile")],Jr);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class es extends wi{constructor(e){if(super(e),this.et=ee,e.type!==We.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===ee||e==null)return this.ft=void 0,this.et=e;if(e===De)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const t=[e];return t.raw=t,this.ft={_$litType$:this.constructor.resultType,strings:t,values:[]}}}es.directiveName="unsafeHTML",es.resultType=1;const fc=yi(es);/*! @license DOMPurify 3.2.4 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.2.4/LICENSE */const{entries:Nn,setPrototypeOf:Ma,isFrozen:mc,getPrototypeOf:vc,getOwnPropertyDescriptor:gc}=Object;let{freeze:$e,seal:Re,create:Un}=Object,{apply:ts,construct:is}=typeof Reflect<"u"&&Reflect;$e||($e=function(e){return e});Re||(Re=function(e){return e});ts||(ts=function(e,t,i){return e.apply(t,i)});is||(is=function(e,t){return new e(...t)});const ho=_e(Array.prototype.forEach),bc=_e(Array.prototype.lastIndexOf),Aa=_e(Array.prototype.pop),Mi=_e(Array.prototype.push),yc=_e(Array.prototype.splice),bo=_e(String.prototype.toLowerCase),vr=_e(String.prototype.toString),Da=_e(String.prototype.match),Ai=_e(String.prototype.replace),wc=_e(String.prototype.indexOf),Sc=_e(String.prototype.trim),Ue=_e(Object.prototype.hasOwnProperty),Se=_e(RegExp.prototype.test),Di=xc(TypeError);function _e(r){return function(e){for(var t=arguments.length,i=new Array(t>1?t-1:0),o=1;o<t;o++)i[o-1]=arguments[o];return ts(r,e,i)}}function xc(r){return function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];return is(r,t)}}function U(r,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:bo;Ma&&Ma(r,null);let i=e.length;for(;i--;){let o=e[i];if(typeof o=="string"){const s=t(o);s!==o&&(mc(e)||(e[i]=s),o=s)}r[o]=!0}return r}function $c(r){for(let e=0;e<r.length;e++)Ue(r,e)||(r[e]=null);return r}function Dt(r){const e=Un(null);for(const[t,i]of Nn(r))Ue(r,t)&&(Array.isArray(i)?e[t]=$c(i):i&&typeof i=="object"&&i.constructor===Object?e[t]=Dt(i):e[t]=i);return e}function Fi(r,e){for(;r!==null;){const i=gc(r,e);if(i){if(i.get)return _e(i.get);if(typeof i.value=="function")return _e(i.value)}r=vc(r)}function t(){return null}return t}const Fa=$e(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),gr=$e(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),br=$e(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),_c=$e(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),yr=$e(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),Cc=$e(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),La=$e(["#text"]),za=$e(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),wr=$e(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Ba=$e(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),po=$e(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),kc=Re(/\{\{[\w\W]*|[\w\W]*\}\}/gm),Tc=Re(/<%[\w\W]*|[\w\W]*%>/gm),Ec=Re(/\$\{[\w\W]*/gm),Mc=Re(/^data-[\-\w.\u00B7-\uFFFF]+$/),Ac=Re(/^aria-[\-\w]+$/),Hn=Re(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Dc=Re(/^(?:\w+script|data):/i),Fc=Re(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Vn=Re(/^html$/i),Lc=Re(/^[a-z][.\w]*(-[.\w]+)+$/i);var Pa=Object.freeze({__proto__:null,ARIA_ATTR:Ac,ATTR_WHITESPACE:Fc,CUSTOM_ELEMENT:Lc,DATA_ATTR:Mc,DOCTYPE_NAME:Vn,ERB_EXPR:Tc,IS_ALLOWED_URI:Hn,IS_SCRIPT_OR_DATA:Dc,MUSTACHE_EXPR:kc,TMPLIT_EXPR:Ec});const Li={element:1,text:3,progressingInstruction:7,comment:8,document:9},zc=function(){return typeof window>"u"?null:window},Bc=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let i=null;const o="data-tt-policy-suffix";t&&t.hasAttribute(o)&&(i=t.getAttribute(o));const s="dompurify"+(i?"#"+i:"");try{return e.createPolicy(s,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+s+" could not be created."),null}},Ra=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function Wn(){let r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:zc();const e=z=>Wn(z);if(e.version="3.2.4",e.removed=[],!r||!r.document||r.document.nodeType!==Li.document||!r.Element)return e.isSupported=!1,e;let{document:t}=r;const i=t,o=i.currentScript,{DocumentFragment:s,HTMLTemplateElement:a,Node:l,Element:d,NodeFilter:u,NamedNodeMap:p=r.NamedNodeMap||r.MozNamedAttrMap,HTMLFormElement:m,DOMParser:v,trustedTypes:y}=r,x=d.prototype,S=Fi(x,"cloneNode"),C=Fi(x,"remove"),D=Fi(x,"nextSibling"),M=Fi(x,"childNodes"),A=Fi(x,"parentNode");if(typeof a=="function"){const z=t.createElement("template");z.content&&z.content.ownerDocument&&(t=z.content.ownerDocument)}let O,W="";const{implementation:ae,createNodeIterator:ze,createDocumentFragment:ge,getElementsByTagName:he}=t,{importNode:Ae}=i;let Q=Ra();e.isSupported=typeof Nn=="function"&&typeof A=="function"&&ae&&ae.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:Ze,ERB_EXPR:Je,TMPLIT_EXPR:K,DATA_ATTR:pe,ARIA_ATTR:Be,IS_SCRIPT_OR_DATA:xt,ATTR_WHITESPACE:Ht,CUSTOM_ELEMENT:Si}=Pa;let{IS_ALLOWED_URI:Vt}=Pa,oe=null;const Wt=U({},[...Fa,...gr,...br,...yr,...La]);let ne=null;const jt=U({},[...za,...wr,...Ba,...po]);let X=Object.seal(Un(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),nt=null,$t=null,qt=!0,_t=!0,xi=!1,Fs=!0,Gt=!1,Qo=!0,Ct=!1,Ko=!1,Xo=!1,Yt=!1,to=!1,io=!1,Ls=!0,zs=!1;const ol="user-content-";let Zo=!0,$i=!1,Qt={},Kt=null;const Bs=U({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let Ps=null;const Rs=U({},["audio","video","img","source","image","track"]);let Jo=null;const Os=U({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),oo="http://www.w3.org/1998/Math/MathML",ro="http://www.w3.org/2000/svg",lt="http://www.w3.org/1999/xhtml";let Xt=lt,er=!1,tr=null;const rl=U({},[oo,ro,lt],vr);let so=U({},["mi","mo","mn","ms","mtext"]),ao=U({},["annotation-xml"]);const sl=U({},["title","style","font","a","script"]);let _i=null;const al=["application/xhtml+xml","text/html"],nl="text/html";let fe=null,Zt=null;const ll=t.createElement("form"),Is=function(g){return g instanceof RegExp||g instanceof Function},ir=function(){let g=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(Zt&&Zt===g)){if((!g||typeof g!="object")&&(g={}),g=Dt(g),_i=al.indexOf(g.PARSER_MEDIA_TYPE)===-1?nl:g.PARSER_MEDIA_TYPE,fe=_i==="application/xhtml+xml"?vr:bo,oe=Ue(g,"ALLOWED_TAGS")?U({},g.ALLOWED_TAGS,fe):Wt,ne=Ue(g,"ALLOWED_ATTR")?U({},g.ALLOWED_ATTR,fe):jt,tr=Ue(g,"ALLOWED_NAMESPACES")?U({},g.ALLOWED_NAMESPACES,vr):rl,Jo=Ue(g,"ADD_URI_SAFE_ATTR")?U(Dt(Os),g.ADD_URI_SAFE_ATTR,fe):Os,Ps=Ue(g,"ADD_DATA_URI_TAGS")?U(Dt(Rs),g.ADD_DATA_URI_TAGS,fe):Rs,Kt=Ue(g,"FORBID_CONTENTS")?U({},g.FORBID_CONTENTS,fe):Bs,nt=Ue(g,"FORBID_TAGS")?U({},g.FORBID_TAGS,fe):{},$t=Ue(g,"FORBID_ATTR")?U({},g.FORBID_ATTR,fe):{},Qt=Ue(g,"USE_PROFILES")?g.USE_PROFILES:!1,qt=g.ALLOW_ARIA_ATTR!==!1,_t=g.ALLOW_DATA_ATTR!==!1,xi=g.ALLOW_UNKNOWN_PROTOCOLS||!1,Fs=g.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Gt=g.SAFE_FOR_TEMPLATES||!1,Qo=g.SAFE_FOR_XML!==!1,Ct=g.WHOLE_DOCUMENT||!1,Yt=g.RETURN_DOM||!1,to=g.RETURN_DOM_FRAGMENT||!1,io=g.RETURN_TRUSTED_TYPE||!1,Xo=g.FORCE_BODY||!1,Ls=g.SANITIZE_DOM!==!1,zs=g.SANITIZE_NAMED_PROPS||!1,Zo=g.KEEP_CONTENT!==!1,$i=g.IN_PLACE||!1,Vt=g.ALLOWED_URI_REGEXP||Hn,Xt=g.NAMESPACE||lt,so=g.MATHML_TEXT_INTEGRATION_POINTS||so,ao=g.HTML_INTEGRATION_POINTS||ao,X=g.CUSTOM_ELEMENT_HANDLING||{},g.CUSTOM_ELEMENT_HANDLING&&Is(g.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(X.tagNameCheck=g.CUSTOM_ELEMENT_HANDLING.tagNameCheck),g.CUSTOM_ELEMENT_HANDLING&&Is(g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(X.attributeNameCheck=g.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),g.CUSTOM_ELEMENT_HANDLING&&typeof g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(X.allowCustomizedBuiltInElements=g.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),Gt&&(_t=!1),to&&(Yt=!0),Qt&&(oe=U({},La),ne=[],Qt.html===!0&&(U(oe,Fa),U(ne,za)),Qt.svg===!0&&(U(oe,gr),U(ne,wr),U(ne,po)),Qt.svgFilters===!0&&(U(oe,br),U(ne,wr),U(ne,po)),Qt.mathMl===!0&&(U(oe,yr),U(ne,Ba),U(ne,po))),g.ADD_TAGS&&(oe===Wt&&(oe=Dt(oe)),U(oe,g.ADD_TAGS,fe)),g.ADD_ATTR&&(ne===jt&&(ne=Dt(ne)),U(ne,g.ADD_ATTR,fe)),g.ADD_URI_SAFE_ATTR&&U(Jo,g.ADD_URI_SAFE_ATTR,fe),g.FORBID_CONTENTS&&(Kt===Bs&&(Kt=Dt(Kt)),U(Kt,g.FORBID_CONTENTS,fe)),Zo&&(oe["#text"]=!0),Ct&&U(oe,["html","head","body"]),oe.table&&(U(oe,["tbody"]),delete nt.tbody),g.TRUSTED_TYPES_POLICY){if(typeof g.TRUSTED_TYPES_POLICY.createHTML!="function")throw Di('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof g.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw Di('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');O=g.TRUSTED_TYPES_POLICY,W=O.createHTML("")}else O===void 0&&(O=Bc(y,o)),O!==null&&typeof W=="string"&&(W=O.createHTML(""));$e&&$e(g),Zt=g}},Ns=U({},[...gr,...br,..._c]),Us=U({},[...yr,...Cc]),dl=function(g){let $=A(g);(!$||!$.tagName)&&($={namespaceURI:Xt,tagName:"template"});const L=bo(g.tagName),J=bo($.tagName);return tr[g.namespaceURI]?g.namespaceURI===ro?$.namespaceURI===lt?L==="svg":$.namespaceURI===oo?L==="svg"&&(J==="annotation-xml"||so[J]):!!Ns[L]:g.namespaceURI===oo?$.namespaceURI===lt?L==="math":$.namespaceURI===ro?L==="math"&&ao[J]:!!Us[L]:g.namespaceURI===lt?$.namespaceURI===ro&&!ao[J]||$.namespaceURI===oo&&!so[J]?!1:!Us[L]&&(sl[L]||!Ns[L]):!!(_i==="application/xhtml+xml"&&tr[g.namespaceURI]):!1},et=function(g){Mi(e.removed,{element:g});try{A(g).removeChild(g)}catch{C(g)}},no=function(g,$){try{Mi(e.removed,{attribute:$.getAttributeNode(g),from:$})}catch{Mi(e.removed,{attribute:null,from:$})}if($.removeAttribute(g),g==="is")if(Yt||to)try{et($)}catch{}else try{$.setAttribute(g,"")}catch{}},Hs=function(g){let $=null,L=null;if(Xo)g="<remove></remove>"+g;else{const me=Da(g,/^[\r\n\t ]+/);L=me&&me[0]}_i==="application/xhtml+xml"&&Xt===lt&&(g='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+g+"</body></html>");const J=O?O.createHTML(g):g;if(Xt===lt)try{$=new v().parseFromString(J,_i)}catch{}if(!$||!$.documentElement){$=ae.createDocument(Xt,"template",null);try{$.documentElement.innerHTML=er?W:J}catch{}}const be=$.body||$.documentElement;return g&&L&&be.insertBefore(t.createTextNode(L),be.childNodes[0]||null),Xt===lt?he.call($,Ct?"html":"body")[0]:Ct?$.documentElement:be},Vs=function(g){return ze.call(g.ownerDocument||g,g,u.SHOW_ELEMENT|u.SHOW_COMMENT|u.SHOW_TEXT|u.SHOW_PROCESSING_INSTRUCTION|u.SHOW_CDATA_SECTION,null)},or=function(g){return g instanceof m&&(typeof g.nodeName!="string"||typeof g.textContent!="string"||typeof g.removeChild!="function"||!(g.attributes instanceof p)||typeof g.removeAttribute!="function"||typeof g.setAttribute!="function"||typeof g.namespaceURI!="string"||typeof g.insertBefore!="function"||typeof g.hasChildNodes!="function")},Ws=function(g){return typeof l=="function"&&g instanceof l};function dt(z,g,$){ho(z,L=>{L.call(e,g,$,Zt)})}const js=function(g){let $=null;if(dt(Q.beforeSanitizeElements,g,null),or(g))return et(g),!0;const L=fe(g.nodeName);if(dt(Q.uponSanitizeElement,g,{tagName:L,allowedTags:oe}),g.hasChildNodes()&&!Ws(g.firstElementChild)&&Se(/<[/\w]/g,g.innerHTML)&&Se(/<[/\w]/g,g.textContent)||g.nodeType===Li.progressingInstruction||Qo&&g.nodeType===Li.comment&&Se(/<[/\w]/g,g.data))return et(g),!0;if(!oe[L]||nt[L]){if(!nt[L]&&Gs(L)&&(X.tagNameCheck instanceof RegExp&&Se(X.tagNameCheck,L)||X.tagNameCheck instanceof Function&&X.tagNameCheck(L)))return!1;if(Zo&&!Kt[L]){const J=A(g)||g.parentNode,be=M(g)||g.childNodes;if(be&&J){const me=be.length;for(let Te=me-1;Te>=0;--Te){const tt=S(be[Te],!0);tt.__removalCount=(g.__removalCount||0)+1,J.insertBefore(tt,D(g))}}}return et(g),!0}return g instanceof d&&!dl(g)||(L==="noscript"||L==="noembed"||L==="noframes")&&Se(/<\/no(script|embed|frames)/i,g.innerHTML)?(et(g),!0):(Gt&&g.nodeType===Li.text&&($=g.textContent,ho([Ze,Je,K],J=>{$=Ai($,J," ")}),g.textContent!==$&&(Mi(e.removed,{element:g.cloneNode()}),g.textContent=$)),dt(Q.afterSanitizeElements,g,null),!1)},qs=function(g,$,L){if(Ls&&($==="id"||$==="name")&&(L in t||L in ll))return!1;if(!(_t&&!$t[$]&&Se(pe,$))){if(!(qt&&Se(Be,$))){if(!ne[$]||$t[$]){if(!(Gs(g)&&(X.tagNameCheck instanceof RegExp&&Se(X.tagNameCheck,g)||X.tagNameCheck instanceof Function&&X.tagNameCheck(g))&&(X.attributeNameCheck instanceof RegExp&&Se(X.attributeNameCheck,$)||X.attributeNameCheck instanceof Function&&X.attributeNameCheck($))||$==="is"&&X.allowCustomizedBuiltInElements&&(X.tagNameCheck instanceof RegExp&&Se(X.tagNameCheck,L)||X.tagNameCheck instanceof Function&&X.tagNameCheck(L))))return!1}else if(!Jo[$]){if(!Se(Vt,Ai(L,Ht,""))){if(!(($==="src"||$==="xlink:href"||$==="href")&&g!=="script"&&wc(L,"data:")===0&&Ps[g])){if(!(xi&&!Se(xt,Ai(L,Ht,"")))){if(L)return!1}}}}}}return!0},Gs=function(g){return g!=="annotation-xml"&&Da(g,Si)},Ys=function(g){dt(Q.beforeSanitizeAttributes,g,null);const{attributes:$}=g;if(!$||or(g))return;const L={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:ne,forceKeepAttr:void 0};let J=$.length;for(;J--;){const be=$[J],{name:me,namespaceURI:Te,value:tt}=be,Ci=fe(me);let we=me==="value"?tt:Sc(tt);if(L.attrName=Ci,L.attrValue=we,L.keepAttr=!0,L.forceKeepAttr=void 0,dt(Q.uponSanitizeAttribute,g,L),we=L.attrValue,zs&&(Ci==="id"||Ci==="name")&&(no(me,g),we=ol+we),Qo&&Se(/((--!?|])>)|<\/(style|title)/i,we)){no(me,g);continue}if(L.forceKeepAttr||(no(me,g),!L.keepAttr))continue;if(!Fs&&Se(/\/>/i,we)){no(me,g);continue}Gt&&ho([Ze,Je,K],Ks=>{we=Ai(we,Ks," ")});const Qs=fe(g.nodeName);if(qs(Qs,Ci,we)){if(O&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!Te)switch(y.getAttributeType(Qs,Ci)){case"TrustedHTML":{we=O.createHTML(we);break}case"TrustedScriptURL":{we=O.createScriptURL(we);break}}try{Te?g.setAttributeNS(Te,me,we):g.setAttribute(me,we),or(g)?et(g):Aa(e.removed)}catch{}}}dt(Q.afterSanitizeAttributes,g,null)},cl=function z(g){let $=null;const L=Vs(g);for(dt(Q.beforeSanitizeShadowDOM,g,null);$=L.nextNode();)dt(Q.uponSanitizeShadowNode,$,null),js($),Ys($),$.content instanceof s&&z($.content);dt(Q.afterSanitizeShadowDOM,g,null)};return e.sanitize=function(z){let g=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},$=null,L=null,J=null,be=null;if(er=!z,er&&(z="<!-->"),typeof z!="string"&&!Ws(z))if(typeof z.toString=="function"){if(z=z.toString(),typeof z!="string")throw Di("dirty is not a string, aborting")}else throw Di("toString is not a function");if(!e.isSupported)return z;if(Ko||ir(g),e.removed=[],typeof z=="string"&&($i=!1),$i){if(z.nodeName){const tt=fe(z.nodeName);if(!oe[tt]||nt[tt])throw Di("root node is forbidden and cannot be sanitized in-place")}}else if(z instanceof l)$=Hs("<!---->"),L=$.ownerDocument.importNode(z,!0),L.nodeType===Li.element&&L.nodeName==="BODY"||L.nodeName==="HTML"?$=L:$.appendChild(L);else{if(!Yt&&!Gt&&!Ct&&z.indexOf("<")===-1)return O&&io?O.createHTML(z):z;if($=Hs(z),!$)return Yt?null:io?W:""}$&&Xo&&et($.firstChild);const me=Vs($i?z:$);for(;J=me.nextNode();)js(J),Ys(J),J.content instanceof s&&cl(J.content);if($i)return z;if(Yt){if(to)for(be=ge.call($.ownerDocument);$.firstChild;)be.appendChild($.firstChild);else be=$;return(ne.shadowroot||ne.shadowrootmode)&&(be=Ae.call(i,be,!0)),be}let Te=Ct?$.outerHTML:$.innerHTML;return Ct&&oe["!doctype"]&&$.ownerDocument&&$.ownerDocument.doctype&&$.ownerDocument.doctype.name&&Se(Vn,$.ownerDocument.doctype.name)&&(Te="<!DOCTYPE "+$.ownerDocument.doctype.name+`>
`+Te),Gt&&ho([Ze,Je,K],tt=>{Te=Ai(Te,tt," ")}),O&&io?O.createHTML(Te):Te},e.setConfig=function(){let z=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ir(z),Ko=!0},e.clearConfig=function(){Zt=null,Ko=!1},e.isValidAttribute=function(z,g,$){Zt||ir({});const L=fe(z),J=fe(g);return qs(L,J,$)},e.addHook=function(z,g){typeof g=="function"&&Mi(Q[z],g)},e.removeHook=function(z,g){if(g!==void 0){const $=bc(Q[z],g);return $===-1?void 0:yc(Q[z],$,1)[0]}return Aa(Q[z])},e.removeHooks=function(z){Q[z]=[]},e.removeAllHooks=function(){Q=Ra()},e}var yo=Wn();let Bo=class extends de{constructor(){super(...arguments),this.collectionLinks=[]}render(){return h`
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
    `}get imageBlockTemplate(){var e;if(!this.model)return b;const t=this.model.mediatype==="collection",i=this.displayValueProvider.itemPageUrl(this.model.identifier,t);return h`<a
      id="image-link"
      title=${k(ot`View ${(e=this.model)===null||e===void 0?void 0:e.title}`)}
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
    `}get iconRightTemplate(){var e;return h`
      <a
        id="icon-right"
        href=${this.mediatypeURL}
        title=${k(ot`See more: ${(e=this.model)===null||e===void 0?void 0:e.mediatype}`)}
      >
        <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
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
        ${go(Pt(this.model.creators,o=>this.searchLink("creator",o)),", ")}
      </div>
    `}get datePublishedTemplate(){var e;const t=(e=this.model)===null||e===void 0?void 0:e.datePublished;let i="long";return ks(t)&&(i="year-only"),this.metadataTemplate(this.getFormattedDate(t,i),k("Published"))}get dateSortByTemplate(){return this.effectiveSort&&(this.effectiveSort.field==="addeddate"||this.effectiveSort.field==="reviewdate"||this.effectiveSort.field==="publicdate")?this.metadataTemplate(this.getFormattedDate(this.date,"long"),this.displayValueProvider.dateLabel):b}get viewsTemplate(){var e,t,i,o;const s=((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount;return s==null?b:((o=this.model)===null||o===void 0?void 0:o.mediatype)==="search"?this.metadataTemplate("(Favorited search query)",""):this.metadataTemplate(`${Ts(s,this.formatSize)}`,k("Views"))}get ratingTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.averageRating,k("Avg Rating"))}get reviewsTemplate(){var e;return this.metadataTemplate((e=this.model)===null||e===void 0?void 0:e.commentCount,k("Reviews"))}get topicsTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.subjects)||this.model.subjects.length===0?b:h`
      <div id="topics" class="metadata">
        ${this.labelTemplate(k("Topics"))}
        ${go(Pt(this.model.subjects,t=>this.searchLink("subject",t)),", ")}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?b:h`
      <div id="collections" class="metadata">
        ${this.labelTemplate(k("Collections"))}
        ${go(this.collectionLinks,", ")}
      </div>
    `}get descriptionTemplate(){var e,t,i;return this.metadataTemplate(fc(yo.sanitize((i=(t=(e=this.model)===null||e===void 0?void 0:e.description)===null||t===void 0?void 0:t.replace(/\n/g," "))!==null&&i!==void 0?i:"")),"","description")}get reviewBlockTemplate(){var e;if(!(!((e=this.model)===null||e===void 0)&&e.review))return b;const{reviewtitle:t,reviewbody:i,stars:o}=this.model.review;return h`
      <review-block
        viewsize="list"
        title=${Ee(t)}
        body=${Ee(i)}
        starRating=${Ee(o)}
      >
      </review-block>
    `}get textSnippetsTemplate(){var e;return this.hasSnippets?h`<text-snippet-block
      viewsize="list"
      .snippets=${(e=this.model)===null||e===void 0?void 0:e.snippets}
    ></text-snippet-block>`:b}get hasSnippets(){var e,t;return!!(!((t=(e=this.model)===null||e===void 0?void 0:e.snippets)===null||t===void 0)&&t.length)}get webArchivesCaptureDatesTemplate(){var e;return!(!((e=this.model)===null||e===void 0)&&e.captureDates)||!this.model.title?b:h`
      <ul class="capture-dates">
        ${Pt(this.model.captureDates,t=>h`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,t)}
            </li>`)}
      </ul>
    `}metadataTemplate(e,t="",i){return e?h`
      <div id=${Ee(i)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:b}labelTemplate(e){return h` ${e?h`<span class="label">${e}: </span>`:b}`}searchLink(e,t){if(!e||!t)return b;const i=encodeURIComponent(`${e}:"${t}"`);return h`<a
      href="${this.baseNavigationUrl}/search?query=${i}"
      rel="nofollow"
    >
      ${yo.sanitize(t)}</a
    >`}detailsLink(e,t,i=!1){if(!e)return b;const o=t??e,s=this.displayValueProvider.itemPageUrl(e,i);return h`<a href=${s}> ${yo.sanitize(o)} </a>`}get mediatypeURL(){var e;if(this.baseNavigationUrl===void 0||!(!((e=this.model)===null||e===void 0)&&e.mediatype))return b;switch(this.model.mediatype){case"collection":return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case"account":return b;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(e){(e.has("model")||e.has("collectionTitles"))&&this.buildCollectionLinks()}async buildCollectionLinks(){var e,t,i;if(!(!((e=this.model)===null||e===void 0)&&e.collections)||this.model.collections.length===0)return;this.collectionLinks=[];const o=[];for(const s of this.model.collections)!jo[s]&&!s.startsWith("fav-")&&o.push(this.detailsLink(s,(i=(t=this.collectionTitles)===null||t===void 0?void 0:t.get(s))!==null&&i!==void 0?i:s,!0));this.collectionLinks=o}get date(){var e,t,i,o,s;switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"date":return(t=this.model)===null||t===void 0?void 0:t.datePublished;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(s=this.model)===null||s===void 0?void 0:s.dateArchived}}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return f`
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
    `}};n([c({type:Object})],Bo.prototype,"collectionTitles",void 0);n([F()],Bo.prototype,"collectionLinks",void 0);Bo=n([R("tile-list")],Bo);let Ke=class extends P{constructor(){super(...arguments),this.loggedIn=!1,this.suppressBlurring=!1}render(){return h`
      <div id="container">
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
      </div>
    `}get headerTemplate(){var e,t,i,o;if(((e=this.model)===null||e===void 0?void 0:e.collections.length)===0)return b;let s="",a="";for(const l of((t=this.model)===null||t===void 0?void 0:t.collections)||[])if(!jo[l]&&!l.startsWith("fav-")){s=(o=(i=this.collectionTitles)===null||i===void 0?void 0:i.get(l))!==null&&o!==void 0?o:l,a=l;break}return a?h`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${a}">
          <img
            src="${this.baseImageUrl}/services/img/${a}"
            alt=""
          /><span>${s}</span>
        </a>
      </div>
    `:b}static get styles(){const e=f`var(--hoverPaneHeaderBGColor, #edf0ff)`,t=f`var(--ia-theme-link-color, #4b64ff)`,i=f`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;return f`
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
        background: ${e};
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
    `}};n([c({type:Object})],Ke.prototype,"model",void 0);n([c({type:String})],Ke.prototype,"baseNavigationUrl",void 0);n([c({type:String})],Ke.prototype,"baseImageUrl",void 0);n([c({type:Boolean})],Ke.prototype,"loggedIn",void 0);n([c({type:Boolean})],Ke.prototype,"suppressBlurring",void 0);n([c({type:Object})],Ke.prototype,"sortParam",void 0);n([c({type:Number})],Ke.prototype,"mobileBreakpoint",void 0);n([c({type:Number})],Ke.prototype,"currentWidth",void 0);n([c({type:Object})],Ke.prototype,"collectionTitles",void 0);Ke=n([R("tile-hover-pane")],Ke);let Oa=class extends de{render(){var e,t,i,o;return h`
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
          >${yo.sanitize((t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"")}</a
        >
        <div id="creator">
          ${((i=this.model)===null||i===void 0?void 0:i.mediatype)==="account"?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">
          ${this.getFormattedDate(this.date,this.dateFormatSize)}
        </div>
        <div id="icon">
          <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
        </div>
        <div id="views">${Ts((o=this.views)!==null&&o!==void 0?o:0,this.formatSize)}</div>
      </div>
    `}get href(){var e;return!(!((e=this.model)===null||e===void 0)&&e.identifier)||this.baseNavigationUrl==null?b:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get creator(){var e;return(e=this.displayValueProvider.firstCreatorMatchingFilter)!==null&&e!==void 0?e:b}get date(){var e,t,i,o,s;switch((e=this.effectiveSort)===null||e===void 0?void 0:e.field){case"publicdate":return(t=this.model)===null||t===void 0?void 0:t.dateArchived;case"reviewdate":return(i=this.model)===null||i===void 0?void 0:i.dateReviewed;case"addeddate":return(o=this.model)===null||o===void 0?void 0:o.dateAdded;default:return(s=this.model)===null||s===void 0?void 0:s.datePublished}}get views(){var e,t,i;return((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="week"?(t=this.model)===null||t===void 0?void 0:t.weeklyViewCount:(i=this.model)===null||i===void 0?void 0:i.viewCount}get effectiveSort(){var e;return(e=this.sortParam)!==null&&e!==void 0?e:this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get dateFormatSize(){var e,t;return(!this.isSortedByDate||((e=this.effectiveSort)===null||e===void 0?void 0:e.field)==="date")&&ks((t=this.model)===null||t===void 0?void 0:t.datePublished)?"year-only":this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}get isSortedByDate(){var e;return["date","reviewdate","addeddate","publicdate"].includes((e=this.effectiveSort)===null||e===void 0?void 0:e.field)}static get styles(){return f`
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
    `}};Oa=n([R("tile-list-compact")],Oa);let Ia=class extends de{render(){return h`
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
    `}};Ia=n([R("tile-list-compact-header")],Ia);const Na=(r,e=-1/0,t=1/0)=>Math.max(e,Math.min(r,t));class Pc{constructor(e,t={}){var i,o,s,a,l,d,u;this.host=e,this.mobileBreakpoint=600,this.offsetX=-10,this.offsetY=15,this.showDelay=300,this.hideDelay=100,this.longPressDelay=600,this.enableLongPress=!1,this.hoverPaneState="hidden",this.forceTouchBackdrop=!1,this.lastPointerClientPos={x:0,y:0},this.handleFocus=()=>{this.hoverPaneState==="hidden"&&this.showHoverPane("host")},this.handleBlur=()=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane()},this.handleKeyDown=p=>{(p.key==="ArrowDown"||p.key==="ArrowUp")&&this.hoverPaneState!=="hidden"&&p.preventDefault()},this.handleKeyUp=p=>{p.key==="ArrowDown"&&this.hoverPaneState!=="hidden"&&this.hoverPane&&(this.hoverPane.tabIndex=1,this.hoverPane.focus()),(p.key==="ArrowUp"||p.key==="Escape")&&this.hoverPaneState!=="hidden"&&(this.hoverPane&&(this.hoverPane.tabIndex=-1),this.hoverPaneState="hidden",this.fadeOutHoverPane(),console.log("focusing back to host",this.host),this.host.focus())},this.handleMouseEnter=p=>{this.handleMouseMove(p)},this.handleMouseMove=p=>{var m;clearTimeout(this.hideTimer),this.hoverPaneState==="fading-out"&&(this.hoverPaneState="shown",(m=this.hoverPane)===null||m===void 0||m.classList.add("fade-in")),this.hoverPaneState==="hidden"&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:p.clientX,y:p.clientY})},this.handleMouseLeave=()=>{clearTimeout(this.showTimer),clearTimeout(this.hideTimer),this.hoverPaneState!=="hidden"&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))},this.handleTouchStart=p=>{clearTimeout(this.longPressTimer),p.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState==="hidden"&&this.showHoverPane("cursor")},this.longPressDelay),this.lastPointerClientPos={x:p.touches[0].clientX,y:p.touches[0].clientY})},this.handleLongPressCancel=()=>{clearTimeout(this.longPressTimer)},this.handleContextMenu=p=>{p.preventDefault()},this.handleBackdropInteraction=p=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane(),p.stopPropagation()},this.mobileBreakpoint=(i=t.mobileBreakpoint)!==null&&i!==void 0?i:this.mobileBreakpoint,this.offsetX=(o=t.offsetX)!==null&&o!==void 0?o:this.offsetX,this.offsetY=(s=t.offsetY)!==null&&s!==void 0?s:this.offsetY,this.showDelay=(a=t.showDelay)!==null&&a!==void 0?a:this.showDelay,this.hideDelay=(l=t.hideDelay)!==null&&l!==void 0?l:this.hideDelay,this.longPressDelay=(d=t.longPressDelay)!==null&&d!==void 0?d:this.longPressDelay,this.enableLongPress=(u=t.enableLongPress)!==null&&u!==void 0?u:this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){var e,t,i,o,s,a,l;return this.hoverPaneProps=this.host.getHoverPaneProps(),this.shouldRenderHoverPane?h` ${this.touchBackdropTemplate}
          <tile-hover-pane
            popover
            tabindex="-1"
            .model=${(e=this.hoverPaneProps)===null||e===void 0?void 0:e.model}
            .baseNavigationUrl=${(t=this.hoverPaneProps)===null||t===void 0?void 0:t.baseNavigationUrl}
            .baseImageUrl=${(i=this.hoverPaneProps)===null||i===void 0?void 0:i.baseImageUrl}
            .loggedIn=${(o=this.hoverPaneProps)===null||o===void 0?void 0:o.loggedIn}
            .suppressBlurring=${(s=this.hoverPaneProps)===null||s===void 0?void 0:s.suppressBlurring}
            .sortParam=${(a=this.hoverPaneProps)===null||a===void 0?void 0:a.sortParam}
            .collectionTitles=${(l=this.hoverPaneProps)===null||l===void 0?void 0:l.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${window.innerWidth}
          ></tile-hover-pane>`:b}toggleHoverPane(e){var t;this.hoverPaneState==="shown"?(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1):(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=(t=e.enableTouchBackdrop)!==null&&t!==void 0?t:!1,this.showHoverPane("cursor"))}get touchBackdropTemplate(){return this.showTouchBackdrop?h`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:b}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}get isTouchEnabled(){return"ontouchstart"in window&&window.matchMedia("(any-pointer: coarse)").matches}get shouldRenderHoverPane(){return this.hoverPaneState!=="hidden"}makePaneDesiredOffsets(e){var t;let[i,o]=[0,0];switch(e){case"host":const d=this.host.getBoundingClientRect();i=d.left+20,o=d.top+30;break;case"cursor":i=this.lastPointerClientPos.x,o=this.lastPointerClientPos.y;break}const s=i>window.innerWidth/2,a=o>window.innerHeight/2,l=(t=this.hoverPane)===null||t===void 0?void 0:t.getBoundingClientRect();return l&&(s&&(i-=l.width),a&&(o-=l.height),i+=(s?-1:1)*this.offsetX,o+=(a?-1:1)*this.offsetY,this.isMobileView&&(i=Na(i,20,window.innerWidth-l.width-20),o=Na(o,20,window.innerHeight-l.height-20))),i+=window.scrollX,o+=window.scrollY,{left:i,top:o}}attachListeners(){this.isHoverEnabled&&(this.host.addEventListener("mouseenter",this.handleMouseEnter),this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseleave",this.handleMouseLeave)),this.host.addEventListener("focus",this.handleFocus),this.host.addEventListener("blur",this.handleBlur),this.host.addEventListener("keyup",this.handleKeyUp),this.host.addEventListener("keydown",this.handleKeyDown),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener("touchstart",this.handleTouchStart),this.host.addEventListener("touchmove",this.handleLongPressCancel),this.host.addEventListener("touchend",this.handleLongPressCancel),this.host.addEventListener("touchcancel",this.handleLongPressCancel),this.host.addEventListener("contextmenu",this.handleContextMenu))}detachListeners(){this.host.removeEventListener("mouseenter",this.handleMouseEnter),this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseleave",this.handleMouseLeave),this.host.removeEventListener("touchstart",this.handleTouchStart),this.host.removeEventListener("touchmove",this.handleLongPressCancel),this.host.removeEventListener("touchend",this.handleLongPressCancel),this.host.removeEventListener("touchcancel",this.handleLongPressCancel),this.host.removeEventListener("contextmenu",this.handleContextMenu),this.host.removeEventListener("focus",this.handleFocus),this.host.removeEventListener("blur",this.handleBlur),this.host.removeEventListener("keyup",this.handleKeyUp),this.host.removeEventListener("keydown",this.handleKeyDown)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.showHoverPane("cursor")},this.showDelay)}async showHoverPane(e){var t,i,o,s;this.hoverPaneState="shown",this.host.requestUpdate(),await this.host.updateComplete,!((t=this.hoverPane)===null||t===void 0)&&t.isConnected&&((o=(i=this.hoverPane)===null||i===void 0?void 0:i.showPopover)===null||o===void 0||o.call(i),await new Promise(a=>{requestAnimationFrame(a)}),this.repositionHoverPane(e),(s=this.hoverPane)===null||s===void 0||s.classList.add("visible","fade-in"))}fadeOutHoverPane(){var e;this.hoverPaneState="fading-out",(e=this.hoverPane)===null||e===void 0||e.classList.remove("fade-in"),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState="hidden",this.host.requestUpdate()},100)}repositionHoverPane(e){if(!this.hoverPane)return;const{top:t,left:i}=this.makePaneDesiredOffsets(e);console.log("repositionHoverPane",t,i),this.hoverPane.style.top=`${t}px`,this.hoverPane.style.left=`${i}px`}}var os;let Me=os=class extends de{constructor(){super(...arguments),this.isManageView=!1,this.showTvClips=!1,this.simpleLayoutType="none",this.enableHoverPane=!1,this.manageCheckTitle=k("Remove this item from the list"),this.onfocus=e=>{var t;(t=this.tileLinkElement)===null||t===void 0||t.focus(),console.log("tile-dispatcher onfocus",e,this.tileLinkElement)}}render(){var e,t;const i=this.tileDisplayMode==="grid",o=(t=(e=this.hoverPaneController)===null||e===void 0?void 0:e.getTemplate())!==null&&t!==void 0?t:b;return h`
      <div id="container" class=${i?"hoverable":b}>
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
        ${this.manageCheckTemplate} ${o}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new Pc(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){const{currentWidth:e,sortParam:t,defaultSortParam:i,mobileBreakpoint:o}=this;return h`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t??i}
        .mobileBreakpoint=${o}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return h`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){var e,t,i;return h`
      <a
        href=${this.linkTileHref}
        aria-label=${(t=(e=this.model)===null||e===void 0?void 0:e.title)!==null&&t!==void 0?t:"Untitled item"}
        title=${this.shouldPrepareHoverPane?b:Ee((i=this.model)===null||i===void 0?void 0:i.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
        class="tile-link"
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
    `}get shouldPrepareHoverPane(){var e,t;return this.enableHoverPane&&!!this.tileDisplayMode&&os.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]&&((e=this.model)===null||e===void 0?void 0:e.mediatype)!=="search"&&!(!((t=this.model)===null||t===void 0)&&t.captureDates)}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e==null||e.removeObserver({handler:this,target:this.container})}startResizeObservation(){var e;this.stopResizeObservation(this.resizeObserver),(e=this.resizeObserver)===null||e===void 0||e.addObserver({handler:this,target:this.container})}updated(e){if(e.has("resizeObserver")){const t=e.get("resizeObserver");this.stopResizeObservation(t),this.startResizeObservation()}}handleLinkClicked(e){this.isManageView&&(e.preventDefault(),this.model&&(this.model.checked=!this.model.checked)),this.dispatchEvent(new CustomEvent("resultSelected",{detail:this.model}))}handleLinkContextMenu(e){this.isManageView&&this.linkTileHref!==b&&(e.preventDefault(),window.open(this.linkTileHref,"_blank"))}tileInfoButtonPressed(e){var t;(t=this.hoverPaneController)===null||t===void 0||t.toggleHoverPane({coords:e.detail,enableTouchBackdrop:!0})}get tile(){const{model:e,collectionPagePath:t,baseNavigationUrl:i,currentWidth:o,currentHeight:s,sortParam:a,creatorFilter:l,mobileBreakpoint:d,defaultSortParam:u}=this;if(!e)return b;switch(this.tileDisplayMode){case"grid":switch(e.mediatype){case"collection":return h`<collection-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${s}
              .creatorFilter=${l}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;case"account":return h`<account-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${s}
              .creatorFilter=${l}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;case"search":return h`<search-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${o}
              .currentHeight=${s}
              .creatorFilter=${l}
              .suppressBlurring=${this.suppressBlurring}
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
              .sortParam=${a}
              .defaultSortParam=${u}
              .creatorFilter=${l}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .simpleLayoutType=${this.simpleLayoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${!this.isHoverEnabled}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case"list-compact":return h`<tile-list-compact
          .model=${e}
          .collectionPagePath=${t}
          .currentWidth=${o}
          .currentHeight=${s}
          .baseNavigationUrl=${i}
          .sortParam=${a}
          .defaultSortParam=${u}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;case"list-detail":return h`<tile-list
          .model=${e}
          .collectionPagePath=${t}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${o}
          .currentHeight=${s}
          .baseNavigationUrl=${i}
          .sortParam=${a}
          .defaultSortParam=${u}
          .creatorFilter=${l}
          .mobileBreakpoint=${d}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list>`;default:return b}}static get styles(){return f`
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
        box-shadow: var(--tileHoverBoxShadow, 0 0 6px 2px rgba(8, 8, 32, 0.8));
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
    `}};Me.HOVER_PANE_DISPLAY_MODES={grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1};n([c({type:String})],Me.prototype,"tileDisplayMode",void 0);n([c({type:Boolean})],Me.prototype,"isManageView",void 0);n([c({type:Object})],Me.prototype,"resizeObserver",void 0);n([c({type:Object})],Me.prototype,"collectionTitles",void 0);n([c({type:Boolean})],Me.prototype,"showTvClips",void 0);n([c({type:String})],Me.prototype,"simpleLayoutType",void 0);n([c({type:Boolean})],Me.prototype,"enableHoverPane",void 0);n([c({type:String})],Me.prototype,"manageCheckTitle",void 0);n([H("#container")],Me.prototype,"container",void 0);n([H("tile-hover-pane")],Me.prototype,"hoverPane",void 0);n([H(".tile-link")],Me.prototype,"tileLinkElement",void 0);Me=os=n([R("tile-dispatcher")],Me);let Ua=class extends P{render(){return h` <div id="container"></div> `}static get styles(){return f`
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
    `}};Ua=n([R("collection-browser-loading-tile")],Ua);const Rc=N`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Oc=N`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let ce=class extends P{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.openViaCaret=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()},this.handlingCaretClick=!1}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){if(this.handlingCaretClick){this.handlingCaretClick=!1;return}this.openViaButton&&this.toggleOptions()}caretInteracted(){this.openViaCaret&&this.toggleOptions()}caretClicked(){this.handlingCaretClick=!0,this.caretInteracted()}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(e.preventDefault(),this.caretInteracted())}renderOption(e){const{label:t,url:i=void 0,id:o}=e;let s;const a=this.selectedOption===o?"selected":"";return i?s=h`<a
        href=${i}
        @click=${l=>this.optionClicked(l,e)}
        >${t}</a
      >`:s=h`<button
        @click=${l=>this.optionClicked(l,e)}
      >
        ${t}
      </button>`,h`<li class=${a}>${s}</li>`}optionClicked(e,t){var i;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(i=t.selectedHandler)===null||i===void 0||i.call(t,t)),this.closeOnSelect&&this.closeOptions()}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretTemplate(){if(!this.displayCaret)return h``;const e=this.openViaCaret&&!this.openViaButton?"0":void 0,t=this.openViaCaret?"button":void 0;return h`
      <span
        class="caret"
        tabindex=${Ee(e)}
        role=${Ee(t)}
        aria-labelledby="caret-label"
        @click=${this.isDisabled||this.hasCustomClickHandler?b:this.caretClicked}
        @keydown=${this.isDisabled||this.hasCustomClickHandler?b:this.caretKeyDown}
      >
        <span ?hidden=${!this.open} class="caret-up">
          <slot name="caret-up">${Rc}</slot>
        </span>
        <span ?hidden=${this.open} class="caret-down">
          <slot name="caret-down">${Oc}</slot>
        </span>
      </span>
    `}get dropdownTemplate(){return this.isCustomList?h`<slot name="list"></slot>`:h`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?h`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:h``:h``}render(){return h`
      <div class="ia-dropdown-group">
        <button
          class="click-main"
          @click=${this.isDisabled||this.hasCustomClickHandler?b:this.mainButtonClicked}
          ?disabled=${this.isDisabled}
        >
          <span class="sr-only" id="caret-label">Toggle ${this.optionGroup}</span>
          <slot name="dropdown-label"></slot>
          ${this.caretTemplate}
        </button>

        <ul
          id="dropdown-main"
          class=${this.dropdownState}
          ?popover=${this.usePopover}
        >
          ${this.dropdownTemplate}
        </ul>

        ${this.backdropTemplate}
      </div>
    `}static get styles(){const e=f`var(--dropdownBorderWidth, 1px)`,t=f`var(--dropdownBorderRadius, 4px)`,i=f`var(--dropdownBorderColor, #fff)`,o=f`var(--dropdownBgColor, #333)`,s=f`var(--dropdownTextColor, #fff)`,a=f`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,l=f`var(--dropdownSelectedBgColor, #fff)`;return f`
      :host {
        display: inline;
        color: ${s};
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
        color: ${s};
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
        background: ${o};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${o};
        border-top: 0.5px solid ${o};
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
        color: ${s};
        background: transparent;
        padding: 0;
      }
    `}};n([c({type:Boolean,reflect:!0})],ce.prototype,"open",void 0);n([c({type:Boolean,reflect:!0})],ce.prototype,"isDisabled",void 0);n([c({type:Boolean})],ce.prototype,"displayCaret",void 0);n([c({type:Boolean})],ce.prototype,"closeOnSelect",void 0);n([c({type:Boolean})],ce.prototype,"openViaButton",void 0);n([c({type:Boolean})],ce.prototype,"openViaCaret",void 0);n([c({type:Boolean})],ce.prototype,"usePopover",void 0);n([c({type:Boolean})],ce.prototype,"includeSelectedOption",void 0);n([c({type:String})],ce.prototype,"selectedOption",void 0);n([c({attribute:!1})],ce.prototype,"options",void 0);n([c({type:String})],ce.prototype,"optionGroup",void 0);n([c({attribute:!1})],ce.prototype,"optionSelected",void 0);n([c({type:Boolean,reflect:!0})],ce.prototype,"isCustomList",void 0);n([c({type:Boolean,reflect:!0})],ce.prototype,"hasCustomClickHandler",void 0);n([c({type:Boolean,reflect:!0})],ce.prototype,"closeOnEscape",void 0);n([c({type:Boolean,reflect:!0})],ce.prototype,"closeOnBackdropClick",void 0);n([H(".ia-dropdown-group")],ce.prototype,"container",void 0);n([H("#dropdown-main")],ce.prototype,"dropdownMenu",void 0);ce=n([R("ia-dropdown")],ce);let rs=class extends P{render(){return h`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};rs.styles=f`
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
  `;rs=n([R("ia-icon-label")],rs);let ss=class extends P{constructor(){super(...arguments),this.numResults=0}render(){return h`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?"result":"results"}
        </div>
      </div>
    `}static get styles(){const e=f`var(--tooltipArrowSize, 5px)`,t=f`var(--tooltipArrowOffset, 0px)`;return f`
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
    `}};n([c({type:Number})],ss.prototype,"numResults",void 0);ss=n([R("alpha-bar-tooltip")],ss);let ft=class extends P{constructor(){super(...arguments),this.selectedLetter=null,this.tooltipShown=!1,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){var e;return(e=this.selectedLetter)===null||e===void 0?void 0:e.toUpperCase()}render(){var e;return h`
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
    `}letterButtonTemplate(e){var t,i,o;const s=`${e}: ${(i=(t=this.letterCounts)===null||t===void 0?void 0:t[e])!==null&&i!==void 0?i:0} results`;return h`
      <button
        aria-label=${s}
        ?disabled=${!(!((o=this.letterCounts)===null||o===void 0)&&o[e])}
        @click=${()=>{this.letterClicked(e)}}
      >
        ${e}
      </button>
    `}tooltipTemplate(e){var t,i;return this.hoveredLetter!==e?b:this.tooltipShown?h`<alpha-bar-tooltip
          data-letter=${e}
          .numResults=${(i=(t=this.letterCounts)===null||t===void 0?void 0:t[this.hoveredLetter])!==null&&i!==void 0?i:0}
        ></alpha-bar-tooltip>`:b}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(e){var t,i;const o=e.target;if(o&&!this.tooltipShown){const s=(i=(t=o.textContent)===null||t===void 0?void 0:t.trim())!==null&&i!==void 0?i:void 0;this.tooltipShown=!0,this.hoveredLetter=s,await this.updateComplete,await new Promise(a=>{setTimeout(a,0)}),this.tooltip&&this.tooltip.dataset.letter===s&&this.positionTooltip(o)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(e){if(!this.tooltip)return;const t=this.tooltip.clientWidth;let o=e.clientWidth/2-t/2;const s=getComputedStyle(document.body),a=parseFloat(s.getPropertyValue("margin-left")),l=parseFloat(s.getPropertyValue("margin-right")),d=document.body.clientWidth+a+l,p=e.getBoundingClientRect().left+o,m=p+t,v=1;let y;p<v?y=p-v:m>d-v&&(y=m-d+v),y&&(o-=y,this.tooltip.style.setProperty("--tooltipArrowOffset",`${y}px`)),this.tooltip.style.left=`${o}px`,this.tooltip.classList.add("fade-in")}};ft.styles=f`
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
  `;n([c({type:String})],ft.prototype,"selectedLetter",void 0);n([c({type:Object})],ft.prototype,"letterCounts",void 0);n([c({type:String})],ft.prototype,"ariaLandmarkLabel",void 0);n([F()],ft.prototype,"tooltipShown",void 0);n([F()],ft.prototype,"hoveredLetter",void 0);n([H("alpha-bar-tooltip")],ft.prototype,"tooltip",void 0);ft=n([R("alpha-bar")],ft);const Ic=h`
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
`,Nc=h`
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
`,Uc=h`
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
`,Hc=N`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,Vc=N`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,Wc=N`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;let Y=class extends P{constructor(){super(...arguments),this.defaultSortDirection=null,this.defaultSortField=_.relevance,this.defaultViewSort=_.weeklyview,this.defaultDateSort=_.date,this.sortDirection=null,this.selectedSort=_.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortFieldAvailability=Wo,this.enableSortOptionsSlot=!1,this.suppressDisplayModes=!1,this.lastSelectedViewSort=this.defaultViewSort,this.lastSelectedDateSort=this.defaultDateSort,this.alphaSelectorVisible=null,this.dropdownBackdropVisible=!1,this.desktopSortContainerWidth=0,this.selectorBarContainerWidth=0,this.boundSortBarSelectorEscapeListener=e=>{e.key==="Escape"&&this.closeDropdowns()}}render(){return h`
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
    `}willUpdate(e){if(e.has("selectedSort")||e.has("defaultSortField")){if(this.selectedSort&&this.selectedSort!==_.default&&this.sortDirection===null){const t=xe[this.finalizedSortField];this.sortDirection=t.defaultSortDirection}this.viewOptionSelected?this.lastSelectedViewSort=this.finalizedSortField:this.dateOptionSelected&&(this.lastSelectedDateSort=this.finalizedSortField)}e.has("defaultViewSort")&&(this.lastSelectedViewSort=this.defaultViewSort),e.has("defaultDateSort")&&(this.lastSelectedDateSort=this.defaultDateSort)}updated(e){if(e.has("displayMode")&&this.displayModeChanged(),e.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),e.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),e.has("dropdownBackdropVisible")&&this.setupEscapeListeners(),e.has("resizeObserver")||e.has("enableSortOptionsSlot")){const t=e.get("resizeObserver");t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener("keydown",this.boundSortBarSelectorEscapeListener):document.removeEventListener("keydown",this.boundSortBarSelectorEscapeListener)}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){this.sortSelectorContainer&&e.removeObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&e.removeObserver({target:this.desktopSortContainer,handler:this})}setupResizeObserver(){this.resizeObserver&&(this.sortSelectorContainer&&this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&this.resizeObserver.addObserver({target:this.desktopSortContainer,handler:this}))}handleResize(e){e.target===this.desktopSortContainer?this.desktopSortContainerWidth=e.contentRect.width:e.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=e.contentRect.width)}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSortContainerWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return b;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return b}get sortDirectionSelectorTemplate(){const t=`Change to ${this.sortDirection==="asc"?"descending":"ascending"} sort`;return h`
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
        ${this.finalizedSortDirection==="asc"?Ic:Nc}
      </div>
    `:h`<div class="sort-direction-icon">${Uc}</div>`}get desktopSortSelectorTemplate(){return h`
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
    `}get mobileSortSelectorTemplate(){const e=Object.values(xe).filter(t=>t.shownInSortBar&&this.sortFieldAvailability[t.field]);return h`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${this.getSortDropdown({displayName:xe[this.finalizedSortField].displayName,id:"mobile-dropdown",selected:!0,dropdownOptions:e.map(t=>this.getDropdownOption(t.field)),selectedOption:this.finalizedSortField,onOptionSelected:this.mobileSortChanged,onDropdownClick:()=>{this.dropdownBackdropVisible=this.mobileDropdown.open,this.mobileDropdown.classList.toggle("open",this.mobileDropdown.open)}})}
      </div>
    `}getSortSelectorButton(e,t){var i;const o=this.finalizedSortField===e,s=xe[e].displayName,a=(i=t==null?void 0:t.onSelected)!==null&&i!==void 0?i:()=>this.clearAlphaBarFilters();return h`
      <button
        class=${o?"selected":""}
        data-title=${s}
        @click=${l=>{l.preventDefault(),this.dropdownBackdropVisible=!1,this.finalizedSortField!==e&&(a==null||a(l),this.setSelectedSort(e))}}
      >
        ${s}
      </button>
    `}getSortDropdown(e){var t,i,o,s;return h`
      <ia-dropdown
        id=${e.id}
        class=${e.selected?"selected":""}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${e.selected}
        .options=${e.dropdownOptions}
        .selectedOption=${(t=e.selectedOption)!==null&&t!==void 0?t:""}
        @optionSelected=${(i=e.onOptionSelected)!==null&&i!==void 0?i:b}
        @click=${(o=e.onDropdownClick)!==null&&o!==void 0?o:b}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title=${e.displayName}
          @click=${(s=e.onLabelInteraction)!==null&&s!==void 0?s:b}
          @keydown=${e.onLabelInteraction?a=>{var l;(a.key==="Enter"||a.key===" ")&&((l=e.onLabelInteraction)===null||l===void 0||l.call(e,a))}:b}
        >
          ${e.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(e){return{id:e,selectedHandler:()=>{this.selectDropdownSortField(e)},label:h`
        <span class="dropdown-option-label">
          ${xe[e].displayName}
        </span>
      `}}dropdownOptionSelected(e){this.dropdownBackdropVisible=!1,this.clearAlphaBarFilters();const t=e.detail.option.id;this.setSelectedSort(t),this.viewOptionSelected?this.lastSelectedViewSort=t:this.dateOptionSelected&&(this.lastSelectedDateSort=t)}get relevanceSortSelectorTemplate(){return this.sortFieldAvailability.relevance?this.getSortSelectorButton(_.relevance):b}get viewsSortSelectorTemplate(){const{availableViewsFields:e}=this;return e.length<1?b:this.getSortSelectorButton(e[0])}get titleSortSelectorTemplate(){return this.sortFieldAvailability.title?this.getSortSelectorButton(_.title,{onSelected:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent()}}):b}get dateSortSelectorTemplate(){const{availableDateFields:e}=this;return e.length<1?b:this.getSortSelectorButton(e[0])}get creatorSortSelectorTemplate(){return this.sortFieldAvailability.creator?this.getSortSelectorButton(_.creator,{onSelected:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()}}):b}get viewsDropdownTemplate(){const e=xa.filter(t=>this.sortFieldAvailability[t]).map(t=>this.getDropdownOption(t));return this.getSortDropdown({displayName:this.viewSortDisplayName,id:"views-dropdown",selected:this.viewOptionSelected,dropdownOptions:e,selectedOption:this.viewOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.dateDropdown&&(this.dateDropdown.open=!1);const t=this.viewsDropdown;this.dropdownBackdropVisible=t.open,t.classList.toggle("open",t.open)},onLabelInteraction:t=>{var i;!(!((i=this.viewsDropdown)===null||i===void 0)&&i.open)&&!this.viewOptionSelected&&(t.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedViewSort))}})}get dateDropdownTemplate(){const e=$a.filter(t=>this.sortFieldAvailability[t]).map(t=>this.getDropdownOption(t));return this.getSortDropdown({displayName:this.dateSortDisplayName,id:"date-dropdown",selected:this.dateOptionSelected,dropdownOptions:e,selectedOption:this.dateOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.viewsDropdown&&(this.viewsDropdown.open=!1);const t=this.dateDropdown;this.dropdownBackdropVisible=t.open,t.classList.toggle("open",t.open)},onLabelInteraction:t=>{var i;!(!((i=this.dateDropdown)===null||i===void 0)&&i.open)&&!this.dateOptionSelected&&(t.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedDateSort))}})}get allViewsSortOptionsTemplate(){switch(this.availableViewsFields.length){case 0:return b;case 1:return this.viewsSortSelectorTemplate;default:return this.viewsDropdownTemplate}}get allDateSortOptionsTemplate(){switch(this.availableDateFields.length){case 0:return b;case 1:return this.dateSortSelectorTemplate;default:return this.dateDropdownTemplate}}mobileSortChanged(e){this.dropdownBackdropVisible=!1;const t=e.detail.option.id;this.setSelectedSort(t),this.alphaSelectorVisible=null,t!=="title"&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),t!=="creator"&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return h`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
            data-testid="grid-button"
          >
            ${Hc}
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
            ${Vc}
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
            ${Wc}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return h`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `}closeDropdowns(){this.dropdownBackdropVisible=!1;const e=[this.viewsDropdown,this.dateDropdown,this.mobileDropdown];for(const t of e)t&&(t.open=!1,t.classList.remove("open"))}selectDropdownSortField(e){this.dropdownBackdropVisible=!1,this.setSelectedSort(e)}clearAlphaBarFilters(){this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()}setSortDirection(e){this.sortDirection=e,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection==="desc"?"asc":"desc")}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(e){this.selectedSort=e;const t=xe[e];this.sortDirection=t.defaultSortDirection,this.emitSortChangedEvent()}get finalizedSortField(){return this.selectedSort===_.default?this.defaultSortField:this.selectedSort}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get canChangeSortDirection(){return xe[this.finalizedSortField].canSetDirection}get dateOptionSelected(){return[_.datefavorited,_.datearchived,_.date,_.datereviewed,_.dateadded].includes(this.finalizedSortField)}get viewOptionSelected(){return[_.alltimeview,_.weeklyview].includes(this.finalizedSortField)}get dateSortDisplayName(){return xe[this.lastSelectedDateSort].displayName}get viewSortDisplayName(){return xe[this.lastSelectedViewSort].displayName}get availableViewsFields(){return xa.filter(e=>this.sortFieldAvailability[e])}get availableDateFields(){return $a.filter(e=>this.sortFieldAvailability[e])}get titleSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){var e;return h` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${(e=this.prefixFilterCountMap)===null||e===void 0?void 0:e.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){var t;this.selectedTitleFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){var t;this.selectedCreatorFilter=(t=e.detail.selectedLetter)!==null&&t!==void 0?t:null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const e=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){const e=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){const e=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){const e=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}static get styles(){return[at,f`
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
      `]}};n([c({type:String})],Y.prototype,"displayMode",void 0);n([c({type:String})],Y.prototype,"defaultSortDirection",void 0);n([c({type:String})],Y.prototype,"defaultSortField",void 0);n([c({type:String})],Y.prototype,"defaultViewSort",void 0);n([c({type:String})],Y.prototype,"defaultDateSort",void 0);n([c({type:String})],Y.prototype,"sortDirection",void 0);n([c({type:String})],Y.prototype,"selectedSort",void 0);n([c({type:String})],Y.prototype,"selectedTitleFilter",void 0);n([c({type:String})],Y.prototype,"selectedCreatorFilter",void 0);n([c({type:Object})],Y.prototype,"sortFieldAvailability",void 0);n([c({type:Boolean,reflect:!0})],Y.prototype,"enableSortOptionsSlot",void 0);n([c({type:Boolean,reflect:!0})],Y.prototype,"suppressDisplayModes",void 0);n([c({type:Object})],Y.prototype,"prefixFilterCountMap",void 0);n([c({type:Object})],Y.prototype,"resizeObserver",void 0);n([F()],Y.prototype,"lastSelectedViewSort",void 0);n([F()],Y.prototype,"lastSelectedDateSort",void 0);n([F()],Y.prototype,"alphaSelectorVisible",void 0);n([F()],Y.prototype,"dropdownBackdropVisible",void 0);n([F()],Y.prototype,"desktopSortContainerWidth",void 0);n([F()],Y.prototype,"selectorBarContainerWidth",void 0);n([H("#desktop-sort-container")],Y.prototype,"desktopSortContainer",void 0);n([H("#sort-selector-container")],Y.prototype,"sortSelectorContainer",void 0);n([H("#views-dropdown")],Y.prototype,"viewsDropdown",void 0);n([H("#date-dropdown")],Y.prototype,"dateDropdown",void 0);n([H("#mobile-dropdown")],Y.prototype,"mobileDropdown",void 0);Y=n([R("sort-filter-bar")],Y);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Sr(r,e,t){return r?e():t==null?void 0:t()}class Rt{constructor(e){var t,i,o,s,a,l,d;this.title=e==null?void 0:e.title,this.subtitle=e==null?void 0:e.subtitle,this.headline=e==null?void 0:e.headline,this.message=e==null?void 0:e.message,this.headerColor=(t=e==null?void 0:e.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(i=e==null?void 0:e.bodyColor)!==null&&i!==void 0?i:"#f5f5f7",this.showProcessingIndicator=(o=e==null?void 0:e.showProcessingIndicator)!==null&&o!==void 0?o:!1,this.processingImageMode=(s=e==null?void 0:e.processingImageMode)!==null&&s!==void 0?s:"complete",this.showCloseButton=(a=e==null?void 0:e.showCloseButton)!==null&&a!==void 0?a:!0,this.showHeaderLogo=(l=e==null?void 0:e.showHeaderLogo)!==null&&l!==void 0?l:!0,this.closeOnBackdropClick=(d=e==null?void 0:e.closeOnBackdropClick)!==null&&d!==void 0?d:!0}}function*Es(r=document.activeElement){r!=null&&(yield r,"shadowRoot"in r&&r.shadowRoot&&r.shadowRoot.mode!=="closed"&&(yield*Es(r.shadowRoot.activeElement)))}function jc(){return[...Es()].pop()}const Ha=new WeakMap;function jn(r){let e=Ha.get(r);return e||(e=window.getComputedStyle(r,null),Ha.set(r,e)),e}function qc(r){if("checkVisibility"in r&&typeof r.checkVisibility=="function")return r.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=jn(r);return e.visibility!=="hidden"&&e.display!=="none"}function Gc(r){const e=jn(r),{overflowY:t,overflowX:i}=e;return t==="scroll"||i==="scroll"?!0:t!=="auto"||i!=="auto"?!1:r.scrollHeight>r.clientHeight&&t==="auto"||r.scrollWidth>r.clientWidth&&i==="auto"}function Yc(r){const e=r.tagName.toLowerCase(),t=Number(r.getAttribute("tabindex"));return r.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||r.hasAttribute("disabled")||r.closest("[inert]")||e==="input"&&r.getAttribute("type")==="radio"&&!r.hasAttribute("checked")||!qc(r)?!1:(e==="audio"||e==="video")&&r.hasAttribute("controls")||r.hasAttribute("tabindex")||r.hasAttribute("contenteditable")&&r.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:Gc(r)}function Qc(r,e){var t;return((t=r.getRootNode({composed:!0}))===null||t===void 0?void 0:t.host)!==e}function Va(r){const e=new WeakMap,t=[];function i(o){if(o instanceof Element){if(o.hasAttribute("inert")||o.closest("[inert]")||e.has(o))return;e.set(o,!0),!t.includes(o)&&Yc(o)&&t.push(o),o instanceof HTMLSlotElement&&Qc(o,r)&&o.assignedElements({flatten:!0}).forEach(s=>{i(s)}),o.shadowRoot!==null&&o.shadowRoot.mode==="open"&&i(o.shadowRoot)}for(const s of Array.from(o.children))i(s)}return i(r),t.sort((o,s)=>{const a=Number(o.getAttribute("tabindex"))||0;return(Number(s.getAttribute("tabindex"))||0)-a})}let zi=[];class Kc{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const o=jc();if(this.previousFocus=o,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const s=Va(this.element);let a=s.findIndex(d=>d===o);this.previousFocus=this.currentFocus;const l=this.tabDirection==="forward"?1:-1;for(;;){a+l>=s.length?a=0:a+l<0?a=s.length-1:a+=l,this.previousFocus=this.currentFocus;const d=s[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||d&&this.possiblyHasTabbableChildren(d))return;t.preventDefault(),this.currentFocus=d,(i=this.currentFocus)===null||i===void 0||i.focus({preventScroll:!1});const u=[...Es()];if(u.includes(this.currentFocus)||!u.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){zi.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){zi=zi.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return zi[zi.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=Va(this.element);if(!this.element.matches(":focus-within")){const t=e[0],i=e[e.length-1],o=this.tabDirection==="forward"?t:i;typeof(o==null?void 0:o.focus)=="function"&&(this.currentFocus=o,o.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}var Wa;(function(r){r.processing="processing",r.complete="complete"})(Wa||(Wa={}));let as=class extends P{constructor(){super(...arguments),this.mode="processing"}render(){return h`
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
    `}static get styles(){const e=f`var(--activityIndicatorCheckmarkColor, #31A481)`,t=f`var(--activityIndicatorCompletedRingColor, #31A481)`,i=f`var(--activityIndicatorLoadingRingColor, #333333)`,o=f`var(--activityIndicatorLoadingDotColor, #333333)`;return f`
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
    `}};n([c({type:String})],as.prototype,"mode",void 0);as=n([R("ia-activity-indicator")],as);const Xc=h`
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
`;class Zc extends P{static get styles(){return f`
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
    `}render(){return Xc}}customElements.define("ia-icon-close",Zc);const Jc=h`
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
`;let ns=class extends P{constructor(){super(...arguments),this.config=new Rt}render(){return h`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?h`<div class="logo-icon">${Jc}</div>`:b}
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
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return h`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}static get styles(){const e=f`var(--modalLogoSize, 6.5rem)`,t=f`var(--processingImageSize, 7.5rem)`,i=f`var(--modalCornerRadius, 1rem)`,o=f`var(--modalBorder, 2px solid black)`,s=f`var(--modalBottomMargin, 2.5rem)`,a=f`var(--modalTopMargin, 5rem)`,l=f`var(--modalHeaderBottomPadding, 0.5em)`,d=f`var(--modalBottomPadding, 2rem)`,u=f`var(--modalScrollOffset, 5px)`,p=f`var(--modalTitleFontSize, 1.8rem)`,m=f`var(--modalSubtitleFontSize, 1.4rem)`,v=f`var(--modalHeadlineFontSize, 1.6rem)`,y=f`var(--modalMessageFontSize, 1.4rem)`,x=f`var(--modalTitleLineHeight, normal)`,S=f`var(--modalSubtitleLineHeight, normal)`,C=f`var(--modalHeadlineLineHeight, normal)`,D=f`var(--modalMessageLineHeight, normal)`;return f`
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
        line-height: ${x};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${m};
        line-height: ${S};
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
        max-height: calc(100vh - (16.5rem + ${s}));
        min-height: 5rem;
        padding: 0 0 calc(${u}) 0;
      }

      .headline {
        font-size: ${v};
        font-weight: bold;
        text-align: center;
        line-height: ${C};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${y};
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
    `}};n([c({type:Object})],ns.prototype,"config",void 0);ns=n([R("modal-template")],ns);function eh(r,e,t){var i=t||{},o=i.noTrailing,s=o===void 0?!1:o,a=i.noLeading,l=a===void 0?!1:a,d=i.debounceMode,u=d===void 0?void 0:d,p,m=!1,v=0;function y(){p&&clearTimeout(p)}function x(C){var D=C||{},M=D.upcomingOnly,A=M===void 0?!1:M;y(),m=!A}function S(){for(var C=arguments.length,D=new Array(C),M=0;M<C;M++)D[M]=arguments[M];var A=this,O=Date.now()-v;if(m)return;function W(){v=Date.now(),e.apply(A,D)}function ae(){p=void 0}!l&&u&&!p&&W(),y(),u===void 0&&O>r?l?(v=Date.now(),s||(p=setTimeout(u?ae:W,r))):W():s!==!0&&(p=setTimeout(u?ae:W,u===void 0?r-O:r))}return S.cancel=x,S}var Ot;(function(r){r.Open="open",r.Closed="closed"})(Ot||(Ot={}));class th{constructor(e){this.windowResizeThrottler=eh(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case Ot.Open:this.startResizeListener(),this.stopDocumentScroll();break;case Ot.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let pi=class extends P{constructor(){super(...arguments),this.mode=Ot.Closed,this.hostBridge=new th(this),this.modal=new Kc(this),this.closeOnBackdropClick=!0}firstUpdated(){return Xs(this,void 0,void 0,function*(){yield new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return h`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=Ot.Closed,this.customModalContent=void 0,this.modalTemplate.config=new Rt,this.modal.deactivate()}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Xs(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=Ot.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus(),this.modal.activate()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=f`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=f`var(--modalBackdropZindex, 1000)`,i=f`var(--modalWidth, 32rem)`,o=f`var(--modalMaxWidth, 95%)`,s=f`var(--modalZindex, 2000)`;return f`
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
        z-index: ${s};
        width: ${i};
        max-width: ${o};
      }
    `}};n([c({type:String,reflect:!0})],pi.prototype,"mode",void 0);n([c({type:Object})],pi.prototype,"customModalContent",void 0);n([c({type:Object})],pi.prototype,"hostBridge",void 0);n([H("modal-template")],pi.prototype,"modalTemplate",void 0);pi=n([R("modal-manager")],pi);const ja=f`var(--white, #fff)`,ih=f`var(--primaryDisableCTAFill, #767676)`,oh=f`var(--secondaryCTABorder, #999)`,rh=f`var(--primaryCTAFill, #194880)`,xr=f`var(--primaryCTAFillRGB, 25, 72, 128)`,sh=f`var(--primaryCTABorder, #c5d1df)`,ah=f`var(--primaryErrorCTAFill, #d9534f)`,$r=f`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,nh=f`var(--primaryErrorCTABorder, #d43f3a)`,lh=f`var(--secondaryCTAFill, #333)`,_r=f`var(--secondaryCTAFillRGB, 51, 51, 51)`,dh=f`var(--primaryCTABorder, #979797)`,ch=f`var(---primaryWarningFill, #ee8950)`,Cr=f`var(--primaryWarningFillRGB, 238, 137, 80)`,hh=f`var(--primaryWarningBorder, #ec7939)`,ph=f`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${ja};
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
    outline-color: ${ja};
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
    background-color: ${ih};
    border: 1px solid ${oh};
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
    background-color: ${rh};
    border-color: ${sh};
  }
  .ia-button.primary:hover {
    background-color: rgba(${xr}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${xr}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${xr}, 0.7);
  }

  .ia-button.danger {
    background-color: ${ah};
    border-color: ${nh};
  }
  .ia-button.danger:hover {
    background-color: rgba(${$r}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${$r}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${$r}, 0.7);
  }

  .ia-button.warning {
    background-color: ${ch};
    border-color: ${hh};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Cr}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Cr}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Cr}, 0.7);
  }

  .ia-button.dark {
    background-color: ${lh};
    border-color: ${dh};
  }
  .ia-button.dark:hover {
    background-color: rgba(${_r}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${_r}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${_r}, 0.7);
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
`;let Po=class extends P{constructor(){super(...arguments),this.items=[]}render(){return h`
      <ul>
        ${Pt(this.items,({title:e,date:t})=>h`
            <li>
              <span class="item-title">${e??"[untitled]"}</span>
              <span class="item-date">${t??""}</span>
            </li>
          `)}
      </ul>
      ${this.message?h`<p class="message">${this.message}</p>`:b}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${k("Remove items")}
        </button>
      </div>
    `}removeItemsBtnClicked(){this.dispatchEvent(new CustomEvent("confirm",{detail:{items:this.items}}))}static get styles(){return f`
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
    `}};n([c({type:Object})],Po.prototype,"items",void 0);n([c({type:String})],Po.prototype,"message",void 0);Po=n([R("remove-items-modal-content")],Po);let st=class extends P{constructor(){super(...arguments),this.label=k("Select items to remove"),this.selectedItems=[],this.showSelectAll=!1,this.showUnselectAll=!1,this.showItemManageButton=!1,this.removeAllowed=!1}render(){return h`
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
            ${k("Remove selected items")} (${this.selectedItems.length})...
          </button>
          ${Sr(this.showItemManageButton,()=>h` <button
                class="ia-button warning"
                ?disabled=${!this.removeAllowed}
                @click=${this.manageItemsClicked}
              >
                ${k("Item Manager the items")} (${this.selectedItems.length})
              </button>`)}
          <div class="selection-buttons">
            ${Sr(this.showSelectAll,()=>h` <button
                  class="ia-button link select-all-btn"
                  @click=${this.selectAllClicked}
                >
                  ${k("Select all")}
                </button>`)}
            ${Sr(this.showUnselectAll,()=>h` <button
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
    `,o=new Rt({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Are you sure you want to remove these items?")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:o,customModalContent:i,userClosedModalCallback:()=>{var s;(s=this.modalManager)===null||s===void 0||s.classList.remove("remove-items")}})}showRemoveItemsProcessingModal(){var e,t;const i=new Rt({showProcessingIndicator:!0,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Removing selected items...")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:i,userClosedModalCallback:()=>{var o;(o=this.modalManager)===null||o===void 0||o.classList.remove("remove-items")}})}showRemoveItemsErrorModal(){var e,t;const i=new Rt({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#691916",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Error: unable to remove items")}`,message:h`${k("An error occurred while removing items. Please try again in a few minutes.")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("remove-items"),(t=this.modalManager)===null||t===void 0||t.showModal({config:i,userClosedModalCallback:()=>{var o;(o=this.modalManager)===null||o===void 0||o.classList.remove("remove-items")}})}static get styles(){return f`
      ${ph}
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
    `}};n([c({type:String})],st.prototype,"label",void 0);n([c({type:Object})],st.prototype,"modalManager",void 0);n([c({type:Object})],st.prototype,"selectedItems",void 0);n([c({type:String})],st.prototype,"manageViewModalMsg",void 0);n([c({type:Boolean})],st.prototype,"showSelectAll",void 0);n([c({type:Boolean})],st.prototype,"showUnselectAll",void 0);n([c({type:Boolean})],st.prototype,"showItemManageButton",void 0);n([c({type:Boolean})],st.prototype,"removeAllowed",void 0);st=n([R("manage-bar")],st);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hi=(r,e)=>{var t,i;const o=r._$AN;if(o===void 0)return!1;for(const s of o)(i=(t=s)._$AO)===null||i===void 0||i.call(t,e,!1),Hi(s,e);return!0},Ro=r=>{let e,t;do{if((e=r._$AM)===void 0)break;t=e._$AN,t.delete(r),r=e}while((t==null?void 0:t.size)===0)},qn=r=>{for(let e;e=r._$AM;r=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(r))break;t.add(r),mh(e)}};function uh(r){this._$AN!==void 0?(Ro(this),this._$AM=r,qn(this)):this._$AM=r}function fh(r,e=!1,t=0){const i=this._$AH,o=this._$AN;if(o!==void 0&&o.size!==0)if(e)if(Array.isArray(i))for(let s=t;s<i.length;s++)Hi(i[s],!1),Ro(i[s]);else i!=null&&(Hi(i,!1),Ro(i));else Hi(this,r)}const mh=r=>{var e,t,i,o;r.type==We.CHILD&&((e=(i=r)._$AP)!==null&&e!==void 0||(i._$AP=fh),(t=(o=r)._$AQ)!==null&&t!==void 0||(o._$AQ=uh))};class vh extends wi{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,i){super._$AT(e,t,i),qn(this),this.isConnected=e._$AU}_$AO(e,t=!0){var i,o;e!==this.isConnected&&(this.isConnected=e,e?(i=this.reconnected)===null||i===void 0||i.call(this):(o=this.disconnected)===null||o===void 0||o.call(this)),t&&(Hi(this,e),Ro(this))}setValue(e){if(_n(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const kr=new WeakMap,gh=yi(class extends vh{render(r){return ee}update(r,[e]){var t;const i=e!==this.G;return i&&this.G!==void 0&&this.ot(void 0),(i||this.rt!==this.lt)&&(this.G=e,this.dt=(t=r.options)===null||t===void 0?void 0:t.host,this.ot(this.lt=r.element)),ee}ot(r){var e;if(typeof this.G=="function"){const t=(e=this.dt)!==null&&e!==void 0?e:globalThis;let i=kr.get(t);i===void 0&&(i=new WeakMap,kr.set(t,i)),i.get(this.G)!==void 0&&this.G.call(this.dt,void 0),i.set(this.G,r),r!==void 0&&this.G.call(this.dt,r)}else this.G.value=r}get rt(){var r,e,t;return typeof this.G=="function"?(e=kr.get((r=this.dt)!==null&&r!==void 0?r:globalThis))===null||e===void 0?void 0:e.get(this.G):(t=this.G)===null||t===void 0?void 0:t.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});var Gn=60,Yn=Gn*60,Qn=Yn*24,bh=Qn*7,ui=1e3,Tr=Gn*ui,qa=Yn*ui,yh=Qn*ui,wh=bh*ui,Ms="millisecond",ti="second",ii="minute",oi="hour",vt="day",wo="week",Ve="month",Kn="quarter",gt="year",ri="date",Sh="YYYY-MM-DDTHH:mm:ssZ",Ga="Invalid Date",xh=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$h=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const _h={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],i=e%100;return"["+e+(t[(i-20)%10]||t[i]||t[0])+"]"}};var ls=function(e,t,i){var o=String(e);return!o||o.length>=t?e:""+Array(t+1-o.length).join(i)+e},Ch=function(e){var t=-e.utcOffset(),i=Math.abs(t),o=Math.floor(i/60),s=i%60;return(t<=0?"+":"-")+ls(o,2,"0")+":"+ls(s,2,"0")},kh=function r(e,t){if(e.date()<t.date())return-r(t,e);var i=(t.year()-e.year())*12+(t.month()-e.month()),o=e.clone().add(i,Ve),s=t-o<0,a=e.clone().add(i+(s?-1:1),Ve);return+(-(i+(t-o)/(s?o-a:a-o))||0)},Th=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},Eh=function(e){var t={M:Ve,y:gt,w:wo,d:vt,D:ri,h:oi,m:ii,s:ti,ms:Ms,Q:Kn};return t[e]||String(e||"").toLowerCase().replace(/s$/,"")},Mh=function(e){return e===void 0};const Ah={s:ls,z:Ch,m:kh,a:Th,p:Eh,u:Mh};var Vi="en",It={};It[Vi]=_h;var Xn="$isDayjsObject",As=function(e){return e instanceof Go||!!(e&&e[Xn])},Oo=function r(e,t,i){var o;if(!e)return Vi;if(typeof e=="string"){var s=e.toLowerCase();It[s]&&(o=s),t&&(It[s]=t,o=s);var a=e.split("-");if(!o&&a.length>1)return r(a[0])}else{var l=e.name;It[l]=e,o=l}return!i&&o&&(Vi=o),o||!i&&Vi},ie=function(e,t){if(As(e))return e.clone();var i=typeof t=="object"?t:{};return i.date=e,i.args=arguments,new Go(i)},Dh=function(e,t){return ie(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},G=Ah;G.l=Oo;G.i=As;G.w=Dh;var Fh=function(e){var t=e.date,i=e.utc;if(t===null)return new Date(NaN);if(G.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var o=t.match(xh);if(o){var s=o[2]-1||0,a=(o[7]||"0").substring(0,3);return i?new Date(Date.UTC(o[1],s,o[3]||1,o[4]||0,o[5]||0,o[6]||0,a)):new Date(o[1],s,o[3]||1,o[4]||0,o[5]||0,o[6]||0,a)}}return new Date(t)},Go=function(){function r(t){this.$L=Oo(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[Xn]=!0}var e=r.prototype;return e.parse=function(i){this.$d=Fh(i),this.init()},e.init=function(){var i=this.$d;this.$y=i.getFullYear(),this.$M=i.getMonth(),this.$D=i.getDate(),this.$W=i.getDay(),this.$H=i.getHours(),this.$m=i.getMinutes(),this.$s=i.getSeconds(),this.$ms=i.getMilliseconds()},e.$utils=function(){return G},e.isValid=function(){return this.$d.toString()!==Ga},e.isSame=function(i,o){var s=ie(i);return this.startOf(o)<=s&&s<=this.endOf(o)},e.isAfter=function(i,o){return ie(i)<this.startOf(o)},e.isBefore=function(i,o){return this.endOf(o)<ie(i)},e.$g=function(i,o,s){return G.u(i)?this[o]:this.set(s,i)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(i,o){var s=this,a=G.u(o)?!0:o,l=G.p(i),d=function(D,M){var A=G.w(s.$u?Date.UTC(s.$y,M,D):new Date(s.$y,M,D),s);return a?A:A.endOf(vt)},u=function(D,M){var A=[0,0,0,0],O=[23,59,59,999];return G.w(s.toDate()[D].apply(s.toDate("s"),(a?A:O).slice(M)),s)},p=this.$W,m=this.$M,v=this.$D,y="set"+(this.$u?"UTC":"");switch(l){case gt:return a?d(1,0):d(31,11);case Ve:return a?d(1,m):d(0,m+1);case wo:{var x=this.$locale().weekStart||0,S=(p<x?p+7:p)-x;return d(a?v-S:v+(6-S),m)}case vt:case ri:return u(y+"Hours",0);case oi:return u(y+"Minutes",1);case ii:return u(y+"Seconds",2);case ti:return u(y+"Milliseconds",3);default:return this.clone()}},e.endOf=function(i){return this.startOf(i,!1)},e.$set=function(i,o){var s,a=G.p(i),l="set"+(this.$u?"UTC":""),d=(s={},s[vt]=l+"Date",s[ri]=l+"Date",s[Ve]=l+"Month",s[gt]=l+"FullYear",s[oi]=l+"Hours",s[ii]=l+"Minutes",s[ti]=l+"Seconds",s[Ms]=l+"Milliseconds",s)[a],u=a===vt?this.$D+(o-this.$W):o;if(a===Ve||a===gt){var p=this.clone().set(ri,1);p.$d[d](u),p.init(),this.$d=p.set(ri,Math.min(this.$D,p.daysInMonth())).$d}else d&&this.$d[d](u);return this.init(),this},e.set=function(i,o){return this.clone().$set(i,o)},e.get=function(i){return this[G.p(i)]()},e.add=function(i,o){var s=this,a;i=Number(i);var l=G.p(o),d=function(v){var y=ie(s);return G.w(y.date(y.date()+Math.round(v*i)),s)};if(l===Ve)return this.set(Ve,this.$M+i);if(l===gt)return this.set(gt,this.$y+i);if(l===vt)return d(1);if(l===wo)return d(7);var u=(a={},a[ii]=Tr,a[oi]=qa,a[ti]=ui,a)[l]||1,p=this.$d.getTime()+i*u;return G.w(p,this)},e.subtract=function(i,o){return this.add(i*-1,o)},e.format=function(i){var o=this,s=this.$locale();if(!this.isValid())return s.invalidDate||Ga;var a=i||Sh,l=G.z(this),d=this.$H,u=this.$m,p=this.$M,m=s.weekdays,v=s.months,y=s.meridiem,x=function(A,O,W,ae){return A&&(A[O]||A(o,a))||W[O].slice(0,ae)},S=function(A){return G.s(d%12||12,A,"0")},C=y||function(M,A,O){var W=M<12?"AM":"PM";return O?W.toLowerCase():W},D=function(A){switch(A){case"YY":return String(o.$y).slice(-2);case"YYYY":return G.s(o.$y,4,"0");case"M":return p+1;case"MM":return G.s(p+1,2,"0");case"MMM":return x(s.monthsShort,p,v,3);case"MMMM":return x(v,p);case"D":return o.$D;case"DD":return G.s(o.$D,2,"0");case"d":return String(o.$W);case"dd":return x(s.weekdaysMin,o.$W,m,2);case"ddd":return x(s.weekdaysShort,o.$W,m,3);case"dddd":return m[o.$W];case"H":return String(d);case"HH":return G.s(d,2,"0");case"h":return S(1);case"hh":return S(2);case"a":return C(d,u,!0);case"A":return C(d,u,!1);case"m":return String(u);case"mm":return G.s(u,2,"0");case"s":return String(o.$s);case"ss":return G.s(o.$s,2,"0");case"SSS":return G.s(o.$ms,3,"0");case"Z":return l}return null};return a.replace($h,function(M,A){return A||D(M)||l.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(i,o,s){var a=this,l=G.p(o),d=ie(i),u=(d.utcOffset()-this.utcOffset())*Tr,p=this-d,m=function(){return G.m(a,d)},v;switch(l){case gt:v=m()/12;break;case Ve:v=m();break;case Kn:v=m()/3;break;case wo:v=(p-u)/wh;break;case vt:v=(p-u)/yh;break;case oi:v=p/qa;break;case ii:v=p/Tr;break;case ti:v=p/ui;break;default:v=p;break}return s?v:G.a(v)},e.daysInMonth=function(){return this.endOf(Ve).$D},e.$locale=function(){return It[this.$L]},e.locale=function(i,o){if(!i)return this.$L;var s=this.clone(),a=Oo(i,o,!0);return a&&(s.$L=a),s},e.clone=function(){return G.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},r}(),Zn=Go.prototype;ie.prototype=Zn;[["$ms",Ms],["$s",ti],["$m",ii],["$H",oi],["$W",vt],["$M",Ve],["$y",gt],["$D",ri]].forEach(function(r){Zn[r[1]]=function(e){return this.$g(e,r[0],r[1])}});ie.extend=function(r,e){return r.$i||(r(e,Go,ie),r.$i=!0),ie};ie.locale=Oo;ie.isDayjs=As;ie.unix=function(r){return ie(r*1e3)};ie.en=It[Vi];ie.Ls=It;ie.p={};var Lh=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,i,o){return i||o.slice(1)})},zh={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},Bh=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(i,o,s){var a=s&&s.toUpperCase();return o||t[s]||zh[s]||Lh(t[a])})},Ph=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,Ya=/\d/,Bi=/\d\d/,Rh=/\d{3}/,Oh=/\d{4}/,Ie=/\d\d?/,Ih=/[+-]?\d+/,Nh=/[+-]\d\d:?(\d\d)?|Z/,Pi=/\d*[^-_:/,()\s\d]+/,wt={},Jn=function(e){return e=+e,e+(e>68?1900:2e3)};function Uh(r){if(!r||r==="Z")return 0;var e=r.match(/([+-]|\d\d)/g),t=+(e[1]*60)+(+e[2]||0);return t===0?0:e[0]==="+"?-t:t}var ye=function(e){return function(t){this[e]=+t}},Qa=[Nh,function(r){var e=this.zone||(this.zone={});e.offset=Uh(r)}],Er=function(e){var t=wt[e];return t&&(t.indexOf?t:t.s.concat(t.f))},Ka=function(e,t){var i,o=wt,s=o.meridiem;if(!s)i=e===(t?"pm":"PM");else for(var a=1;a<=24;a+=1)if(e.indexOf(s(a,0,t))>-1){i=a>12;break}return i},Hh={A:[Pi,function(r){this.afternoon=Ka(r,!1)}],a:[Pi,function(r){this.afternoon=Ka(r,!0)}],Q:[Ya,function(r){this.month=(r-1)*3+1}],S:[Ya,function(r){this.milliseconds=+r*100}],SS:[Bi,function(r){this.milliseconds=+r*10}],SSS:[Rh,function(r){this.milliseconds=+r}],s:[Ie,ye("seconds")],ss:[Ie,ye("seconds")],m:[Ie,ye("minutes")],mm:[Ie,ye("minutes")],H:[Ie,ye("hours")],h:[Ie,ye("hours")],HH:[Ie,ye("hours")],hh:[Ie,ye("hours")],D:[Ie,ye("day")],DD:[Bi,ye("day")],Do:[Pi,function(r){var e=wt,t=e.ordinal,i=r.match(/\d+/);if(this.day=i[0],!!t)for(var o=1;o<=31;o+=1)t(o).replace(/\[|\]/g,"")===r&&(this.day=o)}],w:[Ie,ye("week")],ww:[Bi,ye("week")],M:[Ie,ye("month")],MM:[Bi,ye("month")],MMM:[Pi,function(r){var e=Er("months"),t=Er("monthsShort"),i=(t||e.map(function(o){return o.slice(0,3)})).indexOf(r)+1;if(i<1)throw new Error;this.month=i%12||i}],MMMM:[Pi,function(r){var e=Er("months"),t=e.indexOf(r)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[Ih,ye("year")],YY:[Bi,function(r){this.year=Jn(r)}],YYYY:[Oh,ye("year")],Z:Qa,ZZ:Qa};function Vh(r){var e=r.afternoon;if(e!==void 0){var t=r.hours;e?t<12&&(r.hours+=12):t===12&&(r.hours=0),delete r.afternoon}}function Wh(r){r=Bh(r,wt&&wt.formats);for(var e=r.match(Ph),t=e.length,i=0;i<t;i+=1){var o=e[i],s=Hh[o],a=s&&s[0],l=s&&s[1];l?e[i]={regex:a,parser:l}:e[i]=o.replace(/^\[|\]$/g,"")}return function(d){for(var u={},p=0,m=0;p<t;p+=1){var v=e[p];if(typeof v=="string")m+=v.length;else{var y=v.regex,x=v.parser,S=d.slice(m),C=y.exec(S),D=C[0];x.call(u,D),d=d.replace(D,"")}}return Vh(u),u}}var jh=function(e,t,i,o){try{if(["x","X"].indexOf(t)>-1)return new Date((t==="X"?1e3:1)*e);var s=Wh(t),a=s(e),l=a.year,d=a.month,u=a.day,p=a.hours,m=a.minutes,v=a.seconds,y=a.milliseconds,x=a.zone,S=a.week,C=new Date,D=u||(!l&&!d?C.getDate():1),M=l||C.getFullYear(),A=0;l&&!d||(A=d>0?d-1:C.getMonth());var O=p||0,W=m||0,ae=v||0,ze=y||0;if(x)return new Date(Date.UTC(M,A,D,O,W,ae,ze+x.offset*60*1e3));if(i)return new Date(Date.UTC(M,A,D,O,W,ae,ze));var ge;return ge=new Date(M,A,D,O,W,ae,ze),S&&(ge=o(ge).week(S).toDate()),ge}catch{return new Date("")}};const qh=function(r,e,t){t.p.customParseFormat=!0,r&&r.parseTwoDigitYear&&(Jn=r.parseTwoDigitYear);var i=e.prototype,o=i.parse;i.parse=function(s){var a=s.date,l=s.utc,d=s.args;this.$u=l;var u=d[1];if(typeof u=="string"){var p=d[2]===!0,m=d[3]===!0,v=p||m,y=d[2];m&&(y=d[2]),wt=this.$locale(),!p&&y&&(wt=t.Ls[y]),this.$d=jh(a,u,l,t),this.init(),y&&y!==!0&&(this.$L=this.locale(y).$L),v&&a!=this.format(u)&&(this.$d=new Date("")),wt={}}else if(u instanceof Array)for(var x=u.length,S=1;S<=x;S+=1){d[1]=u[S-1];var C=t.apply(this,d);if(C.isValid()){this.$d=C.$d,this.$L=C.$L,this.init();break}S===x&&(this.$d=new Date(""))}else o.call(this,s)}};function Gh(r,e){const t=e.prototype,i=t.parse;t.parse=function(o){const s=o.date,a=o.args[1];i.call(this,o);const l=this.year(),d=l>=1900&&l<2e3,u=typeof a=="string"&&a.includes("YYYY"),p=Array.isArray(a)&&typeof a[0]=="string"&&a[0].includes("YYYY"),m=u||p,v=typeof s=="string"&&!s.includes(`${l}`);d&&m&&v&&(this.$d.setFullYear(l-1900),this.init())}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xa=yi(class extends wi{constructor(r){if(super(r),r.type!==We.PROPERTY&&r.type!==We.ATTRIBUTE&&r.type!==We.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!_n(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===De||e===ee)return e;const t=r.element,i=r.name;if(r.type===We.PROPERTY){if(e===t[i])return De}else if(r.type===We.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(i))return De}else if(r.type===We.ATTRIBUTE&&t.getAttribute(i)===e+"")return De;return Cn(r),e}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const el="important",Yh=" !"+el,tl=yi(class extends wi{constructor(r){var e;if(super(r),r.type!==We.ATTRIBUTE||r.name!=="style"||((e=r.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((e,t)=>{const i=r[t];return i==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(r,[e]){const{style:t}=r.element;if(this.ht===void 0){this.ht=new Set;for(const i in e)this.ht.add(i);return this.render(e)}this.ht.forEach(i=>{e[i]==null&&(this.ht.delete(i),i.includes("-")?t.removeProperty(i):t[i]="")});for(const i in e){const o=e[i];if(o!=null){this.ht.add(i);const s=typeof o=="string"&&o.endsWith(Yh);i.includes("-")||s?t.setProperty(i,s?o.slice(0,-11):o,s?el:""):t[i]=o}}return De}});ie.extend(qh);ie.extend(Gh);const Qh=180,Kh=40,Xh=10,Zh=125,Jh=30,Za="YYYY",e0="no data",t0=0,i0="item",Ja=4,o0={linear:r=>r,logarithmic:r=>Math.log1p(r)},r0=f`var(--histogramDateRangeSliderColor, #4B65FE)`,s0=f`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,a0=f`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,n0=f`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,l0=f`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,d0=f`var(--histogramDateRangeInputRowMargin, 0)`,c0=f`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,h0=f`var(--histogramDateRangeInputWidth, 35px)`,p0=f`var(--histogramDateRangeInputFontSize, 1.2rem)`,u0=f`var(--histogramDateRangeInputFontFamily, sans-serif)`,en=f`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,tn=f`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,f0=f`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,m0=f`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let q=class extends P{constructor(){super(...arguments),this.width=Qh,this.height=Kh,this.sliderWidth=Xh,this.tooltipWidth=Zh,this.tooltipHeight=Jh,this.updateDelay=t0,this.dateFormat=Za,this.missingDataMessage=e0,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this.tooltipLabel=i0,this.barScaling="logarithmic",this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,i=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(i)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(i)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("width")||e.has("height")||e.has("binSnapping")||e.has("barScaling"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(e){return Math.ceil(e/1e3)*1e3}snapToMonth(e){const t=ie(e),i=t.date()<16?0:1;return t.add(i,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(e){const t=ie(e),i=t.month()<6?0:1;return t.add(i,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(e){switch(this.binSnapping){case"year":return this.snapToYear(e);case"month":return this.snapToMonth(e);case"none":default:return this.snapToNextSecond(e)}}get barScalingFunction(){return typeof this.barScaling=="string"?o0[this.barScaling]:this.barScaling}calculateHistData(){const{bins:e,height:t,dateRangeMS:i,_numBins:o,_minDateMS:s}=this,a=Math.min(...this.bins),l=Math.max(...this.bins),d=a===l?1:this.barScalingFunction(l),u=t/d,p=i/o;return e.map((m,v)=>{const y=this.snapTimestamp(v*p+s),x=this.formatDate(y),S=this.snapTimestamp((v+1)*p+s)+this.snapEndOffset,C=this.formatDate(S),D=this.formatDate(y,this.tooltipDateFormat),M=this.formatDate(S,this.tooltipDateFormat),A=D===M?D:`${D} - ${M}`;return{value:m,height:Math.floor(this.barScalingFunction(m)*u),binStart:x,binEnd:C,tooltip:A}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;case"none":default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){var e;return(e=this._tooltipDateFormat)!==null&&e!==void 0?e:this.dateFormat}set tooltipDateFormat(e){this._tooltipDateFormat=e}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t<=this.getMSFromString(this.maxSelectedDate);i&&o&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),i=!Number.isNaN(t),o=t>=this.getMSFromString(this.minSelectedDate);i&&o&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),t=this.translateDateToPosition(this.formatDate(e));return this.validMaxSliderX(t)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){var t,i;if(this._isDragging||this.disabled)return;const o=e.currentTarget,s=o.x.baseVal.value+this.sliderWidth/2,a=o.dataset,l=`${this.tooltipLabel}${a.numItems!=="1"?"s":""}`,d=Number(a.numItems).toLocaleString(),u=2,m=9+this.tooltipHeight,v=this.getBoundingClientRect(),y=v.x+s,x=v.y;this._tooltipOffsetX=y-u+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=x-m+window.scrollY,this._tooltipContent=h`
      ${d} ${l}<br />
      ${a.tooltip}
    `,(i=(t=this._tooltip).showPopover)===null||i===void 0||i.call(t)}hideTooltip(){var e,t;this._tooltipContent=void 0,(t=(e=this._tooltip).hidePopover)===null||t===void 0||t.call(e)}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,i=this.getBoundingClientRect().x;this._dragOffset=e.clientX-i-t}translatePositionToDate(e){const t=this.snapToNextSecond((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,i){return Math.min(Math.max(e,t),i)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const o=new Date(0,0);return o.setFullYear(Number(t)),o.getTime()}return ie(t,[this.dateFormat,Za]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,i=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,o=Math.abs(i-this.getMSFromString(this.minSelectedDate)),s=Math.abs(i-this.getMSFromString(this.maxSelectedDate));o<s?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=Ja,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=Ja,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,i){const o=t==="slider-min"?1:-1,s=je({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return N`
    <svg
      id=${t}
      class=${s}
      @pointerdown=${this.drag}
    >
      <path d="${i} z" fill="${r0}" />
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
    `}get selectedRangeTemplate(){return N`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${s0}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let i=this.sliderWidth;return this._histData.map(o=>{const{minSelectedDate:s,maxSelectedDate:a}=this,l=o.height,d=this.isBefore(o.binEnd,s),u=this.isAfter(o.binStart,a),p=d||u?l0:a0,m=`stroke-dasharray: 0 ${t} ${l} ${t} 0 ${l}`,v=N`
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
          data-num-items=${o.value}
          data-bin-start=${o.binStart}
          data-bin-end=${o.binEnd}
          data-tooltip=${o.tooltip}
        />
        <rect
          class="bar"
          style=${m}
          x=${i}
          y=${this.height-l}
          width=${t}
          height=${l}
          fill=${p}
        />`;return i+=e,v})}isBefore(e,t){const i=this.getMSFromString(e),o=this.getMSFromString(t);return i<o}isAfter(e,t){const i=this.getMSFromString(e),o=this.getMSFromString(t);return i>o}formatDate(e,t=this.dateFormat){if(Number.isNaN(e))return"";const i=ie(e);return i.year()<1e3?i.year(199999).format(t).replace(/199999/g,i.year().toString()):i.format(t)}get minInputTemplate(){return h`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${Xa(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return h`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${Xa(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return h`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return h`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){const e=tl({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`});return h`
      <div id="tooltip" style=${e} popover>${this._tooltipContent}</div>
    `}get noDataTemplate(){return h`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?h`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:b}render(){return this.hasBinData?h`
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
    `:this.noDataTemplate}};q.styles=f`
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
      --activityIndicatorLoadingRingColor: ${n0};
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
      background: ${en};
      margin: 0;
      border: 0;
      color: ${tn};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${f0};
      font-family: ${m0};
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
      border: 5px solid ${tn};
      border-color: ${en} transparent transparent
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
      margin: ${d0};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${h0};
      margin: 0 3px;
      border: ${c0};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${p0};
      font-family: ${u0};
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
  `;n([c({type:Number})],q.prototype,"width",void 0);n([c({type:Number})],q.prototype,"height",void 0);n([c({type:Number})],q.prototype,"sliderWidth",void 0);n([c({type:Number})],q.prototype,"tooltipWidth",void 0);n([c({type:Number})],q.prototype,"tooltipHeight",void 0);n([c({type:Number})],q.prototype,"updateDelay",void 0);n([c({type:String})],q.prototype,"dateFormat",void 0);n([c({type:String})],q.prototype,"missingDataMessage",void 0);n([c({type:String})],q.prototype,"minDate",void 0);n([c({type:String})],q.prototype,"maxDate",void 0);n([c({type:Boolean})],q.prototype,"disabled",void 0);n([c({type:Array})],q.prototype,"bins",void 0);n([c({type:Boolean})],q.prototype,"updateWhileFocused",void 0);n([c({type:String})],q.prototype,"binSnapping",void 0);n([c({type:String})],q.prototype,"tooltipLabel",void 0);n([c({type:String})],q.prototype,"barScaling",void 0);n([F()],q.prototype,"_tooltipOffsetX",void 0);n([F()],q.prototype,"_tooltipOffsetY",void 0);n([F()],q.prototype,"_tooltipContent",void 0);n([F()],q.prototype,"_tooltipDateFormat",void 0);n([F()],q.prototype,"_isDragging",void 0);n([F()],q.prototype,"_isLoading",void 0);n([H("#tooltip")],q.prototype,"_tooltip",void 0);n([c({type:String})],q.prototype,"tooltipDateFormat",null);n([c({type:Boolean})],q.prototype,"loading",null);n([c()],q.prototype,"minSelectedDate",null);n([c()],q.prototype,"maxSelectedDate",null);q=n([R("histogram-date-range")],q);const Wi=N`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,ji=N`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let re=class extends P{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.displayMode="button",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return h`
      <div id="container">
        ${this.displayMode==="vote-prompt"?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e??this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted&&this.displayMode==="button"||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,o=window.innerHeight,s=i/2,a=o/2;e.left<s?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>i&&(this.popupTopX=i-t.width),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.cancel(e)}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get singleButtonDisplay(){return h`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${Wi}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${ji}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return h`
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
            ${Wi}
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
            ${ji}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            Leave a comment
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return h`
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
                ${Wi}
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
                ${ji}
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
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="up"?void 0:"up",this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="down"?void 0:"down",this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e==null||e.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=h`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");const t=this.isOpen;this.processing=!0;try{const i=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:i})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error=h`There was an error submitting your feedback.`}catch(i){this.error=h`There was an error submitting your feedback.<br />Error:
        ${i instanceof Error?i.message:i}`}this.processing=!1}static get styles(){const e=f`var(--featureFeedbackBlueColor, #194880)`,t=f`var(--featureFeedbackDarkGrayColor, #767676)`,i=f`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,o=f`var(--featureFeedbackBackdropZindex, 5)`,s=f`var(--featureFeedbackModalZindex, 6)`,a=f`var(--featureFeedbackPopupBorderColor, ${e})`,l=f`var(--featureFeedbackSubmitButtonColor, ${e})`,d=f`var(--featureFeedbackBetaButtonBorderColor, ${e})`,u=f`var(--featureFeedbackBetaButtonTextColor, ${e})`,p=f`var(--featureFeedbackBetaButtonSvgFilter, ${i})`,m=f`var(--featureFeedbackCancelButtonColor, #515151)`,v=f`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,y=f`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,x=f`var(--featureFeedbackPromptFontWeight, bold)`,S=f`var(--featureFeedbackPromptFontSize, 1.4rem)`,C=f`var(--featureFeedbackCommentButtonFontWeight, normal)`,D=f`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`,M=f`var(--defaultColor, ${t});`,A=f`var(--defaultColorSvgFilter, ${i});`,O=f`var(--upvoteColor, #23765D);`,W=f`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,ae=f`var(--downvoteColor, #720D11);`,ze=f`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,ge=f`var(--unselectedColor, #CCCCCC);`,he=f`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return f`
      #container {
        display: inline-block;
      }

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
        filter: ${p};
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
        z-index: ${o};
        background-color: ${v};
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
        border: 1px ${a} solid;
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

      .prompt {
        display: flex;
        align-items: center;
        font-size: ${S};
        font-weight: ${x};
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
        border-color: ${M};
      }

      .vote-button.noselection svg {
        filter: ${A};
      }

      .vote-button.unselected {
        border-color: ${ge};
      }

      .vote-button.unselected svg {
        filter: ${he};
      }

      .upvote-button.selected {
        border-color: ${O};
      }

      .upvote-button.selected svg {
        filter: ${W};
      }

      .downvote-button.selected {
        border-color: ${ae};
      }

      .downvote-button.selected svg {
        filter: ${ze};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${C};
        font-size: ${D};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};n([c({type:String})],re.prototype,"featureIdentifier",void 0);n([c({type:String})],re.prototype,"prompt",void 0);n([c({type:String})],re.prototype,"buttonText",void 0);n([c({type:String})],re.prototype,"displayMode",void 0);n([c({type:Object})],re.prototype,"recaptchaManager",void 0);n([c({type:Object})],re.prototype,"resizeObserver",void 0);n([c({type:Boolean})],re.prototype,"disabled",void 0);n([c({type:Object})],re.prototype,"featureFeedbackService",void 0);n([F()],re.prototype,"isOpen",void 0);n([F()],re.prototype,"processing",void 0);n([F()],re.prototype,"popupTopX",void 0);n([F()],re.prototype,"popupTopY",void 0);n([F()],re.prototype,"vote",void 0);n([F()],re.prototype,"voteSubmitted",void 0);n([F()],re.prototype,"error",void 0);n([F()],re.prototype,"voteNeedsChoosing",void 0);n([F()],re.prototype,"recaptchaWidget",void 0);n([H("#container")],re.prototype,"container",void 0);n([H("#popup")],re.prototype,"popup",void 0);n([H("#comments")],re.prototype,"comments",void 0);re=n([R("feature-feedback")],re);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v0=r=>typeof r!="string"&&"strTag"in r,g0=(r,e,t)=>{let i=r[0];for(let o=1;o<r.length;o++)i+=e[o-1],i+=r[o];return i};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b0=r=>v0(r)?g0(r.strings,r.values):r;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class y0{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */for(let r=0;r<256;r++)(r>>4&15).toString(16)+(r&15).toString(16);/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let w0=new y0;w0.resolve();/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let qe=b0;const on=f`var(--white, #fff)`,S0=f`var(--ia-theme-link-color, #4b64ff)`,x0=f`var(--primaryDisableCTAFill, #767676)`,$0=f`var(--secondaryCTABorder, #999)`,_0=f`var(--primaryCTAFill, #194880)`,Mr=f`var(--primaryCTAFillRGB, 25, 72, 128)`,C0=f`var(--primaryCTABorder, #c5d1df)`,k0=f`var(--primaryErrorCTAFill, #d9534f)`,Ar=f`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,T0=f`var(--primaryErrorCTABorder, #d43f3a)`,E0=f`var(--secondaryCTAFill, #333)`,Dr=f`var(--secondaryCTAFillRGB, 51, 51, 51)`,M0=f`var(--primaryCTABorder, #979797)`,A0=f`var(---primaryWarningFill, #ee8950)`,Fr=f`var(--primaryWarningFillRGB, 238, 137, 80)`,D0=f`var(--primaryWarningBorder, #ec7939)`,F0=f`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${on};
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
    outline-color: ${on};
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
    background-color: ${x0};
    border: 1px solid ${$0};
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
    background-color: ${_0};
    border-color: ${C0};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Mr}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Mr}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Mr}, 0.7);
  }

  .ia-button.danger {
    background-color: ${k0};
    border-color: ${T0};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Ar}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Ar}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Ar}, 0.7);
  }

  .ia-button.warning {
    background-color: ${A0};
    border-color: ${D0};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Fr}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Fr}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Fr}, 0.7);
  }

  .ia-button.dark {
    background-color: ${E0};
    border-color: ${M0};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Dr}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Dr}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Dr}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: ${S0};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;f`
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
`;function rn(r){return"disabled"in r&&typeof r.disabled=="boolean"}function L0(r){return"numbered"in r&&typeof r.numbered=="boolean"}function z0(r){return"validate"in r&&typeof r.validate=="function"}function B0(r){return"response"in r&&typeof r.response=="object"&&r.response!==null&&"name"in r.response&&typeof r.response.name=="string"}class P0 extends Error{}async function Lr(r,e,t="Operation timed out"){const i=new Promise((o,s)=>setTimeout(s,e,new P0(t)));return Promise.race([r,i])}var Ft;let Z=Ft=class extends P{constructor(){super(...arguments),this.buttonText="Feedback",this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState="idle",this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key==="Escape"&&this.cancel(e)}}render(){return h`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has("submissionState")&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}updated(e){(e.has("showQuestionNumbers")||e.has("assignedElements"))&&this.applyQuestionNumbers();const t=e.get("submissionState");t&&(this.submissionState==="error"||t==="error")&&this.positionPopup(),e.has("isOpen")&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(rn).forEach(e=>{e.dataset.originallyDisabled=e.disabled?"true":"false",e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(rn).forEach(e=>{const{originallyDisabled:t}=e.dataset;if(t===void 0)return;const i=t==="true";delete e.dataset.originallyDisabled,e.disabled=i})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener("keyup",this.handleEscape)}removeEscapeListener(){document.removeEventListener("keyup",this.handleEscape)}setupScrollObserver(){document.addEventListener("scroll",this.handleScroll)}stopScrollObserver(){document.removeEventListener("scroll",this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){const t=e??this.resizeObserver;t==null||t.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState("idle"),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent("submissionStateChanged",{detail:this.submissionState}))}get isProcessing(){return this.submissionState==="processing"}get isSubmitted(){return this.submissionState==="submitted"}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),i=window.innerWidth,o=window.innerHeight,s=i/2,a=o/2,l=5,d=5;e.left<s?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>i&&(this.popupTopX=i-t.width-l),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>o&&(this.popupTopY=o-t.height-d),this.popupTopX=Math.max(l,this.popupTopX),this.popupTopY=Math.max(d,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?h`
      <span class="beta-button-icon">${Wi}</span>
      <span class="beta-button-icon">${ji}</span>
    `:b}get feedbackButtonCheckTemplate(){return h`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return h`
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
    `}get popupTemplate(){const e=this.isProcessing||this.isSubmitted,t=this.isProcessing?Ft.SUBMIT_BUTTON_PROCESSING_TEXT:Ft.SUBMIT_BUTTON_NORMAL_TEXT,i=this.error?h`<div id="error">${this.error}</div>`:b,o=tl({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),s=a=>a.stopPropagation();return h`
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
          style=${o}
        >
          <h2 id="survey-heading" class="sr-only">${qe("Feedback Survey")}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${s}
            @keydown=${s}
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
                ${qe("Cancel")}
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
    `}focusFirstFormElement(){const e=this.getRootNode();for(const t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(t=>{var i;(i=t.querySelector("[slot=question-number]"))===null||i===void 0||i.remove()});return}let e=1;this.assignedElements.filter(t=>L0(t)&&t.numbered).forEach(t=>{let i=t.querySelector("[slot=question-number]");i||(i=document.createElement("span"),i.setAttribute("slot","question-number")),i.textContent=`${e}. `,t.append(i),e+=1})}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(z0).map(e=>e.validate()).every(e=>e)}async submit(e){if(e==null||e.preventDefault(),!this.validate()){this.error=h`${Ft.ERROR_MESSAGE_MISSING_REQUIRED_INPUT}`,this.setSubmissionState("error");return}const{surveyIdentifier:t,submitTimeout:i,featureFeedbackService:o}=this;if(this.error=void 0,!t)throw new Error("surveyIdentifier is required");if(!o)throw new Error("featureFeedbackService is required");const s=this.getRecaptchaWidget();let a;try{a=await Lr(s,i)}catch(d){throw new Error(`recaptchaWidget load failed: ${d}`)}if(!a)throw new Error("recaptchaWidget is required");const l=this.isOpen;this.setSubmissionState("processing");try{const d=await Lr(a.execute(),i);(await Lr(o.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(B0).map(p=>p.response),recaptchaToken:d}),i)).success?(this.setSubmissionState("submitted"),l&&this.closePopup()):(this.error=h`${Ft.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}`,this.setSubmissionState("error"))}catch(d){this.error=h`${Ft.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}
        <br />
        ${qe("Error: ")}${d instanceof Error?d.message:d}`,this.setSubmissionState("error")}}static get styles(){const e=f`var(--featureFeedbackBlueColor, #194880)`,t=f`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,i=f`var(--featureFeedbackBackdropZindex, 5)`,o=f`var(--featureFeedbackModalZindex, 6)`,s=f`var(--featureFeedbackPopupMaxWidth, 300px)`,a=f`var(--featureFeedbackPopupVerticalPadding, 10px)`,l=f`var(--featureFeedbackPopupHorizontalPadding, 10px)`,d=f`
      ${a} ${l}
    `,u=f`var(--featureFeedbackPopupBorderColor, ${e})`,p=f`var(--featureFeedbackBetaButtonBorderColor, ${e})`,m=f`var(--featureFeedbackBetaButtonTextColor, ${e})`,v=f`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,y=f`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,x=f`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`,S=f`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,C=f`
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
        filter: ${v};
      }

      .beta-button-icon.success {
        filter: ${S};
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
        background-color: ${y};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        max-width: ${s};
        max-height: calc(100vh - 2 * ${a} - 10px);
        padding: ${d};
        border: 1px ${u} solid;
        border-radius: 5px;
        background-color: ${x};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${o};
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
    `;return[F0,C]}};Z.SUBMIT_BUTTON_NORMAL_TEXT=qe("Submit feedback");Z.SUBMIT_BUTTON_PROCESSING_TEXT=qe("Submitting...");Z.ERROR_MESSAGE_MISSING_REQUIRED_INPUT=qe("Please respond to the indicated questions.");Z.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED=qe("There was an error submitting your feedback.");n([c({type:String})],Z.prototype,"surveyIdentifier",void 0);n([c({type:String})],Z.prototype,"buttonText",void 0);n([c({type:Boolean})],Z.prototype,"showButtonThumbs",void 0);n([c({type:Boolean})],Z.prototype,"showQuestionNumbers",void 0);n([c({type:Boolean})],Z.prototype,"disabled",void 0);n([c({type:Number})],Z.prototype,"submitTimeout",void 0);n([c({type:Object})],Z.prototype,"featureFeedbackService",void 0);n([c({type:Object})],Z.prototype,"recaptchaManager",void 0);n([c({type:Object})],Z.prototype,"resizeObserver",void 0);n([F()],Z.prototype,"isOpen",void 0);n([F()],Z.prototype,"submissionState",void 0);n([F()],Z.prototype,"popupTopX",void 0);n([F()],Z.prototype,"popupTopY",void 0);n([F()],Z.prototype,"error",void 0);n([H("#container")],Z.prototype,"container",void 0);n([H("#popup")],Z.prototype,"popup",void 0);n([H("#cancel-button")],Z.prototype,"cancelButton",void 0);n([H("#submit-button")],Z.prototype,"submitButton",void 0);n([id()],Z.prototype,"assignedElements",void 0);Z=Ft=n([R("ia-feedback-survey")],Z);var So;let Le=So=class extends P{constructor(){super(),this.prompt="",this.value="",this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return h`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||!!this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A comment is required."),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){if(!this.prompt)return b;const e=this.numbered?h`<slot name="question-number"></slot>`:b;return h`<div id="prompt-text">${e}${this.prompt}</div>`}get commentBoxTemplate(){var e;const t=this.required?So.DEFAULT_PLACEHOLDER_REQUIRED:So.DEFAULT_PLACEHOLDER_OPTIONAL,i=(e=this.placeholder)!==null&&e!==void 0?e:t;return h`
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
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=f`var(--commentHeight, 50px)`,t=f`var(--commentResize, none)`,i=f`var(--surveyQuestionMargin, 0 0 15px 0)`,o=f`var(--featureFeedbackPromptFontWeight, bold)`,s=f`var(--featureFeedbackPromptFontSize, 1.4rem)`;return f`
      #container {
        margin: ${i};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${s};
        font-weight: ${o};
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
    `}};Le.DEFAULT_PLACEHOLDER_REQUIRED=qe("Comments");Le.DEFAULT_PLACEHOLDER_OPTIONAL=qe("Comments (optional)");Le.formAssociated=!0;Le.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0};n([c({type:String})],Le.prototype,"prompt",void 0);n([c({type:String})],Le.prototype,"value",void 0);n([c({type:Boolean,reflect:!0})],Le.prototype,"required",void 0);n([c({type:Boolean,reflect:!0})],Le.prototype,"disabled",void 0);n([c({type:Boolean,reflect:!0})],Le.prototype,"skipNumber",void 0);n([c({type:String})],Le.prototype,"placeholder",void 0);n([H("#comments")],Le.prototype,"commentBox",void 0);Le=So=n([R("ia-survey-comment")],Le);var xo;let Ce=xo=class extends P{constructor(){super(),this.prompt="",this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return h`
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
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A vote is required."),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){var e;return{...(e=this.commentBox)===null||e===void 0?void 0:e.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){if(!this.prompt)return b;const e=this.numbered?h`<slot name="question-number"></slot>`:b;return h`<div id="prompt-text">${e}${this.prompt}</div>`}get voteButtonsTemplate(){const e=this.vote==="up",t=this.vote==="down",o={"vote-button":!0,noselection:this.vote===void 0},s=je({...o,selected:e,unselected:t}),a=je({...o,selected:t,unselected:e});return h`
      <label
        id="upvote"
        class=${s}
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
        ${Wi}
        <span class="sr-only">${xo.UPVOTE_SR_LABEL}</span>
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
        ${ji}
        <span class="sr-only">${xo.DOWNVOTE_SR_LABEL}</span>
      </label>
    `}get commentFieldTemplate(){var e;return this.showComments?h`
      <ia-survey-comment
        id="comments"
        skipNumber
        .value=${(e=this.comment)!==null&&e!==void 0?e:""}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-survey-comment>
    `:b}upvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection("up")}downvoteButtonSelected(){this.handleVoteButtonSelection("down")}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){var t;e.stopPropagation(),!this.disabled&&(this.comment=(t=this.commentBox)===null||t===void 0?void 0:t.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=f`var(--surveyQuestionMargin, 0 0 15px 0)`,t=f`var(--featureFeedbackDarkGrayColor, #767676)`,i=f`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,o=f`var(--defaultColor, ${t})`,s=f`var(--defaultColorSvgFilter, ${i})`,a=f`var(--upvoteColor, #23765D)`,l=f`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,d=f`var(--downvoteColor, #720D11)`,u=f`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`,p=f`var(--unselectedColor, #CCCCCC)`,m=f`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,v=f`var(--featureFeedbackPromptFontWeight, bold)`,y=f`var(--featureFeedbackPromptFontSize, 1.4rem)`;return f`
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
        font-size: ${y};
        font-weight: ${v};
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
        border-color: ${o};
      }

      .vote-button.noselection svg {
        filter: ${s};
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
        filter: ${u};
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
    `}};Ce.UPVOTE_SR_LABEL=qe("Vote up");Ce.DOWNVOTE_SR_LABEL=qe("Vote down");Ce.formAssociated=!0;Ce.shadowRootOptions={...P.shadowRootOptions,delegatesFocus:!0};n([c({type:String})],Ce.prototype,"prompt",void 0);n([c({type:String})],Ce.prototype,"vote",void 0);n([c({type:String})],Ce.prototype,"comment",void 0);n([c({type:String})],Ce.prototype,"commentPlaceholder",void 0);n([c({type:Boolean,reflect:!0})],Ce.prototype,"required",void 0);n([c({type:Boolean,reflect:!0})],Ce.prototype,"disabled",void 0);n([c({type:Boolean,reflect:!0})],Ce.prototype,"skipNumber",void 0);n([c({type:Boolean,reflect:!0})],Ce.prototype,"showComments",void 0);n([H("#comments")],Ce.prototype,"commentBox",void 0);Ce=xo=n([R("ia-survey-vote")],Ce);let Io=class extends P{constructor(){super(...arguments),this.name="",this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return b}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};n([c({type:String,reflect:!0})],Io.prototype,"name",void 0);n([c({type:String,reflect:!0})],Io.prototype,"value",void 0);Io=n([R("ia-survey-extra")],Io);const R0=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`;let ke=class extends P{constructor(){super(...arguments),this.binSnapping="none",this.barScaling="logarithmic",this.boundEscapeListener=e=>{e.key==="Escape"&&this.closeModal()}}render(){var e,t,i;return h`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${(e=this.minSelectedDate)!==null&&e!==void 0?e:this.minDate}
          .maxSelectedDate=${(t=this.maxSelectedDate)!==null&&t!==void 0?t:this.maxDate}
          dateFormat=${Ee(this.customDateFormat)}
          tooltipDateFormat=${Ee(this.customTooltipDateFormat)}
          tooltipLabel=${Ee(this.customTooltipLabel)}
          .binSnapping=${this.binSnapping}
          .barScaling=${(i=this.barScaling)!==null&&i!==void 0?i:b}
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
            ${k("Apply date range")}
          </button>
        </histogram-date-range>
      </div>
    `}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupEscapeListener()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener("keydown",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keydown",this.boundEscapeListener)}histogramDateRangeUpdated(e){this.minSelectedDate=e.detail.minDate,this.maxSelectedDate=e.detail.maxDate}applyBtnClicked(){var e;const t=new CustomEvent("histogramDateRangeApplied",{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(t),this.closeModal(),(e=this.analyticsHandler)===null||e===void 0||e.sendEvent({category:rt.default,action:te.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent("modalClosed")))}static get styles(){return f`
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
    `}};n([c({type:String})],ke.prototype,"minDate",void 0);n([c({type:String})],ke.prototype,"maxDate",void 0);n([c({type:String})],ke.prototype,"minSelectedDate",void 0);n([c({type:String})],ke.prototype,"maxSelectedDate",void 0);n([c({type:Array})],ke.prototype,"buckets",void 0);n([c({type:String})],ke.prototype,"customDateFormat",void 0);n([c({type:String})],ke.prototype,"customTooltipDateFormat",void 0);n([c({type:String})],ke.prototype,"customTooltipLabel",void 0);n([c({type:String})],ke.prototype,"binSnapping",void 0);n([c({type:String})],ke.prototype,"barScaling",void 0);n([c({type:Object,attribute:!1})],ke.prototype,"modalManager",void 0);n([c({type:Object,attribute:!1})],ke.prototype,"analyticsHandler",void 0);ke=n([R("expanded-date-picker")],ke);const O0=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,I0=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`;let fi=class extends P{constructor(){super(...arguments),this.step=2,this.currentPage=1,this.pages=[]}firstUpdated(){this.observePageCount()}updated(e){e.has("size")&&this.observePageCount(),e.has("currentPage")&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];const e=7,t=this.size<=e;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(s=>s+1);return}if(this.size===e){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(t&&this.currentPage>1&&this.currentPage<e){this.pages=[...Array(this.size).keys()].map(s=>s+1);return}let i=this.currentPage-this.step,o=this.currentPage+this.step;i<=0&&(o+=-i+1,i=1),o>=this.size&&(i=Math.max(i-(o-this.size),1),o=this.size),i===2&&(o-=1),o===this.size-1&&(i+=1),this.createFirstNode(i),this.createMiddelNode(i,o),this.createLastNode(o)}createFirstNode(e){var t,i;e>1&&((t=this.pages)===null||t===void 0||t.push(1)),e>2&&((i=this.pages)===null||i===void 0||i.push(0))}createMiddelNode(e,t){var i;for(let o=e;o<=t;o+=1)(i=this.pages)===null||i===void 0||i.push(o)}createLastNode(e){var t,i;e<this.size-1&&((t=this.pages)===null||t===void 0||t.push(0)),e<this.size&&((i=this.pages)===null||i===void 0||i.push(this.size))}get getEllipsisTemplate(){return h`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent("pageNumberClicked",{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){this.currentPage-=1,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(e){this.currentPage=e}getPageTemplate(e){return h`
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
          ${O0}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${I0}
        </button>
      </div>
    `}static get styles(){return[at,f`
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
      `]}};n([c({type:Number})],fi.prototype,"size",void 0);n([c({type:Number})],fi.prototype,"step",void 0);n([c({type:Number})],fi.prototype,"currentPage",void 0);n([F()],fi.prototype,"pages",void 0);fi=n([R("more-facets-pagination")],fi);const N0=N`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,U0=N`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`;var ds;let Zi=ds=class extends P{render(){return h`${this.facetRowTemplate}`}get facetRowTemplate(){var e,t,i,o;const{bucket:s,facetType:a}=this;if(!s||!a)return b;const l=`${a}:${s.key}-show-only`,d=`${a}:${s.key}-negative`,u=s.extraNote?h`<span class="facet-note">${s.extraNote}</span>`:b,p=a!=="collection"?h`${(e=s.displayText)!==null&&e!==void 0?e:s.key} ${u}`:h`<a href="/details/${s.key}">
            ${(i=(t=this.collectionTitles)===null||t===void 0?void 0:t.get(s.key))!==null&&i!==void 0?i:s.key}
          </a> `,m=s.state==="hidden",v=s.state==="selected",y=`${a}: ${(o=s.displayText)!==null&&o!==void 0?o:s.key}`,x=v?`Show all ${a}s`:`Only show ${y}`,S=`Hide ${y}`,C=`Unhide ${y}`,D=m?C:S,M=`${y}, ${s.count} results`;return h`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${a}
            .value=${s.key}
            @click=${A=>{this.facetClicked(A,!1)}}
            .checked=${v}
            class="select-facet-checkbox"
            title=${x}
            id=${l}
            data-testid=${l}
          />
          <div class="hide-facet-container">
            <input
              type="checkbox"
              id=${d}
              .name=${a}
              .value=${s.key}
              @click=${A=>{this.facetClicked(A,!0)}}
              .checked=${m}
              class="hide-facet-checkbox"
            />
            <label
              for=${d}
              class="hide-facet-icon${m?" active":""}"
              title=${D}
              data-testid=${d}
            >
              <span class="sr-only">${D}</span>
              <span class="eye eye-open">${N0}</span>
              <span class="eye eye-closed">${U0}</span>
            </label>
          </div>
        </div>
        <label
          for=${l}
          class="facet-info-display"
          title=${x}
          aria-label=${M}
        >
          <div class="facet-title">${p}</div>
          <div class="facet-count">${s.count.toLocaleString()}</div>
        </label>
      </div>
    `}facetClicked(e,t){const{bucket:i,facetType:o}=this;if(!i||!o)return;const s=e.target,{checked:a}=s;this.bucket={...i,state:ds.getFacetState(a,t)},this.dispatchFacetClickEvent({facetType:o,bucket:this.bucket,negative:t})}dispatchFacetClickEvent(e){const t=new CustomEvent("facetClick",{detail:e});this.dispatchEvent(t)}static getFacetState(e,t){let i;return e?i=t?"hidden":"selected":i="none",i}static get styles(){const e=f`var(--facet-row-border-top, 1px solid transparent)`,t=f`var(--facet-row-border-bottom, 1px solid transparent)`,i=f`15px`,o=f`
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: ${i};
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: ${i};
        width: ${i};
        margin: 0;
      }
      .facet-row-container {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 0 auto;
        padding: 0.25rem 0;
        height: auto;
        border-top: ${e};
        border-bottom: ${t};
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
        width: ${i};
        height: ${i};
        cursor: pointer;
        display: flex;
      }
      .eye {
        width: ${i};
        height: ${i};
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
    `;return[at,o]}};n([c({type:String})],Zi.prototype,"facetType",void 0);n([c({type:Object})],Zi.prototype,"bucket",void 0);n([c({type:Object})],Zi.prototype,"collectionTitles",void 0);Zi=ds=n([R("facet-row")],Zi);let No=class extends P{facetClicked(e){this.dispatchFacetClickEvent(e.detail)}dispatchFacetClickEvent(e){const t=new CustomEvent("facetClick",{detail:e,composed:!0});this.dispatchEvent(t)}get facetsTemplate(){const{facetGroup:e}=this;if(!e)return b;const t=e.buckets;return h`
      <div class="facet-rows" data-testid="facets-on-${e.key}">
        ${Ss(t,i=>`${e.key}:${i.key}`,i=>h`<facet-row
              .facetType=${e.key}
              .bucket=${i}
              .collectionTitles=${this.collectionTitles}
              @facetClick=${this.facetClicked}
            ></facet-row>`)}
      </div>
    `}render(){return h`${this.facetsTemplate}`}static get styles(){const e=f`var(--facetsColumnCount, 1)`,t=f`var(--facetsColumnGap, 15px)`;return f`
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
    `}};n([c({type:Object})],No.prototype,"facetGroup",void 0);n([c({type:Object})],No.prototype,"collectionTitles",void 0);No=n([R("facets-template")],No);let St=class extends P{constructor(){super(...arguments),this.leftValue="",this.rightValue="",this.side="left"}render(){var e,t;return h`
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
    `}get value(){return this.side==="left"?this.leftValue:this.rightValue}get selectedLabel(){var e,t;return this.side==="left"?(e=this.leftLabel)!==null&&e!==void 0?e:this.leftValue:(t=this.rightLabel)!==null&&t!==void 0?t:this.rightValue}handleClick(){this.side=this.side==="left"?"right":"left",this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?"left":"right",this.emitChangeEvent()}emitChangeEvent(){const e=new CustomEvent("change",{detail:this.value});this.dispatchEvent(e)}static get styles(){const e=f`var(--switchWidth, 30px)`,t=f`var(--switchHeight, 14px)`,i=f`var(--switchMarginLeft, 5px)`,o=f`var(--switchMarginRight, 5px)`,s=f`var(--switchBorderWidth, 3px)`,a=f`var(--switchBgColor, #194880)`,l=f`var(--switchBorderColor, #194880)`,d=f`var(--labelFontSize, 1.3rem)`,u=f`var(--knobColor, white)`,p=f`var(--knobTransitionDuration, 0.25s)`,m=f`var(--knobTransitionFn, ease)`;return[at,f`
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
          border: ${s} solid ${l};
          border-radius: ${t};
          box-sizing: content-box;
          background: ${a};
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
          transition: transform ${p} ${m};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};n([c({type:String,attribute:!0})],St.prototype,"leftValue",void 0);n([c({type:String,attribute:!0})],St.prototype,"leftLabel",void 0);n([c({type:String,attribute:!0})],St.prototype,"rightValue",void 0);n([c({type:String,attribute:!0})],St.prototype,"rightLabel",void 0);n([c({type:String,attribute:!0})],St.prototype,"side",void 0);n([H("#switch-left")],St.prototype,"leftRadio",void 0);St=n([R("toggle-switch")],St);const H0=1e4,V0=35;let se=class extends P{constructor(){super(...arguments),this.facetsPerPage=V0,this.facetsLoading=!0,this.sortedBy=j.COUNT,this.isTvSearch=!1,this.unappliedFacetChanges=ht(),this.pageNumber=1}willUpdate(e){(e.has("aggregations")||e.has("facetsPerPage")||e.has("sortedBy")||e.has("selectedFacets")||e.has("unappliedFacetChanges"))&&(this.facetGroup=this.mergedFacets)}updated(e){(e.has("facetKey")||e.has("query")||e.has("searchType")||e.has("filterMap"))&&(this.facetsLoading=!0,this.pageNumber=1,this.sortedBy=Ui[this.facetKey],this.updateSpecificFacets())}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener("keydown",e=>{var t;e.key==="Escape"&&((t=this.modalManager)===null||t===void 0||t.closeModal())}):document.removeEventListener("keydown",()=>{})}get isSearchResultsPage(){var e;const t=(e=this.pageSpecifierParams)===null||e===void 0?void 0:e.pageType;return t===void 0||t==="search_results"}async updateSpecificFacets(){var e,t,i,o,s,a;if(!this.facetKey)return;const l=(e=this.query)===null||e===void 0?void 0:e.trim();if(!l&&this.isSearchResultsPage)return;const d={simpleParams:[this.facetKey]},u=H0,p={...this.pageSpecifierParams,query:l||"",identifiers:this.identifiers,filters:this.filterMap,aggregations:d,aggregationsSize:u,rows:0},m=await((t=this.searchService)===null||t===void 0?void 0:t.search(p,this.searchType));this.aggregations=(i=m==null?void 0:m.success)===null||i===void 0?void 0:i.response.aggregations,this.facetsLoading=!1;const v=(s=(o=m==null?void 0:m.success)===null||o===void 0?void 0:o.response)===null||s===void 0?void 0:s.collectionTitles;if(v)for(const[y,x]of Object.entries(v))(a=this.collectionTitles)===null||a===void 0||a.set(y,x)}pageNumberClicked(e){var t,i;const o=(t=e==null?void 0:e.detail)===null||t===void 0?void 0:t.page;o&&(this.pageNumber=Number(o)),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:rt.default,action:te.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){var e;if(!this.facetKey||!this.selectedFacets)return;const{selectedFacetGroup:t,aggregationFacetGroup:i}=this;if(!i)return;const o={...t??i},s=(e=t==null?void 0:t.buckets.map(l=>{const d=i.buckets.find(u=>u.key===l.key);return d?{...l,count:d.count}:l}))!==null&&e!==void 0?e:[];zn(s,this.sortedBy),i.buckets.forEach(l=>{t!=null&&t.buckets.find(u=>u.key===l.key)||s.push(l)});const a=this.unappliedFacetChanges[this.facetKey];for(const[l,d]of s.entries()){const u=a==null?void 0:a[d.key];u&&(s[l]={...u})}return this.facetKey==="creator"&&this.isTvSearch&&s.forEach(l=>{var d,u,p;l.displayText=(u=(d=l.displayText)!==null&&d!==void 0?d:l.key)===null||u===void 0?void 0:u.toLocaleUpperCase();const m=(p=this.tvChannelAliases)===null||p===void 0?void 0:p.get(l.displayText);m&&m!==l.displayText&&(l.extraNote=`(${m})`)}),o.buckets=s,o}get selectedFacetGroup(){if(!this.selectedFacets||!this.facetKey)return;const e=this.selectedFacets[this.facetKey];if(!e)return;const t=Do[this.facetKey],i=Object.entries(e).map(([o,s])=>({displayText:o,key:o,count:s==null?void 0:s.count,state:s==null?void 0:s.state}));return{title:t,key:this.facetKey,buckets:i}}get aggregationFacetGroup(){if(!this.aggregations||!this.facetKey)return;const e=this.aggregations[this.facetKey];if(!e)return;const t=Do[this.facetKey];let i=e.getSortedBuckets(this.sortedBy);this.facetKey==="collection"&&(i=i==null?void 0:i.filter(s=>{var a;const l=(a=s==null?void 0:s.key)===null||a===void 0?void 0:a.toString();return!jo[l]&&!(l!=null&&l.startsWith("fav-"))}));const o=i.map(s=>{const a=`${s.key}`;return{displayText:`${a}`,key:`${a}`,count:s.doc_count,state:"none"}});return{title:t,key:this.facetKey,buckets:o}}get facetGroupForCurrentPage(){const{facetGroup:e}=this;if(!e)return;const t=(this.pageNumber-1)*this.facetsPerPage,i=e.buckets.slice(t,t+this.facetsPerPage);return{...e,buckets:i}}get moreFacetsTemplate(){return h`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${e=>{this.facetKey&&(this.unappliedFacetChanges=Cs(this.unappliedFacetChanges,this.facetKey,e.detail.bucket))}}
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
        </div> `:b}sortFacetAggregation(e){this.sortedBy=e,this.dispatchEvent(new CustomEvent("sortedFacets",{detail:this.sortedBy}))}get modalHeaderTemplate(){var e,t,i;const s=((e=this.sortedBy)!==null&&e!==void 0?e:Ui[this.facetKey])===j.COUNT?"left":"right";return h`<span class="sr-only">${k("More facets for:")}</span>
      <span class="title">
        ${(t=this.facetGroup)===null||t===void 0?void 0:t.title}

        <label class="sort-label">${k("Sort by:")}</label>
        ${this.facetKey?h`<toggle-switch
              class="sort-toggle"
              leftValue=${j.COUNT}
              leftLabel="Count"
              rightValue=${Cd[this.facetKey]}
              .rightLabel=${(i=this.facetGroup)===null||i===void 0?void 0:i.title}
              side=${s}
              @change=${a=>{this.sortFacetAggregation(Number(a.detail))}}
            ></toggle-switch>`:b}
      </span>`}render(){return h`
      ${this.facetsLoading?this.loaderTemplate:h`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){var e,t;const i=Ln(this.selectedFacets,this.unappliedFacetChanges),o=new CustomEvent("facetsChanged",{detail:i,bubbles:!0,composed:!0});this.dispatchEvent(o),this.unappliedFacetChanges=ht(),(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:rt.default,action:`${te.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){var e,t;this.unappliedFacetChanges=ht(),(e=this.modalManager)===null||e===void 0||e.closeModal(),(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:rt.default,action:te.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){const e=f`var(--primaryButtonBGColor, #194880)`;return[at,f`
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
      `]}};n([c({type:String})],se.prototype,"facetKey",void 0);n([c({type:String})],se.prototype,"query",void 0);n([c({type:Array})],se.prototype,"identifiers",void 0);n([c({type:Object})],se.prototype,"filterMap",void 0);n([c({type:Number})],se.prototype,"searchType",void 0);n([c({type:Object})],se.prototype,"pageSpecifierParams",void 0);n([c({type:Object})],se.prototype,"collectionTitles",void 0);n([c({type:Object})],se.prototype,"tvChannelAliases",void 0);n([c({type:Number})],se.prototype,"facetsPerPage",void 0);n([c({type:Boolean})],se.prototype,"facetsLoading",void 0);n([c({type:Object})],se.prototype,"selectedFacets",void 0);n([c({type:Number})],se.prototype,"sortedBy",void 0);n([c({type:Boolean})],se.prototype,"isTvSearch",void 0);n([c({type:Object})],se.prototype,"modalManager",void 0);n([c({type:Object})],se.prototype,"searchService",void 0);n([c({type:Object,attribute:!1})],se.prototype,"analyticsHandler",void 0);n([F()],se.prototype,"aggregations",void 0);n([F()],se.prototype,"facetGroup",void 0);n([F()],se.prototype,"unappliedFacetChanges",void 0);n([F()],se.prototype,"pageNumber",void 0);se=n([R("more-facets-content")],se);let sn=class extends P{render(){return h`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return f`
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
    `}};sn=n([R("facet-tombstone-row")],sn);let V=class extends P{constructor(){super(...arguments),this.moreLinksVisible=!0,this.facetsLoading=!1,this.histogramAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.allowExpandingDatePicker=!1,this.suppressMediatypeFacets=!1,this.parentCollections=[],this.collectionPagePath="/details/",this.isManageView=!1,this.isTvSearch=!1,this.facetDisplayOrder=En,this.openFacets={subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1,program:!1,person:!1,sponsor:!1},this.allowedFacetCount=6,this.handleExpandedDatePickerClosed=()=>{var e;(e=this.modalManager)===null||e===void 0||e.classList.remove("expanded-date-picker")},this.histogramDateRangeUpdated=e=>{const{minDate:t,maxDate:i}=e.detail,o=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:t,maxDate:i}});this.dispatchEvent(o)}}render(){const e=je({loading:this.facetsLoading,managing:this.isManageView}),t="date-picker-label";return h`
      <div id="container" class=${e}>
        ${this.showHistogramDatePicker&&(this.histogramAggregation||this.histogramAggregationLoading)?h`
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
          ${Pt(this.parentCollections,i=>{var o,s;const a=`${this.baseNavigationUrl}${this.collectionPagePath}${i}`;return h` <li>
              <a
                href=${a}
                data-id=${i}
                @click=${this.partOfCollectionClicked}
              >
                ${(s=(o=this.collectionTitles)===null||o===void 0?void 0:o.get(i))!==null&&s!==void 0?s:i}
              </a>
            </li>`})}
        </ul>
      </section>
    `}partOfCollectionClicked(e){var t;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:rt.default,action:te.partOfCollectionClicked,label:e.target.dataset.id})}get histogramProps(){var e,t,i,o,s,a;const{histogramAggregation:l}=this;if(!l)return;const d=(e=l.first_bucket_year)!==null&&e!==void 0?e:l.first_bucket_key,u=(t=l.last_bucket_year)!==null&&t!==void 0?t:l.last_bucket_key;if(d==null||u==null)return;const p=(i=l.first_bucket_month)!==null&&i!==void 0?i:1,m=(o=l.last_bucket_month)!==null&&o!==void 0?o:12,v=(s=l.interval)!==null&&s!==void 0?s:1,y=(a=l.interval_in_months)!==null&&a!==void 0?a:12,x=S=>S.toString().padStart(2,"0");if(this.isTvSearch){const S=y<12;return{buckets:l.buckets,dateFormat:"YYYY-MM",tooltipDateFormat:S?"MMM YYYY":"YYYY",tooltipLabel:"broadcast",binSnapping:S?"month":"year",barScaling:"linear",minDate:`${d}-${x(p)}`,maxDate:`${u}-${x(m+y-1)}`}}return{buckets:l.buckets,dateFormat:"YYYY",tooltipDateFormat:"YYYY",tooltipLabel:"item",binSnapping:"year",barScaling:"logarithmic",minDate:`${d}`,maxDate:`${u+v-1}`}}showDatePickerModal(){var e,t,i;const{histogramProps:o}=this;if(!o)return;const{buckets:s,dateFormat:a,tooltipDateFormat:l,tooltipLabel:d,binSnapping:u,barScaling:p,minDate:m,maxDate:v}=o,x=h`
      <expanded-date-picker
        ${gh(C=>{if(C&&C instanceof ke){const D=C;D.minSelectedDate=this.minSelectedDate,D.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${m}
        .maxDate=${v}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .customDateFormat=${a}
        .customTooltipDateFormat=${l}
        .customTooltipLabel=${d}
        .binSnapping=${u}
        .barScaling=${p}
        .buckets=${s}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,S=new Rt({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`${k("Select a date range")}`});(e=this.modalManager)===null||e===void 0||e.classList.add("expanded-date-picker"),(t=this.modalManager)===null||t===void 0||t.showModal({config:S,customModalContent:x,userClosedModalCallback:this.handleExpandedDatePickerClosed}),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:rt.default,action:te.histogramExpanded,label:window.location.href})}updated(e){e.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?h`<button
          class="expand-date-picker-btn"
          aria-hidden="true"
          tabindex="-1"
          @click=${this.showDatePickerModal}
        >
          ${R0}
        </button>`:b}get histogramTemplate(){var e,t;if(this.histogramAggregationLoading)return h` <div class="histogram-loading-indicator">&hellip;</div> `;const{histogramProps:i}=this;if(!i)return b;const{buckets:o,dateFormat:s,tooltipDateFormat:a,tooltipLabel:l,binSnapping:d,barScaling:u,minDate:p,maxDate:m}=i;return h`
      <histogram-date-range
        class=${this.isTvSearch?"wide-inputs":""}
        .minDate=${p}
        .maxDate=${m}
        .minSelectedDate=${(e=this.minSelectedDate)!==null&&e!==void 0?e:p}
        .maxSelectedDate=${(t=this.maxSelectedDate)!==null&&t!==void 0?t:m}
        .updateDelay=${100}
        .dateFormat=${s}
        .tooltipDateFormat=${a}
        .tooltipLabel=${l}
        .binSnapping=${d}
        .barScaling=${u}
        .bins=${o}
        missingDataMessage="..."
        .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}get mergedFacets(){const e=[];return this.facetDisplayOrder.forEach(t=>{var i,o;if(t==="mediatype"&&this.suppressMediatypeFacets)return;const s=this.selectedFacetGroups.find(p=>p.key===t),a=this.aggregationFacetGroups.find(p=>p.key===t);if(s&&!a){e.push(s);return}if(!a)return;const l=s??a;let d=(i=s==null?void 0:s.buckets.map(p=>{const m=a.buckets.find(v=>v.key===p.key);return m?{...p,count:m.count}:p}))!==null&&i!==void 0?i:[];a.buckets.forEach(p=>{d.find(v=>v.key===p.key)||d.push(p)});let u=(o=Object.keys((s==null?void 0:s.buckets)||[]))===null||o===void 0?void 0:o.length;if(u<this.allowedFacetCount&&(u=this.allowedFacetCount),t==="lending"&&(d=d.filter(p=>kd[p.key])),zn(d,Ui[t]),t==="mediatype"){const p=d.findIndex(m=>m.key==="collection");if(p>=u){const[m]=d.splice(p,1);u>this.allowedFacetCount&&(u+=1),d.splice(u-1,0,m)}}t==="creator"&&this.isTvSearch&&d.forEach(p=>{var m,v,y;p.displayText=(v=(m=p.displayText)!==null&&m!==void 0?m:p.key)===null||v===void 0?void 0:v.toLocaleUpperCase();const x=(y=this.tvChannelAliases)===null||y===void 0?void 0:y.get(p.displayText);x&&x!==p.displayText&&(p.extraNote=`(${x})`)}),l.buckets=d.slice(0,u),e.push(l)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([t,i])=>{const o=t,s=Do[o],a=Object.entries(i).map(([l,d])=>{var u;let p=l;return o==="lending"&&(p=(u=_a[l])!==null&&u!==void 0?u:l),{displayText:p,key:l,count:d.count,state:d.state}});return{title:s,key:o,buckets:a}}):[]}get aggregationFacetGroups(){var e;const t=[];return Object.entries((e=this.aggregations)!==null&&e!==void 0?e:[]).forEach(([i,o])=>{if(["year_histogram","date_histogram"].includes(i))return;const s=i,a=Do[s];if(!a)return;let l=o.getSortedBuckets(Ui[s]);s==="collection"&&(l=l==null?void 0:l.filter(p=>{var m;const v=(m=p==null?void 0:p.key)===null||m===void 0?void 0:m.toString();return!jo[v]&&!(v!=null&&v.startsWith("fav-"))}));const d=l.map(p=>{var m;const v=p.key;let y=`${p.key}`;return s==="lending"&&(y=(m=_a[p.key])!==null&&m!==void 0?m:`${p.key}`),{displayText:y,key:`${v}`,count:p.doc_count,state:"none"}}),u={title:a,key:s,buckets:d};t.push(u)}),t}getFacetGroupTemplate(e){if(!this.facetsLoading&&e.buckets.length===0)return b;const{key:t}=e,i=this.openFacets[t],o=h`
      <span class="collapser ${i?"open":""}"> ${Gr} </span>
    `,s=()=>{const l={...this.openFacets};l[t]=!i,this.openFacets=l},a=`facet-group-header-label-${e.key}`;return h`
      <section
        class="facet-group ${this.collapsableFacets?"mobile":""}"
        aria-labelledby=${a}
        data-testid=${a}
      >
        <div class="facet-group-header">
          <h3
            id=${a}
            @click=${s}
            @keyup=${s}
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
      ${Pt(Array(5).fill(null),()=>h`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(e){if(!this.moreLinksVisible||e.key==="lending"||Object.keys(e.buckets).length<this.allowedFacetCount)return b;const t=Ui[e.key];return h`<button
      class="more-link"
      @click=${()=>{var i;this.showMoreFacetsModal(e,t),(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:rt.default,action:te.showMoreFacetsModal,label:e.key}),this.dispatchEvent(new CustomEvent("showMoreFacets",{detail:e.key}))}}
      data-testid="more-link-btn"
    >
      More...
    </button>`}async showMoreFacetsModal(e,t){var i,o;const s=h`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${e.key}
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
        .sortedBy=${t}
        .isTvSearch=${this.isTvSearch}
        @facetsChanged=${l=>{const d=new CustomEvent("facetsChanged",{detail:l.detail,bubbles:!0,composed:!0});this.dispatchEvent(d)}}
      >
      </more-facets-content>
    `,a=new Rt({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:h`Select filters`});(i=this.modalManager)===null||i===void 0||i.classList.add("more-search-facets"),(o=this.modalManager)===null||o===void 0||o.showModal({config:a,customModalContent:s,userClosedModalCallback:()=>{var l;(l=this.modalManager)===null||l===void 0||l.classList.remove("more-search-facets")}})}getFacetTemplate(e){return h`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${e}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${t=>{this.selectedFacets=Cs(this.selectedFacets,e.key,t.detail.bucket,!0);const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(i)}}
      ></facets-template>
    `}static get styles(){return[at,f`
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

        .expand-date-picker-btn > svg {
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
      `]}};n([c({type:Object})],V.prototype,"searchService",void 0);n([c({type:Number})],V.prototype,"searchType",void 0);n([c({type:Object})],V.prototype,"aggregations",void 0);n([c({type:Object})],V.prototype,"histogramAggregation",void 0);n([c({type:String})],V.prototype,"minSelectedDate",void 0);n([c({type:String})],V.prototype,"maxSelectedDate",void 0);n([c({type:Boolean})],V.prototype,"moreLinksVisible",void 0);n([c({type:Boolean})],V.prototype,"facetsLoading",void 0);n([c({type:Boolean})],V.prototype,"histogramAggregationLoading",void 0);n([c({type:Object})],V.prototype,"selectedFacets",void 0);n([c({type:Boolean})],V.prototype,"collapsableFacets",void 0);n([c({type:Number})],V.prototype,"contentWidth",void 0);n([c({type:Boolean})],V.prototype,"showHistogramDatePicker",void 0);n([c({type:Boolean})],V.prototype,"allowExpandingDatePicker",void 0);n([c({type:Boolean})],V.prototype,"suppressMediatypeFacets",void 0);n([c({type:String})],V.prototype,"query",void 0);n([c({type:Array})],V.prototype,"identifiers",void 0);n([c({type:Object})],V.prototype,"pageSpecifierParams",void 0);n([c({type:Array})],V.prototype,"parentCollections",void 0);n([c({type:Object})],V.prototype,"filterMap",void 0);n([c({type:String})],V.prototype,"baseNavigationUrl",void 0);n([c({type:String})],V.prototype,"collectionPagePath",void 0);n([c({type:Boolean})],V.prototype,"isManageView",void 0);n([c({type:Boolean})],V.prototype,"isTvSearch",void 0);n([c({type:Array})],V.prototype,"facetDisplayOrder",void 0);n([c({type:Object,attribute:!1})],V.prototype,"modalManager",void 0);n([c({type:Object,attribute:!1})],V.prototype,"resizeObserver",void 0);n([c({type:Object,attribute:!1})],V.prototype,"featureFeedbackService",void 0);n([c({type:Object,attribute:!1})],V.prototype,"recaptchaManager",void 0);n([c({type:Object,attribute:!1})],V.prototype,"analyticsHandler",void 0);n([c({type:Object,attribute:!1})],V.prototype,"collectionTitles",void 0);n([c({type:Object,attribute:!1})],V.prototype,"tvChannelAliases",void 0);n([F()],V.prototype,"openFacets",void 0);V=n([R("collection-facets")],V);let an=class extends P{render(){return h`
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
    `}};an=n([R("circular-activity-indicator")],an);function W0(r,e){return r===void 0?e!==void 0:e===void 0?r!==void 0:r.facetType===e.facetType&&r.bucketKey===e.bucketKey}function cs(r,e){return r.label===e.label&&r.facets.length===e.facets.length&&r.facets.every((t,i)=>W0(t,e.facets[i]))}function il(r){if(!Array.isArray(r[0])){let o=[...r];for(let s=0;s<o.length;s++){const a=o[s];o=o.filter(l=>a===l||!cs(a,l))}return o}const e=r,t=[];for(const i of e){const o=[];for(const s of i)t.find(l=>l.find(d=>cs(s,d)))||o.push(s);o.length>0&&t.push(o)}return t}class Ds{async getRecommendedFacets(){const e=navigator.language,t=Ds.getLanguageDisplayName(e);return t?[{facets:[{facetType:"language",bucketKey:t}]}]:[]}static getLanguageDisplayName(e){const t=e.split("-")[0];return new Intl.DisplayNames(["en"],{type:"language"}).of(t)}}const Mt={facets:[{facetType:"mediatype",bucketKey:"texts"}]},At={facets:[{facetType:"mediatype",bucketKey:"audio"}]},Jt={facets:[{facetType:"mediatype",bucketKey:"movies"}]},mt={facets:[{facetType:"mediatype",bucketKey:"image"}]},Ri={facets:[{facetType:"mediatype",bucketKey:"software"}]},zr={facets:[{facetType:"mediatype",bucketKey:"etree"}]},j0={facets:[{facetType:"mediatype",bucketKey:"web"}]},q0={facets:[{facetType:"mediatype",bucketKey:"data"}]},G0={text:[Mt],book:[Mt],novel:[Mt],magazine:[Mt],newspaper:[Mt],pdf:[Mt],epub:[Mt],audio:[At],song:[At],music:[At],listen:[At],podcast:[At],radio:[At],stream:[At,Jt],video:[Jt],movie:[Jt],film:[Jt],animation:[Jt],youtube:[Jt],image:[mt],photo:[mt],picture:[mt],painting:[mt],jpg:[mt],jpeg:[mt],png:[mt],gif:[mt],software:[Ri],app:[Ri],program:[Ri],game:[Ri],arcade:[Ri],etree:[zr],concert:[zr],"live music":[zr],"web crawl":[j0],dataset:[q0]};class Y0{async getRecommendedFacets(e){const t=[];for(const[i,o]of Object.entries(G0))e.includes(i)&&t.push(...o);return t}}const uo=[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],nn=[{label:"Films by __QUERY",facets:[{facetType:"mediatype",bucketKey:"movies"},{facetType:"creator",bucketKey:"__QUERY"}]}],Oi=[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],fo=[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],Ii=[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],Q0={"written work":uo,literature:uo,book:uo,novel:uo,filmmaker:nn,director:nn,author:Oi,writer:Oi,novelist:Oi,essayist:Oi,poet:Oi,"visual artist":fo,"graphic artist":fo,photographer:fo,painter:fo,singer:Ii,songwriter:Ii,musician:Ii,composer:Ii,pianist:Ii};class K0{constructor(){this.WIKIDATA_BASE_URL="https://www.wikidata.org/w/api.php",this.WIKIDATA_DEFAULT_ARGS="?action=wbsearchentities&format=json&language=en&uselang=en&origin=*&type=item&limit=5"}getWikidataURL(e){const t=encodeURIComponent(e);return`${this.WIKIDATA_BASE_URL}${this.WIKIDATA_DEFAULT_ARGS}&search=${t}`}replaceQueryPlaceholders(e,t){return e.map(i=>{var o;return{label:(o=i.label)===null||o===void 0?void 0:o.replace("__QUERY",t),facets:i.facets.map(s=>{var a;const l={...s,bucketKey:s.bucketKey.replace("__QUERY",t.toLowerCase())};return s.displayText&&(l.displayText=(a=l.displayText)===null||a===void 0?void 0:a.replace("__QUERY",t)),l})}})}async getRecommendedFacets(e){var t;const i=[];try{const o=this.getWikidataURL(e),a=await(await fetch(o)).json();for(const[l,d]of Object.entries(Q0))if(new RegExp(`\\b${l}\\b`).test((t=a.search[0])===null||t===void 0?void 0:t.description)){const p=a.search[0].label;i.push(...this.replaceQueryPlaceholders(d,p))}return i}catch(o){return console.warn(o),[]}}}class Yo{async getRecommendedFacets(e,t=Yo.DEFAULT_HEURISTICS){const i=t.map(o=>new o().getRecommendedFacets(e));return il((await Promise.all(i)).flat())}}Yo.DEFAULT_HEURISTICS=[Y0,K0,Ds];const X0=h`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m 91.666668,8.3333328 v 0.9708343 l -35.3625,39.2916669 -2.137502,2.375 v 3.195832 32.350001 L 45.833334,82.35 V 54.166666 50.970834 l -2.1375,-2.375 L 8.3333328,9.3041671 V 8.3333328 H 91.666668 M 100,0 H 0 V 12.5 L 37.500001,54.166666 V 87.5 l 25,12.5 V 54.166666 L 100,12.5 Z"
      fill="#000"
    />
  </svg>
`,Z0=N`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m50 0c27.6142375 0 50 22.3857625 50 50s-22.3857625 50-50 50-50-22.3857625-50-50 22.3857625-50 50-50zm23.8159475 26.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362 18.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113l18.0989475 18.0988362-18.0989475 18.0988362c-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113 1.4033215 1.4033215 3.5816761 1.5592461 5.1572272.4677738l.5598841-.4677738 18.0988362-18.0989475 18.0988362 18.0989475.5598841.4677738c1.5755511 1.0914723 3.7539057.9355477 5.1572272-.4677738 1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113l-18.0989475-18.0988362 18.0989475-18.0988362c1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113z" fill-rule="evenodd"/></svg>
`;function J0(r){return r&&r.charAt(0).toLocaleUpperCase()+r.slice(1)}let Ji=class extends P{constructor(){super(...arguments),this.selected=!1}render(){var e,t;if(!this.facetInfo)return b;const i=this.facetInfo.facets.length===1,o=this.facetInfo.facets[0],s=J0((this.labelPrefix?`${this.labelPrefix} `:"")+((t=(e=this.facetInfo.label)!==null&&e!==void 0?e:o.displayText)!==null&&t!==void 0?t:o.bucketKey));if(!s)return b;const a=i&&o.facetType==="mediatype"?In[o.bucketKey].icon:b;return h`
      <a
        class="smart-facet-button ${this.selected?"selected":""}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${a} ${s}
        ${this.selected?h`<span class="unselect-button">${Z0}</span>`:b}
      </a>
    `}get href(){const e=new URL(window.location.href);if(this.facetInfo)for(const t of this.facetInfo.facets)e.searchParams.append("and[]",encodeURIComponent(`${t.facetType}:"${t.bucketKey}"`));return e.toString()}facetClicked(e){e.preventDefault(),this.facetInfo&&(this.selected=!this.selected,this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:this.facetInfo,details:this.facetInfo.facets.map(t=>({facetType:t.facetType,bucket:{key:t.bucketKey,count:0,state:this.selected?"selected":"none"},negative:!1}))}})))}static get styles(){return f`
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
    `}};n([c({type:Object})],Ji.prototype,"facetInfo",void 0);n([c({type:String})],Ji.prototype,"labelPrefix",void 0);n([c({type:Boolean})],Ji.prototype,"selected",void 0);Ji=n([R("smart-facet-button")],Ji);let mi=class extends P{render(){var e,t;if(!this.facetInfo||!this.activeFacetRef||this.facetInfo.length===0)return b;const i=(e=this.activeFacetRef.displayText)!==null&&e!==void 0?e:this.activeFacetRef.bucketKey;return i?h`
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
            >${(t=this.labelPrefix)!==null&&t!==void 0?t:b} ${i}</span
          >
        </ia-dropdown>
      </div>
    `:b}get dropdownOptions(){var e,t;return(t=(e=this.facetInfo)===null||e===void 0?void 0:e.map(i=>{var o,s;const a=i.facets[0];return{id:a.bucketKey,label:h`<span>
            ${(s=(o=i.label)!==null&&o!==void 0?o:a.displayText)!==null&&s!==void 0?s:a.bucketKey}
          </span>`}}))!==null&&t!==void 0?t:[]}get activeDropdownOption(){if(this.activeFacetRef)return this.dropdownOptions.find(e=>{var t;return e.id===((t=this.activeFacetRef)===null||t===void 0?void 0:t.bucketKey)})}defaultOptionSelected(){var e;this.handleSelection((e=this.activeFacetRef)===null||e===void 0?void 0:e.bucketKey)}optionSelected(e){this.handleSelection(e.detail.option.id)}handleSelection(e){if(!e||!this.facetInfo||!this.activeFacetRef)return;let t;for(const i of this.facetInfo){const o=i.facets.find(s=>s.bucketKey===e);o&&(this.activeFacetRef=o,t=i)}t&&this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:t,details:[{facetType:this.activeFacetRef.facetType,bucket:{key:this.activeFacetRef.bucketKey,count:0,state:"selected"},negative:!1}]}}))}onDropdownClick(){He("smart dropdown: onDropdownClick",this),this.dispatchEvent(new CustomEvent("dropdownClick",{detail:this}))}close(){this.dropdown&&(this.dropdown.open=!1)}static get styles(){return f`
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
    `}};n([c({type:Array})],mi.prototype,"facetInfo",void 0);n([c({type:String})],mi.prototype,"labelPrefix",void 0);n([c({type:Object})],mi.prototype,"activeFacetRef",void 0);n([H("ia-dropdown")],mi.prototype,"dropdown",void 0);mi=n([R("smart-facet-dropdown")],mi);const ln={collection:"Collection: ",creator:"By: ",subject:"About: "};function e1(r){return r.charAt(0).toUpperCase()+r.slice(1)}let Oe=class extends P{constructor(){super(...arguments),this.filterToggleShown=!1,this.filterToggleActive=!1,this.heuristicRecs=[],this.smartFacets=[]}render(){if(!this.query)return b;const e=!!this.label&&this.smartFacets.length>0;return h`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${e?h`<p id="filters-label">${this.label}</p>`:b}
        ${Ss(this.smartFacets,t=>`${t[0].label}|${t[0].facets[0].facetType}|${t[0].facets[0].bucketKey}`,t=>this.makeSmartFacet(t))}
      </div>
    `}willUpdate(e){let t=!1;e.has("query")&&(He("query change",e.get("query"),this.query),this.lastAggregations=void 0,t=!0),e.has("aggregations")&&!this.lastAggregations&&this.aggregations&&Object.keys(this.aggregations).length>0&&(He("aggs change",e.get("aggregations"),this.aggregations),this.lastAggregations=this.aggregations,t=!0),t&&(He("should update smart facets, doing so..."),this.updateSmartFacets())}refresh(){this.lastAggregations=this.aggregations,this.updateSmartFacets()}deselectAll(){for(const e of this.smartFacets)for(const t of e)t.selected=!1;this.requestUpdate()}async updateSmartFacets(){He("updating smart facets"),this.query&&(this.heuristicRecs=await new Yo().getRecommendedFacets(this.query),He("heuristic recs are",this.heuristicRecs),this.smartFacets=il(this.facetsToDisplay),He("smart facets are",this.smartFacets))}makeSmartFacet(e){return e.length===0?b:e.length===1?this.smartFacetButton(e[0]):this.smartFacetDropdown(e)}smartFacetButton(e){var t;return h`
      <smart-facet-button
        .facetInfo=${e}
        .labelPrefix=${ln[e.facets[0].facetType]}
        .selected=${(t=e.selected)!==null&&t!==void 0?t:!1}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `}smartFacetDropdown(e){return h`
      <smart-facet-dropdown
        .facetInfo=${e}
        .labelPrefix=${ln[e[0].facets[0].facetType]}
        .activeFacetRef=${e[0].facets[0]}
        @facetClick=${this.dropdownOptionClicked}
        @dropdownClick=${this.dropdownClicked}
      ></smart-facet-dropdown>
    `}get filtersToggleTemplate(){return this.filterToggleShown?h`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive?"active":""}
        title="${this.filterToggleActive?"Hide":"Show"} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${X0}
      </button>
    `:b}get facetsToDisplay(){var e;const t=[];if(this.heuristicRecs.length>0)for(const i of this.heuristicRecs)i.facets.length===1&&i.facets[0].facetType==="mediatype"||t.push([i]);if(this.lastAggregations){const i=["mediatype","year","language","creator","subject","collection"];for(const o of i){const s=this.lastAggregations[o];if(!s||s.buckets.length===0||["lending","year_histogram","date_histogram"].includes(o)||typeof s.buckets[0]=="number"||o==="mediatype"&&this.selectedFacets&&Object.values((e=this.selectedFacets.mediatype)!==null&&e!==void 0?e:{}).some(u=>u.state!=="none"))continue;const a=o,d=s.buckets.filter(u=>{var p,m;const v=(m=(p=this.selectedFacets)===null||p===void 0?void 0:p[a])===null||m===void 0?void 0:m[u.key];return!(v&&v.state!=="none")});if(a!=="mediatype")if(a==="collection"||a==="subject"){const u=d.slice(0,5);t.push(u.map(p=>this.toSmartFacet(a,[p])))}else t.push([this.toSmartFacet(a,[d[0]])])}}return t}toSmartFacet(e,t){return{facets:t.map(i=>{var o;let s=e1(i.key.toString());if(e==="collection"){const a=(o=this.collectionTitles)===null||o===void 0?void 0:o.get(i.key.toString());a&&(s=a)}return{facetType:e,bucketKey:i.key.toString(),displayText:s}})}}toggleSmartFacet(e,t){let i;e.selected?(i="none",this.smartFacets=this.smartFacets.map(o=>o[0]===e?[{...e,selected:!1}]:o)):(i="selected",this.smartFacets=[[{...e,selected:!0}],...this.smartFacets.filter(o=>o[0]!==e)]),this.updateSelectedFacets(t.map(o=>({...o,bucket:{...o.bucket,state:i}})))}updateSelectedFacets(e){for(const i of e)this.selectedFacets=Cs(this.selectedFacets,i.facetType,i.bucket,!0);const t=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(t)}facetClicked(e){this.toggleSmartFacet(e.detail.smartFacet,e.detail.details)}dropdownOptionClicked(e){const t=this.smartFacets.find(i=>i.length===1&&cs(i[0],e.detail.smartFacet));if(t){this.toggleSmartFacet(t[0],e.detail.details);return}this.smartFacets=[[{...e.detail.smartFacet,selected:!0}],...this.smartFacets],this.updateSelectedFacets(e.detail.details)}dropdownClicked(e){var t;He("smart bar: onDropdownClick",e.detail),(t=this.shadowRoot)===null||t===void 0||t.querySelectorAll("smart-facet-dropdown").forEach(i=>{i!==e.detail&&(He("closing",i),i.close())})}filterToggleClicked(){this.dispatchEvent(new CustomEvent("filtersToggled"))}static get styles(){return f`
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
    `}};n([c({type:String})],Oe.prototype,"query",void 0);n([c({type:Object})],Oe.prototype,"aggregations",void 0);n([c({type:Object})],Oe.prototype,"selectedFacets",void 0);n([c({type:Object})],Oe.prototype,"collectionTitles",void 0);n([c({type:Boolean})],Oe.prototype,"filterToggleShown",void 0);n([c({type:Boolean})],Oe.prototype,"filterToggleActive",void 0);n([c({type:String})],Oe.prototype,"label",void 0);n([F()],Oe.prototype,"heuristicRecs",void 0);n([F()],Oe.prototype,"smartFacets",void 0);n([F()],Oe.prototype,"lastAggregations",void 0);Oe=n([R("smart-facet-bar")],Oe);let T=class extends P{constructor(){super(),this.baseImageUrl="https://archive.org",this.searchType=I.DEFAULT,this.selectedSort=_.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.tvClipFilter="all",this.sortDirection=null,this.defaultSortField=_.relevance,this.defaultSortDirection=null,this.pageSize=50,this.showSmartFacetBar=!1,this.showHistogramDatePicker=!1,this.suppressPlaceholders=!1,this.suppressResultCount=!1,this.suppressResultTiles=!1,this.suppressURLQuery=!1,this.suppressURLSinParam=!1,this.suppressSortBar=!1,this.suppressDisplayModes=!1,this.suppressMediatypeFacets=!1,this.facetLoadStrategy="eager",this.facetPaneVisible=!1,this.clearResultsOnEmptyQuery=!1,this.collectionPagePath="/details/",this.searchContext=rt.default,this.pageContext="search",this.restorationStateHandler=new Dd({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.modalManager=void 0,this.isTVCollection=!1,this.isManageView=!1,this.manageViewLabel="Select items to remove",this.enableSortOptionsSlot=!1,this.showSmartResults=!1,this.maxPagesToManage=15,this.dataSource=new zd(this,this.pageSize),this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.mobileView=!1,this.tileBlurOverrideState="no-override",this.collapsibleFacetsVisible=!1,this.placeholderType=null,this.layoutSizeAnalyticsSent=!1,this.isScrollingToCell=!1,this.isResizeToMobile=!1,this.dataSourceInstallInProgress=!1,this.placeholderCellTemplate=h`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.updateLeftColumnHeight=()=>{var e,t,i,o,s;if(this.mobileView)(t=(e=this.leftColumn)===null||e===void 0?void 0:e.style)===null||t===void 0||t.removeProperty("height");else{const a=(i=this.leftColumn)===null||i===void 0?void 0:i.getBoundingClientRect().top,l=window.innerHeight-(a??0),d=a===0?null:`calc(${l}px - var(--leftColumnPaddingTop, 2rem))`;(s=(o=this.leftColumn)===null||o===void 0?void 0:o.style)===null||s===void 0||s.setProperty("height",d)}},this.updateFacetFadeOut=e=>{var t,i;const o=(t=this.shadowRoot)===null||t===void 0?void 0:t.getElementById("facets-bottom-fade");o==null||o.classList.toggle("hidden",(i=e==null?void 0:e[0])===null||i===void 0?void 0:i.isIntersecting)},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.addController(this.dataSource)}tileModelAtCellIndex(e){const t=this.dataSource.getTileModelAt(e);if(!t&&!this.isScrollingToCell&&this.dataSource.queryInitialized){const i=Math.floor(e/this.pageSize)+1;this.dataSource.fetchPage(i)}return t}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{const e=sessionStorage==null?void 0:sessionStorage.getItem("cb-session");if(e)return e;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=Fn(Math.random().toString());const t=await this.sessionIdGenPromise;return sessionStorage==null||sessionStorage.setItem("cb-session",t),t}catch{return""}}goToPage(e){return this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}setSearchResultsLoading(e){this.searchResultsLoading=e}setFacetsLoading(e){this.facetsLoading=e}setTotalResultCount(e){this.totalResults=e}clearFilters({facets:e=!0,dateRange:t=!0,letterFilters:i=!0,sort:o=!1}={}){e&&this.hasCheckedFacets&&(this.selectedFacets=ht()),t&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),i&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),o&&(this.sortDirection=null,this.selectedSort=_.default),this.smartFacetBar&&this.smartFacetBar.deselectAll()}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(const e of Object.values(this.selectedFacets))for(const t of Object.values(e))if(t.state!=="none")return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}willUpdate(){this.setPlaceholderType()}render(){return h`
      ${this.showSmartFacetBar&&this.placeholderType===null?h`<smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleShown=${!this.mobileView}
            .filterToggleActive=${this.facetPaneVisible}
            .label=${this.smartFacetBarLabel}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${()=>{this.facetPaneVisible=!this.facetPaneVisible,this.emitFacetPaneVisibilityChanged()}}
          ></smart-facet-bar>`:b}

      <div
        id="content-container"
        class=${this.mobileView?"mobile":"desktop"}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){var e,t;const i=this.dataSource.queryInitialized,o=!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim()),s=!!(!((t=this.identifiers)===null||t===void 0)&&t.length),a=!!this.withinCollection,l=!!this.withinProfile,d=!a&&!l,u=!this.searchResultsLoading&&(this.dataSource.size===0||!this.searchService);this.placeholderType=null,!this.suppressPlaceholders&&(i?d&&!o&&!s?this.placeholderType="empty-query":u&&(this.placeholderType=!o&&a?"empty-collection":"no-results"):this.placeholderType="empty-query",this.dataSource.queryErrorMessage&&(this.placeholderType=!o&&a?"collection-error":"query-error"))}get emptyPlaceholderTemplate(){var e;return h`
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
      <div id="left-column" class="column" ?hidden=${!this.facetPaneVisible}>
        ${this.facetTopViewSlot}
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">${k("Filters")}</h2>
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
    `}get rightColumnTemplate(){const e=je({column:!0,"full-width":!this.facetPaneVisible,"smart-results-spacing":!!this.showSmartResults});return h`
      <div id="right-column" class=${e}>
        ${this.showSmartResults?h`<slot name="smart-results"></slot>`:b}
        <section id="results">
          <h2 class="results-section-heading">
            <slot name="results-heading"></slot>
          </h2>
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
    </infinite-scroller>`}get infiniteScrollerClasses(){var e;return je({[(e=this.displayMode)!==null&&e!==void 0?e:""]:!!this.displayMode,hidden:!!this.placeholderType})}get sortFilterBarTemplate(){var e;if(this.suppressSortBar)return b;let t=_.weeklyview,i=_.date,o=Wo;return!((e=this.withinCollection)===null||e===void 0)&&e.startsWith("fav-")?(i=_.datefavorited,o=bd):!this.withinCollection&&this.searchType===I.TV&&(t=_.alltimeview,i=_.datearchived,o=yd),o.relevance=this.isRelevanceSortAvailable,h`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .defaultViewSort=${t}
        .defaultDateSort=${i}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .sortFieldAvailability=${o}
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
    `}get tileBlurCheckboxTemplate(){var e;return!((e=this.dataSource.sessionContext)===null||e===void 0)&&e.is_archive_user?h`
      <label
        id="tile-blur-label"
        for="tile-blur-check"
        slot="sort-options-right"
      >
        ${k("Blurring")}
        <input
          id="tile-blur-check"
          type="checkbox"
          ?checked=${!this.shouldSuppressTileBlurring}
          @change=${this.tileBlurCheckboxChanged}
        />
      </label>
    `:b}get manageViewModalMsg(){const e=this.dataSource.checkedTileModels.length>1;switch(this.profileElement){case"uploads":return k(e?"Note: It may take a few minutes for these items to stop appearing in your uploads list.":"Note: It may take a few minutes for this item to stop appearing in your uploads list.");case"web_archives":return k(e?"Note: It may take a few minutes for these items to stop appearing in your web archives list.":"Note: It may take a few minutes for this item to stop appearing in your web archives list.");default:return""}}get manageBarTemplate(){return h`
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
    `}handleRemoveItems(){this.dispatchEvent(new CustomEvent("itemRemovalRequested",{detail:{items:this.dataSource.checkedTileModels.map(e=>{var t;const i=(e==null?void 0:e.mediatype)==="search"?"search:":"",o=(t=e==null?void 0:e.identifier)!==null&&t!==void 0?t:"";return`${i}${o}`})}}))}handleManageItems(){this.dispatchEvent(new CustomEvent("itemManagerRequested",{detail:{items:this.dataSource.checkedTileModels.map(e=>e!=null&&e.identifier?e.identifier:"")}}))}refreshSmartFacets(){var e;(e=this.smartFacetBar)===null||e===void 0||e.refresh()}showRemoveItemsProcessingModal(){var e;(e=this.manageBar)===null||e===void 0||e.showRemoveItemsProcessingModal()}showRemoveItemsErrorModal(){var e;(e=this.manageBar)===null||e===void 0||e.showRemoveItemsErrorModal()}removeCheckedTiles(){this.dataSource.removeCheckedTiles()}tileBlurCheckboxChanged(e){var t;const{checked:i}=e.target;this.tileBlurOverrideState=i?"on":"off",(t=this.infiniteScroller)===null||t===void 0||t.refreshAllVisibleCells()}get shouldSuppressTileBlurring(){if(this.tileBlurOverrideState!=="no-override")return this.tileBlurOverrideState==="off";const{sessionContext:e}=this.dataSource,t=e==null?void 0:e.pps_relevant_user_preferences;return(t==null?void 0:t.display__blur_moderated_content)==="off"}userChangedSort(e){var t;const{selectedSort:i,sortDirection:o}=e.detail;this.selectedSort=i,this.sortDirection=o,((t=this.currentPage)!==null&&t!==void 0?t:1)>1&&this.goToPage(1),this.currentPage=1}sendSortByAnalytics(e){var t;const i=e&&!this.sortDirection;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:te.sortBy,label:`${this.selectedSort}${this.sortDirection||i?`-${this.sortDirection}`:""}`})}selectedSortChanged(){this.dataSource.updatePrefixFiltersForCurrentSort()}get sortParam(){var e;const t=xe[this.selectedSort];if(!(t!=null&&t.handledBySearchService))return null;const i=new URL(window.location.href).searchParams.get("sort"),o=(e=t.searchServiceKey)!==null&&e!==void 0?e:i==null?void 0:i.replace(/^-/,"");return this.sortDirection||(this.sortDirection="asc"),o?{field:o,direction:this.sortDirection}:null}get defaultSortParam(){var e;const t=(e=this.defaultSortDirection)!==null&&e!==void 0?e:"asc",i=xe[this.defaultSortField].searchServiceKey;return i?{field:i,direction:t}:null}displayModeChanged(e){var t;this.displayMode=e.detail.displayMode,this.displayMode&&((t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:te.displayMode,label:this.displayMode}))}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(e){var t;if(!e&&!this.selectedTitleFilter)return;const i=e&&!this.selectedTitleFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:te.filterByTitle,label:i?`clear-${e}`:`${e||"start"}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(e){var t;if(!e&&!this.selectedCreatorFilter)return;const i=e&&!this.selectedCreatorFilter;(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:te.filterByCreator,label:i?`clear-${e}`:`${e||"start"}-${this.selectedCreatorFilter}`})}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get mobileFacetsTemplate(){return jr.includes(this.profileElement)?b:h`
      <details id="mobile-filter-collapse" @toggle=${t=>{var i;const o=t.target;this.isResizeToMobile=!1,this.collapsibleFacetsVisible=o.open,(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.searchContext,action:te.mobileFacetsToggled,label:o.open?"open":"closed"})}}>
        <summary>
          <span class="collapser-icon">${Gr}</span>
          <h2>${k("Filters")}</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}get facetsTemplate(){if(jr.includes(this.profileElement))return b;if(this.facetLoadStrategy==="off")return h`
        <p class="facets-message">
          ${k("Facets are temporarily unavailable.")}
        </p>
      `;const e=this.isTVCollection||!this.withinCollection&&this.searchType===I.TV,t=e?_d:En,i=h`
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
        .allowDatePickerMonths=${e}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .identifiers=${this.identifiers}
        .filterMap=${this.dataSource.filterMap}
        .isManageView=${this.isManageView}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        .facetDisplayOrder=${t}
        .isTvSearch=${e}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?histogramAggregationLoading=${this.facetsLoading}
        ?suppressMediatypeFacets=${this.suppressMediatypeFacets}
        @facetClick=${this.facetClickHandler}
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      >
      </collection-facets>
    `;return(this.facetLoadStrategy==="opt-in"||this.facetLoadStrategy==="opt-in-or-login"&&!this.loggedIn)&&!this.mobileView?h`
        <details
          class="desktop-facets-dropdown"
          @toggle=${s=>{const a=s.target;this.collapsibleFacetsVisible=a.open}}
        >
          <summary>
            <span class="collapser-icon">${Gr}</span>
            <h2>${k("Filters")}</h2>
          </summary>
          ${i}
        </details>
      `:i}clearFiltersBtnTemplate(e){if(!this.hasActiveFilters)return b;const t=je({"clear-filters-btn":!0,mobile:e}),i=e?"Clear all":"Clear all filters";return h`
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
          .suppressBlurring=${this.shouldSuppressTileBlurring}
        >
        </tile-dispatcher>
      </div>
    `}histogramDateRangeUpdated(e){var t;const{minDate:i,maxDate:o}=e.detail;[this.minSelectedDate,this.maxSelectedDate]=[i,o],(t=this.analyticsHandler)===null||t===void 0||t.sendEvent({category:this.searchContext,action:te.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}emitManageModeChangedEvent(){this.dispatchEvent(new CustomEvent("manageModeChanged",{detail:this.isManageView}))}async installDataSourceAndQueryState(e,t){var i,o,s;He("Installing data source & query state in CB:",e,t),this.dataSource&&this.removeController(this.dataSource),this.dataSource=e,this.addController(this.dataSource),this.baseQuery=t.baseQuery,this.profileElement=t.profileElement,this.searchType=t.searchType,this.selectedFacets=(i=t.selectedFacets)!==null&&i!==void 0?i:ht(),this.internalFilters=t.internalFilters,this.minSelectedDate=t.minSelectedDate,this.maxSelectedDate=t.maxSelectedDate,this.selectedSort=(o=t.selectedSort)!==null&&o!==void 0?o:_.default,this.sortDirection=t.sortDirection,this.selectedTitleFilter=t.selectedTitleFilter,this.selectedCreatorFilter=t.selectedCreatorFilter,this.tvClipFilter=(s=t.tvClipFilter)!==null&&s!==void 0?s:"all",this.pagesToRender=this.initialPageNumber,this.dataSourceInstallInProgress=!0,this.requestUpdate(),await this.updateComplete,this.dataSourceInstallInProgress=!1,this.searchResultsLoading||(this.setTotalResultCount(this.dataSource.totalResults),this.setTileCount(this.dataSource.size)),this.refreshVisibleResults()}firstUpdated(){this.restoreState(),this.setInitialSize()}setInitialSize(){this.contentWidth=this.contentContainer.getBoundingClientRect().width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.sendLayoutSizeAnalytics()}sendLayoutSizeAnalytics(){this.analyticsHandler&&(this.layoutSizeAnalyticsSent=!0,this.analyticsHandler.sendEvent({category:this.searchContext,action:this.mobileView?te.loadMobileView:te.loadDesktopView}))}updated(e){var t,i,o;if(e.has("placeholderType")&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),e.has("analyticsHandler")&&!this.layoutSizeAnalyticsSent&&this.sendLayoutSizeAnalytics(),(e.has("displayMode")||e.has("baseNavigationUrl")||e.has("baseImageUrl")||e.has("loggedIn"))&&((t=this.infiniteScroller)===null||t===void 0||t.reload()),(e.has("baseQuery")||e.has("identifiers")||e.has("searchType")||e.has("withinCollection"))&&!this.historyPopOccurred&&this.initialQueryChangeHappened){const s=e.has("withinCollection")&&!e.has("selectedSort")&&!e.has("sortDirection");this.clearFilters({sort:s,facets:!e.has("selectedFacets"),dateRange:!(e.has("minSelectedDate")||e.has("maxSelectedDate")),letterFilters:!(e.has("selectedTitleFilter")||e.has("selectedCreatorFilter"))})}if(e.has("profileElement")&&this.applyDefaultProfileSort(),e.has("baseQuery")&&this.emitBaseQueryChanged(),e.has("searchType")&&this.emitSearchTypeChanged(),(e.has("currentPage")||e.has("displayMode"))&&this.persistState(),(e.has("baseQuery")||e.has("identifiers")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection")||e.has("withinProfile")||e.has("profileElement"))&&this.dataSource.refreshLetterCounts(),e.has("selectedSort")||e.has("sortDirection")){const s=e.get("sortDirection");this.sendSortByAnalytics(s),this.selectedSortChanged()}if(e.has("selectedTitleFilter")&&this.sendFilterByTitleAnalytics(e.get("selectedTitleFilter")),e.has("selectedCreatorFilter")&&this.sendFilterByCreatorAnalytics(e.get("selectedCreatorFilter")),this.updateFacetReadiness(),(e.has("baseQuery")||e.has("identifiers")||e.has("searchType")||e.has("selectedTitleFilter")||e.has("selectedCreatorFilter")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("selectedSort")||e.has("sortDirection")||e.has("selectedFacets")||e.has("searchService")||e.has("withinCollection")||e.has("withinProfile")||e.has("profileElement"))&&this.handleQueryChange(),e.has("searchResultsLoading")&&this.emitSearchResultsLoadingChanged(),e.has("facetsLoading")&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==I.FULLTEXT),e.has("pagesToRender")&&!this.dataSource.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),e.has("isManageView")&&(this.isManageView?(this.displayMode="grid",this.fetchManageableSearchResults()):this.pageContext==="search"&&((i=this.infiniteScroller)===null||i===void 0||i.reload()),(o=this.infiniteScroller)===null||o===void 0||o.refreshAllVisibleCells(),e.get("isManageView")!==void 0&&this.emitManageModeChangedEvent()),e.has("resizeObserver")){const s=e.get("resizeObserver");s&&this.disconnectResizeObserver(s),this.setupResizeObserver()}this.ensureAvailableTilesDisplayed()}connectedCallback(){var e;(e=super.connectedCallback)===null||e===void 0||e.call(this),this.setupStateRestorationObserver(),this.setupResizeObserver()}disconnectedCallback(){var e,t;this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler),(e=this.leftColIntersectionObserver)===null||e===void 0||e.disconnect(),(t=this.facetsIntersectionObserver)===null||t===void 0||t.disconnect(),window.removeEventListener("resize",this.updateLeftColumnHeight)}handleResize(e){const t=this.mobileView;e.target===this.contentContainer&&(this.contentWidth=e.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}ensureAvailableTilesDisplayed(){this.infiniteScroller&&this.infiniteScroller.itemCount<this.dataSource.size&&this.setTileCount(this.dataSource.endOfDataReached?this.dataSource.size:this.estimatedTileCount)}updateFacetReadiness(){const e=this.collapsibleFacetsVisible||this.facetLoadStrategy==="opt-in-or-login"&&this.loggedIn,t=["opt-in","opt-in-or-login"].includes(this.facetLoadStrategy),i=!this.mobileView&&(!t||e),o=this.mobileView&&e;this.dataSource.handleFacetReadinessChange(i||o)}setupLeftColumnScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#left-column-scroll-sentinel");t&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(201).keys()].map(i=>i/200)}),this.leftColIntersectionObserver.observe(t)),window.addEventListener("resize",this.updateLeftColumnHeight)}setupFacetsScrollListeners(){var e;const t=(e=this.shadowRoot)===null||e===void 0?void 0:e.querySelector("#facets-scroll-sentinel");t&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(t))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent("searchTypeChanged",{detail:this.searchType}))}emitFacetPaneVisibilityChanged(){this.dispatchEvent(new CustomEvent("facetPaneVisibilityChanged",{detail:this.facetPaneVisible}))}emitSearchError(){this.dispatchEvent(new CustomEvent("searchError",{detail:this.dataSource.queryErrorMessage}))}emitQueryStateChanged(){this.dispatchEvent(new CustomEvent("queryStateChanged",{detail:{baseQuery:this.baseQuery,withinCollection:this.withinCollection,withinProfile:this.withinProfile,profileElement:this.profileElement,searchType:this.searchType,selectedFacets:this.selectedFacets,internalFilters:this.internalFilters,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedSort:this.selectedSort,sortDirection:this.sortDirection,selectedTitleFilter:this.selectedTitleFilter,selectedCreatorFilter:this.selectedCreatorFilter,tvClipFilter:this.tvClipFilter}}))}emitEmptyResults(){this.dispatchEvent(new Event("emptyResults"))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||!this.contentContainer||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){if(this.isScrollingToCell)return;const{visibleCellIndices:t}=e.detail;if(t.length===0)return;const i=Math.min(this.pageSize,t.length)-1,o=t[i],s=Math.floor(o/this.pageSize)+1;this.currentPage!==s&&(this.currentPage=s);const a=new CustomEvent("visiblePageChanged",{detail:{pageNumber:s}});this.dispatchEvent(a)}get initialSearchComplete(){return this.dataSource.initialSearchComplete}async handleQueryChange(){var e;!this.searchService||this.dataSource.pageFetchQueryKey===this.previousQueryKey||this.baseQuery&&!this.dataSource.canPerformSearch||(this.previousQueryKey=this.dataSource.pageFetchQueryKey,this.totalResults=void 0,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&(!((e=this.baseQuery)===null||e===void 0)&&e.trim())&&(this.defaultSortField=_.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1)}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this)),window.addEventListener("popstate",this.boundNavigationHandler)}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){var e,t,i,o,s,a;const l=this.restorationStateHandler.getRestorationState();this.displayMode=l.displayMode,!this.suppressURLSinParam&&l.searchType!=null&&(this.searchType=l.searchType),this.selectedSort=(e=l.selectedSort)!==null&&e!==void 0?e:_.default,this.sortDirection=(t=l.sortDirection)!==null&&t!==void 0?t:null,this.selectedTitleFilter=(i=l.selectedTitleFilter)!==null&&i!==void 0?i:null,this.selectedCreatorFilter=(o=l.selectedCreatorFilter)!==null&&o!==void 0?o:null,this.selectedFacets=l.selectedFacets,this.suppressURLQuery||(this.baseQuery=l.baseQuery),this.currentPage=(s=l.currentPage)!==null&&s!==void 0?s:1,this.minSelectedDate=l.minSelectedDate,this.maxSelectedDate=l.maxSelectedDate,this.tvClipFilter=(a=l.tvClipFilter)!==null&&a!==void 0?a:"all",this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){var e,t,i,o;const s={displayMode:this.displayMode,searchType:this.suppressURLSinParam?void 0:this.searchType,selectedSort:this.selectedSort,sortDirection:(e=this.sortDirection)!==null&&e!==void 0?e:void 0,selectedFacets:(t=this.selectedFacets)!==null&&t!==void 0?t:ht(),baseQuery:this.suppressURLQuery?void 0:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:(i=this.selectedTitleFilter)!==null&&i!==void 0?i:void 0,selectedCreatorFilter:(o=this.selectedCreatorFilter)!==null&&o!==void 0?o:void 0,tvClipFilter:this.tvClipFilter},a={forceReplace:this.dataSourceInstallInProgress,persistMetadataSearchType:this.isTVCollection};this.restorationStateHandler.persistState(s,a)}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent("searchResultsLoadingChanged",{detail:{loading:this.searchResultsLoading}}))}facetsChanged(e){this.selectedFacets=e.detail}facetClickHandler({detail:{facetType:e,bucket:t,negative:i}}){var o;let s;i?s=t.state!=="none"?te.facetNegativeSelected:te.facetNegativeDeselected:s=t.state!=="none"?te.facetSelected:te.facetDeselected,(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.searchContext,action:s,label:e})}scrollToPage(e){return new Promise(t=>{const i=this.pageSize*(e-1);setTimeout(()=>{var o;this.isScrollingToCell=!0,(o=this.infiniteScroller)===null||o===void 0||o.scrollToCell(i,!0),setTimeout(()=>{var s;this.isScrollingToCell=!1,(s=this.infiniteScroller)===null||s===void 0||s.refreshAllVisibleCells(),t()},500)},0)})}get isRelevanceSortAvailable(){var e;return!!(!((e=this.baseQuery)===null||e===void 0)&&e.trim())}setTileCount(e){this.infiniteScroller&&(this.infiniteScroller.itemCount=e)}applyDefaultCollectionSort(e){var t,i,o;if(this.baseQuery){this.defaultSortField=_.relevance,this.defaultSortDirection=null;return}const s=!((i=(t=e==null?void 0:e.public_metadata)===null||t===void 0?void 0:t.identifier)===null||i===void 0)&&i.startsWith("fav-")?"-favoritedate":"-week",a=(o=e==null?void 0:e.public_metadata)===null||o===void 0?void 0:o["sort-by"],l=a??s;let[d,u]=l.split(":");d.startsWith("-")?(d=d.slice(1),u="desc"):["asc","desc"].includes(u)||(u="asc");const m=Tn(d).field;m&&m!==_.default&&(this.defaultSortField=m,this.defaultSortDirection=u)}applyDefaultProfileSort(){if(this.profileElement){const e=wd[this.profileElement];this.defaultSortField=e??_.weeklyview}else this.defaultSortField=_.weeklyview;this.defaultSortDirection="desc"}get currentVisiblePageNumbers(){var e,t;const i=(t=(e=this.infiniteScroller)===null||e===void 0?void 0:e.getVisibleCellIndices())!==null&&t!==void 0?t:[],o=new Set;return i.forEach(s=>{const a=Math.floor(s/this.pageSize)+1;o.add(a)}),Array.from(o)}get isRadioCollection(){const{withinCollection:e}=this,t=["radio"],i=t.includes(e),o=t.some(s=>{var a;return(a=this.dataSource.parentCollections)===null||a===void 0?void 0:a.includes(s)});return i||o}refreshVisibleResults(){var e;(e=this.infiniteScroller)===null||e===void 0||e.refreshAllVisibleCells()}resultSelected(e){var t,i,o;if(this.isManageView){const s=this.dataSource.indexOf(e.detail);s>=0&&((t=this.infiniteScroller)===null||t===void 0||t.refreshCell(s)),this.requestUpdate()}(i=this.analyticsHandler)===null||i===void 0||i.sendEvent({category:this.searchContext,action:te.resultSelected,label:e.detail.mediatype}),(o=this.analyticsHandler)===null||o===void 0||o.sendEvent({category:this.searchContext,action:te.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(e){const t=this.tileModelAtCellIndex(e);if(!t)return;const i=this.searchType===I.TV,o=this.searchType===I.RADIO,{isTVCollection:s,isRadioCollection:a}=this,l=i||o||s||a;return h`
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
        .suppressBlurring=${this.shouldSuppressTileBlurring}
        .isManageView=${this.isManageView}
        ?showTvClips=${i||s}
        ?enableHoverPane=${!0}
        ?useLocalTime=${l}
        @resultSelected=${d=>this.resultSelected(d)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){!this.dataSource.endOfDataReached&&this.dataSource.queryInitialized&&(this.pagesToRender+=1,this.dataSource.fetchPage(this.pagesToRender))}fetchManageableSearchResults(){var e;const t=!this.dataSource.totalResults,i=!this.searchResultsLoading&&this.dataSource.totalResults>100;this.pageContext==="search"&&(t||i)&&(this.dataSource.resetPages(),this.dataSource.fetchPage(1,this.maxPagesToManage),(e=this.infiniteScroller)===null||e===void 0||e.reload())}static get styles(){return[at,f`
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

        #facets-container {
          position: relative;
          max-height: 0;
          transition: max-height 0.2s ease-in-out;
          z-index: 1;
          margin-top: var(--facetsContainerMarginTop, 5rem);
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
      `]}};n([c({type:String})],T.prototype,"baseNavigationUrl",void 0);n([c({type:String})],T.prototype,"baseImageUrl",void 0);n([c({type:Object})],T.prototype,"searchService",void 0);n([c({type:Number})],T.prototype,"searchType",void 0);n([c({type:String})],T.prototype,"withinCollection",void 0);n([c({type:String})],T.prototype,"withinProfile",void 0);n([c({type:String})],T.prototype,"profileElement",void 0);n([c({type:String})],T.prototype,"baseQuery",void 0);n([c({type:Array})],T.prototype,"identifiers",void 0);n([c({type:String})],T.prototype,"displayMode",void 0);n([c({type:String})],T.prototype,"selectedSort",void 0);n([c({type:String})],T.prototype,"selectedTitleFilter",void 0);n([c({type:String})],T.prototype,"selectedCreatorFilter",void 0);n([c({type:String})],T.prototype,"tvClipFilter",void 0);n([c({type:String})],T.prototype,"sortDirection",void 0);n([c({type:String})],T.prototype,"defaultSortField",void 0);n([c({type:String})],T.prototype,"defaultSortDirection",void 0);n([c({type:Number})],T.prototype,"pageSize",void 0);n([c({type:Number})],T.prototype,"currentPage",void 0);n([c({type:String})],T.prototype,"minSelectedDate",void 0);n([c({type:String})],T.prototype,"maxSelectedDate",void 0);n([c({type:Object})],T.prototype,"selectedFacets",void 0);n([c({type:Object})],T.prototype,"internalFilters",void 0);n([c({type:Boolean})],T.prototype,"showSmartFacetBar",void 0);n([c({type:String})],T.prototype,"smartFacetBarLabel",void 0);n([c({type:Boolean})],T.prototype,"showHistogramDatePicker",void 0);n([c({type:Boolean})],T.prototype,"suppressPlaceholders",void 0);n([c({type:Boolean})],T.prototype,"suppressResultCount",void 0);n([c({type:Boolean})],T.prototype,"suppressResultTiles",void 0);n([c({type:Boolean})],T.prototype,"suppressURLQuery",void 0);n([c({type:Boolean})],T.prototype,"suppressURLSinParam",void 0);n([c({type:Boolean})],T.prototype,"suppressSortBar",void 0);n([c({type:Boolean})],T.prototype,"suppressDisplayModes",void 0);n([c({type:Boolean})],T.prototype,"suppressMediatypeFacets",void 0);n([c({type:String})],T.prototype,"facetLoadStrategy",void 0);n([c({type:Boolean,reflect:!0})],T.prototype,"facetPaneVisible",void 0);n([c({type:Boolean})],T.prototype,"clearResultsOnEmptyQuery",void 0);n([c({type:String})],T.prototype,"collectionPagePath",void 0);n([c({type:String,reflect:!0})],T.prototype,"searchContext",void 0);n([c({type:String})],T.prototype,"pageContext",void 0);n([c({type:Object})],T.prototype,"restorationStateHandler",void 0);n([c({type:Number})],T.prototype,"mobileBreakpoint",void 0);n([c({type:Boolean})],T.prototype,"loggedIn",void 0);n([c({type:Object})],T.prototype,"resizeObserver",void 0);n([c({type:Object})],T.prototype,"modalManager",void 0);n([c({type:Object})],T.prototype,"featureFeedbackService",void 0);n([c({type:Object})],T.prototype,"recaptchaManager",void 0);n([c({type:Boolean})],T.prototype,"isTVCollection",void 0);n([c({type:Boolean})],T.prototype,"isManageView",void 0);n([c({type:String})],T.prototype,"manageViewLabel",void 0);n([c({type:Boolean})],T.prototype,"enableSortOptionsSlot",void 0);n([c({type:Boolean,reflect:!0})],T.prototype,"showSmartResults",void 0);n([c({type:Number})],T.prototype,"maxPagesToManage",void 0);n([c({type:Object})],T.prototype,"dataSource",void 0);n([F()],T.prototype,"pagesToRender",void 0);n([F()],T.prototype,"searchResultsLoading",void 0);n([F()],T.prototype,"facetsLoading",void 0);n([F()],T.prototype,"totalResults",void 0);n([F()],T.prototype,"mobileView",void 0);n([F()],T.prototype,"tileBlurOverrideState",void 0);n([F()],T.prototype,"collapsibleFacetsVisible",void 0);n([F()],T.prototype,"contentWidth",void 0);n([F()],T.prototype,"placeholderType",void 0);n([H("#content-container")],T.prototype,"contentContainer",void 0);n([H("#left-column")],T.prototype,"leftColumn",void 0);n([H("collection-facets")],T.prototype,"collectionFacets",void 0);n([H("manage-bar")],T.prototype,"manageBar",void 0);n([H("smart-facet-bar")],T.prototype,"smartFacetBar",void 0);n([c({type:Object,attribute:!1})],T.prototype,"analyticsHandler",void 0);n([H("infinite-scroller")],T.prototype,"infiniteScroller",void 0);T=n([R("collection-browser")],T);let le=class extends P{constructor(){super(...arguments),this.searchService=this.initSearchServiceFromUrlParams(),this.resizeObserver=new od,this.toggleSlots=!1,this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.suppressFacets=!1,this.lazyLoadFacets=!1,this.loggedIn=!1,this.searchType=I.METADATA,this.analyticsManager=new hl,this.analyticsHandler={sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)}}sendAnalytics(e){var t;console.log("Analytics Received ----",e),this.latestAction=e,(t=this.analyticsManager)===null||t===void 0||t.sendEvent(e)}initSearchServiceFromUrlParams(){var e,t;const i=new URL(window.location.href).searchParams;return new si({includeCredentials:!1,baseUrl:(e=i.get("search_base_url"))!==null&&e!==void 0?e:void 0,servicePath:(t=i.get("search_service_path"))!==null&&t!==void 0?t:void 0,debuggingEnabled:!!i.get("debugging")})}searchPressed(e){e.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(e){e.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){var e;const t=(e=this.currentPage)!==null&&e!==void 0?e:1;t>1&&this.collectionBrowser.goToPage(t)}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get("hide-dev-tools")?"hidden":""}render(){var e,t;return h`
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
                id="default-search"
                name="search-type"
                value="default"
                .checked=${this.searchType===I.DEFAULT}
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
                .checked=${this.searchType===I.METADATA}
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
                .checked=${this.searchType===I.FULLTEXT}
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
                .checked=${this.searchType===I.TV}
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
                .checked=${this.searchType===I.RADIO}
                @click=${this.searchTypeSelected}
              />
              <label for="radio-search">Radio</label>
            </span>
          </div>

          <div id="toggle-controls">
            <button
              @click=${()=>{var i,o;const s=(i=this.shadowRoot)===null||i===void 0?void 0:i.getElementById("cell-size-control");s==null||s.classList.toggle("hidden");const a=(o=this.shadowRoot)===null||o===void 0?void 0:o.getElementById("cell-gap-control");a==null||a.classList.toggle("hidden")}}
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
          ${this.toggleSlots?h`<div slot="sortbar-left-slot">Sort Slot</div>`:b}
          ${this.toggleSlots?h`<div slot="facet-top-slot">Facet Slot</div>`:b}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}async setPlaceholderType(e){switch(e){case"loading-placeholder":this.collectionBrowser.baseQuery="",this.collectionBrowser.suppressPlaceholders=!0,this.collectionBrowser.clearResultsOnEmptyQuery=!0,this.requestUpdate(),await this.collectionBrowser.updateComplete;break}}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}searchTypeChanged(e){this.searchType=e.detail}searchTypeSelected(e){const t=e.target;this.searchType=this.searchTypeFromSelectedOption(t.value)}searchTypeFromSelectedOption(e){switch(e){case"metadata":return I.METADATA;case"fulltext":return I.FULLTEXT;case"tv":return I.TV;case"radio":return I.RADIO;default:return I.DEFAULT}}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}toggleDevTools(){var e,t;const i=new URL(window.location.href),{searchParams:o}=i;o.get("hide-dev-tools")?o.delete("hide-dev-tools"):o.set("hide-dev-tools","true"),(t=(e=this.shadowRoot)===null||e===void 0?void 0:e.getElementById("dev-tools"))===null||t===void 0||t.classList.toggle("hidden"),window.history.replaceState&&window.history.replaceState({path:i.toString()},"",i.toString())}toggleFacetGroupOutline(e){e.target.checked?(this.collectionBrowser.classList.add("showFacetGroupOutlines"),this.modalManager.classList.add("showFacetGroupOutlines")):(this.collectionBrowser.classList.remove("showFacetGroupOutlines"),this.modalManager.classList.remove("showFacetGroupOutlines"))}datePickerChanged(e){const t=e.target;this.collectionBrowser.showHistogramDatePicker=t.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}facetsChanged(e){const t=e.target;this.suppressFacets=!t.checked}lazyLoadFacetsChanged(e){const t=e.target;this.lazyLoadFacets=t.checked}manageModeChanged(e){var t;const i=(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector("#enable-management");i&&(i.checked=e.detail)}handleItemRemovalRequest(e){this.collectionBrowser.showRemoveItemsProcessingModal(),console.log("itemRemovalRequested: ",e.detail.items),setTimeout(()=>{this.collectionBrowser.showRemoveItemsErrorModal()},2e3)}handleItemManagerRequest(e){console.log("itemManagerRequested: ",e.detail.items)}manageModeCheckboxChanged(e){const t=e.target;this.collectionBrowser.isManageView=t.checked,this.collectionBrowser.manageViewLabel="Select items to remove (customizable texts)"}SearchManageModeCheckboxChanged(e){const t=e.target;this.collectionBrowser.pageContext=t.checked?"search":"collection"}smartFacetBarCheckboxChanged(e){const t=e.target;this.collectionBrowser.showSmartFacetBar=t.checked}facetTopSlotCheckboxChanged(e){const t=e.target,i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="New stuff as a child.",i.style.setProperty("height","20rem"),i.style.backgroundColor="#00000",i.setAttribute("slot","facet-top-slot"),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}toggleSlotOptions(){this.toggleSlots=!this.toggleSlots}resultLastTileSlotCheckboxChanged(e){const t=e.target,i=document.createElement("div"),o=document.createElement("h3");o.textContent="Upload",i.setAttribute("slot","result-last-tile"),i.setAttribute("class","result-last-tile"),i.appendChild(o),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}cbTopSlotCheckboxChanged(e){const t=e.target,i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="My Favorite list header.",i.style.setProperty("height","10rem"),i.style.backgroundColor="#00000",i.setAttribute("slot","cb-top-slot"),t.checked?this.collectionBrowser.appendChild(i):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}sortBarLeftSlotCheckboxChanged(e){if(e.target.checked){const i=document.createElement("div");i.style.setProperty("border","1px solid #000"),i.textContent="Btn",i.style.setProperty("height","3rem"),i.style.setProperty("width","3rem"),i.setAttribute("slot","sort-options-left"),this.collectionBrowser.appendChild(i)}else{const i=this.collectionBrowser.querySelector('[slot="sort-options-left"]');i&&this.collectionBrowser.removeChild(i)}}sortBarRightSlotCheckboxChanged(e){if(e.target.checked){const i=document.createElement("div");i.style.setProperty("border","1px solid #000"),i.textContent="Search bar",i.style.setProperty("height","3rem"),i.style.setProperty("width","15rem"),i.setAttribute("slot","sort-options-right"),this.collectionBrowser.appendChild(i)}else{const i=this.collectionBrowser.querySelector('[slot="sort-options-right"]');i&&this.collectionBrowser.removeChild(i)}}rowGapChanged(e){const t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${t.value}rem`)}colGapChanged(e){const t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${t.value}rem`)}widthChanged(e){const t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${t.value}rem`)}heightChanged(e){const t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${t.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${t.value}rem`)}visiblePageChanged(e){const{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}replaceSortOptionsChanged(e){if(e.target.checked){const i=document.createElement("p");i.style.setProperty("border","1px solid #000"),i.textContent="New stuff as a child.",i.style.setProperty("height","20px"),i.setAttribute("slot","sort-options"),this.collectionBrowser.appendChild(i),this.collectionBrowser.enableSortOptionsSlot=!0}else{const i=this.collectionBrowser.querySelector('[slot="sort-options"]');i&&this.collectionBrowser.removeChild(i),this.collectionBrowser.enableSortOptionsSlot=!1}}};le.styles=f`
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
  `;n([F()],le.prototype,"toggleSlots",void 0);n([F()],le.prototype,"currentPage",void 0);n([F()],le.prototype,"searchQuery",void 0);n([F()],le.prototype,"withinCollection",void 0);n([F()],le.prototype,"cellWidth",void 0);n([F()],le.prototype,"cellHeight",void 0);n([F()],le.prototype,"rowGap",void 0);n([F()],le.prototype,"colGap",void 0);n([F()],le.prototype,"suppressFacets",void 0);n([F()],le.prototype,"lazyLoadFacets",void 0);n([F()],le.prototype,"loggedIn",void 0);n([F()],le.prototype,"searchType",void 0);n([c({type:Object,reflect:!1})],le.prototype,"latestAction",void 0);n([H("#base-query-field")],le.prototype,"baseQueryField",void 0);n([H("#base-collection-field")],le.prototype,"baseCollectionField",void 0);n([H("#page-number-input")],le.prototype,"pageNumberInput",void 0);n([H("collection-browser")],le.prototype,"collectionBrowser",void 0);n([H("modal-manager")],le.prototype,"modalManager",void 0);le=n([R("app-root")],le);
