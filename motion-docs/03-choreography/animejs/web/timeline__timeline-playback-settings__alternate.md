---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/alternate
title: "alternate | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [alternate](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate "alternate")

Defines if the direction of the timeline alternates on each iteration when the loop parameter is set to `true` or superior to `1`.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## alternate code example

```js
import { createTimeline, utils } from 'animejs';

const [ $loops ] = utils.$('.loops');

let loops = 0;

const tl = createTimeline({
  loop: true,
  alternate: true,
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

* [loopDelay](https://animejs.com/documentation/timeline/timeline-playback-settings/playback-loopdelay "loopDelay")
* [reversed](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed "reversed")
