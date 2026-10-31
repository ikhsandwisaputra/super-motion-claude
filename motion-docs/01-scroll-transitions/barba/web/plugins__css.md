---
source: https://barba.js.org/docs/plugins/css
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

# @barba/css

[![NPM version](https://img.shields.io/npm/v/@barba/css?style=flat-square)](https://www.npmjs.com/package/@barba/css "Badge")
[![Dependencies](https://img.shields.io/librariesio/release/npm/@barba/css?style=flat-square)](https://github.com/barbajs/barba/network/dependencies "Badge")

Barba CSS is a **style helper** that manage you CSS classes during transitions.

It is mainly inspired by [Vue.js transitions](https://vuejs.org/v2/guide/transitions.html#Transition-Classes).

## How it works?

This plugin **adds/removes [CSS classes](https://barba.js.org/docs/plugins/css/#CSS-classes)** from the [`data-barba="container"`](https://barba.js.org/docs/getstarted/markup/#Container) DOM element automatically.

To create a simple opacity transition, use the plugin in your build:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 ``` | ``` import barba from '@barba/core'; import barbaCss from '@barba/css';  // tell Barba to use the css plugin barba.use(barbaCss);  // init Barba barba.init(); ``` |

Then customize your CSS classes like this:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 ``` | ``` .barba-leave-active, .barba-enter-active {   transition: opacity 450ms ease; }  .barba-leave, .barba-enter-to {   opacity: 1; }  .barba-enter, .barba-leave-to {   opacity: 0; } ``` |

## CSS classes

During the transition process, Barba defines **custom classes** according to the transition hook state. If a transition name is specified, it will be used as a [CSS prefix](https://barba.js.org/docs/plugins/css/#CSS-prefix) in your classes instead.

Here is the list of all default CSS classes grouped by hooks:

### once

* `.barba-once` → **starting state** for `once` hook, added when first load transition is triggered, removed one frame after.
* `.barba-once-active` → **active state** for `once` hook, applied during the entire appearing phase, then added when once transition is triggered and removed when transition/animation finishes. This class can be used to define the duration, delay and easing curve.
* `.barba-once-to` → **ending state** for `once` hook, added one frame after transition is triggered (at the same time `barba-once` is removed) and removed when transition/animation finishes.

### leave

* `.barba-leave` → **starting state** for `leave` hook, added when leave transition is triggered, removed one frame after.
* `.barba-leave-active` → **active state** for `leave` hook, applied during the entire leaving phase, then added when leave transition is triggered and removed when transition/animation finishes. This class can be used to define the duration, delay and easing curve.
* `.barba-leave-to` → **ending state** for `leave` hook, added one frame after transition is triggered (at the same time `barba-leave` is removed) and removed when transition/animation finishes.

### enter

* `.barba-enter` → **starting state** for `enter` hook, added when enter transition is triggered, removed one frame after next container is inserted.
* `.barba-enter-active` → **active state** for `enter` hook, applied during the entire leaving phase, then added after next container is inserted and removed when transition/animation finishes. This class can be used to define the duration, delay and easing curve.
* `.barba-enter-to` → **ending state** for `enter` hook, added one frame after next container is inserted (at the same time `barba-enter` is removed) and removed when transition/animation finishes.

## CSS prefix

By default, the plugin uses `.barba-hook` **prefix** to generate the `.barba-hook[-state]` CSS classes, but if you add a `name` property to your transition, it uses `.name-hook[-state]` CSS classes instead.

Setting a transition name like this …

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 ``` | ``` barba.init({   transitions: [{     name: 'hello'     once: () => {}   }] }); ``` |

… will generate those CSS classes:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 ``` | ``` /* transition name is used as prefix for `once` hook */ .hello-once {} .hello-once-active {} .hello-once-to {}  /* default prefix is used for `leave` and `enter` hooks */ .barba-leave {} .barba-leave-active {} .barba-leave-to {} .barba-enter {} .barba-enter-active {} .barba-enter-to {} ``` |

> Be careful, you need to add an **empty `once` / `leave` / `enter` hook** in order to let the plugin use the transition name as class prefix.
>
> This **may evolve** in a next release.

## Transition hooks

As Barba CSS plugin overrides main `once` / `leave` / `enter` hooks in order to run, the **code you will put inside those hooks won’t be executed**. However, you can safely use every other transition hooks to run custom code with the plugin:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` barba.init({   transitions: [{     name: 'hello'     once: () => {       // code here won't run...     },     beforeLeave: () => {       console.log('This message will be displayed in the console!');     }   }] }); ``` |

> This **may evolve** in a next release.

## Complex transition

### Browser load

If you want to play some transition on first load, use the `once` hook:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` .barba-once-active {   transition: opacity 450ms ease; }  .barba-once {   opacity: 0; }  .barba-once-to {   opacity: 1; } ``` |

> Don’t forget to set the `.barba-once-active` class in order to see the transition.

### Custom rule

You can use custom [transition rules](https://barba.js.org/docs/advanced/transitions/#Rules) to play transitions depending on the namespace or route.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 ``` | ``` import barba from '@barba/core'; import barbaCss from '@barba/css';  // tell Barba to use the css plugin barba.use(barbaCss);  // init Barba barba.init({   transitions: [{     name: 'fade',     leave() {},     enter() {}   }, {     name: 'slide',     leave() {},     enter() {},     from: {       namespace: 'home'     },     to: {       namespace: 'products'     }   }] }); ``` |

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 ``` | ``` .fade-leave-active, .fade-enter-active, .slide-leave-active, .slide-enter-active {   transition: opacity 450ms ease, transform 650ms ease-in-out; }  .fade-leave, .fade-enter-to {   opacity: 1; }  .fade-enter, .fade-leave-to {   opacity: 0; }  .slide-leave, .slide-enter-to {   transform: translateX(0); }  .slide-enter, .slide-leave-to {   transform: translateX(100%); } ``` |

[Prefetch](https://barba.js.org/docs/plugins/prefetch/)
[Head](https://barba.js.org/docs/plugins/head/)
