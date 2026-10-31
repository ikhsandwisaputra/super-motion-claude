---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize
title: "onResize | ScrollObserver callbacks | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")

[Since 4.3.3](https://github.com/juliangarnier/anime/releases/tag/v4.3.3)

# [onResize](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize "onResize")

Triggers a function when a ScrollObserver's container resizes.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize#accepts)

A `Function` whose first argument is the ScrollObserver instance

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize#default)

`noop`

## onResize code example

```js
import { animate, onScroll, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let resizes = 0;

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  ease: 'linear',
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom top',
    leave: 'center bottom',
    sync: .5,
    onResize: () => $value.textContent = ++resizes,
  })
});
```

```html
<div class="iframe-content resizable">
  <div class="full-container scroll-container scroll-y">
    <div class="scroll-content grid square-grid">
      <div class="scroll-section sticky">
        <div class="large row">
          <pre class="large log row">
            <span class="label">resize</span>
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
</div>
```

###### Previous

###### Next

* [onSyncComplete](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete "onSyncComplete")
* [ScrollObserver methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")
