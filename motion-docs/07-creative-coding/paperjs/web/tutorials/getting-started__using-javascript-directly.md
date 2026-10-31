---
source: https://paperjs.org/tutorials/getting-started/using-javascript-directly
title: "Paper.js — Using JavaScript Directly"
fetched: 2026-10-28
---

# Using JavaScript Directly

## Paper.js Architecture

In order to understand how to work with Paper.js directly from JavaScript, without the use of the PaperScript automatisms, we first need to explain a little about the architecture of Paper.js. When working with PaperScript, each script is run in its own scope, a [PaperScope](https://paperjs.org/reference/paperscope) object. The global [paper](https://paperjs.org/reference/global#paper) object through which the library is exposed is also such a [PaperScope](https://paperjs.org/reference/paperscope) object. It helps to think of these scopes as execution contexts.

Scopes were introduced as a way to have separate PaperScript contexts on a page with many examples, each having its own view and project, without seeing each other but still sharing the library code. They could be seen as sandboxed 'plugins' with shared code.

Each scope or context holds a row of objects that describe its state, such as a list of open [projects](https://paperjs.org/reference/paperscope#projects), a reference to the active [project](https://paperjs.org/reference/paperscope#project), a list of [views](https://paperjs.org/reference/paperscope#views) that each represent a canvas element, the currently active [view](https://paperjs.org/reference/paperscope#view), a list of mouse [tools](https://paperjs.org/reference/paperscope#tools), the currently active [tool](https://paperjs.org/reference/paperscope#tool), etc.

To explain the relation between scopes, projects, views and tools: Each scope can hold one or multiple projects, which are displayed through one or multiple views (each representing a Paper.js canvas). Views are not associated with a specific project, but in fact render all visible projects that have items within the visible area. Tools can work on any project within any view, as long as they belong to the same scope.

## Setting Up a Scope

When working with JavaScript directly, in most cases one scope will be all that is required. Within this scope, one can still work with multiple projects or views by creating them using the [new Project()](https://paperjs.org/reference/project#project) and [new View(canvas)](https://paperjs.org/reference/view#view-canvas) constructors.

The easiest way is to use the existing [paper](https://paperjs.org/reference/global#paper) object, and use its [paperScope.setup(canvas)](https://paperjs.org/reference/paperscope#setup-canvas) method to initialize an empty project and a view for us. We reuse the example from [Working with Paper.js](https://paperjs.org/tutorials/getting-started/working-with-paper-js/) in order to see what is additionally required when working from JavaScript directly:

```
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="js/paper.js"></script>
<!-- Define inlined JavaScript -->
<script type="text/javascript">
	// Only executed our code once the DOM is ready.
	window.onload = function() {
		// Get a reference to the canvas object
		var canvas = document.getElementById('myCanvas');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);
		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new paper.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
		// Draw the view now:
		paper.view.draw();
	}
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

So if we compare this example to the one written in PaperScript, we see a row of differences. In addition to the code from the previous example, we need to:

* Register a handler for when the DOM is ready, since we cannot work with the canvas before that.
* Tell the paper object to setup a Project and a View for our canvas. Instead of passing the canvas object, we can also pass the canvas element's ID as a String. In PaperScript, this happens automatically through the canvas="ID" attribute.
* Access all Paper.js classes and objects through the paper object, since they are no longer global.
* Use Math functions instead of operators on [Point](https://paperjs.org/reference/point) and [Size](https://paperjs.org/reference/size).
* Draw the view at the end, since that is now only automatically handled when a [view.onFrame](https://paperjs.org/reference/view#onframe) handler is installed.

#### Please note:

All the examples in tutorials and reference assume you are using PaperScript. If you work with JavaScript directly, you need to keep these differences in mind.

#### Please note:

In the code above we use window.onload = handler to get a callback for when the DOM is ready. If you are working with a framework such as jQuery, you can register for the DOM-Ready event using $(document).ready(handler), which fires before onload.

## Making the Scope Global

It might not seem so practical to access all classes and objects through the paper object, so here are two strategies for circumventing that.

The most straight forward approach is to copy over all fields from the paper object into the global scope. This could be done manually, which would work well as long as there is only one project, view and tool. But with multiples of these, the global references to the active ones ([project](https://paperjs.org/reference/paperscope#project), [view](https://paperjs.org/reference/paperscope#view) and [tool](https://paperjs.org/reference/paperscope#tool)) would not be kept up to date. Luckily there is a method for us that internally performs some JavaScript trickery so these references are kept in sync: [paper.install(window)](https://paperjs.org/reference/paperscope#install-scope). Equipped with this we can rewrite the code of the above example:

```
// Make the paper scope global, by injecting it into window:
paper.install(window);
window.onload = function() {
	// Setup directly from canvas id:
	paper.setup('myCanvas');
	var path = new Path();
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	path.moveTo(start);
	path.lineTo(start.add([ 200, -50 ]));
	view.draw();
}
```

If polluting the global scope is really not an option, the second strategy circumvents that by using the dreaded with() statement. This is one half of the trickery that Paper.js applies internally for scoping each PaperScript in its own PaperScope object:

```
window.onload = function() {
	paper.setup('myCanvas');
	with (paper) {
		var path = new Path();
		path.strokeColor = 'black';
		var start = new Point(100, 100);
		path.moveTo(start);
		path.lineTo(start.add([ 200, -50 ]));
		view.draw();
	}
}
```

## Installing Event Handlers

PaperScript recognises a couple of special event handlers when they are declared as global functions, while in JavaScript, these need to be manually installed on the appropriate object. Two such handlers are [onFrame](https://paperjs.org/reference/view#onframe) and [onResize](https://paperjs.org/reference/view#onresize), which both belong to the [View](https://paperjs.org/reference/view) class. view is automatically created for us if we use the [paperScope.setup(canvas)](https://paperjs.org/reference/paperscope#setup-canvas) function as in the examples above. So all we have to do is install these handlers on the existing [view](https://paperjs.org/reference/paperscope#view) object:

```
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/paper.js"></script>
<script type="text/javascript">
	paper.install(window);
	window.onload = function() {
		paper.setup('myCanvas');
		var path = new Path.Rectangle([75, 75], [100, 100]);
		path.strokeColor = 'black';

		view.onFrame = function(event) {
			// On each frame, rotate the path by 3 degrees:
			path.rotate(3);
		}
	}
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

#### Did you know?

You can read more about animations in the tutorial [Creating Animations](https://paperjs.org/tutorials/animation/creating-animations/).

## Working with Tools

Just like with the view handlers, PaperScript simplifies and hides the dealing with [Tool](https://paperjs.org/reference/tool) objects by making the tool handlers seem global and by creating a tool for us on the fly if any of these handlers are present: [onMouseDown](https://paperjs.org/reference/tool#onmousedown), [onMouseUp](https://paperjs.org/reference/tool#onmouseup), [onMouseDrag](https://paperjs.org/reference/tool#onmouseup), [onMouseMove](https://paperjs.org/reference/tool#onmouseup), etc.

In JavaScript we need to create the tool ourselves, and we need to manually install handlers on it. The advantage of this approach is that things are more transparent, and the handling of multiple tools will be less of a surprise.

```
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/paper.js"></script>
<script type="text/javascript">
	paper.install(window);
	window.onload = function() {
		paper.setup('myCanvas');
		// Create a simple drawing tool:
		var tool = new Tool();
		var path;

		// Define a mousedown and mousedrag handler
		tool.onMouseDown = function(event) {
			path = new Path();
			path.strokeColor = 'black';
			path.add(event.point);
		}

		tool.onMouseDrag = function(event) {
			path.add(event.point);
		}
	}
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

#### Did you know?

You can read more about mouse tools in the tutorial [Creating Mouse Tools](https://paperjs.org/tutorials/interaction/creating-mouse-tools/).

## Multiple Tools

The next example illustrates how easy it is to create multiple drawing tools and switch between them using some simple UI, in this case just two HTML links that activate one tool or the other:

```
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" src="js/paper.js"></script>
<script type="text/javascript">
	paper.install(window);
	// Keep global references to both tools, so the HTML
	// links below can access them.
	var tool1, tool2;

	window.onload = function() {
		paper.setup('myCanvas');

		// Create two drawing tools.
		// tool1 will draw straight lines,
		// tool2 will draw clouds.

		// Both share the mouseDown event:
		var path;
		function onMouseDown(event) {
			path = new Path();
			path.strokeColor = 'black';
			path.add(event.point);
		}

		tool1 = new Tool();
		tool1.onMouseDown = onMouseDown;

		tool1.onMouseDrag = function(event) {
			path.add(event.point);
		}

		tool2 = new Tool();
		tool2.minDistance = 20;
		tool2.onMouseDown = onMouseDown;

		tool2.onMouseDrag = function(event) {
			// Use the arcTo command to draw cloudy lines
			path.arcTo(event.point);
		}
	}
</script>
</head>
<body>
    <a href="#" onclick="tool1.activate();">Lines</a>
    <a href="#" onclick="tool2.activate();">Clouds</a>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```
