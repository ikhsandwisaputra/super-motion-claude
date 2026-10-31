---
source: https://animejs.com/documentation/draggable/draggable-settings/container
title: "container | Draggable settings | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [container](https://animejs.com/documentation/draggable/draggable-settings/container "container")

Specifies the container of the draggable element, preventing it from being dragged outside of the defined boundaries.

## [Accepts](https://animejs.com/documentation/draggable/draggable-settings/container#accepts)

* [CSS Selector](https://animejs.com/documentation/animation/targets/css-selector "CSS Selector") `String` to target an `HTMLElement`
* `HTMLElement`
* `Array<Number>` (`[top, right, bottom, left]`)
* A `Function` that returns `Array<Number>` (`[top, right, bottom, left]`)

When defined using a `Function`, the value will be automatically refreshed every time the window or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-settings/container#default)

`null`

## container code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
});

createDraggable('.circle', {
  container: [-16, 80, 16, 0],
});
```

```html
<div class="large centered grid square-grid array-container">
  <div class="square draggable"></div>
  <div class="circle draggable"></div>
</div>
```

```css
.grid.array-container::after {
  opacity: 1;
  top: calc(1rem);
  right: calc(1rem - 1px);
  bottom: calc(1rem - 1px);
  left: calc(10rem);
  border: 1px dotted currentColor;
  box-shadow: none;
}
```

###### Previous

###### Next

* [trigger](https://animejs.com/documentation/draggable/draggable-settings/trigger "trigger")
* [containerPadding](https://animejs.com/documentation/draggable/draggable-settings/containerpadding "containerPadding")
