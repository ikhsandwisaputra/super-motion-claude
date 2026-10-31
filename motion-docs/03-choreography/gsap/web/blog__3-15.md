---
source: https://gsap.com/blog/3-15
title: "3.15 Release | GSAP | Docs & Learning"
fetched: 2026-10-28
---

# 3.15 Release

April 13, 2026 Â· 3 min read

[![Jack Doyle](https://gsap.com/img/jack-about.jpg)](https://twitter.com/greensock)

[Jack Doyle](https://twitter.com/greensock)

Founder and Code Connoisseur

[![Cassie Evans](https://gsap.com/img/cassie-about.jpg)](https://twitter.com/cassiecodes)

[Cassie Evans](https://twitter.com/cassiecodes)

Developer Education

## Introducing adaptive directional easing[â](https://gsap.com/blog/3-15/#introducing-adaptive-directional-easing "Direct link to Introducing adaptive directional easing")

Ever called `reverse()` on an animation and noticed the motion feels... off? That's because reversing an animation also reverses the easing curve, so an ease-out becomes an ease-in. Now with `easeReverse` - youâve got more creative control over how that reverse animation feels!

`easeReverse` is a new tween property that lets you define a different ease for when the playhead moves backwards. Set it to `true` to reuse the same ease as you've defined for the forwards direction, or pass in any ease string for a completely different feel.

```js
gsap.to(".box", {
  x: 300,
  ease: "expo.out",
  easeReverse: true, // same ease, adapted for reverse
});
```

```js
gsap.to(".box", {
  scale: 1,
  opacity: 1,
  ease: "back.out(1.7)",
  easeReverse: "sine.in", // totally different exit feel
});
```

### Simple example[â](https://gsap.com/blog/3-15/#simple-example "Direct link to Simple example")

#### loading...

### Interactive demo[â](https://gsap.com/blog/3-15/#interactive-demo "Direct link to Interactive demo")

The clever bit - GSAP recalculates easing from precisely where the playhead changed direction and applies it to the remaining distance. So it works smoothly even if you interrupt a tween mid-animation.

#### loading...

Easing tip

Combine easeReverse with `timeScale()` for a snappier close:

```js
isOpen ? tl.timeScale(1).play() : tl.timeScale(1.5).reverse();
```

### UI interactions[â](https://gsap.com/blog/3-15/#ui-interactions "Direct link to UI interactions")

#### loading...

### Radial Menu[â](https://gsap.com/blog/3-15/#radial-menu "Direct link to Radial Menu")

#### loading...

## `easeReverse` in timelines[â](https://gsap.com/blog/3-15/#easereverse-in-timelines "Direct link to easereverse-in-timelines")

`easeReverse` is a **tween-level** property, which works perfectly in timelines, no matter how deeply nested your tweens are. When a parent timeline reverses, every child tween with an `easeReverse` value will adjust it's easing dynamically.

You can also set `easeReverse` in your timeline `defaults` and it'll cascade down to the child tweens:

```js
let tl = gsap.timeline({
  defaults: {
    ease: "back.out",
    easeReverse: "expo.in",
  }
});

tl.to(".hero", { y: -100 }) // ease: "back.out", easeReverse: "expo.in"
  .to(".overlay", { opacity: 1, easeReverse: "power4.out" }) // ease: "back.out", easeReverse: "power4.out"
  .to(".cta", { scale: 1 }, 0.2); // ease: "back.out", easeReverse: "expo.in"

tl.reverse();
```

## When should I reach for `easeReverse`?[â](https://gsap.com/blog/3-15/#when-should-i-reach-for-easereverse "Direct link to when-should-i-reach-for-easereverse")

* **Toggleable UI**, modals, menus, drawers, tooltips.
* **Interruptible, reversible animations**, interactions where the user can change direction at any point.
* **Any `reverse()` call** where the default backwards easing doesn't look right.

## What about `yoyoEase`?[â](https://gsap.com/blog/3-15/#what-about-yoyoease "Direct link to what-about-yoyoease")

`easeReverse` is everything `yoyoEase` aspired to be. ð Think of it like a fully adaptive version of `yoyoEase` that even works if you change direction mid-tween. Therefore, `yoyoEase` has been deprecated. As of version 3.15.0, GSAP internally replaces `yoyoEase` with `easeReverse` (it's fully backwards-compatible).

## More demos on Codepen[â](https://gsap.com/blog/3-15/#more-demos-on-codepen "Direct link to More demos on Codepen")

See the [full collection here](https://codepen.io/collection/qBEOjr).

## Lots of minor improvements and fixes[â](https://gsap.com/blog/3-15/#lots-of-minor-improvements-and-fixes "Direct link to Lots of minor improvements and fixes")

See the [full list here](https://github.com/greensock/GSAP/releases/tag/3.15.0).

## Resources[â](https://gsap.com/blog/3-15/#resources "Direct link to Resources")

* [Full release notes on Github](https://github.com/greensock/GSAP/releases/tag/3.15.0)
* [easeReverse docs](https://gsap.com/docs/v3/GSAP/Tween#easeReverse)
* [Full documentation](https://gsap.com/docs/v3/)
* [Getting started with GSAP](https://gsap.com/resources/get-started)
* [Learning resources](https://gsap.com/resources)
* [Community forums](https://gsap.com/community/)
