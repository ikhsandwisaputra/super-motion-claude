---
source: https://animejs.com/documentation/timer/timer-callbacks
title: "Timer callbacks | Timer | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timer](https://animejs.com/documentation/timer "Timer")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Timer callbacks](https://animejs.com/documentation/timer/timer-callbacks "Timer callbacks")

Execute functions at specific points during a timer playback.
Callbacks `Function` are specified directly in the `createTimer()` parameters `Object`.

```js
createTimer({
  duration: 1000,
  frameRate: true,
  loop: true,
┌─────────────────────┐
│ onBegin: () => {},  │
│ onLoop: () => {},   ├─ Callbacks
│ onUpdate: () => {}, │
└─────────────────────┘
});
```

###### In this section

* [onBegin](https://animejs.com/documentation/timer/timer-callbacks/onbegin "onBegin")
* [onComplete](https://animejs.com/documentation/timer/timer-callbacks/oncomplete "onComplete")
* [onUpdate](https://animejs.com/documentation/timer/timer-callbacks/onupdate "onUpdate")
* [onLoop](https://animejs.com/documentation/timer/timer-callbacks/onloop "onLoop")
* [onPause](https://animejs.com/documentation/timer/timer-callbacks/onpause "onPause")
* [then()](https://animejs.com/documentation/timer/timer-callbacks/then "then()")

###### Previous

###### Next

* [playbackRate](https://animejs.com/documentation/timer/timer-playback-settings/playbackrate "playbackRate")
* [onBegin](https://animejs.com/documentation/timer/timer-callbacks/onbegin "onBegin")
