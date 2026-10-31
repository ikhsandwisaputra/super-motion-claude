---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll
title: "Eased scroll | ScrollObserver synchronisation modes | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Eased scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll "Eased scroll")

Applies an easing function to the synchronised playback progress of the linked object relative to the scroll position.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll#accepts)

[ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

## Eased scroll code example

```js
import { animate, stagger, onScroll } from 'animejs';

animate('.square', {
  x: '12rem',
  rotate: '1turn',
  ease: 'linear',
  delay: stagger(100, { from: 'last' }),
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'inOutCirc',
    debug: true,
  })
});
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

* [Smooth scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll "Smooth scroll")
* [ScrollObserver callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")
