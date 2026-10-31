---
source: https://animejs.com/documentation/timeline/timeline-methods/alternate
title: "alternate() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [alternate()](https://animejs.com/documentation/timeline/timeline-methods/alternate "alternate()")

Toggles the playback direction while adjusting the `currentTime` position to reflect the new time progress.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/alternate#returns)

The timeline itself

Can be chained with other timeline methods.

## alternate() code example

```js
import { creatTimeline, utils } from 'animejs';

const [ $alternateButton ] = utils.$('.button');

const tl = createTimeline({ loop: true })
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const pauseTimeline = () => tl.pause();
const playTimeline = () => tl.play();
const alternateTimeline = () => tl.alternate();

$alternateButton.addEventListener('click', alternateTimeline);
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
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [restart()](https://animejs.com/documentation/timeline/timeline-methods/restart "restart()")
* [resume()](https://animejs.com/documentation/timeline/timeline-methods/resume "resume()")
