---
source: https://p5js.org/reference/p5/colorMode/
title: "colorMode"
fetched: 2026-10-28
---

Changes the way color values are interpreted.

By default, the `Number` parameters for [fill()](https://p5js.org/reference/p5/fill/), [stroke()](https://p5js.org/reference/p5/stroke/), [background()](https://p5js.org/reference/p5/background/), and [color()](https://p5js.org/reference/p5/color/) are defined by values between 0 and 255 using the RGB color model. This is equivalent to calling `colorMode(RGB, 255)`. Pure red is `color(255, 0, 0)` in this model.

Calling `colorMode(RGB, 100)` sets colors to use RGB color values between 0 and 100. Pure red is `color(100, 0, 0)` in this model.

Calling `colorMode(HSB)` or `colorMode(HSL)` changes to HSB or HSL systems instead of RGB. Pure red is `color(0, 100, 100)` in HSB and `color(0, 100, 50)` in HSL.

Some additional color modes that p5.js supports are:

`RGBP3` - High Dynamic Range RGB defined within the Display P3 color space. Colors are expressed with an extended dynamic range. To render these colors accurately, you must use the P3 canvas.

`HWB` - Hue, Whiteness, Blackness. Similar to HSB and HSL, this mode uses a hue angle. Instead of saturation and lightness, HWB defines colors based on the percentage of whiteness and blackness. This is the color model used by Chrome's GUI color picker. Pure red in HWB is represented as `color(0, 0, 0)` (i.e., hue 0 with 0% whiteness and 0% blackness).

```
     ![](https://p5js.org/assets/hwb.png)
```

`LAB` - Also known as CIE Lab, this color mode defines colors with Lightness, Alpha, and Beta. It is widely used in professional color measurement contexts due to its perceptual uniformity.

`LCH` - A more intuitive representation of the CIE Lab color space using Lightness, Chroma, and Hue. This mode separates the color's chromatic intensity (chroma) from its lightness, simplifying color selection and manipulation.

`OKLAB` - A variant of the CIE Lab color space that corrects for non-uniformities inherent in LAB. The adjustment provides a more perceptually accurate and uniform representation, which is particularly beneficial for smooth color transitions.

`OKLCH` - An easier-to-use representation of OKLAB, expressing colors in terms of Lightness, Chroma, and Hue. This mode retains the perceptual benefits of OKLAB while offering a more intuitive format for color manipulation.

[p5.Color](https://p5js.org/reference/p5/p5.Color) objects remember the mode that they were created in. Changing modes doesn't affect their appearance.

`Single-value (Grayscale) Colors`: When a color is specified with only one parameter (e.g., `color(g)`), p5.js will interpret it as a grayscale color. However, how that single parameter translates into a grayscale value depends on the color mode:

* `RGB, HSB, and HSL`: In RGB, the single value is interpreted using the “blue” maximum (i.e., the single parameter is mapped to the blue channel's max). In HSB and HSL, the single value is mapped to Brightness and Lightness max respectively with hue=0 . and saturation=0.
* `LAB, LCH, OKLAB, and OKLCH`: The single value is taken to be the `lightness (L)` component, with the specified max range for that channel.
* `HWB`: Grayscale relies on both the `whiteness (W)` and `blackness (B)` channels. Since a single value cannot directly account for two distinct channels, the library uses an average of their max values to interpret the single grayscale parameter. For instance, if W has a max of 50 and B has a max of 100, then the single grayscale parameter is mapped using (50 + 100) / 2 = 75 as its effective maximum. More complex or negative ranges are currently not handled, so results in those cases may be ambiguous.

## Examples

## Syntax

`colorMode(mode, [max])``colorMode(mode, max1, max2, max3, [maxA])``colorMode()`

## Parameters

mode

RGB|HSB|HSL|RGBP3|HWB|LAB|LCH|OKLAB|OKLCH: either RGB, HSB, HSL, or one of the extended modes described above.

max

Number: range for all values.

max1

Number: range for the red or hue depending on the current color mode.

max2

Number: range for the green or saturation depending on the current color mode.

max3

Number: range for the blue or brightness/lightness depending on the current color mode.

maxA

Number: range for the alpha.

## Returns

RGB|HSB|HSL|RGBP3|HWB|LAB|LCH|OKLAB|OKLCH: The current color mode.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/color/setting.js](https://github.com/processing/p5.js/blob/v2.3.3/src/color/setting.js#L1034) and open a pull request!

---

## Related References

* [background

  Sets the color used for the background of the canvas.](https://p5js.org/reference/p5/background/)
* [beginClip

  Starts defining a shape that will mask any shapes drawn afterward.](https://p5js.org/reference/p5/beginClip/)
* [blendMode

  Sets the way colors blend when added to the canvas.](https://p5js.org/reference/p5/blendMode/)
* [clear

  Clears the pixels on the canvas.](https://p5js.org/reference/p5/clear/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Fill with pure red.
  fill(255, 0, 0);

  circle(50, 50, 25);

  describe('A gray square with a red circle at its center.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use RGB color with values in the range 0-100.
  colorMode(RGB, 100);

  // Fill with pure red.
  fill(100, 0, 0);

  circle(50, 50, 25);

  describe('A gray square with a red circle at its center.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use HSB color.
  colorMode(HSB);

  // Fill with pure red.
  fill(0, 100, 100);

  circle(50, 50, 25);

  describe('A gray square with a red circle at its center.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Use HSL color.
  colorMode(HSL);

  // Fill with pure red.
  fill(0, 100, 50);

  circle(50, 50, 25);

  describe('A gray square with a red circle at its center.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Draw a neutral gray background using the default color mode.
  background(200);

  // Switch to HWB color mode.
  // (Assuming p5.js supports HWB with a range of:
  // hue: 0–360, whiteness: 0–100, blackness: 0–100.)
  colorMode(HWB);

  // Set fill to pure red in HWB.
  // Pure red in HWB is: hue = 0°, whiteness = 0%, blackness = 0%.
  fill(0, 0, 0);

  // Draw a circle at the center.
  circle(50, 50, 25);

  describe('A gray square with a red circle at its center, drawn using HWB color mode.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Draw a neutral gray background using the default color mode.
  background(200);

  // Switch to LAB color mode.
  // In this mode, L typically ranges from 0 to 100 while a and b span roughly -128 to 127.
  colorMode(LAB);

  // Set fill to pure red in LAB.
  // The sRGB red (255, 0, 0) converts approximately to LAB as:
  // L = 53, a = 80, b = 67.
  fill(53, 80, 67);

  // Draw a circle at the center.
  circle(50, 50, 25);

  describe('A gray square with a red circle at its center, drawn using LAB color mode.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Draw a neutral gray background.
  background(200);

  // Switch to LCH color mode.
  // In LCH, colors are defined by Lightness, Chroma, and Hue (in degrees).
  colorMode(LCH);

  // Set fill to an approximation of pure red in LCH:
  // Lightness ≈ 53, Chroma ≈ 104, Hue ≈ 40°.
  fill(53, 104, 40);

  // Draw a circle at the center.
  circle(50, 50, 25);

  describe('A gray square with a red circle at its center, drawn using LCH color mode.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use RGB color with values in the range 0-100.
  colorMode(RGB, 100);

  for (let x = 0; x < 100; x += 1) {
    for (let y = 0; y < 100; y += 1) {
      stroke(x, y, 0);
      point(x, y);
    }
  }

  describe(
    'A diagonal green to red gradient from bottom-left to top-right with shading transitioning to black at top-left corner.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Use HSB color with values in the range 0-100.
  colorMode(HSB, 100);

  for (let x = 0; x < 100; x += 1) {
    for (let y = 0; y < 100; y += 1) {
      stroke(x, y, 100);
      point(x, y);
    }
  }

  describe('A rainbow gradient from left-to-right. Brightness transitions to white at the top.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Create a p5.Color object.
  let myColor = color(180, 175, 230);
  background(myColor);

  // Use RGB color with values in the range 0-1.
  colorMode(RGB, 1);

  // Get the red, green, and blue color components.
  let redValue = red(myColor);
  let greenValue = green(myColor);
  let blueValue = blue(myColor);

  // Round the color components for display.
  redValue = round(redValue, 2);
  greenValue = round(greenValue, 2);
  blueValue = round(blueValue, 2);

  // Display the color components.
  text(`Red: ${redValue}`, 10, 10, 80, 80);
  text(`Green: ${greenValue}`, 10, 40, 80, 80);
  text(`Blue: ${blueValue}`, 10, 70, 80, 80);

  describe('A purple canvas with the red, green, and blue decimal values of the color written on it.');
}
```

```js
function setup() {
  createCanvas(100, 100);

  background(255);

  // Use RGB color with alpha values in the range 0-1.
  colorMode(RGB, 255, 255, 255, 1);

  noFill();
  strokeWeight(4);
  stroke(255, 0, 10, 0.3);
  circle(40, 40, 50);
  circle(50, 60, 50);

  describe('Two overlapping translucent pink circle outlines.');
}
```

```js
let hslGraphic, lchGraphic, oklchGraphic;

function setup() {
  createCanvas(600, 200);
  noLoop();

  // Create three graphics objects for HSL, LCH, and OKLCH color modes
  hslGraphic = createGraphics(200, 200);
  lchGraphic = createGraphics(200, 200);
  oklchGraphic = createGraphics(200, 200);

  // Draw HSL color wheel
  colorMode(HSL);
  hslGraphic.translate(100, 100);
  for (let i = 0; i < 1000; i++) {
    hslGraphic.stroke(360 / 1000 * i, 70, 50);
    hslGraphic.line(0, 0, hslGraphic.width / 2, 0);
    hslGraphic.rotate(TAU / 1000);
  }

  // Draw LCH color wheel
  colorMode(LCH);
  lchGraphic.translate(100, 100);
  for (let i = 0; i < 1000; i++) {
    lchGraphic.stroke(54, 106, 360 / 1000 * i);
    lchGraphic.line(0, 0, lchGraphic.width / 2, 0);
    lchGraphic.rotate(TAU / 1000);
  }

  // Draw OKLCH color wheel
  colorMode(OKLCH);
  oklchGraphic.translate(100, 100);
  for (let i = 0; i < 1000; i++) {
    oklchGraphic.stroke(54, 106, 360 / 1000 * i);
    oklchGraphic.line(0, 0, oklchGraphic.width / 2, 0);
    oklchGraphic.rotate(TAU / 1000);
  }
}

function draw() {
  // Set the styles
  colorMode(RGB);
  background(220);

  // Display the color wheels
  image(hslGraphic, 0, 0);
  image(lchGraphic, 200, 0);
  image(oklchGraphic, 400, 0);
}
```

```js
// Example: Single-value (Grayscale) colors in different color modes.
// The rectangle is filled with one parameter, but its final color depends
// on how that parameter is interpreted by the current color mode.

function setup() {
  createCanvas(100, 100);
  noStroke();
  noLoop();
}

function draw() {
  // Set color mode to RGB with range 0-255
  colorMode(RGB, 255);

  // Fill with single grayscale value
  fill(128);
  rect(0, 0, 100, 100);

  // Add text label
  fill(0); // Switch to black text for clarity
  textSize(14);
  text("RGB (128)", 10, 20);
}
```
