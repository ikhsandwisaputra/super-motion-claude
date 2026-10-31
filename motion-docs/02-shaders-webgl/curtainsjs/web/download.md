---
source: https://www.curtainsjs.com/download.html
title: "curtains.js | Download"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# Download

[curtains.umd.js v8.1 (346Ko)](https://www.curtainsjs.com/dist/curtains.umd.js "download curtains.js v8.1") - [curtains.umd.min.js v8.1 (122Ko)](https://www.curtainsjs.com/dist/curtains.umd.min.js "download curtains.umd.min.js v8.1") - [Github](https://github.com/martinlaxenaire/curtainsjs "curtains.js on Github").

![](https://www.curtainsjs.com/images/intro-background.jpg)

## Changelog

### Version 7.0

Version 7.0 has been totally rewritten using ES6 class modules to improve readability and maintainability. It will also enable the ability to tree shake the library when packing your production builds (i.e. not including unused classes in your final build).

There are very few breaking changes, however you should still have a look at the [migration guide](https://www.curtainsjs.com/migration-guide-to-v7.html) and the updated [documentation](https://www.curtainsjs.com/documentation.html).

* Broken into multiple modules. **addPlane()**, **addRenderTarget()** and **addShaderPass()** are deprecated and you should use the class constructors now instead (i.e. **new Plane()**, **new RenderTarget()**, **new ShaderPass()**).
  Following this logic, **removePlane()**, **removeRenderTarget()** and **removeShaderPass()** are also deprecated, you should now use the **remove()** methods of those classes.
* Textures have been greatly improved, with the ability to preload medias thanks to the [TextureLoader class](https://www.curtainsjs.com/texture-loader-class.html). You can also set each texture parameters now, like **minFilter**, **magFilter**, **wrapS**, **wrapT**, **premulitplyAlpha**, **anisotropy**, use floating point textures, etc.
* Introducing math classes for vectors, matrix and quaternion calculations: [Vec2](https://www.curtainsjs.com/vec-2-class.html), [Vec3](https://www.curtainsjs.com/vec-3-class.html), [Mat4](https://www.curtainsjs.com/mat-4-class.html) and [Quat](https://www.curtainsjs.com/quat-class.html) classes.
* Added a few useful extras classes as well: [PingPongPlane](https://www.curtainsjs.com/ping-pong-plane-class.html) and [FXAAPass](https://www.curtainsjs.com/fxaa-pass-class.html). Hopefully there will be more to come.

### Version 6.0

Version 6.0 has a totally renewed way to handle perspective using a real perspective camera approach for each plane. Modifying the field of view will now have a much greater impact on the perceived perspective.

* New way to handle perspective.
* Improved planes rotation (using Euler angles with "XYZ" as axis order). Also, planes now have a transform origin Z property as well.
* Introducing [face culling](https://www.curtainsjs.com/plane-class.html#cull-face) for each plane.
* Planes, shader passes, render targets and textures now have a unique identifier (uuid) property.
* Fixed [moveToFront()](https://www.curtainsjs.com/plane-class.html#move-to-front) method and minor bugs.

### Version 5.0

Version 5.0 introduces [RenderTarget](https://www.curtainsjs.com/render-target-class.html) class. It allows you to render any plane as a texture by setting it a render target. The [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) class now also use that class internally.
It also now uses **WebGL2** whenever possible.
As usual, there are no breaking changes so you can update safely to this version.

* New RenderTarget class.
* New [setFromTexture](https://www.curtainsjs.com/texture-class.html#set-from-texture) method to copy a texture into another texture.
* Planes now have a [transform origin](https://www.curtainsjs.com/plane-class.html#transform-origin) property that you can change anytime with the [setTransformOrigin](https://www.curtainsjs.com/plane-class.html#set-transform-origin) method.
* Possibility to set the alpha and premultiplied alpha WebGL context options on init.
* A lot of performance improvements by reducing the number of WebGL calls and bugs fixes.

### Version 4.0

Version 4.0 introduces optional native scroll handling (planes position are automatically updated when the users scrolls), but it also lets you define if you want to listen to the resize event or use the internal request animation frame loop. With those options you can chose to handle those things by yourself and therefore improve performance by keeping a single resize or request animation frame loop for your websites.
The Curtains object now accepts an object as [init params](https://www.curtainsjs.com/curtains-class.html#curtains-init-params).

* New Curtains object initial parameters with the ability to define which events you want to listen to.
* A few new helper methods and event to handle scroll related things.
* Real frustum culling to draw only the planes that actually need to be render. Comes with a handy [drawCheckMargins](https://www.curtainsjs.com/plane-class.html#draw-check-margins) parameter in case you are displacing vertices positions in your vertex shader.
* Performance improvements and bugs fixes.

### Version 3.0

Version 3.0 introduces post processing effects and a few more helpers.
There are no breaking changes since v2.0 so you can update it safely.

* Major code refactoring to introduce [ShaderPass](https://www.curtainsjs.com/shader-pass-class.html) class by creating a BasePlane class. Usual [Plane](https://www.curtainsjs.com/plane-class.html) class now extends BasePlane class, as does ShaderPass class.
* Added a bunch of new events and methods, like [onAfterResize](https://www.curtainsjs.com/plane-class.html#on-after-resize) or [getBoundingRect](https://www.curtainsjs.com/plane-class.html#get-bounding-rect).
* Minor bugs fixes.

### Version 2.0

* Added a [Texture](https://www.curtainsjs.com/texture-class.html) class object and introduced texture matrices as well.
* Code structure refactored and cleaned.
* Internal maths and object properties have been rewritten for a cleaner and more readable code.
* Improved performance on both loading and rendering time.
* Minor bugs fixes.

## About

This library is released under the MIT license which means it is free to use for personnal and commercial projects.

All images used in the examples were taken by [Marion Bornaz](https://marionbornaz.com/ "Marion Bornaz") during the [Mirage Festival](https://www.miragefestival.com/ "Mirage Festival").

All examples video footages were shot by [Analogue Production](https://analogueprod.com/ "Analogue Production").

Many thanks to [webglfundamentals.org](https://webglfundamentals.org/ "webglfundamentals.org") tutorials which helped me a lot.

Author of this library is [Martin Laxenaire](https://www.martin-laxenaire.fr/ "Martin Laxenaire"), a french creative front-end developper based in Lyon.
Found a bug ? Have questions ? Do not hesitate to [email me](mailto:martin.laxenaire@gmail.com "contact me"), [fill an issue on Github](https://github.com/martinlaxenaire/curtainsjs/issues "Fill an issue on Github") or send me a tweet : [@martinlaxenaire](https://twitter.com/martinlaxenaire "My twitter").
