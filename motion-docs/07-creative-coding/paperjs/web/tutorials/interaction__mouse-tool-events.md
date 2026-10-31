---
source: https://paperjs.org/tutorials/interaction/mouse-tool-events
title: "Paper.js — Mouse Tool Events"
fetched: 2026-10-28
---

# Mouse Tool Events

The mouse handler functions receive an event object which contains information about the mouse event. In this tutorial we will go through the different properties that it contains.

#### Please note:

We advise you to read the [Creating Mouse Tools](https://paperjs.org/tutorials/interaction/creating-mouse-tools/) first, if you haven't done so yet.

## Mouse Position

The [event](https://paperjs.org/reference/toolevent) object contains several properties that describe the position of the mouse and how it has moved:

[event.point](https://paperjs.org/reference/toolevent#point) describes the position of the mouse when the event was fired.

For example, if we would want to create a tool that draws a line between the position when the mouse was pressed and the position when it was released:

```
var path;
function onMouseDown(event) {
	// Create a path:
	path = new Path();
	path.strokeColor = 'black';
	// Add the mouse down position:
	path.add(event.point);
}

function onMouseUp(event) {
	// Add the mouse up position:
	path.add(event.point);
}
```

Try it out by clicking, dragging and releasing in the following example:

Source

[event.downPoint](https://paperjs.org/reference/toolevent#point) describes the position of the mouse when the mouse button was last clicked. We could use it to simplify the example above:

```
function onMouseUp(event) {
	// Create a path:
	var path = new Path();

	// Add the mouse down position:
	path.add(event.downPoint);

	// Add the mouse up position:
	path.add(event.point);
}
```

[event.lastPoint](https://paperjs.org/reference/toolevent#lastpoint) describes the position of the mouse when the previous mouse event was fired.

[event.middlePoint](https://paperjs.org/reference/toolevent#lastpoint) describes the point in the middle between event.lastPoint and event.point. This is a useful position to use when creating artwork based on the moving direction of the mouse, as returned by event.delta.

[event.delta](https://paperjs.org/reference/toolevent#delta) describes the vector between the current position and the last position of the mouse when the event was fired. In case of the mouse-up event, the vector to the mouse-down position is returned.

#### Please note:

You can read more about vectors in the [Vector Geometry](https://paperjs.org/tutorials/geometry/vector-geometry/) tutorial.

```
// The mouse has to be moved at least 10 pt
// before the next onMouseDrag event is called:
tool.minDistance = 10;

function onMouseDrag(event) {
	var path = new Path();
	path.strokeColor = 'black';
	var vector = event.delta;

	// rotate the vector by 90 degrees:
	vector.angle += 90;

	// change its length to 5 pt:
	vector.length = 5;

	path.add(event.middlePoint + vector);
	path.add(event.middlePoint - vector);
}
```

Try it out by clicking, dragging and releasing in the following example:

Source

The following example creates circles while you drag the mouse. Their size depends on the [point.length](https://paperjs.org/reference/point#length) of [event.delta](https://paperjs.org/reference/toolevent#delta) and therefore they all connect:

```
function onMouseDrag(event) {
	var radius = event.delta.length / 2;
	var circle = new Path.Circle(event.middlePoint, radius);
	circle.fillColor = 'black';
}
```

Source

## Counting Mouse Events

[event.count](https://paperjs.org/reference/toolevent#count) describes the amount of times the related mouse handler was fired.

```
function onMouseDown(event) {
	// The amount of times the mouse has been pressed:
	console.log(event.count);
}

function onMouseDrag(event) {
	// The amount of drag events fired since the mouse
	// was pressed:
	console.log(event.count);
}

function onMouseUp(event) {
	// The amount of times the mouse has been released:
	console.log(event.count);
}
```
