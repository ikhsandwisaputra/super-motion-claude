---
source: https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay
title: "autoplay | Timeline playback settings | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Playback settings](https://animejs.com/documentation/timeline/timeline-playback-settings "Timeline playback settings")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [autoplay](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay "autoplay")

Defines the play mode of a timeline.

## [Accepts](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay#accepts)

`Boolean` | [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll")

* If set to `true` the timeline plays automatically
* If set to `false` the timeline has to be manually played
* If set to [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") the timeline will starts when the [scroll thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "scroll thresholds") conditions are met

## [Default](https://animejs.com/documentation/timeline/timeline-playback-settings/autoplay#default)

`true`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

## autoplay code example

```js
import { createTimeline, utils } from 'animejs';

const [ $paused ] = utils.$('.paused');
const [ $play ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false,
  onUpdate: self => $paused.innerHTML = !!self.paused,
  onComplete: self => $paused.innerHTML = !!self.paused
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '-=500')
.add('.square', { x: '15rem' }, '-=500');

const playTl = () => tl.paused ? tl.restart() : tl.play();

$play.addEventListener('click', playTl);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">paused</span>
    <span class="paused value">true</span>
  </pre>
</div>
<div class="large row controls">
  <button class="play">Play</button>
</div>
```

###### Previous

###### Next

* [reversed](https://animejs.com/documentation/timeline/timeline-playback-settings/reversed "reversed")
* [frameRate](https://animejs.com/documentation/timeline/timeline-playback-settings/framerate "frameRate")
