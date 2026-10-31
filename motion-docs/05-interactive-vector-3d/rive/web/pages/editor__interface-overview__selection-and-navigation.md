---
source: https://rive.app/docs/editor/interface-overview/selection-and-navigation
title: "Selection and Navigation"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Selection and Navigation

Select objects, move through nested groups, and navigate the stage.

Use selection and navigation controls to choose objects, move through nested groups, and move around the stage.

> [!TIP]
>
> For a complete list of shortcuts, see [Keyboard Shortcuts](/docs/editor/keyboard-shortcuts).

## Selecting objects

[YouTube video player](https://www.youtube.com/embed/xQK498Y1J8M)

Click an object to select it. To select multiple objects, drag over them to create a marquee selection.

Hold `Shift` while clicking or dragging to add objects to the current selection or remove selected objects.

### Select objects inside groups

To select an object inside a group, double-click the object. This moves you one level down in the hierarchy, so you can select objects inside that group.

![Double Click](https://mintcdn.com/rive/jA1HsvaDbvTOHjR6/images/editor/fundamentals/DoubleClick2.gif?s=02e260f2fd260305376e9d87da48a675)

### Deep select

To select an object inside nested groups, hold `⌘` on macOS or `Ctrl` on Windows, then click the object.

Deep select lets you select an object directly, even when it is inside multiple groups.

> [!NOTE]
>
> [Targets](/docs/editor/fundamentals/groups#target) are directly selectable on the stage. You don't need to use **Deep Select** to select them.

![Deep Select](https://mintcdn.com/rive/jA1HsvaDbvTOHjR6/images/editor/fundamentals/DeepSelect.gif?s=062a5ba7607d988971e45f6759560406)

### Select behind

When you hover over an object on the stage, Rive outlines the object that will be selected if you click.

If multiple objects overlap, press `Alt` to cycle through objects under the cursor. When the object you want is outlined, click to select it.

![Select behind](https://mintcdn.com/rive/6tqzUNPsADw-0-5t/images/editor/interface-overview/select-behind.gif?s=ac57c4d46e3ce6baaf654c82b11561c5)

### Moving up and down the Hierarchy

Use `Enter` and `Esc` to move through nested objects in the hierarchy.

* Press `Enter` to move down into the selected group and select its first child.
* Press `Esc` to move up and select the parent of the current selection.

![Enter And Escape](https://mintcdn.com/rive/jA1HsvaDbvTOHjR6/images/editor/fundamentals/EnterAndEscape.gif?s=1c2f4e880532c768a8c848b7817d49a8)

## Navigating the Stage

### Pan

To pan the stage, right-click and drag.

You can also hold `Spacebar` to temporarily switch to the Pan tool, then click and drag to move around the stage.

If you're using a trackpad, scroll left or right to pan horizontally.

![Panning the stage](https://mintcdn.com/rive/6tqzUNPsADw-0-5t/images/editor/interface-overview/pan.gif?s=a617f6309eccd37045f8f6cc92f85626)

### Zoom

To zoom in or out, place your cursor over the stage, then hold `⌘` on macOS or `Ctrl` on Windows and scroll.

![Zooming the stage](https://mintcdn.com/rive/6tqzUNPsADw-0-5t/images/editor/interface-overview/zoom.gif?s=38b14cb0e5c6a8206e1174706a1fccfe)

You can also use keyboard shortcuts:

* Press `+` to zoom in.
* Press `-` to zoom out.
* Press `⌘` + `0` on macOS or `Ctrl` + `0` on Windows to return to 100%.

### Fit selection

Press `F` to fit the current selection in the viewable stage area.

![Fitting the selected object in view](https://mintcdn.com/rive/6tqzUNPsADw-0-5t/images/editor/interface-overview/fit-selection.gif?s=9c5c72abc1ce1368bb45a0c203ed7f13)

If an object is selected, Rive fits that object in view. If an artboard is selected, Rive fits the artboard in view.

> [!TIP]
>
> If you lose track of an artboard or object on the stage, select it in the hierarchy and press `F` to fit it in view.
