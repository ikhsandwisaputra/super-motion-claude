---
source: https://swup.js.org/plugins/matomo-plugin
title: "Matomo Plugin — swup"
fetched: 2026-10-28
---

[v3.0.1](https://github.com/swup/matomo-plugin)

# Matomo Plugin

A [swup](https://swup.js.org) plugin for integrating [Matomo](https://matomo.org/) analytics.

* Trigger pageview events after each page change
* This event is not triggered on intial load, so the first page view must be triggered elsewhere
* However, the page view event is by default triggered in the [Javascripts tracking snippet](https://developer.matomo.org/guides/tracking-javascript-guide) used for embedding Matomo

Simplified code run by this plugin on the `page:view` hook:

```
_paq.push(['setDocumentTitle', document.title]);
_paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
_paq.push(['trackPageView']);
```

```
_paq.push(['setDocumentTitle', document.title]);
_paq.push(['setCustomUrl', window.location.pathname + window.location.search]);
_paq.push(['trackPageView']);
```

## [Installation](https://swup.js.org/plugins/matomo-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/matomo-plugin
```

```
npm install @swup/matomo-plugin
```

```
import SwupMatomoPlugin from '@swup/matomo-plugin';
```

```
import SwupMatomoPlugin from '@swup/matomo-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/matomo-plugin@3"></script>
```

```
<script src="https://unpkg.com/@swup/matomo-plugin@3"></script>
```

## [Usage](https://swup.js.org/plugins/matomo-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupMatomoPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupMatomoPlugin()]
});
```
