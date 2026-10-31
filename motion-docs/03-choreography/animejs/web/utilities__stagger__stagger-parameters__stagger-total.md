---
source: https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total
title: "Stagger total | Stagger parameters | stagger() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[stagger()](https://animejs.com/documentation/utilities/stagger "stagger()")

[Parameters](https://animejs.com/documentation/utilities/stagger/stagger-parameters "Stagger parameters")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [Stagger total](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total "Stagger total")

Defines a custom staggering length instead of using the actual total length of the staggered targets.
This is useful if the max value of the custom order defined using the [`use`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use) parameter is lower than the actual number of staggered targets when using the [`from`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-from), [`reversed`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-reversed) or [`ease`](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-ease) parameters.

## [Accepts](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total#accepts)

`Number`

## [Default](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-total#default)

`null`

## Stagger total code example

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: '17rem',
  rotate: 90,
  delay: stagger(250, { use: 'data-index', total: 2, reversed: true }),
});
```

```html
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="0"></div>
  <div class="padded label">data-index="0"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
<div class="small row">
  <div class="square" data-index="1"></div>
  <div class="padded label">data-index="1"</div>
</div>
```

###### Previous

###### Next

* [Stagger use](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-use "Stagger use")
* [Stagger jitter](https://animejs.com/documentation/utilities/stagger/stagger-parameters/stagger-jitter "Stagger jitter")
