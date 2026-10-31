---
source: https://swup.js.org/plugins/gtm-plugin
title: "GTM Plugin — swup"
fetched: 2026-10-28
---

[v2.0.0](https://github.com/swup/gtm-plugin)

# GTM Plugin

A [swup](https://swup.js.org) plugin for integrating Google Tag Manager.

* Trigger a custom event after each page change to associate with a page view within GTM
* This event is not triggered on intial load, so the first page view must be triggered elsewhere
* The event is a `VirtualPageview` with `virtualPageURL` and `virtualPageTitle` properties

Simplified code run by this plugin on the `page:view` hook:

```
window.dataLayer.push({
  event: 'VirtualPageview',
  virtualPageURL: window.location.pathname + window.location.search,
  virtualPageTitle: document.title
});
```

```
window.dataLayer.push({
  event: 'VirtualPageview',
  virtualPageURL: window.location.pathname + window.location.search,
  virtualPageTitle: document.title
});
```

## [Installation](https://swup.js.org/plugins/gtm-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/gtm-plugin
```

```
npm install @swup/gtm-plugin
```

```
import SwupGtmPlugin from '@swup/gtm-plugin';
```

```
import SwupGtmPlugin from '@swup/gtm-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/gtm-plugin@2"></script>
```

```
<script src="https://unpkg.com/@swup/gtm-plugin@2"></script>
```

## [Usage](https://swup.js.org/plugins/gtm-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupGtmPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupGtmPlugin()]
});
```
