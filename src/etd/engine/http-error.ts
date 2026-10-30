/**
 * A read the server answered with an error status. Its `status` lets the
 * search service tell a server failing (5xx: try again later) from a search
 * that can't work (e.g. a 404 for a file the index should have).
 */
export class HttpError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}
