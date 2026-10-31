---
source: https://animejs.com/documentation/timeline/timeline-callbacks
title: "Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Timeline callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

Execute functions at specific points during a timeline playback.
Timeline callbacks functions are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
  defaults: {
    ease: 'out(3)',
    duration: 500,
  },
  loop: 3,
  alternate: true,
  autoplay: false,
┌─────────────────────┐
│ onBegin: () => {},  │
│ onLoop: () => {},   ├─ Callbacks
│ onUpdate: () => {}, │
└─────────────────────┘
});
```

###### In this section

* [onBegin](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin "onBegin")
* [onComplete](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete "onComplete")
* [onBeforeUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate "onBeforeUpdate")
* [onUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate "onUpdate")
* [onRender](https://animejs.com/documentation/timeline/timeline-callbacks/onrender "onRender")
* [onLoop](https://animejs.com/documentation/timeline/timeline-callbacks/onloop "onLoop")
* [onPause](https://animejs.com/documentation/timeline/timeline-callbacks/onpause "onPause")
* [then()](https://animejs.com/documentation/timeline/timeline-callbacks/then "then()")

###### Previous

###### Next

* [playbackEase](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease "playbackEase")
* [onBegin](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin "onBegin")
