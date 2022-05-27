import { LitElement, PropertyValues, TemplateResult } from 'lit';
import { SharedResizeObserverInterface, SharedResizeObserverResizeHandlerInterface } from '@internetarchive/shared-resize-observer';
import { CollectionDisplayMode, SortField } from '../models';
import './alpha-bar';
declare type AlphaSelector = 'creator' | 'title';
export declare class SortFilterBar extends LitElement implements SharedResizeObserverResizeHandlerInterface {
    displayMode?: CollectionDisplayMode;
    sortDirection: 'asc' | 'desc' | null;
    selectedSort: SortField;
    selectedTitleFilter: string | null;
    selectedCreatorFilter: string | null;
    showRelevance: boolean;
    resizeObserver?: SharedResizeObserverInterface;
    alphaSelectorVisible: AlphaSelector | null;
    dateSortSelectorVisible: boolean;
    desktopSelectorBarWidth: number;
    selectorBarContainerWidth: number;
    hoveringOverDateSortOptions: boolean;
    private desktopSortSelector;
    private sortSelectorContainer;
    render(): TemplateResult<1>;
    updated(changed: PropertyValues): void;
    private setupEscapeListeners;
    private boundDateSelectorEscapeListener;
    disconnectedCallback(): void;
    private disconnectResizeObserver;
    private setupResizeObserver;
    private get mobileSelectorVisible();
    private get alphaBarTemplate();
    handleResize(entry: ResizeObserverEntry): void;
    private get sortDirectionSelectorTemplate();
    private get desktopSortSelectorTemplate();
    /**
     * This generates each of the sort option links.
     *
     * It manages the display value and the selected state of the option.
     *
     * @param sortField
     * @param options {
     *    additionalClickEvent?: () => void; If this is provided, it will also be called when the option is clicked.
     *    displayName?: TemplateResult; The name to display for the option. Defaults to the sortField display name.
     *    isSelected?: () => boolean; A function that returns true if the option is selected. Defaults to the selectedSort === sortField.
     * }
     * @returns
     */
    private getSortDisplayOption;
    private get mobileSortSelectorTemplate();
    private mobileSortChanged;
    private get displayOptionTemplate();
    private get dateSortSelector();
    private getDateSortButton;
    private selectDateSort;
    private setSortDirections;
    private setSelectedSort;
    /**
     * There are four date sort options.
     *
     * This checks to see if the current sort is one of them.
     *
     * @readonly
     * @private
     * @type {boolean}
     * @memberof SortFilterBar
     */
    private get dateOptionSelected();
    /**
     * The display name of the current date field
     *
     * @readonly
     * @private
     * @type {string}
     * @memberof SortFilterBar
     */
    private get dateSortField();
    private get titleSelectorBar();
    private get creatorSelectorBar();
    private titleLetterChanged;
    private creatorLetterChanged;
    private emitTitleLetterChangedEvent;
    private emitCreatorLetterChangedEvent;
    private displayModeChanged;
    private emitSortChangedEvent;
    static styles: import("lit").CSSResult;
}
export {};
