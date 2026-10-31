---
source: https://animejs.com/documentation/draggable/draggable-settings/releasedamping
title: "releaseDamping | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [releaseDamping](https://animejs.com/documentation/draggable/draggable-settings/releasedamping "releaseDamping")

Specifies the damping applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values increases the bounciness when reaching the bounds of the container.

`releaseDamping` has no effect if a spring is passed to the [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease) parameter and is overridden by the spring `damping` value.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/releasedamping#accepts)

A `Number` between `0` and `10000`

## [Default](https://animejs.com/documentation/draggable/draggable-settings/releasedamping#default)

`10`

## releaseDamping code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseDamping: 5,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 30,
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

* [releaseStiffness](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness "releaseStiffness")
* [velocityMultiplier](https://animejs.com/documentation/draggable/draggable-settings/velocitymultiplier "velocityMultiplier")
