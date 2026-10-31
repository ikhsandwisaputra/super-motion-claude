---
source: https://barba.js.org/docs/advanced/third-party
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

# Third party scripts

Using Barba means that your site is going to behave like a **SPA** *(Single Page Application)*, so all your inline scripts will be executed once, and they won’t be executed after a page change done through Barba.

This might be result in some **unexpected behaviors** when using classic third party scripts.

> We encourage you to **check the specific documentation provided by the vendors** on how handle *Single Page Applications* or *HTML Pushstate API* in general.

## Summary

1. [Google Analytics](https://barba.js.org/docs/advanced/third-party/#Google-Analytics)
2. [Google ReCaptcha](https://barba.js.org/docs/advanced/third-party/#Google-ReCaptcha)
3. [Locomotive scroll](https://barba.js.org/docs/advanced/third-party/#Locomotive-scroll)
4. [Lenis scroll](https://barba.js.org/docs/advanced/third-party/#Lenis-scroll)
5. [Scroll Trigger](https://barba.js.org/docs/advanced/third-party/#Scroll-Trigger)
6. [WordPress](https://barba.js.org/docs/advanced/third-party/#WordPress)

## Google Analytics

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v4-brightgreen.svg?style=flat-square "Badge")

### Page view

With `Google Analytics`, you can manually send a `pageview` with the following snippet.
The best place to do that is in the `after` [global hook](https://barba.js.org/docs/advanced/hooks/#Global-hooks), as it is applied to all your pages:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 ``` | ``` // disable automatic page view gtag('config', GTAG_ID, {   send_page_view: false, });  // after each transition, push page_view event to Analytics barba.hooks.after(() => {   gtag('event', 'page_view', {     'page_title': document.title,     'page_location': location.href,     'page_path': location.pathname,   }); }); ``` |

> See [Google SPA guide](https://developers.google.com/analytics/devguides/collection/analyticsjs/single-page-applications) for more details.

### Google Tag Manager

Although you can **manually send a page view**, as Google Tag Manager has a `History change trigger` made specifically to track virtual `pageview` in SPA.

> See [Google Tag Manager support center](https://support.google.com/tagmanager/answer/7679322) for more details.
>
> Know issue: [How to fix rogue referral with Google Tag Manager](https://www.simoahava.com/gtm-tips/fix-rogue-referral-problem-single-page-sites/)

## Google ReCaptcha

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v3-brightgreen.svg?style=flat-square "Badge")

Start by [generating your public/private keys](https://www.google.com/recaptcha/admin/create) and add the script inside your page:

|  |  |
| --- | --- |
| ``` 1 ``` | ``` <script src="https://www.google.com/recaptcha/api.js?render=RECAPTCHA_PUBLIC_KEY"></script> ``` |

Then generate the captcha **on the appropriate page** using a [`View`](https://barba.js.org/docs/advanced/views/):

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 ``` | ``` barba.init({   views: [{     namespace: 'index',     beforeEnter() {       grecaptcha.ready(() => {         grecaptcha.execute(key, {           action: 'captcha_index'         }).then((token) => {           // send token to your backend in order to check the captcha:           // you will need to make a POST request with token and private key           // see https://developers.google.com/recaptcha/docs/verify#api_request         });       });     }   } }); ``` |

> Be sure to call `grecaptcha.ready()` after adding the reCaptcha `script`.
>
> See [Google reCAPTCHA v3 guide](https://developers.google.com/recaptcha/docs/v3) for more details.

## Locomotive scroll

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v4.1.4-brightgreen.svg?style=flat-square "Badge")

This library is **well compatible with Barba**, but you can encounter issues when implementing it. You need to deal with your page template, Barba lifecycle and LocomotiveScroll settings.

Having absolute or fixed elements on your page could end in a bad height calculation from LocomotiveScroll, in this case, always put the `data-scroll-container` attribute on the section of your site that scroll, defaults is `window.document`.

### Viewport detection

When only using viewport detection, you can implement it this way:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 ``` | ``` const scroll = new LocomotiveScroll();  barba.hooks.after(() => {   scroll.init(); });  barba.init(); ``` |

> Using a global hook allows you to **reset the scroll in order to detect DOM elements** to observe on the next page.

### Smooth scroll

When using smooth scrolling, the more relevant solution is to nest the `data-barba="container"` inside the `data-scroll-container`, like this:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 ``` | ``` <body data-barba="wrapper">   <div data-scroll-container>     <main data-barba="container" data-barba-namespace="home">       <!-- page content -->     </main>   </div> </body> ``` |

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 ``` | ``` // init LocomotiveScroll on page load let scroll = new LocomotiveScroll({   el: container.querySelector('[data-scroll-container]'),   smooth: true });  // update the scroll after entering a page barba.hooks.after(() => {   scroll.update(); }); ``` |

> The LocomotiveScroll implementation really depends on where you set the `data-scroll-container` attribute: it can be whenever you want on the page, no matter outside or inside Barba wrapper/container, but keep in mind that **when using it inside the Barba container, it will be duplicated**. Bear with this!
>
> Note that this code assume that you have the `data-scroll-container` attribute on every pages, so you need to add the appropriate checks if LocomotiveScroll is not used on the whole site.

### Hooks workflow

Inside a SPA, **it’s not needed to have multiple instance of LocomotiveScroll**, but in order to properly update it, it’s necessary to use Barba hooks to have a consistent result when transitioning.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 ``` | ``` const scroll = new LocomotiveScroll();  // lock the scroll to prevent further animations when transitioning barba.hooks.before(() => {   scroll.stop(); });  // reset scroll position and update the scroll when the next page is fetched barba.hooks.enter(() => {   scroll.scrollTo({     offset: 0,     smooth: false,     disableLerp: true,     duration: 0   });    scroll.update(); });  // unlock the scroll, in order to let the user be able to scroll again barba.hooks.after(() => {   scroll.start(); }); ``` |

> Depending on what’s inside your website, you can also reset/update the LocomotiveScroll instance inside the Barba `after` hook instead.

## Lenis scroll

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v1.0.42-brightgreen.svg?style=flat-square "Badge")

Unlike LocomotiveScroll that uses scroll hijacking, Lenis is using browser **native scrolling**, meaning you don’t have to update/refresh it between your website pages. It’s simple as this:

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 ``` | ``` import barba from '@barba/core'; import Lenis from '@studio-freight/lenis';  // init lenis const lenis = new Lenis({   lerp: 0.1,   smooth: true, });  const loop = (time) => {   lenis.raf(time);   requestAnimationFrame(loop); };  requestAnimationFrame(loop);  // init barba barba.init(); ``` |

> Note that if you link Lenis with [ScrollTrigger](https://barba.js.org/docs/advanced/third-party/#Scroll-Trigger), you will need to **deal with triggers**.

## Scroll Trigger

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v3.12.5-brightgreen.svg?style=flat-square "Badge")

There are **no specific issues** when trying to implement this library in a website that uses Barba. Depending on how your website animations are shared along all your pages, and also how you have planned to deal with scroll “triggers”, you may prefer using a view hook instead of a global hook.

### View hook

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 ``` | ``` <body data-barba="wrapper">   <div data-scroll-container>     <main data-barba="container" data-barba-namespace="home">       <!-- put content here to have a scrollbar -->       <div class="scrolltrigger-element">         <p>This element is animated by ScrollTrigger</p>       </div>       <!-- put content here to have a scrollbar -->     </main>   </div> </body> ``` |

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 ``` | ``` import barba from '@barba/core'; import gsap from 'gsap'; import ScrollTrigger from 'gsap/ScrollTrigger';  // global instance const instance;  // init barba barba.init({   views: [{     namespace: 'home',     beforeEnter() {        // get the element you want to animate       const element = document.querySelector('.scrolltrigger-element');        // create a basic timeline       const timeline = gsap.to(element, {         x: 500,         duration: 2       });        // create instance each time you enter the page       instance = ScrollTrigger.create({         animation: timeline,         trigger: element,         start: 'center 75%',         markers: true       });     },     afterLeave() {        // kill instance each time you leave the page       instance.kill();     },   }] }); ``` |

> Keep in mind that **it is very important to kill ScrollTrigger instances** when navigating between two pages, otherwise your instances will overlap together.

## WordPress

![Version](https://img.shields.io/badge/%F0%9F%A7%AA%20tested%20with-v6.5.2-brightgreen.svg?style=flat-square "Badge")

### Update `body` classes

When using the **WordPress CMS** you might notice that `body` classes could be different from one page to another. If you need to keep consistency between pages, you need to manually update the classes, mainly because the `body` element is placed outside of the `data-barba="container"`.

|  |  |
| --- | --- |
| ``` 1 2 3 4 5 6 7 8 9 10 11 12 ``` | ``` import barba from '@barba/core';  // init barba barba.init({   transitions: [{     enter() {},     beforeEnter: ({ next }) => {       const matches = next.html.match(/<body.+?class="([^""]*)"/i);       document.body.setAttribute('class', (matches && matches.at(1)) ?? '');     }   }] }); ``` |

> The implementation above **replace all `body` classes** from the current page with all classes from the next page. Be sure to adapt it depending on your needs.

## Other third party scripts

This is a draft section that **may evolve in time**, and many other important third party scripts will be added.

> Don’t hesitate to **ask the Barba team [on Slack](https://barbajs.slack.com/)** if you want to request one to be present on this page.

[Recipes](https://barba.js.org/docs/advanced/recipes/)
[Utils](https://barba.js.org/docs/advanced/utils/)
