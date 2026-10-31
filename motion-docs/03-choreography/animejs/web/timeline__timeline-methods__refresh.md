---
source: https://animejs.com/documentation/timeline/timeline-methods/refresh
title: "refresh() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [refresh()](https://animejs.com/documentation/timeline/timeline-methods/refresh "refresh()")

Re-computes the timeline children animated values defined with a [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") by updating their *from* values to their current target values, and their *to* values to their newly computed values.

Only the animatable properties values are re-calculated, `duration` and `delay` cannot be refreshed.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/refresh#returns)

The timeline itself

Can be chained with other timeline methods.

## refresh() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const tl = createTimeline({
  loop: true,
  onLoop: self => self.refresh()
})
.add('.circle',   { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.triangle', { x: () => utils.random(0, 15) + 'rem' }, 0)
.add('.square',   { x: () => utils.random(0, 15) + 'rem' }, 0);

const refreshTimeline = () => tl.refresh().restart();

$refreshButton.addEventListener('click', refreshTimeline);
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
    <button class="button refresh">Refresh & Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [stretch()](https://animejs.com/documentation/timeline/timeline-methods/stretch "stretch()")
* [Timeline properties](https://animejs.com/documentation/timeline/timeline-properties "Timeline properties")
