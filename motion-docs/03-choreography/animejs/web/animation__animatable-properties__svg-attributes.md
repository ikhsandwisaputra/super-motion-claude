---
source: https://animejs.com/documentation/animation/animatable-properties/svg-attributes
title: "SVG Attributes | Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [SVG Attributes JS](https://animejs.com/documentation/animation/animatable-properties/svg-attributes "SVG Attributes")

Numerical and color SVG attributes can be animated by passing them directly to the animation parameters.

For more convenient SVG animations, check out the built-in [SVG utility methods](https://animejs.com/documentation/svg "SVG utility methods").

## SVG Attributes code example

```js
import { animate } from 'animejs';

animate(['feTurbulence', 'feDisplacementMap'], {
  baseFrequency: .05,
  scale: 15,
  alternate: true,
  loop: true
});

animate('polygon', {
  points: '64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100',
  alternate: true,
  loop: true
});
```

```html
<div class="large centered row">
<svg width="128" height="128" viewBox="0 0 128 128">
  <filter id="displacementFilter">
    <feTurbulence type="turbulence" numOctaves="2" baseFrequency="0" result="turbulence"/>
    <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="1" xChannelSelector="R" yChannelSelector="G"/>
  </filter>
  <polygon points="64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96"  fill="currentColor"/>
</svg>
</div>
```

```css
#animation-animatable-properties-svg-attributes .docs-demo-template {
  display: none;
}

#animation-animatable-properties-svg-attributes .demo polygon {
  filter: url(#displacementFilter)
}
```

###### Previous

###### Next

* [HTML Attributes](https://animejs.com/documentation/animation/animatable-properties/html-attributes "HTML Attributes")
* [Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")
