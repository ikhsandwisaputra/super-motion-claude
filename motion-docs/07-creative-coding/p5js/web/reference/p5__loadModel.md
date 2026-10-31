---
source: https://p5js.org/reference/p5/loadModel/
title: "loadModel"
fetched: 2026-10-28
---

Loads a 3D model to create a [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry) object.

`loadModel()` can load 3D models from OBJ and STL files. Once the model is loaded, it can be displayed with the [model()](https://p5js.org/reference/p5/model/) function, as in `model(shape)`.

There are three ways to call `loadModel()` with optional parameters to help process the model.

The first parameter, `path`, is a `String` with the path to the file. Paths to local files should be relative, as in `loadModel('/assets/model.obj')`. URLs such as `'https://example.com/model.obj'` may be blocked due to browser security. The `path` parameter can also be defined as a `Request` object for more advanced usage. Note: When loading a `.obj` file that references materials stored in `.mtl` files, p5.js will attempt to load and apply those materials. To ensure that the `.obj` file reads the `.mtl` file correctly include the `.mtl` file alongside it.

The first way to call `loadModel()` has three optional parameters after the file path. The first optional parameter, `successCallback`, is a function to call once the model loads. For example, `loadModel('/assets/model.obj', handleModel)` will call the `handleModel()` function once the model loads. The second optional parameter, `failureCallback`, is a function to call if the model fails to load. For example, `loadModel('/assets/model.obj', handleModel, handleFailure)` will call the `handleFailure()` function if an error occurs while loading. The third optional parameter, `fileType`, is the model’s file extension as a string. For example, `loadModel('/assets/model', handleModel, handleFailure, '.obj')` will try to load the file model as a `.obj` file.

The second way to call `loadModel()` has four optional parameters after the file path. The first optional parameter is a `Boolean` value. If `true` is passed, as in `loadModel('/assets/model.obj', true)`, then the model will be resized to ensure it fits the canvas. The next three parameters are `successCallback`, `failureCallback`, and `fileType` as described above.

The third way to call `loadModel()` has one optional parameter after the file path. The optional parameter, `options`, is an `Object` with options, as in `loadModel('/assets/model.obj', options)`. The `options` object can have the following properties:

```js
let options = {
  // Enables standardized size scaling during loading if set to true.
  normalize: true,

  // Function to call once the model loads.
  successCallback: handleModel,

  // Function to call if an error occurs while loading.
  failureCallback: handleError,

  // Model's file extension.
  fileType: '.stl',

  // Flips the U texture coordinates of the model.
  flipU: false,

  // Flips the V texture coordinates of the model.
  flipV: false
};

// Pass the options object to loadModel().
loadModel('/assets/model.obj', options);
```

This function returns a `Promise` and should be used in an `async` setup with `await`. See the examples for the usage syntax.

Note: There’s no support for colored STL files. STL files with color will be rendered without color.

## Examples

## Syntax

`loadModel(path, [fileType], [normalize], [successCallback], [failureCallback])``loadModel(path, [fileType], [successCallback], [failureCallback])``loadModel(path, [options])`

## Parameters

path

String|Request: path of the model to be loaded.

fileType

String: model’s file extension. Either `'.obj'` or `'.stl'`.

normalize

Boolean: if `true`, scale the model to fit the canvas.

successCallback

function(p5.Geometry): function to call once the model is loaded. Will be passed the [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry/) object.

failureCallback

function(Event): function to call if the model fails to load. Will be passed an `Error` event object.

options

Object: loading options.

## Returns

Promise<p5.Geometry>: the [p5.Geometry](https://p5js.org/reference/p5/p5.Geometry/) object

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/loading.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/loading.js#L320) and open a pull request!

---

## Related References

* [createModel

  Load a 3d model from an OBJ or STL string.](https://p5js.org/reference/p5/createModel/)
* [loadModel

  Loads a 3D model to create a p5.Geometry object.](https://p5js.org/reference/p5/loadModel/)
* [model

  Draws a p5.Geometry object to the canvas.](https://p5js.org/reference/p5/model/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

// Load the file and create a p5.Geometry object.
async function setup() {
  shape = await loadModel('/assets/teapot.obj');

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

// Load the file and create a p5.Geometry object.
// Normalize the geometry's size to fit the canvas.
async function setup() {
  shape = await loadModel('/assets/teapot.obj', true);

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

// Load the file and create a p5.Geometry object.
async function setup() {
  await loadModel('/assets/teapot.obj', true, handleModel);

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}

// Set the shape variable and log the geometry's
// ID to the console.
function handleModel(data) {
  shape = data;
  console.log(shape.gid);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

// Load the file and create a p5.Geometry object.
async function setup() {
  await loadModel('/assets/teapot.obj', true, handleModel, handleError);

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}

// Set the shape variable and print the geometry's
// ID to the console.
function handleModel(data) {
  shape = data;
  console.log(shape.gid);
}

// Print an error message if the file doesn't load.
function handleError(error) {
  console.error('Oops!', error);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;

// Load the file and create a p5.Geometry object.
async function setup() {
  await loadModel('/assets/teapot.obj', '.obj', true, handleModel, handleError);

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}

// Set the shape variable and print the geometry's
// ID to the console.
function handleModel(data) {
  shape = data;
  console.log(shape.gid);
}

// Print an error message if the file doesn't load.
function handleError(error) {
  console.error('Oops!', error);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

let shape;
let options = {
  fileType: '.obj',
  normalize: true,
  successCallback: handleModel,
  failureCallback: handleError
};

// Load the file and create a p5.Geometry object.
async function setup() {
  await loadModel('/assets/teapot.obj', options);

  createCanvas(100, 100, WEBGL);

  describe('A white teapot drawn against a gray background.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Draw the shape.
  model(shape);
}

// Set the shape variable and print the geometry's
// ID to the console.
function handleModel(data) {
  shape = data;
  console.log(shape.gid);
}

// Print an error message if the file doesn't load.
function handleError(error) {
  console.error('Oops!', error);
}
```
