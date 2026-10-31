---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation
title: "perturbation | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [perturbation](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation "perturbation")

Randomizes each character's reveal timing for a more organic, less uniform effect. At `0`, characters reveal at evenly spaced intervals. Higher values add a random offset to each character's start and end times. At `1`, that offset can reach the full settle duration, so characters overlap and settle out of order.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation#accepts)

`Number` between `0` and `1`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation#default)

`0`

## perturbation code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 0.5, 1];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ perturbation: values[i], cursor: '_________' }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Add random timing offsets to each character for a more organic and less uniform reveal effect.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>0.5</button>
    <button>1</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [duration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration "duration")
* [from](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from "from")
