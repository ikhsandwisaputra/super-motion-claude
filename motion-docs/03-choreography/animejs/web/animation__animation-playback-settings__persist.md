---
source: https://animejs.com/documentation/animation/animation-playback-settings/persist
title: "persist | Animation playback settings | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")

[Since 4.2.0](https://github.com/juliangarnier/anime/releases/tag/v4.2.0)

# [persist WAAPI](https://animejs.com/documentation/animation/animation-playback-settings/persist "persist")

By default, WAAPI animations are automatically canceled and released from memory when they complete. This is necessary to prevent animations from running forever and causing potential memory leaks.

This behavior can causes issues when using [methods](https://animejs.com/documentation/animation/animation-methods "methods") on a completed WAAPI animation, since the animation won't be active anymore.

The `persist` parameter solves that, and keeps the animation active when it completes.

## [Accepts](https://animejs.com/documentation/animation/animation-playback-settings/persist#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/animation/animation-playback-settings/persist#default)

`false`

For scroll-controlled WAAPI animations, the `persist` parameter is automatically set to `true`.

To change the default value globally, update the `engine.defaults` object.

```js
import { engine } from 'animejs';
engine.defaults.persist = true;
```

## persist code example

```js
import { waapi, utils } from 'animejs';

const [ $button ] = utils.$('.button');

const animationA = waapi.animate('.square-a', {
  x: '17rem',
  persist: false, // default
});

const animationB = waapi.animate('.square-b', {
  x: '17rem',
  persist: true,
});

const alaternateAnimations = () => {
  animationA.alternate().resume();
  animationB.alternate().resume();
};

$button.addEventListener('click', alaternateAnimations);
```

```html
<div class="medium row">
  <div class="square square-a"></div>
  <div class="padded label">persist: false</div>
</div>
<div class="medium row">
  <div class="square square-b"></div>
  <div class="padded label">persist: true</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button">Alternate</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [playbackEase](https://animejs.com/documentation/animation/animation-playback-settings/playbackease "playbackEase")
* [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")
