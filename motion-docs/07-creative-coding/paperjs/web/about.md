---
source: https://paperjs.org/about/
title: "Paper.js — About"
fetched: 2026-10-28
---

# About

Paper.js — The Swiss Army Knife of Vector Graphics Scripting.

![](https://paperjs.org/about/paper-js.gif)

Paper.js is an open source vector graphics scripting framework that runs on top of the HTML5 Canvas. It offers a clean Scene Graph / Document Object Model and a lot of powerful functionality to create and work with vector graphics and bezier curves, all neatly wrapped up in a well designed, consistent and clean programming interface.

![](https://paperjs.org/about/scriptographer.jpg)

Paper.js is based on and largely compatible with [Scriptographer](http://scriptographer.org), a scripting environment for Adobe Illustrator with an active community of scripters and more than 10 years of development.

Paper.js is easy to learn for beginners and has lots to master for intermediate and advanced users.

Paper.js is developed by [Jürg Lehni](http://lehni.org) & [Jonathan Puckey](http://jonathanpuckey.com), and distributed under the permissive [MIT License](https://paperjs.org/license/).

## Getting Started

* First of all, take a look at some of our [examples](https://paperjs.org/examples/).
* [Download](https://paperjs.org/download/) Paper.js or check out the latest version from our [Github Repository](http://github.com/paperjs/paper.js).
* Want to learn Paper.js? Why not start now with one of our [Tutorials](https://paperjs.org/tutorials/).
* If you have any questions or comments, please join the [mailing list](http://groups.google.com/group/paperjs).
* To stay up to date, [follow us on Twitter](http://twitter.com/paperjs).

## Overview

Paper.js is not simply a wrapper around the Canvas, it offers much more:

* A Scene Graph / Document Object Model for vector graphics: Work with nested layers, groups, paths, compound paths, rasters, symbols etc.
* The handling and drawing of these graphic items is automatic and optimised, allowing you to construct or modify your items and styles and leave the drawing commands to Paper.js.
* A well designed and battle hardened Application Programming Interface (API).
* PaperScript, a simple extension of JavaScript, allowing the scoped execution of scripts without polluting the global scope, the execution of multiple scripts per page in their separate sand-boxed scopes while sharing the library code, and adding support for operator overloading to any object.
* There is a good reason for the word Vector in Vector Graphics. Paper.js treats Vector Mathematics as a first class citizen by making working with vectors and geometries as simple as possible through its core types such as [Point](https://paperjs.org/reference/point), [Size](https://paperjs.org/reference/size) and [Rectangle](https://paperjs.org/reference/rectangle). The manipulation of [Point](https://paperjs.org/reference/point) and [Size](https://paperjs.org/reference/size) objects is further simplified in PaperScript, where direct math operations using normal operator syntax are possible on such objects as if they were plain numbers.
* Construct paths and manipulate their curves and segments in very convenient and fine-grained ways.
* Inspect and manipulate the precise bounding box of any item, supporting complicated stroke styles with different stroke ends and miter limits.
* Smoothen curves, and simplify path segments by fitting curves through points.
* Simulate dashed strokes which are currently lacking from the Canvas object, at near native drawing speed.
* Most blend modes known from Illustrator and Photoshop supported through emulation in JavaScript: multiply, screen, overlay, soft-light, hard-light, color-dodge, color-burn, darken, lighten, difference, exclusion, hue, saturation, luminosity, color, add, subtract, average & negation.

Read our [tutorials](https://paperjs.org/tutorials/) to learn more about the features of Paper.js.

## Browser Support

Paper.js is aimed at modern browsers with support for the Canvas object and EcmaScript 5. Even though in theory it is possible to write code that works in older browsers (Yes Explorer 8 and below, we are looking at you!), we currently do not support them out of the box. Let’s go forward!
