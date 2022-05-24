export function formatDate(date, format = 'short', locale = 'en-US') {
    // Return blank if undefined
    if (!date)
        return '';
    const options = {
        timeZone: 'UTC', // Override browser timezone
    };
    switch (format) {
        case 'short':
            options.month = 'short';
            options.year = 'numeric';
            break;
        case 'long':
            options.year = 'numeric';
            options.month = 'short';
            options.day = '2-digit';
            break;
        default:
            break;
    }
    const dateFormatter = new Intl.DateTimeFormat(locale, options);
    return dateFormatter.format(date);
}
//# sourceMappingURL=format-date.js.map