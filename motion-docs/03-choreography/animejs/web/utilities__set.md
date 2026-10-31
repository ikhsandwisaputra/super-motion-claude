---
source: https://animejs.com/documentation/utilities/set
title: "set() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [set()](https://animejs.com/documentation/utilities/set "set()")

Immediately sets one or multiple properties values to one or multiple targets.

```js
const setter = utils.set(targets, properties);
```

## [Parameters](https://animejs.com/documentation/utilities/set#parameters)

| Name | Accepts | Description |
| --- | --- | --- |
| targets | [Targets](https://animejs.com/documentation/animation/targets "Targets") | The targeted element(s) |
| properties | `Object` | An object of valid properties and values of the target |

## [Returns](https://animejs.com/documentation/utilities/set#returns)

[Animation](https://animejs.com/documentation/animation "Animation")

`utils.set()` is useful for setting complex values, but for repeatedly updating the same properties on the same targets, using an [Animatable](https://animejs.com/documentation/animatable) is recommended for better performances.

`utils.set()` won't work if you try to set an attribute on a DOM or SVG element not already defined on the element.

## set() code example

```js
import { utils, stagger } from 'animejs';

const [ $set, $revert ] = utils.$('button');
const squares = utils.$('.square');
const colors = ['red', 'orange', 'yellow'];

let setter;

const setStyles = () => {
  setter = utils.set(squares, {
    borderRadius: '50%',
    y: () => utils.random(-1, 1) + 'rem',
    scale: stagger(.1, { start: .25, ease: 'out' }),
    color: () => `var(--hex-${utils.randomPick(colors)})`
  });
  $set.setAttribute('disabled', 'true');
  $revert.removeAttribute('disabled');
}

const revertStyles = () => {
  setter.revert();
  $set.removeAttribute('disabled');
  $revert.setAttribute('disabled', 'true');
}

$set.addEventListener('click', setStyles);
$revert.addEventListener('click', revertStyles);
```

```html
<div class="large justified row">
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
  <div class="square"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Set styles</button>
    <button disabled>Revert styles</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [get()](https://animejs.com/documentation/utilities/get "get()")
* [cleanInlineStyles()](https://animejs.com/documentation/utilities/clean-inline-styles "cleanInlineStyles()")
