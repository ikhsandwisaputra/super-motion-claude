---
source: https://barba.js.org/docs/plugins/prefetch
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

# @barba/prefetch

[![NPM version](https://img.shields.io/npm/v/@barba/prefetch?style=flat-square)](https://www.npmjs.com/package/@barba/prefetch "Badge")
[![Dependencies](https://img.shields.io/librariesio/release/npm/@barba/prefetch?style=flat-square)](https://github.com/barbajs/barba/network/dependencies "Badge")

Barba **prefetches automatically and cache** your pages.

It is mainly inspired by [quicklink](https://github.com/GoogleChromeLabs/quicklink).

## How it works?

Based on *Intersection Observer*, it processes **all eligible links** that enter the viewport. Depending on your browser, you may need a [polyfill](https://barba.js.org/docs/getstarted/browser-support/#Polyfill) to properly use this plugin.

You can use this feature regardless of the [`prefetchIgnore`](https://barba.js.org/docs/advanced/strategies/#prefetchIgnore) core property. Since the links will be prefetched depending on the viewport, it will **prevent the core prefetch process** from prefetching a link on enter.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 ``` | ``` import barba from '@barba/core'; import barbaPrefetch from '@barba/prefetch';  // tell Barba to use the prefetch plugin barba.use(barbaPrefetch);  // init Barba barba.init(); ``` |

> On slow network or with a high page weight, the server can take time to prefetch the response and can lead Barba to abort the transition and display a *Timeout error* message.
>
> See the [`timeout`](https://barba.js.org/docs/advanced/recipes/#timeout) setting to properly manage this behavior.

## Options

### `root`

The `HTMLElement` or `HTMLDocument` to wrap, by default it uses the `document.body`.

You can **pass a custom element** to prevent the plugin from prefetching all links from the entire wrapper. You can also apply a custom [limit](https://barba.js.org/docs/plugins/prefetch/#limit) to only prefetch the 4th first link of the `root` element.

### `timeout`

Delay before internal `requestIdleCallback` call is canceled, in `milliseconds`.

> See <https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback#parameters>.

### `limit`

Number limit of links to be prefetched.

> **Zero mean “no limit”**: the plugin will prefetch all eligible links of the [root](https://barba.js.org/docs/plugins/prefetch/#root) element.

Here is an example with all options passed to the plugin:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ``` | ``` import barba from '@barba/core'; import barbaPrefetch from '@barba/prefetch';  // get the wrapper const wrapper = document.querySelector('.prefetch-wrapper');  // tell Barba to use the prefetch plugin barba.use(barbaPrefetch, {   root: wrapper,   timeout: 2500,   limit: 0 });  // init Barba barba.init(); ``` |

[Router](https://barba.js.org/docs/plugins/router/)
[Css](https://barba.js.org/docs/plugins/css/)
