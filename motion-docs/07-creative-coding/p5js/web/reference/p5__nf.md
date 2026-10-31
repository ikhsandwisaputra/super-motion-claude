---
source: https://p5js.org/reference/p5/nf/
title: "nf"
fetched: 2026-10-28
---

Converts a `Number` into a `String` with a given number of digits.

`nf()` converts numbers such as `123.45` into strings formatted with a set number of digits, as in `'123.4500'`.

The first parameter, `num`, is the number to convert to a string. For example, calling `nf(123.45)` returns the string `'123.45'`. If an array of numbers is passed, as in `nf([123.45, 67.89])`, an array of formatted strings will be returned.

The second parameter, `left`, is optional. If a number is passed, as in `nf(123.45, 4)`, it sets the minimum number of digits to include to the left of the decimal place. If `left` is larger than the number of digits in `num`, then unused digits will be set to 0. For example, calling `nf(123.45, 4)` returns the string `'0123.45'`.

The third parameter, `right`, is also optional. If a number is passed, as in `nf(123.45, 4, 1)`, it sets the minimum number of digits to include to the right of the decimal place. If `right` is smaller than the number of decimal places in `num`, then `num` will be rounded to the given number of decimal places. For example, calling `nf(123.45, 4, 1)` returns the string `'0123.5'`. If right is larger than the number of decimal places in `num`, then unused decimal places will be set to 0. For example, calling `nf(123.45, 4, 3)` returns the string `'0123.450'`.

When the number is negative, for example, calling `nf(-123.45, 5, 2)` returns the string `'-00123.45'`.

## Examples

## Syntax

`nf(num, [left], [right])``nf(nums, [left], [right])`

## Parameters

num

Number|String: number to format.

left

Integer|String: number of digits to include to the left of the decimal point.

right

Integer|String: number of digits to include to the right of the decimal point.

nums

Number[]: numbers to format.

## Returns

String: formatted string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L88) and open a pull request!

---

## Related References

* [nf

  Converts a Number into a String with a given number of digits.](https://p5js.org/reference/p5/nf/)
* [nfc

  Converts a Number into a String with commas to mark units of 1,000.](https://p5js.org/reference/p5/nfc/)
* [nfp

  Converts a Number into a String with a plus or minus sign.](https://p5js.org/reference/p5/nfp/)
* [nfs

  Converts a positive Number into a String with an extra space in front.](https://p5js.org/reference/p5/nfs/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(16);

  // Create a number variable.
  let number = 123.45;

  // Display the number as a string.
  let formatted = nf(number);
  text(formatted, 20, 20);

  let negative = nf(-number, 4, 2);
  text(negative, 20, 40);

  // Display the number with four digits
  // to the left of the decimal.
  let left = nf(number, 4);
  text(left, 20, 60);

  // Display the number with four digits
  // to the left of the decimal and one
  // to the right.
  let right = nf(number, 4, 1);
  text(right, 20, 80);

  describe(
    'The numbers "123.45", "-0123.45", "0123.45", and "0123.5" written on four separate lines. The text is in black on a gray background.'
  );
}
```
