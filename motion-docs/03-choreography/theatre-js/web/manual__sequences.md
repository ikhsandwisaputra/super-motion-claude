---
source: https://www.theatrejs.com/docs/latest/manual/sequences
title: "Working with Sequences – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)

# Working with Sequences

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)
* Working with Sequences

## #Introduction

In this guide, we'll explore the tools that Theatre.js offers for creating animations.
We'll see how to add and delete keyframes, modify properties, edit the speed curves of the animations, and more.

## #Sequencing props

Let's say you have a THREE.js `Directional Light` in your code, and you want to change its color property.

`// Directional light THREE.js object

const directionalLight = new THREE.DirectionalLight('#ff0000')

directionalLight.intensity = 30

// Directional light Theatre.js object

const directionalLightObj = sheet.object('Directional Light', {

intensity: types.number(

directionalLight.intensity, // initial value

{ range: [0, 30] }, // options for prop number

),

})

directionalLightObj.onValuesChange((values) => {

// update THREE.js object based on Theatre.js values

directionalLight.intensity = values.intensity

})`

The object would look like the following in the studio.

![The intensity property of the Directional Light in the Details Panel](https://www.theatrejs.com/images/docs/0.5/manual/sequences/01-directionalLight-properties.png)

To animate the `intensity` property of the object above, right-click on its name in the [Details Panel](https://www.theatrejs.com/docs/latest/manual/Studio#details-panel), and select the "Sequence" option from the context menu.

Sequence the "intensity" prop

In the [prop types guide](https://www.theatrejs.com/docs/latest/manual/prop-types), we mentioned the difference between simple props (like `string` or `number`) and compound props (a group of named props).
The props within compound props can be sequenced all at once by right-clicking on the name of the compound prop and selecting the "Sequence all" option in the context menu.

Sequence the rotation prop

You can use the "Make static"/"Make all static" menu items from the same context menus for removing the prop from the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor).
Note that this will also remove all the keyframes that belong to that prop, and thus all the animation.

Make props static

## #Adding/removing keyframes

Now that we have the props in the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor), we can finally animate them by inserting keyframes into the timeline.

Adding keyframes

Removing keyframes is as easy as right-clicking on them and selecting the "Delete" option from the context menu.

Removing keyframes

## #Editing keyframe values in the inline editor

An easy and quick way to edit the value of a keyframe is to left-click on the keyframe in the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor) and modify its value in the inline editor popup.
This works for all the prop types.

Inline editor

## #Aggregate keyframes

Aggregate keyframes are automatically created for compound props and objects to make it easier to edit the child keyframes that have the same position.
This explanation is a bit hard to parse at first, so let's look at an example:

Create aggregate keyframes

At the start of the video above, we added a keyframe for the "wireframe" property, which meant that a new keyframe had to be created by Theatre.js in the track of the "Torus Knot" object.
When we moved that keyframe, the keyframe in the "wireframe" track was moving too.
In this case, the wireframe's track keyframe was a child of the keyframe in the "Torus Knot" track.
When a connector (the line connecting two keyframes in the same track) of two aggregate keyframes is moved, it also moves the connectors of the child keyframes.

Aggregate keyframes can also be deleted (or copied/pasted) which results in the deletion of all the child keyframes.

Delete aggregate keyframes

## #Copying/pasting keyframes

To copy a keyframe simply right-click on it and select the "Copy" option from the context menu.
After that, you can move the playhead to the position where you want the pasted keyframe to be and right-click on an empty part of a track to paste the keyframe into that track.

Copy paste keyframes

## #Focus range

The Focus Range is a very useful feature if you want to focus on editing a small section of the sequence.
Create a focus range on the selected section of the sequence by holding down the `Shift` key and dragging the cursor from the start of the section to the end in the top bar of the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor).

Create a focus range

By default, the playback will play within the focus range on repeat if you start it from within the focus range, but you can disable the focus range temporarily (and enable it later), or even delete it.
Note that if you create a new focus range, the old one will automatically get deleted.

Delete a focus range

## #Using the tween editor

The tween editor can be used to apply timing functions that control the speed curve of the transition between the two keyframes.
These are very similar to the [`transition-timing-functions`](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) in CSS.

You just have to click on the connector of the two keyframes and the *Tween editor* menu will appear.
You can fuzzy-search for the function's name (like "linear" or "quad-in-out"), or even define your custom [cubic Bezier curve](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function#cubic-bezierp1_p2_p3_p4).

The tween editor

## #Using the multi-track editor

The multi-track curve editor comes in handy when you want to edit the speed curve of one or more tracks by hand.
To activate it you just have to click the icon next to the name of the track in the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor).
This will open up the multi-track curve editor with the speed curves in it that you can edit by moving their handles.
The curves have the same color as the icon of the track they belong to.

The multi-track curve editor

## #Selections

Selections can be made in the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor) by holding down `Shift` and dragging the mouse to create a selection rectangle area.
Selected keyframes can be moved or deleted together.

Selections

## #Playback control

Play and pause with `Space` while the Studio is focused.

## #Programmatic control

You can do a lot more when interacting with the `sheet.sequence` directly in our code which you can learn more about in [the Sequence API Reference](https://www.theatrejs.com/docs/latest/api/core#sequence).

* [Sequence.play](https://www.theatrejs.com/docs/latest/api/core#sequence.play): play at a position, with repeats, in direction, etc
* [Sequence.pause](https://www.theatrejs.com/docs/latest/api/core#sequence.pause): pausing a sequence
* [Sequence.position](https://www.theatrejs.com/docs/latest/api/core#sequence.position): getting the position of the playhead
* [Sequence.pointer](https://www.theatrejs.com/docs/latest/api/core#sequence.pointer): watching additional data as it changes
* [Sequence.attachAudio](https://www.theatrejs.com/docs/latest/api/core#sequence.attachAudio): directly attaching audio to play with the sequence

## #Learn more

Want to learn more?
Take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Projects

This guide covers creating projects, managing their states, saving and loading their states, and more.

### Sheets

This guide covers Sheets in Theatre.js

### Sheet Objects

This guide covers Sheet Objects in Theatre.js.

### Prop types

Learn how to customize the props you want to animate with Theatre.js. When creating a Sheet Object, we define the props that we want to animate on it. Props can have different types which can be imported from "@theatre/core".

### Assets

Learn about assets in Theatre.js

### Using Audio

Learn how to load and synchronize music or narration audio to an animation.

### Studio

Learn the different parts of the Studio.

### Authoring extensions

The Theatre.js Studio API enables you to define extensions that extend the Studio's UI and/or extend the functionality of Studio.

### Keyboard & Mouse Controls

A catalog of controls in Theatre.js Studio.

### Advanced uses

---

Was this article helpful to you?

Last edited on February 01, 2024.
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/300-manual/135-sequences.mdx)

#### On this page

* [Introduction](https://www.theatrejs.com/docs/latest/manual/sequences#introduction)
* [Sequencing props](https://www.theatrejs.com/docs/latest/manual/sequences#sequencing-props)
* [Adding/removing keyframes](https://www.theatrejs.com/docs/latest/manual/sequences#addingremoving-keyframes)
* [Editing keyframe values in the inline editor](https://www.theatrejs.com/docs/latest/manual/sequences#editing-keyframe-values-in-the-inline-editor)
* [Aggregate keyframes](https://www.theatrejs.com/docs/latest/manual/sequences#aggregate-keyframes)
* [Copying/pasting keyframes](https://www.theatrejs.com/docs/latest/manual/sequences#copyingpasting-keyframes)
* [Focus range](https://www.theatrejs.com/docs/latest/manual/sequences#focus-range)
* [Using the tween editor](https://www.theatrejs.com/docs/latest/manual/sequences#using-the-tween-editor)
* [Using the multi-track editor](https://www.theatrejs.com/docs/latest/manual/sequences#using-the-multi-track-editor)
* [Selections](https://www.theatrejs.com/docs/latest/manual/sequences#selections)
* [Playback control](https://www.theatrejs.com/docs/latest/manual/sequences#playback-control)
* [Programmatic control](https://www.theatrejs.com/docs/latest/manual/sequences#programmatic-control)
* [Learn more](https://www.theatrejs.com/docs/latest/manual/sequences#learn-more)
