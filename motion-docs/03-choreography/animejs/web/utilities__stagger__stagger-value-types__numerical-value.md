---
source: https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value
title: "Numerical value | Stagger value types | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Value types](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value types")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Numerical value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value "Numerical value")

Represents by how much each staggered value is incremented by.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-value-types/numerical-value#accepts)

* `Number`
* `String` containing at least one `Number`

## Numerical value code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  // Increase translateX by 5.75rem for each elements
  x: stagger('5.75rem'),
  // Increase delay by 100ms for each elements
  delay: stagger(100)
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 0rem      delay: 0ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 5.75rem   delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 11.5rem   delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17.25rem  delay: 300ms</div>
</div>
```

###### Previous

###### Next

* [Stagger value types](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value types")
* [Range value](https://animejs.com/documentation/utilities/stagger/stagger-value-types/range-value "Range value")
