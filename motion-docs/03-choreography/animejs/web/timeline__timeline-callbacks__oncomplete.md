---
source: https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete
title: "onComplete | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onComplete](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete "onComplete")

Executes a function when all the iterations (loops) of a timeline have finished playing.

## [Accepts](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete#accepts)

A `Function` whose first argument is the timeline itself

## [Default](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onComplete = self => console.log(self.id);
```

## onComplete code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  defaults: { duration: 500 },
  loop: 1,
  onComplete: self => $value.textContent = self.completed
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' })
.add('.square', { x: '15rem' });
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">completed</span>
    <span class="value">false</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onBegin](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin "onBegin")
* [onBeforeUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate "onBeforeUpdate")
