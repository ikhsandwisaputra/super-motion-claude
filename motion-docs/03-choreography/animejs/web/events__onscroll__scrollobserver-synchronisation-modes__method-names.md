---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names
title: "Method names | ScrollObserver synchronisation modes | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Method names](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names "Method names")

Defines a list of method names of the linked `Object` to be called when specific [callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "callbacks") are triggered.

## [Accepts](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names#accepts)

A `String` containing a list of [Animation methods](https://animejs.com/documentation/animation/animation-methods "Animation methods"), [Timer methods](https://animejs.com/documentation/timer/timer-methods "Timer methods") or [Timeline methods](https://animejs.com/documentation/animation/animation-methods "Timeline methods") names separated by an empty space

## [Callbacks definition order](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names#callbacks-definition-order)

### `'enter'`

Defines a method to be triggered when the enter threshold is crossed or when the element re-enters the viewport.

```js
{
  sync: 'play',
}
```

### `'enter leave'`

Defines methods to be triggered when the enter and leave thresholds are crossed.

```js
{
  sync: 'play pause',
}
```

### `'enterForward leaveForward enterBackward leaveBackward'`

Defines methods to be triggered when the enter and leave thresholds are crossed when scrolling forward and when the enter and leave thresholds are crossed when scrolling backward.

```js
{
  sync: 'play pause reverse reset',
}
```

## [Default](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names#default)

`'play pause'`

## Method names code example

```js
import { animate, onScroll } from 'animejs';

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  autoplay: onScroll({
    container: '.scroll-container',
    enter: 'bottom-=50 top',
    leave: 'top+=60 bottom',
    sync: 'resume pause reverse reset',
    debug: true
  })
});
```

```html
<div class="full-container scroll-container scroll-y">
  <div class="scroll-content grid square-grid">
    <div class="scroll-section padded">
      <div class="large row">
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

* [ScrollObserver synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")
* [Playback progress](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress "Playback progress")
