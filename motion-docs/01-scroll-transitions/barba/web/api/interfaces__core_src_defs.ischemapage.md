---
source: https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html
title: "ISchemaPage | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/defs](https://barba.js.org/api/modules/core_src_defs.html)
* [ISchemaPage](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html)

# Interface ISchemaPage

[### Define "page" data structure.](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#define-quotpagequot-data-structure)

Used by `data.current` and `data.next`.
Set to `undefined` until values are available.

param
:   Barba container element

param
:   Full stringified HTML

param
:   Namespace

param
:   URL

param
:   Route name (with `@barba/router`)

### Hierarchy

* ISchemaPage

## Index

### Properties

* [container](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#container)
* [html](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#html)
* [namespace](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#namespace)
* [route](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#route)
* [url](https://barba.js.org/api/interfaces/core_src_defs.ischemapage.html#url)

## Properties

### container

container: HTMLElement

### html

html: string

### namespace

namespace: string

### Optional route

route: [IRouteResolved](https://barba.js.org/api/interfaces/core_src_defs.irouteresolved.html) | null

### url

url: [IUrlFull](https://barba.js.org/api/interfaces/core_src_defs.iurlfull.html)

Generated using [TypeDoc](https://typedoc.org/)
