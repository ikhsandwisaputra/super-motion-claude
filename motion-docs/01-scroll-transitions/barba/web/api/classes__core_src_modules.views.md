---
source: https://barba.js.org/api/classes/core_src_modules.views.html
title: "Views | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.views.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.views.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Views](https://barba.js.org/api/classes/core_src_modules.views.html)

# Class Views

### Hierarchy

* Views

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src_modules.views.html#constructor)

### Properties

* [byNamespace](https://barba.js.org/api/classes/core_src_modules.views.html#bynamespace)
* [names](https://barba.js.org/api/classes/core_src_modules.views.html#names)

### Methods

* [\_createHook](https://barba.js.org/api/classes/core_src_modules.views.html#_createhook)

## Constructors

### constructor

* new Views(views: [IView](https://barba.js.org/api/interfaces/core_src_defs.iview.html)[]): [Views](https://barba.js.org/api/classes/core_src_modules.views.html)

* Init views.

  #### Parameters

  + ##### views: [IView](https://barba.js.org/api/interfaces/core_src_defs.iview.html)[]

  #### Returns [Views](https://barba.js.org/api/classes/core_src_modules.views.html)

## Properties

### byNamespace

byNamespace: Map<string, [IView](https://barba.js.org/api/interfaces/core_src_defs.iview.html)> = new Map()

Registered views by namespace.

### names

names: [HooksView](https://barba.js.org/api/modules/core_src_defs.html#hooksview)[] = ['beforeLeave','afterLeave','beforeEnter','afterEnter',]

Available hook names for views.

## Methods

### Private \_createHook

* \_createHook(name: [HooksView](https://barba.js.org/api/modules/core_src_defs.html#hooksview)): [Hook](https://barba.js.org/api/modules/core_src_modules.html#hook)

* Create the hook method.

  + get view based on namespace
  + execute callback with transition data

  #### Parameters

  + ##### name: [HooksView](https://barba.js.org/api/modules/core_src_defs.html#hooksview)

  #### Returns [Hook](https://barba.js.org/api/modules/core_src_modules.html#hook)

Generated using [TypeDoc](https://typedoc.org/)
