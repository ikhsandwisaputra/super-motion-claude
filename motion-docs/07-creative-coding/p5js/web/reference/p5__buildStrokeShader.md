---
source: https://p5js.org/reference/p5/buildStrokeShader/
title: "buildStrokeShader"
fetched: 2026-10-28
---

##### This API is experimental

Its behavior may change in a future version of p5.js.

Create a new shader that can change how strokes are drawn, based on the default shader used for strokes. Pass the resulting shader into the [`strokeShader()`](https://p5js.org/reference/p5/strokeShader/) function to apply it to any strokes you draw.

The main way to use `buildStrokeShader` is to pass a function in as a parameter. This will let you create a shader using p5.strands.

In your function, you can call hooks to change part of the shader. In a material shader, these are the hooks available:

* [`objectInputs`](https://p5js.org/reference/p5/objectInputs/): Update vertices before any positioning has been applied. Your function gets run on every vertex.
* [`worldInputs`](https://p5js.org/reference/p5/worldInputs/): Update vertices after transformations have been applied. Your function gets run on every vertex.
* [`cameraInputs`](https://p5js.org/reference/p5/cameraInputs/): Update vertices after transformations have been applied, relative to the camera. Your function gets run on every vertex.
* [`pixelInputs`](https://p5js.org/reference/p5/pixelInputs/): Update property values on pixels on the surface of a shape. Your function gets run on every pixel.
* [`finalColor`](https://p5js.org/reference/p5/finalColor/): Update or replace the pixel color on the surface of a shape. Your function gets run on every pixel.

Read the linked reference page for each hook for more information about how to use them.

One thing you might want to do is update the color of a stroke per pixel. Here, it is being used to create a soft texture:

Rather than using opacity, we could use a form of dithering to get a different texture. This involves using only fully opaque or transparent pixels. Here, we randomly choose which pixels to be transparent:

You might also want to update some properties per vertex, such as the stroke thickness. This lets you create a more varied line:

Like the `modify()` method on shaders, advanced users can also fill in hooks using [GLSL](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_on_the_web/GLSL_Shaders/) instead of JavaScript. Read the [reference entry for `modify()`](https://p5js.org/reference/p5.Shader/modify/) for more info.

## Examples

## Syntax

`buildStrokeShader(callback, [scope])``buildStrokeShader(hooks, [scope])`

## Parameters

callback

Function: A function building a p5.strands shader.

scope

Object: An optional scope object passed to .modify().

hooks

Object: An object specifying p5.strands hooks in GLSL.

## Returns

p5.Shader: The stroke shader.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L2205) and open a pull request!

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
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildStrokeShader(material);
}

function material() {
  pixelInputs.begin();
  let opacity = 1 - smoothstep(
    0,
    15,
    length(pixelInputs.position - pixelInputs.center)
  );
  pixelInputs.color.a *= opacity;
  pixelInputs.end();
}

function draw() {
  background(255);
  strokeShader(myShader);
  strokeWeight(30);
  line(
    -width/3,
    sin(millis()*0.001) * height/4,
    width/3,
    sin(millis()*0.001 + 1) * height/4
  );
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildStrokeShader(material);
}

function material() {
  pixelInputs.begin();
  // Replace alpha in the color with dithering by
  // randomly setting pixel colors to 0 based on opacity
  let a = 1;
  if (random() > pixelInputs.color.a) {
    a = 0;
  }
  pixelInputs.color.a = a;
  pixelInputs.end();
}

function draw() {
  background(255);
  strokeShader(myShader);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i <= 50; i++) {
    stroke(
      0,
      255
        * map(i, 0, 20, 0, 1, true)
        * map(i, 30, 50, 1, 0, true)
    );
    vertex(
      map(i, 0, 50, -1, 1) * width/3,
      50 * sin(i/10 + frameCount/100)
    );
  }
  endShape();
}
```

```js
let myShader;

function setup() {
  createCanvas(200, 200, WEBGL);
  myShader = buildStrokeShader(material);
}

function material() {
  let time = millis();
  worldInputs.begin();
  // Add a somewhat random offset to the weight
  // that varies based on position and time
  let scale = 0.5 + noise(
    worldInputs.position.x * 0.01,
    worldInputs.position.y * 0.01,
    time * 0.0005
  );
  worldInputs.weight *= scale;
  worldInputs.end();
}

function draw() {
  background(255);
  strokeShader(myShader);
  strokeWeight(10);
  beginShape();
  for (let i = 0; i <= 50; i++) {
    let r = map(i, 0, 50, 0, width/3);
    let x = r*cos(i*0.2);
    let y = r*sin(i*0.2);
    vertex(x, y);
  }
  endShape();
}
```
