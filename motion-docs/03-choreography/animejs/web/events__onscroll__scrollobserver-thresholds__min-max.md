---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max
title: "Min max | ScrollObserver thresholds | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Min max](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max "Min max")

Defines a threshold in the minimum or maximum scrollable space available. This is particularly useful in cases where some of the targeted elements initial position are either too small or too big to triggers `enter` and `leave` conditions.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max#accepts)

| Value | Description |
| --- | --- |
| `'min'` | The minimum value possible to meet the enter or leave condition |
| `'max'` | The maximum value possible to meet the enter or leave condition |

## Min max code example

```js
import { animate, onScroll, utils } from 'animejs';

utils.$('.square').forEach($square => {
  animate($square, {
    x: '15rem',
    rotate: '1turn',
    duration: 2000,
    alternate: true,
    ease: 'inOutQuad',
    autoplay: onScroll({
      container: '.scroll-container',
      sync: 1,
      enter: 'max bottom',
      leave: 'min top',
      debug: true
    })
  });
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [Relative position values](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/relative-position-values "Relative position values")
* [ScrollObserver synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")
