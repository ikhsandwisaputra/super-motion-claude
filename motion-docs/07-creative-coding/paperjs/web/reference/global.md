---
source: https://paperjs.org/reference/global/
title: "Paper.js — global"
fetched: 2026-10-28
---

# Global Scope

When code is executed as PaperScript, the script’s scope is populated with all fields of the currently active [PaperScope](https://paperjs.org/reference/paperscope) object, which within the script appear to be global.

In a JavaScript context, only the [paper](https://paperjs.org/reference/global#paper) variable is added to the global scope, referencing the currently active [PaperScope](https://paperjs.org/reference/paperscope) object, through which all properties and Paper.js classes can be accessed.

## Properties

[**paper**](https://paperjs.org/reference/global/#paper)

A reference to the currently active [PaperScope](https://paperjs.org/reference/paperscope) object.

#### Type:

* [PaperScope](https://paperjs.org/reference/paperscope)

### Global PaperScript Properties

[**project**](https://paperjs.org/reference/global/#project)

The project for which the PaperScript is executed.

Note that when working with multiple projects, this does not necessarily reflect the currently active project. For this, use [paperScope.project](https://paperjs.org/reference/paperscope#project) instead.

#### Type:

* [Project](https://paperjs.org/reference/project)

[**projects**](https://paperjs.org/reference/global/#projects)

The list of all open projects within the current Paper.js context.

#### Type:

* Array of [Project](https://paperjs.org/reference/project) objects

[**view**](https://paperjs.org/reference/global/#view)

The reference to the project’s view.

Note that when working with multiple projects, this does not necessarily reflect the view of the currently active project. For this, use [paperScope.view](https://paperjs.org/reference/paperscope#view) instead.

Read only.

#### Type:

* [View](https://paperjs.org/reference/view)

[**tool**](https://paperjs.org/reference/global/#tool)

The reference to the tool object which is automatically created when global tool event handlers are defined.

Note that when working with multiple tools, this does not necessarily reflect the currently active tool. For this, use [paperScope.tool](https://paperjs.org/reference/paperscope#tool) instead.

#### Type:

* [Tool](https://paperjs.org/reference/tool)

[**tools**](https://paperjs.org/reference/global/#tools)

The list of available tools.

#### Type:

* Array of [Tool](https://paperjs.org/reference/tool) objects

### PaperScript View Event Handlers

[**onFrame**](https://paperjs.org/reference/global/#onframe)

A global reference to the [view.onFrame](https://paperjs.org/reference/view#onframe) handler function.

#### Type:

* Function

[**onResize**](https://paperjs.org/reference/global/#onresize)

A reference to the [view.onResize](https://paperjs.org/reference/view#onresize) handler function.

#### Type:

* Function

### PaperScript Tool Event Handlers

[**onMouseDown**](https://paperjs.org/reference/global/#onmousedown)

A reference to the [tool.onMouseDown](https://paperjs.org/reference/tool#onmousedown) handler function.

#### Type:

* Function

[**onMouseDrag**](https://paperjs.org/reference/global/#onmousedrag)

A reference to the [tool.onMouseDrag](https://paperjs.org/reference/tool#onmousedrag) handler function.

#### Type:

* Function

[**onMouseMove**](https://paperjs.org/reference/global/#onmousemove)

A reference to the [tool.onMouseMove](https://paperjs.org/reference/tool#onmousemove) handler function.

#### Type:

* Function

[**onMouseUp**](https://paperjs.org/reference/global/#onmouseup)

A reference to the [tool.onMouseUp](https://paperjs.org/reference/tool#onmouseup) handler function.

#### Type:

* Function

### Keyboard Event Handlers (for PaperScript)

[**onKeyDown**](https://paperjs.org/reference/global/#onkeydown)

A reference to the [tool.onKeyDown](https://paperjs.org/reference/tool#onkeydown) handler function.

#### Type:

* Function

[**onKeyUp**](https://paperjs.org/reference/global/#onkeyup)

A reference to the [tool.onKeyUp](https://paperjs.org/reference/tool#onkeyup) handler function.

#### Type:

* Function
