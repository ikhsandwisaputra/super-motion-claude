---
source: https://rive.app/docs/editor/interface-overview/hierarchy
title: "Hierarchy"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Hierarchy

View, organize, and reorder objects in your file.

[YouTube video player](https://www.youtube.com/embed/FnnZV57Dp3c)

The Hierarchy is a tree view that shows the objects on the stage. It shows both how objects are nested and the order in which they are rendered.

## Renaming items

You can rename items in the Hierarchy to make your file easier to understand and navigate.

To rename an item, double-click its name in the Hierarchy, enter a new name, then press Enter.

## Parent-child relationships

Each row in the Hierarchy represents an item on the stage. Items with children have a button with an arrow next to them. Use this button to expand or collapse the list of children.

<video />

Any object can be a parent or child of another object. When an object is nested under another object, it inherits the transformations of its parent.

For example, scaling a parent object also scales its children. Parent transformations are applied from the parent’s origin, not the child’s local origin.

<video />

You can nest objects as deeply as needed, creating children, grandchildren, great-grandchildren, and so on.

To change the relationship between objects, drag an item onto another item to make it a child. Drag it out of the parent to remove the relationship.

<video />

## Draw Order

The Hierarchy also controls draw order. Objects higher in the Hierarchy render above objects lower in the Hierarchy.

> [!NOTE]
>
> You can override the default draw order with [custom draw order](/docs/editor/animate-mode/animating-draw-order).

To change draw order, drag objects up or down in the Hierarchy.

![Change hierarchy order](https://mintcdn.com/rive/AIQGzcAFaDnsx1_Y/images/editor/interface/hierarchy-reorder.gif?s=c15c4d931daf9037561b9e8f91c52df1)

## Lock, isolate, and hide items

When you hover over an item in the Hierarchy, controls appear for locking, isolating, or hiding that item.

* **Lock** prevents the item from being selected or edited on the stage.
* **Isolate** focuses on the item by temporarily hiding other items from view.
* **Hide** temporarily hides the item.

These controls also apply to any children nested under the item.

> [!NOTE]
>
> Lock and isolate are editor workflow tools. They do not change the exported file or runtime behavior.

## Context menu

Right-click an item in the Hierarchy to open additional options. Depending on the selected item, options may include:

![Hierarchy context menu](https://mintcdn.com/rive/tQ1k3dspHfLhjt1C/images/interface/hierarchy-right-click.png?fit=max\&auto=format\&n=tQ1k3dspHfLhjt1C\&q=85\&s=245c4ed28323a6ae998fc8e865b5b932)

* Copy, cut, paste, delete, copy styles, and paste styles
* Expand or collapse nested items
* Show dependencies
* Lock, hide, or isolate elements
* Add a [tag](/docs/editor/tagging)
* Reverse the order of elements
* [Export name](/docs/editor/exporting/exporting-names)

Many of these options are also covered in more detail on related pages.
