---
source: https://paperjs.org/reference/paperscope/
title: "Paper.js — PaperScope"
fetched: 2026-10-28
---

# PaperScope

The `PaperScope` class represents the scope associated with a Paper context. When working with PaperScript, these scopes are automatically created for us, and through clever scoping the properties and methods of the active scope seem to become part of the global scope.

When working with normal JavaScript code, `PaperScope` objects need to be manually created and handled.

Paper classes can only be accessed through `PaperScope` objects. Thus in PaperScript they are global, while in JavaScript, they are available on the global [paper](https://paperjs.org/reference/global#paper) object. For JavaScript you can use [paperScope.install(scope)](https://paperjs.org/reference/paperscope#install-scope) to install the Paper classes and objects on the global scope. Note that when working with more than one scope, this still works for classes, but not for objects like [paperScope.project](https://paperjs.org/reference/paperscope#project), since they are not updated in the injected scope if scopes are switched.

The global [paper](https://paperjs.org/reference/global#paper) object is simply a reference to the currently active `PaperScope`.

## Constructors

[**PaperScope**()](https://paperjs.org/reference/paperscope/#paperscope)

Creates a PaperScope object.

#### Returns:

* [PaperScope](https://paperjs.org/reference/paperscope)

## Properties

[**version**](https://paperjs.org/reference/paperscope/#version)

The version of Paper.js, as a string.

Read only.

#### Type:

* String

[**settings**](https://paperjs.org/reference/paperscope/#settings)

Gives access to paper’s configurable settings.

#### Type:

* Object

#### Options:

* settings.insertItems: Boolean — controls whether newly created items are automatically inserted into the scene graph, by adding them to [project.activeLayer](https://paperjs.org/reference/project#activelayer) — default: true
* settings.applyMatrix: Boolean — controls what value newly created items have their [item.applyMatrix](https://paperjs.org/reference/item#applymatrix) property set to (Note that not all items can set this to `false`) — default: true
* settings.handleSize: Number — the size of the curve handles when drawing selections — default: 4
* settings.segmentSize: Number — the size of the segments when drawing selections, or `null` to use `settings.handleSize`, e.g. with `handleSize: 0` to only draw the segments and not their handles — default: null
* settings.hitTolerance: Number — the default tolerance for hit- tests, when no value is specified, and for the mouse events of items — default: 0
* settings.scaleStrokes: Boolean — controls whether applying a matrix to the content of paths and compound paths also scales their [style.strokeWidth](https://paperjs.org/reference/style#strokewidth), by the geometric mean of the scale factors for non-uniform scaling. Items that keep their matrix, with [item.applyMatrix](https://paperjs.org/reference/item#applymatrix) set to `false`, scale their strokes when drawing anyway, unless [style.strokeScaling](https://paperjs.org/reference/style#strokescaling) is `false` — default: false

[**project**](https://paperjs.org/reference/paperscope/#project)

The currently active project.

#### Type:

* [Project](https://paperjs.org/reference/project)

[**projects**](https://paperjs.org/reference/paperscope/#projects)

The list of all open projects within the current Paper.js context.

#### Type:

* Array of [Project](https://paperjs.org/reference/project) objects

[**view**](https://paperjs.org/reference/paperscope/#view)

The reference to the active project’s view.

Read only.

#### Type:

* [View](https://paperjs.org/reference/view)

[**tool**](https://paperjs.org/reference/paperscope/#tool)

The reference to the active tool.

#### Type:

* [Tool](https://paperjs.org/reference/tool)

[**tools**](https://paperjs.org/reference/paperscope/#tools)

The list of available tools.

#### Type:

* Array of [Tool](https://paperjs.org/reference/tool) objects

## Methods

[**execute**(code[, options])](https://paperjs.org/reference/paperscope/#execute-code)

Compiles the PaperScript code into a compiled function and executes it. The compiled function receives all properties of this [PaperScope](https://paperjs.org/reference/paperscope) as arguments, to emulate a global scope with unaffected performance. It also installs global view and tool handlers automatically on the respective objects.

#### Options:

* options.url: String — the url of the source, for source-map debugging
* options.source: String — the source to be used for the source- mapping, in case the code that’s passed in has already been mingled.

#### Parameters:

* code:
  String
  — the PaperScript code
* options:
  Object
  — the compilation options
  — optional

[**install**(scope)](https://paperjs.org/reference/paperscope/#install-scope)

Injects the paper scope into any other given scope. Can be used for example to inject the currently active PaperScope into the window’s global scope, to emulate PaperScript-style globally accessible Paper classes and objects.

**Please note:** Using this method may override native constructors (e.g. Path). This may cause problems when using Paper.js in conjunction with other libraries that rely on these constructors. Keep the library scoped if you encounter issues caused by this.

#### Parameters:

* scope:

#### Example:

```
paper.install(window);
```

[**setup**(element)](https://paperjs.org/reference/paperscope/#setup-element)

Sets up an empty project for us. If a canvas is provided, it also creates a [View](https://paperjs.org/reference/view) for it, both linked to this scope.

#### Parameters:

* element:
  HTMLCanvasElement⟋String⟋[Size](https://paperjs.org/reference/size)
  — the HTML canvas element this scope should be associated with, or an ID string by which to find the element, or the size of the canvas to be created for usage in a web worker.

[**createCanvas**(width, height)](https://paperjs.org/reference/paperscope/#createcanvas-width-height)

Creates a canvas of the given size, or reuses one that was released internally.

#### Parameters:

* width:
  Number
  — the width of the canvas
* height:
  Number
  — the height of the canvas

#### Returns:

* HTMLCanvasElement — the canvas

[**activate**()](https://paperjs.org/reference/paperscope/#activate)

Activates this PaperScope, so all newly created items will be placed in its active project.

[**clear**()](https://paperjs.org/reference/paperscope/#clear)

Removes all projects, views and tools of this scope, along with their installed event handlers.

[**remove**()](https://paperjs.org/reference/paperscope/#remove)

Clears this scope and removes it from the list of scopes.

## Static Methods

[**PaperScope.get**(id)](https://paperjs.org/reference/paperscope/#get-id)

Retrieves a PaperScope object with the given scope id.

#### Parameters:

* id:

#### Returns:

* [PaperScope](https://paperjs.org/reference/paperscope)
