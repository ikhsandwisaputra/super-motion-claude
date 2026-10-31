---
source: https://paperjs.org/tutorials/getting-started/working-with-paper-js
title: "Paper.js — Working with Paper.js"
fetched: 2026-10-28
---

# Working with Paper.js

Paper.js offers different approaches for its integration in the browser. The simplest way is to use PaperScript, our extension of JavaScript that facilitates a few things along the way. For more advanced users or bigger projects it might be preferable to work directly with JavaScript, as described in the tutorial about [Using JavaScript Directly](https://paperjs.org/tutorials/getting-started/using-javascript-directly/).

## What is PaperScript?

PaperScript is the plain old JavaScript that you are used to, with added support of mathematical operators (+ - \* / %) for [Point](https://paperjs.org/reference/point) and [Size](https://paperjs.org/reference/size) objects. PaperScript code is automatically executed in its own scope that without polluting with the global scope still has access to all the global browser objects and functions, such as document or window.

By default, the Paper.js library only exports one object into the global scope: the **paper** object. It contains all the classes and objects that the library defines. When working with PaperScript, the user does not need to care about this though, because inside PaperScript code, through the use of clever scoping, all of paper's objects and functions seem global.

PaperScript also offers automatic creation of [Project](https://paperjs.org/reference/project), [View](https://paperjs.org/reference/view) and mouse [Tool](https://paperjs.org/reference/tool) objects, and simplifies the installation of event handlers for these.

## Script Configuration

PaperScript code is loaded just like any other JavaScript using the <script> tag, except for the type being set to "text/paperscript" or "text/x-paperscript" . The code can either be an external file (src="URL"), or inlined:

```
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="js/paper.js"></script>
<!-- Define inlined PaperScript associate it with myCanvas -->
<script type="text/paperscript" canvas="myCanvas">
	// Create a Paper.js Path to draw a line into it:
	var path = new Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	var start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.lineTo(start + [ 100, -50 ]);
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

If we copy the inlined code to a file called *js/myScript.js* we can rewrite the above example to load the external file instead.

```
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="js/paper.js"></script>
<!-- Load external PaperScript and associate it with myCanvas -->
<script type="text/paperscript" src="js/myScript.js" canvas="myCanvas">
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

Depending on your installation method of paper.js, ES6 syntax might not work correctly. To fix this, you need to load a version of acorn.js that supports ES6 syntax:

```
<!DOCTYPE html>
<html>
<head>
<!-- Load the Paper.js library -->
<script type="text/javascript" src="js/paper.js"></script>
<!-- Override the acorn.js being used -->
<script src='https://cdnjs.cloudflare.com/ajax/libs/acorn/8.8.2/acorn.js'></script>
<!-- Define inlined PaperScript associate it with myCanvas -->
<script type="text/paperscript" canvas="myCanvas">
	// Create a Paper.js Path to draw a line into it:
	const path = new Path();
	// Give the stroke a color
	path.strokeColor = 'black';
	const start = new Point(100, 100);
	// Move to start and draw a line from there
	path.moveTo(start);
	// Note the plus operator on Point objects.
	// PaperScript does that for us, and much more!
	path.lineTo(start + [ 100, -50 ]);
</script>
</head>
<body>
	<canvas id="myCanvas" resize></canvas>
</body>
</html>
```

The above example fetches acorn.js from the internet. You may also install acorn.js locally and import it from a file.

These attributes are supported in PaperScript <script> tags:

**src="URL"**: The URL to load the PaperScript code from.

**canvas="ID"**: Links the PaperScript code to the canvas with the given ID and produces a [Project](https://paperjs.org/reference/project) and [View](https://paperjs.org/reference/view) object for it on the fly. For those concerned with validation, data-paper-canvas="ID" is supported too.

#### Please note:

When including more than one PaperScript in a page, each script will run in its own scope and will not see the objects and functions declared in the others. For PaperScript to communicate with other PaperScript or JavaScript code, see the tutorial about [PaperScript Interoperability](https://paperjs.org/tutorials/getting-started/paperscript-interoperability/).

## Canvas Configuration

Paper.js can be configured in a few different ways by adding attributes to the canvas tag:

**resize="true"**: Makes the canvas object as high and wide as the Browser window and resizes it whenever the user resizes the window. When the window is resized, the size of your [global.view](https://paperjs.org/reference/global#view) is also automatically adjusted. If validation is a concern, data-paper-resize="true" is supported too. You need to make sure to include the following CSS declarations for the automatic resizing to work correctly:

```
html,
body {
    height: 100%;
}

/* Scale canvas with resize attribute to full size */
canvas[resize] {
    width: 100%;
    height: 100%;
}
```

Your code can respond to any resizing of the window by creating a [onResize](https://paperjs.org/reference/view#onresize) function handler. For example, let's say you create a circle shaped path at the center of the view, and you want it to be centered after resizing:

```
// Create a circle shaped path with its center at the center
// of the view and a radius of 30:
var path = new Path.Circle({
	center: view.center,
	radius: 30,
	strokeColor: 'black'
});

function onResize(event) {
	// Whenever the window is resized, recenter the path:
	path.position = view.center;
}
```

**hidpi="off"**: By default, Paper.js renders into a hi-res Canvas on Hi-DPI (Retina) screens to match their native resolution, and handles all the additional transformations for you transparently. If this behavior is not desired, e.g. for lower memory footprint, or higher rendering performance, you can turn it off, by setting hidpi="off" in your canvas tag. For proper validation, data-paper-hidpi="off" works just as well.

**keepalive="true"**: To conserve battery power and CPU usage, Paper.js normally stops all animation events when the window is not focused. If you want it to keep playing animations, even if the window is in the background, set keepalive="true" in your canvas tag. And again for validation, data-paper-keepalive="true" works as well.
