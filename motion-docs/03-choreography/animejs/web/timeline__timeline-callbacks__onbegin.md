---
source: https://animejs.com/documentation/timeline/timeline-callbacks/onbegin
title: "onBegin | Timeline callbacks | Timeline | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Timeline](https://animejs.com/documentation/timeline "Timeline")

[Callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [onBegin](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin "onBegin")

Executes a function when an timeline begins to play.

## [Accepts](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin#accepts)

A `Function` whose first argument is the timeline itself

## [Default](https://animejs.com/documentation/timeline/timeline-callbacks/onbegin#default)

`noop`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.onBegin = self => console.log(self.id);
```

## onBegin code example

```js
import { createTimeline, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const tl = createTimeline({
  delay: 1000, // Delays the onBegin() callback by 1000ms
  onBegin: self => $value.textContent = self.began
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
    <span class="label">began</span>
    <span class="value">false</span>
  </pre>
</div>
```

###### Previous

###### Next

* [Timeline callbacks](https://animejs.com/documentation/timeline/timeline-callbacks "Timeline callbacks")
* [onComplete](https://animejs.com/documentation/timeline/timeline-callbacks/oncomplete "onComplete")
