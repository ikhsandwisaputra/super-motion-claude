---
source: https://animejs.com/documentation/animation/tween-parameters/modifier
title: "modifier | Tween parameters | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [modifier JS](https://animejs.com/documentation/animation/tween-parameters/modifier "modifier")

A `Function` that modifies or alters the behavior of the animated numerical value. Modifiers can be set globally for all animation properties or locally for a specific property. If the final animated value contains strings, like units (`'100px'`), the string part is automatically added to the final value before being applied to the element.

Most [Utilities](https://animejs.com/documentation/utilities "Utilities") functions can be used as modifiers.

## [Accepts](https://animejs.com/documentation/animation/tween-parameters/modifier#accepts)

A `Function` with the following parameters:

## [Parameters](https://animejs.com/documentation/animation/tween-parameters/modifier#parameters)

| Name | Description |
| --- | --- |
| `value` | The current animated numerical value |

## [Must returns](https://animejs.com/documentation/animation/tween-parameters/modifier#must-returns)

`Number`

## [Default](https://animejs.com/documentation/animation/tween-parameters/modifier#default)

`null`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.modifier = v => -v; // Don't do this :D
```

## modifier code example

```js
import { animate, utils } from 'animejs';

animate('.row:nth-child(1) .square', {
  x: '17rem',
  modifier: utils.round(0), // Round to 0 decimals
  duration: 4000,
});

animate('.row:nth-child(2) .square', {
  x: '85rem',
  modifier: v => v % 17,
  duration: 4000,
});

animate('.row:nth-child(3) .square', {
  x: '17rem',
  y: {
    to: '70rem',
    modifier: v => Math.cos(v) / 2, // Specific modifier to y property
  },
  duration: 4000,
});
```

```html
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">utils.round(0)</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => v % 17</div>
</div>
<div class="medium row">
  <div class="square"></div>
  <div class="padded label">v => Math.cos(v) / 2</div>
</div>
```

###### Previous

###### Next

* [composition](https://animejs.com/documentation/animation/tween-parameters/composition "composition")
* [Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")
