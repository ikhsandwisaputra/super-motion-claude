---
source: https://animejs.com/documentation/text/splittext/split-parameters/clone
title: "clone | Split parameters | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [clone](https://animejs.com/documentation/text/splittext/split-parameters/clone "clone")

Clones the split elements in the specified direction by wrapping the lines, words, or characters within the following HTML structure and setting the `top` and `left` CSS properties accordingly.

## [Outputs](https://animejs.com/documentation/text/splittext/split-parameters/clone#outputs)

```html
<span style="position: relative; display: inline-block;">
  <span style="display: inline-block;">word</span>
  <span style="position: absolute; top: 100%; left: 0px; white-space: nowrap; display: inline-block;">word</span>
</span>
```

## [Accepts](https://animejs.com/documentation/text/splittext/split-parameters/clone#accepts)

* `'left'` | `'top'` | `'right'` | `'bottom'` | `'center'`
* `Boolean` (`true` is equivalent to `'center'`)
* `null`

## [Default](https://animejs.com/documentation/text/splittext/split-parameters/clone#default)

`null`

## clone code example

```js
import { createTimeline, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: {
    wrap: 'clip',
    clone: 'bottom'
  },
});

createTimeline()
.add(chars, {
  y: '-100%',
  loop: true,
  loopDelay: 350,
  duration: 750,
  ease: 'inOut(2)',
}, stagger(150, { from: 'center' }));
```

```html
<div class="large centered row">
  <p class="text-xl">Split and clone text.</p>
</div>
<div class="small row"></div>
```

###### Previous

###### Next

* [wrap](https://animejs.com/documentation/text/splittext/split-parameters/wrap "wrap")
* [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template")
