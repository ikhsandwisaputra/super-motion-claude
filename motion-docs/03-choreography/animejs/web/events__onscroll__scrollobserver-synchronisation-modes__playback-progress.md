---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress
title: "Playback progress | ScrollObserver synchronisation modes | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Playback progress](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress "Playback progress")

Perfectly synchronises the playback progress of the linked object to the scroll position by passing a value of either `true` or `1`.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress#accepts)

* `1`
* `true`

## Playback progress code example

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
    sync: true,
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

* [Method names](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names "Method names")
* [Smooth scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll "Smooth scroll")
