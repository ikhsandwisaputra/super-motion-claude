---
source: https://animejs.com/documentation/draggable/draggable-settings/releasestiffness
title: "releaseStiffness | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [releaseStiffness](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness "releaseStiffness")

Specifies the stiffness applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in slower movement.

`releaseStiffness` has no effect if a spring is passed to the [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease) parameter and is overridden by the spring `stiffness` value.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness#accepts)

A `Number` between `0` and `10000`

## [Default](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness#default)

`80`

## releaseStiffness code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseStiffness: 20,
});

createDraggable('.circle', {
  container: '.grid',
  releaseStiffness: 300,
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

* [releaseMass](https://animejs.com/documentation/draggable/draggable-settings/releasemass "releaseMass")
* [releaseDamping](https://animejs.com/documentation/draggable/draggable-settings/releasedamping "releaseDamping")
