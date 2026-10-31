---
source: https://p5js.org/reference/p5/nfc/
title: "nfc"
fetched: 2026-10-28
---

Converts a `Number` into a `String` with commas to mark units of 1,000.

`nfc()` converts numbers such as 12345 into strings formatted with commas to mark the thousands place, as in `'12,345'`.

The first parameter, `num`, is the number to convert to a string. For example, calling `nfc(12345)` returns the string `'12,345'`.

The second parameter, `right`, is optional. If a number is passed, as in `nfc(12345, 1)`, it sets the minimum number of digits to include to the right of the decimal place. If `right` is smaller than the number of decimal places in `num`, then `num` will be rounded to the given number of decimal places. For example, calling `nfc(12345.67, 1)` returns the string `'12,345.7'`. If `right` is larger than the number of decimal places in `num`, then unused decimal places will be set to 0. For example, calling `nfc(12345.67, 3)` returns the string `'12,345.670'`.

## Examples

## Syntax

`nfc(num, [right])``nfc(nums, [right])`

## Parameters

num

Number|String: number to format.

right

Integer|String: number of digits to include to the right of the decimal point.

nums

Number[]: numbers to format.

## Returns

String: formatted string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L214) and open a pull request!

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
  let number = 12345;

  // Display the number as a string.
  let commas = nfc(number);
  text(commas, 15, 33);

  // Display the number with four digits
  // to the left of the decimal.
  let decimals = nfc(number, 2);
  text(decimals, 15, 67);

  describe(
    'The numbers "12,345" and "12,345.00" written on separate lines. The text is in black on a gray background.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create an array of numbers.
  let numbers = [12345, 6789];

  // Convert the numbers to formatted strings.
  let formatted = nfc(numbers);

  // Style the text.
  textAlign(CENTER, CENTER);
  textSize(14);

  // Iterate over the array.
  for (let i = 0; i < formatted.length; i += 1) {

    // Calculate the y-coordinate.
    let y = (i + 1) * 33;

    // Display the original and formatted numbers.
    text(`${numbers[i]} : ${formatted[i]}`, 50, y);
  }

  describe(
    'The text "12345 : 12,345" and "6789 : 6,789" written on two separate lines. The text is in black on a gray background.'
  );
}
```
