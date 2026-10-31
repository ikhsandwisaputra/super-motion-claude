---
source: https://paperjs.org/tutorials/project-items/working-with-items
title: "Paper.js — Working with Items"
fetched: 2026-10-28
---

# Working with Items

Before we start, let's define what we mean when we talk about items. An item is anything that can appear within in your Paper.js project: [layers](https://paperjs.org/reference/layer), [paths](https://paperjs.org/reference/path), [compound-paths](https://paperjs.org/reference/compoundpath), [groups](https://paperjs.org/reference/group), [text items](https://paperjs.org/reference/pointtext), [rasters](https://paperjs.org/reference/raster) etc.

Every kind of item has specific behaviours: a path contains points, a layer can be active, groups and compound paths have children.

But since they are all items, they also share a number of behaviours. All these shared behaviours can be found in the [Item](https://paperjs.org/reference/item) reference.

## Creating New Items

When you create new items, they are automatically added to the end of the [item.children](https://paperjs.org/reference/item#children) list of the [project.activeLayer](https://paperjs.org/reference/project#activelayer).

In the next example, we create a path and then set its fill color by accessing it through the [item.lastChild](https://paperjs.org/reference/item#lastchild) property of the [project.activeLayer](https://paperjs.org/reference/project#activelayer):

Source

## Hiding Items

When you set [item.visible](https://paperjs.org/reference/item#visible) to false, the item will be hidden and won't be drawn.

For example let's create a path and hide it. When you execute the following code, you won't see the item:

Source

## Duplicating Items

To make a copy of an item, you call its [item.clone()](https://paperjs.org/reference/item#clone) function. The [item.clone()](https://paperjs.org/reference/item#clone) function returns the cloned item, so we need to store it in a variable if we want to do something with the copy.

The following example create a circle shaped path, clones it and then changes a couple of properties of the clone.

Source

## Selecting Items

When you select items or path segment points & handles in your code, Paper.js draws the visual outlines of them on top of your project. This is very useful for debugging, as it allows you to see the construction of paths, position of path curves, individual segment points and bounding boxes of symbol and raster items:

Source

## Blend Mode & Opacity

To make an item transparent, set its [item.opacity](https://paperjs.org/reference/item#opacity) property to a value between 0 and 1:

Source

To change the blend mode of an item we pass a string to its [item.blendMode](https://paperjs.org/reference/item#blendmode) property:

Source

Visit the [item.blendMode](https://paperjs.org/reference/item#blendmode) reference to see the different supported blend modes.
