/**
 * A fetch that tries again when archive.org has a moment: a 502, 503 or 504
 * (a gateway or storage server not answering), or a request that fails
 * without an answer. On 2026-10-29 its download redirect answered 502 for a
 * while, and one 502 failed a whole search.
 *
 * Only those are retried: a 4xx is an answer (a 404 means the file isn't
 * there), a 500 is the server's own error and likely to repeat, and an
 * aborted request stays aborted. A connection lost while the
 * body is downloading isn't retried here: the caller sees it.
 */
/** Statuses worth asking again for. */
const RETRY_STATUSES = new Set([502, 503, 504]);
/** Waits before each retry, in ms: about 0.5 s, then 1.5 s. */
const DEFAULT_DELAYS = [500, 1500];
export function retryingFetch(fetchFn, options = {}) {
    const delays = options.delays ?? DEFAULT_DELAYS;
    return async (input, init) => {
        for (let attempt = 0;; attempt += 1) {
            const signal = init?.signal ?? undefined;
            let reason;
            try {
                const response = await fetchFn(input, init);
                if (!RETRY_STATUSES.has(response.status) || attempt >= delays.length) {
                    return response;
                }
                reason = `HTTP ${response.status}`;
                // Let the connection go; the body is an error page.
                response.body?.cancel().catch(() => { });
            }
            catch (err) {
                // A TypeError is fetch's "no answer": offline, reset, DNS.
                if (signal?.aborted ||
                    !(err instanceof TypeError) ||
                    attempt >= delays.length) {
                    throw err;
                }
                reason = err.message;
            }
            options.onRetry?.(reason);
            await wait(jittered(delays[attempt]), signal);
        }
    };
}
/** Up to 20% either way, so retries from parallel reads don't line up. */
function jittered(ms) {
    return ms * (0.8 + Math.random() * 0.4);
}
function wait(ms, signal) {
    return new Promise((resolve, reject) => {
        if (signal?.aborted) {
            reject(signal.reason);
            return;
        }
        const timer = setTimeout(() => {
            signal?.removeEventListener('abort', onAbort);
            resolve();
        }, ms);
        const onAbort = () => {
            clearTimeout(timer);
            reject(signal.reason);
        };
        signal?.addEventListener('abort', onAbort, { once: true });
    });
}
