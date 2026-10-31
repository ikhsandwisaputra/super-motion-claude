---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/loop
title: "loop | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [loop](https://animejs.com/documentation/timeline/timeline-playback-settings/loop "loop")

Defines how many times a timeline repeats.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/loop#accepts)

| Value | Effect |
| --- | --- |
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/loop#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loop = true;
```

## loop code example

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  onLoop: self => $loops.innerHTML = ++loops,
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

* [delay](https://animejs.com/documentation/timeline/timeline-playback-settings/delay "delay")
* [loopDelay](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay "loopDelay")
