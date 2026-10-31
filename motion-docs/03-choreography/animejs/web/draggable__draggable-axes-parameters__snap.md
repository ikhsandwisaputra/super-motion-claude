---
source: https://animejs.com/documentation/draggable/draggable-axes-parameters/snap
title: "snap | Draggable axes parameters | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [snap](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap "snap")

Rounds the final value of either both axes or one specific axis to the nearest specified increment.
If an `Array` is provided as the increment, it selects the closest value from the array.

## [Accepts](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap#accepts)

* `Number`
* `Array<Number>`
* A `Function` that returns any if the above

When defined using a `Function`, the value will be automatically refreshed every time the container or target element is resized.
It can also be refreshed manually using the [`refresh()`](https://animejs.com/documentation/draggable/draggable-methods/refresh) method.

## [Default](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap#default)

`0`

## snap code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square', {
  container: '.grid',
  snap: 56, // Global to both x and y
  x: { snap: [0, 200] }, // Specific to x
});
```

```html
<div class="large grid square-grid">
  <div class="square draggable"></div>
</div>
```

```css
#draggable-draggable-axes-parameters-snap .demo {
  width: 300px;
}

#draggable-draggable-axes-parameters-snap .grid::before {
  background-size: 100px 56px;
}

#draggable-draggable-axes-parameters-snap .grid::after {
  content: "";
  display: block;
  position: absolute;
  top: 1px;
  left: 100px;
  width: 100px;
  height: calc(100% - 1px);
  background-image: repeating-linear-gradient(
    45deg,
    currentColor 0,
    currentColor 1px,
    transparent 1px,
    transparent 6px
  );
  background-size: 8px 8px;
}

#draggable-draggable-axes-parameters-snap .square {
  width: 100px;
  height: 56px;
}
```

###### Previous

###### Next

* [y](https://animejs.com/documentation/draggable/draggable-axes-parameters/y "y")
* [modifier](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier "modifier")
