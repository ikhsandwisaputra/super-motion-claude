---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed
title: "seed | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [seed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed "seed")

Seed for the random number generator. Any non-zero value produces a reproducible scramble sequence, so the same characters appear in the same order on every replay. `0` uses an unseeded generator, producing a different sequence each time.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed#accepts)

`Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed#default)

`0` (unseeded)

## seed code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 42, 99];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ seed: values[i], revealRate: 2, settleRate: 2 }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Set a seed value for the random number generator.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>42</button>
    <button>99</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [reversed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed "reversed")
* [scrambleText callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks "scrambleText callbacks")
