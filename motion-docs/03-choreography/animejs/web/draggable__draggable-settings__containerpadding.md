---
source: https://animejs.com/documentation/draggable/draggable-settings/containerpadding
title: "containerPadding | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [containerPadding](https://animejs.com/documentation/draggable/draggable-settings/containerpadding "containerPadding")

Specifies the container's padding in pixels.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/containerpadding#accepts)

* `Number`
* `Array<Number>` (`[top, right, bottom, left]`)
* A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/containerpadding#default)

`0`

## containerPadding code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  containerPadding: [ 16, 32, -16, 64], // top, right, bottom, left
  scrollThreshold: 0,
});
```

```html
<div class="large centered padded show-bounds grid square-grid">
  <div class="square draggable"></div>
</div>
```

```css
.grid.padded.show-bounds::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(2rem - 1px);
  bottom: calc(-1rem - 1px);
  left: calc(4rem);
  border: 1px dashed currentColor;
  box-shadow: none;
}
```

###### Previous

###### Next

* [container](https://animejs.com/documentation/draggable/draggable-settings/container "container")
* [containerFriction](https://animejs.com/documentation/draggable/draggable-settings/containerfriction "containerFriction")
