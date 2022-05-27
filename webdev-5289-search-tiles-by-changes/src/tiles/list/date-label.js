export function dateLabel(sortField) {
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
//# sourceMappingURL=date-label.js.map