---
source: https://p5js.org/reference/p5/texture/
title: "texture"
fetched: 2026-10-28
---

Sets the texture that will be used on shapes.

A texture is like a skin that wraps around a shape. `texture()` works with built-in shapes, such as [square()](https://p5js.org/reference/p5/square/) and [sphere()](https://p5js.org/reference/p5/sphere/), and custom shapes created with functions such as [buildGeometry()](https://p5js.org/reference/p5/buildGeometry/). To texture a geometry created with [beginShape()](https://p5js.org/reference/p5/beginShape/), uv coordinates must be passed to each [vertex()](https://p5js.org/reference/p5/vertex/) call.

The parameter, `tex`, is the texture to apply. `texture()` can use a range of sources including images, videos, and offscreen renderers such as [p5.Graphics](https://p5js.org/reference/p5/p5.Graphics) and [p5.Framebuffer](https://p5js.org/reference/p5/p5.Framebuffer) objects.

To texture a geometry created with [beginShape()](https://p5js.org/reference/p5/beginShape/), you will need to specify uv coordinates in [vertex()](https://p5js.org/reference/p5/vertex/).

Note: `texture()` can only be used in WebGL mode.

## Examples

## Syntax

`texture(tex)`

## Parameters

tex

p5.Image|p5.MediaElement|p5.Graphics|p5.Texture|p5.Framebuffer|p5.FramebufferTexture: media to use as the texture.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/material.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/material.js#L2545) and open a pull request!

---

## Related References

* [copyToContext

  Copies the shader from one drawing context to another.](https://p5js.org/reference/p5.Shader/copyToContext/)
* [inspectHooks

  Logs the hooks available in this shader, and their current implementation.](https://p5js.org/reference/p5.Shader/inspectHooks/)
* [modify

  Returns a new shader, based on the original, but with custom snippets of shader code replacing default behaviour.](https://p5js.org/reference/p5.Shader/modify/)
* [setUniform

  Sets the shader’s uniform (global) variables.](https://p5js.org/reference/p5.Shader/setUniform/)

## Example code (extracted)

```js
let img;

async function setup() {
  // Load an image and create a p5.Image object.
  img = await loadImage('/assets/laDefense.jpg');

  createCanvas(100, 100, WEBGL);

  describe('A spinning cube with an image of a ceiling on each face.');
}

function draw() {
  background(0);

  // Rotate around the x-, y-, and z-axes.
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Apply the image as a texture.
  texture(img);

  // Draw the box.
  box(50);
}
```

```js
let pg;

function setup() {
  createCanvas(100, 100, WEBGL);

  // Create a p5.Graphics object.
  pg = createGraphics(100, 100);

  // Draw a circle to the p5.Graphics object.
  pg.background(200);
  pg.circle(50, 50, 30);

  describe('A spinning cube with circle at the center of each face.');
}

function draw() {
  background(0);

  // Rotate around the x-, y-, and z-axes.
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  // Apply the p5.Graphics object as a texture.
  texture(pg);

  // Draw the box.
  box(50);
}
```

```js
let vid;

function setup() {
  // Load a video and create a p5.MediaElement object.
  vid = createVideo('/assets/fingers.mov');

  createCanvas(100, 100, WEBGL);

  // Hide the video.
  vid.hide();

  // Set the video to loop.
  vid.loop();

  describe('A rectangle with video as texture');
}

function draw() {
  background(0);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Apply the video as a texture.
  texture(vid);

  // Draw the rectangle.
  rect(-40, -40, 80, 80);
}
```

```js
let vid;

function setup() {
  // Load a video and create a p5.MediaElement object.
  vid = createVideo('/assets/fingers.mov');

  createCanvas(100, 100, WEBGL);

  // Hide the video.
  vid.hide();

  // Set the video to loop.
  vid.loop();

  describe('A rectangle with video as texture');
}

function draw() {
  background(0);

  // Rotate around the y-axis.
  rotateY(frameCount * 0.01);

  // Set the texture mode.
  textureMode(NORMAL);

  // Apply the video as a texture.
  texture(vid);

  // Draw a custom shape using uv coordinates.
  beginShape();
  vertex(-40, -40, 0, 0);
  vertex(40, -40, 1, 0);
  vertex(40, 40, 1, 1);
  vertex(-40, 40, 0, 1);
  endShape();
}
```
