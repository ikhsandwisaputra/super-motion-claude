---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values
title: "Numeric values | ScrollObserver thresholds | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Numeric values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values "Numeric values")

Defines an offset from the top of the target and container by passing a numeric values.
If no unit is defined, the values is interpreted as pixels.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values#accepts)

| Type | Example | Description |
| --- | --- | --- |
| Number | `100` | 100px from the top of the target or container |
| Unit | `'1rem'` | 1rem from the top of the target or container |
| Percentage | `'10%'` | 10% of the target or container height, from the top of the target or container |

## [Default unit](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/numeric-values#default-unit)

`px`

## Numeric values code example

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
    // 80% from the top of the container, -50px from the top of the target
    enter: '80% 20%',
    // 50px from the top of the container, 100px from the top of the target
    leave: '50 -25',
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

* [ScrollObserver thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")
* [Positions shorthands](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands "Positions shorthands")
