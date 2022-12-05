/*
 * Replaces Petabox www/common/Util::humanSize()
 */
import { nothing } from 'lit';
import type { Divisor } from './format-count';

export function formatUnitSize(
  size: number | undefined,
  ndecimals: Divisor,
  seprator: String = ' '
) {
  let times = 0;
  let itemSize = size;
  const timesNames = [];

  if (itemSize === undefined) return nothing;

  while (itemSize > 1024) {
    itemSize /= 1024;
    times += 1;
  }

  timesNames[0] = 'bytes';
  timesNames[1] = 'kilobytes';
  timesNames[2] = 'megabytes';
  timesNames[3] = 'gigabytes';
  timesNames[4] = 'terabytes';
  timesNames[5] = 'petabytes';
  timesNames[6] = 'exabytes';
  timesNames[7] = 'zettabytes';
  timesNames[8] = 'yottabytes';

  itemSize = Math.round(itemSize * ndecimals) / ndecimals;

  if (itemSize)
    return `${itemSize.toLocaleString('en') + seprator + timesNames[times]}`;

  return nothing;
}
