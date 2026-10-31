---
source: https://p5js.org/reference/p5/shuffle/
title: "shuffle"
fetched: 2026-10-28
---

Shuffles the elements of an array.

The first parameter, `array`, is the array to be shuffled. For example, calling `shuffle(myArray)` will shuffle the elements of `myArray`. By default, the original array won’t be modified. Instead, a copy will be created, shuffled, and returned.

The second parameter, `modify`, is optional. If `true` is passed, as in `shuffle(myArray, true)`, then the array will be shuffled in place without making a copy.

## Examples

## Syntax

`shuffle(array, [modify])`

## Parameters

array

Array: array to shuffle.

modify

Boolean: if `true`, shuffle the original array in place. Defaults to `false`.

## Returns

Array: shuffled array.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/utility\_functions.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/utility_functions.js#L719) and open a pull request!

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

  // Create an array of colors.
  let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  // Create a shuffled copy of the array.
  let shuffledColors = shuffle(colors);

  // Draw  a row of circles using the original array.
  for (let i = 0; i < colors.length; i += 1) {
    // Calculate the x-coordinate.
    let x = (i + 1) * 12.5;

    // Style the circle.
    let c = colors[i];
    fill(c);

    // Draw the circle.
    circle(x, 33, 10);
  }

  // Draw  a row of circles using the original array.
  for (let i = 0; i < shuffledColors.length; i += 1) {
    // Calculate the x-coordinate.
    let x = (i + 1) * 12.5;

    // Style the circle.
    let c = shuffledColors[i];
    fill(c);

    // Draw the circle.
    circle(x, 67, 10);
  }

  describe(
    'Two rows of circles on a gray background. The top row follows the color sequence ROYGBIV. The bottom row has all the same colors but they are shuffled.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Create an array of colors.
  let colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

  // Shuffle the array.
  shuffle(colors, true);

  // Draw  a row of circles using the original array.
  for (let i = 0; i < colors.length; i += 1) {
    // Calculate the x-coordinate.
    let x = (i + 1) * 12.5;

    // Style the circle.
    let c = colors[i];
    fill(c);

    // Draw the circle.
    circle(x, 50, 10);
  }

  describe(
    'A row of colorful circles on a gray background. Their sequence changes each time the sketch runs.'
  );
}
```
