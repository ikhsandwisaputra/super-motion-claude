---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container
title: "container | ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [container](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container "container")

Specifies the container `HTMLElement` to which the scroll event is applied.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container#accepts)

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements "DOM Element")

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container#default)

`null`

## container code example

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
    container: '.scroll-container'
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
  </div>
</div>
```

###### Previous

###### Next

* [ScrollObserver settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")
* [target](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target "target")
