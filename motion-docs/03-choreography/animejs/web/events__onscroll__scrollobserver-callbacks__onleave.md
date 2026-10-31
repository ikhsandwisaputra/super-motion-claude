---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave
title: "onLeave | ScrollObserver callbacks | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onLeave](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave "onLeave")

Triggers a function every time the `leave` [threshold](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "threshold") is met.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave#accepts)

A `Function` whose first argument is the ScrollObserver instance

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave#default)

`noop`

## onLeave code example

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let exits = 0;

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
    onLeave: () => $value.textContent = ++exits,
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">exits</span>
          <span class="value">0</span>
        </pre>
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

* [onEnterBackward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterbackward "onEnterBackward")
* [onLeaveForward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward "onLeaveForward")
