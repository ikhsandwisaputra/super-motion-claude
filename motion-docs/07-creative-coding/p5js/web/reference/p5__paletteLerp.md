---
source: https://p5js.org/reference/p5/paletteLerp/
title: "paletteLerp"
fetched: 2026-10-28
---

Blends multiple colors to find a color between them.

The `amt` parameter specifies the amount to interpolate between the color stops which are colors at each `amt` value "location" with `amt` values that are between 2 color stops interpolating between them based on its relative distance to both.

The way that colors are interpolated depends on the current [colorMode()](https://p5js.org/reference/p5/colorMode/).

## Examples

## Syntax

`paletteLerp(colors_stops, amt)`

## Parameters

colors\_stops

[p5.Color|String|Number|Number[], Number][]: color stops to interpolate from

amt

Number: number to use to interpolate relative to color stops

## Returns

p5.Color: interpolated color.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/creating\_reading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/creating_reading.js#L1796) and open a pull request!

---

## Related References

* [contrast

  Checks the contrast between two colors.](https://p5js.org/reference/p5.Color/contrast/)
* [setAlpha

  Sets the alpha (transparency) value of a color.](https://p5js.org/reference/p5.Color/setAlpha/)
* [setBlue

  Sets the blue component of a color.](https://p5js.org/reference/p5.Color/setBlue/)
* [setGreen

  Sets the green component of a color.](https://p5js.org/reference/p5.Color/setGreen/)

## Example code (extracted)

```js
function setup() {
  createCanvas(400, 400);
}

function draw() {
  // The background goes from white to red to green to blue fill
  background(paletteLerp([
    ['white', 0],
    ['red', 0.05],
    ['green', 0.25],
    ['blue', 1]
  ], millis() / 10000 % 1));
}
```
