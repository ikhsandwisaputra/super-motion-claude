---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start
title: "Stagger start | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger start](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start "Stagger start")

Defines the starting value of the stagger.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start#accepts)

`Number` | [Timeline time position](https://animejs.com/documentation/timeline/time-position "Timeline time position") (Only when used as a timeline position argument)

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-start#default)

`0`

## Stagger start code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: stagger('1rem', { start: 14 }), // adds 14 to the staggered value
  delay: stagger(100, { start: 500 }), // adds 500 to the staggered value
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 14rem, delay: 500ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 15rem, delay: 600ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 16rem, delay: 700ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="padded label">x: 17rem, delay: 700ms</div>
</div>
```

###### Previous

###### Next

* [Stagger parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")
* [Stagger from](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from "Stagger from")
