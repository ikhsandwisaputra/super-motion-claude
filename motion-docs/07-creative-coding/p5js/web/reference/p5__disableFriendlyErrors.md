---
source: https://p5js.org/reference/p5/disableFriendlyErrors/
title: "disableFriendlyErrors"
fetched: 2026-10-28
---

Turns off the parts of the Friendly Error System (FES) that impact performance.

The [FES](https://github.com/processing/p5.js/blob/main/contributor_docs/friendly_error_system.md) can cause sketches to draw slowly because it does extra work behind the scenes. For example, the FES checks the arguments passed to functions, which takes time to process. Disabling the FES can significantly improve performance by turning off these checks.

## Examples

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/main.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/main.js#L652) and open a pull request!

---

## Related References

* [disableFriendlyErrors

  Turns off the parts of the Friendly Error System (FES) that impact performance.](https://p5js.org/reference/p5/disableFriendlyErrors/)
* [draw

  A function that's called repeatedly while the sketch runs.](https://p5js.org/reference/p5/draw/)
* [isLooping

  Returns true if the draw loop is running and false if not.](https://p5js.org/reference/p5/isLooping/)
* [loop

  Resumes the draw loop after noLoop() has been called.](https://p5js.org/reference/p5/loop/)

## Example code (extracted)

```js
// Disable the FES.
p5.disableFriendlyErrors = true;

function setup() {
  createCanvas(100, 100);

  background(200);

  // The circle() function requires three arguments. The
  // next line would normally display a friendly error that
  // points this out. Instead, nothing happens and it fails
  // silently.
  circle(50, 50);

  describe('A gray square.');
}
```
