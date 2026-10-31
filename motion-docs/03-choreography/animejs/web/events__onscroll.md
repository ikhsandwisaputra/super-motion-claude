---
source: https://animejs.com/documentation/events/onscroll
title: "onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

## [Triggers and synchronises Timer, Animation and Timeline instances on scroll.](https://animejs.com/documentation/events/onscroll#triggers-and-synchronises-timer-animation-and-timeline-instances-on-scroll)

ScrollObservers are created with the `onScroll()` function and can be directly declared in the [`autoplay parameter`](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay parameter").

```js
import { onScroll, animate } from 'animejs';

animate(targets, { x: 100, autoplay: onScroll(parameters) });
```

The `onScroll()` method can be imported directly from the main `'animejs'` module:

```js
import { onScroll } from 'animejs';

onScroll();
```

Or imported as a standalone module from the `'animejs/events'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { onScroll } from 'animejs/events';
```

## [Parameters](https://animejs.com/documentation/events/onscroll#parameters)

| Name | Accepts |
| --- | --- |
| parameters | An `Object` of [ScrollObserver settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings"), [ScrollObserver thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds"), [ScrollObserver sync modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver sync modes") and [ScrollObserver callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks") |

## [Returns](https://animejs.com/documentation/events/onscroll#returns)

`ScrollObserver`

## onScroll code example

```js
import { animate, createTimer, createTimeline , utils, onScroll } from 'animejs';

const [ container ] = utils.$('.scroll-container');
const debug = true;

// Animation

animate('.square', {
  x: '15rem',
  rotate: '1turn',
  duration: 2000,
  alternate: true,
  loop: true,
  autoplay: onScroll({ container, debug })
});

// Timer

const [ $timer ] = utils.$('.timer');

createTimer({
  duration: 2000,
  alternate: true,
  loop: true,
  onUpdate: self => {
    $timer.innerHTML = self.iterationCurrentTime
  },
  autoplay: onScroll({
    target: $timer.parentNode,
    container,
    debug
  })
});

// Timeline

const circles = utils.$('.circle');

createTimeline({
  alternate: true,
  loop: true,
  autoplay: onScroll({
    target: circles[0],
    container,
    debug
  })
})
.add(circles[2], { x: '9rem' })
.add(circles[1], { x: '9rem' })
.add(circles[0], { x: '9rem' });
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
    <div class="scroll-section padded">
      <div class="large centered row">
        <pre class="large log row">
          <span class="label">timer</span>
          <span class="timer value lcd">0</span>
        </pre>
      </div>
    </div>
    <div class="scroll-section padded">
      <div class="large row">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </div>
</div>
```

```css
#scroll-auto-play-on-scroll pre {
  left: 3rem;
  width: 12rem;
}

#scroll-auto-play-on-scroll .circle {
  margin: 0;
}
```

###### In this section

* [Settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")
* [Thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "ScrollObserver thresholds")
* [Synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")
* [Callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")
* [Methods](https://animejs.com/documentation/events/onscroll/scrollobserver-methods "ScrollObserver methods")
* [Properties](https://animejs.com/documentation/events/onscroll/scrollobserver-properties "ScrollObserver properties")

###### Previous

###### Next

* [Events](https://animejs.com/documentation/events "Events")
* [ScrollObserver settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")
