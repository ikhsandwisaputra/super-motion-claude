---
source: https://animejs.com/documentation/animation
title: "Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

# [Animation](https://animejs.com/documentation/animation "Animation")

## [Animates the properties values of targeted elements, with a wide range of parameters, callbacks and methods.](https://animejs.com/documentation/animation#animates-the-properties-values-of-targeted-elements-with-a-wide-range-of-parameters-callbacks-and-methods)

Animations are created using the `animate()` method imported from the main `'animejs'` module:

```js
import { animate } from 'animejs';

const animation = animate(targets, parameters);
```

Or imported as a standalone module from the `'animejs/animation'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { animate } from 'animejs/animation';
```

## [Parameters](https://animejs.com/documentation/animation#parameters)

| Name | Accepts |
| --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") |
| parameters | An `Object` of [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties"), [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters"), [Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings") and [Animation callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks") |

## [Returns](https://animejs.com/documentation/animation#returns)

`JSAnimation`

## [WAAPI powered animations](https://animejs.com/documentation/animation#waapi-powered-animations)

Anime.js provides a more lightweight (3KB) version of the `animate()` method (10KB) powered by the [Web Animation API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).

```js
import { waapi } from 'animejs';

const animation = waapi.animate(targets, parameters);
```

The WAAPI version has less features overall, but covers most of the basic API.

To know more about when to use the WAAPI version and its potential pitfalls, please refer to the [Web Animations API Guide](https://animejs.com/documentation/web-animation-api "Web Animations API Guide").

Features only available in the JavaScript version are indicated with a (JS) badge and WAAPI specific features are indicated with a (WAAPI) badge

## Animation code example

```js
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('h2', { words: false, chars: true });

animate(chars, {
  // Property keyframes
  y: [
    { to: '-2.75rem', ease: 'outExpo', duration: 600 },
    { to: 0, ease: 'outBounce', duration: 800, delay: 100 }
  ],
  // Property specific parameters
  rotate: {
    from: '-1turn',
    delay: 0
  },
  delay: stagger(50),
  ease: 'inOutCirc',
  loopDelay: 1000,
  loop: true
});
```

```html
<div class="large grid centered square-grid">
  <h2 class="text-xl">HELLO WORLD</h2>
</div>
```

```css
#animation .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
}
```

###### In this section

* [Targets](https://animejs.com/documentation/animation/targets "Targets")
* [Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")
* [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")
* [Tween parameters](https://animejs.com/documentation/animation/tween-parameters "Tween parameters")
* [Keyframes](https://animejs.com/documentation/animation/keyframes "Keyframes")
* [Playback settings](https://animejs.com/documentation/animation/animation-playback-settings "Animation playback settings")
* [Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")
* [Methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")
* [Properties](https://animejs.com/documentation/animation/animation-properties "Animation properties")

###### Previous

###### Next

* [Timer properties](https://animejs.com/documentation/timer/timer-properties "Timer properties")
* [Targets](https://animejs.com/documentation/animation/targets "Targets")
