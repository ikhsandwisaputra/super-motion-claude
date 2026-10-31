---
source: https://p5js.org/reference/p5/month/
title: "month"
fetched: 2026-10-28
---

Returns the current month as a number from 1–12.

## Examples

## Syntax

`month()`

## Parameters

## Returns

Integer: current month between 1 and 12.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/utilities/time\_date.js](https://github.com/processing/p5.js/blob/v2.3.3/src/utilities/time_date.js#L272) and open a pull request!

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

  // Get the current month.
  let m = month();

  // Style the text.
  textAlign(LEFT, CENTER);
  textSize(12);
  textFont('Courier New');

  // Display the month.
  text(`Current month: ${m}`, 10, 50, 80);

  describe(`The text 'Current month: ${m}' written in black on a gray background.`);
}
```
