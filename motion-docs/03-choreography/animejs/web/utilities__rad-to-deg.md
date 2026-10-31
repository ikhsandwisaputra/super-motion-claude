---
source: https://animejs.com/documentation/utilities/rad-to-deg
title: "radToDeg() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [radToDeg()](https://animejs.com/documentation/utilities/rad-to-deg "radToDeg()")

Converts radians into degrees.

```js
const degrees = utils.radToDeg(radians);
```

## [Parameters](https://animejs.com/documentation/utilities/rad-to-deg#parameters)

| Name | Accepts |
| --- | --- |
| radians (opt) | `Number` |

## [Returns](https://animejs.com/documentation/utilities/rad-to-deg#returns)

A `Number` if radians are provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to convert radians to degrees:

```js
const radToDeg = utils.radToDeg();
radToDeg(1.7453292519943295); // 100
radToDeg(Math.PI);            // 180

const roundRadToDeg = utils.radToDeg().round(2); // Convert radians to degrees then round to 2 decimal places
roundRadToDeg(Math.PI / 7);  // 25.71
```

## radToDeg() code example

```js
import { animate, createAnimatable, utils } from 'animejs';

const degAnimatable = createAnimatable('.deg', {
  rotate: { unit: 'deg', duration: 0 }
});

const [ $rad ] = utils.$('.rad');

const degAnimation = animate($rad, {
  rotate: (Math.PI * 2) + 'rad',
  ease: 'linear',
  loop: true,
  onUpdate: () => {
    const radians = utils.get($rad, 'rotate', false);
    degAnimatable.rotate(utils.radToDeg(radians));
  }
});
```

```html
<div class="x-large spaced-evenly row">
  <div class="col">
    <div class="clock rad"></div>
    <div class="label">radians</div>
  </div>
  <div class="col">
    <div class="clock deg"></div>
    <div class="label">degrees</div>
  </div>
</div>
```

###### Previous

###### Next

* [degToRad()](https://animejs.com/documentation/utilities/deg-to-rad "degToRad()")
* [Chain-able utility functions](https://animejs.com/documentation/utilities/chain-able-utility-functions "Chain-able utility functions")
