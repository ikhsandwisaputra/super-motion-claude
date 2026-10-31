---
source: https://barba.js.org/api/classes/core_src_modules.transitions.html
title: "Transitions | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.transitions.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.transitions.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Transitions](https://barba.js.org/api/classes/core_src_modules.transitions.html)

# Class Transitions

### Hierarchy

* Transitions

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src_modules.transitions.html#constructor)

### Properties

* [\_running](https://barba.js.org/api/classes/core_src_modules.transitions.html#_running)
* [logger](https://barba.js.org/api/classes/core_src_modules.transitions.html#logger)
* [store](https://barba.js.org/api/classes/core_src_modules.transitions.html#store)

### Accessors

* [hasOnce](https://barba.js.org/api/classes/core_src_modules.transitions.html#hasonce)
* [hasSelf](https://barba.js.org/api/classes/core_src_modules.transitions.html#hasself)
* [isRunning](https://barba.js.org/api/classes/core_src_modules.transitions.html#isrunning)
* [shouldWait](https://barba.js.org/api/classes/core_src_modules.transitions.html#shouldwait)

### Methods

* [\_doAsyncHook](https://barba.js.org/api/classes/core_src_modules.transitions.html#_doasynchook)
* [\_isTransitionError](https://barba.js.org/api/classes/core_src_modules.transitions.html#_istransitionerror)
* [add](https://barba.js.org/api/classes/core_src_modules.transitions.html#add)
* [doOnce](https://barba.js.org/api/classes/core_src_modules.transitions.html#doonce)
* [doPage](https://barba.js.org/api/classes/core_src_modules.transitions.html#dopage)
* [enter](https://barba.js.org/api/classes/core_src_modules.transitions.html#enter)
* [get](https://barba.js.org/api/classes/core_src_modules.transitions.html#get)
* [leave](https://barba.js.org/api/classes/core_src_modules.transitions.html#leave)
* [once](https://barba.js.org/api/classes/core_src_modules.transitions.html#once)
* [remove](https://barba.js.org/api/classes/core_src_modules.transitions.html#remove)

## Constructors

### constructor

* new Transitions(transitions?: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[]): [Transitions](https://barba.js.org/api/classes/core_src_modules.transitions.html)

* #### Parameters

  + ##### Default value transitions: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[] = []

  #### Returns [Transitions](https://barba.js.org/api/classes/core_src_modules.transitions.html)

## Properties

### Private \_running

\_running: boolean = false

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html) = new Logger('@barba/core')

### store

store: [Store](https://barba.js.org/api/classes/core_src_modules.store.html)

## Accessors

### hasOnce

* get hasOnce(): boolean

* Check for registered once transition(s).

  #### Returns boolean

### hasSelf

* get hasSelf(): boolean

* Check for registered self transition.

  #### Returns boolean

### isRunning

* get isRunning(): boolean
* set isRunning(status: boolean): void

* Animation running status.

  #### Returns boolean
* Animation running status.

  #### Parameters

  + ##### status: boolean

  #### Returns void

### shouldWait

* get shouldWait(): boolean

* [### Wait indicator.](https://barba.js.org/api/classes/core_src_modules.transitions.html#wait-indicator)

  Tells Barba to get next page data
  before starting the resolution
  because some registered transitions need
  next page data to be resolved (eg: `sync: true`, `to: { namespace }`, …)

  #### Returns boolean

## Methods

### Private \_doAsyncHook

* \_doAsyncHook(hook: [HooksTransition](https://barba.js.org/api/modules/core_src_defs.html#hookstransition), data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [HooksTransitionMap](https://barba.js.org/api/modules/core_src_defs.html#hookstransitionmap)): Promise<void>

* Do hooks + async transition methods.

  #### Parameters

  + ##### hook: [HooksTransition](https://barba.js.org/api/modules/core_src_defs.html#hookstransition)
  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [HooksTransitionMap](https://barba.js.org/api/modules/core_src_defs.html#hookstransitionmap)

  #### Returns Promise<void>

### Private \_isTransitionError

* \_isTransitionError(error: any): boolean

* #### Parameters

  + ##### error: any

  #### Returns boolean

### add

* add(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), wrapper: [Wrapper](https://barba.js.org/api/modules/core_src_defs.html#wrapper)): Promise<void>

* Add next container.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### wrapper: [Wrapper](https://barba.js.org/api/modules/core_src_defs.html#wrapper)

  #### Returns Promise<void>

### doOnce

* doOnce(\_\_namedParameters: object): Promise<void>

* [### Do "once" transition.](https://barba.js.org/api/classes/core_src_modules.transitions.html#do-quotoncequot-transition)

  Hooks: see [HooksOnce](https://barba.js.org/api/modules/core_src_defs.html#hooksonce).

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
    - ##### transition: [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)

  #### Returns Promise<void>

### doPage

* doPage(\_\_namedParameters: object): Promise<void>

* [### Do "page" transition.](https://barba.js.org/api/classes/core_src_modules.transitions.html#do-quotpagequot-transition)

  Hooks: see [HooksPage](https://barba.js.org/api/modules/core_src_defs.html#hookspage).

  `sync: false` (default) order:

  1. before
  2. beforeLeave
  3. leave
  4. afterLeave
  5. beforeEnter
  6. enter
  7. afterEnter
  8. after

  `sync: true` order:

  1. before
  2. beforeLeave
  3. beforeEnter
  4. leave & enter
  5. afterLeave
  6. afterEnter
  7. after

  #### Parameters

  + ##### \_\_namedParameters: object

    - ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
    - ##### page: Promise<void | [IResponse](https://barba.js.org/api/interfaces/core_src_defs.iresponse.html)>
    - ##### transition: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)
    - ##### wrapper: HTMLElement

  #### Returns Promise<void>

### enter

* enter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html), leaveResult?: any): Promise<void>

* Enter hook + async "enter" transition.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)
  + ##### Optional leaveResult: any

  #### Returns Promise<void>

### get

* get(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), filters?: [ITransitionFilters](https://barba.js.org/api/interfaces/core_src_defs.itransitionfilters.html)): [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html) | [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

* Get resolved transition

  + based on data

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### Optional filters: [ITransitionFilters](https://barba.js.org/api/interfaces/core_src_defs.itransitionfilters.html)

  #### Returns [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html) | [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

### leave

* leave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): Promise<any>

* Leave hook + async "leave" transition.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns Promise<any>

### once

* once(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)): Promise<void>

* Once hook + async "once" transition.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)

  #### Returns Promise<void>

### remove

* remove(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* Remove current container.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

Generated using [TypeDoc](https://typedoc.org/)
