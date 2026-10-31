---
source: https://paperjs.org/tutorials/paths/using-color-and-style
title: "Paper.js — Using Color and Style"
fetched: 2026-10-28
---

# Using Color and Style

In the following tutorial we will be looking at the different ways to go about styling items in your project.

## Example Path

For the examples in this tutorial we will be using a checkmark shaped path which we create using the following code:

Source

#### Please note:

To find out how to create paths with Paper.js, please read the [Working with Path Items](https://paperjs.org/tutorials/paths/working-with-path-items/) tutorial.

## Stroke Color

To add a stroke to our path, we need to set its [strokeColor](https://paperjs.org/reference/item#strokecolor) property.

The following example shows how to set the stroke color of the path we created earlier to the color red, using a hexidecimal string (Also known from HTML CSS Styles):

Source

The hexadecimal color code is automatically converted to a [Color](https://paperjs.org/reference/color) object.

The color can also be set using an [Color](https://paperjs.org/reference/color) object directly. In the following code we set an RGB color with 50% red, 0% green and 50% blue:

Source

#### Please note:

In Paper.js color component values range from 0 to 1.

## Fill Color

Fill color works exactly the same way as stroke color. In the following example we will create a path with a red fill color:

Source

## Stroke Width

To change the stroke width of an item, you can change its [strokeWidth](https://paperjs.org/reference/item#strokewidth) property.

In the following example we give the path a red stroke of 10 pt:

Source

## Stroke Cap

To change the shape of the start and the end of a path, you can change its [strokeCap](https://paperjs.org/reference/item#strokecap) property to either 'round', 'square' or 'butt':

Source

## Stroke Join

To change the shape of the corners in a path, you can change its [strokeJoin](https://paperjs.org/reference/item#strokejoin) property to either 'miter', 'round' or 'bevel':

Source

## Dashed Stroke

To create a dashed stroke, you can change the [dashArray](https://paperjs.org/reference/item#dasharray) property of an item. The following code produces a dashed stroke with a 10pt dash and a 12pt gap:

Source

## The Style Object

Every item also has an [item.style](https://paperjs.org/reference/item#style) property which is an object containing only style properties.

We can use this to copy the style properties of one item to another. The following example first creates a circle shaped path and assigns it a stroke color. Then another circle shaped path is created and we assign it the style of the first path:

Source

The [item.style](https://paperjs.org/reference/item#style) property also comes in handy for setting multiple style properties in one go.

In the following example we create an object containing a number of style properties and pass it to the item's style property to set them all in one go:

Source

## Removing Styles

To remove any kind of path style, just pass null to the property:

```
var path = new Path.Circle({
	center: new Point(50, 50),
	radius: 50
});
path.fillColor = 'red';

// Set the fillColor to null to remove it:
path.fillColor = null;
```

To remove all style settings from a path, pass null to its style property:

```
var path = new Path.Circle({
	center: [50, 50],
	radius: 50
});
path.style = null;
```

## Working with the Current Style of the Project

As I mentioned earlier, all newly created items automatically receive the currently active path style properties as defined in the Illustrator interface. We can also change these through code by using [currentStyle](https://paperjs.org/reference/project/currentstyle).

[currentStyle](https://paperjs.org/reference/project/currentstyle) is the [Style](https://paperjs.org/reference/style) object of the project and contains the currently active style properties such as fillColor and strokeColor.

The following example changes the current style of the project, then creates a path which inherits that style. Then it changes the strokeWidth and fillColor and creates another path.

Source
