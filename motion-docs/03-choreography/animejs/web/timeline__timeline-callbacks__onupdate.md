---
source: https://animejs.com/documentation/timeline/timeline-callbacks/onupdate
title: "onUpdate | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate "onUpdate")

Executes a function on every frames of a running timeline at the specified [`frameRate`](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate").

## [Accepts](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate#accepts)

A `Function` whose first argument is the timeline itself

## [Default](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onUpdate = self => console.log(self.id);
```

## onUpdate code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let updates = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onUpdate: self => $value.textContent = ++updates
})
.add('.circle', { x: '15rem' })
.add('.triangle', { x: '15rem' }, '+=250')
.add('.square', { x: '15rem' }, '+=250');
```

```html
<div class="large row">
  <div class="medium pyramid">
    <div class="triangle"></div>
    <div class="square"></div>
    <div class="circle"></div>
  </div>
  <pre class="large log row">
    <span class="label">updates</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onBeforeUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onbeforeupdate "onBeforeUpdate")
* [onRender](https://animejs.com/documentation/timeline/timeline-callbacks/onrender "onRender")
