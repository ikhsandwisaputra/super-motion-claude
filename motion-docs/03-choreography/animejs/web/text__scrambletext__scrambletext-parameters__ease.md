---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease
title: "ease | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

# [ease](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease "ease")

The easing applied to the scramble animation.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease#accepts)

Any valid [easing](https://animejs.com/documentation/easings "easing") value

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/ease#default)

`'linear'`

## ease code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');
const easeCurves = ['linear', 'inOut(3)', 'outExpo'];

function play(ease) {
  animate($p, { innerHTML: scrambleText({ ease, override: false }) });
}

play(easeCurves[0]);

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(easeCurves[i])));
```

```html
<div class="large row">
  <p class="text-s text-mono">Apply easing functions to control the acceleration and deceleration of the scramble reveal wave.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>linear</button>
    <button>inOut</button>
    <button>outExpo</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [override](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/override "override")
* [cursor](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/cursor "cursor")
