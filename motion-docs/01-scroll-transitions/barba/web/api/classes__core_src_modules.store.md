---
source: https://barba.js.org/api/classes/core_src_modules.store.html
title: "Store | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.store.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.store.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Store](https://barba.js.org/api/classes/core_src_modules.store.html)

# Class Store

### Hierarchy

* Store

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src_modules.store.html#constructor)

### Properties

* [\_rules](https://barba.js.org/api/classes/core_src_modules.store.html#_rules)
* [all](https://barba.js.org/api/classes/core_src_modules.store.html#all)
* [logger](https://barba.js.org/api/classes/core_src_modules.store.html#logger)
* [once](https://barba.js.org/api/classes/core_src_modules.store.html#once)
* [page](https://barba.js.org/api/classes/core_src_modules.store.html#page)

### Methods

* [\_addPriority](https://barba.js.org/api/classes/core_src_modules.store.html#_addpriority)
* [\_calculatePriority](https://barba.js.org/api/classes/core_src_modules.store.html#_calculatepriority)
* [\_check](https://barba.js.org/api/classes/core_src_modules.store.html#_check)
* [add](https://barba.js.org/api/classes/core_src_modules.store.html#add)
* [resolve](https://barba.js.org/api/classes/core_src_modules.store.html#resolve)
* [update](https://barba.js.org/api/classes/core_src_modules.store.html#update)

## Constructors

### constructor

* new Store(transitions?: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[]): [Store](https://barba.js.org/api/classes/core_src_modules.store.html)

* Init store.

  #### Parameters

  + ##### Default value transitions: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[] = []

  #### Returns [Store](https://barba.js.org/api/classes/core_src_modules.store.html)

## Properties

### Private \_rules

\_rules: [IRule](https://barba.js.org/api/interfaces/core_src_defs.irule.html)[] = [{name: 'namespace',type: 'strings',},{name: 'custom',type: 'function',},]

Rules for transition resolution.

Defaults:

* namespace
* custom

### all

all: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[] = []

All registered transitions.

### logger

logger: [Logger](https://barba.js.org/api/classes/core_modules_logger.logger.html) = new Logger('@barba/core')

### once

once: [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html)[] = []

"Once only" registered transitions.

### page

page: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)[] = []

"Page only" registered transitions.

## Methods

### Private \_addPriority

* \_addPriority(t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)): [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

* #### Parameters

  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

  #### Returns [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

### Private \_calculatePriority

* \_calculatePriority(t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html), ruleName: [RuleName](https://barba.js.org/api/modules/core_src_defs.html#rulename), ruleIndex: number): number

* [### Calculate transition priority.](https://barba.js.org/api/classes/core_src_modules.store.html#calculate-transition-priority)

  Based on:

  + rule "position" (index) give tens, hundreds, thousands, …
  + from/to properties give units (0, 1 or 2)

  #### Parameters

  + ##### t: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)
  + ##### ruleName: [RuleName](https://barba.js.org/api/modules/core_src_defs.html#rulename)
  + ##### ruleIndex: number

  #### Returns number

### Private \_check

* \_check(transition: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html), rule: [IRule](https://barba.js.org/api/interfaces/core_src_defs.irule.html), data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), match: any, direction?: "from" | "to"): boolean

* [### Check if transition apply.](https://barba.js.org/api/classes/core_src_modules.store.html#check-if-transition-apply)

  Based on rule, page data and optional direction:

  1. transition has no rule "property":
     + always returns true
  2. transition has rule "property":
     + "strings" should be present on both side (transition + page) and match
     + "function" should return true

  #### Parameters

  + ##### transition: [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)
  + ##### rule: [IRule](https://barba.js.org/api/interfaces/core_src_defs.irule.html)
  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### match: any
  + ##### Optional direction: "from" | "to"

  #### Returns boolean

### add

* add(type: "rule" | "transition", data: any): void

* Add rule or transition.

  #### Parameters

  + ##### type: "rule" | "transition"
  + ##### data: any

  #### Returns void

### resolve

* resolve(data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html), filters?: [ITransitionFilters](https://barba.js.org/api/interfaces/core_src_defs.itransitionfilters.html)): [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html) | [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

* Resolve transition.

  #### Parameters

  + ##### data: [ITransitionData](https://barba.js.org/api/interfaces/core_src_defs.itransitiondata.html)
  + ##### Default value filters: [ITransitionFilters](https://barba.js.org/api/interfaces/core_src_defs.itransitionfilters.html) = {}

  #### Returns [ITransitionOnce](https://barba.js.org/api/interfaces/core_src_defs.itransitiononce.html) | [ITransitionPage](https://barba.js.org/api/interfaces/core_src_defs.itransitionpage.html)

### update

* update(): void

* [### Update store.](https://barba.js.org/api/classes/core_src_modules.store.html#update-store)

  + Reorder transition by priorities
  + Get wait indicator
  + Get once transitions

  #### Returns void

Generated using [TypeDoc](https://typedoc.org/)
