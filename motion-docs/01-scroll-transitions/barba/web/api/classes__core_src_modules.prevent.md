---
source: https://barba.js.org/api/classes/core_src_modules.prevent.html
title: "Prevent | barba.js"
fetched: 2026-10-28
---

Search

* Preparing search index...
* The search index is not available

[barba.js](https://barba.js.org/api/index.html)

[Options](https://barba.js.org/api/classes/core_src_modules.prevent.html)

All

* Public
* Public/Protected
* All

Inherited

Only exported

[Menu](https://barba.js.org/api/classes/core_src_modules.prevent.html)

* [Globals](https://barba.js.org/api/globals.html)
* [core/src/modules](https://barba.js.org/api/modules/core_src_modules.html)
* [Prevent](https://barba.js.org/api/classes/core_src_modules.prevent.html)

# Class Prevent

### Hierarchy

* [Ignore](https://barba.js.org/api/classes/core_src_modules.ignore.html)
  + Prevent

## Index

### Constructors

* [constructor](https://barba.js.org/api/classes/core_src_modules.prevent.html#constructor)

### Properties

* [suite](https://barba.js.org/api/classes/core_src_modules.prevent.html#suite)
* [tests](https://barba.js.org/api/classes/core_src_modules.prevent.html#tests)

### Methods

* [add](https://barba.js.org/api/classes/core_src_modules.prevent.html#add)
* [checkHref](https://barba.js.org/api/classes/core_src_modules.prevent.html#checkhref)
* [checkLink](https://barba.js.org/api/classes/core_src_modules.prevent.html#checklink)
* [init](https://barba.js.org/api/classes/core_src_modules.prevent.html#init)
* [run](https://barba.js.org/api/classes/core_src_modules.prevent.html#run)

## Constructors

### constructor

* new Prevent(ignore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)): [Prevent](https://barba.js.org/api/classes/core_src_modules.prevent.html)

* #### Parameters

  + ##### ignore: [IgnoreOption](https://barba.js.org/api/modules/core_src_defs.html#ignoreoption)

  #### Returns [Prevent](https://barba.js.org/api/classes/core_src_modules.prevent.html)

## Properties

### suite

suite: string[] = []

### tests

tests: Map<string, [PreventCheck](https://barba.js.org/api/modules/core_src_defs.html#preventcheck)> = new Map()

## Methods

### add

* add(name: string, check: [PreventCheck](https://barba.js.org/api/modules/core_src_defs.html#preventcheck), suite?: boolean): void

* #### Parameters

  + ##### name: string
  + ##### check: [PreventCheck](https://barba.js.org/api/modules/core_src_defs.html#preventcheck)
  + ##### Default value suite: boolean = true

  #### Returns void

### checkHref

* checkHref(href: string): boolean

* #### Parameters

  + ##### href: string

  #### Returns boolean

### checkLink

* checkLink(el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link), event: Event, href: string): boolean

* Run test suite

  #### Parameters

  + ##### el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link)
  + ##### event: Event
  + ##### href: string

  #### Returns boolean

### init

* init(): void

* #### Returns void

### run

* run(name: string, el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link), event: Event, href: string): boolean

* Run individual test

  #### Parameters

  + ##### name: string
  + ##### el: [Link](https://barba.js.org/api/modules/core_src_defs.html#link)
  + ##### event: Event
  + ##### href: string

  #### Returns boolean

Generated using [TypeDoc](https://typedoc.org/)
