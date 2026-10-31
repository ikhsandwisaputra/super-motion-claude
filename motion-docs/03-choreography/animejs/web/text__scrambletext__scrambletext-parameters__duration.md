---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration
title: "duration | scrambleText parameters | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Parameters](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters "scrambleText parameters")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [duration](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration "duration")

Overrides the computed duration. If unset or `0`, the duration is automatically calculated from the text length, `revealRate` and `settleDuration` parameters.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration#accepts)

* `Number`
* `Function(target, index, targets)` returning a `Number`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/duration#default)

Auto-computed

## duration code example

```js
import { animate, scrambleText } from 'animejs';

const [ $p ] = utils.$('p');
const buttons = utils.$('button');

const values = [500, 2000, 5000];

function play(i) {
  animate($p, {
    innerHTML: scrambleText({ duration: values[i] }),
  });
}

buttons.forEach(($btn, i) => $btn.addEventListener('click', () => play(i)));
```

```html
<div class="large row">
  <p class="text-s text-mono">Override the auto-computed animation duration with a specific value in milliseconds for precise control.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>500</button>
    <button>2000</button>
    <button>5000</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [delay](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/delay "delay")
* [perturbation](https://animejs.com/documentation/text/scrambletext/scrambletext-parameters/perturbation "perturbation")
