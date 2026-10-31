---
source: https://barba.js.org/docs/advanced/strategies
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

# Strategies

Barba implement **modern browser strategies** to keep your site run as fast as possible.

## Summary

1. [Cache](https://barba.js.org/docs/advanced/strategies/#Cache)
2. [Prefetch](https://barba.js.org/docs/advanced/strategies/#Prefetch)
3. [Prevent](https://barba.js.org/docs/advanced/strategies/#Prevent)
4. [History](https://barba.js.org/docs/advanced/strategies/#History)

## Cache

### `cacheIgnore`

Allows Barba to **cache your pages**.

Saving pages in the cache results in **less bandwidth usage** and **less server-side load**: no more `XMLHttpRequest` are made for pages that have already been visited.

| Value | Description |
| --- | --- |
| `false` *(default)* | Cache all |
| `true` | Ignore all |
| `String | String[]` | Ignore route pattern(s) |

Use it like this:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   cacheIgnore: ['/contact/', '/:category/post?'] }); ``` |

> Cache lifetime is **restricted to Barba instance** and will be cleared when leaving the site.

### `cacheFirstPage`

Allows Barba to **cache the first rendered page**.

In some situations it is useful to cache that page, but most time it is worse to cache the rendered HTML, because **it may be modified by other scripts** and those scripts have to deal with the cached page later.

| Value | Description |
| --- | --- |
| `false` *(default)* | Do not cache the first rendered page |
| `true` | Cache the first rendered page |

Use it like this:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   cacheFirstPage: true }); ``` |

### `barba.cache`

When cache is enabled, Barba internally use a **cache instance** to store cache data of all pages.

#### Cache data

Using the internal `cache.get(url)` method, you can easily retrieve **cache informations for a specified URL**.
Useful in some situations when you need to know request status and progression during a page transition.

It returns a [`ICacheData` object](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html):

| Property | Type | Description |
| --- | --- | --- |
| `action` | String `'init'` | Page has been cached **on init** |
|  | String `'enter'` | Page has been cached **on mouseover** regarding the [`prefetchIgnore`](https://barba.js.org/docs/advanced/strategies/#prefetchIgnore) strategy |
|  | String `'click'` | Page has been cached with a **user click** |
|  | String `'prefetch'` | Page has been cached with a **programmatic prefetch** or the [@barba/prefetch](https://barba.js.org/docs/plugins/prefetch/) plugin |
| `request` | Object `Promise` | Request associated to the page |
| `status` | String `'pending'` | Request has started and `Promise` is pending |
|  | String `'fulfilled'` | Request has been fulfilled |
|  | String `'rejected'` | Request has been rejected (an error occured) |
| [`target`](https://barba.js.org/docs/advanced/strategies/#Cache-target) | String | Target URL stored in the cache |

> See [`Cache` module](https://barba.js.org/api/classes/core_src_modules.cache.html) API documentation to learn more.

#### Cache `target`

The cache `target` contains the targetted URL of the page.

In case of **`301` redirection**, Barba cares of keeping in the cache the server `reseponseURL` instead of the requested one. In addition, the browser URL will be properly updated.

> Note that if you start prefetching a URL that have a 301 redirection, cache `target` will be set based on the requested URL since cache `status` is in “pending” mode. After cache `status` switch to “fulfilled”, the cache `target` will contain the final response URL.

## Prefetch

### `prefetchIgnore`

Allows Barba to **prefetch your pages** on `mouseover` or `touchstart` events.

Since there is a **100-300ms delay** during the user hover and the click, Barba use this time to start prefetching the next page. Most of time, this is enough to get the next page ready.

| Value | Description |
| --- | --- |
| `false` *(default)* | Prefetch all |
| `true` | Ignore all |
| `String | String[]` | Ignore route pattern(s) |

Use it like this:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   prefetchIgnore: '/home/' }); ``` |

> To prefetch all eligible links that **enter the viewport**, use the [@barba/prefetch](https://barba.js.org/docs/plugins/prefetch/) plugin.

### Prefetch URL

You can **programmatically prefetch some URLs** using the `barba.prefetch` code method:

|  |  |
| --- | --- |
| ``` 1 ``` | ``` barba.prefetch('about.html'); ``` |

> Note that **all prefetched URLs are stored absolute** in the [barba.cache](https://barba.js.org/docs/advanced/recipes#barba-cache): if you prefetch `about.html`, it will be stored in the cache as `https://localhost/about.html` instead. This prevent caching twice the same page if you omit to prefix your URLs in the output.

## Prevent

### `preventRunning`

Tells Barba to **prevent page “force reload”** when the user clicks on an eligible link during a transition is running.
This option is useful if you don’t want your users to break running transitions, especially if they are long.

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   preventRunning: true }); ``` |

> You can also programmatically check if a transition is running using `barba.transitions.isRunning` whenever you want in your code.

### `prevent`

Allows you to add a **custom “prevent” test** on eligible links.
If this function returns `true`, Barba will be disable for links that pass the test.

| Argument | Description |
| --- | --- |
| `el` | Clicked element |
| `event` | Triggered event |
| `href` | Next page href |

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` barba.init({   // define a custom function that will prevent Barba   // from working on links that contains a `prevent` CSS class   prevent: ({ el }) => el.classList && el.classList.contains('prevent') }); ``` |

> Note that you can prevent a link from using Barba with the `data-barba-prevent` attribute:
>
> 1. `data-barba-prevent` or `data-barba-prevent="self"` prevents the current link
> 2. `data-barba-prevent="all"` prevents all children links in a container (`div`, `p`, etc.)

## History

### `barba.history`

While browsing the website, Barba stores useful navigation informations into the `history` property. You can **access those informations at any time** in your application.

#### `history.previous|current`

The most useful are the `previous` and `current` history attributes. It allows you to access the page `namespace`, the window `scroll` position and the page `url`. For example, if you want to restore scroll position between pages, have a look at the [scroll position](https://barba.js.org/docs/advanced/recipes/#Scroll-position) recipe.

They both shares the same set of properties.

| Property | Type | Description |
| --- | --- | --- |
| `ns` | String | Namespace of the page |
| `scroll` | Object | `x` / `y` positions of the scroll |
| `url` | String | URL of the history position |
| `data` | Object | Custom data for the current page |

> Be careful, `barba.history.previous` object equals `null` when your application is starting.

#### `history.add`

This method bring the ability to **programmatically push or replace history entries** to easily keep the history up to date in your application based on user interaction.

| Argument | Type | Description |
| --- | --- | --- |
| `url` | String | URL of the page you want to push/replace in the history |
| `trigger` | Object `Trigger` | The element that triggers the history action |
|  | String `'barba'` | Programmatic trigger |
| `action` | String `'push'` *(default)* | Push a new entry in the history |
|  | String `'replace'` | Replace the current entry in the history |

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` // push a new entry in the history history.add('push.html', 'barba', 'push');  // replace a history entry history.add('replace.html', 'barba', 'replace'); ``` |

> See [`History` utility](https://barba.js.org/api/classes/core_src_utils.history.html) API documentation to learn more.

#### `history.store`

In some situation, you may need to **store custom information based on user navigation** and access them later in your code. Barba now offer a way of doing this with ease using the `barba.history.store` method.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` barba.history.store({   id: 2547,   random: Math.random(),   href: window.location.href, }); ``` |

> Be careful, data will be overwritten if you call twice the `store` method with the same data attribute.

Then later in the code, after a page transition, you can **access your custom data** from the previous page:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` const id = barba.history.previous.data.id; const random = barba.history.previous.data.random; const href = barba.history.previous.data.href; ``` |

As it’s using `replaceState` API under the hood, data are automatically rolled within the history, meaning if you call the `store` method before a page transition, the custom data will be stored inside `history.current`, then after a page transition, data will be available inside `history.previous` while `history.current` stay empty until you put something inside it.

### `data-barba-history`

Sometimes, you may want to “alter” the browser history by **replacing the current entry without having to push a new one**. This can easily be done with the `data-barba-history="replace"` attribute.

In the example below, if you come from the `index` page and click on `black` link, the `barba.history.previous` will equal `index` while `barba.history.current` will equal `black`. Clicking on `white` will replace the current `black` entry with the `white` one, while the previous entry remains intact and equal to `index`.

|  |  |
| --- | --- |
| ``` 1 2 ``` | ``` <a href="/theme?color=black" data-barba-history="replace">black</a> <a href="/theme?color=white" data-barba-history="replace">white</a> ``` |

> The default Barba behavior for history is `push`, so you don’t have to manually write `data-barba-history="push"` on all your links.

[Views](https://barba.js.org/docs/advanced/views/)
[Recipes](https://barba.js.org/docs/advanced/recipes/)
