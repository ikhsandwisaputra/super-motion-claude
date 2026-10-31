---
source: https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces
title: "includeSpaces | TextSplitter settings | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [includeSpaces](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces "includeSpaces")

Defines whether whitespace should be included in the split elements.

```js
splitText(target, { includeSpaces: true });
```

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces#default)

`false`

## includeSpaces code example

```js
import { animate, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const [ $p ] = utils.$('p');

let includeSpaces = true;
let split;

const toggleSpaces = () => {
  if (split) split.revert();
  includeSpaces = !includeSpaces;
  split = splitText($p, {
    debug: true,
    includeSpaces: includeSpaces,
  });
}

toggleSpaces();

$button.addEventListener('click', toggleSpaces);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>Include spaces or not.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle spaces</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [debug](https://animejs.com/documentation/text/splittext/textsplitter-settings/debug "debug")
* [accessible](https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible "accessible")
