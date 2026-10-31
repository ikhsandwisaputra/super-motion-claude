---
source: https://animejs.com/documentation/events/onscroll/scrollobserver-settings
title: "ScrollObserver settings | onScroll | Events | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Events](https://animejs.com/documentation/events "Events")

[onScroll](https://animejs.com/documentation/events/onscroll "onScroll")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [ScrollObserver settings](https://animejs.com/documentation/events/onscroll/scrollobserver-settings "ScrollObserver settings")

ScrollObserver settings properties are defined directly in the `onScroll()` parameters `Object`.

```js
animate('.square', {
  x: 100,
  autoplay: onScroll({
  ┌──────────────────────────┐
  │ container: '.container', │
  │ target: '.section',      ├─ Settings
  │ axis: 'y',               │
  └──────────────────────────┘
    enter: 'bottom top',
    leave: 'top bottom',
    sync: true,
    onEnter: () => {},
    onLeave: () => {},
    onUpdate: () => {},
  })
});
```

###### In this section

* [container](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container "container")
* [target](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/target "target")
* [debug](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/debug "debug")
* [axis](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/axis "axis")
* [repeat](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/repeat "repeat")

###### Previous

###### Next

* [onScroll](https://animejs.com/documentation/events/onscroll "onScroll")
* [container](https://animejs.com/documentation/events/onscroll/scrollobserver-settings/container "container")
