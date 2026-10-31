---
source: https://paperjs.org/features/
title: "Paper.js — Features"
fetched: 2026-10-28
---

# Features

Standing on the shoulders of Scriptographer and making use of HTML5 standards, Paper.js is a comprehensive open source vector graphics scripting framework.

## Document Object Model

Paper.js provides a Document Object Model (also called a Scene Graph) that is very easy to work with. Create a project and populate it with layers, groups, paths, rasters etc. Groups and layers can contain other items and even other groups.

If you've never heard of a Document Object Model before, you can think of it as the layers palette of applications such as Adobe Illustrator & Adobe Photoshop.

![](https://paperjs.org/features/Layers.gif)

The image on the left is an illustration of the structure of the project after executing the code below, if you would be looking at it in an application like Adobe Illustrator. There are two layers, the red path was created in the first layer and the green path was created in the second.

Source

Learn more about the Document Object Model in the [Project Hierarchy](http://paperjs.org/tutorials/project-items/project-hierarchy/) tutorial.

## Paths & Segments

Paper.js makes it very easy to create paths and add segments to them. After adding, the segments can be easily inspected, manipulated, moved around, removed etc.

Source

In Paper.js, paths are represented by a sequence of segments that are connected by curves. A segment consists of a point and two handles, defining the location and direction of the curves.

Learn more about paths and segments in the [Working with Path Items](http://paperjs.org/tutorials/paths/working-with-path-items/) tutorial.

## Mouse Interaction

Paper.js offers mouse handlers for the different actions you can perform with a mouse (or touch screen). You can use these handlers to produce different types of tools that have different ways of reacting to mouse interaction and movement. Just define the handler functions in your Paperscript code and they will be called by Paper.js whenever the user interacts with the canvas.

Read more about mouse handlers in the [Creating Mouse Tools](http://paperjs.org/tutorials/interaction/creating-mouse-tools/) tutorial.

```
function onMouseDown(event) {
	// Code executed when the user presses the mouse
}

function onMouseDrag(event) {
	// Code executed when the user drags the mouse
}

function onMouseUp(event) {
	// Code executed when the user releases the mouse
}
```

The event object that is passed to the event handler includes many handy properties that describe the movement and position of the mouse. Learn more about mouse events in the [Mouse Events](http://paperjs.org/tutorials/interaction/mouse-tool-events/) tutorial.

Source

## Keyboard Interaction

Paper.js allows you to interact with the keyboard in two ways: You can either intercept key events and respond to these, or you can check the state of a given key at any moment, to see if it is pressed or not.

Learn more about keyboard interaction in the [Keyboard Interaction](https://paperjs.org/tutorials/interaction/keyboard-interaction/) tutorial.

```
function onKeyDown(event) {
	// Code executed when the user presses a key
}

function onMouseDrag(event) {
	if (Key.isDown('space')) {
		// Do something if the space bar is pressed
		// while dragging:
	}
}
```

The following example shows some keyboard interaction. Click on the canvas to get keyboard focus and steer with your arrow keys:

Source

## SVG Import and Export

Paper.js offers very convenient methods to import and export vector graphics as SVG. Even more advanced features such as gradients and clipping are supported.

The original SVG on the left, imported into a Paper.js canvas on the right:

Have fun with this interactive Voronoi example, click to add new cells, and once you like the result, press the *Download as SVG* button to download the result as an SVG file that you can open directly in Adobe Illustrator and other vector editing applications:

## Raster Images and Color Averaging

Place images in your project, work with the colors of their pixels or look at average colors of the pixels that fall within paths placed on top of them.

Source

Learn more about working with images in the [Images](https://paperjs.org/tutorials/images/) tutorial.
![](https://paperjs.org/features/mona.jpg)

## Symbols

Symbols allow you to place multiple instances of an item in your project. This can save memory, since all instances of a symbol simply refer to the original item and it can speed up moving around complex objects, since internal properties such as segment lists and gradient positions don't need to be updated with every transformation.

Source

## Selection Outlines

When you select items or path segment points & handles in your code, Paper.js draws the visual outlines of them on top of your project. This is very useful for debugging, as it allows you to see the construction of paths, position of path curves, individual segment points and bounding boxes of symbol and raster items:

Source

## Vector Geometry

Vector geometry is a first class citizen in Paper.js. It is a great advantage to understand its basic principles when learning to write scripts for it. After all, there is a reason for the word *Vector* in *Vector Graphics*.

While building [Scriptographer](http://scriptographer.org) we found vector geometry to be a powerful way of working with positions, movement and paths. Once understood, it proves to be a lot more intuitive and flexible than working with the x- and y- values of the coordinate system directly, as most other visually oriented programming environments do.

Read more about Vector Geometry in the [Vector Geometry](http://paperjs.org/tutorials/geometry/vector-geometry/) tutorial.

## Mathematical Operations

PaperScript allows you to write normal algebraic operators in connection with basic type objects. Points and Sizes can be added to, subtracted from, multiplied with or divided by numeric values or other points and sizes:

```
// Define a point to start with
var point1 = new Point(10, 20);

// Create a second point that is 4 times the first one.
// This is the same as creating a new point with x and y
// of point1 multiplied by 4:
var point2 = point1 * 4;
console.log(point2); // { x: 40, y: 80 }

// Now we calculate the difference between the two.
var point3 = point2 - point1;
console.log(point3); // { x: 30, y: 60 }
```

Read more about this in the [Mathematical Operations](http://paperjs.org/tutorials/geometry/mathematical-operations/) tutorial.

## Object Conversion

An important feature in Paper.js is its flexibility in parameter conversion when passing values to functions. In these situations, all basic types can alternatively be described as arrays or as plain JavaScript objects. Arrays are simply a listing of the default properties in their standard sequence. Some examples:

```
// Create a rectangle from a JS object description:
var rect = new Rectangle({ x: 10, y: 20, width: 100, height: 200 });
console.log(rect); // { x: 10, y: 20, width: 100, height: 200 }

// Define the size as an array containing [width, height]:
rect.size = [200, 300];
console.log(rect); // { x: 10, y: 20, width: 200, height: 300 }

// Change its point to a new one described by a JS object:
rect.point = { x: 20, y: 40 };
console.log(rect); // { x: 20, y: 40, width: 200, height: 300 }
```

Note that points are converted to sizes on the fly when required, and vice versa:

```
var rect = new Rectangle();
rect.point = { width: 100, height: 200 };
console.log(rect); // { x: 100, y: 200, width: 0, height: 0 }

rect.size = { x: 200, y: 400 };
console.log(rect); // { x: 100, y: 200, width: 200, height: 400 }
```
