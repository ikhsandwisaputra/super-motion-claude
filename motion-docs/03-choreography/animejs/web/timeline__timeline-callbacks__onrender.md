---
source: https://animejs.com/documentation/timeline/timeline-callbacks/onrender
title: "onRender | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onRender](https://animejs.com/documentation/timeline/timeline-callbacks/onrender "onRender")

Executes a function every time a timeline renders something on the screen, this means that no rendering is happening when the `currentTime` is inside the `delay` or `loopDelay` time frames, or if neither of its children are rendering.

## [Accepts](https://animejs.com/documentation/timeline/timeline-callbacks/onrender#accepts)

A `Function` whose first argument is the timeline itself

## [Default](https://animejs.com/documentation/timeline/timeline-callbacks/onrender#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onRender = self => console.log(self.id);
```

## onRender code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

let renders = 0;

const tl = createTimeline({
  defaults: { duration: 500 },
  loopDelay: 250,
  loop: true,
  onRender: self => $value.textContent = ++renders
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
    <span class="label">renders</span>
    <span class="value">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [onUpdate](https://animejs.com/documentation/timeline/timeline-callbacks/onupdate "onUpdate")
* [onLoop](https://animejs.com/documentation/timeline/timeline-callbacks/onloop "onLoop")
