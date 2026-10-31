---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate
title: "revealRate | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [revealRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate "revealRate")

How many characters reveal per second. Higher values make the reveal wave move faster. Together with `settleDuration`, it sets the total duration when no explicit `duration` is given.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate#accepts)

`Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate#default)

`60`

## revealRate code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [20, 60, 120];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ revealRate: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Higher values make the reveal wave move faster.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>20</button>
    <button>60</button>
    <button>120</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [cursor](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor "cursor")
* [revealDelay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealdelay "revealDelay")
