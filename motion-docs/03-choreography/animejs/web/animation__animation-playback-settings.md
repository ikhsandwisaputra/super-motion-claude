---
source: https://animejs.com/documentation/animation/animation-playback-settings
title: "Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [Animation playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

Specify the timings and behaviours of an animation.
Playback settings properties are defined directly in the `animate()` parameters `Object`.

```js
animate('.square', {
  translateX: 100,
  scale: 2,
  opacity: .5,
  duration: 400,
  delay: 250,
  ease: 'out(3)',
┌───────────────────┐
│ loop: 3,          │
│ alternate: true,  ├─ Playback Settings
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

###### In this section

* [delay](https://animejs.com/documentation/animation/animation-playback-settings/delay "delay")
* [duration](https://animejs.com/documentation/animation/animation-playback-settings/duration "duration")
* [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")
* [loopDelay](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay "loopDelay")
* [alternate](https://animejs.com/documentation/animation/animation-playback-settings/alternate "alternate")
* [reversed](https://animejs.com/documentation/animation/animation-playback-settings/reversed "reversed")
* [autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay")
* [frameRate](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate")
* [playbackRate](https://animejs.com/documentation/animation/animation-playback-settings/playbackrate "playbackRate")
* [playbackEase](https://animejs.com/documentation/animation/animation-playback-settings/playbackease "playbackEase")
* [persist](https://animejs.com/documentation/animation/animation-playback-settings/persist "persist")

###### Previous

###### Next

* [Percentage based keyframes](https://animejs.com/documentation/animation/keyframes/percentage-based-keyframes "Percentage based keyframes")
* [delay](https://animejs.com/documentation/animation/animation-playback-settings/delay "delay")
