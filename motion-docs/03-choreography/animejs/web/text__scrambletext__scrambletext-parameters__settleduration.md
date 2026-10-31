---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration
title: "settleDuration | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [settleDuration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration "settleDuration")

Time in ms each character spends scrambling before settling into its final glyph.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration#accepts)

`Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settleduration#default)

`300`

## settleDuration code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [100, 300, 1000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ settleDuration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Define how long each character spends scrambling before settling into its final settled value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>100</button>
    <button>300</button>
    <button>1000</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [settleRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate "settleRate")
* [delay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay "delay")
