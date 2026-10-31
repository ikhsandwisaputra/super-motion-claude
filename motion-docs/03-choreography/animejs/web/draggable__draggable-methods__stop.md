---
source: https://animejs.com/documentation/draggable/draggable-methods/stop
title: "stop() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [stop()](https://animejs.com/documentation/draggable/draggable-methods/stop "stop()")

Stop all currently running animations targeting the draggable, the container scroll animation and the draggable release animation.

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/stop#returns)

The draggable itself

## stop() code example

```js
import { createDraggable, animate, utils } from 'animejs';

const [ $stopButton ] = utils.$('.stop');

const draggable = createDraggable('.square');

animate(draggable, {
  x: [-100, 100],
  alternate: true,
  loop: true
});

const stopDraggable = () => draggable.stop();

$stopButton.addEventListener('click', stopDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button stop">Stop</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [scrollInView()](https://animejs.com/documentation/draggable/draggable-methods/scrollinview "scrollInView()")
* [reset()](https://animejs.com/documentation/draggable/draggable-methods/reset "reset()")
