---
source: https://p5js.org/reference/p5/debugMode/
title: "debugMode"
fetched: 2026-10-28
---

Adds a grid and an axes icon to clarify orientation in 3D sketches.

`debugMode()` adds a grid that shows where the “ground” is in a sketch. By default, the grid will run through the origin `(0, 0, 0)` of the sketch along the XZ plane. `debugMode()` also adds an axes icon that points along the positive x-, y-, and z-axes. Calling `debugMode()` displays the grid and axes icon with their default size and position.

There are four ways to call `debugMode()` with optional parameters to customize the debugging environment.

The first way to call `debugMode()` has one parameter, `mode`. If the system constant `GRID` is passed, as in `debugMode(GRID)`, then the grid will be displayed and the axes icon will be hidden. If the constant `AXES` is passed, as in `debugMode(AXES)`, then the axes icon will be displayed and the grid will be hidden.

The second way to call `debugMode()` has six parameters. The first parameter, `mode`, selects either `GRID` or `AXES` to be displayed. The next five parameters, `gridSize`, `gridDivisions`, `xOff`, `yOff`, and `zOff` are optional. They’re numbers that set the appearance of the grid (`gridSize` and `gridDivisions`) and the placement of the axes icon (`xOff`, `yOff`, and `zOff`). For example, calling `debugMode(20, 5, 10, 10, 10)` sets the `gridSize` to 20 pixels, the number of `gridDivisions` to 5, and offsets the axes icon by 10 pixels along the x-, y-, and z-axes.

The third way to call `debugMode()` has five parameters. The first parameter, `mode`, selects either `GRID` or `AXES` to be displayed. The next four parameters, `axesSize`, `xOff`, `yOff`, and `zOff` are optional. They’re numbers that set the appearance of the size of the axes icon (`axesSize`) and its placement (`xOff`, `yOff`, and `zOff`).

The fourth way to call `debugMode()` has nine optional parameters. The first five parameters, `gridSize`, `gridDivisions`, `gridXOff`, `gridYOff`, and `gridZOff` are numbers that set the appearance of the grid. For example, calling `debugMode(100, 5, 0, 0, 0)` sets the `gridSize` to 100, the number of `gridDivisions` to 5, and sets all the offsets to 0 so that the grid is centered at the origin. The next four parameters, `axesSize`, `xOff`, `yOff`, and `zOff` are numbers that set the appearance of the size of the axes icon (`axesSize`) and its placement (`axesXOff`, `axesYOff`, and `axesZOff`). For example, calling `debugMode(100, 5, 0, 0, 0, 50, 10, 10, 10)` sets the `gridSize` to 100, the number of `gridDivisions` to 5, and sets all the offsets to 0 so that the grid is centered at the origin. It then sets the `axesSize` to 50 and offsets the icon 10 pixels along each axis.

## Examples

## Syntax

`debugMode()``debugMode(mode)``debugMode(mode, [gridSize], [gridDivisions], [xOff], [yOff], [zOff])``debugMode(mode, [axesSize], [xOff], [yOff], [zOff])``debugMode([gridSize], [gridDivisions], [gridXOff], [gridYOff], [gridZOff], [axesSize], [axesXOff], [axesYOff], [axesZOff])`

## Parameters

mode

GRID|AXES: either GRID or AXES

gridSize

Number: side length of the grid.

gridDivisions

Number: number of divisions in the grid.

xOff

Number: offset from origin along the x-axis.

yOff

Number: offset from origin along the y-axis.

zOff

Number: offset from origin along the z-axis.

axesSize

Number: length of axes icon markers.

gridXOff

Number: grid offset from the origin along the x-axis.

gridYOff

Number: grid offset from the origin along the y-axis.

gridZOff

Number: grid offset from the origin along the z-axis.

axesXOff

Number: axes icon offset from the origin along the x-axis.

axesYOff

Number: axes icon offset from the origin along the y-axis.

axesZOff

Number: axes icon offset from the origin along the z-axis.

Notice any errors or typos? [Please let us know](https://github.com/processing/p5.js/issues). Please feel free to edit [src/webgl/interaction.js](https://github.com/processing/p5.js/blob/v2.3.3/src/webgl/interaction.js#L670) and open a pull request!

---

## Related References

* [debugMode

  Adds a grid and an axes icon to clarify orientation in 3D sketches.](https://p5js.org/reference/p5/debugMode/)
* [noDebugMode

  Turns off debugMode() in a 3D sketch.](https://p5js.org/reference/p5/noDebugMode/)
* [orbitControl

  Allows the user to orbit around a 3D sketch using a mouse, trackpad, or touchscreen.](https://p5js.org/reference/p5/orbitControl/)

## Example code (extracted)

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Enable debug mode.
  debugMode();

  describe('A multicolor box on a gray background. A grid and axes icon are displayed near the box.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.
  box(20, 40);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Enable debug mode.
  // Only display the axes icon.
  debugMode(AXES);

  describe('A multicolor box on a gray background. A grid and axes icon are displayed near the box.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.
  box(20, 40);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Enable debug mode.
  // Only display the grid and customize it:
  // - size: 50
  // - divisions: 10
  // - offsets: 0, 20, 0
  debugMode(GRID, 50, 10, 0, 20, 0);

  describe('A multicolor box on a gray background. A grid is displayed below the box.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.
  box(20, 40);
}
```

```js
// Click and drag the mouse to view the scene from different angles.

function setup() {
  createCanvas(100, 100, WEBGL);

  // Enable debug mode.
  // Display the grid and axes icon and customize them:
  // Grid
  // ----
  // - size: 50
  // - divisions: 10
  // - offsets: 0, 20, 0
  // Axes
  // ----
  // - size: 50
  // - offsets: 0, 0, 0
  debugMode(50, 10, 0, 20, 0, 50, 0, 0, 0);

  describe('A multicolor box on a gray background. A grid is displayed below the box. An axes icon is displayed at the center of the box.');
}

function draw() {
  background(200);

  // Enable orbiting with the mouse.
  orbitControl();

  // Style the box.
  normalMaterial();

  // Draw the box.
  box(20, 40);
}
```
