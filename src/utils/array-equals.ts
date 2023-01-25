/**
 * Determines whether two arrays have the same (shallow) contents in the same order
 */
export function arrayEquals(arr1: unknown[], arr2: unknown[]): boolean {
  if (arr1 === arr2) return true;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((val, i) => val === arr2[i]);
}
