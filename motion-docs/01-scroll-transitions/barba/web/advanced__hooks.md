---
source: https://barba.js.org/docs/advanced/hooks
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

# Hooks

A “hook” is a **regular method** that is called at a specific time in the Barba [lifecycle](https://barba.js.org/docs/getstarted/lifecycle/).

Hooks are triggered by [`Transitions`](https://barba.js.org/docs/advanced/transitions/) and [`Views`](https://barba.js.org/docs/advanced/views/), but are not “shared” between them: **they run separately**, either **synchronously or asynchronously** using the common `this.async()` syntax *([see run-async](https://github.com/sboudrias/run-async#readme))* or returning a promise.

## Summary

1. [Base hooks](https://barba.js.org/docs/advanced/hooks/#Base-hooks)
2. [Global hooks](https://barba.js.org/docs/advanced/hooks/#Global-hooks)
3. [Parameters](https://barba.js.org/docs/advanced/hooks/#Parameters)

## Base hooks

Barba uses a collection of base hooks:

| Order | Name | Description | Transitions | Views |
| --- | --- | --- | --- | --- |
| 1 | `beforeOnce` | Before **once** transition *(browser first load)* | x |  |
| 2 | `once` | Current page **once** transition *(browser first load)* | x |  |
| 3 | `afterOnce` | After **once** transition *(browser first load)* | x |  |
| 4 | `before` | Before everything | x |  |
| 5 | `beforeLeave` | Before **leave** transition/view | x | x |
| 6 | `leave` | Current page **leave** transition | x |  |
| 7 | `afterLeave` | After **leave** transition/view *(next container is **DOM ready**)* | x | x |
| 8 | `beforeEnter` | Before **enter** transition/view | x | x |
| 9 | `enter` | Next page **enter** transition | x |  |
| 10 | `afterEnter` | After **enter** transition/view | x | x |
| 11 | `after` | After everything | x |  |

> Each hook run in **a precise order**. If the [sync mode](https://barba.js.org/docs/advanced/transitions/#Sync-mode) is enabled, as **leave** and **enter** will be concurrent, order will differ: first all before\*, then enter/leave, and finally all after\*.

You can define them in **many different ways**, depending on your code implementation:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 ``` | ``` // using a promise (returned with arrow function) leave: (data) => asyncAnimation(data.current.container)  // using a promise (with ES6 argument syntax) leave: ({ current }) => asyncAnimation(current.container)  // using a promise (with a resolve call) leave: (data) => {   return new Promise(resolve => {     callbackAnimation(data.current.container, {       onComplete: () => {         resolve();       }     });   }); }  // `this.async()` leave(data) {   const done = this.async();    callbackAnimation(data.current.container, {     onComplete: () => {       done();     }   }); }  // async/await async leave(data) {   await asyncAnimation(data.current.container); } ``` |

## Global hooks

In order to improve and optimize your code, Barba offer a way to define global hooks through `barba.hooks`. This will **execute code everytime the hook is called** in the [lifecycle](https://barba.js.org/docs/getstarted/lifecycle/). What makes the hook global is that the definition is not wrap inside a `Transition` or a `View`. You can combine base and global hooks.

For example, if you want to display the namespace **everytime you enter a new page**, just do:

|  |  |
| --- | --- |
| ``` 1 2 3 ``` | ``` barba.hooks.enter((data) => {   console.log(data.next.namespace); }); ``` |

> Global hooks **can be setup anywhere**, before or after the `barba.init()` instruction.

## Parameters

### `data` argument

All hooks receive the same `data` argument object that contains **current and next page properties**.
This allows access to useful informations, like namespace, route or URL:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 ``` | ``` barba.init({   transitions: [{     leave(data) {       // get the current URL       let href = data.current.url.href;     }   }] }); ``` |

> You can use **ES6 shorthand argument** syntax `({ current })` to easily access `data.current` inside the hook.

#### `data` properties

Properties attached to `data` object:

| Property | Type | Description |
| --- | --- | --- |
| [`data.current`](https://barba.js.org/docs/advanced/hooks/#current-next-properties) | Object | Current page related |
| [`data.next`](https://barba.js.org/docs/advanced/hooks/#current-next-properties) | Object | Next page related |
| `data.trigger` | HTMLElement | Link that triggered the transition |
|  | String `'barba'` | Programmatic navigation |
|  | String `'back'` | `'forward'` | Browser backward/forward button |
| `data.event` | LinkEvent | PopStateEvent | Event that triggered the transition |

#### `current/next` properties

Properties attached to `data.current` and `data.next` objects:

| Name | Type | Description |
| --- | --- | --- |
| [`container`](https://barba.js.org/docs/getstarted/markup/#Container) | HTMLElement | Barba container |
| [`namespace`](https://barba.js.org/docs/getstarted/markup/#Namespace) | String | Barba namespace |
| [`url`](https://barba.js.org/docs/advanced/hooks/#url-properties) | Object | URL of the page |
| [`route`](https://barba.js.org/docs/advanced/hooks/#route-properties) | Object | Route object |
| `html` | String | HTML of the page |

> According to the [lifecycle](https://barba.js.org/docs/getstarted/lifecycle/), [rules](https://barba.js.org/docs/advanced/transitions/#Rules), [sync mode](https://barba.js.org/docs/advanced/transitions/#Sync-mode) or [cache availability](https://barba.js.org/docs/advanced/strategies/#cacheIgnore), some properties may be `undefined`.

#### `url` properties

Properties attached to `data.current.url` and `data.next.url` objects:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `hash` | String | `undefined` | URL hash |
| `href` | String | `location.href` | URL complete location |
| `path` | String | `location.pathname` | URL path (without origin, hash and query) |
| `query` | Object | {} | URL query (key: value) |

#### `route` properties

Properties attached to `data.current.route` and `data.next.route` objects:

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | String | `undefined` | Route name |
| `params` | Object | {} | Route segment params |

> `route` is **only** available when using [@barba/router](https://barba.js.org/docs/plugins/router/).

[Options](https://barba.js.org/docs/advanced/options/)
[Transitions](https://barba.js.org/docs/advanced/transitions/)
