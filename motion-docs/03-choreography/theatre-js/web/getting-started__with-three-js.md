---
source: https://www.theatrejs.com/docs/latest/getting-started/with-three-js
title: "With THREE.js – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Getting started](https://www.theatrejs.com/docs/latest/getting-started)

# With THREE.js

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Getting started](https://www.theatrejs.com/docs/latest/getting-started)
* With THREE.js

In this guide, you'll learn how to animate a 3D scene by integrating Theatre.js into a [THREE.js](https://threejs.org/) project.
Theatre.js can be used with THREE.js to animate things like the camera, lights, material colors, and more.

## #Prerequisites

We'll start by cloning or downloading the code in the [THREE.js + bundler project repository](https://github.com/fulopkovacs/vanilla-threejs-project).

`# using git

git clone https://github.com/fulopkovacs/vanilla-threejs-project`

Alternatively, you can download [the ZIP archive of the code](https://github.com/fulopkovacs/vanilla-threejs-project/archive/refs/heads/main.zip) and extract it to a folder of your choice.

This code will set up a basic THREE.js scene with a torus know geometry, basic lighting, and a render loop.

This project uses Vite, but you really just need a basic web project set up with a bundler of your choice with some
code to set up a [basic THREE.js scene](https://threejs.org/docs/#manual/en/introduction/Creating-a-scene).

Once you have your project cloned, navigate to the project folder in your terminal.

`# open the repository in your terminal

cd vanilla-threejs-project`

And use a package manager of your choice (e.g., npm or yarn) to install dependencies to the `./node_modules` folder.

`# install the dependencies:

npm install

# and start the dev server:

npm run dev`

Or with yarn:

`# install the dependencies:

yarn install

# and start the dev server:

yarn run dev`

Now, if you open [`http://localhost:3000`](http://localhost:3000) in the browser, you should see something like this:

![The sample project screen open in the browser.](https://www.theatrejs.com/images/docs/0.5/getting-started/with-three-js/01.png)

## #Add Theatre.js packages

Now that you have a THREE.js codebase you want to add Theatre.js to, let's install Theatre.js's packages.

`# with npm

npm install --save @theatre/core @theatre/studio

# or with yarn

yarn add @theatre/core @theatre/studio`

## #Create an animation

Theatre.js has two essential packages that we need to use in this project.
`@theatre/studio` is the editor GUI that we use to create animations, and `@theatre/core` plays the animations we've created. If you're using the started project, naviage to the `main.ts` file and
let's import the studio package and initialize the editor:

`/* ... */

import * as THREE from 'three'

import studio from '@theatre/studio'

/**

* Theatre.js

*/

studio.initialize()

/* ... */`

![The editor UI after the studio has been initialized.](https://www.theatrejs.com/images/docs/0.5/getting-started/with-three-js/02.png)

## #Animate the rotation of the TorusKnot

So far, we cannot edit anything using the UI; we need to hook up our THREE.js objects to Theatre.js first.
There are a lot of things we could animate in the starting scene, but let's focus on the rotation of the `torusKnot` for now.

First, create a Theatre.js project using the code below. A [Project](https://www.theatrejs.com/docs/latest/manual/projects) in Theatre.js is like a save file.
Projects are stored in the browser's `localStorage`, so you don't lose your progress if you close and reopen Theatre.js.

`import * as THREE from 'three'

import { getProject } from '@theatre/core'

// Initialize the studio

studio.initialize()

// Create a project for the animation

const project = getProject('THREE.js x Theatre.js')`

Now we'll add a [Sheet](https://www.theatrejs.com/docs/latest/manual/sheets).
Sheets are a collection of objects which can be animated together.

`/* ... */

// Create a project for the animation

const project = getProject('THREE.js x Theatre.js')

// Create a sheet

const sheet = project.sheet('Animated scene')`

Next, we'll create a [Sheet Object](https://www.theatrejs.com/docs/latest/manual/objects) with the [props](https://www.theatrejs.com/docs/latest/manual/prop-types) that you want to animate.
Sheets contain one or more objects, that can be animated together.
You can customize how these props look and behave in the UI, e.g. you can set minimum and maximum values of a number prop by modifying its `range`.

`import * as THREE from 'three'

import { getProject, types } from '@theatre/core'

/* ... */

scene.add(mesh)

// Create a Theatre.js object with the props you want to

// animate

const torusKnotObj = sheet.object('Torus Knot', {

// Note that the rotation is in radians

// (full rotation: 2 * Math.PI)

rotation: types.compound({

x: types.number(mesh.rotation.x, { range: [-2, 2] }),

y: types.number(mesh.rotation.y, { range: [-2, 2] }),

z: types.number(mesh.rotation.z, { range: [-2, 2] }),

}),

})`

The last thing to do is to rotate the torusKnot's mesh based on the values of `torusKnotObj`.
This can be done by listening to the changes of the `torusKnotObj` and updating the rotation of the `torusKnot`.

`const torusKnotObj = sheet.object('Torus Knot', {

/* ... */

})

torusKnotObj.onValuesChange((values) => {

const { x, y, z } = values.rotation

mesh.rotation.set(x * Math.PI, y * Math.PI, z * Math.PI)

})`

Now you're set up to use the [Studio](https://www.theatrejs.com/docs/latest/manual/Studio) to edit and animate the torusKnot's rotation!

## #Animating objects

To start animating, we first have to sequence the properties of an object we want to animate.
To sequence properties: select an object, right-click on a property (or group of properties) in the property editor panel, and click "sequence".
After clicking "sequence", the sequence editor will open. Here, we'll sequence the rotation of the torus knot.

Sequencing props

To animate the knot's rotation, we'll create two sets of keyframes by clicking on the yellow diamond next to the rotation prop in the [Details Panel](https://www.theatrejs.com/docs/latest/manual/Studio#details-panel),
one with the playhead at `0s`, and one at `3s`. We'll then set the first set of keyframes to `0`, and the second set to `1`.

Animating props

You can of course experiment with adding more keyframes.

Once we have some keyframes in the sequence editor, we can play our animation by pressing `Space`.

Tip: If the Studio UI gets in the way, you can hide it by pressing `Alt/Option + \`.

To learn more about creating animations, see [Working with Sequences](https://www.theatrejs.com/docs/latest/manual/sequences).

![The animated torusKnot](https://www.theatrejs.com/images/docs/0.5/getting-started/with-three-js/03.png)

## #Getting ready for production

All the keyframes you created are saved in your browser's `localStorage` so that your animation will be remembered between page refreshes.
However, now you may want a way to save, share/publish, and programmatically play your animation.

To distribute your animation as a part of your website, export your Theatre.js Project by clicking on "THREE.js x Theatre.js" in the outline menu in the top left of the UI.

![Save your animation: step 1](https://www.theatrejs.com/images/docs/0.5/getting-started/with-three-js/04.png)

Then click on the "Export THREE.js x Theatre.js to JSON" button on the right.

![Save your animation: step 2](https://www.theatrejs.com/images/docs/0.5/getting-started/with-three-js/05.png)

This will download a JSON file `state.json`. Now, we can move `state.json` to the folder containing our web project, and import the JSON file:

`import projectState from './state.json'`

Then replace our code from before:

`const project = getProject('THREE.js x Theatre.js')`

With this code:

`const project = getProject('THREE.js x Theatre.js', { state: projectState })`

We are now passing the saved animation state to [getProject](https://www.theatrejs.com/docs/latest/api/core#getproject).
By doing this,the Theatre.js project will be initialized with the saved animation from `state.json` instead of the animation saved in `localStorage`.
Don't worry; any changes you make to your animation in Studio will still be saved to `localStorage` after you do this (your edits will still survive page refreshes).

The last thing left is programmatically playing your animation.

To play an animation, we need to get a reference to its [sequence](https://www.theatrejs.com/docs/latest/concepts#sequences) and call the [play](https://www.theatrejs.com/docs/latest/api/core#sequence.play) method on it.
[Sequence.play](https://www.theatrejs.com/docs/latest/api/core#sequence.play) accepts a number of options.
Here, we are going to instruct Theatre.js to play the animation forever.

`// Play the animation on repeat

project.ready.then(() => sheet.sequence.play({ iterationCount: Infinity }))`

In summary, your code will now look like the following [GitHub repo](https://github.com/fulopkovacs/threejs-x-theatrejs).

To check what our page looks like without the Studio, we can press `Alt/Option + \` to hide it. Alternatively, we can comment out `studio.initialize()`.

## #Deploying to production

When we are done and ready to deploy our webpage to production, we only need to do two things.

1. Make sure that we have the latest project state exported to a JSON file and passed to [getProject](https://www.theatrejs.com/docs/latest/api/core#getproject).
2. Remove [studio.initialize](https://www.theatrejs.com/docs/latest/api/studio#studio.initialize) and [studio.extend](https://www.theatrejs.com/docs/latest/api/studio#studio.extend).

We can also achieve the last step without manually editing the code every time by using environment-checks and relying on our bundler's tree-shaking feature:

`// Vite

if (import.meta.env.DEV) {

studio.initialize()

studio.extend(extension)

}`

`// create-react-app

if (process.env.NODE_ENV === 'development') {

studio.initialize()

studio.extend(extension)

}`

## #Next steps

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

Or check out another getting started guide:

### With React Three Fiber

Animate a React Three Fiber project using Theatre.js's r3f extension, "@theatre/r3f". This guide assumes that you have a web project with a bundler set up.

### With HTML/SVG

How to get started animating HTML elements directly with Theatre.js. This tutorial doesn't require any knowledge beyond HTML + JavaScript.

---

Was this article helpful to you?

Last edited on February 01, 2024.
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/100-getting-started/200-with-three-js.mdx)

#### On this page

* [Prerequisites](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#prerequisites)
* [Add Theatre.js packages](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#add-theatre.js-packages)
* [Create an animation](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#create-an-animation)
* [Animate the rotation of the TorusKnot](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#animate-the-rotation-of-the-torusknot)
* [Animating objects](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#animating-objects)
* [Getting ready for production](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#getting-ready-for-production)
* [Deploying to production](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#deploying-to-production)
* [Next steps](https://www.theatrejs.com/docs/latest/getting-started/with-three-js#next-steps)
