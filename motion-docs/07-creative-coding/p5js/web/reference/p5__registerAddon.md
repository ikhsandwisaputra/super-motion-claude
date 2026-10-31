---
source: https://p5js.org/reference/p5/registerAddon/
title: "registerAddon"
fetched: 2026-10-28
---

Loads a p5.js library.

A library is a function that adds functionality to p5.js by adding methods and properties for sketches to use, or for automatically running code at different stages of the p5.js lifecycle. Take a look at the [contributor docs for creating libraries](https://p5js.org/contribute/creating_libraries/) to learn more about creating libraries.

## Examples

## Syntax

`registerAddon(library)`

## Parameters

library

Function: The library function to register

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
function myAddon(p5, fn, lifecycles) {
  fn.sayHello = function() {
    this.textAlign(this.CENTER, this.CENTER);
    this.text('Hello!', this.width / 2, this.height / 2);
  };
}
p5.registerAddon(myAddon);

function setup() {
  createCanvas(100, 100);

  background(200);
  sayHello(); // The sayHello method is now available!

  describe('The text "Hello!"');
}
```
