---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target
title: "target | ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [target](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target "target")

Specifies which `HTMLElement` triggers the scroll event.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target#accepts)

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector")
* [DOM Element](https://animejs.com/documentation/animation/targets/dom-elements "DOM Element")

## [Defaults](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target#defaults)

* If defined on an animation, the first targeted `HTMLElement` of the animation.
* `null` if defined outside of an animation

## target code example

```js
import { createTimer, utils, onScroll } from 'animejs';

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer,
    container: '.scroll-container',
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
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
  </div>
</div>
```

```css
#scroll-scrollobserver-settings-target pre {
  left: 3rem;
  width: 12rem;
}
```

###### Previous

###### Next

* [container](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container "container")
* [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug "debug")
