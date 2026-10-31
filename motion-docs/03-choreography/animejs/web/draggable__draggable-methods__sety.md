---
source: https://animejs.com/documentation/draggable/draggable-methods/sety
title: "setY() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [setY()](https://animejs.com/documentation/draggable/draggable-methods/sety "setY()")

Manually set the `y` position of the draggable target.
Is equivalent updating `draggable.y` directly when no `muteCallback` parameter is defined.

## [Parameters](https://animejs.com/documentation/draggable/draggable-methods/sety#parameters)

| Name | Type | Description |
| --- | --- | --- |
| y | `Number` | The new y value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the [`onUpdate`](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate) callback to fire (default `false`) |

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/sety#returns)

The draggable itself

## setY() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomY = () => draggable.setY(utils.random(-40, 40));

$setButton.addEventListener('click', setRandomY);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random y</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [setX()](https://animejs.com/documentation/draggable/draggable-methods/setx "setX()")
* [animateInView()](https://animejs.com/documentation/draggable/draggable-methods/animateinview "animateInView()")
