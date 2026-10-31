---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete
title: "onSyncComplete | ScrollObserver callbacks | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onSyncComplete](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete "onSyncComplete")

Triggers a function when the linked object synchronisation completes.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete#accepts)

A `Function` whose first argument is the ScrollObserver instance

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete#default)

`noop`

## onSyncComplete code example

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let completions = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    debug: true,
    onSyncComplete: () => $value.textContent = ++completions,
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded sticky">
      <div class="large row">
        <pre class="large log row">
          <span class="label">completions</span>
          <span class="value">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="square"></div>
      </div>
    </div>
    <div class="scroll-section"></div>
  </div>
</div>
```

###### Previous

###### Next

* [onUpdate](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate "onUpdate")
* [onResize](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize "onResize")
