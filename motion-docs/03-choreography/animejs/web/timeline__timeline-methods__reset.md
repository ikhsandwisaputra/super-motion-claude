---
source: https://animejs.com/documentation/timeline/timeline-methods/reset
title: "reset() | Timeline methods | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Methods](https://animejs.com/documentation/timeline/timeline-methods "Timeline methods")

[Since 3.0.0](https://github.com/juliangarnier/anime/releases/tag/v3.0.0)

# [reset()](https://animejs.com/documentation/timeline/timeline-methods/reset "reset()")

Pauses and resets `currentTime`, `progress`, `reversed`, `began`, `completed` properties to their default values.

```js
timeline.reset(softReset);
```

## [Parameters](https://animejs.com/documentation/timeline/timeline-methods/reset#parameters)

| Name | Type | Description |
| --- | --- | --- |
| softReset=false (opt) | `Boolean` | If `true`, only reset the internal values without causing a visual render |

## [Returns](https://animejs.com/documentation/timeline/timeline-methods/reset#returns)

The timeline itself

Can be chained with other timer methods.

## reset() code example

```js
import { createTimer, utils } from 'animejs';

const [ $reset ] = utils.$('.button');

const tl = createTimeline({
  loop: true,
  alternate: true
})
.add('.circle',   { x: '15rem' })
.add('.triangle', { x: '15rem' }, 500)
.add('.square',   { x: '15rem' }, 1000);

const resetTimeline = () => {
  tl.reset();
  $time.innerHTML = timer.currentTime;
}

$reset.addEventListener('click', resetTimeline);
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
    <button class="button">Reset</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [play()](https://animejs.com/documentation/timeline/timeline-methods/play "play()")
* [reverse()](https://animejs.com/documentation/timeline/timeline-methods/reverse "reverse()")
