---
source: https://animejs.com/documentation/utilities/stagger
title: "stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

## [Creates sequential effects by distributing values progressively across multiple targets.](https://animejs.com/documentation/utilities/stagger#creates-sequential-effects-by-distributing-values-progressively-across-multiple-targets)

Stagger [Function based values](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based values") are created using `stagger()` function.

```js
import { stagger } from 'animejs';

const functionValue = stagger(value, parameters);
```

## [Parameters](https://animejs.com/documentation/utilities/stagger#parameters)

| Name | Accepts |
| --- | --- |
| value | [Stagger value](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value") |
| parameters (opt) | [Stagger parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters") |

## [Returns](https://animejs.com/documentation/utilities/stagger#returns)

[Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value")

## stagger() code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  scale: stagger([1, .1]),
  delay: stagger(100),
});
```

```html
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
<div class="small row">
  <div class="square"></div>
</div>
```

###### In this section

* [Time staggering](https://animejs.com/documentation/utilities/stagger/time-staggering "Time staggering")
* [Values staggering](https://animejs.com/documentation/utilities/stagger/values-staggering "Values staggering")
* [Timeline staggering](https://animejs.com/documentation/utilities/stagger/timeline-positions-staggering "Timeline positions staggering")
* [Value types](https://animejs.com/documentation/utilities/stagger/stagger-value-types "Stagger value types")
* [Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

###### Previous

###### Next

* [Utilities](https://animejs.com/documentation/utilities "Utilities")
* [Time staggering](https://animejs.com/documentation/utilities/stagger/time-staggering "Time staggering")
