---
source: https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier
title: "modifier | Draggable axes parameters | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [modifier](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier "modifier")

Defines a [Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier "Modifier function") that alter of modify the value of either both axes or one specific axis.

## [Accepts](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier#accepts)

[Modifier function](https://animejs.com/documentation/animation/tween-parameters/modifier "Modifier function")

## [Default](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier#default)

`noop`

## modifier code example

```js
import { createDraggable, utils } from 'animejs';

createDraggable('.square', {
  modifier: utils.wrap(-32, 32), // Global to both x and y
  x: { modifier: utils.wrap(-128, 128) }, // Specific to x
});
```

```html
<div class="large grid centered square-grid">
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [snap](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap "snap")
* [mapTo](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto "mapTo")
