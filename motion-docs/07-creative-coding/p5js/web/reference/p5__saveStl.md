---
source: https://p5js.org/reference/p5/saveStl/
title: "saveStl"
fetched: 2026-10-28
---

The `saveStl()` function exports `p5.Geometry` objects as 3D models in the STL stereolithography file format. This way, you can use the 3D shapes you create in p5.js in other software for rendering, animation, 3D printing, or more.

The exported .stl file will include the faces, vertices, and normals of the `p5.Geometry`.

By default, this method saves a text-based .stl file. Alternatively, you can save a more compact but less human-readable binary .stl file by passing `{ binary: true }` as a second parameter.

## Examples

## Syntax

`saveStl([fileName], [options])`

## Parameters

fileName

String: The name of the file to save the model as. If not specified, the default file name will be 'model.stl'.

options

Object: Optional settings.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/p5.Geometry.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/p5.Geometry.js#L466) and open a pull request!

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
let saveBtn1;
let saveBtn2;
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

  saveBtn1 = createButton('Save .stl');
  saveBtn1.mousePressed(function() {
    myModel.saveStl();
  });
  saveBtn2 = createButton('Save binary .stl');
  saveBtn2.mousePressed(function() {
    myModel.saveStl('model.stl', { binary: true });
  });

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
