---
source: https://animejs.com/documentation/timeline/timeline-callbacks/onloop
title: "onLoop | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onLoop](https://animejs.com/documentation/timeline/timeline-callbacks/onloop "onLoop")

Executes a function every time a timeline iteration completes.

## [Accepts](https://animejs.com/documentation/timeline/timeline-callbacks/onloop#accepts)

A `Function` whose first argument is the timeline itself

## [Default](https://animejs.com/documentation/timeline/timeline-callbacks/onloop#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onLoop = self => console.log(self.id);
```

## onLoop code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let loops = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 500,
  loop: true,
  onLoop: self => $value.textContent = ++loops
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
    <span class="label">loops</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onRender](https://animejs.com/documentation/timeline/timeline-callbacks/onrender "onRender")
* [onPause](https://animejs.com/documentation/timeline/timeline-callbacks/onpause "onPause")
