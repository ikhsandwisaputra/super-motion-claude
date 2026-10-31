---
source: https://animejs.com/documentation/draggable/draggable-settings/releaseease
title: "releaseEase | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [releaseEase](https://animejs.com/documentation/draggable/draggable-settings/releaseease "releaseEase")

Specifies a custom easing applied to the dragged element after release, a snap event, or repositioning when dragged out of bounds.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/releaseease#accepts)

[ease](https://animejs.com/documentation/animation/tween-parameters/ease "ease")

Passing `spring()` overrides the draggable [`releaseMass`](https://animejs.com/documentation/draggable/draggable-settings/releasemass), [`releaseStiffness`](https://animejs.com/documentation/draggable/draggable-settings/releasestiffness) and [`releaseDamping`](https://animejs.com/documentation/draggable/draggable-settings/releasedamping) parameters. The `velocity` parameter of `spring()` has no effect and is replaced with the actual velocity of the dragged element.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/releaseease#default)

`eases.outQuint`

## releaseEase code example

```js
import { createDraggable, spring } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  releaseEase: 'outElastic',
});

createDraggable('.circle', {
  container: '.grid',
  releaseEase: spring({
    stiffness: 150,
    damping: 15,
  })
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

* [maxVelocity](https://animejs.com/documentation/draggable/draggable-settings/maxvelocity "maxVelocity")
* [dragSpeed](https://animejs.com/documentation/draggable/draggable-settings/dragspeed "dragSpeed")
