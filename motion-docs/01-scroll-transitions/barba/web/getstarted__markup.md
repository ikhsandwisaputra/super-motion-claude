---
source: https://barba.js.org/docs/getstarted/markup
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

# Markup

At the beginning, Barba needs to know a little bit about your **site architecture**.

## DOM structure

By default, you can use this markup inside your pages:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 ``` | ``` <body data-barba="wrapper">   <!-- put here content that will not change   between your pages, like <header> or <nav> -->    <main data-barba="container" data-barba-namespace="home">     <!-- put here the content you wish to change     between your pages, like your main content <h1> or <p> -->   </main>    <!-- put here content that will not change   between your pages, like <footer> --> </body> ``` |

> Note that you can build the `html` in many ways: if your header/nav/links need to be updated along the pages, put them inside the `container`, same if you have additional links in your footer that change between pages.
>
> Keep in mind that the `wrapper` should always wrap the `container`.

### Wrapper

The wrapper is **the main Barba section** that contains all your page structure and the Barba [container](https://barba.js.org/docs/getstarted/markup/#Container). Beware, everything inside of this wrapper and outside of the container **will not be updated by Barba**: you can put your `<header>`, `<footer>` or `<nav>` safely here. It is mainly defined on the `<body>` tag, but you can add it on a `div` or `section` for example.

### Container

The container defines **a section in which content is updated automatically** when you navigate between your pages. Beware, everything inside of this container **will be updated by Barba**: you can put your `<footer>` safely here. It is mainly defined on the `<main>` tag, but you can add it on a `div` or `section` for example.

> Beware, Barba appends the container to the wrapper, so it will always end up at the bottom and if you have more DOM elements in there, they will be bumped up.

### Namespace

The namespace allows you to define **a unique name for each page**. Barba mainly uses this namespace for [Transition rules](https://barba.js.org/docs/advanced/transitions/#Rules) and [Views](https://barba.js.org/docs/advanced/views/).

## Schema

You can easily override every **data-barba** attributes.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 ``` | ``` barba.init({   schema: {     prefix: 'data-custom',     wrapper: 'wrap'   } }); ``` |

Now you can use `data-custom="wrap"` in your HTML instead of `data-barba="wrapper"`.

> See the list of all customizable attributes in the default [`schema`](https://github.com/barbajs/barba/blob/main/packages/core/src/schemas/attribute.ts).

[Install](https://barba.js.org/docs/getstarted/install/)
[Basic transition](https://barba.js.org/docs/getstarted/basic-transition/)
