---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis
title: "axis | ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [axis](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis "axis")

Specifies the scroll direction of the ScrollObserver container `HTMLElement`.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis#accepts)

* `'x'`
* `'y'`

## [Defaults](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis#defaults)

`'y'`

## axis code example

```js
import { animate, utils, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  ease: 'inOutQuad',
  autoplay: onScroll({
    container: '.scroll-container',
    axis: 'x',
  })
});
```

```html
<div class="full-container scroll-container scroll-x">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large centered row">
        <div class="label">scroll right →</div>
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

```css
#scroll-onscroll-settings-target pre {
  left: 3rem;
  width: 12rem;
}
```

###### Previous

###### Next

* [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug "debug")
* [repeat](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat "repeat")
