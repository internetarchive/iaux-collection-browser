export function dateLabel(sortField: string | undefined): string {
  switch (sortField) {
    case 'date':
      return 'Published';
    case 'reviewdate':
      return 'Reviewed';
    case 'addeddate':
      return 'Added';
    default:
      return 'Archived';
  }
}
