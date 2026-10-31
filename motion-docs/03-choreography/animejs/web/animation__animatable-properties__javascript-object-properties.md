---
source: https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties
title: "JavaScript Object properties | Animatable properties | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Animatable properties](https://animejs.com/documentation/animation/animatable-properties "Animatable properties")

[Since 1.0.0](https://github.com/juliangarnier/anime/releases/tag/v1.0.0)

# [JavaScript Object properties JS](https://animejs.com/documentation/animation/animatable-properties/javascript-object-properties "JavaScript Object properties")

Numerical and color JavaScript `Object` properties can be passed directly to the animation parameters.

## JavaScript Object properties code example

```js
import { animate, utils } from 'animejs';

const myObject = {
  number: 1337,
  unit: '42%',
}

const [ $log ] = utils.$('code');

animate(myObject, {
  number: 50,
  unit: '100%',
  modifier: utils.round(0),
  onRender: function() {
    $log.innerHTML = JSON.stringify(myObject);
  }
});
```

```html
<pre class="row large centered">
  <code>{"number":1337,"unit":"42%"}</code>
</pre>
```

###### Previous

###### Next

* [CSS Variables](https://animejs.com/documentation/animation/animatable-properties/css-variables "CSS Variables")
* [HTML Attributes](https://animejs.com/documentation/animation/animatable-properties/html-attributes "HTML Attributes")
