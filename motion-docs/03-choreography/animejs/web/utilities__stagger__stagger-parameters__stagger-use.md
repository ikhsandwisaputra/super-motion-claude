---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use
title: "Stagger use | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [Stagger use](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use "Stagger use")

Defines a custom staggering order instead of using the natural targets order by using an attribute or property of the targets.
The properties or attributes must contain a suite of number, starting at `0`.

A custom [`total`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total "total") parameter value must be defined if the highest custom index is lower than the actual total length of staggered targets when also using the [`from`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from "from"), [`reversed`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed "reversed") or [`ease`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease "text") parameters.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use#accepts)

`String` of a valid property or attribute name

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use#default)

`null`

## Stagger use code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index' }),
});
```

```html
<div class="small row">
  <div class="square" data-index="2"></div>
  <div class="padded label">data-index="2"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="3"></div>
  <div class="padded label">data-index="3"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

###### Previous

###### Next

* [Stagger modifier](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-modifier "Stagger modifier")
* [Stagger total](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total "Stagger total")
