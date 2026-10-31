---
source: https://swup.js.org/api/methods
title: "Methods — swup"
fetched: 2026-10-28
---

# Methods

## [navigate](https://swup.js.org/api/methods/#navigate)

Navigate and transition to a URL. Pass an options object to configure how the page is loaded.

```
swup.navigate(url);
```

```
swup.navigate(url);
```

Disable animations for this visit:

```
swup.navigate(url, { animate: false });
```

```
swup.navigate(url, { animate: false });
```

Set a custom animation name:

```
swup.navigate(url, { animation: 'custom' });
```

```
swup.navigate(url, { animation: 'custom' });
```

Replace the current history entry instead of creating a new one:

```
swup.navigate(url, { history: 'replace' });
```

```
swup.navigate(url, { history: 'replace' });
```

Send a POST request with form data:

```
swup.navigate(url, { method: 'POST', data: new FormData() });
```

```
swup.navigate(url, { method: 'POST', data: new FormData() });
```

Disable the cache for this request:

```
swup.navigate(url, { cache: { read: false, write: true } });
```

```
swup.navigate(url, { cache: { read: false, write: true } });
```

Send along [custom metadata](https://swup.js.org/visit/#pass-along-custom-metadata) available in all hooks:

```
swup.navigate(url, { meta: { lorem: 'ipsum' } })
```

```
swup.navigate(url, { meta: { lorem: 'ipsum' } })
```

## [destroy](https://swup.js.org/api/methods/#destroy)

Disables swup.

```
swup.destroy();
```

```
swup.destroy();
```

## [use/unuse](https://swup.js.org/api/methods/#use-unuse)

Enable and disable plugins.

```
// Enable plugin: accepts an instantiated instance
swup.use(new SwupScrollPlugin());

// Disable plugin: accepts either name or instance
swup.unuse('SwupScrollPlugin');
```

```
// Enable plugin: accepts an instantiated instance
swup.use(new SwupScrollPlugin());

// Disable plugin: accepts either name or instance
swup.unuse('SwupScrollPlugin');
```

## [findPlugin](https://swup.js.org/api/methods/#findplugin)

Returns the plugin instance by that name, if enabled.

```
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```

```
const pluginInstance = swup.findPlugin('SwupScrollPlugin');
```

## [log](https://swup.js.org/api/methods/#log)

Does nothing by default, but outputs the passed content when the [debug plugin](https://swup.js.org/plugins/debug-plugin/) is used.
Accepts two arguments, the content of message and an optional log object which gets printed in a console group.

```
swup.log('Something happened', { lorem: 'ipsum' });
```

```
swup.log('Something happened', { lorem: 'ipsum' });
```
