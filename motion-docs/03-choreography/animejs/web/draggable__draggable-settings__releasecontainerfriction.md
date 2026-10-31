---
source: https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction
title: "releaseContainerFriction | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [releaseContainerFriction](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction "releaseContainerFriction")

Overrides the [`containerFriction`](https://animejs.com/documentation/draggable/draggable-settings/containerfriction "containerFriction") applied to the dragged element when threw out of bounds on release, where `0` means no friction at all and `1` prevents the element from going past the container bounds.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction#accepts)

* A `Number` greater than or equal to `0` and lower than or equal to `1`
* A `Function` that returns a `Number` greater than or equal to `0` and lower than or equal to `1`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction#default)

The [`containerFriction`](https://animejs.com/documentation/draggable/draggable-settings/containerfriction "containerFriction") value

## releaseContainerFriction code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseContainerFriction: 0,
});

createDraggable('.circle', {
  container: '.grid',
  releaseContainerFriction: 1,
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

* [containerFriction](https://animejs.com/documentation/draggable/draggable-settings/containerfriction "containerFriction")
* [releaseMass](https://animejs.com/documentation/draggable/draggable-settings/releasemass "releaseMass")
