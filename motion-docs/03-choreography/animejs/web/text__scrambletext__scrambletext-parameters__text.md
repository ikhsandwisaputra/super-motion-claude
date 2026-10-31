---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text
title: "text | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [text](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text "text")

The text to transition to. If not set, the original text content of the target is used.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text#accepts)

* `String`
* `Function(target, index, targets)` returning a `String`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text#default)

Original text content

## text code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const [ $button ] = utils.$('button');

const texts = ['Transition between different text.', 'Hello World!', 'Anime.js 4.4 scrambleText()'];
let i = 0;

function play() {
  i = (i + 1) % texts.length;
  animate($p, {
    innerHTML: scrambleText({ text: texts[i] }),
  });
}

play();

$button.addEventListener('click', play);
```

```html
<div class="large row centered">
  <p class="text-l text-mono">Transition between different text.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Change text</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [scrambleText parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")
* [chars](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars "chars")
