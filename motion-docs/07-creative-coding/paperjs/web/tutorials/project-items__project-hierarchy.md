---
source: https://paperjs.org/tutorials/project-items/project-hierarchy
title: "Paper.js — Project Hierarchy"
fetched: 2026-10-28
---

# Project Hierarchy

The structure of a Paper.js project is based on the same stacking order principle that graphic design applications such as Adobe Illustrator and Adobe Photoshop use.

In exactly the same way that these applications have a layer palette, Paper.js has a list of layers: [project.layers](https://paperjs.org/reference/project#layers). Whenever the view is redrawn, Paper.js runs through the items in these layers and draws them in order of appearance.

## Active Layer

Each Paper.js [Project](https://paperjs.org/reference/project) starts out with one [Layer](https://paperjs.org/reference/layer) which can be accessed through [project.activeLayer](https://paperjs.org/reference/project#activelayer). All newly created items are automatically added as a child of the layer which is currently active.

## Children

In programming we refer to items that are contained within other items as being their children. The children contained within a layer can be accessed through its [item.children](https://paperjs.org/reference/item#children) array.

To show how this works, in the following example we create two circle shaped paths and style them by accessing them through the [layer.children](https://paperjs.org/reference/layer#children) array of the [project.activeLayer](https://paperjs.org/reference/project#activelayer)

Source

## First Child and Last Child

Paper.js offers shortcuts to the first and last child of any item that contains children: [item.firstChild](https://paperjs.org/reference/item#firstchild) and [item.lastChild](https://paperjs.org/reference/item#lastchild). Using these, we could rewrite the example above in the following way:

Source

## Accessing Children By Name

If an item has a name, it can be accessed by name through its parent's children list:

Source

## Iterating Over Children

Since the children list of an item is an array, we can find out how many children it contains by querying its layer.children.length property and iterate over it using a for  loop:

Source

## Parents

You can find out which item an item is contained within by accessing its [item.parent](https://paperjs.org/reference/item#parent) property. The parent of a newly created item is always the currently active layer of the project, but is changed when the item is added as a child of another layer or group.

## Layers and Groups

You can think of [Layer](https://paperjs.org/reference/layer) and [Group](https://paperjs.org/reference/group) items as the folders in your hard drive. They group items together and any actions performed on them directly change the items that are are contained within them.

For example, changing a style property like [item.fillColor](https://paperjs.org/reference/item#fillcolor) on a layer or group will change that property on all of its children:

Source

In the same way that a folder can be contained within another folder, groups can be contained within other groups.

## Difference Between Layers & Groups

[Layer](https://paperjs.org/reference/layer) and [Group](https://paperjs.org/reference/group) items are almost the same. The main difference being that a layer item can be activated, meaning that any new items created are automatically placed within it. Whenever you create a new [Layer](https://paperjs.org/reference/layer), it becomes the [project.activeLayer](https://paperjs.org/reference/project#activelayer) of the project:

Source

![](https://paperjs.org/tutorials/project-items/project-hierarchy/Layers.gif)

The image on the left is an illustration of the structure of the project, if you would be looking at it in an application like Adobe Illustrator. There are two layers, the red path was created in the first layer and the green path was created in the second.

## Adding Children to Groups

When you create a group, it doesn't have any children yet. You can add children to groups in a few different ways.

The first way we will look at, is by passing an array of items to the [new Group(children)](https://paperjs.org/reference/group#group-children) constructor. The items passed to the constructor are placed in the group's [item.children](https://paperjs.org/reference/item#children) array:

Source

You can also add children to a group after it is created, using the [item.addChild(item)](https://paperjs.org/reference/item#addchild-item) function:

Source

To insert in a child into a group or layer at a specific index, you can use the [item.insertChild(index, item)](https://paperjs.org/reference/item#insertchild-index-item) function.

In the following example we create a red and a green circle. Since the green path was created after the red path, it covers the red circle. We move it to the start of the active layer's children array using [item.insertChild(index, item)](https://paperjs.org/reference/item#insertchild-index-item):

Source

## Inserting Children Relative to Other Items

We can also insert items above or below other items using [item.insertAbove(item)](https://paperjs.org/reference/item#insertabove-item) and [item.insertBelow(item)](https://paperjs.org/reference/item#insertbelow-item). We could rewrite the example above using [item.insertBelow(item)](https://paperjs.org/reference/item#insertbelow-item):

Source

## Removing Items and Children

To remove an item from your Paper.js document, you call its [item.remove()](https://paperjs.org/reference/item#remove) function. This doesn't destroy the item, it is only removed from the structure of the project and won't be drawn. You can add the item back to your project at any time.

If the item has children (i.e. it is a layer, group or other type of item that has children), all its children are also removed from the project.

As an example let's create a path and remove it straight away. When you execute the following code, nothing will appear in your document, since we remove the path right after creating it. When you click in the view, the item will be added back to the active layer of the document.

Source

To remove all children contained within an item, you can call [item.removeChildren()](https://paperjs.org/reference/item#removechildren). In the following example we create a path, and then add it to a group. Then we remove the children of the group. When you execute the following code, nothing will appear in your document, since the path has been removed.

Source
