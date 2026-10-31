---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert
title: "revert() | ScrollObserver methods | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert "revert()")

Disables the ScrollObserver, removes all `EventListener` and removes the [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug "debug") `HTMLElement` if necessary.

## [Returns](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert#returns)

The ScrollObserver itself

## revert() code example

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
    sync: 1,
    debug: true,
    onSyncComplete: self => self.revert()
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

* [refresh()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh "refresh()")
* [ScrollObserver properties](https://animejs.com/documentation/events/onscroll/scrollobserver-properties "ScrollObserver properties")
