---
source: https://p5js.org/reference/p5/second/
title: "second"
fetched: 2026-10-28
---

Returns the current second as a number from 0–59.

## Examples

## Syntax

`second()`

## Parameters

## Returns

Integer: current second between 0 and 59.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/time\_date.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/time_date.js#L303) and open a pull request!

---

## Related References

* [day

  Returns the current day as a number from 1–31.](https://p5js.org/reference/p5/day/)
* [hour

  Returns the current hour as a number from 0–23.](https://p5js.org/reference/p5/hour/)
* [millis

  Returns the number of milliseconds since a sketch started running.](https://p5js.org/reference/p5/millis/)
* [minute

  Returns the current minute as a number from 0–59.](https://p5js.org/reference/p5/minute/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Get the current second.
  let s = second();

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(12);
  textFont('Courier New');

  // Display the second.
  text(`Current second: ${s}`, 10, 50, 80);

  describe(`The text 'Current second: ${s}' written in black on a gray background.`);
}
```
