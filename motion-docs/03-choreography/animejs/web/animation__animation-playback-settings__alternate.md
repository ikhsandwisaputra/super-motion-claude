---
source: https://animejs.com/documentation/animation/animation-playback-settings/alternate
title: "alternate | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [alternate](https://animejs.com/documentation/animation/animation-playback-settings/alternate "alternate")

Defines if the direction of the animation alternates on each iteration when the [`loop`](https://animejs.com/documentation/animation/animation-playback-settings/loop "loop") parameter is set to `true` or superior to `1`.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/alternate#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/alternate#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.alternate = true;
```

## alternate code example

```js
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  alternate: false, // Default
  loop: 1,
});

animate('.dir-alternate', {
  x: '17rem',
  alternate: true,
  loop: 1, // Required to see the second iteration
});

animate('.dir-alternate-reverse', {
  x: '17rem',
  alternate: true,
  reversed: true,
  loop: 1,
});
```

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">alternate: false</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate"></div>
  <div class="padded label">alternate: true</div>
</div>
<div class="medium row">
  <div class="circle dir-alternate-reverse"></div>
  <div class="padded label">alternate: true, reversed: true</div>
</div>
```

###### Previous

###### Next

* [loopDelay](https://animejs.com/documentation/animation/animation-playback-settings/playback-loopdelay "loopDelay")
* [reversed](https://animejs.com/documentation/animation/animation-playback-settings/reversed "reversed")
