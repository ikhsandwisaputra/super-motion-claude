---
source: https://animejs.com/documentation/animation/tween-value-types/relative-value
title: "Relative value | Tween value types | Animation | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Animation](https://animejs.com/documentation/animation "Animation")

[Tween value types](https://animejs.com/documentation/animation/tween-value-types "Tween value types")

[Since 2.0.0](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)

# [Relative value JS](https://animejs.com/documentation/animation/tween-value-types/relative-value "Relative value")

Adds, subtracts or multiplies the current target value by a specified amount.

## [Accepts](https://animejs.com/documentation/animation/tween-value-types/relative-value#accepts)

| Prefix | Effect | Examples |
| --- | --- | --- |
| `'+='` | Add | `'+=45'` | `'+=45px'` |
| `'-='` | Subtracts | `'-=45'` | `'-=45deg'` |
| `'*='` | Multiply | `'*=.5'` |

## Relative value code example

```js
import { animate, utils } from 'animejs';

const [ $clock ] = utils.$('.clock');
const [ $add ] = utils.$('.add');
const [ $sub ] = utils.$('.sub');
const [ $mul ] = utils.$('.mul');

const add = () => animate($clock, { rotate: '+=90' });
const sub = () => animate($clock, { rotate: '-=90' });
const mul = () => animate($clock, { rotate: '*=.5' });

$add.addEventListener('click', add);
$sub.addEventListener('click', sub);
$mul.addEventListener('click', mul);
```

```html
<div class="large centered row">
  <div class="clock"></div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button class="button add">+ 90°</button>
    <button class="button sub">- 90°</button>
    <button class="button mul">× .5</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [Unit conversion value](https://animejs.com/documentation/animation/tween-value-types/unit-conversion-value "Unit conversion value")
* [Color value](https://animejs.com/documentation/animation/tween-value-types/color-value "Color value")
