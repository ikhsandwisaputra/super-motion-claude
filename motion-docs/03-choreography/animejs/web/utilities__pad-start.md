---
source: https://animejs.com/documentation/utilities/pad-start
title: "padStart() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [padStart()](https://animejs.com/documentation/utilities/pad-start "padStart()")

Pads a `Number` from the start with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padStart(value, totalLength, padString);
const padderFunction = utils.padStart(totalLength, padString);
```

## [Parameters](https://animejs.com/documentation/utilities/pad-start#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

## [Returns](https://animejs.com/documentation/utilities/pad-start#returns)

A `String` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to pad numbers from the start:

```js
const padTo5WithZeros = utils.padStart(5, '0');
padTo5WithZeros('123');  // '00123'
padTo5WithZeros(78);     // '00078'
padTo5WithZeros('1234'); // '01234'

const roundAndPad = utils.round(2).padStart(5, '0'); // Round to 2 decimal places then pad to 5 characters
roundAndPad(12.345);  // '12.35'
roundAndPad(7.8);     // '07.80'
```

## padStart() code example

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 10000,
  modifier: utils.round(0).padStart(6, '-'),
  duration: 100000,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0</span>
  </pre>
</div>
```

###### Previous

###### Next

* [roundPad()](https://animejs.com/documentation/utilities/round-pad "roundPad()")
* [padEnd()](https://animejs.com/documentation/utilities/pad-end "padEnd()")
