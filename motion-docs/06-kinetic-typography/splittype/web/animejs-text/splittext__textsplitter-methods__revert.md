---
source: https://animejs.com/documentation/text/splittext/textsplitter-methods/revert
title: "revert() | TextSplitter methods | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [revert()](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "revert()")

Reverts the split target html back to its original state, removing debug styles and reverting all animations added with [`split.addEffect()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect "split.addEffect()") in the process.

## [Returns](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert#returns)

`TextSplitter`

## revert() code example

```js
import { animate, stagger, splitText, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  words: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['100%', '0%'],
  duration: 1250,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
  alternate: true,
}));

const revertSplit = () => {
  split.revert();
  $button.setAttribute('disabled', 'true');
}

$button.addEventListener('click', revertSplit);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Revert</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [addEffect()](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect "addEffect()")
* [refresh()](https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh "refresh()")
