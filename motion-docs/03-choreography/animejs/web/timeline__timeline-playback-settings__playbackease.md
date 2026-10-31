---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease
title: "playbackEase | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [playbackEase](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease "playbackEase")

Applies and easing function to the entire playback of the timeline.

```
0 ──────────playbackEase──────────› 1
A ──ease──› B ──ease──› C ──ease──› D
```

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease#accepts)

[ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackease#default)

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.playbackEase = 'inOut';
```

## playbackEase code example

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({
  playbackEase: 'inOut(3)', // this ease is applied across all children
})
.add('.circle', { x: '15rem', ease: 'out(1)' })
.add('.triangle', { x: '15rem', ease: 'out(2)' })
.add('.square', { x: '15rem', ease: 'out(3)' });
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

###### Previous

###### Next

* [playbackRate](https://animejs.com/documentation/timeline/timeline-playback-settings/playbackrate "playbackRate")
* [Timeline callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")
