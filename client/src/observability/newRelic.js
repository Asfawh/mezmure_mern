import { Agent } from '@newrelic/browser-agent/loaders/agent';
import { Ajax } from '@newrelic/browser-agent/features/ajax';
import { JSErrors } from '@newrelic/browser-agent/features/jserrors';
import { Metrics } from '@newrelic/browser-agent/features/metrics';
import { PageViewEvent } from '@newrelic/browser-agent/features/page_view_event';
import { PageViewTiming } from '@newrelic/browser-agent/features/page_view_timing';
import { SoftNav } from '@newrelic/browser-agent/features/soft_navigations';

const options = {
  init: {
    ajax: {
      capture_payloads: 'none',
      deny_list: ['bam.nr-data.net'],
    },
    browser_consent_mode: { enabled: false },
    distributed_tracing: { enabled: true },
    generic_events: { enabled: false },
    logging: { enabled: false },
    performance: {
      capture_detail: false,
      capture_marks: false,
      capture_measures: true,
      resources: { enabled: false },
    },
    privacy: { cookies_enabled: false },
    session_replay: { enabled: false, autoStart: false },
    session_trace: { enabled: false },
  },
  info: {
    applicationID: '1120557274',
    beacon: 'bam.nr-data.net',
    errorBeacon: 'bam.nr-data.net',
    licenseKey: 'NRJS-5b1faef1c11b6a1010c',
    sa: 1,
  },
  loader_config: {
    accountID: '8377147',
    agentID: '1120557274',
    applicationID: '1120557274',
    licenseKey: 'NRJS-5b1faef1c11b6a1010c',
    trustKey: '8377147',
  },
};

if (import.meta.env.PROD) {
  new Agent({
    ...options,
    features: [Ajax, JSErrors, Metrics, PageViewEvent, PageViewTiming, SoftNav],
  });
}
