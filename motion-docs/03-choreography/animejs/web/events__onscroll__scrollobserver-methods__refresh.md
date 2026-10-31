---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh
title: "refresh() | ScrollObserver methods | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [refresh()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh "refresh()")

Updates the bounding values, and re-compute the [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based values") of a ScrollObserver instance.

The following parameters can be refreshed when set with a [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value"):

* `repeat`
* `axis`
* `enter`
* `leave`

No need to call `.refresh()` when the container size changes, this is already handled internally.

## [Returns](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/refresh#returns)

The ScrollObserver itself

## refresh() code example

```js
import { animate, onScroll, utils } from 'animejs';

const scrollSettings = {
  enter: 20,
  leave: 60,
}

const animation = animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: () => `bottom-=${scrollSettings.enter} top`,
    leave: () => `top+=${scrollSettings.leave} bottom`,
    sync: .5,
    debug: true,
  })
});

animate(scrollSettings, {
  enter: 90,
  leave: 100,
  loop: true,
  alternate: true,
  modifier: utils.round(0),
  onUpdate: () => animation._autoplay.refresh()
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

* [link()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/link "link()")
* [revert()](https://animejs.com/documentation/events/onscroll/scrollobserver-methods/revert "revert()")
