---
source: https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering
title: "Timeline positions staggering | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Timeline positions staggering](https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering "Timeline positions staggering")

The timeline `add()` position argument accepts function-based values, enabling the use of the stagger function returned by the `stagger()` method when positioning a multi-target animation.

This results in each target having creating its own animation to a staggered position, increasing by a set number of milliseconds for each subsequent target.

Callbacks defined on the staggered animation are also staggered and are called for every target.

The `start` property of the `stagger()` parameter object allows to define the starting value of the stagger, and accepts the same values as the timeline `add()` position argument.

## Timeline positions staggering code example

```js
import { createTimeline, stagger, utils } from 'animejs';

const tl = createTimeline();

const onComplete = ({ targets }) => {
  utils.set(targets, { color: 'var(--hex-red)' });
}

tl
.add('.circle', { x: '15rem', onComplete })
.label('circle completes')
.add(['.triangle', '.square'], {
  x: '15rem',
  onComplete, // Callbacks are aslo staggered
}, stagger(500, { start: 'circle completes-=500' }));
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
</div>
```

###### Previous

###### Next

* [Values staggering](https://animejs.com/documentation/utilities/stagger/values-staggering "Values staggering")
* [Stagger value types](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value types")
