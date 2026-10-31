---
source: https://animejs.com/documentation/text/splittext/textsplitter-settings/lines
title: "lines | TextSplitter settings | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [lines](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines "lines")

Defines if and how the lines should be split.
Split line elements are accessed via an array returned by the `lines` property of a `TextSplit` instance.

```js
const { lines } = splitText(target, { lines: true });
```

## [Default split wrappers](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#default-split-wrappers)

By default, each line is wrapped in a span element with the following styles and data attributes:

```html
<span style="display: block;" data-line="0">This is the first line</span>
<span style="display: block;" data-line="1">This is the second line</span>
<span style="display: block;" data-line="2">This is the third line</span>
```

## [Custom split wrappers](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#custom-split-wrappers)

Split wrappers can be configured by passing an `Object` of [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters") or by passing a custom [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template") `String`.

## [Splitting nested elements](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#splitting-nested-elements)

Nested elements are duplicated across lines when necessary. For example, the following HTML:

```html
<p>
  This is a text <a href="#link">with a link
  that contains a nested <em>em
  element</em></a>
</p>
```

Results in the following structure after splitting (CSS styles avoided for clarity):

```html
<p>
  <span>This is a text <a href="#link">with a link</a></span>
  <span><a href="#link">that contains a nested <em>em</em></a></span>
  <span><a href="#link"><em>element</em></a></span>
</p>
```

## [Font loading and line resize handling](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#font-loading-and-line-resize-handling)

To prevent incorrect line calculation, lines are split after all font loading and layout operations are complete by waiting for the [`document.fonts.ready.then`](https://developer.mozilla.org/en-US/docs/Web/API/Document/fonts#doing_operation_after_fonts_are_loaded) promise to fulfill.
Then, if the target element resizes, lines are automatically re-split, overriding the existing lines, words and chars elements in the process.

## [Animating lines, words and chars when splitting by lines](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#animating-lines-words-and-chars-when-splitting-by-lines)

Each line split overrides existing split elements, which causes running split elements animations to stop once the fonts have loaded or every time the text element resizes.
Declaring an animation within the [`split.addEffect()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect "split.addEffect()") method ensures continuous playback between resizes and automatically reverts it when using [`split.revert()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "split.revert()").

```js
const split = splitText(target, params);

split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

split.revert(); // This also reverts the animation declared with addEffect
```

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#accepts)

* `Boolean`
* `Object` of [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")
* [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template") `String`

## [Default](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines#default)

`false`

## lines code example

```js
import { animate, splitText, stagger } from 'animejs';

splitText('p', {
  lines: { wrap: 'clip' },
})
.addEffect(({ lines }) => animate(lines, {
  y: [
    { to: ['100%', '0%'] },
    { to: '-100%', delay: 750, ease: 'in(3)' }
  ],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(200),
  loop: true,
  loopDelay: 500,
}));
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by lines.<br>線で分割します。</p>
</div>
<div class="small row"></div>
```

###### Previous

###### Next

* [TextSplitter settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")
* [words](https://animejs.com/documentation/text/splittext/textsplitter-settings/words "words")
