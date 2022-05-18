var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
const p$5 = function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(script) {
    const fetchOpts = {};
    if (script.integrity)
      fetchOpts.integrity = script.integrity;
    if (script.referrerpolicy)
      fetchOpts.referrerPolicy = script.referrerpolicy;
    if (script.crossorigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (script.crossorigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
};
p$5();
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c2 = arguments.length, r2 = c2 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d2;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r2 = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i2 = decorators.length - 1; i2 >= 0; i2--)
      if (d2 = decorators[i2])
        r2 = (c2 < 3 ? d2(r2) : c2 > 3 ? d2(target, key, r2) : d2(target, key)) || r2;
  return c2 > 3 && r2 && Object.defineProperty(target, key, r2), r2;
}
function Memoize(args) {
  let hashFunction;
  let duration;
  let tags;
  if (typeof args === "object") {
    hashFunction = args.hashFunction;
    duration = args.expiring;
    tags = args.tags;
  } else {
    hashFunction = args;
  }
  return (target, propertyKey, descriptor) => {
    if (descriptor.value != null) {
      descriptor.value = getNewFunction(descriptor.value, hashFunction, duration, tags);
    } else if (descriptor.get != null) {
      descriptor.get = getNewFunction(descriptor.get, hashFunction, duration, tags);
    } else {
      throw "Only put a Memoize() decorator on a method or get accessor.";
    }
  };
}
const clearCacheTagsMap = /* @__PURE__ */ new Map();
function getNewFunction(originalMethod, hashFunction, duration = 0, tags) {
  const propMapName = Symbol(`__memoized_map__`);
  return function(...args) {
    let returnedValue;
    if (!this.hasOwnProperty(propMapName)) {
      Object.defineProperty(this, propMapName, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: /* @__PURE__ */ new Map()
      });
    }
    let myMap = this[propMapName];
    if (Array.isArray(tags)) {
      for (const tag of tags) {
        if (clearCacheTagsMap.has(tag)) {
          clearCacheTagsMap.get(tag).push(myMap);
        } else {
          clearCacheTagsMap.set(tag, [myMap]);
        }
      }
    }
    if (hashFunction || args.length > 0 || duration > 0) {
      let hashKey;
      if (hashFunction === true) {
        hashKey = args.map((a2) => a2.toString()).join("!");
      } else if (hashFunction) {
        hashKey = hashFunction.apply(this, args);
      } else {
        hashKey = args[0];
      }
      const timestampKey = `${hashKey}__timestamp`;
      let isExpired = false;
      if (duration > 0) {
        if (!myMap.has(timestampKey)) {
          isExpired = true;
        } else {
          let timestamp = myMap.get(timestampKey);
          isExpired = Date.now() - timestamp > duration;
        }
      }
      if (myMap.has(hashKey) && !isExpired) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
        if (duration > 0) {
          myMap.set(timestampKey, Date.now());
        }
      }
    } else {
      const hashKey = this;
      if (myMap.has(hashKey)) {
        returnedValue = myMap.get(hashKey);
      } else {
        returnedValue = originalMethod.apply(this, args);
        myMap.set(hashKey, returnedValue);
      }
    }
    return returnedValue;
  };
}
class BooleanParser {
  parseValue(rawValue) {
    if (typeof rawValue === "string" && (rawValue === "false" || rawValue === "0")) {
      return false;
    }
    return Boolean(rawValue);
  }
}
BooleanParser.shared = new BooleanParser();
class NumberParser {
  parseValue(rawValue) {
    if (typeof rawValue === "number")
      return rawValue;
    if (typeof rawValue === "boolean")
      return void 0;
    const value = parseFloat(rawValue);
    if (Number.isNaN(value)) {
      return void 0;
    }
    return value;
  }
}
NumberParser.shared = new NumberParser();
class ByteParser {
  parseValue(rawValue) {
    const parser = NumberParser.shared;
    return parser.parseValue(rawValue);
  }
}
ByteParser.shared = new ByteParser();
class DateParser {
  parseValue(rawValue) {
    return this.parseJSDate(rawValue) || this.parseBracketDate(rawValue);
  }
  parseBracketDate(rawValue) {
    if (typeof rawValue !== "string")
      return void 0;
    const yearMatch = rawValue.match(/\[([0-9]{4})\]/);
    if (!yearMatch || yearMatch.length < 2) {
      return void 0;
    }
    return this.parseJSDate(yearMatch[1]);
  }
  parseJSDate(rawValue) {
    if (typeof rawValue !== "string")
      return void 0;
    let parsedValue = rawValue;
    if (parsedValue.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}\s{1}[0-9]{2}:[0-9]{2}:[0-9]{2}$/)) {
      parsedValue = parsedValue.replace(" ", "T");
    }
    const parsed = Date.parse(parsedValue);
    if (Number.isNaN(parsed)) {
      return void 0;
    }
    let date = new Date(parsedValue);
    const dateWithTimeZone = parsedValue.indexOf("Z") > -1 || parsedValue.indexOf("+") > -1 || parsedValue.match(/^[0-9]{4}$/) || parsedValue.match(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/) || parsedValue.match(/^.*?-[0-9]{2}:[0-9]{2}$/) || parsedValue.match(/^.*?-[0-9]{4}$/);
    if (dateWithTimeZone) {
      date = new Date(date.getTime() + date.getTimezoneOffset() * 1e3 * 60);
    }
    return date;
  }
}
DateParser.shared = new DateParser();
class DurationParser {
  parseValue(rawValue) {
    if (typeof rawValue === "number")
      return rawValue;
    if (typeof rawValue === "boolean")
      return void 0;
    const componentArray = rawValue.split(":");
    let seconds;
    if (componentArray.length === 1) {
      seconds = this.parseNumberFormat(componentArray[0]);
    } else {
      seconds = this.parseColonSeparatedFormat(componentArray);
    }
    return seconds;
  }
  parseNumberFormat(rawValue) {
    let seconds = parseFloat(rawValue);
    if (Number.isNaN(seconds))
      seconds = void 0;
    return seconds;
  }
  parseColonSeparatedFormat(componentArray) {
    let hasNaNComponent = false;
    const parsedValue = componentArray.map((element, index) => {
      const componentValue = parseFloat(element);
      if (Number.isNaN(componentValue)) {
        hasNaNComponent = true;
        return 0;
      }
      const exponent = componentArray.length - 1 - index;
      const multiplier = 60 ** exponent;
      return componentValue * Math.floor(multiplier);
    }).reduce((a2, b2) => a2 + b2, 0);
    return hasNaNComponent ? void 0 : parsedValue;
  }
}
DurationParser.shared = new DurationParser();
class MediaTypeParser {
  parseValue(rawValue) {
    if (typeof rawValue !== "string")
      return void 0;
    return rawValue;
  }
}
MediaTypeParser.shared = new MediaTypeParser();
class ListParser {
  constructor(parser, options) {
    this.separators = [";", ","];
    this.parser = parser;
    if (options && options.separators) {
      this.separators = options.separators;
    }
  }
  parseValue(rawValue) {
    const stringifiedValue = String(rawValue);
    let results = [];
    for (const separator of this.separators) {
      results = stringifiedValue.split(separator);
      if (results.length > 1)
        break;
    }
    return this.parseListValues(results);
  }
  parseListValues(rawValues) {
    const trimmed = rawValues.map((s2) => s2.trim());
    const parsed = trimmed.map((rawValue) => this.parser.parseValue(rawValue));
    const result = [];
    parsed.forEach((p2) => {
      if (p2 !== void 0)
        result.push(p2);
    });
    return result;
  }
}
class PageProgressionParser {
  parseValue(rawValue) {
    if (typeof rawValue !== "string")
      return void 0;
    return rawValue;
  }
}
PageProgressionParser.shared = new PageProgressionParser();
class StringParser {
  parseValue(rawValue) {
    return String(rawValue);
  }
}
StringParser.shared = new StringParser();
class MetadataField {
  constructor(parser, rawValue) {
    this.parser = parser;
    this.rawValue = rawValue;
  }
  get values() {
    const values = this.parseRawValue();
    return values;
  }
  get value() {
    return this.values[0];
  }
  parseRawValue() {
    if (this.rawValue === void 0)
      return [];
    const rawValues = Array.isArray(this.rawValue) ? this.rawValue : [this.rawValue];
    const values = [];
    rawValues.forEach((value) => {
      const parsed = this.parser.parseValue(value);
      if (Array.isArray(parsed)) {
        values.push(...parsed);
      } else {
        if (parsed !== void 0)
          values.push(parsed);
      }
    });
    return values;
  }
}
__decorate([
  Memoize()
], MetadataField.prototype, "values", null);
__decorate([
  Memoize()
], MetadataField.prototype, "value", null);
class BooleanField extends MetadataField {
  constructor(rawValue) {
    super(BooleanParser.shared, rawValue);
  }
}
class DateField extends MetadataField {
  constructor(rawValue) {
    super(DateParser.shared, rawValue);
  }
}
class DurationField extends MetadataField {
  constructor(rawValue) {
    super(DurationParser.shared, rawValue);
  }
}
class NumberField extends MetadataField {
  constructor(rawValue) {
    super(NumberParser.shared, rawValue);
  }
}
class StringField extends MetadataField {
  constructor(rawValue) {
    super(StringParser.shared, rawValue);
  }
}
class PageProgressionField extends MetadataField {
  constructor(rawValue) {
    super(PageProgressionParser.shared, rawValue);
  }
}
class ByteField extends MetadataField {
  constructor(rawValue) {
    super(ByteParser.shared, rawValue);
  }
}
class MediaTypeField extends MetadataField {
  constructor(rawValue) {
    super(MediaTypeParser.shared, rawValue);
  }
}
class ListField extends MetadataField {
  constructor(rawValue, parser) {
    super(parser, rawValue);
  }
}
class StringListField extends ListField {
  constructor(rawValue) {
    const parser = new ListParser(StringParser.shared);
    super(rawValue, parser);
  }
}
class Metadata {
  constructor(json) {
    this.rawMetadata = json;
  }
  get identifier() {
    var _a;
    return (_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.identifier;
  }
  get addeddate() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.addeddate) ? new DateField(this.rawMetadata.addeddate) : void 0;
  }
  get audio_codec() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.audio_codec) ? new StringField(this.rawMetadata.audio_codec) : void 0;
  }
  get audio_sample_rate() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.audio_sample_rate) ? new NumberField(this.rawMetadata.audio_sample_rate) : void 0;
  }
  get avg_rating() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.avg_rating) ? new NumberField(this.rawMetadata.avg_rating) : void 0;
  }
  get collection() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.collection) ? new StringField(this.rawMetadata.collection) : void 0;
  }
  get collections_raw() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.collections_raw) ? new StringField(this.rawMetadata.collections_raw) : void 0;
  }
  get collection_size() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.collection_size) ? new ByteField(this.rawMetadata.collection_size) : void 0;
  }
  get contributor() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.contributor) ? new StringField(this.rawMetadata.contributor) : void 0;
  }
  get coverage() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.coverage) ? new StringField(this.rawMetadata.coverage) : void 0;
  }
  get creator() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.creator) ? new StringField(this.rawMetadata.creator) : void 0;
  }
  get date() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.date) ? new DateField(this.rawMetadata.date) : void 0;
  }
  get description() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.description) ? new StringField(this.rawMetadata.description) : void 0;
  }
  get downloads() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.downloads) ? new NumberField(this.rawMetadata.downloads) : void 0;
  }
  get duration() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.duration) ? new DurationField(this.rawMetadata.duration) : void 0;
  }
  get "external-identifier"() {
    var _a, _b;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a["external-identifier"]) ? new StringField((_b = this.rawMetadata) === null || _b === void 0 ? void 0 : _b["external-identifier"]) : void 0;
  }
  get files_count() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.files_count) ? new NumberField(this.rawMetadata.files_count) : void 0;
  }
  get indexdate() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.indexdate) ? new DateField(this.rawMetadata.indexdate) : void 0;
  }
  get isbn() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.isbn) ? new StringField(this.rawMetadata.isbn) : void 0;
  }
  get issue() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.issue) ? new StringField(this.rawMetadata.issue) : void 0;
  }
  get item_count() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.item_count) ? new NumberField(this.rawMetadata.item_count) : void 0;
  }
  get item_size() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.item_size) ? new ByteField(this.rawMetadata.item_size) : void 0;
  }
  get language() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.language) ? new StringField(this.rawMetadata.language) : void 0;
  }
  get length() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.length) ? new DurationField(this.rawMetadata.length) : void 0;
  }
  get lineage() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.lineage) ? new StringField(this.rawMetadata.lineage) : void 0;
  }
  get month() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.month) ? new NumberField(this.rawMetadata.month) : void 0;
  }
  get mediatype() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.mediatype) ? new MediaTypeField(this.rawMetadata.mediatype) : void 0;
  }
  get noindex() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.noindex) ? new BooleanField(this.rawMetadata.noindex) : void 0;
  }
  get notes() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.notes) ? new StringField(this.rawMetadata.notes) : void 0;
  }
  get num_favorites() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.num_favorites) ? new NumberField(this.rawMetadata.num_favorites) : void 0;
  }
  get num_reviews() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.num_reviews) ? new NumberField(this.rawMetadata.num_reviews) : void 0;
  }
  get openlibrary_edition() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.openlibrary_edition) ? new StringField(this.rawMetadata.openlibrary_edition) : void 0;
  }
  get openlibrary_work() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.openlibrary_work) ? new StringField(this.rawMetadata.openlibrary_work) : void 0;
  }
  get page_progression() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.page_progression) ? new PageProgressionField(this.rawMetadata.page_progression) : void 0;
  }
  get partner() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.partner) ? new StringField(this.rawMetadata.partner) : void 0;
  }
  get ppi() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.ppi) ? new NumberField(this.rawMetadata.ppi) : void 0;
  }
  get publicdate() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.publicdate) ? new DateField(this.rawMetadata.publicdate) : void 0;
  }
  get publisher() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.publisher) ? new StringField(this.rawMetadata.publisher) : void 0;
  }
  get reviewdate() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.reviewdate) ? new DateField(this.rawMetadata.reviewdate) : void 0;
  }
  get runtime() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.runtime) ? new DurationField(this.rawMetadata.runtime) : void 0;
  }
  get scanner() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.scanner) ? new StringField(this.rawMetadata.scanner) : void 0;
  }
  get source() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.source) ? new StringField(this.rawMetadata.source) : void 0;
  }
  get start_localtime() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.start_localtime) ? new DateField(this.rawMetadata.start_localtime) : void 0;
  }
  get start_time() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.start_time) ? new DateField(this.rawMetadata.start_time) : void 0;
  }
  get stop_time() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.stop_time) ? new DateField(this.rawMetadata.stop_time) : void 0;
  }
  get subject() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.subject) ? new StringListField(this.rawMetadata.subject) : void 0;
  }
  get taper() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.taper) ? new StringField(this.rawMetadata.taper) : void 0;
  }
  get title() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.title) ? new StringField(this.rawMetadata.title) : void 0;
  }
  get transferer() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.transferer) ? new StringField(this.rawMetadata.transferer) : void 0;
  }
  get track() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.track) ? new NumberField(this.rawMetadata.track) : void 0;
  }
  get type() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.type) ? new StringField(this.rawMetadata.type) : void 0;
  }
  get uploader() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.uploader) ? new StringField(this.rawMetadata.uploader) : void 0;
  }
  get utc_offset() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.utc_offset) ? new NumberField(this.rawMetadata.utc_offset) : void 0;
  }
  get venue() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.venue) ? new StringField(this.rawMetadata.venue) : void 0;
  }
  get volume() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.volume) ? new StringField(this.rawMetadata.volume) : void 0;
  }
  get week() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.week) ? new NumberField(this.rawMetadata.week) : void 0;
  }
  get year() {
    var _a;
    return ((_a = this.rawMetadata) === null || _a === void 0 ? void 0 : _a.year) ? new DateField(this.rawMetadata.year) : void 0;
  }
}
__decorate([
  Memoize()
], Metadata.prototype, "addeddate", null);
__decorate([
  Memoize()
], Metadata.prototype, "audio_codec", null);
__decorate([
  Memoize()
], Metadata.prototype, "audio_sample_rate", null);
__decorate([
  Memoize()
], Metadata.prototype, "avg_rating", null);
__decorate([
  Memoize()
], Metadata.prototype, "collection", null);
__decorate([
  Memoize()
], Metadata.prototype, "collections_raw", null);
__decorate([
  Memoize()
], Metadata.prototype, "collection_size", null);
__decorate([
  Memoize()
], Metadata.prototype, "contributor", null);
__decorate([
  Memoize()
], Metadata.prototype, "coverage", null);
__decorate([
  Memoize()
], Metadata.prototype, "creator", null);
__decorate([
  Memoize()
], Metadata.prototype, "date", null);
__decorate([
  Memoize()
], Metadata.prototype, "description", null);
__decorate([
  Memoize()
], Metadata.prototype, "downloads", null);
__decorate([
  Memoize()
], Metadata.prototype, "duration", null);
__decorate([
  Memoize()
], Metadata.prototype, "external-identifier", null);
__decorate([
  Memoize()
], Metadata.prototype, "files_count", null);
__decorate([
  Memoize()
], Metadata.prototype, "indexdate", null);
__decorate([
  Memoize()
], Metadata.prototype, "isbn", null);
__decorate([
  Memoize()
], Metadata.prototype, "issue", null);
__decorate([
  Memoize()
], Metadata.prototype, "item_count", null);
__decorate([
  Memoize()
], Metadata.prototype, "item_size", null);
__decorate([
  Memoize()
], Metadata.prototype, "language", null);
__decorate([
  Memoize()
], Metadata.prototype, "length", null);
__decorate([
  Memoize()
], Metadata.prototype, "lineage", null);
__decorate([
  Memoize()
], Metadata.prototype, "month", null);
__decorate([
  Memoize()
], Metadata.prototype, "mediatype", null);
__decorate([
  Memoize()
], Metadata.prototype, "noindex", null);
__decorate([
  Memoize()
], Metadata.prototype, "notes", null);
__decorate([
  Memoize()
], Metadata.prototype, "num_favorites", null);
__decorate([
  Memoize()
], Metadata.prototype, "num_reviews", null);
__decorate([
  Memoize()
], Metadata.prototype, "openlibrary_edition", null);
__decorate([
  Memoize()
], Metadata.prototype, "openlibrary_work", null);
__decorate([
  Memoize()
], Metadata.prototype, "page_progression", null);
__decorate([
  Memoize()
], Metadata.prototype, "partner", null);
__decorate([
  Memoize()
], Metadata.prototype, "ppi", null);
__decorate([
  Memoize()
], Metadata.prototype, "publicdate", null);
__decorate([
  Memoize()
], Metadata.prototype, "publisher", null);
__decorate([
  Memoize()
], Metadata.prototype, "reviewdate", null);
__decorate([
  Memoize()
], Metadata.prototype, "runtime", null);
__decorate([
  Memoize()
], Metadata.prototype, "scanner", null);
__decorate([
  Memoize()
], Metadata.prototype, "source", null);
__decorate([
  Memoize()
], Metadata.prototype, "start_localtime", null);
__decorate([
  Memoize()
], Metadata.prototype, "start_time", null);
__decorate([
  Memoize()
], Metadata.prototype, "stop_time", null);
__decorate([
  Memoize()
], Metadata.prototype, "subject", null);
__decorate([
  Memoize()
], Metadata.prototype, "taper", null);
__decorate([
  Memoize()
], Metadata.prototype, "title", null);
__decorate([
  Memoize()
], Metadata.prototype, "transferer", null);
__decorate([
  Memoize()
], Metadata.prototype, "track", null);
__decorate([
  Memoize()
], Metadata.prototype, "type", null);
__decorate([
  Memoize()
], Metadata.prototype, "uploader", null);
__decorate([
  Memoize()
], Metadata.prototype, "utc_offset", null);
__decorate([
  Memoize()
], Metadata.prototype, "venue", null);
__decorate([
  Memoize()
], Metadata.prototype, "volume", null);
__decorate([
  Memoize()
], Metadata.prototype, "week", null);
__decorate([
  Memoize()
], Metadata.prototype, "year", null);
class File {
  constructor(json) {
    this.rawValue = json;
  }
  get name() {
    return this.rawValue.name;
  }
  get source() {
    return this.rawValue.source;
  }
  get btih() {
    return this.rawValue.btih;
  }
  get md5() {
    return this.rawValue.md5;
  }
  get format() {
    return this.rawValue.format;
  }
  get mtime() {
    return this.rawValue.mtime;
  }
  get crc32() {
    return this.rawValue.crc32;
  }
  get sha1() {
    return this.rawValue.sha1;
  }
  get original() {
    return this.rawValue.original;
  }
  get size() {
    return this.rawValue.size ? ByteParser.shared.parseValue(this.rawValue.size) : void 0;
  }
  get title() {
    return this.rawValue.title;
  }
  get length() {
    return this.rawValue.length ? DurationParser.shared.parseValue(this.rawValue.length) : void 0;
  }
  get height() {
    return this.rawValue.height ? NumberParser.shared.parseValue(this.rawValue.height) : void 0;
  }
  get width() {
    return this.rawValue.width ? NumberParser.shared.parseValue(this.rawValue.width) : void 0;
  }
  get track() {
    return this.rawValue.track ? NumberParser.shared.parseValue(this.rawValue.track) : void 0;
  }
  get external_identifier() {
    return this.rawValue.external_identifier;
  }
  get creator() {
    return this.rawValue.creator;
  }
  get album() {
    return this.rawValue.album;
  }
}
__decorate([
  Memoize()
], File.prototype, "size", null);
__decorate([
  Memoize()
], File.prototype, "length", null);
__decorate([
  Memoize()
], File.prototype, "height", null);
__decorate([
  Memoize()
], File.prototype, "width", null);
__decorate([
  Memoize()
], File.prototype, "track", null);
class Review {
  constructor(json) {
    this.rawValue = json;
  }
  get reviewbody() {
    return this.rawValue.reviewbody;
  }
  get reviewtitle() {
    return this.rawValue.reviewtitle;
  }
  get reviewer() {
    return this.rawValue.reviewer;
  }
  get reviewdate() {
    return this.rawValue.reviewdate ? DateParser.shared.parseValue(this.rawValue.reviewdate) : void 0;
  }
  get createdate() {
    return this.rawValue.createdate ? DateParser.shared.parseValue(this.rawValue.createdate) : void 0;
  }
  get stars() {
    return this.rawValue.stars ? NumberParser.shared.parseValue(this.rawValue.stars) : void 0;
  }
}
__decorate([
  Memoize()
], Review.prototype, "reviewdate", null);
__decorate([
  Memoize()
], Review.prototype, "createdate", null);
__decorate([
  Memoize()
], Review.prototype, "stars", null);
class MetadataResponse {
  constructor(json) {
    var _a, _b;
    this.rawResponse = json;
    this.created = json.created;
    this.d1 = json.d1;
    this.d2 = json.d2;
    this.dir = json.dir;
    this.files = (_a = json.files) === null || _a === void 0 ? void 0 : _a.map((file) => new File(file));
    this.files_count = json.files_count;
    this.item_last_updated = json.item_last_updated;
    this.item_size = json.item_size;
    this.metadata = new Metadata(json.metadata);
    this.server = json.server;
    this.uniq = json.uniq;
    this.workable_servers = json.workable_servers;
    this.speech_vs_music_asr = json.speech_vs_music_asr;
    this.reviews = (_b = json.reviews) === null || _b === void 0 ? void 0 : _b.map((entry) => new Review(entry));
  }
}
class SearchResponseDetails {
  constructor(json) {
    this.numFound = json.numFound;
    this.start = json.start;
    this.docs = json.docs.map((doc) => new Metadata(doc));
    this.aggregations = json.aggregations;
  }
}
class SearchResponse {
  constructor(json) {
    this.rawResponse = json;
    this.responseHeader = json.responseHeader;
    this.response = new SearchResponseDetails(json.response);
  }
}
var SearchServiceErrorType;
(function(SearchServiceErrorType2) {
  SearchServiceErrorType2["networkError"] = "SearchService.NetworkError";
  SearchServiceErrorType2["itemNotFound"] = "SearchService.ItemNotFound";
  SearchServiceErrorType2["decodingError"] = "SearchService.DecodingError";
  SearchServiceErrorType2["searchEngineError"] = "SearchService.SearchEngineError";
})(SearchServiceErrorType || (SearchServiceErrorType = {}));
class SearchServiceError extends Error {
  constructor(type, message, details) {
    super(message);
    this.name = type;
    this.type = type;
    this.details = details;
  }
}
class SearchParamURLGenerator {
  static aggregateSearchParamsAsString(aggregateSearchParams) {
    if (aggregateSearchParams.advancedParams) {
      const params = aggregateSearchParams.advancedParams.map((param) => {
        return {
          terms: param
        };
      });
      const stringified = JSON.stringify(params);
      return stringified;
    }
    if (aggregateSearchParams.simpleParams) {
      return aggregateSearchParams.simpleParams.join(",");
    }
  }
  static sortParamsAsString(sortParams) {
    return `${sortParams.field} ${sortParams.direction}`;
  }
  static generateURLSearchParams(searchParams) {
    const params = new URLSearchParams();
    params.append("q", searchParams.query);
    params.append("output", "json");
    if (searchParams.rows) {
      params.append("rows", String(searchParams.rows));
    }
    if (searchParams.page) {
      params.append("page", String(searchParams.page));
    }
    if (searchParams.fields) {
      params.append("fl", searchParams.fields.join(","));
    }
    if (searchParams.sort) {
      const sortStrings = searchParams.sort.map((sort) => this.sortParamsAsString(sort));
      params.append("sort", sortStrings.join(","));
    }
    const aggregations = searchParams.aggregations;
    if (aggregations) {
      const aggString = this.aggregateSearchParamsAsString(aggregations);
      if (aggString) {
        params.append("user_aggs", aggString);
      }
    }
    return params;
  }
}
class DefaultSearchBackend {
  constructor(options) {
    var _a;
    this.baseUrl = (_a = options === null || options === void 0 ? void 0 : options.baseUrl) !== null && _a !== void 0 ? _a : "archive.org";
    if ((options === null || options === void 0 ? void 0 : options.includeCredentials) !== void 0) {
      this.includeCredentials = options.includeCredentials;
    } else {
      this.includeCredentials = window.location.href.match(/^https?:\/\/.*archive\.org(:[0-9]+)?/) !== null;
    }
    if ((options === null || options === void 0 ? void 0 : options.scope) !== void 0) {
      this.requestScope = options.scope;
    } else {
      const currentUrl = new URL(window.location.href);
      const scope = currentUrl.searchParams.get("scope");
      if (scope) {
        this.requestScope = scope;
      }
    }
  }
  async performSearch(params) {
    const urlSearchParam = SearchParamURLGenerator.generateURLSearchParams(params);
    const queryAsString = urlSearchParam.toString();
    const url = `https://${this.baseUrl}/advancedsearch.php?${queryAsString}`;
    return this.fetchUrl(url);
  }
  async fetchMetadata(identifier, keypath) {
    const path = keypath ? `/${keypath}` : "";
    const url = `https://${this.baseUrl}/metadata/${identifier}${path}`;
    return this.fetchUrl(url, {
      requestOptions: {
        credentials: "omit"
      }
    });
  }
  async fetchUrl(url, options) {
    var _a;
    const finalUrl = new URL(url);
    if (this.requestScope) {
      finalUrl.searchParams.set("scope", this.requestScope);
    }
    let response;
    try {
      const fetchOptions = (_a = options === null || options === void 0 ? void 0 : options.requestOptions) !== null && _a !== void 0 ? _a : {
        credentials: this.includeCredentials ? "include" : "same-origin"
      };
      response = await fetch(finalUrl.href, fetchOptions);
    } catch (err) {
      const message = err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
      return this.getErrorResult(SearchServiceErrorType.networkError, message);
    }
    try {
      const json = await response.json();
      const error = json["error"];
      if (error) {
        const forensics = json["forensics"];
        return this.getErrorResult(SearchServiceErrorType.searchEngineError, error, forensics);
      } else {
        return { success: json };
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : typeof err === "string" ? err : "Unknown error";
      return this.getErrorResult(SearchServiceErrorType.decodingError, message);
    }
  }
  getErrorResult(errorType, message, details) {
    const error = new SearchServiceError(errorType, message, details);
    const result = { error };
    return result;
  }
}
class SearchService {
  constructor(searchBackend) {
    this.searchBackend = searchBackend;
  }
  async search(params) {
    const rawResponse = await this.searchBackend.performSearch(params);
    if (rawResponse.error) {
      return rawResponse;
    }
    const modeledResponse = new SearchResponse(rawResponse.success);
    return { success: modeledResponse };
  }
  async fetchMetadata(identifier) {
    var _a;
    const rawResponse = await this.searchBackend.fetchMetadata(identifier);
    if (rawResponse.error) {
      return rawResponse;
    }
    if (((_a = rawResponse.success) === null || _a === void 0 ? void 0 : _a.metadata) === void 0) {
      return {
        error: new SearchServiceError(SearchServiceErrorType.itemNotFound)
      };
    }
    const modeledResponse = new MetadataResponse(rawResponse.success);
    return { success: modeledResponse };
  }
  async fetchMetadataValue(identifier, keypath) {
    var _a;
    const result = await this.searchBackend.fetchMetadata(identifier, keypath);
    if (result.error) {
      return result;
    }
    if (((_a = result.success) === null || _a === void 0 ? void 0 : _a.result) === void 0) {
      return {
        error: new SearchServiceError(SearchServiceErrorType.itemNotFound)
      };
    }
    return { success: result.success.result };
  }
}
SearchService.default = new SearchService(new DefaultSearchBackend());
function idbReady() {
  var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
  if (!isSafari || !indexedDB.databases)
    return Promise.resolve();
  var intervalId;
  return new Promise(function(resolve) {
    var tryIdb = function() {
      return indexedDB.databases().finally(resolve);
    };
    intervalId = setInterval(tryIdb, 100);
    tryIdb();
  }).finally(function() {
    return clearInterval(intervalId);
  });
}
function promisifyRequest(request) {
  return new Promise((resolve, reject) => {
    request.oncomplete = request.onsuccess = () => resolve(request.result);
    request.onabort = request.onerror = () => reject(request.error);
  });
}
function createStore(dbName, storeName) {
  const dbp = idbReady().then(() => {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    return promisifyRequest(request);
  });
  return (txMode, callback) => dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
}
let defaultGetStoreFunc;
function defaultGetStore() {
  if (!defaultGetStoreFunc) {
    defaultGetStoreFunc = createStore("keyval-store", "keyval");
  }
  return defaultGetStoreFunc;
}
function get$1(key, customStore = defaultGetStore()) {
  return customStore("readonly", (store) => promisifyRequest(store.get(key)));
}
function set(key, value, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.put(value, key);
    return promisifyRequest(store.transaction);
  });
}
function del(key, customStore = defaultGetStore()) {
  return customStore("readwrite", (store) => {
    store.delete(key);
    return promisifyRequest(store.transaction);
  });
}
function eachCursor(store, callback) {
  store.openCursor().onsuccess = function() {
    if (!this.result)
      return;
    callback(this.result);
    this.result.continue();
  };
  return promisifyRequest(store.transaction);
}
function keys(customStore = defaultGetStore()) {
  return customStore("readonly", (store) => {
    if (store.getAllKeys) {
      return promisifyRequest(store.getAllKeys());
    }
    const items = [];
    return eachCursor(store, (cursor) => items.push(cursor.key)).then(() => items);
  });
}
function addSeconds(date, seconds) {
  date.setMilliseconds(date.getMilliseconds() + seconds * 1e3);
  return date;
}
class LocalCache {
  constructor(options) {
    var _a, _b, _c, _d;
    this.namespace = (_a = options === null || options === void 0 ? void 0 : options.namespace) !== null && _a !== void 0 ? _a : "LocalCache";
    this.defaultTTL = (_b = options === null || options === void 0 ? void 0 : options.defaultTTL) !== null && _b !== void 0 ? _b : 15 * 60;
    if ((_c = options === null || options === void 0 ? void 0 : options.immediateClean) !== null && _c !== void 0 ? _c : true)
      this.cleanExpired();
    if (!(options === null || options === void 0 ? void 0 : options.disableCleaning)) {
      const cleaningInterval = (_d = options === null || options === void 0 ? void 0 : options.cleaningInterval) !== null && _d !== void 0 ? _d : 60;
      setInterval(() => {
        this.cleanExpired();
      }, cleaningInterval * 1e3);
    }
  }
  async set(options) {
    var _a;
    const cacheEntry = {
      value: options.value
    };
    const ttl = (_a = options.ttl) !== null && _a !== void 0 ? _a : this.defaultTTL;
    const expires = addSeconds(new Date(), ttl);
    cacheEntry.expires = expires;
    const namespacedKey = this.getNamespacedKey(options.key);
    try {
      await set(namespacedKey, cacheEntry);
    } catch (_b) {
    }
  }
  async get(key) {
    const namespacedKey = this.getNamespacedKey(key);
    let result;
    try {
      result = await get$1(namespacedKey);
    } catch (_a) {
    }
    if (!result)
      return;
    const now = new Date();
    if (result.expires && result.expires < now) {
      await this.delete(key);
      return;
    }
    return result.value;
  }
  async delete(key) {
    const namespacedKey = this.getNamespacedKey(key);
    try {
      await del(namespacedKey);
    } catch (_a) {
    }
  }
  async cleanExpired() {
    const keys2 = await this.getAllKeys();
    await Promise.all(keys2.map(async (key) => this.get(key)));
  }
  async getAllKeys() {
    let keys$1 = [];
    try {
      keys$1 = await keys();
    } catch (_a) {
    }
    const stringKeys = [];
    for (const key of keys$1) {
      if (typeof key === "string")
        stringKeys.push(key);
    }
    const namespacedKeys = stringKeys.filter((key) => key.startsWith(this.namespace));
    const keysWithoutNamespace = namespacedKeys.map((key) => this.removeNamespace(key));
    return keysWithoutNamespace;
  }
  getNamespacedKey(key) {
    return `${this.namespace}-${key}`;
  }
  removeNamespace(key) {
    return key.replace(`${this.namespace}-`, "");
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$e = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$k = Symbol(), n$m = /* @__PURE__ */ new Map();
class s$j {
  constructor(t3, n2) {
    if (this._$cssResult$ = true, n2 !== e$k)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e2 = n$m.get(this.cssText);
    return t$e && e2 === void 0 && (n$m.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$l = (t3) => new s$j(typeof t3 == "string" ? t3 : t3 + "", e$k), i$h = (e2, n2) => {
  t$e ? e2.adoptedStyleSheets = n2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n2.forEach((t3) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t3.cssText, e2.appendChild(n3);
  });
}, S$9 = t$e ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e2 = "";
  for (const n2 of t4.cssRules)
    e2 += n2.cssText;
  return o$l(e2);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$i;
const e$j = window.trustedTypes, r$b = e$j ? e$j.emptyScript : "", h$8 = window.reactiveElementPolyfillSupport, o$k = { toAttribute(t3, i2) {
  switch (i2) {
    case Boolean:
      t3 = t3 ? r$b : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i2) {
  let s2 = t3;
  switch (i2) {
    case Boolean:
      s2 = t3 !== null;
      break;
    case Number:
      s2 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t3);
      } catch (t4) {
        s2 = null;
      }
  }
  return s2;
} }, n$l = (t3, i2) => i2 !== t3 && (i2 == i2 || t3 == t3), l$f = { attribute: true, type: String, converter: o$k, reflect: false, hasChanged: n$l };
class a$a extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t3.push(e2));
    }), t3;
  }
  static createProperty(t3, i2 = l$f) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t3, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s2 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e2 = this.getPropertyDescriptor(t3, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t3, e2);
    }
  }
  static getPropertyDescriptor(t3, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t3];
      this[i2] = e2, this.requestUpdate(t3, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$f;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i2 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s2 of i2)
        this.createProperty(s2, t4[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$9(i3));
    } else
      i2 !== void 0 && s2.push(S$9(i2));
    return s2;
  }
  static _$Eh(t3, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s2 = t3.hostConnected) === null || s2 === void 0 || s2.call(t3));
  }
  removeController(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t3;
    const s2 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$h(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  attributeChangedCallback(t3, i2, s2) {
    this._$AK(t3, s2);
  }
  _$ES(t3, i2, s2 = l$f) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t3, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$k.toAttribute)(i2, s2.type);
      this._$Ei = t3, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t3, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t3);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t4 = h2.getPropertyOptions(n2), l2 = t4.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$k.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i2, s2) {
    let e2 = true;
    t3 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t3)).hasChanged || n$l)(this[t3], i2) ? (this._$AL.has(t3) || this._$AL.set(t3, i2), s2.reflect === true && this._$Ei !== t3 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i3) => this[i3] = t4), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t4);
      }), this.update(s2)) : this._$EU();
    } catch (t4) {
      throw i2 = false, this._$EU(), t4;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t4) => {
      var i3;
      return (i3 = t4.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$EC !== void 0 && (this._$EC.forEach((t4, i2) => this._$ES(i2, this[i2], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
}
a$a.finalized = true, a$a.elementProperties = /* @__PURE__ */ new Map(), a$a.elementStyles = [], a$a.shadowRootOptions = { mode: "open" }, h$8 == null || h$8({ ReactiveElement: a$a }), ((s$i = globalThis.reactiveElementVersions) !== null && s$i !== void 0 ? s$i : globalThis.reactiveElementVersions = []).push("1.3.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$d;
const i$g = globalThis.trustedTypes, s$h = i$g ? i$g.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e$i = `lit$${(Math.random() + "").slice(9)}$`, o$j = "?" + e$i, n$k = `<${o$j}>`, l$e = document, h$7 = (t3 = "") => l$e.createComment(t3), r$a = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function", d$4 = Array.isArray, u$9 = (t3) => {
  var i2;
  return d$4(t3) || typeof ((i2 = t3) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$8 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$4 = /-->/g, a$9 = />/g, f$6 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _$4 = /'/g, m$6 = /"/g, g$4 = /^(?:script|style|textarea|title)$/i, p$4 = (t3) => (i2, ...s2) => ({ _$litType$: t3, strings: i2, values: s2 }), $$4 = p$4(1), y$1 = p$4(2), b$4 = Symbol.for("lit-noChange"), w$4 = Symbol.for("lit-nothing"), T$4 = /* @__PURE__ */ new WeakMap(), x$4 = (t3, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N$4(i2.insertBefore(h$7(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
}, A$4 = l$e.createTreeWalker(l$e, 129, null, false), C$4 = (t3, i2) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$8;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t3[i3];
    let o3, u4, p2 = -1, $2 = 0;
    for (; $2 < s2.length && (d2.lastIndex = $2, u4 = d2.exec(s2), u4 !== null); )
      $2 = d2.lastIndex, d2 === c$8 ? u4[1] === "!--" ? d2 = v$4 : u4[1] !== void 0 ? d2 = a$9 : u4[2] !== void 0 ? (g$4.test(u4[2]) && (h2 = RegExp("</" + u4[2], "g")), d2 = f$6) : u4[3] !== void 0 && (d2 = f$6) : d2 === f$6 ? u4[0] === ">" ? (d2 = h2 != null ? h2 : c$8, p2 = -1) : u4[1] === void 0 ? p2 = -2 : (p2 = d2.lastIndex - u4[2].length, o3 = u4[1], d2 = u4[3] === void 0 ? f$6 : u4[3] === '"' ? m$6 : _$4) : d2 === m$6 || d2 === _$4 ? d2 = f$6 : d2 === v$4 || d2 === a$9 ? d2 = c$8 : (d2 = f$6, h2 = void 0);
    const y2 = d2 === f$6 && t3[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$8 ? s2 + n$k : p2 >= 0 ? (l2.push(o3), s2.slice(0, p2) + "$lit$" + s2.slice(p2) + e$i + y2) : s2 + e$i + (p2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u3 = r2 + (t3[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  if (!Array.isArray(t3) || !t3.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return [s$h !== void 0 ? s$h.createHTML(u3) : u3, l2];
};
class E$4 {
  constructor({ strings: t3, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u3 = t3.length - 1, c2 = this.parts, [v2, a2] = C$4(t3, s2);
    if (this.el = E$4.createElement(v2, n2), A$4.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i2 = t4.firstChild;
      i2.remove(), t4.append(...i2.childNodes);
    }
    for (; (l2 = A$4.nextNode()) !== null && c2.length < u3; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$i)) {
              const s3 = a2[d2++];
              if (t4.push(i2), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$i), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t5, ctor: i3[1] === "." ? M$5 : i3[1] === "?" ? H$5 : i3[1] === "@" ? I$4 : S$8 });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t4)
            l2.removeAttribute(i2);
        }
        if (g$4.test(l2.tagName)) {
          const t4 = l2.textContent.split(e$i), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i$g ? i$g.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t4[i2], h$7()), A$4.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t4[s3], h$7());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$j)
          c2.push({ type: 2, index: r2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e$i, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t4 += e$i.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i2) {
    const s2 = l$e.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function P$4(t3, i2, s2 = t3, e2) {
  var o2, n2, l2, h2;
  if (i2 === b$4)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u3 = r$a(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u3 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u3 === void 0 ? d2 = void 0 : (d2 = new u3(t3), d2._$AT(t3, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = P$4(t3, d2._$AS(t3, i2.values), d2, e2)), i2;
}
class V$4 {
  constructor(t3, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t3 == null ? void 0 : t3.creationScope) !== null && i2 !== void 0 ? i2 : l$e).importNode(s2, true);
    A$4.currentNode = o2;
    let n2 = A$4.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N$4(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i3 = new L$5(n2, this, t3)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A$4.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t3[i2])), i2++;
  }
}
class N$4 {
  constructor(t3, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = w$4, this._$AN = void 0, this._$AA = t3, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i2;
    return (i2 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t3.nodeType === 11 && (t3 = i2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i2 = this) {
    t3 = P$4(this, t3, i2), r$a(t3) ? t3 === w$4 || t3 == null || t3 === "" ? (this._$AH !== w$4 && this._$AR(), this._$AH = w$4) : t3 !== this._$AH && t3 !== b$4 && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.k(t3) : u$9(t3) ? this.S(t3) : this.$(t3);
  }
  A(t3, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i2);
  }
  k(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== w$4 && r$a(this._$AH) ? this._$AA.nextSibling.data = t3 : this.k(l$e.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i2;
    const { values: s2, _$litType$: e2 } = t3, o2 = typeof e2 == "number" ? this._$AC(t3) : (e2.el === void 0 && (e2.el = E$4.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new V$4(o2, this), i3 = t4.p(this.options);
      t4.m(s2), this.k(i3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i2 = T$4.get(t3.strings);
    return i2 === void 0 && T$4.set(t3.strings, i2 = new E$4(t3)), i2;
  }
  S(t3) {
    d$4(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t3)
      e2 === i2.length ? i2.push(s2 = new N$4(this.A(h$7()), this.A(h$7()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t3 && t3 !== this._$AB; ) {
      const i3 = t3.nextSibling;
      t3.remove(), t3 = i3;
    }
  }
  setConnected(t3) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t3, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t3));
  }
}
class S$8 {
  constructor(t3, i2, s2, e2, o2) {
    this.type = 1, this._$AH = w$4, this._$AN = void 0, this.element = t3, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = w$4;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t3 = P$4(this, t3, i2, 0), n2 = !r$a(t3) || t3 !== this._$AH && t3 !== b$4, n2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = P$4(this, e3[s2 + l2], i2, l2), h2 === b$4 && (h2 = this._$AH[l2]), n2 || (n2 = !r$a(h2) || h2 !== this._$AH[l2]), h2 === w$4 ? t3 = w$4 : t3 !== w$4 && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.C(t3);
  }
  C(t3) {
    t3 === w$4 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}
class M$5 extends S$8 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  C(t3) {
    this.element[this.name] = t3 === w$4 ? void 0 : t3;
  }
}
const k$4 = i$g ? i$g.emptyScript : "";
class H$5 extends S$8 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  C(t3) {
    t3 && t3 !== w$4 ? this.element.setAttribute(this.name, k$4) : this.element.removeAttribute(this.name);
  }
}
class I$4 extends S$8 {
  constructor(t3, i2, s2, e2, o2) {
    super(t3, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t3, i2 = this) {
    var s2;
    if ((t3 = (s2 = P$4(this, t3, i2, 0)) !== null && s2 !== void 0 ? s2 : w$4) === b$4)
      return;
    const e2 = this._$AH, o2 = t3 === w$4 && e2 !== w$4 || t3.capture !== e2.capture || t3.once !== e2.once || t3.passive !== e2.passive, n2 = t3 !== w$4 && (e2 === w$4 || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class L$5 {
  constructor(t3, i2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    P$4(this, t3);
  }
}
const R$1 = { P: "$lit$", L: e$i, V: o$j, I: 1, N: C$4, R: V$4, D: u$9, j: P$4, H: N$4, O: S$8, F: H$5, B: I$4, W: M$5, Z: L$5 }, z$4 = window.litHtmlPolyfillSupport;
z$4 == null || z$4(E$4, N$4), ((t$d = globalThis.litHtmlVersions) !== null && t$d !== void 0 ? t$d : globalThis.litHtmlVersions = []).push("2.2.0");
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$c = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$h = Symbol(), n$j = /* @__PURE__ */ new Map();
class s$g {
  constructor(t3, n2) {
    if (this._$cssResult$ = true, n2 !== e$h)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e2 = n$j.get(this.cssText);
    return t$c && e2 === void 0 && (n$j.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$i = (t3) => new s$g(typeof t3 == "string" ? t3 : t3 + "", e$h), r$9 = (t3, ...n2) => {
  const o2 = t3.length === 1 ? t3[0] : n2.reduce((e2, n3, s2) => e2 + ((t4) => {
    if (t4._$cssResult$ === true)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t3[s2 + 1], t3[0]);
  return new s$g(o2, e$h);
}, i$f = (e2, n2) => {
  t$c ? e2.adoptedStyleSheets = n2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n2.forEach((t3) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t3.cssText, e2.appendChild(n3);
  });
}, S$7 = t$c ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e2 = "";
  for (const n2 of t4.cssRules)
    e2 += n2.cssText;
  return o$i(e2);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$f;
const e$g = window.trustedTypes, r$8 = e$g ? e$g.emptyScript : "", h$6 = window.reactiveElementPolyfillSupport, o$h = { toAttribute(t3, i2) {
  switch (i2) {
    case Boolean:
      t3 = t3 ? r$8 : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i2) {
  let s2 = t3;
  switch (i2) {
    case Boolean:
      s2 = t3 !== null;
      break;
    case Number:
      s2 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t3);
      } catch (t4) {
        s2 = null;
      }
  }
  return s2;
} }, n$i = (t3, i2) => i2 !== t3 && (i2 == i2 || t3 == t3), l$d = { attribute: true, type: String, converter: o$h, reflect: false, hasChanged: n$i };
class a$8 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t3.push(e2));
    }), t3;
  }
  static createProperty(t3, i2 = l$d) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t3, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s2 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e2 = this.getPropertyDescriptor(t3, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t3, e2);
    }
  }
  static getPropertyDescriptor(t3, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t3];
      this[i2] = e2, this.requestUpdate(t3, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$d;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i2 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s2 of i2)
        this.createProperty(s2, t4[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$7(i3));
    } else
      i2 !== void 0 && s2.push(S$7(i2));
    return s2;
  }
  static _$Eh(t3, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s2 = t3.hostConnected) === null || s2 === void 0 || s2.call(t3));
  }
  removeController(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t3;
    const s2 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$f(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  attributeChangedCallback(t3, i2, s2) {
    this._$AK(t3, s2);
  }
  _$ES(t3, i2, s2 = l$d) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t3, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$h.toAttribute)(i2, s2.type);
      this._$Ei = t3, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t3, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t3);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t4 = h2.getPropertyOptions(n2), l2 = t4.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$h.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i2, s2) {
    let e2 = true;
    t3 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t3)).hasChanged || n$i)(this[t3], i2) ? (this._$AL.has(t3) || this._$AL.set(t3, i2), s2.reflect === true && this._$Ei !== t3 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i3) => this[i3] = t4), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t4);
      }), this.update(s2)) : this._$EU();
    } catch (t4) {
      throw i2 = false, this._$EU(), t4;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t4) => {
      var i3;
      return (i3 = t4.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$EC !== void 0 && (this._$EC.forEach((t4, i2) => this._$ES(i2, this[i2], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
}
a$8.finalized = true, a$8.elementProperties = /* @__PURE__ */ new Map(), a$8.elementStyles = [], a$8.shadowRootOptions = { mode: "open" }, h$6 == null || h$6({ ReactiveElement: a$8 }), ((s$f = globalThis.reactiveElementVersions) !== null && s$f !== void 0 ? s$f : globalThis.reactiveElementVersions = []).push("1.3.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$c, o$g;
class s$e extends a$8 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e2;
    const i2 = super.createRenderRoot();
    return (t3 = (e2 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t3) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = x$4(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b$4;
  }
}
s$e.finalized = true, s$e._$litElement$ = true, (l$c = globalThis.litElementHydrateSupport) === null || l$c === void 0 || l$c.call(globalThis, { LitElement: s$e });
const n$h = globalThis.litElementPolyfillSupport;
n$h == null || n$h({ LitElement: s$e });
((o$g = globalThis.litElementVersions) !== null && o$g !== void 0 ? o$g : globalThis.litElementVersions = []).push("3.2.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$g = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t3, elements: i2 } = e3;
  return { kind: t3, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$e = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$f(e2) {
  return (n2, t3) => t3 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t3) : i$e(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$b(t3) {
  return e$f(__spreadProps(__spreadValues({}, t3), { state: true }));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$f = ({ finisher: e2, descriptor: t3 }) => (o2, n2) => {
  var r2;
  if (n2 === void 0) {
    const n3 = (r2 = o2.originalKey) !== null && r2 !== void 0 ? r2 : o2.key, i2 = t3 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t3(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return e2 != null && (i2.finisher = function(t4) {
      e2(t4, n3);
    }), i2;
  }
  {
    const r3 = o2.constructor;
    t3 !== void 0 && Object.defineProperty(o2, n2, t3(n2)), e2 == null || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i$d(i2, n2) {
  return o$f({ descriptor: (o2) => {
    const t3 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t3.get = function() {
        var o3, t4;
        return this[n3] === void 0 && (this[n3] = (t4 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t4 !== void 0 ? t4 : null), this[n3];
      };
    }
    return t3;
  } });
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$f;
((n$f = window.HTMLSlotElement) === null || n$f === void 0 ? void 0 : n$f.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
class SharedResizeObserver {
  constructor() {
    this.resizeObserver = new ResizeObserver((entries) => {
      window.requestAnimationFrame(() => {
        for (const entry of entries) {
          const handlers = this.resizeHandlers.get(entry.target);
          handlers === null || handlers === void 0 ? void 0 : handlers.forEach((handler) => {
            handler.handleResize(entry);
          });
        }
      });
    });
    this.resizeHandlers = /* @__PURE__ */ new Map();
  }
  shutdown() {
    this.resizeHandlers.forEach((handlers, target) => {
      this.resizeObserver.unobserve(target);
    });
    this.resizeHandlers.clear();
  }
  addObserver(options) {
    var _a;
    const handlers = (_a = this.resizeHandlers.get(options.target)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
    handlers.add(options.handler);
    this.resizeHandlers.set(options.target, handlers);
    this.resizeObserver.observe(options.target, options.options);
  }
  removeObserver(options) {
    const handlers = this.resizeHandlers.get(options.target);
    if (!handlers)
      return;
    handlers.delete(options.handler);
    if (handlers.size === 0) {
      this.resizeObserver.unobserve(options.target);
      this.resizeHandlers.delete(options.target);
    }
  }
}
class CollectionNameCache {
  constructor(options) {
    var _a, _b, _c, _d;
    this.cacheKeyName = "collection-name-cache";
    this.cacheTtl = 60 * 60 * 24 * 7;
    this.defaultLoadDelay = 100;
    this.loadDelay = 100;
    this.defaultPruningAge = 1e3 * 60 * 60 * 24 * 7;
    this.defaultPruningInterval = 1e3 * 30;
    this.fetchTimeout = null;
    this.pendingIdentifierQueue = /* @__PURE__ */ new Set();
    this.pendingPromises = {};
    this.collectionNameCache = {};
    this.pruningAge = this.defaultPruningAge;
    this.maxCacheSize = 2500;
    this.cacheLoaded = false;
    this.searchService = options.searchService;
    this.localCache = options.localCache;
    this.loadDelay = (_a = options.loadDelay) !== null && _a !== void 0 ? _a : this.defaultLoadDelay;
    this.pruningAge = (_b = options.pruningAge) !== null && _b !== void 0 ? _b : this.pruningAge;
    this.maxCacheSize = (_c = options.maxCacheSize) !== null && _c !== void 0 ? _c : this.maxCacheSize;
    this.pruneCache();
    setInterval(async () => {
      await this.pruneCache();
    }, (_d = options.pruneInterval) !== null && _d !== void 0 ? _d : this.defaultPruningInterval);
  }
  async collectionNameFor(identifier) {
    if (!this.cacheLoaded)
      await this.loadFromCache();
    const lowercaseIdentifier = identifier.toLowerCase();
    const cachedName = this.collectionNameCache[lowercaseIdentifier];
    if (cachedName) {
      cachedName.lastAccess = Date.now();
      this.collectionNameCache[lowercaseIdentifier] = cachedName;
      return cachedName.name;
    }
    this.startPendingIdentifierTimer();
    return new Promise((resolve) => {
      var _a;
      this.pendingIdentifierQueue.add(lowercaseIdentifier);
      const currentPromises = (_a = this.pendingPromises[lowercaseIdentifier]) !== null && _a !== void 0 ? _a : [];
      const resultHandler = async (name) => {
        resolve(name);
      };
      currentPromises.push(resultHandler);
      this.pendingPromises[lowercaseIdentifier] = currentPromises;
    });
  }
  async preloadIdentifiers(identifiers) {
    if (!this.cacheLoaded)
      await this.loadFromCache();
    const lowercaseIdentifiers = identifiers.filter((element) => element !== void 0).map((identifier) => identifier.toLowerCase());
    for (const identifier of lowercaseIdentifiers) {
      if (this.collectionNameCache[identifier])
        continue;
      this.pendingIdentifierQueue.add(identifier);
    }
    this.startPendingIdentifierTimer();
  }
  async startPendingIdentifierTimer() {
    if (this.fetchTimeout)
      return;
    this.fetchTimeout = window.setTimeout(() => {
      this.loadPendingIdentifiers();
      this.fetchTimeout = null;
    }, this.loadDelay);
  }
  async loadFromCache() {
    if (!this.localCache || this.cacheLoaded)
      return;
    const cachedNames = await this.localCache.get(this.cacheKeyName);
    if (!cachedNames)
      return;
    this.collectionNameCache = cachedNames;
    this.cacheLoaded = true;
  }
  async loadPendingIdentifiers() {
    var _a, _b, _c;
    await this.loadFromCache();
    const pendingIdentifiers = Array.from(this.pendingIdentifierQueue).splice(0, 100);
    if (pendingIdentifiers.length === 0)
      return;
    pendingIdentifiers.map(async (identifier) => this.pendingIdentifierQueue.delete(identifier));
    const searchParams = {
      query: `identifier:(${pendingIdentifiers.join(" OR ")})`,
      fields: ["title", "identifier"],
      rows: pendingIdentifiers.length
    };
    const results = await this.searchService.search(searchParams);
    const docs = (_b = (_a = results.success) === null || _a === void 0 ? void 0 : _a.response) === null || _b === void 0 ? void 0 : _b.docs;
    if (docs && docs.length > 0) {
      for (const result of docs) {
        const { identifier, title } = result;
        if (!identifier)
          continue;
        const lowercaseIdentifier = identifier.toLowerCase();
        pendingIdentifiers.splice(pendingIdentifiers.indexOf(lowercaseIdentifier), 1);
        const collectionName = (_c = title === null || title === void 0 ? void 0 : title.value) !== null && _c !== void 0 ? _c : null;
        this.collectionNameCache[lowercaseIdentifier] = {
          name: collectionName,
          lastAccess: Date.now()
        };
        const currentPromises = this.pendingPromises[lowercaseIdentifier];
        if (currentPromises) {
          for (const promise of currentPromises) {
            promise(collectionName);
          }
          delete this.pendingPromises[lowercaseIdentifier];
        }
      }
    }
    for (const identifier of pendingIdentifiers) {
      this.collectionNameCache[identifier] = {
        name: null,
        lastAccess: Date.now()
      };
      const currentPromises = this.pendingPromises[identifier];
      if (currentPromises) {
        for (const promise of currentPromises) {
          promise(null);
        }
        delete this.pendingPromises[identifier];
      }
    }
    await this.persistCache();
  }
  async pruneCache() {
    await this.loadFromCache();
    const now = Date.now();
    const sortedCache = Object.entries(this.collectionNameCache).sort((a2, b2) => {
      var _a, _b, _c, _d;
      const aLastAccess = (_b = (_a = a2[1]) === null || _a === void 0 ? void 0 : _a.lastAccess) !== null && _b !== void 0 ? _b : 0;
      const bLastAccess = (_d = (_c = b2[1]) === null || _c === void 0 ? void 0 : _c.lastAccess) !== null && _d !== void 0 ? _d : 0;
      return aLastAccess - bLastAccess;
    });
    const identifiersToDelete = /* @__PURE__ */ new Set();
    for (const [identifier, storageInfo] of sortedCache) {
      if (!storageInfo)
        continue;
      const { lastAccess } = storageInfo;
      if (lastAccess < now - this.pruningAge) {
        identifiersToDelete.add(identifier);
      }
    }
    if (sortedCache.length > this.maxCacheSize) {
      for (let i2 = 0; i2 < sortedCache.length - this.maxCacheSize; i2 += 1) {
        const [identifier] = sortedCache[i2];
        identifiersToDelete.add(identifier);
      }
    }
    for (const identifier of identifiersToDelete) {
      delete this.collectionNameCache[identifier];
    }
    await this.persistCache();
  }
  async persistCache() {
    var _a;
    await ((_a = this.localCache) === null || _a === void 0 ? void 0 : _a.set({
      key: this.cacheKeyName,
      value: this.collectionNameCache,
      ttl: this.cacheTtl
    }));
  }
}
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$a = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$e = Symbol(), n$e = /* @__PURE__ */ new Map();
class s$d {
  constructor(t3, n2) {
    if (this._$cssResult$ = true, n2 !== e$e)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e2 = n$e.get(this.cssText);
    return t$a && e2 === void 0 && (n$e.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$e = (t3) => new s$d(typeof t3 == "string" ? t3 : t3 + "", e$e), r$7 = (t3, ...n2) => {
  const o2 = t3.length === 1 ? t3[0] : n2.reduce((e2, n3, s2) => e2 + ((t4) => {
    if (t4._$cssResult$ === true)
      return t4.cssText;
    if (typeof t4 == "number")
      return t4;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t4 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n3) + t3[s2 + 1], t3[0]);
  return new s$d(o2, e$e);
}, i$c = (e2, n2) => {
  t$a ? e2.adoptedStyleSheets = n2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n2.forEach((t3) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t3.cssText, e2.appendChild(n3);
  });
}, S$6 = t$a ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e2 = "";
  for (const n2 of t4.cssRules)
    e2 += n2.cssText;
  return o$e(e2);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$c;
const e$d = window.trustedTypes, r$6 = e$d ? e$d.emptyScript : "", h$5 = window.reactiveElementPolyfillSupport, o$d = { toAttribute(t3, i2) {
  switch (i2) {
    case Boolean:
      t3 = t3 ? r$6 : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i2) {
  let s2 = t3;
  switch (i2) {
    case Boolean:
      s2 = t3 !== null;
      break;
    case Number:
      s2 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t3);
      } catch (t4) {
        s2 = null;
      }
  }
  return s2;
} }, n$d = (t3, i2) => i2 !== t3 && (i2 == i2 || t3 == t3), l$b = { attribute: true, type: String, converter: o$d, reflect: false, hasChanged: n$d };
class a$7 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t3.push(e2));
    }), t3;
  }
  static createProperty(t3, i2 = l$b) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t3, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s2 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e2 = this.getPropertyDescriptor(t3, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t3, e2);
    }
  }
  static getPropertyDescriptor(t3, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t3];
      this[i2] = e2, this.requestUpdate(t3, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$b;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i2 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s2 of i2)
        this.createProperty(s2, t4[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$6(i3));
    } else
      i2 !== void 0 && s2.push(S$6(i2));
    return s2;
  }
  static _$Eh(t3, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s2 = t3.hostConnected) === null || s2 === void 0 || s2.call(t3));
  }
  removeController(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t3;
    const s2 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$c(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  attributeChangedCallback(t3, i2, s2) {
    this._$AK(t3, s2);
  }
  _$ES(t3, i2, s2 = l$b) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t3, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$d.toAttribute)(i2, s2.type);
      this._$Ei = t3, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t3, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t3);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t4 = h2.getPropertyOptions(n2), l2 = t4.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$d.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i2, s2) {
    let e2 = true;
    t3 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t3)).hasChanged || n$d)(this[t3], i2) ? (this._$AL.has(t3) || this._$AL.set(t3, i2), s2.reflect === true && this._$Ei !== t3 && (this._$E_ === void 0 && (this._$E_ = /* @__PURE__ */ new Map()), this._$E_.set(t3, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i3) => this[i3] = t4), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t4);
      }), this.update(s2)) : this._$EU();
    } catch (t4) {
      throw i2 = false, this._$EU(), t4;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t4) => {
      var i3;
      return (i3 = t4.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$E_ !== void 0 && (this._$E_.forEach((t4, i2) => this._$ES(i2, this[i2], t4)), this._$E_ = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
}
a$7.finalized = true, a$7.elementProperties = /* @__PURE__ */ new Map(), a$7.elementStyles = [], a$7.shadowRootOptions = { mode: "open" }, h$5 == null || h$5({ ReactiveElement: a$7 }), ((s$c = globalThis.reactiveElementVersions) !== null && s$c !== void 0 ? s$c : globalThis.reactiveElementVersions = []).push("1.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$9;
const i$b = globalThis.trustedTypes, s$b = i$b ? i$b.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e$c = `lit$${(Math.random() + "").slice(9)}$`, o$c = "?" + e$c, n$c = `<${o$c}>`, l$a = document, h$4 = (t3 = "") => l$a.createComment(t3), r$5 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function", d$3 = Array.isArray, u$8 = (t3) => {
  var i2;
  return d$3(t3) || typeof ((i2 = t3) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$7 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$3 = /-->/g, a$6 = />/g, f$5 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _$3 = /'/g, m$5 = /"/g, g$3 = /^(?:script|style|textarea)$/i, $$3 = (t3) => (i2, ...s2) => ({ _$litType$: t3, strings: i2, values: s2 }), p$3 = $$3(1), b$3 = Symbol.for("lit-noChange"), T$3 = Symbol.for("lit-nothing"), x$3 = /* @__PURE__ */ new WeakMap(), w$3 = (t3, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N$3(i2.insertBefore(h$4(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
}, A$3 = l$a.createTreeWalker(l$a, 129, null, false), C$3 = (t3, i2) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$7;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t3[i3];
    let o3, u4, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u4 = d2.exec(s2), u4 !== null); )
      p2 = d2.lastIndex, d2 === c$7 ? u4[1] === "!--" ? d2 = v$3 : u4[1] !== void 0 ? d2 = a$6 : u4[2] !== void 0 ? (g$3.test(u4[2]) && (h2 = RegExp("</" + u4[2], "g")), d2 = f$5) : u4[3] !== void 0 && (d2 = f$5) : d2 === f$5 ? u4[0] === ">" ? (d2 = h2 != null ? h2 : c$7, $2 = -1) : u4[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u4[2].length, o3 = u4[1], d2 = u4[3] === void 0 ? f$5 : u4[3] === '"' ? m$5 : _$3) : d2 === m$5 || d2 === _$3 ? d2 = f$5 : d2 === v$3 || d2 === a$6 ? d2 = c$7 : (d2 = f$5, h2 = void 0);
    const y2 = d2 === f$5 && t3[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$7 ? s2 + n$c : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e$c + y2) : s2 + e$c + ($2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u3 = r2 + (t3[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$b !== void 0 ? s$b.createHTML(u3) : u3, l2];
};
class P$3 {
  constructor({ strings: t3, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u3 = t3.length - 1, c2 = this.parts, [v2, a2] = C$3(t3, s2);
    if (this.el = P$3.createElement(v2, n2), A$3.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i2 = t4.firstChild;
      i2.remove(), t4.append(...i2.childNodes);
    }
    for (; (l2 = A$3.nextNode()) !== null && c2.length < u3; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$c)) {
              const s3 = a2[d2++];
              if (t4.push(i2), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$c), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t5, ctor: i3[1] === "." ? M$4 : i3[1] === "?" ? H$4 : i3[1] === "@" ? I$3 : S$5 });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t4)
            l2.removeAttribute(i2);
        }
        if (g$3.test(l2.tagName)) {
          const t4 = l2.textContent.split(e$c), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i$b ? i$b.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t4[i2], h$4()), A$3.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t4[s3], h$4());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$c)
          c2.push({ type: 2, index: r2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e$c, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t4 += e$c.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i2) {
    const s2 = l$a.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function V$3(t3, i2, s2 = t3, e2) {
  var o2, n2, l2, h2;
  if (i2 === b$3)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u3 = r$5(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u3 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u3 === void 0 ? d2 = void 0 : (d2 = new u3(t3), d2._$AT(t3, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V$3(t3, d2._$AS(t3, i2.values), d2, e2)), i2;
}
class E$3 {
  constructor(t3, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t3 == null ? void 0 : t3.creationScope) !== null && i2 !== void 0 ? i2 : l$a).importNode(s2, true);
    A$3.currentNode = o2;
    let n2 = A$3.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N$3(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i3 = new L$4(n2, this, t3)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A$3.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t3[i2])), i2++;
  }
}
class N$3 {
  constructor(t3, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T$3, this._$AN = void 0, this._$AA = t3, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i2;
    return (i2 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t3.nodeType === 11 && (t3 = i2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i2 = this) {
    t3 = V$3(this, t3, i2), r$5(t3) ? t3 === T$3 || t3 == null || t3 === "" ? (this._$AH !== T$3 && this._$AR(), this._$AH = T$3) : t3 !== this._$AH && t3 !== b$3 && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : u$8(t3) ? this.M(t3) : this.$(t3);
  }
  A(t3, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i2);
  }
  S(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== T$3 && r$5(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(l$a.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i2;
    const { values: s2, _$litType$: e2 } = t3, o2 = typeof e2 == "number" ? this._$AC(t3) : (e2.el === void 0 && (e2.el = P$3.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new E$3(o2, this), i3 = t4.p(this.options);
      t4.m(s2), this.S(i3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i2 = x$3.get(t3.strings);
    return i2 === void 0 && x$3.set(t3.strings, i2 = new P$3(t3)), i2;
  }
  M(t3) {
    d$3(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t3)
      e2 === i2.length ? i2.push(s2 = new N$3(this.A(h$4()), this.A(h$4()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t3 && t3 !== this._$AB; ) {
      const i3 = t3.nextSibling;
      t3.remove(), t3 = i3;
    }
  }
  setConnected(t3) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t3, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t3));
  }
}
class S$5 {
  constructor(t3, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T$3, this._$AN = void 0, this.element = t3, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T$3;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t3 = V$3(this, t3, i2, 0), n2 = !r$5(t3) || t3 !== this._$AH && t3 !== b$3, n2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V$3(this, e3[s2 + l2], i2, l2), h2 === b$3 && (h2 = this._$AH[l2]), n2 || (n2 = !r$5(h2) || h2 !== this._$AH[l2]), h2 === T$3 ? t3 = T$3 : t3 !== T$3 && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t3);
  }
  k(t3) {
    t3 === T$3 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}
class M$4 extends S$5 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t3) {
    this.element[this.name] = t3 === T$3 ? void 0 : t3;
  }
}
const k$3 = i$b ? i$b.emptyScript : "";
class H$4 extends S$5 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t3) {
    t3 && t3 !== T$3 ? this.element.setAttribute(this.name, k$3) : this.element.removeAttribute(this.name);
  }
}
class I$3 extends S$5 {
  constructor(t3, i2, s2, e2, o2) {
    super(t3, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t3, i2 = this) {
    var s2;
    if ((t3 = (s2 = V$3(this, t3, i2, 0)) !== null && s2 !== void 0 ? s2 : T$3) === b$3)
      return;
    const e2 = this._$AH, o2 = t3 === T$3 && e2 !== T$3 || t3.capture !== e2.capture || t3.once !== e2.once || t3.passive !== e2.passive, n2 = t3 !== T$3 && (e2 === T$3 || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class L$4 {
  constructor(t3, i2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    V$3(this, t3);
  }
}
const z$3 = window.litHtmlPolyfillSupport;
z$3 == null || z$3(P$3, N$3), ((t$9 = globalThis.litHtmlVersions) !== null && t$9 !== void 0 ? t$9 : globalThis.litHtmlVersions = []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$9, o$b;
class s$a extends a$7 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e2;
    const i2 = super.createRenderRoot();
    return (t3 = (e2 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t3) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = w$3(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b$3;
  }
}
s$a.finalized = true, s$a._$litElement$ = true, (l$9 = globalThis.litElementHydrateSupport) === null || l$9 === void 0 || l$9.call(globalThis, { LitElement: s$a });
const n$b = globalThis.litElementPolyfillSupport;
n$b == null || n$b({ LitElement: s$a });
((o$b = globalThis.litElementVersions) !== null && o$b !== void 0 ? o$b : globalThis.litElementVersions = []).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$a = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t3, elements: i2 } = e3;
  return { kind: t3, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$a = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$b(e2) {
  return (n2, t3) => t3 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t3) : i$a(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$8(t3) {
  return e$b(__spreadProps(__spreadValues({}, t3), { state: true }));
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$a = ({ finisher: e2, descriptor: t3 }) => (o2, n2) => {
  var r2;
  if (n2 === void 0) {
    const n3 = (r2 = o2.originalKey) !== null && r2 !== void 0 ? r2 : o2.key, i2 = t3 != null ? { kind: "method", placement: "prototype", key: n3, descriptor: t3(o2.key) } : __spreadProps(__spreadValues({}, o2), { key: n3 });
    return e2 != null && (i2.finisher = function(t4) {
      e2(t4, n3);
    }), i2;
  }
  {
    const r3 = o2.constructor;
    t3 !== void 0 && Object.defineProperty(o2, n2, t3(n2)), e2 == null || e2(r3, n2);
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function i$9(i2, n2) {
  return o$a({ descriptor: (o2) => {
    const t3 = { get() {
      var o3, n3;
      return (n3 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && n3 !== void 0 ? n3 : null;
    }, enumerable: true, configurable: true };
    if (n2) {
      const n3 = typeof o2 == "symbol" ? Symbol() : "__" + o2;
      t3.get = function() {
        var o3, t4;
        return this[n3] === void 0 && (this[n3] = (t4 = (o3 = this.renderRoot) === null || o3 === void 0 ? void 0 : o3.querySelector(i2)) !== null && t4 !== void 0 ? t4 : null), this[n3];
      };
    }
    return t3;
  } });
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e$a(e2) {
  return o$a({ descriptor: (r2) => ({ get() {
    var r3, o2;
    return (o2 = (r3 = this.renderRoot) === null || r3 === void 0 ? void 0 : r3.querySelectorAll(e2)) !== null && o2 !== void 0 ? o2 : [];
  }, enumerable: true, configurable: true }) });
}
let AsyncCollectionName = class AsyncCollectionName2 extends s$a {
  render() {
    return p$3` ${this.name ? this.name : this.identifier} `;
  }
  createRenderRoot() {
    return this;
  }
  updated(changed) {
    if (changed.has("identifier") || changed.has("collectionNameCache")) {
      this.fetchName();
    }
  }
  async fetchName() {
    if (!this.identifier || !this.collectionNameCache)
      return;
    this.name = await this.collectionNameCache.collectionNameFor(this.identifier);
  }
};
__decorate([
  e$b({ type: Object })
], AsyncCollectionName.prototype, "collectionNameCache", void 0);
__decorate([
  e$b({ type: String })
], AsyncCollectionName.prototype, "identifier", void 0);
__decorate([
  t$8()
], AsyncCollectionName.prototype, "name", void 0);
AsyncCollectionName = __decorate([
  n$a("async-collection-name")
], AsyncCollectionName);
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l$8 = (l2) => l2 != null ? l2 : w$4;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$7;
const i$8 = globalThis.trustedTypes, s$9 = i$8 ? i$8.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e$9 = `lit$${(Math.random() + "").slice(9)}$`, o$9 = "?" + e$9, n$9 = `<${o$9}>`, l$7 = document, h$3 = (t3 = "") => l$7.createComment(t3), r$4 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function", d$2 = Array.isArray, u$7 = (t3) => {
  var i2;
  return d$2(t3) || typeof ((i2 = t3) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$6 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$2 = /-->/g, a$5 = />/g, f$4 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _$2 = /'/g, m$4 = /"/g, g$2 = /^(?:script|style|textarea)$/i, $$2 = (t3) => (i2, ...s2) => ({ _$litType$: t3, strings: i2, values: s2 }), p$2 = $$2(1), b$2 = Symbol.for("lit-noChange"), T$2 = Symbol.for("lit-nothing"), x$2 = /* @__PURE__ */ new WeakMap(), w$2 = (t3, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N$2(i2.insertBefore(h$3(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
}, A$2 = l$7.createTreeWalker(l$7, 129, null, false), C$2 = (t3, i2) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$6;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t3[i3];
    let o3, u4, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u4 = d2.exec(s2), u4 !== null); )
      p2 = d2.lastIndex, d2 === c$6 ? u4[1] === "!--" ? d2 = v$2 : u4[1] !== void 0 ? d2 = a$5 : u4[2] !== void 0 ? (g$2.test(u4[2]) && (h2 = RegExp("</" + u4[2], "g")), d2 = f$4) : u4[3] !== void 0 && (d2 = f$4) : d2 === f$4 ? u4[0] === ">" ? (d2 = h2 != null ? h2 : c$6, $2 = -1) : u4[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u4[2].length, o3 = u4[1], d2 = u4[3] === void 0 ? f$4 : u4[3] === '"' ? m$4 : _$2) : d2 === m$4 || d2 === _$2 ? d2 = f$4 : d2 === v$2 || d2 === a$5 ? d2 = c$6 : (d2 = f$4, h2 = void 0);
    const y2 = d2 === f$4 && t3[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$6 ? s2 + n$9 : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e$9 + y2) : s2 + e$9 + ($2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u3 = r2 + (t3[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$9 !== void 0 ? s$9.createHTML(u3) : u3, l2];
};
class P$2 {
  constructor({ strings: t3, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u3 = t3.length - 1, c2 = this.parts, [v2, a2] = C$2(t3, s2);
    if (this.el = P$2.createElement(v2, n2), A$2.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i2 = t4.firstChild;
      i2.remove(), t4.append(...i2.childNodes);
    }
    for (; (l2 = A$2.nextNode()) !== null && c2.length < u3; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$9)) {
              const s3 = a2[d2++];
              if (t4.push(i2), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$9), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t5, ctor: i3[1] === "." ? M$3 : i3[1] === "?" ? H$3 : i3[1] === "@" ? I$2 : S$4 });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t4)
            l2.removeAttribute(i2);
        }
        if (g$2.test(l2.tagName)) {
          const t4 = l2.textContent.split(e$9), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i$8 ? i$8.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t4[i2], h$3()), A$2.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t4[s3], h$3());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$9)
          c2.push({ type: 2, index: r2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e$9, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t4 += e$9.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i2) {
    const s2 = l$7.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function V$2(t3, i2, s2 = t3, e2) {
  var o2, n2, l2, h2;
  if (i2 === b$2)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u3 = r$4(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u3 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u3 === void 0 ? d2 = void 0 : (d2 = new u3(t3), d2._$AT(t3, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V$2(t3, d2._$AS(t3, i2.values), d2, e2)), i2;
}
class E$2 {
  constructor(t3, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t3 == null ? void 0 : t3.creationScope) !== null && i2 !== void 0 ? i2 : l$7).importNode(s2, true);
    A$2.currentNode = o2;
    let n2 = A$2.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N$2(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i3 = new L$3(n2, this, t3)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A$2.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t3[i2])), i2++;
  }
}
class N$2 {
  constructor(t3, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T$2, this._$AN = void 0, this._$AA = t3, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i2;
    return (i2 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t3.nodeType === 11 && (t3 = i2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i2 = this) {
    t3 = V$2(this, t3, i2), r$4(t3) ? t3 === T$2 || t3 == null || t3 === "" ? (this._$AH !== T$2 && this._$AR(), this._$AH = T$2) : t3 !== this._$AH && t3 !== b$2 && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : u$7(t3) ? this.M(t3) : this.$(t3);
  }
  A(t3, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i2);
  }
  S(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== T$2 && r$4(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(l$7.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i2;
    const { values: s2, _$litType$: e2 } = t3, o2 = typeof e2 == "number" ? this._$AC(t3) : (e2.el === void 0 && (e2.el = P$2.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new E$2(o2, this), i3 = t4.p(this.options);
      t4.m(s2), this.S(i3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i2 = x$2.get(t3.strings);
    return i2 === void 0 && x$2.set(t3.strings, i2 = new P$2(t3)), i2;
  }
  M(t3) {
    d$2(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t3)
      e2 === i2.length ? i2.push(s2 = new N$2(this.A(h$3()), this.A(h$3()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t3 && t3 !== this._$AB; ) {
      const i3 = t3.nextSibling;
      t3.remove(), t3 = i3;
    }
  }
  setConnected(t3) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t3, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t3));
  }
}
class S$4 {
  constructor(t3, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T$2, this._$AN = void 0, this.element = t3, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T$2;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t3 = V$2(this, t3, i2, 0), n2 = !r$4(t3) || t3 !== this._$AH && t3 !== b$2, n2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V$2(this, e3[s2 + l2], i2, l2), h2 === b$2 && (h2 = this._$AH[l2]), n2 || (n2 = !r$4(h2) || h2 !== this._$AH[l2]), h2 === T$2 ? t3 = T$2 : t3 !== T$2 && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t3);
  }
  k(t3) {
    t3 === T$2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}
class M$3 extends S$4 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t3) {
    this.element[this.name] = t3 === T$2 ? void 0 : t3;
  }
}
const k$2 = i$8 ? i$8.emptyScript : "";
class H$3 extends S$4 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t3) {
    t3 && t3 !== T$2 ? this.element.setAttribute(this.name, k$2) : this.element.removeAttribute(this.name);
  }
}
class I$2 extends S$4 {
  constructor(t3, i2, s2, e2, o2) {
    super(t3, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t3, i2 = this) {
    var s2;
    if ((t3 = (s2 = V$2(this, t3, i2, 0)) !== null && s2 !== void 0 ? s2 : T$2) === b$2)
      return;
    const e2 = this._$AH, o2 = t3 === T$2 && e2 !== T$2 || t3.capture !== e2.capture || t3.once !== e2.once || t3.passive !== e2.passive, n2 = t3 !== T$2 && (e2 === T$2 || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class L$3 {
  constructor(t3, i2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    V$2(this, t3);
  }
}
const R = { P: "$lit$", V: e$9, L: o$9, I: 1, N: C$2, R: E$2, D: u$7, j: V$2, H: N$2, O: S$4, F: H$3, B: I$2, W: M$3, Z: L$3 }, z$2 = window.litHtmlPolyfillSupport;
z$2 == null || z$2(P$2, N$2), ((t$7 = globalThis.litHtmlVersions) !== null && t$7 !== void 0 ? t$7 : globalThis.litHtmlVersions = []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$6, o$8;
class s$8 extends a$7 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e2;
    const i2 = super.createRenderRoot();
    return (t3 = (e2 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t3) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = w$2(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b$2;
  }
}
s$8.finalized = true, s$8._$litElement$ = true, (l$6 = globalThis.litElementHydrateSupport) === null || l$6 === void 0 || l$6.call(globalThis, { LitElement: s$8 });
const n$8 = globalThis.litElementPolyfillSupport;
n$8 == null || n$8({ LitElement: s$8 });
((o$8 = globalThis.litElementVersions) !== null && o$8 !== void 0 ? o$8 : globalThis.litElementVersions = []).push("3.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$6 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$8 = (t3) => (...e2) => ({ _$litDirective$: t3, values: e2 });
class i$7 {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e2, i2) {
    this._$Ct = t3, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t3, e2) {
    return this.update(t3, e2);
  }
  update(t3, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { H: i$6 } = R, e$7 = () => document.createComment(""), u$6 = (o2, t3, n2) => {
  var v2;
  const l2 = o2._$AA.parentNode, d2 = t3 === void 0 ? o2._$AB : t3._$AA;
  if (n2 === void 0) {
    const t4 = l2.insertBefore(e$7(), d2), v3 = l2.insertBefore(e$7(), d2);
    n2 = new i$6(t4, v3, o2, o2.options);
  } else {
    const i2 = n2._$AB.nextSibling, t4 = n2._$AM, r2 = t4 !== o2;
    if (r2) {
      let i3;
      (v2 = n2._$AQ) === null || v2 === void 0 || v2.call(n2, o2), n2._$AM = o2, n2._$AP !== void 0 && (i3 = o2._$AU) !== t4._$AU && n2._$AP(i3);
    }
    if (i2 !== d2 || r2) {
      let o3 = n2._$AA;
      for (; o3 !== i2; ) {
        const i3 = o3.nextSibling;
        l2.insertBefore(o3, d2), o3 = i3;
      }
    }
  }
  return n2;
}, c$5 = (o2, i2, t3 = o2) => (o2._$AI(i2, t3), o2), f$3 = {}, s$7 = (o2, i2 = f$3) => o2._$AH = i2, a$4 = (o2) => o2._$AH, m$3 = (o2) => {
  var i2;
  (i2 = o2._$AP) === null || i2 === void 0 || i2.call(o2, false, true);
  let t3 = o2._$AA;
  const n2 = o2._$AB.nextSibling;
  for (; t3 !== n2; ) {
    const o3 = t3.nextSibling;
    t3.remove(), t3 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$5 = (e2, s2, t3) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t3; l2++)
    r2.set(e2[l2], l2);
  return r2;
}, c$4 = e$8(class extends i$7 {
  constructor(e2) {
    if (super(e2), e2.type !== t$6.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t3) {
    let r2;
    t3 === void 0 ? t3 = s2 : s2 !== void 0 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t3(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t3) {
    return this.dt(e2, s2, t3).values;
  }
  update(s2, [t3, r2, c2]) {
    var d2;
    const a2 = a$4(s2), { values: p2, keys: v2 } = this.dt(t3, r2, c2);
    if (!Array.isArray(a2))
      return this.ct = v2, p2;
    const h2 = (d2 = this.ct) !== null && d2 !== void 0 ? d2 : this.ct = [], m2 = [];
    let y2, x2, j = 0, k2 = a2.length - 1, w2 = 0, A2 = p2.length - 1;
    for (; j <= k2 && w2 <= A2; )
      if (a2[j] === null)
        j++;
      else if (a2[k2] === null)
        k2--;
      else if (h2[j] === v2[w2])
        m2[w2] = c$5(a2[j], p2[w2]), j++, w2++;
      else if (h2[k2] === v2[A2])
        m2[A2] = c$5(a2[k2], p2[A2]), k2--, A2--;
      else if (h2[j] === v2[A2])
        m2[A2] = c$5(a2[j], p2[A2]), u$6(s2, m2[A2 + 1], a2[j]), j++, A2--;
      else if (h2[k2] === v2[w2])
        m2[w2] = c$5(a2[k2], p2[w2]), u$6(s2, a2[j], a2[k2]), k2--, w2++;
      else if (y2 === void 0 && (y2 = u$5(v2, w2, A2), x2 = u$5(h2, j, k2)), y2.has(h2[j]))
        if (y2.has(h2[k2])) {
          const e2 = x2.get(v2[w2]), t4 = e2 !== void 0 ? a2[e2] : null;
          if (t4 === null) {
            const e3 = u$6(s2, a2[j]);
            c$5(e3, p2[w2]), m2[w2] = e3;
          } else
            m2[w2] = c$5(t4, p2[w2]), u$6(s2, a2[j], t4), a2[e2] = null;
          w2++;
        } else
          m$3(a2[k2]), k2--;
      else
        m$3(a2[j]), j++;
    for (; w2 <= A2; ) {
      const e2 = u$6(s2, m2[A2 + 1]);
      c$5(e2, p2[w2]), m2[w2++] = e2;
    }
    for (; j <= k2; ) {
      const e2 = a2[j++];
      e2 !== null && m$3(e2);
    }
    return this.ct = v2, s$7(s2, m2), b$2;
  }
});
function generateRange(start, stop, step) {
  return Array.from({ length: (stop - start) / step + 1 }, (_2, i2) => start + i2 * step);
}
let InfiniteScroller = class InfiniteScroller2 extends s$8 {
  constructor() {
    super(...arguments);
    this.itemCount = 0;
    this.scrollOptimizationsDisabled = false;
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === this.sentinel) {
          if (entry.isIntersecting) {
            this.dispatchEvent(new Event("scrollThresholdReached"));
          }
          return;
        }
        const cellContainer = entry.target;
        const indexString = cellContainer.dataset.cellIndex;
        if (!indexString)
          return;
        const index = parseInt(indexString, 10);
        if (entry.isIntersecting) {
          this.visibleCellIndices.add(index);
        } else {
          this.visibleCellIndices.delete(index);
        }
      });
      if (!this.scrollOptimizationsDisabled) {
        this.processVisibleCells();
      }
    });
    this.renderedCellIndices = /* @__PURE__ */ new Set();
    this.visibleCellIndices = /* @__PURE__ */ new Set();
    this.placeholderCellIndices = /* @__PURE__ */ new Set();
  }
  reload() {
    const range = generateRange(0, Math.max(0, this.itemCount - 1), 1);
    range.forEach((index) => this.removeCell(index));
    this.renderedCellIndices.clear();
    this.visibleCellIndices.clear();
    this.placeholderCellIndices.clear();
    this.setupObservations();
  }
  scrollToCell(index, animated) {
    const cellContainer = this.cellContainers[index];
    if (!cellContainer)
      return false;
    const behavior = animated ? "smooth" : "auto";
    cellContainer.scrollIntoView({ behavior });
    return true;
  }
  getVisibleCellIndices() {
    return Array.from(this.visibleCellIndices);
  }
  updated(changed) {
    if (changed.has("itemCount") || changed.has("scrollOptimizationsDisabled")) {
      this.setupObservations();
    }
  }
  disconnectedCallback() {
    this.intersectionObserver.disconnect();
  }
  setupObservations() {
    this.setupIntersectionObserver();
  }
  setupIntersectionObserver() {
    this.intersectionObserver.disconnect();
    if (this.sentinel)
      this.intersectionObserver.observe(this.sentinel);
    if (this.scrollOptimizationsDisabled) {
      const indexArray = generateRange(0, Math.max(0, this.itemCount - 1), 1);
      indexArray.forEach((index) => this.visibleCellIndices.add(index));
      this.processVisibleCells();
    } else {
      this.cellContainers.forEach((cell) => this.intersectionObserver.observe(cell));
    }
  }
  render() {
    const finalIndex = this.itemCount - 1;
    const indexArray = generateRange(0, finalIndex, 1);
    return p$2`
      <div id="container">
        <div id="sentinel"></div>
        ${c$4(indexArray, (index) => index, (index) => p$2`
            <div
              class="cell-container"
              data-cell-index=${index}
              @click=${(e2) => this.cellSelected(e2, index)}
              @keyup=${(e2) => {
      if (e2.key === "Enter")
        this.cellSelected(e2, index);
    }}
            ></div>
          `)}
      </div>
    `;
  }
  cellSelected(e2, index) {
    const event = new CustomEvent("cellSelected", {
      detail: {
        index,
        originalEvent: e2
      }
    });
    this.dispatchEvent(event);
  }
  processVisibleCells() {
    const visibleCellArray = Array.from(this.visibleCellIndices);
    const cellBufferSize = Math.max(10, visibleCellArray.length);
    const sortedVisibleRange = visibleCellArray.sort((a2, b2) => a2 > b2 ? 1 : -1);
    const noVisibleCells = visibleCellArray.length === 0;
    const minIndex = noVisibleCells ? 0 : Math.max(sortedVisibleRange[0] - cellBufferSize, 0);
    const maxIndex = noVisibleCells ? cellBufferSize : Math.min(sortedVisibleRange[sortedVisibleRange.length - 1] + cellBufferSize, this.itemCount - 1);
    const bufferRange = generateRange(minIndex, maxIndex, 1);
    this.renderCellBuffer(bufferRange);
    this.removeCellsOutsideBufferRange(bufferRange);
    const visibleCellsChangedEvent = new CustomEvent("visibleCellsChanged", {
      detail: {
        visibleCellIndices: visibleCellArray
      }
    });
    this.dispatchEvent(visibleCellsChangedEvent);
  }
  renderCellBuffer(bufferRange) {
    bufferRange.forEach((index) => {
      var _a;
      if (this.renderedCellIndices.has(index))
        return;
      const cellContainer = this.cellContainerForIndex(index);
      if (!cellContainer)
        return;
      const template = (_a = this.cellProvider) === null || _a === void 0 ? void 0 : _a.cellForIndex(index);
      cellContainer.style.height = "auto";
      if (template) {
        w$2(template, cellContainer);
        this.renderedCellIndices.add(index);
        this.placeholderCellIndices.delete(index);
      } else {
        if (this.placeholderCellIndices.has(index))
          return;
        w$2(this.placeholderCellTemplate, cellContainer);
        this.placeholderCellIndices.add(index);
      }
    });
  }
  removeCellsOutsideBufferRange(bufferRange) {
    const renderedUnbufferedCells = Array.from(this.renderedCellIndices).filter((index) => !bufferRange.includes(index));
    renderedUnbufferedCells.forEach((index) => {
      this.removeCell(index);
    });
  }
  removeCell(index) {
    const cellContainer = this.cellContainerForIndex(index);
    if (!cellContainer)
      return;
    const height = cellContainer.offsetHeight;
    cellContainer.style.height = `${height}px`;
    w$2(T$2, cellContainer);
    this.renderedCellIndices.delete(index);
  }
  cellContainerForIndex(index) {
    var _a;
    return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector(`.cell-container[data-cell-index="${index}"]`);
  }
  static get styles() {
    const sentinelHeightCss = r$7`var(--infiniteScrollerSentinelDistanceFromEnd, 200rem)`;
    const rowGapSizeCss = r$7`var(--infiniteScrollerRowGap, 1.7rem)`;
    const colGapSizeCss = r$7`var(--infiniteScrollerColGap, 1.7rem)`;
    const cellMinWidth = r$7`var(--infiniteScrollerCellMinWidth, 10rem)`;
    const cellMaxWidth = r$7`var(--infiniteScrollerCellMaxWidth, 1fr)`;
    const cellMinHeight = r$7`var(--infiniteScrollerCellMinHeight, 10rem)`;
    const cellMaxHeight = r$7`var(--infiniteScrollerCellMaxHeight, none)`;
    const cellOutline = r$7`var(--infiniteScrollerCellOutline, 0)`;
    return r$7`
      #container {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        grid-row-gap: ${rowGapSizeCss};
        row-gap: ${rowGapSizeCss};
        grid-column-gap: ${colGapSizeCss};
        column-gap: ${colGapSizeCss};
      }

      @supports (display: grid) {
        #container {
          display: grid;
          flex-wrap: nowrap;
          grid-template-columns: repeat(
            auto-fill,
            minmax(${cellMinWidth}, ${cellMaxWidth})
          );
        }
      }

      .cell-container {
        outline: ${cellOutline};
        min-height: ${cellMinHeight};
        max-height: ${cellMaxHeight};
        min-width: ${cellMinWidth};
        max-width: ${cellMaxWidth};
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
        height: ${sentinelHeightCss};
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
    `;
  }
};
__decorate([
  e$b({ type: Number })
], InfiniteScroller.prototype, "itemCount", void 0);
__decorate([
  e$b({ type: Object })
], InfiniteScroller.prototype, "cellProvider", void 0);
__decorate([
  e$b({ type: Object })
], InfiniteScroller.prototype, "placeholderCellTemplate", void 0);
__decorate([
  e$b({ type: Boolean })
], InfiniteScroller.prototype, "scrollOptimizationsDisabled", void 0);
__decorate([
  i$9("#sentinel")
], InfiniteScroller.prototype, "sentinel", void 0);
__decorate([
  e$a(".cell-container")
], InfiniteScroller.prototype, "cellContainers", void 0);
InfiniteScroller = __decorate([
  n$a("infinite-scroller")
], InfiniteScroller);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const _str = (strings, ...values) => ({
  strTag: true,
  strings,
  values
});
const str = _str;
const isStrTagged = (val) => typeof val !== "string" && "strTag" in val;
const joinStringsAndValues = (strings, values, valueOrder) => {
  let concat = strings[0];
  for (let i2 = 1; i2 < strings.length; i2++) {
    concat += values[valueOrder ? valueOrder[i2 - 1] : i2 - 1];
    concat += strings[i2];
  }
  return concat;
};
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const defaultMsg = (template) => isStrTagged(template) ? joinStringsAndValues(template.strings, template.values) : template;
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class Deferred {
  constructor() {
    this.settled = false;
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }
  resolve(value) {
    this.settled = true;
    this._resolve(value);
  }
  reject(error) {
    this.settled = true;
    this._reject(error);
  }
}
/**
 * @license
 * Copyright 2014 Travis Webb
 * SPDX-License-Identifier: MIT
 */
const hl = [];
for (let i2 = 0; i2 < 256; i2++) {
  hl[i2] = (i2 >> 4 & 15).toString(16) + (i2 & 15).toString(16);
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let loading = new Deferred();
loading.resolve();
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let msg = defaultMsg;
const collectionIcon = y$1`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m280 262.122891v-156.834044c0-4.877026-2.063112-9.1444235-6.189337-12.8021929s-8.220563-5.4866541-12.283013-5.4866541h-225.4946834c-4.4642309 0-8.2524498 1.726748-11.3646565 5.1802441s-4.6683101 7.8230299-4.6683101 13.1086029v156.834044c0 5.279189 1.5210273 9.578505 4.5630818 12.897946 3.0420545 3.319442 6.8653495 4.979163 11.4698848 4.979163h225.4946834c4.06245 0 8.156788-1.726748 12.283013-5.180244s6.189337-7.685784 6.189337-12.696865zm-200.9382244-131.440315v7.918783c0 1.487366-.7780516 3.00984-2.334155 4.567424-1.5561034 1.557585-3.1472828 2.336377-4.7735384 2.336377h-14.8180581c-1.7601825 0-3.4183254-.743683-4.9744288-2.231048-1.5561033-1.487365-2.334155-3.044949-2.334155-4.672753v-7.918783c0-1.761858.8131278-3.964179 2.4393834-6.606966 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.845108 2.4393833 6.606966zm169.2740724 0v7.918783c0 1.627804-.711089 3.185388-2.133265 4.672753-1.422177 1.487365-3.080319 2.231048-4.974429 2.231048h-131.114463c-2.028037 0-3.753143-.743683-5.175319-2.231048-1.422177-1.487365-2.133265-3.044949-2.133265-4.672753v-7.918783c0-1.895912.742975-4.130152 2.228927-6.702719 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.286284 4.8692 3.858851 1.485952 2.572567 2.228927 4.806807 2.228927 6.702719zm-169.2740724 50.988539v7.918784c0 1.487365-.7780516 2.977922-2.334155 4.471671s-3.1472828 2.237431-4.7735384 2.231088h-14.8180581c-1.7601825 0-3.4183254-.743723-4.9744288-2.231088-1.5561033-1.487365-2.334155-2.977922-2.334155-4.471671v-7.918784c0-1.895912.8131278-4.165261 2.4393834-6.808047 1.6262555-2.642786 3.2493223-3.964179 4.8692004-3.964179h14.8180581c1.4859512 0 3.0420545 1.353311 4.6683101 4.059932 1.6262556 2.706622 2.4393833 4.940861 2.4393833 6.702719zm169.2740724 0v7.918784c0 1.487365-.711089 2.977922-2.133265 4.471671-1.422177 1.493749-3.080319 2.237431-4.974429 2.231088h-131.114463c-2.028037 0-3.753143-.743723-5.175319-2.231088-1.422177-1.487365-2.133265-2.977922-2.133265-4.471671v-7.918784c0-2.029966.742975-4.331233 2.228927-6.9038 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.912136 2.228927 6.808048zm-169.2740724 51.400278v6.9038c0 1.761858-.7780516 3.421579-2.334155 4.979163s-3.1472828 2.336376-4.7735384 2.336376h-14.8180581c-1.7601825 0-3.4183254-.778792-4.9744288-2.336376-1.5561033-1.557584-2.334155-3.217305-2.334155-4.979163v-6.9038c0-2.029966.7780517-4.366342 2.334155-7.009129 1.5561034-2.642786 3.2142463-3.964179 4.9744288-3.964179h14.8180581c1.4859512 0 3.0420545 1.321393 4.6683101 3.964179 1.6262556 2.642787 2.4393833 4.979163 2.4393833 7.009129zm169.2740724 0v6.9038c0 1.761858-.711089 3.421579-2.133265 4.979163-1.422177 1.557584-3.080319 2.336376-4.974429 2.336376h-131.114463c-2.028037 0-3.753143-.778792-5.175319-2.336376-1.422177-1.557584-2.133265-3.217305-2.133265-4.979163v-6.9038c0-2.170404.742975-4.54189 2.228927-7.114457 1.485951-2.572567 3.175981-3.858851 5.070091-3.858851h131.114463c1.760182 0 3.383249 1.321393 4.8692 3.964179 1.485952 2.642787 2.228927 4.979163 2.228927 7.009129z"
      fill="black"
    />
  </svg>
`;
let CollectionTile = class CollectionTile2 extends s$e {
  render() {
    var _a, _b, _c;
    return $$4`
      <div id="container">
        <div id="collection-image-title">
          <div id="collection-title">${(_a = this.model) === null || _a === void 0 ? void 0 : _a.title}</div>
          <div id="collection-image-container">
            <div
              id="collection-image"
              style="background-image:url('https://archive.org/services/img/${(_b = this.model) === null || _b === void 0 ? void 0 : _b.identifier}')"
            ></div>
          </div>
        </div>
        <div id="item-count-container">
          <div id="item-count-image-container">${collectionIcon}</div>
          <div id="item-count-stacked-text">
            <div id="item-count">${(_c = this.model) === null || _c === void 0 ? void 0 : _c.itemCount.toLocaleString()}</div>
            <div id="items-text">${msg("items")}</div>
          </div>
        </div>
      </div>
    `;
  }
  static get styles() {
    const cornerRadiusCss = r$9`var(--collectionTileCornerRadius, 4px)`;
    return r$9`
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
        border-top-left-radius: ${cornerRadiusCss};
        border-top-right-radius: ${cornerRadiusCss};
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
        border-radius: ${cornerRadiusCss};
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
        border-bottom-left-radius: ${cornerRadiusCss};
        border-bottom-right-radius: ${cornerRadiusCss};
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], CollectionTile.prototype, "model", void 0);
CollectionTile = __decorate([
  n$g("collection-tile")
], CollectionTile);
function magnitude(number, numberFormat) {
  let divisor = 1;
  if (number >= 1e9) {
    divisor = 1e9;
  } else if (number >= 1e6) {
    divisor = 1e6;
  } else if (number >= 1e3 && numberFormat === "short") {
    divisor = 1e3;
  }
  return divisor;
}
function round(number = 0, divisor) {
  const result = number / divisor;
  const roundToOne = result < 10;
  let rounded = 0;
  if (roundToOne) {
    rounded = Math.round((result + Number.EPSILON) * 10) / 10;
  } else {
    rounded = Math.round(result);
  }
  return rounded;
}
function labelize(rounded, divisor, format, locale2) {
  switch (divisor) {
    case 1e9:
      if (format === "short") {
        return msg(str`${rounded}B`);
      }
      return msg(str`${rounded} billion`);
    case 1e6:
      if (format === "short") {
        return msg(str`${rounded}M`);
      }
      return msg(str`${rounded} million`);
    case 1e3:
      if (format === "short") {
        return msg(str`${rounded}K`);
      }
      return msg(str`${rounded} thousand`);
    default:
      return new Intl.NumberFormat(locale2).format(rounded);
  }
}
function formatCount(count, numberFormat = "long", labelFormat = "short", locale2 = "en-US") {
  const number = count !== null && count !== void 0 ? count : -1;
  if (number < 0) {
    return "";
  }
  const divisor = magnitude(number, numberFormat);
  const rounded = round(number, divisor);
  return labelize(rounded, divisor, labelFormat, locale2);
}
const favoriteFilledIcon = y$1`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m81.0388846 100-30.9636029-22.5595033-30.7410319 22.5595033 10.6670595-37.3922042-30.0013093-25.2155916h37.5556428l12.5196389-37.3922042 12.3690754 37.3922042h37.5556429l-29.7034563 25.2155916z"
      fill="#333"
    />
    <title>Icon of a star, filled in</title>
  </svg>
`;
const reviewsIcon = y$1`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m100 7.78013601c0-2.14552613-.7593357-3.978597-2.278007-5.4992126-1.5186713-1.52061561-3.3493984-2.28092341-5.4921813-2.28092341h-84.54977287c-2.08268321 0-3.88336049.7603078-5.40203183 2.28092341-1.51867133 1.5206156-2.278007 3.35368647-2.278007 5.4992126v51.49262709c0 2.0853495.75933567 3.8883321 2.278007 5.4089477 1.51867134 1.5206156 3.31934862 2.2809234 5.40203183 2.2809234h10.53361537l.3571304 33.0373658 32.4087237-33.0373658h41.2468361c2.1427829 0 3.97351-.7603078 5.4921813-2.2809234s2.278007-3.3235982 2.278007-5.4089477z"
      fill="#333"
    />
    <title>Icon of a speech bubble</title>
  </svg>
`;
var viewsIcon = y$1`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z"
      fill="#333"
    />
    <title>Eye icon</title>
  </svg>
`;
const accountIcon$1 = y$1`
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
`;
const audioIcon = y$1`
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
`;
const dataIcon = y$1`
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
`;
const etreeIcon = y$1`
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
`;
const imagesIcon = y$1`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m43.0952612 181.159979c2.1744514 0 21.7161099 3.336499 21.7161099 3.336499v21.030628l-44.8113711-6.289709c4.5382599-51.29161 9.6729948-105.5332879 14.6089046-156.237397 66.1329874 6.484496 144.5110704 16.1138469 211.0385514 22.4035567-.987813 6.4876377-1.581132 21.8160564-1.972471 28.3005524-4.939065-.5906421-15.599873 0-20.535783-.5906421v-9.0418506c-56.065498-5.3032118-112.326666-12.180422-168.3953197-17.6847035 0 0-7.7005244 74.2858081-11.6486211 114.7730661zm31.7867547-81.562016h205.1179841v158.402037h-205.1179841zm18.9514955 140.126691h167.8051566v-64.461671l-21.122791 35.963191-28.428821-67.408598-24.2819 28.891194-66.530637-54.634392h-27.4410076zm64.5550106-40.487257c0-11.394994-9.082832-20.436845-20.731453-20.436845-11.250971 0-20.923965 9.041851-20.923965 20.436845 0 11.203349 9.672994 20.439986 20.923965 20.439986 11.648621 0 20.731453-9.236637 20.731453-20.439986z"
      fill="black"
      transform="matrix(1 0 0 -1 0 301)"
    />
  </svg>
`;
const filmIcon = y$1`
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
`;
const radioIcon = y$1`
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
`;
const softwareIcon = y$1`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m266.443951 20c8.716971 0 13.539477 4.8435881 13.556049 13.5985084v116.3828466 116.072094c0 9.214834-4.702358 13.946551-13.854348 13.946551h-232.4332033c-8.9489808 0-13.6969123-4.793868-13.6969123-13.768386-.0207152-77.476694-.0207152-154.961674 0-232.4590845 0-8.9662316 4.7479315-13.7725295 13.672054-13.7725295zm-197.7807608 138.512534c-2.3822518 0-5.1000904 1.052413-7.0887528 2.444582-4.1223314 2.871349-5.2575262 7.383468-5.2575262 12.227056l.0000647 20.524783c.0000093.952732.0000199 1.902825.0000319 2.850655l.0008306 25.31649c.0000546.937648.0001123 1.876427.0001735 2.816715l.0009089 11.379992c.0000914.958389.0001869 1.919795.0002867 2.884595l.0006526 5.832546c.0003539 2.939654.0007502 5.916643.0011941 8.941148 0 1.052413.0952901 2.092397.1574358 3.298115h183.648829l.28587-1.143568c.016572-29.633312.111862-55.119121-.033144-84.760721-.041431-7.391754-5.522681-12.703542-12.350422-12.703542-53.113858-.008287-106.236002-.045577-159.3664328.091154zm146.0755388-113.992128h-129.8596542l-.2444397 1.1601409c-.0082861 22.2001243-.0662888 44.3961053.0331443 66.6003731.0207153 5.676403 4.0228983 9.264553 9.7485888 9.264553 36.5333858.008287 73.0460558.008287 109.5835838.008287 7.391195 0 10.734634-3.372695 10.738777-10.876321zm-20.434335 9.1887301v53.7103789h-32.709353v-53.7103789z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`;
const textsIcon = y$1`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m30.7264159 91.3202111 1.6974686 166.4298289s93.0569425-.896348 99.7147175 6.469589c4.752251 5.262329 29.15749 5.35494 31.185205 2.06061 5.607591-9.099099 85.824537-7.696693 102.729871-8.530199l1.905524-164.9480418 12.040798 4.2865984v175.2610164s-105.576598-1.796006-108.707338 4.190679c-.369876.714433-11.030243 3.459708-17.354469 3.459708l-.365424-.000017-.751764-.000432c-7.778071-.009122-19.543206-.203741-22.971013-4.355608-5.663733-6.863188-109.849992-4.187372-109.849992-4.187372v-175.5388508zm222.4119701-5.3202111v146.683693s-1.32429 4.845576-4.61685 8.004297c-2.777376 2.665893-8.834102 2.768428-8.834102 2.768428h-59.100966s-15.366384 3.883076-18.041383 8.146521l-7.21259-.046306v-156.044089c4.785276-5.1035658 12.024286-9.512544 22.929035-9.512544zm-132.891971 0c10.736323 0 17.929098 4.2766757 22.714375 9.2909375v156.2656955l-7.001233.046306c-5.165059-5.067182-18.044684-8.146521-18.044684-8.146521l-61.8453708-.000141c-.1987476-.00456-4.8027407-.135182-7.8201913-2.503683-2.7517631-2.168142-2.8740636-6.281222-2.8794992-6.642546l-.0002528-148.310048z"
      fill="black"
      fill-rule="evenodd"
    />
  </svg>
`;
const tvIcon = y$1`
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
`;
const videoIcon = y$1`
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
`;
const webIcon = y$1`
  <svg viewBox="0 0 300 300"
    xmlns="http://www.w3.org/2000/svg">
    <path
      class="fill-color"
      d="m261.437982 261.890554h-28.778763v-28.083112h28.778763zm-42.442013 0h-28.793735v-28.083112h28.793735zm40.645399-150.356298v75.703472 19.821613h-219.2617757v-19.821613-75.703472zm-84.228262 150.356298h-134.608315v-27.499419h134.608315zm-155.413106-169.890554v87.643734 100.356266h260v-100.356266-87.643734z"
      fill="black"
      transform="matrix(1 0 0 -1 0 372)"
    />
  </svg>
`;
const mediatypeConfig = {
  account: {
    color: "#000000",
    icon: accountIcon$1,
    text: "Account"
  },
  audio: {
    color: "#8fdaef",
    icon: audioIcon,
    text: "Audio"
  },
  collection: {
    color: "#000000",
    icon: collectionIcon,
    text: "Collection"
  },
  data: {
    color: "#333333",
    icon: dataIcon,
    text: "Data"
  },
  etree: {
    color: "#3871c1",
    icon: etreeIcon,
    text: "E-tree"
  },
  film: {
    color: "#bf1b2c",
    icon: filmIcon,
    text: "Film"
  },
  image: {
    color: "#62c4a9",
    icon: imagesIcon,
    text: "Image"
  },
  movies: {
    color: "#bf1b2c",
    icon: filmIcon,
    text: "Movie"
  },
  radio: {
    color: "#8fdaef",
    icon: radioIcon,
    text: "Radio"
  },
  software: {
    color: "#80cc28",
    icon: softwareIcon,
    text: "Software"
  },
  texts: {
    color: "#f9a72b",
    icon: textsIcon,
    text: "Text"
  },
  tv: {
    color: "#f25d54",
    icon: tvIcon,
    text: "TV"
  },
  video: {
    color: "#bf1b2c",
    icon: videoIcon,
    text: "Video"
  },
  web: {
    color: "#fddd10",
    icon: webIcon,
    text: "Web"
  }
};
let MediatypeIcon = class MediatypeIcon2 extends s$e {
  constructor() {
    super(...arguments);
    this.showText = false;
  }
  get displayMediatype() {
    var _a, _b;
    const tvIdentifier = ["tvnews", "tvarchive", "television"];
    const radioIdentifier = ["radio", "radioprogram"];
    if (this.mediatype === "movies" && ((_a = this.collections) === null || _a === void 0 ? void 0 : _a.some((id) => tvIdentifier.indexOf(id) >= 0))) {
      return "tv";
    }
    if (this.mediatype === "audio" && ((_b = this.collections) === null || _b === void 0 ? void 0 : _b.some((id) => radioIdentifier.indexOf(id) >= 0))) {
      return "radio";
    }
    return this.mediatype || "";
  }
  render() {
    const config = mediatypeConfig[this.displayMediatype];
    if (!config) {
      return $$4``;
    }
    return $$4`
      <div
        id="icon"
        class="${this.showText ? "show-text" : "hide-text"}"
        style="--iconFillColor: ${config.color}"
      >
        ${config.icon}
        <p class="status-text">${config.text}</p>
      </div>
    `;
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: String })
], MediatypeIcon.prototype, "mediatype", void 0);
__decorate([
  e$f({ type: Array })
], MediatypeIcon.prototype, "collections", void 0);
__decorate([
  e$f({ type: Boolean })
], MediatypeIcon.prototype, "showText", void 0);
MediatypeIcon = __decorate([
  n$g("mediatype-icon")
], MediatypeIcon);
const restrictedIcon = y$1`
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
`;
let ItemImage = class ItemImage2 extends s$e {
  constructor() {
    super(...arguments);
    this.isListTile = false;
    this.isCompactTile = false;
    this.isWaveform = false;
  }
  render() {
    var _a;
    return $$4`
      <div class=${l$8(this.imageBoxClass)}>
        ${((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) === "audio" ? this.waveformTemplate : this.itemImageTemplate}
      </div>
    `;
  }
  get imageSrc() {
    var _a;
    return `${this.baseImageUrl}/services/img/${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}`;
  }
  get itemImageTemplate() {
    return $$4`
      ${this.isListTile ? this.listImageTemplate : this.tileImageTemplate}
    `;
  }
  get tileImageTemplate() {
    return $$4`
      <div
        class=${this.imageClass}
        style="background-image:url(${this.imageSrc})"
      ></div>
      ${this.tileActionTemplate}
    `;
  }
  get listImageTemplate() {
    if (!this.model) {
      return w$4;
    }
    return $$4`
      <img src="${this.imageSrc}" alt="" class="${this.listImageClass}" />
      ${this.restrictedIconTemplate}
    `;
  }
  get waveformTemplate() {
    var _a;
    return $$4`
      <div class=${this.boxWaveformClass}>
        <img
          class=${this.itemImageWaveformClass}
          src="${this.imageSrc}"
          alt="${l$8((_a = this.model) === null || _a === void 0 ? void 0 : _a.title)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `;
  }
  get restrictedIconTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning)) {
      return w$4;
    }
    return $$4` ${restrictedIcon} `;
  }
  get tileActionTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning)) {
      return w$4;
    }
    return $$4`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
  }
  onLoadItemImageCheck() {
    const aspectRatio = this.itemImageWaveform.naturalWidth / this.itemImageWaveform.naturalHeight;
    if (aspectRatio === 4) {
      this.isWaveform = true;
    }
  }
  get imageClass() {
    var _a;
    return `item-image ${((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning) ? "deemphasize" : "default"}`;
  }
  get listImageClass() {
    var _a;
    return `list-image ${(_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype}${this.isCompactTile ? " compact" : ""}`;
  }
  get imageBoxClass() {
    var _a, _b;
    if (this.isListTile) {
      return `list-image-box${((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning) ? " deemphasize" : ""}`;
    }
    if ((_b = this.model) === null || _b === void 0 ? void 0 : _b.contentWarning) {
      return "item-image-box";
    }
    return void 0;
  }
  get boxWaveformClass() {
    return `item-audio${this.isWaveform ? ` ${this.hashBasedGradient}` : ""}`;
  }
  get itemImageWaveformClass() {
    return `item-image${this.isWaveform ? " waveform" : ""}`;
  }
  get hashBasedGradient() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
      return "grad1";
    }
    const gradient = this.hashStrToInt(this.model.identifier) % 6;
    return `grad${gradient}`;
  }
  hashStrToInt(str2) {
    return str2.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  }
  static get styles() {
    return r$9`
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

      .deemphasize svg {
        padding: 25%;
        z-index: 2;
        position: absolute;
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
        top: 5.5rem;
      }

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], ItemImage.prototype, "model", void 0);
__decorate([
  e$f({ type: String })
], ItemImage.prototype, "baseImageUrl", void 0);
__decorate([
  e$f({ type: Boolean })
], ItemImage.prototype, "isListTile", void 0);
__decorate([
  e$f({ type: Boolean })
], ItemImage.prototype, "isCompactTile", void 0);
__decorate([
  t$b()
], ItemImage.prototype, "isWaveform", void 0);
__decorate([
  i$d(".item-image")
], ItemImage.prototype, "itemImageWaveform", void 0);
ItemImage = __decorate([
  n$g("item-image")
], ItemImage);
let ItemTile = class ItemTile2 extends s$e {
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const itemTitle = ((_a = this.model) === null || _a === void 0 ? void 0 : _a.title) || "";
    const itemCreator = ((_b = this.model) === null || _b === void 0 ? void 0 : _b.creator) || "-";
    return $$4`
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${itemTitle}>${(_c = this.model) === null || _c === void 0 ? void 0 : _c.title}</h1>
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              <span><strong>By:&nbsp;</strong>${itemCreator}</span>
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${(_d = this.model) === null || _d === void 0 ? void 0 : _d.mediatype}
                .collection=${(_e = this.model) === null || _e === void 0 ? void 0 : _e.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${viewsIcon}
              <p class="status-text">
                ${formatCount((_f = this.model) === null || _f === void 0 ? void 0 : _f.viewCount, "short", "short")}
              </p>
            </div>
            <div class="col">
              ${favoriteFilledIcon}
              <p class="status-text">
                ${formatCount((_g = this.model) === null || _g === void 0 ? void 0 : _g.itemCount, "short", "short")}
              </p>
            </div>
            <div class="col">
              ${reviewsIcon}
              <p class="status-text">
                ${formatCount((_h = this.model) === null || _h === void 0 ? void 0 : _h.favCount, "short", "short")}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get styles() {
    const cornerRadiusCss = r$9`var(--collectionTileCornerRadius, 4px)`;
    return r$9`
      #container {
        background-color: #ffffff;
        border-radius: ${cornerRadiusCss};
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], ItemTile.prototype, "model", void 0);
__decorate([
  e$f({ type: String })
], ItemTile.prototype, "baseImageUrl", void 0);
ItemTile = __decorate([
  n$g("item-tile")
], ItemTile);
const accountIcon = y$1`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m89.6854559 79.6500588c1.7300364 6.4823648 2.180423 13.3122689 3.3145441 20.3499412h-86c.5683151-15.8558542 2.98334063-30.7849367 15.1676149-41.6581341 22.9948067-20.518674 59.250299-9.0032844 67.517841 21.3081929zm-40.0998307-79.6500588c10.872402.0493248 19.9700408 9.25722341 19.917959 20.1421788-.0829413 11.042868-8.9616237 19.8492523-20.0602807 19.8578212-11.1181198 0-19.9397193-8.7904706-19.9397193-19.8908727-.0327543-11.11998815 9.0125781-20.17487063 20.082041-20.1091273z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of a person</title>
  </svg>
`;
const uploadIcon = y$1`
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="m50 20 33.3333333 43.3333333h-20v36.6666667h-26.6666666v-36.6666667h-20zm50-20v13.3333333h-100v-13.3333333z"
      fill="#333"
      fill-rule="evenodd"
    />
    <title>Icon of an arrow pointing upwards</title>
  </svg>
`;
let AccountTile = class AccountTile2 extends s$e {
  render() {
    var _a, _b, _c, _d, _e, _f, _g;
    return $$4`
      <div class="outer-holder">
        <div class="inner-holder">
          <div id="header-holder">
            <div id="title-holder">
              <h1>${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}</h1>
            </div>
            <div id="avatar-holder">
              <div
                id="avatar"
                style="background-image: url('https://archive.org/services/img/${(_b = this.model) === null || _b === void 0 ? void 0 : _b.identifier}')"
              ></div>
            </div>
          </div>
          <div id="year-holder">
            <div id="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div id="year-holder">
              <h3>${(_d = (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateAdded) === null || _d === void 0 ? void 0 : _d.getFullYear()}</h3>
            </div>
          </div>
          <div id="status-holder">
            <div id="patron-icon">${accountIcon}</div>
            <div class="stat-icon">
              ${uploadIcon}
              <h3>${(_e = this.model) === null || _e === void 0 ? void 0 : _e.itemCount}</h3>
            </div>
            <div class="stat-icon">
              ${favoriteFilledIcon}
              <h3>${(_f = this.model) === null || _f === void 0 ? void 0 : _f.favCount}</h3>
            </div>
            <div class="stat-icon">
              ${reviewsIcon}
              <h3>${(_g = this.model) === null || _g === void 0 ? void 0 : _g.commentCount}</h3>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], AccountTile.prototype, "model", void 0);
AccountTile = __decorate([
  n$g("account-tile")
], AccountTile);
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* o$7(o2, t3) {
  const f2 = typeof t3 == "function";
  if (o2 !== void 0) {
    let i2 = -1;
    for (const n2 of o2)
      i2 > -1 && (yield f2 ? t3(i2) : t3), i2++, yield n2;
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function* o$6(o2, f2) {
  if (o2 !== void 0) {
    let i2 = 0;
    for (const t3 of o2)
      yield f2(t3, i2++);
  }
}
/*! @license DOMPurify 2.3.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.3.6/LICENSE */
function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var hasOwnProperty = Object.hasOwnProperty, setPrototypeOf = Object.setPrototypeOf, isFrozen = Object.isFrozen, getPrototypeOf = Object.getPrototypeOf, getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var freeze = Object.freeze, seal = Object.seal, create = Object.create;
var _ref = typeof Reflect !== "undefined" && Reflect, apply = _ref.apply, construct = _ref.construct;
if (!apply) {
  apply = function apply2(fun, thisValue, args) {
    return fun.apply(thisValue, args);
  };
}
if (!freeze) {
  freeze = function freeze2(x2) {
    return x2;
  };
}
if (!seal) {
  seal = function seal2(x2) {
    return x2;
  };
}
if (!construct) {
  construct = function construct2(Func, args) {
    return new (Function.prototype.bind.apply(Func, [null].concat(_toConsumableArray(args))))();
  };
}
var arrayForEach = unapply(Array.prototype.forEach);
var arrayPop = unapply(Array.prototype.pop);
var arrayPush = unapply(Array.prototype.push);
var stringToLowerCase = unapply(String.prototype.toLowerCase);
var stringMatch = unapply(String.prototype.match);
var stringReplace = unapply(String.prototype.replace);
var stringIndexOf = unapply(String.prototype.indexOf);
var stringTrim = unapply(String.prototype.trim);
var regExpTest = unapply(RegExp.prototype.test);
var typeErrorCreate = unconstruct(TypeError);
function unapply(func) {
  return function(thisArg) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    return apply(func, thisArg, args);
  };
}
function unconstruct(func) {
  return function() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return construct(func, args);
  };
}
function addToSet(set2, array) {
  if (setPrototypeOf) {
    setPrototypeOf(set2, null);
  }
  var l2 = array.length;
  while (l2--) {
    var element = array[l2];
    if (typeof element === "string") {
      var lcElement = stringToLowerCase(element);
      if (lcElement !== element) {
        if (!isFrozen(array)) {
          array[l2] = lcElement;
        }
        element = lcElement;
      }
    }
    set2[element] = true;
  }
  return set2;
}
function clone(object) {
  var newObject = create(null);
  var property = void 0;
  for (property in object) {
    if (apply(hasOwnProperty, object, [property])) {
      newObject[property] = object[property];
    }
  }
  return newObject;
}
function lookupGetter(object, prop) {
  while (object !== null) {
    var desc = getOwnPropertyDescriptor(object, prop);
    if (desc) {
      if (desc.get) {
        return unapply(desc.get);
      }
      if (typeof desc.value === "function") {
        return unapply(desc.value);
      }
    }
    object = getPrototypeOf(object);
  }
  function fallbackValue(element) {
    console.warn("fallback value for", element);
    return null;
  }
  return fallbackValue;
}
var html = freeze(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "section", "select", "shadow", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]);
var svg = freeze(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]);
var svgFilters = freeze(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]);
var svgDisallowed = freeze(["animate", "color-profile", "cursor", "discard", "fedropshadow", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]);
var mathMl = freeze(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover"]);
var mathMlDisallowed = freeze(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]);
var text = freeze(["#text"]);
var html$1 = freeze(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "pattern", "placeholder", "playsinline", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "xmlns", "slot"]);
var svg$1 = freeze(["accent-height", "accumulate", "additive", "alignment-baseline", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dur", "edgemode", "elevation", "end", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]);
var mathMl$1 = freeze(["accent", "accentunder", "align", "bevelled", "close", "columnsalign", "columnlines", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lspace", "lquote", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]);
var xml = freeze(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]);
var MUSTACHE_EXPR = seal(/\{\{[\s\S]*|[\s\S]*\}\}/gm);
var ERB_EXPR = seal(/<%[\s\S]*|[\s\S]*%>/gm);
var DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]/);
var ARIA_ATTR = seal(/^aria-[\-\w]+$/);
var IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i);
var IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
var ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g);
var DOCTYPE_NAME = seal(/^html$/i);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
  return typeof obj;
} : function(obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};
function _toConsumableArray$1(arr) {
  if (Array.isArray(arr)) {
    for (var i2 = 0, arr2 = Array(arr.length); i2 < arr.length; i2++) {
      arr2[i2] = arr[i2];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}
var getGlobal = function getGlobal2() {
  return typeof window === "undefined" ? null : window;
};
var _createTrustedTypesPolicy = function _createTrustedTypesPolicy2(trustedTypes, document2) {
  if ((typeof trustedTypes === "undefined" ? "undefined" : _typeof(trustedTypes)) !== "object" || typeof trustedTypes.createPolicy !== "function") {
    return null;
  }
  var suffix = null;
  var ATTR_NAME = "data-tt-policy-suffix";
  if (document2.currentScript && document2.currentScript.hasAttribute(ATTR_NAME)) {
    suffix = document2.currentScript.getAttribute(ATTR_NAME);
  }
  var policyName = "dompurify" + (suffix ? "#" + suffix : "");
  try {
    return trustedTypes.createPolicy(policyName, {
      createHTML: function createHTML(html$$1) {
        return html$$1;
      }
    });
  } catch (_2) {
    console.warn("TrustedTypes policy " + policyName + " could not be created.");
    return null;
  }
};
function createDOMPurify() {
  var window2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : getGlobal();
  var DOMPurify = function DOMPurify2(root) {
    return createDOMPurify(root);
  };
  DOMPurify.version = "2.3.6";
  DOMPurify.removed = [];
  if (!window2 || !window2.document || window2.document.nodeType !== 9) {
    DOMPurify.isSupported = false;
    return DOMPurify;
  }
  var originalDocument = window2.document;
  var document2 = window2.document;
  var DocumentFragment = window2.DocumentFragment, HTMLTemplateElement = window2.HTMLTemplateElement, Node2 = window2.Node, Element = window2.Element, NodeFilter = window2.NodeFilter, _window$NamedNodeMap = window2.NamedNodeMap, NamedNodeMap = _window$NamedNodeMap === void 0 ? window2.NamedNodeMap || window2.MozNamedAttrMap : _window$NamedNodeMap, HTMLFormElement = window2.HTMLFormElement, DOMParser = window2.DOMParser, trustedTypes = window2.trustedTypes;
  var ElementPrototype = Element.prototype;
  var cloneNode = lookupGetter(ElementPrototype, "cloneNode");
  var getNextSibling = lookupGetter(ElementPrototype, "nextSibling");
  var getChildNodes = lookupGetter(ElementPrototype, "childNodes");
  var getParentNode = lookupGetter(ElementPrototype, "parentNode");
  if (typeof HTMLTemplateElement === "function") {
    var template = document2.createElement("template");
    if (template.content && template.content.ownerDocument) {
      document2 = template.content.ownerDocument;
    }
  }
  var trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, originalDocument);
  var emptyHTML = trustedTypesPolicy ? trustedTypesPolicy.createHTML("") : "";
  var _document = document2, implementation = _document.implementation, createNodeIterator = _document.createNodeIterator, createDocumentFragment = _document.createDocumentFragment, getElementsByTagName = _document.getElementsByTagName;
  var importNode = originalDocument.importNode;
  var documentMode = {};
  try {
    documentMode = clone(document2).documentMode ? document2.documentMode : {};
  } catch (_2) {
  }
  var hooks = {};
  DOMPurify.isSupported = typeof getParentNode === "function" && implementation && typeof implementation.createHTMLDocument !== "undefined" && documentMode !== 9;
  var MUSTACHE_EXPR$$1 = MUSTACHE_EXPR, ERB_EXPR$$1 = ERB_EXPR, DATA_ATTR$$1 = DATA_ATTR, ARIA_ATTR$$1 = ARIA_ATTR, IS_SCRIPT_OR_DATA$$1 = IS_SCRIPT_OR_DATA, ATTR_WHITESPACE$$1 = ATTR_WHITESPACE;
  var IS_ALLOWED_URI$$1 = IS_ALLOWED_URI;
  var ALLOWED_TAGS = null;
  var DEFAULT_ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(html), _toConsumableArray$1(svg), _toConsumableArray$1(svgFilters), _toConsumableArray$1(mathMl), _toConsumableArray$1(text)));
  var ALLOWED_ATTR = null;
  var DEFAULT_ALLOWED_ATTR = addToSet({}, [].concat(_toConsumableArray$1(html$1), _toConsumableArray$1(svg$1), _toConsumableArray$1(mathMl$1), _toConsumableArray$1(xml)));
  var CUSTOM_ELEMENT_HANDLING = Object.seal(Object.create(null, {
    tagNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    attributeNameCheck: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: true,
      configurable: false,
      enumerable: true,
      value: false
    }
  }));
  var FORBID_TAGS = null;
  var FORBID_ATTR = null;
  var ALLOW_ARIA_ATTR = true;
  var ALLOW_DATA_ATTR = true;
  var ALLOW_UNKNOWN_PROTOCOLS = false;
  var SAFE_FOR_TEMPLATES = false;
  var WHOLE_DOCUMENT = false;
  var SET_CONFIG = false;
  var FORCE_BODY = false;
  var RETURN_DOM = false;
  var RETURN_DOM_FRAGMENT = false;
  var RETURN_TRUSTED_TYPE = false;
  var SANITIZE_DOM = true;
  var KEEP_CONTENT = true;
  var IN_PLACE = false;
  var USE_PROFILES = {};
  var FORBID_CONTENTS = null;
  var DEFAULT_FORBID_CONTENTS = addToSet({}, ["annotation-xml", "audio", "colgroup", "desc", "foreignobject", "head", "iframe", "math", "mi", "mn", "mo", "ms", "mtext", "noembed", "noframes", "noscript", "plaintext", "script", "style", "svg", "template", "thead", "title", "video", "xmp"]);
  var DATA_URI_TAGS = null;
  var DEFAULT_DATA_URI_TAGS = addToSet({}, ["audio", "video", "img", "source", "image", "track"]);
  var URI_SAFE_ATTRIBUTES = null;
  var DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]);
  var MATHML_NAMESPACE = "http://www.w3.org/1998/Math/MathML";
  var SVG_NAMESPACE = "http://www.w3.org/2000/svg";
  var HTML_NAMESPACE = "http://www.w3.org/1999/xhtml";
  var NAMESPACE = HTML_NAMESPACE;
  var IS_EMPTY_INPUT = false;
  var PARSER_MEDIA_TYPE = void 0;
  var SUPPORTED_PARSER_MEDIA_TYPES = ["application/xhtml+xml", "text/html"];
  var DEFAULT_PARSER_MEDIA_TYPE = "text/html";
  var transformCaseFunc = void 0;
  var CONFIG = null;
  var formElement = document2.createElement("form");
  var isRegexOrFunction = function isRegexOrFunction2(testValue) {
    return testValue instanceof RegExp || testValue instanceof Function;
  };
  var _parseConfig = function _parseConfig2(cfg) {
    if (CONFIG && CONFIG === cfg) {
      return;
    }
    if (!cfg || (typeof cfg === "undefined" ? "undefined" : _typeof(cfg)) !== "object") {
      cfg = {};
    }
    cfg = clone(cfg);
    ALLOWED_TAGS = "ALLOWED_TAGS" in cfg ? addToSet({}, cfg.ALLOWED_TAGS) : DEFAULT_ALLOWED_TAGS;
    ALLOWED_ATTR = "ALLOWED_ATTR" in cfg ? addToSet({}, cfg.ALLOWED_ATTR) : DEFAULT_ALLOWED_ATTR;
    URI_SAFE_ATTRIBUTES = "ADD_URI_SAFE_ATTR" in cfg ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR) : DEFAULT_URI_SAFE_ATTRIBUTES;
    DATA_URI_TAGS = "ADD_DATA_URI_TAGS" in cfg ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS) : DEFAULT_DATA_URI_TAGS;
    FORBID_CONTENTS = "FORBID_CONTENTS" in cfg ? addToSet({}, cfg.FORBID_CONTENTS) : DEFAULT_FORBID_CONTENTS;
    FORBID_TAGS = "FORBID_TAGS" in cfg ? addToSet({}, cfg.FORBID_TAGS) : {};
    FORBID_ATTR = "FORBID_ATTR" in cfg ? addToSet({}, cfg.FORBID_ATTR) : {};
    USE_PROFILES = "USE_PROFILES" in cfg ? cfg.USE_PROFILES : false;
    ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false;
    ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false;
    ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false;
    SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false;
    WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false;
    RETURN_DOM = cfg.RETURN_DOM || false;
    RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false;
    RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false;
    FORCE_BODY = cfg.FORCE_BODY || false;
    SANITIZE_DOM = cfg.SANITIZE_DOM !== false;
    KEEP_CONTENT = cfg.KEEP_CONTENT !== false;
    IN_PLACE = cfg.IN_PLACE || false;
    IS_ALLOWED_URI$$1 = cfg.ALLOWED_URI_REGEXP || IS_ALLOWED_URI$$1;
    NAMESPACE = cfg.NAMESPACE || HTML_NAMESPACE;
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.tagNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.tagNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && isRegexOrFunction(cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)) {
      CUSTOM_ELEMENT_HANDLING.attributeNameCheck = cfg.CUSTOM_ELEMENT_HANDLING.attributeNameCheck;
    }
    if (cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements === "boolean") {
      CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = cfg.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements;
    }
    PARSER_MEDIA_TYPE = SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? PARSER_MEDIA_TYPE = DEFAULT_PARSER_MEDIA_TYPE : PARSER_MEDIA_TYPE = cfg.PARSER_MEDIA_TYPE;
    transformCaseFunc = PARSER_MEDIA_TYPE === "application/xhtml+xml" ? function(x2) {
      return x2;
    } : stringToLowerCase;
    if (SAFE_FOR_TEMPLATES) {
      ALLOW_DATA_ATTR = false;
    }
    if (RETURN_DOM_FRAGMENT) {
      RETURN_DOM = true;
    }
    if (USE_PROFILES) {
      ALLOWED_TAGS = addToSet({}, [].concat(_toConsumableArray$1(text)));
      ALLOWED_ATTR = [];
      if (USE_PROFILES.html === true) {
        addToSet(ALLOWED_TAGS, html);
        addToSet(ALLOWED_ATTR, html$1);
      }
      if (USE_PROFILES.svg === true) {
        addToSet(ALLOWED_TAGS, svg);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.svgFilters === true) {
        addToSet(ALLOWED_TAGS, svgFilters);
        addToSet(ALLOWED_ATTR, svg$1);
        addToSet(ALLOWED_ATTR, xml);
      }
      if (USE_PROFILES.mathMl === true) {
        addToSet(ALLOWED_TAGS, mathMl);
        addToSet(ALLOWED_ATTR, mathMl$1);
        addToSet(ALLOWED_ATTR, xml);
      }
    }
    if (cfg.ADD_TAGS) {
      if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
        ALLOWED_TAGS = clone(ALLOWED_TAGS);
      }
      addToSet(ALLOWED_TAGS, cfg.ADD_TAGS);
    }
    if (cfg.ADD_ATTR) {
      if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
        ALLOWED_ATTR = clone(ALLOWED_ATTR);
      }
      addToSet(ALLOWED_ATTR, cfg.ADD_ATTR);
    }
    if (cfg.ADD_URI_SAFE_ATTR) {
      addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR);
    }
    if (cfg.FORBID_CONTENTS) {
      if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
        FORBID_CONTENTS = clone(FORBID_CONTENTS);
      }
      addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS);
    }
    if (KEEP_CONTENT) {
      ALLOWED_TAGS["#text"] = true;
    }
    if (WHOLE_DOCUMENT) {
      addToSet(ALLOWED_TAGS, ["html", "head", "body"]);
    }
    if (ALLOWED_TAGS.table) {
      addToSet(ALLOWED_TAGS, ["tbody"]);
      delete FORBID_TAGS.tbody;
    }
    if (freeze) {
      freeze(cfg);
    }
    CONFIG = cfg;
  };
  var MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ["mi", "mo", "mn", "ms", "mtext"]);
  var HTML_INTEGRATION_POINTS = addToSet({}, ["foreignobject", "desc", "title", "annotation-xml"]);
  var ALL_SVG_TAGS = addToSet({}, svg);
  addToSet(ALL_SVG_TAGS, svgFilters);
  addToSet(ALL_SVG_TAGS, svgDisallowed);
  var ALL_MATHML_TAGS = addToSet({}, mathMl);
  addToSet(ALL_MATHML_TAGS, mathMlDisallowed);
  var _checkValidNamespace = function _checkValidNamespace2(element) {
    var parent = getParentNode(element);
    if (!parent || !parent.tagName) {
      parent = {
        namespaceURI: HTML_NAMESPACE,
        tagName: "template"
      };
    }
    var tagName = stringToLowerCase(element.tagName);
    var parentTagName = stringToLowerCase(parent.tagName);
    if (element.namespaceURI === SVG_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "svg";
      }
      if (parent.namespaceURI === MATHML_NAMESPACE) {
        return tagName === "svg" && (parentTagName === "annotation-xml" || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
      }
      return Boolean(ALL_SVG_TAGS[tagName]);
    }
    if (element.namespaceURI === MATHML_NAMESPACE) {
      if (parent.namespaceURI === HTML_NAMESPACE) {
        return tagName === "math";
      }
      if (parent.namespaceURI === SVG_NAMESPACE) {
        return tagName === "math" && HTML_INTEGRATION_POINTS[parentTagName];
      }
      return Boolean(ALL_MATHML_TAGS[tagName]);
    }
    if (element.namespaceURI === HTML_NAMESPACE) {
      if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
        return false;
      }
      var commonSvgAndHTMLElements = addToSet({}, ["title", "style", "font", "a", "script"]);
      return !ALL_MATHML_TAGS[tagName] && (commonSvgAndHTMLElements[tagName] || !ALL_SVG_TAGS[tagName]);
    }
    return false;
  };
  var _forceRemove = function _forceRemove2(node) {
    arrayPush(DOMPurify.removed, { element: node });
    try {
      node.parentNode.removeChild(node);
    } catch (_2) {
      try {
        node.outerHTML = emptyHTML;
      } catch (_3) {
        node.remove();
      }
    }
  };
  var _removeAttribute = function _removeAttribute2(name, node) {
    try {
      arrayPush(DOMPurify.removed, {
        attribute: node.getAttributeNode(name),
        from: node
      });
    } catch (_2) {
      arrayPush(DOMPurify.removed, {
        attribute: null,
        from: node
      });
    }
    node.removeAttribute(name);
    if (name === "is" && !ALLOWED_ATTR[name]) {
      if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
        try {
          _forceRemove(node);
        } catch (_2) {
        }
      } else {
        try {
          node.setAttribute(name, "");
        } catch (_2) {
        }
      }
    }
  };
  var _initDocument = function _initDocument2(dirty) {
    var doc = void 0;
    var leadingWhitespace = void 0;
    if (FORCE_BODY) {
      dirty = "<remove></remove>" + dirty;
    } else {
      var matches = stringMatch(dirty, /^[\r\n\t ]+/);
      leadingWhitespace = matches && matches[0];
    }
    if (PARSER_MEDIA_TYPE === "application/xhtml+xml") {
      dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + "</body></html>";
    }
    var dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
    if (NAMESPACE === HTML_NAMESPACE) {
      try {
        doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
      } catch (_2) {
      }
    }
    if (!doc || !doc.documentElement) {
      doc = implementation.createDocument(NAMESPACE, "template", null);
      try {
        doc.documentElement.innerHTML = IS_EMPTY_INPUT ? "" : dirtyPayload;
      } catch (_2) {
      }
    }
    var body = doc.body || doc.documentElement;
    if (dirty && leadingWhitespace) {
      body.insertBefore(document2.createTextNode(leadingWhitespace), body.childNodes[0] || null);
    }
    if (NAMESPACE === HTML_NAMESPACE) {
      return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? "html" : "body")[0];
    }
    return WHOLE_DOCUMENT ? doc.documentElement : body;
  };
  var _createIterator = function _createIterator2(root) {
    return createNodeIterator.call(root.ownerDocument || root, root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT, null, false);
  };
  var _isClobbered = function _isClobbered2(elm) {
    return elm instanceof HTMLFormElement && (typeof elm.nodeName !== "string" || typeof elm.textContent !== "string" || typeof elm.removeChild !== "function" || !(elm.attributes instanceof NamedNodeMap) || typeof elm.removeAttribute !== "function" || typeof elm.setAttribute !== "function" || typeof elm.namespaceURI !== "string" || typeof elm.insertBefore !== "function");
  };
  var _isNode = function _isNode2(object) {
    return (typeof Node2 === "undefined" ? "undefined" : _typeof(Node2)) === "object" ? object instanceof Node2 : object && (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && typeof object.nodeType === "number" && typeof object.nodeName === "string";
  };
  var _executeHook = function _executeHook2(entryPoint, currentNode, data) {
    if (!hooks[entryPoint]) {
      return;
    }
    arrayForEach(hooks[entryPoint], function(hook) {
      hook.call(DOMPurify, currentNode, data, CONFIG);
    });
  };
  var _sanitizeElements = function _sanitizeElements2(currentNode) {
    var content = void 0;
    _executeHook("beforeSanitizeElements", currentNode, null);
    if (_isClobbered(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if (stringMatch(currentNode.nodeName, /[\u0080-\uFFFF]/)) {
      _forceRemove(currentNode);
      return true;
    }
    var tagName = transformCaseFunc(currentNode.nodeName);
    _executeHook("uponSanitizeElement", currentNode, {
      tagName,
      allowedTags: ALLOWED_TAGS
    });
    if (!_isNode(currentNode.firstElementChild) && (!_isNode(currentNode.content) || !_isNode(currentNode.content.firstElementChild)) && regExpTest(/<[/\w]/g, currentNode.innerHTML) && regExpTest(/<[/\w]/g, currentNode.textContent)) {
      _forceRemove(currentNode);
      return true;
    }
    if (tagName === "select" && regExpTest(/<template/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
      if (!FORBID_TAGS[tagName] && _basicCustomElementTest(tagName)) {
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName))
          return false;
        if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName))
          return false;
      }
      if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
        var parentNode = getParentNode(currentNode) || currentNode.parentNode;
        var childNodes = getChildNodes(currentNode) || currentNode.childNodes;
        if (childNodes && parentNode) {
          var childCount = childNodes.length;
          for (var i2 = childCount - 1; i2 >= 0; --i2) {
            parentNode.insertBefore(cloneNode(childNodes[i2], true), getNextSibling(currentNode));
          }
        }
      }
      _forceRemove(currentNode);
      return true;
    }
    if (currentNode instanceof Element && !_checkValidNamespace(currentNode)) {
      _forceRemove(currentNode);
      return true;
    }
    if ((tagName === "noscript" || tagName === "noembed") && regExpTest(/<\/no(script|embed)/i, currentNode.innerHTML)) {
      _forceRemove(currentNode);
      return true;
    }
    if (SAFE_FOR_TEMPLATES && currentNode.nodeType === 3) {
      content = currentNode.textContent;
      content = stringReplace(content, MUSTACHE_EXPR$$1, " ");
      content = stringReplace(content, ERB_EXPR$$1, " ");
      if (currentNode.textContent !== content) {
        arrayPush(DOMPurify.removed, { element: currentNode.cloneNode() });
        currentNode.textContent = content;
      }
    }
    _executeHook("afterSanitizeElements", currentNode, null);
    return false;
  };
  var _isValidAttribute = function _isValidAttribute2(lcTag, lcName, value) {
    if (SANITIZE_DOM && (lcName === "id" || lcName === "name") && (value in document2 || value in formElement)) {
      return false;
    }
    if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$$1, lcName))
      ;
    else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$$1, lcName))
      ;
    else if (!ALLOWED_ATTR[lcName] || FORBID_ATTR[lcName]) {
      if (_basicCustomElementTest(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName)) || lcName === "is" && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value)))
        ;
      else {
        return false;
      }
    } else if (URI_SAFE_ATTRIBUTES[lcName])
      ;
    else if (regExpTest(IS_ALLOWED_URI$$1, stringReplace(value, ATTR_WHITESPACE$$1, "")))
      ;
    else if ((lcName === "src" || lcName === "xlink:href" || lcName === "href") && lcTag !== "script" && stringIndexOf(value, "data:") === 0 && DATA_URI_TAGS[lcTag])
      ;
    else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$$1, stringReplace(value, ATTR_WHITESPACE$$1, "")))
      ;
    else if (!value)
      ;
    else {
      return false;
    }
    return true;
  };
  var _basicCustomElementTest = function _basicCustomElementTest2(tagName) {
    return tagName.indexOf("-") > 0;
  };
  var _sanitizeAttributes = function _sanitizeAttributes2(currentNode) {
    var attr = void 0;
    var value = void 0;
    var lcName = void 0;
    var l2 = void 0;
    _executeHook("beforeSanitizeAttributes", currentNode, null);
    var attributes = currentNode.attributes;
    if (!attributes) {
      return;
    }
    var hookEvent = {
      attrName: "",
      attrValue: "",
      keepAttr: true,
      allowedAttributes: ALLOWED_ATTR
    };
    l2 = attributes.length;
    while (l2--) {
      attr = attributes[l2];
      var _attr = attr, name = _attr.name, namespaceURI = _attr.namespaceURI;
      value = stringTrim(attr.value);
      lcName = transformCaseFunc(name);
      hookEvent.attrName = lcName;
      hookEvent.attrValue = value;
      hookEvent.keepAttr = true;
      hookEvent.forceKeepAttr = void 0;
      _executeHook("uponSanitizeAttribute", currentNode, hookEvent);
      value = hookEvent.attrValue;
      if (hookEvent.forceKeepAttr) {
        continue;
      }
      _removeAttribute(name, currentNode);
      if (!hookEvent.keepAttr) {
        continue;
      }
      if (regExpTest(/\/>/i, value)) {
        _removeAttribute(name, currentNode);
        continue;
      }
      if (SAFE_FOR_TEMPLATES) {
        value = stringReplace(value, MUSTACHE_EXPR$$1, " ");
        value = stringReplace(value, ERB_EXPR$$1, " ");
      }
      var lcTag = transformCaseFunc(currentNode.nodeName);
      if (!_isValidAttribute(lcTag, lcName, value)) {
        continue;
      }
      try {
        if (namespaceURI) {
          currentNode.setAttributeNS(namespaceURI, name, value);
        } else {
          currentNode.setAttribute(name, value);
        }
        arrayPop(DOMPurify.removed);
      } catch (_2) {
      }
    }
    _executeHook("afterSanitizeAttributes", currentNode, null);
  };
  var _sanitizeShadowDOM = function _sanitizeShadowDOM2(fragment) {
    var shadowNode = void 0;
    var shadowIterator = _createIterator(fragment);
    _executeHook("beforeSanitizeShadowDOM", fragment, null);
    while (shadowNode = shadowIterator.nextNode()) {
      _executeHook("uponSanitizeShadowNode", shadowNode, null);
      if (_sanitizeElements(shadowNode)) {
        continue;
      }
      if (shadowNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM2(shadowNode.content);
      }
      _sanitizeAttributes(shadowNode);
    }
    _executeHook("afterSanitizeShadowDOM", fragment, null);
  };
  DOMPurify.sanitize = function(dirty, cfg) {
    var body = void 0;
    var importedNode = void 0;
    var currentNode = void 0;
    var oldNode = void 0;
    var returnNode = void 0;
    IS_EMPTY_INPUT = !dirty;
    if (IS_EMPTY_INPUT) {
      dirty = "<!-->";
    }
    if (typeof dirty !== "string" && !_isNode(dirty)) {
      if (typeof dirty.toString !== "function") {
        throw typeErrorCreate("toString is not a function");
      } else {
        dirty = dirty.toString();
        if (typeof dirty !== "string") {
          throw typeErrorCreate("dirty is not a string, aborting");
        }
      }
    }
    if (!DOMPurify.isSupported) {
      if (_typeof(window2.toStaticHTML) === "object" || typeof window2.toStaticHTML === "function") {
        if (typeof dirty === "string") {
          return window2.toStaticHTML(dirty);
        }
        if (_isNode(dirty)) {
          return window2.toStaticHTML(dirty.outerHTML);
        }
      }
      return dirty;
    }
    if (!SET_CONFIG) {
      _parseConfig(cfg);
    }
    DOMPurify.removed = [];
    if (typeof dirty === "string") {
      IN_PLACE = false;
    }
    if (IN_PLACE) {
      if (dirty.nodeName) {
        var tagName = transformCaseFunc(dirty.nodeName);
        if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
          throw typeErrorCreate("root node is forbidden and cannot be sanitized in-place");
        }
      }
    } else if (dirty instanceof Node2) {
      body = _initDocument("<!---->");
      importedNode = body.ownerDocument.importNode(dirty, true);
      if (importedNode.nodeType === 1 && importedNode.nodeName === "BODY") {
        body = importedNode;
      } else if (importedNode.nodeName === "HTML") {
        body = importedNode;
      } else {
        body.appendChild(importedNode);
      }
    } else {
      if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT && dirty.indexOf("<") === -1) {
        return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
      }
      body = _initDocument(dirty);
      if (!body) {
        return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : "";
      }
    }
    if (body && FORCE_BODY) {
      _forceRemove(body.firstChild);
    }
    var nodeIterator = _createIterator(IN_PLACE ? dirty : body);
    while (currentNode = nodeIterator.nextNode()) {
      if (currentNode.nodeType === 3 && currentNode === oldNode) {
        continue;
      }
      if (_sanitizeElements(currentNode)) {
        continue;
      }
      if (currentNode.content instanceof DocumentFragment) {
        _sanitizeShadowDOM(currentNode.content);
      }
      _sanitizeAttributes(currentNode);
      oldNode = currentNode;
    }
    oldNode = null;
    if (IN_PLACE) {
      return dirty;
    }
    if (RETURN_DOM) {
      if (RETURN_DOM_FRAGMENT) {
        returnNode = createDocumentFragment.call(body.ownerDocument);
        while (body.firstChild) {
          returnNode.appendChild(body.firstChild);
        }
      } else {
        returnNode = body;
      }
      if (ALLOWED_ATTR.shadowroot) {
        returnNode = importNode.call(originalDocument, returnNode, true);
      }
      return returnNode;
    }
    var serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
    if (WHOLE_DOCUMENT && ALLOWED_TAGS["!doctype"] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
      serializedHTML = "<!DOCTYPE " + body.ownerDocument.doctype.name + ">\n" + serializedHTML;
    }
    if (SAFE_FOR_TEMPLATES) {
      serializedHTML = stringReplace(serializedHTML, MUSTACHE_EXPR$$1, " ");
      serializedHTML = stringReplace(serializedHTML, ERB_EXPR$$1, " ");
    }
    return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
  };
  DOMPurify.setConfig = function(cfg) {
    _parseConfig(cfg);
    SET_CONFIG = true;
  };
  DOMPurify.clearConfig = function() {
    CONFIG = null;
    SET_CONFIG = false;
  };
  DOMPurify.isValidAttribute = function(tag, attr, value) {
    if (!CONFIG) {
      _parseConfig({});
    }
    var lcTag = transformCaseFunc(tag);
    var lcName = transformCaseFunc(attr);
    return _isValidAttribute(lcTag, lcName, value);
  };
  DOMPurify.addHook = function(entryPoint, hookFunction) {
    if (typeof hookFunction !== "function") {
      return;
    }
    hooks[entryPoint] = hooks[entryPoint] || [];
    arrayPush(hooks[entryPoint], hookFunction);
  };
  DOMPurify.removeHook = function(entryPoint) {
    if (hooks[entryPoint]) {
      arrayPop(hooks[entryPoint]);
    }
  };
  DOMPurify.removeHooks = function(entryPoint) {
    if (hooks[entryPoint]) {
      hooks[entryPoint] = [];
    }
  };
  DOMPurify.removeAllHooks = function() {
    hooks = {};
  };
  return DOMPurify;
}
var purify = createDOMPurify();
function dateLabel(sortField) {
  switch (sortField) {
    case "date":
      return "Published";
    case "reviewdate":
      return "Reviewed";
    case "addeddate":
      return "Added";
    default:
      return "Archived";
  }
}
function accountLabel(date) {
  if (!date) {
    return "";
  }
  return `Archivist since ${date.getFullYear()}`;
}
function formatDate(date, format = "short", locale2 = "en-US") {
  if (!date)
    return "";
  const options = {
    timeZone: "UTC"
  };
  switch (format) {
    case "short":
      options.month = "short";
      options.year = "numeric";
      break;
    case "long":
      options.year = "numeric";
      options.month = "short";
      options.day = "2-digit";
      break;
  }
  const dateFormatter = new Intl.DateTimeFormat(locale2, options);
  return dateFormatter.format(date);
}
let TileList = class TileList2 extends s$e {
  constructor() {
    super(...arguments);
    this.sortParam = null;
    this.collectionLinks = [];
  }
  updated(changed) {
    if (changed.has("model")) {
      this.fetchCollectionNames();
    }
  }
  async fetchCollectionNames() {
    var _a, _b;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.collections) || this.model.collections.length === 0 || !this.collectionNameCache) {
      return;
    }
    this.collectionLinks = [];
    const newCollellectionLinks = [];
    const promises = [];
    for (const collection of this.model.collections) {
      promises.push((_b = this.collectionNameCache) === null || _b === void 0 ? void 0 : _b.collectionNameFor(collection).then((name) => {
        newCollellectionLinks.push(this.detailsLink(collection, name !== null && name !== void 0 ? name : collection));
      }));
    }
    await Promise.all(promises);
    this.collectionLinks = newCollellectionLinks;
  }
  render() {
    return $$4`
      <div id="list-line" class="${this.classSize}">
        ${this.classSize === "mobile" ? this.mobileTemplate : this.desktopTemplate}
      </div>
    `;
  }
  get mobileTemplate() {
    var _a;
    return $$4`
      <div id="list-line-top">
        <div id="list-line-left">
          <div id="thumb" class="${l$8((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
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
    `;
  }
  get desktopTemplate() {
    var _a;
    return $$4`
      <div id="list-line-left">
        <div id="thumb" class="${l$8((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
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
    `;
  }
  get detailsTemplate() {
    return $$4`
      ${this.itemLineTemplate} ${this.creatorTemplate}
      <div id="dates-line">
        ${this.datePublishedTemplate} ${this.dateSortByTemplate}
      </div>
      <div id="views-line">
        ${this.viewsTemplate} ${this.ratingTemplate} ${this.reviewsTemplate}
      </div>
      ${this.topicsTemplate} ${this.collectionsTemplate}
      ${this.descriptionTemplate}
    `;
  }
  get imgTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
      return w$4;
    }
    return $$4`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
      >
      </item-image>
    `;
  }
  get iconRightTemplate() {
    var _a, _b;
    return $$4`
      <div id="icon-right">
        <mediatype-icon
          .mediatype=${(_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype}
          .collections=${(_b = this.model) === null || _b === void 0 ? void 0 : _b.collections}
          style="--iconCustomFillColor: ${l$8(this.collectionColor)}"
        >
        </mediatype-icon>
      </div>
    `;
  }
  get collectionColor() {
    var _a;
    if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) !== "collection") {
      return void 0;
    }
    return "#4666FF";
  }
  get titleTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.title)) {
      return w$4;
    }
    return $$4` ${this.detailsLink(this.model.identifier, this.model.title)} `;
  }
  get itemLineTemplate() {
    const source = this.sourceTemplate;
    const volume = this.volumeTemplate;
    const issue = this.issueTemplate;
    if (!source && !volume && !issue) {
      return w$4;
    }
    return $$4` <div id="item-line">${source} ${volume} ${issue}</div> `;
  }
  get sourceTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.source)) {
      return w$4;
    }
    return $$4`
      <div id="source" class="metadata">
        ${this.labelTemplate("Source")}
        ${this.searchLink("source", this.model.source)}
      </div>
    `;
  }
  get volumeTemplate() {
    var _a;
    return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.volume, "Volume");
  }
  get issueTemplate() {
    var _a;
    return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.issue, "Issue");
  }
  get creatorTemplate() {
    var _a, _b, _c;
    if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) === "account") {
      return $$4`
        <div id="creator" class="metadata">
          <span class="label"> ${accountLabel((_b = this.model) === null || _b === void 0 ? void 0 : _b.dateAdded)} </span>
        </div>
      `;
    }
    if (!((_c = this.model) === null || _c === void 0 ? void 0 : _c.creators) || this.model.creators.length === 0) {
      return w$4;
    }
    return $$4`
      <div id="creator" class="metadata">
        ${this.labelTemplate("By")}
        ${o$7(o$6(this.model.creators, (id) => this.searchLink("creator", id)), $$4`, `)}
      </div>
    `;
  }
  get datePublishedTemplate() {
    var _a;
    return this.metadataTemplate(formatDate((_a = this.model) === null || _a === void 0 ? void 0 : _a.datePublished, "long"), "Published");
  }
  get dateSortByTemplate() {
    if (this.sortParam && (this.sortParam.field === "addeddate" || this.sortParam.field === "reviewdate" || this.sortParam.field === "publicdate")) {
      return this.metadataTemplate(formatDate(this.date, "long"), dateLabel(this.sortParam.field));
    }
    return w$4;
  }
  get viewsTemplate() {
    var _a, _b;
    return this.metadataTemplate(`${formatCount((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.viewCount) !== null && _b !== void 0 ? _b : 0, this.formatSize)}`, "Views");
  }
  get ratingTemplate() {
    var _a;
    return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.averageRating, "Avg Rating");
  }
  get reviewsTemplate() {
    var _a;
    return this.metadataTemplate((_a = this.model) === null || _a === void 0 ? void 0 : _a.commentCount, "Reviews");
  }
  get topicsTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.subjects) || this.model.subjects.length === 0) {
      return w$4;
    }
    return $$4`
      <div id="topics" class="metadata">
        ${this.labelTemplate("Topics")}
        ${o$7(o$6(this.model.subjects, (id) => this.searchLink("subject", id)), $$4`, `)}
      </div>
    `;
  }
  get collectionsTemplate() {
    if (!this.collectionLinks || this.collectionLinks.length === 0) {
      return w$4;
    }
    return $$4`
      <div id="collections" class="metadata">
        ${this.labelTemplate("Collections")}
        ${o$7(this.collectionLinks, $$4`, `)}
      </div>
    `;
  }
  get descriptionTemplate() {
    var _a, _b;
    return this.metadataTemplate(purify.sanitize((_b = (_a = this.model) === null || _a === void 0 ? void 0 : _a.description) !== null && _b !== void 0 ? _b : ""), "", "description");
  }
  metadataTemplate(text2, label = "", id) {
    if (!text2)
      return w$4;
    return $$4`
      <div id=${l$8(id)} class="metadata">
        ${this.labelTemplate(label)} ${text2}
      </div>
    `;
  }
  labelTemplate(label) {
    return $$4` ${label ? $$4`<span class="label">${label}: </span>` : w$4}`;
  }
  searchLink(field, searchTerm) {
    if (!field || !searchTerm) {
      return w$4;
    }
    const query = encodeURIComponent(`${field}:"${searchTerm}"`);
    return $$4`<a href="${this.baseNavigationUrl}/search.php?query=${query}">
      ${purify.sanitize(searchTerm)}</a
    >`;
  }
  detailsLink(identifier, text2) {
    const linkText = text2 !== null && text2 !== void 0 ? text2 : identifier;
    return $$4`<a
      href="${this.baseNavigationUrl}/details/${encodeURI(identifier)}"
      >${purify.sanitize(linkText)}</a
    >`;
  }
  get date() {
    var _a, _b, _c, _d, _e;
    switch ((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field) {
      case "date":
        return (_b = this.model) === null || _b === void 0 ? void 0 : _b.datePublished;
      case "reviewdate":
        return (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateReviewed;
      case "addeddate":
        return (_d = this.model) === null || _d === void 0 ? void 0 : _d.dateAdded;
      default:
        return (_e = this.model) === null || _e === void 0 ? void 0 : _e.dateArchived;
    }
  }
  get classSize() {
    if (this.mobileBreakpoint && this.currentWidth && this.currentWidth < this.mobileBreakpoint) {
      return "mobile";
    }
    return "desktop";
  }
  get formatSize() {
    if (this.mobileBreakpoint && this.currentWidth && this.currentWidth < this.mobileBreakpoint) {
      return "short";
    }
    return "long";
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], TileList.prototype, "model", void 0);
__decorate([
  e$f({ type: String })
], TileList.prototype, "baseNavigationUrl", void 0);
__decorate([
  e$f({ type: Object })
], TileList.prototype, "collectionNameCache", void 0);
__decorate([
  e$f({ type: Number })
], TileList.prototype, "currentWidth", void 0);
__decorate([
  e$f({ type: Number })
], TileList.prototype, "currentHeight", void 0);
__decorate([
  e$f({ type: Object })
], TileList.prototype, "sortParam", void 0);
__decorate([
  e$f({ type: Number })
], TileList.prototype, "mobileBreakpoint", void 0);
__decorate([
  t$b()
], TileList.prototype, "collectionLinks", void 0);
__decorate([
  e$f({ type: String })
], TileList.prototype, "baseImageUrl", void 0);
TileList = __decorate([
  n$g("tile-list")
], TileList);
let TileListCompact = class TileListCompact2 extends s$e {
  constructor() {
    super(...arguments);
    this.sortParam = null;
  }
  render() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    return $$4`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${l$8((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
          ${this.imageTemplate}
        </div>
        <div id="title">${purify.sanitize((_c = (_b = this.model) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : "")}</div>
        <div id="creator">
          ${((_d = this.model) === null || _d === void 0 ? void 0 : _d.mediatype) === "account" ? accountLabel((_e = this.model) === null || _e === void 0 ? void 0 : _e.dateAdded) : purify.sanitize((_g = (_f = this.model) === null || _f === void 0 ? void 0 : _f.creator) !== null && _g !== void 0 ? _g : "")}
        </div>
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(_h = this.model) === null || _h === void 0 ? void 0 : _h.mediatype}
            .collections=${(_j = this.model) === null || _j === void 0 ? void 0 : _j.collections}
            style="--iconCustomFillColor: ${l$8(this.collectionColor)}"
          >
          </mediatype-icon>
        </div>
        <div id="views">
          ${formatCount((_l = (_k = this.model) === null || _k === void 0 ? void 0 : _k.viewCount) !== null && _l !== void 0 ? _l : 0, this.formatSize)}
        </div>
      </div>
    `;
  }
  get collectionColor() {
    var _a;
    if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) !== "collection") {
      return void 0;
    }
    return "#4666FF";
  }
  get imageTemplate() {
    var _a;
    if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
      return w$4;
    }
    return $$4`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
        .isCompactTile=${true}
      >
      </item-image>
    `;
  }
  get date() {
    var _a, _b, _c, _d, _e;
    switch ((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field) {
      case "date":
        return (_b = this.model) === null || _b === void 0 ? void 0 : _b.datePublished;
      case "reviewdate":
        return (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateReviewed;
      case "addeddate":
        return (_d = this.model) === null || _d === void 0 ? void 0 : _d.dateAdded;
      default:
        return (_e = this.model) === null || _e === void 0 ? void 0 : _e.dateArchived;
    }
  }
  get classSize() {
    if (this.mobileBreakpoint && this.currentWidth && this.currentWidth < this.mobileBreakpoint) {
      return "mobile";
    }
    return "desktop";
  }
  get formatSize() {
    if (this.mobileBreakpoint && this.currentWidth && this.currentWidth < this.mobileBreakpoint) {
      return "short";
    }
    return "long";
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], TileListCompact.prototype, "model", void 0);
__decorate([
  e$f({ type: String })
], TileListCompact.prototype, "baseNavigationUrl", void 0);
__decorate([
  e$f({ type: Number })
], TileListCompact.prototype, "currentWidth", void 0);
__decorate([
  e$f({ type: Number })
], TileListCompact.prototype, "currentHeight", void 0);
__decorate([
  e$f({ type: Object })
], TileListCompact.prototype, "sortParam", void 0);
__decorate([
  e$f({ type: Number })
], TileListCompact.prototype, "mobileBreakpoint", void 0);
__decorate([
  e$f({ type: String })
], TileListCompact.prototype, "baseImageUrl", void 0);
TileListCompact = __decorate([
  n$g("tile-list-compact")
], TileListCompact);
let TileListCompactHeader = class TileListCompactHeader2 extends s$e {
  constructor() {
    super(...arguments);
    this.sortParam = null;
  }
  render() {
    var _a;
    return $$4`
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${dateLabel((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field)}</div>
        <div id="icon"></div>
        <div id="views">Views</div>
      </div>
    `;
  }
  get classSize() {
    if (this.mobileBreakpoint && this.currentWidth && this.currentWidth < this.mobileBreakpoint) {
      return "mobile";
    }
    return "desktop";
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], TileListCompactHeader.prototype, "model", void 0);
__decorate([
  e$f({ type: Number })
], TileListCompactHeader.prototype, "currentWidth", void 0);
__decorate([
  e$f({ type: Object })
], TileListCompactHeader.prototype, "sortParam", void 0);
__decorate([
  e$f({ type: Number })
], TileListCompactHeader.prototype, "mobileBreakpoint", void 0);
TileListCompactHeader = __decorate([
  n$g("tile-list-compact-header")
], TileListCompactHeader);
let TileDispatcher = class TileDispatcher2 extends s$e {
  constructor() {
    super(...arguments);
    this.sortParam = null;
  }
  render() {
    return $$4`
      <div id="container">
        ${this.tileDisplayMode === "list-header" ? this.headerTemplate : this.tileTemplate}
      </div>
    `;
  }
  get headerTemplate() {
    const { currentWidth, sortParam, mobileBreakpoint } = this;
    return $$4`
      <tile-list-compact-header
        class="header"
        .currentWidth=${currentWidth}
        .sortParam=${sortParam}
        .mobileBreakpoint=${mobileBreakpoint}
      >
      </tile-list-compact-header>
    `;
  }
  get tileTemplate() {
    return $$4`
      ${this.tileDisplayMode === "list-detail" ? this.tile : this.linkTileTemplate}
    `;
  }
  get linkTileTemplate() {
    var _a, _b;
    return $$4`
      <a
        href="${this.baseNavigationUrl}/details/${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}"
        title=${l$8((_b = this.model) === null || _b === void 0 ? void 0 : _b.title)}
      >
        ${this.tile}
      </a>
    `;
  }
  handleResize(entry) {
    this.currentWidth = entry.contentRect.width;
    this.currentHeight = entry.contentRect.height;
  }
  disconnectedCallback() {
    this.stopResizeObservation(this.resizeObserver);
  }
  stopResizeObservation(observer) {
    observer === null || observer === void 0 ? void 0 : observer.removeObserver({
      handler: this,
      target: this.container
    });
  }
  startResizeObservation() {
    var _a;
    this.stopResizeObservation(this.resizeObserver);
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.addObserver({
      handler: this,
      target: this.container
    });
  }
  updated(props) {
    if (props.has("resizeObserver")) {
      const previousObserver = props.get("resizeObserver");
      this.stopResizeObservation(previousObserver);
      this.startResizeObservation();
    }
  }
  get tile() {
    const { model, baseNavigationUrl, currentWidth, currentHeight, sortParam, mobileBreakpoint } = this;
    if (!model)
      return w$4;
    switch (this.tileDisplayMode) {
      case "grid":
        switch (model.mediatype) {
          case "collection":
            return $$4`<collection-tile
              .model=${model}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            >
            </collection-tile>`;
          case "account":
            return $$4`<account-tile
              .model=${model}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            ></account-tile>`;
          default:
            return $$4`<item-tile
              .model=${model}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
            ></item-tile>`;
        }
      case "list-compact":
        return $$4`<tile-list-compact
          .model=${model}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list-compact>`;
      case "list-detail":
        return $$4`<tile-list
          .model=${model}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list>`;
      default:
        return w$4;
    }
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: String })
], TileDispatcher.prototype, "tileDisplayMode", void 0);
__decorate([
  e$f({ type: Object })
], TileDispatcher.prototype, "model", void 0);
__decorate([
  e$f({ type: String })
], TileDispatcher.prototype, "baseNavigationUrl", void 0);
__decorate([
  e$f({ type: Number })
], TileDispatcher.prototype, "currentWidth", void 0);
__decorate([
  e$f({ type: Number })
], TileDispatcher.prototype, "currentHeight", void 0);
__decorate([
  e$f({ type: Object })
], TileDispatcher.prototype, "resizeObserver", void 0);
__decorate([
  e$f({ type: Object })
], TileDispatcher.prototype, "collectionNameCache", void 0);
__decorate([
  e$f({ type: Object })
], TileDispatcher.prototype, "sortParam", void 0);
__decorate([
  i$d("#container")
], TileDispatcher.prototype, "container", void 0);
__decorate([
  e$f({ type: Number })
], TileDispatcher.prototype, "mobileBreakpoint", void 0);
__decorate([
  e$f({ type: String })
], TileDispatcher.prototype, "baseImageUrl", void 0);
TileDispatcher = __decorate([
  n$g("tile-dispatcher")
], TileDispatcher);
let CollectionBrowserLoadingTile = class CollectionBrowserLoadingTile2 extends s$e {
  render() {
    return $$4` <div id="container"></div> `;
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
CollectionBrowserLoadingTile = __decorate([
  n$g("collection-browser-loading-tile")
], CollectionBrowserLoadingTile);
var SortField;
(function(SortField2) {
  SortField2["relevance"] = "relevance";
  SortField2["views"] = "views";
  SortField2["title"] = "title";
  SortField2["datearchived"] = "datearchived";
  SortField2["date"] = "date";
  SortField2["datereviewed"] = "datereviewed";
  SortField2["dateadded"] = "dateadded";
  SortField2["creator"] = "creator";
})(SortField || (SortField = {}));
const SortFieldDisplayName = {
  relevance: "Relevance",
  views: "Views",
  title: "Title",
  datearchived: "Date Archived",
  date: "Date Published",
  datereviewed: "Date Reviewed",
  dateadded: "Date Added",
  creator: "Creator"
};
const SortFieldToMetadataField = {
  relevance: null,
  views: "week",
  title: "titleSorter",
  datearchived: "publicdate",
  date: "date",
  datereviewed: "reviewdate",
  dateadded: "addeddate",
  creator: "creatorSorter"
};
const MetadataFieldToSortField = {
  titleSorter: SortField.title,
  date: SortField.date,
  publicdate: SortField.datearchived,
  reviewdate: SortField.datereviewed,
  addeddate: SortField.dateadded,
  creatorSorter: SortField.creator,
  week: SortField.views
};
const defaultSelectedFacets = {
  subject: {},
  mediatype: {},
  language: {},
  creator: {},
  collection: {},
  year: {}
};
let AlphaBar = class AlphaBar2 extends s$e {
  constructor() {
    super(...arguments);
    this.selectedLetter = null;
    this.alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  }
  get selectedUppercaseLetter() {
    var _a;
    return (_a = this.selectedLetter) === null || _a === void 0 ? void 0 : _a.toUpperCase();
  }
  render() {
    return $$4`
      <div id="container">
        <ul>
          ${this.alphabet.map((letter) => $$4`
                <li
                  class=${letter === this.selectedUppercaseLetter ? "selected" : ""}
                >
                  <a
                    href="#"
                    @click=${(e2) => {
      e2.preventDefault();
      this.letterClicked(letter);
    }}
                  >
                    ${letter}
                  </a>
                </li>
              `)}
        </ul>
      </div>
    `;
  }
  letterClicked(letter) {
    if (letter === this.selectedUppercaseLetter) {
      this.selectedLetter = null;
    } else {
      this.selectedLetter = letter;
    }
    this.dispatchEvent(new CustomEvent("letterChanged", {
      detail: { selectedLetter: this.selectedUppercaseLetter }
    }));
  }
};
AlphaBar.styles = r$9`
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
  `;
__decorate([
  e$f({ type: String })
], AlphaBar.prototype, "selectedLetter", void 0);
AlphaBar = __decorate([
  n$g("alpha-bar")
], AlphaBar);
const sortIcon = y$1`
<svg viewBox="0 0 100 55" xmlns="http://www.w3.org/2000/svg"><path d="m50 0 50 55h-100z"/></svg>
`;
const tileIcon = y$1`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m64 54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46zm36-54v46h-28v-46zm36 0v46h-28v-46zm-72 0v46h-28v-46z"/></svg>
`;
const listIcon = y$1`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fill-rule="nonzero"><path d="m97.8975061 6h-65.7343743c-.6409315 0-1.1612995-.29021372-1.5611039-.87064117-.3998043-.58042745-.6004844-1.3048369-.60204-2.17322835 0-.81214848.20068-1.50731158.60204-2.08548931.4013601-.57817773.921728-.86839145 1.5611039-.87064117h65.7343743c.5600372 0 1.0508477.29021372 1.4724313.87064117s.6315976 1.27559055.6300505 2.08548931c0 .86839145-.2100226 1.5928009-.6300505 2.17322835-.420028.58042745-.9108384.87064117-1.4724313.87064117z"/><path d="m97.8975061 61h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 19h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 74h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 32h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 87h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 45h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m97.8975061 100h-65.7343743c-.6409315 0-1.1612995-.2902137-1.5611039-.8706412-.3998043-.5804274-.6004844-1.3048369-.60204-2.1732283 0-.8121485.20068-1.5073116.60204-2.0854893.4013601-.5781778.921728-.8683915 1.5611039-.8706412h65.7343743c.5600372 0 1.0508477.2902137 1.4724313.8706412.4215836.5804274.6315976 1.2755905.6300505 2.0854893 0 .8683914-.2100226 1.5928009-.6300505 2.1732283-.420028.5804275-.9108384.8706412-1.4724313.8706412z"/><path d="m0 0h25v25h-25z"/><path d="m0 55h25v25h-25z"/></g></svg>
`;
const compactIcon = y$1`
<svg viewBox="0 0 100 100" xmlns = "http://www.w3.org/2000/svg" > <path d="m96.9964435 6h-93.90621462c-.91561615 0-1.65899868-.29021372-2.23014758-.87064117-.57114891-.58042745-.85783455-1.3048369-.86005692-2.17322835 0-.81214848.28668564-1.50731158.86005692-2.08548931.57337127-.57817773 1.3167538-.86839145 2.23014758-.87064117h93.90621462c.800053 0 1.5012105.29021372 2.1034726.87064117.602262.58042745.9022819 1.27559055.9000718 2.08548931 0 .86839145-.3000321 1.5928009-.9000718 2.17322835-.6000398.58042745-1.3011973.87064117-2.1034726.87064117zm-93.90621462 9.6666667h93.90621462c.800053 0 1.5012105.2861891 2.1034726.8585673.602262.5723782.9022819 1.2579009.9000718 2.0565682 0 .8563487-.3000321 1.5851326-.9000718 2.1863516-.6000398.6012189-1.3011973.9007192-2.1034726.8985129h-93.90621462c-.91561615 0-1.65899868-.2995125-2.23014758-.8985129-.57114891-.5990005-.85783455-1.3277843-.86005692-2.1863516 0-.8008858.28668564-1.4864086.86005692-2.0565682.57337127-.5701597 1.3167538-.8563488 2.23014758-.8585673zm0 15.6700431h93.90621462c.800053 0 1.5012105.303883 2.1034726.9116489.602262.6077659.9022819 1.2886888.9000718 2.0427687-.0022346.7540799-.3022545 1.4496342-.9000718 2.0866629-.5978174.6370287-1.2989749.955543-2.1034726.955543h-93.90621462c-.85783454 0-1.58788286-.3038829-2.19014494-.9116488s-.90228193-1.3179516-.90007182-2.1305571c.00223463-.8126055.30225448-1.5081599.90007182-2.0866629.59781734-.5785031 1.32786566-.8688802 2.19014494-.8711312zm0 15.6632902h93.90621462c.800053 0 1.5012105.2861892 2.1034726.8585675.602262.5723783.9022819 1.2290603.9000718 1.9700462 0 .7986674-.3144775 1.5274514-.943408 2.186352-.6289306.6589006-1.3156427.9872417-2.0601364.9850343h-93.90621462c-.85783454 0-1.58788286-.3139318-2.19014494-.9417731-.60226208-.6278414-.90228193-1.3699365-.90007182-2.2262854 0-.7986674.2866979-1.4697699.86006918-2.0133074.57337127-.5435376 1.3167538-.8153063 2.23014758-.8153063zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116593.602262.6077647.9022819 1.3472117.9000718 2.218341 0 .7540783-.3000321 1.4203685-.9000718 1.9988703-.6000398.5785019-1.3011973.8688784-2.1034726.8711294h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514902-.85783455-1.2324117-.86005692-2.0427645 0-.8688784.28668564-1.6083253.86005692-2.218341.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116593zm0 15.6666666h93.90621462c.800053 0 1.5012105.3038948 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688784-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.275745-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.9138979 2.23014758-.9116594zm0 15.6666667h93.90621462c.800053 0 1.5012105.3038947 2.1034726.9116594.602262.6077646.9022819 1.3472116.9000718 2.2183409 0 .7540784-.3000321 1.4203685-.9000718 1.9988704-.6000398.5785019-1.3011973.8688783-2.1034726.8711293h-93.90621462c-.91561615 0-1.65899868-.2757451-2.23014758-.8272352-.57114891-.5514901-.85783455-1.2324116-.86005692-2.0427645 0-.8688783.28668564-1.6083253.86005692-2.2183409.57337127-.6100156 1.3167538-.913898 2.23014758-.9116594z" /> </svg>
`;
let SortFilterBar = class SortFilterBar2 extends s$e {
  constructor() {
    super(...arguments);
    this.sortDirection = null;
    this.selectedSort = SortField.relevance;
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = null;
    this.showRelevance = true;
    this.alphaSelectorVisible = null;
    this.dateSortSelectorVisible = false;
    this.desktopSelectorBarWidth = 0;
    this.selectorBarContainerWidth = 0;
    this.hoveringOverDateSortOptions = false;
    this.boundDateSelectorEscapeListener = (e2) => {
      if (e2.key === "Escape") {
        this.dateSortSelectorVisible = false;
      }
    };
  }
  render() {
    return $$4`
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

        ${this.dateSortSelectorVisible && !this.mobileSelectorVisible ? this.dateSortSelector : w$4}
        ${this.alphaBarTemplate}

        <div id="bottom-shadow"></div>
      </div>
    `;
  }
  updated(changed) {
    if (changed.has("displayMode")) {
      this.displayModeChanged();
    }
    if (changed.has("selectedSort") && this.sortDirection === null) {
      this.sortDirection = "desc";
    }
    if (changed.has("selectedTitleFilter") && this.selectedTitleFilter) {
      this.alphaSelectorVisible = "title";
    }
    if (changed.has("selectedCreatorFilter") && this.selectedCreatorFilter) {
      this.alphaSelectorVisible = "creator";
    }
    if (changed.has("dateSortSelectorVisible")) {
      this.setupEscapeListeners();
    }
    if (changed.has("resizeObserver")) {
      const oldObserver = changed.get("resizeObserver");
      if (oldObserver)
        this.disconnectResizeObserver(oldObserver);
      this.setupResizeObserver();
    }
  }
  setupEscapeListeners() {
    if (this.dateSortSelectorVisible) {
      document.addEventListener("keydown", this.boundDateSelectorEscapeListener);
    } else {
      document.removeEventListener("keydown", this.boundDateSelectorEscapeListener);
    }
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.disconnectResizeObserver(this.resizeObserver);
    }
  }
  disconnectResizeObserver(resizeObserver) {
    resizeObserver.removeObserver({
      target: this.sortSelectorContainer,
      handler: this
    });
    resizeObserver.removeObserver({
      target: this.desktopSortSelector,
      handler: this
    });
  }
  setupResizeObserver() {
    if (!this.resizeObserver)
      return;
    this.resizeObserver.addObserver({
      target: this.sortSelectorContainer,
      handler: this
    });
    this.resizeObserver.addObserver({
      target: this.desktopSortSelector,
      handler: this
    });
  }
  get mobileSelectorVisible() {
    return this.selectorBarContainerWidth - 10 < this.desktopSelectorBarWidth;
  }
  get alphaBarTemplate() {
    if (!["title", "creator"].includes(this.selectedSort))
      return w$4;
    if (this.alphaSelectorVisible === null) {
      if (this.selectedSort === "creator")
        return this.creatorSelectorBar;
      if (this.selectedSort === "title")
        return this.titleSelectorBar;
    } else {
      return this.alphaSelectorVisible === "creator" ? this.creatorSelectorBar : this.titleSelectorBar;
    }
    return w$4;
  }
  handleResize(entry) {
    if (entry.target === this.desktopSortSelector) {
      this.desktopSelectorBarWidth = entry.contentRect.width;
    } else if (entry.target === this.sortSelectorContainer) {
      this.selectorBarContainerWidth = entry.contentRect.width;
    }
  }
  get sortDirectionSelectorTemplate() {
    return $$4`
      <div id="sort-direction-selector">
        <button
          id="sort-ascending-btn"
          class="sort-button ${this.sortDirection === "asc" ? "selected" : ""}"
          ?disabled=${this.selectedSort === "relevance"}
          @click=${() => {
      this.setSortDirections("asc");
    }}
        >
          ${sortIcon}
        </button>
        <button
          id="sort-descending-btn"
          class="sort-button ${this.sortDirection === "desc" ? "selected" : ""}"
          ?disabled=${this.selectedSort === "relevance"}
          @click=${() => {
      this.setSortDirections("desc");
    }}
        >
          ${sortIcon}
        </button>
      </div>
    `;
  }
  get desktopSortSelectorTemplate() {
    return $$4`
      <ul
        id="desktop-sort-selector"
        class=${this.mobileSelectorVisible ? "hidden" : "visible"}
      >
        <li id="sort-by-text">Sort By</li>
        <li>
          ${this.showRelevance ? this.getSortDisplayOption(SortField.relevance) : w$4}
        </li>
        <li>${this.getSortDisplayOption(SortField.views)}</li>
        <li>
          ${this.getSortDisplayOption(SortField.title, {
      clickEvent: () => {
        this.alphaSelectorVisible = "title";
        this.selectedCreatorFilter = null;
        this.dateSortSelectorVisible = false;
        this.setSelectedSort(SortField.title);
        this.emitCreatorLetterChangedEvent();
      }
    })}
        </li>
        <li>
          ${this.getSortDisplayOption(SortField.date, {
      clickEvent: () => {
        if (!this.dateOptionSelected)
          this.setSelectedSort(SortField.date);
        this.dateSortSelectorVisible = !this.dateSortSelectorVisible;
        this.alphaSelectorVisible = null;
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = null;
        this.emitTitleLetterChangedEvent();
        this.emitCreatorLetterChangedEvent();
      },
      displayName: $$4`${this.dateSortField}`,
      isSelected: () => this.dateOptionSelected
    })}
        </li>
        <li>
          ${this.getSortDisplayOption(SortField.creator, {
      clickEvent: () => {
        this.alphaSelectorVisible = "creator";
        this.selectedTitleFilter = null;
        this.dateSortSelectorVisible = false;
        this.setSelectedSort(SortField.creator);
        this.emitTitleLetterChangedEvent();
      }
    })}
        </li>
      </ul>
    `;
  }
  getSortDisplayOption(sortField, options) {
    var _a, _b;
    const isSelected = (_a = options === null || options === void 0 ? void 0 : options.isSelected) !== null && _a !== void 0 ? _a : () => this.selectedSort === sortField;
    const displayName = (_b = options === null || options === void 0 ? void 0 : options.displayName) !== null && _b !== void 0 ? _b : SortFieldDisplayName[sortField];
    return $$4`
      <a
        href="#"
        @click=${(e2) => {
      e2.preventDefault();
      if (options === null || options === void 0 ? void 0 : options.clickEvent) {
        options.clickEvent(e2);
      } else {
        this.alphaSelectorVisible = null;
        this.dateSortSelectorVisible = false;
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = null;
        this.setSelectedSort(sortField);
        this.emitTitleLetterChangedEvent();
        this.emitCreatorLetterChangedEvent();
      }
    }}
        class=${isSelected() ? "selected" : ""}
      >
        ${displayName}
      </a>
    `;
  }
  get mobileSortSelectorTemplate() {
    return $$4`
      <select
        id="mobile-sort-selector"
        @change=${this.mobileSortChanged}
        class=${this.mobileSelectorVisible ? "visible" : "hidden"}
      >
        ${Object.keys(SortField).map((field) => $$4`
            <option value="${field}" ?selected=${this.selectedSort === field}>
              ${SortFieldDisplayName[field]}
            </option>
          `)}
      </select>
    `;
  }
  mobileSortChanged(e2) {
    const target = e2.target;
    this.setSelectedSort(target.value);
  }
  get displayOptionTemplate() {
    return $$4`
      <ul>
        <li>
          <button
            id="grid-button"
            @click=${() => {
      this.displayMode = "grid";
    }}
            class=${this.displayMode === "grid" ? "active" : ""}
          >
            ${tileIcon}
          </button>
        </li>
        <li>
          <button
            id="grid-button"
            @click=${() => {
      this.displayMode = "list-detail";
    }}
            class=${this.displayMode === "list-detail" ? "active" : ""}
          >
            ${listIcon}
          </button>
        </li>
        <li>
          <button
            id="list-button"
            @click=${() => {
      this.displayMode = "list-compact";
    }}
            class=${this.displayMode === "list-compact" ? "active" : ""}
          >
            ${compactIcon}
          </button>
        </li>
      </ul>
    `;
  }
  get dateSortSelector() {
    return $$4`
      <div
        id="date-sort-selector-backdrop"
        @keyup=${() => {
      this.dateSortSelectorVisible = false;
    }}
        @click=${() => {
      this.dateSortSelectorVisible = false;
    }}
      ></div>
      <div id="date-sort-selector">
        <ul>
          <li>${this.getDateSortButton(SortField.datearchived)}</li>
          <li>${this.getDateSortButton(SortField.date)}</li>
          <li>${this.getDateSortButton(SortField.datereviewed)}</li>
          <li>${this.getDateSortButton(SortField.dateadded)}</li>
        </ul>
      </div>
    `;
  }
  getDateSortButton(sortField) {
    return $$4`
      <button
        @click=${() => {
      this.selectDateSort(sortField);
    }}
        class=${this.selectedSort === sortField ? "selected" : ""}
      >
        ${SortFieldDisplayName[sortField]}
      </button>
    `;
  }
  selectDateSort(sortField) {
    this.dateSortSelectorVisible = false;
    this.setSelectedSort(sortField);
  }
  setSortDirections(sortDirection) {
    this.sortDirection = sortDirection;
    this.emitSortChangedEvent();
  }
  setSelectedSort(sort) {
    this.selectedSort = sort;
    this.emitSortChangedEvent();
  }
  get dateOptionSelected() {
    const dateSortFields = [
      SortField.datearchived,
      SortField.date,
      SortField.datereviewed,
      SortField.dateadded
    ];
    return dateSortFields.includes(this.selectedSort);
  }
  get dateSortField() {
    var _a;
    const defaultSort = SortFieldDisplayName[SortField.date];
    const name = this.dateOptionSelected ? (_a = SortFieldDisplayName[this.selectedSort]) !== null && _a !== void 0 ? _a : defaultSort : defaultSort;
    return name;
  }
  get titleSelectorBar() {
    return $$4` <alpha-bar
      .selectedLetter=${this.selectedTitleFilter}
      @letterChanged=${this.titleLetterChanged}
    ></alpha-bar>`;
  }
  get creatorSelectorBar() {
    return $$4` <alpha-bar
      .selectedLetter=${this.selectedCreatorFilter}
      @letterChanged=${this.creatorLetterChanged}
    ></alpha-bar>`;
  }
  titleLetterChanged(e2) {
    var _a;
    this.selectedTitleFilter = (_a = e2.detail.selectedLetter) !== null && _a !== void 0 ? _a : null;
    this.emitTitleLetterChangedEvent();
  }
  creatorLetterChanged(e2) {
    var _a;
    this.selectedCreatorFilter = (_a = e2.detail.selectedLetter) !== null && _a !== void 0 ? _a : null;
    this.emitCreatorLetterChangedEvent();
  }
  emitTitleLetterChangedEvent() {
    const event = new CustomEvent("titleLetterChanged", {
      detail: { selectedLetter: this.selectedTitleFilter }
    });
    this.dispatchEvent(event);
  }
  emitCreatorLetterChangedEvent() {
    const event = new CustomEvent("creatorLetterChanged", {
      detail: { selectedLetter: this.selectedCreatorFilter }
    });
    this.dispatchEvent(event);
  }
  displayModeChanged() {
    const event = new CustomEvent("displayModeChanged", {
      detail: { displayMode: this.displayMode }
    });
    this.dispatchEvent(event);
  }
  emitSortChangedEvent() {
    const event = new CustomEvent("sortChanged", {
      detail: {
        selectedSort: this.selectedSort,
        sortDirection: this.sortDirection
      }
    });
    this.dispatchEvent(event);
  }
};
SortFilterBar.styles = r$9`
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
  `;
__decorate([
  e$f({ type: String })
], SortFilterBar.prototype, "displayMode", void 0);
__decorate([
  e$f({ type: String })
], SortFilterBar.prototype, "sortDirection", void 0);
__decorate([
  e$f({ type: String })
], SortFilterBar.prototype, "selectedSort", void 0);
__decorate([
  e$f({ type: String })
], SortFilterBar.prototype, "selectedTitleFilter", void 0);
__decorate([
  e$f({ type: String })
], SortFilterBar.prototype, "selectedCreatorFilter", void 0);
__decorate([
  e$f({ type: Boolean })
], SortFilterBar.prototype, "showRelevance", void 0);
__decorate([
  e$f({ type: Object })
], SortFilterBar.prototype, "resizeObserver", void 0);
__decorate([
  t$b()
], SortFilterBar.prototype, "alphaSelectorVisible", void 0);
__decorate([
  t$b()
], SortFilterBar.prototype, "dateSortSelectorVisible", void 0);
__decorate([
  t$b()
], SortFilterBar.prototype, "desktopSelectorBarWidth", void 0);
__decorate([
  t$b()
], SortFilterBar.prototype, "selectorBarContainerWidth", void 0);
__decorate([
  t$b()
], SortFilterBar.prototype, "hoveringOverDateSortOptions", void 0);
__decorate([
  i$d("#desktop-sort-selector")
], SortFilterBar.prototype, "desktopSortSelector", void 0);
__decorate([
  i$d("#sort-selector-container")
], SortFilterBar.prototype, "sortSelectorContainer", void 0);
SortFilterBar = __decorate([
  n$g("sort-filter-bar")
], SortFilterBar);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 }, e$6 = (t3) => (...e2) => ({ _$litDirective$: t3, values: e2 });
class i$5 {
  constructor(t3) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t3, e2, i2) {
    this._$Ct = t3, this._$AM = e2, this._$Ci = i2;
  }
  _$AS(t3, e2) {
    return this.update(t3, e2);
  }
  update(t3, e2) {
    return this.render(...e2);
  }
}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { H: i$4 } = R$1, r$3 = (o2) => o2.strings === void 0, e$5 = () => document.createComment(""), u$4 = (o2, t3, n2) => {
  var v2;
  const l2 = o2._$AA.parentNode, d2 = t3 === void 0 ? o2._$AB : t3._$AA;
  if (n2 === void 0) {
    const t4 = l2.insertBefore(e$5(), d2), v3 = l2.insertBefore(e$5(), d2);
    n2 = new i$4(t4, v3, o2, o2.options);
  } else {
    const i2 = n2._$AB.nextSibling, t4 = n2._$AM, r2 = t4 !== o2;
    if (r2) {
      let i3;
      (v2 = n2._$AQ) === null || v2 === void 0 || v2.call(n2, o2), n2._$AM = o2, n2._$AP !== void 0 && (i3 = o2._$AU) !== t4._$AU && n2._$AP(i3);
    }
    if (i2 !== d2 || r2) {
      let o3 = n2._$AA;
      for (; o3 !== i2; ) {
        const i3 = o3.nextSibling;
        l2.insertBefore(o3, d2), o3 = i3;
      }
    }
  }
  return n2;
}, c$3 = (o2, i2, t3 = o2) => (o2._$AI(i2, t3), o2), f$2 = {}, s$6 = (o2, i2 = f$2) => o2._$AH = i2, a$3 = (o2) => o2._$AH, m$2 = (o2) => {
  var i2;
  (i2 = o2._$AP) === null || i2 === void 0 || i2.call(o2, false, true);
  let t3 = o2._$AA;
  const n2 = o2._$AB.nextSibling;
  for (; t3 !== n2; ) {
    const o3 = t3.nextSibling;
    t3.remove(), t3 = o3;
  }
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const u$3 = (e2, s2, t3) => {
  const r2 = /* @__PURE__ */ new Map();
  for (let l2 = s2; l2 <= t3; l2++)
    r2.set(e2[l2], l2);
  return r2;
}, c$2 = e$6(class extends i$5 {
  constructor(e2) {
    if (super(e2), e2.type !== t$5.CHILD)
      throw Error("repeat() can only be used in text expressions");
  }
  dt(e2, s2, t3) {
    let r2;
    t3 === void 0 ? t3 = s2 : s2 !== void 0 && (r2 = s2);
    const l2 = [], o2 = [];
    let i2 = 0;
    for (const s3 of e2)
      l2[i2] = r2 ? r2(s3, i2) : i2, o2[i2] = t3(s3, i2), i2++;
    return { values: o2, keys: l2 };
  }
  render(e2, s2, t3) {
    return this.dt(e2, s2, t3).values;
  }
  update(s2, [t3, r2, c2]) {
    var d2;
    const a2 = a$3(s2), { values: p2, keys: v2 } = this.dt(t3, r2, c2);
    if (!Array.isArray(a2))
      return this.ut = v2, p2;
    const h2 = (d2 = this.ut) !== null && d2 !== void 0 ? d2 : this.ut = [], m2 = [];
    let y2, x2, j = 0, k2 = a2.length - 1, w2 = 0, A2 = p2.length - 1;
    for (; j <= k2 && w2 <= A2; )
      if (a2[j] === null)
        j++;
      else if (a2[k2] === null)
        k2--;
      else if (h2[j] === v2[w2])
        m2[w2] = c$3(a2[j], p2[w2]), j++, w2++;
      else if (h2[k2] === v2[A2])
        m2[A2] = c$3(a2[k2], p2[A2]), k2--, A2--;
      else if (h2[j] === v2[A2])
        m2[A2] = c$3(a2[j], p2[A2]), u$4(s2, m2[A2 + 1], a2[j]), j++, A2--;
      else if (h2[k2] === v2[w2])
        m2[w2] = c$3(a2[k2], p2[w2]), u$4(s2, a2[j], a2[k2]), k2--, w2++;
      else if (y2 === void 0 && (y2 = u$3(v2, w2, A2), x2 = u$3(h2, j, k2)), y2.has(h2[j]))
        if (y2.has(h2[k2])) {
          const e2 = x2.get(v2[w2]), t4 = e2 !== void 0 ? a2[e2] : null;
          if (t4 === null) {
            const e3 = u$4(s2, a2[j]);
            c$3(e3, p2[w2]), m2[w2] = e3;
          } else
            m2[w2] = c$3(t4, p2[w2]), u$4(s2, a2[j], t4), a2[e2] = null;
          w2++;
        } else
          m$2(a2[k2]), k2--;
      else
        m$2(a2[j]), j++;
    for (; w2 <= A2; ) {
      const e2 = u$4(s2, m2[A2 + 1]);
      c$3(e2, p2[w2]), m2[w2++] = e2;
    }
    for (; j <= k2; ) {
      const e2 = a2[j++];
      e2 !== null && m$2(e2);
    }
    return this.ut = v2, s$6(s2, m2), b$4;
  }
});
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$4 = window.ShadowRoot && (window.ShadyCSS === void 0 || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, e$4 = Symbol(), n$7 = /* @__PURE__ */ new Map();
class s$5 {
  constructor(t3, n2) {
    if (this._$cssResult$ = true, n2 !== e$4)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t3;
  }
  get styleSheet() {
    let e2 = n$7.get(this.cssText);
    return t$4 && e2 === void 0 && (n$7.set(this.cssText, e2 = new CSSStyleSheet()), e2.replaceSync(this.cssText)), e2;
  }
  toString() {
    return this.cssText;
  }
}
const o$5 = (t3) => new s$5(typeof t3 == "string" ? t3 : t3 + "", e$4), i$3 = (e2, n2) => {
  t$4 ? e2.adoptedStyleSheets = n2.map((t3) => t3 instanceof CSSStyleSheet ? t3 : t3.styleSheet) : n2.forEach((t3) => {
    const n3 = document.createElement("style"), s2 = window.litNonce;
    s2 !== void 0 && n3.setAttribute("nonce", s2), n3.textContent = t3.cssText, e2.appendChild(n3);
  });
}, S$3 = t$4 ? (t3) => t3 : (t3) => t3 instanceof CSSStyleSheet ? ((t4) => {
  let e2 = "";
  for (const n2 of t4.cssRules)
    e2 += n2.cssText;
  return o$5(e2);
})(t3) : t3;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s$4;
const e$3 = window.trustedTypes, r$2 = e$3 ? e$3.emptyScript : "", h$2 = window.reactiveElementPolyfillSupport, o$4 = { toAttribute(t3, i2) {
  switch (i2) {
    case Boolean:
      t3 = t3 ? r$2 : null;
      break;
    case Object:
    case Array:
      t3 = t3 == null ? t3 : JSON.stringify(t3);
  }
  return t3;
}, fromAttribute(t3, i2) {
  let s2 = t3;
  switch (i2) {
    case Boolean:
      s2 = t3 !== null;
      break;
    case Number:
      s2 = t3 === null ? null : Number(t3);
      break;
    case Object:
    case Array:
      try {
        s2 = JSON.parse(t3);
      } catch (t4) {
        s2 = null;
      }
  }
  return s2;
} }, n$6 = (t3, i2) => i2 !== t3 && (i2 == i2 || t3 == t3), l$5 = { attribute: true, type: String, converter: o$4, reflect: false, hasChanged: n$6 };
class a$2 extends HTMLElement {
  constructor() {
    super(), this._$Et = /* @__PURE__ */ new Map(), this.isUpdatePending = false, this.hasUpdated = false, this._$Ei = null, this.o();
  }
  static addInitializer(t3) {
    var i2;
    (i2 = this.l) !== null && i2 !== void 0 || (this.l = []), this.l.push(t3);
  }
  static get observedAttributes() {
    this.finalize();
    const t3 = [];
    return this.elementProperties.forEach((i2, s2) => {
      const e2 = this._$Eh(s2, i2);
      e2 !== void 0 && (this._$Eu.set(e2, s2), t3.push(e2));
    }), t3;
  }
  static createProperty(t3, i2 = l$5) {
    if (i2.state && (i2.attribute = false), this.finalize(), this.elementProperties.set(t3, i2), !i2.noAccessor && !this.prototype.hasOwnProperty(t3)) {
      const s2 = typeof t3 == "symbol" ? Symbol() : "__" + t3, e2 = this.getPropertyDescriptor(t3, s2, i2);
      e2 !== void 0 && Object.defineProperty(this.prototype, t3, e2);
    }
  }
  static getPropertyDescriptor(t3, i2, s2) {
    return { get() {
      return this[i2];
    }, set(e2) {
      const r2 = this[t3];
      this[i2] = e2, this.requestUpdate(t3, r2, s2);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t3) {
    return this.elementProperties.get(t3) || l$5;
  }
  static finalize() {
    if (this.hasOwnProperty("finalized"))
      return false;
    this.finalized = true;
    const t3 = Object.getPrototypeOf(this);
    if (t3.finalize(), this.elementProperties = new Map(t3.elementProperties), this._$Eu = /* @__PURE__ */ new Map(), this.hasOwnProperty("properties")) {
      const t4 = this.properties, i2 = [...Object.getOwnPropertyNames(t4), ...Object.getOwnPropertySymbols(t4)];
      for (const s2 of i2)
        this.createProperty(s2, t4[s2]);
    }
    return this.elementStyles = this.finalizeStyles(this.styles), true;
  }
  static finalizeStyles(i2) {
    const s2 = [];
    if (Array.isArray(i2)) {
      const e2 = new Set(i2.flat(1 / 0).reverse());
      for (const i3 of e2)
        s2.unshift(S$3(i3));
    } else
      i2 !== void 0 && s2.push(S$3(i2));
    return s2;
  }
  static _$Eh(t3, i2) {
    const s2 = i2.attribute;
    return s2 === false ? void 0 : typeof s2 == "string" ? s2 : typeof t3 == "string" ? t3.toLowerCase() : void 0;
  }
  o() {
    var t3;
    this._$Ep = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$Em(), this.requestUpdate(), (t3 = this.constructor.l) === null || t3 === void 0 || t3.forEach((t4) => t4(this));
  }
  addController(t3) {
    var i2, s2;
    ((i2 = this._$Eg) !== null && i2 !== void 0 ? i2 : this._$Eg = []).push(t3), this.renderRoot !== void 0 && this.isConnected && ((s2 = t3.hostConnected) === null || s2 === void 0 || s2.call(t3));
  }
  removeController(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.splice(this._$Eg.indexOf(t3) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t3, i2) => {
      this.hasOwnProperty(i2) && (this._$Et.set(i2, this[i2]), delete this[i2]);
    });
  }
  createRenderRoot() {
    var t3;
    const s2 = (t3 = this.shadowRoot) !== null && t3 !== void 0 ? t3 : this.attachShadow(this.constructor.shadowRootOptions);
    return i$3(s2, this.constructor.elementStyles), s2;
  }
  connectedCallback() {
    var t3;
    this.renderRoot === void 0 && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(true), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostConnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  enableUpdating(t3) {
  }
  disconnectedCallback() {
    var t3;
    (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
      var i2;
      return (i2 = t4.hostDisconnected) === null || i2 === void 0 ? void 0 : i2.call(t4);
    });
  }
  attributeChangedCallback(t3, i2, s2) {
    this._$AK(t3, s2);
  }
  _$ES(t3, i2, s2 = l$5) {
    var e2, r2;
    const h2 = this.constructor._$Eh(t3, s2);
    if (h2 !== void 0 && s2.reflect === true) {
      const n2 = ((r2 = (e2 = s2.converter) === null || e2 === void 0 ? void 0 : e2.toAttribute) !== null && r2 !== void 0 ? r2 : o$4.toAttribute)(i2, s2.type);
      this._$Ei = t3, n2 == null ? this.removeAttribute(h2) : this.setAttribute(h2, n2), this._$Ei = null;
    }
  }
  _$AK(t3, i2) {
    var s2, e2, r2;
    const h2 = this.constructor, n2 = h2._$Eu.get(t3);
    if (n2 !== void 0 && this._$Ei !== n2) {
      const t4 = h2.getPropertyOptions(n2), l2 = t4.converter, a2 = (r2 = (e2 = (s2 = l2) === null || s2 === void 0 ? void 0 : s2.fromAttribute) !== null && e2 !== void 0 ? e2 : typeof l2 == "function" ? l2 : null) !== null && r2 !== void 0 ? r2 : o$4.fromAttribute;
      this._$Ei = n2, this[n2] = a2(i2, t4.type), this._$Ei = null;
    }
  }
  requestUpdate(t3, i2, s2) {
    let e2 = true;
    t3 !== void 0 && (((s2 = s2 || this.constructor.getPropertyOptions(t3)).hasChanged || n$6)(this[t3], i2) ? (this._$AL.has(t3) || this._$AL.set(t3, i2), s2.reflect === true && this._$Ei !== t3 && (this._$EC === void 0 && (this._$EC = /* @__PURE__ */ new Map()), this._$EC.set(t3, s2))) : e2 = false), !this.isUpdatePending && e2 && (this._$Ep = this._$E_());
  }
  async _$E_() {
    this.isUpdatePending = true;
    try {
      await this._$Ep;
    } catch (t4) {
      Promise.reject(t4);
    }
    const t3 = this.scheduleUpdate();
    return t3 != null && await t3, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t3;
    if (!this.isUpdatePending)
      return;
    this.hasUpdated, this._$Et && (this._$Et.forEach((t4, i3) => this[i3] = t4), this._$Et = void 0);
    let i2 = false;
    const s2 = this._$AL;
    try {
      i2 = this.shouldUpdate(s2), i2 ? (this.willUpdate(s2), (t3 = this._$Eg) === null || t3 === void 0 || t3.forEach((t4) => {
        var i3;
        return (i3 = t4.hostUpdate) === null || i3 === void 0 ? void 0 : i3.call(t4);
      }), this.update(s2)) : this._$EU();
    } catch (t4) {
      throw i2 = false, this._$EU(), t4;
    }
    i2 && this._$AE(s2);
  }
  willUpdate(t3) {
  }
  _$AE(t3) {
    var i2;
    (i2 = this._$Eg) === null || i2 === void 0 || i2.forEach((t4) => {
      var i3;
      return (i3 = t4.hostUpdated) === null || i3 === void 0 ? void 0 : i3.call(t4);
    }), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t3)), this.updated(t3);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t3) {
    return true;
  }
  update(t3) {
    this._$EC !== void 0 && (this._$EC.forEach((t4, i2) => this._$ES(i2, this[i2], t4)), this._$EC = void 0), this._$EU();
  }
  updated(t3) {
  }
  firstUpdated(t3) {
  }
}
a$2.finalized = true, a$2.elementProperties = /* @__PURE__ */ new Map(), a$2.elementStyles = [], a$2.shadowRootOptions = { mode: "open" }, h$2 == null || h$2({ ReactiveElement: a$2 }), ((s$4 = globalThis.reactiveElementVersions) !== null && s$4 !== void 0 ? s$4 : globalThis.reactiveElementVersions = []).push("1.3.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$5 = (n2) => (e2) => typeof e2 == "function" ? ((n3, e3) => (window.customElements.define(n3, e3), e3))(n2, e2) : ((n3, e3) => {
  const { kind: t3, elements: i2 } = e3;
  return { kind: t3, elements: i2, finisher(e4) {
    window.customElements.define(n3, e4);
  } };
})(n2, e2);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i2, e2) => e2.kind === "method" && e2.descriptor && !("value" in e2.descriptor) ? __spreadProps(__spreadValues({}, e2), { finisher(n2) {
  n2.createProperty(e2.key, i2);
} }) : { kind: "field", key: Symbol(), placement: "own", descriptor: {}, originalKey: e2.key, initializer() {
  typeof e2.initializer == "function" && (this[e2.key] = e2.initializer.call(this));
}, finisher(n2) {
  n2.createProperty(e2.key, i2);
} };
function e$2(e2) {
  return (n2, t3) => t3 !== void 0 ? ((i2, e3, n3) => {
    e3.constructor.createProperty(n3, i2);
  })(e2, n2, t3) : i$2(e2, n2);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function t$3(t3) {
  return e$2(__spreadProps(__spreadValues({}, t3), { state: true }));
}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n$4;
((n$4 = window.HTMLSlotElement) === null || n$4 === void 0 ? void 0 : n$4.prototype.assignedElements) != null ? (o2, n2) => o2.assignedElements(n2) : (o2, n2) => o2.assignedNodes(n2).filter((o3) => o3.nodeType === Node.ELEMENT_NODE);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const l$4 = e$6(class extends i$5 {
  constructor(r2) {
    if (super(r2), r2.type !== t$5.PROPERTY && r2.type !== t$5.ATTRIBUTE && r2.type !== t$5.BOOLEAN_ATTRIBUTE)
      throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r$3(r2))
      throw Error("`live` bindings can only contain a single expression");
  }
  render(r2) {
    return r2;
  }
  update(i2, [t3]) {
    if (t3 === b$4 || t3 === w$4)
      return t3;
    const o2 = i2.element, l2 = i2.name;
    if (i2.type === t$5.PROPERTY) {
      if (t3 === o2[l2])
        return b$4;
    } else if (i2.type === t$5.BOOLEAN_ATTRIBUTE) {
      if (!!t3 === o2.hasAttribute(l2))
        return b$4;
    } else if (i2.type === t$5.ATTRIBUTE && o2.getAttribute(l2) === t3 + "")
      return b$4;
    return s$6(i2), t3;
  }
});
var SECONDS_A_MINUTE = 60;
var SECONDS_A_HOUR = SECONDS_A_MINUTE * 60;
var SECONDS_A_DAY = SECONDS_A_HOUR * 24;
var SECONDS_A_WEEK = SECONDS_A_DAY * 7;
var MILLISECONDS_A_SECOND = 1e3;
var MILLISECONDS_A_MINUTE = SECONDS_A_MINUTE * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_HOUR = SECONDS_A_HOUR * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_DAY = SECONDS_A_DAY * MILLISECONDS_A_SECOND;
var MILLISECONDS_A_WEEK = SECONDS_A_WEEK * MILLISECONDS_A_SECOND;
var MS = "millisecond";
var S$2 = "second";
var MIN = "minute";
var H$2 = "hour";
var D = "day";
var W = "week";
var M$2 = "month";
var Q = "quarter";
var Y = "year";
var DATE = "date";
var FORMAT_DEFAULT = "YYYY-MM-DDTHH:mm:ssZ";
var INVALID_DATE_STRING = "Invalid Date";
var REGEX_PARSE = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
var REGEX_FORMAT = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
var en = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
};
var padStart = function padStart2(string, length, pad) {
  var s2 = String(string);
  if (!s2 || s2.length >= length)
    return string;
  return "" + Array(length + 1 - s2.length).join(pad) + string;
};
var padZoneStr = function padZoneStr2(instance) {
  var negMinutes = -instance.utcOffset();
  var minutes = Math.abs(negMinutes);
  var hourOffset = Math.floor(minutes / 60);
  var minuteOffset = minutes % 60;
  return (negMinutes <= 0 ? "+" : "-") + padStart(hourOffset, 2, "0") + ":" + padStart(minuteOffset, 2, "0");
};
var monthDiff = function monthDiff2(a2, b2) {
  if (a2.date() < b2.date())
    return -monthDiff2(b2, a2);
  var wholeMonthDiff = (b2.year() - a2.year()) * 12 + (b2.month() - a2.month());
  var anchor = a2.clone().add(wholeMonthDiff, M$2);
  var c2 = b2 - anchor < 0;
  var anchor2 = a2.clone().add(wholeMonthDiff + (c2 ? -1 : 1), M$2);
  return +(-(wholeMonthDiff + (b2 - anchor) / (c2 ? anchor - anchor2 : anchor2 - anchor)) || 0);
};
var absFloor = function absFloor2(n2) {
  return n2 < 0 ? Math.ceil(n2) || 0 : Math.floor(n2);
};
var prettyUnit = function prettyUnit2(u3) {
  var special = {
    M: M$2,
    y: Y,
    w: W,
    d: D,
    D: DATE,
    h: H$2,
    m: MIN,
    s: S$2,
    ms: MS,
    Q
  };
  return special[u3] || String(u3 || "").toLowerCase().replace(/s$/, "");
};
var isUndefined = function isUndefined2(s2) {
  return s2 === void 0;
};
var U = {
  s: padStart,
  z: padZoneStr,
  m: monthDiff,
  a: absFloor,
  p: prettyUnit,
  u: isUndefined
};
var L$2 = "en";
var Ls = {};
Ls[L$2] = en;
var isDayjs = function isDayjs2(d2) {
  return d2 instanceof Dayjs;
};
var parseLocale = function parseLocale2(preset, object, isLocal) {
  var l2;
  if (!preset)
    return L$2;
  if (typeof preset === "string") {
    if (Ls[preset]) {
      l2 = preset;
    }
    if (object) {
      Ls[preset] = object;
      l2 = preset;
    }
  } else {
    var name = preset.name;
    Ls[name] = preset;
    l2 = name;
  }
  if (!isLocal && l2)
    L$2 = l2;
  return l2 || !isLocal && L$2;
};
var dayjs = function dayjs2(date, c2) {
  if (isDayjs(date)) {
    return date.clone();
  }
  var cfg = typeof c2 === "object" ? c2 : {};
  cfg.date = date;
  cfg.args = arguments;
  return new Dayjs(cfg);
};
var wrapper = function wrapper2(date, instance) {
  return dayjs(date, {
    locale: instance.$L,
    utc: instance.$u,
    x: instance.$x,
    $offset: instance.$offset
  });
};
var Utils = U;
Utils.l = parseLocale;
Utils.i = isDayjs;
Utils.w = wrapper;
var parseDate = function parseDate2(cfg) {
  var date = cfg.date, utc = cfg.utc;
  if (date === null)
    return new Date(NaN);
  if (Utils.u(date))
    return new Date();
  if (date instanceof Date)
    return new Date(date);
  if (typeof date === "string" && !/Z$/i.test(date)) {
    var d2 = date.match(REGEX_PARSE);
    if (d2) {
      var m2 = d2[2] - 1 || 0;
      var ms = (d2[7] || "0").substring(0, 3);
      if (utc) {
        return new Date(Date.UTC(d2[1], m2, d2[3] || 1, d2[4] || 0, d2[5] || 0, d2[6] || 0, ms));
      }
      return new Date(d2[1], m2, d2[3] || 1, d2[4] || 0, d2[5] || 0, d2[6] || 0, ms);
    }
  }
  return new Date(date);
};
var Dayjs = /* @__PURE__ */ function() {
  function Dayjs2(cfg) {
    this.$L = parseLocale(cfg.locale, null, true);
    this.parse(cfg);
  }
  var _proto = Dayjs2.prototype;
  _proto.parse = function parse(cfg) {
    this.$d = parseDate(cfg);
    this.$x = cfg.x || {};
    this.init();
  };
  _proto.init = function init2() {
    var $d = this.$d;
    this.$y = $d.getFullYear();
    this.$M = $d.getMonth();
    this.$D = $d.getDate();
    this.$W = $d.getDay();
    this.$H = $d.getHours();
    this.$m = $d.getMinutes();
    this.$s = $d.getSeconds();
    this.$ms = $d.getMilliseconds();
  };
  _proto.$utils = function $utils() {
    return Utils;
  };
  _proto.isValid = function isValid() {
    return !(this.$d.toString() === INVALID_DATE_STRING);
  };
  _proto.isSame = function isSame(that, units) {
    var other = dayjs(that);
    return this.startOf(units) <= other && other <= this.endOf(units);
  };
  _proto.isAfter = function isAfter(that, units) {
    return dayjs(that) < this.startOf(units);
  };
  _proto.isBefore = function isBefore(that, units) {
    return this.endOf(units) < dayjs(that);
  };
  _proto.$g = function $g(input, get2, set2) {
    if (Utils.u(input))
      return this[get2];
    return this.set(set2, input);
  };
  _proto.unix = function unix() {
    return Math.floor(this.valueOf() / 1e3);
  };
  _proto.valueOf = function valueOf() {
    return this.$d.getTime();
  };
  _proto.startOf = function startOf(units, _startOf) {
    var _this = this;
    var isStartOf = !Utils.u(_startOf) ? _startOf : true;
    var unit = Utils.p(units);
    var instanceFactory = function instanceFactory2(d2, m2) {
      var ins = Utils.w(_this.$u ? Date.UTC(_this.$y, m2, d2) : new Date(_this.$y, m2, d2), _this);
      return isStartOf ? ins : ins.endOf(D);
    };
    var instanceFactorySet = function instanceFactorySet2(method, slice) {
      var argumentStart = [0, 0, 0, 0];
      var argumentEnd = [23, 59, 59, 999];
      return Utils.w(_this.toDate()[method].apply(_this.toDate("s"), (isStartOf ? argumentStart : argumentEnd).slice(slice)), _this);
    };
    var $W = this.$W, $M = this.$M, $D = this.$D;
    var utcPad = "set" + (this.$u ? "UTC" : "");
    switch (unit) {
      case Y:
        return isStartOf ? instanceFactory(1, 0) : instanceFactory(31, 11);
      case M$2:
        return isStartOf ? instanceFactory(1, $M) : instanceFactory(0, $M + 1);
      case W: {
        var weekStart = this.$locale().weekStart || 0;
        var gap = ($W < weekStart ? $W + 7 : $W) - weekStart;
        return instanceFactory(isStartOf ? $D - gap : $D + (6 - gap), $M);
      }
      case D:
      case DATE:
        return instanceFactorySet(utcPad + "Hours", 0);
      case H$2:
        return instanceFactorySet(utcPad + "Minutes", 1);
      case MIN:
        return instanceFactorySet(utcPad + "Seconds", 2);
      case S$2:
        return instanceFactorySet(utcPad + "Milliseconds", 3);
      default:
        return this.clone();
    }
  };
  _proto.endOf = function endOf(arg) {
    return this.startOf(arg, false);
  };
  _proto.$set = function $set(units, _int) {
    var _C$D$C$DATE$C$M$C$Y$C;
    var unit = Utils.p(units);
    var utcPad = "set" + (this.$u ? "UTC" : "");
    var name = (_C$D$C$DATE$C$M$C$Y$C = {}, _C$D$C$DATE$C$M$C$Y$C[D] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[DATE] = utcPad + "Date", _C$D$C$DATE$C$M$C$Y$C[M$2] = utcPad + "Month", _C$D$C$DATE$C$M$C$Y$C[Y] = utcPad + "FullYear", _C$D$C$DATE$C$M$C$Y$C[H$2] = utcPad + "Hours", _C$D$C$DATE$C$M$C$Y$C[MIN] = utcPad + "Minutes", _C$D$C$DATE$C$M$C$Y$C[S$2] = utcPad + "Seconds", _C$D$C$DATE$C$M$C$Y$C[MS] = utcPad + "Milliseconds", _C$D$C$DATE$C$M$C$Y$C)[unit];
    var arg = unit === D ? this.$D + (_int - this.$W) : _int;
    if (unit === M$2 || unit === Y) {
      var date = this.clone().set(DATE, 1);
      date.$d[name](arg);
      date.init();
      this.$d = date.set(DATE, Math.min(this.$D, date.daysInMonth())).$d;
    } else if (name)
      this.$d[name](arg);
    this.init();
    return this;
  };
  _proto.set = function set2(string, _int2) {
    return this.clone().$set(string, _int2);
  };
  _proto.get = function get2(unit) {
    return this[Utils.p(unit)]();
  };
  _proto.add = function add(number, units) {
    var _this2 = this, _C$MIN$C$H$C$S$unit;
    number = Number(number);
    var unit = Utils.p(units);
    var instanceFactorySet = function instanceFactorySet2(n2) {
      var d2 = dayjs(_this2);
      return Utils.w(d2.date(d2.date() + Math.round(n2 * number)), _this2);
    };
    if (unit === M$2) {
      return this.set(M$2, this.$M + number);
    }
    if (unit === Y) {
      return this.set(Y, this.$y + number);
    }
    if (unit === D) {
      return instanceFactorySet(1);
    }
    if (unit === W) {
      return instanceFactorySet(7);
    }
    var step = (_C$MIN$C$H$C$S$unit = {}, _C$MIN$C$H$C$S$unit[MIN] = MILLISECONDS_A_MINUTE, _C$MIN$C$H$C$S$unit[H$2] = MILLISECONDS_A_HOUR, _C$MIN$C$H$C$S$unit[S$2] = MILLISECONDS_A_SECOND, _C$MIN$C$H$C$S$unit)[unit] || 1;
    var nextTimeStamp = this.$d.getTime() + number * step;
    return Utils.w(nextTimeStamp, this);
  };
  _proto.subtract = function subtract(number, string) {
    return this.add(number * -1, string);
  };
  _proto.format = function format(formatStr) {
    var _this3 = this;
    var locale2 = this.$locale();
    if (!this.isValid())
      return locale2.invalidDate || INVALID_DATE_STRING;
    var str2 = formatStr || FORMAT_DEFAULT;
    var zoneStr = Utils.z(this);
    var $H = this.$H, $m = this.$m, $M = this.$M;
    var weekdays = locale2.weekdays, months = locale2.months, meridiem = locale2.meridiem;
    var getShort = function getShort2(arr, index, full, length) {
      return arr && (arr[index] || arr(_this3, str2)) || full[index].substr(0, length);
    };
    var get$H = function get$H2(num) {
      return Utils.s($H % 12 || 12, num, "0");
    };
    var meridiemFunc = meridiem || function(hour, minute, isLowercase) {
      var m2 = hour < 12 ? "AM" : "PM";
      return isLowercase ? m2.toLowerCase() : m2;
    };
    var matches = {
      YY: String(this.$y).slice(-2),
      YYYY: this.$y,
      M: $M + 1,
      MM: Utils.s($M + 1, 2, "0"),
      MMM: getShort(locale2.monthsShort, $M, months, 3),
      MMMM: getShort(months, $M),
      D: this.$D,
      DD: Utils.s(this.$D, 2, "0"),
      d: String(this.$W),
      dd: getShort(locale2.weekdaysMin, this.$W, weekdays, 2),
      ddd: getShort(locale2.weekdaysShort, this.$W, weekdays, 3),
      dddd: weekdays[this.$W],
      H: String($H),
      HH: Utils.s($H, 2, "0"),
      h: get$H(1),
      hh: get$H(2),
      a: meridiemFunc($H, $m, true),
      A: meridiemFunc($H, $m, false),
      m: String($m),
      mm: Utils.s($m, 2, "0"),
      s: String(this.$s),
      ss: Utils.s(this.$s, 2, "0"),
      SSS: Utils.s(this.$ms, 3, "0"),
      Z: zoneStr
    };
    return str2.replace(REGEX_FORMAT, function(match, $1) {
      return $1 || matches[match] || zoneStr.replace(":", "");
    });
  };
  _proto.utcOffset = function utcOffset() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  };
  _proto.diff = function diff(input, units, _float) {
    var _C$Y$C$M$C$Q$C$W$C$D$;
    var unit = Utils.p(units);
    var that = dayjs(input);
    var zoneDelta = (that.utcOffset() - this.utcOffset()) * MILLISECONDS_A_MINUTE;
    var diff2 = this - that;
    var result = Utils.m(this, that);
    result = (_C$Y$C$M$C$Q$C$W$C$D$ = {}, _C$Y$C$M$C$Q$C$W$C$D$[Y] = result / 12, _C$Y$C$M$C$Q$C$W$C$D$[M$2] = result, _C$Y$C$M$C$Q$C$W$C$D$[Q] = result / 3, _C$Y$C$M$C$Q$C$W$C$D$[W] = (diff2 - zoneDelta) / MILLISECONDS_A_WEEK, _C$Y$C$M$C$Q$C$W$C$D$[D] = (diff2 - zoneDelta) / MILLISECONDS_A_DAY, _C$Y$C$M$C$Q$C$W$C$D$[H$2] = diff2 / MILLISECONDS_A_HOUR, _C$Y$C$M$C$Q$C$W$C$D$[MIN] = diff2 / MILLISECONDS_A_MINUTE, _C$Y$C$M$C$Q$C$W$C$D$[S$2] = diff2 / MILLISECONDS_A_SECOND, _C$Y$C$M$C$Q$C$W$C$D$)[unit] || diff2;
    return _float ? result : Utils.a(result);
  };
  _proto.daysInMonth = function daysInMonth() {
    return this.endOf(M$2).$D;
  };
  _proto.$locale = function $locale() {
    return Ls[this.$L];
  };
  _proto.locale = function locale2(preset, object) {
    if (!preset)
      return this.$L;
    var that = this.clone();
    var nextLocaleName = parseLocale(preset, object, true);
    if (nextLocaleName)
      that.$L = nextLocaleName;
    return that;
  };
  _proto.clone = function clone2() {
    return Utils.w(this.$d, this);
  };
  _proto.toDate = function toDate() {
    return new Date(this.valueOf());
  };
  _proto.toJSON = function toJSON() {
    return this.isValid() ? this.toISOString() : null;
  };
  _proto.toISOString = function toISOString() {
    return this.$d.toISOString();
  };
  _proto.toString = function toString() {
    return this.$d.toUTCString();
  };
  return Dayjs2;
}();
var proto = Dayjs.prototype;
dayjs.prototype = proto;
[["$ms", MS], ["$s", S$2], ["$m", MIN], ["$H", H$2], ["$W", D], ["$M", M$2], ["$y", Y], ["$D", DATE]].forEach(function(g2) {
  proto[g2[1]] = function(input) {
    return this.$g(input, g2[0], g2[1]);
  };
});
dayjs.extend = function(plugin, option) {
  if (!plugin.$i) {
    plugin(option, Dayjs, dayjs);
    plugin.$i = true;
  }
  return dayjs;
};
dayjs.locale = parseLocale;
dayjs.isDayjs = isDayjs;
dayjs.unix = function(timestamp) {
  return dayjs(timestamp * 1e3);
};
dayjs.en = Ls[L$2];
dayjs.Ls = Ls;
dayjs.p = {};
var t$2 = function t2(format) {
  return format.replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function(_2, a2, b2) {
    return a2 || b2.slice(1);
  });
};
var englishFormats = {
  LTS: "h:mm:ss A",
  LT: "h:mm A",
  L: "MM/DD/YYYY",
  LL: "MMMM D, YYYY",
  LLL: "MMMM D, YYYY h:mm A",
  LLLL: "dddd, MMMM D, YYYY h:mm A"
};
var u$2 = function u2(formatStr, formats) {
  return formatStr.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function(_2, a2, b2) {
    var B = b2 && b2.toUpperCase();
    return a2 || formats[b2] || englishFormats[b2] || t$2(formats[B]);
  });
};
var formattingTokens = /(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g;
var match1 = /\d/;
var match2 = /\d\d/;
var match3 = /\d{3}/;
var match4 = /\d{4}/;
var match1to2 = /\d\d?/;
var matchSigned = /[+-]?\d+/;
var matchOffset = /[+-]\d\d:?(\d\d)?|Z/;
var matchWord = /\d*[^\s\d-_:/()]+/;
var locale = {};
var parseTwoDigitYear = function parseTwoDigitYear2(input) {
  input = +input;
  return input + (input > 68 ? 1900 : 2e3);
};
function offsetFromString(string) {
  if (!string)
    return 0;
  if (string === "Z")
    return 0;
  var parts = string.match(/([+-]|\d\d)/g);
  var minutes = +(parts[1] * 60) + (+parts[2] || 0);
  return minutes === 0 ? 0 : parts[0] === "+" ? -minutes : minutes;
}
var addInput = function addInput2(property) {
  return function(input) {
    this[property] = +input;
  };
};
var zoneExpressions = [matchOffset, function(input) {
  var zone = this.zone || (this.zone = {});
  zone.offset = offsetFromString(input);
}];
var getLocalePart = function getLocalePart2(name) {
  var part = locale[name];
  return part && (part.indexOf ? part : part.s.concat(part.f));
};
var meridiemMatch = function meridiemMatch2(input, isLowerCase) {
  var isAfternoon;
  var _locale = locale, meridiem = _locale.meridiem;
  if (!meridiem) {
    isAfternoon = input === (isLowerCase ? "pm" : "PM");
  } else {
    for (var i2 = 1; i2 <= 24; i2 += 1) {
      if (input.indexOf(meridiem(i2, 0, isLowerCase)) > -1) {
        isAfternoon = i2 > 12;
        break;
      }
    }
  }
  return isAfternoon;
};
var expressions = {
  A: [matchWord, function(input) {
    this.afternoon = meridiemMatch(input, false);
  }],
  a: [matchWord, function(input) {
    this.afternoon = meridiemMatch(input, true);
  }],
  S: [match1, function(input) {
    this.milliseconds = +input * 100;
  }],
  SS: [match2, function(input) {
    this.milliseconds = +input * 10;
  }],
  SSS: [match3, function(input) {
    this.milliseconds = +input;
  }],
  s: [match1to2, addInput("seconds")],
  ss: [match1to2, addInput("seconds")],
  m: [match1to2, addInput("minutes")],
  mm: [match1to2, addInput("minutes")],
  H: [match1to2, addInput("hours")],
  h: [match1to2, addInput("hours")],
  HH: [match1to2, addInput("hours")],
  hh: [match1to2, addInput("hours")],
  D: [match1to2, addInput("day")],
  DD: [match2, addInput("day")],
  Do: [matchWord, function(input) {
    var _locale2 = locale, ordinal = _locale2.ordinal;
    var _input$match = input.match(/\d+/);
    this.day = _input$match[0];
    if (!ordinal)
      return;
    for (var i2 = 1; i2 <= 31; i2 += 1) {
      if (ordinal(i2).replace(/\[|\]/g, "") === input) {
        this.day = i2;
      }
    }
  }],
  M: [match1to2, addInput("month")],
  MM: [match2, addInput("month")],
  MMM: [matchWord, function(input) {
    var months = getLocalePart("months");
    var monthsShort = getLocalePart("monthsShort");
    var matchIndex = (monthsShort || months.map(function(_2) {
      return _2.substr(0, 3);
    })).indexOf(input) + 1;
    if (matchIndex < 1) {
      throw new Error();
    }
    this.month = matchIndex % 12 || matchIndex;
  }],
  MMMM: [matchWord, function(input) {
    var months = getLocalePart("months");
    var matchIndex = months.indexOf(input) + 1;
    if (matchIndex < 1) {
      throw new Error();
    }
    this.month = matchIndex % 12 || matchIndex;
  }],
  Y: [matchSigned, addInput("year")],
  YY: [match2, function(input) {
    this.year = parseTwoDigitYear(input);
  }],
  YYYY: [match4, addInput("year")],
  Z: zoneExpressions,
  ZZ: zoneExpressions
};
function correctHours(time) {
  var afternoon = time.afternoon;
  if (afternoon !== void 0) {
    var hours = time.hours;
    if (afternoon) {
      if (hours < 12) {
        time.hours += 12;
      }
    } else if (hours === 12) {
      time.hours = 0;
    }
    delete time.afternoon;
  }
}
function makeParser(format) {
  format = u$2(format, locale && locale.formats);
  var array = format.match(formattingTokens);
  var length = array.length;
  for (var i2 = 0; i2 < length; i2 += 1) {
    var token = array[i2];
    var parseTo = expressions[token];
    var regex = parseTo && parseTo[0];
    var parser = parseTo && parseTo[1];
    if (parser) {
      array[i2] = {
        regex,
        parser
      };
    } else {
      array[i2] = token.replace(/^\[|\]$/g, "");
    }
  }
  return function(input) {
    var time = {};
    for (var _i = 0, start = 0; _i < length; _i += 1) {
      var _token = array[_i];
      if (typeof _token === "string") {
        start += _token.length;
      } else {
        var _regex = _token.regex, _parser = _token.parser;
        var part = input.substr(start);
        var match = _regex.exec(part);
        var value = match[0];
        _parser.call(time, value);
        input = input.replace(value, "");
      }
    }
    correctHours(time);
    return time;
  };
}
var parseFormattedInput = function parseFormattedInput2(input, format, utc) {
  try {
    if (["x", "X"].indexOf(format) > -1)
      return new Date((format === "X" ? 1e3 : 1) * input);
    var parser = makeParser(format);
    var _parser2 = parser(input), year = _parser2.year, month = _parser2.month, day = _parser2.day, hours = _parser2.hours, minutes = _parser2.minutes, seconds = _parser2.seconds, milliseconds = _parser2.milliseconds, zone = _parser2.zone;
    var now = new Date();
    var d2 = day || (!year && !month ? now.getDate() : 1);
    var y2 = year || now.getFullYear();
    var M2 = 0;
    if (!(year && !month)) {
      M2 = month > 0 ? month - 1 : now.getMonth();
    }
    var h2 = hours || 0;
    var m2 = minutes || 0;
    var s2 = seconds || 0;
    var ms = milliseconds || 0;
    if (zone) {
      return new Date(Date.UTC(y2, M2, d2, h2, m2, s2, ms + zone.offset * 60 * 1e3));
    }
    if (utc) {
      return new Date(Date.UTC(y2, M2, d2, h2, m2, s2, ms));
    }
    return new Date(y2, M2, d2, h2, m2, s2, ms);
  } catch (e2) {
    return new Date("");
  }
};
var customParseFormat = function(o2, C2, d2) {
  d2.p.customParseFormat = true;
  if (o2 && o2.parseTwoDigitYear) {
    parseTwoDigitYear = o2.parseTwoDigitYear;
  }
  var proto2 = C2.prototype;
  var oldParse = proto2.parse;
  proto2.parse = function(cfg) {
    var date = cfg.date, utc = cfg.utc, args = cfg.args;
    this.$u = utc;
    var format = args[1];
    if (typeof format === "string") {
      var isStrictWithoutLocale = args[2] === true;
      var isStrictWithLocale = args[3] === true;
      var isStrict = isStrictWithoutLocale || isStrictWithLocale;
      var pl = args[2];
      if (isStrictWithLocale) {
        pl = args[2];
      }
      locale = this.$locale();
      if (!isStrictWithoutLocale && pl) {
        locale = d2.Ls[pl];
      }
      this.$d = parseFormattedInput(date, format, utc);
      this.init();
      if (pl && pl !== true)
        this.$L = this.locale(pl).$L;
      if (isStrict && date != this.format(format)) {
        this.$d = new Date("");
      }
      locale = {};
    } else if (format instanceof Array) {
      var len = format.length;
      for (var i2 = 1; i2 <= len; i2 += 1) {
        args[1] = format[i2 - 1];
        var result = d2.apply(this, args);
        if (result.isValid()) {
          this.$d = result.$d;
          this.$L = result.$L;
          this.init();
          break;
        }
        if (i2 === len)
          this.$d = new Date("");
      }
    } else {
      oldParse.call(this, cfg);
    }
  };
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$1;
const i$1 = globalThis.trustedTypes, s$3 = i$1 ? i$1.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e$1 = `lit$${(Math.random() + "").slice(9)}$`, o$3 = "?" + e$1, n$3 = `<${o$3}>`, l$3 = document, h$1 = (t3 = "") => l$3.createComment(t3), r$1 = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function", d$1 = Array.isArray, u$1 = (t3) => {
  var i2;
  return d$1(t3) || typeof ((i2 = t3) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c$1 = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v$1 = /-->/g, a$1 = />/g, f$1 = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _$1 = /'/g, m$1 = /"/g, g$1 = /^(?:script|style|textarea)$/i, $$1 = (t3) => (i2, ...s2) => ({ _$litType$: t3, strings: i2, values: s2 }), p$1 = $$1(1), b$1 = Symbol.for("lit-noChange"), T$1 = Symbol.for("lit-nothing"), x$1 = /* @__PURE__ */ new WeakMap(), w$1 = (t3, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N$1(i2.insertBefore(h$1(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
}, A$1 = l$3.createTreeWalker(l$3, 129, null, false), C$1 = (t3, i2) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c$1;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t3[i3];
    let o3, u4, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u4 = d2.exec(s2), u4 !== null); )
      p2 = d2.lastIndex, d2 === c$1 ? u4[1] === "!--" ? d2 = v$1 : u4[1] !== void 0 ? d2 = a$1 : u4[2] !== void 0 ? (g$1.test(u4[2]) && (h2 = RegExp("</" + u4[2], "g")), d2 = f$1) : u4[3] !== void 0 && (d2 = f$1) : d2 === f$1 ? u4[0] === ">" ? (d2 = h2 != null ? h2 : c$1, $2 = -1) : u4[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u4[2].length, o3 = u4[1], d2 = u4[3] === void 0 ? f$1 : u4[3] === '"' ? m$1 : _$1) : d2 === m$1 || d2 === _$1 ? d2 = f$1 : d2 === v$1 || d2 === a$1 ? d2 = c$1 : (d2 = f$1, h2 = void 0);
    const y2 = d2 === f$1 && t3[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c$1 ? s2 + n$3 : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e$1 + y2) : s2 + e$1 + ($2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u3 = r2 + (t3[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$3 !== void 0 ? s$3.createHTML(u3) : u3, l2];
};
class P$1 {
  constructor({ strings: t3, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u3 = t3.length - 1, c2 = this.parts, [v2, a2] = C$1(t3, s2);
    if (this.el = P$1.createElement(v2, n2), A$1.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i2 = t4.firstChild;
      i2.remove(), t4.append(...i2.childNodes);
    }
    for (; (l2 = A$1.nextNode()) !== null && c2.length < u3; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e$1)) {
              const s3 = a2[d2++];
              if (t4.push(i2), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e$1), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t5, ctor: i3[1] === "." ? M$1 : i3[1] === "?" ? H$1 : i3[1] === "@" ? I$1 : S$1 });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t4)
            l2.removeAttribute(i2);
        }
        if (g$1.test(l2.tagName)) {
          const t4 = l2.textContent.split(e$1), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i$1 ? i$1.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t4[i2], h$1()), A$1.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t4[s3], h$1());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$3)
          c2.push({ type: 2, index: r2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e$1, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t4 += e$1.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i2) {
    const s2 = l$3.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function V$1(t3, i2, s2 = t3, e2) {
  var o2, n2, l2, h2;
  if (i2 === b$1)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u3 = r$1(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u3 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u3 === void 0 ? d2 = void 0 : (d2 = new u3(t3), d2._$AT(t3, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V$1(t3, d2._$AS(t3, i2.values), d2, e2)), i2;
}
class E$1 {
  constructor(t3, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t3 == null ? void 0 : t3.creationScope) !== null && i2 !== void 0 ? i2 : l$3).importNode(s2, true);
    A$1.currentNode = o2;
    let n2 = A$1.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N$1(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i3 = new L$1(n2, this, t3)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A$1.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t3[i2])), i2++;
  }
}
class N$1 {
  constructor(t3, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T$1, this._$AN = void 0, this._$AA = t3, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i2;
    return (i2 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t3.nodeType === 11 && (t3 = i2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i2 = this) {
    t3 = V$1(this, t3, i2), r$1(t3) ? t3 === T$1 || t3 == null || t3 === "" ? (this._$AH !== T$1 && this._$AR(), this._$AH = T$1) : t3 !== this._$AH && t3 !== b$1 && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : u$1(t3) ? this.M(t3) : this.$(t3);
  }
  A(t3, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i2);
  }
  S(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== T$1 && r$1(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(l$3.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i2;
    const { values: s2, _$litType$: e2 } = t3, o2 = typeof e2 == "number" ? this._$AC(t3) : (e2.el === void 0 && (e2.el = P$1.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new E$1(o2, this), i3 = t4.p(this.options);
      t4.m(s2), this.S(i3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i2 = x$1.get(t3.strings);
    return i2 === void 0 && x$1.set(t3.strings, i2 = new P$1(t3)), i2;
  }
  M(t3) {
    d$1(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t3)
      e2 === i2.length ? i2.push(s2 = new N$1(this.A(h$1()), this.A(h$1()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t3 && t3 !== this._$AB; ) {
      const i3 = t3.nextSibling;
      t3.remove(), t3 = i3;
    }
  }
  setConnected(t3) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t3, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t3));
  }
}
class S$1 {
  constructor(t3, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T$1, this._$AN = void 0, this.element = t3, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T$1;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t3 = V$1(this, t3, i2, 0), n2 = !r$1(t3) || t3 !== this._$AH && t3 !== b$1, n2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V$1(this, e3[s2 + l2], i2, l2), h2 === b$1 && (h2 = this._$AH[l2]), n2 || (n2 = !r$1(h2) || h2 !== this._$AH[l2]), h2 === T$1 ? t3 = T$1 : t3 !== T$1 && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t3);
  }
  k(t3) {
    t3 === T$1 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}
class M$1 extends S$1 {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t3) {
    this.element[this.name] = t3 === T$1 ? void 0 : t3;
  }
}
const k$1 = i$1 ? i$1.emptyScript : "";
class H$1 extends S$1 {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t3) {
    t3 && t3 !== T$1 ? this.element.setAttribute(this.name, k$1) : this.element.removeAttribute(this.name);
  }
}
class I$1 extends S$1 {
  constructor(t3, i2, s2, e2, o2) {
    super(t3, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t3, i2 = this) {
    var s2;
    if ((t3 = (s2 = V$1(this, t3, i2, 0)) !== null && s2 !== void 0 ? s2 : T$1) === b$1)
      return;
    const e2 = this._$AH, o2 = t3 === T$1 && e2 !== T$1 || t3.capture !== e2.capture || t3.once !== e2.once || t3.passive !== e2.passive, n2 = t3 !== T$1 && (e2 === T$1 || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class L$1 {
  constructor(t3, i2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    V$1(this, t3);
  }
}
const z$1 = window.litHtmlPolyfillSupport;
z$1 == null || z$1(P$1, N$1), ((t$1 = globalThis.litHtmlVersions) !== null && t$1 !== void 0 ? t$1 : globalThis.litHtmlVersions = []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l$2, o$2;
class s$2 extends a$7 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e2;
    const i2 = super.createRenderRoot();
    return (t3 = (e2 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t3) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = w$1(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b$1;
  }
}
s$2.finalized = true, s$2._$litElement$ = true, (l$2 = globalThis.litElementHydrateSupport) === null || l$2 === void 0 || l$2.call(globalThis, { LitElement: s$2 });
const n$2 = globalThis.litElementPolyfillSupport;
n$2 == null || n$2({ LitElement: s$2 });
((o$2 = globalThis.litElementVersions) !== null && o$2 !== void 0 ? o$2 : globalThis.litElementVersions = []).push("3.0.2");
const IAActivityIndicatorMode = Object.freeze({
  processing: "processing",
  complete: "complete"
});
class IAActivityIndicator extends s$2 {
  static get properties() {
    return {
      mode: { type: String }
    };
  }
  constructor() {
    super();
    this.mode = IAActivityIndicatorMode.processing;
  }
  render() {
    return p$1`
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
    `;
  }
  static get styles() {
    const checkmarkColorCss = r$7`var(--activityIndicatorCheckmarkColor, #31A481)`;
    const completedRingColorCss = r$7`var(--activityIndicatorCompletedRingColor, #31A481)`;
    const loadingRingColorCss = r$7`var(--activityIndicatorLoadingRingColor, #333333)`;
    const loadingDotColorCss = r$7`var(--activityIndicatorLoadingDotColor, #333333)`;
    return r$7`
      #completed-ring {
        fill: ${completedRingColorCss};
      }

      #check {
        fill: ${checkmarkColorCss};
      }

      #activity-ring {
        fill: ${loadingRingColorCss};
      }

      #activity-dots {
        fill: ${loadingDotColorCss};
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
    `;
  }
}
window.customElements.define("ia-activity-indicator", IAActivityIndicator);
dayjs.extend(customParseFormat);
const WIDTH = 180;
const HEIGHT = 40;
const SLIDER_WIDTH = 10;
const TOOLTIP_WIDTH = 125;
const TOOLTIP_HEIGHT = 30;
const DATE_FORMAT = "YYYY";
const MISSING_DATA = "no data";
const UPDATE_DEBOUNCE_DELAY_MS = 0;
const SLIDER_CORNER_SIZE = 4;
const sliderColor = r$9`var(--histogramDateRangeSliderColor, #4B65FE)`;
const selectedRangeColor = r$9`var(--histogramDateRangeSelectedRangeColor, #DBE0FF)`;
const barIncludedFill = r$9`var(--histogramDateRangeBarIncludedFill, #2C2C2C)`;
const activityIndicatorColor = r$9`var(--histogramDateRangeActivityIndicator, #2C2C2C)`;
const barExcludedFill = r$9`var(--histogramDateRangeBarExcludedFill, #CCCCCC)`;
const inputBorder = r$9`var(--histogramDateRangeInputBorder, 0.5px solid #2C2C2C)`;
const inputWidth = r$9`var(--histogramDateRangeInputWidth, 35px)`;
const inputFontSize = r$9`var(--histogramDateRangeInputFontSize, 1.2rem)`;
const inputFontFamily = r$9`var(--histogramDateRangeInputFontFamily, sans-serif)`;
const tooltipBackgroundColor = r$9`var(--histogramDateRangeTooltipBackgroundColor, #2C2C2C)`;
const tooltipTextColor = r$9`var(--histogramDateRangeTooltipTextColor, #FFFFFF)`;
const tooltipFontSize = r$9`var(--histogramDateRangeTooltipFontSize, 1.1rem)`;
const tooltipFontFamily = r$9`var(--histogramDateRangeTooltipFontFamily, sans-serif)`;
let HistogramDateRange = class HistogramDateRange2 extends s$e {
  constructor() {
    super(...arguments);
    this.width = WIDTH;
    this.height = HEIGHT;
    this.sliderWidth = SLIDER_WIDTH;
    this.tooltipWidth = TOOLTIP_WIDTH;
    this.tooltipHeight = TOOLTIP_HEIGHT;
    this.updateDelay = UPDATE_DEBOUNCE_DELAY_MS;
    this.dateFormat = DATE_FORMAT;
    this.missingDataMessage = MISSING_DATA;
    this.minDate = "";
    this.maxDate = "";
    this.disabled = false;
    this.bins = [];
    this._tooltipOffset = 0;
    this._tooltipVisible = false;
    this._isDragging = false;
    this._isLoading = false;
    this._minSelectedDate = "";
    this._maxSelectedDate = "";
    this._minDateMS = 0;
    this._maxDateMS = 0;
    this._dragOffset = 0;
    this._histWidth = 0;
    this._binWidth = 0;
    this._histData = [];
    this._previousDateRange = "";
    this.drag = (e2) => {
      e2.preventDefault();
      if (this.disabled) {
        return;
      }
      this.setDragOffset(e2);
      this._isDragging = true;
      this.addListeners();
      this.cancelPendingUpdateEvent();
    };
    this.drop = () => {
      if (this._isDragging) {
        this.removeListeners();
        this.beginEmitUpdateProcess();
      }
      this._isDragging = false;
    };
    this.move = (e2) => {
      const newX = e2.offsetX - this._dragOffset;
      const slider = this._currentSlider;
      if (slider.id === "slider-min") {
        this.minSelectedDate = this.translatePositionToDate(this.validMinSliderX(newX));
      } else {
        this.maxSelectedDate = this.translatePositionToDate(this.validMaxSliderX(newX));
      }
    };
  }
  disconnectedCallback() {
    this.removeListeners();
    super.disconnectedCallback();
  }
  updated(changedProps) {
    if (changedProps.has("bins") || changedProps.has("minDate") || changedProps.has("maxDate") || changedProps.has("minSelectedDate") || changedProps.has("maxSelectedDate")) {
      this.handleDataUpdate();
    }
  }
  handleDataUpdate() {
    if (!this.hasBinData) {
      return;
    }
    this._histWidth = this.width - this.sliderWidth * 2;
    this._minDateMS = this.getMSFromString(this.minDate);
    this._maxDateMS = this.getMSFromString(this.maxDate);
    this._binWidth = this._histWidth / this._numBins;
    this._previousDateRange = this.currentDateRangeString;
    this._histData = this.calculateHistData();
    this.minSelectedDate = this.minSelectedDate ? this.minSelectedDate : this.minDate;
    this.maxSelectedDate = this.maxSelectedDate ? this.maxSelectedDate : this.maxDate;
    this.requestUpdate();
  }
  calculateHistData() {
    const minValue = Math.min(...this.bins);
    const maxValue = Math.max(...this.bins);
    const valueRange = minValue === maxValue ? 1 : Math.log1p(maxValue);
    const valueScale = this.height / valueRange;
    const dateScale = this.dateRangeMS / this._numBins;
    return this.bins.map((v2, i2) => {
      return {
        value: v2,
        height: Math.floor(Math.log1p(v2) * valueScale),
        binStart: `${this.formatDate(i2 * dateScale + this._minDateMS)}`,
        binEnd: `${this.formatDate((i2 + 1) * dateScale + this._minDateMS)}`
      };
    });
  }
  get hasBinData() {
    return this._numBins > 0;
  }
  get _numBins() {
    if (!this.bins || !this.bins.length) {
      return 0;
    }
    return this.bins.length;
  }
  get histogramLeftEdgeX() {
    return this.sliderWidth;
  }
  get histogramRightEdgeX() {
    return this.width - this.sliderWidth;
  }
  get loading() {
    return this._isLoading;
  }
  set loading(value) {
    this.disabled = value;
    this._isLoading = value;
  }
  get minSelectedDate() {
    return this.formatDate(this.getMSFromString(this._minSelectedDate));
  }
  set minSelectedDate(rawDate) {
    if (!this._minSelectedDate) {
      this._minSelectedDate = rawDate;
      return;
    }
    const proposedDateMS = this.getMSFromString(rawDate);
    const isValidDate = !Number.isNaN(proposedDateMS);
    const isNotTooRecent = proposedDateMS <= this.getMSFromString(this.maxSelectedDate);
    if (isValidDate && isNotTooRecent) {
      this._minSelectedDate = this.formatDate(proposedDateMS);
    }
    this.requestUpdate();
  }
  get maxSelectedDate() {
    return this.formatDate(this.getMSFromString(this._maxSelectedDate));
  }
  set maxSelectedDate(rawDate) {
    if (!this._maxSelectedDate) {
      this._maxSelectedDate = rawDate;
      return;
    }
    const proposedDateMS = this.getMSFromString(rawDate);
    const isValidDate = !Number.isNaN(proposedDateMS);
    const isNotTooOld = proposedDateMS >= this.getMSFromString(this.minSelectedDate);
    if (isValidDate && isNotTooOld) {
      this._maxSelectedDate = this.formatDate(proposedDateMS);
    }
    this.requestUpdate();
  }
  get minSliderX() {
    const x2 = this.translateDateToPosition(this.minSelectedDate);
    return this.validMinSliderX(x2);
  }
  get maxSliderX() {
    const x2 = this.translateDateToPosition(this.maxSelectedDate);
    return this.validMaxSliderX(x2);
  }
  get dateRangeMS() {
    return this._maxDateMS - this._minDateMS;
  }
  showTooltip(e2) {
    if (this._isDragging || this.disabled) {
      return;
    }
    const target = e2.currentTarget;
    const x2 = target.x.baseVal.value + this.sliderWidth / 2;
    const dataset = target.dataset;
    const itemsText = `item${dataset.numItems !== "1" ? "s" : ""}`;
    const formattedNumItems = Number(dataset.numItems).toLocaleString();
    this._tooltipOffset = x2 + (this._binWidth - this.sliderWidth - this.tooltipWidth) / 2;
    this._tooltipContent = $$4`
      ${formattedNumItems} ${itemsText}<br />
      ${dataset.binStart} - ${dataset.binEnd}
    `;
    this._tooltipVisible = true;
  }
  hideTooltip() {
    this._tooltipContent = void 0;
    this._tooltipVisible = false;
  }
  validMinSliderX(newX) {
    const rightLimit = Math.min(this.translateDateToPosition(this.maxSelectedDate), this.histogramRightEdgeX);
    newX = this.clamp(newX, this.histogramLeftEdgeX, rightLimit);
    const isInvalid = Number.isNaN(newX) || rightLimit < this.histogramLeftEdgeX;
    return isInvalid ? this.histogramLeftEdgeX : newX;
  }
  validMaxSliderX(newX) {
    const leftLimit = Math.max(this.histogramLeftEdgeX, this.translateDateToPosition(this.minSelectedDate));
    newX = this.clamp(newX, leftLimit, this.histogramRightEdgeX);
    const isInvalid = Number.isNaN(newX) || leftLimit > this.histogramRightEdgeX;
    return isInvalid ? this.histogramRightEdgeX : newX;
  }
  addListeners() {
    window.addEventListener("pointermove", this.move);
    window.addEventListener("pointerup", this.drop);
    window.addEventListener("pointercancel", this.drop);
  }
  removeListeners() {
    window.removeEventListener("pointermove", this.move);
    window.removeEventListener("pointerup", this.drop);
    window.removeEventListener("pointercancel", this.drop);
  }
  beginEmitUpdateProcess() {
    this.cancelPendingUpdateEvent();
    this._emitUpdatedEventTimer = setTimeout(() => {
      if (this.currentDateRangeString === this._previousDateRange) {
        return;
      }
      this._previousDateRange = this.currentDateRangeString;
      const options = {
        detail: {
          minDate: this.minSelectedDate,
          maxDate: this.maxSelectedDate
        },
        bubbles: true,
        composed: true
      };
      this.dispatchEvent(new CustomEvent("histogramDateRangeUpdated", options));
    }, this.updateDelay);
  }
  cancelPendingUpdateEvent() {
    if (this._emitUpdatedEventTimer === void 0) {
      return;
    }
    clearTimeout(this._emitUpdatedEventTimer);
    this._emitUpdatedEventTimer = void 0;
  }
  setDragOffset(e2) {
    this._currentSlider = e2.currentTarget;
    const sliderX = this._currentSlider.id === "slider-min" ? this.minSliderX : this.maxSliderX;
    this._dragOffset = e2.offsetX - sliderX;
    if (this._dragOffset > this.sliderWidth || this._dragOffset < -this.sliderWidth) {
      this._dragOffset = 0;
    }
  }
  translatePositionToDate(x2) {
    const milliseconds = Math.ceil((x2 - this.sliderWidth) * this.dateRangeMS / this._histWidth);
    return this.formatDate(this._minDateMS + milliseconds);
  }
  translateDateToPosition(date) {
    const milliseconds = this.getMSFromString(date);
    return this.sliderWidth + (milliseconds - this._minDateMS) * this._histWidth / this.dateRangeMS;
  }
  clamp(x2, minValue, maxValue) {
    return Math.min(Math.max(x2, minValue), maxValue);
  }
  handleMinDateInput(e2) {
    const target = e2.currentTarget;
    this.minSelectedDate = target.value;
    this.beginEmitUpdateProcess();
  }
  handleMaxDateInput(e2) {
    const target = e2.currentTarget;
    this.maxSelectedDate = target.value;
    this.beginEmitUpdateProcess();
  }
  handleKeyUp(e2) {
    if (e2.key === "Enter") {
      const target = e2.currentTarget;
      target.blur();
      if (target.id === "date-min") {
        this.handleMinDateInput(e2);
      } else if (target.id === "date-max") {
        this.handleMaxDateInput(e2);
      }
    }
  }
  get currentDateRangeString() {
    return `${this.minSelectedDate}:${this.maxSelectedDate}`;
  }
  getMSFromString(date) {
    const stringified = typeof date === "string" ? date : String(date);
    const digitGroupCount = (stringified.split(/(\d+)/).length - 1) / 2;
    if (digitGroupCount === 1) {
      const dateObj = new Date(0, 0);
      dateObj.setFullYear(Number(stringified));
      return dateObj.getTime();
    }
    return dayjs(stringified, [this.dateFormat, DATE_FORMAT]).valueOf();
  }
  handleBarClick(e2) {
    const dataset = e2.currentTarget.dataset;
    const clickPosition = (this.getMSFromString(dataset.binStart) + this.getMSFromString(dataset.binEnd)) / 2;
    const distanceFromMinSlider = Math.abs(clickPosition - this.getMSFromString(this.minSelectedDate));
    const distanceFromMaxSlider = Math.abs(clickPosition - this.getMSFromString(this.maxSelectedDate));
    if (distanceFromMinSlider < distanceFromMaxSlider) {
      this.minSelectedDate = dataset.binStart;
    } else {
      this.maxSelectedDate = dataset.binEnd;
    }
    this.beginEmitUpdateProcess();
  }
  get minSliderTemplate() {
    const cs = SLIDER_CORNER_SIZE;
    const sliderShape = `
            M${this.minSliderX},0
            h-${this.sliderWidth - cs}
            q-${cs},0 -${cs},${cs}
            v${this.height - cs * 2}
            q0,${cs} ${cs},${cs}
            h${this.sliderWidth - cs}
          `;
    return this.generateSliderSVG(this.minSliderX, "slider-min", sliderShape);
  }
  get maxSliderTemplate() {
    const cs = SLIDER_CORNER_SIZE;
    const sliderShape = `
            M${this.maxSliderX},0
            h${this.sliderWidth - cs}
            q${cs},0 ${cs},${cs}
            v${this.height - cs * 2}
            q0,${cs} -${cs},${cs}
            h-${this.sliderWidth - cs}
          `;
    return this.generateSliderSVG(this.maxSliderX, "slider-max", sliderShape);
  }
  generateSliderSVG(sliderPositionX, id, sliderShape) {
    const k2 = id === "slider-min" ? 1 : -1;
    return y$1`
    <svg
      id="${id}"
      class="
      ${this.disabled ? "" : "draggable"}
      ${this._isDragging ? "dragging" : ""}"
      @pointerdown="${this.drag}"
    >
      <path d="${sliderShape} z" fill="${sliderColor}" />
      <rect
        x="${sliderPositionX - this.sliderWidth * k2 + this.sliderWidth * 0.4 * k2}"
        y="${this.height / 3}"
        width="1"
        height="${this.height / 3}"
        fill="white"
      />
      <rect
        x="${sliderPositionX - this.sliderWidth * k2 + this.sliderWidth * 0.6 * k2}"
        y="${this.height / 3}"
        width="1"
        height="${this.height / 3}"
        fill="white"
      />
    </svg>
    `;
  }
  get selectedRangeTemplate() {
    return y$1`
      <rect
        x="${this.minSliderX}"
        y="0"
        width="${this.maxSliderX - this.minSliderX}"
        height="${this.height}"
        fill="${selectedRangeColor}"
      />`;
  }
  get histogramTemplate() {
    const xScale = this._histWidth / this._numBins;
    const barWidth = xScale - 1;
    let x2 = this.sliderWidth;
    return this._histData.map((data) => {
      const bar = y$1`
        <rect
          class="bar"
          style='stroke-dasharray: 0 ${barWidth} ${data.height} ${barWidth} 0 ${data.height};'
          x="${x2}"
          y="${this.height - data.height}"
          width="${barWidth}"
          height="${data.height}"
          @pointerenter="${this.showTooltip}"
          @pointerleave="${this.hideTooltip}"
          @click="${this.handleBarClick}"
          fill="${x2 + barWidth >= this.minSliderX && x2 <= this.maxSliderX ? barIncludedFill : barExcludedFill}"
          data-num-items="${data.value}"
          data-bin-start="${data.binStart}"
          data-bin-end="${data.binEnd}"
        />`;
      x2 += xScale;
      return bar;
    });
  }
  formatDate(dateMS) {
    if (Number.isNaN(dateMS)) {
      return "";
    }
    const date = dayjs(dateMS);
    if (date.year() < 1e3) {
      return String(date.year());
    }
    return date.format(this.dateFormat);
  }
  get minInputTemplate() {
    return $$4`
      <input
        id="date-min"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMinDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${l$4(this.minSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `;
  }
  get maxInputTemplate() {
    return $$4`
      <input
        id="date-max"
        placeholder="${this.dateFormat}"
        type="text"
        @focus="${this.cancelPendingUpdateEvent}"
        @blur="${this.handleMaxDateInput}"
        @keyup="${this.handleKeyUp}"
        .value="${l$4(this.maxSelectedDate)}"
        ?disabled="${this.disabled}"
      />
    `;
  }
  get tooltipTemplate() {
    return $$4`
      <style>
        #tooltip {
          width: ${this.tooltipWidth}px;
          height: ${this.tooltipHeight}px;
          top: ${-9 - this.tooltipHeight}px;
          left: ${this._tooltipOffset}px;
          display: ${this._tooltipVisible ? "block" : "none"};
        }
        #tooltip:after {
          left: ${this.tooltipWidth / 2}px;
        }
      </style>
      <div id="tooltip">${this._tooltipContent}</div>
    `;
  }
  get noDataTemplate() {
    return $$4`
      <div class="missing-data-message">${this.missingDataMessage}</div>
    `;
  }
  get activityIndicatorTemplate() {
    if (!this.loading) {
      return w$4;
    }
    return $$4`
      <ia-activity-indicator mode="processing"> </ia-activity-indicator>
    `;
  }
  render() {
    if (!this.hasBinData) {
      return this.noDataTemplate;
    }
    return $$4`
      <div
        id="container"
        class="
          noselect
          ${this._isDragging ? "dragging" : ""}
        "
        style="width: ${this.width}px"
      >
        ${this.activityIndicatorTemplate} ${this.tooltipTemplate}
        <div
          class="inner-container
          ${this.disabled ? "disabled" : ""}"
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
    `;
  }
};
HistogramDateRange.styles = r$9`
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
      --activityIndicatorLoadingRingColor: ${activityIndicatorColor};
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
      background: ${tooltipBackgroundColor};
      color: ${tooltipTextColor};
      text-align: center;
      border-radius: 3px;
      padding: 2px;
      font-size: ${tooltipFontSize};
      font-family: ${tooltipFontFamily};
      touch-action: none;
      pointer-events: none;
    }
    #tooltip:after {
      content: '';
      position: absolute;
      margin-left: -5px;
      top: 100%;
      /* arrow */
      border: 5px solid ${tooltipTextColor};
      border-color: ${tooltipBackgroundColor} transparent transparent
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
      width: ${inputWidth};
      margin: 0 3px;
      border: ${inputBorder};
      border-radius: 2px !important;
      text-align: center;
      font-size: ${inputFontSize};
      font-family: ${inputFontFamily};
    }
  `;
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "width", void 0);
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "height", void 0);
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "sliderWidth", void 0);
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "tooltipWidth", void 0);
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "tooltipHeight", void 0);
__decorate([
  e$2({ type: Number })
], HistogramDateRange.prototype, "updateDelay", void 0);
__decorate([
  e$2({ type: String })
], HistogramDateRange.prototype, "dateFormat", void 0);
__decorate([
  e$2({ type: String })
], HistogramDateRange.prototype, "missingDataMessage", void 0);
__decorate([
  e$2({ type: String })
], HistogramDateRange.prototype, "minDate", void 0);
__decorate([
  e$2({ type: String })
], HistogramDateRange.prototype, "maxDate", void 0);
__decorate([
  e$2({ type: Boolean })
], HistogramDateRange.prototype, "disabled", void 0);
__decorate([
  e$2({ type: Object })
], HistogramDateRange.prototype, "bins", void 0);
__decorate([
  t$3()
], HistogramDateRange.prototype, "_tooltipOffset", void 0);
__decorate([
  t$3()
], HistogramDateRange.prototype, "_tooltipContent", void 0);
__decorate([
  t$3()
], HistogramDateRange.prototype, "_tooltipVisible", void 0);
__decorate([
  t$3()
], HistogramDateRange.prototype, "_isDragging", void 0);
__decorate([
  t$3()
], HistogramDateRange.prototype, "_isLoading", void 0);
__decorate([
  e$2({ type: Boolean })
], HistogramDateRange.prototype, "loading", null);
__decorate([
  e$2()
], HistogramDateRange.prototype, "minSelectedDate", null);
__decorate([
  e$2()
], HistogramDateRange.prototype, "maxSelectedDate", null);
HistogramDateRange = __decorate([
  n$5("histogram-date-range")
], HistogramDateRange);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t;
const i = globalThis.trustedTypes, s$1 = i ? i.createPolicy("lit-html", { createHTML: (t3) => t3 }) : void 0, e = `lit$${(Math.random() + "").slice(9)}$`, o$1 = "?" + e, n$1 = `<${o$1}>`, l$1 = document, h = (t3 = "") => l$1.createComment(t3), r = (t3) => t3 === null || typeof t3 != "object" && typeof t3 != "function", d = Array.isArray, u = (t3) => {
  var i2;
  return d(t3) || typeof ((i2 = t3) === null || i2 === void 0 ? void 0 : i2[Symbol.iterator]) == "function";
}, c = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, v = /-->/g, a = />/g, f = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g, _ = /'/g, m = /"/g, g = /^(?:script|style|textarea)$/i, $ = (t3) => (i2, ...s2) => ({ _$litType$: t3, strings: i2, values: s2 }), p = $(1), y = $(2), b = Symbol.for("lit-noChange"), T = Symbol.for("lit-nothing"), x = /* @__PURE__ */ new WeakMap(), w = (t3, i2, s2) => {
  var e2, o2;
  const n2 = (e2 = s2 == null ? void 0 : s2.renderBefore) !== null && e2 !== void 0 ? e2 : i2;
  let l2 = n2._$litPart$;
  if (l2 === void 0) {
    const t4 = (o2 = s2 == null ? void 0 : s2.renderBefore) !== null && o2 !== void 0 ? o2 : null;
    n2._$litPart$ = l2 = new N(i2.insertBefore(h(), t4), t4, void 0, s2 != null ? s2 : {});
  }
  return l2._$AI(t3), l2;
}, A = l$1.createTreeWalker(l$1, 129, null, false), C = (t3, i2) => {
  const o2 = t3.length - 1, l2 = [];
  let h2, r2 = i2 === 2 ? "<svg>" : "", d2 = c;
  for (let i3 = 0; i3 < o2; i3++) {
    const s2 = t3[i3];
    let o3, u4, $2 = -1, p2 = 0;
    for (; p2 < s2.length && (d2.lastIndex = p2, u4 = d2.exec(s2), u4 !== null); )
      p2 = d2.lastIndex, d2 === c ? u4[1] === "!--" ? d2 = v : u4[1] !== void 0 ? d2 = a : u4[2] !== void 0 ? (g.test(u4[2]) && (h2 = RegExp("</" + u4[2], "g")), d2 = f) : u4[3] !== void 0 && (d2 = f) : d2 === f ? u4[0] === ">" ? (d2 = h2 != null ? h2 : c, $2 = -1) : u4[1] === void 0 ? $2 = -2 : ($2 = d2.lastIndex - u4[2].length, o3 = u4[1], d2 = u4[3] === void 0 ? f : u4[3] === '"' ? m : _) : d2 === m || d2 === _ ? d2 = f : d2 === v || d2 === a ? d2 = c : (d2 = f, h2 = void 0);
    const y2 = d2 === f && t3[i3 + 1].startsWith("/>") ? " " : "";
    r2 += d2 === c ? s2 + n$1 : $2 >= 0 ? (l2.push(o3), s2.slice(0, $2) + "$lit$" + s2.slice($2) + e + y2) : s2 + e + ($2 === -2 ? (l2.push(void 0), i3) : y2);
  }
  const u3 = r2 + (t3[o2] || "<?>") + (i2 === 2 ? "</svg>" : "");
  return [s$1 !== void 0 ? s$1.createHTML(u3) : u3, l2];
};
class P {
  constructor({ strings: t3, _$litType$: s2 }, n2) {
    let l2;
    this.parts = [];
    let r2 = 0, d2 = 0;
    const u3 = t3.length - 1, c2 = this.parts, [v2, a2] = C(t3, s2);
    if (this.el = P.createElement(v2, n2), A.currentNode = this.el.content, s2 === 2) {
      const t4 = this.el.content, i2 = t4.firstChild;
      i2.remove(), t4.append(...i2.childNodes);
    }
    for (; (l2 = A.nextNode()) !== null && c2.length < u3; ) {
      if (l2.nodeType === 1) {
        if (l2.hasAttributes()) {
          const t4 = [];
          for (const i2 of l2.getAttributeNames())
            if (i2.endsWith("$lit$") || i2.startsWith(e)) {
              const s3 = a2[d2++];
              if (t4.push(i2), s3 !== void 0) {
                const t5 = l2.getAttribute(s3.toLowerCase() + "$lit$").split(e), i3 = /([.?@])?(.*)/.exec(s3);
                c2.push({ type: 1, index: r2, name: i3[2], strings: t5, ctor: i3[1] === "." ? M : i3[1] === "?" ? H : i3[1] === "@" ? I : S });
              } else
                c2.push({ type: 6, index: r2 });
            }
          for (const i2 of t4)
            l2.removeAttribute(i2);
        }
        if (g.test(l2.tagName)) {
          const t4 = l2.textContent.split(e), s3 = t4.length - 1;
          if (s3 > 0) {
            l2.textContent = i ? i.emptyScript : "";
            for (let i2 = 0; i2 < s3; i2++)
              l2.append(t4[i2], h()), A.nextNode(), c2.push({ type: 2, index: ++r2 });
            l2.append(t4[s3], h());
          }
        }
      } else if (l2.nodeType === 8)
        if (l2.data === o$1)
          c2.push({ type: 2, index: r2 });
        else {
          let t4 = -1;
          for (; (t4 = l2.data.indexOf(e, t4 + 1)) !== -1; )
            c2.push({ type: 7, index: r2 }), t4 += e.length - 1;
        }
      r2++;
    }
  }
  static createElement(t3, i2) {
    const s2 = l$1.createElement("template");
    return s2.innerHTML = t3, s2;
  }
}
function V(t3, i2, s2 = t3, e2) {
  var o2, n2, l2, h2;
  if (i2 === b)
    return i2;
  let d2 = e2 !== void 0 ? (o2 = s2._$Cl) === null || o2 === void 0 ? void 0 : o2[e2] : s2._$Cu;
  const u3 = r(i2) ? void 0 : i2._$litDirective$;
  return (d2 == null ? void 0 : d2.constructor) !== u3 && ((n2 = d2 == null ? void 0 : d2._$AO) === null || n2 === void 0 || n2.call(d2, false), u3 === void 0 ? d2 = void 0 : (d2 = new u3(t3), d2._$AT(t3, s2, e2)), e2 !== void 0 ? ((l2 = (h2 = s2)._$Cl) !== null && l2 !== void 0 ? l2 : h2._$Cl = [])[e2] = d2 : s2._$Cu = d2), d2 !== void 0 && (i2 = V(t3, d2._$AS(t3, i2.values), d2, e2)), i2;
}
class E {
  constructor(t3, i2) {
    this.v = [], this._$AN = void 0, this._$AD = t3, this._$AM = i2;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t3) {
    var i2;
    const { el: { content: s2 }, parts: e2 } = this._$AD, o2 = ((i2 = t3 == null ? void 0 : t3.creationScope) !== null && i2 !== void 0 ? i2 : l$1).importNode(s2, true);
    A.currentNode = o2;
    let n2 = A.nextNode(), h2 = 0, r2 = 0, d2 = e2[0];
    for (; d2 !== void 0; ) {
      if (h2 === d2.index) {
        let i3;
        d2.type === 2 ? i3 = new N(n2, n2.nextSibling, this, t3) : d2.type === 1 ? i3 = new d2.ctor(n2, d2.name, d2.strings, this, t3) : d2.type === 6 && (i3 = new L(n2, this, t3)), this.v.push(i3), d2 = e2[++r2];
      }
      h2 !== (d2 == null ? void 0 : d2.index) && (n2 = A.nextNode(), h2++);
    }
    return o2;
  }
  m(t3) {
    let i2 = 0;
    for (const s2 of this.v)
      s2 !== void 0 && (s2.strings !== void 0 ? (s2._$AI(t3, s2, i2), i2 += s2.strings.length - 2) : s2._$AI(t3[i2])), i2++;
  }
}
class N {
  constructor(t3, i2, s2, e2) {
    var o2;
    this.type = 2, this._$AH = T, this._$AN = void 0, this._$AA = t3, this._$AB = i2, this._$AM = s2, this.options = e2, this._$Cg = (o2 = e2 == null ? void 0 : e2.isConnected) === null || o2 === void 0 || o2;
  }
  get _$AU() {
    var t3, i2;
    return (i2 = (t3 = this._$AM) === null || t3 === void 0 ? void 0 : t3._$AU) !== null && i2 !== void 0 ? i2 : this._$Cg;
  }
  get parentNode() {
    let t3 = this._$AA.parentNode;
    const i2 = this._$AM;
    return i2 !== void 0 && t3.nodeType === 11 && (t3 = i2.parentNode), t3;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t3, i2 = this) {
    t3 = V(this, t3, i2), r(t3) ? t3 === T || t3 == null || t3 === "" ? (this._$AH !== T && this._$AR(), this._$AH = T) : t3 !== this._$AH && t3 !== b && this.$(t3) : t3._$litType$ !== void 0 ? this.T(t3) : t3.nodeType !== void 0 ? this.S(t3) : u(t3) ? this.M(t3) : this.$(t3);
  }
  A(t3, i2 = this._$AB) {
    return this._$AA.parentNode.insertBefore(t3, i2);
  }
  S(t3) {
    this._$AH !== t3 && (this._$AR(), this._$AH = this.A(t3));
  }
  $(t3) {
    this._$AH !== T && r(this._$AH) ? this._$AA.nextSibling.data = t3 : this.S(l$1.createTextNode(t3)), this._$AH = t3;
  }
  T(t3) {
    var i2;
    const { values: s2, _$litType$: e2 } = t3, o2 = typeof e2 == "number" ? this._$AC(t3) : (e2.el === void 0 && (e2.el = P.createElement(e2.h, this.options)), e2);
    if (((i2 = this._$AH) === null || i2 === void 0 ? void 0 : i2._$AD) === o2)
      this._$AH.m(s2);
    else {
      const t4 = new E(o2, this), i3 = t4.p(this.options);
      t4.m(s2), this.S(i3), this._$AH = t4;
    }
  }
  _$AC(t3) {
    let i2 = x.get(t3.strings);
    return i2 === void 0 && x.set(t3.strings, i2 = new P(t3)), i2;
  }
  M(t3) {
    d(this._$AH) || (this._$AH = [], this._$AR());
    const i2 = this._$AH;
    let s2, e2 = 0;
    for (const o2 of t3)
      e2 === i2.length ? i2.push(s2 = new N(this.A(h()), this.A(h()), this, this.options)) : s2 = i2[e2], s2._$AI(o2), e2++;
    e2 < i2.length && (this._$AR(s2 && s2._$AB.nextSibling, e2), i2.length = e2);
  }
  _$AR(t3 = this._$AA.nextSibling, i2) {
    var s2;
    for ((s2 = this._$AP) === null || s2 === void 0 || s2.call(this, false, true, i2); t3 && t3 !== this._$AB; ) {
      const i3 = t3.nextSibling;
      t3.remove(), t3 = i3;
    }
  }
  setConnected(t3) {
    var i2;
    this._$AM === void 0 && (this._$Cg = t3, (i2 = this._$AP) === null || i2 === void 0 || i2.call(this, t3));
  }
}
class S {
  constructor(t3, i2, s2, e2, o2) {
    this.type = 1, this._$AH = T, this._$AN = void 0, this.element = t3, this.name = i2, this._$AM = e2, this.options = o2, s2.length > 2 || s2[0] !== "" || s2[1] !== "" ? (this._$AH = Array(s2.length - 1).fill(new String()), this.strings = s2) : this._$AH = T;
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3, i2 = this, s2, e2) {
    const o2 = this.strings;
    let n2 = false;
    if (o2 === void 0)
      t3 = V(this, t3, i2, 0), n2 = !r(t3) || t3 !== this._$AH && t3 !== b, n2 && (this._$AH = t3);
    else {
      const e3 = t3;
      let l2, h2;
      for (t3 = o2[0], l2 = 0; l2 < o2.length - 1; l2++)
        h2 = V(this, e3[s2 + l2], i2, l2), h2 === b && (h2 = this._$AH[l2]), n2 || (n2 = !r(h2) || h2 !== this._$AH[l2]), h2 === T ? t3 = T : t3 !== T && (t3 += (h2 != null ? h2 : "") + o2[l2 + 1]), this._$AH[l2] = h2;
    }
    n2 && !e2 && this.k(t3);
  }
  k(t3) {
    t3 === T ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t3 != null ? t3 : "");
  }
}
class M extends S {
  constructor() {
    super(...arguments), this.type = 3;
  }
  k(t3) {
    this.element[this.name] = t3 === T ? void 0 : t3;
  }
}
const k = i ? i.emptyScript : "";
class H extends S {
  constructor() {
    super(...arguments), this.type = 4;
  }
  k(t3) {
    t3 && t3 !== T ? this.element.setAttribute(this.name, k) : this.element.removeAttribute(this.name);
  }
}
class I extends S {
  constructor(t3, i2, s2, e2, o2) {
    super(t3, i2, s2, e2, o2), this.type = 5;
  }
  _$AI(t3, i2 = this) {
    var s2;
    if ((t3 = (s2 = V(this, t3, i2, 0)) !== null && s2 !== void 0 ? s2 : T) === b)
      return;
    const e2 = this._$AH, o2 = t3 === T && e2 !== T || t3.capture !== e2.capture || t3.once !== e2.once || t3.passive !== e2.passive, n2 = t3 !== T && (e2 === T || o2);
    o2 && this.element.removeEventListener(this.name, this, e2), n2 && this.element.addEventListener(this.name, this, t3), this._$AH = t3;
  }
  handleEvent(t3) {
    var i2, s2;
    typeof this._$AH == "function" ? this._$AH.call((s2 = (i2 = this.options) === null || i2 === void 0 ? void 0 : i2.host) !== null && s2 !== void 0 ? s2 : this.element, t3) : this._$AH.handleEvent(t3);
  }
}
class L {
  constructor(t3, i2, s2) {
    this.element = t3, this.type = 6, this._$AN = void 0, this._$AM = i2, this.options = s2;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t3) {
    V(this, t3);
  }
}
const z = window.litHtmlPolyfillSupport;
z == null || z(P, N), ((t = globalThis.litHtmlVersions) !== null && t !== void 0 ? t : globalThis.litHtmlVersions = []).push("2.0.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var l, o;
class s extends a$7 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Dt = void 0;
  }
  createRenderRoot() {
    var t3, e2;
    const i2 = super.createRenderRoot();
    return (t3 = (e2 = this.renderOptions).renderBefore) !== null && t3 !== void 0 || (e2.renderBefore = i2.firstChild), i2;
  }
  update(t3) {
    const i2 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t3), this._$Dt = w(i2, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t3;
    super.connectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(true);
  }
  disconnectedCallback() {
    var t3;
    super.disconnectedCallback(), (t3 = this._$Dt) === null || t3 === void 0 || t3.setConnected(false);
  }
  render() {
    return b;
  }
}
s.finalized = true, s._$litElement$ = true, (l = globalThis.litElementHydrateSupport) === null || l === void 0 || l.call(globalThis, { LitElement: s });
const n = globalThis.litElementPolyfillSupport;
n == null || n({ LitElement: s });
((o = globalThis.litElementVersions) !== null && o !== void 0 ? o : globalThis.litElementVersions = []).push("3.0.2");
const thumbsUp = y`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd"/></svg>`;
const thumbsDown = y`
<svg viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg">
  <path d="m51.5960452 0c5.420012 0 6.7920618 2.72313378 8.1300179 9.28391016 2.9793915 19.21608984-2.9793915 28.94849474 0 31.58229234 1.2215505 1.079857 1.8678662.7924226 3.2997314.0773518l.2153069-.1075882c2.1016905-1.0490161 5.8499713-2.8359661 14.9013153-2.8359661l2.3393989.00075c14.0694555.01425 14.2569231.29925 18.0062757 5.99925 0 3.2648986.9924719 9.5-3.9698878 9.5 4.9623597 0 7.9397755 15.5 0 15.5 7.9397755 0 6.9473035 15.5-.9924719 15.5 7.9397754 0 5.9548316 12 2.9774158 13-1.1342536.5714286-1.9876793 1.0011812-2.627102 1.3222794l-.3279542.1645673c-1.5889262.796641-1.5747062.7780161-1.4530457.6832252l.0244872-.0190992c.0041709-.0032756.0083532-.0065808.0124967-.0098908l.0239934-.0197196c.1060465-.0904428.1029348-.1457697-1.111471.3786377h-55.0821921c-3.3082398-3.0266004-4.9623597-5.0266004-4.9623597-6v-33.4737525c5.5882429-8.3508317 10.6469206-21.2754909 15.1760333-38.7739777v-17.92948326c0-2.54852436 1.8066707-3.82278654 5.4200119-3.82278654zm-27.5960452 56c2.209139 0 4 1.790861 4 4v36c0 2.209139-1.790861 4-4 4h-20c-2.209139 0-4-1.790861-4-4v-36c0-2.209139 1.790861-4 4-4z" fill-rule="evenodd" transform="matrix(-1 0 0 -1 100 100)"/>
</svg>
`;
let FeatureFeedback = class FeatureFeedback2 extends s {
  constructor() {
    super(...arguments);
    this.prompt = "Do you find this feature useful?";
    this.buttonText = "Beta";
    this.isOpen = false;
    this.processing = false;
    this.popupTopX = 0;
    this.popupTopY = 0;
    this.voteSubmitted = false;
    this.voteNeedsChoosing = false;
    this.resizingElement = document.body;
  }
  render() {
    return p`
      <button
        id="beta-button"
        @click=${this.showPopup}
        tabindex="0"
        ?disabled=${this.disabled}
      >
        <span id="button-text">${this.buttonText}</span>
        <span
          class="beta-button-thumb upvote-button ${this.voteSubmitted ? this.upvoteButtonClass : ""}"
          >${thumbsUp}</span
        >
        <span
          class="beta-button-thumb downvote-button ${this.voteSubmitted ? this.downvoteButtonClass : ""}"
          id="beta-button-thumb-down"
          >${thumbsDown}</span
        >
      </button>
      ${this.popupTemplate}
    `;
  }
  firstUpdated() {
    this.boundEscapeListener = this.handleEscape.bind(this);
    this.boundScrollListener = this.handleScroll.bind(this);
  }
  updated(changed) {
    if (changed.has("vote") && this.vote) {
      this.error = void 0;
      this.voteNeedsChoosing = false;
    }
    if (changed.has("resizeObserver")) {
      const oldObserver = changed.get("resizeObserver");
      this.disconnectResizeObserver(oldObserver);
    }
  }
  handleResize() {
    if (!this.isOpen)
      return;
    this.positionPopup();
  }
  handleScroll() {
    if (!this.isOpen)
      return;
    this.positionPopup();
  }
  disconnectedCallback() {
    this.removeEscapeListener();
    this.disconnectResizeObserver(this.resizeObserver);
  }
  disconnectResizeObserver(observer) {
    const observerToRemove = observer !== null && observer !== void 0 ? observer : this.resizeObserver;
    observerToRemove === null || observerToRemove === void 0 ? void 0 : observerToRemove.removeObserver({
      handler: this,
      target: this.resizingElement
    });
  }
  setupResizeObserver() {
    if (!this.resizeObserver)
      return;
    this.resizeObserver.addObserver({
      handler: this,
      target: this.resizingElement
    });
  }
  async setupRecaptcha() {
    if (!this.recaptchaManager)
      return;
    this.recaptchaWidget = await this.recaptchaManager.getRecaptchaWidget();
  }
  resetState() {
    this.vote = void 0;
    this.voteSubmitted = false;
    this.error = void 0;
    this.voteNeedsChoosing = false;
    this.comments.value = "";
  }
  async showPopup() {
    if (this.voteSubmitted)
      return;
    this.resetState();
    this.setupResizeObserver();
    this.setupScrollObserver();
    this.setupEscapeListener();
    this.positionPopup();
    this.isOpen = true;
    await this.setupRecaptcha();
  }
  closePopup() {
    this.disconnectResizeObserver();
    this.stopScrollObserver();
    this.removeEscapeListener();
    this.isOpen = false;
  }
  positionPopup() {
    const betaRect = this.betaButton.getBoundingClientRect();
    const popupRect = this.popup.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const windowCenterX = windowWidth / 2;
    const windowCenterY = windowHeight / 2;
    if (betaRect.left < windowCenterX) {
      this.popupTopX = betaRect.right - 20;
    } else {
      this.popupTopX = betaRect.left + 20 - popupRect.width;
    }
    this.popupTopX = Math.max(0, this.popupTopX);
    if (this.popupTopX + popupRect.width > windowWidth) {
      this.popupTopX = windowWidth - popupRect.width;
    }
    if (betaRect.top < windowCenterY) {
      this.popupTopY = betaRect.bottom - 10;
    } else {
      this.popupTopY = betaRect.top + 10 - popupRect.height;
    }
  }
  handleEscape(e2) {
    if (e2.key === "Escape") {
      this.closePopup();
    }
  }
  setupEscapeListener() {
    document.addEventListener("keyup", this.boundEscapeListener);
  }
  removeEscapeListener() {
    document.removeEventListener("keyup", this.boundEscapeListener);
  }
  setupScrollObserver() {
    document.addEventListener("scroll", this.boundScrollListener);
  }
  stopScrollObserver() {
    document.removeEventListener("scroll", this.boundScrollListener);
  }
  get popupTemplate() {
    return p`
      <div
        id="popup-background"
        class=${this.isOpen ? "open" : "closed"}
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
                ${thumbsUp}
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
                ${thumbsDown}
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
            ${this.error ? p`<div id="error">${this.error}</div>` : T}
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
                .value=${this.processing ? "Submitting..." : "Submit feedback"}
                tabindex="0"
                ?disabled=${this.processing}
              />
            </div>
          </form>
        </div>
      </div>
    `;
  }
  get upvoteSelected() {
    return this.vote === "up";
  }
  get downvoteSelected() {
    return this.vote === "down";
  }
  upvoteKeypressed(e2) {
    if (e2.key === "Enter" || e2.key === " ") {
      this.upvoteButtonSelected();
    }
  }
  downvoteKeypressed(e2) {
    if (e2.key === "Enter" || e2.key === " ") {
      this.downvoteButtonSelected();
    }
  }
  upvoteButtonSelected() {
    this.vote = this.vote === "up" ? void 0 : "up";
  }
  downvoteButtonSelected() {
    this.vote = this.vote === "down" ? void 0 : "down";
  }
  get chooseVoteErrorClass() {
    return this.voteNeedsChoosing ? "error" : "";
  }
  get upvoteButtonClass() {
    switch (this.vote) {
      case "up":
        return "selected";
      case "down":
        return "unselected";
      default:
        return "noselection";
    }
  }
  get downvoteButtonClass() {
    switch (this.vote) {
      case "up":
        return "unselected";
      case "down":
        return "selected";
      default:
        return "noselection";
    }
  }
  backgroundClicked(e2) {
    var _a;
    if (!(e2.target instanceof Node))
      return;
    if ((_a = this.popup) === null || _a === void 0 ? void 0 : _a.contains(e2.target))
      return;
    this.closePopup();
  }
  cancel(e2) {
    e2.preventDefault();
    this.vote = void 0;
    this.closePopup();
  }
  async submit(e2) {
    e2.preventDefault();
    if (!this.vote) {
      this.voteNeedsChoosing = true;
      this.error = p`Please select a vote.`;
      return;
    }
    if (!this.featureIdentifier) {
      throw new Error("featureIdentifier is required");
    }
    if (!this.featureFeedbackService) {
      throw new Error("featureFeedbackService is required");
    }
    if (!this.recaptchaWidget) {
      throw new Error("recaptchaWidget is required");
    }
    this.processing = true;
    try {
      const token = await this.recaptchaWidget.execute();
      const response = await this.featureFeedbackService.submitFeedback({
        featureIdentifier: this.featureIdentifier,
        vote: this.vote,
        comments: this.comments.value,
        recaptchaToken: token
      });
      if (response.success) {
        this.voteSubmitted = true;
        this.closePopup();
      } else {
        this.error = p`There was an error submitting your feedback.`;
      }
    } catch (err) {
      this.error = p`There was an error submitting your feedback.<br />Error:
        ${err instanceof Error ? err.message : err}`;
    }
    this.processing = false;
  }
  static get styles() {
    const blueColor = r$7`var(--featureFeedbackBlueColor, #194880)`;
    const darkGrayColor = r$7`var(--featureFeedbackDarkGrayColor, #767676)`;
    const darkGrayColorSvgFilter = r$7`var(--defaultColorSvgFilter, invert(52%) sepia(0%) saturate(1%) hue-rotate(331deg) brightness(87%) contrast(89%))`;
    const backdropZindex = r$7`var(--featureFeedbackBackdropZindex, 5)`;
    const modalZindex = r$7`var(--featureFeedbackModalZindex, 6)`;
    const popupBorderColor = r$7`var(--featureFeedbackPopupBorderColor, ${blueColor})`;
    const submitButtonColor = r$7`var(--featureFeedbackSubmitButtonColor, ${blueColor})`;
    const betaButtonBorderColor = r$7`var(--featureFeedbackBetaButtonBorderColor, ${blueColor})`;
    const betaButtonTextColor = r$7`var(--featureFeedbackBetaButtonTextColor, ${blueColor})`;
    const betaButtonSvgFilter = r$7`var(--featureFeedbackBetaButtonSvgFilter, ${darkGrayColorSvgFilter})`;
    const cancelButtonColor = r$7`var(--featureFeedbackCancelButtonColor, #515151)`;
    const popupBlockerColor = r$7`var(--featureFeedbackPopupBlockerColor, rgba(255, 255, 255, 0.3))`;
    const popupBackgroundColor = r$7`var(--featureFeedbackPopupBackgroundColor, #F5F5F7)`;
    const promptFontWeight = r$7`var(--featureFeedbackPromptFontWeight, bold)`;
    const promptFontSize = r$7`var(--featureFeedbackPromptFontSize, 14px)`;
    const defaultColor = r$7`var(--defaultColor, ${darkGrayColor});`;
    const defaultColorSvgFilter = r$7`var(--defaultColorSvgFilter, ${darkGrayColorSvgFilter});`;
    const upvoteColor = r$7`var(--upvoteColor, #23765D);`;
    const upvoteColorSvgFilter = r$7`var(--upvoteColorSvgFilter, invert(34%) sepia(72%) saturate(357%) hue-rotate(111deg) brightness(97%) contrast(95%));`;
    const downvoteColor = r$7`var(--downvoteColor, #720D11);`;
    const downvoteColorSvgFilter = r$7`var(--downvoteColorSvgFilter, invert(5%) sepia(81%) saturate(5874%) hue-rotate(352deg) brightness(105%) contrast(95%));`;
    const unselectedColor = r$7`var(--unselectedColor, #CCCCCC);`;
    const unselectedColorSvgFilter = r$7`var(--unselectedColorSvgFilter, invert(100%) sepia(0%) saturate(107%) hue-rotate(138deg) brightness(89%) contrast(77%));`;
    return r$7`
      #beta-button {
        font-size: 12px;
        font-weight: bold;
        font-style: italic;
        color: ${betaButtonTextColor};
        border: 1px solid ${betaButtonBorderColor};
        border-radius: 4px;
        padding: 1px 5px;
      }

      .beta-button-thumb svg {
        height: 10px;
        width: 10px;
        filter: ${betaButtonSvgFilter};
      }

      .beta-button-thumb.unselected svg {
        filter: ${unselectedColorSvgFilter};
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
        z-index: ${backdropZindex};
        background-color: ${popupBlockerColor};
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
        background-color: ${popupBackgroundColor};
        border: 1px ${popupBorderColor} solid;
        border-radius: 5px;
        box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        z-index: ${modalZindex};
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
        font-size: ${promptFontSize};
        font-weight: ${promptFontWeight};
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
        background-color: ${cancelButtonColor};
      }

      #submit-button {
        background-color: ${submitButtonColor};
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
        border-color: ${defaultColor};
      }

      .vote-button.noselection svg {
        filter: ${defaultColorSvgFilter};
      }

      .vote-button.unselected {
        border-color: ${unselectedColor};
      }

      .vote-button.unselected svg {
        filter: ${unselectedColorSvgFilter};
      }

      .upvote-button.selected {
        border-color: ${upvoteColor};
      }

      .upvote-button.selected svg {
        filter: ${upvoteColorSvgFilter};
      }

      .downvote-button.selected {
        border-color: ${downvoteColor};
      }

      .downvote-button.selected svg {
        filter: ${downvoteColorSvgFilter};
      }

      .vote-button.error {
        box-shadow: 0 0 4px red;
      }
    `;
  }
};
__decorate([
  e$b({ type: String })
], FeatureFeedback.prototype, "featureIdentifier", void 0);
__decorate([
  e$b({ type: String })
], FeatureFeedback.prototype, "prompt", void 0);
__decorate([
  e$b({ type: String })
], FeatureFeedback.prototype, "buttonText", void 0);
__decorate([
  e$b({ type: Object })
], FeatureFeedback.prototype, "recaptchaManager", void 0);
__decorate([
  e$b({ type: Object })
], FeatureFeedback.prototype, "resizeObserver", void 0);
__decorate([
  e$b({ type: Boolean })
], FeatureFeedback.prototype, "disabled", void 0);
__decorate([
  e$b({ type: Object })
], FeatureFeedback.prototype, "featureFeedbackService", void 0);
__decorate([
  i$9("#beta-button")
], FeatureFeedback.prototype, "betaButton", void 0);
__decorate([
  i$9("#popup")
], FeatureFeedback.prototype, "popup", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "isOpen", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "processing", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "popupTopX", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "popupTopY", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "vote", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "voteSubmitted", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "error", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "voteNeedsChoosing", void 0);
__decorate([
  t$8()
], FeatureFeedback.prototype, "recaptchaWidget", void 0);
__decorate([
  i$9("#comments")
], FeatureFeedback.prototype, "comments", void 0);
FeatureFeedback = __decorate([
  n$a("feature-feedback")
], FeatureFeedback);
var eyeIcon = y$1`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m98 50.5704143c-.2830293-.471515-.671154-1.1088947-1.1643742-1.9121392s-1.6003642-2.3617474-3.3214321-4.6755089c-1.7210678-2.3137614-3.522258-4.5325939-5.4035703-6.6564975-1.8813124-2.1239037-4.2828993-4.473133-7.2047606-7.0476881-2.9218612-2.5745551-5.8895067-4.7933876-8.9029363-6.6564976-3.0134295-1.86311-6.4628491-3.4330878-10.3482587-4.7099336-3.8854095-1.2768458-7.7822651-1.9142256-11.6905667-1.9121443-3.9083017.0020914-7.8051573.6154781-11.6905668 1.8401652-3.8854096 1.2246871-7.3702078 2.8301329-10.4543947 4.8163375-3.0841869 1.9862045-6.0278997 4.1695691-8.8311384 6.5500937s-5.2048256 4.7652219-7.2047605 7.1540919c-1.99993501 2.38887-3.75430043 4.5722346-5.26309632 6.5500938s-2.63883199 3.583305-3.39010829 4.8163374l-1.13003609 1.8401602c.2830293.4715149.67115403 1.1088946 1.16437421 1.9121391.49322017.8032445 1.5878776 2.3617475 3.28397229 4.6755089s3.47439274 4.521119 5.3348942 6.6220728c1.8605014 2.1009538 4.2506422 4.4387083 7.1704224 7.0132633 2.9197801 2.5745551 5.8874256 4.7819127 8.9029363 6.6220729 3.0155106 1.8401601 6.4774168 3.398663 10.3857184 4.6755088 3.9083017 1.2768458 7.8176438 1.9142256 11.7280266 1.9121443 3.9103827-.0020914 7.7957922-.6154781 11.6562286-1.8401652s7.3337886-2.818658 10.4200566-4.7819127 6.0299808-4.1351444 8.8311384-6.515669 5.2152311-4.7652219 7.2422203-7.1540919 3.8052873-4.5607597 5.3348942-6.515669c1.5296068-1.9549093 2.6721295-3.5488802 3.427568-4.7819127zm-24.5142913 0c0 6.467683-2.3079374 12.0152859-6.9238123 16.6428087s-10.1495139 6.9412843-16.600917 6.9412843c-6.4992683 0-12.0453939-2.3137615-16.6383767-6.9412843s-6.8894742-10.1751257-6.8894742-16.6428087 2.2964914-12.003811 6.8894742-16.608384 10.1391084-6.9068595 16.6383767-6.9068595c6.4534842 0 11.9871232 2.3022865 16.600917 6.9068595s6.9217312 10.140701 6.9238123 16.608384zm-23.5247293-10.552755c2.8261308 0 5.2870289 1.0619518 7.3826944 3.1858555 2.0956655 2.1239036 3.1434982 4.5795368 3.1434982 7.3668995 0 2.8332624-1.0478327 5.2888956-3.1434982 7.3668995-2.0956655 2.078004-4.5565636 3.1170059-7.3826944 3.1170059-2.873996 0-5.3348941-1.0264838-7.3826944-3.0794516-2.0478002-2.0529677-3.0717003-4.5200758-3.0717003-7.4013243 0-2.8332624 1.0239001-5.3003705 3.0717003-7.4013243 2.0478003-2.1009538 4.5086984-3.1514307 7.3826944-3.1514307z" fill="#000"/></svg>
`;
var eyeClosedIcon = y$1`
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m97.5245976 14.5407294-15.0809624 14.6188347c3.3026825 2.8601369 6.4111526 6.0234269 9.3254105 9.48987 2.9142578 3.4664431 5.0023086 6.2183876 6.2641522 8.2558335l1.9668021 3.1268688c-.291855.4841879-.6920826 1.1386987-1.2006828 1.9635322s-1.6502683 2.4252247-3.4250041 4.8011737c-1.7747358 2.3759489-3.6202894 4.6426342-5.5366607 6.8000558-1.9163713 2.1574217-4.3810437 4.5580085-7.3940172 7.2017606-3.0129735 2.643752-6.0731589 4.9104373-9.180556 6.8000558-3.1073972 1.8896186-6.6643798 3.4900098-10.6709478 4.8011737-4.0065681 1.3111639-8.0249391 1.9656747-12.055113 1.9635322-6.7019347 0-13.2343359-1.6732336-19.5972037-5.019701l-17.1185824 16.6562806-10.27179318-10.6917703 14.93288898-14.5449211c-3.2533247-2.8601369-6.3371159-6.0116436-9.25137378-9.45452-2.91425785-3.4428764-5.02698749-6.1819664-6.33818892-8.2172698l-1.8927654-3.0529552c.29185498-.4841879.69208259-1.1386987 1.20068282-1.9635322.50860022-.8248335 1.65026824-2.437008 3.42500406-4.8365236 1.77473582-2.3995157 3.62028938-4.6908389 5.53666072-6.8739696 1.9163713-2.1831307 4.3810437-4.5955009 7.3940172-7.2371105s6.0731589-4.9200783 9.180556-6.8354059c3.1073972-1.9153277 6.6772558-3.5275022 10.7095757-4.8365237 4.03232-1.3090215 8.0635669-1.9635322 12.0937409-1.9635322 6.5560071 0 13.0637294 1.6968003 19.5231669 5.090401l17.1185824-16.5823669zm-46.478979 24.584323 10.7803934-10.473243c-3.5451796-1.891761-7.3092505-2.8376415-11.2922126-2.8376415-6.6547228 0-12.3609169 2.3641657-17.1185824 7.0924969-4.7576654 4.7283312-7.1375711 10.437893-7.1397171 17.1286852 0 3.8306553.8251341 7.3945787 2.4754024 10.6917703l10.9284669-10.5471566v-.1446137c0-2.9094127 1.0687043-5.4546132 3.2061128-7.6356015 2.1374086-2.1809883 4.6868477-3.2714825 7.6483174-3.2714825h.5086002zm-1.1652739 21.5988543-10.7803935 10.6178566c3.5945375 1.9388943 7.4068932 2.9083415 11.4370672 2.9083415 6.6547228 0 12.3491139-2.375949 17.0831734-7.1278469s7.1021623-10.4486051 7.1043083-17.0901215c0-4.0234736-.874492-7.6356015-2.6234759-10.836384l-10.7095757 10.473243v.363141c0 2.9586884-1.0687042 5.4803223-3.2061128 7.5649015-2.1374085 2.0845792-4.6868476 3.1268688-7.6483173 3.1268688z" fill="#000"/></svg>
`;
var chevronIcon = y$1`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="m79.8883285 50.0035012.1116715-.1085359-43.1159942-46.61088155c-2.401537-2.18938917-4.6902018-3.28408375-6.8659943-3.28408375s-4.1642651.63837733-5.9654178 1.91513199c-1.8011528 1.27675467-3.1520173 2.97248092-4.0525937 5.08717877l39.4020173 42.99768924-39.4020173 42.9976892c.9005764 2.1146979 2.2514409 3.8104241 4.0525937 5.0871788 1.8011527 1.2767547 3.7896253 1.915132 5.9654178 1.915132 2.1013449 0 4.3900096-1.0573489 6.8659943-3.1720468l43.1159942-46.7194174z"/></svg>
`;
const facetDisplayOrder = [
  "mediatype",
  "year",
  "subject",
  "collection",
  "creator",
  "language"
];
const aggregationToFacetOption = {
  subjectSorter: "subject",
  mediatypeSorter: "mediatype",
  languageSorter: "language",
  creatorSorter: "creator",
  collection: "collection",
  year: "year"
};
const facetTitles = {
  subject: "Subject",
  mediatype: "Media Type",
  language: "Language",
  creator: "Creator",
  collection: "Collection",
  year: "Year"
};
let CollectionFacets = class CollectionFacets2 extends s$e {
  constructor() {
    super(...arguments);
    this.facetsLoading = false;
    this.fullYearAggregationLoading = false;
    this.collapsableFacets = false;
    this.showHistogramDatePicker = false;
    this.openFacets = {
      subject: false,
      mediatype: false,
      language: false,
      creator: false,
      collection: false,
      year: false
    };
  }
  render() {
    return $$4`
      <div id="container" class="${this.facetsLoading ? "loading" : ""}">
        ${this.showHistogramDatePicker && this.fullYearsHistogramAggregation ? $$4`
              <div class="facet-group">
                <h1>Year Published <feature-feedback></feature-feedback></h1>
                ${this.histogramTemplate}
              </div>
            ` : w$4}
        ${this.mergedFacets.map((facetGroup) => this.getFacetGroupTemplate(facetGroup))}
      </div>
    `;
  }
  updated(changed) {
    if (changed.has("selectedFacets")) {
      this.dispatchFacetsChangedEvent();
    }
  }
  dispatchFacetsChangedEvent() {
    const event = new CustomEvent("facetsChanged", {
      detail: this.selectedFacets
    });
    this.dispatchEvent(event);
  }
  get currentYearsHistogramAggregation() {
    var _a;
    return (_a = this.aggregations) === null || _a === void 0 ? void 0 : _a.year_histogram;
  }
  get histogramTemplate() {
    const { fullYearsHistogramAggregation } = this;
    return $$4`
      <histogram-date-range
        .minDate=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.first_bucket_key}
        .maxDate=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.last_bucket_key}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .updateDelay=${100}
        missingDataMessage="..."
        .width=${180}
        .bins=${fullYearsHistogramAggregation === null || fullYearsHistogramAggregation === void 0 ? void 0 : fullYearsHistogramAggregation.buckets}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      ></histogram-date-range>
    `;
  }
  histogramDateRangeUpdated(e2) {
    const { minDate, maxDate } = e2.detail;
    const event = new CustomEvent("histogramDateRangeUpdated", {
      detail: { minDate, maxDate }
    });
    this.dispatchEvent(event);
  }
  get mergedFacets() {
    const facetGroups = [];
    facetDisplayOrder.forEach((facetKey) => {
      var _a;
      const selectedFacetGroup = this.selectedFacetGroups.find((group) => group.key === facetKey);
      const aggregateFacetGroup = this.aggregationFacetGroups.find((group) => group.key === facetKey);
      if (selectedFacetGroup && !aggregateFacetGroup) {
        facetGroups.push(selectedFacetGroup);
        return;
      }
      if (!aggregateFacetGroup)
        return;
      const facetGroup = selectedFacetGroup !== null && selectedFacetGroup !== void 0 ? selectedFacetGroup : aggregateFacetGroup;
      const bucketsWithCount = (_a = selectedFacetGroup === null || selectedFacetGroup === void 0 ? void 0 : selectedFacetGroup.buckets.map((bucket) => {
        const selectedBucket = aggregateFacetGroup.buckets.find((b2) => b2.key === bucket.key);
        return selectedBucket ? __spreadProps(__spreadValues({}, bucket), {
          count: selectedBucket.count
        }) : bucket;
      })) !== null && _a !== void 0 ? _a : [];
      aggregateFacetGroup.buckets.forEach((bucket) => {
        const existingBucket = bucketsWithCount.find((b2) => b2.key === bucket.key);
        if (existingBucket)
          return;
        bucketsWithCount.push(bucket);
      });
      facetGroup.buckets = bucketsWithCount.splice(0, 5);
      facetGroups.push(facetGroup);
    });
    return facetGroups;
  }
  get selectedFacetGroups() {
    if (!this.selectedFacets)
      return [];
    const facetGroups = Object.entries(this.selectedFacets).map(([key, selectedFacets]) => {
      const option = key;
      const title = facetTitles[option];
      const buckets = Object.entries(selectedFacets).map(([value, facetState]) => {
        var _a, _b;
        let displayText = value;
        if (option === "language") {
          displayText = (_b = (_a = this.languageCodeHandler) === null || _a === void 0 ? void 0 : _a.getLanguageNameFromCodeString(value)) !== null && _b !== void 0 ? _b : value;
        }
        return {
          displayText,
          key: value,
          count: 0,
          state: facetState
        };
      });
      return {
        title,
        key: option,
        buckets
      };
    });
    return facetGroups;
  }
  get aggregationFacetGroups() {
    var _a;
    const facetGroups = [];
    Object.entries((_a = this.aggregations) !== null && _a !== void 0 ? _a : []).forEach(([key, buckets]) => {
      if (key === "year_histogram")
        return;
      const option = this.getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets;
      const facetBuckets = castedBuckets.map((bucket) => {
        var _a2, _b;
        let bucketKey = bucket.key;
        if (option === "language") {
          bucketKey = (_b = (_a2 = this.languageCodeHandler) === null || _a2 === void 0 ? void 0 : _a2.getCodeStringFromLanguageName(`${bucket.key}`)) !== null && _b !== void 0 ? _b : bucket.key;
        }
        return {
          displayText: `${bucket.key}`,
          key: `${bucketKey}`,
          count: bucket.doc_count,
          state: "none"
        };
      });
      const group = {
        title,
        key: option,
        buckets: facetBuckets
      };
      facetGroups.push(group);
    });
    return facetGroups;
  }
  getFacetGroupTemplate(facetGroup) {
    if (facetGroup.buckets.length === 0)
      return w$4;
    const { key } = facetGroup;
    const isOpen = this.openFacets[key];
    const collapser = $$4`
      <span class="collapser ${isOpen ? "open" : ""}"> ${chevronIcon} </span>
    `;
    return $$4`
      <div class="facet-group ${this.collapsableFacets ? "mobile" : ""}">
        <h1
          @click=${() => {
      const newOpenFacets = __spreadValues({}, this.openFacets);
      newOpenFacets[key] = !isOpen;
      this.openFacets = newOpenFacets;
    }}
          @keyup=${() => {
      const newOpenFacets = __spreadValues({}, this.openFacets);
      newOpenFacets[key] = !isOpen;
      this.openFacets = newOpenFacets;
    }}
        >
          ${this.collapsableFacets ? collapser : w$4} ${facetGroup.title}
        </h1>
        <div class="facet-group-content ${isOpen ? "open" : ""}">
          ${this.getFacetTemplate(facetGroup)}
        </div>
      </div>
    `;
  }
  getFacetTemplate(facetGroup) {
    const bucketsNoFavorites = facetGroup.buckets.filter((bucket) => bucket.key.startsWith("fav-") === false);
    const bucketsMaxSix = bucketsNoFavorites.slice(0, 6);
    return $$4`
      <ul class="facet-list">
        ${c$2(bucketsMaxSix, (bucket) => `${facetGroup.key}:${bucket.key}`, (bucket) => {
      var _a, _b;
      const showOnlyCheckboxId = `${facetGroup.key}:${bucket.key}-show-only`;
      const negativeCheckboxId = `${facetGroup.key}:${bucket.key}-negative`;
      const bucketTextDisplay = facetGroup.key !== "collection" ? $$4`${(_a = bucket.displayText) !== null && _a !== void 0 ? _a : bucket.key}` : $$4`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${bucket.key}
                      placeholder="-"
                    ></async-collection-name>
                  `;
      const facetHidden = bucket.state === "hidden";
      const facetSelected = bucket.state === "selected";
      const titleText = `${facetGroup.key}: ${(_b = bucket.displayText) !== null && _b !== void 0 ? _b : bucket.key}`;
      const onlyShowText = facetSelected ? `Show all ${facetGroup.key}s` : `Only show ${titleText}`;
      const hideText = `Hide ${titleText}`;
      const unhideText = `Unhide ${titleText}`;
      const showHideText = facetHidden ? unhideText : hideText;
      return $$4`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e2) => {
        this.facetClicked(e2, bucket, false);
      }}
                      .checked=${facetSelected}
                      class="select-facet-checkbox"
                      title=${onlyShowText}
                      id=${showOnlyCheckboxId}
                    />
                    <input
                      type="checkbox"
                      id=${negativeCheckboxId}
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e2) => {
        this.facetClicked(e2, bucket, true);
      }}
                      .checked=${facetHidden}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${negativeCheckboxId}
                      class="hide-facet-icon"
                      title=${showHideText}
                    >
                      ${facetHidden ? eyeClosedIcon : eyeIcon}
                    </label>
                  </div>

                  <label
                    for=${showOnlyCheckboxId}
                    class="facet-info-display"
                    title=${onlyShowText}
                  >
                    <div class="facet-title">${bucketTextDisplay}</div>
                    <div class="facet-count">${bucket.count}</div>
                  </label>
                </div>
              </li>
            `;
    })}
      </ul>
    `;
  }
  facetClicked(e2, bucket, negative) {
    const target = e2.target;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name, value, negative);
    } else {
      this.facetUnchecked(name, value);
    }
  }
  facetChecked(key, value, negative) {
    const { selectedFacets } = this;
    let newFacets;
    if (selectedFacets) {
      newFacets = __spreadValues({}, selectedFacets);
    } else {
      newFacets = defaultSelectedFacets;
    }
    newFacets[key][value] = negative ? "hidden" : "selected";
    this.selectedFacets = newFacets;
  }
  facetUnchecked(key, value) {
    const { selectedFacets } = this;
    let newFacets;
    if (selectedFacets) {
      newFacets = __spreadValues({}, selectedFacets);
    } else {
      newFacets = defaultSelectedFacets;
    }
    delete newFacets[key][value];
    this.selectedFacets = newFacets;
  }
  getFacetOptionFromKey(key) {
    const parts = key.split("__");
    const fieldNamePart = parts[2];
    const fieldName = fieldNamePart.split(":")[1];
    const facetMatch = Object.entries(aggregationToFacetOption).find(([key2]) => fieldName.includes(key2));
    const option = facetMatch === null || facetMatch === void 0 ? void 0 : facetMatch[1];
    if (!option)
      throw new Error(`Could not find facet option for key: ${key}`);
    return option;
  }
  static get styles() {
    return r$9`
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
    `;
  }
};
__decorate([
  e$f({ type: Object })
], CollectionFacets.prototype, "aggregations", void 0);
__decorate([
  e$f({ type: Object })
], CollectionFacets.prototype, "fullYearsHistogramAggregation", void 0);
__decorate([
  e$f({ type: String })
], CollectionFacets.prototype, "minSelectedDate", void 0);
__decorate([
  e$f({ type: String })
], CollectionFacets.prototype, "maxSelectedDate", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionFacets.prototype, "facetsLoading", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionFacets.prototype, "fullYearAggregationLoading", void 0);
__decorate([
  e$f({ type: Object })
], CollectionFacets.prototype, "selectedFacets", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionFacets.prototype, "collapsableFacets", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionFacets.prototype, "showHistogramDatePicker", void 0);
__decorate([
  e$f({ type: Object })
], CollectionFacets.prototype, "languageCodeHandler", void 0);
__decorate([
  e$f({ type: Object })
], CollectionFacets.prototype, "collectionNameCache", void 0);
__decorate([
  t$b()
], CollectionFacets.prototype, "openFacets", void 0);
CollectionFacets = __decorate([
  n$g("collection-facets")
], CollectionFacets);
let CircularActivityIndicator = class CircularActivityIndicator2 extends s$e {
  render() {
    return $$4`
      <div class="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    `;
  }
  static get styles() {
    const color = r$9`var(--circularActivityIndicatorColor, dodgerblue)`;
    const thickness = r$9`var(--circularActivityIndicatorThickness, 4px)`;
    return r$9`
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
        margin: ${thickness};
        border-width: ${thickness};
        border-style: solid;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: ${color} transparent transparent transparent;
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
    `;
  }
};
CircularActivityIndicator = __decorate([
  n$g("circular-activity-indicator")
], CircularActivityIndicator);
/*! typescript-cookie v1.0.3 | MIT */
const encodeName = (name) => encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
const encodeValue = (value) => {
  return encodeURIComponent(value).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g, decodeURIComponent);
};
const decodeName = decodeURIComponent;
const decodeValue = (value) => {
  if (value[0] === '"') {
    value = value.slice(1, -1);
  }
  return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
};
function stringifyAttributes(attributes) {
  attributes = Object.assign({}, attributes);
  if (typeof attributes.expires === "number") {
    attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
  }
  if (attributes.expires != null) {
    attributes.expires = attributes.expires.toUTCString();
  }
  return Object.entries(attributes).filter(([key, value]) => value != null && value !== false).map(([key, value]) => value === true ? `; ${key}` : `; ${key}=${value.split(";")[0]}`).join("");
}
function get(name, decodeValue2, decodeName2) {
  const scan = /(?:^|; )([^=]*)=([^;]*)/g;
  const jar = {};
  let match;
  while ((match = scan.exec(document.cookie)) != null) {
    try {
      const found = decodeName2(match[1]);
      jar[found] = decodeValue2(match[2], found);
      if (name === found) {
        break;
      }
    } catch (e2) {
    }
  }
  return name != null ? jar[name] : jar;
}
const DEFAULT_CODEC = Object.freeze({
  decodeName,
  decodeValue,
  encodeName,
  encodeValue
});
const DEFAULT_ATTRIBUTES = Object.freeze({
  path: "/"
});
function setCookie(name, value, attributes = DEFAULT_ATTRIBUTES, { encodeValue: encodeValue$1 = encodeValue, encodeName: encodeName$1 = encodeName } = {}) {
  return document.cookie = `${encodeName$1(name)}=${encodeValue$1(value, name)}${stringifyAttributes(attributes)}`;
}
function getCookie(name, { decodeValue: decodeValue$1 = decodeValue, decodeName: decodeName$1 = decodeName } = {}) {
  return get(name, decodeValue$1, decodeName$1);
}
function getCookies({ decodeValue: decodeValue$1 = decodeValue, decodeName: decodeName$1 = decodeName } = {}) {
  return get(void 0, decodeValue$1, decodeName$1);
}
function removeCookie(name, attributes = DEFAULT_ATTRIBUTES) {
  setCookie(name, "", Object.assign({}, attributes, {
    expires: -1
  }));
}
function init(converter, defaultAttributes) {
  const api = {
    set: function(name, value, attributes) {
      return setCookie(name, value, Object.assign({}, this.attributes, attributes), {
        encodeValue: this.converter.write
      });
    },
    get: function(name) {
      if (arguments.length === 0) {
        return getCookies(this.converter.read);
      }
      if (name == null) {
        return;
      }
      return getCookie(name, this.converter.read);
    },
    remove: function(name, attributes) {
      removeCookie(name, Object.assign({}, this.attributes, attributes));
    },
    withAttributes: function(attributes) {
      return init(this.converter, Object.assign({}, this.attributes, attributes));
    },
    withConverter: function(converter2) {
      return init(Object.assign({}, this.converter, converter2), this.attributes);
    }
  };
  const config = {
    attributes: { value: Object.freeze(defaultAttributes) },
    converter: { value: Object.freeze(converter) }
  };
  return Object.create(api, config);
}
init({ read: DEFAULT_CODEC.decodeValue, write: DEFAULT_CODEC.encodeValue }, DEFAULT_ATTRIBUTES);
class RestorationStateHandler {
  constructor(options) {
    this.cookieDomain = ".archive.org";
    this.cookieExpiration = 30;
    this.cookiePath = "/";
    this.context = options.context;
  }
  persistState(state) {
    if (state.displayMode)
      this.persistViewStateToCookies(state.displayMode);
    this.persistQueryStateToUrl(state);
  }
  getRestorationState() {
    const restorationState = this.loadQueryStateFromUrl();
    const displayMode = this.loadTileViewStateFromCookies();
    restorationState.displayMode = displayMode;
    return restorationState;
  }
  persistViewStateToCookies(displayMode) {
    const gridState = displayMode === "grid" ? "tiles" : "lists";
    setCookie(`view-${this.context}`, gridState, {
      domain: this.cookieDomain,
      expires: this.cookieExpiration,
      path: this.cookiePath
    });
    const detailsState = displayMode === "list-detail" ? "showdetails" : "";
    setCookie(`showdetails-${this.context}`, detailsState, {
      domain: this.cookieDomain,
      expires: this.cookieExpiration,
      path: this.cookiePath
    });
  }
  loadTileViewStateFromCookies() {
    const viewState = getCookie(`view-${this.context}`);
    const detailsState = getCookie(`showdetails-${this.context}`);
    if (viewState === "tiles" || viewState === void 0)
      return "grid";
    if (detailsState === "showdetails")
      return "list-detail";
    return "list-compact";
  }
  persistQueryStateToUrl(state) {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.delete("sort");
    searchParams.delete("query");
    searchParams.delete("page");
    searchParams.delete("and[]");
    searchParams.delete("not[]");
    if (state.sortParam) {
      const prefix = state.sortParam.direction === "desc" ? "-" : "";
      searchParams.set("sort", `${prefix}${state.sortParam.field}`);
    }
    if (state.baseQuery) {
      searchParams.set("query", state.baseQuery);
    }
    if (state.currentPage) {
      if (state.currentPage > 1) {
        searchParams.set("page", state.currentPage.toString());
      } else {
        searchParams.delete("page");
      }
    }
    if (state.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(state.selectedFacets)) {
        const facetEntries = Object.entries(facetValues);
        if (facetEntries.length === 0)
          continue;
        for (const [key, facetState] of facetEntries) {
          const notValue = facetState === "hidden";
          const paramValue = `${facetName}:"${key}"`;
          if (notValue) {
            searchParams.append("not[]", paramValue);
          } else {
            searchParams.append("and[]", paramValue);
          }
        }
      }
    }
    if (state.dateRangeQueryClause) {
      searchParams.append("and[]", state.dateRangeQueryClause);
    }
    if (state.titleQuery) {
      searchParams.append("and[]", state.titleQuery);
    }
    if (state.creatorQuery) {
      searchParams.append("and[]", state.creatorQuery);
    }
    window.history.pushState({
      sort: state.sortParam,
      query: state.baseQuery,
      page: state.currentPage,
      and: state.selectedFacets,
      not: state.selectedFacets,
      dateRange: state.dateRangeQueryClause
    }, "", url);
  }
  loadQueryStateFromUrl() {
    const url = new URL(window.location.href);
    const pageNumber = url.searchParams.get("page");
    const searchQuery = url.searchParams.get("query");
    const sortQuery = url.searchParams.get("sort");
    const facetAnds = url.searchParams.getAll("and[]");
    const facetNots = url.searchParams.getAll("not[]");
    const restorationState = {
      selectedFacets: {
        subject: {},
        creator: {},
        mediatype: {},
        language: {},
        collection: {},
        year: {}
      }
    };
    if (pageNumber) {
      const parsed = parseInt(pageNumber, 10);
      restorationState.currentPage = parsed;
    } else {
      restorationState.currentPage = 1;
    }
    if (searchQuery) {
      restorationState.baseQuery = searchQuery;
    }
    if (sortQuery) {
      const hasSpace = sortQuery.indexOf(" ") > -1;
      if (hasSpace) {
        const [field, direction] = sortQuery.split(" ");
        const metadataField = MetadataFieldToSortField[field];
        if (metadataField) {
          restorationState.selectedSort = metadataField;
        }
        if (direction === "desc" || direction === "asc") {
          restorationState.sortDirection = direction;
        }
      } else {
        const sortDirection = sortQuery.startsWith("-") ? "desc" : "asc";
        const sortField = sortQuery.startsWith("-") ? sortQuery.slice(1) : sortQuery;
        const metadataField = MetadataFieldToSortField[sortField];
        if (metadataField)
          restorationState.selectedSort = metadataField;
        restorationState.sortDirection = sortDirection;
      }
    }
    if (facetAnds) {
      facetAnds.forEach((and) => {
        const [field, value] = and.split(":");
        const unQuotedValue = this.stripQuotes(value);
        switch (field) {
          case "year": {
            const [minDate, maxDate] = value.split(" TO ");
            if (minDate && maxDate) {
              restorationState.minSelectedDate = minDate.substring(1, minDate.length);
              restorationState.maxSelectedDate = maxDate.substring(0, maxDate.length - 1);
              restorationState.dateRangeQueryClause = `year:${value}`;
            } else {
              restorationState.selectedFacets[field][unQuotedValue] = "selected";
            }
            break;
          }
          case "firstTitle":
            restorationState.selectedTitleFilter = value;
            break;
          case "firstCreator":
            restorationState.selectedCreatorFilter = value;
            break;
          default:
            restorationState.selectedFacets[field][unQuotedValue] = "selected";
        }
      });
    }
    if (facetNots) {
      facetNots.forEach((not) => {
        const [field, value] = not.split(":");
        const unQuotedValue = this.stripQuotes(value);
        restorationState.selectedFacets[field][unQuotedValue] = "hidden";
      });
    }
    return restorationState;
  }
  stripQuotes(value) {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.substring(1, value.length - 1);
    }
    return value;
  }
}
const codeToLanguageMap = {
  "ambient noise wall": "Music",
  "american english": "English",
  "arabic videos": "Arabic",
  "arabic, english": "Arabic and English",
  "de-formal": "German",
  "en-ca": "English",
  "en-gb": "English",
  "en-us": "English",
  "eng-fre": "English and French",
  "eng;fre": "English and French",
  "english handwritten": "Handwritten English",
  "english-handwritten": "Handwritten English",
  "english, polski": "English and Polish",
  "english, spanish": "English and Spanish",
  "english; finnish": "English and Finnish",
  "english/french": "English and French",
  "finnish, english": "English and Finnish",
  "finnish; english": "English and Finnish",
  "french-handwritten": "Handwritten French",
  "german-handwritten": "Handwritten German",
  "hebrew-handwritten": "Handwritten Hebrew",
  "language not encoded": "Unknown",
  "miscellaneous languages": "Multiple",
  "n/a": "Unknown",
  "no language": "skip",
  "no linguistic content": "skip",
  "no speech": "skip",
  "polish-handwritten": "Handwritten Polish",
  "pt-br": "Portuguese",
  "spanish-handwritten": "Handwritten Spanish",
  "us english": "English",
  "www.back4allah.com": "Arabic",
  "www.rabania.com": "Arabic",
  "www.way2allah.com": "Arabic",
  "yiddish-handwritten": "Handwritten Yiddish",
  "zh-cn": "Chinese",
  "zh-tw": "Chinese",
  "\u0623\u0648\u0631\u062F\u0648 ::: Urdu": "Urdu",
  "\u0628\u0634\u062A\u0648 ::: Pashto": "Pashto",
  "\u0639\u0631\u0628\u064A\u0629 ::: arabic": "Arabic",
  "\u0639\u0631\u0628\u064A\u0629 ::: Arabic": "Arabic",
  "\u0639\u0631\u0628\u064A\u0629 \u0645\u0639 \u062A\u0631\u062C\u0645\u0629 \u0625\u0646\u062C\u0644\u064A\u0632\u064A\u0629 ::: Arabic with English subtitles": "Arabic with English subtitles",
  aar: "Afar",
  abk: "Abkhaz",
  adl: "Galo",
  ady: "Adyghe",
  afr: "Afrikaans",
  aka: "Akan",
  akk: "Akkadian",
  alb: "Albanian",
  ale: "Aleut",
  alg: "Algonquian",
  american: "English",
  amh: "Amharic",
  ang: "Old English",
  anm: "Anal",
  anq: "Jarawa",
  apa: "Apache languages",
  apt: "Apatani",
  ar: "Arabic",
  ara: "Arabic",
  arab: "Arabic",
  arabe: "Arabic",
  arbc: "Arabic",
  arbic: "Arabic",
  arc: "Aramaic",
  arg: "Aragonese",
  arm: "Armenian",
  arp: "Arapaho",
  asm: "Assamese",
  ast: "Asturian",
  ath: "Athapascan (Other)",
  awa: "Awadhi",
  aym: "Aymara",
  aze: "Azerbaijani",
  bak: "Bashkir",
  bal: "Baluchi",
  ban: "Balinese",
  baq: "Basque",
  bel: "Belarusian",
  bem: "Bemba",
  ben: "Bengali",
  ber: "Berber",
  bft: "Balti",
  bfy: "Bagheli",
  bgw: "Bhatri",
  bhb: "Bhili",
  bho: "Bhojpuri",
  bih: "Bihari",
  bis: "Bislama",
  bkk: "Brokskat",
  bla: "Blackfoot",
  bns: "Bundeli",
  bnt: "Bantu",
  bos: "Bosnian",
  bra: "Braj",
  bre: "Breton",
  brx: "Bodo",
  bua: "Buryat",
  bul: "Bulgarian",
  bur: "Burmese",
  cai: "Central American Indian",
  caq: "Car",
  car: "Carib",
  cat: "Catalan",
  cau: "Caucasian",
  ceb: "Cebuano",
  ces: "Czech",
  cha: "Chamorro",
  che: "Chechen",
  chi: "Chinese",
  chm: "Mari",
  chn: "Chinook jargon",
  cho: "Choctaw",
  chp: "Chipewyan",
  chr: "Cherokee",
  chu: "Church Slavic",
  chv: "Chuvash",
  chy: "Cheyenne",
  clk: "Idu-Mishmi",
  cmn: "Mandarin Chinese",
  cop: "Coptic",
  cor: "Cornish",
  cos: "Corsican",
  cpe: "Creoles and Pidgins, English-based",
  cpf: "Creoles and Pidgins, French-based",
  cpp: "Creoles and Pidgins, Portuguese-based",
  cre: "Cree",
  crh: "Crimean Tatar",
  cro: "Croatian",
  crp: "Creoles and Pidgins",
  cs: "Czech",
  csb: "Kashubian",
  cym: "Welsh",
  cze: "Czech",
  da: "Danish",
  dak: "Dakota",
  dan: "Danish",
  dar: "Dargwa",
  de: "German",
  del: "Delaware",
  deu: "German",
  deutsch: "German",
  dgo: "Dogri",
  dih: "Dhivehi",
  doi: "Dogri (Generic)",
  dra: "Dravidian (Other)",
  dsb: "Lower Sorbian",
  dum: "Middle Dutch",
  dut: "Dutch",
  dzo: "Dzongkha",
  egy: "Egyptian",
  el: "Greek",
  ell: "Greek",
  emg: "English",
  en_us: "English",
  en: "English",
  eng: "English",
  engfre: "English and French",
  engilsh: "English",
  english: "English",
  enm: "Middle English",
  epo: "Esperanto",
  es: "Spanish",
  esk: "Eskimo",
  esp: "Esperanto",
  espanol: "Spanish",
  espa\u00F1ol: "Spanish",
  est: "Estonian",
  eth: "Ethiopic",
  eus: "Basque",
  fa: "Persian",
  fao: "Faroese",
  far: "Faroese",
  fas: "Persian",
  fi: "Finnish",
  fij: "Fijian",
  fil: "Filipino",
  fin: "Finnish",
  fle: "Dutch",
  fr: "French",
  fra: "French",
  francais: "French",
  fran\u00E7ais: "French",
  fre: "French",
  fri: "Frisian",
  frm: "Middle French",
  fro: "Old French",
  frr: "North Frisian",
  fry: "Frisian",
  fur: "Friulian",
  gaa: "G\xE3",
  gac: "Mixed Great Andamanese",
  gae: "Scottish Gaelic",
  gag: "Galician",
  gbl: "Gamit",
  gem: "Germanic",
  geo: "Georgian",
  ger: "German",
  gez: "Ethiopic",
  gil: "Gilbertese",
  gju: "Gujari",
  gla: "Scottish Gaelic",
  gle: "Irish",
  glg: "Galician",
  glv: "Manx",
  gmh: "Middle High German",
  goh: "Old German",
  gon: "Gondi",
  got: "Gothic",
  grb: "Grebo",
  grc: "Ancient Greek",
  gre: "Greek",
  grn: "Guarani",
  grt: "Garo",
  gsw: "Swiss German",
  gua: "Guarani",
  guj: "Gujarati",
  gwi: "Gwichin",
  hai: "Haida",
  hat: "Haitian French Creole",
  hau: "Hausa",
  haw: "Hawaiian",
  he: "Hebrew",
  heb: "Hebrew",
  hin: "Hindi",
  hlb: "Halbi",
  hmn: "Hmong",
  hmr: "Hmar",
  hne: "Chhattisgarhi",
  hoc: "Ho",
  hrv: "Croatian",
  hsb: "Upper Sorbian",
  hu: "Hungarian",
  hun: "Hungarian",
  ibo: "Igbo",
  ice: "Icelandic",
  ido: "Ido",
  iku: "Inuktitut",
  ile: "Interlingue",
  ilo: "Iloko",
  ina: "Interlingua",
  inc: "Indic (Other)",
  ind: "Indonesian",
  inh: "Ingush",
  int: "Interlingua",
  ipk: "Inupiaq",
  ira: "Iranian",
  iri: "Irish",
  iro: "Iroquoian",
  iru: "Irula",
  isl: "Icelandic",
  ita: "Italian",
  jam: "Music",
  jap: "Japanese",
  jav: "Javanese",
  jpn: "Japanese",
  jrb: "Judeo-Arabic",
  kaa: "Karakalpak",
  kab: "Kabyle",
  kal: "Kalatdlisut",
  kan: "Kannada",
  kar: "Karen",
  kas: "Kashmiri",
  kaz: "Kazakh",
  kbd: "Kabardian",
  kfa: "Kodava",
  kfb: "Northwestern Kolami",
  kfe: "Kota (India)",
  kff: "Koya",
  kfq: "Korku",
  kha: "Khasi",
  khm: "Khmer",
  kho: "Khotanese",
  khr: "Kharia",
  kik: "Kikuyu",
  kin: "Kinyarwanda",
  kir: "Kyrgyz",
  kix: "Khiamniungan Naga",
  kmj: "Kumarbhag Paharia",
  kmm: "Kom (India)",
  ko: "Korean",
  kok: "Konkani",
  kon: "Kongo",
  kor: "Korean",
  kpe: "Kpelle",
  krc: "Karachay-Balkar",
  kro: "Kru",
  kru: "Kurukh",
  ksh: "K\xF6lsch",
  kum: "Kumyk",
  kur: "Kurdish",
  kxu: "Kui (India)",
  kxv: "Kuvi",
  kyw: "Kudmali",
  lad: "Ladino",
  lah: "Lahnda",
  lao: "Lao",
  lap: "Sami",
  lat: "Latin",
  lav: "Latvian",
  lbj: "Ladakhi",
  lep: "Lepcha",
  lez: "Lezgin",
  lim: "Limburgish",
  lin: "Lingala",
  lit: "Lithuanian",
  lmn: "Lambadi",
  lol: "Mongo-Nkundu",
  ltz: "Luxembourgish",
  lua: "Luba-Lulua",
  lub: "Luba-Katanga",
  lug: "Ganda",
  lus: "Lushai",
  mac: "Macedonian",
  mah: "Marshallese",
  mai: "Maithili",
  mal: "Malayalam",
  man: "Mandarin Chinese",
  mao: "Maori",
  map: "Austronesian",
  mar: "Marathi",
  max: "Manx",
  may: "Malay",
  mga: "Middle Irish",
  mha: "Manda (India)",
  mic: "Micmac",
  min: "Minankabaw",
  mis: "Miscellaneous languages",
  mjw: "Karbi",
  mkh: "Mon-Khmer",
  mla: "Malagasy",
  mlg: "Malagasy",
  mlt: "Maltese",
  mni: "Manipuri",
  moh: "Mohawk",
  mol: "Moldavian",
  mon: "Mongolian",
  mrg: "Mising",
  mul: "Multiple",
  mus: "Creek",
  mwr: "Marwari",
  myn: "Maya",
  nag: "Naga Pigdin",
  nah: "Nahuatl",
  nai: "North American Indian",
  nap: "Neapolitan",
  nau: "Nauru",
  nav: "Navajo",
  nbc: "Chang Naga",
  nbe: "Konyak Naga",
  nbi: "Mao Naga",
  nbl: "Ndebele",
  nbu: "Rongmei Naga",
  nds: "Low German",
  nep: "Nepali",
  new: "Newari",
  ng: "English",
  nic: "Niger-Kordofanian",
  njh: "Lotha Naga",
  njm: "Angami Naga",
  njn: "Liangmai Naga",
  njo: "Ao Naga",
  nkf: "Inpui Naga",
  nkh: "Khezha Naga",
  nld: "Dutch",
  nll: "Nihali",
  nma: "Maram Naga",
  nmf: "Tangkhul Naga",
  nno: "Norwegian (Nynorsk)",
  no: "skip",
  nob: "Norwegian (Bokm\xE5l)",
  nog: "Nogay",
  non: "Old Norse",
  none: "skip",
  nor: "Norwegian",
  nri: "Chokri Naga",
  nsa: "Sangtam Naga",
  nsm: "Sumi Naga",
  nso: "Northern Sotho",
  nya: "Nyanja",
  nzm: "Zeme Naga",
  oci: "Occitan",
  oji: "Ojibwa",
  oon: "\xD6nge",
  ori: "Oriya",
  orm: "Oromo",
  ory: "Odia",
  oss: "Ossetic",
  ota: "Ottoman Turkish",
  oto: "Otomian",
  paa: "Papuan",
  pag: "Pangasinan",
  pal: "Pahlavi",
  pam: "Pampanga",
  pan: "Panjabi",
  panjabi: "Punjabi",
  pap: "Papiamento",
  pbv: "Pnar",
  pci: "Duruwa",
  pck: "Paite Chin",
  per: "Persian",
  phi: "Philippine",
  pli: "Pali",
  pol: "Polish",
  por: "Portuguese",
  port: "Portuguese",
  portugues: "Portuguese",
  portugu\u00EAs: "Portuguese",
  pra: "Prakrit",
  pro: "Provencal",
  prx: "Purik",
  pus: "Pashto",
  qaa: "skip",
  que: "Quechua",
  rah: "Rabha",
  raj: "Rajasthani",
  roa: "Romance",
  roh: "Romansh",
  rom: "Romani",
  ron: "Romanian",
  rum: "Romanian",
  run: "Rundi",
  rus: "Russian",
  sag: "Sango",
  sah: "Yakut",
  sai: "South American Indian",
  sam: "Samaritan Aramaic",
  san: "Sanskrit",
  sao: "Samoan",
  sat: "Santali",
  scc: "Serbian",
  scl: "Shina",
  sco: "Scots",
  scots: "Scottish",
  scr: "Croatian",
  sdr: "Oraon Sadri",
  sel: "Selkup",
  sem: "Semitic",
  sga: "Old Irish",
  sho: "Shona",
  sin: "Sinhalese",
  sio: "Siouan",
  sip: "Sikkimese",
  sit: "Sino-Tibetan",
  sk: "Slovak",
  sla: "Slavic",
  slk: "Slovak",
  slo: "Slovak",
  slv: "Slovenian",
  sme: "Saami",
  smi: "Sami",
  smo: "Samoan",
  sms: "Skolt Sami",
  sna: "Shona",
  snd: "Sindhi",
  snh: "Sinhalese",
  som: "Somali",
  sot: "Sotho",
  spa: "Spanish",
  spain: "Spanish",
  spv: "Sambalpuri",
  sq: "Albanian",
  sqi: "Albanian",
  srb: "Sora",
  srp: "Serbian",
  sso: "Sotho",
  ssw: "Swazi",
  sun: "Sundanese",
  sux: "Sumerian",
  sv: "Swedish",
  svenska: "Swedish",
  swa: "Swahili",
  swe: "Swedish",
  swz: "Swazi",
  syc: "Syriac",
  syr: "Modern Syriac",
  tag: "Tagalog",
  tah: "Tahitian",
  taj: "Tajik",
  tam: "Tamil",
  tar: "Tatar",
  tat: "Tatar",
  tcy: "Tulu",
  tcz: "Thado Chin",
  tel: "Telugu",
  tem: "Temne",
  tgk: "Tajik",
  tgl: "Tagalog",
  tha: "Thai",
  tib: "Tibetan",
  tig: "Tigre",
  tir: "Tigrinya",
  tlh: "Klingon",
  tog: "Tonga",
  ton: "Tongan",
  tpi: "Tok Pisin",
  tr: "Turkish",
  trp: "Kok Borok",
  tsi: "Tsimshian",
  tsn: "Tswana",
  tso: "Tsonga",
  tsw: "Tswana",
  tuk: "Turkmen",
  tur: "Turkish",
  t\u00FCrk\u00E7e: "Turkish",
  tut: "Altaic",
  tyv: "Tuvinian",
  udm: "Udmurt",
  uig: "Uighur",
  uk: "Ukranian",
  ukr: "Ukrainian",
  und: "undetermined",
  undetermined: "skip",
  unknown: "skip",
  unr: "Mundari",
  urd: "Urdu",
  uzb: "Uzbek",
  vah: "Varhadi-Nagpuri",
  vap: "Vaiphei",
  vav: "Varli",
  ven: "Venda",
  vie: "Vietnamese",
  vol: "Volapu\u0308k",
  war: "Waray",
  wbr: "Wagdi",
  wel: "Welsh",
  wen: "Sorbian",
  wol: "Wolof",
  xal: "Oirat",
  xho: "Xhosa",
  xis: "Kisan (Dravidian)",
  xnr: "Kangri",
  xsr: "Solu-Khumbu Sherpa",
  yea: "Ravula",
  yid: "Yiddish",
  yim: "Yimchungru Naga",
  yor: "Yoruba",
  ypk: "Yupik languages",
  zap: "Zapotec",
  zh: "Chinese",
  zha: "Zhuang",
  zho: "Chinese",
  zom: "Zou",
  zul: "Zulu",
  zun: "Zuni",
  zxx: "No linguistic content",
  \u0420\u0443\u0441\u0441\u043A\u0438\u0439: "Russian",
  \u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0438\u0439: "Ukranian",
  \u0627\u0644\u0639\u0631\u0628\u064A\u0629: "Arabic",
  \u0639\u0631\u0628\u064A: "Arabic"
};
class LanguageCodeHandler {
  constructor() {
    this.delimeter = "|";
  }
  getLanguageNameFromCodeString(languageCodes) {
    const split = this.getCodeArrayFromCodeString(languageCodes);
    if (split.length === 0)
      return "";
    const languageCode = split[0];
    const languageName = codeToLanguageMap[languageCode];
    return languageName !== null && languageName !== void 0 ? languageName : languageCodes;
  }
  getCodeStringFromLanguageName(languageName) {
    const languageCodes = Object.keys(codeToLanguageMap).filter((code) => codeToLanguageMap[code] === languageName);
    const stringifiedCodes = languageCodes === null || languageCodes === void 0 ? void 0 : languageCodes.join(this.delimeter);
    return stringifiedCodes;
  }
  getCodeArrayFromCodeString(languageCodes) {
    const split = languageCodes.split(this.delimeter);
    return split;
  }
}
let CollectionBrowser = class CollectionBrowser2 extends s$e {
  constructor() {
    super(...arguments);
    this.baseImageUrl = "https://archive.org";
    this.sortParam = null;
    this.selectedSort = SortField.relevance;
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = null;
    this.sortDirection = null;
    this.pageSize = 50;
    this.showHistogramDatePicker = false;
    this.pageContext = "search";
    this.restorationStateHandler = new RestorationStateHandler({
      context: this.pageContext
    });
    this.mobileBreakpoint = 600;
    this.loggedIn = false;
    this.initialPageNumber = 1;
    this.pagesToRender = this.initialPageNumber;
    this.searchResultsLoading = false;
    this.facetsLoading = false;
    this.fullYearAggregationLoading = false;
    this.mobileView = false;
    this.mobileFacetsVisible = false;
    this.languageCodeHandler = new LanguageCodeHandler();
    this.isScrollingToCell = false;
    this.endOfDataReached = false;
    this.placeholderCellTemplate = $$4`<collection-browser-loading-tile></collection-browser-loading-tile>`;
    this.dataSource = {};
    this.initialQueryChangeHappened = false;
    this.historyPopOccurred = false;
    this.pageFetchesInProgress = {};
  }
  tileModelAtCellIndex(index) {
    var _a;
    const pageNumber = Math.floor(index / this.pageSize) + 1;
    const itemIndex = index % this.pageSize;
    const model = (_a = this.dataSource[pageNumber]) === null || _a === void 0 ? void 0 : _a[itemIndex];
    if (!model && !this.isScrollingToCell) {
      this.fetchPage(pageNumber);
    }
    return model;
  }
  get sortFilterQueries() {
    const queries = [this.titleQuery, this.creatorQuery];
    return queries.filter((q) => q).join(" AND ");
  }
  get estimatedTileCount() {
    return this.pagesToRender * this.pageSize;
  }
  get actualTileCount() {
    return Object.keys(this.dataSource).reduce((acc, page) => acc + this.dataSource[page].length, 0);
  }
  goToPage(pageNumber) {
    this.initialPageNumber = pageNumber;
    this.pagesToRender = pageNumber;
    this.scrollToPage(pageNumber);
  }
  clearFilters() {
    this.selectedFacets = defaultSelectedFacets;
    this.sortParam = null;
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = null;
    this.titleQuery = void 0;
    this.creatorQuery = void 0;
    this.selectedSort = SortField.relevance;
    this.sortDirection = null;
  }
  render() {
    return $$4`
      <div id="content-container" class=${this.mobileView ? "mobile" : ""}>
        <div id="left-column" class="column">
          <div id="mobile-header-container">
            ${this.mobileView ? $$4`
                  <div id="mobile-filter-collapse">
                    <h1
                      @click=${() => {
      this.mobileFacetsVisible = !this.mobileFacetsVisible;
    }}
                      @keyup=${() => {
      this.mobileFacetsVisible = !this.mobileFacetsVisible;
    }}
                    >
                      <span
                        class="collapser ${this.mobileFacetsVisible ? "open" : ""}"
                      >
                        ${chevronIcon}
                      </span>
                      Filters
                    </h1>
                  </div>
                ` : w$4}
            <div id="results-total">
              <span id="big-results-count"
                >${this.totalResults !== void 0 ? this.totalResults.toLocaleString() : "-"}</span
              >
              <span id="big-results-label">Results</span>
            </div>
          </div>
          <div
            id="facets-container"
            class=${!this.mobileView || this.mobileFacetsVisible ? "expanded" : ""}
          >
            ${this.facetsTemplate}
          </div>
        </div>
        <div id="right-column" class="column">
          ${this.searchResultsLoading ? this.loadingTemplate : w$4}
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

          ${this.displayMode === `list-compact` ? this.listHeaderTemplate : w$4}
          ${!this.searchResultsLoading && this.totalResults === 0 ? $$4`
                <h2>
                  Your search did not match any items in the Archive. Try
                  different keywords or a more general search.
                </h2>
              ` : w$4}

          <infinite-scroller
            class="${l$8(this.displayMode)}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `;
  }
  userChangedSort(e2) {
    var _a;
    const { selectedSort, sortDirection } = e2.detail;
    this.selectedSort = selectedSort;
    this.sortDirection = sortDirection;
    if (((_a = this.currentPage) !== null && _a !== void 0 ? _a : 1) > 1) {
      this.goToPage(1);
    }
    this.currentPage = 1;
  }
  selectedSortChanged() {
    if (this.selectedSort === "relevance" || this.sortDirection === null) {
      this.sortParam = null;
      return;
    }
    const sortField = SortFieldToMetadataField[this.selectedSort];
    if (!sortField)
      return;
    this.sortParam = { field: sortField, direction: this.sortDirection };
  }
  displayModeChanged(e2) {
    this.displayMode = e2.detail.displayMode;
  }
  selectedTitleLetterChanged() {
    this.titleQuery = this.selectedTitleFilter ? `firstTitle:${this.selectedTitleFilter}` : void 0;
  }
  selectedCreatorLetterChanged() {
    this.creatorQuery = this.selectedCreatorFilter ? `firstCreator:${this.selectedCreatorFilter}` : void 0;
  }
  titleLetterSelected(e2) {
    this.selectedCreatorFilter = null;
    this.selectedTitleFilter = e2.detail.selectedLetter;
  }
  creatorLetterSelected(e2) {
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = e2.detail.selectedLetter;
  }
  get facetDataLoading() {
    return this.facetsLoading || this.fullYearAggregationLoading;
  }
  get facetsTemplate() {
    return $$4`
      ${this.facetsLoading ? this.loadingTemplate : w$4}
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
    `;
  }
  get loadingTemplate() {
    return $$4`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `;
  }
  get listHeaderTemplate() {
    return $$4`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${"list-header"}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
        >
        </tile-dispatcher>
      </div>
    `;
  }
  get queryDebuggingTemplate() {
    var _a, _b;
    return $$4`
      <div>
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Sort Filter Query: ${this.sortFilterQueries}</li>
          <li>Date Range Query: ${this.dateRangeQueryClause}</li>
          <li>Sort: ${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field} ${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>
    `;
  }
  histogramDateRangeUpdated(e2) {
    const { minDate, maxDate } = e2.detail;
    this.dateRangeQueryClause = `year:[${minDate} TO ${maxDate}]`;
  }
  firstUpdated() {
    this.setupStateRestorationObserver();
    this.restoreState();
  }
  updated(changed) {
    if (changed.has("displayMode") || changed.has("baseNavigationUrl") || changed.has("baseImageUrl")) {
      this.infiniteScroller.reload();
    }
    if (changed.has("baseQuery")) {
      this.emitBaseQueryChanged();
    }
    if (changed.has("currentPage") || changed.has("displayMode")) {
      this.persistState();
    }
    if (changed.has("baseQuery") || changed.has("titleQuery") || changed.has("creatorQuery") || changed.has("dateRangeQueryClause") || changed.has("sortParam") || changed.has("selectedFacets") || changed.has("searchService")) {
      this.handleQueryChange();
    }
    if (changed.has("selectedSort") || changed.has("sortDirection")) {
      this.selectedSortChanged();
    }
    if (changed.has("selectedTitleFilter")) {
      this.selectedTitleLetterChanged();
    }
    if (changed.has("selectedCreatorFilter")) {
      this.selectedCreatorLetterChanged();
    }
    if (changed.has("pagesToRender")) {
      if (!this.endOfDataReached) {
        this.infiniteScroller.itemCount = this.estimatedTileCount;
      }
    }
    if (changed.has("resizeObserver")) {
      const oldObserver = changed.get("resizeObserver");
      if (oldObserver)
        this.disconnectResizeObserver(oldObserver);
      this.setupResizeObserver();
    }
  }
  disconnectedCallback() {
    if (this.resizeObserver) {
      this.disconnectResizeObserver(this.resizeObserver);
    }
    if (this.boundNavigationHandler) {
      window.removeEventListener("popstate", this.boundNavigationHandler);
    }
  }
  handleResize(entry) {
    if (entry.target === this.contentContainer) {
      this.mobileView = entry.contentRect.width < 600;
    }
  }
  emitBaseQueryChanged() {
    this.dispatchEvent(new CustomEvent("baseQueryChanged", {
      detail: {
        baseQuery: this.baseQuery
      }
    }));
  }
  disconnectResizeObserver(resizeObserver) {
    resizeObserver.removeObserver({
      target: this.contentContainer,
      handler: this
    });
  }
  setupResizeObserver() {
    if (!this.resizeObserver)
      return;
    this.resizeObserver.addObserver({
      target: this.contentContainer,
      handler: this
    });
  }
  visibleCellsChanged(e2) {
    if (this.isScrollingToCell)
      return;
    const { visibleCellIndices } = e2.detail;
    if (visibleCellIndices.length === 0)
      return;
    const lastVisibleCellIndex = visibleCellIndices[visibleCellIndices.length - 1];
    const lastVisibleCellPage = Math.floor(lastVisibleCellIndex / this.pageSize) + 1;
    if (this.currentPage !== lastVisibleCellPage) {
      this.currentPage = lastVisibleCellPage;
    }
    const event = new CustomEvent("visiblePageChanged", {
      detail: {
        pageNumber: lastVisibleCellPage
      }
    });
    this.dispatchEvent(event);
  }
  async handleQueryChange() {
    if (!this.searchService || this.pageFetchQueryKey === this.previousQueryKey)
      return;
    this.previousQueryKey = this.pageFetchQueryKey;
    this.dataSource = {};
    this.pageFetchesInProgress = {};
    this.endOfDataReached = false;
    this.pagesToRender = this.initialPageNumber;
    if (!this.initialQueryChangeHappened && this.initialPageNumber > 1) {
      this.scrollToPage(this.initialPageNumber);
    }
    this.initialQueryChangeHappened = true;
    if (!this.historyPopOccurred) {
      this.persistState();
      this.historyPopOccurred = false;
    }
    await Promise.all([
      this.doInitialPageFetch(),
      this.fetchFacets(),
      this.fetchFullYearHistogram()
    ]);
  }
  setupStateRestorationObserver() {
    if (this.boundNavigationHandler)
      return;
    this.boundNavigationHandler = this.historyNavigationHandler.bind(this);
    window.addEventListener("popstate", this.boundNavigationHandler);
  }
  historyNavigationHandler() {
    this.historyPopOccurred = true;
    this.restoreState();
  }
  restoreState() {
    var _a, _b, _c, _d, _e, _f;
    const restorationState = this.restorationStateHandler.getRestorationState();
    this.displayMode = restorationState.displayMode;
    this.selectedSort = (_a = restorationState.selectedSort) !== null && _a !== void 0 ? _a : SortField.relevance;
    this.sortDirection = (_b = restorationState.sortDirection) !== null && _b !== void 0 ? _b : null;
    this.selectedTitleFilter = (_c = restorationState.selectedTitleFilter) !== null && _c !== void 0 ? _c : null;
    this.selectedCreatorFilter = (_d = restorationState.selectedCreatorFilter) !== null && _d !== void 0 ? _d : null;
    this.selectedFacets = restorationState.selectedFacets;
    this.baseQuery = restorationState.baseQuery;
    this.titleQuery = restorationState.titleQuery;
    this.creatorQuery = restorationState.creatorQuery;
    this.dateRangeQueryClause = restorationState.dateRangeQueryClause;
    this.sortParam = (_e = restorationState.sortParam) !== null && _e !== void 0 ? _e : null;
    this.currentPage = (_f = restorationState.currentPage) !== null && _f !== void 0 ? _f : 1;
    this.minSelectedDate = restorationState.minSelectedDate;
    this.maxSelectedDate = restorationState.maxSelectedDate;
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage);
    }
  }
  persistState() {
    var _a, _b, _c, _d, _e;
    const restorationState = {
      displayMode: this.displayMode,
      sortParam: (_a = this.sortParam) !== null && _a !== void 0 ? _a : void 0,
      selectedSort: this.selectedSort,
      sortDirection: (_b = this.sortDirection) !== null && _b !== void 0 ? _b : void 0,
      selectedFacets: (_c = this.selectedFacets) !== null && _c !== void 0 ? _c : defaultSelectedFacets,
      baseQuery: this.baseQuery,
      currentPage: this.currentPage,
      dateRangeQueryClause: this.dateRangeQueryClause,
      titleQuery: this.titleQuery,
      creatorQuery: this.creatorQuery,
      minSelectedDate: this.minSelectedDate,
      maxSelectedDate: this.maxSelectedDate,
      selectedTitleFilter: (_d = this.selectedTitleFilter) !== null && _d !== void 0 ? _d : void 0,
      selectedCreatorFilter: (_e = this.selectedCreatorFilter) !== null && _e !== void 0 ? _e : void 0
    };
    this.restorationStateHandler.persistState(restorationState);
  }
  async doInitialPageFetch() {
    this.searchResultsLoading = true;
    await this.fetchPage(this.initialPageNumber);
    this.searchResultsLoading = false;
  }
  get fullQuery() {
    let { fullQueryWithoutDate } = this;
    const { dateRangeQueryClause } = this;
    if (dateRangeQueryClause) {
      fullQueryWithoutDate += ` AND ${dateRangeQueryClause}`;
    }
    return fullQueryWithoutDate;
  }
  get fullQueryWithoutDate() {
    if (!this.baseQuery)
      return void 0;
    let fullQuery = this.baseQuery;
    const { facetQuery, sortFilterQueries } = this;
    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (sortFilterQueries) {
      fullQuery += ` AND ${sortFilterQueries}`;
    }
    return fullQuery;
  }
  get facetQuery() {
    if (!this.selectedFacets)
      return void 0;
    const facetQuery = [];
    for (const [facetName, facetValues] of Object.entries(this.selectedFacets)) {
      const facetEntries = Object.entries(facetValues);
      if (facetEntries.length === 0)
        continue;
      const facetValuesArray = [];
      for (const [key, facetState] of facetEntries) {
        const plusMinusPrefix = facetState === "hidden" ? "-" : "";
        if (facetName === "language") {
          const languages = this.languageCodeHandler.getCodeArrayFromCodeString(key);
          for (const language of languages) {
            facetValuesArray.push(`${plusMinusPrefix}"${language}"`);
          }
        } else {
          facetValuesArray.push(`${plusMinusPrefix}"${key}"`);
        }
      }
      const valueQuery = facetValuesArray.join(` OR `);
      facetQuery.push(`${facetName}:(${valueQuery})`);
    }
    return facetQuery.length > 0 ? `(${facetQuery.join(" AND ")})` : void 0;
  }
  facetsChanged(e2) {
    this.selectedFacets = e2.detail;
  }
  async fetchFacets() {
    var _a, _b;
    if (!this.fullQuery)
      return;
    const aggregations = {
      advancedParams: [
        {
          field: "subjectSorter",
          size: 6
        },
        {
          field: "mediatypeSorter",
          size: 6
        },
        {
          field: "languageSorter",
          size: 6
        },
        {
          field: "creatorSorter",
          size: 6
        },
        {
          field: "collection",
          size: 12
        },
        {
          field: "year",
          size: 50
        }
      ]
    };
    const params = {
      query: this.fullQuery,
      fields: ["identifier"],
      aggregations,
      rows: 1
    };
    this.facetsLoading = true;
    const results = await ((_a = this.searchService) === null || _a === void 0 ? void 0 : _a.search(params));
    this.facetsLoading = false;
    this.aggregations = (_b = results === null || results === void 0 ? void 0 : results.success) === null || _b === void 0 ? void 0 : _b.response.aggregations;
  }
  get fullQueryNoDateKey() {
    var _a, _b;
    return `${this.fullQueryWithoutDate}-${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field}-${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}`;
  }
  async fetchFullYearHistogram() {
    var _a, _b, _c, _d;
    const { fullQueryNoDateKey } = this;
    if (!this.fullQueryWithoutDate || fullQueryNoDateKey === this.previousFullQueryNoDate)
      return;
    this.previousFullQueryNoDate = fullQueryNoDateKey;
    const aggregations = {
      simpleParams: ["year"]
    };
    const params = {
      query: this.fullQueryWithoutDate,
      fields: ["identifier"],
      aggregations,
      rows: 1
    };
    this.fullYearAggregationLoading = true;
    const results = await ((_a = this.searchService) === null || _a === void 0 ? void 0 : _a.search(params));
    this.fullYearAggregationLoading = false;
    this.fullYearsHistogramAggregation = (_d = (_c = (_b = results === null || results === void 0 ? void 0 : results.success) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.aggregations) === null || _d === void 0 ? void 0 : _d.year_histogram;
  }
  scrollToPage(pageNumber) {
    const cellIndexToScrollTo = this.pageSize * (pageNumber - 1);
    setTimeout(() => {
      this.isScrollingToCell = true;
      this.infiniteScroller.scrollToCell(cellIndexToScrollTo, true);
      setTimeout(() => {
        this.isScrollingToCell = false;
        this.infiniteScroller.reload();
      }, 500);
    }, 0);
  }
  get pageFetchQueryKey() {
    var _a, _b;
    return `${this.fullQuery}-${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field}-${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}`;
  }
  async fetchPage(pageNumber) {
    var _a, _b, _c, _d, _e;
    if (!this.fullQuery)
      return;
    if (this.dataSource[pageNumber])
      return;
    if (this.endOfDataReached)
      return;
    const { pageFetchQueryKey } = this;
    const pageFetches = (_a = this.pageFetchesInProgress[pageFetchQueryKey]) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new Set();
    if (pageFetches.has(pageNumber))
      return;
    pageFetches.add(pageNumber);
    this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;
    const sortParams = this.sortParam ? [this.sortParam] : [];
    const params = {
      query: this.fullQuery,
      fields: [
        "addeddate",
        "avg_rating",
        "collections_raw",
        "creator",
        "date",
        "description",
        "downloads",
        "identifier",
        "issue",
        "item_count",
        "mediatype",
        "num_favorites",
        "num_reviews",
        "publicdate",
        "reviewdate",
        "source",
        "subject",
        "title",
        "volume"
      ],
      page: pageNumber,
      rows: this.pageSize,
      sort: sortParams
    };
    const results = await ((_b = this.searchService) === null || _b === void 0 ? void 0 : _b.search(params));
    const success = results === null || results === void 0 ? void 0 : results.success;
    if (!success)
      return;
    this.totalResults = success.response.numFound;
    const searchQuery = success.responseHeader.params.qin;
    const searchSort = success.responseHeader.params.sort;
    let sortChanged = false;
    if (!searchSort) {
      if (this.sortParam) {
        sortChanged = true;
      }
    } else {
      const split = searchSort.split(" ");
      if (split.length > 1) {
        const field = searchSort.split(" ")[0];
        const direction = searchSort.split(" ")[1];
        if (field !== ((_c = this.sortParam) === null || _c === void 0 ? void 0 : _c.field) || direction !== ((_d = this.sortParam) === null || _d === void 0 ? void 0 : _d.direction)) {
          sortChanged = true;
        }
      }
    }
    const queryChangedSinceFetch = searchQuery !== this.fullQuery || sortChanged;
    if (queryChangedSinceFetch)
      return;
    const { docs } = success.response;
    if (docs && docs.length > 0) {
      this.preloadCollectionNames(docs);
      this.updateDataSource(pageNumber, docs);
    }
    if (docs.length < this.pageSize) {
      this.endOfDataReached = true;
      this.infiniteScroller.itemCount = this.actualTileCount;
    }
    (_e = this.pageFetchesInProgress[pageFetchQueryKey]) === null || _e === void 0 ? void 0 : _e.delete(pageNumber);
    this.searchResultsLoading = false;
  }
  preloadCollectionNames(docs) {
    var _a;
    const collectionIds = docs.map((doc) => {
      var _a2;
      return (_a2 = doc.collections_raw) === null || _a2 === void 0 ? void 0 : _a2.values;
    }).flat();
    const collectionIdsArray = Array.from(new Set(collectionIds));
    (_a = this.collectionNameCache) === null || _a === void 0 ? void 0 : _a.preloadIdentifiers(collectionIdsArray);
  }
  get currentVisiblePageNumbers() {
    const visibleCells = this.infiniteScroller.getVisibleCellIndices();
    const visiblePages = /* @__PURE__ */ new Set();
    visibleCells.forEach((cellIndex) => {
      const visiblePage = Math.floor(cellIndex / this.pageSize) + 1;
      visiblePages.add(visiblePage);
    });
    return Array.from(visiblePages);
  }
  updateDataSource(pageNumber, docs) {
    const datasource = __spreadValues({}, this.dataSource);
    const tiles = [];
    docs === null || docs === void 0 ? void 0 : docs.forEach((doc) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
      if (!doc.identifier)
        return;
      let loginRequired = false;
      let contentWarning = false;
      if (((_a = doc.collections_raw) === null || _a === void 0 ? void 0 : _a.values) && ((_b = doc.mediatype) === null || _b === void 0 ? void 0 : _b.value) !== "collection") {
        for (const collection of (_c = doc.collections_raw) === null || _c === void 0 ? void 0 : _c.values) {
          if (collection === "loggedin") {
            loginRequired = true;
            if (contentWarning)
              break;
          }
          if (collection === "no-preview") {
            contentWarning = true;
            if (loginRequired)
              break;
          }
        }
      }
      tiles.push({
        averageRating: (_d = doc.avg_rating) === null || _d === void 0 ? void 0 : _d.value,
        collections: (_f = (_e = doc.collections_raw) === null || _e === void 0 ? void 0 : _e.values) !== null && _f !== void 0 ? _f : [],
        commentCount: (_h = (_g = doc.num_reviews) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0,
        creator: (_j = doc.creator) === null || _j === void 0 ? void 0 : _j.value,
        creators: (_l = (_k = doc.creator) === null || _k === void 0 ? void 0 : _k.values) !== null && _l !== void 0 ? _l : [],
        dateAdded: (_m = doc.addeddate) === null || _m === void 0 ? void 0 : _m.value,
        dateArchived: (_o = doc.publicdate) === null || _o === void 0 ? void 0 : _o.value,
        datePublished: (_p = doc.date) === null || _p === void 0 ? void 0 : _p.value,
        dateReviewed: (_q = doc.reviewdate) === null || _q === void 0 ? void 0 : _q.value,
        description: (_r = doc.description) === null || _r === void 0 ? void 0 : _r.value,
        favCount: (_t = (_s = doc.num_favorites) === null || _s === void 0 ? void 0 : _s.value) !== null && _t !== void 0 ? _t : 0,
        identifier: doc.identifier,
        issue: (_u = doc.issue) === null || _u === void 0 ? void 0 : _u.value,
        itemCount: (_w = (_v = doc.item_count) === null || _v === void 0 ? void 0 : _v.value) !== null && _w !== void 0 ? _w : 0,
        mediatype: (_y = (_x = doc.mediatype) === null || _x === void 0 ? void 0 : _x.value) !== null && _y !== void 0 ? _y : "data",
        source: (_z = doc.source) === null || _z === void 0 ? void 0 : _z.value,
        subjects: (_1 = (_0 = doc.subject) === null || _0 === void 0 ? void 0 : _0.values) !== null && _1 !== void 0 ? _1 : [],
        title: this.etreeTitle((_2 = doc.title) === null || _2 === void 0 ? void 0 : _2.value, (_3 = doc.mediatype) === null || _3 === void 0 ? void 0 : _3.value, (_4 = doc.collection) === null || _4 === void 0 ? void 0 : _4.values),
        volume: (_5 = doc.volume) === null || _5 === void 0 ? void 0 : _5.value,
        viewCount: (_7 = (_6 = doc.downloads) === null || _6 === void 0 ? void 0 : _6.value) !== null && _7 !== void 0 ? _7 : 0,
        loginRequired,
        contentWarning
      });
    });
    datasource[pageNumber] = tiles;
    this.dataSource = datasource;
    const visiblePages = this.currentVisiblePageNumbers;
    const needsReload = visiblePages.includes(pageNumber);
    if (needsReload) {
      this.infiniteScroller.reload();
    }
  }
  etreeTitle(title, mediatype, collections) {
    if (mediatype === "etree" || (collections === null || collections === void 0 ? void 0 : collections.includes("etree"))) {
      const regex = /^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/;
      const newTitle = title === null || title === void 0 ? void 0 : title.replace(regex, "$3: $2");
      if (newTitle) {
        return `${newTitle}`;
      }
    }
    return title !== null && title !== void 0 ? title : "";
  }
  cellForIndex(index) {
    const model = this.tileModelAtCellIndex(index);
    if (!model)
      return void 0;
    return $$4` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .baseImageUrl=${this.baseImageUrl}
      .model=${model}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`;
  }
  scrollThresholdReached() {
    this.pagesToRender += 1;
    this.fetchPage(this.pagesToRender);
  }
};
CollectionBrowser.styles = r$9`
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
  `;
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "baseNavigationUrl", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "baseImageUrl", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "searchService", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "baseQuery", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "displayMode", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "sortParam", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "selectedSort", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "selectedTitleFilter", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "selectedCreatorFilter", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "sortDirection", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "dateRangeQueryClause", void 0);
__decorate([
  e$f({ type: Number })
], CollectionBrowser.prototype, "pageSize", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "resizeObserver", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "titleQuery", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "creatorQuery", void 0);
__decorate([
  e$f({ type: Number })
], CollectionBrowser.prototype, "currentPage", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "minSelectedDate", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "maxSelectedDate", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "selectedFacets", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionBrowser.prototype, "showHistogramDatePicker", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "collectionNameCache", void 0);
__decorate([
  e$f({ type: String })
], CollectionBrowser.prototype, "pageContext", void 0);
__decorate([
  e$f({ type: Object })
], CollectionBrowser.prototype, "restorationStateHandler", void 0);
__decorate([
  e$f({ type: Number })
], CollectionBrowser.prototype, "mobileBreakpoint", void 0);
__decorate([
  e$f({ type: Boolean })
], CollectionBrowser.prototype, "loggedIn", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "pagesToRender", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "searchResultsLoading", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "facetsLoading", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "fullYearAggregationLoading", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "aggregations", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "fullYearsHistogramAggregation", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "totalResults", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "mobileView", void 0);
__decorate([
  t$b()
], CollectionBrowser.prototype, "mobileFacetsVisible", void 0);
__decorate([
  i$d("#content-container")
], CollectionBrowser.prototype, "contentContainer", void 0);
__decorate([
  i$d("infinite-scroller")
], CollectionBrowser.prototype, "infiniteScroller", void 0);
CollectionBrowser = __decorate([
  n$g("collection-browser")
], CollectionBrowser);
let AppRoot = class AppRoot2 extends s$e {
  constructor() {
    super(...arguments);
    this.searchService = SearchService.default;
    this.resizeObserver = new SharedResizeObserver();
    this.localCache = new LocalCache();
    this.collectionNameCache = new CollectionNameCache({
      searchService: this.searchService,
      localCache: this.localCache
    });
    this.cellWidth = 18;
    this.cellHeight = 29;
    this.rowGap = 1.7;
    this.colGap = 1.7;
    this.loggedIn = false;
  }
  searchPressed(e2) {
    var _a, _b;
    e2.preventDefault();
    this.searchQuery = this.baseQueryField.value;
    if (((_a = this.currentPage) !== null && _a !== void 0 ? _a : 1) > 1) {
      this.collectionBrowser.goToPage((_b = this.currentPage) !== null && _b !== void 0 ? _b : 1);
    }
  }
  changePagePressed(e2) {
    e2.preventDefault();
    this.currentPage = this.pageNumberInput.valueAsNumber;
    this.collectionBrowser.goToPage(this.currentPage);
  }
  updated(changed) {
    if (changed.has("currentPage") && this.currentPage) {
      this.pageNumberInput.value = this.currentPage.toString();
    }
    if (changed.has("searchQuery")) {
      this.queryUpdated();
    }
  }
  queryUpdated() {
    this.collectionBrowser.baseQuery = this.searchQuery;
  }
  render() {
    var _a;
    return $$4`
      <div id="dev-tools">
        <form @submit=${this.searchPressed}>
          Query:
          <input
            type="text"
            id="base-query-field"
            .value=${(_a = this.searchQuery) !== null && _a !== void 0 ? _a : ""}
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
          .showHistogramDatePicker=${true}
          .loggedIn=${this.loggedIn}
          @visiblePageChanged=${this.visiblePageChanged}
          @baseQueryChanged=${this.baseQueryChanged}
        >
        </collection-browser>
      </div>
    `;
  }
  baseQueryChanged(e2) {
    this.searchQuery = e2.detail.baseQuery;
  }
  loginChanged(e2) {
    const target = e2.target;
    if (target.checked) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }
  outlineChanged(e2) {
    const target = e2.target;
    if (target.checked) {
      this.collectionBrowser.style.setProperty("--infiniteScrollerCellOutline", "1px solid #33D1FF");
    } else {
      this.collectionBrowser.style.removeProperty("--infiniteScrollerCellOutline");
    }
  }
  rowGapChanged(e2) {
    const input = e2.target;
    this.rowGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty("--collectionBrowserRowGap", `${input.value}rem`);
  }
  colGapChanged(e2) {
    const input = e2.target;
    this.colGap = parseFloat(input.value);
    this.collectionBrowser.style.setProperty("--collectionBrowserColGap", `${input.value}rem`);
  }
  widthChanged(e2) {
    const input = e2.target;
    this.cellWidth = parseFloat(input.value);
    this.collectionBrowser.style.setProperty("--collectionBrowserCellMinWidth", `${input.value}rem`);
  }
  heightChanged(e2) {
    const input = e2.target;
    this.cellHeight = parseFloat(input.value);
    this.collectionBrowser.style.setProperty("--collectionBrowserCellMinHeight", `${input.value}rem`);
    this.collectionBrowser.style.setProperty("--collectionBrowserCellMaxHeight", `${input.value}rem`);
  }
  visiblePageChanged(e2) {
    const { pageNumber } = e2.detail;
    if (pageNumber === this.currentPage)
      return;
    this.currentPage = pageNumber;
  }
};
AppRoot.styles = r$9`
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
  `;
__decorate([
  t$b()
], AppRoot.prototype, "currentPage", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "searchQuery", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "cellWidth", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "cellHeight", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "rowGap", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "colGap", void 0);
__decorate([
  t$b()
], AppRoot.prototype, "loggedIn", void 0);
__decorate([
  i$d("#base-query-field")
], AppRoot.prototype, "baseQueryField", void 0);
__decorate([
  i$d("#page-number-input")
], AppRoot.prototype, "pageNumberInput", void 0);
__decorate([
  i$d("collection-browser")
], AppRoot.prototype, "collectionBrowser", void 0);
AppRoot = __decorate([
  n$g("app-root")
], AppRoot);
