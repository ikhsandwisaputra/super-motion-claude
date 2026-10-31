---
source: https://paperjs.org/tutorials/animation/creating-animations
title: "Paper.js — Creating Animations"
fetched: 2026-10-28
---

# Creating Animations

To create animations in Paper.js, we use the [onFrame](https://paperjs.org/reference/global#onframe) handler. When this function is defined, it is called up to 60 times a second by Paper.js. The view is redrawn automatically after the onFrame function has been executed.

```
function onFrame(event) {
	// Your animation code goes in here
}
```

## The Event Object

The [onFrame](https://paperjs.org/reference/global#onframe) handler function receives an event object which contains information about the event:

**event.count**: the number of times the frame event was fired.
**event.time**: the total amount of time passed since the first frame event in seconds.
**event.delta**: the time passed in seconds since the last frame event.

```
function onFrame(event) {
	// the number of times the frame event was fired:
	console.log(event.count);

	// The total amount of time passed since
	// the first frame event in seconds:
	console.log(event.time);

	// The time passed in seconds since the last frame event:
	console.log(event.delta);
}
```

## Examples

The following are a number of examples that make use of the onFrame handler to create animations.

## Rotating an Item

In the following example, a rectangle shaped path is created on execution and each frame it is rotated by 3 degrees:

Source

## Animating Colors

The following script creates a circle shaped path item with a red fill color. Then, each frame it slightly changes the hue of the color:

Source

## Moving an Item

The following script creates a text item and moves it smoothly to a random destination point in the view. When the text item comes near the position, another random destination point is created. The contents of the text item is the distance between its current position and that of the destination point.

Source

## Moving Multiple Items

The following example shows a star field like animation. The speed that the circles move depends on their width. When a star leaves the view, it is moved back to left of the view.

Source

## Animating Path Segments

The following script creates a path and then changes the position of its segment points in the onFrame handler:

Source
