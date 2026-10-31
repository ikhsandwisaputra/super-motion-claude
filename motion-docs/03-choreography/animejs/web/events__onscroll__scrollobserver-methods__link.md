---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link
title: "link() | ScrollObserver methods | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [link()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link "link()")

Connects an [Animation](https://animejs.com/documentation/animation "Animation"), [Timer](https://animejs.com/documentation/timer "Timer") or [Timeline](https://animejs.com/documentation/timeline "Timeline") to a `ScrollObserver` instance.
This is equivalent to defining an `onScroll()` instance on the `autoplay` parameter.

Only one object can be linked at a time, every call to `link()` overrides the previously linked object.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link#accepts)

[Animation](https://animejs.com/documentation/animation "Animation") | [Timer](https://animejs.com/documentation/timer "Timer") | [Timeline](https://animejs.com/documentation/timeline "Timeline")

## [Returns](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link#returns)

The ScrollObserver itself

## link() code example

```js
import { animate, onScroll } from 'animejs';

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
});

const scrollObserver = onScroll({
  container: '.scroll-container',
  enter: 'bottom-=50 top',
  leave: 'top+=60 bottom',
  sync: true,
  debug: true,
});

scrollObserver.link(animation);
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [ScrollObserver methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")
* [refresh()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh "refresh()")
