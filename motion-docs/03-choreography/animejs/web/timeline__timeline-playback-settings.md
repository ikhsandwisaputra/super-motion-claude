---
source: https://animejs.com/documentation/timeline/timeline-playback-settings
title: "Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Timeline playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

Specify the timings and behaviours of a timeline.
Timeline playback settings are defined directly in the `createTimeline()` parameters `Object`.

```js
createTimeline({
┌───────────────────┐
│ defaults: {       │
│   ease: 'out(3)', │
│   duration: 500,  │
│ },                ├─ Playback Settings
│ loop: 3,          │
│ alternate: true,  │
│ autoplay: false,  │
└───────────────────┘
  onBegin: () => {},
  onLoop: () => {},
  onUpdate: () => {},
});
```

###### In this section

* [defaults](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults "defaults")
* [delay](https://animejs.com/documentation/timeline/timeline-playback-settings/delay "delay")
* [loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop "loop")
* [loopDelay](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay "loopDelay")
* [alternate](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate "alternate")
* [reversed](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed "reversed")
* [autoplay](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay "autoplay")
* [frameRate](https://animejs.com/documentation/timeline/timeline-playback-settings/framerate "frameRate")
* [playbackRate](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate "playbackRate")
* [playbackEase](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease "playbackEase")

###### Previous

###### Next

* [Time position](https://animejs.com/documentation/timeline/time-position "Time position")
* [defaults](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults "defaults")
