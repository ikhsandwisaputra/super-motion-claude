---
source: https://animejs.com/documentation/text/splittext/split-parameters/class
title: "class | Split parameters | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [class](https://animejs.com/documentation/text/splittext/split-parameters/class "class")

Specifies a custom CSS class applied to all split elements.

## [Outputs](https://animejs.com/documentation/text/splittext/split-parameters/class#outputs)

```html
<span class="my-custom-class" style="display: inline-block;">
  <span style="display: inline-block;">word</span>
</span>
```

## [Accepts](https://animejs.com/documentation/text/splittext/split-parameters/class#accepts)

* `String`
* `null`

## [Default](https://animejs.com/documentation/text/splittext/split-parameters/class#default)

`null`

## class code example

```js
import { animate, stagger, splitText } from 'animejs';

splitText('p', {
  chars: { class: 'split-char' },
});

animate('.split-char', {
  y: ['0rem', '-1rem', '0rem'],
  loop: true,
  delay: stagger(100)
});
```

```html
<div class="large centered row">
  <p class="text-xl">Custom CSS class.</p>
</div>
<div class="small row"></div>
```

```css
.split-char {
  color: var(--hex-current-1);
  background-color: var(--hex-current-3);
  outline: 1px solid var(--hex-current-2);
  border-radius: .25rem;
}
```

###### Previous

###### Next

* [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")
* [wrap](https://animejs.com/documentation/text/splittext/split-parameters/wrap "wrap")
