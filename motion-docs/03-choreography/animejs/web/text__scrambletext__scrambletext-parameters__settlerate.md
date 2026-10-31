---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate
title: "settleRate | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [settleRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate "settleRate")

How many times per second each character cycles through random glyphs. Higher values create faster flickering.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate#accepts)

`Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate#default)

`30`

## settleRate code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [5, 30, 60];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Control how many times per second characters cycle through random values during the scramble phase.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>5</button>
    <button>30</button>
    <button>60</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revealDelay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay "revealDelay")
* [settleDuration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration "settleDuration")
