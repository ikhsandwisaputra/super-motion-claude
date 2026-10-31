---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from
title: "Stagger from | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger from](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from "Stagger from")

Defines the starting position of the stagger effect.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from#accepts)

| Value | Description |
| --- | --- |
| `Number` | The starting index of the effect |
| `'first'` | Equivalent to index `0` |
| `'center'` | Starts the effect from the center |
| `'last'` | Starts the effect from the last element |
| `'random'` | Randomises the order of the staggered values |
| `[x, y]` | Normalized coordinate array (`0` to `1`) for precise 2D grid origin control (requires `grid`) |
| `[x, y, z]` | Normalized coordinate array (`0` to `1`) for precise 3D grid origin control (requires a 3D `grid` or targets with `{x, y, z}` coordinates) |

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from#default)

`0`

## Stagger from code example

```js
import { createtimeline, stagger } from 'animejs';

const tl = createTimeline({
  loop: true,
  defaults: { duration: 500 },
  delay: 500,
  loopDelay: 500
})
.add('.row:nth-child(1) .square:nth-child(8)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(1) .square', {
  scale: 0,
  delay: stagger(25, { from: 7 }),
}, '<')
.add('.row:nth-child(2) .square:first-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(2) .square', {
  scale: 0,
  delay: stagger(25, { from: 'first' }),
}, '<')
.add('.row:nth-child(3) .square:nth-child(6)', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(3) .square', {
  scale: 0,
  delay: stagger(25, { from: 'center' }),
}, '<')
.add('.row:nth-child(4) .square:last-child', { color: '#FFF', scale: 1.2 })
.add('.row:nth-child(4) .square', {
  scale: 0,
  delay: stagger(25, { from: 'last' }),
}, '<')
.set('.row .square', { color: 'currentColor' })
.add('.row .square', {
  scale: 1,
  delay: stagger(25, { from: 'random' }),
})
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

* [Stagger start](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start "Stagger start")
* [Stagger reversed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed "Stagger reversed")
