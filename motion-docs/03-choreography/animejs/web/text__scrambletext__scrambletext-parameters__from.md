---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from
title: "from | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [from](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from "from")

Defines where the reveal wave starts from.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from#accepts)

| Value | Description |
| --- | --- |
| `'auto'` | Resolves to `'left'` when the text grows or `'right'` when it shrinks |
| `'left'` | Reveals from the left |
| `'center'` | Reveals from the center |
| `'right'` | Reveals from the right |
| `'random'` | Reveals characters in random order |
| `Number` | Reveals from a specific character index |

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from#default)

`'auto'`

## from code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const froms = ['right', 'center', 'random'];

function play(from) {
  animate($p, {
    innerHTML: scrambleText({ from }),
  });
}

play(froms[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(froms[i])));
```

```html
<div class="large row">
  <p class="text-s text-mono">Control where the reveal wave starts from, whether left, center, right, or a specific character index.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>right</button>
    <button>center</button>
    <button>random</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [perturbation](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation "perturbation")
* [reversed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed "reversed")
