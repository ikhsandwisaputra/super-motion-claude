---
source: https://p5js.org/reference/p5/noCanvas/
title: "noCanvas"
fetched: 2026-10-28
---

Removes the default canvas.

By default, a 100×100 pixels canvas is created without needing to call [createCanvas()](https://p5js.org/reference/p5/createCanvas/). `noCanvas()` removes the default canvas for sketches that don't need it.

## Examples

## Syntax

`noCanvas()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/rendering.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/rendering.js#L278) and open a pull request!

---

## Related References

* [createFramebuffer

  Creates a new p5.Framebuffer object with the same WebGL context as the graphics buffer.](https://p5js.org/reference/p5.Graphics/createFramebuffer/)
* [remove

  Removes the graphics buffer from the web page.](https://p5js.org/reference/p5.Graphics/remove/)
* [reset

  Resets the graphics buffer's transformations and lighting.](https://p5js.org/reference/p5.Graphics/reset/)
* [clearDepth

  Clears the depth buffer in WebGL mode.](https://p5js.org/reference/p5/clearDepth/)

## Example code (extracted)

```js
function setup() {
  noCanvas();
}
```
