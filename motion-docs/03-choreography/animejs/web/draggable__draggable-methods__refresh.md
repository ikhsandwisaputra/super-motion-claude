---
source: https://animejs.com/documentation/draggable/draggable-methods/refresh
title: "refresh() | Draggable methods | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Methods](https://animejs.com/documentation/draggable/draggable-methods "Draggable methods")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [refresh()](https://animejs.com/documentation/draggable/draggable-methods/refresh "refresh()")

Re-compute every parameter defined using a function and re-calculate all internal values.

## [Refreshable parameters](https://animejs.com/documentation/draggable/draggable-methods/refresh#refreshable-parameters)

* [`snap`](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap)
* [`container`](https://animejs.com/documentation/draggable/draggable-settings/container)
* [`containerPadding`](https://animejs.com/documentation/draggable/draggable-settings/containerpadding)
* [`containerFriction`](https://animejs.com/documentation/draggable/draggable-settings/containerfriction)
* [`dragSpeed`](https://animejs.com/documentation/draggable/draggable-settings/dragspeed)
* [`scrollSpeed`](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed)
* [`scrollThreshold`](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold)
* [`minVelocity`](https://animejs.com/documentation/draggable/draggable-settings/minvelocity)
* [`maxVelocity`](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity)
* [`velocityMultiplier`](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier)

## [Returns](https://animejs.com/documentation/draggable/draggable-methods/refresh#returns)

The draggable itself

## refresh() code example

```js
import { createDraggable, utils } from 'animejs';

const [ $refreshButton ] = utils.$('.refresh');

const draggable = createDraggable('.square', {
  snap: () => utils.random(0, 32, 0),
  dragSpeed: () => utils.random(.5, 1.5, 1),
});

const refreshDraggable = () => draggable.refresh();

$refreshButton.addEventListener('click', refreshDraggable);
```

```html
<div class="large centered row">
  <div class="square draggable"></div>
</div>
<div class="large row">
  <fieldset class="controls">
    <button class="button refresh">Refresh</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revert()](https://animejs.com/documentation/draggable/draggable-methods/revert "revert()")
* [Draggable properties](https://animejs.com/documentation/draggable/draggable-properties "Draggable properties")
