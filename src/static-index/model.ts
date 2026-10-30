import type { ModelBlock } from './manifest';

/**
 * The embedding library builds this client will load, by name and
 * version. A manifest names a version, never a url: the url is ours, so
 * an item's JSON can't choose a script to run on archive.org's pages.
 * Add a build here (pinned, from an allowed CDN) to search stores made
 * with it.
 */
export const MODEL_LIBRARIES: Record<string, Record<string, string>> = {
  '@huggingface/transformers': {
    '3.0.2':
      'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/transformers.min.js',
  },
};

/** The pinned script for a model's library; undefined when we have none. */
export function modelLibraryUrl(
  library: ModelBlock['library'],
): string | undefined {
  return Object.hasOwn(MODEL_LIBRARIES, library.name) &&
    Object.hasOwn(MODEL_LIBRARIES[library.name], library.version)
    ? MODEL_LIBRARIES[library.name][library.version]
    : undefined;
}
