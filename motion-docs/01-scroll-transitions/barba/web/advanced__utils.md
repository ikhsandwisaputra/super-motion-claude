---
source: https://barba.js.org/docs/advanced/utils
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

# Utils

Barba is brought to you with a bunch of **useful utilities**.

* `barba.version` → Retrieve the **current @barba/core version**
* `barba.destroy()` → **Destroy the Barba instance** and properly remove `EventListener` on eligible links
* `barba.go(href: string, trigger?: Trigger, e?: LinkEvent | PopStateEvent)` → Tell Barba to **go to a specific URL** and play your transitions, if available, without using a browser “force reload”
* `barba.force(href: string)` → Force Barba to **redirect to a specific URL** without playing your transitions, equivalent to `location.href` change
* `barba.prefetch(href: string)` → Prefetch the given URL, see [prefetch strategy](https://barba.js.org/docs/advanced/strategies/#Prefetch)
* `barba.url.parse(url: string)` → Parse the given URL and retrieve a [`IUrlBase`](https://barba.js.org/api/interfaces/_core_src_defs_url_.iurlbase.html)
* `barba.history.previous` → Get the previous history object, see [history strategy](https://barba.js.org/docs/advanced/strategies/#history-previous-current)
* `barba.history.current` → Get the current history object, see [history strategy](https://barba.js.org/docs/advanced/strategies/#history-previous-current)
* `barba.history.add(url: string, trigger: Trigger, action?: HistoryAction)` → Push or replace a new state in the browser history, see [history strategy](https://barba.js.org/docs/advanced/strategies/#history-add)
* `barba.cache.get(url: string)` → Get [cache data](https://barba.js.org/docs/advanced/strategies/#Cache-data) for a given URL and retrieve action, request, status and target

> This is a draft section of **@barba/core utilities** that shows the most important you could use in your project, check the [Developer API](https://barba.js.org/api) for more informations.

[Third party scripts](https://barba.js.org/docs/advanced/third-party/)
[Developer API](https://barba.js.org/api/)
