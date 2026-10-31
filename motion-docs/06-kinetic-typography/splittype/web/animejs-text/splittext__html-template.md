---
source: https://animejs.com/documentation/text/splittext/html-template
title: "HTML template | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [HTML template](https://animejs.com/documentation/text/splittext/html-template "HTML template")

Custom HTML templates can be used on the [`lines`](https://animejs.com/documentation/text/splittext/textsplitter-settings/lines), [`words`](https://animejs.com/documentation/text/splittext/textsplitter-settings/words), and [`chars`](https://animejs.com/documentation/text/splittext/textsplitter-settings/chars) properties, which then serve as wrappers for all split elements.

The HTML template must contain at least one `'{value}'` variable that will be replaced by the split value. Similarly, the `'{i}'` variable can be used and will be replaced by the current split index.

All the necessary styles, like `'display: inline-block;'`, will be applied automatically and don't need to be defined in the template.

For example, if you pass the following template to the char parameter like this:

```js
splitText('p', { chars: '<em class="char-{i}">{value}</em>' });
```

The split output will be:

```html
<p>
  <em class="char-0" style="display: inline-block;">H</em>
  <em class="char-1" style="display: inline-block;">E</em>
  <em class="char-2" style="display: inline-block;">L</em>
  <em class="char-3" style="display: inline-block;">L</em>
  <em class="char-4" style="display: inline-block;">O</em>
</p>
```

## [Accepts](https://animejs.com/documentation/text/splittext/html-template#accepts)

A `String` containing at least one reference to `'{value}'`

## HTML template code example

```js
import { createTimeline, stagger, splitText } from 'animejs';

splitText('p', {
  chars: `<span class="char-3d word-{i}">
    <em class="face face-top">{value}</em>
    <em class="face-front">{value}</em>
    <em class="face face-bottom">{value}</em>
  </span>`,
});

const charsStagger = stagger(100, { start: 0 });

createTimeline({ defaults: { ease: 'linear', loop: true, duration: 750 }})
.add('.char-3d', { rotateX: -90 }, charsStagger)
.add('.char-3d .face-top', { opacity: [.5, 0] }, charsStagger)
.add('.char-3d .face-front', { opacity: [1, .5] }, charsStagger)
.add('.char-3d .face-bottom', { opacity: [.5, 1] }, charsStagger);
```

```html
<div class="large centered row">
  <p class="text-xl">Custom HTML template.</p>
</div>
```

```css
.char-3d {
  position: relative;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 1rem;
}

.face {
  position: absolute;
  left: 0;
}

.face-bottom {
  top: 100%;
  transform-origin: 50% 0%;
  transform: rotateX(90deg);
}

.face-top {
  bottom: 100%;
  transform-origin: 50% 100%;
  transform: rotateX(-90deg);
}
```

###### Previous

###### Next

* [clone](https://animejs.com/documentation/text/splittext/split-parameters/clone "clone")
* [TextSplitter methods](https://animejs.com/documentation/text/splittext/textsplitter-methods "TextSplitter methods")
