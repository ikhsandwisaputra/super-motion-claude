---
source: https://rive.app/docs/editor/layouts/layout-tools
title: "Tools"
fetched: 2026-10-28
split_from: rive.app__docs__llms-full.txt
---

# Tools

There are several Layout tools available in Rive to build your responsive UI or content

## Getting started with Layouts

There are a number of ways to start adding layouts to your designs.

* Layout Tools in the Arrangement Tools menu
* Wrap in Layout
* Add Child Layout
* Dragging and Dropping Layouts

***

### Layout tools in the arrangement tools menu

![Arrangement Tools menu open in the toolbar, listing the Layout (L), Row (R), and Column (C) tools](https://mintcdn.com/rive/KnNrDuhU1mIj7cOb/images/editor/layouts/53f42ad0-4045-41c4-bcfe-90a40ad0dc1d.webp?fit=max\&auto=format\&n=KnNrDuhU1mIj7cOb\&q=85\&s=8d2b62e617e4f649836a6f594705a213)

Arrangement Tools Menu showing the Layout, Row and Column Tools

* **Layout:** A single Layout container. Select the tool and drag on an artboard to create the Layout. Drag directly onto the Artboard to create an Absolute Layout or on top of an existing Layout to create a Relative child. In addition, any objects positioned within the bounds of the newly created Layout will automatically themselves be wrapped in Layouts and absolutely positioned inside the new Layout.

  <video>
    <source type="video/mp4" />

    Layout
  </video>

* **Row/Column:** The Row and Column tools create a Layout in the same way as the Layout tool above, but also include an initial set of children which will be positioned in either a Row or Column. You can use either the number keys or the up/down keys to define the number of children while dragging your row or column onto the stage. The created children will have their widths and heights set to **Fill**.

  <video>
    <source type="video/mp4" />

    Row/Column
  </video>

> [!TIP]
>
> Absolute Layouts can be dragged around or resized like other Rive objects. By default, if you drag a Layout (or any other object) inside the bounds of another Layout, it will display an indicator showing you that the dragged object will become a child of that Layout if dropped. Hold `command` / `control` while dragging the object to prevent existing items from being moved into the Layout.

***

### Wrap in Layout

Instead of starting with an empty Layout container, you can wrap existing objects into a Layout. There are a number of ways to wrap an active selection in a Layout:

* Right click on the stage or the hierarchy to surface the context menu. Select `Wrap in` > `Layout`. You can do this for a single or multiple objects at once.

  <video>
    <source type="video/mp4" />

    Wrap in
  </video>

* Use the `shift` + `L` shortcut.

  <video>
    <source type="video/mp4" />

    `shift` + `L` shortcut
  </video>

* Alternatively, you can use the `Layout selection` button in the inspector. This is available when only non-Layout objects are selected.

  <video>
    <source type="video/mp4" />

    Layout selection
  </video>

***

### Add child Layout

When a Layout is the current selection, an `Add Child Layout` button will appear in the Layout inspector. Clicking this will add a new Layout as a child of the selected Layout, with its width and height set to Fill.

![Add Child Layout button at the top of the Layout inspector, above the alignment grid and Column layout settings](https://mintcdn.com/rive/LTt3dbNyEAMvuJ4M/images/editor/add-child-layout.png?fit=max\&auto=format\&n=LTt3dbNyEAMvuJ4M\&q=85\&s=824c90e7cb57cfa06e963d12a4ffa9b2)

***

### Dragging and dropping Layouts

Layouts (both Absolute and Relative) can be dragged and dropped into other Layouts at any time. This can be done in two ways:

* Drag and drop Layouts in the hierarchy panel.
* Drag and drop Layouts directly on the stage. When doing so, an indicator will show where in the new parent Layout the dragging Layout will be inserted.

![A Layout on the stage containing four children arranged in a row, with spacing indicators marking where a dragged Layout would be inserted](https://mintcdn.com/rive/KnNrDuhU1mIj7cOb/images/editor/layout-drag-drop.png?fit=max\&auto=format\&n=KnNrDuhU1mIj7cOb\&q=85\&s=7b78f0fff5859e96d6810a12c48c5211)

Layouts can also be deleted by selecting the Layout on stage or in the hierarchy and hitting the delete key.
