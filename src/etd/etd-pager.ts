import type {
  EtdCallOptions,
  EtdQuery,
  EtdQueryResult,
  EtdRecord,
} from './etd-engine';

/**
 * Most records requested from the engine's cursor in one call. Keeps a deep
 * page from turning into a single huge phrase-verification pass.
 */
const MAX_BATCH = 100;

/**
 * Serves random-access pages over an EtdQuery's forward-only cursor.
 *
 * collection-browser asks for pages by number and may skip ahead (page 7
 * before page 2). The engine can only read records in order, so the pager
 * reads forward to the end of the requested page and keeps every record it
 * has read for later pages. Reads are serialized: two page requests never
 * advance the cursor at the same time.
 */
export class EtdPager {
  private readonly records: EtdRecord[] = [];

  private exhausted = false;

  private queue: Promise<void> = Promise.resolve();

  constructor(private readonly query: EtdQuery) {}

  get result(): EtdQueryResult {
    return this.query.result;
  }

  /** Records read from the engine so far. */
  get loadedCount(): number {
    return this.records.length;
  }

  /**
   * Records `start` (inclusive) to `end` (exclusive) in rank order. Never
   * reads past the query's reachable count, so a page beyond it is empty.
   */
  async slice(
    start: number,
    end: number,
    options?: EtdCallOptions,
  ): Promise<EtdRecord[]> {
    const target = Math.min(end, this.query.result.reachable);
    if (start >= target) return [];

    await this.readTo(target, options);
    return this.records.slice(start, target);
  }

  private readTo(target: number, options?: EtdCallOptions): Promise<void> {
    const read = this.queue.then(async () => {
      while (this.records.length < target && !this.exhausted) {
        const count = Math.min(target - this.records.length, MAX_BATCH);
        // Records are only kept once a whole batch has arrived, so a failed or
        // cancelled read leaves the pager where it was and a retry resumes there.
        const batch = await this.query.next(count, options);
        if (batch.length) {
          this.records.push(...batch);
        } else {
          this.exhausted = true;
        }
      }
    });
    // A failed read must not block the reads queued behind it.
    this.queue = read.catch(() => {});
    return read;
  }
}
