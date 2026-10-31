---
source: https://p5js.org/reference/p5/saveObj/
title: "saveObj"
fetched: 2026-10-28
---

The `saveObj()` function exports `p5.Geometry` objects as 3D models in the Wavefront .obj file format. This way, you can use the 3D shapes you create in p5.js in other software for rendering, animation, 3D printing, or more.

The exported .obj file will include the faces and vertices of the `p5.Geometry`, as well as its texture coordinates and normals, if it has them.

## Examples

## Syntax

`saveObj([fileName])`

## Parameters

fileName

String: The name of the file to save the model as. If not specified, the default file name will be 'model.obj'.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Geometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Geometry.js#L359) and open a pull request!

---

## Related References

* [calculateBoundingBox

  Calculates the position and size of the smallest box that contains the geometry.](https://p5js.org/reference/p5.Geometry/calculateBoundingBox/)
* [clearColors

  Removes the geometry’s internal colors.](https://p5js.org/reference/p5.Geometry/clearColors/)
* [computeFaces

  Computes the geometry's faces using its vertices.](https://p5js.org/reference/p5.Geometry/computeFaces/)
* [computeNormals

  Calculates the normal vector for each vertex on the geometry.](https://p5js.org/reference/p5.Geometry/computeNormals/)

## Example code (extracted)

```js
let myModel;
let saveBtn;
function setup() {
  createCanvas(200, 200, WEBGL);
  myModel = buildGeometry(function() {
    for (let i = 0; i < 5; i++) {
      push();
      translate(
        random(-75, 75),
        random(-75, 75),
        random(-75, 75)
      );
      sphere(random(5, 50));
      pop();
    }
  });

  saveBtn = createButton('Save .obj');
  saveBtn.mousePressed(() => myModel.saveObj());

  describe('A few spheres rotating in space');
}

function draw() {
  background(0);
  noStroke();
  lights();
  rotateX(millis() * 0.001);
  rotateY(millis() * 0.002);
  model(myModel);
}
```
