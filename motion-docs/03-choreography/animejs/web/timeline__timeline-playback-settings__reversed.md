---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/reversed
title: "reversed | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reversed](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed "reversed")

Defines the initial direction of the timeline.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed#accepts)

`Boolean`

* If set to `true` the animation plays backwards
* If set to `false` the animation plays forwards

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## reversed code example

```js
import { createTimeline, utils } from 'animejs';

const [ $time ] = utils.$('.time');

const tl = createTimeline({
  reversed: true,
  onUpdate: self => $time.innerHTML = self.currentTime
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
    <span class="label">current time</span>
    <span class="time value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [alternate](https://animejs.com/documentation/timeline/timeline-playback-settings/alternate "alternate")
* [autoplay](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay "autoplay")
