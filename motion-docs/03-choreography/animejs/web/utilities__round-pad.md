---
source: https://animejs.com/documentation/utilities/round-pad
title: "roundPad() | Utilities | Documentation | Anime.js | JavaScript Animation Engine"
fetched: 2026-10-28
---

[Utilities](https://animejs.com/documentation/utilities "Utilities")

[Since 4.0.0](https://github.com/juliangarnier/anime/releases/tag/v4.0.0)

# [roundPad()](https://animejs.com/documentation/utilities/round-pad "roundPad()")

Rounds a value to a specified decimal length, pads with zeros if needed, and returns the result as a string, or creates a rounding and padding `Function` with a pre-defined *decimalLength* parameter.

```js
const roundedPaddedValue = utils.roundPad(value, decimalLength);
const roundPadderFunction = utils.roundPad(decimalLength);
```

## [Parameters](https://animejs.com/documentation/utilities/round-pad#parameters)

| Name | Accepts |
| --- | --- |
| value (opt) | `Number` / `String` |
| decimalLength | `Number` |

## [Returns](https://animejs.com/documentation/utilities/round-pad#returns)

A `String` if a value is provided, otherwise a [chain-able utility](https://animejs.com/documentation/utilities/chain-able-utility-functions "chain-able utility") `Function` to round and pad numbers to the specified decimal length:

```js
const roundPadTo2Decimals = utils.roundPad(2);
roundPadTo2Decimals(90.12345);  // '90.12'
roundPadTo2Decimals(120);       // '120.00'
roundPadTo2Decimals(15.9);      // '15.90'

const snapAndRoundPad = utils.snap(50).roundPad(2); // Snap to nearest 50 then roundPad to 2 decimal places
snapAndRoundPad(123.456); // '100.00'
snapAndRoundPad(175.789); // '200.00'
```

## roundPad() code example

```js
import { animate, utils } from 'animejs';

animate('.value', {
  innerHTML: '8.1',
  modifier: utils.roundPad(3),
  duration: 10000,
  ease: 'linear',
});
```

```html
<div class="large row">
  <pre class="large log row">
    <span class="value lcd">0.000</span>
  </pre>
</div>
```

###### Previous

###### Next

* [damp()](https://animejs.com/documentation/utilities/damp "damp()")
* [padStart()](https://animejs.com/documentation/utilities/pad-start "padStart()")
