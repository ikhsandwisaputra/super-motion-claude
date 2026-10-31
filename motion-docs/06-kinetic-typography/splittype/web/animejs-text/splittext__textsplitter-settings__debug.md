---
source: https://animejs.com/documentation/text/splittext/textsplitter-settings/debug
title: "debug | TextSplitter settings | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [debug](https://animejs.com/documentation/text/splittext/textsplitter-settings/debug "debug")

Toggles debug CSS styles on the split elements to better visualize the wrapper elements.
Lines are outlined in green, words in red, characters in blue.

```js
splitText(target, { debug: true });
```

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-settings/debug#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/text/splittext/textsplitter-settings/debug#default)

`false`

## debug code example

```js
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let debug = false;
let split;

const toggleDebug = () => {
  if (split) split.revert();
  debug = !debug;
  split = splitText($p, {
    lines: true,
    chars: true,
    words: true,
    debug: debug,
  });
}

toggleDebug();

$button.addEventListener('click', toggleDebug);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by chars.<br>文字ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle debug</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [chars](https://animejs.com/documentation/text/splittext/textsplitter-settings/chars "chars")
* [includeSpaces](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces "includeSpaces")
