---
source: https://animejs.com/documentation/text/splittext/split-parameters/wrap
title: "wrap | Split parameters | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [wrap](https://animejs.com/documentation/text/splittext/split-parameters/wrap "wrap")

Adds an extra wrapper element with the specified CSS [`overflow`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow) property to all split elements.

## [Outputs](https://animejs.com/documentation/text/splittext/split-parameters/wrap#outputs)

```html
<span style="overflow: clip; display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```

## [Accepts](https://animejs.com/documentation/text/splittext/split-parameters/wrap#accepts)

* `'hidden'` | `'clip'` | `'visible'` | `'scroll'` | `'auto'`
* `Boolean` (`true` is equivalent to `'clip'`)
* `null`

## [Default](https://animejs.com/documentation/text/splittext/split-parameters/wrap#default)

`null`

## wrap code example

```js
import { animate, stagger, splitText } from 'animejs';

const { chars } = splitText('p', {
  chars: { wrap: true },
});

animate(chars, {
  y: ['75%', '0%'],
  duration: 750,
  ease: 'out(3)',
  delay: stagger(50),
  loop: true,
  alternate: true,
});
```

```html
<div class="large centered row">
  <p class="text-xl">Split and wrap text.</p>
</div>
<div class="small row"></div>
```

###### Previous

###### Next

* [class](https://animejs.com/documentation/text/splittext/split-parameters/class "class")
* [clone](https://animejs.com/documentation/text/splittext/split-parameters/clone "clone")
