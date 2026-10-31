---
source: https://paperjs.org/tutorials/interaction/creating-mouse-tools
title: "Paper.js — Creating Mouse Tools"
fetched: 2026-10-28
---

# Creating Mouse Tools

This tutorial explains the different ways to create Paper.js tools that the user can interact with by using the mouse.

## My First Mouse Tool

We start with an example of a very simple tool that creates an empty path on execution and adds segments to it whenever you click the mouse:

Source

## Mouse Handler Functions

Paper.js offers mouse handlers for the different actions you can perform with a mouse. You can use these mouse handlers to produce different types of tools that have different ways of reacting to mouse interaction and movement.

#### Please note:

In JavaScript, functions are blocks of code that are only executed when they are called from another part of the script. Handler functions are functions that are called by Paper.js when a certain event happens.

To see when the different handler functions are called, copy-paste the following code into a new JavaScript file, execute it and interact with the Paper.js tool:

```
function onMouseDown(event) {
	console.log('You pressed the mouse!');
}

function onMouseDrag(event) {
	console.log('You dragged the mouse!');
}

function onMouseUp(event) {
	console.log('You released the mouse!');
}
```

## The Event Object

The mouse handler functions receive an event object which contains information about the mouse event, such as the current position of the mouse ([event.point](https://paperjs.org/reference/toolevent#point)), the position where the mouse was pressed ([event.downPoint](https://paperjs.org/reference/toolevent#downpoint)) etc.

#### Did you know?

The properties of the event object are explained in detail in the [Mouse Tool Events](https://paperjs.org/tutorials/interaction/mouse-tool-events/) tutorial.

## Line Tool Example

Here is a simple tool that draws lines. The starting point of the line is where you click and the last point is where you release the mouse.

Click, drag and release below to try it out:

Source

#### Please note:

The difference between this tool and the first example is that a new path is created each time the mouse is clicked, and the path is finished when the mouse is released.

The same tool can be written more simply, by using only the [onMouseUp(event)](https://paperjs.org/reference/tool#onmouseup) handler, and accessing the [event.downPoint](https://paperjs.org/reference/toolevent#downpoint) property:

Click, drag and release below to try it out:

Source

When the mouse is released, the [onMouseUp(event)](https://paperjs.org/reference/tool#onmouseup) handler is called.

In the [onMouseUp](https://paperjs.org/reference/tool#onmouseup) handler we create a new path and give it a black stroke:

```
	var myPath = new Path();
	myPath.strokeColor = 'black';
```

Then we add two segments to it using the [path.add(segment)](https://paperjs.org/reference/path#add-segment) function.

First, we add a segment at [event.downPoint](https://paperjs.org/reference/toolevent#toolevent-downpoint), which is the position where the mouse button was pressed:

```
	myPath.add(event.downPoint);
```

Then, we add a segment at [event.point](https://paperjs.org/reference/toolevent#toolevent-point), which is the position where the mouse button was released:

```
	myPath.add(event.point);
```

## Click, Drag and Release Example

As a next step, we are going to make a small drawing tool:

When you click the mouse it will make a new [Path](https://paperjs.org/reference/path).
When you drag the mouse it will add segments to the path.
When you release the mouse it will add a circle shaped path at that position with a radius of 10.

Click and drag below to try it out:

Source

Now lets go through the script line by line to see whats happening:

To be able to access the myPath variable from both mouse handlers we declare it outside of the [onMouseDown](https://paperjs.org/reference/tool#onmousedown) and [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handlers:

```
var myPath;
```

In the [onMouseDown](https://paperjs.org/reference/tool#onmousedown) handler we create a new path and store it in the myPath variable:

```
function onMouseDown(event) {
	myPath = new Path();
}
```

In the [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handler we add [event.point](https://paperjs.org/reference/toolevent#point) (the position of the mouse) to myPath every time the user drags the mouse:

```
function onMouseDrag(event) {
	myPath.add(event.point);
	myPath.strokeColor = 'black';
}
```

In the [onMouseUp](https://paperjs.org/reference/tool#onmouseup) handler we create a circle shaped path with its center point at the position of the mouse when it was released and a radius of 10.

```
function onMouseUp(event) {
	var myCircle = new Path.Circle({
		center: event.point,
		radius: 10
	});
	myCircle.strokeColor = 'black';
	myCircle.fillColor = 'white';
}
```

## Using the Distance that the Mouse has Moved

Another handy property in the event object is [event.delta](https://paperjs.org/reference/toolevent#delta) which describes the difference between the current position and the last position of the mouse when the event was fired. So in an [onMouseUp](https://paperjs.org/reference/tool#onmouseup) handler, [event.delta](https://paperjs.org/reference/toolevent#delta) would describe the difference between the position where the mouse was clicked and the position where the mouse was released.

For example, if we would want to make a tool that creates circles through mouse interaction, we could write something like:

Source

This small script creates a circular path whenever you click, drag and release. It uses the position where the mouse was clicked ([event.downPoint](https://paperjs.org/reference/toolevent#downpoint)) for the center point of the circle, and the distance between the down point and the position where the mouse was released (the [length](https://paperjs.org/reference/point#length) of [event.delta](https://paperjs.org/reference/toolevent#delta)) for its radius.

## Minimum Distance

Normally while dragging, the [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handler is called, no matter how far the mouse has dragged. We can set the minimum distance the mouse has to drag before firing the [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) event by setting the [tool.minDistance](https://paperjs.org/reference/tool#mindistance) property.

For example, in the following tool script the onMouseDrag function is only called when the mouse has moved more than 20 points.

So when you click and drag in the following example, you will see that the radius of the circles is always 20pt or higher.

Source

## Maximum Distance

We can also set the maximum distance until the firing of the next [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) event by setting the [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance) property. This will repeatedly fire the [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) event until the distance between the event point and the mouse is less than [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance).

In the following code we set [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance) to be 10 pt. Therefore, if the user were to drag the mouse by 50 pt, it would call the [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handler 5 times.

When you click and drag in the following example, you will see that when you drag fast enough the radiuses of the circles max out at 5pt. When you drag slower, the circles will be smaller.

Source

## Fixed Distance Drag Events

To set both the minimum and maximum distances we can set the [tool.fixedDistance](https://paperjs.org/reference/tool#fixeddistance) property. Then [onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) events are fired with intervals of fixed distances.

The following example creates circle shaped paths while you drag. By setting [tool.fixedDistance](https://paperjs.org/reference/tool#fixeddistance) to 30, the circles are created at strict 30pt intervals.

Click and drag below to try it out:

Source
