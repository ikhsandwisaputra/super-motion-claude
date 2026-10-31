---
source: https://barba.js.org/docs/advanced/recipes
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

# Recipes

Become a Barba cooker!

Based on your project and website features to implement, those recipes may help you **during the development process**: debugging, managing containers, scroll position, browser requests, etc..

## Summary

1. [Debug](https://barba.js.org/docs/advanced/recipes/#Debug)
2. [Containers](https://barba.js.org/docs/advanced/recipes/#Containers)
3. [Scroll position](https://barba.js.org/docs/advanced/recipes/#Scroll-position)
4. [Browser requests](https://barba.js.org/docs/advanced/recipes/#Browser-requests)
5. [Custom headers](https://barba.js.org/docs/advanced/recipes/#Custom-headers)
6. [Partial output](https://barba.js.org/docs/advanced/recipes/#Partial-output)

## Debug

### `debug`

This property displays useful `console.info` about transition used, for **debugging purpose** only.
It sets [logLevel](https://barba.js.org/docs/advanced/recipes/#logLevel) to `debug`. Default is `false`.

Enable it like this:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   debug: true }); ``` |

> We recommend you to **enable the debugger only in development environment** to properly catch transition errors.

### `logLevel`

When debugging with Barba, you can easily **set the log level of debug informations** that the browser display:

* `off` → log is disabled
* `error` → use `console.error()`
* `warning` → use `console.warn()`
* `info` → use `console.info()`
* `debug` → use `console.log()`

Use this syntax to adjust the log level:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   logLevel: 'error' }); ``` |

## Containers

During a page transition, Barba use two `data-barba="container"` to discern `current` and `next` page, leading the wrapper to contain **both at the same time** until the transition is done. In order to make a fluent transition and prevent containers to be badly positioned, use one of this mechanism:

* default: do nothing and let Barba remove the container itself
* `data.current.container.remove()`: manually remove the current container when you need to, this is useful if you need to “clean” the DOM before calling some custom scripts
* `position: absolute`: keep containers superimposed, this is useful when making a `sync` (crossfade) transition

## Scroll position

After a page transition, the browser won’t “hard reload” the current tab, meaning that you will need to **“reset” the scroll position before entering a new page**. This can be easily done using a [global `hook`](https://barba.js.org/docs/advanced/hooks/#Global-hooks).

Wait… my browser still continue to restore the scroll position when I am using backward/forward buttons, why? Because this is the default behavior in most modern browsers. To disable it, you will need to set the **scroll restoration to be “manual”** instead of “auto”:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` if (history.scrollRestoration) {   history.scrollRestoration = 'manual'; } ``` |

> Note that some third party plugins like LocomotiveScroll implement this feature.

If you need to restore the scroll position while `history.scrollRestoration` is enabled, you can store the x/y scroll position using the Barba `history` object, like this:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 ``` | ``` let scrollX = 0 let scrollY = 0  barba.hooks.leave(() => {   scrollX = barba.history.current.scroll.x;   scrollY = barba.history.current.scroll.y; });  // then later in the code... window.scrollTo(scrollX, scrollY); ``` |

## Browser requests

### `requestError`

Allows you to **catch request errors**.
If this function returns `false`, wrong links will not be “force” triggered.

| Argument | Type | Description |
| --- | --- | --- |
| `trigger` | HTMLElement | The clicked/hovered HTMLElement |
|  | String `'barba'` | Programmatic navigation |
|  | String `'back'` | `'forward'` | Browser backward/forward button |
| `action` | String `'enter'` | Page was reached **on mouseover** regarding the [`prefetchIgnore`](https://barba.js.org/docs/advanced/strategies/#prefetchIgnore) strategy |
|  | String `'click'` | Page was reached with a **user click** |
|  | String `'prefetch'` | Page was reached with a **programmatic prefetch** or the [@barba/prefetch](https://barba.js.org/docs/plugins/prefetch/) plugin |
| `url` | String | Requested URL |
| `response` | Object | Fetch error with `message` or response with `status`, `statusText`, etc. |

Here is an example to manage 404 server responses with a custom page:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 ``` | ``` barba.init({   requestError: (trigger, action, url, response) => {      // go to a custom 404 page if server respond with a 404 response status     if (action === 'click' && response.status && response.status === 404) {       barba.go('/404');     }      // prevent Barba from redirecting the user to the requested URL     // this is equivalent to e.preventDefault() in this context     return false;   }, }); ``` |

> Note that if you use `barba.go()` directive without returning `false`, you will be redirected to the requested URL because Barba uses `barba.force()` to reach the page.

### `timeout`

On slow network or with a high page weight, the server can take time to give a response to the user. In case the page take **more than timeout** to be loaded, it lead Barba to abort the transition and display a *Timeout error* message.

To prevent this behavior, you can increase the `timeout`:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.init({   timeout: 5000 }); ``` |

In addition, you can properly catch the error by using the [`requestError`](https://barba.js.org/docs/advanced/recipes/#requestError) callback.

> If a timeout occurs when you are trying to go to another page, Barba will redirect you instead of reloading the page.

## Custom headers

You can **pass custom request headers** to the `XMLHttpRequest` object and manage them using exposed methods:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 ``` | ``` // set request headers barba.headers.set('x-header-name', 'headerValue'); barba.headers.set('x-another-header-name', 'anotherHeaderValue');  // overwrite one barba.headers.set('x-header-name', 'overwrite');  // get a specific header const header = barba.headers.get('x-header-name');  // get all header const headers = barba.headers.all();  // check if a custom header exists if (barba.headers.has('x-header-name')) {   // do something }  // delete a custom header barba.headers.delete('x-header-name');  // clear all headers barba.headers.clear(); ``` |

> Keep in mind that if you want a request header to be present server-side, you need to set it **before Barba starts the page transition**.
>
> By default, Barba sends **a non-removable custom HTTP Header** named `x-barba`.

## Partial output

If you are using a **server side language like PHP**, you can detect your [custom HTTP headers](https://barba.js.org/docs/advanced/recipes/#Custom-headers) and output just the container instead of the entire page: this could result in **less bandwidth usage** and **less server-side load**.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 ``` | ``` <?php   // check for the server side x-barba request header   if (isset($_SERVER['HTTP_X_BARBA'])) {      // this content will only be displayed if the page is called with BarbaJS     echo "I ❤ Barba";   } ?> ``` |

> Note that doing so, you have to manually handle the update of the page `title`.

[Strategies](https://barba.js.org/docs/advanced/strategies/)
[Third party scripts](https://barba.js.org/docs/advanced/third-party/)
