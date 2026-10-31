---
source: https://p5js.org/reference/p5/textProperties/
title: "textProperties"
fetched: 2026-10-28
---

Gets or sets text properties in batch, similar to calling `textProperty()` multiple times.

If an object is passed in, `textProperty(key, value)` will be called for you on every key/value pair in the object.

If no arguments are passed in, an object will be returned with all the current properties.

## Examples

## Syntax

`textProperties(properties)``textProperties()`

## Parameters

properties

Object: An object whose keys are properties to set, and whose values are what they should be set to.

## Returns

Object: An object with all the possible properties and their current values.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/type/textCore.js](https://github.com/processing/p5.js/blob/v2.3.3/src/type/textCore.js#L1297) and open a pull request!

---

## Related References

* [textToContours

  Returns an array of arrays of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToContours/)
* [textToModel

  Converts text into a 3D model that can be rendered in WebGL mode.](https://p5js.org/reference/p5.Font/textToModel/)
* [textToPaths

  Returns a flat array of path commands that describe the outlines of a string of text.](https://p5js.org/reference/p5.Font/textToPaths/)
* [textToPoints

  Returns an array of points outlining a string of text written using the font.](https://p5js.org/reference/p5.Font/textToPoints/)
