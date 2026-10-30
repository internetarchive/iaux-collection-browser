import { modelLibraryUrl } from './model';
/**
 * Checks that every name the config uses exists in the manifest, and that
 * the manifest is a format this code reads. Throws one error listing every
 * problem, so a rebuild that renames a flag or drops a column fails loudly
 * instead of quietly showing empty facets.
 *
 * Problems inside one id space or search start with its key ("theses:",
 * "meaning:").
 */
export function checkConfig(manifest, config) {
    // A manifest in another format can't be read for the config's names.
    const problems = manifest.format === 'ia-static-index' && manifest.formatVersion === 2
        ? [...manifestProblems(manifest), ...configProblems(manifest, config)]
        : [`unknown format ${manifest.format} v${manifest.formatVersion}`];
    if (problems.length) {
        throw new Error(`Static index config:\n- ${problems.join('\n- ')}`);
    }
}
function manifestProblems(manifest) {
    const problems = [];
    for (const [key, space] of Object.entries(manifest.idSpaces)) {
        const found = [...fileSetProblems(space.files), ...idSpaceProblems(space)];
        problems.push(...found.map(p => `${key}: ${p}`));
    }
    for (const [key, search] of Object.entries(manifest.searches)) {
        const space = manifest.idSpaces[search.ids];
        const found = [
            ...fileSetProblems(search.files),
            ...(space
                ? search.kind === 'text'
                    ? textProblems(search, space)
                    : vectorProblems(search)
                : [`no id space "${search.ids}"`]),
        ];
        problems.push(...found.map(p => `${key}: ${p}`));
    }
    const versions = [
        ...Object.values(manifest.idSpaces).map(space => space.files),
        ...Object.values(manifest.searches).map(search => search.files),
    ].flatMap(files => (files.naming === 'versioned' ? [files.version] : []));
    if (manifest.previous !== undefined && versions.includes(manifest.previous)) {
        problems.push(`previous "${manifest.previous}" is this build's own version, so it can't be fallen back to`);
    }
    return problems;
}
function fileSetProblems(files) {
    // A '/', '?' or '#' would change what the url names, not just its end.
    return files.naming === 'versioned' &&
        files.suffix !== undefined &&
        !/^\.[A-Za-z0-9.]+$/.test(files.suffix)
        ? [`file suffix "${files.suffix}" isn't an extension like ".json"`]
        : [];
}
function idSpaceProblems(space) {
    const problems = [];
    const roles = space.records.fields.flatMap(field => field.role ? [field.role] : []);
    for (const role of duplicates(roles)) {
        problems.push(`record role "${role}" is used more than once`);
    }
    for (const name of duplicates([
        ...(space.facets?.columns.map(column => column.key) ?? []),
        ...(space.docValues ?? []).map(values => values.key),
    ])) {
        problems.push(`facet column or doc value "${name}" is used more than once`);
    }
    return problems;
}
function textProblems(search, space) {
    const problems = [];
    const { fields } = search.text;
    for (const [what, names] of [
        ['field key', fields.map(field => field.key)],
        ['field prefix', fields.map(field => field.prefix)],
        ['alias', fields.flatMap(field => field.aliases ?? [])],
    ]) {
        for (const name of duplicates(names)) {
            problems.push(`${what} "${name}" is used more than once`);
        }
    }
    const keys = new Set(fields.map(field => field.key));
    problems.push(...rankingProblems(search.text.ranking, keys, 'manifest'));
    const aliases = new Set(fields.flatMap(field => field.aliases ?? []));
    for (const values of space.docValues ?? []) {
        for (const word of values.lookup?.queryFields ?? []) {
            if (!aliases.has(word)) {
                problems.push(`doc value ${values.key}: query field "${word}" searches no text field`);
            }
        }
    }
    return problems;
}
function vectorProblems(search) {
    const problems = [];
    const { dim, cells, codes, settings, model } = search;
    if (cells.rowBytes !== 4 + dim * 2) {
        problems.push(`cells: ${cells.rowBytes}-byte rows aren't an id and ${dim} halfs`);
    }
    if (codes && codes.rowBytes !== 4 + (dim * codes.bits) / 8) {
        problems.push(`codes: ${codes.rowBytes}-byte rows aren't an id and ${dim} ${codes.bits}-bit codes`);
    }
    if (codes && codes.file === search.facets?.file) {
        problems.push(`codes and facets are both "${codes.file}"`);
    }
    if (search.facets) {
        for (const name of duplicates(search.facets.columns.map(c => c.key))) {
            problems.push(`facet column "${name}" is used more than once`);
        }
    }
    problems.push(...settingsProblems(settings, cells.count, 'manifest'));
    if (!modelLibraryUrl(model.library)) {
        const { name, version } = model.library;
        problems.push(`model: no pinned build of ${name} ${version}`);
    }
    if (!model.path.endsWith('/')) {
        problems.push(`model: path "${model.path}" doesn't end in "/"`);
    }
    return problems;
}
function settingsProblems(settings, cellCount, where) {
    const problems = [];
    const { nprobe, rerank } = settings ?? {};
    if (nprobe !== undefined &&
        !(Number.isInteger(nprobe) && nprobe >= 1 && nprobe <= cellCount)) {
        problems.push(`${where} settings: nprobe ${nprobe} isn't 1 to ${cellCount} cells`);
    }
    if (rerank !== undefined && !(Number.isInteger(rerank) && rerank >= 1)) {
        problems.push(`${where} settings: rerank ${rerank} isn't a count`);
    }
    return problems;
}
function configProblems(manifest, config) {
    const problems = [];
    for (const [key, searchConfig] of Object.entries(config.searches)) {
        const search = manifest.searches[key];
        const space = search && manifest.idSpaces[search.ids];
        if (!search) {
            problems.push(`${key}: the manifest has no search "${key}"`);
        }
        else if (space) {
            problems.push(...searchConfigProblems(searchConfig, search, space).map(p => `${key}: ${p}`));
        }
    }
    // Ids from different id spaces under one prefix would name two docs alike.
    const prefixes = new Map();
    for (const [key, { identifierPrefix }] of Object.entries(config.searches)) {
        const ids = manifest.searches[key]?.ids;
        const other = prefixes.get(identifierPrefix);
        if (other !== undefined && ids !== undefined && other !== ids) {
            problems.push(`identifier prefix "${identifierPrefix}" names ids in both ${other} and ${ids}`);
        }
        if (ids !== undefined)
            prefixes.set(identifierPrefix, ids);
    }
    return problems;
}
function searchConfigProblems(config, search, space) {
    const problems = [];
    if (search.kind === 'text') {
        const keys = new Set(search.text.fields.map(field => field.key));
        problems.push(...rankingProblems(config.ranking, keys, 'config'));
        if (config.settings) {
            problems.push('settings are for vector searches');
        }
    }
    else {
        problems.push(...settingsProblems(config.settings, search.cells.count, 'config'));
        if (config.ranking)
            problems.push('ranking is for text searches');
    }
    const { records } = space;
    const recordFields = new Set([
        ...records.fields.map(field => field.key),
        ...(records.overflow ?? []).map(overflow => overflow.field),
    ]);
    for (const [part, field] of Object.entries(config.hit)) {
        if (field !== undefined && !recordFields.has(field)) {
            problems.push(`hit ${part}: no record field "${field}"`);
        }
    }
    if (search.kind === 'text') {
        problems.push(...facetProblems(config.facets, space.facets, space.docValues ?? []));
    }
    else if (search.facets) {
        // A vector search's facets come by row, from its own facet rows. They're
        // a sidecar: without them results show with no facets, so that isn't a
        // problem with the config.
        problems.push(...facetProblems(config.facets, search.facets, []));
    }
    return problems;
}
function facetProblems(facets, rows, docValueList) {
    const problems = [];
    if (facets.length && !rows) {
        return ['facets configured, but the manifest has no facet rows'];
    }
    const columns = new Map((rows?.columns ?? []).map(column => [column.key, column]));
    const docValues = new Map(docValueList.map(values => [values.key, values]));
    const flags = new Set([...columns.values()].flatMap(column => column.kind === 'flags' ? Object.keys(column.bits) : []));
    const facetKeys = facets.map(facet => facet.key);
    for (const key of duplicates(facetKeys)) {
        problems.push(`facet "${key}" is configured more than once`);
    }
    for (const facet of facets) {
        const { from } = facet;
        const at = `facet ${facet.key}`;
        const values = 'column' in from ? docValues.get(from.column) : undefined;
        if (facet.names?.from === 'labels') {
            const { column, whenShared } = facet.names;
            if (!values) {
                problems.push(`${at}: labels names need a doc value column`);
            }
            else {
                for (const name of [column, whenShared]) {
                    if (name !== undefined && !values.labels.columns.includes(name)) {
                        problems.push(`${at}: no labels column "${name}"`);
                    }
                }
            }
        }
        if (values) {
            // A doc value: nothing more to check.
        }
        else if ('column' in from) {
            const column = columns.get(from.column);
            if (!column) {
                problems.push(`${at}: no facet column "${from.column}"`);
            }
            else if (column.kind === 'flags') {
                problems.push(`${at}: column "${from.column}" is flags; use \`flags\` or \`derived\``);
            }
        }
        else {
            const used = 'flags' in from
                ? from.flags
                : Object.values(from.derived).flatMap(flagsOf);
            for (const flag of new Set(used)) {
                if (!flags.has(flag))
                    problems.push(`${at}: no flag "${flag}"`);
            }
        }
        if (facet.after !== undefined &&
            !facetKeys.includes(facet.after) &&
            !columns.has(facet.after) &&
            !docValues.has(facet.after)) {
            problems.push(`${at}: after "${facet.after}", which isn't a facet`);
        }
    }
    return problems;
}
function rankingProblems(ranking, fieldKeys, where) {
    const named = [
        ...Object.keys(ranking?.fieldWeights ?? {}),
        ...Object.keys(ranking?.sameFieldBoost ?? {}),
    ];
    return [...new Set(named)]
        .filter(key => !fieldKeys.has(key))
        .map(key => `${where} ranking: no text field "${key}"`);
}
function flagsOf(rule) {
    if ('flag' in rule)
        return [rule.flag];
    if ('notFlag' in rule)
        return [rule.notFlag];
    return rule.anyFlag;
}
function duplicates(names) {
    const seen = new Set();
    const repeated = new Set();
    for (const name of names) {
        if (seen.has(name))
            repeated.add(name);
        seen.add(name);
    }
    return [...repeated];
}
