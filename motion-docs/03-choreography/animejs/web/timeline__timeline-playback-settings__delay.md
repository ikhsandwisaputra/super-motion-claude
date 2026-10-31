---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/delay
title: "delay | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [delay](https://animejs.com/documentation/timeline/timeline-playback-settings/delay "delay")

Defines the delay, in milliseconds, before the timeline starts.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/delay#accepts)

A `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/delay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.delay = 500;
```

## delay code example

```js
import { createTimeline, createTimer, utils } from 'animejs';

const tl = createTimeline({
  delay: 2000,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

// For logging delayed time only

const [ $time ] = utils.$('.time');

createTimer({
  duration: 2000 + tl.duration,
  onUpdate: self => $time.innerHTML = (2000 - self.currentTime) * -1,
});
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">current time</span>
    <span class="time value lcd">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [defaults](https://animejs.com/documentation/timeline/timeline-playback-settings/defaults "defaults")
* [loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop "loop")
