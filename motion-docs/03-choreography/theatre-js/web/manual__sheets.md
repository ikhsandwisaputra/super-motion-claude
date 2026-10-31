---
source: https://www.theatrejs.com/docs/latest/manual/sheets
title: "Sheets – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)

# Sheets

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)
* Sheets

## #What is a Sheet in Theatre.js?

Sheets contain one or more [Objects](https://www.theatrejs.com/docs/latest/manual/objects), that can be animated together.

## #Creating Sheets

You can create a Sheet with the [Project.sheet](https://www.theatrejs.com/docs/latest/api/core#project.sheet) function in `@theatre/core`.
If a Sheet with the given name already exists, it will return the existing Sheet instead of creating a new one.

`// project is a Project created earlier through getProject

const mySheet = project.sheet('My Sheet')`

## #Playing a Sheet's animation

Each Sheet has a [Sequence](https://www.theatrejs.com/docs/latest/manual/sequences) attached to it.
You can access a Sheet's [Sequence](https://www.theatrejs.com/docs/latest/manual/sequences) through [Sheet.sequence](https://www.theatrejs.com/docs/latest/api/core#sheet.sequence).
You can then use the [playback controls](https://www.theatrejs.com/docs/latest/api/core#sequence) on the Sequence to play back the animation.

`sheet.sequence.play()`

## #Instancing Sheets

If you have multiple instances of the same thing in your page, like the same animated button, or the same animated character,
you would want to control these instances with using the same Sheet. After all, the animations are the same, you just want to be able to control them independently of each other.
Theatre.js supports this use case, through Sheet Instances. You can create an instance of a sheet by passing an optional instance id as the second argument to [Project.sheet](https://www.theatrejs.com/docs/latest/api/core#project.sheet).

`const submitButtonSheet = project.sheet('Button', 'Submit')

const cancelButtonSheet = project.sheet('Button', 'Cancel')`

You can then independently control the animations of two buttons backed by these sheets. Calling `submitButtonSheet.sequence.play()` will not affect the button backed by `cancelButtonSheet`.

## #API

Learn more about related API at [Sheet API docs](https://www.theatrejs.com/docs/latest/api/core#sheet).

## #Learn more

Want to learn more?
Take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Projects

This guide covers creating projects, managing their states, saving and loading their states, and more.

### Sheet Objects

This guide covers Sheet Objects in Theatre.js.

### Prop types

Learn how to customize the props you want to animate with Theatre.js. When creating a Sheet Object, we define the props that we want to animate on it. Props can have different types which can be imported from "@theatre/core".

### Working with Sequences

In this guide, we'll explore the tools that Theatre.js offers for creating animations.

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
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/300-manual/110-sheets.mdx)

#### On this page

* [What is a Sheet in Theatre.js?](https://www.theatrejs.com/docs/latest/manual/sheets#what-is-a-sheet-in-theatre.js)
* [Creating Sheets](https://www.theatrejs.com/docs/latest/manual/sheets#creating-sheets)
* [Playing a Sheet's animation](https://www.theatrejs.com/docs/latest/manual/sheets#playing-a-sheets-animation)
* [Instancing Sheets](https://www.theatrejs.com/docs/latest/manual/sheets#instancing-sheets)
* [API](https://www.theatrejs.com/docs/latest/manual/sheets#api)
* [Learn more](https://www.theatrejs.com/docs/latest/manual/sheets#learn-more)
