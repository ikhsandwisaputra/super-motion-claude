---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor
title: "cursor | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [cursor](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor "cursor")

Characters displayed at the leading edge of the reveal wave.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor#accepts)

| Value | Description |
| --- | --- |
| `true` | Uses `'_'` as cursor |
| `Number` | A character code (e.g. `124` for `'|'`) |
| `String` | Uses the string directly as cursor characters |

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor#default)

`''` (no cursor)

## cursor code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const cursors = ['_____', '░▒▓█', '😀'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ cursor: cursors[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Display a cursor character at the leading edge of the reveal wave as it moves through each character.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>_____</button>
    <button>░▒▓█</button>
    <button>😀</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [ease](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease "ease")
* [revealRate](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/revealrate "revealRate")
