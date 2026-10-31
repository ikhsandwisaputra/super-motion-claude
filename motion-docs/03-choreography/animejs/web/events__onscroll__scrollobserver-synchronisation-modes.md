---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes
title: "ScrollObserver synchronisation modes | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [ScrollObserver synchronisation modes](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes "ScrollObserver synchronisation modes")

Determines the behaviour of the animation and how it is synchronised relative to the scroll progress or by meeting certain thresholds.
The different synchronisation modes are defined on the `sync` property of the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
    container: '.container',
    target: '.section',
    axis: 'y',
    enter: 'bottom top',
    leave: 'top bottom',
┌──────────────────────────┐
│   sync: true,            ├─ Synchronisation Mode
└──────────────────────────┘
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

###### In this section

* [Method names](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names "Method names")
* [Playback progress](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/playback-progress "Playback progress")
* [Smooth scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/smooth-scroll "Smooth scroll")
* [Eased scroll](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/eased-scroll "Eased scroll")

###### Previous

###### Next

* [Min max](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds/min-max "Min max")
* [Method names](https://animejs.com/documentation/events/onscroll/scrollobserver-synchronisation-modes/method-names "Method names")
