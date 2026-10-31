---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values
title: "Relative position values | ScrollObserver thresholds | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Relative position values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values "Relative position values")

Defines position values relative to the target and container top coordinate using a a [Relative value](https://animejs.com/documentation/animation/tween-value-types/relative-value) syntax.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values#accepts)

| Prefix | Effect | Example |
| --- | --- | --- |
| `'+='` | Add | `'+=45'` |
| `'-='` | Subtracts | `'-=50%'` |
| `'*='` | Multiply | `'*=.5'` |

## Relative position values code example

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
    enter: 'center+=1em top-=100%',
    leave: 'center-=1em bottom+=100%',
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

* [Positions shorthands](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/positions-shorthands "Positions shorthands")
* [Min max](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max "Min max")
