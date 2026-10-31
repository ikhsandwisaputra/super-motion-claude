---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll
title: "Smooth scroll | ScrollObserver synchronisation modes | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Smooth scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll "Smooth scroll")

Smoothly animate the playback progress of the linked object to the scroll position by passing a value between `0` and `1`. The closer the value gets to `0`, the longer the animation takes to catch up with the current scroll position.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll#accepts)

A `Number` greater than or equal to `0` and lower to or equal `1`

## Smooth scroll code example

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .25,
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
      </div>
    </div>
    <div class="scroll-section">
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [Playback progress](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress "Playback progress")
* [Eased scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll "Eased scroll")
