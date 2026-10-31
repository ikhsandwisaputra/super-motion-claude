---
source: https://www.theatrejs.com/docs/latest/getting-started/with-html-svg
title: "With HTML/SVG – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Getting started](https://www.theatrejs.com/docs/latest/getting-started)

# With HTML/SVG

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Getting started](https://www.theatrejs.com/docs/latest/getting-started)
* With HTML/SVG

This guide just assumes you have familiarity with HTML and JavaScript. No package management or bundling is involved.

In this tutorial, we will:

1. Show the Theatre.js Studio UI on a simple HTML page
2. Create a new Theatre.js Project which will control JavaScript values on the page
3. Use Theatre.js to animate UI elements on our page
4. Create a production (publishable) version of our Project we can share with users, collaborators, or friends

## #Prerequisites

Let's start by creating a basic HTML file called `animation-tutorial.html`.
Below is a starter HTML file.
It only contains the basic tags an HTML page should have, nothing Theatre.js specific yet.

animation-tutorial.html

`<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Theatre.js Tutorial</title>

<style>

body {

margin: 0;

color: white;

background: black;

font-family: sans-serif;

}

</style>

</head>

<body>

<h1 id="article-heading" style="text-align: center">Welcome</h1>

<script type="module">

// Add JavaScript here

</script>

</body>

</html>`

If we've saved the above HTML in a file called `animation-tutorial.html` and open that file in our browser,
it results in a Welcome page that looks like the following:

## #Add Theatre.js Studio

To add functionality to our static HTML page, we should first set up our Theatre.js **Project**.
Let's add the following JS into the `<script>` towards the bottom of the HTML where it says `// Add JavaScript here`:

`import 'https://cdn.jsdelivr.net/npm/@theatre/[email protected]/dist/core-and-studio.js'

// We can now access Theatre.core and Theatre.studio from here

const { core, studio } = Theatre

studio.initialize() // Start the Theatre.js UI`

Now when we open / refresh the Welcome page in our browser, we should see the Theatre.js Studio on top of the HTML Welcome page.
There's an "Outline Menu" button in the top left of the page and a "..." menu and "Property Editor" button in the top right:

In this tutorial, we use the `@theatre/browser-bundles` package imported via a CDN to make it easier to get started!
There are other ways of importing Theatre.js using a bundler like WebPack or ESBuild.

Now that we've gotten the Studio to appear, let's create a Theatre.js Project called 'HTML Animation Tutorial' containing a
Sheet called 'Sheet 1' and an Object called 'Heading 1' with props "y" and "opacity":

`const project = core.getProject('HTML Animation Tutorial')

const sheet = project.sheet('Sheet 1')

const obj = sheet.object('Heading 1', {

y: 0, // you can use just a simple default value

opacity: core.types.number(1, { range: [0, 1] }), // or use a type constructor to customize

})`

Now we should see `HTML Animation Tutorial > Sheet 1: Default > Heading 1` under the
"Outline Menu" button in the top left of our page.

We've just configured our Theatre.js Project structure, but if we try to change any values
in the [Details Panel](https://www.theatrejs.com/docs/latest/manual/Studio#details-panel) on the right, they will not yet change any part of the original HTML Welcome page.

Next, let's ensure the values in Theatre.js are applied to our page's elements.
We can call the [Object.onValuesChange](https://www.theatrejs.com/docs/latest/api/core#object.onvalueschange) method on `obj` to listen to the value changes on our Object.

`` const articleHeadingElement = document.getElementById('article-heading')

obj.onValuesChange((obj) => {

articleHeadingElement.style.transform = `translateY(${obj.y}px)`

articleHeadingElement.style.opacity = obj.opacity

}) ``

Now that our code synchronizes Theatre.js with the `articleHeadingElement`'s style,
try dragging or clicking on the number beside "y" or "opacity" in the [Details Panel](https://www.theatrejs.com/docs/latest/manual/Studio#details-panel)
on the right in the preview below.

The "Welcome" element you see moving around and fading in and out should behave like in
the video below.

Studio UI

## #Sequencing Properties to create an animation

Now that we have set up our Project, let's go ahead and use the Studio to create an animation.
In Theatre.js, an animation consists of a set of "Sequenced" props with "Keyframes".

First, let's try Sequencing the "y" prop and adding keyframes to it.
Check the video below to see how we can sequence a prop.

Sequencing

Now that we've sequenced a prop and added keyframes, we can play back the resulting animation in our browser.
But the animation is, so far, only stored in your browser's local data (in `localStorage`).
To share the animation with others (or include it on a website), we have to export the animation state and initialize our Theatre.js project with it.
We'll look at that in the next section.

## #Getting ready for production

Now that we've created a basic animation locally, we want to share it with the world!
So, here's a checklist for what we need to do to share our animation / include it on a webpage.

Production (published webpage) animation checklist:

1. Export the Project's `state.json` by clicking the Project ("HTML Animation Tutorial") in the outline panel on the left and then click the "Export HTML Animation Tutorial to JSON" in the panel on the right. A file download for `state.json` should start in your browser.
2. Open `state.json` in a text editor and copy its contents into your JavaScript code as a value stored in a `projectState` variable (if you use a bundler, it's possible to import the `state.json` file directly).
3. In the part of the code where you created the Theatre.js Project, modify it to include your animation state like so:

   `const project = core.getProject('HTML Animation Tutorial', {

   state: projectState,

   })`
4. Remove Studio imports

   a. for simple projects using `@theatre/browser-bundles`, remove the `core-and-studio.js` part of the import URL, and replace it with `core-only.min.js`.

   b. for projects directly importing from `@theatre/studio` (using a bundler), don't import Studio for your production builds.
5. Remove all `Theatre.studio.initialize()` calls so that the animation shows, but the Studio UI does not.
6. Add some code that plays the animation! Here's some code that plays 6 seconds of the animation and loops it as soon as it has loaded:

   `project.ready.then(() => {

   sheet.sequence.play({ iterationCount: Infinity, range: [0, 6] })

   })`

The following shows our *production* HTML version of `animation-tutorial.html` which applies the above and uses a project JSON state the author designed while writing this tutorial.

production-animation-tutorial.html

`` <!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8" />

<meta http-equiv="X-UA-Compatible" content="IE=edge" />

<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>Theatre.js Tutorial</title>

<style>

body {

margin: 0;

color: white;

background: black;

font-family: sans-serif;

}

</style>

</head>

<body>

<h1 id="article-heading" style="text-align: center">Welcome</h1>

<script type="module">

// only import core

import 'https://cdn.jsdelivr.net/npm/@theatre/[email protected]/dist/core-only.min.js'

// We can now access just Theatre.core from here

const articleHeadingElement = document.getElementById('article-heading')

// Exported by clicking the project name and "Export Project Name to JSON" button.

const projectState = {

sheetsById: {

'Sheet 1': {

staticOverrides: {

byObject: {

'Heading 1': {

opacity: 0.9936708860759493,

},

},

},

sequence: {

subUnitsPerUnit: 30,

length: 10,

type: 'PositionalSequence',

tracksByObject: {

'Heading 1': {

trackData: {

LrJ3eujCAE: {

type: 'BasicKeyframedTrack',

keyframes: [

{

id: 'i-s2GT5JFm',

position: 0,

connectedRight: true,

handles: [0.5, 1, 0.882, 0],

value: 0,

},

{

id: 'I3Suv35jmV',

position: 3.433,

connectedRight: true,

handles: [0.055, 0.969, 0.82, -0.031],

value: 96,

},

{

id: 'M_00uVAeuK',

position: 5.6,

connectedRight: true,

handles: [0.087, 1.01, 0.5, 0],

value: 0,

},

],

},

'9JzZUrUSb7': {

type: 'BasicKeyframedTrack',

__debugName: 'Heading 1:["opacity"]',

keyframes: [

{

id: 'EfAPcjrYAy',

position: 0,

connectedRight: true,

handles: [0.5, 1, 0.5, 0],

value: 0.9936708860759493,

},

{

id: 'hZ-tUkMP4C',

position: 2.367,

connectedRight: true,

handles: [0.5, 1, 0.5, 0],

value: 0,

},

{

id: 'D5PA_XGfS6',

position: 5.6,

connectedRight: true,

handles: [0.5, 1, 0.5, 0],

value: 0.9936708860759493,

},

],

},

},

trackIdByPropPath: {

'["y"]': 'LrJ3eujCAE',

'["opacity"]': '9JzZUrUSb7',

},

},

},

},

},

},

definitionVersion: '0.4.0',

revisionHistory: ['vLg01lxRrpP8eGsS'],

}

const { core } = Theatre

// We don't need studio in production

// studio.initialize()

const project = core.getProject('HTML Animation Tutorial', {

state: projectState,

})

const sheet = project.sheet('Sheet 1')

const obj = sheet.object('Heading 1', {

y: 0,

opacity: core.types.number(1, { range: [0, 1] }),

})

// animations

obj.onValuesChange((obj) => {

articleHeadingElement.style.transform = `translateY(${obj.y}px)`

articleHeadingElement.style.opacity = obj.opacity

})

// wait for project to be ready

project.ready.then(() => {

sheet.sequence.play({ iterationCount: Infinity, range: [0, 6] })

})

</script>

</body>

</html> ``

And here's the final product.

## #Next steps

Want to learn more ways to use Theatre.js? Check out another getting started guide:

### With React Three Fiber

Animate a React Three Fiber project using Theatre.js's r3f extension, "@theatre/r3f". This guide assumes that you have a web project with a bundler set up.

### With THREE.js

Animate a 3D scene by integrating Theatre.js into a THREE.js project. Theatre.js can be used with THREE.js to animate things like the camera, lights, material colors, and more.

Also, take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Projects

This guide covers creating projects, managing their states, saving and loading their states, and more.

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
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/100-getting-started/300-with-html-svg.mdx)

#### On this page

* [Prerequisites](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#prerequisites)
* [Add Theatre.js Studio](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#add-theatre.js-studio)
* [Sequencing Properties to create an animation](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#sequencing-properties-to-create-an-animation)
* [Getting ready for production](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#getting-ready-for-production)
* [Next steps](https://www.theatrejs.com/docs/latest/getting-started/with-html-svg#next-steps)
