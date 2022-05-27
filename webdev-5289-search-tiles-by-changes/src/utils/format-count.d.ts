export declare type NumberFormat = 'short' | 'long';
export declare type LabelFormat = 'short' | 'long';
/**
 * Format a "count" number into short "icon" or longer text string.
 * For positive numbers only.
 */
export declare function formatCount(count: number | undefined, numberFormat?: NumberFormat, labelFormat?: LabelFormat, locale?: string): string;
