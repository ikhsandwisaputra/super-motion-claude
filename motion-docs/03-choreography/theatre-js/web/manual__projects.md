---
source: https://www.theatrejs.com/docs/latest/manual/projects
title: "Projects – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)

# Projects

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)
* Projects

## #What is a Project in Theatre.js?

All your work in Theatre.js is organized into Projects. Projects are a way to organize related work.

Theatre.js allows you to save the state of projects and consume them in `@theatre/core`.
We can create multiple Projects on a single web page, but often one project is sufficient for a whole website.

## #Creating projects

You can create a project with the [getProject](https://www.theatrejs.com/docs/latest/api/core#getproject) function in `@theatre/core`.
If a project with the given name already exists, it will return the existing project instead of creating a new one.

`import { getProject } from '@theatre/core'

// This will create a project called "My Project"

// or return it if it already exists:

const project = getProject('My Project')`

## #State

All the tweaks and animations that you create with Theatre.js are considered the project's state.
`@theatre/core` uses the project state to run your tweaks and animations, and `@theatre/studio` is an editor for the project state.

This state is stored as a JSON object in `localStorage` when the studio is open and can be exported as a JSON file.

![The state of the project in the local storage](https://www.theatrejs.com/images/docs/0.5/manual/projects/01-state-in-localStorage.png)

To export the project, click on the name of the project in the [Outline Panel](https://www.theatrejs.com/docs/latest/manual/Studio#outline-panel) of the studio and then click on the "Export [Project's name]" button in the top right corner of the screen as seen below.

Saving a project's state

You can load a project's state from a JSON file by passing the state down as an object in the configuration of [getProject](https://www.theatrejs.com/docs/latest/api/core#getproject):

`` import { getProject } from '@theatre/core'

import projectState from './state.json'

// This will load the state from the `state.json` file

const project = getProject('My Project', { state: projectState }) ``

Currently, the configuration object of [getProject](https://www.theatrejs.com/docs/latest/api/core#getproject) consists only of the `state` property.

When using Studio, loading a project happens asynchronously. You can wait for the project to load through [Project.ready](https://www.theatrejs.com/docs/latest/api/core#project.ready) and [Project.isReady](https://www.theatrejs.com/docs/latest/api/core#project.isready)

`project.ready.then(() => console.log('Project loaded!'))`

## #API

Learn more about related API at [Project API docs](https://www.theatrejs.com/docs/latest/api/core#project).

## #Learn more

Want to learn more?
Take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Sheets

This guide covers Sheets in Theatre.js

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
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/300-manual/101-projects.mdx)

#### On this page

* [What is a Project in Theatre.js?](https://www.theatrejs.com/docs/latest/manual/projects#what-is-a-project-in-theatre.js)
* [Creating projects](https://www.theatrejs.com/docs/latest/manual/projects#creating-projects)
* [State](https://www.theatrejs.com/docs/latest/manual/projects#state)
* [API](https://www.theatrejs.com/docs/latest/manual/projects#api)
* [Learn more](https://www.theatrejs.com/docs/latest/manual/projects#learn-more)
