---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay
title: "revealDelay | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [revealDelay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay "revealDelay")

Delay in ms before the reveal wave starts within the scramble animation.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay#accepts)

* `Number`
* `Function(target, index, targets)` returning a `Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay#default)

`0`

## revealDelay code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [0, 500, 2000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealDelay: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Add a delay in milliseconds before the reveal wave starts within the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>0</button>
    <button>500</button>
    <button>2000</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revealRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate "revealRate")
* [settleRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/settlerate "settleRate")
