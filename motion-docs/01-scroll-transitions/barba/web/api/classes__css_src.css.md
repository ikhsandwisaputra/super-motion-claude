---
source: https://barba.js.org/api/classes/css_src.css.html
title: "Css | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/css_src.css.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/css_src.css.html)

* [Globals](https://barba.js.org/api/globals.html)
* [css/src](https://barba.js.org/api/modules/css_src.html)
* [Css](https://barba.js.org/api/classes/css_src.css.html)

# Class Css

### Hierarchy

* Css

### Implements

* [IBarbaPlugin](https://barba.js.org/api/interfaces/core_src_defs.ibarbaplugin.html)<\_\_type>

## Index

### Properties

* [\_hasTransition](https://barba.js.org/api/classes/css_src.css.html#_hastransition)
* [barba](https://barba.js.org/api/classes/css_src.css.html#barba)
* [callbacks](https://barba.js.org/api/classes/css_src.css.html#callbacks)
* [cb](https://barba.js.org/api/classes/css_src.css.html#cb)
* [logger](https://barba.js.org/api/classes/css_src.css.html#logger)
* [name](https://barba.js.org/api/classes/css_src.css.html#name)
* [prefix](https://barba.js.org/api/classes/css_src.css.html#prefix)
* [version](https://barba.js.org/api/classes/css_src.css.html#version)

### Methods

* [\_afterEnter](https://barba.js.org/api/classes/css_src.css.html#_afterenter)
* [\_afterLeave](https://barba.js.org/api/classes/css_src.css.html#_afterleave)
* [\_afterOnce](https://barba.js.org/api/classes/css_src.css.html#_afteronce)
* [\_beforeEnter](https://barba.js.org/api/classes/css_src.css.html#_beforeenter)
* [\_beforeLeave](https://barba.js.org/api/classes/css_src.css.html#_beforeleave)
* [\_beforeOnce](https://barba.js.org/api/classes/css_src.css.html#_beforeonce)
* [\_checkTransition](https://barba.js.org/api/classes/css_src.css.html#_checktransition)
* [\_enter](https://barba.js.org/api/classes/css_src.css.html#_enter)
* [\_getPrefix](https://barba.js.org/api/classes/css_src.css.html#_getprefix)
* [\_leave](https://barba.js.org/api/classes/css_src.css.html#_leave)
* [\_once](https://barba.js.org/api/classes/css_src.css.html#_once)
* [add](https://barba.js.org/api/classes/css_src.css.html#add)
* [end](https://barba.js.org/api/classes/css_src.css.html#end)
* [init](https://barba.js.org/api/classes/css_src.css.html#init)
* [install](https://barba.js.org/api/classes/css_src.css.html#install)
* [next](https://barba.js.org/api/classes/css_src.css.html#next)
* [remove](https://barba.js.org/api/classes/css_src.css.html#remove)
* [start](https://barba.js.org/api/classes/css_src.css.html#start)

## Properties

### Private \_hasTransition

\_hasTransition: boolean = false

### barba

barba: [Core](https://barba.js.org/api/classes/core_src.core.html)

### callbacks

callbacks: ICssCallbacks

### cb

cb: any

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html)

### name

name: string = "@barba/css"

### prefix

prefix: string = "barba"

### version

version: string = version

## Methods

### Private \_afterEnter

* \_afterEnter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `afterEnter` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_afterLeave

* \_afterLeave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `afterLeave` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_afterOnce

* \_afterOnce(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `afterOnce` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_beforeEnter

* \_beforeEnter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `beforeEnter` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_beforeLeave

* \_beforeLeave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `beforeLeave` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_beforeOnce

* \_beforeOnce(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)): Promise<void>

* `beforeOnce` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)

  #### Returns Promise<void>

### Private \_checkTransition

* \_checkTransition(container: HTMLElement): boolean

* Check if CSS transition is applied

  #### Parameters

  + ##### container: HTMLElement

  #### Returns boolean

### Private \_enter

* \_enter(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): Promise<void>

* `enter` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns Promise<void>

### Private \_getPrefix

* \_getPrefix(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): void

* Get CSS prefix from transition `name` property.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns void

### Private \_leave

* \_leave(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): Promise<void>

* `leave` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns Promise<void>

### Private \_once

* \_once(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): Promise<any>

* `once` hook.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns Promise<any>

### add

* add(el: HTMLElement, step: string): void

* Add CSS classes.

  #### Parameters

  + ##### el: HTMLElement
  + ##### step: string

  #### Returns void

### end

* end(container: HTMLElement, kind: string): Promise<void>

* Final state.

  #### Parameters

  + ##### container: HTMLElement
  + ##### kind: string

  #### Returns Promise<void>

### init

* init(): void

* Plugin installation.

  #### Returns void

### install

* install(barba: [Core](https://barba.js.org/api/classes/core_src.core.html)): void

* Plugin installation.

  #### Parameters

  + ##### barba: [Core](https://barba.js.org/api/classes/core_src.core.html)

  #### Returns void

### next

* next(container: HTMLElement, kind: string): Promise<any>

* Next frame state.

  #### Parameters

  + ##### container: HTMLElement
  + ##### kind: string

  #### Returns Promise<any>

### remove

* remove(el: HTMLElement, step: string): void

* Remove CSS classes.

  #### Parameters

  + ##### el: HTMLElement
  + ##### step: string

  #### Returns void

### start

* start(container: HTMLElement, kind: string): Promise<void>

* Initial state.

  #### Parameters

  + ##### container: HTMLElement
  + ##### kind: string

  #### Returns Promise<void>

Generated using [TypeDoc](https://typedoc.org/)
