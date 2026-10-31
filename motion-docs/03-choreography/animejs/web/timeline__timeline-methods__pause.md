---
source: https://animejs.com/documentation/timeline/timeline-methods/pause
title: "pause() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [pause()](https://animejs.com/documentation/timeline/timeline-methods/pause "pause()")

Pauses a running timeline.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/pause#returns)

The timeline itself

Can be chained with other timeline methods.

## pause() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $pauseButton ] = utils.$('.pause');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();

$pauseButton.addEventListener('click', pauseTimeline);
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button pause">Pause</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reverse()](https://animejs.com/documentation/timeline/timeline-methods/reverse "reverse()")
* [restart()](https://animejs.com/documentation/timeline/timeline-methods/restart "restart()")
