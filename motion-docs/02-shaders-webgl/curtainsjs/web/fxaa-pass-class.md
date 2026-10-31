---
source: https://www.curtainsjs.com/fxaa-pass-class.html
title: "curtains.js | Documentation | FXAAPass class"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# FXAAPass class

[Source code](https://github.com/martinlaxenaire/curtainsjs/blob/master/src/extras/FXAAPass.js "FXAAPass class source code")

## Basic usage

The FXAAPass lets you easily add a **Fast Approximate Anti-Aliasing** pass to your scene.
The FXAAPass class extends the [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) class, inheriting from all its methods and properties.

The fragment shader code used for that FXAA pass has been taken from here:
<https://github.com/spite/Wagner/blob/master/fragment-shaders/fxaa-fs.glsl>

To create a FXAAPass, just use its constructor:

// "canvas" is the ID of our HTML container element

const curtains = new Curtains({

container: "canvas"

});

// create our FXAA pass using our curtains object

const fxaaPass = new FXAAPass(curtains);

## Parameters

To create a FXAAPass you will have to pass your curtains object as the first parameter.
You can add an additional parameter object in which you can pass the following [ShaderPass parameters](https://www.curtainsjs.com/shader-pass-class.html#shader-pass-parameters) options: **clear, depth, depthTest, renderOrder, renderTarget, texturesOptions**.
