---
source: https://barba.js.org/docs/advanced/options
title: "barba.js"
fetched: 2026-10-28
---

* [# Get Started](https://barba.js.org/docs/getstarted/intro/)

  1. [## Intro](https://barba.js.org/docs/getstarted/intro/)
  2. [## Install](https://barba.js.org/docs/getstarted/install/)
  3. [## Markup](https://barba.js.org/docs/getstarted/markup/)
  4. [## Basic transition](https://barba.js.org/docs/getstarted/basic-transition/)
  5. [## Run custom code](https://barba.js.org/docs/getstarted/custom-code/)
  6. [## Lifecycle](https://barba.js.org/docs/getstarted/lifecycle/)
  7. [## Legacy example](https://barba.js.org/docs/getstarted/legacy/)
  8. [## Browser support](https://barba.js.org/docs/getstarted/browser-support/)
  9. [## Useful links](https://barba.js.org/docs/getstarted/useful-links/)
* [# Advanced](https://barba.js.org/docs/advanced/options/)

  1. [## Options](https://barba.js.org/docs/advanced/options/)
  2. [## Hooks](https://barba.js.org/docs/advanced/hooks/)
  3. [## Transitions](https://barba.js.org/docs/advanced/transitions/)
  4. [## Views](https://barba.js.org/docs/advanced/views/)
  5. [## Strategies](https://barba.js.org/docs/advanced/strategies/)
  6. [## Recipes](https://barba.js.org/docs/advanced/recipes/)
  7. [## Third party scripts](https://barba.js.org/docs/advanced/third-party/)
  8. [## Utils](https://barba.js.org/docs/advanced/utils/)
  9. [## Developer API](https://barba.js.org/api/)
* [# Plugins](https://barba.js.org/docs/plugins/intro/)

  1. [## Intro](https://barba.js.org/docs/plugins/intro/)
  2. [## Router](https://barba.js.org/docs/plugins/router/)
  3. [## Prefetch](https://barba.js.org/docs/plugins/prefetch/)
  4. [## Css](https://barba.js.org/docs/plugins/css/)
  5. [## Head](https://barba.js.org/docs/plugins/head/)
  6. [## Preset](https://barba.js.org/docs/plugins/preset/)

# Options

Definition of all available options for `barba.init`.

For a **deep dive** into the Barba `Core` class, please see the [developer API](https://barba.js.org/api/classes/core_src.core.html).

## Summary

1. [Syntax](https://barba.js.org/docs/advanced/options/#Syntax)
2. [Definition](https://barba.js.org/docs/advanced/options/#Definition)

## Syntax

Here is **short syntax** of all options with their defaults.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 ``` | ``` barba.init({   cacheFirstPage: false,   cacheIgnore: false,   debug: false,   logLevel: 'off',   prefetchIgnore: false,   prevent: null,   preventRunning: false,   schema: [[SchemaAttribute]],   timeout: 2e3,   transitions: [],   views: [], }) ``` |

## Definition

Barba can take some arguments in the initialization step:

| Name | Type | Description |
| --- | --- | --- |
| `cacheFirstPage` | *`boolean`* | Disable cache on the first rendered page, see [`cacheFirstPage`](https://barba.js.org/docs/advanced/strategies/#cacheFirstPage) strategy |
| `cacheIgnore` | *`IgnoreOption`* | Disable cache or ignore some routes, see [`cacheIgnore`](https://barba.js.org/docs/advanced/strategies/#cacheIgnore) strategy |
| `debug` | *`boolean`* | Enable [`debug`](https://barba.js.org/docs/advanced/recipes/#debug) mode |
| `logLevel` | *`keyof LogLevels`* | Set custom [log level](https://barba.js.org/docs/advanced/recipes/#logLevel) for fine-grained debugging |
| `prefetchIgnore` | *`IgnoreOption`* | Disable prefetch or ignore routes, see [`prefetchIgnore`](https://barba.js.org/docs/advanced/strategies/#prefetchIgnore) strategy |
| `prevent` | *`PreventCheck`* | Set custom [`prevent`](https://barba.js.org/docs/advanced/strategies/#prevent) check |
| `preventRunning` | *`boolean`* | Prevent click when transition is running, see [`preventRunning`](https://barba.js.org/docs/advanced/strategies/#preventRunning) strategy |
| `requestError` | *`RequestCustomError`* | Set custom [`request error`](https://barba.js.org/docs/advanced/recipes/#requestError) |
| `schema` | *`ISchemaAttribute`* | Set custom [`schema`](https://barba.js.org/docs/getstarted/markup/#Schema) to override `data-barba` attributes |
| `timeout` | *`number`* | Request [`timeout`](https://barba.js.org/docs/advanced/recipes/#timeout) |
| `transitions` | *`ITransitionPage[]`* | Array of [`Transitions`](https://barba.js.org/docs/advanced/transitions/) |
| `views` | *`IView[]`* | Array of [`Views`](https://barba.js.org/docs/advanced/views/) |

> All arguments inherit from [`IBarbaOptions`](https://barba.js.org/api/interfaces/core_src_defs.ibarbaoptions.html) interface.

[Useful links](https://barba.js.org/docs/getstarted/useful-links/)
[Hooks](https://barba.js.org/docs/advanced/hooks/)
