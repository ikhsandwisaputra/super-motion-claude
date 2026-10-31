---
source: https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange
title: "onChange | scrambleText callbacks | scrambleText | Text | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Text](https://animejs.com/documentation/text "Text")

[scrambleText](https://animejs.com/documentation/text/scrambletext "scrambleText")

[Callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks "scrambleText callbacks")

[Since 4.4.0](https://github.com/juliangarnier/anime/releases/tag/v4.4.0)

# [onChange](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange "onChange")

Executes a function every time the scrambled text characters are updated.

## [Accepts](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange#accepts)

A `Function` with two arguments: the current scrambled `String` and the animation progress as a `Number` between `0` and `1`

## [Default](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks/onchange#default)

`noop`

## onChange code example

```js
import { animate, scrambleText, utils } from 'animejs';

const [ $p ] = utils.$('p');
const [ $btn ] = utils.$('button');

const audioCtx = new AudioContext();
let soundEnabled = false;

const tickSound = () => {
  if (!soundEnabled) return;
  const t = audioCtx.currentTime;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(4000 + Math.random() * 400, t);
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(0.035, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.003);
  o.connect(g).connect(audioCtx.destination);
  o.start(t);
  o.stop(t + 0.003);
};

$btn.addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  if (soundEnabled) audioCtx.resume();
  $btn.textContent = soundEnabled ? 'Sound ON' : 'Sound OFF';
});

animate($p, {
  innerHTML: scrambleText({ onChange: tickSound }),
  loop: true,
  loopDelay: 1500,
});
```

```html
<div class="large row">
  <p class="text-s text-mono">Use the onChange callback to trigger a tick sound on every character update.</p>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Sound OFF</button>
  </fieldset>
</div>
```

###### Previous

###### Next

* [scrambleText callbacks](https://animejs.com/documentation/text/scrambletext/scrambletext-callbacks "scrambleText callbacks")
* [Utilities](https://animejs.com/documentation/utilities "Utilities")
