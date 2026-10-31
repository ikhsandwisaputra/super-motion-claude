---
source: https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect
title: "addEffect() | TextSplitter methods | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [addEffect()](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect "addEffect()")

Preserves animations and callbacks state between splits when splitting by [`lines`](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines "lines"), and allows reverting all split animations at once using [`split.revert()`](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "split.revert()").

```js
const split = splitText({
  lines: true,
  chars: true,
});

// Doesn't work when splitting by lines because the split can be delayed by the fonts loading
animate([split.lines, split.words, split.chars], {
  opacity: { from: 0 },
});

// Works! addEffect() will be safely executed after each split
// making sure the split elements are always up to date
split.addEffect(({ lines, words, chars }) => animate([lines, words, chars], {
  opacity: { from: 0 },
}));

// Reverts both the text split and the effect animation
split.revert();
```

An effect's animation or callback is automatically refreshed when:

* `splitText()` is called and the `document.fonts.ready` `Promise` resolves (if it wasn't already resolved, otherwise triggers immediately).
* Splitting by [`lines`](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines "lines") and the target element's width has changed, regardless of whether the line structure actually changes

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-methods/addeffect#accepts)

A `Function` whose first argument is the `SplitText` itself and can return either an Animation, Timeline, Timer or an optional cleanup function that is called before every subsequent lines calculation.

## addEffect() code example

```js
import { animate, utils, stagger, splitText } from 'animejs';

const colors = [];

splitText('p', {
  lines: true,
})
/* Registering an animation to the split */
.addEffect(({ lines }) => animate(lines, {
  y: ['50%', '-50%'],
  loop: true,
  alternate: true,
  delay: stagger(400),
  ease: 'inOutQuad',
}))
/* Registering a callback to the split */
.addEffect(split => {
  split.words.forEach(($el, i) => {
    const color = colors[i];
    if (color) utils.set($el, { color });
    $el.addEventListener('pointerenter', () => {
      animate($el, {
        color: utils.randomPick(['#FF4B4B', '#FFCC2A', '#B7FF54', '#57F695']),
        duration: 250,
      })
    });
  });
  return () => {
    /* Called between each split */
    split.words.forEach((w, i) => colors[i] = utils.get(w, 'color'));
  }
});
```

```html
<div class="iframe-content resizable">
  <div class="medium centered row">
    <p class="text-l">Hover the words to animate their color, then resize the text.</p>
  </div>
</div>
```

###### Previous

###### Next

* [TextSplitter methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")
* [revert()](https://animejs.com/documentation/text/splittext/textsplitter-methods/revert "revert()")
