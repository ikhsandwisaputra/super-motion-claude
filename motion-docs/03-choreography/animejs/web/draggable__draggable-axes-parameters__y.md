---
source: https://animejs.com/documentation/draggable/draggable-axes-parameters/y
title: "y | Draggable axes parameters | Draggable | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Draggable](https://animejs.com/documentation/draggable "Draggable")

[Axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [y](https://animejs.com/documentation/draggable/draggable-axes-parameters/y "y")

Defines the behaviour of the y-axis by either passing an object of parameters or disabling it by setting the value to `false`.

## [Accepts](https://animejs.com/documentation/draggable/draggable-axes-parameters/y#accepts)

* `Boolean`
* [Draggable axes parameters](https://animejs.com/documentation/draggable/draggable-axes-parameters "Draggable axes parameters") `Object`

## [Default](https://animejs.com/documentation/draggable/draggable-axes-parameters/y#default)

`true`

## y code example

```js
import { createDraggable } from 'animejs';

createDraggable('.square.enabled', {
  y: true
});

createDraggable('.square.disabled', {
  y: false
});
```

```html
<div class="large spaced-evenly row">
  <div class="square enabled draggable"></div>
  <div class="square disabled draggable"></div>
</div>
<div class="large spaced-evenly row">
  <div class="label">y enabled</div>
  <div class="label">y disabled</div>
</div>
```

###### Previous

###### Next

* [x](https://animejs.com/documentation/draggable/draggable-axes-parameters/x "x")
* [snap](https://animejs.com/documentation/draggable/draggable-axes-parameters/snap "snap")
