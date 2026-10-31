---
source: https://animejs.com/documentation/utilities/sync
title: "sync() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [sync()](https://animejs.com/documentation/utilities/sync "sync()")

Execute a callback function in sync with the engine loop.

```js
utils.sync(function);
```

## [Parameters](https://animejs.com/documentation/utilities/sync#parameters)

| Name | Accepts |
| --- | --- |
| callback | `Function` |

## [Returns](https://animejs.com/documentation/utilities/sync#returns)

`Timer`

## sync() code example

```js
import { animate, utils } from 'animejs';

const [ $range ] = utils.$('.range');
const [ $speed ] = utils.$('.speed');

const animation = animate('.circle', {
  x: '16rem',
  loop: true,
  alternate: true,
  playbackRate: 1,
});

const updateSpeed = () => {
  const { value } = $range;
  $speed.innerHTML = utils.roundPad(+value, 2);
  utils.sync(() => animation.speed = value);
}

$range.addEventListener('input', updateSpeed);
```

```html
<div class="large row">
  <div class="circle"></div>
  <pre class="large log row">
    <span class="label">speed</span>
    <span class="speed value">1.00</span>
  </pre>
</div>
<div class="medium row">
  <fieldset class="controls">
    <input type="range" min=0 max=5 value=1 step=.01 class="range" />
  </fieldset>
</div>
```

###### Previous

###### Next

* [remove()](https://animejs.com/documentation/utilities/remove "remove()")
* [keepTime()](https://animejs.com/documentation/utilities/createtimekeeper "keepTime()")
