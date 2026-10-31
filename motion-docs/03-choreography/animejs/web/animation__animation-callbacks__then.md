---
source: https://animejs.com/documentation/animation/animation-callbacks/then
title: "then() | Animation callbacks | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Callbacks](https://animejs.com/documentation/animation/animation-callbacks "Animation callbacks")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [then()](https://animejs.com/documentation/animation/animation-callbacks/then "then()")

Returns a `Promise` that resolves and execute a callback when the animation completes.

The `then()` method can be directly inlined like this:

```js
animate(target, {x: 100, duration: 500}).then(callback);
```

Or used in an `async` / `await` context:

```js
async function waitForAnimationToComplete() {
  return animate(target, {
    x: 100,
    duration: 500,
  });
}

const asyncAnimation = await waitForAnimationToComplete();
```

## [Parameters](https://animejs.com/documentation/animation/animation-callbacks/then#parameters)

| Name | Type |
| --- | --- |
| callback | A `Function` whose first argument is the animation itself |

## [Returns](https://animejs.com/documentation/animation/animation-callbacks/then#returns)

`Promise`

## then() code example

```js
import { animate } from 'animejs';

const [ $value ] = utils.$('.value');

const animation = animate('.circle', {
  x: '16rem',
  delay: 500,
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

* [onPause](https://animejs.com/documentation/animation/animation-callbacks/onpause "onPause")
* [Animation methods](https://animejs.com/documentation/animation/animation-methods "Animation methods")
