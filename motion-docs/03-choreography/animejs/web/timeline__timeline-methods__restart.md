---
source: https://animejs.com/documentation/timeline/timeline-methods/restart
title: "restart() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [restart()](https://animejs.com/documentation/timeline/timeline-methods/restart "restart()")

Sets the `currentTime` of a timeline to `0` and reset all properties of the elements to their initial state.

If the `autoplay` parameter is set to `true`, the timeline plays automatically.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/restart#returns)

The timeline itself

Can be chained with other timeline methods.

## restart() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $restartButton ] = utils.$('.restart');

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const restartTimeline = () => tl.restart();

$restartButton.addEventListener('click', restartTimeline);
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
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [pause()](https://animejs.com/documentation/timeline/timeline-methods/pause "pause()")
* [alternate()](https://animejs.com/documentation/timeline/timeline-methods/alternate "alternate()")
