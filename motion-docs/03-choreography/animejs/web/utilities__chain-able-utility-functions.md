---
source: https://animejs.com/documentation/utilities/chain-able-utility-functions
title: "Chain-able utility functions | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [Chain-able utility functions](https://animejs.com/documentation/utilities/chain-able-utility-functions "Chain-able utility functions")

Chain-able utility functions allow for the creation of complex operations by combining multiple functions in a single expression.

```js
const clampRoundPad = utils.clamp(0, 100).round(2).padStart(6, '0');
clampRoundPad(125)   // '000100'
clampRoundPad(75.25) // '075.25'
```

The following utility functions support chaining:

* [`round()`](https://animejs.com/documentation/utilities/round)
* [`clamp()`](https://animejs.com/documentation/utilities/clamp)
* [`snap()`](https://animejs.com/documentation/utilities/snap)
* [`wrap()`](https://animejs.com/documentation/utilities/wrap)
* [`mapRange()`](https://animejs.com/documentation/utilities/map-range)
* [`interpolate()`](https://animejs.com/documentation/utilities/lerp)
* [`roundPad()`](https://animejs.com/documentation/utilities/round-pad)
* [`padStart()`](https://animejs.com/documentation/utilities/pad-start)
* [`padEnd()`](https://animejs.com/documentation/utilities/pad-end)
* [`degToRad()`](https://animejs.com/documentation/utilities/deg-to-rad)
* [`radToDeg()`](https://animejs.com/documentation/utilities/rad-to-deg)

Chain-able functions works great in combinaison with the [modifier](https://animejs.com/documentation/animation/tween-parameters/modifier "Modifier function") tween parameter.

## [Usage](https://animejs.com/documentation/utilities/chain-able-utility-functions#usage)

Chain-able functions are created when calling a utility function without its optional value parameter:

```js
const chainableClamp = utils.clamp(0, 100); // Returns a chain-able function
const result = chainableClamp(150); // 100
```

## [Chaining](https://animejs.com/documentation/utilities/chain-able-utility-functions#chaining)

Chain-able functions are combined like this:

```js
const normalizeAndRound = utils.mapRange(0, 255, 0, 1).round(1);
normalizeAndRound(128); // '0.5'
normalizeAndRound(64);  // '0.3'
```

## Chain-able utility functions code example

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1000,
  modifier: utils.wrap(0, 10).roundPad(3).padStart(6, '0'),
  duration: 100000,
  alternate: true,
  loop: true,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [radToDeg()](https://animejs.com/documentation/utilities/rad-to-deg "radToDeg()")
* [Easings](https://animejs.com/documentation/easings "Easings")
