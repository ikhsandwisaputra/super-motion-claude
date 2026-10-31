---
source: https://p5js.org/reference/p5/day/
title: "day"
fetched: 2026-10-28
---

Returns the current day as a number from 1–31.

## Examples

## Syntax

`day()`

## Parameters

## Returns

Integer: current day between 1 and 31.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/time\_date.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/time_date.js#L34) and open a pull request!

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

  // Get the current day.
  let d = day();

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(12);
  textFont('Courier New');

  // Display the day.
  text(`Current day: ${d}`, 20, 50, 60);

  describe(`The text 'Current day: ${d}' written in black on a gray background.`);
}
```
