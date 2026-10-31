---
source: https://animejs.com/documentation/text/scrambletext
title: "scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [scrambleText NEW](https://animejs.com/documentation/text/scrambletext "scrambleText")

## [Animates text with character-by-character scramble and reveal effect.](https://animejs.com/documentation/text/scrambletext#animates-text-with-character-by-character-scramble-and-reveal-effect)

Reveals an element's text through a scramble animation. Use it directly as a property value in `animate()`.

```js
import { scrambleText } from 'animejs';

animate(target, { innerHTML: scrambleText(parameters) });
```

Or imported as a standalone module from the `'animejs/text'` [subpath](https://animejs.com/documentation/getting-started/module-imports "subpath"):

```js
import { scrambleText } from 'animejs/text';
```

## [Parameters](https://animejs.com/documentation/text/scrambletext#parameters)

| Name | Accepts |
| --- | --- |
| parameters (opt) | An `Object` of [scrambleText parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters") |

## [Returns](https://animejs.com/documentation/text/scrambletext#returns)

A function-based tween value compatible with `animate()`.

Apply `scrambleText()` to the `innerHTML` property, as shown above, rather than `textContent`.

## scrambleText code example

```js
import { animate, scrambleText } from 'animejs';

animate('p', {
  innerHTML: scrambleText(),
  loop: true,
  loopDelay: 1000,
});
```

```html
<div class="large row">
  <p class="text-s text-mono">scrambleText() allows you to reveal a text via a smooth randomized character scramble transition effect.</p>
</div>
```

###### In this section

* [Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")
* [Callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks "scrambleText callbacks")

###### Previous

###### Next

* [TextSplitter properties](https://animejs.com/documentation/text/splittext/textsplitter-properties "TextSplitter properties")
* [scrambleText parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")
