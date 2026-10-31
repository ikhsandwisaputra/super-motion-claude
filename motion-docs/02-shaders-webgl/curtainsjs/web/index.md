---
source: https://www.curtainsjs.com/index.html
title: "curtains.js | Home"
fetched: 2026-10-28
---

[curtains.js](https://www.curtainsjs.com/ "Home")

# curtains.js

## easy WebGL tool to animate images and videos

![](https://www.curtainsjs.com/images/intro-background.jpg)

## What is it ?

Shaders are the new front-end web development big thing, with
the ability to create very powerful 3D interactions and
animations. A lot of very good javascript libraries already
handle WebGL but with most of them it's kind of a headache to
position your meshes relative to the DOM elements of your web
page.

curtains.js was created with just that issue in mind. It is a
small vanilla WebGL javascript library that converts HTML
elements containing images, videos and canvases into 3D WebGL
textured planes, allowing you to animate them via shaders.

You can define each plane size and position via CSS, which makes
it super easy to add WebGL responsive planes all over your
pages.

You can also add post processing effects to your scene to spice
up the whole thing.

Be sure to check the
[documentation](https://www.curtainsjs.com/documentation.html "curtains.js documentation")
and examples to see what's possible.

## Download

[curtains.umd.js v8.1 (346Ko)](https://www.curtainsjs.com/dist/curtains.umd.js "download curtains.js v8.1")
-
[curtains.umd.min.js v8.1 (122Ko)](https://www.curtainsjs.com/dist/curtains.umd.min.js "download curtains.umd.min.js v8.1")
-
[Github](https://github.com/martinlaxenaire/curtainsjs "curtains.js on Github").

## Examples

All the examples are fully commented: do not hesitate to have a
look at the source code.

### Images

[Vertex coordinates helper](https://www.curtainsjs.com/examples/vertex-coords-helper/index.html "Vertex coordinates helper")
[Plane properties and transformations cheat sheet](https://www.curtainsjs.com/examples/plane-properties-transforms-cheat-sheet/index.html "Plane properties and transformations cheat sheet")
[Simple plane](https://www.curtainsjs.com/examples/simple-plane/index.html "Simple plane")
[Slideshow with a displacement shader](https://www.curtainsjs.com/examples/multiple-textures/index.html "Slideshow with a displacement shader")
[Multiple planes](https://www.curtainsjs.com/examples/multiple-planes/index.html "Multiple planes")
[Multiple planes scroll effect : rotation, scale and
parallax](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect/index.html "Multiple planes scroll effect : rotation, scale and parallax")
[Asynchronous textures loading](https://www.curtainsjs.com/examples/asynchronous-textures/index.html "Asynchronous textures loading")
[AJAX navigation with plane removal](https://www.curtainsjs.com/examples/ajax-navigation-with-plane-removal/index.html "AJAX navigation with plane removal")

### Videos

[Simple video plane](https://www.curtainsjs.com/examples/simple-video-plane/index.html "Simple video plane")
[Multiple video textures with a displacement shader](https://www.curtainsjs.com/examples/multiple-video-textures/index.html "Multiple video textures")

### Canvas

[Simple canvas plane](https://www.curtainsjs.com/examples/simple-canvas-plane/index.html "Simple canvas plane")
[Text planes using canvas](https://www.curtainsjs.com/examples/multiple-planes-canvas-text/index.html "Text planes using canvas")

### Post processing

[Post processing displacement effect](https://www.curtainsjs.com/examples/post-processing-displacement/index.html "Post processing displacement effect")
[Post processing multiple passes](https://www.curtainsjs.com/examples/post-processing-scroll-effect/index.html "Post processing multiple passes")
[Post processing scrolling wheel with custom transform
origin](https://www.curtainsjs.com/examples/post-processing-transform-origin/index.html "Post processing scrolling wheel with custom transform origin")

### Advanced render targets usage

[Ping pong shading / FBOs swapping flowmap example](https://www.curtainsjs.com/examples/ping-pong-shading-flowmap/index.html "Ping pong shading flowmap example")
[Selective shader passes using render targets](https://www.curtainsjs.com/examples/render-passes-using-render-targets/index.html "Selective shader passes using render targets")
[GSAP click to fullscreen gallery](https://www.curtainsjs.com/examples/gsap-click-to-fullscreen-gallery/index.html "GSAP click to fullscreen gallery")

### Custom scroll

[Multiple planes scroll effect with Locomotive scroll](https://www.curtainsjs.com/examples/multiple-planes-scroll-effect-custom-scroll/index.html "Multiple planes scroll effect with Locomotive scroll")

## Knowledge and technical requirements

It is easy to use but you will of course have to possess good
basics of HTML, CSS and javascript.

If you've never heard about shaders, you may want to learn a bit
more about them on
[The Book of Shaders](https://thebookofshaders.com/ "The Book of Shaders")
for example. You will have to understand what are the vertex and
fragment shaders, the use of uniforms as well as the GLSL syntax
basics.

## Installation

Using npm:

npm i curtainsjs

Load ES modules:

import {Curtains,
Plane}
from
'curtainsjs';

See the [documentation](https://www.curtainsjs.com/documentation.html) for a
complete list of all classes availables.

In a browser, you can use the UMD files located in the 'dist'
directory:

<script src="dist/curtains.umd.min.js"></script>

// "canvas" is the ID of our HTML container element

const curtains =
new
Curtains({

container:
"canvas"

});

const plane =
new
Plane(curtains,
document.getElementById("my-plane"));

### Usage with React & Vue

Note that if you are using React or Vue, you might want to try
[react-curtains](https://github.com/martinlaxenaire/react-curtains "react-curtains")
or
[vue-curtains](https://github.com/martinlaxenaire/vue-curtains "vue-curtains"), curtains.js official React and Vue packages.

## About

This library is released under the MIT license which means it is
free to use for personnal and commercial projects.

All images used in the examples were taken by
[Marion Bornaz](https://marionbornaz.com/ "Marion Bornaz")
during the
[Mirage Festival](https://www.miragefestival.com/ "Mirage Festival").

All examples video footages were shot by
[Analogue Production](https://analogueprod.com/ "Analogue Production").

Many thanks to
[webglfundamentals.org](https://webglfundamentals.org/ "webglfundamentals.org")
tutorials which helped me a lot.

Author of this library is
[Martin Laxenaire](https://www.martin-laxenaire.fr/ "Martin Laxenaire"), a french creative front-end developper based in Lyon.
Found a bug ? Have questions ? Do not hesitate to
[email me](mailto:martin.laxenaire@gmail.com "contact me"),
[fill an issue on Github](https://github.com/martinlaxenaire/curtainsjs/issues "Fill an issue on Github")
or send me a tweet :
[@martinlaxenaire](https://twitter.com/martinlaxenaire "My twitter").

## Showcase

Here you'll find websites that use curtains.js with their own
custom shaders. You can also check all the
[Awwwards' submitted websites using it](https://www.awwwards.com/websites/curtains/ "Websites using curtains.js on Awwwards").

[![Martin Laxenaire](https://www.curtainsjs.com/images/curtains-js-martin-laxenaire.jpg)](https://www.martin-laxenaire.fr/ "Martin Laxenaire")
[![Jonathan Alpmyr](https://www.curtainsjs.com/images/curtains-js-jonathan-alpmyr.jpg)](https://jonathanalpmyr.com/ "Jonathan Alpmyr")
[![Mirage Festival 2019](https://www.curtainsjs.com/images/curtains-js-mirage-festival-2019.jpg)](https://www.miragefestival.com/2019/ "Mirage Festival 2019")
[![Benjamin HÃ©non](https://www.curtainsjs.com/images/curtains-js-benjamin-henon.jpg)](https://www.benjaminhenon.com/ "Benjamin HÃ©non")
