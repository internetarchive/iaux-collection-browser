import { Metadata, } from '@internetarchive/search-service';
export const mockSuccessResponse = {
    success: {
        rawResponse: {},
        response: {
            numFound: 2,
            docs: [
                new Metadata({
                    identifier: 'foo',
                    collections_raw: ['foo', 'bar'],
                }),
                new Metadata({
                    identifier: 'bar',
                    collections_raw: ['baz', 'boop'],
                }),
            ],
            start: 0,
        },
        responseHeader: {
            status: 0,
            QTime: 0,
            params: {
                query: 'collection:foo',
                qin: 'collection:foo',
                fields: 'identifier, collections_raw',
                wt: 'foo',
                start: 0,
            },
        },
    },
};
//# sourceMappingURL=mock-search-responses.js.map