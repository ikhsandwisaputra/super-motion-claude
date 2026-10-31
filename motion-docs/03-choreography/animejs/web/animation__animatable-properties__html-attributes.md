---
source: https://animejs.com/documentation/animation/animatable-properties/html-attributes
title: "HTML Attributes | Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [HTML Attributes JS](https://animejs.com/documentation/animation/animatable-properties/html-attributes "HTML Attributes")

Numerical and color HTML attributes can be passed directly to the animation parameters.

## HTML Attributes code example

```js
import { animate, utils } from 'animejs';

animate('input', {
  value: 1000, // animate the input "value" attribute
  alternate: true,
  loop: true,
  modifier: utils.round(0),
});
```

```html
<pre class="row large centered">
  <input type="range" value="0" min="0" max="1000" />
  <input type="text" value="0" size="5"/>
</pre>
```

###### Previous

###### Next

* [JavaScript Object properties](https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties "JavaScript Object properties")
* [SVG Attributes](https://animejs.com/documentation/animation/animatable-properties/svg-attributes "SVG Attributes")
