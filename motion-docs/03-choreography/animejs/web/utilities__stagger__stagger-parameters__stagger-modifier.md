---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier
title: "Stagger modifier | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger modifier](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier "Stagger modifier")

Defines a function that modify the returned staggered value.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier#accepts)

A `Function` with the following parameters:

## [Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier#parameters)

| Names | Description |
| --- | --- |
| `value` | The current animated numerical value |

## [Must returns](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier#must-returns)

`Number` | `String`

## Stagger modifier code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  boxShadow: [
    { to: stagger([1, .25], {
        modifier: v => `0 0 ${v * 30}px ${v * 20}px currentColor`,
        from: 'center'
      })
    },
    { to: 0 },
  ],
  delay: stagger(100, { from: 'center' }),
  loop: true
});
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
```

###### Previous

###### Next

* [Stagger grid axis](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-grid-axis "Stagger grid axis")
* [Stagger use](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use "Stagger use")
