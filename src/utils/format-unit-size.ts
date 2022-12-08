/*
 * Replaces Petabox www/common/Util::humanSize()
 */
import { nothing } from 'lit';

enum unitSizes {
  'bytes',
  'kilobytes',
  'megabytes',
  'gigabytes',
  'terabytes',
  'petabytes',
  'exabytes',
  'zettabytes',
  'yottabytes',
}

export function formatUnitSize(
  size: number | undefined,
  nDecimals: number,
  separator: string = ' '
) {
  let itemSize = size;
  if (itemSize === undefined) return nothing; // early return.

  let unitIndex = 0;

  // convert byte to highest possible unit
  while (itemSize > 1024) {
    itemSize /= 1024;
    unitIndex += 1;
  }

  const magnitude = 10 ** nDecimals;
  itemSize = Math.round(itemSize * magnitude) / magnitude;

  let unitText = unitSizes[unitIndex];

  // convert plural to singular.
  unitText = itemSize === 1 ? unitText.slice(0, -1) : unitText;

  return `${itemSize.toLocaleString() + separator + unitText}`;
}
