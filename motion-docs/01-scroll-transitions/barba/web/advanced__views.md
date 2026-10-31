---
source: https://barba.js.org/docs/advanced/views
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

# Views

Views allows you to have **some logic related to the content of a [`namespace`](https://barba.js.org/docs/getstarted/markup/#Namespace)**.
It’s a good place to init or destroy things, making the code run in a confined place.

They use a subset of [base `hooks`](https://barba.js.org/docs/advanced/hooks/#Base-hooks).

## Summary

1. [Syntax](https://barba.js.org/docs/advanced/views/#Syntax)
2. [Programmatic use](https://barba.js.org/docs/advanced/views/#Programmatic-use)

## Syntax

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 ``` | ``` barba.init({   views: [{     namespace: 'index',     beforeLeave(data) {       // do something before leaving the current `index` namespace     }   }, {     namespace: 'contact',     beforeEnter(data) {       // do something before entering the `contact` namespace     }   }] }); ``` |

> Keep in mind that a view is always related to **a unique namespace**.

## Programmatic use

In some cases, you may want to **programmatically call a `View`** inside your code, this is possible since Barba store all your views by [`namespace`](https://barba.js.org/docs/getstarted/markup/#Namespace) internally.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 ``` | ``` // return all views as a Map const views = barba.views.byNamespace;  // get the view of the `home` namespace const homeView = views.get('home');  // call the home `afterEnter` view homeView.afterEnter(); ``` |

[Transitions](https://barba.js.org/docs/advanced/transitions/)
[Strategies](https://barba.js.org/docs/advanced/strategies/)
