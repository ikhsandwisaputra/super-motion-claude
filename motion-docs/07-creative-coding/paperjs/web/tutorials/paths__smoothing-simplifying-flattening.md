---
source: https://paperjs.org/tutorials/paths/smoothing-simplifying-flattening
title: "Paper.js — Smoothing, Simplifying & Flattening"
fetched: 2026-10-28
---

# Smoothing, Simplifying & Flattening

Paper.js offers two different ways to smooth a path.

[path.smooth()](https://paperjs.org/reference/path#smooth) smooths a path by changing its segment handles without adding or removing segment points.

[path.simplify()](https://paperjs.org/reference/path#simplify) smooths a path by analyzing its [path.segments](https://paperjs.org/reference/path#segments) array and replacing it with a more optimal set of segments, reducing memory usage and speeding up drawing.

## Smoothing Paths

Paper.js allows you to automatically smooth paths using the [path.smooth()](https://paperjs.org/reference/path#smooth) function. This function calculates the optimal values for the handles of the path's segment points to create curves that flow smoothly through them. The segments are not moved and the current handle settings of the path's segments are ignored.

In the following example, we create a rectangle shaped path, create a copy of it and smooth the copy. As you can see, only the handle positions are changed. The segment points remain unchanged.

Source

Click and drag in the view below to draw a line, when you release the mouse, the path is smoothed using [path.smooth()](https://paperjs.org/reference/path#smooth):

Source

## Simplifying Paths

[path.simplify()](https://paperjs.org/reference/path#simplify) smooths a path by simplifying it. The path.segments array is analyzed and replaced by a more optimal set of segments, reducing memory usage and speeding up drawing.

Source

The [path.simplify()](https://paperjs.org/reference/path#simplify) function has an optional tolerance parameter, which specifies the maximum distance the simplifying algorithm is allowed to deviate from the original path. This value is set to 2.5 by default. Setting it to a lower value, produces a more correct path but with more segment points. Setting it to a higher value leads to a smoother curve and less segment points, but the shape of the path will be more different than the original.

## Flattening Paths

[path.flatten(error)](https://paperjs.org/reference/path#flatten-error) converts the curves in a path to straight lines with a maximum specified error. The resulting lines are guaranteed to not be further away than the amount specified by the error parameter.

In the following example, we create a circle shaped path and straighten it using [path.flatten(20)](https://paperjs.org/reference/path#flatten-error):

Source
