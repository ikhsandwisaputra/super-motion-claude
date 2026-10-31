---
source: https://barba.js.org/docs/plugins/router
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

# @barba/router

[![NPM version](https://img.shields.io/npm/v/@barba/router?style=flat-square)](https://www.npmjs.com/package/@barba/router "Badge")
[![Dependencies](https://img.shields.io/librariesio/release/npm/@barba/router?style=flat-square)](https://github.com/barbajs/barba/network/dependencies "Badge")

Barba router allows you to use **custom routes** for page transitions.

## How it works?

This module adds a **route** rule to Barba, that is less important than `custom()` but more than `namespace`. Take a look at the [transition rules](https://barba.js.org/docs/advanced/transitions/#Rules) for priority order and details.

Start to define your routes, then tell Barba to use the plugin **before** the `init()` step:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 ``` | ``` import barba from '@barba/core'; import barbaRouter from '@barba/router';  // define your routes const myRoutes = [{   path: '/index',   name: 'home' }, {   path: '/product/:id',   name: 'item' }];  // tell Barba to use the router with your routes barba.use(barbaRouter, {   routes: myRoutes });  // init Barba barba.init(); ``` |

## Options

### `routes`

Barba router plugin `routes` property accepts an array of [`Route`](https://barba.js.org/docs/plugins/router/#Route-object) objects.

#### `Route` object

| Property | Type | Description |
| --- | --- | --- |
| `name` | String | Value to be used with transitions |
| `path` | String | URL pattern |

> `path` supports dynamic segments `/product/:id` and regular expressions `/:lang(fr|en)/:post`.
> See the [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for detailed documentation.

[Intro](https://barba.js.org/docs/plugins/intro/)
[Prefetch](https://barba.js.org/docs/plugins/prefetch/)
