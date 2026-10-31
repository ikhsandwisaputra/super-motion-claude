---
source: https://www.theatrejs.com/docs/latest/manual/prop-types
title: "Prop types – Theatre.js"
fetched: 2026-10-28
---

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)

# Prop types

* [Theatre.js Docs](https://www.theatrejs.com/docs/latest)
* [Manual](https://www.theatrejs.com/docs/latest/manual)
* Prop types

## #What are props?

When you want to animate something in Theatre.js, you first have to create a Sheet Object for it and then define the props that you want to animate on this object.
The props can have different types, which can be imported via `import {types} from "@theatre/core"`.

To understand Sheet Objects and their relationship with props, let's look at this scene from the project that we created in the [Getting started with THREE.js](https://www.theatrejs.com/docs/latest/getting-started/with-three-js) guide.

`` /* ... */

import { getProject, types } from '@theatre/core'

/* ... */

// Adding the THREE.js mesh object to THREE.js scene

scene.add(mesh)

// Creating a Theatre.js object for the mesh with the

// properties we want to animate

const torusKnotObj = sheet.object('Torus Knot', {

// Note that the rotation is in radians

// (full rotation: 2 * Math.PI)

// `mesh.rotation.x` is a number we're using as an initial value

rotation: types.compound({

x: types.number(mesh.rotation.x, { range: [-2, 2] }),

y: types.number(mesh.rotation.y, { range: [-2, 2] }),

z: types.number(mesh.rotation.z, { range: [-2, 2] }),

}),

}) ``

In this scene, the "Torus Knot" object (`torusKnotObj`) has a rotation prop that contains 3 other props: the rotation of the torus knot on the `x`, `y`, and `z` axes.

A TorusKnot object with animated props in Theatre.js

On the left side of the screen, you will see the "Torus Knot" object in the outline menu.

![The Torus Knot object in the outline menu](https://www.theatrejs.com/images/docs/0.5/manual/prop-types/02.png)

On the right side of the screen, you will see the props of the "Torus Knot" object in the [Details Panel](https://www.theatrejs.com/docs/latest/manual/Studio#details-panel).
By default, the props are static, meaning they are not animated.
Once they are [sequenced](https://www.theatrejs.com/docs/latest/manual/sequences#sequencing-props), they will also be displayed in the [Sequence Editor](https://www.theatrejs.com/docs/latest/manual/Studio#sequence-editor) at the bottom of the screen.

![The properties of the Torus Knot object in the Details Panel](https://www.theatrejs.com/images/docs/0.5/manual/prop-types/03.png)

## #Property types

When you define a property you have to tell Theatre.js what kind of value it has.
Studio will give you different tools to edit props based on their types (e.g. sliders for numeric values, color pickers for color values) and it will also handle the interpolation between keyframes differently under the hood (moving to `5` from `3` is different from moving from `#ff0000` to `#00ff00`).

You can also customize the props when you create them by passing down an object containing the options.
In the following example the `x` prop has a min value of -1 and a maximum of 1 in the UI.

`const torusKnotObj = sheet.object('Torus Knot', {

x: types.number(mesh.rotation.x, {range [-1, 1]})

})`

Let's go through the list of props that Theatre.js currently has.

### #types.number(default, opts?)

The number prop

The `number` prop holds a numeric value.
See the examples below for more information about its usage.

`// shorthand:

const obj = sheet.object('key', { x: 0 })

// With options (equal to above)

const obj = sheet.object('key', {

x: types.number(0),

})

// With a range (note that opts.range is just a visual guide, not a validation rule)

const x = types.number(0, { range: [0, 10] }) // limited to 0 and 10

// With custom nudging

const x = types.number(0, { nudgeMultiplier: 0.1 }) // nudging will happen in 0.1 increments

// With custom nudging function

const x = types.number({

nudgeFn: (

// the mouse movement (in pixels)

deltaX: number,

// the movement as a fraction of the width of the number editor's input

deltaFraction: number,

// A multiplier that's usually 1, but might be another number if user wants to nudge slower/faster

magnitude: number,

// the configuration of the number

config: { nudgeMultiplier?: number; range?: [number, number] },

): number => {

return deltaX * magnitude

},

})`

### #types.compound(props, opts?)

![The compound prop](https://www.theatrejs.com/images/docs/0.5/manual/prop-types/compound-prop.png)

The `compound` prop is useful for grouping props.
In the example below, we create a `rotation` group for the rotation of the `torusKnotObj` on the `x`, `y` and `z` axes.

`const torusKnotObj = sheet.object('Torus Knot', {

rotation: types.compound({

x: types.number(mesh.rotation.x, { range: [-2, 2] }),

y: types.number(mesh.rotation.y, { range: [-2, 2] }),

z: types.number(mesh.rotation.z, { range: [-2, 2] }),

}),

})`

### #types.boolean(default, opts?)

![The boolean prop](https://www.theatrejs.com/images/docs/0.5/manual/prop-types/boolean-prop.png)

The `boolean` prop has a boolean value (like `true` or `false`).

`// shorthand:

const obj = sheet.object('key', { isOn: true })

// with a label:

const obj = sheet.object('key', {

isOn: types.boolean(true, {

// override the label given in the Details Panel and DopeSheet

label: 'Enabled',

}),

})`

### #types.string(default, opts?)

![The string prop](https://www.theatrejs.com/images/docs/0.5/manual/prop-types/string-prop.png)

The `string` prop type holds a string value.

`// shorthand:

const obj = sheet.object('key', { message: 'Animation loading' })

// with a label:

const obj = sheet.object('key', {

message: types.string('Animation Loading', {

// override the label given in the Details Panel and DopeSheet

label: 'The Message',

}),

})`

### #types.stringLiteral(default, opts?)

The string literal prop

The `stringLiteral` prop type is useful for building menus or radio buttons.

`// Basic usage

const obj = sheet.object('key', {

light: types.stringLiteral(

'r',

// Specify labels for the specific values given in the Details Panel and Keyframe Editor

{ r: 'Red', g: 'Green' },

),

})

// Shown as a radio switch with a custom label

const obj = sheet.object(

'key',

{

light: types.stringLiteral('r', { r: 'Red', g: 'Green' }),

},

// Optionally pass in prop options

{ as: 'switch', label: 'Street Light' },

)`

### #types.rgba(default?)

The rgba (color) prop

The `rgba` type holds a color value.
In the editor UI, it supports all the [syntax variants of `<hex-color>`](https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color#syntax%7D):

`#RGB // The three-value syntax

#RGBA // The four-value syntax

#RRGGBB // The six-value syntax

#RRGGBBAA // The eight-value syntax`

`const obj = sheet.object('key', {

color: types.rgba({ r: 255, g: 0, b: 0, a: 1 }),

})`

### #types.image(default, opts?)Since 0.6.0

An image prop type.
This prop type may take [a custom interpolator](https://www.theatrejs.com/docs/latest/manual/prop-types#docs-500-api-100-core-custom-interpolators) as an option.

Image props are asset props, meaning their values are asset handles that can be used to [retrieve a URL for that asset](https://www.theatrejs.com/docs/latest/manual/prop-types#project.getasseturl_assethandle_).

The default value for image props is the id of the default asset. If you don't know the id, an empty string or `undefined` represents the lack of an assigned asset.

`const texture = types.image('', {

label: 'Texture',

})`

## #Playground

You can play with the available prop types here:
<https://theatre-playground.vercel.app/shared/dom>.

## #Learn more

Look at [Prop Types in the API Reference](https://www.theatrejs.com/docs/latest/api/core#prop-types) for a closer look at the code.

Want to learn more?
Take a look at some more in-depth topics from [our manual](https://www.theatrejs.com/docs/latest/manual):

### Projects

This guide covers creating projects, managing their states, saving and loading their states, and more.

### Sheets

This guide covers Sheets in Theatre.js

### Sheet Objects

This guide covers Sheet Objects in Theatre.js.

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
[Edit this page](https://github.com/theatre-js/website/blob/main/content/docs/0.5/300-manual/130-prop-types.mdx)

#### On this page

* [What are props?](https://www.theatrejs.com/docs/latest/manual/prop-types#what-are-props)
* [Property types](https://www.theatrejs.com/docs/latest/manual/prop-types#property-types)
* [number()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.number_default-opts_)
* [compound()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.compound_props-opts_)
* [boolean()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.boolean_default-opts_)
* [string()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.string_default-opts_)
* [stringLiteral()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.stringliteral_default-opts_)
* [rgba()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.rgba_default_)
* [image()](https://www.theatrejs.com/docs/latest/manual/prop-types#types.image_default-opts_)
* [Playground](https://www.theatrejs.com/docs/latest/manual/prop-types#playground)
* [Learn more](https://www.theatrejs.com/docs/latest/manual/prop-types#learn-more)
