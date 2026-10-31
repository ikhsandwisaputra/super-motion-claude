---
source: https://animejs.com/documentation/animation/animation-playback-settings/autoplay
title: "autoplay | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [autoplay](https://animejs.com/documentation/animation/animation-playback-settings/autoplay "autoplay")

Defines the play mode of an animation.

The autoplay parameter has no effect when the animation is added to a timeline, and will be overridden to `false`.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/autoplay#accepts)

`Boolean` | [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll")

* If set to `true` the animation plays automatically
* If set to `false` the animation has to be manually played
* If set to [`onScroll()`](https://animejs.com/documentation/events/onscroll "Scroll") the animation will starts when the [scroll thresholds](https://animejs.com/documentation/events/onscroll/scrollobserver-thresholds "scroll thresholds") conditions are met

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/autoplay#default)

`true`

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.autoplay = false;
```

## autoplay code example

```js
animate('.autoplay-true', {
  x: '17rem',
  autoplay: true, // Default
});

animate('.autoplay-false', {
  x: '17rem',
  autoplay: false,
});
```

```html
<div class="medium row">
  <div class="circle autoplay-true"></div>
  <div class="padded label">autoplay: true</div>
</div>
<div class="medium row">
  <div class="circle autoplay-false"></div>
  <div class="padded label">autoplay: false</div>
</div>
```

###### Previous

###### Next

* [reversed](https://animejs.com/documentation/animation/animation-playback-settings/reversed "reversed")
* [frameRate](https://animejs.com/documentation/animation/animation-playback-settings/framerate "frameRate")
