---
source: https://animejs.com/documentation/animation/animation-playback-settings/duration
title: "duration | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [duration](https://animejs.com/documentation/animation/animation-playback-settings/duration "duration")

Defines the default duration in milliseconds of all animation tweens.
Setting `0` to a duration completes the animation instantly upon play.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/duration#accepts)

* A `Number` equal or greater than `0`
* A [Function based value](https://animejs.com/documentation/animation/tween-value-types/function-based "Function based value") that returns a `Number` equal to or greater than `0`

Duration values higher than `1e12` are clamped internally to `1e12` (Or approximatively 32 years).

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/duration#default)

`1000`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.duration = 500;
```

## duration code example

```js
import { animate } from 'animejs';

animate('.dur-0', {
  x: '17rem',
  duration: 0,
});

animate('.dur-500', {
  x: '17rem',
  duration: 500,
});

animate('.dur-2000', {
  x: '17rem',
  duration: 2000
});
```

```html
<div class="medium row">
  <div class="circle dur-0"></div>
  <div class="padded label">duration: 0</div>
</div>
<div class="medium row">
  <div class="circle dur-500"></div>
  <div class="padded label">duration: 500</div>
</div>
<div class="medium row">
  <div class="circle dur-2000"></div>
  <div class="padded label">duration: 2000</div>
</div>
```

###### Previous

###### Next

* [delay](https://animejs.com/documentation/animation/animation-playback-settings/delay "delay")
* [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")
