---
source: https://barba.js.org/docs/getstarted/basic-transition
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

# Basic transition

One of **the most important thing** that you will use is `transitions`.

## What is it?

A transition run between two pages of your site, leading the user to see a **fluid and smooth animation** instead of a browser “force reload” with a blank page.

A basic transition is made of a `leave` animation, that is executed when leaving the current page, and an `enter` animation that is executed when entering the next page:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` barba.init({   transitions: [{     name: 'default-transition',     leave() {       // create your stunning leave animation here     },     enter() {       // create your amazing enter animation here     }   }] }); ``` |

> Take a look at the [lifecycle diagram](https://barba.js.org/docs/getstarted/lifecycle/) to understand when `leave` and `enter` hooks are triggered during your page transition.

## Animation

The important part for a good transition is animation. As **Barba is not an animation library**, you will need to import one in order to animate elements on the interface to create your transition.

There is a lot of javascript animation libraries on the web, here is a good start:

* [gsap](https://greensock.com/gsap/) — *professional-grade animation for the modern web*
* [popmotion](https://popmotion.io/) — *simple libraries for delightful interfaces*
* [animejs](https://animejs.com/) — *a lightweight library with a simple and powerful API*
* [mojs](https://mojs.github.io/) — *the motion graphics toolbelt for the web*
* [spirit](https://spiritjs.io/) — *the ultimate tool to create high-quality animations directly in the browser*

For the demonstration, here is a basic **opacity transition** with gsap that consist of making the current page transparent, while the next page become opaque:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 ``` | ``` barba.init({   transitions: [{     name: 'opacity-transition',     leave(data) {       return gsap.to(data.current.container, {         opacity: 0       });     },     enter(data) {       return gsap.from(data.next.container, {         opacity: 0       });     }   }] }); ``` |

> Be careful when using cross-fading transition, usually with [sync mode](https://barba.js.org/docs/advanced/transitions/#Sync-mode), you need to **properly place your [container](https://barba.js.org/docs/getstarted/markup/#Container) using CSS** to prevent it from moving to the bottom or right.

There is **a lot of syntaxes** that you can use when running your animation transitions. Take a look at the [advanced transitions guide](https://barba.js.org/docs/advanced/transitions/) to learn more.

[Markup](https://barba.js.org/docs/getstarted/markup/)
[Run custom code](https://barba.js.org/docs/getstarted/custom-code/)
