---
source: https://barba.js.org/api/classes/core_src_modules.headers.html
title: "Headers | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.headers.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.headers.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Headers](https://barba.js.org/api/classes/core_src_modules.headers.html)

# Class Headers

### Hierarchy

* Headers

## Index

### Properties

* [\_list](https://barba.js.org/api/classes/core_src_modules.headers.html#_list)

### Methods

* [all](https://barba.js.org/api/classes/core_src_modules.headers.html#all)
* [clear](https://barba.js.org/api/classes/core_src_modules.headers.html#clear)
* [delete](https://barba.js.org/api/classes/core_src_modules.headers.html#delete)
* [get](https://barba.js.org/api/classes/core_src_modules.headers.html#get)
* [has](https://barba.js.org/api/classes/core_src_modules.headers.html#has)
* [set](https://barba.js.org/api/classes/core_src_modules.headers.html#set)

## Properties

### Private \_list

\_list: [HeaderList](https://barba.js.org/api/modules/core_src_defs.html#headerlist) = new Map()

## Methods

### all

* all(): [HeaderList](https://barba.js.org/api/modules/core_src_defs.html#headerlist)

* Get all headers

  #### Returns [HeaderList](https://barba.js.org/api/modules/core_src_defs.html#headerlist)

### clear

* clear(): void

* Clear all headers

  #### Returns void

### delete

* delete(name: string): boolean

* Delete a header

  #### Parameters

  + ##### name: string

  #### Returns boolean

### get

* get(name: string): string

* Get a specific header

  #### Parameters

  + ##### name: string

  #### Returns string

### has

* has(name: string): boolean

* Check if header exists

  #### Parameters

  + ##### name: string

  #### Returns boolean

### set

* set(name: string, value: string): [IHeaderData](https://barba.js.org/api/interfaces/core_src_defs.iheaderdata.html)

* Set a new header

  #### Parameters

  + ##### name: string
  + ##### value: string

  #### Returns [IHeaderData](https://barba.js.org/api/interfaces/core_src_defs.iheaderdata.html)

Generated using [TypeDoc](https://typedoc.org/)
