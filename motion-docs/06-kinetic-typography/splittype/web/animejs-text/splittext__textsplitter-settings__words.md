---
source: https://animejs.com/documentation/text/splittext/textsplitter-settings/words
title: "words | TextSplitter settings | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [words](https://animejs.com/documentation/text/splittext/textsplitter-settings/words "words")

Defines if and how the words should be split.
Split word elements are accessed via an array returned by the `words` property of a `TextSplit` instance.

```js
const { words } = splitText(target, { words: true });
```

Internally, for browsers that support it, word splitting is done using the native [`Intl.Segmenter`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Segmenter#examples "Intl.Segmenter") object, allowing splitting words for languages that don't use spaces, like Japanese, Chinese, Thai, Lao, Khmer, Myanmar, etc, and falls back to using [`String.prototype.split()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split "String.prototype.split()") for older browsers.

## [Default split wrappers](https://animejs.com/documentation/text/splittext/textsplitter-settings/words#default-split-wrappers)

By default, each word is wrapped in a span element with the following styles and data attributes:

```html
<span style="display: inline-block;" data-line="0" data-word="0">Split</span>
<span style="display: inline-block;" data-line="0" data-word="1">by</span>
<span style="display: inline-block;" data-line="0" data-word="2">words</span>
```

## [Custom split wrappers](https://animejs.com/documentation/text/splittext/textsplitter-settings/words#custom-split-wrappers)

Split wrappers can be configured by passing an `Object` of [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters") or by passing a custom [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template") `String`.

## [Animating words when also splitting by lines](https://animejs.com/documentation/text/splittext/textsplitter-settings/words#animating-words-when-also-splitting-by-lines)

Each line split overrides existing word elements, which causes running word animations to stop once the fonts have loaded or every time the text element resizes.
Declaring an animation within the [`split.addEffect()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect "split.addEffect()") method ensures continuous playback between resizes and automatically reverts it when using [`split.revert()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "split.revert()").

```js
const split = splitText(target, params);

split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

split.revert(); // This also reverts the animation declared with addEffect
```

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-settings/words#accepts)

* `Boolean`
* `Object` of [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")
* [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template") `String`

## [Default](https://animejs.com/documentation/text/splittext/textsplitter-settings/words#default)

`true`

## words code example

```js
import { animate, splitText, stagger } from 'animejs';

const { words } = splitText('p', {
  words: { wrap: 'clip' },
})

animate(words, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(100),
  loop: true,
});
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="small row"></div>
```

###### Previous

###### Next

* [lines](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines "lines")
* [chars](https://animejs.com/documentation/text/splittext/textsplitter-settings/chars "chars")
