---
source: https://animejs.com/documentation/draggable/draggable-methods/setx
title: "setX() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [setX()](https://animejs.com/documentation/draggable/draggable-methods/setx "setX()")

Manually set the `x` position of the draggable target.
Is equivalent updating `draggable.x` directly when no `muteCallback` parameter is defined.

## [Parameters](https://animejs.com/documentation/draggable/draggable-methods/setx#parameters)

| Name | Type | Description |
| --- | --- | --- |
| x | `Number` | The new x value |
| muteCallback(opt) | `Boolean` | If `true`, prevents the [`onUpdate`](https://animejs.com/documentation/draggable/draggable-callbacks/onupdate) callback to fire (default `false`) |

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/setx#returns)

The draggable itself

## setX() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $setButton ] = utils.$('.set');

const draggable = createDraggable('.square');

const setRandomX = () => draggable.setX(utils.random(-100, 100));

$setButton.addEventListener('click', setRandomX);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button set">Set random x</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [enable()](https://animejs.com/documentation/draggable/draggable-methods/enable "enable()")
* [setY()](https://animejs.com/documentation/draggable/draggable-methods/sety "setY()")
