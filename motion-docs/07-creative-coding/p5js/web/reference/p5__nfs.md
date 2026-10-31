---
source: https://p5js.org/reference/p5/nfs/
title: "nfs"
fetched: 2026-10-28
---

Converts a positive `Number` into a `String` with an extra space in front.

`nfs()` converts positive numbers such as 123.45 into strings formatted with an extra space in front, as in ' 123.45'. Doing so can be helpful for aligning positive and negative numbers.

The first parameter, `num`, is the number to convert to a string. For example, calling `nfs(123.45)` returns the string `' 123.45'`.

The second parameter, `left`, is optional. If a number is passed, as in `nfs(123.45, 4)`, it sets the minimum number of digits to include to the left of the decimal place. If `left` is larger than the number of digits in `num`, then unused digits will be set to 0. For example, calling `nfs(123.45, 4)` returns the string `' 0123.45'`.

The third parameter, `right`, is also optional. If a number is passed, as in `nfs(123.45, 4, 1)`, it sets the minimum number of digits to include to the right of the decimal place. If `right` is smaller than the number of decimal places in `num`, then `num` will be rounded to the given number of decimal places. For example, calling `nfs(123.45, 4, 1)` returns the string `' 0123.5'`. If `right` is larger than the number of decimal places in `num`, then unused decimal places will be set to 0. For example, calling `nfs(123.45, 4, 3)` returns the string `' 0123.450'`.

## Examples

## Syntax

`nfs(num, [left], [right])``nfs(nums, [left], [right])`

## Parameters

num

Number: number to format.

left

Integer: number of digits to include to the left of the decimal point.

right

Integer: number of digits to include to the right of the decimal point.

nums

Array: numbers to format.

## Returns

String: formatted string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L459) and open a pull request!

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

  // Create number variables.
  let positive = 123;
  let negative = -123;

  // Convert the positive number to a formatted string.
  let formatted = nfs(positive);

  // Style the text.
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(16);

  // Display the negative number and the formatted positive number.
  text(negative, 50, 33);
  text(formatted, 50, 67);

  describe(
    'The numbers -123 and 123 written on separate lines. The numbers align vertically. The text is in black on a gray background.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create a number variable.
  let number = 123.45;

  // Convert the positive number to a formatted string.
  // Use four digits to the left of the decimal and
  // one digit to the right.
  let formatted = nfs(number, 4, 1);

  // Style the text.
  textAlign(CENTER, CENTER);
  textFont('Courier New');
  textSize(16);

  // Display a negative version of the number and
  // the formatted positive version.
  text('-0123.5', 50, 33);
  text(formatted, 50, 67);

  describe(
    'The numbers "-0123.5" and "0123.5" written on separate lines. The numbers align vertically. The text is in black on a gray background.'
  );
}
```
