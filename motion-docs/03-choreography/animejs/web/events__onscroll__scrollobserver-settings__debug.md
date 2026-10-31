---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug
title: "debug | ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug "debug")

Displays markers to better visualise the `enter` and `leave` [thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds) values.
Each ScrollObserver instances has a dedicated color.
The left side of the ruler represents the container [threshold](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds), and the right side the target [threshold](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds) values.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug#default)

`false`

## debug code example

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    debug: true,
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll down</div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll up</div>
      </div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [target](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target "target")
* [axis](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis "axis")
