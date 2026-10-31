---
source: https://animejs.com/documentation/draggable/draggable-settings/maxvelocity
title: "maxVelocity | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [maxVelocity](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity "maxVelocity")

Specifies the maximum velocity to apply to the dragged element after release.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity#accepts)

* A `Number` greater than or equal to `0`
* A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity#default)

`50`

## maxVelocity code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  maxVelocity: 0,
});

createDraggable('.circle', {
  container: '.grid',
  maxVelocity: 100,
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

* [minVelocity](https://animejs.com/documentation/draggable/draggable-settings/minvelocity "minVelocity")
* [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease "releaseEase")
