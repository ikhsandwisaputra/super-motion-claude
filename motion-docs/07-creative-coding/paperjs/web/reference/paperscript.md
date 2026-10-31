---
source: https://paperjs.org/reference/paperscript/
title: "Paper.js — PaperScript"
fetched: 2026-10-28
---

# PaperScript

## Static Methods

[**PaperScript.compile**(code[, options])](https://paperjs.org/reference/paperscript/#compile-code)

Compiles PaperScript code into JavaScript code.

#### Options:

* options.url: String — the url of the source, for source-map generation
* options.source: String — the source to be used for the source- mapping, in case the code that’s passed in has already been mingled.

#### Parameters:

* code:
  String
  — the PaperScript code
* options:
  Object
  — the compilation options
  — optional

#### Returns:

* Object — an object holding the compiled PaperScript translated into JavaScript code along with source-maps and other information.

[**PaperScript.execute**(code, scope[, options])](https://paperjs.org/reference/paperscript/#execute-code-scope)

Compiles the PaperScript code into a compiled function and executes it. The compiled function receives all properties of the passed [PaperScope](https://paperjs.org/reference/paperscope) as arguments, to emulate a global scope with unaffected performance. It also installs global view and tool handlers automatically on the respective objects.

#### Options:

* options.url: String — the url of the source, for source-map generation
* options.source: String — the source to be used for the source- mapping, in case the code that’s passed in has already been mingled.
* options.handlers: Array of Strings — the names of further global handlers to export next to `onFrame`, `onResize` and the tool’s handlers, for hosts that call them themselves
* options.load: Function — the loader for static `import` statements, called with the specifier as written and the `options.url` of the importing script, and returning the module’s exports, e.g. the result of executing it. Modules with ES `export` statements have their default export as `default` and are marked with `__esModule`, so `import x` receives the default export, and for CommonJS-style exports the whole exports. `import * as x` receives all exports, and for CommonJS-style exports, these as `default` too. Dynamic `import(specifier)` resolves to that namespace as a Promise, and its loader may return a Promise as well. The loader runs each module once and handles cycles. Parsing `import` requires a current Acorn as `self.acorn`
  Code with top-level `await` runs as an async function. `execute()` then returns a Promise of the exports, and installs the global handlers once it resolves. Parsing it requires a current Acorn as `self.acorn`.

#### Parameters:

* code:
  String
  — the PaperScript code
* scope:
  [PaperScope](https://paperjs.org/reference/paperscope)
  — the scope for which the code is executed
* options:
  Object
  — the compilation options
  — optional

#### Returns:

* Object⟋Promise — the exports defined in the executed code, or with top-level `await`, a Promise of them

[**PaperScript.load**([script])](https://paperjs.org/reference/paperscript/#load)

Loads, compiles and executes PaperScript code in the HTML document. Note that this method is executed automatically for all scripts in the document through a window load event. You can optionally call it earlier (e.g. from a DOM ready event), or you can mark scripts to be ignored by setting the attribute `ignore="true"` or `data-paper-ignore="true"`, and call the `PaperScript.load(script)` method for each script separately when needed.

#### Parameters:

* script:
  HTMLScriptElement
  — the script to load. If none is provided, all scripts of the HTML document are iterated over and loaded
  — optional, default: null

#### Returns:

* [PaperScope](https://paperjs.org/reference/paperscope) — the scope produced for the passed `script`, or `undefined` of multiple scripts area loaded
