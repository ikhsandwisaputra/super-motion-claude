---
source: https://barba.js.org/docs/plugins/intro
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

# Plugins

Barba plugins are **components that you can plug** to improve the default library behavior.

## Available

Here is the list of all available plugins for Barba:

* [@barba/router](https://barba.js.org/docs/plugins/router/) → allows you to use custom routes for page transitions
* [@barba/prefetch](https://barba.js.org/docs/plugins/prefetch/) → prefetches automatically and cache your pages
* [@barba/css](https://barba.js.org/docs/plugins/css/) → a style helper that manage you CSS classes during transitions
* [@barba/head](https://barba.js.org/docs/plugins/head/) → keep your `<head>` up to date ***(coming soon)***
* [@barba/preset](https://barba.js.org/docs/plugins/preset/) → ready-to-use basic transitions pack ***(coming soon)***

## Usage

To use a plugin, simply tell Barba what plugin(s) and option(s) you want to use **before initialize** it:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 ``` | ``` import barba from '@barba/core'; import barbaPlugin from '@barba/plugin';  // tell Barba what plugin to use barba.use(barbaPlugin, {   custom: 'value', });  // init Barba barba.init({   ... }); ``` |

> **Be careful**, you can easily rename the import when using a bundler, which is not the case when using the plugin through a CDN: the name should be prefixed by `barba`, meaning `@barba/plugin` will need to be call as `barba.use(barbaPlugin)`.

[Developer API](https://barba.js.org/api/)
[Router](https://barba.js.org/docs/plugins/router/)
