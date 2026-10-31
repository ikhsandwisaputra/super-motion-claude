---
source: https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible
title: "accessible | TextSplitter settings | splitText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[splitText](https://animejs.com/documentation/text/splittext "splitText")

[Settings](https://animejs.com/documentation/text/splittext/textsplitter-settings "TextSplitter settings")

[Since 4.1.0](https://github.com/juliangarnier/anime/releases/tag/v4.1.0)

# [accessible](https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible "accessible")

Creates an accessible cloned element that preserves the structure of the original split element.

```js
splitText(target, { accessible: true });
```

## [Accepts](https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible#accepts)

`Boolean`

## [Default](https://animejs.com/documentation/text/splittext/textsplitter-settings/accessible#default)

`true`

## accessible code example

```js
import { createTimeline, splitText, stagger, utils } from 'animejs';

const [ $button ] = utils.$('button');
const split = splitText('p', { debug: true });
const $accessible = split.$target.firstChild;

$accessible.style.cssText = `
  opacity: 0;
  position: absolute;
  color: var(--hex-green-1);
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  outline: currentColor dotted 1px;
`;

const showAccessibleClone = createTimeline({
  defaults: { ease: 'inOutQuad' },
})
.add($accessible, {
  opacity: 1,
  z: '-2rem',
}, 0)
.add('p', {
  rotateX: 0,
  rotateY: 60
}, 0)
.add(split.words, {
  z: '6rem',
  opacity: .75,
  outlineColor: { from: '#FFF0' },
  duration: 750,
  delay: stagger(40, { from: 'random' })
}, 0)
.init();

const toggleAccessibleClone = () => {
  showAccessibleClone.alternate().resume();
}

$button.addEventListener('click', toggleAccessibleClone);
```

```html
<div class="large centered row">
  <p class="text-xl">Split text by words.<br>単語ごとに分割します。</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Toggle accessible</button>
  </fieldset>
</div>
```

```css
.docs-demo.is-active #text-splittext-textsplitter-settings-accessible .docs-demo-template {
  opacity: 0;
}

#text-splittext-textsplitter-settings-accessible .large.row {
  perspective: 600px;
}

#text-splittext-textsplitter-settings-accessible .text-xl {
  transform-style: preserve-3d;
}
```

###### Previous

###### Next

* [includeSpaces](https://animejs.com/documentation/text/splittext/textsplitter-settings/includespaces "includeSpaces")
* [Split parameters](https://animejs.com/documentation/text/splittext/split-parameters "Split parameters")
