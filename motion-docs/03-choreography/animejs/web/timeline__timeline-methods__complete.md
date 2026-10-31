---
source: https://animejs.com/documentation/timeline/timeline-methods/complete
title: "complete() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [complete()](https://animejs.com/documentation/timeline/timeline-methods/complete "complete()")

Completes the timeline instantly.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/complete#returns)

The timeline itself

Can be chained with other timeline methods.

## complete() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $completeButton ] = utils.$('.complete');

const tl = createTimeline({
  loop: true,
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const completeTimeline = () => tl.complete();

$completeButton.addEventListener('click', completeTimeline);
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
    <button class="button complete">Complete</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [resume()](https://animejs.com/documentation/timeline/timeline-methods/resume "resume()")
* [cancel()](https://animejs.com/documentation/timeline/timeline-methods/cancel "cancel()")
