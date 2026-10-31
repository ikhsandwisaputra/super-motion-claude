---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands
title: "Positions shorthands | ScrollObserver thresholds | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Positions shorthands](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands "Positions shorthands")

Defines the position of the target and container by passing the position name.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands#accepts)

| Value | Returns |
| --- | --- |
| `'top'` | The top y value |
| `'bottom'` | The bottom y value |
| `'left'` | The left x value |
| `'right'` | The right x value |
| `'center'` | The center x or y value |
| `'start'` | Equivalent to `'top'` and `'left'` depending of the axis |
| `'end'` | Equivalent to `'bottom'` and `'right'` depending of the axis |

## Positions shorthands code example

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
    enter: 'center top',
    leave: 'center bottom',
    debug: true
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
    <div class="scroll-section">
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [Numeric values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values "Numeric values")
* [Relative position values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values "Relative position values")
