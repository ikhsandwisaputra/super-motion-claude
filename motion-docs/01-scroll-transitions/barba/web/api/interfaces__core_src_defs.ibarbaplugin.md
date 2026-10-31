---
source: https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html
title: "IBarbaPlugin | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/defs](https://barba.js.org/api/modules/core_src_defs.html)
* [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)

# Interface IBarbaPlugin<T>

### Type parameters

* #### T

### Hierarchy

* IBarbaPlugin

### Implemented by

* [Css](https://barba.js.org/api/classes/css_src.css.html)
* [Prefetch](https://barba.js.org/api/classes/prefetch_src.prefetch.html)
* [Router](https://barba.js.org/api/classes/router_src.router.html)

## Index

### Properties

* [name](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html#name)
* [version](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html#version)

### Methods

* [init](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html#init)
* [install](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html#install)

## Properties

### name

name: string

Plugin name

### version

version: string

Plugin version

## Methods

### init

* init(): void

* Init method

  #### Returns void

### install

* install(barba: [Core](https://barba.js.org/api/classes/core_src.core.html), options?: T): void

* Install method

  #### Parameters

  + ##### barba: [Core](https://barba.js.org/api/classes/core_src.core.html)
  + ##### Optional options: T

  #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
