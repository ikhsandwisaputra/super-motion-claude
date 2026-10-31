---
source: https://animejs.com/documentation/animation/animation-callbacks
title: "Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

Execute functions at specific points during an animation playback.
Callbacks `Function` are specified directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
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

* [onBegin](https://animejs.com/documentation/animation/animation-callbacks/onbegin "onBegin")
* [onComplete](https://animejs.com/documentation/animation/animation-callbacks/oncomplete "onComplete")
* [onBeforeUpdate](https://animejs.com/documentation/animation/animation-callbacks/onbeforeupdate "onBeforeUpdate")
* [onUpdate](https://animejs.com/documentation/animation/animation-callbacks/onupdate "onUpdate")
* [onRender](https://animejs.com/documentation/animation/animation-callbacks/onrender "onRender")
* [onLoop](https://animejs.com/documentation/animation/animation-callbacks/onloop "onLoop")
* [onPause](https://animejs.com/documentation/animation/animation-callbacks/onpause "onPause")
* [then()](https://animejs.com/documentation/animation/animation-callbacks/then "then()")

###### Previous

###### Next

* [persist](https://animejs.com/documentation/animation/animation-playback-settings/persist "persist")
* [onBegin](https://animejs.com/documentation/animation/animation-callbacks/onbegin "onBegin")
