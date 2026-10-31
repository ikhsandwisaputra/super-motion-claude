---
source: https://p5js.org/reference/p5/nfp/
title: "nfp"
fetched: 2026-10-28
---

Converts a `Number` into a `String` with a plus or minus sign.

`nfp()` converts numbers such as 123 into strings formatted with a `+` or `-` symbol to mark whether they're positive or negative, as in `'+123'`.

The first parameter, `num`, is the number to convert to a string. For example, calling `nfp(123.45)` returns the string `'+123.45'`. If an array of numbers is passed, as in `nfp([123.45, -6.78])`, an array of formatted strings will be returned.

The second parameter, `left`, is optional. If a number is passed, as in `nfp(123.45, 4)`, it sets the minimum number of digits to include to the left of the decimal place. If `left` is larger than the number of digits in `num`, then unused digits will be set to 0. For example, calling `nfp(123.45, 4)` returns the string `'+0123.45'`.

The third parameter, `right`, is also optional. If a number is passed, as in `nfp(123.45, 4, 1)`, it sets the minimum number of digits to include to the right of the decimal place. If `right` is smaller than the number of decimal places in `num`, then `num` will be rounded to the given number of decimal places. For example, calling `nfp(123.45, 4, 1)` returns the string `'+0123.5'`. If `right` is larger than the number of decimal places in `num`, then unused decimal places will be set to 0. For example, calling `nfp(123.45, 4, 3)` returns the string `'+0123.450'`.

## Examples

## Syntax

`nfp(num, [left], [right])``nfp(nums, [left], [right])`

## Parameters

num

Number: number to format.

left

Integer: number of digits to include to the left of the decimal point.

right

Integer: number of digits to include to the right of the decimal point.

nums

Number[]: numbers to format.

## Returns

String: formatted string.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L349) and open a pull request!

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
  let p = nfp(positive);

  // Convert the negative number to a formatted string
  // with four digits to the left of the decimal
  // and two digits to the right of the decimal.
  let n = nfp(negative, 4, 2);

  // Style the text.
  textAlign(CENTER, CENTER);
  textSize(14);

  // Display the original and formatted numbers.
  text(`${positive} : ${p}`, 50, 33);
  text(`${negative} : ${n}`, 50, 67);

  describe(
    'The text "123 : +123" and "-123 : -123.00" written on separate lines. The text is in black on a gray background.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create number variables.
  let numbers = [123, -4.56];

  // Convert the numbers to formatted strings
  // with four digits to the left of the decimal
  // and one digit to the right of the decimal.
  let formatted = nfp(numbers, 4, 1);

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
    'The text "123 : +0123.0" and "-4.56 : 00-4.6" written on separate lines. The text is in black on a gray background.'
  );
}
```
