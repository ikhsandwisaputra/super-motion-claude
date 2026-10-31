---
source: https://barba.js.org/api/classes/prefetch_src.prefetch.html
title: "Prefetch | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/prefetch_src.prefetch.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/prefetch_src.prefetch.html)

* [Globals](https://barba.js.org/api/globals.html)
* [prefetch/src](https://barba.js.org/api/modules/prefetch_src.html)
* [Prefetch](https://barba.js.org/api/classes/prefetch_src.prefetch.html)

# Class Prefetch

### Hierarchy

* Prefetch

### Implements

* [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<IPrefetchOptions>

## Index

### Properties

* [barba](https://barba.js.org/api/classes/prefetch_src.prefetch.html#barba)
* [limit](https://barba.js.org/api/classes/prefetch_src.prefetch.html#limit)
* [logger](https://barba.js.org/api/classes/prefetch_src.prefetch.html#logger)
* [name](https://barba.js.org/api/classes/prefetch_src.prefetch.html#name)
* [observer](https://barba.js.org/api/classes/prefetch_src.prefetch.html#observer)
* [root](https://barba.js.org/api/classes/prefetch_src.prefetch.html#root)
* [timeout](https://barba.js.org/api/classes/prefetch_src.prefetch.html#timeout)
* [toPrefetch](https://barba.js.org/api/classes/prefetch_src.prefetch.html#toprefetch)
* [version](https://barba.js.org/api/classes/prefetch_src.prefetch.html#version)

### Methods

* [init](https://barba.js.org/api/classes/prefetch_src.prefetch.html#init)
* [install](https://barba.js.org/api/classes/prefetch_src.prefetch.html#install)
* [observe](https://barba.js.org/api/classes/prefetch_src.prefetch.html#observe)

## Properties

### barba

barba: [Core](https://barba.js.org/api/classes/core_src.core.html)

### limit

limit: number

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

### name

name: string = "@barba/prefetch"

### observer

observer: IntersectionObserver

### root

root: HTMLElement | HTMLDocument

### timeout

timeout: number

### toPrefetch

toPrefetch: Set<string> = new Set()

### version

version: string = version

## Methods

### init

* init(): void

* Plugin initialisation.

  #### Returns void

### install

* install(barba: [Core](https://barba.js.org/api/classes/core_src.core.html), \_\_namedParameters?: object): void

* Plugin installation.

  #### Parameters

  + ##### barba: [Core](https://barba.js.org/api/classes/core_src.core.html)
  + ##### Default value \_\_namedParameters: object = {}

    - ##### limit: number
    - ##### root: HTMLElement | HTMLDocument
    - ##### timeout: number

  #### Returns void

### observe

* observe(): void

* #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
