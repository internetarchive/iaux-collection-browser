export function accountLabel(date: Date | undefined): string {
  if (!date) {
    return '';
  }
  return `Archivist since ${date.getFullYear()}`;
}
