/**
 * The ETD query grammar: words are ORed by adjacency, AND/OR/NOT are
 * uppercase operators, parentheses group, "quoted text" is a phrase, and
 * field:value either searches one text field (title:, creator:, ...) or is a
 * filter on per-document facets (year:, country:, has:, ...).
 *
 * Ported from etd-search/search.html (page build p110). Same grammar as the
 * indexer's Python query parser.
 */
const FIELD_RE = /^(year|host|source|has|title|creator|author|abstract|institution|inst|country|orcid):(.+)$/;
const TEXT_FIELD_PREFIX = {
    title: 't:',
    creator: 'c:',
    author: 'c:',
    abstract: 'a:',
    institution: 'i:',
    inst: 'i:',
    orcid: 'o:',
};
/** field:* on these means "has this field", a facet filter. */
const HAS_FIELD = {
    title: 'title',
    abstract: 'abstract',
    institution: 'institution',
    inst: 'institution',
};
/**
 * Common institution names expanded for inst:/institution: queries, so
 * inst:mit also finds "Massachusetts Institute of Technology". Values are
 * token phrases as the tokenizer sees institution strings. Curated and
 * conservative upstream; ambiguous acronyms are deliberately left out.
 */
const INSTITUTION_ALIASES = {
    mit: ['massachusetts institute of technology'],
    rpi: ['rensselaer polytechnic institute'],
    caltech: ['california institute of technology'],
    cmu: ['carnegie mellon university'],
    jhu: ['johns hopkins university'],
    nyu: ['new york university'],
    ucla: ['university of california los angeles'],
    ucsd: ['university of california san diego'],
    ucsb: ['university of california santa barbara'],
    ucsf: ['university of california san francisco'],
    berkeley: ['university of california berkeley'],
    usc: ['university of southern california'],
    gatech: ['georgia institute of technology'],
    'virginia tech': ['virginia polytechnic institute'],
    tamu: ['texas a m university'],
    upenn: ['university of pennsylvania'],
    asu: ['arizona state university'],
    fsu: ['florida state university'],
    lsu: ['louisiana state university'],
    byu: ['brigham young university'],
    smu: ['southern methodist university'],
    wustl: ['washington university in st louis'],
    uiuc: [
        'university of illinois at urbana champaign',
        'university of illinois urbana champaign',
    ],
    ubc: ['university of british columbia'],
    uoft: ['university of toronto'],
    uwaterloo: ['university of waterloo'],
    ucl: ['university college london'],
    lse: ['london school of economics'],
    kcl: ['king s college london', 'kings college london'],
    icl: ['imperial college london'],
    eth: ['eth zürich', 'eth zurich', 'swiss federal institute of technology'],
    epfl: ['école polytechnique fédérale de lausanne'],
    tum: ['technische universität münchen', 'technical university of munich'],
    tudelft: ['delft university of technology', 'technische universiteit delft'],
    kuleuven: ['ku leuven', 'katholieke universiteit leuven'],
    unam: ['universidad nacional autónoma de méxico'],
    usp: ['universidade de são paulo'],
    ufrj: ['universidade federal do rio de janeiro'],
    unicamp: ['universidade estadual de campinas'],
    nus: ['national university of singapore'],
    kaist: ['korea advanced institute of science and technology'],
    anu: ['australian national university'],
    unsw: ['university of new south wales'],
    hku: ['university of hong kong'],
    pku: ['peking university'],
};
const ORCID_RE = /^\d{4}-\d{4}-\d{4}-\d{3}[\dXx]$/;
export function parseQuery(query, options = {}) {
    return new Parser(tokenizeQuery(query), options).parse();
}
/**
 * The `inst:`/`institution:` values in a query, unquoted, to look up in the
 * institution list before parsing. As the live page finds them, so a value
 * the tokenizer reads differently (`inst:mit)`) is looked up as written and
 * stays text.
 */
export function institutionValues(query) {
    const values = new Set();
    for (const match of query.matchAll(/(?:^|\s)(?:inst|institution):(?:"([^"]+)"|(\S+))/g)) {
        const value = match[1] ?? match[2];
        if (value && value !== '*')
            values.add(value);
    }
    return [...values];
}
export function tokenizeQuery(query) {
    const out = [];
    let i = 0;
    while (i < query.length) {
        const ch = query[i];
        if (/\s/.test(ch)) {
            i += 1;
        }
        else if (ch === '(' || ch === ')') {
            out.push(ch);
            i += 1;
        }
        else if (ch === '"') {
            let end = query.indexOf('"', i + 1);
            if (end < 0)
                end = query.length;
            out.push({ kind: 'phrase', text: query.slice(i + 1, end) });
            i = end + 1;
        }
        else {
            let j = i;
            while (j < query.length && !/[\s()"]/.test(query[j]))
                j += 1;
            let word = query.slice(i, j);
            i = j;
            // field:"quoted value" stays one token
            if (word.endsWith(':') && i < query.length && query[i] === '"') {
                const close = query.indexOf('"', i + 1);
                if (close >= 0) {
                    word += query.slice(i, close + 1);
                    i = close + 1;
                }
            }
            // field:[a TO b] stays one token
            if (/^\w+:\[/.test(word) && !word.includes(']')) {
                const close = query.indexOf(']', i);
                if (close >= 0) {
                    word += query.slice(i, close + 1);
                    i = close + 1;
                }
            }
            if (word === 'AND' || word === 'OR' || word === 'NOT') {
                out.push(word);
            }
            else {
                const field = FIELD_RE.exec(word);
                out.push(field
                    ? { kind: 'field', field: field[1], value: field[2] }
                    : { kind: 'term', text: word });
            }
        }
    }
    return out;
}
class Parser {
    constructor(tokens, options) {
        this.tokens = tokens;
        this.options = options;
        this.pos = 0;
        this.filters = [];
    }
    parse() {
        return { tree: this.expression(), filters: this.filters };
    }
    expression() {
        let left = this.unit();
        while (this.pos < this.tokens.length) {
            const token = this.tokens[this.pos];
            if (token === ')')
                break;
            let op = 'or';
            if (token === 'AND' || token === 'OR') {
                op = token === 'AND' ? 'and' : 'or';
                this.pos += 1;
                if (this.pos >= this.tokens.length)
                    break;
            }
            const right = this.unit();
            if (right === null)
                continue;
            if (right.op === 'notUnit') {
                if (right.node === null)
                    continue;
                if (left === null) {
                    left = { op: 'not', left: { op: 'all' }, right: right.node };
                }
                else if (left.op === 'notUnit') {
                    // NOT a NOT b: still waiting for something to subtract them from
                    left = {
                        op: 'notUnit',
                        node: left.node
                            ? { op: 'or', left: left.node, right: right.node }
                            : right.node,
                    };
                }
                else {
                    left = { op: 'not', left, right: right.node };
                }
                continue;
            }
            if (left === null) {
                left = right;
            }
            else if (left.op === 'notUnit') {
                // NOT a b reads as b NOT a. (The page itself throws on this shape.)
                left = left.node ? { op: 'not', left: right, right: left.node } : right;
            }
            else {
                left = { op, left, right };
            }
        }
        if (left !== null && left.op === 'notUnit') {
            return left.node !== null
                ? { op: 'not', left: null, right: left.node }
                : null;
        }
        return left;
    }
    unit() {
        while (this.pos < this.tokens.length) {
            const token = this.tokens[this.pos];
            if (token === 'NOT') {
                this.pos += 1;
                const before = this.filters.length;
                const negated = this.unit();
                // NOT field:value negates the filter itself
                if (negated === null && this.filters.length > before) {
                    this.filters[this.filters.length - 1].negated = true;
                    return null;
                }
                return {
                    op: 'notUnit',
                    node: negated !== null && negated.op === 'notUnit' ? null : negated,
                };
            }
            if (token === '(') {
                this.pos += 1;
                const inner = this.expression();
                if (this.pos < this.tokens.length && this.tokens[this.pos] === ')') {
                    this.pos += 1;
                }
                return inner;
            }
            if (typeof token === 'object') {
                this.pos += 1;
                if (token.kind === 'phrase')
                    return { op: 'phrase', text: token.text };
                if (token.kind === 'term')
                    return { op: 'term', text: token.text };
                return this.fieldUnit(token.field, token.value);
            }
            // a stray ')' or operator: skip it
            this.pos += 1;
        }
        return null;
    }
    fieldUnit(field, value) {
        const prefix = TEXT_FIELD_PREFIX[field];
        if (!prefix) {
            this.filters.push({ negated: false, field, value });
            return null;
        }
        const bare = unquote(value);
        if (prefix === 'o:') {
            // An ORCID iD is one identifier; unquoted, the tokenizer would split it
            // on the hyphens and OR four 4-digit groups.
            return ORCID_RE.test(bare)
                ? { op: 'phrase', text: bare, prefix }
                : { op: 'term', text: bare, prefix };
        }
        if (value === '*' && HAS_FIELD[field]) {
            this.filters.push({
                negated: false,
                field: 'has',
                value: HAS_FIELD[field],
            });
            return null;
        }
        if (prefix === 'i:' && this.options.institutions?.get(bare)?.size) {
            this.filters.push({ negated: false, field: 'inst', value: bare });
            return null;
        }
        if (prefix === 'i:') {
            const aliases = INSTITUTION_ALIASES[bare.toLowerCase()];
            if (aliases) {
                let node = textNode(bare, prefix);
                for (const alias of aliases) {
                    node = { op: 'or', left: node, right: textNode(alias, prefix) };
                }
                return node;
            }
        }
        if (value.startsWith('"') && value.endsWith('"')) {
            return { op: 'phrase', text: value.slice(1, -1), prefix };
        }
        return { op: 'term', text: value, prefix };
    }
}
function unquote(value) {
    return value.startsWith('"') && value.endsWith('"')
        ? value.slice(1, -1)
        : value;
}
function textNode(text, prefix) {
    return text.includes(' ')
        ? { op: 'phrase', text, prefix }
        : { op: 'term', text, prefix };
}
