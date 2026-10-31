---
source: https://barba.js.org/docs/advanced/transitions
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

# Transitions

Barba allows you to define a **global transition**, that run everywhere on your site, and/or **specific transitions** using [rules](https://barba.js.org/docs/advanced/transitions/#Rules) that run when navigating from one page to another.

They use all [base `hooks`](https://barba.js.org/docs/advanced/hooks/#Base-hooks).

## Summary

1. [Syntax](https://barba.js.org/docs/advanced/transitions/#Syntax)
2. [Rules](https://barba.js.org/docs/advanced/transitions/#Rules)
3. [Self](https://barba.js.org/docs/advanced/transitions/#Self)
4. [Sync mode](https://barba.js.org/docs/advanced/transitions/#Sync-mode)

## Syntax

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` barba.init({   transitions: [{     name: 'default-transition',     leave() {       // create your stunning leave animation here     },     enter() {       // create your amazing enter animation here     }   }] }); ``` |

> transition `name` is optional, but recommended.

## Rules

Rules **define the “transition resolution”**, concretely “selecting the right transition to use”.
This allows you to create specific transitions, based on namespace, route or custom logic.

They are made of [keyword(s)](https://barba.js.org/docs/advanced/transitions/#Keyword-s) and [condition(s)](https://barba.js.org/docs/advanced/transitions/#Condition-s).

### Keyword(s)

Rules keyword(s) define the **logic to follow**, if your transition should play when leaving the `current.container`, using `from`, and/or when entering the `next.container`, using `to`:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 ``` | ``` barba.init({   transitions: [{     name: 'custom-transition',     from: {       // set of conditions to be fulfilled       // to play the transition     },     to: {       // set of conditions to be fulfilled       // to play the transition     }   }] }); ``` |

They must contain a set of [condition(s)](https://barba.js.org/docs/advanced/transitions/#Condition-s), and run within a priority order:

| Priority | Keyword | Rule apply to… | Rule apply when… |
| --- | --- | --- | --- |
| 1 | `from` **AND** `to` | `current` **AND** `next` containers | Condition(s) of `from` **AND** `to` are fulfilled |
| 2 | `to` | `next` container | Condition(s) of `to` is/are fulfilled |
| 3 | `from` | `current` container | Condition(s) of `from` is/are fulfilled |

> Note that you can use `from` and `to` properties **independently**.

### Condition(s)

Rules condition(s) define the **logic to fulfilled** inside [keyword(s)](https://barba.js.org/docs/advanced/transitions/#Keyword-s) in order to play the transition.

They are defined within keyword(s):

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 ``` | ``` barba.init({   transitions: [{     name: 'custom-transition',     from: {       namespace: [         'home'       ]     }   }] }); ``` |

Condition(s) can be applied to a namespace, route or through a custom function.
Barba will then select the right transition to use and play it **only if all conditions are fulfilled**.

| Priority | Condition | Type | Argument | Fulfilled when… |
| --- | --- | --- | --- | --- |
| 1 | `custom` | Function | [data](https://barba.js.org/docs/advanced/hooks/#data-argument) argument | `true` is returned |
| 2 | `route` | String | String[] | *none* | `current.route.name` matched |
| 3 | `namespace` | String | String[] | *none* | `current.namespace` matched |

> Any conditions can be used within `from` and/or `to` keywords.

### Priority

The “transition resolution” follows this steps:

1. Condition(s) priority
2. Keyword(s) priority
3. Declaration order

> The common/default behaviour is to start **leave** as soon as possible.
> Then **enter** will be called when **leave** ends *AND* next page is “available”: fetched or cached.
>
> If you use some `to` logic, Barba can not predict and select the right transition until the next page is available. This also applies when using the [sync mode](https://barba.js.org/docs/advanced/transitions/#Sync-mode), but this does not apply if `to` is used with `route` property because “next route” is known when the click occurs.
>
> Bear with this!

### Multiple rules

You can combine **multiple rules** on each transition.
Here is an example of what you could do with multiple rules:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 ``` | ``` barba.init({   transitions: [{     name: 'custom-transition',     from: {        // define a custom rule based on the trigger class       custom: ({ trigger }) => {         return trigger.classList && trigger.classList.contains('use-custom-transition');       },        // define rule based on multiple route names       route: [         'index',         'product'       ]     },     to: {        // define rule based on multiple namespaces       namespace: [         'home',         'item'       ]     }   }] }); ``` |

Based on the [priority order](https://barba.js.org/docs/advanced/transitions/#Priority), Barba will play the `custom-transition`:

* if the link you clicked on contains a `.use-custom-transition` CSS class
* if you come **from** the `index` or `product` route
* if you are navigating **to** the `home` or `item` namespace AND **from** the `index` or `product` route

## Self

Barba have an internal mechanism called “self transition”: it allows you to call a transition **when navigating into the same page**. Just define a transition with the “magic” name `self`, then links that point to your current page, like `page.html#hash`, will call this specific transition.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 ``` | ``` transitions: [{   name: 'self',   enter() {     // create your self transition here   }, }] ``` |

> Like a regular transition, this one can use all base hooks.

## Sync mode

A mode that indicates whether **leave** and **enter** hooks should “play together”.
The **sync mode is disabled by default**, but you can easily enable it using the `sync` option:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` barba.init({   transitions: [{     sync: true,     leave() {       // transition that will play concurrently to `enter`     },     enter() {       // transition that will play concurrently to `leave`     }   }] }); ``` |

This involves **waiting until the next page is available**: fetched or cached.

In another words, regarding the [legacy example](https://barba.js.org/docs/getstarted/legacy/), if you have an opacity transition from `1 -> 0` for `leave` and `0 -> 1` for `enter`:

* `sync: false` will play the `leave` transition first, making your page content goes transparent, then play the `enter` transition, making the next page content goes opaque *(two step transition)*

> This will immediately run the `before`, `beforeLeave` and `leave` hooks on user click, then it will wait for the next page to be “ready” (prefetched) in order to run the `enter` transition with the other hooks.

* `sync: true` will make the current page goes transparent while the next page becomes opaque at the same time *(crossfade transition)*

> This will do nothing on user click, even if doing something inside `before` or `beforeLeave` hooks, this mode will always wait for the next page to be “ready” (prefetched) in order to run both `leave`/`enter` transitions.

[Hooks](https://barba.js.org/docs/advanced/hooks/)
[Views](https://barba.js.org/docs/advanced/views/)
