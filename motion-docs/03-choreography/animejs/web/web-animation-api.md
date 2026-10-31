---
source: https://animejs.com/documentation/web-animation-api
title: "Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

# [Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

## [Create WAAPI powered animations with the simplicity of Anime.js.](https://animejs.com/documentation/web-animation-api#create-waapi-powered-animations-with-the-simplicity-of-anime-js)

Anime.js offers a even more lightweight alternative (3KB versus 10KB) to the [`animate()`](https://animejs.com/documentation/animation) method that uses the Web Animation [`Element.animate()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/animate "WAAPI Element
`animate()` method") API under the hood.

WAAPI powered animations are created using the `waapi.animate()` method imported from the main `'animejs'` module:

```js
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/waapi'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { waapi } from 'animejs/waapi';
```

## [Parameters](https://animejs.com/documentation/web-animation-api#parameters)

| Name | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| parameters | An `Object` of [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties"), [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters"), [Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings") and [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks") |

## [Returns](https://animejs.com/documentation/web-animation-api#returns)

`WAAPIAnimation`

## Web Animation API code example

```js
import { waapi, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

waapi.animate(chars, {
  translate: `0 -2rem`,
  delay: stagger(100),
  duration: 600,
  loop: true,
  alternate: true,
  ease: 'inOut(2)',
});
```

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WAAPI</h2>
</div>
```

```css
#web-animation-api .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
}
```

###### In this section

* [When to use](https://animejs.com/documentation/web-animation-api/when-to-use-waapi "When to use WAAPI")
* [Hardware-acceleration](https://animejs.com/documentation/web-animation-api/hardware-accelerated-animations "Hardware-accelerated animations")
* [Improvements to WAAPI](https://animejs.com/documentation/web-animation-api/improvements-to-the-web-animation-api "Improvements to the Web Animation API")
* [API differences](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")
* [convertEase()](https://animejs.com/documentation/web-animation-api/waapi-convertease "waapi.convertEase()")

###### Previous

###### Next

* [Spring](https://animejs.com/documentation/easings/spring "Spring")
* [When to use WAAPI](https://animejs.com/documentation/web-animation-api/when-to-use-waapi "When to use WAAPI")
