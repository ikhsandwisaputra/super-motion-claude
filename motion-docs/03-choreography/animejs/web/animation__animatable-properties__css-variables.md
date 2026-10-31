---
source: https://animejs.com/documentation/animation/animatable-properties/css-variables
title: "CSS Variables | Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [CSS Variables JS](https://animejs.com/documentation/animation/animatable-properties/css-variables "CSS Variables")

CSS variables with numerical or color values can be animated by directly passing the variable name as a string to the animation parameters.
This approach also enables animation of properties defined on pseudo-elements like `::after` and `::before`, which are otherwise inaccessible via JavaScript.

In order to animate CSS variables properties with the WAAPI powered `waapi.animate()` method, you need to use [`CSS.registerProperty(propertyDefinition)`](https://developer.mozilla.org/en-US/docs/Web/API/CSS/registerProperty_static "CSS.registerProperty(propertyDefinition)"), otherwise it falls back to no animations.

## CSS Variables code example

```js
import { animate, utils } from 'animejs';

// Assign the CSS variables to the properties of the animated elements
utils.set('.square', {
  '--radius': '4px',
  '--x': '0rem',
  '--pseudo-el-after-scale': '1', // applied to the pseudo element "::after"
  // Using a function prevents the variables from being converted
  borderRadius: () => 'var(--radius)',
  translateX: () => 'var(--x)',
});

// Animate the values of the CSS variables
animate('.square', {
  '--radius': '20px',
  '--x': '16.5rem',
  '--pseudo-el-after-scale': '1.55' // Animates the ":after" pseudo element of the element
});
```

```html
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
<div class="medium row">
  <div class="css-variables square"></div>
</div>
```

```css
.demo .css-variables.square:after {
  position: absolute;
  opacity: .5;
  top: 0;
  left: 0;
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  background: currentColor;
  border-radius: inherit;
  transform: scale(var(--pseudo-el-after-scale));
}
```

###### Previous

###### Next

* [CSS transforms](https://animejs.com/documentation/animation/animatable-properties/css-transforms "CSS transforms")
* [JavaScript Object properties](https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties "JavaScript Object properties")
