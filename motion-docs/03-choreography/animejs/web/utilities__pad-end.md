---
source: https://animejs.com/documentation/utilities/pad-end
title: "padEnd() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [padEnd()](https://animejs.com/documentation/utilities/pad-end "padEnd()")

Pads a `Number` from the end with a string until the result reaches a given length or creates a padding `Function` with pre-defined *totalLength* and *padString* parameters.

```js
const paddedValue = utils.padEnd(value, totalLength, padString);
const padderFunction = utils.padEnd(totalLength, padString);
```

## [Parameters](https://animejs.com/documentation/utilities/pad-end#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `String` / `Number` |
| totalLength | `Number` |
| padString | `String` |

## [Returns](https://animejs.com/documentation/utilities/pad-end#returns)

A `String` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to pad numbers from the end:

```js
const padTo5WithZeros = utils.padEnd(5, '0');
padTo5WithZeros('123');  // '12300'
padTo5WithZeros(78);     // '78000'
padTo5WithZeros('1234'); // '12340'

const roundAndPadEnd = utils.round(0).padEnd(5, '0'); // Round to nearest integer then pad to 5 characters
roundAndPadEnd(123.456); // '12300'
roundAndPadEnd(7.8);     // '80000'
```

## padEnd() code example

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: 1,
  modifier: utils.round(3).padEnd(6, '-'),
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

* [padStart()](https://animejs.com/documentation/utilities/pad-start "padStart()")
* [degToRad()](https://animejs.com/documentation/utilities/deg-to-rad "degToRad()")
