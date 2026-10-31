---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks
title: "ScrollObserver callbacks | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [ScrollObserver callbacks](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks "ScrollObserver callbacks")

Triggers functions at specific points during scroll.
`ScrollObserver` callbacks functions are defined directly in the `onScroll()` parameters object.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
┌──────────────────────────┐
│   onEnter: () => {},     │
│   onLeave: () => {},     ├─ Callbacks
│   onUpdate: () => {},    │
└──────────────────────────┘
  })
});
```

###### In this section

* [onEnter](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter "onEnter")
* [onEnterForward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterforward "onEnterForward")
* [onEnterBackward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenterbackward "onEnterBackward")
* [onLeave](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleave "onLeave")
* [onLeaveForward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleaveforward "onLeaveForward")
* [onLeaveBackward](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onleavebackward "onLeaveBackward")
* [onUpdate](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onupdate "onUpdate")
* [onSyncComplete](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onsynccomplete "onSyncComplete")
* [onResize](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onresize "onResize")

###### Previous

###### Next

* [Eased scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll "Eased scroll")
* [onEnter](https://animejs.com/documentation/events/onscroll/scrollobserver-callbacks/onenter "onEnter")
