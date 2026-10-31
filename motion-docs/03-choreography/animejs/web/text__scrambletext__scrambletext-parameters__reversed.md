---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed
title: "reversed | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [reversed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed "reversed")

Reverses the reveal order. For example, `'center'` with `reversed: true` reveals from the edges inward instead of center outward.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/reversed#default)

`false`

## reversed code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

let reversed = false;

function play() {
  reversed = !reversed;
  $button.textContent = `reversed: ${reversed}`;
  animate($p, {
    innerHTML: scrambleText({ from: 'center', reversed }),
  });
}

play();

$button.addEventListener('click', play);
```

```html
<div class="large row">
  <p class="text-s text-mono">The animation flows in the opposite direction of the specified from value.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>reversed: false</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [from](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/from "from")
* [seed](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/seed "seed")
