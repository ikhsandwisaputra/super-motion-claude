---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/defaults
title: "defaults | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [defaults](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults "defaults")

Defines defaults parameters for the timeline children.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults#accepts)

An `Object` of [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters") (except [from](https://animejs.com/documentation/animation/tween-parameters/from "from value") and [to](https://animejs.com/documentation/animation/tween-parameters/to "to")), [Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings") and [Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

## defaults code example

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {
    ease: 'inOutExpo',
    duration: 500,
    loop: 2,
    reversed: true,
    alternate: true,
  }
})
.add('.square', { x: '15rem' })
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' });
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

* [Timeline playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")
* [delay](https://animejs.com/documentation/timeline/timeline-playback-settings/delay "delay")
