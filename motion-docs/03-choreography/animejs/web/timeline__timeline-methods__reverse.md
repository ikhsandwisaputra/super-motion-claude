---
source: https://animejs.com/documentation/timeline/timeline-methods/reverse
title: "reverse() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reverse()](https://animejs.com/documentation/timeline/timeline-methods/reverse "reverse()")

Forces the timeline to play backward.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/reverse#returns)

The timeline itself

Can be chained with other timeline methods.

## reverse() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $reverseButton ] = utils.$('.reverse');

const tl = createTimeline()
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const reverseTimeline = () => tl.reverse();

$reverseButton.addEventListener('click', reverseTimeline);
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
    <button class="button reverse">Reverse</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reset()](https://animejs.com/documentation/timeline/timeline-methods/reset "reset()")
* [pause()](https://animejs.com/documentation/timeline/timeline-methods/pause "pause()")
