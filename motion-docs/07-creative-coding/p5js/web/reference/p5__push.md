---
source: https://p5js.org/reference/p5/push/
title: "push"
fetched: 2026-10-28
---

Begins a drawing group that contains its own styles and transformations.

By default, styles such as [fill()](https://p5js.org/reference/p5/fill/) and transformations such as [rotate()](https://p5js.org/reference/p5/rotate/) are applied to all drawing that follows. The `push()` and [pop()](https://p5js.org/reference/p5/pop/) functions can limit the effect of styles and transformations to a specific group of shapes, images, and text. For example, a group of shapes could be translated to follow the mouse without affecting the rest of the sketch:

```js
// Begin the drawing group.
push();

// Translate the origin to the mouse's position.
translate(mouseX, mouseY);

// Style the face.
noStroke();
fill('green');

// Draw the face.
circle(0, 0, 60);

// Style the eyes.
fill('white');

// Draw the left eye.
ellipse(-20, -20, 30, 20);

// Draw the right eye.
ellipse(20, -20, 30, 20);

// End the drawing group.
pop();

// Draw a bug.
let x = random(0, 100);
let y = random(0, 100);
text('🦟', x, y);
```

In the code snippet above, the bug's position isn't affected by `translate(mouseX, mouseY)` because that transformation is contained between `push()` and [pop()](https://p5js.org/reference/p5/pop/). The bug moves around the entire canvas as expected.

Note: `push()` and [pop()](https://p5js.org/reference/p5/pop/) are always called as a pair. Both functions are required to begin and end a drawing group.

`push()` and [pop()](https://p5js.org/reference/p5/pop/) can also be nested to create subgroups. For example, the code snippet above could be changed to give more detail to the frog’s eyes:

```js
// Begin the drawing group.
push();

// Translate the origin to the mouse's position.
translate(mouseX, mouseY);

// Style the face.
noStroke();
fill('green');

// Draw a face.
circle(0, 0, 60);

// Style the eyes.
fill('white');

// Draw the left eye.
push();
translate(-20, -20);
ellipse(0, 0, 30, 20);
fill('black');
circle(0, 0, 8);
pop();

// Draw the right eye.
push();
translate(20, -20);
ellipse(0, 0, 30, 20);
fill('black');
circle(0, 0, 8);
pop();

// End the drawing group.
pop();

// Draw a bug.
let x = random(0, 100);
let y = random(0, 100);
text('🦟', x, y);
```

In this version, the code to draw each eye is contained between its own `push()` and [pop()](https://p5js.org/reference/p5/pop/) functions. Doing so makes it easier to add details in the correct part of a drawing.

`push()` and [pop()](https://p5js.org/reference/p5/pop/) contain the effects of the following functions:

* [fill()](https://p5js.org/reference/p5/fill/)
* [noFill()](https://p5js.org/reference/p5/noFill/)
* [noStroke()](https://p5js.org/reference/p5/noStroke/)
* [stroke()](https://p5js.org/reference/p5/stroke/)
* [tint()](https://p5js.org/reference/p5/tint/)
* [noTint()](https://p5js.org/reference/p5/noTint/)
* [strokeWeight()](https://p5js.org/reference/p5/strokeWeight/)
* [strokeCap()](https://p5js.org/reference/p5/strokeCap/)
* [strokeJoin()](https://p5js.org/reference/p5/strokeJoin/)
* [imageMode()](https://p5js.org/reference/p5/imageMode/)
* [rectMode()](https://p5js.org/reference/p5/rectMode/)
* [ellipseMode()](https://p5js.org/reference/p5/ellipseMode/)
* [colorMode()](https://p5js.org/reference/p5/colorMode/)
* [textAlign()](https://p5js.org/reference/p5/textAlign/)
* [textFont()](https://p5js.org/reference/p5/textFont/)
* [textSize()](https://p5js.org/reference/p5/textSize/)
* [textLeading()](https://p5js.org/reference/p5/textLeading/)
* [applyMatrix()](https://p5js.org/reference/p5/applyMatrix/)
* [resetMatrix()](https://p5js.org/reference/p5/resetMatrix/)
* [rotate()](https://p5js.org/reference/p5/rotate/)
* [scale()](https://p5js.org/reference/p5/scale/)
* [shearX()](https://p5js.org/reference/p5/shearX/)
* [shearY()](https://p5js.org/reference/p5/shearY/)
* [translate()](https://p5js.org/reference/p5/translate/)

In WebGL mode, `push()` and [pop()](https://p5js.org/reference/p5/pop/) contain the effects of a few additional styles:

* [setCamera()](https://p5js.org/reference/p5/setCamera/)
* [ambientLight()](https://p5js.org/reference/p5/ambientLight/)
* [directionalLight()](https://p5js.org/reference/p5/directionalLight/)
* [pointLight()](https://p5js.org/reference/p5/pointLight/) [texture()](https://p5js.org/reference/p5/texture/)
* [specularMaterial()](https://p5js.org/reference/p5/specularMaterial/)
* [shininess()](https://p5js.org/reference/p5/shininess/)
* [normalMaterial()](https://p5js.org/reference/p5/normalMaterial/)
* [shader()](https://p5js.org/reference/p5/shader/)

## Examples

## Syntax

`push()`

## Parameters

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/core/transform.js](https://github.com/processing/p5.js/blob/v2.3.3/src/core/transform.js#L1540) and open a pull request!

---

## Related References

* [applyMatrix

  Applies a transformation matrix to the coordinate system.](https://p5js.org/reference/p5/applyMatrix/)
* [pop

  Ends a drawing group that contains its own styles and transformations.](https://p5js.org/reference/p5/pop/)
* [push

  Begins a drawing group that contains its own styles and transformations.](https://p5js.org/reference/p5/push/)
* [resetMatrix

  Clears all transformations applied to the coordinate system.](https://p5js.org/reference/p5/resetMatrix/)

## Example code (extracted)

```js
function setup() {
  createCanvas(100, 100);

  background(200);

  // Draw the left circle.
  circle(25, 50, 20);

  // Begin the drawing group.
  push();

  // Translate the origin to the center.
  translate(50, 50);

  // Style the circle.
  strokeWeight(5);
  stroke('royalblue');
  fill('orange');

  // Draw the circle.
  circle(0, 0, 20);

  // End the drawing group.
  pop();

  // Draw the right circle.
  circle(75, 50, 20);

  describe(
    'Three circles drawn in a row on a gray background. The left and right circles are white with thin, black borders. The middle circle is orange with a thick, blue border.'
  );
}
```

```js
function setup() {
  createCanvas(100, 100);

  // Slow the frame rate.
  frameRate(24);

  describe('A mosquito buzzes in front of a green frog. The frog follows the mouse as the user moves.');
}

function draw() {
  background(200);

  // Begin the drawing group.
  push();

  // Translate the origin to the mouse's position.
  translate(mouseX, mouseY);

  // Style the face.
  noStroke();
  fill('green');

  // Draw a face.
  circle(0, 0, 60);

  // Style the eyes.
  fill('white');

  // Draw the left eye.
  push();
  translate(-20, -20);
  ellipse(0, 0, 30, 20);
  fill('black');
  circle(0, 0, 8);
  pop();

  // Draw the right eye.
  push();
  translate(20, -20);
  ellipse(0, 0, 30, 20);
  fill('black');
  circle(0, 0, 8);
  pop();

  // End the drawing group.
  pop();

  // Draw a bug.
  let x = random(0, 100);
  let y = random(0, 100);
  text('🦟', x, y);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  describe(
    'Two spheres drawn on a gray background. The sphere on the left is red and lit from the front. The sphere on the right is a blue wireframe.'
  );
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the red sphere.
  push();
  translate(-25, 0, 0);
  noStroke();
  directionalLight(255, 0, 0, 0, 0, -1);
  sphere(20);
  pop();

  // Draw the blue sphere.
  push();
  translate(25, 0, 0);
  strokeWeight(0.3);
  stroke(0, 0, 255);
  noFill();
  sphere(20);
  pop();
}
```
