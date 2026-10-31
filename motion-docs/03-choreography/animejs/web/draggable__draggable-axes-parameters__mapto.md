---
source: https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto
title: "mapTo | Draggable axes parameters | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [mapTo](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto "mapTo")

Maps the axis value to a different property of the element.

## [Accepts](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto#accepts)

`String`

## [Default](https://animejs.com/documentation/draggable/draggable-axes-parameters/mapto#default)

`null`

## mapTo code example

```js
import { createDraggable, utils } from 'animejs';

utils.set('.square', { z: 100 });

createDraggable('.square', {
  x: { mapTo: 'rotateY' },
  y: { mapTo: 'z' },
});
```

```html
<div class="large grid centered perspective square-grid">
  <div class="square draggable"></div>
</div>
```

###### Previous

###### Next

* [modifier](https://animejs.com/documentation/draggable/draggable-axes-parameters/modifier "modifier")
* [Draggable settings](https://animejs.com/documentation/draggable/draggable-settings "Draggable settings")
