---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed
title: "Stagger reversed | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Stagger reversed](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed "Stagger reversed")

Defines if the stagger should operate in reverse.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed#default)

`false`

## Stagger reversed code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  translateX: '17rem',
  delay: stagger(100, { reversed: true }),
});
```

```html
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 300ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 200ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 100ms</div>
</div>
<div class="small row">
  <div class="square"></div>
  <div class="label padded">delay: 0ms</div>
</div>
```

###### Previous

###### Next

* [Stagger from](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from "Stagger from")
* [Stagger ease](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease "Stagger ease")
