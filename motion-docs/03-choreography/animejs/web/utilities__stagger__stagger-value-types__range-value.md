---
source: https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value
title: "Range value | Stagger value types | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Value types](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value types")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Range value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value "Range value")

Distributes values evenly between two numerical values.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value#accepts)

`[Number|String, Number|String]`

## Range value code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  y: stagger(['2.75rem', '-2.75rem']),
  delay: stagger([0, 500]),
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

* [Numerical value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value "Numerical value")
* [Stagger parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")
