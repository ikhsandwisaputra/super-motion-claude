---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay
title: "loopDelay | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [loopDelay](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay "loopDelay")

Defines the delay in milliseconds between each loops.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay#accepts)

A `Number` equal to or greater than `0`

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loopDelay = 500;
```

## loopDelay code example

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

const tl = createTimeline({
  loopDelay: 500,
  loop: true,
  onLoop: self => $loops.innerHTML = self._currentIteration,
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">loops</span>
    <span class="loops value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop "loop")
* [alternate](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate "alternate")
