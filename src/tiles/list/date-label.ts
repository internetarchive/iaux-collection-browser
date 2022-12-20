export function dateLabel(sortField: string | undefined): string {
  switch (sortField) {
    case 'publicdate':
      return 'Archived';
    case 'reviewdate':
      return 'Reviewed';
    case 'addeddate':
      return 'Added';
    default:
      return 'Published';
  }
}
