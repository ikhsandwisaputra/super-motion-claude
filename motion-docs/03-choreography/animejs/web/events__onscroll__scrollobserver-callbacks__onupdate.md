---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate
title: "onUpdate | ScrollObserver callbacks | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onUpdate](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate "onUpdate")

Triggers a function every time the linked object progress updates during scroll synchronisation.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate#accepts)

A `Function` whose first argument is the ScrollObserver instance

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate#default)

`noop`

## onUpdate code example

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: .5,
    debug: true,
    onUpdate: () => $value.textContent = ++updates,
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">updates</span>
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

* [onLeaveBackward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward "onLeaveBackward")
* [onSyncComplete](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete "onSyncComplete")
