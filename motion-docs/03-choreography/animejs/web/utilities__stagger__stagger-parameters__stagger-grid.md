---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid
title: "Stagger grid | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger grid](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid "Stagger grid")

Distributes values on a 2D or 3D grid.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid#accepts)

| Value | Description |
| --- | --- |
| `[<Number>, <Number>]` | Explicit 2D grid dimensions as `[columns, rows]` |
| `[<Number>, <Number>, <Number>]` | Explicit 3D grid dimensions as `[columns, rows, depth]` |
| `true` | Auto grid from target positions. `{x, y}` stays 2D, `{x, y, z}` switches to 3D |

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid#default)

`null`

Since version 4.4.0, `grid: true` auto-grid mode computes grid dimensions from element positions instead of requiring explicit dimensions.

Since version 4.5.0, you can pass explicit `[columns, rows, depth]` dimensions, and auto-grid switches to 3D when any target exposes a numeric `z`. Targets without one (DOM elements, plain `{x, y}` objects) are placed at `z = 0`. Useful when animating in 3D space with the [Three.js adapter](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter").

## Stagger grid code example

```js
import { animate, stagger } from 'animejs';

const $squares = utils.$('.square');

function animateGrid() {
  animate($squares, {
    scale: [
      { to: [0, 1.25] },
      { to: 0 }
    ],
    boxShadow: [
      { to: '0 0 1rem 0 currentColor' },
      { to: '0 0 0rem 0 currentColor' }
    ],
    delay: stagger(100, {
      grid: [11, 4],
      from: utils.random(0, 11 * 4)
    }),
    onComplete: animateGrid
  });
}

animateGrid();
```

```html
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="small justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
```

###### Previous

###### Next

* [Stagger ease](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease "Stagger ease")
* [Stagger grid axis](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis "Stagger grid axis")
