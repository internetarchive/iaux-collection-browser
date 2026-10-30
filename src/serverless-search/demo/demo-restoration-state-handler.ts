import type { CollectionDisplayMode, ExtraFacetGroup } from '../../models';
import {
  RestorationStateHandler,
  type RestorationState,
  type RestorationStateHandlerInterface,
  type RestorationStatePersistOptions,
} from '../../restoration-state-handler';

/**
 * Restores the demo's search from the URL as usual, but keeps its view to
 * itself: it starts in `displayMode` and remembers a switch only for the
 * visit. The usual handler keeps the view in archive.org-wide cookies, which
 * would carry the demo's view to the real search page and back.
 */
export class DemoRestorationStateHandler
  implements RestorationStateHandlerInterface
{
  private readonly urlState = new RestorationStateHandler({
    context: 'search',
  });

  constructor(private displayMode: CollectionDisplayMode) {}

  get extraFacetGroups(): readonly ExtraFacetGroup[] {
    return this.urlState.extraFacetGroups;
  }

  set extraFacetGroups(groups: readonly ExtraFacetGroup[]) {
    this.urlState.extraFacetGroups = groups;
  }

  persistState(
    state: RestorationState,
    options?: RestorationStatePersistOptions,
  ): void {
    if (state.displayMode) this.displayMode = state.displayMode;
    this.urlState.persistState({ ...state, displayMode: undefined }, options);
  }

  getRestorationState(): RestorationState {
    return {
      ...this.urlState.getRestorationState(),
      displayMode: this.displayMode,
    };
  }
}
