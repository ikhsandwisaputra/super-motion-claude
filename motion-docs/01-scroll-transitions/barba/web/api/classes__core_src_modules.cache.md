---
source: https://barba.js.org/api/classes/core_src_modules.cache.html
title: "Cache | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.cache.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.cache.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)

# Class Cache

### Hierarchy

* [Ignore](https://barba.js.org/api/classes/core_src_modules.ignore.html)
  + Cache

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src_modules.cache.html#constructor)

### Properties

* [\_state](https://barba.js.org/api/classes/core_src_modules.cache.html#_state)

### Methods

* [checkHref](https://barba.js.org/api/classes/core_src_modules.cache.html#checkhref)
* [delete](https://barba.js.org/api/classes/core_src_modules.cache.html#delete)
* [get](https://barba.js.org/api/classes/core_src_modules.cache.html#get)
* [getAction](https://barba.js.org/api/classes/core_src_modules.cache.html#getaction)
* [getRequest](https://barba.js.org/api/classes/core_src_modules.cache.html#getrequest)
* [getStatus](https://barba.js.org/api/classes/core_src_modules.cache.html#getstatus)
* [getTarget](https://barba.js.org/api/classes/core_src_modules.cache.html#gettarget)
* [has](https://barba.js.org/api/classes/core_src_modules.cache.html#has)
* [set](https://barba.js.org/api/classes/core_src_modules.cache.html#set)
* [update](https://barba.js.org/api/classes/core_src_modules.cache.html#update)

## Constructors

### constructor

* new Cache(ignore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)): [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)

* #### Parameters

  + ##### ignore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

  #### Returns [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)

## Properties

### Private \_state

\_state: Map<string, [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)> = new Map()

## Methods

### checkHref

* checkHref(href: string): boolean

* #### Parameters

  + ##### href: string

  #### Returns boolean

### delete

* delete(href: string): boolean

* Delete value from cache

  #### Parameters

  + ##### href: string

  #### Returns boolean

### get

* get(href: string): [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

* Get data from cache

  #### Parameters

  + ##### href: string

  #### Returns [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

### getAction

* getAction(href: string): [CacheAction](https://barba.js.org/api/modules/core_src_defs.html#cacheaction)

* Get action from cache

  #### Parameters

  + ##### href: string

  #### Returns [CacheAction](https://barba.js.org/api/modules/core_src_defs.html#cacheaction)

### getRequest

* getRequest(href: string): [CacheRequest](https://barba.js.org/api/modules/core_src_defs.html#cacherequest)

* Get request from cache

  #### Parameters

  + ##### href: string

  #### Returns [CacheRequest](https://barba.js.org/api/modules/core_src_defs.html#cacherequest)

### getStatus

* getStatus(href: string): [CacheStatus](https://barba.js.org/api/modules/core_src_defs.html#cachestatus)

* Get status from cache

  #### Parameters

  + ##### href: string

  #### Returns [CacheStatus](https://barba.js.org/api/modules/core_src_defs.html#cachestatus)

### getTarget

* getTarget(href: string): [CacheTarget](https://barba.js.org/api/modules/core_src_defs.html#cachetarget)

* Get target from cache

  #### Parameters

  + ##### href: string

  #### Returns [CacheTarget](https://barba.js.org/api/modules/core_src_defs.html#cachetarget)

### has

* has(href: string): boolean

* Check if value exists into cache

  #### Parameters

  + ##### href: string

  #### Returns boolean

### set

* set(href: string, request: [CacheRequest](https://barba.js.org/api/modules/core_src_defs.html#cacherequest), action: [CacheAction](https://barba.js.org/api/modules/core_src_defs.html#cacheaction), status: [CacheStatus](https://barba.js.org/api/modules/core_src_defs.html#cachestatus), target?: [CacheTarget](https://barba.js.org/api/modules/core_src_defs.html#cachetarget)): [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

* Set value to cache

  #### Parameters

  + ##### href: string
  + ##### request: [CacheRequest](https://barba.js.org/api/modules/core_src_defs.html#cacherequest)
  + ##### action: [CacheAction](https://barba.js.org/api/modules/core_src_defs.html#cacheaction)
  + ##### status: [CacheStatus](https://barba.js.org/api/modules/core_src_defs.html#cachestatus)
  + ##### Optional target: [CacheTarget](https://barba.js.org/api/modules/core_src_defs.html#cachetarget)

  #### Returns [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

### update

* update(href: string, data: [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)): [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

* Update cache value

  #### Parameters

  + ##### href: string
  + ##### data: [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

  #### Returns [ICacheData](https://barba.js.org/api/interfaces/core_src_defs.icachedata.html)

Generated using [TypeDoc](https://typedoc.org/)
