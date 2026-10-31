---
source: https://www.theatrejs.com/docs/latest/concepts
title: "Concepts – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)

# Concepts

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* Concepts

## #Objects

An animated illustration of Theatre.js objects. Side-by-side animations of a jumping cube and button.

**Everything that is animated** is represented as an object.
Objects can be THREE.js objects or virtual objects that don't exist on the screen.

## #Props

**Objects are made up of props.** Each prop can have a different type and can be sequenced.

![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271300%27%20height=%27828%27/%3e)![An annoted screenshot of the Theatre.js Studio UI next to a cube with an axis overlayed. The annotation draws a line between the y axis and an input labelled y in the UI, as well as a line between the width of the cube and an input labelled width in the UI.](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

### #Changing props

Props can be changed via Theatre's UI or via code.

A video of the Theatre.js UI with a cube on the webpage. Shows the mouse moving the cube up and down using the
grabbable axis in the 3D editor and shows the user changing the y value of the cube in the UI.

## #Sheets

Sheets **contain one or more objects** that can be animated together.

An animated illustration of Theatre.js sheets. Shows a cube jumping (obj1) and some dust particles (obj2).

### #Sheet instances

An animated illustration of Theatre.js sheet instances. Shows three identical animations of a cube jumping with offset
animation start times.

You can **re-use a sheet by making instances** of it.
That means we can have more than one jumpidy-jump animation, each with its own little box and dust particles.

### #Sequences

An animated illustration of Theatre.js sequences. Shows a cube jumping animations with the Theatre.js Studio "dope
sheet" panel below. The dope sheet panel contains a moving playhead and visual representations of props with tracks
containing keyframes and tweens.

Each sheet has a single sequence *(multi-sequence sheets are in the works!)*.
A sequence is basically made up of **all of the keyframes of all of the objects in a sheet**.

## #Extensions

![](data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271300%27%20height=%27828%27/%3e)![An annotated screenshot of the Theatre.js Studio UI. Annotations show 'The extension button in the toolbar', 'The extension pane', and 'The editing gizmo just for R3F objects'](data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)

**Extensions can make creating and editing objects for your animation much easier**.
They can provide editor gizmos, toolbars, and even their own panes.

---

Was this article helpful to you?

Last edited on February 01, 2024.
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/020-concepts/index.mdx)

#### On this page

* [Objects](https://www.theatrejs.com/docs/latest/concepts#objects)
* [Props](https://www.theatrejs.com/docs/latest/concepts#props)
* [Changing props](https://www.theatrejs.com/docs/latest/concepts#changing-props)
* [Sheets](https://www.theatrejs.com/docs/latest/concepts#sheets)
* [Sheet instances](https://www.theatrejs.com/docs/latest/concepts#sheet-instances)
* [Sequences](https://www.theatrejs.com/docs/latest/concepts#sequences)
* [Extensions](https://www.theatrejs.com/docs/latest/concepts#extensions)
