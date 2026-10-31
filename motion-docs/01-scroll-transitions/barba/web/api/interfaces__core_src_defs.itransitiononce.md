---
source: https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html
title: "ITransitionOnce | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/defs](https://barba.js.org/api/modules/core_src_defs.html)
* [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)

# Interface ITransitionOnce

### Hierarchy

* [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)
  + ITransitionOnce

## Index

### Properties

* [async](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#async)
* [from](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#from)
* [name](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#name)
* [namespace](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#namespace)
* [priority](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#priority)
* [route](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#route)
* [sync](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#sync)
* [to](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#to)

### Methods

* [after](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#after)
* [afterEnter](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#afterenter)
* [afterLeave](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#afterleave)
* [afterOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#afteronce)
* [before](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#before)
* [beforeEnter](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#beforeenter)
* [beforeLeave](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#beforeleave)
* [beforeOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#beforeonce)
* [custom](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#custom)
* [enter](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#enter)
* [leave](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#leave)
* [once](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html#once)

## Properties

### Optional async

async: function

#### Type declaration

* + (): function
  + #### Returns function

    - * (data?: any): void
      * #### Parameters

        + ##### Optional data: any

        #### Returns void

### Optional from

from: [ITransitionRules](https://barba.js.org/api/interfaces/core_src_defs.itransitionrules.html)

### Optional name

name: string

### Optional namespace

namespace: string | string[]

### Optional priority

priority: number

### Optional route

route: string | string[]

### Optional sync

sync: boolean

### Optional to

to: [ITransitionRules](https://barba.js.org/api/interfaces/core_src_defs.itransitionrules.html)

## Methods

### Optional after

* after(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional afterEnter

* afterEnter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional afterLeave

* afterLeave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional afterOnce

* afterOnce(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional before

* before(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional beforeEnter

* beforeEnter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional beforeLeave

* beforeLeave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional beforeOnce

* beforeOnce(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns void

### Optional custom

* custom(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): boolean

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns boolean

### Optional enter

* enter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void> | void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void> | void

### Optional leave

* leave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<any> | void

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<any> | void

### Optional once

* once(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

Generated using [TypeDoc](https://typedoc.org/)
