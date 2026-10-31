---
source: https://swup.js.org/plugins/scroll-plugin
title: "Scroll Plugin — swup"
fetched: 2026-10-28
---

[v4.0.0](https://github.com/swup/scroll-plugin)

# Scroll Plugin

A [swup](https://swup.js.org) plugin for customizable smooth scrolling.

* Enable smooth scrolling
* Animate scroll position between page visits
* Animate scrolling to anchors
* Define a custom offset for scroll positions
* Handle nested scroll containers
* Emulate scroll target selector

## [Installation](https://swup.js.org/plugins/scroll-plugin/#installation)

Install the plugin from npm and import it into your bundle.

```
npm install @swup/scroll-plugin
```

```
npm install @swup/scroll-plugin
```

```
import SwupScrollPlugin from '@swup/scroll-plugin';
```

```
import SwupScrollPlugin from '@swup/scroll-plugin';
```

Or include the minified production file from a CDN:

```
<script src="https://unpkg.com/@swup/scroll-plugin@4"></script>
```

```
<script src="https://unpkg.com/@swup/scroll-plugin@4"></script>
```

## [Usage](https://swup.js.org/plugins/scroll-plugin/#usage)

To run this plugin, include an instance in the swup options.

```
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

```
const swup = new Swup({
  plugins: [new SwupScrollPlugin()]
});
```

## [Behavior](https://swup.js.org/plugins/scroll-plugin/#behavior)

Scroll Plugin works out of the box for sites where the `window` is the main scroll container,
scrolling back up on page visits and restoring the previous position on browser history visits.

### [Scroll containers](https://swup.js.org/plugins/scroll-plugin/#scroll-containers)

If your site has other scroll containers than the `window`, like overflowing divs, the plugin will
happily restore their scroll positions as long as you let it know about those containers. You can
either add the attribute `[data-swup-scroll-container]` to them or use the
[scrollContainers](https://swup.js.org/plugins/scroll-plugin/#scrollcontainers) option to configure a custom selector.

### [Reset vs. restore](https://swup.js.org/plugins/scroll-plugin/#reset-vs-restore)

On each page navigation, the plugin will **reset** the scroll position to the top just like the
browser would. On backword/forward history visits, it will **restore** the previous scroll position
that was saved right before leaving the page.

You can customize when to reset vs. restore while clicking a link using the
[shouldResetScrollPosition](https://swup.js.org/plugins/scroll-plugin/#shouldresetscrollposition) option. A common use case would be a
custom back button: clicking it would normally reset the scoll position to the top while users would expect it
to restore the previous scroll position on the page the link points towards.

## [Options](https://swup.js.org/plugins/scroll-plugin/#options)

### [doScrollingRightAway](https://swup.js.org/plugins/scroll-plugin/#doscrollingrightaway)

`doScrollingRightAway` defines if swup is supposed to wait for the replace of the page to scroll to the top.

### [animateScroll](https://swup.js.org/plugins/scroll-plugin/#animatescroll)

`animateScroll` defines whether the scroll animation is enabled or swup simply sets the scroll
without animation instead. Passing `true` or `false` will enable or disable all scroll animations.
For finer control, you can pass an object:

```
{
  animateScroll: {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  }
}
```

```
{
  animateScroll: {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  }
}
```

💡 We encourage you to respect user preferences when setting the `animateScroll` option:

```
// Using a simple boolean...
{
  animateScroll: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
// ...or this little monster, with full control over everything:
{
  animateScroll: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  }
}
```

```
// Using a simple boolean...
{
  animateScroll: !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
// ...or this little monster, with full control over everything:
{
  animateScroll: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? false : {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  }
}
```

### [getAnchorElement](https://swup.js.org/plugins/scroll-plugin/#getanchorelement)

Customize how the scroll target is found on the page. Defaults to standard browser behavior (`#id` first, `a[name]` second).

```
{
  // Use a custom data attribute instead of id
  getAnchorElement: (hash) => {
    hash = hash.replace('#', '')
    return document.querySelector(`[data-scroll-target="${hash}"]`)
  }
}
```

```
{
  // Use a custom data attribute instead of id
  getAnchorElement: (hash) => {
    hash = hash.replace('#', '')
    return document.querySelector(`[data-scroll-target="${hash}"]`)
  }
}
```

### [markScrollTarget](https://swup.js.org/plugins/scroll-plugin/#markscrolltarget)

Due to [certain limitations](https://github.com/whatwg/html/issues/639) of the History API,
the [`:target` CSS pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:target) stops
working on sites that push their own history entries, which includes any site using swup. Enabling
this option provides an alternative way of styling the current target element.

Navigating to the URL `/index.html#section2` will make the following element the target element:

```
<section id="section2">Example</section>
```

```
<section id="section2">Example</section>
```

To highlight the current target element, use the `data-swup-scroll-target` attribute for styling:

```
[data-swup-scroll-target] {
  outline: 5px auto blue;
}
```

```
[data-swup-scroll-target] {
  outline: 5px auto blue;
}
```

### [Offset](https://swup.js.org/plugins/scroll-plugin/#offset)

Offset to substract from the final scroll position, to account for fixed headers. Can be either a
static number or a function that returns a value based on the scroll target. To apply differing
offsets for vertical and horizontal scrolling, return an object with `top` and `left` properties.

```
{
  // Number: fixed offset in px
  offset: 30,

  // Object: fixed vertical and horizontal offset in px
  offset: { top: 30, left: 10 },

  // Function: calculate offset before scrolling
  offset: () => document.querySelector('#header').offsetHeight,

  // The scroll target and container are passed into the function
  offset: (scrollTarget, scrollContainer) => target.offsetHeight * 2,
}
```

```
{
  // Number: fixed offset in px
  offset: 30,

  // Object: fixed vertical and horizontal offset in px
  offset: { top: 30, left: 10 },

  // Function: calculate offset before scrolling
  offset: () => document.querySelector('#header').offsetHeight,

  // The scroll target and container are passed into the function
  offset: (scrollTarget, scrollContainer) => target.offsetHeight * 2,
}
```

### [scrollContainers](https://swup.js.org/plugins/scroll-plugin/#scrollcontainers)

Customize the selector string used for finding scroll containers other than the `window`. See the
[Scroll Containers](https://swup.js.org/plugins/scroll-plugin/#scroll-containers) section for an explanation of how the plugin deals with
overflowing containers.

```
{
  // Always restore the scroll position of overflowing tables and sidebars
  scrollContainers: '.overflowing-table, .overflowing-sidebar'
}
```

```
{
  // Always restore the scroll position of overflowing tables and sidebars
  scrollContainers: '.overflowing-table, .overflowing-sidebar'
}
```

### [shouldResetScrollPosition](https://swup.js.org/plugins/scroll-plugin/#shouldresetscrollposition)

Callback function that allows customizing the behavior when a link is clicked. Instead of scrolling
back up on page visits, returning `false` here will instead restore the previous scroll position
recorded for that page. See [Reset vs. restore](https://swup.js.org/plugins/scroll-plugin/#reset-vs-restore) for an explanation and use cases.

```
{
  // Don't scroll back up for custom back-links, mimicking the browser back button
  shouldResetScrollPosition: (link) => !link.matches('.backlink')
}
```

```
{
  // Don't scroll back up for custom back-links, mimicking the browser back button
  shouldResetScrollPosition: (link) => !link.matches('.backlink')
}
```

### [Default options](https://swup.js.org/plugins/scroll-plugin/#default-options)

```
new SwupScrollPlugin({
  doScrollingRightAway: false,
  animateScroll: {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  },
  getAnchorElement: null,
  markScrollTarget: false,
  offset: 0,
  scrollContainers: `[data-swup-scroll-container]`,
  shouldResetScrollPosition: (link) => true,
  scrollFunction: undefined
});
```

```
new SwupScrollPlugin({
  doScrollingRightAway: false,
  animateScroll: {
    betweenPages: true,
    samePageWithHash: true,
    samePage: true
  },
  getAnchorElement: null,
  markScrollTarget: false,
  offset: 0,
  scrollContainers: `[data-swup-scroll-container]`,
  shouldResetScrollPosition: (link) => true,
  scrollFunction: undefined
});
```

## [Methods on the swup instance](https://swup.js.org/plugins/scroll-plugin/#methods-on-the-swup-instance)

Scroll Plugin adds the method `scrollTo` to the swup instance, which can be used for custom scrolling.
The method accepts a scroll position in pixels and a boolean whether the scroll position should be animated:

```
// will animate the scroll position of the window to 2000px
swup.scrollTo(2000, true);
```

```
// will animate the scroll position of the window to 2000px
swup.scrollTo(2000, true);
```

## [Hooks](https://swup.js.org/plugins/scroll-plugin/#hooks)

The plugin adds two new hooks `scroll:start` and `scroll:end` :

```
swup.hooks.on('scroll:start', () => console.log('Swup started scrolling'));
swup.hooks.on('scroll:end', () => console.log('Swup finished scrolling'));
```

```
swup.hooks.on('scroll:start', () => console.log('Swup started scrolling'));
swup.hooks.on('scroll:end', () => console.log('Swup finished scrolling'));
```

## [Custom scroll function](https://swup.js.org/plugins/scroll-plugin/#custom-scroll-function)

You can overwrite the scroll function with your own implementation by passing it in as the
`scrollFunction` option. This way, you gain full control over how you animate your scroll positions.
Below is an example using [GSAP's](https://greensock.com/docs/v3/)
[ScrollToPlugin](https://greensock.com/docs/v3/Plugins/ScrollToPlugin).

Note that you are responsible for calling the `start` and `end` functions passed to the scroll
function to let swup correctly trigger the `scroll:start` and `scroll:end` hooks.

```
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';

import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

/**
 * Use GSAP ScrollToPlugin for animated scrolling
 * @see https://greensock.com/docs/v3/Plugins/ScrollToPlugin
 */

new Swup({
  plugins: [
    new SwupScrollPlugin({
      scrollFunction: (el, top, left, animate, start, end) => {
        gsap.to(el, {
          duration: animate ? 0.6 : 0,
          ease: "power4.out",
          scrollTo: {
            y: top,
            x: left,
            autoKill: window.matchMedia("(hover: hover)").matches,
            onAutoKill: () => end(),
          },
          onStart: () => start(),
          onComplete: () => end(),
        });
      },
    }),
  ]
});
```

```
import Swup from 'swup';
import SwupScrollPlugin from '@swup/scroll-plugin';

import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

/**
 * Use GSAP ScrollToPlugin for animated scrolling
 * @see https://greensock.com/docs/v3/Plugins/ScrollToPlugin
 */

new Swup({
  plugins: [
    new SwupScrollPlugin({
      scrollFunction: (el, top, left, animate, start, end) => {
        gsap.to(el, {
          duration: animate ? 0.6 : 0,
          ease: "power4.out",
          scrollTo: {
            y: top,
            x: left,
            autoKill: window.matchMedia("(hover: hover)").matches,
            onAutoKill: () => end(),
          },
          onStart: () => start(),
          onComplete: () => end(),
        });
      },
    }),
  ]
});
```
