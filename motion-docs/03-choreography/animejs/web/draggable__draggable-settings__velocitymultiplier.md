---
source: https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier
title: "velocityMultiplier | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [velocityMultiplier](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier "velocityMultiplier")

Specifies a multiplier to modify the velocity applied to the dragged element after release, where `0` means no velocity at all, `1` is normal velocity and `2` double the velocity.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier#accepts)

* A `Number` greater than or equal to `0`
* A `Function` that returns a `Number` greater than or equal to `0`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier#default)

`1`

## velocityMultiplier code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  velocityMultiplier: 0,
});

createDraggable('.circle', {
  container: '.grid',
  velocityMultiplier: 5,
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

* [releaseDamping](https://animejs.com/documentation/draggable/draggable-settings/releasedamping "releaseDamping")
* [minVelocity](https://animejs.com/documentation/draggable/draggable-settings/minvelocity "minVelocity")
