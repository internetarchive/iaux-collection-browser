# Static index tools

Make an archive.org item searchable in the browser: export its records, build index files, try them locally, upload them. These are the tools that built `dl-search` (Democracy's Library, 1,219,865 records) on 29 October 2026.

> **Proof of concept.** The builder writes the ETD engine's file layout with a `current.json` manifest, so today's demo can search it unchanged. The planned petabox derive step will replace it and write the v2 `static-index.json` manifest (see the deriver design in [docs/static-index](../../docs/static-index/README.md)). The export query and field mapping are written for Democracy's Library; another item needs its own.

| File | What it does |
| --- | --- |
| `export-records.py` | Pages through archive.org's scrape API and writes `records.jsonl`, one record per line |
| `build-index.mts` | Builds the word-search index (dictionary, postings, records, snippets, facets) from `records.jsonl` |
| `serve-index.mjs` | Serves a built index on localhost the way archive.org's storage servers do: CORS and byte ranges |
| `vite.http.config.ts` | Runs the demo over plain `http://localhost`, so it can read `serve-index.mjs` without mixed-content errors |
| `vectors/` | Builds the search-by-meaning store: embeds each record, clusters the vectors, writes the store |

You need Node 22 or later (the `.mts` builder runs with Node's built-in TypeScript support) and Python 3. Run every command from the repo root.

## 1. Export the records

```bash
python3 -I tools/static-index/export-records.py out/dl-export
```

Writes `out/dl-export/records.jsonl`. It waits 1.5 s between requests and stops at the first error. Democracy's Library is 123 pages of 10,000 and took about 16 minutes. Edit `QUERY` and `FIELDS` at the top for another item.

## 2. Build the word index

```bash
DL_VERSION=20261029-dl2.json node --max-old-space-size=24000 tools/static-index/build-index.mts out/dl-export/records.jsonl out/dl-index
```

- **`DL_VERSION` names the build.** Every file becomes `name.<DL_VERSION>`, and `current.json` points at it. **End it in `.json`:** archive.org only lets other websites read files whose names end in an allowed type, so `dict.dir.20261029-dl2.json` works from any page and `dict.dir.20261029-dl2` doesn't.
- Democracy's Library: 67 s, 5.5 GB peak memory, 20 files, 1.1 GB. A third argument limits the record count, for a quick test.

## 3. Try it locally

```bash
node tools/static-index/serve-index.mjs out/dl-index 8787
pnpm exec vite --config tools/static-index/vite.http.config.ts
```

Then open `http://localhost:8080/?search_service=etd&etd_base_url=http://localhost:8787/&query=census`.

## 4. Upload it to archive.org

With the [`ia` command-line tool](https://archive.org/developers/internetarchive/cli.html), signed in. Create the item with the index files, check them, then upload `current.json` **last**, so no page points at a version whose files are still arriving:

```bash
cd out/dl-index
ia upload dl-search *.20261029-dl2.json --retries 5 --metadata="mediatype:data" --metadata="title:Democracy's Library: static search index (proof of concept)" --metadata="description:Prebuilt search index over about 1.22 million public government publications in Democracy's Library (court cases and restricted items excluded). Searched in the browser with HTTP Range reads; no search backend. Experimental, built 2026-10-29."
ia list dl-search
ia upload dl-search current.json --retries 5
```

Optional: the records snapshot the build came from, for rebuilding later:

```bash
ia upload dl-search ../dl-export/records.jsonl --remote-name=dl-search_static_index_records.jsonl --retries 5
```

Things to know:
- **Uploads queue tasks.** A small file can wait hours behind a low-priority derive queued by an earlier upload; `current.json` once took about 6 hours to appear.
- **Re-uploading keeps the old copy** in the item's `history/` folder.
- Then search it: `https://local.archive.org:8080/?search_service=etd&etd_item=dl-search&query=census` (see the main [README](../../README.md#serverless-search-demo-run-it-locally)).

## 5. Search by meaning (optional)

Builds the vector store that lets the demo rank by meaning. It uses the same model the ETD page uses, multilingual-e5-small, and takes hours on a laptop.

```bash
cd tools/static-index/vectors
npm install --ignore-scripts
mkdir -p ../models/Xenova/multilingual-e5-small/onnx
for f in config.json tokenizer.json tokenizer_config.json special_tokens_map.json onnx/model_quantized.onnx; do
  curl -L -o ../models/Xenova/multilingual-e5-small/$f https://archive.org/download/etd-search/Xenova/multilingual-e5-small/$f
done
cd ../../..
```

1. **Embed** each record (`"passage: "` prefix, batches of 32). Shard it with `START` and `THREADS`; Democracy's Library used 4 shards of 304,967 with 2 threads each, then joined them:
   ```bash
   START=0 THREADS=2 node tools/static-index/vectors/embed.mjs out/dl-export/records.jsonl out/vec-0.f32 304967 32
   # …START=304967, 609934, 914901 for the other shards
   cat out/vec-{0..3}.f32 > out/vec-full.f32
   ```
2. **Build the store:** clusters the vectors (about √N clusters) and writes `ivf-meta.json`, `centroids.f16`, `cell.dir`, `cells.bin`, `cell-codes.bin` and its meta, and `docs.bin`:
   ```bash
   node tools/static-index/vectors/build-vectors.mjs out/dl-export/records.jsonl out/vec-full.f32 out/dl-vectors
   ```
3. **Add per-record vectors** for re-ranking word results by meaning, tied to the text build's version:
   ```bash
   node tools/static-index/vectors/add-doc-vectors.mjs out/vec-full.f32 out/dl-vectors 20261029-dl2.json
   ```

These files have fixed names (`cells.bin`, `centroids.f16`…), so archive.org won't let other websites read them yet. Serve them locally with `serve-index.mjs` for now; the derive step will version them with `.json` names.
