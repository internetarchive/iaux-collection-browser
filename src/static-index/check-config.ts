import type {
  FacetColumn,
  FlagRule,
  StaticIndexManifest,
  StaticSearchConfig,
} from './manifest';

/**
 * Checks that every name the config uses exists in the manifest, and that
 * the manifest is a format this code reads. Throws one error listing every
 * problem, so a rebuild that renames a flag or drops a column fails loudly
 * instead of quietly showing empty facets.
 */
export function checkConfig(
  manifest: StaticIndexManifest,
  config: StaticSearchConfig,
): void {
  const problems = [
    ...manifestProblems(manifest),
    ...configProblems(manifest, config),
  ];
  if (problems.length) {
    throw new Error(`Static index config:\n- ${problems.join('\n- ')}`);
  }
}

function manifestProblems(manifest: StaticIndexManifest): string[] {
  const problems: string[] = [];
  if (manifest.format !== 'ia-static-index' || manifest.formatVersion !== 1) {
    problems.push(
      `unknown format ${manifest.format} v${manifest.formatVersion}`,
    );
  }

  const fields = manifest.text.fields;
  for (const [what, names] of [
    ['field key', fields.map(field => field.key)],
    ['field prefix', fields.map(field => field.prefix)],
    ['alias', fields.flatMap(field => field.aliases ?? [])],
    [
      'facet column or doc value',
      [
        ...(manifest.facets?.columns.map(column => column.key) ?? []),
        ...(manifest.docValues ?? []).map(values => values.key),
      ],
    ],
  ] as const) {
    for (const name of duplicates(names)) {
      problems.push(`${what} "${name}" is used more than once`);
    }
  }

  const keys = new Set(fields.map(field => field.key));
  problems.push(...rankingProblems(manifest.text.ranking, keys, 'manifest'));

  const aliases = new Set(fields.flatMap(field => field.aliases ?? []));
  for (const values of manifest.docValues ?? []) {
    for (const word of values.lookup?.queryFields ?? []) {
      if (!aliases.has(word)) {
        problems.push(
          `doc value ${values.key}: query field "${word}" searches no text field`,
        );
      }
    }
  }
  return problems;
}

function configProblems(
  manifest: StaticIndexManifest,
  config: StaticSearchConfig,
): string[] {
  const problems: string[] = [];
  const fieldKeys = new Set(manifest.text.fields.map(field => field.key));
  problems.push(...rankingProblems(config.ranking, fieldKeys, 'config'));

  const { records } = manifest;
  const recordFields = new Set([
    ...records.fields.map(field => field.key),
    ...(records.overflow ?? []).map(overflow => overflow.field),
  ]);
  for (const [part, field] of Object.entries(config.hit)) {
    if (field !== undefined && !recordFields.has(field)) {
      problems.push(`hit ${part}: no record field "${field}"`);
    }
  }

  if (config.facets.length && !manifest.facets) {
    problems.push('facets configured, but the manifest has no facet rows');
    return problems;
  }
  const columns = new Map<string, FacetColumn>(
    (manifest.facets?.columns ?? []).map(column => [column.key, column]),
  );
  const docValues = new Map(
    (manifest.docValues ?? []).map(values => [values.key, values]),
  );
  const flags = new Set(
    [...columns.values()].flatMap(column =>
      column.kind === 'flags' ? Object.keys(column.bits) : [],
    ),
  );
  const facetKeys = config.facets.map(facet => facet.key);
  for (const key of duplicates(facetKeys)) {
    problems.push(`facet "${key}" is configured more than once`);
  }

  for (const facet of config.facets) {
    const { from } = facet;
    const at = `facet ${facet.key}`;
    const values = 'column' in from ? docValues.get(from.column) : undefined;
    if (facet.names?.from === 'labels') {
      const { column, whenShared } = facet.names;
      if (!values) {
        problems.push(`${at}: labels names need a doc value column`);
      } else {
        for (const name of [column, whenShared]) {
          if (name !== undefined && !values.labels.columns.includes(name)) {
            problems.push(`${at}: no labels column "${name}"`);
          }
        }
      }
    }
    if (values) {
      // A doc value: nothing more to check.
    } else if ('column' in from) {
      const column = columns.get(from.column);
      if (!column) {
        problems.push(`${at}: no facet column "${from.column}"`);
      } else if (column.kind === 'flags') {
        problems.push(
          `${at}: column "${from.column}" is flags; use \`flags\` or \`derived\``,
        );
      }
    } else {
      const used =
        'flags' in from
          ? from.flags
          : Object.values(from.derived).flatMap(flagsOf);
      for (const flag of new Set(used)) {
        if (!flags.has(flag)) problems.push(`${at}: no flag "${flag}"`);
      }
    }
    if (
      facet.after !== undefined &&
      !facetKeys.includes(facet.after) &&
      !columns.has(facet.after) &&
      !docValues.has(facet.after)
    ) {
      problems.push(`${at}: after "${facet.after}", which isn't a facet`);
    }
  }
  return problems;
}

function rankingProblems(
  ranking: Partial<StaticIndexManifest['text']['ranking']> | undefined,
  fieldKeys: ReadonlySet<string>,
  where: string,
): string[] {
  const named = [
    ...Object.keys(ranking?.fieldWeights ?? {}),
    ...Object.keys(ranking?.sameFieldBoost ?? {}),
  ];
  return [...new Set(named)]
    .filter(key => !fieldKeys.has(key))
    .map(key => `${where} ranking: no text field "${key}"`);
}

function flagsOf(rule: FlagRule): string[] {
  if ('flag' in rule) return [rule.flag];
  if ('notFlag' in rule) return [rule.notFlag];
  return rule.anyFlag;
}

function duplicates(names: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const name of names) {
    if (seen.has(name)) repeated.add(name);
    seen.add(name);
  }
  return [...repeated];
}
