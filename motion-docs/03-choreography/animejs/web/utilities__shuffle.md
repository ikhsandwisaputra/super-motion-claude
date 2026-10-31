---
source: https://animejs.com/documentation/utilities/shuffle
title: "shuffle() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [shuffle()](https://animejs.com/documentation/utilities/shuffle "shuffle()")

Mutates an array by randomizing the order of its elements.

```js
const shuffledArray = utils.shuffle(array);
const seededShuffle = utils.shuffle(array, utils.createSeededRandom(42));
```

## [Parameters](https://animejs.com/documentation/utilities/shuffle#parameters)

| Name | Accepts |
| --- | --- |
| array | `Array` |
| rnd (opt) | A random number generator matching `random()`'s signature, defaults to `random` |

## [Returns](https://animejs.com/documentation/utilities/shuffle#returns)

The mutated `Array`

## shuffle() code example

```js
import { utils, animate, stagger } from 'animejs';

const [ $shuffle ] = utils.$('button');
const squares = utils.$('.square');
const x = stagger('3.2rem');

// Initial squares x position
utils.set(squares, { x });

const shuffle = () => animate(utils.shuffle(squares), { x });

$shuffle.addEventListener('click', shuffle);
```

```html
<div class="large row">
  <div class="square">A</div>
  <div class="square">B</div>
  <div class="square">C</div>
  <div class="square">D</div>
  <div class="square">E</div>
  <div class="square">F</div>
</div>
<div class="medium row">
  <fieldset class="controls">
    <button>Shuffle</button>
  </fieldset>
</div>
```

```css
#utilities-shuffle .square {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(var(--rgb-current-1), .25);
}

#utilities-shuffle .docs-demo-template .square {
  opacity: 0;
}
```

###### Previous

###### Next

* [randomPick()](https://animejs.com/documentation/utilities/random-pick "randomPick()")
* [round()](https://animejs.com/documentation/utilities/round "round()")
