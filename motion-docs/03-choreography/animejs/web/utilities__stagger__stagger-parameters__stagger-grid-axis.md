---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis
title: "Stagger grid axis | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger grid axis](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis "Stagger grid axis")

Defines the direction of a staggered grid effect by restricting which axis of the grid can update.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis#accepts)

| Value | Effect |
| --- | --- |
| `'x'` | Restrict the direction to the x axis |
| `'y'` | Restrict the direction to the y axis |
| `'z'` | Restrict the direction to the z axis (3D grids only) |

The `'z'` axis applies only to 3D grids, useful when animating in 3D space with the [Three.js adapter](https://animejs.com/documentation/adapters/threejs-adapter "Three.js adapter").

## Stagger grid axis code example

```js
import { animate, stagger, utils } from 'animejs';

const grid = [11, 4];
const $squares = utils.$('.square');

function animateGrid() {
  const from = utils.random(0, 11 * 4);
  animate($squares, {
    translateX: [
      { to: stagger('-.75rem', { grid, from, axis: 'x' }) },
      { to: 0, ease: 'inOutQuad', },
    ],
    translateY: [
      { to: stagger('-.75rem', { grid, from, axis: 'y' }) },
      { to: 0, ease: 'inOutQuad' },
    ],
    opacity: [
      { to: .5 },
      { to: 1 }
    ],
    delay: stagger(85, { grid, from }),
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

* [Stagger grid](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid "Stagger grid")
* [Stagger modifier](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier "Stagger modifier")
