/*
 * Replaces Petabox www/common/Util::humanSize()
 */
import { nothing } from 'lit';
import { msg, str } from '@lit/localize';

/**
 * Labels a formatted size with its unit, one entry per power of 1024 starting
 * at bytes. Each entry is a function so the label is read in the current
 * locale at call time.
 */
const unitLabels: ((size: string, singular: boolean) => string)[] = [
  (size, singular) =>
    singular ? msg(str`${size} byte`) : msg(str`${size} bytes`),
  (size, singular) =>
    singular ? msg(str`${size} kilobyte`) : msg(str`${size} kilobytes`),
  (size, singular) =>
    singular ? msg(str`${size} megabyte`) : msg(str`${size} megabytes`),
  (size, singular) =>
    singular ? msg(str`${size} gigabyte`) : msg(str`${size} gigabytes`),
  (size, singular) =>
    singular ? msg(str`${size} terabyte`) : msg(str`${size} terabytes`),
  (size, singular) =>
    singular ? msg(str`${size} petabyte`) : msg(str`${size} petabytes`),
  (size, singular) =>
    singular ? msg(str`${size} exabyte`) : msg(str`${size} exabytes`),
  (size, singular) =>
    singular ? msg(str`${size} zettabyte`) : msg(str`${size} zettabytes`),
  (size, singular) =>
    singular ? msg(str`${size} yottabyte`) : msg(str`${size} yottabytes`),
];

export function formatUnitSize(size: number | undefined, nDecimals: number) {
  let itemSize = size;
  if (itemSize === undefined) return nothing; // early return.

  let unitIndex = 0;

  // convert byte to highest possible unit
  while (itemSize > 1024 && unitIndex < unitLabels.length - 1) {
    itemSize /= 1024;
    unitIndex += 1;
  }

  const magnitude = 10 ** nDecimals;
  itemSize = Math.round(itemSize * magnitude) / magnitude;

  return unitLabels[unitIndex](itemSize.toLocaleString(), itemSize === 1);
}
