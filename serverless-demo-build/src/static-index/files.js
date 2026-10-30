/**
 * The url of a file in a file set, under `dataUrl` (a folder, ending in
 * '/'). It carries a query string either way, so a range read can append
 * to it. A versioned file never changes, so its version is a stable cache
 * key; a stamped one is keyed to its build.
 */
export function fileSetUrl(dataUrl, files, name) {
    return files.naming === 'versioned'
        ? `${dataUrl}${name}.${files.version}${files.suffix ?? ''}?v=${files.version}`
        : `${dataUrl}${name}?v=${encodeURIComponent(files.built)}`;
}
/**
 * Whether a sidecar belongs to the build it sits next to: each of `keys`
 * is the same in its meta as in the search's. A missing meta never
 * matches. A sidecar that doesn't is ignored, not an error.
 */
export function sidecarMatches(expected, sidecar, keys) {
    return !!sidecar && keys.every(key => sidecar[key] === expected[key]);
}
