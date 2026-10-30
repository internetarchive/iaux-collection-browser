"""One-time export of Democracy's Library records for the static index.

Pages through archive.org's scrape API with the collection's own
search_collection query, minus PACER court cases and restricted items,
and writes one JSON object per line. Pauses between requests and stops
on the first error.

Usage: python3 -I tools/static-index/export-records.py <out_dir>
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request

QUERY = (
    '(collection:(governmentpublications OR USGovernmentDocuments OR library_and_archives_canada'
    ' OR fedlink OR ualbertaeducationguides OR albertagovernmentpublications OR lacbac OR nasa'
    ' OR us_census OR instituteofgovernmentalstudieslibrary OR aruba)'
    ' OR (collection:sim_microfilm AND subject:"Government Documents"))'
    ' AND NOT collection:usfederalcourts AND NOT access-restricted-item:true'
)
FIELDS = 'identifier,title,creator,date,subject,language,collection,description,mediatype,publisher'
URL = 'https://archive.org/services/search/v1/scrape'
PAUSE_SECONDS = 1.5


def fetch(cursor):
    params = {'q': QUERY, 'fields': FIELDS, 'count': 10000}
    if cursor:
        params['cursor'] = cursor
    req = urllib.request.Request(
        URL + '?' + urllib.parse.urlencode(params),
        headers={'User-Agent': 'static-index-export (iaux-collection-browser tools/static-index)'},
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.load(resp)


def main(out_dir):
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'records.jsonl')
    total = written = pages = 0
    cursor = None
    started = time.time()
    with open(out_path, 'w', encoding='utf-8') as out:
        while True:
            data = fetch(cursor)
            if 'items' not in data:
                raise SystemExit(f'unexpected response on page {pages + 1}: {str(data)[:300]}')
            total = data.get('total', total)
            for item in data['items']:
                out.write(json.dumps(item, ensure_ascii=False) + '\n')
            written += len(data['items'])
            pages += 1
            print(f'page {pages}: {written}/{total} ({time.time() - started:.0f}s)', flush=True)
            cursor = data.get('cursor')
            if not cursor or not data['items']:
                break
            time.sleep(PAUSE_SECONDS)
    print(f'done: {written} records of {total}, {pages} pages, {out_path}', flush=True)


if __name__ == '__main__':
    main(sys.argv[1])
