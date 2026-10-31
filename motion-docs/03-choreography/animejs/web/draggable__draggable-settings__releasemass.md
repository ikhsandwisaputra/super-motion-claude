---
source: https://animejs.com/documentation/draggable/draggable-settings/releasemass
title: "releaseMass | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [releaseMass](https://animejs.com/documentation/draggable/draggable-settings/releasemass "releaseMass")

Specifies the mass applied to the dragged element after release. Affects the speed, movement distance and bounciness of the dragged element. Lower values result in faster movement.

`releaseMass` has no effect if a spring is passed to the [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease) parameter and is overridden by the spring `mass` value.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/releasemass#accepts)

A `Number` between `0` and `10000`

## [Default](https://animejs.com/documentation/draggable/draggable-settings/releasemass#default)

`1`

## releaseMass code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseMass: .1,
});

createDraggable('.circle', {
  container: '.grid',
  releaseMass: 10,
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

* [releaseContainerFriction](https://animejs.com/documentation/draggable/draggable-settings/releasecontainerfriction "releaseContainerFriction")
* [releaseStiffness](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness "releaseStiffness")
