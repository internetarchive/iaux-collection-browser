import { LitElement } from 'lit';

import {
  analyticsCategories,
  analyticsActions,
} from './analytics-event-and-category';

/**
 * These are callback functions calling from actions-config.ts file.
 */

export default class ActionsHandler extends LitElement {
  public analyticsCategories = analyticsCategories;

  public analyticsActions = analyticsActions;

  constructor() {
    super();
    this.bindEvents();
  }

  sendEvent(eventCategory: string, eventAction: string) {
    // eslint-disable-next-line no-console
    console?.log('Collection browser action: ', { eventCategory, eventAction });
    window?.archive_analytics?.send_event_no_sampling(
      eventCategory,
      eventAction
    );
  }

  bindEvents() {
    this.addEventListener('selectedFacetsChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('selectedFacetsGroupChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('displayModeChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('searchResultsChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('histogramDateRangeUpdated', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('visiblePageChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });

    this.addEventListener('selectedSortParamChanged', (event: any) => {
      const { category, action, value } = event.detail;
      const eventAction = value ? `${action}: ${value}` : action;

      // check if category is defined to catch undefined values being sent to analytics
      if (category || eventAction) this.sendEvent(category, eventAction);
    });
  }
}
