---
source: https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished
title: "finished | API differences with native WAAPI | Web Animation API | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Web Animation API](https://animejs.com/documentation/web-animation-api "Web Animation API")

[API differences](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi "API differences with native WAAPI")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [finished](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished "finished")

`animation.finished` is replaced by the `animation.then()` method. It returns a `Promise` that resolves and execute a callback when the animation completes.

## [Syntax comparison](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished#syntax-comparison)

### Anime.js

The `then()` method can be directly inlined like this:

```js
waapi.animate(target, {
  translate: '100px',
  duration: 500,
}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    translate: '100px',
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```

### WAAPI equivalent

```js
const targets = document.querySelectorAll('.square');
const animations = [];

targets.forEach(($el, i) => {
  animations[i] = $el.animate({
    translate: '100px',
  }, {
    fill: 'forwards',
    duration: 500,
  });
});

Promise.all(
  animations
    .map((animation) => animation.finished)
    .then(() => console.log('completed'))
);
```

## [Parameters](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished#parameters)

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the animation itself |

## [Returns](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/finished#returns)

`Promise`

## finished code example

```js
import { waapi, utils } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = waapi.animate('.circle', {
  translate: '16rem',
  loop: 2,
  alternate: true,
});

animation.then(() => $value.textContent = 'fulfilled');
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">promise status</span>
    <span class="value">pending</span>
  </pre>
</div>
```

###### Previous

###### Next

* [easing](https://animejs.com/documentation/web-animation-api/api-differences-with-native-waapi/easing "easing")
* [waapi.convertEase()](https://animejs.com/documentation/web-animation-api/waapi-convertease "waapi.convertEase()")
