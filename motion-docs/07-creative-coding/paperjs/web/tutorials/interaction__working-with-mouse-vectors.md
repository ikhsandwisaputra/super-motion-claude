---
source: https://paperjs.org/tutorials/interaction/working-with-mouse-vectors
title: "Paper.js — Working with Mouse Vectors"
fetched: 2026-10-28
---

# Working with Mouse Vectors

In this tutorial we will make a mouse tool that acts like a brush, with a variable thickness depending on speed and a sense of a natural expression.

Click and drag below to try it out:

Source

## Drawing a Line while Dragging

We'll start by making a simple mouse tool that creates a new path when you click in the view and then adds segments to it when you drag the mouse:

Click and drag below to try it out:

Source

When you initialize and interact with the tool, it does the following:

When you initialize the tool:

* It sets the minimum amount of distance that the mouse has to move while dragging to fire the [onMouseDrag(event)](https://paperjs.org/reference/tool#onmousedrag-event) handler to 15 pt, by setting the value of [tool.minDistance](https://paperjs.org/reference/tool#mindistance).
* It initializes the path variable, so we can access it in the [onMouseDown(event)](https://paperjs.org/reference/tool#onmousedown-event) and [onMouseDrag(event)](https://paperjs.org/reference/tool#onmousedrag-event) handler functions.

When you press the mousebutton:

* It creates a [new Path()](https://paperjs.org/reference/path#path)
* It changes the [path.strokeColor](https://paperjs.org/reference/path#strokecolor) of the path

When you then move the mouse and drag:

* It adds a new segment to the path by passing [event.point](https://paperjs.org/reference/toolevent#point) (the mouse position) to the [path.add(segment)](https://paperjs.org/reference/path#add-segment) function.

```
// The minimum distance the mouse has to drag
// before firing the next onMouseDrag event:
tool.minDistance = 10;

var path;

function onMouseDown(event) {
	// Create a new path and select it:
	path = new Path();
	path.strokeColor = '#00000';

	// Add a segment to the path where
	// you clicked:
	path.add(event.point);
}

function onMouseDrag(event) {
	// Every drag event, add a segment
	// to the path at the position of the mouse:
	path.add(event.point);
}
```

## Using the Speed of the Mouse

As you can see in when working with the first example script: When the mouse is moved fast the points are further apart than when you move the mouse slowly.

![](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/mouse_vectors.gif)

Thus, the difference in position between these points describe the amount that the mouse moved and therefore also its speed.

In the [Points and Vectors](https://paperjs.org/tutorials/geometry/vector-geometry/#points-and-vectors) chapter of the Vector Geometry tutorial, we introduced the notion of a vector; an amount of distance to move in a certain direction.

You could say that all these little drag movements are vectors. The mouse handler [event](https://paperjs.org/reference/toolevent) object includes a reference to the mouse movement vector, so we don't have to calculate it ourselves and can easily use it in our tools: [event.delta](https://paperjs.org/reference/toolevent#delta)

![](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/Event-Properties.gif)

The image on the left is a zoom of the top of the image above.

+ [event.point](https://paperjs.org/reference/toolevent#point) is the position of the mouse
+ [event.delta](https://paperjs.org/reference/toolevent#delta) is the vector of the mouse drag event; the distance and direction from the last mouse drag event

#### Please note:

The [Creating Mouse Tools](https://paperjs.org/tutorials/interaction/creating-mouse-tools/) tutorial explains the different ways to create Paper.js tools that the user can interact with by using the mouse. Mouse Tool Events are explained in detail in the [Mouse Tool Events](https://paperjs.org/tutorials/interaction/mouse-tool-events/) tutorial.

## Using event.delta

Next we will change our earlier script to express the speed of the mouse while drawing by drawing a skeleton around our path. The skeleton lines become larger when the mouse moves faster and smaller when the mouse moves slowly.

Click and drag below to try it out:

Source

![](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/Middlepoint.gif)

As you can see in the movie above, the skeleton lines don't start at the position of the mouse, but in the middle between the current position and the last position of the mouse.

The mouse handler [event](https://paperjs.org/reference/toolevent) object includes a reference to this middle point, to save us from calculating ourselves: [event.middlePoint](https://paperjs.org/reference/toolevent#middlepoint)

![](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/Rotating-Delta.gif)

We take [event.delta](https://paperjs.org/reference/toolevent#delta) (the vector in the direction of the mouse) and rotate it by 90 degrees. This means that the vector which was previously pointing in the direction of the mouse, is now pointing 90 degrees away from the direction of the mouse.

![](https://paperjs.org/tutorials/interaction/working-with-mouse-vectors/Middle-Point-Plus-Step.gif)

When we add the rotated delta vector to an absolute point ([event.middlePoint](https://paperjs.org/reference/toolevent#middlepoint) in this case) we get back the position offset by the direction and length of the vector.

Here is our updated tool script that now also creates the skeleton paths. The new lines of code are highlighted:

```
tool.minDistance = 10;

var path;

function onMouseDown(event) {
	path = new Path();
	path.strokeColor = '#00000';

	path.add(event.point);
}

function onMouseDrag(event) {
	path.add(event.point);

	var step = event.delta;
	step.angle += 90;

	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;

	var line = new Path();
	line.strokeColor = '#000000';
	line.add(top);
	line.add(bottom);
}
```

Lets look at the code that was added to create the skeleton paths:

First we create a variable called step and reference [event.delta](https://paperjs.org/reference/toolevent#delta) (the vector of the mouse movement) in it. We rotate this vector by 90 degrees by adding 90 to the [point.angle](https://paperjs.org/reference/point#angle) of step:

```
var step = event.delta;
step.angle += 90;
```

Then we find the two positions of our skeleton path by adding and subtracting our rotated vector to [event.middlePoint](https://paperjs.org/reference/toolevent#middlepoint). Even though we call these two positions top and bottom, the position of these points depends on the direction of the mouse. We just name them this way, so we can have a mental picture of where they are in relation to each other:

```
var top = event.middlePoint + step;
var bottom = event.middlePoint - step;
```

Next we create a new path, change its stroke color and add the top and bottom points to it:

```
var line = new Path();
line.strokeColor = '#000000';
line.add(top);
line.add(bottom);
```

## Using the Skeleton Points to Make a Body around our Line

Next we will make another path which we add the skeleton points to each time the [tool.onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handler function is called.

Source

Here is our updated code, with the new lines of code highlighted:

```
tool.minDistance = 10;
tool.maxDistance = 45;

var path;

function onMouseDown(event) {
	path = new Path();
	path.strokeColor = '#00000';
	path.selected = true;

	path.add(event.point);
}

function onMouseDrag(event) {
	var step = event.delta;
	step.angle += 90;

	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;

	var line = new Path();
	line.strokeColor = '#000000';
	line.add(top);
	line.add(bottom);

	path.add(top);
	path.insert(0, bottom);
}
```

Now lets look at the code that has changed since the last version:

By setting [tool.maxDistance](https://paperjs.org/reference/tool#maxdistance) to 45, the onMouseDrag event handler will be called repeatedly until the distance between the event point and the mouse is less than 45:

```
tool.maxDistance = 45;
```

As you can see in the movie above, we are no longer drawing the line that follows our mouse by adding [toolEvent.point](https://paperjs.org/reference/toolevent#point) to the path variable. Instead we add the top and bottom points to it. Since we want to be able to fill the path with a color, we need to add the top point to the end of the path and the bottom point to the beginning of the path. To add a point to the start of a path, we use [path.insert(index, segment)](https://paperjs.org/reference/path#insert-index-segment) and pass it 0 for the index:

```
path.add(top);
path.insert(0, bottom);
```

## Smoothing and Coloring the Body

Now we will smooth the path and fill it with a random color.

Click and drag below to try it out:

Source

Here is the updated script, with the new lines of code highlighted:

```
tool.minDistance = 10;
tool.maxDistance = 45;

var path;

function onMouseDown(event) {
	path = new Path();
	path.fillColor = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};

	path.add(event.point);
}

function onMouseDrag(event) {
	var step = event.delta / 2;
	step.angle += 90;

	var top = event.middlePoint + step;
	var bottom = event.middlePoint - step;

	path.add(top);
	path.insert(0, bottom);
	path.smooth();
}

function onMouseUp(event) {
	path.add(event.point);
	path.closed = true;
	path.smooth();
}
```

After creating the path in the onMouseDown event handler function, we fill it with a color by changing it's [path.fillColor](https://paperjs.org/reference/path#fillcolor) property. To have a different color each time, we create an HSB (Hue, Saturation, Brightness) color with a hue varying between 0 and 360:

```
path.fillColor = {
	hue: Math.random() * 360,
	saturation: 1,
	brightness: 1
};
```

To smooth the path, we call [path.smooth()](https://paperjs.org/reference/path#smooth) every time we add one or more points to the path.

#### Please note:

You can find out more about the [path.smooth()](https://paperjs.org/reference/path#smooth) function in the [Smoothing Paths](https://paperjs.org/tutorials/paths/smoothing-simplifying-flattening/#smoothing-paths) section of the [Smoothing, Simplifying & Flattening](https://paperjs.org/tutorials/paths/smoothing-simplifying-flattening/) tutorial.

We smooth our path in the onMouseDrag event handler function:

```
	path.smooth();
```

And also in the onMouseUp function:

```
	path.smooth();
```

## Adding Brush Stroke Ends

Source

```
tool.fixedDistance = 30;

var path;
var strokeEnds = 6;

function onMouseDown(event) {
	path = new Path();
	path.fillColor = {
		hue: Math.random() * 360,
		saturation: 1,
		brightness: 1
	};
}

var lastPoint;
function onMouseDrag(event) {
	// If this is the first drag event,
	// add the strokes at the start:
	if(event.count == 0) {
		addStrokes(event.middlePoint, event.delta * -1);
	} else {
		var step = event.delta / 2;
		step.angle += 90;

		var top = event.middlePoint + step;
		var bottom = event.middlePoint - step;

		path.add(top);
		path.insert(0, bottom);
	}
	path.smooth();

	lastPoint = event.middlePoint;
}

function onMouseUp(event) {
	var delta = event.point - lastPoint;
	delta.length = tool.maxDistance;
	addStrokes(event.point, delta);
	path.closed = true;
	path.smooth();
}

function addStrokes(point, delta) {
	var step = delta.rotate(90);
	var strokePoints = strokeEnds * 2 + 1;
	point -= step / 2;
	step /= strokePoints - 1;
	for(var i = 0; i < strokePoints; i++) {
		var strokePoint = point + step * i;
		var offset = delta * (Math.random() * 0.3 + 0.1);
		if(i % 2) {
			offset *= -1;
		}
		strokePoint += offset;
		path.insert(0, strokePoint);
	}
}
```
