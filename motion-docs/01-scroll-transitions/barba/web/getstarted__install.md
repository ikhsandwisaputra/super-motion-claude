---
source: https://barba.js.org/docs/getstarted/install
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

# Install

Want to try Barba? Let’s install it!

## Use with a bundler

Barba is published on the **NPM registry**, so you can install it through the command line interpreter using your favorite package manager. This is the best way to install the library if you are comfortable with **javascript bundlers** like `webpack` or `rollup`.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` # npm npm install @barba/core  # yarn yarn add @barba/core ``` |

Then **import it like any other module** inside your build:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` import barba from '@barba/core';  barba.init({   // ... }); ``` |

> See the list of [all available options](https://barba.js.org/docs/advanced/options/).
>
> Using a bundler has **many advantages** like output compression, code splitting, tree shaking, etc., so we encourage you to use this kind of tool with Barba.

## Use with a CDN

**⚠️ IMPORTANT NOTE**

Be aware when using a Content Delivery Network: this can lead to issues such as **library downtime unavailability, website latency and bugs** that could be introduced in new releases. You should bundle the library with your scripts using a specific tagged version, not only using `@barba/core` tag from the CDN as well. This is true for all the libraries you are using through a CDN, not only BarbaJS. Read more about CDNs [in this great article from Google](https://web.dev/articles/content-delivery-networks?hl=fr).

To rapidly **include the minified production file** in your webpage, load the latest build from your favorite CDN using a generic script markup:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` <!-- unpkg --> <script src="https://unpkg.com/@barba/core"></script>  <!-- jsdelivr --> <script src="https://cdn.jsdelivr.net/npm/@barba/core"></script> ``` |

Then init Barba:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 ``` | ``` <script>   barba.init({     // ...   }) </script> ``` |

> See the list of [all available options](https://barba.js.org/docs/advanced/options/).
>
> By default, if no one is specified, the CDN will automatically target the **@latest** version of Barba and load the **UMD build** from `dist/barba.umd.js`.

## Other setup

Barba is build upon `microbundle` and is provided with an **ESM** and **Modern** version include in the package `dist` folder.

[Intro](https://barba.js.org/docs/getstarted/intro/)
[Markup](https://barba.js.org/docs/getstarted/markup/)
