---
source: https://p5js.org/reference/p5/buildFilterShader/
title: "buildFilterShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Creates a [p5.Shader](https://p5js.org/reference/p5/p5.Shader) object to be used with the [filter()](https://p5js.org/reference/p5/filter/) function.

The main way to use `buildFilterShader` is to pass a function in as a parameter. This will let you create a shader using p5.strands.

In your function, you can use [`filterColor`](https://p5js.org/reference/p5/filterColor/) with a function that will be called for each pixel on the image to determine its final color. You can read the color of the current pixel with `getTexture(canvasContent, coord)`. See [getTexture()](https://p5js.org/reference/p5/getTexture/).

You can create uniforms if you want to pass data into your filter from the rest of your sketch. For example, you could pass in the mouse cursor position and use that to control how much you warp the content. If you create a uniform inside the shader using a function like `uniformFloat()`, with `uniform` + the type of the data, you can set its value using `setUniform` right before applying the filter. In the example below, move your mouse across the image to see it update the `warpAmount` uniform:

You can also make filters that do not need any content to be drawn first! There is a lot you can draw just using, for example, the position of the pixel. `inputs.texCoord` has an `x` and a `y` property, each with a number between 0 and 1.

You can also animate your filters over time using the `millis()` function.

We can use the `noise()` function built into strands to generate a color for each pixel. (Again no need here for underlying content for the filter to operate on.) Again we'll animate by using the millis() function to get an up-to-date time value.

Like the `modify()` method on shaders, advanced users can also fill in `filterColor` using [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) instead of JavaScript. Read the [reference entry for `modify()`](https://p5js.org/reference/p5.Shader/modify/) for more info. Alternatively, `buildFilterShader()` can also be used like [createShader()](https://p5js.org/reference/p5/createShader/), but where you only specify a fragment shader.

For more info about filters and shaders, see Adam Ferriss' [repo of shader examples](https://github.com/aferriss/p5jsShaderExamples/) or the [Introduction to Shaders](https://p5js.org/learn/getting-started-in-webgl-shaders.html) tutorial.

## Examples

## Syntax

`buildFilterShader(callback, [scope])``buildFilterShader(hooks, [scope])`

## Parameters

callback

Function: A function building a p5.strands shader.

scope

Object: An optional scope object passed to .modify().

hooks

Object: An object specifying p5.strands hooks in GLSL.

## Returns

p5.Shader: The material shader

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L742) and open a pull request!

---

## Related References

* [read

  Reads data from a storage buffer back into JavaScript.](https://p5js.org/reference/p5.StorageBuffer/read/)
* [set

  Updates a single element in the buffer at a given index.](https://p5js.org/reference/p5.StorageBuffer/set/)
* [update

  Updates the data in the buffer with new values.](https://p5js.org/reference/p5.StorageBuffer/update/)
* [baseColorShader

  Returns the default shader used for fills when no lights or textures are activate.](https://p5js.org/reference/p5/baseColorShader/)

## Example code (extracted)

```js
async function setup() {
  createCanvas(50, 50, WEBGL);
  let img = await loadImage('/assets/bricks.jpg');
  let myFilter = buildFilterShader(tintShader);

  image(img, -50, -50);
  filter(myFilter);
  describe('Bricks tinted red');
}

function tintShader() {
  filterColor.begin();
  let result = getTexture(
    filterColor.canvasContent,
    filterColor.texCoord
  );
  // Zero out the green and blue channels, leaving red
  result.g = 0;
  result.b = 0;
  filterColor.set(result);
  filterColor.end();
}
```

```js
let img;
let myFilter;
async function setup() {
  createCanvas(50, 50, WEBGL);
  img = await loadImage('/assets/bricks.jpg');
  myFilter = buildFilterShader(warpShader);
  describe('Warped bricks');
}

function warpShader() {
  let warpAmount = uniformFloat();
  filterColor.begin();
  let coord = filterColor.texCoord;
  coord.y += sin(coord.x * 10) * warpAmount;
  filterColor.set(
    getTexture(filterColor.canvasContent, coord)
  );
  filterColor.end();
}

function draw() {
  image(img, -50, -50);
  myFilter.setUniform(
    'warpAmount',
    map(mouseX, 0, width, 0, 1, true)
  );
  filter(myFilter);
}
```

```js
function setup() {
  createCanvas(50, 50, WEBGL);
  let myFilter = buildFilterShader(gradient);
  describe('A gradient with red, green, yellow, and black');
  filter(myFilter);
}

function gradient() {
  filterColor.begin();
  filterColor.set([filterColor.texCoord.x, filterColor.texCoord.y, 0, 1]);
  filterColor.end();
}
```

```js
function setup() {
  createCanvas(50, 50, WEBGL);
  let myFilter = buildFilterShader(gradient);
  describe('A gradient from red to blue');
  filter(myFilter);
}

function gradient() {
  filterColor.begin();
  filterColor.set(mix(
    [1, 0, 0, 1], // Red
    [0, 0, 1, 1], // Blue
    filterColor.texCoord.x // x coordinate, from 0 to 1
  ));
  filterColor.end();
}
```

```js
let myFilter;
function setup() {
  createCanvas(50, 50, WEBGL);
  myFilter = buildFilterShader(gradient);
  describe('A moving, repeating gradient from red to blue');
}

function gradient() {
  let time = millis();
  filterColor.begin();
  filterColor.set(mix(
    [1, 0, 0, 1], // Red
    [0, 0, 1, 1], // Blue
    sin(filterColor.texCoord.x*15 + time*0.004)/2+0.5
  ));
  filterColor.end();
}

function draw() {
  filter(myFilter);
}
```

```js
let myFilter;

function setup() {
  createCanvas(100, 100, WEBGL);
  myFilter = buildFilterShader(noiseShaderCallback);
  describe('Evolving animated cloud-like noise in cyan and magenta');
}

function noiseShaderCallback() {
  let time = millis();
  filterColor.begin();
  let coord = filterColor.texCoord;

  //generate a value roughly between 0 and 1
  let noiseVal = noise(coord.x, coord.y, time / 2000);

  let result = mix(
    [1, 0, 1, 1], // Magenta
    [0, 1, 1, 1], // Cyan
    noiseVal
  );
  filterColor.set(result);
  filterColor.end();
}

function draw() {
  filter(myFilter);
}
```
