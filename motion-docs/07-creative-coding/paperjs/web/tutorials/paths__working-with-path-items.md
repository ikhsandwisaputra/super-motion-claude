---
source: https://paperjs.org/tutorials/paths/working-with-path-items
title: "Paper.js — Working with Path Items"
fetched: 2026-10-28
---

# Working with Path Items

In this tutorial we are going to look at paths and the different ways to create and modify them in Paper.js projects.

## The Anatomy of Path Items

In Paper.js, paths are represented by a sequence of segments that are connected by curves. A segment consists of a [point](https://paperjs.org/reference/segment#point) and two handles, defining the location and direction of the curves.

Source

## Adding and Inserting Segments

In order to start with paths here, we will use segments that do not define handles for now and therefore are connected by lines instead of curves.

Lets create a new path item by using the [new Path()](https://paperjs.org/reference/path#path) constructor and add segments to it using the [path.add(segment)](https://paperjs.org/reference/path#add-segment) function:

Source

The add function also supports multiple arguments, which allows you to insert multiple segments in one go:

Source

To insert segments in relation to already existing segments, you can use the [path.insert(index, segment)](https://paperjs.org/reference/path#insert-index-segment) function:

Source

#### Please note:

The [Point](https://paperjs.org/reference/point) object represents a point in the two dimensional space of the Paper.js project. It does not refer to an anchor point in a path. When a [Point](https://paperjs.org/reference/point) is passed to a function like add or insert it is converted to a [Segment](https://paperjs.org/reference/segment) on the fly. To find out more about the [Point](https://paperjs.org/reference/point) object, please read the [Point, Size and Rectangle](https://paperjs.org/tutorials/geometry/point-size-and-rectangle/) tutorial.

## Smoothing Paths

Paper.js allows you to automatically smooth paths using the [path.smooth()](https://paperjs.org/reference/path#smooth) function. This function calculates the optimal values for the handles of the path's segment points to create curves that flow smoothly through them. The segments are not moved and the current handle settings of the path's segments are ignored.

In the following example, we create a rectangle shaped path, create a copy of it and smooth the copy:

Source

## Closing Paths

By default paths created through the [new Path()](https://paperjs.org/reference/path#path) constructor are open:

Source

To close the path we set its [path.closed](https://paperjs.org/reference/path#closed) property to true. Paper.js will then connect the first and last segments of the path:

Source

## Removing Segments and Paths

To remove a segment from a path, we use the [path.removeSegment(index)](https://paperjs.org/reference/path#removesegment-index) function and pass it the index of the segment we want to remove.

#### Please note:

If you don't know yet how to create paths of predefined shapes, please read the the [Creating Predefined Shapes](https://paperjs.org/tutorials/paths/creating-predefined-shapes/) tutorial.

First, lets create a circle shaped path and inspect its segments:

Source

As you can see, the path has 4 segments.

Now, lets remove the first segment of the path after creating it:

Source

#### Did you know?

In Javascript and most other programming languages we always start counting at zero when we refer to the index of an item in a list. Number zero is the first item, number one is the second item etc.

To remove an item completely from the project, we use [item.remove()](https://paperjs.org/reference/item#remove):

```
var myCircle = new Path.Circle(new Point(100, 100), 50);
myCircle.fillColor = 'black';

myCircle.remove();
```
