---
source: https://animejs.com/documentation/timeline/timeline-methods/revert
title: "revert() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [revert()](https://animejs.com/documentation/timeline/timeline-methods/revert "revert()")

Cancels the timeline, reverts all its children's animated values to their original state, cleans up the CSS inline styles, and reverts the linked [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") instance if necessary.

Use `.revert()` when you want to completely stop and destroy a timeline.

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/revert#returns)

The timeline itself

Can be chained with other timeline methods.

## revert() code example

```js
import { createTimeline, utils } from 'animejs';

const [ $revertButton ] = utils.$('.revert');
const [ $restartButton ] = utils.$('.restart');

// Set an initial x value
utils.set(['.circle', '.triangle', '.square'], { x: '15rem' });

const tl = createTimeline({
  loop: true,
  alternate: true,
})
.add('.circle',   { x: 0 })
.add('.triangle', { x: 0 }, 500)
.add('.square',   { x: 0 }, 1000);

const revertTimeline = () => tl.revert();
const restartTimeline = () => tl.restart();

$revertButton.addEventListener('click', revertTimeline);
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
    <button class="button revert">Revert</button>
    <button class="button restart">Restart</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [cancel()](https://animejs.com/documentation/timeline/timeline-methods/cancel "cancel()")
* [seek()](https://animejs.com/documentation/timeline/timeline-methods/seek "seek()")
