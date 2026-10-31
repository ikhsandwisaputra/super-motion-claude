---
source: https://animejs.com/documentation/draggable/draggable-settings/dragspeed
title: "dragSpeed | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [dragSpeed](https://animejs.com/documentation/draggable/draggable-settings/dragspeed "dragSpeed")

Specifies a value that affects the dragging speed of the element. The higher the value, the faster the element moves. `0` prevents the element from being dragged, and values less than `0` invert the drag movement.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/dragspeed#accepts)

* A `Number`
* A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/dragspeed#default)

`1`

## dragSpeed code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragSpeed: 2,
});

createDraggable('.circle', {
  container: '.grid',
  dragSpeed: .5,
});
```

```html
<div class="large centered grid square-grid">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

###### Previous

###### Next

* [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease "releaseEase")
* [dragThreshold](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold "dragThreshold")
