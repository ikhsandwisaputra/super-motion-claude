---
source: https://animejs.com/documentation/animation/animation-playback-settings/reversed
title: "reversed | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [reversed](https://animejs.com/documentation/animation/animation-playback-settings/reversed "reversed")

Defines the initial direction of the animation.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/reversed#accepts)

`Boolean`

* If set to `true` the animation plays backwards
* If set to `false` the animation plays forwards

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/reversed#default)

`false`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.reversed = true;
```

## reversed code example

```js
import { animate } from 'animejs';

animate('.dir-normal', {
  x: '17rem',
  reversed: false, // Default behaviour
  loop: true
});

animate('.dir-reverse', {
  x: '17rem',
  reversed: true,
  loop: true
});
```

```html
<div class="medium row">
  <div class="circle dir-normal"></div>
  <div class="padded label">reversed: false</div>
</div>
<div class="medium row">
  <div class="circle dir-reverse"></div>
  <div class="padded label">reversed: true</div>
</div>
```

###### Previous

###### Next

* [alternate](https://animejs.com/documentation/animation/animation-playback-settings/alternate "alternate")
* [autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay")
