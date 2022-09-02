import type { AnalyticsEvent } from '@internetarchive/analytics-manager';

export interface AnalyticsHandlerInterface {
  /**
   * A general purpose analytics ping that takes arbitrary key-value pairs
   * and pings the analytics endpoint
   *
   * @param {Record<string, any>} values
   */
  sendPing(values: Record<string, any>): void;

  /**
   * Send a sampled event
   *
   * @param {options} AnalyticsEvent
   */
  sendEvent(options: AnalyticsEvent): void;

  /**
   * Send an unsampled event.
   *
   * **NOTE** Use sparingly as it can generate a lot of events
   * and deplete our event budget.
   *
   * @param {options} AnalyticsEvent
   */
  sendEventNoSampling(options: AnalyticsEvent): void;
}
