---
source: https://barba.js.org/api/modules/core_src_modules.html
title: "core/src/modules | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/modules/core_src_modules.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/modules/core_src_modules.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)

# External module core/src/modules

## Index

### Classes

* [BarbaError](https://barba.js.org/api/classes/core_src_modules.barbaerror.html)
* [Cache](https://barba.js.org/api/classes/core_src_modules.cache.html)
* [Headers](https://barba.js.org/api/classes/core_src_modules.headers.html)
* [Ignore](https://barba.js.org/api/classes/core_src_modules.ignore.html)
* [Prevent](https://barba.js.org/api/classes/core_src_modules.prevent.html)
* [Store](https://barba.js.org/api/classes/core_src_modules.store.html)
* [Transitions](https://barba.js.org/api/classes/core_src_modules.transitions.html)
* [Views](https://barba.js.org/api/classes/core_src_modules.views.html)

### Type aliases

* [Hook](https://barba.js.org/api/modules/core_src_modules.html#hook)

### Functions

* [blank](https://barba.js.org/api/modules/core_src_modules.html#blank)
* [corsDomain](https://barba.js.org/api/modules/core_src_modules.html#corsdomain)
* [corsPort](https://barba.js.org/api/modules/core_src_modules.html#corsport)
* [download](https://barba.js.org/api/modules/core_src_modules.html#download)
* [exists](https://barba.js.org/api/modules/core_src_modules.html#exists)
* [newTab](https://barba.js.org/api/modules/core_src_modules.html#newtab)
* [preventAll](https://barba.js.org/api/modules/core_src_modules.html#preventall)
* [preventSelf](https://barba.js.org/api/modules/core_src_modules.html#preventself)
* [pushState](https://barba.js.org/api/modules/core_src_modules.html#pushstate)
* [sameUrl](https://barba.js.org/api/modules/core_src_modules.html#sameurl)

## Type aliases

### Hook

Hook: function

#### Type declaration

* + (data: [IViewData](https://barba.js.org/api/interfaces/core_src_defs.iviewdata.html)): Promise<void>
  + #### Parameters

    - ##### data: [IViewData](https://barba.js.org/api/interfaces/core_src_defs.iviewdata.html)

    #### Returns Promise<void>

## Functions

### Const blank

* blank(\_\_namedParameters: object): boolean

* If the link has `_blank` target.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const corsDomain

* corsDomain(\_\_namedParameters: object): boolean

* If the domain is the same (in order to avoid pushState cross origin security problem).
  Note: SVGAElement do not have `protocol` neither `hostname` properties.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const corsPort

* corsPort(\_\_namedParameters: object): boolean

* If the port is the same.
  Note: SVGAElement do not have `port` property.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const download

* download(\_\_namedParameters: object): boolean

* If the link has download attribute.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const exists

* exists(\_\_namedParameters: object): boolean

* Make sure there is an `el` and `href`.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement
    - ##### href: string

  #### Returns boolean

### Const newTab

* newTab(\_\_namedParameters: object): boolean

* If the user is pressing ctrl + click, the browser will open a new tab.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### event: Event

  #### Returns boolean

### Const preventAll

* preventAll(\_\_namedParameters: object): boolean

* If some link ancestor contains [data-barba-prevent="all"].

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const preventSelf

* preventSelf(\_\_namedParameters: object): boolean

* If the links contains [data-barba-prevent] or [data-barba-prevent="self"].

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### el: HTMLAnchorElement | SVGAElement

  #### Returns boolean

### Const pushState

* pushState(): boolean

* Make sure the browser supports `history.pushState`.

  #### Returns boolean

### Const sameUrl

* sameUrl(\_\_namedParameters: object): boolean

* If the link is the current URL.

  > Not in the test suite.

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### href: string

  #### Returns boolean

Generated using [TypeDoc](https://typedoc.org/)
