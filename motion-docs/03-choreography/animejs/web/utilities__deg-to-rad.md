---
source: https://animejs.com/documentation/utilities/deg-to-rad
title: "degToRad() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [degToRad()](https://animejs.com/documentation/utilities/deg-to-rad "degToRad()")

Converts degrees into radians.

```js
const radians = utils.degToRad(degrees);
```

## [Parameters](https://animejs.com/documentation/utilities/deg-to-rad#parameters)

| Name | Accepts |
| --- | --- |
| degrees (opt) | `Number` |

## [Returns](https://animejs.com/documentation/utilities/deg-to-rad#returns)

A `Number` if degrees are provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to convert degrees to radians:

```js
const degToRad = utils.degToRad();
degToRad(360); // 6.283185307179586

const roundDegToRad = utils.degToRad().round(2); // Convert degrees to radians then round to 2 decimal places
roundDegToRad(180); // 3.14
roundDegToRad(90);  // 1.57
```

## degToRad() code example

```js
import { animate, createAnimatable, utils } from 'animejs';

const radAnimatable = createAnimatable('.rad', {
  rotate: { unit: 'rad', duration: 0 },
});

const [ $deg ] = utils.$('.deg');

const degAnimation = animate($deg, {
  rotate: '360deg',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const degrees = utils.get($deg, 'rotate', false);
    radAnimatable.rotate(utils.degToRad(degrees));
  }
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
</div>
```

###### Previous

###### Next

* [padEnd()](https://animejs.com/documentation/utilities/pad-end "padEnd()")
* [radToDeg()](https://animejs.com/documentation/utilities/rad-to-deg "radToDeg()")
