const encoder = new TextEncoder();

/** Returns (asynchronously) the hex-encoded SHA-1 hash of the input string */
export async function sha1(input: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest('SHA-1', encoder.encode(input));
  return [...new Uint8Array(hashBuffer)]
    .map(byte => byte.toString(16).padStart(2, '0'))
    .join('');
}
