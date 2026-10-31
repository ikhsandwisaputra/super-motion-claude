---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay
title: "delay | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [delay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay "delay")

Delay in ms before the scramble animation starts.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay#accepts)

* `Number`
* `Function(target, index, targets)` returning a `Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay#default)

`0`

## delay code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 500, 1500];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ delay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the scramble animation starts.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>1500</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [settleDuration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration "settleDuration")
* [duration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration "duration")
