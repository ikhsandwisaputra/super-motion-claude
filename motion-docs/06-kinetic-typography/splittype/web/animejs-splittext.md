---
source: https://animejs.com/documentation/text/splittext
title: "splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [splitText](https://animejs.com/documentation/text/splittext "splitText")

## [A lightweight, responsive and accessible text utility function to split, clone and wrap lines, words and characters of an HTML Element.](https://animejs.com/documentation/text/splittext#a-lightweight-responsive-and-accessible-text-utility-function-to-split-clone-and-wrap-lines-words-and-characters-of-an-html-elem)

Text splits are created using the `splitText()` function.

```js
import { splitText } from 'animejs';

const split = splitText(target, parameters);
```

Since [v4.2.0](https://github.com/juliangarnier/anime/releases/tag/v4.2.0 "v4.2.0"), the `splitText()` method can also be imported independently without importing the entire library.

```js
import { splitText } from 'animejs/text';
```

## [Parameters](https://animejs.com/documentation/text/splittext#parameters)

| Name | Accepts |
| --- | --- |
| target | A valid CSS selector `String` | `HTMLElement` |
| parameters (opt) | An `Object` of [TextSplitter settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings") |

## [Returns](https://animejs.com/documentation/text/splittext#returns)

`TextSplitter`

## splitText code example

```js
import { createTimeline, stagger, utils, splitText } from 'animejs';

const { words, chars } = splitText('p', {
  words: { wrap: 'clip' },
  chars: true,
});

createTimeline({
  loop: true,
  defaults: { ease: 'inOut(3)', duration: 650 }
})
.add(words, {
  y: [$el => +$el.dataset.line % 2 ? '100%' : '-100%', '0%'],
}, stagger(125))
.add(chars, {
  y: $el => +$el.dataset.line % 2 ? '100%' : '-100%',
}, stagger(10, { from: 'random' }))
.init();
```

```html
<div class="large centered grid square-grid">
  <p class="text-xl">
    All-in-one text splitter<br>
    テキストスプリッター
  </p>
</div>
```

```css
#text-split .text-xl {
  font-size: 1.5rem;
  color: currentColor;
  letter-spacing: 0.06em;
  line-height: 1.35;
}
```

###### In this section

* [Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")
* [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")
* [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template")
* [Methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")
* [Properties](https://animejs.com/documentation/text/splittext/textsplitter-properties "TextSplitter properties")

###### Previous

###### Next

* [Text](https://animejs.com/documentation/text "Text")
* [TextSplitter settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")
