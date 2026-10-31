---
source: https://animejs.com/documentation/draggable/draggable-settings/scrollspeed
title: "scrollSpeed | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [scrollSpeed](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed "scrollSpeed")

Specifies a value that affects the automatic scrolling speed of the container. The higher the value, the faster the scroll goes and `0` prevents the container from scrolling.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed#accepts)

* A `Number`
* A `Function` that returns a `Number`

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/scrollspeed#default)

`1.5`

## scrollSpeed code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.scroll-container',
  scrollSpeed: 2,
});
```

```html
<div class="full-container scroll-container scroll-x scroll-y">
  <div class="scroll-content">
    <div class="large padded grid square-grid">
      <div class="square draggable"></div>
    </div>
  </div>
</div>
```

###### Previous

###### Next

* [scrollThreshold](https://animejs.com/documentation/draggable/draggable-settings/scrollthreshold "scrollThreshold")
* [cursor](https://animejs.com/documentation/draggable/draggable-settings/cursor "cursor")
