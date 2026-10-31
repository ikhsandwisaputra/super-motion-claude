---
source: https://animejs.com/documentation/timeline/timeline-methods/play
title: "play() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [play()](https://animejs.com/documentation/timeline/timeline-methods/play "play()")

Forces the timeline to play forward.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/play#returns)

The timeline itself

Can be chained with other timeline methods.

## play() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $playButton ] = utils.$('.play');

const tl = createTimeline({
  autoplay: false
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const playTimeline = () => tl.play();

$playButton.addEventListener('click', playTimeline);
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
    <button class="button play">Play</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [init()](https://animejs.com/documentation/timeline/timeline-methods/init "init()")
* [reset()](https://animejs.com/documentation/timeline/timeline-methods/reset "reset()")
