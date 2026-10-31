---
source: https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh
title: "refresh() | TextSplitter methods | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [refresh()](https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh "refresh()")

Manually splits the text again, taking into account any parameters changes.

```js
const split = splitText(target);

split.html = 'Some new text to split';

split.refresh();
```

The properties that can be safely manually updated are:

| Name | Description |
| --- | --- |
| **$target** | The split element (`HTMLElement`) |
| **html** | The html to split (`String`) |
| **debug** | Defines if the debug styles are visible or not (`Boolean`) |
| **includeSpaces** | Defines if the spaces should be wrapped within the text (`Boolean`) |
| **accessible** | Defines if the accessible clone element should be created (`Boolean`) |
| **lineTemplate** | The line [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |
| **wordTemplate** | The word [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |
| **charTemplate** | The char [html template](https://animejs.com/documentation/text/splittext/html-template) (`String`) |

## [Returns](https://animejs.com/documentation/text/splittext/textsplitter-methods/refresh#returns)

`TextSplitter`

## refresh() code example

```js
import { animate, stagger, splitText, utils } from 'animejs';

const [ $add, $remove ] = utils.$('button');
const [ $p ] = utils.$('p');

const split = splitText('p', {
  lines: { wrap: 'clip' },
  debug: true,
});

split.addEffect((self) => animate(self.words, {
  y: ['0%', '75%'],
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
  delay: stagger(150)
}));

const words = ['sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'tortor', 'lectus', 'aliquet'];

const addRandomWord = () => {
  split.html += ' ' + utils.randomPick(words);
  split.refresh();
}

const removeRandomWord = () => {
  const words = split.words.map(w => w.innerHTML);
  split.html = (words.splice(utils.random(0, words.length - 1), 1), words).join(' ');
  split.refresh();
}

$add.addEventListener('click', addRandomWord);
$remove.addEventListener('click', removeRandomWord);
```

```html
<div class="large centered row">
  <p class="text-xl">Lorem ipsum dolor</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Add word</button>
    <button>Remove word</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [revert()](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "revert()")
* [TextSplitter properties](https://animejs.com/documentation/text/splittext/textsplitter-properties "TextSplitter properties")
