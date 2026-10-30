import { RestorationStateHandler, } from '../../restoration-state-handler';
/**
 * Restores the demo's search from the URL as usual, but keeps its view to
 * itself: it starts in `displayMode` and remembers a switch only for the
 * visit. The usual handler keeps the view in archive.org-wide cookies, which
 * would carry the demo's view to the real search page and back.
 */
export class DemoRestorationStateHandler {
    constructor(displayMode) {
        this.displayMode = displayMode;
        this.urlState = new RestorationStateHandler({
            context: 'search',
        });
    }
    get extraFacetGroups() {
        return this.urlState.extraFacetGroups;
    }
    set extraFacetGroups(groups) {
        this.urlState.extraFacetGroups = groups;
    }
    persistState(state, options) {
        if (state.displayMode)
            this.displayMode = state.displayMode;
        this.urlState.persistState({ ...state, displayMode: undefined }, options);
    }
    getRestorationState() {
        return {
            ...this.urlState.getRestorationState(),
            displayMode: this.displayMode,
        };
    }
}
