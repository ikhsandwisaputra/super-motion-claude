---
source: https://barba.js.org/api/modules/core_src_utils.html
title: "core/src/utils | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/modules/core_src_utils.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/modules/core_src_utils.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/utils](https://barba.js.org/api/modules/core_src_utils.html)

# External module core/src/utils

## Index

### Classes

* [Dom](https://barba.js.org/api/classes/core_src_utils.dom.html)
* [History](https://barba.js.org/api/classes/core_src_utils.history.html)

### Interfaces

* [ICoords](https://barba.js.org/api/interfaces/core_src_utils.icoords.html)
* [IHistoryItem](https://barba.js.org/api/interfaces/core_src_utils.ihistoryitem.html)
* [IStateItem](https://barba.js.org/api/interfaces/core_src_utils.istateitem.html)

### Variables

* [dom](https://barba.js.org/api/modules/core_src_utils.html#dom-1)
* [history](https://barba.js.org/api/modules/core_src_utils.html#history-1)
* [pathToRegexp](https://barba.js.org/api/modules/core_src_utils.html#pathtoregexp)

### Functions

* [clean](https://barba.js.org/api/modules/core_src_utils.html#clean)
* [getAbsoluteHref](https://barba.js.org/api/modules/core_src_utils.html#getabsolutehref)
* [getHash](https://barba.js.org/api/modules/core_src_utils.html#gethash)
* [getHref](https://barba.js.org/api/modules/core_src_utils.html#gethref)
* [getOrigin](https://barba.js.org/api/modules/core_src_utils.html#getorigin)
* [getPath](https://barba.js.org/api/modules/core_src_utils.html#getpath)
* [getPort](https://barba.js.org/api/modules/core_src_utils.html#getport)
* [getQuery](https://barba.js.org/api/modules/core_src_utils.html#getquery)
* [nextTick](https://barba.js.org/api/modules/core_src_utils.html#nexttick)
* [parse](https://barba.js.org/api/modules/core_src_utils.html#parse)
* [parseQuery](https://barba.js.org/api/modules/core_src_utils.html#parsequery)
* [request](https://barba.js.org/api/modules/core_src_utils.html#request)
* [runAsync](https://barba.js.org/api/modules/core_src_utils.html#runasync)
* [update](https://barba.js.org/api/modules/core_src_utils.html#update)

## Variables

### Const dom

dom: [Dom](https://barba.js.org/api/classes/core_src_utils.dom.html) = new Dom()

### Const history

history: [History](https://barba.js.org/api/classes/core_src_utils.history.html) = new History()

### Const pathToRegexp

pathToRegexp: pathToRegexp = ptr

Turn a route string such as `/user/:name` into a regular expression.

Used for:

* routes to ignore
* route transition resolution

see
:   <https://www.npmjs.com/package/path-to-regexp>

## Functions

### Const clean

* clean(url?: string): string

* Clean URL, remove "hash" and/or "trailing slash".

  #### Parameters

  + ##### Default value url: string = window.location.href

  #### Returns string

### Const getAbsoluteHref

* getAbsoluteHref(url: string, base?: string): string

* Get absolute href from URL.

  #### Parameters

  + ##### url: string
  + ##### Default value base: string = document.baseURI

  #### Returns string

### Const getHash

* getHash(url: string): string

* Get hash from URL.

  #### Parameters

  + ##### url: string

  #### Returns string

### Const getHref

* getHref(): string

* Get location href.

  #### Returns string

### Const getOrigin

* getOrigin(): string

* Get location origin.

  #### Returns string

### Const getPath

* getPath(url?: string): string

* Get path from URL.

  #### Parameters

  + ##### Default value url: string = window.location.href

  #### Returns string

### Const getPort

* getPort(url?: string): number

* Get port based on URL or location.

  #### Parameters

  + ##### Default value url: string = window.location.href

  #### Returns number

### Const getQuery

* getQuery(url: string, stringify?: boolean): [IGenericObject](https://barba.js.org/api/interfaces/core_src_defs.igenericobject.html) | string

* Get query object from URL.

  #### Parameters

  + ##### url: string
  + ##### Default value stringify: boolean = false

  #### Returns [IGenericObject](https://barba.js.org/api/interfaces/core_src_defs.igenericobject.html) | string

### Const nextTick

* nextTick(): Promise<unknown>

* Next tick

  #### Returns Promise<unknown>

### Const parse

* parse(url: string): [IUrlBase](https://barba.js.org/api/interfaces/core_src_defs.iurlbase.html)

* Parse URL for path, query and hash and more.

  #### Parameters

  + ##### url: string

  #### Returns [IUrlBase](https://barba.js.org/api/interfaces/core_src_defs.iurlbase.html)

### Const parseQuery

* parseQuery(str: string): [IGenericObject](https://barba.js.org/api/interfaces/core_src_defs.igenericobject.html)

* Parse a query string to object.

  #### Parameters

  + ##### str: string

  #### Returns [IGenericObject](https://barba.js.org/api/interfaces/core_src_defs.igenericobject.html)

### request

* request(url: string, ttl?: number, requestError: [RequestError](https://barba.js.org/api/modules/core_src_defs.html#requesterror), cache: [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html), headers: [Headers](https://barba.js.org/api/classes/core_src_modules.headers.html)): Promise<[IResponse](https://barba.js.org/api/interfaces/core_src_defs.iresponse.html)>

* Init a page request.
  Fetch the page and returns a promise with the text content.

  #### Parameters

  + ##### url: string
  + ##### Default value ttl: number = 2000
  + ##### requestError: [RequestError](https://barba.js.org/api/modules/core_src_defs.html#requesterror)
  + ##### cache: [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)
  + ##### headers: [Headers](https://barba.js.org/api/classes/core_src_modules.headers.html)

  #### Returns Promise<[IResponse](https://barba.js.org/api/interfaces/core_src_defs.iresponse.html)>

### runAsync

* runAsync(func: function, ctx?: any): function

* #### Parameters

  + ##### func: function

    - * (...args: any[]): void | Promise<any>
      * #### Parameters

        + ##### Rest ...args: any[]

        #### Returns void | Promise<any>
  + ##### Default value ctx: any = {}

  #### Returns function

  + - (...args: any[]): Promise<any>
    - #### Parameters

      * ##### Rest ...args: any[]

      #### Returns Promise<any>

### Const update

* update(page: Promise<[IResponse](https://barba.js.org/api/interfaces/core_src_defs.iresponse.html) | void>, data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* Update `data.next`, the title and the history

  #### Parameters

  + ##### page: Promise<[IResponse](https://barba.js.org/api/interfaces/core_src_defs.iresponse.html) | void>
  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

Generated using [TypeDoc](https://typedoc.org/)
