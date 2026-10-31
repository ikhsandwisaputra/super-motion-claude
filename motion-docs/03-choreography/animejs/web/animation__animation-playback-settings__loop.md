---
source: https://animejs.com/documentation/animation/animation-playback-settings/loop
title: "loop | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [loop](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop")

Defines how many times an animation repeats.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/loop#accepts)

| Value | Effect |
| --- | --- |
| `Number` | The number of loops in the range `[0, Infinity]` |
| `Infinity` | Loop indefinitely |
| `true` | Equivalent to `Infinity` |
| `-1` | Equivalent to `Infinity` |

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/loop#default)

`0`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.loop = true;
```

## loop code example

```js
import { animate } from 'animejs';

animate('.loop', {
  x: '17.5rem',
  loop: 3,
});

animate('.loop-alternate', {
  x: '17.5rem',
  loop: 3,
  alternate: true,
});

animate('.loop-reverse', {
  x: '17.5rem',
  loop: 3,
  reversed: true,
});

animate('.loop-infinity', {
  x: '17.5rem',
  loop: true, // Or Infinity
});
```

```html
<div class="small row">
  <div class="circle loop"></div>
  <div class="padded label">loop: 3</div>
</div>
<div class="small row">
  <div class="circle loop-alternate"></div>
  <div class="padded label">loop: 3, alternate: true</div>
</div>
<div class="small row">
  <div class="circle loop-reverse"></div>
  <div class="padded label">loop: 3, reversed: true</div>
</div>
<div class="small row">
  <div class="circle loop-infinity"></div>
  <div class="padded label">loop: true</div>
</div>
```

###### Previous

###### Next

* [duration](https://animejs.com/documentation/animation/animation-playback-settings/duration "duration")
* [loopDelay](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay "loopDelay")
