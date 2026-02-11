(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(r){if(r.ep)return;r.ep=!0;const o=t(r);fetch(r.href,o)}})();class Yd{constructor(e){var t,s,r,o;this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE="ao_2",this.NO_SAMPLING_SERVICE="ao_no_sampling",this.DEFAULT_IMAGE_URL="https://athena.archive.org/0.gif",this.defaultService=(t=e?.defaultService)!==null&&t!==void 0?t:this.DEFAULT_SERVICE,this.imageUrl=(s=e?.imageUrl)!==null&&s!==void 0?s:this.DEFAULT_IMAGE_URL,this.imageContainer=(r=e?.imageContainer)!==null&&r!==void 0?r:document.body,this.requireImagePing=(o=e?.requireImagePing)!==null&&o!==void 0?o:!1}sendPing(e){const t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}const s=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{s(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){const t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,s={kind:"event",ec:e.category,ea:e.action,el:t,cache_bust:Math.random(),...e.eventConfiguration};this.sendPing(s)}sendEventNoSampling(e){const t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;const s=e;s.eventConfiguration=t,this.sendEvent(s)}sendPingViaImage(e){const t=new Image(1,1);t.src=e,t.alt="",this.imageContainer.appendChild(t)}generateTrackingUrl(e){var t;const s=e??{};s.service=(t=s.service)!==null&&t!==void 0?t:this.defaultService;const r=new URL(this.imageUrl),o=Object.keys(s);return o.forEach(a=>{const n=s[a];r.searchParams.append(a,n)}),r.searchParams.append("version",`${this.ARCHIVE_ANALYTICS_VERSION}`),r.searchParams.append("count",`${o.length+2}`),r}}function c(i,e,t,s){var r=arguments.length,o=r<3?e:s===null?s=Object.getOwnPropertyDescriptor(e,t):s,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")o=Reflect.decorate(i,e,t,s);else for(var n=i.length-1;n>=0;n--)(a=i[n])&&(o=(r<3?a(o):r>3?a(e,t,o):a(e,t))||o);return r>3&&o&&Object.defineProperty(e,t,o),o}function Fn(i,e,t,s){function r(o){return o instanceof t?o:new t(function(a){a(o)})}return new(t||(t=Promise))(function(o,a){function n(u){try{h(s.next(u))}catch(f){a(f)}}function l(u){try{h(s.throw(u))}catch(f){a(f)}}function h(u){u.done?o(u.value):r(u.value).then(n,l)}h((s=s.apply(i,e||[])).next())})}function w(i){let e,t,s;return typeof i=="object"?(e=i.hashFunction,t=i.expiring,s=i.tags):e=i,(r,o,a)=>{if(a.value!=null)a.value=Bn(a.value,e,t,s);else if(a.get!=null)a.get=Bn(a.get,e,t,s);else throw"Only put a Memoize() decorator on a method or get accessor."}}const ao=new Map;function Bn(i,e,t=0,s){const r=Symbol("__memoized_map__");return function(...o){let a;this.hasOwnProperty(r)||Object.defineProperty(this,r,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let n=this[r];if(Array.isArray(s))for(const l of s)ao.has(l)?ao.get(l).push(n):ao.set(l,[n]);if(e||o.length>0||t>0){let l;e===!0?l=o.map(f=>f.toString()).join("!"):e?l=e.apply(this,o):l=o[0];const h=`${l}__timestamp`;let u=!1;if(t>0)if(!n.has(h))u=!0;else{let f=n.get(h);u=Date.now()-f>t}n.has(l)&&!u?a=n.get(l):(a=i.apply(this,o),n.set(l,a),t>0&&n.set(h,Date.now()))}else{const l=this;n.has(l)?a=n.get(l):(a=i.apply(this,o),n.set(l,a))}return a}}class Jo{parseValue(e){return typeof e=="string"&&(e==="false"||e==="0")?!1:!!e}}Jo.shared=new Jo;class St{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=parseFloat(e);if(!Number.isNaN(t))return t}}St.shared=new St;class dr{parseValue(e){return St.shared.parseValue(e)}}dr.shared=new dr;class Cs{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!="string")return;const t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!="string")return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(" ","T"));const s=Date.parse(t);if(Number.isNaN(s))return;let r=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}}Cs.shared=new Cs;class hr{parseValue(e){if(typeof e=="number")return e;if(typeof e=="boolean")return;const t=e.split(":");let s;return t.length===1?s=this.parseNumberFormat(t[0]):s=this.parseColonSeparatedFormat(t),s}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1;const s=e.map((r,o)=>{const a=parseFloat(r);if(Number.isNaN(a))return t=!0,0;const l=60**(e.length-1-o);return a*Math.floor(l)}).reduce((r,o)=>r+o,0);return t?void 0:s}}hr.shared=new hr;class ea{parseValue(e){if(typeof e=="string")return e}}ea.shared=new ea;class Qd{constructor(e,t){this.separators=[";",","],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){const t=String(e);let s=[];for(const r of this.separators)if(s=t.split(r),s.length>1)break;return this.parseListValues(s)}parseListValues(e){const s=e.map(o=>o.trim()).map(o=>this.parser.parseValue(o)),r=[];return s.forEach(o=>{o!==void 0&&r.push(o)}),r}}class ta{parseValue(e){if(typeof e=="string")return e}}ta.shared=new ta;class pr{parseValue(e){return String(e)}}pr.shared=new pr;class Ni{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;const e=St.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size!=null?dr.shared.parseValue(this.rawValue.size):void 0}get title(){return this.rawValue.title}get length(){return this.rawValue.length!=null?hr.shared.parseValue(this.rawValue.length):void 0}get height(){return this.rawValue.height!=null?St.shared.parseValue(this.rawValue.height):void 0}get width(){return this.rawValue.width!=null?St.shared.parseValue(this.rawValue.width):void 0}get track(){return this.rawValue.track!=null?St.shared.parseValue(this.rawValue.track):void 0}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}}c([w()],Ni.prototype,"mtime",null);c([w()],Ni.prototype,"size",null);c([w()],Ni.prototype,"length",null);c([w()],Ni.prototype,"height",null);c([w()],Ni.prototype,"width",null);c([w()],Ni.prototype,"track",null);class lt{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){const e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(s=>{const r=this.parser.parseValue(s);Array.isArray(r)?t.push(...r):r!==void 0&&t.push(r)}),t}}c([w()],lt.prototype,"values",null);c([w()],lt.prototype,"value",null);class ti extends lt{constructor(e){super(Jo.shared,e)}}class je extends lt{constructor(e){super(Cs.shared,e)}}class no extends lt{constructor(e){super(hr.shared,e)}}class Ce extends lt{constructor(e){super(St.shared,e)}}class B extends lt{constructor(e){super(pr.shared,e)}}class Kd extends lt{constructor(e){super(ta.shared,e)}}class Rn extends lt{constructor(e){super(dr.shared,e)}}class vc extends lt{constructor(e){super(ea.shared,e)}}class Xd extends lt{constructor(e,t){super(t,e)}}class Zd extends Xd{constructor(e){const t=new Qd(pr.shared);super(e,t)}}class A{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate!=null?new je(this.rawMetadata.addeddate):void 0}get audio_codec(){return this.rawMetadata.audio_codec!=null?new B(this.rawMetadata.audio_codec):void 0}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate!=null?new Ce(this.rawMetadata.audio_sample_rate):void 0}get avg_rating(){return this.rawMetadata.avg_rating!=null?new Ce(this.rawMetadata.avg_rating):void 0}get collection(){return this.rawMetadata.collection!=null?new B(this.rawMetadata.collection):void 0}get collections_raw(){return this.rawMetadata.collections_raw!=null?new B(this.rawMetadata.collections_raw):void 0}get collection_size(){return this.rawMetadata.collection_size!=null?new Rn(this.rawMetadata.collection_size):void 0}get contact(){return this.rawMetadata.contact!=null?new B(this.rawMetadata.contact):void 0}get contributor(){return this.rawMetadata.contributor!=null?new B(this.rawMetadata.contributor):void 0}get coverage(){return this.rawMetadata.coverage!=null?new B(this.rawMetadata.coverage):void 0}get creator(){return this.rawMetadata.creator!=null?new B(this.rawMetadata.creator):void 0}get creator_alt_script(){return this.rawMetadata["creator-alt-script"]!=null?new B(this.rawMetadata["creator-alt-script"]):void 0}get credits(){return this.rawMetadata.credits!=null?new B(this.rawMetadata.credits):void 0}get collection_layout(){return this.rawMetadata.collection_layout!=null?new B(this.rawMetadata.collection_layout):void 0}get date(){return this.rawMetadata.date!=null?new je(this.rawMetadata.date):void 0}get description(){return this.rawMetadata.description!=null?new B(this.rawMetadata.description):void 0}get downloads(){return this.rawMetadata.downloads!=null?new Ce(this.rawMetadata.downloads):void 0}get duration(){return this.rawMetadata.duration!=null?new no(this.rawMetadata.duration):void 0}get external_identifier(){return this.rawMetadata["external-identifier"]!=null?new B(this.rawMetadata["external-identifier"]):void 0}get external_link(){return this.rawMetadata["external-link"]!=null?new B(this.rawMetadata["external-link"]):void 0}get files_count(){return this.rawMetadata.files_count!=null?new Ce(this.rawMetadata.files_count):void 0}get indexdate(){return this.rawMetadata.indexdate!=null?new je(this.rawMetadata.indexdate):void 0}get isbn(){return this.rawMetadata.isbn!=null?new B(this.rawMetadata.isbn):void 0}get issue(){return this.rawMetadata.issue!=null?new B(this.rawMetadata.issue):void 0}get item_count(){return this.rawMetadata.item_count!=null?new Ce(this.rawMetadata.item_count):void 0}get item_size(){return this.rawMetadata.item_size!=null?new Rn(this.rawMetadata.item_size):void 0}get language(){return this.rawMetadata.language!=null?new B(this.rawMetadata.language):void 0}get length(){return this.rawMetadata.length!=null?new no(this.rawMetadata.length):void 0}get licenseurl(){return this.rawMetadata.licenseurl!=null?new B(this.rawMetadata.licenseurl):void 0}get lineage(){return this.rawMetadata.lineage!=null?new B(this.rawMetadata.lineage):void 0}get month(){return this.rawMetadata.month!=null?new Ce(this.rawMetadata.month):void 0}get mediatype(){return this.rawMetadata.mediatype!=null?new vc(this.rawMetadata.mediatype):void 0}get noindex(){return this.rawMetadata.noindex!=null?new ti(this.rawMetadata.noindex):void 0}get notes(){return this.rawMetadata.notes!=null?new B(this.rawMetadata.notes):void 0}get num_favorites(){return this.rawMetadata.num_favorites!=null?new Ce(this.rawMetadata.num_favorites):void 0}get num_reviews(){return this.rawMetadata.num_reviews!=null?new Ce(this.rawMetadata.num_reviews):void 0}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition!=null?new B(this.rawMetadata.openlibrary_edition):void 0}get openlibrary_work(){return this.rawMetadata.openlibrary_work!=null?new B(this.rawMetadata.openlibrary_work):void 0}get page_progression(){return this.rawMetadata.page_progression!=null?new Kd(this.rawMetadata.page_progression):void 0}get paginated(){return this.rawMetadata.paginated!=null?new ti(this.rawMetadata.paginated):void 0}get partner(){return this.rawMetadata.partner!=null?new B(this.rawMetadata.partner):void 0}get post_text(){return this.rawMetadata.post_text!=null?new B(this.rawMetadata.post_text):void 0}get ppi(){return this.rawMetadata.ppi!=null?new Ce(this.rawMetadata.ppi):void 0}get publicdate(){return this.rawMetadata.publicdate!=null?new je(this.rawMetadata.publicdate):void 0}get publisher(){return this.rawMetadata.publisher!=null?new B(this.rawMetadata.publisher):void 0}get reviewdate(){return this.rawMetadata.reviewdate!=null?new je(this.rawMetadata.reviewdate):void 0}get rights(){return this.rawMetadata.rights!=null?new B(this.rawMetadata.rights):void 0}get rights_holder(){var e;const t=(e=this.rawMetadata["rights-holder"])!==null&&e!==void 0?e:this.rawMetadata.rights_holder;return t!=null?new B(t):void 0}get runtime(){return this.rawMetadata.runtime!=null?new no(this.rawMetadata.runtime):void 0}get scanner(){return this.rawMetadata.scanner!=null?new B(this.rawMetadata.scanner):void 0}get segments(){return this.rawMetadata.segments!=null?new B(this.rawMetadata.segments):void 0}get shotlist(){return this.rawMetadata.shotlist!=null?new B(this.rawMetadata.shotlist):void 0}get source(){return this.rawMetadata.source!=null?new B(this.rawMetadata.source):void 0}get sponsor(){return this.rawMetadata.sponsor!=null?new B(this.rawMetadata.sponsor):void 0}get start_localtime(){return this.rawMetadata.start_localtime!=null?new je(this.rawMetadata.start_localtime):void 0}get start_time(){return this.rawMetadata.start_time!=null?new je(this.rawMetadata.start_time):void 0}get stop_time(){return this.rawMetadata.stop_time!=null?new je(this.rawMetadata.stop_time):void 0}get subject(){return this.rawMetadata.subject!=null?new Zd(this.rawMetadata.subject):void 0}get taper(){return this.rawMetadata.taper!=null?new B(this.rawMetadata.taper):void 0}get title(){return this.rawMetadata.title!=null?new B(this.rawMetadata.title):void 0}get title_alt_script(){return this.rawMetadata["title-alt-script"]!=null?new B(this.rawMetadata["title-alt-script"]):void 0}get transferer(){return this.rawMetadata.transferer!=null?new B(this.rawMetadata.transferer):void 0}get track(){return this.rawMetadata.track!=null?new Ce(this.rawMetadata.track):void 0}get type(){return this.rawMetadata.type!=null?new B(this.rawMetadata.type):void 0}get uploader(){return this.rawMetadata.uploader!=null?new B(this.rawMetadata.uploader):void 0}get utc_offset(){return this.rawMetadata.utc_offset!=null?new Ce(this.rawMetadata.utc_offset):void 0}get venue(){return this.rawMetadata.venue!=null?new B(this.rawMetadata.venue):void 0}get volume(){return this.rawMetadata.volume!=null?new B(this.rawMetadata.volume):void 0}get week(){return this.rawMetadata.week!=null?new Ce(this.rawMetadata.week):void 0}get year(){return this.rawMetadata.year!=null?new Ce(this.rawMetadata.year):void 0}constructor(e={}){this.rawMetadata=e}}c([w()],A.prototype,"addeddate",null);c([w()],A.prototype,"audio_codec",null);c([w()],A.prototype,"audio_sample_rate",null);c([w()],A.prototype,"avg_rating",null);c([w()],A.prototype,"collection",null);c([w()],A.prototype,"collections_raw",null);c([w()],A.prototype,"collection_size",null);c([w()],A.prototype,"contact",null);c([w()],A.prototype,"contributor",null);c([w()],A.prototype,"coverage",null);c([w()],A.prototype,"creator",null);c([w()],A.prototype,"creator_alt_script",null);c([w()],A.prototype,"credits",null);c([w()],A.prototype,"collection_layout",null);c([w()],A.prototype,"date",null);c([w()],A.prototype,"description",null);c([w()],A.prototype,"downloads",null);c([w()],A.prototype,"duration",null);c([w()],A.prototype,"external_identifier",null);c([w()],A.prototype,"external_link",null);c([w()],A.prototype,"files_count",null);c([w()],A.prototype,"indexdate",null);c([w()],A.prototype,"isbn",null);c([w()],A.prototype,"issue",null);c([w()],A.prototype,"item_count",null);c([w()],A.prototype,"item_size",null);c([w()],A.prototype,"language",null);c([w()],A.prototype,"length",null);c([w()],A.prototype,"licenseurl",null);c([w()],A.prototype,"lineage",null);c([w()],A.prototype,"month",null);c([w()],A.prototype,"mediatype",null);c([w()],A.prototype,"noindex",null);c([w()],A.prototype,"notes",null);c([w()],A.prototype,"num_favorites",null);c([w()],A.prototype,"num_reviews",null);c([w()],A.prototype,"openlibrary_edition",null);c([w()],A.prototype,"openlibrary_work",null);c([w()],A.prototype,"page_progression",null);c([w()],A.prototype,"paginated",null);c([w()],A.prototype,"partner",null);c([w()],A.prototype,"post_text",null);c([w()],A.prototype,"ppi",null);c([w()],A.prototype,"publicdate",null);c([w()],A.prototype,"publisher",null);c([w()],A.prototype,"reviewdate",null);c([w()],A.prototype,"rights",null);c([w()],A.prototype,"rights_holder",null);c([w()],A.prototype,"runtime",null);c([w()],A.prototype,"scanner",null);c([w()],A.prototype,"segments",null);c([w()],A.prototype,"shotlist",null);c([w()],A.prototype,"source",null);c([w()],A.prototype,"sponsor",null);c([w()],A.prototype,"start_localtime",null);c([w()],A.prototype,"start_time",null);c([w()],A.prototype,"stop_time",null);c([w()],A.prototype,"subject",null);c([w()],A.prototype,"taper",null);c([w()],A.prototype,"title",null);c([w()],A.prototype,"title_alt_script",null);c([w()],A.prototype,"transferer",null);c([w()],A.prototype,"track",null);c([w()],A.prototype,"type",null);c([w()],A.prototype,"uploader",null);c([w()],A.prototype,"utc_offset",null);c([w()],A.prototype,"venue",null);c([w()],A.prototype,"volume",null);c([w()],A.prototype,"week",null);c([w()],A.prototype,"year",null);class Pr{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate!=null?Cs.shared.parseValue(this.rawValue.reviewdate):void 0}get createdate(){return this.rawValue.createdate!=null?Cs.shared.parseValue(this.rawValue.createdate):void 0}get stars(){return this.rawValue.stars!=null?St.shared.parseValue(this.rawValue.stars):void 0}constructor(e={}){this.rawValue=e}}c([w()],Pr.prototype,"reviewdate",null);c([w()],Pr.prototype,"createdate",null);c([w()],Pr.prototype,"stars",null);class Aa extends Pr{get reviewer_account_status(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.status}get reviewer_account_status_reason(){var e;return(e=this.account_status)===null||e===void 0?void 0:e.reason}get __href__(){return this.rawValue.__href__}get account_status(){const e=this.rawValue.reviewer_account_status;if(!e)return;let t="unknown",s;e.startsWith("ok")&&(t="ok"),e.startsWith("locked")&&(t="locked");const r=e.split("__");return r.length>1&&(s=r.slice(1).join("__")),{status:t,reason:s}}}c([w()],Aa.prototype,"account_status",null);const Jd=["loans","waitlist","loan_history"];function eh(i){const e=i.slice(0,4),t=i.slice(4,6),s=i.slice(6,8),r=i.slice(8,10),o=i.slice(10,12),a=i.slice(12,14);return`${e}-${t}-${s}T${r}:${o}:${a}Z`}function th(i){var e;const t=[];for(const s of i){if(!(!((e=s.captures)===null||e===void 0)&&e.length))continue;const r=encodeURIComponent(s.url),o=`https://web.archive.org/web/${s.captures[0]}/${r}`;t.push({hit_type:"web_archive",fields:{url:s.url,capture_dates:s.captures.map(a=>eh(a)),__href__:o}})}return t}class be extends A{get created_on(){return this.rawMetadata.created_on!=null?new je(this.rawMetadata.created_on):void 0}get file_creation_mtime(){return this.rawMetadata.file_creation_mtime!=null?new Ce(this.rawMetadata.file_creation_mtime):void 0}get filename(){return this.rawMetadata.filename!=null?new B(this.rawMetadata.filename):void 0}get file_basename(){return this.rawMetadata.file_basename!=null?new B(this.rawMetadata.file_basename):void 0}get result_in_subfile(){return this.rawMetadata.result_in_subfile!=null?new ti(this.rawMetadata.result_in_subfile):void 0}get query(){return this.rawMetadata.query!=null?new B(this.rawMetadata.query):void 0}get date_favorited(){return this.rawMetadata.date_favorited!=null?new je(this.rawMetadata.date_favorited):void 0}get updated_on(){return this.rawMetadata.updated_on!=null?new je(this.rawMetadata.updated_on):void 0}get ad_id(){return this.rawMetadata.ad_id!=null?new B(this.rawMetadata.ad_id):void 0}get factcheck(){return this.rawMetadata.factcheck!=null?new B(this.rawMetadata.factcheck):void 0}get is_clip(){return this.rawMetadata.clip!=null?new ti(this.rawMetadata.clip):void 0}get num_clips(){return this.rawMetadata.nclips!=null?new Ce(this.rawMetadata.nclips):void 0}get __href__(){return this.rawMetadata.__href__!=null?new B(this.rawMetadata.__href__):void 0}get __img__(){return this.rawMetadata.__img__!=null?new B(this.rawMetadata.__img__):void 0}}c([w()],be.prototype,"created_on",null);c([w()],be.prototype,"file_creation_mtime",null);c([w()],be.prototype,"filename",null);c([w()],be.prototype,"file_basename",null);c([w()],be.prototype,"result_in_subfile",null);c([w()],be.prototype,"query",null);c([w()],be.prototype,"date_favorited",null);c([w()],be.prototype,"updated_on",null);c([w()],be.prototype,"ad_id",null);c([w()],be.prototype,"factcheck",null);c([w()],be.prototype,"is_clip",null);c([w()],be.prototype,"num_clips",null);c([w()],be.prototype,"__href__",null);c([w()],be.prototype,"__img__",null);class rt{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get collection_files_count(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.collection_files_count)!=null?new Ce(this.rawMetadata.fields.collection_files_count):void 0}get collection_size(){return this.fields.collection_size}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get files_count(){return this.fields.files_count}get genre(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.genre)!=null?new B(this.rawMetadata.fields.genre):void 0}get indexflag(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.indexflag)!=null?new B(this.rawMetadata.fields.indexflag):void 0}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get lending___available_to_borrow(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_borrow)!=null?new ti(this.rawMetadata.fields.lending___available_to_borrow):void 0}get lending___available_to_browse(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_browse)!=null?new ti(this.rawMetadata.fields.lending___available_to_browse):void 0}get lending___available_to_waitlist(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___available_to_waitlist)!=null?new ti(this.rawMetadata.fields.lending___available_to_waitlist):void 0}get lending___status(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.lending___status)!=null?new B(this.rawMetadata.fields.lending___status):void 0}get licenseurl(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.licenseurl)!=null?new B(this.rawMetadata.fields.licenseurl):void 0}get mediatype(){return this.fields.mediatype}get month(){return this.fields.month}get noindex(){return this.fields.noindex}get num_favorites(){return this.fields.num_favorites}get num_reviews(){return this.fields.num_reviews}get publicdate(){return this.fields.publicdate}get reviewdate(){return this.fields.reviewdate}get review(){const e=this.rawMetadata.review;return e?new Aa(e):void 0}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get type(){return this.fields.type}get volume(){return this.fields.volume}get week(){return this.fields.week}get year(){return this.fields.year}}c([w()],rt.prototype,"collection_files_count",null);c([w()],rt.prototype,"genre",null);c([w()],rt.prototype,"indexflag",null);c([w()],rt.prototype,"lending___available_to_borrow",null);c([w()],rt.prototype,"lending___available_to_browse",null);c([w()],rt.prototype,"lending___available_to_waitlist",null);c([w()],rt.prototype,"lending___status",null);c([w()],rt.prototype,"licenseurl",null);c([w()],rt.prototype,"review",null);class Ma{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new B(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get issue(){return this.fields.issue}get mediatype(){return this.fields.mediatype}get page_num(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.page_num)!=null?new Ce(this.rawMetadata.fields.page_num):void 0}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get year(){return this.fields.year}get __href__(){return this.fields.__href__}}c([w()],Ma.prototype,"highlight",null);c([w()],Ma.prototype,"page_num",null);var G;(function(i){i[i.COUNT=0]="COUNT",i[i.ALPHABETICAL=1]="ALPHABETICAL",i[i.NUMERIC=2]="NUMERIC"})(G||(G={}));class bc{constructor(e){this.buckets=e.buckets,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval,this.first_bucket_year=e.first_bucket_year,this.first_bucket_month=e.first_bucket_month,this.last_bucket_year=e.last_bucket_year,this.last_bucket_month=e.last_bucket_month,this.interval_in_months=e.interval_in_months}getSortedBuckets(e){const t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;const s=new Intl.Collator;switch(e){case G.ALPHABETICAL:return t.sort((r,o)=>s.compare(r.key.toString(),o.key.toString()));case G.NUMERIC:return t.sort((r,o)=>Number(o.key)-Number(r.key));case G.COUNT:default:return t}}isRawNumberBuckets(e){return typeof e[0]=="number"}}c([w()],bc.prototype,"getSortedBuckets",null);class ih{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.fields.query)===null||e===void 0?void 0:e.value}get title(){return this.fields.title}get query(){return this.fields.query}get date_favorited(){return this.fields.date_favorited}get __href__(){return this.fields.__href__}}class Pa{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){var e;return(e=this.rawMetadata.fields)===null||e===void 0?void 0:e.url}get mediatype(){return new vc("web")}get title(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.url?new B((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.url):void 0}get capture_dates(){var e,t;return!((e=this.rawMetadata.fields)===null||e===void 0)&&e.capture_dates?new je((t=this.rawMetadata.fields)===null||t===void 0?void 0:t.capture_dates):void 0}get __href__(){return this.fields.__href__}}c([w()],Pa.prototype,"title",null);c([w()],Pa.prototype,"capture_dates",null);class Oa{constructor(e){var t;this.rawMetadata=e,this.fields=new be((t=e.fields)!==null&&t!==void 0?t:{})}get identifier(){return this.fields.identifier}get highlight(){var e;return!((e=this.rawMetadata.highlight)===null||e===void 0)&&e.text?new B(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get ad_id(){return this.fields.ad_id}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get factcheck(){return this.fields.factcheck}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get files_count(){return this.fields.files_count}get is_clip(){return this.fields.is_clip}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get mediatype(){return this.fields.mediatype}get num_clips(){return this.fields.num_clips}get num_favorites(){return this.fields.num_favorites}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get week(){return this.fields.week}get year(){return this.fields.year}get start(){var e;return((e=this.rawMetadata.fields)===null||e===void 0?void 0:e.start)!=null?new B(this.rawMetadata.fields.start):void 0}get __href__(){return this.fields.__href__}get __img__(){return this.fields.__img__}}c([w()],Oa.prototype,"highlight",null);c([w()],Oa.prototype,"start",null);class Da{constructor(e){this.rawResponse=e}get item_size(){return this.rawResponse.item_size}get files_count(){return this.rawResponse.files_count}get month(){return this.rawResponse.month}get week(){return this.rawResponse.week}get downloads(){return this.rawResponse.downloads}get num_favorites(){return this.rawResponse.num_favorites}get title_message(){return this.rawResponse.title_message}get primary_collection(){return this.rawResponse.primary_collection}get thumbnail_url(){return this.rawResponse.thumbnail_url}get num_reviews(){return this.rawResponse.num_reviews}get uploader_details(){return this.rawResponse.uploader_details}get public_metadata(){if(this.rawResponse.public_metadata)return new A(this.rawResponse.public_metadata)}get part_of(){return this.rawResponse.part_of}get speech_vs_music_asr_metadata(){return this.rawResponse.speech_vs_music_asr_metadata}get reviews_metadata(){var e;return((e=this.rawResponse.reviews_metadata)!==null&&e!==void 0?e:[]).map(s=>new Aa(s))}}c([w()],Da.prototype,"public_metadata",null);c([w()],Da.prototype,"reviews_metadata",null);class La{constructor(e,t){var s,r,o,a,n,l,h,u,f,g,y,$,_,O,z;this.extraInfo=null,this.schema=t,this.schemaHitType=t?.hit_type;let P;e?.page_elements&&(this.pageElements=e.page_elements,P=Object.values(this.pageElements)[0]);let L=(s=e?.hits)===null||s===void 0?void 0:s.hits;this.totalResults=(o=(r=e?.hits)===null||r===void 0?void 0:r.total)!==null&&o!==void 0?o:0,this.returnedCount=(n=(a=e?.hits)===null||a===void 0?void 0:a.returned)!==null&&n!==void 0?n:0,!L?.length&&(!((l=this.pageElements)===null||l===void 0)&&l.service___fts)?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!L?.length&&(!((h=P?.hits)===null||h===void 0)&&h.hits)?(L=P.hits.hits,this.totalResults=(u=P.hits.total)!==null&&u!==void 0?u:0,this.returnedCount=(f=P.hits.returned)!==null&&f!==void 0?f:0):!((g=this.pageElements)===null||g===void 0)&&g.lending?L=this.handleLendingPageElement():!((y=this.pageElements)===null||y===void 0)&&y.web_archives&&(L=this.handleWebArchivesPageElement()),this.results=this.formatHits(L);let N=e?.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&P?.aggregations&&(N=P.aggregations),N&&this.buildAggregations(N),e?.collection_titles&&(this.collectionTitles=($=e.collection_titles)!==null&&$!==void 0?$:{}),e?.tv_channel_aliases&&(this.tvChannelAliases=(_=e.tv_channel_aliases)!==null&&_!==void 0?_:{}),e?.collection_extra_info&&(this.collectionExtraInfo=(O=e.collection_extra_info)!==null&&O!==void 0?O:null),e?.account_extra_info&&(this.accountExtraInfo=(z=e.account_extra_info)!==null&&z!==void 0?z:null),e?.extra_info&&(this.extraInfo=new Da(e.extra_info))}formatHits(e){var t;return(t=e?.map(s=>{var r;return La.createResult((r=s.hit_type)!==null&&r!==void 0?r:this.schemaHitType,s)}))!==null&&t!==void 0?t:[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((t,[s,r])=>(t[s]=new bc(r),t),{})}handleLendingPageElement(){var e,t;const s=(e=this.pageElements)===null||e===void 0?void 0:e.lending,r=(t=s.loans)!==null&&t!==void 0?t:[];this.totalResults=r.length,this.returnedCount=this.totalResults;for(const o of Jd)s[o]=this.formatHits(s[o]);return r}handleWebArchivesPageElement(){var e;const t=th((e=this.pageElements)===null||e===void 0?void 0:e.web_archives);return this.totalResults=t.length,this.returnedCount=this.totalResults,t}handleFederatedPageElements(){var e,t,s,r;const o=["service___fts","service___tvs","service___rcs","service___whisper","metadata___mediatype___texts","metadata___mediatype___movies","metadata___mediatype___audio","metadata___mediatype___software","metadata___mediatype___image","metadata___mediatype___etree"];for(const a of o){const n=this.removePageElementPrefix(a);this.federatedResults?this.federatedResults[a]=[]:this.federatedResults={[n]:[]};const l=(t=(e=this.pageElements)===null||e===void 0?void 0:e[a])===null||t===void 0?void 0:t.hits;l?.hits&&(this.federatedResults[n]=this.formatHits(l?.hits)),this.totalResults+=(s=l?.total)!==null&&s!==void 0?s:0,this.returnedCount+=(r=l?.returned)!==null&&r!==void 0?r:0}}removePageElementPrefix(e){return e.split("___").pop()}static createResult(e,t){switch(e){case"item":return new rt(t);case"text":case"asr_text":return new Ma(t);case"favorited_search":return new ih(t);case"web_archive":return new Pa(t);case"tv_clip":return new Oa(t);default:return new rt(t)}}}class sh{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}}class rh{constructor(e){var t,s,r;this.rawResponse=e,this.request=new sh(e.request),this.responseHeader=(t=e.response)===null||t===void 0?void 0:t.header,this.sessionContext=e.session_context,this.response=new La((s=e.response)===null||s===void 0?void 0:s.body,(r=e.response)===null||r===void 0?void 0:r.hit_schema)}}class Ui{static aggregateSearchParamsAsString(e){if(e.omit)return"false";if(e.advancedParams){const t=e.advancedParams.map(r=>({terms:r}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(",")}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){const t=new URLSearchParams;if(e.query&&t.append("user_query",e.query),e.pageType&&t.append("page_type",String(e.pageType)),e.pageTarget&&t.append("page_target",String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){const o=`[${e.pageElements.map(a=>`"${a}"`).join(",")}]`;t.append("page_elements",o)}if(e.rows!=null&&t.append("hits_per_page",String(e.rows)),e.page!=null&&t.append("page",String(e.page)),e.fields&&e.fields.length>0&&t.append("fields",e.fields.join(",")),e.filters&&Object.keys(e.filters).length>0){const r=this.filterParamsAsString(e.filters);r&&r!=="{}"&&t.append("filter_map",r)}if(e.sort&&e.sort.length>0){const r=e.sort.map(o=>this.sortParamsAsString(o));t.append("sort",r.join(","))}const s=e.aggregations;if(s){const r=this.aggregateSearchParamsAsString(s);r&&t.append("aggregations",r)}if(e.aggregationsSize!=null&&t.append("aggregations_size",String(e.aggregationsSize)),e.debugging&&t.append("debugging","true"),e.uid&&t.append("uid",e.uid),e.includeClientUrl!==!1){const r=e.query==null,o=e.query&&e.query.length<=1e3;if(r||o){const n=window.location.href.slice(0,400);t.append("client_url",n)}}return t}}var ps;(function(i){i.networkError="SearchService.NetworkError",i.itemNotFound="SearchService.ItemNotFound",i.decodingError="SearchService.DecodingError",i.searchEngineError="SearchService.SearchEngineError"})(ps||(ps={}));class oh extends Error{constructor(e,t,s){super(t),this.name=e,this.type=e,this.details=s}}const zn={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})};class Hi{constructor(e){var t,s;this.baseUrl=(t=e?.baseUrl)!==null&&t!==void 0?t:"archive.org",e?.includeCredentials!==void 0?this.includeCredentials=e.includeCredentials:this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null;const r=new URL(window.location.href).searchParams,o=r.get("scope"),a=r.get("verbose"),n=r.get("debugging"),l=r.get("cacheDebug");let h="";for(const u of Object.keys(zn))if(r.get(u)){h=zn[u];break}h=(s=r.get("caching"))!==null&&s!==void 0?s:h,e?.caching!==void 0?this.cachingFlags=e.caching:h&&(this.cachingFlags=h),e?.debuggingEnabled!==void 0?this.debuggingEnabled=e.debuggingEnabled:(n||l)&&(this.debuggingEnabled=!0),e?.scope!==void 0?this.requestScope=e.scope:o&&(this.requestScope=o),e?.verbose!==void 0?this.verbose=e.verbose:a&&(this.verbose=!!a)}async fetchUrl(e,t){var s,r;const o=new URL(e);this.requestScope&&o.searchParams.set("scope",this.requestScope),this.cachingFlags&&o.searchParams.set("caching",this.cachingFlags);let a;try{const n=(s=t?.requestOptions)!==null&&s!==void 0?s:{credentials:this.includeCredentials?"include":"same-origin"};a=await fetch(o.href,n)}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(ps.networkError,l)}try{const n=await a.json();this.verbose&&this.printResponse(n),n.debugging&&this.printDebuggingInfo(n);const l=(r=n.response)===null||r===void 0?void 0:r.error;return l?this.getErrorResult(ps.searchEngineError,l.message,l.forensics):{success:n}}catch(n){const l=n instanceof Error?n.message:typeof n=="string"?n:"Unknown error";return this.getErrorResult(ps.decodingError,l)}}getErrorResult(e,t,s){return{error:new oh(e,t,s)}}printResponse(e){var t,s,r,o,a;try{const n=JSON.parse(JSON.stringify(e)),l=(r=(s=(t=n?.response)===null||t===void 0?void 0:t.body)===null||s===void 0?void 0:s.hits)===null||r===void 0?void 0:r.hits;if(Array.isArray(l)&&l.length>1){const u=[];u.push(l[0]),u.push(`*** ${l.length-1} hits omitted ***`),n.response.body.hits.hits=u}const h=(a=(o=n?.response)===null||o===void 0?void 0:o.body)===null||a===void 0?void 0:a.aggregations;h&&Object.entries(h).forEach(([u,f])=>{var g,y,$,_;if(((y=(g=f)===null||g===void 0?void 0:g.buckets)===null||y===void 0?void 0:y.length)>0){const O=JSON.parse(JSON.stringify(f));O.buckets=`*** ${(_=($=O.buckets)===null||$===void 0?void 0:$.length)!==null&&_!==void 0?_:0} buckets omitted ***`,n.response.body.aggregations[u]=O}}),console.log("***** RESPONSE RECEIVED *****"),console.groupCollapsed("Response"),console.log(JSON.stringify(n,null,2)),console.groupEnd()}catch(n){console.error("Error printing search response:",n)}}printDebuggingInfo(e){var t,s;const r=e.debugging,o=(t=r.messages)!==null&&t!==void 0?t:[],a=(s=r.data)!==null&&s!==void 0?s:{};console.log("***** BEGIN DEBUGGING *****"),console.log("Full response:"),console.log(JSON.stringify(e,null,2)),console.group("Debug messages");for(const n of o)console.log(n);console.groupEnd(),console.group("Debug data");for(const[n,l]of Object.entries(a))console.log(n,l);console.groupEnd(),console.log("***** END DEBUGGING *****")}}class ah extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${s}`;return this.fetchUrl(r)}}class nh extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${s}`;return this.fetchUrl(r)}}class lh extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${s}`;return this.fetchUrl(r)}}var I;(function(i){i[i.DEFAULT=0]="DEFAULT",i[i.METADATA=1]="METADATA",i[i.FULLTEXT=2]="FULLTEXT",i[i.TV=3]="TV",i[i.RADIO=4]="RADIO",i[i.FEDERATED=5]="FEDERATED"})(I||(I={}));class ch extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?service_backend=tvs&${s}`;return this.fetchUrl(r)}}class dh extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${s}`;return this.fetchUrl(r)}}class hh extends Hi{constructor(e){var t;super(e),this.servicePath=(t=e?.servicePath)!==null&&t!==void 0?t:"/services/search/beta/page_production"}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);const s=Ui.generateURLSearchParams(e).toString(),r=`https://${this.baseUrl}${this.servicePath}/?${s}`,{pageType:o,identifiers:a}=e,l=o==="client_document_fetch"&&!!a?.length?{requestOptions:{method:"POST",body:JSON.stringify({doc_ids:a}),credentials:"include"}}:void 0;return this.fetchUrl(r,l)}}class Ei{constructor(e={}){this.backendOptions=e}async search(e,t=I.METADATA){const r=await Ei.getBackendForSearchType(t,this.backendOptions).performSearch(e);return r.error?r:{success:new rh(r.success)}}itemDetails(e){const t={pageType:"item_details",pageTarget:e};return this.search(t,I.DEFAULT)}static getBackendForSearchType(e,t={}){switch(e){case I.METADATA:return new ah(t);case I.FULLTEXT:return new nh(t);case I.RADIO:return new lh(t);case I.TV:return new ch(t);case I.FEDERATED:return new dh(t);default:return new hh(t)}}}Ei.default=new Ei;c([w((i,e={})=>{const{includeCredentials:t=!1,verbose:s=!1,scope:r="",baseUrl:o=""}=e;return`${i};${t};${s};${r};${o}`})],Ei,"getBackendForSearchType",null);var Pt;(function(i){i.INCLUDE="inc",i.EXCLUDE="exc",i.GREATER_THAN="gt",i.GREATER_OR_EQUAL="gte",i.LESS_THAN="lt",i.LESS_OR_EQUAL="lte"})(Pt||(Pt={}));class ph{constructor(){this.filterMap={}}addFilter(e,t,s){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){const r=[].concat(this.filterMap[e][t],s);this.filterMap[e][t]=Array.from(new Set(r))}else this.filterMap[e][t]=s;return this}removeSingleFilter(e,t,s){var r;if(!(!((r=this.filterMap[e])===null||r===void 0)&&r[t]))return this;const o=[].concat(this.filterMap[e][t]),a=o.indexOf(s);return a>=0&&o.splice(a,1),this.filterMap[e][t]=o.length===1?o[0]:o,o.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){const t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap={...e},this}mergeFilterMap(e){for(const[t,s]of Object.entries(e))for(const[r,o]of Object.entries(s))if(Array.isArray(o))for(const a of o)this.addFilter(t,r,a);else this.addFilter(t,r,o);return this}build(){return this.filterMap}}const Zs=globalThis,Fa=Zs.ShadowRoot&&(Zs.ShadyCSS===void 0||Zs.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,yc=Symbol(),In=new WeakMap;let uh=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==yc)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Fa&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=In.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&In.set(t,e))}return e}toString(){return this.cssText}};const fh=i=>new uh(typeof i=="string"?i:i+"",void 0,yc),mh=(i,e)=>{if(Fa)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=Zs.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},Nn=Fa?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return fh(t)})(i):i;const{is:gh,defineProperty:vh,getOwnPropertyDescriptor:bh,getOwnPropertyNames:yh,getOwnPropertySymbols:wh,getPrototypeOf:$h}=Object,Or=globalThis,Un=Or.trustedTypes,Sh=Un?Un.emptyScript:"",xh=Or.reactiveElementPolyfillSupport,us=(i,e)=>i,ur={toAttribute(i,e){switch(e){case Boolean:i=i?Sh:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Ba=(i,e)=>!gh(i,e),Hn={attribute:!0,type:String,converter:ur,reflect:!1,useDefault:!1,hasChanged:Ba};Symbol.metadata??=Symbol("metadata"),Or.litPropertyMetadata??=new WeakMap;let Qi=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Hn){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&vh(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:o}=bh(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){const n=r?.call(this);o?.call(this,a),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Hn}static _$Ei(){if(this.hasOwnProperty(us("elementProperties")))return;const e=$h(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(us("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(us("properties"))){const t=this.properties,s=[...yh(t),...wh(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(Nn(r))}else e!==void 0&&t.push(Nn(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return mh(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:ur).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:ur;this._$Em=r;const n=a.fromAttribute(t,o.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){const a=this.constructor;if(r===!1&&(o=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??Ba)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:a}=o,n=this[r];a!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,o,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};Qi.elementStyles=[],Qi.shadowRootOptions={mode:"open"},Qi[us("elementProperties")]=new Map,Qi[us("finalized")]=new Map,xh?.({ReactiveElement:Qi}),(Or.reactiveElementVersions??=[]).push("2.1.2");const Ra=globalThis,Vn=i=>i,fr=Ra.trustedTypes,jn=fr?fr.createPolicy("lit-html",{createHTML:i=>i}):void 0,wc="$lit$",Lt=`lit$${Math.random().toFixed(9).slice(2)}$`,$c="?"+Lt,Ch=`<${$c}>`,ni=document,mr=()=>ni.createComment(""),_s=i=>i===null||typeof i!="object"&&typeof i!="function",za=Array.isArray,_h=i=>za(i)||typeof i?.[Symbol.iterator]=="function",lo=`[ 	
\f\r]`,Ki=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Wn=/-->/g,qn=/>/g,Ht=RegExp(`>|${lo}(?:([^\\s"'>=/]+)(${lo}*=${lo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Gn=/'/g,Yn=/"/g,Sc=/^(?:script|style|textarea|title)$/i,We=Symbol.for("lit-noChange"),oe=Symbol.for("lit-nothing"),Qn=new WeakMap,Xt=ni.createTreeWalker(ni,129);function xc(i,e){if(!za(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return jn!==void 0?jn.createHTML(e):e}const Th=(i,e)=>{const t=i.length-1,s=[];let r,o=e===2?"<svg>":e===3?"<math>":"",a=Ki;for(let n=0;n<t;n++){const l=i[n];let h,u,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,u=a.exec(l),u!==null);)g=a.lastIndex,a===Ki?u[1]==="!--"?a=Wn:u[1]!==void 0?a=qn:u[2]!==void 0?(Sc.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=Ht):u[3]!==void 0&&(a=Ht):a===Ht?u[0]===">"?(a=r??Ki,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?Ht:u[3]==='"'?Yn:Gn):a===Yn||a===Gn?a=Ht:a===Wn||a===qn?a=Ki:(a=Ht,r=void 0);const y=a===Ht&&i[n+1].startsWith("/>")?" ":"";o+=a===Ki?l+Ch:f>=0?(s.push(h),l.slice(0,f)+wc+l.slice(f)+Lt+y):l+Lt+(f===-2?n:y)}return[xc(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};let ia=class Cc{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,a=0;const n=e.length-1,l=this.parts,[h,u]=Th(e,t);if(this.el=Cc.createElement(h,s),Xt.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=Xt.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(wc)){const g=u[a++],y=r.getAttribute(f).split(Lt),$=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Eh:$[1]==="?"?Ah:$[1]==="@"?Mh:Dr}),r.removeAttribute(f)}else f.startsWith(Lt)&&(l.push({type:6,index:o}),r.removeAttribute(f));if(Sc.test(r.tagName)){const f=r.textContent.split(Lt),g=f.length-1;if(g>0){r.textContent=fr?fr.emptyScript:"";for(let y=0;y<g;y++)r.append(f[y],mr()),Xt.nextNode(),l.push({type:2,index:++o});r.append(f[g],mr())}}}else if(r.nodeType===8)if(r.data===$c)l.push({type:2,index:o});else{let f=-1;for(;(f=r.data.indexOf(Lt,f+1))!==-1;)l.push({type:7,index:o}),f+=Lt.length-1}o++}}static createElement(e,t){const s=ni.createElement("template");return s.innerHTML=e,s}};function Ai(i,e,t=i,s){if(e===We)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl;const o=_s(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=Ai(i,r._$AS(i,e.values),r,s)),e}let kh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??ni).importNode(t,!0);Xt.currentNode=r;let o=Xt.nextNode(),a=0,n=0,l=s[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new Ia(o,o.nextSibling,this,e):l.type===1?h=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(h=new Ph(o,this,e)),this._$AV.push(h),l=s[++n]}a!==l?.index&&(o=Xt.nextNode(),a++)}return Xt.currentNode=ni,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},Ia=class _c{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=oe,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ai(this,e,t),_s(e)?e===oe||e==null||e===""?(this._$AH!==oe&&this._$AR(),this._$AH=oe):e!==this._$AH&&e!==We&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_h(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==oe&&_s(this._$AH)?this._$AA.nextSibling.data=e:this.T(ni.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=ia.createElement(xc(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{const o=new kh(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=Qn.get(e.strings);return t===void 0&&Qn.set(e.strings,t=new ia(e)),t}k(e){za(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const o of e)r===t.length?t.push(s=new _c(this.O(mr()),this.O(mr()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=Vn(e).nextSibling;Vn(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Dr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=oe,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=oe}_$AI(e,t=this,s,r){const o=this.strings;let a=!1;if(o===void 0)e=Ai(this,e,t,0),a=!_s(e)||e!==this._$AH&&e!==We,a&&(this._$AH=e);else{const n=e;let l,h;for(e=o[0],l=0;l<o.length-1;l++)h=Ai(this,n[s+l],t,l),h===We&&(h=this._$AH[l]),a||=!_s(h)||h!==this._$AH[l],h===oe?e=oe:e!==oe&&(e+=(h??"")+o[l+1]),this._$AH[l]=h}a&&!r&&this.j(e)}j(e){e===oe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Eh=class extends Dr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===oe?void 0:e}},Ah=class extends Dr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==oe)}},Mh=class extends Dr{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=Ai(this,e,t,0)??oe)===We)return;const s=this._$AH,r=e===oe&&s!==oe||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==oe&&(s===oe||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ph=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Ai(this,e)}};const Oh={I:Ia},Dh=Ra.litHtmlPolyfillSupport;Dh?.(ia,Ia),(Ra.litHtmlVersions??=[]).push("3.3.2");const Js=globalThis,Na=Js.ShadowRoot&&(Js.ShadyCSS===void 0||Js.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ua=Symbol(),Kn=new WeakMap;let Tc=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Ua)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(Na&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=Kn.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&Kn.set(t,e))}return e}toString(){return this.cssText}};const Lh=i=>new Tc(typeof i=="string"?i:i+"",void 0,Ua),S=(i,...e)=>{const t=i.length===1?i[0]:e.reduce((s,r,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1],i[0]);return new Tc(t,i,Ua)},Fh=(i,e)=>{if(Na)i.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const s=document.createElement("style"),r=Js.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}},Xn=Na?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return Lh(t)})(i):i;const{is:Bh,defineProperty:Rh,getOwnPropertyDescriptor:zh,getOwnPropertyNames:Ih,getOwnPropertySymbols:Nh,getPrototypeOf:Uh}=Object,Lr=globalThis,Zn=Lr.trustedTypes,Hh=Zn?Zn.emptyScript:"",Vh=Lr.reactiveElementPolyfillSupport,fs=(i,e)=>i,sa={toAttribute(i,e){switch(e){case Boolean:i=i?Hh:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},kc=(i,e)=>!Bh(i,e),Jn={attribute:!0,type:String,converter:sa,reflect:!1,useDefault:!1,hasChanged:kc};Symbol.metadata??=Symbol("metadata"),Lr.litPropertyMetadata??=new WeakMap;let $i=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=Jn){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Rh(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){const{get:r,set:o}=zh(this.prototype,e)??{get(){return this[t]},set(a){this[t]=a}};return{get:r,set(a){const n=r?.call(this);o?.call(this,a),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Jn}static _$Ei(){if(this.hasOwnProperty(fs("elementProperties")))return;const e=Uh(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(fs("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(fs("properties"))){const t=this.properties,s=[...Ih(t),...Nh(t)];for(const r of s)this.createProperty(r,t[r])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[s,r]of t)this.elementProperties.set(s,r)}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const r=this._$Eu(t,s);r!==void 0&&this._$Eh.set(r,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(Xn(r))}else e!==void 0&&t.push(Xn(e));return t}static _$Eu(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Fh(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,s);if(r!==void 0&&s.reflect===!0){const o=(s.converter?.toAttribute!==void 0?s.converter:sa).toAttribute(t,s.type);this._$Em=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,r=s._$Eh.get(e);if(r!==void 0&&this._$Em!==r){const o=s.getPropertyOptions(r),a=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:sa;this._$Em=r;const n=a.fromAttribute(t,o.type);this[r]=n??this._$Ej?.get(r)??n,this._$Em=null}}requestUpdate(e,t,s,r=!1,o){if(e!==void 0){const a=this.constructor;if(r===!1&&(o=this[e]),s??=a.getPropertyOptions(e),!((s.hasChanged??kc)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,s))))return;this.C(e,t,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:r,wrapped:o},a){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),o!==!0||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),r===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[r,o]of this._$Ep)this[r]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[r,o]of s){const{wrapped:a}=o,n=this[r];a!==!0||this._$AL.has(r)||n===void 0||this.C(r,void 0,o,n)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(t)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(e){}firstUpdated(e){}};$i.elementStyles=[],$i.shadowRootOptions={mode:"open"},$i[fs("elementProperties")]=new Map,$i[fs("finalized")]=new Map,Vh?.({ReactiveElement:$i}),(Lr.reactiveElementVersions??=[]).push("2.1.2");const Ha=globalThis,el=i=>i,gr=Ha.trustedTypes,tl=gr?gr.createPolicy("lit-html",{createHTML:i=>i}):void 0,Ec="$lit$",Ft=`lit$${Math.random().toFixed(9).slice(2)}$`,Ac="?"+Ft,jh=`<${Ac}>`,li=document,Ts=()=>li.createComment(""),ks=i=>i===null||typeof i!="object"&&typeof i!="function",Va=Array.isArray,Wh=i=>Va(i)||typeof i?.[Symbol.iterator]=="function",co=`[ 	
\f\r]`,Xi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,il=/-->/g,sl=/>/g,Vt=RegExp(`>|${co}(?:([^\\s"'>=/]+)(${co}*=${co}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rl=/'/g,ol=/"/g,Mc=/^(?:script|style|textarea|title)$/i,Pc=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),p=Pc(1),Q=Pc(2),Mi=Symbol.for("lit-noChange"),v=Symbol.for("lit-nothing"),al=new WeakMap,Zt=li.createTreeWalker(li,129);function Oc(i,e){if(!Va(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return tl!==void 0?tl.createHTML(e):e}const qh=(i,e)=>{const t=i.length-1,s=[];let r,o=e===2?"<svg>":e===3?"<math>":"",a=Xi;for(let n=0;n<t;n++){const l=i[n];let h,u,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,u=a.exec(l),u!==null);)g=a.lastIndex,a===Xi?u[1]==="!--"?a=il:u[1]!==void 0?a=sl:u[2]!==void 0?(Mc.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=Vt):u[3]!==void 0&&(a=Vt):a===Vt?u[0]===">"?(a=r??Xi,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?Vt:u[3]==='"'?ol:rl):a===ol||a===rl?a=Vt:a===il||a===sl?a=Xi:(a=Vt,r=void 0);const y=a===Vt&&i[n+1].startsWith("/>")?" ":"";o+=a===Xi?l+jh:f>=0?(s.push(h),l.slice(0,f)+Ec+l.slice(f)+Ft+y):l+Ft+(f===-2?n:y)}return[Oc(i,o+(i[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),s]};let ra=class Dc{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,a=0;const n=e.length-1,l=this.parts,[h,u]=qh(e,t);if(this.el=Dc.createElement(h,s),Zt.currentNode=this.el.content,t===2||t===3){const f=this.el.content.firstChild;f.replaceWith(...f.childNodes)}for(;(r=Zt.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes())for(const f of r.getAttributeNames())if(f.endsWith(Ec)){const g=u[a++],y=r.getAttribute(f).split(Ft),$=/([.?@])?(.*)/.exec(g);l.push({type:1,index:o,name:$[2],strings:y,ctor:$[1]==="."?Yh:$[1]==="?"?Qh:$[1]==="@"?Kh:Fr}),r.removeAttribute(f)}else f.startsWith(Ft)&&(l.push({type:6,index:o}),r.removeAttribute(f));if(Mc.test(r.tagName)){const f=r.textContent.split(Ft),g=f.length-1;if(g>0){r.textContent=gr?gr.emptyScript:"";for(let y=0;y<g;y++)r.append(f[y],Ts()),Zt.nextNode(),l.push({type:2,index:++o});r.append(f[g],Ts())}}}else if(r.nodeType===8)if(r.data===Ac)l.push({type:2,index:o});else{let f=-1;for(;(f=r.data.indexOf(Ft,f+1))!==-1;)l.push({type:7,index:o}),f+=Ft.length-1}o++}}static createElement(e,t){const s=li.createElement("template");return s.innerHTML=e,s}};function Pi(i,e,t=i,s){if(e===Mi)return e;let r=s!==void 0?t._$Co?.[s]:t._$Cl;const o=ks(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),o===void 0?r=void 0:(r=new o(i),r._$AT(i,t,s)),s!==void 0?(t._$Co??=[])[s]=r:t._$Cl=r),r!==void 0&&(e=Pi(i,r._$AS(i,e.values),r,s)),e}let Gh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,r=(e?.creationScope??li).importNode(t,!0);Zt.currentNode=r;let o=Zt.nextNode(),a=0,n=0,l=s[0];for(;l!==void 0;){if(a===l.index){let h;l.type===2?h=new ja(o,o.nextSibling,this,e):l.type===1?h=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(h=new Xh(o,this,e)),this._$AV.push(h),l=s[++n]}a!==l?.index&&(o=Zt.nextNode(),a++)}return Zt.currentNode=li,r}p(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},ja=class Lc{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,r){this.type=2,this._$AH=v,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Pi(this,e,t),ks(e)?e===v||e==null||e===""?(this._$AH!==v&&this._$AR(),this._$AH=v):e!==this._$AH&&e!==Mi&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Wh(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==v&&ks(this._$AH)?this._$AA.nextSibling.data=e:this.T(li.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,r=typeof s=="number"?this._$AC(e):(s.el===void 0&&(s.el=ra.createElement(Oc(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===r)this._$AH.p(t);else{const o=new Gh(r,this),a=o.u(this.options);o.p(t),this.T(a),this._$AH=o}}_$AC(e){let t=al.get(e.strings);return t===void 0&&al.set(e.strings,t=new ra(e)),t}k(e){Va(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const o of e)r===t.length?t.push(s=new Lc(this.O(Ts()),this.O(Ts()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const s=el(e).nextSibling;el(e).remove(),e=s}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Fr=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,r,o){this.type=1,this._$AH=v,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=v}_$AI(e,t=this,s,r){const o=this.strings;let a=!1;if(o===void 0)e=Pi(this,e,t,0),a=!ks(e)||e!==this._$AH&&e!==Mi,a&&(this._$AH=e);else{const n=e;let l,h;for(e=o[0],l=0;l<o.length-1;l++)h=Pi(this,n[s+l],t,l),h===Mi&&(h=this._$AH[l]),a||=!ks(h)||h!==this._$AH[l],h===v?e=v:e!==v&&(e+=(h??"")+o[l+1]),this._$AH[l]=h}a&&!r&&this.j(e)}j(e){e===v?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Yh=class extends Fr{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===v?void 0:e}},Qh=class extends Fr{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==v)}},Kh=class extends Fr{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){if((e=Pi(this,e,t,0)??v)===Mi)return;const s=this._$AH,r=e===v&&s!==v||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==v&&(s===v||r);r&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Xh=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Pi(this,e)}};const Zh=Ha.litHtmlPolyfillSupport;Zh?.(ra,ja),(Ha.litHtmlVersions??=[]).push("3.3.2");const Jh=(i,e,t)=>{const s=t?.renderBefore??e;let r=s._$litPart$;if(r===void 0){const o=t?.renderBefore??null;s._$litPart$=r=new ja(e.insertBefore(Ts(),o),o,void 0,t??{})}return r._$AI(i),r};const Wa=globalThis;let H=class extends $i{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Jh(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Mi}};H._$litElement$=!0,H.finalized=!0,Wa.litElementHydrateSupport?.({LitElement:H});const e1=Wa.litElementPolyfillSupport;e1?.({LitElement:H});(Wa.litElementVersions??=[]).push("4.2.2");const U=i=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(i,e)}):customElements.define(i,e)};const t1={attribute:!0,type:String,converter:ur,reflect:!1,hasChanged:Ba},i1=(i=t1,e,t)=>{const{kind:s,metadata:r}=t;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),o.set(t.name,i),s==="accessor"){const{name:a}=t;return{set(n){const l=e.get.call(this);e.set.call(this,n),this.requestUpdate(a,l,i,!0,n)},init(n){return n!==void 0&&this.C(a,void 0,i,n),n}}}if(s==="setter"){const{name:a}=t;return function(n){const l=this[a];e.call(this,n),this.requestUpdate(a,l,i,!0,n)}}throw Error("Unsupported decorator location: "+s)};function d(i){return(e,t)=>typeof t=="object"?i1(i,e,t):((s,r,o)=>{const a=r.hasOwnProperty(o);return r.constructor.createProperty(o,s),a?Object.getOwnPropertyDescriptor(r,o):void 0})(i,e,t)}function R(i){return d({...i,state:!0,attribute:!1})}const s1=(i,e,t)=>(t.configurable=!0,t.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(i,e,t),t);function Z(i,e){return(t,s,r)=>{const o=a=>a.renderRoot?.querySelector(i)??null;return s1(t,s,{get(){return o(this)}})}}class r1{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(const t of e){const s=this.resizeHandlers.get(t.target);s?.forEach(r=>{r.handleResize(t)})}})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){var t;const s=(t=this.resizeHandlers.get(e.target))!==null&&t!==void 0?t:new Set;s.add(e.handler),this.resizeHandlers.set(e.target,s),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){const t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}}const ut={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ds=i=>(...e)=>({_$litDirective$:i,values:e});let Ls=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const qe=Ds(class extends Ls{constructor(i){if(super(i),i.type!==ut.ATTRIBUTE||i.name!=="class"||i.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter(e=>i[e]).join(" ")+" "}update(i,[e]){if(this.st===void 0){this.st=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(const s in e)e[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(e)}const t=i.element.classList;for(const s of this.st)s in e||(t.remove(s),this.st.delete(s));for(const s in e){const r=!!e[s];r===this.st.has(s)||this.nt?.has(s)||(r?(t.add(s),this.st.add(s)):(t.remove(s),this.st.delete(s)))}return We}});const o1=(i,...e)=>({strTag:!0,strings:i,values:e}),ft=o1,a1=i=>typeof i!="string"&&"strTag"in i,n1=(i,e,t)=>{let s=i[0];for(let r=1;r<i.length;r++)s+=e[r-1],s+=i[r];return s};const l1=(i=>a1(i)?n1(i.strings,i.values):i);let x=l1;let c1=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}};for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let d1=new c1;d1.resolve();const er=window,qa=er.ShadowRoot&&(er.ShadyCSS===void 0||er.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ga=Symbol(),nl=new WeakMap;let Fc=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==Ga)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(qa&&e===void 0){const s=t!==void 0&&t.length===1;s&&(e=nl.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&nl.set(t,e))}return e}toString(){return this.cssText}};const h1=i=>new Fc(typeof i=="string"?i:i+"",void 0,Ga),b=(i,...e)=>{const t=i.length===1?i[0]:e.reduce(((s,r,o)=>s+(a=>{if(a._$cssResult$===!0)return a.cssText;if(typeof a=="number")return a;throw Error("Value passed to 'css' function must be a 'css' function result: "+a+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+i[o+1]),i[0]);return new Fc(t,i,Ga)},p1=(i,e)=>{qa?i.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((t=>{const s=document.createElement("style"),r=er.litNonce;r!==void 0&&s.setAttribute("nonce",r),s.textContent=t.cssText,i.appendChild(s)}))},ll=qa?i=>i:i=>i instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return h1(t)})(i):i;var ho;const vr=window,cl=vr.trustedTypes,u1=cl?cl.emptyScript:"",dl=vr.reactiveElementPolyfillSupport,oa={toAttribute(i,e){switch(e){case Boolean:i=i?u1:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,e){let t=i;switch(e){case Boolean:t=i!==null;break;case Number:t=i===null?null:Number(i);break;case Object:case Array:try{t=JSON.parse(i)}catch{t=null}}return t}},Bc=(i,e)=>e!==i&&(e==e||i==i),po={attribute:!0,type:String,converter:oa,reflect:!1,hasChanged:Bc},aa="finalized";let Ne=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),((t=this.h)!==null&&t!==void 0?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach(((t,s)=>{const r=this._$Ep(s,t);r!==void 0&&(this._$Ev.set(r,s),e.push(r))})),e}static createProperty(e,t=po){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const s=typeof e=="symbol"?Symbol():"__"+e,r=this.getPropertyDescriptor(e,s,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,s){return{get(){return this[t]},set(r){const o=this[e];this[t]=r,this.requestUpdate(e,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||po}static finalize(){if(this.hasOwnProperty(aa))return!1;this[aa]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,s=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const r of s)this.createProperty(r,t[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const r of s)t.unshift(ll(r))}else e!==void 0&&t.push(ll(e));return t}static _$Ep(e,t){const s=t.attribute;return s===!1?void 0:typeof s=="string"?s:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach((t=>t(this)))}addController(e){var t,s;((t=this._$ES)!==null&&t!==void 0?t:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((s=e.hostConnected)===null||s===void 0||s.call(e))}removeController(e){var t;(t=this._$ES)===null||t===void 0||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){var e;const t=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return p1(t,this.constructor.elementStyles),t}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach((t=>{var s;return(s=t.hostConnected)===null||s===void 0?void 0:s.call(t)}))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach((t=>{var s;return(s=t.hostDisconnected)===null||s===void 0?void 0:s.call(t)}))}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$EO(e,t,s=po){var r;const o=this.constructor._$Ep(e,s);if(o!==void 0&&s.reflect===!0){const a=(((r=s.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?s.converter:oa).toAttribute(t,s.type);this._$El=e,a==null?this.removeAttribute(o):this.setAttribute(o,a),this._$El=null}}_$AK(e,t){var s;const r=this.constructor,o=r._$Ev.get(e);if(o!==void 0&&this._$El!==o){const a=r.getPropertyOptions(o),n=typeof a.converter=="function"?{fromAttribute:a.converter}:((s=a.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?a.converter:oa;this._$El=o,this[o]=n.fromAttribute(t,a.type),this._$El=null}}requestUpdate(e,t,s){let r=!0;e!==void 0&&(((s=s||this.constructor.getPropertyOptions(e)).hasChanged||Bc)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),s.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,s))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((r,o)=>this[o]=r)),this._$Ei=void 0);let t=!1;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),(e=this._$ES)===null||e===void 0||e.forEach((r=>{var o;return(o=r.hostUpdate)===null||o===void 0?void 0:o.call(r)})),this.update(s)):this._$Ek()}catch(r){throw t=!1,this._$Ek(),r}t&&this._$AE(s)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)===null||t===void 0||t.forEach((s=>{var r;return(r=s.hostUpdated)===null||r===void 0?void 0:r.call(s)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((t,s)=>this._$EO(s,this[s],t))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Ne[aa]=!0,Ne.elementProperties=new Map,Ne.elementStyles=[],Ne.shadowRootOptions={mode:"open"},dl?.({ReactiveElement:Ne}),((ho=vr.reactiveElementVersions)!==null&&ho!==void 0?ho:vr.reactiveElementVersions=[]).push("1.6.3");var uo;const br=window,Oi=br.trustedTypes,hl=Oi?Oi.createPolicy("lit-html",{createHTML:i=>i}):void 0,na="$lit$",Bt=`lit$${(Math.random()+"").slice(9)}$`,Rc="?"+Bt,f1=`<${Rc}>`,ci=document,Es=()=>ci.createComment(""),As=i=>i===null||typeof i!="object"&&typeof i!="function",zc=Array.isArray,m1=i=>zc(i)||typeof i?.[Symbol.iterator]=="function",fo=`[ 	
\f\r]`,Zi=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pl=/-->/g,ul=/>/g,jt=RegExp(`>|${fo}(?:([^\\s"'>=/]+)(${fo}*=${fo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),fl=/'/g,ml=/"/g,Ic=/^(?:script|style|textarea|title)$/i,Nc=i=>(e,...t)=>({_$litType$:i,strings:e,values:t}),M=Nc(1),ii=Nc(2),ge=Symbol.for("lit-noChange"),Y=Symbol.for("lit-nothing"),gl=new WeakMap,Jt=ci.createTreeWalker(ci,129,null,!1);function Uc(i,e){if(!Array.isArray(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return hl!==void 0?hl.createHTML(e):e}const g1=(i,e)=>{const t=i.length-1,s=[];let r,o=e===2?"<svg>":"",a=Zi;for(let n=0;n<t;n++){const l=i[n];let h,u,f=-1,g=0;for(;g<l.length&&(a.lastIndex=g,u=a.exec(l),u!==null);)g=a.lastIndex,a===Zi?u[1]==="!--"?a=pl:u[1]!==void 0?a=ul:u[2]!==void 0?(Ic.test(u[2])&&(r=RegExp("</"+u[2],"g")),a=jt):u[3]!==void 0&&(a=jt):a===jt?u[0]===">"?(a=r??Zi,f=-1):u[1]===void 0?f=-2:(f=a.lastIndex-u[2].length,h=u[1],a=u[3]===void 0?jt:u[3]==='"'?ml:fl):a===ml||a===fl?a=jt:a===pl||a===ul?a=Zi:(a=jt,r=void 0);const y=a===jt&&i[n+1].startsWith("/>")?" ":"";o+=a===Zi?l+f1:f>=0?(s.push(h),l.slice(0,f)+na+l.slice(f)+Bt+y):l+Bt+(f===-2?(s.push(void 0),n):y)}return[Uc(i,o+(i[t]||"<?>")+(e===2?"</svg>":"")),s]};class Ms{constructor({strings:e,_$litType$:t},s){let r;this.parts=[];let o=0,a=0;const n=e.length-1,l=this.parts,[h,u]=g1(e,t);if(this.el=Ms.createElement(h,s),Jt.currentNode=this.el.content,t===2){const f=this.el.content,g=f.firstChild;g.remove(),f.append(...g.childNodes)}for(;(r=Jt.nextNode())!==null&&l.length<n;){if(r.nodeType===1){if(r.hasAttributes()){const f=[];for(const g of r.getAttributeNames())if(g.endsWith(na)||g.startsWith(Bt)){const y=u[a++];if(f.push(g),y!==void 0){const $=r.getAttribute(y.toLowerCase()+na).split(Bt),_=/([.?@])?(.*)/.exec(y);l.push({type:1,index:o,name:_[2],strings:$,ctor:_[1]==="."?b1:_[1]==="?"?w1:_[1]==="@"?$1:Br})}else l.push({type:6,index:o})}for(const g of f)r.removeAttribute(g)}if(Ic.test(r.tagName)){const f=r.textContent.split(Bt),g=f.length-1;if(g>0){r.textContent=Oi?Oi.emptyScript:"";for(let y=0;y<g;y++)r.append(f[y],Es()),Jt.nextNode(),l.push({type:2,index:++o});r.append(f[g],Es())}}}else if(r.nodeType===8)if(r.data===Rc)l.push({type:2,index:o});else{let f=-1;for(;(f=r.data.indexOf(Bt,f+1))!==-1;)l.push({type:7,index:o}),f+=Bt.length-1}o++}}static createElement(e,t){const s=ci.createElement("template");return s.innerHTML=e,s}}function Di(i,e,t=i,s){var r,o,a,n;if(e===ge)return e;let l=s!==void 0?(r=t._$Co)===null||r===void 0?void 0:r[s]:t._$Cl;const h=As(e)?void 0:e._$litDirective$;return l?.constructor!==h&&((o=l?._$AO)===null||o===void 0||o.call(l,!1),h===void 0?l=void 0:(l=new h(i),l._$AT(i,t,s)),s!==void 0?((a=(n=t)._$Co)!==null&&a!==void 0?a:n._$Co=[])[s]=l:t._$Cl=l),l!==void 0&&(e=Di(i,l._$AS(i,e.values),l,s)),e}let v1=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:s},parts:r}=this._$AD,o=((t=e?.creationScope)!==null&&t!==void 0?t:ci).importNode(s,!0);Jt.currentNode=o;let a=Jt.nextNode(),n=0,l=0,h=r[0];for(;h!==void 0;){if(n===h.index){let u;h.type===2?u=new Vi(a,a.nextSibling,this,e):h.type===1?u=new h.ctor(a,h.name,h.strings,this,e):h.type===6&&(u=new S1(a,this,e)),this._$AV.push(u),h=r[++l]}n!==h?.index&&(a=Jt.nextNode(),n++)}return Jt.currentNode=ci,o}v(e){let t=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}};class Vi{constructor(e,t,s,r){var o;this.type=2,this._$AH=Y,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=r,this._$Cp=(o=r?.isConnected)===null||o===void 0||o}get _$AU(){var e,t;return(t=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&t!==void 0?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Di(this,e,t),As(e)?e===Y||e==null||e===""?(this._$AH!==Y&&this._$AR(),this._$AH=Y):e!==this._$AH&&e!==ge&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):m1(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Y&&As(this._$AH)?this._$AA.nextSibling.data=e:this.$(ci.createTextNode(e)),this._$AH=e}g(e){var t;const{values:s,_$litType$:r}=e,o=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ms.createElement(Uc(r.h,r.h[0]),this.options)),r);if(((t=this._$AH)===null||t===void 0?void 0:t._$AD)===o)this._$AH.v(s);else{const a=new v1(o,this),n=a.u(this.options);a.v(s),this.$(n),this._$AH=a}}_$AC(e){let t=gl.get(e.strings);return t===void 0&&gl.set(e.strings,t=new Ms(e)),t}T(e){zc(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,r=0;for(const o of e)r===t.length?t.push(s=new Vi(this.k(Es()),this.k(Es()),this,this.options)):s=t[r],s._$AI(o),r++;r<t.length&&(this._$AR(s&&s._$AB.nextSibling,r),t.length=r)}_$AR(e=this._$AA.nextSibling,t){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,t);e&&e!==this._$AB;){const r=e.nextSibling;e.remove(),e=r}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)===null||t===void 0||t.call(this,e))}}class Br{constructor(e,t,s,r,o){this.type=1,this._$AH=Y,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Y}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,s,r){const o=this.strings;let a=!1;if(o===void 0)e=Di(this,e,t,0),a=!As(e)||e!==this._$AH&&e!==ge,a&&(this._$AH=e);else{const n=e;let l,h;for(e=o[0],l=0;l<o.length-1;l++)h=Di(this,n[s+l],t,l),h===ge&&(h=this._$AH[l]),a||(a=!As(h)||h!==this._$AH[l]),h===Y?e=Y:e!==Y&&(e+=(h??"")+o[l+1]),this._$AH[l]=h}a&&!r&&this.j(e)}j(e){e===Y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}let b1=class extends Br{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Y?void 0:e}};const y1=Oi?Oi.emptyScript:"";let w1=class extends Br{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Y?this.element.setAttribute(this.name,y1):this.element.removeAttribute(this.name)}};class $1 extends Br{constructor(e,t,s,r,o){super(e,t,s,r,o),this.type=5}_$AI(e,t=this){var s;if((e=(s=Di(this,e,t,0))!==null&&s!==void 0?s:Y)===ge)return;const r=this._$AH,o=e===Y&&r!==Y||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,a=e!==Y&&(r===Y||o);o&&this.element.removeEventListener(this.name,this,r),a&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,s;typeof this._$AH=="function"?this._$AH.call((s=(t=this.options)===null||t===void 0?void 0:t.host)!==null&&s!==void 0?s:this.element,e):this._$AH.handleEvent(e)}}class S1{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Di(this,e)}}const x1={I:Vi},vl=br.litHtmlPolyfillSupport;vl?.(Ms,Vi),((uo=br.litHtmlVersions)!==null&&uo!==void 0?uo:br.litHtmlVersions=[]).push("2.8.0");const tt=(i,e,t)=>{var s,r;const o=(s=t?.renderBefore)!==null&&s!==void 0?s:e;let a=o._$litPart$;if(a===void 0){const n=(r=t?.renderBefore)!==null&&r!==void 0?r:null;o._$litPart$=a=new Vi(e.insertBefore(Es(),n),n,void 0,t??{})}return a._$AI(i),a};var mo,go;let ms=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};ms.finalized=!0,ms._$litElement$=!0,(mo=globalThis.litElementHydrateSupport)===null||mo===void 0||mo.call(globalThis,{LitElement:ms});const bl=globalThis.litElementPolyfillSupport;bl?.({LitElement:ms});((go=globalThis.litElementVersions)!==null&&go!==void 0?go:globalThis.litElementVersions=[]).push("3.3.3");const Qe=i=>e=>typeof e=="function"?((t,s)=>(customElements.define(t,s),s))(i,e):((t,s)=>{const{kind:r,elements:o}=s;return{kind:r,elements:o,finisher(a){customElements.define(t,a)}}})(i,e);const C1=(i,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(t){t.createProperty(e.key,i)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(t){t.createProperty(e.key,i)}},_1=(i,e,t)=>{e.constructor.createProperty(t,i)};function T(i){return(e,t)=>t!==void 0?_1(i,e,t):C1(i,e)}function ve(i){return T({...i,state:!0})}const Ya=({finisher:i,descriptor:e})=>(t,s)=>{var r;if(s===void 0){const o=(r=t.originalKey)!==null&&r!==void 0?r:t.key,a=e!=null?{kind:"method",placement:"prototype",key:o,descriptor:e(t.key)}:{...t,key:o};return i!=null&&(a.finisher=function(n){i(n,o)}),a}{const o=t.constructor;e!==void 0&&Object.defineProperty(t,s,e(s)),i?.(o,s)}};function Be(i,e){return Ya({descriptor:t=>({get(){var r,o;return(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(i))!==null&&o!==void 0?o:null},enumerable:!0,configurable:!0})})}function T1(i){return Ya({descriptor:e=>({get(){var t,s;return(s=(t=this.renderRoot)===null||t===void 0?void 0:t.querySelectorAll(i))!==null&&s!==void 0?s:[]},enumerable:!0,configurable:!0})})}var vo;const k1=((vo=window.HTMLSlotElement)===null||vo===void 0?void 0:vo.prototype.assignedElements)!=null?(i,e)=>i.assignedElements(e):(i,e)=>i.assignedNodes(e).filter((t=>t.nodeType===Node.ELEMENT_NODE));function Hc(i){const{slot:e,selector:t}=i??{};return Ya({descriptor:s=>({get(){var r;const o="slot"+(e?`[name=${e}]`:":not([name])"),a=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(o),n=a!=null?k1(a,i):[];return t?n.filter((l=>l.matches(t))):n},enumerable:!0,configurable:!0})})}const $t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Rr=i=>(...e)=>({_$litDirective$:i,values:e});let zr=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}};const{I:E1}=x1,A1=i=>i.strings===void 0,yl=()=>document.createComment(""),Ji=(i,e,t)=>{var s;const r=i._$AA.parentNode,o=e===void 0?i._$AB:e._$AA;if(t===void 0){const a=r.insertBefore(yl(),o),n=r.insertBefore(yl(),o);t=new E1(a,n,i,i.options)}else{const a=t._$AB.nextSibling,n=t._$AM,l=n!==i;if(l){let h;(s=t._$AQ)===null||s===void 0||s.call(t,i),t._$AM=i,t._$AP!==void 0&&(h=i._$AU)!==n._$AU&&t._$AP(h)}if(a!==o||l){let h=t._$AA;for(;h!==a;){const u=h.nextSibling;r.insertBefore(h,o),h=u}}}return t},Wt=(i,e,t=i)=>(i._$AI(e,t),i),M1={},Vc=(i,e=M1)=>i._$AH=e,P1=i=>i._$AH,bo=i=>{var e;(e=i._$AP)===null||e===void 0||e.call(i,!1,!0);let t=i._$AA;const s=i._$AB.nextSibling;for(;t!==s;){const r=t.nextSibling;t.remove(),t=r}};const wl=(i,e,t)=>{const s=new Map;for(let r=e;r<=t;r++)s.set(i[r],r);return s},O1=Rr(class extends zr{constructor(i){if(super(i),i.type!==$t.CHILD)throw Error("repeat() can only be used in text expressions")}ct(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);const r=[],o=[];let a=0;for(const n of i)r[a]=s?s(n,a):a,o[a]=t(n,a),a++;return{values:o,keys:r}}render(i,e,t){return this.ct(i,e,t).values}update(i,[e,t,s]){var r;const o=P1(i),{values:a,keys:n}=this.ct(e,t,s);if(!Array.isArray(o))return this.ut=n,a;const l=(r=this.ut)!==null&&r!==void 0?r:this.ut=[],h=[];let u,f,g=0,y=o.length-1,$=0,_=a.length-1;for(;g<=y&&$<=_;)if(o[g]===null)g++;else if(o[y]===null)y--;else if(l[g]===n[$])h[$]=Wt(o[g],a[$]),g++,$++;else if(l[y]===n[_])h[_]=Wt(o[y],a[_]),y--,_--;else if(l[g]===n[_])h[_]=Wt(o[g],a[_]),Ji(i,h[_+1],o[g]),g++,_--;else if(l[y]===n[$])h[$]=Wt(o[y],a[$]),Ji(i,o[g],o[y]),y--,$++;else if(u===void 0&&(u=wl(n,$,_),f=wl(l,g,y)),u.has(l[g]))if(u.has(l[y])){const O=f.get(n[$]),z=O!==void 0?o[O]:null;if(z===null){const P=Ji(i,o[g]);Wt(P,a[$]),h[$]=P}else h[$]=Wt(z,a[$]),Ji(i,o[g],z),o[O]=null;$++}else bo(o[y]),y--;else bo(o[g]),g++;for(;$<=_;){const O=Ji(i,h[_+1]);Wt(O,a[$]),h[$++]=O}for(;g<=y;){const O=o[g++];O!==null&&bo(O)}return this.ut=n,Vc(i,h),ge}});function qs(i,e,t){return Array.from({length:(e-i)/t+1},(s,r)=>i+r*t)}let _t=class extends ms{constructor(){super(...arguments),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(t=>{if(t.target===this.sentinel){t.isIntersecting&&this.dispatchEvent(new Event("scrollThresholdReached"));return}const r=t.target.dataset.cellIndex;if(!r)return;const o=parseInt(r,10);t.isIntersecting?this.visibleCellIndices.add(o):this.visibleCellIndices.delete(o)}),this.scrollOptimizationsDisabled||this.processVisibleCells()}),this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set}reload(){qs(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.removeCell(t)),this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.setupObservations()}refreshCell(e){this.removeCell(e),this.bufferRange.includes(e)&&this.renderCellBuffer([e])}refreshAllVisibleCells(){this.bufferRange.forEach(e=>this.removeCell(e)),this.renderCellBuffer(this.bufferRange)}scrollToCell(e,t){const s=this.cellContainers[e];if(!s)return!1;const r=t?"smooth":"auto";return s.scrollIntoView({behavior:r}),!0}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}updated(e){(e.has("itemCount")||e.has("scrollOptimizationsDisabled"))&&this.setupObservations()}disconnectedCallback(){this.intersectionObserver.disconnect()}setupObservations(){this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver.disconnect(),this.sentinel&&this.intersectionObserver.observe(this.sentinel),this.scrollOptimizationsDisabled?(qs(0,Math.max(0,this.itemCount-1),1).forEach(t=>this.visibleCellIndices.add(t)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.intersectionObserver.observe(e))}render(){var e;const t=this.itemCount-1,s=qs(0,t,1),r=(e=this.ariaLandmarkLabel)!==null&&e!==void 0?e:Y;return M`
      <section id="container" role="feed" aria-label=${r}>
        <div id="sentinel" aria-hidden="true"></div>
        ${O1(s,o=>o,o=>M`
            <article
              class="cell-container"
              aria-posinset=${o+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${o}
              @click=${a=>this.cellSelected(a,o)}
              @keyup=${a=>{a.key==="Enter"&&this.cellSelected(a,o)}}
            ></article>
          `)}
        <slot name="result-last-tile"></slot>
      </section>
    `}cellSelected(e,t){const s=new CustomEvent("cellSelected",{detail:{index:t,originalEvent:e}});this.dispatchEvent(s)}get bufferRange(){const e=Math.max(10,this.visibleCellIndices.size),t=this.visibleCellIndices.size===0,s=Math.min(...this.visibleCellIndices),r=Math.max(...this.visibleCellIndices),o=t?0:Math.max(s-e,0),a=t?e:Math.min(r+e,this.itemCount-1);return qs(o,a,1)}processVisibleCells(){const e=Array.from(this.visibleCellIndices),{bufferRange:t}=this;this.renderCellBuffer(t),this.removeCellsOutsideBufferRange(t);const s=new CustomEvent("visibleCellsChanged",{detail:{visibleCellIndices:e}});this.dispatchEvent(s)}renderCellBuffer(e){e.forEach(t=>{var s;if(this.renderedCellIndices.has(t))return;const r=this.cellContainerForIndex(t);if(!r)return;const o=(s=this.cellProvider)===null||s===void 0?void 0:s.cellForIndex(t);if(r.style.height="auto",o)tt(o,r),this.renderedCellIndices.add(t),this.placeholderCellIndices.delete(t);else{if(this.placeholderCellIndices.has(t))return;tt(this.placeholderCellTemplate,r),this.placeholderCellIndices.add(t)}})}removeCellsOutsideBufferRange(e){Array.from(this.renderedCellIndices).filter(s=>!e.includes(s)).forEach(s=>{this.removeCell(s)})}removeCell(e){const t=this.cellContainerForIndex(e);if(!t)return;const s=t.offsetHeight;t.style.height=`${s}px`,tt(Y,t),this.renderedCellIndices.delete(e)}cellContainerForIndex(e){var t;return(t=this.shadowRoot)===null||t===void 0?void 0:t.querySelector(`.cell-container[data-cell-index="${e}"]`)}static get styles(){const e=b`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=b`var(--infiniteScrollerRowGap, 1.7rem)`,s=b`var(--infiniteScrollerColGap, 1.7rem)`,r=b`var(--infiniteScrollerCellMinWidth, 16rem)`,o=b`var(--infiniteScrollerCellMaxWidth, 1fr)`,a=b`var(--infiniteScrollerCellMinHeight, 22.5rem)`,n=b`var(--infiniteScrollerCellMaxHeight, none)`,l=b`var(--infiniteScrollerCellOutline, 0)`;return b`
      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${t};
        row-gap: ${t};
        grid-column-gap: ${s};
        column-gap: ${s};
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${r}, ${o})
          );
        }
      }

      .cell-container {
        outline: ${l};
        min-height: ${a};
        max-height: ${n};
        min-width: ${r};
        max-width: ${o};
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
    `}};c([T({type:Number})],_t.prototype,"itemCount",void 0);c([T({type:Object})],_t.prototype,"cellProvider",void 0);c([T({type:Object})],_t.prototype,"placeholderCellTemplate",void 0);c([T({type:Boolean})],_t.prototype,"scrollOptimizationsDisabled",void 0);c([T({type:String})],_t.prototype,"ariaLandmarkLabel",void 0);c([Be("#sentinel")],_t.prototype,"sentinel",void 0);c([T1(".cell-container")],_t.prototype,"cellContainers",void 0);_t=c([Qe("infinite-scroller")],_t);function D1(i){return i?.replace(/%22%22(?!%22%22)(.+?)%22%22/g,"%22$1%22")}function L1(i){return i?.rawMetadata?.hit_type==="favorited_search"?"search":i.mediatype?.value??"data"}const F1=Q`
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
`,B1=Q`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,R1={"login-required":x("Log in to view this item"),"content-warning":x("Content may be inappropriate")},jc={"login-required":F1,"content-warning":B1};class yr{constructor(e,t="unknown"){const s=this.getFlags(e);this.adIds=e.ad_id?.values,this.averageRating=e.avg_rating?.value,this.captureDates=e.capture_dates?.values,this.checked=!1,this.collections=e.collection?.values??[],this.collectionFilesCount=e.collection_files_count?.value??0,this.collectionSize=e.collection_size?.value??0,this.commentCount=e.num_reviews?.value??0,this.creator=e.creator?.value,this.creators=e.creator?.values??[],this.dateAdded=e.addeddate?.value,this.dateArchived=e.publicdate?.value,this.datePublished=e.date?.value,this.dateReviewed=e.reviewdate?.value,this.description=e.description?.values.join(`
`),this.factChecks=e.factcheck?.values,this.favCount=e.num_favorites?.value??0,this.hitRequestSource=t,this.hitType=e.rawMetadata?.hit_type,this.href=D1(e.review?.__href__??e.__href__?.value),this.identifier=yr.cleanIdentifier(e.identifier),this.isClip=e.is_clip?.value,this.issue=e.issue?.value,this.itemCount=e.item_count?.value??0,this.mediatype=L1(e),this.review=e.review,this.snippets=e.highlight?.values??[],this.source=e.source?.value,this.subjects=e.subject?.values??[],this.thumbnailUrl=e.__img__?.value,this.title=e.title?.value??"",this.tvClipCount=e.num_clips?.value??0,this.volume=e.volume?.value,this.viewCount=e.downloads?.value,this.weeklyViewCount=e.week?.value,this.loginRequired=s.loginRequired,this.contentWarning=s.contentWarning}clone(){const e=new yr({});return e.adIds=this.adIds,e.averageRating=this.averageRating,e.captureDates=this.captureDates,e.checked=this.checked,e.collections=this.collections,e.collectionFilesCount=this.collectionFilesCount,e.collectionSize=this.collectionSize,e.commentCount=this.commentCount,e.creator=this.creator,e.creators=this.creators,e.dateStr=this.dateStr,e.dateAdded=this.dateAdded,e.dateArchived=this.dateArchived,e.datePublished=this.datePublished,e.dateReviewed=this.dateReviewed,e.description=this.description,e.factChecks=this.factChecks,e.favCount=this.favCount,e.hitRequestSource=this.hitRequestSource,e.hitType=this.hitType,e.href=this.href,e.identifier=this.identifier,e.isClip=this.isClip,e.issue=this.issue,e.itemCount=this.itemCount,e.mediatype=this.mediatype,e.snippets=this.snippets,e.source=this.source,e.subjects=this.subjects,e.thumbnailUrl=this.thumbnailUrl,e.title=this.title,e.tvClipCount=this.tvClipCount,e.volume=this.volume,e.viewCount=this.viewCount,e.weeklyViewCount=this.weeklyViewCount,e.loginRequired=this.loginRequired,e.contentWarning=this.contentWarning,e}get isTvSearchResult(){return this.hitType==="tv_clip"&&this.hitRequestSource==="search_query"}getFlags(e){const t={loginRequired:!1,contentWarning:!1};if(e.collection?.values.length&&e.mediatype?.value!=="collection"){for(const s of e.collection?.values??[])if(s==="loggedin"&&(t.loginRequired=!0,t.contentWarning)||s==="no-preview"&&(t.contentWarning=!0,t.loginRequired))break}return t}static cleanIdentifier(e){const t=e?.indexOf("|")??-1;return t>0?e?.slice(0,t):e}}var j=(i=>(i.default="default",i.unrecognized="unrecognized",i.relevance="relevance",i.alltimeview="alltimeview",i.weeklyview="weeklyview",i.title="title",i.date="date",i.datearchived="datearchived",i.datereviewed="datereviewed",i.dateadded="dateadded",i.datefavorited="datefavorited",i.creator="creator",i))(j||{});const $l=["weeklyview","alltimeview"],Sl=["datefavorited","date","datearchived","datereviewed","dateadded"],Me={default:{field:"default",defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!1,displayName:"",urlNames:["",null,void 0]},unrecognized:{field:"unrecognized",defaultSortDirection:null,canSetDirection:!0,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!0,displayName:"",urlNames:[]},relevance:{field:"relevance",defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,displayName:"Relevance",urlNames:["_score"]},alltimeview:{field:"alltimeview",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"downloads",displayName:"All-time views",urlNames:["downloads"]},weeklyview:{field:"weeklyview",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"week",displayName:"Weekly views",urlNames:["week"]},title:{field:"title",defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"titleSorter",displayName:"Title",urlNames:["title","titleSorter"]},date:{field:"date",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"date",displayName:"Date published",urlNames:["date"]},datearchived:{field:"datearchived",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"publicdate",displayName:"Date archived",urlNames:["publicdate"]},datereviewed:{field:"datereviewed",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"reviewdate",displayName:"Date reviewed",urlNames:["reviewdate"]},dateadded:{field:"dateadded",defaultSortDirection:"desc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"addeddate",displayName:"Date added",urlNames:["addeddate"]},datefavorited:{field:"datefavorited",defaultSortDirection:"desc",canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,searchServiceKey:"favoritedate",displayName:"Date favorited",urlNames:["favoritedate"]},creator:{field:"creator",defaultSortDirection:"asc",canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:"creatorSorter",displayName:"Creator",urlNames:["creator","creatorSorter"]}};function Wc(i){return Object.values(Me).find(e=>e.urlNames.some(t=>i===t))??Me.unrecognized}const Ir={relevance:!0,weeklyview:!0,alltimeview:!0,title:!0,datefavorited:!1,date:!0,datearchived:!0,datereviewed:!0,dateadded:!0,creator:!0,default:!1,unrecognized:!1},z1={...Ir,datefavorited:!0},I1={...Ir,date:!1,datereviewed:!1,dateadded:!1},N1={uploads:"datearchived",reviews:"datereviewed",collections:"datearchived",web_archives:"datearchived"},U1={title:"firstTitle",creator:"firstCreator"},xt=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{},clip_type:{},program:{},person:{},sponsor:{}}),H1={only_commercials:"commercial",only_factchecks:"fact check",only_quotes:"quote"},qc=["mediatype","year","subject","collection","creator","language"],V1=["program","creator","year","subject","person","language","clip_type"],wr={subject:"Subject",lending:"Availability",mediatype:"Media Type",language:"Language",creator:"Creator",collection:"Collection",year:"Year",clip_type:"Clip Type",program:"Program",person:"Person",sponsor:"Sponsor"},gs={subject:G.COUNT,lending:G.COUNT,mediatype:G.COUNT,language:G.COUNT,creator:G.COUNT,collection:G.COUNT,year:G.NUMERIC,clip_type:G.COUNT,program:G.COUNT,person:G.COUNT,sponsor:G.COUNT},j1={subject:G.ALPHABETICAL,lending:G.ALPHABETICAL,mediatype:G.ALPHABETICAL,language:G.ALPHABETICAL,creator:G.ALPHABETICAL,collection:G.ALPHABETICAL,year:G.NUMERIC,clip_type:G.ALPHABETICAL,program:G.ALPHABETICAL,person:G.ALPHABETICAL,sponsor:G.ALPHABETICAL},W1={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},xl={is_lendable:"Lending Library",available_to_borrow:"Borrow 14 Days",is_readable:"Always Available"},Nr={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0};const Gc=i=>encodeURIComponent(i).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),Yc=i=>encodeURIComponent(i).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),Qa=decodeURIComponent,Ka=i=>(i[0]==='"'&&(i=i.slice(1,-1)),i.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function q1(i){return i=Object.assign({},i),typeof i.expires=="number"&&(i.expires=new Date(Date.now()+i.expires*864e5)),i.expires!=null&&(i.expires=i.expires.toUTCString()),Object.entries(i).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(";")[0]}`).join("")}function Qc(i,e,t){const s=/(?:^|; )([^=]*)=([^;]*)/g,r={};let o;for(;(o=s.exec(document.cookie))!=null;)try{const a=t(o[1]);if(r[a]=e(o[2],a),i===a)break}catch{}return i!=null?r[i]:r}const Cl=Object.freeze({decodeName:Qa,decodeValue:Ka,encodeName:Gc,encodeValue:Yc}),Xa=Object.freeze({path:"/"});function $r(i,e,t=Xa,{encodeValue:s=Yc,encodeName:r=Gc}={}){return document.cookie=`${r(i)}=${s(e,i)}${q1(t)}`}function la(i,{decodeValue:e=Ka,decodeName:t=Qa}={}){return Qc(i,e,t)}function G1({decodeValue:i=Ka,decodeName:e=Qa}={}){return Qc(void 0,i,e)}function Y1(i,e=Xa){$r(i,"",Object.assign({},e,{expires:-1}))}function ca(i,e){const t={set:function(r,o,a){return $r(r,o,Object.assign({},this.attributes,a),{encodeValue:this.converter.write})},get:function(r){if(arguments.length===0)return G1(this.converter.read);if(r!=null)return la(r,this.converter.read)},remove:function(r,o){Y1(r,Object.assign({},this.attributes,o))},withAttributes:function(r){return ca(this.converter,Object.assign({},this.attributes,r))},withConverter:function(r){return ca(Object.assign({},this.converter,r),this.attributes)}},s={attributes:{value:Object.freeze(e)},converter:{value:Object.freeze(i)}};return Object.create(t,s)}ca({read:Cl.decodeValue,write:Cl.encodeValue},Xa);function Q1(i,e){return i===e?!0:i.length!==e.length?!1:i.every((t,s)=>t===e[s])}class K1{constructor(e){this.cookieDomain=".archive.org",this.cookieExpiration=30,this.cookiePath="/",this.context=e.context}persistState(e,t={}){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e,t)}getRestorationState(){const e=this.loadQueryStateFromUrl(),t=this.loadTileViewStateFromCookies();return e.displayMode=t,e}persistViewStateToCookies(e){const t=e==="grid"?"tiles":"lists";$r(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});const s=e==="list-detail"?"showdetails":"";$r(`showdetails-${this.context}`,s,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){const e=la(`view-${this.context}`),t=la(`showdetails-${this.context}`);return e==="tiles"||e===void 0?"grid":t==="showdetails"?"list-detail":"list-compact"}persistQueryStateToUrl(e,t={}){const s=new URL(window.location.href),r=new URLSearchParams(s.searchParams),o=this.removeRecognizedParams(s.searchParams);let a=!1;switch(e.baseQuery&&o.set("query",e.baseQuery),e.searchType){case I.FULLTEXT:o.set("sin","TXT");break;case I.RADIO:o.set("sin","RADIO");break;case I.TV:o.set("sin","TV");break;case I.METADATA:(t.persistMetadataSearchType||r.get("sin")==="MD")&&o.set("sin","MD");break}if(r.get("sin")===""&&(r.delete("sin"),a=!0),e.currentPage&&(e.currentPage>1?o.set("page",e.currentPage.toString()):o.delete("page")),e.selectedSort){const u=Me[e.selectedSort];let f=this.sortDirectionPrefix(e.sortDirection);const g=e.searchType===I.TV&&e.selectedSort===j.relevance;if(u.field===j.unrecognized){const y=r.get("sort")??"",{field:$,direction:_}=this.getSortFieldAndDirection(y);e.sortDirection||(f=this.sortDirectionPrefix(_)),$?o.set("sort",`${f}${$}`):o.set("sort",y)}else if(u.shownInURL||g){const y=u.urlNames[0];o.set("sort",`${f}${y}`)}}if(e.selectedFacets)for(const[u,f]of Object.entries(e.selectedFacets)){const g=Object.entries(f);if(g.length!==0)for(const[y,$]of g){const _=$.state==="hidden",O=`${u}:"${y}"`;_?o.append("not[]",O):o.append("and[]",O)}}const n=e.minSelectedDate?.includes("-")||e.maxSelectedDate?.includes("-")?"date":"year";e.minSelectedDate&&e.maxSelectedDate&&o.append("and[]",`${n}:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&o.append("and[]",e.titleQuery),e.creatorQuery&&o.append("and[]",e.creatorQuery);let l=t.forceReplace?"replaceState":"pushState";const h=this.paramsMatch(r,o,["sin","sort","and[]","not[]","only_commercials","only_factchecks","only_quotes"]);if(h&&this.paramsMatch(r,o,["query"])){if(a)o.delete("sin");else if(this.paramsMatch(r,o,["page"]))return;l="replaceState"}else h&&this.hasLegacyParam(r)&&(l="replaceState");window.history[l]?.({query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:{field:e.selectedSort,direction:e.sortDirection},minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},"",s)}loadQueryStateFromUrl(){const e=new URL(window.location.href),t=e.searchParams.get("sin"),s=e.searchParams.get("page"),r=e.searchParams.get("query"),o=e.searchParams.get("sort"),a=e.searchParams.getAll("and[]"),n=e.searchParams.getAll("not[]");for(const[u,f]of e.searchParams.entries())/and\[\d+\]/.test(u)?a.push(f):/not\[\d+\]/.test(u)&&n.push(f);const l=e.searchParams.get("q")??e.searchParams.get("search"),h={selectedFacets:xt()};switch(r?h.baseQuery=r:l&&(h.baseQuery=l),t){case"TXT":h.searchType=I.FULLTEXT;break;case"RADIO":h.searchType=I.RADIO;break;case"TV":h.searchType=I.TV;break;case"MD":h.searchType=I.METADATA;break;default:h.searchType=I.DEFAULT;break}if(s){const u=parseInt(s,10);h.currentPage=u}else h.currentPage=1;if(o){const{field:u,direction:f}=this.getSortFieldAndDirection(o),g=Wc(u);h.selectedSort=g.field,["asc","desc"].includes(f)&&(h.sortDirection=f)}a&&a.forEach(u=>{let[f,g]=u.split(":");if(f=f.replace(/Sorter$/,""),f.startsWith("-")){n.push(u.slice(1));return}switch(f){case"date":case"year":{const[y,$]=g.split(" TO ");y&&$?(h.minSelectedDate=y.substring(1,y.length),h.maxSelectedDate=$.substring(0,$.length-1)):this.setSelectedFacetState(h.selectedFacets,f,g,"selected");break}case"firstTitle":h.selectedTitleFilter=g;break;case"firstCreator":h.selectedCreatorFilter=g;break;default:this.setSelectedFacetState(h.selectedFacets,f,g,"selected")}}),n&&n.forEach(u=>{const[f,g]=u.split(":");this.setSelectedFacetState(h.selectedFacets,f,g,"hidden")});for(const[u,f]of Object.entries(H1))if(e.searchParams.get(u)){this.setSelectedFacetState(h.selectedFacets,"clip_type",f,"selected");break}return h}getSortFieldAndDirection(e){const t=e.indexOf(" ")>-1;let s,r;return t?[s,r]=e.split(" "):(s=e.startsWith("-")?e.slice(1):e,r=e.startsWith("-")?"desc":"asc"),{field:s,direction:r}}sortDirectionPrefix(e){return e==="desc"?"-":""}stripQuotes(e){return e.startsWith('"')&&e.endsWith('"')?e.substring(1,e.length-1):e}paramsMatch(e,t,s){return s.every(r=>Q1(e.getAll(r).sort(),t.getAll(r).sort()))}removeRecognizedParams(e){e.delete("query"),e.delete("sin"),e.delete("page"),e.delete("sort"),e.delete("and[]"),e.delete("not[]");for(const t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete("q"),e.delete("search"),e.delete("only_commercials"),e.delete("only_factchecks"),e.delete("only_quotes"),e}hasLegacyParam(e){return e.has("q")||e.has("search")}setSelectedFacetState(e,t,s,r){const o=e[t];if(!o)return;const a=this.stripQuotes(s);o[a]??=this.getDefaultBucket(s),o[a].state=r}getDefaultBucket(e){return{key:e,count:0,state:"none"}}}const da=["forum_posts","lending","web_archives"],X1=new TextEncoder;async function Kc(i){const e=await crypto.subtle.digest("SHA-1",X1.encode(i));return[...new Uint8Array(e)].map(t=>t.toString(16).padStart(2,"0")).join("")}const Je=window.location&&(window.location.hostname==="localhost"||window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||window.location.host.match(/\.code\.archive\.org$/)||window.location.host.match(/\.dev\.archive\.org$/)||window.location.host.match(/^ia-petabox-/)||window.location.host.match(/^local\.archive\.org/)||window.location.host.match(/^internetarchive\.github\.io$/))?console.log.bind(console):()=>{};function ha(i,e){if(i)for(const[t,s]of Object.entries(i))for(const[r,o]of Object.entries(s))e(t,r,o,i)}function ei(i,e,t,s=!1){const r=i??xt(),o={...r,[e]:{...r[e],[t.key]:t}};return s&&t.state==="none"&&delete o[e]?.[t.key],o}function Z1(i){const e=xt();return ha(i,(t,s,r)=>{e[t]||(e[t]={}),e[t][s]=r}),e}function Xc(i,e){const t=Z1(i);return ha(e,(s,r,o)=>{t[s]||(t[s]={}),t[s][r]=o}),ha(t,(s,r,o)=>{o.state==="none"&&delete t[s]?.[r]}),t}const _l=["selected","hidden","none"];function Zc(i,e=G.COUNT){return i.sort((t,s)=>{const r=_l.indexOf(t.state),o=_l.indexOf(s.state),a=r-o;let n;return e===G.ALPHABETICAL?n=t.key.localeCompare(s.key):e===G.NUMERIC?n=Number(s.key)-Number(t.key):n=s.count-t.count,a||n})}class J1{constructor(e,t=50){this.host=e,this.pageSize=t,this.pages={},this.offset=0,this.numTileModels=0,this.numInitialPages=2,this.fetchesInProgress=new Set,this.previousQueryKey="",this.searchResultsLoading=!1,this.facetsLoading=!1,this.facetsReadyToLoad=!1,this.suppressFetches=!1,this.totalResults=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.collectionTitles=new Map,this.tvChannelMaps={},this.tvChannelAliases=new Map,this.parentCollections=[],this.prefixFilterCountMap={},this._initialSearchCompletePromise=Promise.resolve(!0),this.checkAllTiles=()=>{this.map(s=>{const r=s.clone();return r.checked=!0,r})},this.uncheckAllTiles=()=>{this.map(s=>{const r=s.clone();return r.checked=!1,r})},this.removeCheckedTiles=()=>{const{checkedTileModels:s,uncheckedTileModels:r}=this,o=s.length;if(o===0)return;this.offset+=o;const a={};let n=Math.floor(this.offset/this.pageSize)+1,l=this.offset%this.pageSize;for(let h=1;h<=n;h+=1){const u=this.offset-this.pageSize*(h-1),f=Math.min(this.pageSize,u);a[h]=Array(f).fill(void 0)}for(const h of r)a[n]||(a[n]=[]),a[n].push(h),l+=1,l>=this.pageSize&&(n+=1,l=0);this.pages=a,this.numTileModels-=o,this.totalResults-=o,this.host.setTileCount(this.size),this.host.setTotalResultCount(this.totalResults),this.requestHostUpdate(),this.refreshVisibleResults()}}get initialSearchComplete(){return this._initialSearchCompletePromise}hostConnected(){this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading)}hostUpdate(){if(!this.activeOnHost||(this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading),!this.host.searchService)||!(this.pageFetchQueryKey!==this.previousQueryKey))return;const t=!this.host.baseQuery;(this.canPerformSearch||t)&&(this.activeOnHost&&this.host.emitQueryStateChanged(),this.handleQueryChange())}get activeOnHost(){return this.host.dataSource===this}get size(){return this.numTileModels}reset(){Je("Resetting CB data source"),this.pages={},this.aggregations={},this.histogramAggregation=void 0,this.pageElements=void 0,this.parentCollections=[],this.previousQueryKey="",this.queryErrorMessage=void 0,this.offset=0,this.numTileModels=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.facetsLoading=!1,this.fetchesInProgress.clear(),this.setTotalResultCount(0),this.requestHostUpdate()}resetPages(){Object.keys(this.pages).length<this.host.maxPagesToManage&&(this.pages={},this.fetchesInProgress.forEach(e=>{e.startsWith("facets-")||this.fetchesInProgress.delete(e)}),this.requestHostUpdate())}addPage(e,t){this.pages[e]=t,this.numTileModels+=t.length,this.requestHostUpdate()}addMultiplePages(e,t){const s=Math.ceil(t.length/this.pageSize);for(let a=0;a<s;a+=1){const n=this.pageSize*a;this.addPage(e+a,t.slice(n,n+this.pageSize))}this.host.currentVisiblePageNumbers.some(a=>a>=e&&a<=e+s)&&this.refreshVisibleResults()}getPage(e){return this.pages[e]}getAllPages(){return this.pages}hasPage(e){return!!this.pages[e]}getTileModelAt(e){const t=e+this.offset,s=Math.floor(t/this.pageSize)+1,r=t%this.pageSize;let o=1,a=0;for(;a<=t;){if(!this.pages[o])return this.pages[s]?.[r];if(a+this.pages[o].length>t)return this.pages[o][t-a];a+=this.pages[o].length,o+=1}return this.pages[s]?.[r]}indexOf(e){return Object.values(this.pages).flat().indexOf(e)-this.offset}getPageSize(){return this.pageSize}setPageSize(e){this.reset(),this.pageSize=e}setNumInitialPages(e){this.numInitialPages=e}setTotalResultCount(e){this.totalResults=e,this.activeOnHost&&this.host.setTotalResultCount(e)}setFetchesSuppressed(e){this.suppressFetches=e}setEndOfDataReached(e){this.endOfDataReached=e}async handleQueryChange(){if(this.suppressFetches)return;this.reset();let e;this._initialSearchCompletePromise=new Promise(t=>{e=t}),this.queryInitialized=!0,await Promise.all([this.doInitialPageFetch(),this.canFetchFacets?this.fetchFacets():null]),e(!0)}async handleFacetReadinessChange(e){const t=!this.facetsReadyToLoad&&e;this.facetsReadyToLoad=e,t&&this.canFetchFacets&&this.fetchFacets()}get canFetchFacets(){if(this.host.facetLoadStrategy==="off"||da.includes(this.host.profileElement)||this.host.facetLoadStrategy!=="eager"&&!this.facetsReadyToLoad)return!1;const e=Object.keys(this.aggregations??{}).length>0;return!(this.facetsLoading||e)}map(e){Object.keys(this.pages).length&&(this.pages=Object.fromEntries(Object.entries(this.pages).map(([t,s])=>[t,s.map((r,o,a)=>r&&e(r,o,a))])),this.requestHostUpdate(),this.refreshVisibleResults())}get checkedTileModels(){return this.getFilteredTileModels(e=>e.checked)}get uncheckedTileModels(){return this.getFilteredTileModels(e=>!e.checked)}getFilteredTileModels(e){return Object.values(this.pages).flat().filter((t,s,r)=>t?e(t,s,r):!1)}get canPerformSearch(){if(!this.host.searchService)return!1;const t=!!this.host.baseQuery?.trim(),s=!!this.host.identifiers?.length,r=!!this.host.withinCollection,o=!!this.host.withinProfile,a=!!this.host.profileElement,n=this.host.searchType===I.DEFAULT,l=this.host.searchType===I.METADATA,h=this.host.searchType===I.TV;return t||s||r&&(n||l||h)||o&&(a&&(n||l))}setSearchResultsLoading(e){this.searchResultsLoading=e,this.activeOnHost&&this.host.setSearchResultsLoading(e)}setFacetsLoading(e){this.facetsLoading=e,this.activeOnHost&&this.host.setFacetsLoading(e)}requestHostUpdate(){this.activeOnHost&&this.host.requestUpdate()}refreshVisibleResults(){this.activeOnHost&&this.host.refreshVisibleResults()}get pageFetchQueryKey(){const e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e,s=this.host.selectedSort??"none",r=this.host.sortDirection??"none";return`fq:${this.fullQuery}-pt:${t}-st:${this.host.searchType}-sf:${s}-sd:${r}`}get facetFetchQueryKey(){const e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e;return`facets-fq:${this.fullQuery}-pt:${t}-st:${this.host.searchType}`}get filterMap(){const e=new ph,{minSelectedDate:t,maxSelectedDate:s,selectedFacets:r,internalFilters:o,selectedTitleFilter:a,selectedCreatorFilter:n}=this.host,l=this.host.searchType===I.TV?"date":"year";t&&e.addFilter(l,t,Pt.GREATER_OR_EQUAL),s&&e.addFilter(l,s,Pt.LESS_OR_EQUAL);const h=Xc(o,r);if(h)for(const[f,g]of Object.entries(h)){const{name:y,values:$}=this.prepareFacetForFetch(f,g);for(const[_,O]of Object.entries($)){let z;O.state==="selected"?z=Pt.INCLUDE:O.state==="hidden"&&(z=Pt.EXCLUDE),z&&e.addFilter(y,_,z)}}return a&&e.addFilter("firstTitle",a,Pt.INCLUDE),n&&e.addFilter("firstCreator",n,Pt.INCLUDE),e.build()}async requestUID(e,t){const s=JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.host.searchType}),r=(await Kc(s)).slice(0,20),o=(await this.host.getSessionId()).slice(0,20),a=e.page??0,n=t.charAt(0),l=Date.now();return`R:${r}-S:${o}-P:${a}-K:${n}-T:${l}`}get pageSpecifierParams(){return this.host.identifiers?.length?{pageType:"client_document_fetch"}:this.host.withinCollection?{pageType:"collection_details",pageTarget:this.host.withinCollection}:this.host.withinProfile?{pageType:"account_details",pageTarget:this.host.withinProfile,pageElements:this.host.profileElement?[this.host.profileElement]:[]}:null}get fullQuery(){const e=[],t=this.host.baseQuery?.trim();t&&e.push(t),this.host.identifiers&&e.push(`identifier:(${this.host.identifiers.join(" OR ")})`);const{facetQuery:s,dateRangeQueryClause:r,sortFilterQueries:o}=this;return s&&e.push(s),r&&e.push(r),o&&e.push(o),e.join(" AND ").trim()}get facetQuery(){if(!this.host.selectedFacets)return;const e=[];for(const[t,s]of Object.entries(this.host.selectedFacets))e.push(this.buildFacetClause(t,s));return this.joinFacetClauses(e)?.trim()}get dateRangeQueryClause(){if(!(!this.host.minSelectedDate||!this.host.maxSelectedDate))return`year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(t=>t).join(" AND ")}get titleQuery(){return this.host.selectedTitleFilter?`firstTitle:${this.host.selectedTitleFilter}`:void 0}get creatorQuery(){return this.host.selectedCreatorFilter?`firstCreator:${this.host.selectedCreatorFilter}`:void 0}buildFacetClause(e,t){const{name:s,values:r}=this.prepareFacetForFetch(e,t),o=Object.entries(r);if(o.length===0)return"";const a=[];for(const[l,h]of o){const u=h.state==="hidden"?"-":"";a.push(`${u}"${l}"`)}const n=a.join(" OR ");return`${s}:(${n})`}prepareFacetForFetch(e,t){let[s,r]=[e,t];return e==="lending"&&(s="lending___status"),{name:s,values:r}}joinFacetClauses(e){const t=e.filter(s=>s.length>0);return t.length>0?`(${t.join(" AND ")})`:void 0}async fetchFacets(){const e=this.host.baseQuery?.trim();if(!this.canPerformSearch)return;const{facetFetchQueryKey:t}=this;if(this.fetchesInProgress.has(t))return;this.fetchesInProgress.add(t),this.setFacetsLoading(!0);const s=this.host.sortParam?[this.host.sortParam]:[],r={...this.pageSpecifierParams,query:e||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregationsSize:10};r.uid=await this.requestUID({...r,sort:s},"aggregations");const o=await this.host.searchService?.search(r,this.host.searchType),a=o?.success,n=!this.fetchesInProgress.has(t);if(this.fetchesInProgress.delete(t),n)return;if(!a){const f=o?.error?.message,g=o?.error?.details?.message;!f&&!g&&window?.Sentry?.captureMessage?.("Missing or malformed facet response from backend","error"),this.setFacetsLoading(!1);return}const{aggregations:l,collectionTitles:h,tvChannelAliases:u}=a.response;if(this.aggregations=l,this.histogramAggregation=this.host.searchType===I.TV?l?.date_histogram:l?.year_histogram,h)for(const[f,g]of Object.entries(h))this.collectionTitles.set(f,g);if(u)for(const[f,g]of Object.entries(u))this.tvChannelAliases.set(f,g);this.setFacetsLoading(!1),this.requestHostUpdate()}async doInitialPageFetch(){this.setSearchResultsLoading(!0),await this.fetchPage(this.host.initialPageNumber,this.numInitialPages)}async fetchPage(e,t=1){const s=this.host.baseQuery?.trim();if(!this.canPerformSearch){this.setSearchResultsLoading(!1);return}if(this.hasPage(e)||this.endOfDataReached)return;let r=e===1?t:1;const o=this.pageSize*r,{pageFetchQueryKey:a}=this,n=`${a}-p:${e}`;if(this.fetchesInProgress.has(n))return;for(let P=0;P<r;P+=1)this.fetchesInProgress.add(`${a}-p:${e+P}`);this.previousQueryKey=a;const{withinCollection:l,withinProfile:h}=this.host;let u=this.host.sortParam?[this.host.sortParam]:[];if(h&&this.host.selectedSort===j.default&&this.host.defaultSortField){const P=Me[this.host.defaultSortField];P.searchServiceKey&&(u=[{field:P.searchServiceKey,direction:"desc"}])}const g={...this.pageSpecifierParams,query:s||"",identifiers:this.host.identifiers,page:e,rows:o,sort:u,filters:this.filterMap,aggregations:{omit:!0}};g.uid=await this.requestUID(g,"hits");const y=await this.host.searchService?.search(g,this.host.searchType),$=y?.success;if(!this.fetchesInProgress.has(n))return;for(let P=0;P<r;P+=1)this.fetchesInProgress.delete(`${a}-p:${e+P}`);if(!$){const P=y?.error?.message,L=y?.error?.details?.message;this.queryErrorMessage=`${P??""}${L?`; ${L}`:""}`,this.queryErrorMessage||(this.queryErrorMessage="Missing or malformed response from backend",window?.Sentry?.captureMessage?.(this.queryErrorMessage,"error")),this.setSearchResultsLoading(!1),this.requestHostUpdate(),this.host.emitSearchError();return}this.setTotalResultCount($.response.totalResults-this.offset),this.activeOnHost&&this.totalResults===0&&this.host.emitEmptyResults(),this.sessionContext=$.sessionContext,l?(this.collectionExtraInfo=$.response.collectionExtraInfo,this.activeOnHost&&this.host.applyDefaultCollectionSort(this.collectionExtraInfo),this.collectionExtraInfo&&(this.parentCollections=[].concat(this.collectionExtraInfo.public_metadata?.collection??[]),this.host.isTVCollection=this.host.withinCollection?.startsWith("TV-")||this.host.withinCollection==="tvnews"||this.host.withinCollection==="tvarchive"||this.parentCollections.includes("tvnews")||this.parentCollections.includes("tvarchive"))):h&&(this.accountExtraInfo=$.response.accountExtraInfo,this.pageElements=$.response.pageElements);const{results:_,collectionTitles:O,tvChannelAliases:z}=$.response;if(_&&_.length>0){if(O){for(const[N,se]of Object.entries(O))this.collectionTitles.set(N,se);const L=this.collectionExtraInfo?.public_metadata?.title;l&&L&&this.collectionTitles.set(l,L)}if(z)for(const[L,N]of Object.entries(z))this.tvChannelAliases.set(L,N);const P=["lending","web_archives"].includes(this.host.profileElement);P&&(r=Math.ceil(_.length/this.pageSize),this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.totalResults));for(let L=0;L<r;L+=1){const N=this.pageSize*L;this.addFetchedResultsToDataSource(e+L,_.slice(N,N+this.pageSize),!P||L===r-1)}}(this.size>=this.totalResults||_.length===0)&&(this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.size)),this.setSearchResultsLoading(!1),this.requestHostUpdate()}get hitRequestSource(){const{host:e}=this;return e.baseQuery?"search_query":e.withinProfile?"profile_tab":e.withinCollection?"collection_members":"unknown"}addFetchedResultsToDataSource(e,t,s=!0){const r=[],o=this.hitRequestSource;t?.forEach(a=>{a.identifier&&r.push(new yr(a,o))}),this.addPage(e,r),s&&this.refreshVisibleResults()}async fetchPrefixFilterBuckets(e){const t=this.host.baseQuery?.trim();if(!this.canPerformSearch)return[];const s=U1[e],r=this.host.sortParam?[this.host.sortParam]:[],o={...this.pageSpecifierParams,query:t||"",identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregations:{simpleParams:[s]},aggregationsSize:26};return o.uid=await this.requestUID({...o,sort:r},"aggregations"),(await this.host.searchService?.search(o,this.host.searchType))?.success?.response?.aggregations?.[s]?.buckets??[]}async updatePrefixFilterCounts(e){const{facetFetchQueryKey:t}=this,s=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap={...this.prefixFilterCountMap},this.prefixFilterCountMap[e]=s.reduce((o,a)=>(o[a.key.toUpperCase()]=a.doc_count,o),{}),this.requestHostUpdate())}async updatePrefixFiltersForCurrentSort(){if(["title","creator"].includes(this.host.selectedSort)){const e=this.host.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort(),this.requestHostUpdate()}populateTVChannelMaps(){return this._tvMapsPromise||(this._tvMapsPromise=this._fetchTVChannelMaps()),this._tvMapsPromise}async _fetchTVChannelMaps(){const e="https://av.archive.org/etc",t=new Date().toISOString().slice(0,10),s=fetch(`${e}/chan2network.json?date=${t}`),r=fetch(`${e}/program2chans.json?date=${t}`),[o,a]=await Promise.all([s,r]);return this.tvChannelMaps.channelToNetwork=new Map(Object.entries(await o.json())),this.tvChannelMaps.programToChannels=new Map(Object.entries(await a.json())),this.requestHostUpdate(),this.tvChannelMaps}}var Ct=(i=>(i.default="collection-browser",i))(Ct||{}),ne=(i=>(i.sortBy="sortBy",i.filterByCreator="filterByCreator",i.filterByTitle="filterByTitle",i.displayMode="displayMode",i.loadDesktopView="loadDesktopView",i.loadMobileView="loadMobileView",i.facetSelected="facetSelected",i.facetDeselected="facetDeselected",i.facetNegativeSelected="facetNegativeSelected",i.facetNegativeDeselected="facetNegativeDeselected",i.mobileFacetsToggled="mobileFacetsToggled",i.partOfCollectionClicked="partOfCollectionClicked",i.histogramChanged="histogramChanged",i.histogramChangedFromModal="histogramChangedFromModal",i.histogramExpanded="histogramExpanded",i.resultSelected="resultSelected",i.moreFacetsPageChange="moreFacetsPageChange",i.showMoreFacetsModal="showMoreFacetsModal",i.closeMoreFacetsModal="closeMoreFacetsModal",i.applyMoreFacetsModal="applyMoreFacetsModal",i))(ne||{});const pa=Q`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`,ct=S`
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
`;const Ie=i=>i??oe;const{I:ep}=Oh,Tl=i=>i,Jc=i=>i.strings===void 0,kl=()=>document.createComment(""),es=(i,e,t)=>{const s=i._$AA.parentNode,r=e===void 0?i._$AB:e._$AA;if(t===void 0){const o=s.insertBefore(kl(),r),a=s.insertBefore(kl(),r);t=new ep(o,a,i,i.options)}else{const o=t._$AB.nextSibling,a=t._$AM,n=a!==i;if(n){let l;t._$AQ?.(i),t._$AM=i,t._$AP!==void 0&&(l=i._$AU)!==a._$AU&&t._$AP(l)}if(o!==r||n){let l=t._$AA;for(;l!==o;){const h=Tl(l).nextSibling;Tl(s).insertBefore(l,r),l=h}}}return t},qt=(i,e,t=i)=>(i._$AI(e,t),i),tp={},ed=(i,e=tp)=>i._$AH=e,ip=i=>i._$AH,yo=i=>{i._$AR(),i._$AA.remove()};const sp=Ds(class extends Ls{constructor(i){if(super(i),i.type!==ut.PROPERTY&&i.type!==ut.ATTRIBUTE&&i.type!==ut.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Jc(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===We||e===oe)return e;const t=i.element,s=i.name;if(i.type===ut.PROPERTY){if(e===t[s])return We}else if(i.type===ut.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return We}else if(i.type===ut.ATTRIBUTE&&t.getAttribute(s)===e+"")return We;return ed(i),e}});function tr(i,e,t){return i?e(i):t?.(i)}function rp(i,e){return e.some(t=>i.has(t))}function op(i,e){const t=[...i],s=[...e],r=t.length,o=s.length;if(r===0)return!0;let a=0,n=0;for(;n<o;){if(s[n]===t[a]&&(a+=1),a>=r)return!0;n+=1}return!1}const td=S`
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
    --combo-box-width: var(
      --ia-theme-combo-box-width,
      var(--default-combo-box-width)
    );

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
`,ap="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e",np="data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e",lp="data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e",cp={all:()=>!0,prefix:(i,e)=>e.startsWith(i),suffix:(i,e)=>e.endsWith(i),substring:(i,e)=>e.includes(i),subsequence:op},dp="list",hp="substring",pp=i=>i,up=i=>i.toLocaleLowerCase();let te=class extends H{constructor(){super(),this.options=[],this.behavior=dp,this.maxAutocompleteEntries=Number.POSITIVE_INFINITY,this.filter=hp,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText="",this.filterText="",this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){const e=qe({disabled:this.disabled,focused:this.hasFocus});return p`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:v}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has("options")||e.has("caseSensitive"))&&this.rebuildOptionFilteringValues(),e.has("options")&&this.rebuildOptionIDMap(),(e.has("options")||e.has("sort"))&&this.rebuildSortedOptions(),rp(e,["options","behavior","maxAutocompleteEntries","filter","filterText","caseSensitive","sort"])&&this.rebuildFilteredOptions(),e.has("open")&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has("required")&&this.updateFormValidity()}updated(e){e.has("value")&&this.handleValueChanged(),e.has("options")&&this.behavior!=="freeform"&&!this.selectedOption&&this.clearSelectedOption(),e.has("open")&&(this.open?(this.positionOptionsMenu(),this.optionsList.showPopover?.(),this.optionsList.classList.add("visible")):(this.optionsList.hidePopover?.(),this.optionsList.classList.remove("visible")))}get labelTemplate(){return p`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){const e=qe({"clear-padding":this.clearable&&!this.shouldShowClearButton});return p`
      <input
        type="text"
        id="text-input"
        class=${e}
        .value=${sp(this.enteredText)}
        placeholder=${Ie(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${Ie(this.highlightedOption?.id)}
        ?readonly=${this.behavior==="select-only"}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return p`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${x("Clear")}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${lp}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return p`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ap}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${np}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return p`
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
        <span class="sr-only">${x("Toggle options")}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return p`
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
        ${tr(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{const t=e===this.highlightedOption,s=qe({option:!0,highlight:t});return p`
        <li
          id=${e.id}
          class=${s}
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
      `})}get emptyOptionsTemplate(){return p`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${x("No matching options")}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){const t=e.currentTarget,s=this.getOptionFor(t.id);s&&this.setHighlightedOption(s)}handleOptionClick(e){const t=e.currentTarget,s=this.getOptionFor(t.id);s&&(this.setSelectedOption(s.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case"Enter":this.handleEnterPressed();break;case"Escape":this.handleEscapePressed();break;case"ArrowUp":e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case"ArrowDown":e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case"Tab":this.handleTabPressed();return;case" ":this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){this.enteredText=this.textInput.value,this.setFilterText(this.textInput.value),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior==="freeform"&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior==="select-only"&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!=="select-only"&&this.textInput.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior==="list"?this.setTextValue(this.selectedOption?.text??"",!1):this.behavior==="freeform"&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue("",!1);return}const e=this.getOptionFor(this.value);if(this.behavior==="freeform"){const t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(""))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}const{highlightedIndex:s}=this,r=this.wrapArrowKeys&&s===0?t:Math.max(s-1,0);this.setHighlightedOption(e[r])}highlightNextOption(){const{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}const{highlightedIndex:s}=this,r=this.wrapArrowKeys&&s===t?0:Math.min(s+1,t);this.setHighlightedOption(e[r])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;const{optionsList:t,highlightedElement:s}=this;if(!s)return;const r=s.getBoundingClientRect(),o=t.getBoundingClientRect();(r.top<o.top||r.bottom>o.bottom)&&s.scrollIntoView({block:"nearest"})}setSelectedOption(e){const t=this.getOptionFor(e);if(!t)throw new RangeError("Unknown option ID");const s=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(""),this.value!==s&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){const e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(""),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior==="freeform"){const t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput.value=e,this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){const{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},x("A value is required")):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent("change",{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent("toggle",{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){const{mainWidgetRow:e,optionsList:t}=this,s=e.getBoundingClientRect(),{innerHeight:r,scrollX:o,scrollY:a}=window,n=s.top,l=r-s.bottom,h="var(--combo-box-list-max-height--)",u={top:`${s.bottom+a}px`,left:`${s.left+o}px`,width:`var(--combo-box-list-width--, ${s.width}px)`,maxHeight:`min(${h}, ${l}px)`};Object.assign(t.style,u),setTimeout(()=>{const g=t.getBoundingClientRect().bottom>=r,y=n>l;g&&y&&(t.style.top="auto",t.style.bottom=`${r-s.top-a}px`,t.style.maxHeight=`min(${h}, ${n}px)`)},0)}get caseTransform(){return this.caseSensitive?pp:up}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(const e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{const s=this.optionFilteringValues.get(e),r=this.optionFilteringValues.get(t);return s.localeCompare(r)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();const{caseTransform:e}=this;for(const t of this.options){const s=e(t.text);this.optionFilteringValues.set(t,s)}}rebuildFilteredOptions(){const e=this.behavior==="select-only"?"all":this.filter,t=typeof e=="string"?cp[e]:e,s=this.optionsRespectingSortFlag.filter(r=>{const o=this.optionFilteringValues.get(r);return o?t(this.filterText,o,r):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=s}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){const e=S`
      :host {
        --combo-box-width--: var(--combo-box-width);
        --combo-box-padding--: var(--padding-sm);
        --combo-box-list-width--: var(--combo-box-list-width, unset);
        --combo-box-list-max-height--: var(--combo-box-list-max-height, 250px);
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
        font-family: inherit;
        font-weight: inherit;
        font-style: inherit;
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
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        font-style: inherit;
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
        width: 0.875em;
        height: 0.875em;
      }

      .clear-icon {
        width: 1em;
        height: 1em;
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
    `;return[td,e]}};te.formAssociated=!0;te.shadowRootOptions={...H.shadowRootOptions,delegatesFocus:!0};c([d({type:Array})],te.prototype,"options",void 0);c([d({type:String})],te.prototype,"placeholder",void 0);c([d({type:String})],te.prototype,"behavior",void 0);c([d({type:Number,attribute:"max-autocomplete-entries"})],te.prototype,"maxAutocompleteEntries",void 0);c([d({type:String})],te.prototype,"filter",void 0);c([d({type:Boolean,reflect:!0,attribute:"case-sensitive"})],te.prototype,"caseSensitive",void 0);c([d({type:Boolean,reflect:!0})],te.prototype,"sort",void 0);c([d({type:Boolean,reflect:!0,attribute:"wrap-arrow-keys"})],te.prototype,"wrapArrowKeys",void 0);c([d({type:Boolean,reflect:!0,attribute:"stay-open"})],te.prototype,"stayOpen",void 0);c([d({type:Boolean,reflect:!0})],te.prototype,"clearable",void 0);c([d({type:Boolean,reflect:!0})],te.prototype,"open",void 0);c([d({type:Boolean,reflect:!0})],te.prototype,"disabled",void 0);c([d({type:Boolean,reflect:!0})],te.prototype,"required",void 0);c([d({type:String})],te.prototype,"value",void 0);c([R()],te.prototype,"hasFocus",void 0);c([R()],te.prototype,"highlightedOption",void 0);c([R()],te.prototype,"enteredText",void 0);c([R()],te.prototype,"filterText",void 0);c([Z("#main-widget-row")],te.prototype,"mainWidgetRow",void 0);c([Z("#text-input")],te.prototype,"textInput",void 0);c([Z("#options-list")],te.prototype,"optionsList",void 0);te=c([U("ia-combo-box")],te);const id=(i,e,t)=>{for(const s of e)if(s[0]===i)return(0,s[1])();return t?.()},fp=Q`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,Gs=Q`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`;var mp=Object.defineProperty,gp=Object.getOwnPropertyDescriptor,Fs=(i,e,t,s)=>{for(var r=s>1?void 0:s?gp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&mp(e,t,r),r};let he=class extends H{constructor(){super(...arguments),this.placeholderType=null,this.detailMessage=""}render(){return this.placeholderType?p`${this.placeholderTemplate}`:v}get placeholderTemplate(){return p`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?"mobile":"desktop"}"
      >
        ${id(this.placeholderType,[["empty-query",()=>this.emptyQueryTemplate],["empty-collection",()=>this.emptyCollectionTemplate],["no-results",()=>this.noResultsTemplate],["query-error",()=>this.queryErrorTemplate],["collection-error",()=>this.collectionErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return p`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${he.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${fp}</div>
    `}get emptyCollectionTemplate(){return p`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${he.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${Gs}</div>
    `}get noResultsTemplate(){return p`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection?he.MESSAGE_NO_COLLECTION_RESULTS:he.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${Gs}</div>
    `}get queryErrorTemplate(){return p`
      <h2 class="title" data-testid="error-query-text-msg">
        ${he.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${Gs}</div>
      <p class="error-details">
        ${he.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}get collectionErrorTemplate(){return p`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${he.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${Gs}</div>
      <p class="error-details">
        ${he.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return S`
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
    `}};he.MESSAGE_EMPTY_QUERY=x('To begin searching, enter a search term in the box above and hit "Go".');he.MESSAGE_NO_SEARCH_RESULTS=x("Your search did not match any items in the Archive. Try different keywords or a more general search.");he.MESSAGE_NO_COLLECTION_RESULTS=x("Your search did not match any items in this collection. Try different keywords or a more general search.");he.MESSAGE_NO_VIEWABLE_MEMBERS=x("This collection contains no viewable items.");he.MESSAGE_QUERY_ERROR=x(p`The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `);he.MESSAGE_COLLECTION_ERROR=x(p`The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`);he.QUERY_ERROR_DETAILS_MESSAGE=x("Error details:");Fs([d({type:String})],he.prototype,"placeholderType",2);Fs([d({type:Boolean})],he.prototype,"isMobileView",2);Fs([d({type:Boolean})],he.prototype,"isCollection",2);Fs([d({type:String})],he.prototype,"detailMessage",2);he=Fs([U("empty-placeholder")],he);const sd=Q`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;var rd=(i=>(i[i.bytes=0]="bytes",i[i.kilobytes=1]="kilobytes",i[i.megabytes=2]="megabytes",i[i.gigabytes=3]="gigabytes",i[i.terabytes=4]="terabytes",i[i.petabytes=5]="petabytes",i[i.exabytes=6]="exabytes",i[i.zettabytes=7]="zettabytes",i[i.yottabytes=8]="yottabytes",i))(rd||{});function vp(i,e,t=" "){let s=i;if(s===void 0)return v;let r=0;for(;s>1024;)s/=1024,r+=1;const o=10**e;s=Math.round(s*o)/o;let a=rd[r];return a=s===1?a.slice(0,-1):a,`${s.toLocaleString()+t+a}`}const bp=S`var(--tileBackgroundColor, #ffffff)`,yp=S`var(--tileCornerRadius, 4px)`,Ur=S`
  /* Include .sr-only styles for all tiles */
  ${ct}

  .container {
    background-color: ${bp};
    border: 1px #2c2c2c;
    border-radius: ${yp};
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
`;function od(i,e="short",{locale:t="en-US",useLocalTime:s=!1}={}){if(!i)return"";const r=s?{}:{timeZone:"UTC"};switch(e){case"year-only":return`${i.getUTCFullYear()}`;case"short":r.month="short",r.year="numeric";break;case"long":r.year="numeric",r.month="short",r.day="2-digit";break}return new Intl.DateTimeFormat(t,r).format(i)}class El{constructor(e={}){this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=e.collectionPagePath??"/details/",this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){let e;if(this.creatorFilter&&this.model?.creators.length){const t=this.creatorFilter;e=this.model.creators.find(s=>s.normalize("NFD").replace(/[^A-Z]+/gi,"").toUpperCase().startsWith(t))}return e??this.model?.creator}get accountLabel(){return this.model?.dateAdded?x(ft`Archivist since ${this.model.dateAdded.getFullYear()}`):""}get dateLabel(){switch(this.sortParam?.field){case"publicdate":return x("Archived");case"reviewdate":return x("Reviewed");case"addeddate":return x("Added");case"date":return x("Published");default:return""}}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return v;const s=t?this.collectionPagePath:"/details/";return`${this.baseNavigationUrl}${s}${e}`}webArchivesCaptureLink(e,t){const r=`https://web.archive.org/web/${t.toISOString().replace(/[TZ:-]/g,"").replace(/\..*/,"")}/${encodeURIComponent(e)}`,o=od(t,"long");return p` <a href=${r}> ${o} </a> `}}var wp=Object.defineProperty,He=(i,e,t,s)=>{for(var r=void 0,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(e,t,r)||r);return r&&wp(e,t,r),r};class fe extends H{constructor(){super(...arguments),this.sortParam=null,this.defaultSortParam=null,this.loggedIn=!1,this.suppressBlurring=!1,this.useLocalTime=!1,this.displayValueProvider=new El}willUpdate(e){(e.has("model")||e.has("baseNavigationUrl")||e.has("collectionPagePath")||e.has("sortParam")||e.has("defaultSortParam")||e.has("creatorFilter"))&&(this.displayValueProvider=new El({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:this.sortParam??this.defaultSortParam??void 0,creatorFilter:this.creatorFilter}))}getFormattedDate(e,t){const{useLocalTime:s}=this;return od(e,t,{useLocalTime:s})}}He([d({type:Object})],fe.prototype,"model");He([d({type:Number})],fe.prototype,"currentWidth");He([d({type:Number})],fe.prototype,"currentHeight");He([d({type:String})],fe.prototype,"baseNavigationUrl");He([d({type:String})],fe.prototype,"baseImageUrl");He([d({type:String})],fe.prototype,"collectionPagePath");He([d({type:Object})],fe.prototype,"sortParam");He([d({type:Object})],fe.prototype,"defaultSortParam");He([d({type:String})],fe.prototype,"creatorFilter");He([d({type:Number})],fe.prototype,"mobileBreakpoint");He([d({type:Boolean})],fe.prototype,"loggedIn");He([d({type:Boolean})],fe.prototype,"suppressBlurring");He([d({type:Boolean})],fe.prototype,"useLocalTime");var $p=Object.defineProperty,Sp=Object.getOwnPropertyDescriptor,ad=(i,e,t,s)=>{for(var r=s>1?void 0:s?Sp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&$p(e,t,r),r};let ua=class extends H{render(){return p`<div class="icon-overlay">${this.iconTemplate}</div>`}get iconTemplate(){return this.type?p`${jc[this.type]??v}`:v}static get styles(){return S`
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
    `}};ad([d({type:String})],ua.prototype,"type",2);ua=ad([U("icon-overlay")],ua);var xp=Object.defineProperty,Cp=Object.getOwnPropertyDescriptor,nd=(i,e,t,s)=>{for(var r=s>1?void 0:s?Cp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&xp(e,t,r),r};let fa=class extends H{render(){return p`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `}get iconTemplate(){return this.type?p`${jc[this.type]??v}`:v}get textTemplate(){return this.type?p`${R1[this.type]??v}`:v}static get styles(){return S`
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
    `}};nd([d({type:String})],fa.prototype,"type",2);fa=nd([U("text-overlay")],fa);var _p=Object.defineProperty,Tp=Object.getOwnPropertyDescriptor,It=(i,e,t,s)=>{for(var r=s>1?void 0:s?Tp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&_p(e,t,r),r};let Tt=class extends H{constructor(){super(...arguments),this.isCompactTile=!1,this.isListTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.viewSize="desktop"}render(){return this.model?.identifier?p`
      <div class=${qe(this.baseClass)}>
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
    `:v}get baseClass(){return{container:!0,list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:this.model?.mediatype==="collection",[this.viewSize]:!0,"search-image":this.model?.mediatype==="search"}}get iconOverlayTemplate(){if(!this.isListTile)return v;const{overlayType:i}=this;return i?p`
      <icon-overlay
        class=${this.isCompactTile?"list-compact":"list-detail"}
        .type=${this.overlayType}
      >
      </icon-overlay>
    `:v}get textOverlayTemplate(){if(this.isListTile)return v;const{overlayType:i}=this;return i?p` <text-overlay .type=${this.overlayType}></text-overlay> `:v}get overlayType(){if(!this.suppressBlurring){if(this.model?.loginRequired&&!this.loggedIn)return"login-required";if(this.model?.contentWarning)return"content-warning"}}static get styles(){const i=S`var(--imageBlockBackgroundColor, #f1f1f4)`;return S`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${i};
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
    `}};It([d({type:String})],Tt.prototype,"baseImageUrl",2);It([d({type:Boolean})],Tt.prototype,"isCompactTile",2);It([d({type:Boolean})],Tt.prototype,"isListTile",2);It([d({type:Boolean})],Tt.prototype,"loggedIn",2);It([d({type:Boolean})],Tt.prototype,"suppressBlurring",2);It([d({type:Object})],Tt.prototype,"model",2);It([d({type:String})],Tt.prototype,"viewSize",2);Tt=It([U("image-block")],Tt);var kp=Object.defineProperty,Ep=Object.getOwnPropertyDescriptor,ld=(i,e,t,s)=>{for(var r=s>1?void 0:s?Ep(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&kp(e,t,r),r};let ma=class extends fe{constructor(){super(...arguments),this.showInfoButton=!1}render(){return p`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `}get getImageBlockTemplate(){return p`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return p`<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
    </div>`}get getTileStatsTemplate(){return p`
      <div id="item-stats">
        <div id="item-mediatype">${sd}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){const i=this.model?.itemCount?.toLocaleString();return p`<span id="item-count"
      >${i} item${Number(i)!==1?"s":""}</span
    >`}get getSizeTemplate(){const i=this.model?.collectionSize??0;return i?p`<span id="item-size">${vp(i,1)}</span>`:""}get infoButtonTemplate(){return this.showInfoButton?p`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${x("More info")}</span>
        </button>`:v}infoButtonPressed(i){i.preventDefault();const e=new CustomEvent("infoButtonPressed",{detail:{x:i.clientX,y:i.clientY}});this.dispatchEvent(e)}static get styles(){const i=S`var(--tileBorderColor, #555555)`,e=S`var(--tileBackgroundColor, #666666)`,t=S`#fff`;return[Ur,S`
        .container {
          background-color: ${e};
          border: 1px solid ${i};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${t};
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
          color: ${t};
          flex-direction: column;
          margin-left: 10px;
        }
      `]}};ld([d({type:Boolean})],ma.prototype,"showInfoButton",2);ma=ld([U("collection-tile")],ma);function*si(i,e){if(i!==void 0){let t=0;for(const s of i)yield e(s,t++)}}function Za(i){return i?i.toISOString().endsWith("-01-01T00:00:00.000Z"):!1}const cd=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
  </svg>
`,Ap=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m69.0481858 61.4006179 13.2757509 38.38311-32.1794134-24.4730516-32.2508245 24.6893237 13.2757507-38.4552008-31.1694495-21.9945074 38.1677832-.5115002 11.8339172-39.0387916 11.6162817 38.8946104 38.3820179.6556814zm-2.8122554 15.58874-6.7092871-19.2276004 18.0365221-11.7267421-21.6445066.5115-5.9169584-19.5914862-5.9169587 19.5914862-21.6445064-.5115 18.036522 11.7267421-6.5664638 19.3752146 16.0880061-12.3824233z"
    />
  </svg>
`;var Mp=Object.defineProperty,Pp=Object.getOwnPropertyDescriptor,Bs=(i,e,t,s)=>{for(var r=s>1?void 0:s?Pp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Mp(e,t,r),r};let Li=class extends H{constructor(){super(...arguments),this.title="",this.body="",this.starRating=0,this.viewSize="desktop"}render(){return!this.title&&!this.body&&!this.starRating?v:p`
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.title}</p>
          <p class="review-body">${this.body}</p>
        </div>
      </div>
    `}get starsTemplate(){if(this.starRating<=0)return v;const i=Math.min(5,this.starRating),e=Math.min(5,5-this.starRating);return p`
      <div class="star-rating">
        <span class="sr-only">${this.starRating} ${x("out of 5 stars")}</span>
        ${Array(i).fill(this.filledStarTemplate)}
        ${Array(e).fill(this.unfilledStarTemplate)}
      </div>
    `}get filledStarTemplate(){return p`<span aria-hidden="true">${cd}</span>`}get unfilledStarTemplate(){return p`
      <span class="unfilled-star" aria-hidden="true">
        ${Ap}
      </span>
    `}static get styles(){return[ct,S`
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
      `]}};Bs([d({type:String})],Li.prototype,"title",2);Bs([d({type:String})],Li.prototype,"body",2);Bs([d({type:Number})],Li.prototype,"starRating",2);Bs([d({type:String})],Li.prototype,"viewSize",2);Li=Bs([U("review-block")],Li);function*ir(i,e){const t=typeof e=="function";if(i!==void 0){let s=-1;for(const r of i)s>-1&&(yield t?e(s):e),s++,yield r}}var Op=Object.defineProperty,Dp=Object.getOwnPropertyDescriptor,Ja=(i,e,t,s)=>{for(var r=s>1?void 0:s?Dp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Op(e,t,r),r};let Sr=class extends H{constructor(){super(...arguments),this.snippets=[],this.viewSize="desktop"}render(){return this.snippets?.length?p`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:p`${v}`}get ellipsisJoinedSnippets(){return p`
      &hellip; ${ir(this.snippetTemplates,p` &hellip; `)} &hellip;
    `}get snippetTemplates(){return this.snippets?.map(i=>{const e=i.matchAll(/{{{(.+?)}}}/gs),t=[];let s=0;for(const r of e)r.index!=null&&(t.push(p`
            ${i.slice(s,r.index)}
            <mark>${r[1]}</mark>
          `),s=r.index+r[0].length);return t.push(p`${i.slice(s)}`),p`<span>${t}</span>`})}static get styles(){return S`
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
    `}};Ja([d({type:Array})],Sr.prototype,"snippets",2);Ja([d({type:String})],Sr.prototype,"viewSize",2);Sr=Ja([U("text-snippet-block")],Sr);const Lp=S`
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
`,Fp=S`
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
`,dd=Q`
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
`;var Bp=Object.defineProperty,Rp=Object.getOwnPropertyDescriptor,gt=(i,e,t,s)=>{for(var r=s>1?void 0:s?Rp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Bp(e,t,r),r};let ot=class extends H{constructor(){super(...arguments),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.isWaveform=!1,this.isNotFound=!1}render(){return p`
      <div class=${qe(this.itemBaseClass)}>${this.imageTemplate}</div>
    `}get imageTemplate(){return this.model?.mediatype==="search"?p`${dd}`:p`
      <img
        class=${qe(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `}get imageSrc(){if(this.isNotFound)return this.notFoundSrc;if(this.model?.captureDates&&this.model.identifier)try{const i=new URL(this.model.identifier),e=encodeURIComponent(i.hostname);return this.baseImageUrl?`https://web.archive.org/thumb/${e}?generate=1`:v}catch{return`${this.baseImageUrl}/images/notfound.png`}return this.model?.thumbnailUrl?this.model.thumbnailUrl:this.baseImageUrl&&this.model?.identifier?`${this.baseImageUrl}/services/img/${this.model.identifier}`:v}get notFoundSrc(){return this.baseImageUrl?`${this.baseImageUrl}/images/notfound.png`:v}get hashBasedGradient(){return this.model?.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:"waveform-grad0"}hashStrToInt(i){return i.split("").reduce((e,t)=>e+t.charCodeAt(0),0)}get itemBaseClass(){return{"drop-shadow":!0,"list-box":this.isListTile,"search-image":this.model?.mediatype==="search",[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){const e=!!(this.model?.contentWarning||this.model?.loginRequired)&&!this.suppressBlurring;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:e,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":this.model?.mediatype==="collection"}}get isAccountImage(){return this.model?.mediatype==="account"&&!this.isCompactTile&&!this.isListTile}onLoad(){(this.model?.mediatype==="audio"||this.model?.mediatype==="etree")&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}onError(){this.isNotFound=!0}static get styles(){return[Lp,Fp,S`
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
      `]}};gt([d({type:Object})],ot.prototype,"model",2);gt([d({type:String})],ot.prototype,"baseImageUrl",2);gt([d({type:Boolean})],ot.prototype,"isListTile",2);gt([d({type:Boolean})],ot.prototype,"isCompactTile",2);gt([d({type:Boolean})],ot.prototype,"loggedIn",2);gt([d({type:Boolean})],ot.prototype,"suppressBlurring",2);gt([R()],ot.prototype,"isWaveform",2);gt([R()],ot.prototype,"isNotFound",2);gt([Z("img")],ot.prototype,"baseImage",2);ot=gt([U("item-image")],ot);const zp=Q`
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
`,Ip=Q`
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
`,Np=Q`
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
`,Up=Q`
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
`,Hp=Q`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Al=Q`
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
`,Vp=Q`
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
`,jp=Q`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Wp=Q`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,qp=Q`
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
`,Gp=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m38.4615385 55.5197275-4.8171501 7.0895871c4.1025641 2.9421734 8.9186633 4.7253407 14.4482976 5.3495018v13.0411836h5.6179067v-12.9749847c3.8356452-.357264 6.8905002-1.5278287 9.1645649-3.5116942 2.2740648-1.9838655 3.4110971-4.5582672 3.4110971-7.7232052v-.0661989c0-3.2553047-1.025641-5.7635075-3.076923-7.5246085-2.0512821-1.7611009-5.3068517-3.1544302-9.7667087-4.1799878v-6.2195444c2.6754939.6682937 5.083018 1.7379839 7.2225725 3.2090706l4.4136191-7.1557861c-3.2114333-2.2738797-6.9798234-3.6787675-11.3051702-4.2146634v-11.6383974h-5.5517024v11.5028473c-4.0584279.3131313-7.2026061 1.4721374-9.4325347 3.4770185-2.2299285 2.004881-3.3448928 4.5908413-3.3448928 7.7578808v.1323978c0 3.2111721 1.0372005 5.6857501 3.1116015 7.423734 2.074401 1.7379838 5.3625473 3.1197546 9.8644389 4.1453122v6.4212934c-3.1651955-.4896617-6.4869694-1.9386821-9.9653216-4.3470612zm-24.4136192-32.7716087c-4.32534679 3.7008338-7.74800337 8.0142702-10.26796974 12.9403091s-3.77994956 10.1536506-3.77994956 15.6828351c0 4.9050234 1.02564103 9.6093485 3.07692308 14.1129754 2.05128205 4.5036268 4.88335435 8.5606738 8.49621692 12.1711409.357293.3572639 1.1149642.6252118 2.2730138.8038438s2.2057588-.0220663 3.1431274-.6020948c.5800757-.4896617.8701135-1.1138228.8701135-1.8724832s-.1229508-1.3828215-.3688525-1.8724832c-.2459016-.4896617-.5023119-.8689919-.7692307-1.1379907-6.5111392-6.3761101-9.76670873-13.5770795-9.76670873-21.6029082 0-4.6822589 1.1034048-9.0850112 3.31021443-13.2082571 2.2068095-4.1232459 5.2059688-7.6570063 8.9974779-10.6012813.0882724-.0882652.1775956-.1880889.2679697-.2994712s.2574611-.3562131.5012611-.7344926c.2437999-.3782794.4224464-.7460511.5359394-1.103315.1134931-.3572639.1250526-.770219.0346785-1.2388652s-.3131568-.8816012-.6683481-1.2388651c-.668348-.6682937-1.4932745-1.0245068-2.4747793-1.0686394s-1.8064313.0893159-2.4747793.4003457zm71.9041614 0c4.3253468 3.7008338 7.7480034 8.0142702 10.2679697 12.9403091 2.5199664 4.9260389 3.7799496 10.1536506 3.7799496 15.6828351 0 4.8608908-1.025641 9.5536573-3.0769231 14.0782997-2.051282 4.5246424-4.8602354 8.593248-8.42686 12.2058166-.4014292.3572639-1.1822194.6252118-2.3423707.8038438-1.1601514.178632-2.1857924-.0220663-3.0769231-.6020948-.5800757-.4896617-.8806221-1.1138228-.9016394-1.8724832-.0210172-.7586604.0903741-1.3828215.3341741-1.8724832.2437999-.4896617.5002101-.8689919.7692307-1.1379907 6.4649012-6.3319775 9.6973519-13.5329469 9.6973519-21.6029082 0-4.6822589-1.1034048-9.0850112-3.3102144-13.2082571s-5.18285-7.6570063-8.9281211-10.6012813c-.0882724-.0882652-.1775956-.1880889-.2679697-.2994712s-.2574611-.3562131-.5012611-.7344926c-.2437999-.3782794-.4224464-.7460511-.5359394-1.103315-.1134931-.3572639-.1250526-.770219-.0346785-1.2388652s.3131568-.8816012.6683481-1.2388651c.668348-.6682937 1.4932745-1.0245068 2.4747793-1.0686394s1.7843632.0893159 2.408575.4003457zm-62.2730139 8.0920276c-3.1210592 2.4525117-5.6179066 5.4840011-7.4905422 9.0944682s-2.8089534 7.4447495-2.8089534 11.5028473c0 6.2878449 2.2068096 11.9725442 6.6204288 17.054098.1786465.3131313.858554.469697 2.0397226.469697 1.1811685 0 2.1290458-.2900143 2.8436318-.8700427.5359394-.4896618.8259773-1.1253814.8701134-1.9071589.0441362-.7817775-.045187-1.2167988-.2679697-1.305064-1.6939891-1.7842181-3.1094998-3.9582741-4.2465321-6.522168-1.1370324-2.563894-1.7055486-5.0720968-1.7055486-7.5246085 0-3.34357.7471627-6.3424853 2.241488-8.996746 1.4943254-2.6542607 3.5571669-4.7390008 6.1885246-6.2542201.0441362-.0441326.1113914-.12189.2017655-.2332723s.2238335-.3341468.4003783-.6682937c.1765447-.3341468.2994956-.6577859.3688524-.9709172.0693569-.3131313.0472888-.7029693-.0662043-1.1695139-.113493-.4665447-.3478352-.901566-.7030264-1.3050641-.4897016-.5358959-1.102354-.8364179-1.8379572-.901566s-1.3482555-.009457-1.8379571.1670734zm52.5063052 0c3.1651955 2.4966443 5.6956705 5.5396923 7.591425 9.1291438 1.8957545 3.5894516 2.8436318 7.4132262 2.8436318 11.471324 0 6.2416107-2.2519967 11.9263101-6.75599 17.054098-.1345103.3131313-.7923497.469697-1.9735182.469697-1.1811686 0-2.1290459-.2900142-2.8436318-.8700427-.5359395-.4896617-.8259773-1.1253813-.8701135-1.9071589-.0441362-.7817775.045187-1.2167988.2679697-1.305064 1.6498529-1.8283506 3.0432955-4.0244729 4.1803279-6.5883669s1.7055485-5.0500305 1.7055485-7.4584096c0-3.3435699-.7356032-6.3309267-2.2068095-8.9620704-1.4712064-2.6311436-3.5004204-4.7263914-6.0876419-6.2857433l-.2332913-.2332723s-.1450189-.2227646-.4350568-.6682937c-.2900378-.4455291-.4129886-.7691682-.3688524-.9709172.0441362-.2017491.0662043-.591587.0662043-1.169514 0-.5779269.2343421-1.0129482.7030265-1.305064.4897015-.5358959 1.1023539-.8364179 1.8379571-.901566.7356032-.0651482 1.3482555-.009457 1.8379571.1670734zm-31.3682219 10.2324588v-.0661989c0-1.605586 1.2263556-2.497695 3.6790668-2.676327v5.7529998c-1.4270702-.4013965-2.3970156-.8248593-2.9098361-1.2703884-.5128205-.4455292-.7692307-1.0255576-.7692307-1.7400855zm12.1721311 16.3196055v.0661989c0 1.5614535-1.2042875 2.4756288-3.6128625 2.7425259v-5.8853976c1.382934.4013965 2.3308112.8248594 2.8436317 1.2703885.5128206.4455291.7692308 1.0476239.7692308 1.8062843z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Yp=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m53.8329111 72.530691-28.3707393-20.2314977c-1.2950216-.9306676-2.0122823-2.1279084-2.1517819-3.5917222-.1394997-1.4638139.1499621-2.9054133.8683852-4.3247984.7184232-1.419385 1.5275211-2.780311 2.4272938-4.0827779.8997726-1.302467 1.7204955-2.3488835 2.4621686-3.1392494l1.178772-1.1855489 20.6040968 16.1873027 36.4861309-43.88284817 3.885065-3.27955103c2.311044 1.53396469 4.1722017 3.06909856 5.5834731 4.60540161 1.4112713 1.53630309 2.2901191 2.86215359 2.6365432 3.97755169.3464241 1.1153982.5312611 2.1150474.5545111 2.9989478.0232494.8839004-.0813748 1.5351339-.3138742 1.9537004l-.4150115.6980007zm15.0520112 11.0943528v-5.022799c-.0464999-.1403016-.0813748-.2911259-.1046247-.4524728-.02325-.1613469-.0464999-.486379-.0697498-.9750964-.02325-.4887175.0116249-.8020578.1046247-.9400211.0464999-.1870689.2197119-.4898866.5196361-.9084532.2999243-.4185666.589386-.7903659.8683853-1.1153981l.4150114-.4875482 9.5731628-11.1645037v32.4412487h-80.1913681v-80.6524027h68.1874241l-7.1458691 8.5829534c-1.0183473 1.5807319-1.8041953 2.5113995-2.3575439 2.7920028h-47.3775653v57.9059979h57.574989z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Qp=Q`
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
`,Kp=Q`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,Xp=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,hd={account:{color:"#000000",icon:zp,text:"Account"},audio:{color:"#00adef",icon:Ip,text:"Audio"},collection:{color:"#4666ff",icon:sd,text:"Collection"},data:{color:"#333333",icon:Np,text:"Data"},etree:{color:"#00adef",icon:Up,text:"E-tree"},film:{color:"#bf1b2c",icon:Al,text:"Film"},image:{color:"#aa99c9",icon:Hp,text:"Image"},movies:{color:"#f1644b",icon:Al,text:"Movie"},none:{color:"#00000000",icon:p``,text:""},radio:{color:"#8fdaef",icon:Vp,text:"Radio"},software:{color:"#9ecc4f",icon:jp,text:"Software"},texts:{color:"#faab3c",icon:Wp,text:"Text"},tv:{color:"#f1644b",icon:qp,text:"TV"},tvCommercial:{color:"#84b648",icon:Gp,text:"TV Commercial"},tvFactCheck:{color:"#f1644b",icon:Yp,text:"TV Fact Check"},tvQuote:{color:"#fe7a5f",icon:Xp,text:"TV Quote"},video:{color:"#f1644b",icon:Qp,text:"Video"},web:{color:"#ffcd27",icon:Kp,text:"Web"},search:{color:"#000000",icon:dd,text:"Search"}};var Zp=Object.defineProperty,Jp=Object.getOwnPropertyDescriptor,en=(i,e,t,s)=>{for(var r=s>1?void 0:s?Jp(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Zp(e,t,r),r};const e0="tv_ads",t0="factchecked",i0=new Set(["tvnews","tvarchive","television"]),s0=new Set(["radio","radioprogram"]);let xr=class extends H{constructor(){super(...arguments),this.showText=!1}get displayMediatype(){return this.isTvItem?this.tvDisplayMediatype:this.isRadioItem?"radio":this.model?.mediatype??"none"}get tvDisplayMediatype(){return this.isTvCommercial?"tvCommercial":this.model?.isTvSearchResult&&this.isTvFactCheck?"tvFactCheck":this.model?.isTvSearchResult&&this.isTvQuote?"tvQuote":"tv"}get isTvItem(){return!!(this.model?.mediatype==="movies"&&this.model?.collections.some(i=>i0.has(i)))}get isTvCommercial(){return!!(this.model?.adIds?.length||this.model?.collections.includes(e0))}get isTvFactCheck(){return!!(this.model?.factChecks?.length||this.model?.collections.includes(t0))}get isTvQuote(){return!!this.model?.isClip}get isRadioItem(){return!!(this.model?.mediatype==="audio"&&this.model?.collections.some(i=>s0.has(i)))}render(){const i=hd[this.displayMediatype];return i?p`
      <div
        id="icon"
        class="${this.showText?"show-text":"hide-text"}"
        title="${i.text}"
        style="--iconFillColor: ${i.color}"
      >
        ${i.icon}
        <p class="status-text">${i.text}</p>
      </div>
    `:p``}static get styles(){return S`
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
    `}};en([d({type:Object})],xr.prototype,"model",2);en([d({type:Boolean})],xr.prototype,"showText",2);xr=en([U("tile-mediatype-icon")],xr);const r0=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,o0=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,a0=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`,n0=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"/>
  </svg>
`;function l0(i,e){let t=1;return i>=1e9?t=1e9:i>=1e6?t=1e6:i>=1e3&&e==="short"&&(t=1e3),t}function c0(i=0,e){const t=i/e,s=t<10;let r=0;return s?r=Math.round((t+Number.EPSILON)*10)/10:r=Math.round(t),r}function d0(i,e,t,s){switch(e){case 1e9:return x(t==="short"?ft`${i}B`:ft`${i} billion`);case 1e6:return x(t==="short"?ft`${i}M`:ft`${i} million`);case 1e3:return x(t==="short"?ft`${i}K`:ft`${i} thousand`);default:return new Intl.NumberFormat(s).format(i)}}function tn(i,e="long",t="short",s="en-US"){const r=i??-1;if(r<0)return"";const o=l0(r,e),a=c0(r,o);return d0(a,o,t,s)}var h0=Object.defineProperty,p0=Object.getOwnPropertyDescriptor,vt=(i,e,t,s)=>{for(var r=s>1?void 0:s?p0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&h0(e,t,r),r};let at=class extends H{constructor(){super(...arguments),this.showTvClips=!1}render(){return p`
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
    `}get mediatypeIconColumnTemplate(){return p`
      <li class="col">
        <p class="sr-only">${x("Mediatype:")}</p>
        <tile-mediatype-icon .model=${this.model}></tile-mediatype-icon>
      </li>
    `}columnTemplate(i,e,t,s=[]){const r=tn(i??0,"short","short"),o=x(ft`${r} ${e}`),a=e+":";return p`
      <li class="col ${s.join(" ")}" title=${o}>
        ${t}
        <p class="status-text">
          <span class="sr-only">${a}</span>
          ${r}
        </p>
      </li>
    `}get viewsColumnTemplate(){const i=this.viewLabel??x("all-time views");return this.columnTemplate(this.viewCount,i,a0)}get uploadsColumnTemplate(){return this.columnTemplate(this.itemCount,x("uploads"),o0)}get favoritesColumnTemplate(){return this.columnTemplate(this.favCount,x("favorites"),cd)}get reviewsColumnTemplate(){return this.columnTemplate(this.commentCount,x("reviews"),r0,["reviews"])}get tvClipsColumnTemplate(){return this.columnTemplate(this.tvClipCount,x("clips"),n0)}static get styles(){return[ct,S`
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
      `]}};vt([d({type:Object})],at.prototype,"model",2);vt([d({type:String})],at.prototype,"mediatype",2);vt([d({type:Number})],at.prototype,"itemCount",2);vt([d({type:Number})],at.prototype,"viewCount",2);vt([d({type:String})],at.prototype,"viewLabel",2);vt([d({type:Number})],at.prototype,"favCount",2);vt([d({type:Number})],at.prototype,"commentCount",2);vt([d({type:Boolean})],at.prototype,"showTvClips",2);vt([d({type:Number})],at.prototype,"tvClipCount",2);at=vt([U("tile-stats")],at);var u0=Object.defineProperty,f0=Object.getOwnPropertyDescriptor,Hr=(i,e,t,s)=>{for(var r=s>1?void 0:s?f0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&u0(e,t,r),r};let Ps=class extends fe{constructor(){super(...arguments),this.showInfoButton=!1,this.showTvClips=!1,this.simpleLayoutType="none"}render(){const i=this.model?.title,e=qe({container:!0,simple:this.simpleLayoutType!=="none","stats-only":this.simpleLayoutType==="stats-only","snippets-only":this.simpleLayoutType==="snippets-only"});return p`
      <div class=${e}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h3 class="truncated" title=${Ie(i)}>
                ${i}
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
    `}get creatorTemplate(){const i=this.displayValueProvider.firstCreatorMatchingFilter;return i?p`
      <div class="created-by">
        <span class="truncated" title=${i}>
          by&nbsp;${i}
        </span>
      </div>
    `:v}get imageBlockTemplate(){return p`
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
    `}get sortedDateInfoTemplate(){let i,e="long";switch(this.effectiveSort?.field){case"date":{const s=this.model?.datePublished;i={field:"published",value:s},Za(s)&&(e="year-only");break}case"reviewdate":i={field:"reviewed",value:this.model?.dateReviewed};break;case"addeddate":i={field:"added",value:this.model?.dateAdded};break;case"publicdate":i={field:"archived",value:this.model?.dateArchived};break}if(!i?.value)return v;const t=this.getFormattedDate(i.value,e);return p`
      <div class="date-sorted-by truncated">
        <span>${i.field} ${t}</span>
      </div>
    `}get infoButtonTemplate(){return this.showInfoButton?p`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${x("More info")}</span>
        </button>`:v}get reviewBlockTemplate(){if(!this.model?.review)return v;const{reviewtitle:i,reviewbody:e,stars:t}=this.model.review;return p`
      <review-block
        viewsize="grid"
        title=${Ie(i)}
        body=${Ie(e)}
        starRating=${Ie(t)}
      >
      </review-block>
    `}get textSnippetsTemplate(){return!this.hasSnippets||this.simpleLayoutType==="stats-only"?v:p`
      <text-snippet-block viewsize="grid" .snippets=${this.model?.snippets}>
      </text-snippet-block>
    `}get volumeIssueTemplate(){return!this.model?.volume||!this.model?.issue?v:p`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${this.model?.volume}, Issue&nbsp;${this.model?.issue}
        </span>
      </div>
    `}get webArchivesCaptureDatesTemplate(){return!this.model?.captureDates||!this.model.title?v:p`
      <ul class="capture-dates">
        ${si(this.model.captureDates,i=>p`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,i)}
            </li>`)}
      </ul>
    `}get tileStatsTemplate(){if(this.simpleLayoutType==="snippets-only")return v;const i=this.sortParam??this.defaultSortParam,[e,t]=i?.field==="week"?[this.model?.weeklyViewCount,"weekly views"]:[this.model?.viewCount,"all-time views"];return p`
      <tile-stats
        .model=${this.model}
        .mediatype=${this.model?.mediatype}
        .viewCount=${e}
        .viewLabel=${t}
        .favCount=${this.model?.favCount}
        .commentCount=${this.model?.commentCount}
        .tvClipCount=${this.model?.tvClipCount}
        .showTvClips=${this.showTvClips}
      >
      </tile-stats>
    `}get isSortedByDate(){return["date","reviewdate","addeddate","publicdate"].includes(this.effectiveSort?.field)}get effectiveSort(){return this.sortParam??this.defaultSortParam}get hasSnippets(){return!!this.model?.snippets?.length}infoButtonPressed(i){i.preventDefault();const e=new CustomEvent("infoButtonPressed",{detail:{x:i.clientX,y:i.clientY}});this.dispatchEvent(e)}static get styles(){const i=S`var(--tileBorderColor, #dddddd)`;return[Ur,S`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:hover {
          text-decoration: underline;
        }

        .container {
          border: 1px solid ${i};
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
      `]}};Hr([d({type:Boolean})],Ps.prototype,"showInfoButton",2);Hr([d({type:Boolean})],Ps.prototype,"showTvClips",2);Hr([d({type:String})],Ps.prototype,"simpleLayoutType",2);Ps=Hr([U("item-tile")],Ps);var m0=Object.defineProperty,g0=Object.getOwnPropertyDescriptor,pd=(i,e,t,s)=>{for(var r=s>1?void 0:s?g0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&m0(e,t,r),r};let ga=class extends fe{constructor(){super(...arguments),this.showInfoButton=!1}render(){return p`
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
    `}get getAvatarTemplate(){return p`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return p`<div id="title">
      <h4 class="truncated">${this.model?.identifier}</h4>
    </div>`}get getArchivistTemplate(){return p`<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
    </div>`}get getTileStatsTemplate(){return p`<tile-stats
      .mediatype=${this.model?.mediatype}
      .itemCount=${this.model?.itemCount}
      .favCount=${this.model?.favCount}
      .commentCount=${this.model?.commentCount}
    >
    </tile-stats>`}get infoButtonTemplate(){return this.showInfoButton?p`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${x("More info")}</span>
        </button>`:v}infoButtonPressed(i){i.preventDefault();const e=new CustomEvent("infoButtonPressed",{detail:{x:i.clientX,y:i.clientY}});this.dispatchEvent(e)}static get styles(){const i=S`var(--tileBorderColor, #dddddd)`;return[Ur,S`
        .container {
          border: 1px solid ${i};
        }
      `]}};pd([d({type:Boolean})],ga.prototype,"showInfoButton",2);ga=pd([U("account-tile")],ga);var v0=Object.defineProperty,b0=Object.getOwnPropertyDescriptor,ud=(i,e,t,s)=>{for(var r=s>1?void 0:s?b0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&v0(e,t,r),r};let va=class extends fe{constructor(){super(...arguments),this.showInfoButton=!1}render(){return p`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
      </div>
    `}get getImageBlockTemplate(){return p`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${"grid"}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return p`<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
    </div>`}static get styles(){const i=S`var(--tileBorderColor, #555555)`,e=S`var(--tileBackgroundColor, #666666)`,t=S`#fff`;return[Ur,S`
        .container {
          background-color: ${e};
          border: 1px solid ${i};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${t};
          -webkit-line-clamp: 4;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `]}};ud([d({type:Boolean})],va.prototype,"showInfoButton",2);va=ud([U("search-tile")],va);function sr(i,e,t,s=20,r=0){let o=[];if(r>=s)return o;const a=l=>{const h=l.assignedNodes().filter(u=>u.nodeType===1);return h.length>0?sr(h[0].parentElement,e,t,s,r+1):[]},n=Array.from(i.children||[]);for(const l of n)e(l)||(t(l)&&o.push(l),l.shadowRoot!=null?o.push(...sr(l.shadowRoot,e,t,s,r+1)):l.tagName==="SLOT"?o.push(...a(l)):o.push(...sr(l,e,t,s,r+1)));return o}function fd(i){return i.hasAttribute("hidden")||i.hasAttribute("aria-hidden")&&i.getAttribute("aria-hidden")!=="false"||i.style.display==="none"||i.style.opacity==="0"||i.style.visibility==="hidden"||i.style.visibility==="collapse"}function y0(i){return i.hasAttribute("disabled")||i.hasAttribute("aria-disabled")&&i.getAttribute("aria-disabled")!=="false"}function w0(i){return i.getAttribute("tabindex")==="-1"||fd(i)||y0(i)?!1:i.hasAttribute("tabindex")||(i instanceof HTMLAnchorElement||i instanceof HTMLAreaElement)&&i.hasAttribute("href")||i instanceof HTMLButtonElement||i instanceof HTMLInputElement||i instanceof HTMLTextAreaElement||i instanceof HTMLSelectElement||i instanceof HTMLIFrameElement}const wo=new Map;function $0(i,e,t){const s=wo.get(t);s!=null&&window.clearTimeout(s),wo.set(t,window.setTimeout(()=>{i(),wo.delete(t)},e))}const md=document.createElement("template");md.innerHTML=`
	<div id="start"></div>
	<div id="backup"></div>
	<slot></slot>
	<div id="end"></div>
`;class S0 extends HTMLElement{constructor(){super(),this.debounceId=Math.random().toString(),this._focused=!1;const e=this.attachShadow({mode:"open"});e.appendChild(md.content.cloneNode(!0)),this.$backup=e.querySelector("#backup"),this.$start=e.querySelector("#start"),this.$end=e.querySelector("#end"),this.focusLastElement=this.focusLastElement.bind(this),this.focusFirstElement=this.focusFirstElement.bind(this),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}static get observedAttributes(){return["inactive"]}get inactive(){return this.hasAttribute("inactive")}set inactive(e){e?this.setAttribute("inactive",""):this.removeAttribute("inactive")}get focused(){return this._focused}connectedCallback(){this.$start.addEventListener("focus",this.focusLastElement),this.$end.addEventListener("focus",this.focusFirstElement),this.addEventListener("focusin",this.onFocusIn),this.addEventListener("focusout",this.onFocusOut),this.render()}disconnectedCallback(){this.$start.removeEventListener("focus",this.focusLastElement),this.$end.removeEventListener("focus",this.focusFirstElement),this.removeEventListener("focusin",this.onFocusIn),this.removeEventListener("focusout",this.onFocusOut)}attributeChangedCallback(){this.render()}focusFirstElement(){this.trapFocus()}focusLastElement(){this.trapFocus(!0)}getFocusableElements(){return sr(this,fd,w0)}trapFocus(e){if(this.inactive)return;let t=this.getFocusableElements();t.length>0?(e?t[t.length-1].focus():t[0].focus(),this.$backup.setAttribute("tabindex","-1")):(this.$backup.setAttribute("tabindex","0"),this.$backup.focus())}onFocusIn(){this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}updateFocused(e){$0(()=>{this.focused!==e&&(this._focused=e,this.render())},0,this.debounceId)}render(){this.$start.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.$end.setAttribute("tabindex",!this.focused||this.inactive?"-1":"0"),this.focused?this.setAttribute("focused",""):this.removeAttribute("focused")}}window.customElements.define("focus-trap",S0);class ba extends Ls{constructor(e){if(super(e),this.it=oe,e.type!==ut.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===oe||e==null)return this._t=void 0,this.it=e;if(e===We)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}ba.directiveName="unsafeHTML",ba.resultType=1;const x0=Ds(ba);const{entries:gd,setPrototypeOf:Ml,isFrozen:C0,getPrototypeOf:_0,getOwnPropertyDescriptor:T0}=Object;let{freeze:Pe,seal:Ge,create:vd}=Object,{apply:ya,construct:wa}=typeof Reflect<"u"&&Reflect;Pe||(Pe=function(e){return e});Ge||(Ge=function(e){return e});ya||(ya=function(e,t,s){return e.apply(t,s)});wa||(wa=function(e,t){return new e(...t)});const Ys=Oe(Array.prototype.forEach),k0=Oe(Array.prototype.lastIndexOf),Pl=Oe(Array.prototype.pop),ts=Oe(Array.prototype.push),E0=Oe(Array.prototype.splice),rr=Oe(String.prototype.toLowerCase),$o=Oe(String.prototype.toString),Ol=Oe(String.prototype.match),is=Oe(String.prototype.replace),A0=Oe(String.prototype.indexOf),M0=Oe(String.prototype.trim),Ze=Oe(Object.prototype.hasOwnProperty),Ae=Oe(RegExp.prototype.test),ss=P0(TypeError);function Oe(i){return function(e){for(var t=arguments.length,s=new Array(t>1?t-1:0),r=1;r<t;r++)s[r-1]=arguments[r];return ya(i,e,s)}}function P0(i){return function(){for(var e=arguments.length,t=new Array(e),s=0;s<e;s++)t[s]=arguments[s];return wa(i,t)}}function V(i,e){let t=arguments.length>2&&arguments[2]!==void 0?arguments[2]:rr;Ml&&Ml(i,null);let s=e.length;for(;s--;){let r=e[s];if(typeof r=="string"){const o=t(r);o!==r&&(C0(e)||(e[s]=o),r=o)}i[r]=!0}return i}function O0(i){for(let e=0;e<i.length;e++)Ze(i,e)||(i[e]=null);return i}function Qt(i){const e=vd(null);for(const[t,s]of gd(i))Ze(i,t)&&(Array.isArray(s)?e[t]=O0(s):s&&typeof s=="object"&&s.constructor===Object?e[t]=Qt(s):e[t]=s);return e}function rs(i,e){for(;i!==null;){const s=T0(i,e);if(s){if(s.get)return Oe(s.get);if(typeof s.value=="function")return Oe(s.value)}i=_0(i)}function t(){return null}return t}const Dl=Pe(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),So=Pe(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),xo=Pe(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),D0=Pe(["animate","color-profile","cursor","discard","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Co=Pe(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover","mprescripts"]),L0=Pe(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),Ll=Pe(["#text"]),Fl=Pe(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","popover","popovertarget","popovertargetaction","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","wrap","xmlns","slot"]),_o=Pe(["accent-height","accumulate","additive","alignment-baseline","amplitude","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","exponent","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","intercept","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","slope","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","tablevalues","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),Bl=Pe(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),Qs=Pe(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),F0=Ge(/\{\{[\w\W]*|[\w\W]*\}\}/gm),B0=Ge(/<%[\w\W]*|[\w\W]*%>/gm),R0=Ge(/\$\{[\w\W]*/gm),z0=Ge(/^data-[\-\w.\u00B7-\uFFFF]+$/),I0=Ge(/^aria-[\-\w]+$/),bd=Ge(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),N0=Ge(/^(?:\w+script|data):/i),U0=Ge(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),yd=Ge(/^html$/i),H0=Ge(/^[a-z][.\w]*(-[.\w]+)+$/i);var Rl=Object.freeze({__proto__:null,ARIA_ATTR:I0,ATTR_WHITESPACE:U0,CUSTOM_ELEMENT:H0,DATA_ATTR:z0,DOCTYPE_NAME:yd,ERB_EXPR:B0,IS_ALLOWED_URI:bd,IS_SCRIPT_OR_DATA:N0,MUSTACHE_EXPR:F0,TMPLIT_EXPR:R0});const os={element:1,text:3,progressingInstruction:7,comment:8,document:9},V0=function(){return typeof window>"u"?null:window},j0=function(e,t){if(typeof e!="object"||typeof e.createPolicy!="function")return null;let s=null;const r="data-tt-policy-suffix";t&&t.hasAttribute(r)&&(s=t.getAttribute(r));const o="dompurify"+(s?"#"+s:"");try{return e.createPolicy(o,{createHTML(a){return a},createScriptURL(a){return a}})}catch{return console.warn("TrustedTypes policy "+o+" could not be created."),null}},zl=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function wd(){let i=arguments.length>0&&arguments[0]!==void 0?arguments[0]:V0();const e=F=>wd(F);if(e.version="3.2.4",e.removed=[],!i||!i.document||i.document.nodeType!==os.document||!i.Element)return e.isSupported=!1,e;let{document:t}=i;const s=t,r=s.currentScript,{DocumentFragment:o,HTMLTemplateElement:a,Node:n,Element:l,NodeFilter:h,NamedNodeMap:u=i.NamedNodeMap||i.MozNamedAttrMap,HTMLFormElement:f,DOMParser:g,trustedTypes:y}=i,$=l.prototype,_=rs($,"cloneNode"),O=rs($,"remove"),z=rs($,"nextSibling"),P=rs($,"childNodes"),L=rs($,"parentNode");if(typeof a=="function"){const F=t.createElement("template");F.content&&F.content.ownerDocument&&(t=F.content.ownerDocument)}let N,se="";const{implementation:Re,createNodeIterator:Nt,createDocumentFragment:At,getElementsByTagName:ji}=t,{importNode:Fd}=s;let ke=zl();e.isSupported=typeof gd=="function"&&typeof L=="function"&&Re&&Re.createHTMLDocument!==void 0;const{MUSTACHE_EXPR:qr,ERB_EXPR:Gr,TMPLIT_EXPR:Yr,DATA_ATTR:Bd,ARIA_ATTR:Rd,IS_SCRIPT_OR_DATA:zd,ATTR_WHITESPACE:dn,CUSTOM_ELEMENT:Id}=Rl;let{IS_ALLOWED_URI:hn}=Rl,we=null;const pn=V({},[...Dl,...So,...xo,...Co,...Ll]);let Se=null;const un=V({},[...Fl,..._o,...Bl,...Qs]);let de=Object.seal(vd(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Wi=null,Qr=null,fn=!0,Kr=!0,mn=!1,gn=!0,ui=!1,Xr=!0,Ut=!1,Zr=!1,Jr=!1,fi=!1,Is=!1,Ns=!1,vn=!0,bn=!1;const Nd="user-content-";let eo=!0,qi=!1,mi={},gi=null;const yn=V({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]);let wn=null;const $n=V({},["audio","video","img","source","image","track"]);let to=null;const Sn=V({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),Us="http://www.w3.org/1998/Math/MathML",Hs="http://www.w3.org/2000/svg",yt="http://www.w3.org/1999/xhtml";let vi=yt,io=!1,so=null;const Ud=V({},[Us,Hs,yt],$o);let Vs=V({},["mi","mo","mn","ms","mtext"]),js=V({},["annotation-xml"]);const Hd=V({},["title","style","font","a","script"]);let Gi=null;const Vd=["application/xhtml+xml","text/html"],jd="text/html";let $e=null,bi=null;const Wd=t.createElement("form"),xn=function(m){return m instanceof RegExp||m instanceof Function},ro=function(){let m=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(bi&&bi===m)){if((!m||typeof m!="object")&&(m={}),m=Qt(m),Gi=Vd.indexOf(m.PARSER_MEDIA_TYPE)===-1?jd:m.PARSER_MEDIA_TYPE,$e=Gi==="application/xhtml+xml"?$o:rr,we=Ze(m,"ALLOWED_TAGS")?V({},m.ALLOWED_TAGS,$e):pn,Se=Ze(m,"ALLOWED_ATTR")?V({},m.ALLOWED_ATTR,$e):un,so=Ze(m,"ALLOWED_NAMESPACES")?V({},m.ALLOWED_NAMESPACES,$o):Ud,to=Ze(m,"ADD_URI_SAFE_ATTR")?V(Qt(Sn),m.ADD_URI_SAFE_ATTR,$e):Sn,wn=Ze(m,"ADD_DATA_URI_TAGS")?V(Qt($n),m.ADD_DATA_URI_TAGS,$e):$n,gi=Ze(m,"FORBID_CONTENTS")?V({},m.FORBID_CONTENTS,$e):yn,Wi=Ze(m,"FORBID_TAGS")?V({},m.FORBID_TAGS,$e):{},Qr=Ze(m,"FORBID_ATTR")?V({},m.FORBID_ATTR,$e):{},mi=Ze(m,"USE_PROFILES")?m.USE_PROFILES:!1,fn=m.ALLOW_ARIA_ATTR!==!1,Kr=m.ALLOW_DATA_ATTR!==!1,mn=m.ALLOW_UNKNOWN_PROTOCOLS||!1,gn=m.ALLOW_SELF_CLOSE_IN_ATTR!==!1,ui=m.SAFE_FOR_TEMPLATES||!1,Xr=m.SAFE_FOR_XML!==!1,Ut=m.WHOLE_DOCUMENT||!1,fi=m.RETURN_DOM||!1,Is=m.RETURN_DOM_FRAGMENT||!1,Ns=m.RETURN_TRUSTED_TYPE||!1,Jr=m.FORCE_BODY||!1,vn=m.SANITIZE_DOM!==!1,bn=m.SANITIZE_NAMED_PROPS||!1,eo=m.KEEP_CONTENT!==!1,qi=m.IN_PLACE||!1,hn=m.ALLOWED_URI_REGEXP||bd,vi=m.NAMESPACE||yt,Vs=m.MATHML_TEXT_INTEGRATION_POINTS||Vs,js=m.HTML_INTEGRATION_POINTS||js,de=m.CUSTOM_ELEMENT_HANDLING||{},m.CUSTOM_ELEMENT_HANDLING&&xn(m.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(de.tagNameCheck=m.CUSTOM_ELEMENT_HANDLING.tagNameCheck),m.CUSTOM_ELEMENT_HANDLING&&xn(m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(de.attributeNameCheck=m.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),m.CUSTOM_ELEMENT_HANDLING&&typeof m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(de.allowCustomizedBuiltInElements=m.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),ui&&(Kr=!1),Is&&(fi=!0),mi&&(we=V({},Ll),Se=[],mi.html===!0&&(V(we,Dl),V(Se,Fl)),mi.svg===!0&&(V(we,So),V(Se,_o),V(Se,Qs)),mi.svgFilters===!0&&(V(we,xo),V(Se,_o),V(Se,Qs)),mi.mathMl===!0&&(V(we,Co),V(Se,Bl),V(Se,Qs))),m.ADD_TAGS&&(we===pn&&(we=Qt(we)),V(we,m.ADD_TAGS,$e)),m.ADD_ATTR&&(Se===un&&(Se=Qt(Se)),V(Se,m.ADD_ATTR,$e)),m.ADD_URI_SAFE_ATTR&&V(to,m.ADD_URI_SAFE_ATTR,$e),m.FORBID_CONTENTS&&(gi===yn&&(gi=Qt(gi)),V(gi,m.FORBID_CONTENTS,$e)),eo&&(we["#text"]=!0),Ut&&V(we,["html","head","body"]),we.table&&(V(we,["tbody"]),delete Wi.tbody),m.TRUSTED_TYPES_POLICY){if(typeof m.TRUSTED_TYPES_POLICY.createHTML!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');if(typeof m.TRUSTED_TYPES_POLICY.createScriptURL!="function")throw ss('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');N=m.TRUSTED_TYPES_POLICY,se=N.createHTML("")}else N===void 0&&(N=j0(y,r)),N!==null&&typeof se=="string"&&(se=N.createHTML(""));Pe&&Pe(m),bi=m}},Cn=V({},[...So,...xo,...D0]),_n=V({},[...Co,...L0]),qd=function(m){let C=L(m);(!C||!C.tagName)&&(C={namespaceURI:vi,tagName:"template"});const D=rr(m.tagName),re=rr(C.tagName);return so[m.namespaceURI]?m.namespaceURI===Hs?C.namespaceURI===yt?D==="svg":C.namespaceURI===Us?D==="svg"&&(re==="annotation-xml"||Vs[re]):!!Cn[D]:m.namespaceURI===Us?C.namespaceURI===yt?D==="math":C.namespaceURI===Hs?D==="math"&&js[re]:!!_n[D]:m.namespaceURI===yt?C.namespaceURI===Hs&&!js[re]||C.namespaceURI===Us&&!Vs[re]?!1:!_n[D]&&(Hd[D]||!Cn[D]):!!(Gi==="application/xhtml+xml"&&so[m.namespaceURI]):!1},ht=function(m){ts(e.removed,{element:m});try{L(m).removeChild(m)}catch{O(m)}},Ws=function(m,C){try{ts(e.removed,{attribute:C.getAttributeNode(m),from:C})}catch{ts(e.removed,{attribute:null,from:C})}if(C.removeAttribute(m),m==="is")if(fi||Is)try{ht(C)}catch{}else try{C.setAttribute(m,"")}catch{}},Tn=function(m){let C=null,D=null;if(Jr)m="<remove></remove>"+m;else{const xe=Ol(m,/^[\r\n\t ]+/);D=xe&&xe[0]}Gi==="application/xhtml+xml"&&vi===yt&&(m='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+m+"</body></html>");const re=N?N.createHTML(m):m;if(vi===yt)try{C=new g().parseFromString(re,Gi)}catch{}if(!C||!C.documentElement){C=Re.createDocument(vi,"template",null);try{C.documentElement.innerHTML=io?se:re}catch{}}const _e=C.body||C.documentElement;return m&&D&&_e.insertBefore(t.createTextNode(D),_e.childNodes[0]||null),vi===yt?ji.call(C,Ut?"html":"body")[0]:Ut?C.documentElement:_e},kn=function(m){return Nt.call(m.ownerDocument||m,m,h.SHOW_ELEMENT|h.SHOW_COMMENT|h.SHOW_TEXT|h.SHOW_PROCESSING_INSTRUCTION|h.SHOW_CDATA_SECTION,null)},oo=function(m){return m instanceof f&&(typeof m.nodeName!="string"||typeof m.textContent!="string"||typeof m.removeChild!="function"||!(m.attributes instanceof u)||typeof m.removeAttribute!="function"||typeof m.setAttribute!="function"||typeof m.namespaceURI!="string"||typeof m.insertBefore!="function"||typeof m.hasChildNodes!="function")},En=function(m){return typeof n=="function"&&m instanceof n};function wt(F,m,C){Ys(F,D=>{D.call(e,m,C,bi)})}const An=function(m){let C=null;if(wt(ke.beforeSanitizeElements,m,null),oo(m))return ht(m),!0;const D=$e(m.nodeName);if(wt(ke.uponSanitizeElement,m,{tagName:D,allowedTags:we}),m.hasChildNodes()&&!En(m.firstElementChild)&&Ae(/<[/\w]/g,m.innerHTML)&&Ae(/<[/\w]/g,m.textContent)||m.nodeType===os.progressingInstruction||Xr&&m.nodeType===os.comment&&Ae(/<[/\w]/g,m.data))return ht(m),!0;if(!we[D]||Wi[D]){if(!Wi[D]&&Pn(D)&&(de.tagNameCheck instanceof RegExp&&Ae(de.tagNameCheck,D)||de.tagNameCheck instanceof Function&&de.tagNameCheck(D)))return!1;if(eo&&!gi[D]){const re=L(m)||m.parentNode,_e=P(m)||m.childNodes;if(_e&&re){const xe=_e.length;for(let ze=xe-1;ze>=0;--ze){const pt=_(_e[ze],!0);pt.__removalCount=(m.__removalCount||0)+1,re.insertBefore(pt,z(m))}}}return ht(m),!0}return m instanceof l&&!qd(m)||(D==="noscript"||D==="noembed"||D==="noframes")&&Ae(/<\/no(script|embed|frames)/i,m.innerHTML)?(ht(m),!0):(ui&&m.nodeType===os.text&&(C=m.textContent,Ys([qr,Gr,Yr],re=>{C=is(C,re," ")}),m.textContent!==C&&(ts(e.removed,{element:m.cloneNode()}),m.textContent=C)),wt(ke.afterSanitizeElements,m,null),!1)},Mn=function(m,C,D){if(vn&&(C==="id"||C==="name")&&(D in t||D in Wd))return!1;if(!(Kr&&!Qr[C]&&Ae(Bd,C))){if(!(fn&&Ae(Rd,C))){if(!Se[C]||Qr[C]){if(!(Pn(m)&&(de.tagNameCheck instanceof RegExp&&Ae(de.tagNameCheck,m)||de.tagNameCheck instanceof Function&&de.tagNameCheck(m))&&(de.attributeNameCheck instanceof RegExp&&Ae(de.attributeNameCheck,C)||de.attributeNameCheck instanceof Function&&de.attributeNameCheck(C))||C==="is"&&de.allowCustomizedBuiltInElements&&(de.tagNameCheck instanceof RegExp&&Ae(de.tagNameCheck,D)||de.tagNameCheck instanceof Function&&de.tagNameCheck(D))))return!1}else if(!to[C]){if(!Ae(hn,is(D,dn,""))){if(!((C==="src"||C==="xlink:href"||C==="href")&&m!=="script"&&A0(D,"data:")===0&&wn[m])){if(!(mn&&!Ae(zd,is(D,dn,"")))){if(D)return!1}}}}}}return!0},Pn=function(m){return m!=="annotation-xml"&&Ol(m,Id)},On=function(m){wt(ke.beforeSanitizeAttributes,m,null);const{attributes:C}=m;if(!C||oo(m))return;const D={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:Se,forceKeepAttr:void 0};let re=C.length;for(;re--;){const _e=C[re],{name:xe,namespaceURI:ze,value:pt}=_e,Yi=$e(xe);let Ee=xe==="value"?pt:M0(pt);if(D.attrName=Yi,D.attrValue=Ee,D.keepAttr=!0,D.forceKeepAttr=void 0,wt(ke.uponSanitizeAttribute,m,D),Ee=D.attrValue,bn&&(Yi==="id"||Yi==="name")&&(Ws(xe,m),Ee=Nd+Ee),Xr&&Ae(/((--!?|])>)|<\/(style|title)/i,Ee)){Ws(xe,m);continue}if(D.forceKeepAttr||(Ws(xe,m),!D.keepAttr))continue;if(!gn&&Ae(/\/>/i,Ee)){Ws(xe,m);continue}ui&&Ys([qr,Gr,Yr],Ln=>{Ee=is(Ee,Ln," ")});const Dn=$e(m.nodeName);if(Mn(Dn,Yi,Ee)){if(N&&typeof y=="object"&&typeof y.getAttributeType=="function"&&!ze)switch(y.getAttributeType(Dn,Yi)){case"TrustedHTML":{Ee=N.createHTML(Ee);break}case"TrustedScriptURL":{Ee=N.createScriptURL(Ee);break}}try{ze?m.setAttributeNS(ze,xe,Ee):m.setAttribute(xe,Ee),oo(m)?ht(m):Pl(e.removed)}catch{}}}wt(ke.afterSanitizeAttributes,m,null)},Gd=function F(m){let C=null;const D=kn(m);for(wt(ke.beforeSanitizeShadowDOM,m,null);C=D.nextNode();)wt(ke.uponSanitizeShadowNode,C,null),An(C),On(C),C.content instanceof o&&F(C.content);wt(ke.afterSanitizeShadowDOM,m,null)};return e.sanitize=function(F){let m=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},C=null,D=null,re=null,_e=null;if(io=!F,io&&(F="<!-->"),typeof F!="string"&&!En(F))if(typeof F.toString=="function"){if(F=F.toString(),typeof F!="string")throw ss("dirty is not a string, aborting")}else throw ss("toString is not a function");if(!e.isSupported)return F;if(Zr||ro(m),e.removed=[],typeof F=="string"&&(qi=!1),qi){if(F.nodeName){const pt=$e(F.nodeName);if(!we[pt]||Wi[pt])throw ss("root node is forbidden and cannot be sanitized in-place")}}else if(F instanceof n)C=Tn("<!---->"),D=C.ownerDocument.importNode(F,!0),D.nodeType===os.element&&D.nodeName==="BODY"||D.nodeName==="HTML"?C=D:C.appendChild(D);else{if(!fi&&!ui&&!Ut&&F.indexOf("<")===-1)return N&&Ns?N.createHTML(F):F;if(C=Tn(F),!C)return fi?null:Ns?se:""}C&&Jr&&ht(C.firstChild);const xe=kn(qi?F:C);for(;re=xe.nextNode();)An(re),On(re),re.content instanceof o&&Gd(re.content);if(qi)return F;if(fi){if(Is)for(_e=At.call(C.ownerDocument);C.firstChild;)_e.appendChild(C.firstChild);else _e=C;return(Se.shadowroot||Se.shadowrootmode)&&(_e=Fd.call(s,_e,!0)),_e}let ze=Ut?C.outerHTML:C.innerHTML;return Ut&&we["!doctype"]&&C.ownerDocument&&C.ownerDocument.doctype&&C.ownerDocument.doctype.name&&Ae(yd,C.ownerDocument.doctype.name)&&(ze="<!DOCTYPE "+C.ownerDocument.doctype.name+`>
`+ze),ui&&Ys([qr,Gr,Yr],pt=>{ze=is(ze,pt," ")}),N&&Ns?N.createHTML(ze):ze},e.setConfig=function(){let F=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};ro(F),Zr=!0},e.clearConfig=function(){bi=null,Zr=!1},e.isValidAttribute=function(F,m,C){bi||ro({});const D=$e(F),re=$e(m);return Mn(D,re,C)},e.addHook=function(F,m){typeof m=="function"&&ts(ke[F],m)},e.removeHook=function(F,m){if(m!==void 0){const C=k0(ke[F],m);return C===-1?void 0:E0(ke[F],C,1)[0]}return Pl(ke[F])},e.removeHooks=function(F){ke[F]=[]},e.removeAllHooks=function(){ke=zl()},e}var or=wd(),W0=Object.defineProperty,q0=Object.getOwnPropertyDescriptor,sn=(i,e,t,s)=>{for(var r=s>1?void 0:s?q0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&W0(e,t,r),r};let Cr=class extends fe{constructor(){super(...arguments),this.collectionLinks=[]}render(){return p`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize==="mobile"?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){return p`
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
    `}get desktopTemplate(){return p`
      <div id="list-line-left">${this.imageBlockTemplate}</div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `}get imageBlockTemplate(){if(!this.model)return v;const i=this.model.mediatype==="collection",e=this.displayValueProvider.itemPageUrl(this.model.identifier,i);return p`<a
      id="image-link"
      title=${x(ft`View ${this.model?.title}`)}
      href=${e}
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
    </a> `}get detailsTemplate(){return p`
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
    `}get iconRightTemplate(){return p`
      <a
        id="icon-right"
        href=${this.mediatypeURL}
        title=${x(ft`See more: ${this.model?.mediatype}`)}
      >
        <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
      </a>
    `}get titleTemplate(){return this.model?.title?this.model?.href?p`<a href="${this.baseNavigationUrl}${this.model.href}"
          >${this.model.title??this.model.identifier}</a
        >`:this.detailsLink(this.model.identifier,this.model.title,this.model.mediatype==="collection"):v}get itemLineTemplate(){const i=this.sourceTemplate,e=this.volumeTemplate,t=this.issueTemplate;return!i&&!e&&!t?v:p` <div id="item-line">${i} ${e} ${t}</div> `}get sourceTemplate(){return this.model?.source?p`
      <div id="source" class="metadata">
        ${this.labelTemplate(x("Source"))}
        ${this.searchLink("source",this.model.source)}
      </div>
    `:v}get volumeTemplate(){return this.metadataTemplate(this.model?.volume,x("Volume"))}get issueTemplate(){return this.metadataTemplate(this.model?.issue,x("Issue"))}get creatorTemplate(){return this.model?.mediatype==="account"?p`
        <div id="creator" class="metadata">
          <span class="label"
            >${this.displayValueProvider.accountLabel??v}</span
          >
        </div>
      `:!this.model?.creators||this.model.creators.length===0?v:p`
      <div id="creator" class="metadata">
        ${this.labelTemplate(x("By"))}
        ${ir(si(this.model.creators,i=>this.searchLink("creator",i)),", ")}
      </div>
    `}get datePublishedTemplate(){const i=this.model?.datePublished;let e="long";return Za(i)&&(e="year-only"),this.metadataTemplate(this.getFormattedDate(i,e),x("Published"))}get dateSortByTemplate(){return this.effectiveSort&&(this.effectiveSort.field==="addeddate"||this.effectiveSort.field==="reviewdate"||this.effectiveSort.field==="publicdate")?this.metadataTemplate(this.getFormattedDate(this.date,"long"),this.displayValueProvider.dateLabel):v}get viewsTemplate(){const i=this.effectiveSort?.field==="week"?this.model?.weeklyViewCount:this.model?.viewCount;return i==null?v:this.model?.mediatype==="search"?this.metadataTemplate("(Favorited search query)",""):this.metadataTemplate(`${tn(i,this.formatSize)}`,x("Views"))}get ratingTemplate(){return this.metadataTemplate(this.model?.averageRating,x("Avg Rating"))}get reviewsTemplate(){return this.metadataTemplate(this.model?.commentCount,x("Reviews"))}get topicsTemplate(){return!this.model?.subjects||this.model.subjects.length===0?v:p`
      <div id="topics" class="metadata">
        ${this.labelTemplate(x("Topics"))}
        ${ir(si(this.model.subjects,i=>this.searchLink("subject",i)),", ")}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?v:p`
      <div id="collections" class="metadata">
        ${this.labelTemplate(x("Collections"))}
        ${ir(this.collectionLinks,", ")}
      </div>
    `}get descriptionTemplate(){return this.metadataTemplate(x0(or.sanitize(this.model?.description?.replace(/\n/g," ")??"")),"","description")}get reviewBlockTemplate(){if(!this.model?.review)return v;const{reviewtitle:i,reviewbody:e,stars:t}=this.model.review;return p`
      <review-block
        viewsize="list"
        title=${Ie(i)}
        body=${Ie(e)}
        starRating=${Ie(t)}
      >
      </review-block>
    `}get textSnippetsTemplate(){return this.hasSnippets?p`<text-snippet-block
      viewsize="list"
      .snippets=${this.model?.snippets}
    ></text-snippet-block>`:v}get hasSnippets(){return!!this.model?.snippets?.length}get webArchivesCaptureDatesTemplate(){return!this.model?.captureDates||!this.model.title?v:p`
      <ul class="capture-dates">
        ${si(this.model.captureDates,i=>p`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,i)}
            </li>`)}
      </ul>
    `}metadataTemplate(i,e="",t){return i?p`
      <div id=${Ie(t)} class="metadata">
        ${this.labelTemplate(e)} ${i}
      </div>
    `:v}labelTemplate(i){return p` ${i?p`<span class="label">${i}: </span>`:v}`}searchLink(i,e){if(!i||!e)return v;const t=encodeURIComponent(`${i}:"${e}"`);return p`<a
      href="${this.baseNavigationUrl}/search?query=${t}"
      rel="nofollow"
    >
      ${or.sanitize(e)}</a
    >`}detailsLink(i,e,t=!1){if(!i)return v;const s=e??i,r=this.displayValueProvider.itemPageUrl(i,t);return p`<a href=${r}> ${or.sanitize(s)} </a>`}get mediatypeURL(){if(this.baseNavigationUrl===void 0||!this.model?.mediatype)return v;switch(this.model.mediatype){case"collection":return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case"account":return v;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(i){(i.has("model")||i.has("collectionTitles"))&&this.buildCollectionLinks()}async buildCollectionLinks(){if(!this.model?.collections||this.model.collections.length===0)return;this.collectionLinks=[];const i=[];for(const e of this.model.collections)!Nr[e]&&!e.startsWith("fav-")&&i.push(this.detailsLink(e,this.collectionTitles?.get(e)??e,!0));this.collectionLinks=i}get date(){switch(this.effectiveSort?.field){case"date":return this.model?.datePublished;case"reviewdate":return this.model?.dateReviewed;case"addeddate":return this.model?.dateAdded;default:return this.model?.dateArchived}}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}static get styles(){return S`
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
    `}};sn([d({type:Object})],Cr.prototype,"collectionTitles",2);sn([R()],Cr.prototype,"collectionLinks",2);Cr=sn([U("tile-list")],Cr);var G0=Object.defineProperty,Y0=Object.getOwnPropertyDescriptor,bt=(i,e,t,s)=>{for(var r=s>1?void 0:s?Y0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&G0(e,t,r),r};let nt=class extends H{constructor(){super(...arguments),this.loggedIn=!1,this.suppressBlurring=!1}render(){return p`
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
    `}get headerTemplate(){if(this.model?.collections?.length===0)return v;let i="",e="";for(const t of this.model?.collections||[])if(!Nr[t]&&!t.startsWith("fav-")){i=this.collectionTitles?.get(t)??t,e=t;break}return e?p`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${e}">
          <img
            src="${this.baseImageUrl}/services/img/${e}"
            alt=""
          /><span>${i}</span>
        </a>
      </div>
    `:v}static get styles(){const i=S`var(--hoverPaneHeaderBGColor, #edf0ff)`,e=S`var(--ia-theme-link-color, #4b64ff)`,t=S`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;return S`
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
        background: ${i};
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
        color: ${e};
        font-family: ${t};
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
    `}};bt([d({type:Object})],nt.prototype,"model",2);bt([d({type:String})],nt.prototype,"baseNavigationUrl",2);bt([d({type:String})],nt.prototype,"baseImageUrl",2);bt([d({type:Boolean})],nt.prototype,"loggedIn",2);bt([d({type:Boolean})],nt.prototype,"suppressBlurring",2);bt([d({type:Object})],nt.prototype,"sortParam",2);bt([d({type:Number})],nt.prototype,"mobileBreakpoint",2);bt([d({type:Number})],nt.prototype,"currentWidth",2);bt([d({type:Object})],nt.prototype,"collectionTitles",2);nt=bt([U("tile-hover-pane")],nt);var Q0=Object.getOwnPropertyDescriptor,K0=(i,e,t,s)=>{for(var r=s>1?void 0:s?Q0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(r)||r);return r};let Il=class extends fe{render(){return p`
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
          >${or.sanitize(this.model?.title??"")}</a
        >
        <div id="creator">
          ${this.model?.mediatype==="account"?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">
          ${this.getFormattedDate(this.date,this.dateFormatSize)}
        </div>
        <div id="icon">
          <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
        </div>
        <div id="views">${tn(this.views??0,this.formatSize)}</div>
      </div>
    `}get href(){return!this.model?.identifier||this.baseNavigationUrl==null?v:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get creator(){return this.displayValueProvider.firstCreatorMatchingFilter??v}get date(){switch(this.effectiveSort?.field){case"publicdate":return this.model?.dateArchived;case"reviewdate":return this.model?.dateReviewed;case"addeddate":return this.model?.dateAdded;default:return this.model?.datePublished}}get views(){return this.effectiveSort?.field==="week"?this.model?.weeklyViewCount:this.model?.viewCount}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}get dateFormatSize(){return(!this.isSortedByDate||this.effectiveSort?.field==="date")&&Za(this.model?.datePublished)?"year-only":this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"short":"long"}get isSortedByDate(){return["date","reviewdate","addeddate","publicdate"].includes(this.effectiveSort?.field)}static get styles(){return S`
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
    `}};Il=K0([U("tile-list-compact")],Il);var X0=Object.getOwnPropertyDescriptor,Z0=(i,e,t,s)=>{for(var r=s>1?void 0:s?X0(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(r)||r);return r};let Nl=class extends fe{render(){return p`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${x("Title")}</div>
        <div id="creator">${x("Creator")}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel||x("Published")}
        </div>
        <div id="icon">${x("Type")}</div>
        <div id="views">${x("Views")}</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?"mobile":"desktop"}static get styles(){return S`
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
    `}};Nl=Z0([U("tile-list-compact-header")],Nl);const Ul=(i,e=-1/0,t=1/0)=>Math.max(e,Math.min(i,t));class J0{constructor(e,t={}){this.host=e,this.mobileBreakpoint=600,this.offsetX=-10,this.offsetY=15,this.showDelay=300,this.hideDelay=100,this.longPressDelay=600,this.enableLongPress=!1,this.hoverPaneState="hidden",this.forceTouchBackdrop=!1,this.lastPointerClientPos={x:0,y:0},this.clicking=!1,this.handleFocus=()=>{!this.clicking&&this.hoverPaneState==="hidden"&&this.showHoverPane({anchor:"host"}),this.clicking=!1},this.handleBlur=()=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane()},this.handlePointerDown=()=>{this.clicking=!0},this.handleKeyDown=s=>{(s.key==="ArrowDown"||s.key==="ArrowUp")&&this.hoverPaneState!=="hidden"&&s.preventDefault()},this.handleKeyUp=s=>{if(this.hoverPaneState==="hidden"||!this.hoverPane)return;s.key==="ArrowDown"&&(this.hoverPane.tabIndex=1,this.hoverPane.focus());const r=s.key==="ArrowUp",o=s.key==="Escape"||s.key==="Esc";o&&this.fadeOutHoverPane(),(r||o)&&(this.hoverPane.tabIndex=-1,this.host.acquireFocus())},this.handleMouseEnter=s=>{this.handleMouseMove(s)},this.handleMouseMove=s=>{clearTimeout(this.hideTimer),this.hoverPaneState==="fading-out"&&(this.hoverPaneState="shown",this.hoverPane?.classList.add("fade-in")),this.hoverPaneState==="hidden"&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:s.clientX,y:s.clientY})},this.handleMouseLeave=()=>{this.host.releaseFocus(),clearTimeout(this.showTimer),this.hoverPaneState!=="hidden"&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))},this.handleTouchStart=s=>{clearTimeout(this.longPressTimer),s.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState==="hidden"&&this.showHoverPane()},this.longPressDelay),this.lastPointerClientPos={x:s.touches[0].clientX,y:s.touches[0].clientY})},this.handleLongPressCancel=()=>{clearTimeout(this.longPressTimer)},this.handleContextMenu=s=>{s.preventDefault()},this.handleBackdropInteraction=s=>{this.hoverPaneState!=="hidden"&&this.fadeOutHoverPane(),s.stopPropagation()},this.mobileBreakpoint=t.mobileBreakpoint??this.mobileBreakpoint,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.showDelay=t.showDelay??this.showDelay,this.hideDelay=t.hideDelay??this.hideDelay,this.longPressDelay=t.longPressDelay??this.longPressDelay,this.enableLongPress=t.enableLongPress??this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){return this.hoverPaneProps=this.host.getHoverPaneProps(),this.shouldRenderHoverPane?p`
          ${this.touchBackdropTemplate}
          <tile-hover-pane
            popover
            tabindex="-1"
            aria-describedby="tile-hover-pane-aria-description"
            .model=${this.hoverPaneProps?.model}
            .baseNavigationUrl=${this.hoverPaneProps?.baseNavigationUrl}
            .baseImageUrl=${this.hoverPaneProps?.baseImageUrl}
            .loggedIn=${this.hoverPaneProps?.loggedIn}
            .suppressBlurring=${this.hoverPaneProps?.suppressBlurring}
            .sortParam=${this.hoverPaneProps?.sortParam}
            .collectionTitles=${this.hoverPaneProps?.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${window.innerWidth}
          ></tile-hover-pane>
          <div id="tile-hover-pane-aria-description" class="sr-only">
            ${x("Press Up Arrow to exit item detail preview")}
          </div>
        `:v}toggleHoverPane(e){this.hoverPaneState==="shown"?(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1):(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=e.enableTouchBackdrop??!1,this.showHoverPane())}get touchBackdropTemplate(){return this.showTouchBackdrop?p`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:v}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}get isTouchEnabled(){return"ontouchstart"in window&&window.matchMedia("(any-pointer: coarse)").matches}get shouldRenderHoverPane(){return this.hoverPaneState!=="hidden"}makePaneDesiredOffsets(e){let[t,s]=[0,0];switch(e){case"host":const n=this.host.getBoundingClientRect();t=n.left+20,s=n.top+30;break;case"cursor":t=this.lastPointerClientPos.x,s=this.lastPointerClientPos.y;break}const r=t>window.innerWidth/2,o=s>window.innerHeight/2,a=this.hoverPane?.getBoundingClientRect();return a&&(r&&(t-=a.width),o&&(s-=a.height),t+=(r?-1:1)*this.offsetX,s+=(o?-1:1)*this.offsetY,this.isMobileView&&(t=Ul(t,20,window.innerWidth-a.width-20),s=Ul(s,20,window.innerHeight-a.height-20))),t+=window.scrollX,s+=window.scrollY,{left:t,top:s}}attachListeners(){this.host.addEventListener("focus",this.handleFocus),this.host.addEventListener("blur",this.handleBlur),this.host.addEventListener("pointerdown",this.handlePointerDown),this.host.addEventListener("keyup",this.handleKeyUp),this.host.addEventListener("keydown",this.handleKeyDown),this.isHoverEnabled&&(this.host.addEventListener("mouseenter",this.handleMouseEnter),this.host.addEventListener("mousemove",this.handleMouseMove),this.host.addEventListener("mouseleave",this.handleMouseLeave)),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener("touchstart",this.handleTouchStart),this.host.addEventListener("touchmove",this.handleLongPressCancel),this.host.addEventListener("touchend",this.handleLongPressCancel),this.host.addEventListener("touchcancel",this.handleLongPressCancel),this.host.addEventListener("contextmenu",this.handleContextMenu))}detachListeners(){this.host.removeEventListener("mouseenter",this.handleMouseEnter),this.host.removeEventListener("mousemove",this.handleMouseMove),this.host.removeEventListener("mouseleave",this.handleMouseLeave),this.host.removeEventListener("touchstart",this.handleTouchStart),this.host.removeEventListener("touchmove",this.handleLongPressCancel),this.host.removeEventListener("touchend",this.handleLongPressCancel),this.host.removeEventListener("touchcancel",this.handleLongPressCancel),this.host.removeEventListener("contextmenu",this.handleContextMenu),this.host.removeEventListener("focus",this.handleFocus),this.host.removeEventListener("blur",this.handleBlur),this.host.removeEventListener("keyup",this.handleKeyUp),this.host.removeEventListener("keydown",this.handleKeyDown)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.host.acquireFocus(),this.showHoverPane()},this.showDelay)}async showHoverPane(e={anchor:"cursor"}){this.hoverPaneState="shown",this.host.requestUpdate(),await this.host.updateComplete,this.hoverPane?.isConnected&&(this.hoverPane?.showPopover?.(),await new Promise(t=>{requestAnimationFrame(t)}),this.repositionHoverPane(e.anchor),this.hoverPane?.classList.add("visible","fade-in"))}fadeOutHoverPane(){this.hoverPaneState="fading-out",this.hoverPane?.classList.remove("fade-in"),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState="hidden",this.hoverPane&&(this.hoverPane.tabIndex=-1),this.host.requestUpdate()},100)}repositionHoverPane(e){if(!this.hoverPane)return;const{top:t,left:s}=this.makePaneDesiredOffsets(e);this.hoverPane.style.top=`${t}px`,this.hoverPane.style.left=`${s}px`}}var eu=Object.defineProperty,tu=Object.getOwnPropertyDescriptor,Ke=(i,e,t,s)=>{for(var r=s>1?void 0:s?tu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&eu(e,t,r),r};let De=class extends fe{constructor(){super(...arguments),this.isManageView=!1,this.showTvClips=!1,this.simpleLayoutType="none",this.enableHoverPane=!1,this.manageCheckTitle=x("Remove this item from the list")}acquireFocus(){this.tileLinkElement?.focus()}releaseFocus(){this.tileLinkElement?.blur()}render(){const i=this.tileDisplayMode==="grid",e=this.hoverPaneController?.getTemplate()??v;return p`
      <div id="container" class=${i?"hoverable":""}>
        ${this.tileDisplayMode==="list-header"?this.headerTemplate:this.tileTemplate}
        ${this.manageCheckTemplate} ${e}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new J0(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){const{currentWidth:i,sortParam:e,defaultSortParam:t,mobileBreakpoint:s}=this;return p`
      <tile-list-compact-header
        class="header"
        .currentWidth=${i}
        .sortParam=${e??t}
        .mobileBreakpoint=${s}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return p`
      ${this.tileDisplayMode==="list-detail"?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){return p`
      <a
        href=${this.linkTileHref}
        aria-label=${this.model?.title??"Untitled item"}
        aria-describedby="link-aria-description"
        aria-haspopup=${this.shouldPrepareHoverPane?"dialog":"false"}
        title=${this.shouldPrepareHoverPane?v:Ie(this.model?.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
        class="tile-link"
      >
        ${this.tile}
      </a>
      <div id="link-aria-description" class="sr-only">
        ${x("Press Down Arrow to preview item details")}
      </div>
    `}get linkTileHref(){return!this.model?.identifier||this.baseNavigationUrl==null?v:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype==="collection")}get manageCheckTemplate(){return!this.isManageView||this.tileDisplayMode!=="grid"?v:p`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          ?checked=${this.model?.checked}
          @change=${this.handleLinkClicked}
        />
      </div>
    `}get shouldPrepareHoverPane(){return this.enableHoverPane&&!!this.tileDisplayMode&&De.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]&&this.model?.mediatype!=="search"&&!this.model?.captureDates}get isHoverEnabled(){return window.matchMedia("(hover: hover)").matches}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(i){this.currentWidth=i.contentRect.width,this.currentHeight=i.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(i){i?.removeObserver({handler:this,target:this.container})}startResizeObservation(){this.stopResizeObservation(this.resizeObserver),this.resizeObserver?.addObserver({handler:this,target:this.container})}updated(i){if(i.has("resizeObserver")){const e=i.get("resizeObserver");this.stopResizeObservation(e),this.startResizeObservation()}}handleLinkClicked(i){this.isManageView&&(i.preventDefault(),this.model&&(this.model.checked=!this.model.checked)),this.dispatchEvent(new CustomEvent("resultSelected",{detail:this.model}))}handleLinkContextMenu(i){this.isManageView&&this.linkTileHref!==v&&(i.preventDefault(),window.open(this.linkTileHref,"_blank"))}tileInfoButtonPressed(i){this.hoverPaneController?.toggleHoverPane({coords:i.detail,enableTouchBackdrop:!0})}get tile(){const{model:i,collectionPagePath:e,baseNavigationUrl:t,currentWidth:s,currentHeight:r,sortParam:o,creatorFilter:a,mobileBreakpoint:n,defaultSortParam:l}=this;if(!i)return v;switch(this.tileDisplayMode){case"grid":switch(i.mediatype){case"collection":return p`<collection-tile
              .model=${i}
              .collectionPagePath=${e}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${s}
              .currentHeight=${r}
              .creatorFilter=${a}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;case"account":return p`<account-tile
              .model=${i}
              .collectionPagePath=${e}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${s}
              .currentHeight=${r}
              .creatorFilter=${a}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;case"search":return p`<search-tile
              .model=${i}
              .collectionPagePath=${e}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${s}
              .currentHeight=${r}
              .creatorFilter=${a}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!1}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </search-tile>`;default:return p`<item-tile
              .model=${i}
              .collectionPagePath=${e}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${o}
              .defaultSortParam=${l}
              .creatorFilter=${a}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .simpleLayoutType=${this.simpleLayoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${!this.isHoverEnabled}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case"list-compact":return p`<tile-list-compact
          .model=${i}
          .collectionPagePath=${e}
          .currentWidth=${s}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${o}
          .defaultSortParam=${l}
          .creatorFilter=${a}
          .mobileBreakpoint=${n}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;case"list-detail":return p`<tile-list
          .model=${i}
          .collectionPagePath=${e}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${s}
          .currentHeight=${r}
          .baseNavigationUrl=${t}
          .sortParam=${o}
          .defaultSortParam=${l}
          .creatorFilter=${a}
          .mobileBreakpoint=${n}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list>`;default:return v}}static get styles(){return[ct,S`
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
      `]}};De.HOVER_PANE_DISPLAY_MODES={grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1};Ke([d({type:String})],De.prototype,"tileDisplayMode",2);Ke([d({type:Boolean})],De.prototype,"isManageView",2);Ke([d({type:Object})],De.prototype,"resizeObserver",2);Ke([d({type:Object})],De.prototype,"collectionTitles",2);Ke([d({type:Boolean})],De.prototype,"showTvClips",2);Ke([d({type:String})],De.prototype,"simpleLayoutType",2);Ke([d({type:Boolean})],De.prototype,"enableHoverPane",2);Ke([d({type:String})],De.prototype,"manageCheckTitle",2);Ke([Z("#container")],De.prototype,"container",2);Ke([Z("tile-hover-pane")],De.prototype,"hoverPane",2);Ke([Z(".tile-link")],De.prototype,"tileLinkElement",2);De=Ke([U("tile-dispatcher")],De);var iu=Object.getOwnPropertyDescriptor,su=(i,e,t,s)=>{for(var r=s>1?void 0:s?iu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(r)||r);return r};let Hl=class extends H{render(){return p` <div id="container"></div> `}static get styles(){return S`
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
    `}};Hl=su([U("collection-browser-loading-tile")],Hl);var To,ko;let Ti=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};Ti.finalized=!0,Ti._$litElement$=!0,(To=globalThis.litElementHydrateSupport)===null||To===void 0||To.call(globalThis,{LitElement:Ti});const Vl=globalThis.litElementPolyfillSupport;Vl?.({LitElement:Ti});((ko=globalThis.litElementVersions)!==null&&ko!==void 0?ko:globalThis.litElementVersions=[]).push("3.3.3");function yi(i,e,t){return i?e():t?.()}const ru=ii`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,ou=ii`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`;let pe=class extends Ti{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption="",this.options=[],this.optionGroup="options",this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case"Escape":case"Esc":this.closeOptions();break}},this.closeOptions=e=>{e&&e.type==="click"&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener("closeDropdown",this.closeOptions)}willUpdate(e){e.has("open")&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)===null||e===void 0||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener("keydown",this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener("keydown",this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),"open"):(this.removeKeyboardListener(),"closed")}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)===null||e===void 0?void 0:e.togglePopover)===null||t===void 0||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;const e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])===null||e===void 0||e.click()}mainButtonKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key==="Enter"||e.key===" ")&&(this.toggleOptions(),e.preventDefault())}renderOption(e){const{label:t,url:s=void 0,id:r}=e;let o;const a=this.selectedOption===r?"selected":"";return s?o=M`<a
        href=${s}
        @click=${n=>this.optionClicked(n,e)}
        >${t}</a
      >`:o=M`<button
        @click=${n=>this.optionClicked(n,e)}
      >
        ${t}
      </button>`,M`<li role="menuitem" class=${a}>${o}</li>`}optionClicked(e,t){var s;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent("optionSelected",{detail:{option:t}})),(s=t.selectedHandler)===null||s===void 0||s.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return M`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${ru}</slot>
      </span>
    `}get caretDownTemplate(){return M`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${ou}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?M`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:M`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${yi(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${yi(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:M``}get dropdownTemplate(){return this.isCustomList?M`<slot name="list"></slot>`:M`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return this.closeOnBackdropClick?this.open?M`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `:M``:M``}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return M`
      <div class="ia-dropdown-group">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${yi(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${yi(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${yi(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${yi(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){const e=b`var(--dropdownBorderWidth, 1px)`,t=b`var(--dropdownBorderRadius, 4px)`,s=b`var(--dropdownBorderColor, #fff)`,r=b`var(--dropdownBgColor, #333)`,o=b`var(--dropdownTextColor, #fff)`,a=b`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,n=b`var(--dropdownSelectedBgColor, #fff)`;return b`
      :host {
        display: inline;
        color: ${o};
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
        color: ${o};
        background: ${r};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e});
        border-right: var(--dropdownBorderRightWidth, ${e});
        border-bottom: var(--dropdownBorderBottomWidth, ${e});
        border-left: var(--dropdownBorderLeftWidth, ${e});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${s};

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
        border-bottom-color: ${n};
      }

      #dropdown-main li.selected:first-child {
        border-top-color: ${n};
      }

      #dropdown-main li:hover > *,
      #dropdown-main li:focus-within > * {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
      }

      #dropdown-main li.selected > * {
        background-color: ${n};
        color: var(--dropdownSelectedTextColor, #2c2c2c);
      }

      #dropdown-main li {
        background: ${r};
        list-style: none;
        height: 30px;
        cursor: pointer;
        border-bottom: 0.5px solid ${r};
        border-top: 0.5px solid ${r};
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
        color: ${o};
        background: transparent;
        padding: 0;
      }
    `}};c([T({type:Boolean,reflect:!0})],pe.prototype,"open",void 0);c([T({type:Boolean,reflect:!0})],pe.prototype,"isDisabled",void 0);c([T({type:Boolean})],pe.prototype,"displayCaret",void 0);c([T({type:Boolean})],pe.prototype,"closeOnSelect",void 0);c([T({type:Boolean})],pe.prototype,"openViaButton",void 0);c([T({type:Boolean})],pe.prototype,"usePopover",void 0);c([T({type:Boolean})],pe.prototype,"includeSelectedOption",void 0);c([T({type:String})],pe.prototype,"selectedOption",void 0);c([T({attribute:!1})],pe.prototype,"options",void 0);c([T({type:String})],pe.prototype,"optionGroup",void 0);c([T({attribute:!1})],pe.prototype,"optionSelected",void 0);c([T({type:Boolean,reflect:!0})],pe.prototype,"isCustomList",void 0);c([T({type:Boolean,reflect:!0})],pe.prototype,"hasCustomClickHandler",void 0);c([T({type:Boolean,reflect:!0})],pe.prototype,"closeOnEscape",void 0);c([T({type:Boolean,reflect:!0})],pe.prototype,"closeOnBackdropClick",void 0);c([Be(".ia-dropdown-group")],pe.prototype,"container",void 0);c([Be("#dropdown-main")],pe.prototype,"dropdownMenu",void 0);c([Be(".click-main")],pe.prototype,"mainButton",void 0);c([Hc({slot:"dropdown-label"})],pe.prototype,"mainButtonLabelSlotted",void 0);pe=c([Qe("ia-dropdown")],pe);let $a=class extends Ti{render(){return M`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};$a.styles=b`
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
  `;$a=c([Qe("ia-icon-label")],$a);var au=Object.defineProperty,nu=Object.getOwnPropertyDescriptor,$d=(i,e,t,s)=>{for(var r=s>1?void 0:s?nu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&au(e,t,r),r};let Sa=class extends H{constructor(){super(...arguments),this.numResults=0}render(){return p`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?"result":"results"}
        </div>
      </div>
    `}static get styles(){const i=S`var(--tooltipArrowSize, 5px)`,e=S`var(--tooltipArrowOffset, 0px)`;return S`
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${e});
        top: 0;
        width: 0;
        height: 0;
        margin-top: calc(-1 * ${i});
        margin-left: calc(-1 * ${i});
        border: ${i} solid transparent;
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
    `}};$d([d({type:Number})],Sa.prototype,"numResults",2);Sa=$d([U("alpha-bar-tooltip")],Sa);var lu=Object.defineProperty,cu=Object.getOwnPropertyDescriptor,hi=(i,e,t,s)=>{for(var r=s>1?void 0:s?cu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&lu(e,t,r),r};let kt=class extends H{constructor(){super(...arguments),this.selectedLetter=null,this.tooltipShown=!1,this.alphabet="ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")}get selectedUppercaseLetter(){return this.selectedLetter?.toUpperCase()}render(){return p`
      <section id="container" aria-label=${this.ariaLandmarkLabel??v}>
        <ul>
          ${this.alphabet.map(i=>p`
              <li
                class=${i===this.selectedUppercaseLetter?"selected":v}
                @mousemove=${this.handleMouseMove}
                @mouseleave=${this.handleMouseLeave}
              >
                ${this.letterButtonTemplate(i)}
                ${this.tooltipTemplate(i)}
              </li>
            `)}
        </ul>
      </section>
    `}letterButtonTemplate(i){const e=`${i}: ${this.letterCounts?.[i]??0} results`;return p`
      <button
        aria-label=${e}
        ?disabled=${!this.letterCounts?.[i]}
        @click=${()=>{this.letterClicked(i)}}
      >
        ${i}
      </button>
    `}tooltipTemplate(i){return this.hoveredLetter!==i?v:this.tooltipShown?p`<alpha-bar-tooltip
          data-letter=${i}
          .numResults=${this.letterCounts?.[this.hoveredLetter]??0}
        ></alpha-bar-tooltip>`:v}letterClicked(i){i===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=i,this.dispatchEvent(new CustomEvent("letterChanged",{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(i){const e=i.target;if(e&&!this.tooltipShown){const t=e.textContent?.trim()??void 0;this.tooltipShown=!0,this.hoveredLetter=t,await this.updateComplete,await new Promise(s=>{setTimeout(s,0)}),this.tooltip&&this.tooltip.dataset.letter===t&&this.positionTooltip(e)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(i){if(!this.tooltip)return;const e=this.tooltip.clientWidth;let s=i.clientWidth/2-e/2;const r=getComputedStyle(document.body),o=parseFloat(r.getPropertyValue("margin-left")),a=parseFloat(r.getPropertyValue("margin-right")),n=document.body.clientWidth+o+a,h=i.getBoundingClientRect().left+s,u=h+e,f=1;let g;h<f?g=h-f:u>n-f&&(g=u-n+f),g&&(s-=g,this.tooltip.style.setProperty("--tooltipArrowOffset",`${g}px`)),this.tooltip.style.left=`${s}px`,this.tooltip.classList.add("fade-in")}};kt.styles=S`
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
  `;hi([d({type:String})],kt.prototype,"selectedLetter",2);hi([d({type:Object})],kt.prototype,"letterCounts",2);hi([d({type:String})],kt.prototype,"ariaLandmarkLabel",2);hi([R()],kt.prototype,"tooltipShown",2);hi([R()],kt.prototype,"hoveredLetter",2);hi([Z("alpha-bar-tooltip")],kt.prototype,"tooltip",2);kt=hi([U("alpha-bar")],kt);const du=p`
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
`,hu=p`
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
`,pu=p`
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
`,uu=Q`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,fu=Q`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,mu=Q`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;var gu=Object.defineProperty,vu=Object.getOwnPropertyDescriptor,ee=(i,e,t,s)=>{for(var r=s>1?void 0:s?vu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&gu(e,t,r),r};let J=class extends H{constructor(){super(...arguments),this.defaultSortDirection=null,this.defaultSortField=j.relevance,this.defaultViewSort=j.weeklyview,this.defaultDateSort=j.date,this.sortDirection=null,this.selectedSort=j.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortFieldAvailability=Ir,this.enableSortOptionsSlot=!1,this.suppressDisplayModes=!1,this.lastSelectedViewSort=this.defaultViewSort,this.lastSelectedDateSort=this.defaultDateSort,this.alphaSelectorVisible=null,this.dropdownBackdropVisible=!1,this.desktopSortContainerWidth=0,this.selectorBarContainerWidth=0,this.boundSortBarSelectorEscapeListener=i=>{i.key==="Escape"&&this.closeDropdowns()}}render(){return p`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <slot name="sort-options-left"></slot>
          <div id="sort-options">
            ${this.enableSortOptionsSlot?p`<slot name="sort-options"></slot>`:p`
                  <div class="sort-direction-container">
                    ${this.sortDirectionSelectorTemplate}
                  </div>
                  <span class="sort-by-text">${x("Sort by:")}</span>
                  <div id="sort-selector-container">
                    ${this.mobileSortSelectorTemplate}
                    ${this.desktopSortSelectorTemplate}
                  </div>
                `}
          </div>
          <slot name="sort-options-right"></slot>

          ${this.suppressDisplayModes?v:p`<div id="display-style-selector">
                ${this.displayOptionTemplate}
              </div>`}
        </section>

        ${this.dropdownBackdropVisible?this.dropdownBackdrop:v}
        ${this.alphaBarTemplate}
      </div>
    `}willUpdate(i){if(i.has("selectedSort")||i.has("defaultSortField")){if(this.selectedSort&&this.selectedSort!==j.default&&this.sortDirection===null){const e=Me[this.finalizedSortField];this.sortDirection=e.defaultSortDirection}this.viewOptionSelected?this.lastSelectedViewSort=this.finalizedSortField:this.dateOptionSelected&&(this.lastSelectedDateSort=this.finalizedSortField)}i.has("defaultViewSort")&&(this.lastSelectedViewSort=this.defaultViewSort),i.has("defaultDateSort")&&(this.lastSelectedDateSort=this.defaultDateSort)}updated(i){if(i.has("displayMode")&&this.displayModeChanged(),i.has("selectedTitleFilter")&&this.selectedTitleFilter&&(this.alphaSelectorVisible="title"),i.has("selectedCreatorFilter")&&this.selectedCreatorFilter&&(this.alphaSelectorVisible="creator"),i.has("dropdownBackdropVisible")&&this.setupEscapeListeners(),i.has("resizeObserver")||i.has("enableSortOptionsSlot")){const e=i.get("resizeObserver");e&&this.disconnectResizeObserver(e),this.setupResizeObserver()}}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener("keydown",this.boundSortBarSelectorEscapeListener):document.removeEventListener("keydown",this.boundSortBarSelectorEscapeListener)}connectedCallback(){super.connectedCallback?.(),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(i){this.sortSelectorContainer&&i.removeObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&i.removeObserver({target:this.desktopSortContainer,handler:this})}setupResizeObserver(){this.resizeObserver&&(this.sortSelectorContainer&&this.resizeObserver.addObserver({target:this.sortSelectorContainer,handler:this}),this.desktopSortContainer&&this.resizeObserver.addObserver({target:this.desktopSortContainer,handler:this}))}handleResize(i){i.target===this.desktopSortContainer?this.desktopSortContainerWidth=i.contentRect.width:i.target===this.sortSelectorContainer&&(this.selectorBarContainerWidth=i.contentRect.width)}get mobileSelectorVisible(){return this.selectorBarContainerWidth-10<this.desktopSortContainerWidth}get alphaBarTemplate(){if(!["title","creator"].includes(this.selectedSort))return v;if(this.alphaSelectorVisible===null){if(this.selectedSort==="creator")return this.creatorSelectorBar;if(this.selectedSort==="title")return this.titleSelectorBar}else return this.alphaSelectorVisible==="creator"?this.creatorSelectorBar:this.titleSelectorBar;return v}get sortDirectionSelectorTemplate(){const e=`Change to ${this.sortDirection==="asc"?"descending":"ascending"} sort`;return p`
      <button
        class="sort-direction-selector"
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${e}</span>
        ${this.sortDirectionIcon}
      </button>
    `}get sortDirectionIcon(){return this.canChangeSortDirection?p`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection==="asc"?du:hu}
      </div>
    `:p`<div class="sort-direction-icon">${pu}</div>`}get desktopSortSelectorTemplate(){return p`
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
    `}get mobileSortSelectorTemplate(){const i=Object.values(Me).filter(e=>e.shownInSortBar&&this.sortFieldAvailability[e.field]);return p`
      <div
        id="mobile-sort-container"
        class=${this.mobileSelectorVisible?"visible":"hidden"}
      >
        ${this.getSortDropdown({displayName:Me[this.finalizedSortField].displayName,id:"mobile-dropdown",selected:!0,dropdownOptions:i.map(e=>this.getDropdownOption(e.field)),selectedOption:this.finalizedSortField,onOptionSelected:this.mobileSortChanged,onDropdownClick:()=>{this.dropdownBackdropVisible=this.mobileDropdown.open,this.mobileDropdown.classList.toggle("open",this.mobileDropdown.open)}})}
      </div>
    `}getSortSelectorButton(i,e){const t=this.finalizedSortField===i,s=Me[i].displayName,r=e?.onSelected??(()=>this.clearAlphaBarFilters());return p`
      <button
        class=${t?"selected":""}
        data-title=${s}
        @click=${o=>{o.preventDefault(),this.dropdownBackdropVisible=!1,this.finalizedSortField!==i&&(r?.(o),this.setSelectedSort(i))}}
      >
        ${s}
      </button>
    `}getSortDropdown(i){return p`
      <ia-dropdown
        id=${i.id}
        class=${i.selected?"selected":""}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${i.selected}
        .options=${i.dropdownOptions}
        .selectedOption=${i.selectedOption??""}
        @optionSelected=${i.onOptionSelected??v}
        @click=${i.onDropdownClick??v}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title=${i.displayName}
          @click=${i.onLabelInteraction??v}
          @keydown=${i.onLabelInteraction?e=>{(e.key==="Enter"||e.key===" ")&&i.onLabelInteraction?.(e)}:v}
        >
          ${i.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(i){return{id:i,selectedHandler:()=>{this.selectDropdownSortField(i)},label:p`
        <span class="dropdown-option-label">
          ${Me[i].displayName}
        </span>
      `}}dropdownOptionSelected(i){this.dropdownBackdropVisible=!1,this.clearAlphaBarFilters();const e=i.detail.option.id;this.setSelectedSort(e),this.viewOptionSelected?this.lastSelectedViewSort=e:this.dateOptionSelected&&(this.lastSelectedDateSort=e)}get relevanceSortSelectorTemplate(){return this.sortFieldAvailability.relevance?this.getSortSelectorButton(j.relevance):v}get viewsSortSelectorTemplate(){const{availableViewsFields:i}=this;return i.length<1?v:this.getSortSelectorButton(i[0])}get titleSortSelectorTemplate(){return this.sortFieldAvailability.title?this.getSortSelectorButton(j.title,{onSelected:()=>{this.alphaSelectorVisible="title",this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent()}}):v}get dateSortSelectorTemplate(){const{availableDateFields:i}=this;return i.length<1?v:this.getSortSelectorButton(i[0])}get creatorSortSelectorTemplate(){return this.sortFieldAvailability.creator?this.getSortSelectorButton(j.creator,{onSelected:()=>{this.alphaSelectorVisible="creator",this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()}}):v}get viewsDropdownTemplate(){const i=$l.filter(e=>this.sortFieldAvailability[e]).map(e=>this.getDropdownOption(e));return this.getSortDropdown({displayName:this.viewSortDisplayName,id:"views-dropdown",selected:this.viewOptionSelected,dropdownOptions:i,selectedOption:this.viewOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.dateDropdown&&(this.dateDropdown.open=!1);const e=this.viewsDropdown;this.dropdownBackdropVisible=e.open,e.classList.toggle("open",e.open)},onLabelInteraction:e=>{!this.viewsDropdown?.open&&!this.viewOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedViewSort))}})}get dateDropdownTemplate(){const i=Sl.filter(e=>this.sortFieldAvailability[e]).map(e=>this.getDropdownOption(e));return this.getSortDropdown({displayName:this.dateSortDisplayName,id:"date-dropdown",selected:this.dateOptionSelected,dropdownOptions:i,selectedOption:this.dateOptionSelected?this.finalizedSortField:"",onOptionSelected:this.dropdownOptionSelected,onDropdownClick:()=>{this.viewsDropdown&&(this.viewsDropdown.open=!1);const e=this.dateDropdown;this.dropdownBackdropVisible=e.open,e.classList.toggle("open",e.open)},onLabelInteraction:e=>{!this.dateDropdown?.open&&!this.dateOptionSelected&&(e.stopPropagation(),this.clearAlphaBarFilters(),this.setSelectedSort(this.lastSelectedDateSort))}})}get allViewsSortOptionsTemplate(){switch(this.availableViewsFields.length){case 0:return v;case 1:return this.viewsSortSelectorTemplate;default:return this.viewsDropdownTemplate}}get allDateSortOptionsTemplate(){switch(this.availableDateFields.length){case 0:return v;case 1:return this.dateSortSelectorTemplate;default:return this.dateDropdownTemplate}}mobileSortChanged(i){this.dropdownBackdropVisible=!1;const e=i.detail.option.id;this.setSelectedSort(e),this.alphaSelectorVisible=null,e!=="title"&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),e!=="creator"&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return p`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode="grid"}}
            class=${this.displayMode==="grid"?"active":""}
            title="Tile view"
            data-testid="grid-button"
          >
            ${uu}
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
            ${fu}
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
            ${mu}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return p`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdowns}
        @click=${this.closeDropdowns}
      ></div>
    `}closeDropdowns(){this.dropdownBackdropVisible=!1;const i=[this.viewsDropdown,this.dateDropdown,this.mobileDropdown];for(const e of i)e&&(e.open=!1,e.classList.remove("open"))}selectDropdownSortField(i){this.dropdownBackdropVisible=!1,this.setSelectedSort(i)}clearAlphaBarFilters(){this.alphaSelectorVisible=null,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.emitTitleLetterChangedEvent(),this.emitCreatorLetterChangedEvent()}setSortDirection(i){this.sortDirection=i,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection==="desc"?"asc":"desc")}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(i){this.selectedSort=i;const e=Me[i];this.sortDirection=e.defaultSortDirection,this.emitSortChangedEvent()}get finalizedSortField(){return this.selectedSort===j.default?this.defaultSortField:this.selectedSort}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get canChangeSortDirection(){return Me[this.finalizedSortField].canSetDirection}get dateOptionSelected(){return[j.datefavorited,j.datearchived,j.date,j.datereviewed,j.dateadded].includes(this.finalizedSortField)}get viewOptionSelected(){return[j.alltimeview,j.weeklyview].includes(this.finalizedSortField)}get dateSortDisplayName(){return Me[this.lastSelectedDateSort].displayName}get viewSortDisplayName(){return Me[this.lastSelectedViewSort].displayName}get availableViewsFields(){return $l.filter(i=>this.sortFieldAvailability[i])}get availableDateFields(){return Sl.filter(i=>this.sortFieldAvailability[i])}get titleSelectorBar(){return p` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${this.prefixFilterCountMap?.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){return p` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${this.prefixFilterCountMap?.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(i){this.selectedTitleFilter=i.detail.selectedLetter??null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(i){this.selectedCreatorFilter=i.detail.selectedLetter??null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){const i=new CustomEvent("titleLetterChanged",{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(i)}emitCreatorLetterChangedEvent(){const i=new CustomEvent("creatorLetterChanged",{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(i)}displayModeChanged(){const i=new CustomEvent("displayModeChanged",{detail:{displayMode:this.displayMode}});this.dispatchEvent(i)}emitSortChangedEvent(){const i=new CustomEvent("sortChanged",{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(i)}static get styles(){return[ct,S`
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
      `]}};ee([d({type:String})],J.prototype,"displayMode",2);ee([d({type:String})],J.prototype,"defaultSortDirection",2);ee([d({type:String})],J.prototype,"defaultSortField",2);ee([d({type:String})],J.prototype,"defaultViewSort",2);ee([d({type:String})],J.prototype,"defaultDateSort",2);ee([d({type:String})],J.prototype,"sortDirection",2);ee([d({type:String})],J.prototype,"selectedSort",2);ee([d({type:String})],J.prototype,"selectedTitleFilter",2);ee([d({type:String})],J.prototype,"selectedCreatorFilter",2);ee([d({type:Object})],J.prototype,"sortFieldAvailability",2);ee([d({type:Boolean,reflect:!0})],J.prototype,"enableSortOptionsSlot",2);ee([d({type:Boolean,reflect:!0})],J.prototype,"suppressDisplayModes",2);ee([d({type:Object})],J.prototype,"prefixFilterCountMap",2);ee([d({type:Object})],J.prototype,"resizeObserver",2);ee([R()],J.prototype,"lastSelectedViewSort",2);ee([R()],J.prototype,"lastSelectedDateSort",2);ee([R()],J.prototype,"alphaSelectorVisible",2);ee([R()],J.prototype,"dropdownBackdropVisible",2);ee([R()],J.prototype,"desktopSortContainerWidth",2);ee([R()],J.prototype,"selectorBarContainerWidth",2);ee([Z("#desktop-sort-container")],J.prototype,"desktopSortContainer",2);ee([Z("#sort-selector-container")],J.prototype,"sortSelectorContainer",2);ee([Z("#views-dropdown")],J.prototype,"viewsDropdown",2);ee([Z("#date-dropdown")],J.prototype,"dateDropdown",2);ee([Z("#mobile-dropdown")],J.prototype,"mobileDropdown",2);J=ee([U("sort-filter-bar")],J);class ri{constructor(e){var t,s,r,o,a,n,l;this.title=e?.title,this.subtitle=e?.subtitle,this.headline=e?.headline,this.message=e?.message,this.headerColor=(t=e?.headerColor)!==null&&t!==void 0?t:"#55A183",this.bodyColor=(s=e?.bodyColor)!==null&&s!==void 0?s:"#f5f5f7",this.showProcessingIndicator=(r=e?.showProcessingIndicator)!==null&&r!==void 0?r:!1,this.processingImageMode=(o=e?.processingImageMode)!==null&&o!==void 0?o:"complete",this.showCloseButton=(a=e?.showCloseButton)!==null&&a!==void 0?a:!0,this.showHeaderLogo=(n=e?.showHeaderLogo)!==null&&n!==void 0?n:!0,this.closeOnBackdropClick=(l=e?.closeOnBackdropClick)!==null&&l!==void 0?l:!0}}var Eo,Ao;let ki=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};ki.finalized=!0,ki._$litElement$=!0,(Eo=globalThis.litElementHydrateSupport)===null||Eo===void 0||Eo.call(globalThis,{LitElement:ki});const jl=globalThis.litElementPolyfillSupport;jl?.({LitElement:ki});((Ao=globalThis.litElementVersions)!==null&&Ao!==void 0?Ao:globalThis.litElementVersions=[]).push("3.3.3");function*rn(i=document.activeElement){i!=null&&(yield i,"shadowRoot"in i&&i.shadowRoot&&i.shadowRoot.mode!=="closed"&&(yield*rn(i.shadowRoot.activeElement)))}function bu(){return[...rn()].pop()}const Wl=new WeakMap;function Sd(i){let e=Wl.get(i);return e||(e=window.getComputedStyle(i,null),Wl.set(i,e)),e}function yu(i){if("checkVisibility"in i&&typeof i.checkVisibility=="function")return i.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});const e=Sd(i);return e.visibility!=="hidden"&&e.display!=="none"}function wu(i){const e=Sd(i),{overflowY:t,overflowX:s}=e;return t==="scroll"||s==="scroll"?!0:t!=="auto"||s!=="auto"?!1:i.scrollHeight>i.clientHeight&&t==="auto"||i.scrollWidth>i.clientWidth&&s==="auto"}function $u(i){const e=i.tagName.toLowerCase(),t=Number(i.getAttribute("tabindex"));return i.hasAttribute("tabindex")&&(isNaN(t)||t<=-1)||i.hasAttribute("disabled")||i.closest("[inert]")||e==="input"&&i.getAttribute("type")==="radio"&&!i.hasAttribute("checked")||!yu(i)?!1:(e==="audio"||e==="video")&&i.hasAttribute("controls")||i.hasAttribute("tabindex")||i.hasAttribute("contenteditable")&&i.getAttribute("contenteditable")!=="false"||["button","input","select","textarea","a","audio","video","summary","iframe"].includes(e)?!0:wu(i)}function Su(i,e){var t;return((t=i.getRootNode({composed:!0}))===null||t===void 0?void 0:t.host)!==e}function ql(i){const e=new WeakMap,t=[];function s(r){if(r instanceof Element){if(r.hasAttribute("inert")||r.closest("[inert]")||e.has(r))return;e.set(r,!0),!t.includes(r)&&$u(r)&&t.push(r),r instanceof HTMLSlotElement&&Su(r,i)&&r.assignedElements({flatten:!0}).forEach(o=>{s(o)}),r.shadowRoot!==null&&r.shadowRoot.mode==="open"&&s(r.shadowRoot)}for(const o of Array.from(r.children))s(o)}return s(i),t.sort((r,o)=>{const a=Number(r.getAttribute("tabindex"))||0;return(Number(o.getAttribute("tabindex"))||0)-a})}let as=[];class xu{constructor(e){this.isExternalActivated=!1,this.tabDirection="forward",this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var s;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;const r=bu();if(this.previousFocus=r,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward";const o=ql(this.element);let a=o.findIndex(l=>l===r);this.previousFocus=this.currentFocus;const n=this.tabDirection==="forward"?1:-1;for(;;){a+n>=o.length?a=0:a+n<0?a=o.length-1:a+=n,this.previousFocus=this.currentFocus;const l=o[a];if(this.tabDirection==="backward"&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||l&&this.possiblyHasTabbableChildren(l))return;t.preventDefault(),this.currentFocus=l,(s=this.currentFocus)===null||s===void 0||s.focus({preventScroll:!1});const h=[...rn()];if(h.includes(this.currentFocus)||!h.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e,this.elementsWithTabbableControls=["iframe"]}activate(){as.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){as=as.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return as[as.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=ql(this.element);if(!this.element.matches(":focus-within")){const t=e[0],s=e[e.length-1],r=this.tabDirection==="forward"?t:s;typeof r?.focus=="function"&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute("controls")}}var Mo,Po;let vs=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};vs.finalized=!0,vs._$litElement$=!0,(Mo=globalThis.litElementHydrateSupport)===null||Mo===void 0||Mo.call(globalThis,{LitElement:vs});const Gl=globalThis.litElementPolyfillSupport;Gl?.({LitElement:vs});((Po=globalThis.litElementVersions)!==null&&Po!==void 0?Po:globalThis.litElementVersions=[]).push("3.3.3");var Yl;(function(i){i.processing="processing",i.complete="complete"})(Yl||(Yl={}));let xa=class extends vs{constructor(){super(...arguments),this.mode="processing"}render(){return M`
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
    `}static get styles(){const e=b`var(--activityIndicatorCheckmarkColor, #31A481)`,t=b`var(--activityIndicatorCompletedRingColor, #31A481)`,s=b`var(--activityIndicatorLoadingRingColor, #333333)`,r=b`var(--activityIndicatorLoadingDotColor, #333333)`;return b`
      #completed-ring {
        fill: ${t};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${s};
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
    `}};c([T({type:String})],xa.prototype,"mode",void 0);xa=c([Qe("ia-activity-indicator")],xa);var Oo,Do;let bs=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};bs.finalized=!0,bs._$litElement$=!0,(Oo=globalThis.litElementHydrateSupport)===null||Oo===void 0||Oo.call(globalThis,{LitElement:bs});const Ql=globalThis.litElementPolyfillSupport;Ql?.({LitElement:bs});((Do=globalThis.litElementVersions)!==null&&Do!==void 0?Do:globalThis.litElementVersions=[]).push("3.3.3");const Cu=M`
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
`;class _u extends bs{static get styles(){return b`
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
    `}render(){return Cu}}customElements.define("ia-icon-close",_u);const Tu=M`
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
`;let Ca=class extends ki{constructor(){super(...arguments),this.config=new ri}render(){return M`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showCloseButton?this.closeButtonTemplate:""}
            ${this.config.showHeaderLogo?M`<div class="logo-icon">${Tu}</div>`:Y}
            ${this.config.title?M`<h1 class="title">${this.config.title}</h1>`:""}
            ${this.config.subtitle?M`<h2 class="subtitle">${this.config.subtitle}</h2>`:""}
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
              ${this.config.headline?M` <h1 class="headline">${this.config.headline}</h1> `:""}
              ${this.config.message?M` <p class="message">${this.config.message}</p> `:""}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type==="keydown"&&e.key!==" "&&e.key!=="Enter")return;const t=new Event("closeButtonPressed");this.dispatchEvent(t)}get closeButtonTemplate(){return M`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}static get styles(){const e=b`var(--modalLogoSize, 6.5rem)`,t=b`var(--processingImageSize, 7.5rem)`,s=b`var(--modalCornerRadius, 1rem)`,r=b`var(--modalBorder, 2px solid black)`,o=b`var(--modalBottomMargin, 2.5rem)`,a=b`var(--modalTopMargin, 5rem)`,n=b`var(--modalHeaderBottomPadding, 0.5em)`,l=b`var(--modalBottomPadding, 2rem)`,h=b`var(--modalScrollOffset, 5px)`,u=b`var(--modalTitleFontSize, 1.8rem)`,f=b`var(--modalSubtitleFontSize, 1.4rem)`,g=b`var(--modalHeadlineFontSize, 1.6rem)`,y=b`var(--modalMessageFontSize, 1.4rem)`,$=b`var(--modalTitleLineHeight, normal)`,_=b`var(--modalSubtitleLineHeight, normal)`,O=b`var(--modalHeadlineLineHeight, normal)`,z=b`var(--modalMessageLineHeight, normal)`;return b`
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
        border-radius: ${s};
        width: 100%;
        margin-top: ${a};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${s}) calc(${s}) 0 0;
        border: ${r};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${n};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${u};
        font-weight: bold;
        line-height: ${$};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${f};
        line-height: ${_};
      }

      .modal-body {
        background-color: #f5f5f7;
        border-radius: 0 0 calc(${s}) calc(${s});
        border: ${r};
        border-top: 0;
        padding: 0 1rem calc(${l} - ${h}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${o}));
        min-height: 5rem;
        padding: 0 0 calc(${h}) 0;
      }

      .headline {
        font-size: ${g};
        font-weight: bold;
        text-align: center;
        line-height: ${O};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${y};
        line-height: ${z};
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
    `}};c([T({type:Object})],Ca.prototype,"config",void 0);Ca=c([Qe("modal-template")],Ca);function ku(i,e,t){var s=t||{},r=s.noTrailing,o=r===void 0?!1:r,a=s.noLeading,n=a===void 0?!1:a,l=s.debounceMode,h=l===void 0?void 0:l,u,f=!1,g=0;function y(){u&&clearTimeout(u)}function $(O){var z=O||{},P=z.upcomingOnly,L=P===void 0?!1:P;y(),f=!L}function _(){for(var O=arguments.length,z=new Array(O),P=0;P<O;P++)z[P]=arguments[P];var L=this,N=Date.now()-g;if(f)return;function se(){g=Date.now(),e.apply(L,z)}function Re(){u=void 0}!n&&h&&!u&&se(),y(),h===void 0&&N>i?n?(g=Date.now(),o||(u=setTimeout(h?Re:se,i))):se():o!==!0&&(u=setTimeout(h?Re:se,h===void 0?i-N:i))}return _.cancel=$,_}var oi;(function(i){i.Open="open",i.Closed="closed"})(oi||(oi={}));class Eu{constructor(e){this.windowResizeThrottler=ku(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case oi.Open:this.startResizeListener(),this.stopDocumentScroll();break;case oi.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty("--containerHeight",`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add("modal-manager-open")}resumeDocumentScroll(){document.body.classList.remove("modal-manager-open")}startResizeListener(){window.addEventListener("resize",this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener("resize",this.windowResizeThrottler)}}let Fi=class extends ki{constructor(){super(...arguments),this.mode=oi.Closed,this.hostBridge=new Eu(this),this.modal=new xu(this),this.closeOnBackdropClick=!0}firstUpdated(){return Fn(this,void 0,void 0,function*(){yield new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener("keydown",e=>{e.key==="Escape"&&this.backdropClicked()})})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return M`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=oi.Closed,this.customModalContent=void 0,this.modalTemplate.config=new ri,this.modal.deactivate()}callUserClosedModalCallback(){const e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}showModal(e){return Fn(this,void 0,void 0,function*(){this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.modalTemplate.config=e.config,this.customModalContent=e.customModalContent,this.mode=oi.Open,yield this.modalTemplate.updateComplete,this.modalTemplate.focus(),this.modal.activate()})}updated(e){e.has("mode")&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){const e=new CustomEvent("modeChanged",{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){const e=b`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=b`var(--modalBackdropZindex, 1000)`,s=b`var(--modalWidth, 32rem)`,r=b`var(--modalMaxWidth, 95%)`,o=b`var(--modalZindex, 2000)`;return b`
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
        z-index: ${o};
        width: ${s};
        max-width: ${r};
      }
    `}};c([T({type:String,reflect:!0})],Fi.prototype,"mode",void 0);c([T({type:Object})],Fi.prototype,"customModalContent",void 0);c([T({type:Object})],Fi.prototype,"hostBridge",void 0);c([Be("modal-template")],Fi.prototype,"modalTemplate",void 0);Fi=c([Qe("modal-manager")],Fi);const Kl=S`var(--white, #fff)`,Au=S`var(--primaryDisableCTAFill, #767676)`,Mu=S`var(--secondaryCTABorder, #999)`,Pu=S`var(--primaryCTAFill, #194880)`,Lo=S`var(--primaryCTAFillRGB, 25, 72, 128)`,Ou=S`var(--primaryCTABorder, #c5d1df)`,Du=S`var(--primaryErrorCTAFill, #d9534f)`,Fo=S`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,Lu=S`var(--primaryErrorCTABorder, #d43f3a)`,Fu=S`var(--secondaryCTAFill, #333)`,Bo=S`var(--secondaryCTAFillRGB, 51, 51, 51)`,Bu=S`var(--primaryCTABorder, #979797)`,Ru=S`var(---primaryWarningFill, #ee8950)`,Ro=S`var(--primaryWarningFillRGB, 238, 137, 80)`,zu=S`var(--primaryWarningBorder, #ec7939)`,Iu=S`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Kl};
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
    outline-color: ${Kl};
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
    background-color: ${Au};
    border: 1px solid ${Mu};
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
    background-color: ${Pu};
    border-color: ${Ou};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Lo}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Lo}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Lo}, 0.7);
  }

  .ia-button.danger {
    background-color: ${Du};
    border-color: ${Lu};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Fo}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Fo}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Fo}, 0.7);
  }

  .ia-button.warning {
    background-color: ${Ru};
    border-color: ${zu};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Ro}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Ro}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Ro}, 0.7);
  }

  .ia-button.dark {
    background-color: ${Fu};
    border-color: ${Bu};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Bo}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Bo}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Bo}, 0.7);
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
`;var Nu=Object.defineProperty,Uu=Object.getOwnPropertyDescriptor,on=(i,e,t,s)=>{for(var r=s>1?void 0:s?Uu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Nu(e,t,r),r};let _r=class extends H{constructor(){super(...arguments),this.items=[]}render(){return p`
      <ul>
        ${si(this.items,({title:i,date:e})=>p`
            <li>
              <span class="item-title">${i??"[untitled]"}</span>
              <span class="item-date">${e??""}</span>
            </li>
          `)}
      </ul>
      ${this.message?p`<p class="message">${this.message}</p>`:v}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${x("Remove items")}
        </button>
      </div>
    `}removeItemsBtnClicked(){this.dispatchEvent(new CustomEvent("confirm",{detail:{items:this.items}}))}static get styles(){return S`
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
    `}};on([d({type:Object})],_r.prototype,"items",2);on([d({type:String})],_r.prototype,"message",2);_r=on([U("remove-items-modal-content")],_r);var Hu=Object.defineProperty,Vu=Object.getOwnPropertyDescriptor,Et=(i,e,t,s)=>{for(var r=s>1?void 0:s?Vu(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Hu(e,t,r),r};let mt=class extends H{constructor(){super(...arguments),this.label=x("Select items to remove"),this.selectedItems=[],this.showSelectAll=!1,this.showUnselectAll=!1,this.showItemManageButton=!1,this.removeAllowed=!1}render(){return p`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <div class="manage-buttons">
          <button class="ia-button dark" @click=${this.cancelClicked}>
            ${x("Cancel")}
          </button>
          <button
            class="ia-button danger"
            ?disabled=${!this.removeAllowed}
            @click=${this.showRemoveItemsModal}
          >
            ${x("Remove selected items")} (${this.selectedItems.length})...
          </button>
          ${tr(this.showItemManageButton,()=>p` <button
                class="ia-button warning"
                ?disabled=${!this.removeAllowed}
                @click=${this.manageItemsClicked}
              >
                ${x("Item Manager the items")} (${this.selectedItems.length})
              </button>`)}
          <div class="selection-buttons">
            ${tr(this.showSelectAll,()=>p` <button
                  class="ia-button link select-all-btn"
                  @click=${this.selectAllClicked}
                >
                  ${x("Select all")}
                </button>`)}
            ${tr(this.showUnselectAll,()=>p` <button
                  class="ia-button link unselect-all-btn"
                  @click=${this.unselectAllClicked}
                >
                  ${x("Unselect all")}
                </button>`)}
          </div>
        </div>
      </div>
    `}cancelClicked(){this.dispatchEvent(new CustomEvent("cancel"))}removeItemsClicked(){this.dispatchEvent(new CustomEvent("removeItems"))}manageItemsClicked(){this.dispatchEvent(new CustomEvent("manageItems"))}selectAllClicked(){this.dispatchEvent(new CustomEvent("selectAll"))}unselectAllClicked(){this.dispatchEvent(new CustomEvent("unselectAll"))}showRemoveItemsModal(){const i=p`
      <remove-items-modal-content
        .items=${this.selectedItems}
        .message=${this.manageViewModalMsg}
        @confirm=${()=>this.removeItemsClicked()}
      ></remove-items-modal-content>
    `,e=new ri({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:p`${x("Are you sure you want to remove these items?")}`});this.modalManager?.classList.add("remove-items"),this.modalManager?.showModal({config:e,customModalContent:i,userClosedModalCallback:()=>{this.modalManager?.classList.remove("remove-items")}})}showRemoveItemsProcessingModal(){const i=new ri({showProcessingIndicator:!0,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:p`${x("Removing selected items...")}`});this.modalManager?.classList.add("remove-items"),this.modalManager?.showModal({config:i,userClosedModalCallback:()=>{this.modalManager?.classList.remove("remove-items")}})}showRemoveItemsErrorModal(){const i=new ri({showProcessingIndicator:!1,processingImageMode:"processing",bodyColor:"#fff",headerColor:"#691916",showHeaderLogo:!1,closeOnBackdropClick:!0,title:p`${x("Error: unable to remove items")}`,message:p`${x("An error occurred while removing items. Please try again in a few minutes.")}`});this.modalManager?.classList.add("remove-items"),this.modalManager?.showModal({config:i,userClosedModalCallback:()=>{this.modalManager?.classList.remove("remove-items")}})}static get styles(){return S`
      ${Iu}
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
    `}};Et([d({type:String})],mt.prototype,"label",2);Et([d({type:Object})],mt.prototype,"modalManager",2);Et([d({type:Object})],mt.prototype,"selectedItems",2);Et([d({type:String})],mt.prototype,"manageViewModalMsg",2);Et([d({type:Boolean})],mt.prototype,"showSelectAll",2);Et([d({type:Boolean})],mt.prototype,"showUnselectAll",2);Et([d({type:Boolean})],mt.prototype,"showItemManageButton",2);Et([d({type:Boolean})],mt.prototype,"removeAllowed",2);mt=Et([U("manage-bar")],mt);const ys=(i,e)=>{const t=i._$AN;if(t===void 0)return!1;for(const s of t)s._$AO?.(e,!1),ys(s,e);return!0},Tr=i=>{let e,t;do{if((e=i._$AM)===void 0)break;t=e._$AN,t.delete(i),i=e}while(t?.size===0)},xd=i=>{for(let e;e=i._$AM;i=e){let t=e._$AN;if(t===void 0)e._$AN=t=new Set;else if(t.has(i))break;t.add(i),qu(e)}};function ju(i){this._$AN!==void 0?(Tr(this),this._$AM=i,xd(this)):this._$AM=i}function Wu(i,e=!1,t=0){const s=this._$AH,r=this._$AN;if(r!==void 0&&r.size!==0)if(e)if(Array.isArray(s))for(let o=t;o<s.length;o++)ys(s[o],!1),Tr(s[o]);else s!=null&&(ys(s,!1),Tr(s));else ys(this,i)}const qu=i=>{i.type==ut.CHILD&&(i._$AP??=Wu,i._$AQ??=ju)};class Gu extends Ls{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,s){super._$AT(e,t,s),xd(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(ys(this,e),Tr(this))}setValue(e){if(Jc(this._$Ct))this._$Ct._$AI(e,this);else{const t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}}const zo=new WeakMap,Yu=Ds(class extends Gu{render(i){return oe}update(i,[e]){const t=e!==this.G;return t&&this.G!==void 0&&this.rt(void 0),(t||this.lt!==this.ct)&&(this.G=e,this.ht=i.options?.host,this.rt(this.ct=i.element)),oe}rt(i){if(this.isConnected||(i=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let t=zo.get(e);t===void 0&&(t=new WeakMap,zo.set(e,t)),t.get(this.G)!==void 0&&this.G.call(this.ht,void 0),t.set(this.G,i),i!==void 0&&this.G.call(this.ht,i)}else this.G.value=i}get lt(){return typeof this.G=="function"?zo.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var Cd=60,_d=Cd*60,Td=_d*24,Qu=Td*7,Bi=1e3,Io=Cd*Bi,Xl=_d*Bi,Ku=Td*Bi,Xu=Qu*Bi,an="millisecond",Si="second",xi="minute",Ci="hour",Ot="day",ar="week",et="month",kd="quarter",Dt="year",_i="date",Zu="YYYY-MM-DDTHH:mm:ssZ",Zl="Invalid Date",Ju=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,e2=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;const t2={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],s=e%100;return"["+e+(t[(s-20)%10]||t[s]||t[0])+"]"}};var _a=function(e,t,s){var r=String(e);return!r||r.length>=t?e:""+Array(t+1-r.length).join(s)+e},i2=function(e){var t=-e.utcOffset(),s=Math.abs(t),r=Math.floor(s/60),o=s%60;return(t<=0?"+":"-")+_a(r,2,"0")+":"+_a(o,2,"0")},s2=function i(e,t){if(e.date()<t.date())return-i(t,e);var s=(t.year()-e.year())*12+(t.month()-e.month()),r=e.clone().add(s,et),o=t-r<0,a=e.clone().add(s+(o?-1:1),et);return+(-(s+(t-r)/(o?r-a:a-r))||0)},r2=function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},o2=function(e){var t={M:et,y:Dt,w:ar,d:Ot,D:_i,h:Ci,m:xi,s:Si,ms:an,Q:kd};return t[e]||String(e||"").toLowerCase().replace(/s$/,"")},a2=function(e){return e===void 0};const n2={s:_a,z:i2,m:s2,a:r2,p:o2,u:a2};var ws="en",ai={};ai[ws]=t2;var Ed="$isDayjsObject",nn=function(e){return e instanceof Vr||!!(e&&e[Ed])},kr=function i(e,t,s){var r;if(!e)return ws;if(typeof e=="string"){var o=e.toLowerCase();ai[o]&&(r=o),t&&(ai[o]=t,r=o);var a=e.split("-");if(!r&&a.length>1)return i(a[0])}else{var n=e.name;ai[n]=e,r=n}return!s&&r&&(ws=r),r||!s&&ws},ae=function(e,t){if(nn(e))return e.clone();var s=typeof t=="object"?t:{};return s.date=e,s.args=arguments,new Vr(s)},l2=function(e,t){return ae(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},X=n2;X.l=kr;X.i=nn;X.w=l2;var c2=function(e){var t=e.date,s=e.utc;if(t===null)return new Date(NaN);if(X.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var r=t.match(Ju);if(r){var o=r[2]-1||0,a=(r[7]||"0").substring(0,3);return s?new Date(Date.UTC(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],o,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(t)},Vr=(function(){function i(t){this.$L=kr(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[Ed]=!0}var e=i.prototype;return e.parse=function(s){this.$d=c2(s),this.init()},e.init=function(){var s=this.$d;this.$y=s.getFullYear(),this.$M=s.getMonth(),this.$D=s.getDate(),this.$W=s.getDay(),this.$H=s.getHours(),this.$m=s.getMinutes(),this.$s=s.getSeconds(),this.$ms=s.getMilliseconds()},e.$utils=function(){return X},e.isValid=function(){return this.$d.toString()!==Zl},e.isSame=function(s,r){var o=ae(s);return this.startOf(r)<=o&&o<=this.endOf(r)},e.isAfter=function(s,r){return ae(s)<this.startOf(r)},e.isBefore=function(s,r){return this.endOf(r)<ae(s)},e.$g=function(s,r,o){return X.u(s)?this[r]:this.set(o,s)},e.unix=function(){return Math.floor(this.valueOf()/1e3)},e.valueOf=function(){return this.$d.getTime()},e.startOf=function(s,r){var o=this,a=X.u(r)?!0:r,n=X.p(s),l=function(z,P){var L=X.w(o.$u?Date.UTC(o.$y,P,z):new Date(o.$y,P,z),o);return a?L:L.endOf(Ot)},h=function(z,P){var L=[0,0,0,0],N=[23,59,59,999];return X.w(o.toDate()[z].apply(o.toDate("s"),(a?L:N).slice(P)),o)},u=this.$W,f=this.$M,g=this.$D,y="set"+(this.$u?"UTC":"");switch(n){case Dt:return a?l(1,0):l(31,11);case et:return a?l(1,f):l(0,f+1);case ar:{var $=this.$locale().weekStart||0,_=(u<$?u+7:u)-$;return l(a?g-_:g+(6-_),f)}case Ot:case _i:return h(y+"Hours",0);case Ci:return h(y+"Minutes",1);case xi:return h(y+"Seconds",2);case Si:return h(y+"Milliseconds",3);default:return this.clone()}},e.endOf=function(s){return this.startOf(s,!1)},e.$set=function(s,r){var o,a=X.p(s),n="set"+(this.$u?"UTC":""),l=(o={},o[Ot]=n+"Date",o[_i]=n+"Date",o[et]=n+"Month",o[Dt]=n+"FullYear",o[Ci]=n+"Hours",o[xi]=n+"Minutes",o[Si]=n+"Seconds",o[an]=n+"Milliseconds",o)[a],h=a===Ot?this.$D+(r-this.$W):r;if(a===et||a===Dt){var u=this.clone().set(_i,1);u.$d[l](h),u.init(),this.$d=u.set(_i,Math.min(this.$D,u.daysInMonth())).$d}else l&&this.$d[l](h);return this.init(),this},e.set=function(s,r){return this.clone().$set(s,r)},e.get=function(s){return this[X.p(s)]()},e.add=function(s,r){var o=this,a;s=Number(s);var n=X.p(r),l=function(g){var y=ae(o);return X.w(y.date(y.date()+Math.round(g*s)),o)};if(n===et)return this.set(et,this.$M+s);if(n===Dt)return this.set(Dt,this.$y+s);if(n===Ot)return l(1);if(n===ar)return l(7);var h=(a={},a[xi]=Io,a[Ci]=Xl,a[Si]=Bi,a)[n]||1,u=this.$d.getTime()+s*h;return X.w(u,this)},e.subtract=function(s,r){return this.add(s*-1,r)},e.format=function(s){var r=this,o=this.$locale();if(!this.isValid())return o.invalidDate||Zl;var a=s||Zu,n=X.z(this),l=this.$H,h=this.$m,u=this.$M,f=o.weekdays,g=o.months,y=o.meridiem,$=function(L,N,se,Re){return L&&(L[N]||L(r,a))||se[N].slice(0,Re)},_=function(L){return X.s(l%12||12,L,"0")},O=y||function(P,L,N){var se=P<12?"AM":"PM";return N?se.toLowerCase():se},z=function(L){switch(L){case"YY":return String(r.$y).slice(-2);case"YYYY":return X.s(r.$y,4,"0");case"M":return u+1;case"MM":return X.s(u+1,2,"0");case"MMM":return $(o.monthsShort,u,g,3);case"MMMM":return $(g,u);case"D":return r.$D;case"DD":return X.s(r.$D,2,"0");case"d":return String(r.$W);case"dd":return $(o.weekdaysMin,r.$W,f,2);case"ddd":return $(o.weekdaysShort,r.$W,f,3);case"dddd":return f[r.$W];case"H":return String(l);case"HH":return X.s(l,2,"0");case"h":return _(1);case"hh":return _(2);case"a":return O(l,h,!0);case"A":return O(l,h,!1);case"m":return String(h);case"mm":return X.s(h,2,"0");case"s":return String(r.$s);case"ss":return X.s(r.$s,2,"0");case"SSS":return X.s(r.$ms,3,"0");case"Z":return n}return null};return a.replace(e2,function(P,L){return L||z(P)||n.replace(":","")})},e.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},e.diff=function(s,r,o){var a=this,n=X.p(r),l=ae(s),h=(l.utcOffset()-this.utcOffset())*Io,u=this-l,f=function(){return X.m(a,l)},g;switch(n){case Dt:g=f()/12;break;case et:g=f();break;case kd:g=f()/3;break;case ar:g=(u-h)/Xu;break;case Ot:g=(u-h)/Ku;break;case Ci:g=u/Xl;break;case xi:g=u/Io;break;case Si:g=u/Bi;break;default:g=u;break}return o?g:X.a(g)},e.daysInMonth=function(){return this.endOf(et).$D},e.$locale=function(){return ai[this.$L]},e.locale=function(s,r){if(!s)return this.$L;var o=this.clone(),a=kr(s,r,!0);return a&&(o.$L=a),o},e.clone=function(){return X.w(this.$d,this)},e.toDate=function(){return new Date(this.valueOf())},e.toJSON=function(){return this.isValid()?this.toISOString():null},e.toISOString=function(){return this.$d.toISOString()},e.toString=function(){return this.$d.toUTCString()},i})(),Ad=Vr.prototype;ae.prototype=Ad;[["$ms",an],["$s",Si],["$m",xi],["$H",Ci],["$W",Ot],["$M",et],["$y",Dt],["$D",_i]].forEach(function(i){Ad[i[1]]=function(e){return this.$g(e,i[0],i[1])}});ae.extend=function(i,e){return i.$i||(i(e,Vr,ae),i.$i=!0),ae};ae.locale=kr;ae.isDayjs=nn;ae.unix=function(i){return ae(i*1e3)};ae.en=ai[ws];ae.Ls=ai;ae.p={};var d2=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(t,s,r){return s||r.slice(1)})},h2={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},p2=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(s,r,o){var a=o&&o.toUpperCase();return r||t[o]||h2[o]||d2(t[a])})},u2=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,Jl=/\d/,ns=/\d\d/,f2=/\d{3}/,m2=/\d{4}/,Xe=/\d\d?/,g2=/[+-]?\d+/,v2=/[+-]\d\d:?(\d\d)?|Z/,ls=/\d*[^-_:/,()\s\d]+/,Rt={},Md=function(e){return e=+e,e+(e>68?1900:2e3)};function b2(i){if(!i||i==="Z")return 0;var e=i.match(/([+-]|\d\d)/g),t=+(e[1]*60)+(+e[2]||0);return t===0?0:e[0]==="+"?-t:t}var Te=function(e){return function(t){this[e]=+t}},ec=[v2,function(i){var e=this.zone||(this.zone={});e.offset=b2(i)}],No=function(e){var t=Rt[e];return t&&(t.indexOf?t:t.s.concat(t.f))},tc=function(e,t){var s,r=Rt,o=r.meridiem;if(!o)s=e===(t?"pm":"PM");else for(var a=1;a<=24;a+=1)if(e.indexOf(o(a,0,t))>-1){s=a>12;break}return s},y2={A:[ls,function(i){this.afternoon=tc(i,!1)}],a:[ls,function(i){this.afternoon=tc(i,!0)}],Q:[Jl,function(i){this.month=(i-1)*3+1}],S:[Jl,function(i){this.milliseconds=+i*100}],SS:[ns,function(i){this.milliseconds=+i*10}],SSS:[f2,function(i){this.milliseconds=+i}],s:[Xe,Te("seconds")],ss:[Xe,Te("seconds")],m:[Xe,Te("minutes")],mm:[Xe,Te("minutes")],H:[Xe,Te("hours")],h:[Xe,Te("hours")],HH:[Xe,Te("hours")],hh:[Xe,Te("hours")],D:[Xe,Te("day")],DD:[ns,Te("day")],Do:[ls,function(i){var e=Rt,t=e.ordinal,s=i.match(/\d+/);if(this.day=s[0],!!t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,"")===i&&(this.day=r)}],w:[Xe,Te("week")],ww:[ns,Te("week")],M:[Xe,Te("month")],MM:[ns,Te("month")],MMM:[ls,function(i){var e=No("months"),t=No("monthsShort"),s=(t||e.map(function(r){return r.slice(0,3)})).indexOf(i)+1;if(s<1)throw new Error;this.month=s%12||s}],MMMM:[ls,function(i){var e=No("months"),t=e.indexOf(i)+1;if(t<1)throw new Error;this.month=t%12||t}],Y:[g2,Te("year")],YY:[ns,function(i){this.year=Md(i)}],YYYY:[m2,Te("year")],Z:ec,ZZ:ec};function w2(i){var e=i.afternoon;if(e!==void 0){var t=i.hours;e?t<12&&(i.hours+=12):t===12&&(i.hours=0),delete i.afternoon}}function $2(i){i=p2(i,Rt&&Rt.formats);for(var e=i.match(u2),t=e.length,s=0;s<t;s+=1){var r=e[s],o=y2[r],a=o&&o[0],n=o&&o[1];n?e[s]={regex:a,parser:n}:e[s]=r.replace(/^\[|\]$/g,"")}return function(l){for(var h={},u=0,f=0;u<t;u+=1){var g=e[u];if(typeof g=="string")f+=g.length;else{var y=g.regex,$=g.parser,_=l.slice(f),O=y.exec(_),z=O[0];$.call(h,z),l=l.replace(z,"")}}return w2(h),h}}var S2=function(e,t,s,r){try{if(["x","X"].indexOf(t)>-1)return new Date((t==="X"?1e3:1)*e);var o=$2(t),a=o(e),n=a.year,l=a.month,h=a.day,u=a.hours,f=a.minutes,g=a.seconds,y=a.milliseconds,$=a.zone,_=a.week,O=new Date,z=h||(!n&&!l?O.getDate():1),P=n||O.getFullYear(),L=0;n&&!l||(L=l>0?l-1:O.getMonth());var N=u||0,se=f||0,Re=g||0,Nt=y||0;if($)return new Date(Date.UTC(P,L,z,N,se,Re,Nt+$.offset*60*1e3));if(s)return new Date(Date.UTC(P,L,z,N,se,Re,Nt));var At;return At=new Date(P,L,z,N,se,Re,Nt),_&&(At=r(At).week(_).toDate()),At}catch{return new Date("")}};const x2=(function(i,e,t){t.p.customParseFormat=!0,i&&i.parseTwoDigitYear&&(Md=i.parseTwoDigitYear);var s=e.prototype,r=s.parse;s.parse=function(o){var a=o.date,n=o.utc,l=o.args;this.$u=n;var h=l[1];if(typeof h=="string"){var u=l[2]===!0,f=l[3]===!0,g=u||f,y=l[2];f&&(y=l[2]),Rt=this.$locale(),!u&&y&&(Rt=t.Ls[y]),this.$d=S2(a,h,n,t),this.init(),y&&y!==!0&&(this.$L=this.locale(y).$L),g&&a!=this.format(h)&&(this.$d=new Date("")),Rt={}}else if(h instanceof Array)for(var $=h.length,_=1;_<=$;_+=1){l[1]=h[_-1];var O=t.apply(this,l);if(O.isValid()){this.$d=O.$d,this.$L=O.$L,this.init();break}_===$&&(this.$d=new Date(""))}else r.call(this,o)}});function C2(i,e){const t=e.prototype,s=t.parse;t.parse=function(r){const o=r.date,a=r.args[1];s.call(this,r);const n=this.year(),l=n>=1900&&n<2e3,h=typeof a=="string"&&a.includes("YYYY"),u=Array.isArray(a)&&typeof a[0]=="string"&&a[0].includes("YYYY"),f=h||u,g=typeof o=="string"&&!o.includes(`${n}`);l&&f&&g&&(this.$d.setFullYear(n-1900),this.init())}}var Uo,Ho;let $s=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};$s.finalized=!0,$s._$litElement$=!0,(Uo=globalThis.litElementHydrateSupport)===null||Uo===void 0||Uo.call(globalThis,{LitElement:$s});const ic=globalThis.litElementPolyfillSupport;ic?.({LitElement:$s});((Ho=globalThis.litElementVersions)!==null&&Ho!==void 0?Ho:globalThis.litElementVersions=[]).push("3.3.3");const sc=Rr(class extends zr{constructor(i){if(super(i),i.type!==$t.PROPERTY&&i.type!==$t.ATTRIBUTE&&i.type!==$t.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!A1(i))throw Error("`live` bindings can only contain a single expression")}render(i){return i}update(i,[e]){if(e===ge||e===Y)return e;const t=i.element,s=i.name;if(i.type===$t.PROPERTY){if(e===t[s])return ge}else if(i.type===$t.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return ge}else if(i.type===$t.ATTRIBUTE&&t.getAttribute(s)===e+"")return ge;return Vc(i),e}});const Ta=Rr(class extends zr{constructor(i){var e;if(super(i),i.type!==$t.ATTRIBUTE||i.name!=="class"||((e=i.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(i){return" "+Object.keys(i).filter((e=>i[e])).join(" ")+" "}update(i,[e]){var t,s;if(this.it===void 0){this.it=new Set,i.strings!==void 0&&(this.nt=new Set(i.strings.join(" ").split(/\s/).filter((o=>o!==""))));for(const o in e)e[o]&&!(!((t=this.nt)===null||t===void 0)&&t.has(o))&&this.it.add(o);return this.render(e)}const r=i.element.classList;this.it.forEach((o=>{o in e||(r.remove(o),this.it.delete(o))}));for(const o in e){const a=!!e[o];a===this.it.has(o)||!((s=this.nt)===null||s===void 0)&&s.has(o)||(a?(r.add(o),this.it.add(o)):(r.remove(o),this.it.delete(o)))}return ge}});const Pd="important",_2=" !"+Pd,Od=Rr(class extends zr{constructor(i){var e;if(super(i),i.type!==$t.ATTRIBUTE||i.name!=="style"||((e=i.strings)===null||e===void 0?void 0:e.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(i){return Object.keys(i).reduce(((e,t)=>{const s=i[t];return s==null?e:e+`${t=t.includes("-")?t:t.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`}),"")}update(i,[e]){const{style:t}=i.element;if(this.ht===void 0){this.ht=new Set;for(const s in e)this.ht.add(s);return this.render(e)}this.ht.forEach((s=>{e[s]==null&&(this.ht.delete(s),s.includes("-")?t.removeProperty(s):t[s]="")}));for(const s in e){const r=e[s];if(r!=null){this.ht.add(s);const o=typeof r=="string"&&r.endsWith(_2);s.includes("-")||o?t.setProperty(s,o?r.slice(0,-11):r,o?Pd:""):t[s]=r}}return ge}});ae.extend(x2);ae.extend(C2);const T2=180,k2=40,E2=10,A2=125,M2=30,rc="YYYY",P2="no data",O2=0,D2="item",oc=4,L2={linear:i=>i,logarithmic:i=>Math.log1p(i)},F2=b`var(--histogramDateRangeSliderColor, #4B65FE)`,B2=b`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,R2=b`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,z2=b`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,I2=b`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,N2=b`var(--histogramDateRangeInputRowMargin, 0)`,U2=b`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,H2=b`var(--histogramDateRangeInputWidth, 35px)`,V2=b`var(--histogramDateRangeInputFontSize, 1.2rem)`,j2=b`var(--histogramDateRangeInputFontFamily, sans-serif)`,ac=b`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,nc=b`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,W2=b`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,q2=b`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;let K=class extends $s{constructor(){super(...arguments),this.width=T2,this.height=k2,this.sliderWidth=E2,this.tooltipWidth=A2,this.tooltipHeight=M2,this.updateDelay=O2,this.dateFormat=rc,this.missingDataMessage=P2,this.minDate="",this.maxDate="",this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping="none",this.tooltipLabel=D2,this.barScaling="logarithmic",this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate="",this._maxSelectedDate="",this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange="",this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{const t=this.getBoundingClientRect().x,s=e.clientX-t-this._dragOffset;this._currentSlider.id==="slider-min"?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(s)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(s)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(e){(e.has("bins")||e.has("minDate")||e.has("maxDate")||e.has("minSelectedDate")||e.has("maxSelectedDate")||e.has("width")||e.has("height")||e.has("binSnapping")||e.has("barScaling"))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._previousDateRange=this.currentDateRangeString,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(e){return Math.ceil(e/1e3)*1e3}snapToMonth(e){const t=ae(e),s=t.date()<16?0:1;return t.add(s,"month").date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(e){const t=ae(e),s=t.month()<6?0:1;return t.add(s,"year").month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(e){switch(this.binSnapping){case"year":return this.snapToYear(e);case"month":return this.snapToMonth(e);default:return this.snapToNextSecond(e)}}get barScalingFunction(){return typeof this.barScaling=="string"?L2[this.barScaling]:this.barScaling}calculateHistData(){const{bins:e,height:t,dateRangeMS:s,_numBins:r,_minDateMS:o}=this,a=Math.min(...this.bins),n=Math.max(...this.bins),l=a===n?1:this.barScalingFunction(n),h=t/l,u=s/r;return e.map((f,g)=>{const y=this.snapTimestamp(g*u+o),$=this.formatDate(y),_=this.snapTimestamp((g+1)*u+o)+this.snapEndOffset,O=this.formatDate(_),z=this.formatDate(y,this.tooltipDateFormat),P=this.formatDate(_,this.tooltipDateFormat),L=z===P?z:`${z} - ${P}`;return{value:f,height:Math.floor(this.barScalingFunction(f)*h),binStart:$,binEnd:O,tooltip:L}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case"year":return 31536e6;case"month":return 2592e6;default:return 0}}get snapEndOffset(){return this.binSnapping!=="none"&&this._numBins>1?-1:0}get tooltipDateFormat(){var e;return(e=this._tooltipDateFormat)!==null&&e!==void 0?e:this.dateFormat}set tooltipDateFormat(e){this._tooltipDateFormat=e}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}const t=this.getMSFromString(e),s=!Number.isNaN(t),r=t<=this.getMSFromString(this.maxSelectedDate);s&&r&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}const t=this.getMSFromString(e),s=!Number.isNaN(t),r=t>=this.getMSFromString(this.minSelectedDate);s&&r&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){const e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){const e=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),t=this.translateDateToPosition(this.formatDate(e));return this.validMaxSliderX(t)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){var t,s;if(this._isDragging||this.disabled)return;const r=e.currentTarget,o=r.x.baseVal.value+this.sliderWidth/2,a=r.dataset,n=`${this.tooltipLabel}${a.numItems!=="1"?"s":""}`,l=Number(a.numItems).toLocaleString(),h=2,f=9+this.tooltipHeight,g=this.getBoundingClientRect(),y=g.x+o,$=g.y;this._tooltipOffsetX=y-h+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=$-f+window.scrollY,this._tooltipContent=M`
      ${l} ${n}<br />
      ${a.tooltip}
    `,(s=(t=this._tooltip).showPopover)===null||s===void 0||s.call(t)}hideTooltip(){var e,t;this._tooltipContent=void 0,(t=(e=this._tooltip).hidePopover)===null||t===void 0||t.call(e)}validMinSliderX(e){const t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){const t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener("pointermove",this.move),window.addEventListener("pointerup",this.drop),window.addEventListener("pointercancel",this.drop)}removeListeners(){window.removeEventListener("pointermove",this.move),window.removeEventListener("pointerup",this.drop),window.removeEventListener("pointercancel",this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;const e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated",e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;const t=this._currentSlider.id==="slider-min"?this.minSliderX:this.maxSliderX,s=this.getBoundingClientRect().x;this._dragOffset=e.clientX-s-t}translatePositionToDate(e){const t=this.snapToNextSecond((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){const t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,s){return Math.min(Math.max(e,t),s)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){const t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){const t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key==="Enter"){const t=e.currentTarget;t.blur(),t.id==="date-min"?this.handleMinDateInput(e):t.id==="date-max"&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){const t=typeof e=="string"?e:String(e);if((t.split(/(\d+)/).length-1)/2===1){const r=new Date(0,0);return r.setFullYear(Number(t)),r.getTime()}return ae(t,[this.dateFormat,rc]).valueOf()}handleBarClick(e){const t=e.currentTarget.dataset,s=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2,r=Math.abs(s-this.getMSFromString(this.minSelectedDate)),o=Math.abs(s-this.getMSFromString(this.maxSelectedDate));r<o?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){const e=oc,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,"slider-min",t)}get maxSliderTemplate(){const e=oc,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,"slider-max",t)}generateSliderSVG(e,t,s){const r=t==="slider-min"?1:-1,o=Ta({slider:!0,draggable:!this.disabled,dragging:this._isDragging});return ii`
    <svg
      id=${t}
      class=${o}
      @pointerdown=${this.drag}
    >
      <path d="${s} z" fill="${F2}" />
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
    `}get selectedRangeTemplate(){return ii`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${B2}"
      />`}get histogramTemplate(){const e=this._histWidth/this._numBins,t=e-1;let s=this.sliderWidth;return this._histData.map(r=>{const{minSelectedDate:o,maxSelectedDate:a}=this,n=r.height,l=this.isBefore(r.binEnd,o),h=this.isAfter(r.binStart,a),u=l||h?I2:R2,f=`stroke-dasharray: 0 ${t} ${n} ${t} 0 ${n}`,g=ii`
        <rect
          class="bar-pointer-target"
          x=${s}
          y="0"
          width=${t}
          height=${this.height}
          @pointerenter=${this.showTooltip}
          @pointerleave=${this.hideTooltip}
          @click=${this.handleBarClick}
          fill="transparent"
          data-num-items=${r.value}
          data-bin-start=${r.binStart}
          data-bin-end=${r.binEnd}
          data-tooltip=${r.tooltip}
        />
        <rect
          class="bar"
          style=${f}
          x=${s}
          y=${this.height-n}
          width=${t}
          height=${n}
          fill=${u}
        />`;return s+=e,g})}isBefore(e,t){const s=this.getMSFromString(e),r=this.getMSFromString(t);return s<r}isAfter(e,t){const s=this.getMSFromString(e),r=this.getMSFromString(t);return s>r}formatDate(e,t=this.dateFormat){if(Number.isNaN(e))return"";const s=ae(e);return s.year()<1e3?s.year(199999).format(t).replace(/199999/g,s.year().toString()):s.format(t)}get minInputTemplate(){return M`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${sc(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return M`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${sc(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return M`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return M`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){const e=Od({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`});return M`
      <div id="tooltip" style=${e} popover>${this._tooltipContent}</div>
    `}get histogramAccessibilityTemplate(){let e="";this.minSelectedDate&&this.maxSelectedDate?e=` from ${this.minSelectedDate} to ${this.maxSelectedDate}`:this.minSelectedDate?e=` from ${this.minSelectedDate}`:this.maxSelectedDate&&(e=` up to ${this.maxSelectedDate}`);const t=`Filter results for dates${e}`,s=`This histogram shows the distribution of dates${e}`;return M`<title id="histogram-title">${t}</title
      ><desc id="histogram-desc">${s}</desc>`}get noDataTemplate(){return M`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?M`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:Y}render(){return this.hasBinData?M`
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
    `:this.noDataTemplate}};K.styles=b`
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
      --activityIndicatorLoadingRingColor: ${z2};
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
      background: ${ac};
      margin: 0;
      border: 0;
      color: ${nc};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${W2};
      font-family: ${q2};
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
      border: 5px solid ${nc};
      border-color: ${ac} transparent transparent
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
      margin: ${N2};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${H2};
      margin: 0 3px;
      border: ${U2};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${V2};
      font-family: ${j2};
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
  `;c([T({type:Number})],K.prototype,"width",void 0);c([T({type:Number})],K.prototype,"height",void 0);c([T({type:Number})],K.prototype,"sliderWidth",void 0);c([T({type:Number})],K.prototype,"tooltipWidth",void 0);c([T({type:Number})],K.prototype,"tooltipHeight",void 0);c([T({type:Number})],K.prototype,"updateDelay",void 0);c([T({type:String})],K.prototype,"dateFormat",void 0);c([T({type:String})],K.prototype,"missingDataMessage",void 0);c([T({type:String})],K.prototype,"minDate",void 0);c([T({type:String})],K.prototype,"maxDate",void 0);c([T({type:Boolean})],K.prototype,"disabled",void 0);c([T({type:Array})],K.prototype,"bins",void 0);c([T({type:Boolean})],K.prototype,"updateWhileFocused",void 0);c([T({type:String})],K.prototype,"binSnapping",void 0);c([T({type:String})],K.prototype,"tooltipLabel",void 0);c([T({type:String})],K.prototype,"barScaling",void 0);c([ve()],K.prototype,"_tooltipOffsetX",void 0);c([ve()],K.prototype,"_tooltipOffsetY",void 0);c([ve()],K.prototype,"_tooltipContent",void 0);c([ve()],K.prototype,"_tooltipDateFormat",void 0);c([ve()],K.prototype,"_isDragging",void 0);c([ve()],K.prototype,"_isLoading",void 0);c([Be("#tooltip")],K.prototype,"_tooltip",void 0);c([T({type:String})],K.prototype,"tooltipDateFormat",null);c([T({type:Boolean})],K.prototype,"loading",null);c([T()],K.prototype,"minSelectedDate",null);c([T()],K.prototype,"maxSelectedDate",null);K=c([Qe("histogram-date-range")],K);var Vo,jo;let it=class extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}};it.finalized=!0,it._$litElement$=!0,(Vo=globalThis.litElementHydrateSupport)===null||Vo===void 0||Vo.call(globalThis,{LitElement:it});const lc=globalThis.litElementPolyfillSupport;lc?.({LitElement:it});((jo=globalThis.litElementVersions)!==null&&jo!==void 0?jo:globalThis.litElementVersions=[]).push("3.3.3");const Ss=ii`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,xs=ii`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;let le=class extends it{constructor(){super(...arguments),this.prompt="Do you find this feature useful?",this.buttonText="Beta",this.displayMode="button",this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return M`
      <div id="container">
        ${this.displayMode==="vote-prompt"?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has("vote")&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){const t=e??this.resizeObserver;t?.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=""}async showPopup(){this.voteSubmitted&&this.displayMode==="button"||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),s=window.innerWidth,r=window.innerHeight,o=s/2,a=r/2;e.left<o?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>s&&(this.popupTopX=s-t.width),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key==="Escape"&&this.cancel(e)}setupEscapeListener(){document.addEventListener("keyup",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keyup",this.boundEscapeListener)}setupScrollObserver(){document.addEventListener("scroll",this.boundScrollListener)}stopScrollObserver(){document.removeEventListener("scroll",this.boundScrollListener)}get singleButtonDisplay(){return M`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:""}"
          >${Ss}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:""}"
          id="beta-button-thumb-down"
          >${xs}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return M`
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
            ${Ss}
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
            ${xs}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            Leave a comment
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return M`
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
                ${Ss}
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
                ${xs}
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
            ${this.error?M`<div id="error">${this.error}</div>`:Y}
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
    `}get upvoteSelected(){return this.vote==="up"}get downvoteSelected(){return this.vote==="down"}upvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="up"?void 0:"up",this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote==="down"?void 0:"down",this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?"error":""}get upvoteButtonClass(){switch(this.vote){case"up":return"selected";case"down":return"unselected";default:return"noselection"}}get downvoteButtonClass(){switch(this.vote){case"up":return"unselected";case"down":return"selected";default:return"noselection"}}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e?.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=M`Please select a vote.`;return}if(!this.featureIdentifier)throw new Error("featureIdentifier is required");if(!this.featureFeedbackService)throw new Error("featureFeedbackService is required");if(!this.recaptchaWidget)throw new Error("recaptchaWidget is required");const t=this.isOpen;this.processing=!0;try{const s=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:s})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error=M`There was an error submitting your feedback.`}catch(s){this.error=M`There was an error submitting your feedback.<br />Error:
        ${s instanceof Error?s.message:s}`}this.processing=!1}static get styles(){const e=b`var(--featureFeedbackBlueColor, #194880)`,t=b`var(--featureFeedbackDarkGrayColor, #767676)`,s=b`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=b`var(--featureFeedbackBackdropZindex, 5)`,o=b`var(--featureFeedbackModalZindex, 6)`,a=b`var(--featureFeedbackPopupBorderColor, ${e})`,n=b`var(--featureFeedbackSubmitButtonColor, ${e})`,l=b`var(--featureFeedbackBetaButtonBorderColor, ${e})`,h=b`var(--featureFeedbackBetaButtonTextColor, ${e})`,u=b`var(--featureFeedbackBetaButtonSvgFilter, ${s})`,f=b`var(--featureFeedbackCancelButtonColor, #515151)`,g=b`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,y=b`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,$=b`var(--featureFeedbackPromptFontWeight, bold)`,_=b`var(--featureFeedbackPromptFontSize, 1.4rem)`,O=b`var(--featureFeedbackCommentButtonFontWeight, normal)`,z=b`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`,P=b`var(--defaultColor, ${t});`,L=b`var(--defaultColorSvgFilter, ${s});`,N=b`var(--upvoteColor, #23765D);`,se=b`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,Re=b`var(--downvoteColor, #720D11);`,Nt=b`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,At=b`var(--unselectedColor, #CCCCCC);`,ji=b`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return b`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${h};
        border: 1px solid ${l};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${u};
      }

      .beta-button-thumb.unselected svg {
        filter: ${ji};
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
        background-color: ${y};
        border: 1px ${a} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${o};
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
        font-size: ${_};
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
        background-color: ${f};
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
        border-color: ${P};
      }

      .vote-button.noselection svg {
        filter: ${L};
      }

      .vote-button.unselected {
        border-color: ${At};
      }

      .vote-button.unselected svg {
        filter: ${ji};
      }

      .upvote-button.selected {
        border-color: ${N};
      }

      .upvote-button.selected svg {
        filter: ${se};
      }

      .downvote-button.selected {
        border-color: ${Re};
      }

      .downvote-button.selected svg {
        filter: ${Nt};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${O};
        font-size: ${z};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};c([T({type:String})],le.prototype,"featureIdentifier",void 0);c([T({type:String})],le.prototype,"prompt",void 0);c([T({type:String})],le.prototype,"buttonText",void 0);c([T({type:String})],le.prototype,"displayMode",void 0);c([T({type:Object})],le.prototype,"recaptchaManager",void 0);c([T({type:Object})],le.prototype,"resizeObserver",void 0);c([T({type:Boolean})],le.prototype,"disabled",void 0);c([T({type:Object})],le.prototype,"featureFeedbackService",void 0);c([ve()],le.prototype,"isOpen",void 0);c([ve()],le.prototype,"processing",void 0);c([ve()],le.prototype,"popupTopX",void 0);c([ve()],le.prototype,"popupTopY",void 0);c([ve()],le.prototype,"vote",void 0);c([ve()],le.prototype,"voteSubmitted",void 0);c([ve()],le.prototype,"error",void 0);c([ve()],le.prototype,"voteNeedsChoosing",void 0);c([ve()],le.prototype,"recaptchaWidget",void 0);c([Be("#container")],le.prototype,"container",void 0);c([Be("#popup")],le.prototype,"popup",void 0);c([Be("#comments")],le.prototype,"comments",void 0);le=c([Qe("feature-feedback")],le);const G2=i=>typeof i!="string"&&"strTag"in i,Y2=(i,e,t)=>{let s=i[0];for(let r=1;r<i.length;r++)s+=e[r-1],s+=i[r];return s};const Q2=(i=>G2(i)?Y2(i.strings,i.values):i);class K2{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}}for(let i=0;i<256;i++)(i>>4&15).toString(16)+(i&15).toString(16);let X2=new K2;X2.resolve();let st=Q2;var Wo,qo;class nr extends Ne{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const s=super.createRenderRoot();return(e=(t=this.renderOptions).renderBefore)!==null&&e!==void 0||(t.renderBefore=s.firstChild),s}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=tt(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return ge}}nr.finalized=!0,nr._$litElement$=!0,(Wo=globalThis.litElementHydrateSupport)===null||Wo===void 0||Wo.call(globalThis,{LitElement:nr});const cc=globalThis.litElementPolyfillSupport;cc?.({LitElement:nr});((qo=globalThis.litElementVersions)!==null&&qo!==void 0?qo:globalThis.litElementVersions=[]).push("3.3.3");const dc=b`var(--white, #fff)`,Z2=b`var(--ia-theme-link-color, #4b64ff)`,J2=b`var(--primaryDisableCTAFill, #767676)`,e3=b`var(--secondaryCTABorder, #999)`,t3=b`var(--primaryCTAFill, #194880)`,Go=b`var(--primaryCTAFillRGB, 25, 72, 128)`,i3=b`var(--primaryCTABorder, #c5d1df)`,s3=b`var(--primaryErrorCTAFill, #d9534f)`,Yo=b`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,r3=b`var(--primaryErrorCTABorder, #d43f3a)`,o3=b`var(--secondaryCTAFill, #333)`,Qo=b`var(--secondaryCTAFillRGB, 51, 51, 51)`,a3=b`var(--primaryCTABorder, #979797)`,n3=b`var(---primaryWarningFill, #ee8950)`,Ko=b`var(--primaryWarningFillRGB, 238, 137, 80)`,l3=b`var(--primaryWarningBorder, #ec7939)`,c3=b`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${dc};
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
    outline-color: ${dc};
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
    background-color: ${J2};
    border: 1px solid ${e3};
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
    background-color: ${t3};
    border-color: ${i3};
  }
  .ia-button.primary:hover {
    background-color: rgba(${Go}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${Go}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${Go}, 0.7);
  }

  .ia-button.danger {
    background-color: ${s3};
    border-color: ${r3};
  }
  .ia-button.danger:hover {
    background-color: rgba(${Yo}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${Yo}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${Yo}, 0.7);
  }

  .ia-button.warning {
    background-color: ${n3};
    border-color: ${l3};
  }
  .ia-button.warning:hover {
    background-color: rgba(${Ko}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${Ko}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${Ko}, 0.7);
  }

  .ia-button.dark {
    background-color: ${o3};
    border-color: ${a3};
  }
  .ia-button.dark:hover {
    background-color: rgba(${Qo}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${Qo}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${Qo}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: ${Z2};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;b`
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
`;function hc(i){return"disabled"in i&&typeof i.disabled=="boolean"}function d3(i){return"numbered"in i&&typeof i.numbered=="boolean"}function h3(i){return"validate"in i&&typeof i.validate=="function"}function p3(i){return"response"in i&&typeof i.response=="object"&&i.response!==null&&"name"in i.response&&typeof i.response.name=="string"}class u3 extends Error{}async function Xo(i,e,t="Operation timed out"){const s=new Promise((r,o)=>setTimeout(o,e,new u3(t)));return Promise.race([i,s])}var Kt;let ie=Kt=class extends it{constructor(){super(...arguments),this.buttonText="Feedback",this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState="idle",this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key==="Escape"&&this.cancel(e)}}render(){return M`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has("submissionState")&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has("resizeObserver")){const t=e.get("resizeObserver");this.disconnectResizeObserver(t)}}updated(e){(e.has("showQuestionNumbers")||e.has("assignedElements"))&&this.applyQuestionNumbers();const t=e.get("submissionState");t&&(this.submissionState==="error"||t==="error")&&this.positionPopup(),e.has("isOpen")&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(hc).forEach(e=>{e.dataset.originallyDisabled=e.disabled?"true":"false",e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(hc).forEach(e=>{const{originallyDisabled:t}=e.dataset;if(t===void 0)return;const s=t==="true";delete e.dataset.originallyDisabled,e.disabled=s})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener("keyup",this.handleEscape)}removeEscapeListener(){document.removeEventListener("keyup",this.handleEscape)}setupScrollObserver(){document.addEventListener("scroll",this.handleScroll)}stopScrollObserver(){document.removeEventListener("scroll",this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){const t=e??this.resizeObserver;t?.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState("idle"),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent("submissionStateChanged",{detail:this.submissionState}))}get isProcessing(){return this.submissionState==="processing"}get isSubmitted(){return this.submissionState==="submitted"}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){const e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),s=window.innerWidth,r=window.innerHeight,o=s/2,a=r/2,n=5,l=5;e.left<o?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>s&&(this.popupTopX=s-t.width-n),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>r&&(this.popupTopY=r-t.height-l),this.popupTopX=Math.max(n,this.popupTopX),this.popupTopY=Math.max(l,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?M`
      <span class="beta-button-icon">${Ss}</span>
      <span class="beta-button-icon">${xs}</span>
    `:Y}get feedbackButtonCheckTemplate(){return M`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return M`
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
    `}get popupTemplate(){const e=this.isProcessing||this.isSubmitted,t=this.isProcessing?Kt.SUBMIT_BUTTON_PROCESSING_TEXT:Kt.SUBMIT_BUTTON_NORMAL_TEXT,s=this.error?M`<div id="error">${this.error}</div>`:Y,r=Od({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),o=a=>a.stopPropagation();return M`
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
          style=${r}
        >
          <h2 id="survey-heading" class="sr-only">${st("Feedback Survey")}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${o}
            @keydown=${o}
            @submit=${this.submit}
          >
            <slot id="questions-slot"></slot>
            ${s}
            <div id="actions">
              <button
                type="button"
                id="cancel-button"
                class="cta-button ia-button dark"
                tabindex="0"
                ?disabled=${e}
                @click=${this.cancel}
              >
                ${st("Cancel")}
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
    `}focusFirstFormElement(){const e=this.getRootNode();for(const t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(t=>{var s;(s=t.querySelector("[slot=question-number]"))===null||s===void 0||s.remove()});return}let e=1;this.assignedElements.filter(t=>d3(t)&&t.numbered).forEach(t=>{let s=t.querySelector("[slot=question-number]");s||(s=document.createElement("span"),s.setAttribute("slot","question-number")),s.textContent=`${e}. `,t.append(s),e+=1})}backgroundClicked(e){var t;e.target instanceof Node&&(!((t=this.popup)===null||t===void 0)&&t.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(h3).map(e=>e.validate()).every(e=>e)}async submit(e){if(e?.preventDefault(),!this.validate()){this.error=M`${Kt.ERROR_MESSAGE_MISSING_REQUIRED_INPUT}`,this.setSubmissionState("error");return}const{surveyIdentifier:t,submitTimeout:s,featureFeedbackService:r}=this;if(this.error=void 0,!t)throw new Error("surveyIdentifier is required");if(!r)throw new Error("featureFeedbackService is required");const o=this.getRecaptchaWidget();let a;try{a=await Xo(o,s)}catch(l){throw new Error(`recaptchaWidget load failed: ${l}`)}if(!a)throw new Error("recaptchaWidget is required");const n=this.isOpen;this.setSubmissionState("processing");try{const l=await Xo(a.execute(),s);(await Xo(r.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(p3).map(u=>u.response),recaptchaToken:l}),s)).success?(this.setSubmissionState("submitted"),n&&this.closePopup()):(this.error=M`${Kt.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}`,this.setSubmissionState("error"))}catch(l){this.error=M`${Kt.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}
        <br />
        ${st("Error: ")}${l instanceof Error?l.message:l}`,this.setSubmissionState("error")}}static get styles(){const e=b`var(--featureFeedbackBlueColor, #194880)`,t=b`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,s=b`var(--featureFeedbackBackdropZindex, 5)`,r=b`var(--featureFeedbackModalZindex, 6)`,o=b`var(--featureFeedbackPopupMaxWidth, 300px)`,a=b`var(--featureFeedbackPopupVerticalPadding, 10px)`,n=b`var(--featureFeedbackPopupHorizontalPadding, 10px)`,l=b`
      ${a} ${n}
    `,h=b`var(--featureFeedbackPopupBorderColor, ${e})`,u=b`var(--featureFeedbackBetaButtonBorderColor, ${e})`,f=b`var(--featureFeedbackBetaButtonTextColor, ${e})`,g=b`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,y=b`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,$=b`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`,_=b`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,O=b`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${f};
        border: 1px solid ${u};
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
        filter: ${_};
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
        z-index: ${s};
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
        max-width: ${o};
        max-height: calc(100vh - 2 * ${a} - 10px);
        padding: ${l};
        border: 1px ${h} solid;
        border-radius: 5px;
        background-color: ${$};
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${r};
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
    `;return[c3,O]}};ie.SUBMIT_BUTTON_NORMAL_TEXT=st("Submit feedback");ie.SUBMIT_BUTTON_PROCESSING_TEXT=st("Submitting...");ie.ERROR_MESSAGE_MISSING_REQUIRED_INPUT=st("Please respond to the indicated questions.");ie.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED=st("There was an error submitting your feedback.");c([T({type:String})],ie.prototype,"surveyIdentifier",void 0);c([T({type:String})],ie.prototype,"buttonText",void 0);c([T({type:Boolean})],ie.prototype,"showButtonThumbs",void 0);c([T({type:Boolean})],ie.prototype,"showQuestionNumbers",void 0);c([T({type:Boolean})],ie.prototype,"disabled",void 0);c([T({type:Number})],ie.prototype,"submitTimeout",void 0);c([T({type:Object})],ie.prototype,"featureFeedbackService",void 0);c([T({type:Object})],ie.prototype,"recaptchaManager",void 0);c([T({type:Object})],ie.prototype,"resizeObserver",void 0);c([ve()],ie.prototype,"isOpen",void 0);c([ve()],ie.prototype,"submissionState",void 0);c([ve()],ie.prototype,"popupTopX",void 0);c([ve()],ie.prototype,"popupTopY",void 0);c([ve()],ie.prototype,"error",void 0);c([Be("#container")],ie.prototype,"container",void 0);c([Be("#popup")],ie.prototype,"popup",void 0);c([Be("#cancel-button")],ie.prototype,"cancelButton",void 0);c([Be("#submit-button")],ie.prototype,"submitButton",void 0);c([Hc()],ie.prototype,"assignedElements",void 0);ie=Kt=c([Qe("ia-feedback-survey")],ie);var lr;let Ue=lr=class extends it{constructor(){super(),this.prompt="",this.value="",this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return M`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||!!this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A comment is required."),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){if(!this.prompt)return Y;const e=this.numbered?M`<slot name="question-number"></slot>`:Y;return M`<div id="prompt-text">${e}${this.prompt}</div>`}get commentBoxTemplate(){var e;const t=this.required?lr.DEFAULT_PLACEHOLDER_REQUIRED:lr.DEFAULT_PLACEHOLDER_OPTIONAL,s=(e=this.placeholder)!==null&&e!==void 0?e:t;return M`
      <textarea
        id="comments"
        tabindex="0"
        placeholder=${s}
        aria-labelledby="prompt-text"
        aria-required=${this.required}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.commentChanged}
      ></textarea>
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=b`var(--commentHeight, 50px)`,t=b`var(--commentResize, none)`,s=b`var(--surveyQuestionMargin, 0 0 15px 0)`,r=b`var(--featureFeedbackPromptFontWeight, bold)`,o=b`var(--featureFeedbackPromptFontSize, 1.4rem)`;return b`
      #container {
        margin: ${s};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${o};
        font-weight: ${r};
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
    `}};Ue.DEFAULT_PLACEHOLDER_REQUIRED=st("Comments");Ue.DEFAULT_PLACEHOLDER_OPTIONAL=st("Comments (optional)");Ue.formAssociated=!0;Ue.shadowRootOptions={...it.shadowRootOptions,delegatesFocus:!0};c([T({type:String})],Ue.prototype,"prompt",void 0);c([T({type:String})],Ue.prototype,"value",void 0);c([T({type:Boolean,reflect:!0})],Ue.prototype,"required",void 0);c([T({type:Boolean,reflect:!0})],Ue.prototype,"disabled",void 0);c([T({type:Boolean,reflect:!0})],Ue.prototype,"skipNumber",void 0);c([T({type:String})],Ue.prototype,"placeholder",void 0);c([Be("#comments")],Ue.prototype,"commentBox",void 0);Ue=lr=c([Qe("ia-survey-comment")],Ue);var cr;let Le=cr=class extends it{constructor(){super(),this.prompt="",this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return M`
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
    `}willUpdate(e){e.has("required")&&(this.internals.ariaRequired=this.required.toString()),e.has("disabled")&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},"A vote is required."),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){var e;return{...(e=this.commentBox)===null||e===void 0?void 0:e.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){if(!this.prompt)return Y;const e=this.numbered?M`<slot name="question-number"></slot>`:Y;return M`<div id="prompt-text">${e}${this.prompt}</div>`}get voteButtonsTemplate(){const e=this.vote==="up",t=this.vote==="down",r={"vote-button":!0,noselection:this.vote===void 0},o=Ta({...r,selected:e,unselected:t}),a=Ta({...r,selected:t,unselected:e});return M`
      <label
        id="upvote"
        class=${o}
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
        ${Ss}
        <span class="sr-only">${cr.UPVOTE_SR_LABEL}</span>
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
        ${xs}
        <span class="sr-only">${cr.DOWNVOTE_SR_LABEL}</span>
      </label>
    `}get commentFieldTemplate(){var e;return this.showComments?M`
      <ia-survey-comment
        id="comments"
        skipNumber
        .value=${(e=this.comment)!==null&&e!==void 0?e:""}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-survey-comment>
    `:Y}upvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key==="Enter"||e.key===" ")&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection("up")}downvoteButtonSelected(){this.handleVoteButtonSelection("down")}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){var t;e.stopPropagation(),!this.disabled&&(this.comment=(t=this.commentBox)===null||t===void 0?void 0:t.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent("responseChanged",{detail:this.response}))}static get styles(){const e=b`var(--surveyQuestionMargin, 0 0 15px 0)`,t=b`var(--featureFeedbackDarkGrayColor, #767676)`,s=b`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=b`var(--defaultColor, ${t})`,o=b`var(--defaultColorSvgFilter, ${s})`,a=b`var(--upvoteColor, #23765D)`,n=b`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,l=b`var(--downvoteColor, #720D11)`,h=b`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`,u=b`var(--unselectedColor, #CCCCCC)`,f=b`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,g=b`var(--featureFeedbackPromptFontWeight, bold)`,y=b`var(--featureFeedbackPromptFontSize, 1.4rem)`;return b`
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
        border-color: ${r};
      }

      .vote-button.noselection svg {
        filter: ${o};
      }

      .vote-button.unselected {
        border-color: ${u};
      }

      .vote-button.unselected svg {
        filter: ${f};
      }

      #upvote.selected {
        border-color: ${a};
      }

      #upvote.selected svg {
        filter: ${n};
      }

      #downvote.selected {
        border-color: ${l};
      }

      #downvote.selected svg {
        filter: ${h};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${u};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${f};
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
    `}};Le.UPVOTE_SR_LABEL=st("Vote up");Le.DOWNVOTE_SR_LABEL=st("Vote down");Le.formAssociated=!0;Le.shadowRootOptions={...it.shadowRootOptions,delegatesFocus:!0};c([T({type:String})],Le.prototype,"prompt",void 0);c([T({type:String})],Le.prototype,"vote",void 0);c([T({type:String})],Le.prototype,"comment",void 0);c([T({type:String})],Le.prototype,"commentPlaceholder",void 0);c([T({type:Boolean,reflect:!0})],Le.prototype,"required",void 0);c([T({type:Boolean,reflect:!0})],Le.prototype,"disabled",void 0);c([T({type:Boolean,reflect:!0})],Le.prototype,"skipNumber",void 0);c([T({type:Boolean,reflect:!0})],Le.prototype,"showComments",void 0);c([Be("#comments")],Le.prototype,"commentBox",void 0);Le=cr=c([Qe("ia-survey-vote")],Le);let Er=class extends it{constructor(){super(...arguments),this.name="",this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return Y}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};c([T({type:String,reflect:!0})],Er.prototype,"name",void 0);c([T({type:String,reflect:!0})],Er.prototype,"value",void 0);Er=c([Qe("ia-survey-extra")],Er);const f3=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`;var m3=Object.defineProperty,g3=Object.getOwnPropertyDescriptor,Ve=(i,e,t,s)=>{for(var r=s>1?void 0:s?g3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&m3(e,t,r),r};let Fe=class extends H{constructor(){super(...arguments),this.binSnapping="none",this.barScaling="logarithmic",this.boundEscapeListener=i=>{i.key==="Escape"&&this.closeModal()}}render(){return p`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${this.minSelectedDate??this.minDate}
          .maxSelectedDate=${this.maxSelectedDate??this.maxDate}
          dateFormat=${Ie(this.customDateFormat)}
          tooltipDateFormat=${Ie(this.customTooltipDateFormat)}
          tooltipLabel=${Ie(this.customTooltipLabel)}
          .binSnapping=${this.binSnapping}
          .barScaling=${this.barScaling??v}
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
            ${x("Apply date range")}
          </button>
        </histogram-date-range>
      </div>
    `}connectedCallback(){super.connectedCallback?.(),this.setupEscapeListener()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener("keydown",this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener("keydown",this.boundEscapeListener)}histogramDateRangeUpdated(i){this.minSelectedDate=i.detail.minDate,this.maxSelectedDate=i.detail.maxDate}applyBtnClicked(){const i=new CustomEvent("histogramDateRangeApplied",{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(i),this.closeModal(),this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent("modalClosed")))}static get styles(){return S`
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
    `}};Ve([d({type:String})],Fe.prototype,"minDate",2);Ve([d({type:String})],Fe.prototype,"maxDate",2);Ve([d({type:String})],Fe.prototype,"minSelectedDate",2);Ve([d({type:String})],Fe.prototype,"maxSelectedDate",2);Ve([d({type:Array})],Fe.prototype,"buckets",2);Ve([d({type:String})],Fe.prototype,"customDateFormat",2);Ve([d({type:String})],Fe.prototype,"customTooltipDateFormat",2);Ve([d({type:String})],Fe.prototype,"customTooltipLabel",2);Ve([d({type:String})],Fe.prototype,"binSnapping",2);Ve([d({type:String})],Fe.prototype,"barScaling",2);Ve([d({type:Object,attribute:!1})],Fe.prototype,"modalManager",2);Ve([d({type:Object,attribute:!1})],Fe.prototype,"analyticsHandler",2);Fe=Ve([U("expanded-date-picker")],Fe);let di=class extends H{constructor(){super(...arguments),this.loadingTitle=x("Loading..."),this.successTitle=x("Success"),this.errorTitle=x("Error"),this.loadingStyle="ring-dots",this.mode="loading"}render(){return p`${id(this.mode,[["loading",()=>this.loadingIndicatorTemplate],["success",()=>this.successIndicatorTemplate],["error",()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return p`
      <svg
        class="loading-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.loadingTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="loading-ring"
            d="M60,10 C69.8019971,10 78.9452178,12.8205573 86.6623125,17.6943223 L76.4086287,27.9484118 C71.4880919,25.4243078 65.9103784,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 C96,53.3014663 94.1704984,47.0302355 90.9839104,41.6587228 L101.110332,31.5326452 C106.715332,39.6116982 110,49.4222615 110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <g
            class="loading-dots ${this.shouldShowLoadingDots?"":"hidden"}"
            transform="translate(40.000000, 55.000000)"
          >
            <circle id="left-dot" cx="5" cy="5" r="5"></circle>
            <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
            <circle id="right-dot" cx="35" cy="5" r="5"></circle>
          </g>
        </g>
      </svg>
    `}get successIndicatorTemplate(){return p`
      <svg
        class="success-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.successTitle}</title>
        <g stroke="none" stroke-width="1" fill-rule="evenodd">
          <path
            class="success-icon"
            d="M60,10 C70.5816709,10 80.3955961,13.2871104 88.4763646,18.8959201 L78.3502633,29.0214223 C72.9767592,25.8315427 66.7022695,24 60,24 C40.117749,24 24,40.117749 24,60 C24,79.882251 40.117749,96 60,96 C79.882251,96 96,79.882251 96,60 L95.995,59.46 L108.327675,47.128668 C109.350926,50.9806166 109.925886,55.015198 109.993301,59.1731586 L110,60 C110,87.6142375 87.6142375,110 60,110 C32.3857625,110 10,87.6142375 10,60 C10,32.3857625 32.3857625,10 60,10 Z"
          ></path>
          <polygon
            class="success-icon"
            transform="translate(75.000000, 41.500000) rotate(44.000000) translate(-75.000000, -41.500000) "
            points="96 85 54 85 54 65 76 64.999 76 -2 96 -2"
          ></polygon>
        </g>
      </svg>
    `}get errorIndicatorTemplate(){return p`
      <svg
        class="error-indicator"
        viewBox="0 0 120 120"
        preserveAspectRatio="none"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        role="status"
      >
        <title>${this.errorTitle}</title>
        <path
          class="error-icon"
          d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
        />
      </svg>
    `}get shouldShowLoadingDots(){return this.loadingStyle!=="ring"}static get styles(){return[td,S`
        :host {
          --indicator-width--: var(--icon-width);

          /* Loading */
          --loading-ring-color--: var(--primary-text-color);
          --loading-dot-color--: var(--primary-text-color);

          /* Success */
          --success-icon-color--: var(--color-success);

          /* Error */
          --error-icon-color--: var(--color-danger);

          display: inline-block;
          width: var(--indicator-width--);
        }

        .success-icon {
          fill: var(--success-icon-color--);
        }

        .error-icon {
          fill: var(--error-icon-color--);
        }

        .loading-ring {
          fill: var(--loading-ring-color--);
          animation: rotate 1.3s infinite linear;
          transform-origin: 50px 50px;
          transform-box: fill-box;
        }

        .loading-dots {
          fill: var(--loading-dot-color--);
          transition: opacity 0.25s ease-out;
        }

        .loading-dots.hidden {
          display: none;
        }

        .loading-dots > * {
          opacity: 0;
          animation: dot 1.3s infinite;
        }

        .loading-dots #left-dot {
          animation-delay: 0.2s;
        }

        .loading-dots #middle-dot {
          animation-delay: 0.4s;
        }

        .loading-dots #right-dot {
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
      `]}};c([d({type:String})],di.prototype,"loadingTitle",void 0);c([d({type:String})],di.prototype,"successTitle",void 0);c([d({type:String})],di.prototype,"errorTitle",void 0);c([d({type:String})],di.prototype,"loadingStyle",void 0);c([d({type:String})],di.prototype,"mode",void 0);di=c([U("ia-status-indicator")],di);const v3=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,b3=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`;var y3=Object.defineProperty,w3=Object.getOwnPropertyDescriptor,Rs=(i,e,t,s)=>{for(var r=s>1?void 0:s?w3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&y3(e,t,r),r};let Ri=class extends H{constructor(){super(...arguments),this.step=2,this.currentPage=1,this.pages=[]}firstUpdated(){this.observePageCount()}updated(i){i.has("size")&&this.observePageCount(),i.has("currentPage")&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];const i=7,e=this.size<=i;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}if(this.size===i){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(e&&this.currentPage>1&&this.currentPage<i){this.pages=[...Array(this.size).keys()].map(r=>r+1);return}let t=this.currentPage-this.step,s=this.currentPage+this.step;t<=0&&(s+=-t+1,t=1),s>=this.size&&(t=Math.max(t-(s-this.size),1),s=this.size),t===2&&(s-=1),s===this.size-1&&(t+=1),this.createFirstNode(t),this.createMiddelNode(t,s),this.createLastNode(s)}createFirstNode(i){i>1&&this.pages?.push(1),i>2&&this.pages?.push(0)}createMiddelNode(i,e){for(let t=i;t<=e;t+=1)this.pages?.push(t)}createLastNode(i){i<this.size-1&&this.pages?.push(0),i<this.size&&this.pages?.push(this.size)}get getEllipsisTemplate(){return p`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent("pageNumberClicked",{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){this.currentPage-=1,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(i){this.currentPage=i}getPageTemplate(i){return p`
      <button
        @click=${()=>this.onChange(i)}
        class=${this.currentPage===i?"current":""}
        data-page=${i}
      >
        ${i}
      </button>
    `}get getPagesTemplate(){return!this.pages||!this.pages.length?v:p`
      ${this.pages?.map(i=>p`${i!==0?this.getPageTemplate(i):this.getEllipsisTemplate}`)}
    `}render(){return p`
      <div class="facets-pagination">
        <button class="arrow-icon rewind" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${v3}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${b3}
        </button>
      </div>
    `}static get styles(){return[ct,S`
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
      `]}};Rs([d({type:Number})],Ri.prototype,"size",2);Rs([d({type:Number})],Ri.prototype,"step",2);Rs([d({type:Number})],Ri.prototype,"currentPage",2);Rs([R()],Ri.prototype,"pages",2);Ri=Rs([U("more-facets-pagination")],Ri);const pc=(i,e,t)=>{const s=new Map;for(let r=e;r<=t;r++)s.set(i[r],r);return s},Dd=Ds(class extends Ls{constructor(i){if(super(i),i.type!==ut.CHILD)throw Error("repeat() can only be used in text expressions")}dt(i,e,t){let s;t===void 0?t=e:e!==void 0&&(s=e);const r=[],o=[];let a=0;for(const n of i)r[a]=s?s(n,a):a,o[a]=t(n,a),a++;return{values:o,keys:r}}render(i,e,t){return this.dt(i,e,t).values}update(i,[e,t,s]){const r=ip(i),{values:o,keys:a}=this.dt(e,t,s);if(!Array.isArray(r))return this.ut=a,o;const n=this.ut??=[],l=[];let h,u,f=0,g=r.length-1,y=0,$=o.length-1;for(;f<=g&&y<=$;)if(r[f]===null)f++;else if(r[g]===null)g--;else if(n[f]===a[y])l[y]=qt(r[f],o[y]),f++,y++;else if(n[g]===a[$])l[$]=qt(r[g],o[$]),g--,$--;else if(n[f]===a[$])l[$]=qt(r[f],o[$]),es(i,l[$+1],r[f]),f++,$--;else if(n[g]===a[y])l[y]=qt(r[g],o[y]),es(i,r[f],r[g]),g--,y++;else if(h===void 0&&(h=pc(a,y,$),u=pc(n,f,g)),h.has(n[f]))if(h.has(n[g])){const _=u.get(a[y]),O=_!==void 0?r[_]:null;if(O===null){const z=es(i,r[f]);qt(z,o[y]),l[y]=z}else l[y]=qt(O,o[y]),es(i,r[f],O),r[_]=null;y++}else yo(r[g]),g--;else yo(r[f]),f++;for(;y<=$;){const _=es(i,l[$+1]);qt(_,o[y]),l[y++]=_}for(;f<=g;){const _=r[f++];_!==null&&yo(_)}return this.ut=a,ed(i,l),We}}),$3=Q`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,S3=Q`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`;var x3=Object.defineProperty,C3=Object.getOwnPropertyDescriptor,jr=(i,e,t,s)=>{for(var r=s>1?void 0:s?C3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&x3(e,t,r),r};let zi=class extends H{render(){return p`${this.facetRowTemplate}`}get facetRowTemplate(){const{bucket:i,facetType:e}=this;if(!i||!e)return v;const t=`${e}:${i.key}-show-only`,s=`${e}:${i.key}-negative`,r=i.extraNote?p`<span class="facet-note">${i.extraNote}</span>`:v,o=e!=="collection"?p`${i.displayText??i.key} ${r}`:p`<a href="/details/${i.key}">
            ${this.collectionTitles?.get(i.key)??i.key}
          </a> `,a=i.count>0?i.count.toLocaleString():"",n=i.state==="hidden",l=i.state==="selected",h=`${e}: ${i.displayText??i.key}`,u=l?`Show all ${e}s`:`Only show ${h}`,f=`Hide ${h}`,g=`Unhide ${h}`,y=n?g:f,$=`${h}, ${i.count} results`;return p`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${e}
            .value=${i.key}
            @click=${_=>{this.facetClicked(_,!1)}}
            .checked=${l}
            class="select-facet-checkbox"
            title=${u}
            id=${t}
            data-testid=${t}
          />
          <div class="hide-facet-container">
            <input
              type="checkbox"
              id=${s}
              .name=${e}
              .value=${i.key}
              @click=${_=>{this.facetClicked(_,!0)}}
              .checked=${n}
              class="hide-facet-checkbox"
            />
            <label
              for=${s}
              class="hide-facet-icon${n?" active":""}"
              title=${y}
              data-testid=${s}
            >
              <span class="sr-only">${y}</span>
              <span class="eye eye-open">${$3}</span>
              <span class="eye eye-closed">${S3}</span>
            </label>
          </div>
        </div>
        <label
          for=${t}
          class="facet-info-display"
          title=${u}
          aria-label=${$}
        >
          <div class="facet-title">${o}</div>
          <div class="facet-count">${a}</div>
        </label>
      </div>
    `}facetClicked(i,e){const{bucket:t,facetType:s}=this;if(!t||!s)return;const r=i.target,{checked:o}=r;this.bucket={...t,state:zi.getFacetState(o,e)},this.dispatchFacetClickEvent({facetType:s,bucket:this.bucket,negative:e})}dispatchFacetClickEvent(i){const e=new CustomEvent("facetClick",{detail:i});this.dispatchEvent(e)}static getFacetState(i,e){let t;return i?t=e?"hidden":"selected":t="none",t}static get styles(){const i=S`var(--facet-row-border-top, 1px solid transparent)`,e=S`var(--facet-row-border-bottom, 1px solid transparent)`,t=S`15px`,s=S`
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: ${t};
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: ${t};
        width: ${t};
        margin: 0;
      }
      .facet-row-container {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 0 auto;
        padding: 0.25rem 0;
        height: auto;
        border-top: ${i};
        border-bottom: ${e};
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
        width: ${t};
        height: ${t};
        cursor: pointer;
        display: flex;
      }
      .eye {
        width: ${t};
        height: ${t};
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
    `;return[ct,s]}};jr([d({type:String})],zi.prototype,"facetType",2);jr([d({type:Object})],zi.prototype,"bucket",2);jr([d({type:Object})],zi.prototype,"collectionTitles",2);zi=jr([U("facet-row")],zi);var _3=Object.defineProperty,T3=Object.getOwnPropertyDescriptor,ln=(i,e,t,s)=>{for(var r=s>1?void 0:s?T3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&_3(e,t,r),r};let Ar=class extends H{facetClicked(i){this.dispatchFacetClickEvent(i.detail)}dispatchFacetClickEvent(i){const e=new CustomEvent("facetClick",{detail:i,composed:!0});this.dispatchEvent(e)}get facetsTemplate(){const{facetGroup:i}=this;if(!i)return v;const e=i.buckets;return p`
      <div class="facet-rows" data-testid="facets-on-${i.key}">
        ${Dd(e,t=>`${i.key}:${t.key}`,t=>p`<facet-row
              .facetType=${i.key}
              .bucket=${t}
              .collectionTitles=${this.collectionTitles}
              @facetClick=${this.facetClicked}
            ></facet-row>`)}
      </div>
    `}render(){return p`${this.facetsTemplate}`}static get styles(){const i=S`var(--facetsColumnCount, 1)`,e=S`var(--facetsColumnGap, 15px)`;return S`
      .facet-rows {
        column-count: ${i};
        column-gap: ${e};
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `}};ln([d({type:Object})],Ar.prototype,"facetGroup",2);ln([d({type:Object})],Ar.prototype,"collectionTitles",2);Ar=ln([U("facets-template")],Ar);var k3=Object.defineProperty,E3=Object.getOwnPropertyDescriptor,pi=(i,e,t,s)=>{for(var r=s>1?void 0:s?E3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&k3(e,t,r),r};let zt=class extends H{constructor(){super(...arguments),this.leftValue="",this.rightValue="",this.side="left"}render(){return p`
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
    `}get value(){return this.side==="left"?this.leftValue:this.rightValue}get selectedLabel(){return this.side==="left"?this.leftLabel??this.leftValue:this.rightLabel??this.rightValue}handleClick(){this.side=this.side==="left"?"right":"left",this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?"left":"right",this.emitChangeEvent()}emitChangeEvent(){const i=new CustomEvent("change",{detail:this.value});this.dispatchEvent(i)}static get styles(){const i=S`var(--switchWidth, 30px)`,e=S`var(--switchHeight, 14px)`,t=S`var(--switchMarginLeft, 5px)`,s=S`var(--switchMarginRight, 5px)`,r=S`var(--switchBorderWidth, 3px)`,o=S`var(--switchBgColor, #194880)`,a=S`var(--switchBorderColor, #194880)`,n=S`var(--labelFontSize, 1.3rem)`,l=S`var(--knobColor, white)`,h=S`var(--knobTransitionDuration, 0.25s)`,u=S`var(--knobTransitionFn, ease)`;return[ct,S`
        #container {
          display: inline-flex;
          align-items: center;
          flex-wrap: nowrap;
          font-size: ${n};
        }

        #switch-button {
          width: ${i};
          height: ${e};
          margin: 0 ${s} 0 ${t};
          padding: 0;
          border: ${r} solid ${a};
          border-radius: ${e};
          box-sizing: content-box;
          background: ${o};
          appearance: none;
          cursor: pointer;
        }

        #switch-button.left #knob {
          transform: translateX(0);
        }

        #switch-button.right #knob {
          transform: translateX(calc(${i} - ${e}));
        }

        #switch-button:focus-visible {
          outline: 2px solid black;
          outline-offset: 2px;
        }

        #knob {
          display: block;
          width: ${e};
          height: ${e};
          border-radius: 50%;
          background: ${l};
          transition: transform ${h} ${u};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};pi([d({type:String,attribute:!0})],zt.prototype,"leftValue",2);pi([d({type:String,attribute:!0})],zt.prototype,"leftLabel",2);pi([d({type:String,attribute:!0})],zt.prototype,"rightValue",2);pi([d({type:String,attribute:!0})],zt.prototype,"rightLabel",2);pi([d({type:String,attribute:!0})],zt.prototype,"side",2);pi([Z("#switch-left")],zt.prototype,"leftRadio",2);zt=pi([U("toggle-switch")],zt);const A3=1e4,M3=35;var P3=Object.defineProperty,O3=Object.getOwnPropertyDescriptor,me=(i,e,t,s)=>{for(var r=s>1?void 0:s?O3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&P3(e,t,r),r};let ce=class extends H{constructor(){super(...arguments),this.facetsPerPage=M3,this.facetsLoading=!0,this.sortedBy=G.COUNT,this.isTvSearch=!1,this.unappliedFacetChanges=xt(),this.pageNumber=1}willUpdate(i){(i.has("aggregations")||i.has("facetsPerPage")||i.has("sortedBy")||i.has("selectedFacets")||i.has("unappliedFacetChanges"))&&(this.facetGroup=this.mergedFacets)}updated(i){(i.has("facetKey")||i.has("query")||i.has("searchType")||i.has("filterMap"))&&(this.facetsLoading=!0,this.pageNumber=1,this.sortedBy=gs[this.facetKey],this.updateSpecificFacets())}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener("keydown",i=>{i.key==="Escape"&&this.modalManager?.closeModal()}):document.removeEventListener("keydown",()=>{})}get isSearchResultsPage(){const i=this.pageSpecifierParams?.pageType;return i===void 0||i==="search_results"}async updateSpecificFacets(){if(!this.facetKey)return;const i=this.query?.trim();if(!i&&this.isSearchResultsPage)return;const e={simpleParams:[this.facetKey]},t=A3,s={...this.pageSpecifierParams,query:i||"",identifiers:this.identifiers,filters:this.filterMap,aggregations:e,aggregationsSize:t,rows:0},r=await this.searchService?.search(s,this.searchType);this.aggregations=r?.success?.response.aggregations,this.facetsLoading=!1;const o=r?.success?.response?.collectionTitles;if(o)for(const[a,n]of Object.entries(o))this.collectionTitles?.set(a,n)}pageNumberClicked(i){const e=i?.detail?.page;e&&(this.pageNumber=Number(e)),this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){if(!this.facetKey||!this.selectedFacets)return;const{selectedFacetGroup:i,aggregationFacetGroup:e}=this;if(!e)return;const t={...i??e},s=i?.buckets.map(o=>{const a=e.buckets.find(n=>n.key===o.key);return a?{...o,count:a.count}:o})??[];Zc(s,this.sortedBy),e.buckets.forEach(o=>{i?.buckets.find(n=>n.key===o.key)||s.push(o)});const r=this.unappliedFacetChanges[this.facetKey];for(const[o,a]of s.entries()){const n=r?.[a.key];n&&(s[o]={...n})}return this.facetKey==="creator"&&this.isTvSearch&&s.forEach(o=>{o.displayText=(o.displayText??o.key)?.toLocaleUpperCase();const a=this.tvChannelAliases?.get(o.displayText);a&&a!==o.displayText&&(o.extraNote=`(${a})`)}),t.buckets=s,t}get selectedFacetGroup(){if(!this.selectedFacets||!this.facetKey)return;const i=this.selectedFacets[this.facetKey];if(!i)return;const e=wr[this.facetKey],t=Object.entries(i).map(([s,r])=>({displayText:s,key:s,count:r?.count,state:r?.state}));return{title:e,key:this.facetKey,buckets:t}}get aggregationFacetGroup(){if(!this.aggregations||!this.facetKey)return;const i=this.aggregations[this.facetKey];if(!i)return;const e=wr[this.facetKey];let t=i.getSortedBuckets(this.sortedBy);this.facetKey==="collection"&&(t=t?.filter(r=>{const o=r?.key?.toString();return!Nr[o]&&!o?.startsWith("fav-")}));const s=t.map(r=>{const o=`${r.key}`;return{displayText:`${o}`,key:`${o}`,count:r.doc_count,state:"none"}});return{title:e,key:this.facetKey,buckets:s}}get facetGroupForCurrentPage(){const{facetGroup:i}=this;if(!i)return;const e=(this.pageNumber-1)*this.facetsPerPage,t=i.buckets.slice(e,e+this.facetsPerPage);return{...i,buckets:t}}get moreFacetsTemplate(){return p`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${i=>{this.facetKey&&(this.unappliedFacetChanges=ei(this.unappliedFacetChanges,this.facetKey,i.detail.bucket))}}
      ></facets-template>
    `}get loaderTemplate(){return p`
      <ia-status-indicator
        class="facets-loader"
        mode="loading"
      ></ia-status-indicator>
    `}get paginationSize(){if(!this.aggregations||!this.facetKey)return 0;const i=this.aggregations[this.facetKey]?.buckets.length;return Math.ceil(i/this.facetsPerPage)}get facetsPaginationTemplate(){return this.paginationSize>1?p`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`:v}get footerTemplate(){return this.paginationSize>0?p`${this.facetsPaginationTemplate}
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
        </div> `:v}sortFacetAggregation(i){this.sortedBy=i,this.dispatchEvent(new CustomEvent("sortedFacets",{detail:this.sortedBy}))}get modalHeaderTemplate(){const e=(this.sortedBy??gs[this.facetKey])===G.COUNT?"left":"right";return p`<span class="sr-only">${x("More facets for:")}</span>
      <span class="title">
        ${this.facetGroup?.title}

        <label class="sort-label">${x("Sort by:")}</label>
        ${this.facetKey?p`<toggle-switch
              class="sort-toggle"
              leftValue=${G.COUNT}
              leftLabel="Count"
              rightValue=${j1[this.facetKey]}
              .rightLabel=${this.facetGroup?.title}
              side=${e}
              @change=${t=>{this.sortFacetAggregation(Number(t.detail))}}
            ></toggle-switch>`:v}
      </span>`}render(){return p`
      ${this.facetsLoading?this.loaderTemplate:p`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){const i=Xc(this.selectedFacets,this.unappliedFacetChanges),e=new CustomEvent("facetsChanged",{detail:i,bubbles:!0,composed:!0});this.dispatchEvent(e),this.unappliedFacetChanges=xt(),this.modalManager?.closeModal(),this.analyticsHandler?.sendEvent({category:Ct.default,action:`${ne.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){this.unappliedFacetChanges=xt(),this.modalManager?.closeModal(),this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){const i=S`var(--primaryButtonBGColor, #194880)`;return[ct,S`
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
          --icon-width: 70px;
          margin-bottom: 20px;
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
          background-color: ${i};
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
      `]}};me([d({type:String})],ce.prototype,"facetKey",2);me([d({type:String})],ce.prototype,"query",2);me([d({type:Array})],ce.prototype,"identifiers",2);me([d({type:Object})],ce.prototype,"filterMap",2);me([d({type:Number})],ce.prototype,"searchType",2);me([d({type:Object})],ce.prototype,"pageSpecifierParams",2);me([d({type:Object})],ce.prototype,"collectionTitles",2);me([d({type:Object})],ce.prototype,"tvChannelAliases",2);me([d({type:Number})],ce.prototype,"facetsPerPage",2);me([d({type:Boolean})],ce.prototype,"facetsLoading",2);me([d({type:Object})],ce.prototype,"selectedFacets",2);me([d({type:Number})],ce.prototype,"sortedBy",2);me([d({type:Boolean})],ce.prototype,"isTvSearch",2);me([d({type:Object})],ce.prototype,"modalManager",2);me([d({type:Object})],ce.prototype,"searchService",2);me([d({type:Object,attribute:!1})],ce.prototype,"analyticsHandler",2);me([R()],ce.prototype,"aggregations",2);me([R()],ce.prototype,"facetGroup",2);me([R()],ce.prototype,"unappliedFacetChanges",2);me([R()],ce.prototype,"pageNumber",2);ce=me([U("more-facets-content")],ce);var D3=Object.getOwnPropertyDescriptor,L3=(i,e,t,s)=>{for(var r=s>1?void 0:s?D3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(r)||r);return r};let uc=class extends H{render(){return p`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return S`
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
    `}};uc=L3([U("facet-tombstone-row")],uc);var F3=Object.defineProperty,B3=Object.getOwnPropertyDescriptor,q=(i,e,t,s)=>{for(var r=s>1?void 0:s?B3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&F3(e,t,r),r};let W=class extends H{constructor(){super(...arguments),this.moreLinksVisible=!0,this.facetsLoading=!1,this.histogramAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.allowExpandingDatePicker=!1,this.suppressMediatypeFacets=!1,this.parentCollections=[],this.collectionPagePath="/details/",this.isManageView=!1,this.isTvSearch=!1,this.facetDisplayOrder=qc,this.openFacets={subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1,clip_type:!1,program:!1,person:!1,sponsor:!1},this.allowedFacetCount=6,this.handleExpandedDatePickerClosed=()=>{this.modalManager?.classList.remove("expanded-date-picker")},this.histogramDateRangeUpdated=i=>{const{minDate:e,maxDate:t}=i.detail,s=new CustomEvent("histogramDateRangeUpdated",{detail:{minDate:e,maxDate:t}});this.dispatchEvent(s)}}render(){const i=qe({loading:this.facetsLoading,managing:this.isManageView}),e=this.isTvSearch?x("Date Published"):x("Year Published"),t="date-picker-label";return p`
      <div id="container" class=${i}>
        ${this.showHistogramDatePicker&&(this.histogramAggregation||this.histogramAggregationLoading)?p`
              <section
                class="facet-group"
                aria-labelledby=${t}
                data-testid="facet-group-header-label-date-picker"
              >
                <h3 id=${t}>
                  ${e} <span class="sr-only">${x("range filter")}</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `:v}
        ${this.collectionPartOfTemplate}
        <slot name="facets-top"></slot>
        ${this.mergedFacets.map(s=>this.getFacetGroupTemplate(s))}
      </div>
    `}get collectionPartOfTemplate(){if(!this.parentCollections?.length)return v;const i="partof-heading";return p`
      <section
        class="facet-group partof-collections"
        aria-labelledby=${i}
        data-testid="facet-group-partof-collections"
      >
        <div class="facet-group-header">
          <h3 id=${i}>${x("Part Of")}</h3>
        </div>
        <ul>
          ${si(this.parentCollections,e=>{const t=`${this.baseNavigationUrl}${this.collectionPagePath}${e}`;return p` <li>
              <a
                href=${t}
                data-id=${e}
                @click=${this.partOfCollectionClicked}
              >
                ${this.collectionTitles?.get(e)??e}
              </a>
            </li>`})}
        </ul>
      </section>
    `}partOfCollectionClicked(i){this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.partOfCollectionClicked,label:i.target.dataset.id})}get histogramProps(){const{histogramAggregation:i}=this;if(!i)return;const e=i.first_bucket_year??i.first_bucket_key,t=i.last_bucket_year??i.last_bucket_key;if(e==null||t==null)return;const s=i.first_bucket_month??1,r=i.last_bucket_month??12,o=i.interval??1,a=i.interval_in_months??12,n=l=>l.toString().padStart(2,"0");if(this.isTvSearch){const l=a<12;return{buckets:i.buckets,dateFormat:"YYYY-MM",tooltipDateFormat:l?"MMM YYYY":"YYYY",tooltipLabel:"broadcast",binSnapping:l?"month":"year",barScaling:"linear",minDate:`${e}-${n(s)}`,maxDate:`${t}-${n(r+a-1)}`}}return{buckets:i.buckets,dateFormat:"YYYY",tooltipDateFormat:"YYYY",tooltipLabel:"item",binSnapping:"year",barScaling:"logarithmic",minDate:`${e}`,maxDate:`${t+o-1}`}}showDatePickerModal(){const{histogramProps:i}=this;if(!i)return;const{buckets:e,dateFormat:t,tooltipDateFormat:s,tooltipLabel:r,binSnapping:o,barScaling:a,minDate:n,maxDate:l}=i,u=p`
      <expanded-date-picker
        ${Yu(g=>{if(g&&g instanceof Fe){const y=g;y.minSelectedDate=this.minSelectedDate,y.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${n}
        .maxDate=${l}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .customDateFormat=${t}
        .customTooltipDateFormat=${s}
        .customTooltipLabel=${r}
        .binSnapping=${o}
        .barScaling=${a}
        .buckets=${e}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,f=new ri({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:p`${x("Select a date range")}`});this.modalManager?.classList.add("expanded-date-picker"),this.modalManager?.showModal({config:f,customModalContent:u,userClosedModalCallback:this.handleExpandedDatePickerClosed}),this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.histogramExpanded,label:window.location.href})}updated(i){i.has("selectedFacets")&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){const i=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(i)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?p`<button
          class="expand-date-picker-btn"
          aria-haspopup="dialog"
          @click=${this.showDatePickerModal}
        >
          <span class="sr-only">${x("Expand date histogram")}</span>
          <span aria-hidden="true">${f3}</span>
        </button>`:v}get histogramTemplate(){if(this.histogramAggregationLoading)return p` <div class="histogram-loading-indicator">&hellip;</div> `;const{histogramProps:i}=this;if(!i)return v;const{buckets:e,dateFormat:t,tooltipDateFormat:s,tooltipLabel:r,binSnapping:o,barScaling:a,minDate:n,maxDate:l}=i;return p`
      <histogram-date-range
        class=${this.isTvSearch?"wide-inputs":""}
        .minDate=${n}
        .maxDate=${l}
        .minSelectedDate=${this.minSelectedDate??n}
        .maxSelectedDate=${this.maxSelectedDate??l}
        .updateDelay=${100}
        .dateFormat=${t}
        .tooltipDateFormat=${s}
        .tooltipLabel=${r}
        .binSnapping=${o}
        .barScaling=${a}
        .bins=${e}
        missingDataMessage="..."
        .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}get mergedFacets(){const i=[];return this.facetDisplayOrder.forEach(e=>{if(e==="mediatype"&&this.suppressMediatypeFacets)return;const t=this.selectedFacetGroups.find(n=>n.key===e),s=this.aggregationFacetGroups.find(n=>n.key===e);if(t&&!s){i.push(t);return}if(!s)return;const r=t??s;let o=t?.buckets.map(n=>{const l=s.buckets.find(h=>h.key===n.key);return l?{...n,count:l.count}:n})??[];s.buckets.forEach(n=>{o.find(h=>h.key===n.key)||o.push(n)});let a=Object.keys(t?.buckets||[])?.length;if(a<this.allowedFacetCount&&(a=this.allowedFacetCount),e==="lending"&&(o=o.filter(n=>W1[n.key])),Zc(o,gs[e]),e==="mediatype"){const n=o.findIndex(l=>l.key==="collection");if(n>=a){const[l]=o.splice(n,1);a>this.allowedFacetCount&&(a+=1),o.splice(a-1,0,l)}}e==="creator"&&this.isTvSearch&&o.forEach(n=>{n.displayText=(n.displayText??n.key)?.toLocaleUpperCase();const l=this.tvChannelAliases?.get(n.displayText);l&&l!==n.displayText&&(n.extraNote=`(${l})`)}),e==="clip_type"&&o.forEach(n=>{n.displayText??=n.key,n.displayText=n.displayText.charAt(0).toLocaleUpperCase()+n.displayText.slice(1)}),r.buckets=o.slice(0,a),i.push(r)}),i}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([e,t])=>{const s=e,r=wr[s],o=Object.entries(t).map(([a,n])=>{let l=a;return s==="lending"&&(l=xl[a]??a),{displayText:l,key:a,count:n.count,state:n.state}});return{title:r,key:s,buckets:o}}):[]}get aggregationFacetGroups(){const i=[];return Object.entries(this.aggregations??[]).forEach(([e,t])=>{if(["year_histogram","date_histogram"].includes(e))return;const s=e,r=wr[s];if(!r)return;let o=t.getSortedBuckets(gs[s]);s==="collection"&&(o=o?.filter(l=>{const h=l?.key?.toString();return!Nr[h]&&!h?.startsWith("fav-")}));const a=o.map(l=>{const h=l.key;let u=`${l.key}`;return s==="lending"&&(u=xl[l.key]??`${l.key}`),{displayText:u,key:`${h}`,count:l.doc_count,state:"none"}}),n={title:r,key:s,buckets:a};i.push(n)}),i}getFacetGroupTemplate(i){if(!this.facetsLoading&&i.buckets.length===0)return v;const{key:e}=i,t=this.openFacets[e],s=p`
      <span class="collapser ${t?"open":""}"> ${pa} </span>
    `,r=()=>{const a={...this.openFacets};a[e]=!t,this.openFacets=a},o=`facet-group-header-label-${i.key}`;return p`
      <section
        class="facet-group ${this.collapsableFacets?"mobile":""}"
        aria-labelledby=${o}
        data-testid=${o}
      >
        <div class="facet-group-header">
          <h3
            id=${o}
            @click=${r}
            @keyup=${r}
          >
            ${this.collapsableFacets?s:v} ${i.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div
          class="facet-group-content ${t?"open":""}"
          data-testid="facet-group-content-${i.key}"
        >
          ${this.facetsLoading?this.getTombstoneFacetGroupTemplate():p`
                ${this.getFacetTemplate(i)}
                ${this.searchMoreFacetsLink(i)}
              `}
        </div>
      </section>
    `}getTombstoneFacetGroupTemplate(){return p`
      ${si(Array(5).fill(null),()=>p`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(i){if(!this.moreLinksVisible||i.key==="lending"||Object.keys(i.buckets).length<this.allowedFacetCount)return v;const e=gs[i.key];return p`<button
      class="more-link"
      @click=${()=>{this.showMoreFacetsModal(i,e),this.analyticsHandler?.sendEvent({category:Ct.default,action:ne.showMoreFacetsModal,label:i.key}),this.dispatchEvent(new CustomEvent("showMoreFacets",{detail:i.key}))}}
      data-testid="more-link-btn"
    >
      More...
    </button>`}async showMoreFacetsModal(i,e){const t=p`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${i.key}
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
        .sortedBy=${e}
        .isTvSearch=${this.isTvSearch}
        @facetsChanged=${r=>{const o=new CustomEvent("facetsChanged",{detail:r.detail,bubbles:!0,composed:!0});this.dispatchEvent(o)}}
      >
      </more-facets-content>
    `,s=new ri({bodyColor:"#fff",headerColor:"#194880",showHeaderLogo:!1,closeOnBackdropClick:!0,title:p`Select filters`});this.modalManager?.classList.add("more-search-facets"),this.modalManager?.showModal({config:s,customModalContent:t,userClosedModalCallback:()=>{this.modalManager?.classList.remove("more-search-facets")}})}getFacetTemplate(i){return p`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${i}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${e=>{this.selectedFacets=ei(this.selectedFacets,i.key,e.detail.bucket,!0);const t=new CustomEvent("facetsChanged",{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(t)}}
      ></facets-template>
    `}static get styles(){return[ct,S`
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
      `]}};q([d({type:Object})],W.prototype,"searchService",2);q([d({type:Number})],W.prototype,"searchType",2);q([d({type:Object})],W.prototype,"aggregations",2);q([d({type:Object})],W.prototype,"histogramAggregation",2);q([d({type:String})],W.prototype,"minSelectedDate",2);q([d({type:String})],W.prototype,"maxSelectedDate",2);q([d({type:Boolean})],W.prototype,"moreLinksVisible",2);q([d({type:Boolean})],W.prototype,"facetsLoading",2);q([d({type:Boolean})],W.prototype,"histogramAggregationLoading",2);q([d({type:Object})],W.prototype,"selectedFacets",2);q([d({type:Boolean})],W.prototype,"collapsableFacets",2);q([d({type:Number})],W.prototype,"contentWidth",2);q([d({type:Boolean})],W.prototype,"showHistogramDatePicker",2);q([d({type:Boolean})],W.prototype,"allowExpandingDatePicker",2);q([d({type:Boolean})],W.prototype,"suppressMediatypeFacets",2);q([d({type:String})],W.prototype,"query",2);q([d({type:Array})],W.prototype,"identifiers",2);q([d({type:Object})],W.prototype,"pageSpecifierParams",2);q([d({type:Array})],W.prototype,"parentCollections",2);q([d({type:Object})],W.prototype,"filterMap",2);q([d({type:String})],W.prototype,"baseNavigationUrl",2);q([d({type:String})],W.prototype,"collectionPagePath",2);q([d({type:Boolean})],W.prototype,"isManageView",2);q([d({type:Boolean})],W.prototype,"isTvSearch",2);q([d({type:Array})],W.prototype,"facetDisplayOrder",2);q([d({type:Object,attribute:!1})],W.prototype,"modalManager",2);q([d({type:Object,attribute:!1})],W.prototype,"resizeObserver",2);q([d({type:Object,attribute:!1})],W.prototype,"featureFeedbackService",2);q([d({type:Object,attribute:!1})],W.prototype,"recaptchaManager",2);q([d({type:Object,attribute:!1})],W.prototype,"analyticsHandler",2);q([d({type:Object,attribute:!1})],W.prototype,"collectionTitles",2);q([d({type:Object,attribute:!1})],W.prototype,"tvChannelAliases",2);q([R()],W.prototype,"openFacets",2);W=q([U("collection-facets")],W);var R3=Object.getOwnPropertyDescriptor,z3=(i,e,t,s)=>{for(var r=s>1?void 0:s?R3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=a(r)||r);return r};let fc=class extends H{render(){return p`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){const i=S`var(--circularActivityIndicatorColor, dodgerblue)`,e=S`var(--circularActivityIndicatorThickness, 4px)`;return S`
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
        margin: ${e};
        border-width: ${e};
        border-style: solid;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${i} transparent transparent transparent;
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
    `}};fc=z3([U("circular-activity-indicator")],fc);function I3(i,e){return i===void 0?e!==void 0:e===void 0?i!==void 0:i.facetType===e.facetType&&i.bucketKey===e.bucketKey}function ka(i,e){return i.label===e.label&&i.facets.length===e.facets.length&&i.facets.every((t,s)=>I3(t,e.facets[s]))}function Ld(i){if(!Array.isArray(i[0])){let r=[...i];for(let o=0;o<r.length;o++){const a=r[o];r=r.filter(n=>a===n||!ka(a,n))}return r}const e=i,t=[];for(const s of e){const r=[];for(const o of s)t.find(n=>n.find(l=>ka(o,l)))||r.push(o);r.length>0&&t.push(r)}return t}class cn{async getRecommendedFacets(){const e=navigator.language,t=cn.getLanguageDisplayName(e);return t?[{facets:[{facetType:"language",bucketKey:t}]}]:[]}static getLanguageDisplayName(e){const t=e.split("-")[0];return new Intl.DisplayNames(["en"],{type:"language"}).of(t)}}const Gt={facets:[{facetType:"mediatype",bucketKey:"texts"}]},Yt={facets:[{facetType:"mediatype",bucketKey:"audio"}]},wi={facets:[{facetType:"mediatype",bucketKey:"movies"}]},Mt={facets:[{facetType:"mediatype",bucketKey:"image"}]},cs={facets:[{facetType:"mediatype",bucketKey:"software"}]},Zo={facets:[{facetType:"mediatype",bucketKey:"etree"}]},N3={facets:[{facetType:"mediatype",bucketKey:"web"}]},U3={facets:[{facetType:"mediatype",bucketKey:"data"}]},H3={text:[Gt],book:[Gt],novel:[Gt],magazine:[Gt],newspaper:[Gt],pdf:[Gt],epub:[Gt],audio:[Yt],song:[Yt],music:[Yt],listen:[Yt],podcast:[Yt],radio:[Yt],stream:[Yt,wi],video:[wi],movie:[wi],film:[wi],animation:[wi],youtube:[wi],image:[Mt],photo:[Mt],picture:[Mt],painting:[Mt],jpg:[Mt],jpeg:[Mt],png:[Mt],gif:[Mt],software:[cs],app:[cs],program:[cs],game:[cs],arcade:[cs],etree:[Zo],concert:[Zo],"live music":[Zo],"web crawl":[N3],dataset:[U3]};class V3{async getRecommendedFacets(e){const t=[];for(const[s,r]of Object.entries(H3))e.includes(s)&&t.push(...r);return t}}const Ks=[{facets:[{facetType:"mediatype",bucketKey:"texts"}]}],mc=[{label:"Films by __QUERY",facets:[{facetType:"mediatype",bucketKey:"movies"},{facetType:"creator",bucketKey:"__QUERY"}]}],ds=[{label:"Writing by __QUERY",facets:[{facetType:"mediatype",bucketKey:"texts"},{facetType:"creator",bucketKey:"__QUERY"}]}],Xs=[{label:"Images by __QUERY",facets:[{facetType:"mediatype",bucketKey:"image"},{facetType:"creator",bucketKey:"__QUERY"}]}],hs=[{label:"Music by __QUERY",facets:[{facetType:"mediatype",bucketKey:"audio"},{facetType:"creator",bucketKey:"__QUERY"}]}],j3={"written work":Ks,literature:Ks,book:Ks,novel:Ks,filmmaker:mc,director:mc,author:ds,writer:ds,novelist:ds,essayist:ds,poet:ds,"visual artist":Xs,"graphic artist":Xs,photographer:Xs,painter:Xs,singer:hs,songwriter:hs,musician:hs,composer:hs,pianist:hs};class W3{constructor(){this.WIKIDATA_BASE_URL="https://www.wikidata.org/w/api.php",this.WIKIDATA_DEFAULT_ARGS="?action=wbsearchentities&format=json&language=en&uselang=en&origin=*&type=item&limit=5"}getWikidataURL(e){const t=encodeURIComponent(e);return`${this.WIKIDATA_BASE_URL}${this.WIKIDATA_DEFAULT_ARGS}&search=${t}`}replaceQueryPlaceholders(e,t){return e.map(s=>({label:s.label?.replace("__QUERY",t),facets:s.facets.map(r=>{const o={...r,bucketKey:r.bucketKey.replace("__QUERY",t.toLowerCase())};return r.displayText&&(o.displayText=o.displayText?.replace("__QUERY",t)),o})}))}async getRecommendedFacets(e){const t=[];try{const s=this.getWikidataURL(e),o=await(await fetch(s)).json();for(const[a,n]of Object.entries(j3))if(new RegExp(`\\b${a}\\b`).test(o.search[0]?.description)){const h=o.search[0].label;t.push(...this.replaceQueryPlaceholders(n,h))}return t}catch(s){return console.warn(s),[]}}}const Mr=class Mr{async getRecommendedFacets(e,t=Mr.DEFAULT_HEURISTICS){const s=t.map(r=>new r().getRecommendedFacets(e));return Ld((await Promise.all(s)).flat())}};Mr.DEFAULT_HEURISTICS=[V3,W3,cn];let Ea=Mr;const q3=p`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m 91.666668,8.3333328 v 0.9708343 l -35.3625,39.2916669 -2.137502,2.375 v 3.195832 32.350001 L 45.833334,82.35 V 54.166666 50.970834 l -2.1375,-2.375 L 8.3333328,9.3041671 V 8.3333328 H 91.666668 M 100,0 H 0 V 12.5 L 37.500001,54.166666 V 87.5 l 25,12.5 V 54.166666 L 100,12.5 Z"
      fill="#000"
    />
  </svg>
`,G3=Q`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m50 0c27.6142375 0 50 22.3857625 50 50s-22.3857625 50-50 50-50-22.3857625-50-50 22.3857625-50 50-50zm23.8159475 26.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362 18.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113l18.0989475 18.0988362-18.0989475 18.0988362c-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113 1.4033215 1.4033215 3.5816761 1.5592461 5.1572272.4677738l.5598841-.4677738 18.0988362-18.0989475 18.0988362 18.0989475.5598841.4677738c1.5755511 1.0914723 3.7539057.9355477 5.1572272-.4677738 1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113l-18.0989475-18.0988362 18.0989475-18.0988362c1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113z" fill-rule="evenodd"/></svg>
`;var Y3=Object.defineProperty,Q3=Object.getOwnPropertyDescriptor,Wr=(i,e,t,s)=>{for(var r=s>1?void 0:s?Q3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&Y3(e,t,r),r};function K3(i){return i&&i.charAt(0).toLocaleUpperCase()+i.slice(1)}let Os=class extends H{constructor(){super(...arguments),this.selected=!1}render(){if(!this.facetInfo)return v;const i=this.facetInfo.facets.length===1,e=this.facetInfo.facets[0],t=K3((this.labelPrefix?`${this.labelPrefix} `:"")+(this.facetInfo.label??e.displayText??e.bucketKey));if(!t)return v;const s=i&&e.facetType==="mediatype"?hd[e.bucketKey].icon:v;return p`
      <a
        class="smart-facet-button ${this.selected?"selected":""}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${s} ${t}
        ${this.selected?p`<span class="unselect-button">${G3}</span>`:v}
      </a>
    `}get href(){const i=new URL(window.location.href);if(this.facetInfo)for(const e of this.facetInfo.facets)i.searchParams.append("and[]",encodeURIComponent(`${e.facetType}:"${e.bucketKey}"`));return i.toString()}facetClicked(i){i.preventDefault(),this.facetInfo&&(this.selected=!this.selected,this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:this.facetInfo,details:this.facetInfo.facets.map(e=>({facetType:e.facetType,bucket:{key:e.bucketKey,count:0,state:this.selected?"selected":"none"},negative:!1}))}})))}static get styles(){return S`
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
    `}};Wr([d({type:Object})],Os.prototype,"facetInfo",2);Wr([d({type:String})],Os.prototype,"labelPrefix",2);Wr([d({type:Boolean})],Os.prototype,"selected",2);Os=Wr([U("smart-facet-button")],Os);var X3=Object.defineProperty,Z3=Object.getOwnPropertyDescriptor,zs=(i,e,t,s)=>{for(var r=s>1?void 0:s?Z3(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&X3(e,t,r),r};let Ii=class extends H{render(){if(!this.facetInfo||!this.activeFacetRef||this.facetInfo.length===0)return v;const i=this.activeFacetRef.displayText??this.activeFacetRef.bucketKey;return i?p`
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
            >${this.labelPrefix??v} ${i}</span
          >
        </ia-dropdown>
      </div>
    `:v}get dropdownOptions(){return this.facetInfo?.map(i=>{const e=i.facets[0];return{id:e.bucketKey,label:p`<span>
            ${i.label??e.displayText??e.bucketKey}
          </span>`}})??[]}get activeDropdownOption(){if(this.activeFacetRef)return this.dropdownOptions.find(i=>i.id===this.activeFacetRef?.bucketKey)}defaultOptionSelected(){this.handleSelection(this.activeFacetRef?.bucketKey)}optionSelected(i){this.handleSelection(i.detail.option.id)}handleSelection(i){if(!i||!this.facetInfo||!this.activeFacetRef)return;let e;for(const t of this.facetInfo){const s=t.facets.find(r=>r.bucketKey===i);s&&(this.activeFacetRef=s,e=t)}e&&this.dispatchEvent(new CustomEvent("facetClick",{detail:{smartFacet:e,details:[{facetType:this.activeFacetRef.facetType,bucket:{key:this.activeFacetRef.bucketKey,count:0,state:"selected"},negative:!1}]}}))}onDropdownClick(){Je("smart dropdown: onDropdownClick",this),this.dispatchEvent(new CustomEvent("dropdownClick",{detail:this}))}close(){this.dropdown&&(this.dropdown.open=!1)}static get styles(){return S`
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
    `}};zs([d({type:Array})],Ii.prototype,"facetInfo",2);zs([d({type:String})],Ii.prototype,"labelPrefix",2);zs([d({type:Object})],Ii.prototype,"activeFacetRef",2);zs([Z("ia-dropdown")],Ii.prototype,"dropdown",2);Ii=zs([U("smart-facet-dropdown")],Ii);var J3=Object.defineProperty,ef=Object.getOwnPropertyDescriptor,dt=(i,e,t,s)=>{for(var r=s>1?void 0:s?ef(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&J3(e,t,r),r};const gc={collection:"Collection: ",creator:"By: ",subject:"About: "};function tf(i){return i.charAt(0).toUpperCase()+i.slice(1)}let Ye=class extends H{constructor(){super(...arguments),this.filterToggleShown=!1,this.filterToggleActive=!1,this.heuristicRecs=[],this.smartFacets=[]}render(){if(!this.query)return v;const i=!!this.label&&this.smartFacets.length>0;return p`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${i?p`<p id="filters-label">${this.label}</p>`:v}
        ${Dd(this.smartFacets,e=>`${e[0].label}|${e[0].facets[0].facetType}|${e[0].facets[0].bucketKey}`,e=>this.makeSmartFacet(e))}
      </div>
    `}willUpdate(i){let e=!1;i.has("query")&&(Je("query change",i.get("query"),this.query),this.lastAggregations=void 0,e=!0),i.has("aggregations")&&!this.lastAggregations&&this.aggregations&&Object.keys(this.aggregations).length>0&&(Je("aggs change",i.get("aggregations"),this.aggregations),this.lastAggregations=this.aggregations,e=!0),e&&(Je("should update smart facets, doing so..."),this.updateSmartFacets())}refresh(){this.lastAggregations=this.aggregations,this.updateSmartFacets()}deselectAll(){for(const i of this.smartFacets)for(const e of i)e.selected=!1;this.requestUpdate()}async updateSmartFacets(){Je("updating smart facets"),this.query&&(this.heuristicRecs=await new Ea().getRecommendedFacets(this.query),Je("heuristic recs are",this.heuristicRecs),this.smartFacets=Ld(this.facetsToDisplay),Je("smart facets are",this.smartFacets))}makeSmartFacet(i){return i.length===0?v:i.length===1?this.smartFacetButton(i[0]):this.smartFacetDropdown(i)}smartFacetButton(i){return p`
      <smart-facet-button
        .facetInfo=${i}
        .labelPrefix=${gc[i.facets[0].facetType]}
        .selected=${i.selected??!1}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `}smartFacetDropdown(i){return p`
      <smart-facet-dropdown
        .facetInfo=${i}
        .labelPrefix=${gc[i[0].facets[0].facetType]}
        .activeFacetRef=${i[0].facets[0]}
        @facetClick=${this.dropdownOptionClicked}
        @dropdownClick=${this.dropdownClicked}
      ></smart-facet-dropdown>
    `}get filtersToggleTemplate(){return this.filterToggleShown?p`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive?"active":""}
        title="${this.filterToggleActive?"Hide":"Show"} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${q3}
      </button>
    `:v}get facetsToDisplay(){const i=[];if(this.heuristicRecs.length>0)for(const e of this.heuristicRecs)e.facets.length===1&&e.facets[0].facetType==="mediatype"||i.push([e]);if(this.lastAggregations){const e=["mediatype","year","language","creator","subject","collection"];for(const t of e){const s=this.lastAggregations[t];if(!s||s.buckets.length===0||["lending","year_histogram","date_histogram"].includes(t)||typeof s.buckets[0]=="number"||t==="mediatype"&&this.selectedFacets&&Object.values(this.selectedFacets.mediatype??{}).some(n=>n.state!=="none"))continue;const r=t,a=s.buckets.filter(n=>{const l=this.selectedFacets?.[r]?.[n.key];return!(l&&l.state!=="none")});if(r!=="mediatype")if(r==="collection"||r==="subject"){const n=a.slice(0,5);i.push(n.map(l=>this.toSmartFacet(r,[l])))}else i.push([this.toSmartFacet(r,[a[0]])])}}return i}toSmartFacet(i,e){return{facets:e.map(t=>{let s=tf(t.key.toString());if(i==="collection"){const r=this.collectionTitles?.get(t.key.toString());r&&(s=r)}return{facetType:i,bucketKey:t.key.toString(),displayText:s}})}}toggleSmartFacet(i,e){let t;i.selected?(t="none",this.smartFacets=this.smartFacets.map(s=>s[0]===i?[{...i,selected:!1}]:s)):(t="selected",this.smartFacets=[[{...i,selected:!0}],...this.smartFacets.filter(s=>s[0]!==i)]),this.updateSelectedFacets(e.map(s=>({...s,bucket:{...s.bucket,state:t}})))}updateSelectedFacets(i){for(const t of i)this.selectedFacets=ei(this.selectedFacets,t.facetType,t.bucket,!0);const e=new CustomEvent("facetsChanged",{detail:this.selectedFacets});this.dispatchEvent(e)}facetClicked(i){this.toggleSmartFacet(i.detail.smartFacet,i.detail.details)}dropdownOptionClicked(i){const e=this.smartFacets.find(t=>t.length===1&&ka(t[0],i.detail.smartFacet));if(e){this.toggleSmartFacet(e[0],i.detail.details);return}this.smartFacets=[[{...i.detail.smartFacet,selected:!0}],...this.smartFacets],this.updateSelectedFacets(i.detail.details)}dropdownClicked(i){Je("smart bar: onDropdownClick",i.detail),this.shadowRoot?.querySelectorAll("smart-facet-dropdown").forEach(e=>{e!==i.detail&&(Je("closing",e),e.close())})}filterToggleClicked(){this.dispatchEvent(new CustomEvent("filtersToggled"))}static get styles(){return S`
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
    `}};dt([d({type:String})],Ye.prototype,"query",2);dt([d({type:Object})],Ye.prototype,"aggregations",2);dt([d({type:Object})],Ye.prototype,"selectedFacets",2);dt([d({type:Object})],Ye.prototype,"collectionTitles",2);dt([d({type:Boolean})],Ye.prototype,"filterToggleShown",2);dt([d({type:Boolean})],Ye.prototype,"filterToggleActive",2);dt([d({type:String})],Ye.prototype,"label",2);dt([R()],Ye.prototype,"heuristicRecs",2);dt([R()],Ye.prototype,"smartFacets",2);dt([R()],Ye.prototype,"lastAggregations",2);Ye=dt([U("smart-facet-bar")],Ye);var sf=Object.defineProperty,rf=Object.getOwnPropertyDescriptor,E=(i,e,t,s)=>{for(var r=s>1?void 0:s?rf(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&sf(e,t,r),r};let k=class extends H{constructor(){super(),this.baseImageUrl="https://archive.org",this.searchType=I.DEFAULT,this.selectedSort=j.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.defaultSortField=j.relevance,this.defaultSortDirection=null,this.pageSize=50,this.showSmartFacetBar=!1,this.showHistogramDatePicker=!1,this.suppressPlaceholders=!1,this.suppressResultCount=!1,this.suppressResultTiles=!1,this.suppressURLQuery=!1,this.suppressURLSinParam=!1,this.suppressSortBar=!1,this.suppressDisplayModes=!1,this.suppressMediatypeFacets=!1,this.facetLoadStrategy="eager",this.facetPaneVisible=!1,this.clearResultsOnEmptyQuery=!1,this.collectionPagePath="/details/",this.searchContext=Ct.default,this.pageContext="search",this.restorationStateHandler=new K1({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.modalManager=void 0,this.isTVCollection=!1,this.isManageView=!1,this.manageViewLabel="Select items to remove",this.enableSortOptionsSlot=!1,this.showSmartResults=!1,this.maxPagesToManage=15,this.dataSource=new J1(this,this.pageSize),this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.mobileView=!1,this.tileBlurOverrideState="no-override",this.collapsibleFacetsVisible=!1,this.placeholderType=null,this.selectedTVNetwork=void 0,this.selectedTVShow=void 0,this.tvMapsPopulated=!1,this.tvMapsLoading=!1,this.tvMapsErrored=!1,this.layoutSizeAnalyticsSent=!1,this.isScrollingToCell=!1,this.isResizeToMobile=!1,this.dataSourceInstallInProgress=!1,this.placeholderCellTemplate=p`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.updateLeftColumnHeight=()=>{if(this.mobileView)this.leftColumn?.style?.removeProperty("height");else{const i=this.leftColumn?.getBoundingClientRect().top,e=window.innerHeight-(i??0),t=i===0?null:`calc(${e}px - var(--leftColumnPaddingTop, 2rem))`;this.leftColumn?.style?.setProperty("height",t)}},this.updateFacetFadeOut=i=>{this.shadowRoot?.getElementById("facets-bottom-fade")?.classList.toggle("hidden",i?.[0]?.isIntersecting)},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.addController(this.dataSource)}tileModelAtCellIndex(i){const e=this.dataSource.getTileModelAt(i);if(!e&&!this.isScrollingToCell&&this.dataSource.queryInitialized){const t=Math.floor(i/this.pageSize)+1;this.dataSource.fetchPage(t)}return e}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{const i=sessionStorage?.getItem("cb-session");if(i)return i;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=Kc(Math.random().toString());const e=await this.sessionIdGenPromise;return sessionStorage?.setItem("cb-session",e),e}catch{return""}}goToPage(i){return this.initialPageNumber=i,this.pagesToRender=i,this.scrollToPage(i)}setSearchResultsLoading(i){this.searchResultsLoading=i}setFacetsLoading(i){this.facetsLoading=i}setTotalResultCount(i){this.totalResults=i}clearFilters({facets:i=!0,dateRange:e=!0,letterFilters:t=!0,sort:s=!1}={}){i&&this.hasCheckedFacets&&(this.selectedFacets=xt()),e&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),t&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),s&&(this.sortDirection=null,this.selectedSort=j.default),this.clearTVDropdowns(),this.smartFacetBar&&this.smartFacetBar.deselectAll()}clearTVDropdowns(){this.selectedTVNetwork=void 0,this.selectedTVShow=void 0,this.tvNetworksDropdown&&this.tvNetworksDropdown.clearSelectedOption(),this.tvShowsDropdown&&this.tvShowsDropdown.clearSelectedOption()}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(const i of Object.values(this.selectedFacets))for(const e of Object.values(i))if(e.state!=="none")return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}willUpdate(i){this.setPlaceholderType(),i.has("searchType")&&this.searchType===I.TV&&this.applyDefaultTVSearchSort()}render(){return p`
      ${this.showSmartFacetBar&&this.placeholderType===null?p`<smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleShown=${!this.mobileView}
            .filterToggleActive=${this.facetPaneVisible}
            .label=${this.smartFacetBarLabel}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${()=>{this.facetPaneVisible=!this.facetPaneVisible,this.emitFacetPaneVisibilityChanged()}}
          ></smart-facet-bar>`:v}

      <div
        id="content-container"
        class=${this.mobileView?"mobile":"desktop"}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){const i=this.dataSource.queryInitialized,e=!!this.baseQuery?.trim(),t=!!this.identifiers?.length,s=!!this.withinCollection,r=!!this.withinProfile,o=!s&&!r,a=!this.searchResultsLoading&&(this.dataSource.size===0||!this.searchService);this.placeholderType=null,!this.suppressPlaceholders&&(i?o&&!e&&!t?this.placeholderType="empty-query":a&&(this.placeholderType=!e&&s?"empty-collection":"no-results"):this.placeholderType="empty-query",this.dataSource.queryErrorMessage&&(this.placeholderType=!e&&s?"collection-error":"query-error"))}get emptyPlaceholderTemplate(){return p`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${this.dataSource.queryErrorMessage??""}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
    `}get collectionBrowserTemplate(){return p`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `}get leftColumnTemplate(){return this.mobileView?this.mobileLeftColumnTemplate:this.desktopLeftColumnTemplate}get mobileLeftColumnTemplate(){return p`
      <div
        id="left-column"
        class="column${this.isResizeToMobile?" preload":""}"
      >
        ${this.facetTopViewSlot} ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `}get desktopLeftColumnTemplate(){return p`
      <div id="left-column" class="column" ?hidden=${!this.facetPaneVisible}>
        ${this.facetTopViewSlot}
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">${x("Filters")}</h2>
          ${this.resultsCountTemplate} ${this.clearFiltersBtnTemplate(!1)}
        </div>
        <div id="facets-container" aria-labelledby="facets-header">
          ${this.facetsTemplate}
          <div id="facets-scroll-sentinel"></div>
        </div>
        <div id="facets-bottom-fade"></div>
      </div>
    `}get facetTopViewSlot(){return p`<div id="facet-top-view">
      <slot name="facet-top-slot"></slot>
    </div>`}get resultsCountTemplate(){if(this.suppressResultCount)return v;const i=this.searchResultsLoading||this.totalResults===void 0,e=qe({filtered:this.hasActiveFilters}),t=this.totalResults?.toLocaleString(),s=this.totalResults===1?"Result":"Results";return p`
      <div id="results-total" class=${e} data-testid="results-total">
        <span id="big-results-count">
          ${i?p`Searching&hellip;`:t}
        </span>
        <span id="big-results-label">
          ${i?v:s}
        </span>
      </div>
    `}get rightColumnTemplate(){const i=qe({column:!0,"full-width":!this.facetPaneVisible,"smart-results-spacing":!!this.showSmartResults});return p`
      <div id="right-column" class=${i}>
        ${this.showSmartResults?p`<slot name="smart-results"></slot>`:v}
        <section id="results">
          <h2 class="results-section-heading">
            <slot name="results-heading"></slot>
          </h2>
          <div id="cb-top-view">
            <slot name="cb-top-slot"></slot>
          </div>
          ${this.isManageView?this.manageBarTemplate:this.sortFilterBarTemplate}
          <slot name="cb-results"></slot>
          ${this.displayMode==="list-compact"&&this.totalResults?this.listHeaderTemplate:v}
          ${this.suppressResultTiles?v:this.infiniteScrollerTemplate}
        </section>
      </div>
    `}get infiniteScrollerTemplate(){return p`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType?0:v}
      ariaLandmarkLabel="Search results"
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
      >${this.displayMode==="grid"?p`<slot name="result-last-tile" slot="result-last-tile"></slot>`:v}
    </infinite-scroller>`}get infiniteScrollerClasses(){return qe({[this.displayMode??""]:!!this.displayMode,hidden:!!this.placeholderType})}get sortFilterBarTemplate(){if(this.suppressSortBar)return v;let i=j.weeklyview,e=j.date,t=Ir;return this.withinCollection?.startsWith("fav-")?(e=j.datefavorited,t=z1):!this.withinCollection&&this.searchType===I.TV&&(i=j.alltimeview,e=j.datearchived,t=I1),t.relevance=this.isRelevanceSortAvailable,p`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .defaultViewSort=${i}
        .defaultDateSort=${e}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .sortFieldAvailability=${t}
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
    `}get tileBlurCheckboxTemplate(){return this.dataSource.sessionContext?.is_archive_user?p`
      <label
        id="tile-blur-label"
        for="tile-blur-check"
        slot="sort-options-right"
      >
        ${x("Blurring")}
        <input
          id="tile-blur-check"
          type="checkbox"
          ?checked=${!this.shouldSuppressTileBlurring}
          @change=${this.tileBlurCheckboxChanged}
        />
      </label>
    `:v}get manageViewModalMsg(){const i=this.dataSource.checkedTileModels.length>1;switch(this.profileElement){case"uploads":return x(i?"Note: It may take a few minutes for these items to stop appearing in your uploads list.":"Note: It may take a few minutes for this item to stop appearing in your uploads list.");case"web_archives":return x(i?"Note: It may take a few minutes for these items to stop appearing in your web archives list.":"Note: It may take a few minutes for this item to stop appearing in your web archives list.");default:return""}}get manageBarTemplate(){return p`
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
    `}handleRemoveItems(){this.dispatchEvent(new CustomEvent("itemRemovalRequested",{detail:{items:this.dataSource.checkedTileModels.map(i=>{const e=i?.mediatype==="search"?"search:":"",t=i?.identifier??"";return`${e}${t}`})}}))}handleManageItems(){this.dispatchEvent(new CustomEvent("itemManagerRequested",{detail:{items:this.dataSource.checkedTileModels.map(i=>i?.identifier?i.identifier:"")}}))}refreshSmartFacets(){this.smartFacetBar?.refresh()}showRemoveItemsProcessingModal(){this.manageBar?.showRemoveItemsProcessingModal()}showRemoveItemsErrorModal(){this.manageBar?.showRemoveItemsErrorModal()}removeCheckedTiles(){this.dataSource.removeCheckedTiles()}tileBlurCheckboxChanged(i){const{checked:e}=i.target;this.tileBlurOverrideState=e?"on":"off",this.infiniteScroller?.refreshAllVisibleCells()}get shouldSuppressTileBlurring(){if(this.tileBlurOverrideState!=="no-override")return this.tileBlurOverrideState==="off";const{sessionContext:i}=this.dataSource;return i?.pps_relevant_user_preferences?.display__blur_moderated_content==="off"}userChangedSort(i){const{selectedSort:e,sortDirection:t}=i.detail;this.selectedSort=e,this.sortDirection=t,(this.currentPage??1)>1&&this.goToPage(1),this.currentPage=1}sendSortByAnalytics(i){const e=i&&!this.sortDirection;this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.sortBy,label:`${this.selectedSort}${this.sortDirection||e?`-${this.sortDirection}`:""}`})}selectedSortChanged(){this.dataSource.updatePrefixFiltersForCurrentSort()}get sortParam(){const i=Me[this.selectedSort];if(!i?.handledBySearchService)return null;const e=new URL(window.location.href).searchParams.get("sort"),t=i.searchServiceKey??e?.replace(/^-/,"");return this.sortDirection||(this.sortDirection="asc"),t?{field:t,direction:this.sortDirection}:null}get defaultSortParam(){const i=this.defaultSortDirection??"asc",e=Me[this.defaultSortField].searchServiceKey;return e?{field:e,direction:i}:null}displayModeChanged(i){this.displayMode=i.detail.displayMode,this.displayMode&&this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.displayMode,label:this.displayMode})}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(i){if(!i&&!this.selectedTitleFilter)return;const e=i&&!this.selectedTitleFilter;this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.filterByTitle,label:e?`clear-${i}`:`${i||"start"}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(i){if(!i&&!this.selectedCreatorFilter)return;const e=i&&!this.selectedCreatorFilter;this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.filterByCreator,label:e?`clear-${i}`:`${i||"start"}-${this.selectedCreatorFilter}`})}titleLetterSelected(i){this.selectedCreatorFilter=null,this.selectedTitleFilter=i.detail.selectedLetter}creatorLetterSelected(i){this.selectedTitleFilter=null,this.selectedCreatorFilter=i.detail.selectedLetter}get mobileFacetsTemplate(){return da.includes(this.profileElement)?v:p`
      <details id="mobile-filter-collapse" @toggle=${e=>{const t=e.target;this.isResizeToMobile=!1,this.collapsibleFacetsVisible=t.open,this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.mobileFacetsToggled,label:t.open?"open":"closed"})}}>
        <summary>
          <span class="collapser-icon">${pa}</span>
          <h2>${x("Filters")}</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}async tvDropdownToggled(i){if(i.detail&&!this.tvMapsPopulated){this.tvMapsLoading=!0,this.tvMapsErrored=!1;try{await this.dataSource.populateTVChannelMaps(),this.tvMapsPopulated=!0}catch{this.tvMapsErrored=!0}this.tvMapsLoading=!1}}async networksDropdownChanged(){const i=this.selectedTVNetwork,e=this.tvNetworksDropdown.selectedOption?.text;this.selectedTVNetwork=e??void 0;const t=this.dataSource.tvChannelMaps.channelToNetwork.entries();for(const[s,r]of t)if(r===i){const o={key:s.toLowerCase(),count:0,state:"none"};this.selectedFacets=ei(this.selectedFacets,"creator",o,!0)}else if(r===this.selectedTVNetwork){const o={key:s.toLowerCase(),count:0,state:"selected"};this.selectedFacets=ei(this.selectedFacets,"creator",o)}}async showsDropdownChanged(){const i=this.selectedTVShow,e=this.tvShowsDropdown.selectedOption?.text;if(this.selectedTVShow=e??void 0,i!==void 0){const t={key:i,count:0,state:"none"};this.selectedFacets=ei(this.selectedFacets,"program",t,!0)}if(this.selectedTVShow){const t={key:this.selectedTVShow,count:0,state:"selected"};this.selectedFacets=ei(this.selectedFacets,"program",t)}}get tvDropdownFiltersTemplate(){if(this.searchType!==I.TV)return v;const{channelToNetwork:i,programToChannels:e}=this.dataSource.tvChannelMaps,t=i?[...new Set(i.values())]:[];let s=e?[...e.entries()]:[];i&&this.selectedTVNetwork&&(s=s.filter(([,h])=>Object.keys(h).some(u=>i.get(u)===this.selectedTVNetwork)));const r=x("Filter by Network"),o=x("Filter by Show"),a=s.map(([h])=>h),n=p`
      <span slot="empty-options">
        <img src="https://archive.org/images/loading.gif" />
      </span>
    `,l=p`
      <span slot="empty-options">
        ${x("Unable to fetch options, try again later")}
      </span>
    `;return p`
      <div id="tv-filters" slot="facets-top">
        <ia-combo-box
          id="tv-networks"
          class="tv-filter-dropdown"
          placeholder=${r}
          clearable
          wrap-arrow-keys
          sort
          .options=${t.map((h,u)=>({id:`network-${u}`,text:h}))}
          @toggle=${this.tvDropdownToggled}
          @change=${this.networksDropdownChanged}
        >
          <span slot="label" class="sr-only">${r}</span>
          ${this.tvMapsLoading?n:v}
          ${this.tvMapsErrored?l:v}
        </ia-combo-box>
        <ia-combo-box
          id="tv-shows"
          class="tv-filter-dropdown"
          placeholder=${o}
          max-autocomplete-entries="500"
          clearable
          wrap-arrow-keys
          sort
          .options=${a.map((h,u)=>({id:`show-${u}`,text:h}))}
          @toggle=${this.tvDropdownToggled}
          @change=${this.showsDropdownChanged}
        >
          <span slot="label" class="sr-only">${o}</span>
          ${this.tvMapsLoading?n:v}
          ${this.tvMapsErrored?l:v}
        </ia-combo-box>
      </div>
    `}get facetsTemplate(){if(da.includes(this.profileElement))return v;if(this.facetLoadStrategy==="off")return p`
        <p class="facets-message">
          ${x("Facets are temporarily unavailable.")}
        </p>
      `;const i=this.isTVCollection||!this.withinCollection&&this.searchType===I.TV,e=i?V1:qc,t=p`
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
        .allowDatePickerMonths=${i}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .identifiers=${this.identifiers}
        .filterMap=${this.dataSource.filterMap}
        .isManageView=${this.isManageView}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        .facetDisplayOrder=${e}
        .isTvSearch=${i}
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
    `;return(this.facetLoadStrategy==="opt-in"||this.facetLoadStrategy==="opt-in-or-login"&&!this.loggedIn)&&!this.mobileView?p`
        <details
          class="desktop-facets-dropdown"
          @toggle=${r=>{const o=r.target;this.collapsibleFacetsVisible=o.open}}
        >
          <summary>
            <span class="collapser-icon">${pa}</span>
            <h2>${x("Filters")}</h2>
          </summary>
          ${t}
        </details>
      `:t}clearFiltersBtnTemplate(i){if(!this.hasActiveFilters)return v;const e=qe({"clear-filters-btn":!0,mobile:i}),t=i?"Clear all":"Clear all filters";return p`
      <div class="clear-filters-btn-row">
        ${i?p`<span class="clear-filters-btn-separator">&nbsp;</span>`:v}
        <button class=${e} @click=${this.clearFilters}>
          ${t}
        </button>
      </div>
    `}get listHeaderTemplate(){return p`
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
    `}histogramDateRangeUpdated(i){const{minDate:e,maxDate:t}=i.detail;[this.minSelectedDate,this.maxSelectedDate]=[e,t],this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}emitManageModeChangedEvent(){this.dispatchEvent(new CustomEvent("manageModeChanged",{detail:this.isManageView}))}async installDataSourceAndQueryState(i,e){Je("Installing data source & query state in CB:",i,e),this.dataSource&&this.removeController(this.dataSource),this.dataSource=i,this.addController(this.dataSource),this.baseQuery=e.baseQuery,this.profileElement=e.profileElement,this.searchType=e.searchType,this.selectedFacets=e.selectedFacets??xt(),this.internalFilters=e.internalFilters,this.minSelectedDate=e.minSelectedDate,this.maxSelectedDate=e.maxSelectedDate,this.selectedSort=e.selectedSort??j.default,this.sortDirection=e.sortDirection,this.selectedTitleFilter=e.selectedTitleFilter,this.selectedCreatorFilter=e.selectedCreatorFilter,this.pagesToRender=this.initialPageNumber,this.dataSourceInstallInProgress=!0,this.requestUpdate(),await this.updateComplete,this.dataSourceInstallInProgress=!1,this.searchResultsLoading||(this.setTotalResultCount(this.dataSource.totalResults),this.setTileCount(this.dataSource.size)),this.refreshVisibleResults()}firstUpdated(){this.restoreState(),this.setInitialSize()}setInitialSize(){this.contentWidth=this.contentContainer.getBoundingClientRect().width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.sendLayoutSizeAnalytics()}sendLayoutSizeAnalytics(){this.analyticsHandler&&(this.layoutSizeAnalyticsSent=!0,this.analyticsHandler.sendEvent({category:this.searchContext,action:this.mobileView?ne.loadMobileView:ne.loadDesktopView}))}updated(i){if(i.has("placeholderType")&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),i.has("analyticsHandler")&&!this.layoutSizeAnalyticsSent&&this.sendLayoutSizeAnalytics(),(i.has("displayMode")||i.has("baseNavigationUrl")||i.has("baseImageUrl")||i.has("loggedIn"))&&this.infiniteScroller?.reload(),(i.has("baseQuery")||i.has("identifiers")||i.has("searchType")||i.has("withinCollection"))&&!this.historyPopOccurred&&this.initialQueryChangeHappened){const e=i.has("withinCollection")&&!i.has("selectedSort")&&!i.has("sortDirection");this.clearFilters({sort:e,facets:!i.has("selectedFacets"),dateRange:!(i.has("minSelectedDate")||i.has("maxSelectedDate")),letterFilters:!(i.has("selectedTitleFilter")||i.has("selectedCreatorFilter"))})}if(i.has("profileElement")&&this.applyDefaultProfileSort(),i.has("baseQuery")&&this.emitBaseQueryChanged(),i.has("searchType")&&this.emitSearchTypeChanged(),(i.has("currentPage")||i.has("displayMode"))&&this.persistState(),(i.has("baseQuery")||i.has("identifiers")||i.has("minSelectedDate")||i.has("maxSelectedDate")||i.has("selectedFacets")||i.has("searchService")||i.has("withinCollection")||i.has("withinProfile")||i.has("profileElement"))&&this.dataSource.refreshLetterCounts(),i.has("selectedSort")||i.has("sortDirection")){const e=i.get("sortDirection");this.sendSortByAnalytics(e),this.selectedSortChanged()}if(i.has("selectedTitleFilter")&&this.sendFilterByTitleAnalytics(i.get("selectedTitleFilter")),i.has("selectedCreatorFilter")&&this.sendFilterByCreatorAnalytics(i.get("selectedCreatorFilter")),this.updateFacetReadiness(),(i.has("baseQuery")||i.has("identifiers")||i.has("searchType")||i.has("selectedTitleFilter")||i.has("selectedCreatorFilter")||i.has("minSelectedDate")||i.has("maxSelectedDate")||i.has("selectedSort")||i.has("sortDirection")||i.has("selectedFacets")||i.has("searchService")||i.has("withinCollection")||i.has("withinProfile")||i.has("profileElement"))&&this.handleQueryChange(),i.has("searchResultsLoading")&&this.emitSearchResultsLoadingChanged(),i.has("facetsLoading")&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==I.FULLTEXT),i.has("pagesToRender")&&!this.dataSource.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),i.has("isManageView")&&(this.isManageView?(this.displayMode="grid",this.fetchManageableSearchResults()):this.pageContext==="search"&&this.infiniteScroller?.reload(),this.infiniteScroller?.refreshAllVisibleCells(),i.get("isManageView")!==void 0&&this.emitManageModeChangedEvent()),i.has("resizeObserver")){const e=i.get("resizeObserver");e&&this.disconnectResizeObserver(e),this.setupResizeObserver()}this.ensureAvailableTilesDisplayed()}connectedCallback(){super.connectedCallback?.(),this.setupStateRestorationObserver(),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener("popstate",this.boundNavigationHandler),this.leftColIntersectionObserver?.disconnect(),this.facetsIntersectionObserver?.disconnect(),window.removeEventListener("resize",this.updateLeftColumnHeight)}handleResize(i){const e=this.mobileView;i.target===this.contentContainer&&(this.contentWidth=i.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!e&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}ensureAvailableTilesDisplayed(){this.infiniteScroller&&this.infiniteScroller.itemCount<this.dataSource.size&&this.setTileCount(this.dataSource.endOfDataReached?this.dataSource.size:this.estimatedTileCount)}updateFacetReadiness(){const i=this.collapsibleFacetsVisible||this.facetLoadStrategy==="opt-in-or-login"&&this.loggedIn,e=["opt-in","opt-in-or-login"].includes(this.facetLoadStrategy),t=!this.mobileView&&(!e||i),s=this.mobileView&&i;this.dataSource.handleFacetReadinessChange(t||s)}setupLeftColumnScrollListeners(){const i=this.shadowRoot?.querySelector("#left-column-scroll-sentinel");i&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(201).keys()].map(e=>e/200)}),this.leftColIntersectionObserver.observe(i)),window.addEventListener("resize",this.updateLeftColumnHeight)}setupFacetsScrollListeners(){const i=this.shadowRoot?.querySelector("#facets-scroll-sentinel");i&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(i))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent("baseQueryChanged",{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent("searchTypeChanged",{detail:this.searchType}))}emitFacetPaneVisibilityChanged(){this.dispatchEvent(new CustomEvent("facetPaneVisibilityChanged",{detail:this.facetPaneVisible}))}emitSearchError(){this.dispatchEvent(new CustomEvent("searchError",{detail:this.dataSource.queryErrorMessage}))}emitQueryStateChanged(){this.dispatchEvent(new CustomEvent("queryStateChanged",{detail:{baseQuery:this.baseQuery,withinCollection:this.withinCollection,withinProfile:this.withinProfile,profileElement:this.profileElement,searchType:this.searchType,selectedFacets:this.selectedFacets,internalFilters:this.internalFilters,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedSort:this.selectedSort,sortDirection:this.sortDirection,selectedTitleFilter:this.selectedTitleFilter,selectedCreatorFilter:this.selectedCreatorFilter}}))}emitEmptyResults(){this.dispatchEvent(new Event("emptyResults"))}disconnectResizeObserver(i){i.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||!this.contentContainer||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(i){if(this.isScrollingToCell)return;const{visibleCellIndices:e}=i.detail;if(e.length===0)return;const t=Math.min(this.pageSize,e.length)-1,s=e[t],r=Math.floor(s/this.pageSize)+1;this.currentPage!==r&&(this.currentPage=r);const o=new CustomEvent("visiblePageChanged",{detail:{pageNumber:r}});this.dispatchEvent(o)}get initialSearchComplete(){return this.dataSource.initialSearchComplete}async handleQueryChange(){!this.searchService||this.dataSource.pageFetchQueryKey===this.previousQueryKey||this.baseQuery&&!this.dataSource.canPerformSearch||(this.previousQueryKey=this.dataSource.pageFetchQueryKey,this.totalResults=void 0,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&this.baseQuery?.trim()&&(this.defaultSortField=j.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1)}setupStateRestorationObserver(){this.boundNavigationHandler||(this.boundNavigationHandler=this.historyNavigationHandler.bind(this)),window.addEventListener("popstate",this.boundNavigationHandler)}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){const i=this.restorationStateHandler.getRestorationState();this.displayMode=i.displayMode,!this.suppressURLSinParam&&i.searchType!=null&&(this.searchType=i.searchType),this.selectedSort=i.selectedSort??this.defaultSortField??j.default,this.sortDirection=i.sortDirection??this.defaultSortDirection??null,this.selectedTitleFilter=i.selectedTitleFilter??null,this.selectedCreatorFilter=i.selectedCreatorFilter??null,this.selectedFacets=i.selectedFacets,this.suppressURLQuery||(this.baseQuery=i.baseQuery),this.currentPage=i.currentPage??1,this.minSelectedDate=i.minSelectedDate,this.maxSelectedDate=i.maxSelectedDate,this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){const i=this.selectedSort===this.defaultSortField,e={displayMode:this.displayMode,searchType:this.suppressURLSinParam?void 0:this.searchType,selectedSort:i?j.default:this.selectedSort,sortDirection:this.sortDirection??void 0,selectedFacets:this.selectedFacets??xt(),baseQuery:this.suppressURLQuery?void 0:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:this.selectedTitleFilter??void 0,selectedCreatorFilter:this.selectedCreatorFilter??void 0},t={forceReplace:this.dataSourceInstallInProgress,persistMetadataSearchType:this.isTVCollection};this.restorationStateHandler.persistState(e,t)}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent("searchResultsLoadingChanged",{detail:{loading:this.searchResultsLoading}}))}facetsChanged(i){this.selectedFacets=i.detail}facetClickHandler({detail:{facetType:i,bucket:e,negative:t}}){let s;t?s=e.state!=="none"?ne.facetNegativeSelected:ne.facetNegativeDeselected:s=e.state!=="none"?ne.facetSelected:ne.facetDeselected,this.analyticsHandler?.sendEvent({category:this.searchContext,action:s,label:i})}scrollToPage(i){return new Promise(e=>{const t=this.pageSize*(i-1);setTimeout(()=>{this.isScrollingToCell=!0,this.infiniteScroller?.scrollToCell(t,!0),setTimeout(()=>{this.isScrollingToCell=!1,this.infiniteScroller?.refreshAllVisibleCells(),e()},500)},0)})}get isRelevanceSortAvailable(){return!!this.baseQuery?.trim()}setTileCount(i){this.infiniteScroller&&(this.infiniteScroller.itemCount=i)}applyDefaultTVSearchSort(){this.defaultSortField=j.datearchived,this.defaultSortDirection="desc"}applyDefaultCollectionSort(i){if(this.baseQuery){this.defaultSortField=j.relevance,this.defaultSortDirection=null;return}const e=i?.public_metadata?.identifier?.startsWith("fav-")?"-favoritedate":"-week",s=i?.public_metadata?.["sort-by"]??e;let[r,o]=s.split(":");r.startsWith("-")?(r=r.slice(1),o="desc"):["asc","desc"].includes(o)||(o="asc");const n=Wc(r).field;n&&n!==j.default&&(this.defaultSortField=n,this.defaultSortDirection=o)}applyDefaultProfileSort(){if(this.profileElement){const i=N1[this.profileElement];this.defaultSortField=i??j.weeklyview}else this.defaultSortField=j.weeklyview;this.defaultSortDirection="desc"}get currentVisiblePageNumbers(){const i=this.infiniteScroller?.getVisibleCellIndices()??[],e=new Set;return i.forEach(t=>{const s=Math.floor(t/this.pageSize)+1;e.add(s)}),Array.from(e)}get isRadioCollection(){const{withinCollection:i}=this,e=["radio"],t=e.includes(i),s=e.some(r=>this.dataSource.parentCollections?.includes(r));return t||s}refreshVisibleResults(){this.infiniteScroller?.refreshAllVisibleCells()}resultSelected(i){if(this.isManageView){const e=this.dataSource.indexOf(i.detail);e>=0&&this.infiniteScroller?.refreshCell(e),this.requestUpdate()}this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.resultSelected,label:i.detail.mediatype}),this.analyticsHandler?.sendEvent({category:this.searchContext,action:ne.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(i){const e=this.tileModelAtCellIndex(i);if(!e)return;const t=this.searchType===I.TV,s=this.searchType===I.RADIO,{isTVCollection:r,isRadioCollection:o}=this,a=t||s||r||o;return p`
      <tile-dispatcher
        .collectionPagePath=${this.collectionPagePath}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${e}
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
        ?showTvClips=${t||r}
        ?enableHoverPane=${!0}
        ?useLocalTime=${a}
        @resultSelected=${n=>this.resultSelected(n)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){!this.dataSource.endOfDataReached&&this.dataSource.queryInitialized&&(this.pagesToRender+=1,this.dataSource.fetchPage(this.pagesToRender))}fetchManageableSearchResults(){const i=!this.dataSource.totalResults,e=!this.searchResultsLoading&&this.dataSource.totalResults>100;this.pageContext==="search"&&(i||e)&&(this.dataSource.resetPages(),this.dataSource.fetchPage(1,this.maxPagesToManage),this.infiniteScroller?.reload())}static get styles(){return[ct,S`
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

        .tv-filter-dropdown::part(icon) {
          width: 1.4rem;
          height: 1.4rem;
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
      `]}};E([d({type:String})],k.prototype,"baseNavigationUrl",2);E([d({type:String})],k.prototype,"baseImageUrl",2);E([d({type:Object})],k.prototype,"searchService",2);E([d({type:Number})],k.prototype,"searchType",2);E([d({type:String})],k.prototype,"withinCollection",2);E([d({type:String})],k.prototype,"withinProfile",2);E([d({type:String})],k.prototype,"profileElement",2);E([d({type:String})],k.prototype,"baseQuery",2);E([d({type:Array})],k.prototype,"identifiers",2);E([d({type:String})],k.prototype,"displayMode",2);E([d({type:String})],k.prototype,"selectedSort",2);E([d({type:String})],k.prototype,"selectedTitleFilter",2);E([d({type:String})],k.prototype,"selectedCreatorFilter",2);E([d({type:String})],k.prototype,"sortDirection",2);E([d({type:String})],k.prototype,"defaultSortField",2);E([d({type:String})],k.prototype,"defaultSortDirection",2);E([d({type:Number})],k.prototype,"pageSize",2);E([d({type:Number})],k.prototype,"currentPage",2);E([d({type:String})],k.prototype,"minSelectedDate",2);E([d({type:String})],k.prototype,"maxSelectedDate",2);E([d({type:Object})],k.prototype,"selectedFacets",2);E([d({type:Object})],k.prototype,"internalFilters",2);E([d({type:Boolean})],k.prototype,"showSmartFacetBar",2);E([d({type:String})],k.prototype,"smartFacetBarLabel",2);E([d({type:Boolean})],k.prototype,"showHistogramDatePicker",2);E([d({type:Boolean})],k.prototype,"suppressPlaceholders",2);E([d({type:Boolean})],k.prototype,"suppressResultCount",2);E([d({type:Boolean})],k.prototype,"suppressResultTiles",2);E([d({type:Boolean})],k.prototype,"suppressURLQuery",2);E([d({type:Boolean})],k.prototype,"suppressURLSinParam",2);E([d({type:Boolean})],k.prototype,"suppressSortBar",2);E([d({type:Boolean})],k.prototype,"suppressDisplayModes",2);E([d({type:Boolean})],k.prototype,"suppressMediatypeFacets",2);E([d({type:String})],k.prototype,"facetLoadStrategy",2);E([d({type:Boolean,reflect:!0})],k.prototype,"facetPaneVisible",2);E([d({type:Boolean})],k.prototype,"clearResultsOnEmptyQuery",2);E([d({type:String})],k.prototype,"collectionPagePath",2);E([d({type:String,reflect:!0})],k.prototype,"searchContext",2);E([d({type:String})],k.prototype,"pageContext",2);E([d({type:Object})],k.prototype,"restorationStateHandler",2);E([d({type:Number})],k.prototype,"mobileBreakpoint",2);E([d({type:Boolean})],k.prototype,"loggedIn",2);E([d({type:Object})],k.prototype,"resizeObserver",2);E([d({type:Object})],k.prototype,"modalManager",2);E([d({type:Object})],k.prototype,"featureFeedbackService",2);E([d({type:Object})],k.prototype,"recaptchaManager",2);E([d({type:Boolean})],k.prototype,"isTVCollection",2);E([d({type:Boolean})],k.prototype,"isManageView",2);E([d({type:String})],k.prototype,"manageViewLabel",2);E([d({type:Boolean})],k.prototype,"enableSortOptionsSlot",2);E([d({type:Boolean,reflect:!0})],k.prototype,"showSmartResults",2);E([d({type:Number})],k.prototype,"maxPagesToManage",2);E([d({type:Object})],k.prototype,"dataSource",2);E([R()],k.prototype,"pagesToRender",2);E([R()],k.prototype,"searchResultsLoading",2);E([R()],k.prototype,"facetsLoading",2);E([R()],k.prototype,"totalResults",2);E([R()],k.prototype,"mobileView",2);E([R()],k.prototype,"tileBlurOverrideState",2);E([R()],k.prototype,"collapsibleFacetsVisible",2);E([R()],k.prototype,"contentWidth",2);E([R()],k.prototype,"placeholderType",2);E([R()],k.prototype,"selectedTVNetwork",2);E([R()],k.prototype,"selectedTVShow",2);E([R()],k.prototype,"tvMapsPopulated",2);E([R()],k.prototype,"tvMapsLoading",2);E([R()],k.prototype,"tvMapsErrored",2);E([Z("#content-container")],k.prototype,"contentContainer",2);E([Z("#left-column")],k.prototype,"leftColumn",2);E([Z("collection-facets")],k.prototype,"collectionFacets",2);E([Z("manage-bar")],k.prototype,"manageBar",2);E([Z("smart-facet-bar")],k.prototype,"smartFacetBar",2);E([Z("#tv-networks")],k.prototype,"tvNetworksDropdown",2);E([Z("#tv-shows")],k.prototype,"tvShowsDropdown",2);E([d({type:Object,attribute:!1})],k.prototype,"analyticsHandler",2);E([Z("infinite-scroller")],k.prototype,"infiniteScroller",2);k=E([U("collection-browser")],k);var of=Object.defineProperty,af=Object.getOwnPropertyDescriptor,ye=(i,e,t,s)=>{for(var r=s>1?void 0:s?af(e,t):e,o=i.length-1,a;o>=0;o--)(a=i[o])&&(r=(s?a(e,t,r):a(r))||r);return s&&r&&of(e,t,r),r};let ue=class extends H{constructor(){super(...arguments),this.searchService=this.initSearchServiceFromUrlParams(),this.resizeObserver=new r1,this.toggleSlots=!1,this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.suppressFacets=!1,this.lazyLoadFacets=!1,this.loggedIn=!1,this.searchType=I.METADATA,this.analyticsManager=new Yd,this.analyticsHandler={sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)}}sendAnalytics(i){console.log("Analytics Received ----",i),this.latestAction=i,this.analyticsManager?.sendEvent(i)}initSearchServiceFromUrlParams(){const i=new URL(window.location.href).searchParams;return new Ei({includeCredentials:!1,baseUrl:i.get("search_base_url")??void 0,servicePath:i.get("search_service_path")??void 0,debuggingEnabled:!!i.get("debugging")})}searchPressed(i){i.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(i){i.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){const i=this.currentPage??1;i>1&&this.collectionBrowser.goToPage(i)}changePagePressed(i){i.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(i){i.has("currentPage")&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),i.has("searchQuery")&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get("hide-dev-tools")?"hidden":""}render(){return p`
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
              @click=${()=>{this.shadowRoot?.getElementById("cell-size-control")?.classList.toggle("hidden"),this.shadowRoot?.getElementById("cell-gap-control")?.classList.toggle("hidden")}}
            >
              Toggle Cell Controls
            </button>
            <button
              @click=${()=>{this.shadowRoot?.getElementById("latest-event-details")?.classList.toggle("hidden")}}
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
          ${this.toggleSlots?p`<div slot="sortbar-left-slot">Sort Slot</div>`:v}
          ${this.toggleSlots?p`<div slot="facet-top-slot">Facet Slot</div>`:v}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}async setPlaceholderType(i){i==="loading-placeholder"&&(this.collectionBrowser.baseQuery="",this.collectionBrowser.suppressPlaceholders=!0,this.collectionBrowser.clearResultsOnEmptyQuery=!0,this.requestUpdate(),await this.collectionBrowser.updateComplete)}baseQueryChanged(i){this.searchQuery=i.detail.baseQuery}searchTypeChanged(i){this.searchType=i.detail}searchTypeSelected(i){const e=i.target;this.searchType=this.searchTypeFromSelectedOption(e.value)}searchTypeFromSelectedOption(i){switch(i){case"metadata":return I.METADATA;case"fulltext":return I.FULLTEXT;case"tv":return I.TV;case"radio":return I.RADIO;default:return I.DEFAULT}}loginChanged(i){i.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(i){i.target.checked?this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline","1px solid #33D1FF"):this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline")}toggleDevTools(){const i=new URL(window.location.href),{searchParams:e}=i;e.get("hide-dev-tools")?e.delete("hide-dev-tools"):e.set("hide-dev-tools","true"),this.shadowRoot?.getElementById("dev-tools")?.classList.toggle("hidden"),window.history.replaceState&&window.history.replaceState({path:i.toString()},"",i.toString())}toggleFacetGroupOutline(i){i.target.checked?(this.collectionBrowser.classList.add("showFacetGroupOutlines"),this.modalManager.classList.add("showFacetGroupOutlines")):(this.collectionBrowser.classList.remove("showFacetGroupOutlines"),this.modalManager.classList.remove("showFacetGroupOutlines"))}datePickerChanged(i){const e=i.target;this.collectionBrowser.showHistogramDatePicker=e.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}facetsChanged(i){const e=i.target;this.suppressFacets=!e.checked}lazyLoadFacetsChanged(i){const e=i.target;this.lazyLoadFacets=e.checked}manageModeChanged(i){const e=this.shadowRoot?.querySelector("#enable-management");e&&(e.checked=i.detail)}handleItemRemovalRequest(i){this.collectionBrowser.showRemoveItemsProcessingModal(),console.log("itemRemovalRequested: ",i.detail.items),setTimeout(()=>{this.collectionBrowser.showRemoveItemsErrorModal()},2e3)}handleItemManagerRequest(i){console.log("itemManagerRequested: ",i.detail.items)}manageModeCheckboxChanged(i){const e=i.target;this.collectionBrowser.isManageView=e.checked,this.collectionBrowser.manageViewLabel="Select items to remove (customizable texts)"}SearchManageModeCheckboxChanged(i){const e=i.target;this.collectionBrowser.pageContext=e.checked?"search":"collection"}smartFacetBarCheckboxChanged(i){const e=i.target;this.collectionBrowser.showSmartFacetBar=e.checked}facetTopSlotCheckboxChanged(i){const e=i.target,t=document.createElement("p");t.style.setProperty("border","1px solid #000"),t.textContent="New stuff as a child.",t.style.setProperty("height","20rem"),t.style.backgroundColor="#00000",t.setAttribute("slot","facet-top-slot"),e.checked?this.collectionBrowser.appendChild(t):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}toggleSlotOptions(){this.toggleSlots=!this.toggleSlots}resultLastTileSlotCheckboxChanged(i){const e=i.target,t=document.createElement("div"),s=document.createElement("h3");s.textContent="Upload",t.setAttribute("slot","result-last-tile"),t.setAttribute("class","result-last-tile"),t.appendChild(s),e.checked?this.collectionBrowser.appendChild(t):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}cbTopSlotCheckboxChanged(i){const e=i.target,t=document.createElement("p");t.style.setProperty("border","1px solid #000"),t.textContent="My Favorite list header.",t.style.setProperty("height","10rem"),t.style.backgroundColor="#00000",t.setAttribute("slot","cb-top-slot"),e.checked?this.collectionBrowser.appendChild(t):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}sortBarLeftSlotCheckboxChanged(i){if(i.target.checked){const t=document.createElement("div");t.style.setProperty("border","1px solid #000"),t.textContent="Btn",t.style.setProperty("height","3rem"),t.style.setProperty("width","3rem"),t.setAttribute("slot","sort-options-left"),this.collectionBrowser.appendChild(t)}else{const t=this.collectionBrowser.querySelector('[slot="sort-options-left"]');t&&this.collectionBrowser.removeChild(t)}}sortBarRightSlotCheckboxChanged(i){if(i.target.checked){const t=document.createElement("div");t.style.setProperty("border","1px solid #000"),t.textContent="Search bar",t.style.setProperty("height","3rem"),t.style.setProperty("width","15rem"),t.setAttribute("slot","sort-options-right"),this.collectionBrowser.appendChild(t)}else{const t=this.collectionBrowser.querySelector('[slot="sort-options-right"]');t&&this.collectionBrowser.removeChild(t)}}rowGapChanged(i){const e=i.target;this.rowGap=parseFloat(e.value),this.collectionBrowser.style.setProperty("--collectionBrowserRowGap",`${e.value}rem`)}colGapChanged(i){const e=i.target;this.colGap=parseFloat(e.value),this.collectionBrowser.style.setProperty("--collectionBrowserColGap",`${e.value}rem`)}widthChanged(i){const e=i.target;this.cellWidth=parseFloat(e.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth",`${e.value}rem`)}heightChanged(i){const e=i.target;this.cellHeight=parseFloat(e.value),this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight",`${e.value}rem`),this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight",`${e.value}rem`)}visiblePageChanged(i){const{pageNumber:e}=i.detail;e!==this.currentPage&&(this.currentPage=e)}replaceSortOptionsChanged(i){if(i.target.checked){const t=document.createElement("p");t.style.setProperty("border","1px solid #000"),t.textContent="New stuff as a child.",t.style.setProperty("height","20px"),t.setAttribute("slot","sort-options"),this.collectionBrowser.appendChild(t),this.collectionBrowser.enableSortOptionsSlot=!0}else{const t=this.collectionBrowser.querySelector('[slot="sort-options"]');t&&this.collectionBrowser.removeChild(t),this.collectionBrowser.enableSortOptionsSlot=!1}}};ue.styles=S`
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
  `;ye([R()],ue.prototype,"toggleSlots",2);ye([R()],ue.prototype,"currentPage",2);ye([R()],ue.prototype,"searchQuery",2);ye([R()],ue.prototype,"withinCollection",2);ye([R()],ue.prototype,"cellWidth",2);ye([R()],ue.prototype,"cellHeight",2);ye([R()],ue.prototype,"rowGap",2);ye([R()],ue.prototype,"colGap",2);ye([R()],ue.prototype,"suppressFacets",2);ye([R()],ue.prototype,"lazyLoadFacets",2);ye([R()],ue.prototype,"loggedIn",2);ye([R()],ue.prototype,"searchType",2);ye([d({type:Object,reflect:!1})],ue.prototype,"latestAction",2);ye([Z("#base-query-field")],ue.prototype,"baseQueryField",2);ye([Z("#base-collection-field")],ue.prototype,"baseCollectionField",2);ye([Z("#page-number-input")],ue.prototype,"pageNumberInput",2);ye([Z("collection-browser")],ue.prototype,"collectionBrowser",2);ye([Z("modal-manager")],ue.prototype,"modalManager",2);ue=ye([U("app-root")],ue);
