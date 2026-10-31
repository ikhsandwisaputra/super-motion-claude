---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override
title: "override | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [override](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override "override")

Controls the starting appearance of the text before the scramble animation begins.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override#accepts)

| Value | Description |
| --- | --- |
| `true` | Scrambles the original text using the `chars` set |
| `false` | Shows the original text as-is |
| `''` | Starts from blank |
| `' '` | Replaces characters with spaces |
| `String` | Characters set (see the [`chars`](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars) parameter) |

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override#default)

`true`

## override code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const overrides = [false, 'uppercase', '_'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ override: overrides[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Controls the starting appearance of the text before the scramble animation begins.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>false</button>
    <button>'uppercase'</button>
    <button>'_'</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [chars](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars "chars")
* [ease](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease "ease")
