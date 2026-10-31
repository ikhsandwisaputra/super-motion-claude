---
source: https://swup.js.org/plugins/ga-plugin
title: "GA Plugin — swup"
fetched: 2026-10-28
---

[v2.0.0](https://github.com/swup/ga-plugin)

# GA Plugin

A [swup](https://swup.js.org) plugin for integrating Google Analytics.

* Trigger pageview events after each page change
* This event is not triggered on intial load, so the first page view must be triggered elsewhere
* However, the page view event is by default triggered in the [Javascripts tracking snippet](https://developers.google.com/analytics/devguides/collection/analyticsjs/#the_javascript_tracking_snippet) used for embedding Google Analytics

Simplified code run by this plugin on the `page:view` hook:

```
// On sites using gtag.js
window.gtag('config', GA_MEASUREMENT_ID, {
  page_title: title,
  page_path: url
});

// On sites using analytics.js
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

```
// On sites using gtag.js
window.gtag('config', GA_MEASUREMENT_ID, {
  page_title: title,
  page_path: url
});

// On sites using analytics.js
window.ga('set', 'title', document.title);
window.ga('set', 'page', window.location.pathname + window.location.search);
window.ga('send', 'pageview');
```

## [Installation](https://swup.js.org/plugins/ga-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/ga-plugin
```

```
npm install @swup/ga-plugin
```

```
import SwupGaPlugin from '@swup/ga-plugin';
```

```
import SwupGaPlugin from '@swup/ga-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/ga-plugin@2"></script>
```

```
<script src="https://unpkg.com/@swup/ga-plugin@2"></script>
```

## [Usage](https://swup.js.org/plugins/ga-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupGaPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupGaPlugin()]
});
```

## [Options](https://swup.js.org/plugins/ga-plugin/#options)

### [gaMeasurementId](https://swup.js.org/plugins/ga-plugin/#gameasurementid)

This option is only required on sites using gtag.js, usually loaded like this:

```
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

```
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

The `window.gtag` function the measurement ID to trigger page views.

```
const swup = new Swup({
  plugins: [
    new SwupGaPlugin({ gaMeasurementId: GA_MEASUREMENT_ID })
  ]
});
```

```
const swup = new Swup({
  plugins: [
    new SwupGaPlugin({ gaMeasurementId: GA_MEASUREMENT_ID })
  ]
});
```
