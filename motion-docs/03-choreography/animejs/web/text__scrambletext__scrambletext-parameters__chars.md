---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars
title: "chars | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [chars](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars "chars")

Characters used during the scramble animation. Accepts a literal string of characters `'ABC123'`, range syntax `'a-d'` (expands to `'abcd'` by [Unicode code point](https://developer.mozilla.org/en-US/docs/Glossary/Code_point) order), or a combination of both: `'a-zA-Z0-9'`.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars#accepts)

* `String` (literal characters, range syntax, or a named preset)
* `Function(target, index, targets)` returning a `String`

To include a literal `-` character, place it at the start or end of the string (e.g. `'-a-z'` or `'a-z-'`), otherwise it will be interpreted as a range separator.

### Named presets

| Name | Characters |
| --- | --- |
| `'lowercase'` | `a-z` |
| `'uppercase'` | `A-Z` |
| `'numbers'` | `0-9` |
| `'symbols'` | `!%#_\|*+=` |
| `'braille'` | `⠀-⣿` |
| `'blocks'` | `▀-▟` |
| `'shades'` | `░-▓` |

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/chars#default)

`'a-zA-Z0-9!%#_'`

## chars code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const charSets = ['braille', 'blocks', 'numbers'];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ chars: charSets[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Define which characters appear during the scramble animation.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>braille</button>
    <button>blocks</button>
    <button>numbers</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [text](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/text "text")
* [override](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override "override")
