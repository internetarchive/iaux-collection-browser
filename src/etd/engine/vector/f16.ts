/**
 * IEEE half floats (the vector store's f16 centroids and rows) as numbers.
 *
 * The same values as the live page's f16buf, which Safari needs because it
 * lacks Float16Array: every half is exact in a float32, so a 65,536-entry
 * table decodes by lookup instead of per value.
 */

let table: Float32Array | undefined;

function halfTable(): Float32Array {
  if (table) return table;
  table = new Float32Array(65536);
  for (let h = 0; h < 65536; h += 1) {
    const sign = h & 0x8000 ? -1 : 1;
    const exponent = (h & 0x7c00) >> 10;
    const fraction = h & 0x3ff;
    if (exponent === 0) {
      table[h] = sign * 2 ** -14 * (fraction / 1024);
    } else if (exponent === 0x1f) {
      table[h] = fraction ? NaN : sign * Infinity;
    } else {
      table[h] = sign * 2 ** (exponent - 15) * (1 + fraction / 1024);
    }
  }
  return table;
}

/**
 * Decodes `count` little-endian halfs from `bytes` at `offset` into `out`
 * (a new array when not given).
 */
export function decodeHalfs(
  bytes: Uint8Array,
  offset: number,
  count: number,
  out = new Float32Array(count),
): Float32Array {
  const halfs = halfTable();
  for (let i = 0; i < count; i += 1) {
    const at = offset + i * 2;
    out[i] = halfs[bytes[at] | (bytes[at + 1] << 8)];
  }
  return out;
}

/** Encodes a number as a half (round to nearest), for building fixtures. */
export function encodeHalf(value: number): number {
  const f32 = new Float32Array([value]);
  const bits = new Uint32Array(f32.buffer)[0];
  const sign = (bits >>> 16) & 0x8000;
  const exponent = ((bits >>> 23) & 0xff) - 127 + 15;
  let mantissa = bits & 0x7fffff;
  if (exponent <= 0) {
    if (exponent < -10) return sign;
    mantissa |= 0x800000;
    const shift = 14 - exponent;
    const half = mantissa >> shift;
    const rest = mantissa & ((1 << shift) - 1);
    const midway = 1 << (shift - 1);
    return (
      sign | (half + (rest > midway || (rest === midway && half & 1) ? 1 : 0))
    );
  }
  if (exponent >= 0x1f) return sign | 0x7c00;
  const half = (exponent << 10) | (mantissa >> 13);
  const rest = mantissa & 0x1fff;
  return (
    sign | (half + (rest > 0x1000 || (rest === 0x1000 && half & 1) ? 1 : 0))
  );
}
