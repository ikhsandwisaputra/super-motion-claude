---
source: https://p5js.org/reference/p5/textProperty/
title: "textProperty"
fetched: 2026-10-28
---

Sets or gets a single text property for the renderer.

The `textProperty()` function allows you to set or retrieve a single text-related property, such as `textAlign`, `textBaseline`, `fontStyle`, or any other property that may be part of the renderer's state, its drawing context, or the canvas style.

When called with a `prop` and a `value`, the function sets the property by checking for its existence in the renderer's state, the drawing context, or the canvas style. If the property is successfully modified, the function applies the updated text properties. If called with only the `prop` parameter, the function returns the current value of that property.

## Examples

## Syntax

`textProperty(prop, value)``textProperty(prop)`

## Parameters

prop

String: The name of the text property to set or get.

value

The value to set for the specified text property. If omitted, the current value of the property is returned

## Returns

If no arguments are provided, the current value of the specified text property

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

## Example code (extracted)

```js
function setup() {
  createCanvas(300, 300);
  background(240);

  // Set the text alignment to CENTER and the baseline to TOP using textProperty.
  textProperty("textAlign", CENTER);
  textProperty("textBaseline", TOP);

  // Set additional text properties and draw the text.
  textSize(32);
  textFont("Georgia");
  fill(0);
  text("Hello, World!", width / 2, 50);

  // Retrieve and display the current text properties.
  let currentAlign = textProperty("textAlign");
  let currentBaseline = textProperty("textBaseline");

  textSize(16);
  textAlign(LEFT, TOP);
  fill(50);
  text("Current textAlign: " + currentAlign, 50, 150);
  text("Current textBaseline: " + currentBaseline, 50, 170);
}
```
