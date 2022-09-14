import type {
  AnalyticsEvent,
  AnalyticsManagerInterface,
} from '@internetarchive/analytics-manager';

export class MockAnalyticsHandler implements AnalyticsManagerInterface {
  callCategory?: string;

  callAction?: string;

  callLabel?: string;

  callEventConfiguration?: object;

  sendPing(): void {}

  sendEvent(options: AnalyticsEvent): void {
    this.callCategory = options.category;
    this.callAction = options.action;
    this.callLabel = options.label;
    this.callEventConfiguration = options.eventConfiguration;
  }

  sendEventNoSampling(options: AnalyticsEvent): void {
    this.callCategory = options.category;
    this.callAction = options.action;
    this.callLabel = options.label;
    this.callEventConfiguration = options.eventConfiguration;
  }
}
