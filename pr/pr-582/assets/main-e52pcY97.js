(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class{constructor(e){this.ARCHIVE_ANALYTICS_VERSION=2,this.DEFAULT_SERVICE=`ao_2`,this.NO_SAMPLING_SERVICE=`ao_no_sampling`,this.DEFAULT_IMAGE_URL=`https://athena.archive.org/0.gif`,this.defaultService=e?.defaultService??this.DEFAULT_SERVICE,this.imageUrl=e?.imageUrl??this.DEFAULT_IMAGE_URL,this.imageContainer=e?.imageContainer??document.body,this.requireImagePing=e?.requireImagePing??!1}sendPing(e){let t=this.generateTrackingUrl(e).toString();if(this.requireImagePing){this.sendPingViaImage(t);return}let n=navigator.sendBeacon&&navigator.sendBeacon.bind(navigator);try{n(t)}catch{this.sendPingViaImage(t)}}sendEvent(e){let t=e.label&&e.label.trim().length>0?e.label:window.location.pathname,n={kind:`event`,ec:e.category,ea:e.action,el:t,cache_bust:Math.random(),...e.eventConfiguration};this.sendPing(n)}sendEventNoSampling(e){let t=e.eventConfiguration||{};t.service=this.NO_SAMPLING_SERVICE;let n=e;n.eventConfiguration=t,this.sendEvent(n)}sendPingViaImage(e){let t=new Image(1,1);t.src=e,t.alt=``,this.imageContainer.appendChild(t)}generateTrackingUrl(e){let t=e??{};t.service=t.service??this.defaultService;let n=new URL(this.imageUrl),r=Object.keys(t);return r.forEach(e=>{let r=t[e];n.searchParams.append(e,r)}),n.searchParams.append(`version`,`${this.ARCHIVE_ANALYTICS_VERSION}`),n.searchParams.append(`count`,`${r.length+2}`),n}};function t(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}function n(e){let t,n,r;return typeof e==`object`?(t=e.hashFunction,n=e.expiring,r=e.tags):t=e,(e,a,o)=>{if(o.value!=null)o.value=i(o.value,t,n,r);else if(o.get!=null)o.get=i(o.get,t,n,r);else throw`Only put a Memoize() decorator on a method or get accessor.`}}var r=new Map;function i(e,t,n=0,i){let a=Symbol(`__memoized_map__`);return function(...o){let s;this.hasOwnProperty(a)||Object.defineProperty(this,a,{configurable:!1,enumerable:!1,writable:!1,value:new Map});let c=this[a];if(Array.isArray(i))for(let e of i)r.has(e)?r.get(e).push(c):r.set(e,[c]);if(t||o.length>0||n>0){let r;r=t===!0?o.map(e=>e.toString()).join(`!`):t?t.apply(this,o):o[0];let i=`${r}__timestamp`,a=!1;if(n>0)if(!c.has(i))a=!0;else{let e=c.get(i);a=Date.now()-e>n}c.has(r)&&!a?s=c.get(r):(s=e.apply(this,o),c.set(r,s),n>0&&c.set(i,Date.now()))}else{let t=this;c.has(t)?s=c.get(t):(s=e.apply(this,o),c.set(t,s))}return s}}var a=class{parseValue(e){return typeof e==`string`&&(e===`false`||e===`0`)?!1:!!e}};a.shared=new a;var o=class{parseValue(e){if(typeof e==`number`)return e;if(typeof e==`boolean`)return;let t=parseFloat(e);if(!Number.isNaN(t))return t}};o.shared=new o;var s=class{parseValue(e){return o.shared.parseValue(e)}};s.shared=new s;var c=class{parseValue(e){return this.parseJSDate(e)||this.parseBracketDate(e)}parseBracketDate(e){if(typeof e!=`string`)return;let t=e.match(/\[([0-9]{4})\]/);if(!(!t||t.length<2))return this.parseJSDate(t[1])}parseJSDate(e){if(typeof e!=`string`)return;let t=e;t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)&&(t=t.replace(` `,`T`));let n=Date.parse(t);if(Number.isNaN(n))return;let r=new Date(t);return(t.match(/^[0-9]{4}$/)||t.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/))&&(r=new Date(r.getTime()+r.getTimezoneOffset()*1e3*60)),r}};c.shared=new c;var l=class{parseValue(e){if(typeof e==`number`)return e;if(typeof e==`boolean`)return;let t=e.split(`:`),n;return n=t.length===1?this.parseNumberFormat(t[0]):this.parseColonSeparatedFormat(t),n}parseNumberFormat(e){let t=parseFloat(e);return Number.isNaN(t)&&(t=void 0),t}parseColonSeparatedFormat(e){let t=!1,n=e.map((n,r)=>{let i=parseFloat(n);if(Number.isNaN(i))return t=!0,0;let a=60**(e.length-1-r);return i*Math.floor(a)}).reduce((e,t)=>e+t,0);return t?void 0:n}};l.shared=new l;var u=class{parseValue(e){if(typeof e==`string`)return e}};u.shared=new u;var d=class{constructor(e,t){this.separators=[`;`,`,`],this.parser=e,t&&t.separators&&(this.separators=t.separators)}parseValue(e){let t=String(e),n=[];for(let e of this.separators)if(n=t.split(e),n.length>1)break;return this.parseListValues(n)}parseListValues(e){let t=e.map(e=>e.trim()).map(e=>this.parser.parseValue(e)),n=[];return t.forEach(e=>{e!==void 0&&n.push(e)}),n}},f=class{parseValue(e){if(typeof e==`string`)return e}};f.shared=new f;var p=class{parseValue(e){return String(e)}};p.shared=new p;var m=class{get name(){return this.rawValue.name}get source(){return this.rawValue.source}get btih(){return this.rawValue.btih}get md5(){return this.rawValue.md5}get format(){return this.rawValue.format}get mtime(){if(this.rawValue.mtime==null)return;let e=o.shared.parseValue(this.rawValue.mtime);if(e)return new Date(e*1e3)}get crc32(){return this.rawValue.crc32}get sha1(){return this.rawValue.sha1}get original(){return this.rawValue.original}get size(){return this.rawValue.size==null?void 0:s.shared.parseValue(this.rawValue.size)}get title(){return this.rawValue.title}get length(){return this.rawValue.length==null?void 0:l.shared.parseValue(this.rawValue.length)}get height(){return this.rawValue.height==null?void 0:o.shared.parseValue(this.rawValue.height)}get width(){return this.rawValue.width==null?void 0:o.shared.parseValue(this.rawValue.width)}get track(){return this.rawValue.track==null?void 0:o.shared.parseValue(this.rawValue.track)}get external_identifier(){return this.rawValue.external_identifier}get creator(){return this.rawValue.creator}get album(){return this.rawValue.album}constructor(e={}){this.rawValue=e}};t([n()],m.prototype,`mtime`,null),t([n()],m.prototype,`size`,null),t([n()],m.prototype,`length`,null),t([n()],m.prototype,`height`,null),t([n()],m.prototype,`width`,null),t([n()],m.prototype,`track`,null);var h=class{get values(){return this.parseRawValue()}get value(){return this.values[0]}constructor(e,t){this.parser=e,this.rawValue=t}parseRawValue(){let e=Array.isArray(this.rawValue)?this.rawValue:[this.rawValue],t=[];return e.forEach(e=>{let n=this.parser.parseValue(e);Array.isArray(n)?t.push(...n):n!==void 0&&t.push(n)}),t}};t([n()],h.prototype,`values`,null),t([n()],h.prototype,`value`,null);var ee=class extends h{constructor(e){super(a.shared,e)}},te=class extends h{constructor(e){super(c.shared,e)}},ne=class extends h{constructor(e){super(l.shared,e)}},g=class extends h{constructor(e){super(o.shared,e)}},_=class extends h{constructor(e){super(p.shared,e)}},re=class extends h{constructor(e){super(f.shared,e)}},ie=class extends h{constructor(e){super(s.shared,e)}},ae=class extends h{constructor(e){super(u.shared,e)}},oe=class extends h{constructor(e,t){super(t,e)}},se=class extends oe{constructor(e){let t=new d(p.shared);super(e,t)}},v=class{get identifier(){return this.rawMetadata.identifier}get addeddate(){return this.rawMetadata.addeddate==null?void 0:new te(this.rawMetadata.addeddate)}get audio_codec(){return this.rawMetadata.audio_codec==null?void 0:new _(this.rawMetadata.audio_codec)}get audio_sample_rate(){return this.rawMetadata.audio_sample_rate==null?void 0:new g(this.rawMetadata.audio_sample_rate)}get avg_rating(){return this.rawMetadata.avg_rating==null?void 0:new g(this.rawMetadata.avg_rating)}get collection(){return this.rawMetadata.collection==null?void 0:new _(this.rawMetadata.collection)}get collections_raw(){return this.rawMetadata.collections_raw==null?void 0:new _(this.rawMetadata.collections_raw)}get collection_size(){return this.rawMetadata.collection_size==null?void 0:new ie(this.rawMetadata.collection_size)}get contact(){return this.rawMetadata.contact==null?void 0:new _(this.rawMetadata.contact)}get contributor(){return this.rawMetadata.contributor==null?void 0:new _(this.rawMetadata.contributor)}get coverage(){return this.rawMetadata.coverage==null?void 0:new _(this.rawMetadata.coverage)}get creator(){return this.rawMetadata.creator==null?void 0:new _(this.rawMetadata.creator)}get creator_alt_script(){return this.rawMetadata[`creator-alt-script`]==null?void 0:new _(this.rawMetadata[`creator-alt-script`])}get credits(){return this.rawMetadata.credits==null?void 0:new _(this.rawMetadata.credits)}get collection_layout(){return this.rawMetadata.collection_layout==null?void 0:new _(this.rawMetadata.collection_layout)}get date(){return this.rawMetadata.date==null?void 0:new te(this.rawMetadata.date)}get description(){return this.rawMetadata.description==null?void 0:new _(this.rawMetadata.description)}get downloads(){return this.rawMetadata.downloads==null?void 0:new g(this.rawMetadata.downloads)}get duration(){return this.rawMetadata.duration==null?void 0:new ne(this.rawMetadata.duration)}get external_identifier(){return this.rawMetadata[`external-identifier`]==null?void 0:new _(this.rawMetadata[`external-identifier`])}get external_link(){return this.rawMetadata[`external-link`]==null?void 0:new _(this.rawMetadata[`external-link`])}get files_count(){return this.rawMetadata.files_count==null?void 0:new g(this.rawMetadata.files_count)}get indexdate(){return this.rawMetadata.indexdate==null?void 0:new te(this.rawMetadata.indexdate)}get isbn(){return this.rawMetadata.isbn==null?void 0:new _(this.rawMetadata.isbn)}get issue(){return this.rawMetadata.issue==null?void 0:new _(this.rawMetadata.issue)}get item_count(){return this.rawMetadata.item_count==null?void 0:new g(this.rawMetadata.item_count)}get item_size(){return this.rawMetadata.item_size==null?void 0:new ie(this.rawMetadata.item_size)}get language(){return this.rawMetadata.language==null?void 0:new _(this.rawMetadata.language)}get length(){return this.rawMetadata.length==null?void 0:new ne(this.rawMetadata.length)}get licenseurl(){return this.rawMetadata.licenseurl==null?void 0:new _(this.rawMetadata.licenseurl)}get lineage(){return this.rawMetadata.lineage==null?void 0:new _(this.rawMetadata.lineage)}get month(){return this.rawMetadata.month==null?void 0:new g(this.rawMetadata.month)}get mediatype(){return this.rawMetadata.mediatype==null?void 0:new ae(this.rawMetadata.mediatype)}get noindex(){return this.rawMetadata.noindex==null?void 0:new ee(this.rawMetadata.noindex)}get notes(){return this.rawMetadata.notes==null?void 0:new _(this.rawMetadata.notes)}get num_favorites(){return this.rawMetadata.num_favorites==null?void 0:new g(this.rawMetadata.num_favorites)}get num_reviews(){return this.rawMetadata.num_reviews==null?void 0:new g(this.rawMetadata.num_reviews)}get openlibrary_edition(){return this.rawMetadata.openlibrary_edition==null?void 0:new _(this.rawMetadata.openlibrary_edition)}get openlibrary_work(){return this.rawMetadata.openlibrary_work==null?void 0:new _(this.rawMetadata.openlibrary_work)}get page_progression(){return this.rawMetadata.page_progression==null?void 0:new re(this.rawMetadata.page_progression)}get paginated(){return this.rawMetadata.paginated==null?void 0:new ee(this.rawMetadata.paginated)}get partner(){return this.rawMetadata.partner==null?void 0:new _(this.rawMetadata.partner)}get post_text(){return this.rawMetadata.post_text==null?void 0:new _(this.rawMetadata.post_text)}get ppi(){return this.rawMetadata.ppi==null?void 0:new g(this.rawMetadata.ppi)}get publicdate(){return this.rawMetadata.publicdate==null?void 0:new te(this.rawMetadata.publicdate)}get publisher(){return this.rawMetadata.publisher==null?void 0:new _(this.rawMetadata.publisher)}get reviewdate(){return this.rawMetadata.reviewdate==null?void 0:new te(this.rawMetadata.reviewdate)}get rights(){return this.rawMetadata.rights==null?void 0:new _(this.rawMetadata.rights)}get rights_holder(){let e=this.rawMetadata[`rights-holder`]??this.rawMetadata.rights_holder;return e==null?void 0:new _(e)}get runtime(){return this.rawMetadata.runtime==null?void 0:new ne(this.rawMetadata.runtime)}get scanner(){return this.rawMetadata.scanner==null?void 0:new _(this.rawMetadata.scanner)}get segments(){return this.rawMetadata.segments==null?void 0:new _(this.rawMetadata.segments)}get shotlist(){return this.rawMetadata.shotlist==null?void 0:new _(this.rawMetadata.shotlist)}get source(){return this.rawMetadata.source==null?void 0:new _(this.rawMetadata.source)}get sponsor(){return this.rawMetadata.sponsor==null?void 0:new _(this.rawMetadata.sponsor)}get start_localtime(){return this.rawMetadata.start_localtime==null?void 0:new te(this.rawMetadata.start_localtime)}get start_time(){return this.rawMetadata.start_time==null?void 0:new te(this.rawMetadata.start_time)}get stop_time(){return this.rawMetadata.stop_time==null?void 0:new te(this.rawMetadata.stop_time)}get subject(){return this.rawMetadata.subject==null?void 0:new se(this.rawMetadata.subject)}get taper(){return this.rawMetadata.taper==null?void 0:new _(this.rawMetadata.taper)}get title(){return this.rawMetadata.title==null?void 0:new _(this.rawMetadata.title)}get title_alt_script(){return this.rawMetadata[`title-alt-script`]==null?void 0:new _(this.rawMetadata[`title-alt-script`])}get transferer(){return this.rawMetadata.transferer==null?void 0:new _(this.rawMetadata.transferer)}get track(){return this.rawMetadata.track==null?void 0:new g(this.rawMetadata.track)}get type(){return this.rawMetadata.type==null?void 0:new _(this.rawMetadata.type)}get uploader(){return this.rawMetadata.uploader==null?void 0:new _(this.rawMetadata.uploader)}get utc_offset(){return this.rawMetadata.utc_offset==null?void 0:new g(this.rawMetadata.utc_offset)}get venue(){return this.rawMetadata.venue==null?void 0:new _(this.rawMetadata.venue)}get volume(){return this.rawMetadata.volume==null?void 0:new _(this.rawMetadata.volume)}get week(){return this.rawMetadata.week==null?void 0:new g(this.rawMetadata.week)}get year(){return this.rawMetadata.year==null?void 0:new g(this.rawMetadata.year)}constructor(e={}){this.rawMetadata=e}};t([n()],v.prototype,`addeddate`,null),t([n()],v.prototype,`audio_codec`,null),t([n()],v.prototype,`audio_sample_rate`,null),t([n()],v.prototype,`avg_rating`,null),t([n()],v.prototype,`collection`,null),t([n()],v.prototype,`collections_raw`,null),t([n()],v.prototype,`collection_size`,null),t([n()],v.prototype,`contact`,null),t([n()],v.prototype,`contributor`,null),t([n()],v.prototype,`coverage`,null),t([n()],v.prototype,`creator`,null),t([n()],v.prototype,`creator_alt_script`,null),t([n()],v.prototype,`credits`,null),t([n()],v.prototype,`collection_layout`,null),t([n()],v.prototype,`date`,null),t([n()],v.prototype,`description`,null),t([n()],v.prototype,`downloads`,null),t([n()],v.prototype,`duration`,null),t([n()],v.prototype,`external_identifier`,null),t([n()],v.prototype,`external_link`,null),t([n()],v.prototype,`files_count`,null),t([n()],v.prototype,`indexdate`,null),t([n()],v.prototype,`isbn`,null),t([n()],v.prototype,`issue`,null),t([n()],v.prototype,`item_count`,null),t([n()],v.prototype,`item_size`,null),t([n()],v.prototype,`language`,null),t([n()],v.prototype,`length`,null),t([n()],v.prototype,`licenseurl`,null),t([n()],v.prototype,`lineage`,null),t([n()],v.prototype,`month`,null),t([n()],v.prototype,`mediatype`,null),t([n()],v.prototype,`noindex`,null),t([n()],v.prototype,`notes`,null),t([n()],v.prototype,`num_favorites`,null),t([n()],v.prototype,`num_reviews`,null),t([n()],v.prototype,`openlibrary_edition`,null),t([n()],v.prototype,`openlibrary_work`,null),t([n()],v.prototype,`page_progression`,null),t([n()],v.prototype,`paginated`,null),t([n()],v.prototype,`partner`,null),t([n()],v.prototype,`post_text`,null),t([n()],v.prototype,`ppi`,null),t([n()],v.prototype,`publicdate`,null),t([n()],v.prototype,`publisher`,null),t([n()],v.prototype,`reviewdate`,null),t([n()],v.prototype,`rights`,null),t([n()],v.prototype,`rights_holder`,null),t([n()],v.prototype,`runtime`,null),t([n()],v.prototype,`scanner`,null),t([n()],v.prototype,`segments`,null),t([n()],v.prototype,`shotlist`,null),t([n()],v.prototype,`source`,null),t([n()],v.prototype,`sponsor`,null),t([n()],v.prototype,`start_localtime`,null),t([n()],v.prototype,`start_time`,null),t([n()],v.prototype,`stop_time`,null),t([n()],v.prototype,`subject`,null),t([n()],v.prototype,`taper`,null),t([n()],v.prototype,`title`,null),t([n()],v.prototype,`title_alt_script`,null),t([n()],v.prototype,`transferer`,null),t([n()],v.prototype,`track`,null),t([n()],v.prototype,`type`,null),t([n()],v.prototype,`uploader`,null),t([n()],v.prototype,`utc_offset`,null),t([n()],v.prototype,`venue`,null),t([n()],v.prototype,`volume`,null),t([n()],v.prototype,`week`,null),t([n()],v.prototype,`year`,null);var ce=class{get reviewbody(){return this.rawValue.reviewbody}get reviewtitle(){return this.rawValue.reviewtitle}get reviewer(){return this.rawValue.reviewer}get reviewer_itemname(){return this.rawValue.reviewer_itemname}get reviewdate(){return this.rawValue.reviewdate==null?void 0:c.shared.parseValue(this.rawValue.reviewdate)}get createdate(){return this.rawValue.createdate==null?void 0:c.shared.parseValue(this.rawValue.createdate)}get stars(){return this.rawValue.stars==null?void 0:o.shared.parseValue(this.rawValue.stars)}constructor(e={}){this.rawValue=e}};t([n()],ce.prototype,`reviewdate`,null),t([n()],ce.prototype,`createdate`,null),t([n()],ce.prototype,`stars`,null);var le=class extends ce{get reviewer_account_status(){return this.account_status?.status}get reviewer_account_status_reason(){return this.account_status?.reason}get __href__(){return this.rawValue.__href__}get account_status(){let e=this.rawValue.reviewer_account_status;if(!e)return;let t=`unknown`,n;e.startsWith(`ok`)&&(t=`ok`),e.startsWith(`locked`)&&(t=`locked`);let r=e.split(`__`);return r.length>1&&(n=r.slice(1).join(`__`)),{status:t,reason:n}}};t([n()],le.prototype,`account_status`,null);var ue=[`loans`,`waitlist`,`loan_history`];function de(e){return`${e.slice(0,4)}-${e.slice(4,6)}-${e.slice(6,8)}T${e.slice(8,10)}:${e.slice(10,12)}:${e.slice(12,14)}Z`}function fe(e){let t=[];for(let n of e){if(!n.captures?.length)continue;let e=encodeURIComponent(n.url),r=`https://web.archive.org/web/${n.captures[0]}/${e}`;t.push({hit_type:`web_archive`,fields:{url:n.url,capture_dates:n.captures.map(e=>de(e)),__href__:r}})}return t}var pe=class extends v{get created_on(){return this.rawMetadata.created_on==null?void 0:new te(this.rawMetadata.created_on)}get file_creation_mtime(){return this.rawMetadata.file_creation_mtime==null?void 0:new g(this.rawMetadata.file_creation_mtime)}get filename(){return this.rawMetadata.filename==null?void 0:new _(this.rawMetadata.filename)}get file_basename(){return this.rawMetadata.file_basename==null?void 0:new _(this.rawMetadata.file_basename)}get result_in_subfile(){return this.rawMetadata.result_in_subfile==null?void 0:new ee(this.rawMetadata.result_in_subfile)}get query(){return this.rawMetadata.query==null?void 0:new _(this.rawMetadata.query)}get date_favorited(){return this.rawMetadata.date_favorited==null?void 0:new te(this.rawMetadata.date_favorited)}get updated_on(){return this.rawMetadata.updated_on==null?void 0:new te(this.rawMetadata.updated_on)}get ad_id(){return this.rawMetadata.ad_id==null?void 0:new _(this.rawMetadata.ad_id)}get factcheck(){return this.rawMetadata.factcheck==null?void 0:new _(this.rawMetadata.factcheck)}get is_clip(){return this.rawMetadata.clip==null?void 0:new ee(this.rawMetadata.clip)}get num_clips(){return this.rawMetadata.nclips==null?void 0:new g(this.rawMetadata.nclips)}get __href__(){return this.rawMetadata.__href__==null?void 0:new _(this.rawMetadata.__href__)}get __img__(){return this.rawMetadata.__img__==null?void 0:new _(this.rawMetadata.__img__)}};t([n()],pe.prototype,`created_on`,null),t([n()],pe.prototype,`file_creation_mtime`,null),t([n()],pe.prototype,`filename`,null),t([n()],pe.prototype,`file_basename`,null),t([n()],pe.prototype,`result_in_subfile`,null),t([n()],pe.prototype,`query`,null),t([n()],pe.prototype,`date_favorited`,null),t([n()],pe.prototype,`updated_on`,null),t([n()],pe.prototype,`ad_id`,null),t([n()],pe.prototype,`factcheck`,null),t([n()],pe.prototype,`is_clip`,null),t([n()],pe.prototype,`num_clips`,null),t([n()],pe.prototype,`__href__`,null),t([n()],pe.prototype,`__img__`,null);var me=class{constructor(e){this.rawMetadata=e,this.fields=new pe(e.fields??{})}get identifier(){return this.fields.identifier}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get collection_files_count(){return this.rawMetadata.fields?.collection_files_count==null?void 0:new g(this.rawMetadata.fields.collection_files_count)}get collection_size(){return this.fields.collection_size}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get files_count(){return this.fields.files_count}get genre(){return this.rawMetadata.fields?.genre==null?void 0:new _(this.rawMetadata.fields.genre)}get indexflag(){return this.rawMetadata.fields?.indexflag==null?void 0:new _(this.rawMetadata.fields.indexflag)}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get lending___available_to_borrow(){return this.rawMetadata.fields?.lending___available_to_borrow==null?void 0:new ee(this.rawMetadata.fields.lending___available_to_borrow)}get lending___available_to_browse(){return this.rawMetadata.fields?.lending___available_to_browse==null?void 0:new ee(this.rawMetadata.fields.lending___available_to_browse)}get lending___available_to_waitlist(){return this.rawMetadata.fields?.lending___available_to_waitlist==null?void 0:new ee(this.rawMetadata.fields.lending___available_to_waitlist)}get lending___status(){return this.rawMetadata.fields?.lending___status==null?void 0:new _(this.rawMetadata.fields.lending___status)}get licenseurl(){return this.rawMetadata.fields?.licenseurl==null?void 0:new _(this.rawMetadata.fields.licenseurl)}get mediatype(){return this.fields.mediatype}get month(){return this.fields.month}get noindex(){return this.fields.noindex}get num_favorites(){return this.fields.num_favorites}get num_reviews(){return this.fields.num_reviews}get publicdate(){return this.fields.publicdate}get reviewdate(){return this.fields.reviewdate}get review(){let e=this.rawMetadata.review;return e?new le(e):void 0}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get type(){return this.fields.type}get volume(){return this.fields.volume}get week(){return this.fields.week}get year(){return this.fields.year}};t([n()],me.prototype,`collection_files_count`,null),t([n()],me.prototype,`genre`,null),t([n()],me.prototype,`indexflag`,null),t([n()],me.prototype,`lending___available_to_borrow`,null),t([n()],me.prototype,`lending___available_to_browse`,null),t([n()],me.prototype,`lending___available_to_waitlist`,null),t([n()],me.prototype,`lending___status`,null),t([n()],me.prototype,`licenseurl`,null),t([n()],me.prototype,`review`,null);var he=class{constructor(e){this.rawMetadata=e,this.fields=new pe(e.fields??{})}get identifier(){return this.fields.identifier}get highlight(){return this.rawMetadata.highlight?.text?new _(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get issue(){return this.fields.issue}get mediatype(){return this.fields.mediatype}get page_num(){return this.rawMetadata.fields?.page_num==null?void 0:new g(this.rawMetadata.fields.page_num)}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get year(){return this.fields.year}get __href__(){return this.fields.__href__}};t([n()],he.prototype,`highlight`,null),t([n()],he.prototype,`page_num`,null);var y;(function(e){e[e.COUNT=0]=`COUNT`,e[e.ALPHABETICAL=1]=`ALPHABETICAL`,e[e.NUMERIC=2]=`NUMERIC`})(y||={});var ge=class{constructor(e){this.buckets=e.buckets,this.first_bucket_key=e.first_bucket_key,this.last_bucket_key=e.last_bucket_key,this.number_buckets=e.number_buckets,this.interval=e.interval,this.first_bucket_year=e.first_bucket_year,this.first_bucket_month=e.first_bucket_month,this.last_bucket_year=e.last_bucket_year,this.last_bucket_month=e.last_bucket_month,this.interval_in_months=e.interval_in_months}getSortedBuckets(e){let t=[...this.buckets];if(this.isRawNumberBuckets(t))return t;let n=new Intl.Collator;switch(e){case y.ALPHABETICAL:return t.sort((e,t)=>n.compare(e.key.toString(),t.key.toString()));case y.NUMERIC:return t.sort((e,t)=>Number(t.key)-Number(e.key));case y.COUNT:default:return t}}isRawNumberBuckets(e){return typeof e[0]==`number`}};t([n()],ge.prototype,`getSortedBuckets`,null);var _e=class{constructor(e){this.rawMetadata=e,this.fields=new pe(e.fields??{})}get identifier(){return this.fields.query?.value}get title(){return this.fields.title}get query(){return this.fields.query}get date_favorited(){return this.fields.date_favorited}get __href__(){return this.fields.__href__}},ve=class{constructor(e){this.rawMetadata=e,this.fields=new pe(e.fields??{})}get identifier(){return this.rawMetadata.fields?.url}get mediatype(){return new ae(`web`)}get title(){return this.rawMetadata.fields?.url?new _(this.rawMetadata.fields?.url):void 0}get capture_dates(){return this.rawMetadata.fields?.capture_dates?new te(this.rawMetadata.fields?.capture_dates):void 0}get __href__(){return this.fields.__href__}};t([n()],ve.prototype,`title`,null),t([n()],ve.prototype,`capture_dates`,null);var ye=class{constructor(e){this.rawMetadata=e,this.fields=new pe(e.fields??{})}get identifier(){return this.fields.identifier}get highlight(){return this.rawMetadata.highlight?.text?new _(this.rawMetadata.highlight.text):void 0}get addeddate(){return this.fields.addeddate}get ad_id(){return this.fields.ad_id}get avg_rating(){return this.fields.avg_rating}get collection(){return this.fields.collection}get created_on(){return this.fields.created_on}get creator(){return this.fields.creator}get date(){return this.fields.date}get description(){return this.fields.description}get downloads(){return this.fields.downloads}get factcheck(){return this.fields.factcheck}get filename(){return this.fields.filename}get file_basename(){return this.fields.file_basename}get file_creation_mtime(){return this.fields.file_creation_mtime}get files_count(){return this.fields.files_count}get is_clip(){return this.fields.is_clip}get issue(){return this.fields.issue}get item_count(){return this.fields.item_count}get item_size(){return this.fields.item_size}get language(){return this.fields.language}get mediatype(){return this.fields.mediatype}get num_clips(){return this.fields.num_clips}get num_favorites(){return this.fields.num_favorites}get publicdate(){return this.fields.publicdate}get result_in_subfile(){return this.fields.result_in_subfile}get reviewdate(){return this.fields.reviewdate}get source(){return this.fields.source}get subject(){return this.fields.subject}get title(){return this.fields.title}get updated_on(){return this.fields.updated_on}get week(){return this.fields.week}get year(){return this.fields.year}get start(){return this.rawMetadata.fields?.start==null?void 0:new _(this.rawMetadata.fields.start)}get __href__(){return this.fields.__href__}get __img__(){return this.fields.__img__}};t([n()],ye.prototype,`highlight`,null),t([n()],ye.prototype,`start`,null);var be=class{constructor(e){this.rawResponse=e}get item_size(){return this.rawResponse.item_size}get files_count(){return this.rawResponse.files_count}get month(){return this.rawResponse.month}get week(){return this.rawResponse.week}get downloads(){return this.rawResponse.downloads}get num_favorites(){return this.rawResponse.num_favorites}get title_message(){return this.rawResponse.title_message}get primary_collection(){return this.rawResponse.primary_collection}get thumbnail_url(){return this.rawResponse.thumbnail_url}get num_reviews(){return this.rawResponse.num_reviews}get uploader_details(){return this.rawResponse.uploader_details}get public_metadata(){if(this.rawResponse.public_metadata)return new v(this.rawResponse.public_metadata)}get part_of(){return this.rawResponse.part_of}get speech_vs_music_asr_metadata(){return this.rawResponse.speech_vs_music_asr_metadata}get reviews_metadata(){return(this.rawResponse.reviews_metadata??[]).map(e=>new le(e))}};t([n()],be.prototype,`public_metadata`,null),t([n()],be.prototype,`reviews_metadata`,null);var b=class e{constructor(e,t){this.extraInfo=null,this.schema=t,this.schemaHitType=t?.hit_type;let n;e?.page_elements&&(this.pageElements=e.page_elements,n=Object.values(this.pageElements)[0]);let r=e?.hits?.hits;this.totalResults=e?.hits?.total??0,this.returnedCount=e?.hits?.returned??0,!r?.length&&this.pageElements?.service___fts?(this.totalResults=0,this.returnedCount=0,this.handleFederatedPageElements()):!r?.length&&n?.hits?.hits?(r=n.hits.hits,this.totalResults=n.hits.total??0,this.returnedCount=n.hits.returned??0):this.pageElements?.lending?r=this.handleLendingPageElement():this.pageElements?.web_archives&&(r=this.handleWebArchivesPageElement()),this.results=this.formatHits(r);let i=e?.aggregations;!(this.aggregations&&Object.keys(this.aggregations).length>0)&&n?.aggregations&&(i=n.aggregations),i&&this.buildAggregations(i),e?.collection_titles&&(this.collectionTitles=e.collection_titles??{}),e?.tv_channel_aliases&&(this.tvChannelAliases=e.tv_channel_aliases??{}),e?.collection_extra_info&&(this.collectionExtraInfo=e.collection_extra_info??null),e?.account_extra_info&&(this.accountExtraInfo=e.account_extra_info??null),e?.extra_info&&(this.extraInfo=new be(e.extra_info))}formatHits(t){return t?.map(t=>e.createResult(t.hit_type??this.schemaHitType,t))??[]}buildAggregations(e){this.aggregations=Object.entries(e).reduce((e,[t,n])=>(e[t]=new ge(n),e),{})}handleLendingPageElement(){let e=this.pageElements?.lending,t=e.loans??[];this.totalResults=t.length,this.returnedCount=this.totalResults;for(let t of ue)e[t]=this.formatHits(e[t]);return t}handleWebArchivesPageElement(){let e=fe(this.pageElements?.web_archives);return this.totalResults=e.length,this.returnedCount=this.totalResults,e}handleFederatedPageElements(){for(let e of[`service___fts`,`service___tvs`,`service___rcs`,`service___whisper`,`metadata___mediatype___texts`,`metadata___mediatype___movies`,`metadata___mediatype___audio`,`metadata___mediatype___software`,`metadata___mediatype___image`,`metadata___mediatype___etree`]){let t=this.removePageElementPrefix(e);this.federatedResults?this.federatedResults[e]=[]:this.federatedResults={[t]:[]};let n=this.pageElements?.[e]?.hits;n?.hits&&(this.federatedResults[t]=this.formatHits(n?.hits)),this.totalResults+=n?.total??0,this.returnedCount+=n?.returned??0}}removePageElementPrefix(e){return e.split(`___`).pop()}static createResult(e,t){switch(e){case`item`:return new me(t);case`text`:case`asr_text`:return new he(t);case`favorited_search`:return new _e(t);case`web_archive`:return new ve(t);case`tv_clip`:return new ye(t);default:return new me(t)}}},xe=class{constructor(e){this.clientParameters=e.client_parameters,this.backendRequests=e.backend_requests,this.kind=e.kind}},Se=class{constructor(e){this.rawResponse=e,this.request=new xe(e.request),this.responseHeader=e.response?.header,this.sessionContext=e.session_context,this.response=new b(e.response?.body,e.response?.hit_schema)}},Ce=class{static aggregateSearchParamsAsString(e){if(e.omit)return`false`;if(e.advancedParams){let t=e.advancedParams.map(e=>({terms:e}));return JSON.stringify(t)}if(e.simpleParams)return e.simpleParams.join(`,`)}static sortParamsAsString(e){return`${e.field}:${e.direction}`}static filterParamsAsString(e){return JSON.stringify(e)}static generateURLSearchParams(e){let t=new URLSearchParams;if(e.query&&t.append(`user_query`,e.query),e.pageType&&t.append(`page_type`,String(e.pageType)),e.pageTarget&&t.append(`page_target`,String(e.pageTarget)),e.pageElements&&e.pageElements.length>0){let n=`[${e.pageElements.map(e=>`"${e}"`).join(`,`)}]`;t.append(`page_elements`,n)}if(e.rows!=null&&t.append(`hits_per_page`,String(e.rows)),e.page!=null&&t.append(`page`,String(e.page)),e.fields&&e.fields.length>0&&t.append(`fields`,e.fields.join(`,`)),e.filters&&Object.keys(e.filters).length>0){let n=this.filterParamsAsString(e.filters);n&&n!==`{}`&&t.append(`filter_map`,n)}if(e.sort&&e.sort.length>0){let n=e.sort.map(e=>this.sortParamsAsString(e));t.append(`sort`,n.join(`,`))}let n=e.aggregations;if(n){let e=this.aggregateSearchParamsAsString(n);e&&t.append(`aggregations`,e)}if(e.aggregationsSize!=null&&t.append(`aggregations_size`,String(e.aggregationsSize)),e.debugging&&t.append(`debugging`,`true`),e.uid&&t.append(`uid`,e.uid),e.includeClientUrl!==!1){let n=e.query==null,r=e.query&&e.query.length<=1e3;if(n||r){let e=window.location.href.slice(0,400);t.append(`client_url`,e)}}return t}},we;(function(e){e.networkError=`SearchService.NetworkError`,e.itemNotFound=`SearchService.ItemNotFound`,e.decodingError=`SearchService.DecodingError`,e.searchEngineError=`SearchService.SearchEngineError`})(we||={});var Te=class extends Error{constructor(e,t,n){super(t),this.name=e,this.type=e,this.details=n}},Ee={reCache:JSON.stringify({recompute:!0}),noCache:JSON.stringify({bypass:!0}),dontCache:JSON.stringify({no_compute:!0})},De=class{constructor(e){this.baseUrl=e?.baseUrl??`archive.org`,e?.includeCredentials===void 0?this.includeCredentials=window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/)!==null:this.includeCredentials=e.includeCredentials;let t=new URL(window.location.href).searchParams,n=t.get(`scope`),r=t.get(`verbose`),i=t.get(`debugging`),a=t.get(`cacheDebug`),o=``;for(let e of Object.keys(Ee))if(t.get(e)){o=Ee[e];break}o=t.get(`caching`)??o,e?.caching===void 0?o&&(this.cachingFlags=o):this.cachingFlags=e.caching,e?.debuggingEnabled===void 0?(i||a)&&(this.debuggingEnabled=!0):this.debuggingEnabled=e.debuggingEnabled,e?.scope===void 0?n&&(this.requestScope=n):this.requestScope=e.scope,e?.verbose===void 0?r&&(this.verbose=!!r):this.verbose=e.verbose}async fetchUrl(e,t){let n=new URL(e);this.requestScope&&n.searchParams.set(`scope`,this.requestScope),this.cachingFlags&&n.searchParams.set(`caching`,this.cachingFlags);let r;try{let e=t?.requestOptions??{credentials:this.includeCredentials?`include`:`same-origin`};r=await fetch(n.href,e)}catch(e){let t=e instanceof Error?e.message:typeof e==`string`?e:`Unknown error`;return this.getErrorResult(we.networkError,t)}try{let e=await r.json();this.verbose&&this.printResponse(e),e.debugging&&this.printDebuggingInfo(e);let t=e.response?.error;return t?this.getErrorResult(we.searchEngineError,t.message,t.forensics):{success:e}}catch(e){let t=e instanceof Error?e.message:typeof e==`string`?e:`Unknown error`;return this.getErrorResult(we.decodingError,t)}}getErrorResult(e,t,n){return{error:new Te(e,t,n)}}printResponse(e){try{let t=JSON.parse(JSON.stringify(e)),n=t?.response?.body?.hits?.hits;if(Array.isArray(n)&&n.length>1){let e=[];e.push(n[0]),e.push(`*** ${n.length-1} hits omitted ***`),t.response.body.hits.hits=e}let r=t?.response?.body?.aggregations;r&&Object.entries(r).forEach(([e,n])=>{if(n?.buckets?.length>0){let r=JSON.parse(JSON.stringify(n));r.buckets=`*** ${r.buckets?.length??0} buckets omitted ***`,t.response.body.aggregations[e]=r}}),console.log(`***** RESPONSE RECEIVED *****`),console.groupCollapsed(`Response`),console.log(JSON.stringify(t,null,2)),console.groupEnd()}catch(e){console.error(`Error printing search response:`,e)}}printDebuggingInfo(e){let t=e.debugging,n=t.messages??[],r=t.data??{};console.log(`***** BEGIN DEBUGGING *****`),console.log(`Full response:`),console.log(JSON.stringify(e,null,2)),console.group(`Debug messages`);for(let e of n)console.log(e);console.groupEnd(),console.group(`Debug data`);for(let[e,t]of Object.entries(r))console.log(e,t);console.groupEnd(),console.log(`***** END DEBUGGING *****`)}},Oe=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?service_backend=metadata&${t}`;return this.fetchUrl(n)}},ke=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?service_backend=fts&${t}`;return this.fetchUrl(n)}},Ae=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?service_backend=rcs&${t}`;return this.fetchUrl(n)}},x;(function(e){e[e.DEFAULT=0]=`DEFAULT`,e[e.METADATA=1]=`METADATA`,e[e.FULLTEXT=2]=`FULLTEXT`,e[e.TV=3]=`TV`,e[e.RADIO=4]=`RADIO`,e[e.FEDERATED=5]=`FEDERATED`})(x||={});var je=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?service_backend=tvs&${t}`;return this.fetchUrl(n)}},Me=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?page_type=simple_federation&${t}`;return this.fetchUrl(n)}},Ne=class extends De{constructor(e){super(e),this.servicePath=e?.servicePath??`/services/search/beta/page_production`}async performSearch(e){this.debuggingEnabled&&e.debugging===void 0&&(e.debugging=!0);let t=Ce.generateURLSearchParams(e).toString(),n=`https://${this.baseUrl}${this.servicePath}/?${t}`,{pageType:r,identifiers:i}=e,a=r===`client_document_fetch`&&i?.length?{requestOptions:{method:`POST`,body:JSON.stringify({doc_ids:i}),credentials:`include`}}:void 0;return this.fetchUrl(n,a)}},Pe=class e{constructor(e={}){this.backendOptions=e}async search(t,n=x.METADATA){let r=await e.getBackendForSearchType(n,this.backendOptions).performSearch(t);return r.error?r:{success:new Se(r.success)}}itemDetails(e){let t={pageType:`item_details`,pageTarget:e};return this.search(t,x.DEFAULT)}static getBackendForSearchType(e,t={}){switch(e){case x.METADATA:return new Oe(t);case x.FULLTEXT:return new ke(t);case x.RADIO:return new Ae(t);case x.TV:return new je(t);case x.FEDERATED:return new Me(t);default:return new Ne(t)}}};Pe.default=new Pe,t([n((e,t={})=>{let{includeCredentials:n=!1,verbose:r=!1,scope:i=``,baseUrl:a=``}=t;return`${e};${n};${r};${i};${a}`})],Pe,`getBackendForSearchType`,null);var Fe;(function(e){e.INCLUDE=`inc`,e.EXCLUDE=`exc`,e.GREATER_THAN=`gt`,e.GREATER_OR_EQUAL=`gte`,e.LESS_THAN=`lt`,e.LESS_OR_EQUAL=`lte`})(Fe||={});var Ie=class{constructor(){this.filterMap={}}addFilter(e,t,n){if(this.filterMap[e]||(this.filterMap[e]={}),this.filterMap[e][t]){let r=[].concat(this.filterMap[e][t],n);this.filterMap[e][t]=Array.from(new Set(r))}else this.filterMap[e][t]=n;return this}removeSingleFilter(e,t,n){if(!this.filterMap[e]?.[t])return this;let r=[].concat(this.filterMap[e][t]),i=r.indexOf(n);return i>=0&&r.splice(i,1),this.filterMap[e][t]=r.length===1?r[0]:r,r.length===0&&delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this}removeFilters(e,t){return this.filterMap[e]?(delete this.filterMap[e][t],this.deleteFieldIfEmpty(e),this):this}deleteFieldIfEmpty(e){let t=this.filterMap[e];t&&Object.keys(t).length===0&&delete this.filterMap[e]}setFilterMap(e){return this.filterMap={...e},this}mergeFilterMap(e){for(let[t,n]of Object.entries(e))for(let[e,r]of Object.entries(n))if(Array.isArray(r))for(let n of r)this.addFilter(t,e,n);else this.addFilter(t,e,r);return this}build(){return this.filterMap}},Le=globalThis,Re=Le.ShadowRoot&&(Le.ShadyCSS===void 0||Le.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,ze=Symbol(),Be=new WeakMap,Ve=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==ze)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Re&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Be.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Be.set(t,e))}return e}toString(){return this.cssText}},He=e=>new Ve(typeof e==`string`?e:e+``,void 0,ze),Ue=(e,t)=>{if(Re)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=Le.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},We=Re?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return He(t)})(e):e,{is:Ge,defineProperty:Ke,getOwnPropertyDescriptor:qe,getOwnPropertyNames:Je,getOwnPropertySymbols:Ye,getPrototypeOf:Xe}=Object,Ze=globalThis,Qe=Ze.trustedTypes,$e=Qe?Qe.emptyScript:``,et=Ze.reactiveElementPolyfillSupport,tt=(e,t)=>e,nt={toAttribute(e,t){switch(t){case Boolean:e=e?$e:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},S=(e,t)=>!Ge(e,t),rt={attribute:!0,type:String,converter:nt,reflect:!1,useDefault:!1,hasChanged:S};Symbol.metadata??=Symbol(`metadata`),Ze.litPropertyMetadata??=new WeakMap;var it=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=rt){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Ke(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=qe(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??rt}static _$Ei(){if(this.hasOwnProperty(tt(`elementProperties`)))return;let e=Xe(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(tt(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(tt(`properties`))){let e=this.properties,t=[...Je(e),...Ye(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(We(e))}else e!==void 0&&t.push(We(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ue(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?nt:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?nt:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??S)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};it.elementStyles=[],it.shadowRootOptions={mode:`open`},it[tt(`elementProperties`)]=new Map,it[tt(`finalized`)]=new Map,et?.({ReactiveElement:it}),(Ze.reactiveElementVersions??=[]).push(`2.1.2`);var at=globalThis,ot=e=>e,st=at.trustedTypes,ct=st?st.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,lt=`$lit$`,ut=`lit$${Math.random().toFixed(9).slice(2)}$`,dt=`?`+ut,ft=`<${dt}>`,pt=document,mt=()=>pt.createComment(``),ht=e=>e===null||typeof e!=`object`&&typeof e!=`function`,gt=Array.isArray,_t=e=>gt(e)||typeof e?.[Symbol.iterator]==`function`,vt=`[ 	
\f\r]`,yt=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,xt=/>/g,St=RegExp(`>|${vt}(?:([^\\s"'>=/]+)(${vt}*=${vt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Ct=/'/g,wt=/"/g,Tt=/^(?:script|style|textarea|title)$/i,Et=Symbol.for(`lit-noChange`),C=Symbol.for(`lit-nothing`),Dt=new WeakMap,Ot=pt.createTreeWalker(pt,129);function kt(e,t){if(!gt(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ct===void 0?t:ct.createHTML(t)}var At=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=yt;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===yt?c[1]===`!--`?o=bt:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=St):(Tt.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=St):o=xt:o===St?c[0]===`>`?(o=i??yt,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?St:c[3]===`"`?wt:Ct):o===wt||o===Ct?o=St:o===bt||o===xt?o=yt:(o=St,i=void 0);let d=o===St&&e[t+1].startsWith(`/>`)?` `:``;a+=o===yt?n+ft:l>=0?(r.push(s),n.slice(0,l)+lt+n.slice(l)+ut+d):n+ut+(l===-2?t:d)}return[kt(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},jt=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=At(t,n);if(this.el=e.createElement(l,r),Ot.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=Ot.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(lt)){let t=u[o++],n=i.getAttribute(e).split(ut),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?It:r[1]===`?`?Lt:r[1]===`@`?Rt:Ft}),i.removeAttribute(e)}else e.startsWith(ut)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Tt.test(i.tagName)){let e=i.textContent.split(ut),t=e.length-1;if(t>0){i.textContent=st?st.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],mt()),Ot.nextNode(),c.push({type:2,index:++a});i.append(e[t],mt())}}}else if(i.nodeType===8)if(i.data===dt)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(ut,e+1))!==-1;)c.push({type:7,index:a}),e+=ut.length-1}a++}}static createElement(e,t){let n=pt.createElement(`template`);return n.innerHTML=e,n}};function Mt(e,t,n=e,r){if(t===Et)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=ht(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Mt(e,i._$AS(e,t.values),i,r)),t}var Nt=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??pt).importNode(t,!0);Ot.currentNode=r;let i=Ot.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Pt(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new zt(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Ot.nextNode(),a++)}return Ot.currentNode=pt,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Pt=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=C,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Mt(this,e,t),ht(e)?e===C||e==null||e===``?(this._$AH!==C&&this._$AR(),this._$AH=C):e!==this._$AH&&e!==Et&&this._(e):e._$litType$===void 0?e.nodeType===void 0?_t(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==C&&ht(this._$AH)?this._$AA.nextSibling.data=e:this.T(pt.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=jt.createElement(kt(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Nt(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Dt.get(e.strings);return t===void 0&&Dt.set(e.strings,t=new jt(e)),t}k(t){gt(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(mt()),this.O(mt()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=ot(e).nextSibling;ot(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ft=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=C,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=C}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Mt(this,e,t,0),a=!ht(e)||e!==this._$AH&&e!==Et,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Mt(this,r[n+o],t,o),s===Et&&(s=this._$AH[o]),a||=!ht(s)||s!==this._$AH[o],s===C?e=C:e!==C&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===C?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},It=class extends Ft{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===C?void 0:e}},Lt=class extends Ft{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==C)}},Rt=class extends Ft{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Mt(this,e,t,0)??C)===Et)return;let n=this._$AH,r=e===C&&n!==C||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==C&&(n===C||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},zt=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Mt(this,e)}},Bt={M:lt,P:ut,A:dt,C:1,L:At,R:Nt,D:_t,V:Mt,I:Pt,H:Ft,N:Lt,U:Rt,B:It,F:zt},Vt=at.litHtmlPolyfillSupport;Vt?.(jt,Pt),(at.litHtmlVersions??=[]).push(`3.3.2`);var Ht=globalThis,Ut=Ht.ShadowRoot&&(Ht.ShadyCSS===void 0||Ht.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,Wt=Symbol(),Gt=new WeakMap,Kt=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==Wt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(Ut&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=Gt.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&Gt.set(t,e))}return e}toString(){return this.cssText}},qt=e=>new Kt(typeof e==`string`?e:e+``,void 0,Wt),w=(e,...t)=>new Kt(e.length===1?e[0]:t.reduce((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1],e[0]),e,Wt),Jt=(e,t)=>{if(Ut)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let n of t){let t=document.createElement(`style`),r=Ht.litNonce;r!==void 0&&t.setAttribute(`nonce`,r),t.textContent=n.cssText,e.appendChild(t)}},Yt=Ut?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return qt(t)})(e):e,{is:Xt,defineProperty:Zt,getOwnPropertyDescriptor:Qt,getOwnPropertyNames:$t,getOwnPropertySymbols:en,getPrototypeOf:tn}=Object,nn=globalThis,rn=nn.trustedTypes,an=rn?rn.emptyScript:``,on=nn.reactiveElementPolyfillSupport,sn=(e,t)=>e,cn={toAttribute(e,t){switch(t){case Boolean:e=e?an:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},ln=(e,t)=>!Xt(e,t),un={attribute:!0,type:String,converter:cn,reflect:!1,useDefault:!1,hasChanged:ln};Symbol.metadata??=Symbol(`metadata`),nn.litPropertyMetadata??=new WeakMap;var dn=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=un){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){let n=Symbol(),r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Zt(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){let{get:r,set:i}=Qt(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:r,set(t){let a=r?.call(this);i?.call(this,t),this.requestUpdate(e,a,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??un}static _$Ei(){if(this.hasOwnProperty(sn(`elementProperties`)))return;let e=tn(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(sn(`finalized`)))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(sn(`properties`))){let e=this.properties,t=[...$t(e),...en(e)];for(let n of t)this.createProperty(n,e[n])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[e,n]of t)this.elementProperties.set(e,n)}this._$Eh=new Map;for(let[e,t]of this.elementProperties){let n=this._$Eu(e,t);n!==void 0&&this._$Eh.set(n,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(Yt(e))}else e!==void 0&&t.push(Yt(e));return t}static _$Eu(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let n of t.keys())this.hasOwnProperty(n)&&(e.set(n,this[n]),delete this[n]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Jt(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$ET(e,t){let n=this.constructor.elementProperties.get(e),r=this.constructor._$Eu(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?cn:n.converter).toAttribute(t,n.type);this._$Em=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$Em=null}}_$AK(e,t){let n=this.constructor,r=n._$Eh.get(e);if(r!==void 0&&this._$Em!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?cn:e.converter;this._$Em=r;let a=i.fromAttribute(t,e.type);this[r]=a??this._$Ej?.get(r)??a,this._$Em=null}}requestUpdate(e,t,n,r=!1,i){if(e!==void 0){let a=this.constructor;if(!1===r&&(i=this[e]),n??=a.getPropertyOptions(e),!((n.hasChanged??ln)(i,t)||n.useDefault&&n.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(a._$Eu(e,n))))return;this.C(e,t,n)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:n,reflect:r,wrapped:i},a){n&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,a??t??this[e]),!0!==i||a!==void 0)||(this._$AL.has(e)||(this.hasUpdated||n||(t=void 0),this._$AL.set(e,t)),!0===r&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}let e=this.constructor.elementProperties;if(e.size>0)for(let[t,n]of e){let{wrapped:e}=n,r=this[t];!0!==e||this._$AL.has(t)||r===void 0||this.C(t,void 0,n,r)}}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};dn.elementStyles=[],dn.shadowRootOptions={mode:`open`},dn[sn(`elementProperties`)]=new Map,dn[sn(`finalized`)]=new Map,on?.({ReactiveElement:dn}),(nn.reactiveElementVersions??=[]).push(`2.1.2`);var fn=globalThis,pn=e=>e,mn=fn.trustedTypes,hn=mn?mn.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,gn=`$lit$`,_n=`lit$${Math.random().toFixed(9).slice(2)}$`,vn=`?`+_n,yn=`<${vn}>`,bn=document,xn=()=>bn.createComment(``),Sn=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Cn=Array.isArray,wn=e=>Cn(e)||typeof e?.[Symbol.iterator]==`function`,Tn=`[ 	
\f\r]`,En=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Dn=/-->/g,On=/>/g,kn=RegExp(`>|${Tn}(?:([^\\s"'>=/]+)(${Tn}*=${Tn}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),An=/'/g,jn=/"/g,Mn=/^(?:script|style|textarea|title)$/i,Nn=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),T=Nn(1),E=Nn(2),Pn=Symbol.for(`lit-noChange`),D=Symbol.for(`lit-nothing`),Fn=new WeakMap,In=bn.createTreeWalker(bn,129);function Ln(e,t){if(!Cn(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return hn===void 0?t:hn.createHTML(t)}var Rn=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:t===3?`<math>`:``,o=En;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===En?c[1]===`!--`?o=Dn:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=kn):(Mn.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=kn):o=On:o===kn?c[0]===`>`?(o=i??En,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?kn:c[3]===`"`?jn:An):o===jn||o===An?o=kn:o===Dn||o===On?o=En:(o=kn,i=void 0);let d=o===kn&&e[t+1].startsWith(`/>`)?` `:``;a+=o===En?n+yn:l>=0?(r.push(s),n.slice(0,l)+gn+n.slice(l)+_n+d):n+_n+(l===-2?t:d)}return[Ln(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:t===3?`</math>`:``)),r]},zn=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Rn(t,n);if(this.el=e.createElement(l,r),In.currentNode=this.el.content,n===2||n===3){let e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;(i=In.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes())for(let e of i.getAttributeNames())if(e.endsWith(gn)){let t=u[o++],n=i.getAttribute(e).split(_n),r=/([.?@])?(.*)/.exec(t);c.push({type:1,index:a,name:r[2],strings:n,ctor:r[1]===`.`?Wn:r[1]===`?`?Gn:r[1]===`@`?Kn:Un}),i.removeAttribute(e)}else e.startsWith(_n)&&(c.push({type:6,index:a}),i.removeAttribute(e));if(Mn.test(i.tagName)){let e=i.textContent.split(_n),t=e.length-1;if(t>0){i.textContent=mn?mn.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],xn()),In.nextNode(),c.push({type:2,index:++a});i.append(e[t],xn())}}}else if(i.nodeType===8)if(i.data===vn)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(_n,e+1))!==-1;)c.push({type:7,index:a}),e+=_n.length-1}a++}}static createElement(e,t){let n=bn.createElement(`template`);return n.innerHTML=e,n}};function Bn(e,t,n=e,r){if(t===Pn)return t;let i=r===void 0?n._$Cl:n._$Co?.[r],a=Sn(t)?void 0:t._$litDirective$;return i?.constructor!==a&&(i?._$AO?.(!1),a===void 0?i=void 0:(i=new a(e),i._$AT(e,n,r)),r===void 0?n._$Cl=i:(n._$Co??=[])[r]=i),i!==void 0&&(t=Bn(e,i._$AS(e,t.values),i,r)),t}var Vn=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??bn).importNode(t,!0);In.currentNode=r;let i=In.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Hn(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new qn(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=In.nextNode(),a++)}return In.currentNode=bn,r}p(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Hn=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,n,r){this.type=2,this._$AH=D,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cv=r?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Bn(this,e,t),Sn(e)?e===D||e==null||e===``?(this._$AH!==D&&this._$AR(),this._$AH=D):e!==this._$AH&&e!==Pn&&this._(e):e._$litType$===void 0?e.nodeType===void 0?wn(e)?this.k(e):this._(e):this.T(e):this.$(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==D&&Sn(this._$AH)?this._$AA.nextSibling.data=e:this.T(bn.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=zn.createElement(Ln(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.p(t);else{let e=new Vn(r,this),n=e.u(this.options);e.p(t),this.T(n),this._$AH=e}}_$AC(e){let t=Fn.get(e.strings);return t===void 0&&Fn.set(e.strings,t=new zn(e)),t}k(t){Cn(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.O(xn()),this.O(xn()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){let t=pn(e).nextSibling;pn(e).remove(),e=t}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Un=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,n,r,i){this.type=1,this._$AH=D,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=D}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Bn(this,e,t,0),a=!Sn(e)||e!==this._$AH&&e!==Pn,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Bn(this,r[n+o],t,o),s===Pn&&(s=this._$AH[o]),a||=!Sn(s)||s!==this._$AH[o],s===D?e=D:e!==D&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===D?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Wn=class extends Un{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===D?void 0:e}},Gn=class extends Un{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==D)}},Kn=class extends Un{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Bn(this,e,t,0)??D)===Pn)return;let n=this._$AH,r=e===D&&n!==D||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==D&&(n===D||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},qn=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Bn(this,e)}},Jn=fn.litHtmlPolyfillSupport;Jn?.(zn,Hn),(fn.litHtmlVersions??=[]).push(`3.3.2`);var Yn=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Hn(t.insertBefore(xn(),e),e,void 0,n??{})}return i._$AI(e),i},Xn=globalThis,O=class extends dn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Yn(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Pn}};O._$litElement$=!0,O.finalized=!0,Xn.litElementHydrateSupport?.({LitElement:O});var Zn=Xn.litElementPolyfillSupport;Zn?.({LitElement:O}),(Xn.litElementVersions??=[]).push(`4.2.2`);var k=e=>(t,n)=>{n===void 0?customElements.define(e,t):n.addInitializer(()=>{customElements.define(e,t)})},Qn={attribute:!0,type:String,converter:nt,reflect:!1,hasChanged:S},$n=(e=Qn,t,n)=>{let{kind:r,metadata:i}=n,a=globalThis.litPropertyMetadata.get(i);if(a===void 0&&globalThis.litPropertyMetadata.set(i,a=new Map),r===`setter`&&((e=Object.create(e)).wrapped=!0),a.set(n.name,e),r===`accessor`){let{name:r}=n;return{set(n){let i=t.get.call(this);t.set.call(this,n),this.requestUpdate(r,i,e,!0,n)},init(t){return t!==void 0&&this.C(r,void 0,e,t),t}}}if(r===`setter`){let{name:r}=n;return function(n){let i=this[r];t.call(this,n),this.requestUpdate(r,i,e,!0,n)}}throw Error(`Unsupported decorator location: `+r)};function A(e){return(t,n)=>typeof n==`object`?$n(e,t,n):((e,t,n)=>{let r=t.hasOwnProperty(n);return t.constructor.createProperty(n,e),r?Object.getOwnPropertyDescriptor(t,n):void 0})(e,t,n)}function j(e){return A({...e,state:!0,attribute:!1})}var er=(e,t,n)=>(n.configurable=!0,n.enumerable=!0,Reflect.decorate&&typeof t!=`object`&&Object.defineProperty(e,t,n),n);function M(e,t){return(n,r,i)=>{let a=t=>t.renderRoot?.querySelector(e)??null;if(t){let{get:e,set:t}=typeof r==`object`?n:i??(()=>{let e=Symbol();return{get(){return this[e]},set(t){this[e]=t}}})();return er(n,r,{get(){let n=e.call(this);return n===void 0&&(n=a(this),(n!==null||this.hasUpdated)&&t.call(this,n)),n}})}return er(n,r,{get(){return a(this)}})}}var tr=class{constructor(){this.resizeObserver=new ResizeObserver(e=>{window.requestAnimationFrame(()=>{for(let t of e)this.resizeHandlers.get(t.target)?.forEach(e=>{e.handleResize(t)})})}),this.resizeHandlers=new Map}shutdown(){this.resizeHandlers.forEach((e,t)=>{this.resizeObserver.unobserve(t)}),this.resizeHandlers.clear()}addObserver(e){let t=this.resizeHandlers.get(e.target)??new Set;t.add(e.handler),this.resizeHandlers.set(e.target,t),this.resizeObserver.observe(e.target,e.options)}removeObserver(e){let t=this.resizeHandlers.get(e.target);t&&(t.delete(e.handler),t.size===0&&(this.resizeObserver.unobserve(e.target),this.resizeHandlers.delete(e.target)))}},nr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},rr=e=>(...t)=>({_$litDirective$:e,values:t}),ir=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},ar=rr(class extends ir{constructor(e){if(super(e),e.type!==nr.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter(t=>e[t]).join(` `)+` `}update(e,[t]){if(this.st===void 0){this.st=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter(e=>e!==``)));for(let e in t)t[e]&&!this.nt?.has(e)&&this.st.add(e);return this.render(t)}let n=e.element.classList;for(let e of this.st)e in t||(n.remove(e),this.st.delete(e));for(let e in t){let r=!!t[e];r===this.st.has(e)||this.nt?.has(e)||(r?(n.add(e),this.st.add(e)):(n.remove(e),this.st.delete(e)))}return Et}}),or=(e,...t)=>({strTag:!0,strings:e,values:t}),sr=e=>typeof e!=`string`&&`strTag`in e,cr=(e,t,n)=>{let r=e[0];for(let i=1;i<e.length;i++)r+=t[n?n[i-1]:i-1],r+=e[i];return r},N=(e=>sr(e)?cr(e.strings,e.values):e),lr=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}},ur=[];for(let e=0;e<256;e++)ur[e]=(e>>4&15).toString(16)+(e&15).toString(16);new lr().resolve();var dr=window,fr=dr.ShadowRoot&&(dr.ShadyCSS===void 0||dr.ShadyCSS.nativeShadow)&&`adoptedStyleSheets`in Document.prototype&&`replace`in CSSStyleSheet.prototype,pr=Symbol(),mr=new WeakMap,hr=class{constructor(e,t,n){if(this._$cssResult$=!0,n!==pr)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(fr&&e===void 0){let n=t!==void 0&&t.length===1;n&&(e=mr.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),n&&mr.set(t,e))}return e}toString(){return this.cssText}},gr=e=>new hr(typeof e==`string`?e:e+``,void 0,pr),P=(e,...t)=>new hr(e.length===1?e[0]:t.reduce(((t,n,r)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if(typeof e==`number`)return e;throw Error(`Value passed to 'css' function must be a 'css' function result: `+e+`. Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.`)})(n)+e[r+1]),e[0]),e,pr),_r=(e,t)=>{fr?e.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet)):t.forEach((t=>{let n=document.createElement(`style`),r=dr.litNonce;r!==void 0&&n.setAttribute(`nonce`,r),n.textContent=t.cssText,e.appendChild(n)}))},vr=fr?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t=``;for(let n of e.cssRules)t+=n.cssText;return gr(t)})(e):e,yr=window,br=yr.trustedTypes,xr=br?br.emptyScript:``,Sr=yr.reactiveElementPolyfillSupport,Cr={toAttribute(e,t){switch(t){case Boolean:e=e?xr:null;break;case Object:case Array:e=e==null?e:JSON.stringify(e)}return e},fromAttribute(e,t){let n=e;switch(t){case Boolean:n=e!==null;break;case Number:n=e===null?null:Number(e);break;case Object:case Array:try{n=JSON.parse(e)}catch{n=null}}return n}},wr=(e,t)=>t!==e&&(t==t||e==e),Tr={attribute:!0,type:String,converter:Cr,reflect:!1,hasChanged:wr},Er=`finalized`,Dr=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){this.finalize(),(this.h??=[]).push(e)}static get observedAttributes(){this.finalize();let e=[];return this.elementProperties.forEach(((t,n)=>{let r=this._$Ep(n,t);r!==void 0&&(this._$Ev.set(r,n),e.push(r))})),e}static createProperty(e,t=Tr){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){let n=typeof e==`symbol`?Symbol():`__`+e,r=this.getPropertyDescriptor(e,n,t);r!==void 0&&Object.defineProperty(this.prototype,e,r)}}static getPropertyDescriptor(e,t,n){return{get(){return this[t]},set(r){let i=this[e];this[t]=r,this.requestUpdate(e,i,n)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Tr}static finalize(){if(this.hasOwnProperty(Er))return!1;this[Er]=!0;let e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty(`properties`)){let e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(let n of t)this.createProperty(n,e[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let n=new Set(e.flat(1/0).reverse());for(let e of n)t.unshift(vr(e))}else e!==void 0&&t.push(vr(e));return t}static _$Ep(e,t){let n=t.attribute;return!1===n?void 0:typeof n==`string`?n:typeof e==`string`?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise((e=>this.enableUpdating=e)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)==null||e.forEach((e=>e(this)))}addController(e){var t;(this._$ES??=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$ES)==null||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])}))}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return _r(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)==null||e.forEach((e=>e.hostConnected?.call(e)))}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)==null||e.forEach((e=>e.hostDisconnected?.call(e)))}attributeChangedCallback(e,t,n){this._$AK(e,n)}_$EO(e,t,n=Tr){let r=this.constructor._$Ep(e,n);if(r!==void 0&&!0===n.reflect){let i=(n.converter?.toAttribute===void 0?Cr:n.converter).toAttribute(t,n.type);this._$El=e,i==null?this.removeAttribute(r):this.setAttribute(r,i),this._$El=null}}_$AK(e,t){let n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){let e=n.getPropertyOptions(r),i=typeof e.converter==`function`?{fromAttribute:e.converter}:e.converter?.fromAttribute===void 0?Cr:e.converter;this._$El=r,this[r]=i.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,n){let r=!0;e!==void 0&&(((n||=this.constructor.getPropertyOptions(e)).hasChanged||wr)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===n.reflect&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,n))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&=(this._$Ei.forEach(((e,t)=>this[t]=e)),void 0);let t=!1,n=this._$AL;try{t=this.shouldUpdate(n),t?(this.willUpdate(n),(e=this._$ES)==null||e.forEach((e=>e.hostUpdate?.call(e))),this.update(n)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(n)}willUpdate(e){}_$AE(e){var t;(t=this._$ES)==null||t.forEach((e=>e.hostUpdated?.call(e))),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach(((e,t)=>this._$EO(t,this[t],e))),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Dr[Er]=!0,Dr.elementProperties=new Map,Dr.elementStyles=[],Dr.shadowRootOptions={mode:`open`},Sr?.({ReactiveElement:Dr}),(yr.reactiveElementVersions??=[]).push(`1.6.3`);var Or=window,kr=Or.trustedTypes,Ar=kr?kr.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,jr=`$lit$`,Mr=`lit$${(Math.random()+``).slice(9)}$`,Nr=`?`+Mr,Pr=`<${Nr}>`,Fr=document,Ir=()=>Fr.createComment(``),Lr=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Rr=Array.isArray,zr=e=>Rr(e)||typeof e?.[Symbol.iterator]==`function`,Br=`[ 	
\f\r]`,Vr=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Hr=/-->/g,Ur=/>/g,Wr=RegExp(`>|${Br}(?:([^\\s"'>=/]+)(${Br}*=${Br}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Gr=/'/g,Kr=/"/g,qr=/^(?:script|style|textarea|title)$/i,Jr=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),Yr=Symbol.for(`lit-noChange`),F=Symbol.for(`lit-nothing`),Xr=new WeakMap,Zr=Fr.createTreeWalker(Fr,129,null,!1);function Qr(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ar===void 0?t:Ar.createHTML(t)}var $r=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=Vr;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===Vr?c[1]===`!--`?o=Hr:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Wr):(qr.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Wr):o=Ur:o===Wr?c[0]===`>`?(o=i??Vr,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Wr:c[3]===`"`?Kr:Gr):o===Kr||o===Gr?o=Wr:o===Hr||o===Ur?o=Vr:(o=Wr,i=void 0);let d=o===Wr&&e[t+1].startsWith(`/>`)?` `:``;a+=o===Vr?n+Pr:l>=0?(r.push(s),n.slice(0,l)+jr+n.slice(l)+Mr+d):n+Mr+(l===-2?(r.push(void 0),t):d)}return[Qr(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},ei=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=$r(t,n);if(this.el=e.createElement(l,r),Zr.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=Zr.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(jr)||t.startsWith(Mr)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+jr).split(Mr),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?ai:t[1]===`?`?si:t[1]===`@`?ci:ii})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(qr.test(i.tagName)){let e=i.textContent.split(Mr),t=e.length-1;if(t>0){i.textContent=kr?kr.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Ir()),Zr.nextNode(),c.push({type:2,index:++a});i.append(e[t],Ir())}}}else if(i.nodeType===8)if(i.data===Nr)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Mr,e+1))!==-1;)c.push({type:7,index:a}),e+=Mr.length-1}a++}}static createElement(e,t){let n=Fr.createElement(`template`);return n.innerHTML=e,n}};function ti(e,t,n=e,r){var i,a;if(t===Yr)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=Lr(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=ti(e,o._$AS(e,t.values),o,r)),t}var ni=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Fr).importNode(t,!0);Zr.currentNode=r;let i=Zr.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new ri(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new li(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Zr.nextNode(),a++)}return Zr.currentNode=Fr,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},ri=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=ti(this,e,t),Lr(e)?e===F||e==null||e===``?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==Yr&&this._(e):e._$litType$===void 0?e.nodeType===void 0?zr(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==F&&Lr(this._$AH)?this._$AA.nextSibling.data=e:this.$(Fr.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ei.createElement(Qr(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new ni(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=Xr.get(e.strings);return t===void 0&&Xr.set(e.strings,t=new ei(e)),t}T(t){Rr(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(Ir()),this.k(Ir()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},ii=class{constructor(e,t,n,r,i){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=F}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=ti(this,e,t,0),a=!Lr(e)||e!==this._$AH&&e!==Yr,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=ti(this,r[n+o],t,o),s===Yr&&(s=this._$AH[o]),a||=!Lr(s)||s!==this._$AH[o],s===F?e=F:e!==F&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},ai=class extends ii{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}},oi=kr?kr.emptyScript:``,si=class extends ii{constructor(){super(...arguments),this.type=4}j(e){e&&e!==F?this.element.setAttribute(this.name,oi):this.element.removeAttribute(this.name)}},ci=class extends ii{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=ti(this,e,t,0)??F)===Yr)return;let n=this._$AH,r=e===F&&n!==F||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==F&&(n===F||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},li=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){ti(this,e)}},ui={O:jr,P:Mr,A:Nr,C:1,M:$r,L:ni,R:zr,D:ti,I:ri,V:ii,H:si,N:ci,U:ai,F:li},di=Or.litHtmlPolyfillSupport;di?.(ei,ri),(Or.litHtmlVersions??=[]).push(`2.8.0`);var fi=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new ri(t.insertBefore(Ir(),e),e,void 0,n??{})}return i._$AI(e),i},pi,mi=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=fi(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Yr}};mi.finalized=!0,mi._$litElement$=!0,(pi=globalThis.litElementHydrateSupport)==null||pi.call(globalThis,{LitElement:mi});var hi=globalThis.litElementPolyfillSupport;hi?.({LitElement:mi}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var gi=e=>t=>typeof t==`function`?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{let{kind:n,elements:r}=t;return{kind:n,elements:r,finisher(t){customElements.define(e,t)}}})(e,t),_i=(e,t)=>t.kind===`method`&&t.descriptor&&!(`value`in t.descriptor)?{...t,finisher(n){n.createProperty(t.key,e)}}:{kind:`field`,key:Symbol(),placement:`own`,descriptor:{},originalKey:t.key,initializer(){typeof t.initializer==`function`&&(this[t.key]=t.initializer.call(this))},finisher(n){n.createProperty(t.key,e)}},vi=(e,t,n)=>{t.constructor.createProperty(n,e)};function I(e){return(t,n)=>n===void 0?_i(e,t):vi(e,t,n)}function L(e){return I({...e,state:!0})}var yi=({finisher:e,descriptor:t})=>(n,r)=>{if(r===void 0){let r=n.originalKey??n.key,i=t==null?{...n,key:r}:{kind:`method`,placement:`prototype`,key:r,descriptor:t(n.key)};return e!=null&&(i.finisher=function(t){e(t,r)}),i}{let i=n.constructor;t!==void 0&&Object.defineProperty(n,r,t(r)),e?.(i,r)}};function bi(e,t){return yi({descriptor:n=>{let r={get(){return this.renderRoot?.querySelector(e)??null},enumerable:!0,configurable:!0};if(t){let t=typeof n==`symbol`?Symbol():`__`+n;r.get=function(){return this[t]===void 0&&(this[t]=this.renderRoot?.querySelector(e)??null),this[t]}}return r}})}function xi(e){return yi({descriptor:t=>({get(){return this.renderRoot?.querySelectorAll(e)??[]},enumerable:!0,configurable:!0})})}var Si=window.HTMLSlotElement?.prototype.assignedElements==null?(e,t)=>e.assignedNodes(t).filter((e=>e.nodeType===Node.ELEMENT_NODE)):(e,t)=>e.assignedElements(t);function Ci(e){let{slot:t,selector:n}=e??{};return yi({descriptor:r=>({get(){let r=`slot`+(t?`[name=${t}]`:`:not([name])`),i=this.renderRoot?.querySelector(r),a=i==null?[]:Si(i,e);return n?a.filter((e=>e.matches(n))):a},enumerable:!0,configurable:!0})})}var wi={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Ti=e=>(...t)=>({_$litDirective$:e,values:t}),Ei=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Di}=ui,Oi=()=>document.createComment(``),ki=(e,t,n)=>{var r;let i=e._$AA.parentNode,a=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Di(i.insertBefore(Oi(),a),i.insertBefore(Oi(),a),e,e.options);else{let t=n._$AB.nextSibling,o=n._$AM,s=o!==e;if(s){let t;(r=n._$AQ)==null||r.call(n,e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==o._$AU&&n._$AP(t)}if(t!==a||s){let e=n._$AA;for(;e!==t;){let t=e.nextSibling;i.insertBefore(e,a),e=t}}}return n},Ai=(e,t,n=e)=>(e._$AI(t,n),e),ji={},Mi=(e,t=ji)=>e._$AH=t,Ni=e=>e._$AH,Pi=e=>{var t;(t=e._$AP)==null||t.call(e,!1,!0);let n=e._$AA,r=e._$AB.nextSibling;for(;n!==r;){let e=n.nextSibling;n.remove(),n=e}},Fi=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Ii=Ti(class extends Ei{constructor(e){if(super(e),e.type!==wi.CHILD)throw Error(`repeat() can only be used in text expressions`)}ct(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.ct(e,t,n).values}update(e,[t,n,r]){let i=Ni(e),{values:a,keys:o}=this.ct(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Ai(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Ai(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Ai(i[d],a[m]),ki(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Ai(i[f],a[p]),ki(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=Fi(o,p,m),u=Fi(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=ki(e,i[d]);Ai(t,a[p]),c[p]=t}else c[p]=Ai(n,a[p]),ki(e,i[d],n),i[t]=null;p++}else Pi(i[f]),f--;else Pi(i[d]),d++;for(;p<=m;){let t=ki(e,c[m+1]);Ai(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&Pi(e)}return this.ut=o,Mi(e,c),Yr}});function Li(e){return e===document.scrollingElement||e===document.documentElement}function Ri(e){let t=e;for(;t&&(t=t.parentElement,t);){let{overflowY:e}=getComputedStyle(t);if(e===`auto`||e===`scroll`)return t}return document.scrollingElement??document.documentElement}var zi=class{constructor(e){this._cellHeights=new Map,this._rowHeights=new Map,this._columnsPerRow=1,this._defaultRowHeight=e}get cellHeights(){return this._cellHeights}get rowHeights(){return this._rowHeights}get columnsPerRow(){return this._columnsPerRow}set columnsPerRow(e){this._columnsPerRow=e}get defaultRowHeight(){return this._defaultRowHeight}set defaultRowHeight(e){this._defaultRowHeight=e}get placeholderRowHeight(){return this._placeholderRowHeight}set placeholderRowHeight(e){this._placeholderRowHeight=e}rowHeightFor(e){return this._rowHeights.get(e)??this._placeholderRowHeight??this._defaultRowHeight}sumRowHeights(e,t,n=0){if(t<e)return 0;let r=0;for(let n=e;n<=t;n+=1)r+=this.rowHeightFor(n);return r+=Math.max(0,t-e)*n,r}recordCellHeight(e,t){this._cellHeights.set(e,t),this.recalculateRowHeight(Math.floor(e/this._columnsPerRow))}deleteCellHeight(e){return this._cellHeights.delete(e)}recalculateRowHeight(e){let t=this._columnsPerRow,n=e*t,r=0;for(let e=0;e<t;e+=1){let t=this._cellHeights.get(n+e);t!==void 0&&t>r&&(r=t)}r>0?this._rowHeights.set(e,r):this._rowHeights.delete(e)}recalculateAllRowHeights(){this._rowHeights.clear();let e=new Set;for(let t of this._cellHeights.keys())e.add(Math.floor(t/this._columnsPerRow));e.forEach(e=>this.recalculateRowHeight(e))}recalculateDefaultRowHeight(){if(this._rowHeights.size===0)return;let e=0;for(let t of this._rowHeights.values())e+=t;this._defaultRowHeight=e/this._rowHeights.size}pruneAtOrAbove(e){for(let t of this._cellHeights.keys())t>=e&&this._cellHeights.delete(t)}clear(){this._cellHeights.clear(),this._rowHeights.clear(),this._placeholderRowHeight=void 0}},Bi=class{constructor(e){this.suppressNextScrollEvent=!1,this.host=e}capture(){if(!this.host.isActive())return null;let e=this.host.getScrollContainer(),t=Li(e),n=t?0:e.getBoundingClientRect().top,r=t?window.innerHeight:n+e.clientHeight,i=this.host.getRenderedCellIndices(),a=i.size>0,o=null,s=null;for(let e of this.host.getCellContainers()){let t=e.getBoundingClientRect(),c=e.dataset.cellIndex;if(c!==void 0){let l=Number(c),u={cell:e,viewportOffset:t.top-n};if(!(t.bottom<n)){if(t.top>=r){if(a&&i.has(l)){s=u;break}}else if(a&&i.has(l))return u;else if(!o&&(o=u,!a))return o}}}return s??o}restore(e){if(!e||!e.cell.isConnected)return;let t=this.host.getScrollContainer(),n=Li(t),r=n?0:t.getBoundingClientRect().top,i=e.cell.getBoundingClientRect().top-r-e.viewportOffset;Math.abs(i)<.5||(this.suppressNextScrollEvent=!0,n?window.scrollBy(0,i):t.scrollTop+=i)}shouldSuppressNextScrollEvent(){return this.suppressNextScrollEvent?(this.suppressNextScrollEvent=!1,!0):!1}};function Vi(e,t,n){return Array.from({length:(t-e)/n+1},(t,r)=>e+r*n)}var Hi=300,Ui=class extends mi{constructor(){super(),this.itemCount=0,this.scrollOptimizationsDisabled=!1,this.minBufferSize=10,this.bufferMultiplier=1,this.totalContentHeight=0,this.bufferOffsetY=0,this.bufferStart=0,this.bufferEnd=0,this.rowGap=0,this.supportsGrid=typeof CSS<`u`&&CSS.supports(`display`,`grid`),this.rowHeightCache=new zi(Hi),this.cellContainerByIndex=new Map,this.renderedCellIndices=new Set,this.visibleCellIndices=new Set,this.placeholderCellIndices=new Set,this.scrollRafId=0,this.pendingScrollLayoutUpdate=null,this.scrollIdleTimer=0,this.scrollToCellInProgress=!1,this.scrollListenersActive=!1,this.scrollAnchor=new Bi({getScrollContainer:()=>this.getScrollContainer(),getCellContainers:()=>this.cellContainers,getRenderedCellIndices:()=>this.renderedCellIndices,isActive:()=>this.isVirtualized&&!this.scrollToCellInProgress}),this.sentinelIsIntersecting=!1,this.sentinelEventPending=!1,this.sentinelIntersectionObserver=new IntersectionObserver(this.handleSentinelIntersection.bind(this)),this.cellIntersectionObserver=new IntersectionObserver(this.handleCellIntersection.bind(this)),this.resizeRafId=0,this.resizeObserver=new ResizeObserver(this.handleResize.bind(this)),this.handleScroll=()=>{this.scrollToCellInProgress||this.scrollAnchor.shouldSuppressNextScrollEvent()||(this.scrollRafId||=requestAnimationFrame(()=>{this.scrollRafId=0,this.syncBufferToScrollPosition()}),this.scrollIdleTimer&&clearTimeout(this.scrollIdleTimer),this.scrollIdleTimer=window.setTimeout(()=>{this.scrollIdleTimer=0,this.syncBufferToScrollPosition()},150))},this.beginStabilization()}get cachedColumnsPerRow(){return this.rowHeightCache.columnsPerRow}set cachedColumnsPerRow(e){this.rowHeightCache.columnsPerRow=e}get defaultRowHeight(){return this.rowHeightCache.defaultRowHeight}set defaultRowHeight(e){this.rowHeightCache.defaultRowHeight=e}get cellHeights(){return this.rowHeightCache.cellHeights}get rowHeights(){return this.rowHeightCache.rowHeights}get placeholderRowHeight(){return this.rowHeightCache.placeholderRowHeight}set placeholderRowHeight(e){this.rowHeightCache.placeholderRowHeight=e}connectedCallback(){var e;(e=super.connectedCallback)==null||e.call(this),this.scrollContainer=void 0,this.observeSentinel(),this.setupObservations(),this.container&&this.resizeObserver.observe(this.container)}disconnectedCallback(){var e,t;this.sentinelIntersectionObserver.disconnect(),this.cellIntersectionObserver.disconnect(),this.teardownScrollListener(),(e=this.resizeObserver)==null||e.disconnect(),this.scrollContainer=void 0,this.endStabilization(),(t=super.disconnectedCallback)==null||t.call(this)}firstUpdated(){this.observeSentinel(),this.isVirtualized&&this.setupVirtualization()}willUpdate(e){e.has(`itemCount`)&&(this.pruneStaleIndices(),this.isVirtualized&&(this.updateScrollLayout(),this.syncBufferToScrollPosition()))}updated(e){(e.has(`itemCount`)||e.has(`scrollOptimizationsDisabled`))&&(e.has(`itemCount`)&&this.isVirtualized&&this.scheduleSentinelRecheck(),this.setupObservations()),this.isVirtualized&&(e.has(`bufferStart`)||e.has(`bufferEnd`)||e.has(`itemCount`)||e.has(`scrollOptimizationsDisabled`))&&this.refreshCellContainerCache(),this.isVirtualized&&(e.has(`bufferStart`)||e.has(`bufferEnd`))&&(this.processVisibleCells(),this.setupVirtualizedObservations(),!this.scrollRafId&&!this.scrollToCellInProgress&&(this.scrollRafId=requestAnimationFrame(()=>{this.scrollRafId=0,this.syncBufferToScrollPosition()})))}get bufferStabilized(){return this.bufferStabilizedPromise}get isVirtualized(){return!this.scrollOptimizationsDisabled&&this.supportsGrid}get virtualBufferIndices(){if(this.itemCount===0)return[];let e=Math.max(0,this.bufferStart),t=Math.min(this.bufferEnd,this.itemCount-1);return t<e?[]:Vi(e,t,1)}get bufferRange(){if(this.isVirtualized)return this.virtualBufferIndices;let e=Math.max(10,this.visibleCellIndices.size);if(this.visibleCellIndices.size===0)return Vi(0,e,1);let t=Math.min(...this.visibleCellIndices),n=Math.max(...this.visibleCellIndices);return Vi(Math.max(t-e,0),Math.min(n+e,this.itemCount-1),1)}observeSentinel(){this.sentinel&&this.sentinelIntersectionObserver.observe(this.sentinel)}reobserveSentinel(){this.sentinel&&(this.sentinelIntersectionObserver.unobserve(this.sentinel),this.sentinelIntersectionObserver.observe(this.sentinel))}scheduleSentinelRecheck(){this.updateComplete.then(()=>{requestAnimationFrame(()=>{this.sentinelEventPending=!1,this.sentinelIsIntersecting=!1,this.reobserveSentinel()})})}setupObservations(){this.isVirtualized?this.setupVirtualizedObservations():this.setupIntersectionObserver()}setupVirtualizedObservations(){this.cellIntersectionObserver.disconnect();for(let e of this.visibleCellIndices)(e<this.bufferStart||e>this.bufferEnd)&&this.visibleCellIndices.delete(e);this.cellContainers.forEach(e=>this.cellIntersectionObserver.observe(e)),this.scrollListenersActive||this.setupScrollListener()}setupIntersectionObserver(){this.cellIntersectionObserver.disconnect(),this.scrollOptimizationsDisabled?(Vi(0,Math.max(0,this.itemCount-1),1).forEach(e=>this.visibleCellIndices.add(e)),this.processVisibleCells()):this.cellContainers.forEach(e=>this.cellIntersectionObserver.observe(e))}handleSentinelIntersection(e){e.forEach(e=>{e.isIntersecting&&!this.sentinelIsIntersecting?(this.sentinelIsIntersecting=!0,this.sentinelEventPending||(this.sentinelEventPending=!0,this.dispatchEvent(new Event(`scrollThresholdReached`)))):e.isIntersecting||(this.sentinelIsIntersecting=!1)})}handleCellIntersection(e){e.forEach(e=>{let t=e.target.dataset.cellIndex;if(!t)return;let n=parseInt(t,10);e.isIntersecting?this.visibleCellIndices.add(n):this.visibleCellIndices.delete(n)}),this.scrollOptimizationsDisabled||(this.isVirtualized?this.emitVisibleCellsChanged():this.processVisibleCells())}handleResize(){this.resizeRafId||=requestAnimationFrame(()=>{this.resizeRafId=0;let e=this.getColumnsPerRow();e!==this.cachedColumnsPerRow&&(this.cachedColumnsPerRow=e,this.placeholderRowHeight=void 0,this.rowHeightCache.recalculateAllRowHeights(),this.updateScrollLayout(),this.syncBufferToScrollPosition()),this.rowHeights.size>0?this.rowHeightCache.recalculateDefaultRowHeight():this.defaultRowHeight=this.computeDefaultRowHeight()})}reload(){for(let e of this.renderedCellIndices)this.removeCell(e);this.renderedCellIndices.clear(),this.visibleCellIndices.clear(),this.placeholderCellIndices.clear(),this.rowHeightCache.clear(),this.sentinelEventPending=!1,this.sentinelIsIntersecting=!1,this.scrollToCellInProgress=!1,this.totalContentHeight=0,this.bufferOffsetY=0,this.bufferStart=0,this.bufferEnd=this.computeInitialBufferEnd(),this.updateScrollLayout(),this.setupObservations(),this.reobserveSentinel(),this.isVirtualized&&this.stabilizeBuffer()}refreshCell(e){if(this.isVirtualized){if(e<this.bufferStart||e>this.bufferEnd){this.renderedCellIndices.delete(e),this.placeholderCellIndices.delete(e),this.rowHeightCache.deleteCellHeight(e)&&(this.rowHeightCache.recalculateAllRowHeights(),this.scheduleScrollLayoutUpdate());return}this.scheduleScrollLayoutUpdate()}this.removeCell(e),(this.isVirtualized||this.bufferRange.includes(e))&&this.renderCellBuffer([e])}refreshAllVisibleCells(){this.isVirtualized&&this.scheduleScrollLayoutUpdate();let e=this.bufferRange;e.forEach(e=>this.removeCell(e)),this.renderCellBuffer(e)}async scrollToCell(e,t){if(e<0||e>=this.itemCount)return!1;let n=t?`smooth`:`auto`;if(!this.isVirtualized){let t=this.cellContainers[e];return t?(t.scrollIntoView({behavior:n}),!0):!1}this.scrollToCellInProgress=!0,this.scrollRafId&&=(cancelAnimationFrame(this.scrollRafId),0),this.scrollIdleTimer&&=(clearTimeout(this.scrollIdleTimer),0),this.snapBufferToCell(e),await this.updateComplete,await new Promise(e=>requestAnimationFrame(e)),this.measureBufferedCells(),this.updateScrollLayout(),this.requestUpdate(),await this.updateComplete;let r=this.cellContainerForIndex(e);return r?(r.scrollIntoView({behavior:n}),t?(await this.nextSmoothScrollEnd(),this.scrollToCellInProgress=!1,!0):(this.scrollToCellInProgress=!1,!0)):(this.scrollToCellInProgress=!1,!1)}getVisibleCellIndices(){return Array.from(this.visibleCellIndices)}pruneStaleIndices(){for(let e of this.visibleCellIndices)e>=this.itemCount&&this.visibleCellIndices.delete(e);for(let e of this.renderedCellIndices)e>=this.itemCount&&this.renderedCellIndices.delete(e);for(let e of this.placeholderCellIndices)e>=this.itemCount&&this.placeholderCellIndices.delete(e);this.rowHeightCache.pruneAtOrAbove(this.itemCount),this.rowHeightCache.recalculateAllRowHeights()}snapBufferToCell(e){let t=this.getScrollContainer(),n=Li(t)?window.innerHeight:t.clientHeight,r=this.cachedColumnsPerRow,i=Math.ceil(n/this.defaultRowHeight),a=Math.ceil(this.minBufferSize/r),o=Math.ceil(i*this.bufferMultiplier),s=Math.max(a,o),c=Math.floor(e/r),l=this.getTotalRows(),u=Math.max(0,c-s),d=Math.min(l-1,c+s);this.bufferStart=u*r,this.bufferEnd=Math.min(this.itemCount-1,(d+1)*r-1),this.updateScrollLayout()}nextSmoothScrollEnd(){return new Promise(e=>{let t=this.getScrollContainer(),n=Li(t)?window:t,r=0,i=!1,a=()=>{i||(i=!0,n.removeEventListener(`scrollend`,a),r&&window.clearTimeout(r),e())};n.addEventListener(`scrollend`,a,{once:!0}),r=window.setTimeout(a,2e3)})}setupVirtualization(){this.cachedColumnsPerRow=this.getColumnsPerRow(),this.rowGap=this.getRowGap(),this.defaultRowHeight=this.computeDefaultRowHeight(),this.bufferStart=0,this.bufferEnd=this.computeInitialBufferEnd(),this.updateScrollLayout(),this.setupScrollListener(),this.container&&this.resizeObserver.observe(this.container),this.stabilizeBuffer()}async stabilizeBuffer(){this.beginStabilization(),await this.updateComplete,this.refreshCellContainerCache(),this.processVisibleCells(),requestAnimationFrame(()=>{this.measureBufferedCells(),this.rowHeightCache.recalculateDefaultRowHeight(),this.syncBufferToScrollPosition(),this.updateComplete.then(()=>{this.endStabilization()})})}beginStabilization(){this.bufferStabilizedResolver||(this.bufferStabilizedPromise=new Promise(e=>{this.bufferStabilizedResolver=e}))}endStabilization(){this.bufferStabilizedResolver&&(this.bufferStabilizedResolver(),this.bufferStabilizedResolver=void 0,this.dispatchEvent(new Event(`bufferStabilized`)))}setupScrollListener(){this.teardownScrollListener();let e=this.getScrollContainer();(Li(e)?window:e).addEventListener(`scroll`,this.handleScroll,{passive:!0}),this.scrollListenersActive=!0}teardownScrollListener(){this.scrollListenersActive&&=(this.scrollContainer&&(Li(this.scrollContainer)?window:this.scrollContainer).removeEventListener(`scroll`,this.handleScroll),this.scrollRafId&&=(cancelAnimationFrame(this.scrollRafId),0),this.scrollIdleTimer&&=(clearTimeout(this.scrollIdleTimer),0),!1)}getColumnsPerRow(){return this.container&&getComputedStyle(this.container).gridTemplateColumns.split(` `).filter(e=>e.length>0).length||1}getRowGap(){return this.container&&parseFloat(getComputedStyle(this.container).rowGap)||0}getTotalRows(){return Math.ceil(this.itemCount/this.cachedColumnsPerRow)}computeInitialBufferEnd(){let e=Math.ceil(window.innerHeight/this.defaultRowHeight),t=this.minBufferSize*2,n=e*(1+this.bufferMultiplier*2)*this.cachedColumnsPerRow;return Math.min(Math.max(t,n),this.itemCount-1)}computeDefaultRowHeight(){if(this.estimatedCellHeight!=null)return this.estimatedCellHeight;if(!this.container)return Hi;let e=document.createElement(`div`);e.style.height=`var(--infiniteScrollerCellMinHeight, 22.5rem)`,this.container.appendChild(e);let t=e.offsetHeight;return e.remove(),t||Hi}getScrollContainer(){return this.scrollContainer||=Ri(this),this.scrollContainer}updateScrollLayout(){let e=this.getTotalRows();if(e===0){this.totalContentHeight=0,this.bufferOffsetY=0;return}let{rowGap:t}=this;this.totalContentHeight=this.rowHeightCache.sumRowHeights(0,e-1,t);let n=Math.floor(this.bufferStart/this.cachedColumnsPerRow);this.bufferOffsetY=n>0?this.rowHeightCache.sumRowHeights(0,n-1,t)+t:0}scheduleScrollLayoutUpdate(){if(this.pendingScrollLayoutUpdate)return;let e=this.scrollAnchor.capture();this.pendingScrollLayoutUpdate=this.runScrollLayoutUpdate(e)}async runScrollLayoutUpdate(e){try{await new Promise(e=>requestAnimationFrame(e)),this.measureBufferedCells(),this.updateScrollLayout(),await this.updateComplete,this.scrollAnchor.restore(e)}finally{this.pendingScrollLayoutUpdate=null}}measureBufferedCells(){for(let e of this.cellContainers){let t=e.dataset.cellIndex;if(t){let n=parseInt(t,10);this.renderedCellIndices.has(n)&&e.offsetHeight>0&&this.rowHeightCache.recordCellHeight(n,e.offsetHeight)}}this.updatePlaceholderRowHeight()}updatePlaceholderRowHeight(){if(this.placeholderCellIndices.size===0)return;let e=this.groupPlaceholdersByRow(),t=0,n=0;for(let[r,i]of e)if(this.isPlaceholderOnlyRow(r))for(let e of i){let r=this.cellContainerForIndex(e);r&&r.offsetHeight>0&&(t+=r.offsetHeight,n+=1)}n>0&&(this.placeholderRowHeight=t/n)}groupPlaceholdersByRow(){let e=this.cachedColumnsPerRow,t=new Map;for(let n of this.placeholderCellIndices){let r=Math.floor(n/e),i=t.get(r);i?i.push(n):t.set(r,[n])}return t}isPlaceholderOnlyRow(e){let t=this.cachedColumnsPerRow,n=e*t;for(let e=0;e<t;e+=1)if(this.renderedCellIndices.has(n+e))return!1;return!0}syncBufferToScrollPosition(){if(this.measureBufferedCells(),!this.container)return;let e=this.getTotalRows();if(e===0)return;let t=this.getContentRelativeViewport(),{firstVisibleRow:n,lastVisibleRow:r}=this.findVisibleRowRange(t.relativeScrollTop,t.relativeScrollBottom,e);if(this.bufferHasSufficientMargin(n,r))return;let{newStart:i,newEnd:a}=this.computeBufferBounds(n,r,e,t.viewportHeight);if(i===this.bufferStart&&a===this.bufferEnd)return;let o=this.scrollAnchor.capture();this.rowHeights.size>0&&this.rowHeightCache.recalculateDefaultRowHeight(),this.bufferStart=i,this.bufferEnd=a,this.updateScrollLayout(),this.updateComplete.then(()=>this.scrollAnchor.restore(o))}getContentRelativeViewport(){let e=this.getScrollContainer(),t=Li(e)?window.scrollY:e.scrollTop,n=Li(e)?window.innerHeight:e.clientHeight,r=(this.scrollSpacer??this.container).getBoundingClientRect(),i=t-(Li(e)?r.top+window.scrollY:r.top+e.scrollTop-e.getBoundingClientRect().top);return{relativeScrollTop:i,relativeScrollBottom:i+n,viewportHeight:n}}findVisibleRowRange(e,t,n){let{rowGap:r}=this,i=0,a=0,o=n-1,s=!1;for(let c=0;c<n;c+=1){let n=this.rowHeightCache.rowHeightFor(c),l=i,u=i+n;if(!s&&u>e&&(a=c,s=!0),s&&l>=t){o=c-1;break}i+=n+r}return{firstVisibleRow:a,lastVisibleRow:o}}bufferHasSufficientMargin(e,t){let n=this.cachedColumnsPerRow,r=Math.ceil(this.minBufferSize/n),i=t-e+1,a=Math.ceil(i*this.bufferMultiplier),o=Math.max(r,a),s=Math.floor(this.bufferStart/n),c=Math.floor(Math.min(this.bufferEnd,this.itemCount-1)/n),l=Math.max(2,Math.floor(o/3));return e>=s+l&&t<=c-l}computeBufferBounds(e,t,n,r){let i=this.cachedColumnsPerRow,{rowGap:a}=this,o=Math.ceil(this.minBufferSize/i),s=r*Math.max(1,this.bufferMultiplier),c=e,l=0;for(;c>0&&l<s;)--c,l+=this.rowHeightCache.rowHeightFor(c)+a;let u=t,d=0;for(;u<n-1&&d<s;)u+=1,d+=this.rowHeightCache.rowHeightFor(u)+a;return c=Math.min(c,Math.max(0,e-o)),u=Math.max(u,Math.min(n-1,t+o)),{newStart:c*i,newEnd:Math.min((u+1)*i-1,this.itemCount-1)}}render(){return this.isVirtualized?this.renderVirtualized():this.renderAllCells()}renderVirtualized(){let e=this.virtualBufferIndices,t=this.ariaLandmarkLabel??F;return Jr`
      <div id="scroll-spacer" style="height:${this.totalContentHeight}px">
        <div id="sentinel" aria-hidden="true"></div>
        <section
          id="container"
          role="feed"
          aria-label=${t}
          style="transform:translateY(${this.bufferOffsetY}px)"
          @transitionend=${this.handleContainerTransition}
        >
          ${Ii(e,e=>e,e=>Jr`
              <article
                class="cell-container"
                aria-posinset=${e+1}
                aria-setsize=${this.itemCount}
                data-cell-index=${e}
                @click=${t=>this.cellSelected(t,e)}
                @keyup=${t=>{t.key===`Enter`&&this.cellSelected(t,e)}}
              ></article>
            `)}
          ${this.bufferEnd>=this.itemCount-1?Jr`<slot name="result-last-tile"></slot>`:F}
        </section>
      </div>
    `}renderAllCells(){let e=Vi(0,this.itemCount-1,1);return Jr`
      <section id="container" role="feed" aria-label=${this.ariaLandmarkLabel??F}>
        <div id="sentinel" aria-hidden="true"></div>
        ${Ii(e,e=>e,e=>Jr`
            <article
              class="cell-container"
              aria-posinset=${e+1}
              aria-setsize=${this.itemCount}
              data-cell-index=${e}
              @click=${t=>this.cellSelected(t,e)}
              @keyup=${t=>{t.key===`Enter`&&this.cellSelected(t,e)}}
            ></article>
          `)}
        <slot name="result-last-tile"></slot>
      </section>
    `}handleContainerTransition(e){e.propertyName===`row-gap`&&(this.rowGap=this.getRowGap(),this.updateScrollLayout())}processVisibleCells(){let{bufferRange:e}=this;this.renderCellBuffer(e),this.removeCellsOutsideBufferRange(e),this.emitVisibleCellsChanged()}emitVisibleCellsChanged(){this.dispatchEvent(new CustomEvent(`visibleCellsChanged`,{detail:{visibleCellIndices:Array.from(this.visibleCellIndices)}}))}cellSelected(e,t){let n=new CustomEvent(`cellSelected`,{detail:{index:t,originalEvent:e}});this.dispatchEvent(n)}renderCellBuffer(e){e.forEach(e=>{if(this.renderedCellIndices.has(e))return;let t=this.cellContainerForIndex(e);if(!t)return;let n=this.cellProvider?.cellForIndex(e);if(n)fi(n,t),this.renderedCellIndices.add(e),this.placeholderCellIndices.delete(e);else{if(this.placeholderCellIndices.has(e))return;fi(this.placeholderCellTemplate,t),this.placeholderCellIndices.add(e),this.rowHeightCache.deleteCellHeight(e)&&this.rowHeightCache.recalculateRowHeight(Math.floor(e/this.cachedColumnsPerRow))}})}removeCellsOutsideBufferRange(e){let t=new Set(e);Array.from(this.renderedCellIndices).filter(e=>!t.has(e)).forEach(e=>{let t=this.cellContainerForIndex(e);t&&fi(F,t),this.renderedCellIndices.delete(e),this.placeholderCellIndices.delete(e)});for(let e of this.placeholderCellIndices)t.has(e)||this.placeholderCellIndices.delete(e)}removeCell(e){let t=this.cellContainerForIndex(e);t&&fi(F,t),this.renderedCellIndices.delete(e),this.placeholderCellIndices.delete(e),this.rowHeightCache.deleteCellHeight(e)&&this.rowHeightCache.recalculateAllRowHeights()}cellContainerForIndex(e){return this.isVirtualized?this.cellContainerByIndex.get(e)??null:this.cellContainers[e]??null}refreshCellContainerCache(){this.cellContainerByIndex.clear();let e=this.cellContainers;for(let t of e){let e=t.dataset.cellIndex;e!==void 0&&this.cellContainerByIndex.set(Number(e),t)}}static get styles(){let e=P`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`,t=P`var(--infiniteScrollerRowGap, 1.7rem)`,n=P`var(--infiniteScrollerColGap, 1.7rem)`,r=P`var(--infiniteScrollerCellMinWidth, 16rem)`,i=P`var(--infiniteScrollerCellMaxWidth, 1fr)`,a=P`var(--infiniteScrollerCellMinHeight, 22.5rem)`,o=P`var(--infiniteScrollerCellMaxHeight, none)`;return P`
      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${t};
        row-gap: ${t};
        grid-column-gap: ${n};
        column-gap: ${n};

        /* This transition allows us to listen for changes to the row-gap */
        transition: row-gap 1ms linear;
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${r}, ${i})
          );
        }
      }

      .cell-container {
        outline: ${P`var(--infiniteScrollerCellOutline, 0)`};
        min-height: ${a};
        max-height: ${o};
        min-width: ${r};
        max-width: ${i};
      }

      @supports (display: grid) {
        /* the grid takes care of the width */
        .cell-container {
          min-width: auto;
          max-width: none;
        }
      }

      #scroll-spacer {
        position: relative;
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
    `}};t([I({type:Number})],Ui.prototype,`itemCount`,void 0),t([I({type:Object})],Ui.prototype,`cellProvider`,void 0),t([I({type:Object})],Ui.prototype,`placeholderCellTemplate`,void 0),t([I({type:Boolean})],Ui.prototype,`scrollOptimizationsDisabled`,void 0),t([I({type:String})],Ui.prototype,`ariaLandmarkLabel`,void 0),t([I({type:Number})],Ui.prototype,`minBufferSize`,void 0),t([I({type:Number})],Ui.prototype,`bufferMultiplier`,void 0),t([I({type:Number})],Ui.prototype,`estimatedCellHeight`,void 0),t([L()],Ui.prototype,`totalContentHeight`,void 0),t([L()],Ui.prototype,`bufferOffsetY`,void 0),t([L()],Ui.prototype,`bufferStart`,void 0),t([L()],Ui.prototype,`bufferEnd`,void 0),t([L()],Ui.prototype,`rowGap`,void 0),t([bi(`#sentinel`)],Ui.prototype,`sentinel`,void 0),t([bi(`#container`)],Ui.prototype,`container`,void 0),t([bi(`#scroll-spacer`)],Ui.prototype,`scrollSpacer`,void 0),t([xi(`.cell-container`)],Ui.prototype,`cellContainers`,void 0),Ui=t([gi(`infinite-scroller`)],Ui);function Wi(e){return e?.replace(/%22%22(?!%22%22)(.+?)%22%22/g,`%22$1%22`)}function Gi(e){return e?.rawMetadata?.hit_type===`favorited_search`?`search`:e.mediatype?.value??`data`}var Ki=E`
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
`,qi=E`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m56.4612493 8.80450354 41.8901185 75.94632926c1.7706782 2.8433173 2.1150372 5.2623412 1.0330766 7.2570716-1.0819604 1.9947304-3.26978 2.9920956-6.5634587 2.9920956h-85.69973905c-3.29367873 0-5.46954894-.9973652-6.52761065-2.9920956-1.0580617-1.9947304-.70175345-4.4137543 1.06892476-7.2570716l41.89011844-75.12308969c1.8184757-2.84331737 3.9693609-4.37738627 6.4526556-4.60220671s4.6341799 1.03483527 6.4526556 3.77896714zm28.5387507 75.19549646-35.037482-62-34.962518 62zm-31-34.7484359v-10.2515641h-8v10.2515641l2.089172 14.7484359h3.8184713zm-8 19.7484359v8h8v-8z"
    />
    <title>Content may be inappropriate</title>
  </svg>
`,Ji={"login-required":N(`Log in to view this item`),"content-warning":N(`Content may be inappropriate`)},Yi={"login-required":Ki,"content-warning":qi},Xi=class e{constructor(t,n=`unknown`){let r=this.getFlags(t);this.adIds=t.ad_id?.values,this.averageRating=t.avg_rating?.value,this.captureDates=t.capture_dates?.values,this.checked=!1,this.collections=t.collection?.values??[],this.collectionFilesCount=t.collection_files_count?.value??0,this.collectionSize=t.collection_size?.value??0,this.commentCount=t.num_reviews?.value??0,this.creator=t.creator?.value,this.creators=t.creator?.values??[],this.dateAdded=t.addeddate?.value,this.dateArchived=t.publicdate?.value,this.datePublished=t.date?.value,this.dateReviewed=t.reviewdate?.value,this.description=t.description?.values.join(`
`),this.factChecks=t.factcheck?.values,this.favCount=t.num_favorites?.value??0,this.hitRequestSource=n,this.hitType=t.rawMetadata?.hit_type,this.href=Wi(t.review?.__href__??t.__href__?.value),this.identifier=e.cleanIdentifier(t.identifier),this.isClip=t.is_clip?.value,this.issue=t.issue?.value,this.itemCount=t.item_count?.value??0,this.mediatype=Gi(t),this.review=t.review,this.snippets=t.highlight?.values??[],this.source=t.source?.value,this.subjects=t.subject?.values??[],this.thumbnailUrl=t.__img__?.value,this.title=t.title?.value??``,this.tvClipCount=t.num_clips?.value??0,this.volume=t.volume?.value,this.viewCount=t.downloads?.value,this.weeklyViewCount=t.week?.value,this.loginRequired=r.loginRequired,this.contentWarning=r.contentWarning}clone(){let t=new e({});return t.adIds=this.adIds,t.averageRating=this.averageRating,t.captureDates=this.captureDates,t.checked=this.checked,t.collections=this.collections,t.collectionFilesCount=this.collectionFilesCount,t.collectionSize=this.collectionSize,t.commentCount=this.commentCount,t.creator=this.creator,t.creators=this.creators,t.dateStr=this.dateStr,t.dateAdded=this.dateAdded,t.dateArchived=this.dateArchived,t.datePublished=this.datePublished,t.dateReviewed=this.dateReviewed,t.description=this.description,t.factChecks=this.factChecks,t.favCount=this.favCount,t.hitRequestSource=this.hitRequestSource,t.hitType=this.hitType,t.href=this.href,t.identifier=this.identifier,t.isClip=this.isClip,t.issue=this.issue,t.itemCount=this.itemCount,t.mediatype=this.mediatype,t.snippets=this.snippets,t.source=this.source,t.subjects=this.subjects,t.thumbnailUrl=this.thumbnailUrl,t.title=this.title,t.tvClipCount=this.tvClipCount,t.volume=this.volume,t.viewCount=this.viewCount,t.weeklyViewCount=this.weeklyViewCount,t.loginRequired=this.loginRequired,t.contentWarning=this.contentWarning,t}get isTvSearchResult(){return this.hitType===`tv_clip`&&this.hitRequestSource===`search_query`}getFlags(e){let t={loginRequired:!1,contentWarning:!1};if(e.collection?.values.length&&e.mediatype?.value!==`collection`){for(let n of e.collection?.values??[])if(n===`loggedin`&&(t.loginRequired=!0,t.contentWarning)||n===`no-preview`&&(t.contentWarning=!0,t.loginRequired))break}return t}static cleanIdentifier(e){let t=e?.indexOf(`|`)??-1;return t>0?e?.slice(0,t):e}},R=function(e){return e.default=`default`,e.unrecognized=`unrecognized`,e.relevance=`relevance`,e.alltimeview=`alltimeview`,e.weeklyview=`weeklyview`,e.title=`title`,e.date=`date`,e.datearchived=`datearchived`,e.datereviewed=`datereviewed`,e.dateadded=`dateadded`,e.datefavorited=`datefavorited`,e.creator=`creator`,e}({});R.weeklyview,R.alltimeview,R.datefavorited,R.date,R.datearchived,R.datereviewed,R.dateadded;var Zi={[R.default]:{field:R.default,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!1,displayName:``,urlNames:[``,null,void 0]},[R.unrecognized]:{field:R.unrecognized,defaultSortDirection:null,canSetDirection:!0,shownInSortBar:!1,shownInURL:!1,handledBySearchService:!0,displayName:``,urlNames:[]},[R.relevance]:{field:R.relevance,defaultSortDirection:null,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,displayName:`Relevance`,urlNames:[`_score`]},[R.alltimeview]:{field:R.alltimeview,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`downloads`,displayName:`All-time views`,urlNames:[`downloads`]},[R.weeklyview]:{field:R.weeklyview,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`week`,displayName:`Weekly views`,urlNames:[`week`]},[R.title]:{field:R.title,defaultSortDirection:`asc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`titleSorter`,displayName:`Title`,urlNames:[`title`,`titleSorter`]},[R.date]:{field:R.date,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`date`,displayName:`Date published`,urlNames:[`date`]},[R.datearchived]:{field:R.datearchived,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`publicdate`,displayName:`Date archived`,urlNames:[`publicdate`]},[R.datereviewed]:{field:R.datereviewed,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`reviewdate`,displayName:`Date reviewed`,urlNames:[`reviewdate`]},[R.dateadded]:{field:R.dateadded,defaultSortDirection:`desc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`addeddate`,displayName:`Date added`,urlNames:[`addeddate`]},[R.datefavorited]:{field:R.datefavorited,defaultSortDirection:`desc`,canSetDirection:!1,shownInSortBar:!0,shownInURL:!1,handledBySearchService:!1,searchServiceKey:`favoritedate`,displayName:`Date favorited`,urlNames:[`favoritedate`]},[R.creator]:{field:R.creator,defaultSortDirection:`asc`,canSetDirection:!0,shownInSortBar:!0,shownInURL:!0,handledBySearchService:!0,searchServiceKey:`creatorSorter`,displayName:`Creator`,urlNames:[`creator`,`creatorSorter`]}};function Qi(e){return Object.values(Zi).find(t=>t.urlNames.some(t=>e===t))??Zi[R.unrecognized]}var $i={[R.relevance]:!0,[R.weeklyview]:!0,[R.alltimeview]:!0,[R.title]:!0,[R.datefavorited]:!1,[R.date]:!0,[R.datearchived]:!0,[R.datereviewed]:!0,[R.dateadded]:!0,[R.creator]:!0,[R.default]:!1,[R.unrecognized]:!1},ea={...$i,[R.datefavorited]:!0},ta={...$i,[R.date]:!1,[R.datereviewed]:!1,[R.dateadded]:!1},na={uploads:R.datearchived,reviews:R.datereviewed,collections:R.datearchived,web_archives:R.datearchived,favorites:R.datefavorited},ra={title:`firstTitle`,creator:`firstCreator`},ia=()=>({subject:{},lending:{},mediatype:{},language:{},creator:{},collection:{},year:{},clip_type:{},program:{},person:{},sponsor:{}}),aa={only_commercials:`commercial`,only_factchecks:`fact check`,only_quotes:`quote`},oa=[`mediatype`,`year`,`subject`,`collection`,`creator`,`language`],sa=[`program`,`creator`,`year`,`subject`,`language`,`clip_type`],ca={subject:`Subject`,lending:`Availability`,mediatype:`Media Type`,language:`Language`,creator:`Creator`,collection:`Collection`,year:`Year`,clip_type:`Clip Type`,program:`Program`,person:`Person`,sponsor:`Sponsor`},la={subject:y.COUNT,lending:y.COUNT,mediatype:y.COUNT,language:y.COUNT,creator:y.COUNT,collection:y.COUNT,year:y.NUMERIC,clip_type:y.COUNT,program:y.COUNT,person:y.COUNT,sponsor:y.COUNT},ua={...la,creator:y.ALPHABETICAL,program:y.ALPHABETICAL},da={subject:y.ALPHABETICAL,lending:y.ALPHABETICAL,mediatype:y.ALPHABETICAL,language:y.ALPHABETICAL,creator:y.ALPHABETICAL,collection:y.ALPHABETICAL,year:y.NUMERIC,clip_type:y.ALPHABETICAL,program:y.ALPHABETICAL,person:y.ALPHABETICAL,sponsor:y.ALPHABETICAL},fa={is_lendable:!0,is_borrowable:!1,available_to_borrow:!0,is_browsable:!1,available_to_browse:!1,is_readable:!0,available_to_waitlist:!1},pa={lending:{is_lendable:`Lending Library`,available_to_borrow:`Borrow 14 Days`,is_readable:`Always Available`},clip_type:{quote:`Quote`,commercial:`Political Ad`,"fact check":`Fact Check`}},ma={deemphasize:!0,community:!0,stream_only:!0,samples_only:!0,test_collection:!0,printdisabled:!0,"openlibrary-ol":!0,nationalemergencylibrary:!0,china:!0,americana:!0,toronto:!0},ha=e=>encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),ga=e=>encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent),_a=decodeURIComponent,va=e=>(e[0]===`"`&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent));function ya(e){return e=Object.assign({},e),typeof e.expires==`number`&&(e.expires=new Date(Date.now()+e.expires*864e5)),e.expires!=null&&(e.expires=e.expires.toUTCString()),Object.entries(e).filter(([e,t])=>t!=null&&t!==!1).map(([e,t])=>t===!0?`; ${e}`:`; ${e}=${t.split(`;`)[0]}`).join(``)}function ba(e,t,n){let r=/(?:^|; )([^=]*)=([^;]*)/g,i={},a;for(;(a=r.exec(document.cookie))!=null;)try{let r=n(a[1]);if(i[r]=t(a[2],r),e===r)break}catch{}return e==null?i:i[e]}var xa=Object.freeze({decodeName:_a,decodeValue:va,encodeName:ha,encodeValue:ga}),Sa=Object.freeze({path:`/`});function Ca(e,t,n=Sa,{encodeValue:r=ga,encodeName:i=ha}={}){return document.cookie=`${i(e)}=${r(t,e)}${ya(n)}`}function wa(e,{decodeValue:t=va,decodeName:n=_a}={}){return ba(e,t,n)}function Ta({decodeValue:e=va,decodeName:t=_a}={}){return ba(void 0,e,t)}function Ea(e,t=Sa){Ca(e,``,Object.assign({},t,{expires:-1}))}function Da(e,t){let n={set:function(e,t,n){return Ca(e,t,Object.assign({},this.attributes,n),{encodeValue:this.converter.write})},get:function(e){if(arguments.length===0)return Ta(this.converter.read);if(e!=null)return wa(e,this.converter.read)},remove:function(e,t){Ea(e,Object.assign({},this.attributes,t))},withAttributes:function(e){return Da(this.converter,Object.assign({},this.attributes,e))},withConverter:function(e){return Da(Object.assign({},this.converter,e),this.attributes)}},r={attributes:{value:Object.freeze(t)},converter:{value:Object.freeze(e)}};return Object.create(n,r)}Da({read:xa.decodeValue,write:xa.encodeValue},Sa);function Oa(e,t){return e===t?!0:e.length===t.length?e.every((e,n)=>e===t[n]):!1}var ka=class{constructor(e){this.cookieDomain=`.archive.org`,this.cookieExpiration=30,this.cookiePath=`/`,this.context=e.context}persistState(e,t={}){e.displayMode&&this.persistViewStateToCookies(e.displayMode),this.persistQueryStateToUrl(e,t)}getRestorationState(){let e=this.loadQueryStateFromUrl();return e.displayMode=this.loadTileViewStateFromCookies(),e}persistViewStateToCookies(e){let t=e===`grid`?`tiles`:`lists`;Ca(`view-${this.context}`,t,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath});let n=e===`list-detail`?`showdetails`:``;Ca(`showdetails-${this.context}`,n,{domain:this.cookieDomain,expires:this.cookieExpiration,path:this.cookiePath})}loadTileViewStateFromCookies(){let e=wa(`view-${this.context}`),t=wa(`showdetails-${this.context}`);return e===`tiles`||e===void 0?`grid`:t===`showdetails`?`list-detail`:`list-compact`}persistQueryStateToUrl(e,t={}){let n=new URL(window.location.href),r=new URLSearchParams(n.searchParams),i=this.removeRecognizedParams(n.searchParams),a=!1;switch(e.baseQuery&&i.set(`query`,e.baseQuery),e.searchType){case x.FULLTEXT:i.set(`sin`,`TXT`);break;case x.RADIO:i.set(`sin`,`RADIO`);break;case x.TV:i.set(`sin`,`TV`);break;case x.METADATA:(t.persistMetadataSearchType||r.get(`sin`)===`MD`)&&i.set(`sin`,`MD`);break}if(r.get(`sin`)===``&&(r.delete(`sin`),a=!0),e.currentPage&&(e.currentPage>1?i.set(`page`,e.currentPage.toString()):i.delete(`page`)),e.selectedSort){let t=Zi[e.selectedSort],n=this.sortDirectionPrefix(e.sortDirection),a=e.searchType===x.TV&&e.selectedSort===R.relevance;if(t.field===R.unrecognized){let t=r.get(`sort`)??``,{field:a,direction:o}=this.getSortFieldAndDirection(t);e.sortDirection||(n=this.sortDirectionPrefix(o)),a?i.set(`sort`,`${n}${a}`):i.set(`sort`,t)}else if(t.shownInURL||a){let e=t.urlNames[0];i.set(`sort`,`${n}${e}`)}}if(e.selectedFacets)for(let[t,n]of Object.entries(e.selectedFacets)){let e=Object.entries(n);if(e.length!==0)for(let[n,r]of e){let e=r.state===`hidden`,a=`${t}:"${n}"`;e?i.append(`not[]`,a):i.append(`and[]`,a)}}let o=e.minSelectedDate?.includes(`-`)||e.maxSelectedDate?.includes(`-`)?`date`:`year`;e.minSelectedDate&&e.maxSelectedDate&&i.append(`and[]`,`${o}:[${e.minSelectedDate} TO ${e.maxSelectedDate}]`),e.titleQuery&&i.append(`and[]`,e.titleQuery),e.creatorQuery&&i.append(`and[]`,e.creatorQuery);let s=t.forceReplace?`replaceState`:`pushState`,c=this.paramsMatch(r,i,[`sin`,`sort`,`and[]`,`not[]`,`only_commercials`,`only_factchecks`,`only_quotes`]);if(c&&this.paramsMatch(r,i,[`query`])){if(a)i.delete(`sin`);else if(this.paramsMatch(r,i,[`page`]))return;s=`replaceState`}else c&&this.hasLegacyParam(r)&&(s=`replaceState`);window.history[s]?.({query:e.baseQuery,searchType:e.searchType,page:e.currentPage,sort:{field:e.selectedSort,direction:e.sortDirection},minDate:e.minSelectedDate,maxDate:e.maxSelectedDate,facets:e.selectedFacets},``,n)}loadQueryStateFromUrl(){let e=new URL(window.location.href),t=e.searchParams.get(`sin`),n=e.searchParams.get(`page`),r=e.searchParams.get(`query`),i=e.searchParams.get(`sort`),a=e.searchParams.getAll(`and[]`),o=e.searchParams.getAll(`not[]`);for(let[t,n]of e.searchParams.entries())/and\[\d+\]/.test(t)?a.push(n):/not\[\d+\]/.test(t)&&o.push(n);let s=e.searchParams.get(`q`)??e.searchParams.get(`search`),c={selectedFacets:ia()};switch(r?c.baseQuery=r:s&&(c.baseQuery=s),t){case`TXT`:c.searchType=x.FULLTEXT;break;case`RADIO`:c.searchType=x.RADIO;break;case`TV`:c.searchType=x.TV;break;case`MD`:c.searchType=x.METADATA;break;default:c.searchType=x.DEFAULT;break}if(n?c.currentPage=parseInt(n,10):c.currentPage=1,i){let{field:e,direction:t}=this.getSortFieldAndDirection(i);c.selectedSort=Qi(e).field,[`asc`,`desc`].includes(t)&&(c.sortDirection=t)}a&&a.forEach(e=>{let[t,...n]=e.split(`:`);if(!n.length)return;let r=n.join(`:`);if(t=t.replace(/Sorter$/,``),t.startsWith(`-`)){o.push(e.slice(1));return}switch(t){case`date`:case`year`:{let[e,n]=r.split(` TO `);e&&n?(c.minSelectedDate=e.substring(1,e.length),c.maxSelectedDate=n.substring(0,n.length-1)):this.setSelectedFacetState(c.selectedFacets,t,r,`selected`);break}case`firstTitle`:c.selectedTitleFilter=r;break;case`firstCreator`:c.selectedCreatorFilter=r;break;default:this.setSelectedFacetState(c.selectedFacets,t,r,`selected`)}}),o&&o.forEach(e=>{let[t,...n]=e.split(`:`);if(!n.length)return;let r=n.join(`:`);this.setSelectedFacetState(c.selectedFacets,t,r,`hidden`)});for(let[t,n]of Object.entries(aa))if(e.searchParams.get(t)){this.setSelectedFacetState(c.selectedFacets,`clip_type`,n,`selected`);break}return c}getSortFieldAndDirection(e){let t=e.indexOf(` `)>-1,n,r;return t?[n,r]=e.split(` `):(n=e.startsWith(`-`)?e.slice(1):e,r=e.startsWith(`-`)?`desc`:`asc`),{field:n,direction:r}}sortDirectionPrefix(e){return e===`desc`?`-`:``}stripQuotes(e){return e.startsWith(`"`)&&e.endsWith(`"`)?e.substring(1,e.length-1):e}paramsMatch(e,t,n){return n.every(n=>Oa(e.getAll(n).sort(),t.getAll(n).sort()))}removeRecognizedParams(e){e.delete(`query`),e.delete(`sin`),e.delete(`page`),e.delete(`sort`),e.delete(`and[]`),e.delete(`not[]`);for(let t of e.keys())/(and|not)\[\d+\]/.test(t)&&e.delete(t);return e.delete(`q`),e.delete(`search`),e.delete(`only_commercials`),e.delete(`only_factchecks`),e.delete(`only_quotes`),e}hasLegacyParam(e){return e.has(`q`)||e.has(`search`)}setSelectedFacetState(e,t,n,r){let i=e[t];if(!i)return;let a=this.stripQuotes(n);i[a]??=this.getDefaultBucket(a),i[a].state=r}getDefaultBucket(e){return{key:e,count:0,state:`none`}}},Aa=[`forum_posts`,`lending`,`web_archives`],ja=new TextEncoder;async function Ma(e){let t=await crypto.subtle.digest(`SHA-1`,ja.encode(e));return[...new Uint8Array(t)].map(e=>e.toString(16).padStart(2,`0`)).join(``)}function Na(e,t){if(e)for(let[n,r]of Object.entries(e))for(let[i,a]of Object.entries(r))t(n,i,a,e)}function Pa(e,t,n,r=!1){let i=e??ia(),a={...i,[t]:{...i[t],[n.key]:n}};return r&&n.state===`none`&&delete a[t]?.[n.key],a}function Fa(e){let t=ia();return Na(e,(e,n,r)=>{t[e]||(t[e]={}),t[e][n]=r}),t}function Ia(e,t){let n=Fa(e);return Na(t,(e,t,r)=>{n[e]||(n[e]={}),n[e][t]=r}),Na(n,(e,t,r)=>{r.state===`none`&&delete n[e]?.[t]}),n}var La=[`selected`,`hidden`,`none`];function Ra(e,t=y.COUNT){return e.sort((e,n)=>{let r=La.indexOf(e.state)-La.indexOf(n.state),i;return i=t===y.ALPHABETICAL?e.key.localeCompare(n.key):t===y.NUMERIC?Number(n.key)-Number(e.key):n.count-e.count,r||i})}var za=class{get initialSearchComplete(){return this._initialSearchCompletePromise}constructor(e,t=50){this.host=e,this.pageSize=t,this.pages={},this.offset=0,this.numTileModels=0,this.numInitialPages=2,this.fetchesInProgress=new Set,this.previousQueryKey=``,this.searchResultsLoading=!1,this.facetsLoading=!1,this.facetsReadyToLoad=!1,this.suppressFetches=!1,this.totalResults=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.collectionTitles=new Map,this.tvChannelMaps={},this.tvChannelAliases=new Map,this.parentCollections=[],this.prefixFilterCountMap={},this._initialSearchCompletePromise=Promise.resolve(!0),this.checkAllTiles=()=>{this.map(e=>{let t=e.clone();return t.checked=!0,t})},this.uncheckAllTiles=()=>{this.map(e=>{let t=e.clone();return t.checked=!1,t})},this.removeCheckedTiles=()=>{let{checkedTileModels:e,uncheckedTileModels:t}=this,n=e.length;if(n===0)return;this.offset+=n;let r={},i=Math.floor(this.offset/this.pageSize)+1,a=this.offset%this.pageSize;for(let e=1;e<=i;e+=1){let t=this.offset-this.pageSize*(e-1),n=Math.min(this.pageSize,t);r[e]=Array(n).fill(void 0)}for(let e of t)r[i]||(r[i]=[]),r[i].push(e),a+=1,a>=this.pageSize&&(i+=1,a=0);this.pages=r,this.numTileModels-=n,this.totalResults-=n,this.host.setTileCount(this.size),this.host.setTotalResultCount(this.totalResults),this.requestHostUpdate(),this.refreshVisibleResults()}}hostConnected(){this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading)}hostUpdate(){if(!this.activeOnHost||(this.setSearchResultsLoading(this.searchResultsLoading),this.setFacetsLoading(this.facetsLoading),!this.host.searchService)||this.pageFetchQueryKey===this.previousQueryKey)return;let e=!this.host.baseQuery;(this.canPerformSearch||e)&&(this.activeOnHost&&this.host.emitQueryStateChanged(),this.handleQueryChange())}get activeOnHost(){return this.host.dataSource===this}get size(){return this.numTileModels}reset(){this.pages={},this.aggregations={},this.histogramAggregation=void 0,this.pageElements=void 0,this.parentCollections=[],this.previousQueryKey=``,this.queryErrorMessage=void 0,this.offset=0,this.numTileModels=0,this.endOfDataReached=!1,this.queryInitialized=!1,this.facetsLoading=!1,this.fetchesInProgress.clear(),this.setTotalResultCount(0),this.requestHostUpdate()}resetPages(){Object.keys(this.pages).length<this.host.maxPagesToManage&&(this.pages={},this.fetchesInProgress.forEach(e=>{e.startsWith(`facets-`)||this.fetchesInProgress.delete(e)}),this.requestHostUpdate())}addPage(e,t){this.pages[e]=t,this.numTileModels+=t.length,this.requestHostUpdate()}addMultiplePages(e,t){let n=Math.ceil(t.length/this.pageSize);for(let r=0;r<n;r+=1){let n=this.pageSize*r;this.addPage(e+r,t.slice(n,n+this.pageSize))}this.host.currentVisiblePageNumbers.some(t=>t>=e&&t<=e+n)&&this.refreshVisibleResults()}getPage(e){return this.pages[e]}getAllPages(){return this.pages}hasPage(e){return!!this.pages[e]}getTileModelAt(e){let t=e+this.offset,n=Math.floor(t/this.pageSize)+1,r=t%this.pageSize,i=1,a=0;for(;a<=t;){if(!this.pages[i])return this.pages[n]?.[r];if(a+this.pages[i].length>t)return this.pages[i][t-a];a+=this.pages[i].length,i+=1}return this.pages[n]?.[r]}indexOf(e){return Object.values(this.pages).flat().indexOf(e)-this.offset}getPageSize(){return this.pageSize}setPageSize(e){this.reset(),this.pageSize=e}setNumInitialPages(e){this.numInitialPages=e}setTotalResultCount(e){this.totalResults=e,this.activeOnHost&&this.host.setTotalResultCount(e)}setFetchesSuppressed(e){this.suppressFetches=e}setEndOfDataReached(e){this.endOfDataReached=e}async handleQueryChange(){if(this.suppressFetches)return;this.reset();let e;this._initialSearchCompletePromise=new Promise(t=>{e=t}),this.queryInitialized=!0,await Promise.all([this.doInitialPageFetch(),this.canFetchFacets?this.fetchFacets():null]),e(!0)}async handleFacetReadinessChange(e){let t=!this.facetsReadyToLoad&&e;this.facetsReadyToLoad=e,t&&this.canFetchFacets&&this.fetchFacets()}get canFetchFacets(){if(this.host.facetLoadStrategy===`off`||Aa.includes(this.host.profileElement)||this.host.facetLoadStrategy!==`eager`&&!this.facetsReadyToLoad)return!1;let e=Object.keys(this.aggregations??{}).length>0;return!(this.facetsLoading||e)}map(e){Object.keys(this.pages).length&&(this.pages=Object.fromEntries(Object.entries(this.pages).map(([t,n])=>[t,n.map((t,n,r)=>t&&e(t,n,r))])),this.requestHostUpdate(),this.refreshVisibleResults())}get checkedTileModels(){return this.getFilteredTileModels(e=>e.checked)}get uncheckedTileModels(){return this.getFilteredTileModels(e=>!e.checked)}getFilteredTileModels(e){return Object.values(this.pages).flat().filter((t,n,r)=>t?e(t,n,r):!1)}get effectiveSearchType(){return!this.host.baseQuery?.trim()&&this.host.withinCollection&&this.host.searchType===x.FULLTEXT?x.METADATA:this.host.searchType}get canPerformSearch(){if(!this.host.searchService)return!1;let e=!!this.host.baseQuery?.trim(),t=!!this.host.identifiers?.length,n=!!this.host.withinCollection,r=!!this.host.withinProfile,i=!!this.host.profileElement,a=this.effectiveSearchType,o=a===x.DEFAULT,s=a===x.METADATA,c=a===x.TV;return e||t||n&&(o||s||c)||r&&i&&(o||s)}setSearchResultsLoading(e){this.searchResultsLoading=e,this.activeOnHost&&this.host.setSearchResultsLoading(e)}setFacetsLoading(e){this.facetsLoading=e,this.activeOnHost&&this.host.setFacetsLoading(e)}requestHostUpdate(){this.activeOnHost&&this.host.requestUpdate()}refreshVisibleResults(){this.activeOnHost&&this.host.refreshVisibleResults()}get pageFetchQueryKey(){let e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e,n=this.host.selectedSort??`none`,r=this.host.sortDirection??`none`;return`fq:${this.fullQuery}-pt:${t}-st:${this.effectiveSearchType}-sf:${n}-sd:${r}`}get facetFetchQueryKey(){let e=`pf;${this.host.withinProfile}--pe;${this.host.profileElement}`,t=this.host.withinCollection??e;return`facets-fq:${this.fullQuery}-pt:${t}-st:${this.effectiveSearchType}`}get filterMap(){let e=new Ie,{minSelectedDate:t,maxSelectedDate:n,selectedFacets:r,internalFilters:i,selectedTitleFilter:a,selectedCreatorFilter:o}=this.host,s=this.host.searchType===x.TV?`date`:`year`;t&&e.addFilter(s,t,Fe.GREATER_OR_EQUAL),n&&e.addFilter(s,n,Fe.LESS_OR_EQUAL);let c=Ia(i,r);if(c)for(let[t,n]of Object.entries(c)){let{name:r,values:i}=this.prepareFacetForFetch(t,n);for(let[t,n]of Object.entries(i)){let i;n.state===`selected`?i=Fe.INCLUDE:n.state===`hidden`&&(i=Fe.EXCLUDE),i&&e.addFilter(r,t,i)}}return a&&e.addFilter(`firstTitle`,a,Fe.INCLUDE),o&&e.addFilter(`firstCreator`,o,Fe.INCLUDE),e.build()}async requestUID(e,t){return`R:${(await Ma(JSON.stringify({pageType:e.pageType,pageTarget:e.pageTarget,query:e.query,fields:e.fields,filters:e.filters,sort:e.sort,searchType:this.host.searchType}))).slice(0,20)}-S:${(await this.host.getSessionId()).slice(0,20)}-P:${e.page??0}-K:${t.charAt(0)}-T:${Date.now()}`}get pageSpecifierParams(){return this.host.identifiers?.length?{pageType:`client_document_fetch`}:this.host.withinCollection?{pageType:`collection_details`,pageTarget:this.host.withinCollection}:this.host.withinProfile?{pageType:`account_details`,pageTarget:this.host.withinProfile,pageElements:this.host.profileElement?[this.host.profileElement]:[]}:null}get fullQuery(){let e=[],t=this.host.baseQuery?.trim();t&&e.push(t),this.host.identifiers&&e.push(`identifier:(${this.host.identifiers.join(` OR `)})`);let{facetQuery:n,dateRangeQueryClause:r,sortFilterQueries:i}=this;return n&&e.push(n),r&&e.push(r),i&&e.push(i),e.join(` AND `).trim()}get facetQuery(){if(!this.host.selectedFacets)return;let e=[];for(let[t,n]of Object.entries(this.host.selectedFacets))e.push(this.buildFacetClause(t,n));return this.joinFacetClauses(e)?.trim()}get dateRangeQueryClause(){if(!(!this.host.minSelectedDate||!this.host.maxSelectedDate))return`year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`}get sortFilterQueries(){return[this.titleQuery,this.creatorQuery].filter(e=>e).join(` AND `)}get titleQuery(){return this.host.selectedTitleFilter?`firstTitle:${this.host.selectedTitleFilter}`:void 0}get creatorQuery(){return this.host.selectedCreatorFilter?`firstCreator:${this.host.selectedCreatorFilter}`:void 0}buildFacetClause(e,t){let{name:n,values:r}=this.prepareFacetForFetch(e,t),i=Object.entries(r);if(i.length===0)return``;let a=[];for(let[e,t]of i){let n=t.state===`hidden`?`-`:``;a.push(`${n}"${e}"`)}return`${n}:(${a.join(` OR `)})`}prepareFacetForFetch(e,t){let[n,r]=[e,t];return e===`lending`&&(n=`lending___status`),{name:n,values:r}}joinFacetClauses(e){let t=e.filter(e=>e.length>0);return t.length>0?`(${t.join(` AND `)})`:void 0}async fetchFacets(){let e=this.host.baseQuery?.trim();if(!this.canPerformSearch)return;let{facetFetchQueryKey:t}=this;if(this.fetchesInProgress.has(t))return;this.fetchesInProgress.add(t),this.setFacetsLoading(!0);let n=this.host.sortParam?[this.host.sortParam]:[],r={...this.pageSpecifierParams,query:e||``,identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregationsSize:10};r.uid=await this.requestUID({...r,sort:n},`aggregations`);let i=await this.host.searchService?.search(r,this.effectiveSearchType),a=i?.success,o=!this.fetchesInProgress.has(t);if(this.fetchesInProgress.delete(t),o)return;if(!a){let e=i?.error?.message,t=i?.error?.details?.message;!e&&!t&&window?.Sentry?.captureMessage?.(`Missing or malformed facet response from backend`,`error`),this.setFacetsLoading(!1);return}let{aggregations:s,collectionTitles:c,tvChannelAliases:l}=a.response;if(this.aggregations=s,this.histogramAggregation=this.host.searchType===x.TV?s?.date_histogram:s?.year_histogram,c)for(let[e,t]of Object.entries(c))this.collectionTitles.set(e,t);if(l)for(let[e,t]of Object.entries(l))this.tvChannelAliases.set(e,t);this.setFacetsLoading(!1),this.requestHostUpdate()}async doInitialPageFetch(){this.setSearchResultsLoading(!0),await this.fetchPage(this.host.initialPageNumber,this.numInitialPages)}async fetchPage(e,t=1){let n=this.host.baseQuery?.trim();if(!this.canPerformSearch){this.setSearchResultsLoading(!1);return}if(this.hasPage(e)||this.endOfDataReached)return;let r=e===1?t:1,i=this.pageSize*r,{pageFetchQueryKey:a}=this,o=`${a}-p:${e}`;if(this.fetchesInProgress.has(o))return;for(let t=0;t<r;t+=1)this.fetchesInProgress.add(`${a}-p:${e+t}`);this.previousQueryKey=a;let{withinCollection:s,withinProfile:c}=this.host,l=this.host.sortParam?[this.host.sortParam]:[],u=this.host.selectedSort===R.default,d=this.host.searchType===x.TV&&u;if((c&&u||d)&&this.host.defaultSortField){let{searchServiceKey:e,handledBySearchService:t}=Zi[this.host.defaultSortField];e&&t&&(l=[{field:e,direction:this.host.defaultSortDirection??`desc`}])}let f={...this.pageSpecifierParams,query:n||``,identifiers:this.host.identifiers,page:e,rows:i,sort:l,filters:this.filterMap,aggregations:{omit:!0}};f.uid=await this.requestUID(f,`hits`);let p=await this.host.searchService?.search(f,this.effectiveSearchType),m=p?.success;if(!this.fetchesInProgress.has(o))return;for(let t=0;t<r;t+=1)this.fetchesInProgress.delete(`${a}-p:${e+t}`);if(!m){let e=p?.error?.message,t=p?.error?.details?.message;this.queryErrorMessage=`${e??``}${t?`; ${t}`:``}`,this.queryErrorMessage||(this.queryErrorMessage=`Missing or malformed response from backend`,window?.Sentry?.captureMessage?.(this.queryErrorMessage,`error`)),this.setSearchResultsLoading(!1),this.requestHostUpdate(),this.host.emitSearchError();return}this.setTotalResultCount(m.response.totalResults-this.offset),this.activeOnHost&&this.totalResults===0&&this.host.emitEmptyResults(),this.sessionContext=m.sessionContext,s?(this.collectionExtraInfo=m.response.collectionExtraInfo,this.activeOnHost&&this.host.applyDefaultCollectionSort(this.collectionExtraInfo),this.collectionExtraInfo&&(this.parentCollections=[].concat(this.collectionExtraInfo.public_metadata?.collection??[]),this.host.isTVCollection=this.host.withinCollection?.startsWith(`TV-`)||this.host.withinCollection===`tvnews`||this.host.withinCollection===`tvarchive`||this.parentCollections.includes(`tvnews`)||this.parentCollections.includes(`tvarchive`))):c&&(this.accountExtraInfo=m.response.accountExtraInfo,this.pageElements=m.response.pageElements);let{results:h,collectionTitles:ee,tvChannelAliases:te}=m.response;if(h&&h.length>0){if(ee){for(let[e,t]of Object.entries(ee))this.collectionTitles.set(e,t);let e=this.collectionExtraInfo?.public_metadata?.title;s&&e&&this.collectionTitles.set(s,e)}if(te)for(let[e,t]of Object.entries(te))this.tvChannelAliases.set(e,t);let t=[`lending`,`web_archives`].includes(this.host.profileElement);t&&(r=Math.ceil(h.length/this.pageSize),this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.totalResults));for(let n=0;n<r;n+=1){let i=this.pageSize*n;this.addFetchedResultsToDataSource(e+n,h.slice(i,i+this.pageSize),!t||n===r-1)}}(this.size>=this.totalResults||h.length===0)&&(this.endOfDataReached=!0,this.activeOnHost&&this.host.setTileCount(this.size)),this.setSearchResultsLoading(!1),this.requestHostUpdate()}get hitRequestSource(){let{host:e}=this;return e.baseQuery?`search_query`:e.withinProfile?`profile_tab`:e.withinCollection?`collection_members`:`unknown`}addFetchedResultsToDataSource(e,t,n=!0){let r=[],i=this.hitRequestSource;t?.forEach(e=>{e.identifier&&r.push(new Xi(e,i))}),this.addPage(e,r),n&&this.refreshVisibleResults()}async fetchPrefixFilterBuckets(e){let t=this.host.baseQuery?.trim();if(!this.canPerformSearch)return[];let n=ra[e],r=this.host.sortParam?[this.host.sortParam]:[],i={...this.pageSpecifierParams,query:t||``,identifiers:this.host.identifiers,rows:0,filters:this.filterMap,aggregations:{simpleParams:[n]},aggregationsSize:26};return i.uid=await this.requestUID({...i,sort:r},`aggregations`),(await this.host.searchService?.search(i,this.effectiveSearchType))?.success?.response?.aggregations?.[n]?.buckets??[]}async updatePrefixFilterCounts(e){let{facetFetchQueryKey:t}=this,n=await this.fetchPrefixFilterBuckets(e);t===this.facetFetchQueryKey&&(this.prefixFilterCountMap={...this.prefixFilterCountMap},this.prefixFilterCountMap[e]=n.reduce((e,t)=>(e[t.key.toUpperCase()]=t.doc_count,e),{}),this.requestHostUpdate())}async updatePrefixFiltersForCurrentSort(){if([`title`,`creator`].includes(this.host.selectedSort)){let e=this.host.selectedSort;this.prefixFilterCountMap[e]||this.updatePrefixFilterCounts(e)}}refreshLetterCounts(){Object.keys(this.prefixFilterCountMap).length>0&&(this.prefixFilterCountMap={}),this.updatePrefixFiltersForCurrentSort(),this.requestHostUpdate()}populateTVChannelMaps(){return this._tvMapsPromise||=this._fetchTVChannelMaps(),this._tvMapsPromise}async _fetchTVChannelMaps(){let e=`https://av.archive.org/etc`,t=new Date().toISOString().slice(0,10),n=fetch(`${e}/chan2network.json?date=${t}`),r=fetch(`${e}/program2chans.json?date=${t}`),[i,a]=await Promise.all([n,r]);return this.tvChannelMaps.channelToNetwork=new Map(Object.entries(await i.json())),this.tvChannelMaps.programToChannels=new Map(Object.entries(await a.json())),this.requestHostUpdate(),this.tvChannelMaps}},Ba=function(e){return e.default=`collection-browser`,e}({}),z=function(e){return e.sortBy=`sortBy`,e.filterByCreator=`filterByCreator`,e.filterByTitle=`filterByTitle`,e.displayMode=`displayMode`,e.loadDesktopView=`loadDesktopView`,e.loadMobileView=`loadMobileView`,e.facetSelected=`facetSelected`,e.facetDeselected=`facetDeselected`,e.facetNegativeSelected=`facetNegativeSelected`,e.facetNegativeDeselected=`facetNegativeDeselected`,e.mobileFacetsToggled=`mobileFacetsToggled`,e.partOfCollectionClicked=`partOfCollectionClicked`,e.histogramChanged=`histogramChanged`,e.histogramChangedFromModal=`histogramChangedFromModal`,e.histogramExpanded=`histogramExpanded`,e.resultSelected=`resultSelected`,e.moreFacetsPageChange=`moreFacetsPageChange`,e.showMoreFacetsModal=`showMoreFacetsModal`,e.closeMoreFacetsModal=`closeMoreFacetsModal`,e.applyMoreFacetsModal=`applyMoreFacetsModal`,e}({}),Va=E`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`,Ha=w`
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
`,Ua=e=>e??C,{I:Wa}=Bt,Ga=e=>e,Ka=e=>e.strings===void 0,qa=()=>document.createComment(``),Ja=(e,t,n)=>{let r=e._$AA.parentNode,i=t===void 0?e._$AB:t._$AA;if(n===void 0)n=new Wa(r.insertBefore(qa(),i),r.insertBefore(qa(),i),e,e.options);else{let t=n._$AB.nextSibling,a=n._$AM,o=a!==e;if(o){let t;n._$AQ?.(e),n._$AM=e,n._$AP!==void 0&&(t=e._$AU)!==a._$AU&&n._$AP(t)}if(t!==i||o){let e=n._$AA;for(;e!==t;){let t=Ga(e).nextSibling;Ga(r).insertBefore(e,i),e=t}}}return n},Ya=(e,t,n=e)=>(e._$AI(t,n),e),Xa={},Za=(e,t=Xa)=>e._$AH=t,Qa=e=>e._$AH,$a=e=>{e._$AR(),e._$AA.remove()},eo=rr(class extends ir{constructor(e){if(super(e),e.type!==nr.PROPERTY&&e.type!==nr.ATTRIBUTE&&e.type!==nr.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Ka(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===Et||t===C)return t;let n=e.element,r=e.name;if(e.type===nr.PROPERTY){if(t===n[r])return Et}else if(e.type===nr.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return Et}else if(e.type===nr.ATTRIBUTE&&n.getAttribute(r)===t+``)return Et;return Za(e),t}});function to(e,t,n){return e?t(e):n?.(e)}function no(e,t){return t.some(t=>e.has(t))}function ro(e,t){let n=[...e],r=[...t],i=n.length,a=r.length;if(i===0)return!0;let o=0,s=0;for(;s<a;){if(r[s]===n[o]&&(o+=1),o>=i)return!0;s+=1}return!1}var io=w`
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
`,ao=`data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501%202.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131%202.7226499%201.81402515z'%20%3e%3c/path%3e%3c/svg%3e`,oo=`data:image/svg+xml,%3csvg%20viewBox='0%200%208%204'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m6.7226499%203.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501%202.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131%202.7226499-1.81402514z'%20%3e%3c/path%3e%3c/svg%3e`,so=`data:image/svg+xml,%3csvg%20viewBox='0%200%20100%20100'%20xmlns='http://www.w3.org/2000/svg'%20%3e%3cpath%20d='m50%200c27.6142375%200%2050%2022.3857625%2050%2050s-22.3857625%2050-50%2050-50-22.3857625-50-50%2022.3857625-50%2050-50zm23.8159475%2026.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362%2018.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113l18.0989475%2018.0988362-18.0989475%2018.0988362c-1.5787367%201.5787367-1.5787367%204.1383746%200%205.7171113%201.4033215%201.4033215%203.5816761%201.5592461%205.1572272.4677738l.5598841-.4677738%2018.0988362-18.0989475%2018.0988362%2018.0989475.5598841.4677738c1.5755511%201.0914723%203.7539057.9355477%205.1572272-.4677738%201.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113l-18.0989475-18.0988362%2018.0989475-18.0988362c1.5787367-1.5787367%201.5787367-4.1383746%200-5.7171113z'%20fill-rule='evenodd'%20%3e%3c/path%3e%3c/svg%3e`,co={all:()=>!0,prefix:(e,t)=>t.startsWith(e),suffix:(e,t)=>t.endsWith(e),substring:(e,t)=>t.includes(e),subsequence:ro},lo=`list`,uo=`substring`,fo=e=>e,po=e=>e.toLocaleLowerCase(),B=class extends O{constructor(){super(),this.options=[],this.behavior=lo,this.maxAutocompleteEntries=1/0,this.filter=uo,this.caseSensitive=!1,this.sort=!1,this.wrapArrowKeys=!1,this.stayOpen=!1,this.clearable=!1,this.open=!1,this.disabled=!1,this.required=!1,this.value=null,this.hasFocus=!1,this.highlightedOption=null,this.enteredText=``,this.filterText=``,this.losingFocus=!1,this.optionsByID=new Map,this.optionFilteringValues=new Map,this.optionsRespectingSortFlag=[],this.filteredOptions=[],this.internals=this.attachInternals()}render(){let e=ar({disabled:this.disabled,focused:this.hasFocus});return T`
      <div id="container" part="container">
        ${this.labelTemplate}
        <div id="main-widget-row" class=${e} part="combo-box">
          ${this.textInputTemplate}
          ${this.clearable?this.clearButtonTemplate:D}
          ${this.caretButtonTemplate}
        </div>
        ${this.optionsListTemplate}
      </div>
    `}willUpdate(e){(e.has(`options`)||e.has(`caseSensitive`))&&this.rebuildOptionFilteringValues(),e.has(`options`)&&this.rebuildOptionIDMap(),(e.has(`options`)||e.has(`sort`))&&this.rebuildSortedOptions(),no(e,[`options`,`behavior`,`maxAutocompleteEntries`,`filter`,`filterText`,`caseSensitive`,`sort`])&&this.rebuildFilteredOptions(),e.has(`open`)&&(this.open?this.value&&this.setHighlightedOption(this.selectedOption):this.setHighlightedOption(null)),e.has(`required`)&&this.updateFormValidity()}updated(e){e.has(`value`)&&this.handleValueChanged(),e.has(`options`)&&this.behavior!==`freeform`&&!this.selectedOption&&this.clearSelectedOption(),e.has(`open`)&&(this.open?(this.positionOptionsMenu(),this.optionsList?.showPopover?.(),this.optionsList?.classList.add(`visible`)):(this.optionsList?.hidePopover?.(),this.optionsList?.classList.remove(`visible`)))}get labelTemplate(){return T`
      <label id="label" for="text-input" part="label">
        <slot name="label"></slot>
      </label>
    `}get textInputTemplate(){return T`
      <input
        type="text"
        id="text-input"
        class=${ar({"clear-padding":this.clearable&&!this.shouldShowClearButton})}
        .value=${eo(this.enteredText)}
        placeholder=${Ua(this.placeholder)}
        part="text-input"
        role="combobox"
        autocomplete="off"
        aria-autocomplete="list"
        aria-controls="options-list"
        aria-expanded=${this.open}
        aria-activedescendant=${Ua(this.highlightedOption?.id)}
        ?readonly=${this.behavior===`select-only`}
        ?disabled=${this.disabled}
        ?required=${this.required}
        @click=${this.handleComboBoxClick}
        @keydown=${this.handleComboBoxKeyDown}
        @input=${this.handleTextBoxInput}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
      />
    `}get clearButtonTemplate(){return T`
      <button
        type="button"
        id="clear-button"
        part="clear-button"
        tabindex="-1"
        ?hidden=${!this.shouldShowClearButton}
        @click=${this.handleClearButtonClick}
      >
        <span class="sr-only">${N(`Clear`)}</span>
        <slot name="clear-button">
          <img
            class="icon clear-icon"
            part="icon clear-icon"
            src=${so}
            alt=""
            aria-hidden="true"
          />
        </slot>
      </button>
    `}get caretTemplate(){return T`
      <slot name="caret-closed" ?hidden=${this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${ao}
          alt=""
          aria-hidden="true"
        />
      </slot>
      <slot name="caret-open" ?hidden=${!this.open}>
        <img
          class="icon caret-icon"
          part="icon caret-icon"
          src=${oo}
          alt=""
          aria-hidden="true"
        />
      </slot>
    `}get caretButtonTemplate(){return T`
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
        <span class="sr-only">${N(`Toggle options`)}</span>
        ${this.caretTemplate}
      </button>
    `}get optionsListTemplate(){return T`
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
        ${to(this.open,()=>this.optionTemplates)}
        <slot name="options-list-bottom"></slot>
      </ul>
    `}get optionTemplates(){return this.filteredOptions.length===0&&this.maxAutocompleteEntries>0?[this.emptyOptionsTemplate]:this.filteredOptions.map(e=>{let t=e===this.highlightedOption,n=ar({option:!0,highlight:t});return T`
        <li
          id=${e.id}
          class=${n}
          part="option ${t?`highlight`:``}"
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
      `})}get emptyOptionsTemplate(){return T`
      <li id="empty-options" part="empty-options">
        <slot name="empty-options">${N(`No matching options`)}</slot>
      </li>
    `}handleOptionPointerEnter(e){this.handleOptionPointerMove(e)}handleOptionPointerMove(e){let t=e.currentTarget,n=this.getOptionFor(t.id);n&&this.setHighlightedOption(n)}handleOptionClick(e){let t=e.currentTarget,n=this.getOptionFor(t.id);n&&(this.setSelectedOption(n.id),this.stayOpen||this.closeOptionsMenu())}handleComboBoxKeyDown(e){switch(e.key){case`Enter`:this.handleEnterPressed();break;case`Escape`:this.handleEscapePressed();break;case`ArrowUp`:e.altKey?this.handleAltUpArrowPressed():this.handleUpArrowPressed();break;case`ArrowDown`:e.altKey?this.handleAltDownArrowPressed():this.handleDownArrowPressed();break;case`Tab`:this.handleTabPressed();return;case` `:this.handleSpacePressed(e);return;default:return}e.stopPropagation(),e.preventDefault()}async handleTextBoxInput(){let e=this.textInput?.value??``;this.enteredText=e,this.setFilterText(e),this.openOptionsMenu(),await this.updateComplete,this.highlightFirstOption()}handleEnterPressed(){if(!this.open){this.openOptionsMenu();return}this.highlightedOption?this.setSelectedOption(this.highlightedOption.id):this.behavior===`freeform`&&this.setValue(this.enteredText),this.stayOpen||(this.open=!1)}handleEscapePressed(){if(this.open){this.closeOptionsMenu();return}this.clearSelectedOption()}handleUpArrowPressed(){this.open||this.openOptionsMenu(),this.highlightPreviousOption()}handleDownArrowPressed(){this.open||this.openOptionsMenu(),this.highlightNextOption()}handleAltUpArrowPressed(){this.closeOptionsMenu()}handleAltDownArrowPressed(){this.openOptionsMenu()}handleTabPressed(){this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1))}handleSpacePressed(e){this.behavior===`select-only`&&(this.open?this.highlightedOption&&(this.setSelectedOption(this.highlightedOption.id),this.stayOpen||(this.open=!1)):this.openOptionsMenu(),e.stopPropagation(),e.preventDefault())}handleComboBoxClick(){this.toggleOptionsMenu()}handleClearButtonClick(){this.clearSelectedOption(),this.textInput?.focus(),this.openOptionsMenu()}handleFocus(){this.behavior!==`select-only`&&this.textInput?.focus(),this.hasFocus=!0,this.losingFocus=!1}handleBlur(){this.hasFocus=!1,this.losingFocus=!0,setTimeout(()=>{this.losingFocus&&!this.shadowRoot?.activeElement&&(this.losingFocus=!1,this.closeOptionsMenu(),this.behavior===`list`?this.setTextValue(this.selectedOption?.text??``,!1):this.behavior===`freeform`&&(this.enteredText||this.value)&&this.setValue(this.enteredText))},0)}handleValueChanged(){if(this.value==null){this.enteredText&&this.setTextValue(``,!1);return}let e=this.getOptionFor(this.value);if(this.behavior===`freeform`){let t=e?.text??this.value;t!==this.enteredText&&this.setTextValue(t);return}if(!e){this.clearSelectedOption();return}this.enteredText!==e.text&&(this.setTextValue(e.text,!1),this.setFilterText(``))}highlightFirstOption(){this.setHighlightedOption(this.firstFilteredOption)}highlightLastOption(){this.setHighlightedOption(this.lastFilteredOption)}highlightPreviousOption(){let{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightLastOption();return}let{highlightedIndex:n}=this,r=this.wrapArrowKeys&&n===0?t:Math.max(n-1,0);this.setHighlightedOption(e[r])}highlightNextOption(){let{filteredOptions:e,lastFilteredIndex:t}=this;if(!this.highlightedOption){this.highlightFirstOption();return}let{highlightedIndex:n}=this,r=this.wrapArrowKeys&&n===t?0:Math.min(n+1,t);this.setHighlightedOption(e[r])}async setHighlightedOption(e){this.highlightedOption=e,await this.updateComplete;let{optionsList:t,highlightedElement:n}=this;if(!n||!t)return;let r=n.getBoundingClientRect(),i=t.getBoundingClientRect();(r.top<i.top||r.bottom>i.bottom)&&n.scrollIntoView({block:`nearest`})}setSelectedOption(e){let t=this.getOptionFor(e);if(!t)throw RangeError(`Unknown option ID`);let n=this.value;this.value=t.id,this.internals.setFormValue(this.value),this.setTextValue(t.text,!1),this.setFilterText(``),this.value!==n&&this.emitChangeEvent(),t.onSelected?.(t)}clearSelectedOption(){let e=this.value;this.value=null,this.internals.setFormValue(this.value),this.setTextValue(``),this.value!==e&&this.emitChangeEvent()}setValue(e){if(this.behavior===`freeform`){let t=this.value;this.value=e,this.internals.setFormValue(this.value),this.setTextValue(e),this.value!==t&&this.emitChangeEvent()}else this.setSelectedOption(e)}setTextValue(e,t=!0){this.textInput&&(this.textInput.value=e),this.enteredText=e,t&&this.setFilterText(e)}setFilterText(e){let{caseTransform:t}=this;this.filterText=t(e)}openOptionsMenu(){this.open=!0,this.emitToggleEvent()}closeOptionsMenu(){this.open=!1,this.emitToggleEvent()}toggleOptionsMenu(){this.open=!this.open,this.emitToggleEvent()}updateFormValidity(){this.required&&!this.value?this.internals.setValidity({valueMissing:!0},N(`A value is required`)):this.internals.setValidity({})}emitChangeEvent(){this.dispatchEvent(new CustomEvent(`change`,{detail:this.value}))}emitToggleEvent(){this.dispatchEvent(new CustomEvent(`toggle`,{detail:this.open}))}get isEmpty(){return!this.selectedOption&&!this.enteredText}get shouldShowClearButton(){return this.clearable&&!this.disabled&&!this.isEmpty}positionOptionsMenu(){let{mainWidgetRow:e,optionsList:t}=this;if(!e||!t)return;let n=e.getBoundingClientRect(),{innerHeight:r,scrollX:i,scrollY:a}=window,o=n.top,s=r-n.bottom,c=`var(--combo-box-list-max-height--)`,l={top:`${n.bottom+a}px`,left:`${n.left+i}px`,width:`var(--combo-box-list-width--, ${n.width}px)`,maxHeight:`min(${c}, ${s}px)`};Object.assign(t.style,l),setTimeout(()=>{t.getBoundingClientRect().bottom>=r&&o>s&&(t.style.top=`auto`,t.style.bottom=`${r-n.top-a}px`,t.style.maxHeight=`min(${c}, ${o}px)`)},0)}get caseTransform(){return this.caseSensitive?fo:po}getOptionFor(e){return this.optionsByID.get(e)??null}rebuildOptionIDMap(){this.optionsByID.clear();for(let e of this.options)this.optionsByID.set(e.id,e)}rebuildSortedOptions(){this.sort?this.optionsRespectingSortFlag=[...this.options].sort((e,t)=>{let n=this.optionFilteringValues.get(e),r=this.optionFilteringValues.get(t);return n.localeCompare(r)}):this.optionsRespectingSortFlag=this.options}rebuildOptionFilteringValues(){this.optionFilteringValues.clear();let{caseTransform:e}=this;for(let t of this.options){let n=e(t.text);this.optionFilteringValues.set(t,n)}}rebuildFilteredOptions(){let e=this.behavior===`select-only`?`all`:this.filter,t=typeof e==`string`?co[e]:e,n=this.optionsRespectingSortFlag.filter(e=>{let n=this.optionFilteringValues.get(e);return n?t(this.filterText,n,e):!1}).slice(0,this.maxAutocompleteEntries);this.filteredOptions=n}get firstFilteredOption(){return this.filteredOptions[0]??null}get lastFilteredOption(){return this.filteredOptions[this.lastFilteredIndex]??null}get lastFilteredIndex(){return this.filteredOptions.length-1}get selectedOption(){return this.value==null?null:this.getOptionFor(this.value)}get highlightedIndex(){return this.highlightedOption?this.filteredOptions.indexOf(this.highlightedOption):-1}get highlightedElement(){return this.highlightedOption?this.shadowRoot.getElementById(this.highlightedOption.id):null}static get styles(){return[io,w`
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
    `]}};B.formAssociated=!0,B.shadowRootOptions={...O.shadowRootOptions,delegatesFocus:!0},t([A({type:Array})],B.prototype,`options`,void 0),t([A({type:String})],B.prototype,`placeholder`,void 0),t([A({type:String})],B.prototype,`behavior`,void 0),t([A({type:Number,attribute:`max-autocomplete-entries`})],B.prototype,`maxAutocompleteEntries`,void 0),t([A({type:String})],B.prototype,`filter`,void 0),t([A({type:Boolean,reflect:!0,attribute:`case-sensitive`})],B.prototype,`caseSensitive`,void 0),t([A({type:Boolean,reflect:!0})],B.prototype,`sort`,void 0),t([A({type:Boolean,reflect:!0,attribute:`wrap-arrow-keys`})],B.prototype,`wrapArrowKeys`,void 0),t([A({type:Boolean,reflect:!0,attribute:`stay-open`})],B.prototype,`stayOpen`,void 0),t([A({type:Boolean,reflect:!0})],B.prototype,`clearable`,void 0),t([A({type:Boolean,reflect:!0})],B.prototype,`open`,void 0),t([A({type:Boolean,reflect:!0})],B.prototype,`disabled`,void 0),t([A({type:Boolean,reflect:!0})],B.prototype,`required`,void 0),t([A({type:String})],B.prototype,`value`,void 0),t([j()],B.prototype,`hasFocus`,void 0),t([j()],B.prototype,`highlightedOption`,void 0),t([j()],B.prototype,`enteredText`,void 0),t([j()],B.prototype,`filterText`,void 0),t([M(`#main-widget-row`)],B.prototype,`mainWidgetRow`,void 0),t([M(`#text-input`)],B.prototype,`textInput`,void 0),t([M(`#options-list`)],B.prototype,`optionsList`,void 0),B=t([k(`ia-combo-box`)],B);var mo=(e,t,n)=>{for(let n of t)if(n[0]===e)return(0,n[1])();return n?.()},ho=E`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><path id="a" d="m0 127.511499c0-70.3329329 57.1960466-127.511499 127.51918-127.511499 70.246413 0 127.48082 57.1785661 127.48082 127.511499 0 70.294604-57.234407 127.488501-127.48082 127.488501-70.3231334 0-127.51918-57.193897-127.51918-127.488501z"/><mask id="b" fill="#fff"><use fill="#fff" fill-rule="evenodd" xlink:href="#a"/></mask></defs><g fill="none" fill-rule="evenodd"><g transform="translate(0 79)"><path d="m180 161h13v18h-13z" fill="#ffcd27" opacity=".6"/><path d="m162 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m144 161h13v18h-13z" fill="#ffcd27" opacity=".5"/><path d="m126 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 161h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m90 161h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m72 161h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m54 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m36 161h13v18h-13z" fill="#ffcd27" opacity=".2"/><path d="m18 161h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m0 161h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 138h13v18h-13z" fill="#faab3c" opacity=".6"/><path d="m162 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m144 138h13v18h-13z" fill="#faab3c" opacity=".5"/><path d="m126 138h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 138h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 138h13v18h-13z" fill="#faab3c" opacity=".3"/><g fill="#f1644b"><path d="m72 138h13v18h-13z" opacity=".3"/><path d="m54 138h13v18h-13z" opacity=".2"/><path d="m36 138h13v18h-13z" opacity=".2"/><path d="m18 138h13v18h-13z" opacity=".1"/><path d="m0 138h13v18h-13z" opacity=".1"/><path d="m180 115h13v18h-13z" opacity=".6"/><path d="m162 115h13v18h-13z" opacity=".5"/><path d="m144 115h13v18h-13z" opacity=".5"/><path d="m126 115h13v18h-13z" opacity=".4"/><path d="m108 115h13v18h-13z" opacity=".4"/><path d="m90 115h13v18h-13z" opacity=".3"/><path d="m72 115h13v18h-13z" opacity=".3"/></g><path d="m54 115h13v18h-13z" fill="#9ecc4f" opacity=".2"/><path d="m36 115h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 115h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 92h13v18h-13z" fill="#333" opacity=".6"/><path d="m162 92h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 92h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 92h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m108 92h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m90 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 92h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m54 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m36 92h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 92h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 92h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 69h13v18h-13z" fill="#f1644b" opacity=".6"/><path d="m162 69h13v18h-13z" fill="#333" opacity=".5"/><path d="m144 69h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 69h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m72 69h13v18h-13z" fill="#00adef" opacity=".3"/><path d="m54 69h13v18h-13z" fill="#00adef" opacity=".2"/><path d="m36 69h13v18h-13z" fill="#333" opacity=".2"/><path d="m18 69h13v18h-13z" fill="#9ecc4f" opacity=".1"/><path d="m0 69h13v18h-13z" fill="#ffcd27" opacity=".1"/><path d="m180 46h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 46h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 46h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m108 46h13v18h-13z" fill="#333" opacity=".4"/><path d="m90 46h13v18h-13z" fill="#ffcd27" opacity=".3"/><path d="m72 46h13v18h-13z" fill="#333" opacity=".3"/><path d="m54 46h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 46h13v18h-13z" fill="#faab3c" opacity=".2"/><path d="m18 46h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m0 46h13v18h-13z" fill="#333" opacity=".1"/><path d="m180 23h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 23h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 23h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 23h13v18h-13z" fill="#f1644b" opacity=".4"/><path d="m108 23h13v18h-13z" fill="#faab3c" opacity=".4"/><path d="m90 23h13v18h-13z" fill="#faab3c" opacity=".3"/><path d="m72 23h13v18h-13z" fill="#f1644b" opacity=".3"/><path d="m54 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m36 23h13v18h-13z" fill="#f1644b" opacity=".2"/><path d="m18 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m0 23h13v18h-13z" fill="#f1644b" opacity=".1"/><path d="m180 0h13v18h-13z" fill="#00adef" opacity=".6"/><path d="m162 0h13v18h-13z" fill="#00adef" opacity=".5"/><path d="m144 0h13v18h-13z" fill="#9ecc4f" opacity=".5"/><path d="m126 0h13v18h-13z" fill="#ffcd27" opacity=".4"/><path d="m108 0h13v18h-13z" fill="#aa99c9" opacity=".4"/><path d="m90 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m72 0h13v18h-13z" fill="#aa99c9" opacity=".3"/><path d="m54 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m36 0h13v18h-13z" fill="#aa99c9" opacity=".2"/><path d="m18 0h13v18h-13z" fill="#aa99c9" opacity=".1"/><path d="m0 0h13v18h-13z" fill="#faab3c" opacity=".1"/><path d="m396 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 161h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 161h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 161h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 161h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 161h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 161h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 138h13v18h-13z" fill="#faab3c" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 138h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 115h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 115h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 115h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 115h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 115h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 115h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 92h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 92h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 92h13v18h-13z" fill="#aa99c9" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 92h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 92h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 92h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 92h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 92h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 69h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 69h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 69h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 69h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 69h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 69h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 69h13v18h-13z" fill="#333" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 69h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 46h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 46h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 46h13v18h-13z" fill="#333" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 46h13v18h-13z" fill="#333" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 46h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 46h13v18h-13z" fill="#333" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 46h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 46h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 46h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 23h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 23h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 23h13v18h-13z" fill="#f1644b" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m396 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 805 0)"/><path d="m414 0h13v18h-13z" fill="#00adef" transform="matrix(-1 0 0 1 841 0)"/><path d="m432 0h13v18h-13z" fill="#9ecc4f" transform="matrix(-1 0 0 1 877 0)"/><path d="m450 0h13v18h-13z" fill="#ffcd27" transform="matrix(-1 0 0 1 913 0)"/><path d="m468 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 949 0)"/><path d="m486 0h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(-1 0 0 1 985 0)"/><path d="m504 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1021 0)"/><path d="m522 0h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(-1 0 0 1 1057 0)"/><path d="m540 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1093 0)"/><path d="m558 0h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(-1 0 0 1 1129 0)"/><path d="m576 0h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 1 1165 0)"/><path d="m378 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m360 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m342 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m324 0h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 18)"/><path d="m306 0h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m288 0h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 18)"/><path d="m270 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m252 0h13v18h-13z" fill="#ffcd27" opacity=".8" transform="matrix(1 0 0 -1 0 18)"/><path d="m234 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m216 0h13v18h-13z" fill="#ffcd27" opacity=".7" transform="matrix(1 0 0 -1 0 18)"/><path d="m198 0h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 18)"/><path d="m378 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m360 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m342 23h13v18h-13z" fill="#faab3c" transform="matrix(1 0 0 -1 0 64)"/><path d="m324 23h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 64)"/><path d="m306 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m288 23h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 64)"/><path d="m270 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m252 23h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 64)"/><path d="m234 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m216 23h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 64)"/><path d="m198 23h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 64)"/><path d="m378 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m360 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m342 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m324 46h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 110)"/><path d="m306 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m288 46h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 110)"/><path d="m270 46h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m252 46h13v18h-13z" fill="#9ecc4f" opacity=".8" transform="matrix(1 0 0 -1 0 110)"/><path d="m234 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m216 46h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 110)"/><path d="m198 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 110)"/><path d="m378 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m360 69h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 156)"/><path d="m342 69h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 156)"/><path d="m324 69h13v18h-13z" fill="#aa99c9" transform="matrix(1 0 0 -1 0 156)"/><path d="m306 69h13v18h-13z" fill="#f1644b" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m288 69h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 156)"/><path d="m270 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m252 69h13v18h-13z" fill="#faab3c" opacity=".8" transform="matrix(1 0 0 -1 0 156)"/><path d="m234 69h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m216 69h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 156)"/><path d="m198 69h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 156)"/><path d="m378 92h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 202)"/><path d="m360 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m342 92h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 202)"/><path d="m324 92h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 202)"/><path d="m306 92h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m288 92h13v18h-13z" fill="#00adef" opacity=".9" transform="matrix(1 0 0 -1 0 202)"/><path d="m270 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m252 92h13v18h-13z" fill="#00adef" opacity=".8" transform="matrix(1 0 0 -1 0 202)"/><path d="m234 92h13v18h-13z" fill="#333" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m216 92h13v18h-13z" fill="#9ecc4f" opacity=".7" transform="matrix(1 0 0 -1 0 202)"/><path d="m198 92h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(1 0 0 -1 0 202)"/><path d="m378 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m360 115h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 248)"/><path d="m342 115h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 248)"/><path d="m324 115h13v18h-13z" fill="#333" transform="matrix(1 0 0 -1 0 248)"/><path d="m306 115h13v18h-13z" fill="#333" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m288 115h13v18h-13z" fill="#ffcd27" opacity=".9" transform="matrix(1 0 0 -1 0 248)"/><path d="m270 115h13v18h-13z" fill="#333" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m252 115h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 248)"/><path d="m234 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m216 115h13v18h-13z" fill="#faab3c" opacity=".7" transform="matrix(1 0 0 -1 0 248)"/><path d="m198 115h13v18h-13z" fill="#333" opacity=".6" transform="matrix(1 0 0 -1 0 248)"/><path d="m378 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m360 138h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 294)"/><path d="m342 138h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 294)"/><path d="m324 138h13v18h-13z" fill="#f1644b" transform="matrix(1 0 0 -1 0 294)"/><path d="m306 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m288 138h13v18h-13z" fill="#faab3c" opacity=".9" transform="matrix(1 0 0 -1 0 294)"/><path d="m270 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m252 138h13v18h-13z" fill="#f1644b" opacity=".8" transform="matrix(1 0 0 -1 0 294)"/><path d="m234 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m216 138h13v18h-13z" fill="#f1644b" opacity=".7" transform="matrix(1 0 0 -1 0 294)"/><path d="m198 138h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(1 0 0 -1 0 294)"/><path d="m378 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m360 161h13v18h-13z" fill="#00adef" transform="matrix(1 0 0 -1 0 340)"/><path d="m342 161h13v18h-13z" fill="#9ecc4f" transform="matrix(1 0 0 -1 0 340)"/><path d="m324 161h13v18h-13z" fill="#ffcd27" transform="matrix(1 0 0 -1 0 340)"/><path d="m306 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m288 161h13v18h-13z" fill="#aa99c9" opacity=".9" transform="matrix(1 0 0 -1 0 340)"/><path d="m270 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m252 161h13v18h-13z" fill="#aa99c9" opacity=".8" transform="matrix(1 0 0 -1 0 340)"/><path d="m234 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m216 161h13v18h-13z" fill="#aa99c9" opacity=".7" transform="matrix(1 0 0 -1 0 340)"/><path d="m198 161h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(1 0 0 -1 0 340)"/><path d="m594 0h13v18h-13z" fill="#ffcd27" opacity=".6" transform="matrix(-1 0 0 -1 1201 18)"/><path d="m612 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1237 18)"/><path d="m630 0h13v18h-13z" fill="#ffcd27" opacity=".5" transform="matrix(-1 0 0 -1 1273 18)"/><path d="m648 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 18)"/><path d="m666 0h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1345 18)"/><path d="m684 0h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 18)"/><path d="m702 0h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1417 18)"/><path d="m720 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1453 18)"/><path d="m738 0h13v18h-13z" fill="#ffcd27" opacity=".2" transform="matrix(-1 0 0 -1 1489 18)"/><path d="m756 0h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1525 18)"/><path d="m774 0h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 18)"/><path d="m594 23h13v18h-13z" fill="#faab3c" opacity=".6" transform="matrix(-1 0 0 -1 1201 64)"/><path d="m612 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1237 64)"/><path d="m630 23h13v18h-13z" fill="#faab3c" opacity=".5" transform="matrix(-1 0 0 -1 1273 64)"/><path d="m648 23h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 64)"/><path d="m666 23h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 64)"/><path d="m684 23h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 64)"/><path d="m702 23h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 64)"/><path d="m720 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 64)"/><path d="m738 23h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 64)"/><path d="m756 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 64)"/><path d="m774 23h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 64)"/><path d="m594 46h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 110)"/><path d="m612 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1237 110)"/><path d="m630 46h13v18h-13z" fill="#f1644b" opacity=".5" transform="matrix(-1 0 0 -1 1273 110)"/><path d="m648 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 110)"/><path d="m666 46h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 110)"/><path d="m684 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1381 110)"/><path d="m702 46h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 110)"/><path d="m720 46h13v18h-13z" fill="#9ecc4f" opacity=".2" transform="matrix(-1 0 0 -1 1453 110)"/><path d="m738 46h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 110)"/><path d="m756 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 110)"/><path d="m774 46h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 110)"/><path d="m594 69h13v18h-13z" fill="#333" opacity=".6" transform="matrix(-1 0 0 -1 1201 156)"/><path d="m612 69h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 156)"/><path d="m630 69h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 156)"/><path d="m648 69h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1309 156)"/><path d="m666 69h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1345 156)"/><path d="m684 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 156)"/><path d="m702 69h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1417 156)"/><path d="m720 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1453 156)"/><path d="m738 69h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 156)"/><path d="m756 69h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 156)"/><path d="m774 69h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 156)"/><path d="m594 92h13v18h-13z" fill="#f1644b" opacity=".6" transform="matrix(-1 0 0 -1 1201 202)"/><path d="m612 92h13v18h-13z" fill="#333" opacity=".5" transform="matrix(-1 0 0 -1 1237 202)"/><path d="m630 92h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 202)"/><path d="m648 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 202)"/><path d="m666 92h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 202)"/><path d="m684 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1381 202)"/><path d="m702 92h13v18h-13z" fill="#00adef" opacity=".3" transform="matrix(-1 0 0 -1 1417 202)"/><path d="m720 92h13v18h-13z" fill="#00adef" opacity=".2" transform="matrix(-1 0 0 -1 1453 202)"/><path d="m738 92h13v18h-13z" fill="#333" opacity=".2" transform="matrix(-1 0 0 -1 1489 202)"/><path d="m756 92h13v18h-13z" fill="#9ecc4f" opacity=".1" transform="matrix(-1 0 0 -1 1525 202)"/><path d="m774 92h13v18h-13z" fill="#ffcd27" opacity=".1" transform="matrix(-1 0 0 -1 1561 202)"/><path d="m594 115h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 248)"/><path d="m612 115h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 248)"/><path d="m630 115h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 248)"/><path d="m648 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1309 248)"/><path d="m666 115h13v18h-13z" fill="#333" opacity=".4" transform="matrix(-1 0 0 -1 1345 248)"/><path d="m684 115h13v18h-13z" fill="#ffcd27" opacity=".3" transform="matrix(-1 0 0 -1 1381 248)"/><path d="m702 115h13v18h-13z" fill="#333" opacity=".3" transform="matrix(-1 0 0 -1 1417 248)"/><path d="m720 115h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 248)"/><path d="m738 115h13v18h-13z" fill="#faab3c" opacity=".2" transform="matrix(-1 0 0 -1 1489 248)"/><path d="m756 115h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1525 248)"/><path d="m774 115h13v18h-13z" fill="#333" opacity=".1" transform="matrix(-1 0 0 -1 1561 248)"/><path d="m594 138h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 294)"/><path d="m612 138h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 294)"/><path d="m630 138h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 294)"/><path d="m648 138h13v18h-13z" fill="#f1644b" opacity=".4" transform="matrix(-1 0 0 -1 1309 294)"/><path d="m666 138h13v18h-13z" fill="#faab3c" opacity=".4" transform="matrix(-1 0 0 -1 1345 294)"/><path d="m684 138h13v18h-13z" fill="#faab3c" opacity=".3" transform="matrix(-1 0 0 -1 1381 294)"/><path d="m702 138h13v18h-13z" fill="#f1644b" opacity=".3" transform="matrix(-1 0 0 -1 1417 294)"/><path d="m720 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1453 294)"/><path d="m738 138h13v18h-13z" fill="#f1644b" opacity=".2" transform="matrix(-1 0 0 -1 1489 294)"/><path d="m756 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1525 294)"/><path d="m774 138h13v18h-13z" fill="#f1644b" opacity=".1" transform="matrix(-1 0 0 -1 1561 294)"/><path d="m594 161h13v18h-13z" fill="#00adef" opacity=".6" transform="matrix(-1 0 0 -1 1201 340)"/><path d="m612 161h13v18h-13z" fill="#00adef" opacity=".5" transform="matrix(-1 0 0 -1 1237 340)"/><path d="m630 161h13v18h-13z" fill="#9ecc4f" opacity=".5" transform="matrix(-1 0 0 -1 1273 340)"/><path d="m648 161h13v18h-13z" fill="#ffcd27" opacity=".4" transform="matrix(-1 0 0 -1 1309 340)"/><path d="m666 161h13v18h-13z" fill="#aa99c9" opacity=".4" transform="matrix(-1 0 0 -1 1345 340)"/><path d="m684 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1381 340)"/><path d="m702 161h13v18h-13z" fill="#aa99c9" opacity=".3" transform="matrix(-1 0 0 -1 1417 340)"/><path d="m720 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1453 340)"/><path d="m738 161h13v18h-13z" fill="#aa99c9" opacity=".2" transform="matrix(-1 0 0 -1 1489 340)"/><path d="m756 161h13v18h-13z" fill="#aa99c9" opacity=".1" transform="matrix(-1 0 0 -1 1525 340)"/><path d="m774 161h13v18h-13z" fill="#faab3c" opacity=".1" transform="matrix(-1 0 0 -1 1561 340)"/></g><g transform="translate(229)"><path d="m0 163.414428c0 90.282661 73.1123182 163.408804 163.387152 163.408804 36.142571 0 69.465987-11.874563 96.503984-31.804247l97.84885 97.516523c4.912418 4.618198 11.51858 7.464492 18.788734 7.464492 15.170539 0 27.47128-12.296442 27.47128-27.456054 0-8.364506-3.736364-15.823372-9.616636-20.857826l-96.093209-96.172128c17.888406-26.241035 28.422252-57.938405 28.422252-92.099564 0-90.2320345-73.112318-163.414428-163.325255-163.414428-90.2748338 0-163.387152 73.1823935-163.387152 163.414428z" fill="#999"/><g transform="translate(36 36)"><use fill="#fff" xlink:href="#a"/><path d="m135.660763 148.70091c.364228-.579415 1.490837-1.136024 2.636245-1.577175l.457403-.170083.448833-.15645.429688-.141498.759638-.232874.836301-.231431 18.280829-.001215.19491-.011051.202794-.017881.247815-.029781c.621919-.085699 1.518677-.293004 2.040439-.792877.397637-.380753.702259-.841071.925774-1.260385l.137125-.272145c.04179-.087808.079706-.172268.113878-.252057l.128943-.323055.119178-.358057v-45.185461h-23.10923c-3.36553 0-5.599705 1.3581721-7.076583 2.93031v48.068902zm-8.205086 0 2.160788-.014264v-48.137167c-1.476878-1.5446282-3.696783-2.862045-7.010333-2.862045h-23.1092292l.0007678 45.713737.0112285.168178.0209214.173899.0370444.211161c.0932827.452634.3109425 1.066293.8188151 1.465695.526089.412166 1.208439.604335 1.713672.693785l.256013.039309.208859.023165.228168.014813 19.094157.000223.237682.060474.480012.132689.315282.093319.355116.110754.387189.127778.411498.144393.428047.160596c1.084331.421403 2.251026.990863 2.954302 1.679508zm5.548742 8.747628c.251851 0 .525983-.01408.812699-.039079l.438298-.045293c.074219-.008782.148921-.018148.223954-.028048l.452973-.065416.453665-.075869.447082-.08395.433227-.089662.412098-.093003.383696-.093972.34802-.092573.305071-.088801.254848-.08266.197352-.074149c.110787-.046068.178394-.084881.193124-.113278.075334-.143783.342864-.272994.772162-.389029l.276747-.068051c.049279-.011083.100115-.022036.152477-.032861l.332246-.063435.367419-.06044.401131-.057513.433384-.054653.464175-.05186.493506-.049135 1.069163-.090361.868004-.061115.919211-.055662 1.296751-.066125 1.019525-.043819 1.412611-.051157 1.834904-.053019 2.657035-.05571 1.374969-.02089 2.477068-.026383 1.957947-.011997 1.910166-.005129 6.045147.020483 5.014577.056935v-53.988617l-3.71615-1.3204734-.588101 50.8117374-.77828.02962-1.822742.039073-5.842498.076788-3.480825.060896-1.809182.042629-.912892.02518c-.609594.017723-1.220619.037372-1.829689.059259l-1.291501.050048-1.505858.068618-1.475684.080037-1.079809.068179-1.051134.075682-1.348236.113376-.964719.094983-.919324.104025-.585187.074603-.561296.078963-.53592.083462-.509057.088098c-.165043.030153-.325362.061102-.480708.092869l-.450874.097779c-1.306381.300838-2.18993.669802-2.470085 1.123534-.611907.992257-7.826645.987033-9.518061-.529048l-.106623-.105716c-.228962-.252838-.78901-.474074-1.603516-.667611l-.428103-.094479c-.074767-.015367-.151211-.030547-.22929-.045542l-.487727-.087757c-.084437-.014261-.17042-.028341-.257904-.042242l-.542561-.08128-.576456-.077098-.608224-.073023-.637861-.069057-1.007709-.096387-1.062421-.088074-1.109951-.080126-1.541453-.095106-1.192916-.063006-2.037053-.090241-1.65446-.059876-2.071158-.060872-1.231568-.029723-3.180948-.0575-2.57634-.028621-3.1568948-.015367-3.5804204.010051-.5238893-51.2681974-3.3104917 1.4162484v54.074204l6.091503-.110017 4.8697032-.042899 1.42012-.004518 1.451867-.000435 2.462799.010003 2.199758.022091 1.996082.032898 1.566274.036091 1.898382.058605 1.097614.042942 1.059883.049177 1.34505.075837.950618.065003.603014.047387.576542.050742.548454.054194.518747.057743.487425.06139.454485.065134.419927.068975.383754.072913c.182564.037458.350956.076428.504267.116967l.286244.083185c.309863.099526.534315.207787.661802.32548l.048667.051019c.714453.863732 2.602457 1.171499 4.492467 1.281163l.565891.027314c.093935.003681.187582.006956.280794.00987l.552892.013511 1.046396.010012z" fill="#f9a72b" mask="url(#b)"/><path d="m226.413899 74.9897567c.315665-.5021599 1.203961-.98719 2.180847-1.394777l.455398-.1823985c.076361-.02941.152805-.058307.229112-.0866633l.45444-.163431.440583-.1491388.416149-.133529.555278-.1681423.836301-.231431 18.280829-.0012149.289969-.0186911.226726-.0234574c.620722-.0741415 1.610232-.2738639 2.169263-.8094424.441819-.4230583.768804-.9443454.997292-1.3984719l.125403-.2630934.102548-.2390362.080477-.2070401.119178-.3580573v-45.1854607h-23.10923c-3.36553 0-5.599704 1.3581721-7.076583 2.9303099v48.068902zm-8.205086 0 2.160789-.0142644v-48.1371672c-1.476879-1.5446279-3.696784-2.8620447-7.010333-2.8620447h-23.10923l.000768 45.713737.011228.1681782.020922.1738987.037044.2111608c.093283.452634.310943 1.0662932.818815 1.4656956.526089.4121654 1.208439.6043343 1.713672.6937848l.256013.0393092.208859.0231646.228169.0148134 19.094156.0002231.450008.1176898.419863.1199271.336169.1020876.372123.1193177.400314.136137.420742.1525458.43341.1685439c1.020028.4116141 2.080108.9505261 2.736499 1.593262zm5.548743 8.7476273c.125925 0 .257421-.00352.393275-.0101649l.419423-.0289141.438298-.0452929.4499-.0593011c.075546-.0109191.151272-.0223232.227027-.0341628l.453665-.0758686.447082-.0839505.433227-.0896618.412098-.0930025.383696-.0939728.34802-.0925724.305071-.0888015.254848-.0826602.197353-.0741482c.110786-.046068.178393-.084881.193123-.1132782.075334-.1437836.342864-.2729937.772162-.3890291l.276747-.0680514.314112-.0649565.350015-.0619288.384458-.0589682.41744-.0560748.684807-.0788337.493506-.0491347.79206-.0687384.84984-.0629831 1.214478-.0754167 1.296751-.0661249 1.019525-.0438192 1.774055-.0627038 2.224247-.0594956 2.291057-.0440264.99016-.0145499 2.477069-.0263828 1.957947-.0119975 1.910165-.0051283 2.721728.0027087 3.594993.0198972 4.743003.054812v-53.9886171l-3.71615-1.3204735-.588101 50.8117373-.564488.0228292-.927606.0251154-3.067844.0477809-3.883582.0497561-3.480825.0608956-1.809182.0426292-.912892.0251796c-.609594.0177232-1.220619.0373723-1.829688.0592595l-1.670145.0661913-1.869571.0909968-1.096141.0634357-.716996.0462582-1.051134.0756814-1.348236.1133765-.964718.0949828-.919325.1040253-.585186.0746022-.561297.0789636-.53592.083462-.509057.0880973-.480708.0928697-.450873.0977791c-1.306382.3008381-2.189931.6698015-2.470086 1.1235341-.611907.992257-7.826644.9870322-9.518061-.5290483l-.106623-.1057164c-.248042-.2739072-.88465-.5107264-1.812399-.7154203l-.44851-.0922111-.487727-.0877573-.524814-.083412-.559775-.0791751-.592606-.0750466-.623308-.0710266-.651883-.067115-.678328-.0633117-1.062422-.0880739-1.109951-.0801266-1.541453-.0951055-1.192916-.063006-1.625998-.0736063-2.065515-.0765106-2.071158-.0608726-2.446011-.0547904-3.468741-.0509412-3.949414-.0249683-3.862005.0095403-.523889-51.2681973-3.310492 1.4162486v54.0742034l6.387111-.1137516 4.574095-.0391642 1.420121-.0045179 1.451867-.0004351c.813534.0010052 1.637073.0041829 2.462798.0100033l2.199758.0220909 2.390806.0410703 1.940044.049489 1.129888.0370348 1.097614.0429419 1.059883.0491773.682931.0364111 1.301809.0819627.913942.069853.576543.0507419.548453.0541941.518748.0577433.487424.0613899.454485.0651338.419927.0689749.383754.0729133c.730255.1498297 1.233764.323873 1.452314.5256313l.048667.0510189c.750174.9069191 2.794191 1.2008859 4.775836 1.2961718l.563316.0221761.552892.0135106.794417.0087154z" fill="#f9a72b" mask="url(#b)"/><path d="m64.7035886 87.307553c6.5290026 0 8.8607892 2.6703715 8.8607892 8.9012382-.2664899 6.1037058-.2284199 12.2074128-.1468413 18.3111188l.0963646 6.866669c.0290624 2.28889.0504767 4.57778.0504767 6.86667v31.154333l-.0061309.560469c-.0041257.183941-.0103717.364997-.0188531.54315l-.0322656.525739c-.3593512 4.739178-2.4962479 7.271881-8.8035396 7.271881-15.8561492-.445062-31.245941-.445062-47.1020902 0-6.5290026 0-8.86078924-2.670372-8.86078924-8.901239v-63.1987908l.00613096-.5604681c.00412565-.1839416.01037166-.364997.01885309-.5431504l.03226559-.5257385c.35935121-4.7391787 2.4962479-7.2718812 8.8035396-7.2718812 15.8561492.4450619 31.245941.4450619 47.1020902 0zm-23.1458972 39.690621c-9.4279018 0-16.6110651 7.629444-16.6110651 16.60526 0 9.424607 7.632111 16.60526 16.6110651 16.60526 9.4279018 0 16.6110651-7.629444 16.6110651-16.60526s-7.632111-16.60526-16.6110651-16.60526zm0 12.15019c2.4613273 0 4.4566273 1.994603 4.4566273 4.45507s-1.9953 4.45507-4.4566273 4.45507c-2.4613272 0-4.4566272-1.994603-4.4566272-4.45507s1.9953-4.45507 4.4566272-4.45507zm-.4051479-42.9306715c-6.3527195 0-11.344142 4.9896785-11.344142 11.3401775s4.9914225 11.340177 11.344142 11.340177 11.344142-4.989678 11.344142-11.340177-5.4451882-11.3401775-11.344142-11.3401775z" fill="#00adef" mask="url(#b)"/><path d="m155.456725 173.978909c6.529002 0 8.860789 2.670372 8.860789 8.901239-.26649 6.103706-.22842 12.207412-.146841 18.311118l.096364 6.86667c.029063 2.28889.050477 4.577779.050477 6.866669v31.154334l-.006131.560468c-.121707 5.426278-2.088654 8.34077-8.854658 8.34077-15.856149-.445062-31.245941-.445062-47.10209 0-6.529003 0-8.8607897-2.670371-8.8607897-8.901238v-63.198791l.006131-.560468c.1217068-5.426279 2.0886547-8.340771 8.8546587-8.340771 15.856149.445062 31.245941.445062 47.10209 0zm-23.145897 39.690622c-9.427902 0-16.611066 7.629443-16.611066 16.605259 0 9.424607 7.632111 16.60526 16.611066 16.60526 9.427901 0 16.611065-7.629443 16.611065-16.60526 0-8.975816-7.632111-16.605259-16.611065-16.605259zm0 12.15019c2.461327 0 4.456627 1.994602 4.456627 4.455069 0 2.460468-1.9953 4.45507-4.456627 4.45507-2.461328 0-4.456628-1.994602-4.456628-4.45507 0-2.460467 1.9953-4.455069 4.456628-4.455069zm-.405148-42.930672c-6.35272 0-11.344142 4.989678-11.344142 11.340177 0 6.3505 4.991422 11.340178 11.344142 11.340178 6.352719 0 11.344142-4.989678 11.344142-11.340178 0-6.350499-5.445189-11.340177-11.344142-11.340177z" fill="#00adef" mask="url(#b)"/><path d="m76.3922457 254.20156c2.6910121 0 4.1133203-1.34856 4.1970497-3.976974l.0039259-.250162v-70.456031c-.0048728-2.573165-1.3800402-4.031583-3.8734941-4.117609l-.2370299-.004036h-70.57739562c-2.70601122 0-4.14569964 1.456767-4.14569964 4.17439-.00628136 23.489112-.00628136 46.974455 0 70.457287 0 2.637707 1.35375661 4.083911 3.91006489 4.169138l.24317239.003997zm-18.8440893-48.024331-33.2284107-.002512c-1.7361688 0-2.9497281-1.087552-2.9560095-2.808044-.0201003-4.486675-.0189836-8.972233-.0152613-13.457792l.0052112-6.728477.07412-.351633h39.376609v20.051894c-.0012563 2.274315-1.0150683 3.296564-3.2562587 3.296564zm-2.9399291-4.284026v-16.27937h-9.9182724v16.27937zm13.8946264 45.346016h-55.6867964l-.0309357-.517247c-.009579-.164357-.0168026-.322906-.0168026-.482397l-.0012563-24.413404c0-1.46807.3442187-2.835673 1.59421-3.705965.6030108-.42196 1.4271257-.740942 2.1494824-.740942 8.05522-.020721 16.1098119-.028256 24.1637757-.030297l24.1600068.002669c2.0703373 0 3.732386 1.609978 3.7449487 3.850385l.0088974 2.052071.0110909 3.997474.0038391 5.832642-.0137772 13.808401z" fill="#9ecc4f" mask="url(#b)"/><path d="m257.898518 254.20156c2.691012 0 4.11332-1.34856 4.19705-3.976974l.003926-.250162v-70.456031c-.004873-2.573165-1.380041-4.031583-3.873495-4.117609l-.237029-.004036h-70.577396c-2.706011 0-4.1457 1.456767-4.1457 4.17439-.006281 23.489112-.006281 46.974455 0 70.457287 0 2.637707 1.353757 4.083911 3.910065 4.169138l.243173.003997zm-18.844089-48.024331-33.228411-.002512c-1.736169 0-2.949728-1.087552-2.956009-2.808044-.020101-4.486675-.018984-8.972233-.015262-13.457792l.005211-6.728477.07412-.351633h39.376609v20.051894c-.001256 2.274315-1.015068 3.296564-3.256258 3.296564zm-2.939929-4.284026v-16.27937h-9.918273v16.27937zm13.894626 45.346016h-55.686796l-.030936-.517247c-.009579-.164357-.016803-.322906-.016803-.482397l-.001256-24.413404c0-1.46807.344219-2.835673 1.59421-3.705965.603011-.42196 1.427126-.740942 2.149482-.740942 8.05522-.020721 16.109812-.028256 24.163776-.030297l24.160007.002669c2.070337 0 3.732386 1.609978 3.744949 3.850385l.015472 4.066295.007279 3.9424v5.801579l-.012701 11.880314z" fill="#9ecc4f" mask="url(#b)"/><path d="m169.941919 1.5891547h-2.858597c.085161.22998007.136003.47266621.136003.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.122658 2.12953916h-3.917383c-1.170639 0-2.122657-.95422668-2.122657-2.12953916v-2.08506787c0-.25539223.050842-.50061959.13346-.72805844h-53.160491c.082618.22998007.134732.47266621.134732.72805844v2.08506787c0 1.17912431-.950748 2.12953916-2.123929 2.12953916h-3.914841c-1.1731811 0-2.1251993-.95422668-2.1251993-2.12953916v-2.08506787c0-.25539223.0521132-.50061959.1347316-.72805844h-3.4483649v80.0101913h3.4483649c-.0826184-.22998-.1347316-.4726662-.1347316-.729329v-2.0825267c0-1.1816655.9507471-2.1308097 2.1251993-2.1308097h3.914841c1.170639 0 2.123929.952956 2.123929 2.1308097v2.0825267c0 .2579334-.052114.5018902-.134732.729329h53.161762c-.083889-.22998-.134731-.4726662-.134731-.729329v-2.0825267c0-1.1816655.949476-2.1308097 2.122657-2.1308097h3.917383c1.170639 0 2.122658.952956 2.122658 2.1308097v2.0825267c0 .2579334-.050842.5018902-.134732.729329h2.857326zm-63.777591 68.3574446c0 1.1803949-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9542267-2.1251993-2.1308098v-2.0837973c0-1.1803949.9507471-2.1295391 2.1251993-2.1295391h3.914841c1.170639 0 2.123929.9529561 2.123929 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.123929 2.1308097h-3.914841c-1.1731811 0-2.1251993-.9542266-2.1251993-2.1308097v-2.0837973c0-1.1816655.9507471-2.1308098 2.1251993-2.1308098h3.914841c1.170639 0 2.123929.9542267 2.123929 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9529561-2.1251993-2.1308098v-2.0837972c0-1.1816656.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837973c0-1.1816655.9507471-2.1320803 2.1251993-2.1320803h3.914841c1.170639 0 2.123929.9554972 2.123929 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.123929 2.1308098h-3.914841c-1.1731811 0-2.1251993-.9554973-2.1251993-2.1308098v-2.0837972c0-1.1803949.9507471-2.1320804 2.1251993-2.1320804h3.914841c1.170639 0 2.123929.9554973 2.123929 2.1320804zm47.881811 57.3222134c0 1.805534-1.482047 3.2832513-3.292026 3.2832513h-36.880853c-1.809979 0-3.292026-1.4777173-3.292026-3.2832513v-22.9878416c0-1.8055341 1.482047-3.2819807 3.292026-3.2819807h36.880853c1.809979 0 3.292026 1.4764466 3.292026 3.2819807zm.113123-37.3482542c0 1.815699-1.490944 3.3010398-3.30982 3.3010398h-37.071511c-1.818876 0-3.308549-1.4853408-3.308549-3.3010398v-23.1060081c0-1.8144283 1.489673-3.29849859 3.308549-3.29849859h37.071511c1.818876 0 3.30982 1.48407029 3.30982 3.29849859zm13.060063 34.6469414c0 1.1803949-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1320804zm0-10.9246884c0 1.1803949-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9542267-2.122657-2.1308098v-2.0837973c0-1.1803949.949476-2.1295391 2.122657-2.1295391h3.917383c1.170639 0 2.122658.9529561 2.122658 2.1295391zm0-10.9234177c0 1.1816655-.950748 2.1308097-2.122658 2.1308097h-3.917383c-1.170639 0-2.122657-.9542266-2.122657-2.1308097v-2.0837973c0-1.1816655.949476-2.1308098 2.122657-2.1308098h3.917383c1.170639 0 2.122658.9542267 2.122658 2.1308098zm0-10.9246884c0 1.1816656-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9529561-2.122657-2.1308098v-2.0837972c0-1.1816656.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804zm0-10.9234177c0 1.1778537-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837973c0-1.1816655.949476-2.1320803 2.122657-2.1320803h3.917383c1.170639 0 2.122658.9554972 2.122658 2.1320803zm0-10.9246884c0 1.180395-.950748 2.1308098-2.122658 2.1308098h-3.917383c-1.170639 0-2.122657-.9554973-2.122657-2.1308098v-2.0837972c0-1.1803949.949476-2.1320804 2.122657-2.1320804h3.917383c1.170639 0 2.122658.9554973 2.122658 2.1320804z" fill="#f1644b" mask="url(#b)"/><g fill="#aa99c9" fill-rule="nonzero"><path d="m190.008055 118.856762.06738-.002313.202632-.017721.283463-.033433.551385-.075029 1.413532-.213695 4.114125-.676v-6.417866l-13.686253 1.919415.604476 6.757576.622534 6.83318.636344 6.874152.645903 6.880491.651215 6.852199.977487 10.14949c.108211 1.115526.216201 2.226266.323881 3.331499 2.244254-.219873 4.534679-.451595 6.861181-.69245l4.698114-.493084c.790039-.083943 1.583338-.168699 2.379525-.254168l4.808769-.520571 7.303803-.802397 12.265177-1.354553 4.885987-.533775 4.847589-.521939c5.626144-.600147 11.137253-1.166276 16.405082-1.663902-.057466-.377108-.110561-.8521-.159691-1.38768l-.070771-.844148-.065129-.907059-.087779-1.417357-.20156-3.779696c-.005977-.105888-.011809-.20624-.0175-.300471-.377122.045061-.863464.067592-1.404401.078857l-.845524.009857-1.772851.002817-.845389.009857c-.540816.011265-1.026978.033796-1.403858.078857v2.759279c-6.421305.606888-12.851014 1.281323-19.282875 1.975881l-12.864738 1.401893c-6.431951.70031-12.861886 1.389126-19.283552 2.019024l-2.678814-26.182008zm9.708286 24.890082h62.646972v-48.3391642h-62.646972zm5.78815-42.762121h51.250918v19.671611l-6.451306-10.9748-8.682708 20.570918-7.416158-8.816655-20.319735 16.672644h-8.381011zm19.716341 12.355397c0 3.477383-2.774072 6.236662-6.331784 6.236662-3.436263 0-6.390581-2.759279-6.390581-6.236662 0-3.418898 2.954318-6.23762 6.390581-6.23762 3.478652 0 6.208105 2.694837 6.327696 6.010607z" mask="url(#b)"/><path d="m8.50178283 37.8554944.06738008-.0023133.20263199-.0177206.28346326-.0334334.76303076-.1056252 1.46084558-.2239078 3.8551654-.6351912v-6.4178655l-13.68625347 1.9194154.29971525 3.3671728.61403634 6.799707.62997002 6.8579949.6416547 6.8816506.64909042 6.8706739.65227715 6.8250649.97509621 10.076322c1.49616923-.146582 3.0128591-.29843 4.54707848-.4547395l4.6522556-.4815092 4.739486-.5034529 4.8087696-.520571 19.5689796-2.1569499 4.8859864-.5337752 4.8475896-.5219388c5.6261437-.6001474 11.1372525-1.1662761 16.4050819-1.6639024-.0574661-.3771079-.1105608-.8520995-.1596905-1.3876792l-.0707716-.8441486-.0651287-.9070589-.0597907-.9419975-.0547573-.9489644-.1747909-3.3060911c-.0059777-.1058884-.0118091-.2062396-.0175006-.300471-.4714018.0563265-1.1134607.077449-1.8194867.0853699l-.8711072.0045765-1.3321818.0015842-.8453886.0098572c-.5408168.0112653-1.0269781.0337959-1.4038585.0788571v2.7592795c-6.421305.6068881-12.8510139 1.281323-19.2828747 1.9758805l-12.864738 1.4018932c-6.4319511.70031-12.861886 1.3891261-19.2835524 2.0190242l-2.86056387-27.9915709zm9.70828547 24.8900819h62.6469723v-48.3391642h-62.6469723zm5.7881507-42.7621214h51.250918v19.6716113l-6.4513061-10.9747995-8.682708 20.5709179-7.4161585-8.8166555-20.3197345 16.6726445h-8.3810109zm19.7163403 12.3553979c0 3.4773825-2.7740713 6.236662-6.3317839 6.236662-3.4362627 0-6.3905811-2.7592795-6.3905811-6.236662 0-3.4188988 2.9543184-6.2376208 6.3905811-6.2376208 3.4786523 0 6.2081048 2.6948374 6.327696 6.0106077z" mask="url(#b)"/></g></g></g></g></svg>
`,go=E`
  <svg viewBox="0 0 787 400" xmlns="http://www.w3.org/2000/svg"><g fill="#999" fill-rule="evenodd"><path d="m392.387152 0c90.212937 0 163.325255 73.1823935 163.325255 163.414428 0 34.161159-10.533846 65.858529-28.422252 92.099564l96.093209 96.172128c5.880272 5.034454 9.616636 12.49332 9.616636 20.857826 0 15.159612-12.300741 27.456054-27.47128 27.456054-7.270154 0-13.876316-2.846294-18.788734-7.464492l-97.84885-97.516523c-27.037997 19.929684-60.361413 31.804247-96.503984 31.804247-90.274834 0-163.387152-73.126143-163.387152-163.408804 0-90.2320345 73.112318-163.414428 163.387152-163.414428zm.132028 36c-70.323133 0-127.51918 57.1785661-127.51918 127.511499 0 70.294604 57.196047 127.488501 127.51918 127.488501 70.246413 0 127.48082-57.193897 127.48082-127.488501 0-70.3329329-57.234407-127.511499-127.48082-127.511499z"/><path d="m378.080616 218.418605v24.781395h24.697248v-24.781395zm-36.267131-84.83721h18.912307c0-5.209302.593328-10.046511 1.779982-14.511628 1.186655-4.465116 3.077886-8.334883 5.673692-11.609302 2.595807-3.274418 5.822025-5.87907 9.678652-7.8139534 3.856627-1.9348837 8.454914-2.9023256 13.79486-2.9023256 8.009918 0 14.351104 2.3069768 19.023556 6.92093 4.672453 4.613954 7.305342 11.013954 7.89867 19.2.296663 5.506977-.37083 10.195349-2.00248 14.065117-1.63165 3.869767-3.819544 7.404651-6.563683 10.604651s-5.710775 6.251163-8.89991 9.153488c-3.189134 2.902326-6.229936 6.065116-9.122407 9.488372-2.89247 3.423256-5.339945 7.330233-7.342425 11.72093-2.00248 4.390698-3.152051 9.711628-3.448715 15.962791v10.493023h18.912308v-8.706976c0-3.869768.556244-7.330233 1.668733-10.381396 1.112488-3.051163 2.595807-5.879069 4.449954-8.483721 1.854148-2.604651 3.930794-5.060465 6.229937-7.367442 2.299143-2.306976 4.635369-4.576744 7.008679-6.809302 2.373309-2.381395 4.709535-4.837209 7.008678-7.367442 2.299144-2.530232 4.338706-5.283721 6.118688-8.260465s3.226217-6.288372 4.338706-9.934884c1.112489-3.646511 1.668733-7.776744 1.668733-12.390697 0-7.144186-1.149572-13.469768-3.448715-18.976744-2.299143-5.506977-5.52536-10.1581399-9.678651-13.9534888-4.153292-3.7953488-9.085325-6.6976744-14.7961-8.7069767s-12.051961-3.0139535-19.023556-3.0139535c-7.713255 0-14.684851 1.3395349-20.914788 4.0186047-6.229936 2.6790697-11.495716 6.4372093-15.797339 11.2744186-4.301623 4.8372097-7.602006 10.5302327-9.901149 17.0790697s-3.374549 13.618605-3.226217 21.209302z" fill-rule="nonzero"/></g></svg>
`;function V(e,t,n,r){var i=arguments.length,a=i<3?t:r===null?r=Object.getOwnPropertyDescriptor(t,n):r,o;if(typeof Reflect==`object`&&typeof Reflect.decorate==`function`)a=Reflect.decorate(e,t,n,r);else for(var s=e.length-1;s>=0;s--)(o=e[s])&&(a=(i<3?o(a):i>3?o(t,n,a):o(t,n))||a);return i>3&&a&&Object.defineProperty(t,n,a),a}var _o,vo=class extends O{static{_o=this}constructor(...e){super(...e),this.placeholderType=null,this.detailMessage=``}static{this.MESSAGE_EMPTY_QUERY=N(`To begin searching, enter a search term in the box above and hit "Go".`)}static{this.MESSAGE_NO_SEARCH_RESULTS=N(`Your search did not match any items in the Archive. Try different keywords or a more general search.`)}static{this.MESSAGE_NO_COLLECTION_RESULTS=N(`Your search did not match any items in this collection. Try different keywords or a more general search.`)}static{this.MESSAGE_NO_VIEWABLE_MEMBERS=N(`This collection contains no viewable items.`)}static{this.MESSAGE_QUERY_ERROR=N(T`The search engine encountered an error, which might be related to your
      search query.
      <a
        href="https://help.archive.org/help/search-building-powerful-complex-queries/"
      >
        Tips for constructing search queries.
      </a> `)}static{this.MESSAGE_COLLECTION_ERROR=N(T`The search engine encountered an error while loading this collection.
      If the problem persists, please let us know at
      <a href="mailto:info@archive.org">info@archive.org</a>.`)}static{this.QUERY_ERROR_DETAILS_MESSAGE=N(`Error details:`)}render(){return this.placeholderType?T`${this.placeholderTemplate}`:D}get placeholderTemplate(){return T`
      <div
        class="placeholder ${this.placeholderType} ${this.isMobileView?`mobile`:`desktop`}"
      >
        ${mo(this.placeholderType,[[`empty-query`,()=>this.emptyQueryTemplate],[`empty-collection`,()=>this.emptyCollectionTemplate],[`no-results`,()=>this.noResultsTemplate],[`query-error`,()=>this.queryErrorTemplate],[`collection-error`,()=>this.collectionErrorTemplate]])}
      </div>
    `}get emptyQueryTemplate(){return T`
      <h2 class="title" data-testid="empty-query-text-msg">
        ${_o.MESSAGE_EMPTY_QUERY}
      </h2>
      <div>${ho}</div>
    `}get emptyCollectionTemplate(){return T`
      <h2 class="title" data-testid="empty-collection-text-msg">
        ${_o.MESSAGE_NO_VIEWABLE_MEMBERS}
      </h2>
      <div>${go}</div>
    `}get noResultsTemplate(){return T`
      <h2 class="title" data-testid="empty-results-text-msg">
        ${this.isCollection?_o.MESSAGE_NO_COLLECTION_RESULTS:_o.MESSAGE_NO_SEARCH_RESULTS}
      </h2>
      <div>${go}</div>
    `}get queryErrorTemplate(){return T`
      <h2 class="title" data-testid="error-query-text-msg">
        ${_o.MESSAGE_QUERY_ERROR}
      </h2>
      <div>${go}</div>
      <p class="error-details">
        ${_o.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}get collectionErrorTemplate(){return T`
      <h2 class="title" data-testid="error-collection-text-msg">
        ${_o.MESSAGE_COLLECTION_ERROR}
      </h2>
      <div>${go}</div>
      <p class="error-details">
        ${_o.QUERY_ERROR_DETAILS_MESSAGE} ${this.detailMessage}
      </p>
    `}static get styles(){return w`
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
    `}};V([A({type:String})],vo.prototype,`placeholderType`,void 0),V([A({type:Boolean})],vo.prototype,`isMobileView`,void 0),V([A({type:Boolean})],vo.prototype,`isCollection`,void 0),V([A({type:String})],vo.prototype,`detailMessage`,void 0),vo=_o=V([k(`empty-placeholder`)],vo);var yo=E`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`,bo=function(e){return e[e.bytes=0]=`bytes`,e[e.kilobytes=1]=`kilobytes`,e[e.megabytes=2]=`megabytes`,e[e.gigabytes=3]=`gigabytes`,e[e.terabytes=4]=`terabytes`,e[e.petabytes=5]=`petabytes`,e[e.exabytes=6]=`exabytes`,e[e.zettabytes=7]=`zettabytes`,e[e.yottabytes=8]=`yottabytes`,e}(bo||{});function xo(e,t,n=` `){let r=e;if(r===void 0)return D;let i=0;for(;r>1024;)r/=1024,i+=1;let a=10**t;r=Math.round(r*a)/a;let o=bo[i];return o=r===1?o.slice(0,-1):o,`${r.toLocaleString()+n+o}`}var So=w`
  /* Include .sr-only styles for all tiles */
  ${Ha}

  .container {
    background-color: ${w`var(--tileBackgroundColor, #ffffff)`};
    border: 1px #2c2c2c;
    border-radius: ${w`var(--tileCornerRadius, 4px)`};
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
`;function Co(e,t=`short`,{locale:n=`en-US`,useLocalTime:r=!1}={}){if(!e)return``;let i=r?{}:{timeZone:`UTC`};switch(t){case`year-only`:return`${e.getUTCFullYear()}`;case`short`:i.month=`short`,i.year=`numeric`;break;case`long`:i.year=`numeric`,i.month=`short`,i.day=`2-digit`;break;default:break}return new Intl.DateTimeFormat(n,i).format(e)}var wo=class{constructor(e={}){this.model=e.model,this.baseNavigationUrl=e.baseNavigationUrl,this.collectionPagePath=e.collectionPagePath??`/details/`,this.sortParam=e.sortParam,this.creatorFilter=e.creatorFilter}get firstCreatorMatchingFilter(){let e;if(this.creatorFilter&&this.model?.creators.length){let t=this.creatorFilter;e=this.model.creators.find(e=>e.normalize(`NFD`).replace(/[^A-Z]+/gi,``).toUpperCase().startsWith(t))}return e??this.model?.creator}get accountLabel(){return this.model?.dateAdded?N(or`Archivist since ${this.model.dateAdded.getFullYear()}`):``}get dateLabel(){switch(this.sortParam?.field){case`publicdate`:return N(`Archived`);case`reviewdate`:return N(`Reviewed`);case`addeddate`:return N(`Added`);case`date`:return N(`Published`);default:return``}}get viewsLabel(){return this.sortParam?.field===`week`?N(`Weekly views`):N(`All-time views`)}itemPageUrl(e,t=!1){if(!e||this.baseNavigationUrl==null)return D;let n=t?this.collectionPagePath:`/details/`;return`${this.baseNavigationUrl}${n}${e}`}webArchivesCaptureLink(e,t){return T` <a href=${`https://web.archive.org/web/${t.toISOString().replace(/[TZ:-]/g,``).replace(/\..*/,``)}/${encodeURIComponent(e)}`}> ${Co(t,`long`)} </a> `}},To=class extends O{constructor(...e){super(...e),this.sortParam=null,this.defaultSortParam=null,this.loggedIn=!1,this.suppressBlurring=!1,this.useLocalTime=!1,this.displayValueProvider=new wo}willUpdate(e){(e.has(`model`)||e.has(`baseNavigationUrl`)||e.has(`collectionPagePath`)||e.has(`sortParam`)||e.has(`defaultSortParam`)||e.has(`creatorFilter`))&&(this.displayValueProvider=new wo({model:this.model,baseNavigationUrl:this.baseNavigationUrl,collectionPagePath:this.collectionPagePath,sortParam:this.sortParam??this.defaultSortParam??void 0,creatorFilter:this.creatorFilter}))}getFormattedDate(e,t){let{useLocalTime:n}=this;return Co(e,t,{useLocalTime:n})}};V([A({type:Object})],To.prototype,`model`,void 0),V([A({type:Number})],To.prototype,`currentWidth`,void 0),V([A({type:Number})],To.prototype,`currentHeight`,void 0),V([A({type:String})],To.prototype,`baseNavigationUrl`,void 0),V([A({type:String})],To.prototype,`baseImageUrl`,void 0),V([A({type:String})],To.prototype,`collectionPagePath`,void 0),V([A({type:Object})],To.prototype,`sortParam`,void 0),V([A({type:Object})],To.prototype,`defaultSortParam`,void 0),V([A({type:String})],To.prototype,`creatorFilter`,void 0),V([A({type:Number})],To.prototype,`mobileBreakpoint`,void 0),V([A({type:Boolean})],To.prototype,`loggedIn`,void 0),V([A({type:Boolean})],To.prototype,`suppressBlurring`,void 0),V([A({type:Boolean})],To.prototype,`useLocalTime`,void 0);var Eo=class extends O{render(){return T`<div class="icon-overlay">${this.iconTemplate}</div>`}get iconTemplate(){return this.type?T`${Yi[this.type]??D}`:D}static get styles(){return w`
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
    `}};V([A({type:String})],Eo.prototype,`type`,void 0),Eo=V([k(`icon-overlay`)],Eo);var Do=class extends O{render(){return T`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconTemplate}</div>
        <p class="text-overlay">${this.textTemplate}</p>
      </div>
    `}get iconTemplate(){return this.type?T`${Yi[this.type]??D}`:D}get textTemplate(){return this.type?T`${Ji[this.type]??D}`:D}static get styles(){return w`
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
    `}};V([A({type:String})],Do.prototype,`type`,void 0),Do=V([k(`text-overlay`)],Do);var Oo=class extends O{constructor(...e){super(...e),this.isCompactTile=!1,this.isListTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.viewSize=`desktop`}render(){return this.model?.identifier?T`
      <div class=${ar(this.baseClass)}>
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
    `:D}get baseClass(){return{container:!0,list:this.isListTile&&!this.isCompactTile,"list-compact":this.isListTile&&this.isCompactTile,collection:this.model?.mediatype===`collection`,[this.viewSize]:!0,"search-image":this.model?.mediatype===`search`}}get iconOverlayTemplate(){if(!this.isListTile)return D;let{overlayType:e}=this;return e?T`
      <icon-overlay
        class=${this.isCompactTile?`list-compact`:`list-detail`}
        .type=${this.overlayType}
      >
      </icon-overlay>
    `:D}get textOverlayTemplate(){if(this.isListTile)return D;let{overlayType:e}=this;return e?T` <text-overlay .type=${this.overlayType}></text-overlay> `:D}get overlayType(){if(!this.suppressBlurring){if(this.model?.loginRequired&&!this.loggedIn)return`login-required`;if(this.model?.contentWarning)return`content-warning`}}static get styles(){return w`
      div {
        display: flex;
        justify-content: center;
        position: relative;
        background-color: ${w`var(--imageBlockBackgroundColor, #f1f1f4)`};
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
    `}};V([A({type:String})],Oo.prototype,`baseImageUrl`,void 0),V([A({type:Boolean})],Oo.prototype,`isCompactTile`,void 0),V([A({type:Boolean})],Oo.prototype,`isListTile`,void 0),V([A({type:Boolean})],Oo.prototype,`loggedIn`,void 0),V([A({type:Boolean})],Oo.prototype,`suppressBlurring`,void 0),V([A({type:Object})],Oo.prototype,`model`,void 0),V([A({type:String})],Oo.prototype,`viewSize`,void 0),Oo=V([k(`image-block`)],Oo);var ko=class extends To{constructor(...e){super(...e),this.showInfoButton=!1,this.layoutType=`default`}render(){return T`
      <div class=${ar({container:!0,minimal:this.layoutType===`minimal`})}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `}get getImageBlockTemplate(){return T`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${`grid`}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return T`<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
    </div>`}get getTileStatsTemplate(){return T`
      <div id="item-stats">
        <div id="item-mediatype">${yo}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `}get getItemsTemplate(){let e=this.model?.itemCount?.toLocaleString();return T`<span id="item-count"
      >${e} item${Number(e)===1?``:`s`}</span
    >`}get getSizeTemplate(){let e=this.model?.collectionSize??0;return e?T`<span id="item-size">${xo(e,1)}</span>`:``}get infoButtonTemplate(){return this.showInfoButton?T`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${N(`More info`)}</span>
        </button>`:D}infoButtonPressed(e){e.preventDefault();let t=new CustomEvent(`infoButtonPressed`,{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){let e=w`var(--tileBorderColor, #555555)`,t=w`var(--tileBackgroundColor, #666666)`,n=w`#fff`;return[So,w`
        .container {
          background-color: ${t};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${n};
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
          color: ${n};
          flex-direction: column;
          margin-left: 10px;
        }

        .minimal #item-stats {
          display: none;
        }

        .minimal .truncated {
          -webkit-line-clamp: initial;
        }

        .minimal .item-info {
          padding-bottom: 5px;
        }
      `]}};V([A({type:Boolean})],ko.prototype,`showInfoButton`,void 0),V([A({type:String})],ko.prototype,`layoutType`,void 0),ko=V([k(`collection-tile`)],ko);function*Ao(e,t){if(e!==void 0){let n=0;for(let r of e)yield t(r,n++)}}function jo(e){return e?e.toISOString().endsWith(`-01-01T00:00:00.000Z`):!1}var Mo=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
  </svg>
`,No=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m69.0481858 61.4006179 13.2757509 38.38311-32.1794134-24.4730516-32.2508245 24.6893237 13.2757507-38.4552008-31.1694495-21.9945074 38.1677832-.5115002 11.8339172-39.0387916 11.6162817 38.8946104 38.3820179.6556814zm-2.8122554 15.58874-6.7092871-19.2276004 18.0365221-11.7267421-21.6445066.5115-5.9169584-19.5914862-5.9169587 19.5914862-21.6445064-.5115 18.036522 11.7267421-6.5664638 19.3752146 16.0880061-12.3824233z"
    />
  </svg>
`,Po=class extends O{constructor(...e){super(...e),this.title=``,this.body=``,this.starRating=0,this.viewSize=`desktop`}render(){return!this.title&&!this.body&&!this.starRating?D:T`
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.title}</p>
          <p class="review-body">${this.body}</p>
        </div>
      </div>
    `}get starsTemplate(){if(this.starRating<=0)return D;let e=Math.min(5,this.starRating),t=Math.min(5,5-this.starRating);return T`
      <div class="star-rating">
        <span class="sr-only">${this.starRating} ${N(`out of 5 stars`)}</span>
        ${Array(e).fill(this.filledStarTemplate)}
        ${Array(t).fill(this.unfilledStarTemplate)}
      </div>
    `}get filledStarTemplate(){return T`<span aria-hidden="true">${Mo}</span>`}get unfilledStarTemplate(){return T`
      <span class="unfilled-star" aria-hidden="true">
        ${No}
      </span>
    `}static get styles(){return[Ha,w`
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
      `]}};V([A({type:String})],Po.prototype,`title`,void 0),V([A({type:String})],Po.prototype,`body`,void 0),V([A({type:Number})],Po.prototype,`starRating`,void 0),V([A({type:String})],Po.prototype,`viewSize`,void 0),Po=V([k(`review-block`)],Po);function*Fo(e,t){let n=typeof t==`function`;if(e!==void 0){let r=-1;for(let i of e)r>-1&&(yield n?t(r):t),r++,yield i}}var Io=class extends O{constructor(...e){super(...e),this.snippets=[],this.viewSize=`desktop`}render(){return this.snippets?.length?T`
      <div class="container">
        <div class="snippet-view ${this.viewSize}">
          ${this.ellipsisJoinedSnippets}
        </div>
      </div>
    `:T`${D}`}get ellipsisJoinedSnippets(){return T`
      &hellip; ${Fo(this.snippetTemplates,T` &hellip; `)} &hellip;
    `}get snippetTemplates(){return this.snippets?.map(e=>{let t=e.matchAll(/{{{(.+?)}}}/gs),n=[],r=0;for(let i of t)i.index!=null&&(n.push(T`
            ${e.slice(r,i.index)}
            <mark>${i[1]}</mark>
          `),r=i.index+i[0].length);return n.push(T`${e.slice(r)}`),T`<span>${n}</span>`})}static get styles(){return w`
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
    `}};V([A({type:Array})],Io.prototype,`snippets`,void 0),V([A({type:String})],Io.prototype,`viewSize`,void 0),Io=V([k(`text-snippet-block`)],Io);var Lo=w`
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
`,Ro=w`
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
`,zo=E`
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
`,Bo=class extends O{constructor(...e){super(...e),this.isListTile=!1,this.isCompactTile=!1,this.loggedIn=!1,this.suppressBlurring=!1,this.isWaveform=!1,this.isNotFound=!1}render(){return T`
      <div class=${ar(this.itemBaseClass)}>${this.imageTemplate}</div>
    `}get imageTemplate(){return this.model?.mediatype===`search`?T`${zo}`:T`
      <img
        class=${ar(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `}get imageSrc(){if(this.isNotFound)return this.notFoundSrc;if(this.model?.captureDates&&this.model.identifier)try{let e=new URL(this.model.identifier),t=encodeURIComponent(e.hostname);return this.baseImageUrl?`https://web.archive.org/thumb/${t}?generate=1`:D}catch{return`${this.baseImageUrl}/images/notfound.png`}return this.model?.thumbnailUrl?this.model.thumbnailUrl:this.baseImageUrl&&this.model?.identifier?`${this.baseImageUrl}/services/img/${this.model.identifier}`:D}get notFoundSrc(){return this.baseImageUrl?`${this.baseImageUrl}/images/notfound.png`:D}get hashBasedGradient(){return this.model?.identifier?`waveform-grad${this.hashStrToInt(this.model.identifier)%6}`:`waveform-grad0`}hashStrToInt(e){return e.split(``).reduce((e,t)=>e+t.charCodeAt(0),0)}get itemBaseClass(){return{"drop-shadow":!0,"list-box":this.isListTile,"search-image":this.model?.mediatype===`search`,[this.hashBasedGradient]:this.isWaveform}}get itemImageClass(){let e=!!(this.model?.contentWarning||this.model?.loginRequired)&&!this.suppressBlurring;return{contain:!this.isCompactTile&&!this.isWaveform,cover:this.isCompactTile,blur:e,waveform:this.isWaveform,"account-image":this.isAccountImage,"collection-image":this.model?.mediatype===`collection`}}get isAccountImage(){return this.model?.mediatype===`account`&&!this.isCompactTile&&!this.isListTile}onLoad(){(this.model?.mediatype===`audio`||this.model?.mediatype===`etree`)&&this.baseImage.naturalWidth/this.baseImage.naturalHeight===4&&(this.isWaveform=!0)}onError(){this.isNotFound=!0}static get styles(){return[Lo,Ro,w`
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
      `]}};V([A({type:Object})],Bo.prototype,`model`,void 0),V([A({type:String})],Bo.prototype,`baseImageUrl`,void 0),V([A({type:Boolean})],Bo.prototype,`isListTile`,void 0),V([A({type:Boolean})],Bo.prototype,`isCompactTile`,void 0),V([A({type:Boolean})],Bo.prototype,`loggedIn`,void 0),V([A({type:Boolean})],Bo.prototype,`suppressBlurring`,void 0),V([j()],Bo.prototype,`isWaveform`,void 0),V([j()],Bo.prototype,`isNotFound`,void 0),V([M(`img`)],Bo.prototype,`baseImage`,void 0),Bo=V([k(`item-image`)],Bo);var Vo=E`
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
`,Ho=E`
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
`,Uo=E`
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
`,Wo=E`
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
`,Go=E`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`,Ko=E`
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
`,qo=E`
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
`,Jo=E`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Yo=E`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Xo=E`
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
`,Zo=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m38.4615385 55.5197275-4.8171501 7.0895871c4.1025641 2.9421734 8.9186633 4.7253407 14.4482976 5.3495018v13.0411836h5.6179067v-12.9749847c3.8356452-.357264 6.8905002-1.5278287 9.1645649-3.5116942 2.2740648-1.9838655 3.4110971-4.5582672 3.4110971-7.7232052v-.0661989c0-3.2553047-1.025641-5.7635075-3.076923-7.5246085-2.0512821-1.7611009-5.3068517-3.1544302-9.7667087-4.1799878v-6.2195444c2.6754939.6682937 5.083018 1.7379839 7.2225725 3.2090706l4.4136191-7.1557861c-3.2114333-2.2738797-6.9798234-3.6787675-11.3051702-4.2146634v-11.6383974h-5.5517024v11.5028473c-4.0584279.3131313-7.2026061 1.4721374-9.4325347 3.4770185-2.2299285 2.004881-3.3448928 4.5908413-3.3448928 7.7578808v.1323978c0 3.2111721 1.0372005 5.6857501 3.1116015 7.423734 2.074401 1.7379838 5.3625473 3.1197546 9.8644389 4.1453122v6.4212934c-3.1651955-.4896617-6.4869694-1.9386821-9.9653216-4.3470612zm-24.4136192-32.7716087c-4.32534679 3.7008338-7.74800337 8.0142702-10.26796974 12.9403091s-3.77994956 10.1536506-3.77994956 15.6828351c0 4.9050234 1.02564103 9.6093485 3.07692308 14.1129754 2.05128205 4.5036268 4.88335435 8.5606738 8.49621692 12.1711409.357293.3572639 1.1149642.6252118 2.2730138.8038438s2.2057588-.0220663 3.1431274-.6020948c.5800757-.4896617.8701135-1.1138228.8701135-1.8724832s-.1229508-1.3828215-.3688525-1.8724832c-.2459016-.4896617-.5023119-.8689919-.7692307-1.1379907-6.5111392-6.3761101-9.76670873-13.5770795-9.76670873-21.6029082 0-4.6822589 1.1034048-9.0850112 3.31021443-13.2082571 2.2068095-4.1232459 5.2059688-7.6570063 8.9974779-10.6012813.0882724-.0882652.1775956-.1880889.2679697-.2994712s.2574611-.3562131.5012611-.7344926c.2437999-.3782794.4224464-.7460511.5359394-1.103315.1134931-.3572639.1250526-.770219.0346785-1.2388652s-.3131568-.8816012-.6683481-1.2388651c-.668348-.6682937-1.4932745-1.0245068-2.4747793-1.0686394s-1.8064313.0893159-2.4747793.4003457zm71.9041614 0c4.3253468 3.7008338 7.7480034 8.0142702 10.2679697 12.9403091 2.5199664 4.9260389 3.7799496 10.1536506 3.7799496 15.6828351 0 4.8608908-1.025641 9.5536573-3.0769231 14.0782997-2.051282 4.5246424-4.8602354 8.593248-8.42686 12.2058166-.4014292.3572639-1.1822194.6252118-2.3423707.8038438-1.1601514.178632-2.1857924-.0220663-3.0769231-.6020948-.5800757-.4896617-.8806221-1.1138228-.9016394-1.8724832-.0210172-.7586604.0903741-1.3828215.3341741-1.8724832.2437999-.4896617.5002101-.8689919.7692307-1.1379907 6.4649012-6.3319775 9.6973519-13.5329469 9.6973519-21.6029082 0-4.6822589-1.1034048-9.0850112-3.3102144-13.2082571s-5.18285-7.6570063-8.9281211-10.6012813c-.0882724-.0882652-.1775956-.1880889-.2679697-.2994712s-.2574611-.3562131-.5012611-.7344926c-.2437999-.3782794-.4224464-.7460511-.5359394-1.103315-.1134931-.3572639-.1250526-.770219-.0346785-1.2388652s.3131568-.8816012.6683481-1.2388651c.668348-.6682937 1.4932745-1.0245068 2.4747793-1.0686394s1.7843632.0893159 2.408575.4003457zm-62.2730139 8.0920276c-3.1210592 2.4525117-5.6179066 5.4840011-7.4905422 9.0944682s-2.8089534 7.4447495-2.8089534 11.5028473c0 6.2878449 2.2068096 11.9725442 6.6204288 17.054098.1786465.3131313.858554.469697 2.0397226.469697 1.1811685 0 2.1290458-.2900143 2.8436318-.8700427.5359394-.4896618.8259773-1.1253814.8701134-1.9071589.0441362-.7817775-.045187-1.2167988-.2679697-1.305064-1.6939891-1.7842181-3.1094998-3.9582741-4.2465321-6.522168-1.1370324-2.563894-1.7055486-5.0720968-1.7055486-7.5246085 0-3.34357.7471627-6.3424853 2.241488-8.996746 1.4943254-2.6542607 3.5571669-4.7390008 6.1885246-6.2542201.0441362-.0441326.1113914-.12189.2017655-.2332723s.2238335-.3341468.4003783-.6682937c.1765447-.3341468.2994956-.6577859.3688524-.9709172.0693569-.3131313.0472888-.7029693-.0662043-1.1695139-.113493-.4665447-.3478352-.901566-.7030264-1.3050641-.4897016-.5358959-1.102354-.8364179-1.8379572-.901566s-1.3482555-.009457-1.8379571.1670734zm52.5063052 0c3.1651955 2.4966443 5.6956705 5.5396923 7.591425 9.1291438 1.8957545 3.5894516 2.8436318 7.4132262 2.8436318 11.471324 0 6.2416107-2.2519967 11.9263101-6.75599 17.054098-.1345103.3131313-.7923497.469697-1.9735182.469697-1.1811686 0-2.1290459-.2900142-2.8436318-.8700427-.5359395-.4896617-.8259773-1.1253813-.8701135-1.9071589-.0441362-.7817775.045187-1.2167988.2679697-1.305064 1.6498529-1.8283506 3.0432955-4.0244729 4.1803279-6.5883669s1.7055485-5.0500305 1.7055485-7.4584096c0-3.3435699-.7356032-6.3309267-2.2068095-8.9620704-1.4712064-2.6311436-3.5004204-4.7263914-6.0876419-6.2857433l-.2332913-.2332723s-.1450189-.2227646-.4350568-.6682937c-.2900378-.4455291-.4129886-.7691682-.3688524-.9709172.0441362-.2017491.0662043-.591587.0662043-1.169514 0-.5779269.2343421-1.0129482.7030265-1.305064.4897015-.5358959 1.1023539-.8364179 1.8379571-.901566.7356032-.0651482 1.3482555-.009457 1.8379571.1670734zm-31.3682219 10.2324588v-.0661989c0-1.605586 1.2263556-2.497695 3.6790668-2.676327v5.7529998c-1.4270702-.4013965-2.3970156-.8248593-2.9098361-1.2703884-.5128205-.4455292-.7692307-1.0255576-.7692307-1.7400855zm12.1721311 16.3196055v.0661989c0 1.5614535-1.2042875 2.4756288-3.6128625 2.7425259v-5.8853976c1.382934.4013965 2.3308112.8248594 2.8436317 1.2703885.5128206.4455291.7692308 1.0476239.7692308 1.8062843z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,Qo=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m53.8329111 72.530691-28.3707393-20.2314977c-1.2950216-.9306676-2.0122823-2.1279084-2.1517819-3.5917222-.1394997-1.4638139.1499621-2.9054133.8683852-4.3247984.7184232-1.419385 1.5275211-2.780311 2.4272938-4.0827779.8997726-1.302467 1.7204955-2.3488835 2.4621686-3.1392494l1.178772-1.1855489 20.6040968 16.1873027 36.4861309-43.88284817 3.885065-3.27955103c2.311044 1.53396469 4.1722017 3.06909856 5.5834731 4.60540161 1.4112713 1.53630309 2.2901191 2.86215359 2.6365432 3.97755169.3464241 1.1153982.5312611 2.1150474.5545111 2.9989478.0232494.8839004-.0813748 1.5351339-.3138742 1.9537004l-.4150115.6980007zm15.0520112 11.0943528v-5.022799c-.0464999-.1403016-.0813748-.2911259-.1046247-.4524728-.02325-.1613469-.0464999-.486379-.0697498-.9750964-.02325-.4887175.0116249-.8020578.1046247-.9400211.0464999-.1870689.2197119-.4898866.5196361-.9084532.2999243-.4185666.589386-.7903659.8683853-1.1153981l.4150114-.4875482 9.5731628-11.1645037v32.4412487h-80.1913681v-80.6524027h68.1874241l-7.1458691 8.5829534c-1.0183473 1.5807319-1.8041953 2.5113995-2.3575439 2.7920028h-47.3775653v57.9059979h57.574989z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,$o=E`
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
`,es=E`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`,ts=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`,ns={account:{color:`#000000`,icon:Vo,text:`Account`},audio:{color:`#00adef`,icon:Ho,text:`Audio`},collection:{color:`#4666ff`,icon:yo,text:`Collection`},data:{color:`#333333`,icon:Uo,text:`Data`},etree:{color:`#00adef`,icon:Wo,text:`E-tree`},film:{color:`#bf1b2c`,icon:Ko,text:`Film`},image:{color:`#aa99c9`,icon:Go,text:`Image`},movies:{color:`#f1644b`,icon:Ko,text:`Movie`},none:{color:`#00000000`,icon:T``,text:``},radio:{color:`#8fdaef`,icon:qo,text:`Radio`},software:{color:`#9ecc4f`,icon:Jo,text:`Software`},texts:{color:`#faab3c`,icon:Yo,text:`Text`},tv:{color:`#f1644b`,icon:Xo,text:`TV`},tvCommercial:{color:`#84b648`,icon:Zo,text:`TV Political Ad`},tvFactCheck:{color:`#f1644b`,icon:Qo,text:`TV Fact Check`},tvQuote:{color:`#fe7a5f`,icon:ts,text:`TV Quote`},video:{color:`#f1644b`,icon:$o,text:`Video`},web:{color:`#ffcd27`,icon:es,text:`Web`},search:{color:`#000000`,icon:zo,text:`Search`}},rs=`tv_ads`,is=`factchecked`,as=new Set([`tvnews`,`tvarchive`,`television`]),os=new Set([`radio`,`radioprogram`]),ss=class extends O{constructor(...e){super(...e),this.showText=!1}get displayMediatype(){return this.isTvItem?this.tvDisplayMediatype:this.isRadioItem?`radio`:this.model?.mediatype??`none`}get tvDisplayMediatype(){return this.isTvCommercial?`tvCommercial`:this.model?.isTvSearchResult&&this.isTvFactCheck?`tvFactCheck`:this.model?.isTvSearchResult&&this.isTvQuote?`tvQuote`:`tv`}get isTvItem(){return!!(this.model?.mediatype===`movies`&&this.model?.collections.some(e=>as.has(e)))}get isTvCommercial(){return!!(this.model?.adIds?.length||this.model?.collections.includes(rs))}get isTvFactCheck(){return!!(this.model?.factChecks?.length||this.model?.collections.includes(is))}get isTvQuote(){return!!this.model?.isClip}get isRadioItem(){return!!(this.model?.mediatype===`audio`&&this.model?.collections.some(e=>os.has(e)))}render(){let e=ns[this.displayMediatype];return e?T`
      <div
        id="icon"
        class="${this.showText?`show-text`:`hide-text`}"
        title="${e.text}"
        style="--iconFillColor: ${e.color}"
      >
        ${e.icon}
        <p class="status-text">${e.text}</p>
      </div>
    `:T``}static get styles(){return w`
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
    `}};V([A({type:Object})],ss.prototype,`model`,void 0),V([A({type:Boolean})],ss.prototype,`showText`,void 0),ss=V([k(`tile-mediatype-icon`)],ss);var cs=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`,ls=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`,us=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`,ds=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path d="m45.3394669 100.000002h7.4385828c6.4511217-.3595144 12.58904-1.9152224 18.4137548-4.6671261s10.8424956-6.3426695 15.0533425-10.7722976c4.2108468-4.429628 7.556034-9.6360206 10.0355616-15.6191778s3.7192914-12.2669975 3.7192914-18.8515208c0-9.0967521-2.2250498-17.4897316-6.6751493-25.1789383-4.4500995-7.6892068-10.5140669-13.7638762-18.1919023-18.22400833-7.6778355-4.46013212-16.0560287-6.68910874-25.1345797-6.68693148-6.8100007 0-13.2915728 1.31603472-19.4447163 3.94810096-6.1531434 2.63206624-11.4699901 6.17816545-15.9505399 10.63829755-4.4805499 4.4601321-8.03453942 9.7863622-10.66196865 15.9786902s-3.94114385 12.7005912-3.94114385 19.5247894c0 12.9271929 4.36092352 24.1624988 13.0827705 33.7059178 8.7218471 9.543419 19.4751667 14.9448198 32.2599589 16.2042045zm-28.136113-51.5246596c2.2707252-7.480036 5.6159125-13.1058597 10.0355616-16.8774711 4.2412972-3.9502783 8.9610997-5.4166529 14.1594076-4.399124.2979783.1786667.1783519.507675-.358879.9870248-.537231.4793498-1.433341 1.2572039-2.6883299 2.3335621-1.254989 1.0763582-2.3000881 2.1538058-3.1352974 3.2323429-1.074462 1.4358706-1.7911325 2.7976598-2.1500114 4.0853677-.358879 1.2877079-.448055 2.214814-.267528 2.7813184.180527.5665043.180527 1.1798542 0 1.8400496 3.1059345-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296923 6.1934174c.9570107 2.4839036 1.210401 5.2063926.760171 8.1674672-.45023 2.9610745-1.6595435 5.6094822-3.6279404 7.9452231-3.3451872 3.6495952-7.5712592 5.2205552-12.678216 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.5529673-2.1548953-2.4490773-4.8479697-2.6883299-8.0792232-.2392527-3.2312535.089176-6.1040841.9852859-8.6184917zm34.7655868 0c2.2098245-7.3013692 5.5854621-12.9271929 10.1269126-16.8774711 4.1825715-3.9502783 8.8719237-5.4166529 14.0680565-4.399124.358879.1786667.2838407.507675-.225115.9870248-.5089556.4793498-1.3898404 1.2572039-2.6426544 2.3335621-1.2528139 1.0763582-2.3283634 2.1538058-3.2266484 3.2323429-1.0744619 1.4358706-1.7911324 2.7976598-2.1500114 4.0853677s-.4632801 2.214814-.3132035 2.7813184c.1500767.5665043.1348515 1.1798542-.0456755 1.8400496 3.1059346-.1786668 5.8236273.5545206 8.1530782 2.199562s3.9726817 3.7095139 4.9296924 6.1934174c.9570106 2.4839036 1.2256261 5.2063926.8058464 8.1674672-.4197796 2.9610745-1.6443183 5.6094822-3.6736158 7.9452231-3.3451873 3.6495952-7.5712593 5.2205552-12.6782161 4.7128802s-8.9154242-2.6767329-11.4254021-6.5071737c-1.4942416-2.1548953-2.3609888-4.8479697-2.6002414-8.0792232-.2392527-3.2312535.0598131-6.1040841.8971975-8.6184917z"/>
  </svg>
`;function fs(e,t){let n=1;return e>=1e9?n=1e9:e>=1e6?n=1e6:e>=1e3&&t===`short`&&(n=1e3),n}function ps(e=0,t){let n=e/t,r=n<10,i=0;return i=r?Math.round((n+2**-52)*10)/10:Math.round(n),i}function ms(e,t,n,r){switch(t){case 1e9:return N(n===`short`?or`${e}B`:or`${e} billion`);case 1e6:return N(n===`short`?or`${e}M`:or`${e} million`);case 1e3:return N(n===`short`?or`${e}K`:or`${e} thousand`);default:return new Intl.NumberFormat(r).format(e)}}function hs(e,t=`long`,n=`short`,r=`en-US`){let i=e??-1;if(i<0)return``;let a=fs(i,t);return ms(ps(i,a),a,n,r)}var gs=class extends O{constructor(...e){super(...e),this.showTvClips=!1}render(){return T`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype===`account`?`Account Stats`:`Item Stats`}
        </p>
        <ul id="stats-row">
          ${this.mediatypeIconColumnTemplate}
          ${this.mediatype===`account`?this.uploadsColumnTemplate:this.viewsColumnTemplate}
          ${this.favoritesColumnTemplate}
          ${this.showTvClips?this.tvClipsColumnTemplate:this.reviewsColumnTemplate}
        </ul>
      </div>
    `}get mediatypeIconColumnTemplate(){return T`
      <li class="col">
        <p class="sr-only">${N(`Mediatype:`)}</p>
        <tile-mediatype-icon .model=${this.model}></tile-mediatype-icon>
      </li>
    `}columnTemplate(e,t,n,r=[]){let i=hs(e??0,`short`,`short`),a=N(or`${i} ${t}`),o=t+`:`;return T`
      <li class="col ${r.join(` `)}" title=${a}>
        ${n}
        <p class="status-text">
          <span class="sr-only">${o}</span>
          ${i}
        </p>
      </li>
    `}get viewsColumnTemplate(){let e=this.viewLabel??N(`all-time views`);return this.columnTemplate(this.viewCount,e,us)}get uploadsColumnTemplate(){return this.columnTemplate(this.itemCount,N(`uploads`),ls)}get favoritesColumnTemplate(){return this.columnTemplate(this.favCount,N(`favorites`),Mo)}get reviewsColumnTemplate(){return this.columnTemplate(this.commentCount,N(`reviews`),cs,[`reviews`])}get tvClipsColumnTemplate(){return this.columnTemplate(this.tvClipCount,N(`clips`),ds)}static get styles(){return[Ha,w`
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
      `]}};V([A({type:Object})],gs.prototype,`model`,void 0),V([A({type:String})],gs.prototype,`mediatype`,void 0),V([A({type:Number})],gs.prototype,`itemCount`,void 0),V([A({type:Number})],gs.prototype,`viewCount`,void 0),V([A({type:String})],gs.prototype,`viewLabel`,void 0),V([A({type:Number})],gs.prototype,`favCount`,void 0),V([A({type:Number})],gs.prototype,`commentCount`,void 0),V([A({type:Boolean})],gs.prototype,`showTvClips`,void 0),V([A({type:Number})],gs.prototype,`tvClipCount`,void 0),gs=V([k(`tile-stats`)],gs);var _s=class extends To{constructor(...e){super(...e),this.showInfoButton=!1,this.showTvClips=!1,this.layoutType=`default`}render(){let e=this.model?.title;return T`
      <div class=${ar({container:!0,simple:this.layoutType!==`default`,"stats-only":this.layoutType===`stats-only`,"snippets-only":this.layoutType===`snippets-only`,minimal:this.layoutType===`minimal`})}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h3 class="truncated" title=${Ua(e)}>
                ${e}
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
    `}get creatorTemplate(){let e=this.displayValueProvider.firstCreatorMatchingFilter;return e?T`
      <div class="created-by">
        <span class="truncated" title=${e}>
          by&nbsp;${e}
        </span>
      </div>
    `:D}get imageBlockTemplate(){return T`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.suppressBlurring}
        .isCompactTile=${!1}
        .isListTile=${!1}
        .viewSize=${`grid`}
      >
      </image-block>
    `}get sortedDateInfoTemplate(){let e,t=`long`;switch(this.effectiveSort?.field){case`date`:{let n=this.model?.datePublished;e={field:`published`,value:n},jo(n)&&(t=`year-only`);break}case`reviewdate`:e={field:`reviewed`,value:this.model?.dateReviewed};break;case`addeddate`:e={field:`added`,value:this.model?.dateAdded};break;case`publicdate`:e={field:`archived`,value:this.model?.dateArchived};break;default:break}if(!e?.value)return D;let n=this.getFormattedDate(e.value,t);return T`
      <div class="date-sorted-by truncated">
        <span>${e.field} ${n}</span>
      </div>
    `}get infoButtonTemplate(){return this.showInfoButton?T`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${N(`More info`)}</span>
        </button>`:D}get reviewBlockTemplate(){if(!this.model?.review)return D;let{reviewtitle:e,reviewbody:t,stars:n}=this.model.review;return T`
      <review-block
        viewsize="grid"
        title=${Ua(e)}
        body=${Ua(t)}
        starRating=${Ua(n)}
      >
      </review-block>
    `}get textSnippetsTemplate(){return!this.hasSnippets||[`stats-only`,`minimal`].includes(this.layoutType)?D:T`
      <text-snippet-block viewsize="grid" .snippets=${this.model?.snippets}>
      </text-snippet-block>
    `}get volumeIssueTemplate(){return!this.model?.volume||!this.model?.issue?D:T`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${this.model?.volume}, Issue&nbsp;${this.model?.issue}
        </span>
      </div>
    `}get webArchivesCaptureDatesTemplate(){return!this.model?.captureDates||!this.model.title?D:T`
      <ul class="capture-dates">
        ${Ao(this.model.captureDates,e=>T`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,e)}
            </li>`)}
      </ul>
    `}get tileStatsTemplate(){if([`snippets-only`,`minimal`].includes(this.layoutType))return D;let[e,t]=(this.sortParam??this.defaultSortParam)?.field===`week`?[this.model?.weeklyViewCount,`weekly views`]:[this.model?.viewCount,`all-time views`];return T`
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
    `}get isSortedByDate(){return[`date`,`reviewdate`,`addeddate`,`publicdate`].includes(this.effectiveSort?.field)}get effectiveSort(){return this.sortParam??this.defaultSortParam}get hasSnippets(){return!!this.model?.snippets?.length}infoButtonPressed(e){e.preventDefault();let t=new CustomEvent(`infoButtonPressed`,{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){return[So,w`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:hover {
          text-decoration: underline;
        }

        .container {
          border: 1px solid ${w`var(--tileBorderColor, #dddddd)`};
        }

        .simple #title > .truncated {
          -webkit-line-clamp: 2;
        }

        .simple .created-by > .truncated,
        .simple .date-sorted-by > .truncated,
        .simple .volume-issue > .truncated {
          -webkit-line-clamp: 1;
        }

        .simple.snippets-only .item-info,
        .simple.minimal .item-info {
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
      `]}};V([A({type:Boolean})],_s.prototype,`showInfoButton`,void 0),V([A({type:Boolean})],_s.prototype,`showTvClips`,void 0),V([A({type:String})],_s.prototype,`layoutType`,void 0),_s=V([k(`item-tile`)],_s);var vs=class extends To{constructor(...e){super(...e),this.showInfoButton=!1}render(){return T`
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
    `}get getAvatarTemplate(){return T`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${`grid`}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return T`<div id="title">
      <h4 class="truncated">${this.model?.identifier}</h4>
    </div>`}get getArchivistTemplate(){return T`<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
    </div>`}get getTileStatsTemplate(){return T`<tile-stats
      .mediatype=${this.model?.mediatype}
      .itemCount=${this.model?.itemCount}
      .favCount=${this.model?.favCount}
      .commentCount=${this.model?.commentCount}
    >
    </tile-stats>`}get infoButtonTemplate(){return this.showInfoButton?T`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${N(`More info`)}</span>
        </button>`:D}infoButtonPressed(e){e.preventDefault();let t=new CustomEvent(`infoButtonPressed`,{detail:{x:e.clientX,y:e.clientY}});this.dispatchEvent(t)}static get styles(){return[So,w`
        .container {
          border: 1px solid ${w`var(--tileBorderColor, #dddddd)`};
        }
      `]}};V([A({type:Boolean})],vs.prototype,`showInfoButton`,void 0),vs=V([k(`account-tile`)],vs);var ys=class extends To{constructor(...e){super(...e),this.showInfoButton=!1}render(){return T`
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
      </div>
    `}get getImageBlockTemplate(){return T`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${`grid`}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `}get getTitleTemplate(){return T`<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
    </div>`}static get styles(){let e=w`var(--tileBorderColor, #555555)`;return[So,w`
        .container {
          background-color: ${w`var(--tileBackgroundColor, #666666)`};
          border: 1px solid ${e};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${w`#fff`};
          -webkit-line-clamp: 4;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `]}};V([A({type:Boolean})],ys.prototype,`showInfoButton`,void 0),ys=V([k(`search-tile`)],ys);function bs(e,t,n,r=20,i=0){let a=[];if(i>=r)return a;let o=e=>{let a=e.assignedNodes().filter(e=>e.nodeType===1);return a.length>0?bs(a[0].parentElement,t,n,r,i+1):[]},s=Array.from(e.children||[]);for(let e of s)t(e)||(n(e)&&a.push(e),e.shadowRoot==null?e.tagName===`SLOT`?a.push(...o(e)):a.push(...bs(e,t,n,r,i+1)):a.push(...bs(e.shadowRoot,t,n,r,i+1)));return a}function xs(e){return e.hasAttribute(`hidden`)||e.hasAttribute(`aria-hidden`)&&e.getAttribute(`aria-hidden`)!==`false`||e.style.display===`none`||e.style.opacity===`0`||e.style.visibility===`hidden`||e.style.visibility===`collapse`}function Ss(e){return e.hasAttribute(`disabled`)||e.hasAttribute(`aria-disabled`)&&e.getAttribute(`aria-disabled`)!==`false`}function Cs(e){return e.getAttribute(`tabindex`)===`-1`||xs(e)||Ss(e)?!1:e.hasAttribute(`tabindex`)||(e instanceof HTMLAnchorElement||e instanceof HTMLAreaElement)&&e.hasAttribute(`href`)||e instanceof HTMLButtonElement||e instanceof HTMLInputElement||e instanceof HTMLTextAreaElement||e instanceof HTMLSelectElement||e instanceof HTMLIFrameElement}var ws=new Map;function Ts(e,t,n){let r=ws.get(n);r!=null&&window.clearTimeout(r),ws.set(n,window.setTimeout(()=>{e(),ws.delete(n)},t))}var Es=document.createElement(`template`);Es.innerHTML=`
	<div id="start"></div>
	<div id="backup"></div>
	<slot></slot>
	<div id="end"></div>
`;var Ds=class extends HTMLElement{constructor(){super(),this.debounceId=Math.random().toString(),this._focused=!1;let e=this.attachShadow({mode:`open`});e.appendChild(Es.content.cloneNode(!0)),this.$backup=e.querySelector(`#backup`),this.$start=e.querySelector(`#start`),this.$end=e.querySelector(`#end`),this.focusLastElement=this.focusLastElement.bind(this),this.focusFirstElement=this.focusFirstElement.bind(this),this.onFocusIn=this.onFocusIn.bind(this),this.onFocusOut=this.onFocusOut.bind(this)}static get observedAttributes(){return[`inactive`]}get inactive(){return this.hasAttribute(`inactive`)}set inactive(e){e?this.setAttribute(`inactive`,``):this.removeAttribute(`inactive`)}get focused(){return this._focused}connectedCallback(){this.$start.addEventListener(`focus`,this.focusLastElement),this.$end.addEventListener(`focus`,this.focusFirstElement),this.addEventListener(`focusin`,this.onFocusIn),this.addEventListener(`focusout`,this.onFocusOut),this.render()}disconnectedCallback(){this.$start.removeEventListener(`focus`,this.focusLastElement),this.$end.removeEventListener(`focus`,this.focusFirstElement),this.removeEventListener(`focusin`,this.onFocusIn),this.removeEventListener(`focusout`,this.onFocusOut)}attributeChangedCallback(){this.render()}focusFirstElement(){this.trapFocus()}focusLastElement(){this.trapFocus(!0)}getFocusableElements(){return bs(this,xs,Cs)}trapFocus(e){if(this.inactive)return;let t=this.getFocusableElements();t.length>0?(e?t[t.length-1].focus():t[0].focus(),this.$backup.setAttribute(`tabindex`,`-1`)):(this.$backup.setAttribute(`tabindex`,`0`),this.$backup.focus())}onFocusIn(){this.updateFocused(!0)}onFocusOut(){this.updateFocused(!1)}updateFocused(e){Ts(()=>{this.focused!==e&&(this._focused=e,this.render())},0,this.debounceId)}render(){this.$start.setAttribute(`tabindex`,!this.focused||this.inactive?`-1`:`0`),this.$end.setAttribute(`tabindex`,!this.focused||this.inactive?`-1`:`0`),this.focused?this.setAttribute(`focused`,``):this.removeAttribute(`focused`)}};window.customElements.define(`focus-trap`,Ds);var Os=class extends ir{constructor(e){if(super(e),this.it=C,e.type!==nr.CHILD)throw Error(this.constructor.directiveName+`() can only be used in child bindings`)}render(e){if(e===C||e==null)return this._t=void 0,this.it=e;if(e===Et)return e;if(typeof e!=`string`)throw Error(this.constructor.directiveName+`() called with a non-string value`);if(e===this.it)return this._t;this.it=e;let t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}};Os.directiveName=`unsafeHTML`,Os.resultType=1;var ks=rr(Os),{entries:As,setPrototypeOf:js,isFrozen:Ms,getPrototypeOf:Ns,getOwnPropertyDescriptor:Ps}=Object,{freeze:Fs,seal:Is,create:Ls}=Object,{apply:Rs,construct:zs}=typeof Reflect<`u`&&Reflect;Fs||=function(e){return e},Is||=function(e){return e},Rs||=function(e,t,n){return e.apply(t,n)},zs||=function(e,t){return new e(...t)};var Bs=ec(Array.prototype.forEach),Vs=ec(Array.prototype.lastIndexOf),Hs=ec(Array.prototype.pop),Us=ec(Array.prototype.push),Ws=ec(Array.prototype.splice),Gs=ec(String.prototype.toLowerCase),Ks=ec(String.prototype.toString),qs=ec(String.prototype.match),Js=ec(String.prototype.replace),Ys=ec(String.prototype.indexOf),Xs=ec(String.prototype.trim),Zs=ec(Object.prototype.hasOwnProperty),Qs=ec(RegExp.prototype.test),$s=tc(TypeError);function ec(e){return function(t){var n=[...arguments].slice(1);return Rs(e,t,n)}}function tc(e){return function(){return zs(e,[...arguments])}}function H(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Gs;js&&js(e,null);let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Ms(t)||(t[r]=e),i=e)}e[i]=!0}return e}function nc(e){for(let t=0;t<e.length;t++)Zs(e,t)||(e[t]=null);return e}function rc(e){let t=Ls(null);for(let[n,r]of As(e))Zs(e,n)&&(Array.isArray(r)?t[n]=nc(r):r&&typeof r==`object`&&r.constructor===Object?t[n]=rc(r):t[n]=r);return t}function ic(e,t){for(;e!==null;){let n=Ps(e,t);if(n){if(n.get)return ec(n.get);if(typeof n.value==`function`)return ec(n.value)}e=Ns(e)}function n(){return null}return n}var ac=Fs(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.section.select.shadow.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),oc=Fs(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.filter.font.g.glyph.glyphref.hkern.image.line.lineargradient.marker.mask.metadata.mpath.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),sc=Fs([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),cc=Fs([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),lc=Fs(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),uc=Fs([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),dc=Fs([`#text`]),fc=Fs(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.face.for.headers.height.hidden.high.href.hreflang.id.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns.slot`.split(`.`)),pc=Fs(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-rendering.textlength.type.u1.u2.unicode.values.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),mc=Fs(`accent.accentunder.align.bevelled.close.columnsalign.columnlines.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lspace.lquote.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),hc=Fs([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),gc=Is(/\{\{[\w\W]*|[\w\W]*\}\}/gm),_c=Is(/<%[\w\W]*|[\w\W]*%>/gm),vc=Is(/\$\{[\w\W]*/gm),yc=Is(/^data-[\-\w.\u00B7-\uFFFF]+$/),bc=Is(/^aria-[\-\w]+$/),xc=Is(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Sc=Is(/^(?:\w+script|data):/i),Cc=Is(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),wc=Is(/^html$/i),Tc=Is(/^[a-z][.\w]*(-[.\w]+)+$/i),Ec=Object.freeze({__proto__:null,ARIA_ATTR:bc,ATTR_WHITESPACE:Cc,CUSTOM_ELEMENT:Tc,DATA_ATTR:yc,DOCTYPE_NAME:wc,ERB_EXPR:_c,IS_ALLOWED_URI:xc,IS_SCRIPT_OR_DATA:Sc,MUSTACHE_EXPR:gc,TMPLIT_EXPR:vc}),Dc={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,progressingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Oc=function(){return typeof window>`u`?null:window},kc=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Ac=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}};function jc(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Oc(),t=e=>jc(e);if(t.version=`3.2.4`,t.removed=[],!e||!e.document||e.document.nodeType!==Dc.document||!e.Element)return t.isSupported=!1,t;let{document:n}=e,r=n,i=r.currentScript,{DocumentFragment:a,HTMLTemplateElement:o,Node:s,Element:c,NodeFilter:l,NamedNodeMap:u=e.NamedNodeMap||e.MozNamedAttrMap,HTMLFormElement:d,DOMParser:f,trustedTypes:p}=e,m=c.prototype,h=ic(m,`cloneNode`),ee=ic(m,`remove`),te=ic(m,`nextSibling`),ne=ic(m,`childNodes`),g=ic(m,`parentNode`);if(typeof o==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let _,re=``,{implementation:ie,createNodeIterator:ae,createDocumentFragment:oe,getElementsByTagName:se}=n,{importNode:v}=r,ce=Ac();t.isSupported=typeof As==`function`&&typeof g==`function`&&ie&&ie.createHTMLDocument!==void 0;let{MUSTACHE_EXPR:le,ERB_EXPR:ue,TMPLIT_EXPR:de,DATA_ATTR:fe,ARIA_ATTR:pe,IS_SCRIPT_OR_DATA:me,ATTR_WHITESPACE:he,CUSTOM_ELEMENT:y}=Ec,{IS_ALLOWED_URI:ge}=Ec,_e=null,ve=H({},[...ac,...oc,...sc,...lc,...dc]),ye=null,be=H({},[...fc,...pc,...mc,...hc]),b=Object.seal(Ls(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),xe=null,Se=null,Ce=!0,we=!0,Te=!1,Ee=!0,De=!1,Oe=!0,ke=!1,Ae=!1,x=!1,je=!1,Me=!1,Ne=!1,Pe=!0,Fe=!1,Ie=!0,Le=!1,Re={},ze=null,Be=H({},[`annotation-xml`,`audio`,`colgroup`,`desc`,`foreignobject`,`head`,`iframe`,`math`,`mi`,`mn`,`mo`,`ms`,`mtext`,`noembed`,`noframes`,`noscript`,`plaintext`,`script`,`style`,`svg`,`template`,`thead`,`title`,`video`,`xmp`]),Ve=null,He=H({},[`audio`,`video`,`img`,`source`,`image`,`track`]),Ue=null,We=H({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),Ge=`http://www.w3.org/1998/Math/MathML`,Ke=`http://www.w3.org/2000/svg`,qe=`http://www.w3.org/1999/xhtml`,Je=qe,Ye=!1,Xe=null,Ze=H({},[Ge,Ke,qe],Ks),Qe=H({},[`mi`,`mo`,`mn`,`ms`,`mtext`]),$e=H({},[`annotation-xml`]),et=H({},[`title`,`style`,`font`,`a`,`script`]),tt=null,nt=[`application/xhtml+xml`,`text/html`],S=null,rt=null,it=n.createElement(`form`),at=function(e){return e instanceof RegExp||e instanceof Function},ot=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(!(rt&&rt===e)){if((!e||typeof e!=`object`)&&(e={}),e=rc(e),tt=nt.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,S=tt===`application/xhtml+xml`?Ks:Gs,_e=Zs(e,`ALLOWED_TAGS`)?H({},e.ALLOWED_TAGS,S):ve,ye=Zs(e,`ALLOWED_ATTR`)?H({},e.ALLOWED_ATTR,S):be,Xe=Zs(e,`ALLOWED_NAMESPACES`)?H({},e.ALLOWED_NAMESPACES,Ks):Ze,Ue=Zs(e,`ADD_URI_SAFE_ATTR`)?H(rc(We),e.ADD_URI_SAFE_ATTR,S):We,Ve=Zs(e,`ADD_DATA_URI_TAGS`)?H(rc(He),e.ADD_DATA_URI_TAGS,S):He,ze=Zs(e,`FORBID_CONTENTS`)?H({},e.FORBID_CONTENTS,S):Be,xe=Zs(e,`FORBID_TAGS`)?H({},e.FORBID_TAGS,S):{},Se=Zs(e,`FORBID_ATTR`)?H({},e.FORBID_ATTR,S):{},Re=Zs(e,`USE_PROFILES`)?e.USE_PROFILES:!1,Ce=e.ALLOW_ARIA_ATTR!==!1,we=e.ALLOW_DATA_ATTR!==!1,Te=e.ALLOW_UNKNOWN_PROTOCOLS||!1,Ee=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,De=e.SAFE_FOR_TEMPLATES||!1,Oe=e.SAFE_FOR_XML!==!1,ke=e.WHOLE_DOCUMENT||!1,je=e.RETURN_DOM||!1,Me=e.RETURN_DOM_FRAGMENT||!1,Ne=e.RETURN_TRUSTED_TYPE||!1,x=e.FORCE_BODY||!1,Pe=e.SANITIZE_DOM!==!1,Fe=e.SANITIZE_NAMED_PROPS||!1,Ie=e.KEEP_CONTENT!==!1,Le=e.IN_PLACE||!1,ge=e.ALLOWED_URI_REGEXP||xc,Je=e.NAMESPACE||qe,Qe=e.MATHML_TEXT_INTEGRATION_POINTS||Qe,$e=e.HTML_INTEGRATION_POINTS||$e,b=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&at(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(b.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&at(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(b.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements==`boolean`&&(b.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),De&&(we=!1),Me&&(je=!0),Re&&(_e=H({},dc),ye=[],Re.html===!0&&(H(_e,ac),H(ye,fc)),Re.svg===!0&&(H(_e,oc),H(ye,pc),H(ye,hc)),Re.svgFilters===!0&&(H(_e,sc),H(ye,pc),H(ye,hc)),Re.mathMl===!0&&(H(_e,lc),H(ye,mc),H(ye,hc))),e.ADD_TAGS&&(_e===ve&&(_e=rc(_e)),H(_e,e.ADD_TAGS,S)),e.ADD_ATTR&&(ye===be&&(ye=rc(ye)),H(ye,e.ADD_ATTR,S)),e.ADD_URI_SAFE_ATTR&&H(Ue,e.ADD_URI_SAFE_ATTR,S),e.FORBID_CONTENTS&&(ze===Be&&(ze=rc(ze)),H(ze,e.FORBID_CONTENTS,S)),Ie&&(_e[`#text`]=!0),ke&&H(_e,[`html`,`head`,`body`]),_e.table&&(H(_e,[`tbody`]),delete xe.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw $s(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw $s(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);_=e.TRUSTED_TYPES_POLICY,re=_.createHTML(``)}else _===void 0&&(_=kc(p,i)),_!==null&&typeof re==`string`&&(re=_.createHTML(``));Fs&&Fs(e),rt=e}},st=H({},[...oc,...sc,...cc]),ct=H({},[...lc,...uc]),lt=function(e){let t=g(e);(!t||!t.tagName)&&(t={namespaceURI:Je,tagName:`template`});let n=Gs(e.tagName),r=Gs(t.tagName);return Xe[e.namespaceURI]?e.namespaceURI===Ke?t.namespaceURI===qe?n===`svg`:t.namespaceURI===Ge?n===`svg`&&(r===`annotation-xml`||Qe[r]):!!st[n]:e.namespaceURI===Ge?t.namespaceURI===qe?n===`math`:t.namespaceURI===Ke?n===`math`&&$e[r]:!!ct[n]:e.namespaceURI===qe?t.namespaceURI===Ke&&!$e[r]||t.namespaceURI===Ge&&!Qe[r]?!1:!ct[n]&&(et[n]||!st[n]):!!(tt===`application/xhtml+xml`&&Xe[e.namespaceURI]):!1},ut=function(e){Us(t.removed,{element:e});try{g(e).removeChild(e)}catch{ee(e)}},dt=function(e,n){try{Us(t.removed,{attribute:n.getAttributeNode(e),from:n})}catch{Us(t.removed,{attribute:null,from:n})}if(n.removeAttribute(e),e===`is`)if(je||Me)try{ut(n)}catch{}else try{n.setAttribute(e,``)}catch{}},ft=function(e){let t=null,r=null;if(x)e=`<remove></remove>`+e;else{let t=qs(e,/^[\r\n\t ]+/);r=t&&t[0]}tt===`application/xhtml+xml`&&Je===qe&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=_?_.createHTML(e):e;if(Je===qe)try{t=new f().parseFromString(i,tt)}catch{}if(!t||!t.documentElement){t=ie.createDocument(Je,`template`,null);try{t.documentElement.innerHTML=Ye?re:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),Je===qe?se.call(t,ke?`html`:`body`)[0]:ke?t.documentElement:a},pt=function(e){return ae.call(e.ownerDocument||e,e,l.SHOW_ELEMENT|l.SHOW_COMMENT|l.SHOW_TEXT|l.SHOW_PROCESSING_INSTRUCTION|l.SHOW_CDATA_SECTION,null)},mt=function(e){return e instanceof d&&(typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||!(e.attributes instanceof u)||typeof e.removeAttribute!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`)},ht=function(e){return typeof s==`function`&&e instanceof s};function gt(e,n,r){Bs(e,e=>{e.call(t,n,r,rt)})}let _t=function(e){let n=null;if(gt(ce.beforeSanitizeElements,e,null),mt(e))return ut(e),!0;let r=S(e.nodeName);if(gt(ce.uponSanitizeElement,e,{tagName:r,allowedTags:_e}),e.hasChildNodes()&&!ht(e.firstElementChild)&&Qs(/<[/\w]/g,e.innerHTML)&&Qs(/<[/\w]/g,e.textContent)||e.nodeType===Dc.progressingInstruction||Oe&&e.nodeType===Dc.comment&&Qs(/<[/\w]/g,e.data))return ut(e),!0;if(!_e[r]||xe[r]){if(!xe[r]&&yt(r)&&(b.tagNameCheck instanceof RegExp&&Qs(b.tagNameCheck,r)||b.tagNameCheck instanceof Function&&b.tagNameCheck(r)))return!1;if(Ie&&!ze[r]){let t=g(e)||e.parentNode,n=ne(e)||e.childNodes;if(n&&t){let r=n.length;for(let i=r-1;i>=0;--i){let r=h(n[i],!0);r.__removalCount=(e.__removalCount||0)+1,t.insertBefore(r,te(e))}}}return ut(e),!0}return e instanceof c&&!lt(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&Qs(/<\/no(script|embed|frames)/i,e.innerHTML)?(ut(e),!0):(De&&e.nodeType===Dc.text&&(n=e.textContent,Bs([le,ue,de],e=>{n=Js(n,e,` `)}),e.textContent!==n&&(Us(t.removed,{element:e.cloneNode()}),e.textContent=n)),gt(ce.afterSanitizeElements,e,null),!1)},vt=function(e,t,r){if(Pe&&(t===`id`||t===`name`)&&(r in n||r in it))return!1;if(!(we&&!Se[t]&&Qs(fe,t))&&!(Ce&&Qs(pe,t))){if(!ye[t]||Se[t]){if(!(yt(e)&&(b.tagNameCheck instanceof RegExp&&Qs(b.tagNameCheck,e)||b.tagNameCheck instanceof Function&&b.tagNameCheck(e))&&(b.attributeNameCheck instanceof RegExp&&Qs(b.attributeNameCheck,t)||b.attributeNameCheck instanceof Function&&b.attributeNameCheck(t))||t===`is`&&b.allowCustomizedBuiltInElements&&(b.tagNameCheck instanceof RegExp&&Qs(b.tagNameCheck,r)||b.tagNameCheck instanceof Function&&b.tagNameCheck(r))))return!1}else if(!Ue[t]&&!Qs(ge,Js(r,he,``))&&!((t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&Ys(r,`data:`)===0&&Ve[e])&&!(Te&&!Qs(me,Js(r,he,``)))&&r)return!1}return!0},yt=function(e){return e!==`annotation-xml`&&qs(e,y)},bt=function(e){gt(ce.beforeSanitizeAttributes,e,null);let{attributes:n}=e;if(!n||mt(e))return;let r={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:ye,forceKeepAttr:void 0},i=n.length;for(;i--;){let{name:a,namespaceURI:o,value:s}=n[i],c=S(a),l=a===`value`?s:Xs(s);if(r.attrName=c,r.attrValue=l,r.keepAttr=!0,r.forceKeepAttr=void 0,gt(ce.uponSanitizeAttribute,e,r),l=r.attrValue,Fe&&(c===`id`||c===`name`)&&(dt(a,e),l=`user-content-`+l),Oe&&Qs(/((--!?|])>)|<\/(style|title)/i,l)){dt(a,e);continue}if(r.forceKeepAttr||(dt(a,e),!r.keepAttr))continue;if(!Ee&&Qs(/\/>/i,l)){dt(a,e);continue}De&&Bs([le,ue,de],e=>{l=Js(l,e,` `)});let u=S(e.nodeName);if(vt(u,c,l)){if(_&&typeof p==`object`&&typeof p.getAttributeType==`function`&&!o)switch(p.getAttributeType(u,c)){case`TrustedHTML`:l=_.createHTML(l);break;case`TrustedScriptURL`:l=_.createScriptURL(l);break}try{o?e.setAttributeNS(o,a,l):e.setAttribute(a,l),mt(e)?ut(e):Hs(t.removed)}catch{}}}gt(ce.afterSanitizeAttributes,e,null)},xt=function e(t){let n=null,r=pt(t);for(gt(ce.beforeSanitizeShadowDOM,t,null);n=r.nextNode();)gt(ce.uponSanitizeShadowNode,n,null),_t(n),bt(n),n.content instanceof a&&e(n.content);gt(ce.afterSanitizeShadowDOM,t,null)};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,o=null,c=null,l=null;if(Ye=!e,Ye&&(e=`<!-->`),typeof e!=`string`&&!ht(e))if(typeof e.toString==`function`){if(e=e.toString(),typeof e!=`string`)throw $s(`dirty is not a string, aborting`)}else throw $s(`toString is not a function`);if(!t.isSupported)return e;if(Ae||ot(n),t.removed=[],typeof e==`string`&&(Le=!1),Le){if(e.nodeName){let t=S(e.nodeName);if(!_e[t]||xe[t])throw $s(`root node is forbidden and cannot be sanitized in-place`)}}else if(e instanceof s)i=ft(`<!---->`),o=i.ownerDocument.importNode(e,!0),o.nodeType===Dc.element&&o.nodeName===`BODY`||o.nodeName===`HTML`?i=o:i.appendChild(o);else{if(!je&&!De&&!ke&&e.indexOf(`<`)===-1)return _&&Ne?_.createHTML(e):e;if(i=ft(e),!i)return je?null:Ne?re:``}i&&x&&ut(i.firstChild);let u=pt(Le?e:i);for(;c=u.nextNode();)_t(c),bt(c),c.content instanceof a&&xt(c.content);if(Le)return e;if(je){if(Me)for(l=oe.call(i.ownerDocument);i.firstChild;)l.appendChild(i.firstChild);else l=i;return(ye.shadowroot||ye.shadowrootmode)&&(l=v.call(r,l,!0)),l}let d=ke?i.outerHTML:i.innerHTML;return ke&&_e[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&Qs(wc,i.ownerDocument.doctype.name)&&(d=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+d),De&&Bs([le,ue,de],e=>{d=Js(d,e,` `)}),_&&Ne?_.createHTML(d):d},t.setConfig=function(){ot(arguments.length>0&&arguments[0]!==void 0?arguments[0]:{}),Ae=!0},t.clearConfig=function(){rt=null,Ae=!1},t.isValidAttribute=function(e,t,n){return rt||ot({}),vt(S(e),S(t),n)},t.addHook=function(e,t){typeof t==`function`&&Us(ce[e],t)},t.removeHook=function(e,t){if(t!==void 0){let n=Vs(ce[e],t);return n===-1?void 0:Ws(ce[e],n,1)[0]}return Hs(ce[e])},t.removeHooks=function(e){ce[e]=[]},t.removeAllHooks=function(){ce=Ac()},t}var Mc=jc(),Nc=class extends To{constructor(...e){super(...e),this.collectionLinks=[]}render(){return T`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize===`mobile`?this.mobileTemplate:this.desktopTemplate}
      </div>
    `}get mobileTemplate(){return T`
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
    `}get desktopTemplate(){return T`
      <div id="list-line-left">${this.imageBlockTemplate}</div>
      <div id="list-line-right">
        <div id="title-line">
          <div id="title">${this.titleTemplate}</div>
          ${this.iconRightTemplate}
        </div>
        ${this.detailsTemplate}
      </div>
    `}get imageBlockTemplate(){if(!this.model)return D;let e=this.model.mediatype===`collection`,t=this.displayValueProvider.itemPageUrl(this.model.identifier,e);return T`<a
      id="image-link"
      title=${N(or`View ${this.model?.title}`)}
      href=${t}
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
    </a> `}get detailsTemplate(){return T`
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
    `}get iconRightTemplate(){return T`
      <a
        id="icon-right"
        href=${this.mediatypeURL}
        title=${N(or`See more: ${this.model?.mediatype}`)}
      >
        <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
      </a>
    `}get titleTemplate(){return this.model?.title?this.model?.href?T`<a href="${this.baseNavigationUrl}${this.model.href}"
          >${this.model.title??this.model.identifier}</a
        >`:this.detailsLink(this.model.identifier,this.model.title,this.model.mediatype===`collection`):D}get itemLineTemplate(){let e=this.sourceTemplate,t=this.volumeTemplate,n=this.issueTemplate;return!e&&!t&&!n?D:T` <div id="item-line">${e} ${t} ${n}</div> `}get sourceTemplate(){return this.model?.source?T`
      <div id="source" class="metadata">
        ${this.labelTemplate(N(`Source`))}
        ${this.searchLink(`source`,this.model.source)}
      </div>
    `:D}get volumeTemplate(){return this.metadataTemplate(this.model?.volume,N(`Volume`))}get issueTemplate(){return this.metadataTemplate(this.model?.issue,N(`Issue`))}get creatorTemplate(){return this.model?.mediatype===`account`?T`
        <div id="creator" class="metadata">
          <span class="label"
            >${this.displayValueProvider.accountLabel??D}</span
          >
        </div>
      `:!this.model?.creators||this.model.creators.length===0?D:T`
      <div id="creator" class="metadata">
        ${this.labelTemplate(N(`By`))}
        ${Fo(Ao(this.model.creators,e=>this.searchLink(`creator`,e)),`, `)}
      </div>
    `}get datePublishedTemplate(){let e=this.model?.datePublished,t=`long`;return jo(e)&&(t=`year-only`),this.metadataTemplate(this.getFormattedDate(e,t),N(`Published`))}get dateSortByTemplate(){return this.effectiveSort&&(this.effectiveSort.field===`addeddate`||this.effectiveSort.field===`reviewdate`||this.effectiveSort.field===`publicdate`)?this.metadataTemplate(this.getFormattedDate(this.date,`long`),this.displayValueProvider.dateLabel):D}get viewsTemplate(){let e=this.effectiveSort?.field===`week`?this.model?.weeklyViewCount:this.model?.viewCount;return e==null?D:this.model?.mediatype===`search`?this.metadataTemplate(`(Favorited search query)`,``):this.metadataTemplate(`${hs(e,this.formatSize)}`,this.displayValueProvider.viewsLabel)}get ratingTemplate(){return this.metadataTemplate(this.model?.averageRating,N(`Avg Rating`))}get reviewsTemplate(){return this.metadataTemplate(this.model?.commentCount,N(`Reviews`))}get topicsTemplate(){return!this.model?.subjects||this.model.subjects.length===0?D:T`
      <div id="topics" class="metadata">
        ${this.labelTemplate(N(`Topics`))}
        ${Fo(Ao(this.model.subjects,e=>this.searchLink(`subject`,e)),`, `)}
      </div>
    `}get collectionsTemplate(){return!this.collectionLinks||this.collectionLinks.length===0?D:T`
      <div id="collections" class="metadata">
        ${this.labelTemplate(N(`Collections`))}
        ${Fo(this.collectionLinks,`, `)}
      </div>
    `}get descriptionTemplate(){return this.metadataTemplate(ks(Mc.sanitize(this.model?.description?.replace(/\n/g,` `)??``)),``,`description`)}get reviewBlockTemplate(){if(!this.model?.review)return D;let{reviewtitle:e,reviewbody:t,stars:n}=this.model.review;return T`
      <review-block
        viewsize="list"
        title=${Ua(e)}
        body=${Ua(t)}
        starRating=${Ua(n)}
      >
      </review-block>
    `}get textSnippetsTemplate(){return this.hasSnippets?T`<text-snippet-block
      viewsize="list"
      .snippets=${this.model?.snippets}
    ></text-snippet-block>`:D}get hasSnippets(){return!!this.model?.snippets?.length}get webArchivesCaptureDatesTemplate(){return!this.model?.captureDates||!this.model.title?D:T`
      <ul class="capture-dates">
        ${Ao(this.model.captureDates,e=>T`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title,e)}
            </li>`)}
      </ul>
    `}metadataTemplate(e,t=``,n){return e?T`
      <div id=${Ua(n)} class="metadata">
        ${this.labelTemplate(t)} ${e}
      </div>
    `:D}labelTemplate(e){return T` ${e?T`<span class="label">${e}: </span>`:D}`}searchLink(e,t){if(!e||!t)return D;let n=encodeURIComponent(`${e}:"${t}"`);return T`<a
      href="${this.baseNavigationUrl}/search?query=${n}"
      rel="nofollow"
    >
      ${Mc.sanitize(t)}</a
    >`}detailsLink(e,t,n=!1){if(!e)return D;let r=t??e;return T`<a href=${this.displayValueProvider.itemPageUrl(e,n)}> ${Mc.sanitize(r)} </a>`}get mediatypeURL(){if(this.baseNavigationUrl===void 0||!this.model?.mediatype)return D;switch(this.model.mediatype){case`collection`:return`${this.baseNavigationUrl}/search?query=mediatype:collection&sort=-downloads`;case`account`:return D;default:return this.displayValueProvider.itemPageUrl(this.model.mediatype,!0)}}updated(e){(e.has(`model`)||e.has(`collectionTitles`))&&this.buildCollectionLinks()}async buildCollectionLinks(){if(!this.model?.collections||this.model.collections.length===0)return;this.collectionLinks=[];let e=[];for(let t of this.model.collections)!ma[t]&&!t.startsWith(`fav-`)&&e.push(this.detailsLink(t,this.collectionTitles?.get(t)??t,!0));this.collectionLinks=e}get date(){switch(this.effectiveSort?.field){case`date`:return this.model?.datePublished;case`reviewdate`:return this.model?.dateReviewed;case`addeddate`:return this.model?.dateAdded;default:return this.model?.dateArchived}}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?`mobile`:`desktop`}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?`short`:`long`}static get styles(){return w`
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
    `}};V([A({type:Object})],Nc.prototype,`collectionTitles`,void 0),V([j()],Nc.prototype,`collectionLinks`,void 0),Nc=V([k(`tile-list`)],Nc);var Pc=class extends O{constructor(...e){super(...e),this.loggedIn=!1,this.suppressBlurring=!1}render(){return T`
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
    `}get headerTemplate(){if(this.model?.collections?.length===0)return D;let e=``,t=``;for(let n of this.model?.collections||[])if(!ma[n]&&!n.startsWith(`fav-`)){e=this.collectionTitles?.get(n)??n,t=n;break}return t?T`
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${t}">
          <img
            src="${this.baseImageUrl}/services/img/${t}"
            alt=""
          /><span>${e}</span>
        </a>
      </div>
    `:D}static get styles(){return w`
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
        background: ${w`var(--hoverPaneHeaderBGColor, #edf0ff)`};
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
        color: ${w`var(--ia-theme-link-color, #4b64ff)`};
        font-family: ${w`var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`};
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
    `}};V([A({type:Object})],Pc.prototype,`model`,void 0),V([A({type:String})],Pc.prototype,`baseNavigationUrl`,void 0),V([A({type:String})],Pc.prototype,`baseImageUrl`,void 0),V([A({type:Boolean})],Pc.prototype,`loggedIn`,void 0),V([A({type:Boolean})],Pc.prototype,`suppressBlurring`,void 0),V([A({type:Object})],Pc.prototype,`sortParam`,void 0),V([A({type:Number})],Pc.prototype,`mobileBreakpoint`,void 0),V([A({type:Number})],Pc.prototype,`currentWidth`,void 0),V([A({type:Object})],Pc.prototype,`collectionTitles`,void 0),Pc=V([k(`tile-hover-pane`)],Pc);var Fc=class extends To{render(){return T`
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
          >${Mc.sanitize(this.model?.title??``)}</a
        >
        <div id="creator">
          ${this.model?.mediatype===`account`?this.displayValueProvider.accountLabel:this.creator}
        </div>
        <div id="date">
          ${this.getFormattedDate(this.date,this.dateFormatSize)}
        </div>
        <div id="icon">
          <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
        </div>
        <div id="views">${hs(this.views??0,this.formatSize)}</div>
      </div>
    `}get href(){return!this.model?.identifier||this.baseNavigationUrl==null?D:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype===`collection`)}get creator(){return this.displayValueProvider.firstCreatorMatchingFilter??D}get date(){switch(this.effectiveSort?.field){case`publicdate`:return this.model?.dateArchived;case`reviewdate`:return this.model?.dateReviewed;case`addeddate`:return this.model?.dateAdded;default:return this.model?.datePublished}}get views(){return this.effectiveSort?.field===`week`?this.model?.weeklyViewCount:this.model?.viewCount}get effectiveSort(){return this.sortParam??this.defaultSortParam}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?`mobile`:`desktop`}get dateFormatSize(){return(!this.isSortedByDate||this.effectiveSort?.field===`date`)&&jo(this.model?.datePublished)?`year-only`:this.formatSize}get formatSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?`short`:`long`}get isSortedByDate(){return[`date`,`reviewdate`,`addeddate`,`publicdate`].includes(this.effectiveSort?.field)}static get styles(){return w`
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
        grid-template-columns: 51px 3fr 2fr 95px 30px 115px;
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
    `}};Fc=V([k(`tile-list-compact`)],Fc);var Ic=class extends To{render(){return T`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">${N(`Title`)}</div>
        <div id="creator">${N(`Creator`)}</div>
        <div id="date">
          ${this.displayValueProvider.dateLabel||N(`Published`)}
        </div>
        <div id="icon">${N(`Type`)}</div>
        <div id="views">${this.displayValueProvider.viewsLabel}</div>
      </div>
    `}get classSize(){return this.mobileBreakpoint&&this.currentWidth&&this.currentWidth<this.mobileBreakpoint?`mobile`:`desktop`}static get styles(){return w`
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
        grid-template-columns: 51px 3fr 2fr 95px 30px 115px;
      }
    `}};Ic=V([k(`tile-list-compact-header`)],Ic);var Lc=(e,t=-1/0,n=1/0)=>Math.max(t,Math.min(e,n)),Rc=class{constructor(e,t={}){this.host=e,this.mobileBreakpoint=600,this.offsetX=-10,this.offsetY=15,this.showDelay=300,this.hideDelay=100,this.longPressDelay=600,this.enableLongPress=!1,this.hoverPaneState=`hidden`,this.forceTouchBackdrop=!1,this.lastPointerClientPos={x:0,y:0},this.clicking=!1,this.handleFocus=()=>{!this.clicking&&this.hoverPaneState===`hidden`&&this.showHoverPane({anchor:`host`}),this.clicking=!1},this.handleBlur=()=>{this.hoverPaneState!==`hidden`&&this.fadeOutHoverPane()},this.handlePointerDown=()=>{this.clicking=!0},this.handleKeyDown=e=>{(e.key===`ArrowDown`||e.key===`ArrowUp`)&&this.hoverPaneState!==`hidden`&&e.preventDefault()},this.handleKeyUp=e=>{if(this.hoverPaneState===`hidden`||!this.hoverPane)return;e.key===`ArrowDown`&&(this.hoverPane.tabIndex=1,this.hoverPane.focus());let t=e.key===`ArrowUp`,n=e.key===`Escape`||e.key===`Esc`;n&&this.fadeOutHoverPane(),(t||n)&&(this.hoverPane.tabIndex=-1,this.host.acquireFocus())},this.handleMouseEnter=e=>{this.handleMouseMove(e)},this.handleMouseMove=e=>{clearTimeout(this.hideTimer),this.hoverPaneState===`fading-out`&&(this.hoverPaneState=`shown`,this.hoverPane?.classList.add(`fade-in`)),this.hoverPaneState===`hidden`&&(this.restartShowHoverPaneTimer(),this.lastPointerClientPos={x:e.clientX,y:e.clientY})},this.handleMouseLeave=()=>{this.host.releaseFocus(),clearTimeout(this.showTimer),this.hoverPaneState!==`hidden`&&(this.hideTimer=window.setTimeout(()=>{this.fadeOutHoverPane()},this.hideDelay))},this.handleTouchStart=e=>{clearTimeout(this.longPressTimer),e.touches.length===1&&(this.longPressTimer=window.setTimeout(()=>{this.hoverPaneState===`hidden`&&this.showHoverPane()},this.longPressDelay),this.lastPointerClientPos={x:e.touches[0].clientX,y:e.touches[0].clientY})},this.handleLongPressCancel=()=>{clearTimeout(this.longPressTimer)},this.handleContextMenu=e=>{e.preventDefault()},this.handleBackdropInteraction=e=>{this.hoverPaneState!==`hidden`&&this.fadeOutHoverPane(),e.preventDefault(),e.stopPropagation()},this.mobileBreakpoint=t.mobileBreakpoint??this.mobileBreakpoint,this.offsetX=t.offsetX??this.offsetX,this.offsetY=t.offsetY??this.offsetY,this.showDelay=t.showDelay??this.showDelay,this.hideDelay=t.hideDelay??this.hideDelay,this.longPressDelay=t.longPressDelay??this.longPressDelay,this.enableLongPress=t.enableLongPress??this.enableLongPress,this.host.addController(this)}hostConnected(){this.attachListeners()}hostDisconnected(){this.detachListeners()}hostUpdated(){this.hoverPane=this.host.getHoverPane(),this.hoverPaneProps=this.host.getHoverPaneProps()}getTemplate(){return this.hoverPaneProps=this.host.getHoverPaneProps(),this.shouldRenderHoverPane?T`
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
            ${N(`Press Up Arrow to exit item detail preview`)}
          </div>
        `:D}toggleHoverPane(e){this.hoverPaneState===`hidden`?(this.lastPointerClientPos=e.coords,this.forceTouchBackdrop=e.enableTouchBackdrop??!1,this.showHoverPane()):(this.fadeOutHoverPane(),this.forceTouchBackdrop=!1)}get touchBackdropTemplate(){return this.showTouchBackdrop?T`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${e=>e.stopPropagation()}
          @mousemove=${e=>e.stopPropagation()}
          @mouseleave=${e=>e.stopPropagation()}
        ></div>`:D}get showTouchBackdrop(){return this.isTouchEnabled&&this.enableLongPress||this.forceTouchBackdrop}get isMobileView(){return!!this.mobileBreakpoint&&window.innerWidth<this.mobileBreakpoint}get isHoverEnabled(){return window.matchMedia(`(hover: hover)`).matches}get isTouchEnabled(){return`ontouchstart`in window&&window.matchMedia(`(any-pointer: coarse)`).matches}get shouldRenderHoverPane(){return this.hoverPaneState!==`hidden`}makePaneDesiredOffsets(e){let[t,n]=[0,0];switch(e){case`host`:let e=this.host.getBoundingClientRect();t=e.left+20,n=e.top+30;break;case`cursor`:t=this.lastPointerClientPos.x,n=this.lastPointerClientPos.y;break}let r=t>window.innerWidth/2,i=n>window.innerHeight/2,a=this.hoverPane?.getBoundingClientRect();return a&&(r&&(t-=a.width),i&&(n-=a.height),t+=(r?-1:1)*this.offsetX,n+=(i?-1:1)*this.offsetY,this.isMobileView&&(t=Lc(t,20,window.innerWidth-a.width-20),n=Lc(n,20,window.innerHeight-a.height-20))),t+=window.scrollX,n+=window.scrollY,{left:t,top:n}}attachListeners(){this.host.addEventListener(`focus`,this.handleFocus),this.host.addEventListener(`blur`,this.handleBlur),this.host.addEventListener(`pointerdown`,this.handlePointerDown),this.host.addEventListener(`keyup`,this.handleKeyUp),this.host.addEventListener(`keydown`,this.handleKeyDown),this.isHoverEnabled&&(this.host.addEventListener(`mouseenter`,this.handleMouseEnter),this.host.addEventListener(`mousemove`,this.handleMouseMove),this.host.addEventListener(`mouseleave`,this.handleMouseLeave)),this.isTouchEnabled&&this.enableLongPress&&(this.host.addEventListener(`touchstart`,this.handleTouchStart),this.host.addEventListener(`touchmove`,this.handleLongPressCancel),this.host.addEventListener(`touchend`,this.handleLongPressCancel),this.host.addEventListener(`touchcancel`,this.handleLongPressCancel),this.host.addEventListener(`contextmenu`,this.handleContextMenu))}detachListeners(){this.host.removeEventListener(`mouseenter`,this.handleMouseEnter),this.host.removeEventListener(`mousemove`,this.handleMouseMove),this.host.removeEventListener(`mouseleave`,this.handleMouseLeave),this.host.removeEventListener(`touchstart`,this.handleTouchStart),this.host.removeEventListener(`touchmove`,this.handleLongPressCancel),this.host.removeEventListener(`touchend`,this.handleLongPressCancel),this.host.removeEventListener(`touchcancel`,this.handleLongPressCancel),this.host.removeEventListener(`contextmenu`,this.handleContextMenu),this.host.removeEventListener(`focus`,this.handleFocus),this.host.removeEventListener(`blur`,this.handleBlur),this.host.removeEventListener(`keyup`,this.handleKeyUp),this.host.removeEventListener(`keydown`,this.handleKeyDown)}restartShowHoverPaneTimer(){clearTimeout(this.showTimer),this.showTimer=window.setTimeout(()=>{this.host.acquireFocus(),this.showHoverPane()},this.showDelay)}async showHoverPane(e={anchor:`cursor`}){this.hoverPaneState=`shown`,this.host.requestUpdate(),await this.host.updateComplete,this.hoverPane?.isConnected&&(this.hoverPane?.showPopover?.(),await new Promise(e=>{requestAnimationFrame(e)}),this.repositionHoverPane(e.anchor),this.hoverPane?.classList.add(`visible`,`fade-in`))}fadeOutHoverPane(){this.hoverPaneState=`fading-out`,this.hoverPane?.classList.remove(`fade-in`),clearTimeout(this.hideTimer),this.hideTimer=window.setTimeout(()=>{this.hoverPaneState=`hidden`,this.hoverPane&&(this.hoverPane.tabIndex=-1),this.host.requestUpdate()},100)}repositionHoverPane(e){if(!this.hoverPane)return;let{top:t,left:n}=this.makePaneDesiredOffsets(e);this.hoverPane.style.top=`${t}px`,this.hoverPane.style.left=`${n}px`}},zc,Bc=class extends To{static{zc=this}constructor(...e){super(...e),this.isManageView=!1,this.showTvClips=!1,this.layoutType=`default`,this.enableHoverPane=!1,this.manageCheckTitle=N(`Remove this item from the list`)}acquireFocus(){this.tileLinkElement?.focus()}releaseFocus(){this.tileLinkElement?.blur()}static{this.HOVER_PANE_DISPLAY_MODES={grid:!0,"list-compact":!0,"list-detail":!1,"list-header":!1}}render(){let e=this.tileDisplayMode===`grid`,t=this.hoverPaneController?.getTemplate()??D;return T`
      <div id="container" class=${e?`hoverable`:``}>
        ${this.tileDisplayMode===`list-header`?this.headerTemplate:this.tileTemplate}
        ${this.manageCheckTemplate} ${t}
      </div>
    `}firstUpdated(){this.shouldPrepareHoverPane&&(this.hoverPaneController=new Rc(this,{mobileBreakpoint:this.mobileBreakpoint,enableLongPress:!1}))}get headerTemplate(){let{currentWidth:e,sortParam:t,defaultSortParam:n,mobileBreakpoint:r}=this;return T`
      <tile-list-compact-header
        class="header"
        .currentWidth=${e}
        .sortParam=${t??n}
        .mobileBreakpoint=${r}
      >
      </tile-list-compact-header>
    `}get tileTemplate(){return T`
      ${this.tileDisplayMode===`list-detail`?this.tile:this.linkTileTemplate}
    `}get linkTileTemplate(){return T`
      <a
        href=${this.linkTileHref}
        aria-label=${this.model?.title??`Untitled item`}
        aria-describedby="link-aria-description"
        aria-haspopup=${this.shouldPrepareHoverPane?`dialog`:`false`}
        title=${this.shouldPrepareHoverPane?D:Ua(this.model?.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
        class="tile-link"
      >
        ${this.tile}
      </a>
      <div id="link-aria-description" class="sr-only">
        ${N(`Press Down Arrow to preview item details`)}
      </div>
    `}get linkTileHref(){return!this.model?.identifier||this.baseNavigationUrl==null?D:this.model.href?`${this.baseNavigationUrl}${this.model.href}`:this.displayValueProvider.itemPageUrl(this.model.identifier,this.model.mediatype===`collection`)}get manageCheckTemplate(){return!this.isManageView||this.tileDisplayMode!==`grid`?D:T`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          ?checked=${this.model?.checked}
          @change=${this.handleLinkClicked}
        />
      </div>
    `}get shouldPrepareHoverPane(){return this.enableHoverPane&&!!this.tileDisplayMode&&zc.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]&&this.model?.mediatype!==`search`&&!this.model?.captureDates}get isHoverEnabled(){return window.matchMedia(`(hover: hover)`).matches}get shouldShowInfoButton(){return!this.isHoverEnabled&&this.shouldPrepareHoverPane}getHoverPane(){return this.hoverPane}getHoverPaneProps(){return this}handleResize(e){this.currentWidth=e.contentRect.width,this.currentHeight=e.contentRect.height}disconnectedCallback(){this.stopResizeObservation(this.resizeObserver)}stopResizeObservation(e){e?.removeObserver({handler:this,target:this.container})}startResizeObservation(){this.stopResizeObservation(this.resizeObserver),this.resizeObserver?.addObserver({handler:this,target:this.container})}updated(e){if(e.has(`resizeObserver`)){let t=e.get(`resizeObserver`);this.stopResizeObservation(t),this.startResizeObservation()}}handleLinkClicked(e){this.isManageView&&(e.preventDefault(),this.model&&(this.model.checked=!this.model.checked)),this.dispatchEvent(new CustomEvent(`resultSelected`,{detail:this.model}))}handleLinkContextMenu(e){this.isManageView&&this.linkTileHref!==D&&(e.preventDefault(),window.open(this.linkTileHref,`_blank`))}tileInfoButtonPressed(e){this.hoverPaneController?.toggleHoverPane({coords:e.detail,enableTouchBackdrop:!0})}get tile(){let{model:e,collectionPagePath:t,baseNavigationUrl:n,currentWidth:r,currentHeight:i,sortParam:a,creatorFilter:o,mobileBreakpoint:s,defaultSortParam:c}=this;if(!e)return D;switch(this.tileDisplayMode){case`grid`:switch(e.mediatype){case`collection`:return T`<collection-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${i}
              .creatorFilter=${o}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .layoutType=${this.layoutType}
              ?showInfoButton=${this.shouldShowInfoButton}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;case`account`:return T`<account-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${i}
              .creatorFilter=${o}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${this.shouldShowInfoButton}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;case`search`:return T`<search-tile
              .model=${e}
              .collectionPagePath=${t}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${r}
              .currentHeight=${i}
              .creatorFilter=${o}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!1}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </search-tile>`;default:return T`<item-tile
              .model=${e}
              .collectionPagePath=${t}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${a}
              .defaultSortParam=${c}
              .creatorFilter=${o}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .layoutType=${this.layoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${this.shouldShowInfoButton}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`}case`list-compact`:return T`<tile-list-compact
          .model=${e}
          .collectionPagePath=${t}
          .currentWidth=${r}
          .currentHeight=${i}
          .baseNavigationUrl=${n}
          .sortParam=${a}
          .defaultSortParam=${c}
          .creatorFilter=${o}
          .mobileBreakpoint=${s}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;case`list-detail`:return T`<tile-list
          .model=${e}
          .collectionPagePath=${t}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${r}
          .currentHeight=${i}
          .baseNavigationUrl=${n}
          .sortParam=${a}
          .defaultSortParam=${c}
          .creatorFilter=${o}
          .mobileBreakpoint=${s}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list>`;default:return D}}static get styles(){return[Ha,w`
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
      `]}};V([A({type:String})],Bc.prototype,`tileDisplayMode`,void 0),V([A({type:Boolean})],Bc.prototype,`isManageView`,void 0),V([A({type:Object})],Bc.prototype,`resizeObserver`,void 0),V([A({type:Object})],Bc.prototype,`collectionTitles`,void 0),V([A({type:Boolean})],Bc.prototype,`showTvClips`,void 0),V([A({type:String})],Bc.prototype,`layoutType`,void 0),V([A({type:Boolean})],Bc.prototype,`enableHoverPane`,void 0),V([A({type:String})],Bc.prototype,`manageCheckTitle`,void 0),V([M(`#container`)],Bc.prototype,`container`,void 0),V([M(`tile-hover-pane`)],Bc.prototype,`hoverPane`,void 0),V([M(`.tile-link`)],Bc.prototype,`tileLinkElement`,void 0),Bc=zc=V([k(`tile-dispatcher`)],Bc);var Vc=class extends O{render(){return T` <div id="container"></div> `}static get styles(){return w`
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
    `}};Vc=V([k(`collection-browser-loading-tile`)],Vc);var Hc=T`
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
`,Uc=T`
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
`,Wc=T`
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
`,Gc=E`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`,Kc=E`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`,qc=E`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`,Jc=window,Yc=Jc.trustedTypes,Xc=Yc?Yc.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,Zc=`$lit$`,Qc=`lit$${(Math.random()+``).slice(9)}$`,$c=`?`+Qc,el=`<${$c}>`,tl=document,nl=()=>tl.createComment(``),rl=e=>e===null||typeof e!=`object`&&typeof e!=`function`,il=Array.isArray,al=e=>il(e)||typeof e?.[Symbol.iterator]==`function`,ol=`[ 	
\f\r]`,sl=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,cl=/-->/g,ll=/>/g,ul=RegExp(`>|${ol}(?:([^\\s"'>=/]+)(${ol}*=${ol}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),dl=/'/g,fl=/"/g,pl=/^(?:script|style|textarea|title)$/i,ml=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),hl=ml(1),gl=ml(2),_l=Symbol.for(`lit-noChange`),vl=Symbol.for(`lit-nothing`),yl=new WeakMap,bl=tl.createTreeWalker(tl,129,null,!1);function xl(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Xc===void 0?t:Xc.createHTML(t)}var Sl=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=sl;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===sl?c[1]===`!--`?o=cl:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=ul):(pl.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=ul):o=ll:o===ul?c[0]===`>`?(o=i??sl,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?ul:c[3]===`"`?fl:dl):o===fl||o===dl?o=ul:o===cl||o===ll?o=sl:(o=ul,i=void 0);let d=o===ul&&e[t+1].startsWith(`/>`)?` `:``;a+=o===sl?n+el:l>=0?(r.push(s),n.slice(0,l)+Zc+n.slice(l)+Qc+d):n+Qc+(l===-2?(r.push(void 0),t):d)}return[xl(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},Cl=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Sl(t,n);if(this.el=e.createElement(l,r),bl.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=bl.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(Zc)||t.startsWith(Qc)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+Zc).split(Qc),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?Ol:t[1]===`?`?Al:t[1]===`@`?jl:Dl})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(pl.test(i.tagName)){let e=i.textContent.split(Qc),t=e.length-1;if(t>0){i.textContent=Yc?Yc.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],nl()),bl.nextNode(),c.push({type:2,index:++a});i.append(e[t],nl())}}}else if(i.nodeType===8)if(i.data===$c)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Qc,e+1))!==-1;)c.push({type:7,index:a}),e+=Qc.length-1}a++}}static createElement(e,t){let n=tl.createElement(`template`);return n.innerHTML=e,n}};function wl(e,t,n=e,r){var i,a;if(t===_l)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=rl(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=wl(e,o._$AS(e,t.values),o,r)),t}var Tl=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??tl).importNode(t,!0);bl.currentNode=r;let i=bl.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new El(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Ml(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=bl.nextNode(),a++)}return bl.currentNode=tl,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},El=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=vl,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=wl(this,e,t),rl(e)?e===vl||e==null||e===``?(this._$AH!==vl&&this._$AR(),this._$AH=vl):e!==this._$AH&&e!==_l&&this._(e):e._$litType$===void 0?e.nodeType===void 0?al(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==vl&&rl(this._$AH)?this._$AA.nextSibling.data=e:this.$(tl.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Cl.createElement(xl(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new Tl(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=yl.get(e.strings);return t===void 0&&yl.set(e.strings,t=new Cl(e)),t}T(t){il(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(nl()),this.k(nl()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},Dl=class{constructor(e,t,n,r,i){this.type=1,this._$AH=vl,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=vl}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=wl(this,e,t,0),a=!rl(e)||e!==this._$AH&&e!==_l,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=wl(this,r[n+o],t,o),s===_l&&(s=this._$AH[o]),a||=!rl(s)||s!==this._$AH[o],s===vl?e=vl:e!==vl&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===vl?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Ol=class extends Dl{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===vl?void 0:e}},kl=Yc?Yc.emptyScript:``,Al=class extends Dl{constructor(){super(...arguments),this.type=4}j(e){e&&e!==vl?this.element.setAttribute(this.name,kl):this.element.removeAttribute(this.name)}},jl=class extends Dl{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=wl(this,e,t,0)??vl)===_l)return;let n=this._$AH,r=e===vl&&n!==vl||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==vl&&(n===vl||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ml=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){wl(this,e)}},Nl=Jc.litHtmlPolyfillSupport;Nl?.(Cl,El),(Jc.litHtmlVersions??=[]).push(`2.8.0`);var Pl=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new El(t.insertBefore(nl(),e),e,void 0,n??{})}return i._$AI(e),i},Fl,Il=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Pl(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return _l}};Il.finalized=!0,Il._$litElement$=!0,(Fl=globalThis.litElementHydrateSupport)==null||Fl.call(globalThis,{LitElement:Il});var Ll=globalThis.litElementPolyfillSupport;Ll?.({LitElement:Il}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);function Rl(e,t,n){return e?t():n?.()}var zl=gl`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`,Bl=gl`<svg class="caret-down-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499.58397485c.22976435-.15317623.54019902-.09108929.69337525.13867505.13615665.20423498.10222882.47220947-.06836249.63681849l-.07031256.05655676-3.2773501 2.18490006-3.2773501-2.18490006c-.22976434-.15317623-.29185128-.4636109-.13867505-.69337525.13615665-.20423497.39656688-.27598409.61412572-.18182636l.07924953.04315131 2.7226499 1.81402515z"
fill=""></path>
</svg>`,Vl=class extends Il{constructor(){super(...arguments),this.open=!1,this.isDisabled=!1,this.displayCaret=!1,this.closeOnSelect=!1,this.openViaButton=!0,this.usePopover=!1,this.includeSelectedOption=!1,this.selectedOption=``,this.options=[],this.optionGroup=`options`,this.optionSelected=()=>{},this.isCustomList=!1,this.hasCustomClickHandler=!1,this.closeOnEscape=!1,this.closeOnBackdropClick=!1,this.boundKeyboardListener=e=>{switch(e.key){case`Escape`:case`Esc`:this.closeOptions();break;default:break}},this.closeOptions=e=>{e&&e.type===`click`&&e.stopPropagation(),this.open=!1,this.updatePopoverState()}}async firstUpdated(){await new Promise(e=>{setTimeout(e,0)}),this.addEventListener(`closeDropdown`,this.closeOptions)}willUpdate(e){e.has(`open`)&&this.updatePopoverState()}disconnectedCallback(){var e;(e=super.disconnectedCallback)==null||e.call(this),this.removeKeyboardListener()}setupKeyboardListener(){this.closeOnEscape&&document.addEventListener(`keydown`,this.boundKeyboardListener)}removeKeyboardListener(){this.closeOnEscape&&document.removeEventListener(`keydown`,this.boundKeyboardListener)}get dropdownState(){return this.open?(this.setupKeyboardListener(),`open`):(this.removeKeyboardListener(),`closed`)}toggleOptions(){this.open=!this.open,this.updatePopoverState()}updatePopoverState(){var e,t;this.usePopover&&((t=(e=this.dropdownMenu)?.togglePopover)==null||t.call(e,this.open),this.open&&this.positionDropdownMenu())}positionDropdownMenu(){if(!this.dropdownMenu)return;let e=this.container.getBoundingClientRect();this.dropdownMenu.style.left=`${e.left}px`,this.dropdownMenu.style.top=`${e.bottom}px`,this.dropdownMenu.style.minWidth=`${e.width}px`}mainButtonClicked(){var e;this.openViaButton?this.toggleOptions():(e=this.mainButtonLabelSlotted[0])==null||e.click()}mainButtonKeyDown(e){(e.key===`Enter`||e.key===` `)&&(this.mainButtonClicked(),e.preventDefault())}caretKeyDown(e){(e.key===`Enter`||e.key===` `)&&(this.toggleOptions(),e.preventDefault())}renderOption(e){let{label:t,url:n=void 0,id:r}=e,i,a=this.selectedOption===r?`selected`:``;return i=n?hl`<a
        href=${n}
        @click=${t=>this.optionClicked(t,e)}
        >${t}</a
      >`:hl`<button
        @click=${t=>this.optionClicked(t,e)}
      >
        ${t}
      </button>`,hl`<li role="menuitem" class=${a}>${i}</li>`}optionClicked(e,t){var n;e.stopPropagation(),this.selectedOption!==t.id&&(this.selectedOption=t.id,this.dispatchEvent(new CustomEvent(`optionSelected`,{detail:{option:t}})),(n=t.selectedHandler)==null||n.call(t,t)),this.closeOnSelect&&(this.closeOptions(),this.mainButton.focus())}get availableOptions(){return this.includeSelectedOption?this.options:this.options.filter(e=>this.selectedOption!==e.id)}get caretUpTemplate(){return hl`
      <span ?hidden=${!this.open} class="caret-up">
        <slot name="caret-up">${zl}</slot>
      </span>
    `}get caretDownTemplate(){return hl`
      <span ?hidden=${this.open} class="caret-down">
        <slot name="caret-down">${Bl}</slot>
      </span>
    `}get caretTemplate(){return this.displayCaret?this.openViaButton?hl`
        <span class="caret" aria-hidden="true">
          ${this.caretUpTemplate} ${this.caretDownTemplate}
        </span>
      `:hl`
      <button
        class="caret"
        aria-labelledby="caret-label"
        aria-haspopup="true"
        aria-expanded=${this.open}
        @click=${Rl(this.shouldAttachEventHandlers,()=>this.toggleOptions)}
        @keydown=${Rl(this.shouldAttachEventHandlers,()=>this.caretKeyDown)}
        ?disabled=${this.isDisabled}
      >
        ${this.caretUpTemplate} ${this.caretDownTemplate}
      </button>
    `:hl``}get dropdownTemplate(){return this.isCustomList?hl`<slot name="list"></slot>`:hl`${this.availableOptions.map(e=>this.renderOption(e))}`}get backdropTemplate(){return!this.closeOnBackdropClick||!this.open?hl``:hl`
      <div
        id="dropdown-backdrop"
        @keyup=${this.closeOptions}
        @click=${this.closeOptions}
      ></div>
    `}get shouldNestCaretInButton(){return this.openViaButton}get shouldAttachEventHandlers(){return!this.isDisabled&&!this.hasCustomClickHandler}render(){return hl`
      <div class="ia-dropdown-group">
        <div class="button-row">
          <button
            class="click-main"
            aria-haspopup=${this.openViaButton}
            aria-expanded=${this.open}
            @click=${Rl(this.shouldAttachEventHandlers,()=>this.mainButtonClicked)}
            @keydown=${Rl(this.shouldAttachEventHandlers,()=>this.mainButtonKeyDown)}
            ?disabled=${this.isDisabled}
          >
            <span class="sr-only" id="caret-label"
              >Toggle ${this.optionGroup}</span
            >
            <slot name="dropdown-label"></slot>
            ${Rl(this.shouldNestCaretInButton,()=>this.caretTemplate)}
          </button>
          ${Rl(!this.shouldNestCaretInButton,()=>this.caretTemplate)}
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
    `}static get styles(){let e=P`var(--dropdownBorderWidth, 1px)`,t=P`var(--dropdownBorderRadius, 4px)`,n=P`var(--dropdownBorderColor, #fff)`,r=P`var(--dropdownBgColor, #333)`,i=P`var(--dropdownTextColor, #fff)`,a=P`var(--dropdownHoverBgColor, rgba(255, 255, 255, 0.3))`,o=P`var(--dropdownSelectedBgColor, #fff)`;return P`
      :host {
        display: inline;
        color: ${i};
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
        color: ${i};
        background: ${r};

        font-size: var(--dropdownFontSize, inherit);

        border-top: var(--dropdownBorderTopWidth, ${e});
        border-right: var(--dropdownBorderRightWidth, ${e});
        border-bottom: var(--dropdownBorderBottomWidth, ${e});
        border-left: var(--dropdownBorderLeftWidth, ${e});
        /* Must be after border-width settings for specificity */
        border-style: solid;
        border-color: ${n};

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
        border-bottom-color: ${o};
      }

      #dropdown-main li.selected:first-child {
        border-top-color: ${o};
      }

      #dropdown-main li:hover > *,
      #dropdown-main li:focus-within > * {
        background-color: ${a};
        color: var(--dropdownHoverTextColor, #fff);
      }

      #dropdown-main li.selected > * {
        background-color: ${o};
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
        color: ${i};
        background: transparent;
        padding: 0;
      }
    `}};t([I({type:Boolean,reflect:!0})],Vl.prototype,`open`,void 0),t([I({type:Boolean,reflect:!0})],Vl.prototype,`isDisabled`,void 0),t([I({type:Boolean})],Vl.prototype,`displayCaret`,void 0),t([I({type:Boolean})],Vl.prototype,`closeOnSelect`,void 0),t([I({type:Boolean})],Vl.prototype,`openViaButton`,void 0),t([I({type:Boolean})],Vl.prototype,`usePopover`,void 0),t([I({type:Boolean})],Vl.prototype,`includeSelectedOption`,void 0),t([I({type:String})],Vl.prototype,`selectedOption`,void 0),t([I({attribute:!1})],Vl.prototype,`options`,void 0),t([I({type:String})],Vl.prototype,`optionGroup`,void 0),t([I({attribute:!1})],Vl.prototype,`optionSelected`,void 0),t([I({type:Boolean,reflect:!0})],Vl.prototype,`isCustomList`,void 0),t([I({type:Boolean,reflect:!0})],Vl.prototype,`hasCustomClickHandler`,void 0),t([I({type:Boolean,reflect:!0})],Vl.prototype,`closeOnEscape`,void 0),t([I({type:Boolean,reflect:!0})],Vl.prototype,`closeOnBackdropClick`,void 0),t([bi(`.ia-dropdown-group`)],Vl.prototype,`container`,void 0),t([bi(`#dropdown-main`)],Vl.prototype,`dropdownMenu`,void 0),t([bi(`.click-main`)],Vl.prototype,`mainButton`,void 0),t([Ci({slot:`dropdown-label`})],Vl.prototype,`mainButtonLabelSlotted`,void 0),Vl=t([gi(`ia-dropdown`)],Vl);var Hl=class extends Il{render(){return hl`
      <div class="icon-label-container">
        <slot name="icon"></slot>
        <slot></slot>
      </div>
    `}};Hl.styles=P`
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
  `,Hl=t([gi(`ia-icon-label`)],Hl);var Ul=class extends O{constructor(...e){super(...e),this.numResults=0}render(){return T`
      <div id="tooltip-container" role="tooltip">
        <div id="arrow"></div>
        <div id="tooltip-text">
          ${this.numResults} ${this.numResults===1?`result`:`results`}
        </div>
      </div>
    `}static get styles(){let e=w`var(--tooltipArrowSize, 5px)`;return w`
      #tooltip-container {
        width: max-content;
        max-width: 200px;
        pointer-events: none;
      }

      #arrow {
        position: relative;
        left: calc(50% + ${w`var(--tooltipArrowOffset, 0px)`});
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
    `}};V([A({type:Number})],Ul.prototype,`numResults`,void 0),Ul=V([k(`alpha-bar-tooltip`)],Ul);var Wl=class extends O{constructor(...e){super(...e),this.selectedLetter=null,this.tooltipShown=!1,this.alphabet=`ABCDEFGHIJKLMNOPQRSTUVWXYZ`.split(``)}get selectedUppercaseLetter(){return this.selectedLetter?.toUpperCase()}render(){return T`
      <section id="container" aria-label=${this.ariaLandmarkLabel??D}>
        <ul>
          ${this.alphabet.map(e=>T`
              <li
                class=${e===this.selectedUppercaseLetter?`selected`:D}
                @mousemove=${this.handleMouseMove}
                @mouseleave=${this.handleMouseLeave}
              >
                ${this.letterButtonTemplate(e)}
                ${this.tooltipTemplate(e)}
              </li>
            `)}
        </ul>
      </section>
    `}letterButtonTemplate(e){return T`
      <button
        aria-label=${`${e}: ${this.letterCounts?.[e]??0} results`}
        ?disabled=${!this.letterCounts?.[e]}
        @click=${()=>{this.letterClicked(e)}}
      >
        ${e}
      </button>
    `}tooltipTemplate(e){return this.hoveredLetter===e&&this.tooltipShown?T`<alpha-bar-tooltip
          data-letter=${e}
          .numResults=${this.letterCounts?.[this.hoveredLetter]??0}
        ></alpha-bar-tooltip>`:D}letterClicked(e){e===this.selectedUppercaseLetter?this.selectedLetter=null:this.selectedLetter=e,this.dispatchEvent(new CustomEvent(`letterChanged`,{detail:{selectedLetter:this.selectedUppercaseLetter}}))}async handleMouseMove(e){let t=e.target;if(t&&!this.tooltipShown){let e=t.textContent?.trim()??void 0;this.tooltipShown=!0,this.hoveredLetter=e,await this.updateComplete,await new Promise(e=>{setTimeout(e,0)}),this.tooltip&&this.tooltip.dataset.letter===e&&this.positionTooltip(t)}}handleMouseLeave(){this.tooltipShown=!1,this.hoveredLetter=void 0}positionTooltip(e){if(!this.tooltip)return;let t=this.tooltip.clientWidth,n=e.clientWidth/2-t/2,r=getComputedStyle(document.body),i=parseFloat(r.getPropertyValue(`margin-left`)),a=parseFloat(r.getPropertyValue(`margin-right`)),o=document.body.clientWidth+i+a,s=e.getBoundingClientRect().left+n,c=s+t,l;s<1?l=s-1:c>o-1&&(l=c-o+1),l&&(n-=l,this.tooltip.style.setProperty(`--tooltipArrowOffset`,`${l}px`)),this.tooltip.style.left=`${n}px`,this.tooltip.classList.add(`fade-in`)}static{this.styles=w`
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
  `}};V([A({type:String})],Wl.prototype,`selectedLetter`,void 0),V([A({type:Object})],Wl.prototype,`letterCounts`,void 0),V([A({type:String})],Wl.prototype,`ariaLandmarkLabel`,void 0),V([j()],Wl.prototype,`tooltipShown`,void 0),V([j()],Wl.prototype,`hoveredLetter`,void 0),V([M(`alpha-bar-tooltip`)],Wl.prototype,`tooltip`,void 0),Wl=V([k(`alpha-bar`)],Wl);var Gl=class extends O{constructor(...e){super(...e),this.defaultSortDirection=null,this.defaultSortField=R.relevance,this.sortDirection=null,this.selectedSort=R.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortFieldAvailability=$i,this.enableSortOptionsSlot=!1,this.suppressDisplayModes=!1,this.alphaSelectorVisible=null,this.dropdownBackdropVisible=!1,this.boundSortBarSelectorEscapeListener=e=>{e.key===`Escape`&&this.closeDropdown()}}render(){return T`
      <div id="container">
        <section id="sort-bar" aria-label="Sorting options">
          <slot name="sort-options-left"></slot>
          <div id="sort-options">
            ${this.enableSortOptionsSlot?T`<slot name="sort-options"></slot>`:T`
                  <div class="sort-direction-container">
                    ${this.sortDirectionSelectorTemplate}
                  </div>
                  <span class="sort-by-text">${N(`Sort by:`)}</span>
                  <div id="sort-selector-container">
                    ${this.sortSelectorTemplate}
                  </div>
                `}
          </div>
          <slot name="sort-options-right"></slot>

          ${this.suppressDisplayModes?D:T`<div id="display-style-selector">
                ${this.displayOptionTemplate}
              </div>`}
        </section>

        ${this.dropdownBackdropVisible?this.dropdownBackdrop:D}
        ${this.alphaBarTemplate}
      </div>
    `}willUpdate(e){if((e.has(`selectedSort`)||e.has(`defaultSortField`))&&this.selectedSort&&this.selectedSort!==R.default&&this.sortDirection===null){let e=Zi[this.finalizedSortField];this.sortDirection=e.defaultSortDirection}}updated(e){e.has(`displayMode`)&&this.displayModeChanged(),e.has(`selectedTitleFilter`)&&this.selectedTitleFilter&&(this.alphaSelectorVisible=`title`),e.has(`selectedCreatorFilter`)&&this.selectedCreatorFilter&&(this.alphaSelectorVisible=`creator`),e.has(`dropdownBackdropVisible`)&&this.setupEscapeListeners()}setupEscapeListeners(){this.dropdownBackdropVisible?document.addEventListener(`keydown`,this.boundSortBarSelectorEscapeListener):document.removeEventListener(`keydown`,this.boundSortBarSelectorEscapeListener)}get alphaBarTemplate(){if(![`title`,`creator`].includes(this.selectedSort))return D;if(this.alphaSelectorVisible===null){if(this.selectedSort===`creator`)return this.creatorSelectorBar;if(this.selectedSort===`title`)return this.titleSelectorBar}else return this.alphaSelectorVisible===`creator`?this.creatorSelectorBar:this.titleSelectorBar;return D}get sortDirectionSelectorTemplate(){let e=this.sortDirection===`asc`?N(`descending`):N(`ascending`),t=this.canChangeSortDirection?N(or`Change to ${e} sort`):N(`Directions are not available for the current sort option`);return T`
      <button
        class="sort-direction-selector"
        title=${t}
        ?disabled=${!this.canChangeSortDirection}
        @click=${this.handleSortDirectionClicked}
      >
        <span class="sr-only">${t}</span>
        ${this.sortDirectionIcon}
      </button>
    `}get sortDirectionIcon(){return this.canChangeSortDirection?T`
      <div class="sort-direction-icon">
        ${this.finalizedSortDirection===`asc`?Hc:Uc}
      </div>
    `:T`<div class="sort-direction-icon">${Wc}</div>`}get sortSelectorTemplate(){let e=Object.values(Zi).filter(e=>e.shownInSortBar&&this.sortFieldAvailability[e.field]);return T`
      <div id="sort-dropdown-container">
        ${this.getSortDropdown({displayName:Zi[this.finalizedSortField].displayName,id:`sort-dropdown`,selected:!0,dropdownOptions:e.map(e=>this.getDropdownOption(e.field)),selectedOption:this.finalizedSortField,onOptionSelected:this.sortOptionSelected,onDropdownClick:()=>{this.dropdownBackdropVisible=this.sortOptionsDropdown.open,this.sortOptionsDropdown.classList.toggle(`open`,this.sortOptionsDropdown.open)}})}
      </div>
    `}getSortDropdown(e){return T`
      <ia-dropdown
        id=${e.id}
        class=${e.selected?`selected`:``}
        displayCaret
        closeOnSelect
        includeSelectedOption
        .openViaButton=${e.selected}
        .options=${e.dropdownOptions}
        .selectedOption=${e.selectedOption??``}
        @optionSelected=${e.onOptionSelected??D}
        @click=${e.onDropdownClick??D}
      >
        <span
          class="dropdown-label"
          slot="dropdown-label"
          data-title=${e.displayName}
        >
          ${e.displayName}
        </span>
      </ia-dropdown>
    `}getDropdownOption(e){return{id:e,label:T`
        <span class="dropdown-option-label">
          ${Zi[e].displayName}
        </span>
      `}}sortOptionSelected(e){this.dropdownBackdropVisible=!1;let t=e.detail.option.id;this.setSelectedSort(t),this.alphaSelectorVisible=null,t!==`title`&&this.selectedTitleFilter&&(this.selectedTitleFilter=null,this.emitTitleLetterChangedEvent()),t!==`creator`&&this.selectedCreatorFilter&&(this.selectedCreatorFilter=null,this.emitCreatorLetterChangedEvent())}get displayOptionTemplate(){return T`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${()=>{this.displayMode=`grid`}}
            class=${this.displayMode===`grid`?`active`:``}
            title="Tile view"
            data-testid="grid-button"
          >
            ${Gc}
          </button>
        </li>
        <li>
          <button
            id="list-detail-button"
            @click=${()=>{this.displayMode=`list-detail`}}
            class=${this.displayMode===`list-detail`?`active`:``}
            title="List view"
            data-testid="list-detail-button"
          >
            ${Kc}
          </button>
        </li>
        <li>
          <button
            id="list-compact-button"
            @click=${()=>{this.displayMode=`list-compact`}}
            class=${this.displayMode===`list-compact`?`active`:``}
            title="Compact list view"
            data-testid="list-compact-button"
          >
            ${qc}
          </button>
        </li>
      </ul>
    `}get dropdownBackdrop(){return T`
      <div
        id="sort-selector-backdrop"
        @keyup=${this.closeDropdown}
        @click=${this.closeDropdown}
      ></div>
    `}closeDropdown(){this.dropdownBackdropVisible=!1,this.sortOptionsDropdown&&(this.sortOptionsDropdown.open=!1,this.sortOptionsDropdown.classList.remove(`open`))}setSortDirection(e){this.sortDirection=e,this.emitSortChangedEvent()}toggleSortDirection(){this.setSortDirection(this.finalizedSortDirection===`desc`?`asc`:`desc`)}handleSortDirectionClicked(){!this.sortDirection&&this.defaultSortField&&this.defaultSortDirection&&(this.selectedSort=this.defaultSortField,this.sortDirection=this.defaultSortDirection),this.toggleSortDirection()}setSelectedSort(e){this.selectedSort=e;let t=Zi[e];this.sortDirection=t.defaultSortDirection,this.emitSortChangedEvent()}get finalizedSortField(){let e=this.selectedSort===R.default?this.defaultSortField:this.selectedSort;return this.sortFieldAvailability[e]?e:this.firstAvailableOption?.field??e}get finalizedSortDirection(){return this.sortDirection===null?this.defaultSortDirection:this.sortDirection}get firstAvailableOption(){return Object.values(Zi).find(e=>e.shownInSortBar&&this.sortFieldAvailability[e.field])}get canChangeSortDirection(){return Zi[this.finalizedSortField].canSetDirection}get titleSelectorBar(){return T` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      .letterCounts=${this.prefixFilterCountMap?.title}
      ariaLandmarkLabel="Filter by title letter"
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`}get creatorSelectorBar(){return T` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      .letterCounts=${this.prefixFilterCountMap?.creator}
      ariaLandmarkLabel="Filter by creator letter"
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`}titleLetterChanged(e){this.selectedTitleFilter=e.detail.selectedLetter??null,this.emitTitleLetterChangedEvent()}creatorLetterChanged(e){this.selectedCreatorFilter=e.detail.selectedLetter??null,this.emitCreatorLetterChangedEvent()}emitTitleLetterChangedEvent(){let e=new CustomEvent(`titleLetterChanged`,{detail:{selectedLetter:this.selectedTitleFilter}});this.dispatchEvent(e)}emitCreatorLetterChangedEvent(){let e=new CustomEvent(`creatorLetterChanged`,{detail:{selectedLetter:this.selectedCreatorFilter}});this.dispatchEvent(e)}displayModeChanged(){let e=new CustomEvent(`displayModeChanged`,{detail:{displayMode:this.displayMode}});this.dispatchEvent(e)}emitSortChangedEvent(){let e=new CustomEvent(`sortChanged`,{detail:{selectedSort:this.selectedSort,sortDirection:this.sortDirection}});this.dispatchEvent(e)}static get styles(){let e=w`#bbbbbb`;return[Ha,w`
        #container {
          position: relative;
        }

        #sort-bar {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-bottom: 1px;
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
          margin: 0 3px;
        }

        .sort-direction-selector {
          display: flex;
          justify-content: center;
          width: 30px;
          margin: 0 5px 0 0;
          padding: 7px 8px;
          max-height: fit-content;
          border-radius: 5px;
          background: white;
          border: 1px solid rgb(25, 72, 128);
          appearance: none;
          cursor: pointer;
        }

        .sort-direction-selector:disabled {
          cursor: not-allowed;
          border-color: ${e};
        }

        .sort-direction-icon {
          display: flex;
          align-items: center;
          background: none;
          color: inherit;
          border: none;
          padding: 0;
          outline: inherit;
          width: 12px;
          height: 12px;
        }

        .sort-direction-icon > svg {
          flex: 1;
        }

        #sort-selector-container {
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }

        #sort-dropdown-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
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
          fill: ${e};
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
      `]}};V([A({type:String})],Gl.prototype,`displayMode`,void 0),V([A({type:String})],Gl.prototype,`defaultSortDirection`,void 0),V([A({type:String})],Gl.prototype,`defaultSortField`,void 0),V([A({type:String})],Gl.prototype,`sortDirection`,void 0),V([A({type:String})],Gl.prototype,`selectedSort`,void 0),V([A({type:String})],Gl.prototype,`selectedTitleFilter`,void 0),V([A({type:String})],Gl.prototype,`selectedCreatorFilter`,void 0),V([A({type:Object})],Gl.prototype,`sortFieldAvailability`,void 0),V([A({type:Boolean,reflect:!0})],Gl.prototype,`enableSortOptionsSlot`,void 0),V([A({type:Boolean,reflect:!0})],Gl.prototype,`suppressDisplayModes`,void 0),V([A({type:Object})],Gl.prototype,`prefixFilterCountMap`,void 0),V([j()],Gl.prototype,`alphaSelectorVisible`,void 0),V([j()],Gl.prototype,`dropdownBackdropVisible`,void 0),V([M(`#sort-dropdown`)],Gl.prototype,`sortOptionsDropdown`,void 0),Gl=V([k(`sort-filter-bar`)],Gl);var Kl=class{constructor(e){this.title=e?.title,this.subtitle=e?.subtitle,this.headline=e?.headline,this.message=e?.message,this.headerColor=e?.headerColor??`#55A183`,this.bodyColor=e?.bodyColor??`#fbfbfd`,this.showProcessingIndicator=e?.showProcessingIndicator??!1,this.processingImageMode=e?.processingImageMode??`complete`,this.showCloseButton=e?.showCloseButton??!0,this.showLeftNavButton=e?.showLeftNavButton??!1,this.leftNavButtonText=e?.leftNavButtonText??``,this.showHeaderLogo=e?.showHeaderLogo??!0,this.closeOnBackdropClick=e?.closeOnBackdropClick??!0}};function*ql(e=document.activeElement){e!=null&&(yield e,`shadowRoot`in e&&e.shadowRoot&&e.shadowRoot.mode!==`closed`&&(yield*ql(e.shadowRoot.activeElement)))}function Jl(){return[...ql()].pop()}var Yl=new WeakMap;function Xl(e){let t=Yl.get(e);return t||(t=window.getComputedStyle(e,null),Yl.set(e,t)),t}function Zl(e){if(`checkVisibility`in e&&typeof e.checkVisibility==`function`)return e.checkVisibility({checkOpacity:!1,checkVisibilityCSS:!0});let t=Xl(e);return t.visibility!==`hidden`&&t.display!==`none`}function Ql(e){let{overflowY:t,overflowX:n}=Xl(e);return t===`scroll`||n===`scroll`?!0:t!==`auto`||n!==`auto`?!1:e.scrollHeight>e.clientHeight&&t===`auto`||e.scrollWidth>e.clientWidth&&n===`auto`}function $l(e){let t=e.tagName.toLowerCase(),n=Number(e.getAttribute(`tabindex`));return e.hasAttribute(`tabindex`)&&(isNaN(n)||n<=-1)||e.hasAttribute(`disabled`)||e.closest(`[inert]`)||t===`input`&&e.getAttribute(`type`)===`radio`&&!e.hasAttribute(`checked`)||!Zl(e)?!1:(t===`audio`||t===`video`)&&e.hasAttribute(`controls`)||e.hasAttribute(`tabindex`)||e.hasAttribute(`contenteditable`)&&e.getAttribute(`contenteditable`)!==`false`||[`button`,`input`,`select`,`textarea`,`a`,`audio`,`video`,`summary`,`iframe`].includes(t)?!0:Ql(e)}function eu(e,t){return e.getRootNode({composed:!0})?.host!==t}function tu(e){let t=new WeakMap,n=[];function r(i){if(i instanceof Element){if(i.hasAttribute(`inert`)||i.closest(`[inert]`)||t.has(i))return;t.set(i,!0),!n.includes(i)&&$l(i)&&n.push(i),i instanceof HTMLSlotElement&&eu(i,e)&&i.assignedElements({flatten:!0}).forEach(e=>{r(e)}),i.shadowRoot!==null&&i.shadowRoot.mode===`open`&&r(i.shadowRoot)}for(let e of Array.from(i.children))r(e)}return r(e),n.sort((e,t)=>{let n=Number(e.getAttribute(`tabindex`))||0;return(Number(t.getAttribute(`tabindex`))||0)-n})}var nu=[],ru=class{constructor(e){this.isExternalActivated=!1,this.tabDirection=`forward`,this.currentFocus=null,this.previousFocus=null,this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=e=>{if(e.key!==`Tab`||this.isExternalActivated||!this.isActive())return;let t=Jl();if(this.previousFocus=t,this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus))return;e.shiftKey?this.tabDirection=`backward`:this.tabDirection=`forward`;let n=tu(this.element),r=n.findIndex(e=>e===t);this.previousFocus=this.currentFocus;let i=this.tabDirection===`forward`?1:-1;for(;;){r+i>=n.length?r=0:r+i<0?r=n.length-1:r+=i,this.previousFocus=this.currentFocus;let t=n[r];if(this.tabDirection===`backward`&&this.previousFocus&&this.possiblyHasTabbableChildren(this.previousFocus)||t&&this.possiblyHasTabbableChildren(t))return;e.preventDefault(),this.currentFocus=t,this.currentFocus?.focus({preventScroll:!1});let a=[...ql()];if(a.includes(this.currentFocus)||!a.includes(this.previousFocus))break}setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection=`forward`},this.element=e,this.elementsWithTabbableControls=[`iframe`]}activate(){nu.push(this.element),document.addEventListener(`focusin`,this.handleFocusIn),document.addEventListener(`keydown`,this.handleKeyDown),document.addEventListener(`keyup`,this.handleKeyUp)}deactivate(){nu=nu.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener(`focusin`,this.handleFocusIn),document.removeEventListener(`keydown`,this.handleKeyDown),document.removeEventListener(`keyup`,this.handleKeyUp)}isActive(){return nu[nu.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){let e=tu(this.element);if(!this.element.matches(`:focus-within`)){let t=e[0],n=e[e.length-1],r=this.tabDirection===`forward`?t:n;typeof r?.focus==`function`&&(this.currentFocus=r,r.focus({preventScroll:!1}))}}}possiblyHasTabbableChildren(e){return this.elementsWithTabbableControls.includes(e.tagName.toLowerCase())||e.hasAttribute(`controls`)}},iu=window,au=iu.trustedTypes,ou=au?au.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,su=`$lit$`,cu=`lit$${(Math.random()+``).slice(9)}$`,lu=`?`+cu,uu=`<${lu}>`,du=document,fu=()=>du.createComment(``),pu=e=>e===null||typeof e!=`object`&&typeof e!=`function`,mu=Array.isArray,hu=e=>mu(e)||typeof e?.[Symbol.iterator]==`function`,gu=`[ 	
\f\r]`,_u=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,vu=/-->/g,yu=/>/g,bu=RegExp(`>|${gu}(?:([^\\s"'>=/]+)(${gu}*=${gu}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),xu=/'/g,Su=/"/g,Cu=/^(?:script|style|textarea|title)$/i,wu=(e=>(t,...n)=>({_$litType$:e,strings:t,values:n}))(1),Tu=Symbol.for(`lit-noChange`),Eu=Symbol.for(`lit-nothing`),Du=new WeakMap,Ou=du.createTreeWalker(du,129,null,!1);function ku(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return ou===void 0?t:ou.createHTML(t)}var Au=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=_u;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===_u?c[1]===`!--`?o=vu:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=bu):(Cu.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=bu):o=yu:o===bu?c[0]===`>`?(o=i??_u,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?bu:c[3]===`"`?Su:xu):o===Su||o===xu?o=bu:o===vu||o===yu?o=_u:(o=bu,i=void 0);let d=o===bu&&e[t+1].startsWith(`/>`)?` `:``;a+=o===_u?n+uu:l>=0?(r.push(s),n.slice(0,l)+su+n.slice(l)+cu+d):n+cu+(l===-2?(r.push(void 0),t):d)}return[ku(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},ju=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Au(t,n);if(this.el=e.createElement(l,r),Ou.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=Ou.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(su)||t.startsWith(cu)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+su).split(cu),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?Iu:t[1]===`?`?Ru:t[1]===`@`?zu:Fu})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(Cu.test(i.tagName)){let e=i.textContent.split(cu),t=e.length-1;if(t>0){i.textContent=au?au.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],fu()),Ou.nextNode(),c.push({type:2,index:++a});i.append(e[t],fu())}}}else if(i.nodeType===8)if(i.data===lu)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(cu,e+1))!==-1;)c.push({type:7,index:a}),e+=cu.length-1}a++}}static createElement(e,t){let n=du.createElement(`template`);return n.innerHTML=e,n}};function Mu(e,t,n=e,r){var i,a;if(t===Tu)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=pu(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=Mu(e,o._$AS(e,t.values),o,r)),t}var Nu=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??du).importNode(t,!0);Ou.currentNode=r;let i=Ou.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Pu(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Bu(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Ou.nextNode(),a++)}return Ou.currentNode=du,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Pu=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=Eu,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Mu(this,e,t),pu(e)?e===Eu||e==null||e===``?(this._$AH!==Eu&&this._$AR(),this._$AH=Eu):e!==this._$AH&&e!==Tu&&this._(e):e._$litType$===void 0?e.nodeType===void 0?hu(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Eu&&pu(this._$AH)?this._$AA.nextSibling.data=e:this.$(du.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=ju.createElement(ku(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new Nu(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=Du.get(e.strings);return t===void 0&&Du.set(e.strings,t=new ju(e)),t}T(t){mu(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(fu()),this.k(fu()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},Fu=class{constructor(e,t,n,r,i){this.type=1,this._$AH=Eu,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Eu}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Mu(this,e,t,0),a=!pu(e)||e!==this._$AH&&e!==Tu,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Mu(this,r[n+o],t,o),s===Tu&&(s=this._$AH[o]),a||=!pu(s)||s!==this._$AH[o],s===Eu?e=Eu:e!==Eu&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===Eu?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Iu=class extends Fu{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Eu?void 0:e}},Lu=au?au.emptyScript:``,Ru=class extends Fu{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Eu?this.element.setAttribute(this.name,Lu):this.element.removeAttribute(this.name)}},zu=class extends Fu{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Mu(this,e,t,0)??Eu)===Tu)return;let n=this._$AH,r=e===Eu&&n!==Eu||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==Eu&&(n===Eu||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Bu=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Mu(this,e)}},Vu=iu.litHtmlPolyfillSupport;Vu?.(ju,Pu),(iu.litHtmlVersions??=[]).push(`2.8.0`);var Hu=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Pu(t.insertBefore(fu(),e),e,void 0,n??{})}return i._$AI(e),i},Uu,Wu=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Hu(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return Tu}};Wu.finalized=!0,Wu._$litElement$=!0,(Uu=globalThis.litElementHydrateSupport)==null||Uu.call(globalThis,{LitElement:Wu});var Gu=globalThis.litElementPolyfillSupport;Gu?.({LitElement:Wu}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var Ku;(function(e){e.processing=`processing`,e.complete=`complete`})(Ku||={});var qu=class extends Wu{constructor(){super(...arguments),this.mode=`processing`}render(){return wu`
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
    `}static get styles(){let e=P`var(--activityIndicatorCheckmarkColor, #31A481)`;return P`
      #completed-ring {
        fill: ${P`var(--activityIndicatorCompletedRingColor, #31A481)`};
      }

      #check {
        fill: ${e};
      }

      #activity-ring {
        fill: ${P`var(--activityIndicatorLoadingRingColor, #333333)`};
      }

      #activity-dots {
        fill: ${P`var(--activityIndicatorLoadingDotColor, #333333)`};
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
    `}};t([I({type:String})],qu.prototype,`mode`,void 0),qu=t([gi(`ia-activity-indicator`)],qu);var Ju=T`
<svg
  viewBox="0 0 40 40"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
>
  <path d="m29.1923882 10.8076118c.5857864.5857865.5857864 1.535534 0 2.1213204l-7.0711162 7.0703398 7.0711162 7.0717958c.5857864.5857864.5857864 1.5355339 0 2.1213204-.5857865.5857864-1.535534.5857864-2.1213204 0l-7.0717958-7.0711162-7.0703398 7.0711162c-.5857864.5857864-1.5355339.5857864-2.1213204 0-.5857864-.5857865-.5857864-1.535534 0-2.1213204l7.0706602-7.0717958-7.0706602-7.0703398c-.5857864-.5857864-.5857864-1.5355339 0-2.1213204.5857865-.5857864 1.535534-.5857864 2.1213204 0l7.0703398 7.0706602 7.0717958-7.0706602c.5857864-.5857864 1.5355339-.5857864 2.1213204 0z" class="fill-color" fill-rule="evenodd"/>
</svg>
`,Yu=class extends O{static get styles(){return w`
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
    `}render(){return Ju}};customElements.define(`ia-icon-close`,Yu);var Xu=T`
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
`,Zu=T`
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    fill="#fff"
    title="Left arrow icon"
    alt="Left arrow icon"
  >
    <path
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
  </svg>
`,Qu=class extends O{constructor(){super(...arguments),this.config=new Kl}render(){return T`
      <div class="modal-wrapper">
        <div class="modal-container">
          <header style="background-color: ${this.config.headerColor}">
            ${this.config.showLeftNavButton?this.leftNavButtonTemplate:D}
            ${this.config.showCloseButton?this.closeButtonTemplate:``}
            ${this.config.showHeaderLogo?T`<div class="logo-icon">${Xu}</div>`:D}
            ${this.config.title?T`<h1 class="title">${this.config.title}</h1>`:``}
            ${this.config.subtitle?T`<h2 class="subtitle">${this.config.subtitle}</h2>`:``}
          </header>
          <section
            class="modal-body"
            style="background-color: ${this.config.bodyColor}"
          >
            <div class="content">
              <div
                class="processing-logo ${this.config.showProcessingIndicator?``:`hidden`}"
              >
                <ia-activity-indicator
                  .mode=${this.config.processingImageMode}
                ></ia-activity-indicator>
              </div>
              ${this.config.headline?T` <h1 class="headline">${this.config.headline}</h1> `:``}
              ${this.config.message?T` <p class="message">${this.config.message}</p> `:``}

              <div class="slot-container">
                <slot> </slot>
              </div>
            </div>
          </section>
        </div>
      </div>
    `}handleCloseButton(e){if(e.preventDefault(),e.type===`keydown`&&e.key!==` `&&e.key!==`Enter`)return;let t=new Event(`closeButtonPressed`);this.dispatchEvent(t)}handleLeftNavButtonPressed(e){if(e.preventDefault(),e.type===`keydown`&&e.key!==` `&&e.key!==`Enter`)return;let t=new Event(`leftNavButtonPressed`);this.dispatchEvent(t)}get closeButtonTemplate(){return T`
      <button
        type="button"
        class="close-button"
        @click=${this.handleCloseButton}
        @keydown=${this.handleCloseButton}
      >
        <ia-icon-close></ia-icon-close>
      </button>
    `}get leftNavButtonTemplate(){return T`<button
      type="button"
      class="back-button"
      @click=${this.handleLeftNavButtonPressed}
      @keydown=${this.handleLeftNavButtonPressed}
    >
      ${Zu} ${this.config.leftNavButtonText??``}
    </button> `}static get styles(){let e=w`var(--modalLogoSize, 6.5rem)`,t=w`var(--processingImageSize, 7.5rem)`,n=w`var(--modalCornerRadius, 1rem)`,r=w`var(--modalBorder, 2px solid black)`,i=w`var(--modalBottomMargin, 2.5rem)`,a=w`var(--modalTopMargin, 5rem)`,o=w`var(--modalHeaderBottomPadding, 0.5em)`,s=w`var(--modalBottomPadding, 2rem)`,c=w`var(--modalScrollOffset, 5px)`,l=w`var(--modalTitleFontSize, 1.8rem)`,u=w`var(--modalSubtitleFontSize, 1.4rem)`,d=w`var(--modalHeadlineFontSize, 1.6rem)`,f=w`var(--modalMessageFontSize, 1.4rem)`;return w`
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
        border-radius: ${n};
        width: 100%;
        margin-top: ${a};
      }

      header {
        position: relative;
        background-color: #36a483;
        color: white;
        border-radius: calc(${n}) calc(${n}) 0 0;
        border: ${r};
        border-bottom: 0;
        text-align: center;
        padding-bottom: ${o};
      }

      .title {
        margin: 0;
        padding: 0;
        font-size: ${l};
        font-weight: bold;
        line-height: ${w`var(--modalTitleLineHeight, normal)`};
      }

      .subtitle {
        margin: 0;
        padding: 0;
        font-weight: normal;
        padding-top: 0;
        font-size: ${u};
        line-height: ${w`var(--modalSubtitleLineHeight, normal)`};
      }

      .modal-body {
        background-color: #fbfbfd;
        border-radius: 0 0 calc(${n}) calc(${n});
        border: ${r};
        border-top: 0;
        padding: 0 1rem calc(${s} - ${c}) 1rem;
        color: #333;
        margin-bottom: 2.5rem;
        min-height: 5rem;
      }

      .content {
        overflow-y: auto;
        max-height: calc(100vh - (16.5rem + ${i}));
        min-height: 5rem;
        padding: 0 0 calc(${c}) 0;
      }

      .headline {
        font-size: ${d};
        font-weight: bold;
        text-align: center;
        line-height: ${w`var(--modalHeadlineLineHeight, normal)`};
        margin: 0;
        padding: 0;
      }

      .message {
        margin: 1rem 0 0 0;
        text-align: center;
        font-size: ${f};
        line-height: ${w`var(--modalMessageLineHeight, normal)`};
      }

      .logo-icon {
        border-radius: 100%;
        border: 3px solid #fff;
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
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
        box-shadow:
          0 0 0 1px rgba(0, 0, 0, 0.18),
          0 4px 4px 0 rgba(0, 0, 0, 0.08);
      }

      .back-button {
        position: absolute;
        left: 1.2rem;
        top: 1.2rem;
        height: 2rem;
        background-color: transparent;
        outline: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: white;
        font-family: inherit;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }

      .back-button svg {
        height: 1.5rem;
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
    `}};t([A({type:Object})],Qu.prototype,`config`,void 0),Qu=t([k(`modal-template`)],Qu);function $u(e,t,n){var r=n||{},i=r.noTrailing,a=i===void 0?!1:i,o=r.noLeading,s=o===void 0?!1:o,c=r.debounceMode,l=c===void 0?void 0:c,u,d=!1,f=0;function p(){u&&clearTimeout(u)}function m(e){var t=(e||{}).upcomingOnly,n=t===void 0?!1:t;p(),d=!n}function h(){var n=[...arguments],r=this,i=Date.now()-f;if(d)return;function o(){f=Date.now(),t.apply(r,n)}function c(){u=void 0}!s&&l&&!u&&o(),p(),l===void 0&&i>e?s?(f=Date.now(),a||(u=setTimeout(l?c:o,e))):o():a!==!0&&(u=setTimeout(l?c:o,l===void 0?e-i:e))}return h.cancel=m,h}var ed;(function(e){e.Open=`open`,e.Closed=`closed`})(ed||={});var td=class{constructor(e){this.windowResizeThrottler=$u(100,this.updateModalContainerHeight,{noLeading:!1,noTrailing:!1}).bind(this),this.modalManager=e}handleModeChange(e){switch(e){case ed.Open:this.startResizeListener(),this.stopDocumentScroll();break;case ed.Closed:this.stopResizeListener(),this.resumeDocumentScroll();break}}updateModalContainerHeight(){this.modalManager.style.setProperty(`--containerHeight`,`${window.innerHeight}px`)}stopDocumentScroll(){document.body.classList.add(`modal-manager-open`)}resumeDocumentScroll(){document.body.classList.remove(`modal-manager-open`)}startResizeListener(){window.addEventListener(`resize`,this.windowResizeThrottler)}stopResizeListener(){window.removeEventListener(`resize`,this.windowResizeThrottler)}},nd=class extends O{constructor(){super(...arguments),this.mode=ed.Closed,this.hostBridge=new td(this),this.modal=new ru(this),this.closeOnBackdropClick=!0}async firstUpdated(){await new Promise(e=>setTimeout(e,0)),this.closeOnBackdropClick&&this.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.backdropClicked()})}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate()}render(){return T`
      <div class="container">
        <div class="backdrop" @click=${this.backdropClicked}></div>
        <modal-template
          @closeButtonPressed=${this.closeButtonPressed}
          @leftNavButtonPressed=${this.callUserPressedLeftNavButtonCallback}
          tabindex="-1"
        >
          ${this.customModalContent}
        </modal-template>
      </div>
    `}getMode(){return this.mode}closeModal(){this.mode=ed.Closed,this.customModalContent=void 0,this.modalTemplate&&(this.modalTemplate.config=new Kl),this.modal.deactivate(),this.triggeringElement?.focus?.(),this.triggeringElement=void 0}callUserClosedModalCallback(){let e=this.userClosedModalCallback;this.userClosedModalCallback=void 0,e&&e()}callUserPressedLeftNavButtonCallback(){let e=this.userPressedLeftNavButtonCallback;this.userPressedLeftNavButtonCallback=void 0,e&&e()}async showModal(e){this.mode===ed.Closed&&this.captureFocusedElement(),this.closeOnBackdropClick=e.config.closeOnBackdropClick,this.userClosedModalCallback=e.userClosedModalCallback,this.userPressedLeftNavButtonCallback=e.userPressedLeftNavButtonCallback,this.customModalContent=e.customModalContent,this.mode=ed.Open,this.modalTemplate&&(this.modalTemplate.config=e.config,await this.modalTemplate.updateComplete,this.modalTemplate.focus()),this.modal.activate()}captureFocusedElement(){this.triggeringElement=Jl()}updated(e){e.has(`mode`)&&this.handleModeChange()}backdropClicked(){this.closeOnBackdropClick&&(this.closeModal(),this.callUserClosedModalCallback())}handleModeChange(){this.hostBridge.handleModeChange(this.mode),this.emitModeChangeEvent()}emitModeChangeEvent(){let e=new CustomEvent(`modeChanged`,{detail:{mode:this.mode}});this.dispatchEvent(e)}closeButtonPressed(){this.closeModal(),this.callUserClosedModalCallback()}static get styles(){let e=w`var(--modalBackdropColor, rgba(10, 10, 10, 0.9))`,t=w`var(--modalBackdropZindex, 1000)`,n=w`var(--modalWidth, 32rem)`,r=w`var(--modalMaxWidth, 95%)`;return w`
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
        z-index: ${w`var(--modalZindex, 2000)`};
        width: ${n};
        max-width: ${r};
      }
    `}};t([A({type:String,reflect:!0})],nd.prototype,`mode`,void 0),t([A({type:Object})],nd.prototype,`customModalContent`,void 0),t([A({type:Object})],nd.prototype,`hostBridge`,void 0),t([M(`modal-template`)],nd.prototype,`modalTemplate`,void 0),nd=t([k(`modal-manager`)],nd);var rd=w`var(--white, #fff)`,id=w`var(--primaryDisableCTAFill, #767676)`,ad=w`var(--secondaryCTABorder, #999)`,od=w`var(--primaryCTAFill, #194880)`,sd=w`var(--primaryCTAFillRGB, 25, 72, 128)`,cd=w`var(--primaryCTABorder, #c5d1df)`,ld=w`var(--primaryErrorCTAFill, #d9534f)`,ud=w`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,dd=w`var(--primaryErrorCTABorder, #d43f3a)`,fd=w`var(--secondaryCTAFill, #333)`,pd=w`var(--secondaryCTAFillRGB, 51, 51, 51)`,md=w`var(--primaryCTABorder, #979797)`,hd=w`var(---primaryWarningFill, #ee8950)`,gd=w`var(--primaryWarningFillRGB, 238, 137, 80)`,_d=w`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${rd};
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
    outline-color: ${rd};
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
    background-color: ${id};
    border: 1px solid ${ad};
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
    background-color: ${od};
    border-color: ${cd};
  }
  .ia-button.primary:hover {
    background-color: rgba(${sd}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${sd}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${sd}, 0.7);
  }

  .ia-button.danger {
    background-color: ${ld};
    border-color: ${dd};
  }
  .ia-button.danger:hover {
    background-color: rgba(${ud}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${ud}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${ud}, 0.7);
  }

  .ia-button.warning {
    background-color: ${hd};
    border-color: ${w`var(--primaryWarningBorder, #ec7939)`};
  }
  .ia-button.warning:hover {
    background-color: rgba(${gd}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${gd}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${gd}, 0.7);
  }

  .ia-button.dark {
    background-color: ${fd};
    border-color: ${md};
  }
  .ia-button.dark:hover {
    background-color: rgba(${pd}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${pd}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${pd}, 0.7);
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
`,vd=class extends O{constructor(...e){super(...e),this.items=[]}render(){return T`
      <ul>
        ${Ao(this.items,({title:e,date:t})=>T`
            <li>
              <span class="item-title">${e??`[untitled]`}</span>
              <span class="item-date">${t??``}</span>
            </li>
          `)}
      </ul>
      ${this.message?T`<p class="message">${this.message}</p>`:D}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${N(`Remove items`)}
        </button>
      </div>
    `}removeItemsBtnClicked(){this.dispatchEvent(new CustomEvent(`confirm`,{detail:{items:this.items}}))}static get styles(){return w`
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
    `}};V([A({type:Object})],vd.prototype,`items`,void 0),V([A({type:String})],vd.prototype,`message`,void 0),vd=V([k(`remove-items-modal-content`)],vd);var yd=class extends O{constructor(...e){super(...e),this.label=N(`Select items to remove`),this.selectedItems=[],this.showSelectAll=!1,this.showUnselectAll=!1,this.showItemManageButton=!1,this.removeAllowed=!1}render(){return T`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <div class="manage-buttons">
          <button class="ia-button dark" @click=${this.cancelClicked}>
            ${N(`Cancel`)}
          </button>
          <button
            class="ia-button danger"
            ?disabled=${!this.removeAllowed}
            @click=${this.showRemoveItemsModal}
          >
            ${N(`Remove selected items`)} (${this.selectedItems.length})...
          </button>
          ${to(this.showItemManageButton,()=>T` <button
                class="ia-button warning"
                ?disabled=${!this.removeAllowed}
                @click=${this.manageItemsClicked}
              >
                ${N(`Item Manager the items`)} (${this.selectedItems.length})
              </button>`)}
          <div class="selection-buttons">
            ${to(this.showSelectAll,()=>T` <button
                  class="ia-button link select-all-btn"
                  @click=${this.selectAllClicked}
                >
                  ${N(`Select all`)}
                </button>`)}
            ${to(this.showUnselectAll,()=>T` <button
                  class="ia-button link unselect-all-btn"
                  @click=${this.unselectAllClicked}
                >
                  ${N(`Unselect all`)}
                </button>`)}
          </div>
        </div>
      </div>
    `}get manageViewModalMsg(){let e=this.selectedItems.length>1?`these items`:`this item`,t=``;switch(this.profileElement){case`uploads`:t=`uploads list`;break;case`web_archives`:t=`web archives list`;break;case`favorites`:t=`favorites list`;break;default:return``}return N(or`Note: It may take a few minutes for ${e} to stop appearing in your ${t}.`)}cancelClicked(){this.dispatchEvent(new CustomEvent(`cancel`))}removeItemsClicked(){this.dispatchEvent(new CustomEvent(`removeItems`))}manageItemsClicked(){this.dispatchEvent(new CustomEvent(`manageItems`))}selectAllClicked(){this.dispatchEvent(new CustomEvent(`selectAll`))}unselectAllClicked(){this.dispatchEvent(new CustomEvent(`unselectAll`))}showRemoveItemsModal(){let e=T`
      <remove-items-modal-content
        .items=${this.selectedItems}
        .message=${this.manageViewModalMsg}
        @confirm=${()=>this.removeItemsClicked()}
      ></remove-items-modal-content>
    `,t=new Kl({showProcessingIndicator:!1,processingImageMode:`processing`,bodyColor:`#fff`,headerColor:`#194880`,showHeaderLogo:!1,closeOnBackdropClick:!0,title:T`${N(`Are you sure you want to remove these items?`)}`});this.modalManager?.classList.add(`remove-items`),this.modalManager?.showModal({config:t,customModalContent:e,userClosedModalCallback:()=>{this.modalManager?.classList.remove(`remove-items`)}})}showRemoveItemsProcessingModal(){let e=new Kl({showProcessingIndicator:!0,processingImageMode:`processing`,bodyColor:`#fff`,headerColor:`#194880`,showHeaderLogo:!1,closeOnBackdropClick:!0,title:T`${N(`Removing selected items...`)}`});this.modalManager?.classList.add(`remove-items`),this.modalManager?.showModal({config:e,userClosedModalCallback:()=>{this.modalManager?.classList.remove(`remove-items`)}})}showRemoveItemsErrorModal(){let e=new Kl({showProcessingIndicator:!1,processingImageMode:`processing`,bodyColor:`#fff`,headerColor:`#691916`,showHeaderLogo:!1,closeOnBackdropClick:!0,title:T`${N(`Error: unable to remove items`)}`,message:T`${N(`An error occurred while removing items. Please try again in a few minutes.`)}`});this.modalManager?.classList.add(`remove-items`),this.modalManager?.showModal({config:e,userClosedModalCallback:()=>{this.modalManager?.classList.remove(`remove-items`)}})}static get styles(){return w`
      ${_d}
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
    `}};V([A({type:String})],yd.prototype,`label`,void 0),V([A({type:Object})],yd.prototype,`modalManager`,void 0),V([A({type:Array})],yd.prototype,`selectedItems`,void 0),V([A({type:String})],yd.prototype,`profileElement`,void 0),V([A({type:Boolean})],yd.prototype,`showSelectAll`,void 0),V([A({type:Boolean})],yd.prototype,`showUnselectAll`,void 0),V([A({type:Boolean})],yd.prototype,`showItemManageButton`,void 0),V([A({type:Boolean})],yd.prototype,`removeAllowed`,void 0),yd=V([k(`manage-bar`)],yd);var bd=(e,t)=>{let n=e._$AN;if(n===void 0)return!1;for(let e of n)e._$AO?.(t,!1),bd(e,t);return!0},xd=e=>{let t,n;do{if((t=e._$AM)===void 0)break;n=t._$AN,n.delete(e),e=t}while(n?.size===0)},Sd=e=>{for(let t;t=e._$AM;e=t){let n=t._$AN;if(n===void 0)t._$AN=n=new Set;else if(n.has(e))break;n.add(e),Td(t)}};function Cd(e){this._$AN===void 0?this._$AM=e:(xd(this),this._$AM=e,Sd(this))}function wd(e,t=!1,n=0){let r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let e=n;e<r.length;e++)bd(r[e],!1),xd(r[e]);else r!=null&&(bd(r,!1),xd(r));else bd(this,e)}var Td=e=>{e.type==nr.CHILD&&(e._$AP??=wd,e._$AQ??=Cd)},Ed=class extends ir{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,t,n){super._$AT(e,t,n),Sd(this),this.isConnected=e._$AU}_$AO(e,t=!0){e!==this.isConnected&&(this.isConnected=e,e?this.reconnected?.():this.disconnected?.()),t&&(bd(this,e),xd(this))}setValue(e){if(Ka(this._$Ct))this._$Ct._$AI(e,this);else{let t=[...this._$Ct._$AH];t[this._$Ci]=e,this._$Ct._$AI(t,this,0)}}disconnected(){}reconnected(){}},Dd=new WeakMap,Od=rr(class extends Ed{render(e){return C}update(e,[t]){let n=t!==this.G;return n&&this.G!==void 0&&this.rt(void 0),(n||this.lt!==this.ct)&&(this.G=t,this.ht=e.options?.host,this.rt(this.ct=e.element)),C}rt(e){if(this.isConnected||(e=void 0),typeof this.G==`function`){let t=this.ht??globalThis,n=Dd.get(t);n===void 0&&(n=new WeakMap,Dd.set(t,n)),n.get(this.G)!==void 0&&this.G.call(this.ht,void 0),n.set(this.G,e),e!==void 0&&this.G.call(this.ht,e)}else this.G.value=e}get lt(){return typeof this.G==`function`?Dd.get(this.ht??globalThis)?.get(this.G):this.G?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}}),kd=3600,Ad=kd*24,jd=Ad*7,Md=1e3,Nd=60*Md,Pd=kd*Md,Fd=Ad*Md,Id=jd*Md,Ld=`millisecond`,Rd=`second`,zd=`minute`,Bd=`hour`,Vd=`week`,Hd=`month`,Ud=`quarter`,Wd=`year`,Gd=`date`,Kd=`Invalid Date`,qd=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Jd=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,Yd={name:`en`,weekdays:`Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday`.split(`_`),months:`January_February_March_April_May_June_July_August_September_October_November_December`.split(`_`),ordinal:function(e){var t=[`th`,`st`,`nd`,`rd`],n=e%100;return`[`+e+(t[(n-20)%10]||t[n]||t[0])+`]`}},Xd=function(e,t,n){var r=String(e);return!r||r.length>=t?e:``+Array(t+1-r.length).join(n)+e},Zd={s:Xd,z:function(e){var t=-e.utcOffset(),n=Math.abs(t),r=Math.floor(n/60),i=n%60;return(t<=0?`+`:`-`)+Xd(r,2,`0`)+`:`+Xd(i,2,`0`)},m:function e(t,n){if(t.date()<n.date())return-e(n,t);var r=(n.year()-t.year())*12+(n.month()-t.month()),i=t.clone().add(r,Hd),a=n-i<0,o=t.clone().add(r+(a?-1:1),Hd);return+(-(r+(n-i)/(a?i-o:o-i))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(e){return{M:`month`,y:`year`,w:`week`,d:`day`,D:`date`,h:`hour`,m:`minute`,s:`second`,ms:`millisecond`,Q:`quarter`}[e]||String(e||``).toLowerCase().replace(/s$/,``)},u:function(e){return e===void 0}},Qd=`en`,$d={};$d[Qd]=Yd;var ef=`$isDayjsObject`,tf=function(e){return e instanceof of||!!(e&&e[ef])},nf=function e(t,n,r){var i;if(!t)return Qd;if(typeof t==`string`){var a=t.toLowerCase();$d[a]&&(i=a),n&&($d[a]=n,i=a);var o=t.split(`-`);if(!i&&o.length>1)return e(o[0])}else{var s=t.name;$d[s]=t,i=s}return!r&&i&&(Qd=i),i||!r&&Qd},U=function(e,t){if(tf(e))return e.clone();var n=typeof t==`object`?t:{};return n.date=e,n.args=arguments,new of(n)},rf=function(e,t){return U(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})},W=Zd;W.l=nf,W.i=tf,W.w=rf;var af=function(e){var t=e.date,n=e.utc;if(t===null)return new Date(NaN);if(W.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t==`string`&&!/Z$/i.test(t)){var r=t.match(qd);if(r){var i=r[2]-1||0,a=(r[7]||`0`).substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,a)}}return new Date(t)},of=function(){function e(e){this.$L=nf(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[ef]=!0}var t=e.prototype;return t.parse=function(e){this.$d=af(e),this.init()},t.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},t.$utils=function(){return W},t.isValid=function(){return this.$d.toString()!==Kd},t.isSame=function(e,t){var n=U(e);return this.startOf(t)<=n&&n<=this.endOf(t)},t.isAfter=function(e,t){return U(e)<this.startOf(t)},t.isBefore=function(e,t){return this.endOf(t)<U(e)},t.$g=function(e,t,n){return W.u(e)?this[t]:this.set(n,e)},t.unix=function(){return Math.floor(this.valueOf()/1e3)},t.valueOf=function(){return this.$d.getTime()},t.startOf=function(e,t){var n=this,r=W.u(t)?!0:t,i=W.p(e),a=function(e,t){var i=W.w(n.$u?Date.UTC(n.$y,t,e):new Date(n.$y,t,e),n);return r?i:i.endOf(`day`)},o=function(e,t){return W.w(n.toDate()[e].apply(n.toDate(`s`),(r?[0,0,0,0]:[23,59,59,999]).slice(t)),n)},s=this.$W,c=this.$M,l=this.$D,u=`set`+(this.$u?`UTC`:``);switch(i){case Wd:return r?a(1,0):a(31,11);case Hd:return r?a(1,c):a(0,c+1);case Vd:var d=this.$locale().weekStart||0,f=(s<d?s+7:s)-d;return a(r?l-f:l+(6-f),c);case`day`:case Gd:return o(u+`Hours`,0);case Bd:return o(u+`Minutes`,1);case zd:return o(u+`Seconds`,2);case Rd:return o(u+`Milliseconds`,3);default:return this.clone()}},t.endOf=function(e){return this.startOf(e,!1)},t.$set=function(e,t){var n,r=W.p(e),i=`set`+(this.$u?`UTC`:``),a=(n={},n.day=i+`Date`,n[Gd]=i+`Date`,n[Hd]=i+`Month`,n[Wd]=i+`FullYear`,n[Bd]=i+`Hours`,n[zd]=i+`Minutes`,n[Rd]=i+`Seconds`,n[Ld]=i+`Milliseconds`,n)[r],o=r===`day`?this.$D+(t-this.$W):t;if(r===`month`||r===`year`){var s=this.clone().set(Gd,1);s.$d[a](o),s.init(),this.$d=s.set(Gd,Math.min(this.$D,s.daysInMonth())).$d}else a&&this.$d[a](o);return this.init(),this},t.set=function(e,t){return this.clone().$set(e,t)},t.get=function(e){return this[W.p(e)]()},t.add=function(e,t){var n=this,r;e=Number(e);var i=W.p(t),a=function(t){var r=U(n);return W.w(r.date(r.date()+Math.round(t*e)),n)};if(i===`month`)return this.set(Hd,this.$M+e);if(i===`year`)return this.set(Wd,this.$y+e);if(i===`day`)return a(1);if(i===`week`)return a(7);var o=(r={},r.minute=6e4,r.hour=36e5,r.second=1e3,r)[i]||1,s=this.$d.getTime()+e*o;return W.w(s,this)},t.subtract=function(e,t){return this.add(e*-1,t)},t.format=function(e){var t=this,n=this.$locale();if(!this.isValid())return n.invalidDate||`Invalid Date`;var r=e||`YYYY-MM-DDTHH:mm:ssZ`,i=W.z(this),a=this.$H,o=this.$m,s=this.$M,c=n.weekdays,l=n.months,u=n.meridiem,d=function(e,n,i,a){return e&&(e[n]||e(t,r))||i[n].slice(0,a)},f=function(e){return W.s(a%12||12,e,`0`)},p=u||function(e,t,n){var r=e<12?`AM`:`PM`;return n?r.toLowerCase():r},m=function(e){switch(e){case`YY`:return String(t.$y).slice(-2);case`YYYY`:return W.s(t.$y,4,`0`);case`M`:return s+1;case`MM`:return W.s(s+1,2,`0`);case`MMM`:return d(n.monthsShort,s,l,3);case`MMMM`:return d(l,s);case`D`:return t.$D;case`DD`:return W.s(t.$D,2,`0`);case`d`:return String(t.$W);case`dd`:return d(n.weekdaysMin,t.$W,c,2);case`ddd`:return d(n.weekdaysShort,t.$W,c,3);case`dddd`:return c[t.$W];case`H`:return String(a);case`HH`:return W.s(a,2,`0`);case`h`:return f(1);case`hh`:return f(2);case`a`:return p(a,o,!0);case`A`:return p(a,o,!1);case`m`:return String(o);case`mm`:return W.s(o,2,`0`);case`s`:return String(t.$s);case`ss`:return W.s(t.$s,2,`0`);case`SSS`:return W.s(t.$ms,3,`0`);case`Z`:return i;default:break}return null};return r.replace(Jd,function(e,t){return t||m(e)||i.replace(`:`,``)})},t.utcOffset=function(){return-Math.round(this.$d.getTimezoneOffset()/15)*15},t.diff=function(e,t,n){var r=this,i=W.p(t),a=U(e),o=(a.utcOffset()-this.utcOffset())*Nd,s=this-a,c=function(){return W.m(r,a)},l;switch(i){case Wd:l=c()/12;break;case Hd:l=c();break;case Ud:l=c()/3;break;case Vd:l=(s-o)/Id;break;case`day`:l=(s-o)/Fd;break;case Bd:l=s/Pd;break;case zd:l=s/Nd;break;case Rd:l=s/Md;break;default:l=s;break}return n?l:W.a(l)},t.daysInMonth=function(){return this.endOf(Hd).$D},t.$locale=function(){return $d[this.$L]},t.locale=function(e,t){if(!e)return this.$L;var n=this.clone(),r=nf(e,t,!0);return r&&(n.$L=r),n},t.clone=function(){return W.w(this.$d,this)},t.toDate=function(){return new Date(this.valueOf())},t.toJSON=function(){return this.isValid()?this.toISOString():null},t.toISOString=function(){return this.$d.toISOString()},t.toString=function(){return this.$d.toUTCString()},e}(),sf=of.prototype;U.prototype=sf,[[`$ms`,Ld],[`$s`,Rd],[`$m`,zd],[`$H`,Bd],[`$W`,`day`],[`$M`,Hd],[`$y`,Wd],[`$D`,Gd]].forEach(function(e){sf[e[1]]=function(t){return this.$g(t,e[0],e[1])}}),U.extend=function(e,t){return e.$i||=(e(t,of,U),!0),U},U.locale=nf,U.isDayjs=tf,U.unix=function(e){return U(e*1e3)},U.en=$d[Qd],U.Ls=$d,U.p={};var cf=function(e){return e.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(e,t,n){return t||n.slice(1)})},lf={LTS:`h:mm:ss A`,LT:`h:mm A`,L:`MM/DD/YYYY`,LL:`MMMM D, YYYY`,LLL:`MMMM D, YYYY h:mm A`,LLLL:`dddd, MMMM D, YYYY h:mm A`},uf=function(e,t){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(e,n,r){var i=r&&r.toUpperCase();return n||t[r]||lf[r]||cf(t[i])})},df=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,ff=/\d/,pf=/\d\d/,mf=/\d{3}/,hf=/\d{4}/,gf=/\d\d?/,_f=/[+-]?\d+/,vf=/[+-]\d\d:?(\d\d)?|Z/,yf=/\d*[^-_:/,()\s\d]+/,bf={},xf=function(e){return e=+e,e+(e>68?1900:2e3)};function Sf(e){if(!e||e===`Z`)return 0;var t=e.match(/([+-]|\d\d)/g),n=+(t[1]*60)+(+t[2]||0);return n===0?0:t[0]===`+`?-n:n}var Cf=function(e){return function(t){this[e]=+t}},wf=[vf,function(e){var t=this.zone||={};t.offset=Sf(e)}],Tf=function(e){var t=bf[e];return t&&(t.indexOf?t:t.s.concat(t.f))},Ef=function(e,t){var n,r=bf.meridiem;if(!r)n=e===(t?`pm`:`PM`);else for(var i=1;i<=24;i+=1)if(e.indexOf(r(i,0,t))>-1){n=i>12;break}return n},Df={A:[yf,function(e){this.afternoon=Ef(e,!1)}],a:[yf,function(e){this.afternoon=Ef(e,!0)}],Q:[ff,function(e){this.month=(e-1)*3+1}],S:[ff,function(e){this.milliseconds=e*100}],SS:[pf,function(e){this.milliseconds=e*10}],SSS:[mf,function(e){this.milliseconds=+e}],s:[gf,Cf(`seconds`)],ss:[gf,Cf(`seconds`)],m:[gf,Cf(`minutes`)],mm:[gf,Cf(`minutes`)],H:[gf,Cf(`hours`)],h:[gf,Cf(`hours`)],HH:[gf,Cf(`hours`)],hh:[gf,Cf(`hours`)],D:[gf,Cf(`day`)],DD:[pf,Cf(`day`)],Do:[yf,function(e){var t=bf.ordinal,n=e.match(/\d+/);if(this.day=n[0],t)for(var r=1;r<=31;r+=1)t(r).replace(/\[|\]/g,``)===e&&(this.day=r)}],w:[gf,Cf(`week`)],ww:[pf,Cf(`week`)],M:[gf,Cf(`month`)],MM:[pf,Cf(`month`)],MMM:[yf,function(e){var t=Tf(`months`),n=(Tf(`monthsShort`)||t.map(function(e){return e.slice(0,3)})).indexOf(e)+1;if(n<1)throw Error();this.month=n%12||n}],MMMM:[yf,function(e){var t=Tf(`months`).indexOf(e)+1;if(t<1)throw Error();this.month=t%12||t}],Y:[_f,Cf(`year`)],YY:[pf,function(e){this.year=xf(e)}],YYYY:[hf,Cf(`year`)],Z:wf,ZZ:wf};function Of(e){var t=e.afternoon;if(t!==void 0){var n=e.hours;t?n<12&&(e.hours+=12):n===12&&(e.hours=0),delete e.afternoon}}function kf(e){e=uf(e,bf&&bf.formats);for(var t=e.match(df),n=t.length,r=0;r<n;r+=1){var i=t[r],a=Df[i],o=a&&a[0],s=a&&a[1];s?t[r]={regex:o,parser:s}:t[r]=i.replace(/^\[|\]$/g,``)}return function(e){for(var r={},i=0,a=0;i<n;i+=1){var o=t[i];if(typeof o==`string`)a+=o.length;else{var s=o.regex,c=o.parser,l=e.slice(a),u=s.exec(l)[0];c.call(r,u),e=e.replace(u,``)}}return Of(r),r}}var Af=function(e,t,n,r){try{if([`x`,`X`].indexOf(t)>-1)return new Date((t===`X`?1e3:1)*e);var i=kf(t)(e),a=i.year,o=i.month,s=i.day,c=i.hours,l=i.minutes,u=i.seconds,d=i.milliseconds,f=i.zone,p=i.week,m=new Date,h=s||(!a&&!o?m.getDate():1),ee=a||m.getFullYear(),te=0;a&&!o||(te=o>0?o-1:m.getMonth());var ne=c||0,g=l||0,_=u||0,re=d||0;if(f)return new Date(Date.UTC(ee,te,h,ne,g,_,re+f.offset*60*1e3));if(n)return new Date(Date.UTC(ee,te,h,ne,g,_,re));var ie=new Date(ee,te,h,ne,g,_,re);return p&&(ie=r(ie).week(p).toDate()),ie}catch{return new Date(``)}},jf=(function(e,t,n){n.p.customParseFormat=!0,e&&e.parseTwoDigitYear&&(xf=e.parseTwoDigitYear);var r=t.prototype,i=r.parse;r.parse=function(e){var t=e.date,r=e.utc,a=e.args;this.$u=r;var o=a[1];if(typeof o==`string`){var s=a[2]===!0,c=a[3]===!0,l=s||c,u=a[2];c&&(u=a[2]),bf=this.$locale(),!s&&u&&(bf=n.Ls[u]),this.$d=Af(t,o,r,n),this.init(),u&&u!==!0&&(this.$L=this.locale(u).$L),l&&t!=this.format(o)&&(this.$d=new Date(``)),bf={}}else if(o instanceof Array)for(var d=o.length,f=1;f<=d;f+=1){a[1]=o[f-1];var p=n.apply(this,a);if(p.isValid()){this.$d=p.$d,this.$L=p.$L,this.init();break}f===d&&(this.$d=new Date(``))}else i.call(this,e)}});function Mf(e,t){let n=t.prototype,r=n.parse;n.parse=function(e){let t=e.date,n=e.args[1];r.call(this,e);let i=this.year(),a=i>=1900&&i<2e3,o=typeof n==`string`&&n.includes(`YYYY`),s=Array.isArray(n)&&typeof n[0]==`string`&&n[0].includes(`YYYY`),c=o||s,l=typeof t==`string`&&!t.includes(`${i}`);a&&c&&l&&(this.$d.setFullYear(i-1900),this.init())}}var Nf=window,Pf=Nf.trustedTypes,Ff=Pf?Pf.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,If=`$lit$`,Lf=`lit$${(Math.random()+``).slice(9)}$`,Rf=`?`+Lf,zf=`<${Rf}>`,Bf=document,Vf=()=>Bf.createComment(``),Hf=e=>e===null||typeof e!=`object`&&typeof e!=`function`,Uf=Array.isArray,Wf=e=>Uf(e)||typeof e?.[Symbol.iterator]==`function`,Gf=`[ 	
\f\r]`,Kf=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qf=/-->/g,Jf=/>/g,Yf=RegExp(`>|${Gf}(?:([^\\s"'>=/]+)(${Gf}*=${Gf}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Xf=/'/g,Zf=/"/g,Qf=/^(?:script|style|textarea|title)$/i,$f=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),ep=$f(1),tp=$f(2),np=Symbol.for(`lit-noChange`),rp=Symbol.for(`lit-nothing`),ip=new WeakMap,ap=Bf.createTreeWalker(Bf,129,null,!1);function op(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return Ff===void 0?t:Ff.createHTML(t)}var sp=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=Kf;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===Kf?c[1]===`!--`?o=qf:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Yf):(Qf.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Yf):o=Jf:o===Yf?c[0]===`>`?(o=i??Kf,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Yf:c[3]===`"`?Zf:Xf):o===Zf||o===Xf?o=Yf:o===qf||o===Jf?o=Kf:(o=Yf,i=void 0);let d=o===Yf&&e[t+1].startsWith(`/>`)?` `:``;a+=o===Kf?n+zf:l>=0?(r.push(s),n.slice(0,l)+If+n.slice(l)+Lf+d):n+Lf+(l===-2?(r.push(void 0),t):d)}return[op(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},cp=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=sp(t,n);if(this.el=e.createElement(l,r),ap.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=ap.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(If)||t.startsWith(Lf)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+If).split(Lf),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?pp:t[1]===`?`?hp:t[1]===`@`?gp:fp})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(Qf.test(i.tagName)){let e=i.textContent.split(Lf),t=e.length-1;if(t>0){i.textContent=Pf?Pf.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],Vf()),ap.nextNode(),c.push({type:2,index:++a});i.append(e[t],Vf())}}}else if(i.nodeType===8)if(i.data===Rf)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(Lf,e+1))!==-1;)c.push({type:7,index:a}),e+=Lf.length-1}a++}}static createElement(e,t){let n=Bf.createElement(`template`);return n.innerHTML=e,n}};function lp(e,t,n=e,r){var i,a;if(t===np)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=Hf(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=lp(e,o._$AS(e,t.values),o,r)),t}var up=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??Bf).importNode(t,!0);ap.currentNode=r;let i=ap.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new dp(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new _p(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=ap.nextNode(),a++)}return ap.currentNode=Bf,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},dp=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=rp,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=lp(this,e,t),Hf(e)?e===rp||e==null||e===``?(this._$AH!==rp&&this._$AR(),this._$AH=rp):e!==this._$AH&&e!==np&&this._(e):e._$litType$===void 0?e.nodeType===void 0?Wf(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==rp&&Hf(this._$AH)?this._$AA.nextSibling.data=e:this.$(Bf.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=cp.createElement(op(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new up(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=ip.get(e.strings);return t===void 0&&ip.set(e.strings,t=new cp(e)),t}T(t){Uf(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(Vf()),this.k(Vf()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},fp=class{constructor(e,t,n,r,i){this.type=1,this._$AH=rp,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=rp}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=lp(this,e,t,0),a=!Hf(e)||e!==this._$AH&&e!==np,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=lp(this,r[n+o],t,o),s===np&&(s=this._$AH[o]),a||=!Hf(s)||s!==this._$AH[o],s===rp?e=rp:e!==rp&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===rp?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},pp=class extends fp{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===rp?void 0:e}},mp=Pf?Pf.emptyScript:``,hp=class extends fp{constructor(){super(...arguments),this.type=4}j(e){e&&e!==rp?this.element.setAttribute(this.name,mp):this.element.removeAttribute(this.name)}},gp=class extends fp{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=lp(this,e,t,0)??rp)===np)return;let n=this._$AH,r=e===rp&&n!==rp||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==rp&&(n===rp||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},_p=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){lp(this,e)}},vp={O:If,P:Lf,A:Rf,C:1,M:sp,L:up,R:Wf,D:lp,I:dp,V:fp,H:hp,N:gp,U:pp,F:_p},yp=Nf.litHtmlPolyfillSupport;yp?.(cp,dp),(Nf.litHtmlVersions??=[]).push(`2.8.0`);var bp=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new dp(t.insertBefore(Vf(),e),e,void 0,n??{})}return i._$AI(e),i},xp,Sp=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=bp(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return np}};Sp.finalized=!0,Sp._$litElement$=!0,(xp=globalThis.litElementHydrateSupport)==null||xp.call(globalThis,{LitElement:Sp});var Cp=globalThis.litElementPolyfillSupport;Cp?.({LitElement:Sp}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var wp={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Tp=e=>(...t)=>({_$litDirective$:e,values:t}),Ep=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},{I:Dp}=vp,Op=e=>e.strings===void 0,kp={},Ap=(e,t=kp)=>e._$AH=t,jp=Tp(class extends Ep{constructor(e){if(super(e),e.type!==wp.PROPERTY&&e.type!==wp.ATTRIBUTE&&e.type!==wp.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Op(e))throw Error("`live` bindings can only contain a single expression")}render(e){return e}update(e,[t]){if(t===np||t===rp)return t;let n=e.element,r=e.name;if(e.type===wp.PROPERTY){if(t===n[r])return np}else if(e.type===wp.BOOLEAN_ATTRIBUTE){if(!!t===n.hasAttribute(r))return np}else if(e.type===wp.ATTRIBUTE&&n.getAttribute(r)===t+``)return np;return Ap(e),t}}),Mp=Tp(class extends Ep{constructor(e){if(super(e),e.type!==wp.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter((t=>e[t])).join(` `)+` `}update(e,[t]){var n;if(this.it===void 0){this.it=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter((e=>e!==``))));for(let e in t)t[e]&&!this.nt?.has(e)&&this.it.add(e);return this.render(t)}let r=e.element.classList;this.it.forEach((e=>{e in t||(r.remove(e),this.it.delete(e))}));for(let e in t){let i=!!t[e];i===this.it.has(e)||(n=this.nt)!=null&&n.has(e)||(i?(r.add(e),this.it.add(e)):(r.remove(e),this.it.delete(e)))}return np}}),Np=`important`,Pp=` !`+Np,Fp=Tp(class extends Ep{constructor(e){if(super(e),e.type!==wp.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`}),``)}update(e,[t]){let{style:n}=e.element;if(this.ht===void 0){this.ht=new Set;for(let e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{t[e]??(this.ht.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=``)}));for(let e in t){let r=t[e];if(r!=null){this.ht.add(e);let t=typeof r==`string`&&r.endsWith(Pp);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?Np:``):n[e]=r}}return np}});U.extend(jf),U.extend(Mf);var Ip=180,Lp=40,Rp=10,zp=125,Bp=30,Vp=`YYYY`,Hp=`no data`,Up=0,Wp=`item`,Gp=4,Kp={linear:e=>e,logarithmic:e=>Math.log1p(e)},qp=P`var(--histogramDateRangeSliderColor, #4B65FE)`,Jp=P`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`,Yp=P`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`,Xp=P`var(--histogramDateRangeActivityIndicator, #2C2C2C)`,Zp=P`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`,Qp=P`var(--histogramDateRangeInputRowMargin, 0)`,$p=P`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`,em=P`var(--histogramDateRangeInputWidth, 35px)`,tm=P`var(--histogramDateRangeInputFontSize, 1.2rem)`,nm=P`var(--histogramDateRangeInputFontFamily, sans-serif)`,rm=P`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`,im=P`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`,am=P`var(--histogramDateRangeTooltipFontSize, 1.1rem)`,om=P`var(--histogramDateRangeTooltipFontFamily, sans-serif)`,G=class extends Sp{constructor(){super(...arguments),this.width=Ip,this.height=Lp,this.sliderWidth=Rp,this.tooltipWidth=zp,this.tooltipHeight=Bp,this.updateDelay=Up,this.dateFormat=Vp,this.missingDataMessage=Hp,this.minDate=``,this.maxDate=``,this.disabled=!1,this.bins=[],this.updateWhileFocused=!1,this.binSnapping=`none`,this.tooltipLabel=Wp,this.barScaling=`logarithmic`,this._tooltipOffsetX=0,this._tooltipOffsetY=0,this._isDragging=!1,this._isLoading=!1,this._minSelectedDate=``,this._maxSelectedDate=``,this._minDateMS=0,this._maxDateMS=0,this._dragOffset=0,this._histWidth=0,this._binWidth=0,this._histData=[],this._previousDateRange=``,this.drag=e=>{e.preventDefault(),!this.disabled&&(this.setDragOffset(e),this._isDragging=!0,this.addListeners(),this.cancelPendingUpdateEvent())},this.drop=()=>{this._isDragging&&(this.removeListeners(),this.beginEmitUpdateProcess()),this._isDragging=!1},this.move=e=>{let t=this.getBoundingClientRect().x,n=e.clientX-t-this._dragOffset;this._currentSlider.id===`slider-min`?this.minSelectedDate=this.translatePositionToDate(this.validMinSliderX(n)):(this.maxSelectedDate=this.translatePositionToDate(this.validMaxSliderX(n)),this.getMSFromString(this.maxSelectedDate)>this._maxDateMS&&(this.maxSelectedDate=this.maxDate))}}disconnectedCallback(){this.removeListeners(),super.disconnectedCallback()}willUpdate(e){(e.has(`bins`)||e.has(`minDate`)||e.has(`maxDate`)||e.has(`minSelectedDate`)||e.has(`maxSelectedDate`)||e.has(`width`)||e.has(`height`)||e.has(`binSnapping`)||e.has(`barScaling`))&&this.handleDataUpdate()}handleDataUpdate(){this.hasBinData&&(this._histWidth=this.width-this.sliderWidth*2,this._minDateMS=this.snapTimestamp(this.getMSFromString(this.minDate)),this._maxDateMS=this.snapTimestamp(this.getMSFromString(this.maxDate)+this.snapInterval)+this.snapEndOffset,this._binWidth=this._histWidth/this._numBins,this._histData=this.calculateHistData(),this.minSelectedDate=this.minSelectedDate?this.minSelectedDate:this.minDate,this.maxSelectedDate=this.maxSelectedDate?this.maxSelectedDate:this.maxDate)}snapToNextSecond(e){return Math.ceil(e/1e3)*1e3}snapToMonth(e){let t=U(e),n=t.date()<16?0:1;return t.add(n,`month`).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapToYear(e){let t=U(e),n=t.month()<6?0:1;return t.add(n,`year`).month(0).date(1).hour(0).minute(0).second(0).millisecond(0).valueOf()}snapTimestamp(e){switch(this.binSnapping){case`year`:return this.snapToYear(e);case`month`:return this.snapToMonth(e);default:return this.snapToNextSecond(e)}}get barScalingFunction(){return typeof this.barScaling==`string`?Kp[this.barScaling]:this.barScaling}calculateHistData(){let{bins:e,height:t,dateRangeMS:n,_numBins:r,_minDateMS:i}=this,a=Math.min(...this.bins),o=Math.max(...this.bins),s=t/(a===o?1:this.barScalingFunction(o)),c=n/r;return e.map((e,t)=>{let n=this.snapTimestamp(t*c+i),r=this.formatDate(n),a=this.snapTimestamp((t+1)*c+i)+this.snapEndOffset,o=this.formatDate(a),l=this.formatDate(n,this.tooltipDateFormat),u=this.formatDate(a,this.tooltipDateFormat),d=l===u?l:`${l} - ${u}`;return{value:e,height:Math.floor(this.barScalingFunction(e)*s),binStart:r,binEnd:o,tooltip:d}})}get hasBinData(){return this._numBins>0}get _numBins(){return!this.bins||!this.bins.length?0:this.bins.length}get histogramLeftEdgeX(){return this.sliderWidth}get histogramRightEdgeX(){return this.width-this.sliderWidth}get snapInterval(){switch(this.binSnapping){case`year`:return 31536e6;case`month`:return 2592e6;default:return 0}}get snapEndOffset(){return this.binSnapping!==`none`&&this._numBins>1?-1:0}get tooltipDateFormat(){return this._tooltipDateFormat??this.dateFormat}set tooltipDateFormat(e){this._tooltipDateFormat=e}get loading(){return this._isLoading}set loading(e){this.disabled=e,this._isLoading=e}get minSelectedDate(){return this.formatDate(this.getMSFromString(this._minSelectedDate))}set minSelectedDate(e){if(!this._minSelectedDate){this._minSelectedDate=e;return}let t=this.getMSFromString(e),n=!Number.isNaN(t),r=t<=this.getMSFromString(this.maxSelectedDate);n&&r&&(this._minSelectedDate=this.formatDate(t)),this.requestUpdate()}get maxSelectedDate(){return this.formatDate(this.getMSFromString(this._maxSelectedDate))}set maxSelectedDate(e){if(!this._maxSelectedDate){this._maxSelectedDate=e;return}let t=this.getMSFromString(e),n=!Number.isNaN(t),r=t>=this.getMSFromString(this.minSelectedDate);n&&r&&(this._maxSelectedDate=this.formatDate(t)),this.requestUpdate()}get minSliderX(){let e=this.translateDateToPosition(this.minSelectedDate);return this.validMinSliderX(e)}get maxSliderX(){let e=this.snapTimestamp(this.getMSFromString(this.maxSelectedDate)+this.snapInterval),t=this.translateDateToPosition(this.formatDate(e));return this.validMaxSliderX(t)}get dateRangeMS(){return this._maxDateMS-this._minDateMS}showTooltip(e){var t,n;if(this._isDragging||this.disabled)return;let r=e.currentTarget,i=r.x.baseVal.value+this.sliderWidth/2,a=r.dataset,o=`${this.tooltipLabel}${a.numItems===`1`?``:`s`}`,s=Number(a.numItems).toLocaleString(),c=9+this.tooltipHeight,l=this.getBoundingClientRect(),u=l.x+i,d=l.y;this._tooltipOffsetX=u-2+(this._binWidth-this.sliderWidth-this.tooltipWidth)/2+window.scrollX,this._tooltipOffsetY=d-c+window.scrollY,this._tooltipContent=ep`
      ${s} ${o}<br />
      ${a.tooltip}
    `,(n=(t=this._tooltip).showPopover)==null||n.call(t)}hideTooltip(){var e,t;this._tooltipContent=void 0,(t=(e=this._tooltip).hidePopover)==null||t.call(e)}validMinSliderX(e){let t=Math.min(this.translateDateToPosition(this.maxSelectedDate),this.histogramRightEdgeX);return e=this.clamp(e,this.histogramLeftEdgeX,t),Number.isNaN(e)||t<this.histogramLeftEdgeX?this.histogramLeftEdgeX:e}validMaxSliderX(e){let t=Math.max(this.histogramLeftEdgeX,this.translateDateToPosition(this.minSelectedDate));return e=this.clamp(e,t,this.histogramRightEdgeX),Number.isNaN(e)||t>this.histogramRightEdgeX?this.histogramRightEdgeX:e}addListeners(){window.addEventListener(`pointermove`,this.move),window.addEventListener(`pointerup`,this.drop),window.addEventListener(`pointercancel`,this.drop)}removeListeners(){window.removeEventListener(`pointermove`,this.move),window.removeEventListener(`pointerup`,this.drop),window.removeEventListener(`pointercancel`,this.drop)}beginEmitUpdateProcess(){this.cancelPendingUpdateEvent(),this._emitUpdatedEventTimer=setTimeout(()=>{if(this.currentDateRangeString===this._previousDateRange)return;this._previousDateRange=this.currentDateRangeString;let e={detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate},bubbles:!0,composed:!0};this.dispatchEvent(new CustomEvent(`histogramDateRangeUpdated`,e))},this.updateDelay)}cancelPendingUpdateEvent(){this._emitUpdatedEventTimer!==void 0&&(clearTimeout(this._emitUpdatedEventTimer),this._emitUpdatedEventTimer=void 0)}setDragOffset(e){this._currentSlider=e.currentTarget;let t=this._currentSlider.id===`slider-min`?this.minSliderX:this.maxSliderX,n=this.getBoundingClientRect().x;this._dragOffset=e.clientX-n-t}translatePositionToDate(e){let t=this.snapToNextSecond((e-this.sliderWidth)*this.dateRangeMS/this._histWidth);return this.formatDate(this._minDateMS+t)}translateDateToPosition(e){let t=this.getMSFromString(e);return this.sliderWidth+(t-this._minDateMS)*this._histWidth/this.dateRangeMS}clamp(e,t,n){return Math.min(Math.max(e,t),n)}handleInputFocus(){this.updateWhileFocused||this.cancelPendingUpdateEvent()}handleMinDateInput(e){let t=e.currentTarget;t.value!==this.minSelectedDate&&(this.minSelectedDate=t.value,this.beginEmitUpdateProcess())}handleMaxDateInput(e){let t=e.currentTarget;t.value!==this.maxSelectedDate&&(this.maxSelectedDate=t.value,this.beginEmitUpdateProcess())}handleKeyUp(e){if(e.key===`Enter`){let t=e.currentTarget;t.blur(),t.id===`date-min`?this.handleMinDateInput(e):t.id===`date-max`&&this.handleMaxDateInput(e)}}get currentDateRangeString(){return`${this.minSelectedDate}:${this.maxSelectedDate}`}getMSFromString(e){let t=typeof e==`string`?e:String(e);if((t.split(/(\d+)/).length-1)/2==1){let e=new Date(0,0);return e.setFullYear(Number(t)),e.getTime()}return U(t,[this.dateFormat,Vp]).valueOf()}handleBarClick(e){let t=e.currentTarget.dataset,n=(this.getMSFromString(t.binStart)+this.getMSFromString(t.binEnd))/2;Math.abs(n-this.getMSFromString(this.minSelectedDate))<Math.abs(n-this.getMSFromString(this.maxSelectedDate))?this.minSelectedDate=t.binStart:this.maxSelectedDate=t.binEnd,this.beginEmitUpdateProcess()}get minSliderTemplate(){let e=Gp,t=`
            M${this.minSliderX},0
            h-${this.sliderWidth-e}
            q-${e},0 -${e},${e}
            v${this.height-e*2}
            q0,${e} ${e},${e}
            h${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.minSliderX,`slider-min`,t)}get maxSliderTemplate(){let e=Gp,t=`
            M${this.maxSliderX},0
            h${this.sliderWidth-e}
            q${e},0 ${e},${e}
            v${this.height-e*2}
            q0,${e} -${e},${e}
            h-${this.sliderWidth-e}
          `;return this.generateSliderSVG(this.maxSliderX,`slider-max`,t)}generateSliderSVG(e,t,n){let r=t===`slider-min`?1:-1;return tp`
    <svg
      id=${t}
      class=${Mp({slider:!0,draggable:!this.disabled,dragging:this._isDragging})}
      @pointerdown=${this.drag}
    >
      <path d="${n} z" fill="${qp}" />
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
    `}get selectedRangeTemplate(){return tp`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX-this.minSliderX}"
        height="${this.height}"
        fill="${Jp}"
      />`}get histogramTemplate(){let e=this._histWidth/this._numBins,t=e-1,n=this.sliderWidth;return this._histData.map(r=>{let{minSelectedDate:i,maxSelectedDate:a}=this,o=r.height,s=this.isBefore(r.binEnd,i),c=this.isAfter(r.binStart,a),l=s||c?Zp:Yp,u=`stroke-dasharray: 0 ${t} ${o} ${t} 0 ${o}`,d=tp`
        <rect
          class="bar-pointer-target"
          x=${n}
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
          style=${u}
          x=${n}
          y=${this.height-o}
          width=${t}
          height=${o}
          fill=${l}
        />`;return n+=e,d})}isBefore(e,t){return this.getMSFromString(e)<this.getMSFromString(t)}isAfter(e,t){return this.getMSFromString(e)>this.getMSFromString(t)}formatDate(e,t=this.dateFormat){if(Number.isNaN(e))return``;let n=U(e);return n.year()<1e3?n.year(199999).format(t).replace(/199999/g,n.year().toString()):n.format(t)}get minInputTemplate(){return ep`
      <input
        id="date-min"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMinDateInput}
        @keyup=${this.handleKeyUp}
        .value=${jp(this.minSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get maxInputTemplate(){return ep`
      <input
        id="date-max"
        placeholder=${this.dateFormat}
        type="text"
        @focus=${this.handleInputFocus}
        @blur=${this.handleMaxDateInput}
        @keyup=${this.handleKeyUp}
        .value=${jp(this.maxSelectedDate)}
        ?disabled=${this.disabled}
      />
    `}get minLabelTemplate(){return ep`<label for="date-min" class="sr-only">Minimum date:</label>`}get maxLabelTemplate(){return ep`<label for="date-max" class="sr-only">Maximum date:</label>`}get tooltipTemplate(){return ep`
      <div id="tooltip" style=${Fp({width:`${this.tooltipWidth}px`,height:`${this.tooltipHeight}px`,top:`${this._tooltipOffsetY}px`,left:`${this._tooltipOffsetX}px`})} popover>${this._tooltipContent}</div>
    `}get histogramAccessibilityTemplate(){let e=``;return this.minSelectedDate&&this.maxSelectedDate?e=` from ${this.minSelectedDate} to ${this.maxSelectedDate}`:this.minSelectedDate?e=` from ${this.minSelectedDate}`:this.maxSelectedDate&&(e=` up to ${this.maxSelectedDate}`),ep`<title id="histogram-title">${`Filter results for dates${e}`}</title
      ><desc id="histogram-desc">${`This histogram shows the distribution of dates${e}`}</desc>`}get noDataTemplate(){return ep`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `}get activityIndicatorTemplate(){return this.loading?ep`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `:rp}render(){return this.hasBinData?ep`
      <div
        id="container"
        class="
          noselect
          ${this._isDragging?`dragging`:``}
        "
        style="width: ${this.width}px"
      >
        ${this.activityIndicatorTemplate} ${this.tooltipTemplate}
        <div
          class="inner-container
          ${this.disabled?`disabled`:``}"
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
    `:this.noDataTemplate}};G.styles=P`
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
      --activityIndicatorLoadingRingColor: ${Xp};
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
      background: ${rm};
      margin: 0;
      border: 0;
      color: ${im};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${am};
      font-family: ${om};
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
      border: 5px solid ${im};
      border-color: ${rm} transparent transparent
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
      margin: ${Qp};
    }
    #inputs .dash {
      position: relative;
      bottom: -1px;
      align-self: center; /* Otherwise the dash sticks to the top while the inputs grow */
    }
    input {
      width: ${em};
      margin: 0 3px;
      border: ${$p};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${tm};
      font-family: ${nm};
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
  `,t([I({type:Number})],G.prototype,`width`,void 0),t([I({type:Number})],G.prototype,`height`,void 0),t([I({type:Number})],G.prototype,`sliderWidth`,void 0),t([I({type:Number})],G.prototype,`tooltipWidth`,void 0),t([I({type:Number})],G.prototype,`tooltipHeight`,void 0),t([I({type:Number})],G.prototype,`updateDelay`,void 0),t([I({type:String})],G.prototype,`dateFormat`,void 0),t([I({type:String})],G.prototype,`missingDataMessage`,void 0),t([I({type:String})],G.prototype,`minDate`,void 0),t([I({type:String})],G.prototype,`maxDate`,void 0),t([I({type:Boolean})],G.prototype,`disabled`,void 0),t([I({type:Array})],G.prototype,`bins`,void 0),t([I({type:Boolean})],G.prototype,`updateWhileFocused`,void 0),t([I({type:String})],G.prototype,`binSnapping`,void 0),t([I({type:String})],G.prototype,`tooltipLabel`,void 0),t([I({type:String})],G.prototype,`barScaling`,void 0),t([L()],G.prototype,`_tooltipOffsetX`,void 0),t([L()],G.prototype,`_tooltipOffsetY`,void 0),t([L()],G.prototype,`_tooltipContent`,void 0),t([L()],G.prototype,`_tooltipDateFormat`,void 0),t([L()],G.prototype,`_isDragging`,void 0),t([L()],G.prototype,`_isLoading`,void 0),t([bi(`#tooltip`)],G.prototype,`_tooltip`,void 0),t([I({type:String})],G.prototype,`tooltipDateFormat`,null),t([I({type:Boolean})],G.prototype,`loading`,null),t([I()],G.prototype,`minSelectedDate`,null),t([I()],G.prototype,`maxSelectedDate`,null),G=t([gi(`histogram-date-range`)],G);var sm=window,cm=sm.trustedTypes,lm=cm?cm.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,um=`$lit$`,dm=`lit$${(Math.random()+``).slice(9)}$`,fm=`?`+dm,pm=`<${fm}>`,mm=document,hm=()=>mm.createComment(``),gm=e=>e===null||typeof e!=`object`&&typeof e!=`function`,_m=Array.isArray,vm=e=>_m(e)||typeof e?.[Symbol.iterator]==`function`,ym=`[ 	
\f\r]`,bm=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,xm=/-->/g,Sm=/>/g,Cm=RegExp(`>|${ym}(?:([^\\s"'>=/]+)(${ym}*=${ym}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),wm=/'/g,Tm=/"/g,Em=/^(?:script|style|textarea|title)$/i,Dm=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),K=Dm(1),Om=Dm(2),km=Symbol.for(`lit-noChange`),q=Symbol.for(`lit-nothing`),Am=new WeakMap,jm=mm.createTreeWalker(mm,129,null,!1);function Mm(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return lm===void 0?t:lm.createHTML(t)}var Nm=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=bm;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===bm?c[1]===`!--`?o=xm:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Cm):(Em.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Cm):o=Sm:o===Cm?c[0]===`>`?(o=i??bm,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Cm:c[3]===`"`?Tm:wm):o===Tm||o===wm?o=Cm:o===xm||o===Sm?o=bm:(o=Cm,i=void 0);let d=o===Cm&&e[t+1].startsWith(`/>`)?` `:``;a+=o===bm?n+pm:l>=0?(r.push(s),n.slice(0,l)+um+n.slice(l)+dm+d):n+dm+(l===-2?(r.push(void 0),t):d)}return[Mm(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},Pm=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Nm(t,n);if(this.el=e.createElement(l,r),jm.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=jm.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(um)||t.startsWith(dm)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+um).split(dm),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?zm:t[1]===`?`?Vm:t[1]===`@`?Hm:Rm})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(Em.test(i.tagName)){let e=i.textContent.split(dm),t=e.length-1;if(t>0){i.textContent=cm?cm.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],hm()),jm.nextNode(),c.push({type:2,index:++a});i.append(e[t],hm())}}}else if(i.nodeType===8)if(i.data===fm)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(dm,e+1))!==-1;)c.push({type:7,index:a}),e+=dm.length-1}a++}}static createElement(e,t){let n=mm.createElement(`template`);return n.innerHTML=e,n}};function Fm(e,t,n=e,r){var i,a;if(t===km)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=gm(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=Fm(e,o._$AS(e,t.values),o,r)),t}var Im=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??mm).importNode(t,!0);jm.currentNode=r;let i=jm.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Lm(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Um(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=jm.nextNode(),a++)}return jm.currentNode=mm,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Lm=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Fm(this,e,t),gm(e)?e===q||e==null||e===``?(this._$AH!==q&&this._$AR(),this._$AH=q):e!==this._$AH&&e!==km&&this._(e):e._$litType$===void 0?e.nodeType===void 0?vm(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==q&&gm(this._$AH)?this._$AA.nextSibling.data=e:this.$(mm.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Pm.createElement(Mm(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new Im(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=Am.get(e.strings);return t===void 0&&Am.set(e.strings,t=new Pm(e)),t}T(t){_m(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(hm()),this.k(hm()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},Rm=class{constructor(e,t,n,r,i){this.type=1,this._$AH=q,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=q}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Fm(this,e,t,0),a=!gm(e)||e!==this._$AH&&e!==km,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Fm(this,r[n+o],t,o),s===km&&(s=this._$AH[o]),a||=!gm(s)||s!==this._$AH[o],s===q?e=q:e!==q&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},zm=class extends Rm{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===q?void 0:e}},Bm=cm?cm.emptyScript:``,Vm=class extends Rm{constructor(){super(...arguments),this.type=4}j(e){e&&e!==q?this.element.setAttribute(this.name,Bm):this.element.removeAttribute(this.name)}},Hm=class extends Rm{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Fm(this,e,t,0)??q)===km)return;let n=this._$AH,r=e===q&&n!==q||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==q&&(n===q||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Um=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Fm(this,e)}},Wm=sm.litHtmlPolyfillSupport;Wm?.(Pm,Lm),(sm.litHtmlVersions??=[]).push(`2.8.0`);var Gm=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Lm(t.insertBefore(hm(),e),e,void 0,n??{})}return i._$AI(e),i},Km,qm=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Gm(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return km}};qm.finalized=!0,qm._$litElement$=!0,(Km=globalThis.litElementHydrateSupport)==null||Km.call(globalThis,{LitElement:qm});var Jm=globalThis.litElementPolyfillSupport;Jm?.({LitElement:qm}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var Ym=Om`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`,Xm=Om`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`,J=class extends qm{constructor(){super(...arguments),this.prompt=`Do you find this feature useful?`,this.buttonText=`Beta`,this.displayMode=`button`,this.isOpen=!1,this.processing=!1,this.popupTopX=0,this.popupTopY=0,this.voteSubmitted=!1,this.voteNeedsChoosing=!1,this.resizingElement=document.body}render(){return K`
      <div id="container">
        ${this.displayMode===`vote-prompt`?this.votePromptDisplay:this.singleButtonDisplay}
      </div>
    `}firstUpdated(){this.boundEscapeListener=this.handleEscape.bind(this),this.boundScrollListener=this.handleScroll.bind(this)}updated(e){if(e.has(`vote`)&&this.vote&&(this.error=void 0,this.voteNeedsChoosing=!1),e.has(`resizeObserver`)){let t=e.get(`resizeObserver`);this.disconnectResizeObserver(t)}}handleResize(){this.isOpen&&this.positionPopup()}handleScroll(){this.isOpen&&this.positionPopup()}disconnectedCallback(){this.removeEscapeListener(),this.disconnectResizeObserver(this.resizeObserver)}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}async setupRecaptcha(){this.recaptchaManager&&(this.recaptchaWidget=await this.recaptchaManager.getRecaptchaWidget())}resetState(){this.vote=void 0,this.voteSubmitted=!1,this.error=void 0,this.voteNeedsChoosing=!1,this.comments.value=``}async showPopup(){this.voteSubmitted&&this.displayMode===`button`||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,await this.setupRecaptcha())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){let e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight,i=n/2,a=r/2;e.left<i?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX=Math.max(0,this.popupTopX),this.popupTopX+t.width>n&&(this.popupTopX=n-t.width),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height}handleEscape(e){e.key===`Escape`&&this.cancel(e)}setupEscapeListener(){document.addEventListener(`keyup`,this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener(`keyup`,this.boundEscapeListener)}setupScrollObserver(){document.addEventListener(`scroll`,this.boundScrollListener)}stopScrollObserver(){document.removeEventListener(`scroll`,this.boundScrollListener)}get singleButtonDisplay(){return K`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted?this.upvoteButtonClass:``}"
          >${Ym}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted?this.downvoteButtonClass:``}"
          id="beta-button-thumb-down"
          >${Xm}</span
        >
      </button>
      ${this.popupTemplate}
    `}get votePromptDisplay(){return K`
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
            ${Ym}
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
            ${Xm}
          </label>
          <button id="comment-button" type="button" @click=${this.showPopup}>
            Leave a comment
          </button>
        </div>
      </form>
      ${this.popupTemplate}
    `}get popupTemplate(){return K`
      <div
        id="popup-background"
        class=${this.isOpen?`open`:`closed`}
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
                ${Ym}
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
                ${Xm}
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
            ${this.error?K`<div id="error">${this.error}</div>`:q}
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
                .value=${this.processing?`Submitting...`:`Submit feedback`}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `}get upvoteSelected(){return this.vote===`up`}get downvoteSelected(){return this.vote===`down`}upvoteKeypressed(e){(e.key===`Enter`||e.key===` `)&&this.upvoteButtonSelected()}downvoteKeypressed(e){(e.key===`Enter`||e.key===` `)&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote===`up`?void 0:`up`,this.handleButtonSelection())}downvoteButtonSelected(){this.processing||this.voteSubmitted||(this.vote=this.vote===`down`?void 0:`down`,this.handleButtonSelection())}async handleButtonSelection(){this.isOpen||(await this.setupRecaptcha(),this.submit())}get chooseVoteErrorClass(){return this.voteNeedsChoosing?`error`:``}get upvoteButtonClass(){switch(this.vote){case`up`:return`selected`;case`down`:return`unselected`;default:return`noselection`}}get downvoteButtonClass(){switch(this.vote){case`up`:return`unselected`;case`down`:return`selected`;default:return`noselection`}}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.voteSubmitted||this.resetState()}async submit(e){if(e?.preventDefault(),!this.vote){this.voteNeedsChoosing=!0,this.error=K`Please select a vote.`;return}if(!this.featureIdentifier)throw Error(`featureIdentifier is required`);if(!this.featureFeedbackService)throw Error(`featureFeedbackService is required`);if(!this.recaptchaWidget)throw Error(`recaptchaWidget is required`);let t=this.isOpen;this.processing=!0;try{let e=await this.recaptchaWidget.execute();(await this.featureFeedbackService.submitFeedback({featureIdentifier:this.featureIdentifier,vote:this.vote,comments:this.comments.value,recaptchaToken:e})).success?(this.voteSubmitted=!0,t&&this.closePopup()):this.error=K`There was an error submitting your feedback.`}catch(e){this.error=K`There was an error submitting your feedback.<br />Error:
        ${e instanceof Error?e.message:e}`}this.processing=!1}static get styles(){let e=P`var(--featureFeedbackBlueColor, #194880)`,t=P`var(--featureFeedbackDarkGrayColor, #767676)`,n=P`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=P`var(--featureFeedbackBackdropZindex, 5)`,i=P`var(--featureFeedbackModalZindex, 6)`,a=P`var(--featureFeedbackPopupBorderColor, ${e})`,o=P`var(--featureFeedbackSubmitButtonColor, ${e})`,s=P`var(--featureFeedbackBetaButtonBorderColor, ${e})`,c=P`var(--featureFeedbackBetaButtonTextColor, ${e})`,l=P`var(--featureFeedbackBetaButtonSvgFilter, ${n})`,u=P`var(--featureFeedbackCancelButtonColor, #515151)`,d=P`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,f=P`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`,p=P`var(--featureFeedbackPromptFontWeight, bold)`,m=P`var(--featureFeedbackPromptFontSize, 1.4rem)`,h=P`var(--featureFeedbackCommentButtonFontWeight, normal)`,ee=P`var(--featureFeedbackCommentButtonFontWeight, 1.4rem)`,te=P`var(--defaultColor, ${t});`,ne=P`var(--defaultColorSvgFilter, ${n});`,g=P`var(--upvoteColor, #23765D);`,_=P`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`,re=P`var(--downvoteColor, #720D11);`,ie=P`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`,ae=P`var(--unselectedColor, #CCCCCC);`,oe=P`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;return P`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${c};
        border: 1px solid ${s};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${l};
      }

      .beta-button-thumb.unselected svg {
        filter: ${oe};
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
        background-color: ${d};
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
        background-color: ${f};
        border: 1px ${a} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${i};
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
        font-size: ${m};
        font-weight: ${p};
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
        background-color: ${u};
      }

      #submit-button {
        background-color: ${o};
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
        border-color: ${te};
      }

      .vote-button.noselection svg {
        filter: ${ne};
      }

      .vote-button.unselected {
        border-color: ${ae};
      }

      .vote-button.unselected svg {
        filter: ${oe};
      }

      .upvote-button.selected {
        border-color: ${g};
      }

      .upvote-button.selected svg {
        filter: ${_};
      }

      .downvote-button.selected {
        border-color: ${re};
      }

      .downvote-button.selected svg {
        filter: ${ie};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      form[disabled] .vote-button.unselected {
        cursor: not-allowed;
      }

      #comment-button {
        color: var(--ia-theme-link-color, #4b64ff);
        font-weight: ${h};
        font-size: ${ee};
      }
      #comment-button:not([disabled]):hover,
      #comment-button:not([disabled]):active {
        text-decoration: underline;
      }
    `}};t([I({type:String})],J.prototype,`featureIdentifier`,void 0),t([I({type:String})],J.prototype,`prompt`,void 0),t([I({type:String})],J.prototype,`buttonText`,void 0),t([I({type:String})],J.prototype,`displayMode`,void 0),t([I({type:Object})],J.prototype,`recaptchaManager`,void 0),t([I({type:Object})],J.prototype,`resizeObserver`,void 0),t([I({type:Boolean})],J.prototype,`disabled`,void 0),t([I({type:Object})],J.prototype,`featureFeedbackService`,void 0),t([L()],J.prototype,`isOpen`,void 0),t([L()],J.prototype,`processing`,void 0),t([L()],J.prototype,`popupTopX`,void 0),t([L()],J.prototype,`popupTopY`,void 0),t([L()],J.prototype,`vote`,void 0),t([L()],J.prototype,`voteSubmitted`,void 0),t([L()],J.prototype,`error`,void 0),t([L()],J.prototype,`voteNeedsChoosing`,void 0),t([L()],J.prototype,`recaptchaWidget`,void 0),t([bi(`#container`)],J.prototype,`container`,void 0),t([bi(`#popup`)],J.prototype,`popup`,void 0),t([bi(`#comments`)],J.prototype,`comments`,void 0),J=t([gi(`feature-feedback`)],J);var Zm={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Qm=e=>(...t)=>({_$litDirective$:e,values:t}),$m=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,n){this._$Ct=e,this._$AM=t,this._$Ci=n}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}},eh=`important`,th=` !`+eh,nh=Qm(class extends $m{constructor(e){if(super(e),e.type!==Zm.ATTRIBUTE||e.name!==`style`||e.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(e){return Object.keys(e).reduce(((t,n)=>{let r=e[n];return r==null?t:t+`${n=n.includes(`-`)?n:n.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,`-$&`).toLowerCase()}:${r};`}),``)}update(e,[t]){let{style:n}=e.element;if(this.ht===void 0){this.ht=new Set;for(let e in t)this.ht.add(e);return this.render(t)}this.ht.forEach((e=>{t[e]??(this.ht.delete(e),e.includes(`-`)?n.removeProperty(e):n[e]=``)}));for(let e in t){let r=t[e];if(r!=null){this.ht.add(e);let t=typeof r==`string`&&r.endsWith(th);e.includes(`-`)||t?n.setProperty(e,t?r.slice(0,-11):r,t?eh:``):n[e]=r}}return km}}),rh=e=>typeof e!=`string`&&`strTag`in e,ih=(e,t,n)=>{let r=e[0];for(let i=1;i<e.length;i++)r+=t[n?n[i-1]:i-1],r+=e[i];return r},ah=(e=>rh(e)?ih(e.strings,e.values):e),oh=class{constructor(){this.settled=!1,this.promise=new Promise((e,t)=>{this._resolve=e,this._reject=t})}resolve(e){this.settled=!0,this._resolve(e)}reject(e){this.settled=!0,this._reject(e)}},sh=[];for(let e=0;e<256;e++)sh[e]=(e>>4&15).toString(16)+(e&15).toString(16);new oh().resolve();var ch=ah,lh=window,uh=lh.trustedTypes,dh=uh?uh.createPolicy(`lit-html`,{createHTML:e=>e}):void 0,fh=`$lit$`,ph=`lit$${(Math.random()+``).slice(9)}$`,mh=`?`+ph,hh=`<${mh}>`,gh=document,_h=()=>gh.createComment(``),vh=e=>e===null||typeof e!=`object`&&typeof e!=`function`,yh=Array.isArray,bh=e=>yh(e)||typeof e?.[Symbol.iterator]==`function`,xh=`[ 	
\f\r]`,Sh=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ch=/-->/g,wh=/>/g,Th=RegExp(`>|${xh}(?:([^\\s"'>=/]+)(${xh}*=${xh}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,`g`),Eh=/'/g,Dh=/"/g,Oh=/^(?:script|style|textarea|title)$/i,kh=Symbol.for(`lit-noChange`),Ah=Symbol.for(`lit-nothing`),jh=new WeakMap,Mh=gh.createTreeWalker(gh,129,null,!1);function Nh(e,t){if(!Array.isArray(e)||!e.hasOwnProperty(`raw`))throw Error(`invalid template strings array`);return dh===void 0?t:dh.createHTML(t)}var Ph=(e,t)=>{let n=e.length-1,r=[],i,a=t===2?`<svg>`:``,o=Sh;for(let t=0;t<n;t++){let n=e[t],s,c,l=-1,u=0;for(;u<n.length&&(o.lastIndex=u,c=o.exec(n),c!==null);)u=o.lastIndex,o===Sh?c[1]===`!--`?o=Ch:c[1]===void 0?c[2]===void 0?c[3]!==void 0&&(o=Th):(Oh.test(c[2])&&(i=RegExp(`</`+c[2],`g`)),o=Th):o=wh:o===Th?c[0]===`>`?(o=i??Sh,l=-1):c[1]===void 0?l=-2:(l=o.lastIndex-c[2].length,s=c[1],o=c[3]===void 0?Th:c[3]===`"`?Dh:Eh):o===Dh||o===Eh?o=Th:o===Ch||o===wh?o=Sh:(o=Th,i=void 0);let d=o===Th&&e[t+1].startsWith(`/>`)?` `:``;a+=o===Sh?n+hh:l>=0?(r.push(s),n.slice(0,l)+fh+n.slice(l)+ph+d):n+ph+(l===-2?(r.push(void 0),t):d)}return[Nh(e,a+(e[n]||`<?>`)+(t===2?`</svg>`:``)),r]},Fh=class e{constructor({strings:t,_$litType$:n},r){let i;this.parts=[];let a=0,o=0,s=t.length-1,c=this.parts,[l,u]=Ph(t,n);if(this.el=e.createElement(l,r),Mh.currentNode=this.el.content,n===2){let e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;(i=Mh.nextNode())!==null&&c.length<s;){if(i.nodeType===1){if(i.hasAttributes()){let e=[];for(let t of i.getAttributeNames())if(t.endsWith(fh)||t.startsWith(ph)){let n=u[o++];if(e.push(t),n!==void 0){let e=i.getAttribute(n.toLowerCase()+fh).split(ph),t=/([.?@])?(.*)/.exec(n);c.push({type:1,index:a,name:t[2],strings:e,ctor:t[1]===`.`?Bh:t[1]===`?`?Hh:t[1]===`@`?Uh:zh})}else c.push({type:6,index:a})}for(let t of e)i.removeAttribute(t)}if(Oh.test(i.tagName)){let e=i.textContent.split(ph),t=e.length-1;if(t>0){i.textContent=uh?uh.emptyScript:``;for(let n=0;n<t;n++)i.append(e[n],_h()),Mh.nextNode(),c.push({type:2,index:++a});i.append(e[t],_h())}}}else if(i.nodeType===8)if(i.data===mh)c.push({type:2,index:a});else{let e=-1;for(;(e=i.data.indexOf(ph,e+1))!==-1;)c.push({type:7,index:a}),e+=ph.length-1}a++}}static createElement(e,t){let n=gh.createElement(`template`);return n.innerHTML=e,n}};function Ih(e,t,n=e,r){var i,a;if(t===kh)return t;let o=r===void 0?n._$Cl:n._$Co?.[r],s=vh(t)?void 0:t._$litDirective$;return o?.constructor!==s&&((i=o?._$AO)==null||i.call(o,!1),s===void 0?o=void 0:(o=new s(e),o._$AT(e,n,r)),r===void 0?n._$Cl=o:((a=n)._$Co??(a._$Co=[]))[r]=o),o!==void 0&&(t=Ih(e,o._$AS(e,t.values),o,r)),t}var Lh=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:n}=this._$AD,r=(e?.creationScope??gh).importNode(t,!0);Mh.currentNode=r;let i=Mh.nextNode(),a=0,o=0,s=n[0];for(;s!==void 0;){if(a===s.index){let t;s.type===2?t=new Rh(i,i.nextSibling,this,e):s.type===1?t=new s.ctor(i,s.name,s.strings,this,e):s.type===6&&(t=new Wh(i,this,e)),this._$AV.push(t),s=n[++o]}a!==s?.index&&(i=Mh.nextNode(),a++)}return Mh.currentNode=gh,r}v(e){let t=0;for(let n of this._$AV)n!==void 0&&(n.strings===void 0?n._$AI(e[t]):(n._$AI(e,n,t),t+=n.strings.length-2)),t++}},Rh=class e{constructor(e,t,n,r){var i;this.type=2,this._$AH=Ah,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=r,this._$Cp=(i=r?.isConnected)==null||i}get _$AU(){return this._$AM?._$AU??this._$Cp}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Ih(this,e,t),vh(e)?e===Ah||e==null||e===``?(this._$AH!==Ah&&this._$AR(),this._$AH=Ah):e!==this._$AH&&e!==kh&&this._(e):e._$litType$===void 0?e.nodeType===void 0?bh(e)?this.T(e):this._(e):this.$(e):this.g(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==Ah&&vh(this._$AH)?this._$AA.nextSibling.data=e:this.$(gh.createTextNode(e)),this._$AH=e}g(e){let{values:t,_$litType$:n}=e,r=typeof n==`number`?this._$AC(e):(n.el===void 0&&(n.el=Fh.createElement(Nh(n.h,n.h[0]),this.options)),n);if(this._$AH?._$AD===r)this._$AH.v(t);else{let e=new Lh(r,this),n=e.u(this.options);e.v(t),this.$(n),this._$AH=e}}_$AC(e){let t=jh.get(e.strings);return t===void 0&&jh.set(e.strings,t=new Fh(e)),t}T(t){yh(this._$AH)||(this._$AH=[],this._$AR());let n=this._$AH,r,i=0;for(let a of t)i===n.length?n.push(r=new e(this.k(_h()),this.k(_h()),this,this.options)):r=n[i],r._$AI(a),i++;i<n.length&&(this._$AR(r&&r._$AB.nextSibling,i),n.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for((n=this._$AP)==null||n.call(this,!1,!0,t);e&&e!==this._$AB;){let t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;this._$AM===void 0&&(this._$Cp=e,(t=this._$AP)==null||t.call(this,e))}},zh=class{constructor(e,t,n,r,i){this.type=1,this._$AH=Ah,this._$AN=void 0,this.element=e,this.name=t,this._$AM=r,this.options=i,n.length>2||n[0]!==``||n[1]!==``?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=Ah}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,r){let i=this.strings,a=!1;if(i===void 0)e=Ih(this,e,t,0),a=!vh(e)||e!==this._$AH&&e!==kh,a&&(this._$AH=e);else{let r=e,o,s;for(e=i[0],o=0;o<i.length-1;o++)s=Ih(this,r[n+o],t,o),s===kh&&(s=this._$AH[o]),a||=!vh(s)||s!==this._$AH[o],s===Ah?e=Ah:e!==Ah&&(e+=(s??``)+i[o+1]),this._$AH[o]=s}a&&!r&&this.j(e)}j(e){e===Ah?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??``)}},Bh=class extends zh{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Ah?void 0:e}},Vh=uh?uh.emptyScript:``,Hh=class extends zh{constructor(){super(...arguments),this.type=4}j(e){e&&e!==Ah?this.element.setAttribute(this.name,Vh):this.element.removeAttribute(this.name)}},Uh=class extends zh{constructor(e,t,n,r,i){super(e,t,n,r,i),this.type=5}_$AI(e,t=this){if((e=Ih(this,e,t,0)??Ah)===kh)return;let n=this._$AH,r=e===Ah&&n!==Ah||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,i=e!==Ah&&(n===Ah||r);r&&this.element.removeEventListener(this.name,this,n),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH==`function`?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Wh=class{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){Ih(this,e)}},Gh=lh.litHtmlPolyfillSupport;Gh?.(Fh,Rh),(lh.litHtmlVersions??=[]).push(`2.8.0`);var Kh=(e,t,n)=>{let r=n?.renderBefore??t,i=r._$litPart$;if(i===void 0){let e=n?.renderBefore??null;r._$litPart$=i=new Rh(t.insertBefore(_h(),e),e,void 0,n??{})}return i._$AI(e),i},qh,Jh=class extends Dr{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;let t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Kh(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return kh}};Jh.finalized=!0,Jh._$litElement$=!0,(qh=globalThis.litElementHydrateSupport)==null||qh.call(globalThis,{LitElement:Jh});var Yh=globalThis.litElementPolyfillSupport;Yh?.({LitElement:Jh}),(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push(`3.3.3`);var Xh=P`var(--white, #fff)`,Zh=P`var(--ia-theme-link-color, #4b64ff)`,Qh=P`var(--primaryDisableCTAFill, #767676)`,$h=P`var(--secondaryCTABorder, #999)`,eg=P`var(--primaryCTAFill, #194880)`,tg=P`var(--primaryCTAFillRGB, 25, 72, 128)`,ng=P`var(--primaryCTABorder, #c5d1df)`,rg=P`var(--primaryErrorCTAFill, #d9534f)`,ig=P`var(--primaryErrorCTAFillRGB, 229, 28, 38)`,ag=P`var(--primaryErrorCTABorder, #d43f3a)`,og=P`var(--secondaryCTAFill, #333)`,sg=P`var(--secondaryCTAFillRGB, 51, 51, 51)`,cg=P`var(--primaryCTABorder, #979797)`,lg=P`var(---primaryWarningFill, #ee8950)`,ug=P`var(--primaryWarningFillRGB, 238, 137, 80)`,dg=P`
  .ia-button {
    min-height: 3rem;
    cursor: pointer;
    color: ${Xh};
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
    outline-color: ${Xh};
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
    background-color: ${Qh};
    border: 1px solid ${$h};
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
    background-color: ${eg};
    border-color: ${ng};
  }
  .ia-button.primary:hover {
    background-color: rgba(${tg}, 0.9);
  }
  .ia-button.primary:focus-visible {
    background-color: rgba(${tg}, 0.8);
  }
  .ia-button.primary:active {
    background-color: rgba(${tg}, 0.7);
  }

  .ia-button.danger {
    background-color: ${rg};
    border-color: ${ag};
  }
  .ia-button.danger:hover {
    background-color: rgba(${ig}, 0.9);
  }
  .ia-button.danger:focus-visible {
    background-color: rgba(${ig}, 0.8);
  }
  .ia-button.danger:active {
    background-color: rgba(${ig}, 0.7);
  }

  .ia-button.warning {
    background-color: ${lg};
    border-color: ${P`var(--primaryWarningBorder, #ec7939)`};
  }
  .ia-button.warning:hover {
    background-color: rgba(${ug}, 0.9);
  }
  .ia-button.warning:focus-visible {
    background-color: rgba(${ug}, 0.8);
  }
  .ia-button.warning:active {
    background-color: rgba(${ug}, 0.7);
  }

  .ia-button.dark {
    background-color: ${og};
    border-color: ${cg};
  }
  .ia-button.dark:hover {
    background-color: rgba(${sg}, 0.9);
  }
  .ia-button.dark:focus-visible {
    background-color: rgba(${sg}, 0.8);
  }
  .ia-button.dark:active {
    background-color: rgba(${sg}, 0.7);
  }

  .ia-button.link {
    margin: 0;
    padding: 6px;
    border: 0;
    appearance: none;
    background: none;
    color: ${Zh};
    text-decoration: none;
    cursor: pointer;
  }
  .ia-button.link:hover {
    text-decoration: underline;
  }
`;P`
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
`;function fg(e){return`disabled`in e&&typeof e.disabled==`boolean`}function pg(e){return`numbered`in e&&typeof e.numbered==`boolean`}function mg(e){return`validate`in e&&typeof e.validate==`function`}function hg(e){return`response`in e&&typeof e.response==`object`&&e.response!==null&&`name`in e.response&&typeof e.response.name==`string`}var gg=class extends Error{};async function _g(e,t,n=`Operation timed out`){let r=new Promise((e,r)=>setTimeout(r,t,new gg(n)));return Promise.race([e,r])}var vg,Y=vg=class extends qm{constructor(){super(...arguments),this.buttonText=`Feedback`,this.showButtonThumbs=!1,this.showQuestionNumbers=!1,this.disabled=!1,this.submitTimeout=8e3,this.isOpen=!1,this.submissionState=`idle`,this.popupTopX=0,this.popupTopY=0,this.resizingElement=document.body,this.handleScroll=()=>{this.isOpen&&this.positionPopup()},this.handleEscape=e=>{e.key===`Escape`&&this.cancel(e)}}render(){return K`<div id="container">${this.feedbackButtonTemplate}</div>`}willUpdate(e){if(e.has(`submissionState`)&&(this.isProcessing||this.isSubmitted?this.disableSlottedChildren():this.restoreSlottedChildrenDisabledStates()),e.has(`resizeObserver`)){let t=e.get(`resizeObserver`);this.disconnectResizeObserver(t)}}updated(e){(e.has(`showQuestionNumbers`)||e.has(`assignedElements`))&&this.applyQuestionNumbers();let t=e.get(`submissionState`);t&&(this.submissionState===`error`||t===`error`)&&this.positionPopup(),e.has(`isOpen`)&&this.isOpen&&this.focusFirstFormElement()}disconnectedCallback(){this.removeEscapeListener(),this.stopScrollObserver(),this.disconnectResizeObserver(this.resizeObserver)}disableSlottedChildren(){this.assignedElements.filter(fg).forEach(e=>{e.dataset.originallyDisabled=e.disabled?`true`:`false`,e.disabled=!0})}restoreSlottedChildrenDisabledStates(){this.assignedElements.filter(fg).forEach(e=>{let{originallyDisabled:t}=e.dataset;if(t===void 0)return;let n=t===`true`;delete e.dataset.originallyDisabled,e.disabled=n})}handleResize(){this.isOpen&&this.positionPopup()}setupEscapeListener(){document.addEventListener(`keyup`,this.handleEscape)}removeEscapeListener(){document.removeEventListener(`keyup`,this.handleEscape)}setupScrollObserver(){document.addEventListener(`scroll`,this.handleScroll)}stopScrollObserver(){document.removeEventListener(`scroll`,this.handleScroll)}setupResizeObserver(){this.resizeObserver&&this.resizeObserver.addObserver({handler:this,target:this.resizingElement})}disconnectResizeObserver(e){(e??this.resizeObserver)?.removeObserver({handler:this,target:this.resizingElement})}getRecaptchaWidget(){if(this.recaptchaWidgetPromise)return this.recaptchaWidgetPromise;if(this.recaptchaManager)return this.recaptchaWidgetPromise=this.recaptchaManager.getRecaptchaWidget(),this.recaptchaWidgetPromise}resetSubmissionState(){this.setSubmissionState(`idle`),this.error=void 0}setSubmissionState(e){this.submissionState!==e&&(this.submissionState=e,this.emitSubmissionStateChanged())}emitSubmissionStateChanged(){this.dispatchEvent(new CustomEvent(`submissionStateChanged`,{detail:this.submissionState}))}get isProcessing(){return this.submissionState===`processing`}get isSubmitted(){return this.submissionState===`submitted`}showPopup(){this.isSubmitted||(this.setupResizeObserver(),this.setupScrollObserver(),this.setupEscapeListener(),this.positionPopup(),this.isOpen=!0,this.getRecaptchaWidget())}closePopup(){this.disconnectResizeObserver(),this.stopScrollObserver(),this.removeEscapeListener(),this.isOpen=!1}positionPopup(){let e=this.container.getBoundingClientRect(),t=this.popup.getBoundingClientRect(),n=window.innerWidth,r=window.innerHeight,i=n/2,a=r/2;e.left<i?this.popupTopX=e.right-20:this.popupTopX=e.left+20-t.width,this.popupTopX+t.width>n&&(this.popupTopX=n-t.width-5),e.top<a?this.popupTopY=e.bottom-10:this.popupTopY=e.top+10-t.height,this.popupTopY+t.height>r&&(this.popupTopY=r-t.height-5),this.popupTopX=Math.max(5,this.popupTopX),this.popupTopY=Math.max(5,this.popupTopY)}get feedbackButtonThumbsTemplate(){return this.showButtonThumbs?K`
      <span class="beta-button-icon">${Ym}</span>
      <span class="beta-button-icon">${Xm}</span>
    `:q}get feedbackButtonCheckTemplate(){return K`<span class="beta-button-icon success">&check;</span>`}get feedbackButtonTemplate(){return K`
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
    `}get popupTemplate(){let e=this.isProcessing||this.isSubmitted,t=this.isProcessing?vg.SUBMIT_BUTTON_PROCESSING_TEXT:vg.SUBMIT_BUTTON_NORMAL_TEXT,n=this.error?K`<div id="error">${this.error}</div>`:q,r=nh({left:`${this.popupTopX}px`,top:`${this.popupTopY}px`}),i=e=>e.stopPropagation();return K`
      <div
        id="popup-background"
        class=${this.isOpen?`open`:`closed`}
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
          <h2 id="survey-heading" class="sr-only">${ch(`Feedback Survey`)}</h2>
          <form
            id="form"
            ?disabled=${e}
            @click=${i}
            @keydown=${i}
            @submit=${this.submit}
          >
            <slot id="questions-slot"></slot>
            ${n}
            <div id="actions">
              <button
                type="button"
                id="cancel-button"
                class="cta-button ia-button dark"
                tabindex="0"
                ?disabled=${e}
                @click=${this.cancel}
              >
                ${ch(`Cancel`)}
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
    `}focusFirstFormElement(){let e=this.getRootNode();for(let t of this.assignedElements)if(t.focus(),e.activeElement===t)return;this.focusCancelButton()}focusCancelButton(){this.cancelButton.focus()}focusSubmitButton(){this.submitButton.focus()}applyQuestionNumbers(){if(!this.showQuestionNumbers){this.assignedElements.forEach(e=>{var t;(t=e.querySelector(`[slot=question-number]`))==null||t.remove()});return}let e=1;this.assignedElements.filter(e=>pg(e)&&e.numbered).forEach(t=>{let n=t.querySelector(`[slot=question-number]`);n||(n=document.createElement(`span`),n.setAttribute(`slot`,`question-number`)),n.textContent=`${e}. `,t.append(n),e+=1})}backgroundClicked(e){e.target instanceof Node&&(this.popup?.contains(e.target)||this.cancel(e))}cancel(e){e.preventDefault(),this.closePopup(),this.isSubmitted||this.resetSubmissionState()}validate(){return this.assignedElements.filter(mg).map(e=>e.validate()).every(e=>e)}async submit(e){if(e?.preventDefault(),!this.validate()){this.error=K`${vg.ERROR_MESSAGE_MISSING_REQUIRED_INPUT}`,this.setSubmissionState(`error`);return}let{surveyIdentifier:t,submitTimeout:n,featureFeedbackService:r}=this;if(this.error=void 0,!t)throw Error(`surveyIdentifier is required`);if(!r)throw Error(`featureFeedbackService is required`);let i=this.getRecaptchaWidget(),a;try{a=await _g(i,n)}catch(e){throw Error(`recaptchaWidget load failed: ${e}`)}if(!a)throw Error(`recaptchaWidget is required`);let o=this.isOpen;this.setSubmissionState(`processing`);try{let e=await _g(a.execute(),n);(await _g(r.submitSurvey({surveyIdentifier:t,responses:this.assignedElements.filter(hg).map(e=>e.response),recaptchaToken:e}),n)).success?(this.setSubmissionState(`submitted`),o&&this.closePopup()):(this.error=K`${vg.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}`,this.setSubmissionState(`error`))}catch(e){this.error=K`${vg.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED}
        <br />
        ${ch(`Error: `)}${e instanceof Error?e.message:e}`,this.setSubmissionState(`error`)}}static get styles(){let e=P`var(--featureFeedbackBlueColor, #194880)`,t=P`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,n=P`var(--featureFeedbackBackdropZindex, 5)`,r=P`var(--featureFeedbackModalZindex, 6)`,i=P`var(--featureFeedbackPopupMaxWidth, 300px)`,a=P`var(--featureFeedbackPopupVerticalPadding, 10px)`,o=P`
      ${a} ${P`var(--featureFeedbackPopupHorizontalPadding, 10px)`}
    `,s=P`var(--featureFeedbackPopupBorderColor, ${e})`,c=P`var(--featureFeedbackBetaButtonBorderColor, ${e})`,l=P`var(--featureFeedbackBetaButtonTextColor, ${e})`,u=P`var(--featureFeedbackBetaButtonSvgFilter, ${t})`,d=P`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`,f=P`var(--featureFeedbackPopupBackgroundColor, #FBFBFD)`;return[dg,P`
      #container {
        display: inline-block;
      }

      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${l};
        border: 1px solid ${c};
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
        filter: ${u};
      }

      .beta-button-icon.success {
        filter: ${P`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`};
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
        z-index: ${n};
        background-color: ${d};
        overflow: hidden;
      }

      #popup-background.closed {
        visibility: hidden;
        top: -100%;
        left: -100%;
      }

      #popup {
        position: absolute;
        max-width: ${i};
        max-height: calc(100vh - 2 * ${a} - 10px);
        padding: ${o};
        border: 1px ${s} solid;
        border-radius: 5px;
        background-color: ${f};
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
    `]}};Y.SUBMIT_BUTTON_NORMAL_TEXT=ch(`Submit feedback`),Y.SUBMIT_BUTTON_PROCESSING_TEXT=ch(`Submitting...`),Y.ERROR_MESSAGE_MISSING_REQUIRED_INPUT=ch(`Please respond to the indicated questions.`),Y.ERROR_MESSAGE_SUBMIT_REQUEST_FAILED=ch(`There was an error submitting your feedback.`),t([I({type:String})],Y.prototype,`surveyIdentifier`,void 0),t([I({type:String})],Y.prototype,`buttonText`,void 0),t([I({type:Boolean})],Y.prototype,`showButtonThumbs`,void 0),t([I({type:Boolean})],Y.prototype,`showQuestionNumbers`,void 0),t([I({type:Boolean})],Y.prototype,`disabled`,void 0),t([I({type:Number})],Y.prototype,`submitTimeout`,void 0),t([I({type:Object})],Y.prototype,`featureFeedbackService`,void 0),t([I({type:Object})],Y.prototype,`recaptchaManager`,void 0),t([I({type:Object})],Y.prototype,`resizeObserver`,void 0),t([L()],Y.prototype,`isOpen`,void 0),t([L()],Y.prototype,`submissionState`,void 0),t([L()],Y.prototype,`popupTopX`,void 0),t([L()],Y.prototype,`popupTopY`,void 0),t([L()],Y.prototype,`error`,void 0),t([bi(`#container`)],Y.prototype,`container`,void 0),t([bi(`#popup`)],Y.prototype,`popup`,void 0),t([bi(`#cancel-button`)],Y.prototype,`cancelButton`,void 0),t([bi(`#submit-button`)],Y.prototype,`submitButton`,void 0),t([Ci()],Y.prototype,`assignedElements`,void 0),Y=vg=t([gi(`ia-feedback-survey`)],Y);var yg,bg=yg=class extends qm{constructor(){super(),this.prompt=``,this.value=``,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return K`
      <div id="container">
        ${this.promptTextTemplate}${this.commentBoxTemplate}
      </div>
    `}willUpdate(e){e.has(`required`)&&(this.internals.ariaRequired=this.required.toString()),e.has(`disabled`)&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.commentBox.value?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},`A comment is required.`),this.internals.reportValidity()}get numbered(){return!this.skipNumber}get response(){return{name:this.prompt,comment:this.value}}get promptTextTemplate(){return this.prompt?K`<div id="prompt-text">${this.numbered?K`<slot name="question-number"></slot>`:q}${this.prompt}</div>`:q}get commentBoxTemplate(){let e=this.required?yg.DEFAULT_PLACEHOLDER_REQUIRED:yg.DEFAULT_PLACEHOLDER_OPTIONAL;return K`
      <textarea
        id="comments"
        tabindex="0"
        placeholder=${this.placeholder??e}
        aria-labelledby="prompt-text"
        aria-required=${this.required}
        .value=${this.value}
        ?disabled=${this.disabled}
        @change=${this.commentChanged}
      ></textarea>
    `}commentChanged(){this.disabled||(this.value=this.commentBox.value,this.value&&this.internals.setValidity({}),this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent(`responseChanged`,{detail:this.response}))}static get styles(){let e=P`var(--commentHeight, 50px)`,t=P`var(--commentResize, none)`,n=P`var(--surveyQuestionMargin, 0 0 15px 0)`,r=P`var(--featureFeedbackPromptFontWeight, bold)`;return P`
      #container {
        margin: ${n};
      }

      #prompt-text {
        text-align: left;
        margin-bottom: 5px;
        flex-grow: 1;
        font-size: ${P`var(--featureFeedbackPromptFontSize, 1.4rem)`};
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
    `}};bg.DEFAULT_PLACEHOLDER_REQUIRED=ch(`Comments`),bg.DEFAULT_PLACEHOLDER_OPTIONAL=ch(`Comments (optional)`),bg.formAssociated=!0,bg.shadowRootOptions={...qm.shadowRootOptions,delegatesFocus:!0},t([I({type:String})],bg.prototype,`prompt`,void 0),t([I({type:String})],bg.prototype,`value`,void 0),t([I({type:Boolean,reflect:!0})],bg.prototype,`required`,void 0),t([I({type:Boolean,reflect:!0})],bg.prototype,`disabled`,void 0),t([I({type:Boolean,reflect:!0})],bg.prototype,`skipNumber`,void 0),t([I({type:String})],bg.prototype,`placeholder`,void 0),t([bi(`#comments`)],bg.prototype,`commentBox`,void 0),bg=yg=t([gi(`ia-survey-comment`)],bg);var xg=Qm(class extends $m{constructor(e){if(super(e),e.type!==Zm.ATTRIBUTE||e.name!==`class`||e.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(e){return` `+Object.keys(e).filter((t=>e[t])).join(` `)+` `}update(e,[t]){var n;if(this.it===void 0){this.it=new Set,e.strings!==void 0&&(this.nt=new Set(e.strings.join(` `).split(/\s/).filter((e=>e!==``))));for(let e in t)t[e]&&!this.nt?.has(e)&&this.it.add(e);return this.render(t)}let r=e.element.classList;this.it.forEach((e=>{e in t||(r.remove(e),this.it.delete(e))}));for(let e in t){let i=!!t[e];i===this.it.has(e)||(n=this.nt)!=null&&n.has(e)||(i?(r.add(e),this.it.add(e)):(r.remove(e),this.it.delete(e)))}return km}}),Sg,Cg=Sg=class extends qm{constructor(){super(),this.prompt=``,this.vote=void 0,this.required=!1,this.disabled=!1,this.skipNumber=!1,this.showComments=!1,this.visible=!0,this.internals=this.attachInternals()}render(){return K`
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
    `}willUpdate(e){e.has(`required`)&&(this.internals.ariaRequired=this.required.toString()),e.has(`disabled`)&&(this.internals.ariaDisabled=this.disabled.toString())}validate(){return!this.required||this.vote?this.internals.setValidity({}):this.internals.setValidity({valueMissing:!0},`A vote is required.`),this.internals.checkValidity()}get numbered(){return!this.skipNumber}get response(){return{...this.commentBox?.response,name:this.prompt,rating:this.vote}}get promptTextTemplate(){return this.prompt?K`<div id="prompt-text">${this.numbered?K`<slot name="question-number"></slot>`:q}${this.prompt}</div>`:q}get voteButtonsTemplate(){let e=this.vote===`up`,t=this.vote===`down`,n={"vote-button":!0,noselection:this.vote===void 0},r=xg({...n,selected:e,unselected:t}),i=xg({...n,selected:t,unselected:e});return K`
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
        ${Ym}
        <span class="sr-only">${Sg.UPVOTE_SR_LABEL}</span>
      </label>

      <label
        id="downvote"
        class=${i}
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
        ${Xm}
        <span class="sr-only">${Sg.DOWNVOTE_SR_LABEL}</span>
      </label>
    `}get commentFieldTemplate(){return this.showComments?K`
      <ia-survey-comment
        id="comments"
        skipNumber
        .value=${this.comment??``}
        .placeholder=${this.commentPlaceholder}
        ?disabled=${this.disabled}
        @responseChanged=${this.commentChanged}
      ></ia-survey-comment>
    `:q}upvoteKeyPressed(e){(e.key===`Enter`||e.key===` `)&&this.upvoteButtonSelected()}downvoteKeyPressed(e){(e.key===`Enter`||e.key===` `)&&this.downvoteButtonSelected()}upvoteButtonSelected(){this.handleVoteButtonSelection(`up`)}downvoteButtonSelected(){this.handleVoteButtonSelection(`down`)}handleVoteButtonSelection(e){this.disabled||(this.vote=e,this.internals.setValidity({}),this.emitResponseChangedEvent())}commentChanged(e){e.stopPropagation(),!this.disabled&&(this.comment=this.commentBox?.value,this.emitResponseChangedEvent())}emitResponseChangedEvent(){this.dispatchEvent(new CustomEvent(`responseChanged`,{detail:this.response}))}static get styles(){let e=P`var(--surveyQuestionMargin, 0 0 15px 0)`,t=P`var(--featureFeedbackDarkGrayColor, #767676)`,n=P`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`,r=P`var(--defaultColor, ${t})`,i=P`var(--defaultColorSvgFilter, ${n})`,a=P`var(--upvoteColor, #23765D)`,o=P`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%))`,s=P`var(--downvoteColor, #720D11)`,c=P`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%))`,l=P`var(--unselectedColor, #CCCCCC)`,u=P`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%))`,d=P`var(--featureFeedbackPromptFontWeight, bold)`;return P`
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
        font-size: ${P`var(--featureFeedbackPromptFontSize, 1.4rem)`};
        font-weight: ${d};
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
        filter: ${i};
      }

      .vote-button.unselected {
        border-color: ${l};
      }

      .vote-button.unselected svg {
        filter: ${u};
      }

      #upvote.selected {
        border-color: ${a};
      }

      #upvote.selected svg {
        filter: ${o};
      }

      #downvote.selected {
        border-color: ${s};
      }

      #downvote.selected svg {
        filter: ${c};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }

      .vote-button.noselection[disabled],
      .vote-button.unselected[disabled] {
        border-color: ${l};
        cursor: not-allowed;
      }

      .vote-button.noselection[disabled] svg,
      .vote-button.unselected[disabled] svg {
        filter: ${u};
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
    `}};Cg.UPVOTE_SR_LABEL=ch(`Vote up`),Cg.DOWNVOTE_SR_LABEL=ch(`Vote down`),Cg.formAssociated=!0,Cg.shadowRootOptions={...qm.shadowRootOptions,delegatesFocus:!0},t([I({type:String})],Cg.prototype,`prompt`,void 0),t([I({type:String})],Cg.prototype,`vote`,void 0),t([I({type:String})],Cg.prototype,`comment`,void 0),t([I({type:String})],Cg.prototype,`commentPlaceholder`,void 0),t([I({type:Boolean,reflect:!0})],Cg.prototype,`required`,void 0),t([I({type:Boolean,reflect:!0})],Cg.prototype,`disabled`,void 0),t([I({type:Boolean,reflect:!0})],Cg.prototype,`skipNumber`,void 0),t([I({type:Boolean,reflect:!0})],Cg.prototype,`showComments`,void 0),t([bi(`#comments`)],Cg.prototype,`commentBox`,void 0),Cg=Sg=t([gi(`ia-survey-vote`)],Cg);var wg=class extends qm{constructor(){super(...arguments),this.name=``,this.visible=!1,this.disabled=!1}createRenderRoot(){return this}render(){return q}validate(){return!0}get numbered(){return!1}get response(){return{name:this.name,comment:this.value}}};t([I({type:String,reflect:!0})],wg.prototype,`name`,void 0),t([I({type:String,reflect:!0})],wg.prototype,`value`,void 0),wg=t([gi(`ia-survey-extra`)],wg);var Tg=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100.657 0v45l-18.604-17.604-18.59 18.338-8.463-8.463 18.59-18.338-17.933-18.933zm-100.657 99.734v-45l18.604 17.604 18.59-18.338 8.463 8.463-18.59 18.338 17.933 18.933z"
    />
  </svg>
`,Eg=class extends O{constructor(...e){super(...e),this.binSnapping=`none`,this.barScaling=`logarithmic`,this.boundEscapeListener=e=>{e.key===`Escape`&&this.closeModal()}}render(){return T`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${this.minSelectedDate??this.minDate}
          .maxSelectedDate=${this.maxSelectedDate??this.maxDate}
          dateFormat=${Ua(this.customDateFormat)}
          tooltipDateFormat=${Ua(this.customTooltipDateFormat)}
          tooltipLabel=${Ua(this.customTooltipLabel)}
          .binSnapping=${this.binSnapping}
          .barScaling=${this.barScaling??D}
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
            ${N(`Apply date range`)}
          </button>
        </histogram-date-range>
      </div>
    `}connectedCallback(){super.connectedCallback?.(),this.setupEscapeListener()}disconnectedCallback(){super.disconnectedCallback?.(),this.removeEscapeListener()}setupEscapeListener(){document.addEventListener(`keydown`,this.boundEscapeListener)}removeEscapeListener(){document.removeEventListener(`keydown`,this.boundEscapeListener)}histogramDateRangeUpdated(e){this.minSelectedDate=e.detail.minDate,this.maxSelectedDate=e.detail.maxDate}applyBtnClicked(){let e=new CustomEvent(`histogramDateRangeApplied`,{detail:{minDate:this.minSelectedDate,maxDate:this.maxSelectedDate}});this.dispatchEvent(e),this.closeModal(),this.analyticsHandler?.sendEvent({category:Ba.default,action:z.histogramChangedFromModal,label:window.location.href})}closeModal(){this.modalManager&&(this.modalManager.closeModal(),this.dispatchEvent(new CustomEvent(`modalClosed`)))}static get styles(){return w`
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
    `}};V([A({type:String})],Eg.prototype,`minDate`,void 0),V([A({type:String})],Eg.prototype,`maxDate`,void 0),V([A({type:String})],Eg.prototype,`minSelectedDate`,void 0),V([A({type:String})],Eg.prototype,`maxSelectedDate`,void 0),V([A({type:Array})],Eg.prototype,`buckets`,void 0),V([A({type:String})],Eg.prototype,`customDateFormat`,void 0),V([A({type:String})],Eg.prototype,`customTooltipDateFormat`,void 0),V([A({type:String})],Eg.prototype,`customTooltipLabel`,void 0),V([A({type:String})],Eg.prototype,`binSnapping`,void 0),V([A({type:String})],Eg.prototype,`barScaling`,void 0),V([A({type:Object,attribute:!1})],Eg.prototype,`modalManager`,void 0),V([A({type:Object,attribute:!1})],Eg.prototype,`analyticsHandler`,void 0),Eg=V([k(`expanded-date-picker`)],Eg);var Dg=class extends O{constructor(){super(...arguments),this.loadingTitle=N(`Loading...`),this.successTitle=N(`Success`),this.errorTitle=N(`Error`),this.loadingStyle=`ring-dots`,this.mode=`loading`}render(){return T`${mo(this.mode,[[`loading`,()=>this.loadingIndicatorTemplate],[`success`,()=>this.successIndicatorTemplate],[`error`,()=>this.errorIndicatorTemplate]])}`}get loadingIndicatorTemplate(){return T`
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
            class="loading-dots ${this.shouldShowLoadingDots?``:`hidden`}"
            transform="translate(40.000000, 55.000000)"
          >
            <circle id="left-dot" cx="5" cy="5" r="5"></circle>
            <circle id="middle-dot" cx="20" cy="5" r="5"></circle>
            <circle id="right-dot" cx="35" cy="5" r="5"></circle>
          </g>
        </g>
      </svg>
    `}get successIndicatorTemplate(){return T`
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
    `}get errorIndicatorTemplate(){return T`
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
    `}get shouldShowLoadingDots(){return this.loadingStyle!==`ring`}static get styles(){return[io,w`
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
      `]}};t([A({type:String})],Dg.prototype,`loadingTitle`,void 0),t([A({type:String})],Dg.prototype,`successTitle`,void 0),t([A({type:String})],Dg.prototype,`errorTitle`,void 0),t([A({type:String})],Dg.prototype,`loadingStyle`,void 0),t([A({type:String})],Dg.prototype,`mode`,void 0),Dg=t([k(`ia-status-indicator`)],Dg);var Og=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m20.1116715 50.0035012-.1116715-.1085359 43.1159942-46.61088155c2.401537-2.18938917 4.6902018-3.28408375 6.8659943-3.28408375s4.1642651.63837733 5.9654178 1.91513199c1.8011528 1.27675467 3.1520173 2.97248092 4.0525937 5.08717877l-39.4020173 42.99768924 39.4020173 42.9976892c-.9005764 2.1146979-2.2514409 3.8104241-4.0525937 5.0871788-1.8011527 1.2767547-3.7896253 1.915132-5.9654178 1.915132-2.1013449 0-4.3900096-1.0573489-6.8659943-3.1720468l-43.1159942-46.7194174z"
    />
    <title>Go left icon</title>
  </svg>
`,kg=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"
    />
    <title>Go right icon</title>
  </svg>
`,Ag=class extends O{constructor(...e){super(...e),this.step=2,this.currentPage=1,this.pages=[]}firstUpdated(){this.observePageCount()}updated(e){e.has(`size`)&&this.observePageCount(),e.has(`currentPage`)&&(this.observePageCount(),this.emitPageClick())}observePageCount(){this.pages=[];let e=this.size<=7;if(this.size<=5){this.pages=[...Array(this.size).keys()].map(e=>e+1);return}if(this.size===7){if(this.currentPage===2){this.pages=[1,2,3,4,0,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,4,5,this.size-1,this.size];return}}if(this.currentPage===1){this.pages=[1,2,3,0,this.size];return}if(this.currentPage===this.size){this.pages=[1,0,this.size-2,this.size-1,this.size];return}if(this.currentPage===this.size-1){this.pages=[1,0,this.size-3,this.size-2,this.size-1,this.size];return}if(e&&this.currentPage>1&&this.currentPage<7){this.pages=[...Array(this.size).keys()].map(e=>e+1);return}let t=this.currentPage-this.step,n=this.currentPage+this.step;t<=0&&(n+=-t+1,t=1),n>=this.size&&(t=Math.max(t-(n-this.size),1),n=this.size),t===2&&--n,n===this.size-1&&(t+=1),this.createFirstNode(t),this.createMiddelNode(t,n),this.createLastNode(n)}createFirstNode(e){e>1&&this.pages?.push(1),e>2&&this.pages?.push(0)}createMiddelNode(e,t){for(let n=e;n<=t;n+=1)this.pages?.push(n)}createLastNode(e){e<this.size-1&&this.pages?.push(0),e<this.size&&this.pages?.push(this.size)}get getEllipsisTemplate(){return T`<i class="ellipses">...</i>`}emitPageClick(){this.dispatchEvent(new CustomEvent(`pageNumberClicked`,{detail:{page:this.currentPage},bubbles:!0,composed:!0}))}onRewind(){--this.currentPage,this.currentPage<1&&(this.currentPage=1)}onForward(){this.currentPage+=1,this.currentPage>this.size&&(this.currentPage=this.size)}onChange(e){this.currentPage=e}getPageTemplate(e){return T`
      <button
        @click=${()=>this.onChange(e)}
        class=${this.currentPage===e?`current`:``}
        data-page=${e}
      >
        ${e}
      </button>
    `}get getPagesTemplate(){return!this.pages||!this.pages.length?D:T`
      ${this.pages?.map(e=>T`${e===0?this.getEllipsisTemplate:this.getPageTemplate(e)}`)}
    `}render(){return T`
      <div class="facets-pagination">
        <button class="arrow-icon rewind" @click=${this.onRewind}>
          <span class="sr-only">Rewind pagination:</span>
          ${Og}
        </button>
        <div class="page-numbers">${this.getPagesTemplate}</div>
        <button class="arrow-icon forward" @click=${this.onForward}>
          <span class="sr-only">Forward pagination:</span>
          ${kg}
        </button>
      </div>
    `}static get styles(){return[Ha,w`
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
      `]}};V([A({type:Number})],Ag.prototype,`size`,void 0),V([A({type:Number})],Ag.prototype,`step`,void 0),V([A({type:Number})],Ag.prototype,`currentPage`,void 0),V([j()],Ag.prototype,`pages`,void 0),Ag=V([k(`more-facets-pagination`)],Ag);var jg=(e,t,n)=>{let r=new Map;for(let i=t;i<=n;i++)r.set(e[i],i);return r},Mg=rr(class extends ir{constructor(e){if(super(e),e.type!==nr.CHILD)throw Error(`repeat() can only be used in text expressions`)}dt(e,t,n){let r;n===void 0?n=t:t!==void 0&&(r=t);let i=[],a=[],o=0;for(let t of e)i[o]=r?r(t,o):o,a[o]=n(t,o),o++;return{values:a,keys:i}}render(e,t,n){return this.dt(e,t,n).values}update(e,[t,n,r]){let i=Qa(e),{values:a,keys:o}=this.dt(t,n,r);if(!Array.isArray(i))return this.ut=o,a;let s=this.ut??=[],c=[],l,u,d=0,f=i.length-1,p=0,m=a.length-1;for(;d<=f&&p<=m;)if(i[d]===null)d++;else if(i[f]===null)f--;else if(s[d]===o[p])c[p]=Ya(i[d],a[p]),d++,p++;else if(s[f]===o[m])c[m]=Ya(i[f],a[m]),f--,m--;else if(s[d]===o[m])c[m]=Ya(i[d],a[m]),Ja(e,c[m+1],i[d]),d++,m--;else if(s[f]===o[p])c[p]=Ya(i[f],a[p]),Ja(e,i[d],i[f]),f--,p++;else if(l===void 0&&(l=jg(o,p,m),u=jg(s,d,f)),l.has(s[d]))if(l.has(s[f])){let t=u.get(o[p]),n=t===void 0?null:i[t];if(n===null){let t=Ja(e,i[d]);Ya(t,a[p]),c[p]=t}else c[p]=Ya(n,a[p]),Ja(e,i[d],n),i[t]=null;p++}else $a(i[f]),f--;else $a(i[d]),d++;for(;p<=m;){let t=Ja(e,c[m+1]);Ya(t,a[p]),c[p++]=t}for(;d<=f;){let e=i[d++];e!==null&&$a(e)}return this.ut=o,Za(e,c),Et}}),Ng=E`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`,Pg=E`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`,Fg,Ig=Fg=class extends O{render(){return T`${this.facetRowTemplate}`}get facetRowTemplate(){let{bucket:e,facetType:t}=this;if(!e||!t)return D;let n=`${t}:${e.key}-show-only`,r=`${t}:${e.key}-negative`,i=e.extraNote?T`<span class="facet-note">${e.extraNote}</span>`:D,a=t===`collection`?T`<a href="/details/${e.key}">
            ${this.collectionTitles?.get(e.key)??e.key}
          </a> `:T`${e.displayText??e.key} ${i}`,o=e.count>0?e.count.toLocaleString():``,s=e.state===`hidden`,c=e.state===`selected`,l=`${t}: ${e.displayText??e.key}`,u=c?`Show all ${t}s`:`Only show ${l}`,d=`Hide ${l}`,f=`Unhide ${l}`,p=s?f:d,m=`${l}, ${e.count} results`;return T`
      <div class="facet-row-container">
        <div class="facet-checkboxes">
          <input
            type="checkbox"
            .name=${t}
            .value=${e.key}
            @click=${e=>{this.facetClicked(e,!1)}}
            .checked=${c}
            class="select-facet-checkbox"
            title=${u}
            id=${n}
            data-testid=${n}
          />
          <div class="hide-facet-container">
            <input
              type="checkbox"
              id=${r}
              .name=${t}
              .value=${e.key}
              @click=${e=>{this.facetClicked(e,!0)}}
              .checked=${s}
              class="hide-facet-checkbox"
            />
            <label
              for=${r}
              class="hide-facet-icon${s?` active`:``}"
              title=${p}
              data-testid=${r}
            >
              <span class="sr-only">${p}</span>
              <span class="eye eye-open">${Ng}</span>
              <span class="eye eye-closed">${Pg}</span>
            </label>
          </div>
        </div>
        <label
          for=${n}
          class="facet-info-display"
          title=${u}
          aria-label=${m}
        >
          <div class="facet-title">${a}</div>
          <div class="facet-count">${o}</div>
        </label>
      </div>
    `}facetClicked(e,t){let{bucket:n,facetType:r}=this;if(!n||!r)return;let{checked:i}=e.target;this.bucket={...n,state:Fg.getFacetState(i,t)},this.dispatchFacetClickEvent({facetType:r,bucket:this.bucket,negative:t})}dispatchFacetClickEvent(e){let t=new CustomEvent(`facetClick`,{detail:e});this.dispatchEvent(t)}static getFacetState(e,t){let n;return n=e?t?`hidden`:`selected`:`none`,n}static get styles(){let e=w`var(--facet-row-border-top, 1px solid transparent)`,t=w`var(--facet-row-border-bottom, 1px solid transparent)`,n=w`15px`;return[Ha,w`
      .facet-checkboxes {
        margin: 0 5px 0 0;
        display: flex;
        height: ${n};
      }
      .facet-checkboxes input:first-child {
        margin-right: 5px;
      }
      .facet-checkboxes input {
        height: ${n};
        width: ${n};
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
        width: ${n};
        height: ${n};
        cursor: pointer;
        display: flex;
      }
      .eye {
        width: ${n};
        height: ${n};
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
    `]}};V([A({type:String})],Ig.prototype,`facetType`,void 0),V([A({type:Object})],Ig.prototype,`bucket`,void 0),V([A({type:Object})],Ig.prototype,`collectionTitles`,void 0),Ig=Fg=V([k(`facet-row`)],Ig);var Lg=class extends O{facetClicked(e){this.dispatchFacetClickEvent(e.detail)}dispatchFacetClickEvent(e){let t=new CustomEvent(`facetClick`,{detail:e,composed:!0});this.dispatchEvent(t)}get facetsTemplate(){let{facetGroup:e}=this;if(!e)return D;let t=e.buckets;return T`
      <div class="facet-rows" data-testid="facets-on-${e.key}">
        ${Mg(t,t=>`${e.key}:${t.key}`,t=>T`<facet-row
              .facetType=${e.key}
              .bucket=${t}
              .collectionTitles=${this.collectionTitles}
              @facetClick=${this.facetClicked}
            ></facet-row>`)}
      </div>
    `}render(){return T`${this.facetsTemplate}`}static get styles(){return w`
      .facet-rows {
        column-count: ${w`var(--facetsColumnCount, 1)`};
        column-gap: ${w`var(--facetsColumnGap, 15px)`};
      }

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `}};V([A({type:Object})],Lg.prototype,`facetGroup`,void 0),V([A({type:Object})],Lg.prototype,`collectionTitles`,void 0),Lg=V([k(`facets-template`)],Lg);var Rg=class extends O{constructor(...e){super(...e),this.leftValue=``,this.rightValue=``,this.side=`left`}render(){return T`
      <div id="container">
        <label for="switch-left">${this.leftLabel??this.leftValue}</label>
        <input
          type="radio"
          id="switch-left"
          class="sr-only"
          name="switch"
          .value=${this.leftValue}
          .checked=${this.side===`left`}
          @change=${this.handleRadioChange}
        />
        <input
          type="radio"
          id="switch-right"
          class="sr-only"
          name="switch"
          .value=${this.rightValue}
          .checked=${this.side===`right`}
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
    `}get value(){return this.side===`left`?this.leftValue:this.rightValue}get selectedLabel(){return this.side===`left`?this.leftLabel??this.leftValue:this.rightLabel??this.rightValue}handleClick(){this.side=this.side===`left`?`right`:`left`,this.emitChangeEvent()}handleRadioChange(){this.side=this.leftRadio.checked?`left`:`right`,this.emitChangeEvent()}emitChangeEvent(){let e=new CustomEvent(`change`,{detail:this.value});this.dispatchEvent(e)}static get styles(){let e=w`var(--switchWidth, 30px)`,t=w`var(--switchHeight, 14px)`,n=w`var(--switchMarginLeft, 5px)`,r=w`var(--switchMarginRight, 5px)`,i=w`var(--switchBorderWidth, 3px)`,a=w`var(--switchBgColor, #194880)`,o=w`var(--switchBorderColor, #194880)`;return[Ha,w`
        #container {
          display: inline-flex;
          align-items: center;
          flex-wrap: nowrap;
          font-size: ${w`var(--labelFontSize, 1.3rem)`};
        }

        #switch-button {
          width: ${e};
          height: ${t};
          margin: 0 ${r} 0 ${n};
          padding: 0;
          border: ${i} solid ${o};
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
          background: ${w`var(--knobColor, white)`};
          transition: transform ${w`var(--knobTransitionDuration, 0.25s)`} ${w`var(--knobTransitionFn, ease)`};
        }

        @media (prefers-reduced-motion: reduce) {
          #knob {
            transition-duration: 0.001s !important; /* Imperceptibly fast */
          }
        }
      `]}};V([A({type:String,attribute:!0})],Rg.prototype,`leftValue`,void 0),V([A({type:String,attribute:!0})],Rg.prototype,`leftLabel`,void 0),V([A({type:String,attribute:!0})],Rg.prototype,`rightValue`,void 0),V([A({type:String,attribute:!0})],Rg.prototype,`rightLabel`,void 0),V([A({type:String,attribute:!0})],Rg.prototype,`side`,void 0),V([M(`#switch-left`)],Rg.prototype,`leftRadio`,void 0),Rg=V([k(`toggle-switch`)],Rg);var zg=1e4,X=class extends O{constructor(...e){super(...e),this.facetsPerPage=35,this.facetsLoading=!0,this.sortedBy=y.COUNT,this.isTvSearch=!1,this.unappliedFacetChanges=ia(),this.pageNumber=1}willUpdate(e){(e.has(`aggregations`)||e.has(`facetsPerPage`)||e.has(`sortedBy`)||e.has(`selectedFacets`)||e.has(`unappliedFacetChanges`))&&(this.facetGroup=this.mergedFacets),(e.has(`facetKey`)||e.has(`query`)||e.has(`searchType`)||e.has(`filterMap`))&&(this.facetsLoading=!0,this.pageNumber=1,this.sortedBy=this.searchType===x.TV?ua[this.facetKey]:la[this.facetKey],this.updateSpecificFacets())}firstUpdated(){this.setupEscapeListeners()}setupEscapeListeners(){this.modalManager?document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.modalManager?.closeModal()}):document.removeEventListener(`keydown`,()=>{})}get isSearchResultsPage(){let e=this.pageSpecifierParams?.pageType;return e===void 0||e===`search_results`}async updateSpecificFacets(){if(!this.facetKey)return;let e=this.query?.trim();if(!e&&this.isSearchResultsPage)return;let t={simpleParams:[this.facetKey]},n=zg,r={...this.pageSpecifierParams,query:e||``,identifiers:this.identifiers,filters:this.filterMap,aggregations:t,aggregationsSize:n,rows:0},i=await this.searchService?.search(r,this.searchType);this.aggregations=i?.success?.response.aggregations,this.facetsLoading=!1;let a=i?.success?.response?.collectionTitles;if(a)for(let[e,t]of Object.entries(a))this.collectionTitles?.set(e,t)}pageNumberClicked(e){let t=e?.detail?.page;t&&(this.pageNumber=Number(t)),this.analyticsHandler?.sendEvent({category:Ba.default,action:z.moreFacetsPageChange,label:`${this.pageNumber}`})}get mergedFacets(){if(!this.facetKey||!this.selectedFacets)return;let{selectedFacetGroup:e,aggregationFacetGroup:t}=this;if(!t)return;let n={...e??t},r=e?.buckets.map(e=>{let n=t.buckets.find(t=>t.key===e.key);return n?{...e,count:n.count}:e})??[];Ra(r,this.sortedBy),t.buckets.forEach(t=>{e?.buckets.find(e=>e.key===t.key)||r.push(t)});let i=this.unappliedFacetChanges[this.facetKey];for(let[e,t]of r.entries()){let n=i?.[t.key];n&&(r[e]={...n})}return this.facetKey===`creator`&&this.isTvSearch&&r.forEach(e=>{e.displayText=(e.displayText??e.key)?.toLocaleUpperCase();let t=this.tvChannelAliases?.get(e.displayText);t&&t!==e.displayText&&(e.extraNote=`(${t})`)}),n.buckets=r,n}get selectedFacetGroup(){if(!this.selectedFacets||!this.facetKey)return;let e=this.selectedFacets[this.facetKey];if(!e)return;let t=ca[this.facetKey],n=Object.entries(e).map(([e,t])=>({displayText:e,key:e,count:t?.count,state:t?.state}));return{title:t,key:this.facetKey,buckets:n}}get aggregationFacetGroup(){if(!this.aggregations||!this.facetKey)return;let e=this.aggregations[this.facetKey];if(!e)return;let t=ca[this.facetKey],n=e.getSortedBuckets(this.sortedBy);this.facetKey===`collection`&&(n=n?.filter(e=>{let t=e?.key?.toString();return!ma[t]&&!t?.startsWith(`fav-`)}));let r=n.map(e=>{let t=`${e.key}`;return{displayText:`${t}`,key:`${t}`,count:e.doc_count,state:`none`}});return{title:t,key:this.facetKey,buckets:r}}get facetGroupForCurrentPage(){let{facetGroup:e}=this;if(!e)return;let t=(this.pageNumber-1)*this.facetsPerPage,n=e.buckets.slice(t,t+this.facetsPerPage);return{...e,buckets:n}}get moreFacetsTemplate(){return T`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${e=>{this.facetKey&&(this.unappliedFacetChanges=Pa(this.unappliedFacetChanges,this.facetKey,e.detail.bucket))}}
      ></facets-template>
    `}get loaderTemplate(){return T`
      <ia-status-indicator
        class="facets-loader"
        mode="loading"
      ></ia-status-indicator>
    `}get paginationSize(){if(!this.aggregations||!this.facetKey)return 0;let e=this.aggregations[this.facetKey]?.buckets.length;return Math.ceil(e/this.facetsPerPage)}get facetsPaginationTemplate(){return this.paginationSize>1?T`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`:D}get footerTemplate(){return this.paginationSize>0?T`${this.facetsPaginationTemplate}
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
        </div> `:D}sortFacetAggregation(e){this.sortedBy=e,this.dispatchEvent(new CustomEvent(`sortedFacets`,{detail:this.sortedBy}))}get modalHeaderTemplate(){let e=(this.sortedBy??la[this.facetKey])===y.COUNT?`left`:`right`;return T`<span class="sr-only">${N(`More facets for:`)}</span>
      <span class="title">
        ${this.facetGroup?.title}

        <label class="sort-label">${N(`Sort by:`)}</label>
        ${this.facetKey?T`<toggle-switch
              class="sort-toggle"
              leftValue=${y.COUNT}
              leftLabel="Count"
              rightValue=${da[this.facetKey]}
              .rightLabel=${this.facetGroup?.title}
              side=${e}
              @change=${e=>{this.sortFacetAggregation(Number(e.detail))}}
            ></toggle-switch>`:D}
      </span>`}render(){return T`
      ${this.facetsLoading?this.loaderTemplate:T`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `}applySearchFacetsClicked(){let e=Ia(this.selectedFacets,this.unappliedFacetChanges),t=new CustomEvent(`facetsChanged`,{detail:e,bubbles:!0,composed:!0});this.dispatchEvent(t),this.unappliedFacetChanges=ia(),this.modalManager?.closeModal(),this.analyticsHandler?.sendEvent({category:Ba.default,action:`${z.applyMoreFacetsModal}`,label:`${this.facetKey}`})}cancelClick(){this.unappliedFacetChanges=ia(),this.modalManager?.closeModal(),this.analyticsHandler?.sendEvent({category:Ba.default,action:z.closeMoreFacetsModal,label:`${this.facetKey}`})}static get styles(){return[Ha,w`
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
          background-color: ${w`var(--primaryButtonBGColor, #194880)`};
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
      `]}};V([A({type:String})],X.prototype,`facetKey`,void 0),V([A({type:String})],X.prototype,`query`,void 0),V([A({type:Array})],X.prototype,`identifiers`,void 0),V([A({type:Object})],X.prototype,`filterMap`,void 0),V([A({type:Number})],X.prototype,`searchType`,void 0),V([A({type:Object})],X.prototype,`pageSpecifierParams`,void 0),V([A({type:Object})],X.prototype,`collectionTitles`,void 0),V([A({type:Object})],X.prototype,`tvChannelAliases`,void 0),V([A({type:Number})],X.prototype,`facetsPerPage`,void 0),V([A({type:Boolean})],X.prototype,`facetsLoading`,void 0),V([A({type:Object})],X.prototype,`selectedFacets`,void 0),V([A({type:Number})],X.prototype,`sortedBy`,void 0),V([A({type:Boolean})],X.prototype,`isTvSearch`,void 0),V([A({type:Object})],X.prototype,`modalManager`,void 0),V([A({type:Object})],X.prototype,`searchService`,void 0),V([A({type:Object,attribute:!1})],X.prototype,`analyticsHandler`,void 0),V([j()],X.prototype,`aggregations`,void 0),V([j()],X.prototype,`facetGroup`,void 0),V([j()],X.prototype,`unappliedFacetChanges`,void 0),V([j()],X.prototype,`pageNumber`,void 0),X=V([k(`more-facets-content`)],X);var Bg=class extends O{render(){return T`
      <div id="row">
        <input type="checkbox" disabled />
        <div class="tombstone-line"></div>
        <div class="tombstone-line"></div>
      </div>
    `}static get styles(){return w`
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
    `}};Bg=V([k(`facet-tombstone-row`)],Bg);var Z=class extends O{constructor(...e){super(...e),this.moreLinksVisible=!0,this.facetsLoading=!1,this.histogramAggregationLoading=!1,this.collapsableFacets=!1,this.showHistogramDatePicker=!1,this.allowExpandingDatePicker=!1,this.suppressMediatypeFacets=!1,this.parentCollections=[],this.collectionPagePath=`/details/`,this.isManageView=!1,this.isTvSearch=!1,this.facetDisplayOrder=oa,this.openFacets={subject:!1,lending:!1,mediatype:!1,language:!1,creator:!1,collection:!1,year:!1,clip_type:!1,program:!1,person:!1,sponsor:!1},this.allowedFacetCount=6,this.handleExpandedDatePickerClosed=()=>{this.modalManager?.classList.remove(`expanded-date-picker`)},this.histogramDateRangeUpdated=e=>{let{minDate:t,maxDate:n}=e.detail,r=new CustomEvent(`histogramDateRangeUpdated`,{detail:{minDate:t,maxDate:n}});this.dispatchEvent(r)}}render(){let e=ar({loading:this.facetsLoading,managing:this.isManageView}),t=this.isTvSearch?N(`Date Published`):N(`Year Published`),n=`date-picker-label`;return T`
      <div id="container" class=${e}>
        ${this.showHistogramDatePicker&&(this.histogramAggregation||this.histogramAggregationLoading)?T`
              <section
                class="facet-group"
                aria-labelledby=${n}
                data-testid="facet-group-header-label-date-picker"
              >
                <h3 id=${n}>
                  ${t} <span class="sr-only">${N(`range filter`)}</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `:D}
        ${this.collectionPartOfTemplate}
        <slot name="facets-top"></slot>
        ${this.mergedFacets.map(e=>this.getFacetGroupTemplate(e))}
      </div>
    `}get collectionPartOfTemplate(){if(!this.parentCollections?.length)return D;let e=`partof-heading`;return T`
      <section
        class="facet-group partof-collections"
        aria-labelledby=${e}
        data-testid="facet-group-partof-collections"
      >
        <div class="facet-group-header">
          <h3 id=${e}>${N(`Part Of`)}</h3>
        </div>
        <ul>
          ${Ao(this.parentCollections,e=>T` <li>
              <a
                href=${`${this.baseNavigationUrl}${this.collectionPagePath}${e}`}
                data-id=${e}
                @click=${this.partOfCollectionClicked}
              >
                ${this.collectionTitles?.get(e)??e}
              </a>
            </li>`)}
        </ul>
      </section>
    `}partOfCollectionClicked(e){this.analyticsHandler?.sendEvent({category:Ba.default,action:z.partOfCollectionClicked,label:e.target.dataset.id})}get histogramProps(){let{histogramAggregation:e}=this;if(!e)return;let t=e.first_bucket_year??e.first_bucket_key,n=e.last_bucket_year??e.last_bucket_key;if(t==null||n==null)return;let r=e.first_bucket_month??1,i=e.last_bucket_month??12,a=e.interval??1,o=e.interval_in_months??12,s=e=>e.toString().padStart(2,`0`);if(this.isTvSearch){let a=o<12;return{buckets:e.buckets,dateFormat:`YYYY-MM`,tooltipDateFormat:a?`MMM YYYY`:`YYYY`,tooltipLabel:`broadcast`,binSnapping:a?`month`:`year`,barScaling:`linear`,minDate:`${t}-${s(r)}`,maxDate:`${n}-${s(i+o-1)}`}}return{buckets:e.buckets,dateFormat:`YYYY`,tooltipDateFormat:`YYYY`,tooltipLabel:`item`,binSnapping:`year`,barScaling:`logarithmic`,minDate:`${t}`,maxDate:`${n+a-1}`}}showDatePickerModal(){let{histogramProps:e}=this;if(!e)return;let{buckets:t,dateFormat:n,tooltipDateFormat:r,tooltipLabel:i,binSnapping:a,barScaling:o,minDate:s,maxDate:c}=e,l=T`
      <expanded-date-picker
        ${Od(e=>{if(e&&e instanceof Eg){let t=e;t.minSelectedDate=this.minSelectedDate,t.maxSelectedDate=this.maxSelectedDate}})}
        .minDate=${s}
        .maxDate=${c}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .customDateFormat=${n}
        .customTooltipDateFormat=${r}
        .customTooltipLabel=${i}
        .binSnapping=${a}
        .barScaling=${o}
        .buckets=${t}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `,u=new Kl({bodyColor:`#fff`,headerColor:`#194880`,showHeaderLogo:!1,closeOnBackdropClick:!0,title:T`${N(`Select a date range`)}`});this.modalManager?.classList.add(`expanded-date-picker`),this.modalManager?.showModal({config:u,customModalContent:l,userClosedModalCallback:this.handleExpandedDatePickerClosed}),this.analyticsHandler?.sendEvent({category:Ba.default,action:z.histogramExpanded,label:window.location.href})}updated(e){e.has(`selectedFacets`)&&this.dispatchFacetsChangedEvent()}dispatchFacetsChangedEvent(){let e=new CustomEvent(`facetsChanged`,{detail:this.selectedFacets});this.dispatchEvent(e)}get expandDatePickerBtnTemplate(){return this.allowExpandingDatePicker&&!this.facetsLoading?T`<button
          class="expand-date-picker-btn"
          aria-haspopup="dialog"
          @click=${this.showDatePickerModal}
        >
          <span class="sr-only">${N(`Expand date histogram`)}</span>
          <span aria-hidden="true">${Tg}</span>
        </button>`:D}get histogramTemplate(){if(this.histogramAggregationLoading)return T` <div class="histogram-loading-indicator">&hellip;</div> `;let{histogramProps:e}=this;if(!e)return D;let{buckets:t,dateFormat:n,tooltipDateFormat:r,tooltipLabel:i,binSnapping:a,barScaling:o,minDate:s,maxDate:c}=e;return T`
      <histogram-date-range
        class=${this.isTvSearch?`wide-inputs`:``}
        .minDate=${s}
        .maxDate=${c}
        .minSelectedDate=${this.minSelectedDate??s}
        .maxSelectedDate=${this.maxSelectedDate??c}
        .updateDelay=${100}
        .dateFormat=${n}
        .tooltipDateFormat=${r}
        .tooltipLabel=${i}
        .binSnapping=${a}
        .barScaling=${o}
        .bins=${t}
        missingDataMessage="..."
        .width=${this.collapsableFacets&&this.contentWidth?this.contentWidth:180}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `}get mergedFacets(){let e=[];return this.facetDisplayOrder.forEach(t=>{if(t===`mediatype`&&this.suppressMediatypeFacets)return;let n=this.selectedFacetGroups.find(e=>e.key===t),r=this.aggregationFacetGroups.find(e=>e.key===t);if(n&&!r){e.push(n);return}if(!r)return;let i=n??r,a=n?.buckets.map(e=>{let t=r.buckets.find(t=>t.key===e.key);return t?{...e,count:t.count}:e})??[];r.buckets.forEach(e=>{a.find(t=>t.key===e.key)||a.push(e)});let o=Object.keys(n?.buckets||[])?.length;if(o<this.allowedFacetCount&&(o=this.allowedFacetCount),t===`lending`&&(a=a.filter(e=>fa[e.key])),Ra(a,la[t]),t===`mediatype`){let e=a.findIndex(e=>e.key===`collection`);if(e>=o){let[t]=a.splice(e,1);o>this.allowedFacetCount&&(o+=1),a.splice(o-1,0,t)}}t===`creator`&&this.isTvSearch&&a.forEach(e=>{e.displayText=(e.displayText??e.key)?.toLocaleUpperCase();let t=this.tvChannelAliases?.get(e.displayText);t&&t!==e.displayText&&(e.extraNote=`(${t})`)}),t===`clip_type`&&a.forEach(e=>{e.displayText??=e.key,e.displayText=e.displayText.charAt(0).toLocaleUpperCase()+e.displayText.slice(1)}),i.buckets=a.slice(0,o),e.push(i)}),e}get selectedFacetGroups(){return this.selectedFacets?Object.entries(this.selectedFacets).map(([e,t])=>{let n=e;return{title:ca[n],key:n,buckets:Object.entries(t).map(([e,t])=>{let r=e,i=pa[n];return i&&(r=i[e]??e),{displayText:r,key:e,count:t.count,state:t.state}})}}):[]}get aggregationFacetGroups(){let e=[];return Object.entries(this.aggregations??[]).forEach(([t,n])=>{if([`year_histogram`,`date_histogram`].includes(t))return;let r=t,i=ca[r];if(!i)return;let a=n.getSortedBuckets(la[r]);r===`collection`&&(a=a?.filter(e=>{let t=e?.key?.toString();return!ma[t]&&!t?.startsWith(`fav-`)}));let o={title:i,key:r,buckets:a.map(e=>{let t=e.key,n=`${e.key}`,i=pa[r];return i&&(n=i[e.key]??`${e.key}`),{displayText:n,key:`${t}`,count:e.doc_count,state:`none`}})};e.push(o)}),e}getFacetGroupTemplate(e){if(!this.facetsLoading&&e.buckets.length===0)return D;let{key:t}=e,n=this.openFacets[t],r=T`
      <span class="collapser ${n?`open`:``}"> ${Va} </span>
    `,i=()=>{let e={...this.openFacets};e[t]=!n,this.openFacets=e},a=`facet-group-header-label-${e.key}`;return T`
      <section
        class="facet-group ${this.collapsableFacets?`mobile`:``}"
        aria-labelledby=${a}
        data-testid=${a}
      >
        <div class="facet-group-header">
          <h3
            id=${a}
            @click=${i}
            @keyup=${i}
          >
            ${this.collapsableFacets?r:D} ${e.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div
          class="facet-group-content ${n?`open`:``}"
          data-testid="facet-group-content-${e.key}"
        >
          ${this.facetsLoading?this.getTombstoneFacetGroupTemplate():T`
                ${this.getFacetTemplate(e)}
                ${this.searchMoreFacetsLink(e)}
              `}
        </div>
      </section>
    `}getTombstoneFacetGroupTemplate(){return T`
      ${Ao([,,,,,].fill(null),()=>T`<facet-tombstone-row></facet-tombstone-row>`)}
    `}searchMoreFacetsLink(e){if(!this.moreLinksVisible||e.key===`lending`||Object.keys(e.buckets).length<this.allowedFacetCount)return D;let t=la[e.key];return T`<button
      class="more-link"
      @click=${()=>{this.showMoreFacetsModal(e,t),this.analyticsHandler?.sendEvent({category:Ba.default,action:z.showMoreFacetsModal,label:e.key}),this.dispatchEvent(new CustomEvent(`showMoreFacets`,{detail:e.key}))}}
      data-testid="more-link-btn"
    >
      More...
    </button>`}async showMoreFacetsModal(e,t){let n=T`
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
        @facetsChanged=${e=>{let t=new CustomEvent(`facetsChanged`,{detail:e.detail,bubbles:!0,composed:!0});this.dispatchEvent(t)}}
      >
      </more-facets-content>
    `,r=new Kl({bodyColor:`#fff`,headerColor:`#194880`,showHeaderLogo:!1,closeOnBackdropClick:!0,title:T`Select filters`});this.modalManager?.classList.add(`more-search-facets`),this.modalManager?.showModal({config:r,customModalContent:n,userClosedModalCallback:()=>{this.modalManager?.classList.remove(`more-search-facets`)}})}getFacetTemplate(e){return T`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${e}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${t=>{this.selectedFacets=Pa(this.selectedFacets,e.key,t.detail.bucket,!0);let n=new CustomEvent(`facetsChanged`,{detail:this.selectedFacets,bubbles:!0,composed:!0});this.dispatchEvent(n)}}
      ></facets-template>
    `}static get styles(){return[Ha,w`
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
      `]}};V([A({type:Object})],Z.prototype,`searchService`,void 0),V([A({type:Number})],Z.prototype,`searchType`,void 0),V([A({type:Object})],Z.prototype,`aggregations`,void 0),V([A({type:Object})],Z.prototype,`histogramAggregation`,void 0),V([A({type:String})],Z.prototype,`minSelectedDate`,void 0),V([A({type:String})],Z.prototype,`maxSelectedDate`,void 0),V([A({type:Boolean})],Z.prototype,`moreLinksVisible`,void 0),V([A({type:Boolean})],Z.prototype,`facetsLoading`,void 0),V([A({type:Boolean})],Z.prototype,`histogramAggregationLoading`,void 0),V([A({type:Object})],Z.prototype,`selectedFacets`,void 0),V([A({type:Boolean})],Z.prototype,`collapsableFacets`,void 0),V([A({type:Number})],Z.prototype,`contentWidth`,void 0),V([A({type:Boolean})],Z.prototype,`showHistogramDatePicker`,void 0),V([A({type:Boolean})],Z.prototype,`allowExpandingDatePicker`,void 0),V([A({type:Boolean})],Z.prototype,`suppressMediatypeFacets`,void 0),V([A({type:String})],Z.prototype,`query`,void 0),V([A({type:Array})],Z.prototype,`identifiers`,void 0),V([A({type:Object})],Z.prototype,`pageSpecifierParams`,void 0),V([A({type:Array})],Z.prototype,`parentCollections`,void 0),V([A({type:Object})],Z.prototype,`filterMap`,void 0),V([A({type:String})],Z.prototype,`baseNavigationUrl`,void 0),V([A({type:String})],Z.prototype,`collectionPagePath`,void 0),V([A({type:Boolean})],Z.prototype,`isManageView`,void 0),V([A({type:Boolean})],Z.prototype,`isTvSearch`,void 0),V([A({type:Array})],Z.prototype,`facetDisplayOrder`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`modalManager`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`resizeObserver`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`featureFeedbackService`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`recaptchaManager`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`analyticsHandler`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`collectionTitles`,void 0),V([A({type:Object,attribute:!1})],Z.prototype,`tvChannelAliases`,void 0),V([j()],Z.prototype,`openFacets`,void 0),Z=V([k(`collection-facets`)],Z);var Vg=class extends O{render(){return T`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `}static get styles(){let e=w`var(--circularActivityIndicatorColor, dodgerblue)`,t=w`var(--circularActivityIndicatorThickness, 4px)`;return w`
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
    `}};Vg=V([k(`circular-activity-indicator`)],Vg);function Hg(e,t){return e===void 0?t!==void 0:t===void 0?e!==void 0:e.facetType===t.facetType&&e.bucketKey===t.bucketKey}function Ug(e,t){return e.label===t.label&&e.facets.length===t.facets.length&&e.facets.every((e,n)=>Hg(e,t.facets[n]))}function Wg(e){if(!Array.isArray(e[0])){let t=[...e];for(let e=0;e<t.length;e++){let n=t[e];t=t.filter(e=>n===e||!Ug(n,e))}return t}let t=e,n=[];for(let e of t){let t=[];for(let r of e)n.find(e=>e.find(e=>Ug(r,e)))||t.push(r);t.length>0&&n.push(t)}return n}var Gg=class e{async getRecommendedFacets(){let t=navigator.language,n=e.getLanguageDisplayName(t);return n?[{facets:[{facetType:`language`,bucketKey:n}]}]:[]}static getLanguageDisplayName(e){let t=e.split(`-`)[0];return new Intl.DisplayNames([`en`],{type:`language`}).of(t)}},Kg={facets:[{facetType:`mediatype`,bucketKey:`texts`}]},qg={facets:[{facetType:`mediatype`,bucketKey:`audio`}]},Jg={facets:[{facetType:`mediatype`,bucketKey:`movies`}]},Yg={facets:[{facetType:`mediatype`,bucketKey:`image`}]},Xg={facets:[{facetType:`mediatype`,bucketKey:`software`}]},Zg={facets:[{facetType:`mediatype`,bucketKey:`etree`}]},Qg={text:[Kg],book:[Kg],novel:[Kg],magazine:[Kg],newspaper:[Kg],pdf:[Kg],epub:[Kg],audio:[qg],song:[qg],music:[qg],listen:[qg],podcast:[qg],radio:[qg],stream:[qg,Jg],video:[Jg],movie:[Jg],film:[Jg],animation:[Jg],youtube:[Jg],image:[Yg],photo:[Yg],picture:[Yg],painting:[Yg],jpg:[Yg],jpeg:[Yg],png:[Yg],gif:[Yg],software:[Xg],app:[Xg],program:[Xg],game:[Xg],arcade:[Xg],etree:[Zg],concert:[Zg],"live music":[Zg],"web crawl":[{facets:[{facetType:`mediatype`,bucketKey:`web`}]}],dataset:[{facets:[{facetType:`mediatype`,bucketKey:`data`}]}]},$g=class{async getRecommendedFacets(e){let t=[];for(let[n,r]of Object.entries(Qg))e.includes(n)&&t.push(...r);return t}},e_=[{facets:[{facetType:`mediatype`,bucketKey:`texts`}]}],t_=[{label:`Films by __QUERY`,facets:[{facetType:`mediatype`,bucketKey:`movies`},{facetType:`creator`,bucketKey:`__QUERY`}]}],n_=[{label:`Writing by __QUERY`,facets:[{facetType:`mediatype`,bucketKey:`texts`},{facetType:`creator`,bucketKey:`__QUERY`}]}],r_=[{label:`Images by __QUERY`,facets:[{facetType:`mediatype`,bucketKey:`image`},{facetType:`creator`,bucketKey:`__QUERY`}]}],i_=[{label:`Music by __QUERY`,facets:[{facetType:`mediatype`,bucketKey:`audio`},{facetType:`creator`,bucketKey:`__QUERY`}]}],a_={"written work":e_,literature:e_,book:e_,novel:e_,filmmaker:t_,director:t_,author:n_,writer:n_,novelist:n_,essayist:n_,poet:n_,"visual artist":r_,"graphic artist":r_,photographer:r_,painter:r_,singer:i_,songwriter:i_,musician:i_,composer:i_,pianist:i_},o_=class{constructor(){this.WIKIDATA_BASE_URL=`https://www.wikidata.org/w/api.php`,this.WIKIDATA_DEFAULT_ARGS=`?action=wbsearchentities&format=json&language=en&uselang=en&origin=*&type=item&limit=5`}getWikidataURL(e){let t=encodeURIComponent(e);return`${this.WIKIDATA_BASE_URL}${this.WIKIDATA_DEFAULT_ARGS}&search=${t}`}replaceQueryPlaceholders(e,t){return e.map(e=>({label:e.label?.replace(`__QUERY`,t),facets:e.facets.map(e=>{let n={...e,bucketKey:e.bucketKey.replace(`__QUERY`,t.toLowerCase())};return e.displayText&&(n.displayText=n.displayText?.replace(`__QUERY`,t)),n})}))}async getRecommendedFacets(e){let t=[];try{let n=this.getWikidataURL(e),r=await(await fetch(n)).json();for(let[e,n]of Object.entries(a_))if(RegExp(`\\b${e}\\b`).test(r.search[0]?.description)){let e=r.search[0].label;t.push(...this.replaceQueryPlaceholders(n,e))}return t}catch(e){return console.warn(e),[]}}},s_=class e{static{this.DEFAULT_HEURISTICS=[$g,o_,Gg]}async getRecommendedFacets(t,n=e.DEFAULT_HEURISTICS){let r=n.map(e=>new e().getRecommendedFacets(t));return Wg((await Promise.all(r)).flat())}},c_=window.location&&(window.location.hostname===`localhost`||window.location.host.match(/^(www|cat)-[a-z0-9]+\.archive\.org$/)||window.location.host.match(/\.code\.archive\.org$/)||window.location.host.match(/\.dev\.archive\.org$/)||window.location.host.match(/^ia-petabox-/)||window.location.host.match(/^local\.archive\.org/)||window.location.host.match(/^internetarchive\.github\.io$/))?console.log.bind(console):()=>{},l_=T`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m 91.666668,8.3333328 v 0.9708343 l -35.3625,39.2916669 -2.137502,2.375 v 3.195832 32.350001 L 45.833334,82.35 V 54.166666 50.970834 l -2.1375,-2.375 L 8.3333328,9.3041671 V 8.3333328 H 91.666668 M 100,0 H 0 V 12.5 L 37.500001,54.166666 V 87.5 l 25,12.5 V 54.166666 L 100,12.5 Z"
      fill="#000"
    />
  </svg>
`,u_=E`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m50 0c27.6142375 0 50 22.3857625 50 50s-22.3857625 50-50 50-50-22.3857625-50-50 22.3857625-50 50-50zm23.8159475 26.1840525c-1.4033215-1.4033215-3.5816761-1.5592461-5.1572272-.4677738l-.5598841.4677738-18.0988362 18.0989475-18.0988362-18.0989475-.5598841-.4677738c-1.5755511-1.0914723-3.7539057-.9355477-5.1572272.4677738-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113l18.0989475 18.0988362-18.0989475 18.0988362c-1.5787367 1.5787367-1.5787367 4.1383746 0 5.7171113 1.4033215 1.4033215 3.5816761 1.5592461 5.1572272.4677738l.5598841-.4677738 18.0988362-18.0989475 18.0988362 18.0989475.5598841.4677738c1.5755511 1.0914723 3.7539057.9355477 5.1572272-.4677738 1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113l-18.0989475-18.0988362 18.0989475-18.0988362c1.5787367-1.5787367 1.5787367-4.1383746 0-5.7171113z" fill-rule="evenodd"/></svg>
`;function d_(e){return e&&e.charAt(0).toLocaleUpperCase()+e.slice(1)}var f_=class extends O{constructor(...e){super(...e),this.selected=!1}render(){if(!this.facetInfo)return D;let e=this.facetInfo.facets.length===1,t=this.facetInfo.facets[0],n=d_((this.labelPrefix?`${this.labelPrefix} `:``)+(this.facetInfo.label??t.displayText??t.bucketKey));if(!n)return D;let r=e&&t.facetType===`mediatype`?ns[t.bucketKey].icon:D;return T`
      <a
        class="smart-facet-button ${this.selected?`selected`:``}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${r} ${n}
        ${this.selected?T`<span class="unselect-button">${u_}</span>`:D}
      </a>
    `}get href(){let e=new URL(window.location.href);if(this.facetInfo)for(let t of this.facetInfo.facets)e.searchParams.append(`and[]`,encodeURIComponent(`${t.facetType}:"${t.bucketKey}"`));return e.toString()}facetClicked(e){e.preventDefault(),this.facetInfo&&(this.selected=!this.selected,this.dispatchEvent(new CustomEvent(`facetClick`,{detail:{smartFacet:this.facetInfo,details:this.facetInfo.facets.map(e=>({facetType:e.facetType,bucket:{key:e.bucketKey,count:0,state:this.selected?`selected`:`none`},negative:!1}))}})))}static get styles(){return w`
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
    `}};V([A({type:Object})],f_.prototype,`facetInfo`,void 0),V([A({type:String})],f_.prototype,`labelPrefix`,void 0),V([A({type:Boolean})],f_.prototype,`selected`,void 0),f_=V([k(`smart-facet-button`)],f_);var p_=class extends O{render(){if(!this.facetInfo||!this.activeFacetRef||this.facetInfo.length===0)return D;let e=this.activeFacetRef.displayText??this.activeFacetRef.bucketKey;return e?T`
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
            >${this.labelPrefix??D} ${e}</span
          >
        </ia-dropdown>
      </div>
    `:D}get dropdownOptions(){return this.facetInfo?.map(e=>{let t=e.facets[0];return{id:t.bucketKey,label:T`<span>
            ${e.label??t.displayText??t.bucketKey}
          </span>`}})??[]}get activeDropdownOption(){if(this.activeFacetRef)return this.dropdownOptions.find(e=>e.id===this.activeFacetRef?.bucketKey)}defaultOptionSelected(){this.handleSelection(this.activeFacetRef?.bucketKey)}optionSelected(e){this.handleSelection(e.detail.option.id)}handleSelection(e){if(!e||!this.facetInfo||!this.activeFacetRef)return;let t;for(let n of this.facetInfo){let r=n.facets.find(t=>t.bucketKey===e);r&&(this.activeFacetRef=r,t=n)}t&&this.dispatchEvent(new CustomEvent(`facetClick`,{detail:{smartFacet:t,details:[{facetType:this.activeFacetRef.facetType,bucket:{key:this.activeFacetRef.bucketKey,count:0,state:`selected`},negative:!1}]}}))}onDropdownClick(){c_(`smart dropdown: onDropdownClick`,this),this.dispatchEvent(new CustomEvent(`dropdownClick`,{detail:this}))}close(){this.dropdown&&(this.dropdown.open=!1)}static get styles(){return w`
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
    `}};V([A({type:Array})],p_.prototype,`facetInfo`,void 0),V([A({type:String})],p_.prototype,`labelPrefix`,void 0),V([A({type:Object})],p_.prototype,`activeFacetRef`,void 0),V([M(`ia-dropdown`)],p_.prototype,`dropdown`,void 0),p_=V([k(`smart-facet-dropdown`)],p_);var m_={collection:`Collection: `,creator:`By: `,subject:`About: `};function h_(e){return e.charAt(0).toUpperCase()+e.slice(1)}var g_=class extends O{constructor(...e){super(...e),this.filterToggleShown=!1,this.filterToggleActive=!1,this.heuristicRecs=[],this.smartFacets=[]}render(){if(!this.query)return D;let e=!!this.label&&this.smartFacets.length>0;return T`
      <div id="smart-facets-container">
        ${this.filtersToggleTemplate}
        ${e?T`<p id="filters-label">${this.label}</p>`:D}
        ${Mg(this.smartFacets,e=>`${e[0].label}|${e[0].facets[0].facetType}|${e[0].facets[0].bucketKey}`,e=>this.makeSmartFacet(e))}
      </div>
    `}willUpdate(e){let t=!1;e.has(`query`)&&(c_(`query change`,e.get(`query`),this.query),this.lastAggregations=void 0,t=!0),e.has(`aggregations`)&&!this.lastAggregations&&this.aggregations&&Object.keys(this.aggregations).length>0&&(c_(`aggs change`,e.get(`aggregations`),this.aggregations),this.lastAggregations=this.aggregations,t=!0),t&&(c_(`should update smart facets, doing so...`),this.updateSmartFacets())}refresh(){this.lastAggregations=this.aggregations,this.updateSmartFacets()}deselectAll(){for(let e of this.smartFacets)for(let t of e)t.selected=!1;this.requestUpdate()}async updateSmartFacets(){c_(`updating smart facets`),this.query&&(this.heuristicRecs=await new s_().getRecommendedFacets(this.query),c_(`heuristic recs are`,this.heuristicRecs),this.smartFacets=Wg(this.facetsToDisplay),c_(`smart facets are`,this.smartFacets))}makeSmartFacet(e){return e.length===0?D:e.length===1?this.smartFacetButton(e[0]):this.smartFacetDropdown(e)}smartFacetButton(e){return T`
      <smart-facet-button
        .facetInfo=${e}
        .labelPrefix=${m_[e.facets[0].facetType]}
        .selected=${e.selected??!1}
        @facetClick=${this.facetClicked}
      ></smart-facet-button>
    `}smartFacetDropdown(e){return T`
      <smart-facet-dropdown
        .facetInfo=${e}
        .labelPrefix=${m_[e[0].facets[0].facetType]}
        .activeFacetRef=${e[0].facets[0]}
        @facetClick=${this.dropdownOptionClicked}
        @dropdownClick=${this.dropdownClicked}
      ></smart-facet-dropdown>
    `}get filtersToggleTemplate(){return this.filterToggleShown?T`
      <button
        id="filters-toggle"
        class=${this.filterToggleActive?`active`:``}
        title="${this.filterToggleActive?`Hide`:`Show`} filters pane"
        @click=${this.filterToggleClicked}
      >
        ${l_}
      </button>
    `:D}get facetsToDisplay(){let e=[];if(this.heuristicRecs.length>0)for(let t of this.heuristicRecs)t.facets.length===1&&t.facets[0].facetType===`mediatype`||e.push([t]);if(this.lastAggregations)for(let t of[`mediatype`,`year`,`language`,`creator`,`subject`,`collection`]){let n=this.lastAggregations[t];if(!n||n.buckets.length===0||[`lending`,`year_histogram`,`date_histogram`].includes(t)||typeof n.buckets[0]==`number`||t===`mediatype`&&this.selectedFacets&&Object.values(this.selectedFacets.mediatype??{}).some(e=>e.state!==`none`))continue;let r=t,i=n.buckets.filter(e=>{let t=this.selectedFacets?.[r]?.[e.key];return!(t&&t.state!==`none`)});if(r!==`mediatype`)if(r===`collection`||r===`subject`){let t=i.slice(0,5);e.push(t.map(e=>this.toSmartFacet(r,[e])))}else e.push([this.toSmartFacet(r,[i[0]])])}return e}toSmartFacet(e,t){return{facets:t.map(t=>{let n=h_(t.key.toString());if(e===`collection`){let e=this.collectionTitles?.get(t.key.toString());e&&(n=e)}return{facetType:e,bucketKey:t.key.toString(),displayText:n}})}}toggleSmartFacet(e,t){let n;e.selected?(n=`none`,this.smartFacets=this.smartFacets.map(t=>t[0]===e?[{...e,selected:!1}]:t)):(n=`selected`,this.smartFacets=[[{...e,selected:!0}],...this.smartFacets.filter(t=>t[0]!==e)]),this.updateSelectedFacets(t.map(e=>({...e,bucket:{...e.bucket,state:n}})))}updateSelectedFacets(e){for(let t of e)this.selectedFacets=Pa(this.selectedFacets,t.facetType,t.bucket,!0);let t=new CustomEvent(`facetsChanged`,{detail:this.selectedFacets});this.dispatchEvent(t)}facetClicked(e){this.toggleSmartFacet(e.detail.smartFacet,e.detail.details)}dropdownOptionClicked(e){let t=this.smartFacets.find(t=>t.length===1&&Ug(t[0],e.detail.smartFacet));if(t){this.toggleSmartFacet(t[0],e.detail.details);return}this.smartFacets=[[{...e.detail.smartFacet,selected:!0}],...this.smartFacets],this.updateSelectedFacets(e.detail.details)}dropdownClicked(e){c_(`smart bar: onDropdownClick`,e.detail),this.shadowRoot?.querySelectorAll(`smart-facet-dropdown`).forEach(t=>{t!==e.detail&&(c_(`closing`,t),t.close())})}filterToggleClicked(){this.dispatchEvent(new CustomEvent(`filtersToggled`))}static get styles(){return w`
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
    `}};V([A({type:String})],g_.prototype,`query`,void 0),V([A({type:Object})],g_.prototype,`aggregations`,void 0),V([A({type:Object})],g_.prototype,`selectedFacets`,void 0),V([A({type:Object})],g_.prototype,`collectionTitles`,void 0),V([A({type:Boolean})],g_.prototype,`filterToggleShown`,void 0),V([A({type:Boolean})],g_.prototype,`filterToggleActive`,void 0),V([A({type:String})],g_.prototype,`label`,void 0),V([j()],g_.prototype,`heuristicRecs`,void 0),V([j()],g_.prototype,`smartFacets`,void 0),V([j()],g_.prototype,`lastAggregations`,void 0),g_=V([k(`smart-facet-bar`)],g_);var __,Q=class extends O{static{__=this}constructor(){super(),this.baseImageUrl=`https://archive.org`,this.searchType=x.DEFAULT,this.selectedSort=R.default,this.selectedTitleFilter=null,this.selectedCreatorFilter=null,this.sortDirection=null,this.defaultSortField=R.relevance,this.defaultSortDirection=null,this.pageSize=50,this.showSmartFacetBar=!1,this.showHistogramDatePicker=!1,this.suppressPlaceholders=!1,this.suppressResultCount=!1,this.suppressResultTiles=!1,this.suppressURLQuery=!1,this.suppressURLSinParam=!1,this.suppressSortBar=!1,this.suppressDisplayModes=!1,this.suppressMediatypeFacets=!1,this.facetLoadStrategy=`eager`,this.facetPaneVisible=!1,this.clearResultsOnEmptyQuery=!1,this.collectionPagePath=`/details/`,this.searchContext=Ba.default,this.pageContext=`search`,this.restorationStateHandler=new ka({context:this.pageContext}),this.mobileBreakpoint=600,this.loggedIn=!1,this.modalManager=void 0,this.isTVCollection=!1,this.isManageView=!1,this.manageViewLabel=`Select items to remove`,this.enableSortOptionsSlot=!1,this.showSmartResults=!1,this.maxPagesToManage=15,this.dataSource=new za(this,this.pageSize),this.initialPageNumber=1,this.pagesToRender=this.initialPageNumber,this.searchResultsLoading=!1,this.facetsLoading=!1,this.mobileView=!1,this.tileBlurOverrideState=`no-override`,this.collapsibleFacetsVisible=!1,this.placeholderType=null,this.selectedTVNetwork=void 0,this.selectedTVShow=void 0,this.tvMapsPopulated=!1,this.tvMapsLoading=!1,this.tvMapsErrored=!1,this.layoutSizeAnalyticsSent=!1,this.isScrollingToCell=!1,this.isResizeToMobile=!1,this.dataSourceInstallInProgress=!1,this.placeholderCellTemplate=T`<collection-browser-loading-tile></collection-browser-loading-tile>`,this.deferredFetchTimer=0,this.updateLeftColumnHeight=()=>{if(this.mobileView)this.leftColumn?.style?.removeProperty(`height`);else{let e=this.leftColumn?.getBoundingClientRect().top,t=window.innerHeight-(e??0),n=e===0?null:`calc(${t}px - var(--leftColumnPaddingTop, 2rem))`;this.leftColumn?.style?.setProperty(`height`,n)}},this.updateFacetFadeOut=e=>{(this.shadowRoot?.getElementById(`facets-bottom-fade`))?.classList.toggle(`hidden`,e?.[0]?.isIntersecting)},this.initialQueryChangeHappened=!1,this.historyPopOccurred=!1,this.addController(this.dataSource)}tileModelAtCellIndex(e){let t=this.dataSource.getTileModelAt(e);if(!t&&!this.isScrollingToCell&&this.dataSource.queryInitialized){let t=Math.floor(e/this.pageSize)+1;this.scheduleDeferredPageFetch(t)}return t}static{this.DEFERRED_FETCH_DELAY_MS=150}scheduleDeferredPageFetch(e){this.deferredFetchTimer?window.clearTimeout(this.deferredFetchTimer):this.dataSource.fetchPage(e),this.deferredFetchTimer=window.setTimeout(()=>{this.deferredFetchTimer=0,this.fetchVisiblePages()},__.DEFERRED_FETCH_DELAY_MS)}fetchVisiblePages(){let e=this.infiniteScroller?.getVisibleCellIndices()??[],t=new Set(e.map(e=>Math.floor(e/this.pageSize)+1));for(let e of t){let t=(e-1)*this.pageSize;this.dataSource.getTileModelAt(t)||this.dataSource.fetchPage(e)}}get estimatedTileCount(){return this.pagesToRender*this.pageSize}async getSessionId(){try{let e=sessionStorage?.getItem(`cb-session`);if(e)return e;if(this.sessionIdGenPromise)return this.sessionIdGenPromise;this.sessionIdGenPromise=Ma(Math.random().toString());let t=await this.sessionIdGenPromise;return sessionStorage?.setItem(`cb-session`,t),t}catch{return``}}goToPage(e){return this.initialPageNumber=e,this.pagesToRender=e,this.scrollToPage(e)}setSearchResultsLoading(e){this.searchResultsLoading=e}setFacetsLoading(e){this.facetsLoading=e}setTotalResultCount(e){this.totalResults=e}clearFilters({facets:e=!0,dateRange:t=!0,letterFilters:n=!0,sort:r=!1}={}){e&&this.hasCheckedFacets&&(this.selectedFacets=ia()),t&&(this.minSelectedDate=void 0,this.maxSelectedDate=void 0),n&&(this.selectedTitleFilter=null,this.selectedCreatorFilter=null),r&&(this.sortDirection=null,this.selectedSort=R.default),this.clearTVDropdowns(),this.smartFacetBar&&this.smartFacetBar.deselectAll()}clearTVDropdowns(){this.selectedTVNetwork=void 0,this.selectedTVShow=void 0,this.tvNetworksDropdown&&this.tvNetworksDropdown.clearSelectedOption(),this.tvShowsDropdown&&this.tvShowsDropdown.clearSelectedOption()}get hasCheckedFacets(){if(!this.selectedFacets)return!1;for(let e of Object.values(this.selectedFacets))for(let t of Object.values(e))if(t.state!==`none`)return!0;return!1}get hasActiveFilters(){return!!(this.hasCheckedFacets||this.minSelectedDate||this.maxSelectedDate||this.selectedTitleFilter||this.selectedCreatorFilter)}willUpdate(e){if(this.setPlaceholderType(),e.has(`searchType`)&&this.searchType===x.TV&&this.applyDefaultTVSearchSort(),(e.has(`baseQuery`)||e.has(`identifiers`)||e.has(`searchType`)||e.has(`withinCollection`))&&!this.historyPopOccurred&&this.initialQueryChangeHappened){let t=e.has(`withinCollection`)&&!e.has(`selectedSort`)&&!e.has(`sortDirection`);this.clearFilters({sort:t,facets:!e.has(`selectedFacets`),dateRange:!(e.has(`minSelectedDate`)||e.has(`maxSelectedDate`)),letterFilters:!(e.has(`selectedTitleFilter`)||e.has(`selectedCreatorFilter`))})}}render(){return T`
      ${this.showSmartFacetBar&&this.placeholderType===null?T`<smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleShown=${!this.mobileView}
            .filterToggleActive=${this.facetPaneVisible}
            .label=${this.smartFacetBarLabel}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${()=>{this.facetPaneVisible=!this.facetPaneVisible,this.emitFacetPaneVisibilityChanged()}}
          ></smart-facet-bar>`:D}

      <div
        id="content-container"
        class=${this.mobileView?`mobile`:`desktop`}
      >
        ${this.placeholderType?this.emptyPlaceholderTemplate:this.collectionBrowserTemplate}
      </div>
    `}setPlaceholderType(){let e=this.dataSource.queryInitialized,t=!!this.baseQuery?.trim(),n=!!this.identifiers?.length,r=!!this.withinCollection,i=!!this.withinProfile,a=!r&&!i,o=!this.searchResultsLoading&&(this.dataSource.size===0||!this.searchService);this.placeholderType=null,!this.suppressPlaceholders&&(e?a&&!t&&!n?this.placeholderType=`empty-query`:o&&(this.placeholderType=!t&&r?`empty-collection`:`no-results`):this.placeholderType=`empty-query`,this.dataSource.queryErrorMessage&&(this.placeholderType=!t&&r?`collection-error`:`query-error`))}get emptyPlaceholderTemplate(){return T`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${this.dataSource.queryErrorMessage??``}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
    `}get collectionBrowserTemplate(){return T`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `}get leftColumnTemplate(){return this.mobileView?this.mobileLeftColumnTemplate:this.desktopLeftColumnTemplate}get mobileLeftColumnTemplate(){return T`
      <div
        id="left-column"
        class="column${this.isResizeToMobile?` preload`:``}"
      >
        ${this.facetTopViewSlot} ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `}get desktopLeftColumnTemplate(){return T`
      <div id="left-column" class="column" ?hidden=${!this.facetPaneVisible}>
        ${this.facetTopViewSlot}
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">${N(`Filters`)}</h2>
          ${this.resultsCountTemplate} ${this.clearFiltersBtnTemplate(!1)}
        </div>
        <div id="facets-container" aria-labelledby="facets-header">
          ${this.facetsTemplate}
          <div id="facets-scroll-sentinel"></div>
        </div>
        <div id="facets-bottom-fade"></div>
      </div>
    `}get facetTopViewSlot(){return T`<div id="facet-top-view">
      <slot name="facet-top-slot"></slot>
    </div>`}get resultsCountTemplate(){if(this.suppressResultCount)return D;let e=this.searchResultsLoading||this.totalResults===void 0,t=ar({filtered:this.hasActiveFilters}),n=this.totalResults?.toLocaleString(),r=this.totalResults===1?`Result`:`Results`;return T`
      <div id="results-total" class=${t} data-testid="results-total">
        <span id="big-results-count">
          ${e?T`Searching&hellip;`:n}
        </span>
        <span id="big-results-label">
          ${e?D:r}
        </span>
      </div>
    `}get rightColumnTemplate(){return T`
      <div id="right-column" class=${ar({column:!0,"full-width":!this.facetPaneVisible,"smart-results-spacing":!!this.showSmartResults})}>
        ${this.showSmartResults?T`<slot name="smart-results"></slot>`:D}
        <section id="results">
          <h2 class="results-section-heading">
            <slot name="results-heading"></slot>
          </h2>
          <div id="cb-top-view">
            <slot name="cb-top-slot"></slot>
          </div>
          ${this.isManageView?this.manageBarTemplate:this.sortFilterBarTemplate}
          <slot name="cb-results"></slot>
          ${this.displayMode===`list-compact`&&this.totalResults?this.listHeaderTemplate:D}
          ${this.suppressResultTiles?D:this.infiniteScrollerTemplate}
        </section>
      </div>
    `}get infiniteScrollerTemplate(){return T`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType?0:D}
      ariaLandmarkLabel="Search results"
      .estimatedCellHeight=${this.estimatedTileHeight}
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
      >${this.displayMode===`grid`?T`<slot name="result-last-tile" slot="result-last-tile"></slot>`:D}
    </infinite-scroller>`}get infiniteScrollerClasses(){return ar({[this.displayMode??``]:!!this.displayMode,hidden:!!this.placeholderType})}get estimatedTileHeight(){switch(this.displayMode){case`list-detail`:return 80;case`list-compact`:return 45;default:return 225}}get sortFilterBarTemplate(){if(this.suppressSortBar)return D;let e=$i;return this.withinCollection?.startsWith(`fav-`)||this.profileElement===`favorites`?e=ea:!this.withinCollection&&this.searchType===x.TV&&(e=ta),e.relevance=this.isRelevanceSortAvailable,T`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .sortFieldAvailability=${e}
        .displayMode=${this.displayMode}
        .selectedTitleFilter=${this.selectedTitleFilter}
        .selectedCreatorFilter=${this.selectedCreatorFilter}
        .prefixFilterCountMap=${this.dataSource.prefixFilterCountMap}
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
    `}get tileBlurCheckboxTemplate(){return this.dataSource.sessionContext?.is_archive_user?T`
      <label
        id="tile-blur-label"
        for="tile-blur-check"
        slot="sort-options-right"
      >
        ${N(`Blurring`)}
        <input
          id="tile-blur-check"
          type="checkbox"
          ?checked=${!this.shouldSuppressTileBlurring}
          @change=${this.tileBlurCheckboxChanged}
        />
      </label>
    `:D}get manageBarTemplate(){return T`
      <manage-bar
        .label=${this.manageViewLabel}
        .modalManager=${this.modalManager}
        .selectedItems=${this.dataSource.checkedTileModels}
        .profileElement=${this.profileElement}
        showSelectAll
        showUnselectAll
        ?showItemManageButton=${this.pageContext===`search`}
        ?removeAllowed=${this.dataSource.checkedTileModels.length!==0}
        @removeItems=${this.handleRemoveItems}
        @manageItems=${this.handleManageItems}
        @selectAll=${()=>this.dataSource.checkAllTiles()}
        @unselectAll=${()=>this.dataSource.uncheckAllTiles()}
        @cancel=${()=>{this.isManageView=!1,this.dataSource.uncheckAllTiles(),this.searchResultsLoading&&this.dataSource.resetPages()}}
      ></manage-bar>
    `}handleRemoveItems(){this.dispatchEvent(new CustomEvent(`itemRemovalRequested`,{detail:{items:this.dataSource.checkedTileModels.map(e=>`${e?.mediatype===`search`?`search:`:``}${e?.identifier??``}`)}}))}handleManageItems(){this.dispatchEvent(new CustomEvent(`itemManagerRequested`,{detail:{items:this.dataSource.checkedTileModels.map(e=>e?.identifier?e.identifier:``)}}))}refreshSmartFacets(){this.smartFacetBar?.refresh()}showRemoveItemsProcessingModal(){this.manageBar?.showRemoveItemsProcessingModal()}showRemoveItemsErrorModal(){this.manageBar?.showRemoveItemsErrorModal()}removeCheckedTiles(){this.dataSource.removeCheckedTiles()}tileBlurCheckboxChanged(e){let{checked:t}=e.target;this.tileBlurOverrideState=t?`on`:`off`,this.infiniteScroller?.refreshAllVisibleCells()}get shouldSuppressTileBlurring(){if(this.tileBlurOverrideState!==`no-override`)return this.tileBlurOverrideState===`off`;let{sessionContext:e}=this.dataSource;return e?.pps_relevant_user_preferences?.display__blur_moderated_content===`off`}userChangedSort(e){let{selectedSort:t,sortDirection:n}=e.detail;this.selectedSort=t,this.sortDirection=n,(this.currentPage??1)>1&&this.goToPage(1),this.setCurrentPage(1)}sendSortByAnalytics(e){let t=e&&!this.sortDirection;this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.sortBy,label:`${this.selectedSort}${this.sortDirection||t?`-${this.sortDirection}`:``}`})}selectedSortChanged(){this.dataSource.updatePrefixFiltersForCurrentSort()}get sortParam(){let e=Zi[this.selectedSort];if(!e?.handledBySearchService)return null;let t=new URL(window.location.href).searchParams.get(`sort`),n=e.searchServiceKey??t?.replace(/^-/,``);return this.sortDirection||=`asc`,n?{field:n,direction:this.sortDirection}:null}get defaultSortParam(){let e=this.defaultSortDirection??`asc`,t=Zi[this.defaultSortField].searchServiceKey;return t?{field:t,direction:e}:null}displayModeChanged(e){this.displayMode=e.detail.displayMode,this.displayMode&&this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.displayMode,label:this.displayMode})}get titleQuery(){return this.selectedTitleFilter?`firstTitle:${this.selectedTitleFilter}`:void 0}get creatorQuery(){return this.selectedCreatorFilter?`firstCreator:${this.selectedCreatorFilter}`:void 0}sendFilterByTitleAnalytics(e){if(!e&&!this.selectedTitleFilter)return;let t=e&&!this.selectedTitleFilter;this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.filterByTitle,label:t?`clear-${e}`:`${e||`start`}-${this.selectedTitleFilter}`})}sendFilterByCreatorAnalytics(e){if(!e&&!this.selectedCreatorFilter)return;let t=e&&!this.selectedCreatorFilter;this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.filterByCreator,label:t?`clear-${e}`:`${e||`start`}-${this.selectedCreatorFilter}`})}titleLetterSelected(e){this.selectedCreatorFilter=null,this.selectedTitleFilter=e.detail.selectedLetter}creatorLetterSelected(e){this.selectedTitleFilter=null,this.selectedCreatorFilter=e.detail.selectedLetter}get mobileFacetsTemplate(){return Aa.includes(this.profileElement)?D:T`
      <details id="mobile-filter-collapse" @toggle=${e=>{let t=e.target;this.isResizeToMobile=!1,this.collapsibleFacetsVisible=t.open,this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.mobileFacetsToggled,label:t.open?`open`:`closed`})}}>
        <summary>
          <span class="collapser-icon">${Va}</span>
          <h2>${N(`Filters`)}</h2>
          ${this.clearFiltersBtnTemplate(!0)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `}async tvDropdownToggled(e){if(e.detail&&!this.tvMapsPopulated){this.tvMapsLoading=!0,this.tvMapsErrored=!1;try{await this.dataSource.populateTVChannelMaps(),this.tvMapsPopulated=!0}catch{this.tvMapsErrored=!0}this.tvMapsLoading=!1}}async networksDropdownChanged(){let e=this.selectedTVNetwork,t=this.tvNetworksDropdown.selectedOption?.text;this.selectedTVNetwork=t??void 0;let n=this.dataSource.tvChannelMaps.channelToNetwork.entries();for(let[t,r]of n)if(r===e){let e={key:t.toLowerCase(),count:0,state:`none`};this.selectedFacets=Pa(this.selectedFacets,`creator`,e,!0)}else if(r===this.selectedTVNetwork){let e={key:t.toLowerCase(),count:0,state:`selected`};this.selectedFacets=Pa(this.selectedFacets,`creator`,e)}}async showsDropdownChanged(){let e=this.selectedTVShow,t=this.tvShowsDropdown.selectedOption?.text;if(this.selectedTVShow=t??void 0,e!==void 0){let t={key:e,count:0,state:`none`};this.selectedFacets=Pa(this.selectedFacets,`program`,t,!0)}if(this.selectedTVShow){let e={key:this.selectedTVShow,count:0,state:`selected`};this.selectedFacets=Pa(this.selectedFacets,`program`,e)}}get tvDropdownFiltersTemplate(){if(this.searchType!==x.TV)return D;let{channelToNetwork:e,programToChannels:t}=this.dataSource.tvChannelMaps,n=e?[...new Set(e.values())]:[],r=t?[...t.entries()]:[];e&&this.selectedTVNetwork&&(r=r.filter(([,t])=>Object.keys(t).some(t=>e.get(t)===this.selectedTVNetwork)));let i=N(`Filter by Network`),a=N(`Filter by Show`),o=r.map(([e])=>e),s=T`
      <span slot="empty-options">
        <img src="https://archive.org/images/loading.gif" />
      </span>
    `,c=T`
      <span slot="empty-options">
        ${N(`Unable to fetch options, try again later`)}
      </span>
    `;return T`
      <div id="tv-filters" slot="facets-top">
        <ia-combo-box
          id="tv-networks"
          class="tv-filter-dropdown"
          placeholder=${i}
          clearable
          wrap-arrow-keys
          sort
          .options=${n.map((e,t)=>({id:`network-${t}`,text:e}))}
          @toggle=${this.tvDropdownToggled}
          @change=${this.networksDropdownChanged}
        >
          <span slot="label" class="sr-only">${i}</span>
          ${this.tvMapsLoading?s:D}
          ${this.tvMapsErrored?c:D}
        </ia-combo-box>
        <ia-combo-box
          id="tv-shows"
          class="tv-filter-dropdown"
          placeholder=${a}
          max-autocomplete-entries="500"
          clearable
          wrap-arrow-keys
          sort
          .options=${o.map((e,t)=>({id:`show-${t}`,text:e}))}
          @toggle=${this.tvDropdownToggled}
          @change=${this.showsDropdownChanged}
        >
          <span slot="label" class="sr-only">${a}</span>
          ${this.tvMapsLoading?s:D}
          ${this.tvMapsErrored?c:D}
        </ia-combo-box>
      </div>
    `}get facetsTemplate(){if(Aa.includes(this.profileElement))return D;if(this.facetLoadStrategy===`off`)return T`
        <p class="facets-message">
          ${N(`Facets are temporarily unavailable.`)}
        </p>
      `;let e=this.isTVCollection||!this.withinCollection&&this.searchType===x.TV,t=e?sa:oa,n=T`
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
        ${this.tvDropdownFiltersTemplate}
      </collection-facets>
    `;return(this.facetLoadStrategy===`opt-in`||this.facetLoadStrategy===`opt-in-or-login`&&!this.loggedIn)&&!this.mobileView?T`
        <details
          class="desktop-facets-dropdown"
          @toggle=${e=>{let t=e.target;this.collapsibleFacetsVisible=t.open}}
        >
          <summary>
            <span class="collapser-icon">${Va}</span>
            <h2>${N(`Filters`)}</h2>
          </summary>
          ${n}
        </details>
      `:n}clearFiltersBtnTemplate(e){if(!this.hasActiveFilters)return D;let t=ar({"clear-filters-btn":!0,mobile:e}),n=e?`Clear all`:`Clear all filters`;return T`
      <div class="clear-filters-btn-row">
        ${e?T`<span class="clear-filters-btn-separator">&nbsp;</span>`:D}
        <button class=${t} @click=${this.clearFilters}>
          ${n}
        </button>
      </div>
    `}get listHeaderTemplate(){return T`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${`list-header`}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .defaultSortParam=${this.defaultSortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.shouldSuppressTileBlurring}
        >
        </tile-dispatcher>
      </div>
    `}histogramDateRangeUpdated(e){let{minDate:t,maxDate:n}=e.detail;[this.minSelectedDate,this.maxSelectedDate]=[t,n],this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.histogramChanged,label:this.dateRangeQueryClause})}get dateRangeQueryClause(){if(!(!this.minSelectedDate||!this.maxSelectedDate))return`year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`}emitManageModeChangedEvent(){this.dispatchEvent(new CustomEvent(`manageModeChanged`,{detail:this.isManageView}))}async installDataSourceAndQueryState(e,t){this.dataSource&&this.removeController(this.dataSource),this.dataSource=e,this.addController(this.dataSource),this.baseQuery=t.baseQuery,this.profileElement=t.profileElement,this.searchType=t.searchType,this.selectedFacets=t.selectedFacets??ia(),this.internalFilters=t.internalFilters,this.minSelectedDate=t.minSelectedDate,this.maxSelectedDate=t.maxSelectedDate,this.selectedSort=t.selectedSort??R.default,this.sortDirection=t.sortDirection,this.selectedTitleFilter=t.selectedTitleFilter,this.selectedCreatorFilter=t.selectedCreatorFilter,this.pagesToRender=this.initialPageNumber,this.dataSourceInstallInProgress=!0,this.requestUpdate(),await this.updateComplete,this.dataSourceInstallInProgress=!1,this.searchResultsLoading||(this.setTotalResultCount(this.dataSource.totalResults),this.setTileCount(this.dataSource.size)),this.refreshVisibleResults()}firstUpdated(){this.restoreState(),this.setInitialSize()}setInitialSize(){this.contentWidth=this.contentContainer.getBoundingClientRect().width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.sendLayoutSizeAnalytics()}sendLayoutSizeAnalytics(){this.analyticsHandler&&(this.layoutSizeAnalyticsSent=!0,this.analyticsHandler.sendEvent({category:this.searchContext,action:this.mobileView?z.loadMobileView:z.loadDesktopView}))}updated(e){if(e.has(`placeholderType`)&&this.placeholderType===null&&(this.leftColIntersectionObserver||this.setupLeftColumnScrollListeners(),this.facetsIntersectionObserver||this.setupFacetsScrollListeners(),this.updateLeftColumnHeight()),e.has(`analyticsHandler`)&&!this.layoutSizeAnalyticsSent&&this.sendLayoutSizeAnalytics(),(e.has(`displayMode`)||e.has(`baseNavigationUrl`)||e.has(`baseImageUrl`)||e.has(`loggedIn`))&&this.infiniteScroller?.reload(),e.has(`profileElement`)&&this.applyDefaultProfileSort(),e.has(`withinCollection`)&&this.withinCollection&&(this.baseQuery||(this.defaultSortField=this.withinCollection.startsWith(`fav-`)?R.datefavorited:R.weeklyview,this.defaultSortDirection=`desc`)),e.has(`baseQuery`)&&this.emitBaseQueryChanged(),e.has(`searchType`)&&this.emitSearchTypeChanged(),(e.has(`currentPage`)||e.has(`displayMode`))&&this.persistState(),(e.has(`baseQuery`)||e.has(`identifiers`)||e.has(`minSelectedDate`)||e.has(`maxSelectedDate`)||e.has(`selectedFacets`)||e.has(`searchService`)||e.has(`withinCollection`)||e.has(`withinProfile`)||e.has(`profileElement`))&&this.dataSource.refreshLetterCounts(),e.has(`selectedSort`)||e.has(`sortDirection`)){let t=e.get(`sortDirection`);this.sendSortByAnalytics(t),this.selectedSortChanged()}if(e.has(`selectedTitleFilter`)&&this.sendFilterByTitleAnalytics(e.get(`selectedTitleFilter`)),e.has(`selectedCreatorFilter`)&&this.sendFilterByCreatorAnalytics(e.get(`selectedCreatorFilter`)),this.updateFacetReadiness(),(e.has(`baseQuery`)||e.has(`identifiers`)||e.has(`searchType`)||e.has(`selectedTitleFilter`)||e.has(`selectedCreatorFilter`)||e.has(`minSelectedDate`)||e.has(`maxSelectedDate`)||e.has(`selectedSort`)||e.has(`sortDirection`)||e.has(`selectedFacets`)||e.has(`searchService`)||e.has(`withinCollection`)||e.has(`withinProfile`)||e.has(`profileElement`))&&this.handleQueryChange(),e.has(`searchResultsLoading`)&&this.emitSearchResultsLoadingChanged(),e.has(`facetsLoading`)&&this.facetsLoading&&this.collectionFacets&&(this.collectionFacets.moreLinksVisible=this.searchType!==x.FULLTEXT),e.has(`pagesToRender`)&&!this.dataSource.endOfDataReached&&this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount),e.has(`isManageView`)&&(this.isManageView?(this.displayMode=`grid`,this.fetchManageableSearchResults()):this.pageContext===`search`&&this.infiniteScroller?.reload(),this.infiniteScroller?.refreshAllVisibleCells(),e.get(`isManageView`)!==void 0&&this.emitManageModeChangedEvent()),e.has(`resizeObserver`)){let t=e.get(`resizeObserver`);t&&this.disconnectResizeObserver(t),this.setupResizeObserver()}this.ensureAvailableTilesDisplayed()}connectedCallback(){super.connectedCallback?.(),this.setupStateRestorationObserver(),this.setupResizeObserver()}disconnectedCallback(){this.resizeObserver&&this.disconnectResizeObserver(this.resizeObserver),this.boundNavigationHandler&&window.removeEventListener(`popstate`,this.boundNavigationHandler),this.deferredFetchTimer&&=(window.clearTimeout(this.deferredFetchTimer),0),this.leftColIntersectionObserver?.disconnect(),this.facetsIntersectionObserver?.disconnect(),window.removeEventListener(`resize`,this.updateLeftColumnHeight)}handleResize(e){let t=this.mobileView;e.target===this.contentContainer&&(this.contentWidth=e.contentRect.width,this.mobileView=this.contentWidth>0&&this.contentWidth<this.mobileBreakpoint,this.mobileView&&!t&&(this.isResizeToMobile=!0)),this.updateLeftColumnHeight()}ensureAvailableTilesDisplayed(){this.infiniteScroller&&this.infiniteScroller.itemCount<this.dataSource.size&&this.setTileCount(this.dataSource.endOfDataReached?this.dataSource.size:this.estimatedTileCount)}updateFacetReadiness(){let e=this.collapsibleFacetsVisible||this.facetLoadStrategy===`opt-in-or-login`&&this.loggedIn,t=[`opt-in`,`opt-in-or-login`].includes(this.facetLoadStrategy),n=!this.mobileView&&(!t||e),r=this.mobileView&&e;this.dataSource.handleFacetReadinessChange(n||r)}setupLeftColumnScrollListeners(){let e=this.shadowRoot?.querySelector(`#left-column-scroll-sentinel`);e&&(this.leftColIntersectionObserver=new IntersectionObserver(this.updateLeftColumnHeight,{threshold:[...Array(201).keys()].map(e=>e/200)}),this.leftColIntersectionObserver.observe(e)),window.addEventListener(`resize`,this.updateLeftColumnHeight)}setupFacetsScrollListeners(){let e=this.shadowRoot?.querySelector(`#facets-scroll-sentinel`);e&&(this.facetsIntersectionObserver=new IntersectionObserver(this.updateFacetFadeOut),this.facetsIntersectionObserver.observe(e))}emitBaseQueryChanged(){this.dispatchEvent(new CustomEvent(`baseQueryChanged`,{detail:{baseQuery:this.baseQuery}}))}emitSearchTypeChanged(){this.dispatchEvent(new CustomEvent(`searchTypeChanged`,{detail:this.searchType}))}emitFacetPaneVisibilityChanged(){this.dispatchEvent(new CustomEvent(`facetPaneVisibilityChanged`,{detail:this.facetPaneVisible}))}emitSearchError(){this.dispatchEvent(new CustomEvent(`searchError`,{detail:this.dataSource.queryErrorMessage}))}emitQueryStateChanged(){this.dispatchEvent(new CustomEvent(`queryStateChanged`,{detail:{baseQuery:this.baseQuery,withinCollection:this.withinCollection,withinProfile:this.withinProfile,profileElement:this.profileElement,searchType:this.searchType,selectedFacets:this.selectedFacets,internalFilters:this.internalFilters,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedSort:this.selectedSort,sortDirection:this.sortDirection,selectedTitleFilter:this.selectedTitleFilter,selectedCreatorFilter:this.selectedCreatorFilter}}))}emitEmptyResults(){this.dispatchEvent(new Event(`emptyResults`))}disconnectResizeObserver(e){e.removeObserver({target:this.contentContainer,handler:this})}setupResizeObserver(){!this.resizeObserver||!this.contentContainer||this.resizeObserver.addObserver({target:this.contentContainer,handler:this})}visibleCellsChanged(e){this.updateVisiblePage(e.detail.visibleCellIndices)}updateVisiblePage(e){if(this.isScrollingToCell||e.length===0)return;let t=[...e].sort((e,t)=>e-t),n=t[Math.min(this.pageSize,t.length)-1],r=Math.floor(n/this.pageSize)+1;this.setCurrentPage(r)}setCurrentPage(e){this.currentPage!==e&&(this.currentPage=e,this.dispatchEvent(new CustomEvent(`visiblePageChanged`,{detail:{pageNumber:e}})))}get initialSearchComplete(){return this.dataSource.initialSearchComplete}async handleQueryChange(){!this.searchService||this.dataSource.pageFetchQueryKey===this.previousQueryKey||this.baseQuery&&!this.dataSource.canPerformSearch||(this.previousQueryKey=this.dataSource.pageFetchQueryKey,this.totalResults=void 0,this.pagesToRender=this.initialPageNumber===1?2:this.initialPageNumber,this.infiniteScroller&&(this.infiniteScroller.itemCount=this.estimatedTileCount,this.infiniteScroller.reload()),this.withinCollection&&this.baseQuery?.trim()&&(this.defaultSortField=R.relevance,this.defaultSortDirection=null),!this.initialQueryChangeHappened&&this.initialPageNumber>1&&this.scrollToPage(this.initialPageNumber),this.initialQueryChangeHappened=!0,this.historyPopOccurred||this.persistState(),this.historyPopOccurred=!1)}setupStateRestorationObserver(){this.boundNavigationHandler||=this.historyNavigationHandler.bind(this),window.addEventListener(`popstate`,this.boundNavigationHandler)}historyNavigationHandler(){this.historyPopOccurred=!0,this.restoreState()}restoreState(){let e=this.restorationStateHandler.getRestorationState();this.displayMode=e.displayMode,!this.suppressURLSinParam&&e.searchType!=null&&(this.searchType=e.searchType),this.selectedSort=e.selectedSort??R.default,this.sortDirection=e.sortDirection??null,this.selectedTitleFilter=e.selectedTitleFilter??null,this.selectedCreatorFilter=e.selectedCreatorFilter??null,this.selectedFacets=e.selectedFacets,this.suppressURLQuery||(this.baseQuery=e.baseQuery),this.setCurrentPage(e.currentPage??1),this.minSelectedDate=e.minSelectedDate,this.maxSelectedDate=e.maxSelectedDate,this.currentPage&&this.currentPage>1&&this.goToPage(this.currentPage)}persistState(){let e=this.selectedSort===this.defaultSortField,t={displayMode:this.displayMode,searchType:this.suppressURLSinParam?void 0:this.searchType,selectedSort:e?R.default:this.selectedSort,sortDirection:this.sortDirection??void 0,selectedFacets:this.selectedFacets??ia(),baseQuery:this.suppressURLQuery?void 0:this.baseQuery,currentPage:this.currentPage,titleQuery:this.titleQuery,creatorQuery:this.creatorQuery,minSelectedDate:this.minSelectedDate,maxSelectedDate:this.maxSelectedDate,selectedTitleFilter:this.selectedTitleFilter??void 0,selectedCreatorFilter:this.selectedCreatorFilter??void 0},n={forceReplace:this.dataSourceInstallInProgress,persistMetadataSearchType:this.isTVCollection};this.restorationStateHandler.persistState(t,n)}emitSearchResultsLoadingChanged(){this.dispatchEvent(new CustomEvent(`searchResultsLoadingChanged`,{detail:{loading:this.searchResultsLoading}}))}facetsChanged(e){this.selectedFacets=e.detail}facetClickHandler({detail:{facetType:e,bucket:t,negative:n}}){let r;r=n?t.state===`none`?z.facetNegativeDeselected:z.facetNegativeSelected:t.state===`none`?z.facetDeselected:z.facetSelected,this.analyticsHandler?.sendEvent({category:this.searchContext,action:r,label:e})}async scrollToPage(e){let t=this.pageSize*(e-1),n=0;for(;!this.infiniteScroller&&n<20;)await this.updateComplete,n++;if(!this.infiniteScroller)return;this.infiniteScroller.itemCount<this.estimatedTileCount&&(this.infiniteScroller.itemCount=this.estimatedTileCount,await this.updateComplete),await new Promise(e=>{setTimeout(e,0)}),this.isScrollingToCell=!0;let r=await this.infiniteScroller.scrollToCell(t,!0);this.isScrollingToCell=!1,this.infiniteScroller.refreshAllVisibleCells(),r&&this.updateVisiblePage(this.infiniteScroller.getVisibleCellIndices())}get isRelevanceSortAvailable(){return!!this.baseQuery?.trim()}setTileCount(e){this.infiniteScroller&&(this.infiniteScroller.itemCount=e)}applyDefaultTVSearchSort(){this.defaultSortField=R.datearchived,this.defaultSortDirection=`desc`}applyDefaultCollectionSort(e){if(this.baseQuery){this.defaultSortField=R.relevance,this.defaultSortDirection=null;return}let t=e?.public_metadata?.identifier?.startsWith(`fav-`)?`-favoritedate`:`-week`,[n,r]=(e?.public_metadata?.[`sort-by`]??t).split(`:`);n.startsWith(`-`)?(n=n.slice(1),r=`desc`):[`asc`,`desc`].includes(r)||(r=`asc`);let i=Qi(n).field;i&&i!==R.default&&(this.defaultSortField=i,this.defaultSortDirection=r)}applyDefaultProfileSort(){if(this.profileElement){let e=na[this.profileElement];this.defaultSortField=e??R.weeklyview}else this.defaultSortField=R.weeklyview;this.defaultSortDirection=`desc`}get currentVisiblePageNumbers(){let e=this.infiniteScroller?.getVisibleCellIndices()??[],t=new Set;return e.forEach(e=>{let n=Math.floor(e/this.pageSize)+1;t.add(n)}),Array.from(t)}get isRadioCollection(){let{withinCollection:e}=this,t=[`radio`],n=t.includes(e),r=t.some(e=>this.dataSource.parentCollections?.includes(e));return n||r}refreshVisibleResults(){this.infiniteScroller?.refreshAllVisibleCells()}resultSelected(e){if(this.isManageView){let t=this.dataSource.indexOf(e.detail);t>=0&&this.infiniteScroller?.refreshCell(t),this.requestUpdate()}this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.resultSelected,label:e.detail.mediatype}),this.analyticsHandler?.sendEvent({category:this.searchContext,action:z.resultSelected,label:`page-${this.currentPage}`})}cellForIndex(e){let t=this.tileModelAtCellIndex(e);if(!t)return;let n=this.searchType===x.TV,r=this.searchType===x.RADIO,{isTVCollection:i,isRadioCollection:a}=this,o=n||r||i||a;return T`
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
        ?showTvClips=${n||i}
        ?enableHoverPane=${!0}
        ?useLocalTime=${o}
        @resultSelected=${e=>this.resultSelected(e)}
      >
      </tile-dispatcher>
    `}scrollThresholdReached(){!this.dataSource.endOfDataReached&&this.dataSource.queryInitialized&&(this.pagesToRender+=1,this.dataSource.fetchPage(this.pagesToRender))}fetchManageableSearchResults(){let e=!this.dataSource.totalResults,t=!this.searchResultsLoading&&this.dataSource.totalResults>100;this.pageContext===`search`&&(e||t)&&(this.dataSource.resetPages(),this.dataSource.fetchPage(1,this.maxPagesToManage),this.infiniteScroller?.reload())}static get styles(){return[Ha,w`
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
      `]}};V([A({type:String})],Q.prototype,`baseNavigationUrl`,void 0),V([A({type:String})],Q.prototype,`baseImageUrl`,void 0),V([A({type:Object})],Q.prototype,`searchService`,void 0),V([A({type:Number})],Q.prototype,`searchType`,void 0),V([A({type:String})],Q.prototype,`withinCollection`,void 0),V([A({type:String})],Q.prototype,`withinProfile`,void 0),V([A({type:String})],Q.prototype,`profileElement`,void 0),V([A({type:String})],Q.prototype,`baseQuery`,void 0),V([A({type:Array})],Q.prototype,`identifiers`,void 0),V([A({type:String})],Q.prototype,`displayMode`,void 0),V([A({type:String})],Q.prototype,`selectedSort`,void 0),V([A({type:String})],Q.prototype,`selectedTitleFilter`,void 0),V([A({type:String})],Q.prototype,`selectedCreatorFilter`,void 0),V([A({type:String})],Q.prototype,`sortDirection`,void 0),V([A({type:String})],Q.prototype,`defaultSortField`,void 0),V([A({type:String})],Q.prototype,`defaultSortDirection`,void 0),V([A({type:Number})],Q.prototype,`pageSize`,void 0),V([A({type:Number})],Q.prototype,`currentPage`,void 0),V([A({type:String})],Q.prototype,`minSelectedDate`,void 0),V([A({type:String})],Q.prototype,`maxSelectedDate`,void 0),V([A({type:Object})],Q.prototype,`selectedFacets`,void 0),V([A({type:Object})],Q.prototype,`internalFilters`,void 0),V([A({type:Boolean})],Q.prototype,`showSmartFacetBar`,void 0),V([A({type:String})],Q.prototype,`smartFacetBarLabel`,void 0),V([A({type:Boolean})],Q.prototype,`showHistogramDatePicker`,void 0),V([A({type:Boolean})],Q.prototype,`suppressPlaceholders`,void 0),V([A({type:Boolean})],Q.prototype,`suppressResultCount`,void 0),V([A({type:Boolean})],Q.prototype,`suppressResultTiles`,void 0),V([A({type:Boolean})],Q.prototype,`suppressURLQuery`,void 0),V([A({type:Boolean})],Q.prototype,`suppressURLSinParam`,void 0),V([A({type:Boolean})],Q.prototype,`suppressSortBar`,void 0),V([A({type:Boolean})],Q.prototype,`suppressDisplayModes`,void 0),V([A({type:Boolean})],Q.prototype,`suppressMediatypeFacets`,void 0),V([A({type:String})],Q.prototype,`facetLoadStrategy`,void 0),V([A({type:Boolean,reflect:!0})],Q.prototype,`facetPaneVisible`,void 0),V([A({type:Boolean})],Q.prototype,`clearResultsOnEmptyQuery`,void 0),V([A({type:String})],Q.prototype,`collectionPagePath`,void 0),V([A({type:String,reflect:!0})],Q.prototype,`searchContext`,void 0),V([A({type:String})],Q.prototype,`pageContext`,void 0),V([A({type:Object})],Q.prototype,`restorationStateHandler`,void 0),V([A({type:Number})],Q.prototype,`mobileBreakpoint`,void 0),V([A({type:Boolean})],Q.prototype,`loggedIn`,void 0),V([A({type:Object})],Q.prototype,`resizeObserver`,void 0),V([A({type:Object})],Q.prototype,`modalManager`,void 0),V([A({type:Object})],Q.prototype,`featureFeedbackService`,void 0),V([A({type:Object})],Q.prototype,`recaptchaManager`,void 0),V([A({type:Boolean})],Q.prototype,`isTVCollection`,void 0),V([A({type:Boolean})],Q.prototype,`isManageView`,void 0),V([A({type:String})],Q.prototype,`manageViewLabel`,void 0),V([A({type:Boolean})],Q.prototype,`enableSortOptionsSlot`,void 0),V([A({type:Boolean,reflect:!0})],Q.prototype,`showSmartResults`,void 0),V([A({type:Number})],Q.prototype,`maxPagesToManage`,void 0),V([A({type:Object})],Q.prototype,`dataSource`,void 0),V([j()],Q.prototype,`pagesToRender`,void 0),V([j()],Q.prototype,`searchResultsLoading`,void 0),V([j()],Q.prototype,`facetsLoading`,void 0),V([j()],Q.prototype,`totalResults`,void 0),V([j()],Q.prototype,`mobileView`,void 0),V([j()],Q.prototype,`tileBlurOverrideState`,void 0),V([j()],Q.prototype,`collapsibleFacetsVisible`,void 0),V([j()],Q.prototype,`contentWidth`,void 0),V([j()],Q.prototype,`placeholderType`,void 0),V([j()],Q.prototype,`selectedTVNetwork`,void 0),V([j()],Q.prototype,`selectedTVShow`,void 0),V([j()],Q.prototype,`tvMapsPopulated`,void 0),V([j()],Q.prototype,`tvMapsLoading`,void 0),V([j()],Q.prototype,`tvMapsErrored`,void 0),V([M(`#content-container`)],Q.prototype,`contentContainer`,void 0),V([M(`#left-column`)],Q.prototype,`leftColumn`,void 0),V([M(`collection-facets`)],Q.prototype,`collectionFacets`,void 0),V([M(`manage-bar`)],Q.prototype,`manageBar`,void 0),V([M(`smart-facet-bar`)],Q.prototype,`smartFacetBar`,void 0),V([M(`#tv-networks`)],Q.prototype,`tvNetworksDropdown`,void 0),V([M(`#tv-shows`)],Q.prototype,`tvShowsDropdown`,void 0),V([A({type:Object,attribute:!1})],Q.prototype,`analyticsHandler`,void 0),V([M(`infinite-scroller`)],Q.prototype,`infiniteScroller`,void 0),Q=__=V([k(`collection-browser`)],Q);var $=class extends O{constructor(...t){super(...t),this.searchService=this.initSearchServiceFromUrlParams(),this.resizeObserver=new tr,this.toggleSlots=!1,this.cellWidth=18,this.cellHeight=29,this.rowGap=1.7,this.colGap=1.7,this.suppressFacets=!1,this.lazyLoadFacets=!1,this.loggedIn=!1,this.searchType=x.METADATA,this.analyticsManager=new e,this.analyticsHandler={sendPing:this.sendAnalytics.bind(this),sendEvent:this.sendAnalytics.bind(this),sendEventNoSampling:this.sendAnalytics.bind(this)}}sendAnalytics(e){console.log(`Analytics Received ----`,e),this.latestAction=e,this.analyticsManager?.sendEvent(e)}initSearchServiceFromUrlParams(){let e=new URL(window.location.href).searchParams;return new Pe({includeCredentials:!1,baseUrl:e.get(`search_base_url`)??void 0,servicePath:e.get(`search_service_path`)??void 0,debuggingEnabled:!!e.get(`debugging`)})}searchPressed(e){e.preventDefault(),this.searchQuery=this.baseQueryField.value,this.collectionBrowser.searchType=this.searchType,this.goToCurrentPage()}collectionChanged(e){e.preventDefault(),this.withinCollection=this.baseCollectionField.value,this.collectionBrowser.withinCollection=this.withinCollection,this.goToCurrentPage()}goToCurrentPage(){let e=this.currentPage??1;e>1?this.collectionBrowser.goToPage(e):this.collectionBrowser.initialPageNumber=1}changePagePressed(e){e.preventDefault(),this.currentPage=this.pageNumberInput.valueAsNumber,this.collectionBrowser.goToPage(this.currentPage)}updated(e){e.has(`currentPage`)&&this.currentPage&&(this.pageNumberInput.value=this.currentPage.toString()),e.has(`searchQuery`)&&this.queryUpdated()}queryUpdated(){this.collectionBrowser.baseQuery=this.searchQuery}get getClass(){return new URLSearchParams(window.location.search).get(`hide-dev-tools`)?`hidden`:``}render(){return T`
      <div class="dev-tool-container">
        <div id="dev-tools" class=${this.getClass}>
          <div id="search-and-page-inputs">
            <form @submit=${this.searchPressed}>
              <label for="base-query-field"> Query: </label>
              <input
                type="text"
                id="base-query-field"
                .value=${this.searchQuery??``}
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
                .value=${this.withinCollection??``}
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
                .checked=${this.searchType===x.DEFAULT}
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
                .checked=${this.searchType===x.METADATA}
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
                .checked=${this.searchType===x.FULLTEXT}
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
                .checked=${this.searchType===x.TV}
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
                .checked=${this.searchType===x.RADIO}
                @click=${this.searchTypeSelected}
              />
              <label for="radio-search">Radio</label>
            </span>
          </div>

          <div id="toggle-controls">
            <button
              @click=${()=>{(this.shadowRoot?.getElementById(`cell-size-control`))?.classList.toggle(`hidden`),(this.shadowRoot?.getElementById(`cell-gap-control`))?.classList.toggle(`hidden`)}}
            >
              Toggle Cell Controls
            </button>
            <button
              @click=${()=>{(this.shadowRoot?.getElementById(`latest-event-details`))?.classList.toggle(`hidden`)}}
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
            <div class="checkbox-control">
              <input
                type="checkbox"
                id="minimal-tiles-check"
                @click=${this.minimalTilesChanged}
              />
              <label for="minimal-tiles-check">Minimal tile layouts</label>
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
            <div class="text-input-control">
              <label for="within-profile-input">withinProfile</label>
              <input
                type="text"
                id="within-profile-input"
                placeholder="e.g. @foobar"
                @change=${e=>{let t=e.target.value.trim();this.withinProfile=t||void 0}}
              />
            </div>
            <details class="profile-element-controls">
              <summary>
                Profile tab
                (profileElement)${this.profileElement?T`: <strong>${this.profileElement}</strong>`:``}
              </summary>
              <div class="profile-element-options">
                <div class="checkbox-control">
                  <input
                    type="radio"
                    id="profile-none"
                    name="profile-element"
                    value=""
                    checked
                    @click=${this.profileElementChanged}
                  />
                  <label for="profile-none">None</label>
                </div>
                ${[`uploads`,`favorites`,`reviews`,`collections`,`lending`,`web_archives`,`forum_posts`].map(e=>T`
                    <div class="checkbox-control">
                      <input
                        type="radio"
                        id="profile-${e}"
                        name="profile-element"
                        value="${e}"
                        @click=${this.profileElementChanged}
                      />
                      <label for="profile-${e}">${e}</label>
                    </div>
                  `)}
              </div>
            </details>
          </fieldset>

          <fieldset class="user-profile-controls">
            <legend>Set Placeholder Types</legend>
            <div class="checkbox-control">
              <input
                id="enable-loading-placeholder"
                type="radio"
                @click=${()=>this.setPlaceholderType(`loading-placeholder`)}
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
                @click=${()=>this.setPlaceholderType(`error-placeholder`)}
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
          .baseNavigationUrl=${`https://archive.org`}
          .baseImageUrl=${`https://archive.org`}
          .searchService=${this.searchService}
          .resizeObserver=${this.resizeObserver}
          .showHistogramDatePicker=${!0}
          .suppressFacets=${this.suppressFacets}
          .lazyLoadFacets=${this.lazyLoadFacets}
          .loggedIn=${this.loggedIn}
          .modalManager=${this.modalManager}
          .analyticsHandler=${this.analyticsHandler}
          .withinProfile=${this.withinProfile}
          .profileElement=${this.profileElement}
          .pageContext=${`search`}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
          @searchTypeChanged=${this.searchTypeChanged}
          @manageModeChanged=${this.manageModeChanged}
          @itemRemovalRequested=${this.handleItemRemovalRequest}
          @itemManagerRequested=${this.handleItemManagerRequest}
        >
          ${this.toggleSlots?T`<div slot="sortbar-left-slot">Sort Slot</div>`:D}
          ${this.toggleSlots?T`<div slot="facet-top-slot">Facet Slot</div>`:D}
        </collection-browser>
      </div>
      <modal-manager></modal-manager>
    `}async setPlaceholderType(e){switch(e){case`loading-placeholder`:this.collectionBrowser.baseQuery=``,this.collectionBrowser.suppressPlaceholders=!0,this.collectionBrowser.clearResultsOnEmptyQuery=!0,this.requestUpdate(),await this.collectionBrowser.updateComplete;break;default:break}}baseQueryChanged(e){this.searchQuery=e.detail.baseQuery}searchTypeChanged(e){this.searchType=e.detail}searchTypeSelected(e){let t=e.target;this.searchType=this.searchTypeFromSelectedOption(t.value)}searchTypeFromSelectedOption(e){switch(e){case`metadata`:return x.METADATA;case`fulltext`:return x.FULLTEXT;case`tv`:return x.TV;case`radio`:return x.RADIO;default:return x.DEFAULT}}loginChanged(e){e.target.checked?this.loggedIn=!0:this.loggedIn=!1}outlineChanged(e){e.target.checked?this.collectionBrowser.style.setProperty(`--infiniteScrollerCellOutline`,`1px solid #33D1FF`):this.collectionBrowser.style.removeProperty(`--infiniteScrollerCellOutline`)}minimalTilesChanged(e){let t=e.target,n=[...(this.collectionBrowser?.shadowRoot.querySelector(`infinite-scroller`)).shadowRoot.querySelectorAll(`tile-dispatcher`)];t.checked?n?.forEach(e=>e.layoutType=`minimal`):n?.forEach(e=>e.layoutType=`default`)}toggleDevTools(){let e=new URL(window.location.href),{searchParams:t}=e;t.get(`hide-dev-tools`)?t.delete(`hide-dev-tools`):t.set(`hide-dev-tools`,`true`),this.shadowRoot?.getElementById(`dev-tools`)?.classList.toggle(`hidden`),window.history.replaceState&&window.history.replaceState({path:e.toString()},``,e.toString())}toggleFacetGroupOutline(e){e.target.checked?(this.collectionBrowser.classList.add(`showFacetGroupOutlines`),this.modalManager.classList.add(`showFacetGroupOutlines`)):(this.collectionBrowser.classList.remove(`showFacetGroupOutlines`),this.modalManager.classList.remove(`showFacetGroupOutlines`))}datePickerChanged(e){let t=e.target;this.collectionBrowser.showHistogramDatePicker=t.checked,this.collectionBrowser.showHistogramDatePicker||(this.collectionBrowser.minSelectedDate=void 0,this.collectionBrowser.maxSelectedDate=void 0)}facetsChanged(e){let t=e.target;this.suppressFacets=!t.checked}lazyLoadFacetsChanged(e){let t=e.target;this.lazyLoadFacets=t.checked}manageModeChanged(e){let t=this.shadowRoot?.querySelector(`#enable-management`);t&&(t.checked=e.detail)}handleItemRemovalRequest(e){this.collectionBrowser.showRemoveItemsProcessingModal(),console.log(`itemRemovalRequested: `,e.detail.items),setTimeout(()=>{this.collectionBrowser.showRemoveItemsErrorModal()},2e3)}handleItemManagerRequest(e){console.log(`itemManagerRequested: `,e.detail.items)}manageModeCheckboxChanged(e){let t=e.target;this.collectionBrowser.isManageView=t.checked,this.collectionBrowser.manageViewLabel=`Select items to remove (customizable texts)`}SearchManageModeCheckboxChanged(e){let t=e.target;this.collectionBrowser.pageContext=t.checked?`search`:`collection`}smartFacetBarCheckboxChanged(e){let t=e.target;this.collectionBrowser.showSmartFacetBar=t.checked}facetTopSlotCheckboxChanged(e){let t=e.target,n=document.createElement(`p`);n.style.setProperty(`border`,`1px solid #000`),n.textContent=`New stuff as a child.`,n.style.setProperty(`height`,`20rem`),n.style.backgroundColor=`#00000`,n.setAttribute(`slot`,`facet-top-slot`),t.checked?this.collectionBrowser.appendChild(n):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}toggleSlotOptions(){this.toggleSlots=!this.toggleSlots}resultLastTileSlotCheckboxChanged(e){let t=e.target,n=document.createElement(`div`),r=document.createElement(`h3`);r.textContent=`Upload`,n.setAttribute(`slot`,`result-last-tile`),n.setAttribute(`class`,`result-last-tile`),n.appendChild(r),t.checked?this.collectionBrowser.appendChild(n):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}cbTopSlotCheckboxChanged(e){let t=e.target,n=document.createElement(`p`);n.style.setProperty(`border`,`1px solid #000`),n.textContent=`My Favorite list header.`,n.style.setProperty(`height`,`10rem`),n.style.backgroundColor=`#00000`,n.setAttribute(`slot`,`cb-top-slot`),t.checked?this.collectionBrowser.appendChild(n):this.collectionBrowser.removeChild(this.collectionBrowser.lastElementChild)}sortBarLeftSlotCheckboxChanged(e){if(e.target.checked){let e=document.createElement(`div`);e.style.setProperty(`border`,`1px solid #000`),e.textContent=`Btn`,e.style.setProperty(`height`,`3rem`),e.style.setProperty(`width`,`3rem`),e.setAttribute(`slot`,`sort-options-left`),this.collectionBrowser.appendChild(e)}else{let e=this.collectionBrowser.querySelector(`[slot="sort-options-left"]`);e&&this.collectionBrowser.removeChild(e)}}sortBarRightSlotCheckboxChanged(e){if(e.target.checked){let e=document.createElement(`div`);e.style.setProperty(`border`,`1px solid #000`),e.textContent=`Search bar`,e.style.setProperty(`height`,`3rem`),e.style.setProperty(`width`,`15rem`),e.setAttribute(`slot`,`sort-options-right`),this.collectionBrowser.appendChild(e)}else{let e=this.collectionBrowser.querySelector(`[slot="sort-options-right"]`);e&&this.collectionBrowser.removeChild(e)}}rowGapChanged(e){let t=e.target;this.rowGap=parseFloat(t.value),this.collectionBrowser.style.setProperty(`--collectionBrowserRowGap`,`${t.value}rem`)}colGapChanged(e){let t=e.target;this.colGap=parseFloat(t.value),this.collectionBrowser.style.setProperty(`--collectionBrowserColGap`,`${t.value}rem`)}widthChanged(e){let t=e.target;this.cellWidth=parseFloat(t.value),this.collectionBrowser.style.setProperty(`--collectionBrowserCellMinWidth`,`${t.value}rem`)}heightChanged(e){let t=e.target;this.cellHeight=parseFloat(t.value),this.collectionBrowser.style.setProperty(`--collectionBrowserCellMinHeight`,`${t.value}rem`),this.collectionBrowser.style.setProperty(`--collectionBrowserCellMaxHeight`,`${t.value}rem`)}visiblePageChanged(e){let{pageNumber:t}=e.detail;t!==this.currentPage&&(this.currentPage=t)}replaceSortOptionsChanged(e){if(e.target.checked){let e=document.createElement(`p`);e.style.setProperty(`border`,`1px solid #000`),e.textContent=`New stuff as a child.`,e.style.setProperty(`height`,`20px`),e.setAttribute(`slot`,`sort-options`),this.collectionBrowser.appendChild(e),this.collectionBrowser.enableSortOptionsSlot=!0}else{let e=this.collectionBrowser.querySelector(`[slot="sort-options"]`);e&&this.collectionBrowser.removeChild(e),this.collectionBrowser.enableSortOptionsSlot=!1}}profileElementChanged(e){let t=e.target;this.profileElement=t.value||void 0}static{this.styles=w`
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

    .profile-element-controls {
      margin-top: 4px;
    }

    .profile-element-controls summary {
      cursor: pointer;
      user-select: none;
    }

    .profile-element-options {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 8px;
      margin-top: 4px;
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
  `}};V([j()],$.prototype,`toggleSlots`,void 0),V([j()],$.prototype,`currentPage`,void 0),V([j()],$.prototype,`searchQuery`,void 0),V([j()],$.prototype,`withinCollection`,void 0),V([j()],$.prototype,`cellWidth`,void 0),V([j()],$.prototype,`cellHeight`,void 0),V([j()],$.prototype,`rowGap`,void 0),V([j()],$.prototype,`colGap`,void 0),V([j()],$.prototype,`suppressFacets`,void 0),V([j()],$.prototype,`lazyLoadFacets`,void 0),V([j()],$.prototype,`loggedIn`,void 0),V([j()],$.prototype,`searchType`,void 0),V([j()],$.prototype,`profileElement`,void 0),V([j()],$.prototype,`withinProfile`,void 0),V([A({type:Object,reflect:!1})],$.prototype,`latestAction`,void 0),V([M(`#base-query-field`)],$.prototype,`baseQueryField`,void 0),V([M(`#base-collection-field`)],$.prototype,`baseCollectionField`,void 0),V([M(`#page-number-input`)],$.prototype,`pageNumberInput`,void 0),V([M(`collection-browser`)],$.prototype,`collectionBrowser`,void 0),V([M(`modal-manager`)],$.prototype,`modalManager`,void 0),$=V([k(`app-root`)],$);