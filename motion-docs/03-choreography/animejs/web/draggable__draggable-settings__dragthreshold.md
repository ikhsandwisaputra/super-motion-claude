---
source: https://animejs.com/documentation/draggable/draggable-settings/dragthreshold
title: "dragThreshold | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.2.1](https://github.com/juliangarnier/anime/releases/tag/v4.2.1)

# [dragThreshold](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold "dragThreshold")

Specifies the distance in pixels needed to trigger a drag.
The threshold can be specified differently for mouse our touch devices by using an object.

```js
dragThreshold: 3,

// Or

dragThreshold: { mouse: 3, touch: 7 },
```

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold#accepts)

* `Number`
* `{ mouse: Number, touch: Number }`
* A `Function` that returns a `Number` or `{ mouse: Number, touch: Number }`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/dragthreshold#default)

`{ mouse: 3, touch: 7 }`

## dragThreshold code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  dragThreshold: 20,
});

createDraggable('.circle', {
  container: '.grid',
  dragThreshold: { mouse: 10, touch: 15 },
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

* [dragSpeed](https://animejs.com/documentation/draggable/draggable-settings/dragspeed "dragSpeed")
* [scrollThreshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold "scrollThreshold")
